/**
 * head.js の公開関数への軽量ブリッジ（依存ゼロ・C-6 後半）.
 *
 * head.js を直接 import すると循環・vitest ハング / OOM を引き起こすため（reference.md 参照）、
 * 外部ファイルは本モジュールの委譲ラッパーを import して呼び出す。
 * 実体は head.js がモジュール評価時に __registerHeadFunctions() で登録する。
 * 未登録環境（roro/other ページ・ユニットテスト）では各ラッパーは no-op（undefined を返す）。
 *
 * ※ AutoCalc は workspace TS（rtxApiImport.ts）が window 経由で呼ぶ Workspace I/F のため
 *    引き続き head.js が window に公開する（Phase 4 で解消）。
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
