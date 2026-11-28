
(function () {
var DATA = {"date":"2026-11-28","pool":45,"universe":45,"skipped":0,"indexPct":-3.0,"upSum":0.18,"downSum":-2.39,"upAll":0.18,"downAll":-3.17,"upCount":2,"downCount":43,"flatCount":0,"restSum":-0.79,"restCount":23,"topN":20,"thin":false,"minSample":20,"up":[{"coin":"XMR","pct":4.26,"contrib":0.0947,"share":53.96,"vol":152271238},{"coin":"VVV","pct":3.64,"contrib":0.0808,"share":46.04,"vol":42588990}],"down":[{"coin":"WLFI","pct":-46.81,"contrib":-1.0403,"share":43.61,"vol":396121356},{"coin":"CRV","pct":-4.6,"contrib":-0.1022,"share":4.28,"vol":15473410},{"coin":"FIL","pct":-4.55,"contrib":-0.1011,"share":4.24,"vol":54321769},{"coin":"WLD","pct":-3.93,"contrib":-0.0872,"share":3.66,"vol":70688395},{"coin":"RENDER","pct":-3.82,"contrib":-0.0849,"share":3.56,"vol":16541536},{"coin":"TIA","pct":-3.41,"contrib":-0.0757,"share":3.17,"vol":17155436},{"coin":"ICP","pct":-3.4,"contrib":-0.0756,"share":3.17,"vol":20765605},{"coin":"1000PEPE","pct":-3.35,"contrib":-0.0745,"share":3.12,"vol":239530784},{"coin":"DOT","pct":-3.23,"contrib":-0.0718,"share":3.01,"vol":29269773},{"coin":"ENA","pct":-3.23,"contrib":-0.0717,"share":3.01,"vol":117922519},{"coin":"ARB","pct":-3.09,"contrib":-0.0687,"share":2.88,"vol":33184231},{"coin":"LTC","pct":-2.99,"contrib":-0.0664,"share":2.79,"vol":64230658},{"coin":"INJ","pct":-2.91,"contrib":-0.0646,"share":2.71,"vol":55892479},{"coin":"LIT","pct":-2.84,"contrib":-0.0632,"share":2.65,"vol":34464674},{"coin":"XLM","pct":-2.71,"contrib":-0.0601,"share":2.52,"vol":27538651},{"coin":"UNI","pct":-2.65,"contrib":-0.059,"share":2.47,"vol":116577190},{"coin":"ETC","pct":-2.52,"contrib":-0.0561,"share":2.35,"vol":14091594},{"coin":"LINK","pct":-2.51,"contrib":-0.0557,"share":2.34,"vol":107194301},{"coin":"AAVE","pct":-2.45,"contrib":-0.0544,"share":2.28,"vol":58488719},{"coin":"ASTER","pct":-2.34,"contrib":-0.052,"share":2.18,"vol":20613464}]};
var PREFIX = 'https://www.coinglass.com/tv/zh/Binance_';
if (!DATA) { return; }
var C50 = {};
(DATA.c50 || []).forEach(function (coin) { C50[coin] = 1; });
function isC50(coin) { return !!C50[coin]; }

function lightOf(index) { return 45 + index * 1.75; }          // 45% → 78%
function colorOf(side, index) {
var hue = side === 'up' ? 148 : 4;
var sat = side === 'up' ? 58 : 62;
return 'hsl(' + hue + ', ' + sat + '%, ' + lightOf(index).toFixed(1) + '%)';
}

var NAME_FONT = '600 11px "Segoe UI", system-ui, sans-serif';
var SHARE_FONT = '9px "Segoe UI", system-ui, sans-serif';
var NAME_TIERS = [
{ css: NAME_FONT, styles: ['nd', 'nl'] },
{ css: '600 9px "Segoe UI", system-ui, sans-serif', styles: ['td', 'tl'] },
{ css: '600 7px "Segoe UI", system-ui, sans-serif', styles: ['md', 'ml'] }
];
var TINY_MIN_LIMIT = 8;          // 小字号档的最小判定宽度（px，粗暴兜底：宁可压到邻格也不留空白）
var TINY_FULL_LIMIT = 24;
var TINY_HIDE_PCT = 0.8;
var TINY_NAME_PCT = 2.0;
var SHARE_MIN_PCT = 3;           // 占比 < 3% 一律只写名字、不写占比（用户 2026-09-20 规格）
var GOLD_COLOR = 'rgba(198,168,105,.92)', GOLD_COLOR_LIGHT = 'rgba(124,100,40,.94)';
function goldStyle(size, lineHeight, color) {
return {
fontSize: size, fontWeight: 600, lineHeight: lineHeight, color: color
};
}
var GOLD_TIERS = [['gd', 'gl'], ['gtd', 'gtl'], ['gmd', 'gml']];
var measureCtx = document.createElement('canvas').getContext('2d');
function measure(text, font) {
measureCtx.font = font || NAME_FONT;
return measureCtx.measureText(text).width;
}
function pickLabel(coin, shareText, arc, band, sharePct) {
var out = { name: '', share: '', tier: -1 };
if (band < 14) { return out; }                     // 环带 < 14px：连一行小字都放不下
if (sharePct < TINY_HIDE_PCT) { return out; }      // 极小扇区：不写文字（否则一定压满邻居）
var tiny = sharePct < TINY_NAME_PCT;
var wantShare = sharePct >= SHARE_MIN_PCT;         // 占比 < 3% 只写名字（用户规格）
var candidates = tiny ? [coin.slice(0, 2), coin.slice(0, 1)]
: [coin, coin.slice(0, 3), coin.slice(0, 2), coin.slice(0, 1)];
for (var i = 0; i < candidates.length; i++) {
if (!candidates[i]) { continue; }
for (var tier = 0; tier < NAME_TIERS.length; tier++) {
if (tier === 0 && band < 26) { continue; }     // 两行（名字 + 占比）至少要 26px 环带
var limit = arc * 1.05;                        // 1.05 倍弧长 = 允许轻微溢出邻居
if (tier > 0 && !tiny) { limit = Math.max(limit, TINY_MIN_LIMIT); }
if (!tiny && i === 0 && tier === NAME_TIERS.length - 1) { limit = Math.max(limit, TINY_FULL_LIMIT); }
if (measure(candidates[i], NAME_TIERS[tier].css) > limit) { continue; }
out.name = candidates[i];
out.tier = tier;
out.share = (tier === 0 && wantShare && measure(shareText, SHARE_FONT) <= limit) ? shareText : '';
return out;
}
}
return out;
}
function fmtVol(value) {
if (typeof value !== 'number' || !isFinite(value) || value <= 0) { return '-'; }
if (value >= 1e9) { return (value / 1e9).toFixed(2) + 'B'; }
if (value >= 1e6) { return (value / 1e6).toFixed(2) + 'M'; }
if (value >= 1e3) { return (value / 1e3).toFixed(2) + 'K'; }
return value.toFixed(0);
}
function sign(value, digits) {
if (typeof value !== 'number') { return '-'; }
return (value > 0 ? '+' : '') + value.toFixed(digits === undefined ? 2 : digits);
}
function itemsOf(side) { return (side === 'up' ? DATA.up : DATA.down) || []; }

var OUTER_RATIO = 0.96, INNER_RATIO = 0.28;
function ringOf(size) {
var minSide = Math.min(size[0], size[1]);
var outer = Math.min(minSide * 0.5 * OUTER_RATIO, size[0] * 0.245);
var inner = outer * (INNER_RATIO / OUTER_RATIO);
return { inner: inner, outer: outer, mid: (inner + outer) / 2, band: outer - inner };
}

function seriesOf(side, center, size) {
var ring = ringOf(size);
var mid = ring.mid, band = ring.band;
return {
name: side === 'up' ? '正向贡献' : '反向贡献',
type: 'pie',
center: center,
radius: [ring.inner, ring.outer],
avoidLabelOverlap: true,
minAngle: 1,
itemStyle: { borderColor: '#1b2227', borderWidth: 1 },
label: {
show: true, position: 'inside',
formatter: function (p) {
var d = p.data || {};
if (!d.short) { return ''; }
var name = '{' + (d.ns || 'nl') + '|' + d.short + '}';
if (!d.shortShare) { return name; }
return name + '\n{' + (d.ss || 'sl') + '|' + d.shortShare + '}';
},
rich: {
nd: { fontSize: 11, fontWeight: 600, lineHeight: 13, color: 'rgba(255,255,255,.94)' },
nl: { fontSize: 11, fontWeight: 600, lineHeight: 13, color: 'rgba(12,18,22,.94)' },
td: { fontSize: 9, fontWeight: 600, lineHeight: 11, color: 'rgba(255,255,255,.94)' },
tl: { fontSize: 9, fontWeight: 600, lineHeight: 11, color: 'rgba(12,18,22,.94)' },
md: { fontSize: 7, fontWeight: 600, lineHeight: 9, color: 'rgba(255,255,255,.94)' },
ml: { fontSize: 7, fontWeight: 600, lineHeight: 9, color: 'rgba(12,18,22,.94)' },
sd: { fontSize: 9, lineHeight: 11, color: 'rgba(255,255,255,.78)' },
sl: { fontSize: 9, lineHeight: 11, color: 'rgba(12,18,22,.78)' },
gd: goldStyle(11, 13, GOLD_COLOR),
gl: goldStyle(11, 13, GOLD_COLOR_LIGHT),
gtd: goldStyle(9, 11, GOLD_COLOR),
gtl: goldStyle(9, 11, GOLD_COLOR_LIGHT),
gmd: goldStyle(7, 9, GOLD_COLOR),
gml: goldStyle(7, 9, GOLD_COLOR_LIGHT)
}
},
labelLayout: { hideOverlap: false },
labelLine: { show: false },
emphasis: { disabled: true },
data: itemsOf(side).map(function (item, index) {
var share = Math.abs(item.share || 0);
var picked = pickLabel(item.coin, share.toFixed(1) + '%', 2 * Math.PI * mid * share / 100, band, share);
var dark = lightOf(index) < 58;
var tier = picked.tier < 0 ? 0 : picked.tier;
return {
name: item.coin,
value: Math.abs(item.contrib),
itemStyle: { color: colorOf(side, index) },
dark: dark,
short: picked.name,
shortShare: picked.share,
ns: (isC50(item.coin) ? GOLD_TIERS[tier] : NAME_TIERS[tier].styles)[dark ? 0 : 1],
ss: dark ? 'sd' : 'sl',
pct: item.pct, contrib: item.contrib, share: item.share,
vol: item.vol, rank: index + 1
};
})
};
}

function legendHtml(side, label) {
var all = side === 'up' ? DATA.upAll : DATA.downAll;
var cnt = side === 'up' ? DATA.upCount : DATA.downCount;
var head = '<span class="attr-head">' + label + ' ' + Math.min(10, itemsOf(side).length) +
'（' + (side === 'up' ? '上涨币' : '下跌币') + '共 ' + cnt + ' 个 · 全部合计 ' + sign(all) + '%）</span>';
var rows = itemsOf(side).slice(0, 10).map(function (item, index) {
return '<span class="attr-item"><i style="background:' + colorOf(side, index) + '"></i>' +
'<b' + (isC50(item.coin) ? ' class="c50"' : '') + '>' + item.coin + '</b><em>' + sign(item.pct, 1) + '%</em>' +
'<em class="attr-share">/ ' + Math.abs(item.share || 0).toFixed(1) + '%</em></span>';
}).join('');
return '<div class="attr-col">' + head + rows + '</div>';
}

function draw() {
var node = document.getElementById('coin50-attribution-chart');
if (!node) { return; }
if (!window.echarts) {
node.innerHTML = '<div class="chart-fallback">ECharts 未加载（需要联网从 CDN 取库），coin50 指数贡献暂不可用。</div>';
return;
}
var chart = crsCharts.init(node, null, { renderer: 'canvas' });
function buildOption() {
var size = [chart.getWidth(), chart.getHeight()];
return {
backgroundColor: 'transparent',
animation: false,
tooltip: {
trigger: 'item',
backgroundColor: 'rgba(21,26,30,.96)',
borderColor: '#38434a',
textStyle: { color: '#d9dfe2', fontSize: 12 },
formatter: function (p) {
var d = p.data || {};
return '<b' + (isC50(p.name) ? ' style="color:' + GOLD_COLOR + '"' : '') + '>' + p.name + '</b> · ' +
(p.seriesName || '') + '第 ' + (d.rank || '-') + ' 名<br/>' +
'当日涨跌幅：<b>' + sign(d.pct) + '%</b><br/>' +
'贡献值：<b>' + sign(d.contrib, 3) + ' pt</b><br/>' +
'贡献占比：' + (d.share || 0).toFixed(1) + '%（本侧前 ' + itemsOf(d.contrib > 0 ? 'up' : 'down').length + ' 名内）<br/>' +
'24H Vol：' + fmtVol(d.vol);
}
},
title: [
{
text: sign(DATA.upSum) + '%', subtext: '前 ' + itemsOf('up').length + ' 名合计',
left: '25%', top: '44%', textAlign: 'center',
textStyle: { color: '#5fbf8f', fontSize: 22, fontWeight: 600 },
subtextStyle: { color: '#89949b', fontSize: 12 }
},
{
text: sign(DATA.downSum) + '%', subtext: '前 ' + itemsOf('down').length + ' 名合计',
left: '75%', top: '44%', textAlign: 'center',
textStyle: { color: '#e0605f', fontSize: 22, fontWeight: 600 },
subtextStyle: { color: '#89949b', fontSize: 12 }
}
],
series: [seriesOf('up', ['25%', '50%'], size), seriesOf('down', ['75%', '50%'], size)]
};
}
chart.setOption(buildOption());

var legend = document.getElementById('coin50-attribution-legend');
if (legend) { legend.innerHTML = legendHtml('up', '🟢 正向贡献前') + legendHtml('down', '🔴 反向贡献前'); }

var hovered = null;
chart.on('mouseover', function (params) { if (params.seriesType === 'pie') { hovered = params; } });
chart.on('globalout', function () {
hovered = null;
chart.dispatchAction({ type: 'downplay', seriesIndex: [0, 1] });
});
chart.on('click', function (params) {
if (params.seriesType !== 'pie' || !params.name) { return; }
window.open(PREFIX + params.name + 'USDT', '_blank', 'noopener');
});
chart.getZr().on('contextmenu', function (event) {
if (!hovered || !hovered.name) { return; }     // 没点在扇区上 → 交回浏览器默认菜单
var native = event.event || {};
if (native.preventDefault) { native.preventDefault(); }
if (native.stopPropagation) { native.stopPropagation(); }
if (window.watchlist) { window.watchlist.toggle(hovered.name, true); }
});

function once() {
if (node.clientWidth > 0 && node.clientHeight > 0) { chart.resize(); chart.setOption(buildOption(), false); }
}
window.requestAnimationFrame(once);
window.setTimeout(once, 150);
window.setTimeout(once, 500);
crsCharts.onResize(once);
var panel = node.closest('.tab-panel');
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, once);
}
}
if (document.readyState === 'complete') { draw(); } else { window.addEventListener('load', draw); }
})();