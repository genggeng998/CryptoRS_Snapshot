
(function () {
var HEALTH = '#f2c14e';
function draw() {
Array.prototype.forEach.call(document.querySelectorAll('.us-heat .rs-heat-chart'), function (host) {
if (host.getAttribute('data-drawn') === '1') { return; }
var node = document.getElementById(host.id + '-data');
if (!node || !window.echarts) { return; }
var DATA;
try { DATA = JSON.parse(node.textContent) || {}; } catch (e) { return; }
var SERIES = DATA.series || [], SHORT = DATA.labels || {};
var DENOM = Number(DATA.denom || 0);
var statsBox = document.getElementById(host.id + '-stats');
var view = DATA.view === 'period' ? 'period' : 'day';
function label(quad) { return SHORT[quad] || quad; }
function rowsOf() { return (view === 'period' ? DATA.periods : DATA.daily) || []; }
function statsOf() { return (DATA.stats || {})[view] || (DATA.stats || {}).day || {}; }

function statsHtml() {
var s = statsOf();
if (!s || !s.max) { return '暂无数据'; }
var gap = Number(s.gap || 0);
var tail = Math.abs(gap) < 0.005 ? '与最高持平'
: '比最高' + (gap < 0 ? '低 ' + Math.abs(gap).toFixed(2) : '高 ' + gap.toFixed(2)) + 'pt';
return '最高 <b>' + s.max.health.toFixed(2) + '%</b>（' + s.max.label + '）'
+ ' · 最低 <b>' + s.min.health.toFixed(2) + '%</b>（' + s.min.label + '）'
+ ' · 当前 <b>' + s.current.health.toFixed(2) + '%</b>（' + s.current.label + '）'
+ ' · 均值 ' + s.mean.toFixed(2) + '% · ' + tail;
}

function option() {
var data = rowsOf();
var names = data.map(function (item) { return item.label; });
var series = SERIES.map(function (spec) {
return {
name: label(spec.quad), type: 'bar', stack: 'heat', barMaxWidth: 26,
itemStyle: { color: spec.color, opacity: 0.85, borderColor: '#0a0e11', borderWidth: 0.5 },
emphasis: { disabled: true },
blur: { itemStyle: { opacity: 0.85 }, lineStyle: { opacity: 1 }, label: { opacity: 1 } },
data: data.map(function (item) { return item[spec.key]; })
};
});
var s = statsOf(), marks = [];
if (s && s.max) { marks.push({ name: '最高', coord: [s.max.label, s.max.health], value: s.max.health }); }
if (s && s.min) { marks.push({ name: '最低', coord: [s.min.label, s.min.health], value: s.min.health }); }
series.push({
name: '健康度', type: 'line', yAxisIndex: 1, symbol: 'circle', symbolSize: 5, z: 5,
lineStyle: { color: HEALTH, width: 1.6 }, itemStyle: { color: HEALTH },
emphasis: { disabled: true },
blur: { itemStyle: { opacity: 1 }, lineStyle: { opacity: 1 }, label: { opacity: 1 } },
connectNulls: false,
data: data.map(function (item) { return item.health; }),
markPoint: {
symbol: 'pin', symbolSize: 32, data: marks,
itemStyle: { color: HEALTH, opacity: 0.9 },
label: { fontSize: 10, color: '#1b2227', formatter: function (p) { return Number(p.value).toFixed(1); } }
}
});
return {
backgroundColor: 'transparent', animation: false,
grid: { left: 54, right: 54, top: 32, bottom: 24 },
legend: { top: 0, textStyle: { color: '#a8b4bb', fontSize: 11 },
data: series.map(function (item) { return item.name; }) },
tooltip: {
trigger: 'axis',
formatter: function (params) {
var item = data[params[0].dataIndex];
var head = item.label + (view === 'day' ? '（' + item.count + ' 个 4H）' : '');
var lines = SERIES.slice().reverse().map(function (spec) {
return label(spec.quad) + ' <b>' + Number(item[spec.key]).toFixed(2) + '</b>';
});
return [head].concat(lines, [
'有效标的 <b>' + Number(item.total).toFixed(2) + '</b>　健康度 <b>'
+ Number(item.health).toFixed(2) + '%</b>（分母 ' + DENOM + '）'
]).join('<br/>');
}
},
xAxis: {
type: 'category', data: names, boundaryGap: true,
axisLabel: { color: '#89949b', fontSize: 10, interval: 'auto' },
axisLine: { lineStyle: { color: '#38434a' } }, axisTick: { show: false }
},
yAxis: [
{ type: 'value', name: view === 'day' ? '平均标的数' : '标的数',
nameTextStyle: { color: '#89949b', fontSize: 10 },
axisLabel: { color: '#89949b', fontSize: 10 },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
{ type: 'value', name: '健康度 %', min: 0, max: 100,
nameTextStyle: { color: '#89949b', fontSize: 10 },
axisLabel: { color: '#89949b', fontSize: 10, formatter: '{value}%' },
splitLine: { show: false } }
],
series: series
};
}

var chart = window.crsCharts
? window.crsCharts.init(host, null, { renderer: 'canvas' })
: window.echarts.init(host, null, { renderer: 'canvas' });
if (!chart) { return; }
chart.setOption(option(), true);
if (statsBox) { statsBox.innerHTML = statsHtml(); }
var buttons = host.closest('.rs-heat').querySelectorAll('.rs-heat-btn');
Array.prototype.forEach.call(buttons, function (btn) {
btn.addEventListener('click', function () {
view = btn.getAttribute('data-view') === 'period' ? 'period' : 'day';
Array.prototype.forEach.call(buttons, function (other) {
other.classList.toggle('is-active', other === btn);
});
chart.setOption(option(), true);
if (statsBox) { statsBox.innerHTML = statsHtml(); }
});
});
host.setAttribute('data-drawn', '1');
function resize() { if (host.clientWidth > 0 && host.clientHeight > 0) { chart.resize(); } }
resize();
window.setTimeout(resize, 200);
window.setTimeout(resize, 600);
if (window.crsCharts) {
window.crsCharts.onResize(resize);
var panel = host.closest('.tab-panel');
if (panel && window.crsCharts.watchPanel) { window.crsCharts.watchPanel(panel, resize); }
} else {
window.addEventListener('resize', resize);
}
});
}
function boot(tries) {
if (window.echarts) { draw(); return; }
if (tries > 0) { window.setTimeout(function () { boot(tries - 1); }, 200); }
}
if (document.readyState === 'complete') { boot(15); }
else { window.addEventListener('load', function () { boot(15); }); }
})();