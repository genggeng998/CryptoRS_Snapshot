
(function () {
var DATA = {"date":"2026-11-21","pool":136,"universe":136,"skipped":0,"indexPct":-0.33,"upSum":1.54,"downSum":-1.17,"upAll":1.77,"downAll":-2.09,"upCount":46,"downCount":88,"flatCount":2,"restSum":-0.69,"restCount":96,"topN":20,"thin":false,"minSample":20,"up":[{"coin":"SKYAI","pct":27.5,"contrib":0.2022,"share":13.11,"vol":26846262},{"coin":"IDOL","pct":22.58,"contrib":0.166,"share":10.77,"vol":53920818},{"coin":"DODOX","pct":19.88,"contrib":0.1462,"share":9.48,"vol":84926123},{"coin":"PARTI","pct":18.03,"contrib":0.1326,"share":8.6,"vol":18134384},{"coin":"RARE","pct":17.46,"contrib":0.1284,"share":8.32,"vol":88075083},{"coin":"YB","pct":15.73,"contrib":0.1157,"share":7.5,"vol":32999822},{"coin":"NAORIS","pct":12.14,"contrib":0.0893,"share":5.79,"vol":17590135},{"coin":"BTW","pct":10.99,"contrib":0.0808,"share":5.24,"vol":66076618},{"coin":"VVV","pct":10.42,"contrib":0.0766,"share":4.97,"vol":62107494},{"coin":"PROM","pct":10.4,"contrib":0.0765,"share":4.96,"vol":48948859},{"coin":"SIREN","pct":9.94,"contrib":0.0731,"share":4.74,"vol":10433742},{"coin":"JCT","pct":6.12,"contrib":0.045,"share":2.92,"vol":42787767},{"coin":"ENSO","pct":5.46,"contrib":0.0402,"share":2.6,"vol":112563090},{"coin":"USELESS","pct":3.79,"contrib":0.0278,"share":1.81,"vol":33830522},{"coin":"BR","pct":3.46,"contrib":0.0254,"share":1.65,"vol":21078629},{"coin":"ZEC","pct":3.4,"contrib":0.025,"share":1.62,"vol":2912955433},{"coin":"ETH","pct":3.19,"contrib":0.0234,"share":1.52,"vol":18074136697},{"coin":"XMR","pct":3.18,"contrib":0.0234,"share":1.52,"vol":76687792},{"coin":"BARD","pct":3.14,"contrib":0.0231,"share":1.5,"vol":54716514},{"coin":"MORPHO","pct":2.89,"contrib":0.0212,"share":1.38,"vol":10845043}],"down":[{"coin":"BLESS","pct":-17.13,"contrib":-0.126,"share":10.73,"vol":485230591},{"coin":"MMT","pct":-16.61,"contrib":-0.1221,"share":10.4,"vol":180142603},{"coin":"DOS","pct":-15.33,"contrib":-0.1127,"share":9.6,"vol":19733066},{"coin":"ICNT","pct":-11.96,"contrib":-0.088,"share":7.49,"vol":45567224},{"coin":"IRYS","pct":-11.61,"contrib":-0.0853,"share":7.27,"vol":41336085},{"coin":"AKE","pct":-11.38,"contrib":-0.0837,"share":7.13,"vol":290217782},{"coin":"1000LUNC","pct":-7.92,"contrib":-0.0582,"share":4.96,"vol":19939405},{"coin":"PIPPIN","pct":-7.88,"contrib":-0.058,"share":4.94,"vol":26762012},{"coin":"SOPH","pct":-6.91,"contrib":-0.0508,"share":4.32,"vol":18846949},{"coin":"JUP","pct":-5.94,"contrib":-0.0437,"share":3.72,"vol":32370688},{"coin":"ONE","pct":-5.87,"contrib":-0.0432,"share":3.68,"vol":10983790},{"coin":"BREV","pct":-5.04,"contrib":-0.037,"share":3.15,"vol":33336435},{"coin":"MARSCOIN","pct":-4.91,"contrib":-0.0361,"share":3.08,"vol":12158804},{"coin":"PONS","pct":-4.62,"contrib":-0.0339,"share":2.89,"vol":24473621},{"coin":"CRV","pct":-4.62,"contrib":-0.0339,"share":2.89,"vol":36171158},{"coin":"FIL","pct":-4.61,"contrib":-0.0339,"share":2.89,"vol":120381194},{"coin":"CYBER","pct":-4.55,"contrib":-0.0334,"share":2.85,"vol":69739539},{"coin":"ARIA","pct":-4.44,"contrib":-0.0326,"share":2.78,"vol":16307454},{"coin":"ATOM","pct":-4.24,"contrib":-0.0312,"share":2.66,"vol":21284061},{"coin":"INJ","pct":-4.13,"contrib":-0.0303,"share":2.58,"vol":116979696}],"c50":["ATOM","CRV","ETH","FIL","INJ","JUP","VVV","XMR","ZEC"]};
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
var node = document.getElementById('attribution-chart');
if (!node) { return; }
if (!window.echarts) {
node.innerHTML = '<div class="chart-fallback">ECharts 未加载（需要联网从 CDN 取库）， 指数贡献暂不可用。</div>';
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

var legend = document.getElementById('attribution-legend');
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