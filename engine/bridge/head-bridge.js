/**
 * head.js の公開関数への軽量ブリッジ（依存ゼロ・C-6 後半）.
 *
 * head.js を直接 import すると循環・vitest ハング / OOM を引き起こすため（reference.md 参照）、
 * 外部ファイルは本モジュールの委譲ラッパーを import して呼び出す。
 * 実体は head.js がモジュール評価時に __registerHeadFunctions() で登録する。
 * 未登録環境（pages/ ページ・ユニットテスト）では各ラッパーは no-op（undefined を返す）。
 */

const _reg = {};

/** head.js がモジュール評価時に実体を登録する */
export function __registerHeadFunctions(fns) {
	Object.assign(_reg, fns);
}

export function GetActRateSandansho(...a) { return _reg.GetActRateSandansho?.(...a); }
export function GetActRateCritical(...a) { return _reg.GetActRateCritical?.(...a); }
export function calc(...a) { return _reg.calc?.(...a); }
export function ApplyPhysicalSpecializeMonster(...a) { return _reg.ApplyPhysicalSpecializeMonster?.(...a); }

// Phase 3b: スキル計算式ブロック（head-skill-formula-*.js）が head.js 本体の関数を呼ぶためのラッパー
export function ATKbaiJYOUSAN(...a) { return _reg.ATKbaiJYOUSAN?.(...a); }
export function BattleCalcSubDamagePhysicalCommon(...a) { return _reg.BattleCalcSubDamagePhysicalCommon?.(...a); }
export function GetBattlerAtkPercentUp(...a) { return _reg.GetBattlerAtkPercentUp?.(...a); }
export function ApplyAttackDamageAmplify(...a) { return _reg.ApplyAttackDamageAmplify?.(...a); }
export function ApplyElementRatio(...a) { return _reg.ApplyElementRatio?.(...a); }
export function ApplyHitJudgeElementRatio(...a) { return _reg.ApplyHitJudgeElementRatio?.(...a); }
export function ApplyLexAeterna(...a) { return _reg.ApplyLexAeterna?.(...a); }
export function ApplyMagicalSkillDamageRatioChange(...a) { return _reg.ApplyMagicalSkillDamageRatioChange?.(...a); }
export function ApplyMagicalSpecializeMonster(...a) { return _reg.ApplyMagicalSpecializeMonster?.(...a); }
export function ApplyMonsterDefence(...a) { return _reg.ApplyMonsterDefence?.(...a); }
export function ApplyPhysicalDamageRatio(...a) { return _reg.ApplyPhysicalDamageRatio?.(...a); }
export function ApplyPhysicalSkillDamageRatioChange(...a) { return _reg.ApplyPhysicalSkillDamageRatioChange?.(...a); }
export function ApplyRegistPVPNormal(...a) { return _reg.ApplyRegistPVPNormal?.(...a); }
export function ApplyResistElement(...a) { return _reg.ApplyResistElement?.(...a); }
export function BaiTaisei_A_SP(...a) { return _reg.BaiTaisei_A_SP?.(...a); }
export function BaiTaisei_C(...a) { return _reg.BaiTaisei_C?.(...a); }
export function BaiTaisei_E(...a) { return _reg.BaiTaisei_E?.(...a); }
export function BuildBattleResultHtml(...a) { return _reg.BuildBattleResultHtml?.(...a); }
export function BuildCastAndDelayHtml(...a) { return _reg.BuildCastAndDelayHtml?.(...a); }
export function GetActHitRateAll(...a) { return _reg.GetActHitRateAll?.(...a); }
export function GetBattlerMatkPercentUp(...a) { return _reg.GetBattlerMatkPercentUp?.(...a); }
export function GetFixedAppendAtk(...a) { return _reg.GetFixedAppendAtk?.(...a); }
export function GetPerfectHitDamage(...a) { return _reg.GetPerfectHitDamage?.(...a); }
export function GetSpiderWebDamageRatio(...a) { return _reg.GetSpiderWebDamageRatio?.(...a); }
export function HealCalc(...a) { return _reg.HealCalc?.(...a); }
export function TYPE_SYUUREN(...a) { return _reg.TYPE_SYUUREN?.(...a); }

// Phase 3c: 残り巨大関数の分割先（received-damage.js / head-skill-ratio-*.js）が
// head.js 本体の関数を呼ぶためのラッパー
export function BattleCalc999(...a) { return _reg.BattleCalc999?.(...a); }
export function DamageModifierOfArea(...a) { return _reg.DamageModifierOfArea?.(...a); }
export function ApplyRegistPVPEnergyCoat(...a) { return _reg.ApplyRegistPVPEnergyCoat?.(...a); }
export function GetElementFieldDamageRatio(...a) { return _reg.GetElementFieldDamageRatio?.(...a); }
export function ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(...a) { return _reg.ApplyPhysicalSkillDamageRatioChangeSubArcanaCard?.(...a); }
