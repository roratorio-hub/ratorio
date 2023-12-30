
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * エンチャントタイプデータ作成クラス.
 */
function CEnchTypeDataMaker () {

}

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CEnchTypeDataMaker.RegisterId = function (name, value) {
	if (name != "ENCH_TYPE_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumEnchTypeId", [name], value, undefined);
	}
	return value;
};



/**
 * データ定義を上書き定義する.
 */
CEnchTypeDataMaker.OverrideData = function () {

	var enchTypeId = 0;
	var enchTypeData = null;

	// データ配列オブジェクトを上書き定義していく
	n_EnchantType = new Array();



	// 未使用
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_NONE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未使用
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_1", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（2）野生の尻尾
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_2", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_2,
		ENCH_LIST_ID_3,
		ENCH_LIST_ID_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（3）猛獣の鈴
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_3,
		ENCH_LIST_ID_3,
		ENCH_LIST_ID_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（4）クリス
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_6,
		ENCH_LIST_ID_5,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（5）ヒドゥンスロットエンチャントEX
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_5", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_7,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（6）モーラエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_6", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_8,
		ENCH_LIST_ID_9,
		ENCH_LIST_ID_10,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（7）たれ教皇
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_7", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_11,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（8）ウルズグリーブ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_8", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_14,
		ENCH_LIST_ID_13,
		ENCH_LIST_ID_12,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（9）ウルズマント系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_9", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_17,
		ENCH_LIST_ID_16,
		ENCH_LIST_ID_15,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（10）ウルズプレート
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_10", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_20,
		ENCH_LIST_ID_19,
		ENCH_LIST_ID_18,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（11）ウルズブローチ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_11", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_23,
		ENCH_LIST_ID_22,
		ENCH_LIST_ID_21,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（12）ペオースグリーブ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_12", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_26,
		ENCH_LIST_ID_25,
		ENCH_LIST_ID_24,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（13）ペオースプレート
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_13", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_29,
		ENCH_LIST_ID_28,
		ENCH_LIST_ID_27,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（14）ゴールデンロッドローブ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_14", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_32,
		ENCH_LIST_ID_31,
		ENCH_LIST_ID_30,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（15）ゴールデンロッドスタッフⅡ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_15", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_35,
		ENCH_LIST_ID_34,
		ENCH_LIST_ID_33,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（16）黒羽のスーツ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_16", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_38,
		ENCH_LIST_ID_37,
		ENCH_LIST_ID_36,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（17）黒羽のブーツ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_17", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_41,
		ENCH_LIST_ID_40,
		ENCH_LIST_ID_39,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（18）サバフのクロース系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_18", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_44,
		ENCH_LIST_ID_43,
		ENCH_LIST_ID_42,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（19）サバフのシューズ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_19", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_47,
		ENCH_LIST_ID_46,
		ENCH_LIST_ID_45,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（20）慈愛の杖Ⅱ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_20", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_50,
		ENCH_LIST_ID_49,
		ENCH_LIST_ID_48,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（21）審判のメイスⅡ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_21", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_53,
		ENCH_LIST_ID_52,
		ENCH_LIST_ID_51,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（22）治癒の光
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_22", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_56,
		ENCH_LIST_ID_55,
		ENCH_LIST_ID_54,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（23）大司教の指輪
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_23", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_57,
		ENCH_LIST_ID_55,
		ENCH_LIST_ID_54,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（24）大聖堂の証
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_24", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_58,
		ENCH_LIST_ID_55,
		ENCH_LIST_ID_54,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（25）ナブのクロース
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_25", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_61,
		ENCH_LIST_ID_60,
		ENCH_LIST_ID_59,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（26）ナブのシューズ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_26", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_64,
		ENCH_LIST_ID_63,
		ENCH_LIST_ID_62,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（27）ゴールデンロッドスタッフ系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_27", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_31,
		ENCH_LIST_ID_30,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（28）慈愛の杖
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_28", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_49,
		ENCH_LIST_ID_48,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（29）審判のメイス
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_29", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_52,
		ENCH_LIST_ID_51,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（30）生体工学研究所エンチャント武器
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_30", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_65,
		ENCH_LIST_ID_65,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（31）生体工学研究所エンチャント防具
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_31", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_66,
		ENCH_LIST_ID_66,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（32）RWC2012記念リング
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_32", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_67,
		ENCH_LIST_ID_68,
		ENCH_LIST_ID_68,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（33）RWC2012記念ペンダント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_33", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_69,
		ENCH_LIST_ID_70,
		ENCH_LIST_ID_70,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 時空エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_34", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_71,
		ENCH_LIST_ID_72,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（35）エスランの首飾り
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_35", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_73,
		ENCH_LIST_ID_74,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（36）影狼・朧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_36", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_75,
		ENCH_LIST_ID_75,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（37）巨神蛇の皮
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_37", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_76,
		ENCH_LIST_ID_77,
		ENCH_LIST_ID_77,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（38）古い洋傘
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_38", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_78,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（39）シャドウウォーカー
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_39", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_80,
		ENCH_LIST_ID_79,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（40）瑞々しいバラ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_40", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_81,
		ENCH_LIST_ID_79,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（41）セリーヌのリボン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_41", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_82,
		ENCH_LIST_ID_79,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（42）赤いランタン系
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_42", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_85,
		ENCH_LIST_ID_84,
		ENCH_LIST_ID_83,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（43）RJC2014缶バッジ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_43", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_86,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（44）水ドロップ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_44", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_87,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（45）木ドロップ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_45", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_88,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（46）火ドロップ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_46", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_89,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（47）光ドロップ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_47", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_90,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（48）闇ドロップ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_48", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_91,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（49）回復ドロップ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_49", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_92,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（50）勇者の指輪
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_50", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_93,
		ENCH_LIST_ID_94,
		ENCH_LIST_ID_95,
		ENCH_LIST_ID_96,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーズヘッグ＆ロキ帽
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_51", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_97,
		ENCH_LIST_ID_97,
		ENCH_LIST_ID_97,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 大天使の翼
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_52", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_98,
		ENCH_LIST_ID_147,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　マジカルフェザー】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_53", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_100,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　シャドウスタッフ】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_54", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_101,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　アイオーンスタッフ】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_55", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_103,
		ENCH_LIST_ID_102,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 熾天使の翼
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_56", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_147,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ハイレベル
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_57", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_104,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// エクセリオンスーツ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_58", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_105,
		ENCH_LIST_ID_105,
		ENCH_LIST_ID_105,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// エクセリオンウィング
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_59", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_106,
		ENCH_LIST_ID_106,
		ENCH_LIST_ID_106,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（60）ルーンヘルム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_60", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_107,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 未確認エンチャントタイプ（61）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_61", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_108,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 幻影の刻印
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_62", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_109,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　サファイアリスト】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_63", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_110,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　執行者のマント】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_64", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_111,
		ENCH_LIST_ID_112,
		ENCH_LIST_ID_113,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// エクセリオンレッグ
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_65", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_114,
		ENCH_LIST_ID_114,
		ENCH_LIST_ID_114,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　ポロロッカシューズ】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_66", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_115,
		ENCH_LIST_ID_116,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// RJCネックレス
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_67", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_117,
		ENCH_LIST_ID_118,
		ENCH_LIST_ID_119,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　与一の肩掛け】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_68", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_120,
		ENCH_LIST_ID_121,
		ENCH_LIST_ID_122,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 堕天使の翼
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_69", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_148,
		ENCH_LIST_ID_99,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 古びたエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_70", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_FURUBITA_1,
		ENCH_LIST_ID_267,
		ENCH_LIST_ID_183,
		ENCH_LIST_ID_123,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ピアスエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_71", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_124,
		ENCH_LIST_ID_125,
		ENCH_LIST_ID_126,
		ENCH_LIST_ID_127,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// パワードメイルエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_72", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_130,
		ENCH_LIST_ID_129,
		ENCH_LIST_ID_128,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ガーディアンユニットエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_73", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_133,
		ENCH_LIST_ID_132,
		ENCH_LIST_ID_131,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// パワードガーディアン靴エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_74", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_136,
		ENCH_LIST_ID_135,
		ENCH_LIST_ID_134,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// パワードガーディアン肩エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_75", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_139,
		ENCH_LIST_ID_138,
		ENCH_LIST_ID_137,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// パワードガーディアンアクセエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_76", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_142,
		ENCH_LIST_ID_141,
		ENCH_LIST_ID_140,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 大型ＡＨ兜エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_77", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_145,
		ENCH_LIST_ID_144,
		ENCH_LIST_ID_143,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 大型マジェ兜エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_78", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_146,
		ENCH_LIST_ID_144,
		ENCH_LIST_ID_143,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// アミストルリュックエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_79", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_147,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 疾風迅雷エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_80", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_149,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 天地無双エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_81", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_150,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マランエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_82", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_151,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マランエンチャント２か所
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_83", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_151,
		ENCH_LIST_ID_151,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// たれリベリオンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_84", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_152,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 【旧　裁きの靴】（未使用）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_85", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_153,
		ENCH_LIST_ID_154,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 超時空エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_86", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_71,
		ENCH_LIST_ID_155,
		ENCH_LIST_ID_155,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// プロンテラ軍エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_87", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_157,
		ENCH_LIST_ID_156,
		ENCH_LIST_ID_156,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マヌクエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_88", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_160,
		ENCH_LIST_ID_159,
		ENCH_LIST_ID_158,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 水天一碧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_89", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_161,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーヴエンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_90", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_162,
		ENCH_LIST_ID_162,
		ENCH_LIST_ID_162,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーヴエンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_91", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_163,
		ENCH_LIST_ID_163,
		ENCH_LIST_ID_163,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 熱狂信徒エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_92", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_166,
		ENCH_LIST_ID_165,
		ENCH_LIST_ID_164,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// お座り教皇エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_93", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_167,
		ENCH_LIST_ID_167,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 勇者の靴エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_94", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_168,
		ENCH_LIST_ID_168,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// カーリッツバーグ騎士団の鎧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_95", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_170,
		ENCH_LIST_ID_169,
		ENCH_LIST_ID_169,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 小型偵察機エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_96", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_172,
		ENCH_LIST_ID_171,
		ENCH_LIST_ID_171,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 浮遊する氷エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_97", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_175,
		ENCH_LIST_ID_174,
		ENCH_LIST_ID_173,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// エクスエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_98", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_178,
		ENCH_LIST_ID_177,
		ENCH_LIST_ID_176,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// たれチュウニペンギン限界エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_99", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_182,
		ENCH_LIST_ID_181,
		ENCH_LIST_ID_180,
		ENCH_LIST_ID_179,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 百火猟乱エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_100", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_184,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ガーデンオブエデンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_101", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_186,
		ENCH_LIST_ID_185,
		ENCH_LIST_ID_185,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ジェミニ-S58の目（赤）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_102", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_188,
		ENCH_LIST_ID_187,
		ENCH_LIST_ID_187,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オープンエアヘッドフォンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_103", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_191,
		ENCH_LIST_ID_190,
		ENCH_LIST_ID_189,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// メディックケープエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_104", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_192,
		ENCH_LIST_ID_192,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ドレイクコートエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_105", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_193,
		ENCH_LIST_ID_193,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_106", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_194,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（兜上段）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_107", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_HEAD_TOP_2,
		ENCH_LIST_ID_196,
		ENCH_LIST_ID_195,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（兜中段）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_108", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_HEAD_MID_2,
		ENCH_LIST_ID_SHINENENO_KAIRO_HEAD_MID_3,
		ENCH_LIST_ID_197,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（兜下段）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_109", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_HEAD_UNDER_2,
		ENCH_LIST_ID_SHINENENO_KAIRO_HEAD_UNDER_3,
		ENCH_LIST_ID_198,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_110", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIELD_2,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_199,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_111", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_BODY_2,
		ENCH_LIST_ID_201,
		ENCH_LIST_ID_200,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_112", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHOULDER_2,
		ENCH_LIST_ID_203,
		ENCH_LIST_ID_202,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_113", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHOES_2,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHOES_3,
		ENCH_LIST_ID_204,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_114", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_ACCESSARY_2,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_205,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（武器上級）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_115", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_ARMS_HYPER_2,
		ENCH_LIST_ID_300,
		ENCH_LIST_ID_206,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（兜上段上級）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_116", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_HEAD_TOP_HYPER_2,
		ENCH_LIST_ID_196,
		ENCH_LIST_ID_207,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（肩上級）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_117", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHOULDER_HYPER_2,
		ENCH_LIST_ID_203,
		ENCH_LIST_ID_208,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーヴエンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_118", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_209,
		ENCH_LIST_ID_209,
		ENCH_LIST_ID_209,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーヴエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_119", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_210,
		ENCH_LIST_ID_210,
		ENCH_LIST_ID_210,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 騎士団エンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_120", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_211,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 騎士団エンチャント（兜）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_121", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_196,
		ENCH_LIST_ID_212,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 騎士団エンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_122", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_201,
		ENCH_LIST_ID_213,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 騎士団エンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_123", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_214,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 騎士団エンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_124", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_216,
		ENCH_LIST_ID_215,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// エクセリオンシールド
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_125", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_217,
		ENCH_LIST_ID_217,
		ENCH_LIST_ID_217,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（アクセ上級）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_126", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_ACCESSARY_HYPER_2,
		ENCH_LIST_ID_219,
		ENCH_LIST_ID_218,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（盾上級）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_127", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIELD_HYPER_2,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_220,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ロックリッジエンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_128", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_221,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ロックリッジエンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_129", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_223,
		ENCH_LIST_ID_222,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ロックリッジエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_130", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_225,
		ENCH_LIST_ID_224,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ロックリッジエンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_131", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_227,
		ENCH_LIST_ID_226,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// グレータードラクルホーンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_132", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_229,
		ENCH_LIST_ID_228,
		ENCH_LIST_ID_228,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーヴバレッタエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_133", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_232,
		ENCH_LIST_ID_231,
		ENCH_LIST_ID_230,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ロイヤルマントエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_134", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_235,
		ENCH_LIST_ID_234,
		ENCH_LIST_ID_233,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// フェアリークロースエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_135", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_236,
		ENCH_LIST_ID_236,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スカラバハイヒールエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_136", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_237,
		ENCH_LIST_ID_237,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// Y.S.F.0.1エンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_137", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_240,
		ENCH_LIST_ID_239,
		ENCH_LIST_ID_238,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// Y.S.F.0.1エンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_138", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_242,
		ENCH_LIST_ID_239,
		ENCH_LIST_ID_241,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// Y.S.F.0.1エンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_139", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_240,
		ENCH_LIST_ID_243,
		ENCH_LIST_ID_238,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 茨のヘアバンドエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_140", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_245,
		ENCH_LIST_ID_244,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ヴァルキリーシールドエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_141", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_247,
		ENCH_LIST_ID_246,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ダークハンドエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_142", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_249,
		ENCH_LIST_ID_248,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マジカルフェザーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_143", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_245,
		ENCH_LIST_ID_244,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ライオットチップエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_144", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_249,
		ENCH_LIST_ID_250,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// クイーン・アンズ・リベンジエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_145", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_252,
		ENCH_LIST_ID_251,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スキンオブシャドウエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_146", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_254,
		ENCH_LIST_ID_253,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スナイピングスーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_147", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_256,
		ENCH_LIST_ID_255,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// リス耳フード帽エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_148", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_252,
		ENCH_LIST_ID_251,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レッドベビードラゴンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_149", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_258,
		ENCH_LIST_ID_257,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ブレイブエンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_150", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_261,
		ENCH_LIST_ID_260,
		ENCH_LIST_ID_259,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ブレイブエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_151", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_264,
		ENCH_LIST_ID_263,
		ENCH_LIST_ID_262,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ブレイブエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_152", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_266,
		ENCH_LIST_ID_265,
		ENCH_LIST_ID_262,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 豪遊無双の紋帽子エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_153", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_269,
		ENCH_LIST_ID_268,
		ENCH_LIST_ID_268,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ブースターシューズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_154", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_270,
		ENCH_LIST_ID_270,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 浮遊する太極玉エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_155", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_272,
		ENCH_LIST_ID_271,
		ENCH_LIST_ID_271,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// プロテクトクロースエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_156", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_275,
		ENCH_LIST_ID_274,
		ENCH_LIST_ID_273,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 連合軍司令官のマントエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_157", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_277,
		ENCH_LIST_ID_276,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 月食の装束エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GESSHOKUNO_SOUSHOKU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GESSHOKUNO_SOUSHOKU_2,
		ENCH_LIST_ID_279,
		ENCH_LIST_ID_278,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_159", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ARMS_2,
		ENCH_LIST_ID_281,
		ENCH_LIST_ID_280,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（兜）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_160", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_HEAD_2,
		ENCH_LIST_ID_283,
		ENCH_LIST_ID_282,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_161", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHIELD_2,
		ENCH_LIST_ID_285,
		ENCH_LIST_ID_284,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_162", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOULDER_2,
		ENCH_LIST_ID_287,
		ENCH_LIST_ID_286,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_163", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOES_2,
		ENCH_LIST_ID_288,
		ENCH_LIST_ID_286,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_164", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_2,
		ENCH_LIST_ID_290,
		ENCH_LIST_ID_289,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// モーレツエンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_165", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_291,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// モーレツエンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_166", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_201,
		ENCH_LIST_ID_292,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// モーレツエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_167", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_293,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ニーヴエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_168", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_294,
		ENCH_LIST_ID_294,
		ENCH_LIST_ID_294,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ティアマトチャント（兜下段）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_169", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_297,
		ENCH_LIST_ID_296,
		ENCH_LIST_ID_295,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（鎧上級）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_170", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_BODY_HYPER_2,
		ENCH_LIST_ID_299,
		ENCH_LIST_ID_298,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 思念体エンチャント（指輪）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_171", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_303,
		ENCH_LIST_ID_302,
		ENCH_LIST_ID_301,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 群星エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_172", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_306,
		ENCH_LIST_ID_305,
		ENCH_LIST_ID_304,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// １６ｔｈアニバーサリーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_173", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_309,
		ENCH_LIST_ID_308,
		ENCH_LIST_ID_307,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// リペアメモリーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_174", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_312,
		ENCH_LIST_ID_311,
		ENCH_LIST_ID_310,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 白の騎士団の鎧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_175", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_314,
		ENCH_LIST_ID_313,
		ENCH_LIST_ID_313,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 炎雷魔女の首飾りエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_176", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_317,
		ENCH_LIST_ID_316,
		ENCH_LIST_ID_315,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ヴェスパーヘッドギアエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_177", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_318,
		ENCH_LIST_ID_318,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// リトルガーデンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_178", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_320,
		ENCH_LIST_ID_319,
		ENCH_LIST_ID_319,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 武侠靴エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_179", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_321,
		ENCH_LIST_ID_321,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ギガントブーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_180", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_323,
		ENCH_LIST_ID_322,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 負傷兵の包帯エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_181", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_325,
		ENCH_LIST_ID_324,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// プロテクトフェザーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_182", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_327,
		ENCH_LIST_ID_326,
		ENCH_LIST_ID_326,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スナイピングベールエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_183", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_329,
		ENCH_LIST_ID_328,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 狐耳鈴リボンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_184", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_331,
		ENCH_LIST_ID_330,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 堕天司祭の闇光外套エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_185", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_333,
		ENCH_LIST_ID_332,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 鴉天狗の面エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_186", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_334,
		ENCH_LIST_ID_326,
		ENCH_LIST_ID_326,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（武器Ｖ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_187", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ARMS_2,
		ENCH_LIST_ID_335,
		ENCH_LIST_ID_280,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（兜Ｖ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_188", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_HEAD_2,
		ENCH_LIST_ID_336,
		ENCH_LIST_ID_282,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（靴Ｖ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_189", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOES_2,
		ENCH_LIST_ID_337,
		ENCH_LIST_ID_286,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_190", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_BODY_2,
		ENCH_LIST_ID_339,
		ENCH_LIST_ID_338,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（肩Ｖ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_191", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOULDER_2,
		ENCH_LIST_ID_287,
		ENCH_LIST_ID_340,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（靴Ｖ３）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_192", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOES_2,
		ENCH_LIST_ID_337,
		ENCH_LIST_ID_340,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 闇御津羽神靴エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KURAMITSUHANOKAMI_KUTSU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KURAMITSUHANOKAMI_KUTSU_2,
		ENCH_LIST_ID_342,
		ENCH_LIST_ID_341,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 淤加美神の羽衣エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_194", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_344,
		ENCH_LIST_ID_343,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 古びた履物エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_195", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_342,
		ENCH_LIST_ID_345,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 降霊術士の手鏡エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_196", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KOREIZYUTSUSHINO_TEKAGAMI_2,
		ENCH_LIST_ID_KOREIZYUTSUSHINO_TEKAGAMI_3,
		ENCH_LIST_ID_KOREIZYUTSUSHINO_TEKAGAMI_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 思念体武器エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_197", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENTAI_ARMS_2,
		ENCH_LIST_ID_SHINENTAI_ARMS_3,
		ENCH_LIST_ID_SHINENTAI_ARMS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファントムオブマスカレードエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_198", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_351,
		ENCH_LIST_ID_350,
		ENCH_LIST_ID_350,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 八卦の封呪エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_199", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_354,
		ENCH_LIST_ID_353,
		ENCH_LIST_ID_352,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シトラスリボンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_200", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_356,
		ENCH_LIST_ID_355,
		ENCH_LIST_ID_355,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スピリチュアルクロースエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_201", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_357,
		ENCH_LIST_ID_357,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// フロンティアブーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_202", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_358,
		ENCH_LIST_ID_358,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（アクセルウィング）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_203", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_359,
		ENCH_LIST_ID_359,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（水龍神の鱗）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_204", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SUIRYUSHINNO_UROKO_2,
		ENCH_LIST_ID_361,
		ENCH_LIST_ID_360,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 断章エンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_205", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DANSHO_ARMS_2,
		ENCH_LIST_ID_DANSHO_ARMS_3,
		ENCH_LIST_ID_DANSHO_ARMS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 断章エンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_206", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DANSHO_ACCESSORY_2,
		ENCH_LIST_ID_363,
		ENCH_LIST_ID_215,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ディアボロスブーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_207", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_364,
		ENCH_LIST_ID_364,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ホロウシューズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_208", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_366,
		ENCH_LIST_ID_365,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 轟鳴鼓エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_209", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_368,
		ENCH_LIST_ID_367,
		ENCH_LIST_ID_367,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イルシオンエンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_210", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_369,
		ENCH_LIST_ID_369,
		ENCH_LIST_ID_369,
		ENCH_LIST_ID_369,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イルシオンエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_211", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_370,
		ENCH_LIST_ID_370,
		ENCH_LIST_ID_370,
		ENCH_LIST_ID_370,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イルシオンエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_212", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_371,
		ENCH_LIST_ID_371,
		ENCH_LIST_ID_371,
		ENCH_LIST_ID_371,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イルシオンエンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_213", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_372,
		ENCH_LIST_ID_372,
		ENCH_LIST_ID_372,
		ENCH_LIST_ID_372,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（兜Ｖ３）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_214", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_HEAD_2,
		ENCH_LIST_ID_373,
		ENCH_LIST_ID_282,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（肩Ｖ３）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_215", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOULDER_2,
		ENCH_LIST_ID_374,
		ENCH_LIST_ID_286,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（アクセＶ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_216", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_2,
		ENCH_LIST_ID_376,
		ENCH_LIST_ID_375,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ガーディアンオブソウルエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GUARDIAN_OF_SOUL", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GUARDIAN_OF_SOUL_2,
		ENCH_LIST_ID_GUARDIAN_OF_SOUL_3,
		ENCH_LIST_ID_GUARDIAN_OF_SOUL_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// フェザーシールドエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_218", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_380,
		ENCH_LIST_ID_379,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ランナウェー・アクセラレータエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_219", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_382,
		ENCH_LIST_ID_381,
		ENCH_LIST_ID_381,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ソロモンのペンダントエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_220", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_385,
		ENCH_LIST_ID_384,
		ENCH_LIST_ID_383,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// パナギアの贈り物エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_221", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_386,
		ENCH_LIST_ID_386,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファランクスエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_222", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_388,
		ENCH_LIST_ID_387,
		ENCH_LIST_ID_387,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スクロールストールエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_223", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_389,
		ENCH_LIST_ID_389,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ドレスエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_224", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_392,
		ENCH_LIST_ID_391,
		ENCH_LIST_ID_390,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 楯無の鎧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_TATENASHINO_YOROI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_TATENASHINO_YOROI_2,
		ENCH_LIST_ID_394,
		ENCH_LIST_ID_393,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ギャンブラーシールエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_226", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_395,
		ENCH_LIST_ID_326,
		ENCH_LIST_ID_326,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// セブン-イレブンヘッドホンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_227", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_397,
		ENCH_LIST_ID_396,
		ENCH_LIST_ID_396,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イルシオンエンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_228", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_398,
		ENCH_LIST_ID_398,
		ENCH_LIST_ID_398,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（武器　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_229", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_ARMS_2,
		ENCH_LIST_ID_300,
		ENCH_LIST_ID_399,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（兜上段　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_230", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_HEAD_TOP_2,
		ENCH_LIST_ID_196,
		ENCH_LIST_ID_400,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（鎧　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_231", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_BODY_2,
		ENCH_LIST_ID_299,
		ENCH_LIST_ID_401,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（肩　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_232", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_SHOULDER_2,
		ENCH_LIST_ID_203,
		ENCH_LIST_ID_402,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（靴　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_233", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_SHOES_2,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHOES_3,
		ENCH_LIST_ID_403,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（アクセ　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_234", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_ACCESSARY_2,
		ENCH_LIST_ID_219,
		ENCH_LIST_ID_404,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オウルヴァイカウントのシルクハットエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_235", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_405,
		ENCH_LIST_ID_405,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// アンドフリームニルのマントエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_236", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_407,
		ENCH_LIST_ID_406,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 悪魔の手エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_237", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_409,
		ENCH_LIST_ID_408,
		ENCH_LIST_ID_408,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ジェジェキャップエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_238", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_410,
		ENCH_LIST_ID_408,
		ENCH_LIST_ID_408,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ジャスパーサークレットエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_239", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_412,
		ENCH_LIST_ID_411,
		ENCH_LIST_ID_411,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 聖者の冠エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_240", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_414,
		ENCH_LIST_ID_413,
		ENCH_LIST_ID_413,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 精霊王の宝冠エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_241", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_416,
		ENCH_LIST_ID_415,
		ENCH_LIST_ID_415,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 不死鳥の冠エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_242", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_418,
		ENCH_LIST_ID_417,
		ENCH_LIST_ID_417,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ブラックフェザーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_243", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_420,
		ENCH_LIST_ID_419,
		ENCH_LIST_ID_419,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ワークキャップエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_244", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_421,
		ENCH_LIST_ID_417,
		ENCH_LIST_ID_417,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（栄光の御旗(赤)）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_245", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_422,
		ENCH_LIST_ID_422,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（鷹の眼の首飾り）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_246", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_426,
		ENCH_LIST_ID_425,
		ENCH_LIST_ID_424,
		ENCH_LIST_ID_423,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 白の騎士団エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHIRONO_KISHIDAN_ORIGINAL", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHIRONO_KISHIDAN_ORIGINAL_2,
		ENCH_LIST_ID_SHIRONO_KISHIDAN_ORIGINAL_3,
		ENCH_LIST_ID_SHIRONO_KISHIDAN_ORIGINAL_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シュミッツエンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SCHMIDT_ACCESSARY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SCHMIDT_ACCESSARY_3,
		ENCH_LIST_ID_SCHMIDT_ACCESSARY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シュミッツエンチャント（体）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SCHMIDT_BODY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SCHMIDT_BODY_3,
		ENCH_LIST_ID_SCHMIDT_BODY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シュミッツエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SCHMIDT_SHOULDER", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SCHMIDT_SHOULDER_3,
		ENCH_LIST_ID_SCHMIDT_SHOULDER_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 覚醒淤加美神の羽衣エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_3,
		ENCH_LIST_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_2,
		ENCH_LIST_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_1,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（盾　試練場）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_SHIRENZYO_SHIELD", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_SHIELD_2,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENENO_KAIRO_SHIRENZYO_SHIELD_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ゲートオブネザーワールドエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GATE_OF_NEZAR_WORLD", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GATE_OF_NEZAR_WORLD_2,
		ENCH_LIST_ID_GATE_OF_NEZAR_WORLD_3,
		ENCH_LIST_ID_GATE_OF_NEZAR_WORLD_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 隷属の首輪エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_REIZOKUNO_KUBIWA", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_REIZOKUNO_KUBIWA_2,
		ENCH_LIST_ID_REIZOKUNO_KUBIWA_3,
		ENCH_LIST_ID_REIZOKUNO_KUBIWA_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 剛勇無双の甲胄エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GOYUMUSONO_KACCHU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GOYUMUSONO_KACCHU_2,
		ENCH_LIST_ID_GOYUMUSONO_KACCHU_3,
		ENCH_LIST_ID_GOYUMUSONO_KACCHU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ピープトゥサンダルエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PEEP_TOE_SANDAL", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PEEP_TOE_SANDAL_3_4,
		ENCH_LIST_ID_PEEP_TOE_SANDAL_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ポルックスリングエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_POLLUX_RING", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_TAEGWON_2,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_3,
		ENCH_LIST_ID_POLLUX_RING_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// プロキオンリングエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PROCYON_RING", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_TAEGWON_2,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_3,
		ENCH_LIST_ID_PROCYON_RING_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 断章エンチャント（兜）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_DANSHO_HEAD_TOP", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DANSHO_HEAD_TOP_2,
		ENCH_LIST_ID_DANSHO_HEAD_TOP_3,
		ENCH_LIST_ID_DANSHO_HEAD_TOP_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 断章エンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_DANSHO_SHIELD", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DANSHO_SHIELD_2,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DANSHO_SHIELD_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 断章エンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_DANSHO_BODY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DANSHO_BODY_2,
		ENCH_LIST_ID_DANSHO_BODY_3,
		ENCH_LIST_ID_DANSHO_BODY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 覚醒特殊環境活動用ブーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_2,
		ENCH_LIST_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_3,
		ENCH_LIST_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 迅雷の指輪エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ZINRAINO_YUBIWA", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ZINRAINO_YUBIWA_2,
		ENCH_LIST_ID_ZINRAINO_YUBIWA_3,
		ENCH_LIST_ID_ZINRAINO_YUBIWA_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ママラガンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_MAMARAGAN", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_MAMARAGAN_3,
		ENCH_LIST_ID_MAMARAGAN_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オートマティックエンチャント（鎧）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AUTOMATIC_BODY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_AUTOMATIC_BODY,
		ENCH_LIST_ID_AUTOMATIC_BODY,
		ENCH_LIST_ID_AUTOMATIC_BODY,
		ENCH_LIST_ID_AUTOMATIC_BODY,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オートマティックエンチャント（肩）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AUTOMATIC_SHOULDER", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_AUTOMATIC_SHOULDER,
		ENCH_LIST_ID_AUTOMATIC_SHOULDER,
		ENCH_LIST_ID_AUTOMATIC_SHOULDER,
		ENCH_LIST_ID_AUTOMATIC_SHOULDER,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オートマティックエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AUTOMATIC_SHOES", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_AUTOMATIC_SHOES,
		ENCH_LIST_ID_AUTOMATIC_SHOES,
		ENCH_LIST_ID_AUTOMATIC_SHOES,
		ENCH_LIST_ID_AUTOMATIC_SHOES,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オートマティックエンチャント（アクセ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AUTOMATIC_ACCESSARY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_AUTOMATIC_ACCESSARY,
		ENCH_LIST_ID_AUTOMATIC_ACCESSARY,
		ENCH_LIST_ID_AUTOMATIC_ACCESSARY,
		ENCH_LIST_ID_AUTOMATIC_ACCESSARY,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ハルワタートエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_HAURVATAT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_HAURVATAT_3,
		ENCH_LIST_ID_HAURVATAT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 名も無き剣士のブーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_NAMONAKI_KENSHINO_BOOTS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NAMONAKI_KENSHINO_BOOTS_2,
		ENCH_LIST_ID_NAMONAKI_KENSHINO_BOOTS_3,
		ENCH_LIST_ID_NAMONAKI_KENSHINO_BOOTS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 戦死者のマントエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SENSHISHANO_MANT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SENSHISHANO_MANT_2,
		ENCH_LIST_ID_SENSHISHANO_MANT_3,
		ENCH_LIST_ID_SENSHISHANO_MANT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レクイエム武器エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_REQUIEM_ARMS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_REQUIEM_ARMS_2,
		ENCH_LIST_ID_REQUIEM_ARMS_3,
		ENCH_LIST_ID_REQUIEM_ARMS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レクイエム鎧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_REQUIEM_BODY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_REQUIEM_BODY_2,
		ENCH_LIST_ID_REQUIEM_BODY_3_4,
		ENCH_LIST_ID_REQUIEM_BODY_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レクイエム盾エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_REQUIEM_SHIELD", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_REQUIEM_SHIELD_2,
		ENCH_LIST_ID_REQUIEM_SHIELD_3_4,
		ENCH_LIST_ID_REQUIEM_SHIELD_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レクイエム肩エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_REQUIEM_MANT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_REQUIEM_MANT_2,
		ENCH_LIST_ID_REQUIEM_MANT_3,
		ENCH_LIST_ID_REQUIEM_MANT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レクイエム靴エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_REQUIEM_BOOTS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_REQUIEM_BOOTS_2,
		ENCH_LIST_ID_REQUIEM_BOOTS_3_4,
		ENCH_LIST_ID_REQUIEM_BOOTS_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 思念体シューズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENTAI_SHOES", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENTAI_SHOES_2,
		ENCH_LIST_ID_SHINENTAI_SHOES_3,
		ENCH_LIST_ID_SHINENTAI_SHOES_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// フェアリーオブエデンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_FAIRY_OF_EDEN", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_FAIRLY_OF_EDEN_2,
		ENCH_LIST_ID_FAIRLY_OF_EDEN_3,
		ENCH_LIST_ID_FAIRLY_OF_EDEN_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// お洒落なサイレントシューズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_OSHARENA_SILENT_SHOES", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_OSHARENA_SILENT_SHOES_2,
		ENCH_LIST_ID_OSHARENA_SILENT_SHOES_3_4,
		ENCH_LIST_ID_OSHARENA_SILENT_SHOES_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ワンダーエッグバスケットエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_WANDER_EGG_BASKET", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_WANDER_EGG_BASKET_2,
		ENCH_LIST_ID_WANDER_EGG_BASKET_3_4,
		ENCH_LIST_ID_WANDER_EGG_BASKET_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// インペリアルグローリーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_IMPERIAL_GLORY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_IMPERIAL_GLORY_2,
		ENCH_LIST_ID_IMPERIAL_GLORY_3,
		ENCH_LIST_ID_IMPERIAL_GLORY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// クリスタルブレイドネックレスエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_CRYSTAL_BLADE_NECKLACE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_CRYSTAL_BLADE_NECKLACE_2,
		ENCH_LIST_ID_CRYSTAL_BLADE_NECKLACE_3,
		ENCH_LIST_ID_CRYSTAL_BLADE_NECKLACE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ツインブレイズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_TWIN_BLAZE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_TWIN_BLAZE_2,
		ENCH_LIST_ID_TWIN_BLAZE_3,
		ENCH_LIST_ID_TWIN_BLAZE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（栄光の御旗(青)）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_EIKONO_MIHATA_AO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_EIKONO_MIHATA_AO,
		ENCH_LIST_ID_EIKONO_MIHATA_AO,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（海底神殿の財宝）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAITEI_SHINDENNO_ZAIHO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_4,
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_3,
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_2,
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_1,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 名も無き暗殺者のマフラーエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_NAMONAKI_ANSATSUSHANO_MUFFLER", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NAMONAKI_ANSATSUSHANO_MUFFLER_2,
		ENCH_LIST_ID_NAMONAKI_ANSATSUSHANO_MUFFLER_3_4,
		ENCH_LIST_ID_NAMONAKI_ANSATSUSHANO_MUFFLER_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　グループ２　武器
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_ARMS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_ARMS_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_ARMS_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_ARMS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　巨蟹宮のクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KYOKAIKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KYOKAIKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KYOKAIKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KYOKAIKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　金牛宮のダイアデム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KINGYUKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KINGYUKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KINGYUKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_KINGYUKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　獅子宮のクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHISHIKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHISHIKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHISHIKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHISHIKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　処女宮のダイアデム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHOZYOKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHOZYOKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHOZYOKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SHOZYOKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　人馬宮のクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_ZINBAKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_ZINBAKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_ZINBAKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_ZINBAKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　双魚宮のダイアデム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOGYOKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOGYOKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOGYOKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOGYOKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　双児宮のダイアデム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOZIKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOZIKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOZIKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_SOZIKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　天秤宮のダイアデム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENBINKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENBINKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENBINKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENBINKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　天蝎宮のクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENKATSUKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENKATSUKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENKATSUKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_TENKATSUKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　白羊宮のクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HAKUYOKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HAKUYOKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HAKUYOKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HAKUYOKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　プロキオンクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_PROCYON", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_PROCYON_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_PROCYON_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_PROCYON_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　宝瓶宮のクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HOBINKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HOBINKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HOBINKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_HOBINKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　ポルックスクラウン
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_POLLUX", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_POLLUX_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_POLLUX_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_POLLUX_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　磨羯宮のダイアデム
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_MAKATSUKYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_MAKATSUKYU_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_MAKATSUKYU_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_HEAD_MAKATSUKYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　グループ２　体
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_BODY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_BODY_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_BODY_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_BODY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　グループ２　肩
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_SHOULDER", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHOULDER_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHOULDER_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHOULDER_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHOULDER_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　グループ２　靴
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_FOOT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_FOOT_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_FOOT_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_FOOT_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_FOOT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラビリンスエンチャント　グループ２　盾
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LABYRINTH_ENCHANT_GROUP_2_SHIELD", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHIELD_1,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHIELD_2,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHIELD_3,
		ENCH_LIST_ID_LABYRINTH_ENCHANT_GROUP_2_SHIELD_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 抱きつきシャムネコエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_DAKITSUKI_SYAMNEKO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DAKITSUKI_SYAMNEKO_2,
		ENCH_LIST_ID_DAKITSUKI_SYAMNEKO_3,
		ENCH_LIST_ID_DAKITSUKI_SYAMNEKO_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ちゃぷちゃぷニャンプーハットエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_CHAPUCHAPU_NYANPU_HAT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_CHAPUCHAPU_NYANPU_HAT_2,
		ENCH_LIST_ID_CHAPUCHAPU_NYANPU_HAT_3,
		ENCH_LIST_ID_CHAPUCHAPU_NYANPU_HAT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ぴかぴかニャンニャンクラウンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PIKAPIKA_NYANNYAN_CROWN", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PIKAPIKA_NYANNYAN_CROWN_2,
		ENCH_LIST_ID_PIKAPIKA_NYANNYAN_CROWN_3,
		ENCH_LIST_ID_PIKAPIKA_NYANNYAN_CROWN_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 特選ドラムスーツエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_TOKUSEN_DORAM_SUITS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_TOKUSEN_DORAM_SUITS_2,
		ENCH_LIST_ID_TOKUSEN_DORAM_SUITS_3,
		ENCH_LIST_ID_TOKUSEN_DORAM_SUITS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 特選ドラムケープエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_TOKUSEN_DORAM_CAPE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_TOKUSEN_DORAM_CAPE_2,
		ENCH_LIST_ID_TOKUSEN_DORAM_CAPE_3,
		ENCH_LIST_ID_TOKUSEN_DORAM_CAPE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 特選ドラムシューズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_TOKUSEN_DORAM_SHOES", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_TOKUSEN_DORAM_SHOES_2,
		ENCH_LIST_ID_TOKUSEN_DORAM_SHOES_3,
		ENCH_LIST_ID_TOKUSEN_DORAM_SHOES_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶肩装備（第一期）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_SHOULDER_SERIES_1", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_SHOULDER_SERIES_1_2,
		ENCH_LIST_ID_RAGKAN_SHOULDER_SERIES_1_3,
		ENCH_LIST_ID_RAGKAN_SHOULDER_SERIES_1_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶肩装備（第二期）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_SHOULDER_SERIES_2", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_SHOULDER_SERIES_2_3,
		ENCH_LIST_ID_RAGKAN_SHOULDER_SERIES_2_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶靴装備（第一期）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_FOOT_SERIES_1", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_FOOT_SERIES_1_2,
		ENCH_LIST_ID_RAGKAN_FOOT_SERIES_1_3,
		ENCH_LIST_ID_RAGKAN_FOOT_SERIES_1_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶靴装備（第二期）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_FOOT_SERIES_2", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_FOOT_SERIES_2_3,
		ENCH_LIST_ID_RAGKAN_FOOT_SERIES_2_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ステッポリンエンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_STEPORING", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_STEPORING_2,
		ENCH_LIST_ID_STEPORING_3,
		ENCH_LIST_ID_STEPORING_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// あざといケロケロカッパエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_BODY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_BODY_2,
		ENCH_LIST_ID_RAGKAN_BODY_3,
		ENCH_LIST_ID_RAGKAN_BODY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// パラダイスロストエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PARADISE_LOST", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PARADISE_LOST_2,
		ENCH_LIST_ID_PARADISE_LOST_3,
		ENCH_LIST_ID_PARADISE_LOST_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ホワイトリリーローブエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_WHITE_LILIUM_ROBE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_WHITE_LILIUM_ROBE_2,
		ENCH_LIST_ID_WHITE_LILIUM_ROBE_3,
		ENCH_LIST_ID_WHITE_LILIUM_ROBE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オートマティックエンチャント（盾）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AUTOMATIC_SHIELD", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_AUTOMATIC_SHIELD,
		ENCH_LIST_ID_AUTOMATIC_SHIELD,
		ENCH_LIST_ID_AUTOMATIC_SHIELD,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（アルファコア）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ALPHA_CORE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_ALPHA_CORE_4,
		ENCH_LIST_ID_ALPHA_CORE_3,
		ENCH_LIST_ID_ALPHA_CORE_2,
		ENCH_LIST_ID_ALPHA_CORE_1,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 職業パッケージアクセサリエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_JOB_PACK_ACCESSARY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_2,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_3,
		ENCH_LIST_ID_JOB_PACK_ACCESSARY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶アクセサリー装備エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_ACCESSARY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_ACCESSARY_2,
		ENCH_LIST_ID_RAGKAN_ACCESSARY_3,
		ENCH_LIST_ID_RAGKAN_ACCESSARY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶アクセサリー装備（プレイヤー耐性なし系）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_ACCESSARY_NO_PLAYER", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_ACCESSARY_2,
		ENCH_LIST_ID_RAGKAN_ACCESSARY_NO_PLAYER_3,
		ENCH_LIST_ID_RAGKAN_ACCESSARY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ラグ缶頭装備（第三期）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_RAGKAN_HEAD_TOP_V3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_RAGKAN_HEAD_TOP_V3_2,
		ENCH_LIST_ID_RAGKAN_HEAD_TOP_V3_3,
		ENCH_LIST_ID_RAGKAN_HEAD_TOP_V3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント（精錬祭２０２１）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_REFINE_FES_2021", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_REFINE_FES_2021_2,
		ENCH_LIST_ID_SEASON_REFINE_FES_2021_3,
		ENCH_LIST_ID_SEASON_REFINE_FES_2021_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（武器　覚醒）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_ARMS_KAKUSE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENNO_KAIRO_ARMS_KAKUSE_2,
		ENCH_LIST_ID_SHINENNO_KAIRO_ARMS_KAKUSE_3,
		ENCH_LIST_ID_SHINENNO_KAIRO_ARMS_KAKUSE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（頭上段　覚醒）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_HEAD_TOP_KAKUSE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENNO_KAIRO_HEAD_TOP_KAKUSE_2,
		ENCH_LIST_ID_SHINENNO_KAIRO_HEAD_TOP_KAKUSE_3,
		ENCH_LIST_ID_SHINENNO_KAIRO_HEAD_TOP_KAKUSE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（鎧　覚醒）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_BODY_KAKUSE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENNO_KAIRO_BODY_KAKUSE_2,
		ENCH_LIST_ID_SHINENNO_KAIRO_BODY_KAKUSE_3,
		ENCH_LIST_ID_SHINENNO_KAIRO_BODY_KAKUSE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（肩　覚醒）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_SHOULDER_KAKUSE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENNO_KAIRO_SHOULDER_KAKUSE_2,
		ENCH_LIST_ID_SHINENNO_KAIRO_SHOULDER_KAKUSE_3,
		ENCH_LIST_ID_SHINENNO_KAIRO_SHOULDER_KAKUSE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（靴　覚醒）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_SHOES_KAKUSE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENNO_KAIRO_SHOES_KAKUSE_2,
		ENCH_LIST_ID_SHINENNO_KAIRO_SHOES_KAKUSE_3,
		ENCH_LIST_ID_SHINENNO_KAIRO_SHOES_KAKUSE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 深淵の回廊エンチャント（アクセ　覚醒）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHINENNO_KAIRO_ACCESSARY_KAKUSE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHINENNO_KAIRO_ACCESSARY_KAKUSE_2,
		ENCH_LIST_ID_SHINENNO_KAIRO_ACCESSARY_KAKUSE_3,
		ENCH_LIST_ID_SHINENNO_KAIRO_ACCESSARY_KAKUSE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 魔狩りの靴エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_MAKARINO_KUTSU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_MAKARINO_KUTSU_2,
		ENCH_LIST_ID_MAKARINO_KUTSU_3,
		ENCH_LIST_ID_MAKARINO_KUTSU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 剛勇無双の神輿エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GOYUMUSONO_MIKOSHI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GOYUMUSONO_MIKOSHI_2,
		ENCH_LIST_ID_GOYUMUSONO_MIKOSHI_3,
		ENCH_LIST_ID_GOYUMUSONO_MIKOSHI_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オメガコアエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_OMEGA_CORE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_OMEGA_CORE_2,
		ENCH_LIST_ID_OMEGA_CORE_3,
		ENCH_LIST_ID_OMEGA_CORE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ロードオブロイヤルズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LORD_OF_ROYALS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_LORD_OF_ROYALS_2,
		ENCH_LIST_ID_LORD_OF_ROYALS_3,
		ENCH_LIST_ID_LORD_OF_ROYALS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント（ブライダル２０２１）エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_BRIDAL_2021", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_BRIDAL_2021_2,
		ENCH_LIST_ID_SEASON_BRIDAL_2021_3,
		ENCH_LIST_ID_SEASON_BRIDAL_2021_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（武器Ｖ３）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_ARMS_V3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ARMS_2,
		ENCH_LIST_ID_ILLUSION_ARMS_V3_3,
		ENCH_LIST_ID_ILLUSION_ARMS_V3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（兜Ｖ４）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_HEAD_V4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_HEAD_2,
		ENCH_LIST_ID_ILLUSION_HEAD_V4_3,
		ENCH_LIST_ID_ILLUSION_HEAD_V4_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（鎧Ｖ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_BODY_V2", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_BODY_2,
		ENCH_LIST_ID_ILLUSION_BODY_V2_3,
		ENCH_LIST_ID_ILLUSION_BODY_V2_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（肩Ｖ４）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_SHOULDER_V4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHOULDER_2,
		ENCH_LIST_ID_ILLUSION_SHOULDER_V4_3,
		ENCH_LIST_ID_ILLUSION_SHOULDER_V4_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（アクセＶ３）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_ACCESSARY_V3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_2,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_V3_3,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_V3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント（サマー２０２１）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_SUMMER_2021", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_SUMMER_2021_2,
		ENCH_LIST_ID_SEASON_SUMMER_2021_3,
		ENCH_LIST_ID_SEASON_SUMMER_2021_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// プレミアメロンヘッドフォンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PREMIUM_MELON_HEADPHONE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PREMIUM_MELON_HEADPHONE_2,
		ENCH_LIST_ID_PREMIUM_MELON_HEADPHONE_3,
		ENCH_LIST_ID_PREMIUM_MELON_HEADPHONE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// オケアノスの加護エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_OKEANOSNO_KAGO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_OKEANOSNO_KAGO_2,
		ENCH_LIST_ID_OKEANOSNO_KAGO_3,
		ENCH_LIST_ID_OKEANOSNO_KAGO_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// アミノVitエンチャント（グループ４）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AMINO_VIT_GROUP", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_AMINO_VIT_GROUP_4_2,
		ENCH_LIST_ID_AMINO_VIT_GROUP_4_3,
		ENCH_LIST_ID_AMINO_VIT_GROUP_4_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（武器）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_ARMS", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_ARMS_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（武器　マランエンチャント可能品）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_ARMS_ABLE_MARAN_ON_3_4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_151,
		ENCH_LIST_ID_PHAROS_ARMS_ABLE_MARAN_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	//ファロスエンチャント（武器　ロックリッジエンチャント可能品）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_ARMS_ABLE_ROCKRIDGE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_ARMS_ABLE_ROCKRIDGE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_HEAD_TOP", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　ヴェスパーヘッドギア）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_HEAD_TOP_VESPER_HEAD_GEAR", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_VESPER_HEAD_GEAR_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_VESPER_HEAD_GEAR_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　オウルヴァイカウントのシルクハット）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_HEAD_TOP_OWL_VAICAUNTNO_SILK_HAT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_OWL_VAICAUNTNO_SILK_HAT_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_OWL_VAICAUNTNO_SILK_HAT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　お座り教皇(私服)）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_HEAD_TOP_OSUWARI_KYOKO_SHIFUKU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_OSUWARI_KYOKO_SHIFUKU_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_OSUWARI_KYOKO_SHIFUKU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　クイーン・アンズ・リベンジ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_HEAD_TOP_QUEEN_AND_REVENGE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_QUEEN_AND_REVENGE_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_QUEEN_AND_REVENGE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　ダークハンド）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_HEAD_TOP_DARK_HAND", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_DARK_HAND_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_DARK_HAND_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　ライオットチップ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_PHAROS_HEAD_TOP_RIOT_CHIP", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_RIOT_CHIP_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_RIOT_CHIP_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　リス耳フード帽）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_PHAROS_HEAD_TOP_RISUMIMI_HOODBO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_RISUMIMI_HOODBO_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_RISUMIMI_HOODBO_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　狐耳鈴リボン）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_PHAROS_HEAD_TOP_KITSUNEMIMI_SUZU_RIBBON", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_KITSUNEMIMI_SUZU_RIBBON_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_KITSUNEMIMI_SUZU_RIBBON_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（兜上段　負傷兵の包帯）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_PHAROS_HEAD_TOP_FUSHOHENO_HOTAI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_2,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_FUSHOHENO_HOTAI_3,
		ENCH_LIST_ID_PHAROS_HEAD_TOP_FUSHOHENO_HOTAI_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（鎧　覚醒ローブ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_PHAROS_BODY_KAKUSEI_ROBE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_BODY_2,
		ENCH_LIST_ID_PHAROS_BODY_3,
		ENCH_LIST_ID_PHAROS_BODY_KAKUSEI_ROBE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　アンドフリームニルのマント）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_ANDFRIMNILNO_MANT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_ANDFRIMNILNO_MANT_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_ANDFRIMNILNO_MANT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　スキンオブシャドウ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_SKIN_OF_SHADOW", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_SKIN_OF_SHADOW_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_SKIN_OF_SHADOW_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　スクロールストール）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_SCROLL_STOLE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_SCROLL_STOLE_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_SCROLL_STOLE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　スピリチュアルクロース）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_SPIRITUAL_CLOTH", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_SPIRITUAL_CLOTH_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_SPIRITUAL_CLOTH_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　フェアリークロース）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_FAIRLY_CLOTH", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_FAIRLY_CLOTH_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_FAIRLY_CLOTH_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　メディックケープ）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_MEDIC_CAPE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_MEDIC_CAPE_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_MEDIC_CAPE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　堕天司祭の闇光外套）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_DATENSHISAINO_ANKOUGAITO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_DATENSHISAINO_ANKOUGAITO_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_DATENSHISAINO_ANKOUGAITO_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（肩　連合軍司令官のマント）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOULDER_RENGOGUN_SHIREKANNNO_MANT", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOULDER_2,
		ENCH_LIST_ID_PHAROS_SHOULDER_RENGOGUN_SHIREKANNNO_MANT_3,
		ENCH_LIST_ID_PHAROS_SHOULDER_RENGOGUN_SHIREKANNNO_MANT_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（靴）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_SHOES", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_SHOES_2,
		ENCH_LIST_ID_PHAROS_SHOES_3,
		ENCH_LIST_ID_PHAROS_SHOES_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ファロスエンチャント（アクセ　ラグ缶アクセサリー装備）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_PHAROS_ACCESSARY_RAGKAN_ACCESSARY", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_PHAROS_ACCESSARY_RAGKAN_ACCESSARY_2,
		ENCH_LIST_ID_PHAROS_ACCESSARY_RAGKAN_ACCESSARY_3,
		ENCH_LIST_ID_PHAROS_ACCESSARY_RAGKAN_ACCESSARY_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シールドオブフェニックスエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHIELD_OF_PHOENIX", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHIELD_OF_PHOENIX_3,
		ENCH_LIST_ID_SHIELD_OF_PHOENIX_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// スプンタマンユエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SPUNTA_MAINYU", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SPUNTA_MAINYU_3,
		ENCH_LIST_ID_SPUNTA_MAINYU_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 覚醒フルフォースエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAKUSE_FULL_FORCE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KAKUSE_FULL_FORCE_2,
		ENCH_LIST_ID_KAKUSE_FULL_FORCE_3,
		ENCH_LIST_ID_KAKUSE_FULL_FORCE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 覚醒オークロードの鎧エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAKUSE_ORCLORDNO_YOROI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KAKUSE_ORCLORDNO_YOROI_2,
		ENCH_LIST_ID_KAKUSE_ORCLORDNO_YOROI_3,
		ENCH_LIST_ID_KAKUSE_ORCLORDNO_YOROI_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 覚醒ホロウシューズエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAKUSE_HOROW_SHOES", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_KAKUSE_HOROW_SHOES_2,
		ENCH_LIST_ID_KAKUSE_HOROW_SHOES_3,
		ENCH_LIST_ID_KAKUSE_HOROW_SHOES_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョン特化肩エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_SPCIFIED_SHOULDER", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SPCIFIED_SHOULDER_2,
		ENCH_LIST_ID_ILLUSION_SPCIFIED_SHOULDER_3,
		ENCH_LIST_ID_ILLUSION_SPCIFIED_SHOULDER_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// フェイスオブイグドラシルエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_FACE_OF_YGGDRASILL", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_FACE_OF_YGGDRASILL_2,
		ENCH_LIST_ID_FACE_OF_YGGDRASILL_3_4,
		ENCH_LIST_ID_FACE_OF_YGGDRASILL_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 悪霊のうめき声エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AKURYONO_UMEKIGOE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_AKURYONO_UMEKIGOE_2,
		ENCH_LIST_ID_AKURYONO_UMEKIGOE_3,
		ENCH_LIST_ID_AKURYONO_UMEKIGOE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イージスシステムエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_AEGIS_SYSTEM", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_AEGIS_SYSTEM_3_4,
		ENCH_LIST_ID_AEGIS_SYSTEM_3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ガーディアンヘルムエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GUARDIAN_HELM", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GUARDIAN_HELM_2,
		ENCH_LIST_ID_GUARDIAN_HELM_3,
		ENCH_LIST_ID_GUARDIAN_HELM_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// アインヘリヤルの外套エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_EINHERJERNO_GAITO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_EINHERJERNO_GAITO_2,
		ENCH_LIST_ID_EINHERJERNO_GAITO_3,
		ENCH_LIST_ID_EINHERJERNO_GAITO_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 星の眼帯エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_HOSHINO_GANTAI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_HOSHINO_GANTAI_2,
		ENCH_LIST_ID_308,
		ENCH_LIST_ID_307,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 負傷兵の眼帯エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_FUSHOHENO_GANTAI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_FUSHOHENO_GANTAI_2,
		ENCH_LIST_ID_308,
		ENCH_LIST_ID_307,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// デウス・エクス・マキナエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_DEUS_EX_MACHINA", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_DEUS_EX_MACHINA_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界を蝕む呪詛エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEKAIWO_MUSHIBAMU_ZYUSO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEKAIWO_MUSHIBAMU_ZYUSO_2,
		ENCH_LIST_ID_SEKAIWO_MUSHIBAMU_ZYUSO_3,
		ENCH_LIST_ID_SEKAIWO_MUSHIBAMU_ZYUSO_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（上級）（海底神殿の財宝）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ZYOKYU_KAITEI_SHINDENNO_ZAIHO", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_4,
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_3,
		ENCH_LIST_ID_KAITEI_SHINDENNO_ZAIHO_2,
		ENCH_LIST_ID_NONE,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 世界樹エンチャント（上級）（アルファコア）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ZYOKYU_ALPHA_CORE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_ALPHA_CORE_4,
		ENCH_LIST_ID_ALPHA_CORE_3,
		ENCH_LIST_ID_ALPHA_CORE_2,
		ENCH_LIST_ID_NONE,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 白の騎士団エンチャント（宮廷魔術師不可系）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SHIRONO_KISHIDAN_ADVANCED", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SHIRONO_KISHIDAN_ADVANCED_3,
		ENCH_LIST_ID_SHIRONO_KISHIDAN_ADVANCED_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 古びた迷彩スカーフエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_FURUBITA_MESAI_SCARF", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_FURUBITA_MESAI_SCARF_2,
		ENCH_LIST_ID_FURUBITA_MESAI_SCARF_3,
		ENCH_LIST_ID_FURUBITA_MESAI_SCARF_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ノブレスオブリージュエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_NOBLESSE_OBLIGE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NOBLESSE_OBLIGE_2,
		ENCH_LIST_ID_NOBLESSE_OBLIGE_3,
		ENCH_LIST_ID_NOBLESSE_OBLIGE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント　ラプラス　グループ３　エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_LAPLACE_G3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_LAPLACE_G3_2,
		ENCH_LIST_ID_SEASON_LAPLACE_G3_3,
		ENCH_LIST_ID_SEASON_LAPLACE_G3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント　ラプラス　グループ４　エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_LAPLACE_G4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_LAPLACE_G4_2,
		ENCH_LIST_ID_SEASON_LAPLACE_G4_3,
		ENCH_LIST_ID_SEASON_LAPLACE_G4_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント　ラプラス　グループ５　エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_LAPLACE_G5", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_LAPLACE_G5_2,
		ENCH_LIST_ID_SEASON_LAPLACE_G5_3,
		ENCH_LIST_ID_SEASON_LAPLACE_G5_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// シーズンエンチャント　ラプラス　グループ６　エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_SEASON_LAPLACE_G6", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_SEASON_LAPLACE_G6_2,
		ENCH_LIST_ID_SEASON_LAPLACE_G6_3,
		ENCH_LIST_ID_SEASON_LAPLACE_G6_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// 覚醒ホワイトリリーローブエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_KAKUSE_WHITE_LILIUM_ROBE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_WHITE_LILIUM_ROBE_2,
		ENCH_LIST_ID_KAKUSE_WHITE_LILIUM_ROBE_3,
		ENCH_LIST_ID_WHITE_LILIUM_ROBE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// メメントモリエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_MEMENTO_MORI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_MEMENTO_MORI_2,
		ENCH_LIST_ID_MEMENTO_MORI_3,
		ENCH_LIST_ID_MEMENTO_MORI_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ガーディアンクロースエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GUARDIAN_CLOTH", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GUARDIAN_CLOTH_2,
		ENCH_LIST_ID_GUARDIAN_CLOTH_3,
		ENCH_LIST_ID_GUARDIAN_CLOTH_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（鎧Ｖ３）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_BODY_V3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_BODY_V3_2,
		ENCH_LIST_ID_ILLUSION_BODY_V3_3,
		ENCH_LIST_ID_ILLUSION_BODY_V3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（靴Ｖ４）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_FOOT_V4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_FOOT_V4_2,
		ENCH_LIST_ID_ILLUSION_FOOT_V4_3,
		ENCH_LIST_ID_ILLUSION_FOOT_V4_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（盾Ｖ２）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_SHIELD_V2", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_SHIELD_V2_2,
		ENCH_LIST_ID_ILLUSION_SHIELD_V2_3,
		ENCH_LIST_ID_ILLUSION_SHIELD_V2_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// イリュージョンエンチャント（アクセＶ４）
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ILLUSION_CCESSARY_V4", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_V4_2,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_V4_3,
		ENCH_LIST_ID_ILLUSION_ACCESSARY_V4_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// ゴルゴーンの花冠エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_GORGONNO_HANAKANMURI", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_GORGONNO_HANAKANMURI_2,
		ENCH_LIST_ID_GORGONNO_HANAKANMURI_3,
		ENCH_LIST_ID_GORGONNO_HANAKANMURI_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// アラマズドの天恵エンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_ARAMAZDNO_TENKE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_ARAMAZDNO_TENKE_3,
		ENCH_LIST_ID_ARAMAZDNO_TENKE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マヅナイエンチャント　リスト１
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_MADUNAI_L1", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_MADUNAI_L1_2,
		ENCH_LIST_ID_MADUNAI_L1_3,
		ENCH_LIST_ID_MADUNAI_L1_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マヅナイエンチャント　リスト２
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_MADUNAI_L2", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_MADUNAI_L2_2,
		ENCH_LIST_ID_MADUNAI_L2_3,
		ENCH_LIST_ID_MADUNAI_L2_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// マヅナイエンチャント　リスト３
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_MADUNAI_L3", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_MADUNAI_L3_2,
		ENCH_LIST_ID_MADUNAI_L3_3,
		ENCH_LIST_ID_MADUNAI_L3_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;



	// レガシーオブワイズワンエンチャント
	CEnchTypeDataMaker.RegisterId("ENCH_TYPE_ID_LEGACY_OF_WISE_ONE", enchTypeId);
	enchTypeData = [
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_NONE,
		ENCH_LIST_ID_LEGACY_OF_WISE_ONE_3,
		ENCH_LIST_ID_LEGACY_OF_WISE_ONE_4,
	];
	n_EnchantType[enchTypeId] = enchTypeData;
	enchTypeId++;




};



// データ上書き
if (_DATA_CREATE_MODE) {
	CEnchTypeDataMaker.OverrideData();
}
