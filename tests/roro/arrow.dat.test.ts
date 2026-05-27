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

    describe('window互換確認', () => {
        it('window.ARROW_ID_NONE',               () => expect((window as any).ARROW_ID_NONE).toBe(ARROW_ID_NONE));
        it('window.ARROW_ID_YA',                 () => expect((window as any).ARROW_ID_YA).toBe(ARROW_ID_YA));
        it('window.ARROW_ID_TETSUNO_YA',         () => expect((window as any).ARROW_ID_TETSUNO_YA).toBe(ARROW_ID_TETSUNO_YA));
        it('window.ARROW_ID_KOTETSUNO_YA',       () => expect((window as any).ARROW_ID_KOTETSUNO_YA).toBe(ARROW_ID_KOTETSUNO_YA));
        it('window.ARROW_ID_ORIDEOKONNO_YA',     () => expect((window as any).ARROW_ID_ORIDEOKONNO_YA).toBe(ARROW_ID_ORIDEOKONNO_YA));
        it('window.ARROW_ID_KARYUDONO_YA',       () => expect((window as any).ARROW_ID_KARYUDONO_YA).toBe(ARROW_ID_KARYUDONO_YA));
        it('window.ARROW_ID_ELFNO_YA',           () => expect((window as any).ARROW_ID_ELFNO_YA).toBe(ARROW_ID_ELFNO_YA));
        it('window.ARROW_ID_SUISHONO_YA',        () => expect((window as any).ARROW_ID_SUISHONO_YA).toBe(ARROW_ID_SUISHONO_YA));
        it('window.ARROW_ID_GANSEKINO_YA',       () => expect((window as any).ARROW_ID_GANSEKINO_YA).toBe(ARROW_ID_GANSEKINO_YA));
        it('window.ARROW_ID_HONOONO_YA',         () => expect((window as any).ARROW_ID_HONOONO_YA).toBe(ARROW_ID_HONOONO_YA));
        it('window.ARROW_ID_KAZENO_YA',          () => expect((window as any).ARROW_ID_KAZENO_YA).toBe(ARROW_ID_KAZENO_YA));
        it('window.ARROW_ID_SABITA_YA',          () => expect((window as any).ARROW_ID_SABITA_YA).toBe(ARROW_ID_SABITA_YA));
        it('window.ARROW_ID_GINNO_YA',           () => expect((window as any).ARROW_ID_GINNO_YA).toBe(ARROW_ID_GINNO_YA));
        it('window.ARROW_ID_HAMAYA',             () => expect((window as any).ARROW_ID_HAMAYA).toBe(ARROW_ID_HAMAYA));
        it('window.ARROW_ID_SEINARU_YA',         () => expect((window as any).ARROW_ID_SEINARU_YA).toBe(ARROW_ID_SEINARU_YA));
        it('window.ARROW_ID_KAGEYA',             () => expect((window as any).ARROW_ID_KAGEYA).toBe(ARROW_ID_KAGEYA));
        it('window.ARROW_ID_MUKEINO_YA',         () => expect((window as any).ARROW_ID_MUKEINO_YA).toBe(ARROW_ID_MUKEINO_YA));
        it('window.ARROW_ID_ZOKUSE_ZIDO_YA_ATK30', () => expect((window as any).ARROW_ID_ZOKUSE_ZIDO_YA_ATK30).toBe(ARROW_ID_ZOKUSE_ZIDO_YA_ATK30));
        it('window.ARROW_ID_SURUDOI_YA',         () => expect((window as any).ARROW_ID_SURUDOI_YA).toBe(ARROW_ID_SURUDOI_YA));
        it('window.ARROW_ID_CURSE_ARROW',        () => expect((window as any).ARROW_ID_CURSE_ARROW).toBe(ARROW_ID_CURSE_ARROW));
        it('window.ARROW_ID_SILENCE_ARROW',      () => expect((window as any).ARROW_ID_SILENCE_ARROW).toBe(ARROW_ID_SILENCE_ARROW));
        it('window.ARROW_ID_SLEEP_ARROW',        () => expect((window as any).ARROW_ID_SLEEP_ARROW).toBe(ARROW_ID_SLEEP_ARROW));
        it('window.ARROW_ID_FLASH_ARROW',        () => expect((window as any).ARROW_ID_FLASH_ARROW).toBe(ARROW_ID_FLASH_ARROW));
        it('window.ARROW_ID_KORINO_YA',          () => expect((window as any).ARROW_ID_KORINO_YA).toBe(ARROW_ID_KORINO_YA));
        it('window.ARROW_ID_DOKUYA',             () => expect((window as any).ARROW_ID_DOKUYA).toBe(ARROW_ID_DOKUYA));
        it('window.ARROW_ID_ATK1NO_YA',          () => expect((window as any).ARROW_ID_ATK1NO_YA).toBe(ARROW_ID_ATK1NO_YA));
        it('window.ARROW_ID_BULLET',             () => expect((window as any).ARROW_ID_BULLET).toBe(ARROW_ID_BULLET));
        it('window.ARROW_ID_BLOOD_BULLET_C',     () => expect((window as any).ARROW_ID_BLOOD_BULLET_C).toBe(ARROW_ID_BLOOD_BULLET_C));
        it('window.ARROW_ID_AP_BULLET',          () => expect((window as any).ARROW_ID_AP_BULLET).toBe(ARROW_ID_AP_BULLET));
        it('window.ARROW_ID_ICE_BULLET',         () => expect((window as any).ARROW_ID_ICE_BULLET).toBe(ARROW_ID_ICE_BULLET));
        it('window.ARROW_ID_FREEZING_BULLET',    () => expect((window as any).ARROW_ID_FREEZING_BULLET).toBe(ARROW_ID_FREEZING_BULLET));
        it('window.ARROW_ID_MAGICAL_STONE_BULLET', () => expect((window as any).ARROW_ID_MAGICAL_STONE_BULLET).toBe(ARROW_ID_MAGICAL_STONE_BULLET));
        it('window.ARROW_ID_FLARE_BULLET',       () => expect((window as any).ARROW_ID_FLARE_BULLET).toBe(ARROW_ID_FLARE_BULLET));
        it('window.ARROW_ID_BLAZE_BULLET',       () => expect((window as any).ARROW_ID_BLAZE_BULLET).toBe(ARROW_ID_BLAZE_BULLET));
        it('window.ARROW_ID_LIGHTNING_BULLET',   () => expect((window as any).ARROW_ID_LIGHTNING_BULLET).toBe(ARROW_ID_LIGHTNING_BULLET));
        it('window.ARROW_ID_ELECTRIC_BULLET',    () => expect((window as any).ARROW_ID_ELECTRIC_BULLET).toBe(ARROW_ID_ELECTRIC_BULLET));
        it('window.ARROW_ID_POISON_BULLET',      () => expect((window as any).ARROW_ID_POISON_BULLET).toBe(ARROW_ID_POISON_BULLET));
        it('window.ARROW_ID_SILVER_BULLET_C',    () => expect((window as any).ARROW_ID_SILVER_BULLET_C).toBe(ARROW_ID_SILVER_BULLET_C));
        it('window.ARROW_ID_SUNCTFIED_BULLET',   () => expect((window as any).ARROW_ID_SUNCTFIED_BULLET).toBe(ARROW_ID_SUNCTFIED_BULLET));
        it('window.ARROW_ID_BLIND_BULLET',       () => expect((window as any).ARROW_ID_BLIND_BULLET).toBe(ARROW_ID_BLIND_BULLET));
        it('window.ArrowOBJNew',                 () => expect((window as any).ArrowOBJNew).toBe(ArrowOBJNew));
    });
});
