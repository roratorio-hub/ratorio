import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import { AUTO_SPELL_ID_CUSTOM_BIAS, GetAutoSpellTriggerText } from '@roro/autospell.h.js';

describe('autospell.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('AUTO_SPELL_DATA_INDEX_ID が 0 に定義される', () => {
            expect((globalThis as any).AUTO_SPELL_DATA_INDEX_ID).toBe(0);
        });
        it('AUTO_SPELL_DATA_INDEX_SKILL_ID が 2 に定義される', () => {
            expect((globalThis as any).AUTO_SPELL_DATA_INDEX_SKILL_ID).toBe(2);
        });
        it('AUTO_SPELL_PROB_ESP が 0 に定義される', () => {
            expect((globalThis as any).AUTO_SPELL_PROB_ESP).toBe(0);
        });
        it('AUTO_SPELL_TRIGGER_UNKNOWN が 0 に定義される', () => {
            expect((globalThis as any).AUTO_SPELL_TRIGGER_UNKNOWN).toBe(0);
        });
        it('AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK が 1 に定義される', () => {
            expect((globalThis as any).AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK).toBe(1);
        });
        it('AUTO_SPELL_TRIGGER_ANY_DAMAGED が 10 に定義される', () => {
            expect((globalThis as any).AUTO_SPELL_TRIGGER_ANY_DAMAGED).toBe(10);
        });
    });

    describe('エクスポート確認', () => {
        it('AUTO_SPELL_ID_CUSTOM_BIAS が 20000', () => {
            expect(AUTO_SPELL_ID_CUSTOM_BIAS).toBe(20000);
        });
        it('GetAutoSpellTriggerText が関数', () => {
            expect(typeof GetAutoSpellTriggerText).toBe('function');
        });
        it('GetAutoSpellTriggerText(0) が特定条件の時', () => {
            expect(GetAutoSpellTriggerText(0)).toBe('特定条件の時');
        });
        it('GetAutoSpellTriggerText(1) が物理攻撃時', () => {
            expect(GetAutoSpellTriggerText(1)).toBe('物理攻撃時');
        });
        it('GetAutoSpellTriggerText(999) が不明', () => {
            expect(GetAutoSpellTriggerText(999)).toBe('不明');
        });
    });

    describe('window互換確認', () => {
        it('window.AUTO_SPELL_ID_CUSTOM_BIAS が設定されている', () => {
            expect((window as any).AUTO_SPELL_ID_CUSTOM_BIAS).toBe(AUTO_SPELL_ID_CUSTOM_BIAS);
        });
        it('window.GetAutoSpellTriggerText が設定されている', () => {
            expect((window as any).GetAutoSpellTriggerText).toBe(GetAutoSpellTriggerText);
        });
    });
});
