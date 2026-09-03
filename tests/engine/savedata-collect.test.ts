import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
// buildMobUnit() が CMonsterMapAreaComponentManager 経由でモンスターデータファイルを
// 参照するため、CSaveDataManager.test.ts と同じくモックして実データ読み込みを避ける
// （実データを読み込むと happy-dom 環境でヒープOOMになる。原因未特定・残件台帳 B-28 参照。
// import 前にモックを効かせる必要があるため savedata-collect.js の import より前に置く）。
vi.mock('@engine/monster/monstermap.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return {
        ...actual,
        MONSTER_MAP_ID_MAP_ALL: -1,
        get g_MonsterMapDataArray() { return []; },
        get g_MonsterMapCategoryDataArray() { return []; },
    };
});
vi.mock('@engine/monster/monster.dat.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get MonsterObjNew() { return []; } };
});

// buildSkillBuffSelfUnit() が g_constDataManager の職データ（現在職のパッシブスキル配列）を
// 参照するため、職データを先にロードしておく（tests/engine/BuffJobSpecificSelf.test.ts と同型）。
import '@engine/data/mig.job.dat.js';
import {
    buildSaveDataUnitsFromState,
    isMigratedSaveDataUnit,
    MIGRATED_SAVE_DATA_UNITS,
} from '@engine/savedata/savedata-collect.js';
import { CSaveDataConst } from '@engine/savedata/CSaveDataConst.js';
import { n_A_LearnedSkill } from '@engine/skill/learnedskill.js';
import {
    n_A_PassSkill, n_A_PassSkill3, n_A_PassSkill4, n_A_PassSkill7, n_A_PassSkill8,
} from '@engine/skill/skillstate.js';
import { n_A_PassSkill5 } from '@engine/runtime/roro-state.js';
import {
    g_confDataIchizi, g_confDataNizi, g_confDataSanzi, g_confDataYozi, g_timeItemConf,
    set_g_confDataIchizi, set_g_confDataNizi, set_g_confDataSanzi, set_g_confDataYozi, set_g_confDataDebuff,
} from '@engine/runtime/global.js';
import {
    SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS, SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS, SAVE_DATA_UNIT_TYPE_CHARA_BUFF, SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST, SAVE_DATA_UNIT_TYPE_ITEM_BUFF, SAVE_DATA_UNIT_TYPE_TIME_BUFF,
    SAVE_DATA_UNIT_TYPE_AUTO_SPELLS, SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE,
    SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC,
} from '@engine/savedata/CSaveDataUnit.js';
import { OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB } from '@engine/skill/calcautospell.js';
import {
    g_confDataCustomStatus, g_confDataCustomAtk, g_confDataCustomDef, g_confDataCustomSkill, g_confDataCustomSpecStatus,
} from '@engine/runtime/global.js';
import {
    SAVE_DATA_UNIT_TYPE_MOB, SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER, SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2,
    SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT, SAVE_DATA_UNIT_TYPE_MOB_BUFF, SAVE_DATA_UNIT_TYPE_MOB_DEBUFF,
    SAVE_DATA_UNIT_TYPE_ATTACK_CONF,
} from '@engine/savedata/CSaveDataUnit.js';
import { n_B_TAISEI } from '@engine/monster/mobconfplayer.js';
import { n_B_KYOUKA } from '@engine/monster/mobconfbuf.js';
import { n_B_IJYOU } from '@engine/monster/mobconfdebuf.js';
import { SetMobConfInput } from '@engine/monster/CMobConfInput.js';
import { MOB_CONF_INPUT_DATA_INDEX_LV, MOB_CONF_INPUT_DATA_INDEX_HP } from '@engine/const/EnumMobConfId.js';
import { g_attackMethodBridge } from '@engine/battle/CAttackMethodDataBridge.js';
import {
    SAVE_DATA_UNIT_TYPE_EQUIPABLE, SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF,
} from '@engine/savedata/CSaveDataUnit.js';
import {
    set_n_A_Equip, set_g_itemIdArray, set_g_refinedArray,
    set_n_A_Weapon_ATKplus, set_n_A_Weapon_Transcendence,
} from '@engine/runtime/roro-state.js';
import {
    MIG_EQUIP_REGION_ID_ARMS_RIGHT, MIG_EQUIP_REGION_ID_ACCESSORY_2,
} from '@engine/const/EnumMigEquipRegionId.js';
import { EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_ARMS_LEFT } from '@engine/const/EnumEquipRegionId.js';

