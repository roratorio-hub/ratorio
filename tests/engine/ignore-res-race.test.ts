import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GetMobRes, GetMobMres } from '@engine/chara/hmjob.js';
import { GetItemExplainText } from '@engine/equip/item.h.js';
import { n_tok } from '@engine/runtime/ro4-state.js';
import { set_g_confDataYozi } from '@engine/runtime/global.js';
import {
    MONSTER_DATA_INDEX_MRES, MONSTER_DATA_INDEX_RACE, MONSTER_DATA_INDEX_RES,
} from '@engine/const/EnumMonsterDataIndex.js';
import { RACE_ID_DEMON, RACE_ID_DRAGON, RACE_ID_SOLID } from '@engine/const/EnumRaceId.js';
import {
    ITEM_SP_IGNORE_MRES_RACE_ALL, ITEM_SP_IGNORE_MRES_RACE_DEMON, ITEM_SP_IGNORE_MRES_RACE_DRAGON, ITEM_SP_IGNORE_MRES_RACE_SOLID,
    ITEM_SP_IGNORE_RES_RACE_ALL, ITEM_SP_IGNORE_RES_RACE_DEMON, ITEM_SP_IGNORE_RES_RACE_DRAGON, ITEM_SP_IGNORE_RES_RACE_SOLID,
} from '@engine/const/EnumItemSpId.js';

// 種族別の RES無視 / MRES無視（強欲なビッグベル・ビッグベン等）。
// 対象モンスターの種族に対応する SP だけが効き、全種族 SP と合算して上限 50% で頭打ちになる。

const mob = (race: number, res: number, mres: number): any[] => {
    const m: any[] = [];
    m[MONSTER_DATA_INDEX_RACE] = race;
    m[MONSTER_DATA_INDEX_RES] = res;
    m[MONSTER_DATA_INDEX_MRES] = mres;
    return m;
};

let saved: number[];
beforeEach(() => {
    saved = [...n_tok];
    n_tok.fill(0);
    set_g_confDataYozi([]);
});
afterEach(() => {
    for (let i = 0; i < saved.length; i++) n_tok[i] = saved[i];
});

describe('GetMobRes（種族別のRES無視）', () => {
    it('対象種族のモンスターでは Res が指定の割合だけ減る', () => {
        n_tok[ITEM_SP_IGNORE_RES_RACE_SOLID] = 25;
        expect(GetMobRes(mob(RACE_ID_SOLID, 200, 0))).toBe(150);
    });

    it('別の種族のモンスターでは Res は変わらない', () => {
        n_tok[ITEM_SP_IGNORE_RES_RACE_SOLID] = 25;
        expect(GetMobRes(mob(RACE_ID_DEMON, 200, 0))).toBe(200);
    });

    it('複数の種族に設定したときは、対象モンスターの種族の分だけが効く', () => {
        n_tok[ITEM_SP_IGNORE_RES_RACE_SOLID] = 25;
        n_tok[ITEM_SP_IGNORE_RES_RACE_DEMON] = 10;
        expect(GetMobRes(mob(RACE_ID_DEMON, 200, 0))).toBe(180);
        expect(GetMobRes(mob(RACE_ID_DRAGON, 200, 0))).toBe(200);
    });

    it('全種族の RES無視 と種族別を合算する', () => {
        n_tok[ITEM_SP_IGNORE_RES_RACE_ALL] = 10;
        n_tok[ITEM_SP_IGNORE_RES_RACE_DRAGON] = 15;
        expect(GetMobRes(mob(RACE_ID_DRAGON, 200, 0))).toBe(150);
    });

    it('合算した RES無視 は 50% で頭打ちになる', () => {
        n_tok[ITEM_SP_IGNORE_RES_RACE_ALL] = 40;
        n_tok[ITEM_SP_IGNORE_RES_RACE_SOLID] = 40;
        expect(GetMobRes(mob(RACE_ID_SOLID, 200, 0))).toBe(100);
    });

    it('MRES無視 の SP は Res に影響しない', () => {
        n_tok[ITEM_SP_IGNORE_MRES_RACE_SOLID] = 25;
        expect(GetMobRes(mob(RACE_ID_SOLID, 200, 200))).toBe(200);
    });
});

describe('GetMobMres（種族別のMRES無視）', () => {
    it('対象種族のモンスターでは Mres が指定の割合だけ減る', () => {
        n_tok[ITEM_SP_IGNORE_MRES_RACE_DEMON] = 25;
        expect(GetMobMres(mob(RACE_ID_DEMON, 0, 200))).toBe(150);
    });

    it('別の種族のモンスターでは Mres は変わらない', () => {
        n_tok[ITEM_SP_IGNORE_MRES_RACE_DEMON] = 25;
        expect(GetMobMres(mob(RACE_ID_SOLID, 0, 200))).toBe(200);
    });

    it('全種族の MRES無視 と種族別を合算し、50% で頭打ちになる', () => {
        n_tok[ITEM_SP_IGNORE_MRES_RACE_ALL] = 20;
        n_tok[ITEM_SP_IGNORE_MRES_RACE_SOLID] = 10;
        expect(GetMobMres(mob(RACE_ID_SOLID, 0, 200))).toBe(140);
        n_tok[ITEM_SP_IGNORE_MRES_RACE_SOLID] = 60;
        expect(GetMobMres(mob(RACE_ID_SOLID, 0, 200))).toBe(100);
    });

    it('RES無視 の SP は Mres に影響しない', () => {
        n_tok[ITEM_SP_IGNORE_RES_RACE_SOLID] = 25;
        expect(GetMobMres(mob(RACE_ID_SOLID, 200, 200))).toBe(200);
    });
});

describe('GetItemExplainText（種族別のRES無視・MRES無視の表示文言）', () => {
    it('RES無視を「<種族>のモンスターのResを N% 無視」と表示する', () => {
        expect(GetItemExplainText(ITEM_SP_IGNORE_RES_RACE_SOLID, 25)[1][1]).toBe('無形のモンスターのResを 25% 無視');
        expect(GetItemExplainText(ITEM_SP_IGNORE_RES_RACE_DEMON, 25)[1][1]).toBe('悪魔のモンスターのResを 25% 無視');
        expect(GetItemExplainText(ITEM_SP_IGNORE_RES_RACE_DRAGON, 10)[1][1]).toBe('竜族のモンスターのResを 10% 無視');
    });

    it('MRES無視を「<種族>のモンスターのMresを N% 無視」と表示する', () => {
        expect(GetItemExplainText(ITEM_SP_IGNORE_MRES_RACE_SOLID, 25)[1][1]).toBe('無形のモンスターのMresを 25% 無視');
        expect(GetItemExplainText(ITEM_SP_IGNORE_MRES_RACE_DEMON, 25)[1][1]).toBe('悪魔のモンスターのMresを 25% 無視');
    });
});
