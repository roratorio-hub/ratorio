
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//----------------------------------------------------------------
// データ順序ＩＤ定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMigTestCaseLabelDataIndex",
	[
		"MIG_TEST_CASE_LABEL_DATA_INDEX_JOB",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_PARAMS",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_EQUIPS",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_REFINED",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_CARDS",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_LEARN",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_ATTACK",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_SPEC",
		"MIG_TEST_CASE_LABEL_DATA_INDEX_MONSTER",
	],
	0,
	1
);





/**
 * テストケースラベルクラス.
 */
function CMigTestCaseLabel() {

	// 職業ID
	this.jobId = 0;

	// パラメータマップ
	this.paramMap = new Map();

	// 装備マップ
	this.equipMap = new Map();

	// カードIDマップのマップ（装備領域単位）
	this.cardIdMapMap = new Map();

	// 精錬値マップ
	this.refinedMap = new Map();

	// 習得スキルマップ
	this.learnedMap = new Map();

	// アクティブキルID
	this.activeSkillId = 0;

	// サイズID
	this.sizeId = SIZE_ID_ANY;

	// モンスターID
	this.monsterId = 0;



	/**
	 * 職業を設定する.
	 * @param jobId 職業ID
	 */
	this.SetJob = function (jobId) {
		this.jobId = jobId;
	};



	/**
	 * パラメータを設定する.
	 * @param paramId パラメータID
	 * @param value 値
	 */
	this.SetParam = function (paramId, value) {
		this.paramMap.set(paramId, value);
	};



	/**
	 * アイテムを設定する.
	 * @param equipRegionId 装備領域ID
	 * @param itemId アイテムID
	 */
	this.SetItem = function (equipRegionId, itemId) {
		this.equipMap.set(equipRegionId, itemId);
	};

	/**
	 * アイテムを取り除く.
	 * @param equipRegionId 装備領域ID
	 */
	this.RemoveItem = function (equipRegionId) {
		this.equipMap.delete(equipRegionId);
	};



	/**
	 * カードを設定する.
	 * @param equipRegionId 装備領域ID
	 * @param slotId スロットID
	 * @param cardIdArray カードID配列
	 */
	this.SetCard = function (equipRegionId, slotId, cardId) {

		var cardIdMap = null;

		cardIdMap = this.cardIdMapMap.get(equipRegionId);

		if (cardIdMap === undefined) {
			cardIdMap = new Map();
			this.cardIdMapMap.set(equipRegionId, cardIdMap);
		}

		cardIdMap.set(slotId, cardId);
	};



	/**
	 * 精錬値を設定する.
	 * @param equipRegionId 装備領域ID
	 * @param refinedValue 精錬値
	 */
	this.SetRefined = function (equipRegionId, refinedValue) {
		this.refinedMap.set(equipRegionId, refinedValue);
	};



	/**
	 * スキル習得レベルを設定する.
	 * @param skillId スキルID
	 * @param learnedValue スキル習得レベル
	 */
	this.SetLearned = function (skillId, learnedValue) {
		this.learnedMap.set(skillId, learnedValue);
	};



	/**
	 * アクティブスキルを設定する.
	 * @param activeSkillId アクティブスキルID
	 */
	this.SetActiveSkill = function (activeSkillId) {
		this.activeSkillId = activeSkillId;
	};



	/**
	 * サイズを設定する.
	 * @param sizeId サイズID
	 */
	this.SetSize = function (sizeId) {
		this.sizeId = sizeId;
	};



	/**
	 * モンスターを設定する.
	 * @param monsterId モンスターID
	 */
	this.SetMonster = function (monsterId) {
		this.monsterId = monsterId;
	};



	/**
	 * 最終的なラベルを取得する.
	 * @return ラベル
	 */
	this.GetLabel = function () {

		var idx = 0;

		var arrayWork = null;

		var labelPart = "";
		var labelPartArray = null;

		var funcGetParamText = function (thisArg, paramIdF, digitsF) {
			var labelValueF = thisArg.paramMap.get(paramIdF);
			return (" ".repeat(4) + (labelValueF === undefined ? "1" : ("" + labelValueF))).slice(0 - digitsF);
		};

		var funcGetBaseLvText = function (thisArg) {

			var labelValueF = thisArg.paramMap.get(MIG_PARAM_ID_BASE_LV);

			if (labelValueF === undefined) {
				labelValueF = GetBaseLevelMin(thisArg.jobId);
			}
			else if (labelValueF < GetBaseLevelMin(this.jobId)) {
				labelValueF = GetBaseLevelMin(thisArg.jobId);
			}

			return (" ".repeat(4) + labelValueF).slice(-3);
		};

		var funcGetEquipText = function (thisArg, equipRegionIdF) {

			var labelValueF = null;

			// アイテム装備状況判定
			labelValueF = thisArg.equipMap.get(equipRegionIdF);

			if (labelValueF === undefined) {
				return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
			}

			return "Ｉ";
		};

		var funcGetCardTextOld = function (thisArg, equipRegionIdF) {

			var idxF = 0;

			var cardIdMap = thisArg.cardIdMapMap.get(equipRegionIdF);
			var cardSetFlagF = 0;

			if (cardIdMap === undefined) {
				return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
			}

			for (idxF = 0; idxF < CMigEquipInfo.cardCountInEquip; idxF++) {
				if (cardIdMap.has(idxF)) {
					cardSetFlagF += 1 << idxF;
				}
			}

			return CMigTestCaseLabel.NUMERIC_CHAR_LIST[cardSetFlagF];
		};

		var funcGetCardIdArray = function (thisArg, equipRegionIdF) {

			var idxF = 0;
			var cardId = 0;
			var cardIdArray = [];

			var cardIdMap = thisArg.cardIdMapMap.get(equipRegionIdF);

			if (cardIdMap === undefined) {
				for (idxF = 0; idxF < CMigEquipInfo.cardCountInEquip; idxF++) {
					cardIdArray.push(CARD_ID_NONE);
				}
			}
			else {
				for (idxF = 0; idxF < CMigEquipInfo.cardCountInEquip; idxF++) {

					cardId = cardIdMap.get(idxF);

					if (cardId !== undefined) {
						cardIdArray.push(cardId);
					}
					else {
						cardIdArray.push(CARD_ID_NONE);
					}
				}
			}

			return cardIdArray;
		};

		var funcGetRefinedText = function (thisArg, equipRegionIdF) {

			var labelValueF = null;

			// アイテム装備状況判定
			labelValueF = thisArg.equipMap.get(equipRegionIdF);

			if (labelValueF === undefined) {
				return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
			}

			// 精錬値判定
			labelValueF = thisArg.refinedMap.get(equipRegionIdF);

			if (labelValueF === undefined) {
				return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
			}

			return CMigTestCaseLabel.NUMERIC_CHAR_LIST[labelValueF];
		};

		var funcGetRefinedValue = function (thisArg, equipRegionIdF) {
			return (thisArg.equipMap.has(equipRegionIdF) ? thisArg.refinedMap.get(equipRegionIdF) : undefined);
		};

		var funcGetSkillText = function (skillIdF) {

			// TODO: ここ、プレーンネームを保持する仕組み作りたい

			var skillIdOriginF = 0;
			var skillNameF = "";
			var regReplacerF = /\([^)]+\)/;

			skillIdOriginF = CAttackMethodData.GetSkillIdFromFullId(skillIdF);

			skillNameF = g_skillManager.GetSkillName(skillIdOriginF);

			while (regReplacerF.test(skillNameF)) {
				skillNameF = skillNameF.replace(regReplacerF, "");
			}

			return (skillNameF + CMigTestCaseLabel.CHAR_SPACE.repeat(8)).slice(0, 8);
		};

		var funcGetSkillTextCallback = function (valueF, keyF, mapF) {
			labelPart += funcGetSkillText(keyF) + CMigTestCaseLabel.NUMERIC_CHAR_LIST[valueF] + CMigTestCaseLabel.CHAR_SPACE;
		};



		labelPartArray = [];

		// 職業
		labelPartArray.push(CMigTestCaseLabel.GetLabelPartJobName(this.jobId));

		// パラメータ
/*
		labelPart = "";
		labelPart += funcGetBaseLvText(this);
		labelPart += "/";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_JOB_LV, 2);
		labelPart += " ";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_STR, 3);
		labelPart += "/";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_AGI, 3);
		labelPart += "/";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_VIT, 3);
		labelPart += "/";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_INT, 3);
		labelPart += "/";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_DEX, 3);
		labelPart += "/";
		labelPart += funcGetParamText(this, MIG_PARAM_ID_LUK, 3);
*/

		labelPartArray.push(
			CMigTestCaseLabel.GetLabelPartParams(
				this.jobId,
				this.paramMap.get(MIG_PARAM_ID_BASE_LV),
				this.paramMap.get(MIG_PARAM_ID_JOB_LV),
				this.paramMap.get(MIG_PARAM_ID_STR),
				this.paramMap.get(MIG_PARAM_ID_AGI),
				this.paramMap.get(MIG_PARAM_ID_VIT),
				this.paramMap.get(MIG_PARAM_ID_INT),
				this.paramMap.get(MIG_PARAM_ID_DEX),
				this.paramMap.get(MIG_PARAM_ID_LUK)
			)
		);

		// 装備
/*
		labelPart = "";
		labelPart += "Ｉ";		// 未指定でも適当な装備が確実に設定されるので
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_ARMS_LEFT);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_HEAD_TOP);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_HEAD_MID);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_HEAD_UNDER);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_SHIELD);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_BODY);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_SHOULDER);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_FOOT);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_ACCESSORY_1);
		labelPart += funcGetEquipText(this, MIG_EQUIP_REGION_ID_ACCESSORY_2);
*/
		labelPartArray.push(
			CMigTestCaseLabel.GetLabelPartEquips(
				this.equipMap.get(MIG_EQUIP_REGION_ID_ARMS_RIGHT),
				this.equipMap.get(MIG_EQUIP_REGION_ID_ARMS_LEFT),
				this.equipMap.get(MIG_EQUIP_REGION_ID_HEAD_TOP),
				this.equipMap.get(MIG_EQUIP_REGION_ID_HEAD_MID),
				this.equipMap.get(MIG_EQUIP_REGION_ID_HEAD_UNDER),
				this.equipMap.get(MIG_EQUIP_REGION_ID_SHIELD),
				this.equipMap.get(MIG_EQUIP_REGION_ID_BODY),
				this.equipMap.get(MIG_EQUIP_REGION_ID_SHOULDER),
				this.equipMap.get(MIG_EQUIP_REGION_ID_FOOT),
				this.equipMap.get(MIG_EQUIP_REGION_ID_ACCESSORY_1),
				this.equipMap.get(MIG_EQUIP_REGION_ID_ACCESSORY_2)
			)
		);

		// 精錬値
/*
		labelPart = "";
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_ARMS_RIGHT);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_ARMS_LEFT);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_HEAD_TOP);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_HEAD_MID);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_HEAD_UNDER);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_SHIELD);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_BODY);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_SHOULDER);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_FOOT);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_ACCESSORY_1);
		labelPart += funcGetRefinedText(this, MIG_EQUIP_REGION_ID_ACCESSORY_2);
*/
		labelPartArray.push(
			CMigTestCaseLabel.GetLabelPartRefineds(
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_ARMS_RIGHT),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_ARMS_LEFT),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_HEAD_TOP),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_HEAD_MID),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_HEAD_UNDER),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_SHIELD),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_BODY),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_SHOULDER),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_FOOT),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_ACCESSORY_1),
				funcGetRefinedValue(this, MIG_EQUIP_REGION_ID_ACCESSORY_2)
			)
		);

		// カード
