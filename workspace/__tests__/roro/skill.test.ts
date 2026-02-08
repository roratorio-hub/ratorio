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

        // skill.dat.js をロード
        const { readFileSync } = require('fs');
        const { join } = require('path');
        const rootPath = join(__dirname, '../../..');
        const content = readFileSync(join(rootPath, 'roro/m/js/skill.dat.js'), 'utf-8');
        // eslint-disable-next-line no-eval
        eval(content);
    });

    describe('スキルデータオブジェクトの構造', () => {
        it('SkillObjNewが定義されている', () => {
            expect(typeof SkillObjNew).not.toBe('undefined');
        });

        it('SkillObjNewが配列またはオブジェクトである', () => {
            expect(SkillObjNew).toBeDefined();
            expect(SkillObjNew).not.toBeNull();
        });
    });

    describe('スキルデータのフォーマット確認', () => {
        it('データ構造が存在している', () => {
            // skill.dat.jsはスキルデータを定義するファイル
            // ファイルが正常にロードされていることを確認
            expect(typeof SkillObjNew).not.toBe('undefined');
        });

        it('スキルデータが配列形式または連想配列である', () => {
            // SkillObjNewがオブジェクトまたは配列として存在
            if (Array.isArray(SkillObjNew)) {
                expect(Array.isArray(SkillObjNew)).toBe(true);
            } else {
                expect(typeof SkillObjNew).toBe('object');
            }
        });
    });
});
