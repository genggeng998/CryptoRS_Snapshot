
(function () {
var DATA = {"dates":["2026-10-22","2026-10-23","2026-10-24","2026-10-25","2026-10-26","2026-10-27","2026-10-28","2026-10-29","2026-10-30","2026-10-31","2026-11-01","2026-11-02","2026-11-03","2026-11-04","2026-11-05","2026-11-06","2026-11-07","2026-11-08","2026-11-09","2026-11-10","2026-11-11","2026-11-12","2026-11-13","2026-11-14","2026-11-15","2026-11-16","2026-11-17","2026-11-18","2026-11-19","2026-11-20"],"level":[31.751375,30.525185,31.644119999999997,30.081985,33.884625,38.4615,40.778724999999994,20.100025,25.375925000000002,29.954545000000003,31.262594999999997,25.652169999999998,24.203525,35.867755,19.2913,27.608674999999998,32.06898,29.82759,28.22117,25.70799,18.58584,20.95,17.60506,9.090875,15.75468,15.202005,16.891875,20.865380000000002,19.380555,16.111145],"slope":[-13.8338,-18.552339999999994,-13.457459999999998,-14.2382,-12.896239999999999,2.663040000000003,0.6054999999999975,-25.17302,-30.031259999999996,-30.56796,-4.274819999999997,-6.9984600000000015,-8.100959999999999,3.897800000000001,-17.761400000000002,-12.34186,-11.29454,7.245980000000003,1.7857400000000008,-2.7191999999999985,-12.525240000000002,-5.704339999999999,-6.273460000000001,-25.991740000000007,-1.3475000000000006,-13.252519999999999,-13.94846,-7.661400000000002,-8.561940000000002,-9.779079999999999],"slopeNorm":[32.707750000000004,26.80957500000001,33.178175,32.20225,33.8797,53.3288,50.756875,18.533724999999997,12.460925000000005,11.79005,44.656475,41.251925,39.873799999999996,54.87225,27.798249999999996,34.572675,35.881825,59.057475000000004,52.232175000000005,46.601,34.34345,42.869575,42.158175,17.51032499999999,48.315625,33.43435,32.564425,40.423249999999996,39.297575,37.776149999999994],"turnover":[1.0571245970605654,0.8866015202983109,0.7665815737062526,0.5237107623921892,0.9402607564472618,0.8348670046038714,0.9500863667528485,1.6804949691649858,1.625206138571299,0.5400042992794718,0.5385478278726854,0.933539662493675,0.8293762314797491,1.4149933423330232,1.5911883080304707,1.0319892518465839,0.4285363477950124,0.6613320056133912,1.0727379841490694,1.0771147794201623,0.8997926477935249,1.0008916601379056,1.4028661522130215,1.4512585557461761,1.201822927467655,1.0076102620732006,1.0622760151506676,0.9339673439318477,1.0394204285960356,1.7515704969735786],"turnoverNorm":[35.23748656868551,29.553384009943695,25.55271912354175,17.457025413072973,31.342025214908727,27.82890015346238,31.669545558428286,56.0164989721662,54.17353795237664,18.000143309315728,17.951594262422844,31.117988749789166,27.645874382658302,47.1664447444341,53.039610267682356,34.39964172821946,14.284544926500411,22.04440018711304,35.75793280496898,35.903825980672075,29.993088259784162,33.363055337930184,46.76220507376738,48.375285191539206,40.060764248921835,33.58700873577335,35.409200505022255,31.132244797728255,34.64734761986785,58.38568323245262],"turnoverColors":["#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#f57c00","#f57c00","#42a5f5","#42a5f5","#43a047","#43a047","#66bb6a","#f57c00","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#66bb6a","#66bb6a","#66bb6a","#43a047","#43a047","#43a047","#43a047","#f57c00"],"turnoverTip":["正常","正常","缩量","缩量","正常","正常","正常","温和放量","温和放量","缩量","缩量","正常","正常","轻微放量","温和放量","正常","缩量","缩量","正常","正常","正常","正常","轻微放量","轻微放量","轻微放量","正常","正常","正常","正常","温和放量"],"divergenceMarks":[{"i":0,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 18.97 · 还差 1.83% 创 60 日新高 · 待确认"}],"amount":[-0.09332050701694139,-0.12293991276585536,-0.09256259545641177,-0.1292193993690084,-0.10169273644795818,-0.1100226107085408,-0.12794861482818543,-0.004393286424942411,0.12336781997546176,0.051802098841269295,0.08462365390853033,0.07522405865468595,0.10220383903650787,0.20431966083956765,0.10555591362542294,-0.0775365549992969,-0.06348901619598013,-0.049510287844580114,-0.02947667613717586,0.008344244352742614,-0.1160442178351373,-0.1840724219629173,-0.06473398903145577,0.10337417643283131,0.17348405545366696,0.15551043062790715,0.12788058498285704,0.23118169916151743,0.36693612282072285,0.3609712067470363],"amountNorm":[40.667949298305864,37.70600872341446,40.74374045435882,37.07806006309916,39.830726355204185,38.99773892914592,37.20513851718146,49.56067135750576,62.336781997546176,55.18020988412693,58.46236539085303,57.5224058654686,60.220383903650784,70.43196608395677,60.555591362542295,42.24634450007031,43.65109838040199,45.04897121554199,47.052332386282416,50.83442443527426,38.39557821648627,31.59275780370827,43.52660109685442,60.33741764328313,67.3484055453667,65.55104306279071,62.78805849828571,73.11816991615174,86.69361228207228,86.09712067470363],"volumeText":["$79.45B","$64.90B","$56.94B","$39.19B","$68.22B","$60.40B","$66.61B","$113.26B","$113.02B","$39.42B","$39.08B","$65.80B","$57.67B","$96.47B","$107.61B","$71.44B","$30.29B","$45.97B","$73.47B","$73.73B","$61.32B","$67.30B","$94.50B","$100.48B","$86.90B","$73.80B","$78.51B","$69.58B","$75.17B","$123.36B"],"temperature":[19.174134901960784,17.237751529411767,19.514996705882353,17.800060549019605,21.378857725490196,50.700014117647065,49.5923156862745,11.350602352941177,14.32993411764706,16.915507764705886,36.36795411764706,23.020907294117645,21.02684894117647,50.515481960784314,10.893910588235293,18.426130509803922,22.062032313725496,55.78768368627451,42.30181254901961,34.52121647058824,13.135277176470588,21.745958901960787,19.249990274509813,5.133670588235294,29.32428392156863,10.448640313725493,10.660583843137253,19.610642823529414,17.811577411764706,14.667039686274514],"leverage":{"values":[50.0,50.0,50.0,50.0,50.0,50.0,50.0,50.0,50.0,32.0,36.4,60.0,43.1,80.0,68.0,42.5,23.5,63.3,70.5,65.0,28.6,66.4,56.5,37.5,36.8,31.5,24.4,75.7,80.0,72.0],"colors":["#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#b85c5c","#b85c5c","#43a047","#42a5f5","#b85c5c","#b85c5c","#b85c5c","#42a5f5","#b85c5c","#43a047","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#b85c5c","#b85c5c","#b85c5c"],"bands":["正常","正常","正常","正常","正常","正常","正常","正常","正常","偏冷","偏冷","正常","正常","偏热","偏热","正常","偏冷","偏热","偏热","偏热","偏冷","偏热","正常","偏冷","偏冷","偏冷","偏冷","偏热","偏热","偏热"],"label":"杠杆偏冷","band":"偏冷","color":"#42a5f5","heat":23.9,"live":true,"liveNote":"当日（2026-11-21 进行中）杠杆热度 23.9/100 偏冷 · 量比 6.947 · 基差 -0.060%","detail":"T-1 结算日 2026-11-20 · 量比热度 87×0.6 + 基差 -0.062%（基差热度 50）×0.4 = 72.0","haveDays":30},"advance":{"delta":[-98,-45,-34,-52,30,35,34,-119,72,-16,-3,-67,24,81,-92,62,-16,-72,40,-27,-43,-20,-52,-108,66,-51,58,-32,-23,-84],"up":[17,44,46,35,80,76,78,15,103,46,48,24,68,101,18,89,35,16,72,43,28,40,33,12,86,24,84,36,45,26],"down":[115,89,80,87,50,41,44,134,31,62,51,91,44,20,110,27,51,88,32,70,71,60,85,120,20,75,26,68,68,110],"flat":[0,0,0,0,0,0,0,1,0,2,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0],"axisMax":120,"haveDays":30,"days":35,"basisDay":"2026-11-20","title":"涨跌家数（基于 T-1 结算数据）","short":"涨跌家数","upColor":"#5aa87a","downColor":"#d32f2f","zeroColor":"rgba(200,210,216,0.45)"},"advanceCoin50":{"delta":[-45,-27,-25,-21,6,9,16,-43,30,-10,-8,-37,17,35,-44,30,-21,-40,32,-26,-24,-20,-36,-48,37,-31,34,-38,-26,-49],"up":[1,10,10,11,26,26,30,3,39,15,16,3,31,42,2,37,8,2,38,9,10,13,6,0,41,6,39,3,9,0],"down":[46,37,35,32,20,17,14,46,9,25,24,40,14,7,46,7,29,42,6,35,34,33,42,48,4,37,5,41,35,49],"flat":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0],"axisMax":50,"haveDays":30,"days":35,"basisDay":"2026-11-20","title":"coin50 涨跌家数（基于 T-1 结算数据）","short":"coin50 涨跌家数","upColor":"#5aa87a","downColor":"#d32f2f","zeroColor":"rgba(200,210,216,0.45)"},"etf":[{"symbol":"BTC","dates":["2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-26","2026-10-27","2026-10-28","2026-10-29","2026-10-30","2026-11-02","2026-11-03","2026-11-04","2026-11-05","2026-11-06","2026-11-09","2026-11-10","2026-11-11","2026-11-12","2026-11-13","2026-11-16","2026-11-17","2026-11-18","2026-11-19","2026-11-20"],"values":[-65.4,175.7,-261.4,5.0,-82.4,526.6,23.2,528.4,-635.5,-138.0,110.3,176.0,137.3,17.0,-643.3,-398.6,-115.5,74.5,-430.2,-411.9,-201.1,-95.0,-299.9,-284.2,-185.4,4.3,-236.3,-306.4,-582.2,-124.5]},{"symbol":"ETH","dates":["2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-26","2026-10-27","2026-10-28","2026-10-29","2026-10-30","2026-11-02","2026-11-03","2026-11-04","2026-11-05","2026-11-06","2026-11-09","2026-11-10","2026-11-11","2026-11-12","2026-11-13","2026-11-16","2026-11-17","2026-11-18","2026-11-19","2026-11-20"],"values":[-85.4,24.8,-129.5,-60.3,-69.7,-103.3,-26.2,14.9,-110.5,4.4,-88.6,-60.2,-21.4,-105.5,-155.8,-139.8,-85.4,53.0,-99.9,-93.2,-184.5,-1.3,-144.8,-70.6,2.3,-8.3,-29.1,-39.8,-131.2,-13.2]}]};
var PANEL_BG = '#1b2227';
function rawFmt(v, digits, suffix) {
return (v === null || v === undefined) ? '-' : v.toFixed(digits) + (suffix || '');
}
function draw(attempt) {
if (!window.echarts) {
if (attempt < 60) { setTimeout(function () { draw(attempt + 1); }, 500); }
return;
}
var rows = [];
for (var i = 0; i < DATA.dates.length; i++) {
rows.push({
level: DATA.level[i], slope: DATA.slope[i], turnover: DATA.turnover[i], amount: DATA.amount[i],
temp: DATA.temperature[i]
});
}
var host = document.getElementById('capital-chart');
if (host) {
var LEV = DATA.leverage || null;
var hasLev = !!(LEV && LEV.haveDays > 0);
var adBands = [];
if (DATA.advance && DATA.advance.haveDays > 0) {
adBands.push({ info: DATA.advance, label: '📊 ' + DATA.advance.title });
}
if (DATA.advanceCoin50 && DATA.advanceCoin50.haveDays > 0) {
adBands.push({ info: DATA.advanceCoin50, label: '💰 ' + DATA.advanceCoin50.title });
}
var MAIN_TOP = 44, MAIN_H = 204, LEV_TOP = 296, LEV_H = 84;
var AD_H = LEV_H;
var LEV_BOTTOM = LEV_TOP + LEV_H;
var adTop = (hasLev ? LEV_BOTTOM : MAIN_TOP + MAIN_H) + 56;
adBands.forEach(function (band) { band.top = adTop; adTop += AD_H + 56; });
var bottom = adBands.length
? adBands[adBands.length - 1].top + AD_H + 30
: (hasLev ? LEV_BOTTOM + 32 : 300);
host.style.height = bottom + 'px';
var chart = echarts.getInstanceByDom(host) || crsCharts.init(host, null, { renderer: 'canvas' });
var hasLower = hasLev || adBands.length > 0;
var mainAxis = {
type: 'category', data: DATA.dates, boundaryGap: true, gridIndex: 0,
axisLine: { lineStyle: { color: '#38434a' } },
axisTick: { show: !hasLower },
axisLabel: { show: !hasLower, color: '#89949b', fontSize: 10, formatter: function (v) { return v.slice(5); } }
};
var axis100 = {
type: 'value', min: 0, max: 100, interval: 20,
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.07)' } },
axisLabel: { color: '#89949b', fontSize: 10, formatter: '{value}' }
};
var xAxes = [mainAxis];
var yAxes = [axis100];
var grids = [{ left: 46, right: 46, top: MAIN_TOP, height: MAIN_H }];
var graphics = [];
var levIdx = -1;
adBands.forEach(function (band, k) {
band.last = (k === adBands.length - 1);
});
if (hasLev) {
levIdx = grids.length;
xAxes.push({
type: 'category', data: DATA.dates, boundaryGap: true, gridIndex: levIdx,
axisLine: { lineStyle: { color: '#38434a' } },
axisTick: { show: !hasLower },                                 // 日期行留给最下面那条带
axisLabel: { show: !hasLower, color: '#89949b', fontSize: 10, formatter: function (v) { return v.slice(5); } }
});
yAxes.push({
type: 'value', min: 0, max: 100, interval: 20, gridIndex: levIdx,
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
axisLabel: { color: '#89949b', fontSize: 10 },
axisLine: { show: false }
});
grids.push({ left: 46, right: 46, top: LEV_TOP, height: LEV_H });
var levFill = '#c9d4da';
if (LEV && LEV.color && (LEV.band === '偏热' || LEV.band === '过热'
|| LEV.band === '偏冷' || LEV.band === '出清')) {
levFill = LEV.color;
}
graphics.push({
type: 'text', left: 46, top: LEV_TOP - 20,
style: {
text: '⚖️ 杠杆热度（合约/现货量比 + 基差 · 独立模块，不进温度计 · 折线只到 T-1 结算日）'
+ (LEV.band ? '  现 ' + (LEV.heat === null ? '-' : LEV.heat.toFixed(1)) + ' · ' + LEV.band
+ (LEV.live ? '（当日进行中）' : '') : ''),
fill: levFill, fontSize: 11, fontWeight: 600
}
});
}
adBands.forEach(function (band) {
var info = band.info;
band.idx = grids.length;
xAxes.push({
type: 'category', data: DATA.dates, boundaryGap: true, gridIndex: band.idx,
axisLine: { lineStyle: { color: '#38434a' } },
axisTick: { show: band.last },
axisLabel: { show: band.last, color: '#89949b', fontSize: 10, formatter: function (v) { return v.slice(5); } }
});
yAxes.push({
type: 'value', min: 0, max: info.axisMax, splitNumber: 4, gridIndex: band.idx,
splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
axisLabel: { color: '#89949b', fontSize: 10 },
axisLine: { show: false }
});
grids.push({ left: 46, right: 46, top: band.top, height: AD_H });
graphics.push({
type: 'text', left: 46, top: band.top - 20,
style: {
text: band.label + '  绿 = 净上涨 / 红 = 净下跌（Delta = 上涨 − 下跌，全部画在零轴上方）'
+ (info.basisDay ? '  最新 ' + info.basisDay : ''),
fill: '#c9d4da', fontSize: 11, fontWeight: 600
}
});
});
function marksOf(kind, strong) {
return (DATA.divergenceMarks || []).filter(function (m) {
return m.kind === kind && m.strong === strong;
}).map(function (m) {
return { value: [m.i, DATA.level[m.i]] };   // y 直接取当天的广度水平 ⇒ 正好落在白线上
});
}
var marksSeries = (DATA.divergenceMarks && DATA.divergenceMarks.length) ? [
{ name: '顶背离', type: 'scatter', z: 6, silent: true, symbolSize: 11,
data: marksOf('顶背离', true),
itemStyle: { color: '#e0605f', borderColor: PANEL_BG, borderWidth: 1 } },
{ name: '底背离', type: 'scatter', z: 6, silent: true, symbolSize: 11,
data: marksOf('底背离', true),
itemStyle: { color: '#3fbf7f', borderColor: PANEL_BG, borderWidth: 1 } },
{ name: '潜在顶背离', type: 'scatter', z: 5, silent: true, symbol: 'emptyCircle', symbolSize: 9,
data: marksOf('顶背离', false),
itemStyle: { color: 'rgba(224,96,95,0.75)', borderColor: 'rgba(224,96,95,0.75)', borderWidth: 1.6 } },
{ name: '潜在底背离', type: 'scatter', z: 5, silent: true, symbol: 'emptyCircle', symbolSize: 9,
data: marksOf('底背离', false),
itemStyle: { color: 'rgba(63,191,127,0.75)', borderColor: 'rgba(63,191,127,0.75)', borderWidth: 1.6 } }
] : [];
chart.setOption({
animation: false,
backgroundColor: 'transparent',
grid: grids,
graphic: graphics,
legend: {
top: 6, left: 'center', itemGap: 16, textStyle: { color: '#89949b', fontSize: 11 },
data: ['广度水平', '广度斜率', '换手率', '成交额']
},
tooltip: {
trigger: 'axis', backgroundColor: PANEL_BG, borderColor: '#38434a', textStyle: { color: '#d9dfe2', fontSize: 12 },
formatter: function (items) {
if (!items.length) { return ''; }
var i = items[0].dataIndex;
var row = rows[i] || {};
var lines = ['<b>' + DATA.dates[i] + '</b>'];
lines.push('广度水平：' + rawFmt(row.level, 1, '%'));
lines.push('广度斜率：' + (row.slope === null || row.slope === undefined ? '-' : (row.slope > 0 ? '+' : '') + row.slope.toFixed(1)));
if (row.turnover === null || row.turnover === undefined || row.amount === null || row.amount === undefined) {
lines.push('换手率：-（该日成交额还没结算：UTC 全天额要到次日 00:00Z 才出）');
lines.push('成交额：-');
} else {
var tipCol = (DATA.turnoverColors || [])[i] || '#888888';
lines.push('换手率：' + rawFmt(row.turnover, 2, 'x') + (DATA.turnoverTip[i]
? '（<span style="color:' + tipCol + '">' + DATA.turnoverTip[i] + '</span>）' : ''));
lines.push('成交额：' + ((DATA.volumeText && DATA.volumeText[i]) || '-') + '（近7日均值 / 前7日均值：'
+ (row.amount * 100).toFixed(1) + '%）');
}
if (row.temp !== null && row.temp !== undefined) { lines.push('温度：' + row.temp.toFixed(1) + ' / 100'); }
if (LEV && LEV.values[i] !== null && LEV.values[i] !== undefined) {
lines.push('杠杆热度：' + LEV.values[i].toFixed(1) + ' / 100'
+ (LEV.bands[i] ? '（' + LEV.bands[i] + '）' : ''));
}
adBands.forEach(function (band) {
var info = band.info;
var upCount = (info.up || [])[i], downCount = (info.down || [])[i], flatCount = (info.flat || [])[i];
var delta = (info.delta || [])[i];
if (delta === null || delta === undefined) {
lines.push(info.short + '：-（该日无数据）');
return;
}
lines.push(info.short + '：<span style="color:' + info.upColor + '">上涨 ' + upCount + ' 个</span>'
+ ' / <span style="color:' + info.downColor + '">下跌 ' + downCount + ' 个</span>'
+ ' / 平盘 ' + flatCount + ' 个'
+ ' / Delta <span style="color:' + (delta >= 0 ? info.upColor : info.downColor) + '">'
+ (delta > 0 ? '+' : '') + delta + '</span>');
});
(DATA.divergenceMarks || []).forEach(function (m) {
if (m.i !== i) { return; }
lines.push('<span style="color:' + (m.kind === '顶背离' ? '#e0605f' : '#3fbf7f') + '">'
+ m.label + '</span>：' + m.text);
});
return lines.join('<br>');
}
},
xAxis: xAxes,
yAxis: yAxes,
series: [
{
name: '换手率', type: 'bar', barWidth: '46%', z: 1,
data: DATA.turnoverNorm.map(function (v, i) { return { value: v, itemStyle: { color: DATA.turnoverColors[i] } }; }),
itemStyle: { opacity: 0.55 }
},
{ name: '广度水平', type: 'line', smooth: true, showSymbol: false, z: 4,
lineStyle: { color: 'rgba(214,222,227,0.92)', width: 2 }, itemStyle: { color: 'rgba(214,222,227,0.92)' },
data: DATA.level },
{ name: '广度斜率', type: 'line', smooth: true, showSymbol: false, z: 3,
lineStyle: { color: '#c9873c', width: 1.6 }, itemStyle: { color: '#c9873c' },
data: DATA.slopeNorm },
{ name: '成交额', type: 'line', smooth: true, showSymbol: false, z: 2,
lineStyle: { color: '#5aa87a', width: 1.6 }, itemStyle: { color: '#5aa87a' },
data: DATA.amountNorm },
].concat(marksSeries).concat(hasLev ? [{
name: '杠杆热度', type: 'bar', xAxisIndex: levIdx, yAxisIndex: levIdx, barWidth: '46%', z: 1,
data: (LEV.values || []).map(function (v, i) {
return { value: v, itemStyle: { color: (LEV.colors || [])[i] || '#5c666e', opacity: 0.85 } };
}),
silent: true
}] : []).concat(adBands.map(function (band) {
var info = band.info;
return {
name: info.short, type: 'bar', xAxisIndex: band.idx, yAxisIndex: band.idx,
barWidth: '46%', z: 2, silent: true,
data: (info.delta || []).map(function (v) {
if (v === null || v === undefined) { return null; }
return {
value: Math.abs(v),
itemStyle: { color: v > 0 ? info.upColor : (v < 0 ? info.downColor : info.zeroColor) }
};
}),
itemStyle: { opacity: 0.85 }
};
}))
});
var fit = function () { if (chart.getDom().clientWidth > 0 && chart.getDom().clientHeight > 0) { chart.resize(); } };
crsCharts.onResize(fit);
[60, 300, 800].forEach(function (ms) { setTimeout(fit, ms); });
}
(DATA.etf || []).forEach(function (asset) {
var box = document.getElementById('etf-chart-' + asset.symbol);
if (!box) { return; }
var chart = echarts.getInstanceByDom(box) || crsCharts.init(box, null, { renderer: 'canvas' });
chart.setOption({
animation: false, backgroundColor: 'transparent',
grid: { left: 56, right: 18, top: 26, bottom: 28 },
tooltip: {
trigger: 'axis', backgroundColor: PANEL_BG, borderColor: '#38434a', textStyle: { color: '#d9dfe2', fontSize: 12 },
formatter: function (items) {
if (!items.length) { return ''; }
var v = items[0].value;
if (v === null || v === undefined) { return '<b>' + items[0].axisValue + '</b><br>' + asset.symbol + '：休市'; }
var label = v > 0 ? '净流入' : (v < 0 ? '净流出' : '无明显流入流出');
var sign = v > 0 ? '+' : '';
return '<b>' + items[0].axisValue + '</b><br>' + asset.symbol + ' ' + label + '：' + sign + (v / 100).toFixed(2) + ' 亿美元';
}
},
xAxis: { type: 'category', data: asset.dates, axisLine: { lineStyle: { color: '#38434a' } },
axisLabel: { color: '#89949b', fontSize: 9, formatter: function (v) { return v.slice(5); } } },
yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.07)' } },
axisLabel: { color: '#89949b', fontSize: 10, formatter: function (v) { return (v / 100).toFixed(1) + '亿'; } } },
series: [{
type: 'bar', barWidth: '62%',
data: asset.values.map(function (v) {
var color = v > 0 ? '#5aa87a' : (v < 0 ? '#c0605f' : '#5c666e');
return { value: v, itemStyle: { color: color, opacity: 0.85 } };
}),
markLine: { silent: true, symbol: 'none', label: { show: false },
lineStyle: { color: 'rgba(200,210,216,0.35)', type: 'dashed', width: 1 }, data: [{ yAxis: 0 }] }
}]
});
var fitOne = function () { if (chart.getDom().clientWidth > 0 && chart.getDom().clientHeight > 0) { chart.resize(); } };
crsCharts.onResize(fitOne);
[60, 300, 800].forEach(function (ms) { setTimeout(fitOne, ms); });
});
}
draw(0);
})();