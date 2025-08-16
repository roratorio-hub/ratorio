import { JobMap } from './loadJobMap';
import { SkillMap } from './loadSkillMap';
import { ItemMap } from './loadItemMap';
import { loadRodbTranslator } from './loadRodbTranslator';

window.addEventListener('DOMContentLoaded', () => {
    console.log('📦 Webpack is ready and DOM is fully loaded.');

    Promise.all([
        JobMap.load(),
        SkillMap.load(),
        ItemMap.load()
    ]).then(() => {
        // 職業選択セレクトボックスの構築
        const selectElem = document.getElementById("OBJID_SELECT_JOB") as HTMLSelectElement | null;
        if (selectElem) {
            JobMap.getAll().forEach((job_array) => {
                const job_data = job_array[1];
                if (!job_data.name_ja) {
                    return; //日本語名がない場合はskip
                }
                const option = document.createElement('option');
                option.text = job_data.name_ja;
                option.value = job_data.id_name;
                // id_nameが"NOVICE"なら初期選択状態にする
                if (job_data.id_name === "NOVICE") {
                    option.selected = true;
                }
                selectElem.appendChild(option);
            });

            changeJobSettings("NOVICE");
        }
    });
});

window.addEventListener('load', () => {
    console.log('✅ All resources finished loading.');

    // RODB Translatorからのデータロード
    loadRodbTranslator(window.location.hash);
});