/*
		labelPart = "";
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_ARMS_RIGHT);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_ARMS_LEFT);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_HEAD_TOP);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_HEAD_MID);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_HEAD_UNDER);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_SHIELD);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_BODY);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_SHOULDER);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_FOOT);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_ACCESSORY_1);
		labelPart += funcGetCardTextOld(this, MIG_EQUIP_REGION_ID_ACCESSORY_2);
*/
		labelPartArray.push(
			CMigTestCaseLabel.GetLabelPartCards(
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_ARMS_RIGHT),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_ARMS_LEFT),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_HEAD_TOP),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_HEAD_MID),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_HEAD_UNDER),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_SHIELD),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_BODY),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_SHOULDER),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_FOOT),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_ACCESSORY_1),
				funcGetCardIdArray(this, MIG_EQUIP_REGION_ID_ACCESSORY_2)
			)
		);



		// 習得スキル
		// 昇順にソートしておく
		arrayWork = [];
		this.learnedMap.forEach(
			function (valueF, keyF, mapF) {
				arrayWork.push([keyF, valueF]);
			}
		);
/*
		arrayWork.sort(
			function(a, b) {
				if (a[0] < b[0]) return -1;
				if (a[0] > b[0]) return 1;
				return 0;
			}
		);

		labelPart = "";
		for (idx = 0; idx < arrayWork.length; idx++) {
			labelPart += funcGetSkillText(arrayWork[idx][0]) + CMigTestCaseLabel.NUMERIC_CHAR_LIST[arrayWork[idx][1]] + CMigTestCaseLabel.CHAR_SPACE;
		}
		if (labelPart == "") {
			labelPart = CMigTestCaseLabel.CHAR_SPACE.repeat(10);
		}
		labelPartArray.push(labelPart);
*/
		labelPartArray.push(CMigTestCaseLabel.GetLabelPartLearnedSkills(arrayWork));



		// アクティブスキル
