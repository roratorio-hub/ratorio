// === AUTO-GENERATED IMPORTS ===
import { CSkillManager } from '../../../roro/m/js/CSkillManager.js';
import { CMigConstDataManager } from '../../../roro/m/js/data/CMigConstDataManager.js';
import { HtmlGetObjectCheckedById, MallocArray, DivideDigits3 } from '../../../roro/common/js/util.js';
import { n_B_TAISEI } from '../../../roro/m/js/mobconfplayer.js';
import { g_dataManagerMobConfInput } from '../../../roro/m/js/CMobConfInput.js';
// === END AUTO-GENERATED IMPORTS ===
"use strict";

/** 一次職支援　設定値配列 */
export let g_confDataIchizi = null;

/** 二次職支援　設定値配列 */
export let g_confDataNizi = null;

/** 三次職支援　設定値配列 */
export let g_confDataSanzi = null;

/** 四次職支援　設定値配列 */
export let g_confDataYozi = null;

/** デバフ 設定値配列 */
export let g_confDataDebuff = null;

/** 一次職支援　設定欄オブジェクト */
export let g_objCharaConfIchizi = null;

/** 二次職支援　設定欄オブジェクト */
export let g_objCharaConfNizi = null;

/** 三次職支援　設定欄オブジェクト */
export let g_objCharaConfSanzi = null;

/** 四次職支援　設定欄オブジェクト */
export let g_objCharaConfYozi = null;

/** デバフ　設定欄オブジェクト */
export let g_objCharaConfDebuff = null;

/** 時限効果設定　設定数 */
export const TIME_ITEM_CONF_COUNT = 20;

/** 時限効果設定　設定値配列 */
export let g_timeItemConf = MallocArray(TIME_ITEM_CONF_COUNT, 0);

/** 時限効果設定　有効フラグ配列 */
export let g_timeItemConfEffective = MallocArray(TIME_ITEM_CONF_COUNT, true);

/** 時限効果設定　一斉変更ボタンの状態 */
export let g_timeItemConfAllEffective = 1;

/** スキルマネージャ */
export let g_skillManager = new CSkillManager();

/** 二刀流フラグ */
export let n_Nitou = false;

/** 二刀流フラグ */

/** ステータス・装備・スキルなどで短縮された変動詠唱時間の残余率 */
export let g_VariableCastTimeRate = 0;

/** SP消費軽減率 */
export let costDownForDisp = 0;

// TODO: 移行不完全（先行移植）
/** 定義済みデータマネージャ */
export let g_constDataManager = new CMigConstDataManager();

// TODO: 
/** キャラクターデータ保持形式移行実験 */
export let g_charaData = {
	cardCategoryMap: new Map()
};

// 性能カスタマイズ ステータス関連
export const CUSTOM_CONF_STATUS_LIMIT = 30;
export let g_confDataCustomStatus = Array(CUSTOM_CONF_STATUS_LIMIT).fill(0);
// 性能カスタマイズ 攻撃関連
export const CUSTOM_CONF_ATK_LIMIT = 30;
export let g_confDataCustomAtk = Array(CUSTOM_CONF_ATK_LIMIT).fill(0);
// 性能カスタマイズ 防御関連
export const CUSTOM_CONF_DEF_LIMIT = 20;
export let g_confDataCustomDef = Array(CUSTOM_CONF_DEF_LIMIT).fill(0);
// 性能カスタマイズ スキル関連
export const CUSTOM_CONF_SKILL_LIMIT = 20;
export let g_confDataCustomSkill = Array(CUSTOM_CONF_SKILL_LIMIT).fill(0);
// 性能カスタマイズ 特性ステータス関連
export const CUSTOM_CONF_SPEC_LIMIT = 20;
export let g_confDataCustomSpecStatus = Array(CUSTOM_CONF_SPEC_LIMIT).fill(0);

