/**
 * ro4 計算エンジンの共有 mutable state（C-6: 脱 window フェーズ）.
 *
 * かつて head.js の Object.defineProperties(window, ...) で公開されていた変数のうち、
 * 実際にモジュール間で共有されているものをこのモジュールで管理する。
 * 依存ゼロの葉モジュールであり、どのファイルからも安全に import できる
 * （head.js / foot.js 直接 import の vitest ハング問題を回避。roro 側は roro-state.js）。
 *
 * 読み取り: `import { X } from './ro4-state.js'`（live binding — 常に現在値が見える）
 * 書き込み: ESM の import binding は読み取り専用のため、必ず対応する set_X() を使う。
 * 配列の要素書き込み（X[i] = v）は binding の再代入ではないため import したまま行ってよい。
 */

// ---- セーブデータ（書き込み元: saveload.js / head.js）----
export let SaveDataAll = Array(20).fill("ZZZZ");
export let SaveNameAll = Array(501).fill("ZZZZ");

// ---- foot.js（roro 側）から書き込まれる計算入力 ----
export let n_SiegeMode = false;
export let n_A_BaseLV = 1;
export let n_A_ActiveSkill = null;
export let n_A_ActiveSkillLV = null;
export let n_A_Kotei_Cast_Keigen = 0;
export let n_A_QUAKE_KIRI = 0;
export let n_A_Arrow = 0;
export let delayDownForDisp = 0;
export let aspdRaw = 0;
export let n_A_Weapon_zokusei = 0;

// ---- head.js が公開する静的データ（シールドスペル値テーブル）----
export const n_SieldSp = ["off","on",20,35,40,50,60,75,80,85,90,95,98,105,110,120,130,150,100,140,170];

// ---- head.js が公開する計算結果・状態（外部は読み取りのみ）----
export let n_Enekyori = false;
export let n_Delay = [0, 0, 0, 0, 0, 0, 0, 0];
export let n_tok = Array(451).fill(0);
export let n_tok_no_limit = Array(451).fill(0);
export let w_DMG = [0, 0, 0];
export let n_Heal_MATK = [0, 0, 0];
export let n_AS_check_3dan = false;
export let n_CONFIG = [0, 33, 19];
export let g_perfectHitRate = 0;
export let g_bDefinedDamageIntervals = false;

export function set_SaveDataAll(v) { SaveDataAll = v; }
export function set_SaveNameAll(v) { SaveNameAll = v; }
export function set_n_SiegeMode(v) { n_SiegeMode = v; }
export function set_n_A_BaseLV(v) { n_A_BaseLV = v; }
export function set_n_A_ActiveSkill(v) { n_A_ActiveSkill = v; }
export function set_n_A_ActiveSkillLV(v) { n_A_ActiveSkillLV = v; }
export function set_n_A_Kotei_Cast_Keigen(v) { n_A_Kotei_Cast_Keigen = v; }
export function set_n_A_QUAKE_KIRI(v) { n_A_QUAKE_KIRI = v; }
export function set_n_A_Arrow(v) { n_A_Arrow = v; }
export function set_delayDownForDisp(v) { delayDownForDisp = v; }
export function set_aspdRaw(v) { aspdRaw = v; }
export function set_n_A_Weapon_zokusei(v) { n_A_Weapon_zokusei = v; }
export function set_n_Enekyori(v) { n_Enekyori = v; }
export function set_n_Delay(v) { n_Delay = v; }
export function set_n_tok(v) { n_tok = v; }
export function set_n_tok_no_limit(v) { n_tok_no_limit = v; }
export function set_w_DMG(v) { w_DMG = v; }
export function set_n_Heal_MATK(v) { n_Heal_MATK = v; }
export function set_n_AS_check_3dan(v) { n_AS_check_3dan = v; }
export function set_n_CONFIG(v) { n_CONFIG = v; }
export function set_g_perfectHitRate(v) { g_perfectHitRate = v; }
export function set_g_bDefinedDamageIntervals(v) { g_bDefinedDamageIntervals = v; }
