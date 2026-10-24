import { describe, it, expect, afterEach } from 'vitest';
import { ItemObjNew } from '@engine/equip/item.dat.js';
import { GetEquippedTotalSPEquipSub } from '@engine/status/equipped-sp.js';
import { ITEM_SP_SKILL_FIXED_TIME } from '@engine/const/EnumItemSpId.js';
import { EQUIP_REGION_ID_SHOES } from '@engine/const/EnumEquipRegionId.js';
import { set_n_A_Equip } from '@engine/runtime/roro-state.js';
import { set_n_A_BaseLV } from '@engine/runtime/ro4-state.js';

/** 名前からアイテムIDを引く（ItemObjNew[id][8] が名前）. */
function findItemId(name: string): number {
    const id = (ItemObjNew as any[]).findIndex((row) => row && row[8] === name);
    expect(id, `${name} が item.dat.js に登録されている`).toBeGreaterThan(0);
    return id;
}

/** 靴の装備欄だけにアイテムを装備した状態にする. */
function equipShoes(itemId: number) {
    const equip = new Array(EQUIP_REGION_ID_SHOES + 1).fill(0);
    equip[EQUIP_REGION_ID_SHOES] = itemId;
    set_n_A_Equip(equip);
}

describe('ディメンショナルブーツ（BaseLv285以上の条件）', () => {
    afterEach(() => {
        set_n_A_Equip([]);
        set_n_A_BaseLV(1);
    });

    const fixedCast = () => GetEquippedTotalSPEquipSub(ITEM_SP_SKILL_FIXED_TIME, false, false);

    it('ディメンショナルブーツ[1]（無印）は BaseLv285 で固定詠唱 -80%、BaseLv284 では効かない', () => {
        equipShoes(findItemId('ディメンショナルブーツ'));

        set_n_A_BaseLV(284);
        expect(fixedCast()).toBe(0);

        set_n_A_BaseLV(285);
        expect(fixedCast()).toBe(80);
    });

    it('他のディメンショナルブーツ（集中など）には BaseLv285 の固定詠唱効果が無い', () => {
        equipShoes(findItemId('ディメンショナルブーツ(集中)'));

        set_n_A_BaseLV(285);
        expect(fixedCast()).toBe(0);
    });
});
