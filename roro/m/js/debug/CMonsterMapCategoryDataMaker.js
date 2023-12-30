
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();





/**
 * モンスターマップカテゴリクラス.
 */
function CMonsterMapCategoryData () {

	/** ＩＤ. */
	this.id = 0;

	/** 種類. */
	this.kind = 0;

	/** 名称カナ配列. */
	this.nameKanaArray = [];

	/** データ配列. */
	this.dataArray = [];



	/**
	 * ＩＤを設定する.
	 * @param value 値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetId = function (value) {
		this.id = value;
		return this;
	};

	/**
	 * 種類を設定する.
	 * @param value 値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetKind = function (value) {
		this.kind = value;
		return this;
	};

	/**
	 * 名称カナを追加する.
	 * @param value 値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.AddNameKana = function (value) {
		this.nameKanaArray.push(value);
		return this;
	};

	/**
	 * カテゴリ配下のマップを設定する.
	 * @param value 値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMaps = function (value) {
		this.dataArray = value;
		return this;
	};



	/**
	 * datデータに変換する.
	 * @param bCreateSortCode ソートコード生成フラグ
	 * @return datデータ
	 */
	this.ToDat = function (bCreateSortCode) {

		var idx = 0;

		var subArray = null;
		var dat = null;



		// 結果用配列を用意
		dat = [];

		// 各データを配列に変換
		dat.push(this.id);
		dat.push(this.kind);

		subArray = [];
		for (idx = 0; idx < this.nameKanaArray.length; idx++) {
			subArray.push(this.nameKanaArray[idx].ToDat(bCreateSortCode));
		}
		dat.push(subArray);

		dat.push(this.dataArray);



		return dat;
	};
}



/**
 * モンスターマップカテゴリデータ作成クラス.
 */
function CMonsterMapCategoryDataMaker () {

}

/**
 * IDを定数登録する.
 * @param defName 定数名
 * @param desiredValue 希望する値
 * @return 引数に渡された定数値
 */
CMonsterMapCategoryDataMaker.RegisterId = function (defName, desiredValue) {

	var defValue = -1;

	// 希望する値が指定されている場合
	if (desiredValue !== undefined) {
		if (desiredValue >= 0) {
			defValue = desiredValue;
		}
	}

	// 指定されていない場合
	if (defValue < 0) {

		// 列挙オブジェクトが定義されていれば、その個数を次のIDとする
		if ((typeof EnumMonsterMapCategoryId) != (typeof undefined)) {
			defValue = EnumMonsterMapCategoryId.Count;
		}

		// そうでなければ、0 を採用する
		else {
			defValue = 0;
		}
	}



	// すでに同じ定数が登録されている場合、同じ値ならばそのまま返す
	if ((typeof EnumMonsterMapCategoryId) != (typeof undefined)) {
		if (EnumMonsterMapCategoryId.GetDefinedValue(defName) !== undefined) {
			return EnumMonsterMapCategoryId.GetDefinedValue(defName);
		}
	}

	// そうでなければ、登録して返す
	CGlobalConstManager.DefineEnum("EnumMonsterMapCategoryId", [defName], defValue, 0);

	return defValue;
};

/**
 * データ定義を上書き定義する.
 */
