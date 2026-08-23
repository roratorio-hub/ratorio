/**
 * DOM読み書きゼロのダメージ計算API（リファクタリング計画 Phase 10）。
 *
 * `StAllCalc()`（foot.js）/ `calc()`（head.js）はどちらもDOM経由の入力読み取り・
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
 * ⚠️ 完全な再入可能性は無い: `CBattleCalcResultAll.js` にモジュールレベルの可変
 * グローバルが4つ残っている（設置スキルのシミュレーション状態）。`calcFromModel` を
 * 2つ以上のモデルに対して並行/インターリーブして呼び出すと、互いの設置スキル状態が
 * 混線する可能性がある。1回呼んで結果を使い切ってから次を呼ぶこと。
 */
import { createEmptyModel } from '../../../roro/m/js/calc-model.js';
import { ExtractModelFromDom, HydrateFromModel } from '../../../roro/m/js/foot-stallcalc-hydrate.js';
import { StAllCalcCore } from '../../../roro/m/js/foot-bridge.js';
import { ComputeBattleResult } from './head-bridge.js';
import { register } from './engine-registry.js';

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

register('calcFromModel', calcFromModel);
register('extractModelFromDom', ExtractModelFromDom);
register('createEmptyModel', createEmptyModel);
