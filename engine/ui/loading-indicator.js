import { register } from "../runtime/engine-registry.js";

/**
 * 重い処理中に表示する、画面上端固定のインデターミネート（進捗率なし）プログレスバー。
 * jQuery 版の中央スピナー（`jquery/loadingindicator/`）の代替。
 *
 * 呼び出しは `runWithLoadingIndicator(() => { 重い処理 })` を使う。重い処理は
 * メインスレッドを同期ブロックするため、表示中の見た目更新は `transform`/`opacity`
 * のみで行う（コンポジタスレッド駆動でジャンク中も動き続ける）。
 *
 * 状態を持たない: 要素が DOM にあるかどうかだけが「表示中」の真。jQuery 版の `.show()/.hide()`
 * と同じく参照カウントは行わない（ネストした呼び出しは内側の hide で全体が消える）。
 */

const ELEMENT_ID = "loadingIndicatorBar";
const STYLE_ID = "loadingIndicatorStyle";

function ensureStyleInjected() {
    if (document.getElementById(STYLE_ID)) {
        return;
    }
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
        #${ELEMENT_ID} {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            overflow: hidden;
            z-index: 10000;
            pointer-events: none;
        }
        #${ELEMENT_ID} .loading-indicator-sweep {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 35%;
            background: #0d6efd;
            box-shadow: 0 0 6px 1px rgba(13, 110, 253, 0.8);
            animation: loading-indicator-sweep 0.9s ease-in-out infinite;
        }
        @keyframes loading-indicator-sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(385%); }
        }
        @media (prefers-reduced-motion: reduce) {
            #${ELEMENT_ID} .loading-indicator-sweep {
                animation: loading-indicator-pulse 1s ease-in-out infinite;
                width: 100%;
                transform: none;
            }
        }
        @keyframes loading-indicator-pulse {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * ローディングインジケーターを表示する.
 */
export function showLoadingIndicator() {
    if (document.getElementById(ELEMENT_ID)) {
        return;
    }
    ensureStyleInjected();

    const bar = document.createElement("div");
    bar.id = ELEMENT_ID;
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-label", "計算中");

    const sweep = document.createElement("div");
    sweep.className = "loading-indicator-sweep";
    bar.appendChild(sweep);

    document.body.appendChild(bar);
    document.body.setAttribute("aria-busy", "true");
}

/**
 * ローディングインジケーターを非表示にする.
 */
export function hideLoadingIndicator() {
    document.getElementById(ELEMENT_ID)?.remove();
    document.body.removeAttribute("aria-busy");
}

/**
 * インジケーターを表示し、確実に1回描画させてから重い処理を実行し、
 * 完了後（エラー時も）インジケーターを非表示にする。
 *
 * `showLoadingIndicator(); setTimeout(heavyWorkFn, 0);` という素朴な組み合わせは
 * 描画を保証しない（実測: 30回中6回しか描画機会が無かった）。
 * `requestAnimationFrame` を2回ネストすると、1回目のコールバックが「次の描画の直前」に
 * 呼ばれるため、その中でさらに2回目の rAF を仕掛けることで「直前の描画が完了した後」を
 * 確実に捕捉できる（実測: 30回中30回描画された）。
 *
 * @param {Function} heavyWorkFn 重い処理。戻り値があれば Promise 経由で返す
 * @returns {Promise<*>} heavyWorkFn の戻り値、または例外で reject される Promise
 */
export function runWithLoadingIndicator(heavyWorkFn) {
    showLoadingIndicator();
    return new Promise((resolve, reject) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                try {
                    resolve(heavyWorkFn());
                } catch (err) {
                    reject(err);
                } finally {
                    hideLoadingIndicator();
                }
            });
        });
    });
}

register("showLoadingIndicator", showLoadingIndicator);
register("hideLoadingIndicator", hideLoadingIndicator);
register("runWithLoadingIndicator", runWithLoadingIndicator);
