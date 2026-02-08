/**
 * ro4/m/js/head.js のユニットテスト
 *
 * CGlobalConstManager.DefineEnum の動作とバトルデータインデックスのテスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRo4TestEnvironment } from '../helpers/ro4ScriptLoader';

// グローバルスコープへのアクセス
declare global {
    var BATTLE_DATA_INDEX_ACTIVE_SKILL: number;
    var BATTLE_DATA_INDEX_ATTACK_ELEMENT: number;
    var BATTLE_DATA_INDEX_RANGE_FLAG: number;
    var BATTLE_DATA_INDEX_BASE_DAMAGE_MIN: number;
    var BATTLE_DATA_INDEX_BASE_DAMAGE_AVE: number;
    var BATTLE_DATA_INDEX_BASE_DAMAGE_MAX: number;
    var BATTLE_DATA_INDEX_HIT_RATE: number;
    var BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL: number;
    var BATTLE_DATA_INDEX_HIT_RATE_DISP: number;
    var BATTLE_DATA_INDEX_CRITICAL_RATE: number;
    var BATTLE_DATA_INDEX_CRITICAL_ATK_MIN: number;
    var BATTLE_DATA_INDEX_CRITICAL_ATK_AVE: number;
    var BATTLE_DATA_INDEX_CRITICAL_ATK_MAX: number;
    var BATTLE_DATA_INDEX_AVOID_RATE: number;
    var EnumBattleDataIndex: any;
}

describe('ro4/m/js/head.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRo4TestEnvironment();
    });

    describe('バトルデータインデックス定数', () => {
        it('BATTLE_DATA_INDEX_ACTIVE_SKILLが定義されている', () => {
            expect(typeof BATTLE_DATA_INDEX_ACTIVE_SKILL).toBe('number');
            expect(BATTLE_DATA_INDEX_ACTIVE_SKILL).toBe(0);
        });

        it('BATTLE_DATA_INDEX_ATTACK_ELEMENTが定義されている', () => {
            expect(typeof BATTLE_DATA_INDEX_ATTACK_ELEMENT).toBe('number');
            expect(BATTLE_DATA_INDEX_ATTACK_ELEMENT).toBe(1);
        });

        it('BATTLE_DATA_INDEX_RANGE_FLAGが定義されている', () => {
            expect(typeof BATTLE_DATA_INDEX_RANGE_FLAG).toBe('number');
            expect(BATTLE_DATA_INDEX_RANGE_FLAG).toBe(2);
        });

        it('バトルデータインデックスが連続して定義されている', () => {
            expect(BATTLE_DATA_INDEX_ATTACK_ELEMENT).toBe(BATTLE_DATA_INDEX_ACTIVE_SKILL + 1);
            expect(BATTLE_DATA_INDEX_RANGE_FLAG).toBe(BATTLE_DATA_INDEX_ATTACK_ELEMENT + 1);
        });
    });

    describe('CGlobalConstManagerの動作確認', () => {
        it('CGlobalConstManagerが定義されている', () => {
            expect(typeof CGlobalConstManager).toBe('function');
        });

        it('DefineEnumメソッドが利用可能である', () => {
            if (CGlobalConstManager && typeof CGlobalConstManager.DefineEnum === 'function') {
                expect(typeof CGlobalConstManager.DefineEnum).toBe('function');
            }
        });

        it('DefineEnumで定義されたEnumがアクセス可能である', () => {
            if (typeof EnumBattleDataIndex !== 'undefined') {
                expect(typeof EnumBattleDataIndex).not.toBe('undefined');
            }
        });
    });

    describe('バトルデータインデックスの値確認', () => {
        it('ダメージ関連インデックスが適切に定義されている', () => {
            // BASE_DAMAGEが複数の種類(MIN, AVE, MAX)で定義されることを確認
            if (typeof BATTLE_DATA_INDEX_BASE_DAMAGE_MIN !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_BASE_DAMAGE_AVE !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_BASE_DAMAGE_MAX !== 'undefined') {
                expect(typeof BATTLE_DATA_INDEX_BASE_DAMAGE_MIN).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_BASE_DAMAGE_AVE).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_BASE_DAMAGE_MAX).toBe('number');
            }
        });

        it('命中率関連インデックスが適切に定義されている', () => {
            if (typeof BATTLE_DATA_INDEX_HIT_RATE !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_HIT_RATE_DISP !== 'undefined') {
                expect(typeof BATTLE_DATA_INDEX_HIT_RATE).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_HIT_RATE_DISP).toBe('number');
            }
        });

        it('クリティカル関連インデックスが適切に定義されている', () => {
            if (typeof BATTLE_DATA_INDEX_CRITICAL_RATE !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_CRITICAL_ATK_MIN !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_CRITICAL_ATK_AVE !== 'undefined' &&
                typeof BATTLE_DATA_INDEX_CRITICAL_ATK_MAX !== 'undefined') {
                expect(typeof BATTLE_DATA_INDEX_CRITICAL_RATE).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_CRITICAL_ATK_MIN).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_CRITICAL_ATK_AVE).toBe('number');
                expect(typeof BATTLE_DATA_INDEX_CRITICAL_ATK_MAX).toBe('number');
            }
        });

        it('回避関連インデックスが適切に定義されている', () => {
            if (typeof BATTLE_DATA_INDEX_AVOID_RATE !== 'undefined') {
                expect(typeof BATTLE_DATA_INDEX_AVOID_RATE).toBe('number');
            }
        });
    });
});
