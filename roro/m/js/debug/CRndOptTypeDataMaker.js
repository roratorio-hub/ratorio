
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * ランダムオプションタイプクラス.
 */
function CRndOptType () {

	/** ID. */
	this.id = 0;

	/** 定義名. */
	this.defName = "RND_OPT_TYPE_ID_UNKNOWN";

	/** オプションリストID配列. */
	this.rndOptListIdArray = [
		RND_OPT_LIST_ID_NONE,
		RND_OPT_LIST_ID_NONE,
		RND_OPT_LIST_ID_NONE,
		RND_OPT_LIST_ID_NONE,
		RND_OPT_LIST_ID_NONE,
	];



	/**
	 * ID を設定する.
	 * @param id ID
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetId = function (id) {
		this.id = id;
		return this;
	};

	/**
	 * 定義名を設定する.
	 * @param defName 定義名
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetDefName = function (defName) {
		this.defName = defName;
		return this;
	};

	/**
	 * オプションリストID を設定する.
	 * @param optIndex オプション番号
	 * @param listId オプションリストID
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetRndOptListId = function (optIndex, listId) {
		this.rndOptListIdArray[optIndex] = listId;
		return this;
	};



	/**
	 * dat データに変換する.
	 * @return dat データ（配列）
	 */
	this.MakeDat = function () {
		return [
			this.id,
			this.rndOptListIdArray,
		];
	};
}



/**
 * ランダムオプションタイプデータ作成クラス.
 */
function CRndOptTypeDataMaker () {

}

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CRndOptTypeDataMaker.RegisterId = function (name, value) {
	if (name != "RND_OPT_TYPE_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumRndOptTypeId", [name], value, undefined);
	}
	return value;
};



/**
 * データ定義を上書き定義する.
 */
