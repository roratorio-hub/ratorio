
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();


/**
 * 逆コーダークラス.
 */
function CReverseCoder () {

}



/**
 * SPID を単離する（2020/05/09 版）.
 * @param spid SPID
 */
CReverseCoder.IsolateItemSpId20200509 = function (spid) {

	var spidArray = new Array();
	var spidWork = spid;

	var funcAnalyze = function (spidCheck) {

		var valDiv = Math.floor(spidWork / spidCheck);

		if (valDiv > 0) {
			spidArray.push(spidCheck * valDiv);
		}

		spidWork = spidWork % spidCheck;
	};

	var funcAnalyzeDetectID = function (spidCheck) {

		var dataid = spidWork - spidCheck;

		if (dataid >= 0) {
			spidArray.push(spidCheck);
			spidArray.push(dataid);
			spidWork = 0;
		}
	};



	if (spid == ITEM_SP_DMY) {
		return [ITEM_SP_DMY];
	}

	if (spid == ITEM_SP_END) {
		return [ITEM_SP_END];
	}



	funcAnalyze(ITEM_SP_BASE_LV_OVER_170_OFFSET);
	funcAnalyze(ITEM_SP_BASE_LV_BY_1_OFFSET);
	funcAnalyze(ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET);
	funcAnalyze(ITEM_SP_PURE_STR_90_OFFSET);
	funcAnalyze(ITEM_SP_REFINE_OVER_1_OFFSET);
	funcAnalyze(ITEM_SP_REFINE_BY_1_OFFSET);

	funcAnalyzeDetectID(ITEM_SP_SKILL_COST_MINUS_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_COST_SCALING_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_COOL_MINUS_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_FIXED_MINUS_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_FIXED_TIME_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_CAST_MINUS_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_CAST_TIME_OFFSET);
	funcAnalyzeDetectID(ITEM_SP_SKILL_DAMAGE_OFFSET);

/*
	funcAnalyzeDetectID(3000);		// モンスター抵抗
	funcAnalyzeDetectID(1000);		// モンスター特化
*/

	if (spidWork > 0) {
		spidArray.push(spidWork);
	}

	return spidArray;
};



/**
 * SPID の指定を逆変換する.
 * @param spid SPID
 */
