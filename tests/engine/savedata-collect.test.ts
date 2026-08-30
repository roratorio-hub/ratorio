import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
    buildSaveDataUnitsFromState,
    isMigratedSaveDataUnit,
    MIGRATED_SAVE_DATA_UNITS,
} from '@engine/savedata/savedata-collect.js';
import { CSaveDataConst } from '@engine/savedata/CSaveDataConst.js';
import { n_A_LearnedSkill } from '@engine/skill/learnedskill.js';
import { SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS } from '@engine/savedata/CSaveDataUnit.js';

/** テスト対象が読む OBJID_* 要素をまとめて用意する（値は既定値のまま）。 */
function buildDom() {
    const ids = [
        'OBJID_SELECT_JOB', 'OBJID_SELECT_BASE_LEVEL', 'OBJID_SELECT_JOB_LEVEL',
        'OBJID_SELECT_STATUS_STR', 'OBJID_SELECT_STATUS_AGI', 'OBJID_SELECT_STATUS_VIT',
        'OBJID_SELECT_STATUS_INT', 'OBJID_SELECT_STATUS_DEX', 'OBJID_SELECT_STATUS_LUK',
        'OBJID_SELECT_STATUS_POW', 'OBJID_SELECT_STATUS_STA', 'OBJID_SELECT_STATUS_WIS',
        'OBJID_SELECT_STATUS_SPL', 'OBJID_SELECT_STATUS_CON', 'OBJID_SELECT_STATUS_CRT',
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

beforeEach(() => {
    buildDom();
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

    describe('buildSaveDataUnitsFromState', () => {
        it('習得スキルが1つも無い場合、LEARNED_SKILLSユニット自体を出力しない（CSaveDataManager.doCompaction()の除去と同じ扱い）', () => {
            // n_A_LearnedSkill は既定で全要素0（beforeEach の buildDom は書き換えない）
            expect(n_A_LearnedSkill.every((lv) => lv === 0)).toBe(true);
            const units = buildSaveDataUnitsFromState();
            expect(units.length).toBe(MIGRATED_SAVE_DATA_UNITS.length - 1);
            expect(units.some((u: any) => u.constructor.type === SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS)).toBe(false);
        });

        it('習得スキルが1件でもあれば MIGRATED_SAVE_DATA_UNITS と同じ件数のユニットを返す', () => {
            n_A_LearnedSkill[0] = 1;
            try {
                const units = buildSaveDataUnitsFromState();
                expect(units.length).toBe(MIGRATED_SAVE_DATA_UNITS.length);
            } finally {
                n_A_LearnedSkill[0] = 0;
            }
        });

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
});
