/* ══════════════════════════════════════════════════════════════════════════════
   crs_charts.js —— 全局图表管理器（2026-10-18 第 112 轮 ee 建）

   动机：页面里 20 多个图表模块各自写了一模一样的
       window.addEventListener('resize', …)
       new MutationObserver(fn).observe(panel, {attributes:true, attributeFilter:['class']})
   结果同一个窗口缩放事件被 20 条监听反复处理、同一个面板被反复观察。

   这里只做「统一调度」，**不改变任何模块自己的重绘逻辑**：
     · onResize(fn)    —— 注册「窗口尺寸变了要做什么」，全站只有一个真正的 resize 监听（防抖 160ms）
     · onTab(fn)       —— 注册「切 tab 之后要做什么」，全站只有一个 [data-tab] 捕获监听（延后 80ms）
     · watchPanel(p,fn)—— 统一的「面板 class 变了（= 显示/隐藏切换）就叫 fn」观察器（替代 8 处重复写法）
     · init(host,opt)  —— 统一 echarts.init：初始化后自动登记，之后 resize 时由这里兜底
     · register(host,c)—— 已经自己 init 过的图表登记进来（拿到统一的尺寸护栏 resize）
     · resizeAll()     —— 手动触发一次（调试/外部调用）

   与原有行为的关系：
     · 每个模块的回调照旧原样执行（自己的 setTimeout 防抖、自己的 st.size 判断都保留）；
     · 管理器额外做的只有一件事：对所有「登记过的图表」做一次**尺寸真的变了才 resize** 的护栏补刀，
       避免面板从 0×0 变成有尺寸时被漏掉（这正是原来每个模块各自 repeat 的坑）。
   ══════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  // 幂等：本文件被重复引入时不叠加监听。
  // ⚠️ 只用 `__full` 判断 —— 页头那个降级垫片也会占住 window.crsCharts，但它不是完整实现。
  if (window.crsCharts && window.crsCharts.__full) { return; }

  var resizers = [];      // 窗口 resize 回调
  var tabbers = [];       // 切 tab 回调
  var charts = [];        // {host, chart, size} 已登记图表
  var observers = [];     // 面板观察器（同一面板只建一个）
  var resizeTimer = 0;
  var tabTimer = 0;

  function sizeOf(host) {
    if (!host) { return '0x0'; }
    return host.clientWidth + 'x' + host.clientHeight;
  }

  // 尺寸护栏：容器尺寸没变就什么都不做（热力图几千个格子，被反复 resize 会卡）
  function guardResize(record) {
    var host = record && record.host;
    var chart = record && record.chart;
    if (!chart || !host) { return; }
    if (!host.clientWidth || !host.clientHeight) { return; }   // 面板在后台（0×0）
    var size = sizeOf(host);
    if (size === record.size) { return; }
    record.size = size;
    try { chart.resize(); } catch (error) { /* 图表已 dispose 等情况 */ }
  }

  function safeCall(fn) {
    try { fn(); } catch (error) {
      if (window.console && console.warn) { console.warn('[crsCharts]', error); }
    }
  }

  function runList(list) {
    for (var i = 0; i < list.length; i++) { safeCall(list[i]); }
    for (var j = 0; j < charts.length; j++) { guardResize(charts[j]); }
  }

  function onResize(fn) {
    if (typeof fn === 'function') { resizers.push(fn); }
    return fn;
  }

  function onTab(fn) {
    if (typeof fn === 'function') { tabbers.push(fn); }
    return fn;
  }

  function register(host, chart) {
    if (!host || !chart) { return chart; }
    for (var i = 0; i < charts.length; i++) {
      if (charts[i].chart === chart) {
        charts[i].host = host;
        charts[i].size = sizeOf(host);
        return chart;
      }
    }
    charts.push({ host: host, chart: chart, size: sizeOf(host) });
    return chart;
  }

  function init(host, option, opts) {
    if (!host || !window.echarts) { return null; }
    var chart = window.echarts.init(host, null, opts || { renderer: 'canvas' });
    register(host, chart);
    if (option) { chart.setOption(option); }
    return chart;
  }

  function watchPanel(panel, fn) {
    if (!panel || typeof fn !== 'function') { return fn; }
    for (var i = 0; i < observers.length; i++) {
      if (observers[i].panel === panel) {
        observers[i].callbacks.push(fn);
        return fn;
      }
    }
    var callbacks = [fn];
    var observer = new MutationObserver(function () {
      for (var k = 0; k < callbacks.length; k++) { callbacks[k](); }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
    observers.push({ panel: panel, observer: observer, callbacks: callbacks });
    return fn;
  }

  window.addEventListener('resize', function () {
    if (resizeTimer) { return; }
    resizeTimer = window.setTimeout(function () { resizeTimer = 0; runList(resizers); }, 160);
  });

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest || !target.closest('[data-tab]')) { return; }
    if (tabTimer) { return; }
    tabTimer = window.setTimeout(function () { tabTimer = 0; runList(tabbers); }, 80);
  }, true);

  window.crsCharts = {
    __full: true,
    init: init,
    register: register,
    onResize: onResize,
    onTab: onTab,
    watchPanel: watchPanel,
    resizeAll: function () { runList(resizers); },
    resizeTabbed: function () { runList(tabbers); },
    charts: charts
  };
})();
