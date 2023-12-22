




// 一次職支援　設定値配列
g_confDataIchizi = null;

// 二次職支援　設定値配列
g_confDataNizi = null;

// 三次職支援　設定値配列
g_confDataSanzi = null;

// 四次職支援　設定値配列
g_confDataYozi = null;



// 一次職支援　設定欄オブジェクト
g_objCharaConfIchizi = null;

// 二次職支援　設定欄オブジェクト
g_objCharaConfNizi = null;

// 三次職支援　設定欄オブジェクト
g_objCharaConfSanzi = null;

// 四次職支援　設定欄オブジェクト
g_objCharaConfYozi = null;



// 時限効果設定　設定数
TIME_ITEM_CONF_COUNT = 20;

// 時限効果設定　設定値配列
g_timeItemConf = MallocArray(TIME_ITEM_CONF_COUNT, 0);

// 時限効果設定　有効フラグ配列
g_timeItemConfEffective = MallocArray(TIME_ITEM_CONF_COUNT, true);




// スキルマネージャ
g_skillManager = new CSkillManager();





// TODO: 移行不完全（先行移植）
// 定義済みデータマネージャ
g_constDataManager = new CMigConstDataManager();

// TODO: キャラクターデータ保持形式移行実験
g_charaData = {
	cardCategoryMap: new Map()
};



// 計算機メインコントローラ（ro4以降）
g_confDataCustomStatusMIG = null;
g_confDataSpecMIG = null;
g_confDataCustomSkillMIG = null;

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