/**
 * jQuery `$(fn)`（document ready）の代替。
 *
 * `<script type="module">` は defer 相当のため、実行時点で `document.readyState` は
 * 既に `'interactive'`（DOMContentLoaded 未発火）になっている。素朴に
 * `readyState === 'loading'` かどうかだけで判定すると `'interactive'` は else 側に落ちて
 * 同期実行され、jQuery の `$(fn)` が常に非同期（DOMContentLoaded 経由）だった前提が崩れる。
 *
 * @param {Function} fn readyになったら呼ぶ関数
 */
export function OnDomReady(fn) {
    if (document.readyState === 'complete') {
        setTimeout(fn, 0);
        return;
    }
    document.addEventListener('DOMContentLoaded', fn, { once: true });
}