CRndOptTypeDataMaker.OverrideData = function () {

	var id = 0;
	var data = null;
	var list = new Array();

	var funcRegister = function (obj) {
		CRndOptDataMaker.RegisterId(obj.defName, list.length);
		obj.SetId(list.length);
		list.push(obj);
	};



	// ランダムオプションなし
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_NONE")
	);



	// 旧汎用
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_OLD_COMMON")
			.SetRndOptListId(0, RND_OPT_LIST_ID_OLD_COMMON)
			.SetRndOptListId(1, RND_OPT_LIST_ID_OLD_COMMON)
			.SetRndOptListId(2, RND_OPT_LIST_ID_OLD_COMMON)
			.SetRndOptListId(3, RND_OPT_LIST_ID_OLD_COMMON)
			.SetRndOptListId(4, RND_OPT_LIST_ID_OLD_COMMON)
	);



	// アクセサリースクロール１
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_ACCESSARY_SCROLL_1")
			.SetRndOptListId(0, RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_2_3)
			.SetRndOptListId(2, RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_2_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_4)
	);



	// ウェポンスクロール１
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_WEAPON_SCROLL_1")
			.SetRndOptListId(0, RND_OPT_LIST_ID_WEAPON_SCROLL_1_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_WEAPON_SCROLL_1_2_3_4)
			.SetRndOptListId(2, RND_OPT_LIST_ID_WEAPON_SCROLL_1_2_3_4)
			.SetRndOptListId(3, RND_OPT_LIST_ID_WEAPON_SCROLL_1_2_3_4)
	);



	// シューズスクロール１
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHOES_SCROLL_1")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHOES_SCROLL_1_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHOES_SCROLL_1_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_SHOES_SCROLL_1_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_SHOES_SCROLL_1_4)
	);



	// ヘルムスクロール１
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_HELM_SCROLL_1")
			.SetRndOptListId(0, RND_OPT_LIST_ID_HELM_SCROLL_1_1_2_3)
			.SetRndOptListId(1, RND_OPT_LIST_ID_HELM_SCROLL_1_1_2_3)
			.SetRndOptListId(2, RND_OPT_LIST_ID_HELM_SCROLL_1_1_2_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_HELM_SCROLL_1_4)
	);



	// メイルスクロール１
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_MAIL_SCROLL_1")
			.SetRndOptListId(0, RND_OPT_LIST_ID_MAIL_SCROLL_1_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_MAIL_SCROLL_1_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_MAIL_SCROLL_1_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_MAIL_SCROLL_1_4)
	);



	// 守護のエッセンス
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHUGONO_ESSENCE")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHUGONO_ESSENCE_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHUGONO_ESSENCE_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_SHUGONO_ESSENCE_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_SHUGONO_ESSENCE_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_SHUGONO_ESSENCE_5)
	);



	// 闘気のエッセンス
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_TOKINO_ESSENCE")
			.SetRndOptListId(0, RND_OPT_LIST_ID_TOKINO_ESSENCE_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_TOKINO_ESSENCE_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_TOKINO_ESSENCE_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_TOKINO_ESSENCE_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_TOKINO_ESSENCE_5)
	);



	// 猛気のエッセンス
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_MOKINO_ESSENCE")
			.SetRndOptListId(0, RND_OPT_LIST_ID_MOKINO_ESSENCE_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_MOKINO_ESSENCE_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_MOKINO_ESSENCE_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_MOKINO_ESSENCE_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_MOKINO_ESSENCE_5)
	);



	// 兜改造装置
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_KABUTO_KAIZO_SOCHI")
			.SetRndOptListId(0, RND_OPT_LIST_ID_KABUTO_KAIZO_SOCHI_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_KABUTO_KAIZO_SOCHI_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_KABUTO_KAIZO_SOCHI_3)
	);



	// 大罪武器
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_TAIZAI_WEAPON")
			.SetRndOptListId(0, RND_OPT_LIST_ID_TAIZAI_WEAPON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_TAIZAI_WEAPON_2)
	);



	// 違法パーツ
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_IHO_PARTS")
			.SetRndOptListId(0, RND_OPT_LIST_ID_IHO_PARTS_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_IHO_PARTS_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_IHO_PARTS_3)
	);



	// リラプス武器（片手）
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_RELAPSE_ARMS")
			.SetRndOptListId(0, RND_OPT_LIST_ID_RELAPSE_ARMS_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_RELAPSE_ARMS_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_RELAPSE_ARMS_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_RELAPSE_ARMS_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_RELAPSE_ARMS_5)
	);

	// リラプス武器（両手）
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_RELAPSE_ARMS_2HAND")
			.SetRndOptListId(0, RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_5)
	);



	// オルタネイトクリップ
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_ALTERNATE_CLIP")
			.SetRndOptListId(0, RND_OPT_LIST_ID_ALTERNATE_CLIP_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_ALTERNATE_CLIP_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_ALTERNATE_CLIP_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_OLD_COMMON)
			.SetRndOptListId(4, RND_OPT_LIST_ID_ALTERNATE_CLIP_5)
	);



	// フォーティファイド武器（片手）
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_FORTIFIED_ARMS")
			.SetRndOptListId(0, RND_OPT_LIST_ID_FORTIFIED_ARMS_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_FORTIFIED_ARMS_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_FORTIFIED_ARMS_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_FORTIFIED_ARMS_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_FORTIFIED_ARMS_5)
	);

	// フォーティファイド武器（両手）
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_FORTIFIED_ARMS_2HAND")
			.SetRndOptListId(0, RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_2)
			.SetRndOptListId(2, RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_3)
			.SetRndOptListId(3, RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_4)
			.SetRndOptListId(4, RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_5)
	);



	// シャドウ　オルタネイトアーマー
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHADOW_ALTERNATE_ARMOR")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHADOW_ALTERNATE_ARMOR_2)
	);

	// シャドウ　オルタネイトウェポン
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHADOW_ALTERNATE_WEAPON")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHADOW_ALTERNATE_WEAPON_2)
	);

	// シャドウ　オルタネイトシールド
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHADOW_ALTERNATE_SHIELD")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHADOW_ALTERNATE_SHIELD_2)
	);

	// シャドウ　オルタネイトシューズ
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHADOW_ALTERNATE_SHOES")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHADOW_ALTERNATE_SHOES_2)
	);

	// シャドウ　オルタネイトイヤリング
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHADOW_ALTERNATE_EARRING")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHADOW_ALTERNATE_ACCESSORY_2)
	);

	// シャドウ　オルタネイトペンダント
	funcRegister(
		new CRndOptType()
			.SetDefName("RND_OPT_TYPE_ID_SHADOW_ALTERNATE_PENDANT")
			.SetRndOptListId(0, RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1)
			.SetRndOptListId(1, RND_OPT_LIST_ID_SHADOW_ALTERNATE_ACCESSORY_2)
	);





	// グローバル変数を書き換える
	g_rndOptTypeArray = new Array();

	for (idx = 0; idx < list.length; idx++) {
		g_rndOptTypeArray.push(list[idx].MakeDat());
	}

};



// データ上書き
if (_DATA_CREATE_MODE) {
	CRndOptTypeDataMaker.OverrideData();
}
