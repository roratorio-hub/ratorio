import { describe, it, expect, beforeEach, afterEach } from 'vitest';
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
    set_g_confDataIchizi, set_g_confDataNizi, set_g_confDataSanzi, set_g_confDataYozi,
} from '@engine/runtime/global.js';
import {
    SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS, SAVE_DATA_UNIT_TYPE_CHARA_BUFF, SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST, SAVE_DATA_UNIT_TYPE_ITEM_BUFF, SAVE_DATA_UNIT_TYPE_TIME_BUFF,
    SAVE_DATA_UNIT_TYPE_AUTO_SPELLS, SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE,
    SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL, SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC,
} from '@engine/savedata/CSaveDataUnit.js';
import { OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB } from '@engine/skill/calcautospell.js';
import {
    g_confDataCustomStatus, g_confDataCustomAtk, g_confDataCustomDef, g_confDataCustomSkill, g_confDataCustomSpecStatus,
} from '@engine/runtime/global.js';

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
            expect(isMigratedSaveDataUnit({ type: String(costumeEntry.type), dataKind: String(CSaveDataConst.eqpRgnKindItem) })).toBe(false);
        });

        it('未移植の type には一致しない', () => {
            expect(isMigratedSaveDataUnit({ type: '999999' })).toBe(false);
        });
    });

    describe('buildSaveDataUnitsFromState: 共通', () => {
        it('各ユニットの type が isMigratedSaveDataUnit で真になる', () => {
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
});
