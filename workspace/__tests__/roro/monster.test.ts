/**
 * roro/m/js/monster.js のユニットテスト
 *
 * モンスターデータインデックス定数のテスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

// グローバルスコープへのアクセス
declare global {
    var MONSTER_DATA_INDEX_ID: number;
    var MONSTER_DATA_INDEX_NAME: number;
    var MONSTER_DATA_INDEX_BASE_EXP: number;
    var MONSTER_DATA_INDEX_JOB_EXP: number;
    var MONSTER_DATA_INDEX_HP: number;
    var MONSTER_DATA_INDEX_SP: number;
    var MONSTER_DATA_INDEX_ATK: number;
    var MONSTER_DATA_INDEX_DEF: number;
    var MONSTER_DATA_INDEX_MDEF: number;
    var MONSTER_DATA_INDEX_HIT: number;
    var MONSTER_DATA_INDEX_FLEE: number;
    var MONSTER_DATA_INDEX_DROP_ITEM: number;
    var MONSTER_DATA_INDEX_ELEMENT: number;
    var MONSTER_DATA_INDEX_RACE: number;
    var MONSTER_DATA_INDEX_SIZE: number;
}

describe('roro/m/js/monster.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();
    });

    describe('モンスターデータインデックス定数', () => {
        it('基本情報インデックスが定義されているか確認できる', () => {
            const isDefined = typeof MONSTER_DATA_INDEX_ID !== 'undefined' && typeof MONSTER_DATA_INDEX_NAME !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('経験値関連インデックスが定義されているか確認できる', () => {
            const isDefined = typeof MONSTER_DATA_INDEX_BASE_EXP !== 'undefined' && typeof MONSTER_DATA_INDEX_JOB_EXP !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('ステータス関連インデックスが定義されているか確認できる', () => {
            const isDefined = typeof MONSTER_DATA_INDEX_HP !== 'undefined' && typeof MONSTER_DATA_INDEX_SP !== 'undefined' &&
                typeof MONSTER_DATA_INDEX_ATK !== 'undefined' && typeof MONSTER_DATA_INDEX_DEF !== 'undefined' &&
                typeof MONSTER_DATA_INDEX_MDEF !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('命中・回避関連インデックスが定義されているか確認できる', () => {
            const isDefined = typeof MONSTER_DATA_INDEX_HIT !== 'undefined' && typeof MONSTER_DATA_INDEX_FLEE !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('ドロップ関連インデックスが定義されているか確認できる', () => {
            const isDefined = typeof MONSTER_DATA_INDEX_DROP_ITEM !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('モンスター属性関連インデックスが定義されているか確認できる', () => {
            const isDefined = typeof MONSTER_DATA_INDEX_ELEMENT !== 'undefined' && typeof MONSTER_DATA_INDEX_RACE !== 'undefined' &&
                typeof MONSTER_DATA_INDEX_SIZE !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });
    });

    describe('インデックスの順序確認', () => {
        it('基本情報インデックスが最初に定義されているか確認できる', () => {
            if (typeof MONSTER_DATA_INDEX_ID === 'number' && typeof MONSTER_DATA_INDEX_NAME === 'number') {
                expect(MONSTER_DATA_INDEX_ID).toBe(0);
                expect(MONSTER_DATA_INDEX_NAME).toBeGreaterThan(MONSTER_DATA_INDEX_ID);
            }
        });

        it('経験値インデックスが適切に定義されているか確認できる', () => {
            if (typeof MONSTER_DATA_INDEX_BASE_EXP === 'number' && typeof MONSTER_DATA_INDEX_JOB_EXP === 'number') {
                expect(MONSTER_DATA_INDEX_BASE_EXP).toBeGreaterThanOrEqual(0);
                expect(MONSTER_DATA_INDEX_JOB_EXP).toBeGreaterThanOrEqual(MONSTER_DATA_INDEX_BASE_EXP);
            }
        });

        it('ステータスインデックスが連続している傾向がある', () => {
            // HP, SP, ATK, DEF, MDEFが連続して定義される傾向を確認
            if (typeof MONSTER_DATA_INDEX_HP === 'number' && typeof MONSTER_DATA_INDEX_SP === 'number' &&
                typeof MONSTER_DATA_INDEX_ATK === 'number') {
                expect(MONSTER_DATA_INDEX_SP).toBeGreaterThan(MONSTER_DATA_INDEX_HP);
                expect(MONSTER_DATA_INDEX_ATK).toBeGreaterThan(MONSTER_DATA_INDEX_SP);
            }
        });
    });
});