//		labelPartArray.push(funcGetSkillText(this.activeSkillId));
		labelPartArray.push(CMigTestCaseLabel.GetLabelPartActiveSkill(this.activeSkillId));



		// 敵特性
		labelPartArray.push(
			CMigTestCaseLabel.GetLabelPartSpecializes(
				this.monsterId,
				this.raceId,
				this.elementId,
				this.sizeId,
				this.bossId,
				this.playerId
			)
		);


		// モンスター
/*
		labelPart = "";
		labelPart += (MonsterObjNew[this.monsterId][MONSTER_DATA_INDEX_NAME] + CMigTestCaseLabel.CHAR_SPACE.repeat(8)).slice(0, 8);
		labelPartArray.push(labelPart);
*/
		labelPartArray.push(CMigTestCaseLabel.GetLabelPartMonster(this.monsterId));



		return (CMigTestCaseLabel.CHAR_OPEN_BRACKET
				+ labelPartArray.join(CMigTestCaseLabel.CHAR_CLOSE_BRACKET + CMigTestCaseLabel.CHAR_OPEN_BRACKET)
				+ CMigTestCaseLabel.CHAR_CLOSE_BRACKET);
	};



	/**
	 * オブジェクトを複製する.
	 */
	this.Clone = function () {

		var objNew = new CMigTestCaseLabel();



		// 変数の転写
		objNew.jobId = this.jobId;
		objNew.activeSkillId = this.activeSkillId;
		objNew.sizeId = this.sizeId;
		objNew.monsterId = this.monsterId;

		// パラメータマップを転写
		this.paramMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.paramMap.set(keyF, valueF);
			}
		);

		// 装備マップを転写
		this.equipMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.equipMap.set(keyF, valueF);
			}
		);

		// カードIDマップのマップを転写
		this.cardIdMapMap.forEach(
			function (valueF, keyF, mapF) {

				var mapClonedF = null;

				mapClonedF = new Map();

				valueF.forEach(
					function (valueFF, keyFF, mapFF) {
						mapClonedF.set(keyFF, valueFF);
					}
				);

				objNew.cardIdMapMap.set(keyF, mapClonedF);
			}
		);

		// 精錬値マップを転写
		this.refinedMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.refinedMap.set(keyF, valueF);
			}
		);

		// スキルマップを転写
		this.learnedMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.learnedMap.set(keyF, valueF);
			}
		);

		return objNew;
	};

}



