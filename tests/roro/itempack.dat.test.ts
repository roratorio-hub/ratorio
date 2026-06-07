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
});
