/**
 * DOM読み書きゼロのダメージ計算API（リファクタリング計画 Phase 10）。
 *
 * `StAllCalc()`（stallcalc.js）/ `calc()`（battlecalc.js）はどちらもDOM経由の入力読み取り・
 * DOM経由の結果描画を内部で行う。本モジュールはその中間にある純粋な計算だけを
 * 取り出して公開する:
 *
 *   HydrateFromModel(model)  … Phase 8。モデル → グローバル書き込み（DOM不使用）
 *   StAllCalcCore(...)       … Phase 5。foot-stallcalc-* 30モジュールを使った基礎計算
 *   ComputeBattleResult(...) … Phase 10（本ファイルと同時）。頭.jsのダメージ計算本体
 *
 * のみを順に呼び、`calc()`/`StAllCalc()` が行う描画（DOM書き込み・
 * CFloatingInfoAreaComponentManager 更新等）を一切経由しない。
 *
 * `CBattleCalcResultAll.js`（設置スキルのシミュレーション状態）は2026-08-26に
 * 呼び出しごとの `ctx`（`createInstObjContext()`）へ切り出し済み（残件台帳 B-08）。
 * この経路に限れば `calcFromModel` の並行呼び出しは安全。ただし `StAllCalcCore()` 自体は
 * まだ `roro-state.js`/`ro4-state.js` のモジュールグローバルを読み書きするため、
 * 完全な再入可能性は無い（残件台帳 B-09）。1回呼んで結果を使い切ってから次を呼ぶこと。
 */
import { createEmptyModel } from "./calc-model.js";
import { ExtractModelFromDom, HydrateFromModel } from "../status/stallcalc-hydrate.js";
import { StAllCalcCore } from "../status/stallcalc.js";
import { ComputeBattleResult } from "../battle/battlecalc.js";
import { register } from "./engine-registry.js";

/**
 * モデルからダメージ計算結果を得る（DOM読み書きゼロ）。
 * @param {object} model `createEmptyModel()` の形をしたモデル
 * @returns {object} `CBattleCalcResultAll` インスタンス（charaData/specData/mobData を含む）
 */
export function calcFromModel(model) {
    const { attackMethodConfArray } = HydrateFromModel(model);
    const retValArray = StAllCalcCore(model.status.speedPot, attackMethodConfArray);
    const { battleCalcResultAll } = ComputeBattleResult(retValArray);
    return battleCalcResultAll;
}

/**
 * モデルから `StAllCalcCore()` までの結果を得る（`ComputeBattleResult()` の手前で止める）。
 * 残件台帳 B-09 Phase 1 で追加。`coreOutput`（Core内では書くだけの6変数）を検証する経路として、
 * また将来 Core を Web Worker 側で回す際の入口として使う。
 * @param {object} model `createEmptyModel()` の形をしたモデル
 * @returns {{charaData: Array, specData: Array, mobData: Array, attackMethodConfArray: Array, coreOutput: object}}
 */
export function calcCoreFromModel(model) {
    const { attackMethodConfArray } = HydrateFromModel(model);
    const [charaData, specData, mobData, retAttackMethodConfArray, coreOutput] =
        StAllCalcCore(model.status.speedPot, attackMethodConfArray);
    return { charaData, specData, mobData, attackMethodConfArray: retAttackMethodConfArray, coreOutput };
}

register('calcFromModel', calcFromModel);
register('calcCoreFromModel', calcCoreFromModel);
register('extractModelFromDom', ExtractModelFromDom);
register('createEmptyModel', createEmptyModel);
