/**
 * ro4/m/jsのJavaScriptファイルをテスト環境でロードするためのヘルパー
 */

import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * JavaScriptファイルをグローバルスコープで実行
 * @param relativePath ro4/m/jsからの相対パス
 */
export function loadRo4Script(relativePath: string): void {
    const rootPath = join(__dirname, '../../..');
    const fullPath = join(rootPath, 'ro4/m/js', relativePath);
    const content = readFileSync(fullPath, 'utf-8');

    // グローバルスコープで実行
    // eslint-disable-next-line no-eval
    eval(content);
}

/**
 * 必要な依存ファイルを順番にロード
 * ro4はroroの共通ファイルに依存するため、それらもロード
 */
export function loadRo4Dependencies(): void {
    const rootPath = join(__dirname, '../../..');

    // roroの依存ファイルをロード
    const loadRoroScript = (relativePath: string) => {
        const fullPath = join(rootPath, 'roro/m/js', relativePath);
        const content = readFileSync(fullPath, 'utf-8');
        // eslint-disable-next-line no-eval
        eval(content);
    };

    // 依存関係の順序が重要
    loadRoroScript('CInstanceManager.js');
    loadRoroScript('CGlobalConstManager.js');

    // Mock関数を定義（ro4で必要だがテストで省略可能なもの）
    // eslint-disable-next-line no-eval
    eval(`
    function MallocArray(count, initialValue) {
      return Array(count).fill(initialValue);
    }
    function DivideDigits3(value) {
      return String(value).replace(/(\\d)(?=(\\d{3})+$)/g, '$1,');
    }
    function HtmlGetObjectCheckedById(id, defaultValue) {
      return defaultValue;
    }

    // CSkillManagerのモック
    function CSkillManager() {
      this.skills = [];
    }

    // CMigConstDataManagerのモック
    function CMigConstDataManager() {
      this.data = new Map();
    }

    // CDataManagerMobConfInputのモック
    let g_dataManagerMobConfInput = {
      ResetDataAll: function() {}
    };

    // n_B_TAISEIのモック
    let n_B_TAISEI = Array(10).fill(0);
  `);

    // ro4の基本ファイルをロード
    loadRo4Script('global.js');
}

/**
 * テスト用のセットアップ関数
 * 各テストファイルの beforeAll で呼び出す
 */
export function setupRo4TestEnvironment(): void {
    loadRo4Dependencies();
}
