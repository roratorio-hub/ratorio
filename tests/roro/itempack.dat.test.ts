import { describe, it, expect } from 'vitest';
import {
    ITEM_PACK_ID_NONE, ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU, ITEM_PACK_ID_JOB_PACKAGE_TENKATSUKYU,
    ITEM_PACK_ID_JOB_PACKAGE_SHOZYOKYU, ITEM_PACK_ID_JOB_PACKAGE_ZINBAKYU,
    ITEM_PACK_ID_JOB_PACKAGE_HOBINKYU, ITEM_PACK_ID_JOB_PACKAGE_KYOKAIKYU,
    ITEM_PACK_ID_JOB_PACKAGE_HAKUYOKYU, ITEM_PACK_ID_JOB_PACKAGE_MAKATSUKYU,
    ITEM_PACK_ID_JOB_PACKAGE_SHISHIKYU, ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_MINSTREL,
    ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_WANDERER, ITEM_PACK_ID_JOB_PACKAGE_SOGYOKYU,
    ITEM_PACK_ID_JOB_PACKAGE_KINGYUKYU, ITEM_PACK_ID_JOB_PACKAGE_STAR_EMPEROR,
    ITEM_PACK_ID_JOB_PACKAGE_SOUL_REAPER, ITEM_PACK_ID_JOB_PACKAGE_SUMMONER,
    ITEM_PACK_ID_MIMIMI, ITEM_PACK_ID_GRAY_WOLF_PHYSICAL, ITEM_PACK_ID_GRAY_WOLF_MAGICAL,
    ITEM_PACK_ID_SEKKA_PHYSICAL, ITEM_PACK_ID_SEKKA_MAGICAL,
    ITEM_PACK_ID_CLEAR_EQUIP_ALL, ITEM_PACK_ID_CLEAR_REFINE_ALL,
    ITEM_PACK_ID_CLEAR_CARD_ALL, ITEM_PACK_ID_CLEAR_SHADOW_ALL,
    ItemPackOBJ,
} from '@roro/itempack.dat.js';

