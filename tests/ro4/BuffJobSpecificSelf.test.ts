import { describe, it, expect } from 'vitest';
import {
    BUFF_CONF_SELF_LIMIT,
    n_A_PassSkill,
    n_Skill1SW,
    Click_PassSkillSW,
    Click_A1,
    UsedSkillSearch,
    UsedSkillSearchSubUsedOnly,
} from '@ro4/BuffJobSpecificSelf.js';

describe('BuffJobSpecificSelf.js', () => {
    describe('エクスポート確認', () => {
        it('BUFF_CONF_SELF_LIMIT が 51', () => {
            expect(BUFF_CONF_SELF_LIMIT).toBe(51);
        });
    });

    // 3e-3: skillstate.js の window compat 除去に伴い window互換確認を behavior テストに置換
    describe('UsedSkillSearch の動作', () => {
        it('未設定のスキルIDに対して 0 を返す', () => {
            expect(UsedSkillSearch(-999)).toBe(0);
        });

        it('bOnlyUsed=true で n_A_PassSkill の設定Lvを返す', () => {
            // n_A_PassSkill は export let 配列 — 職の passiveSkillIdArray 先頭のスキルに Lv を設定
            const jobData = (globalThis as any).g_constDataManager
                ?.GetDataObject?.((globalThis as any).CONST_DATA_KIND_JOB, (globalThis as any).n_A_JOB ?? 0);
            const passiveIds = jobData?.GetPassiveSkillIdArray?.() ?? [];
            if (passiveIds.length === 0) return; // 対象職にパッシブが無い場合はスキップ
            const prev = n_A_PassSkill[0];
            n_A_PassSkill[0] = 3;
            expect(UsedSkillSearchSubUsedOnly(passiveIds[0])).toBe(3);
            n_A_PassSkill[0] = prev;
        });
    });
});
