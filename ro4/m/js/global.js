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
export let n_NitouCalc = false;

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
		n_B_TAISEI = Array(n_B_TAISEI.length).fill(0);

		// データ管理インスタンス生成
		g_dataManagerMobConfInput.ResetDataAll();
	}

	// TODO: マジックナンバー
	// CSaveDataUnitの該当クラスの要素数を直接指定している
	g_confDataCustomStatusMIG = Array(46).fill(0);
	g_confDataCustomSpecStatusMIG = Array(12).fill(0);
	g_confDataSpecMIG = [
		[Array(53).fill(0), Array(53).fill(0), Array(53).fill(0)],
		[Array(53).fill(0), Array(53).fill(0), Array(53).fill(0)],
	];
	g_confDataCustomSkillMIG = Array(12).fill(0);
	if (typeof window !== 'undefined') {
		window.g_confDataCustomStatusMIG = g_confDataCustomStatusMIG;
		window.g_confDataCustomSpecStatusMIG = g_confDataCustomSpecStatusMIG;
		window.g_confDataSpecMIG = g_confDataSpecMIG;
		window.g_confDataCustomSkillMIG = g_confDataCustomSkillMIG;
	}
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
    window.g_confDataIchizi = g_confDataIchizi;
    window.g_confDataNizi = g_confDataNizi;
    window.g_confDataSanzi = g_confDataSanzi;
    window.g_confDataYozi = g_confDataYozi;
    window.g_confDataDebuff = g_confDataDebuff;
    window.g_objCharaConfIchizi = g_objCharaConfIchizi;
    window.g_objCharaConfNizi = g_objCharaConfNizi;
    window.g_objCharaConfSanzi = g_objCharaConfSanzi;
    window.g_objCharaConfYozi = g_objCharaConfYozi;
    window.g_objCharaConfDebuff = g_objCharaConfDebuff;
    window.TIME_ITEM_CONF_COUNT = TIME_ITEM_CONF_COUNT;
    window.g_timeItemConf = g_timeItemConf;
    window.g_timeItemConfEffective = g_timeItemConfEffective;
    window.g_timeItemConfAllEffective = g_timeItemConfAllEffective;
    window.g_skillManager = g_skillManager;
    window.n_Nitou = n_Nitou;
    window.n_NitouCalc = n_NitouCalc;
    window.g_VariableCastTimeRate = g_VariableCastTimeRate;
    window.costDownForDisp = costDownForDisp;
    window.g_constDataManager = g_constDataManager;
    window.g_charaData = g_charaData;
    window.CUSTOM_CONF_STATUS_LIMIT = CUSTOM_CONF_STATUS_LIMIT;
    window.g_confDataCustomStatus = g_confDataCustomStatus;
    window.CUSTOM_CONF_ATK_LIMIT = CUSTOM_CONF_ATK_LIMIT;
    window.g_confDataCustomAtk = g_confDataCustomAtk;
    window.CUSTOM_CONF_DEF_LIMIT = CUSTOM_CONF_DEF_LIMIT;
    window.g_confDataCustomDef = g_confDataCustomDef;
    window.CUSTOM_CONF_SKILL_LIMIT = CUSTOM_CONF_SKILL_LIMIT;
    window.g_confDataCustomSkill = g_confDataCustomSkill;
    window.CUSTOM_CONF_SPEC_LIMIT = CUSTOM_CONF_SPEC_LIMIT;
    window.g_confDataCustomSpecStatus = g_confDataCustomSpecStatus;
    window.g_confDataCustomStatusMIG = g_confDataCustomStatusMIG;
    window.g_confDataSpecMIG = g_confDataSpecMIG;
    window.g_confDataCustomSkillMIG = g_confDataCustomSkillMIG;
    window.g_confDataCustomSpecStatusMIG = g_confDataCustomSpecStatusMIG;
    window.ResetConfDataAllMIG = ResetConfDataAllMIG;
    window.__DIG3 = __DIG3;
}