// 開き括弧
CMigTestCaseLabel.CHAR_OPEN_BRACKET = "［";

// 閉じ括弧
CMigTestCaseLabel.CHAR_CLOSE_BRACKET = "］";

// スペース
CMigTestCaseLabel.CHAR_SPACE = "　";

// 半角スペース
CMigTestCaseLabel.CHAR_SPACE_HALF = " ";

// 全角数値変換用配列
CMigTestCaseLabel.NUMERIC_CHAR_LIST = ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９", "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ"];





/**
 * 職業ラベルを取得する.
 * @param jobId 職業ID
 */
CMigTestCaseLabel.GetJobLabel = function (jobId) {

	switch (jobId) {
	case JOB_ID_NOVICE:
		return "ノビ";

	case JOB_ID_SWORDMAN:
		return "剣士";
	case JOB_ID_THIEF:
		return "シーフ";
	case JOB_ID_ACOLYTE:
		return "アコ";
	case JOB_ID_ARCHER:
		return "アチャ";
	case JOB_ID_MAGICIAN:
		return "マジ";
	case JOB_ID_MARCHANT:
		return "商人";

	case JOB_ID_KNIGHT:
		return "ナイト";
	case JOB_ID_ASSASIN:
		return "アサ";
	case JOB_ID_PRIEST:
		return "プリ";
	case JOB_ID_HUNTER:
		return "ハンタ";
	case JOB_ID_WIZARD:
		return "ウィズ";
	case JOB_ID_BLACKSMITH:
		return "ＢＳ";
	case JOB_ID_CRUSADER:
		return "クルセ";
	case JOB_ID_ROGUE:
		return "ローグ";
	case JOB_ID_MONK:
		return "モンク";
	case JOB_ID_BARD:
		return "バード";
	case JOB_ID_DANCER:
		return "ダンサ";
	case JOB_ID_SAGE:
		return "セージ";
	case JOB_ID_ALCHEMIST:
		return "ケミ";

	case JOB_ID_SUPERNOVICE:
		return "Ｓノビ";

	case JOB_ID_LORDKNIGHT:
		return "ＬＫ";
	case JOB_ID_ASSASINCROSS:
		return "アサクロ";
	case JOB_ID_HIGHPRIEST:
		return "廃プリ";
	case JOB_ID_SNIPER:
		return "スナイパ";
	case JOB_ID_HIGHWIZARD:
		return "廃ウィズ";
	case JOB_ID_WHITESMITH:
		return "ＷＳ";
	case JOB_ID_PALADIN:
		return "パラ";
	case JOB_ID_CHASER:
		return "チェイサ";
	case JOB_ID_CHAMPION:
		return "チャンプ";
	case JOB_ID_CROWN:
		return "クラウン";
	case JOB_ID_ZYPSY:
		return "ジプシ";
	case JOB_ID_PROFESSOR:
		return "教授";
	case JOB_ID_CREATOR:
		return "クリエ";

	case JOB_ID_HI_NOVICE:
		return "廃ノビ";

	case JOB_ID_HI_SWORDMAN:
		return "廃剣士";
	case JOB_ID_HI_THIEF:
		return "廃シーフ";
	case JOB_ID_HI_ACOLYTE:
		return "廃アコ";
	case JOB_ID_HI_ARCHER:
		return "廃アチャ";
	case JOB_ID_HI_MAGICIAN:
		return "廃マジ";
	case JOB_ID_HI_MARCHANT:
		return "廃商人";

	case JOB_ID_TAEGWON:
		return "テコン";
	case JOB_ID_STARGRADIATOR:
		return "拳聖";
	case JOB_ID_SOULLINKER:
		return "リンカ";
	case JOB_ID_NINJA:
		return "忍者";
	case JOB_ID_GUNSLINGER:
		return "ガンスリ";

	case JOB_ID_RUNEKNIGHT:
		return "ＲＫ";
	case JOB_ID_GILOTINCROSS:
		return "ギロチン";
	case JOB_ID_ARCBISHOP:
		return "アクビ";
	case JOB_ID_RANGER:
		return "レンジャ";
	case JOB_ID_WARLOCK:
		return "ＷＬ";
	case JOB_ID_MECHANIC:
		return "メカ";
	case JOB_ID_ROYALGUARD:
		return "ＲＧ";
	case JOB_ID_SHADOWCHASER:
		return "影葱";
	case JOB_ID_SHURA:
		return "修羅";
	case JOB_ID_MINSTREL:
		return "ミンスト";
	case JOB_ID_WANDERER:
		return "ワンダラ";
	case JOB_ID_SORCERER:
		return "ソーサラ";
	case JOB_ID_GENETIC:
		return "ジェネ";

	case JOB_ID_KAGERO:
		return "影狼";
	case JOB_ID_OBORO:
		return "朧";

	case JOB_ID_SUPERNOVICE_PLUS:
		return "Ｓノビ＋";

	case JOB_ID_REBELLION:
		return "リベ";

	case JOB_ID_SUMMONER:
		return "サモナ";

	case JOB_ID_STAR_EMPEROR:
		return "星帝";
	case JOB_ID_SOUL_REAPER:
		return "リンカ";

	}

	return "ニート";
};

