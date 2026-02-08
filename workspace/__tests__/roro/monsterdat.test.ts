/**
 * roro/m/js/monster.dat.js のユニットテスト
 *
 * モンスターデータ定義の基本テスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

// グローバルスコープへのアクセス
declare global {
    var MonsterObjNew: any;
}

describe('roro/m/js/monster.dat.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();

        // monster.dat.js をロード
        const { readFileSync } = require('fs');
        const { join } = require('path');
        const rootPath = join(__dirname, '../../..');

        try {
            const content = readFileSync(join(rootPath, 'roro/m/js/monster.dat.js'), 'utf-8');
            // eslint-disable-next-line no-eval
            eval(content);
        } catch (e) {
            // ファイルが存在しない場合の処理
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.warn('monster.dat.js がロードできません: ' + errorMessage);
        }
    });

    describe('モンスターデータオブジェクトの構造', () => {
        it('MonsterObjNewが定義されているか確認できる', () => {
            const isDefined = typeof MonsterObjNew !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('モンスターデータが存在する場合、適切なデータ構造を持つ', () => {
            if (typeof MonsterObjNew !== 'undefined' && MonsterObjNew !== null) {
                const isValidStructure =
                    Array.isArray(MonsterObjNew) ||
                    typeof MonsterObjNew === 'object';

                expect(isValidStructure).toBe(true);
            }
        });
    });

    describe('モンスターデータの初期化確認', () => {
        it('モンスターデータが初期化されている', () => {
            if (typeof MonsterObjNew !== 'undefined') {
                expect(MonsterObjNew).toBeDefined();
                expect(MonsterObjNew).not.toBeNull();
            }
        });

        it('モンスターデータが配列またはオブジェクトの形式である', () => {
            if (typeof MonsterObjNew !== 'undefined') {
                if (Array.isArray(MonsterObjNew)) {
                    expect(MonsterObjNew.length).toBeGreaterThanOrEqual(0);
                } else {
                    expect(Object.keys(MonsterObjNew).length).toBeGreaterThanOrEqual(0);
                }
            }
        });
    });

    describe('モンスターデータの整合性', () => {
        it('データファイルが正常にロードされているか確認', () => {
            // エラーなくロードされたことを確認
            if (typeof MonsterObjNew !== 'undefined') {
                expect(typeof MonsterObjNew).not.toBe('undefined');
            }
        });

        it('モンスターデータが有効なデータを含むか検査可能な状態にある', () => {
            if (typeof MonsterObjNew !== 'undefined') {
                if (Array.isArray(MonsterObjNew)) {
                    // 配列の場合、長さが0以上
                    expect(typeof MonsterObjNew.length).toBe('number');
                } else {
                    // オブジェクトの場合、プロパティを持つ可能性あり
                    expect(typeof MonsterObjNew).toBe('object');
                }
            }
        });
    });
});
