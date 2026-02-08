/**
 * roro/m/jsのJavaScriptファイルをテスト環境でロードするためのヘルパー
 */

import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * JavaScriptファイルをグローバルスコープで実行
 * @param relativePath roro/m/jsからの相対パス
 */
export function loadRoroScript(relativePath: string): void {
    const rootPath = join(__dirname, '../../..');
    const fullPath = join(rootPath, 'roro/m/js', relativePath);
    const content = readFileSync(fullPath, 'utf-8');

    // グローバルスコープで実行
    // eslint-disable-next-line no-eval
    (0, eval)(content);
}

/**
 * JavaScriptファイルをグローバルスコープで実行（失敗時もスキップ）
 * @param relativePath roro/m/jsからの相対パス
 */
function loadRoroScriptSafe(relativePath: string): void {
    try {
        loadRoroScript(relativePath);
    } catch (error) {
        // ファイルが存在しない場合などはログに出力するが処理は続行
        console.warn(`Warning: Failed to load roro/m/js/${relativePath}`);
    }
}

/**
 * 必要な依存ファイルを順番にロード
 */
export function loadRoroDependencies(): void {
    // 依存関係の順序が重要
    loadRoroScript('CInstanceManager.js');
    loadRoroScript('CGlobalConstManager.js');
    loadRoroScript('common.js');

    // データファイル（定数定義）を順番にロード
    // これらはグローバル変数として定義されるため、他のファイルから参照可能になる
    loadRoroScriptSafe('card.dat.js');
    loadRoroScriptSafe('monster.dat.js');
    loadRoroScriptSafe('skill.dat.js');
    loadRoroScriptSafe('item.dat.js');
    loadRoroScriptSafe('pet.dat.js');
    loadRoroScriptSafe('costume.dat.js');
    loadRoroScriptSafe('equip.dat.js');
    loadRoroScriptSafe('arrow.dat.js');
    loadRoroScriptSafe('autospell.dat.js');
    loadRoroScriptSafe('itempack.dat.js');
    loadRoroScriptSafe('itemset.dat.js');
    loadRoroScriptSafe('monster.toughness.dat.js');
    loadRoroScriptSafe('monstergroup.dat.js');
    loadRoroScriptSafe('monstermap.dat.js');
    loadRoroScriptSafe('rndopt.dat.js');
    loadRoroScriptSafe('rndoptlist.dat.js');
    loadRoroScriptSafe('rndopttype.dat.js');
    loadRoroScriptSafe('timeitem.dat.js');
    loadRoroScriptSafe('usableskill.dat.js');
    loadRoroScriptSafe('alias.dat.js');

    // ヘッダーファイル（定数・インデックス定義）
    loadRoroScriptSafe('card.h.js');
    loadRoroScriptSafe('monster.h.js');
    loadRoroScriptSafe('skill.h.js');
    loadRoroScriptSafe('item.h.js');
    loadRoroScriptSafe('pet.h.js');
    loadRoroScriptSafe('costume.h.js');
    loadRoroScriptSafe('equip.h.js');
    loadRoroScriptSafe('arrow.h.js');
    loadRoroScriptSafe('autospell.h.js');
    loadRoroScriptSafe('itempack.h.js');
    loadRoroScriptSafe('itemset.h.js');
    loadRoroScriptSafe('monstermap.h.js');
    loadRoroScriptSafe('rndopt.h.js');
    loadRoroScriptSafe('rndoptlist.h.js');
    loadRoroScriptSafe('rndopttype.h.js');
    loadRoroScriptSafe('timeitem.h.js');
    loadRoroScriptSafe('usableskill.h.js');
    loadRoroScriptSafe('alias.h.js');

    // その他の主要ファイル
    loadRoroScriptSafe('chara.js');
}

/**
 * テスト用のセットアップ関数
 * 各テストファイルの beforeAll で呼び出す
 */
export function setupRoroTestEnvironment(): void {
    loadRoroDependencies();
}
