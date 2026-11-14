
(function () {
var MODAL = document.getElementById('signal-modal');
var TITLE = document.getElementById('marquee-title');
function closeModal() {
if (!MODAL) { return; }
MODAL.hidden = true;
document.body.style.overflow = '';
}
if (MODAL && TITLE) {
TITLE.addEventListener('click', function () {
MODAL.hidden = false;
document.body.style.overflow = 'hidden';      // 与事件栏弹窗同一个做法（背景不跟着滚）
});
MODAL.addEventListener('click', function (event) {
var target = event.target;
if (target && target.getAttribute && target.getAttribute('data-signal-close') === '1') {
closeModal();
}
});
document.addEventListener('keydown', function (event) {
if (event.key === 'Escape') { closeModal(); }
});
}
var host = document.getElementById('marquee');
var track = document.getElementById('marquee-track');
var node = document.getElementById('marquee-data');
if (!host || !track || !node) { return; }
var ROWS;
try { ROWS = JSON.parse(node.textContent); } catch (e) { return; }
if (!ROWS.length) { return; }
var PREFIX = 'https://www.coinglass.com/tv/zh/Binance_';
var PX_PER_SECOND = 30;

function build(row) {
var link = document.createElement('a');
link.className = 'marquee-item ' + (row.tone || 'up');
link.href = window.crsLinkUrl ? window.crsLinkUrl(row.coin)
: PREFIX + encodeURIComponent(row.coin) + 'USDT';
link.target = '_blank';
link.rel = 'noopener noreferrer';
link.setAttribute('data-coin', row.coin);          // 右键加入/移出自选
link.setAttribute('data-tip-ref', row.coin);       // 悬停看完整卡片（与各榜单一致）
var signalText = [row.direction, row.label, row.detail]
.filter(function (part) { return part !== null && part !== undefined && String(part).length > 0; })
.join(' ');
link.innerHTML =
'<span class="m-icon">' + row.icon + '</span>' +
'<span class="m-time">' + row.time + '</span>' +
'<span class="m-coin">' + row.coin + '</span>' +
'<span class="m-signal">' + signalText + '</span>';
return link;
}
function addItems() {
ROWS.forEach(function (row) { track.appendChild(build(row)); });
}
function addFiller(width) {
if (width <= 0) { return; }
var pad = document.createElement('span');
pad.className = 'm-filler';
pad.setAttribute('aria-hidden', 'true');
pad.style.width = width + 'px';
pad.style.flex = '0 0 auto';               // 固定宽度，不参与收缩
track.appendChild(pad);
}
function paint() {
[].forEach.call(track.querySelectorAll('.m-coin'), function (coin) {
var color = window.rsRatingColor ? window.rsRatingColor(coin.textContent) : '';
if (color) { coin.style.color = color; }
});
}
function layout() {
track.innerHTML = '';
addItems();                                  // 先放一份量宽度
var one = Math.max(track.scrollWidth, 1);
var visible = host.clientWidth - 24;         // .marquee 左右各 12px 内边距
var filler = one < visible ? Math.max(0, visible - 52) : 0;   // 52 = 两侧 26px 间距
var pitch = one + (filler ? filler + 52 : 0);
var sets = 2 * Math.max(1, Math.ceil((host.clientWidth + 8) / pitch));
track.innerHTML = '';
for (var index = 0; index < sets; index++) { addItems(); addFiller(filler); }
paint();
track.style.animationDuration = (track.scrollWidth / 2 / PX_PER_SECOND).toFixed(1) + 's';
host.classList.add('rolling');
}
if (document.readyState === 'complete') { layout(); } else { window.addEventListener('load', layout); }
crsCharts.onResize(layout);
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { layout(); }); }
})();