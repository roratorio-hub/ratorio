import { describe, it, expect, beforeAll } from 'vitest';

/**
 * カートキャノンの Power 計算の回帰テスト。
 *
 * バグ: `var powCart` を宣言・代入しておきながら、続く式が `powCard` を読んでいた（タイポ）。
 * ESM は常に strict mode なので bare な未定義識別子の読み取りは ReferenceError になる。
 * カートキャノンを選択したときだけ通る分岐なので integration 全緑のまま潜伏していた。
 *
 * TDZ 回避の import 順は CSkillManager.test.ts と同じ理由（reference.md「global.js の module-level Init」）。
 */
let sm: any;
let SKILL_ID_CART_CANNON: number;
let SKILL_ID_CART_KAIZO: number;

/** LearnedSkillSearch / UsedSkillSearch は注入パターン。テスト用に固定値を返す実体を差し込む。 */
let learnedLv = 0;
let usedLv = 0;

beforeAll(async () => {
    const skillDat = await import('@engine/skill/skill.dat.js');
    SKILL_ID_CART_CANNON = skillDat.SKILL_ID_CART_CANNON;
    SKILL_ID_CART_KAIZO = skillDat.SKILL_ID_CART_KAIZO;
    await import('@engine/runtime/global.js');
    const mod = await import('@engine/skill/CSkillManager.js');
    mod.RegisterLearnedSkillSearch((id: number) => (id === SKILL_ID_CART_KAIZO ? learnedLv : 0));
    mod.RegisterUsedSkillSearch((id: number) => (id === SKILL_ID_CART_KAIZO ? usedLv : 0));
    sm = new mod.CSkillManager();
});

/** charaDataManger のうち Power が使うのは GetCharaInt のみ。 */
const chara = (int: number) => ({ GetCharaInt: () => int });

describe('CSkillManager: カートキャノンの威力計算', () => {
    it('カート改造Lv と INT に応じた加算を行う（60*Lv + floor(50*カート改造Lv * INT/40)）', () => {
        learnedLv = 10;
        usedLv = 0;
        // 60*5 + floor(50*10 * 80/40) = 300 + floor(500*2) = 1300
        expect(sm.GetPower(SKILL_ID_CART_CANNON, 5, chara(80))).toBe(1300);
    });

    it('カート改造が未修得なら基本式のみ（60*Lv）', () => {
        learnedLv = 0;
        usedLv = 0;
        expect(sm.GetPower(SKILL_ID_CART_CANNON, 5, chara(80))).toBe(300);
    });

    it('修得Lvと使用Lvのうち大きい方を採用する', () => {
        learnedLv = 3;
        usedLv = 10;
        // max(3,10)=10 → 300 + floor(500 * 1) = 800
        expect(sm.GetPower(SKILL_ID_CART_CANNON, 5, chara(40))).toBe(800);
    });

    it('INT が 40 未満でも小数を切り捨てて加算する', () => {
        learnedLv = 1;
        usedLv = 0;
        // 60*1 + floor(50*1 * 10/40) = 60 + floor(12.5) = 72
        expect(sm.GetPower(SKILL_ID_CART_CANNON, 1, chara(10))).toBe(72);
    });
});
