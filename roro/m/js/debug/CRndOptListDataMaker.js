
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * ランダムオプションリストクラス.
 */
function CRndOptList () {

	/** ID. */
	this.id = 0;

	/** 定義名. */
	this.defName = "RND_OPT_LIST_ID_UNKNOWN";

	/** オプションID配列. */
	this.rndOptIdArray = new Array();



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
	 * オプションID を追加する.
	 * @param rndOptId オプションID
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.AddRndOptId = function (rndOptId) {
		this.rndOptIdArray.push(rndOptId);
		return this;
	};



	/**
	 * dat データに変換する.
	 * @return dat データ（配列）
	 */
	this.MakeDat = function () {
		return [
			this.id,
			this.rndOptIdArray,
		];
	};
}



/**
 * ランダムオプションリストデータ作成クラス.
 */
function CRndOptListDataMaker () {

}

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CRndOptListDataMaker.RegisterId = function (name, value) {
	if (name != "RND_OPT_LIST_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumRndOptListId", [name], value, undefined);
	}
	return value;
};



/**
 * データ定義を上書き定義する.
 */
CRndOptListDataMaker.OverrideData = function () {

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
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_NONE")
			.AddRndOptId(RND_OPT_ID_NONE)
	);



	// 旧汎用
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_OLD_COMMON")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_200)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ALLSTATUS_PLUS_200)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_CRI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_ASPD_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXHP_UP_200)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXSP_UP_200)
			.AddRndOptId(RND_OPT_ID_HPR_UP_200)
			.AddRndOptId(RND_OPT_ID_SPR_UP_200)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200)
			.AddRndOptId(RND_OPT_ID_DEF_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MDEF_PLUS_200)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_DAMAGE_UP_200)
			.AddRndOptId(RND_OPT_ID_LONGRANGE_DAMAGE_UP_200)
			.AddRndOptId(RND_OPT_ID_RESIST_LONGRANGE_200)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USING_200)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USED_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DRAGON_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_SMALL_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_LARGE_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_BOSS_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_PLAYER_ALL_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_PLAYER_DORAM_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DRAGON_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_SMALL_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_MEDIUM_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_LARGE_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_BOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_PLAYER_ALL_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_PLAYER_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_PLAYER_DORAM_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_CRITICAL_UP_RACE_DRAGON_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_RACE_DRAGON_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_RACE_DRAGON_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_DRAGON_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_VANITY_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WIND_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_POISON_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_HOLY_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_DARK_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_PSYCO_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_VANITY_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_WIND_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_POISON_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_HOLY_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_DARK_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_PSYCO_200)
			.AddRndOptId(RND_OPT_ID_RESIST_MONSTER_ELM_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_RESIST_SIZE_SMALL_200)
			.AddRndOptId(RND_OPT_ID_RESIST_SIZE_MEDIUM_200)
			.AddRndOptId(RND_OPT_ID_RESIST_SIZE_LARGE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_RESIST_BOSS_200)
			.AddRndOptId(RND_OPT_ID_RESIST_PLAYER_ALL_200)
			.AddRndOptId(RND_OPT_ID_RESIST_PLAYER_HUMAN_200)
			.AddRndOptId(RND_OPT_ID_RESIST_PLAYER_DORAM_200)
	);



	// アクセサリースクロール１（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_200)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_200)
	);

	// アクセサリースクロール１（第２、第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_2_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WIND_200)
	);

	// アクセサリースクロール１（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ACCESSARY_SCROLL_1_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_CRI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
	);



	// ウェポンスクロール１（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_WEAPON_SCROLL_1_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_USE_ENCHANT_ELM_CONF)
	);

	// ウェポンスクロール１（第２、第３、第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_WEAPON_SCROLL_1_2_3_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_BOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_BOSS_200)
	);



	// シューズスクロール１（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHOES_SCROLL_1_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200)
	);

	// シューズスクロール１（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHOES_SCROLL_1_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_200)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_200)
	);

	// シューズスクロール１（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHOES_SCROLL_1_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WIND_200)
	);

	// シューズスクロール１（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHOES_SCROLL_1_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USING_200)
	);



	// ヘルムスクロール１（第１、第２、第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_HELM_SCROLL_1_1_2_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY_200)
	);

	// ヘルムスクロール１（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_HELM_SCROLL_1_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_200)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
	);



	// メイルスクロール１（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MAIL_SCROLL_1_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_NOT_IMPLEMENTED)
	);

	// メイルスクロール１（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MAIL_SCROLL_1_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_SOLID_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_UNDEAD_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_ANIMAL_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_PLANT_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_INSECT_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_FISH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_DEMON_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_HUMAN_NOT_PLAYER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_ANGEL_200)
			.AddRndOptId(RND_OPT_ID_RESIST_RACE_DRAGON_200)
	);

	// メイルスクロール１（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MAIL_SCROLL_1_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WIND_200)
	);

	// メイルスクロール１（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MAIL_SCROLL_1_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_200)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_200)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_UNBREAKABLE)
	);



	// 守護、竜気、祝福のエッセンス（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHUGONO_ESSENCE_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_10)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_10)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_10)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_10)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_10)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_10)
	);

	// 守護、竜気、祝福のエッセンス（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHUGONO_ESSENCE_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200)
			.AddRndOptId(RND_OPT_ID_MAXHP_UP_20)
			.AddRndOptId(RND_OPT_ID_MAXSP_UP_20)
	);

	// 守護、竜気、祝福のエッセンス（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHUGONO_ESSENCE_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_200)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEF_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MDEF_PLUS_200)
	);

	// 守護、竜気、祝福のエッセンス（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHUGONO_ESSENCE_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
	);

	// 守護、竜気、祝福のエッセンス（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHUGONO_ESSENCE_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WATER_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_EARTH_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_FIRE_200)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WIND_200)
	);



	// 闘気のエッセンス、アインブロック武器改造許可証I（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TOKINO_ESSENCE_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
	);

	// 闘気のエッセンス、アインブロック武器改造許可証I（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TOKINO_ESSENCE_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200)
	);

	// 闘気のエッセンス、アインブロック武器改造許可証I（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TOKINO_ESSENCE_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
	);

	// 闘気のエッセンス、アインブロック武器改造許可証I（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TOKINO_ESSENCE_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
	);

	// 闘気のエッセンス、アインブロック武器改造許可証I（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TOKINO_ESSENCE_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_200)
	);



	// 猛気のエッセンス、アインブロック武器改造許可証II（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MOKINO_ESSENCE_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
	);

	// 猛気のエッセンス、アインブロック武器改造許可証II（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MOKINO_ESSENCE_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200)
	);

	// 猛気のエッセンス、アインブロック武器改造許可証II（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MOKINO_ESSENCE_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
	);

	// 猛気のエッセンス、アインブロック武器改造許可証II（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MOKINO_ESSENCE_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
	);

	// 猛気のエッセンス、アインブロック武器改造許可証II（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_MOKINO_ESSENCE_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_200)
	);



	// 兜改造装置（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_KABUTO_KAIZO_SOCHI_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_200)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_200)
	);

	// 兜改造装置（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_KABUTO_KAIZO_SOCHI_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_200)
			.AddRndOptId(RND_OPT_ID_CRI_PLUS_200)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_200)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
	);

	// 兜改造装置（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_KABUTO_KAIZO_SOCHI_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_BOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_BOSS_200)
	);



	// 大罪武器（第一オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TAIZAI_WEAPON_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_20)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_20)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_20)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_20)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_20)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_20)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_50)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_50)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_20)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USING_60)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_20)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_20)
	);

	// 大罪武器（第二オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_TAIZAI_WEAPON_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_UP_10)
			.AddRndOptId(RND_OPT_ID_MAXSP_UP_10)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_50)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_50)
			.AddRndOptId(RND_OPT_ID_DEF_PLUS_100)
			.AddRndOptId(RND_OPT_ID_MDEF_PLUS_10)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_FIRE_5)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WATER_5)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_WIND_5)
			.AddRndOptId(RND_OPT_ID_RESIST_ELM_EARTH_5)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_50)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_50)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_SOLID_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_UNDEAD_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANIMAL_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_PLANT_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_INSECT_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_FISH_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DEMON_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANGEL_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DRAGON_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_SOLID_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_UNDEAD_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANIMAL_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_PLANT_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_INSECT_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_FISH_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DEMON_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANGEL_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DRAGON_20)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_20)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USING_60)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_20)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_SMALL_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM_20)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_LARGE_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_SMALL_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_MEDIUM_20)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_LARGE_20)
	);



	// 違法パーツ（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_IHO_PARTS_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_DEF_PLUS_200)
			.AddRndOptId(RND_OPT_ID_MDEF_PLUS_200)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_200)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_200)
			.AddRndOptId(RND_OPT_ID_CRI_PLUS_200)
	);

	// 違法パーツ（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_IHO_PARTS_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USING_200)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_200)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_200)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_DEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_IGNORE_MDEF_BOSS_200)
			.AddRndOptId(RND_OPT_ID_SIZE_PERFECTION)
	);

	// 違法パーツ（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_IHO_PARTS_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_BOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_NOTBOSS_200)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_BOSS_200)
	);



	// リラプス武器（片手）（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_USE_ENCHANT_ELM_CONF)
	);

	// リラプス武器（片手）（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_50)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_50)
	);

	// リラプス武器（片手）（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_10)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_10)
	);

	// リラプス武器（片手）（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_10)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_10)
	);

	// リラプス武器（片手）（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_10)
	);



	// リラプス武器（両手）（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_USE_ENCHANT_ELM_CONF)
	);

	// リラプス武器（両手）（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_100)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_100)
	);

	// リラプス武器（両手）（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_20)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_20)
	);

	// リラプス武器（両手）（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_20)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_20)
	);

	// リラプス武器（両手）（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_RELAPSE_ARMS_2HAND_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_20)
	);



	// オルタネイトクリップ（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ALTERNATE_CLIP_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_SMALL_30)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_SMALL_30)
	);

	// オルタネイトクリップ（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ALTERNATE_CLIP_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM_30)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_MEDIUM_30)
	);

	// オルタネイトクリップ（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ALTERNATE_CLIP_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_LARGE_30)
			.AddRndOptId(RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_LARGE_30)
	);

	// オルタネイトクリップ（第４オプション）
	// 詳細判明していないので、旧共通全種を使用する

	// オルタネイトクリップ（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_ALTERNATE_CLIP_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_10)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_10)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_10)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_10)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_10)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_10)
			.AddRndOptId(RND_OPT_ID_POW_PLUS_10)
			.AddRndOptId(RND_OPT_ID_STA_PLUS_10)
			.AddRndOptId(RND_OPT_ID_WIS_PLUS_10)
			.AddRndOptId(RND_OPT_ID_SPL_PLUS_10)
			.AddRndOptId(RND_OPT_ID_CON_PLUS_10)
			.AddRndOptId(RND_OPT_ID_CRT_PLUS_10)
	);



	// フォーティファイド武器（片手）（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_USE_ENCHANT_ELM_CONF)
	);

	// フォーティファイド武器（片手）（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_50)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_50)
	);

	// フォーティファイド武器（片手）（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_10)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_10)
	);

	// フォーティファイド武器（片手）（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_10)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_10)
	);

	//フォーティファイド武器（片手）（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_10)
	);



	// フォーティファイド武器（両手）（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_USE_ENCHANT_ELM_CONF)
	);

	// フォーティファイド武器（両手）（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_100)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_100)
	);

	// フォーティファイド武器（両手）（第３オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_3")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_ASPD_UP_15)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_20)
	);

	// フォーティファイド武器（両手）（第４オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_4")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_CAST_TIME_15)
			.AddRndOptId(RND_OPT_ID_DELAY_DOWN_15)
	);

	//フォーティファイド武器（両手）（第５オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_FORTIFIED_ARMS_2HAND_5")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_COST_DOWN_20)
	);



	// シャドウ　オルタネイト共通（第１オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHADOW_ALTERNATE_COMMON_1")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_STR_PLUS_3)
			.AddRndOptId(RND_OPT_ID_AGI_PLUS_3)
			.AddRndOptId(RND_OPT_ID_VIT_PLUS_3)
			.AddRndOptId(RND_OPT_ID_INT_PLUS_3)
			.AddRndOptId(RND_OPT_ID_DEX_PLUS_3)
			.AddRndOptId(RND_OPT_ID_LUK_PLUS_3)
	);

	// シャドウ　オルタネイトアーマー（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHADOW_ALTERNATE_ARMOR_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_500)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_5)
			.AddRndOptId(RND_OPT_ID_HIT_PLUS_50)
			.AddRndOptId(RND_OPT_ID_FLEE_PLUS_50)
			.AddRndOptId(RND_OPT_ID_HPR_UP_20)
			.AddRndOptId(RND_OPT_ID_SPR_UP_20)
			.AddRndOptId(RND_OPT_ID_H_PLUS_PLUS_5)
			.AddRndOptId(RND_OPT_ID_HEAL_UP_USING_10)
	);

	// シャドウ　オルタネイトウェポン（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHADOW_ALTERNATE_WEAPON_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_500)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_5)
			.AddRndOptId(RND_OPT_ID_ATK_PLUS_50)
			.AddRndOptId(RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_50)
			.AddRndOptId(RND_OPT_ID_HPR_UP_20)
			.AddRndOptId(RND_OPT_ID_SPR_UP_20)
			.AddRndOptId(RND_OPT_ID_P_ATK_PLUS_3)
			.AddRndOptId(RND_OPT_ID_S_MATK_PLUS_3)
	);

	// シャドウ　オルタネイトシールド（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHADOW_ALTERNATE_SHIELD_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_500)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_5)
			.AddRndOptId(RND_OPT_ID_DEF_PLUS_50)
			.AddRndOptId(RND_OPT_ID_MDEF_PLUS_10)
			.AddRndOptId(RND_OPT_ID_HPR_UP_20)
			.AddRndOptId(RND_OPT_ID_SPR_UP_20)
			.AddRndOptId(RND_OPT_ID_RES_PLUS_15)
			.AddRndOptId(RND_OPT_ID_MRES_PLUS_15)
	);

	// シャドウ　オルタネイトシューズ（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHADOW_ALTERNATE_SHOES_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_500)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_5)
			.AddRndOptId(RND_OPT_ID_CRI_PLUS_15)
			.AddRndOptId(RND_OPT_ID_CRITICAL_DAMAGE_UP_15)
			.AddRndOptId(RND_OPT_ID_HPR_UP_20)
			.AddRndOptId(RND_OPT_ID_SPR_UP_20)
			.AddRndOptId(RND_OPT_ID_LUCKY_PLUS_3)
			.AddRndOptId(RND_OPT_ID_C_RATE_PLUS_3)
	);

	// シャドウ　オルタネイトアクセサリ（第２オプション）
	funcRegister(
		new CRndOptList()
			.SetDefName("RND_OPT_LIST_ID_SHADOW_ALTERNATE_ACCESSORY_2")
			.AddRndOptId(RND_OPT_ID_NONE)
			.AddRndOptId(RND_OPT_ID_MAXHP_PLUS_500)
			.AddRndOptId(RND_OPT_ID_MAXSP_PLUS_5)
			.AddRndOptId(RND_OPT_ID_HPR_UP_20)
			.AddRndOptId(RND_OPT_ID_SPR_UP_20)
			.AddRndOptId(RND_OPT_ID_POW_PLUS_3)
			.AddRndOptId(RND_OPT_ID_STA_PLUS_3)
			.AddRndOptId(RND_OPT_ID_WIS_PLUS_3)
			.AddRndOptId(RND_OPT_ID_SPL_PLUS_3)
			.AddRndOptId(RND_OPT_ID_CON_PLUS_3)
			.AddRndOptId(RND_OPT_ID_CRT_PLUS_3)
	);





	// グローバル変数を書き換える
	g_rndOptListArray = new Array();

	for (idx = 0; idx < list.length; idx++) {
		g_rndOptListArray.push(list[idx].MakeDat());
	}

};



// データ上書き
if (_DATA_CREATE_MODE) {
	CRndOptListDataMaker.OverrideData();
}
