
(function () {
var root = document.getElementById('rs-lines');
var dataNode = document.getElementById('rs-lines-data');
if (!root || !dataNode) { return; }
var DATA = null;
try { DATA = JSON.parse(dataNode.textContent); } catch (err) { return; }
if (!DATA || !(DATA.coins || []).length || !(DATA.dates || []).length) { return; }
var host = document.getElementById('rs-lines-chart');
var list = document.getElementById('rs-lines-list');
var tipBox = document.getElementById('rs-lines-tip');
var STYLES = DATA.styles || {};
var COLORS = DATA.colors || {};
var TIERS = Math.max(2, DATA.tiers || 4);
var WEIGHTS = DATA.weights || [1, 2, 3, 4];
var FALLBACK = '#B0B0B0';
var state = { page: null, active: 'BTC', chart: null, size: '', box: null };
var ROWS = {};
var COINS = {};
(DATA.coins || []).forEach(function (coin) { COINS[coin.ticker] = coin; });
if (!COINS[state.active]) { state.active = ''; }   // BTC 不在 payload 里就不高亮（防御）
Array.prototype.forEach.call(root.querySelectorAll('[data-rs-lines-row]'), function (row) {
ROWS[row.getAttribute('data-rs-lines-row')] = row;
});

function node(id) { return document.getElementById(id); }
function shortDay(iso) { return String(iso).slice(5); }
function esc(text) { return String(text === null || text === undefined ? '' : text); }
function fmtPct(value, digits) {
if (value === null || value === undefined || !isFinite(value)) { return '—'; }
var places = digits === undefined ? (Math.abs(value) >= 100 ? 0 : 2) : digits;
return (value > 0 ? '+' : '') + Number(value).toFixed(places) + '%';
}
function colorOf(coin) {
var ticker = (coin && coin.ticker) || '';
try {
if (window.rsRatingColor) { var live = window.rsRatingColor(ticker); if (live) { return live; } }
} catch (err) { void err; }
return COLORS[(coin && coin.rating) || ''] || FALLBACK;
}

function geometry(page) {
var dates = DATA.dates || [];
var span = Math.max(2, DATA.window || 30);
var total = Math.max(span, DATA.total || 90);
var count = Math.max(1, Math.ceil(Math.min(dates.length, total) / span));
var index = (page === null || page === undefined || page === '')
? count - 1 : Math.max(0, Math.min(page | 0, count - 1));
var start = Math.max(0, dates.length - span * (count - index));
var end = Math.min(dates.length, start + span);
var lead = Math.max(0, DATA.lead === undefined ? 10 : (Number(DATA.lead) || 0));
function usableClose(value) { return typeof value === 'number' && isFinite(value) && value > 0; }
function baseClose(coin, startIdx, leadDays) {
var close = coin.close || [], want = startIdx - leadDays, i;
if (want >= 0 && want < close.length && usableClose(close[want])) { return close[want]; }
for (i = Math.min(want, close.length - 1); i >= 0; i--) {   // 往前找更早的最近一个有效价
if (usableClose(close[i])) { return close[i]; }
}
for (i = 0; i < close.length; i++) {                        // 退化：该币历史的第 1 个有效价
if (usableClose(close[i])) { return close[i]; }
}
return null;
}
var lines = [], low = null, high = null, pool = [];
(DATA.coins || []).forEach(function (coin) {
var base = baseClose(coin, start, lead);
if (base === null) { return; }          // 没有任何有效收盘价 ⇒ 这条线不画（用户规格三）
var values = [];
for (var i = start; i < end; i++) {
var close = coin.close ? coin.close[i] : null;
if (!usableClose(close)) { values.push(null); continue; }   // 缺失 / 非正 / NaN ⇒ 跳过该点
var normalized = (close / base - 1) * 100;                  // 基准 = 画面外前 lead 天那个收盘价
values.push(normalized >= -100 ? Math.round(normalized * 10000) / 10000 : null);
}
for (var j = 0; j < values.length; j++) {
var value = values[j];
if (value === null || !isFinite(value)) { continue; }
low = (low === null) ? value : Math.min(low, value);
high = (high === null) ? value : Math.max(high, value);
pool.push(value);
}
lines.push({ coin: coin, values: values });
});
var box = {
page: index, pages: count, start: start, end: end,
dates: dates.slice(start, end), lines: lines,
yMin: null, yMax: null, boundaries: [], order: []
};
if (low === null || high === null) { return box; }
var clip = (DATA.clip === undefined ? 0 : Number(DATA.clip));
if (clip > 0 && clip < 100 && pool.length > 4) {
pool.sort(function (a, b) { return a - b; });
var last = pool.length - 1;
low = pool[Math.min(last, Math.floor((100 - clip) / 100 * last))];
high = pool[Math.min(last, Math.floor(clip / 100 * last))];
if (!(high > low)) { high = low + 1; }
}
var spread = high - low;
if (spread <= 0) { spread = Math.max(1, Math.abs(high) * 0.1); }
var margin = spread * (DATA.pad || 5) / 100;
if (low > 0) { box.yMin = 0; box.yMax = high + margin; }
else if (high < 0) { box.yMin = low - margin; box.yMax = 0; }
else { box.yMin = low - margin; box.yMax = high + margin; }
var band = (box.yMax - box.yMin) / TIERS;        // 仅作「分位数取不到」时的退化分档
var anchors = [];
(box.lines || []).forEach(function (line) {
var vals = line.values || [];
for (var i = vals.length - 1; i >= 0; i--) {
if (vals[i] !== null && vals[i] !== undefined && isFinite(vals[i])) { anchors.push(vals[i]); break; }
}
});
if (anchors.length >= TIERS) {
var sortedPool = anchors.slice().sort(function (a, b) { return a - b; });
var lastPool = sortedPool.length - 1;
for (var step = 1; step < TIERS; step++) {
var pick = sortedPool[Math.min(lastPool, Math.round(step / TIERS * lastPool))];
box.boundaries.push(Math.round(pick * 10000) / 10000);
}
for (var k = 1; k < box.boundaries.length; k++) {   // 重复值多时可能取到同一个数 ⇒ 单调化
if (box.boundaries[k] < box.boundaries[k - 1]) { box.boundaries[k] = box.boundaries[k - 1]; }
}
}
if (box.boundaries.length !== TIERS - 1) {            // 退化（点太少）：回到等宽
box.boundaries = [];
for (var fallback = 1; fallback < TIERS; fallback++) { box.boundaries.push(box.yMin + band * fallback); }
}
function tierOf(value) {
var slot = 0;
for (var edge = 0; edge < box.boundaries.length; edge++) {
if (value >= box.boundaries[edge]) { slot += 1; }
}
return TIERS - slot;
}
lines.forEach(function (line) {
var counts = [];
for (var i = 0; i < TIERS; i++) { counts.push(0); }
var lastValues = [];
line.values.forEach(function (value) {
if (value === null || !isFinite(value)) { return; }
counts[tierOf(value) - 1] += 1;
lastValues.push(value);
});
var present = 0;
counts.forEach(function (n) { present += n; });
var composite = null;
if (present) {
var sum = 0;
for (var i = 0; i < TIERS; i++) {
sum += counts[i] * (WEIGHTS[i] === undefined ? i + 1 : WEIGHTS[i]);
}
composite = sum / present;
}
line.counts = counts;
line.composite = composite;
line.tier = composite === null ? null : Math.max(1, Math.min(TIERS, Math.round(composite)));
line.tierLast = lastValues.length ? tierOf(lastValues[lastValues.length - 1]) : null;
line.tierPrev = lastValues.length > 1 ? tierOf(lastValues[lastValues.length - 2]) : null;
});
box.order = lines.slice().sort(function (a, b) {
var av = a.composite === null ? Infinity : a.composite;
var bv = b.composite === null ? Infinity : b.composite;
if (av !== bv) { return av - bv; }
return a.coin.ticker < b.coin.ticker ? -1 : 1;
});
return box;
}

var SHOW_PER_TIER = 4;
function listOrder(box) {
return (box.order || []).slice().sort(function (a, b) {
var at = (a.tierLast === null || a.tierLast === undefined) ? null : a.tierLast;
var bt = (b.tierLast === null || b.tierLast === undefined) ? null : b.tierLast;
if ((at === null) !== (bt === null)) { return at === null ? 1 : -1; }
if (at !== bt) { return at - bt; }
var av = a.composite === null ? Infinity : a.composite;
var bv = b.composite === null ? Infinity : b.composite;
if (av !== bv) { return av - bv; }
return a.coin.ticker < b.coin.ticker ? -1 : 1;
});
}

function drawnSet(box) {
var ordered = listOrder(box);
var shown = {}, used = {}, i, line;
var btc = (DATA.btc || '').split('/')[0];
if (btc) { shown[btc] = true; }                  // BTC 是参照物：永远画（也算 16 条里的一个名额）
ordered.forEach(function (row) {
if (row.composite === null) { return; }
var band = (row.tierLast === null || row.tierLast === undefined) ? row.tier : row.tierLast;
var tier = band === null ? TIERS : band;
used[tier] = used[tier] || 0;
if (used[tier] >= SHOW_PER_TIER) { return; }
used[tier] += 1;
shown[row.coin.ticker] = true;
});
var target = TIERS * SHOW_PER_TIER;
for (i = 0; i < ordered.length; i++) {
if (Object.keys(shown).length >= target) { break; }
line = ordered[i];
if (line.composite === null) { continue; }
shown[line.coin.ticker] = true;
}
if (state.active) { shown[state.active] = true; } // 召唤出来的那一条（会多出 16 条之外）
return shown;
}

var TIER_COLORS = {
1: ['#D4B896', '#B8A063', '#9C8848', '#7D6B36'],
2: ['#A394C2', '#8574A5', '#6B5C88', '#544868'],
3: ['#7FB3C8', '#5C94A0', '#477880', '#365C62'],
4: ['#9A9A9A', '#7A7A7A', '#5E5E5E', '#464646']
};
var RS_LINE_OPACITY = 0.5;                     // 规格二：默认透明度（嫌亮就降到 0.4）
function tierColorMap(box) {
var map = {}, rank = {};
listOrder(box).forEach(function (line) {
if (line.composite === null) { return; }
var band = (line.tierLast === null || line.tierLast === undefined) ? line.tier : line.tierLast;
var tier = band === null ? TIERS : Math.min(TIERS, Math.max(1, band));
var palette = TIER_COLORS[tier] || TIER_COLORS[TIERS];
rank[tier] = rank[tier] || 0;
map[line.coin.ticker] = palette[Math.min(rank[tier], palette.length - 1)];
rank[tier] += 1;                           // 该梯队里下一个（更弱）用更暗的一档
});
return map;
}

var RS_LABEL_MIN_GAP = 24, RS_LABEL_STEP_X = 20, RS_LABEL_STEP_Y = 12;
var RS_LABEL_MAX_X_STEPS = 8, RS_LABEL_MAX_TRIES = 44;
var rsLabelPlaced = [], rsLabelCursor = -1;
function rsLabelGap(a, b) {          // 两个矩形**边框**之间的最小距离（交叠 ⇒ 负数 = 穿透深度）
var dx = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w));
var dy = Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h));
if (dx > 0 && dy > 0) { return Math.sqrt(dx * dx + dy * dy); }
if (dx > 0) { return dx; }
if (dy > 0) { return dy; }
return Math.max(dx, dy);
}
function rsLabelOk(cand) {
for (var i = 0; i < rsLabelPlaced.length; i++) {
if (rsLabelGap(cand, rsLabelPlaced[i]) < RS_LABEL_MIN_GAP) { return false; }
}
return true;
}
function rsLabelLayout(params) {
if (!params || !params.labelRect) { return; }
if (params.dataIndex === 0 || params.dataIndex <= rsLabelCursor) {
rsLabelPlaced = [];                            // 新一轮布局（索引回到 0 / 变小）⇒ 清空重排
}
rsLabelCursor = params.dataIndex;
var rect = params.labelRect;
var w = Math.max(1, rect.width), h = Math.max(1, rect.height);
var chart = state.chart;
var W = chart ? chart.getWidth() : 0, H = chart ? chart.getHeight() : 0;
var maxX = Math.max(2, W - w - 2), maxY = Math.max(2, H - h - 2);
var cand = {
x: Math.min(maxX, Math.max(2, rect.x)),
y: Math.min(maxY, Math.max(2, rect.y)),
w: w, h: h
};
var tries = 0, xSteps = 0, ySteps = 0, dir = -1;
while (!rsLabelOk(cand) && tries < RS_LABEL_MAX_TRIES) {
tries += 1;
if (tries <= RS_LABEL_MAX_X_STEPS) {
xSteps = tries; ySteps = 0;                                   // 先沿 X 左移一个步长
} else {                                                        // X 用完了 ⇒ 叠加 Y 微调
xSteps = RS_LABEL_MAX_X_STEPS;
ySteps = Math.ceil((tries - RS_LABEL_MAX_X_STEPS) / 2);
dir = ((tries - RS_LABEL_MAX_X_STEPS) % 2 === 1) ? -1 : 1;    // 上 / 下交替
}
cand.x = Math.min(maxX, Math.max(2, rect.x - RS_LABEL_STEP_X * xSteps));
cand.y = Math.min(maxY, Math.max(2, rect.y + dir * RS_LABEL_STEP_Y * ySteps));
}
rsLabelPlaced.push(cand);
return { x: cand.x, y: cand.y, align: 'left', verticalAlign: 'top' };
}

