
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * アイテムパックデータ作成クラス.
 */
function CItemPackDataMaker () {

}

//================================================================
// アイテムパックデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CItemPackDataMaker.ItemPackName = function (value) { return value; };
CItemPackDataMaker.ItemPackKana = function (value) { return value; };
CItemPackDataMaker.ItemPackDetailText = function (value) { return value; };

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CItemPackDataMaker.RegisterId = function (name, value) {
	if (name != "ITEM_PACK_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumItemPackId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** アイテムパックデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CItemPackDataMaker.OverrideData = function () {

	var itemPackId = 0;
	var itemPackData = null;

	// データ配列オブジェクトを上書き定義していく
	ItemPackOBJ = new Array();



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_NONE", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("選択してください"),
		CItemPackDataMaker.ItemPackKana("ア"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　天秤宮（ルーンナイト）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０１テンヒンキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENBINKYUNO_KRASNAYA, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENBINKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENBINKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENBINKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENBINKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENBINKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_TENKATSUKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　天蝎宮（ギロチンクロス）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０２テンカツキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENKATSUKYUNO_KATAR, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENKATSUKYUNO_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENKATSUKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENKATSUKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENKATSUKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TENKATSUKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SHOZYOKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　処女宮（アークビショップ）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０３シヨシヨキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHOZYOKYUNO_DEVINE_CROSS, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHOZYOKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHOZYOKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHOZYOKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHOZYOKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHOZYOKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_ZINBAKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　人馬宮（レンジャー）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０４シンハキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_ZINBAKYUNO_HUNTER_BOW, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_ZINBAKYUNO_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_ZINBAKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_ZINBAKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_ZINBAKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_ZINBAKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_HOBINKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　宝瓶宮（ウォーロック）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０５ホウヒンキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HOBINKYUNO_STUFF, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HOBINKYUNO_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HOBINKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HOBINKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HOBINKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HOBINKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_KYOKAIKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　巨蟹宮（メカニック）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０６キヨカイキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KYOKAIKYUNO_AXE, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KYOKAIKYUNO_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KYOKAIKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KYOKAIKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KYOKAIKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KYOKAIKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_HAKUYOKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　白羊宮（ロイヤルガード）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０７ハクヨウキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_SPEAR, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_SHIELD, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_HAKUYOKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_MAKATSUKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　磨羯宮（シャドウチェイサー）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０８マカツキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_MAKATSUKYUNO_THIEF_BOW, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_MAKATSUKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_MAKATSUKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_MAKATSUKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_MAKATSUKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_MAKATSUKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SHISHIKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　獅子宮（修羅）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ０９シシキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHISHIKYUNO_MACE, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHISHIKYUNO_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHISHIKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHISHIKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHISHIKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SHISHIKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_MINSTREL", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　双児宮（ミンストレル）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１０ソウシキユウミンストレル"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_VIOLIN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_WANDERER", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　双児宮（ワンダラー）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１１ソウシキユウワンタラア"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_ROPE, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOZIKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SOGYOKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　双魚宮（ソーサラー）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１２ソウキヨキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOGYOKYUNO_STUFF_OF_SOUL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOGYOKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOGYOKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOGYOKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOGYOKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_SOGYOKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_KINGYUKYU", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　金牛宮（ジェネティック）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１３キンキユウキユウ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KINGYUKYUNO_SWORD, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KINGYUKYUNO_DIADEM, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KINGYUKYUNO_MAIL, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KINGYUKYUNO_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KINGYUKYUNO_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KINGYUKYUNO_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_STAR_EMPEROR", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　ポルックス（星帝）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１４ホルツクス"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_POLLUX_BOOK, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_POLLUX_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_POLLUX_ROBE, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_POLLUX_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_POLLUX_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_POLLUX_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SOUL_REAPER", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　プロキオン（ソウルリーパー）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１５フロキオン"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_PROCYON_DAGGER, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_PROCYON_CROWN, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_PROCYON_ROBE, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_PROCYON_SHOES, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_PROCYON_MANT, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_PROCYON_RING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_JOB_PACKAGE_SUMMONER", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("職業パッケージ　抱きつき・特選（サモナー）"),
		CItemPackDataMaker.ItemPackKana("シヨクキヨウハツケエシ１６トクセントラム"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_DAKITSUKI_SYAMNEKO, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TOKUSEN_DORAM_SUITS, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TOKUSEN_DORAM_CAPE, 7,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_TOKUSEN_DORAM_SHOES, 7,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_MIMIMI", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("ミミミクエスト報酬一式"),
		CItemPackDataMaker.ItemPackKana("ミミミクエストホウシユウイツシキ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_REMENO_MAJESTIC_GOAT, 9,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_KUWAETA_CHOCO_STICK, 0,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_GINNO_KEGAWANO_SHOES, 9,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_CARNIUM_RING, 0,
			ITEM_PACK_ITEMS_KIND_ITEM, ITEM_ID_CARNIUM_EARRING, 0,
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_CLEAR_EQUIP_ALL", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("装備全解除"),
		CItemPackDataMaker.ItemPackKana("ンン０１ソウヒセンカイシヨ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_CLEAR_REFINE_ALL", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("精錬値全クリア"),
		CItemPackDataMaker.ItemPackKana("ンン０２セイレンチセンクリア"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;



	CItemPackDataMaker.RegisterId("ITEM_PACK_ID_CLEAR_CARD_ALL", itemPackId);
	itemPackData = [
		itemPackId,
		CItemPackDataMaker.ItemPackName("カード・エンチャント全解除"),
		CItemPackDataMaker.ItemPackKana("ンン０３カアトエンチヤントセンカイシヨ"),
		CItemPackDataMaker.ItemPackDetailText(""),
		[
		]
	];
	ItemPackOBJ[itemPackId] = itemPackData;
	itemPackId++;




};



// データ上書き
if (_DATA_CREATE_MODE) {
	CItemPackDataMaker.OverrideData();
}

