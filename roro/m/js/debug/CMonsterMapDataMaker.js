
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();





/**
 * モンスターマップクラス.
 */
function CMonsterMapData () {

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
	 * @param name 名称
	 * @param kana 読み仮名
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.AddNameKana = function (name, kana) {
		this.nameKanaArray.push(new CNameKana(name, kana));
		return this;
	};

	/**
	 * モンスターを設定する.
	 * @param value 値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMonsters = function (value) {
		this.dataArray = value;
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
 * モンスターマップデータ作成クラス.
 */
function CMonsterMapDataMaker () {

}

/**
 * IDを定数登録する.
 * @param defName 定数名
 * @param desiredValue 希望する値
 * @return 引数に渡された定数値
 */
CMonsterMapDataMaker.RegisterId = function (defName, desiredValue) {

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
		if ((typeof EnumMonsterMapId) != (typeof undefined)) {
			defValue = EnumMonsterMapId.Count;
		}

		// そうでなければ、0 を採用する
		else {
			defValue = 0;
		}
	}

	// 登録して返す
	CGlobalConstManager.DefineEnum("EnumMonsterMapId", [defName], defValue, 0);

	return defValue;
};

/**
 * データ定義を上書き定義する.
 */
CMonsterMapDataMaker.OverrideData = function () {

	var idx = 0;

	var dataId = 0;
	var dataArray = null;
	var dataDat = null;



	dataArray = [];
	dataDat = [];



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MAP_ALL");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("全マップ", "ア")
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MVP_MONSTER");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("MVPモンスター", "ンンン")
		.AddNameKana("MVPモンスター", "ＭＶＰモンスター")
		.SetMonsters([
			MONSTER_ID_WARYAPHA,
			MONSTER_ID_EDOGA,
			MONSTER_ID_OGONCHU,
			MONSTER_ID_ORCHERO,
			MONSTER_ID_ORCLORD,
			MONSTER_ID_OSIRIS,
			MONSTER_ID_ONRYOBUSHI,
			MONSTER_ID_KOKUDAO,
			MONSTER_ID_STORM_KNIGHT,
			MONSTER_ID_DARK_LORD,
			MONSTER_ID_TURTLE_GENERAL,
			MONSTER_ID_DOPPELGENGER,
			MONSTER_ID_DRAQRA,
			MONSTER_ID_DRAKE,
			MONSTER_ID_HATIE,
			MONSTER_ID_BAPHOMET,
			MONSTER_ID_PHARAO,
			MONSTER_ID_FURIONI,
			MONSTER_ID_MAYA,
			MONSTER_ID_MISTRESS,
			MONSTER_ID_LORDOF_DEATH,
			MONSTER_ID_AMONRAR,
			MONSTER_ID_TAOGUNKA,
			MONSTER_ID_RSX_0806,
			MONSTER_ID_IGNISEM_CENIA_MVP,
			MONSTER_ID_SEIREN_VINSER_MVP,
			MONSTER_ID_ELEMES_GAIL_MVP,
			MONSTER_ID_MARGARETTE_SORIN_MVP,
			MONSTER_ID_CECIL_DIMON_MVP,
			MONSTER_ID_CATHERINE_KEILON_MVP,
			MONSTER_ID_HAWARD_ALTIZEN_MVP,
			MONSTER_ID_VESPER,
			MONSTER_ID_PEKUSOZIN,
			MONSTER_ID_DATALZAURUS,
			MONSTER_ID_MAKENSHI_THANATOSNO_SHINENTAI,
			MONSTER_ID_LADYTANIE,
			MONSTER_ID_CHIEL_D01,
			MONSTER_ID_RANDGRIS,
			MONSTER_ID_ATLOS,
			MONSTER_ID_KTORURANUCUS,
			MONSTER_ID_GROOM_UNDERNIGHT,
			MONSTER_ID_EFRITE,
			MONSTER_ID_OCHITA_DAISHINKAN_HIBAMU,
			MONSTER_ID_VERSEBB,
			MONSTER_ID_GOPINIK,
			MONSTER_ID_MAO_MOROC,
			MONSTER_ID_KIZUTSUITA_MAO_MOROC,
			MONSTER_ID_NEEZHEGNO_KAGE,
			MONSTER_ID_BOITATA,
			MONSTER_ID_ZYOO_SUCARAB,
			MONSTER_ID_ZYOTE_SUCARAB,
			MONSTER_ID_REYAC,
			MONSTER_ID_NEEDZHEG,
			MONSTER_ID_KRAKEN,
			MONSTER_ID_RANDEL_RORENCE_MVP,
			MONSTER_ID_GARTY_UH_MVP,
			MONSTER_ID_CHENG_RIU_MVP,
			MONSTER_ID_ARFOSIO_BASIL_MVP,
			MONSTER_ID_TRENTINI_MVP,
			MONSTER_ID_CERIA_ARDE_MVP,
			MONSTER_ID_EMUR_PURAMEL_MVP,
			MONSTER_ID_AKUMUNO_BAPHOMET,
			MONSTER_ID_AMDARAIS,
			MONSTER_ID_SASOINO_MAGAN,
			MONSTER_ID_TIMEHOLDER,
			MONSTER_ID_T_W_O,
			MONSTER_ID_AMENHOTEP,
			MONSTER_ID_SATSURIKUNO_MAGAN,
			MONSTER_ID_MAGANNO_AMDARAIS,
			MONSTER_ID_SHUZIN_243AD265,
			MONSTER_ID_SHUZIN_267BD184,
			MONSTER_ID_SHUZIN_265CM154,
			MONSTER_ID_SHUZIN_95EB72,
			MONSTER_ID_SHUZIN_117FM188,
			MONSTER_ID_SHUZIN_103GD214,
			MONSTER_ID_SHUZIN_55HK115,
			MONSTER_ID_S_J_HORNEST_WOLF,
			MONSTER_ID_BIJOU,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_WISH_MASCOT,
			MONSTER_ID_ARTIS_MASCOT,
			MONSTER_ID_EABUL,
			MONSTER_ID_CUTIE,
			MONSTER_ID_VENOM_CHIMERA,
			MONSTER_ID_IKARINO_UORYAFA,
			MONSTER_ID_KAKUSEI_KUTORURANUCKS,
			MONSTER_ID_IKARINO_DRACULA,
			MONSTER_ID_BOMI,
			MONSTER_ID_FUKITSUNA_TURTLE_G,
			MONSTER_ID_KAGAYAKU_BEARDOLL,
			MONSTER_ID_INISHIENO_WOOTANG_GUARD,
			MONSTER_ID_INISHIENO_TAOGUNKA,
			MONSTER_ID_MUMEINO_SWORDMAN_KAIWA_MODE,
			MONSTER_ID_MUMEINO_SWORDMAN_SENTO_MODE_MVP,
			MONSTER_ID_R48_85_BESTIA,
			MONSTER_ID_EL_A17T,
			MONSTER_ID_MIGEL,
			MONSTER_ID_KONTONNO_BAPHOMET,
			MONSTER_ID_OSENSARETA_DARK_LORD,
			MONSTER_ID_OSENSARETA_BURINARANEA,
			MONSTER_ID_KOKA_MUSPERKOLE,
			MONSTER_ID_SEIREN_VINSER_GOKU_MVP,
			MONSTER_ID_CATHERINE_KEILON_GOKU_MVP,
			MONSTER_ID_CECIL_DIMON_GOKU_MVP,
			MONSTER_ID_MARGARETTE_SORIN_GOKU_MVP,
			MONSTER_ID_ELEMES_GAIL_GOKU_MVP,
			MONSTER_ID_HAWARD_ALTIZEN_GOKU_MVP,
			MONSTER_ID_RANDEL_RORENCE_GOKU_MVP,
			MONSTER_ID_CERIA_ARDE_GOKU_MVP,
			MONSTER_ID_ARFOSIO_BASIL_GOKU_MVP,
			MONSTER_ID_TRENTINI_GOKU_MVP,
			MONSTER_ID_CHENG_RIU_GOKU_MVP,
			MONSTER_ID_GARTY_UH_GOKU_MVP,
			MONSTER_ID_EMUR_PURAMEL_GOKU_MVP,
			MONSTER_ID_NOROIWO_NOMIKONDA_O,
			MONSTER_ID_OGONCHUNO_GENEI,
			MONSTER_ID_RED_PEPPER_KAPPA,
			MONSTER_ID_SILVA_PAPIRIA,
			MONSTER_ID_SWEETY,
			MONSTER_ID_BOSS_PITAYA,
			MONSTER_ID_ZYUSATSUNO_AMDARAIS,
			MONSTER_ID_ZYUSATSUNO_HIMERMEZ,
			MONSTER_ID_DARAKUNO_MAGAN,
			MONSTER_ID_SHINKAINO_KRAKEN,
			MONSTER_ID_MUGENNO_EDDGA,
			MONSTER_ID_MUGENNO_OSIRIS,
			MONSTER_ID_MUGENNO_FURIONI,
			MONSTER_ID_MUGENNO_OAK_HERO,
			MONSTER_ID_MUGENNO_TAO_GUNKA,
			MONSTER_ID_MUKUCHINA_MAYA,
			MONSTER_ID_JEWGOLY_ANT,
			MONSTER_ID_BONE_DATALZAURUS,
			MONSTER_ID_INGRID,
			MONSTER_ID_REGINREIF,
			MONSTER_ID_HASONSHITA_THANATOSNO_KIOKU,
			MONSTER_ID_R001_BESTIA,
			MONSTER_ID_SHINO_DAIMAZYO,
			MONSTER_ID_RED_PEPPER_LAMBDA,
			MONSTER_ID_ETAINO_SHIRENAI_SEMETAI,
			MONSTER_ID_HENI_CHIMERA_THE_ONE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_00");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド00", "プロンテラフィールド　００")
		.SetMonsters([
			MONSTER_ID_STAINER,
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド01", "プロンテラフィールド　０１")
		.SetMonsters([
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_TOCHU,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド02", "プロンテラフィールド　０２")
		.SetMonsters([
			MONSTER_ID_MANDRAGORA,
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_ECLIPSE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド03", "プロンテラフィールド　０３")
		.SetMonsters([
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_YOYO,
			MONSTER_ID_SMOKY,
			MONSTER_ID_POPORING,
			MONSTER_ID_CHOCO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド04", "プロンテラフィールド　０４")
		.SetMonsters([
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_ROCKER,
			MONSTER_ID_RODDAFROG,
			MONSTER_ID_VOCAL,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド05", "プロンテラフィールド　０５")
		.SetMonsters([
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_TOCHU,
			MONSTER_ID_TOCHUNO_TAMAGO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド06", "プロンテラフィールド　０６")
		.SetMonsters([
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_TOCHU,
			MONSTER_ID_TOCHUNO_TAMAGO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド07", "プロンテラフィールド　０７")
		.SetMonsters([
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド08", "プロンテラフィールド　０８")
		.SetMonsters([
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_DROPPS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド09", "プロンテラフィールド　０９")
		.SetMonsters([
			MONSTER_ID_CONDOR,
			MONSTER_ID_KO_DESSERT_WOLF,
			MONSTER_ID_SAVAGE_BEBE,
			MONSTER_ID_PEKOPEKONO_TAMAGO,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_10");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド10", "プロンテラフィールド　１０")
		.SetMonsters([
			MONSTER_ID_SAVAGE,
			MONSTER_ID_SAVAGE_BEBE,
			MONSTER_ID_KO_DESSERT_WOLF,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_FIELD_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラフィールド11", "プロンテラフィールド　１１")
		.SetMonsters([
			MONSTER_ID_SAVAGE,
			MONSTER_ID_SAVAGE_BEBE,
			MONSTER_ID_POPORING,
			MONSTER_ID_CREAMY,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラ地下水路B1F", "プロンテラチカスイロ　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_TOCHUNO_TAMAGO,
			MONSTER_ID_TOCHU,
			MONSTER_ID_FAMILIER,
			MONSTER_ID_TARO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラ地下水路B2F", "プロンテラチカスイロ　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_TOCHUNO_TAMAGO,
			MONSTER_ID_TOCHU,
			MONSTER_ID_FAMILIER,
			MONSTER_ID_TARO,
			MONSTER_ID_TOCHU_MESU,
			MONSTER_ID_SPORE,
			MONSTER_ID_PLANKTON,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラ地下水路B3F", "プロンテラチカスイロ　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_TOCHUNO_TAMAGO,
			MONSTER_ID_TOCHU,
			MONSTER_ID_TARO,
			MONSTER_ID_TOCHU_MESU,
			MONSTER_ID_POISON_SPORE,
			MONSTER_ID_HYDRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_CHIKA_SUIRO_B4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラ地下水路B4F", "プロンテラチカスイロ　チカ４カイ")
		.SetMonsters([
			MONSTER_ID_TOCHUNO_TAMAGO,
			MONSTER_ID_TOCHU,
			MONSTER_ID_TOCHU_MESU,
			MONSTER_ID_TOCHU_OSU,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_CLAMP,
			MONSTER_ID_OGONCHUNO_GENEI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MEIKYUNO_MORI_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("迷宮の森01", "メイキュウノモリ　０１")
		.SetMonsters([
			MONSTER_ID_ARGIOPE,
			MONSTER_ID_ARGOS,
			MONSTER_ID_BIGFOOT,
			MONSTER_ID_CARAMEL,
			MONSTER_ID_CHOCO,
			MONSTER_ID_CHONGCHONG,
			MONSTER_ID_CREAMY,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_FABLE,
			MONSTER_ID_HORN,
			MONSTER_ID_HUNTERFLY,
			MONSTER_ID_KOKO,
			MONSTER_ID_MANTICE,
			MONSTER_ID_MARTING,
			MONSTER_ID_POPORING,
			MONSTER_ID_PORING,
			MONSTER_ID_PUPA,
			MONSTER_ID_ROCKER,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_SASURAI_OKAMI,
			MONSTER_ID_SAVAGE,
			MONSTER_ID_SIDEWINDER,
			MONSTER_ID_SMOKY,
			MONSTER_ID_SNAKE,
			MONSTER_ID_STAINER,
			MONSTER_ID_STEAL_CHONGCHONG,
			MONSTER_ID_WOLF,
			MONSTER_ID_YOYO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MEIKYUNO_MORI_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("迷宮の森02", "メイキュウノモリ　０２")
		.SetMonsters([
			MONSTER_ID_POPORING,
			MONSTER_ID_BIGFOOT,
			MONSTER_ID_SUSCUCCHI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MEIKYUNO_MORI_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("迷宮の森03", "メイキュウノモリ　０３")
		.SetMonsters([
			MONSTER_ID_AMMUT,
			MONSTER_ID_ANCIENT_WARM,
			MONSTER_ID_ARCANGELING,
			MONSTER_ID_BAPHOMET,
			MONSTER_ID_BAPHOMET_JR,
			MONSTER_ID_CATAPIRER,
			MONSTER_ID_CREAMY_FEAR,
			MONSTER_ID_DEADLY_WRAITH,
			MONSTER_ID_DEVILING,
			MONSTER_ID_ECLIPSE,
			MONSTER_ID_ENGELING,
			MONSTER_ID_GAJOMART,
			MONSTER_ID_GENERAL_SKELTON,
			MONSTER_ID_GHOSTRING,
			MONSTER_ID_GIANT_HONET,
			MONSTER_ID_GIANT_SPIDER,
			MONSTER_ID_GRINBULLSTY,
			MONSTER_ID_HUNTERFLY,
			MONSTER_ID_KILLER_MANTICE,
			MONSTER_ID_MASTERING,
			MONSTER_ID_RAVEORMAI,
			MONSTER_ID_SASURAI_OKAMI,
			MONSTER_ID_VOCAL,
			MONSTER_ID_ZOMBIE_MASTER,

			// 以下、取り巻きデータ
			MONSTER_ID_DOKEBI,
			MONSTER_ID_ARGIOPE,
			MONSTER_ID_JESTER,
			MONSTER_ID_MISTCASE,
			MONSTER_ID_WILDROSE,
			MONSTER_ID_CHIRSTMASS_COOKIE,
			MONSTER_ID_CREAMY,
			MONSTER_ID_DEVILCH,
			MONSTER_ID_MARING,
			MONSTER_ID_RUNATIC,
			MONSTER_ID_POPORING,
			MONSTER_ID_SANTA_PORING,
			MONSTER_ID_HORON,
			MONSTER_ID_ARCHER_SKELETON,
			MONSTER_ID_SOLDIER_SKELTON,
			MONSTER_ID_KYODAI_WHISPER,
			MONSTER_ID_ARGOS,
			MONSTER_ID_SAVAGE,
			MONSTER_ID_MANTICE,
			MONSTER_ID_PORING,
			MONSTER_ID_DROPPS,
			MONSTER_ID_SUSCUCCHI,
			MONSTER_ID_WOLF,
			MONSTER_ID_ROCKER,
			MONSTER_ID_GHOUL,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イズルード海底洞窟1層", "イズルードカイテイドウクツ　１ソウ")
		.SetMonsters([
			MONSTER_ID_HYDRA,
			MONSTER_ID_PLANKTON,
			MONSTER_ID_MARINA,
			MONSTER_ID_VADON,
			MONSTER_ID_KUKRE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イズルード海底洞窟2層", "イズルードカイテイドウクツ　２ソウ")
		.SetMonsters([
			MONSTER_ID_VADON,
			MONSTER_ID_CORNUTUS,
			MONSTER_ID_MARSE,
			MONSTER_ID_HYDRA,
			MONSTER_ID_KUKRE,
			MONSTER_ID_OBEAUNE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イズルード海底洞窟3層", "イズルードカイテイドウクツ　３ソウ")
		.SetMonsters([
			MONSTER_ID_HANGYOZIN,
			MONSTER_ID_OBEAUNE,
			MONSTER_ID_CORNUTUS,
			MONSTER_ID_MARSE,
			MONSTER_ID_HYDRA,
			MONSTER_ID_KUKRE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イズルード海底洞窟4層", "イズルードカイテイドウクツ　４ソウ")
		.SetMonsters([
			MONSTER_ID_SWORDFISH,
			MONSTER_ID_MARC,
			MONSTER_ID_HANGYOZIN,
			MONSTER_ID_STROUF,
			MONSTER_ID_PHEN,
			MONSTER_ID_HYDRA,
			MONSTER_ID_MARIN_SPHERE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_5F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		// ソートの関係上、名称と読み仮名を入れ替え
		.AddNameKana("イズルード海底神殿（5層）", "イズルードカイテイドウクツ　５ソウ")
		.AddNameKana("イズルード海底洞窟5層", "イズルードカイテイシンデン")
		.SetMonsters([
			MONSTER_ID_OBEAUNE,
			MONSTER_ID_STROUF,
			MONSTER_ID_MARC,
			MONSTER_ID_MERMAN,
			MONSTER_ID_SIREN,
			MONSTER_ID_POSEIDON,
			MONSTER_ID_KRAKEN_BABY,
			MONSTER_ID_DEVIACE,
			MONSTER_ID_DOFLE,
			MONSTER_ID_SEDORA,
			MONSTER_ID_SROPHO,
			MONSTER_ID_KING_DRAMOH,
			MONSTER_ID_PENOMENA,

			// 以下、取り巻きデータ
			MONSTER_ID_HANGYOZIN,
			MONSTER_ID_MARSE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_IZLUDE_KAITEI_DOKUTSU_6F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		// ソートの関係上、名称と読み仮名を入れ替え
		.AddNameKana("イズルード海底都市（6層）", "イズルードカイテイドウクツ　６ソウ")
		.AddNameKana("イズルード海底洞窟6層", "イズルードカイテイトシ")
		.SetMonsters([
			MONSTER_ID_DOFLE,
			MONSTER_ID_SEDORA,
			MONSTER_ID_SROPHO,
			MONSTER_ID_KING_DRAMOH,
			MONSTER_ID_KRAKEN,
			MONSTER_ID_TENTACLES,
			MONSTER_ID_TAKN,
			MONSTER_ID_UNKER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠01", "ソグラトサバク　０１")
		.SetMonsters([
			MONSTER_ID_KO_DESSERT_WOLF,
			MONSTER_ID_PEKOPEKO,
			MONSTER_ID_DROPPS,
			MONSTER_ID_PEKOPEKONO_TAMAGO,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠02", "ソグラトサバク　０２")
		.SetMonsters([
			MONSTER_ID_PEKOPEKO,
			MONSTER_ID_DROPPS,
			MONSTER_ID_PEKOPEKONO_TAMAGO,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
			MONSTER_ID_SNAKE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠03", "ソグラトサバク　０３")
		.SetMonsters([
			MONSTER_ID_TENKA_TAISHOGUN,
			MONSTER_ID_WHIROW,
			MONSTER_ID_POPORING,
			MONSTER_ID_EGIRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠07", "ソグラトサバク　０７")
		.SetMonsters([
			MONSTER_ID_DROPPS,
			MONSTER_ID_PEKOPEKONO_TAMAGO,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠11", "ソグラトサバク　１１")
		.SetMonsters([
			MONSTER_ID_METARURA,
			MONSTER_ID_BYAKURENDAMA,
			MONSTER_ID_HODO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_12");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠12", "ソグラトサバク　１２")
		.SetMonsters([
			MONSTER_ID_DROPPS,
			MONSTER_ID_PEKOPEKONO_TAMAGO,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_13");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠13", "ソグラトサバク　１３")
		.SetMonsters([
			MONSTER_ID_ANAKONDAK,
			MONSTER_ID_SNAKE,
			MONSTER_ID_DROPPS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_16");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠16", "ソグラトサバク　１６")
		.SetMonsters([
			MONSTER_ID_SANDMAN,
			MONSTER_ID_BYAKURENDAMA,
			MONSTER_ID_HODO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_17");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠17", "ソグラトサバク　１７")
		.SetMonsters([
			MONSTER_ID_DESSERT_WOLF,
			MONSTER_ID_FRILLDRA,
			MONSTER_ID_HODO,
			MONSTER_ID_METARURA,
			MONSTER_ID_FURIONI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SOGRATO_SABAKU_18");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ソグラト砂漠18", "ソグラトサバク　１８")
		.SetMonsters([
			MONSTER_ID_MUCAR,
			MONSTER_ID_CHONGCHONG,
			MONSTER_ID_HODO,
			MONSTER_ID_METARURA,
			MONSTER_ID_DRAGONFLY,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PYRAMID_DUNGEON_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ピラミッドダンジョン1F", "ピラミッドダンジョン　１カイ")
		.SetMonsters([
			MONSTER_ID_ANAKONDAK,
			MONSTER_ID_SNAKE,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PYRAMID_DUNGEON_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ピラミッドダンジョン2F", "ピラミッドダンジョン　２カイ")
		.SetMonsters([
			MONSTER_ID_MUMMY,
			MONSTER_ID_ARCHER_SKELETON,
			MONSTER_ID_SOLDIER_SKELTON,
			MONSTER_ID_DRAINRIER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PYRAMID_DUNGEON_3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ピラミッドダンジョン3F", "ピラミッドダンジョン　３カイ")
		.SetMonsters([
			MONSTER_ID_BERIT,
			MONSTER_ID_ISIS,
			MONSTER_ID_MUMMY,
			MONSTER_ID_MARTER,
			MONSTER_ID_MIMIC,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PYRAMID_DUNGEON_4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ピラミッドダンジョン4F", "ピラミッドダンジョン　４カイ")
		.SetMonsters([
			MONSTER_ID_ANUBIS,
			MONSTER_ID_BANDID,
			MONSTER_ID_TARMARING,
			MONSTER_ID_TARBARING,
			MONSTER_ID_MARUDUKE,
			MONSTER_ID_ANCIENT_MUMMY,
			MONSTER_ID_OSIRIS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PYRAMID_DUNGEON_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ピラミッドダンジョンB2F", "ピラミッドダンジョン　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_MINOTAUR,
			MONSTER_ID_BERIT,
			MONSTER_ID_MARTER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PYRAMID_DUNGEON_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ピラミッドダンジョンB3F", "ピラミッドダンジョン　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_ANCIENT_MUMMY,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_DEATHWORD,
			MONSTER_ID_SIDEWINDER,
			MONSTER_ID_AMONRAR,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPHINX_DUNGEON_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スフィンクスダンジョンB1F", "スフィンクスダンジョン　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_ARGOS,
			MONSTER_ID_SCORPION,
			MONSTER_ID_DEMON_PANK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPHINX_DUNGEON_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スフィンクスダンジョンB2F", "スフィンクスダンジョン　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_ZEROM,
			MONSTER_ID_WHISPER,
			MONSTER_ID_IRONFIST,
			MONSTER_ID_MARTER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPHINX_DUNGEON_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スフィンクスダンジョンB3F", "スフィンクスダンジョン　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_REQUIEM,
			MONSTER_ID_MARUDUKE,
			MONSTER_ID_MARTER,
			MONSTER_ID_ZEROM,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPHINX_DUNGEON_B4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スフィンクスダンジョンB4F", "スフィンクスダンジョン　チカ４カイ")
		.SetMonsters([
			MONSTER_ID_PASANA,
			MONSTER_ID_MIMIC,
			MONSTER_ID_DARK_PRIEST,
			MONSTER_ID_BANDID,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPHINX_DUNGEON_B5F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スフィンクスダンジョンB5F", "スフィンクスダンジョン　チカ５カイ")
		.SetMonsters([
			MONSTER_ID_ANUBIS,
			MONSTER_ID_DARK_PRIEST,
			MONSTER_ID_BANDID,
			MONSTER_ID_WIND_GHOST,
			MONSTER_ID_PASANA,
			MONSTER_ID_PHARAO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ARI_ZIGOKU_DUNGEON_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("蟻地獄ダンジョンB1F", "アリジゴクダンジョン　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_ANDRE,
			MONSTER_ID_PIERE,
			MONSTER_ID_DENIRO,
			MONSTER_ID_BITATA,
			MONSTER_ID_ARINO_TAMAGO,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_MAYA_PURPLE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ARI_ZIGOKU_DUNGEON_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("蟻地獄ダンジョンB2F", "アリジゴクダンジョン　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_ZYOO_CHOKUZOKU_ANDRE,
			MONSTER_ID_ZYOO_CHOKUZOKU_PIERE,
			MONSTER_ID_ZYOO_CHOKUZOKU_DENIRO,
			MONSTER_ID_HEITAI_ANDRE,
			MONSTER_ID_HEITAI_DENIRO,
			MONSTER_ID_HEITAI_PIERE,
			MONSTER_ID_MASSKIPLER,
			MONSTER_ID_MAYA_PURPLE,
			MONSTER_ID_MAYA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_00");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド00", "ゲフェンフィールド　００")
		.SetMonsters([
			MONSTER_ID_PORING,
			MONSTER_ID_POPORING,
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド01", "ゲフェンフィールド　０１")
		.SetMonsters([
			MONSTER_ID_RODDAFROG,
			MONSTER_ID_UMBERKNIGHT,
			MONSTER_ID_POPORING,
			MONSTER_ID_TODO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド02（廃屋）", "ゲフェンフィールド　０２")
		.AddNameKana("廃屋", "ハイオク")
		.SetMonsters([
			MONSTER_ID_HIORC,
			MONSTER_ID_ORCARCHER,
			MONSTER_ID_ORCBABY,
			MONSTER_ID_ORCHERO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド03", "ゲフェンフィールド　０３")
		.SetMonsters([
			MONSTER_ID_ORCLADY,
			MONSTER_ID_ORCWARRIOR,
			MONSTER_ID_ORCBABY,
			MONSTER_ID_POPORING,
			MONSTER_ID_ORCLORD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド04", "ゲフェンフィールド　０４")
		.SetMonsters([
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_CHONGCHONG,
			MONSTER_ID_POPORING,
			MONSTER_ID_RODDAFROG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド05", "ゲフェンフィールド　０５")
		.SetMonsters([
			MONSTER_ID_WILDROSE,
			MONSTER_ID_GOBLIN_ARCHER,
			MONSTER_ID_KOBOLD_ARCHER,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_POPORING,
			MONSTER_ID_RODDAFROG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド06", "ゲフェンフィールド　０６")
		.SetMonsters([
			MONSTER_ID_SKY_PETIT,
			MONSTER_ID_GROUND_PETIT,
			MONSTER_ID_MANTICE,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド07", "ゲフェンフィールド　０７")
		.SetMonsters([
			MONSTER_ID_FABLE,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
			MONSTER_ID_CHONGCHONG,
			MONSTER_ID_PORING,
			MONSTER_ID_RODDAFROG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド08", "ゲフェンフィールド　０８")
		.SetMonsters([
			MONSTER_ID_AXE_KOBOLD,
			MONSTER_ID_HUMMER_KOBOLD,
			MONSTER_ID_MACE_KOBOLD,
			MONSTER_ID_KOBOLD_ARCHER,
			MONSTER_ID_KOBOLD_LEADER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド09", "ゲフェンフィールド　０９")
		.SetMonsters([
			MONSTER_ID_RODDAFROG,
			MONSTER_ID_UMBERKNIGHT,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_10");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド10（兄貴村）", "ゲフェンフィールド　１０")
		.AddNameKana("兄貴村", "アニキムラ")
		.SetMonsters([
			MONSTER_ID_ORCLADY,
			MONSTER_ID_ORCWARRIOR,
			MONSTER_ID_ORCBABY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド11（ゴブ森）", "ゲフェンフィールド　１１")
		.AddNameKana("ゴブ森", "ゴブモリ")
		.AddNameKana("ゴブリン村", "ゴブリンムラ")
		.SetMonsters([
			MONSTER_ID_GOBLIN_CHONAN,
			MONSTER_ID_GOBLIN_ZINAN,
			MONSTER_ID_GOBLIN_SANNAN,
			MONSTER_ID_GOBLIN_YONNAN,
			MONSTER_ID_GOBLIN_GONAN,
			MONSTER_ID_GOBLIN_ARCHER,
			MONSTER_ID_GOBLIN_LEADER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_FIELD_13");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェンフィールド13", "ゲフェンフィールド　１３")
		.SetMonsters([
			MONSTER_ID_CREAMY,
			MONSTER_ID_UMBERKNIGHT,
			MONSTER_ID_POPORING,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_CHIKA_DUNGEON_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェン地下ダンジョンB1F", "ゲフェンチカダンジョン　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_POISON_SPORE,
			MONSTER_ID_MANDRAGORA,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_CHIKA_DUNGEON_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェン地下ダンジョンB2F", "ゲフェンチカダンジョン　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_WHISPER,
			MONSTER_ID_JACK,
			MONSTER_ID_GHOUL,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_DRAQRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFFEN_CHIKA_DUNGEON_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェン地下ダンジョンB3F", "ゲフェンチカダンジョン　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_NIGHTMARE,
			MONSTER_ID_MARIONET,
			MONSTER_ID_DEVILCH,
			MONSTER_ID_DOPPELGENGER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFENIA_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェニア01（右下）", "ゲフェニア　０１")
		.SetMonsters([
			MONSTER_ID_MINIDEMO,
			MONSTER_ID_DEVILCH,
			MONSTER_ID_BLOODY_KNIGHT,
			MONSTER_ID_INCUBUS,
			MONSTER_ID_SUCUBUS,
			MONSTER_ID_EXCUTIONER,
			MONSTER_ID_ORGATOOTH,
			MONSTER_ID_MISTELTAIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFENIA_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェニア02（右上）", "ゲフェニア　０２")
		.SetMonsters([
			MONSTER_ID_VIOLY,
			MONSTER_ID_BLOODY_KNIGHT,
			MONSTER_ID_INCUBUS,
			MONSTER_ID_SUCUBUS,
			MONSTER_ID_NAGUSAMERUMONO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFENIA_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェニア03（左上）", "ゲフェニア　０３")
		.SetMonsters([
			MONSTER_ID_FAKE_ANGEL,
			MONSTER_ID_BLOODY_KNIGHT,
			MONSTER_ID_INCUBUS,
			MONSTER_ID_SUCUBUS,
			MONSTER_ID_EXCUTIONER,
			MONSTER_ID_ORGATOOTH,
			MONSTER_ID_MISTELTAIN,
			MONSTER_ID_DOPPELGENGER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GEFENIA_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ゲフェニア04（左下）", "ゲフェニア　０４")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_VIOLY,
			MONSTER_ID_FAKE_ANGEL,
			MONSTER_ID_BLOODY_KNIGHT,
			MONSTER_ID_INCUBUS,
			MONSTER_ID_SUCUBUS,
			MONSTER_ID_LORDOF_DEATH,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ORC_CHIKA_DOKUTSU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オーク地下洞窟01", "オークチカドウクツ　０１")
		.SetMonsters([
			MONSTER_ID_ORCZOMBIE,
			MONSTER_ID_ORCSKELTON,
			MONSTER_ID_STEAL_CHONGCHONG,
			MONSTER_ID_FAMILIER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ORC_CHIKA_DOKUTSU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オーク地下洞窟02", "オークチカドウクツ　０２")
		.SetMonsters([
			MONSTER_ID_ZENOKE,
			MONSTER_ID_ORCSKELTON,
			MONSTER_ID_STEAL_CHONGCHONG,
			MONSTER_ID_FAMILIER,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_ORCARCHER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_SHITSUNAI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　室内", "グラストヘイム　シツナイ")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_SAGEWORM,
			MONSTER_ID_DARK_FRAME,
			MONSTER_ID_MARIONET,
			MONSTER_ID_RIDEWORD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_KISHIDAN_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　騎士団01", "グラストヘイム　キシダン　０１")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_KAHRITZBARG,
			MONSTER_ID_KYODAI_WHISPER,
			MONSTER_ID_SHINENNO_KISHI,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_RAIDRIC,
			MONSTER_ID_RAIDRIC_ARCHER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_KISHIDAN_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　騎士団02", "グラストヘイム　キシダン　０２")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_KAHRITZBARG,
			MONSTER_ID_SHINENNO_KISHI,
			MONSTER_ID_RAIDRIC,
			MONSTER_ID_RAIDRIC_ARCHER,
			MONSTER_ID_BLOODY_KNIGHT,
			MONSTER_ID_EXCUTIONER,
			MONSTER_ID_ORGATOOTH,
			MONSTER_ID_MISTELTAIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_KAIDAN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　階段", "グラストヘイム　カイダン")
		.SetMonsters([
			MONSTER_ID_GARGOYLE,
			MONSTER_ID_RAIDRIC_ARCHER,
			MONSTER_ID_MIMIC,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_SHUDOIN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　修道院", "グラストヘイム　シュウドウイン")
		.SetMonsters([
			MONSTER_ID_GHOUL,
			MONSTER_ID_EVIL_DRUID,
			MONSTER_ID_WRAITH,
			MONSTER_ID_MIMIC,
			MONSTER_ID_DARK_ILLUSION,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CATACUMBA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　カタコンベ", "グラストヘイム　カタコンベ")
		.SetMonsters([
			MONSTER_ID_ZOMBIE,
			MONSTER_ID_GHOUL,
			MONSTER_ID_WRAITH,
			MONSTER_ID_ZOMBIE_PRISONER,
			MONSTER_ID_SKEL_PRISONER,
			MONSTER_ID_MIMIC,
			MONSTER_ID_DARK_LORD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_KOZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　古城", "グラストヘイム　コジョウ")
		.SetMonsters([
			MONSTER_ID_SHINENNO_KISHI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_KOZYO_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　古城1F", "グラストヘイム　コジョウ　１カイ")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_JESTER,
			MONSTER_ID_OWL_DUKE,
			MONSTER_ID_OWL_BARON,
			MONSTER_ID_SAGEWORM,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_WHISPER,
			MONSTER_ID_ORGATOOTH,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_KOZYO_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　古城2F", "グラストヘイム　コジョウ　２カイ")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_SAMAYOUMONO,
			MONSTER_ID_SHINENNO_KISHI,
			MONSTER_ID_KAHRITZBARG,
			MONSTER_ID_RAIDRIC,
			MONSTER_ID_RAIDRIC_ARCHER,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_EVIL_DRUID,
			MONSTER_ID_MIMIC,
			MONSTER_ID_WHISPER_FUSHI,
			MONSTER_ID_EXCUTIONER,
			MONSTER_ID_ORGATOOTH,
			MONSTER_ID_MISTELTAIN,
			MONSTER_ID_CHMERA,
			MONSTER_ID_BAPHOMET,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CHIKA_KANGOKU_00");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　地下監獄00", "グラストヘイム　チカカンゴク　００")
		.SetMonsters([
			MONSTER_ID_INJUSTICE,
			MONSTER_ID_FENDARK,
			MONSTER_ID_RIBIO,
			MONSTER_ID_HUNTERFLY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CHIKA_KANGOKU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　地下監獄01", "グラストヘイム　チカカンゴク　０１")
		.SetMonsters([
			MONSTER_ID_INJUSTICE,
			MONSTER_ID_RIBIO,
			MONSTER_ID_ZOMBIE_PRISONER,
			MONSTER_ID_SKEL_PRISONER,
			MONSTER_ID_JIRTUS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　地下水路01", "グラストヘイム　チカスイロ　０１")
		.SetMonsters([
			MONSTER_ID_WHISPER,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_WIND_GHOST,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　地下水路02", "グラストヘイム　チカスイロ　０２")
		.SetMonsters([
			MONSTER_ID_BULLILIGHT,
			MONSTER_ID_SANYOCHU,
			MONSTER_ID_VIRUS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　地下水路03", "グラストヘイム　チカスイロ　０３")
		.SetMonsters([
			MONSTER_ID_STING,
			MONSTER_ID_CLAMP,
			MONSTER_ID_TARO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_CHIKA_SUIRO_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　地下水路04", "グラストヘイム　チカスイロ　０４")
		.SetMonsters([
			MONSTER_ID_ANNOLIAN,
			MONSTER_ID_GARGOYLE,
			MONSTER_ID_PEST,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_SAIKASO_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　最下層01", "グラストヘイム　サイカソウ　０１")
		.SetMonsters([
			MONSTER_ID_STING,
			MONSTER_ID_ACRAUS,
			MONSTER_ID_BULLILIGHT,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_SAIKASO_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイム　最下層02", "グラストヘイム　サイカソウ　０２")
		.SetMonsters([
			MONSTER_ID_GOTTSUI_MINOTAUR,
			MONSTER_ID_MINOTAUR,
			MONSTER_ID_STING,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森01", "フェイヨンマヨイノモリ　０１")
		.SetMonsters([
			MONSTER_ID_WHIROW,
			MONSTER_ID_SPORE,
			MONSTER_ID_PORING,
			MONSTER_ID_PUPA,
			MONSTER_ID_CREAMY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森02", "フェイヨンマヨイノモリ　０２")
		.SetMonsters([
			MONSTER_ID_WOLF,
			MONSTER_ID_SNAKE,
			MONSTER_ID_WHIROW,
			MONSTER_ID_SPORE,
			MONSTER_ID_SASURAI_OKAMI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森03", "フェイヨンマヨイノモリ　０３")
		.SetMonsters([
			MONSTER_ID_WHIROW,
			MONSTER_ID_SPORE,
			MONSTER_ID_PORING,
			MONSTER_ID_RUNATIC,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森04（ポリン島）", "フェイヨンマヨイノモリ　０４")
		.AddNameKana("ポリン島", "ポリントウ")
		.AddNameKana("ポリン島", "ポリンジマ")
		.SetMonsters([
			MONSTER_ID_PORING,
			MONSTER_ID_DROPPS,
			MONSTER_ID_POPORING,
			MONSTER_ID_MARING,
			MONSTER_ID_MASTERING,
			MONSTER_ID_ENGELING,
			MONSTER_ID_GHOSTRING,
			MONSTER_ID_DEVILING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森06", "フェイヨンマヨイノモリ　０６")
		.SetMonsters([
			MONSTER_ID_WORMTAIL,
			MONSTER_ID_TOCHU,
			MONSTER_ID_WHIROW,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森07", "フェイヨンマヨイノモリ　０７")
		.SetMonsters([
			MONSTER_ID_WHIROW,
			MONSTER_ID_ELDER_WHIROW,
			MONSTER_ID_EGIRA,
			MONSTER_ID_DOKEBI,
			MONSTER_ID_BIGFOOT,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森08", "フェイヨンマヨイノモリ　０８")
		.SetMonsters([
			MONSTER_ID_PORING,
			MONSTER_ID_ELDER_WHIROW,
			MONSTER_ID_EGIRA,
			MONSTER_ID_DOKEBI,
			MONSTER_ID_BIGFOOT,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森09", "フェイヨンマヨイノモリ　０９")
		.SetMonsters([
			MONSTER_ID_ELDER_WHIROW,
			MONSTER_ID_EGIRA,
			MONSTER_ID_DOKEBI,
			MONSTER_ID_BIGFOOT,
			MONSTER_ID_SMOKY,
			MONSTER_ID_EDOGA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_MAYOINO_MORI_10");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン迷いの森10", "フェイヨンマヨイノモリ　１０")
		.SetMonsters([
			MONSTER_ID_ELDER_WHIROW,
			MONSTER_ID_EGIRA,
			MONSTER_ID_DOKEBI,
			MONSTER_ID_BIGFOOT,
			MONSTER_ID_POISON_SPORE,
			MONSTER_ID_DRAGONTAIL,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン地下洞窟B1F", "フェイヨンチカドウクツ　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_SKELTON,
			MONSTER_ID_ZOMBIE,
			MONSTER_ID_FAMILIER,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン地下洞窟B2F", "フェイヨンチカドウクツ　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_EGIRA,
			MONSTER_ID_DOKEBI,
			MONSTER_ID_POPORING,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_SMOKY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン地下洞窟B3F", "フェイヨンチカドウクツ　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_MUNAC,
			MONSTER_ID_BONGGONG,
			MONSTER_ID_POPORING,
			MONSTER_ID_HYDRA,
			MONSTER_ID_MANDRAGORA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン地下洞窟B4F", "フェイヨンチカドウクツ　チカ４カイ")
		.SetMonsters([
			MONSTER_ID_SOPHIE,
			MONSTER_ID_HORON,
			MONSTER_ID_HYDRA,
			MONSTER_ID_MANDRAGORA,
			MONSTER_ID_KYODAI_WHISPER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PAYON_CHIKA_DOKUTSU_B5F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フェイヨン地下洞窟B5F", "フェイヨンチカドウクツ　チカ５カイ")
		.SetMonsters([
			MONSTER_ID_KUMIHO,
			MONSTER_ID_PURUHO,
			MONSTER_ID_HYEGUN,
			MONSTER_ID_ARCHER_SKELETON,
			MONSTER_ID_SOLDIER_SKELTON,
			MONSTER_ID_WARYAPHA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CHINBOTSUSEN_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("沈没船1層", "チンボツセン　１ソウ")
		.SetMonsters([
			MONSTER_ID_PIRATES_SKEL,
			MONSTER_ID_KUKRE,
			MONSTER_ID_WHISPER,
			MONSTER_ID_HYDRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CHINBOTSUSEN_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("沈没船2層", "チンボツセン　２ソウ")
		.SetMonsters([
			MONSTER_ID_PIRATES_SKEL,
			MONSTER_ID_WHISPER,
			MONSTER_ID_HYDRA,
			MONSTER_ID_NEREID,
			MONSTER_ID_PEST,
			MONSTER_ID_MIMIC,
			MONSTER_ID_PENOMENA,
			MONSTER_ID_MARIONET,
			MONSTER_ID_SAMAYOUMONO,
			MONSTER_ID_GHOSTRING,
			MONSTER_ID_DRAKE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈01", "ミョルニールサンミャク　０１")
		.SetMonsters([
			MONSTER_ID_CARAMEL,
			MONSTER_ID_KOKO,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_HORN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈02", "ミョルニールサンミャク　０２")
		.SetMonsters([
			MONSTER_ID_KOKO,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_HORN,
			MONSTER_ID_FLORA,
			MONSTER_ID_HONET,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈03", "ミョルニールサンミャク　０３")
		.SetMonsters([
			MONSTER_ID_HONET,
			MONSTER_ID_MANTICE,
			MONSTER_ID_ARGOS,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_FLORA,
			MONSTER_ID_MISTRESS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈04", "ミョルニールサンミャク　０４")
		.SetMonsters([
			MONSTER_ID_SKY_PETIT,
			MONSTER_ID_GROUND_PETIT,
			MONSTER_ID_HONET,
			MONSTER_ID_MANTICE,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_ARGIOPE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈05", "ミョルニールサンミャク　０５")
		.SetMonsters([
			MONSTER_ID_ARGOS,
			MONSTER_ID_ARGIOPE,
			MONSTER_ID_MANTICE,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_FLORA,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈06", "ミョルニールサンミャク　０６")
		.SetMonsters([
			MONSTER_ID_CARAMEL,
			MONSTER_ID_KOKO,
			MONSTER_ID_HORN,
			MONSTER_ID_POPORING,
			MONSTER_ID_HONET,
			MONSTER_ID_STAINER,
			MONSTER_ID_RODDAFROG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈07", "ミョルニールサンミャク　０７")
		.SetMonsters([
			MONSTER_ID_POISON_SPORE,
			MONSTER_ID_HORN,
			MONSTER_ID_HONET,
			MONSTER_ID_STAINER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈08", "ミョルニールサンミャク　０８")
		.SetMonsters([
			MONSTER_ID_MANTICE,
			MONSTER_ID_HONET,
			MONSTER_ID_ARGOS,
			MONSTER_ID_STAINER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈09", "ミョルニールサンミャク　０９")
		.SetMonsters([
			MONSTER_ID_HORN,
			MONSTER_ID_STAINER,
			MONSTER_ID_KOKO,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_10");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈10", "ミョルニールサンミャク　１０")
		.SetMonsters([
			MONSTER_ID_ARGOS,
			MONSTER_ID_ARGIOPE,
			MONSTER_ID_MANTICE,
			MONSTER_ID_FLORA,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_SANMYAKU_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール山脈11", "ミョルニールサンミャク　１１")
		.SetMonsters([
			MONSTER_ID_TOCHU,
			MONSTER_ID_TOCHU_MESU,
			MONSTER_ID_FLORA,
			MONSTER_ID_POPORING,
			MONSTER_ID_MANDRAGORA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_HAIKO_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール廃坑B1F", "ミョルニールハイコウ　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_MIST,
			MONSTER_ID_GAIAS,
			MONSTER_ID_MARTING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_HAIKO_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール廃坑B2F", "ミョルニールハイコウ　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_SKEL_WORKER,
			MONSTER_ID_DRAINRIER,
			MONSTER_ID_MIST,
			MONSTER_ID_MARTING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MJOLNIR_HAIKO_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ミョルニール廃坑B3F", "ミョルニールハイコウ　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_NOCKER,
			MONSTER_ID_SKEL_WORKER,
			MONSTER_ID_MIST,
			MONSTER_ID_OBSIDIAN,
			MONSTER_ID_CONSTANT,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地上1F", "アルデバラントケイトウ　１カイ")
		.SetMonsters([
			MONSTER_ID_PANK,
			MONSTER_ID_DEMON_PANK,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_TOKEITO_KANRISHA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地上2F", "アルデバラントケイトウ　２カイ")
		.SetMonsters([
			MONSTER_ID_CLOCK,
			MONSTER_ID_ARCHER_SKELETON,
			MONSTER_ID_DEMON_PANK,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_MIMIC,
			MONSTER_ID_DEVILCH,
			MONSTER_ID_ELDER,
			MONSTER_ID_TOKEITO_KANRISHA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地上3F", "アルデバラントケイトウ　３カイ")
		.SetMonsters([
			MONSTER_ID_ALARM,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_MIMIC,
			MONSTER_ID_TOKEITO_KANRISHA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地上4F", "アルデバラントケイトウ　４カイ")
		.SetMonsters([
			MONSTER_ID_CLOCK,
			MONSTER_ID_ALARM,
			MONSTER_ID_BEAR_DOLL,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_ELDER,
			MONSTER_ID_TOKEITO_KANRISHA,
			MONSTER_ID_ORGATOOTH,
			MONSTER_ID_EXCUTIONER,
			MONSTER_ID_MISTELTAIN,
			MONSTER_ID_SHINENNO_KISHI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地下1F", "アルデバラントケイトウ　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_STEMWORM,
			MONSTER_ID_BAPHOMET_JR,
			MONSTER_ID_DRAINRIER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地下2F（廃屋）", "アルデバラントケイトウ　チカ２カイ")
		.AddNameKana("廃屋", "ハイオク")
		.SetMonsters([
			MONSTER_ID_HIORC,
			MONSTER_ID_ORCARCHER,
			MONSTER_ID_ORCWARRIOR,
			MONSTER_ID_ORCBABY,
			MONSTER_ID_ORCHERO,
			MONSTER_ID_ORCLORD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地下3F", "アルデバラントケイトウ　チカ３カイ")
		.SetMonsters([
			MONSTER_ID_PENOMENA,
			MONSTER_ID_CLAMP,
			MONSTER_ID_DRAINRIER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ALDEBARAN_TOKEITO_B4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アルデバラン時計塔　地下4F（婆園）", "アルデバラントケイトウ　チカ４カイ")
		.AddNameKana("婆園", "ババエン")
		.SetMonsters([
			MONSTER_ID_BARSURRY,
			MONSTER_ID_JORKER,
			MONSTER_ID_WHISPER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RUTIE_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ルティエフィールド01", "ルティエフィールド　０１")
		.SetMonsters([
			MONSTER_ID_SUSCUCCHI,
			MONSTER_ID_MARING,
			MONSTER_ID_HATIE,
			MONSTER_ID_HATIE_BEBE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_OMOCHA_KOZYO_DUNGEON_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("おもちゃ工場ダンジョン1F", "オモチャコウジョウダンジョン　１カイ")
		.SetMonsters([
			MONSTER_ID_MISTCASE,
			MONSTER_ID_COOKIE,
			MONSTER_ID_CHIRSTMASS_COOKIE,
			MONSTER_ID_PORING,
			MONSTER_ID_DROPPS,
			MONSTER_ID_POPORING,
			MONSTER_ID_MARING,
			MONSTER_ID_MASTERING,
			MONSTER_ID_CHEPET,
			MONSTER_ID_ENGELING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_OMOCHA_KOZYO_DUNGEON_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("おもちゃ工場ダンジョン2F", "オモチャコウジョウダンジョン　２カイ")
		.SetMonsters([
			MONSTER_ID_MISTCASE,
			MONSTER_ID_COOKIE,
			MONSTER_ID_CHIRSTMASS_COOKIE,
			MONSTER_ID_CRUZER,
			MONSTER_ID_CHIRISTMAS_GOBLIN,
			MONSTER_ID_HATIE_BEBE,
			MONSTER_ID_STORM_KNIGHT,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド01", "コモドフィールド　０１")
		.SetMonsters([
			MONSTER_ID_ALLIGATOR,
			MONSTER_ID_DRIAD,
			MONSTER_ID_POPORING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド02", "コモドフィールド　０２")
		.SetMonsters([
			MONSTER_ID_OTTO,
			MONSTER_ID_GALAPAGO,
			MONSTER_ID_REGRLO,
			MONSTER_ID_OBAKEGAI,
			MONSTER_ID_KANI,
			MONSTER_ID_HITODE,
			MONSTER_ID_CHINPIRA,
			MONSTER_ID_ALLIGATOR,
			MONSTER_ID_CORNUTUS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド03", "コモドフィールド　０３")
		.SetMonsters([
			MONSTER_ID_FAIRLEAF,
			MONSTER_ID_DRIAD,
			MONSTER_ID_POPORING,
			MONSTER_ID_LADYTANIE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド04", "コモドフィールド　０４")
		.SetMonsters([
			MONSTER_ID_SEA_OTTO,
			MONSTER_ID_REGRLO,
			MONSTER_ID_OBAKEGAI,
			MONSTER_ID_KANI,
			MONSTER_ID_HITODE,
			MONSTER_ID_CHINPIRA,
			MONSTER_ID_ALLIGATOR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド06", "コモドフィールド　０６")
		.SetMonsters([
			MONSTER_ID_HODO,
			MONSTER_ID_EGIRA,
			MONSTER_ID_METARURA,
			MONSTER_ID_BYAKURENDAMA,
			MONSTER_ID_DROPPS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド07", "コモドフィールド　０７")
		.SetMonsters([
			MONSTER_ID_FRILLDRA,
			MONSTER_ID_HODO,
			MONSTER_ID_DROPPS,
			MONSTER_ID_OBAKEGAI,
			MONSTER_ID_KANI,
			MONSTER_ID_HITODE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド08", "コモドフィールド　０８")
		.SetMonsters([
			MONSTER_ID_GOBLIN_ARCHER,
			MONSTER_ID_PANTSER_GOBLIN,
			MONSTER_ID_GOBLIN_RIDER,
			MONSTER_ID_RORTERJAIRO,
			MONSTER_ID_KOBOLD_ARCHER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_FIELD_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモドフィールド09", "コモドフィールド　０９")
		.SetMonsters([
			MONSTER_ID_STEAL_CHONGCHONG,
			MONSTER_ID_HODO,
			MONSTER_ID_METARURA,
			MONSTER_ID_BYAKURENDAMA,
			MONSTER_ID_DROPPS,
			MONSTER_ID_DRAGONFLY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_DOKUTSU_NISHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモド洞窟（西）", "コモドドウクツ　ニシ")
		.SetMonsters([
			MONSTER_ID_MEDUSA,
			MONSTER_ID_DARK_FRAME,
			MONSTER_ID_HYDRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_DOKUTSU_KITA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモド洞窟（北）", "コモドドウクツ　キタ")
		.SetMonsters([
			MONSTER_ID_MEGARIS,
			MONSTER_ID_STRUCTITE_GOLEM,
			MONSTER_ID_HYDRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COMODO_DOKUTSU_HIGASHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コモド洞窟（東）", "コモドドウクツ　ヒガシ")
		.SetMonsters([
			MONSTER_ID_MEGARODON,
			MONSTER_ID_TARAFROG,
			MONSTER_ID_HYDRA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_UMBALA_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウンバラフィールド01", "ウンバラフィールド　０１")
		.SetMonsters([
			MONSTER_ID_FLAME_SHOOTER,
			MONSTER_ID_DRIAD,
			MONSTER_ID_BEATLE,
			MONSTER_ID_DUSTINESS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_UMBALA_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウンバラフィールド02", "ウンバラフィールド　０２")
		.SetMonsters([
			MONSTER_ID_OOTANG_SHOOTER,
			MONSTER_ID_OOTANG_FIGHTER,
			MONSTER_ID_FLORA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_UMBALA_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウンバラフィールド03", "ウンバラフィールド　０３")
		.SetMonsters([
			MONSTER_ID_WOODN_GOLEM,
			MONSTER_ID_DRIAD,
			MONSTER_ID_BEATLE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_UMBALA_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウンバラフィールド04", "ウンバラフィールド　０４")
		.SetMonsters([
			MONSTER_ID_HORN,
			MONSTER_ID_DRIAD,
			MONSTER_ID_BEATLE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NIFLHEIM_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ニブルヘイムフィールド01（秘境の村）", "ニブルヘイムフィールド　０１")
		.AddNameKana("秘境の村", "ヒキョウノムラ")
		.SetMonsters([
			MONSTER_ID_ROOD,
			MONSTER_ID_CUBE,
			MONSTER_ID_ZIBIT,
			MONSTER_ID_DULAHAN,
			MONSTER_ID_DISGUIS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NIFLHEIM_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ニブルヘイムフィールド02（ギョル渓谷）", "ニブルヘイムフィールド　０２")
		.AddNameKana("ギョル渓谷", "ギョルケイコク")
		.SetMonsters([
			MONSTER_ID_ROOD,
			MONSTER_ID_CUBE,
			MONSTER_ID_HIROZOIST,
			MONSTER_ID_BLOODY_MARDER,
			MONSTER_ID_LOLIRURI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHISHANO_MACHI_NIFLHEIM");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("死者の街ニブルヘイム", "シシャノマチニブルヘイム")
		.SetMonsters([
			MONSTER_ID_ROOD,
			MONSTER_ID_CUBE,
			MONSTER_ID_ZIBIT,
			MONSTER_ID_DULAHAN,
			MONSTER_ID_DISGUIS,
			MONSTER_ID_HIROZOIST,
			MONSTER_ID_BLOODY_MARDER,
			MONSTER_ID_LOLIRURI,
			MONSTER_ID_LORDOF_DEATH,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_PAYON");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　フェイヨン", "ギルドダンジョン　フェイヨン")
		.AddNameKana("チュンリム湖", "チュンリムコ")
		.AddNameKana("砦", "トリデ")
		.SetMonsters([
			MONSTER_ID_AMMUT,
			MONSTER_ID_GAJOMART,
			MONSTER_ID_GENERAL_SKELTON,
			MONSTER_ID_CAT_NINETAIL,
			MONSTER_ID_SASURAI_OKAMI,
			MONSTER_ID_EDOGA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_ALDEBARAN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　アルデバラン", "ギルドダンジョン　アルデバラン")
		.AddNameKana("アルデバラン衛星都市ルイーナ", "アルデバランエイセイトシルイーナ")
		.AddNameKana("砦", "トリデ")
		.SetMonsters([
			MONSTER_ID_GIANT_SPIDER,
			MONSTER_ID_GIANT_HONET,
			MONSTER_ID_ANCIENT_WARM,
			MONSTER_ID_KILLER_MANTICE,
			MONSTER_ID_KYODAI_WHISPER,
			MONSTER_ID_DOPPELGENGER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_PRONTERA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　プロンテラ", "ギルドダンジョン　プロンテラ")
		.AddNameKana("ヴァルキリーレルム", "ヴァルキリーレルム")
		.AddNameKana("砦", "トリデ")
		.SetMonsters([
			MONSTER_ID_RAVEORMAI,
			MONSTER_ID_CATAPIRER,
			MONSTER_ID_GRINBULLSTY,
			MONSTER_ID_CREAMY_FEAR,
			MONSTER_ID_MAYA_PURPLE,
			MONSTER_ID_MAYA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_GEFFEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　ゲフェン", "ギルドダンジョン　ゲフェン")
		.AddNameKana("ブリトニア", "ブリトニア")
		.AddNameKana("砦", "トリデ")
		.SetMonsters([
			MONSTER_ID_DEADLY_WRAITH,
			MONSTER_ID_ZOMBIE_MASTER,
			MONSTER_ID_MINIDEMO,
			MONSTER_ID_DARK_PRIEST,
			MONSTER_ID_DARK_ILLUSION,
			MONSTER_ID_DARK_LORD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_YUNO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　ジュノー", "ギルドダンジョン　ジュノー")
		.AddNameKana("ギルドダンジョン　シュバルツバルド", "ギルドダンジョン　シュバルツバルド")
		.AddNameKana("ニダヴェリール", "ニダヴェリール")
		.AddNameKana("砦", "トリデ")
		.SetMonsters([
			MONSTER_ID_COBALT_MINERAL,
			MONSTER_ID_HEAVY_METALING,
			MONSTER_ID_ZAKUDAM,
			MONSTER_ID_HELL_APOCALYPSE,
			MONSTER_ID_KUBLIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_RACHEL");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　ラヘル", "ギルドダンジョン　ラヘル")
		.AddNameKana("ギルドダンジョン　アルナベルツ", "ギルドダンジョン　アルナベルツ")
		.AddNameKana("ヴァルフレイヤ", "ヴァルフレイヤ")
		.AddNameKana("砦", "トリデ")
		.SetMonsters([
			MONSTER_ID_KUBLIN,
			MONSTER_ID_PHANAT,
			MONSTER_ID_AUNOE,
			MONSTER_ID_BIHOLDER_MASTER,
			MONSTER_ID_BANSY_MASTER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TURTLE_ISLAND_CHIZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タートルアイランド　地上", "タートルアイランド")
		.AddNameKana("タートルアイランド　地上", "タートルアイランド　チジョウ")
		.SetMonsters([
			MONSTER_ID_SPRING_RABIT,
			MONSTER_ID_DRAGONTAIL,
			MONSTER_ID_PERMET_TURTLE,
			MONSTER_ID_TARAFROG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TURTLE_ISLAND_DUNGEON_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タートルアイランドダンジョン01", "タートルアイランドダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_PERMET_TURTLE,
			MONSTER_ID_SOLID_TURTLE,
			MONSTER_ID_FREEZE_TURTLE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TURTLE_ISLAND_DUNGEON_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タートルアイランドダンジョン02", "タートルアイランドダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_PERMET_TURTLE,
			MONSTER_ID_FREEZE_TURTLE,
			MONSTER_ID_HEAT_TURTLE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TURTLE_ISLAND_DUNGEON_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タートルアイランドダンジョン03", "タートルアイランドダンジョン　０３")
		.SetMonsters([
			MONSTER_ID_PERMET_TURTLE,
			MONSTER_ID_FREEZE_TURTLE,
			MONSTER_ID_HEAT_TURTLE,
			MONSTER_ID_SOLID_TURTLE,
			MONSTER_ID_ASSAULT_TURTLE,
			MONSTER_ID_TURTLE_GENERAL,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AMATSU_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アマツフィールド01", "アマツフィールド　０１")
		.SetMonsters([
			MONSTER_ID_KARAKASA,
			MONSTER_ID_BIGFOOT,
			MONSTER_ID_POPORING,
			MONSTER_ID_HYDRA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AMATSU_DUNGEON_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アマツダンジョン01", "アマツダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_ZYUKIHEI,
			MONSTER_ID_MIYABI_NINGYO,
			MONSTER_ID_KABUKININJA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AMATSU_DUNGEON_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アマツダンジョン02", "アマツダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_KAPPA,
			MONSTER_ID_OGUCHI_KAERU,
			MONSTER_ID_HORON,
			MONSTER_ID_KABUKININJA,
			MONSTER_ID_ITTANMOMEN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AMATSU_DUNGEON_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アマツダンジョン03", "アマツダンジョン　０３")
		.SetMonsters([
			MONSTER_ID_KABUKININJA,
			MONSTER_ID_ITTANMOMEN,
			MONSTER_ID_SAKATENGU,
			MONSTER_ID_ONRYOBUSHI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GONRYUN_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コンロンフィールド01", "コンロンフィールド　０１")
		.SetMonsters([
			MONSTER_ID_KOE,
			MONSTER_ID_CHAKKEY,
			MONSTER_ID_DANGO_WARAZI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GONRYUN_DUNGEON_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コンロンダンジョン01", "コンロンダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_ZINMENTOZYU,
			MONSTER_ID_CHAKKEY,
			MONSTER_ID_PAPIYON,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GONRYUN_DUNGEON_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コンロンダンジョン02", "コンロンダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_PAPIYON,
			MONSTER_ID_TENZYA_SENNIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GONRYUN_DUNGEON_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("コンロンダンジョン03", "コンロンダンジョン　０３")
		.SetMonsters([
			MONSTER_ID_TENZYA_SENNIN,
			MONSTER_ID_TENSEN_NYANGNYANG,
			MONSTER_ID_RONINZIN,
			MONSTER_ID_KOKUDAO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LOUYANG_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍之城フィールド01", "リュウノジョウフィールド　０１")
		.SetMonsters([
			MONSTER_ID_DOSEI,
			MONSTER_ID_ANAKONDAK,
			MONSTER_ID_CARAMEL,
			MONSTER_ID_BIGFOOT,
			MONSTER_ID_MANTICE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LOUYANG_DUNGEON_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍之城ダンジョン01", "リュウノジョウダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_KOZIN,
			MONSTER_ID_DOSEI,
			MONSTER_ID_KORYUBU,
			MONSTER_ID_HORON,
			MONSTER_ID_GRIZZLY,
			MONSTER_ID_RAVEORMAI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LOUYANG_DUNGEON_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍之城ダンジョン02", "リュウノジョウダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_KORYUBU,
			MONSTER_ID_HYEGUN,
			MONSTER_ID_MUNAC,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LOUYANG_DUNGEON_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍之城ダンジョン03", "リュウノジョウダンジョン　０３")
		.SetMonsters([
			MONSTER_ID_HYEGUN,
			MONSTER_ID_MYOGUE,
			MONSTER_ID_CHUNG_EAH,
			MONSTER_ID_PEKUSOZIN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AYOTHAYA_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アユタヤフィールド01", "アユタヤフィールド　０１")
		.SetMonsters([
			MONSTER_ID_LEAFCAT,
			MONSTER_ID_KOKO,
			MONSTER_ID_YOYO,
			MONSTER_ID_SMOKY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AYOTHAYA_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アユタヤフィールド02", "アユタヤフィールド　０２")
		.SetMonsters([
			MONSTER_ID_LEAFCAT,
			MONSTER_ID_BEATLE,
			MONSTER_ID_KRABEN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AYOTHAYA_DUNGEON_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アユタヤダンジョン01", "アユタヤダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_KRABEN,
			MONSTER_ID_LEAFCAT,
			MONSTER_ID_GHOUL,
			MONSTER_ID_WHISPER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AYOTHAYA_DUNGEON_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アユタヤダンジョン02", "アユタヤダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_TAMURANG,
			MONSTER_ID_WHISPER,
			MONSTER_ID_FLAME_SCALE,
			MONSTER_ID_TAOGUNKA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド01", "ジュノーフィールド　０１")
		.SetMonsters([
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_PORING,
			MONSTER_ID_POPORING,
			MONSTER_ID_GRANDPEKO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド02", "ジュノーフィールド　０２")
		.SetMonsters([
			MONSTER_ID_BEATLE,
			MONSTER_ID_HORN,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_WILDROSE,
			MONSTER_ID_RED_NOVAS,
			MONSTER_ID_YELLOW_NOVAS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド03", "ジュノーフィールド　０３")
		.SetMonsters([
			MONSTER_ID_GOAT,
			MONSTER_ID_DRILLER,
			MONSTER_ID_PORING,
			MONSTER_ID_POPORING,
			MONSTER_ID_DROPPS,
			MONSTER_ID_MARING,
			MONSTER_ID_SIDEWINDER,
			MONSTER_ID_ARCANGELING,
			MONSTER_ID_DEVILING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド04", "ジュノーフィールド　０４")
		.SetMonsters([
			MONSTER_ID_CONDOR,
			MONSTER_ID_PORING,
			MONSTER_ID_POPORING,
			MONSTER_ID_DROPPS,
			MONSTER_ID_MARING,
			MONSTER_ID_MASTERING,
			MONSTER_ID_ENGELING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド06", "ジュノーフィールド　０６")
		.SetMonsters([
			MONSTER_ID_SLEEPER,
			MONSTER_ID_GOAT,
			MONSTER_ID_DEMON_PANK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド07", "ジュノーフィールド　０７")
		.SetMonsters([
			MONSTER_ID_HARPUIR,
			MONSTER_ID_DRILLER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド08", "ジュノーフィールド　０８")
		.SetMonsters([
			MONSTER_ID_GRANDPEKO,
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_DUSTINESS,
			MONSTER_ID_WILDROSE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド09", "ジュノーフィールド　０９")
		.SetMonsters([
			MONSTER_ID_SLEEPER,
			MONSTER_ID_DRILLER,
			MONSTER_ID_DEMON_PANK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド11", "ジュノーフィールド　１１")
		.SetMonsters([
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_PANK,
			MONSTER_ID_DEMON_PANK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YUNO_FIELD_12");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュノーフィールド12", "ジュノーフィールド　１２")
		.SetMonsters([
			MONSTER_ID_POPORING,
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_DUSTINESS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NOGUE_ROAD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ノーグロード01", "ノーグロード　０１")
		.SetMonsters([
			MONSTER_ID_RARVAGOLEM,
			MONSTER_ID_BLAZER,
			MONSTER_ID_EXPLOSION,
			MONSTER_ID_KAHO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NOGUE_ROAD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ノーグロード02", "ノーグロード　０２")
		.SetMonsters([
			MONSTER_ID_NIGHTMARE_TERROR,
			MONSTER_ID_GIG,
			MONSTER_ID_DIAVOILIC,
			MONSTER_ID_SKY_DELETER,
			MONSTER_ID_GROUND_DELETER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KIKAI_NINGYO_KOZYO_B1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("機械人形工場B1F", "キカイニンギョウコウジョウ　チカ１カイ")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_CONSTANT,
			MONSTER_ID_ELLISA,
			MONSTER_ID_ELLISEL,
			MONSTER_ID_ELLIOT,
			MONSTER_ID_CHIEL_D01,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KIKAI_NINGYO_KOZYO_B2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("機械人形工場B2F", "キカイニンギョウコウジョウ　チカ２カイ")
		.SetMonsters([
			MONSTER_ID_CONSTANT,
			MONSTER_ID_ELLISA,
			MONSTER_ID_ELLISEL,
			MONSTER_ID_ELLIOT,
			MONSTER_ID_CHIEL_D01,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド03", "アインブロックフィールド　０３")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_MORDEN,
			MONSTER_ID_CARAMEL,
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_HORN,
			MONSTER_ID_OBSIDIAN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド04", "アインブロックフィールド　０４")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_MORDEN,
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_MINERAL,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド05", "アインブロックフィールド　０５")
		.SetMonsters([
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_DEMON_PANK,
			MONSTER_ID_OBSIDIAN,
			MONSTER_ID_MINERAL,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド06", "アインブロックフィールド　０６")
		.SetMonsters([
			MONSTER_ID_GAIAS,
			MONSTER_ID_CREAMY,
			MONSTER_ID_GOAT,
			MONSTER_ID_HARPUIR,
			MONSTER_ID_PUPA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド07", "アインブロックフィールド　０７")
		.SetMonsters([
			MONSTER_ID_VIRUS,
			MONSTER_ID_METALING,
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_FLORA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド08", "アインブロックフィールド　０８")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_PORCELIO,
			MONSTER_ID_PORING,
			MONSTER_ID_POPORING,
			MONSTER_ID_DROPPS,
			MONSTER_ID_TOCHU,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EINBROCH_FIELD_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アインブロックフィールド09", "アインブロックフィールド　０９")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_PORCELIO,
			MONSTER_ID_PORING,
			MONSTER_ID_POPORING,
			MONSTER_ID_TOCHU,
			MONSTER_ID_FLORA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KOZAN_DUNGEON_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("鉱山ダンジョン01", "コウザンダンジョン　０１")
		.AddNameKana("アインブロック鉱山01", "アインブロックコウザン　０１")
		.SetMonsters([
			MONSTER_ID_NOKSHAS,
			MONSTER_ID_VENOMAS,
			MONSTER_ID_PITMAN,
			MONSTER_ID_JUNKPOT,
			MONSTER_ID_UNGORIANT,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KOZAN_DUNGEON_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("鉱山ダンジョン02", "コウザンダンジョン　０２")
		.AddNameKana("アインブロック鉱山02", "アインブロックコウザン　０２")
		.SetMonsters([
			MONSTER_ID_NOKSHAS,
			MONSTER_ID_VENOMAS,
			MONSTER_ID_JUNKPOT,
			MONSTER_ID_BEAR_DOLL,
			MONSTER_ID_RSX_0806,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LIGHTHALZEN_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("リヒタルゼンフィールド01", "リヒタルゼンフィールド　０１")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_MORDEN,
			MONSTER_ID_CARAMEL,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LIGHTHALZEN_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("リヒタルゼンフィールド02", "リヒタルゼンフィールド　０２")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_MORDEN,
			MONSTER_ID_CARAMEL,
			MONSTER_ID_HORN,
			MONSTER_ID_CHOCO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_LIGHTHALZEN_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("リヒタルゼンフィールド03", "リヒタルゼンフィールド　０３")
		.SetMonsters([
			MONSTER_ID_METALING,
			MONSTER_ID_MORDEN,
			MONSTER_ID_MARTING,
			MONSTER_ID_GAIAS,
			MONSTER_ID_PORCELIO,
			MONSTER_ID_RAFURESIA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("生体工学研究所01", "セイタイコウガクケンキュウジョ　０１")
		.SetMonsters([
			MONSTER_ID_VIRUS,
			MONSTER_ID_REMOVER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("生体工学研究所02", "セイタイコウガクケンキュウジョ　０２")
		.SetMonsters([
			MONSTER_ID_IGNISEM_CENIA,
			MONSTER_ID_HYUCKEVINE_TRIS,
			MONSTER_ID_IRENDO_EBESI,
			MONSTER_ID_CAGAK_ICARUS,
			MONSTER_ID_RAUREL_VINDER,
			MONSTER_ID_ARMAIA_DUNZE,
			MONSTER_ID_IGNISEM_CENIA_MVP,
			MONSTER_ID_GEMINI_S58,
			MONSTER_ID_WISH_MASCOT,
			MONSTER_ID_ARTIS_MASCOT,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("生体工学研究所03", "セイタイコウガクケンキュウジョ　０３")
		.SetMonsters([
			MONSTER_ID_SEIREN_VINSER,
			MONSTER_ID_ELEMES_GAIL,
			MONSTER_ID_MARGARETTE_SORIN,
			MONSTER_ID_CECIL_DIMON,
			MONSTER_ID_CATHERINE_KEILON,
			MONSTER_ID_HAWARD_ALTIZEN,

			MONSTER_ID_SEIREN_VINSER_KYO,
			MONSTER_ID_ELEMES_GAIL_KYO,
			MONSTER_ID_MARGARETTE_SORIN_KYO,
			MONSTER_ID_CECIL_DIMON_KYO,
			MONSTER_ID_CATHERINE_KEILON_KYO,
			MONSTER_ID_HAWARD_ALTIZEN_KYO,

			MONSTER_ID_SEIREN_VINSER_MVP,
			MONSTER_ID_ELEMES_GAIL_MVP,
			MONSTER_ID_MARGARETTE_SORIN_MVP,
			MONSTER_ID_CECIL_DIMON_MVP,
			MONSTER_ID_CATHERINE_KEILON_MVP,
			MONSTER_ID_HAWARD_ALTIZEN_MVP,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SETAI_KOGAKU_KENKYUZYO_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("生体工学研究所04", "セイタイコウガクケンキュウジョ　０４")
		.SetMonsters([
			MONSTER_ID_RANDEL_RORENCE,
			MONSTER_ID_GARTY_UH,
			MONSTER_ID_CHENG_RIU,
			MONSTER_ID_ARFOSIO_BASIL,
			MONSTER_ID_TRENTINI,
			MONSTER_ID_CERIA_ARDE,
			MONSTER_ID_EMUR_PURAMEL,

			MONSTER_ID_RANDEL_RORENCE_KYO,
			MONSTER_ID_GARTY_UH_KYO,
			MONSTER_ID_CHENG_RIU_KYO,
			MONSTER_ID_ARFOSIO_BASIL_KYO,
			MONSTER_ID_TRENTINI_KYO,
			MONSTER_ID_CERIA_ARDE_KYO,
			MONSTER_ID_EMUR_PURAMEL_KYO,

			MONSTER_ID_RANDEL_RORENCE_MVP,
			MONSTER_ID_GARTY_UH_MVP,
			MONSTER_ID_CHENG_RIU_MVP,
			MONSTER_ID_ARFOSIO_BASIL_MVP,
			MONSTER_ID_TRENTINI_MVP,
			MONSTER_ID_CERIA_ARDE_MVP,
			MONSTER_ID_EMUR_PURAMEL_MVP,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KINKINO_KENKYUZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("禁忌の研究所", "キンキノケンキュウジョ")
		.SetMonsters([
			MONSTER_ID_UETA_ZIKKENDOBUTSU_SHO,
			MONSTER_ID_UETA_ZIKKENDOBUTSU_DAI,

			MONSTER_ID_SEIREN_VINSER_MVP,
			MONSTER_ID_ELEMES_GAIL_MVP,
			MONSTER_ID_MARGARETTE_SORIN_MVP,
			MONSTER_ID_CECIL_DIMON_MVP,
			MONSTER_ID_CATHERINE_KEILON_MVP,
			MONSTER_ID_HAWARD_ALTIZEN_MVP,

			MONSTER_ID_RANDEL_RORENCE_MVP,
			MONSTER_ID_GARTY_UH_MVP,
			MONSTER_ID_CHENG_RIU_MVP,
			MONSTER_ID_ARFOSIO_BASIL_MVP,
			MONSTER_ID_TRENTINI_MVP,
			MONSTER_ID_CERIA_ARDE_MVP,
			MONSTER_ID_EMUR_PURAMEL_MVP,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_JUPEROS_HAIKYO_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュピロス廃墟01", "ジュピロスハイキョ　０１")
		.AddNameKana("ジュピロスダンジョン01", "ジュピロスダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_VENART,
			MONSTER_ID_ICE_VENART,
			MONSTER_ID_FLAME_VENART,
			MONSTER_ID_EARTH_VENART,
			MONSTER_ID_WIND_VENART,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_JUPEROS_HAIKYO_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュピロス廃墟02", "ジュピロスハイキョ　０２")
		.AddNameKana("ジュピロスダンジョン02", "ジュピロスダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_APOCALYPSE,
			MONSTER_ID_ARCDAM_NINGEN,
			MONSTER_ID_GATE_SEIGYOSOCHI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_JUPEROS_CHUSHINBU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュピロス中心部", "ジュピロスハイキョ　０３")
		.AddNameKana("ジュピロス中心部", "ジュピロスチュウシンブ")
		.AddNameKana("ジュピロスダンジョン03", "ジュピロスダンジョン　０３")
		.SetMonsters([
			MONSTER_ID_APOCALYPSE,
			MONSTER_ID_ARCDAM_NINGEN,
			MONSTER_ID_WIND_DEMIC,
			MONSTER_ID_ICE_DEMIC,
			MONSTER_ID_EARTH_DIMIC,
			MONSTER_ID_FLAME_DIMIC,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HUGEL_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フィゲルフィールド01", "フィゲルフィールド　０１")
		.SetMonsters([
			MONSTER_ID_BLEEZE,
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_BLUE_PRASMA,
			MONSTER_ID_RED_PRASMA,
			MONSTER_ID_GREEN_PRASMA,
			MONSTER_ID_PURPLE_PRASMA,
			MONSTER_ID_YELLOW_PRASMA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HUGEL_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フィゲルフィールド02", "フィゲルフィールド　０２")
		.SetMonsters([
			MONSTER_ID_BLEEZE,
			MONSTER_ID_VIRUS,
			MONSTER_ID_RED_NOVAS,
			MONSTER_ID_YELLOW_NOVAS,
			MONSTER_ID_SKY_PETIT,
			MONSTER_ID_GROUND_PETIT,
			MONSTER_ID_SKY_DELETER,
			MONSTER_ID_GROUND_DELETER,
			MONSTER_ID_GREEN_IGANA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HUGEL_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フィゲルフィールド04", "フィゲルフィールド　０４")
		.SetMonsters([
			MONSTER_ID_BLEEZE,
			MONSTER_ID_VIRUS,
			MONSTER_ID_RED_NOVAS,
			MONSTER_ID_YELLOW_NOVAS,
			MONSTER_ID_SKY_PETIT,
			MONSTER_ID_GROUND_PETIT,
			MONSTER_ID_SKY_DELETER,
			MONSTER_ID_GROUND_DELETER,
			MONSTER_ID_GREEN_IGANA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HUGEL_FIELD_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フィゲルフィールド05", "フィゲルフィールド　０５")
		.SetMonsters([
			MONSTER_ID_RED_NOVAS,
			MONSTER_ID_YELLOW_NOVAS,
			MONSTER_ID_GREEN_IGANA,
			MONSTER_ID_DRAGONNO_TAMAGO,
			MONSTER_ID_MUTANT_DRAGON,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HUGEL_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フィゲルフィールド06", "フィゲルフィールド　０６")
		.SetMonsters([
			MONSTER_ID_MORDEN,
			MONSTER_ID_CARAMEL,
			MONSTER_ID_PORING,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アビスレイク地下洞窟01", "アビスレイクチカドウクツ　０１")
		.SetMonsters([
			MONSTER_ID_MIMIC,
			MONSTER_ID_RED_NOVAS,
			MONSTER_ID_YELLOW_NOVAS,
			MONSTER_ID_GREEN_PHEROS,
			MONSTER_ID_BLUE_OSIDOS,
			MONSTER_ID_DRAGONNO_TAMAGO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アビスレイク地下洞窟02", "アビスレイクチカドウクツ　０２")
		.SetMonsters([
			MONSTER_ID_MIMIC,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_GREEN_PHEROS,
			MONSTER_ID_RED_PHEROS,
			MONSTER_ID_BLUE_OSIDOS,
			MONSTER_ID_DRAGONNO_TAMAGO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アビスレイク地下洞窟03", "アビスレイクチカドウクツ　０３")
		.SetMonsters([
			MONSTER_ID_MIMIC,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_RED_PHEROS,
			MONSTER_ID_GOLD_OSIDOS,
			MONSTER_ID_DRAGONNO_TAMAGO,
			MONSTER_ID_HYDRARANCER,
			MONSTER_ID_DATALZAURUS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　下層部01", "タナトスタワー　カソウブ　０１")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_MIMIC,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_GREEN_PRASMA,
			MONSTER_ID_NAGUSAMERUMONO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　下層部02", "タナトスタワー　カソウブ　０２")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_MIMIC,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_ELDER,
			MONSTER_ID_GREEN_PRASMA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　下層部03", "タナトスタワー　カソウブ　０３")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_MIMIC,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_ELDER,
			MONSTER_ID_PURPLE_PRASMA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　下層部04", "タナトスタワー　カソウブ　０４")
		.SetMonsters([
			MONSTER_ID_MIMIC,
			MONSTER_ID_RIDEWORD,
			MONSTER_ID_ELDER,
			MONSTER_ID_OWL_DUKE,
			MONSTER_ID_OWL_BARON,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_DEATHWORD,
			MONSTER_ID_RED_PRASMA,
			MONSTER_ID_KANSHISURUMONO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　下層部05", "タナトスタワー　カソウブ　０５")
		.SetMonsters([
			MONSTER_ID_ELDER,
			MONSTER_ID_OWL_DUKE,
			MONSTER_ID_OWL_BARON,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_DEATHWORD,
			MONSTER_ID_BLUE_PRASMA,
			MONSTER_ID_RED_PRASMA,
			MONSTER_ID_GREEN_PRASMA,
			MONSTER_ID_PURPLE_PRASMA,
			MONSTER_ID_THANATOSNO_KUNO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　下層部06", "タナトスタワー　カソウブ　０６")
		.SetMonsters([
			MONSTER_ID_ELDER,
			MONSTER_ID_OWL_DUKE,
			MONSTER_ID_OWL_BARON,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_DEATHWORD,
			MONSTER_ID_BLUE_PRASMA,
			MONSTER_ID_RED_PRASMA,
			MONSTER_ID_GREEN_PRASMA,
			MONSTER_ID_PURPLE_PRASMA,
			MONSTER_ID_THANATOSNO_KANASHIMI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部07", "タナトスタワー　ジョウソウブ　０７")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_DEATHWORD,
			MONSTER_ID_BLUE_PRASMA,
			MONSTER_ID_THANATOSNO_ZETSUBO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部08", "タナトスタワー　ジョウソウブ　０８")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_ANCIEND_MIMIC,
			MONSTER_ID_DEATHWORD,
			MONSTER_ID_BLUE_PRASMA,
			MONSTER_ID_THANATOSNO_ZOUO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_09");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部09", "タナトスタワー　ジョウソウブ　０９")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_GREEN_PRASMA,
			MONSTER_ID_THANATOSNO_KANASHIMI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_10");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部10", "タナトスタワー　ジョウソウブ　１０")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_PURPLE_PRASMA,
			MONSTER_ID_THANATOSNO_KUNO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部11", "タナトスタワー　ジョウソウブ　１１")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_RED_PRASMA,
			MONSTER_ID_THANATOSNO_ZETSUBO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_12");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部12", "タナトスタワー　ジョウソウブ　１２")
		.SetMonsters([
			MONSTER_ID_NAGUSAMERUMONO,
			MONSTER_ID_SHIKKOSURUMONO,
			MONSTER_ID_HOGOSURUMONO,
			MONSTER_ID_KANSHISURUMONO,
			MONSTER_ID_YELLOW_PRASMA,
			MONSTER_ID_THANATOSNO_ZOUO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOS_TOWER_13");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("タナトスタワー　上層部13", "タナトスタワー　ジョウソウブ　１３")
		.SetMonsters([
			MONSTER_ID_MAKENSHI_THANATOSNO_SHINENTAI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ODIN_SHINDEN_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オーディン神殿01", "オーディンシンデン　０１")
		.SetMonsters([
			MONSTER_ID_BLEEZE,
			MONSTER_ID_BLUE_PRASMA,
			MONSTER_ID_RED_PRASMA,
			MONSTER_ID_GREEN_PRASMA,
			MONSTER_ID_PURPLE_PRASMA,
			MONSTER_ID_YELLOW_PRASMA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ODIN_SHINDEN_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オーディン神殿02", "オーディンシンデン　０２")
		.SetMonsters([
			MONSTER_ID_YELLOW_PRASMA,
			MONSTER_ID_PURUS,
			MONSTER_ID_SUKOGUR,
			MONSTER_ID_SUKEGORT_BROWN,
			MONSTER_ID_SUKEGORT_BLACK,
			MONSTER_ID_RANDGRIS_GHOST,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ODIN_SHINDEN_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オーディン神殿03", "オーディンシンデン　０３")
		.SetMonsters([
			MONSTER_ID_YELLOW_PRASMA,
			MONSTER_ID_SUKEGORT_BROWN,
			MONSTER_ID_SUKEGORT_BLACK,
			MONSTER_ID_RANDGRIS_GHOST,
			MONSTER_ID_RANDGRIS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド01", "ラヘルフィールド　０１")
		.SetMonsters([
			MONSTER_ID_STAPO,
			MONSTER_ID_DROSERA,
			MONSTER_ID_MASSKIPLER,
			MONSTER_ID_GRYPHON,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド03", "ラヘルフィールド　０３")
		.SetMonsters([
			MONSTER_ID_ROWEEN,
			MONSTER_ID_DROSERA,
			MONSTER_ID_STAPO,
			MONSTER_ID_GALION,
			MONSTER_ID_ATLOS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド04", "ラヘルフィールド　０４")
		.SetMonsters([
			MONSTER_ID_ROWEEN,
			MONSTER_ID_STAPO,
			MONSTER_ID_GALION,
			MONSTER_ID_ATLOS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド05", "ラヘルフィールド　０５")
		.SetMonsters([
			MONSTER_ID_HILLWIND_RANCER,
			MONSTER_ID_HILLWIND,
			MONSTER_ID_DROSERA,
			MONSTER_ID_GEOGRAPHER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド06", "ラヘルフィールド　０６")
		.SetMonsters([
			MONSTER_ID_GEOGRAPHER,
			MONSTER_ID_METALING,
			MONSTER_ID_DROSERA,
			MONSTER_ID_MASSKIPLER,
			MONSTER_ID_STAPO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_08");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド08", "ラヘルフィールド　０８")
		.SetMonsters([
			MONSTER_ID_DROSERA,
			MONSTER_ID_MASSKIPLER,
			MONSTER_ID_STAPO,
			MONSTER_ID_CHMERA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_12");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド12", "ラヘルフィールド　１２")
		.SetMonsters([
			MONSTER_ID_STAPO,
			MONSTER_ID_DROPPS,
			MONSTER_ID_POPORING,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フレイヤ大神殿　聖域01", "フレイヤダイシンデン　セイイキ　０１")
		.SetMonsters([
			MONSTER_ID_GLEMRIN,
			MONSTER_ID_BIHOLDER,
			MONSTER_ID_VAMBERG,
			MONSTER_ID_HODOREMLIN,
			MONSTER_ID_AICIRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フレイヤ大神殿　聖域02", "フレイヤダイシンデン　セイイキ　０２")
		.SetMonsters([
			MONSTER_ID_GLEMRIN,
			MONSTER_ID_BIHOLDER,
			MONSTER_ID_VAMBERG,
			MONSTER_ID_HODOREMLIN,
			MONSTER_ID_AICIRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フレイヤ大神殿　聖域03", "フレイヤダイシンデン　セイイキ　０３")
		.SetMonsters([
			MONSTER_ID_GLEMRIN,
			MONSTER_ID_BIHOLDER,
			MONSTER_ID_HODOREMLIN,
			MONSTER_ID_SEEKER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フレイヤ大神殿　聖域04", "フレイヤダイシンデン　セイイキ　０４")
		.SetMonsters([
			MONSTER_ID_GLEMRIN,
			MONSTER_ID_BIHOLDER,
			MONSTER_ID_SEEKER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_FREYA_DAISHINDEN_SEIKI_05");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フレイヤ大神殿　聖域05", "フレイヤダイシンデン　セイイキ　０５")
		.SetMonsters([
			MONSTER_ID_HODOREMLIN,
			MONSTER_ID_AICIRA,
			MONSTER_ID_SEEKER,
			MONSTER_ID_EKIO,
			MONSTER_ID_AGAGU,
			MONSTER_ID_GROOM_UNDERNIGHT,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KORINO_DOKUTSU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("氷の洞窟01", "コオリノドウクツ　０１")
		.SetMonsters([
			MONSTER_ID_HILLWIND_RANCER,
			MONSTER_ID_MASSKIPLER,
			MONSTER_ID_SHIROMA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KORINO_DOKUTSU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("氷の洞窟02", "コオリノドウクツ　０２")
		.SetMonsters([
			MONSTER_ID_ICECLE,
			MONSTER_ID_GAZETY,
			MONSTER_ID_SNOWAR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KORINO_DOKUTSU_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("氷の洞窟03", "コオリノドウクツ　０３")
		.SetMonsters([
			MONSTER_ID_ICECLE,
			MONSTER_ID_GAZETY,
			MONSTER_ID_ICETITAN,
			MONSTER_ID_KTORURANUCUS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VEINS_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ベインスフィールド01", "ベインスフィールド　０１")
		.SetMonsters([
			MONSTER_ID_ROWEEN,
			MONSTER_ID_STAPO,
			MONSTER_ID_SCORPION,
			MONSTER_ID_ATLOS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VEINS_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ベインスフィールド02", "ベインスフィールド　０２")
		.SetMonsters([
			MONSTER_ID_ROWEEN,
			MONSTER_ID_GOLEM,
			MONSTER_ID_STRUCTITE_GOLEM,
			MONSTER_ID_STAPO,
			MONSTER_ID_ATLOS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VEINS_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ベインスフィールド03", "ベインスフィールド　０３")
		.SetMonsters([
			MONSTER_ID_MAGMARIN,
			MONSTER_ID_STAPO,
			MONSTER_ID_SANDMAN,
			MONSTER_ID_SLEEPER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VEINS_FIELD_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ベインスフィールド04", "ベインスフィールド　０４")
		.SetMonsters([
			MONSTER_ID_SCORPION,
			MONSTER_ID_IRONFIST,
			MONSTER_ID_STAPO,
			MONSTER_ID_SLEEPER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VEINS_FIELD_06");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ベインスフィールド06", "ベインスフィールド　０６")
		.SetMonsters([
			MONSTER_ID_STAPO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VEINS_FIELD_07");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ベインスフィールド07", "ベインスフィールド　０７")
		.SetMonsters([
			MONSTER_ID_SIDEWINDER,
			MONSTER_ID_REGRLO,
			MONSTER_ID_HITODE,
			MONSTER_ID_OBAKEGAI,
			MONSTER_ID_STAPO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THOR_KAZAN_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("トール火山01", "トールカザン　０１")
		.SetMonsters([
			MONSTER_ID_MAGMARIN,
			MONSTER_ID_IMP,
			MONSTER_ID_KARSER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THOR_KAZAN_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("トール火山02", "トールカザン　０２")
		.SetMonsters([
			MONSTER_ID_EXPLOSION,
			MONSTER_ID_GRIZZLY,
			MONSTER_ID_MAGMARIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THOR_KAZAN_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("トール火山03", "トールカザン　０３")
		.SetMonsters([
			MONSTER_ID_IMP,
			MONSTER_ID_BOW_GUARDIAN,
			MONSTER_ID_KARSER,
			MONSTER_ID_SWORD_GUARDIAN,
			MONSTER_ID_BYORG,
			MONSTER_ID_SARAMANDRA,
			MONSTER_ID_EFRITE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NAMONAKI_SHIMA_YORU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("名もなき島（夜）", "ナモナキシマ")
		.AddNameKana("名もなき島（夜）", "ナモナキシマ　ヨル")
		.SetMonsters([
			MONSTER_ID_GHOUL,
			MONSTER_ID_FLAME_SCALE,
			MONSTER_ID_HELL_POODLE,
			MONSTER_ID_BANCY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NAMONAKI_SHIMA_SHUDOIN_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("名もなき島　修道院01", "ナモナキシマ　シュウドウイン　０１")
		.SetMonsters([
			MONSTER_ID_HELL_POODLE,
			MONSTER_ID_RAGID_ZOMBIE,
			MONSTER_ID_ZOMBIE_THROATER,
			MONSTER_ID_BANCY,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NAMONAKI_SHIMA_SHUDOIN_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("名もなき島　修道院02", "ナモナキシマ　シュウドウイン　０２")
		.SetMonsters([
			MONSTER_ID_FLAME_SCALE,
			MONSTER_ID_RAGID_ZOMBIE,
			MONSTER_ID_ZOMBIE_THROATER,
			MONSTER_ID_NECROMANCER,
			MONSTER_ID_OCHITA_DAISHINKAN_HIBAMU,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NAMONAKI_SHIMA_SHUDOIN_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("名もなき島　修道院03", "ナモナキシマ　シュウドウイン　０３")
		.SetMonsters([
			MONSTER_ID_VERSEBB,
			MONSTER_ID_OUNO_SHIGAI,
			MONSTER_ID_HELLFLY,
			MONSTER_ID_KYOKA_FLAME_SCALE,
			MONSTER_ID_KYOKA_HELL_POODLE,
			MONSTER_ID_KYOKA_RAGID_ZOMBIE,
			MONSTER_ID_KYOKA_ZOMBIE_THROATER,
			MONSTER_ID_KYOKA_BANCY,
			MONSTER_ID_KYOKA_BANCY_MASTER,
			MONSTER_ID_KYOKA_NECROMANCER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MOSCOVIA_FIELD_00");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("モスコビアフィールド", "モスコビアフィールド　００")
		.AddNameKana("モスコビアフィールド00", "モスコビアフィールド　００")
		.SetMonsters([
			MONSTER_ID_CARAMEL,
			MONSTER_ID_LESS,
			MONSTER_ID_WOOD_GOBLIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MOSCOVIA_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("モスコビア（森）", "モスコビアフィールド　０１")
		.AddNameKana("モスコビアフィールド01", "モスコビア　モリ")
		.SetMonsters([
			MONSTER_ID_LESS,
			MONSTER_ID_WOOD_GOBLIN,
			MONSTER_ID_BABAYAGA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MOSCOVIA_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("モスコビア（深い森）", "モスコビアフィールド　０２")
		.AddNameKana("モスコビアフィールド02", "モスコビア　フカイモリ")
		.SetMonsters([
			MONSTER_ID_WOOD_GOBLIN,
			MONSTER_ID_BABAYAGA,
			MONSTER_ID_OOJAS,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MOSCOVIA_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("モスコビア（奥深い森）", "モスコビアフィールド　０３")
		.AddNameKana("モスコビアフィールド03", "モスコビア　オクブカイモリ")
		.SetMonsters([
			MONSTER_ID_BABAYAGA,
			MONSTER_ID_OOJAS,
			MONSTER_ID_MABUKA,
			MONSTER_ID_GOPINIK,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ZIGENNO_HAZAMA_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("次元の狭間01", "ジゲンノハザマ　０１")
		.SetMonsters([
			MONSTER_ID_GOLEM,
			MONSTER_ID_DROPPS,
			MONSTER_ID_PIKKI,
			MONSTER_ID_SUGOI_PIKKI,
			MONSTER_ID_METARURA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ZIGENNO_HAZAMA_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("次元の狭間03", "ジゲンノハザマ　０３")
		.SetMonsters([
			MONSTER_ID_MOROCNO_UTSUSHIMI_TENSHIKATA,
			MONSTER_ID_MOROCNO_UTSUSHIMI_BUSSHITSUKATA,
			MONSTER_ID_MOROCNO_UTSUSHIMI_NINGENKATA,
			MONSTER_ID_MOROCNO_UTSUSHIMI_SEREKATA,
			MONSTER_ID_KIZUTSUITA_MAO_MOROC,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ENDLESS_TOWER");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("エンドレスタワー専用モンスター", "エンドレスタワーセンヨウモンスター")
		.SetMonsters([
			MONSTER_ID_CHIYUNO_IBARA,
			MONSTER_ID_SOGEKINO_IHARA,
			MONSTER_ID_MAHONO_IHARA,
			MONSTER_ID_ZYOKANO_IHARA,
			MONSTER_ID_ENTVIEN,
			MONSTER_ID_NAHT_ZEEKER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPLENDIDE_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スプレンディッドフィールド01", "スプレンディッドフィールド　０１")
		.SetMonsters([
			MONSTER_ID_RUSIORA_VESPA,
			MONSTER_ID_AQUA_ELEMENTAL,
			MONSTER_ID_FIRA,
			MONSTER_ID_RINKO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPLENDIDE_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スプレンディッドフィールド02", "スプレンディッドフィールド　０２")
		.SetMonsters([
			MONSTER_ID_PINGIKYURA,
			MONSTER_ID_RUSIORA_VESPA,
			MONSTER_ID_HILLSLION,
			MONSTER_ID_DARK_PINGIKYURA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SPLENDIDE_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スプレンディッドフィールド03", "スプレンディッドフィールド　０３")
		.SetMonsters([
			MONSTER_ID_HILLSLION,
			MONSTER_ID_COLNUS,
			MONSTER_ID_NAGA,
			MONSTER_ID_TENDRIRURION,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MANUK_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("マヌクフィールド01", "マヌクフィールド　０１")
		.SetMonsters([
			MONSTER_ID_NEPENTES,
			MONSTER_ID_HILLSLION,
			MONSTER_ID_SENTIPIDO_YOCHU,
			MONSTER_ID_BRADIUM_GOLEM,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MANUK_FIELD_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("マヌクフィールド02", "マヌクフィールド　０２")
		.SetMonsters([
			MONSTER_ID_TATACHO,
			MONSTER_ID_SENTIPIDO_YOCHU,
			MONSTER_ID_BRADIUM_GOLEM,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MANUK_FIELD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("マヌクフィールド03", "マヌクフィールド　０３")
		.SetMonsters([
			MONSTER_ID_TATACHO,
			MONSTER_ID_SENTIPIDO_YOCHU,
			MONSTER_ID_HARDROCK_MANMOS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CAMIDAL_TUNNEL");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("カミダルトンネル", "カミダルトンネル")
		.SetMonsters([
			MONSTER_ID_IKKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_SOKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_ROKKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_GOKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_IKKAKU_SUCARAB,
			MONSTER_ID_SOKAKU_SUCARAB,
			MONSTER_ID_ROKKAKU_SUCARAB,
			MONSTER_ID_GOKAKU_SUCARAB,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CAMIDAL_SANROKU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("カミダル山麓01", "カミダルサンロク　０１")
		.SetMonsters([
			MONSTER_ID_SENTIPIDO_YOCHU,
			MONSTER_ID_SENTIPIDO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CAMIDAL_SANROKU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("カミダル山麓02", "カミダルサンロク　０２")
		.SetMonsters([
			MONSTER_ID_DROMEDES,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YGGDRASSIL_CHUSHINBU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イグドラシル中心部", "イグドラシルチュウシンブ")
		.SetMonsters([
			MONSTER_ID_DORACONO_TAMAGO,
			MONSTER_ID_DORACO,
			MONSTER_ID_ANCIENT_TREE,
			MONSTER_ID_RATATOSK,
			MONSTER_ID_DONEIR,
			MONSTER_ID_DARK_SHADOW,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NIDHOGGNO_SU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ニーズヘッグの巣", "ニーズヘッグノス")
		.SetMonsters([
			MONSTER_ID_DARK_PINGIKYURA,
			MONSTER_ID_AQUA_ELEMENTAL,
			MONSTER_ID_FIRA,
			MONSTER_ID_RINKO,
			MONSTER_ID_ANCIENT_TREE,
			MONSTER_ID_DARK_SHADOW,
			MONSTER_ID_NEEZHEGNO_KAGE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BRASILIS_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ブラジリスフィールド01", "ブラジリスフィールド　０１")
		.SetMonsters([
			MONSTER_ID_SAVAGE,
			MONSTER_ID_DOKEBI,
			MONSTER_ID_KURUPIRA,
			MONSTER_ID_TOKAN,
			MONSTER_ID_JAGGER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TAKINO_NAKANO_DOKUTSU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("滝の中の洞窟01", "タキノナカノドウクツ　０１")
		.AddNameKana("ブラジリスダンジョン01", "ブラジリスダンジョン　０１")
		.SetMonsters([
			MONSTER_ID_HYDRA,
			MONSTER_ID_KUKRE,
			MONSTER_ID_TARAFROG,
			MONSTER_ID_PIRANHA,
			MONSTER_ID_IARA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TAKINO_NAKANO_DOKUTSU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("滝の中の洞窟02", "タキノナカノドウクツ　０２")
		.AddNameKana("ブラジリスダンジョン02", "ブラジリスダンジョン　０２")
		.SetMonsters([
			MONSTER_ID_HYDRA,
			MONSTER_ID_PIRANHA,
			MONSTER_ID_IARA,
			MONSTER_ID_KUBINASHI_RABA,
			MONSTER_ID_BOITATA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ORCNO_KIOKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("オークの記憶", "オークノキオク")
		.SetMonsters([
			MONSTER_ID_ORCSHUGOTAISHO,
			MONSTER_ID_ORCSOGEKIHE,
			MONSTER_ID_OCHITA_ORCNO_ONENEN,
			MONSTER_ID_OCHITA_ORCHERO,
			MONSTER_ID_MIKO_KARGARRASY,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SCARAB_HALL");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スカラバホール", "スカラバホール")
		.SetMonsters([
			MONSTER_ID_IKKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_SOKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_ROKKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_GOKAKU_SUCARABNO_TAMAGO,
			MONSTER_ID_IKKAKU_SUCARAB,
			MONSTER_ID_SOKAKU_SUCARAB,
			MONSTER_ID_ROKKAKU_SUCARAB,
			MONSTER_ID_GOKAKU_SUCARAB,
			MONSTER_ID_ZYOO_SUCARAB,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SCARAB_GARDEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("スカラバガーデン", "スカラバガーデン")
		.SetMonsters([
			MONSTER_ID_HERACULES_SUCARAB,
			MONSTER_ID_CAUCASIA_SUCARAB,
			MONSTER_ID_REGIUS_SUCARAB,
			MONSTER_ID_ATLAS_SUCARAB,
			MONSTER_ID_ZYOTE_SUCARAB,
			MONSTER_ID_HERACULES_SUCARABNO_TAMAGO,
			MONSTER_ID_CAUCASIA_SUCARABNO_TAMAGO,
			MONSTER_ID_REGIUS_SUCARABNO_TAMAGO,
			MONSTER_ID_ATLAS_SUCARABNO_TAMAGO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_DEWATA_FIELD_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("デワタフィールド01", "デワタフィールド　０１")
		.SetMonsters([
			MONSTER_ID_ALLIGATOR,
			MONSTER_ID_RAFURESIA,
			MONSTER_ID_ARNORDI,
			MONSTER_ID_GOKURAKUCHO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KURATOKA_KAZAN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("クラトカ火山", "クラトカカザン")
		.SetMonsters([
			MONSTER_ID_DEWATA_DRAGON,
			MONSTER_ID_SLEEPER,
			MONSTER_ID_MAGMARIN,
			MONSTER_ID_GOKURAKUCHO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ISTANA_DOKUTSU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イスタナ洞窟", "イスタナドウクツ")
		.SetMonsters([
			MONSTER_ID_CLAMP,
			MONSTER_ID_BANASPATY,
			MONSTER_ID_BUTOIJO,
			MONSTER_ID_REYAC,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BIFROST_NANBU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビフロスト南部", "ビフロストナンブ")
		.SetMonsters([
			MONSTER_ID_RUSIORA_VESPA,
			MONSTER_ID_NAGA,
			MONSTER_ID_UNGRA_MANTICE,
			MONSTER_ID_POMSPIDER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BIFROST_HOKUBU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビフロスト北部", "ビフロストホクブ")
		.SetMonsters([
			MONSTER_ID_MIMIN,
			MONSTER_ID_LITTLE_FARTUM,
			MONSTER_ID_PULSE,
			MONSTER_ID_UNGRA_MANTICE,
			MONSTER_ID_POMSPIDER,
			MONSTER_ID_HILLSLION,
			MONSTER_ID_COLNUS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KIRINO_MORI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("霧の森", "キリノモリ")
		.SetMonsters([
			MONSTER_ID_MIMIN,
			MONSTER_ID_LITTLE_FARTUM,
			MONSTER_ID_PULSE,
			MONSTER_ID_UNGRA_MANTICE,
			MONSTER_ID_POMSPIDER,
			MONSTER_ID_NEEDZHEG,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HOSHIAKARINO_SANGOSHO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("星明りの珊瑚礁", "ホシアカリノサンゴショウ")
		.SetMonsters([
			MONSTER_ID_SWORDFISH,
			MONSTER_ID_MARC,
			MONSTER_ID_PIRANHA,
			MONSTER_ID_SIORABA,
			MONSTER_ID_REDELMA,
			MONSTER_ID_WILDRIDER,
			MONSTER_ID_KOBUN_TAKO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BOKUTSUONO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("暴窟王の洞窟", "ボウクツオウノドウクツ")
		.SetMonsters([
			MONSTER_ID_HYDRA,
			MONSTER_ID_STAPO,
			MONSTER_ID_KOBUN_TAKO,
			MONSTER_ID_YOZINBO_IKA,
			MONSTER_ID_TORYOTAKONO_ASHI,
			MONSTER_ID_TORYOTAKO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CHIKA_HAISUIRO_BEGINNER");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("地下排水路（ビギナー）", "チカハイスイロ　ビギナー")
		.SetMonsters([
			MONSTER_ID_KODAINO_KUKRE,
			MONSTER_ID_SHINKAINO_KANI,
			MONSTER_ID_KODAINO_VADON,
			MONSTER_ID_SHINKAINO_CORNUTUS,
			MONSTER_ID_SHINKAINO_OBAKEGAI,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CHIKA_HAISUIRO_EXPERT");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("地下排水路（エキスパート）", "チカハイスイロ　エキスパート")
		.SetMonsters([
			MONSTER_ID_KODAINO_MARC,
			MONSTER_ID_KODAINO_SWORDFISH,
			MONSTER_ID_KODAINO_OVEAUNE,
			MONSTER_ID_HENINO_KAPPA,
			MONSTER_ID_HENINO_STROUF,
			MONSTER_ID_HENINO_ANOLIAN,
			MONSTER_ID_IKEINO_COELACANTH,
			MONSTER_ID_ANKOKUNO_COELACANTH,
			MONSTER_ID_HENINO_COELACANTH,
			MONSTER_ID_BOGYAKUNO_COELACANTH,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BARRIO_MAHIWAGA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バリオ・マヒワガ", "バリオ　マヒワガ")
		.SetMonsters([
			MONSTER_ID_TIKBARAN,
			MONSTER_ID_JEJERING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BARRIO_FOREST");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バリオ・フォレスト", "バリオ　フォレスト")
		.SetMonsters([
			MONSTER_ID_BUGISGIS,
			MONSTER_ID_ENCANT,
			MONSTER_ID_TIKBARAN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BUWAYANO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ブワヤの洞窟", "ブワヤノドウクツ")
		.SetMonsters([
			MONSTER_ID_BUWAYANO_KAGE,
			MONSTER_ID_BUWAYANO_TAMAGO,
			MONSTER_ID_HATARAKI_BUWAYA,
			MONSTER_ID_MIZUKUSA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BUWAYANO_SU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ブワヤの巣", "ブワヤノス")
		.SetMonsters([
			MONSTER_ID_BUWAYA,
			MONSTER_ID_BUWAYANO_KAGE,
			MONSTER_ID_BUWAYANO_TAMAGO,
			MONSTER_ID_HATARAKI_BUWAYA,
			MONSTER_ID_MIZUKUSA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BAKONAWANO_SUMIKA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("バコナワの棲み処", "バコナワノスミカ")
		.SetMonsters([
			MONSTER_ID_BAKONAWA,
			MONSTER_ID_BAKONAWANO_ISHI,
			MONSTER_ID_AKUMUNO_WAKWAK,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BYONGUNGO_BYOIN_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビョンウンゴ病院1F", "ビョンウンゴビョウイン　１カイ")
		.SetMonsters([
			MONSTER_ID_MANANANGAR,
			MONSTER_ID_MANKKURAM,
			MONSTER_ID_CHANAK,
			MONSTER_ID_WAKWAK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BYONGUNGO_BYOIN_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビョンウンゴ病院2F", "ビョンウンゴビョウイン　２カイ")
		.SetMonsters([
			MONSTER_ID_AKUMUNO_MANANANGAR,
			MONSTER_ID_AKUMUNO_MANKKURAM,
			MONSTER_ID_AKUMUNO_CHANAK,
			MONSTER_ID_AKUMUNO_WAKWAK,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_YAMINO_BYONGUNGO_BYOIN_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("闇のビョンウンゴ病院2階", "ヤミノビョンウンゴビョウイン　２カイ")
		.SetMonsters([
			MONSTER_ID_AKUMUNO_MANANANGAR,
			MONSTER_ID_AKUMUNO_MANKKURAM,
			MONSTER_ID_AKUMUNO_CHANAK,
			MONSTER_ID_AKUMUNO_WAKWAK,
			MONSTER_ID_BYONGUNGO,
			MONSTER_ID_FUNNUNO_BYONGUNGO,
			MONSTER_ID_IMIKINO_BYONGUNGO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GUILD_DUNGEON_KOZYOSEN_TE");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ギルドダンジョン　攻城戦TE", "ギルドダンジョン　コウジョウセンＴＥ")
		.SetMonsters([
			MONSTER_ID_WISH_MASCOT,
			MONSTER_ID_ARTIS_MASCOT,
			MONSTER_ID_SEIREN_VINSER_GUILD,
			MONSTER_ID_ELEMES_GAIL_GUILD,
			MONSTER_ID_MARGARETTE_SORIN_GUILD,
			MONSTER_ID_CECIL_DIMON_GUILD,
			MONSTER_ID_CATHERINE_KEILON_GUILD,
			MONSTER_ID_HAWARD_ALTIZEN_GUILD,
			MONSTER_ID_IGNISEM_CENIA_GUILD,
			MONSTER_ID_HYUCKEVINE_TRIS_GUILD,
			MONSTER_ID_IRENDO_EBESI_GUILD,
			MONSTER_ID_CAGAK_ICARUS_GUILD,
			MONSTER_ID_ZYOSEFINA,
			MONSTER_ID_RAUREL_VINDER_GUILD,
			MONSTER_ID_ARMAIA_DUNZE_GUILD,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_INISHIENO_GLASTHEIM");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("古のグラストヘイム（GHMD）", "イニシエノグラストヘイム　ＧＨＭＤ")
		.SetMonsters([
			MONSTER_ID_AMDARAIS,
			MONSTER_ID_SASOINO_MAGAN,
			MONSTER_ID_KYOKANNO_TEIENSHI,
			MONSTER_ID_URAMINO_MAID,
			MONSTER_ID_KUTSUNO_KAREI,
			MONSTER_ID_HAIKAISURU_YUMIHEI,
			MONSTER_ID_FUHAISHITA_HEISHI,
			MONSTER_ID_ONNENNO_KAHRITZBARG,
			MONSTER_ID_NOROWARETA_KISHI,
			MONSTER_ID_MAGOTTO,
			MONSTER_ID_OCHITA_SHIRONO_KISHI,
			MONSTER_ID_KUTSUNO_ROYALKNIGHT,
			MONSTER_ID_NOROWARETA_ROYALKNIGHT,
			MONSTER_ID_NOROINO_KAHRITZBARG,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AKUMUNO_GLASTHEIM_CATACUMBA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("悪夢のグラストヘイム　カタコンベ", "アクムノグラストヘイム　カタコンベ")
		.SetMonsters([
			MONSTER_ID_EVIL_DRUID,
			MONSTER_ID_MIMIC,
			MONSTER_ID_WRAITH,
			MONSTER_ID_DARK_ILLUSION,
			MONSTER_ID_NOROWARETA_BONUSHI,
			MONSTER_ID_DARAKUSHITA_SEISHOKUSHA,
			MONSTER_ID_NOROWARETA_HAKO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AKUMUNO_GLASTHEIM_KOZYO_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("悪夢のグラストヘイム　古城2F", "アクムノグラストヘイム　コジョウ　２カイ")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_RAIDRIC,
			MONSTER_ID_RAIDRIC_ARCHER,
			MONSTER_ID_ORGATOOTH,
			MONSTER_ID_EXCUTIONER,
			MONSTER_ID_MISTELTAIN,
			MONSTER_ID_WHISPER_FUSHI,
			MONSTER_ID_DARAKUSHITA_SEISHOKUSHA,
			MONSTER_ID_NOROWARETA_HAKO,
			MONSTER_ID_NOROWARETA_HON,
			MONSTER_ID_NOROWARETA_SAMAYOUMONO,
			MONSTER_ID_AKUMUNO_CHEMERA,
			MONSTER_ID_AKUMUNO_BAPHOMET,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HANAGA_SAKIHAZIMETA_DAICHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("花が咲き始めた大地", "ハナガサキハジメタダイチ")
		.SetMonsters([
			MONSTER_ID_MENBRITZ,
			MONSTER_ID_PETAR,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BIFROST_TOWER_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビフロストタワー1F", "ビフロストタワー　１カイ")
		.SetMonsters([
			MONSTER_ID_MENBRITZ,
			MONSTER_ID_PETAR,
			MONSTER_ID_CHENERE,
			MONSTER_ID_KISONSARETA_KOSHO,
			MONSTER_ID_VASSER_LIHITERUN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BIFROST_TOWER_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビフロストタワー2F", "ビフロストタワー　２カイ")
		.SetMonsters([
			MONSTER_ID_CHENERE,
			MONSTER_ID_KISONSARETA_KOSHO,
			MONSTER_ID_VASSER_LIHITERUN,
			MONSTER_ID_GERBU_LIHITERUN,
			MONSTER_ID_LYHT_HERSHAR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BIFROST_TOWER_3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ビフロストタワー3F", "ビフロストタワー　３カイ")
		.SetMonsters([
			MONSTER_ID_VASSER_LIHITERUN,
			MONSTER_ID_GERBU_LIHITERUN,
			MONSTER_ID_FUNKE_LIHITERUN,
			MONSTER_ID_FERS_LIHITERUN,
			MONSTER_ID_LYHT_HERSHAR,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_SARANO_KIOKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　サラの記憶", "エイユウノコンセキ　サラノキオク")
		.SetMonsters([
			MONSTER_ID_DAICHORO_AIRIN,
			MONSTER_ID_PHAIYONG_KEIBIHEI,
			MONSTER_ID_PHAIYONG_SHUGOHEI,
			MONSTER_ID_OTONASHI_KEIBIKEN,
			MONSTER_ID_KYOBONA_KEIBIKEN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_FACEWORM");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　フェイスワーム", "エイユウノコンセキ　フェイスワーム")
		.SetMonsters([
			MONSTER_ID_FACEWORM,
			MONSTER_ID_DARK_FACEWORM,
			MONSTER_ID_FACEWORMNO_TAMAGO,
			MONSTER_ID_MODOKUFUKURO,
			MONSTER_ID_FACEWORMNO_YOCHU,
			MONSTER_ID_ZYOO_FACEWORM,
			MONSTER_ID_ZYOO_FACEWORM_AKA,
			MONSTER_ID_ZYOO_FACEWORM_MIDORI,
			MONSTER_ID_ZYOO_FACEWORM_AO,
			MONSTER_ID_ZYOO_FACEWORM_KI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HORROR_OMOCHA_KOZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ホラーおもちゃ工場", "ホラーオモチャコウジョウ")
		.SetMonsters([
			MONSTER_ID_KAIKINA_SOSHOKUTREE,
			MONSTER_ID_ANSONI_HORROR,
			MONSTER_ID_PRESENT_HOSOTANTOSHA,
			MONSTER_ID_OMOCHAKOZYO_KEIBIEHEI,
			MONSTER_ID_HOSOSARETA_BOX,
			MONSTER_ID_KOZYOKEIBIINNO_TAMASHI,
			MONSTER_ID_PRESENTGANAI_YURE,
			MONSTER_ID_HOSOSARENAKATTA_NINGYO,
			MONSTER_ID_SUTERARETA_KUMANINGYO,
			MONSTER_ID_SELINE_KIMI,
			MONSTER_ID_KIMINO_GENEI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_GEFFEN_MAHO_TAIKAI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　ゲフェン魔法大会", "エイユウノコンセキ　ゲフェンマホウタイカイ")
		.SetMonsters([
			MONSTER_ID_ARUHI,
			MONSTER_ID_DIO_ANEMOS,
			MONSTER_ID_BLACK_KANARY,
			MONSTER_ID_HIPIA_SNIKI,
			MONSTER_ID_BILLY_COSRULEATH,
			MONSTER_ID_PHEMON,
			MONSTER_ID_ORDR,
			MONSTER_ID_BLUTO_HAZE,
			MONSTER_ID_KUROMA,
			MONSTER_ID_IPHODOS,
			MONSTER_ID_LECHENIE,
			MONSTER_ID_YUMEHIME,
			MONSTER_ID_JOO,
			MONSTER_ID_DIWAI,
			MONSTER_ID_PHEI_KANAVIAN,
			MONSTER_ID_ALPHON,
			MONSTER_ID_ALPHON_JR,
			MONSTER_ID_FENRIR,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("捻じれた時間の時計塔　地上1F", "ネジレタジカンノトケイトウ　チジョウ１カイ")
		.AddNameKana("時計塔ナイトメア　地上1F", "トケイトウナイトメア　チジョウ１カイ")
		.SetMonsters([
			MONSTER_ID_NOROWARETA_HAKO,
			MONSTER_ID_NOROWARETA_HON,
			MONSTER_ID_TIMEKEEPER,
			MONSTER_ID_NEOPANK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("捻じれた時間の時計塔　地上2F", "ネジレタジカンノトケイトウ　チジョウ２カイ")
		.AddNameKana("時計塔ナイトメア　地上2F", "トケイトウナイトメア　チジョウ２カイ")
		.SetMonsters([
			MONSTER_ID_NOROWARETA_HAKO,
			MONSTER_ID_NOROWARETA_HON,
			MONSTER_ID_BIGBENG,
			MONSTER_ID_BIGBELL,
			MONSTER_ID_TIMEKEEPER,
			MONSTER_ID_ARCELDER,
			MONSTER_ID_NEOPANK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("捻じれた時間の時計塔　地上3F", "ネジレタジカンノトケイトウ　チジョウ３カイ")
		.AddNameKana("時計塔ナイトメア　地上3F", "トケイトウナイトメア　チジョウ３カイ")
		.SetMonsters([
			MONSTER_ID_NOROWARETA_HAKO,
			MONSTER_ID_NOROWARETA_HON,
			MONSTER_ID_BIGBELL,
			MONSTER_ID_TIMEKEEPER,
			MONSTER_ID_ARCELDER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NEZIRETA_ZIKANNO_TOKEITO_4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("捻じれた時間の時計塔　地上4F", "ネジレタジカンノトケイトウ　チジョウ４カイ")
		.AddNameKana("時計塔ナイトメア　地上4F", "トケイトウナイトメア　チジョウ４カイ")
		.SetMonsters([
			MONSTER_ID_ALICE,
			MONSTER_ID_NOROWARETA_HON,
			MONSTER_ID_TIMEKEEPER,
			MONSTER_ID_ARCELDER,
			MONSTER_ID_OWL_VAICOUNT,
			MONSTER_ID_OWL_MARKIS,
			MONSTER_ID_TIMEHOLDER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_FLAME_VALLEY");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("フレイムヴァレー", "フレイムヴァレー")
		.SetMonsters([
			MONSTER_ID_BOGYAKUNO_HAKO,
			MONSTER_ID_FLAME_CONDOR,
			MONSTER_ID_FLAME_FRILLDRA,
			MONSTER_ID_FLAME_GOLEM,
			MONSTER_ID_FLAME_SANDMAN,
			MONSTER_ID_FLAME_BUG,
			MONSTER_ID_SONIA,
			MONSTER_ID_FLAMEPIT,
			MONSTER_ID_ENKANO_MOROCNO_UTSUSHIMI,
			MONSTER_ID_YUGANDA_MOROCNO_UTSUSHIMI,
			MONSTER_ID_REIKINO_MOROCNO_UTSUSHIMI,
			MONSTER_ID_MOROCNO_UTSUSHIMI_TENSHIKATA,
			MONSTER_ID_MOROCNO_UTSUSHIMI_BUSSHITSUKATA,
			MONSTER_ID_MOROCNO_UTSUSHIMI_NINGENKATA,
			MONSTER_ID_MOROCNO_UTSUSHIMI_SEREKATA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BIOSNO_SHIMA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ビオスの島", "ビオスノシマ")
		.SetMonsters([
			MONSTER_ID_SEIZYANO_ORCBABY,
			MONSTER_ID_SEIZYANO_KO_DESSERT_WOLF,
			MONSTER_ID_SEIZYANO_MARINESPHERE,
			MONSTER_ID_SEIZYANO_ORCWORRIOR,
			MONSTER_ID_SEIZYANO_DESSERT_WOLF,
			MONSTER_ID_SEIZYANO_PHEN,
			MONSTER_ID_SHISHANO_ORCZOMBIE,
			MONSTER_ID_SHISHANO_BERIT,
			MONSTER_ID_SHISHANO_MEGARODON,
			MONSTER_ID_SHINIGAMI_UNK,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MORSNO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("モルスの洞窟", "モルスノドウクツ")
		.SetMonsters([
			MONSTER_ID_MORS_GHOLE,
			MONSTER_ID_MORS_OSIRIS,
			MONSTER_ID_MORS_ARCHER,
			MONSTER_ID_MORS_WRAITH,
			MONSTER_ID_MORS_BERIT,
			MONSTER_ID_MORS_ROOD,
			MONSTER_ID_MORS_PLANKTON,
			MONSTER_ID_MOROC_QUESTION,
			MONSTER_ID_MORS_MADOSHI,
			MONSTER_ID_MORS_NECROMANCER,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MAZINDEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("魔神殿", "マジンデン")
		.SetMonsters([
			MONSTER_ID_KOKINO_MANA,
			MONSTER_ID_SEIMEINO_MANA,
			MONSTER_ID_DAICHINO_MANA,
			MONSTER_ID_FLOST_SPIDER,
			MONSTER_ID_KYOKINO_KARSER,
			MONSTER_ID_KYOKINO_SARAMANDRA,
			MONSTER_ID_MAZINNOSHITO_AHATO,
			MONSTER_ID_MAZINNOSHITO_SHINAIM,
			MONSTER_ID_BURINARANEA,
			MONSTER_ID_MUSPERKOLE,
			MONSTER_ID_TAIKONO_MOROC,
			MONSTER_ID_ANSOKUNO_MOROC,
			MONSTER_ID_SAISEINO_HANMAZIN,
			MONSTER_ID_ZETSUBONOKAMI_MOROC,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_AKUMUNO_JITTER_BUG");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("悪夢のジターバグ", "アクムノジターバグ")
		.SetMonsters([
			MONSTER_ID_PELL,
			MONSTER_ID_SINGING_PELL,
			MONSTER_ID_SWING_PELL,
			MONSTER_ID_KISSME_PELL,
			MONSTER_ID_PIANO_ZITTER_BUG,
			MONSTER_ID_FORTE_ZITTER_BUG,
			MONSTER_ID_FORTESSISSIMO_ZITTER_BUG,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_MAZINNO_TO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　魔神の塔", "エイユウノコンセキ　マジンノトウ")
		.SetMonsters([
			MONSTER_ID_MAZINSEKI,
			MONSTER_ID_YUWAKUNO_MAZINNO_KAGE,
			MONSTER_ID_SAIGINO_MAZINNO_KAGE,
			MONSTER_ID_ZETSUNENNNO_MAZINNO_KAGE,
			MONSTER_ID_MAZINNO_KYOEI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_JUPEROS_HIGASHIGAWA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ジュピロス東側", "ジュピロスヒガシガワ")
		.SetMonsters([
			MONSTER_ID_KUSSAKUGATA_VERUSGEAR,
			MONSTER_ID_TEISATSUGATA_VERUSGEAR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERUS_GAIKAKU_TUNNEL");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウェルス外郭トンネル", "ウェルスガイカクトンネル")
		.SetMonsters([
			MONSTER_ID_TEISATSUGATA_VERUSGEAR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERUS_CHUO_HIROBA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウェルス中央広場", "ウェルスチュウオウヒロバ")
		.SetMonsters([
			MONSTER_ID_SHURIGATA_VERUSGEAR,
			MONSTER_ID_TANSAGATA_VERUSGEAR,
			MONSTER_ID_METSUBOSHUKUFUKUKYODAN_SHINZYA,
			MONSTER_ID_SMOG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERUS_KENKYUTO_WISH");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウェルス　研究棟-WISH", "ウェルス　ケンキュウトウウィッシュ")
		.AddNameKana("ウェルス　研究棟-WISH", "ウェルス　ケンキュウトウＷＩＳＨ")
		.SetMonsters([
			MONSTER_ID_SHURIGATA_VERUSGEAR_2,
			MONSTER_ID_TANSAGATA_VERUSGEAR_2,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERUS_ZIKKENTO_OPTATIO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウェルス　実験棟-OPTATIO", "ウェルス　ジッケントウオプタティオ")
		.AddNameKana("ウェルス　実験棟-OPTATIO", "ウェルス　ジッケントウＯＰＴＡＴＩＯ")
		.SetMonsters([
			MONSTER_ID_SHURIGATA_VERUSGEAR_2,
			MONSTER_ID_TANSAGATA_VERUSGEAR_2,
			MONSTER_ID_SMOG,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERUS_CHIKA_SHELLTER");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ウェルス　地下シェルター", "ウェルス　チカシェルター")
		.SetMonsters([
			MONSTER_ID_KUSSAKUGATA_VERUSGEAR,
			MONSTER_ID_CLAP,
			MONSTER_ID_GC109,
			MONSTER_ID_DR815,
			MONSTER_ID_HITSUNO_MOZYA,
			MONSTER_ID_CHINTSUNO_MOZYA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SAIGONO_HEYA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("最後の部屋", "サイゴノヘヤ")
		.SetMonsters([
			MONSTER_ID_GC109,
			MONSTER_ID_DR815,
			MONSTER_ID_SYSTEM_MESSAGE_1,
			MONSTER_ID_SYSTEM_MESSAGE_2,
			MONSTER_ID_T_W_O,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_CHARLESTON_KOZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("チャールストン工場", "チャールストンコウジョウ")
		.SetMonsters([
			MONSTER_ID_STEP,
			MONSTER_ID_ROCKSTEP,
			MONSTER_ID_KICKSTEP,
			MONSTER_ID_KICKAND_KICK,
			MONSTER_ID_CHARLESTON_3GOU,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HIMITSUNO_CHIKASHITSU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("秘密の地下室01", "ヒミツノチカシツ　０１")
		.AddNameKana("ピラミッドナイトメア01", "ピラミッドナイトメア　０１")
		.SetMonsters([
			MONSTER_ID_GRAVE_MINOTAUR,
			MONSTER_ID_GRAVE_BERIT,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HIMITSUNO_CHIKASHITSU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("秘密の地下室02", "ヒミツノチカシツ　０２")
		.AddNameKana("ピラミッドナイトメア02", "ピラミッドナイトメア　０２")
		.SetMonsters([
			MONSTER_ID_GRAVE_MIMIC,
			MONSTER_ID_GRAVE_ACRAUS,
			MONSTER_ID_GRAVE_CROWNMUMMY,
			MONSTER_ID_GRAVE_MUMMY,
			MONSTER_ID_GRAVE_BERIT,
			MONSTER_ID_AMENHOTEP,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_FENRIRTO_SARA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　フェンリルとサラ", "エイユウノコンセキ　フェンリルトサラ")
		.SetMonsters([
			MONSTER_ID_GIGANTES,
			MONSTER_ID_KIDONO_GIGANTES,
			MONSTER_ID_RED_GIGANTES,
			MONSTER_ID_SOFU_GIGANTES,
			MONSTER_ID_KIDONO_SOFU_GIGANTES,
			MONSTER_ID_SOFU_RED_GIGANTES,
			MONSTER_ID_SARANO_TSUKAIMA,
			MONSTER_ID_KYOAKUNA_GARION,
			MONSTER_ID_SARANO_GENEI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_HIKOSEN_SHUGEKI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　飛行船襲撃", "エイユウノコンセキ　ヒコウセンシュウゲキ")
		.SetMonsters([
			MONSTER_ID_WYBARN_KID,
			MONSTER_ID_WRESSER_WYBARN,
			MONSTER_ID_SKY_BIHOLDER,
			MONSTER_ID_SKY_GLEMLIN,
			MONSTER_ID_SKY_ROTERJAIRO,
			MONSTER_ID_WYBARN,
			MONSTER_ID_IKARINO_SENCHO_PELLROCK,
			MONSTER_ID_BOSOSHITA_SENCHO_PELLROCK,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_NOROINO_KENSHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　呪いの剣士", "エイユウノコンセキ　ノロイノケンシ")
		.SetMonsters([
			MONSTER_ID_OKUBYONA_KOKORO,
			MONSTER_ID_OSAERARENAI_FUNNU,
			MONSTER_ID_HIKUTSUNA_KOKORO,
			MONSTER_ID_SITTONO_HONOO,
			MONSTER_ID_KODOKUNA_YUME,
			MONSTER_ID_NIKUSHIMINO_KATAMARI,
			MONSTER_ID_TORIMODOSENU_AI,
			MONSTER_ID_BUTSUYOKUNO_KESHIN,
			MONSTER_ID_YOKUSEISHITA_HAKAISHODO,
			MONSTER_ID_KAKUSARETA_ZISONSHIN,
			MONSTER_ID_SENBOSURU_KAGE,
			MONSTER_ID_NOROINO_KONGEN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SENSHISHANO_HAKA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("戦死者の墓", "センシシャノハカ")
		.AddNameKana("生体獄", "セイタイゴク")
		.SetMonsters([
			MONSTER_ID_SEIREN_VINSER_GOKU,
			MONSTER_ID_CATHERINE_KEILON_GOKU,
			MONSTER_ID_CECIL_DIMON_GOKU,
			MONSTER_ID_MARGARETTE_SORIN_GOKU,
			MONSTER_ID_ELEMES_GAIL_GOKU,
			MONSTER_ID_HAWARD_ALTIZEN_GOKU,
			MONSTER_ID_RANDEL_RORENCE_GOKU,
			MONSTER_ID_CERIA_ARDE_GOKU,
			MONSTER_ID_ARFOSIO_BASIL_GOKU,
			MONSTER_ID_TRENTINI_GOKU,
			MONSTER_ID_CHENG_RIU_GOKU,
			MONSTER_ID_GARTY_UH_GOKU,
			MONSTER_ID_EMUR_PURAMEL_GOKU,
			MONSTER_ID_SEIREN_VINSER_GOKU_TSUYO,
			MONSTER_ID_CATHERINE_KEILON_GOKU_TSUYO,
			MONSTER_ID_CECIL_DIMON_GOKU_TSUYO,
			MONSTER_ID_MARGARETTE_SORIN_GOKU_TSUYO,
			MONSTER_ID_ELEMES_GAIL_GOKU_TSUYO,
			MONSTER_ID_HAWARD_ALTIZEN_GOKU_TSUYO,
			MONSTER_ID_RANDEL_RORENCE_GOKU_TSUYO,
			MONSTER_ID_CERIA_ARDE_GOKU_TSUYO,
			MONSTER_ID_ARFOSIO_BASIL_GOKU_TSUYO,
			MONSTER_ID_TRENTINI_GOKU_TSUYO,
			MONSTER_ID_CHENG_RIU_GOKU_TSUYO,
			MONSTER_ID_GARTY_UH_GOKU_TSUYO,
			MONSTER_ID_EMUR_PURAMEL_GOKU_TSUYO,
			MONSTER_ID_SEIREN_VINSER_GOKU_MVP,
			MONSTER_ID_CATHERINE_KEILON_GOKU_MVP,
			MONSTER_ID_CECIL_DIMON_GOKU_MVP,
			MONSTER_ID_MARGARETTE_SORIN_GOKU_MVP,
			MONSTER_ID_ELEMES_GAIL_GOKU_MVP,
			MONSTER_ID_HAWARD_ALTIZEN_GOKU_MVP,
			MONSTER_ID_RANDEL_RORENCE_GOKU_MVP,
			MONSTER_ID_CERIA_ARDE_GOKU_MVP,
			MONSTER_ID_ARFOSIO_BASIL_GOKU_MVP,
			MONSTER_ID_TRENTINI_GOKU_MVP,
			MONSTER_ID_CHENG_RIU_GOKU_MVP,
			MONSTER_ID_GARTY_UH_GOKU_MVP,
			MONSTER_ID_EMUR_PURAMEL_GOKU_MVP,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_TEIEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　庭園", "シンエンノカイロウ　テイエン")
		.AddNameKana("プロンテラ深淵　庭園", "プロンテラシンエン　テイエン")
		.SetMonsters([
			MONSTER_ID_HAYATENO_RATATOSKR,
			MONSTER_ID_SENPUNO_PULSE,
			MONSTER_ID_BOFUNO_GALAPAGO,
			MONSTER_ID_ELVIRA,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_MUZIHINA_GIOIANO_KAGE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_SAISHIZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　祭祀場", "シンエンノカイロウ　サイシジョウ")
		.AddNameKana("プロンテラ深淵　祭祀場", "プロンテラシンエン　サイシジョウ")
		.SetMonsters([
			MONSTER_ID_HOLY_ELDER,
			MONSTER_ID_RETRIBUTION,
			MONSTER_ID_HELL_WRAITH,
			MONSTER_ID_RUDO,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADESNO_KAGE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_KAIRO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　回廊", "シンエンノカイロウ　カイロウ")
		.AddNameKana("プロンテラ深淵　回廊", "プロンテラシンエン　カイロウ")
		.SetMonsters([
			MONSTER_ID_GEKISHINNO_DUNEYRR,
			MONSTER_ID_CHIWOHAU_GOLEM,
			MONSTER_ID_NEDUITA_TENKATAISHOGUN,
			MONSTER_ID_SOHION,
			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_SHOGUN_DAEHYONNO_KAGE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_KYU_SHIGAICHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　旧市街地", "シンエンノカイロウ　キュウシガイチ")
		.AddNameKana("プロンテラ深淵　旧市街地", "プロンテラシンエン　キュウシガイチ")
		.SetMonsters([
			MONSTER_ID_HEAT_RAYDRIC,
			MONSTER_ID_INFERNO_KNIGHT,
			MONSTER_ID_MAGMA_GOLEM,
			MONSTER_ID_LOLA,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_KYOSHINZYA_PYURIELNO_KAGE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_HYOSO_TEIEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　表層　庭園", "シンエンノカイロウ　ヒョウソウ　テイエン")
		.AddNameKana("プロンテラ深淵　表層　庭園", "プロンテラシンエン　ヒョウソウ　テイエン")
		.SetMonsters([
			MONSTER_ID_NANPUNO_RATATOSKR,
			MONSTER_ID_BIFUNO_PULSE,
			MONSTER_ID_KEIFUNO_GALAPAGO,
			MONSTER_ID_CHISANA_ELVIRA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_HYOSO_KAIRO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　表層　回廊", "シンエンノカイロウ　ヒョウソウ　カイロウ")
		.AddNameKana("プロンテラ深淵　表層　回廊", "プロンテラシンエン　ヒョウソウ　カイロウ")
		.SetMonsters([
			MONSTER_ID_RESSHINNO_DUNEYRR,
			MONSTER_ID_DAICHINO_GOLEM,
			MONSTER_ID_FUDONO_TENKATAISHOGUN,
			MONSTER_ID_CHISANA_SOHION,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_SHINRIN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　森林", "シンエンノカイロウ　シンリン")
		.AddNameKana("プロンテラ深淵　森林", "プロンテラシンエン　シンリン")
		.SetMonsters([
			MONSTER_ID_SHELTER,
			MONSTER_ID_SOLAS,
			MONSTER_ID_OVSERVATION,
			MONSTER_ID_RUDO,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_KEKOKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　渓谷", "シンエンノカイロウ　ケイコク")
		.AddNameKana("プロンテラ深淵　渓谷", "プロンテラシンエン　ケイコク")
		.SetMonsters([
			MONSTER_ID_FLEIM_GIGANTAIS,
			MONSTER_ID_FLEIM_SOLDIER,
			MONSTER_ID_FLEIM_ARCHER,
			MONSTER_ID_LOLA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_SOGEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　草原", "シンエンノカイロウ　ソウゲン")
		.AddNameKana("プロンテラ深淵　草原", "プロンテラシンエン　ソウゲン")
		.SetMonsters([
			MONSTER_ID_GRASS_WILO,
			MONSTER_ID_GRASS_MABUKA,
			MONSTER_ID_GRASS_ARGIOPE,
			MONSTER_ID_MEROLIN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINENNO_KAIRO_DOKUTSU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("深淵の回廊　洞窟", "シンエンノカイロウ　ドウクツ")
		.AddNameKana("プロンテラ深淵　洞窟", "プロンテラシンエン　ドウクツ")
		.SetMonsters([
			MONSTER_ID_ROCK_SCORPION,
			MONSTER_ID_ROCK_SNAKE,
			MONSTER_ID_ROCK_SAVAGE,
			MONSTER_ID_HIDERICH,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_INISHIENO_GLASTHEIM_HARD");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("古のグラストヘイム（GHMD）　ハード", "イニシエノグラストヘイム　ＧＨＭＤ　ハード")
		.SetMonsters([
			MONSTER_ID_ENKONNO_NIWASHI,
			MONSTER_ID_ENKONNO_MAID,
			MONSTER_ID_ENKONNO_KARE,
			MONSTER_ID_KYO_MAGOTTO,
			MONSTER_ID_ENKONNO_KYUHE,
			MONSTER_ID_ENKONNO_HESHI,
			MONSTER_ID_ENKONNO_KHALITZBURG,
			MONSTER_ID_ENKONNO_KISHI,
			MONSTER_ID_ENKONNO_SHIRONO_KISHI,
			MONSTER_ID_SHINO_ROYALKNIGHT,
			MONSTER_ID_ZETSUBONO_ROYALKNIGHT,
			MONSTER_ID_SATSURIKUNO_MAGAN,
			MONSTER_ID_MAGANNO_AMDARAIS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_CHIKA_KANGOKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("プロンテラ地下監獄", "プロンテラチカカンゴク")
		.SetMonsters([
			MONSTER_ID_FROZEN_WOLF,
			MONSTER_ID_LITTLE_FROZEN_WOLF,
			MONSTER_ID_TAFIE,
			MONSTER_ID_LITTLE_TAFIE,
			MONSTER_ID_WATCHER,
			MONSTER_ID_FUMETSUNO_WINDGHOST,
			MONSTER_ID_FUMETSUNO_NOROWARETAKISHI,
			MONSTER_ID_SHUZIN_243AD265,
			MONSTER_ID_SHUZIN_267BD184,
			MONSTER_ID_SHUZIN_265CM154,
			MONSTER_ID_SHUZIN_95EB72,
			MONSTER_ID_SHUZIN_117FM188,
			MONSTER_ID_SHUZIN_103GD214,
			MONSTER_ID_SHUZIN_55HK115,
			MONSTER_ID_OGONCHU,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SHINKOSARETA_PRONTERA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("侵攻されたプロンテラ", "シンコウサレタプロンテラ")
		.SetMonsters([
			MONSTER_ID_ZOMBIE_GUARD,
			MONSTER_ID_FUSHINO_GUNDANHEI,
			MONSTER_ID_FUSHINO_GUNDANHANCHO,
			MONSTER_ID_FUSHINO_GUNDANBUNTAICHO,
			MONSTER_ID_FUSHINO_GUNDANHEISHICHO,
			MONSTER_ID_FUSHINO_KUSHIZASHIGUNDANHEI,
			MONSTER_ID_FUSHINO_KIRISAKIGUNDANHEI,
			MONSTER_ID_FUSHINO_YATSUZAKIGUNDANHEI,
			MONSTER_ID_FUSHINO_GUNDANSHIREIKAN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PRONTERA_KUCHU_YOSAI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("プロンテラ空中要塞", "プロンテラクウチュウヨウサイ")
		.SetMonsters([
			MONSTER_ID_FUSHINO_RAGIDZOMBIE,
			MONSTER_ID_FUSHINO_AKUMUNO_KAGE,
			MONSTER_ID_FUSHINO_IKARINO_KAGE,
			MONSTER_ID_FUSHINO_NOROINO_KAGE,
			MONSTER_ID_FUSHINO_YOSAIHEI,
			MONSTER_ID_FUSHINO_ZOMBIE_MASTER,
			MONSTER_ID_FUSHINO_ZOMBIE_SLAUGHTER,
			MONSTER_ID_FUSHINO_NOROWARETA_KISHI,
			MONSTER_ID_FUSHINO_WINDGHOST,
			MONSTER_ID_FUSHINO_ZOMBIE,
			MONSTER_ID_S_J_HORNEST_WOLF,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KAKONO_GISHIKINO_MA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("過去の儀式の間", "カコノギシキノマ")
		.SetMonsters([
			MONSTER_ID_POWERFULL_AMDARAIS,
			MONSTER_ID_KAIZO_AMDARAIS,
			MONSTER_ID_ZIKKENTAI_AMDARAIS,
			MONSTER_ID_POWERFULL_A_SKELETON,
			MONSTER_ID_POWERFULL_SKELETON,
			MONSTER_ID_POWERFULL_S_SKELETON,
			MONSTER_ID_BIJOU,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HEART_HUNTER_GUNZI_KICHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ハートハンター軍事基地", "ハートハンターグンジキチ")
		.SetMonsters([
			MONSTER_ID_EABUL,
			MONSTER_ID_HEART_HUNTER_FW,
			MONSTER_ID_HEART_HUNTER_BC,
			MONSTER_ID_SNIPE_GUARD,
			MONSTER_ID_ASSALT_GUARD,
			MONSTER_ID_KILLER_GUARD,
			MONSTER_ID_HEART_HUNTER_LEADER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERNAR_KENKYUZYO_A_B");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ヴェルナー研究所　Ａ・Ｂ棟", "ヴェルナーケンキュウジョ　Ａトウ　Ｂトウ")
		.SetMonsters([
			MONSTER_ID_ZIKKENYOTAI_MUCAR_KATA,
			MONSTER_ID_ZIKKENYOTAI_DROSERA_KATA,
			MONSTER_ID_ZIKKENYOTAI_PIKKI_KATA,
			MONSTER_ID_ZIKKENYOTAI_CONDOR_KATA,
			MONSTER_ID_ZIKKENYOTAI_METALIN_KATA,
			MONSTER_ID_ZIKKENYOTAI_MAGMALIN_KATA,
			MONSTER_ID_ZIKKENYOTAI_GOAT_KATA,
			MONSTER_ID_ZIKKENYOTAI_SAVAGE_KATA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERNAR_KENKYUZYO_C_D");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ヴェルナー研究所　Ｃ・Ｄ棟", "ヴェルナーケンキュウジョ　Ｃトウ　Ｄトウ")
		.SetMonsters([
			MONSTER_ID_ZIKKENSETAI_MUCAR_KATA,
			MONSTER_ID_ZIKKENSETAI_DROSERA_KATA,
			MONSTER_ID_ZIKKENSETAI_PIKKI_KATA,
			MONSTER_ID_ZIKKENSETAI_CONDOR_KATA,
			MONSTER_ID_ZIKKENSETAI_METALIN_KATA,
			MONSTER_ID_ZIKKENSETAI_MAGMALIN_KATA,
			MONSTER_ID_ZIKKENSETAI_GOAT_KATA,
			MONSTER_ID_ZIKKENSETAI_SAVAGE_KATA,

			MONSTER_ID_HUMANOID_CHIMERA,
			MONSTER_ID_MATTER_CHIMERA,
			MONSTER_ID_VENOM_CHIMERA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_VERNAR_KENKYUZYO_CHUO_SHITSU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ヴェルナー研究所　中央室", "ヴェルナーケンキュウジョ　チュウオウシツ")
		.SetMonsters([
			MONSTER_ID_YSF01_SEIREN,
			MONSTER_ID_HEART_HUNTER_KEBIHE,
			MONSTER_ID_CUTIE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KIWAWA_SABAKU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("キワワ砂漠01", "キワワサバク０１")
		.SetMonsters([
			MONSTER_ID_ROUND_RIDER,
			MONSTER_ID_SIDE_RIDER,
			MONSTER_ID_BLADE_RIDER,
			MONSTER_ID_COVOTE,
			MONSTER_ID_GALION,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KIWAWA_SABAKU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("キワワ砂漠02", "キワワサバク０２")
		.SetMonsters([
			MONSTER_ID_ROUND_RIDER,
			MONSTER_ID_SIDE_RIDER,
			MONSTER_ID_BLADE_RIDER,
			MONSTER_ID_COVOTE,
			MONSTER_ID_GALION,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ROCKRIDGE_KOZAN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ロックリッジ鉱山", "ロックリッジコウザン")
		.SetMonsters([
			MONSTER_ID_TOP_ROUND_RIDER,
			MONSTER_ID_TOP_SIDE_RIDER,
			MONSTER_ID_TOP_BLADE_RIDER,
			MONSTER_ID_GASTER,
			MONSTER_ID_BULLILIGHT,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ROCKRIDGE_CHIKA_GAI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ロックリッジ地下街", "ロックリッジチカガイ")
		.SetMonsters([
			MONSTER_ID_DEVILS_FINGERS,
			MONSTER_ID_CARNIVARAUS,
			MONSTER_ID_PLASMA_RAT,
			MONSTER_ID_CLAMP,
			MONSTER_ID_SANYOCHU,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIGONO_IKUSA_SHOKYU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("永劫の戦　初級", "エイゴウノイクサ　０１")
		.AddNameKana("永劫の戦　初級", "エイゴウノイクサ　ショキュウ")
		.SetMonsters([
			MONSTER_ID_MINION_SHOKYU_KAHRITZBARG,
			MONSTER_ID_MINION_SHOKYU_KUTSUNO_ROYAL_KNIGHT,
			MONSTER_ID_MINION_SHOKYU_SHINNENNNO_KISHI,
			MONSTER_ID_MINION_SHOKYU_DARK_ILLUSION,
			MONSTER_ID_MINION_SHOKYU_BIHOLDER_MASTER,
			MONSTER_ID_GATE_KEEPER_SHOKYU,
			MONSTER_ID_SHINKA_ELEMES_SHOKYU,
			MONSTER_ID_SHINKA_CATHERINE_SHOKYU,
			MONSTER_ID_SHINKA_HOWARD_SHOKYU,
			MONSTER_ID_SHINKA_MARGUERITE_SHOKYU,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIGONO_IKUSA_CHUKYU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("永劫の戦　中級", "エイゴウノイクサ　０２")
		.AddNameKana("永劫の戦　中級", "エイゴウノイクサ　チュウキュウ")
		.SetMonsters([
			MONSTER_ID_MINION_CHUKYU_KAHRITZBARG,
			MONSTER_ID_MINION_CHUKYU_KUTSUNO_ROYAL_KNIGHT,
			MONSTER_ID_MINION_CHUKYU_SHINNENNNO_KISHI,
			MONSTER_ID_MINION_CHUKYU_DARK_ILLUSION,
			MONSTER_ID_MINION_CHUKYU_BIHOLDER_MASTER,
			MONSTER_ID_GATE_KEEPER_CHUKYU,
			MONSTER_ID_SHINKA_ELEMES_CHUKYU,
			MONSTER_ID_SHINKA_CATHERINE_CHUKYU,
			MONSTER_ID_SHINKA_HOWARD_CHUKYU,
			MONSTER_ID_SHINKA_MARGUERITE_CHUKYU,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIGONO_IKUSA_ZYOKYU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("永劫の戦　上級", "エイゴウノイクサ　０３")
		.AddNameKana("永劫の戦　上級", "エイゴウノイクサ　ジョウキュウ")
		.SetMonsters([
			MONSTER_ID_MINION_ZYOKYU_KAHRITZBARG,
			MONSTER_ID_MINION_ZYOKYU_KUTSUNO_ROYAL_KNIGHT,
			MONSTER_ID_MINION_ZYOKYU_SHINNENNNO_KISHI,
			MONSTER_ID_MINION_ZYOKYU_DARK_ILLUSION,
			MONSTER_ID_MINION_ZYOKYU_BIHOLDER_MASTER,
			MONSTER_ID_GATE_KEEPER_ZYOKYU,
			MONSTER_ID_SHINKA_ELEMES_ZYOKYU,
			MONSTER_ID_SHINKA_CATHERINE_ZYOKYU,
			MONSTER_ID_SHINKA_HOWARD_ZYOKYU,
			MONSTER_ID_SHINKA_MARGUERITE_ZYOKYU,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KUNRENNO_MA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("訓練の間", "クンレンノマ")
		.SetMonsters([
			 MONSTER_ID_KYOKA_DEADLY_WRAITH,
			MONSTER_ID_KYOKA_ZOMBIE_MASTER,
			MONSTER_ID_KYOKA_MINIDEMO,
			MONSTER_ID_KYOKA_DARK_PRIEST,
			MONSTER_ID_KYOKA_D_ILLUSION,
			MONSTER_ID_KYOKA_KYODAI_WHISPER,
			MONSTER_ID_KYOKA_DEVILTI,
			MONSTER_ID_KYOKA_GULE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RABIOL_HEIGEN_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラビオル平原01", "ラビオルヘイゲン　０１")
		.SetMonsters([
			MONSTER_ID_EGGRING,
			MONSTER_ID_LEAF_RUNATIC,
			MONSTER_ID_GRASS_FABLE,
			MONSTER_ID_BIG_EGGRING,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RABIOL_MORI_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラビオル森01", "ラビオルモリ　０１")
		.SetMonsters([
			MONSTER_ID_SWEET_FROG,
			MONSTER_ID_HUNTER_WOLF,
			MONSTER_ID_WILD_HONET,
			MONSTER_ID_TEISATSU_BASILLISK,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RYUNO_SU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍の巣01", "リュウノス　０１")
		.SetMonsters([
			MONSTER_ID_TEISATSU_BASILLISK,
			MONSTER_ID_TRANCE_SPORE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RYUNO_SU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍の巣02", "リュウノス　０２")
		.SetMonsters([
			MONSTER_ID_TOTSUGEKI_AKA_BASILLISK,
			MONSTER_ID_JUNGLE_MANDRAGORA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RYUNO_SU_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("龍の巣03", "リュウノス　０３")
		.SetMonsters([
			MONSTER_ID_TOTSUGEKI_MIDORI_BASILLISK,
			MONSTER_ID_FRUITS_POM_SPIDER,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_MOONLIGHT");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブムーンライト", "イリュージョンオブムーンライト")
		.AddNameKana("月夜花の悪夢", "ウォルヤファノアクム")
		.SetMonsters([
			MONSTER_ID_IKARINO_KUMIHO,
			MONSTER_ID_ENKONNO_MUNAC,
			MONSTER_ID_ENKONNO_BONGGONG,
			MONSTER_ID_ENKONNO_SOPHY,
			MONSTER_ID_ENKONNO_A_SKELTON,
			MONSTER_ID_IKARINO_UORYAFA,
			MONSTER_ID_SHINRINO_MAHOTSUKAI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_FROZEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブフローズン", "イリュージョンオブフローズン")
		.AddNameKana("フローズンメモリー", "フローズンメモリー")
		.SetMonsters([
			MONSTER_ID_IKARINO_GAZETY,
			MONSTER_ID_IKARINO_SNOWER,
			MONSTER_ID_IKARINO_ICE_TITAN,
			MONSTER_ID_SURUDOI_ICECLE,
			MONSTER_ID_KAKUSEI_KUTORURANUCKS,
			MONSTER_ID_KYORANSHITA_BOKENSHA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_VAMPIRE");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブヴァンパイア", "イリュージョンオブヴァンパイア")
		.AddNameKana("250ページ", "２５０ページ")
		.SetMonsters([
			MONSTER_ID_SWEET_NIGHTMARE,
			MONSTER_ID_MAT_DRAINRIER,
			MONSTER_ID_HOTARU_KINOKO,
			MONSTER_ID_YASURAGIWO_UBAWARESHI_SHIKI,
			MONSTER_ID_YASURAGIWO_UBAWARESHI_MOZYA,
			MONSTER_ID_YASURAGIWO_UBAWARESHI_MONO,
			MONSTER_ID_IKARINO_DRACULA,
			MONSTER_ID_BOMI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_KUYOKYU_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブ久陽宮01", "イリュージョンオブクヨウキュウ　０１")
		.AddNameKana("悲しみの陽居村", "カナシミノヨウキョムラ")
		.SetMonsters([
			MONSTER_ID_FUKITSUNA_HEAT_TURTLE,
			MONSTER_ID_FUKITSUNA_FREEZE_TURTLE,
			MONSTER_ID_FUKITSUNA_SOLID_TURTLE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_KUYOKYU_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブ久陽宮02", "イリュージョンオブクヨウキュウ　０２")
		.AddNameKana("薄暗い久陽宮", "ウスグライクヨウキュウ")
		.SetMonsters([
			MONSTER_ID_FUKITSUNA_SOLID_TURTLE,
			MONSTER_ID_FUKITSUNA_ASSALT_TURTLE,
			MONSTER_ID_FUKITSUNA_P_TURTLE,
			MONSTER_ID_FUKITSUNA_TURTLE_G,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_TEDDY_BEAR");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブテディベア", "イリュージョンオブテディベア")
		.AddNameKana("ネジリアン帝国", "ネジリアンテイコク")
		.SetMonsters([
			MONSTER_ID_AKAIRONO_BEARDOLL,
			MONSTER_ID_KIIRONO_BEARDOLL,
			MONSTER_ID_MIDORIIRONO_BEARDOLL,
			MONSTER_ID_SHIROIRONO_BEARDOLL,
			MONSTER_ID_AOIRONO_BEARDOLL,
			MONSTER_ID_RODOGATA_PITMAN,
			MONSTER_ID_ZYANENNO_OBISIDIAN,
			MONSTER_ID_TAMASHINO_HAHEN,
			MONSTER_ID_KAGAYAKU_BEARDOLL,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_RWANDA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブルワンダ", "イリュージョンオブルワンダ")
		.AddNameKana("幻想の北洞窟ルワンダ", "ゲンソウノキタドウクツルワンダ")
		.SetMonsters([
			MONSTER_ID_INISHIENO_S_GOLEM,
			MONSTER_ID_INISHIENO_SANYOCHU,
			MONSTER_ID_INISHIENO_FLAME_SHOOTER,
			MONSTER_ID_INISHIENO_MEGALIS,
			MONSTER_ID_INISHIENO_WOOTANG_SHOOTER,
			MONSTER_ID_INISHIENO_WOOTANG_FIGHTER,
			MONSTER_ID_INISHIENO_WOOTANG_GUARD,
			MONSTER_ID_INISHIENO_TAOGUNKA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SEITAI_KOGAKU_KENKYUZYONO_KIROKU_KAIWA_MODE");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("生体工学研究所の記録　会話モード", "セイタイコウガクケンキュウジョノキロク　カイワモード")
		.SetMonsters([
			MONSTER_ID_REKENBELL_KEIBIHEI,
			MONSTER_ID_REKENBELL_KEIBIHEICHO,
			MONSTER_ID_REGENSHLM_KAGAKUSHA,
			MONSTER_ID_MUMEINO_SWORDMAN_KAIWA_MODE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SEITAI_KOGAKU_KENKYUZYONO_KIROKU_SENTO_MODE");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("生体工学研究所の記録　戦闘モード", "セイタイコウガクケンキュウジョノキロク　セントウモード")
		.SetMonsters([
			MONSTER_ID_ELITE_KEIBIHEI,
			MONSTER_ID_ELITE_KEIBIHEICHO,
			MONSTER_ID_ELITE_KAGAKUSHA,
			MONSTER_ID_MUMEINO_SWORDMAN_SENTO_MODE,
			MONSTER_ID_MUMEINO_ACOLYTE,
			MONSTER_ID_MUMEINO_THIEF,
			MONSTER_ID_MUMEINO_MAGICIAN,
			MONSTER_ID_MUMEINO_MARCHANT,
			MONSTER_ID_MUMEINO_ARCHER,
			MONSTER_ID_MUMEINO_SWORDMAN_SENTO_MODE_MVP,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TOKUSHU_KEKAI_CHIKI_OS");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("特殊警戒地域オース", "トクシュケイカイチイキオース")
		.SetMonsters([
			MONSTER_ID_VENENUM,
			MONSTER_ID_TWIN_CAPUT,
			MONSTER_ID_DOLOR,
			MONSTER_ID_HEART_HUNTER_SANARE,
			MONSTER_ID_HEART_HUNTER_BELLARE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIKIZYO_RUDUS_1F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("廃棄場ルドゥス1F", "ハイキジョウルドゥス　１カイ")
		.SetMonsters([
			MONSTER_ID_VENENUM,
			MONSTER_ID_TWIN_CAPUT,
			MONSTER_ID_DOLOR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIKIZYO_RUDUS_2F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("廃棄場ルドゥス2F", "ハイキジョウルドゥス　２カイ")
		.SetMonsters([
			MONSTER_ID_R48_85_BESTIA,
			MONSTER_ID_HEART_HUNTER_M_SANARE,
			MONSTER_ID_HEART_HUNTER_M_BELLARE,
			MONSTER_ID_PLAGA,
			MONSTER_ID_HENSHU_DOLOR,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIKIZYO_RUDUS_3F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("廃棄場ルドゥス3F", "ハイキジョウルドゥス　３カイ")
		.SetMonsters([
			MONSTER_ID_HENSHU_VENENUM,
			MONSTER_ID_HENSHU_TWIN_CAPUT,
			MONSTER_ID_HENSHU_DOLOR,
			MONSTER_ID_HENSHU_PLAGA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_COR_MEMORIAL");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("コル・メモリアル", "コル　メモリアル")
		.AddNameKana("コルメモ", "コルメモ")
		.SetMonsters([
			MONSTER_ID_E_13EN0,
			MONSTER_ID_EA2S,
			MONSTER_ID_E_EA1L,
			MONSTER_ID_EL_A17T,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_OS_NIZI_SOSAKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("オース二次捜索", "オースニジソウサク")
		.SetMonsters([
			MONSTER_ID_TWIN_CAPUT_CP,
			MONSTER_ID_DOLOR_CP,
			MONSTER_ID_HEART_HUNTER_BELLARE_CP,
			MONSTER_ID_MIGEL,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILUSION_QUEST");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("イルシオンクエスト", "イルシオンクエスト")
		.SetMonsters([
			MONSTER_ID_POISON_GUSTER,
			MONSTER_ID_MIGEL_STORY,
			MONSTER_ID_KANASHIMINO_KUROB,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_LABYRINTH");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブラビリンス", "イリュージョンオブラビリンス")
		.AddNameKana("歪んだ迷宮の森", "ユガンダメイキュウノモリ")
		.SetMonsters([
			MONSTER_ID_KONTONNO_BAPHOMET_JR,
			MONSTER_ID_KONTONNO_HUNTERFLY,
			MONSTER_ID_KONTONNO_KILLER_MANTICE,
			MONSTER_ID_KONTONNO_MANTICE,
			MONSTER_ID_KONTONNO_POPORING,
			MONSTER_ID_KONTONNO_SIDEWINDER,
			MONSTER_ID_KONTONNO_STEMWORM,
			MONSTER_ID_KONTONNO_GHOSTRING,
			MONSTER_ID_KONTONNO_ANDREA,
			MONSTER_ID_KONTONNO_ANES,
			MONSTER_ID_KONTONNO_CELICIA,
			MONSTER_ID_KONTONNO_SILVANO,
			MONSTER_ID_KONTONNO_BAPHOMET,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIM_ABYSS");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("グラストヘイムアビス", "グラストヘイムアビス")
		.SetMonsters([
			MONSTER_ID_OSENSARETA_RAYDRIC,
			MONSTER_ID_OSENSARETA_RAYDRIC_A,
			MONSTER_ID_ICE_GARGOYLE,
			MONSTER_ID_OSENSARETA_STING,
			MONSTER_ID_PRISON_BREAKER,
			MONSTER_ID_ICE_GHOST,
			MONSTER_ID_FLAME_GHOST,
			MONSTER_ID_OSENSARETA_SAMAYOUMONO,
			MONSTER_ID_OSENSARETA_DARK_LORD,
			MONSTER_ID_OSENSARETA_BURINARANEA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NOGUE_ROAD_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ノーグロード3層", "ノーグロード　３ソウ")
		.SetMonsters([
			MONSTER_ID_KOKA_BLAZER,
			MONSTER_ID_KOKA_NIGHTMARE_TERROR,
			MONSTER_ID_KOKA_S_DELETER,
			MONSTER_ID_KOKA_G_DELETER,
			MONSTER_ID_KOKA_EXPLOSION,
			MONSTER_ID_KOKA_KAHO,
			MONSTER_ID_KOKA_RARVAGOLEM,
			MONSTER_ID_KOKA_MUSPERKOLE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GLASTHEIMNO_BOTSURAKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("グラストヘイムの没落", "グラストヘイムノボツラク")
		.AddNameKana("グラストヘイムEDDA", "グラストヘイムＥＤＤＡ")
		.AddNameKana("グラストヘイムEDDA", "グラストヘイムエッダ")
		.SetMonsters([
			MONSTER_ID_ANKOKUNO_KONOE_TAICHO,
			MONSTER_ID_ONNA_KISHINO_SHINEN,
			MONSTER_ID_KAHRITZBARG_KISHI,
			MONSTER_ID_SHIROKISHINO_SHINEN,
			MONSTER_ID_SHIRONO_KISHI,
			MONSTER_ID_NOROWARETA_HONONO_TOGE,
			MONSTER_ID_MAIDNO_SHINEN,
			MONSTER_ID_ZYUSONO_MAGAN,
			MONSTER_ID_NOROIWO_NOMIKONDA_O,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_TOKKUNNO_MA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("特訓の間", "トックンノマ")
		.SetMonsters([
			 MONSTER_ID_KYOKA_G_HONET,
			MONSTER_ID_KYOKA_G_SPIDER,
			MONSTER_ID_KYOKA_KILLER_MANTICE,
			MONSTER_ID_KYOKA_ANCIENT_WORM,
			MONSTER_ID_KYOKA_ARGOS,
			MONSTER_ID_KYOKA_MANTICE,
			MONSTER_ID_KYOKA_ARGIOPE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_GESUI_SHORIZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　下水処理場", "バルムントテイ　ゲスイショリジョウ")
		.SetMonsters([
			MONSTER_ID_GESUI_WATER_FALL,
			MONSTER_ID_GESUI_VENENUM,
			MONSTER_ID_GESUI_CLAMP,
			MONSTER_ID_ELITE_BERARE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_DAI1_MARYOKU_HATSUDENSHO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　第１魔力発電所", "バルムントテイ　ダイ１マリョクハツデンショ")
		.SetMonsters([
			MONSTER_ID_KAIHOSARETA_MARYOKU,
			MONSTER_ID_HEART_HUNTER_SC,
			MONSTER_ID_MARYOKU_CHUDOKU_DOROL,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_TEIEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　庭園", "バルムントテイ　テイエン")
		.SetMonsters([
			MONSTER_ID_KOSHOSHITA_BETA,
			MONSTER_ID_ZIDO_OSOZIKI_OMEGA,
			MONSTER_ID_GUARDIANNO_BUHIN,
			MONSTER_ID_HAIKAISURU_MADOSHO,
			MONSTER_ID_BOOK_WORM,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_TOSHOKAN_KIOKUNO_KAIRO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　図書館　記憶の回廊", "バルムントテイ　トショカン　キオクノカイロウ")
		.SetMonsters([
			MONSTER_ID_KOSHOSHITA_BETA,
			MONSTER_ID_HEART_HUNTER_SC,
			MONSTER_ID_HAIKAISURU_MADOSHO,
			MONSTER_ID_BOOK_WORM,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HOAN_KUIKI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("保安区域", "ホアンクイキ")
		.AddNameKana("バルムント邸　保安区域", "バルムントテイ　ホアンクイキ")
		.SetMonsters([
			MONSTER_ID_GUARDIANNO_BUHIN,
			MONSTER_ID_KENKYU_ZYOSHU_ZIDO_NINGYO,
			MONSTER_ID_TOKUSE_ALNOLDI,
			MONSTER_ID_DRY_RAFFLESIA,
			MONSTER_ID_RED_PEPPER_KAPPA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SUIZYO_SHOKUBUTSUEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("水上植物園", "スイジョウショクブツエン")
		.AddNameKana("バルムント邸　水上植物園", "バルムントテイ　スイジョウショクブツエン")
		.SetMonsters([
			MONSTER_ID_KOSHOSHITA_NIWASHI_BETA,
			MONSTER_ID_PAPIRA,
			MONSTER_ID_PAPIRA_KAI,
			MONSTER_ID_PAPIRA_RUBA,
			MONSTER_ID_BLUE_ARIES,
			MONSTER_ID_BELPOLTA,
			MONSTER_ID_BELPOLTE,
			MONSTER_ID_RED_ARIES,
			MONSTER_ID_SILVA_PAPIRIA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HEY_SWEETY");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ヘイ！スウィーティ！", "ヘイ　スウィーティー")
		.AddNameKana("バルムント邸　ヘイ！スウィーティ！", "バルムントテイ　ヘイ　スウィーティー")
		.SetMonsters([
			MONSTER_ID_ELITE_BERARE,
			MONSTER_ID_HEART_HUNTER_SC,
			MONSTER_ID_SWEETY,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ZIKANNI_WASURERARETA_SHIIKUZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("時間に忘れられた飼育場", "ジカンニワスレラレタシイクジョウ")
		.AddNameKana("バルムント邸　時間に忘れられた飼育場", "バルムントテイ　ジカンニワスレラレタシイクジョウ")
		.AddNameKana("ピタヤ", "ピタヤ")
		.SetMonsters([
			MONSTER_ID_YELLOW_PITAYA,
			MONSTER_ID_GREEN_PITAYA,
			MONSTER_ID_PURPLE_PITAYA,
			MONSTER_ID_BLUE_PITAYA,
			MONSTER_ID_RED_PITAYA,
			MONSTER_ID_BOSS_PITAYA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NOROWARETA_ZIGEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("呪われた次元", "ノロワレタジゲン")
		.AddNameKana("GHC", "ＧＨＣ")
		.AddNameKana("ヒメルメズ", "ヒメルメズ")
		.SetMonsters([
			MONSTER_ID_NOROINO_IBARA,
			MONSTER_ID_NOROWARETA_SHITSUZI,
			MONSTER_ID_NOROWARETA_RAYDRIC,
			MONSTER_ID_NOROWARETA_RAYDRIC_A,
			MONSTER_ID_HENBONO_KAHRITZBARG,
			MONSTER_ID_HENBONO_SHIROKISHI,
			MONSTER_ID_WAITO,
			MONSTER_ID_ZYUSATSUNO_AMDARAIS,
			MONSTER_ID_ZYUSATSUNO_HIMERMEZ,
			MONSTER_ID_DARAKUNO_MAGAN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_OTAMESHI_DOZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("お試し道場", "オタメシドウジョウ")
		.SetMonsters([
			MONSTER_ID_SANDBAG_MAN_MU_1,
			MONSTER_ID_SANDBAG_MAN_NEN_1,
			MONSTER_ID_SANDBAG_MAN_MU_4,
			MONSTER_ID_SANDBAG_MAN_MIZU_4,
			MONSTER_ID_SANDBAG_MAN_CHI_4,
			MONSTER_ID_SANDBAG_MAN_HI_4,
			MONSTER_ID_SANDBAG_MAN_KAZE_4,
			MONSTER_ID_SANDBAG_MAN_DOKU_4,
			MONSTER_ID_SANDBAG_MAN_SEI_4,
			MONSTER_ID_SANDBAG_MAN_YAMI_4,
			MONSTER_ID_SANDBAG_MAN_NEN_4,
			MONSTER_ID_SANDBAG_MAN_FUSHI_4,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_UNDER_WATER_ZYOSO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブアンダーウォーター 上層", "イリュージョンオブアンダーウォーター　ジョウソウ")
		.AddNameKana("紫色の深海洞窟 上層", "ムラサキイロノシンカイドウクツ　ジョウソウ")
		.SetMonsters([
			MONSTER_ID_SHINKAINO_OBEAUNE,
			MONSTER_ID_SHINKAINO_SROPHO,
			MONSTER_ID_SHINKAINO_HANGYOZIN,
			MONSTER_ID_SHINKAINO_MARSE,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_UNDER_WATER_KASO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブアンダーウォーター 下層", "イリュージョンオブアンダーウォーター　カソウ")
		.AddNameKana("紫色の深海洞窟 下層", "ムラサキイロノシンカイドウクツ　カソウ")
		.SetMonsters([
			MONSTER_ID_SHINKAINO_KING_DRAMOH,
			MONSTER_ID_SHINKAINO_STROUF,
			MONSTER_ID_SHINKAINO_SEDORA,
			MONSTER_ID_SHINKAINO_SWORD_FISH,
			MONSTER_ID_SHINKAINO_PHEN,
			MONSTER_ID_SHINKAINO_DEVIACE,
			MONSTER_ID_SHINKAINO_KRAKEN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_PHAROS_TODAI_CHIKA_MEIKYU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("ファロス燈台地下迷宮", "ファロストウダイチカメイキュウ")
		.SetMonsters([
			MONSTER_ID_MUGENNO_PORIN,
			MONSTER_ID_MUGENNO_LUNATIC,
			MONSTER_ID_MUGENNO_FABLE,
			MONSTER_ID_MUGENNO_PIKKI,
			MONSTER_ID_MUGENNO_CONDOR,
			MONSTER_ID_MUGENNO_WIRO,
			MONSTER_ID_MUGENNO_SPORE,
			MONSTER_ID_MUGENNO_POPORING,
			MONSTER_ID_MUGENNO_SMOKY,
			MONSTER_ID_MUGENNO_DOKEBI,
			MONSTER_ID_MUGENNO_BIG_FOOT,
			MONSTER_ID_MUGENNO_WORM_TAIL,
			MONSTER_ID_MUGENNO_WOLF,
			MONSTER_ID_MUGENNO_SNAKE,
			MONSTER_ID_MUGENNO_ANACONDA,
			MONSTER_ID_MUGENNO_MARIN,
			MONSTER_ID_MUGENNO_MUCAR,
			MONSTER_ID_MUGENNO_PECOPECO,
			MONSTER_ID_MUGENNO_DENIRO,
			MONSTER_ID_MUGENNO_PIERE,
			MONSTER_ID_MUGENNO_ANDRE,
			MONSTER_ID_MUGENNO_GOLEM,
			MONSTER_ID_MUGENNO_SCORPION,
			MONSTER_ID_MUGENNO_CHONGCHONG,
			MONSTER_ID_MUGENNO_METALRA,
			MONSTER_ID_MUGENNO_SAND_MAN,
			MONSTER_ID_MUGENNO_REGURURO,
			MONSTER_ID_MUGENNO_DRAGON_TAIL,
			MONSTER_ID_MUGENNO_GREEN_IGUANA,
			MONSTER_ID_MUGENNO_SEA_OTTA,
			MONSTER_ID_MUGENNO_GARAPAGO,
			MONSTER_ID_MUGENNO_OTTO,
			MONSTER_ID_MUGENNO_ALLIGATOR,
			MONSTER_ID_MUGENNO_MEGARODON,
			MONSTER_ID_MUGENNO_SANYOCHU,
			MONSTER_ID_MUGENNO_MEGALITH,
			MONSTER_ID_MUGENNO_DRIAD,
			MONSTER_ID_MUGENNO_TODO,
			MONSTER_ID_MUGENNO_SASURAI_OKAMI,
			MONSTER_ID_MUGENNO_VOCAL,
			MONSTER_ID_MUGENNO_ECLIPSE,
			MONSTER_ID_MUGENNO_CHIMERA,
			MONSTER_ID_MUGENNO_EDDGA,
			MONSTER_ID_MUGENNO_OSIRIS,
			MONSTER_ID_MUGENNO_FURIONI,
			MONSTER_ID_MUGENNO_OAK_HERO,
			MONSTER_ID_MUGENNO_TAO_GUNKA,
			MONSTER_ID_MUGENNO_RODDA_FLOG_TORIMAKI,
			MONSTER_ID_MUGENNO_WOLF_TORIMAKI,
			MONSTER_ID_MUGENNO_ROCKER_TORIMAKI,
			MONSTER_ID_MUGENNO_LUNATIC_TORIMAKI,
			MONSTER_ID_MUGENNO_GARGOIL_TORIMAKI,
			MONSTER_ID_MUGENNO_BIG_FOOT_TORIMAKI,
			MONSTER_ID_MUGENNO_A_MUMMY_TORIMAKI,
			MONSTER_ID_MUGENNO_SAND_MAN_TORIMAKI,
			MONSTER_ID_MUGENNO_HGIH_OAK_TORIMAKI,
			MONSTER_ID_MUGENNO_MEGALITH_1_TORIMAKI,
			MONSTER_ID_MUGENNO_MEGALITH_2_TORIMAKI,
			MONSTER_ID_MUGENNO_MEGALITH_3_TORIMAKI,
			MONSTER_ID_MUGENNO_MEGALITH_4_TORIMAKI,
			MONSTER_ID_KYUHEI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ILLUSION_OF_TWINS");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("イリュージョンオブツインズ", "イリュージョンオブツインズ")
		.AddNameKana("認識の庭", "ニンシキノニワ")
		.SetMonsters([
			MONSTER_ID_GUNYAGUNYASHITA_ARINO_TAMAGO,
			MONSTER_ID_DOKYONOARU_GAIAS,
			MONSTER_ID_DOKYONOARU_FAMILIER,
			MONSTER_ID_MAZIMENA_ANDRE,
			MONSTER_ID_MAZIMENA_ANDRENO_YOCHU,
			MONSTER_ID_MAZIMENA_DENIRO,
			MONSTER_ID_MAZIMENA_PIERE,
			MONSTER_ID_MAZIMENA_HETAI_ANDRE,
			MONSTER_ID_MAZIMENA_BITATA,
			MONSTER_ID_MUKUCHINA_MAYA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_KOZAN_DUNGEON_03");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("鉱山ダンジョン03", "コウザンダンジョン　０３")
		.SetMonsters([
			MONSTER_ID_ABYSS_MAN,
			MONSTER_ID_WHITE_PORCELIO,
			MONSTER_ID_TOXICIOUS,
			MONSTER_ID_POISONOUS,
			MONSTER_ID_GREEN_NEO_MINERAL,
			MONSTER_ID_PURPLE_NEO_MINERAL,
			MONSTER_ID_WHITE_NEO_MINERAL,
			MONSTER_ID_RED_NEO_MINERAL,
			MONSTER_ID_JEWEL,
			MONSTER_ID_JEWELY_ANT,
			MONSTER_ID_JEWGOLY_ANT,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("アビスレイク地下洞窟04", "アビスレイクチカドウクツ　０４")
		.SetMonsters([
			MONSTER_ID_TREASURE_MIMIC,
			MONSTER_ID_PURPLE_PHEROS,
			MONSTER_ID_SILVER_OSIDOS,
			MONSTER_ID_BLACK_OSIDOS,
			MONSTER_ID_BONE_PHEROS,
			MONSTER_ID_BONE_OSIDOS,
			MONSTER_ID_BONE_DATALZAURUS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_INISHIENO_ODIN_SHINDEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("古のオーディン神殿", "イニシエノオーディンシンデン")
		.SetMonsters([
			MONSTER_ID_ARC_PLASMA,
			MONSTER_ID_SPECTRAM_PLASMA,
			MONSTER_ID_ANGEGOLT_BLUE,
			MONSTER_ID_ANGEGOLT_PINK,
			MONSTER_ID_HOLY_PRUS,
			MONSTER_ID_HOLY_SKOGLE,
			MONSTER_ID_INGRID_GHOST,
			MONSTER_ID_REGINREIF_GHOST,
			MONSTER_ID_INGRID,
			MONSTER_ID_REGINREIF,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_THANATOSUNO_KIOKU");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("タナトスの記憶", "タナトスノキオク")
		.SetMonsters([
			MONSTER_ID_VOID_MIMIC,
			MONSTER_ID_ELDEST,
			MONSTER_ID_CROW_DUKE,
			MONSTER_ID_CROW_BARON,
			MONSTER_ID_BOOK_OF_DEATH,
			MONSTER_ID_INORU_MONO,
			MONSTER_ID_KOFUKUWO_ATAERU_MONO,
			MONSTER_ID_KYOKANSURU_MONO,
			MONSTER_ID_HOHOEMU_MONO,
			MONSTER_ID_REITETSUNA_SHIKKOSURU_MONO,
			MONSTER_ID_GENKAKUNA_KANSHISURU_MONO,
			MONSTER_ID_FUBINNA_HOGOSURU_MONO,
			MONSTER_ID_MUZYAKINA_NAGUSAMERU_MONO,
			MONSTER_ID_THANATOSUNO_KIOKU_ZETSUBO,
			MONSTER_ID_THANATOSUNO_KIOKU_KANASHIMI,
			MONSTER_ID_THANATOSUNO_KIOKU_KUNO,
			MONSTER_ID_THANATOSUNO_KIOKU_ZOUO,
			MONSTER_ID_THANATOSUNO_KIOKU_KOKAI,
			MONSTER_ID_THANATOSUNO_KIOKU_ENBO,
			MONSTER_ID_THANATOSUNO_KIOKU_KYOFU,
			MONSTER_ID_THANATOSUNO_KIOKU_FUNNU,
			MONSTER_ID_HASONSHITA_THANATOSNO_KIOKU,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("廃棄実験体遊技場ルドゥス4階", "ハイキジッケンタイユウギジョウルドゥス４カイ")
		.SetMonsters([
			MONSTER_ID_GIANT_CAPUT,
			MONSTER_ID_DOLORIAN,
			MONSTER_ID_PLAGARION,
			MONSTER_ID_DEADRE,
			MONSTER_ID_VENEDI,
			MONSTER_ID_R001_BESTIA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NIFLHEIM_DUNGEON_MOZYANO_ENKAIZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ニブルヘイムダンジョン（亡者の宴会場）", "ニブルヘイムダンジョン　モウジャノエンカイジョウ")
		.SetMonsters([
			MONSTER_ID_GAN_CEANN,
			MONSTER_ID_BRUTAL_MURDER,
			MONSTER_ID_GHOST_CUBE,
			MONSTER_ID_LUDE_GAL,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ニブルヘイムダンジョン（崩れたオペラハウス）", "ニブルヘイムダンジョン　クズレタオペラハウス")
		.SetMonsters([
			MONSTER_ID_DISGUISER,
			MONSTER_ID_GROTE,
			MONSTER_ID_PIERROT_ZOIST,
			MONSTER_ID_BLUE_MOON_LOLIRURI,
			MONSTER_ID_SHINO_DAIMAZYO,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　大浴場メディタティオ", "バルムントテイ　ダイヨクジョウメディタティオ")
		.SetMonsters([
			MONSTER_ID_KOSHOSHITA_SESOGATA_BETA_1_KATA,
			MONSTER_ID_KOSHOSHITA_SESOGATA_BETA_2_KATA,
			MONSTER_ID_NETTO_SWORD_FISH,
			MONSTER_ID_NETTO_PIRANHA,
			MONSTER_ID_NETTO_PHEN,
			MONSTER_ID_NETTO_MARC,
			MONSTER_ID_YOKUZYO_KANRISHA_BETA_1_KATA,
			MONSTER_ID_YOKUZYO_KANRISHA_BETA_2_KATA,
			MONSTER_ID_SEIKINNO_HIME,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　貯蔵庫タルタロス", "バルムントテイ　チョゾウコタルタロス")
		.SetMonsters([
			MONSTER_ID_KOSHOSHITA_KEBIGATA_BETA,
			MONSTER_ID_KOSHOSHITA_ZIDO_OSOZIKI_OMEGA,
			MONSTER_ID_KOSHOSHITA_SOKO_KANRISHA_BETA,
			MONSTER_ID_ZYOKYU_HEART_HUNTER_SC,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("バルムント邸　第2魔力発電所", "バルムントテイ　ダイ２マリョクハツデンショ")
		.SetMonsters([
			MONSTER_ID_KYORYOKUNA_MARYOKU,
			MONSTER_ID_SURUDOI_MARYOKU,
			MONSTER_ID_MARYOKU_CHUDOKU_SANARE,
			MONSTER_ID_MARYOKU_CHUDOKU_PLAGA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HOAN_KUIKI_HARD");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("保安区域（ハード）", "ホアンクイキ　ハアト")
		.AddNameKana("バルムント邸　保安区域（ハード）", "バルムントテイ　ホアンクイキ　ハアト")
		.SetMonsters([
			MONSTER_ID_GUARDIANNO_BUHIN,

			MONSTER_ID_ZYOKYU_TOKUSE_ALNOLDI,
			MONSTER_ID_ZYOKYU_KENKYU_ZYOSHU_ZIDO_NINGYO,
			MONSTER_ID_ZYOKYU_DRY_RAFFLESIA,
			MONSTER_ID_RED_PEPPER_LAMBDA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SUIZYO_SHOKUBUTSUEN_HARD");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("水上植物園（ハード）", "スイジョウショクブツエン　ハアト")
		.AddNameKana("バルムント邸　水上植物園（ハード）", "バルムントテイ　スイジョウショクブツエン　ハアト")
		.SetMonsters([
			MONSTER_ID_BLUE_ARIES,
			MONSTER_ID_BELPOLTA,
			MONSTER_ID_BELPOLTE,
			MONSTER_ID_RED_ARIES,

			MONSTER_ID_KOSHOSHITA_ZYOKYU_NIWASHI_BETA,
			MONSTER_ID_ZYOKYU_PAPILA,
			MONSTER_ID_ZYOKYU_PAPILA_CAE,
			MONSTER_ID_ZYOKYU_PAPILA_RUBA,
			MONSTER_ID_GRAN_PAPILIA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIIRO_OKAMINO_MORI_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("灰色狼の森01", "ハイイロオオカミノモリ　０１")
		.SetMonsters([
			MONSTER_ID_ASH_HOPPER,
			MONSTER_ID_ASHRING,
			MONSTER_ID_GRAY_WOLF,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIIRO_OKAMINO_MORI_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("灰色狼の森02", "ハイイロオオカミノモリ　０２")
		.SetMonsters([
			MONSTER_ID_ASHRING,
			MONSTER_ID_GRAY_WOLF,
			MONSTER_ID_SHIGERING,
			MONSTER_ID_FIRE_WIND_KITE,
			MONSTER_ID_PHANTOM_WOLF,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_OZNO_MEIRO_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オズの迷路01", "オズノメイロ　０１")
		.SetMonsters([
			MONSTER_ID_ASH_TODO,
			MONSTER_ID_RAKESON,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_OZNO_MEIRO_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("オズの迷路02", "オズノメイロ　０２")
		.SetMonsters([
			MONSTER_ID_VALTY,
			MONSTER_ID_HOT_MOL,
			MONSTER_ID_VOLCARING,
			MONSTER_ID_LAVA_TODO,
			MONSTER_ID_BURNING_FANG,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_10");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド10（オズ渓谷）", "ラヘルフィールド　１０　オズケイコク")
		.SetMonsters([
			MONSTER_ID_GRAY_GOAT,
			MONSTER_ID_KO_GRAY_WOLF,
			MONSTER_ID_RAKESON,
			MONSTER_ID_DROSERA,
			MONSTER_ID_MAGMARIN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_RACHEL_FIELD_11");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("ラヘルフィールド11（イダ平原）", "ラヘルフィールド　１１　イダヘイゲン")
		.SetMonsters([
			MONSTER_ID_GRAY_GOAT,
			MONSTER_ID_KO_GRAY_WOLF,
			MONSTER_ID_RAKESON,
			MONSTER_ID_DROSERA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SEIKI_SESSURUMNIR");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("聖域セスルムニル", "セイイキセスルムニル")
		.SetMonsters([
			MONSTER_ID_SHINDEN_GUARD,
			MONSTER_ID_URAGITTA_SHINDEN_GUARD,
			MONSTER_ID_ELITE_HEART_HUNTER,
			MONSTER_ID_KYOMETAI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_GIMANNO_BESSO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("欺瞞の別荘", "ギマンノベッソウ")
		.SetMonsters([
			MONSTER_ID_BESSONO_BANNIN,
			MONSTER_ID_BESSONO_BANNIN_AURA,
			MONSTER_ID_MEGAMINO_SHUGOSHA,
			MONSTER_ID_MEGAMINO_SHUGOSHA_AURA,
			MONSTER_ID_HEART_HUNTER_AGT,
			MONSTER_ID_SHURAN,
			MONSTER_ID_DEMI_FREYA,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_HIKOSEN_TSUIRAKUCHI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　飛行船墜落地", "エイユウノコンセキ　ヒコウセンツイラクチ")
		.SetMonsters([
			MONSTER_ID_KUSATTA_KI,
			MONSTER_ID_GRAVE_WORM,
			MONSTER_ID_KOFUNSHITA_DASTYNESS,
			MONSTER_ID_KOFUNSHITA_HONET,
			MONSTER_ID_BRAIN_SUCKER,
			MONSTER_ID_MOSQUIRO,
			MONSTER_ID_YOKAISHITA_PORING,
			MONSTER_ID_ETAINO_SHIRENAI_SEMETAI,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_EIYUNO_KONSEKI_GEFFEN_YAKAN_TOGIZYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("英雄の痕跡　ゲフェン夜間闘技場", "エイユウノコンセキ　ゲフェンヤカントウギジョウ")
		.SetMonsters([
			MONSTER_ID_MAYONAKANO_ALFON,
			MONSTER_ID_MAYONAKANO_ANEMOS,
			MONSTER_ID_MAYONAKANO_ARUHI,
			MONSTER_ID_MAYONAKANO_IFODOS,
			MONSTER_ID_MAYONAKANO_OLDOR,
			MONSTER_ID_MAYONAKANO_KANABIAN,
			MONSTER_ID_MAYONAKANO_KANEIRY,
			MONSTER_ID_MAYONAKANO_KUROMA,
			MONSTER_ID_MAYONAKANO_COSRLEASE,
			MONSTER_ID_MAYONAKANO_JEW,
			MONSTER_ID_MAYONAKANO_SUNIKI,
			MONSTER_ID_MAYONAKANO_D_Y,
			MONSTER_ID_MAYONAKANO_HAZE,
			MONSTER_ID_MAYONAKANO_FEMON,
			MONSTER_ID_MAYONAKANO_YUMEHIME,
			MONSTER_ID_MAYONAKANO_RECHENIER,
			MONSTER_ID_MAYONAKANO_FENRIR,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIKI_ZIKKENZYO_AMISITIA_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("廃棄実験所アミシティア01", "ハイキジッケンジョアミシティア　０１")
		.SetMonsters([
			MONSTER_ID_HENI_CHIMERA_AMITERA,
			MONSTER_ID_HENI_CHIMERA_VANILAQUS,
			MONSTER_ID_HENI_CHIMERA_FILLIA,
			MONSTER_ID_HENI_CHIMERA_LITUS,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HAIKI_ZIKKENZYO_AMISITIA_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("廃棄実験所アミシティア02", "ハイキジッケンジョアミシティア　０２")
		.SetMonsters([
			MONSTER_ID_HENI_CHIMERA_GALENSIS,
			MONSTER_ID_HENI_CHIMERA_NAPEO,
			MONSTER_ID_HENI_CHIMERA_FULGOR,
			MONSTER_ID_HENI_CHIMERA_LAVA,
			MONSTER_ID_HENI_CHIMERA_THE_ONE,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MUGENNO_MEIKYU_ZENIKI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("夢幻の迷宮（全域）", "ムゲンノメイキュウ００ゼンイキ")
		.SetMonsters([
			MONSTER_ID_RSX_0806_MD,
			MONSTER_ID_ARTIS_MASCOT_MD,
			MONSTER_ID_AMENHOTEP_A_MD,
			MONSTER_ID_AMENHOTEP_B_MD,
			MONSTER_ID_EFRITE_A_MD,
			MONSTER_ID_EFRITE_B_MD,
			MONSTER_ID_WISH_MAIDEN_A_MD,
			MONSTER_ID_WISH_MAIDEN_B_MD,
			MONSTER_ID_EDDGA_A_MD,
			MONSTER_ID_EDDGA_B_MD,
			MONSTER_ID_ELEMES_GAIL_MD,
			MONSTER_ID_ORCHERO_MD,
			MONSTER_ID_ORCLORD_MD,
			MONSTER_ID_OSIRIS_A_MD,
			MONSTER_ID_OSIRIS_B_MD,
			MONSTER_ID_CATHERINE_KEILON_MD,
			MONSTER_ID_CHIEL_D01_MD,
			MONSTER_ID_KTORURANUCUS_MD,
			MONSTER_ID_KRAKEN_MD,
			MONSTER_ID_GROOM_UNDERNIGHT_A_MD,
			MONSTER_ID_GROOM_UNDERNIGHT_B_MD,
			MONSTER_ID_SHADOW_AIRIN_MD,
			MONSTER_ID_SHADOW_ANEMOS_A_MD,
			MONSTER_ID_SHADOW_ANEMOS_B_MD,
			MONSTER_ID_SHADOW_ANEMOS_C_MD,
			MONSTER_ID_SHADOW_EABUL_MD,
			MONSTER_ID_SHADOW_OLDOR_MD,
			MONSTER_ID_SHADOW_KANEIRY_A_MD,
			MONSTER_ID_SHADOW_KANEIRY_B_MD,
			MONSTER_ID_SHADOW_KANEIRY_C_MD,
			MONSTER_ID_SHADOW_SARA_MD,
			MONSTER_ID_SHADOW_JEW_MD,
			MONSTER_ID_SHADOW_SUNIKI_MD,
			MONSTER_ID_SHADOW_DY_MD,
			MONSTER_ID_SHADOW_PHEMON_MD,
			MONSTER_ID_SHADOW_FENRIR_A_MD,
			MONSTER_ID_SHADOW_FENRIR_B_MD,
			MONSTER_ID_SHADOW_FENRIR_C_MD,
			MONSTER_ID_SHADOW_MOROC_MD,
			MONSTER_ID_SHADOW_YUMEHIME_MD,
			MONSTER_ID_SHADOW_RECHENIER_A_MD,
			MONSTER_ID_SHADOW_RECHENIER_B_MD,
			MONSTER_ID_SHADOW_RECHENIER_C_MD,
			MONSTER_ID_SHADOW_KUROMA_A_MD,
			MONSTER_ID_SHADOW_KUROMA_B_MD,
			MONSTER_ID_SHADOW_KUROMA_C_MD,
			MONSTER_ID_STORM_KNIGHT_MD,
			MONSTER_ID_SEIREN_VINSER_MD,
			MONSTER_ID_CERIA_ARDE_A_MD,
			MONSTER_ID_CERIA_ARDE_B_MD,
			MONSTER_ID_DARK_LORD_MD,
			MONSTER_ID_TURTLE_GENERAL_A_MD,
			MONSTER_ID_TURTLE_GENERAL_B_MD,
			MONSTER_ID_TIME_HOLDER_MD,
			MONSTER_ID_TAOGUNKA_A_MD,
			MONSTER_ID_TAOGUNKA_B_MD,
			MONSTER_ID_DATALZAURUS_A_MD,
			MONSTER_ID_DATALZAURUS_B_MD,
			MONSTER_ID_DEADEND_A_MD,
			MONSTER_ID_DEADEND_B_MD,
			MONSTER_ID_DEADEND_C_MD,
			MONSTER_ID_DEADEND_D_MD,
			MONSTER_ID_DEADEND_E_MD,
			MONSTER_ID_DOPPELGENGER_MD,
			MONSTER_ID_DRACULA_MD,
			MONSTER_ID_DRAKE_MD,
			MONSTER_ID_NEEDZHEGNO_KAGE_MD,
			MONSTER_ID_PASTA_QUEEN_MD,
			MONSTER_ID_HAPPY_PORING_A_MD,
			MONSTER_ID_HAPPY_PORING_B_MD,
			MONSTER_ID_HAPPY_PORING_C_MD,
			MONSTER_ID_HAPPY_PORING_D_MD,
			MONSTER_ID_HATIE_MD,
			MONSTER_ID_BIG_EGGRING_MD,
			MONSTER_ID_PHARAO_MD,
			MONSTER_ID_FURIONI_MD,
			MONSTER_ID_PEKUSOZIN_MD,
			MONSTER_ID_MARGARETTE_SORIN_MD,
			MONSTER_ID_MAYA_A_MD,
			MONSTER_ID_MAYA_B_MD,
			MONSTER_ID_MISTRESS_MD,
			MONSTER_ID_MAZE_CRYSTAL_MD,
			MONSTER_ID_RANDGRIS_MD,
			MONSTER_ID_LADYTANIE_A_MD,
			MONSTER_ID_LADYTANIE_B_MD,
			MONSTER_ID_REYAC_MD,
			MONSTER_ID_LORDOF_DEATH_MD,
			MONSTER_ID_ANKOKUNO_COELACANTH_A_MD,
			MONSTER_ID_ANKOKUNO_COELACANTH_B_MD,
			MONSTER_ID_IKENO_COELACANTH_MD,
			MONSTER_ID_ONRYO_BUSHI_MD,
			MONSTER_ID_KAKUSE_KTORURANUCUS_MD,
			MONSTER_ID_KAGAYAKU_BEARDOLL_MD,
			MONSTER_ID_YUNDENO_KAGE_MD,
			MONSTER_ID_WARYAPHA_MD,
			MONSTER_ID_KENSHINO_KAGE_MD,
			MONSTER_ID_KOKUDAO_MD,
			MONSTER_ID_KONTONNO_GHOSTRING_MD,
			MONSTER_ID_KONTONNO_BAPHOMET_MD,
			MONSTER_ID_ZISHANO_KAGE_MD,
			MONSTER_ID_ZYUZINNO_KAGE_MD,
			MONSTER_ID_ZYOO_SUCARAB_A_MD,
			MONSTER_ID_ZYOO_SUCARAB_B_MD,
			MONSTER_ID_ZYOTE_SUCARAB_MD,
			MONSTER_ID_SHONINNO_KAGE_MD,
			MONSTER_ID_SHINKAINO_KRAKEN_MD,
			MONSTER_ID_SHINKAINO_MAZYO_MD,
			MONSTER_ID_SHINRINO_MAHOTSUKAI_MD,
			MONSTER_ID_SHINBATSUNO_ODIL_A_MD,
			MONSTER_ID_SHINBATSUNO_ODIL_B_MD,
			MONSTER_ID_SHINBATSUNO_ODIL_C_MD,
			MONSTER_ID_TOZOKUNO_KAGE_MD,
			MONSTER_ID_NINZYANO_KAGE_MD,
			MONSTER_ID_FUKITSUNA_TURTLE_G_MD,
			MONSTER_ID_BOGYAKUNO_COELACANTH_A_MD,
			MONSTER_ID_BOGYAKUNO_COELACANTH_B_MD,
			MONSTER_ID_MAZYUTUSHINO_KAGE_MD,
			MONSTER_ID_MAZYUTUSHI_RUCIEFR_A_MD,
			MONSTER_ID_MAZYUTUSHI_RUCIEFR_B_MD,
			MONSTER_ID_MAZYUTUSHI_RUCIEFR_C_MD,
			MONSTER_ID_MUKUCHINA_MAYA_MD,
			MONSTER_ID_MEIKYUNO_VERSEBB_MD,
			MONSTER_ID_MEIKYUNO_ENGELING_MD,
			MONSTER_ID_MEIKYUNO_JEJERING_A_MD,
			MONSTER_ID_MEIKYUNO_JEJERING_B_MD,
			MONSTER_ID_MEIKYUNO_DOPPELGENGER_B_MD,
			MONSTER_ID_MEIKYUNO_DOPPELGENGER_A_MD,
			MONSTER_ID_MEIKYUNO_DRACULA_A_MD,
			MONSTER_ID_MEIKYUNO_DRACULA_B_MD,
			MONSTER_ID_MEIKYUNO_BAPHOMET_A_MD,
			MONSTER_ID_MEIKYUNO_BAPHOMET_B_MD,
			MONSTER_ID_MEIKYUNO_BAPHOMET_C_MD,
			MONSTER_ID_MEIKYUNO_MASTERING_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_A_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_B_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_C_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_D_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_E_MD,
			MONSTER_ID_YOHENO_KAGE_MD,
			MONSTER_ID_SAMAYOU_MURASAKIIRONO_RYU_MD,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ITETSUITA_UROKONO_OKA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("凍て付いた鱗の丘", "イテツイタウロコノオカ")
		.SetMonsters([
			MONSTER_ID_ICE_FUNAMUSHI,
			MONSTER_ID_ICE_STRAW,
			MONSTER_ID_HIKARU_WAKAME,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ITETSUITA_SHIPPO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("凍て付いた尻尾", "イテツイタシッポ")
		.SetMonsters([
			MONSTER_ID_ICE_FUNAMUSHI,
			MONSTER_ID_HIKARU_WAKAME,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ITETSUITA_UROKONO_HEIGEN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("凍て付いた鱗の平原", "イテツイタウロコノヘイゲン")
		.SetMonsters([
			MONSTER_ID_ICE_FUNAMUSHI,
			MONSTER_ID_ICE_STRAW,
			MONSTER_ID_LIMACINA,
			MONSTER_ID_FUTOKA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_ITETSUITA_UROKONO_HYOGA");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("凍て付いた鱗の氷河", "イテツイタウロコノヒョウガ")
		.SetMonsters([
			MONSTER_ID_CALMARING,
			MONSTER_ID_ICE_FUNAMUSHI,
			MONSTER_ID_LIMACINA,
			MONSTER_ID_ULTRA_LIMACINA,
			MONSTER_ID_GENSHI_RGAN,
			MONSTER_ID_SAIKAKYU_RGAN,
			MONSTER_ID_FUTOKA,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SUTERARETA_ANA_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("捨てられた穴01", "ステラレタアナ０１")
		.SetMonsters([
			MONSTER_ID_DOKUTSU_CALMARING,
			MONSTER_ID_DOKUTSU_FUTOKA,
			MONSTER_ID_BABY_HALLUCIGENIA,
			MONSTER_ID_KAIZOSARETA_ZYOKYU_RGAN,
			MONSTER_ID_HAIKISARETA_GENSHI_RGAN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_SUTERARETA_ANA_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("捨てられた穴02", "ステラレタアナ０２")
		.SetMonsters([
			MONSTER_ID_SOGAN_DOLLOCARIS,
			MONSTER_ID_MAKIKOMARETA_CHUKYU_RGAN,
			MONSTER_ID_HALLUCIGENIA,
			MONSTER_ID_TANGAN_DOLLOCARIS,
			MONSTER_ID_HAIKISARETA_CHUKYU_RGAN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HEBIGAMINO_NUKUMORI_01");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("蛇神の温もり01", "ヘビガミノヌクモリ０１")
		.SetMonsters([
			MONSTER_ID_HEART_HUNTER_AT,
			MONSTER_ID_GENSHI_RGAN,
			MONSTER_ID_SAIKAKYU_RGAN,
			MONSTER_ID_KAKYU_RGAN,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_HEBIGAMINO_NUKUMORI_02");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MAP)
		.AddNameKana("蛇神の温もり02", "ヘビガミノヌクモリ０２")
		.SetMonsters([
			MONSTER_ID_HEART_HUNTER_AT,
			MONSTER_ID_SAIKAKYU_RGAN,
			MONSTER_ID_KAKYU_RGAN,
			MONSTER_ID_CHUKYU_RGAN,
		])
	;



	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MUGENNO_MEIKYU_01_SHIREN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("試練の迷宮", "ムゲンノメイキュウ０１シレン")
		.SetMonsters([
			MONSTER_ID_MEIKYUNO_BAPHOMET_A_MD,
			MONSTER_ID_EFRITE_A_MD,
			MONSTER_ID_MEIKYUNO_JEJERING_A_MD,
			MONSTER_ID_TURTLE_GENERAL_A_MD,
			MONSTER_ID_OSIRIS_A_MD,
			MONSTER_ID_ZYOO_SUCARAB_A_MD,
			MONSTER_ID_ANKOKUNO_COELACANTH_A_MD,
			MONSTER_ID_CERIA_ARDE_A_MD,
			MONSTER_ID_WISH_MAIDEN_A_MD,
			MONSTER_ID_DATALZAURUS_A_MD,
			MONSTER_ID_TAOGUNKA_A_MD,
			MONSTER_ID_MAYA_A_MD,
			MONSTER_ID_EDDGA_A_MD,
			MONSTER_ID_LADYTANIE_A_MD,
			MONSTER_ID_GROOM_UNDERNIGHT_A_MD,
			MONSTER_ID_AMENHOTEP_A_MD,
			MONSTER_ID_MAZYUTUSHI_RUCIEFR_A_MD,
			MONSTER_ID_SHINBATSUNO_ODIL_A_MD,
			MONSTER_ID_MEIKYUNO_BAPHOMET_B_MD,
			MONSTER_ID_DEADEND_A_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_A_MD,
			MONSTER_ID_HAPPY_PORING_A_MD,

			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,

			MONSTER_ID_SHADOW_KANEIRY_A_MD,
			MONSTER_ID_SHADOW_KUROMA_A_MD,
			MONSTER_ID_SHADOW_ANEMOS_A_MD,
			MONSTER_ID_SHADOW_RECHENIER_A_MD,
			MONSTER_ID_SHADOW_FENRIR_A_MD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MUGENNO_MEIKYU_02_FUIN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("封印の迷宮", "ムゲンノメイキュウ０２フウイン")
		.SetMonsters([
			MONSTER_ID_MEIKYUNO_DRACULA_A_MD,
			MONSTER_ID_KRAKEN_MD,
			MONSTER_ID_MEIKYUNO_ENGELING_MD,
			MONSTER_ID_DOPPELGENGER_MD,
			MONSTER_ID_SAMAYOU_MURASAKIIRONO_RYU_MD,
			MONSTER_ID_PEKUSOZIN_MD,
			MONSTER_ID_MEIKYUNO_MASTERING_MD,
			MONSTER_ID_ZYOTE_SUCARAB_MD,
			MONSTER_ID_DRAKE_MD,
			MONSTER_ID_KOKUDAO_MD,
			MONSTER_ID_RSX_0806_MD,
			MONSTER_ID_BOGYAKUNO_COELACANTH_A_MD,
			MONSTER_ID_RANDGRIS_MD,
			MONSTER_ID_NEEDZHEGNO_KAGE_MD,
			MONSTER_ID_SEIREN_VINSER_MD,
			MONSTER_ID_TIME_HOLDER_MD,
			MONSTER_ID_MAZYUTUSHI_RUCIEFR_B_MD,
			MONSTER_ID_SHINBATSUNO_ODIL_B_MD,
			MONSTER_ID_MEIKYUNO_DRACULA_B_MD,
			MONSTER_ID_DEADEND_C_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_C_MD,
			MONSTER_ID_HAPPY_PORING_C_MD,

			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,

			MONSTER_ID_SHADOW_KANEIRY_B_MD,
			MONSTER_ID_SHADOW_KUROMA_B_MD,
			MONSTER_ID_SHADOW_ANEMOS_B_MD,
			MONSTER_ID_SHADOW_RECHENIER_B_MD,
			MONSTER_ID_SHADOW_FENRIR_B_MD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MUGENNO_MEIKYU_03_IGYO");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("異形の迷宮", "ムゲンノメイキュウ０３イギョウ")
		.SetMonsters([
			MONSTER_ID_MEIKYUNO_DOPPELGENGER_A_MD,
			MONSTER_ID_LORDOF_DEATH_MD,
			MONSTER_ID_BIG_EGGRING_MD,
			MONSTER_ID_DRACULA_MD,
			MONSTER_ID_ORCLORD_MD,
			MONSTER_ID_MISTRESS_MD,
			MONSTER_ID_IKENO_COELACANTH_MD,
			MONSTER_ID_CATHERINE_KEILON_MD,
			MONSTER_ID_ARTIS_MASCOT_MD,
			MONSTER_ID_FURIONI_MD,
			MONSTER_ID_WARYAPHA_MD,
			MONSTER_ID_HATIE_MD,
			MONSTER_ID_DARK_LORD_MD,
			MONSTER_ID_KTORURANUCUS_MD,
			MONSTER_ID_CHIEL_D01_MD,
			MONSTER_ID_ELEMES_GAIL_MD,
			MONSTER_ID_MAZYUTUSHI_RUCIEFR_C_MD,
			MONSTER_ID_PASTA_QUEEN_MD,
			MONSTER_ID_MEIKYUNO_DOPPELGENGER_B_MD,
			MONSTER_ID_DEADEND_B_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_B_MD,
			MONSTER_ID_HAPPY_PORING_B_MD,

			MONSTER_ID_YUNDENO_KAGE_MD,
			MONSTER_ID_KENSHINO_KAGE_MD,
			MONSTER_ID_ZISHANO_KAGE_MD,
			MONSTER_ID_ZYUZINNO_KAGE_MD,
			MONSTER_ID_SHONINNO_KAGE_MD,
			MONSTER_ID_TOZOKUNO_KAGE_MD,
			MONSTER_ID_NINZYANO_KAGE_MD,
			MONSTER_ID_MAZYUTUSHINO_KAGE_MD,
			MONSTER_ID_YOHENO_KAGE_MD,

			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,

			MONSTER_ID_SHADOW_SUNIKI_MD,
			MONSTER_ID_SHADOW_PHEMON_MD,
			MONSTER_ID_SHADOW_DY_MD,
			MONSTER_ID_SHADOW_AIRIN_MD,
			MONSTER_ID_SHADOW_SARA_MD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MUGENNO_MEIKYU_11_GENEI_SHIREN");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("幻影の迷宮（試練ルート）", "ムゲンノメイキュウ１１ゲンエイシレン")
		.SetMonsters([
			MONSTER_ID_MEIKYUNO_BAPHOMET_C_MD,
			MONSTER_ID_EFRITE_B_MD,
			MONSTER_ID_MEIKYUNO_JEJERING_B_MD,
			MONSTER_ID_TURTLE_GENERAL_B_MD,
			MONSTER_ID_OSIRIS_B_MD,
			MONSTER_ID_ZYOO_SUCARAB_B_MD,
			MONSTER_ID_ANKOKUNO_COELACANTH_B_MD,
			MONSTER_ID_CERIA_ARDE_B_MD,
			MONSTER_ID_WISH_MAIDEN_B_MD,
			MONSTER_ID_DATALZAURUS_B_MD,
			MONSTER_ID_TAOGUNKA_B_MD,
			MONSTER_ID_MAYA_B_MD,
			MONSTER_ID_EDDGA_B_MD,
			MONSTER_ID_LADYTANIE_B_MD,
			MONSTER_ID_GROOM_UNDERNIGHT_B_MD,
			MONSTER_ID_AMENHOTEP_B_MD,
			MONSTER_ID_SHINBATSUNO_ODIL_C_MD,
			MONSTER_ID_DEADEND_E_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_E_MD,
			MONSTER_ID_HAPPY_PORING_D_MD,

			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,

			MONSTER_ID_SHADOW_KANEIRY_C_MD,
			MONSTER_ID_SHADOW_KUROMA_C_MD,
			MONSTER_ID_SHADOW_ANEMOS_C_MD,
			MONSTER_ID_SHADOW_RECHENIER_C_MD,
			MONSTER_ID_SHADOW_FENRIR_C_MD,
		])
	;

	dataId = CMonsterMapDataMaker.RegisterId("MONSTER_MAP_ID_MUGENNO_MEIKYU_12_GENEI_GENEI");
	dataArray[dataId] = new CMonsterMapData()
		.SetId(dataId)
		.SetKind(MONSTER_MAP_KIND_MEMORIAL_DUNGEON)
		.AddNameKana("幻影の迷宮（幻影ルート）", "ムゲンノメイキュウ１２ゲンエゲンエイ")
		.SetMonsters([
			MONSTER_ID_MEIKYUNO_VERSEBB_MD,
			MONSTER_ID_KONTONNO_BAPHOMET_MD,
			MONSTER_ID_KONTONNO_GHOSTRING_MD,
			MONSTER_ID_FUKITSUNA_TURTLE_G_MD,
			MONSTER_ID_ORCHERO_MD,
			MONSTER_ID_ONRYO_BUSHI_MD,
			MONSTER_ID_BOGYAKUNO_COELACANTH_B_MD,
			MONSTER_ID_MARGARETTE_SORIN_MD,
			MONSTER_ID_SHINRINO_MAHOTSUKAI_MD,
			MONSTER_ID_STORM_KNIGHT_MD,
			MONSTER_ID_KAGAYAKU_BEARDOLL_MD,
			MONSTER_ID_MUKUCHINA_MAYA_MD,
			MONSTER_ID_PHARAO_MD,
			MONSTER_ID_REYAC_MD,
			MONSTER_ID_KAKUSE_KTORURANUCUS_MD,
			MONSTER_ID_SHINKAINO_KRAKEN_MD,
			MONSTER_ID_SHINKAINO_MAZYO_MD,
			MONSTER_ID_DEADEND_D_MD,
			MONSTER_ID_MEIKYUNO_MIMIC_D_MD,
			MONSTER_ID_HAPPY_PORING_D_MD,

			MONSTER_ID_SHOGUN_DAEHYON,
			MONSTER_ID_KYOSHINZYA_PYURIEL,
			MONSTER_ID_MUZIHINA_GIOIA,
			MONSTER_ID_MOZYANO_SHUGOSHA_KADES,

			MONSTER_ID_SHADOW_YUMEHIME_MD,
			MONSTER_ID_SHADOW_OLDOR_MD,
			MONSTER_ID_SHADOW_JEW_MD,
			MONSTER_ID_SHADOW_EABUL_MD,
			MONSTER_ID_SHADOW_MOROC_MD,
		])
	;





















	// 各データをdatデータに変換する
	for (idx = 0; idx < dataArray.length; idx++) {
		dataDat.push(dataArray[idx].ToDat(true));
	}



	// 定義済みデータ配列を上書き
	g_MonsterMapDataArray = dataDat;

};





// データ上書き
if (_DATA_CREATE_MODE) {
	CMonsterMapDataMaker.OverrideData();
}
