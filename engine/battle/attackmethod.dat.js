// 攻撃方法（投擲・キャノン）の武器種テーブル。
// 旧 battlecalc.js が定義していたが、CAttackMethodAreaComponentManager がこの3配列のためだけに
// battlecalc.js（全エンジン）を import グラフに引き込み単体テストが OOM していた。
// battlecalc.js 内部（ダメージ計算）と CAttackMethod（選択肢の表示名）の両方から参照される共通データを
// 依存の軽いデータモジュールへ分離する（dewindow: 除外テスト再有効化 Phase 3g）。
//
// CanonOBJ の属性列は ELM_ID_*（common.js が DefineEnum で定義するグローバル定数）を参照するため、
// 本モジュール評価前に必ず common.js を評価しておく。
import "../runtime/common.js";
import { ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_WATER, ELM_ID_WIND } from "../const/EnumElmId.js";

/** 手裏剣の種類 */
export const SyurikenOBJ = [ [10,0,"手裏剣"] ,[30,0,"雨雲の手裏剣"] ,[45,0,"閃光の手裏剣"] ,[70,0,"鋭刃の手裏剣"] ,[100,0,"棘針の手裏剣"] ,[110,0,"星ヒトデ"] ];
/** 苦無の種類 */
export const KunaiOBJ = [ [30,3,"烈火の苦無"] ,[30,1,"氷柱の苦無"] ,[30,4,"狂風の苦無"] ,[30,2,"黒土の苦無"] ,[30,5,"猛毒の苦無"] ,[50,0,"スルメイカ"] ,[50,0,"トビウオ"] ];
/** キャノンボールの種類 */
export const CanonOBJ = [ [100,0,"キャノンボール"], [250,0,"アイアンキャノンボール"], [120,6,"ホーリーキャノンボール"], [120,7,"ダークキャノンボール"], [120,8,"ソウルキャノンボール"], [120,ELM_ID_WATER,"アイスキャノンボール"], [120,ELM_ID_EARTH,"ストーンキャノンボール"], [120,ELM_ID_FIRE,"フレアキャノンボール"], [120,ELM_ID_WIND,"ライトニングキャノンボール"] ];
