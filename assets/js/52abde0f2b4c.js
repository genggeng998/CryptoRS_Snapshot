
(function () {
var GRID = { left: 52, right: 18, top: 8, bottom: 26 };
var LINE_PX = 10;            // 每行文字像素高（= label.lineHeight）
var PICK_OPACITY = 0.2;      // 点中某个币后，**其它**币块的透明度（灰白遮罩效果）
var BAR_MAX = 34;
var BAND_GAP = 0.3;

var PICKERS = {};   // hostId -> 「选中 / 取消某个币」（图表画好之前这里还没有）
var PENDING = {};   // hostId -> 图表还没画好（面板 0 宽）时用户已经点过的那个币
function syncNames(hostId, symbol) {
var host = document.querySelector('.rs-stack-top[data-stack-host="' + hostId + '"]');
if (!host) { return; }
var links = host.querySelectorAll('a[data-coin]');
for (var i = 0; i < links.length; i++) {
var on = !!symbol && links[i].getAttribute('data-coin') === symbol;
if (on) { links[i].classList.add('on'); } else { links[i].classList.remove('on'); }
}
}
window.crsStackPick = function (hostId, symbol) {
if (!hostId || !symbol) { return false; }
if (PICKERS[hostId]) { PICKERS[hostId](symbol); return true; }
PENDING[hostId] = symbol;      // 面板还在后台 ⇒ 等这张图画好时再补上（见 crsStackDraw）
return true;
};

function shortName(symbol) {
return String(symbol).split('/')[0].replace(/^(1000000|1000)(?=[A-Za-z])/, '');
}
function labelText(symbol, maxLines) {
var text = shortName(symbol), out = [], i, limit = Math.max(1, Math.min(2, maxLines || 2));
for (i = 0; i < text.length && i < 4 && out.length < limit; i += 2) {
out.push(text.substr(i, 2));
}
return out.join(String.fromCharCode(10));
}
function inkOf(hex) {
var h = String(hex || '').replace('#', '');
if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
if (h.length < 6) { return '#eef4f7'; }
var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16),
b = parseInt(h.substr(4, 2), 16);
return (0.299 * r + 0.587 * g + 0.114 * b) > 148 ? '#101619' : '#eef4f7';
}

window.crsStackDraw = function (hostId, dataId) {
var node = document.getElementById(dataId);
var host = document.getElementById(hostId);
if (!node || !host || !window.echarts) { return; }
if (host.dataset.drawn === '1') { return; }
if (!host.clientWidth || !host.clientHeight) { return; }
host.dataset.drawn = '1';
var DATA;
try { DATA = JSON.parse(node.textContent); } catch (e) { return; }
var COLORS = DATA.colors || {}, UNRATED = DATA.unrated || '-';
var GREY = '#5b666d';
function colorOf(rating) { return COLORS[rating] || GREY; }
var PLOT_PX = Math.max(60, (host.clientHeight || 320) - GRID.top - GRID.bottom);

var SLOTS = DATA.slots || [];
var BLOCK_PX = PLOT_PX / Math.max(1, SLOTS.length);

var sums = [];
SLOTS.forEach(function (slot) {
slot.forEach(function (p, day) {
if (p) { sums[day] = (sums[day] || 0) + Number(p.r || 0); }
});
});

var picked = null;

function pick(symbol) {
if (!symbol) { return; }
picked = (picked === symbol) ? null : symbol;
chart.dispatchAction({ type: 'hideTip' });
chart.setOption(option());
syncNames(hostId, picked);      // 上面那行币名跟着一起亮 / 灭
}

function seriesFor(slotIndex) {
var slot = SLOTS[slotIndex];
var rows = new Array(DATA.days.length);
slot.forEach(function (p, day) {
if (!p) { return; }
var share = 100 / Math.max(1, SLOTS.length);
var color = colorOf(p.g);
var on = picked && picked === p.s;
var dim = picked && picked !== p.s;
var lines = 2;
var stroke = (day === DATA.days.length - 1 && !dim)
? ((DATA.stateStrokes || {})[p.s] || '') : '';
rows[day] = {
value: +share.toFixed(3),
itemStyle: {
color: color, opacity: dim ? PICK_OPACITY : 1,
borderColor: stroke || (on ? '#eef4f7' : '#0a0e11'),
borderWidth: stroke ? 1.5 : (on ? 1.6 : 0.6)
},
label: { show: BLOCK_PX >= LINE_PX * 2 + 2, color: inkOf(color), formatter: labelText(p.s, lines) },
meta: { day: DATA.days[day], symbol: p.s, ratio: p.r, rank: p.k,
rating: p.g, leading: p.l, total: p.t, chg: p.c }
};
});
return {
name: '第' + (slotIndex + 1) + '名', type: 'bar', stack: 'rs-stack',
barMaxWidth: BAR_MAX, barCategoryGap: Math.round(BAND_GAP * 100) + '%',
label: { position: 'inside', fontSize: 9, lineHeight: LINE_PX,
align: 'center', verticalAlign: 'middle', distance: 0 },
emphasis: { disabled: true },
data: rows
};
}

function option() {
var series = [];
for (var i = SLOTS.length - 1; i >= 0; i--) { series.push(seriesFor(i)); }
return {
backgroundColor: 'transparent', animation: false,
grid: { left: GRID.left, right: GRID.right, top: GRID.top, bottom: GRID.bottom },
legend: { show: false },
tooltip: {
trigger: 'item',
formatter: function (p) {
var m = p.data && p.data.meta;
if (!m) { return ''; }
var pct = (m.ratio * 100).toFixed(1);
var gain = (m.chg === null || m.chg === undefined) ? ''
: '<br/>当天 24h 涨幅 <b>' + (m.chg >= 0 ? '+' : '') + m.chg.toFixed(2) + '%</b>';
return m.day + ' · <b>' + shortName(m.symbol) + '</b><br/>'
+ '双领先比例 <b>' + pct + '%</b>（' + m.leading + '/' + m.total + ' 个周期）<br/>'
+ '当天排名 <b>#' + m.rank + '</b> · 当天评价 <b>'
+ (m.rating === UNRATED ? '—' : m.rating) + '</b>' + gain
+ '<br/><span style="color:#89949b">点一下 = 高亮该币全部格子'
+ '（点上面「综合分」那行的币名同效） · 右键 = 加入 / 移出自选</span>';
}
},
xAxis: {
type: 'category', data: DATA.labels, boundaryGap: true,
axisLabel: { color: '#89949b', fontSize: 10, interval: 'auto' },
axisLine: { lineStyle: { color: '#38434a' } }, axisTick: { show: false }
},
yAxis: {
type: 'value', min: 0, max: 100, name: '占比 %',
nameTextStyle: { color: '#89949b', fontSize: 10 },
axisLabel: { color: '#89949b', fontSize: 10, formatter: '{value}%' },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
},
series: series
};
}

var chart = crsCharts.init(host, null, { renderer: 'canvas' });
chart.setOption(option());
PICKERS[hostId] = pick;
if (PENDING[hostId]) {                     // 图没画好时点过币名 ⇒ 现在补上这次选中
var pendingPick = PENDING[hostId];
PENDING[hostId] = null;
pick(pendingPick);
}
var hoveredMeta = null;
chart.on('mouseover', function (params) {
hoveredMeta = (params.data && params.data.meta) || null;
});
chart.on('globalout', function () { hoveredMeta = null; });
chart.getZr().on('contextmenu', function (event) {
if (!hoveredMeta || !hoveredMeta.symbol) { return; }   // 不在块上 → 交回浏览器默认菜单
var native = event.event || {};
if (native.preventDefault) { native.preventDefault(); }
if (native.stopPropagation) { native.stopPropagation(); }
if (window.crsCoinMenu) { window.crsCoinMenu(hoveredMeta.symbol, native.clientX, native.clientY); }
else if (window.watchlist) { window.watchlist.toggle(hoveredMeta.symbol, true); }
});

chart.on('click', function (params) {
var m = params.data && params.data.meta;
if (!m) { return; }
pick(m.symbol);               // 与点「综合分」那行的币名同一份逻辑（见上面的 pick）
});

function alignHead() {
var wrap = host.closest('.rs-stack-wrap');
if (!wrap || !chart.getWidth()) { return; }
var days = (DATA.days || []).length || 1;
var c0 = NaN, band = NaN;
try {
c0 = chart.convertToPixel({ xAxisIndex: 0 }, 0);
var c1 = days > 1 ? chart.convertToPixel({ xAxisIndex: 0 }, 1) : NaN;
if (isFinite(c0) && isFinite(c1) && c1 > c0) { band = c1 - c0; }
} catch (e) { /* 拿不到就用下面的兜底带宽，别让一行布局问题把整张图拖垮 */ }
if (!isFinite(band)) { band = (chart.getWidth() - GRID.left - GRID.right) / days; }
var bar = Math.min(BAR_MAX, band * (1 - BAND_GAP));
var left = c0 - band / 2 + (band - bar) / 2;
if (!isFinite(left) || left < 0) { return; }   // 算不出来就留着 CSS 里的兜底值
wrap.style.setProperty('--rs-stack-head-left', left.toFixed(1) + 'px');
}

function syncSize() {
if (host.clientWidth > 0) { chart.resize(); alignHead(); }
window.setTimeout(function () { if (host.clientWidth > 0) { chart.resize(); alignHead(); } }, 160);
}
syncSize();
crsCharts.onResize(syncSize);
var panel = host.closest('.tab-panel');
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, syncSize);
}
};

document.addEventListener('click', function (event) {
var target = event.target;
var link = (target && target.closest) ? target.closest('.rs-stack-top a[data-coin]') : null;
if (!link) { return; }
var row = link.closest('.rs-stack-top');
var hostId = row ? row.getAttribute('data-stack-host') : '';
var symbol = link.getAttribute('data-coin');
if (!hostId || !symbol) { return; }
event.preventDefault();
window.crsStackPick(hostId, symbol);
}, true);

window.crsStackCharts = [["rs-stack-chart","rs-stack-data"],["rs-stack-coin50-chart","rs-stack-coin50-data"],["us-qqq-stack-chart","us-qqq-stack-data"],["us-spy-stack-chart","us-spy-stack-data"]];
function drawAll() {
(window.crsStackCharts || []).forEach(function (pair) {
window.crsStackDraw(pair[0], pair[1]);
});
}
if (document.readyState === 'complete') { drawAll(); } else { window.addEventListener('load', drawAll); }
document.addEventListener('click', function (event) {
var el = event.target && event.target.closest ? event.target.closest('[data-tab]') : null;
if (el) { window.setTimeout(drawAll, 80); }
}, true);
crsCharts.onResize(function () { window.setTimeout(drawAll, 120); });
})();