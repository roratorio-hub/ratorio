// デバッグファイル読み込みチェック
DebugFileIncludeCheck();





function MigEnchListMigrationTest20220523 () {

	var _FUNC_NAME = "MigEnchListMigrationTest20220523";

	var idxItem = 0;
	var idxSlot = 0;
	var idxOpt = 0;

	var msg = "";
	var testedCount = 0;
	var testErrorLogs = null;

	var itemId = 0;
	var wpnLv = 0;
	var enchTypeId = 0;
	var jobId = 0;
	var targetObjectId = "";
	var targetSlotIdArray = null;
	var candidateListAllSlots = null;
	var cardId = 0;
	var optionNodeList = null;

	var resultData = null;
	var dtBegin = null;
	var dtEnd = null;

	var skipCardIdArray = [
		CARD_ID_PHAROS_DUMMY,
		CARD_ID_ENCHANT_KIND_DUMMY_ANNIVERSARY_19,
		CARD_ID_ENCHANT_KIND_DUMMY_BATTLE_COLOSSEUM_TEST_SEASON_2,
		CARD_ID_ENCHANT_KIND_DUMMY_SHINKIRO,
		CARD_ID_ENCHANT_KIND_DUMMY_SEKAIZYUNO_HANA,
		CARD_ID_ENCHANT_KIND_DUMMY_CHOETSU,
		CARD_ID_ENCHANT_KIND_DUMMY_SEASON_KYUTE_MZYUTSUSHI,
	];

	var funcGetTimeString = function (dtF) {

		var dtTextF = "";

		dtTextF = dtF.getFullYear() + "/";
		dtTextF += ("0" + (dtF.getMonth() + 1)).slice(-2) + "/";
		dtTextF += ("0" + dtF.getDate()).slice(-2) + " ";
		dtTextF += ("0" + dtF.getHours()).slice(-2) + ":";
		dtTextF += ("0" + dtF.getMinutes()).slice(-2) + ":";
		dtTextF += ("0" + dtF.getSeconds()).slice(-2);

		return dtTextF;
	};



	dtBegin = new Date();



	testedCount = 0;
	testErrorLogs = [];

	for (idxItem = 0; idxItem < ItemObjNew.length; idxItem++) {

		if ((idxItem % 100) == 0) {
			WriteConsoleLog(_FUNC_NAME + "() : " + "テスト開始 : idxItem == " + idxItem);
		}

		itemId = ItemObjNew[idxItem][ITEM_DATA_INDEX_ID];
		wpnLv = ItemObjNew[idxItem][ITEM_DATA_INDEX_WPNLV];

		enchTypeId = Math.floor(wpnLv / 10);
		if (enchTypeId <= 0) {
			continue;
		}

		for (jobId = JOB_ID_NOVICE; jobId < EnumJobId.Count; jobId++) {
			if (IsMatchJobRestrict(itemId, jobId)) {
				break;
			}
		}



		if (jobId == 0) {
			document.getElementById("OBJID_SELECT_JOB").value = jobId + 1;
		}
		else {
			document.getElementById("OBJID_SELECT_JOB").value = jobId - 1;
		}
		document.getElementById("OBJID_SELECT_JOB").onchange();

		document.getElementById("OBJID_SELECT_JOB").value = jobId;
		document.getElementById("OBJID_SELECT_JOB").onchange();



		switch (ItemObjNew[idxItem][ITEM_DATA_INDEX_KIND]) {

		case ITEM_KIND_KNIFE:
		case ITEM_KIND_SWORD:
		case ITEM_KIND_SWORD_2HAND:
		case ITEM_KIND_SPEAR:
		case ITEM_KIND_SPEAR_2HAND:
		case ITEM_KIND_AXE:
		case ITEM_KIND_AXE_2HAND:
		case ITEM_KIND_CLUB:
		case ITEM_KIND_STUFF:
		case ITEM_KIND_BOW:
		case ITEM_KIND_KATAR:
		case ITEM_KIND_BOOK:
		case ITEM_KIND_FIST:
		case ITEM_KIND_MUSICAL:
		case ITEM_KIND_WHIP:
		case ITEM_KIND_FUMA:
		case ITEM_KIND_HANDGUN:
		case ITEM_KIND_RIFLE:
		case ITEM_KIND_SHOTGUN:
		case ITEM_KIND_GATLINGGUN:
		case ITEM_KIND_GRENADEGUN:
			document.getElementById("OBJID_ARMS_TYPE_RIGHT").value = ItemObjNew[idxItem][ITEM_DATA_INDEX_KIND];
			document.getElementById("OBJID_ARMS_TYPE_RIGHT").onchange();

			targetObjectId = "OBJID_ARMS_RIGHT";
			targetSlotIdArray = [
				"OBJID_ARMS_RIGHT_CARD_1",
				"OBJID_ARMS_RIGHT_CARD_2",
				"OBJID_ARMS_RIGHT_CARD_3",
				"OBJID_ARMS_RIGHT_CARD_4",
			];
			break;

		case ITEM_KIND_HEAD_TOP:
			targetObjectId = "OBJID_HEAD_TOP";
			targetSlotIdArray = [
				"OBJID_HEAD_TOP_CARD_1",
				"OBJID_HEAD_TOP_CARD_2",
				"OBJID_HEAD_TOP_CARD_3",
				"OBJID_HEAD_TOP_CARD_4",
			];
			break;
		case ITEM_KIND_HEAD_MID:
			targetObjectId = "OBJID_HEAD_MID";
			targetSlotIdArray = [
				"OBJID_HEAD_MID_CARD_1",
				"OBJID_HEAD_MID_CARD_2",
				"OBJID_HEAD_MID_CARD_3",
				"OBJID_HEAD_MID_CARD_4",
			];
			break;
		case ITEM_KIND_HEAD_UNDER:
			targetObjectId = "OBJID_HEAD_UNDER";
			targetSlotIdArray = [
				"OBJID_HEAD_UNDER_CARD_1",
				"OBJID_HEAD_UNDER_CARD_2",
				"OBJID_HEAD_UNDER_CARD_3",
				"OBJID_HEAD_UNDER_CARD_4",
			];
			break;
		case ITEM_KIND_BODY:
			targetObjectId = "OBJID_BODY";
			targetSlotIdArray = [
				"OBJID_BODY_CARD_1",
				"OBJID_BODY_CARD_2",
				"OBJID_BODY_CARD_3",
				"OBJID_BODY_CARD_4",
			];
			break;
		case ITEM_KIND_SHIELD:
			targetObjectId = "OBJID_SHIELD";
			targetSlotIdArray = [
				"OBJID_SHIELD_CARD_1",
				"OBJID_SHIELD_CARD_2",
				"OBJID_SHIELD_CARD_3",
				"OBJID_SHIELD_CARD_4",
			];
			break;
		case ITEM_KIND_SHOULDER:
			targetObjectId = "OBJID_SHOULDER";
			targetSlotIdArray = [
				"OBJID_SHOULDER_CARD_1",
				"OBJID_SHOULDER_CARD_2",
				"OBJID_SHOULDER_CARD_3",
				"OBJID_SHOULDER_CARD_4",
			];
			break;
		case ITEM_KIND_FOOT:
			targetObjectId = "OBJID_SHOES";
			targetSlotIdArray = [
				"OBJID_SHOES_CARD_1",
				"OBJID_SHOES_CARD_2",
				"OBJID_SHOES_CARD_3",
				"OBJID_SHOES_CARD_4",
			];
			break;
		case ITEM_KIND_ACCESSARY:
		case ITEM_KIND_ACCESSARY_ON1:
			targetObjectId = "OBJID_ACCESSARY_1";
			targetSlotIdArray = [
				"OBJID_ACCESSARY_1_CARD_1",
				"OBJID_ACCESSARY_1_CARD_2",
				"OBJID_ACCESSARY_1_CARD_3",
				"OBJID_ACCESSARY_1_CARD_4",
			];
			break;
		case ITEM_KIND_ACCESSARY_ON2:
			targetObjectId = "OBJID_ACCESSARY_2";
			targetSlotIdArray = [
				"OBJID_ACCESSARY_2_CARD_1",
				"OBJID_ACCESSARY_2_CARD_2",
				"OBJID_ACCESSARY_2_CARD_3",
				"OBJID_ACCESSARY_2_CARD_4",
			];
			break;

		default:
			msg = _FUNC_NAME + "() : " + "テスト不能アイテム" + " : " + "itemId == " + EnumItemId.GetDefinedName(itemId);
			testErrorLogs.push(msg);
			WriteConsoleLog(msg);
			continue;

		}



		document.getElementById(targetObjectId).value = itemId;
		document.getElementById(targetObjectId).onchange();

		candidateListAllSlots = [];
		for (idxSlot = 0; idxSlot < targetSlotIdArray.length; idxSlot++) {

			candidateListAllSlots[idxSlot] = [];

			optionNodeList = document.getElementById(targetSlotIdArray[idxSlot]).querySelectorAll("option");

			for (idxOpt = 0; idxOpt < optionNodeList.length; idxOpt++) {

				cardId = parseInt(optionNodeList[idxOpt].getAttribute("value"), 10);

				if (skipCardIdArray.indexOf(cardId) >= 0) {
					continue;
				}

				// 確認を容易にするための変換
				switch (cardId) {
				case CARD_ID_ENCHANT_UNBREAKABLE_ARMOR:
					cardId = CARD_ID_ENCHANT_UNBREAKABLE;
					break;
				}

				if (candidateListAllSlots[idxSlot].indexOf(cardId) < 0) {
					candidateListAllSlots[idxSlot].push(cardId);
				}
			}

			// 確認を容易にするための変換
			if (
				(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_FIRE) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_WATER) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_WIND) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_EARTH) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_HOLY) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_DARK) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_PSYCO) >= 0)
				&& (candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_POISON) >= 0)
			) {
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_FIRE), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_WATER), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_WIND), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_EARTH), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_HOLY), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_DARK), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_PSYCO), 1);
				candidateListAllSlots[idxSlot].splice(candidateListAllSlots[idxSlot].indexOf(CARD_ID_ENCHANT_ARMS_ELEMENT_POISON), 1);

				candidateListAllSlots[idxSlot].push(CARD_ID_ENCHANT_ARMS_ELEMENT);
			}
		}







		for (idxSlot = 0; idxSlot < candidateListAllSlots.length; idxSlot++) {
			candidateListAllSlots[idxSlot].sort(
				function(a, b) {
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				}
			);
		}



		resultData = {
			itemId: itemId,
			slot1: candidateListAllSlots[0],
			slot2: candidateListAllSlots[1],
			slot3: candidateListAllSlots[2],
			slot4: candidateListAllSlots[3]
		};

		CFileOutputManager.RegisterFile("ENCH_LIST_MIG_TEST_" + itemId, JSON.stringify(resultData, null, "\t"));



		testedCount++;
	}



	dtEnd = new Date();

	resultData = {
		debug: _DEBUG,
		mig: _ENCH_LIST_MIG,
		begin: funcGetTimeString(dtBegin),
		end: funcGetTimeString(dtEnd),
		itemCount: ItemObjNew.length,
		testedCount: testedCount,
		errors: testErrorLogs
	};

	CFileOutputManager.RegisterFile("INFO_ENCH_LIST_MIG_TEST", JSON.stringify(resultData, null, "\t"));



	CFileOutputManager.BeginOutput(null, null, null);
}






