import { describe, it, expect, afterEach } from 'vitest';
import { PET_OBJ } from '@engine/equip/pet.dat.js';
import { ITEM_SET_PET_ID_OFFSET, PetIdToSetIdMap, w_SE } from '@engine/equip/itemset.dat.js';
import { GetEquippedSPSubSPPet } from '@engine/status/equipped-sp.js';
import { n_A_PassSkill8 } from '@engine/skill/skillstate.js';
import { set_n_A_BaseLV } from '@engine/runtime/ro4-state.js';
import {
    ITEM_SP_LEARN_SKILL,
    ITEM_SP_RESIST_STATE_FROZEN,
    ITEM_SP_RESIST_STATE_R_CHILLED,
    ITEM_SP_RESIST_STATE_R_ICED,
} from '@engine/const/EnumItemSpId.js';

describe('pet.dat.js', () => {
    describe('PET_OBJ の添字とペットID', () => {
        // PET_OBJ[petId] で直接引かれるため、行の並びがずれると別のペットの能力が適用される
        it('各行の先頭の値（ペットID）がその行の添字と一致する', () => {
            PET_OBJ.forEach((row: any[], index: number) => {
                expect(row[0], `PET_OBJ[${index}] (${row[1]})`).toBe(index);
            });
        });
    });

    describe('ペットを含むセット定義', () => {
        const petIdOf = (memberId: number) => -memberId - ITEM_SET_PET_ID_OFFSET;
        const isPetMember = (memberId: number) => memberId <= -ITEM_SET_PET_ID_OFFSET;

        it('セットのメンバーに指定されたペットは PET_OBJ に存在し、そのペットの PetIdToSetIdMap にセットが登録されている', () => {
            let checked = 0;
            w_SE.forEach((set: number[], setId: number) => {
                for (const memberId of set.slice(2).filter(isPetMember)) {
                    const petId = petIdOf(memberId);
                    expect(PET_OBJ[petId], `w_SE[${setId}] のペット ${petId}`).toBeDefined();
                    expect(PetIdToSetIdMap[petId], `PetIdToSetIdMap[${petId}] に w_SE[${setId}] が無い`).toContain(setId);
                    checked++;
                }
            });
            expect(checked).toBeGreaterThan(0);   // 走査が空振りしていないこと
        });

        it('PetIdToSetIdMap に登録されたセットは、そのペットをメンバーに持つ', () => {
            PetIdToSetIdMap.forEach((setIds: number[], petId: number) => {
                for (const setId of setIds) {
                    const members = (w_SE[setId] ?? []).slice(2);
                    expect(members, `PetIdToSetIdMap[${petId}] の w_SE[${setId}]`).toContain(-(ITEM_SET_PET_ID_OFFSET + petId));
                }
            });
        });
    });

    describe('ペットの能力（BaseLv100以上でのみ有効）', () => {
        const findPet = (name: string) => PET_OBJ.findIndex((row: any[]) => row[1] === name);
        const withPet = (name: string, baseLv: number) => {
            n_A_PassSkill8[0] = findPet(name);
            set_n_A_BaseLV(baseLv);
        };
        const sum = (spId: number) => GetEquippedSPSubSPPet(spId, null, false);
        const list = (spId: number) => GetEquippedSPSubSPPet(spId, null, true);

        afterEach(() => {
            n_A_PassSkill8[0] = 0;
            set_n_A_BaseLV(1);
        });

        it('Sユンケア: BaseLv100以上で凍結・氷結・冷凍に完全耐性、エナジーコートLv1が使用可能', () => {
            withPet('Sユンケア', 100);
            expect(sum(ITEM_SP_RESIST_STATE_FROZEN)).toBe(100);
            expect(sum(ITEM_SP_RESIST_STATE_R_ICED)).toBe(100);
            expect(sum(ITEM_SP_RESIST_STATE_R_CHILLED)).toBe(100);
            expect(list(ITEM_SP_LEARN_SKILL)).toEqual([132]);   // 使用可能スキル(エナジーコート Lv1)
        });

        it('Sユンケア: BaseLv99では何も有効にならない', () => {
            withPet('Sユンケア', 99);
            expect(sum(ITEM_SP_RESIST_STATE_FROZEN)).toBe(0);
            expect(sum(ITEM_SP_RESIST_STATE_R_ICED)).toBe(0);
            expect(sum(ITEM_SP_RESIST_STATE_R_CHILLED)).toBe(0);
            expect(list(ITEM_SP_LEARN_SKILL)).toEqual([]);
        });

        it('ナハトズィーガー: BaseLv100以上でドレインライフLv5が使用可能、Lv99では不可', () => {
            withPet('ナハトズィーガー', 100);
            expect(list(ITEM_SP_LEARN_SKILL)).toEqual([195]);   // 使用可能スキル(ドレインライフ Lv5)
            withPet('ナハトズィーガー', 99);
            expect(list(ITEM_SP_LEARN_SKILL)).toEqual([]);
        });
    });

    describe('ワンダーエッグバスケットとのセット', () => {
        const BASKET_ITEM_ID = 4235;
        const BASKET_EFFECT_ID = 4236;

        it.each(['Sユンケア', 'ナハトズィーガー'])('%s はワンダーエッグバスケットとの組が共有の効果レコードで定義されている', (name) => {
            const petId = PET_OBJ.findIndex((row: any[]) => row[1] === name);
            expect(petId).toBeGreaterThan(0);
            const setIds: number[] = PetIdToSetIdMap[petId];
            expect(setIds).toHaveLength(1);
            expect(w_SE[setIds[0]]).toEqual([BASKET_EFFECT_ID, BASKET_ITEM_ID, -(ITEM_SET_PET_ID_OFFSET + petId)]);
        });
    });
});
