
(function () {
var SPLIT_RATIO = 1.0;
function split(items, x, y, w, h, out, ratio) {
if (!items.length) { return; }
if (items.length === 1) { out.push([items[0], x, y, w, h]); return; }
var total = 0, i;
for (i = 0; i < items.length; i++) { total += items[i].s; }
var half = total / 2, acc = 0, cut = items.length - 1;
for (i = 0; i < items.length - 1; i++) {
acc += items[i].s;
if (acc >= half) { cut = i + 1; break; }
}
var first = items.slice(0, cut), second = items.slice(cut), firstSum = 0;
for (i = 0; i < first.length; i++) { firstSum += first[i].s; }
var frac = total > 0 ? firstSum / total : 0.5;
if (w * ratio >= h) {
split(first, x, y, w * frac, h, out, ratio);
split(second, x + w * frac, y, w * (1 - frac), h, out, ratio);
} else {
split(first, x, y, w, h * frac, out, ratio);
split(second, x, y + h * frac, w, h * (1 - frac), out, ratio);
}
}
function esc(text) {
return String(text === null || text === undefined ? "" : text)
.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function pct(value) {
if (value === null || value === undefined) { return '-'; }
return (value >= 0 ? '+' : '') + Number(value).toFixed(2) + '%';
}
function spanDays(bars) { return Math.round(Number(bars) / 6); }
function fmtRatio(value) {
if (!value) { return '-'; }
if (value >= 0.001) { return Number(value).toFixed(6); }
return Number(value).toExponential(2);
}
function vol(value) {
if (value === null || value === undefined) { return '-'; }
var amount = Math.abs(Number(value));
if (amount >= 1e9) { return '$' + (amount / 1e9).toFixed(2) + 'B'; }
if (amount >= 1e6) { return '$' + (amount / 1e6).toFixed(2) + 'M'; }
if (amount >= 1e3) { return '$' + (amount / 1e3).toFixed(2) + 'K'; }
return '$' + amount.toFixed(0);
}
function infoHtml(ticker, item) {
var rows = [];
var color = window.rsRatingColor ? (window.rsRatingColor(ticker) || "") : "";
rows.push('<div class="rs-tip-head"><b' + (color ? ' style="color:' + color + '"' : "") + '>'
+ esc(ticker) + " " + (window.crsUsFlag || "") + (item.kind === "ETF" ? " 💼" : "") + "</b>"
+ '<span class="rs-tip-quad">' + (item.kind === "ETF" ? "ETF" : "个股") + "</span></div>");
rows.push('<div class="rs-tip-row dim"><em>名称</em><b>'
+ (item.name ? esc(item.name) : "暂无") + "</b></div>");
if (item.price !== null && item.price !== undefined) {
rows.push('<div class="rs-tip-row"><em>最新价</em><b>$' + item.price + "</b></div>");
}
if (item.chg !== null && item.chg !== undefined) {
rows.push('<div class="rs-tip-row"><em>24H 涨跌</em><b>' + pct(item.chg * 100) + "</b></div>");
}
if (item.vol !== null && item.vol !== undefined) {
rows.push('<div class="rs-tip-row"><em>24H Vol</em><b>' + vol(item.vol) + "</b></div>");
}
rows.push('<div class="rs-tip-row dim"><em>说明</em><b>非纳指100 / 标普500 成分，'
+ "没有四象限卡片</b></div>");
return rows.join("");
}
function mount(dataId) {
var node = document.getElementById(dataId);
if (!node) { return; }
var wrap = document.querySelector('.rs-wrap[data-view="' + dataId + '"]');
if (!wrap) { return; }
if (wrap.getAttribute('data-mounted') === '1') { return; }
wrap.setAttribute('data-mounted', '1');
var DATA = {};
try { DATA = JSON.parse(node.textContent) || {}; } catch (e) { return; }
var QUADS = DATA.quadrants || [], FLAG = DATA.flag || '';
var HIST = DATA.histColor || {}, SHORT = DATA.quadShort || {}, PREFIX = DATA.prefix || '';
var byTicker = {};
var tip = document.getElementById(dataId.replace('-data', '-tooltip'));
Array.prototype.forEach.call(wrap.querySelectorAll('.rs-tiles'), function (host) {
var key = host.getAttribute('data-tiles'), spec = null;
(QUADS || []).forEach(function (item) { if (item.key === key) { spec = item; } });
if (!spec) { return; }
var list = spec.tiles || [];
(function () {
for (var idx = 0; idx < list.length; idx++) { byTicker[list[idx].t] = list[idx]; }
})();
host.innerHTML = list.map(function (t) {
return '<a class="rs-tile" href="' + PREFIX + encodeURIComponent(t.t) + 'USDT"' +
' target="_blank" rel="noopener" data-coin="' + t.t + '"' +
' style="background:' + t.c + ';color:' + t.x + '">' +
'<b>' + t.t + '</b><span>' + pct(t.a) + '</span>' +
'<span class="rs-mom">' + pct(t.m) + '</span></a>';
}).join('');
Array.prototype.forEach.call(host.querySelectorAll('.rs-tile'), function (el, index) {
el.__tile = list[index];
if (list[index]) { list[index].el = el; }
});
});
function tipHtml(t) {
var rows = [];
var nameColor = window.rsRatingColor ? (window.rsRatingColor(t.t) || '') : '';
rows.push('<div class="rs-tip-head"><b'
+ (nameColor ? ' style="color:' + nameColor + '"' : '')
+ '>' + t.t + (t.us ? ' ' + FLAG : '') + '</b>'
+ '<span class="rs-tip-quad">' + (SHORT[t.q] || '') + '</span></div>');
if (t.name) {
rows.push('<div class="rs-tip-row dim"><em>公司</em><b>' + esc(t.name) + '</b></div>');
}
var longWin = t.w || 180, shortWin = t.s || 30, sparkWin = t.p || 30;
rows.push('<div class="rs-tip-row"><span>' + longWin + '根4H (' + spanDays(longWin)
+ '天) 超额收益: <b>' + pct(t.a) + '</b></span><em>决定格子大小</em></div>');
rows.push('<div class="rs-tip-row"><span>' + shortWin + '根4H (' + spanDays(shortWin)
+ '天) 相对动量: <b>' + pct(t.m) + '</b></span><em>决定格子颜色</em></div>');
rows.push('<div class="rs-tip-row dim"><span>' + sparkWin + '根4H (' + spanDays(sparkWin)
+ '天) 超额收益: ' + pct(t.h4) + '</span><em>Ratio ' + fmtRatio(t.rt) + '</em></div>');
rows.push('<div class="rs-tip-row"><em>24H Vol</em><b>' + vol(t.v) + '</b></div>');
if (t.n && t.n < longWin) {
rows.push('<div class="rs-tip-row dim"><em>样本</em><b>' + t.n
+ ' 根4H · RS 窗口 ' + longWin + ' 根（不足 180，按可用长度自适应）</b></div>');
}
if (t.sec) {
rows.push('<div class="rs-tip-sector"><span class="rs-tip-label">所属板块</span>'
+ '<span>' + t.sec + '</span></div>');
}
var seq = t.h || '';
var order = ['L', 'I', 'W', 'G'];
var names = { L: SHORT.Leading, I: SHORT.Improving, W: SHORT.Weakening, G: SHORT.Lagging };
var counts = { L: 0, I: 0, W: 0, G: 0 };
seq.split('').forEach(function (letter) { if (counts[letter] !== undefined) { counts[letter] += 1; } });
var tailName = names[seq.charAt(seq.length - 1)] || '';
var bar = order.map(function (letter) {
if (!counts[letter]) { return ''; }
var width = counts[letter] / seq.length * 100;
return '<span class="rs-seq-seg" style="flex:0 0 ' + width.toFixed(2) + '%;background:'
+ (HIST[letter] || '#666') + '"></span>';
}).join('');
var dist = order.filter(function (letter) { return counts[letter]; })
.map(function (letter) { return names[letter] + ' ' + counts[letter] + ' 天'; })
.join(' · ');
rows.push('<div class="rs-tip-seq"><span class="rs-tip-label">'
+ (seq
? '近' + seq.length + '天历程（当前 ' + tailName + '，已连续 ' + t.k + ' 天）'
: '近30天历程')
+ '</span>'
+ (seq
? '<div class="rs-seq-bar">' + bar + '</div>'
+ '<div class="rs-tip-row dim"><em>分布</em><b>' + dist + '</b></div>'
: '<div class="rs-tip-row dim"><em>暂无</em><b>历史不足，暂无法给出行情历程</b></div>')
+ '</div>');
return rows.join('');
}
function layout() {
Array.prototype.forEach.call(wrap.querySelectorAll('.rs-tiles'), function (host) {
var width = host.clientWidth, height = host.clientHeight;
if (width <= 0 || height <= 0) { return; }
var items = [];
Array.prototype.forEach.call(host.querySelectorAll('.rs-tile'), function (el) {
if (el.__tile) { items.push(el.__tile); }
});
var rects = [];
split(items, 0, 0, width, height, rects, SPLIT_RATIO);
rects.forEach(function (rect) {
var tile = rect[0], el = tile.el;
if (!el) { return; }
el.style.left = rect[1].toFixed(1) + 'px';
el.style.top = rect[2].toFixed(1) + 'px';
el.style.width = Math.max(0, rect[3] - 1).toFixed(1) + 'px';
el.style.height = Math.max(0, rect[4] - 1).toFixed(1) + 'px';
});
});
}
function show(event, tile) {
if (!tip) { return; }
tip.innerHTML = tipHtml(tile);
tip.hidden = false;
var left = event.clientX + 14, top = event.clientY + 14;
if (left + tip.offsetWidth > window.innerWidth - 8) {
left = Math.max(8, event.clientX - tip.offsetWidth - 14);
}
if (top + tip.offsetHeight > window.innerHeight - 8) {
top = Math.max(8, window.innerHeight - tip.offsetHeight - 8);
}
tip.style.left = left + 'px';
tip.style.top = top + 'px';
}
function hide() { if (tip) { tip.hidden = true; } }
Array.prototype.forEach.call(wrap.querySelectorAll('.rs-tile'), function (el) {
if (!el.__tile) { return; }
el.addEventListener('mouseenter', function (event) { show(event, el.__tile); });
el.addEventListener('mousemove', function (event) { show(event, el.__tile); });
el.addEventListener('mouseleave', hide);
});
var KIND = dataId.indexOf("qqq") >= 0 ? "qqq" : "spy";
window.crsUsTip = window.crsUsTip || {};
window.crsUsTip[KIND] = { tiles: byTicker, render: function (tile) { return tipHtml(tile); } };
layout();
window.setTimeout(layout, 120);
window.setTimeout(layout, 500);
if (window.crsCharts) {
window.crsCharts.onResize(layout);
var panel = wrap.closest('.tab-panel');
if (panel && window.crsCharts.watchPanel) { window.crsCharts.watchPanel(panel, layout); }
} else {
window.addEventListener('resize', layout);
}
}
function boot() {
Array.prototype.forEach.call(document.querySelectorAll('.us-maps .rs-wrap[data-view]'), function (wrap) {
mount(wrap.getAttribute('data-view'));
});
}
function bindBorrowers() {
if (window.__crsUsTipBorrow) { return; }
window.__crsUsTipBorrow = true;
var box = document.createElement("div");
box.className = "rs-tooltip";
box.hidden = true;
document.body.appendChild(box);
function place(event) {
var left = event.clientX + 14, top = event.clientY + 14;
if (left + box.offsetWidth > window.innerWidth - 8) {
left = Math.max(8, event.clientX - box.offsetWidth - 14);
}
if (top + box.offsetHeight > window.innerHeight - 8) {
top = Math.max(8, window.innerHeight - box.offsetHeight - 8);
}
box.style.left = left + "px";
box.style.top = top + "px";
}
function enter(event) {
var el = event.target && event.target.closest ? event.target.closest("[data-us-map-tip]") : null;
if (!el) { return; }
var ticker = el.getAttribute("data-coin") || (el.textContent || "").trim();
var api = (window.crsUsTip || {})[el.getAttribute("data-us-map-tip")];
var tile = api && api.tiles ? api.tiles[ticker] : null;
if (tile) {
box.innerHTML = api.render(tile);
} else if (window.crsUsInfo && window.crsUsInfo[ticker]) {
box.innerHTML = infoHtml(ticker, window.crsUsInfo[ticker]);
} else {
return;
}
box.hidden = false;
place(event);
}
document.addEventListener("mouseover", enter);
document.addEventListener("mousemove", function (event) {
if (!box.hidden) { place(event); }
});
document.addEventListener("mouseout", function (event) {
var el = event.target && event.target.closest ? event.target.closest("[data-us-map-tip]") : null;
if (!el) { return; }
var to = event.relatedTarget;
if (to && el.contains(to)) { return; }
box.hidden = true;
});
}
function start() { boot(); bindBorrowers(); }
if (document.readyState === 'complete') { start(); } else { window.addEventListener('load', start); }
})();