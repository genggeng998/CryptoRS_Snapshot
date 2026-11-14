
(function () {
var STORE_KEY = 'crs-active-tabs';
var saved = {};
try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch (e) { saved = {}; }
function remember(groupId, panelId) {
saved[groupId] = panelId;
try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) {}
}
var HOLD_ID = 'crs-scroll-hold';
var holdEl = null;
var holdPx = 0;      // 当前垫高量（0 = 没垫）
var holdMax = 0;     // 本次点击最多允许垫多少
var holdSet = -1;    // 我们自己写回去的 scrollTop（用来忽略自己引发的 scroll 事件）
var clickSeq = 0;    // 第几次点击（过期的 apply 直接放弃，见下面）
var clickAt = -1e9;  // 上一次点击的时间戳（校准窗口见 scroll 监听）
function scroller() { return document.scrollingElement || document.documentElement; }
function setHold(px) {
holdPx = px;
if (px > 2) {
if (!holdEl) {
holdEl = document.createElement('div');
holdEl.id = HOLD_ID;
holdEl.style.overflowAnchor = 'none';
var host = document.querySelector('.signals') || document.body;
host.appendChild(holdEl);
}
holdEl.style.height = px + 'px';
} else if (holdEl) {
holdEl.style.height = '0px';
}
}
function keepViewport() {
var top0 = scroller().scrollTop;
var need = top0 + window.innerHeight;
var mine = ++clickSeq;
clickAt = performance.now();
holdMax = 0;
holdSet = -1;
function apply() {
if (mine !== clickSeq) { return; }
var natural = scroller().scrollHeight - holdPx;   // 减去已有垫高 = 真实高度
var short = need - natural;
if (short > holdMax) { holdMax = short; }
if (holdMax > 2) {
setHold(Math.min(holdMax, Math.max(0, short)));
} else {
setHold(0);
}
if (scroller().scrollTop !== top0) {
holdSet = top0;
scroller().scrollTop = top0;
}
}
return function () {
apply();                                                                // 普通面板：切完就够
if (window.requestAnimationFrame) { requestAnimationFrame(apply); }   // 🐢 注入之后
window.setTimeout(apply, 150);                                          // 图表重排（rAF+150ms）
window.setTimeout(apply, 600);                                          // 图表重排（+500ms）
};
}
window.addEventListener('scroll', function () {
if (holdPx <= 0) { return; }
if (performance.now() - clickAt < 700) { return; }
var s = scroller();
if (holdSet >= 0 && Math.abs(s.scrollTop - holdSet) < 2) { return; }
var natural = s.scrollHeight - holdPx;
setHold(Math.min(holdMax, Math.max(0, s.scrollTop + window.innerHeight - natural)));
}, { passive: true });
crsCharts.onResize(function () { holdMax = 0; setHold(0); }, { passive: true });
function bindGroup(group) {
if (group.dataset.crsTabsBound === '1') { return; }
group.dataset.crsTabsBound = '1';
var groupId = group.dataset.tabs;
var buttons = Array.prototype.slice.call(group.querySelectorAll(':scope > .tab-buttons .tab-button'));
var panels = Array.prototype.slice.call(group.querySelectorAll(':scope > .tab-panel'));
function select(target) {
buttons.forEach(function (item) {
var chosen = item === target;
item.classList.toggle('active', chosen);
item.setAttribute('aria-selected', chosen ? 'true' : 'false');
});
panels.forEach(function (panel) {
panel.classList.toggle('active', panel.dataset.panel === target.dataset.tab);
});
window.dispatchEvent(new Event('resize'));
}
buttons.forEach(function (button) {
button.addEventListener('click', function () {
var settle = keepViewport();          // ⚠️ 必须在 select() 之前读 scrollTop
select(button);
remember(groupId, button.dataset.tab);
settle();
});
});
var wanted = saved[groupId];
if (wanted) {
buttons.forEach(function (button) {
if (button.dataset.tab === wanted) { select(button); }
});
}
}
function initTabs(root) {
var host = root || document;
if (host.matches && host.matches('[data-tabs]')) { bindGroup(host); }
host.querySelectorAll('[data-tabs]').forEach(bindGroup);
}
window.crsInitTabs = initTabs;
initTabs(document);

var stamp = document.getElementById('data-stamp');
var staleNote = document.getElementById('data-stale-note');
function checkStale() {
if (!stamp) { return; }
var age = Math.floor((Date.now() - Number(stamp.dataset.ts)) / 60000);
var stale = age >= 20;
stamp.classList.toggle('stale', stale);
if (staleNote) { staleNote.textContent = stale ? '已 ' + age + ' 分钟未更新' : ''; }
}
checkStale();
setInterval(checkStale, 30000);

var refreshButton = document.getElementById('refresh-btn');
function reloadFresh() {
location.replace(location.pathname + '?t=' + Date.now() + location.hash);
}
if (refreshButton) {
refreshButton.addEventListener('click', function () {
refreshButton.disabled = true;
refreshButton.textContent = '刷新中…';
reloadFresh();
});
}
var period = 0;
if (period > 0) {
var box = document.getElementById('refresh-countdown');
var left = period;
function render() {
if (!box) { return; }
var m = Math.floor(left / 60);
var s = left % 60;
box.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
render();
setInterval(function () {
left -= 1;
if (left <= 0) {
reloadFresh();
return;
}
render();
}, 1000);
}
})();