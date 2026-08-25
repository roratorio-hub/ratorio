/**
 * hmjob.js の公開関数への軽量ブリッジ（依存ゼロ）.
 *
 * hmjob.js は chara.js / CSkillManager.js を import するため、これらのファイルが
 * hmjob.js を直接 import すると循環依存になる。本モジュールで間接参照する。
 * 実体は hmjob.js がモジュール評価時に __registerHmjobFunctions() で登録する。
 */

const _reg = {};

/** hmjob.js がモジュール評価時に実体を登録する */
export function __registerHmjobFunctions(fns) {
	Object.assign(_reg, fns);
}

export function ApplySpecModify(...a)         { return _reg.ApplySpecModify?.(...a); }
export function GetTotalPureBasicStatus(...a) { return _reg.GetTotalPureBasicStatus?.(...a); }
export function GetTotalSpecStatus(...a)      { return _reg.GetTotalSpecStatus?.(...a); }
export function GetBasicStatusBonus(...a)     { return _reg.GetBasicStatusBonus?.(...a); }
export function GetStatusPointRemain(...a)    { return _reg.GetStatusPointRemain?.(...a); }
export function GetPureStatus(...a)           { return _reg.GetPureStatus?.(...a); }
export function GetSpecStatusBonus(...a)      { return _reg.GetSpecStatusBonus?.(...a); }
export function GetPAtk(...a)                 { return _reg.GetPAtk?.(...a); }
export function GetSMatk(...a)                { return _reg.GetSMatk?.(...a); }
export function GetCRate(...a)                { return _reg.GetCRate?.(...a); }
export function GetRes(...a)                  { return _reg.GetRes?.(...a); }
export function GetMres(...a)                 { return _reg.GetMres?.(...a); }
export function GetHPlus(...a)                { return _reg.GetHPlus?.(...a); }
export function GetTStatusPoint(...a)         { return _reg.GetTStatusPoint?.(...a); }
export function GetTStatusPointRemain(...a)   { return _reg.GetTStatusPointRemain?.(...a); }
export function GetDisplayedPAtk(...a)        { return _reg.GetDisplayedPAtk?.(...a); }
export function GetDisplayedSMatk(...a)       { return _reg.GetDisplayedSMatk?.(...a); }
export function GetDisplayedCRate(...a)       { return _reg.GetDisplayedCRate?.(...a); }
export function GetDisplayedRes(...a)         { return _reg.GetDisplayedRes?.(...a); }
export function GetDisplayedMres(...a)        { return _reg.GetDisplayedMres?.(...a); }
export function GetDisplayedHPlus(...a)       { return _reg.GetDisplayedHPlus?.(...a); }
