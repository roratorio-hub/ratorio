import { JobMap } from './loadJobMap';
import { SkillMap } from './loadSkillMap';
import { ItemMap } from './loadItemMap';
import { loadRodbTranslator } from './loadRodbTranslator';

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
    console.log('📦 Webpack is ready and DOM is fully loaded.');

    waitForDataLoaded().then(() => {
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

            // data-job-id属性に値があり、選択されている職業IDと異なる場合
            // data-job-idの値を反映させる
            let dataJobId = selectJobElem.getAttribute("data-job-id");
            if (dataJobId && selectJobElem.value !== dataJobId) {
                selectJobElem.value = dataJobId;
            }
        }
    });
});

/**
 * ウィンドウのロードイベントリスナー
 */
window.addEventListener('load', () => {
    console.log('✅ Webpack is all resources finished loading.');

    waitForDataLoaded().then(() => {
        // RODB Translatorからのデータロード
        loadRodbTranslator(window.location.hash);
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
