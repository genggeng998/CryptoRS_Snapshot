
(function () {
var INSTANCES = (window.crsVolGrowthInstances && window.crsVolGrowthInstances.length)
? window.crsVolGrowthInstances : [{ key: 'all', suffix: '' }];
var GRID = { left: 56, right: 22, top: 10, bottom: 60 };
var PANEL_BG = '#222a2f';
var FALLBACK = { S: '#C5A55A', A: '#8E6BB0', B: '#5B8BB5', C: '#4DA6B3', D: '#B0B0B0' };
var STATES = ['S', 'A', 'B', 'C', 'D'];
var ALL = [];

function node(id) { return document.getElementById(id); }
function shortDay(iso) { return String(iso).slice(5); }
function colors(st) { return (st.data && st.data.ratingColors) || FALLBACK; }
function titleOf(st, letter) {
var map = (st.data && st.data.ratingTitles) || {};
return map[letter] || (letter + ' 级');
}
function rsRating(ticker) {
try { return (window.rsRating ? window.rsRating(ticker) : '') || ''; } catch (e) { return ''; }
}
function rsColor(ticker) {
try { return (window.rsRatingColor ? window.rsRatingColor(ticker) : '') || ''; } catch (e) { return ''; }
}
function shortName(name) {
var s = String(name || '');
if (s.length > 4 && s.slice(0, 4) === '1000') { s = s.slice(4); }
else if (s.length > 7 && s.slice(0, 7) === '1000000') { s = s.slice(7); }
return s.length > 4 ? s.slice(0, 4) : s;
}
function inkOf(hex) {
var h = String(hex || '').replace('#', '');
if (h.length === 3) { h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2); }
var r = parseInt(h.slice(0, 2), 16) || 0, g = parseInt(h.slice(2, 4), 16) || 0, b = parseInt(h.slice(4, 6), 16) || 0;
return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#13212a' : '#f2f6f8';
}
function decodeRuns(packed) {
var text = String(packed === null || packed === undefined ? '' : packed);
var out = '', count = '', i = 0;
while (i < text.length) {
var ch = text.charAt(i);
if (ch >= '0' && ch <= '9') { count += ch; i++; continue; }
out += new Array((count ? Number(count) : 1) + 1).join(ch);
count = '';
i++;
}
return out;
}
function fmtGrowth(value) {
if (value === null || value === undefined) { return '—'; }
return (value >= 0 ? '+' : '') + (value / 100).toFixed(2) + '%';
}
function statsText(data, ticker) {
var stat = (data.stats || {})[ticker];
if (!stat || !stat.n) { return '近30天未上榜'; }
return '近30天上榜 ' + stat.n + ' 次 · 平均名次 ' + (stat.sum / stat.n).toFixed(1);
}
function hoverName(ticker) {
var s = String(ticker || '').split('/')[0];
if (s.length > 4 && s.slice(0, 4) === '1000') { s = s.slice(4); }
else if (s.length > 7 && s.slice(0, 7) === '1000000') { s = s.slice(7); }
return s;
}
var STROKE_PX = 1.5;        // 主描边宽度
var GLOW_PX = 1;            // 内侧辉光那一圈
var GLOW_ALPHA = 0.35;      // 「极轻」的辉光透明度
function strokeLayer(strokes) {
return {
type: 'custom', zlevel: 1, z: 5, silent: true, animation: false,
renderItem: function (params, api) {
var center = api.coord([api.value(0), api.value(1)]);
var size = api.size([1, 1]);
var color = api.value(2);
if (!color || !isFinite(center[0]) || !isFinite(center[1]) || !size[0]) {
return { type: 'group', children: [] };
}
var ring = function (padPx, width, alpha) {
return {
type: 'rect',
shape: {
x: center[0] - size[0] / 2 + padPx, y: center[1] - size[1] / 2 + padPx,
width: Math.max(1, size[0] - padPx * 2), height: Math.max(1, size[1] - padPx * 2), r: 1
},
style: { fill: 'transparent', stroke: color, lineWidth: width, opacity: alpha },
silent: true
};
};
return {
type: 'group',
children: [ring(STROKE_PX / 2, STROKE_PX, 1), ring(STROKE_PX * 1.5, GLOW_PX, GLOW_ALPHA)]
};
},
data: strokes
};
}
function pageCount(st) {
var data = st.data || { dates: [] };
var win = data.window || 30, step = data.step || win, total = data.dates.length;
return Math.max(1, Math.ceil(Math.max(0, total - win) / Math.max(1, step)) + 1);
}
function info(st) {
var data = st.data || { dates: [] };
var win = data.window || 30, step = data.step || win, total = data.dates.length;
var count = pageCount(st);
var page = Math.max(0, Math.min(st.page || 0, count - 1));
var maxFrom = Math.max(0, total - win);
var from = Math.min(page * step, maxFrom);
return { from: from, to: Math.min(total, from + win), total: total,
win: win, step: step, page: page, count: count };
}
function labelStep(count) { return Math.max(0, Math.ceil(count / 16) - 1); }

function buildOption(st) {
var data = st.data, box = info(st), xdata = [], ydata = [], items = [], i, y;
var lastAt = (data.dates || []).length - 1;
var strokeMap = data.stateStrokes || {};
var strokes = [];
for (i = box.from; i < box.to; i++) { xdata.push(shortDay(data.dates[i])); }
for (y = 0; y < data.slots.length; y++) { ydata.push('第 ' + data.slots[y].rank + ' 名'); }
for (y = 0; y < data.slots.length; y++) {
var slot = data.slots[y];
var marks = String(slot.lv || '');
var rateMarks = String(slot.rate || '');
for (i = box.from; i < box.to; i++) {
var letter = marks.charAt(i);
if (!letter || letter === '.') { continue; }
var ticker = slot.coins[i] >= 0 ? (data.labels[slot.coins[i]] || '') : '';
var rateLetter = rateMarks.charAt(i);
var color = colors(st)[rateLetter] || colors(st)[letter] || FALLBACK[letter];
var dim = !!st.active && ticker !== st.active;
var on = !!st.active && ticker === st.active;
if (i === lastAt && !dim && strokeMap[ticker]) {
strokes.push([i - box.from, y, strokeMap[ticker]]);
}
items.push({
value: [i - box.from, y, STATES.indexOf(letter)],
meta: { at: i, slot: y, letter: letter, ticker: ticker },
itemStyle: { color: color, opacity: dim ? 0.18 : 1, borderColor: on ? '#e3b23c' : PANEL_BG },
label: { color: inkOf(color), formatter: shortName(ticker) }
});
}
}
var heatSeries = {
type: 'heatmap',
data: items,
label: {
show: true, fontSize: 11, color: '#f2f6f8', overflow: 'truncate',
formatter: function (p) { return (p.data.meta && p.data.meta.ticker) ? shortName(p.data.meta.ticker) : ''; }
},
itemStyle: { borderColor: PANEL_BG, borderWidth: 1, borderRadius: 2 },
emphasis: { itemStyle: { borderColor: '#dfe6ea', borderWidth: 1 } }
};
return {
animation: false,
backgroundColor: 'transparent',
grid: GRID,
tooltip: {
trigger: 'item',
confine: true,
backgroundColor: 'rgba(18,22,25,0.96)',
borderColor: '#3a444b',
textStyle: { color: '#dfe6ea', fontSize: 12 },
formatter: function (params) {
var meta = params.data && params.data.meta;
if (!meta) { return ''; }
var slot = data.slots[meta.slot];
var index = slot.coins[meta.at];
var label = index >= 0 ? data.labels[index] : '—';
return data.dates[meta.at] + ' · ' + hoverName(label) + ' · 第 ' + slot.rank + ' 名<br/>'
+ '相对增长 ' + fmtGrowth(slot.growth[meta.at]) + ' · 评级 ' + (meta.letter || rsRating(label))
+ '<br/>' + statsText(data, label);
}
},
xAxis: {
type: 'category',
data: xdata,
splitArea: { show: false },
axisLabel: { color: '#9aa7b0', fontSize: 11, interval: labelStep(xdata.length), rotate: 0 },
axisTick: { show: false },
axisLine: { lineStyle: { color: '#3a444b' } }
},
yAxis: {
type: 'category',
data: ydata,
inverse: true,
axisLabel: { color: '#9aa7b0', fontSize: 11 },
axisTick: { show: false },
axisLine: { lineStyle: { color: '#3a444b' } }
},
series: [heatSeries].concat(strokes.length ? [strokeLayer(strokes)] : [])
};
}

function render(st) {
var data = st.data || { dates: [] };
if (!data.dates || !data.dates.length) { return; }
var box = info(st);
st.page = box.page;
if (st.chart) { st.chart.setOption(buildOption(st), true);  alignLeft(st); }
var cols = box.to - box.from, rows = data.slots.length;
var text = '当前窗口：<b>' + data.dates[box.from] + ' ~ ' + data.dates[box.to - 1] + '</b> · 本页 <b>'
+ (cols * rows) + '</b> 格（' + cols + ' × ' + rows + '）· 第 <b>'
+ (box.page + 1) + '/' + box.count + '</b> 页（只画这一页；全部 ' + box.total + ' 天不预渲染）';
['vol-growth-range' + st.suffix, 'vol-growth-range-foot' + st.suffix].forEach(function (id) {
var n = node(id); if (n) { n.innerHTML = text; }
});
['vol-growth-page' + st.suffix, 'vol-growth-page-foot' + st.suffix].forEach(function (id) {
var n = node(id); if (n) { n.textContent = (box.page + 1) + '/' + box.count; }
});
st.root.querySelectorAll('[data-vol-growth="prev"]').forEach(function (b) { b.disabled = box.page <= 0; });
st.root.querySelectorAll('[data-vol-growth="next"]').forEach(function (b) { b.disabled = box.page >= box.count - 1; });
}

function syncTop(st) {
var top = st.root.querySelector('.rs-rank-top');
if (!top) { return; }
top.querySelectorAll('[data-coin]').forEach(function (a) {
var boxEl = a.parentElement;
if (boxEl) { boxEl.classList.toggle('active', !!st.active && a.getAttribute('data-coin') === st.active); }
});
}
function toggle(st, ticker) {
if (!ticker) { return; }
st.active = (st.active === ticker) ? '' : ticker;
draw(st);
syncTop(st);
}
function bindPick(st) {
if (st.bound) { return; }
st.bound = true;
st.chart.on('mousedown', function (p) {
var pressed = (p.event && (p.event.event || p.event)) || {};
if (pressed.button) { return; }
var meta = p.data && p.data.meta;
if (!meta) { return; }
toggle(st, meta.ticker);
});
var hoveredMeta = null;
st.chart.on('mouseover', function (p) {
hoveredMeta = (p.data && p.data.meta) || null;
});
st.chart.on('globalout', function () { hoveredMeta = null; });
st.chart.getZr().on('contextmenu', function (event) {
if (!hoveredMeta || !hoveredMeta.ticker) { return; }   // 不在格子上 → 交回浏览器默认菜单
var native = event.event || {};
if (native.preventDefault) { native.preventDefault(); }
if (native.stopPropagation) { native.stopPropagation(); }
if (window.crsCoinMenu) { window.crsCoinMenu(hoveredMeta.ticker, native.clientX, native.clientY); }
});

var top = st.root.querySelector('.rs-rank-top');
if (top) {
top.addEventListener('click', function (ev) {
var a = ev.target && ev.target.closest ? ev.target.closest('a[data-coin]') : null;
if (!a) { return; }
ev.preventDefault();
toggle(st, a.getAttribute('data-coin'));
});
}
}

function hostOf(st) { return node('vol-growth-chart' + (st.suffix || '')); }
function build(st, host) {
if (!window.echarts) { return; }
st.chart = crsCharts.init(host, null, { renderer: 'canvas' });
st.size = host.clientWidth + 'x' + host.clientHeight;
bindPick(st);
}
function alignLeft(st) {
var root = st.root, host = hostOf(st), chart = st.chart;
if (!root || !host || !chart || !chart.getWidth()) { return; }
var left = NaN, right = NaN, rect = null;
try {
var rect0 = chart.getModel().getComponent('grid').coordinateSystem.getRect();
if (rect0 && isFinite(rect0.x)) { rect = rect0; }
} catch (err) { rect = null; }
try {
var c0 = chart.convertToPixel({ xAxisIndex: 0 }, 0);
var c1 = chart.convertToPixel({ xAxisIndex: 0 }, 1);
if (isFinite(c0) && isFinite(c1) && c1 > c0) { left = c0 - (c1 - c0) / 2; }
} catch (err2) { left = NaN; }
if (!isFinite(left) && rect) { left = rect.x; }
if (!isFinite(left) || left < 0) { return; }        // 算不出来就留着 CSS 兜底值
root.style.setProperty('--rs-rank-left', left.toFixed(1) + 'px');
if (rect && isFinite(rect.width)) {
right = chart.getWidth() - rect.x - rect.width;
if (isFinite(right) && right >= 0) { root.style.setProperty('--rs-rank-right', right.toFixed(1) + 'px'); }
}
}

function syncSize(st) {
var host = hostOf(st);
if (!host) { return 0; }
var box = host.clientWidth + 'x' + host.clientHeight;
if (box === st.size) { return 0; }
st.size = box;
if (host.clientWidth <= 0 || host.clientHeight <= 0) { return 0; }
if (!st.chart) { build(st, host); return 1; }
st.chart.resize();
return 2;
}
function draw(st) {
syncSize(st);
if (st.chart) { render(st); alignLeft(st); }
}

function boot() {
INSTANCES.forEach(function (inst) {
var suffix = inst.suffix || '';
var root = node('vol-growth' + suffix);
var host = node('vol-growth-chart' + suffix);
var dataNode = node('vol-growth-data' + suffix);
if (!root || !host || !dataNode || !window.echarts) { return; }
var data;
try { data = JSON.parse(dataNode.textContent); } catch (err) { return; }
for (var slotIndex = 0; slotIndex < (data.slots || []).length; slotIndex++) {
data.slots[slotIndex].lv = decodeRuns(data.slots[slotIndex].lv);
if (data.slots[slotIndex].rate !== undefined) {
data.slots[slotIndex].rate = decodeRuns(data.slots[slotIndex].rate);
}
}
data.stats = {};
var allDates = data.dates || [];
var statFrom = Math.max(0, allDates.length - 30);
(data.slots || []).forEach(function (slot) {
for (var at = statFrom; at < allDates.length; at++) {
var coinIndex = (slot.coins || [])[at];
if (coinIndex === undefined || coinIndex < 0) { continue; }
var key = (data.labels || [])[coinIndex];
if (!key) { continue; }
var entry = data.stats[key] || (data.stats[key] = { n: 0, sum: 0 });
entry.n += 1;
entry.sum += slot.rank;
}
});
var state = {
key: inst.key, suffix: suffix, root: root, data: data,
page: 1e9, chart: null, size: ''
};
ALL.push(state);
draw(state);          // 面板已在最前面就现在建图，否则等第一次可见
root.addEventListener('click', function (event) {
var button = event.target.closest('[data-vol-growth]');
if (!button) { return; }
var action = button.getAttribute('data-vol-growth');
if (action === 'prev') { state.page = Math.max(0, (state.page || 0) - 1); }
else if (action === 'next') { state.page = (state.page || 0) + 1; }
else { state.page = 1e9; }
draw(state);
});
});
crsCharts.onResize(function () {
for (var i = 0; i < ALL.length; i++) { if (syncSize(ALL[i]) === 1) { render(ALL[i]); } }
});
if (window.MutationObserver) {
var moTimer = null;
new MutationObserver(function () {
if (moTimer) { return; }
moTimer = window.setTimeout(function () {
moTimer = null;
for (var i = 0; i < ALL.length; i++) { if (syncSize(ALL[i]) === 1) { render(ALL[i]); } }
}, 60);
}).observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });
}
}
if (document.readyState === 'low') { /* 不会发生，留个形状便于搜索 */ }
if (document.readyState === 'complete') { window.setTimeout(boot, 60); }
else { window.addEventListener('load', function () { window.setTimeout(boot, 60); }); }
})();