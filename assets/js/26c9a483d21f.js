
(function () {
var PREFIX = 'https://www.coinglass.com/tv/zh/Binance_';
var ICONS = { macro: '\u{1F4C5}', industry: '\u{1F3DB}\u{FE0F}' };

function el(tag, cls, text) {
var node = document.createElement(tag);
if (cls) { node.className = cls; }
if (text !== undefined && text !== null) { node.textContent = text; }
return node;
}
function tipLines(kind, event) {
if (kind === 'industry') {
var news = event.news || [];
if (news.length) { return news.slice(); }
return ['该币暂未匹配到新闻（新闻池按 UTC 日缓存，稍后重试可能更新）', event.title];
}
var lines = [event.title].concat((event.details || []).map(function (pair) {
return pair[0] + '：' + pair[1];
}));
if ((event.coins || []).length) { lines.push('关联币种：' + event.coins.join('、')); }
return lines;
}

var TIP = null;
var TIP_LINES = (typeof WeakMap === 'function') ? new WeakMap() : null;
function tipNode() {
if (!TIP) {
TIP = el('div', 'event-tip');
TIP.hidden = true;
document.body.appendChild(TIP);
}
return TIP;
}
function hideTip() { if (TIP) { TIP.hidden = true; } }
function showTip(host) {
var lines = TIP_LINES ? TIP_LINES.get(host) : null;
if (!lines || !lines.length) { return; }
var node = tipNode();
node.innerHTML = '';
for (var i = 0; i < lines.length; i++) { node.appendChild(el('div', 'event-tip-line', lines[i])); }
node.style.left = '0px';
node.style.top = '0px';
node.hidden = false;
var box = host.getBoundingClientRect();
var width = node.offsetWidth;
var height = node.offsetHeight;
var gap = 10;
var edge = 8;
var left = Math.min(Math.max(edge, box.left), Math.max(edge, window.innerWidth - width - edge));
var top = box.bottom + gap;
if (top + height > window.innerHeight - edge) { top = Math.max(edge, box.top - height - gap); }
node.style.left = Math.round(left) + 'px';
node.style.top = Math.round(top) + 'px';
}

var BARS = {};
var MODAL = document.getElementById('event-modal');

function dayLabel(event) {
var text = String(event.local || '');
var match = text.match(/^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2})/);
return match ? match[1] : text.slice(0, 5);
}
function timeLabel(event) {
var text = String(event.local || '');
var match = text.match(/(\d{2}:\d{2})$/);
return match ? match[1] : text;
}
function whenLabel(event) {
return dayLabel(event) + ' ' + timeLabel(event);
}

var CURRENT_KIND = '';
function viewOf(bar) { return bar.view === 'history' ? 'history' : 'current'; }
function listOf(data, view) { return view === 'history' ? (data.history || []) : (data.events || []); }
function historyDays(data) { return data.historyDays || 30; }

function syncViewButton(kind) {
var btn = document.getElementById('event-modal-view');
var bar = BARS[kind];
if (!btn || !bar) { return; }
var history = viewOf(bar) === 'history';
btn.textContent = history ? '查看当前' : '历史回顾';
btn.setAttribute('title', history
? '切回「当前 + 未来 ' + bar.data.daysAhead + ' 天」'
: '切到「过去 ' + historyDays(bar.data) + ' 天」的历史回顾');
}

var POOL = {};
try {
var metaNode = document.getElementById('symbol-meta-data');
var metaAll = metaNode ? (JSON.parse(metaNode.textContent) || {}) : {};
Object.keys(metaAll).forEach(function (key) { POOL[String(key).toUpperCase()] = 1; });
} catch (e) { POOL = {}; }

