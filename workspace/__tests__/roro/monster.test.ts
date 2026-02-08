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

        // monster.js をロード
        const { readFileSync } = require('fs');
        const { join } = require('path');
        const rootPath = join(__dirname, '../../..');
        const content = readFileSync(join(rootPath, 'roro/m/js/monster.js'), 'utf-8');
        // eslint-disable-next-line no-eval
        eval(content);
    });

    describe('モンスターデータインデックス定数', () => {
        it('基本情報インデックスが定義されている', () => {
            expect(typeof MONSTER_DATA_INDEX_ID).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_NAME).toBe('number');
        });

        it('経験値関連インデックスが定義されている', () => {
            expect(typeof MONSTER_DATA_INDEX_BASE_EXP).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_JOB_EXP).toBe('number');
        });

        it('ステータス関連インデックスが定義されている', () => {
            expect(typeof MONSTER_DATA_INDEX_HP).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_SP).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_ATK).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_DEF).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_MDEF).toBe('number');
        });

        it('命中・回避関連インデックスが定義されている', () => {
            expect(typeof MONSTER_DATA_INDEX_HIT).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_FLEE).toBe('number');
        });

        it('ドロップ関連インデックスが定義されている', () => {
            expect(typeof MONSTER_DATA_INDEX_DROP_ITEM).toBe('number');
        });

        it('モンスター属性関連インデックスが定義されている', () => {
            expect(typeof MONSTER_DATA_INDEX_ELEMENT).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_RACE).toBe('number');
            expect(typeof MONSTER_DATA_INDEX_SIZE).toBe('number');
        });

        it('全てのインデックスが数値である', () => {
            const indexes = [
                MONSTER_DATA_INDEX_ID,
                MONSTER_DATA_INDEX_NAME,
                MONSTER_DATA_INDEX_BASE_EXP,
                MONSTER_DATA_INDEX_JOB_EXP,
                MONSTER_DATA_INDEX_HP,
                MONSTER_DATA_INDEX_SP,
                MONSTER_DATA_INDEX_ATK,
                MONSTER_DATA_INDEX_DEF,
                MONSTER_DATA_INDEX_MDEF,
                MONSTER_DATA_INDEX_HIT,
                MONSTER_DATA_INDEX_FLEE,
                MONSTER_DATA_INDEX_DROP_ITEM,
                MONSTER_DATA_INDEX_ELEMENT,
                MONSTER_DATA_INDEX_RACE,
                MONSTER_DATA_INDEX_SIZE
            ];

            indexes.forEach(index => {
                expect(typeof index).toBe('number');
                expect(index).toBeGreaterThanOrEqual(0);
            });
        });

        it('インデックスがユニークである', () => {
            const indexes = [
                MONSTER_DATA_INDEX_ID,
                MONSTER_DATA_INDEX_NAME,
                MONSTER_DATA_INDEX_BASE_EXP,
                MONSTER_DATA_INDEX_JOB_EXP,
                MONSTER_DATA_INDEX_HP,
                MONSTER_DATA_INDEX_SP,
                MONSTER_DATA_INDEX_ATK,
                MONSTER_DATA_INDEX_DEF,
                MONSTER_DATA_INDEX_MDEF,
                MONSTER_DATA_INDEX_HIT,
                MONSTER_DATA_INDEX_FLEE,
                MONSTER_DATA_INDEX_DROP_ITEM,
                MONSTER_DATA_INDEX_ELEMENT,
                MONSTER_DATA_INDEX_RACE,
                MONSTER_DATA_INDEX_SIZE
            ];

            const uniqueIndexes = new Set(indexes);
            expect(uniqueIndexes.size).toBe(indexes.length);
        });
    });

    describe('インデックスの順序確認', () => {
        it('基本情報インデックスが最初に定義されている', () => {
            expect(MONSTER_DATA_INDEX_ID).toBe(0);
            expect(MONSTER_DATA_INDEX_NAME).toBeGreaterThan(MONSTER_DATA_INDEX_ID);
        });

        it('経験値インデックスが適切に定義されている', () => {
            expect(MONSTER_DATA_INDEX_BASE_EXP).toBeGreaterThanOrEqual(0);
            expect(MONSTER_DATA_INDEX_JOB_EXP).toBeGreaterThanOrEqual(MONSTER_DATA_INDEX_BASE_EXP);
        });

        it('ステータスインデックスが連続している傾向がある', () => {
            // HP, SP, ATK, DEF, MDEFが連続して定義される傾向を確認
            expect(MONSTER_DATA_INDEX_SP).toBeGreaterThan(MONSTER_DATA_INDEX_HP);
            expect(MONSTER_DATA_INDEX_ATK).toBeGreaterThan(MONSTER_DATA_INDEX_SP);
        });
    });
});
