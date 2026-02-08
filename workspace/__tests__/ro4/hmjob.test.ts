/**
 * ro4/m/js/hmjob.js のユニットテスト
 *
 * ステータス関連のグローバル変数と定義のテスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRo4TestEnvironment } from '../helpers/ro4ScriptLoader';

// グローバルスコープへのアクセス
declare global {
    var g_pureStatus: number[];
    var g_bonusStatus: number[];
    var g_STR: number;
    var g_AGI: number;
    var g_VIT: number;
    var g_INT: number;
    var g_DEX: number;
    var g_LUK: number;
    var g_POW: number;
    var g_STA: number;
    var g_WIS: number;
    var g_SPL: number;
    var g_CON: number;
    var g_CRT: number;
    var RebuildStatusSelect: Function;
}

describe('ro4/m/js/hmjob.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRo4TestEnvironment();

        // hmjob.js をロード
        const { readFileSync } = require('fs');
        const { join } = require('path');
        const rootPath = join(__dirname, '../../..');
        const content = readFileSync(join(rootPath, 'ro4/m/js/hmjob.js'), 'utf-8');
        // eslint-disable-next-line no-eval
        (0, eval)(content);
    });

    describe('ステータス配列の初期化', () => {
        it('g_pureStatusが配列として初期化されている', () => {
            expect(Array.isArray(g_pureStatus)).toBe(true);
        });

        it('g_bonusStatusが配列として初期化されている', () => {
            expect(Array.isArray(g_bonusStatus)).toBe(true);
        });

        it('基本ステータス定数が定義されている', () => {
            expect(typeof g_STR).toBe('number');
            expect(typeof g_AGI).toBe('number');
            expect(typeof g_VIT).toBe('number');
            expect(typeof g_INT).toBe('number');
            expect(typeof g_DEX).toBe('number');
            expect(typeof g_LUK).toBe('number');
        });

        it('基本ステータスが初期値0で設定されている', () => {
            expect(g_STR).toBe(0);
            expect(g_AGI).toBe(0);
            expect(g_VIT).toBe(0);
            expect(g_INT).toBe(0);
            expect(g_DEX).toBe(0);
            expect(g_LUK).toBe(0);
        });
    });

    describe('特性ステータスの初期化', () => {
        it('特性ステータス定数が定義されている', () => {
            expect(typeof g_POW).toBe('number');
            expect(typeof g_STA).toBe('number');
            expect(typeof g_WIS).toBe('number');
            expect(typeof g_SPL).toBe('number');
            expect(typeof g_CON).toBe('number');
            expect(typeof g_CRT).toBe('number');
        });

        it('特性ステータスが初期値0で設定されている', () => {
            expect(g_POW).toBe(0);
            expect(g_STA).toBe(0);
            expect(g_WIS).toBe(0);
            expect(g_SPL).toBe(0);
            expect(g_CON).toBe(0);
            expect(g_CRT).toBe(0);
        });

        it('全てのステータスが数値型である', () => {
            const allStatus = [g_STR, g_AGI, g_VIT, g_INT, g_DEX, g_LUK,
                g_POW, g_STA, g_WIS, g_SPL, g_CON, g_CRT];
            allStatus.forEach(status => {
                expect(typeof status).toBe('number');
            });
        });
    });

    describe('関数の定義確認', () => {
        it('RebuildStatusSelectが関数として定義されている', () => {
            expect(typeof RebuildStatusSelect).toBe('function');
        });

        it('CalcStatusPointが関数として定義されている', () => {
            expect(typeof CalcStatusPoint).toBe('function');
        });
    });

    describe('ステータス値の範囲確認', () => {
        it('基本ステータスが有効な範囲にある', () => {
            const basicStatus = [g_STR, g_AGI, g_VIT, g_INT, g_DEX, g_LUK];
            basicStatus.forEach(status => {
                expect(status).toBeGreaterThanOrEqual(0);
                expect(status).toBeLessThanOrEqual(999); // 最大値の仮定
            });
        });

        it('特性ステータスが有効な範囲にある', () => {
            const specialStatus = [g_POW, g_STA, g_WIS, g_SPL, g_CON, g_CRT];
            specialStatus.forEach(status => {
                expect(status).toBeGreaterThanOrEqual(0);
                expect(status).toBeLessThanOrEqual(999); // 最大値の仮定
            });
        });
    });

    describe('ステータス配列の整合性', () => {
        it('g_pureStatusおよびg_bonusStatusが存在する', () => {
            expect(g_pureStatus).toBeDefined();
            expect(g_bonusStatus).toBeDefined();
        });

        it('ステータス配列が正の数値を含むか確認できる', () => {
            // 初期化後、配列は0か正の値を含むはず
            if (g_pureStatus.length > 0) {
                g_pureStatus.forEach(value => {
                    expect(typeof value).toBe('number');
                    expect(value).toBeGreaterThanOrEqual(0);
                });
            }
        });
    });
});