function renderModal(kind) {
var bar = BARS[kind];
if (!MODAL || !bar) { return; }
var data = bar.data;
var view = viewOf(bar);
var events = listOf(data, view);
document.getElementById('event-modal-title').textContent =
(ICONS[kind] || '') + ' ' + data.title + '（' + data.source + '）';
document.getElementById('event-modal-sub').textContent = view === 'history'
? '过去 ' + historyDays(data) + ' 天 · 共 ' + events.length + ' 条'
+ (data.refreshedAt ? ' · 刷新时间 ' + data.refreshedAt : '')
: '未来 ' + data.daysAhead + ' 天 · 共 ' + events.length + ' 条'
+ (data.note ? ' · ' + data.note : '')
+ (data.refreshedAt ? ' · 刷新时间 ' + data.refreshedAt : '');
var body = document.getElementById('event-modal-body');
body.innerHTML = '';
if (!data.available) {
body.appendChild(el('div', 'event-modal-empty', data.unavailableText + (data.note ? '：' + data.note : '')));
} else if (!events.length) {
body.appendChild(el('div', 'event-modal-empty', view === 'history'
? '过去 ' + historyDays(data) + ' 天内没有历史事件' + (data.historyEmptyNote || '')
: '未来 ' + data.daysAhead + ' 天内没有符合条件的重大事件'));
} else {
events.forEach(function (event) {
var row = el('div', 'event-row');
row.appendChild(el('span', 'event-when', whenLabel(event)));
var dot = el('span', 'event-dot');
dot.style.background = event.color;
row.appendChild(dot);
var main = el('div', 'event-main');
var nameNode = el(event.link ? 'a' : 'span', 'event-name', event.title);
if (event.link) {
nameNode.href = event.link;
nameNode.target = '_blank';
nameNode.rel = 'noopener noreferrer';
}
main.appendChild(nameNode);
var meta = el('div', 'event-meta');
meta.textContent = (event.details || []).map(function (pair) {
return pair[0] + ' ' + pair[1];
}).join(' · ');
main.appendChild(meta);
if (event.coinHtml) {
var coinsHtml = el('div', 'event-coins');
coinsHtml.innerHTML = event.coinHtml;
var anchors = coinsHtml.querySelectorAll('a.symbol-link[data-coin]');
for (var ai = 0; ai < anchors.length; ai++) {
anchors[ai].setAttribute('data-tip-ref', anchors[ai].getAttribute('data-coin'));
}
main.appendChild(coinsHtml);
} else if ((event.coins || []).length) {
var coinsPlain = el('div', 'event-coins');
event.coins.forEach(function (coin) {
if (!POOL[String(coin).toUpperCase()]) {
coinsPlain.appendChild(el('span', 'event-coin', coin));
return;
}
var link = el('a', 'event-coin', coin);
link.href = window.crsLinkUrl ? window.crsLinkUrl(coin)
: PREFIX + encodeURIComponent(coin) + 'USDT';
link.target = '_blank';
link.rel = 'noopener noreferrer';
coinsPlain.appendChild(link);
});
main.appendChild(coinsPlain);
}
if (event.signalHtml) {
var signalBox = el('div', 'event-signal');
signalBox.innerHTML = event.signalHtml;
main.appendChild(signalBox);
}
row.appendChild(main);
body.appendChild(row);
});
}
if (window.crsFixLinks) { window.crsFixLinks(body); }
if (window.crsWatchMarks) { window.crsWatchMarks(); }
syncViewButton(kind);
}

function openModal(kind) {
var bar = BARS[kind];
if (!MODAL || !bar) { return; }
CURRENT_KIND = kind;
bar.view = viewOf(bar);                   // 每个面板各自独立记状态（互不影响）
renderModal(kind);
MODAL.hidden = false;
document.body.style.overflow = 'hidden';
hideTip();
}

function closeModal() {
if (!MODAL) { return; }
MODAL.hidden = true;
document.body.style.overflow = '';
}
if (MODAL) {
MODAL.addEventListener('click', function (event) {
if (event.target && event.target.getAttribute && event.target.getAttribute('data-event-close') === '1') {
closeModal();
}
});
document.addEventListener('keydown', function (event) {
if (event.key === 'Escape') { closeModal(); }
});
var viewButton = document.getElementById('event-modal-view');
if (viewButton) {
viewButton.addEventListener('click', function () {
if (!CURRENT_KIND || !BARS[CURRENT_KIND]) { return; }
var bar = BARS[CURRENT_KIND];
bar.view = viewOf(bar) === 'history' ? 'current' : 'history';
renderModal(CURRENT_KIND);
});
}
}

function eventUrl(event) {
if (event.link) { return event.link; }
var coins = event.coins || [];
if (!coins.length) { return ''; }
return window.crsLinkUrl ? window.crsLinkUrl(coins[0])
: PREFIX + encodeURIComponent(coins[0]) + 'USDT';
}
function capsule(kind, event) {
var coinHtml = (kind === 'industry' && event.coinHtml) ? event.coinHtml : '';
var node = el(coinHtml ? 'span' : 'button', 'event-capsule');
if (coinHtml) {
node.setAttribute('role', 'link');
var jump = eventUrl(event);
if (jump) { node.setAttribute('data-jump', jump); }
} else {
node.type = 'button';
}
var lines = tipLines(kind, event);
if (TIP_LINES) { TIP_LINES.set(node, lines); }
node.setAttribute('aria-label', event.title);
node.addEventListener('mouseenter', function () { showTip(node); });
node.addEventListener('mouseleave', hideTip);
node.setAttribute('data-title', event.title);
var ico = el('span', 'event-ico', ICONS[kind] || '');
node.appendChild(ico);
node.appendChild(el('span', 'event-when', event.date));
if (coinHtml) {
var coins = el('span', 'event-capsule-coins');
coins.innerHTML = coinHtml;
var anchors = coins.querySelectorAll('a');
for (var i = 0; i < anchors.length; i++) { anchors[i].draggable = false; }
node.appendChild(coins);
} else {
node.appendChild(el('span', 'event-name', event.title));
}
var dot = el('span', 'event-dot');
dot.style.background = event.color;
node.appendChild(dot);
if (coinHtml) {
node.addEventListener('click', function (e) {
if (e.target && e.target.closest && e.target.closest('a')) { return; }
var url = node.getAttribute('data-jump');
if (url) { window.open(url, '_blank', 'noopener'); }
});
} else {
node.addEventListener('click', function () { openModal(kind); });
}
return node;
}

