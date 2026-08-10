import { describe, it, expect } from 'vitest';
import { AUTO_SPELL_ID_CUSTOM_BIAS, GetAutoSpellTriggerText } from '@roro/autospell.h.js';

describe('autospell.h.js', () => {

    describe('エクスポート確認', () => {
        it('AUTO_SPELL_ID_CUSTOM_BIAS が 20000', () => {
            expect(AUTO_SPELL_ID_CUSTOM_BIAS).toBe(20000);
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
});
