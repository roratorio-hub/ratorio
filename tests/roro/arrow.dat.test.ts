import { describe, it, expect } from 'vitest';
import {
    ARROW_ID_NONE, ARROW_ID_YA, ARROW_ID_TETSUNO_YA, ARROW_ID_KOTETSUNO_YA,
    ARROW_ID_ORIDEOKONNO_YA, ARROW_ID_KARYUDONO_YA, ARROW_ID_ELFNO_YA,
    ARROW_ID_SUISHONO_YA, ARROW_ID_GANSEKINO_YA, ARROW_ID_HONOONO_YA,
    ARROW_ID_KAZENO_YA, ARROW_ID_SABITA_YA, ARROW_ID_GINNO_YA, ARROW_ID_HAMAYA,
    ARROW_ID_SEINARU_YA, ARROW_ID_KAGEYA, ARROW_ID_MUKEINO_YA,
    ARROW_ID_ZOKUSE_ZIDO_YA_ATK30, ARROW_ID_SURUDOI_YA, ARROW_ID_CURSE_ARROW,
    ARROW_ID_SILENCE_ARROW, ARROW_ID_SLEEP_ARROW, ARROW_ID_FLASH_ARROW,
    ARROW_ID_KORINO_YA, ARROW_ID_DOKUYA, ARROW_ID_ATK1NO_YA, ARROW_ID_BULLET,
    ARROW_ID_BLOOD_BULLET_C, ARROW_ID_AP_BULLET, ARROW_ID_ICE_BULLET,
    ARROW_ID_FREEZING_BULLET, ARROW_ID_MAGICAL_STONE_BULLET, ARROW_ID_FLARE_BULLET,
    ARROW_ID_BLAZE_BULLET, ARROW_ID_LIGHTNING_BULLET, ARROW_ID_ELECTRIC_BULLET,
    ARROW_ID_POISON_BULLET, ARROW_ID_SILVER_BULLET_C, ARROW_ID_SUNCTFIED_BULLET,
    ARROW_ID_BLIND_BULLET,
    ArrowOBJNew,
} from '@roro/arrow.dat.js';

describe('arrow.dat.js', () => {
    describe('エクスポート確認', () => {
        it('ARROW_ID_NONE が 0',             () => expect(ARROW_ID_NONE).toBe(0));
        it('ARROW_ID_YA が 1',               () => expect(ARROW_ID_YA).toBe(1));
        it('ARROW_ID_BULLET が 26',          () => expect(ARROW_ID_BULLET).toBe(26));
        it('ARROW_ID_BLIND_BULLET が 39',    () => expect(ARROW_ID_BLIND_BULLET).toBe(39));
        it('ArrowOBJNew が配列',             () => expect(Array.isArray(ArrowOBJNew)).toBe(true));
        it('ArrowOBJNew が 40 件',           () => expect(ArrowOBJNew).toHaveLength(40));
        it('ArrowOBJNew[0][0] が 0',         () => expect(ArrowOBJNew[0][0]).toBe(0));
        it('ArrowOBJNew[1][0] が 1',         () => expect(ArrowOBJNew[1][0]).toBe(1));
        it('ArrowOBJNew[26][0] が 26（バレット）', () => expect(ArrowOBJNew[26][0]).toBe(26));
        it('ArrowOBJNew[39][0] が 39（最後）',    () => expect(ArrowOBJNew[39][0]).toBe(39));
    });
});