/**
 * 装備領域のプレイサを取得する.
 * @param equipRegionId 装備領域ID
 */
CMigTestCaseLabel.GetEquipRegionPlacer = function (equipRegionId) {

	switch (equipRegionId) {

	case MIG_EQUIP_REGION_ID_ARMS_RIGHT:
		return "右";

	case MIG_EQUIP_REGION_ID_ARMS_LEFT:
		return "左";

	case MIG_EQUIP_REGION_ID_HEAD_TOP:
		return "上";

	case MIG_EQUIP_REGION_ID_HEAD_MID:
		return "中";

	case MIG_EQUIP_REGION_ID_HEAD_UNDER:
		return "下";

	case MIG_EQUIP_REGION_ID_SHIELD:
		return "盾";

	case MIG_EQUIP_REGION_ID_BODY:
		return "体";

	case MIG_EQUIP_REGION_ID_SHOULDER:
		return "肩";

	case MIG_EQUIP_REGION_ID_FOOT:
		return "足";

	case MIG_EQUIP_REGION_ID_ACCESSORY_1:
		return "壱";

	case MIG_EQUIP_REGION_ID_ACCESSORY_2:
		return "弐";

	}

	return "";
};

/**
 * 種族ラベルを取得する.
 * @param raceId 種族ID
 */
CMigTestCaseLabel.GetRaceLabel = function (raceId) {

	switch (raceId) {

	case MIG_RACE_ID_SOLID:
		return "無";

	case MIG_RACE_ID_UNDEAD:
		return "死";

	case MIG_RACE_ID_ANIMAL:
		return "動";

	case MIG_RACE_ID_PLANT:
		return "植";

	case MIG_RACE_ID_INSECT:
		return "虫";

	case MIG_RACE_ID_FISH:
		return "魚";

	case MIG_RACE_ID_DEMON:
		return "悪";

	case MIG_RACE_ID_HUMAN:
		return "人";

	case MIG_RACE_ID_ANGEL:
		return "天";

	case MIG_RACE_ID_DRAGON:
		return "竜";
	}

	return "種";
};

/**
 * 属性ラベルを取得する.
 * @param elementId 属性ID
 */
CMigTestCaseLabel.GetElementLabel = function (elementId) {

	switch (elementId) {

	case MIG_ELEMENT_ID_VANITY:
		return "無";

	case MIG_ELEMENT_ID_WATER:
		return "水";

	case MIG_ELEMENT_ID_EARTH:
		return "地";

	case MIG_ELEMENT_ID_FIRE:
		return "火";

	case MIG_ELEMENT_ID_WIND:
		return "風";

	case MIG_ELEMENT_ID_POISON:
		return "毒";

	case MIG_ELEMENT_ID_HOLY:
		return "聖";

	case MIG_ELEMENT_ID_DARK:
		return "闇";

	case MIG_ELEMENT_ID_PSYCO:
		return "念";

	case MIG_ELEMENT_ID_UNDEAD:
		return "死";

	}

	return "属";
};

/**
 * サイズラベルを取得する.
 * @param sizeId サイズID
 */
CMigTestCaseLabel.GetSizeLabel = function (sizeId) {

	switch (sizeId) {

	case MIG_SIZE_ID_SMALL:
		return "小";

	case MIG_SIZE_ID_MEDIUM:
		return "中";

	case MIG_SIZE_ID_LARGE:
		return "大";
	}

	return "型";
};

/**
 * ボス属性ラベルを取得する.
 * @param bossId ボス属性ID
 */
CMigTestCaseLabel.GetBossLabel = function (bossId) {

	switch (bossId) {

	case MIG_BOSS_ID_NORMAL:
		return "般";

	case MIG_BOSS_ID_BOSS:
		return "ボ";
	}

	return "級";
};

