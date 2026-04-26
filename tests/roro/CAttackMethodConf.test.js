// CGlobalConstManager を先にインポートして window.CGlobalConstManager を確立する。
// CAttackMethodConf.js はモジュール評価時に CGlobalConstManager.DefineEnum() を
// グローバル参照で呼び出すため、このインポート順序が必須。
import '../../roro/m/js/CGlobalConstManager.js';
import { describe, it, expect, beforeEach } from 'vitest';
import { CAttackMethodConf } from '../../roro/m/js/CAttackMethodConf.js';

describe('CAttackMethodConf', () => {
    let conf;

    beforeEach(() => {
        conf = new CAttackMethodConf();
    });

    it('デフォルト値で初期化される', () => {
        expect(conf.GetSkillId()).toBe(0);
        expect(conf.GetSourceType()).toBe(0);
        expect(conf.GetSkillLv()).toBe(0);
        expect(conf.GetOptionValueCount()).toBe(0);
    });

    it('SetSkillId は文字列を整数に変換して保持する', () => {
        conf.SetSkillId('42');
        expect(conf.GetSkillId()).toBe(42);
    });

    it('SetSkillLv は文字列を整数に変換して保持する', () => {
        conf.SetSkillLv('5');
        expect(conf.GetSkillLv()).toBe(5);
    });

    it('SetSourceType で攻撃手段ソース種別を設定できる', () => {
        conf.SetSourceType(2);
        expect(conf.GetSourceType()).toBe(2);
    });

    it('SetOptionValue でオプション値を整数変換して保持する', () => {
        conf.SetOptionValue(0, '100');
        expect(conf.GetOptionValue(0)).toBe(100);
        expect(conf.GetOptionValueCount()).toBe(1);
    });

    it('範囲外インデックスの GetOptionValue は 0 を返す', () => {
        expect(conf.GetOptionValue(99)).toBe(0);
    });

    it('SetOptionValueArray で複数のオプション値を整数変換して保持する', () => {
        conf.SetOptionValueArray(['1', '2', '3']);
        expect(conf.GetOptionValueCount()).toBe(3);
        expect(conf.GetOptionValue(0)).toBe(1);
        expect(conf.GetOptionValue(2)).toBe(3);
    });

    it('Clone でオリジナルと独立したコピーを生成する', () => {
        conf.SetSkillId(7);
        conf.SetSkillLv(3);
        conf.SetSourceType(1);
        conf.SetOptionValueArray([10, 20]);

        const clone = conf.Clone();

        expect(clone.GetSkillId()).toBe(7);
        expect(clone.GetSkillLv()).toBe(3);
        expect(clone.GetSourceType()).toBe(1);
        expect(clone.GetOptionValue(0)).toBe(10);
        expect(clone.GetOptionValue(1)).toBe(20);

        // クローンを変更してもオリジナルに影響しない
        clone.SetSkillId(99);
        clone.SetOptionValueArray([99]);
        expect(conf.GetSkillId()).toBe(7);
        expect(conf.GetOptionValue(0)).toBe(10);
    });

    it('window 互換ブロックで window.CAttackMethodConf が設定される', () => {
        expect(window.CAttackMethodConf).toBe(CAttackMethodConf);
    });
});
