
(function () {
function draw() {
var node = document.getElementById('us-relative-data');
var host = document.getElementById('us-relative-chart');
if (!node || !host || !window.echarts) { return; }
if (host.dataset.drawn === '1') { return; }
if (!host.clientWidth || !host.clientHeight) { return; }
var DATA;
try { DATA = JSON.parse(node.textContent); } catch (e) { return; }
if (!DATA.points || !DATA.points.length) { return; }
host.dataset.drawn = '1';
var COLORS = { green: '#2e9e58', red: '#d0453f', blue: '#3b82f6', gray: '#6b7280' };
var chart = crsCharts.init(host, null, { renderer: 'canvas' });
var bars = DATA.points.map(function (p) {
return { value: p.rel, itemStyle: { color: COLORS[p.color] || COLORS.gray } };
});
chart.setOption({
backgroundColor: 'transparent', animation: false,
grid: { left: 48, right: 18, top: 16, bottom: 44 },
tooltip: {
trigger: 'axis', axisPointer: { type: 'shadow' },
extraCssText: 'white-space:normal;max-width:300px;',
formatter: function (params) {
var p = DATA.points[params[0].dataIndex];
if (!p) { return ''; }
var why = p.color === 'blue' ? 'QQQ 跌时 BTC 逆势拉（优先级最高）'
: (p.color === 'green' ? 'BTC 强于 QQQ'
: (p.color === 'red' ? 'BTC 弱于 QQQ' : '两者持平'));
return p.date + '（T+1）<br/>'
+ 'BTC ' + (p.btc >= 0 ? '+' : '') + p.btc.toFixed(2) + '%<br/>'
+ 'QQQ ' + (p.qqq >= 0 ? '+' : '') + p.qqq.toFixed(2) + '%<br/>'
+ '相对 <b>' + (p.rel >= 0 ? '+' : '') + p.rel.toFixed(2) + '%</b><br/>'
+ '<span style="color:' + (COLORS[p.color] || COLORS.gray) + '">●</span> ' + why;
}
},
xAxis: {
type: 'category', data: DATA.points.map(function (p) { return p.date; }),
axisLabel: { color: '#89949b', fontSize: 10,
formatter: function (value) { return value.slice(5); } },
axisLine: { lineStyle: { color: '#38434a' } }, axisTick: { show: false }
},
yAxis: {
type: 'value', axisLabel: { color: '#89949b', fontSize: 10, formatter: '{value}%' },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
},
series: [{
name: 'BTC − QQQ', type: 'bar', data: bars, barMaxWidth: 18,
markLine: {   // 零点参考线（灰色虚线）
silent: true, symbol: 'none', animation: false, label: { show: false },
lineStyle: { color: 'rgba(255,255,255,0.35)', type: 'dashed', width: 1 },
data: [{ yAxis: 0 }]
}
}]
});
function syncSize() {
if (host.clientWidth > 0) { chart.resize(); }
window.setTimeout(function () { if (host.clientWidth > 0) { chart.resize(); } }, 160);
}
syncSize();
crsCharts.onResize(syncSize);
var panel = host.closest('.tab-panel');
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, syncSize);
}
}
if (document.readyState === 'complete') { draw(); } else { window.addEventListener('load', draw); }
document.addEventListener('click', function (event) {
var el = event.target && event.target.closest ? event.target.closest('[data-tab]') : null;
if (el) { window.setTimeout(draw, 80); }
}, true);
})();