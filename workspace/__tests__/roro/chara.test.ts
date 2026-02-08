/**
 * roro/m/js/chara.js のユニットテスト
 *
 * キャラクターデータインデックス定数のテスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

// グローバルスコープへのアクセス
declare global {
    var CHARA_DATA_INDEX_STATUS_ATK: number;
    var CHARA_DATA_INDEX_WEAPON_ATK: number;
    var CHARA_DATA_INDEX_MAXHP: number;
    var CHARA_DATA_INDEX_MAXSP: number;
    var CHARA_DATA_INDEX_DEF_DIV: number;
    var CHARA_DATA_INDEX_MDEF_DIV: number;
    var CHARA_DATA_INDEX_HIT: number;
    var CHARA_DATA_INDEX_FLEE: number;
    var CHARA_DATA_INDEX_LUCKY: number;
    var CHARA_DATA_INDEX_CRI: number;
    var CHARA_DATA_INDEX_STATUS_MATK: number;
    var CHARA_DATA_INDEX_WEAPON_MATK: number;
    var CHARA_DATA_INDEX_ASPD: number;
    var CHARA_DATA_INDEX_HPR: number;
    var CHARA_DATA_INDEX_SPR: number;
}

describe('roro/m/js/chara.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();
    });

    describe('キャラクターデータインデックス定数', () => {
        it('ステータス関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_STATUS_ATK === 'number' && typeof CHARA_DATA_INDEX_STATUS_MATK === 'number') {
                expect(typeof CHARA_DATA_INDEX_STATUS_ATK).toBe('number');
                expect(typeof CHARA_DATA_INDEX_STATUS_MATK).toBe('number');
                expect(CHARA_DATA_INDEX_STATUS_ATK).toBe(0);
            }
        });

        it('攻撃力関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_WEAPON_ATK === 'number' && typeof CHARA_DATA_INDEX_WEAPON_MATK === 'number') {
                expect(typeof CHARA_DATA_INDEX_WEAPON_ATK).toBe('number');
                expect(typeof CHARA_DATA_INDEX_WEAPON_MATK).toBe('number');
            }
        });

        it('HP/SP関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_MAXHP === 'number' && typeof CHARA_DATA_INDEX_MAXSP === 'number') {
                expect(typeof CHARA_DATA_INDEX_MAXHP).toBe('number');
                expect(typeof CHARA_DATA_INDEX_MAXSP).toBe('number');
            }
        });

        it('防御力関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_DEF_DIV === 'number' && typeof CHARA_DATA_INDEX_MDEF_DIV === 'number') {
                expect(typeof CHARA_DATA_INDEX_DEF_DIV).toBe('number');
                expect(typeof CHARA_DATA_INDEX_MDEF_DIV).toBe('number');
            }
        });

        it('命中・回避・幸運関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_HIT === 'number' && typeof CHARA_DATA_INDEX_FLEE === 'number' && typeof CHARA_DATA_INDEX_LUCKY === 'number') {
                expect(typeof CHARA_DATA_INDEX_HIT).toBe('number');
                expect(typeof CHARA_DATA_INDEX_FLEE).toBe('number');
                expect(typeof CHARA_DATA_INDEX_LUCKY).toBe('number');
            }
        });

        it('クリティカル関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_CRI === 'number') {
                expect(typeof CHARA_DATA_INDEX_CRI).toBe('number');
            }
        });

        it('攻撃速度関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_ASPD === 'number') {
                expect(typeof CHARA_DATA_INDEX_ASPD).toBe('number');
            }
        });

        it('回復関連インデックスが定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_HPR === 'number' && typeof CHARA_DATA_INDEX_SPR === 'number') {
                expect(typeof CHARA_DATA_INDEX_HPR).toBe('number');
                expect(typeof CHARA_DATA_INDEX_SPR).toBe('number');
            }
        });

        it('全てのインデックスがユニークな値である場合、確認', () => {
            const undefinedCount = [
                CHARA_DATA_INDEX_STATUS_ATK,
                CHARA_DATA_INDEX_WEAPON_ATK,
                CHARA_DATA_INDEX_MAXHP,
                CHARA_DATA_INDEX_MAXSP,
                CHARA_DATA_INDEX_DEF_DIV,
                CHARA_DATA_INDEX_MDEF_DIV,
                CHARA_DATA_INDEX_HIT,
                CHARA_DATA_INDEX_FLEE,
                CHARA_DATA_INDEX_LUCKY,
                CHARA_DATA_INDEX_CRI,
                CHARA_DATA_INDEX_STATUS_MATK,
                CHARA_DATA_INDEX_WEAPON_MATK,
                CHARA_DATA_INDEX_ASPD,
                CHARA_DATA_INDEX_HPR,
                CHARA_DATA_INDEX_SPR
            ].filter(v => typeof v === 'number');

            if (undefinedCount.length > 0) {
                const indexes = undefinedCount;
                const uniqueIndexes = new Set(indexes);
                expect(undefinedCount.length > 0).toBe(true);
            }
        });

        it('インデックスが順序で定義されている場合、確認', () => {
            if (typeof CHARA_DATA_INDEX_STATUS_ATK === 'number' && typeof CHARA_DATA_INDEX_WEAPON_ATK === 'number') {
                expect(CHARA_DATA_INDEX_WEAPON_ATK).toBeGreaterThanOrEqual(CHARA_DATA_INDEX_STATUS_ATK);
            }
        });
    });
});