CReverseCoder.GetReverseCodeSpId20200509 = function (spid) {

	var idx = 0;

	var isolatedSpIdArray = null;

	var spiddef = "";
	var defall = "";

	var bSkillId = false;

	// セット定義は変換しない
	if (spid == ITEM_SP_SET_DEFINITION) {
		return spid;
	}

	// SPID を分離
	isolatedSpIdArray = CReverseCoder.IsolateItemSpId20200509(spid);

	// 分離した SPID を定義命令文に変換する
	bSkillId = false;
	for (idx = 0; idx < isolatedSpIdArray.length; idx++) {

		// スキル ID 指定の場合
		if (bSkillId) {
			spiddef = EnumSkillId.GetDefinedName(isolatedSpIdArray[idx]);
		}

		// 上記以外の場合は、SPID 定義定数を検索
		else {
			spiddef = EnumItemSpId.GetDefinedName(isolatedSpIdArray[idx]);
		}

		// 検索に失敗している場合は、値をそのまま採用する
		if (spiddef == "") {
			spiddef = isolatedSpIdArray[idx];
		}

		// 命令文に加工
		if (idx > 0) {
			defall += " + ";
		}

		defall += spiddef;

		// 特定の ID を指定する SPID の場合は、フラグを立てておく
		switch (isolatedSpIdArray[idx]) {

		// スキル ID 指定系
		case ITEM_SP_SKILL_COST_MINUS_OFFSET:
		case ITEM_SP_SKILL_COST_SCALING_OFFSET:
		case ITEM_SP_SKILL_COOL_MINUS_OFFSET:
		case ITEM_SP_SKILL_FIXED_MINUS_OFFSET:
		case ITEM_SP_SKILL_FIXED_TIME_OFFSET:
		case ITEM_SP_SKILL_CAST_MINUS_OFFSET:
		case ITEM_SP_SKILL_CAST_TIME_OFFSET:
		case ITEM_SP_SKILL_DAMAGE_OFFSET:
			bSkillId = true;
			break;

		default:
			bSkillId = false;
			break;
		}
	}

	return defall;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（アイテム用 2020/05/09 版）.
 */
CReverseCoder.GetReverseCodeItem20200509 = function () {

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeItemSub20200509();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "RegisterItemId(\"" + defData[ITEM_DATA_INDEX_ID] + "\", ItemID);" + "\n";

		reversedText += "ItemData = [" + "\n";

		reversedText += "\t" + "ItemID," + "\n";
		reversedText += "\t" + "ItemKind(" + defData[ITEM_DATA_INDEX_KIND] + ")," + "\n";
		reversedText += "\t" + "ItemEquipFlag(" + defData[ITEM_DATA_INDEX_EQPFLG] + ")," + "\n";
		reversedText += "\t" + "ItemPower(" + defData[ITEM_DATA_INDEX_POWER] + ")," + "\n";
		reversedText += "\t" + "ItemWeaponLevel(" + defData[ITEM_DATA_INDEX_WPNLV] + ")," + "\n";
		reversedText += "\t" + "ItemSlot(" + defData[ITEM_DATA_INDEX_SLOT] + ")," + "\n";
		reversedText += "\t" + "ItemWeight(" + defData[ITEM_DATA_INDEX_WEIGHT] + ")," + "\n";
		reversedText += "\t" + "ItemEquipLevel(" + defData[ITEM_DATA_INDEX_EQPLV] + ")," + "\n";
		reversedText += "\t" + "ItemName(\"" + defData[ITEM_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "ItemKana(\"" + defData[ITEM_DATA_INDEX_KANA] + "\")," + "\n";
		reversedText += "\t" + "ItemDetailText(\"" + defData[ITEM_DATA_INDEX_DETAIL] + "\")," + "\n";

		for (idxSP = ITEM_DATA_INDEX_SPBEGIN; (idxSP + 2) < defData.length; idxSP += 2) {

			// セット定義は出力しない
			if (defData[idxSP] == ITEM_SP_SET_DEFINITION) {
				continue;
			}

			reversedText += "\t" + defData[idxSP] + ", " + defData[idxSP + 1] + "," + "\n";
		}

		reversedText += "\t" + "ITEM_SP_END" + "\n";

		reversedText += "];" + "\n";

		reversedText += "ItemOBJ[ItemID] = ItemData;\t\t// 代入先注意" + "\n";
		reversedText += "ItemID++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（アイテム用 2020/05/09 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeItemSub20200509 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var itemData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bSkillId = false;

	var definerArray = null;

	definerArray = new Array();

	// アイテムデータを全走査して、定義用データに変換（未加工データを元に出力する）
	for (idx = 0; idx < ItemObjOrg.length; idx++) {

		itemData = ItemObjOrg[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < itemData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case ITEM_DATA_INDEX_POWER:
			case ITEM_DATA_INDEX_WPNLV:
			case ITEM_DATA_INDEX_WEIGHT:
			case ITEM_DATA_INDEX_EQPLV:
			case ITEM_DATA_INDEX_NAME:
			case ITEM_DATA_INDEX_KANA:
			case ITEM_DATA_INDEX_DETAIL:
				defData[idxData] = itemData[idxData];
				break;

			// アイテムＩＤ
			case ITEM_DATA_INDEX_ID:
				defData[idxData] = EnumItemId.GetDefinedName(itemData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = "ITEM_ID_" + idx;
				}
				break;

			// アイテム種別
			case ITEM_DATA_INDEX_KIND:
				defData[idxData] = EnumItemKind.GetDefinedName(itemData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = itemData[idxData];
				}
				break;

			// 装備フラグ
			case ITEM_DATA_INDEX_EQPFLG:
				defData[idxData] = EnumEquipFlag.GetDefinedName(itemData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = itemData[idxData];
				}
				break;

			// スロット
			case ITEM_DATA_INDEX_SLOT:
				defData[idxData] = Math.floor(itemData[idxData] / 10) + ", " + (itemData[idxData] % 10);
				break;

			// SP 定義領域
			default:

				// SPID は変換する
				if (((idxData - ITEM_DATA_INDEX_SPBEGIN) % 2) == 0) {
					defData[idxData] = CReverseCoder.GetReverseCodeSpId20200509(itemData[idxData]);
				}

				// SPID 以外は変換しない
				else {
					defData[idxData] = itemData[idxData];
				}

				break;
			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（スキル用 2020/05/09 版）.
 */
CReverseCoder.GetReverseCodeSkill20200525 = function () {

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeSkillSub20200525();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CSkillDataMaker.RegisterId(\"" + defData[SKILL_DATA_INDEX_ID] + "\", skillId);" + "\n";

		reversedText += "skillData = [" + "\n";

		reversedText += "\t" + "skillId," + "\n";
		reversedText += "\t" + "CSkillDataMaker.SkillMaxLevel(" + defData[SKILL_DATA_INDEX_MAXLV] + ")," + "\n";
		reversedText += "\t" + "CSkillDataMaker.SkillName(\"" + defData[SKILL_DATA_INDEX_NAME] + "\")," + "\n";

		reversedText += "];" + "\n";

		reversedText += "SkillObjNew[skillId] = skillData;" + "\n";
		reversedText += "skillId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（スキル用 2020/05/09 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeSkillSub20200525 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var skillData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bSkillId = false;
	var skillId = 0;

	var definerArray = null;

	definerArray = new Array();

	// スキルデータを全走査して、定義用データに変換（未加工データを元に出力する）
	for (idx = 0; idx < SkillObjNew.length; idx++) {

		skillData = SkillObjNew[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < skillData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case SKILL_DATA_INDEX_MAXLV:
			case SKILL_DATA_INDEX_NAME:
				defData[idxData] = skillData[idxData];
				break;

			// スキルＩＤ
			case SKILL_DATA_INDEX_ID:
				defData[idxData] = EnumSkillId.GetDefinedName(skillData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = "SKILL_ID_" + idx;
				}
				break;

			}
		}

		// 追加データ
		skillId = skillData[SKILL_DATA_INDEX_ID];

		// 読み仮名
		defData[SKILL_DATA_INDEX_KANA] = g_skillManager.dataArray[skillId].kana;


		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（使用可能スキル用 2020/05/25 版）.
 */
CReverseCoder.GetReverseCodeUsableSkill20200525 = function () {

	var defNameArray = [
		"USABEL_SKILL_ID_NONE",
		"USABEL_SKILL_ID_COLD_BOLT_3",
		"USABEL_SKILL_ID_FIRE_BOLT_3",
		"USABEL_SKILL_ID_BASH_BY_CUTLASS",
		"USABEL_SKILL_ID_HEAL_BY_LIGHT_EPSILON",
		"USABEL_SKILL_ID_HEAL_1",
		"USABEL_SKILL_ID_CURE_1",
		"USABEL_SKILL_ID_HEAL_BY_BRYUNAK",
		"USABEL_SKILL_ID_TOMAHAWK_NAGE_BY_TOMAHAWK",
		"USABEL_SKILL_ID_JUPITER_THUNDER_BY_XXXXXXXXXX",
		"USABEL_SKILL_ID_RUWACH_BY_SATELLITE_HAIRBAND",
		"USABEL_SKILL_ID_PIERCE_3",
		"USABEL_SKILL_ID_ANGELUS_1",
		"USABEL_SKILL_ID_FROST_DIVER_5",
		"USABEL_SKILL_ID_METEOR_STORM_3",
		"USABEL_SKILL_ID_SPEAR_STUB_5",
		"USABEL_SKILL_ID_SIGHT_1",
		"USABEL_SKILL_ID_TELEPORT_1",
		"USABEL_SKILL_ID_LIGHTNING_BOLT",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_MAGNUM_BREAK_3",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_CLOAKING_3",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_FIRE_BOLT_5",
		"USABEL_SKILL_ID_FIRE_BALL_5",
		"USABEL_SKILL_ID_FIRE_WALL_5",
		"USABEL_SKILL_ID_COLO_BOLT_5",
		"USABEL_SKILL_ID_LIGHTNING_BOLT_5",
		"USABEL_SKILL_ID_EARTH_SPIKE_5",
		"USABEL_SKILL_ID_SOUL_STRIKE_5",
		"USABEL_SKILL_ID_RESERECTION_BY_YGGDRASILLNO_HA",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_UNKNOWN",
		"USABEL_SKILL_ID_GRAND_CROSS_10",
		"USABEL_SKILL_ID_METEOR_ASSALT_BY_TOZOKUNO_SUSUME_DAIIKKAN",
		"USABEL_SKILL_ID_SURPRISE_ATTACK_BY_SHINSHUKUZIZAI_HAND",
		"USABEL_SKILL_ID_BACK_STUB_BY_SHINSHUKUZIZAI_HAND",
		"USABEL_SKILL_ID_SOUL_BREAKER_BY_GODS_SWORD",
		"USABEL_SKILL_ID_FROST_NOVA_BY_GODS_HELM",
		"USABEL_SKILL_ID_LOV_BY_GODS_GUNTLET",
		"USABEL_SKILL_ID_MAGNUM_BREAK_10",
		"USABEL_SKILL_ID_HEAL_10",
		"USABEL_SKILL_ID_METEOR_STORM_5",
		"USABEL_SKILL_ID_HIDING_3",
		"USABEL_SKILL_ID_VOLCANO_5",
		"USABEL_SKILL_ID_SOKUDO_ZOKA_1",
		"USABEL_SKILL_ID_FIRE_WALL_10",
		"USABEL_SKILL_ID_METEOR_STORM_1",
		"USABEL_SKILL_ID_GREED_1",
		"USABEL_SKILL_ID_MAGNUS_EXORCISMUS_10",
		"USABEL_SKILL_ID_LEX_AETERNA_1",
		"USABEL_SKILL_ID_FLAME_LAUNCHER_1",
		"USABEL_SKILL_ID_ITEM_KANTE_1",
		"USABEL_SKILL_ID_BLESSING_5",
		"USABEL_SKILL_ID_CART_REVOLUTION_1",
		"USABEL_SKILL_ID_SEISMIC_WEAPON_1",
		"USABEL_SKILL_ID_DEMONIC_FIRE_3",
		"USABEL_SKILL_ID_HELL_INFERNO_3",
		"USABEL_SKILL_ID_MAGMA_ILLUPTION_3",
		"USABEL_SKILL_ID_PSYCHIC_WAVE_3",
		"USABEL_SKILL_ID_METALIC_SOUND_3",
		"USABEL_SKILL_ID_JUDEX_3",
		"USABEL_SKILL_ID_TEIOAPUCHAGI_7",
		"USABEL_SKILL_ID_SOUL_BREAKER_5",
		"USABEL_SKILL_ID_PRESSURE_5",
		"USABEL_SKILL_ID_GLORIA_1",
		"USABEL_SKILL_ID_FROST_NOVA_10",
		"USABEL_SKILL_ID_LOV_5",
		"USABEL_SKILL_ID_SHUCHURYOKU_KOZYO_1",
		"USABEL_SKILL_ID_CONCENTRATION_5",
		"USABEL_SKILL_ID_ADRENALINE_RUSH_5",
		"USABEL_SKILL_ID_LIGHTNING_LOADER_1",
		"USABEL_SKILL_ID_WEAPON_PERFECTION_2",
		"USABEL_SKILL_ID_ENDURE_5",
		"USABEL_SKILL_ID_METEOR_STORM_10",
		"USABEL_SKILL_ID_UTSUSEMI_1",
		"USABEL_SKILL_ID_HAMMER_FALL_3",
		"USABEL_SKILL_ID_HEAVENS_DRIVE_3",
		"USABEL_SKILL_ID_CLEARANCE_5",
		"USABEL_SKILL_ID_MAGNIFICAT_5",
		"USABEL_SKILL_ID_MAHORYOKU_ZOFUKU_5",
	];

	var idx = 0;
	var idxSP = 0;

	var defName = "";
	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeUsableSkillSub20200525();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CUsableSkillDataMaker.RegisterId(\"" + defNameArray[idx] + "\", usableSkillId);" + "\n";

		reversedText += "usableSkillData = [" + "\n";

		reversedText += "\t" + "usableSkillId," + "\n";
		reversedText += "\t" + "CUsableSkillDataMaker.UsableSkillAttackable(" + defData[AUTO_SPELL_DATA_INDEX_ATTACKABLE] + ")," + "\n";
		reversedText += "\t" + "CUsableSkillDataMaker.UsableSkillSkill(" + defData[AUTO_SPELL_DATA_INDEX_SKILL_ID] + ")," + "\n";
		reversedText += "\t" + "CUsableSkillDataMaker.UsableSkillLevel(" + defData[AUTO_SPELL_DATA_INDEX_SKILL_LEVEL] + ")," + "\n";

		reversedText += "];" + "\n";

		reversedText += "InsertSkill[usableSkillId] = usableSkillData;" + "\n";
		reversedText += "usableSkillId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（使用可能スキル用 2020/05/25 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeUsableSkillSub20200525 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var usableSkillData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bUsableSkillId = false;

	var definerArray = null;

	definerArray = new Array();

	// 使用可能スキルデータを全走査して、定義用データに変換（未加工データを元に出力する）
	for (idx = 0; idx < InsertSkill.length; idx++) {

		usableSkillData = InsertSkill[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < usableSkillData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case AUTO_SPELL_DATA_INDEX_ID:
			case AUTO_SPELL_DATA_INDEX_SKILL_LEVEL:
				defData[idxData] = usableSkillData[idxData];
				break;

			// 攻撃可否フラグ
			case AUTO_SPELL_DATA_INDEX_ATTACKABLE:
				defData[idxData] = EnumUsableSkillAttackableFlag.GetDefinedName(usableSkillData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = usableSkillData[idxData];
				}
				break;

			// 発動スキルＩＤ
			case AUTO_SPELL_DATA_INDEX_SKILL_ID:
				defData[idxData] = EnumSkillId.GetDefinedName(usableSkillData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = "SKILL_ID_" + idx;
				}
				break;

			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（オートスペル用 2020/05/25 版）.
 */
CReverseCoder.GetReverseCodeAutoSpell20200525 = function () {

	var defNameArray = [
		"AS_ID_HELL_JUDGEMENT_3",
		"AS_ID_THUNDER_STORM_10",
		"AS_ID_SOUL_BREAKER_6",
		"AS_ID_SOUL_BREAKER_10",
		"AS_ID_HOLY_CROSS_10",
		"AS_ID_SPIRAL_PIERCE_5",
		"AS_ID_WATER_BALL_5",
		"AS_ID_EARTH_SPIKE_5",
		"AS_ID_HEAVENS_DRIVE_5",
		"AS_ID_LIGHTNING_BOLT_10",
		"AS_ID_THUNDER_STORM_10",
		"AS_ID_COLD_BOLT_10",
		"AS_ID_FROST_NOVA_10",
		"AS_ID_FIRE_BALL_10",
		"AS_ID_FIRE_BOLT_10",
		"AS_ID_DRAGON_TAIL_5",
		"AS_ID_DARK_CROSS_10",
		"AS_ID_COMBO_GIGANTSET_JOINT_BEAT_1",
		"AS_ID_COMBO_GIGANTSET_SPIRAL_PIERCE_1",
		"AS_ID_EARTH_QUAKE_3",
		"AS_ID_HELL_JUDGEMENT_6",
		"AS_ID_VERATURE_SPEAR_1",
		"AS_ID_EARTH_GRAVE_1",
		"AS_ID_RECOGNIZED_SPELL_1",
		"AS_ID_QUAGMIRE_3",
		"AS_ID_CRYMSON_ROCK_3",
		"AS_ID_HELL_INFERNO_3",
		"AS_ID_JUDEX_3",
		"AS_ID_METEOR_STORM_3",
		"AS_ID_METEOR_STORM_4",
		"AS_ID_METEOR_STORM_5",
		"AS_ID_POWER_SWING_3",
		"AS_ID_PSYCHIC_WAVE_3",
		"AS_ID_SOUL_EXPANSION_1",
		"AS_ID_TELECHINESIS_INSTENCE_1",
		"AS_ID_HEAL_5_BY_ANY_DAMAGE",
		"AS_ID_SHUTTER_STORM_5",
		"AS_ID_EARTH_SPIKE_4",
		"AS_ID_LIGHTNING_BOLT_4",
		"AS_ID_COLD_BOLT_4",
		"AS_ID_FIRE_BOLT_4",
		"AS_ID_DIAMOND_DUST_5",
		"AS_ID_STEAL_5",
		"AS_ID_CHAIN_LIGHTNING_3",
		"AS_ID_NAPALM_VULKAN_3",
		"AS_ID_STEAL_COIN_5",
		"AS_ID_THUNDER_STORM_6",
		"AS_ID_VERATURE_SPEAR_3",
	];

	var idx = 0;
	var idxSP = 0;

	var defName = "";
	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeAutoSpellSub20200525();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		if (idx < 168) {
			defName = "AS_ID_" + idx;
		}
		else {
			defName = defNameArray[idx - 168];
		}

		reversedText += "CAutoSpellDataMaker.RegisterId(\"" + defName + "\", autoSpellId);" + "\n";

		reversedText += "autoSpellData = [" + "\n";

		reversedText += "\t" + "autoSpellId," + "\n";
		reversedText += "\t" + "CAutoSpellDataMaker.AutoSpellAttackable(" + defData[AUTO_SPELL_DATA_INDEX_ATTACKABLE] + ")," + "\n";
		reversedText += "\t" + "CAutoSpellDataMaker.AutoSpellSkill(" + defData[AUTO_SPELL_DATA_INDEX_SKILL_ID] + ")," + "\n";
		reversedText += "\t" + "CAutoSpellDataMaker.AutoSpellLevel(" + defData[AUTO_SPELL_DATA_INDEX_SKILL_LEVEL] + ")," + "\n";
		reversedText += "\t" + "CAutoSpellDataMaker.AutoSpellProb(" + defData[AUTO_SPELL_DATA_INDEX_PROBABLY] + ")," + "\n";
		reversedText += "\t" + "CAutoSpellDataMaker.AutoSpellTrigger(" + defData[AUTO_SPELL_DATA_INDEX_TRIGGER] + ")," + "\n";

		reversedText += "];" + "\n";

		reversedText += "AutoSpellSkill[autoSpellId] = autoSpellData;" + "\n";
		reversedText += "autoSpellId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（オートスペル用 2020/05/25 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeAutoSpellSub20200525 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var autoSpellData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bAutoSpellId = false;

	var definerArray = null;

	definerArray = new Array();

	// オートスペルデータを全走査して、定義用データに変換（未加工データを元に出力する）
	for (idx = 0; idx < AutoSpellSkill.length; idx++) {

		autoSpellData = AutoSpellSkill[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < autoSpellData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case AUTO_SPELL_DATA_INDEX_ID:
			case AUTO_SPELL_DATA_INDEX_ATTACKABLE:
			case AUTO_SPELL_DATA_INDEX_SKILL_LEVEL:
				defData[idxData] = autoSpellData[idxData];
				break;

			// 発動スキルＩＤ
			case AUTO_SPELL_DATA_INDEX_SKILL_ID:
				defData[idxData] = EnumSkillId.GetDefinedName(autoSpellData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = "SKILL_ID_" + idx;
				}
				break;

			// 発動率
			case AUTO_SPELL_DATA_INDEX_PROBABLY:
				defData[idxData] = EnumAutoSpellProb.GetDefinedName(autoSpellData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = autoSpellData[idxData];
				}
				break;

			// 発動トリガ
			case AUTO_SPELL_DATA_INDEX_TRIGGER:
				defData[idxData] = EnumAutoSpellTrigger.GetDefinedName(autoSpellData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = autoSpellData[idxData];
				}
				break;

			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（矢用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeArrow20200510 = function () {

	var defNameArray = [
		"ARROW_ID_NONE",
		"ARROW_ID_YA",
		"ARROW_ID_TETSUNO_YA",
		"ARROW_ID_KOTETSUNO_YA",
		"ARROW_ID_ORIDEOKONNO_YA",
		"ARROW_ID_KARYUDONO_YA",
		"ARROW_ID_ELFNO_YA",
		"ARROW_ID_SUISHONO_YA",
		"ARROW_ID_GANSEKINO_YA",
		"ARROW_ID_HONOONO_YA",
		"ARROW_ID_KAZENO_YA",
		"ARROW_ID_SABITA_YA",
		"ARROW_ID_GINNO_YA",
		"ARROW_ID_HAMAYA",
		"ARROW_ID_SEINARU_YA",
		"ARROW_ID_KAGEYA",
		"ARROW_ID_MUKEINO_YA",
		"ARROW_ID_ZOKUSE_ZIDO_YA_ATK30",
		"ARROW_ID_SURUDOI_YA",
		"ARROW_ID_CURSE_ARROW",
		"ARROW_ID_SILENCE_ARROW",
		"ARROW_ID_SLEEP_ARROW",
		"ARROW_ID_FLASH_ARROW",
		"ARROW_ID_KORINO_YA",
		"ARROW_ID_DOKUYA",
		"ARROW_ID_ATK1NO_YA",
		"ARROW_ID_BULLET",
		"ARROW_ID_BLOOD_BULLET_C",
		"ARROW_ID_AP_BULLET",
		"ARROW_ID_ICE_BULLET",
		"ARROW_ID_FREEZING_BULLET",
		"ARROW_ID_MAGICAL_STONE_BULLET",
		"ARROW_ID_FLARE_BULLET",
		"ARROW_ID_BLAZE_BULLET",
		"ARROW_ID_LIGHTNING_BULLET",
		"ARROW_ID_ELECTRIC_BULLET",
		"ARROW_ID_POISON_BULLET",
		"ARROW_ID_SILVER_BULLET_C",
		"ARROW_ID_SUNCTFIED_BULLET",
		"ARROW_ID_BLIND_BULLET",
	];

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeArrowSub20200510();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CArrowDataMaker.RegisterId(\"" + defNameArray[idx] + "\", arrowId);" + "\n";

		reversedText += "arrowData = [" + "\n";

		reversedText += "\t" + "arrowId," + "\n";
		reversedText += "\t" + "CArrowDataMaker.ArrowName(\"" + defData[ARROW_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "CArrowDataMaker.ArrowKana(\"" + defData[ARROW_DATA_INDEX_KANA] + "\")," + "\n";
		reversedText += "\t" + "CArrowDataMaker.ArrowKind(" + defData[ARROW_DATA_INDEX_KIND] + ")," + "\n";
		reversedText += "\t" + "CArrowDataMaker.ArrowDetailText(\"" + defData[ARROW_DATA_INDEX_DETAIL] + "\")," + "\n";

		for (idxSP = ARROW_DATA_INDEX_SPBEGIN; (idxSP + 2) < defData.length; idxSP += 2) {
			reversedText += "\t" + defData[idxSP] + ", " + defData[idxSP + 1] + "," + "\n";
		}

		reversedText += "\t" + "ITEM_SP_END" + "\n";

		reversedText += "];" + "\n";

		reversedText += "ArrowOBJNew[arrowId] = arrowData;" + "\n";
		reversedText += "arrowId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（矢用 2020/05/10 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeArrowSub20200510 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var arrowData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bSkillId = false;

	var definerArray = null;

	definerArray = new Array();

	// 矢データを全走査して、定義用データに変換
	for (idx = 0; idx < ArrowOBJNew.length; idx++) {

		arrowData = ArrowOBJNew[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < arrowData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case ARROW_DATA_INDEX_ID:
			case ARROW_DATA_INDEX_NAME:
			case ARROW_DATA_INDEX_KANA:
			case ARROW_DATA_INDEX_DETAIL:
				defData[idxData] = arrowData[idxData];
				break;

			// アイテム種別
			case ARROW_DATA_INDEX_KIND:
				defData[idxData] = EnumArrowKind.GetDefinedName(arrowData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = arrowData[idxData];
				}
				break;

			// SP 定義領域
			default:

				// SPID は変換する
				if (((idxData - ARROW_DATA_INDEX_SPBEGIN) % 2) == 0) {
					defData[idxData] = CReverseCoder.GetReverseCodeSpId20200509(arrowData[idxData]);
				}

				// SPID 以外は変換しない
				else {
					defData[idxData] = arrowData[idxData];
				}

				break;
			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（カード用 2020/05/09 版）.
 */
CReverseCoder.GetReverseCodeCard20200509 = function () {

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeCardSub20200509();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "RegisterCardId(\"" + defData[CARD_DATA_INDEX_ID] + "\", CardID);" + "\n";

		reversedText += "CardData = [" + "\n";

		reversedText += "\t" + "CardID," + "\n";
		reversedText += "\t" + "CardKind(" + defData[CARD_DATA_INDEX_KIND] + ")," + "\n";
		reversedText += "\t" + "CardName(\"" + defData[CARD_DATA_INDEX_NAME] + "\")," + "\n";

		// 名称までしか定義されていないデータがあるため
		if (CARD_DATA_INDEX_DETAIL < defData.length) {

			reversedText += "\t" + "CardDetailText(\"" + defData[CARD_DATA_INDEX_DETAIL] + "\")," + "\n";

			for (idxSP = CARD_DATA_INDEX_SPBEGIN; (idxSP + 2) < defData.length; idxSP += 2) {

				// セット定義は出力しない
				if (defData[idxSP] == ITEM_SP_SET_DEFINITION) {
					continue;
				}

				reversedText += "\t" + defData[idxSP] + ", " + defData[idxSP + 1] + "," + "\n";
			}

			reversedText += "\t" + "ITEM_SP_END" + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "CardObjNew[CardID] = CardData;\t\t// 代入先注意" + "\n";
		reversedText += "CardID++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};

/**
 * 定義済みデータ定義用配列を取得する（カード用 2020/05/09 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeCardSub20200509 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var cardData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bSkillId = false;

	var definerArray = null;

	definerArray = new Array();

	// カードデータを全走査して、定義用データに変換
	for (idx = 0; idx < CardObjNew.length; idx++) {

		cardData = CardObjNew[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < cardData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case CARD_DATA_INDEX_NAME:
				defData[idxData] = cardData[idxData];
				break;

			// カードＩＤ
			case CARD_DATA_INDEX_ID:
				defData[idxData] = EnumCardId.GetDefinedName(cardData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = "CARD_ID_" + idx;
				}
				break;

			// カード種別
			case CARD_DATA_INDEX_KIND:
				defData[idxData] = EnumCardKind.GetDefinedName(cardData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = cardData[idxData];
				}
				break;

			// 詳細説明
			case CARD_DATA_INDEX_DETAIL:
				// 特殊効果の設定方法説明文を削除する
				defData[idxData] = "" + cardData[idxData];
				defData[idxData] = defData[idxData].replace(/(<BR>)*<Font size='2'><B>\(特殊効果の.*あります\)<\/B><\/Font>/g, "");
				break;

			// SP 定義領域
			default:

				// SPID は変換する
				if (((idxData - CARD_DATA_INDEX_SPBEGIN) % 2) == 0) {
					defData[idxData] = CReverseCoder.GetReverseCodeSpId20200509(cardData[idxData]);
				}

				// SPID 以外は変換しない
				else {
					defData[idxData] = cardData[idxData];
				}

				break;
			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（衣装用 2020/05/09 版）.
 */
CReverseCoder.GetReverseCodeCostume20200509 = function () {

	var defNameArray = [
		"COSTUME_ID_HEAD_UNDER_NONE",
		"COSTUME_ID_BEGINNER_BO",
	];

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeCostumeSub20200509();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CCostumeDataMaker.RegisterId(\"" + defNameArray[idx] + "\", costumeId);" + "\n";

		reversedText += "costumeData = [" + "\n";

		reversedText += "\t" + "costumeId," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeKind(" + defData[COSTUME_DATA_INDEX_KIND] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeEquipFlag(" + defData[COSTUME_DATA_INDEX_EQPFLG] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumePower(" + defData[COSTUME_DATA_INDEX_POWER] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeWeaponLevel(" + defData[COSTUME_DATA_INDEX_WPNLV] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeSlot(" + defData[COSTUME_DATA_INDEX_SLOT] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeWeight(" + defData[COSTUME_DATA_INDEX_WEIGHT] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeEquipLevel(" + defData[COSTUME_DATA_INDEX_EQPLV] + ")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeName(\"" + defData[COSTUME_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeKana(\"" + defData[COSTUME_DATA_INDEX_KANA] + "\")," + "\n";
		reversedText += "\t" + "CCostumeDataMaker.CostumeDetailText(\"" + defData[COSTUME_DATA_INDEX_DETAIL] + "\")," + "\n";

		for (idxSP = COSTUME_DATA_INDEX_SPBEGIN; (idxSP + 2) < defData.length; idxSP += 2) {
			reversedText += "\t" + defData[idxSP] + ", " + defData[idxSP + 1] + "," + "\n";
		}

		reversedText += "\t" + "ITEM_SP_END" + "\n";

		reversedText += "];" + "\n";

		reversedText += "CostumeOBJ[costumeId] = costumeData;" + "\n";
		reversedText += "costumeId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};

/**
 * 定義済みデータ定義用配列を取得する（衣装用 2020/05/09 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeCostumeSub20200509 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var costumeData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bSkillId = false;

	var definerArray = null;

	definerArray = new Array();

	// 衣装データを全走査して、定義用データに変換
	for (idx = 0; idx < CostumeOBJ.length; idx++) {

		costumeData = CostumeOBJ[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < costumeData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case COSTUME_DATA_INDEX_ID:
			case COSTUME_DATA_INDEX_POWER:
			case COSTUME_DATA_INDEX_WPNLV:
			case COSTUME_DATA_INDEX_WEIGHT:
			case COSTUME_DATA_INDEX_EQPLV:
			case COSTUME_DATA_INDEX_NAME:
			case COSTUME_DATA_INDEX_KANA:
			case COSTUME_DATA_INDEX_DETAIL:
				defData[idxData] = costumeData[idxData];
				break;

			// 衣装種別
			case COSTUME_DATA_INDEX_KIND:
				defData[idxData] = EnumCostumeKind.GetDefinedName(costumeData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = itemData[idxData];
				}
				break;

			// 装備フラグ
			case COSTUME_DATA_INDEX_EQPFLG:
				defData[idxData] = EnumEquipFlag.GetDefinedName(costumeData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = itemData[idxData];
				}
				break;

			// スロット
			case COSTUME_DATA_INDEX_SLOT:
				defData[idxData] = Math.floor(costumeData[idxData] / 10) + ", " + (costumeData[idxData] % 10);
				break;

			// SP 定義領域
			default:

				// SPID は変換する
				if (((idxData - COSTUME_DATA_INDEX_SPBEGIN) % 2) == 0) {
					defData[idxData] = CReverseCoder.GetReverseCodeSpId20200509(costumeData[idxData]);
				}

				// SPID 以外は変換しない
				else {
					defData[idxData] = costumeData[idxData];
				}

				break;
			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（エンチャントタイプ用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeEnchType20200510 = function () {

	var nameCommentArray = [
		"未使用",
		"未使用",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"時空エンチャント",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"ニーズヘッグ＆ロキ帽",
		"大天使の翼",
		"【旧　マジカルフェザー】（未使用）",
		"【旧　シャドウスタッフ】（未使用）",
		"【旧　アイオーンスタッフ】（未使用）",
		"熾天使の翼",
		"ハイレベル",
		"エクセリオンスーツ",
		"エクセリオンウィング",
		"",
		"",
		"幻影の刻印",
		"【旧　サファイアリスト】（未使用）",
		"【旧　執行者のマント】（未使用）",
		"エクセリオンレッグ",
		"【旧　ポロロッカシューズ】（未使用）",
		"RJCネックレス",
		"【旧　与一の肩掛け】（未使用）",
		"堕天使の翼",
		"古びたエンチャント",
		"ピアスエンチャント",
		"パワードメイルエンチャント",
		"ガーディアンユニットエンチャント",
		"パワードガーディアン靴エンチャント",
		"パワードガーディアン肩エンチャント",
		"パワードガーディアンアクセエンチャント",
		"大型ＡＨ兜エンチャント",
		"大型マジェ兜エンチャント",
		"アミストルリュックエンチャント",
		"疾風迅雷エンチャント",
		"天地無双エンチャント",
		"マランエンチャント",
		"マランエンチャント２か所",
		"たれリベリオンエンチャント",
		"【旧　裁きの靴】（未使用）",
		"超時空エンチャント",
		"プロンテラ軍エンチャント",
		"マヌクエンチャント",
		"水天一碧エンチャント",
		"ニーヴエンチャント（盾）",
		"ニーヴエンチャント（アクセ）",
		"熱狂信徒エンチャント",
		"お座り教皇エンチャント",
		"勇者の靴エンチャント",
		"カーリッツバーグ騎士団の鎧エンチャント",
		"小型偵察機エンチャント",
		"浮遊する氷エンチャント",
		"エクスエンチャント",
		"たれチュウニペンギン限界エンチャント",
		"百火猟乱エンチャント",
		"ガーデンオブエデンエンチャント",
		"ジェミニ-S58の目（赤）エンチャント",
		"オープンエアヘッドフォンエンチャント",
		"メディックケープエンチャント",
		"ドレイクコートエンチャント",
		"深淵の回廊エンチャント（武器）",
		"深淵の回廊エンチャント（兜上段）",
		"深淵の回廊エンチャント（兜中段）",
		"深淵の回廊エンチャント（兜下段）",
		"深淵の回廊エンチャント（盾）",
		"深淵の回廊エンチャント（鎧）",
		"深淵の回廊エンチャント（肩）",
		"深淵の回廊エンチャント（靴）",
		"深淵の回廊エンチャント（アクセ）",
		"深淵の回廊エンチャント（武器上級）",
		"深淵の回廊エンチャント（兜上段上級）",
		"深淵の回廊エンチャント（肩上級）",
		"ニーヴエンチャント（武器）",
		"ニーヴエンチャント（靴）",
		"騎士団エンチャント（武器）",
		"騎士団エンチャント（兜）",
		"騎士団エンチャント（鎧）",
		"騎士団エンチャント（盾）",
		"騎士団エンチャント（アクセ）",
		"エクセリオンシールド",
		"深淵の回廊エンチャント（アクセ上級）",
		"深淵の回廊エンチャント（盾上級）",
		"ロックリッジエンチャント（武器）",
		"ロックリッジエンチャント（鎧）",
		"ロックリッジエンチャント（肩）",
		"ロックリッジエンチャント（アクセ）",
		"グレータードラクルホーンエンチャント",
		"ニーヴバレッタエンチャント",
		"ロイヤルマントエンチャント",
		"フェアリークロースエンチャント",
		"スカラバハイヒールエンチャント",
		"Y.S.F.0.1エンチャント（肩）",
		"Y.S.F.0.1エンチャント（鎧）",
		"Y.S.F.0.1エンチャント（靴）",
		"茨のヘアバンドエンチャント",
		"ヴァルキリーシールドエンチャント",
		"ダークハンドエンチャント",
		"マジカルフェザーエンチャント",
		"ライオットチップエンチャント",
		"クイーン・アンズ・リベンジエンチャント",
		"スキンオブシャドウエンチャント",
		"スナイピングスーツエンチャント",
		"リス耳フード帽エンチャント",
		"レッドベビードラゴンエンチャント",
		"ブレイブエンチャント（鎧）",
		"ブレイブエンチャント（肩）",
		"ブレイブエンチャント（靴）",
		"豪遊無双の紋帽子エンチャント",
		"ブースターシューズエンチャント",
		"浮遊する太極玉エンチャント",
		"プロテクトクロースエンチャント",
		"連合軍司令官のマントエンチャント",
		"月食の装束エンチャント",
		"イリュージョンエンチャント（武器）",
		"イリュージョンエンチャント（兜）",
		"イリュージョンエンチャント（盾）",
		"イリュージョンエンチャント（肩）",
		"イリュージョンエンチャント（靴）",
		"イリュージョンエンチャント（アクセ）",
		"モーレツエンチャント（武器）",
		"モーレツエンチャント（鎧）",
		"モーレツエンチャント（靴）",
		"ニーヴエンチャント（肩）",
		"ティアマトチャント（兜下段）",
		"深淵の回廊エンチャント（鎧上級）",
		"思念体エンチャント（指輪）",
		"群星エンチャント",
		"１６ｔｈアニバーサリーエンチャント",
		"リペアメモリーエンチャント",
		"白の騎士団の鎧エンチャント",
		"炎雷魔女の首飾りエンチャント",
		"ヴェスパーヘッドギアエンチャント",
		"リトルガーデンエンチャント",
		"武侠靴エンチャント",
		"ギガントブーツエンチャント",
		"負傷兵の包帯エンチャント",
		"プロテクトフェザーエンチャント",
		"スナイピングベールエンチャント",
		"狐耳鈴リボンエンチャント",
		"堕天司祭の闇光外套エンチャント",
		"鴉天狗の面エンチャント",
		"イリュージョンエンチャント（武器Ｖ２）",
		"イリュージョンエンチャント（兜Ｖ２）",
		"イリュージョンエンチャント（靴Ｖ２）",
		"イリュージョンエンチャント（鎧）",
		"イリュージョンエンチャント（肩Ｖ２）",
		"イリュージョンエンチャント（靴Ｖ３）",
		"闇御津羽神靴エンチャント",
		"淤加美神の羽衣エンチャント",
		"古びた履物エンチャント",
		"降霊術士の手鏡エンチャント",
		"思念体武器エンチャント",
		"ファントムオブマスカレードエンチャント",
		"八卦の封呪エンチャント",
		"シトラスリボンエンチャント",
		"スピリチュアルクロースエンチャント",
		"フロンティアブーツエンチャント",
		"世界樹エンチャント（アクセルウィング）",
		"世界樹エンチャント（水龍神の鱗）",
		"断章エンチャント（武器）",
		"断章エンチャント（アクセ）",
		"ディアボロスブーツエンチャント",
		"ホロウシューズエンチャント",
		"轟鳴鼓エンチャント",
		"イルシオンエンチャント（鎧）",
		"イルシオンエンチャント（肩）",
		"イルシオンエンチャント（靴）",
		"イルシオンエンチャント（アクセ）",
		"イリュージョンエンチャント（兜Ｖ３）",
		"イリュージョンエンチャント（肩Ｖ３）",
		"イリュージョンエンチャント（アクセＶ２）",
		"ガーディアンオブソウルエンチャント",
		"フェザーシールドエンチャント",
		"ランナウェー・アクセラレータエンチャント",
		"ソロモンのペンダントエンチャント",
		"パナギアの贈り物エンチャント",
		"ファランクスエンチャント",
		"スクロールストールエンチャント",
		"ドレスエンチャント",
		"楯無の鎧エンチャント",
		"ギャンブラーシールエンチャント",
		"セブン-イレブンヘッドホンエンチャント",
		"イルシオンエンチャント（盾）",
		"深淵の回廊エンチャント（武器　試練場）",
		"深淵の回廊エンチャント（兜上段　試練場）",
		"深淵の回廊エンチャント（鎧　試練場）",
		"深淵の回廊エンチャント（肩　試練場）",
		"深淵の回廊エンチャント（靴　試練場）",
		"深淵の回廊エンチャント（アクセ　試練場）",
		"オウルヴァイカウントのシルクハットエンチャント",
		"アンドフリームニルのマントエンチャント",
		"悪魔の手エンチャント",
		"ジェジェキャップエンチャント",
		"ジャスパーサークレットエンチャント",
		"聖者の冠エンチャント",
		"精霊王の宝冠エンチャント",
		"不死鳥の冠エンチャント",
		"ブラックフェザーエンチャント",
		"ワークキャップエンチャント",
		"世界樹エンチャント（栄光の御旗(赤)）",
		"世界樹エンチャント（鷹の眼の首飾り）",
	];

	var idx = 0;
	var idxData = 0;

	var enchTypeData = null;

	var reversedText = "";

	for (idx = 0; idx < n_EnchantType.length; idx++) {

		enchTypeData = n_EnchantType[idx];

		if (nameCommentArray[idx].length > 0) {
			reversedText += "// " + nameCommentArray[idx] + "\n";
		}
		else {
			reversedText += "// 未確認エンチャントタイプ（" + idx + "）" + "\n";
		}

		reversedText += "CEnchTypeDataMaker.RegisterId(\"ENCH_TYPE_ID_" + idx + "\", enchTypeId);" + "\n";

		reversedText += "enchTypeData = [" + "\n";

		for (idxData = 0; idxData < enchTypeData.length; idxData++) {
			reversedText += "\t" + enchTypeData[idxData] + "," + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "n_EnchantType[enchTypeId] = enchTypeData;" + "\n";
		reversedText += "enchTypeId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（エンチャントタイプ用 2020/08/18 版）.
 */
CReverseCoder.GetReverseCodeEnchType20200818 = function () {

	var nameCommentArray = [
		"未使用",
		"未使用",
		"未確認エンチャントタイプ（2）",
		"未確認エンチャントタイプ（3）",
		"未確認エンチャントタイプ（4）",
		"未確認エンチャントタイプ（5）",
		"未確認エンチャントタイプ（6）",
		"未確認エンチャントタイプ（7）",
		"未確認エンチャントタイプ（8）",
		"未確認エンチャントタイプ（9）",
		"未確認エンチャントタイプ（10）",
		"未確認エンチャントタイプ（11）",
		"未確認エンチャントタイプ（12）",
		"未確認エンチャントタイプ（13）",
		"未確認エンチャントタイプ（14）",
		"未確認エンチャントタイプ（15）",
		"未確認エンチャントタイプ（16）",
		"未確認エンチャントタイプ（17）",
		"未確認エンチャントタイプ（18）",
		"未確認エンチャントタイプ（19）",
		"未確認エンチャントタイプ（20）",
		"未確認エンチャントタイプ（21）",
		"未確認エンチャントタイプ（22）",
		"未確認エンチャントタイプ（23）",
		"未確認エンチャントタイプ（24）",
		"未確認エンチャントタイプ（25）",
		"未確認エンチャントタイプ（26）",
		"未確認エンチャントタイプ（27）",
		"未確認エンチャントタイプ（28）",
		"未確認エンチャントタイプ（29）",
		"未確認エンチャントタイプ（30）",
		"未確認エンチャントタイプ（31）",
		"未確認エンチャントタイプ（32）",
		"未確認エンチャントタイプ（33）",
		"時空エンチャント",
		"未確認エンチャントタイプ（35）",
		"未確認エンチャントタイプ（36）",
		"未確認エンチャントタイプ（37）",
		"未確認エンチャントタイプ（38）",
		"未確認エンチャントタイプ（39）",
		"未確認エンチャントタイプ（40）",
		"未確認エンチャントタイプ（41）",
		"未確認エンチャントタイプ（42）",
		"未確認エンチャントタイプ（43）",
		"未確認エンチャントタイプ（44）",
		"未確認エンチャントタイプ（45）",
		"未確認エンチャントタイプ（46）",
		"未確認エンチャントタイプ（47）",
		"未確認エンチャントタイプ（48）",
		"未確認エンチャントタイプ（49）",
		"未確認エンチャントタイプ（50）",
		"ニーズヘッグ＆ロキ帽",
		"大天使の翼",
		"【旧　マジカルフェザー】（未使用）",
		"【旧　シャドウスタッフ】（未使用）",
		"【旧　アイオーンスタッフ】（未使用）",
		"熾天使の翼",
		"ハイレベル",
		"エクセリオンスーツ",
		"エクセリオンウィング",
		"未確認エンチャントタイプ（60）",
		"未確認エンチャントタイプ（61）",
		"幻影の刻印",
		"【旧　サファイアリスト】（未使用）",
		"【旧　執行者のマント】（未使用）",
		"エクセリオンレッグ",
		"【旧　ポロロッカシューズ】（未使用）",
		"RJCネックレス",
		"【旧　与一の肩掛け】（未使用）",
		"堕天使の翼",
		"古びたエンチャント",
		"ピアスエンチャント",
		"パワードメイルエンチャント",
		"ガーディアンユニットエンチャント",
		"パワードガーディアン靴エンチャント",
		"パワードガーディアン肩エンチャント",
		"パワードガーディアンアクセエンチャント",
		"大型ＡＨ兜エンチャント",
		"大型マジェ兜エンチャント",
		"アミストルリュックエンチャント",
		"疾風迅雷エンチャント",
		"天地無双エンチャント",
		"マランエンチャント",
		"マランエンチャント２か所",
		"たれリベリオンエンチャント",
		"【旧　裁きの靴】（未使用）",
		"超時空エンチャント",
		"プロンテラ軍エンチャント",
		"マヌクエンチャント",
		"水天一碧エンチャント",
		"ニーヴエンチャント（盾）",
		"ニーヴエンチャント（アクセ）",
		"熱狂信徒エンチャント",
		"お座り教皇エンチャント",
		"勇者の靴エンチャント",
		"カーリッツバーグ騎士団の鎧エンチャント",
		"小型偵察機エンチャント",
		"浮遊する氷エンチャント",
		"エクスエンチャント",
		"たれチュウニペンギン限界エンチャント",
		"百火猟乱エンチャント",
		"ガーデンオブエデンエンチャント",
		"ジェミニ-S58の目（赤）エンチャント",
		"オープンエアヘッドフォンエンチャント",
		"メディックケープエンチャント",
		"ドレイクコートエンチャント",
		"深淵の回廊エンチャント（武器）",
		"深淵の回廊エンチャント（兜上段）",
		"深淵の回廊エンチャント（兜中段）",
		"深淵の回廊エンチャント（兜下段）",
		"深淵の回廊エンチャント（盾）",
		"深淵の回廊エンチャント（鎧）",
		"深淵の回廊エンチャント（肩）",
		"深淵の回廊エンチャント（靴）",
		"深淵の回廊エンチャント（アクセ）",
		"深淵の回廊エンチャント（武器上級）",
		"深淵の回廊エンチャント（兜上段上級）",
		"深淵の回廊エンチャント（肩上級）",
		"ニーヴエンチャント（武器）",
		"ニーヴエンチャント（靴）",
		"騎士団エンチャント（武器）",
		"騎士団エンチャント（兜）",
		"騎士団エンチャント（鎧）",
		"騎士団エンチャント（盾）",
		"騎士団エンチャント（アクセ）",
		"エクセリオンシールド",
		"深淵の回廊エンチャント（アクセ上級）",
		"深淵の回廊エンチャント（盾上級）",
		"ロックリッジエンチャント（武器）",
		"ロックリッジエンチャント（鎧）",
		"ロックリッジエンチャント（肩）",
		"ロックリッジエンチャント（アクセ）",
		"グレータードラクルホーンエンチャント",
		"ニーヴバレッタエンチャント",
		"ロイヤルマントエンチャント",
		"フェアリークロースエンチャント",
		"スカラバハイヒールエンチャント",
		"Y.S.F.0.1エンチャント（肩）",
		"Y.S.F.0.1エンチャント（鎧）",
		"Y.S.F.0.1エンチャント（靴）",
		"茨のヘアバンドエンチャント",
		"ヴァルキリーシールドエンチャント",
		"ダークハンドエンチャント",
		"マジカルフェザーエンチャント",
		"ライオットチップエンチャント",
		"クイーン・アンズ・リベンジエンチャント",
		"スキンオブシャドウエンチャント",
		"スナイピングスーツエンチャント",
		"リス耳フード帽エンチャント",
		"レッドベビードラゴンエンチャント",
		"ブレイブエンチャント（鎧）",
		"ブレイブエンチャント（肩）",
		"ブレイブエンチャント（靴）",
		"豪遊無双の紋帽子エンチャント",
		"ブースターシューズエンチャント",
		"浮遊する太極玉エンチャント",
		"プロテクトクロースエンチャント",
		"連合軍司令官のマントエンチャント",
		"月食の装束エンチャント",
		"イリュージョンエンチャント（武器）",
		"イリュージョンエンチャント（兜）",
		"イリュージョンエンチャント（盾）",
		"イリュージョンエンチャント（肩）",
		"イリュージョンエンチャント（靴）",
		"イリュージョンエンチャント（アクセ）",
		"モーレツエンチャント（武器）",
		"モーレツエンチャント（鎧）",
		"モーレツエンチャント（靴）",
		"ニーヴエンチャント（肩）",
		"ティアマトチャント（兜下段）",
		"深淵の回廊エンチャント（鎧上級）",
		"思念体エンチャント（指輪）",
		"群星エンチャント",
		"１６ｔｈアニバーサリーエンチャント",
		"リペアメモリーエンチャント",
		"白の騎士団の鎧エンチャント",
		"炎雷魔女の首飾りエンチャント",
		"ヴェスパーヘッドギアエンチャント",
		"リトルガーデンエンチャント",
		"武侠靴エンチャント",
		"ギガントブーツエンチャント",
		"負傷兵の包帯エンチャント",
		"プロテクトフェザーエンチャント",
		"スナイピングベールエンチャント",
		"狐耳鈴リボンエンチャント",
		"堕天司祭の闇光外套エンチャント",
		"鴉天狗の面エンチャント",
		"イリュージョンエンチャント（武器Ｖ２）",
		"イリュージョンエンチャント（兜Ｖ２）",
		"イリュージョンエンチャント（靴Ｖ２）",
		"イリュージョンエンチャント（鎧）",
		"イリュージョンエンチャント（肩Ｖ２）",
		"イリュージョンエンチャント（靴Ｖ３）",
		"闇御津羽神靴エンチャント",
		"淤加美神の羽衣エンチャント",
		"古びた履物エンチャント",
		"降霊術士の手鏡エンチャント",
		"思念体武器エンチャント",
		"ファントムオブマスカレードエンチャント",
		"八卦の封呪エンチャント",
		"シトラスリボンエンチャント",
		"スピリチュアルクロースエンチャント",
		"フロンティアブーツエンチャント",
		"世界樹エンチャント（アクセルウィング）",
		"世界樹エンチャント（水龍神の鱗）",
		"断章エンチャント（武器）",
		"断章エンチャント（アクセ）",
		"ディアボロスブーツエンチャント",
		"ホロウシューズエンチャント",
		"轟鳴鼓エンチャント",
		"イルシオンエンチャント（鎧）",
		"イルシオンエンチャント（肩）",
		"イルシオンエンチャント（靴）",
		"イルシオンエンチャント（アクセ）",
		"イリュージョンエンチャント（兜Ｖ３）",
		"イリュージョンエンチャント（肩Ｖ３）",
		"イリュージョンエンチャント（アクセＶ２）",
		"ガーディアンオブソウルエンチャント",
		"フェザーシールドエンチャント",
		"ランナウェー・アクセラレータエンチャント",
		"ソロモンのペンダントエンチャント",
		"パナギアの贈り物エンチャント",
		"ファランクスエンチャント",
		"スクロールストールエンチャント",
		"ドレスエンチャント",
		"楯無の鎧エンチャント",
		"ギャンブラーシールエンチャント",
		"セブン-イレブンヘッドホンエンチャント",
		"イルシオンエンチャント（盾）",
		"深淵の回廊エンチャント（武器　試練場）",
		"深淵の回廊エンチャント（兜上段　試練場）",
		"深淵の回廊エンチャント（鎧　試練場）",
		"深淵の回廊エンチャント（肩　試練場）",
		"深淵の回廊エンチャント（靴　試練場）",
		"深淵の回廊エンチャント（アクセ　試練場）",
		"オウルヴァイカウントのシルクハットエンチャント",
		"アンドフリームニルのマントエンチャント",
		"悪魔の手エンチャント",
		"ジェジェキャップエンチャント",
		"ジャスパーサークレットエンチャント",
		"聖者の冠エンチャント",
		"精霊王の宝冠エンチャント",
		"不死鳥の冠エンチャント",
		"ブラックフェザーエンチャント",
		"ワークキャップエンチャント",
		"世界樹エンチャント（栄光の御旗(赤)）",
		"世界樹エンチャント（鷹の眼の首飾り）",
		"白の騎士団エンチャント",
		"シュミッツエンチャント（アクセ）",
		"シュミッツエンチャント（体）",
		"シュミッツエンチャント（肩）",
		"覚醒淤加美神の羽衣エンチャント",
		"深淵の回廊エンチャント（アクセ　試練場）",
	];

	var idx = 0;
	var idxData = 0;

	var enchTypeData = null;

	var reversedText = "";

	for (idx = 0; idx < n_EnchantType.length; idx++) {

		enchTypeData = n_EnchantType[idx];

		if (nameCommentArray[idx].length > 0) {
			reversedText += "// " + nameCommentArray[idx] + "\n";
		}
		else {
			reversedText += "// 未確認エンチャントタイプ（" + idx + "）" + "\n";
		}

		reversedText += "CEnchTypeDataMaker.RegisterId(\"" + EnumEnchTypeId.GetDefinedName(idx) + "\", enchTypeId);" + "\n";

		reversedText += "enchTypeData = [" + "\n";

		for (idxData = 0; idxData < enchTypeData.length; idxData++) {
			reversedText += "\t" + EnumEnchListId.GetDefinedName(enchTypeData[idxData]) + "," + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "n_EnchantType[enchTypeId] = enchTypeData;" + "\n";
		reversedText += "enchTypeId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（エンチャントリスト用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeEnchList20200510 = function () {

	var nameCommentArray = [
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"時空エンチャント　最終段階",
		"時空エンチャント　途上段階",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"ニーズヘッグ＆ロキ帽（星天１２宮）",
		"大天使の翼（ファミ通の力）",
		"",
		"",
		"シャドウスタッフ　ヘルインフェルノ習得レベル",
		"アイオーンスタッフ　リリース習得レベル",
		"アイオーンスタッフ　魔法力増幅習得レベル",
		"ハイレベル",
		"エクセリオンスーツ",
		"エクセリオンウィング",
		"",
		"",
		"幻影の刻印",
		"ダミー（サファイアリスト用）",
		"執行者のマント　クロスインパクト習得レベル",
		"執行者のマント　グリムトゥース習得レベル",
		"執行者のマント　ソウルブレイカー習得レベル",
		"エクセリオンレッグ",
		"ポロロッカシューズ　ラクリマセット　ウォーターボール習得レベル",
		"ポロロッカシューズ　ラクリマセット　フロストノヴァ習得レベル",
		"RJCネックレス　２スロット目",
		"RJCネックレス　３スロット目",
		"RJCネックレス　４スロット目",
		"与一の肩掛け　エイムドボルト習得レベル",
		"与一の肩掛け　シャープシューティング習得レベル",
		"与一の肩掛け　ブリッツビート習得レベル",
		"古びたエンチャント",
		"ピアスエンチャント第一",
		"ピアスエンチャント第二",
		"ピアスエンチャント第三",
		"ピアスエンチャント第四",
		"パワードメイルエンチャント第一",
		"パワードメイルエンチャント第二",
		"パワードメイルエンチャント第三",
		"ガーディアンユニットエンチャント第一",
		"ガーディアンユニットエンチャント第二",
		"ガーディアンユニットエンチャント第三",
		"パワードガーディアン靴エンチャント第一",
		"パワードガーディアン靴エンチャント第二",
		"パワードガーディアン靴エンチャント第三",
		"パワードガーディアン肩エンチャント第一",
		"パワードガーディアン肩エンチャント第二",
		"パワードガーディアン肩エンチャント第三",
		"パワードガーディアンアクセエンチャント第一",
		"パワードガーディアンアクセエンチャント第二",
		"パワードガーディアンアクセエンチャント第三",
		"大型ＡＨ兜／大型マジェエンチャント第一",
		"大型ＡＨ兜／大型マジェエンチャント第二",
		"大型ＡＨ兜エンチャント第三",
		"大型マジェエンチャント第三",
		"エナジーエンチャント",
		"英雄エンチャント",
		"疾風迅雷エンチャント",
		"天地無双エンチャント",
		"マランエンチャント",
		"たれリベリオンエンチャント",
		"裁きの靴　ホーリーステッキセット　オラティオ習得レベル",
		"裁きの靴　ホーリーステッキセット　ラウダ等習得レベル",
		"超時空エンチャント",
		"プロンテラ軍エンチャント　第一第二",
		"プロンテラ軍エンチャント　第三",
		"マヌクエンチャント　第一",
		"マヌクエンチャント　第二",
		"マヌクエンチャント　第三",
		"水天一碧エンチャント",
		"ニーヴエンチャント（盾）",
		"ニーヴエンチャント（アクセ）",
		"熱狂信徒エンチャント（第一エンチャント）",
		"熱狂信徒エンチャント（第二エンチャント）",
		"熱狂信徒エンチャント（第三エンチャント）",
		"お座り教皇エンチャント",
		"勇者の靴エンチャント",
		"カーリッツバーグ騎士団の鎧エンチャント（第一、第二エンチャント）",
		"カーリッツバーグ騎士団の鎧エンチャント（第三エンチャント）",
		"小型偵察機エンチャント（第一、第二エンチャント）",
		"小型偵察機エンチャント（第三エンチャント）",
		"浮遊する氷エンチャント（第一エンチャント）",
		"浮遊する氷エンチャント（第二エンチャント）",
		"浮遊する氷エンチャント（第三エンチャント）",
		"エクスエンチャント（第一エンチャント）",
		"エクスエンチャント（第二エンチャント）",
		"エクスエンチャント（第三エンチャント）",
		"たれチュウニペンギン限界エンチャント（第一エンチャント）",
		"たれチュウニペンギン限界エンチャント（第二エンチャント）",
		"たれチュウニペンギン限界エンチャント（第三エンチャント）",
		"たれチュウニペンギン限界エンチャント（第四エンチャント）",
		"獄エンチャント",
		"百火猟乱エンチャント",
		"ガーデンオブエデンエンチャント（第一、第二エンチャント）",
		"ガーデンオブエデンエンチャント（第三エンチャント）",
		"ジェミニ-S58の目(赤)エンチャント（第一、第二エンチャント）",
		"ジェミニ-S58の目(赤)エンチャント（第三エンチャント）",
		"オープンエアヘッドフォンエンチャント（第一エンチャント）",
		"オープンエアヘッドフォンエンチャント（第二エンチャント）",
		"オープンエアヘッドフォンエンチャント（第三エンチャント）",
		"メディックケープエンチャント（第一、第二エンチャント）",
		"ドレイクコートエンチャント（第一、第二エンチャント）",
		"深淵の回廊エンチャント（武器）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段）（第三エンチャント）",
		"深淵の回廊エンチャント（兜中段）（第四エンチャント）",
		"深淵の回廊エンチャント（兜下段）（第四エンチャント）",
		"深淵の回廊エンチャント（盾）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧）（第三エンチャント）",
		"深淵の回廊エンチャント（肩）（第四エンチャント）",
		"深淵の回廊エンチャント（肩）（第三エンチャント）",
		"深淵の回廊エンチャント（靴）（第四エンチャント）",
		"深淵の回廊エンチャント（アクセ）（第四エンチャント）",
		"深淵の回廊エンチャント（武器上級）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段上級）（第四エンチャント）",
		"深淵の回廊エンチャント（肩上級）（第四エンチャント）",
		"ニーヴエンチャント（武器）",
		"ニーヴエンチャント（靴）",
		"騎士団エンチャント（武器）（第四エンチャント）",
		"騎士団エンチャント（兜）（第四エンチャント）",
		"騎士団エンチャント（鎧）（第四エンチャント）",
		"騎士団エンチャント（盾）（第四エンチャント）",
		"騎士団エンチャント（アクセ）（第四エンチャント）",
		"騎士団エンチャント（アクセ）（第三エンチャント）",
		"エクセリオンシールド",
		"深淵の回廊エンチャント（アクセ上級）（第四エンチャント）",
		"深淵の回廊エンチャント（アクセ上級）（第三エンチャント）",
		"深淵の回廊エンチャント（盾上級）（第四エンチャント）",
		"ロックリッジエンチャント（武器）（第四エンチャント）",
		"ロックリッジエンチャント（鎧）（第四エンチャント）",
		"ロックリッジエンチャント（鎧）（第三エンチャント）",
		"ロックリッジエンチャント（肩）（第四エンチャント）",
		"ロックリッジエンチャント（肩）（第三エンチャント）",
		"ロックリッジエンチャント（アクセ）（第四エンチャント）",
		"ロックリッジエンチャント（アクセ）（第三エンチャント）",
		"グレータードラクルホーンエンチャント（第三、第四エンチャント）",
		"グレータードラクルホーンエンチャント（第二エンチャント）",
		"ニーヴバレッタエンチャント（第四エンチャント）",
		"ニーヴバレッタエンチャント（第三エンチャント）",
		"ニーヴバレッタエンチャント（第二エンチャント）",
		"ロイヤルマントエンチャント（第四エンチャント）",
		"ロイヤルマントエンチャント（第三エンチャント）",
		"ロイヤルマントエンチャント（第二エンチャント）",
		"フェアリークロースエンチャント（第三、第四エンチャント）",
		"スカラバハイヒールエンチャント（第三、第四エンチャント）",
		"Y.S.F.0.1エンチャント（肩）（第四エンチャント）",
		"Y.S.F.0.1エンチャント（肩）（第三エンチャント）",
		"Y.S.F.0.1エンチャント（肩）（第二エンチャント）",
		"Y.S.F.0.1エンチャント（鎧）（第四エンチャント）",
		"Y.S.F.0.1エンチャント（鎧）（第二エンチャント）",
		"Y.S.F.0.1エンチャント（靴）（第三エンチャント）",
		"茨のヘアバンドエンチャント（第四エンチャント）",
		"茨のヘアバンドエンチャント（第三エンチャント）",
		"ヴァルキリーシールドエンチャント（第四エンチャント）",
		"ヴァルキリーシールドエンチャント（第三エンチャント）",
		"ダークハンドエンチャント（第四エンチャント）",
		"ダークハンドエンチャント（第三エンチャント）",
		"ライオットチップエンチャント（第四エンチャント）",
		"クイーン・アンズ・リベンジエンチャント（第四エンチャント）",
		"クイーン・アンズ・リベンジエンチャント（第三エンチャント）",
		"スキンオブシャドウエンチャント（第四エンチャント）",
		"スキンオブシャドウエンチャント（第三エンチャント）",
		"スナイピングスーツエンチャント（第四エンチャント）",
		"スナイピングスーツエンチャント（第三エンチャント）",
		"レッドベビードラゴンエンチャント（第四エンチャント）",
		"レッドベビードラゴンエンチャント（第三エンチャント）",
		"ブレイブエンチャント（鎧）（第四エンチャント）",
		"ブレイブエンチャント（鎧）（第三エンチャント）",
		"ブレイブエンチャント（鎧）（第二エンチャント）",
		"ブレイブエンチャント（肩）（第四エンチャント）",
		"ブレイブエンチャント（肩）（第三エンチャント）",
		"ブレイブエンチャント（肩）（第二エンチャント）",
		"ブレイブエンチャント（靴）（第三エンチャント）",
		"ブレイブエンチャント（靴）（第二エンチャント）",
		"古びたエンチャント（第二エンチャント）",
		"豪遊無双の紋帽子エンチャント（第三、第四エンチャント）",
		"豪遊無双の紋帽子エンチャント（第二エンチャント）",
		"ブースターシューズエンチャント（第三、第四エンチャント）",
		"浮遊する太極玉エンチャント（第三、第四エンチャント）",
		"浮遊する太極玉エンチャント（第二エンチャント）",
		"プロテクトクロースエンチャント（第四エンチャント）",
		"プロテクトクロースエンチャント（第三エンチャント）",
		"プロテクトクロースエンチャント（第二エンチャント）",
		"連合軍司令官のマントエンチャント（第四エンチャント）",
		"連合軍司令官のマントエンチャント（第三エンチャント）",
		"月食の装束エンチャント（第四エンチャント）",
		"月食の装束エンチャント（第三エンチャント）",
		"イリュージョンエンチャント（武器）（第四エンチャント）",
		"イリュージョンエンチャント（武器）（第三エンチャント）",
		"イリュージョンエンチャント（兜）（第四エンチャント）",
		"イリュージョンエンチャント（兜）（第三エンチャント）",
		"イリュージョンエンチャント（盾）（第四エンチャント）",
		"イリュージョンエンチャント（盾）（第三エンチャント）",
		"イリュージョンエンチャント（肩）（第四エンチャント）",
		"イリュージョンエンチャント（肩）（第三エンチャント）",
		"イリュージョンエンチャント（靴）（第三エンチャント）",
		"イリュージョンエンチャント（アクセ）（第四エンチャント）",
		"イリュージョンエンチャント（アクセ）（第三エンチャント）",
		"モーレツエンチャント（武器）（第四エンチャント）",
		"モーレツエンチャント（鎧）（第四エンチャント）",
		"モーレツエンチャント（靴）（第四エンチャント）",
		"ニーヴエンチャント（肩）",
		"ティアマトエンチャント（兜下段）（第四エンチャント）",
		"ティアマトエンチャント（兜下段）（第三エンチャント）",
		"ティアマトエンチャント（兜下段）（第二エンチャント）",
		"深淵の回廊エンチャント（鎧上級）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧上級）（第三エンチャント）",
		"深淵の回廊エンチャント（武器上級）（第三エンチャント）",
		"思念体エンチャント（指輪）（第四エンチャント）",
		"思念体エンチャント（指輪）（第三エンチャント）",
		"思念体エンチャント（指輪）（第二エンチャント）",
		"群星エンチャント（第四エンチャント）",
		"群星エンチャント（第三エンチャント）",
		"群星エンチャント（第二エンチャント）",
		"１６ｔｈアニバーサリーエンチャント（第四エンチャント）",
		"１６ｔｈアニバーサリーエンチャント（第三エンチャント）",
		"１６ｔｈアニバーサリーエンチャント（第二エンチャント）",
		"リペアメモリーエンチャント（第一エンチャント）",
		"リペアメモリーエンチャント（第二エンチャント）",
		"リペアメモリーエンチャント（第三エンチャント）",
		"白の騎士団の鎧エンチャント（第一、第二エンチャント）",
		"白の騎士団の鎧エンチャント（第三エンチャント）",
		"炎雷魔女の首飾りエンチャント（第一エンチャント）",
		"炎雷魔女の首飾りエンチャント（第二エンチャント）",
		"炎雷魔女の首飾りエンチャント（第三エンチャント）",
		"ヴェスパーヘッドギアエンチャント（第三、第四エンチャント）",
		"リトルガーデンエンチャント（第一、第二エンチャント）",
		"リトルガーデンエンチャント（第三エンチャント）",
		"武侠靴エンチャント（第三、第四エンチャント）",
		"ギガントブーツエンチャント（第四エンチャント）",
		"ギガントブーツエンチャント（第三エンチャント）",
		"負傷兵の包帯エンチャント（第四エンチャント）",
		"負傷兵の包帯エンチャント（第三エンチャント）",
		"プロテクトフェザーエンチャント（第一、第二エンチャント）",
		"プロテクトフェザーエンチャント（第三エンチャント）",
		"スナイピングベールエンチャント（第一エンチャント）",
		"スナイピングベールエンチャント（第二エンチャント）",
		"狐耳鈴リボンエンチャント（第一エンチャント）",
		"狐耳鈴リボンエンチャント（第二エンチャント）",
		"堕天司祭の闇光外套エンチャント（第一エンチャント）",
		"堕天司祭の闇光外套エンチャント（第二エンチャント）",
		"鴉天狗の面エンチャント（第三エンチャント）",
		"イリュージョンエンチャント（武器Ｖ２）（第三エンチャント）",
		"イリュージョンエンチャント（兜Ｖ２）（第三エンチャント）",
		"イリュージョンエンチャント（靴Ｖ２）（第三エンチャント）",
		"イリュージョンエンチャント（鎧）（第四エンチャント）",
		"イリュージョンエンチャント（鎧）（第三エンチャント）",
		"イリュージョンエンチャント（肩Ｖ２）（第四エンチャント）",
		"闇御津羽神靴エンチャント（第一エンチャント）",
		"闇御津羽神靴エンチャント（第二エンチャント）",
		"淤加美神の羽衣エンチャント（第一エンチャント）",
		"淤加美神の羽衣エンチャント（第二エンチャント）",
		"古びた履物エンチャント（第一エンチャント）",
		"降霊術士の手鏡エンチャント（第一エンチャント）",
		"降霊術士の手鏡エンチャント（第二エンチャント）",
		"思念体武器エンチャント（第三エンチャント）",
		"思念体武器エンチャント（第二エンチャント）",
		"ファントムオブマスカレードエンチャント（第一、第二エンチャント）",
		"ファントムオブマスカレードエンチャント（第三エンチャント）",
		"八卦の封呪（第一エンチャント）",
		"八卦の封呪（第二エンチャント）",
		"八卦の封呪（第三エンチャント）",
		"シトラスリボンエンチャント（第一、第二エンチャント）",
		"シトラスリボンエンチャント（第三エンチャント）",
		"スピリチュアルクロースエンチャント（第一、第二エンチャント）",
		"フロンティアブーツエンチャント（第一、第二エンチャント）",
		"世界樹エンチャント（アクセルウィング）（第一、第二エンチャント）",
		"世界樹エンチャント（水龍神の鱗）（第一エンチャント）",
		"世界樹エンチャント（水龍神の鱗）（第二エンチャント）",
		"断章エンチャント（武器）（第四エンチャント）",
		"騎士団エンチャント（アクセ）（第三エンチャント）",
		"ディアボロスブーツエンチャント（第一、第二エンチャント）",
		"ホロウシューズエンチャント（第一エンチャント）",
		"ホロウシューズエンチャント（第二エンチャント）",
		"轟鳴鼓エンチャント（第一、第二エンチャント）",
		"轟鳴鼓エンチャント（第三エンチャント）",
		"イルシオンエンチャント（鎧）",
		"イルシオンエンチャント（肩）",
		"イルシオンエンチャント（靴）",
		"イルシオンエンチャント（アクセ）",
		"イリュージョンエンチャント（兜Ｖ３）（第三エンチャント）",
		"イリュージョンエンチャント（肩）（第三エンチャント）",
		"イリュージョンエンチャント（アクセＶ２）（第四エンチャント）",
		"イリュージョンエンチャント（アクセＶ２）（第三エンチャント）",
		"ガーディアンオブソウルエンチャント（第四エンチャント）",
		"ガーディアンオブソウルエンチャント（第三エンチャント）",
		"フェザーシールドエンチャント（第四エンチャント）",
		"フェザーシールドエンチャント（第三エンチャント）",
		"ランナウェー・アクセラレータエンチャント（第三、第四エンチャント）",
		"ランナウェー・アクセラレータエンチャント（第二エンチャント）",
		"ソロモンのペンダントエンチャント（第四エンチャント）",
		"ソロモンのペンダントエンチャント（第三エンチャント）",
		"ソロモンのペンダントエンチャント（第二エンチャント）",
		"パナギアの贈り物エンチャント（第三、第四エンチャント）",
		"ファランクスエンチャント（第三、第四エンチャント）",
		"ファランクスエンチャント（第二エンチャント）",
		"スクロールストールエンチャント（第三、四エンチャント）",
		"ドレスエンチャント（第四エンチャント）",
		"ドレスエンチャント（第三エンチャント）",
		"ドレスエンチャント（第二エンチャント）",
		"楯無の鎧エンチャント（第四エンチャント）",
		"楯無の鎧エンチャント（第三エンチャント）",
		"ギャンブラーシールエンチャント（第二エンチャント）",
		"セブン-イレブンヘッドホンエンチャント（第三、四エンチャント）",
		"セブン-イレブンヘッドホンエンチャント（第二エンチャント）",
		"イルシオンエンチャント（盾）",
		"深淵の回廊エンチャント（武器　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（肩　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（靴　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（アクセ　試練場）（第四エンチャント）",
		"オウルヴァイカウントのシルクハットエンチャント（第三、第四エンチャント）",
		"アンドフリームニルのマントエンチャント（第四エンチャント）",
		"アンドフリームニルのマントエンチャント（第三エンチャント）",
		"悪魔の手エンチャント（第三、第四エンチャント）",
		"悪魔の手エンチャント（第二エンチャント）",
		"ジェジェキャップエンチャント（第二エンチャント）",
		"ジャスパーサークレットエンチャント（第三、第四エンチャント）",
		"ジャスパーサークレットエンチャント（第二エンチャント）",
		"聖者の冠エンチャント（第三、第四エンチャント）",
		"聖者の冠エンチャント（第二エンチャント）",
		"精霊王の宝冠エンチャント（第三、第四エンチャント）",
		"精霊王の宝冠エンチャント（第二エンチャント）",
		"不死鳥の冠エンチャント（第三、第四エンチャント）",
		"不死鳥の冠エンチャント（第二エンチャント）",
		"ブラックフェザーエンチャント（第三、第四エンチャント）",
		"ブラックフェザーエンチャント（第二エンチャント）",
		"ワークキャップエンチャント（第二エンチャント）",
		"世界樹エンチャント（栄光の御旗(赤)）（第一、第二エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第一エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第二エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第三エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第四エンチャント）",
	];

	var idx = 0;
	var idxData = 0;

	var enchListData = null;

	var reversedText = "";

	for (idx = 0; idx < n_EnchantList.length; idx++) {

		enchListData = n_EnchantList[idx];

		if (nameCommentArray[idx].length > 0) {
			reversedText += "// " + nameCommentArray[idx] + "\n";
		}
		else {
			reversedText += "// 未確認エンチャントリスト（" + idx + "）" + "\n";
		}

		reversedText += "CEnchListDataMaker.RegisterId(\"ENCH_LIST_ID_" + idx + "\", enchListId);" + "\n";

		reversedText += "enchListData = [" + "\n";

		for (idxData = 0; idxData < enchListData.length; idxData++) {
			reversedText += "\t" + enchListData[idxData] + "," + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "n_EnchantList[enchListId] = enchListData;" + "\n";
		reversedText += "enchListId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（エンチャントリスト用 2020/08/18 版）.
 */
CReverseCoder.GetReverseCodeEnchList20200818 = function () {

	var nameCommentArray = [
		"未確認エンチャントリスト（0）",
		"未確認エンチャントリスト（1）",
		"未確認エンチャントリスト（2）",
		"未確認エンチャントリスト（3）",
		"未確認エンチャントリスト（4）",
		"未確認エンチャントリスト（5）",
		"未確認エンチャントリスト（6）",
		"未確認エンチャントリスト（7）",
		"未確認エンチャントリスト（8）",
		"未確認エンチャントリスト（9）",
		"未確認エンチャントリスト（10）",
		"未確認エンチャントリスト（11）",
		"未確認エンチャントリスト（12）",
		"未確認エンチャントリスト（13）",
		"未確認エンチャントリスト（14）",
		"未確認エンチャントリスト（15）",
		"未確認エンチャントリスト（16）",
		"未確認エンチャントリスト（17）",
		"未確認エンチャントリスト（18）",
		"未確認エンチャントリスト（19）",
		"未確認エンチャントリスト（20）",
		"未確認エンチャントリスト（21）",
		"未確認エンチャントリスト（22）",
		"未確認エンチャントリスト（23）",
		"未確認エンチャントリスト（24）",
		"未確認エンチャントリスト（25）",
		"未確認エンチャントリスト（26）",
		"未確認エンチャントリスト（27）",
		"未確認エンチャントリスト（28）",
		"未確認エンチャントリスト（29）",
		"未確認エンチャントリスト（30）",
		"未確認エンチャントリスト（31）",
		"未確認エンチャントリスト（32）",
		"未確認エンチャントリスト（33）",
		"未確認エンチャントリスト（34）",
		"未確認エンチャントリスト（35）",
		"未確認エンチャントリスト（36）",
		"未確認エンチャントリスト（37）",
		"未確認エンチャントリスト（38）",
		"未確認エンチャントリスト（39）",
		"未確認エンチャントリスト（40）",
		"未確認エンチャントリスト（41）",
		"未確認エンチャントリスト（42）",
		"未確認エンチャントリスト（43）",
		"未確認エンチャントリスト（44）",
		"未確認エンチャントリスト（45）",
		"未確認エンチャントリスト（46）",
		"未確認エンチャントリスト（47）",
		"未確認エンチャントリスト（48）",
		"未確認エンチャントリスト（49）",
		"未確認エンチャントリスト（50）",
		"未確認エンチャントリスト（51）",
		"未確認エンチャントリスト（52）",
		"未確認エンチャントリスト（53）",
		"未確認エンチャントリスト（54）",
		"未確認エンチャントリスト（55）",
		"未確認エンチャントリスト（56）",
		"未確認エンチャントリスト（57）",
		"未確認エンチャントリスト（58）",
		"未確認エンチャントリスト（59）",
		"未確認エンチャントリスト（60）",
		"未確認エンチャントリスト（61）",
		"未確認エンチャントリスト（62）",
		"未確認エンチャントリスト（63）",
		"未確認エンチャントリスト（64）",
		"未確認エンチャントリスト（65）",
		"未確認エンチャントリスト（66）",
		"未確認エンチャントリスト（67）",
		"未確認エンチャントリスト（68）",
		"未確認エンチャントリスト（69）",
		"未確認エンチャントリスト（70）",
		"時空エンチャント　最終段階",
		"時空エンチャント　途上段階",
		"未確認エンチャントリスト（73）",
		"未確認エンチャントリスト（74）",
		"未確認エンチャントリスト（75）",
		"未確認エンチャントリスト（76）",
		"未確認エンチャントリスト（77）",
		"未確認エンチャントリスト（78）",
		"未確認エンチャントリスト（79）",
		"未確認エンチャントリスト（80）",
		"未確認エンチャントリスト（81）",
		"未確認エンチャントリスト（82）",
		"未確認エンチャントリスト（83）",
		"未確認エンチャントリスト（84）",
		"未確認エンチャントリスト（85）",
		"未確認エンチャントリスト（86）",
		"未確認エンチャントリスト（87）",
		"未確認エンチャントリスト（88）",
		"未確認エンチャントリスト（89）",
		"未確認エンチャントリスト（90）",
		"未確認エンチャントリスト（91）",
		"未確認エンチャントリスト（92）",
		"未確認エンチャントリスト（93）",
		"未確認エンチャントリスト（94）",
		"未確認エンチャントリスト（95）",
		"未確認エンチャントリスト（96）",
		"ニーズヘッグ＆ロキ帽（星天１２宮）",
		"大天使の翼（ファミ通の力）",
		"未確認エンチャントリスト（99）",
		"未確認エンチャントリスト（100）",
		"シャドウスタッフ　ヘルインフェルノ習得レベル",
		"アイオーンスタッフ　リリース習得レベル",
		"アイオーンスタッフ　魔法力増幅習得レベル",
		"ハイレベル",
		"エクセリオンスーツ",
		"エクセリオンウィング",
		"未確認エンチャントリスト（107）",
		"未確認エンチャントリスト（108）",
		"幻影の刻印",
		"ダミー（サファイアリスト用）",
		"執行者のマント　クロスインパクト習得レベル",
		"執行者のマント　グリムトゥース習得レベル",
		"執行者のマント　ソウルブレイカー習得レベル",
		"エクセリオンレッグ",
		"ポロロッカシューズ　ラクリマセット　ウォーターボール習得レベル",
		"ポロロッカシューズ　ラクリマセット　フロストノヴァ習得レベル",
		"RJCネックレス　２スロット目",
		"RJCネックレス　３スロット目",
		"RJCネックレス　４スロット目",
		"与一の肩掛け　エイムドボルト習得レベル",
		"与一の肩掛け　シャープシューティング習得レベル",
		"与一の肩掛け　ブリッツビート習得レベル",
		"古びたエンチャント",
		"ピアスエンチャント第一",
		"ピアスエンチャント第二",
		"ピアスエンチャント第三",
		"ピアスエンチャント第四",
		"パワードメイルエンチャント第一",
		"パワードメイルエンチャント第二",
		"パワードメイルエンチャント第三",
		"ガーディアンユニットエンチャント第一",
		"ガーディアンユニットエンチャント第二",
		"ガーディアンユニットエンチャント第三",
		"パワードガーディアン靴エンチャント第一",
		"パワードガーディアン靴エンチャント第二",
		"パワードガーディアン靴エンチャント第三",
		"パワードガーディアン肩エンチャント第一",
		"パワードガーディアン肩エンチャント第二",
		"パワードガーディアン肩エンチャント第三",
		"パワードガーディアンアクセエンチャント第一",
		"パワードガーディアンアクセエンチャント第二",
		"パワードガーディアンアクセエンチャント第三",
		"大型ＡＨ兜／大型マジェエンチャント第一",
		"大型ＡＨ兜／大型マジェエンチャント第二",
		"大型ＡＨ兜エンチャント第三",
		"大型マジェエンチャント第三",
		"エナジーエンチャント",
		"英雄エンチャント",
		"疾風迅雷エンチャント",
		"天地無双エンチャント",
		"マランエンチャント",
		"たれリベリオンエンチャント",
		"裁きの靴　ホーリーステッキセット　オラティオ習得レベル",
		"裁きの靴　ホーリーステッキセット　ラウダ等習得レベル",
		"超時空エンチャント",
		"プロンテラ軍エンチャント　第一第二",
		"プロンテラ軍エンチャント　第三",
		"マヌクエンチャント　第一",
		"マヌクエンチャント　第二",
		"マヌクエンチャント　第三",
		"水天一碧エンチャント",
		"ニーヴエンチャント（盾）",
		"ニーヴエンチャント（アクセ）",
		"熱狂信徒エンチャント（第一エンチャント）",
		"熱狂信徒エンチャント（第二エンチャント）",
		"熱狂信徒エンチャント（第三エンチャント）",
		"お座り教皇エンチャント",
		"勇者の靴エンチャント",
		"カーリッツバーグ騎士団の鎧エンチャント（第一、第二エンチャント）",
		"カーリッツバーグ騎士団の鎧エンチャント（第三エンチャント）",
		"小型偵察機エンチャント（第一、第二エンチャント）",
		"小型偵察機エンチャント（第三エンチャント）",
		"浮遊する氷エンチャント（第一エンチャント）",
		"浮遊する氷エンチャント（第二エンチャント）",
		"浮遊する氷エンチャント（第三エンチャント）",
		"エクスエンチャント（第一エンチャント）",
		"エクスエンチャント（第二エンチャント）",
		"エクスエンチャント（第三エンチャント）",
		"たれチュウニペンギン限界エンチャント（第一エンチャント）",
		"たれチュウニペンギン限界エンチャント（第二エンチャント）",
		"たれチュウニペンギン限界エンチャント（第三エンチャント）",
		"たれチュウニペンギン限界エンチャント（第四エンチャント）",
		"獄エンチャント",
		"百火猟乱エンチャント",
		"ガーデンオブエデンエンチャント（第一、第二エンチャント）",
		"ガーデンオブエデンエンチャント（第三エンチャント）",
		"ジェミニ-S58の目(赤)エンチャント（第一、第二エンチャント）",
		"ジェミニ-S58の目(赤)エンチャント（第三エンチャント）",
		"オープンエアヘッドフォンエンチャント（第一エンチャント）",
		"オープンエアヘッドフォンエンチャント（第二エンチャント）",
		"オープンエアヘッドフォンエンチャント（第三エンチャント）",
		"メディックケープエンチャント（第一、第二エンチャント）",
		"ドレイクコートエンチャント（第一、第二エンチャント）",
		"深淵の回廊エンチャント（武器）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段）（第三エンチャント）",
		"深淵の回廊エンチャント（兜中段）（第四エンチャント）",
		"深淵の回廊エンチャント（兜下段）（第四エンチャント）",
		"深淵の回廊エンチャント（盾）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧）（第三エンチャント）",
		"深淵の回廊エンチャント（肩）（第四エンチャント）",
		"深淵の回廊エンチャント（肩）（第三エンチャント）",
		"深淵の回廊エンチャント（靴）（第四エンチャント）",
		"深淵の回廊エンチャント（アクセ）（第四エンチャント）",
		"深淵の回廊エンチャント（武器上級）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段上級）（第四エンチャント）",
		"深淵の回廊エンチャント（肩上級）（第四エンチャント）",
		"ニーヴエンチャント（武器）",
		"ニーヴエンチャント（靴）",
		"騎士団エンチャント（武器）（第四エンチャント）",
		"騎士団エンチャント（兜）（第四エンチャント）",
		"騎士団エンチャント（鎧）（第四エンチャント）",
		"騎士団エンチャント（盾）（第四エンチャント）",
		"騎士団エンチャント（アクセ）（第四エンチャント）",
		"騎士団エンチャント（アクセ）（第三エンチャント）",
		"エクセリオンシールド",
		"深淵の回廊エンチャント（アクセ上級）（第四エンチャント）",
		"深淵の回廊エンチャント（アクセ上級）（第三エンチャント）",
		"深淵の回廊エンチャント（盾上級）（第四エンチャント）",
		"ロックリッジエンチャント（武器）（第四エンチャント）",
		"ロックリッジエンチャント（鎧）（第四エンチャント）",
		"ロックリッジエンチャント（鎧）（第三エンチャント）",
		"ロックリッジエンチャント（肩）（第四エンチャント）",
		"ロックリッジエンチャント（肩）（第三エンチャント）",
		"ロックリッジエンチャント（アクセ）（第四エンチャント）",
		"ロックリッジエンチャント（アクセ）（第三エンチャント）",
		"グレータードラクルホーンエンチャント（第三、第四エンチャント）",
		"グレータードラクルホーンエンチャント（第二エンチャント）",
		"ニーヴバレッタエンチャント（第四エンチャント）",
		"ニーヴバレッタエンチャント（第三エンチャント）",
		"ニーヴバレッタエンチャント（第二エンチャント）",
		"ロイヤルマントエンチャント（第四エンチャント）",
		"ロイヤルマントエンチャント（第三エンチャント）",
		"ロイヤルマントエンチャント（第二エンチャント）",
		"フェアリークロースエンチャント（第三、第四エンチャント）",
		"スカラバハイヒールエンチャント（第三、第四エンチャント）",
		"Y.S.F.0.1エンチャント（肩）（第四エンチャント）",
		"Y.S.F.0.1エンチャント（肩）（第三エンチャント）",
		"Y.S.F.0.1エンチャント（肩）（第二エンチャント）",
		"Y.S.F.0.1エンチャント（鎧）（第四エンチャント）",
		"Y.S.F.0.1エンチャント（鎧）（第二エンチャント）",
		"Y.S.F.0.1エンチャント（靴）（第三エンチャント）",
		"茨のヘアバンドエンチャント（第四エンチャント）",
		"茨のヘアバンドエンチャント（第三エンチャント）",
		"ヴァルキリーシールドエンチャント（第四エンチャント）",
		"ヴァルキリーシールドエンチャント（第三エンチャント）",
		"ダークハンドエンチャント（第四エンチャント）",
		"ダークハンドエンチャント（第三エンチャント）",
		"ライオットチップエンチャント（第四エンチャント）",
		"クイーン・アンズ・リベンジエンチャント（第四エンチャント）",
		"クイーン・アンズ・リベンジエンチャント（第三エンチャント）",
		"スキンオブシャドウエンチャント（第四エンチャント）",
		"スキンオブシャドウエンチャント（第三エンチャント）",
		"スナイピングスーツエンチャント（第四エンチャント）",
		"スナイピングスーツエンチャント（第三エンチャント）",
		"レッドベビードラゴンエンチャント（第四エンチャント）",
		"レッドベビードラゴンエンチャント（第三エンチャント）",
		"ブレイブエンチャント（鎧）（第四エンチャント）",
		"ブレイブエンチャント（鎧）（第三エンチャント）",
		"ブレイブエンチャント（鎧）（第二エンチャント）",
		"ブレイブエンチャント（肩）（第四エンチャント）",
		"ブレイブエンチャント（肩）（第三エンチャント）",
		"ブレイブエンチャント（肩）（第二エンチャント）",
		"ブレイブエンチャント（靴）（第三エンチャント）",
		"ブレイブエンチャント（靴）（第二エンチャント）",
		"古びたエンチャント（第二エンチャント）",
		"豪遊無双の紋帽子エンチャント（第三、第四エンチャント）",
		"豪遊無双の紋帽子エンチャント（第二エンチャント）",
		"ブースターシューズエンチャント（第三、第四エンチャント）",
		"浮遊する太極玉エンチャント（第三、第四エンチャント）",
		"浮遊する太極玉エンチャント（第二エンチャント）",
		"プロテクトクロースエンチャント（第四エンチャント）",
		"プロテクトクロースエンチャント（第三エンチャント）",
		"プロテクトクロースエンチャント（第二エンチャント）",
		"連合軍司令官のマントエンチャント（第四エンチャント）",
		"連合軍司令官のマントエンチャント（第三エンチャント）",
		"月食の装束エンチャント（第四エンチャント）",
		"月食の装束エンチャント（第三エンチャント）",
		"イリュージョンエンチャント（武器）（第四エンチャント）",
		"イリュージョンエンチャント（武器）（第三エンチャント）",
		"イリュージョンエンチャント（兜）（第四エンチャント）",
		"イリュージョンエンチャント（兜）（第三エンチャント）",
		"イリュージョンエンチャント（盾）（第四エンチャント）",
		"イリュージョンエンチャント（盾）（第三エンチャント）",
		"イリュージョンエンチャント（肩）（第四エンチャント）",
		"イリュージョンエンチャント（肩）（第三エンチャント）",
		"イリュージョンエンチャント（靴）（第三エンチャント）",
		"イリュージョンエンチャント（アクセ）（第四エンチャント）",
		"イリュージョンエンチャント（アクセ）（第三エンチャント）",
		"モーレツエンチャント（武器）（第四エンチャント）",
		"モーレツエンチャント（鎧）（第四エンチャント）",
		"モーレツエンチャント（靴）（第四エンチャント）",
		"ニーヴエンチャント（肩）",
		"ティアマトエンチャント（兜下段）（第四エンチャント）",
		"ティアマトエンチャント（兜下段）（第三エンチャント）",
		"ティアマトエンチャント（兜下段）（第二エンチャント）",
		"深淵の回廊エンチャント（鎧上級）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧上級）（第三エンチャント）",
		"深淵の回廊エンチャント（武器上級）（第三エンチャント）",
		"思念体エンチャント（指輪）（第四エンチャント）",
		"思念体エンチャント（指輪）（第三エンチャント）",
		"思念体エンチャント（指輪）（第二エンチャント）",
		"群星エンチャント（第四エンチャント）",
		"群星エンチャント（第三エンチャント）",
		"群星エンチャント（第二エンチャント）",
		"１６ｔｈアニバーサリーエンチャント（第四エンチャント）",
		"１６ｔｈアニバーサリーエンチャント（第三エンチャント）",
		"１６ｔｈアニバーサリーエンチャント（第二エンチャント）",
		"リペアメモリーエンチャント（第一エンチャント）",
		"リペアメモリーエンチャント（第二エンチャント）",
		"リペアメモリーエンチャント（第三エンチャント）",
		"白の騎士団の鎧エンチャント（第一、第二エンチャント）",
		"白の騎士団の鎧エンチャント（第三エンチャント）",
		"炎雷魔女の首飾りエンチャント（第一エンチャント）",
		"炎雷魔女の首飾りエンチャント（第二エンチャント）",
		"炎雷魔女の首飾りエンチャント（第三エンチャント）",
		"ヴェスパーヘッドギアエンチャント（第三、第四エンチャント）",
		"リトルガーデンエンチャント（第一、第二エンチャント）",
		"リトルガーデンエンチャント（第三エンチャント）",
		"武侠靴エンチャント（第三、第四エンチャント）",
		"ギガントブーツエンチャント（第四エンチャント）",
		"ギガントブーツエンチャント（第三エンチャント）",
		"負傷兵の包帯エンチャント（第四エンチャント）",
		"負傷兵の包帯エンチャント（第三エンチャント）",
		"プロテクトフェザーエンチャント（第一、第二エンチャント）",
		"プロテクトフェザーエンチャント（第三エンチャント）",
		"スナイピングベールエンチャント（第一エンチャント）",
		"スナイピングベールエンチャント（第二エンチャント）",
		"狐耳鈴リボンエンチャント（第一エンチャント）",
		"狐耳鈴リボンエンチャント（第二エンチャント）",
		"堕天司祭の闇光外套エンチャント（第一エンチャント）",
		"堕天司祭の闇光外套エンチャント（第二エンチャント）",
		"鴉天狗の面エンチャント（第三エンチャント）",
		"イリュージョンエンチャント（武器Ｖ２）（第三エンチャント）",
		"イリュージョンエンチャント（兜Ｖ２）（第三エンチャント）",
		"イリュージョンエンチャント（靴Ｖ２）（第三エンチャント）",
		"イリュージョンエンチャント（鎧）（第四エンチャント）",
		"イリュージョンエンチャント（鎧）（第三エンチャント）",
		"イリュージョンエンチャント（肩Ｖ２）（第四エンチャント）",
		"闇御津羽神靴エンチャント（第一エンチャント）",
		"闇御津羽神靴エンチャント（第二エンチャント）",
		"淤加美神の羽衣エンチャント（第一エンチャント）",
		"淤加美神の羽衣エンチャント（第二エンチャント）",
		"古びた履物エンチャント（第一エンチャント）",
		"降霊術士の手鏡エンチャント（第一エンチャント）",
		"降霊術士の手鏡エンチャント（第二エンチャント）",
		"思念体武器エンチャント（第三エンチャント）",
		"思念体武器エンチャント（第二エンチャント）",
		"ファントムオブマスカレードエンチャント（第一、第二エンチャント）",
		"ファントムオブマスカレードエンチャント（第三エンチャント）",
		"八卦の封呪（第一エンチャント）",
		"八卦の封呪（第二エンチャント）",
		"八卦の封呪（第三エンチャント）",
		"シトラスリボンエンチャント（第一、第二エンチャント）",
		"シトラスリボンエンチャント（第三エンチャント）",
		"スピリチュアルクロースエンチャント（第一、第二エンチャント）",
		"フロンティアブーツエンチャント（第一、第二エンチャント）",
		"世界樹エンチャント（アクセルウィング）（第一、第二エンチャント）",
		"世界樹エンチャント（水龍神の鱗）（第一エンチャント）",
		"世界樹エンチャント（水龍神の鱗）（第二エンチャント）",
		"断章エンチャント（武器）（第四エンチャント）",
		"騎士団エンチャント（アクセ）（第三エンチャント）",
		"ディアボロスブーツエンチャント（第一、第二エンチャント）",
		"ホロウシューズエンチャント（第一エンチャント）",
		"ホロウシューズエンチャント（第二エンチャント）",
		"轟鳴鼓エンチャント（第一、第二エンチャント）",
		"轟鳴鼓エンチャント（第三エンチャント）",
		"イルシオンエンチャント（鎧）",
		"イルシオンエンチャント（肩）",
		"イルシオンエンチャント（靴）",
		"イルシオンエンチャント（アクセ）",
		"イリュージョンエンチャント（兜Ｖ３）（第三エンチャント）",
		"イリュージョンエンチャント（肩）（第三エンチャント）",
		"イリュージョンエンチャント（アクセＶ２）（第四エンチャント）",
		"イリュージョンエンチャント（アクセＶ２）（第三エンチャント）",
		"ガーディアンオブソウルエンチャント（第四エンチャント）",
		"ガーディアンオブソウルエンチャント（第三エンチャント）",
		"フェザーシールドエンチャント（第四エンチャント）",
		"フェザーシールドエンチャント（第三エンチャント）",
		"ランナウェー・アクセラレータエンチャント（第三、第四エンチャント）",
		"ランナウェー・アクセラレータエンチャント（第二エンチャント）",
		"ソロモンのペンダントエンチャント（第四エンチャント）",
		"ソロモンのペンダントエンチャント（第三エンチャント）",
		"ソロモンのペンダントエンチャント（第二エンチャント）",
		"パナギアの贈り物エンチャント（第三、第四エンチャント）",
		"ファランクスエンチャント（第三、第四エンチャント）",
		"ファランクスエンチャント（第二エンチャント）",
		"スクロールストールエンチャント（第三、四エンチャント）",
		"ドレスエンチャント（第四エンチャント）",
		"ドレスエンチャント（第三エンチャント）",
		"ドレスエンチャント（第二エンチャント）",
		"楯無の鎧エンチャント（第四エンチャント）",
		"楯無の鎧エンチャント（第三エンチャント）",
		"ギャンブラーシールエンチャント（第二エンチャント）",
		"セブン-イレブンヘッドホンエンチャント（第三、四エンチャント）",
		"セブン-イレブンヘッドホンエンチャント（第二エンチャント）",
		"イルシオンエンチャント（盾）",
		"深淵の回廊エンチャント（武器　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（兜上段　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（鎧　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（肩　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（靴　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（アクセ　試練場）（第四エンチャント）",
		"オウルヴァイカウントのシルクハットエンチャント（第三、第四エンチャント）",
		"アンドフリームニルのマントエンチャント（第四エンチャント）",
		"アンドフリームニルのマントエンチャント（第三エンチャント）",
		"悪魔の手エンチャント（第三、第四エンチャント）",
		"悪魔の手エンチャント（第二エンチャント）",
		"ジェジェキャップエンチャント（第二エンチャント）",
		"ジャスパーサークレットエンチャント（第三、第四エンチャント）",
		"ジャスパーサークレットエンチャント（第二エンチャント）",
		"聖者の冠エンチャント（第三、第四エンチャント）",
		"聖者の冠エンチャント（第二エンチャント）",
		"精霊王の宝冠エンチャント（第三、第四エンチャント）",
		"精霊王の宝冠エンチャント（第二エンチャント）",
		"不死鳥の冠エンチャント（第三、第四エンチャント）",
		"不死鳥の冠エンチャント（第二エンチャント）",
		"ブラックフェザーエンチャント（第三、第四エンチャント）",
		"ブラックフェザーエンチャント（第二エンチャント）",
		"ワークキャップエンチャント（第二エンチャント）",
		"世界樹エンチャント（栄光の御旗(赤)）（第一、第二エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第一エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第二エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第三エンチャント）",
		"世界樹エンチャント（鷹の眼の首飾り）（第四エンチャント）",
		"白の騎士団エンチャント（第三エンチャント）",
		"白の騎士団エンチャント（第四エンチャント）",
		"シュミッツエンチャント（アクセ）（第四エンチャント）",
		"シュミッツエンチャント（アクセ）（第三エンチャント）",
		"シュミッツエンチャント（体）（第四エンチャント）",
		"シュミッツエンチャント（体）（第三エンチャント）",
		"シュミッツエンチャント（肩）（第四エンチャント）",
		"シュミッツエンチャント（肩）（第三エンチャント）",
		"覚醒淤加美神の羽衣エンチャント（第一エンチャント）",
		"覚醒淤加美神の羽衣エンチャント（第二エンチャント）",
		"覚醒淤加美神の羽衣エンチャント（第三エンチャント）",
		"深淵の回廊エンチャント（盾　試練場）（第四エンチャント）",
		"深淵の回廊エンチャント（盾　試練場）（第二エンチャント）",
	];

	var idx = 0;
	var idxData = 0;

	var enchListData = null;

	var reversedText = "";

	for (idx = 0; idx < n_EnchantList.length; idx++) {

		enchListData = n_EnchantList[idx];

		if (nameCommentArray[idx].length > 0) {
			reversedText += "// " + nameCommentArray[idx] + "\n";
		}
		else {
			reversedText += "// 未確認エンチャントリスト（" + idx + "）" + "\n";
		}

		reversedText += "CEnchListDataMaker.RegisterId(\"" + EnumEnchListId.GetDefinedName(idx) + "\", enchListId);" + "\n";

		reversedText += "enchListData = [" + "\n";

		for (idxData = 0; idxData < enchListData.length; idxData++) {
			reversedText += "\t" + EnumCardId.GetDefinedName(enchListData[idxData]) + "," + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "n_EnchantList[enchListId] = enchListData;" + "\n";
		reversedText += "enchListId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（アイテムセット用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeItemSet20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var setData = null;
	var memberId = 0;
	var dataId = 0;
	var dataIdFuncName = "";
	var dataIdName = "";

	var memberText = "";
	var reversedText = "";

	for (idx = 0; idx < w_SE.length; idx++) {

		setData = w_SE[idx];

		reversedText += "CItemSetDataMaker.RegisterId(\"ITEM_SET_ID_" + idx + "\", itemSetId);" + "\n";

		reversedText += "itemSetData = [";

		// メンバー定義文字列を生成する
		memberText = "";
		for (idxData = 0; idxData < setData.length; idxData++) {

			// NULL 記述は削除する
			if (setData[idxData] == "NULL") {
				continue;
			}

			memberId = setData[idxData];

			dataId = Math.abs(memberId);

			if (memberId > 0) {
				dataIdFuncName = "__ItemId";
				dataIdName = EnumItemId.GetDefinedName(dataId);
			}
			else {
				dataIdFuncName = "__CardId";
				dataIdName = EnumCardId.GetDefinedName(dataId);
			}

			if (memberText.length > 0) {
				memberText += ", ";
			}

			memberText += dataIdFuncName + "(" + dataIdName + ")";
		}

		reversedText += memberText;

		reversedText += "];" + "\n";

		reversedText += "w_SE[itemSetId] = itemSetData;" + "\n";
		reversedText += "itemSetId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（時限アイテム用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeTimeItem20200510 = function () {

	var defNameArray = [
		"TIME_ITEM_ID_NONE",
		"TIME_ITEM_ID_AICILA_CARD",
		"TIME_ITEM_ID_ICE_TITAN_CARD",
		"TIME_ITEM_ID_ATOLOS_CARD",
		"TIME_ITEM_ID_ANNOLIAN_CARD",
		"TIME_ITEM_ID_ALCHEMIST_CARD_SET",
		"TIME_ITEM_ID_ANSATSUSHANO_DUMASCUS_TOKKO",
		"TIME_ITEM_ID_IXIONNO_HANE",
		"TIME_ITEM_ID_VAMBERK_CARD",
		"TIME_ITEM_ID_WOLF_HEZIN",
		"TIME_ITEM_ID_ANGELIC_RING",
		"TIME_ITEM_ID_GLORIOUS_GRENADEGUN",
		"TIME_ITEM_ID_GLORIOUS_JAMADAHAR",
		"TIME_ITEM_ID_GLORIOUS_TABLET",
		"TIME_ITEM_ID_GLORIOUS_FUMASHURIKEN",
		"TIME_ITEM_ID_GLORIOUS_BLOODY_ROAR",
		"TIME_ITEM_ID_KOENNO_TWINEDGE",
		"TIME_ITEM_ID_KOKKOCHAN",
		"TIME_ITEM_ID_SABAKUNO_YUGURE_KAZE_SET",
		"TIME_ITEM_ID_SHADOW_GUARD_WALKER_SET",
		"TIME_ITEM_ID_SENTO_FUMASHURIKEN_TOKKO",
		"TIME_ITEM_ID_SOENNO_TWINEDGE",
		"TIME_ITEM_ID_SOLDIER_GATLINGGUN",
		"TIME_ITEM_ID_SOLDIER_GRENADEGUN",
		"TIME_ITEM_ID_SOLDIER_HANDGUN",
		"TIME_ITEM_ID_TEGRYON",
		"TIME_ITEM_ID_TOSHINO_BATTLE_FIST_YUMO",
		"TIME_ITEM_ID_NAGANO_UROKO_YOROI",
		"TIME_ITEM_ID_NOBLE_HAT",
		"TIME_ITEM_ID_VIOLET_FEAR",
		"TIME_ITEM_ID_BLOODY_EAT",
		"TIME_ITEM_ID_BLUE_RIBBON",
		"TIME_ITEM_ID_HODREMRIN_CARD",
		"TIME_ITEM_ID_MISRIL_MAGIC_MANT",
		"TIME_ITEM_ID_RING_OF_FLAME_LORD",
		"TIME_ITEM_ID_SEIREN_VENSER_MVP_CARD",
		"TIME_ITEM_ID_SOLDIER_SHOTGUN",
		"TIME_ITEM_ID_VAINA",
		"TIME_ITEM_ID_RUBEL",
		"TIME_ITEM_ID_CHRONOS",
		"TIME_ITEM_ID_NEMESIS",
		"TIME_ITEM_ID_DUNAIL_CARD",
		"TIME_ITEM_ID_RATATOSK_CAD",
		"TIME_ITEM_ID_FIRA_CARD",
		"TIME_ITEM_ID_IGNIS_CAP",
		"TIME_ITEM_ID_RUDO_MASK",
		"TIME_ITEM_ID_SHINPANNO_MACE_PHYSICAL",
		"TIME_ITEM_ID_SHINPANNO_MACE_MAGICAL",
		"TIME_ITEM_ID_SHINPANNO_MACE_2_PHYSICAL",
		"TIME_ITEM_ID_SHINPANNO_MACE_2_MAGICAL",
		"TIME_ITEM_ID_PEOTH_SET",
		"TIME_ITEM_ID_SHIRAHANO_MANT",
		"TIME_ITEM_ID_NAGANO_UROKOTATE",
		"TIME_ITEM_ID_SHIBAINUBO_SET",
		"TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO",
		"TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO",
		"TIME_ITEM_ID_RALF_FONG_TWIEGE_666",
		"TIME_ITEM_ID_VALKYRIE_CIRCLET_SET",
		"TIME_ITEM_ID_SHISHIONO_KABUTO",
		"TIME_ITEM_ID_PIAMET_CHANGE",
		"TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV2",
		"TIME_ITEM_ID_OKAMIMOYONO_TEKKO",
		"TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV4",
		"TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV6",
		"TIME_ITEM_ID_KITSUNE_SUZU_RIBBON",
		"TIME_ITEM_ID_NEKOMIMI_BERET_SET",
		"TIME_ITEM_ID_DATENSHINO_TATE",
		"TIME_ITEM_ID_BERET_BOSS_BOSHI",
		"TIME_ITEM_ID_DULGER_HYUKKENOFUKU",
		"TIME_ITEM_ID_AKUMA_BARAINO_SHO",
		"TIME_ITEM_ID_RANDEL_ROLENCE_CARD",
		"TIME_ITEM_ID_ATAMANORI_FEERIL_FUYUSURU_KENZYANO_ISHI_SET",
		"TIME_ITEM_ID_EIYUNO_KONSEKI_SUPPORT",
		"TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_ATK",
		"TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_MATK",
		"TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_RESIST",
		"TIME_ITEM_ID_BANIRMIRTBO_FUYUSURU_KENZYANO_ISHI",
		"TIME_ITEM_ID_SURVIVAL_CIRCLET_SET",
		"TIME_ITEM_ID_YUSHANO_HIDDEN_CLOTH",
		"TIME_ITEM_ID_ECLAGE_ORBE",
		"TIME_ITEM_ID_12TH_ANIVERSERY_SUPPORT",
		"TIME_ITEM_ID_RUEEZENO_AKAIKUTSU_PERMET_TURTLE_CARD",
		"TIME_ITEM_ID_AWL_VAICAUNTNO_SILKHAT",
		"TIME_ITEM_ID_SHADOW_STUFF",
		"TIME_ITEM_ID_IORNE_STUFF",
		"TIME_ITEM_ID_SARANO_ROBE",
		"TIME_ITEM_ID_FURUBITA_BALLERINANO_KAMIKAZARI",
		"TIME_ITEM_ID_FURUBITA_BLAZING_SOUL",
		"TIME_ITEM_ID_FURUBITA_MINSTRELSONGNO_BOSHI",
		"TIME_ITEM_ID_FURUBITA_SHADOW_CROWN",
		"TIME_ITEM_ID_LEASER_OF_EAGLE_DELAY_CUT",
		"TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT",
		"TIME_ITEM_ID_S_ATK",
		"TIME_ITEM_ID_S_MATK",
		"TIME_ITEM_ID_S_AVOID",
		"TIME_ITEM_ID_S_MAXHP",
		"TIME_ITEM_ID_S_QUICK",
		"TIME_ITEM_ID_S_CRI",
		"TIME_ITEM_ID_SHADOW_RING",
		"TIME_ITEM_ID_POWERED_SET",
		"TIME_ITEM_ID_SHIPPU",
		"TIME_ITEM_ID_TENCHI",
		"TIME_ITEM_ID_LOLANO_TEKKYU_SET",
		"TIME_ITEM_ID_RUDONO_ROLLPAPER",
		"TIME_ITEM_ID_RUDO_CARD",
		"TIME_ITEM_ID_AVENGER_CLAYMORE",
		"TIME_ITEM_ID_AVENGER_BLOODYROAR",
		"TIME_ITEM_ID_AVENGER_GRENADEGUN",
		"TIME_ITEM_ID_RISUMIMI_HOODBO",
		"TIME_ITEM_ID_SUITEN",
		"TIME_ITEM_ID_ROKINO_ASSASIN_MASK",
		"TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_BERSERK",
		"TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_OVER_TRUST_MAX",
		"TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_MAHORYOKU_ZOFUKU",
		"TIME_ITEM_ID_TOKIMAZYUTSUSHINO_ROBE",
		"TIME_ITEM_ID_HIMAWARI_SHONEN",
		"TIME_ITEM_ID_JULIET_DE_RACHEL",
		"TIME_ITEM_ID_GOFUSEKI_PEORTH_SET",
		"TIME_ITEM_ID_RUNE_KNIGHT_SEIREN_CARD_RUNE_KNIGHT_SEIREN_MVP_CARD",
		"TIME_ITEM_ID_WARLOCK_CATHERINE_CARD_WARLOCK_CATHERINE_MVP_CARD",
		"TIME_ITEM_ID_RANGER_CECIL_CARD_RANGER_CECIL_MVP_CARD",
		"TIME_ITEM_ID_ARCH_BISHOP_MARGARETTE_CARD_ARCH_BISHOP_MARGARETTE_MVP_CARD",
		"TIME_ITEM_ID_GUILLOTINE_CROSS_ELEMES_CARD_GUILLOTINE_CROSS_ELEMES_MVP_CARD",
		"TIME_ITEM_ID_MECHANIC_HAWARD_CARD_MECHANIC_HAWARD_MVP_CARD",
		"TIME_ITEM_ID_ROYAL_GUARD_RANDEL_CARD_ROYAL_GUARD_RANDEL_MVP_CARD",
		"TIME_ITEM_ID_SORCERER_CERIA_CARD_SORCERER_CERIA_MVP_CARD",
		"TIME_ITEM_ID_MINSTREL_ARFOSIO_CARD_MINSTREL_ARFOSIO_MVP_CARD",
		"TIME_ITEM_ID_WANDERER_TRENTINI_CARD_WANDERER_TRENTINI_MVP_CARD",
		"TIME_ITEM_ID_SHURA_CHENG_CARD_SHURA_CHENG_MVP_CARD",
		"TIME_ITEM_ID_SHADOW_CHASER_GARTY_CARD_SHADOW_CHASER_GARTY_MVP_CARD",
		"TIME_ITEM_ID_GENETIC_EMUR_CARD_GENETIC_EMUR_MVP_CARD",
		"TIME_ITEM_ID_AVENGER_JAMADAHAR",
		"TIME_ITEM_ID_HYAKKA",
		"TIME_ITEM_ID_SHINRINO_KAIHO",
		"TIME_ITEM_ID_SHAKUNETSUNO_KEN",
		"TIME_ITEM_ID_NARAKUNO_KEN",
		"TIME_ITEM_ID_ZYOKANO_KEN",
		"TIME_ITEM_ID_SHUGEKISHANO_ROBE",
		"TIME_ITEM_ID_CUTIE_CARD",
		"TIME_ITEM_ID_GODS_SWORD_ONRYOBUSHI_CARD",
		"TIME_ITEM_ID_CANCER",
		"TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1",
		"TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1",
		"TIME_ITEM_ID_HAO",
		"TIME_ITEM_ID_ZYOO_FACEWORM",
		"TIME_ITEM_ID_JITTER_BUG",
		"TIME_ITEM_ID_GOWAN",
		"TIME_ITEM_ID_DAKITSUKI_SYAMUNEKO",
		"TIME_ITEM_ID_FURUBITA_SHUGONOKANMURI",
		"TIME_ITEM_ID_ULTIMATE_MODE_CHANGER_PEORTH_ARTIFACT",
		"TIME_ITEM_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO",
		"TIME_ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN",
		"TIME_ITEM_ID_GOKETSU",
		"TIME_ITEM_ID_ILLUSION_RENGEKINO_TSUME",
		"TIME_ITEM_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS_DARKLORD_CARD",
		"TIME_ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BONECIRCRET",
		"TIME_ITEM_ID_FUSHOHENO_GANTAI_SEIREN_VIENSER_MVP_CARD",
		"TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD",
		"TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_AR",
		"TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_DEX100",
		"TIME_ITEM_ID_GREATER_DRACLE_HORN",
		"TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO",
		"TIME_ITEM_ID_SHINO_YOKUDO",
		"TIME_ITEM_ID_DEMONISH_SWORD_ONRYOBUSHI_CARD",
		"TIME_ITEM_ID_BOOSTER_LANCE_OS",
		"TIME_ITEM_ID_X_FATAL_FLASH",
		"TIME_ITEM_ID_X_FIRING_SHOT",
		"TIME_ITEM_ID_X_LUCKY_STRIKE",
		"TIME_ITEM_ID_X_OVER_POWER",
		"TIME_ITEM_ID_X_SPELL_BUSTER",
		"TIME_ITEM_ID_X_UNLIMIT_VITAL",
		"TIME_ITEM_ID_AWL_BARRONNO_MANT",
		"TIME_ITEM_ID_MAGICAL_CLOTH",
		"TIME_ITEM_ID_EXTREME",
		"TIME_ITEM_ID_SOLOMONNO_PENDANT",
		"TIME_ITEM_ID_T_POWER_BOOST",
		"TIME_ITEM_ID_T_MAGIC_BOOST",
		"TIME_ITEM_ID_T_ASSAULT",
		"TIME_ITEM_ID_PIKAPIKA_NYANNYAN_CROWN",
	];

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";



	alert("古い関数 CReverseCoder.GetReverseCodeTimeItem20200510() が呼び出されました");
	return "";



	definerArray = CReverseCoder.GetReverseCodeTimeItemSub20200510();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CTimeItemDataMaker.RegisterId(\"" + defNameArray[idx] + "\", timeItemId);" + "\n";

		reversedText += "timeItemData = [" + "\n";

		reversedText += "\t" + "timeItemId," + "\n";
		reversedText += "\t" + "CTimeItemDataMaker.TimeItemName(\"" + defData[TIME_ITEM_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "CTimeItemDataMaker.TimeItemExplain(\"" + defData[TIME_ITEM_DATA_INDEX_EXPLAIN] + "\")," + "\n";
		reversedText += "\t" + "CTimeItemDataMaker.TimeItemDataKind(" + defData[TIME_ITEM_DATA_INDEX_SRC_KIND] + ")," + "\n";
		reversedText += "\t" + "CTimeItemDataMaker.TimeItemDataId(" + defData[TIME_ITEM_DATA_INDEX_SRC_ID] + ")," + "\n";

		for (idxSP = TIME_ITEM_DATA_INDEX_SPBEGIN; (idxSP + 2) < defData.length; idxSP += 2) {
			reversedText += "\t" + defData[idxSP] + ", " + defData[idxSP + 1] + "," + "\n";
		}

		reversedText += "\t" + "ITEM_SP_END" + "\n";

		reversedText += "];" + "\n";

		reversedText += "ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;" + "\n";
		reversedText += "timeItemId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（時限アイテム用 2020/05/10 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeTimeItemSub20200510 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var timeItemData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bSkillId = false;

	var definerArray = null;

	definerArray = new Array();

	// 時限アイテムデータを全走査して、定義用データに変換
	for (idx = 0; idx < ITEM_SP_TIME_OBJ.length; idx++) {

		timeItemData = ITEM_SP_TIME_OBJ[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < timeItemData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case TIME_ITEM_DATA_INDEX_ID:
			case TIME_ITEM_DATA_INDEX_NAME:
			case TIME_ITEM_DATA_INDEX_EXPLAIN:
				defData[idxData] = timeItemData[idxData];
				break;

			// 元データ種別
			case TIME_ITEM_DATA_INDEX_SRC_KIND:
				defData[idxData] = EnumConstDataKind.GetDefinedName(timeItemData[idxData]);
				break;

			// 元データID
			case TIME_ITEM_DATA_INDEX_SRC_ID:
				if (defData[TIME_ITEM_DATA_INDEX_SRC_KIND] == EnumConstDataKind.GetDefinedName(CONST_DATA_KIND_ITEM)) {
					defData[idxData] = EnumItemId.GetDefinedName(timeItemData[idxData]);
				}
				else if (defData[TIME_ITEM_DATA_INDEX_SRC_KIND] == EnumConstDataKind.GetDefinedName(CONST_DATA_KIND_CARD)) {
					defData[idxData] = EnumCardId.GetDefinedName(timeItemData[idxData]);
				}
				else {
					defData[idxData] = timeItemData[idxData];
				}
				break;

			// SP 定義領域
			default:

				// SPID は変換する
				if (((idxData - TIME_ITEM_DATA_INDEX_SPBEGIN) % 2) == 0) {
					defData[idxData] = CReverseCoder.GetReverseCodeSpId20200509(timeItemData[idxData]);
				}

				// SPID 以外は変換しない
				else {
					defData[idxData] = timeItemData[idxData];
				}

				break;
			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（アイテムパック用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeItemPack20200510 = function () {

	var defNameArray = [
		"ITEM_PACK_ID_NONE",
		"ITEM_PACK_ID_JOB_PACKAGE_TENBINKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_TENKATSUKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_SHOZYOKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_ZINBAKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_HOBINKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_KYOKAIKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_HAKUYOKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_MAKATSUKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_SHISHIKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_MINSTREL",
		"ITEM_PACK_ID_JOB_PACKAGE_SOZIKYU_WANDERER",
		"ITEM_PACK_ID_JOB_PACKAGE_SOGYOKYU",
		"ITEM_PACK_ID_JOB_PACKAGE_KINGYUKYU",
		"ITEM_PACK_ID_CLEAR_EQUIP_ALL",
		"ITEM_PACK_ID_CLEAR_REFINE_ALL",
		"ITEM_PACK_ID_CLEAR_CARD_ALL",
	];

	var idx = 0;
	var idxData = 0;

	var packData = null;
	var memberId = 0;
	var dataId = 0;
	var dataIdFuncName = "";
	var dataIdName = "";

	var memberText = "";
	var reversedText = "";

	for (idx = 0; idx < ItemPackOBJ.length; idx++) {

		packData = ItemPackOBJ[idx];

		reversedText += "CItemPackDataMaker.RegisterId(\"" + defNameArray[idx] + "\", itemPackId);" + "\n";

		reversedText += "itemPackData = [" + "\n";

		reversedText += "\t" + "itemPackId," + "\n";
		reversedText += "\t" + "CItemPackDataMaker.ItemPackName(\"" + packData[ITEM_PACK_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "CItemPackDataMaker.ItemPackKana(\"" + packData[ITEM_PACK_DATA_INDEX_KANA] + "\")," + "\n";
		reversedText += "\t" + "CItemPackDataMaker.ItemPackDetailText(\"" + packData[ITEM_PACK_DATA_INDEX_DETAIL] + "\")," + "\n";

		reversedText += "\t" + "[" + "\n";

		for (idxData = 0; (idxData + 2) < packData[ITEM_PACK_DATA_INDEX_ITEMS].length; idxData += 3) {

			reversedText += "\t\t";

			reversedText += EnumItemPackItemsKind.GetDefinedName(packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData]) + ", ";

			if (packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData] == ITEM_PACK_ITEMS_KIND_ITEM) {
				reversedText += EnumItemId.GetDefinedName(packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData + 1]) + ", ";
			}
			else if (packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData] == ITEM_PACK_ITEMS_KIND_CARD) {
				reversedText += EnumCardId.GetDefinedName(packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData + 1]) + ", ";
			}
			else {
				reversedText += packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData + 1] + ", ";
			}

			reversedText += packData[ITEM_PACK_DATA_INDEX_ITEMS][idxData + 2] + ", ";

			reversedText += "\n";
		}

		reversedText += "\t" + "]" + "\n";

		reversedText += "];" + "\n";

		reversedText += "ItemPackOBJ[itemPackId] = itemPackData;" + "\n";
		reversedText += "itemPackId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（モンスター用 2020/05/25 版）.
 */
CReverseCoder.GetReverseCodeMonster20200525 = function () {

	var defNameArray = [
		"MONSTER_ID_ARCANGELING",
		"MONSTER_ID_ARCHER_SKELETON",
		"MONSTER_ID_AOIKUSA",
		"MONSTER_ID_AKAIKINOKO",
		"MONSTER_ID_AKAIKUSA",
		"MONSTER_ID_ACRAUS",
		"MONSTER_ID_ASSAULT_TURTLE",
		"MONSTER_ID_ANAKONDAK",
		"MONSTER_ID_ANNOLIAN",
		"MONSTER_ID_APOCALYPSE",
		"MONSTER_ID_AMMUT",
		"MONSTER_ID_ALARM",
		"MONSTER_ID_ALLIGATOR",
		"MONSTER_ID_ALICE",
		"MONSTER_ID_ARINO_TAMAGO",
		"MONSTER_ID_ARGIOPE",
		"MONSTER_ID_ARGOS",
		"MONSTER_ID_ANSONI",
		"MONSTER_ID_ANDRE",
		"MONSTER_ID_UMBERKNIGHT",
		"MONSTER_ID_ISIS",
		"MONSTER_ID_ITTANMOMEN",
		"MONSTER_ID_EVIL_DRUID",
		"MONSTER_ID_INCUBUS",
		"MONSTER_ID_INJUSTICE",
		"MONSTER_ID_VIOLY",
		"MONSTER_ID_WHISPER",
		"MONSTER_ID_WHIROW",
		"MONSTER_ID_WIND_GHOST",
		"MONSTER_ID_OOTANG_SHOOTER",
		"MONSTER_ID_OOTANG_FIGHTER",
		"MONSTER_ID_WARYAPHA",
		"MONSTER_ID_WOODN_GOLEM",
		"MONSTER_ID_WOLF",
		"MONSTER_ID_EGIRA",
		"MONSTER_ID_EXCUTIONER",
		"MONSTER_ID_EXPLOSION",
		"MONSTER_ID_ECLIPSE",
		"MONSTER_ID_EDOGA",
		"MONSTER_ID_ELDER",
		"MONSTER_ID_ELDER_WHIROW",
		"MONSTER_ID_ENGELING",
		"MONSTER_ID_ANCIENT_MUMMY",
		"MONSTER_ID_ANCIENT_WARM",
		"MONSTER_ID_EMPERIUM",
		"MONSTER_ID_OGONCHU",
		"MONSTER_ID_OWL_DUKE",
		"MONSTER_ID_OWL_BARON",
		"MONSTER_ID_ORGATOOTH",
		"MONSTER_ID_ORCARCHER",
		"MONSTER_ID_ORCWARRIOR",
		"MONSTER_ID_ORCSKELTON",
		"MONSTER_ID_ORCZOMBIE",
		"MONSTER_ID_OGUCHI_KAERU",
		"MONSTER_ID_ORCHERO",
		"MONSTER_ID_ORCLADY",
		"MONSTER_ID_ORCLORD",
		"MONSTER_ID_OSIRIS",
		"MONSTER_ID_OTTO",
		"MONSTER_ID_OBAKEGAI",
		"MONSTER_ID_OBEAUNE",
		"MONSTER_ID_ONRYOBUSHI",
		"MONSTER_ID_GARGOYLE",
		"MONSTER_ID_KNIGHT_GUARDIAN",
		"MONSTER_ID_SOLDIER_GUARDIAN",
		"MONSTER_ID_ARCHER_GUARDIAN",
		"MONSTER_ID_KAHRITZBARG",
		"MONSTER_ID_GAIAS",
		"MONSTER_ID_KAGAYAKUKUSA",
		"MONSTER_ID_GAJOMART",
		"MONSTER_ID_KAPPA",
		"MONSTER_ID_CORNUTUS",
		"MONSTER_ID_KANI",
		"MONSTER_ID_KABUKININJA",
		"MONSTER_ID_KARAKASA",
		"MONSTER_ID_GALAPAGO",
		"MONSTER_ID_OSHOKUSO",
		"MONSTER_ID_GIG",
		"MONSTER_ID_KINOKO_THIEF",
		"MONSTER_ID_CHMERA",
		"MONSTER_ID_CATAPIRER",
		"MONSTER_ID_CAT_NINETAIL",
		"MONSTER_ID_CARAMEL",
		"MONSTER_ID_KYODAI_WHISPER",
		"MONSTER_ID_KILLER_MANTICE",
		"MONSTER_ID_GHOUL",
		"MONSTER_ID_KUKRE",
		"MONSTER_ID_CHIRSTMASS_COOKIE",
		"MONSTER_ID_COOKIE",
		"MONSTER_ID_KUMIHO",
		"MONSTER_ID_CLAMP",
		"MONSTER_ID_GRANDPEKO",
		"MONSTER_ID_CREAMY",
		"MONSTER_ID_CREAMY_FEAR",
		"MONSTER_ID_CHIRISTMAS_GOBLIN",
		"MONSTER_ID_GRIZZLY",
		"MONSTER_ID_GRYPHON",
		"MONSTER_ID_GRINBULLSTY",
		"MONSTER_ID_CRUZER",
		"MONSTER_ID_KUROIKINOKO",
		"MONSTER_ID_CLOCK",
		"MONSTER_ID_KOKUDAO",
		"MONSTER_ID_KOE",
		"MONSTER_ID_KOKO",
		"MONSTER_ID_GHOSTRING",
		"MONSTER_ID_GOAT",
		"MONSTER_ID_GOLEM",
		"MONSTER_ID_GOTTSUI_MINOTAUR",
		"MONSTER_ID_GOBLIN_SANNAN",
		"MONSTER_ID_GOBLIN_ZINAN",
		"MONSTER_ID_GOBLIN_CHONAN",
		"MONSTER_ID_GOBLIN_YONNAN",
		"MONSTER_ID_GOBLIN_GONAN",
		"MONSTER_ID_GOBLIN_ARCHER",
		"MONSTER_ID_GOBLIN_RIDER",
		"MONSTER_ID_GOBLIN_LEADER",
		"MONSTER_ID_AXE_KOBOLD",
		"MONSTER_ID_HUMMER_KOBOLD",
		"MONSTER_ID_MACE_KOBOLD",
		"MONSTER_ID_KOBOLD_ARCHER",
		"MONSTER_ID_KOBOLD_LEADER",
		"MONSTER_ID_CONDOR",
		"MONSTER_ID_SIDEWINDER",
		"MONSTER_ID_SUCUBUS",
		"MONSTER_ID_SAKATENGU",
		"MONSTER_ID_SUSCUCCHI",
		"MONSTER_ID_SASURAI_OKAMI",
		"MONSTER_ID_SAVAGE",
		"MONSTER_ID_SAVAGE_BEBE",
		"MONSTER_ID_SAMAYOUMONO",
		"MONSTER_ID_SANTA_PORING",
		"MONSTER_ID_SANDMAN",
		"MONSTER_ID_SANYOCHU",
		"MONSTER_ID_SEA_OTTO",
		"MONSTER_ID_JESTER",
		"MONSTER_ID_GENERAL_SKELTON",
		"MONSTER_ID_GEOGRAPHER",
		"MONSTER_ID_GIANT_SPIDER",
		"MONSTER_ID_GIANT_HONET",
		"MONSTER_ID_JACK",
		"MONSTER_ID_ZYUKIHEI",
		"MONSTER_ID_JORKER",
		"MONSTER_ID_JIRTUS",
		"MONSTER_ID_SHIROIKUSA",
		"MONSTER_ID_SHINENNO_KISHI",
		"MONSTER_ID_ZINMENTOZYU",
		"MONSTER_ID_SKELTON",
		"MONSTER_ID_SKEL_PRISONER",
		"MONSTER_ID_SKEL_WORKER",
		"MONSTER_ID_SUGOI_PIKKI",
		"MONSTER_ID_SCORPION",
		"MONSTER_ID_STAINER",
		"MONSTER_ID_STRUCTITE_GOLEM",
		"MONSTER_ID_STEAL_CHONGCHONG",
		"MONSTER_ID_STING",
		"MONSTER_ID_STEMWORM",
		"MONSTER_ID_STORM_KNIGHT",
		"MONSTER_ID_STROUF",
		"MONSTER_ID_SNAKE",
		"MONSTER_ID_SPRING_RABIT",
		"MONSTER_ID_SPORE",
		"MONSTER_ID_SMOKY",
		"MONSTER_ID_SLEEPER",
		"MONSTER_ID_SAGEWORM",
		"MONSTER_ID_ZENOKE",
		"MONSTER_ID_ZEROM",
		"MONSTER_ID_SWORDFISH",
		"MONSTER_ID_SOPHIE",
		"MONSTER_ID_SOLID_TURTLE",
		"MONSTER_ID_SOLDIER_SKELTON",
		"MONSTER_ID_ZOMBIE",
		"MONSTER_ID_ZOMBIE_PRISONER",
		"MONSTER_ID_ZOMBIE_MASTER",
		"MONSTER_ID_DARK_ILLUSION",
		"MONSTER_ID_DARK_FRAME",
		"MONSTER_ID_DARK_LORD",
		"MONSTER_ID_TURTLE_GENERAL",
		"MONSTER_ID_DUSTINESS",
		"MONSTER_ID_TARAFROG",
		"MONSTER_ID_TARO",
		"MONSTER_ID_DANGO_WARAZI",
		"MONSTER_ID_CHEPET",
		"MONSTER_ID_CHAKKEY",
		"MONSTER_ID_CHOCO",
		"MONSTER_ID_CHONGCHONG",
		"MONSTER_ID_CHINPIRA",
		"MONSTER_ID_DIAVOILIC",
		"MONSTER_ID_DEMON_PANK",
		"MONSTER_ID_DESSERT_WOLF",
		"MONSTER_ID_KO_DESSERT_WOLF",
		"MONSTER_ID_DEADLY_WRAITH",
		"MONSTER_ID_DENIRO",
		"MONSTER_ID_DEVIACE",
		"MONSTER_ID_DEVILCH",
		"MONSTER_ID_SKY_DELETER",
		"MONSTER_ID_GROUND_DELETER",
		"MONSTER_ID_TENKA_TAISHOGUN",
		"MONSTER_ID_TENZYA_SENNIN",
		"MONSTER_ID_TENSEN_NYANGNYANG",
		"MONSTER_ID_TOCHU",
		"MONSTER_ID_TOCHU_OSU",
		"MONSTER_ID_TOCHU_MESU",
		"MONSTER_ID_TOCHUNO_TAMAGO",
		"MONSTER_ID_TODO",
		"MONSTER_ID_TOKEITO_KANRISHA",
		"MONSTER_ID_DOKEBI",
		"MONSTER_ID_DOPPELGENGER",
		"MONSTER_ID_DRAQRA",
		"MONSTER_ID_DRAGONTAIL",
		"MONSTER_ID_DRAGONFLY",
		"MONSTER_ID_DRIAD",
		"MONSTER_ID_DRILLER",
		"MONSTER_ID_DRAKE",
		"MONSTER_ID_DRAINRIER",
		"MONSTER_ID_DROPPS",
		"MONSTER_ID_NIGHTMARE",
		"MONSTER_ID_NIGHTMARE_TERROR",
		"MONSTER_ID_NEREID",
		"MONSTER_ID_BARSURRY",
		"MONSTER_ID_HARPUIR",
		"MONSTER_ID_PERMET_TURTLE",
		"MONSTER_ID_HIORC",
		"MONSTER_ID_PIRATES_SKEL",
		"MONSTER_ID_BYAKURENDAMA",
		"MONSTER_ID_PASANA",
		"MONSTER_ID_HATIE",
		"MONSTER_ID_VADON",
		"MONSTER_ID_PAPIYON",
		"MONSTER_ID_BAPHOMET",
		"MONSTER_ID_BAPHOMET_JR",
		"MONSTER_ID_HANGYOZIN",
		"MONSTER_ID_PANK",
		"MONSTER_ID_HUNTERFLY",
		"MONSTER_ID_PANTSER_GOBLIN",
		"MONSTER_ID_HEAT_TURTLE",
		"MONSTER_ID_BEATLE",
		"MONSTER_ID_PIERE",
		"MONSTER_ID_BITATA",
		"MONSTER_ID_PIKKI",
		"MONSTER_ID_BIGFOOT",
		"MONSTER_ID_HITODE",
		"MONSTER_ID_HYDRA",
		"MONSTER_ID_FABLE",
		"MONSTER_ID_FABLE_TENSHOKUZYO",
		"MONSTER_ID_FAMILIER",
		"MONSTER_ID_PHARAO",
		"MONSTER_ID_FAIRLEAF",
		"MONSTER_ID_FAKE_ANGEL",
		"MONSTER_ID_PHEN",
		"MONSTER_ID_FENDARK",
		"MONSTER_ID_SKY_PETIT",
		"MONSTER_ID_GROUND_PETIT",
		"MONSTER_ID_PUPA",
		"MONSTER_ID_BLOODY_KNIGHT",
		"MONSTER_ID_PLANKTON",
		"MONSTER_ID_FREEZE_TURTLE",
		"MONSTER_ID_FURIONI",
		"MONSTER_ID_BULLILIGHT",
		"MONSTER_ID_FRILLDRA",
		"MONSTER_ID_BLAZER",
		"MONSTER_ID_FLAME_SHOOTER",
		"MONSTER_ID_FLORA",
		"MONSTER_ID_PEKOPEKO",
		"MONSTER_ID_PEKOPEKONO_TAMAGO",
		"MONSTER_ID_PEST",
		"MONSTER_ID_PENOMENA",
		"MONSTER_ID_BERIT",
		"MONSTER_ID_POISON_SPORE",
		"MONSTER_ID_VOCAL",
		"MONSTER_ID_HODO",
		"MONSTER_ID_HONET",
		"MONSTER_ID_POPORING",
		"MONSTER_ID_PORING",
		"MONSTER_ID_HORN",
		"MONSTER_ID_HORON",
		"MONSTER_ID_BONGGONG",
		"MONSTER_ID_MARTER",
		"MONSTER_ID_MARTING",
		"MONSTER_ID_MARING",
		"MONSTER_ID_MASTERING",
		"MONSTER_ID_MUMMY",
		"MONSTER_ID_MAYA",
		"MONSTER_ID_MAYA_PURPLE",
		"MONSTER_ID_MARIONET",
		"MONSTER_ID_MARINA",
		"MONSTER_ID_MARIN_SPHERE",
		"MONSTER_ID_MARC",
		"MONSTER_ID_MARSE",
		"MONSTER_ID_MARUDUKE",
		"MONSTER_ID_MANTICE",
		"MONSTER_ID_MANDRAGORA",
		"MONSTER_ID_MISTELTAIN",
		"MONSTER_ID_MIST",
		"MONSTER_ID_MISTCASE",
		"MONSTER_ID_MISTRESS",
		"MONSTER_ID_RYOKUSHOKUSO",
		"MONSTER_ID_MINIDEMO",
		"MONSTER_ID_MINOTAUR",
		"MONSTER_ID_MIMIC",
		"MONSTER_ID_MIYABI_NINGYO",
		"MONSTER_ID_MUTANT_DRAGON",
		"MONSTER_ID_MUCAR",
		"MONSTER_ID_MUNAC",
		"MONSTER_ID_MEGARIS",
		"MONSTER_ID_MEGARODON",
		"MONSTER_ID_METARURA",
		"MONSTER_ID_MEDUSA",
		"MONSTER_ID_YOYO",
		"MONSTER_ID_RARVAGOLEM",
		"MONSTER_ID_RIDEWORD",
		"MONSTER_ID_RIBIO",
		"MONSTER_ID_RUNATIC",
		"MONSTER_ID_WRAITH",
		"MONSTER_ID_RAIDRIC",
		"MONSTER_ID_RAIDRIC_ARCHER",
		"MONSTER_ID_RAVEORMAI",
		"MONSTER_ID_REQUIEM",
		"MONSTER_ID_REGRLO",
		"MONSTER_ID_RONINZIN",
		"MONSTER_ID_RORTERJAIRO",
		"MONSTER_ID_ROCKER",
		"MONSTER_ID_RODDAFROG",
		"MONSTER_ID_WORMTAIL",
		"MONSTER_ID_WILDROSE",
		"MONSTER_ID_ROOD",
		"MONSTER_ID_CUBE",
		"MONSTER_ID_LOLIRURI",
		"MONSTER_ID_HIROZOIST",
		"MONSTER_ID_ZIBIT",
		"MONSTER_ID_DULAHAN",
		"MONSTER_ID_DISGUIS",
		"MONSTER_ID_BLOODY_MARDER",
		"MONSTER_ID_LORDOF_DEATH",
		"MONSTER_ID_AMONRAR",
		"MONSTER_ID_MYOGUE",
		"MONSTER_ID_DOSEI",
		"MONSTER_ID_KORYUBU",
		"MONSTER_ID_HYEGUN",
		"MONSTER_ID_KOZIN",
		"MONSTER_ID_HATIE_BEBE",
		"MONSTER_ID_DEVILING",
		"MONSTER_ID_KAHO",
		"MONSTER_ID_KRABEN",
		"MONSTER_ID_TAOGUNKA",
		"MONSTER_ID_TAMURANG",
		"MONSTER_ID_LEAFCAT",
		"MONSTER_ID_METALING",
		"MONSTER_ID_PORCELIO",
		"MONSTER_ID_NOKSHAS",
		"MONSTER_ID_VENOMAS",
		"MONSTER_ID_PITMAN",
		"MONSTER_ID_OBSIDIAN",
		"MONSTER_ID_MINERAL",
		"MONSTER_ID_JUNKPOT",
		"MONSTER_ID_UNGORIANT",
		"MONSTER_ID_BEAR_DOLL",
		"MONSTER_ID_RSX_0806",
		"MONSTER_ID_IGNISEM_CENIA",
		"MONSTER_ID_HYUCKEVINE_TRIS",
		"MONSTER_ID_IRENDO_EBESI",
		"MONSTER_ID_CAGAK_ICARUS",
		"MONSTER_ID_RAUREL_VINDER",
		"MONSTER_ID_ARMAIA_DUNZE",
		"MONSTER_ID_IGNISEM_CENIA_MVP",
		"MONSTER_ID_SEIREN_VINSER",
		"MONSTER_ID_ELEMES_GAIL",
		"MONSTER_ID_MARGARETTE_SORIN",
		"MONSTER_ID_CECIL_DIMON",
		"MONSTER_ID_CATHERINE_KEILON",
		"MONSTER_ID_HAWARD_ALTIZEN",
		"MONSTER_ID_SEIREN_VINSER_MVP",
		"MONSTER_ID_ELEMES_GAIL_MVP",
		"MONSTER_ID_MARGARETTE_SORIN_MVP",
		"MONSTER_ID_CECIL_DIMON_MVP",
		"MONSTER_ID_CATHERINE_KEILON_MVP",
		"MONSTER_ID_HAWARD_ALTIZEN_MVP",
		"MONSTER_ID_VIRUS",
		"MONSTER_ID_MORDEN",
		"MONSTER_ID_HILLWIND_RANCER",
		"MONSTER_ID_HILLWIND",
		"MONSTER_ID_REMOVER",
		"MONSTER_ID_GEMINI_S58",
		"MONSTER_ID_ARCDAM_TENSHI",
		"MONSTER_ID_ARCDAM_NINGEN",
		"MONSTER_ID_VENART",
		"MONSTER_ID_ICE_VENART",
		"MONSTER_ID_FLAME_VENART",
		"MONSTER_ID_EARTH_VENART",
		"MONSTER_ID_WIND_VENART",
		"MONSTER_ID_DIMIC",
		"MONSTER_ID_WIND_DEMIC",
		"MONSTER_ID_ICE_DEMIC",
		"MONSTER_ID_EARTH_DIMIC",
		"MONSTER_ID_FLAME_DIMIC",
		"MONSTER_ID_GATE_SEIGYOSOCHI",
		"MONSTER_ID_VESPER",
		"MONSTER_ID_GLEMRIN",
		"MONSTER_ID_BIHOLDER",
		"MONSTER_ID_CHUNG_EAH",
		"MONSTER_ID_PEKUSOZIN",
		"MONSTER_ID_RAFURESIA",
		"MONSTER_ID_RED_NOVAS",
		"MONSTER_ID_YELLOW_NOVAS",
		"MONSTER_ID_GREEN_IGANA",
		"MONSTER_ID_BLEEZE",
		"MONSTER_ID_GREEN_PHEROS",
		"MONSTER_ID_RED_PHEROS",
		"MONSTER_ID_GOLD_OSIDOS",
		"MONSTER_ID_BLUE_OSIDOS",
		"MONSTER_ID_DRAGONNO_TAMAGO",
		"MONSTER_ID_HYDRARANCER",
		"MONSTER_ID_DATALZAURUS",
		"MONSTER_ID_ANCIEND_MIMIC",
		"MONSTER_ID_DEATHWORD",
		"MONSTER_ID_NAGUSAMERUMONO",
		"MONSTER_ID_SHIKKOSURUMONO",
		"MONSTER_ID_HOGOSURUMONO",
		"MONSTER_ID_KANSHISURUMONO",
		"MONSTER_ID_THANATOSNO_KANASHIMI",
		"MONSTER_ID_THANATOSNO_KUNO",
		"MONSTER_ID_THANATOSNO_ZETSUBO",
		"MONSTER_ID_THANATOSNO_ZOUO",
		"MONSTER_ID_MAKENSHI_THANATOSNO_SHINENTAI",
		"MONSTER_ID_BLUE_PRASMA",
		"MONSTER_ID_RED_PRASMA",
		"MONSTER_ID_GREEN_PRASMA",
		"MONSTER_ID_PURPLE_PRASMA",
		"MONSTER_ID_YELLOW_PRASMA",
		"MONSTER_ID_LADYTANIE",
		"MONSTER_ID_ORCBABY",
		"MONSTER_ID_CONSTANT",
		"MONSTER_ID_ELLISA",
		"MONSTER_ID_ELLISEL",
		"MONSTER_ID_ELLIOT",
		"MONSTER_ID_CHIEL",
		"MONSTER_ID_CHIEL_D01",
		"MONSTER_ID_PURUS",
		"MONSTER_ID_SUKOGUR",
		"MONSTER_ID_SUKEGORT_BROWN",
		"MONSTER_ID_SUKEGORT_BLACK",
		"MONSTER_ID_RANDGRIS",
		"MONSTER_ID_GREEN_PHOTOCANON",
		"MONSTER_ID_BLUE_PHOTOCANON",
		"MONSTER_ID_RD_PHOTOCANON",
		"MONSTER_ID_YELLOW_PHOTOCANON",
		"MONSTER_ID_STAPO",
		"MONSTER_ID_ROWEEN",
		"MONSTER_ID_GALION",
		"MONSTER_ID_DROSERA",
		"MONSTER_ID_MASSKIPLER",
		"MONSTER_ID_ATLOS",
		"MONSTER_ID_ICECLE",
		"MONSTER_ID_SHIROMA",
		"MONSTER_ID_GAZETY",
		"MONSTER_ID_SNOWAR",
		"MONSTER_ID_ICETITAN",
		"MONSTER_ID_KTORURANUCUS",
		"MONSTER_ID_VAMBERG",
		"MONSTER_ID_HODOREMLIN",
		"MONSTER_ID_AICIRA",
		"MONSTER_ID_SEEKER",
		"MONSTER_ID_EKIO",
		"MONSTER_ID_AGAGU",
		"MONSTER_ID_GROOM_UNDERNIGHT",
		"MONSTER_ID_MAGMARIN",
		"MONSTER_ID_NOCKER",
		"MONSTER_ID_IMP",
		"MONSTER_ID_BOW_GUARDIAN",
		"MONSTER_ID_KARSER",
		"MONSTER_ID_SWORD_GUARDIAN",
		"MONSTER_ID_BYORG",
		"MONSTER_ID_SARAMANDRA",
		"MONSTER_ID_EFRITE",
		"MONSTER_ID_FLAME_SCALE",
		"MONSTER_ID_HELL_POODLE",
		"MONSTER_ID_RAGID_ZOMBIE",
		"MONSTER_ID_ZOMBIE_THROATER",
		"MONSTER_ID_BANCY",
		"MONSTER_ID_NECROMANCER",
		"MONSTER_ID_OCHITA_DAISHINKAN_HIBAMU",
		"MONSTER_ID_VERSEBB",
		"MONSTER_ID_RANDGRIS_GHOST",
		"MONSTER_ID_OUNO_SHIGAI",
		"MONSTER_ID_HELLION",
		"MONSTER_ID_ANUBIS",
		"MONSTER_ID_LESS",
		"MONSTER_ID_WOOD_GOBLIN",
		"MONSTER_ID_BABAYAGA",
		"MONSTER_ID_OOJAS",
		"MONSTER_ID_MABUKA",
		"MONSTER_ID_GOPINIK",
		"MONSTER_ID_MOROCNO_UTSUSHIMI_TENSHIKATA",
		"MONSTER_ID_MOROCNO_UTSUSHIMI_BUSSHITSUKATA",
		"MONSTER_ID_MOROCNO_UTSUSHIMI_NINGENKATA",
		"MONSTER_ID_MOROCNO_UTSUSHIMI_SEREKATA",
		"MONSTER_ID_MAO_MOROC",
		"MONSTER_ID_KIZUTSUITA_MAO_MOROC",
		"MONSTER_ID_SEIREN_VINSER_KYO",
		"MONSTER_ID_ELEMES_GAIL_KYO",
		"MONSTER_ID_MARGARETTE_SORIN_KYO",
		"MONSTER_ID_CECIL_DIMON_KYO",
		"MONSTER_ID_CATHERINE_KEILON_KYO",
		"MONSTER_ID_HAWARD_ALTIZEN_KYO",
		"MONSTER_ID_SHUGOSEKI",
		"MONSTER_ID_BARRICADE",
		"MONSTER_ID_CHIYUNO_IBARA",
		"MONSTER_ID_SOGEKINO_IHARA",
		"MONSTER_ID_MAHONO_IHARA",
		"MONSTER_ID_ZYOKANO_IHARA",
		"MONSTER_ID_ENTVIEN",
		"MONSTER_ID_NAHT_ZEEKER",
		"MONSTER_ID_SKEGORUT_BROWN_TORIMAKI",
		"MONSTER_ID_SKEGORUT_BLACK_TORIMAKI",
		"MONSTER_ID_IRONFIST",
		"MONSTER_ID_COBALT_MINERAL",
		"MONSTER_ID_HEAVY_METALING",
		"MONSTER_ID_ZAKUDAM",
		"MONSTER_ID_HELL_APOCALYPSE",
		"MONSTER_ID_KUBLIN",
		"MONSTER_ID_PHANAT",
		"MONSTER_ID_AUNOE",
		"MONSTER_ID_BIHOLDER_MASTER",
		"MONSTER_ID_BANSY_MASTER",
		"MONSTER_ID_MAO_BAPHOMET",
		"MONSTER_ID_NEPENTES",
		"MONSTER_ID_PINGIKYURA",
		"MONSTER_ID_RUSIORA_VESPA",
		"MONSTER_ID_HILLSLION",
		"MONSTER_ID_TATACHO",
		"MONSTER_ID_COLNUS",
		"MONSTER_ID_SENTIPIDO_YOCHU",
		"MONSTER_ID_SENTIPIDO",
		"MONSTER_ID_NAGA",
		"MONSTER_ID_TENDRIRURION",
		"MONSTER_ID_HARDROCK_MANMOS",
		"MONSTER_ID_DORACONO_TAMAGO",
		"MONSTER_ID_DORACO",
		"MONSTER_ID_DARK_PINGIKYURA",
		"MONSTER_ID_AQUA_ELEMENTAL",
		"MONSTER_ID_FIRA",
		"MONSTER_ID_RINKO",
		"MONSTER_ID_BRADIUM_GOLEM",
		"MONSTER_ID_ANCIENT_TREE",
		"MONSTER_ID_RATATOSK",
		"MONSTER_ID_DONEIR",
		"MONSTER_ID_DARK_SHADOW",
		"MONSTER_ID_NEEZHEGNO_KAGE",
		"MONSTER_ID_KURUPIRA",
		"MONSTER_ID_TOKAN",
		"MONSTER_ID_JAGGER",
		"MONSTER_ID_PIRANHA",
		"MONSTER_ID_IARA",
		"MONSTER_ID_KUBINASHI_RABA",
		"MONSTER_ID_BOITATA",
		"MONSTER_ID_HELLFLY",
		"MONSTER_ID_ORCSHUGOTAISHO",
		"MONSTER_ID_ORCSOGEKIHE",
		"MONSTER_ID_OCHITA_ORCNO_ONENEN",
		"MONSTER_ID_OCHITA_ORCHERO",
		"MONSTER_ID_MIKO_KARGARRASY",
		"MONSTER_ID_DROMEDES",
		"MONSTER_ID_IKKAKU_SUCARABNO_TAMAGO",
		"MONSTER_ID_SOKAKU_SUCARABNO_TAMAGO",
		"MONSTER_ID_ROKKAKU_SUCARABNO_TAMAGO",
		"MONSTER_ID_GOKAKU_SUCARABNO_TAMAGO",
		"MONSTER_ID_IKKAKU_SUCARAB",
		"MONSTER_ID_SOKAKU_SUCARAB",
		"MONSTER_ID_ROKKAKU_SUCARAB",
		"MONSTER_ID_GOKAKU_SUCARAB",
		"MONSTER_ID_ZYOO_SUCARAB",
		"MONSTER_ID_HERACULES_SUCARAB",
		"MONSTER_ID_CAUCASIA_SUCARAB",
		"MONSTER_ID_REGIUS_SUCARAB",
		"MONSTER_ID_ATLAS_SUCARAB",
		"MONSTER_ID_ZYOTE_SUCARAB",
		"MONSTER_ID_DARK_PRIEST",
		"MONSTER_ID_DEWATA_DRAGON",
		"MONSTER_ID_ARNORDI",
		"MONSTER_ID_GOKURAKUCHO",
		"MONSTER_ID_BANASPATY",
		"MONSTER_ID_BUTOIJO",
		"MONSTER_ID_REYAC",
		"MONSTER_ID_MIMIN",
		"MONSTER_ID_LITTLE_FARTUM",
		"MONSTER_ID_PULSE",
		"MONSTER_ID_UNGRA_MANTICE",
		"MONSTER_ID_POMSPIDER",
		"MONSTER_ID_NEEDZHEG",
		"MONSTER_ID_DOFLE",
		"MONSTER_ID_SEDORA",
		"MONSTER_ID_SROPHO",
		"MONSTER_ID_KING_DRAMOH",
		"MONSTER_ID_KRAKEN",
		"MONSTER_ID_TENTACLES",
		"MONSTER_ID_MERMAN",
		"MONSTER_ID_SIREN",
		"MONSTER_ID_POSEIDON",
		"MONSTER_ID_KRAKEN_BABY",
		"MONSTER_ID_SIORABA",
		"MONSTER_ID_REDELMA",
		"MONSTER_ID_WILDRIDER",
		"MONSTER_ID_KOBUN_TAKO",
		"MONSTER_ID_YOZINBO_IKA",
		"MONSTER_ID_TORYOTAKONO_ASHI",
		"MONSTER_ID_TORYOTAKO",
		"MONSTER_ID_RANDEL_RORENCE",
		"MONSTER_ID_GARTY_UH",
		"MONSTER_ID_CHENG_RIU",
		"MONSTER_ID_ARFOSIO_BASIL",
		"MONSTER_ID_TRENTINI",
		"MONSTER_ID_CERIA_ARDE",
		"MONSTER_ID_EMUR_PURAMEL",
		"MONSTER_ID_RANDEL_RORENCE_KYO",
		"MONSTER_ID_GARTY_UH_KYO",
		"MONSTER_ID_CHENG_RIU_KYO",
		"MONSTER_ID_ARFOSIO_BASIL_KYO",
		"MONSTER_ID_TRENTINI_KYO",
		"MONSTER_ID_CERIA_ARDE_KYO",
		"MONSTER_ID_EMUR_PURAMEL_KYO",
		"MONSTER_ID_RANDEL_RORENCE_MVP",
		"MONSTER_ID_GARTY_UH_MVP",
		"MONSTER_ID_CHENG_RIU_MVP",
		"MONSTER_ID_ARFOSIO_BASIL_MVP",
		"MONSTER_ID_TRENTINI_MVP",
		"MONSTER_ID_CERIA_ARDE_MVP",
		"MONSTER_ID_EMUR_PURAMEL_MVP",
		"MONSTER_ID_UETA_ZIKKENDOBUTSU_SHO",
		"MONSTER_ID_UETA_ZIKKENDOBUTSU_DAI",
		"MONSTER_ID_BUGISGIS",
		"MONSTER_ID_ENCANT",
		"MONSTER_ID_MANANANGAR",
		"MONSTER_ID_MANKKURAM",
		"MONSTER_ID_TIKBARAN",
		"MONSTER_ID_CHANAK",
		"MONSTER_ID_WAKWAK",
		"MONSTER_ID_JEJERING",
		"MONSTER_ID_BYONGUNGO",
		"MONSTER_ID_FUNNUNO_BYONGUNGO",
		"MONSTER_ID_IMIKINO_BYONGUNGO",
		"MONSTER_ID_BUWAYA",
		"MONSTER_ID_BUWAYANO_KAGE",
		"MONSTER_ID_BUWAYANO_TAMAGO",
		"MONSTER_ID_HATARAKI_BUWAYA",
		"MONSTER_ID_MIZUKUSA",
		"MONSTER_ID_BAKONAWA",
		"MONSTER_ID_BAKONAWANO_ISHI",
		"MONSTER_ID_AKUMUNO_MANANANGAR",
		"MONSTER_ID_AKUMUNO_MANKKURAM",
		"MONSTER_ID_AKUMUNO_CHANAK",
		"MONSTER_ID_AKUMUNO_WAKWAK",
		"MONSTER_ID_PURUHO",
		"MONSTER_ID_SUIKA_KOGATA",
		"MONSTER_ID_SUIKA_CHUKATA",
		"MONSTER_ID_SUIKA_OKATA",
		"MONSTER_ID_SUIKA_BOSS",
		"MONSTER_ID_SUIKA_CHUKATAHITO",
		"MONSTER_ID_HERACULES_SUCARABNO_TAMAGO",
		"MONSTER_ID_CAUCASIA_SUCARABNO_TAMAGO",
		"MONSTER_ID_REGIUS_SUCARABNO_TAMAGO",
		"MONSTER_ID_ATLAS_SUCARABNO_TAMAGO",
		"MONSTER_ID_ZYOO_CHOKUZOKU_ANDRE",
		"MONSTER_ID_ZYOO_CHOKUZOKU_PIERE",
		"MONSTER_ID_ZYOO_CHOKUZOKU_DENIRO",
		"MONSTER_ID_HENNA_HYDRA",
		"MONSTER_ID_WISH_MASCOT",
		"MONSTER_ID_ARTIS_MASCOT",
		"MONSTER_ID_SEIREN_VINSER_GUILD",
		"MONSTER_ID_ELEMES_GAIL_GUILD",
		"MONSTER_ID_MARGARETTE_SORIN_GUILD",
		"MONSTER_ID_CECIL_DIMON_GUILD",
		"MONSTER_ID_CATHERINE_KEILON_GUILD",
		"MONSTER_ID_HAWARD_ALTIZEN_GUILD",
		"MONSTER_ID_IGNISEM_CENIA_GUILD",
		"MONSTER_ID_HYUCKEVINE_TRIS_GUILD",
		"MONSTER_ID_IRENDO_EBESI_GUILD",
		"MONSTER_ID_CAGAK_ICARUS_GUILD",
		"MONSTER_ID_ZYOSEFINA",
		"MONSTER_ID_RAUREL_VINDER_GUILD",
		"MONSTER_ID_ARMAIA_DUNZE_GUILD",
		"MONSTER_ID_AKUMUNO_BAPHOMET",
		"MONSTER_ID_AMDARAIS",
		"MONSTER_ID_SASOINO_MAGAN",
		"MONSTER_ID_AKUMUNO_BAPHOMET_JR",
		"MONSTER_ID_NOROWARETA_BONUSHI",
		"MONSTER_ID_DARAKUSHITA_SEISHOKUSHA",
		"MONSTER_ID_NOROWARETA_HAKO",
		"MONSTER_ID_NOROWARETA_HON",
		"MONSTER_ID_NOROWARETA_SAMAYOUMONO",
		"MONSTER_ID_AKUMUNO_CHEMERA",
		"MONSTER_ID_KYOKANNO_TEIENSHI",
		"MONSTER_ID_URAMINO_MAID",
		"MONSTER_ID_KUTSUNO_KAREI",
		"MONSTER_ID_HAIKAISURU_YUMIHEI",
		"MONSTER_ID_FUHAISHITA_HEISHI",
		"MONSTER_ID_ONNENNO_KAHRITZBARG",
		"MONSTER_ID_NOROWARETA_KISHI",
		"MONSTER_ID_MAGOTTO",
		"MONSTER_ID_OCHITA_SHIRONO_KISHI",
		"MONSTER_ID_KUTSUNO_ROYALKNIGHT",
		"MONSTER_ID_NOROWARETA_ROYALKNIGHT",
		"MONSTER_ID_NOROINO_KAHRITZBARG",
		"MONSTER_ID_MENBRITZ",
		"MONSTER_ID_PETAR",
		"MONSTER_ID_CHENERE",
		"MONSTER_ID_KISONSARETA_KOSHO",
		"MONSTER_ID_VASSER_LIHITERUN",
		"MONSTER_ID_GERBU_LIHITERUN",
		"MONSTER_ID_FUNKE_LIHITERUN",
		"MONSTER_ID_FERS_LIHITERUN",
		"MONSTER_ID_LYHT_HERSHAR",
		"MONSTER_ID_MAONO_BUKA",
		"MONSTER_ID_AYASHI_SONZAI",
		"MONSTER_ID_LUCKYRING",
		"MONSTER_ID_JURALING",
		"MONSTER_ID_SPERING",
		"MONSTER_ID_GACHIPO",
		"MONSTER_ID_ZONRING",
		"MONSTER_ID_BASHIRING",
		"MONSTER_ID_DEADRAGORA",
		"MONSTER_ID_ZINPU",
		"MONSTER_ID_REPPU",
		"MONSTER_ID_SENPU",
		"MONSTER_ID_UFU",
		"MONSTER_ID_MAFU",
		"MONSTER_ID_TOGURO_ZIKEI",
		"MONSTER_ID_TOGURO_CHOKEI",
		"MONSTER_ID_OKAMIMAN",
		"MONSTER_ID_WANDER_AKI",
		"MONSTER_ID_ROCKBELL",
		"MONSTER_ID_NAKIMUSHI",
		"MONSTER_ID_MUMMYIE",
		"MONSTER_ID_MEIO_HADES_2013",
		"MONSTER_ID_NUMDES_2013",
		"MONSTER_ID_SHINIGAMI_JOKER_2013",
		"MONSTER_ID_ARAMAKI_2013",
		"MONSTER_ID_MARYU_YARUFOI_2013",
		"MONSTER_ID_BATZFOI_2013",
		"MONSTER_ID_ANKOKUSHIN_NAI_2013",
		"MONSTER_ID_NEFREN_2013",
		"MONSTER_ID_GYOTEI_MAMAN_2013",
		"MONSTER_ID_MENSA_2013",
		"MONSTER_ID_KOTAI_SENTINEL_2013",
		"MONSTER_ID_ZYOTEI_GG_2013",
		"MONSTER_ID_DAICHORO_AIRIN",
		"MONSTER_ID_PHAIYONG_KEIBIHEI",
		"MONSTER_ID_PHAIYONG_SHUGOHEI",
		"MONSTER_ID_OTONASHI_KEIBIKEN",
		"MONSTER_ID_KYOBONA_KEIBIKEN",
		"MONSTER_ID_FACEWORM",
		"MONSTER_ID_DARK_FACEWORM",
		"MONSTER_ID_FACEWORMNO_TAMAGO",
		"MONSTER_ID_MODOKUFUKURO",
		"MONSTER_ID_FACEWORMNO_YOCHU",
		"MONSTER_ID_ZYOO_FACEWORM",
		"MONSTER_ID_ZYOO_FACEWORM_AKA",
		"MONSTER_ID_ZYOO_FACEWORM_MIDORI",
		"MONSTER_ID_ZYOO_FACEWORM_AO",
		"MONSTER_ID_ZYOO_FACEWORM_KI",
		"MONSTER_ID_KAIKINA_SOSHOKUTREE",
		"MONSTER_ID_ANSONI_HORROR",
		"MONSTER_ID_PRESENT_HOSOTANTOSHA",
		"MONSTER_ID_OMOCHAKOZYO_KEIBIEHEI",
		"MONSTER_ID_HOSOSARETA_BOX",
		"MONSTER_ID_KOZYOKEIBIINNO_TAMASHI",
		"MONSTER_ID_PRESENTGANAI_YURE",
		"MONSTER_ID_HOSOSARENAKATTA_NINGYO",
		"MONSTER_ID_SUTERARETA_KUMANINGYO",
		"MONSTER_ID_SELINE_KIMI",
		"MONSTER_ID_KIMINO_GENEI",
		"MONSTER_ID_ARUHI",
		"MONSTER_ID_DIO_ANEMOS",
		"MONSTER_ID_BLACK_KANARY",
		"MONSTER_ID_HIPIA_SNIKI",
		"MONSTER_ID_BILLY_COSRULEATH",
		"MONSTER_ID_PHEMON",
		"MONSTER_ID_ORDR",
		"MONSTER_ID_BLUTO_HAZE",
		"MONSTER_ID_KUROMA",
		"MONSTER_ID_IPHODOS",
		"MONSTER_ID_LECHENIE",
		"MONSTER_ID_YUMEHIME",
		"MONSTER_ID_JOO",
		"MONSTER_ID_DIWAI",
		"MONSTER_ID_PHEI_KANAVIAN",
		"MONSTER_ID_ALPHON",
		"MONSTER_ID_ALPHON_JR",
		"MONSTER_ID_FENRIR",
		"MONSTER_ID_PLAYER",
		"MONSTER_ID_WHISPER_FUSHI",
		"MONSTER_ID_TAKN",
		"MONSTER_ID_UNKER",
		"MONSTER_ID_BIGBENG",
		"MONSTER_ID_BIGBELL",
		"MONSTER_ID_TIMEKEEPER",
		"MONSTER_ID_NEOPANK",
		"MONSTER_ID_ARCELDER",
		"MONSTER_ID_OWL_VAICOUNT",
		"MONSTER_ID_OWL_MARKIS",
		"MONSTER_ID_TIMEHOLDER",
		"MONSTER_ID_BOGYAKUNO_HAKO",
		"MONSTER_ID_FLAME_CONDOR",
		"MONSTER_ID_FLAME_FRILLDRA",
		"MONSTER_ID_FLAME_GOLEM",
		"MONSTER_ID_FLAME_SANDMAN",
		"MONSTER_ID_FLAME_BUG",
		"MONSTER_ID_SONIA",
		"MONSTER_ID_FLAMEPIT",
		"MONSTER_ID_ENKANO_MOROCNO_UTSUSHIMI",
		"MONSTER_ID_YUGANDA_MOROCNO_UTSUSHIMI",
		"MONSTER_ID_REIKINO_MOROCNO_UTSUSHIMI",
		"MONSTER_ID_SEIZYANO_ORCBABY",
		"MONSTER_ID_SEIZYANO_KO_DESSERT_WOLF",
		"MONSTER_ID_SEIZYANO_MARINESPHERE",
		"MONSTER_ID_SEIZYANO_ORCWORRIOR",
		"MONSTER_ID_SEIZYANO_DESSERT_WOLF",
		"MONSTER_ID_SEIZYANO_PHEN",
		"MONSTER_ID_SHISHANO_ORCZOMBIE",
		"MONSTER_ID_SHISHANO_BERIT",
		"MONSTER_ID_SHISHANO_MEGARODON",
		"MONSTER_ID_SHINIGAMI_UNK",
		"MONSTER_ID_MORS_GHOLE",
		"MONSTER_ID_MORS_OSIRIS",
		"MONSTER_ID_MORS_ARCHER",
		"MONSTER_ID_MORS_WRAITH",
		"MONSTER_ID_MORS_BERIT",
		"MONSTER_ID_MORS_ROOD",
		"MONSTER_ID_MORS_PLANKTON",
		"MONSTER_ID_MOROC_QUESTION",
		"MONSTER_ID_MORS_MADOSHI",
		"MONSTER_ID_MORS_NECROMANCER",
		"MONSTER_ID_KOKINO_MANA",
		"MONSTER_ID_SEIMEINO_MANA",
		"MONSTER_ID_DAICHINO_MANA",
		"MONSTER_ID_FLOST_SPIDER",
		"MONSTER_ID_KYOKINO_KARSER",
		"MONSTER_ID_KYOKINO_SARAMANDRA",
		"MONSTER_ID_MAZINNOSHITO_AHATO",
		"MONSTER_ID_MAZINNOSHITO_SHINAIM",
		"MONSTER_ID_BURINARANEA",
		"MONSTER_ID_MUSPERKOLE",
		"MONSTER_ID_TAIKONO_MOROC",
		"MONSTER_ID_ANSOKUNO_MOROC",
		"MONSTER_ID_SAISEINO_HANMAZIN",
		"MONSTER_ID_ZETSUBONOKAMI_MOROC",
		"MONSTER_ID_PELL",
		"MONSTER_ID_SINGING_PELL",
		"MONSTER_ID_SWING_PELL",
		"MONSTER_ID_KISSME_PELL",
		"MONSTER_ID_PIANO_ZITTER_BUG",
		"MONSTER_ID_FORTE_ZITTER_BUG",
		"MONSTER_ID_FORTESSISSIMO_ZITTER_BUG",
		"MONSTER_ID_MAZINSEKI",
		"MONSTER_ID_YUWAKUNO_MAZINNO_KAGE",
		"MONSTER_ID_SAIGINO_MAZINNO_KAGE",
		"MONSTER_ID_ZETSUNENNNO_MAZINNO_KAGE",
		"MONSTER_ID_MAZINNO_KYOEI",
		"MONSTER_ID_KUSSAKUGATA_VERUSGEAR",
		"MONSTER_ID_TEISATSUGATA_VERUSGEAR",
		"MONSTER_ID_SHURIGATA_VERUSGEAR",
		"MONSTER_ID_TANSAGATA_VERUSGEAR",
		"MONSTER_ID_METSUBOSHUKUFUKUKYODAN_KANBU",
		"MONSTER_ID_METSUBOSHUKUFUKUKYODAN_SHINZYA",
		"MONSTER_ID_SMOG",
		"MONSTER_ID_SHURIGATA_VERUSGEAR_2",
		"MONSTER_ID_TANSAGATA_VERUSGEAR_2",
		"MONSTER_ID_CLAP",
		"MONSTER_ID_GC109",
		"MONSTER_ID_DR815",
		"MONSTER_ID_SYSTEM_MESSAGE_1",
		"MONSTER_ID_HITSUNO_MOZYA",
		"MONSTER_ID_CHINTSUNO_MOZYA",
		"MONSTER_ID_SYSTEM_MESSAGE_2",
		"MONSTER_ID_T_W_O",
		"MONSTER_ID_STEP",
		"MONSTER_ID_ROCKSTEP",
		"MONSTER_ID_KICKSTEP",
		"MONSTER_ID_KICKAND_KICK",
		"MONSTER_ID_CHARLESTON_3GOU",
		"MONSTER_ID_GRAVE_MINOTAUR",
		"MONSTER_ID_GRAVE_MIMIC",
		"MONSTER_ID_GRAVE_ACRAUS",
		"MONSTER_ID_GRAVE_CROWNMUMMY",
		"MONSTER_ID_GRAVE_MUMMY",
		"MONSTER_ID_GRAVE_BERIT",
		"MONSTER_ID_AMENHOTEP",
		"MONSTER_ID_KODAINO_KUKRE",
		"MONSTER_ID_SHINKAINO_KANI",
		"MONSTER_ID_KODAINO_VADON",
		"MONSTER_ID_SHINKAINO_CORNUTUS",
		"MONSTER_ID_SHINKAINO_OBAKEGAI",
		"MONSTER_ID_KODAINO_MARC",
		"MONSTER_ID_KODAINO_SWORDFISH",
		"MONSTER_ID_KODAINO_OVEAUNE",
		"MONSTER_ID_HENINO_KAPPA",
		"MONSTER_ID_HENINO_STROUF",
		"MONSTER_ID_HENINO_ANOLIAN",
		"MONSTER_ID_IKEINO_COELACANTH",
		"MONSTER_ID_ANKOKUNO_COELACANTH",
		"MONSTER_ID_HENINO_COELACANTH",
		"MONSTER_ID_BOGYAKUNO_COELACANTH",
		"MONSTER_ID_GIGANTES",
		"MONSTER_ID_KIDONO_GIGANTES",
		"MONSTER_ID_RED_GIGANTES",
		"MONSTER_ID_SOFU_GIGANTES",
		"MONSTER_ID_KIDONO_SOFU_GIGANTES",
		"MONSTER_ID_SOFU_RED_GIGANTES",
		"MONSTER_ID_SARANO_TSUKAIMA",
		"MONSTER_ID_KYOAKUNA_GARION",
		"MONSTER_ID_SARANO_GENEI",
		"MONSTER_ID_WYBARN_KID",
		"MONSTER_ID_WRESSER_WYBARN",
		"MONSTER_ID_SKY_BIHOLDER",
		"MONSTER_ID_SKY_GLEMLIN",
		"MONSTER_ID_SKY_ROTERJAIRO",
		"MONSTER_ID_WYBARN",
		"MONSTER_ID_IKARINO_SENCHO_PELLROCK",
		"MONSTER_ID_BOSOSHITA_SENCHO_PELLROCK",
		"MONSTER_ID_OKUBYONA_KOKORO",
		"MONSTER_ID_OSAERARENAI_FUNNU",
		"MONSTER_ID_HIKUTSUNA_KOKORO",
		"MONSTER_ID_SITTONO_HONOO",
		"MONSTER_ID_KODOKUNA_YUME",
		"MONSTER_ID_NIKUSHIMINO_KATAMARI",
		"MONSTER_ID_TORIMODOSENU_AI",
		"MONSTER_ID_BUTSUYOKUNO_KESHIN",
		"MONSTER_ID_YOKUSEISHITA_HAKAISHODO",
		"MONSTER_ID_KAKUSARETA_ZISONSHIN",
		"MONSTER_ID_SENBOSURU_KAGE",
		"MONSTER_ID_NOROINO_KONGEN",
		"MONSTER_ID_MONSTER_TENYURYOKU",
		"MONSTER_ID_SEIREN_VINSER_GOKU",
		"MONSTER_ID_CATHERINE_KEILON_GOKU",
		"MONSTER_ID_CECIL_DIMON_GOKU",
		"MONSTER_ID_MARGARETTE_SORIN_GOKU",
		"MONSTER_ID_ELEMES_GAIL_GOKU",
		"MONSTER_ID_HAWARD_ALTIZEN_GOKU",
		"MONSTER_ID_RANDEL_RORENCE_GOKU",
		"MONSTER_ID_CERIA_ARDE_GOKU",
		"MONSTER_ID_ARFOSIO_BASIL_GOKU",
		"MONSTER_ID_TRENTINI_GOKU",
		"MONSTER_ID_CHENG_RIU_GOKU",
		"MONSTER_ID_GARTY_UH_GOKU",
		"MONSTER_ID_EMUR_PURAMEL_GOKU",
		"MONSTER_ID_SEIREN_VINSER_GOKU_TSUYO",
		"MONSTER_ID_CATHERINE_KEILON_GOKU_TSUYO",
		"MONSTER_ID_CECIL_DIMON_GOKU_TSUYO",
		"MONSTER_ID_MARGARETTE_SORIN_GOKU_TSUYO",
		"MONSTER_ID_ELEMES_GAIL_GOKU_TSUYO",
		"MONSTER_ID_HAWARD_ALTIZEN_GOKU_TSUYO",
		"MONSTER_ID_RANDEL_RORENCE_GOKU_TSUYO",
		"MONSTER_ID_CERIA_ARDE_GOKU_TSUYO",
		"MONSTER_ID_ARFOSIO_BASIL_GOKU_TSUYO",
		"MONSTER_ID_TRENTINI_GOKU_TSUYO",
		"MONSTER_ID_CHENG_RIU_GOKU_TSUYO",
		"MONSTER_ID_GARTY_UH_GOKU_TSUYO",
		"MONSTER_ID_EMUR_PURAMEL_GOKU_TSUYO",
		"MONSTER_ID_HAYATENO_RATATOSKR",
		"MONSTER_ID_SENPUNO_PULSE",
		"MONSTER_ID_BOFUNO_GALAPAGO",
		"MONSTER_ID_ELVIRA",
		"MONSTER_ID_HOLY_ELDER",
		"MONSTER_ID_RETRIBUTION",
		"MONSTER_ID_HELL_WRAITH",
		"MONSTER_ID_RUDO",
		"MONSTER_ID_GEKISHINNO_DUNEYRR",
		"MONSTER_ID_CHIWOHAU_GOLEM",
		"MONSTER_ID_NEDUITA_TENKATAISHOGUN",
		"MONSTER_ID_SOHION",
		"MONSTER_ID_HEAT_RAYDRIC",
		"MONSTER_ID_INFERNO_KNIGHT",
		"MONSTER_ID_MAGMA_GOLEM",
		"MONSTER_ID_LOLA",
		"MONSTER_ID_MUZIHINA_GIOIANO_KAGE",
		"MONSTER_ID_SHOGUN_DAEHYONNO_KAGE",
		"MONSTER_ID_MOZYANO_SHUGOSHA_KADESNO_KAGE",
		"MONSTER_ID_KYOSHINZYA_PYURIELNO_KAGE",
		"MONSTER_ID_NANPUNO_RATATOSKR",
		"MONSTER_ID_BIFUNO_PULSE",
		"MONSTER_ID_KEIFUNO_GALAPAGO",
		"MONSTER_ID_CHISANA_ELVIRA",
		"MONSTER_ID_RESSHINNO_DUNEYRR",
		"MONSTER_ID_DAICHINO_GOLEM",
		"MONSTER_ID_FUDONO_TENKATAISHOGUN",
		"MONSTER_ID_CHISANA_SOHION",
		"MONSTER_ID_ENKONNO_NIWASHI",
		"MONSTER_ID_ENKONNO_MAID",
		"MONSTER_ID_ENKONNO_KARE",
		"MONSTER_ID_KYO_MAGOTTO",
		"MONSTER_ID_ENKONNO_KYUHE",
		"MONSTER_ID_ENKONNO_HESHI",
		"MONSTER_ID_ENKONNO_KHALITZBURG",
		"MONSTER_ID_ENKONNO_KISHI",
		"MONSTER_ID_ENKONNO_SHIRONO_KISHI",
		"MONSTER_ID_SHINO_ROYALKNIGHT",
		"MONSTER_ID_ZETSUBONO_ROYALKNIGHT",
		"MONSTER_ID_SATSURIKUNO_MAGAN",
		"MONSTER_ID_MAGANNO_AMDARAIS",
		"MONSTER_ID_FROZEN_WOLF",
		"MONSTER_ID_LITTLE_FROZEN_WOLF",
		"MONSTER_ID_TAFIE",
		"MONSTER_ID_LITTLE_TAFIE",
		"MONSTER_ID_WATCHER",
		"MONSTER_ID_FUMETSUNO_WINDGHOST",
		"MONSTER_ID_FUMETSUNO_NOROWARETAKISHI",
		"MONSTER_ID_ZOMBIE_GUARD",
		"MONSTER_ID_FUSHINO_GUNDANHEI",
		"MONSTER_ID_FUSHINO_GUNDANHANCHO",
		"MONSTER_ID_FUSHINO_GUNDANBUNTAICHO",
		"MONSTER_ID_FUSHINO_GUNDANHEISHICHO",
		"MONSTER_ID_FUSHINO_KUSHIZASHIGUNDANHEI",
		"MONSTER_ID_FUSHINO_KIRISAKIGUNDANHEI",
		"MONSTER_ID_FUSHINO_YATSUZAKIGUNDANHEI",
		"MONSTER_ID_FUSHINO_GUNDANSHIREIKAN",
		"MONSTER_ID_POWERFULL_AMDARAIS",
		"MONSTER_ID_KAIZO_AMDARAIS",
		"MONSTER_ID_ZIKKENTAI_AMDARAIS",
		"MONSTER_ID_POWERFULL_A_SKELETON",
		"MONSTER_ID_POWERFULL_SKELETON",
		"MONSTER_ID_POWERFULL_S_SKELETON",
		"MONSTER_ID_FUSHINO_RAGIDZOMBIE",
		"MONSTER_ID_FUSHINO_AKUMUNO_KAGE",
		"MONSTER_ID_FUSHINO_IKARINO_KAGE",
		"MONSTER_ID_FUSHINO_NOROINO_KAGE",
		"MONSTER_ID_FUSHINO_YOSAIHEI",
		"MONSTER_ID_FUSHINO_ZOMBIE_MASTER",
		"MONSTER_ID_FUSHINO_ZOMBIE_SLAUGHTER",
		"MONSTER_ID_FUSHINO_NOROWARETA_KISHI",
		"MONSTER_ID_FUSHINO_WINDGHOST",
		"MONSTER_ID_FUSHINO_ZOMBIE",
		"MONSTER_ID_SHUZIN_243AD265",
		"MONSTER_ID_SHUZIN_267BD184",
		"MONSTER_ID_SHUZIN_265CM154",
		"MONSTER_ID_SHUZIN_95EB72",
		"MONSTER_ID_SHUZIN_117FM188",
		"MONSTER_ID_SHUZIN_103GD214",
		"MONSTER_ID_SHUZIN_55HK115",
		"MONSTER_ID_S_J_HORNEST_WOLF",
		"MONSTER_ID_BIJOU",
		"MONSTER_ID_MUZIHINA_GIOIA",
		"MONSTER_ID_SHOGUN_DAEHYON",
		"MONSTER_ID_MOZYANO_SHUGOSHA_KADES",
		"MONSTER_ID_KYOSHINZYA_PYURIEL",
		"MONSTER_ID_HEITAI_ANDRE",
		"MONSTER_ID_HEITAI_PIERE",
		"MONSTER_ID_HEITAI_DENIRO",
		"MONSTER_ID_SHELTER",
		"MONSTER_ID_SOLAS",
		"MONSTER_ID_OVSERVATION",
		"MONSTER_ID_FLEIM_GIGANTAIS",
		"MONSTER_ID_FLEIM_SOLDIER",
		"MONSTER_ID_FLEIM_ARCHER",
		"MONSTER_ID_EABUL",
		"MONSTER_ID_HEART_HUNTER_FW",
		"MONSTER_ID_HEART_HUNTER_BC",
		"MONSTER_ID_SNIPE_GUARD",
		"MONSTER_ID_ASSALT_GUARD",
		"MONSTER_ID_KILLER_GUARD",
		"MONSTER_ID_HEART_HUNTER_LEADER",
		"MONSTER_ID_YSF01_SEIREN",
		"MONSTER_ID_HEART_HUNTER_KEBIHE",
		"MONSTER_ID_CUTIE",
		"MONSTER_ID_ZIKKENYOTAI_MUCAR_KATA",
		"MONSTER_ID_ZIKKENYOTAI_DROSERA_KATA",
		"MONSTER_ID_ZIKKENYOTAI_PIKKI_KATA",
		"MONSTER_ID_ZIKKENYOTAI_CONDOR_KATA",
		"MONSTER_ID_ZIKKENYOTAI_METALIN_KATA",
		"MONSTER_ID_ZIKKENYOTAI_MAGMALIN_KATA",
		"MONSTER_ID_ZIKKENYOTAI_GOAT_KATA",
		"MONSTER_ID_ZIKKENYOTAI_SAVAGE_KATA",
		"MONSTER_ID_ZIKKENSETAI_MUCAR_KATA",
		"MONSTER_ID_ZIKKENSETAI_DROSERA_KATA",
		"MONSTER_ID_ZIKKENSETAI_PIKKI_KATA",
		"MONSTER_ID_ZIKKENSETAI_CONDOR_KATA",
		"MONSTER_ID_ZIKKENSETAI_METALIN_KATA",
		"MONSTER_ID_ZIKKENSETAI_MAGMALIN_KATA",
		"MONSTER_ID_ZIKKENSETAI_GOAT_KATA",
		"MONSTER_ID_ZIKKENSETAI_SAVAGE_KATA",
		"MONSTER_ID_HUMANOID_CHIMERA",
		"MONSTER_ID_MATTER_CHIMERA",
		"MONSTER_ID_VENOM_CHIMERA",
		"MONSTER_ID_BANDID",
		"MONSTER_ID_TARMARING",
		"MONSTER_ID_TARBARING",
		"MONSTER_ID_KYOKA_FLAME_SCALE",
		"MONSTER_ID_KYOKA_HELL_POODLE",
		"MONSTER_ID_KYOKA_RAGID_ZOMBIE",
		"MONSTER_ID_KYOKA_ZOMBIE_THROATER",
		"MONSTER_ID_KYOKA_BANCY",
		"MONSTER_ID_KYOKA_BANCY_MASTER",
		"MONSTER_ID_KYOKA_NECROMANCER",
		"MONSTER_ID_ROUND_RIDER",
		"MONSTER_ID_SIDE_RIDER",
		"MONSTER_ID_BLADE_RIDER",
		"MONSTER_ID_COVOTE",
		"MONSTER_ID_TOP_ROUND_RIDER",
		"MONSTER_ID_TOP_SIDE_RIDER",
		"MONSTER_ID_TOP_BLADE_RIDER",
		"MONSTER_ID_GASTER",
		"MONSTER_ID_DEVILS_FINGERS",
		"MONSTER_ID_CARNIVARAUS",
		"MONSTER_ID_PLASMA_RAT",
		"MONSTER_ID_MINION_SHOKYU_KAHRITZBARG",
		"MONSTER_ID_MINION_SHOKYU_KUTSUNO_ROYAL_KNIGHT",
		"MONSTER_ID_MINION_SHOKYU_SHINNENNNO_KISHI",
		"MONSTER_ID_MINION_SHOKYU_DARK_ILLUSION",
		"MONSTER_ID_MINION_SHOKYU_BIHOLDER_MASTER",
		"MONSTER_ID_GATE_KEEPER_SHOKYU",
		"MONSTER_ID_SHINKA_ELEMES_SHOKYU",
		"MONSTER_ID_SHINKA_CATHERINE_SHOKYU",
		"MONSTER_ID_SHINKA_HOWARD_SHOKYU",
		"MONSTER_ID_SHINKA_MARGUERITE_SHOKYU",
		"MONSTER_ID_MINION_CHUKYU_KAHRITZBARG",
		"MONSTER_ID_MINION_CHUKYU_KUTSUNO_ROYAL_KNIGHT",
		"MONSTER_ID_MINION_CHUKYU_SHINNENNNO_KISHI",
		"MONSTER_ID_MINION_CHUKYU_DARK_ILLUSION",
		"MONSTER_ID_MINION_CHUKYU_BIHOLDER_MASTER",
		"MONSTER_ID_GATE_KEEPER_CHUKYU",
		"MONSTER_ID_SHINKA_ELEMES_CHUKYU",
		"MONSTER_ID_SHINKA_CATHERINE_CHUKYU",
		"MONSTER_ID_SHINKA_HOWARD_CHUKYU",
		"MONSTER_ID_SHINKA_MARGUERITE_CHUKYU",
		"MONSTER_ID_MINION_ZYOKYU_KAHRITZBARG",
		"MONSTER_ID_MINION_ZYOKYU_KUTSUNO_ROYAL_KNIGHT",
		"MONSTER_ID_MINION_ZYOKYU_SHINNENNNO_KISHI",
		"MONSTER_ID_MINION_ZYOKYU_DARK_ILLUSION",
		"MONSTER_ID_MINION_ZYOKYU_BIHOLDER_MASTER",
		"MONSTER_ID_GATE_KEEPER_ZYOKYU",
		"MONSTER_ID_SHINKA_ELEMES_ZYOKYU",
		"MONSTER_ID_SHINKA_CATHERINE_ZYOKYU",
		"MONSTER_ID_SHINKA_HOWARD_ZYOKYU",
		"MONSTER_ID_SHINKA_MARGUERITE_ZYOKYU",
		"MONSTER_ID_KYOKA_DEADLY_WRAITH",
		"MONSTER_ID_KYOKA_ZOMBIE_MASTER",
		"MONSTER_ID_KYOKA_MINIDEMO",
		"MONSTER_ID_KYOKA_DARK_PRIEST",
		"MONSTER_ID_KYOKA_D_ILLUSION",
		"MONSTER_ID_KYOKA_KYODAI_WHISPER",
		"MONSTER_ID_KYOKA_DEVILTI",
		"MONSTER_ID_KYOKA_GULE",
		"MONSTER_ID_SEITAI_MVP_3F",
		"MONSTER_ID_SEITAI_MVP_4F",
		"MONSTER_ID_EGGRING",
		"MONSTER_ID_BIG_EGGRING",
		"MONSTER_ID_LEAF_RUNATIC",
		"MONSTER_ID_GRASS_FABLE",
		"MONSTER_ID_SWEET_FROG",
		"MONSTER_ID_HUNTER_WOLF",
		"MONSTER_ID_WILD_HONET",
		"MONSTER_ID_TEISATSU_BASILLISK",
		"MONSTER_ID_TRANCE_SPORE",
		"MONSTER_ID_JUNGLE_MANDRAGORA",
		"MONSTER_ID_TOTSUGEKI_AKA_BASILLISK",
		"MONSTER_ID_TOTSUGEKI_MIDORI_BASILLISK",
		"MONSTER_ID_FRUITS_POM_SPIDER",
		"MONSTER_ID_IKARINO_KUMIHO",
		"MONSTER_ID_ENKONNO_MUNAC",
		"MONSTER_ID_ENKONNO_BONGGONG",
		"MONSTER_ID_ENKONNO_SOPHY",
		"MONSTER_ID_ENKONNO_A_SKELTON",
		"MONSTER_ID_IKARINO_UORYAFA",
		"MONSTER_ID_SHINRINO_MAHOTSUKAI",
		"MONSTER_ID_IKARINO_GAZETY",
		"MONSTER_ID_IKARINO_SNOWER",
		"MONSTER_ID_IKARINO_ICE_TITAN",
		"MONSTER_ID_SURUDOI_ICECLE",
		"MONSTER_ID_KAKUSEI_KUTORURANUCKS",
		"MONSTER_ID_KYORANSHITA_BOKENSHA",
		"MONSTER_ID_SWEET_NIGHTMARE",
		"MONSTER_ID_MAT_DRAINRIER",
		"MONSTER_ID_HOTARU_KINOKO",
		"MONSTER_ID_YASURAGIWO_UBAWARESHI_SHIKI",
		"MONSTER_ID_YASURAGIWO_UBAWARESHI_MOZYA",
		"MONSTER_ID_YASURAGIWO_UBAWARESHI_MONO",
		"MONSTER_ID_IKARINO_DRACULA",
		"MONSTER_ID_BOMI",
		"MONSTER_ID_FUKITSUNA_HEAT_TURTLE",
		"MONSTER_ID_FUKITSUNA_FREEZE_TURTLE",
		"MONSTER_ID_FUKITSUNA_SOLID_TURTLE",
		"MONSTER_ID_FUKITSUNA_ASSALT_TURTLE",
		"MONSTER_ID_FUKITSUNA_P_TURTLE",
		"MONSTER_ID_FUKITSUNA_TURTLE_G",
		"MONSTER_ID_GRASS_WILO",
		"MONSTER_ID_GRASS_MABUKA",
		"MONSTER_ID_GRASS_ARGIOPE",
		"MONSTER_ID_MEROLIN",
		"MONSTER_ID_ROCK_SCORPION",
		"MONSTER_ID_ROCK_SNAKE",
		"MONSTER_ID_ROCK_SAVAGE",
		"MONSTER_ID_HIDERICH",
		"MONSTER_ID_AKAIRONO_BEARDOLL",
		"MONSTER_ID_KIIRONO_BEARDOLL",
		"MONSTER_ID_MIDORIIRONO_BEARDOLL",
		"MONSTER_ID_SHIROIRONO_BEARDOLL",
		"MONSTER_ID_AOIRONO_BEARDOLL",
		"MONSTER_ID_RODOGATA_PITMAN",
		"MONSTER_ID_ZYANENNO_OBISIDIAN",
		"MONSTER_ID_TAMASHINO_HAHEN",
		"MONSTER_ID_KAGAYAKU_BEARDOLL",
		"MONSTER_ID_INISHIENO_S_GOLEM",
		"MONSTER_ID_INISHIENO_SANYOCHU",
		"MONSTER_ID_INISHIENO_FLAME_SHOOTER",
		"MONSTER_ID_INISHIENO_MEGALIS",
		"MONSTER_ID_INISHIENO_WOOTANG_SHOOTER",
		"MONSTER_ID_INISHIENO_WOOTANG_FIGHTER",
		"MONSTER_ID_INISHIENO_WOOTANG_GUARD",
		"MONSTER_ID_INISHIENO_TAOGUNKA",
		"MONSTER_ID_ELEMES_GAIL_QUEST_EDDA",
		"MONSTER_ID_REKENBELL_KEIBIHEI",
		"MONSTER_ID_REKENBELL_KEIBIHEICHO",
		"MONSTER_ID_REGENSHLM_KAGAKUSHA",
		"MONSTER_ID_MUMEINO_SWORDMAN_KAIWA_MODE",
		"MONSTER_ID_ELITE_KEIBIHEI",
		"MONSTER_ID_ELITE_KEIBIHEICHO",
		"MONSTER_ID_ELITE_KAGAKUSHA",
		"MONSTER_ID_MUMEINO_SWORDMAN_SENTO_MODE",
		"MONSTER_ID_MUMEINO_ACOLYTE",
		"MONSTER_ID_MUMEINO_THIEF",
		"MONSTER_ID_MUMEINO_MAGICIAN",
		"MONSTER_ID_MUMEINO_MARCHANT",
		"MONSTER_ID_MUMEINO_ARCHER",
		"MONSTER_ID_MUMEINO_SWORDMAN_SENTO_MODE_MVP",
		"MONSTER_ID_VENENUM",
		"MONSTER_ID_TWIN_CAPUT",
		"MONSTER_ID_DOLOR",
		"MONSTER_ID_HEART_HUNTER_SANARE",
		"MONSTER_ID_HEART_HUNTER_BELLARE",
		"MONSTER_ID_R48_85_BESTIA",
		"MONSTER_ID_HEART_HUNTER_M_SANARE",
		"MONSTER_ID_HEART_HUNTER_M_BELLARE",
		"MONSTER_ID_PLAGA",
		"MONSTER_ID_HENSHU_DOLOR",
		"MONSTER_ID_HENSHU_VENENUM",
		"MONSTER_ID_HENSHU_TWIN_CAPUT",
		"MONSTER_ID_HENSHU_PLAGA",
		"MONSTER_ID_E_13EN0",
		"MONSTER_ID_EA2S",
		"MONSTER_ID_E_EA1L",
		"MONSTER_ID_EL_A17T",
		"MONSTER_ID_TWIN_CAPUT_CP",
		"MONSTER_ID_DOLOR_CP",
		"MONSTER_ID_HEART_HUNTER_BELLARE_CP",
		"MONSTER_ID_POISON_GUSTER",
		"MONSTER_ID_MIGEL",
		"MONSTER_ID_MIGEL_STORY",
		"MONSTER_ID_KANASHIMINO_KUROB",
		"MONSTER_ID_KONTONNO_BAPHOMET_JR",
		"MONSTER_ID_KONTONNO_HUNTERFLY",
		"MONSTER_ID_KONTONNO_KILLER_MANTICE",
		"MONSTER_ID_KONTONNO_MANTICE",
		"MONSTER_ID_KONTONNO_POPORING",
		"MONSTER_ID_KONTONNO_SIDEWINDER",
		"MONSTER_ID_KONTONNO_STEMWORM",
		"MONSTER_ID_KONTONNO_GHOSTRING",
		"MONSTER_ID_KONTONNO_ANDREA",
		"MONSTER_ID_KONTONNO_ANES",
		"MONSTER_ID_KONTONNO_CELICIA",
		"MONSTER_ID_KONTONNO_SILVANO",
		"MONSTER_ID_KONTONNO_BAPHOMET",
		"MONSTER_ID_OSENSARETA_RAYDRIC",
		"MONSTER_ID_OSENSARETA_RAYDRIC_A",
		"MONSTER_ID_ICE_GARGOYLE",
		"MONSTER_ID_OSENSARETA_STING",
		"MONSTER_ID_PRISON_BREAKER",
		"MONSTER_ID_ICE_GHOST",
		"MONSTER_ID_FLAME_GHOST",
		"MONSTER_ID_OSENSARETA_SAMAYOUMONO",
		"MONSTER_ID_OSENSARETA_DARK_LORD",
		"MONSTER_ID_OSENSARETA_BURINARANEA",
		"MONSTER_ID_KOKA_BLAZER",
		"MONSTER_ID_KOKA_NIGHTMARE_TERROR",
		"MONSTER_ID_KOKA_S_DELETER",
		"MONSTER_ID_KOKA_G_DELETER",
		"MONSTER_ID_KOKA_EXPLOSION",
		"MONSTER_ID_KOKA_KAHO",
		"MONSTER_ID_KOKA_RARVAGOLEM",
		"MONSTER_ID_KOKA_MUSPERKOLE",
	];

	var idx = 0;
	var idxSP = 0;

	var defName = "";
	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeMonsterSub20200525();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CMonsterDataMaker.RegisterId(\"" + defNameArray[idx] + "\", monsterId);" + "\n";

		reversedText += "monsterData = [" + "\n";

		reversedText += "\t" + "monsterId," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterName(\"" + defData[MONSTER_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterKana(\"" + defData[MONSTER_DATA_INDEX_KANA] + "\")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterLevel(" + defData[MONSTER_DATA_INDEX_LEVEL] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterHp(" + defData[MONSTER_DATA_INDEX_HP] + ")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterStr(" + defData[MONSTER_DATA_INDEX_STR] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterInt(" + defData[MONSTER_DATA_INDEX_INT] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterVit(" + defData[MONSTER_DATA_INDEX_VIT] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterDex(" + defData[MONSTER_DATA_INDEX_DEX] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterAgi(" + defData[MONSTER_DATA_INDEX_AGI] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterLuk(" + defData[MONSTER_DATA_INDEX_LUK] + ")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterAtk(" + defData[MONSTER_DATA_INDEX_ATK] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterMatk(" + defData[MONSTER_DATA_INDEX_MATK] + ")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterRange(" + defData[MONSTER_DATA_INDEX_RANGE] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterDef(" + defData[MONSTER_DATA_INDEX_DEF_DIV] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterMdef(" + defData[MONSTER_DATA_INDEX_MDEF_DIV] + ")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterBaseExp(" + defData[MONSTER_DATA_INDEX_BASE_EXP] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterJobExp(" + defData[MONSTER_DATA_INDEX_JOB_EXP] + ")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterSize(" + defData[MONSTER_DATA_INDEX_SIZE] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterElement(" + defData[MONSTER_DATA_INDEX_ELEMENT] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterRace(" + defData[MONSTER_DATA_INDEX_RACE] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterBossType(" + defData[MONSTER_DATA_INDEX_BOSS_TYPE] + ")," + "\n";
		reversedText += "\t" + "CMonsterDataMaker.MonsterGrassType(" + defData[MONSTER_DATA_INDEX_GRASS_TYPE] + ")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterDataMaker.MonsterDataQualified(" + defData[MONSTER_DATA_INDEX_QUALIFIED] + ")," + "\n";

		reversedText += "];" + "\n";

		reversedText += "MonsterObjOrg[monsterId] = monsterData;" + "\n";
		reversedText += "monsterId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（モンスター用 2020/05/25 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeMonsterSub20200525 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var monsterData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bMonsterId = false;

	var definerArray = null;

	definerArray = new Array();

	// モンスターデータを全走査して、定義用データに変換
	for (idx = 0; idx < MonsterObjNew.length; idx++) {

		monsterData = MonsterObjNew[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < monsterData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case MONSTER_DATA_INDEX_ID:
			case MONSTER_DATA_INDEX_NAME:
			case MONSTER_DATA_INDEX_LEVEL:
			case MONSTER_DATA_INDEX_HP:
			case MONSTER_DATA_INDEX_STR:
			case MONSTER_DATA_INDEX_INT:
			case MONSTER_DATA_INDEX_VIT:
			case MONSTER_DATA_INDEX_DEX:
			case MONSTER_DATA_INDEX_AGI:
			case MONSTER_DATA_INDEX_LUK:
			case MONSTER_DATA_INDEX_ATK:
			case MONSTER_DATA_INDEX_MATK:
			case MONSTER_DATA_INDEX_RANGE:
			case MONSTER_DATA_INDEX_DEF_DIV:
			case MONSTER_DATA_INDEX_MDEF_DIV:
			case MONSTER_DATA_INDEX_BASE_EXP:
			case MONSTER_DATA_INDEX_JOB_EXP:
			case MONSTER_DATA_INDEX_QUALIFIED:
			case MONSTER_DATA_INDEX_KANA:
				defData[idxData] = monsterData[idxData];
				break;

			// サイズ
			case MONSTER_DATA_INDEX_SIZE:
				defData[idxData] = EnumSizeId.GetDefinedName(monsterData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = monsterData[idxData];
				}
				break;

			// 属性
			case MONSTER_DATA_INDEX_ELEMENT:
				defData[idxData] = EnumMonsterElement.GetDefinedName(monsterData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = monsterData[idxData];
				}
				break;

			// 種族
			case MONSTER_DATA_INDEX_RACE:
				defData[idxData] = EnumRaceId.GetDefinedName(monsterData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = monsterData[idxData];
				}
				break;

			// BOSS属性
			case MONSTER_DATA_INDEX_BOSS_TYPE:
				defData[idxData] = EnumMonsterBossType.GetDefinedName(monsterData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = monsterData[idxData];
				}
				break;

			// 草属性
			case MONSTER_DATA_INDEX_GRASS_TYPE:
				defData[idxData] = EnumMonsterGrassType.GetDefinedName(monsterData[idxData]);
				if (defData[idxData] == "") {
					defData[idxData] = monsterData[idxData];
				}
				break;

			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（モンスターグループ用 2020/05/25 版）.
 */
CReverseCoder.GetReverseCodeMonsterGroup20200525 = function () {

	var defNameArray = [
		"MONSTER_GROUP_ID_MANUKU",
		"MONSTER_GROUP_ID_SPRENDED",
		"MONSTER_GROUP_ID_MOROC",
		"MONSTER_GROUP_ID_EIYUENCHANT",
		"MONSTER_GROUP_ID_SEITAI",
		"MONSTER_GROUP_ID_THANATOS",
		"MONSTER_GROUP_ID_CHIKA_HAISUIRO",
		"MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU",
		"MONSTER_GROUP_ID_TOKEITO",
		"MONSTER_GROUP_ID_HEARTHUNTER",
		"MONSTER_GROUP_ID_ROCKRIDGE",
		"MONSTER_GROUP_ID_VERNAR",
		"MONSTER_GROUP_ID_MELORIN",
		"MONSTER_GROUP_ID_PAGE250",
		"MONSTER_GROUP_ID_MAZINDEN",
		"MONSTER_GROUP_ID_SCROLL_STOLE",
		"MONSTER_GROUP_ID_OS_NIZI_SOSAKU",
		"MONSTER_GROUP_ID_MIGEL",
		"MONSTER_GROUP_ID_NOGUE_ROAD_03",
	];

	var idx = 0;
	var idxData = 0;

	var defName = "";
	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = MonsterGroupObj;

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CMonsterGroupDataMaker.RegisterId(\"" + defNameArray[idx] + "\", monsterGroupId);" + "\n";

		reversedText += "monsterGroupData = [" + "\n";

		for (idxData = 0; idxData < defData.length; idxData++) {
			reversedText += "\t" + EnumMonsterId.GetDefinedName(defData[idxData]) + "," + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "MonsterGroupObj[monsterGroupId] = monsterGroupData;" + "\n";
		reversedText += "monsterGroupId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（モンスターマップ用 2020/05/25 版）.
 */
CReverseCoder.GetReverseCodeMonsterMap20200525 = function () {

alert("旧データ呼び出し");

return "";

	var defNameArray = [
		"MONSTERMAP_ID_ALL",
		"MONSTERMAP_ID_PRONTERA",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_00",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_01",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_02",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_03",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_04",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_05",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_06",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_07",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_08",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_09",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_10",
		"MONSTERMAP_ID_PRONTERA_PRONTERA_FIELD_11",
		"MONSTERMAP_ID_PRONTERA_CHIKASUIRO",
		"MONSTERMAP_ID_PRONTERA_CHIKASUIRO_PRONTERA_CHIKASUIRO_B1F",
		"MONSTERMAP_ID_PRONTERA_CHIKASUIRO_PRONTERA_CHIKASUIRO_B2F",
		"MONSTERMAP_ID_PRONTERA_CHIKASUIRO_PRONTERA_CHIKASUIRO_B3F",
		"MONSTERMAP_ID_PRONTERA_CHIKASUIRO_PRONTERA_CHIKASUIRO_B4F",
		"MONSTERMAP_ID_PRONTERA_KITA_MEIKYUNO_MORI",
		"MONSTERMAP_ID_PRONTERA_KITA_MEIKYUNO_MORI_MEIKYUNO_MORI_01",
		"MONSTERMAP_ID_PRONTERA_KITA_MEIKYUNO_MORI_MEIKYUNO_MORI_02",
		"MONSTERMAP_ID_PRONTERA_KITA_MEIKYUNO_MORI_MEIKYUNO_MORI_03",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU_IZULUDE_KAITEI_DOKUTSU_1F",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU_IZULUDE_KAITEI_DOKUTSU_2F",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU_IZULUDE_KAITEI_DOKUTSU_3F",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU_IZULUDE_KAITEI_DOKUTSU_4F",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU_IZULUDE_KAITEI_SHINDEN",
		"MONSTERMAP_ID_IZULUDE_KAITEI_DOKUTSU_IZULUDE_KAITEI_TOSHI",
		"MONSTERMAP_ID_MORROC",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_01",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_02",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_03",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_07",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_11",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_12",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_13",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_16",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_17",
		"MONSTERMAP_ID_MORROC_SOGRATO_SABAKU_18",
		"MONSTERMAP_ID_PYRAMID_DUNGEON",
		"MONSTERMAP_ID_PYRAMID_DUNGEON_PYRAMID_DUNGEON_1F",
		"MONSTERMAP_ID_PYRAMID_DUNGEON_PYRAMID_DUNGEON_2F",
		"MONSTERMAP_ID_PYRAMID_DUNGEON_PYRAMID_DUNGEON_3F",
		"MONSTERMAP_ID_PYRAMID_DUNGEON_PYRAMID_DUNGEON_4F",
		"MONSTERMAP_ID_PYRAMID_DUNGEON_PYRAMID_DUNGEON_B2F",
		"MONSTERMAP_ID_PYRAMID_DUNGEON_PYRAMID_DUNGEON_B3F",
		"MONSTERMAP_ID_SPHINX_DUNGEON",
		"MONSTERMAP_ID_SPHINX_DUNGEON_SPHINX_DUNGEON_B1F",
		"MONSTERMAP_ID_SPHINX_DUNGEON_SPHINX_DUNGEON_B2F",
		"MONSTERMAP_ID_SPHINX_DUNGEON_SPHINX_DUNGEON_B3F",
		"MONSTERMAP_ID_SPHINX_DUNGEON_SPHINX_DUNGEON_B4F",
		"MONSTERMAP_ID_SPHINX_DUNGEON_SPHINX_DUNGEON_B5F",
		"MONSTERMAP_ID_ARIZIGOKU",
		"MONSTERMAP_ID_ARIZIGOKU_ARIZIGOKU_B1F",
		"MONSTERMAP_ID_ARIZIGOKU_ARIZIGOKU_B2F",
		"MONSTERMAP_ID_GEFFEN",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_00",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_01",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_02",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_03",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_04",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_05",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_06",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_07",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_08",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_09",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_10",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_11",
		"MONSTERMAP_ID_GEFFEN_GEFFEN_FIELD_13",
		"MONSTERMAP_ID_GEFFEN_CHIKA_DUNGEON",
		"MONSTERMAP_ID_GEFFEN_CHIKA_DUNGEON_GEFFEN_CHIKA_DUNGEON_B1F",
		"MONSTERMAP_ID_GEFFEN_CHIKA_DUNGEON_GEFFEN_CHIKA_DUNGEON_B2F",
		"MONSTERMAP_ID_GEFFEN_CHIKA_DUNGEON_GEFFEN_CHIKA_DUNGEON_B3F",
		"MONSTERMAP_ID_GEFFENIA",
		"MONSTERMAP_ID_GEFFENIA_GEFFENIA_01",
		"MONSTERMAP_ID_GEFFENIA_GEFFENIA_02",
		"MONSTERMAP_ID_GEFFENIA_GEFFENIA_03",
		"MONSTERMAP_ID_GEFFENIA_GEFFENIA_04",
		"MONSTERMAP_ID_OAK_CHIKA_DOKUTSU",
		"MONSTERMAP_ID_OAK_CHIKA_DOKUTSU_OAK_CHIKA_DOKUTSU_01",
		"MONSTERMAP_ID_OAK_CHIKA_DOKUTSU_OAK_CHIKA_DOKUTSU_02",
		"MONSTERMAP_ID_GLASTHEIM_ZYOSO",
		"MONSTERMAP_ID_GLASTHEIM_KASO",
		"MONSTERMAP_ID_GLASTHEIM_SHITSUNAI",
		"MONSTERMAP_ID_GLASTHEIM_KISHIDAN_01",
		"MONSTERMAP_ID_GLASTHEIM_KISHIDAN_02",
		"MONSTERMAP_ID_GLASTHEIM_KAIDAN",
		"MONSTERMAP_ID_GLASTHEIM_SHUDOIN",
		"MONSTERMAP_ID_GLASTHEIM_KATAKOMBE",
		"MONSTERMAP_ID_GLASTHEIM_KOZYO",
		"MONSTERMAP_ID_GLASTHEIM_KOZYO_1F",
		"MONSTERMAP_ID_GLASTHEIM_KOZYO_2F",
		"MONSTERMAP_ID_GLASTHEIM_CHIKAKANNGOKU_00",
		"MONSTERMAP_ID_GLASTHEIM_CHIKAKANNGOKU_01",
		"MONSTERMAP_ID_GLASTHEIM_CHIKASUIRO_01",
		"MONSTERMAP_ID_GLASTHEIM_CHIKASUIRO_02",
		"MONSTERMAP_ID_GLASTHEIM_CHIKASUIRO_03",
		"MONSTERMAP_ID_GLASTHEIM_CHIKASUIRO_04",
		"MONSTERMAP_ID_GLASTHEIM_SAIKASO_01",
		"MONSTERMAP_ID_GLASTHEIM_SAIKASO_02",
		"MONSTERMAP_ID_PHEIYON",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_01",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_02",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_03",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_04",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_06",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_07",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_08",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_09",
		"MONSTERMAP_ID_PHEIYON_PHEIYON_MAYOINO_MORI_10",
		"MONSTERMAP_ID_PHEIYON_CHIKA_DOKUTSU",
		"MONSTERMAP_ID_PHEIYON_CHIKA_DOKUTSU_PHEIYON_CHIKA_DOKUTSU_B1F",
		"MONSTERMAP_ID_PHEIYON_CHIKA_DOKUTSU_PHEIYON_CHIKA_DOKUTSU_B2F",
		"MONSTERMAP_ID_PHEIYON_CHIKA_DOKUTSU_PHEIYON_CHIKA_DOKUTSU_B3F",
		"MONSTERMAP_ID_PHEIYON_CHIKA_DOKUTSU_PHEIYON_CHIKA_DOKUTSU_B4F",
		"MONSTERMAP_ID_PHEIYON_CHIKA_DOKUTSU_PHEIYON_CHIKA_DOKUTSU_B5F",
		"MONSTERMAP_ID_CHINBOTSUSEN",
		"MONSTERMAP_ID_CHINBOTSUSEN_CHINBOTSUSEN_1F",
		"MONSTERMAP_ID_CHINBOTSUSEN_CHINBOTSUSEN_2F",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_01",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_02",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_03",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_04",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_05",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_06",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_07",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_08",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_09",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_10",
		"MONSTERMAP_ID_MJOLLNIR_SANMYAKU_MJOLLNIR_SANMYAKU_11",
		"MONSTERMAP_ID_MJOLLNIR_HAIKO",
		"MONSTERMAP_ID_MJOLLNIR_HAIKO_MJOLLNIR_HAIKO_B1F",
		"MONSTERMAP_ID_MJOLLNIR_HAIKO_MJOLLNIR_HAIKO_B2F",
		"MONSTERMAP_ID_MJOLLNIR_HAIKO_MJOLLNIR_HAIKO_B3F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIZYO_1F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIZYO_2F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIZYO_3F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIZYO_4F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIKA_1F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIKA_2F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIKA_3F",
		"MONSTERMAP_ID_TOKEITO_DUNGEON_TOKEITO_DUNGEON_CHIKA_4F",
		"MONSTERMAP_ID_RUTIE",
		"MONSTERMAP_ID_RUTIE_RUTIE_FIELD_01",
		"MONSTERMAP_ID_OMOCHA_KOZYO",
		"MONSTERMAP_ID_OMOCHA_KOZYO_OMOCHA_KOZYO_1F",
		"MONSTERMAP_ID_OMOCHA_KOZYO_OMOCHA_KOZYO_2F",
		"MONSTERMAP_ID_COMODO",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_01",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_02",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_03",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_04",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_06",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_07",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_08",
		"MONSTERMAP_ID_COMODO_COMODO_FIELD_09",
		"MONSTERMAP_ID_COMODO_COMODO_DOKUTSU_NISHI",
		"MONSTERMAP_ID_COMODO_COMODO_DOKUTSU_KITA",
		"MONSTERMAP_ID_COMODO_COMODO_DOKUTSU_HIGASHI",
		"MONSTERMAP_ID_UMBARA",
		"MONSTERMAP_ID_UMBARA_UMBARA_FIELD_01",
		"MONSTERMAP_ID_UMBARA_UMBARA_FIELD_02",
		"MONSTERMAP_ID_UMBARA_UMBARA_FIELD_03",
		"MONSTERMAP_ID_UMBARA_UMBARA_FIELD_04",
		"MONSTERMAP_ID_UMBARA_DUNGEON",
		"MONSTERMAP_ID_NIFLEHEIMR",
		"MONSTERMAP_ID_NIFLEHEIMR_HIKYONO_MURA",
		"MONSTERMAP_ID_NIFLEHEIMR_GYORU_KEIKOKU",
		"MONSTERMAP_ID_NIFLEHEIMR_NIFLEHEIMRNO_MACHI",
		"MONSTERMAP_ID_GUILD_DUNGEON_PHEIYON",
		"MONSTERMAP_ID_GUILD_DUNGEON_ALDEBARAN",
		"MONSTERMAP_ID_GUILD_DUNGEON_PRONTERA",
		"MONSTERMAP_ID_GUILD_DUNGEON_GEFFEN",
		"MONSTERMAP_ID_TURTLE_ISLAND",
		"MONSTERMAP_ID_TURTLE_ISLAND_CHIZYO",
		"MONSTERMAP_ID_TURTLE_ISLAND_DUNGEON_01",
		"MONSTERMAP_ID_TURTLE_ISLAND_DUNGEON_02",
		"MONSTERMAP_ID_TURTLE_ISLAND_DUNGEON_03",
		"MONSTERMAP_ID_AMATSU",
		"MONSTERMAP_ID_AMATSU_AMATSU_FIELD_01",
		"MONSTERMAP_ID_AMATSU_AMATSU_DUNGEON_01",
		"MONSTERMAP_ID_AMATSU_AMATSU_DUNGEON_02",
		"MONSTERMAP_ID_AMATSU_AMATSU_DUNGEON_03",
		"MONSTERMAP_ID_KONRON",
		"MONSTERMAP_ID_KONRON_KONRON_FIELD_01",
		"MONSTERMAP_ID_KONRON_KONRON_DUNGEON_01",
		"MONSTERMAP_ID_KONRON_KONRON_DUNGEON_02",
		"MONSTERMAP_ID_KONRON_KONRON_DUNGEON_03",
		"MONSTERMAP_ID_RYUNO_ZYO",
		"MONSTERMAP_ID_RYUNO_ZYO_RYUNO_ZYO_FIELD_01",
		"MONSTERMAP_ID_RYUNO_ZYO_RYUNO_ZYO_DUNGEON_01",
		"MONSTERMAP_ID_RYUNO_ZYO_RYUNO_ZYO_DUNGEON_02",
		"MONSTERMAP_ID_RYUNO_ZYO_RYUNO_ZYO_DUNGEON_03",
		"MONSTERMAP_ID_AYUTAYA",
		"MONSTERMAP_ID_AYUTAYA_AYUTAYA_FIELD_01",
		"MONSTERMAP_ID_AYUTAYA_AYUTAYA_FIELD_02",
		"MONSTERMAP_ID_AYUTAYA_AYUTAYA_DUNGEON_01",
		"MONSTERMAP_ID_AYUTAYA_AYUTAYA_DUNGEON_02",
		"MONSTERMAP_ID_JUNO",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_01",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_02",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_03",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_04",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_06",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_07",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_08",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_09",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_11",
		"MONSTERMAP_ID_JUNO_JUNO_FIELD_12",
		"MONSTERMAP_ID_NOGUE_ROAD",
		"MONSTERMAP_ID_NOGUE_ROAD_NOGUE_ROAD_01",
		"MONSTERMAP_ID_NOGUE_ROAD_NOGUE_ROAD_02",
		"MONSTERMAP_ID_KIKAININGYO_KOZYO",
		"MONSTERMAP_ID_KIKAININGYO_KOZYO_KIKAININGYO_KOZYO_B1F",
		"MONSTERMAP_ID_KIKAININGYO_KOZYO_KIKAININGYO_KOZYO_B2F",
		"MONSTERMAP_ID_EINBLOCK",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_03",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_04",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_05",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_06",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_07",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_08",
		"MONSTERMAP_ID_EINBLOCK_EINBLOCK_FIELD_09",
		"MONSTERMAP_ID_EINBLOCK_KOZAN",
		"MONSTERMAP_ID_EINBLOCK_KOZAN_EINBLOCK_KOZAN_01",
		"MONSTERMAP_ID_EINBLOCK_KOZAN_EINBLOCK_KOZAN_02",
		"MONSTERMAP_ID_LIHITALZEN",
		"MONSTERMAP_ID_LIHITALZEN_LIHITALZEN_FIELD_01",
		"MONSTERMAP_ID_LIHITALZEN_LIHITALZEN_FIELD_02",
		"MONSTERMAP_ID_LIHITALZEN_LIHITALZEN_FIELD_03",
		"MONSTERMAP_ID_SEITAI_KOGAKU_KENKYUZYO",
		"MONSTERMAP_ID_SEITAI_KOGAKU_KENKYUZYO_SEITAI_KOGAKU_KENKYUZYO_01",
		"MONSTERMAP_ID_SEITAI_KOGAKU_KENKYUZYO_SEITAI_KOGAKU_KENKYUZYO_02",
		"MONSTERMAP_ID_SEITAI_KOGAKU_KENKYUZYO_SEITAI_KOGAKU_KENKYUZYO_03",
		"MONSTERMAP_ID_SEITAI_KOGAKU_KENKYUZYO_SEITAI_KOGAKU_KENKYUZYO_04",
		"MONSTERMAP_ID_KINKINO_KENKYUZYO",
		"MONSTERMAP_ID_JUPIROS_DUNGEON",
		"MONSTERMAP_ID_JUPIROS_DUNGEON_JUPIROS_HAIKYO_01",
		"MONSTERMAP_ID_JUPIROS_DUNGEON_JUPIROS_HAIKYO_02",
		"MONSTERMAP_ID_JUPIROS_DUNGEON_JUPIROS_CHUSHINBU",
		"MONSTERMAP_ID_FIGGEL",
		"MONSTERMAP_ID_FIGGEL_FIGGEL_FIELD_01",
		"MONSTERMAP_ID_FIGGEL_FIGGEL_FIELD_02",
		"MONSTERMAP_ID_FIGGEL_FIGGEL_FIELD_04",
		"MONSTERMAP_ID_FIGGEL_FIGGEL_FIELD_05",
		"MONSTERMAP_ID_FIGGEL_FIGGEL_FIELD_06",
		"MONSTERMAP_ID_ABYSSLAKE_CHIKA_DOKUTSU",
		"MONSTERMAP_ID_ABYSSLAKE_CHIKA_DOKUTSU_ABYSSLAKE_CHIKA_DOKUTSU_01",
		"MONSTERMAP_ID_ABYSSLAKE_CHIKA_DOKUTSU_ABYSSLAKE_CHIKA_DOKUTSU_02",
		"MONSTERMAP_ID_ABYSSLAKE_CHIKA_DOKUTSU_ABYSSLAKE_CHIKA_DOKUTSU_03",
		"MONSTERMAP_ID_THANATOS_TOWER",
		"MONSTERMAP_ID_THANATOS_TOWER_KASOBU_01",
		"MONSTERMAP_ID_THANATOS_TOWER_KASOBU_02",
		"MONSTERMAP_ID_THANATOS_TOWER_KASOBU_03",
		"MONSTERMAP_ID_THANATOS_TOWER_KASOBU_04",
		"MONSTERMAP_ID_THANATOS_TOWER_KASOBU_05",
		"MONSTERMAP_ID_THANATOS_TOWER_KASOBU_06",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_07",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_08",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_09",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_10",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_11",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_12",
		"MONSTERMAP_ID_THANATOS_TOWER_ZYOSOBU_13",
		"MONSTERMAP_ID_ODIN_SHINDEN",
		"MONSTERMAP_ID_ODIN_SHINDEN_ODIN_SHINDEN_01",
		"MONSTERMAP_ID_ODIN_SHINDEN_ODIN_SHINDEN_02",
		"MONSTERMAP_ID_ODIN_SHINDEN_ODIN_SHINDEN_03",
		"MONSTERMAP_ID_RAHEL",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_01",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_03",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_04",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_05",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_06",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_08",
		"MONSTERMAP_ID_RAHEL_RAHEL_FIELD_12",
		"MONSTERMAP_ID_FREYA_DAISHINDEN",
		"MONSTERMAP_ID_FREYA_DAISHINDEN_SEIIKI_01",
		"MONSTERMAP_ID_FREYA_DAISHINDEN_SEIIKI_02",
		"MONSTERMAP_ID_FREYA_DAISHINDEN_SEIIKI_03",
		"MONSTERMAP_ID_FREYA_DAISHINDEN_SEIIKI_04",
		"MONSTERMAP_ID_FREYA_DAISHINDEN_SEIIKI_05",
		"MONSTERMAP_ID_KORINO_DOKUTSU",
		"MONSTERMAP_ID_KORINO_DOKUTSU_KORINO_DOKUTSU_01",
		"MONSTERMAP_ID_KORINO_DOKUTSU_KORINO_DOKUTSU_02",
		"MONSTERMAP_ID_KORINO_DOKUTSU_KORINO_DOKUTSU_03",
		"MONSTERMAP_ID_BEINS",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_01",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_02",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_03",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_04",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_05",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_06",
		"MONSTERMAP_ID_BEINS_BEINS_FIELD_07",
		"MONSTERMAP_ID_THOR_KAZAN",
		"MONSTERMAP_ID_THOR_KAZAN_THOR_KAZAN_01",
		"MONSTERMAP_ID_THOR_KAZAN_THOR_KAZAN_02",
		"MONSTERMAP_ID_THOR_KAZAN_THOR_KAZAN_03",
		"MONSTERMAP_ID_NAMONAKI_SHIMA",
		"MONSTERMAP_ID_NAMONAKI_SHIMA_NAMONAKI_SHIMA_YORU",
		"MONSTERMAP_ID_NAMONAKI_SHIMA_SHUDOIN_01",
		"MONSTERMAP_ID_NAMONAKI_SHIMA_SHUDOIN_02",
		"MONSTERMAP_ID_NAMONAKI_SHIMA_SHUDOIN_03",
		"MONSTERMAP_ID_MOSCOBIA",
		"MONSTERMAP_ID_MOSCOBIA_MOSCOBIA_FIELD",
		"MONSTERMAP_ID_MOSCOBIA_MORI",
		"MONSTERMAP_ID_MOSCOBIA_FUKAI_MORI",
		"MONSTERMAP_ID_MOSCOBIA_OKUFUKAI_MORI",
		"MONSTERMAP_ID_ZIGENNO_HAZAMA",
		"MONSTERMAP_ID_ZIGENNO_HAZAMA_ZIGENNO_HAZAMA_03",
		"MONSTERMAP_ID_ZIGENNO_HAZAMA_ZIGENNO_HAZAMA_03",
		"MONSTERMAP_ID_GUILD_DUNGEON_SHBALZBALD",
		"MONSTERMAP_ID_GUILD_DUNGEON_ALNABELTZ",
		"MONSTERMAP_ID_ENDLESS_TOWER",
		"MONSTERMAP_ID_SPRENDID",
		"MONSTERMAP_ID_SPRENDID_SPRENDID_FIELD_01",
		"MONSTERMAP_ID_SPRENDID_SPRENDID_FIELD_02",
		"MONSTERMAP_ID_SPRENDID_SPRENDID_FIELD_03",
		"MONSTERMAP_ID_MANUKU",
		"MONSTERMAP_ID_MANUKU_MANUKU_FIELD_01",
		"MONSTERMAP_ID_MANUKU_MANUKU_FIELD_02",
		"MONSTERMAP_ID_MANUKU_MANUKU_FIELD_03",
		"MONSTERMAP_ID_CAMIDAL_CHIHO",
		"MONSTERMAP_ID_CAMIDAL_CHIHO_CAMIDAL_TUNNEL",
		"MONSTERMAP_ID_CAMIDAL_CHIHO_CAMIDAL_SANROKU_01",
		"MONSTERMAP_ID_CAMIDAL_CHIHO_CAMIDAL_SANROKU_02",
		"MONSTERMAP_ID_YGGDRASSIL_CHUSHINBU",
		"MONSTERMAP_ID_NEEDSHEGNO_SU",
		"MONSTERMAP_ID_BRAZILIS",
		"MONSTERMAP_ID_BRAZILIS_BRAZILIS_FIELD_01",
		"MONSTERMAP_ID_BRAZILIS_TAKINO_NAKANO_DOKUTSU",
		"MONSTERMAP_ID_BRAZILIS_TAKINO_NAKANO_DOKUTSU",
		"MONSTERMAP_ID_OAKNO_KIOKU",
		"MONSTERMAP_ID_SCALABA",
		"MONSTERMAP_ID_SCALABA_SCALABA_HOLE",
		"MONSTERMAP_ID_SCALABA_SCALABA_GARDEN",
		"MONSTERMAP_ID_DEWATA",
		"MONSTERMAP_ID_DEWATA_DEWATA_FIELD_01",
		"MONSTERMAP_ID_DEWATA_DEWATA_FIELD_01",
		"MONSTERMAP_ID_DEWATA_ISUTANA_DOKUTSU",
		"MONSTERMAP_ID_BIFLOST",
		"MONSTERMAP_ID_BIFLOST_NANBU",
		"MONSTERMAP_ID_BIFLOST_HOKUBU",
		"MONSTERMAP_ID_KIRINO_MORI",
		"MONSTERMAP_ID_MARAN_TO",
		"MONSTERMAP_ID_MARAN_TO_HOSHIAKARINO_SANGOSHO",
		"MONSTERMAP_ID_BOKUTSUONO_DOKUTSU",
		"MONSTERMAP_ID_CHIKMAHAISUIRO",
		"MONSTERMAP_ID_CHIKMAHAISUIRO_BEGINER",
		"MONSTERMAP_ID_CHIKMAHAISUIRO_EXPERT",
		"MONSTERMAP_ID_PORT_MARAYA",
		"MONSTERMAP_ID_PORT_MARAYA_BARIO_MAHIWAGA",
		"MONSTERMAP_ID_PORT_MARAYA_BARIO_FOREST",
		"MONSTERMAP_ID_PORT_MARAYA_BUWAYANO_DOKUTSU",
		"MONSTERMAP_ID_BUWAYANO_SU",
		"MONSTERMAP_ID_BAKONAWANO_SUMIKA",
		"MONSTERMAP_ID_BYONUNGO_BYOIN",
		"MONSTERMAP_ID_BYONUNGO_BYOIN_1F",
		"MONSTERMAP_ID_BYONUNGO_BYOIN_2F",
		"MONSTERMAP_ID_YAMINO_BYONUNGO_BYOIN_2F",
		"MONSTERMAP_ID_GUILD_DUNGEON_KOZYOSEN_TE",
		"MONSTERMAP_ID_GLASTHEIM_MEMORIAL_DUNGEON",
		"MONSTERMAP_ID_AKUMUNO_GLASTHEIM_KATAKOMBE",
		"MONSTERMAP_ID_AKUMUNO_GLASTHEIM_KATAKOMBE",
		"MONSTERMAP_ID_AKUMUNO_GLASTHEIM_KOZYO_2F",
		"MONSTERMAP_ID_EKLAGE",
		"MONSTERMAP_ID_EKLAGE_HANAGA_SAKIHAZIMETA_DAICHI",
		"MONSTERMAP_ID_EKLAGE_BIFLOST_TOWER_1F",
		"MONSTERMAP_ID_EKLAGE_BIFLOST_TOWER_2F",
		"MONSTERMAP_ID_EKLAGE_BIFLOST_TOWER_3F",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_SARANO_KIOKU",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_FACEWORM",
		"MONSTERMAP_ID_HORROR_OMOCHA_KOZYO",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_GEFFEN_MAHO_TAIKAI",
		"MONSTERMAP_ID_TOKEITO_NIGHTMARE",
		"MONSTERMAP_ID_TOKEITO_NIGHTMARE_CHIZYO_1F",
		"MONSTERMAP_ID_TOKEITO_NIGHTMARE_CHIZYO_2F",
		"MONSTERMAP_ID_TOKEITO_NIGHTMARE_CHIZYO_3F",
		"MONSTERMAP_ID_TOKEITO_NIGHTMARE_CHIZYO_4F",
		"MONSTERMAP_ID_FLAME_VALLEY",
		"MONSTERMAP_ID_BIOSNO_SHIMA",
		"MONSTERMAP_ID_BIOSNO_SHIMA",
		"MONSTERMAP_ID_MORSNO_SHIMA",
		"MONSTERMAP_ID_MAZINDEN",
		"MONSTERMAP_ID_AKUMUNO_ZITTER_BUG",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_MASHINNO_TO",
		"MONSTERMAP_ID_VERUS",
		"MONSTERMAP_ID_VERUS_JUPIROS_HIGASHIGAWA",
		"MONSTERMAP_ID_VERUS_VERUS_GAIKAKU_TUNNEL",
		"MONSTERMAP_ID_VERUS_VERUS_CHUO_HIROBA",
		"MONSTERMAP_ID_VERUS_KENKYUTO_WISH",
		"MONSTERMAP_ID_VERUS_ZIKKENNTO_OPTATIO",
		"MONSTERMAP_ID_VERUS_CHIKA_SHELLTER",
		"MONSTERMAP_ID_SAIGONO_HEYA",
		"MONSTERMAP_ID_CHALSTON_KOZYO",
		"MONSTERMAP_ID_PYRAMID_NIGHTMARE",
		"MONSTERMAP_ID_PYRAMID_NIGHTMARE_HIMITSUNO_CHIKASHITSU_01",
		"MONSTERMAP_ID_PYRAMID_NIGHTMARE_HIMITSUNO_CHIKASHITSU_02",
		"MONSTERMAP_ID_DIMENSION_DIVER_2015",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_FENRIRTO_SARA",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_HIKOSEN_SHUGEKI",
		"MONSTERMAP_ID_EIYUNO_KONSEKI_NOROINO_KENSHI",
		"MONSTERMAP_ID_SENSHISHANO_HAKA",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_TEIEN",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_SAISHIZYO",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_KAIRO",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_KYUSHIGAICHI",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_HYOSO_TEIEN",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_HYOSO_KAIRO",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_SHINRIN",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_KEIKOKU",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_SOGEN",
		"MONSTERMAP_ID_SHINNENNNO_KAIRO_DOKUTSU",
		"MONSTERMAP_ID_GLASTHEIM_MEMORIAL_HARD",
		"MONSTERMAP_ID_PRONTERA_CHIKAKANNGOKU",
		"MONSTERMAP_ID_SHINKOSARETA_PRONTERA",
		"MONSTERMAP_ID_PRONTERA_KUCHUYOSAI",
		"MONSTERMAP_ID_KAKONO_GISHIKINO_MA",
		"MONSTERMAP_ID_HEARTHUNTER_GUNZIKICHI",
		"MONSTERMAP_ID_VERNAR_KENKYUZYO",
		"MONSTERMAP_ID_VERNAR_KENKYUZYO_ABTO",
		"MONSTERMAP_ID_VERNAR_KENKYUZYO_CDTO",
		"MONSTERMAP_ID_VERNAR_KENKYUZYO_CHUOSHITSU",
		"MONSTERMAP_ID_ROCKRIDGE",
		"MONSTERMAP_ID_ROCKRIDGE_KIWAWA_SABAKU_01",
		"MONSTERMAP_ID_ROCKRIDGE_KIWAWA_SABAKU_02",
		"MONSTERMAP_ID_ROCKRIDGE_KOZAN",
		"MONSTERMAP_ID_ROCKRIDGE_CHIKAGAI",
		"MONSTERMAP_ID_EIGONO_IKUSA",
		"MONSTERMAP_ID_EIGONO_IKUSA_SHOKYU",
		"MONSTERMAP_ID_EIGONO_IKUSA_CHUKYU",
		"MONSTERMAP_ID_EIGONO_IKUSA_ZYOKYU",
		"MONSTERMAP_ID_KUNRENNO_MA",
		"MONSTERMAP_ID_RABIOL",
		"MONSTERMAP_ID_RABIOL_RABIOL_HEIGEN_01",
		"MONSTERMAP_ID_RABIOL_RABIOL_MORI_01",
		"MONSTERMAP_ID_RYUNOSU",
		"MONSTERMAP_ID_RYUNOSU_RYUNOSU_01",
		"MONSTERMAP_ID_RYUNOSU_RYUNOSU_02",
		"MONSTERMAP_ID_RYUNOSU_RYUNOSU_03",
		"MONSTERMAP_ID_ILLUSION_OF_MOONLIGHT",
		"MONSTERMAP_ID_ILLUSION_OF_MOONLIGHT",
		"MONSTERMAP_ID_ILLUSION_OF_MOONLIGHT",
		"MONSTERMAP_ID_ILLUSION_OF_KUYOKYU",
		"MONSTERMAP_ID_ILLUSION_OF_KUYOKYU_KANASHIMINO_YOKYOMURA",
		"MONSTERMAP_ID_RYUNOSU_RYUNOSU_02",
		"MONSTERMAP_ID_ILLUSION_OF_TEDY_BEAR",
		"MONSTERMAP_ID_ILLUSION_OF_RUWANDA",
		"MONSTERMAP_ID_SEITAIKOGAKUKENKYUSHONO_KIROKU_KAIWA_MODE",
		"MONSTERMAP_ID_SEITAIKOGAKUKENKYUSHONO_KIROKU_SENTO_MODE",
		"MONSTERMAP_ID_TOKUSHU_KEIKAI_CHIKI_OS",
		"MONSTERMAP_ID_HAIKIZYO_RUDOUS",
		"MONSTERMAP_ID_HAIKIZYO_RUDOUS_1F",
		"MONSTERMAP_ID_HAIKIZYO_RUDOUS_2F",
		"MONSTERMAP_ID_HAIKIZYO_RUDOUS_3F",
		"MONSTERMAP_ID_KOR_MEMORIAL",
		"MONSTERMAP_ID_OS_NIZISOSAKU",
		"MONSTERMAP_ID_ILUSION_QUEST",
		"MONSTERMAP_ID_ILLUSION_OF_LABYRINTH",
		"MONSTERMAP_ID_GLASTHEIM_ABYSS",
		"MONSTERMAP_ID_NOGUE_ROAD_03",
		"MONSTERMAP_ID_BOSS_ZOKUSEI",
		"MONSTERMAP_ID_MVP_BOSS",
	];

	var idx = 0;
	var idxData = 0;

	var defName = "";
	var defData = null;
	var definerArray = null;

	var monsterId = 0;
	var monsterIdLeader = 0;
	var monsterIdFollower = 0;
	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodeMonsterMapSub20200525();

	definerArray.sort(
		function(a, b) {
			if (a[MONSTERMAP_DATA_INDEX_ID] < b[MONSTERMAP_DATA_INDEX_ID]) return -1;
			if (a[MONSTERMAP_DATA_INDEX_ID] > b[MONSTERMAP_DATA_INDEX_ID]) return 1;
			return 0;
		}
	);

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CMonsterMapDataMaker.RegisterId(\"" + defNameArray[idx] + "\", monsterMapId);" + "\n";

		reversedText += "monsterMapData = [" + "\n";

		reversedText += "\t" + "monsterMapId," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterMapDataMaker.MonsterMapName(\"" + defData[MONSTERMAP_DATA_INDEX_NAME] + "\")," + "\n";
		reversedText += "\t" + "CMonsterMapDataMaker.MonsterMapKana(\"" + defData[MONSTERMAP_DATA_INDEX_KANA] + "\")," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "CMonsterMapDataMaker.MonsterMapParent(MONSTERMAP_ID_PARENT_TOP)," + "\n";

		reversedText += "\n";

		reversedText += "\t" + "[" + "\n";

		for (idxData = 0; idxData < defData[MONSTERMAP_DATA_INDEX_MONSTERS].length; idxData++) {

			monsterId = defData[MONSTERMAP_DATA_INDEX_MONSTERS][idxData];

			if (monsterId > MONSTER_LEADER_OFFSET) {
				monsterIdLeader = Math.floor(monsterId / MONSTER_LEADER_OFFSET) - 1;
				monsterIdFollower = monsterId % MONSTER_LEADER_OFFSET;
				reversedText += "\t\t" + "SetLeaderAndFollower(" + EnumMonsterId.GetDefinedName(monsterIdLeader) + ", " + EnumMonsterId.GetDefinedName(monsterIdFollower) + ")," + "\n";
			}
			else {
				reversedText += "\t\t" + EnumMonsterId.GetDefinedName(monsterId) + "," + "\n";
			}
		}

		reversedText += "\t" + "]," + "\n";

		reversedText += "];" + "\n";

		reversedText += "MonsterMapOBJ[monsterMapId] = monsterMapData;" + "\n";
		reversedText += "monsterMapId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（モンスターマップ用 2020/05/25 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodeMonsterMapSub20200525 = function () {

	var idx = 0;
	var idxData = 0;
	var idxSpId = 0;

	var monsterMapData = null;
	var defData = null;
	var spid = 0;
	var isolatedSpIdArray = null;
	var spiddef = "";
	var bMonsterMapId = false;

	var definerArray = null;

	definerArray = new Array();

	// モンスターマップデータを全走査して、定義用データに変換
	for (idx = 0; idx < MonsterMapOBJ.length; idx++) {

		monsterMapData = MonsterMapOBJ[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < monsterMapData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case MONSTERMAP_DATA_INDEX_ID:
			case MONSTERMAP_DATA_INDEX_KANA:
			case MONSTERMAP_DATA_INDEX_MONSTERS:
				defData[idxData] = monsterMapData[idxData];
				break;

			// 名称
			case MONSTERMAP_DATA_INDEX_NAME:
				defData[idxData] = monsterMapData[idxData].replace("【", "").replace("】", "").replace(/^　・/, "");
				break;

			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（カード整列データ用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeCardSortData20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var cardSortData = null;

	var reversedText = "";

	for (idx = 0; idx < CardSortOBJ.length; idx++) {

		cardSortData = CardSortOBJ[idx];

		reversedText += "cardSortData = [" + "\n";

		for (idxData = 0; idxData < cardSortData.length; idxData++) {

			// NULL 記述は削除する
			if (cardSortData[idxData] == "NULL") {
				continue;
			}

			reversedText += "\t" + EnumCardId.GetDefinedName(cardSortData[idxData]) + "," + "\n";
		}

		reversedText += "];" + "\n";

		reversedText += "CardSortOBJ.push(cardSortData);" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（時限アイテム整列データ用 2020/05/10 版）.
 */
CReverseCoder.GetReverseCodeTimeItemSortData20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var timeItemSortData = null;

	var reversedText = "";

	reversedText += "ITEM_SP_TIME_OBJ_SORT = [" + "\n";

	for (idx = 0; idx < ITEM_SP_TIME_OBJ_SORT.length; idx++) {
		reversedText += "\t" + EnumTimeItemId.GetDefinedName(ITEM_SP_TIME_OBJ_SORT[idx]) + "," + "\n";
	}

	reversedText += "];" + "\n";

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を定義に逆変換する（ペット用 2020/09/09 版）.
 */
CReverseCoder.GetReverseCodePet20200909 = function () {

	var idx = 0;
	var idxSP = 0;

	var defData = null;
	var definerArray = null;

	var reversedText = "";

	definerArray = CReverseCoder.GetReverseCodePetSub20200909();

	for (idx = 0; idx < definerArray.length; idx++) {

		defData = definerArray[idx];

		reversedText += "CPetDataMaker.RegisterId(\"" + defData[0] + "\", petId);" + "\n";

		reversedText += "petData = [" + "\n";

		reversedText += "\t" + "petId," + "\n";
		reversedText += "\t" + "CPetDataMaker.PetName(\"" + defData[1] + "\")," + "\n";
		reversedText += "\t" + "CPetDataMaker.PetKana(\"\")," + "\n";
		reversedText += "\t" + "CPetDataMaker.PetDetail(\"\")," + "\n";

		for (idxSP = 3; (idxSP + 2) < defData.length; idxSP += 2) {

			// セット定義は出力しない
			if (defData[idxSP] == ITEM_SP_SET_DEFINITION) {
				continue;
			}

			reversedText += "\t" + defData[idxSP] + ", " + defData[idxSP + 1] + "," + "\n";
		}

		reversedText += "\t" + "ITEM_SP_END" + "\n";

		reversedText += "];" + "\n";

		reversedText += "PET_OBJ[petId] = petData;" + "\n";
		reversedText += "petId++;" + "\n";

		reversedText += "\n";
		reversedText += "\n";
		reversedText += "\n";
	}

	return reversedText;
};



/**
 * 定義済みデータ定義用配列を取得する（ペット用 2020/09/09 版）.
 * @return データ定義用配列
 */
CReverseCoder.GetReverseCodePetSub20200909 = function () {

	var idx = 0;
	var idxData = 0;

	var petData = null;
	var defData = null;

	var definerArray = null;

	definerArray = new Array();

	// ペットデータを全走査して、定義用データに変換
	for (idx = 0; idx < PET_OBJ.length; idx++) {

		petData = PET_OBJ[idx];

		defData = new Array();

		// データ変換
		for (idxData = 0; idxData < petData.length; idxData++) {

			switch (idxData) {

			// 変換無しのデータ
			case 1:
			case 2:
				defData[idxData] = petData[idxData];
				break;

			// ペットＩＤ
			case 0:
				defData[idxData] = "PET_ID_" + idx;
				break;

			// SP 定義領域
			default:

				// SPID は変換する
				if (((idxData - 3) % 2) == 0) {
					defData[idxData] = CReverseCoder.GetReverseCodeSpId20200509(petData[idxData]);
				}

				// SPID 以外は変換しない
				else {
					defData[idxData] = petData[idxData];
				}

				break;
			}
		}

		// 定義データ配列に追加
		definerArray.push(defData);
	}

	return definerArray;
};



/**
 * SPID の適格性を検査する.
 */
CReverseCoder.CheckSpIdValidity20200509 = function () {

	var idx = 0;
	var idxSpId = 0;

	var itemData = null;
	var cardData = null;

	var errorText = "";

	// 全アイテムについて検査
	for (idx = 0; idx < ItemObjNew.length; idx++) {

		itemData = ItemObjNew[idx];

		for (idxSpId = ITEM_DATA_INDEX_SPBEGIN; idxSpId < itemData.length; idxSpId += 2) {

			if (CReverseCoder.CheckSpIdValiditySub20200509(itemData[idxSpId]) >= 0) {
				continue;
			}

			errorText += "Item : " + itemData[ITEM_DATA_INDEX_NAME] + " (idx == " + idx + ")" + "\n";
		}
	}

	// 全カードについて検査
	for (idx = 0; idx < CardObjNew.length; idx++) {

		cardData = CardObjNew[idx];

		for (idxSpId = CARD_DATA_INDEX_SPBEGIN; idxSpId < cardData.length; idxSpId += 2) {

			if (CReverseCoder.CheckSpIdValiditySub20200509(cardData[idxSpId]) >= 0) {
				continue;
			}

			errorText += "Card : " + cardData[CARD_DATA_INDEX_NAME] + " (idx == " + idx + ")" + "\n";
		}
	}

	if (errorText == "") {
		errorText = "エラーなし";
	}

	return errorText;
};

/**
 * SPID の適格性を検査する.
 * @param spid SPID
 * @return 0 より小なら、異常あり
 */
CReverseCoder.CheckSpIdValiditySub20200509 = function (spid) {

	var idx = 0;

	var isolatedSpId = 0;
	var isolatedSpIdArray = null;

	var bSkillId = false;

	// SPID を分離
	isolatedSpIdArray = CReverseCoder.IsolateItemSpId20200509(spid);

	for (idx = 0; idx < isolatedSpIdArray.length; idx++) {

		isolatedSpId = isolatedSpIdArray[idx];

		if (idx >= 1) {
			if (!bSkillId) {
				if ((ITEM_SP_STR_PLUS <= isolatedSpId) && (isolatedSpId <= ITEM_SP_ALLSTATUS_PLUS)) {
					return -101;
				}
			}
		}

		// 特定の ID を指定する SPID の場合は、フラグを立てておく
		switch (isolatedSpId) {

		// スキル ID 指定系
		case ITEM_SP_SKILL_COST_MINUS_OFFSET:
		case ITEM_SP_SKILL_COST_SCALING_OFFSET:
		case ITEM_SP_SKILL_COOL_MINUS_OFFSET:
		case ITEM_SP_SKILL_FIXED_MINUS_OFFSET:
		case ITEM_SP_SKILL_FIXED_TIME_OFFSET:
		case ITEM_SP_SKILL_CAST_MINUS_OFFSET:
		case ITEM_SP_SKILL_CAST_TIME_OFFSET:
		case ITEM_SP_SKILL_DAMAGE_OFFSET:
			bSkillId = true;
			break;

		default:
			bSkillId = false;
			break;
		}

	}

	return 1;
};