/**
 * プレイヤー属性ラベルを取得する.
 * @param playerId プレイヤー属性ID
 */
CMigTestCaseLabel.GetPlayerLabel = function (playerId) {

	switch (playerId) {

	case MIG_PLAYER_ID_HUMAN:
		return "人";

	case MIG_PLAYER_ID_DORAM:
		return "猫";
	}

	return "Ｐ";
};





/**
 * ラベルのパート文字列を固定長に補正する（共用）.
 * @param labelPart ラベルのパート文字列
 * @param fixedLength 固定長
 * @return 補正後のラベルのパート文字列
 */
CMigTestCaseLabel.ModifyLengthLabelPart = function (labelPart, fixedLength) {
	return (labelPart + CMigTestCaseLabel.CHAR_SPACE.repeat(fixedLength)).slice(0, fixedLength);
};

/**
 * ラベルのパート文字列を固定長に補正する（パラメータ用）.
 * @param labelPart ラベルのパート文字列
 * @param fixedLength 固定長
 * @return 補正後のラベルのパート文字列
 */
CMigTestCaseLabel.ModifyLengthLabelPartForParam = function (labelPart, fixedLength) {
	return (CMigTestCaseLabel.CHAR_SPACE_HALF.repeat(fixedLength) + labelPart).slice(0 - fixedLength);
};

