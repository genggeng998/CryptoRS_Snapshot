
(function () {
var DATA = {"dates":["2026-09-24","2026-09-25","2026-09-26","2026-09-27","2026-09-28","2026-09-29","2026-09-30","2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-10","2026-10-11","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-17","2026-10-18","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23"],"level":[92.808925,94.77441,93.989905,91.649845,80.58588499999999,77.46799,79.895625,76.037025,74.356905,77.28282,80.20201,81.05383,72.885515,54.047125,43.363625,55.185165,60.39201,68.361185,43.86733,46.91507,40.34681500000001,40.118385,41.72722,32.55509,35.73092,39.86609,48.62201,51.51388,31.751375,30.525185],"slope":[31.79958,51.40738,44.2357,19.28284000000001,-17.04712000000001,-19.73398,-15.70368,-21.67006,-24.060660000000002,-12.898999999999996,-13.828299999999999,-13.414159999999999,-19.36028,-30.99668000000001,-27.44448,-12.64646,-9.351759999999999,1.1952999999999978,-21.9621,-21.97652,-33.134640000000005,-35.01802,-25.64428,-22.35484,-8.289339999999996,-14.43436,-10.505379999999997,-14.314220000000002,-13.8338,-18.552339999999994],"slopeNorm":[89.74947499999999,100.0,100.0,74.10355000000001,28.691099999999985,25.332525,30.370400000000004,22.912425,19.924174999999998,33.876250000000006,32.714625000000005,33.2323,25.799650000000003,11.254149999999989,15.694400000000003,34.191925,38.310300000000005,51.49412499999999,22.547375,22.529349999999997,8.581699999999994,6.227475,17.94465,22.056449999999998,39.63832500000001,31.957050000000002,36.868275000000004,32.10722499999999,32.707750000000004,26.80957500000001],"turnover":[1.1471304530301079,1.1516975094168094,0.5724146626857233,0.7055964544445239,1.282271042849333,1.0164722518141336,1.0976265122796944,1.0159150927881295,1.3200337087280356,0.46096998730987104,0.4930950494930505,0.9231704387090457,0.7979243495988373,1.169397825529938,1.3188300793770251,0.7678017430944978,0.4759389156931528,0.5343102724074971,0.946047776227339,1.0155270938021348,1.0385964624568413,1.3309196097486882,0.9335852874956512,0.5133704740204732,0.6605069971042177,0.8489619891935392,0.9635719376666431,1.0541215672200568,1.0571245970605654,0.8866015202983109],"turnoverNorm":[38.23768176767026,38.389916980560315,19.080488756190775,23.519881814817463,42.74236809497776,33.882408393804454,36.58755040932315,33.863836426270986,44.001123624267855,15.365666243662368,16.43650164976835,30.772347956968186,26.597478319961244,38.9799275176646,43.961002645900834,25.59339143648326,15.864630523105092,17.810342413583236,31.534925874244635,33.850903126737826,34.61988208189471,44.36398699162294,31.11950958318837,17.112349134015773,22.01689990347392,28.298732973117975,32.1190645888881,35.1373855740019,35.23748656868551,29.553384009943695],"turnoverColors":["#43a047","#43a047","#42a5f5","#42a5f5","#66bb6a","#43a047","#43a047","#43a047","#66bb6a","#42a5f5","#42a5f5","#43a047","#42a5f5","#43a047","#66bb6a","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#66bb6a","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047"],"turnoverTip":["正常","正常","缩量","缩量","轻微放量","正常","正常","正常","轻微放量","缩量","缩量","正常","缩量","正常","轻微放量","缩量","缩量","缩量","正常","正常","正常","轻微放量","正常","缩量","缩量","正常","正常","正常","正常","正常"],"divergenceMarks":[{"i":0,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 2.27 · 还差 0.70% 创 60 日新高 · 待确认"},{"i":1,"kind":"顶背离","strong":true,"label":"顶背离","text":"强度 3.57 · 衰减（29 天前确认）"},{"i":3,"kind":"顶背离","strong":true,"label":"顶背离","text":"强度 2.94 · 衰减（27 天前确认）"},{"i":4,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 2.80 · 已突破极值 0.00% · 待确认"},{"i":5,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 10.53 · 已突破极值 0.00% · 待确认"},{"i":6,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 18.27 · 还差 1.19% 创 60 日新高 · 待确认"},{"i":10,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 21.26 · 已突破极值 1.77% · 2026-10-05 确认"},{"i":11,"kind":"顶背离","strong":true,"label":"顶背离","text":"强度 13.56 · 衰减（19 天前确认）"},{"i":12,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 12.95 · 已突破极值 0.00% · 待确认"},{"i":13,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 15.48 · 已突破极值 0.00% · 待确认"},{"i":18,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 20.61 · 还差 0.93% 创 60 日新高 · 待确认"},{"i":22,"kind":"底背离","strong":false,"label":"潜在底背离","text":"强度 0.64 · 还差 5.97% 创 60 日新低 · 待确认"},{"i":23,"kind":"底背离","strong":false,"label":"潜在底背离","text":"强度 0.17 · 还差 5.98% 创 60 日新低 · 待确认"},{"i":28,"kind":"顶背离","strong":false,"label":"潜在顶背离","text":"强度 18.97 · 还差 1.83% 创 60 日新高 · 待确认"}],"amount":[0.3718123751407716,0.32352759559494015,0.22100380746145798,0.16042333351474358,-0.0023924611749223113,-0.05324424720525367,-0.1400743954768282,-0.18388446653361368,-0.1420568185284693,-0.1294103003208147,-0.1428063389180838,-0.14143463178642968,-0.14043218420061765,-0.0936426580956714,-0.0342008860657419,-0.13760503190496187,-0.12539741549355732,-0.09754117196248957,-0.058640236568775816,-0.0039421591405914835,-0.05149397249601584,-0.11980137495602661,-0.03187893418491572,-0.03518200963165796,-0.029016123340200428,-0.04837090273154954,-0.08919774353705512,-0.06332652677732376,-0.09332050701694139,-0.12293991276585536],"amountNorm":[87.18123751407715,82.35275955949402,72.1003807461458,66.04233335147435,49.76075388250777,44.675575279474636,35.99256045231718,31.611553346638633,35.79431814715307,37.05896996791853,35.71936610819162,35.85653682135703,35.95678157993824,40.635734190432856,46.57991139342581,36.23949680950381,37.46025845064427,40.245882803751044,44.135976343122415,49.605784085940854,44.850602750398416,38.01986250439734,46.81210658150843,46.481799036834204,47.098387665979956,45.162909726845044,41.08022564629449,43.667347322267624,40.667949298305864,37.70600872341446],"volumeText":["$100.87B","$101.26B","$51.53B","$62.91B","$113.63B","$91.37B","$98.91B","$92.24B","$118.69B","$43.22B","$46.11B","$84.55B","$72.37B","$105.20B","$120.78B","$70.44B","$43.64B","$48.25B","$80.68B","$84.90B","$84.73B","$107.50B","$75.70B","$42.25B","$53.67B","$66.44B","$74.21B","$79.88B","$79.45B","$64.90B"],"temperature":[100.0,100.0,100.0,100.0,45.50732329411765,43.746629647058825,45.11752941176471,42.938555294117656,41.98978164705883,45.8831297254902,46.540360156862754,47.463137254901966,41.15887905882354,30.520729411764705,24.48769411764706,33.67382996078431,40.12851262745098,69.84868745098039,24.77213929411765,26.493216000000004,22.784083764705887,22.655088000000003,23.5636065882353,18.384050823529414,27.335498039215693,23.1159648627451,32.25139639215687,29.821689725490195,19.174134901960784,17.237751529411767],"leverage":{"values":[50.0,50.0,50.0,50.0,50.0,50.0,50.0,50.0,50.0,32.0,52.7,75.0,61.5,45.7,80.0,65.0,27.1,63.3,80.0,74.0,60.0,71.8,67.0,30.0,70.4,75.4,73.3,56.4,53.1,50.0],"colors":["#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#43a047","#b85c5c","#b85c5c","#43a047","#b85c5c","#b85c5c","#42a5f5","#b85c5c","#b85c5c","#b85c5c","#43a047","#b85c5c","#b85c5c","#42a5f5","#b85c5c","#b85c5c","#b85c5c","#43a047","#43a047","#43a047"],"bands":["正常","正常","正常","正常","正常","正常","正常","正常","正常","偏冷","正常","偏热","偏热","正常","偏热","偏热","偏冷","偏热","偏热","偏热","正常","偏热","偏热","偏冷","偏热","偏热","偏热","正常","正常","正常"],"label":"杠杆正常","band":"正常","color":"#43a047","heat":50.0,"detail":"T-1 结算日 2026-10-23 · 量比热度 50×0.6 + 基差 -0.036%（基差热度 50）×0.4 = 50.0","haveDays":30},"advance":{"delta":[78,102,23,22,-94,-12,39,-12,-26,35,46,5,-38,-88,-73,74,66,64,-118,39,-85,30,-50,-69,-24,17,88,34,-98,-45],"up":[114,123,83,80,26,63,90,61,62,90,89,73,50,28,38,104,98,97,16,91,25,90,42,24,48,66,108,84,17,44],"down":[36,21,60,58,120,75,51,73,88,55,43,68,88,116,111,30,32,33,134,52,110,60,92,93,72,49,20,50,115,89],"flat":[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0],"axisMax":120,"haveDays":30,"days":35,"basisDay":"2026-10-23","title":"涨跌家数（基于 T-1 结算数据）","short":"涨跌家数","upColor":"#5aa87a","downColor":"#d32f2f","zeroColor":"rgba(200,210,216,0.45)"},"advanceCoin50":{"delta":[32,37,3,4,-36,-13,10,-10,-22,22,21,-6,-29,-40,-38,33,33,34,-43,29,-37,27,-28,-37,13,12,36,23,-45,-27],"up":[41,43,26,27,7,18,30,20,14,36,34,22,9,5,6,40,40,40,3,38,5,38,9,4,29,29,41,35,1,10],"down":[9,6,23,23,43,31,20,30,36,14,13,28,38,45,44,7,7,6,46,9,42,11,37,41,16,17,5,12,46,37],"flat":[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],"axisMax":50,"haveDays":30,"days":35,"basisDay":"2026-10-23","title":"coin50 涨跌家数（基于 T-1 结算数据）","short":"coin50 涨跌家数","upColor":"#5aa87a","downColor":"#d32f2f","zeroColor":"rgba(200,210,216,0.45)"},"etf":[{"symbol":"BTC","dates":["2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25","2026-09-28","2026-09-29","2026-09-30","2026-10-01","2026-10-02","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23"],"values":[160.0,-450.4,-296.0,159.5,433.0,998.9,714.7,346.9,190.7,134.4,31.1,66.2,-148.7,102.7,189.9,-89.9,118.9,-491.5,-240.8,18.6,-61.9,171.6,-257.4,1.9,-82.7,519.3,52.3,510.8,-635.5,-137.9]},{"symbol":"ETH","dates":["2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25","2026-09-28","2026-09-29","2026-09-30","2026-10-01","2026-10-02","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23"],"values":[121.1,-142.0,-224.1,-39.3,143.8,270.1,162.3,104.6,66.1,87.0,17.1,-2.8,-59.6,-55.4,-37.4,-50.8,-201.9,-160.7,-72.6,-56.1,-85.4,24.8,-129.5,-60.3,-69.7,-103.3,-26.2,14.9,-110.5,4.4]}]};
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
graphics.push({
type: 'text', left: 46, top: LEV_TOP - 20,
style: {
text: '⚖️ 杠杆热度（合约/现货量比 + 基差 · 独立模块，不进温度计 · 只到 T-1 结算日）'
+ (LEV.band ? '  现 ' + (LEV.heat === null ? '-' : LEV.heat.toFixed(1)) + ' · ' + LEV.band : ''),
fill: '#c9d4da', fontSize: 11, fontWeight: 600
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