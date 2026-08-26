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
