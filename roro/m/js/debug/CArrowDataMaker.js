
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * 時限アイテムデータ作成クラス.
 */
function CArrowDataMaker () {

}

//================================================================
// 時限アイテムデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CArrowDataMaker.ArrowName = function (value) { return value; };
CArrowDataMaker.ArrowKana = function (value) { return value; };
CArrowDataMaker.ArrowKind = function (value) { return value; };
CArrowDataMaker.ArrowDetailText = function (value) { return value; };

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CArrowDataMaker.RegisterId = function (name, value) {
	if (name != "ARROW_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumArrowId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** 時限アイテムデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CArrowDataMaker.OverrideData = function () {

	var arrowId = 0;
	var arrowData = null;

	// データ配列オブジェクトを上書き定義していく
	ArrowOBJNew = new Array();



	CArrowDataMaker.RegisterId("ARROW_ID_NONE", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("なし"),
		CArrowDataMaker.ArrowKana("００ナシ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_NONE),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("矢"),
		CArrowDataMaker.ArrowKana("００１ヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 25,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_TETSUNO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("鉄の矢"),
		CArrowDataMaker.ArrowKana("００２テツノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_KOTETSUNO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("鋼鉄の矢"),
		CArrowDataMaker.ArrowKana("００３コウテツノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 40,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_ORIDEOKONNO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("オリデオコンの矢"),
		CArrowDataMaker.ArrowKana("００４オリテオコンノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_KARYUDONO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("狩人の矢"),
		CArrowDataMaker.ArrowKana("００５カリユウトノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 35,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_ELFNO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("エルフの矢"),
		CArrowDataMaker.ArrowKana("００６エルフノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 45,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SUISHONO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("水晶の矢"),
		CArrowDataMaker.ArrowKana("００７スイシヨウノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 1,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_GANSEKINO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("岩石の矢"),
		CArrowDataMaker.ArrowKana("００８カンセキノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 2,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_HONOONO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("炎の矢"),
		CArrowDataMaker.ArrowKana("００９ホノオノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 3,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_KAZENO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("風の矢"),
		CArrowDataMaker.ArrowKana("０１０カセノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 4,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SABITA_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("錆びた矢"),
		CArrowDataMaker.ArrowKana("０１１サヒタヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 5,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_GINNO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("銀の矢"),
		CArrowDataMaker.ArrowKana("０１２キンノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 6,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_HAMAYA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("破魔矢"),
		CArrowDataMaker.ArrowKana("０１３ハマヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_ELEMENTAL, 6,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SEINARU_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("聖なる矢"),
		CArrowDataMaker.ArrowKana("０１４セイナルヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_ELEMENTAL, 6,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_KAGEYA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("影矢"),
		CArrowDataMaker.ArrowKana("０１５カケヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 7,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_MUKEINO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("無形の矢"),
		CArrowDataMaker.ArrowKana("０１６ムケイノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 8,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_ZOKUSE_ZIDO_YA_ATK30", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("属性自動(Atk30)"),
		CArrowDataMaker.ArrowKana("０１７ソクセイシトウノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SURUDOI_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("鋭い矢"),
		CArrowDataMaker.ArrowKana("０１８スルトイヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_CRI_PLUS, 20,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_CURSE_ARROW", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("カースアロー"),
		CArrowDataMaker.ArrowKana("０１９カアスアロオ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText("低確率で対象を呪い状態にする"),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SILENCE_ARROW", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("サイレンスアロー"),
		CArrowDataMaker.ArrowKana("０２０サイレンスアロオ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText("低確率で対象を沈黙状態にする"),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SLEEP_ARROW", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("スリープアロー"),
		CArrowDataMaker.ArrowKana("０２１スリイフアロオ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText("低確率で対象を睡眠状態にする"),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_FLASH_ARROW", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("フラッシュアロー"),
		CArrowDataMaker.ArrowKana("０２２フラツシユアロオ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText("低確率で対象を暗黒状態にする"),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_KORINO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("氷の矢"),
		CArrowDataMaker.ArrowKana("０２３コオリノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText("低確率で対象を氷化状態にする"),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 1,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_DOKUYA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("毒矢"),
		CArrowDataMaker.ArrowKana("０２４トクヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText("低確率で対象を毒状態にする"),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 5,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_ATK1NO_YA", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("Atk1の矢"),
		CArrowDataMaker.ArrowKana("０２５アタツク１ノヤ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_ARROW),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 1,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("バレット"),
		CArrowDataMaker.ArrowKana("１０１ハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 25,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_BLOOD_BULLET_C", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("ブラッドバレットC"),
		CArrowDataMaker.ArrowKana("１０２フラツトハレツトシイ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 30,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_AP_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("APバレット"),
		CArrowDataMaker.ArrowKana("１０３エイヒイハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_ELEMENTAL, 0,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_ICE_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("アイスバレット"),
		CArrowDataMaker.ArrowKana("１０４アイスハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 20,
		ITEM_SP_ELEMENTAL, 1,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_FREEZING_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("フリージングバレット"),
		CArrowDataMaker.ArrowKana("１０５フリイシンクハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 40,
		ITEM_SP_ELEMENTAL, 1,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_MAGICAL_STONE_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("マジカルストーンバレット"),
		CArrowDataMaker.ArrowKana("１０６マシカルストオンハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 40,
		ITEM_SP_ELEMENTAL, 2,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_FLARE_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("フレアバレット"),
		CArrowDataMaker.ArrowKana("１０７フレアハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 20,
		ITEM_SP_ELEMENTAL, 3,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_BLAZE_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("ブレイズバレット"),
		CArrowDataMaker.ArrowKana("１０８フレイスハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 40,
		ITEM_SP_ELEMENTAL, 3,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_LIGHTNING_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("ライトニングバレット"),
		CArrowDataMaker.ArrowKana("１０９ライトニンクハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 20,
		ITEM_SP_ELEMENTAL, 4,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_ELECTRIC_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("エレクトリックバレット"),
		CArrowDataMaker.ArrowKana("１１０エレクトリツクハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 40,
		ITEM_SP_ELEMENTAL, 4,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_POISON_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("ポイズンバレット"),
		CArrowDataMaker.ArrowKana("１１１ホイスンハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 20,
		ITEM_SP_ELEMENTAL, 5,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SILVER_BULLET_C", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("シルバーバレットC"),
		CArrowDataMaker.ArrowKana("１１２シルハアハレツトシイ"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 15,
		ITEM_SP_ELEMENTAL, 6,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_SUNCTFIED_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("サンクタファイドバレット"),
		CArrowDataMaker.ArrowKana("１１３サンクタフアイトハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 40,
		ITEM_SP_ELEMENTAL, 6,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



	CArrowDataMaker.RegisterId("ARROW_ID_BLIND_BULLET", arrowId);
	arrowData = [
		arrowId,
		CArrowDataMaker.ArrowName("ブラインドバレット"),
		CArrowDataMaker.ArrowKana("１１４フライントハレツト"),
		CArrowDataMaker.ArrowKind(ARROW_KIND_BULLET),
		CArrowDataMaker.ArrowDetailText(""),
		ITEM_SP_ATK_PLUS, 20,
		ITEM_SP_ELEMENTAL, 7,
		ITEM_SP_END
	];
	ArrowOBJNew[arrowId] = arrowData;
	arrowId++;



};




// データ上書き
if (_DATA_CREATE_MODE) {
	CArrowDataMaker.OverrideData();
}

