"use strict";

/** 一次職支援　設定値配列 */
window.g_confDataIchizi = null;

/** 二次職支援　設定値配列 */
window.g_confDataNizi = null;

/** 三次職支援　設定値配列 */
window.g_confDataSanzi = null;

/** 四次職支援　設定値配列 */
window.g_confDataYozi = null;

/** デバフ 設定値配列 */
window.g_confDataDebuff = null;

/** 一次職支援　設定欄オブジェクト */
window.g_objCharaConfIchizi = null;

/** 二次職支援　設定欄オブジェクト */
window.g_objCharaConfNizi = null;

/** 三次職支援　設定欄オブジェクト */
window.g_objCharaConfSanzi = null;

/** 四次職支援　設定欄オブジェクト */
window.g_objCharaConfYozi = null;

/** デバフ　設定欄オブジェクト */
window.g_objCharaConfDebuff = null;

/** 時限効果設定　設定数 */
window.TIME_ITEM_CONF_COUNT = 20;

/** 時限効果設定　設定値配列 */
window.g_timeItemConf = MallocArray(window.TIME_ITEM_CONF_COUNT, 0);

/** 時限効果設定　有効フラグ配列 */
window.g_timeItemConfEffective = MallocArray(window.TIME_ITEM_CONF_COUNT, true);

/** 時限効果設定　一斉変更ボタンの状態 */
window.g_timeItemConfAllEffective = 1;

/** スキルマネージャ */
window.g_skillManager = new CSkillManager();

/** 二刀流フラグ */
window.n_Nitou = false;

/** 二刀流フラグ */
window.n_NitouCalc = false;

/** ステータス・装備・スキルなどで短縮された変動詠唱時間の残余率 */
window.g_VariableCastTimeRate = 0;

/** SP消費軽減率 */
window.costDownForDisp = 0;

// TODO: 移行不完全（先行移植）
/** 定義済みデータマネージャ */
window.g_constDataManager = new CMigConstDataManager();

// TODO:
/** キャラクターデータ保持形式移行実験 */
window.g_charaData = {
	cardCategoryMap: new Map()
};

// 性能カスタマイズ ステータス関連
window.CUSTOM_CONF_STATUS_LIMIT = 30;
window.g_confDataCustomStatus = Array(window.CUSTOM_CONF_STATUS_LIMIT).fill(0);
// 性能カスタマイズ 攻撃関連
window.CUSTOM_CONF_ATK_LIMIT = 30;
window.g_confDataCustomAtk = Array(window.CUSTOM_CONF_ATK_LIMIT).fill(0);
// 性能カスタマイズ 防御関連
window.CUSTOM_CONF_DEF_LIMIT = 20;
window.g_confDataCustomDef = Array(window.CUSTOM_CONF_DEF_LIMIT).fill(0);
// 性能カスタマイズ スキル関連
window.CUSTOM_CONF_SKILL_LIMIT = 20;
window.g_confDataCustomSkill = Array(window.CUSTOM_CONF_SKILL_LIMIT).fill(0);
// 性能カスタマイズ 特性ステータス関連
window.CUSTOM_CONF_SPEC_LIMIT = 20;
window.g_confDataCustomSpecStatus = Array(window.CUSTOM_CONF_SPEC_LIMIT).fill(0);

// 計算機メインコントローラ（ro4以降）
window.g_confDataCustomStatusMIG = null;
window.g_confDataSpecMIG = null;
window.g_confDataCustomSkillMIG = null;
window.g_confDataCustomSpecStatusMIG = null;

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
    window.ResetConfDataAllMIG = ResetConfDataAllMIG;
    window.__DIG3 = __DIG3;
}
