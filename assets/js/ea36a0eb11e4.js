
(function () {
var INSTANCES = (window.crsMaRotInstances && window.crsMaRotInstances.length)
? window.crsMaRotInstances : [{ key: '1d', suffix: '' }];
var GRID = { left: 4, right: 12, top: 6, bottom: 46 };
var COLORS = {
'1': '#8b2e2e', '2': '#c9873c', '3': '#5b7fa5', '4': '#c97a7a',
'5': '#8e6bb0', '6': '#7ba87b', '7': '#2d6a4f'
};
var TITLES = {
'1': '未启动（从未站上 MA20）',
'2': '跌回（跌破 MA20 且跌破 MA50，本轮没站上过 MA50 或已被重置）',
'3': '回调（只跌破 MA20、仍在 MA50 上方）',
'4': '破位（本轮曾站上 MA50，MA20 与 MA50 都跌破）',
'5': '启动中（> MA20、≤ MA50，本轮还没站上过 MA50）',
'6': '走弱（本轮曾站上 MA50，现在 > MA20 但 ≤ MA50）',
'7': '强势（本轮曾站上 MA50，当前 > MA50）'
};
var STATES = ['1', '2', '3', '4', '5', '6', '7'];
var PANEL_BG = '#222a2f';
var UNDONE = '9';
var UNDONE_COLOR = '#3f4a52';
var UNDONE_TITLE = '数据不足（该币这个日期还没有 MA20）';
var STATESET = {};                       // key -> {inst, ids, start, active, chart, data, size}
var ALL = [];

function node(id) { return document.getElementById(id); }
function shortDay(iso) { return String(iso).slice(5); }
function idsOf(inst) {
var sfx = inst.suffix || '';
return {
key: inst.key, suffix: sfx,
data: 'ma-rot-data' + sfx, host: 'ma-rot-chart' + sfx,
names: 'ma-rot-names' + sfx, range: 'ma-rot-range' + sfx
};
}
function colorOf(st, key) {
var map = st.data && st.data.levelColors;
return (map && map[key]) || COLORS[key] || '#666';
}
function titleOf(st, key) {
var map = st.data && st.data.levelTitles;
return (map && map[key]) || TITLES[key] || ('未知档位 ' + key);
}
function aboveFrom(st) { return Number((st.data && st.data.aboveMa20From) || 5); }
function fmtPrice(value) {
if (value === null || value === undefined || !isFinite(value)) { return '—'; }
var abs = Math.abs(value);
var digits = abs >= 1000 ? 2 : abs >= 1 ? 3 : abs >= 0.01 ? 5 : 7;
return value.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
}
function daysBetween(from, to) {
var a = Date.parse(from + 'T00:00:00Z'), b = Date.parse(to + 'T00:00:00Z');
if (!isFinite(a) || !isFinite(b)) { return null; }
return Math.round((b - a) / 86400000);
}
function info(st) {
var data = st.data || { dates: [] };
var win = data.window || 90, total = data.dates.length;
var step = Math.max(1, data.step || 30);
var maxStart = Math.max(0, total - win);
var maxPage = Math.max(0, Math.ceil(maxStart / step));
var page = Math.max(0, Math.min(st.page || 0, maxPage));
var from = Math.min(maxStart, page * step);
return { from: from, to: Math.min(total, from + win), total: total, win: win,
step: step, page: page, maxPage: maxPage, pageCount: maxPage + 1 };
}
function labelStep(count) { return Math.max(0, Math.ceil(count / 13) - 1); }
function unpackLevels(packed) {
var text = String(packed === null || packed === undefined ? '' : packed);
var out = '', count = 0, i = 0;
while (i < text.length) {
var ch = text.charAt(i);
if (ch >= 'a' && ch <= 'z') { count = count * 26 + (ch.charCodeAt(0) - 96); i++; continue; }
out += new Array((count || 1) + 1).join(ch);
count = 0;
i++;
}
return out;
}

function buildOption(st) {
var data = st.data, box = info(st), xdata = [], ydata = [], items = [], i, y;
for (i = box.from; i < box.to; i++) { xdata.push(shortDay(data.dates[i])); }
for (y = 0; y < data.rows.length; y++) { ydata.push(data.rows[y].coin); }
for (y = 0; y < data.rows.length; y++) {
var row = data.rows[y];
var dim = !!st.active && row.coin !== st.active;
var on = !!st.active && row.coin === st.active;
for (i = 0; i < xdata.length; i++) {
var level = String(row.lv || '').charAt(box.from + i);
if (!level || level === '0') {
items.push({
value: [i, y, 0],
itemStyle: { color: PANEL_BG, borderColor: PANEL_BG, borderWidth: 1, borderRadius: 1 }
});
continue;
}
var undone = level === UNDONE;
var item = { value: [i, y, undone ? 0 : Number(level)] };
if (undone || on || dim) {
item.itemStyle = {
color: undone ? UNDONE_COLOR : undefined,
opacity: dim ? 0.2 : 1,
borderColor: on ? '#e3b23c' : PANEL_BG,
borderWidth: 1
};
}
items.push(item);
}
}
return {
animation: false,
grid: GRID,
tooltip: {
trigger: 'item',
backgroundColor: 'rgba(21,26,30,.96)',
borderColor: '#38434a',
textStyle: { color: '#d9dfe2', fontSize: 12 },
formatter: function (p) {
var box2 = info(st), data2 = st.data;
var row = data2.rows[p.data.value[1]], day = data2.dates[box2.from + p.data.value[0]];
var level = String(row.lv || '').charAt(box2.from + p.data.value[0]);
if (!level || level === '0') {
return '<div>'
+ '<div class="ma-rot-tip-head">' + row.coin
+ '<span class="ma-rot-tip-first">'
+ (row.first ? '本轮首次站上 MA20 ' + row.first : '本轮未站上 MA20') + '</span></div>'
+ '<div class="ma-rot-tip-row">日期：' + day + '</div>'
+ '<div class="ma-rot-tip-row">收盘价：—</div>'
+ '<div class="ma-rot-tip-row">档位：<span style="color:#89949b">该日无数据（格子留空）'
+ '</span></div>'
+ '<div class="ma-rot-tip-row">（成因：这币当日不在广度池 / 本地 K 线库里没有这一根）'
+ '</div>'
+ '</div>';
}
var since = row.first ? daysBetween(row.first, day) : null;
var inLeg = since !== null && since >= 0;
var aboveMa20 = level !== UNDONE && Number(level) >= aboveFrom(st);
var legText = !row.first
? '本轮还没站上过 MA20'
: (inLeg ? since + ' 天'
: (level === UNDONE ? '该根还没有 MA20（上市不满 20 根）'
: (aboveMa20 ? '该日在更早的一轮里（本轮自 ' + row.first + ' 起）'
: '该日当时还在 MA20 下方')));
var title = level === UNDONE
? '<span style="color:' + UNDONE_COLOR + '">' + UNDONE_TITLE + '</span>'
: '<span style="color:' + colorOf(st, level) + '">' + titleOf(st, level) + '</span>';
return '<div>'
+ '<div class="ma-rot-tip-head">' + row.coin
+ '<span class="ma-rot-tip-first">'
+ (row.first ? '本轮首次站上 MA20 ' + row.first : '本轮未站上 MA20') + '</span></div>'
+ '<div class="ma-rot-tip-row">日期：' + day + '</div>'
+ '<div class="ma-rot-tip-row">收盘价：'
+ (function () {
var idx2 = box2.from + p.data.value[0] - (data2.priceIndex || 0);
return idx2 < 0 ? '—（更早的窗口不带收盘价）' : fmtPrice(row.cl[idx2]);
})() + '</div>'
+ '<div class="ma-rot-tip-row">档位：' + title + '</div>'
+ '<div class="ma-rot-tip-row">距本轮首次站上 MA20：' + legText + '</div>'
+ (inLeg || level === UNDONE
? '' : '<div class="ma-rot-tip-row">（「站上 MA20」只看收盘价，不要求整根 K 线在均线上方）</div>')
+ '</div>';
}
},
xAxis: {
type: 'category', data: xdata, axisTick: { show: false },
axisLine: { lineStyle: { color: '#38434a' } },
splitArea: { show: false },
axisLabel: { color: '#89949b', fontSize: 10.5, interval: labelStep(xdata.length) }
},
yAxis: {
inverse: true,
type: 'category', data: ydata, axisTick: { show: false }, axisLine: { show: false },
axisLabel: { show: false }, splitArea: { show: false }, splitLine: { show: false }
},
visualMap: {
show: false, min: 1, max: 6,
pieces: STATES.map(function (key) { return { value: Number(key), color: colorOf(st, key) }; })
},
series: [{
type: 'heatmap', data: items,
progressive: 6000,
itemStyle: { borderWidth: 1, borderColor: PANEL_BG, borderRadius: 1 },
emphasis: { itemStyle: { borderColor: '#e3b23c', borderWidth: 1 } }
}]
};
}

function alignNames(st) {
var names = node(st.ids.names), host = node(st.ids.host);
if (!names || !host) { return; }
var height = Math.round(host.clientHeight - GRID.top - GRID.bottom);
if (height > 20 && names.dataset.h !== String(height)) {
names.dataset.h = String(height);
names.style.height = height + 'px';
names.style.marginTop = GRID.top + 'px';
}
}

function syncNames(st) {
var names = node(st.ids.names);
if (!names) { return; }
var rows = names.querySelectorAll('[data-ma-rot-coin]');
for (var i = 0; i < rows.length; i++) {
var on = !!st.active && rows[i].getAttribute('data-ma-rot-coin') === st.active;
if (on !== rows[i].classList.contains('on')) {
if (on) { rows[i].classList.add('on'); } else { rows[i].classList.remove('on'); }
}
}
}

function render(st) {
var data = st.data, box = info(st);
var cells = (box.to - box.from) * data.rows.length;
var cols = box.to - box.from, rowsN = data.rows.length;
var pageCount = box.pageCount, page = box.page + 1;
var text = data.dates.length
? '当前窗口：<b>' + data.dates[box.from] + ' ~ ' + data.dates[box.to - 1]
+ '</b> · 本页 <b>' + cells + '</b> 格（' + cols + ' × ' + rowsN + '）· 第 <b>'
+ page + '/' + pageCount + '</b> 页（只画这一页；全部 ' + data.dates.length + ' '
+ (data.unit || '天') + '不预渲染）'
: '';
['ma-rot-range', 'ma-rot-range-foot'].forEach(function (prefix) {
var node1 = node(prefix + (st.ids.suffix || ''));
if (node1) { node1.innerHTML = text; }
});
['ma-rot-page', 'ma-rot-page-foot'].forEach(function (prefix) {
var node1 = node(prefix + (st.ids.suffix || ''));
if (node1) { node1.textContent = page + '/' + pageCount; }
});
var root = node('ma-rot' + st.ids.suffix);
if (root) {
root.querySelectorAll('[data-ma-rot="prev"]').forEach(function (el) { el.disabled = box.from <= 0; });
root.querySelectorAll('[data-ma-rot="next"]').forEach(function (el) { el.disabled = box.to >= box.total; });
}
if (st.chart) { st.chart.setOption(buildOption(st)); }
syncNames(st);
alignNames(st);
}

function toggle(st, coin) {
if (!coin) { return; }
st.active = (st.active === coin) ? '' : coin;
render(st);
}

function shift(st, delta) {
var box = info(st);
var next = Math.max(0, Math.min(box.page + delta, box.maxPage));
if (next === box.page) { return; }
st.page = next;
render(st);
}

function bindNames(st) {
var names = node(st.ids.names);
if (!names || names.dataset.bound === '1') { return; }
names.dataset.bound = '1';
names.addEventListener('click', function (event) {
var target = event.target;
if (!target || !target.closest) { return; }
if (target.closest('a')) { return; }              // 币名链接自己走跳转 / 右键菜单
var row = target.closest('[data-ma-rot-coin]');
if (row) { toggle(st, row.getAttribute('data-ma-rot-coin')); }
});
}

function draw(st, force) {
var dataNode = node(st.ids.data), host = node(st.ids.host);
if (!dataNode || !host || !window.echarts) { return; }
if (!host.clientWidth || !host.clientHeight) { return; }   // 面板在后台（0×0）：等下一次钩子
if (st.chart && !force) { return; }
if (!st.data) {
var data = null;
try { data = JSON.parse(dataNode.textContent || '{}'); } catch (e) { data = null; }
if (!data || !data.dates || !data.dates.length || !data.rows || !data.rows.length) {
host.innerHTML = '<div class="chart-fallback">暂无数据（均线轮动至少需要 21 根已收盘 K 线）。</div>';
return;
}
st.data = data;
for (var index = 0; index < data.rows.length; index++) {
data.rows[index].lv = unpackLevels(data.rows[index].lv);
}
st.page = Math.max(0, Math.ceil(
Math.max(0, data.dates.length - (data.window || 90)) / Math.max(1, data.step || 30)
));
}
if (!st.chart) {
st.chart = crsCharts.init(host, null, { renderer: 'canvas' });
st.size = host.clientWidth + 'x' + host.clientHeight;
var rawResize = st.chart.resize.bind(st.chart);
st.chart.resize = function () {
var size = host.clientWidth + 'x' + host.clientHeight;
if (size === st.size) { return; }
st.size = size;
return rawResize();
};
st.chart.on('click', function (p) {
if (!p || !p.data || !p.data.value) { return; }
var row = st.data.rows[p.data.value[1]];
if (row) { toggle(st, row.coin); }
});
bindNames(st);
}
render(st);
}

window.crsMaRotFocus = function (coin, key) {
for (var i = 0; i < ALL.length; i++) {
if (!key || ALL[i].key === key) { toggle(ALL[i], coin); }
}
};
window.crsMaRotDraw = function (force) {
for (var i = 0; i < ALL.length; i++) { draw(ALL[i], force); }
};

for (var index = 0; index < INSTANCES.length; index++) {
var inst = INSTANCES[index];
var ids = idsOf(inst);
var st = { key: inst.key, ids: ids, page: 0, active: '', chart: null, data: null, size: '' };
STATESET[inst.key] = st;
ALL.push(st);
}

function boot() { window.crsMaRotDraw(false); }
if (document.readyState === 'complete') { boot(); }
else { window.addEventListener('load', boot); }
crsCharts.onResize(function () {
window.setTimeout(function () {
for (var i = 0; i < ALL.length; i++) {
var st = ALL[i], host = node(st.ids.host);
if (!host || !st.chart) { window.crsMaRotDraw(false); continue; }
var size = host.clientWidth + 'x' + host.clientHeight;
if (size === st.size) { continue; }
st.size = size;
st.chart.resize();
render(st);
}
}, 160);
});
document.addEventListener('click', function (event) {
var target = event.target;
if (target && target.closest && target.closest('[data-tab]')) {
window.setTimeout(function () { window.crsMaRotDraw(false); }, 80);
}
}, true);
document.addEventListener('click', function (event) {
var target = event.target;
var btn = target && target.closest ? target.closest('[data-ma-rot]') : null;
if (!btn) { return; }
var root = btn.closest ? btn.closest('[data-ma-rot-key]') : null;
var key = root ? root.getAttribute('data-ma-rot-key') : '';
var st = STATESET[key];
if (!st) { return; }
var act = btn.getAttribute('data-ma-rot');
if (act === 'prev') { shift(st, -1); }
else if (act === 'next') { shift(st, 1); }
else if (act === 'latest') {
var box = info(st);
st.page = box.maxPage;
render(st);
}
}, true);
})();