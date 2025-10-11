import { JobMap } from './loadJobMap';
import { SkillMap } from './loadSkillMap';
import { ItemMap } from './loadItemMap';
import { initializePageKeyListeners } from './calcxAddEventListener';
import { loadFromBase64String } from './rtxApiImport';

/**
 * YAMLデータのロード完了まで待機する関数
 */
async function waitForDataLoaded() {
    const maxRetries = 300; // 100ms * 300 = 30 seconds
    let retries = 0;
    while (retries < maxRetries) {
        const jobMapLoaded = await JobMap.isLoaded();
        const skillMapLoaded = await SkillMap.isLoaded();
        const itemMapLoaded = await ItemMap.isLoaded();

        if (jobMapLoaded && skillMapLoaded && itemMapLoaded) {
            return;
        }

        // まだロードされていなければ少し待つ（100msなど）
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    throw new Error('Timeout: Data failed to load within expected time.');
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
            JobMap.getAll().forEach((jobData) => {
                const job = jobData[1];
                if (!job.name_ja) {
                    return; //日本語名がない場合はskip
                }
                const option = document.createElement('option');
                option.text = job.name_ja;
                option.value = job.id_name;
                selectJobElem.appendChild(option);
            });
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

/**
 * YAMLデータのロード実行
 */
Promise.all([
    JobMap.load(),
    SkillMap.load(),
    ItemMap.load()
]).then(() => {
    console.log('🎉 All data loaded successfully.');
}).catch((error) => {
    console.error('⚠️ Error loading maps:', error);
});

(window as any).waitForDataLoaded = waitForDataLoaded;
