
(function () {
var TIPS = {"624a929":"在新标签页打开使用手册，并跳到这个模块的口径说明（说明已整份搬进手册）","e173073":"XMR/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","b58da19":"BNB/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","442f2c6":"TIA/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","2f74672":"INJ/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","4ec09c0":"WLD/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","74b939f":"ZEC/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","58a7c5f":"D（分位得分 &lt; 20，池内最后那一档）","f4c3f15":"Q/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","c9c1cb7":"GTC/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","5a665f9":"AGT/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","b9c5a3e":"STRK/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","38adf3d":"BAT/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","2a95138":"ICNT/USDT:USDT &lt;div class=&quot;heat-tip&quot; hidden&gt;&lt;/div&gt;","bdccad5":"RS = 昨日涨幅 − BTC 昨日涨幅（都用 T-1 那根日线的收盘价）","e963646":"完全稀释估值 = 总供应量 × 现价（换手率的分母）","475d791":"连续在榜 = 从今天往前数，该币**连续**出现在本榜的天数（断一天就归 1）； 与「累计上榜」不同，掉榜会清零；点一下按这列排序","75e3f2b":"该币在这个榜上累计上榜的天数（= 已归档的全部历史 + 最近 30 天明细）；点一下按这列排序","249cbb3":"累计平均排名（名次之和 ÷ 上榜次数，越小越靠前）；点一下按这列排序","b24c4e3":"连续在榜 8 天（从今天往前数，断一天就归 1）","21f5fd8":"属于 coin50 固定名单（50 个主流币）","6fa32b3":"该币不在 CoinGecko 前 500 名内，FDV 与流通市值都拿不到（不影响名次：这张榜按 24H 成交额排）","3f29a63":"该币不在 CoinGecko 前 500 名内，拿不到 FDV / 流通市值 ⇒ 换手率算不出来（不影响名次：这张榜按 24H 成交额排）","d0067a7":"连续在榜 3 天（从今天往前数，断一天就归 1）","51aadad":"连续在榜 1 天（从今天往前数，断一天就归 1）","1ed0b08":"连续在榜 5 天（从今天往前数，断一天就归 1）","da5e14c":"连续在榜 2 天（从今天往前数，断一天就归 1）","06ae108":"连续在榜 4 天（从今天往前数，断一天就归 1）","75dc568":"累计上榜 1 天（已归档历史 + 最近 30 天明细） · 最好第 3 名 / 最差第 3 名 · 首次 2026-10-31 / 最近 2026-10-31","d69fa74":"累计上榜 1 天（已归档历史 + 最近 30 天明细） · 最好第 6 名 / 最差第 6 名 · 首次 2026-10-31 / 最近 2026-10-31","e13668f":"连续在榜 7 天（从今天往前数，断一天就归 1）","576718b":"Vol_Rank（coin50）·T+1","6c3f730":"累计上榜 21 天（已归档历史 + 最近 30 天明细） · 最高热度 0 / 最低热度 10 · 首次 2026-10-11 / 最近 2026-10-31","dbda5f6":"累计上榜 21 天（已归档历史 + 最近 30 天明细） · 最高热度 1 / 最低热度 6 · 首次 2026-10-11 / 最近 2026-10-31","d406453":"累计上榜 21 天（已归档历史 + 最近 30 天明细） · 最高热度 0 / 最低热度 2 · 首次 2026-10-11 / 最近 2026-10-31","86c1a14":"累计上榜 21 天（已归档历史 + 最近 30 天明细） · 最高热度 0 / 最低热度 3 · 首次 2026-10-11 / 最近 2026-10-31"};
function textOf(el) {
var key = el.getAttribute('data-tip');
return key ? (TIPS[key] || '') : '';
}
function fix(root) {
var list = (root || document).querySelectorAll('[data-tip]');
for (var i = 0; i < list.length; i++) {
if (!list[i].title) { list[i].title = textOf(list[i]); }
}
}
window.crsFixTitles = fix;
document.addEventListener('mouseover', function (event) {
var el = event.target;
if (!el || !el.closest) { return; }
var host = el.closest('[data-tip]');
if (host && !host.title) { host.title = textOf(host); }
}, true);
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function () { fix(document); });
} else {
fix(document);
}
})();