import { register } from "../runtime/engine-registry.js";

/**
 * 重い処理中に表示する、画面上端固定のインデターミネート（進捗率なし）プログレスバー。
 * jQuery 版の中央スピナー（`jquery/loadingindicator/`）の代替。
 *
 * 呼び出し元は `showLoadingIndicator(); setTimeout(() => { 重い処理; hideLoadingIndicator(); }, 0);`
 * という形で使う。重い処理はメインスレッドを同期ブロックするため、表示中の見た目更新は
 * `transform` のみで行う（コンポジタスレッド駆動でジャンク中も動き続ける）。
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
            height: 3px;
            overflow: hidden;
            z-index: 10000;
            background: rgba(0, 123, 255, 0.15);
            pointer-events: none;
        }
        #${ELEMENT_ID} .loading-indicator-sweep {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 40%;
            background: #007bff;
            animation: loading-indicator-sweep 1.2s ease-in-out infinite;
        }
        @keyframes loading-indicator-sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(350%); }
        }
        @media (prefers-reduced-motion: reduce) {
            #${ELEMENT_ID} .loading-indicator-sweep {
                animation: none;
                width: 100%;
                transform: none;
            }
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

register("showLoadingIndicator", showLoadingIndicator);
register("hideLoadingIndicator", hideLoadingIndicator);
