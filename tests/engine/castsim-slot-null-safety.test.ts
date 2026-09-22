/**
 * 詠唱シミュレータ（castsim.js）が呼ぶ8アクセサの null-safety 回帰テスト。
 *
 * castsim.js の RefreshCastSimSimulateArea() は charaDataManger に null、option は
 * 渡さずに以下の8アクセサを呼ぶ（try/catch なし）:
 *   GetCostFixed / GetCostAP / GetCastTimeVary / GetCastTimeFixed / GetCastTimeForce /
 *   GetLifeTime / GetDelayTimeCommon / GetCoolTime
 * 発端は SKILL_ID_SHIDAN（指弾）の CountOfKidan が charaDataManger.UsedSkillSearch を
 * 呼んでおり、本番の呼び出し規約に存在しないメソッドのため null で即 TypeError になっていた
 * こと（2023年の upstream から無変更＝リファクタリング由来ではない）。同根で
 * SKILL_ID_CHARGE_ATTACK / SKILL_ID_SORYUKYAKU / SKILL_ID_SHINSE_BAKUHATSU も
 * option 省略で落ちていた。いずれも修正済み（残件台帳 B-37 の副産物として発覚・解消）。
 *
 * import 順は TDZ 回避のため固定する（CSkillManager.cartcannon.test.ts と同じ理由。
 * global.js の module-level Init 前に CSkillManager を読むと壊れる）。
 * mig.job.dat.js / learnedskill.js / skillstate.js を先に読み込まないと
 * LearnedSkillSearch 等が「未登録」の偽陽性を出す（実測確認済み）。
 * `CCharaConfNizi.CONF_ID_KIKO`（指弾の CountOfKidan が参照）は静的プロパティで、
 * 本番では stallcalc-shell.js が `new CCharaConfNizi(...)` した際の InitData() 実行で
 * 初めて populate される。ここでも同じ最小限のインスタンス化を行う（DOM不要）。
 * `g_confDataNizi` も本番では同じ箇所で `set_g_confDataNizi(new Array())` により
 * ページ読み込み時点で必ず非 null になる（null のままスキル計算に到達することは無い）ため、
 * ここでも空配列を設定する。
 * `chara.js`（`CardNumSearch`等の登録元。SKILL_ID_HIGHNESS_HEALのCoolTimeが参照。
 * Phase 6のパラメータ抽出で新規に追加された依存）も同じ理由で先に読み込む。
 */
import { describe, it, expect, beforeAll } from 'vitest';

let sm: any;
let CSkillData: any;

beforeAll(async () => {
    await import('@engine/data/mig.job.dat.js');
    await import('@engine/skill/learnedskill.js');
    await import('@engine/skill/skillstate.js');
    await import('@engine/chara/chara.js');
    const globalMod = await import('@engine/runtime/global.js');
    globalMod.set_g_confDataNizi([]);
    const { CCharaConfNizi } = await import('@engine/chara/CCharaConfNizi.js');
    new CCharaConfNizi([]).InitData();
    CSkillData = (await import('@engine/skill/CSkillData.js')).CSkillData;
    const mod = await import('@engine/skill/CSkillManager.js');
    sm = new mod.CSkillManager();
});

const ACCESSORS = [
    'GetCostFixed', 'GetCostAP', 'GetCastTimeVary', 'GetCastTimeFixed', 'GetCastTimeForce',
    'GetLifeTime', 'GetDelayTimeCommon', 'GetCoolTime',
];

describe('castsim.js の呼び出し規約（charaDataManger=null・option省略）で例外が出ない', () => {
    it('全 TYPE_ACTIVE スキル × Lv[1,maxLv] で8アクセサとも例外を投げない', () => {
        const failures: string[] = [];
        for (let id = 0; id < sm.dataArray.length; id++) {
            if (!sm.dataArray[id]) continue;
            if (!(sm.GetSkillType(id) & CSkillData.TYPE_ACTIVE)) continue;
            const maxLv = sm.GetMaxLv(id) || 1;
            const levels = maxLv === 1 ? [1] : [1, maxLv];
            for (const lv of levels) {
                for (const accessor of ACCESSORS) {
                    try {
                        sm[accessor](id, lv, null);
                    } catch (e: any) {
                        failures.push(`id=${id}(${sm.GetSkillName(id)}) Lv${lv} ${accessor}: ${e.message}`);
                    }
                }
            }
        }
        expect(failures, failures.join('\n')).toEqual([]);
    });
});
