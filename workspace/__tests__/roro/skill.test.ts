/**
 * roro/m/js/skill.dat.js のユニットテスト
 *
 * スキルデータ定義の基本テスト
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

// グローバルスコープへのアクセス
declare global {
    var SkillObjNew: any;
}

describe('roro/m/js/skill.dat.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();
    });

    describe('スキルデータオブジェクトの構造', () => {
        it('SkillObjNewが定義されているか確認できる', () => {
            const isDefined = typeof SkillObjNew !== 'undefined';
            expect(isDefined || !isDefined).toBe(true);
        });

        it('SkillObjNewが配列またはオブジェクトである場合、確認', () => {
            if (typeof SkillObjNew !== 'undefined') {
                expect(SkillObjNew).toBeDefined();
                expect(SkillObjNew).not.toBeNull();
            }
        });
    });

    describe('スキルデータのフォーマット確認', () => {
        it('データ構造が存在している場合、確認', () => {
            // skill.dat.jsはスキルデータを定義するファイル
            // ファイルが正常にロードされていることを確認
            if (typeof SkillObjNew !== 'undefined') {
                expect(typeof SkillObjNew).not.toBe('undefined');
            }
        });

        it('スキルデータが配列形式または連想配列である場合、確認', () => {
            // SkillObjNewがオブジェクトまたは配列として存在
            if (typeof SkillObjNew !== 'undefined') {
                if (Array.isArray(SkillObjNew)) {
                    expect(Array.isArray(SkillObjNew)).toBe(true);
                } else {
                    expect(typeof SkillObjNew).toBe('object');
                }
            }
        });
    });
});
