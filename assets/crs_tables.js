/* ══════════════════════════════════════════════════════════════════════════════
   crs_tables.js —— 榜单表格「点表头排序」通用引擎（2026-10-18 第 112 轮 ee 建）

   改造前页面上有**两套几乎一样**的实现：
     · RANK_STATS_SCRIPT —— document 上代理 `th[data-sort]`（多 tbody、`—` 恒排最后）
     · WEEK_SORT_SCRIPT  —— 每张表各自 bind `th.week-sortable`（单 tbody、按 data-col 取列、
                             并列时再比 cnt / max / 首列文本）
   两套的三态循环、原始序打戳、重排方式完全相同，只有「取哪一列 / 并列怎么判」不同
   （当年因为共用 `data-sort` 会被两份脚本各排一次，才另起了一套 data-week-*）。

   这里把**引擎**抽出来，差异用配置表达：
     head      表头选择器              key       取列名的属性名
     orig      原始行序属性名          stateAttr 记录三态的属性名（箭头靠它画）
     dirAttr   额外同步的箭头属性（可选）
     multiBody 是否逐 tbody 独立排序   nullLast  空值（`—`）是否恒排最后
     cellOf(row, key) 取单元格（默认按表头列序取 row.cells[i]）
     tie(a, b, key)   并列时的次级比较（默认按原始行序）

   三态语义（与改造前逐字一致）：首次点 = 升序 → 再点 = 降序 → 第三次 = 还原服务器原序。
   ══════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.crsTableSort && window.crsTableSort.__full) { return; }

  var BOUND = 'data-sort-bound';

  function numeric(cell) {
    if (!cell) { return null; }
    var raw = cell.getAttribute('data-v');
    if (raw === null || raw === '') { return null; }
    var value = parseFloat(raw);
    return isNaN(value) ? null : value;
  }

  function origOf(row, attr) {
    var value = parseInt(row.getAttribute(attr) || '0', 10);
    return isNaN(value) ? 0 : value;
  }

  function bodiesOf(table, multi) {
    if (multi) { return Array.prototype.slice.call(table.querySelectorAll('tbody')); }
    if (table.tBodies && table.tBodies.length) { return [table.tBodies[0]]; }
    return [];
  }

  // 原始行序：首次交互时才打戳（全页几百行 × 十来张表，能不写就不写）
  function stamp(table, cfg) {
    var bodies = bodiesOf(table, cfg.multiBody);
    for (var b = 0; b < bodies.length; b++) {
      var rows = bodies[b].rows;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].getAttribute(cfg.orig) === null) { rows[i].setAttribute(cfg.orig, String(i)); }
      }
    }
  }

  function columnIndex(table, cfg, key) {
    var heads = table.querySelectorAll(cfg.head);
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].getAttribute(cfg.key) !== key) { continue; }
      var cells = heads[i].parentElement.children;
      for (var j = 0; j < cells.length; j++) {
        if (cells[j] === heads[i]) { return j; }
      }
    }
    return -1;
  }

  function sort(table, head, cfg) {
    var key = head.getAttribute(cfg.key);
    var state = head.getAttribute(cfg.stateAttr) || '';
    var next = state === '' ? 'asc' : (state === 'asc' ? 'desc' : '');

    // 同一张表里的其它表头一律清掉状态（箭头只出现在当前列）
    var heads = table.querySelectorAll(cfg.head);
    for (var i = 0; i < heads.length; i++) {
      heads[i].removeAttribute(cfg.stateAttr);
      if (cfg.dirAttr) { heads[i].removeAttribute(cfg.dirAttr); }
    }
    if (next) {
      head.setAttribute(cfg.stateAttr, next);
      if (cfg.dirAttr) { head.setAttribute(cfg.dirAttr, next); }
    }

    var index = cfg.cellOf ? 0 : columnIndex(table, cfg, key);
    if (!cfg.cellOf && index < 0) { return; }
    stamp(table, cfg);

    var bodies = bodiesOf(table, cfg.multiBody);
    for (var b = 0; b < bodies.length; b++) {
      var rows = Array.prototype.slice.call(bodies[b].rows);
      rows.sort(function (a, c) {
        var oa = origOf(a, cfg.orig);
        var oc = origOf(c, cfg.orig);
        if (next === '') { return oa - oc; }                 // 第三态：还原服务器原序
        var va = numeric(cfg.cellOf ? cfg.cellOf(a, key) : a.cells[index]);
        var vc = numeric(cfg.cellOf ? cfg.cellOf(c, key) : c.cells[index]);
        if (cfg.nullLast) {
          if (va === null && vc === null) { return oa - oc; }
          if (va === null) { return 1; }                     // `—` 恒排最后（升降序都一样）
          if (vc === null) { return -1; }
        } else {
          if (va === null) { va = 0; }
          if (vc === null) { vc = 0; }
        }
        if (va === vc) {
          if (cfg.tie) { return cfg.tie(a, c, key, oa, oc); }
          return oa - oc;
        }
        return next === 'desc' ? vc - va : va - vc;
      });
      for (var k = 0; k < rows.length; k++) { bodies[b].appendChild(rows[k]); }
    }
  }

  // ① 逐表绑定（表格是按需渲染/懒加载的 ⇒ 调用方可以反复调，这里自身幂等）
  function bind(table, cfg) {
    if (!table || !cfg) { return; }
    if (table.getAttribute(BOUND) === '1') { return; }
    table.setAttribute(BOUND, '1');
    var heads = table.querySelectorAll(cfg.head);
    for (var i = 0; i < heads.length; i++) {
      (function (head) {
        head.addEventListener('click', function () { sort(table, head, cfg); });
      })(heads[i]);
    }
  }

  // ② document 级代理（表是现拼进 DOM 的、拿不到插入时机时用这条）
  function delegate(cfg) {
    if (!cfg || cfg.__delegated) { return; }
    cfg.__delegated = true;
    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!target || !target.closest) { return; }
      var head = target.closest(cfg.head);
      if (!head) { return; }
      var table = head.closest('table');
      if (!table) { return; }
      sort(table, head, cfg);
    });
  }

  window.crsTableSort = {
    __full: true,
    bind: bind,
    delegate: delegate,
    sort: sort,
    numeric: numeric
  };
})();