// 計算機メインコントローラ（ro4以降）
export let g_confDataCustomStatusMIG = null;
export let g_confDataSpecMIG = null;
export let g_confDataCustomSkillMIG = null;
export let g_confDataCustomSpecStatusMIG = null;

export function ResetConfDataAllMIG (bAsOnLoad) {

	// 処理整理途上のため、ここで必要
	if (!bAsOnLoad) {
		n_B_TAISEI.fill(0);

		// データ管理インスタンス生成
		g_dataManagerMobConfInput.ResetDataAll();
	}

	// TODO: マジックナンバー
	// CSaveDataUnitの該当クラスの要素数を直接指定している
	g_confDataCustomStatusMIG = Array(46).fill(0);
	g_confDataCustomSpecStatusMIG = Array(12).fill(0);
	g_confDataSpecMIG = [
		[Array(54).fill(0), Array(54).fill(0), Array(54).fill(0)],
		[Array(54).fill(0), Array(54).fill(0), Array(54).fill(0)],
	];
	g_confDataCustomSkillMIG = Array(12).fill(0);
}
ResetConfDataAllMIG(true);

/**
 * 3桁区切りの適用.
 * @param value 値
 */
export function __DIG3(value) {

	if (HtmlGetObjectCheckedById("OBJID_CHECK_DIGIT3", false)) {
		return DivideDigits3(value);
	}

	return ("" + value);
}

if (typeof window !== 'undefined') {
    window.g_timeItemConfAllEffective = g_timeItemConfAllEffective;
    window.g_constDataManager = g_constDataManager;
}

// C-6: 性能カスタマイズ系 conf オブジェクト（旧・foot.js が window 直書きしていた分）
export let g_objCharaConfCustomAtk = null;
export let g_objCharaConfCustomDef = null;
export let g_objCharaConfCustomSkill = null;
export let g_objCharaConfCustomSpecStatus = null;
export let g_objCharaConfCustomStatus = null;

// C-6: 書き込みは import binding では不可のためセッターを使用
export function set_g_confDataIchizi(v) { g_confDataIchizi = v; }
export function set_g_confDataNizi(v) { g_confDataNizi = v; }
export function set_g_confDataSanzi(v) { g_confDataSanzi = v; }
export function set_g_confDataYozi(v) { g_confDataYozi = v; }
export function set_g_confDataDebuff(v) { g_confDataDebuff = v; }
export function set_g_confDataCustomAtk(v) { g_confDataCustomAtk = v; }
export function set_g_confDataCustomDef(v) { g_confDataCustomDef = v; }
export function set_g_confDataCustomSkill(v) { g_confDataCustomSkill = v; }
export function set_g_confDataCustomSpecStatus(v) { g_confDataCustomSpecStatus = v; }
export function set_g_confDataCustomStatus(v) { g_confDataCustomStatus = v; }
export function set_g_objCharaConfIchizi(v) { g_objCharaConfIchizi = v; }
export function set_g_objCharaConfNizi(v) { g_objCharaConfNizi = v; }
export function set_g_objCharaConfSanzi(v) { g_objCharaConfSanzi = v; }
export function set_g_objCharaConfYozi(v) { g_objCharaConfYozi = v; }
export function set_g_objCharaConfDebuff(v) { g_objCharaConfDebuff = v; }
export function set_n_Nitou(v) { n_Nitou = v; }
export function set_costDownForDisp(v) { costDownForDisp = v; }
export function set_g_VariableCastTimeRate(v) { g_VariableCastTimeRate = v; }
export function set_g_objCharaConfCustomAtk(v) { g_objCharaConfCustomAtk = v; }
export function set_g_objCharaConfCustomDef(v) { g_objCharaConfCustomDef = v; }
export function set_g_objCharaConfCustomSkill(v) { g_objCharaConfCustomSkill = v; }
export function set_g_objCharaConfCustomSpecStatus(v) { g_objCharaConfCustomSpecStatus = v; }
export function set_g_objCharaConfCustomStatus(v) { g_objCharaConfCustomStatus = v; }
