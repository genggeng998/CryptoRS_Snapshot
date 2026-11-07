
(function () {
var SLOTS = [
{ slot: 1, key: 'crs-chart-url',   label: '看盘地址'  },
{ slot: 2, key: 'crs-chart-url-2', label: '看盘地址2' },
{ slot: 3, key: 'crs-chart-url-3', label: '看盘地址3' }
];
var KEY = SLOTS[0].key;
var DEFAULT = 'https://www.coinglass.com/tv/zh/Binance_{coin}USDT';
function readKey(key) {
try { return window.localStorage.getItem(key) || ''; } catch (e) { return ''; }
}
function stored(slot) {
var index = slot || 1;
return index >= 1 && index <= SLOTS.length ? readKey(SLOTS[index - 1].key) : '';
}
function template(slot) {
var index = slot || 1;
var value = stored(index);
if (value) { return value; }
return index === 1 ? DEFAULT : '';
}
window.crsChartUrl = function (coin, slot) {
var text = template(slot);
if (!text) { return ''; }
var name = encodeURIComponent(coin);
return text.indexOf('{coin}') >= 0 ? text.replace('{coin}', name) : text + name;
};
window.crsChartTemplate = template;
window.crsChartDefault = DEFAULT;
window.crsChartSlots = function () {
var out = [];
for (var i = 0; i < SLOTS.length; i++) {
out.push({
slot: SLOTS[i].slot,
label: SLOTS[i].label,
template: template(SLOTS[i].slot),
custom: !!stored(SLOTS[i].slot)
});
}
return out;
};

var BUTTON = document.getElementById('chart-url-btn');
var MODAL = document.getElementById('chart-url-modal');
if (!BUTTON || !MODAL) { return; }
var NOTE = document.getElementById('chart-url-note');
var INPUTS = [];
for (var k = 0; k < SLOTS.length; k++) {
INPUTS.push(document.getElementById('chart-url-input' + (k === 0 ? '' : '-' + SLOTS[k].slot)));
}
function say(text, ok) {
if (!NOTE) { return; }
NOTE.textContent = text || '';
NOTE.className = ok ? 'cu-note ok' : 'cu-note bad';
}
function open() {
for (var i = 0; i < SLOTS.length; i++) {
if (INPUTS[i]) { INPUTS[i].value = template(SLOTS[i].slot); }
}
say('第 1 条留空 = 用默认 CoinGlass；第 2 / 3 条留空 = 右键菜单里不显示。', true);
MODAL.hidden = false;
if (INPUTS[0]) {
INPUTS[0].focus();
try { INPUTS[0].select(); } catch (e) { /* 忽略 */ }
}
}
function close() { MODAL.hidden = true; }
function check(value) {
if (value.indexOf('{coin}') < 0) { return '必须包含 {coin}（会被换成币种名）'; }
var lower = value.toLowerCase();
if (lower.indexOf('http://') !== 0 && lower.indexOf('https://') !== 0) {
return '要以 http:// 或 https:// 开头';
}
return '';
}
function save() {
var values = [], errors = [];
for (var i = 0; i < SLOTS.length; i++) {
var raw = INPUTS[i] ? (INPUTS[i].value || '').trim() : '';
var problem = raw ? check(raw) : '';
if (problem) { errors.push(SLOTS[i].label + ' ' + problem); }
values.push(raw);
}
if (errors.length) { say(errors.join('；'), false); return; }
for (var j = 0; j < SLOTS.length; j++) {
try {
if (values[j]) { window.localStorage.setItem(SLOTS[j].key, values[j]); }
else { window.localStorage.removeItem(SLOTS[j].key); }
} catch (e) { /* 隐私模式 / 配额满：静默失败 */ }
}
applyAll();
var extra = (values[1] ? '「看盘地址2」' : '') + (values[2] ? '「看盘地址3」' : '');
say(extra ? '已保存 —— 右键菜单里多了 ' + extra + '。' : '已保存 —— 右键菜单只有「看盘地址」。', true);
}
function reset() {
for (var i = 0; i < SLOTS.length; i++) {
try { window.localStorage.removeItem(SLOTS[i].key); } catch (e) { /* 忽略 */ }
if (INPUTS[i]) { INPUTS[i].value = i === 0 ? DEFAULT : ''; }
}
applyAll();
say('已恢复默认（第 1 条 = CoinGlass，第 2 / 3 条已清空）。', true);
}
function applyAll() {
if (window.crsFixLinks) { window.crsFixLinks(document, true); }
}
BUTTON.addEventListener('click', function (event) {
event.preventDefault();
open();
});
MODAL.addEventListener('click', function (event) {
var action = event.target && event.target.getAttribute ? event.target.getAttribute('data-cu') : '';
if (action === 'save') { save(); }
else if (action === 'reset') { reset(); }
else if (action === 'close' || event.target === MODAL) { close(); }
});
document.addEventListener('keydown', function (event) {
if (event.key === 'Escape' && !MODAL.hidden) { close(); }
});
})();