/** テスト対象が読む OBJID_* 要素をまとめて用意する（値は既定値のまま）。 */
function buildDom() {
    const ids = [
        'OBJID_SELECT_JOB', 'OBJID_SELECT_BASE_LEVEL', 'OBJID_SELECT_JOB_LEVEL',
        'OBJID_SELECT_STATUS_STR', 'OBJID_SELECT_STATUS_AGI', 'OBJID_SELECT_STATUS_VIT',
        'OBJID_SELECT_STATUS_INT', 'OBJID_SELECT_STATUS_DEX', 'OBJID_SELECT_STATUS_LUK',
        'OBJID_SELECT_STATUS_POW', 'OBJID_SELECT_STATUS_STA', 'OBJID_SELECT_STATUS_WIS',
        'OBJID_SELECT_STATUS_SPL', 'OBJID_SELECT_STATUS_CON', 'OBJID_SELECT_STATUS_CRT',
        'OBJID_SELECT_ARMS_ELEMENT', 'OBJID_SPEED_POT',
    ];
    for (const id of ids) {
        const el = document.createElement('input');
        el.id = id;
        el.value = '0';
        document.body.appendChild(el);
    }
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.id = 'OBJID_CHECK_AUTO_BASE_LEVEL';
    check.checked = true;
    document.body.appendChild(check);
}

/** id の要素の value を書き換える（buildDom() 実行後に使う）。 */
function setDomValue(id: string, value: string) {
    (document.getElementById(id) as HTMLInputElement).value = value;
}

/** 指定 type のユニットを見つける（無ければ undefined）。 */
function findUnit(units: any[], type: number) {
    return units.find((u) => u.constructor.type === type);
}

/** 指定 type+instanceKind のユニットを見つける（CHARA_CONF_SPECIALIZEのように同一typeが複数ある場合用）。 */
function findUnitByInstanceKind(units: any[], type: number, instanceKind: number) {
    return units.find((u) => u.constructor.type === type && Number(u.getProp(CSaveDataConst.instanceKind)) === instanceKind);
}