CMonsterMapCategoryDataMaker.OverrideData = function () {

	var idx = 0;

	var dataId = 0;
	var dataArray = null;
	var dataDat = null;



	dataArray = [];
	dataDat = [];



	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ALL");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("全地域", "ア"))
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("メモリアルダンジョン", "アア"))
	;



	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_PRONTERA_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("プロンテラ周辺", "プロンテラシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_PRONTERA_FIELD_00,
			MONSTER_MAP_ID_PRONTERA_FIELD_01,
			MONSTER_MAP_ID_PRONTERA_FIELD_02,
			MONSTER_MAP_ID_PRONTERA_FIELD_03,
			MONSTER_MAP_ID_PRONTERA_FIELD_04,
			MONSTER_MAP_ID_PRONTERA_FIELD_05,
			MONSTER_MAP_ID_PRONTERA_FIELD_06,
			MONSTER_MAP_ID_PRONTERA_FIELD_07,
			MONSTER_MAP_ID_PRONTERA_FIELD_08,
			MONSTER_MAP_ID_PRONTERA_FIELD_09,
			MONSTER_MAP_ID_PRONTERA_FIELD_10,
			MONSTER_MAP_ID_PRONTERA_FIELD_11,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_PRONTERA_CHIKA_SUIRO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("プロンテラ地下水路", "プロンテラチカスイロ"))
		.SetMaps([
			MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B1F,
			MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B2F,
			MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B3F,
			MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B4F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MEIKYUNO_MORI");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("迷宮の森", "メイキュウノモリ"))
		.SetMaps([
			MONSTER_MAP_ID_MEIKYUNO_MORI_01,
			MONSTER_MAP_ID_MEIKYUNO_MORI_02,
			MONSTER_MAP_ID_MEIKYUNO_MORI_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_IZLUDE_KAITEI_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("イズルード海底洞窟", "イズルードカイテイドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_1F,
			MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_2F,
			MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_3F,
			MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_4F,
			MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_5F,
			MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_6F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MOROCC_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("モロク周辺", "モロクシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_SOGRATO_SABAKU_01,
			MONSTER_MAP_ID_SOGRATO_SABAKU_02,
			MONSTER_MAP_ID_SOGRATO_SABAKU_03,
			MONSTER_MAP_ID_SOGRATO_SABAKU_07,
			MONSTER_MAP_ID_SOGRATO_SABAKU_11,
			MONSTER_MAP_ID_SOGRATO_SABAKU_12,
			MONSTER_MAP_ID_SOGRATO_SABAKU_13,
			MONSTER_MAP_ID_SOGRATO_SABAKU_16,
			MONSTER_MAP_ID_SOGRATO_SABAKU_17,
			MONSTER_MAP_ID_SOGRATO_SABAKU_18,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_PYRAMID_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ピラミッドダンジョン", "ピラミッドダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_PYRAMID_DUNGEON_1F,
			MONSTER_MAP_ID_PYRAMID_DUNGEON_2F,
			MONSTER_MAP_ID_PYRAMID_DUNGEON_3F,
			MONSTER_MAP_ID_PYRAMID_DUNGEON_4F,
			MONSTER_MAP_ID_PYRAMID_DUNGEON_B2F,
			MONSTER_MAP_ID_PYRAMID_DUNGEON_B3F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_SPHINX_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("スフィンクスダンジョン", "スフィンクスダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_SPHINX_DUNGEON_B1F,
			MONSTER_MAP_ID_SPHINX_DUNGEON_B2F,
			MONSTER_MAP_ID_SPHINX_DUNGEON_B3F,
			MONSTER_MAP_ID_SPHINX_DUNGEON_B4F,
			MONSTER_MAP_ID_SPHINX_DUNGEON_B5F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ARI_ZIGOKU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("蟻地獄ダンジョン", "アリジゴクダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_ARI_ZIGOKU_DUNGEON_B1F,
			MONSTER_MAP_ID_ARI_ZIGOKU_DUNGEON_B2F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GEFFEN_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ゲフェン周辺", "ゲフェンシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_GEFFEN_FIELD_00,
			MONSTER_MAP_ID_GEFFEN_FIELD_01,
			MONSTER_MAP_ID_GEFFEN_FIELD_02,
			MONSTER_MAP_ID_GEFFEN_FIELD_03,
			MONSTER_MAP_ID_GEFFEN_FIELD_04,
			MONSTER_MAP_ID_GEFFEN_FIELD_05,
			MONSTER_MAP_ID_GEFFEN_FIELD_06,
			MONSTER_MAP_ID_GEFFEN_FIELD_07,
			MONSTER_MAP_ID_GEFFEN_FIELD_08,
			MONSTER_MAP_ID_GEFFEN_FIELD_09,
			MONSTER_MAP_ID_GEFFEN_FIELD_10,
			MONSTER_MAP_ID_GEFFEN_FIELD_11,
			MONSTER_MAP_ID_GEFFEN_FIELD_13,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GEFFEN_CHIKA_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ゲフェン地下ダンジョン", "ゲフェンチカダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_GEFFEN_CHIKA_DUNGEON_B1F,
			MONSTER_MAP_ID_GEFFEN_CHIKA_DUNGEON_B2F,
			MONSTER_MAP_ID_GEFFEN_CHIKA_DUNGEON_B3F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GEFENIA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ゲフェニア", "ゲフェニア"))
		.SetMaps([
			MONSTER_MAP_ID_GEFENIA_01,
			MONSTER_MAP_ID_GEFENIA_02,
			MONSTER_MAP_ID_GEFENIA_03,
			MONSTER_MAP_ID_GEFENIA_04,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ORC_CHIKA_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("オーク地下洞窟", "オークチカドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_ORC_CHIKA_DOKUTSU_01,
			MONSTER_MAP_ID_ORC_CHIKA_DOKUTSU_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GLASTHEIM");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("グラストヘイム", "グラストヘイム"))
		.SetMaps([
			MONSTER_MAP_ID_GLASTHEIM_SHITSUNAI,
			MONSTER_MAP_ID_GLASTHEIM_KISHIDAN_01,
			MONSTER_MAP_ID_GLASTHEIM_KISHIDAN_02,
			MONSTER_MAP_ID_GLASTHEIM_KAIDAN,
			MONSTER_MAP_ID_GLASTHEIM_SHUDOIN,
			MONSTER_MAP_ID_GLASTHEIM_CATACUMBA,
			MONSTER_MAP_ID_GLASTHEIM_KOZYO,
			MONSTER_MAP_ID_GLASTHEIM_KOZYO_1F,
			MONSTER_MAP_ID_GLASTHEIM_KOZYO_2F,
			MONSTER_MAP_ID_GLASTHEIM_CHIKA_KANGOKU_00,
			MONSTER_MAP_ID_GLASTHEIM_CHIKA_KANGOKU_01,
			MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_01,
			MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_02,
			MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_03,
			MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_04,
			MONSTER_MAP_ID_GLASTHEIM_SAIKASO_01,
			MONSTER_MAP_ID_GLASTHEIM_SAIKASO_02,
			MONSTER_MAP_ID_GLASTHEIM_ABYSS,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_PAYON_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("フェイヨン周辺", "フェイヨンシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_01,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_02,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_03,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_04,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_06,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_07,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_08,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_09,
			MONSTER_MAP_ID_PAYON_MAYOINO_MORI_10,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_PAYON_CHIKA_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("フェイヨン地下洞窟", "フェイヨンチカドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B1F,
			MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B2F,
			MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B3F,
			MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B4F,
			MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B5F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_CHINBOTSUSEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("沈没船", "チンボツセン"))
		.SetMaps([
			MONSTER_MAP_ID_CHINBOTSUSEN_1F,
			MONSTER_MAP_ID_CHINBOTSUSEN_2F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MJOLNIR_SANMYAKU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ミョルニール山脈", "ミョルニールサンミャク"))
		.SetMaps([
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_01,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_02,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_03,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_04,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_05,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_06,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_07,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_08,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_09,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_10,
			MONSTER_MAP_ID_MJOLNIR_SANMYAKU_11,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MJOLNIR_HAIKO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ミョルニール廃坑", "ミョルニールハイコウ"))
		.SetMaps([
			MONSTER_MAP_ID_MJOLNIR_HAIKO_B1F,
			MONSTER_MAP_ID_MJOLNIR_HAIKO_B2F,
			MONSTER_MAP_ID_MJOLNIR_HAIKO_B3F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ALDEBARAN_TOKEITO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アルデバラン時計塔", "アルデバラントケイトウ"))
		.SetMaps([
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_1F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_2F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_3F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_4F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B1F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B2F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B3F,
			MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B4F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_RUTIE_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ルティエ周辺", "ルティエシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_RUTIE_FIELD_01,
			MONSTER_MAP_ID_OMOCHA_KOZYO_DUNGEON_1F,
			MONSTER_MAP_ID_OMOCHA_KOZYO_DUNGEON_2F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_OMOCHA_KOZYO_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("おもちゃ工場ダンジョン", "オモチャコウジョウダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_OMOCHA_KOZYO_DUNGEON_1F,
			MONSTER_MAP_ID_OMOCHA_KOZYO_DUNGEON_2F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_COMODO_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("コモド周辺", "コモドシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_COMODO_FIELD_01,
			MONSTER_MAP_ID_COMODO_FIELD_02,
			MONSTER_MAP_ID_COMODO_FIELD_03,
			MONSTER_MAP_ID_COMODO_FIELD_04,
			MONSTER_MAP_ID_COMODO_FIELD_06,
			MONSTER_MAP_ID_COMODO_FIELD_07,
			MONSTER_MAP_ID_COMODO_FIELD_08,
			MONSTER_MAP_ID_COMODO_FIELD_09,
			MONSTER_MAP_ID_COMODO_DOKUTSU_NISHI,
			MONSTER_MAP_ID_COMODO_DOKUTSU_KITA,
			MONSTER_MAP_ID_COMODO_DOKUTSU_HIGASHI,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_UMBALA_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ウンバラ周辺", "ウンバラシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_UMBALA_FIELD_01,
			MONSTER_MAP_ID_UMBALA_FIELD_02,
			MONSTER_MAP_ID_UMBALA_FIELD_03,
			MONSTER_MAP_ID_UMBALA_FIELD_04,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_NIFLHEIM_SHUHEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ニブルヘイム周辺", "ニブルヘイムシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_NIFLHEIM_FIELD_01,
			MONSTER_MAP_ID_NIFLHEIM_FIELD_02,
			MONSTER_MAP_ID_SHISHANO_MACHI_NIFLHEIM,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GUILD_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ギルドダンジョン", "ギルドダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_GUILD_DUNGEON_PAYON,
			MONSTER_MAP_ID_GUILD_DUNGEON_ALDEBARAN,
			MONSTER_MAP_ID_GUILD_DUNGEON_PRONTERA,
			MONSTER_MAP_ID_GUILD_DUNGEON_GEFFEN,
			MONSTER_MAP_ID_GUILD_DUNGEON_YUNO,
			MONSTER_MAP_ID_GUILD_DUNGEON_RACHEL,
			MONSTER_MAP_ID_GUILD_DUNGEON_KOZYOSEN_TE,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_TURTLE_ISLAND");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("タートルアイランド", "タートルアイランド"))
		.SetMaps([
			MONSTER_MAP_ID_TURTLE_ISLAND_CHIZYO,
			MONSTER_MAP_ID_TURTLE_ISLAND_DUNGEON_01,
			MONSTER_MAP_ID_TURTLE_ISLAND_DUNGEON_02,
			MONSTER_MAP_ID_TURTLE_ISLAND_DUNGEON_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_AMATSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アマツ周辺", "アマツシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_AMATSU_FIELD_01,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_AMATSU_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アマツダンジョン", "アマツダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_AMATSU_DUNGEON_01,
			MONSTER_MAP_ID_AMATSU_DUNGEON_02,
			MONSTER_MAP_ID_AMATSU_DUNGEON_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GONRYUN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("コンロン周辺", "コンロンシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_GONRYUN_FIELD_01,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_GONRYUN_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("コンロンダンジョン", "コンロンダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_GONRYUN_DUNGEON_01,
			MONSTER_MAP_ID_GONRYUN_DUNGEON_02,
			MONSTER_MAP_ID_GONRYUN_DUNGEON_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_LOUYANG");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("龍之城周辺", "リュウノジョウシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_LOUYANG_FIELD_01,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_LOUYANG_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("龍之城ダンジョン", "リュウノジョウダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_LOUYANG_DUNGEON_01,
			MONSTER_MAP_ID_LOUYANG_DUNGEON_02,
			MONSTER_MAP_ID_LOUYANG_DUNGEON_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_AYOTHAYA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アユタヤ周辺", "アユタヤシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_AYOTHAYA_FIELD_01,
			MONSTER_MAP_ID_AYOTHAYA_FIELD_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_AYOTHAYA_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アユタヤダンジョン", "アユタヤダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_AYOTHAYA_DUNGEON_01,
			MONSTER_MAP_ID_AYOTHAYA_DUNGEON_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_YUNO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ジュノー周辺", "ジュノーシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_YUNO_FIELD_01,
			MONSTER_MAP_ID_YUNO_FIELD_02,
			MONSTER_MAP_ID_YUNO_FIELD_03,
			MONSTER_MAP_ID_YUNO_FIELD_04,
			MONSTER_MAP_ID_YUNO_FIELD_06,
			MONSTER_MAP_ID_YUNO_FIELD_07,
			MONSTER_MAP_ID_YUNO_FIELD_08,
			MONSTER_MAP_ID_YUNO_FIELD_09,
			MONSTER_MAP_ID_YUNO_FIELD_11,
			MONSTER_MAP_ID_YUNO_FIELD_12,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_NOGUE_ROAD");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ノーグロード", "ノーグロード"))
		.SetMaps([
			MONSTER_MAP_ID_NOGUE_ROAD_01,
			MONSTER_MAP_ID_NOGUE_ROAD_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_KIKAI_NINGYO_KOZYO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("機械人形工場", "キカイニンギョウコウジョウ"))
		.SetMaps([
			MONSTER_MAP_ID_KIKAI_NINGYO_KOZYO_B1F,
			MONSTER_MAP_ID_KIKAI_NINGYO_KOZYO_B2F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_EINBROCH");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アインブロック周辺", "アインブロックシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_EINBROCH_FIELD_03,
			MONSTER_MAP_ID_EINBROCH_FIELD_04,
			MONSTER_MAP_ID_EINBROCH_FIELD_05,
			MONSTER_MAP_ID_EINBROCH_FIELD_06,
			MONSTER_MAP_ID_EINBROCH_FIELD_07,
			MONSTER_MAP_ID_EINBROCH_FIELD_08,
			MONSTER_MAP_ID_EINBROCH_FIELD_09,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_KOZAN_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("鉱山ダンジョン", "コウザンダンジョン"))
		.AddNameKana(new CNameKana("アインブロック鉱山", "アインブロックコウザン"))
		.SetMaps([
			MONSTER_MAP_ID_KOZAN_DUNGEON_01,
			MONSTER_MAP_ID_KOZAN_DUNGEON_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_LIGHTHALZEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("リヒタルゼン周辺", "リヒタルゼンシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_LIGHTHALZEN_FIELD_01,
			MONSTER_MAP_ID_LIGHTHALZEN_FIELD_02,
			MONSTER_MAP_ID_LIGHTHALZEN_FIELD_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_SETAI_KOGAKU_KENKYUZYO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("生体工学研究所", "セイタイコウガクケンキュウジョ"))
		.SetMaps([
			MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_01,
			MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_02,
			MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_03,
			MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_04,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_JUPEROS_HAIKYO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ジュピロス廃墟", "ジュピロスハイキョ"))
		.AddNameKana(new CNameKana("ジュピロスダンジョン", "ジュピロスダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_JUPEROS_HAIKYO_01,
			MONSTER_MAP_ID_JUPEROS_HAIKYO_02,
			MONSTER_MAP_ID_JUPEROS_CHUSHINBU,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_HUGEL");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("フィゲル周辺", "フィゲルシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_HUGEL_FIELD_01,
			MONSTER_MAP_ID_HUGEL_FIELD_02,
			MONSTER_MAP_ID_HUGEL_FIELD_04,
			MONSTER_MAP_ID_HUGEL_FIELD_05,
			MONSTER_MAP_ID_HUGEL_FIELD_06,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ABYSS_LAKE_CHIKA_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("アビスレイク地下洞窟", "アビスレイクチカドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_01,
			MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_02,
			MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_THANATOS_TOWER");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("タナトスタワー", "タナトスタワー"))
		.SetMaps([
			MONSTER_MAP_ID_THANATOS_TOWER_01,
			MONSTER_MAP_ID_THANATOS_TOWER_02,
			MONSTER_MAP_ID_THANATOS_TOWER_03,
			MONSTER_MAP_ID_THANATOS_TOWER_04,
			MONSTER_MAP_ID_THANATOS_TOWER_05,
			MONSTER_MAP_ID_THANATOS_TOWER_06,
			MONSTER_MAP_ID_THANATOS_TOWER_07,
			MONSTER_MAP_ID_THANATOS_TOWER_08,
			MONSTER_MAP_ID_THANATOS_TOWER_09,
			MONSTER_MAP_ID_THANATOS_TOWER_10,
			MONSTER_MAP_ID_THANATOS_TOWER_11,
			MONSTER_MAP_ID_THANATOS_TOWER_12,
			MONSTER_MAP_ID_THANATOS_TOWER_13,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ODIN_SHINDEN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("オーディン神殿", "オーディンシンデン"))
		.SetMaps([
			MONSTER_MAP_ID_ODIN_SHINDEN_01,
			MONSTER_MAP_ID_ODIN_SHINDEN_02,
			MONSTER_MAP_ID_ODIN_SHINDEN_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_RACHEL");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ラヘル周辺", "ラヘルシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_RACHEL_FIELD_01,
			MONSTER_MAP_ID_RACHEL_FIELD_03,
			MONSTER_MAP_ID_RACHEL_FIELD_04,
			MONSTER_MAP_ID_RACHEL_FIELD_05,
			MONSTER_MAP_ID_RACHEL_FIELD_06,
			MONSTER_MAP_ID_RACHEL_FIELD_08,
			MONSTER_MAP_ID_RACHEL_FIELD_10,
			MONSTER_MAP_ID_RACHEL_FIELD_11,
			MONSTER_MAP_ID_RACHEL_FIELD_12,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_FREYA_DAISHINDEN_SEIKI");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("フレイヤ大神殿　聖域", "フレイヤダイシンデン　セイイキ"))
		.SetMaps([
			MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_01,
			MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_02,
			MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_03,
			MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_04,
			MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_05,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_KORINO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("氷の洞窟", "コオリノドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_KORINO_DOKUTSU_01,
			MONSTER_MAP_ID_KORINO_DOKUTSU_02,
			MONSTER_MAP_ID_KORINO_DOKUTSU_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_VEINS");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ベインス周辺", "ベインスシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_VEINS_FIELD_01,
			MONSTER_MAP_ID_VEINS_FIELD_02,
			MONSTER_MAP_ID_VEINS_FIELD_03,
			MONSTER_MAP_ID_VEINS_FIELD_04,
			MONSTER_MAP_ID_VEINS_FIELD_06,
			MONSTER_MAP_ID_VEINS_FIELD_07,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_THOR_KAZAN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("トール火山", "トールカザン"))
		.SetMaps([
			MONSTER_MAP_ID_THOR_KAZAN_01,
			MONSTER_MAP_ID_THOR_KAZAN_02,
			MONSTER_MAP_ID_THOR_KAZAN_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_NAMONAKI_SHIMA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("名もなき島", "ナモナキシマ"))
		.SetMaps([
			MONSTER_MAP_ID_NAMONAKI_SHIMA_YORU,
			MONSTER_MAP_ID_NAMONAKI_SHIMA_SHUDOIN_01,
			MONSTER_MAP_ID_NAMONAKI_SHIMA_SHUDOIN_02,
			MONSTER_MAP_ID_NAMONAKI_SHIMA_SHUDOIN_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MOSCOVIA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("モスコビア周辺", "モスコビアシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_MOSCOVIA_FIELD_00,
			MONSTER_MAP_ID_MOSCOVIA_FIELD_01,
			MONSTER_MAP_ID_MOSCOVIA_FIELD_02,
			MONSTER_MAP_ID_MOSCOVIA_FIELD_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ZIGENNO_HAZAMA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("次元の狭間", "ジゲンノハザマ"))
		.SetMaps([
			MONSTER_MAP_ID_ZIGENNO_HAZAMA_01,
			MONSTER_MAP_ID_ZIGENNO_HAZAMA_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ENDLESS_TOWER");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("エンドレスタワー", "エンドレスタワー"))
		.SetMaps([
			MONSTER_MAP_ID_ENDLESS_TOWER,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_SPLENDIDE");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("スプレンディッド周辺", "スプレンディッドシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_SPLENDIDE_FIELD_01,
			MONSTER_MAP_ID_SPLENDIDE_FIELD_02,
			MONSTER_MAP_ID_SPLENDIDE_FIELD_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MANUK");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("マヌク周辺", "マヌクシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_MANUK_FIELD_01,
			MONSTER_MAP_ID_MANUK_FIELD_02,
			MONSTER_MAP_ID_MANUK_FIELD_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_CAMIDAL_CHIHO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("カミダル地方", "カミダルチホウ"))
		.SetMaps([
			MONSTER_MAP_ID_CAMIDAL_TUNNEL,
			MONSTER_MAP_ID_CAMIDAL_SANROKU_01,
			MONSTER_MAP_ID_CAMIDAL_SANROKU_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_YGGDRASSIL_CHUSHINBU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("イグドラシル中心部", "イグドラシルチュウシンブ"))
		.SetMaps([
			MONSTER_MAP_ID_YGGDRASSIL_CHUSHINBU,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_BRASILIS");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ブラジリス周辺", "ブラジリスシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_BRASILIS_FIELD_01,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_TAKINO_NAKANO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("滝の中の洞窟", "タキノナカノドウクツ"))
		.AddNameKana(new CNameKana("ブラジリスダンジョン", "ブラジリスダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_TAKINO_NAKANO_DOKUTSU_01,
			MONSTER_MAP_ID_TAKINO_NAKANO_DOKUTSU_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_SCARAB");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("スカラバ", "スカラバ"))
		.SetMaps([
			MONSTER_MAP_ID_SCARAB_HALL,
			MONSTER_MAP_ID_SCARAB_GARDEN,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_DEWATA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("デワタ周辺", "デワタシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_DEWATA_FIELD_01,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_KURATOKA_KAZAN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("クラトカ火山", "クラトカカザン"))
		.SetMaps([
			MONSTER_MAP_ID_KURATOKA_KAZAN,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ISTANA_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("イスタナ洞窟", "イスタナドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_ISTANA_DOKUTSU,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_BIFROST");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ビフロスト周辺", "ビフロストシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_BIFROST_NANBU,
			MONSTER_MAP_ID_BIFROST_HOKUBU,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MALANG_TO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("マラン島周辺", "マラントウシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_HOSHIAKARINO_SANGOSHO,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_PORT_MALAYA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ポートマラヤ周辺", "ポートマラヤシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_BARRIO_MAHIWAGA,
			MONSTER_MAP_ID_BARRIO_FOREST,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_BUWAYANO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ブワヤの洞窟", "ブワヤノドウクツ"))
		.SetMaps([
			MONSTER_MAP_ID_BUWAYANO_DOKUTSU,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_BYONGUNGO_BYOIN");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ビョンウンゴ病院", "ビョンウンゴビョウイン"))
		.SetMaps([
			MONSTER_MAP_ID_BYONGUNGO_BYOIN_1F,
			MONSTER_MAP_ID_BYONGUNGO_BYOIN_2F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ECLAGE");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("エクラージュ周辺", "エクラージュシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_HANAGA_SAKIHAZIMETA_DAICHI,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_BIFROST_TOWER");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ビフロストタワー", "ビフロストタワー"))
		.SetMaps([
			MONSTER_MAP_ID_BIFROST_TOWER_1F,
			MONSTER_MAP_ID_BIFROST_TOWER_2F,
			MONSTER_MAP_ID_BIFROST_TOWER_3F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_NEZIRETA_ZIKANNO_TOKEITO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("捻じれた時間の時計塔", "ネジレタジカンノトケイトウ"))
		.AddNameKana(new CNameKana("時計塔ナイトメア", "トケイトウナイトメア"))
		.SetMaps([
			MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_1F,
			MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_2F,
			MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_3F,
			MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_4F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_VERUS");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ウェルス周辺", "ウェルスシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_JUPEROS_HIGASHIGAWA,
			MONSTER_MAP_ID_VERUS_GAIKAKU_TUNNEL,
			MONSTER_MAP_ID_VERUS_CHUO_HIROBA,
			MONSTER_MAP_ID_VERUS_KENKYUTO_WISH,
			MONSTER_MAP_ID_VERUS_ZIKKENTO_OPTATIO,
			MONSTER_MAP_ID_VERUS_CHIKA_SHELLTER,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_HIMITSUNO_CHIKASHITSU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("秘密の地下室", "ヒミツノチカシツ"))
		.AddNameKana(new CNameKana("ピラミッドナイトメア", "ピラミッドナイトメア"))
		.SetMaps([
			MONSTER_MAP_ID_HIMITSUNO_CHIKASHITSU_01,
			MONSTER_MAP_ID_HIMITSUNO_CHIKASHITSU_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_SHINENNO_KAIRO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("深淵の回廊", "シンエンノカイロウ"))
		.AddNameKana(new CNameKana("プロンテラ深淵", "プロンテラシンエン"))
		.SetMaps([
			MONSTER_MAP_ID_SHINENNO_KAIRO_TEIEN,
			MONSTER_MAP_ID_SHINENNO_KAIRO_SAISHIZYO,
			MONSTER_MAP_ID_SHINENNO_KAIRO_KAIRO,
			MONSTER_MAP_ID_SHINENNO_KAIRO_KYU_SHIGAICHI,
			MONSTER_MAP_ID_SHINENNO_KAIRO_HYOSO_TEIEN,
			MONSTER_MAP_ID_SHINENNO_KAIRO_HYOSO_KAIRO,
			MONSTER_MAP_ID_SHINENNO_KAIRO_SHINRIN,
			MONSTER_MAP_ID_SHINENNO_KAIRO_KEKOKU,
			MONSTER_MAP_ID_SHINENNO_KAIRO_SOGEN,
			MONSTER_MAP_ID_SHINENNO_KAIRO_DOKUTSU,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ROCKRIDGE");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ロックリッジ周辺", "ロックリッジシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_KIWAWA_SABAKU_01,
			MONSTER_MAP_ID_KIWAWA_SABAKU_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_LASAGNA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ラザーニャ周辺", "ラザーニャシュウヘン"))
		.SetMaps([
			MONSTER_MAP_ID_RABIOL_HEIGEN_01,
			MONSTER_MAP_ID_RABIOL_MORI_01,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_RYUNO_SU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("龍の巣", "リュウノス"))
		.SetMaps([
			MONSTER_MAP_ID_RYUNO_SU_01,
			MONSTER_MAP_ID_RYUNO_SU_02,
			MONSTER_MAP_ID_RYUNO_SU_03,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_ILLUSION_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("イリュージョンダンジョン", "イリュージョンダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_ILLUSION_OF_MOONLIGHT,
			MONSTER_MAP_ID_ILLUSION_OF_FROZEN,
			MONSTER_MAP_ID_ILLUSION_OF_VAMPIRE,
			MONSTER_MAP_ID_ILLUSION_OF_KUYOKYU_01,
			MONSTER_MAP_ID_ILLUSION_OF_KUYOKYU_02,
			MONSTER_MAP_ID_ILLUSION_OF_TEDDY_BEAR,
			MONSTER_MAP_ID_ILLUSION_OF_RWANDA,
			MONSTER_MAP_ID_ILLUSION_OF_LABYRINTH,
			MONSTER_MAP_ID_ILLUSION_OF_UNDER_WATER_ZYOSO,
			MONSTER_MAP_ID_ILLUSION_OF_UNDER_WATER_KASO,
			MONSTER_MAP_ID_ILLUSION_OF_TWINS,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_HAIKIZYO_RUDUS");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("廃棄場ルドゥス", "ハイキジョウルドゥス"))
		.SetMaps([
			MONSTER_MAP_ID_HAIKIZYO_RUDUS_1F,
			MONSTER_MAP_ID_HAIKIZYO_RUDUS_2F,
			MONSTER_MAP_ID_HAIKIZYO_RUDUS_3F,
			MONSTER_MAP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_BALMUNT_TE");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("バルムント邸", "バルムントテイ"))
		.SetMaps([
			MONSTER_MAP_ID_BALMUNT_TE_GESUI_SHORIZYO,
			MONSTER_MAP_ID_BALMUNT_TE_DAI1_MARYOKU_HATSUDENSHO,
			MONSTER_MAP_ID_BALMUNT_TE_TEIEN,
			MONSTER_MAP_ID_BALMUNT_TE_TOSHOKAN_KIOKUNO_KAIRO,
			MONSTER_MAP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO,
			MONSTER_MAP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS,
			MONSTER_MAP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_TERROR_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("テラーダンジョン", "テラーダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_NOGUE_ROAD_03,
			MONSTER_MAP_ID_GLASTHEIM_ABYSS,
			MONSTER_MAP_ID_KOZAN_DUNGEON_03,
			MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04,
			MONSTER_MAP_ID_INISHIENO_ODIN_SHINDEN,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_NIFLHEIM_DUNGEON");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("ニブルヘイムダンジョン", "ニブルヘイムダンジョン"))
		.SetMaps([
			MONSTER_MAP_ID_NIFLHEIM_DUNGEON_MOZYANO_ENKAIZYO,
			MONSTER_MAP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_HAIIRO_OKAMINO_MORI");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("灰色狼の森", "ハイイロオオカミノモリ"))
		.SetMaps([
			MONSTER_MAP_ID_HAIIRO_OKAMINO_MORI_01,
			MONSTER_MAP_ID_HAIIRO_OKAMINO_MORI_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_OZNO_MEIRO");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("オズの迷路", "オズノメイロ"))
		.SetMaps([
			MONSTER_MAP_ID_OZNO_MEIRO_01,
			MONSTER_MAP_ID_OZNO_MEIRO_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_HAIKI_ZIKKENZYO_AMISITIA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("廃棄実験所アミシティア", "ハイキジッケンジョアミシティア"))
		.SetMaps([
			MONSTER_MAP_ID_HAIKI_ZIKKENZYO_AMISITIA_01,
			MONSTER_MAP_ID_HAIKI_ZIKKENZYO_AMISITIA_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_CATEGORY_MUGENNO_MEIKYU");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("夢幻の迷宮", "ムゲンノメイキュウ"))
		.SetMaps([
			MONSTER_MAP_ID_MUGENNO_MEIKYU_ZENIKI,
			MONSTER_MAP_ID_MUGENNO_MEIKYU_01_SHIREN,
			MONSTER_MAP_ID_MUGENNO_MEIKYU_02_FUIN,
			MONSTER_MAP_ID_MUGENNO_MEIKYU_03_IGYO,
			MONSTER_MAP_ID_MUGENNO_MEIKYU_11_GENEI_SHIREN,
			MONSTER_MAP_ID_MUGENNO_MEIKYU_12_GENEI_GENEI,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_ISGARD_FIELD");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("イスガルドフィールド", "イスガルドフィールド"))
		.SetMaps([
			MONSTER_MAP_ID_ITETSUITA_UROKONO_OKA,
			MONSTER_MAP_ID_ITETSUITA_SHIPPO,
			MONSTER_MAP_ID_ITETSUITA_UROKONO_HEIGEN,
			MONSTER_MAP_ID_ITETSUITA_UROKONO_HYOGA,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_SUTERARETA_ANA");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("捨てられた穴", "ステラレタアナ"))
		.SetMaps([
			MONSTER_MAP_ID_SUTERARETA_ANA_01,
			MONSTER_MAP_ID_SUTERARETA_ANA_02,
		])
	;

	dataId = CMonsterMapCategoryDataMaker.RegisterId("MONSTER_MAP_ID_HEBIGAMINO_NUKUMORI");
	dataArray[dataId] = new CMonsterMapCategoryData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_CATEGORY)
		.AddNameKana(new CNameKana("蛇神の温もり", "ヘビガミノヌクモリ"))
		.SetMaps([
			MONSTER_MAP_ID_HEBIGAMINO_NUKUMORI_01,
			MONSTER_MAP_ID_HEBIGAMINO_NUKUMORI_02,
		])
	;




















	// 各データをdatデータに変換する
	for (idx = 0; idx < dataArray.length; idx++) {
		dataDat.push(dataArray[idx].ToDat(true));
	}



	// 定義済みデータ配列を上書き
	g_MonsterMapCategoryDataArray = dataDat;

};





// データ上書き
if (_DATA_CREATE_MODE) {
	CMonsterMapCategoryDataMaker.OverrideData();
}
