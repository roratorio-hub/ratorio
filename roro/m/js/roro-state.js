/**
 * roro 計算エンジンの共有 mutable state（C-6: 脱 window フェーズ）.
 *
 * かつて foot.js の Object.defineProperties(window, ...) で公開されていた変数を
 * 段階的にこのモジュールへ移動する。依存ゼロの葉モジュールであり、
 * どのファイルからも安全に import できる（head.js / foot.js 直接 import の
 * vitest ハング問題を回避できる。経緯: .claude/context/dewindow/reference.md）。
 *
 * 読み取り: `import { X } from './roro-state.js'`（live binding — 常に現在値が見える）
 * 書き込み: ESM の import binding は読み取り専用のため、必ず対応する setX() を使う。
 */

// ---- 計算データテキスト用の ITEM_SP 集計値（書き込み元: foot.js / 読み取り: CCalcDataTextCreator.js）----

export let g_ITEM_SP_FLEE_PLUS_value_forCalcData = 0;
export let g_ITEM_SP_SKILL_CAST_TIME_value_forCalcData = 0;
export let g_ITEM_SP_ASPD_UP_value_forCalcData = 0;
export let g_ITEM_SP_STR_PLUS_PLANE_value_forCalcData = 0;
export let g_ITEM_SP_AGI_PLUS_PLANE_value_forCalcData = 0;
export let g_ITEM_SP_VIT_PLUS_PLANE_value_forCalcData = 0;
export let g_ITEM_SP_INT_PLUS_PLANE_value_forCalcData = 0;
export let g_ITEM_SP_DEX_PLUS_PLANE_value_forCalcData = 0;
export let g_ITEM_SP_LUK_PLUS_PLANE_value_forCalcData = 0;

export function setItemSpFleePlusForCalcData(v) { g_ITEM_SP_FLEE_PLUS_value_forCalcData = v; }
export function setItemSpSkillCastTimeForCalcData(v) { g_ITEM_SP_SKILL_CAST_TIME_value_forCalcData = v; }
export function setItemSpAspdUpForCalcData(v) { g_ITEM_SP_ASPD_UP_value_forCalcData = v; }
export function setItemSpStrPlusPlaneForCalcData(v) { g_ITEM_SP_STR_PLUS_PLANE_value_forCalcData = v; }
export function setItemSpAgiPlusPlaneForCalcData(v) { g_ITEM_SP_AGI_PLUS_PLANE_value_forCalcData = v; }
export function setItemSpVitPlusPlaneForCalcData(v) { g_ITEM_SP_VIT_PLUS_PLANE_value_forCalcData = v; }
export function setItemSpIntPlusPlaneForCalcData(v) { g_ITEM_SP_INT_PLUS_PLANE_value_forCalcData = v; }
export function setItemSpDexPlusPlaneForCalcData(v) { g_ITEM_SP_DEX_PLUS_PLANE_value_forCalcData = v; }
export function setItemSpLukPlusPlaneForCalcData(v) { g_ITEM_SP_LUK_PLUS_PLANE_value_forCalcData = v; }

// ---- foot.js が公開する静的データ ----
export const SpeedPotName = ["なし","スピードアップポーション","ハイスピードポーション","バーサークポーション"];

// ---- foot.js から移行した共有 state（C-6 一括移行分）----

export let SU_STR = 0;
export let SU_AGI = 0;
export let SU_VIT = 0;
export let SU_DEX = 0;
export let SU_INT = 0;
export let SU_LUK = 0;
export let n_A_JobLV = 1;
export let n_A_STR = 1;
export let n_A_AGI = 1;
export let n_A_VIT = 1;
export let n_A_DEX = 1;
export let n_A_INT = 1;
export let n_A_LUK = 1;
export let n_A_STA = 0;
export let n_A_WIS = 0;
export let n_A_SPL = 0;
export let n_A_CRT = 0;
export let n_A_WeaponType = 0;
export let n_A_HEAD_DEF_PLUS = 0;
export let n_A_BODY_DEF_PLUS = 0;
export let n_A_SHIELD_DEF_PLUS = 0;
export let n_A_SHOULDER_DEF_PLUS = 0;
export let n_A_SHOES_DEF_PLUS = 0;
export let n_A_Weapon_Transcendence = 0;
export let n_A_Weapon2_Transcendence = 0;
export let n_A_HEAD_DEF_Transcendence = 0;
export let n_A_SHIELD_DEF_Transcendence = 0;
export let n_A_BODY_DEF_Transcendence = 0;
export let n_A_SHOULDER_DEF_Transcendence = 0;
export let n_A_SHOES_DEF_Transcendence = 0;
export let n_A_WeaponLV = 0;
export let n_A_Weapon_ATK = 0;
export let n_A_Weapon_ATKplus = 0;
export let n_A_WeaponLV_seirenATK = 0;
export let n_A_WeaponLV_Minplus = 0;
export let n_A_WeaponLV_Maxplus = 0;
export let n_A_Weapon2LV = 0;
export let n_A_Weapon2_ATK = 0;
export let n_A_Weapon2_ATKplus = 0;
export let n_A_Weapon2LV_seirenATK = 0;
export let n_A_Weapon2LV_Minplus = 0;
export let n_A_Weapon2LV_Maxplus = 0;
export let n_A_BodyZokusei = 0;
export let n_B_DEF2 = [0, 0, 0];
export let n_B_MDEF2 = 0;
export let n_A_costume = [];
export let n_A_PassSkill5 = [];
export let g_itemIdArray = [];
export let g_refinedArray = [];
export let g_objMobConfInput = null;

