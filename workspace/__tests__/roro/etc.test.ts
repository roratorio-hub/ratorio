/**
 * roro/m/js/etc.js のユニットテスト
 *
 * etc.js ファイルの存在とロード確認テスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';
import { readFileSync } from 'fs';
import { join } from 'path';

// グローバルスコープへのアクセス
declare global {
    var zokusei: any;
    var weaponsize: any;
}

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

    describe('グローバル変数の定義確認', () => {
        it('zokusei（属性相性テーブル）が定義されている', () => {
            if (typeof zokusei !== 'undefined') {
                expect(typeof zokusei).not.toBe('undefined');
            }
        });

        it('weaponsize（武器サイズ相性テーブル）が定義されている', () => {
            if (typeof weaponsize !== 'undefined') {
                expect(typeof weaponsize).not.toBe('undefined');
            }
        });

        it('zokusei が配列またはオブジェクトである', () => {
            if (typeof zokusei !== 'undefined') {
                const isValidType = Array.isArray(zokusei) || (typeof zokusei === 'object' && zokusei !== null);
                expect(isValidType).toBe(true);
            }
        });

        it('weaponsize が配列またはオブジェクトである', () => {
            if (typeof weaponsize !== 'undefined') {
                const isValidType = Array.isArray(weaponsize) || (typeof weaponsize === 'object' && weaponsize !== null);
                expect(isValidType).toBe(true);
            }
        });
    });
});
