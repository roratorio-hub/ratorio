/**
 * セーブデータのマッピングを管理するクラス.
 */
function CSaveDataMappingManager() {

}



/**
 * マッピング配列を取得する.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.GetMappingArray = function (version) {

	var mappingArray = null;

	mappingArray = new Array();

	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayVersion(version));

	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBasicInfo(version));

	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMonsterId(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAutoBaseLevel(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayArrow(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArraySpeedPotion(version));

	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayArmsRight(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayArmsLeft(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayHeadTop(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayHeadMid(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayHeadUnder(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBody(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayShoulder(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayShoes(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAccessory1(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAccessory2(version));

	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayPassiveSkill(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffSkill1(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayChildInfoOld(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAttackSetting(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMobDebuff(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMobBuff(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffSkillMusical(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffSkillGuild(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAutoSpellOld(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCostumeOld(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffSkill2(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffItem(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffElse(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaState(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMobConfPlayer(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustom1(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustom2(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMobConfInput(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAutoSpellOld2(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayLearnedSkill(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayRandomEnchant(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMobConfInputExtend(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffSkill3(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustomStatus(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustomAttack(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustomDefence(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustomSkill(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCostume(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayAutoSpell(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayTimeItem(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayMonsterMap(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayEnchListId(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArraySpecStatus(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayBuffSkill4(version));
	mappingArray = mappingArray.concat(CSaveDataMappingManager.__GetMappingArrayCharaConfCustomSpecStatus(version));

	return mappingArray;
};



/**
 * （内部関数）マッピング配列を取得する（バージョン情報）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayVersion = function (version) {

	var mappingArray = null;

	mappingArray = [
		2,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（基本情報）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBasicInfo = function (version) {

	var mappingArray = null;

	mappingArray = [
		2, 2, 2,
		2, 2, 2, 2, 2, 2,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（敵ＩＤ）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMonsterId = function (version) {

	var mappingArray = null;

	mappingArray = [
		3
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（自動レベル調整フラグ）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAutoBaseLevel = function (version) {

	var mappingArray = null;

	mappingArray = [
		1
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（矢）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayArrow = function (version) {

	var mappingArray = null;

	mappingArray = [
		2
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（速度ＰＯＴ）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArraySpeedPotion = function (version) {

	var mappingArray = null;

	mappingArray = [
		1
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（右手）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayArmsRight = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1,
		3,
		3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（左手）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayArmsLeft = function (version) {

	var mappingArray = null;

	mappingArray = [
		1,
		3,
		3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（頭上段）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayHeadTop = function (version) {

	var mappingArray = null;

	mappingArray = [
		1,
		3,
		3, 3, 3, 3,
		1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（頭中段）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayHeadMid = function (version) {

	var mappingArray = null;

	mappingArray = [
		3,
		3, 3, 3, 3,
		1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（頭下段）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayHeadUnder = function (version) {

	var mappingArray = null;

	mappingArray = [
		3,
		3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（体）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBody = function (version) {

	var mappingArray = null;

	mappingArray = [
		1,
		3,
		3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（肩）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayShoulder = function (version) {

	var mappingArray = null;

	mappingArray = [
		1,
		3,
		3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（靴）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayShoes = function (version) {

	var mappingArray = null;

	mappingArray = [
		1,
		3,
		3, 3, 3, 3,
		1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（アクセ１）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAccessory1 = function (version) {

	var mappingArray = null;

	mappingArray = [
		3,
		3, 3, 3, 3,
		1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（アクセ２）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAccessory2 = function (version) {

	var mappingArray = null;

	mappingArray = [
		3,
		3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（パッシブスキル）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayPassiveSkill = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（一次職支援）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffSkill1 = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（旧養子情報（未使用））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayChildInfoOld = function (version) {

	var mappingArray = null;

	mappingArray = [
		1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（攻撃手段）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAttackSetting = function (version) {

	var mappingArray = null;

	// バージョン 36 まで
	if (version <= 36) {
		mappingArray = [
			3, 1,
			3, 3, 3, 3, 3,
			3, 3, 2,
		];
	}

	// バージョン 37 以降
	else {
		mappingArray = [
			3, 2, 1,
			3, 3, 3, 3, 3,
			3, 3,
		];
	}



	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（モンスター状態異常）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMobDebuff = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 2, 2, 2, 2, 2, 3, 3, 3, 3,
		3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（モンスター状態強化）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMobBuff = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 2, 2, 2, 2, 2, 3, 3, 3, 3,
		3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（演奏/踊り系スキル）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffSkillMusical = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
		2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 2, 2, 2, 2,

		2, 2, 2, 2, 2, 2, 2, 2, 3, 3,
		3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（ギルドスキル/ゴスペル）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffSkillGuild = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（旧オートスペル設定（未使用））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAutoSpellOld = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（旧衣装（未使用））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCostumeOld = function (version) {

	var mappingArray = null;

	mappingArray = [
		3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（二次職支援）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffSkill2 = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（支援アイテム）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffItem = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

		1, 1, 1, 1, 1, 1, 2, 2, 2, 2,
		2, 2, 2, 2, 2, 2, 3, 3, 3, 3,
		3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（その他支援）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffElse = function (version) {

	var mappingArray = null;

	mappingArray = [
		2, 1, 1, 1, 1, 1, 1, 1, 2, 2,
		2, 2, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

		2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（キャラクター状態異常）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaState = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		2, 2, 2, 2, 2, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（対プレイヤー設定）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMobConfPlayer = function (version) {

	var mappingArray = null;

	// バージョン 25 まで
	if (version <= 25) {
		mappingArray = [
			3, 2, 2, 2, 2, 2, 2, 1, 2, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 1, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 3, 3, 2, 1,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,

			2, 2, 3,
		];
	}

	// バージョン 26 以降
	// 小型耐性のセーブ領域が不足していたバグを修正
	else {
		mappingArray = [
			3, 2, 2, 2, 2, 2, 2, 1, 2, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 1, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 3, 3, 2, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,

			2, 2, 2,
		];
	}


	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ１）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustom1 = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 2, 2, 1, 3, 3, 3, 3, 3, 3,
		2, 2, 2, 2, 2, 2, 2, 3, 2, 2,
		2, 2, 2, 2, 3, 3, 3, 2, 2, 2,
		2, 1, 1, 2, 2, 2, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ２）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustom2 = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 3, 3, 2, 3, 3, 2, 3, 3, 2,
		2, 3, 2, 2, 2, 2, 2, 2, 2, 2,
		2, 2, 2, 2, 2, 2, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（モンスター手入力欄）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMobConfInput = function (version) {

	var mappingArray = null;

	mappingArray = [
		2, 3, 2, 3, 2, 2, 2, 2, 2, 2,
		3, 3, 1, 3, 3, 3, 3, 1, 2, 1,
		1, 1, 3, 3, 3, 2, 2, 2, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（旧オートスペル設定２（未使用））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAutoSpellOld2 = function (version) {

	var mappingArray = null;

	mappingArray = [
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
		3, 1, 1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（習得スキル）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayLearnedSkill = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（ランダムオプション）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayRandomEnchant = function (version) {

	var mappingArray = null;

	mappingArray = [
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（モンスター手入力欄拡張）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMobConfInputExtend = function (version) {

	var mappingArray = null;

	mappingArray = [
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（三次職支援）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffSkill3 = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 2, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ（ステータス関連））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustomStatus = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 2, 4, 2, 4, 2, 2, 3, 3, 3,
		3, 3, 3, 2, 2, 2, 2, 2, 2, 2,
		2, 2, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ（攻撃関連））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustomAttack = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 2, 2, 1, 3, 2, 2, 2, 2, 2,
		2, 2, 2, 3, 2, 2, 2, 2, 2, 2,
		2, 2, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ（防御関連））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustomDefence = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 3, 3, 2, 2, 2, 2, 2, 2, 2,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ（スキル関連））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustomSkill = function (version) {

	var mappingArray = null;

	mappingArray = [
		1, 3, 2, 2, 2, 2, 2, 2, 2, 2,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（衣装）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCostume = function (version) {

	var mappingArray = null;

	mappingArray = [
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（オートスペル設定）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayAutoSpell = function (version) {

	var mappingArray = null;

	mappingArray = [
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
		3, 1, 2,
	];

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（時限効果設定）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayTimeItem = function (version) {

	var mappingArray = null;

	// バージョン 28 まで
	if (version <= 28) {
	}

	// バージョン 29 以降
	else {
		mappingArray = [
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		];
	}

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（モンスターマップ設定）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayMonsterMap = function (version) {

	var mappingArray = null;

	// バージョン 34 まで
	if (version <= 34) {
	}

	// バージョン 35 以降
	else {
		mappingArray = [
			2, 2,

			      2, 2, 2, 2, 2, 2, 2, 2,
		];
	}

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（エンチャントリストID）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayEnchListId = function (version) {

	var mappingArray = null;

	// バージョン 42 まで
	if (version <= 42) {
	}

	// バージョン 43 以降
	else {
		mappingArray = [
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		];
	}

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（特性ステータス）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArraySpecStatus = function (version) {

	var mappingArray = null;

	// バージョン 48 まで
	if (version <= 48) {
	}

	// バージョン 49 以降
	else {
		mappingArray = [
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		];
	}

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（四次職支援）.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayBuffSkill4 = function (version) {

	var mappingArray = null;

	// バージョン 49 まで
	if (version <= 49) {
	}

	// バージョン 50 以降
	else {
		mappingArray = [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		];
	}

	return mappingArray;
};

/**
 * （内部関数）マッピング配列を取得する（性能カスタマイズ（特性ステータス関連））.
 * @param version バージョン
 * @return マッピング配列
 */
CSaveDataMappingManager.__GetMappingArrayCharaConfCustomSpecStatus = function (version) {

	var mappingArray = null;

	// バージョン 52 まで
	if (version <= 52) {
	}

	// バージョン 53 以降
	else {
		mappingArray = [
			1, 3, 3, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		];
	}

	return mappingArray;
};

