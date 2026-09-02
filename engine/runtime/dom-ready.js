/**
 * jQuery `$(fn)`（document ready）の代替。
 *
 * jQuery の実際の判定は `readyState !== "loading"`（'interactive'/'complete' はどちらも
 * 「準備済み」）。'interactive' は DOMContentLoaded が**既に発火した後**の状態なので、
 * ここを取りこぼして常に `addEventListener('DOMContentLoaded', ...)` へ倒すと、
 * 二度と発火しないイベントを待ち続けてコールバックが永久に呼ばれない
 * （`<script type="module">` は defer 相当で、import 解決が遅いモジュールほど
 * 評価タイミングが後ろにずれ、DOMContentLoaded 発火後に評価されることがある）。
 *
 * ⚠️ この関数は「$(fn) が舞台裏でいつ・どういう順序で呼ばれるか」を厳密には
 * 再現しない（jQuery 自身の内部スケジューリングは classic script の読み込み
 * タイミングに依存する込み入った実装で、実測でも完全な再現は非現実的だった）。
 * 同じ DOMContentLoaded に複数のリスナーが依存する場合の**実行順序**まで
 * 一致させたいなら、呼び出し側で明示的な同期（本ファイルではなく該当箇所）が要る
 * （calchistory.js / CSaveController.js の buildForm 二重実行対策を参照）。
 *
 * @param {Function} fn readyになったら呼ぶ関数
 */
export function OnDomReady(fn) {
    if (document.readyState !== 'loading') {
        setTimeout(fn, 0);
        return;
    }
    document.addEventListener('DOMContentLoaded', fn, { once: true });
}
