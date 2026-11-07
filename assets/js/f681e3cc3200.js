
(function () {
var SELECTOR = '[data-coin]';
var menu = null, currentCoin = '';

function close() { if (menu) { menu.remove(); menu = null; } }

var toastNode = null, toastTimer = null, toastFade = null;
window.crsToast = function (text, duration) {
if (toastNode) { toastNode.remove(); toastNode = null; }
clearTimeout(toastTimer);
clearTimeout(toastFade);
var node = document.createElement('div');
node.className = 'coin-toast';
node.textContent = text;
document.body.appendChild(node);
toastNode = node;
requestAnimationFrame(function () { node.classList.add('show'); });
toastTimer = setTimeout(function () {
node.classList.remove('show');
toastFade = setTimeout(function () {
node.remove();
if (toastNode === node) { toastNode = null; }
}, 400);
}, duration || 1000);
};

function open(coin, x, y) {
close();
currentCoin = coin;
var watched = window.watchlist ? window.watchlist.has(coin) : false;
menu = document.createElement('div');
menu.className = 'coin-menu';
var head = document.createElement('div');
head.className = 'coin-menu-head';
head.textContent = coin + (watched ? ' · 已自选' : '');
menu.appendChild(head);
var button = document.createElement('button');
button.type = 'button';
button.textContent = watched ? '移出自选' : '加入自选';
button.addEventListener('click', function () {
close();
if (window.watchlist) { window.watchlist.toggle(coin, true); }
});
menu.appendChild(button);
var chartSlots = window.crsChartSlots
? window.crsChartSlots()
: [{ slot: 1, label: '看盘地址', template: 'default' }];
for (var s = 0; s < chartSlots.length; s++) {
var chartSlot = chartSlots[s];
if (chartSlot.slot !== 1 && !chartSlot.template) { continue; }   // 没设置的第 2 / 3 条不显示
var chartButton = document.createElement('button');
chartButton.type = 'button';
chartButton.textContent = chartSlot.label;
chartButton.title = '在新标签页打开「' + chartSlot.label + '」（右上角「看盘地址」按钮可以改地址）';
chartButton.addEventListener('click', (function (slot) {
return function () {
close();
var url = window.crsChartUrl ? window.crsChartUrl(coin, slot) : '';
if (url) { window.open(url, '_blank', 'noopener'); }
};
})(chartSlot.slot));
menu.appendChild(chartButton);
}
document.body.appendChild(menu);
var width = menu.offsetWidth, height = menu.offsetHeight;
menu.style.left = Math.max(8, Math.min(x, window.innerWidth - width - 8)) + 'px';
menu.style.top = Math.max(8, Math.min(y, window.innerHeight - height - 8)) + 'px';
}

window.crsCoinMenu = open;

document.addEventListener('contextmenu', function (event) {
if (event.defaultPrevented) { return; }
var host = event.target && event.target.closest ? event.target.closest(SELECTOR) : null;
if (!host) { close(); return; }          // 不在币名上就交回浏览器默认菜单
event.preventDefault();
open(host.getAttribute('data-coin'), event.clientX, event.clientY);
});
document.addEventListener('click', close);
document.addEventListener('scroll', close, true);
crsCharts.onResize(close);
window.addEventListener('keydown', function (event) { if (event.key === 'Escape') { close(); } });
})();