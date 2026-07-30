import { get as registryGet } from "../../ro4/m/js/engine-registry.js";
import { initializePageKeyListeners } from './calcxAddEventListener';
import { loadFromBase64String } from './rtxApiImport';

/**
 * 計算エンジンの職業データ配列を取得する。
 * bundle.js は classic script のため、module script である計算エンジンより先に
 * 実行される。トップレベルでは未登録なので、参照時に都度取得する。
 */
function getJobSourceArray(): any[] | null {
    const gConst = registryGet('g_constDataManager') as any;
    const sourceArray = gConst?.jobDataManager?.sourceArray;
    return Array.isArray(sourceArray) ? sourceArray : null;
}

/**
 * 計算エンジンの職業データが利用可能になるまで待機する関数
 * （旧: YAML マップのロード待ち。yaml 廃止に伴いエンジンデータ待ちへ変更）
 */
async function waitForDataLoaded() {
    const maxRetries = 300; // 100ms * 300 = 30 seconds
    let retries = 0;
    while (retries < maxRetries) {
        if (getJobSourceArray()) {
            return;
        }

        // まだロードされていなければ少し待つ（100msなど）
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    throw new Error('Timeout: Data failed to load within expected time.');
}

/**
 * 職業選択セレクトボックスの選択肢を構築する。
 * option の value は mig ID の数値文字列で、JS エンジン側は parseInt して利用する。
 */
export function buildJobSelectOptions(selectJobElem: HTMLSelectElement): void {
    const sourceArray = getJobSourceArray();
    if (!sourceArray) {
        return;
    }
    const jobManager = (registryGet('g_constDataManager') as any).jobDataManager;
    for (let migId = 0; migId < sourceArray.length; migId++) {
        if (!sourceArray[migId]) {
            continue; // 欠番はskip
        }
        const jobName = jobManager.GetName(migId);
        if (!jobName) {
            continue; // 名称がない場合はskip
        }
        const option = document.createElement('option');
        option.text = jobName;
        option.value = String(migId);
        selectJobElem.appendChild(option);
    }
}

/**
 * DOMContentLoadedイベントリスナー
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: 📦 Webpack is ready and DOM is fully loaded.');
    waitForDataLoaded().then(() => {
        console.log('DOMContentLoaded: 🎉 All data is loaded.');

        // 職業選択セレクトボックスの構築
        const selectJobElem = document.getElementById("OBJID_SELECT_JOB") as HTMLSelectElement | null;
        if (selectJobElem) {
            buildJobSelectOptions(selectJobElem);
        }
    });

    // PageUp / PageDown キーリスナーの登録
    initializePageKeyListeners();

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
 * ウィンドウのロードイベントリスナー
 */
window.addEventListener('load', () => {
    console.log('load: ✅ Webpack is all resources finished loading.');
    waitForDataLoaded().then(() => {
        console.log('load: 🎉 All data is loaded.');

        // RTXデータロード
        loadFromBase64String(window.location.hash.substring(1) || '');
    });
});

(window as any).waitForDataLoaded = waitForDataLoaded;
