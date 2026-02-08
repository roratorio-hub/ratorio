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
 * 必要な依存ファイルを順番にロード
 */
export function loadRoroDependencies(): void {
    // 依存関係の順序が重要
    loadRoroScript('CInstanceManager.js');
    loadRoroScript('CGlobalConstManager.js');
    loadRoroScript('common.js');
}

/**
 * テスト用のセットアップ関数
 * 各テストファイルの beforeAll で呼び出す
 */
export function setupRoroTestEnvironment(): void {
    loadRoroDependencies();
}
