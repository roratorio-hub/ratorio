/**
 * roro/m/js/etc.js のユニットテスト
 *
 * etc.js ファイルの存在とロード確認テスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('roro/m/js/etc.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();
    });

    describe('etc.js ファイル確認', () => {
        it('etc.js ファイルが存在する', () => {
            const filepath = join(__dirname, '../../../roro/m/js/etc.js');
            expect(() => readFileSync(filepath, 'utf-8')).not.toThrow();
        });

        it('etc.js ファイルがコンテンツを持つ', () => {
            const filepath = join(__dirname, '../../../roro/m/js/etc.js');
            const content = readFileSync(filepath, 'utf-8');
            expect(content.length).toBeGreaterThan(0);
        });

        it('属性相性テーブル定義が含まれている', () => {
            const filepath = join(__dirname, '../../../roro/m/js/etc.js');
            const content = readFileSync(filepath, 'utf-8');
            expect(content.includes('zokusei')).toBe(true);
        });

        it('武器サイズ相性テーブル定義が含まれている', () => {
            const filepath = join(__dirname, '../../../roro/m/js/etc.js');
            const content = readFileSync(filepath, 'utf-8');
            expect(content.includes('weaponsize')).toBe(true);
        });

        it('etc.js ファイルが複数行を含む', () => {
            const filepath = join(__dirname, '../../../roro/m/js/etc.js');
            const content = readFileSync(filepath, 'utf-8');
            const lines = content.split('\n');
            expect(lines.length).toBeGreaterThan(10);
        });
    });
});