describe('itempack.dat.js', () => {
    describe('エクスポート確認', () => {
        it('ITEM_PACK_ID_NONE が 0',                        () => expect(ITEM_PACK_ID_NONE).toBe(0));
        it('ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU が 1',       () => expect(ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU).toBe(1));
        it('ITEM_PACK_ID_JOB_PACKAGE_SUMMONER が 16',       () => expect(ITEM_PACK_ID_JOB_PACKAGE_SUMMONER).toBe(16));
        it('ITEM_PACK_ID_MIMIMI が 17',                     () => expect(ITEM_PACK_ID_MIMIMI).toBe(17));
        it('ITEM_PACK_ID_CLEAR_EQUIP_ALL が 23',            () => expect(ITEM_PACK_ID_CLEAR_EQUIP_ALL).toBe(23));
        it('ITEM_PACK_ID_CLEAR_SHADOW_ALL が 26',           () => expect(ITEM_PACK_ID_CLEAR_SHADOW_ALL).toBe(26));
        it('ItemPackOBJ が配列',                            () => expect(Array.isArray(ItemPackOBJ)).toBe(true));
        it('ItemPackOBJ が 27 件',                          () => expect(ItemPackOBJ).toHaveLength(27));
        it('ItemPackOBJ[0][0] が 0（選択なし）',             () => expect(ItemPackOBJ[0][0]).toBe(0));
        it('ItemPackOBJ[1][0] が 1（天秤宮）',              () => expect(ItemPackOBJ[1][0]).toBe(1));
    });

    describe('window互換確認', () => {
        it('window.ITEM_PACK_ID_NONE',                        () => expect((window as any).ITEM_PACK_ID_NONE).toBe(ITEM_PACK_ID_NONE));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU',       () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_TENKATSUKYU',     () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_TENKATSUKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_TENKATSUKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SHOZYOKYU',       () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SHOZYOKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_SHOZYOKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_ZINBAKYU',        () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_ZINBAKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_ZINBAKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_HOBINKYU',        () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_HOBINKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_HOBINKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_KYOKAIKYU',       () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_KYOKAIKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_KYOKAIKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_HAKUYOKYU',       () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_HAKUYOKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_HAKUYOKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_MAKATSUKYU',      () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_MAKATSUKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_MAKATSUKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SHISHIKYU',       () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SHISHIKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_SHISHIKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_MINSTREL', () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_MINSTREL).toBe(ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_MINSTREL));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_WANDERER', () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_WANDERER).toBe(ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_WANDERER));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SOGYOKYU',        () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SOGYOKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_SOGYOKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_KINGYUKYU',       () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_KINGYUKYU).toBe(ITEM_PACK_ID_JOB_PACKAGE_KINGYUKYU));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_STAR_EMPEROR',    () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_STAR_EMPEROR).toBe(ITEM_PACK_ID_JOB_PACKAGE_STAR_EMPEROR));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SOUL_REAPER',     () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SOUL_REAPER).toBe(ITEM_PACK_ID_JOB_PACKAGE_SOUL_REAPER));
        it('window.ITEM_PACK_ID_JOB_PACKAGE_SUMMONER',        () => expect((window as any).ITEM_PACK_ID_JOB_PACKAGE_SUMMONER).toBe(ITEM_PACK_ID_JOB_PACKAGE_SUMMONER));
        it('window.ITEM_PACK_ID_MIMIMI',                      () => expect((window as any).ITEM_PACK_ID_MIMIMI).toBe(ITEM_PACK_ID_MIMIMI));
        it('window.ITEM_PACK_ID_GRAY_WOLF_PHYSICAL',          () => expect((window as any).ITEM_PACK_ID_GRAY_WOLF_PHYSICAL).toBe(ITEM_PACK_ID_GRAY_WOLF_PHYSICAL));
        it('window.ITEM_PACK_ID_GRAY_WOLF_MAGICAL',           () => expect((window as any).ITEM_PACK_ID_GRAY_WOLF_MAGICAL).toBe(ITEM_PACK_ID_GRAY_WOLF_MAGICAL));
        it('window.ITEM_PACK_ID_SEKKA_PHYSICAL',              () => expect((window as any).ITEM_PACK_ID_SEKKA_PHYSICAL).toBe(ITEM_PACK_ID_SEKKA_PHYSICAL));
        it('window.ITEM_PACK_ID_SEKKA_MAGICAL',               () => expect((window as any).ITEM_PACK_ID_SEKKA_MAGICAL).toBe(ITEM_PACK_ID_SEKKA_MAGICAL));
        it('window.ITEM_PACK_ID_CLEAR_EQUIP_ALL',             () => expect((window as any).ITEM_PACK_ID_CLEAR_EQUIP_ALL).toBe(ITEM_PACK_ID_CLEAR_EQUIP_ALL));
        it('window.ITEM_PACK_ID_CLEAR_REFINE_ALL',            () => expect((window as any).ITEM_PACK_ID_CLEAR_REFINE_ALL).toBe(ITEM_PACK_ID_CLEAR_REFINE_ALL));
        it('window.ITEM_PACK_ID_CLEAR_CARD_ALL',              () => expect((window as any).ITEM_PACK_ID_CLEAR_CARD_ALL).toBe(ITEM_PACK_ID_CLEAR_CARD_ALL));
        it('window.ITEM_PACK_ID_CLEAR_SHADOW_ALL',            () => expect((window as any).ITEM_PACK_ID_CLEAR_SHADOW_ALL).toBe(ITEM_PACK_ID_CLEAR_SHADOW_ALL));
        it('window.ItemPackOBJ',                              () => expect((window as any).ItemPackOBJ).toBe(ItemPackOBJ));
    });
});
