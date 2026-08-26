import { describe, it, expect } from 'vitest';
// UsedSkillSearch は g_constDataManager の職データ（現在職のパッシブスキル配列）を参照するため、
// 職データを先にロードしておく。
import '@engine/data/mig.job.dat.js';
import {
    n_A_PassSkill,
    UsedSkillSearch,
    UsedSkillSearchSubUsedOnly,
} from '@engine/skillstate.js';
import { g_constDataManager } from '@engine/global.js';
import { n_A_JOB } from '@engine/roro-state.js';
import { CONST_DATA_KIND_JOB } from '@engine/const/EnumConstDataKind.js';

describe('BuffJobSpecificSelf.js', () => {
    // 3e-3: skillstate.js の window compat 除去に伴い window互換確認を behavior テストに置換
    describe('UsedSkillSearch の動作', () => {
        it('職固有スキルにも時限アイテムにも該当しないIDは 0 を返す', () => {
            expect(UsedSkillSearch(-999)).toBe(0);
        });

        it('bOnlyUsed=true で現在職の passiveSkillId に対応する n_A_PassSkill のLvを返す', () => {
            // n_A_PassSkill は export let 配列 — 現在職の passiveSkillIdArray 先頭スキルに Lv を設定して検証
            const jobData = g_constDataManager.GetDataObject(
                CONST_DATA_KIND_JOB, n_A_JOB);
            const passiveIds = jobData.GetPassiveSkillIdArray();
            if (passiveIds.length === 0) return; // 現在職にパッシブが無い場合はスキップ
            const prev = n_A_PassSkill[0];
            n_A_PassSkill[0] = 3;
            expect(UsedSkillSearchSubUsedOnly(passiveIds[0])).toBe(3);
            n_A_PassSkill[0] = prev;
        });
    });
});