function labelPoints(box, shown) {
var drawn = box.order.filter(function (line) {
return line.composite !== null && (!shown || shown[line.coin.ticker]);
});
var points = [];
drawn.forEach(function (line) {
var values = line.values, index = -1, last = null;
for (var i = values.length - 1; i >= 0; i--) {          // 末端：最后一个有效点
var value = values[i];
if (value !== null && isFinite(value)) { index = i; last = value; break; }
}
if (index < 0) { return; }
if (box.yMin !== null && last < box.yMin) { last = box.yMin; }
if (box.yMax !== null && last > box.yMax) { last = box.yMax; }
points.push({
value: [index, last],
meta: {
ticker: line.coin.ticker, full: line.coin.symbol, label: line.coin.label,
tier: line.tier === null ? '—' : line.tier, kind: 'end',
tierLast: line.tierLast === null || line.tierLast === undefined ? '—' : line.tierLast,
counts: line.counts, composite: line.composite
},
label: {
color: colorOf(line.coin),
offset: [0, -11],
backgroundColor: 'rgba(20, 20, 20, 0.75)',
borderColor: 'rgba(150, 150, 150, 0.3)',
borderWidth: 1,
borderRadius: 4,
padding: [2, 6]
}
});
});
points.sort(function (a, b) { return b.value[1] - a.value[1]; });
return points;
}

