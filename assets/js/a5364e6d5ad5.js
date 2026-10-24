
(function () {
var DATA = {"date":"2026-10-24","pool":47,"universe":47,"skipped":0,"indexPct":-1.59,"upSum":0.14,"downSum":-1.16,"upAll":0.14,"downAll":-1.72,"upCount":5,"downCount":42,"flatCount":0,"restSum":-0.56,"restCount":22,"topN":20,"thin":false,"minSample":20,"up":[{"coin":"GRAM","pct":2.62,"contrib":0.0558,"share":40.3,"vol":36877839},{"coin":"TIA","pct":2.05,"contrib":0.0436,"share":31.45,"vol":70980849},{"coin":"XMR","pct":1.51,"contrib":0.0322,"share":23.27,"vol":71020238},{"coin":"POL","pct":0.21,"contrib":0.0045,"share":3.25,"vol":10363001},{"coin":"TRX","pct":0.11,"contrib":0.0024,"share":1.72,"vol":25562962}],"down":[{"coin":"ENA","pct":-4.68,"contrib":-0.0996,"share":8.59,"vol":327814549},{"coin":"NEAR","pct":-4.4,"contrib":-0.0935,"share":8.06,"vol":602560739},{"coin":"VVV","pct":-3.98,"contrib":-0.0846,"share":7.3,"vol":26370155},{"coin":"1000PEPE","pct":-3.6,"contrib":-0.0766,"share":6.61,"vol":445935781},{"coin":"SEI","pct":-3.26,"contrib":-0.0693,"share":5.97,"vol":17229875},{"coin":"JUP","pct":-3.17,"contrib":-0.0675,"share":5.82,"vol":14403128},{"coin":"STX","pct":-2.82,"contrib":-0.0599,"share":5.16,"vol":10372653},{"coin":"AAVE","pct":-2.79,"contrib":-0.0594,"share":5.13,"vol":65033492},{"coin":"ATOM","pct":-2.7,"contrib":-0.0574,"share":4.95,"vol":27827589},{"coin":"WLD","pct":-2.45,"contrib":-0.0521,"share":4.49,"vol":301058607},{"coin":"LIT","pct":-2.37,"contrib":-0.0503,"share":4.34,"vol":45772174},{"coin":"ONDO","pct":-2.34,"contrib":-0.0498,"share":4.3,"vol":63757932},{"coin":"ICP","pct":-2.34,"contrib":-0.0498,"share":4.29,"vol":20417730},{"coin":"TAO","pct":-2.13,"contrib":-0.0452,"share":3.9,"vol":96170599},{"coin":"UNI","pct":-2.11,"contrib":-0.0449,"share":3.87,"vol":130994025},{"coin":"ZEC","pct":-2.06,"contrib":-0.0439,"share":3.78,"vol":1520836505},{"coin":"RENDER","pct":-1.96,"contrib":-0.0418,"share":3.6,"vol":17891681},{"coin":"HYPE","pct":-1.88,"contrib":-0.0401,"share":3.45,"vol":414455957},{"coin":"DOT","pct":-1.78,"contrib":-0.0378,"share":3.26,"vol":65828898},{"coin":"WLFI","pct":-1.7,"contrib":-0.0362,"share":3.12,"vol":22976079}]};
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