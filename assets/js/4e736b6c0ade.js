
(function () {
var UP = '#5a9e6f', DOWN = '#b85c5c', SELECTED = '#e3b23c';
var ROW = 30, GAP = 44, TOP = 30, LEFT = 108, RIGHT = 58;
var TITLES = ['1日相对强度', '1周相对强度'];
var KINDS = ['day', 'week'];
var chart = null, selected = null, DATA = null, host = null, box = null;

function fmt(value) {
if (value === null || value === undefined) { return '-'; }
return (value >= 0 ? '+' : '') + Number(value).toFixed(2) + '%';
}
function tone(value) {
if (value === null || value === undefined) { return ''; }
return value >= 0 ? 'up' : 'down';
}
function row(id) {
var item = DATA.sectors[id];
if (!item) { return null; }
return { id: id, label: item.l, rs: item.r, day: item.d, week: item.w, n: item.n, members: item.m };
}
function rowsOf(kind) { return (DATA[kind] || []).map(row).filter(Boolean); }
function find(kind, label) {
var rows = rowsOf(kind);
for (var i = 0; i < rows.length; i++) { if (rows[i].label === label) { return rows[i]; } }
return null;
}

function option() {
var grid = [], xAxis = [], yAxis = [], series = [], title = [], top = TOP;
KINDS.forEach(function (kind, index) {
var rows = rowsOf(kind);
var height = Math.max(72, rows.length * ROW);
grid.push({ left: LEFT, right: RIGHT, top: top, height: height });
var lowest = 0, highest = 0;
rows.forEach(function (item) {
var value = item[kind];
if (value === null || value === undefined) { return; }
if (value < lowest) { lowest = value; }
if (value > highest) { highest = value; }
});
var base = lowest;
var span = (highest - base) || 1;
xAxis.push({
type: 'value', gridIndex: index, min: 0, max: span * 1.14,
axisLabel: {
color: '#89949b', fontSize: 10,
formatter: function (value) { return (Math.round((value + base) * 100) / 100) + '%'; }
},
axisLine: { show: false }, axisTick: { show: false },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
});
yAxis.push({
type: 'category', gridIndex: index, inverse: true,
data: rows.map(function (item) { return item.label; }),
axisLabel: { color: '#c3ccd2', fontSize: 11 },
axisLine: { show: false }, axisTick: { show: false }
});
title.push({
text: TITLES[index], left: 6, top: top - 26,
textStyle: { color: '#d9dfe2', fontSize: 13, fontWeight: 600 }
});
series.push({
name: TITLES[index], type: 'bar', xAxisIndex: index, yAxisIndex: index, barMaxWidth: 16,
emphasis: { disabled: true },
blur: { itemStyle: { opacity: 1 }, label: { opacity: 1 } },
label: {
show: true, position: 'right', distance: 6, fontSize: 11, color: '#c3ccd2',
formatter: function (params) { return fmt(rows[params.dataIndex][kind]); }
},
data: rows.map(function (item) {
var value = item[kind];
var real = (value === null || value === undefined) ? 0 : value;
var style = { color: real >= 0 ? UP : DOWN, borderRadius: 2 };
if (selected === item.id) {
style.borderColor = SELECTED;
style.borderWidth = 2;
style.borderType = 'solid';
}
return { value: real - base, itemStyle: style };
})
});
top += height + GAP;
});
host.style.height = (top + 10) + 'px';
return {
backgroundColor: 'transparent', animation: false,
title: title, grid: grid, xAxis: xAxis, yAxis: yAxis, series: series,
tooltip: {
trigger: 'item', backgroundColor: 'rgba(21,26,30,.96)', borderColor: '#38434a',
textStyle: { color: '#d9dfe2', fontSize: 12 },
formatter: function (params) {
var kind = params.seriesIndex === 1 ? 'week' : 'day';
var item = find(kind, params.name);
if (!item) { return params.name; }
return [
'<b>' + item.label + '</b>',
'板块 RS_180 中位数 <b>' + fmt(item.rs) + '</b>',
'24h 相对强度 <b>' + fmt(item.day) + '</b>',
'7d 相对强度 <b>' + fmt(item.week) + '</b>',
'板块内币数 <b>' + item.n + '</b> 个（参与中位数）',
'<span style="color:#89949b">点一下右边看板块成分（按 RS_180 降序）</span>'
].join('<br/>');
}
}
};
}

function emptyMembers() {
if (box) {
box.innerHTML = '<div class="sector-members-empty">'
+ '点左侧任意一条，这里显示该板块的成分（按 RS_180 降序）。</div>';
}
}
function renderMembers() {
if (!box) { return; }
var item = selected ? row(selected) : null;
if (!item) { emptyMembers(); return; }
var head = '<div class="sector-members-head"><b>' + item.label + '</b>'
+ '<button type="button" class="note-toggle" id="sector-members-clear" title="清除选择（再点同一条也行）">'
+ '<span class="note-arrow">✕</span> 清除</button></div>'
+ '<div class="sector-members-stats">RS_180 中位数 ' + fmt(item.rs)
+ ' ｜ 24h 相对 ' + fmt(item.day) + ' ｜ 7d 相对 ' + fmt(item.week)
+ ' ｜ ' + item.n + ' 个币</div>';
var body = item.members.map(function (member, index) {
var coin = member[0];
return '<tr><td>' + (index + 1) + '</td>'
+ '<td class="symbol"><a class="symbol-link" data-coin="' + coin
+ '" data-tip-ref="' + coin + '">' + coin + '</a></td>'
+ '<td class="' + tone(member[1]) + '">' + fmt(member[1]) + '</td>'
+ '<td class="' + tone(member[2]) + '">' + fmt(member[2]) + '</td>'
+ '<td class="' + tone(member[3]) + '">' + fmt(member[3]) + '</td></tr>';
}).join('');
box.innerHTML = head
+ '<div class="sector-members-scroll"><table class="sector-table">'
+ '<thead><tr><th>#</th><th>币种</th><th>RS_180</th><th>24h</th><th>7d</th></tr></thead>'
+ '<tbody>' + body + '</tbody></table></div>';
if (window.crsFixLinks) { window.crsFixLinks(box); }
if (window.crsWatchMarks) { window.crsWatchMarks(); }
var clear = document.getElementById('sector-members-clear');
if (clear) {
clear.addEventListener('click', function () {
selected = null;
renderMembers();
chart.setOption(option());
});
}
}

function syncSize() {
if (!chart) { return; }
function doResize() { if (host.clientWidth > 0 && host.clientHeight > 0) { chart.resize(); } }
window.requestAnimationFrame(doResize);
window.setTimeout(doResize, 150);
}

function draw() {
if (chart) { return; }
if (!window.echarts) { return; }
host = document.getElementById('sector-chart');
var node = document.getElementById('sector-data');
box = document.getElementById('sector-members');
if (!host || !node || host.clientWidth <= 0) { return; }
try { DATA = JSON.parse(node.textContent); } catch (e) { return; }
var firstOption = option();
chart = crsCharts.init(host, null, { renderer: 'canvas' });
chart.setOption(firstOption);
renderMembers();
chart.on('click', function (params) {
var kind = params.seriesIndex === 1 ? 'week' : 'day';
var item = find(kind, params.name);
if (!item) { return; }
selected = (selected === item.id) ? null : item.id;
renderMembers();
chart.setOption(option());
});
syncSize();
}

var watching = false;
function refresh() { draw(); syncSize(); }
function watch() {
if (watching) { return; }
watching = true;
crsCharts.onResize(refresh);
document.addEventListener('click', refresh, true);
if (window.MutationObserver) {
var timer = null;
new MutationObserver(function () {
if (timer) { return; }
timer = window.setTimeout(function () { timer = null; refresh(); }, 50);
}).observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });
}
}
function boot() { refresh(); watch(); }
if (document.readyState === 'complete') { boot(); } else { window.addEventListener('load', boot); }
})();