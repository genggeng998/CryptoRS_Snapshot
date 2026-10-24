
(function () {
var KEY = 'btc_rs_watchlist';
var PREFIX = 'https://www.coinglass.com/tv/zh/Binance_';
var RATING_ORDER = { 'S': 0, 'A': 1, 'B': 2, 'C': 3, 'D': 4 };
var host = document.getElementById('watchlist-items');
var clearButton = document.getElementById('watchlist-clear');
if (!host) { return; }

function toast(text) { if (window.crsToast) { window.crsToast(text, 1000); } }
function ratingOf(ticker) { return window.rsRating ? (window.rsRating(ticker) || '') : ''; }
function colorOf(ticker) { return window.rsRatingColor ? (window.rsRatingColor(ticker) || '') : ''; }

var META;
try {
var metaNode = document.getElementById('symbol-meta-data');
META = metaNode ? (JSON.parse(metaNode.textContent) || {}) : {};
} catch (e) { META = {}; }
var SIG_MAX = 3;                       // 一个币最多显示几个信号，多的收进「+N」
function metaOf(ticker) { return META[ticker] || {}; }
function pctText(value) {              // 0.2312 → 23%（-0.4 以下才给负号，避免出现 -0%）
if (value === null || value === undefined || isNaN(value)) { return null; }
var percent = value * 100;
var rounded = Math.round(percent);
var sign = rounded < 0 ? '-' : '';
var arrow = percent > 0.05 ? '↑' : (percent < -0.05 ? '↓' : '');
var cls = percent > 0.05 ? 'up' : (percent < -0.05 ? 'down' : 'flat');
return { text: sign + Math.abs(rounded) + '%' + arrow, cls: cls, raw: percent };
}
function spikeText(value) {          // 30日爆量倍数：4.3 → 「 4.3X 」，≥10X 用绿色（与热门币种图例同规则）
if (value === null || value === undefined || isNaN(value) || value <= 0) { return null; }
var ratio = Number(value);
return { text: ratio.toFixed(1) + 'X', cls: ratio >= 10 ? 'up' : '', raw: ratio };
}
var META_FIELDS = [
{ key: 'chg24h', className: 'watchlist-chg', render: pctText, title: function (v) { return '24h 涨跌幅 ' + (v > 0 ? '+' : '') + v.toFixed(2) + '%'; } },
{ key: 'spike', className: 'watchlist-spike', render: spikeText, title: function (v) { return '30日爆量 ' + v.toFixed(2) + 'X（当日成交额 ÷ 近 30 日均值）'; } }
];

var SIGNALS = {};
try {
var sigNode = document.getElementById('marquee-data');
var rows = sigNode ? (JSON.parse(sigNode.textContent) || []) : [];
rows.forEach(function (row) {
var coin = String(row.coin || '').toUpperCase();
if (!coin) { return; }
var list = SIGNALS[coin] || (SIGNALS[coin] = []);
var text = (row.label || '') + (row.direction || '');
for (var i = 0; i < list.length; i++) { if (list[i].text === text) { return; } }
list.push({ text: text, tone: row.tone || 'up', time: row.time || '', icon: row.icon || '',
iconText: row.iconText || row.icon || '', label: row.label || '', detail: row.detail || '' });
});
} catch (e) { SIGNALS = {}; }

function read() {
try {
var raw = JSON.parse(localStorage.getItem(KEY) || '[]');
if (!Array.isArray(raw)) { return []; }
return raw.map(function (v) { return String(v == null ? '' : v).trim().toUpperCase(); })
.filter(function (v) { return v; });
} catch (e) { return []; }          // 存了坏字符串也不能把整页搞崩
}

function write(list) {
var unique = [];
for (var i = 0; i < list.length; i++) { if (unique.indexOf(list[i]) < 0) { unique.push(list[i]); } }
try { localStorage.setItem(KEY, JSON.stringify(unique)); } catch (e) { /* 隐私模式/配额满：静默失败 */ }
render();
}

function rank(ticker) {
var r = RATING_ORDER[ratingOf(ticker)];
return r === undefined ? 9 : r;      // 无评级排最后
}
function compare(a, b) {
return rank(a) - rank(b) || a.localeCompare(b);   // 评级降序，同级按币名字母序
}

function render() {
window.dispatchEvent(new Event('crs-watchlist-changed'));
var list = read().sort(compare);
if (clearButton) { clearButton.disabled = !list.length; }
host.textContent = '';
if (!list.length) {
var empty = document.createElement('span');
empty.className = 'watchlist-empty';
empty.textContent = '右键点击币种名称弹出菜单添加自选';
host.appendChild(empty);
return;
}
list.forEach(function (ticker) {
var rating = ratingOf(ticker), color = colorOf(ticker);
var item = document.createElement('span');
item.className = 'watchlist-item';

var star = document.createElement('button');
star.type = 'button';
star.className = 'watchlist-star';
star.textContent = '★';
star.title = '移出自选';
star.addEventListener('click', function () { toggle(ticker); });
item.appendChild(star);

var link = document.createElement('a');
link.className = 'watchlist-name';
link.href = window.crsLinkUrl ? window.crsLinkUrl(ticker)
: PREFIX + encodeURIComponent(ticker) + 'USDT';
link.target = '_blank';
link.rel = 'noopener noreferrer';
link.textContent = ticker;
link.setAttribute('data-coin', ticker);      // 在这里右键同样能加入/移出
link.setAttribute('data-tip-ref', ticker);   // 悬停时借用同类卡片（见 HEAT_TIP_SCRIPT）
if (color) { link.style.color = color; }
item.appendChild(link);
if (window.crsUsStocks && window.crsUsStocks.indexOf(ticker) >= 0 && window.crsUsFlag) {
var flag = document.createElement("span");
flag.className = "watchlist-flag";
flag.title = "美股";
flag.innerHTML = window.crsUsFlag;
item.appendChild(flag);
}

var meta = document.createElement('div');
meta.className = 'watchlist-meta';
META_FIELDS.forEach(function (field) {
var value = metaOf(ticker)[field.key];
if (value === null || value === undefined) { return; }
var shown = field.render(value);
if (!shown) { return; }
var span = document.createElement('span');
span.className = field.className + (shown.cls ? ' ' + shown.cls : '');
span.textContent = shown.text;
if (field.title) { span.title = field.title(shown.raw); }
meta.appendChild(span);
});
var signals = SIGNALS[ticker] || [];
signals.slice(0, SIG_MAX).forEach(function (signal) {
var badge = document.createElement('span');
badge.className = 'watchlist-sig ' + signal.tone;
badge.textContent = signal.text;
badge.title = [(signal.iconText || '').trim(), signal.text, signal.time, signal.detail]
.filter(function (part) { return part; }).join(' · ');
meta.appendChild(badge);
});
if (signals.length > SIG_MAX) {
var more = document.createElement('span');
more.className = 'watchlist-sig-more';
more.textContent = '+' + (signals.length - SIG_MAX);
more.title = signals.map(function (s) { return s.text; }).join(' / ');
meta.appendChild(more);
}
if (meta.childNodes.length) { item.appendChild(meta); }

if (rating) {
var badge = document.createElement('span');
badge.className = 'watchlist-rating';
badge.textContent = '[' + rating + ']';
badge.style.color = color;
item.appendChild(badge);
}

host.appendChild(item);
});
}

function has(ticker) { return read().indexOf(ticker) >= 0; }
function toggle(ticker, notify) {
var list = read(), at = list.indexOf(ticker), added;
if (at >= 0) { list.splice(at, 1); added = false; }
else { list.push(ticker); added = true; }
write(list);
if (notify !== false) { toast(added ? '已加入自选：' + ticker : '已移出自选：' + ticker); }
return added;
}
function clear() {
if (!read().length) { return; }
if (!window.confirm('确定清空所有自选币种？此操作不可撤销。')) { return; }
write([]);
toast('已清空自选');
}

if (clearButton) { clearButton.addEventListener('click', clear); }
window.addEventListener('storage', function (event) {
if (!event.key || event.key === KEY) { render(); }
});

window.watchlist = { key: KEY, has: has, toggle: toggle, clear: clear, render: render,
list: read, add: function (t) { if (!has(t)) { toggle(t); } },
remove: function (t) { if (has(t)) { toggle(t); } } };
render();
})();
(function () {
function decorate(head) {
var card = head.closest ? head.closest('.signal-card') : null;
var note = head.querySelector('span');
var extra = [];
if (card) {
var meta = card.querySelector('.breadth-meta, .us-now-meta');
if (meta && meta !== head) {
var metaText = (meta.textContent || '').trim();
if (metaText) { extra.push(metaText); meta.style.display = 'none'; }
}
}
var next = head.nextElementSibling;
if (next && next.classList
&& (next.classList.contains('breadth-meta') || next.classList.contains('us-now-meta'))) {
var nextText = (next.textContent || '').trim();
if (nextText) { extra.push(nextText); next.style.display = 'none'; }
}
if (!note && !extra.length) { return; }
var parts = [];
if (note) {
var noteText = (note.textContent || '').trim();
if (noteText.length >= 4) { parts.push(noteText); }
note.parentNode.removeChild(note);
}
parts = parts.concat(extra);
if (!parts.length) { return; }
var mark = document.createElement('span');
mark.className = 'card-q';
mark.textContent = '?';
mark.title = parts.join(' ｜ ');
head.appendChild(mark);
}

function refresh() {
Array.prototype.forEach.call(document.querySelectorAll('.signal-card'), function (card) {
if (card.getAttribute('data-head-ready')) { return; }
var buttons = card.querySelector('.tab-buttons');
var head = card.querySelector('h2');
if (!head) { card.setAttribute('data-head-ready', '1'); return; }
if (buttons && head.parentNode !== buttons) {
decorate(head);
buttons.insertBefore(head, buttons.firstChild);
} else if (!buttons && head.parentNode === card) {
head.classList.add('card-head');
decorate(head);
}
card.setAttribute('data-head-ready', '1');
});

Array.prototype.forEach.call(document.querySelectorAll('.tab-buttons'), function (row) {
if (row.getAttribute('data-head-ready')) { return; }
var tabs = row.parentElement;
if (!tabs || !tabs.classList || !tabs.classList.contains('tabs')) { return; }
if (row.classList.contains('grouped')) { return; }   // 主菜单：分组导航，跳过
if (row.querySelector('h2')) { row.setAttribute('data-head-ready', '1'); return; }
var panels = tabs.querySelectorAll(':scope > .tab-panel');
if (panels.length < 2) { return; }
var heads = [];
Array.prototype.forEach.call(panels, function (panel) {
var head = panel.querySelector(':scope > .signal-card > h2');
if (!head) { return; }
head.setAttribute('data-title-for', panel.getAttribute('data-panel') || '');
decorate(head);
row.insertBefore(head, row.firstChild);
heads.push(head);
});
row.setAttribute('data-head-ready', '1');
if (!heads.length) { return; }
function sync() {
heads.forEach(function (head) {
var id = head.getAttribute('data-title-for');
var panel = id ? tabs.querySelector(':scope > .tab-panel[data-panel="' + id + '"]') : null;
head.style.display = (panel && panel.classList.contains('active')) ? '' : 'none';
});
}
document.addEventListener('click', function () { window.setTimeout(sync, 0); }, false);
sync();
});
}

var timer = 0;
function schedule() {
if (timer) { return; }
timer = window.setTimeout(function () { timer = 0; refresh(); }, 60);
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', refresh);
} else {
refresh();
}
if (window.MutationObserver && document.body) {
new MutationObserver(function (records) {
for (var i = 0; i < records.length; i++) {
if (records[i].addedNodes && records[i].addedNodes.length) { schedule(); return; }
}
}).observe(document.body, { childList: true, subtree: true });
}
})();
(function () {
var host = document.getElementById('watchlist-items');
if (!host) { return; }
var down = false, moved = false, startX = 0, startLeft = 0;
function overflow() { return host.scrollWidth - host.clientWidth > 2; }
host.addEventListener('pointerdown', function (event) {
if (event.button !== 0 || !overflow()) { return; }
if (event.target.closest && event.target.closest('a,button')) { return; }
down = true; moved = false; startX = event.clientX; startLeft = host.scrollLeft;
host.classList.add('dragging');
});
host.addEventListener('pointermove', function (event) {
if (!down) { return; }
var dx = event.clientX - startX;
if (Math.abs(dx) > 3) {
moved = true;
host.scrollLeft = startLeft - dx;
event.preventDefault();
}
});
function endDrag() {
if (!down) { return; }
down = false;
host.classList.remove('dragging');
}
host.addEventListener('pointerup', endDrag);
host.addEventListener('pointercancel', endDrag);
window.addEventListener('pointerup', endDrag);
host.addEventListener('click', function (event) {
if (!moved) { return; }
moved = false;
event.preventDefault();
event.stopPropagation();
}, true);
})();