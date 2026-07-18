/**
 * foot.js の公開関数への軽量ブリッジ（依存ゼロ・C-6 後半）.
 *
 * foot.js を直接 import すると循環・vitest ハングを引き起こすため（reference.md 参照）、
 * 外部ファイルは本モジュールの委譲ラッパーを import して呼び出す。
 * 実体は foot.js がモジュール評価時に __registerFootFunctions() で登録する。
 * 未登録環境（roro/other ページ・ユニットテスト）では各ラッパーは no-op（undefined を返す）。
 *
 * ※ StAllCalc は workspace TS（rtxApiImport.ts）が window 経由で呼ぶ Workspace I/F のため
 *    引き続き foot.js が window に公開する（Phase 4 で解消）。
 */

const _reg = {};

/** foot.js がモジュール評価時に実体を登録する */
export function __registerFootFunctions(fns) {
	Object.assign(_reg, fns);
}

export function RefreshSuperNoviceFullWeapon(...a) { return _reg.RefreshSuperNoviceFullWeapon?.(...a); }
export function GetCastScalingOfSkillForCastTimeVary(...a) { return _reg.GetCastScalingOfSkillForCastTimeVary?.(...a); }
export function GetCastFixOfSkillForCastTimeVary(...a) { return _reg.GetCastFixOfSkillForCastTimeVary?.(...a); }
export function GetCastScalingOfSkillForCastTimeFixed(...a) { return _reg.GetCastScalingOfSkillForCastTimeFixed?.(...a); }
export function GetCastFixOfSkillForCastTimeFixed(...a) { return _reg.GetCastFixOfSkillForCastTimeFixed?.(...a); }
export function GetAdditionalFixedCastTime(...a) { return _reg.GetAdditionalFixedCastTime?.(...a); }
export function GetCastScalingOfSkillForCastTimeForce(...a) { return _reg.GetCastScalingOfSkillForCastTimeForce?.(...a); }
export function GetCastFixOfSkillForCastTimeForce(...a) { return _reg.GetCastFixOfSkillForCastTimeForce?.(...a); }
export function GetCoolFixOfSkill(...a) { return _reg.GetCoolFixOfSkill?.(...a); }
export function GetCostScalingOfSkill(...a) { return _reg.GetCostScalingOfSkill?.(...a); }
export function GetCostFixOfSkill(...a) { return _reg.GetCostFixOfSkill?.(...a); }
export function GetEquippedTotalSPEquip(...a) { return _reg.GetEquippedTotalSPEquip?.(...a); }
export function GetEquippedSPListEquip(...a) { return _reg.GetEquippedSPListEquip?.(...a); }
export function GetEquippedSPValueArrayEquip(...a) { return _reg.GetEquippedSPValueArrayEquip?.(...a); }
export function GetEquippedTotalSPCardAndElse(...a) { return _reg.GetEquippedTotalSPCardAndElse?.(...a); }
export function GetEquippedSPListCardAndElse(...a) { return _reg.GetEquippedSPListCardAndElse?.(...a); }
export function GetEquippedSPValueArrayCardAndElse(...a) { return _reg.GetEquippedSPValueArrayCardAndElse?.(...a); }
export function GetEquippedTotalSPArrow(...a) { return _reg.GetEquippedTotalSPArrow?.(...a); }
export function IsMatchSpDefId(...a) { return _reg.IsMatchSpDefId?.(...a); }
export function CheckSpDefFriendlyOver(...a) { return _reg.CheckSpDefFriendlyOver?.(...a); }
export function CheckSpDefBaseLvOver(...a) { return _reg.CheckSpDefBaseLvOver?.(...a); }
export function CheckSpDefJobRestrict(...a) { return _reg.CheckSpDefJobRestrict?.(...a); }
export function CheckSpDefPureStatus(...a) { return _reg.CheckSpDefPureStatus?.(...a); }
export function CheckSpDefRefineOver(...a) { return _reg.CheckSpDefRefineOver?.(...a); }
export function InitJobInfo(...a) { return _reg.InitJobInfo?.(...a); }
export function NumSearch(...a) { return _reg.NumSearch?.(...a); }
export function NumSearch2(...a) { return _reg.NumSearch2?.(...a); }
export function EquipNumSearchFurubitaSet(...a) { return _reg.EquipNumSearchFurubitaSet?.(...a); }
export function ROUNDDOWN(...a) { return _reg.ROUNDDOWN?.(...a); }
export function Init(...a) { return _reg.Init?.(...a); }
