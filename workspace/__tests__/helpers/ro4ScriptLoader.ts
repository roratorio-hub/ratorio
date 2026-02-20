/**
 * ro4/m/jsのJavaScriptファイルをテスト環境でロードするためのヘルパー
 */

import { readFileSync } from 'fs';
import { join } from 'path';

declare global {
    // eslint-disable-next-line no-var
    var g_dataManagerMobConfInput: any;
    // eslint-disable-next-line no-var
    var n_B_TAISEI: number[];
    // eslint-disable-next-line no-var
    var _APPLY_UPDATE_LV200: boolean;
}

/**
 * JavaScriptファイルをグローバルスコープで実行
 * @param relativePath ro4/m/jsからの相対パス
 */
export function loadRo4Script(relativePath: string): void {
    const rootPath = join(__dirname, '../../..');
    const fullPath = join(rootPath, 'ro4/m/js', relativePath);
    const content = readFileSync(fullPath, 'utf-8');

    // グローバルスコープで実行
    try {
        // eslint-disable-next-line no-eval
        (globalThis as any).eval(content);
    } catch (error) {
        console.error(`Error loading ro4/m/js/${relativePath}:`, error);
        throw error;
    }
}

/**
 * roroのスクリプトをロード
 * @param relativePath roro/m/jsからの相対パス
 */
function loadRoroScript(relativePath: string): void {
    const rootPath = join(__dirname, '../../..');
    const fullPath = join(rootPath, 'roro/m/js', relativePath);
    const content = readFileSync(fullPath, 'utf-8');

    // グローバルスコープで実行
    // eslint-disable-next-line no-eval
    (globalThis as any).eval(content);
}

/**
 * roroの共通ユーティリティをロード
 */
function loadRoroCommonUtils(): void {
    const rootPath = join(__dirname, '../../..');
    const fullPath = join(rootPath, 'roro/common/js/util.js');
    const content = readFileSync(fullPath, 'utf-8');
    // eslint-disable-next-line no-eval
    (globalThis as any).eval(content);
}

/**
 * 必要な依存ファイルを順番にロード
 * ro4はroroの共通ファイルに依存するため、それらもロード
 */
export function loadRo4Dependencies(): void {
    // 依存関係の順序が重要
    // 0. roroの共通ユーティリティをロード（他のファイルが依存]
    loadRoroCommonUtils();

    // 1. roroの基本クラスをロード
    loadRoroScript('CInstanceManager.js');
    loadRoroScript('CGlobalConstManager.js');

    // 2. roroの共通ファイルをロード
    loadRoroScript('common.js');
    loadRoroScript('etc.js');
    loadRoroScript('CNameKana.js');

    // 3. roroのデータ定義ファイルをロード（HTMLのロード順序に従う）
    // *.h.js はIDの定義、*.dat.js はデータ定義
    const roroDataFiles = [
        // ヘッダーファイルを先にロード
        'alias.h.js',
        'chara.dat.js',
        'skill.h.js',
        'usableskill.h.js',
        'autospell.h.js',
        'monster.h.js',
        'monstergroup.dat.js',
        'monstermap.h.js',
        'item.h.js',
        'arrow.h.js',
        'card.h.js',
        'costume.h.js',
        'pet.h.js',
        'itemset.h.js',
        'rndopt.h.js',
        'rndoptlist.h.js',
        'rndopttype.h.js',
        'timeitem.h.js',
        'itempack.h.js',
        // 次にデータファイル
        'alias.dat.js',
        'skill.dat.js',
        'usableskill.dat.js',
        'autospell.dat.js',
        'CSkillManager.js',
        'monster.dat.js',
        'monster.toughness.dat.js',
        'monstermap.dat.js',
        'item.dat.js',
        'arrow.dat.js',
        'card.dat.js',
        'costume.dat.js',
        'pet.dat.js',
        'itemset.dat.js',
        'rndopt.dat.js',
        'rndoptlist.dat.js',
        'rndopttype.dat.js',
        'timeitem.dat.js',
        'itempack.dat.js'
    ];

    for (const file of roroDataFiles) {
        try {
            loadRoroScript(file);
        } catch (error) {
            // ロード失敗時はログに出力するが、処理は続行
            console.error(`Warning: Failed to load roro/${file}:`, error);
        }
    }

    // 4. Mock関数を定義（ro4で必要だがテストで省略可能なもの）
    if (typeof globalThis.MallocArray === 'undefined') {
        globalThis.MallocArray = function (count: number, initialValue: any) {
            return Array(count).fill(initialValue);
        };
    }
    if (typeof globalThis.DivideDigits3 === 'undefined') {
        globalThis.DivideDigits3 = function (value: number) {
            return String(value).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        };
    }
    if (typeof globalThis.HtmlGetObjectCheckedById === 'undefined') {
        globalThis.HtmlGetObjectCheckedById = function (id: string, defaultValue: any) {
            return defaultValue;
        };
    }
    if (typeof (globalThis as any).CSkillManager === 'undefined') {
        (globalThis as any).CSkillManager = function () {
            this.skills = [];
        };
    }
    if (typeof (globalThis as any).CMigConstDataManager === 'undefined') {
        (globalThis as any).CMigConstDataManager = function () {
            this.data = new Map();
        };
    }
    if (typeof globalThis.g_dataManagerMobConfInput === 'undefined') {
        globalThis.g_dataManagerMobConfInput = {
            ResetDataAll: function () { }
        };
    }
    if (typeof globalThis.n_B_TAISEI === 'undefined') {
        globalThis.n_B_TAISEI = Array(10).fill(0);
    }
    // スキル200レベル以上のアップデート適用フラグ
    if (typeof (globalThis as any)._APPLY_UPDATE_LV200 === 'undefined') {
        (globalThis as any)._APPLY_UPDATE_LV200 = false;
    }

    // 5. ro4の基本ファイルをロード
    loadRo4Script('global.js');
    loadRo4Script('head.js');

    // 6. ro4のその他のファイルをロード
    loadRo4Script('hmjob.js');
}

/**
 * テスト用のセットアップ関数
 * 各テストファイルの beforeAll で呼び出す
 */
export function setupRo4TestEnvironment(): void {
    loadRo4Dependencies();
}