export function set_SU_STR(v) { SU_STR = v; }
export function set_SU_AGI(v) { SU_AGI = v; }
export function set_SU_VIT(v) { SU_VIT = v; }
export function set_SU_DEX(v) { SU_DEX = v; }
export function set_SU_INT(v) { SU_INT = v; }
export function set_SU_LUK(v) { SU_LUK = v; }
export function set_n_A_JobLV(v) { n_A_JobLV = v; }
export function set_n_A_STR(v) { n_A_STR = v; }
export function set_n_A_AGI(v) { n_A_AGI = v; }
export function set_n_A_VIT(v) { n_A_VIT = v; }
export function set_n_A_DEX(v) { n_A_DEX = v; }
export function set_n_A_INT(v) { n_A_INT = v; }
export function set_n_A_LUK(v) { n_A_LUK = v; }
export function set_n_A_STA(v) { n_A_STA = v; }
export function set_n_A_WIS(v) { n_A_WIS = v; }
export function set_n_A_SPL(v) { n_A_SPL = v; }
export function set_n_A_CRT(v) { n_A_CRT = v; }
export function set_n_A_WeaponType(v) { n_A_WeaponType = v; }
export function set_n_A_HEAD_DEF_PLUS(v) { n_A_HEAD_DEF_PLUS = v; }
export function set_n_A_BODY_DEF_PLUS(v) { n_A_BODY_DEF_PLUS = v; }
export function set_n_A_SHIELD_DEF_PLUS(v) { n_A_SHIELD_DEF_PLUS = v; }
export function set_n_A_SHOULDER_DEF_PLUS(v) { n_A_SHOULDER_DEF_PLUS = v; }
export function set_n_A_SHOES_DEF_PLUS(v) { n_A_SHOES_DEF_PLUS = v; }
export function set_n_A_Weapon_Transcendence(v) { n_A_Weapon_Transcendence = v; }
export function set_n_A_Weapon2_Transcendence(v) { n_A_Weapon2_Transcendence = v; }
export function set_n_A_HEAD_DEF_Transcendence(v) { n_A_HEAD_DEF_Transcendence = v; }
export function set_n_A_SHIELD_DEF_Transcendence(v) { n_A_SHIELD_DEF_Transcendence = v; }
export function set_n_A_BODY_DEF_Transcendence(v) { n_A_BODY_DEF_Transcendence = v; }
export function set_n_A_SHOULDER_DEF_Transcendence(v) { n_A_SHOULDER_DEF_Transcendence = v; }
export function set_n_A_SHOES_DEF_Transcendence(v) { n_A_SHOES_DEF_Transcendence = v; }
export function set_n_A_WeaponLV(v) { n_A_WeaponLV = v; }
export function set_n_A_Weapon_ATK(v) { n_A_Weapon_ATK = v; }
export function set_n_A_Weapon_ATKplus(v) { n_A_Weapon_ATKplus = v; }
export function set_n_A_WeaponLV_seirenATK(v) { n_A_WeaponLV_seirenATK = v; }
export function set_n_A_WeaponLV_Minplus(v) { n_A_WeaponLV_Minplus = v; }
export function set_n_A_WeaponLV_Maxplus(v) { n_A_WeaponLV_Maxplus = v; }
export function set_n_A_Weapon2LV(v) { n_A_Weapon2LV = v; }
export function set_n_A_Weapon2_ATK(v) { n_A_Weapon2_ATK = v; }
export function set_n_A_Weapon2_ATKplus(v) { n_A_Weapon2_ATKplus = v; }
export function set_n_A_Weapon2LV_seirenATK(v) { n_A_Weapon2LV_seirenATK = v; }
export function set_n_A_Weapon2LV_Minplus(v) { n_A_Weapon2LV_Minplus = v; }
export function set_n_A_Weapon2LV_Maxplus(v) { n_A_Weapon2LV_Maxplus = v; }
export function set_n_A_BodyZokusei(v) { n_A_BodyZokusei = v; }
export function set_n_B_DEF2(v) { n_B_DEF2 = v; }
export function set_n_B_MDEF2(v) { n_B_MDEF2 = v; }
export function set_n_A_costume(v) { n_A_costume = v; }
export function set_n_A_PassSkill5(v) { n_A_PassSkill5 = v; }
export function set_g_itemIdArray(v) { g_itemIdArray = v; }
export function set_g_refinedArray(v) { g_refinedArray = v; }
export function set_g_objMobConfInput(v) { g_objMobConfInput = v; }
