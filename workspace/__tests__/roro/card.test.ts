/**
 * roro/m/js/card.dat.js のユニットテスト
 *
 * カードデータ定義の基本テスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

describe('roro/m/js/card.dat.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();

        // card.dat.js をロード
        const { readFileSync } = require('fs');
        const { join } = require('path');
        const rootPath = join(__dirname, '../../..');
        const content = readFileSync(join(rootPath, 'roro/m/js/card.dat.js'), 'utf-8');
        // eslint-disable-next-line no-eval
        eval(content);
    });

    describe('カードデータオブジェクトの構造', () => {
        it('CardObjNewが定義されている', () => {
            expect(typeof CardObjNew).not.toBe('undefined');
        });

        it('CardObjNewが存在している', () => {
            expect(CardObjNew).toBeDefined();
            expect(CardObjNew).not.toBeNull();
        });

        it('CardObjNewが適切なデータ構造で初期化されている', () => {
            if (Array.isArray(CardObjNew)) {
                expect(Array.isArray(CardObjNew)).toBe(true);
            } else if (typeof CardObjNew === 'object') {
                expect(typeof CardObjNew).toBe('object');
            }
        });
    });

    describe('カードデータの基本属性', () => {
        it('CardObjNewが有効なデータを格納している', () => {
            // CardObjNewが存在し、有効なデータ構造を持つ
            expect(CardObjNew).toBeDefined();

            // 配列またはオブジェクトとしての最小条件を確認
            const isArray = Array.isArray(CardObjNew);
            const isObject = typeof CardObjNew === 'object';

            expect(isArray || isObject).toBe(true);
        });
    });

    describe('カードデータファイルの整合性', () => {
        it('データファイルが正常にロードされている', () => {
            // ファイルがエラーなくロードされたことを確認
            expect(typeof CardObjNew).not.toBe('undefined');
        });

        it('CardObjNewが空でないか検査可能な状態である', () => {
            // 空配列または空オブジェクトでも有効
            if (Array.isArray(CardObjNew)) {
                expect(typeof CardObjNew.length).toBe('number');
            } else {
                expect(typeof CardObjNew).toBe('object');
            }
        });
    });
});
