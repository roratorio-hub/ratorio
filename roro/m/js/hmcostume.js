


/************************************************************************************************
 *
 * 衣装選択状態をクリアする（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function ClearCostumeSlotAll(eqpRgnId) {

	// 個別関数を全コール
	ClearCostumeSlot(EQUIP_REGION_ID_HEAD_UNDER);
}

/************************************************************************************************
 *
 * 衣装選択状態をクリアする.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function ClearCostumeSlot(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__ClearCostumeSlot("OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__ClearCostumeSlot("OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__ClearCostumeSlot("OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__ClearCostumeSlot("OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__ClearCostumeSlot("OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__ClearCostumeSlot("OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__ClearCostumeSlot("OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__ClearCostumeSlot("OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__ClearCostumeSlot("OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__ClearCostumeSlot("OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__ClearCostumeSlot("OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * 衣装選択状態をクリアする（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __ClearCostumeSlot(objidPrifix) {

	var strObjId = "";
	var idx = 0;

	strObjId = objidPrifix + "_COSTUME";
	HtmlSetObjectValueById(strObjId, 0);
	SetStatefullData("DATA_" + strObjId, 0);
}





/************************************************************************************************
 *
 * 衣装選択セレクト再構築.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 装備領域ＩＤ
 * @param itemId 変更後のアイテムＩＤ
 * @param jobId 職業ID
 *-----------------------------------------------------------------------------------------------
 ************************************************************************************************/
function RebuildCostumeSelect(eqpRgnId, itemId, jobId) {

	var objidPrifix = "";
	var objSelect = null;
	var idx = 0;
	var objArySlots = new Array();



	// 装備か所ごとに対応するオブジェクトを取得
	switch (eqpRgnId) {

	case EQUIP_REGION_ID_ARMS:
		objidPrifix = "OBJID_ARMS_RIGHT";
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		objidPrifix = "OBJID_ARMS_LEFT";
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		objidPrifix = "OBJID_HEAD_TOP";
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		objidPrifix = "OBJID_HEAD_MID";
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		objidPrifix = "OBJID_HEAD_UNDER";
		break;

	case EQUIP_REGION_ID_SHIELD:
		objidPrifix = "OBJID_SHIELD";
		break;

	case EQUIP_REGION_ID_BODY:
		objidPrifix = "OBJID_BODY";
		break;

	case EQUIP_REGION_ID_SHOULDER:
		objidPrifix = "OBJID_SHOULDER";
		break;

	case EQUIP_REGION_ID_SHOES:
		objidPrifix = "OBJID_SHOES";
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		objidPrifix = "OBJID_ACCESSARY_1";
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		objidPrifix = "OBJID_ACCESSARY_2";
		break;
	}
	objSelect = HtmlGetElementById(objidPrifix);
	objArySlots.push(HtmlGetElementById(objidPrifix + "_COSTUME"));

	//----------------------------------------------------------------
	// 衣装欄の再構築
	//----------------------------------------------------------------

	// 項目の全削除
	for (var idx = 0; idx < objArySlots.length; idx++) {
		if (objArySlots[idx] == null) {
			continue;
		}

		HtmlRemoveAllChild(objArySlots[idx]);
	}

	// 衣装項目の追加
	BuildUpCostumeSlotsCostume(eqpRgnId, itemId, objArySlots, jobId);
}

/**
 * 衣装スロットの再構築（衣装項目）.
 */
