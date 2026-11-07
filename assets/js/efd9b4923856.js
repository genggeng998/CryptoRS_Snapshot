
(function () {
function draw() {
var node = document.getElementById('urpd-data');
var host = document.getElementById('urpd-chart');
if (!node || !host || !window.echarts) { return; }
if (host.dataset.drawn === '1') { return; }
host.dataset.drawn = '1';
var DATA;
try { DATA = JSON.parse(node.textContent); } catch (e) { return; }

var SUPPORT = '#3fbf7f', RESISTANCE = '#e0605f';
var LIQ_LONG = '#4a6fa5', LIQ_SHORT = '#c9873c';
var WALL_BORDER = '#0a0e11';
var LIQ = DATA.liq || null;
function fmtStrength(strength) {
return strength ? (strength.band + ' ' + Math.round(strength.total)) : '';
}
function bandColour(strength) {
if (!strength) { return '#c9d3d8'; }
if (strength.band === '强') { return '#f2f7fa'; }
return strength.band === '中' ? '#cfe0e8' : '#9fb0b9';
}
var bars = DATA.buckets.map(function (b) {
var up = b.price >= DATA.price;
var base = up ? '224,96,95' : '63,191,127';
var style = { color: 'rgba(' + base + ',' + (b.wall ? '0.95' : '0.45') + ')' };
if (b.wall) {
style.borderColor = WALL_BORDER;
style.borderWidth = 2;
style.borderType = 'solid';
}
var label = { show: false };
if (b.wall && b.strength) {
label = {
show: true, position: 'left', distance: 6, fontSize: 11,
color: bandColour(b.strength),
formatter: (up ? '压力' : '支撑') + ' · 强度 ' + Math.round(b.strength.total) + ' ' + b.strength.band
};
}
return { value: b.amount, itemStyle: style, label: label };
});

function liqBars(values, colour) {
return values.map(function (value) {
return { value: value, itemStyle: { color: colour } };
});
}


function fmtAmount(value) { return value.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' BTC'; }
function fmtDelta(value) {
if (value === null || value === undefined) { return '—'; }
return (value >= 0 ? '+' : '') + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
}
function fmtPct(value, digits) {
if (value === null || value === undefined) { return '—'; }
return (value * 100).toFixed(digits === undefined ? 1 : digits) + '%';
}
function fmtUsd(value) {
if (value === null || value === undefined) { return '—'; }
var abs = Math.abs(value);
if (abs >= 1e9) { return '$' + (value / 1e9).toFixed(2) + 'B'; }
if (abs >= 1e6) { return '$' + (value / 1e6).toFixed(1) + 'M'; }
if (abs >= 1e3) { return '$' + (value / 1e3).toFixed(1) + 'k'; }
return '$' + value.toFixed(0);
}
function fmtPrice(value) { return '$' + Math.round(value).toLocaleString('en-US'); }
function tipRow(label, body) {
return '<span style="color:#89949b">' + label + '</span>' + body;
}
function liqTip(index) {
if (!LIQ) { return ''; }
var bucket = DATA.buckets[index];
var longValue = LIQ.long[index] || 0, shortValue = LIQ.short[index] || 0;
var distance = LIQ.distance[index];
var rows = [
'<b>' + bucket.label + '</b>',
tipRow('价格区间：', fmtPrice(bucket.price) + ' - ' + fmtPrice(bucket.high)),
tipRow('多头清算名义价值：', '<span style="color:' + LIQ_LONG + '">●</span> <b>' + fmtUsd(longValue) + '</b>'
+ '（' + (LIQ.longCounts[index] || 0) + ' 笔）'),
tipRow('空头清算名义价值：', '<span style="color:' + LIQ_SHORT + '">●</span> <b>' + fmtUsd(shortValue) + '</b>'
+ '（' + (LIQ.shortCounts[index] || 0) + ' 笔）'),
];
rows.push(tipRow('距离现价：', distance === null || distance === undefined ? '—' : ((distance >= 0 ? '+' : '') + (distance * 100).toFixed(2) + '%')));
rows.push('<span style="color:#89949b">' + (bucket.price >= DATA.price
? '现价上方 = 空头清算区（涨上去爆空头）'
: '现价下方 = 多头清算区（跌下去爆多头）') + '</span>');
return rows.join('<br/>');
}
var WALL_ORDINALS = ['一', '二', '三', '四', '五'];
function wallRank(bucket) {
var list = bucket.wall === 'support' ? (DATA.support || []) : (DATA.resistance || []);
for (var i = 0; i < list.length; i++) {
if (list[i].low === bucket.price) { return i + 1; }
}
return 0;                                    // 不在 Top 清单里（理论上不会）
}
function wallTip(bucket) {
var rank = wallRank(bucket);
var side = bucket.wall === 'support' ? '现价下方' : '现价上方';
var name = bucket.wall === 'support' ? '支撑墙' : '压力墙';
var order = rank ? (WALL_ORDINALS[rank - 1] || rank) + '厚' : '较厚';
return '🧱 ' + name + '（' + side + '筹码第' + order + '）';
}

var chart = crsCharts.init(host, null, { renderer: 'canvas' });

function buildOption(width) {
var mid = Math.round(width / 2);
var GUTTER = 76;        // 中间价格刻度的净空
var LEFT_PAD = 178;     // 左半「支撑/压力 · 强度」标注的净空
var RIGHT_PAD = 22;
var TOP = 12, BOTTOM = 30;
var grids = [
{ left: LEFT_PAD, right: width - mid + GUTTER / 2, top: TOP, bottom: BOTTOM },
{ left: mid + GUTTER / 2, right: RIGHT_PAD, top: TOP, bottom: BOTTOM }
];
var series = [{
name: '筹码量',
type: 'bar',
xAxisIndex: 0,
yAxisIndex: 0,
data: bars,
barCategoryGap: '12%',
markLine: {
silent: true, symbol: 'none',
label: {
show: true,
formatter: '现价 ' + fmtPrice(DATA.price),
position: 'insideEndTop', color: '#f0f4f6', fontSize: 11
},
lineStyle: { color: '#f0f4f6', type: 'dashed', width: 1.2 },
data: [{ yAxis: DATA.names[DATA.priceIndex] }]
}
}];
if (LIQ) {
series.push({
name: '多头清算',
type: 'bar',
xAxisIndex: 1,
yAxisIndex: 1,
data: liqBars(LIQ.long, LIQ_LONG),
barCategoryGap: '12%',
emphasis: { disabled: true },
markLine: {
silent: true, symbol: 'none',
label: { show: false },
lineStyle: { color: '#f0f4f6', type: 'dashed', width: 1.2 },
data: [{ yAxis: DATA.names[DATA.priceIndex] }]
}
});
series.push({
name: '空头清算',
type: 'bar',
xAxisIndex: 1,
yAxisIndex: 1,
data: liqBars(LIQ.short, LIQ_SHORT),
barCategoryGap: '12%',
barGap: '-100%',     // 与「多头清算」完全重叠（只有跨现价那一桶两边都有值）
emphasis: { disabled: true }   // 同上：悬停不许改色，否则双色那一桶会被盖成单色
});
}
return {
backgroundColor: 'transparent',
animation: false,
grid: grids,
tooltip: {
trigger: 'item',
formatter: function (params) {
if (params.seriesName === '多头清算' || params.seriesName === '空头清算') {
return liqTip(params.dataIndex);
}
var b = DATA.buckets[params.dataIndex];
var rows = [
'<b>' + b.label + '</b>　' + (b.price < DATA.price ? '获利盘' : '套牢盘'),
'筹码量：<b>' + fmtAmount(b.amount) + '</b>',
'日变化：' + fmtDelta(b.day) + '　14日变化：' + fmtDelta(b.churn),
];
if (b.wall) {
rows.push(wallTip(b));
}
if (b.strength) {
var s = b.strength;
rows.push('强度分：<b>' + Math.round(s.total) + '</b>（' + s.band + '）　' + s.components);
rows.push('筹码占比：' + fmtPct(s.chipShare) + '（' + s.chip.toFixed(1) + ' 分）'
+ '　近期换手：' + (s.turnoverRatio === null ? '无数据' : fmtPct(s.turnoverRatio)) + '（' + s.turnover.toFixed(1) + ' 分）');
rows.push(s.depthKind + '：<b>' + (s.depthValue * 100).toFixed(1) + '%</b>（' + s.depthScore.toFixed(0) + ' 分）'
+ '　' + s.depthNote
+ '　STH ' + (b.wall === 'support' ? '亏损' : '获利') + '占比：'
+ (s.ratioValue === null ? '无数据' : s.ratioValue.toFixed(1) + '%') + '（' + s.ratioScore.toFixed(1) + ' 分）');
}
if (b.lvn) { rows.push('▫ LVN 筹码真空区'); }
if (b.churnZone) { rows.push('🟡 近 ' + DATA.churnDays + ' 天换手密集区'); }
if (LIQ) {
rows.push('<span style="color:#89949b">右侧清算带：多头 '
+ fmtUsd(LIQ.long[params.dataIndex] || 0) + ' / 空头 '
+ fmtUsd(LIQ.short[params.dataIndex] || 0) + '</span>');
}
return rows.join('<br/>');
}
},
xAxis: [
{
gridIndex: 0, type: 'value', inverse: true,
name: 'BTC 数量', nameLocation: 'middle', nameGap: 20,
nameTextStyle: { color: '#89949b', fontSize: 11 },
axisLabel: { color: '#89949b', fontSize: 10, formatter: function (v) { return v >= 1000 ? (v / 1000) + 'k' : v; } },
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
},
{
gridIndex: 1, type: 'value',
name: LIQ ? '清算名义价值（USD）' : '清算名义价值（无数据）',
nameLocation: 'middle', nameGap: 20,
nameTextStyle: { color: LIQ ? '#a98a5c' : '#6d757b', fontSize: 11 },
axisLabel: {
color: LIQ ? '#a98a5c' : '#6d757b', fontSize: 10,
formatter: function (v) { return fmtUsd(v); }
},
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
}
],
yAxis: [
{
gridIndex: 0, type: 'category', data: DATA.names, position: 'right',
axisLabel: {
color: '#a8b4bb', fontSize: 10,
formatter: function (v) { return '$' + (Number(v) / 1000) + 'k'; }
},
axisLine: { lineStyle: { color: '#38434a' } },
axisTick: { show: false }
},
{ gridIndex: 1, type: 'category', data: DATA.names, show: false, axisLabel: { show: false } }
],
series: series
};
}

chart.setOption(buildOption(host.clientWidth || 1200));
function relayout() { chart.setOption(buildOption(host.clientWidth || 1200)); }

function doResize() {
if (host.clientWidth > 0 && host.clientHeight > 0) { chart.resize(); relayout(); }
}
function syncSize() {
window.requestAnimationFrame(doResize);
window.setTimeout(doResize, 150);
window.setTimeout(doResize, 500);
}
syncSize();
crsCharts.onResize(syncSize);
var panel = host.closest('.tab-panel');
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, syncSize);
}
}
if (document.readyState === 'complete') { draw(); } else { window.addEventListener('load', draw); }
})();