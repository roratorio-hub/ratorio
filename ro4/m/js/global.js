"use strict";

/** 一次職支援　設定値配列 */
let g_confDataIchizi = null;

/** 二次職支援　設定値配列 */
let g_confDataNizi = null;

/** 三次職支援　設定値配列 */
let g_confDataSanzi = null;

/** 四次職支援　設定値配列 */
let g_confDataYozi = null;

/** デバフ 設定値配列 */
let g_confDataDebuff = null;

/** 一次職支援　設定欄オブジェクト */
let g_objCharaConfIchizi = null;

/** 二次職支援　設定欄オブジェクト */
let g_objCharaConfNizi = null;

/** 三次職支援　設定欄オブジェクト */
let g_objCharaConfSanzi = null;

/** 四次職支援　設定欄オブジェクト */
let g_objCharaConfYozi = null;

/** デバフ　設定欄オブジェクト */
let g_objCharaConfDebuff = null;

/** 時限効果設定　設定数 */
const TIME_ITEM_CONF_COUNT = 20;

/** 時限効果設定　設定値配列 */
let g_timeItemConf = MallocArray(TIME_ITEM_CONF_COUNT, 0);

/** 時限効果設定　有効フラグ配列 */
let g_timeItemConfEffective = MallocArray(TIME_ITEM_CONF_COUNT, true);

/** 時限効果設定　一斉変更ボタンの状態 */
let g_timeItemConfAllEffective = 1;

/** スキルマネージャ */
let g_skillManager = new CSkillManager();

/** 二刀流フラグ */
let n_Nitou = false;

/** 二刀流フラグ */
let n_NitouCalc = false;

/** ステータス・装備・スキルなどで短縮された変動詠唱時間の残余率 */
let g_VariableCastTimeRate = 0;

/** SP消費軽減率 */
let costDownForDisp = 0;

// TODO: 移行不完全（先行移植）
/** 定義済みデータマネージャ */
let g_constDataManager = new CMigConstDataManager();

// TODO: 
/** キャラクターデータ保持形式移行実験 */
let g_charaData = {
	cardCategoryMap: new Map()
};

// 計算機メインコントローラ（ro4以降）
let g_confDataCustomStatusMIG = null;
let g_confDataSpecMIG = null;
let g_confDataCustomSkillMIG = null;
let g_confDataCustomSpecStatusMIG = null;

function ResetConfDataAllMIG (bAsOnLoad) {

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
function __DIG3(value) {

	if (HtmlGetObjectCheckedById("OBJID_CHECK_DIGIT3", false)) {
		return DivideDigits3(value);
	}

	return ("" + value);
}
