
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * ランダムオプションデータクラス.
 */
function CRndOpt () {

	/** ID. */
	this.id = 0;

	/** 定義名. */
	this.defName = "RND_OPT_ID_UNKNOWN";

	/** SPID. */
	this.spid = 0;

	/** 最小値. */
	this.minValue = 0;

	/** 最大値. */
	this.maxValue = 0;

	/** 刻み幅. */
	this.valueStep = 1;

	/** 特殊フラグ. */
	this.specialFlag = RND_OPT_SPECIAL_FLAG_NONE;



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
	 * SPID を設定する.
	 * @param spid SPID
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetSpId = function (spid) {
		this.spid = spid;
		return this;
	};

	/**
	 * 最小値を設定する.
	 * @param minValue 最小値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMinValue = function (minValue) {
		this.minValue = minValue;
		return this;
	};

	/**
	 * 最大値を設定する.
	 * @param maxValue 最大値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMaxValue = function (maxValue) {
		this.maxValue = maxValue;
		return this;
	};

	/**
	 * 刻み幅を設定する.
	 * @param valueStep 刻み幅
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetValueStep = function (valueStep) {
		this.valueStep = valueStep;
		return this;
	};

	/**
	 * 特殊フラグを設定する.
	 * @param specialFlag 刻み幅
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetSpecialFlag = function (specialFlag) {
		this.specialFlag = specialFlag;
		return this;
	};



	/**
	 * dat データに変換する.
	 * @return dat データ（配列）
	 */
	this.MakeDat = function () {
		return [
			this.id,
			this.spid,
			this.minValue,
			this.maxValue,
			this.valueStep,
			this.specialFlag,
		];
	};
}



/**
 * ランダムオプションデータ作成クラス.
 */
function CRndOptDataMaker () {

}

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CRndOptDataMaker.RegisterId = function (name, value) {
	if (name != "RND_OPT_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumRndOptId", [name], value, undefined);
	}
	return value;
};



/**
 * データ定義を上書き定義する.
 */
