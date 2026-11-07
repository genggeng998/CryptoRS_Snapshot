
(function () {
var PAYLOAD = null;
try { PAYLOAD = JSON.parse(document.getElementById('tip-index').textContent); } catch (e) { PAYLOAD = null; }
var INDEX = (PAYLOAD && PAYLOAD.coins) || null;
var META = (PAYLOAD && PAYLOAD.meta) || {};
var SRC = META.src || 0;          // 位图：1=RS_Maps 2=24H Vol 4=所属板块 8=热度模块
function esc(text) {
return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function pct(value) {
var rounded = Math.round(value);
return (rounded > 0 ? '+' : '') + rounded + '%';
}
function fmtVol(value) {
if (value === null || value === undefined) { return '-'; }
var amount = Math.abs(value);
if (amount >= 1e9) { return '$' + (amount / 1e9).toFixed(2) + 'B'; }
if (amount >= 1e6) { return '$' + (amount / 1e6).toFixed(2) + 'M'; }
if (amount >= 1e3) { return '$' + (amount / 1e3).toFixed(2) + 'K'; }
return '$' + amount.toFixed(0);
}
function sectorHtml(ticker) {
if (!(SRC & 4)) { return undefined; }
var data = INDEX ? INDEX[ticker] : null;
if (!data || !data.sec || !data.sec.length) { return '<em class="heat-tip-none">不在板块名单</em>'; }
var names = META.sectors || [];
return data.sec.map(function (item) {
var label = names[item[0]] || '';
return '<span class="heat-tip-sector">' + esc(label)
+ '<b class="' + (item[1] >= 0 ? 'up' : 'down') + '">' + pct(item[1]) + '</b></span>';
}).join('');
}
function tagHtml(ticker) {
var data = INDEX ? INDEX[ticker] : null;
if (!data || !data.tag) { return ''; }
var text = data.tag;
if (typeof text !== 'string') {
var pool = META.tagPool || [];
var pieces = [];
for (var i = 0; i < text.length; i++) { pieces.push(pool[text[i]] || ''); }
text = pieces.join(' · ');
}
return '<span class="heat-tip-tag">' + esc(text) + '</span>';
}
function badgeHtml(ticker) {
if (!(SRC & 8)) { return ''; }
var data = INDEX ? INDEX[ticker] : null;
if (!data || !data.h) { return ''; }
var labels = META.labels || [], icons = META.icons || [], links = META.labelIcons || [];
var groups = META.groups || [];
var out = [], previous = null;
data.h.forEach(function (item) {
var label = labels[item[0]] || '';
var group = groups[item[0]];
if (previous !== null && group !== previous) {
out.push('<span class="hot-sep" aria-hidden="true"></span>');
}
previous = group;
var icon = icons[links[item[0]]] || label;
var inner = item[1], accent = item[2];
var body = inner ? (accent ? '<span class="' + accent + '">' + esc(inner) + '</span>' : esc(inner)) : '';
out.push('<span class="hot-badge" title="' + esc(label) + '">'
+ (inner ? icon + '(' + body + ')' : icon) + '</span>');
});
return out.join('');
}
function c50Html(ticker) {
var data = INDEX ? INDEX[ticker] : null;
return (data && data.c50 && META.c50mark) ? META.c50mark : '';
}
function offChartReason(ticker) {
var data = INDEX ? INDEX[ticker] : null;
if (!data) { return ''; }
var gate = META.volGate;
if (data.v === undefined) {
return '<span class="heat-tip-sub">原因：不在可交易名单里（拿不到 24H 成交额）</span>';
}
if (gate && data.v < gate) {
return '<span class="heat-tip-sub">原因：24H 成交额 ' + fmtVol(data.v)
+ ' 未达门槛 ' + fmtVol(gate) + '（RS_Maps 池 = 广度池）</span>';
}
return '<span class="heat-tip-sub">原因：不在今天的四象限图计算范围内'
+ '（K 线不足 180 根 / 数据停更）</span>';
}
function lastQuadHint(ticker) {
var data = INDEX ? INDEX[ticker] : null;
if (!data || !data.p || !window.rsLastQuad) { return ''; }
var quad = window.rsLastQuad(ticker);
if (!quad) { return ''; }
var when = window.rsPeriodText ? window.rsPeriodText(data.p) : '';
return '<span class="heat-tip-sub">最近一次：<b class="heat-tip-quad">' + esc(quad) + '</b>'
+ (when ? ' · ' + when : '') + '</span>';
}
function volGateText() {
return META.volGate ? '（24H 成交额 &lt; ' + fmtVol(META.volGate) + '）' : '';
}
function rows(ticker) {
var data = INDEX ? INDEX[ticker] : null;
if (!data) { return ''; }
var out = '';
var tag = tagHtml(ticker);
var c50 = c50Html(ticker);
if (tag || c50) {
var nameColor = '';
try { nameColor = window.rsRatingColor ? (window.rsRatingColor(ticker) || '') : ''; }
catch (e) { nameColor = ''; }
out += '<div class="heat-tip-head"><b'
+ (nameColor ? ' style="color:' + nameColor + '"' : '')
+ '>' + esc(ticker) + c50 + tag + '</b></div>';
}
if (SRC & 1) {
out += '<div class="heat-tip-row"><span class="heat-tip-label">RS_Maps</span>'
+ (data.q
? '<b class="heat-tip-quad">' + esc(data.q[0]) + '</b><span class="heat-tip-value">('
+ pct(data.q[1]) + ', ' + pct(data.q[2]) + ')</span>'
: '<em class="heat-tip-none">今日未上四象限图</em>'
+ offChartReason(ticker) + lastQuadHint(ticker))
+ '</div>';
}
if (SRC & 2) {
out += '<div class="heat-tip-row"><span class="heat-tip-label">24H Vol</span>'
+ (data.v === undefined
? '<em class="heat-tip-none">未进池' + volGateText() + '</em>'
: '<span class="heat-tip-value">' + fmtVol(data.v) + '</span>')
+ '</div>';
}
var sec = sectorHtml(ticker);
if (sec !== undefined) {
out += '<div class="heat-tip-row"><span class="heat-tip-label">所属板块</span>' + sec + '</div>';
}
if (SRC & 8) {
out += '<div class="heat-tip-row"><span class="heat-tip-label">热度模块</span>'
+ (badgeHtml(ticker) || '<em class="heat-tip-none">未上热门榜</em>') + '</div>';
}
return out;
}
function badges(ticker) { return badgeHtml(ticker); }
function hasSeq(ticker) {
var data = INDEX ? INDEX[ticker] : null;
return !!(data && data.s);
}
function signalLines(ticker) {
var data = INDEX ? INDEX[ticker] : null;
return (data && data.g) ? data.g : null;
}
function signalRowHtml(ticker) {
var lines = signalLines(ticker);
if (!lines || !lines.length) { return ''; }
var inner = '';
for (var i = 0; i < lines.length; i++) {
inner += '<span>' + String(lines[i]).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>';
}
return '<div class="heat-tip-row"><span class="heat-tip-label">近30日异动</span>'
+ '<div class="heat-tip-seq heat-tip-signal">' + inner + '</div></div>';
}
window.crsTipBadges = badges;    // 🗺️ RS_Maps 方块的悬停卡片要同一份热度徽章
window.crsTipSector = sectorHtml;  // 🗺️ RS_Maps 方块卡片要同一份「所属板块」内容
window.crsCoin50 = c50Html;        // 💰 同上：方块卡片的币名后也要那个 coin50 小角标
window.crsTipTag = tagHtml;      // 🗺️ RS_Maps 头部币名后面那行小字（同一份简介标签）
function coinOf(host) {
var link = host ? host.querySelector('a.symbol-link[data-coin]') : null;
return link ? link.getAttribute('data-coin') : '';
}
function fill(tip) {
if (tip.firstChild) { return; }
var ticker = coinOf(tip.parentElement);
if (ticker) { tip.innerHTML = rows(ticker); }
}
function bindTips(root) {
var list = (root || document).querySelectorAll('.heat-tip');
for (var i = 0; i < list.length; i++) {
(function (tip) {
var host = tip.parentElement;
if (!host || host.dataset.crsTipBound === '1') { return; }
host.dataset.crsTipBound = '1';
host.addEventListener('mouseenter', function () { fill(tip); ensureSeq(tip); ensureSignal(tip); show(tip, host); });
host.addEventListener('mouseleave', function () { tip.hidden = true; });
window.addEventListener('scroll', function () { tip.hidden = true; }, true);
})(list[i]);
}
}
window.crsBindTips = bindTips;
function tipLeftOf(box, width) {
var gap = 10, edge = 8;
var limit = window.innerWidth - width - edge;
var right = box.right + gap;                       // 币名右边：不遮挡币名，也不再压住左列/上一行
if (right <= limit) { return right; }
var leftSide = box.left - width - gap;             // 右侧顶到屏幕就改放左边
if (leftSide >= edge) { return leftSide; }
return Math.min(Math.max(edge, box.left), limit);  // 兜底：完全放不下时才用原规则
}
window.crsTipLeft = tipLeftOf;
function anchorOf(host) {
var link = host.querySelector ? host.querySelector('a.symbol-link[data-coin]') : null;
return link ? link.getBoundingClientRect() : host.getBoundingClientRect();
}
var tips = document.querySelectorAll('.heat-tip');
if (!tips.length) { return; }
function show(tip, host) {
var box = anchorOf(host);
tip.hidden = false;
var width = tip.offsetWidth, height = tip.offsetHeight;
var top = box.top - height - 8;
if (top < 8) { top = Math.min(box.bottom + 8, window.innerHeight - height - 8); }
tip.style.left = tipLeftOf(box, width) + 'px';
tip.style.top = Math.max(8, top) + 'px';
}
function ensureSeq(tip) {
var ticker = coinOf(tip.parentElement);
if (!ticker || !hasSeq(ticker) || tip.querySelector('.heat-tip-seq')) { return; }
var inner = window.rsSeqInner ? window.rsSeqInner(ticker) : '';
var row = document.createElement('div');
row.className = 'heat-tip-row';
row.innerHTML = '<span class="heat-tip-label">近30天历程</span><div class="heat-tip-seq">'
+ (inner || '<span class="heat-tip-none">数据累积中</span>') + '</div>';
tip.appendChild(row);
}
function ensureSignal(tip) {
if (tip.querySelector('.heat-tip-signal')) { return; }
var ticker = coinOf(tip.parentElement);
if (!ticker) { return; }
var html = signalRowHtml(ticker);
if (!html) { return; }
var row = document.createElement('div');
row.innerHTML = html;
tip.appendChild(row.firstChild);
}
bindTips(document);        // 加载时就把页面上所有内联空壳挂上（分格逐挂，见 bindTips）

var borrowed = null;
function recycle() { if (borrowed) { borrowed.remove(); borrowed = null; } }
function borrow(ticker) {
var links = document.querySelectorAll('a.symbol-link[data-coin="' + ticker + '"]');
for (var i = 0; i < links.length; i++) {
var cell = links[i].parentElement;
if (!cell || !cell.getClientRects().length) { continue; }
var node = cell.querySelector('.heat-tip');
if (!node) { continue; }
fill(node);                // 卡片是空壳，借之前先把内容拼出来
if (node.innerHTML) { return node; }
}
var html = window.rsMapTip ? window.rsMapTip(ticker) : '';
var fromTile = !!html;
if (!html) {
html = window.crsTipRows ? window.crsTipRows(ticker) : '';
}
if (!html) {
var seq = window.rsSeqInner ? window.rsSeqInner(ticker) : '';
var signal = signalRowHtml(ticker);
if (!seq && !signal) { return null; }
html = (seq
? '<div class="heat-tip-row"><span class="heat-tip-label">近30天历程</span>'
+ '<div class="heat-tip-seq">' + seq + '</div></div>'
: '') + signal;
} else if (!fromTile) {
var inner = window.rsSeqInner ? window.rsSeqInner(ticker) : '';
if (inner) {
html += '<div class="heat-tip-row"><span class="heat-tip-label">近30天历程</span>'
+ '<div class="heat-tip-seq">' + inner + '</div></div>';
}
html += signalRowHtml(ticker);          // 📈 近30日异动（同一张卡片里紧跟历程之后）
}
if (html && html.indexOf('heat-tip-signal') < 0) { html += signalRowHtml(ticker); }
recycle();
borrowed = document.createElement('div');
borrowed.className = 'heat-tip borrowed';
borrowed.innerHTML = html;
document.body.appendChild(borrowed);             // 卡片是 position:fixed，挂 body 上不会被裁
return borrowed;
}
var refActive = null, refNode = null;
function closeRef() {
if (refNode) { refNode.hidden = true; }
refNode = null;
refActive = null;
recycle();                       // 借来的临时卡片用完即删（DOM 里原有的卡片不动）
}
function refOf(event) {
return event.target && event.target.closest ? event.target.closest('[data-tip-ref]') : null;
}
document.addEventListener('mouseover', function (event) {
var ref = refOf(event);
if (!ref || ref === refActive) { return; }
closeRef();
refNode = borrow(ref.getAttribute('data-tip-ref'));
if (!refNode) { return; }
refActive = ref;
if (!refNode.classList.contains('borrowed')) { ensureSeq(refNode); ensureSignal(refNode); }
show(refNode, ref);
});
document.addEventListener('mouseout', function (event) {
var ref = refOf(event);
if (ref && ref === refActive) { closeRef(); }
});
window.addEventListener('scroll', closeRef, true);
})();