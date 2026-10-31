
(function () {
var body = document.getElementById('hot-watch-body');
if (!body) { return; }
var foot = document.getElementById('hot-watch-foot');
var payload = document.getElementById('tip-index');
var INDEX = null;
if (payload) {
try { INDEX = (JSON.parse(payload.textContent) || {}).coins || null; } catch (e) { INDEX = null; }
}
var KEY = (window.watchlist && window.watchlist.key) || 'btc_rs_watchlist';
var HOT_MIN = 10, WARM_MIN = 6;
var MARKS = {"AAVE":"🚀","MAGMA":"🚀","ZEC":"🚀","BEAMX":"🚀"};

function badgesOf(ticker) {
if (!INDEX || !INDEX[ticker] || !INDEX[ticker].h) { return null; }
var html = window.crsTipBadges ? window.crsTipBadges(ticker) : '';
if (!html) { return null; }
var box = document.createElement('span');
box.innerHTML = html;                  // 页面自己生成的标记，不是用户输入
var list = box.querySelectorAll('.hot-badge');
if (!list.length) { return null; }
var nodes = [];
for (var i = 0; i < box.childNodes.length; i++) { nodes.push(box.childNodes[i]); }
return { count: list.length, nodes: nodes };
}
function read() {
try {
var raw = window.localStorage.getItem(KEY);
var list = raw ? JSON.parse(raw) : [];
return Object.prototype.toString.call(list) === '[object Array]' ? list : [];
} catch (e) { return []; }
}
function cell(tag, className, text) {
var node = document.createElement(tag);
if (className) { node.className = className; }
node.textContent = text;
return node;
}
function emptyRow(text) {
body.textContent = '';
var row = document.createElement('tr');
var box = cell('td', 'empty', text);
box.colSpan = 4;
row.appendChild(box);
body.appendChild(row);
}
function render() {
var watched = read(), rows = [], missing = 0, index;
for (index = 0; index < watched.length; index++) {
var badges = badgesOf(watched[index]);
if (!badges) { missing += 1; continue; }   // 今日没上榜 → 不列进行，只在表下计数
rows.push({ ticker: watched[index], heat: badges.count, badges: badges.nodes });
}
if (!rows.length) {
emptyRow(watched.length
? '自选里的币今日都没有上任何榜单（热度 0）'
: '★ 自选栏为空 —— 右键点击任意币名即可加入自选');
} else {
rows.sort(function (a, b) { return b.heat - a.heat || a.ticker.localeCompare(b.ticker); });
body.textContent = '';
for (index = 0; index < rows.length; index++) {
var row = rows[index], line = document.createElement('tr');
line.setAttribute('data-no-watch-mark', '');
line.appendChild(cell('td', '', (index + 1) + (index < 3 ? ' 🔥' : '')));
var symbol = cell('td', 'symbol', '');
var link = document.createElement('a');
link.className = 'symbol-link';
link.setAttribute('data-coin', row.ticker);
link.setAttribute('data-tip-ref', row.ticker);        // 悬停借同一份卡片
var rating = window.rsRating ? window.rsRating(row.ticker) : '';
if (rating) { link.setAttribute('data-rating', rating); }   // 评级颜色交给 CSS（同主榜）
link.textContent = row.ticker;
symbol.appendChild(link);
if (MARKS[row.ticker]) { symbol.appendChild(document.createTextNode(MARKS[row.ticker])); }
line.appendChild(symbol);
var heat = cell('td', row.heat >= HOT_MIN ? 'up' : (row.heat >= WARM_MIN ? 'warn' : ''), '');
heat.appendChild(cell('b', '', row.heat));
line.appendChild(heat);
var modules = cell('td', 'hot-modules', '');
for (var k = 0; k < row.badges.length; k++) { modules.appendChild(row.badges[k]); }
line.appendChild(modules);
body.appendChild(line);
}
if (window.crsFixLinks) { window.crsFixLinks(body); }
}
if (foot) {
foot.textContent = missing ? (missing + ' 个自选今日未上榜（热度 0，不列出）') : '';
foot.hidden = !missing;
}
}
window.addEventListener('crs-watchlist-changed', render);
window.addEventListener('storage', function (event) {
if (!event.key || event.key === KEY) { render(); }
});
render();
})();