beforeEach(() => {
    buildDom();
    // g_confDataIchizi 等は実ページでは HydrateFromModel() 経由の初回calcで populate される
    // （global.js の宣言時点では null）。テストでは同じ形（0埋め配列）を直接投入する。
    set_g_confDataIchizi(Array(50).fill(0));
    set_g_confDataNizi(Array(50).fill(0));
    set_g_confDataSanzi(Array(100).fill(0));
    set_g_confDataYozi(Array(30).fill(0));
    // g_confDataDebuff も同様（B-33 B2-2でextractSaveModelFromState()が読むようになった）。
    set_g_confDataDebuff(Array(50).fill(0));
    // g_itemIdArray/g_refinedArray（シャドウ装備）はデフォルト[]のため、EQUIP_REGION_ID_SHADOW_*の
    // 添字（最大23）へアクセスするとundefinedになる。実ページでは常にEQUIP_REGION_ID_COUNT=24件の
    // 配列が用意されているため、同じ形で0埋めする。
    set_g_itemIdArray(Array(24).fill(0));
    set_g_refinedArray(Array(24).fill(0));
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('savedata-collect.js', () => {
    describe('isMigratedSaveDataUnit', () => {
        it('type だけの指定は同じ type のユニットすべてに一致する', () => {
            const versionEntry = MIGRATED_SAVE_DATA_UNITS.find((e) => e.dataKind === undefined && e.instanceKind === undefined)!;
            expect(isMigratedSaveDataUnit({ type: String(versionEntry.type) })).toBe(true);
        });

        it('dataKind 指定は一致する dataKind のユニットだけに一致する', () => {
            const costumeEntry = MIGRATED_SAVE_DATA_UNITS.find((e) => e.dataKind !== undefined)!;
            expect(isMigratedSaveDataUnit({ type: String(costumeEntry.type), dataKind: String(costumeEntry.dataKind) })).toBe(true);
            // 実在するdataKind値（item/costume/shadow）に依存せず、存在しない値で不一致になることを見る
            // （B-33 B2-2でEQUIP_REGIONSの全dataKindが移植済みになったため、特定の「未移植dataKind」は
            // もう存在しない。フィルタが機能していること自体を検証する）。
            const bogusDataKind = -9999;
            expect(isMigratedSaveDataUnit({ type: String(costumeEntry.type), dataKind: String(bogusDataKind) })).toBe(false);
        });

        it('未移植の type には一致しない', () => {
            expect(isMigratedSaveDataUnit({ type: '999999' })).toBe(false);
        });
    });

    describe('buildSaveDataUnitsFromState: 共通', () => {
        it('各ユニットの type が isMigratedSaveDataUnit で真になる（B-33 B2-2で装備・シャドウ装備・プレイヤー状態異常も統合済みのため例外なし）', () => {
            const units = buildSaveDataUnitsFromState();
            for (const unit of units) {
                const parsedMapObj: Record<string, unknown> = {};
                unit.parsedMap.forEach((value: unknown, key: string) => { parsedMapObj[key] = value; });
                expect(isMigratedSaveDataUnit(parsedMapObj)).toBe(true);
            }
        });

        it('衣装の装備位置ユニットは下段=defID12固定・他部位は0', () => {
            const units = buildSaveDataUnitsFromState();
            const costume = units.find((u: any) => Number(u.getProp(CSaveDataConst.propNameDataKind)) === CSaveDataConst.eqpRgnKindCostume)!;
            expect(Number(costume.getProp(CSaveDataConst.propNameEqpRgnHeadUnder))).toBe(12);
            expect(Number(costume.getProp(CSaveDataConst.propNameEqpRgnArmsRight) ?? 0)).toBe(0);
        });

        it('矢ユニットは n_A_Arrow+1 を運ぶ（既定値は ARROW_ID_NONE=0 → 1）', () => {
            const units = buildSaveDataUnitsFromState();
            const arrowUnit = units.find((u: any) => Number(u.getProp(CSaveDataConst.propNameArrow) ?? -1) >= 0)!;
            expect(Number(arrowUnit.getProp(CSaveDataConst.propNameArrow))).toBe(1);
        });
    });

    describe('空ユニットの除去（CSaveDataManager.doCompaction() の配列レベル除去と同じ扱い）', () => {
        it('習得スキルが1つも無い場合、LEARNED_SKILLSユニット自体を出力しない', () => {
            expect(n_A_LearnedSkill.every((lv) => lv === 0)).toBe(true);
            const units = buildSaveDataUnitsFromState();
            expect(findUnit(units, SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS)).toBeUndefined();
        });

        it('習得スキルが1件でもあれば LEARNED_SKILLSユニットを出力する', () => {
            n_A_LearnedSkill[0] = 1;
            try {
                const units = buildSaveDataUnitsFromState();
                expect(findUnit(units, SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS)).toBeDefined();
            } finally {
                n_A_LearnedSkill[0] = 0;
            }
        });

        it('CHARA_BUFFユニットはバフレベルが全て0でも常に出力する（武器属性が常にセットされるため）', () => {
            const units = buildSaveDataUnitsFromState();
            expect(findUnit(units, SAVE_DATA_UNIT_TYPE_CHARA_BUFF)).toBeDefined();
        });

        it('SKILL_BUFF_1STユニットはg_confDataIchiziが全て0の場合出力しない', () => {
            expect(g_confDataIchizi.every((lv) => lv === 0)).toBe(true);
            const units = buildSaveDataUnitsFromState();
            expect(findUnit(units, SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST)).toBeUndefined();
        });
    });

    describe('buildSaveDataUnitsFromState: A2型別の入力源', () => {
        it('CHARA_BUFFのarmsElementはOBJID_SELECT_ARMS_ELEMENTを読む', () => {
            setDomValue('OBJID_SELECT_ARMS_ELEMENT', '3');
            const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_BUFF)!;
            expect(Number(unit.getProp(CSaveDataConst.propNameArmsElement))).toBe(3);
        });

        it('CHARA_BUFFのbuffLvはn_A_PassSkill8を70要素に0埋めして運ぶ', () => {
            n_A_PassSkill8[0] = 5;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_BUFF)!;
                const buffLv = unit.getProp(CSaveDataConst.propNameBuffLv) as bigint[];
                expect(buffLv.length).toBe(70);
                expect(Number(buffLv[0])).toBe(5);
                expect(Number(buffLv[69])).toBe(0);
            } finally {
                n_A_PassSkill8[0] = 0;
            }
        });

        it('ITEM_BUFFのsubSpeedPotはOBJID_SPEED_POTを読み、buffLvはn_A_PassSkill7を70要素に0埋めする', () => {
            setDomValue('OBJID_SPEED_POT', '7');
            n_A_PassSkill7[0] = 2;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_ITEM_BUFF)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameSubSpeedPot))).toBe(7);
                const buffLv = unit.getProp(CSaveDataConst.propNameBuffLv) as bigint[];
                expect(buffLv.length).toBe(70);
                expect(Number(buffLv[0])).toBe(2);
            } finally {
                n_A_PassSkill7[0] = 0;
            }
        });

        it('SKILL_BUFF_SELFは現在職のパッシブスキル数を超える分を切り詰めてから100要素に0埋めする', () => {
            // ノービス（MigID 0）は職固有自己支援パッシブを持たないため、切り詰め後は全て0になる。
            n_A_PassSkill[0] = 9;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF);
                // 切り詰めの結果ノービスは全スロット0になり、ユニット自体が空として除去される。
                expect(unit).toBeUndefined();
            } finally {
                n_A_PassSkill[0] = 0;
            }
        });

        it('TIME_BUFFはg_timeItemConfを20要素に0埋めして運ぶ', () => {
            g_timeItemConf[0] = 111;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_TIME_BUFF)!;
                const ids = unit.getProp(CSaveDataConst.propNameTimeBuffID) as bigint[];
                expect(ids.length).toBe(20);
                expect(Number(ids[0])).toBe(111);
            } finally {
                g_timeItemConf[0] = 0;
            }
        });

        it('AUTO_SPELLSはn_A_PassSkill5のID/Lv/Probオフセットからそれぞれ20要素を組み立てる', () => {
            n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + 0] = 401;
            n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + 0] = 3;
            n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + 0] = 50;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_AUTO_SPELLS)!;
                expect(Number((unit.getProp(CSaveDataConst.propNameAutoSpellID) as bigint[])[0])).toBe(401);
                expect(Number((unit.getProp(CSaveDataConst.propNameAutoSpellLv) as bigint[])[0])).toBe(3);
                expect(Number((unit.getProp(CSaveDataConst.propNameAutoSpellProb) as bigint[])[0])).toBe(50);
            } finally {
                delete n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + 0];
                delete n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + 0];
                delete n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + 0];
            }
        });
    });

    describe('buildSaveDataUnitsFromState: A3 性能カスタマイズ系のマッピング', () => {
        // g_confDataCustomStatus/Atk/Def/Skill/SpecStatus はいずれも [0] を使わない
        // 1-origin の配列（CSaveDataManager#applyDataToControls() のsplice(1,...)由来）。

        it('CHARA_CONF_BASICはcustomStatus[1..22]をmig[0..21]へ直接転記する', () => {
            g_confDataCustomStatus[1] = 11;
            g_confDataCustomStatus[22] = 99;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameStMaxHPUp))).toBe(11);
                expect(Number(unit.getProp(CSaveDataConst.propNameStCostDown))).toBe(99);
            } finally {
                g_confDataCustomStatus[1] = 0;
                g_confDataCustomStatus[22] = 0;
            }
        });

        it('CHARA_CONF_BASICはcustomAtk[11]をmig[26](StPerfectAttackUp・符号無し単独値)へ転記する', () => {
            g_confDataCustomAtk[11] = 7;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameStPerfectAttackUp))).toBe(7);
            } finally {
                g_confDataCustomAtk[11] = 0;
            }
        });

        it('CHARA_CONF_BASICはcustomAtk[24]をmig[27](StWeaponAtkUp)へ転記する（符号ペア）', () => {
            g_confDataCustomAtk[24] = -9;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameStWeaponAtkUpSign))).toBe(1);
                expect(Number(unit.getProp(CSaveDataConst.propNameStWeaponAtkUp))).toBe(9);
            } finally {
                g_confDataCustomAtk[24] = 0;
            }
        });

        it('性能カスタマイズ（特化：攻撃｜物理）はcustomAtk[5]をspecDamageへ転記する', () => {
            g_confDataCustomAtk[5] = 42;
            try {
                const units = buildSaveDataUnitsFromState();
                const unit = findUnitByInstanceKind(units, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, CSaveDataConst.specKindAttackPhysical)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameSpecDamage))).toBe(42);
            } finally {
                g_confDataCustomAtk[5] = 0;
            }
        });

        it('性能カスタマイズ（特化：攻撃｜魔法）はcustomAtk[14]をspecDamageへ転記する', () => {
            g_confDataCustomAtk[14] = 17;
            try {
                const units = buildSaveDataUnitsFromState();
                const unit = findUnitByInstanceKind(units, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, CSaveDataConst.specKindAttackMagical)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameSpecDamage))).toBe(17);
            } finally {
                g_confDataCustomAtk[14] = 0;
            }
        });

        it('性能カスタマイズ（特化：攻撃｜すべて）はcustomAtk[10]をspecCriticalDamage(pos1)へ転記する', () => {
            g_confDataCustomAtk[10] = 5;
            try {
                const units = buildSaveDataUnitsFromState();
                const unit = findUnitByInstanceKind(units, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, CSaveDataConst.specKindAttackAny)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameSpecCriticalDamage))).toBe(5);
            } finally {
                g_confDataCustomAtk[10] = 0;
            }
        });

        it('性能カスタマイズ（特化：防御｜すべて）はcustomDef[9]をspecMapへ転記する', () => {
            g_confDataCustomDef[9] = 3;
            try {
                const units = buildSaveDataUnitsFromState();
                const unit = findUnitByInstanceKind(units, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, CSaveDataConst.specKindDefencekAny)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameSpecMap))).toBe(3);
            } finally {
                g_confDataCustomDef[9] = 0;
            }
        });

        it('CHARA_CONF_SKILLはcustomSkill[10]をspecDamageUpConditionValueへ転記し、conditionTypeはその非0判定を運ぶ', () => {
            g_confDataCustomSkill[10] = 8;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameSpecDamageUpConditionValue))).toBe(8);
                expect(Number(unit.getProp(CSaveDataConst.propNameSpecDamageUpConditionType))).toBe(1);
            } finally {
                g_confDataCustomSkill[10] = 0;
            }
        });

        it('CHARA_CONF_SKILLはcustomSkill[10]が0のときconditionTypeも0にする', () => {
            const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL);
            // customSkill[10]=0（既定）だと他フィールドも全て0なのでユニット自体が空として除去される
            expect(unit).toBeUndefined();
        });

        it('CHARA_CONF_SPEC_BASICはcustomSpecStatus[1..12]をpos0..11へ直接転記する', () => {
            g_confDataCustomSpecStatus[1] = 21;
            g_confDataCustomSpecStatus[12] = 34;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameStPowPlus))).toBe(21);
                expect(Number(unit.getProp(CSaveDataConst.propNameStMresPlus))).toBe(34);
            } finally {
                g_confDataCustomSpecStatus[1] = 0;
                g_confDataCustomSpecStatus[12] = 0;
            }
        });
    });

    describe('buildSaveDataUnitsFromState: A4 モンスター・攻撃手段系', () => {
        it('MOB_CONF_PLAYERは常に空（現行のtranslateFromOldFormat()も固定0を送るため）', () => {
            const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER);
            expect(unit).toBeUndefined();
        });

        it('MOB_CONF_PLAYER2はn_B_TAISEIをそのまま運ぶ', () => {
            const prev0 = n_B_TAISEI[0];
            n_B_TAISEI[0] = 5;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameStMaxHP))).toBe(5);
            } finally {
                n_B_TAISEI[0] = prev0;
            }
        });

        it('MOB_CONF_PLAYER2のStResPlus(pos41)/StMresPlus(pos42)は符号を常に0にする', () => {
            const prev41 = n_B_TAISEI[41];
            const prev42 = n_B_TAISEI[42];
            n_B_TAISEI[41] = -7;
            n_B_TAISEI[42] = -3;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameStResPlusSign))).toBe(0);
                expect(Number(unit.getProp(CSaveDataConst.propNameStResPlus))).toBe(7);
                expect(Number(unit.getProp(CSaveDataConst.propNameStMresPlusSign))).toBe(0);
                expect(Number(unit.getProp(CSaveDataConst.propNameStMresPlus))).toBe(3);
            } finally {
                n_B_TAISEI[41] = prev41;
                n_B_TAISEI[42] = prev42;
            }
        });

        it('MOB_CONF_INPUTはGetMobConfInput()経由の値をmobLv/mobHPへ運ぶ', () => {
            SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LV, 99);
            SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP, 123456);
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameMobLv))).toBe(99);
                expect(Number(unit.getProp(CSaveDataConst.propNameMobHP))).toBe(123456);
            } finally {
                SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LV, 0);
                SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP, 0);
            }
        });

        it('MOB_BUFFはn_B_KYOUKAを80要素に0埋めして運ぶ', () => {
            n_B_KYOUKA[0] = 4;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB_BUFF)!;
                const buffLv = unit.getProp(CSaveDataConst.propNameBuffLv) as bigint[];
                expect(buffLv.length).toBe(80);
                expect(Number(buffLv[0])).toBe(4);
            } finally {
                n_B_KYOUKA[0] = 0;
            }
        });

        it('MOB_DEBUFFはn_B_IJYOUを80要素に0埋めして運ぶ', () => {
            n_B_IJYOU[0] = 6;
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB_DEBUFF)!;
                const buffLv = unit.getProp(CSaveDataConst.propNameBuffLv) as bigint[];
                expect(buffLv.length).toBe(80);
                expect(Number(buffLv[0])).toBe(6);
            } finally {
                n_B_IJYOU[0] = 0;
            }
        });

        it('ATTACK_CONFはg_attackMethodBridge.getAttackMethodConf()経由で組み立てる', () => {
            const prevGetter = g_attackMethodBridge.getAttackMethodConf;
            g_attackMethodBridge.getAttackMethodConf = () => ({
                GetSkillId: () => 401,
                GetSourceType: () => 2,
                GetSkillLv: () => 5,
                GetOptionValueCount: () => 2,
                GetOptionValue: (idx: number) => (idx === 0 ? 10 : 20),
            });
            try {
                const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_ATTACK_CONF)!;
                expect(Number(unit.getProp(CSaveDataConst.propNameAttackSkillID))).toBe(401);
                expect(Number(unit.getProp(CSaveDataConst.propNameSourceTypeID))).toBe(2);
                expect(Number(unit.getProp(CSaveDataConst.propNameAttackSkillLv))).toBe(5);
                const options = unit.getProp(CSaveDataConst.propNameAttackSkillOption) as bigint[];
                expect(options.length).toBe(5);
                expect(Number(options[0])).toBe(10);
                expect(Number(options[1])).toBe(20);
                expect(Number(options[2])).toBe(0);
            } finally {
                g_attackMethodBridge.getAttackMethodConf = prevGetter;
            }
        });

        it('MOBユニットは常に出力する（isEmptyUnit()が常にfalse）', () => {
            const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_MOB);
            expect(unit).toBeDefined();
        });
    });

    describe('buildSaveDataUnitsFromState: B2-2 装備・シャドウ装備・プレイヤー状態異常', () => {
        /** type+defIDでEQUIPABLEユニットを1件探す。 */
        function findEquipableByDefId(units: any[], defId: number) {
            return units.find((u) =>
                u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIPABLE
                && Number(u.getProp(CSaveDataConst.propNameEquipItemDefID)) === defId);
        }

        it('アイテム装備は11部位すべてに装備定義ID(eqpRgnId+1)を割り当てる（itemIdが0の部位はisEmptyUnit()によりユニット自体が出力されない）', () => {
            // 全11部位を装備済みにする（1つでも0のままだとそのユニットはisEmptyUnit()で
            // 除去される——旧経路でも最終的な出力URLには現れない。CSaveDataManager.doCompaction()
            // の除去タイミングがbuildSaveDataUnits()内へ早まっただけで最終結果は同じ）。
            const equip = Array(12).fill(0).map((_, i) => 100 + i);
            set_n_A_Equip(equip);

            const units = buildSaveDataUnitsFromState();
            const itemUnits = units.filter((u: any) => u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIPABLE
                && Number(u.getProp(CSaveDataConst.propNameEquipItemDefID)) <= 11);
            expect(itemUnits.length).toBe(11);

            const armsRight = findEquipableByDefId(units, MIG_EQUIP_REGION_ID_ARMS_RIGHT + 1)!;
            expect(Number(armsRight.getProp(CSaveDataConst.propNameItemID))).toBe(100 + MIG_EQUIP_REGION_ID_ARMS_RIGHT);
            const accessory2 = findEquipableByDefId(units, MIG_EQUIP_REGION_ID_ACCESSORY_2 + 1)!;
            expect(Number(accessory2.getProp(CSaveDataConst.propNameItemID))).toBe(100 + MIG_EQUIP_REGION_ID_ACCESSORY_2);
        });

        it('精錬値・超越値はn_A_Weapon_ATKplus/n_A_Weapon_Transcendenceを毎回読み直す（呼び出しごとの値変化に追随する）', () => {
            // 回帰テスト: 精錬値・超越値の読み取り元マップをモジュール読み込み時に1回だけ
            // 組み立てていたため（object literalの値はimportの生きた束縛と違い一度きりの代入）、
            // モジュール評価時点（値がまだ0）のまま固定され、以後の値変更を反映しなかった
            // （B-33 B2-2で発見・修正）。1回目のbuildSaveDataUnitsFromState()呼び出しの後に
            // 値を変えても正しく反映されることを見る。
            set_n_A_Equip(Array(12).fill(0).map((_, i) => 100 + i));
            set_n_A_Weapon_ATKplus(0);
            set_n_A_Weapon_Transcendence(0);
            buildSaveDataUnitsFromState(); // 1回目（ここでモジュール内マップが誤ってキャッシュされていた）

            set_n_A_Weapon_ATKplus(9);
            set_n_A_Weapon_Transcendence(3);
            const units = buildSaveDataUnitsFromState(); // 2回目。新しい値が反映されるべき
            const armsRight = findEquipableByDefId(units, MIG_EQUIP_REGION_ID_ARMS_RIGHT + 1)!;
            expect(Number(armsRight.getProp(CSaveDataConst.propNameRefinedCount))).toBe(9);
            expect(Number(armsRight.getProp(CSaveDataConst.propNameTranscendenceCount))).toBe(3);

            // 後続テストへ値を持ち越さない
            set_n_A_Weapon_ATKplus(0);
            set_n_A_Weapon_Transcendence(0);
        });

        it('itemIdが0の部位はEQUIPABLEユニット自体が出力されない（isEmptyUnit()）', () => {
            set_n_A_Equip(Array(12).fill(0));
            const units = buildSaveDataUnitsFromState();
            const itemUnits = units.filter((u: any) => u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIPABLE
                && Number(u.getProp(CSaveDataConst.propNameEquipItemDefID)) <= 11);
            expect(itemUnits.length).toBe(0);
        });

        it('アイテム装備位置ユニット（EQUIP_REGIONS・kind=item）は11部位すべてに装備定義IDを持つ', () => {
            const units = buildSaveDataUnitsFromState();
            const itemRegionUnit = units.find((u: any) =>
                u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS
                && Number(u.getProp(CSaveDataConst.propNameDataKind)) === CSaveDataConst.eqpRgnKindItem)!;
            expect(itemRegionUnit).toBeDefined();
            expect(Number(itemRegionUnit.getProp(CSaveDataConst.propNameEqpRgnArmsRight))).toBe(MIG_EQUIP_REGION_ID_ARMS_RIGHT + 1);
            expect(Number(itemRegionUnit.getProp(CSaveDataConst.propNameEqpRgnAccessory2))).toBe(MIG_EQUIP_REGION_ID_ACCESSORY_2 + 1);
            // 矢欄は#collectDataEquipable()時代からの固定値11をそのまま踏襲
            expect(Number(itemRegionUnit.getProp(CSaveDataConst.propNameEqpRgnArrow))).toBe(11);
        });

        it('EQUIPABLE型内では、アイテム11件がシャドウ装備より前に並ぶ（doCompaction()の安定ソートによるバイト列依存）', () => {
            set_n_A_Equip(Array(12).fill(0).map((_, i) => 100 + i));
            const itemArray = Array(24).fill(0);
            itemArray[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT] = 9001;
            set_g_itemIdArray(itemArray);
            const refinedArray = Array(24).fill(0);
            set_g_refinedArray(refinedArray);

            const units = buildSaveDataUnitsFromState();
            const equipableIndices = units
                .map((u: any, idx: number) => ({ type: u.constructor.type, idx }))
                .filter((e: any) => e.type === SAVE_DATA_UNIT_TYPE_EQUIPABLE)
                .map((e: any) => e.idx);
            // 12件（アイテム11+シャドウ1）のうち、最後の1件がシャドウ（defID>=12）であること
            expect(equipableIndices.length).toBe(12);
            const lastUnit = units[equipableIndices[equipableIndices.length - 1]];
            expect(Number(lastUnit.getProp(CSaveDataConst.propNameEquipItemDefID))).toBeGreaterThanOrEqual(12);
        });

        it('シャドウ装備の装備定義IDは12から始まり、空の枠はIDを消費しない', () => {
            const itemArray = Array(24).fill(0);
            // ARMS_RIGHT（1番目のシャドウ枠）は空のまま、ARMS_LEFT（2番目）だけ装備させる
            itemArray[EQUIP_REGION_ID_SHADOW_ARMS_LEFT] = 8001;
            set_g_itemIdArray(itemArray);
            set_g_refinedArray(Array(24).fill(0));

            const units = buildSaveDataUnitsFromState();
            const shadowUnits = units.filter((u: any) => u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIPABLE
                && Number(u.getProp(CSaveDataConst.propNameEquipItemDefID)) >= 12);
            // ARMS_RIGHTは空なのでユニット化されず、ARMS_LEFT側だけが「最初の空き番号=12」を得る
            // （旧#getCandidateEquipItemDefID()と同じ「discardされた候補は次の枠で再利用」の挙動）
            expect(shadowUnits.length).toBe(1);
            expect(Number(shadowUnits[0].getProp(CSaveDataConst.propNameEquipItemDefID))).toBe(12);
            expect(Number(shadowUnits[0].getProp(CSaveDataConst.propNameItemID))).toBe(8001);
        });

        it('シャドウ装備のカードはSlot1が無くID2から始まる', () => {
            set_g_itemIdArray((() => { const a = Array(24).fill(0); a[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT] = 7001; return a; })());
            set_g_refinedArray(Array(24).fill(0));
            document.getElementById('OBJID_SHADOW_ARMS_RIGHT_CARD_2') ?? (() => {
                const el = document.createElement('input');
                el.id = 'OBJID_SHADOW_ARMS_RIGHT_CARD_2';
                el.value = '555';
                document.body.appendChild(el);
            })();

            const units = buildSaveDataUnitsFromState();
            const shadowUnit = units.find((u: any) => u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIPABLE
                && Number(u.getProp(CSaveDataConst.propNameItemID)) === 7001)!;
            expect(Number(shadowUnit.getProp(CSaveDataConst.propNameCardID2))).toBe(555);
            expect(shadowUnit.getProp(CSaveDataConst.propNameCardID1)).toBeUndefined();
        });

        it('プレイヤー状態異常設定が全て0ならCHARA_DEBUFFユニットは出力されない', () => {
            const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF);
            expect(unit).toBeUndefined();
        });

        it('プレイヤー状態異常設定に非0の値があればCHARA_DEBUFFユニットがg_confDataDebuffをそのまま運ぶ', () => {
            set_g_confDataDebuff(Array(50).fill(0).map((_, i) => (i === 3 ? 42 : 0)));
            const unit = findUnit(buildSaveDataUnitsFromState(), SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF)!;
            expect(unit).toBeDefined();
            const buffLv = unit.getProp(CSaveDataConst.propNameBuffLv) as (number | bigint)[];
            expect(Number(buffLv[3])).toBe(42);
        });

        it('EQUIP_REGIONS型内では、アイテム→衣装→シャドウの順で並ぶ（doCompaction()の安定ソートによるバイト列依存）', () => {
            set_g_itemIdArray((() => { const a = Array(24).fill(0); a[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT] = 6001; return a; })());
            set_g_refinedArray(Array(24).fill(0));

            const units = buildSaveDataUnitsFromState();
            const regionUnits = units.filter((u: any) => u.constructor.type === SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS);
            const dataKinds = regionUnits.map((u: any) => Number(u.getProp(CSaveDataConst.propNameDataKind)));
            expect(dataKinds).toEqual([
                CSaveDataConst.eqpRgnKindItem,
                CSaveDataConst.eqpRgnKindCostume,
                CSaveDataConst.eqpRgnKindShadow,
            ]);
        });
    });
});
