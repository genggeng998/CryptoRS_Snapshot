
(function () {
var CYCLE = {"dates":["2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-19","2026-09-20","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25","2026-09-26","2026-09-27","2026-09-28","2026-09-29","2026-09-30","2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-10","2026-10-11","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-17","2026-10-18","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-24"],"scores":[46.9,39.36,42.53,49.32,53.92,53.24,55.09,56.99,54.63,55.13,54.81,55.78,54.68,55.55,54.93,54.1,52.83,52.51,50.46,50.11,52.38,54.9,46.52,44.69,44.07,46.35,47.79,49.69,42.93,45.68,51.02,58.3,52.67,50.81,53.78,53.53,59.31,57.42,51.88,49.9],"zones":[["周期底部区",0.0,20.0],["偏底部",20.0,35.0],["中性",35.0,65.0],["偏顶部",65.0,80.0]],"current":49.9,"state":"中性"};
if (!CYCLE) { return; }
function draw() {
var node = document.getElementById('cycle-chart');
if (!node) { return; }
if (!window.echarts) {
node.innerHTML = '<div class="chart-fallback">ECharts 未加载（需要联网从 CDN 取库），周期分走势暂不可用。</div>';
return;
}
if (!CYCLE.scores || CYCLE.scores.length < 2) {
node.innerHTML = '<div class="chart-fallback">周期分走势从今天开始累积，明天起显示趋势。</div>';
return;
}
var bands = CYCLE.zones.map(function (zone) {
return [{ yAxis: zone[1], itemStyle: { color: {"周期底部区":"rgba(63,191,127,0.10)","偏底部":"rgba(63,191,127,0.05)","中性":"rgba(255,255,255,0.02)","偏顶部":"rgba(224,96,95,0.05)","周期顶部区":"rgba(224,96,95,0.10)"}[zone[0]] } }, { yAxis: zone[2] }];
});
var chart = crsCharts.init(node, null, { renderer: 'canvas' });
chart.setOption({
backgroundColor: 'transparent',
grid: { left: 34, right: 12, top: 12, bottom: 22 },
tooltip: {
trigger: 'axis',
formatter: function (params) {
return params[0].axisValue + '　周期分 ' + params[0].value;
}
},
xAxis: {
type: 'category', data: CYCLE.dates,
axisLabel: { color: '#89949b', fontSize: 9, interval: Math.max(0, Math.ceil(CYCLE.dates.length / 8) - 1) },
axisLine: { lineStyle: { color: '#38434a' } }
},
yAxis: {
type: 'value', min: 0, max: 100, interval: 20,
axisLabel: { color: '#89949b', fontSize: 9 },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
},
series: [{
type: 'line', data: CYCLE.scores, smooth: true, showSymbol: false,
lineStyle: { width: 2, color: '#cfe0e8' },
areaStyle: { color: 'rgba(207,224,232,0.10)' },
markArea: { silent: true, data: bands },
markLine: CYCLE.current === null ? undefined : {
silent: true, symbol: 'none', label: { show: false },
data: [{ yAxis: CYCLE.current, lineStyle: { color: '#d8a13c', type: 'dashed', width: 1 } }]
}
}]
});
function syncSize() {
if (node.clientWidth > 0 && node.clientHeight > 0) { chart.resize(); }
}
crsCharts.onResize(syncSize);
var panel = node.closest('.tab-panel');
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, syncSize);
}
}
if (document.readyState === 'complete') { draw(); } else { window.addEventListener('load', draw); }
})();