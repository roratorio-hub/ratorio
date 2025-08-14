import { JobMap } from './loadJobMap';
import { loadRodbTranslator } from './loadRodbTranslator';

window.addEventListener('DOMContentLoaded', () => {
    console.log('📦 Webpack is ready and DOM is fully loaded.');
});

window.addEventListener('load', () => {
    console.log('✅ All resources finished loading.');

    // 職業選択セレクトボックスの構築
    /*
    const selectElem = document.getElementById("OBJID_SELECT_JOB") as HTMLSelectElement | null;
    if (selectElem) {
        JobMap.getAll().forEach((job_array, idx) => {
            const job_data = job_array[1];
            if (!job_data.name_ja) {
                return; //日本語名がない場合はskip
            }
            const option = document.createElement('option');
            option.text = job_data.name_ja;
            option.value = job_data._mig_id_num.toString(); //MIG
            // id_nameが"NOVICE"なら初期選択状態にする
            if (job_data.id_name === "NOVICE") {
                option.selected = true;
            }
            selectElem.appendChild(option);
        });

        // foot.js で実行していたものをここで実行
        changeJobSettings(0);
    }
    */

    // RODB Translatorからのデータロード
    loadRodbTranslator(window.location.hash);
});
