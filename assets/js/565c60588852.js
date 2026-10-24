
(function () {
function draw() {
var node = document.getElementById('us-anomaly-data');
var host = document.getElementById('us-anomaly-chart');
if (!node || !host || !window.echarts) { return; }
if (host.dataset.drawn === '1') { return; }
if (!host.clientWidth || !host.clientHeight) { return; }
host.dataset.drawn = '1';
var DATA;
try { DATA = JSON.parse(node.textContent); } catch (e) { return; }
var SAMEC = '#2e9e58', OPPC = '#d0453f', ZERO = 'rgba(255,255,255,0.25)';
var view = '7';
var chart = crsCharts.init(host, null, { renderer: 'canvas' });

function points() { return (DATA.history[view] || {}).points || []; }
function option() {
var pts = points();
var same = pts.filter(function (p) { return p.same; });
var opp = pts.filter(function (p) { return !p.same; });
function series(name, color, rows) {
return {
name: name, type: 'scatter', data: rows.map(function (p) {
return { value: [p.x, p.y], meta: p,
symbolSize: Math.max(7, Math.min(30, 5 + Math.abs(p.x) * 3.2)) };
}),
itemStyle: { color: color, opacity: 0.85 },
emphasis: { itemStyle: { borderColor: '#fff', borderWidth: 1 } }
};
}
return {
backgroundColor: 'transparent', animation: false,
grid: { left: 56, right: 20, top: 30, bottom: 42 },
legend: { top: 0, data: ['同向', '反向'], textStyle: { color: '#a8b4bb', fontSize: 11 } },
tooltip: {
trigger: 'item',
formatter: function (p) {
var m = p.data && p.data.meta;
if (!m) { return ''; }
return m.day + ' ' + m.time + ' · <b>' + m.symbol + '</b><br/>'
+ '异动 ' + (m.direction === 'up' ? '↑ 涨' : '↓ 跌') + ' <b>' + m.multiple.toFixed(2) + 'x</b>'
+ '（' + (m.x > 0 ? '+' : '') + m.x.toFixed(2) + '）<br/>'
+ 'BTC 反应 <b>' + (m.y >= 0 ? '+' : '') + m.y.toFixed(2) + '%</b> '
+ (m.same ? '（同向）' : '（反向）') + '<br/>档位 ' + (DATA.levelLabels[m.level] || m.level);
}
},
xAxis: {
type: 'value', name: '美股异动幅度（±ATR 倍数）', nameLocation: 'middle', nameGap: 26,
nameTextStyle: { color: '#89949b', fontSize: 10 },
axisLabel: { color: '#89949b', fontSize: 10 }, splitLine: { show: false },
axisLine: { lineStyle: { color: '#38434a' } },
axisPointer: { show: false }
},
yAxis: {
type: 'value', name: 'BTC 反应 %', nameLocation: 'middle', nameRotate: 90, nameGap: 44,
nameTextStyle: { color: '#89949b', fontSize: 10 },
axisLabel: { color: '#89949b', fontSize: 10, formatter: '{value}%' },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
},
series: [
{
name: '零轴', type: 'scatter', data: [],
markLine: {
silent: true, symbol: 'none', animation: false,
label: { show: false },
lineStyle: { color: ZERO, type: 'dashed', width: 1 },
data: [{ xAxis: 0 }, { yAxis: 0 }]
}
}
].concat([series('同向', SAMEC, same), series('反向', OPPC, opp)])
};
}
chart.setOption(option());
var buttons = document.querySelectorAll('.us-anomaly-btn');
Array.prototype.forEach.call(buttons, function (btn) {
btn.addEventListener('click', function () {
view = btn.getAttribute('data-window') === '30' ? '30' : '7';
Array.prototype.forEach.call(buttons, function (other) {
other.classList.toggle('is-active', other === btn);
});
Array.prototype.forEach.call(document.querySelectorAll('.us-anomaly-stats'), function (box) {
box.hidden = box.getAttribute('data-window') !== view;
});
chart.setOption(option(), true);
});
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