/**
 * ラベルのパート文字列を取得する（職業）.
 * @param jobId 職業ID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartJobName = function (jobId) {

	var labelPart = "";

	labelPart += CMigTestCaseLabel.GetJobLabel(jobId);

	return CMigTestCaseLabel.ModifyLengthLabelPart(labelPart, 4);
};

/**
 * ラベルのパート文字列を取得する（パラメータ）.
 * @param jobId 職業ID
 * @param baseLv ベースレベル
 * @param jobLv ジョブレベル
 * @param valStr Str値
 * @param valAgi Agi値
 * @param valVit Vit値
 * @param valInt Int値
 * @param valDex Dex値
 * @param valLuk Luk値
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartParams = function (jobId, baseLv, jobLv, valStr, valAgi, valVit, valInt, valDex, valLuk) {

	var labelPart = "";

	var funcGetParamText = function (paramValueF, paramMinF, digitsF) {

		var labelValueF = 0;

		if (paramValueF) {
			labelValueF = paramValueF;
		}

		labelValueF = Math.max(labelValueF, paramMinF);

		return CMigTestCaseLabel.ModifyLengthLabelPartForParam(labelValueF, digitsF);
	};



	labelPart += funcGetParamText(baseLv, GetBaseLevelMin(jobId), 3);
	labelPart += "/";
	labelPart += funcGetParamText(jobLv, 1, 2);
	labelPart += " ";
	labelPart += funcGetParamText(valStr, 1, 3);
	labelPart += "/";
	labelPart += funcGetParamText(valAgi, 1, 3);
	labelPart += "/";
	labelPart += funcGetParamText(valVit, 1, 3);
	labelPart += "/";
	labelPart += funcGetParamText(valInt, 1, 3);
	labelPart += "/";
	labelPart += funcGetParamText(valDex, 1, 3);
	labelPart += "/";
	labelPart += funcGetParamText(valLuk, 1, 3);

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（装備）.
 * @param itemIdArmsRight 右手装備アイテムID
 * @param itemIdArmsLeft 左手装備アイテムID
 * @param itemIdHeadTop 頭上段アイテムID
 * @param itemIdHeadMid 頭中段アイテムID
 * @param itemIdHeadUnder 頭下段アイテムID
 * @param itemIdShiled 盾アイテムID
 * @param itemIdBody 体アイテムID
 * @param itemIdShoulder 肩アイテムID
 * @param itemIdFoot 足アイテムID
 * @param itemIdAccessory1 アクセサリ１アイテムID
 * @param itemIdAccessory2 アクセサリ２アイテムID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartEquips = function (itemIdArmsRight, itemIdArmsLeft, itemIdHeadTop, itemIdHeadMid, itemIdHeadUnder,
	itemIdShiled, itemIdBody, itemIdShoulder, itemIdFoot, itemIdAccessory1, itemIdAccessory2) {

	var labelPart = "";

	var noneItemIdArray = [
		ITEM_ID_SUDE,
		ITEM_ID_NOEQUIP_HEAD_TOP,
		ITEM_ID_NOEQUIP_HEAD_MID,
		ITEM_ID_NOEQUIP_HEAD_UNDER,
		ITEM_ID_NOEQUIP_BODY,
		ITEM_ID_NOEQUIP_SHIELD,
		ITEM_ID_NOEQUIP_SHOULDER,
		ITEM_ID_NOEQUIP_SHOES,
		ITEM_ID_NOEQUIP_ACCESSARY,
		ITEM_ID_NOEQUIP_SET,
	];

	var funcGetEquipText = function (equipRegionIdF, itemIdF) {

		var labelPartF = "";

		if (itemIdF === undefined) {
			labelPartF = CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}
		else if (noneItemIdArray.indexOf(itemIdF) >= 0) {
			labelPartF = CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}
		else {
			labelPartF = "Ｉ";
		}

		return CMigTestCaseLabel.ModifyLengthLabelPart(labelPartF, 1);
	};



	labelPart += "Ｉ";		// 未指定でも適当な装備が確実に設定されるので
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ARMS_LEFT, itemIdArmsLeft);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_HEAD_TOP, itemIdHeadTop);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_HEAD_MID, itemIdHeadMid);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_HEAD_UNDER, itemIdHeadUnder);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_SHIELD, itemIdShiled);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_BODY, itemIdBody);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_SHOULDER, itemIdShoulder);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_FOOT, itemIdFoot);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ACCESSORY_1, itemIdAccessory1);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ACCESSORY_2, itemIdAccessory2);

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（精錬値）.
 * @param refinedArmsRight 右手装備アイテムID
 * @param refinedArmsLeft 左手装備アイテムID
 * @param refinedHeadTop 頭上段アイテムID
 * @param refinedHeadMid 頭中段アイテムID
 * @param refinedHeadUnder 頭下段アイテムID
 * @param refinedShiled 盾アイテムID
 * @param refinedBody 体アイテムID
 * @param refinedShoulder 肩アイテムID
 * @param refinedFoot 足アイテムID
 * @param refinedAccessory1 アクセサリ１アイテムID
 * @param refinedAccessory2 アクセサリ２アイテムID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartRefineds = function (refinedArmsRight, refinedArmsLeft, refinedHeadTop, refinedHeadMid, refinedHeadUnder,
	refinedShiled, refinedBody, refinedShoulder, refinedFoot, refinedAccessory1, refinedAccessory2) {

	var labelPart = "";

	var funcGetRefinedText = function (equipRegionIdF, refinedF) {

		var labelPartF = "";

		if (refinedF === undefined) {
			labelPartF = CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}
		else {
			labelPartF = CMigTestCaseLabel.NUMERIC_CHAR_LIST[refinedF];
		}

		return CMigTestCaseLabel.ModifyLengthLabelPart(labelPartF, 1);
	};



	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ARMS_RIGHT, refinedArmsRight);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ARMS_LEFT, refinedArmsLeft);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_HEAD_TOP, refinedHeadTop);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_HEAD_MID, refinedHeadMid);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_HEAD_UNDER, refinedHeadUnder);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_SHIELD, refinedShiled);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_BODY, refinedBody);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_SHOULDER, refinedShoulder);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_FOOT, refinedFoot);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ACCESSORY_1, refinedAccessory1);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ACCESSORY_2, refinedAccessory2);

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（カード）.
 * @param cardArrayArmsRight 右手装備アイテムID
 * @param cardArrayArmsLeft 左手装備アイテムID
 * @param cardArrayHeadTop 頭上段アイテムID
 * @param cardArrayHeadMid 頭中段アイテムID
 * @param cardArrayHeadUnder 頭下段アイテムID
 * @param cardArrayShiled 盾アイテムID
 * @param cardArrayBody 体アイテムID
 * @param cardArrayShoulder 肩アイテムID
 * @param cardArrayFoot 足アイテムID
 * @param cardArrayAccessory1 アクセサリ１アイテムID
 * @param cardArrayAccessory2 アクセサリ２アイテムID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartCards = function (cardArrayArmsRight, cardArrayArmsLeft, cardArrayHeadTop, cardArrayHeadMid, cardArrayHeadUnder,
	cardArrayShiled, cardArrayBody, cardArrayShoulder, cardArrayFoot, cardArrayAccessory1, cardArrayAccessory2) {

	var labelPart = "";

	var noneCardIdArray = [
		CARD_ID_NONE,
	];

	var funcGetCardText = function (equipRegionIdF, cardArrayF) {

		var idxF = 0;
		var loopCount = 0;

		var labelPartF = "";
		var cardSetFlagF = 0;

		if (cardArrayF === undefined) {
			labelPartF = CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}
		else {

			// 念のため、ループ数を調整しておく
			loopCount = Math.min(cardArrayF.length, CMigEquipInfo.cardCountInEquip);

			for (idxF = 0; idxF < loopCount; idxF++) {
				if (noneCardIdArray.indexOf(cardArrayF[idxF]) < 0) {
					cardSetFlagF += (1 << idxF);
				}
			}

			// 何も装備されていなければ、プレイサにする
			if (cardSetFlagF == 0) {
				labelPartF = CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
			}
			else {
				labelPartF = CMigTestCaseLabel.NUMERIC_CHAR_LIST[cardSetFlagF];
			}
		}

		return CMigTestCaseLabel.ModifyLengthLabelPart(labelPartF, 1);
	};



	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_ARMS_RIGHT, cardArrayArmsRight);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_ARMS_LEFT, cardArrayArmsLeft);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_HEAD_TOP, cardArrayHeadTop);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_HEAD_MID, cardArrayHeadMid);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_HEAD_UNDER, cardArrayHeadUnder);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_SHIELD, cardArrayShiled);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_BODY, cardArrayBody);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_SHOULDER, cardArrayShoulder);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_FOOT, cardArrayFoot);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_ACCESSORY_1, cardArrayAccessory1);
	labelPart += funcGetCardText(MIG_EQUIP_REGION_ID_ACCESSORY_2, cardArrayAccessory2);

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（サブ　スキル名）.
 * @param skillId スキルID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartSubSkillName = function (skillId) {

	var skillIdOrigin = 0;
	var skillName = "";

	skillIdOrigin = CAttackMethodData.GetSkillIdFromFullId(skillId);

	skillName = g_skillManager.GetSkillPlaneName(skillIdOrigin);

	return CMigTestCaseLabel.ModifyLengthLabelPart(skillName, 8);
};

/**
 * ラベルのパート文字列を取得する（習得スキル）.
 * @param learnedSkillInfoArray 習得スキル情報配列（ID, Lv）
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartLearnedSkills = function (learnedSkillInfoArray) {

	var idx = 0;
	var learnedSkillInfoArrayWork = null;
	var loopCount = 0;

	var labelPart = "";



	// 指定がない場合
	if (learnedSkillInfoArray.length == 0) {
		return CMigTestCaseLabel.ModifyLengthLabelPart("", 8 + 1 + 1);
	}



	// 昇順ソート
	learnedSkillInfoArrayWork = learnedSkillInfoArray.slice();
	learnedSkillInfoArrayWork.sort(
		function(a, b) {
			if (a[0] < b[0]) return -1;
			if (a[0] > b[0]) return 1;
			return 0;
		}
	);

	// 念のため、ループ数に上限を設けておく
	loopCount = Math.min(10, learnedSkillInfoArrayWork.length);

	// ラベルパート生成
	for (idx = 0; idx < loopCount; idx++) {
		labelPart += CMigTestCaseLabel.GetLabelPartSubSkillName(learnedSkillInfoArrayWork[idx][0]) + CMigTestCaseLabel.NUMERIC_CHAR_LIST[learnedSkillInfoArrayWork[idx][1]] + CMigTestCaseLabel.CHAR_SPACE;
	}

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（アクティブスキル）.
 * @param skillId スキルID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartActiveSkill = function (skillId) {

	var labelPart = "";

	labelPart += CMigTestCaseLabel.GetLabelPartSubSkillName(skillId);

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（特化）.
 * @param skillId スキルID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartSpecializes = function (monsterId, raceId, elementId, sizeId, bossId, playerId) {

	var labelPart = "";

	// 引数の補正
	if (raceId === undefined) {
		raceId = -1;
	}
	if (elementId === undefined) {
		elementId = -1;
	}
	if (sizeId === undefined) {
		sizeId = -1;
	}
	if (bossId === undefined) {
		bossId = -1;
	}
	if (playerId === undefined) {
		playerId = -1;
	}



	labelPart += CMigTestCaseLabel.ModifyLengthLabelPart(CMigTestCaseLabel.GetRaceLabel(raceId), 1);
	labelPart += CMigTestCaseLabel.ModifyLengthLabelPart(CMigTestCaseLabel.GetElementLabel(elementId), 1);
	labelPart += CMigTestCaseLabel.ModifyLengthLabelPart(CMigTestCaseLabel.GetSizeLabel(sizeId), 1);
	labelPart += CMigTestCaseLabel.ModifyLengthLabelPart(CMigTestCaseLabel.GetBossLabel(bossId), 1);
	labelPart += CMigTestCaseLabel.ModifyLengthLabelPart(CMigTestCaseLabel.GetPlayerLabel(playerId), 1);

	return labelPart;
};

/**
 * ラベルのパート文字列を取得する（モンスター）.
 * @param monsterId モンスターID
 * @return ラベルのパート文字列
 */
CMigTestCaseLabel.GetLabelPartMonster = function (monsterId) {

	var labelPart = "";

	labelPart += CMigTestCaseLabel.ModifyLengthLabelPart(MonsterObjNew[monsterId][MONSTER_DATA_INDEX_NAME], 8);

	return labelPart;
};



/**
 * ラベル文字列を分割して、内容の配列にする.
 * @param labelText ラベル文字列
 * @return 内容の配列（括弧なし）
 */
CMigTestCaseLabel.SplitLabelText = function (labelText) {

	var idx = 0;

	var pos = 0;
	var posOpen = 0;
	var depth = 0;
	var splittedArray = null;



	splittedArray = [];
	depth = 0;
	posOpen = 0;

	for (pos = 0; pos < labelText.length; pos++) {

		switch (labelText.charAt(pos)) {

		case CMigTestCaseLabel.CHAR_OPEN_BRACKET:
			if (depth == 0) {
				posOpen = pos;
			}
			depth++;
			break;

		case CMigTestCaseLabel.CHAR_CLOSE_BRACKET:
			depth--;
			if (depth == 0) {
				splittedArray.push(labelText.substring(posOpen + 1, pos));
			}
			break;
		}
	}



	return splittedArray;
}






