
(function () {
function initRsMaps(dataId, tipId, exposeTip) {
var node = document.getElementById(dataId);
if (!node) { return; }
var DATA;
try { DATA = JSON.parse(node.textContent); } catch (e) { return; }
var wrap = document.querySelector('.rs-wrap[data-view="' + dataId + '"]')
|| (node.closest ? node.closest('.rs-wrap') : null);
var tip = document.getElementById(tipId);
var PREFIX = 'https://www.coinglass.com/tv/zh/Binance_';
var QUAD_SHORT = {"Weakening":"长强短弱","Leading":"双领先","Lagging":"双落后","Improving":"短强长弱"};

function split(items, x, y, w, h, out, ratio) {
if (!items.length) { return; }
if (items.length === 1) { out.push([items[0], x, y, w, h]); return; }
var total = 0;
for (var i = 0; i < items.length; i++) { total += items[i].s; }
var half = total / 2, acc = 0, cut = items.length - 1;
for (var j = 0; j < items.length - 1; j++) {
acc += items[j].s;
if (acc >= half) { cut = j + 1; break; }
}
var first = items.slice(0, cut), second = items.slice(cut);
var firstSum = 0;
for (var k = 0; k < first.length; k++) { firstSum += first[k].s; }
var frac = total > 0 ? firstSum / total : 0.5;
if (w * ratio >= h) {
split(first, x, y, w * frac, h, out, ratio);
split(second, x + w * frac, y, w * (1 - frac), h, out, ratio);
} else {
split(first, x, y, w, h * frac, out, ratio);
split(second, x, y + h * frac, w, h * (1 - frac), out, ratio);
}
}

function fmt(value) { return (value >= 0 ? '+' : '') + value.toFixed(2) + '%'; }
function fmtRatio(value) {
if (!value) { return '-'; }
if (value >= 0.001) { return value.toFixed(6); }
return value.toExponential(2);
}
function fmtVol(value) {
if (value === null || value === undefined) { return '-'; }
var amount = Math.abs(value);
if (amount >= 1e9) { return '$' + (amount / 1e9).toFixed(2) + 'B'; }
if (amount >= 1e6) { return '$' + (amount / 1e6).toFixed(2) + 'M'; }
if (amount >= 1e3) { return '$' + (amount / 1e3).toFixed(2) + 'K'; }
return '$' + amount.toFixed(0);
}

function describe(tile) {
var badges = window.crsTipBadges ? window.crsTipBadges(tile.t) : '';
var heat = badges
? '<div class="rs-tip-heat"><span class="rs-tip-label">热度模块</span>' + badges + '</div>'
: '<div class="rs-tip-heat flat"><span class="rs-tip-label">热度模块</span>未上热门榜</div>';
var seq = window.rsSeqInner ? window.rsSeqInner(tile.t) : '';
var seqRow = seq
? '<div class="rs-tip-seq"><span class="rs-tip-label">近30天历程</span>'
+ '<div class="heat-tip-seq">' + seq + '</div></div>'
: '';
var tag = window.crsTipTag ? window.crsTipTag(tile.t) : '';
var c50 = window.crsCoin50 ? window.crsCoin50(tile.t) : '';
var ratingColor = window.rsRatingColor ? window.rsRatingColor(tile.t) : '';
var headName = ratingColor
? '<b style="color:' + ratingColor + '">' + tile.t + c50 + tag + '</b>'
: '<b>' + tile.t + c50 + tag + '</b>';
var secHtml = window.crsTipSector ? window.crsTipSector(tile.t) : undefined;
var sec = secHtml === undefined
? ''
: '<div class="rs-tip-sector"><span class="rs-tip-label">所属板块</span>' + secHtml + '</div>';
return '<div class="rs-tip-head">' + headName
+ '<span class="rs-tip-quad">' + (QUAD_SHORT[tile.q] || tile.q) + '</span></div>'
+ heat
+ '<div class="rs-tip-row"><span>24H Vol</span><b>' + fmtVol(tile.v) + '</b></div>'
+ sec
+ '<div class="rs-tip-row"><span>180根4H (30天) 超额收益: <b>' + fmt(tile.a) + '</b></span><em>决定格子大小</em></div>'
+ '<div class="rs-tip-row"><span>30根4H (5天) 相对动量: <b>' + fmt(tile.m) + '</b></span><em>决定格子颜色</em></div>'
+ '<div class="rs-tip-row dim"><span>30根4H (5天) 超额收益: ' + fmt(tile.h4) + '</span><em>Ratio ' + fmtRatio(tile.rt) + '</em></div>'
+ seqRow;
}

function place(tileEl, event) {
var box = tileEl.getBoundingClientRect();
tip.hidden = false;
var width = tip.offsetWidth, height = tip.offsetHeight;
var left = window.crsTipLeft
? window.crsTipLeft(box, width)
: Math.min(Math.max(8, box.left), window.innerWidth - width - 8);
var top = box.top - height - 10;
if (top < 8) { top = Math.min(box.bottom + 10, window.innerHeight - height - 8); }
tip.style.left = left + 'px';
tip.style.top = Math.max(8, top) + 'px';
}

function draw() {
DATA.quadrants.forEach(function (quadrant) {
var host = wrap.querySelector('.rs-tiles[data-tiles="' + quadrant.key + '"]');
if (!host) { return; }
var width = host.clientWidth, height = host.clientHeight;
if (width <= 0 || height <= 0) { return; }        // 面板隐藏时先不算，等它显示出来
var tiles = quadrant.tiles.slice().sort(function (a, b) { return b.s - a.s; });
var boxes = [];
split(tiles, 0, 0, 100, 100, boxes, width / Math.max(height, 1));
host.innerHTML = '';
boxes.forEach(function (box) {
var tile = box[0];
var el = document.createElement('a');
el.className = 'rs-tile';
el.href = window.crsLinkUrl ? window.crsLinkUrl(tile.t)
: PREFIX + encodeURIComponent(tile.t) + 'USDT';
el.target = '_blank';
el.rel = 'noopener';
el.title = '';
if (tile.t) { el.setAttribute('data-coin', tile.t); }   // 右键加入/移出自选
el.style.left = box[1] + '%';
el.style.top = box[2] + '%';
el.style.width = box[3] + '%';
el.style.height = box[4] + '%';
el.style.background = tile.c;
el.style.color = tile.x;
var border = window.rsRatingColor ? window.rsRatingColor(tile.t) : '';
if (border) { el.style.borderColor = border; }
var px = box[3] / 100 * width, py = box[4] / 100 * height;
if (px < 26 || py < 13) {
el.classList.add('rs-tile-none');
} else {
var html = '<b>' + tile.t + '</b>';
if (py >= 30 && px >= 46) { html += '<span>' + fmt(tile.a) + '</span>'; }
if (py >= 48 && px >= 62) { html += '<span class="rs-mom">' + fmt(tile.m) + '</span>'; }
el.innerHTML = html;
}
el.addEventListener('mouseenter', function () {
tip.innerHTML = describe(tile);
place(el);
});
el.addEventListener('mouseleave', function () { tip.hidden = true; });
host.appendChild(el);
});
});
}

if (exposeTip) {
window.rsMapTip = function (ticker) {
var found = null;
DATA.quadrants.forEach(function (quadrant) {
quadrant.tiles.forEach(function (tile) { if (tile.t === ticker) { found = tile; } });
});
return found ? describe(found) : '';
};
}

function safeDraw() { try { draw(); } catch (e) { /* 布局失败不能拖垮整页 */ } }
if (document.readyState === 'complete') { safeDraw(); } else { window.addEventListener('load', safeDraw); }
crsCharts.onResize(safeDraw);
var panel = wrap ? wrap.closest('.tab-panel') : null;
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, safeDraw);
}
if (wrap && wrap.scrollWidth === 0) { setTimeout(safeDraw, 300); }
}
initRsMaps('rs-maps-data', 'rs-tooltip', true);  initRsMaps('rs-coin50-data', 'rs-coin50-tooltip', false);
})();