CRndOptDataMaker.OverrideData = function () {

	var idx = 0;

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
		new CRndOpt()
			.SetDefName("RND_OPT_ID_NONE")
	);



	// STR+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_STR_PLUS_200")
			.SetSpId(ITEM_SP_STR_PLUS)
			.SetMaxValue(200)
	);

	// AGI+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_AGI_PLUS_200")
			.SetSpId(ITEM_SP_AGI_PLUS)
			.SetMaxValue(200)
	);

	// VIT+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_VIT_PLUS_200")
			.SetSpId(ITEM_SP_VIT_PLUS)
			.SetMaxValue(200)
	);

	// INT+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_INT_PLUS_200")
			.SetSpId(ITEM_SP_INT_PLUS)
			.SetMaxValue(200)
	);

	// DEX+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEX_PLUS_200")
			.SetSpId(ITEM_SP_DEX_PLUS)
			.SetMaxValue(200)
	);

	// LUK+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUK_PLUS_200")
			.SetSpId(ITEM_SP_LUK_PLUS)
			.SetMaxValue(200)
	);

	// 全ステ+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ALLSTATUS_PLUS_200")
			.SetSpId(ITEM_SP_ALLSTATUS_PLUS)
			.SetMaxValue(200)
	);

	// HIT+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HIT_PLUS_200")
			.SetSpId(ITEM_SP_HIT_PLUS)
			.SetMaxValue(200)
	);

	// FLEE+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_FLEE_PLUS_200")
			.SetSpId(ITEM_SP_FLEE_PLUS)
			.SetMaxValue(200)
	);

	// CRI+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRI_PLUS_200")
			.SetSpId(ITEM_SP_CRI_PLUS)
			.SetMaxValue(200)
	);

	// 完全回避+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUCKY_PLUS_200")
			.SetSpId(ITEM_SP_LUCKY_PLUS)
			.SetMaxValue(200)
	);

	// ASPD%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ASPD_UP_200")
			.SetSpId(ITEM_SP_ASPD_UP)
			.SetMaxValue(200)
	);

	// ASPD+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ASPD_PLUS_200")
			.SetSpId(ITEM_SP_ASPD_PLUS)
			.SetMaxValue(200)
	);

	// MaxHP+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXHP_PLUS_200")
			.SetSpId(ITEM_SP_MAXHP_PLUS)
			.SetMaxValue(200)
	);

	// MaxHP%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXHP_UP_200")
			.SetSpId(ITEM_SP_MAXHP_UP)
			.SetMaxValue(200)
	);

	// MaxSP+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXSP_PLUS_200")
			.SetSpId(ITEM_SP_MAXSP_PLUS)
			.SetMaxValue(200)
	);

	// MaxSP%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXSP_UP_200")
			.SetSpId(ITEM_SP_MAXSP_UP)
			.SetMaxValue(200)
	);

	// HP回復力%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HPR_UP_200")
			.SetSpId(ITEM_SP_HPR_UP)
			.SetMaxValue(200)
	);

	// SP回復力%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_SPR_UP_200")
			.SetSpId(ITEM_SP_SPR_UP)
			.SetMaxValue(200)
	);

	// Atk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ATK_PLUS_200")
			.SetSpId(ITEM_SP_ATK_PLUS)
			.SetMaxValue(200)
	);

	// Matk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_200")
			.SetSpId(ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF)
			.SetMaxValue(200)
	);

	// Def+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEF_PLUS_200")
			.SetSpId(ITEM_SP_DEF_PLUS)
			.SetMaxValue(200)
	);

	// Mdef+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MDEF_PLUS_200")
			.SetSpId(ITEM_SP_MDEF_PLUS)
			.SetMaxValue(200)
	);

	// 詠唱時間-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CAST_TIME_200")
			.SetSpId(ITEM_SP_SKILL_CAST_TIME)
			.SetMaxValue(200)
	);

	// ディレイ-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DELAY_DOWN_200")
			.SetSpId(ITEM_SP_SKILL_DELAY_DOWN)
			.SetMaxValue(200)
	);

	// クリティカルダメージ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_DAMAGE_UP_200")
			.SetSpId(ITEM_SP_CRITICAL_DAMAGE_UP)
			.SetMaxValue(200)
	);

	// 遠距離ダメージ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LONGRANGE_DAMAGE_UP_200")
			.SetSpId(ITEM_SP_LONGRANGE_DAMAGE_UP)
			.SetMaxValue(200)
	);

	// 遠距離耐性%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_LONGRANGE_200")
			.SetSpId(ITEM_SP_RESIST_LONGRANGE)
			.SetMaxValue(200)
	);

	// ヒール回復ＵＰ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HEAL_UP_USING_200")
			.SetSpId(ITEM_SP_HEAL_UP_USING)
			.SetMaxValue(200)
	);

	// ヒール被回復ＵＰ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HEAL_UP_USED_200")
			.SetSpId(ITEM_SP_HEAL_UP_USED)
			.SetMaxValue(200)
	);

	// 物理UP－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_SOLID_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID)
			.SetMaxValue(200)
	);

	// 物理UP－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_UNDEAD_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD)
			.SetMaxValue(200)
	);

	// 物理UP－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANIMAL_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL)
			.SetMaxValue(200)
	);

	// 物理UP－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_PLANT_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT)
			.SetMaxValue(200)
	);

	// 物理UP－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_INSECT_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT)
			.SetMaxValue(200)
	);

	// 物理UP－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_FISH_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH)
			.SetMaxValue(200)
	);

	// 物理UP－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DEMON_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON)
			.SetMaxValue(200)
	);

	// 物理UP－種族(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_HUMAN_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN)
			.SetMaxValue(200)
	);

	// 物理UP－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANGEL_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL)
			.SetMaxValue(200)
	);

	// 物理UP－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DRAGON_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(無)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(水)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(地)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(火)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(風)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(毒)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(聖)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(闇)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(念)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO)
			.SetMaxValue(200)
	);

	// 物理UP－敵属性(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD)
			.SetMaxValue(200)
	);

	// 物理UP－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_SMALL_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL)
			.SetMaxValue(200)
	);

	// 物理UP－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM)
			.SetMaxValue(200)
	);

	// 物理UP－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_LARGE_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE)
			.SetMaxValue(200)
	);

	// 物理UP－敵級(一般)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_NOTBOSS_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS)
			.SetMaxValue(200)
	);

	// 物理UP－敵級(ボス)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_BOSS_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS)
			.SetMaxValue(200)
	);

	// 物理UP－対人(すべて)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_PLAYER_ALL_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL)
			.SetMaxValue(200)
	);

	// 物理UP－対人(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN)
			.SetMaxValue(200)
	);

	// 物理UP－対人(ドラム)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_PLAYER_DORAM_200")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_SOLID_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_UNDEAD_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANIMAL_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_PLANT_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_INSECT_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_FISH_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DEMON_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_HUMAN_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANGEL_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL)
			.SetMaxValue(200)
	);

	// 魔法UP－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DRAGON_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(無)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(水)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(地)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(火)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(風)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(毒)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(聖)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(闇)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(念)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO)
			.SetMaxValue(200)
	);

	// 魔法UP－敵属性(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD)
			.SetMaxValue(200)
	);

	// 魔法UP－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_SMALL_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL)
			.SetMaxValue(200)
	);

	// 魔法UP－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_MEDIUM_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM)
			.SetMaxValue(200)
	);

	// 魔法UP－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_LARGE_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE)
			.SetMaxValue(200)
	);

	// 魔法UP－敵級(一般)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_NOTBOSS_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS)
			.SetMaxValue(200)
	);

	// 魔法UP－敵級(ボス)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_BOSS_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_BOSS)
			.SetMaxValue(200)
	);

	// 魔法UP－対人(すべて)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_PLAYER_ALL_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL)
			.SetMaxValue(200)
	);

	// 魔法UP－対人(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_PLAYER_HUMAN_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN)
			.SetMaxValue(200)
	);

	// 魔法UP－対人(ドラム)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_PLAYER_DORAM_200")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM)
			.SetMaxValue(200)
	);

	// クリUP－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_SOLID_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_SOLID)
			.SetMaxValue(200)
	);

	// クリUP－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_UNDEAD_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_UNDEAD)
			.SetMaxValue(200)
	);

	// クリUP－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_ANIMAL_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_ANIMAL)
			.SetMaxValue(200)
	);

	// クリUP－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_PLANT_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_PLANT)
			.SetMaxValue(200)
	);

	// クリUP－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_INSECT_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_INSECT)
			.SetMaxValue(200)
	);

	// クリUP－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_FISH_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_FISH)
			.SetMaxValue(200)
	);

	// クリUP－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_DEMON_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_DEMON)
			.SetMaxValue(200)
	);

	// クリUP－種族(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_HUMAN_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_HUMAN)
			.SetMaxValue(200)
	);

	// クリUP－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_ANGEL_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_ANGEL)
			.SetMaxValue(200)
	);

	// クリUP－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_UP_RACE_DRAGON_200")
			.SetSpId(ITEM_SP_CRITICAL_UP_RACE_DRAGON)
			.SetMaxValue(200)
	);

	// DEF無視－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_SOLID_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_SOLID)
			.SetMaxValue(200)
	);

	// DEF無視－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_UNDEAD_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_UNDEAD)
			.SetMaxValue(200)
	);

	// DEF無視－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_ANIMAL_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_ANIMAL)
			.SetMaxValue(200)
	);

	// DEF無視－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_PLANT_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_PLANT)
			.SetMaxValue(200)
	);

	// DEF無視－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_INSECT_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_INSECT)
			.SetMaxValue(200)
	);

	// DEF無視－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_FISH_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_FISH)
			.SetMaxValue(200)
	);

	// DEF無視－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_DEMON_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_DEMON)
			.SetMaxValue(200)
	);

	// DEF無視－種族(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_HUMAN_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_HUMAN)
			.SetMaxValue(200)
	);

	// DEF無視－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_ANGEL_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_ANGEL)
			.SetMaxValue(200)
	);

	// DEF無視－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_RACE_DRAGON_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_RACE_DRAGON)
			.SetMaxValue(200)
	);

	// DEF無視－敵級(一般)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_NOTBOSS_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_NOTBOSS)
			.SetMaxValue(200)
	);

	// DEF無視－敵級(ボス)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_DEF_BOSS_200")
			.SetSpId(ITEM_SP_IGNORE_DEF_BOSS)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_SOLID_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_SOLID)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_UNDEAD_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_UNDEAD)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_ANIMAL_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_ANIMAL)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_PLANT_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_PLANT)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_INSECT_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_INSECT)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_FISH_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_FISH)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_DEMON_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_DEMON)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_HUMAN_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_HUMAN)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_ANGEL_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_ANGEL)
			.SetMaxValue(200)
	);

	// MDEF無視－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_RACE_DRAGON_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_RACE_DRAGON)
			.SetMaxValue(200)
	);

	// MDEF無視－敵級(一般)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_NOTBOSS_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_NOTBOSS)
			.SetMaxValue(200)
	);

	// MDEF無視－敵級(ボス)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_IGNORE_MDEF_BOSS_200")
			.SetSpId(ITEM_SP_IGNORE_MDEF_BOSS)
			.SetMaxValue(200)
	);

	// 耐性－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_SOLID_200")
			.SetSpId(ITEM_SP_RESIST_RACE_SOLID)
			.SetMaxValue(200)
	);

	// 耐性－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_UNDEAD_200")
			.SetSpId(ITEM_SP_RESIST_RACE_UNDEAD)
			.SetMaxValue(200)
	);

	// 耐性－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_ANIMAL_200")
			.SetSpId(ITEM_SP_RESIST_RACE_ANIMAL)
			.SetMaxValue(200)
	);

	// 耐性－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_PLANT_200")
			.SetSpId(ITEM_SP_RESIST_RACE_PLANT)
			.SetMaxValue(200)
	);

	// 耐性－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_INSECT_200")
			.SetSpId(ITEM_SP_RESIST_RACE_INSECT)
			.SetMaxValue(200)
	);

	// 耐性－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_FISH_200")
			.SetSpId(ITEM_SP_RESIST_RACE_FISH)
			.SetMaxValue(200)
	);

	// 耐性－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_DEMON_200")
			.SetSpId(ITEM_SP_RESIST_RACE_DEMON)
			.SetMaxValue(200)
	);

	// 耐性－種族(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_HUMAN_200")
			.SetSpId(ITEM_SP_RESIST_RACE_HUMAN)
			.SetMaxValue(200)
	);

	// 耐性－種族(人間/非ﾌﾟﾚｲﾔｰ)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_HUMAN_NOT_PLAYER_200")
			.SetSpId(ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER)
			.SetMaxValue(200)
	);

	// 耐性－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_ANGEL_200")
			.SetSpId(ITEM_SP_RESIST_RACE_ANGEL)
			.SetMaxValue(200)
	);

	// 耐性－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_RACE_DRAGON_200")
			.SetSpId(ITEM_SP_RESIST_RACE_DRAGON)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(無)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_VANITY_200")
			.SetSpId(ITEM_SP_RESIST_ELM_VANITY)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(水)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_WATER_200")
			.SetSpId(ITEM_SP_RESIST_ELM_WATER)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(地)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_EARTH_200")
			.SetSpId(ITEM_SP_RESIST_ELM_EARTH)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(火)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_FIRE_200")
			.SetSpId(ITEM_SP_RESIST_ELM_FIRE)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(風)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_WIND_200")
			.SetSpId(ITEM_SP_RESIST_ELM_WIND)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(毒)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_POISON_200")
			.SetSpId(ITEM_SP_RESIST_ELM_POISON)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(聖)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_HOLY_200")
			.SetSpId(ITEM_SP_RESIST_ELM_HOLY)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(闇)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_DARK_200")
			.SetSpId(ITEM_SP_RESIST_ELM_DARK)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(念)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_PSYCO_200")
			.SetSpId(ITEM_SP_RESIST_ELM_PSYCO)
			.SetMaxValue(200)
	);

	// 耐性－属性攻撃(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_UNDEAD_200")
			.SetSpId(ITEM_SP_RESIST_ELM_UNDEAD)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(無)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_VANITY_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_VANITY)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(水)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_WATER_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_WATER)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(地)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_EARTH_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_EARTH)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(火)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_FIRE_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_FIRE)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(風)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_WIND_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_WIND)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(毒)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_POISON_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_POISON)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(聖)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_HOLY_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_HOLY)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(闇)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_DARK_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_DARK)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(念)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_PSYCO_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_PSYCO)
			.SetMaxValue(200)
	);

	// 耐性－属性敵(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_MONSTER_ELM_UNDEAD_200")
			.SetSpId(ITEM_SP_RESIST_MONSTER_ELM_UNDEAD)
			.SetMaxValue(200)
	);

	// 耐性－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_SIZE_SMALL_200")
			.SetSpId(ITEM_SP_RESIST_SIZE_SMALL)
			.SetMaxValue(200)
	);

	// 耐性－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_SIZE_MEDIUM_200")
			.SetSpId(ITEM_SP_RESIST_SIZE_MEDIUM)
			.SetMaxValue(200)
	);

	// 耐性－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_SIZE_LARGE_200")
			.SetSpId(ITEM_SP_RESIST_SIZE_LARGE)
			.SetMaxValue(200)
	);

	// 耐性－敵級(一般)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_NOTBOSS_200")
			.SetSpId(ITEM_SP_RESIST_NOTBOSS)
			.SetMaxValue(200)
	);

	// 耐性－敵級(ボス)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_BOSS_200")
			.SetSpId(ITEM_SP_RESIST_BOSS)
			.SetMaxValue(200)
	);

	// 耐性－対人(すべて)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_PLAYER_ALL_200")
			.SetSpId(ITEM_SP_RESIST_PLAYER_ALL)
			.SetMaxValue(200)
	);

	// 耐性－対人(人間)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_PLAYER_HUMAN_200")
			.SetSpId(ITEM_SP_RESIST_PLAYER_HUMAN)
			.SetMaxValue(200)
	);

	// 耐性－対人(ドラム)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_PLAYER_DORAM_200")
			.SetSpId(ITEM_SP_RESIST_PLAYER_DORAM)
			.SetMaxValue(200)
	);

	// 属性付与で設定
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_USE_ENCHANT_ELM_CONF")
			.SetSpId(ITEM_SP_USE_ENCHANT_ELM_CONF)
			.SetMinValue(1)
			.SetMaxValue(1)
	);

	// 未対応
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_NOT_IMPLEMENTED")
			.SetSpId(ITEM_SP_NOT_IMPLEMENTED)
			.SetMinValue(1)
			.SetMaxValue(1)
	);

	// 破壊不可
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_UNBREAKABLE")
			.SetSpId(ITEM_SP_UNBREAKABLE)
			.SetMinValue(0)
			.SetMaxValue(1)
	);

	// 消費SP減少
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_COST_DOWN_200")
			.SetSpId(ITEM_SP_COST_DOWN)
			.SetMaxValue(200)
	);

	// STR+ (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_STR_PLUS_20")
			.SetSpId(ITEM_SP_STR_PLUS)
			.SetMaxValue(20)
	);

	// AGI+ (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_AGI_PLUS_20")
			.SetSpId(ITEM_SP_AGI_PLUS)
			.SetMaxValue(20)
	);

	// VIT+ (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_VIT_PLUS_20")
			.SetSpId(ITEM_SP_VIT_PLUS)
			.SetMaxValue(20)
	);

	// INT+ (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_INT_PLUS_20")
			.SetSpId(ITEM_SP_INT_PLUS)
			.SetMaxValue(20)
	);

	// DEX+ (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEX_PLUS_20")
			.SetSpId(ITEM_SP_DEX_PLUS)
			.SetMaxValue(20)
	);

	// LUK+ (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUK_PLUS_20")
			.SetSpId(ITEM_SP_LUK_PLUS)
			.SetMaxValue(20)
	);

	// MaxHP% (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXHP_UP_10")
			.SetSpId(ITEM_SP_MAXHP_UP)
			.SetMaxValue(10)
	);

	// MaxSP% (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXSP_UP_10")
			.SetSpId(ITEM_SP_MAXSP_UP)
			.SetMaxValue(10)
	);

	// Atk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ATK_PLUS_50")
			.SetSpId(ITEM_SP_ATK_PLUS)
			.SetMaxValue(50)
	);

	// Matk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_50")
			.SetSpId(ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF)
			.SetMaxValue(50)
	);

	// Def+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEF_PLUS_100")
			.SetSpId(ITEM_SP_DEF_PLUS)
			.SetMaxValue(100)
	);

	// Mdef+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MDEF_PLUS_10")
			.SetSpId(ITEM_SP_MDEF_PLUS)
			.SetMaxValue(10)
	);

	// 耐性－属性攻撃(水)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_WATER_5")
			.SetSpId(ITEM_SP_RESIST_ELM_WATER)
			.SetMaxValue(5)
	);

	// 耐性－属性攻撃(地)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_EARTH_5")
			.SetSpId(ITEM_SP_RESIST_ELM_EARTH)
			.SetMaxValue(5)
	);

	// 耐性－属性攻撃(火)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_FIRE_5")
			.SetSpId(ITEM_SP_RESIST_ELM_FIRE)
			.SetMaxValue(5)
	);

	// 耐性－属性攻撃(風)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RESIST_ELM_WIND_5")
			.SetSpId(ITEM_SP_RESIST_ELM_WIND)
			.SetMaxValue(5)
	);

	// HIT+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HIT_PLUS_50")
			.SetSpId(ITEM_SP_HIT_PLUS)
			.SetMaxValue(50)
	);

	// FLEE+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_FLEE_PLUS_50")
			.SetSpId(ITEM_SP_FLEE_PLUS)
			.SetMaxValue(50)
	);

	// 物理UP－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_SOLID_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID)
			.SetMaxValue(20)
	);

	// 物理UP－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_UNDEAD_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD)
			.SetMaxValue(20)
	);

	// 物理UP－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANIMAL_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL)
			.SetMaxValue(20)
	);

	// 物理UP－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_PLANT_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT)
			.SetMaxValue(20)
	);

	// 物理UP－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_INSECT_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT)
			.SetMaxValue(20)
	);

	// 物理UP－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_FISH_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH)
			.SetMaxValue(20)
	);

	// 物理UP－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DEMON_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON)
			.SetMaxValue(20)
	);

	// 物理UP－種族(人間/非ﾌﾟﾚｲﾔｰ)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER)
			.SetMaxValue(20)
	);

	// 物理UP－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_ANGEL_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL)
			.SetMaxValue(20)
	);

	// 物理UP－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_RACE_DRAGON_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(無形)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_SOLID_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(不死)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_UNDEAD_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(動物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANIMAL_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(植物)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_PLANT_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(昆虫)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_INSECT_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(魚類)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_FISH_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(悪魔)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DEMON_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(人間/非ﾌﾟﾚｲﾔｰ)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(天使)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_ANGEL_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL)
			.SetMaxValue(20)
	);

	// 魔法UP－種族(竜族)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_RACE_DRAGON_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON)
			.SetMaxValue(20)
	);

	// ASPD%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ASPD_UP_20")
			.SetSpId(ITEM_SP_ASPD_UP)
			.SetMaxValue(20)
	);

	// ヒール回復ＵＰ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HEAL_UP_USING_20")
			.SetSpId(ITEM_SP_HEAL_UP_USING)
			.SetMaxValue(20)
	);

	// 詠唱時間-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CAST_TIME_20")
			.SetSpId(ITEM_SP_SKILL_CAST_TIME)
			.SetMaxValue(20)
	);

	// ディレイ-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DELAY_DOWN_20")
			.SetSpId(ITEM_SP_SKILL_DELAY_DOWN)
			.SetMaxValue(20)
	);

	// 物理UP－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_SMALL_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL)
			.SetMaxValue(20)
	);

	// 物理UP－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM)
			.SetMaxValue(20)
	);

	// 物理UP－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_LARGE_20")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE)
			.SetMaxValue(20)
	);

	// 魔法UP－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_SMALL_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL)
			.SetMaxValue(20)
	);

	// 魔法UP－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_MEDIUM_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM)
			.SetMaxValue(20)
	);

	// 魔法UP－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_LARGE_20")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE)
			.SetMaxValue(20)
	);

	// ヒール回復ＵＰ%（～60）
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HEAL_UP_USING_60")
			.SetSpId(ITEM_SP_HEAL_UP_USING)
			.SetMaxValue(60)
	);

	// CRI+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRI_PLUS_10")
			.SetSpId(ITEM_SP_CRI_PLUS)
			.SetMaxValue(10)
	);

	// ディレイ-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DELAY_DOWN_15")
			.SetSpId(ITEM_SP_SKILL_DELAY_DOWN)
			.SetMaxValue(15)
	);

	// 消費SP減少
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_COST_DOWN_20")
			.SetSpId(ITEM_SP_COST_DOWN)
			.SetMaxValue(20)
	);

	// 全サイズ100%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_SIZE_PERFECTION")
			.SetSpId(ITEM_SP_SIZE_PERFECTION)
			.SetMinValue(1)
			.SetMaxValue(1)
			.SetSpecialFlag(RND_OPT_SPECIAL_FLAG_ONOFF)
	);

	// STR+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_STR_PLUS_10")
			.SetSpId(ITEM_SP_STR_PLUS)
			.SetMaxValue(10)
	);

	// AGI+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_AGI_PLUS_10")
			.SetSpId(ITEM_SP_AGI_PLUS)
			.SetMaxValue(10)
	);

	// VIT+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_VIT_PLUS_10")
			.SetSpId(ITEM_SP_VIT_PLUS)
			.SetMaxValue(10)
	);

	// INT+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_INT_PLUS_10")
			.SetSpId(ITEM_SP_INT_PLUS)
			.SetMaxValue(10)
	);

	// DEX+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEX_PLUS_10")
			.SetSpId(ITEM_SP_DEX_PLUS)
			.SetMaxValue(10)
	);

	// LUK+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUK_PLUS_10")
			.SetSpId(ITEM_SP_LUK_PLUS)
			.SetMaxValue(10)
	);

	// MaxHP% (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXHP_UP_20")
			.SetSpId(ITEM_SP_MAXHP_UP)
			.SetMaxValue(20)
	);

	// MaxSP% (～20)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXSP_UP_20")
			.SetSpId(ITEM_SP_MAXSP_UP)
			.SetMaxValue(20)
	);

	// ASPD%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ASPD_UP_10")
			.SetSpId(ITEM_SP_ASPD_UP)
			.SetMaxValue(10)
	);

	// 完全回避+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUCKY_PLUS_10")
			.SetSpId(ITEM_SP_LUCKY_PLUS)
			.SetMaxValue(10)
	);

	// 詠唱時間-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CAST_TIME_10")
			.SetSpId(ITEM_SP_SKILL_CAST_TIME)
			.SetMaxValue(10)
	);

	// ディレイ-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DELAY_DOWN_10")
			.SetSpId(ITEM_SP_SKILL_DELAY_DOWN)
			.SetMaxValue(10)
	);

	// 消費SP減少
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_COST_DOWN_10")
			.SetSpId(ITEM_SP_COST_DOWN)
			.SetMaxValue(10)
	);

	// Atk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ATK_PLUS_100")
			.SetSpId(ITEM_SP_ATK_PLUS)
			.SetMaxValue(100)
	);

	// Matk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MATK_PLUS_TYPE_NOTSTUFF_100")
			.SetSpId(ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF)
			.SetMaxValue(100)
	);

	// 完全回避+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUCKY_PLUS_20")
			.SetSpId(ITEM_SP_LUCKY_PLUS)
			.SetMaxValue(20)
	);

	// 物理UP－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_SMALL_30")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL)
			.SetMaxValue(30)
	);

	// 物理UP－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM_30")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM)
			.SetMaxValue(30)
	);

	// 物理UP－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_PHYSICAL_DAMAGE_UP_SIZE_LARGE_30")
			.SetSpId(ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE)
			.SetMaxValue(30)
	);

	// 魔法UP－サイズ(小)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_SMALL_30")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL)
			.SetMaxValue(30)
	);

	// 魔法UP－サイズ(中)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_MEDIUM_30")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM)
			.SetMaxValue(30)
	);

	// 魔法UP－サイズ(大)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAGICAL_DAMAGE_UP_SIZE_LARGE_30")
			.SetSpId(ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE)
			.SetMaxValue(30)
	);

	// POW+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_POW_PLUS_10")
			.SetSpId(ITEM_SP_POW_PLUS)
			.SetMaxValue(10)
	);

	// STA+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_STA_PLUS_10")
			.SetSpId(ITEM_SP_STA_PLUS)
			.SetMaxValue(10)
	);

	// WIS+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_WIS_PLUS_10")
			.SetSpId(ITEM_SP_WIS_PLUS)
			.SetMaxValue(10)
	);

	// SPL+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_SPL_PLUS_10")
			.SetSpId(ITEM_SP_SPL_PLUS)
			.SetMaxValue(10)
	);

	// CON+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CON_PLUS_10")
			.SetSpId(ITEM_SP_CON_PLUS)
			.SetMaxValue(10)
	);

	// CRT+ (～10)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRT_PLUS_10")
			.SetSpId(ITEM_SP_CRT_PLUS)
			.SetMaxValue(10)
	);

	// ASPD%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_ASPD_UP_15")
			.SetSpId(ITEM_SP_ASPD_UP)
			.SetMaxValue(15)
	);

	// 詠唱時間-
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CAST_TIME_15")
			.SetSpId(ITEM_SP_SKILL_CAST_TIME)
			.SetMaxValue(15)
	);

	// STR+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_STR_PLUS_3")
			.SetSpId(ITEM_SP_STR_PLUS)
			.SetMaxValue(3)
	);

	// AGI+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_AGI_PLUS_3")
			.SetSpId(ITEM_SP_AGI_PLUS)
			.SetMaxValue(3)
	);

	// VIT+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_VIT_PLUS_3")
			.SetSpId(ITEM_SP_VIT_PLUS)
			.SetMaxValue(3)
	);

	// INT+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_INT_PLUS_3")
			.SetSpId(ITEM_SP_INT_PLUS)
			.SetMaxValue(3)
	);

	// DEX+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEX_PLUS_3")
			.SetSpId(ITEM_SP_DEX_PLUS)
			.SetMaxValue(3)
	);

	// LUK+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUK_PLUS_3")
			.SetSpId(ITEM_SP_LUK_PLUS)
			.SetMaxValue(3)
	);

	// HP回復力%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HPR_UP_20")
			.SetSpId(ITEM_SP_HPR_UP)
			.SetMaxValue(20)
	);

	// SP回復力%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_SPR_UP_20")
			.SetSpId(ITEM_SP_SPR_UP)
			.SetMaxValue(20)
	);

	// MaxHP+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXHP_PLUS_500")
			.SetSpId(ITEM_SP_MAXHP_PLUS)
			.SetMaxValue(500)
	);

	// MaxSP+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MAXSP_PLUS_5")
			.SetSpId(ITEM_SP_MAXSP_PLUS)
			.SetMaxValue(5)
	);

	// P.Atk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_P_ATK_PLUS_3")
			.SetSpId(ITEM_SP_P_ATK_PLUS)
			.SetMaxValue(3)
	);

	// S.Matk+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_S_MATK_PLUS_3")
			.SetSpId(ITEM_SP_S_MATK_PLUS)
			.SetMaxValue(3)
	);

	// H.Plus+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_H_PLUS_PLUS_5")
			.SetSpId(ITEM_SP_H_PLUS_PLUS)
			.SetMaxValue(5)
	);

	// C.Rate+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_C_RATE_PLUS_3")
			.SetSpId(ITEM_SP_C_RATE_PLUS)
			.SetMaxValue(3)
	);

	// Res
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_RES_PLUS_15")
			.SetSpId(ITEM_SP_RES_PLUS)
			.SetMaxValue(15)
	);

	// Mres
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_MRES_PLUS_15")
			.SetSpId(ITEM_SP_MRES_PLUS)
			.SetMaxValue(15)
	);

	// ヒール回復ＵＰ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_HEAL_UP_USING_10")
			.SetSpId(ITEM_SP_HEAL_UP_USING)
			.SetMaxValue(10)
	);

	// Def+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_DEF_PLUS_50")
			.SetSpId(ITEM_SP_DEF_PLUS)
			.SetMaxValue(50)
	);

	// CRI+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRI_PLUS_15")
			.SetSpId(ITEM_SP_CRI_PLUS)
			.SetMaxValue(15)
	);

	// クリティカルダメージ%
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRITICAL_DAMAGE_UP_15")
			.SetSpId(ITEM_SP_CRITICAL_DAMAGE_UP)
			.SetMaxValue(15)
	);

	// 完全回避+
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_LUCKY_PLUS_3")
			.SetSpId(ITEM_SP_LUCKY_PLUS)
			.SetMaxValue(3)
	);

	// POW+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_POW_PLUS_3")
			.SetSpId(ITEM_SP_POW_PLUS)
			.SetMaxValue(3)
	);

	// STA+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_STA_PLUS_3")
			.SetSpId(ITEM_SP_STA_PLUS)
			.SetMaxValue(3)
	);

	// WIS+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_WIS_PLUS_3")
			.SetSpId(ITEM_SP_WIS_PLUS)
			.SetMaxValue(3)
	);

	// SPL+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_SPL_PLUS_3")
			.SetSpId(ITEM_SP_SPL_PLUS)
			.SetMaxValue(3)
	);

	// CON+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CON_PLUS_3")
			.SetSpId(ITEM_SP_CON_PLUS)
			.SetMaxValue(3)
	);

	// CRT+ (～3)
	funcRegister(
		new CRndOpt()
			.SetDefName("RND_OPT_ID_CRT_PLUS_3")
			.SetSpId(ITEM_SP_CRT_PLUS)
			.SetMaxValue(3)
	);




	// グローバル変数を書き換える
	g_rndOptArray = new Array();

	for (idx = 0; idx < list.length; idx++) {
		g_rndOptArray.push(list[idx].MakeDat());
	}
};



// データ上書き
if (_DATA_CREATE_MODE) {
	CRndOptDataMaker.OverrideData();
}