function buildOption(box) {
var xdata = box.dates.map(shortDay);
var series = [];
var shown = drawnSet(box);          // 默认 16 条（每梯队前 4）+ BTC + 召唤出来的那条
var tierColors = tierColorMap(box); // 梯队色（同梯队同色系、越强越亮）
box.lines.forEach(function (line) {
if (!shown[line.coin.ticker]) { return; }   // 其余 35 条：完全不渲染（用户规格一）
var isBtc = line.coin.ticker === (DATA.btc || '').split('/')[0];
var active = !!(state.active && state.active === line.coin.ticker);
var btcLit = !!(state.active && isBtc);
var lit = active || btcLit;
var dim = !!state.active && !lit;
series.push({
type: 'line', name: line.coin.ticker, data: line.values,
symbol: 'circle', symbolSize: 2, showSymbol: false, smooth: 0.3,
sampling: 'lttb', animation: false, connectNulls: false, z: lit ? 6 : (isBtc ? 5 : 2),
lineStyle: {
width: lit ? (isBtc ? 2.5 : 2) : (isBtc ? 1.5 : 1),
type: isBtc ? 'dashed' : 'solid',
color: btcLit ? (STYLES.btc_highlight || '#7FB3C8')
: (active ? (STYLES.highlight || '#D4B896')
: (isBtc ? (STYLES.btc || 'rgba(220,220,220,0.70)')
: (tierColors[line.coin.ticker] || (STYLES.line || 'rgba(220,220,220,0.45)')))),
opacity: isBtc
? (dim ? (STYLES.dim === undefined ? 0.10 : STYLES.dim) : 1)
: (lit ? 1 : (dim ? (STYLES.dim === undefined ? 0.10 : STYLES.dim) : RS_LINE_OPACITY))
},
emphasis: { disabled: true, lineStyle: { width: lit ? (isBtc ? 2.5 : 2) : 1 } }
});
});
var tierLine = {
silent: true, symbol: 'none',
label: {
show: true, position: 'end', distance: 6,
color: 'rgba(220,220,220,0.45)', fontSize: 11,
formatter: function (params) { return Number(params.value).toFixed(1) + '%'; }
},
lineStyle: { color: 'rgba(255,255,255,' + (STYLES.tier === undefined ? 0.20 : STYLES.tier) + ')', type: 'dashed', width: 1 },
data: box.boundaries.map(function (value) { return { yAxis: value }; })
.concat([{ yAxis: 0, label: { show: false }, lineStyle: { color: 'rgba(255,255,255,0.30)', type: 'solid', width: 1 } }]),
animation: false
};
var tierAreas = [];
var edges = [box.yMin].concat(box.boundaries).concat([box.yMax]);
for (var t = 0; t < TIERS; t++) {
tierAreas.push([
{ yAxis: edges[TIERS - t], name: 'T' + (t + 1) },
{ yAxis: edges[TIERS - t - 1] }
]);
}
var markSeries = {
type: 'line', data: [], silent: true, animation: false, z: 1,
markLine: tierLine,
markArea: {
silent: true, animation: false,
itemStyle: { color: 'transparent' },
label: { show: true, color: 'rgba(220,220,220,0.38)', fontSize: 11, position: 'insideTopLeft' },
data: tierAreas
}
};
series.unshift(markSeries);
var hoverPoints = [];
box.lines.forEach(function (line) {
if (!shown[line.coin.ticker]) { return; }   // 没画的线不建悬停靶子
for (var i = 0; i < line.values.length; i++) {
var value = line.values[i];
if (value === null || !isFinite(value)) { continue; }
hoverPoints.push({
value: [i, value],
meta: { ticker: line.coin.ticker, symbol: line.coin.symbol, date: box.dates[i] || '', kind: 'point' }
});
}
});
series.push({
type: 'scatter', name: '__hover', data: hoverPoints, z: 5, animation: false,
symbol: 'circle', symbolSize: 6,
itemStyle: { color: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)' },
emphasis: { disabled: true }
});
var points = labelPoints(box, shown);
series.push({
type: 'scatter', name: '__labels', data: points, zlevel: 2, z: 30, animation: false,
symbolSize: 6, itemStyle: { color: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)' },
label: {
show: true, fontSize: 11, position: 'top', distance: 2,
formatter: function (p) {
var meta = p.data.meta;
return '{n|' + meta.label + '}{t|(' + meta.tierLast + ')}';
},
rich: { n: { fontSize: 11 }, t: { fontSize: 11, color: '#9aa7b0' } }
},
labelLayout: rsLabelLayout,
emphasis: { disabled: true }
});
return {
animation: false,
backgroundColor: 'transparent',
grid: { left: 54, right: 64, top: 26, bottom: 46 },
tooltip: {
trigger: 'item', confine: true,
backgroundColor: 'rgba(18,22,25,0.96)', borderColor: '#3a444b',
textStyle: { color: '#dfe6ea', fontSize: 12 },
formatter: function (params) {
if (params.componentType !== 'series') { return ''; }
var meta = params.data && params.data.meta;
if (meta && meta.kind === 'point') {           // 线上任意一点：完整名 + 日期 + 归一化涨幅
return esc(meta.symbol) + '<br/>' + esc(meta.date) + ' · '
+ fmtPct(params.value && params.value.length ? params.value[1] : params.value);
}
if (meta) {                                   // 图中标签：综合分 + 梯队停留分布
var parts = [];
for (var i = 0; i < meta.counts.length; i++) {
parts.push('T' + (i + 1) + ':' + meta.counts[i] + '天');
}
return esc(meta.full) + ' | 综合分 '
+ (meta.composite === null ? '—' : Number(meta.composite).toFixed(2))
+ ' | ' + parts.join(' ');
}
var coin = COINS[params.seriesName];
var day = box.dates[params.dataIndex] || '';
return esc(coin ? coin.symbol : params.seriesName) + '<br/>'
+ day + ' · ' + fmtPct(params.value);
}
},
xAxis: {
type: 'category', data: xdata, boundaryGap: false,
axisLabel: { color: '#9aa7b0', fontSize: 11 },
axisTick: { show: false }, axisLine: { lineStyle: { color: '#3a444b' } },
splitLine: { show: false }
},
yAxis: {
type: 'value', min: box.yMin, max: box.yMax,
axisLabel: {
color: '#9aa7b0', fontSize: 11,
formatter: function (value) { return Number(value).toFixed(1) + '%'; }
},
axisTick: { show: false }, axisLine: { lineStyle: { color: '#3a444b' } },
splitLine: { lineStyle: { color: 'rgba(58,68,75,0.5)' } }
},
series: series
};
}

