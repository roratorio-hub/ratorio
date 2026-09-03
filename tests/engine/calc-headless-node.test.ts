import { describe, it, expect } from 'vitest';
import { calcFromModel } from '@engine/runtime/calc-headless.js';
import { createEmptyModel } from '@engine/runtime/calc-model.js';
import { SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT } from '@engine/skill/skill.dat.js';

// 残件台帳 B-28: calcFromModel() が DOM 非依存で（=対応する calcx.html のHTMLが
// 一切無い bare な happy-dom document でも）完走することを固定する回帰テスト。
//
// 真因は util.js の HtmlRemoveOptionAll()/HtmlCreateElementOption() が happy-dom の
// 病的に遅い・リークする options API を使っていたこと（8GBヒープ・13分でOOM）。
// util.js 修正後は、calc-headless.js の推移的import（322モジュール）を含めても
// 数百ms で完走する。このテストはその両方（クラッシュしない・実用速度）を担保する。
//
// createEmptyModel() は大半のフィールドが undefined/既定値のため、そのままでは
// StAllCalcCore() 内の実データ参照（職業・武器種別・攻撃手段）で例外になる。
// 最小限の妥当な値だけを埋める（SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT = 通常攻撃の
// ダメージ計算用ダミースキル。攻撃手段として常に存在する）。
function buildMinimalValidModel() {
    const model = createEmptyModel();
    model.status.jobId = 0;
    model.status.baseLv = 99;
    model.status.jobLv = 50;
    model.weapon.type = 0;
    model.weapon.zokusei = 0;
    model.weapon.atkPlus = 0;
    model.weapon.transcendence = 0;
    model.weapon.weapon2Type = 0;
    model.weapon.weapon2AtkPlus = 0;
    model.weapon.weapon2Transcendence = 0;
    model.attackMethod.skillId = SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT;
    model.attackMethod.sourceType = 0;
    model.attackMethod.skillLv = 1;
    model.attackMethod.optionValueArray = [];
    return model;
}

describe('calcFromModel() の Node/happy-dom 実行（DOM非依存。残件台帳 B-28）', () => {
    it('calcx.html のHTMLが存在しない bare な document でも例外を投げず完走する', () => {
        expect(() => calcFromModel(buildMinimalValidModel())).not.toThrow();
    });

    it('CBattleCalcResultAll インスタンスを返す', () => {
        const result = calcFromModel(buildMinimalValidModel());
        expect(result?.constructor?.name).toBe('CBattleCalcResultAll');
    });

    // 単体実行では数百msで完走するが、閾値は全スイート並列実行時のCPU競合を見込んで
    // 大きめに取る（真因の旧実装なら8GBヒープ・13分でOOMするため、この閾値でも
    // 回帰の検出には十分）。testTimeout も同様の理由でデフォルト5000msより長くする。
    it('5秒以内に完走する（happy-dom options API の性能回帰ガード）', () => {
        const t0 = Date.now();
        calcFromModel(buildMinimalValidModel());
        expect(Date.now() - t0).toBeLessThan(5000);
    }, 15000);

    it('同一モデルを2回連続で呼んでも例外を投げない（D2再入性。1回遅れの自己修復も2回目で収束する）', () => {
        const model = buildMinimalValidModel();
        expect(() => {
            calcFromModel(model);
            calcFromModel(model);
        }).not.toThrow();
    });
});
