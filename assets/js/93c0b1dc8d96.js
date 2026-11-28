
(function () {
var BTN_ID = 'shot-btn';
function clean(text) {
return String(text || '').replace(/[\/:*?"<>|]/g, '').replace(/[^\w一-鿿]+/g, '').slice(0, 24) || 'page';
}
function deepest() {
function shown(node) {
var rect = node.getBoundingClientRect();
return rect.width > 0 && rect.height > 0;
}
var panels = Array.prototype.slice.call(document.querySelectorAll('.tab-panel')).filter(shown);
if (!panels.length) { return null; }
var pick = panels[panels.length - 1];
panels.forEach(function (panel) {
var kids = Array.prototype.slice.call(panel.querySelectorAll('.tab-panel')).filter(shown);
if (!kids.length) { pick = panel; }
});
return pick;
}
function labelOf(panel) {
var id = panel ? panel.getAttribute('data-panel') : '';
var button = id ? document.querySelector('.tab-button[data-tab="' + id + '"]') : null;
return button ? button.textContent : '';
}
function moduleOf(panel) {
var top = null;
var node = panel;
while (node) {
var group = node.parentElement ? node.parentElement.closest('.tabs') : null;
if (group) { top = group; }
node = group ? group.parentElement : null;
}
if (top) {
var active = top.querySelector('.tab-button.active')
|| top.querySelector('.tab-button[aria-selected="true"]');
if (active) { return active.textContent; }
}
return labelOf(panel);
}
function toast(text, bad) {
var box = document.getElementById('shot-toast');
if (!box) {
box = document.createElement('div');
box.id = 'shot-toast';
box.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:26px;z-index:9999;'
+ 'padding:8px 16px;border-radius:9px;font-size:13px;background:#1b242c;color:#dfe7ec;'
+ 'border:1px solid #2a3a46;box-shadow:0 4px 18px rgba(0,0,0,.35)';
document.body.appendChild(box);
}
box.textContent = text;
box.style.borderColor = bad ? '#7d3a3a' : '#2a3a46';
box.style.display = 'block';
window.clearTimeout(box.__timer);
box.__timer = window.setTimeout(function () { box.style.display = 'none'; }, 2600);
}
function stamp() {
var date = new Date();
function pad(value) { return (value < 10 ? '0' : '') + value; }
return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
+ '_' + pad(date.getHours()) + pad(date.getMinutes());
}
function pageBg() {
var fallback = '#151a1e';
try {
var style = window.getComputedStyle(document.body);
var flat = style.backgroundColor;
if (flat && flat !== 'transparent' && flat !== 'rgba(0, 0, 0, 0)') { return flat; }
var found = (style.backgroundImage || '').match(/#[0-9a-fA-F]{3,8}/);
if (found) { return found[0]; }
} catch (error) { /* 忽略，用 fallback */ }
return fallback;
}
function capture() {
var button = document.getElementById(BTN_ID);
if (button && button.disabled) { return; }
if (!window.html2canvas) { toast('截图库未加载（html2canvas 缺失）', true); return; }
var panel = deepest();
var node = panel || document.body;
var name = clean(moduleOf(panel)) + '_' + clean(labelOf(panel)) + '_' + stamp() + '.png';
if (button) { button.disabled = true; button.style.opacity = '0.45'; }
toast('正在截取「' + (labelOf(panel) || '整页') + '」…');
window.html2canvas(node, { scale: 2, backgroundColor: pageBg(), useCORS: true, logging: false })
.then(function (canvas) {
var save = function (href) {
var link = document.createElement('a');
link.href = href;
link.download = name;
document.body.appendChild(link);
link.click();
link.remove();
toast('已导出：' + name);
};
var fallback = function () {
try { save(canvas.toDataURL('image/png')); }
catch (error) { toast('截图失败：' + (error && error.message ? error.message : error), true); }
};
if (typeof canvas.toBlob !== 'function') { fallback(); return; }
canvas.toBlob(function (blob) {
if (!blob) { fallback(); return; }
var href = URL.createObjectURL(blob);
save(href);
window.setTimeout(function () { URL.revokeObjectURL(href); }, 4000);
}, 'image/png');
})
.catch(function (error) {
toast('截图失败：' + (error && error.message ? error.message : error), true);
})
.then(function () {
if (button) { button.disabled = false; button.style.opacity = ''; }
});
}
document.addEventListener('click', function (event) {
var button = event.target && event.target.closest ? event.target.closest('#' + BTN_ID) : null;
if (!button) { return; }
event.preventDefault();
capture();
});
document.addEventListener('keydown', function (event) {
var key = (event.key || '').toLowerCase();
if (!((event.ctrlKey || event.metaKey) && event.altKey && key === 's')) { return; }
var node = event.target;
var tag = node && node.tagName ? node.tagName.toLowerCase() : '';
if (tag === 'input' || tag === 'textarea' || tag === 'select' || (node && node.isContentEditable)) { return; }
event.preventDefault();
event.stopPropagation();
capture();
});
})();