function MigHpSpTableMigrationTest20221012 () {

	var _FUNC_NAME = "MigHpSpTableMigrationTest20221012";

	var idx = 0;

	var oldMode = _MIG_HPSP;
	var bError = false;
	var jobId = 0;
	var baseLv = null;

	var resultInfo = null;
	var resultInfoMap = null;
	var resultInfoMapArrayHP = null;



	WriteConsoleLog("HPSP移行チェック開始");



	// ベースレベルの自動調整をオフにする
	if (document.getElementById("OBJID_CHECK_AUTO_BASE_LEVEL").checked) {
		document.getElementById("OBJID_CHECK_AUTO_BASE_LEVEL").removeAttribute("checked");
	}


	// HPチェック
	resultInfoMapArrayHP = [];

	for (jobId = JOB_ID_NOVICE; jobId <= JOB_ID_SOUL_REAPER; jobId++) {

		bError = false;

		// レベルごとの結果格納オブジェクト用マップ用意
		resultInfoMap = new Map();
		resultInfoMapArrayHP[jobId] = resultInfoMap;

		// 職業設定
		document.getElementById("OBJID_SELECT_JOB").value = jobId;
		document.getElementById("OBJID_SELECT_JOB").onchange();

		// 全レベルループ
		for (baseLv = Math.max(1, GetBaseLevelMin(jobId)); baseLv <= Math.min(200, GetBaseLevelMax(jobId)); baseLv++) {

			// 結果格納オブジェクト用意
			resultInfo = new Object();
			resultInfoMap.set(baseLv, resultInfo);


			// レベル設定
			document.getElementById("OBJID_SELECT_BASE_LEVEL").value = baseLv;


			// 従来モードで計算
			_MIG_HPSP = false;
			document.getElementById("OBJID_SELECT_BASE_LEVEL").onchange();

			// 結果を保持
			resultInfo.oldHP = CCalcDataTextCreator.refCharaData[CHARA_DATA_INDEX_MAXHP];
			resultInfo.oldSP = CCalcDataTextCreator.refCharaData[CHARA_DATA_INDEX_MAXSP];


			// 移行モードで計算
			_MIG_HPSP = true;
			document.getElementById("OBJID_SELECT_BASE_LEVEL").onchange();

			// 結果を保持
			resultInfo.newHP = CCalcDataTextCreator.refCharaData[CHARA_DATA_INDEX_MAXHP];
			resultInfo.newSP = CCalcDataTextCreator.refCharaData[CHARA_DATA_INDEX_MAXSP];



			// 結果チェック
			if ((resultInfo.newHP - resultInfo.oldHP) != 0) {
				bError = true;
				WriteConsoleLog("HP相違：" + GetJobName(jobId) + "　(" + "Lv == " + baseLv + ", old == " + resultInfo.oldHP + ", new == " + resultInfo.newHP + ")");
			}
			if ((resultInfo.newSP - resultInfo.oldSP) != 0) {
				bError = true;
				WriteConsoleLog("SP相違：" + GetJobName(jobId) + "　(" + "Lv == " + baseLv + ", old == " + resultInfo.oldSP + ", new == " + resultInfo.newSP + ")");
			}
		}

		if (!bError) {
			WriteConsoleLog("HPSPOK：" + GetJobName(jobId) + "　(" + Math.max(1, GetBaseLevelMin(jobId)) + " - " + (baseLv - 1) + ")");
		}
	}


	_MIG_HPSP = oldMode;


	WriteConsoleLog("HPSP移行チェック完了");
}

