/**
 * CShadowEquipController への依存ゼロブリッジ（C-2 / 3f-7 と同型）.
 *
 * equip.js / hmrndopt.js は CShadowEquipController.js を直接 import すると
 * CShadowEquipController → equip/hmrndopt の循環が生じるため、
 * 本ブリッジ経由で間接アクセスする。
 * saveimage.js は循環しないが、参照経路の統一と軽量な単体テスト
 * （本ブリッジは依存ゼロ）のため同じく本ブリッジ経由でゲッターを呼ぶ。
 * 未登録環境（roro/other ページ・ユニットテスト）では各関数は no-op（型整合のデフォルト値を返す）。
 */

let _ctrl = null;

export function registerShadowEquipController(c) { _ctrl = c; }
export function isShadowEquipAvailable() { return _ctrl !== null; }
export function shadowEquipRebuildAll() { _ctrl?.rebuildAll(); }
export function getShadowEquippedID(selector) { return _ctrl?.getEquippedID(selector) ?? 0; }
export function getShadowRefined(selector) { return _ctrl?.getRefined(selector) ?? 0; }
export function getShadowRndOptInfoArray(selector) { return _ctrl?.getRndOptInfoArray(selector) ?? []; }
