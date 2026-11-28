
(function () {
var SCOPES = ['#watchlist-items', '.tab-panel[data-panel="hot"]', '.tab-panel[data-panel="vol-growth"]',
'.tab-panel[data-panel="turnover"]', '.tab-panel[data-panel="movers"]'];
var MARK_CLASS = 'event-coin-mark';
var DAYS = 0;
function buildMap() {
var host = document.getElementById('event-data-industry');
if (!host) { return {}; }
var data = {};
try { data = JSON.parse(host.textContent || '{}'); } catch (e) { return {}; }
DAYS = Number(data.daysAhead) || 0;
var items = [].concat(data.events || [], data.items || []);  // ⚠️ 2026-10-15 第 112 轮bg（PC bug②）：不再并 data.history —— 🏛️ 这枚标的意思是「未来 N 天有行业事件」，历史事件不该给币名打标
var map = {};
items.forEach(function (item) {
var day = String(item.local || item.when_local || item.day || '').slice(0, 5);
var title = String(item.title || '').trim();
var line = day + (title ? ' ' + title : '');
var symbols = item.coins || [];
var names = item.coin_names || [];
symbols.forEach(function (coin, index) {
[coin, names[index]].forEach(function (raw) {
var key = String(raw || '').toUpperCase();
if (!key) { return; }
var list = map[key] || (map[key] = []);
if (list.length < 3 && list.indexOf(line) < 0) { list.push(line); }
});
});
});
return map;
}
function mark(link, lines) {
if (link.getAttribute('data-crs-event-mark')) { return; }
link.setAttribute('data-crs-event-mark', '1');
var anchor = link;
var sibling = link.nextElementSibling;
while (sibling && sibling.classList && sibling.classList.contains('coin50-mark')) {
anchor = sibling;
sibling = sibling.nextElementSibling;
}
var node = document.createElement('span');
node.className = MARK_CLASS;
node.textContent = '🏛️';            // 注意：emoji 必须写字面字符（用两个 \u 转义写在 Python 字符串里会变成孤立代理，落盘直接报错）
node.title = '未来 ' + (DAYS || 28) + ' 天有行业事件：' + lines.join('\uFF1B');
anchor.insertAdjacentElement('afterend', node);  // 放在链接**外面**：点币名照旧只跳图表
}
function apply(root) {
var host = root || document;
var map = buildMap();
var keys = Object.keys(map);
if (!keys.length) { return 0; }
var hits = 0;
SCOPES.forEach(function (selector) {
Array.prototype.forEach.call(host.querySelectorAll(selector), function (box) {
Array.prototype.forEach.call(box.querySelectorAll('a[data-coin]'), function (link) {
var lines = map[String(link.getAttribute('data-coin') || '').toUpperCase()];
if (!lines) { return; }
mark(link, lines);
hits += 1;
});
});
});
return hits;
}
window.crsEventMarks = apply;              // 自选栏重建后手工再跑一次也安全（幂等）
function run() { try { apply(document); } catch (e) {} }
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', run); }
else { run(); }
window.addEventListener('load', run);
document.addEventListener('crs-watchlist-changed', run);
var timer = null;
new MutationObserver(function () {
if (timer) { return; }
timer = window.setTimeout(function () { timer = null; run(); }, 250);
}).observe(document.body, { childList: true, subtree: true });
})();