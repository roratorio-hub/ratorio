import { loadFromBase64String } from './rtxApiImport';

/**
 * RTX API（yaml入出力）向けの開発用UIと、location.hash 経由のロード入口。
 * 職業選択セレクトボックスの構築・起動ゲートは engine 側（ui/job-select.js /
 * status/stallcalc-shell.js）へ移設済みで、ここには依存しない。
 */
document.addEventListener('DOMContentLoaded', () => {
    // 開発中の UI 表示
    // GitHub Pages でホストされている場合は表示しない
    if (!(window.location.hostname === "roratorio-hub.github.io" && window.location.pathname.split("/")[1] === "ratorio")) {
        const devSpace = document.getElementById("UI_DISPLAY_SPACE_UNDER_DEVELOPMENT");
        if (devSpace) {
            // ボタン定義リスト（handler は string | string[] | Function | Function[] を許容）
            const devButtons: any[] = [
                { text: '🐱‍💻 loadFromLocalStorage', handler: 'loadFromLocalStorage', fontSize: '2em' },
                { text: '🐱‍💻 saveToLocalStorage', handler: 'saveToLocalStorage', fontSize: '1em' },
                { text: '🐱‍💻 loadFromLocalFile', handler: 'loadFromLocalFile', fontSize: '1em' },
                { text: '🐱‍💻 saveToLocalFile', handler: 'saveToLocalFile', fontSize: '1em' },
            ];

            devButtons.forEach((btnDef) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = btnDef.text;
                btn.style.fontSize = btnDef.fontSize;
                btn.style.backgroundColor = "#d5da71ff";

                btn.addEventListener('click', () => {
                    // handler を配列に統一
                    const handlers = Array.isArray(btnDef.handler) ? btnDef.handler : [btnDef.handler];
                    handlers.forEach((h: any) => {
                        let fn: any = null;
                        if (typeof h === 'string') {
                            fn = (window as any)[h];
                        } else if (typeof h === 'function') {
                            fn = h;
                        }

                        if (typeof fn === 'function') {
                            try {
                                fn();
                            } catch (e) {
                                console.error(`handler execution failed`, e);
                            }
                        } else {
                            console.warn(`handler is not available or not a function`, h);
                        }
                    });
                });

                devSpace.appendChild(btn);
                devSpace.appendChild(document.createElement('br'));
            });
        }
    }
});

/**
 * ウィンドウのロードイベントリスナー。
 * 'load' は DOMContentLoaded より後に発火するため、engine 側の職業セレクト構築
 * （OnDomReady 経由・同期処理）は必ず完了済み。
 */
window.addEventListener('load', () => {
    // RTXデータロード
    loadFromBase64String(window.location.hash.substring(1) || '');
});