function BuildUpCostumeSlotsCostume(eqpRgnId, itemId, objArySlots, jobId) {
	// 職業IDが引数で渡されなかった時用のコード
	if (typeof jobId === "undefined" || jobId === null) {
		jobId = document.getElementById("OBJID_SELECT_JOB").value;
	}
	let jobData = JobMap.getById(jobId);

	var idx = 0;
	var idxEquipable = 0;
	var slotidx = 0;
	var costumeKind = 0;
	var costumeSortObjTarget = null;
	var costumeIdSelected = 0;
	var costumeId = 0;
	var costumeName = "";
	var objSelect = null;

	var sortedCostumeObj = null;

	// 整列済み配列を用意
	sortedCostumeObj = CostumeOBJ.slice();

	sortedCostumeObj.sort(
		function(a, b) {
			if (a[COSTUME_DATA_INDEX_KANA] < b[COSTUME_DATA_INDEX_KANA]) return -1;
			if (a[COSTUME_DATA_INDEX_KANA] > b[COSTUME_DATA_INDEX_KANA]) return 1;
			return 0;
		}
	);

	// スロット配列分ループ
	for (slotidx = 0; slotidx < objArySlots.length; slotidx++) {

		// 装備箇所に応じた衣装データの追加
		switch (eqpRgnId) {

		case EQUIP_REGION_ID_HEAD_UNDER:
			costumeKind  = COSTUME_KIND_HEAD_UNDER;
			costumeIdSelected = n_A_costume[COSTUME_REGION_ID_HEAD_UNDER];
			break;

		}

		objSelect = objArySlots[slotidx];
		if (objSelect == null) {
			continue;
		}

		for (idx = 0; idx < sortedCostumeObj.length; idx++) {

			if (sortedCostumeObj[idx][COSTUME_DATA_INDEX_KIND] != costumeKind) {
				continue;
			}

			if (!jobData.IsEquipableEquipFlag(sortedCostumeObj[idx][COSTUME_DATA_INDEX_EQPFLG])) {
				continue;
			}

			costumeId = sortedCostumeObj[idx][COSTUME_DATA_INDEX_ID];
			costumeName = sortedCostumeObj[idx][COSTUME_DATA_INDEX_NAME];

			HtmlCreateElementOption(costumeId, costumeName, objSelect);
		}

		// 選択項目の復元
		objSelect.value = costumeIdSelected;
	}
}

/**
 * 衣装スロットの使用可否を設定する.
 */
function SetCostumeSlotEnabilityAll() {

	// 個別関数を全コール
	SetCostumeSlotEnability(EQUIP_REGION_ID_HEAD_UNDER);
}

function SetCostumeSlotEnability(eqpRgnId) {

	var strObjIdPrifix = "";

	var idx = 0;
	var strObjId = "";
	var objSelect = null;
	var usable = false;

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		strObjIdPrifix = "OBJID_ARMS_RIGHT";
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		strObjIdPrifix = "OBJID_ARMS_LEFT";
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		strObjIdPrifix = "OBJID_HEAD_TOP";
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		strObjIdPrifix = "OBJID_HEAD_MID";
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		strObjIdPrifix = "OBJID_HEAD_UNDER";
		break;

	case EQUIP_REGION_ID_SHIELD:
		strObjIdPrifix = "OBJID_SHIELD";
		break;

	case EQUIP_REGION_ID_BODY:
		strObjIdPrifix = "OBJID_BODY";
		break;

	case EQUIP_REGION_ID_SHOULDER:
		strObjIdPrifix = "OBJID_SHOULDER";
		break;

	case EQUIP_REGION_ID_SHOES:
		strObjIdPrifix = "OBJID_SHOES";
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		strObjIdPrifix = "OBJID_ACCESSARY_1";
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		strObjIdPrifix = "OBJID_ACCESSARY_2";
		break;
	}


	// 対象オブジェクトを特定
	strObjId = strObjIdPrifix + "_COSTUME";
	objSelect = HtmlGetElementById(strObjId);

	// 選択項目がひとつ（衣装なし／エンチャントなし）しかない場合、操作不可にする
	usable = objSelect.options.length > 1;

	// 強制条件
	// 左手は二刀流の場合のみ利用可能
	if (eqpRgnId == EQUIP_REGION_ID_ARMS_LEFT) {
		usable = ((usable) & (n_Nitou));
	}
	// 盾は二刀流の場合、利用不可
	if (eqpRgnId == EQUIP_REGION_ID_SHIELD) {
		usable = ((usable) & (!n_Nitou));
	}

	// サブ関数をコール
	__SetCostumeSlotEnability(objSelect, usable);
}

function __SetCostumeSlotEnability(objTarget, enabled) {

	if (objTarget == null) {
		return;
	}

	// 使用可否設定
	objTarget.disabled = !enabled;

	// 可視設定
	if (enabled) {
		objTarget.style.visibility = "visible";
	} else {
		objTarget.style.visibility = "hidden";
	}
}