function build(kind) {
var bar = document.getElementById('event-bar-' + kind);
var node = document.getElementById('event-data-' + kind);
if (!bar || !node) { return; }
var data;
try { data = JSON.parse(node.textContent); } catch (e) { return; }
BARS[kind] = { bar: bar, data: data };
var scroll = bar.querySelector('.event-scroll');
scroll.innerHTML = '';
var soon = data.events || [];
if (!data.available) {
var off = el('span', 'event-empty', data.unavailableText);
if (data.note) { off.setAttribute('title', data.note); }
scroll.appendChild(off);
} else if (!soon.length) {
var hint = el('button', 'event-empty', data.emptyText + '（看 ' + data.daysAhead + ' 天全部）');
hint.setAttribute('title', '点开看未来 ' + data.daysAhead + ' 天的完整事件列表');
hint.type = 'button';
hint.addEventListener('click', function () { openModal(kind); });
scroll.appendChild(hint);
} else {
soon.forEach(function (event) { scroll.appendChild(capsule(kind, event)); });
}
if (window.crsFixLinks) { window.crsFixLinks(scroll); }
if (window.crsWatchMarks) { window.crsWatchMarks(); }
sync(kind);
}

function sync(kind) {
var item = BARS[kind];
if (!item) { return; }
var scroll = item.bar.querySelector('.event-scroll');
var over = scroll.scrollWidth > scroll.clientWidth + 1;
item.bar.classList.toggle('scrollable', over && item.data.available);
}

['macro', 'industry'].forEach(function (kind) {
var bar = document.getElementById('event-bar-' + kind);
if (!bar) { return; }
var head = bar.querySelector('.event-bar-title');
if (head) { head.addEventListener('click', function () { openModal(kind); }); }
var scroll = bar.querySelector('.event-scroll');
bar.querySelectorAll('.event-nav').forEach(function (button) {
button.addEventListener('click', function () {
var dir = parseInt(button.getAttribute('data-dir') || '1', 10);
var step = Math.max(140, scroll.clientWidth - 60);
var start = scroll.scrollLeft;
hideTip();
var target = Math.max(0, Math.min(scroll.scrollWidth - scroll.clientWidth, start + dir * step));
try { scroll.scrollTo({ left: target, behavior: 'smooth' }); } catch (e) { scroll.scrollLeft = target; }
setTimeout(function () {
if (Math.abs(scroll.scrollLeft - start) < 2 && Math.abs(target - start) > 2) {
scroll.scrollLeft = target;
}
}, 200);
});
});
scroll.addEventListener('wheel', function (event) {
if (scroll.scrollWidth <= scroll.clientWidth + 1) { return; }
var delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
if (!delta) { return; }
event.preventDefault();
hideTip();
scroll.scrollLeft += delta;
}, { passive: false });
var drag = null;
var DRAG_THRESHOLD = 6;
var swallowClick = false;   // 真拖过之后吞掉紧随其后的那一次 click（免得把拖拽当成点了币名）
scroll.addEventListener('click', function (event) {
if (!swallowClick) { return; }
swallowClick = false;
event.preventDefault();
event.stopPropagation();
}, true);
scroll.addEventListener('pointerdown', function (event) {
if (event.pointerType !== 'mouse' || scroll.scrollWidth <= scroll.clientWidth + 1) { return; }
drag = { x: event.clientX, left: scroll.scrollLeft, id: event.pointerId, moved: false };
hideTip();
});
scroll.addEventListener('pointermove', function (event) {
if (!drag || event.pointerType !== 'mouse') { return; }
var moved = event.clientX - drag.x;
if (!drag.moved) {
if (Math.abs(moved) < DRAG_THRESHOLD) { return; }
drag.moved = true;
scroll.classList.add('dragging');
try { scroll.setPointerCapture(drag.id); } catch (e) { /* 忽略 */ }
}
event.preventDefault();
scroll.scrollLeft = drag.left - moved;
});
function endDrag() {
if (!drag) { return; }
if (drag.moved) {
swallowClick = true;
setTimeout(function () { swallowClick = false; }, 400);
}
drag = null;
scroll.classList.remove('dragging');
}
scroll.addEventListener('pointerup', endDrag);
scroll.addEventListener('pointercancel', endDrag);
scroll.addEventListener('pointerleave', endDrag);
bar.addEventListener('click', function (event) {
if (event.target !== scroll) { return; }      // 正常点击：交给币名自己的链接 / 胶囊处理器
var hit = document.elementFromPoint(event.clientX, event.clientY);
var anchor = hit && hit.closest ? hit.closest('a.symbol-link') : null;
if (anchor && anchor.href) { window.open(anchor.href, '_blank', 'noopener'); return; }
var cap = hit && hit.closest ? hit.closest('.event-capsule') : null;
var url = cap ? cap.getAttribute('data-jump') : '';
if (url) { window.open(url, '_blank', 'noopener'); }
});
crsCharts.onResize(function () { sync(kind); });
});

function run() { build('macro'); build('industry'); }
window.addEventListener('scroll', hideTip, true);
crsCharts.onResize(hideTip);
document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { hideTip(); } });
if (document.readyState === 'complete') { run(); } else { window.addEventListener('load', run); }
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(run); }
})();