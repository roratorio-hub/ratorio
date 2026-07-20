/**
 * CShadowEquipController への依存ゼロブリッジ（C-2 / 3f-7 と同型）.
 *
 * equip.js / hmrndopt.js は CShadowEquipController.js を直接 import すると
 * CShadowEquipController → equip/hmrndopt の循環が生じるため、
 * 本ブリッジ経由で間接アクセスする。
 * 未登録環境（roro/other ページ・ユニットテスト）では各関数は no-op。
 */

let _ctrl = null;

export function registerShadowEquipController(c) { _ctrl = c; }
export function isShadowEquipAvailable() { return _ctrl !== null; }
export function shadowEquipRebuildAll() { _ctrl?.rebuildAll(); }