function syncList(box) {
if (!list) { return; }
listOrder(box).forEach(function (line) {
var row = ROWS[line.coin.symbol];
if (!row) { return; }
var tier = row.querySelector('.rs-lines-tier');
var label = (line.tierLast === null || line.tierLast === undefined) ? line.tier : line.tierLast;
if (tier) { tier.textContent = label === null ? '(—)' : '(' + label + ')'; }
row.setAttribute('data-rs-lines-composite', line.composite === null ? '' : line.composite);
list.appendChild(row);                       // 重新排到「梯队分组 + 组内综合分升序」的位置
row.classList.toggle('active', !!state.active && state.active === line.coin.ticker);
});
}

function render(box) {
var shownCount = Object.keys(drawnSet(box)).length;
var range = '当前窗口：<b>' + box.dates[0] + ' ~ ' + box.dates[box.dates.length - 1] + '</b> · 本页 <b>'
+ box.dates.length + '</b> 天 · 图中 <b>' + shownCount + '/' + (DATA.coins || []).length
+ '</b> 条线（默认每梯队前 ' + SHOW_PER_TIER + ' + BTC，点右侧列表召唤） · 第 <b>'
+ (box.page + 1) + '/' + box.pages + '</b> 页';
['rs-lines-range', 'rs-lines-range-foot'].forEach(function (id) {
var el = node(id); if (el) { el.innerHTML = range; }
});
['rs-lines-page', 'rs-lines-page-foot'].forEach(function (id) {
var el = node(id); if (el) { el.textContent = (box.page + 1) + '/' + box.pages; }
});
root.querySelectorAll('[data-rs-lines="prev"]').forEach(function (b) { b.disabled = box.page <= 0; });
root.querySelectorAll('[data-rs-lines="next"]').forEach(function (b) { b.disabled = box.page >= box.pages - 1; });
syncList(box);
if (list) { list.classList.toggle('rs-lines-old', box.page < box.pages - 1); }
if (state.chart) { state.chart.setOption(buildOption(box), true); }
}

