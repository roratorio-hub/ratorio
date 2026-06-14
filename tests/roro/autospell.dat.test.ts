import { describe, it, expect } from 'vitest';
import {
    AS_ID_0,
    AS_ID_HEAL_1,
    AS_ID_CHAIN_LIGHTNING_5,
    AutoSpellSkill,
} from '@roro/autospell.dat.js';

describe('autospell.dat.js', () => {
    describe('エクスポート確認', () => {
        it('AS_ID_0 が 0',                   () => expect(AS_ID_0).toBe(0));
        it('AS_ID_HEAL_1 が 13',             () => expect(AS_ID_HEAL_1).toBe(13));
        it('AS_ID_CHAIN_LIGHTNING_5 が 235', () => expect(AS_ID_CHAIN_LIGHTNING_5).toBe(235));
        it('AutoSpellSkill[0][0] が 0',       () => expect(AutoSpellSkill[0][0]).toBe(0));
        it('AutoSpellSkill[248][0] が 248（最後）', () => expect(AutoSpellSkill[248][0]).toBe(248));
    });
});