function draw() {
var box = geometry(state.page);
state.box = box;
state.page = box.page;
render(box);
}

function hideTip() { if (tipBox) { tipBox.hidden = true; } }
function showTip(row, event) {
if (!tipBox || !state.box) { return; }
var line = null;
state.box.lines.forEach(function (entry) {
if (!line && entry.coin.symbol === row.getAttribute('data-rs-lines-row')) { line = entry; }
});
if (!line) { return; }
var coin = line.coin;
var parts = [];
for (var i = 0; i < (line.counts || []).length; i++) { parts.push('T' + (i + 1) + ':' + line.counts[i] + '天'); }
var UP = '#3fbf7f', DOWN = '#e0605f';
function tint(value) {
if (value === null || value === undefined || !isFinite(value)) { return 'color:#89949b'; }
return 'color:' + (Number(value) > 0 ? UP : (Number(value) < 0 ? DOWN : '#cfd8de'));
}
function num(value, suffix) {
if (value === null || value === undefined || !isFinite(value)) { return '<span style="' + tint(null) + '">—</span>'; }
var n = Number(value);
return '<span style="' + tint(n) + '">' + (n >= 0 ? '+' : '') + n.toFixed(2) + (suffix || '') + '</span>';
}
var rateColor = (DATA.colors && coin.rating && DATA.colors[coin.rating]) || '#e6edf3';
tipBox.innerHTML = '<b style="color:' + rateColor + '">' + esc(coin.ticker || coin.symbol) + '</b><br/>'
+ (DATA.asof || '') + ' 当日涨幅 ' + num(coin.pct, '%')
+ ' · 评级 ' + (coin.rating || '—')
+ '<br/>RS(昨日) ' + num(coin.rs_prev !== undefined ? coin.rs_prev : coin.rs24h, '%')
+ ' · RS(7) ' + num(coin.rs7, '%')
+ '<br/>综合分 ' + (line.composite === null ? '—' : Number(line.composite).toFixed(2))
+ (line.tier === null ? '' : '（综合分梯队 ' + line.tier + '）')
+ (line.tierLast === null || line.tierLast === undefined ? '' : ' · 最后一天 T' + line.tierLast)
+ '<br/>' + parts.join(' ');
tipBox.hidden = false;
var width = tipBox.offsetWidth || 200, height = tipBox.offsetHeight || 70;
var left = Math.min(window.innerWidth - width - 8, event.clientX + 14);
var top = Math.min(window.innerHeight - height - 8, event.clientY + 12);
tipBox.style.left = Math.max(8, left) + 'px';
tipBox.style.top = Math.max(8, top) + 'px';
}

root.addEventListener('click', function (event) {
var button = event.target.closest ? event.target.closest('[data-rs-lines]') : null;
if (!button) { return; }
var action = button.getAttribute('data-rs-lines');
var pages = state.box ? state.box.pages : 1;
var current = state.page === null ? pages - 1 : state.page;
if (action === 'prev') { state.page = Math.max(0, current - 1); }
else if (action === 'next') { state.page = Math.min(pages - 1, current + 1); }
else { state.page = null; }
draw();
});
if (list) {
list.addEventListener('click', function (event) {
var row = event.target.closest ? event.target.closest('[data-rs-lines-row]') : null;
if (!row) { return; }
var link = event.target.closest('a[data-coin]');
if (link) { event.preventDefault(); }        // 点币名 = 点这一行（不跳转；看盘地址在右键菜单里）
var ticker = row.getAttribute('data-rs-lines-coin');
state.active = (state.active === ticker) ? '' : ticker;
draw();
});
list.addEventListener('mouseover', function (event) {
var row = event.target.closest ? event.target.closest('[data-rs-lines-row]') : null;
if (row) { showTip(row, event); }
});
list.addEventListener('mousemove', function (event) {
var row = event.target.closest ? event.target.closest('[data-rs-lines-row]') : null;
if (row) { showTip(row, event); } else { hideTip(); }
});
function bindChart() {
if (!state.chart || state.bound) { return; }
state.bound = true;
state.chart.on('click', function (params) {
var meta = params.data && params.data.meta;
if (!meta || !meta.ticker) { return; }
state.active = (state.active === meta.ticker) ? '' : meta.ticker;
draw();
});
state.chart.getZr().on('click', function (event) {
var inside = false, hit = false;
try {
var rect = state.chart.getModel().getComponent('grid').coordinateSystem.getRect();
inside = rect && event.offsetX >= rect.x && event.offsetX <= rect.x + rect.width
&& event.offsetY >= rect.y && event.offsetY <= rect.y + rect.height;
} catch (err1) { inside = false; }
try {
var found = state.chart.getZr().handler.findHover(event.offsetX, event.offsetY);
hit = !!(found && found.target);
} catch (err2) { hit = false; }
if (inside && hit) { return; }             // 点在线上 / 标签上 → 交给上面那个 handler
if (state.active) { state.active = ''; draw(); }
hideTip();
});
}

list.addEventListener('mouseleave', hideTip);
}

function syncSize() {
if (!host) { return 0; }
var boxSize = host.clientWidth + 'x' + host.clientHeight;
if (boxSize === state.size) { return 0; }
state.size = boxSize;
if (host.clientWidth <= 0 || host.clientHeight <= 0) { return 0; }
if (!window.echarts) { return 0; }
if (!state.chart) {
state.chart = crsCharts.init(host, null, { renderer: 'canvas' });
bindChart();
return 1;
}
state.chart.resize();
return 2;
}

function boot() {
if (syncSize() === 1) { draw(); }
if (window.MutationObserver) {
var timer = null;
new MutationObserver(function () {
if (timer) { return; }
timer = window.setTimeout(function () {
timer = null;
if (syncSize() === 1) { draw(); }
}, 60);
}).observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });
}
crsCharts.onResize(function () { if (syncSize() === 1) { draw(); } });
var tabs = root.closest ? root.closest('.tab-group') : null;
if (tabs) { tabs.addEventListener('click', function () { window.setTimeout(function () { if (syncSize() === 1) { draw(); } }, 40); }); }
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function () { window.setTimeout(boot, 60); });
} else {
window.setTimeout(boot, 60);
}
})();