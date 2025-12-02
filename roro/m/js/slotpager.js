//================================================================================================
//
// 定数定義
//
//================================================================================================

SLOTPAGER_MODE_CARD = 0;
SLOTPAGER_MODE_RNDENCH = 1;
SLOTPAGER_MODE_RNDOPT = 1;		// 1 のエイリアス

SLOT_INDEX_CARD_MIN = 1;
SLOT_INDEX_CARD_MAX = 4;

SLOT_INDEX_COSTUME_MIN = 1;
SLOT_INDEX_COSTUME_MAX = 1;

SLOT_INDEX_RNDENCH_MIN = 1;
SLOT_INDEX_RNDENCH_MAX = 5;


//================================================================================================
//
// グローバル変数定義
//
//================================================================================================




//================================================================================================
//
// 処理
//
//================================================================================================

/************************************************************************************************
 *
 * 現在のスロットモードを取得する.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return 現在のスロットモード
 ************************************************************************************************/
function GetSlotMode() {
	return parseInt(GetStatefullData("DATA_OBJID_SLOT_MODE_BUTTON", 0));
}





/************************************************************************************************
 *
 * スロットモードボタン　クリックイベントハンドラ.
 *
 *-----------------------------------------------------------------------------------------------
 * @param jobId 職業ID
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function OnClickSlotModeButton(jobId) {
	// 職業IDが引数で渡されなかった時用のコード
	if (typeof jobId === "undefined" || jobId === null) {
		const selectJobElem = document.getElementById("OBJID_SELECT_JOB");
		jobId = selectJobElem.value;
	}

	var slotModeNow = GetSlotMode();


	// 現在のモードがカードの場合、ランダムエンチャントに切り替える
	if (slotModeNow == SLOTPAGER_MODE_CARD) {

		// カードの選択状態を保持
		SaveSlotStateCardAll();

		// 衣装の選択状態を保持
		SaveSlotStateCostumeAll();

		// カード欄を破棄
		BreakSlotOfCardAll();

		// 衣装欄を破棄
		BreakSlotOfCostumeAll();

		// ランダムエンチャント欄を再構築
		RebuildSlotAsRndEnchAll();

		// 使用可否を設定
		SetRndOptEnablityAll();
		// SetEnchSlotsEnablity();

		// ランダムエンチャント選択状態を復元
		LoadSlotStateRndEnchAll();

		// モードのフラグを更新
		SetStatefullData("DATA_OBJID_SLOT_MODE_BUTTON", 1);
	}

	// 現在のモードがランダムエンチャントの場合、カードに切り替える
	else {
		// ランダムエンチャントの選択状態を保持
		SaveSlotStateRndEnchAll();

		// ランダムエンチャント欄を破棄
		BreakSlotOfRndEnchAll();

		// カード欄を再構築
		RebuildSlotAsCardAll();

		// 使用可否を設定
		SetCardSlotEnabilityAll();

		// 衣装欄を再構築
		RebuildSlotAsCostumeAll(jobId);

		// 使用可否を設定
		SetCostumeSlotEnabilityAll();

		// カードの選択状態を復元
		LoadSlotStateCardAll();

		// 衣装の選択状態を復元
		LoadSlotStateCostumeAll();

		// モードのフラグを更新
		SetStatefullData("DATA_OBJID_SLOT_MODE_BUTTON", 0);
	}

	// 検索可能リスト更新
	LoadSelect2();
}





/************************************************************************************************
 *
 * スロットの選択状態を保存する（カード用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function SaveSlotStateCardAll() {

	// 個別関数を全コール
	SaveSlotStateCard(EQUIP_REGION_ID_ARMS);
	SaveSlotStateCard(EQUIP_REGION_ID_ARMS_LEFT);
	SaveSlotStateCard(EQUIP_REGION_ID_HEAD_TOP);
	SaveSlotStateCard(EQUIP_REGION_ID_HEAD_MID);
	SaveSlotStateCard(EQUIP_REGION_ID_HEAD_UNDER);
	SaveSlotStateCard(EQUIP_REGION_ID_SHIELD);
	SaveSlotStateCard(EQUIP_REGION_ID_BODY);
	SaveSlotStateCard(EQUIP_REGION_ID_SHOULDER);
	SaveSlotStateCard(EQUIP_REGION_ID_SHOES);
	SaveSlotStateCard(EQUIP_REGION_ID_ACCESSARY_1);
	SaveSlotStateCard(EQUIP_REGION_ID_ACCESSARY_2);

	SaveSlotStateCard(EQUIP_REGION_ID_SHADOW_ARMS_RIGHT);
	SaveSlotStateCard(EQUIP_REGION_ID_SHADOW_ARMS_LEFT);
	SaveSlotStateCard(EQUIP_REGION_ID_SHADOW_BODY);
	SaveSlotStateCard(EQUIP_REGION_ID_SHADOW_FOOT);
	SaveSlotStateCard(EQUIP_REGION_ID_SHADOW_ACCESSARY_1);
	SaveSlotStateCard(EQUIP_REGION_ID_SHADOW_ACCESSARY_2);
	
}

/************************************************************************************************
 *
 * スロットの選択状態を保存する（カード用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function SaveSlotStateCard(eqpRgnId) {

	const EQUIP_REGION = {
		[EQUIP_REGION_ID_ARMS]:"OBJID_ARMS_RIGHT",
		[EQUIP_REGION_ID_ARMS_LEFT]:"OBJID_ARMS_LEFT",
		[EQUIP_REGION_ID_HEAD_TOP]:"OBJID_HEAD_TOP",
		[EQUIP_REGION_ID_HEAD_MID]:"OBJID_HEAD_MID",
		[EQUIP_REGION_ID_HEAD_UNDER]:"OBJID_HEAD_UNDER",
		[EQUIP_REGION_ID_SHIELD]:"OBJID_SHIELD",
		[EQUIP_REGION_ID_BODY]:"OBJID_BODY",
		[EQUIP_REGION_ID_SHOULDER]:"OBJID_SHOULDER",
		[EQUIP_REGION_ID_SHOES]:"OBJID_SHOES",
		[EQUIP_REGION_ID_ACCESSARY_1]:"OBJID_ACCESSARY_1",
		[EQUIP_REGION_ID_ACCESSARY_2]:"OBJID_ACCESSARY_2",
		[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT]:"OBJID_SHADOW_ARMS_RIGHT",
		[EQUIP_REGION_ID_SHADOW_ARMS_LEFT]:"OBJID_SHADOW_SHIELD",
		[EQUIP_REGION_ID_SHADOW_BODY]:"OBJID_SHADOW_BODY",
		[EQUIP_REGION_ID_SHADOW_FOOT]:"OBJID_SHADOW_SHOES",
		[EQUIP_REGION_ID_SHADOW_ACCESSARY_1]:"OBJID_SHADOW_ACCESSARY-1",
		[EQUIP_REGION_ID_SHADOW_ACCESSARY_2]:"OBJID_SHADOW_ACCESSARY-2",
	}

	__SaveSlotStateCard(EQUIP_REGION[eqpRgnId]);
}

/************************************************************************************************
 *
 * スロットの選択状態を保存する（カード用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __SaveSlotStateCard(objidPrefix) {

	var idx = 0;
	var strObjId = "";
	var valueOfObject = 0;

	var rgnText = objidPrefix.replace(/^OBJID_/, "");
	var objOptgroup = null;
	var enchListId = 0;
	var enchListIdText = 0;
	var enchListIdArray = null;

	// 当該プリフィクスを持つすべてのスロットの選択状態を保存
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
		strObjId = objidPrefix + "_CARD_" + idx;
		valueOfObject = HtmlGetObjectValueByIdAsInteger(strObjId, 0);
		SetStatefullData("DATA_" + strObjId, valueOfObject);

		// エンチャントリストIDの取得
		enchListId = 0;
		objOptgroup = HtmlGetSelectedOptgroup(strObjId, null, null);
		if (objOptgroup) {
			if (objOptgroup.hasAttribute("data-ench-list-id")) {
				enchListIdText = objOptgroup.getAttribute("data-ench-list-id");
				if (!isNaN(enchListIdText)) {
					enchListId = Math.floor(Number(enchListIdText));
				}
			}
		}

		enchListIdArray = g_charaData.cardCategoryMap.get(rgnText);
		if (!enchListIdArray) {
			enchListIdArray = [0, 0, 0, 0];
			g_charaData.cardCategoryMap.set(rgnText, enchListIdArray);
		}

		enchListIdArray[idx - SLOT_INDEX_CARD_MIN] = enchListId;
	}
}





/************************************************************************************************
 *
 * スロット欄を破棄する（カード用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function BreakSlotOfCardAll() {

	// 個別関数を全コール
	BreakSlotOfCard(EQUIP_REGION_ID_ARMS);
	BreakSlotOfCard(EQUIP_REGION_ID_ARMS_LEFT);
	BreakSlotOfCard(EQUIP_REGION_ID_HEAD_TOP);
	BreakSlotOfCard(EQUIP_REGION_ID_HEAD_MID);
	BreakSlotOfCard(EQUIP_REGION_ID_HEAD_UNDER);
	BreakSlotOfCard(EQUIP_REGION_ID_SHIELD);
	BreakSlotOfCard(EQUIP_REGION_ID_BODY);
	BreakSlotOfCard(EQUIP_REGION_ID_SHOULDER);
	BreakSlotOfCard(EQUIP_REGION_ID_SHOES);
	BreakSlotOfCard(EQUIP_REGION_ID_ACCESSARY_1);
	BreakSlotOfCard(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロット欄を破棄する（カード用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function BreakSlotOfCard(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__BreakSlotOfCard("OBJID_ARMS_RIGHT");
		__BreakSlotOfCardShort("OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__BreakSlotOfCard("OBJID_ARMS_LEFT");
		__BreakSlotOfCardShort("OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__BreakSlotOfCard("OBJID_HEAD_TOP");
		__BreakSlotOfCardShort("OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__BreakSlotOfCard("OBJID_HEAD_MID");
		__BreakSlotOfCardShort("OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__BreakSlotOfCard("OBJID_HEAD_UNDER");
//		__BreakSlotOfCardShort("OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__BreakSlotOfCard("OBJID_SHIELD");
		__BreakSlotOfCardShort("OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__BreakSlotOfCard("OBJID_BODY");
		__BreakSlotOfCardShort("OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__BreakSlotOfCard("OBJID_SHOULDER");
		__BreakSlotOfCardShort("OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__BreakSlotOfCard("OBJID_SHOES");
		__BreakSlotOfCardShort("OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__BreakSlotOfCard("OBJID_ACCESSARY_1");
		__BreakSlotOfCardShort("OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__BreakSlotOfCard("OBJID_ACCESSARY_2");
		__BreakSlotOfCardShort("OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロット欄を破棄する（カード用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __BreakSlotOfCard(objidPrifix) {

	var idx = 0;
	var strObjId = "";

	// 当該プリフィクスを持つすべてのスロットを削除
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
		strObjId = objidPrifix + "_CARD_TD_" + idx;
		HtmlRemoveFromParent(HtmlGetElementById(strObjId));
	}
}

/************************************************************************************************
 *
 * スロット欄を破棄する（カードショートカット用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __BreakSlotOfCardShort(objidPrifix) {

	var strObjId = "";

	strObjId = objidPrifix + "_CARD_SHORT_TD";
	HtmlRemoveFromParent(HtmlGetElementById(strObjId));
}





/************************************************************************************************
 *
 * スロット欄を再構築する（カード用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildSlotAsCardAll() {

	// 個別関数を全コール
	RebuildSlotAsCard(EQUIP_REGION_ID_ARMS);
	RebuildSlotAsCard(EQUIP_REGION_ID_ARMS_LEFT);
	RebuildSlotAsCard(EQUIP_REGION_ID_HEAD_TOP);
	RebuildSlotAsCard(EQUIP_REGION_ID_HEAD_MID);
	RebuildSlotAsCard(EQUIP_REGION_ID_HEAD_UNDER);
	RebuildSlotAsCard(EQUIP_REGION_ID_SHIELD);
	RebuildSlotAsCard(EQUIP_REGION_ID_BODY);
	RebuildSlotAsCard(EQUIP_REGION_ID_SHOULDER);
	RebuildSlotAsCard(EQUIP_REGION_ID_SHOES);
	RebuildSlotAsCard(EQUIP_REGION_ID_ACCESSARY_1);
	RebuildSlotAsCard(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロット欄を再構築する（カード用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildSlotAsCard(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_ARMS_RIGHT");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_ARMS_LEFT");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_HEAD_TOP");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_HEAD_MID");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_HEAD_UNDER");
//		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_SHIELD");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_BODY");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_SHOULDER");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_SHOES");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_ACCESSARY_1");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__RebuildSlotAsCard(eqpRgnId, "OBJID_ACCESSARY_2");
		__RebuildSlotAsCardShort(eqpRgnId, "OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロット欄を再構築する（カード用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __RebuildSlotAsCard(eqpRgnId, objidPrifix) {

	var objRoot = null;
	var objTd = null;
	var objSelect = null;

	var idx = 0;
	var itemId = 0;

	var idxMinCard = 1;
	var idxMaxCard = 4;

	// スロット欄のルートオブジェクトを取得
	objRoot = HtmlGetElementById(objidPrifix + "_SLOT_ROOT");
	if (objRoot == null) {
		return;
	}

	// 当該プリフィクスを持つすべてのスロットを再構築
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {

		// カード欄TDエレメント
		objTd = HtmlCreateElement("td", objRoot);
		HtmlSetAttribute(objTd, "id", objidPrifix + "_CARD_TD_" + idx);
		HtmlSetAttribute(objTd, "colspan", "2");

		// カード選択セレクトボックス
		objSelect = HtmlCreateElement("select", objTd);
		HtmlSetAttribute(objSelect, "id", objidPrifix + "_CARD_" + idx);
		HtmlSetAttribute(objSelect, "onChange", "OnChangeCard(this.value) | AutoCalc()");

		// カード選択セレクトボックスの再構築
		itemId = GetStatefullData("DATA_" + objidPrifix, 0);
		RebuildCardSelect(eqpRgnId, itemId);
	}
}

/************************************************************************************************
 *
 * スロット欄を再構築する（カードショートカット用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __RebuildSlotAsCardShort(eqpRgnId, objidPrifix) {

	var strOnChange = "";
	strOnChange = "ApplyCardShort(" + eqpRgnId + ", \"" + objidPrifix + "\")";

	var objRoot = null;
	var objTd = null;
	var objSelect = null;

	var idx = 0;
	var bVisible = false;

	// スロット欄のルートオブジェクトを取得
	objRoot = HtmlGetElementById(objidPrifix + "_SLOT_ROOT");
	if (objRoot == null) {
		return;
	}

	// カード欄TDエレメント
	objTd = HtmlCreateElement("td", objRoot);
	HtmlSetAttribute(objTd, "id", objidPrifix + "_CARD_SHORT_TD");
	HtmlSetAttribute(objTd, "colspan", "2");

	// 武器以外は処理終了
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		bVisible = true;
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		bVisible = n_Nitou;
		break;

	default:
		return;
	}

	// カード選択セレクトボックス
	objSelect = HtmlCreateElement("select", objTd);
	HtmlSetAttribute(objSelect, "id", objidPrifix + "_CARD_SHORT");
	HtmlSetAttribute(objSelect, "onChange", strOnChange + "| AutoCalc()");
	if (bVisible) {
		objSelect.removeAttribute("disabled");
		objSelect.setAttribute("style", "visibility : visible");
	}
	else {
		objSelect.setAttribute("disabled", "disabled");
		objSelect.setAttribute("style", "visibility : hidden");
	}

	// カード選択セレクトボックスの再構築
	for (idx = 0; idx < CardShortObj.length; idx++) {
		HtmlCreateElementOption(idx, CardShortObj[idx][0], objSelect);
	}
}




/************************************************************************************************
 *
 * スロット欄の選択状態を復元する（カード用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function LoadSlotStateCardAll() {

	// 個別関数を全コール
	LoadSlotStateCard(EQUIP_REGION_ID_ARMS);
	LoadSlotStateCard(EQUIP_REGION_ID_ARMS_LEFT);
	LoadSlotStateCard(EQUIP_REGION_ID_HEAD_TOP);
	LoadSlotStateCard(EQUIP_REGION_ID_HEAD_MID);
	LoadSlotStateCard(EQUIP_REGION_ID_HEAD_UNDER);
	LoadSlotStateCard(EQUIP_REGION_ID_SHIELD);
	LoadSlotStateCard(EQUIP_REGION_ID_BODY);
	LoadSlotStateCard(EQUIP_REGION_ID_SHOULDER);
	LoadSlotStateCard(EQUIP_REGION_ID_SHOES);
	LoadSlotStateCard(EQUIP_REGION_ID_ACCESSARY_1);
	LoadSlotStateCard(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロットの選択状態を復元する（カード用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function LoadSlotStateCard(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__LoadSlotStateCard("OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__LoadSlotStateCard("OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__LoadSlotStateCard("OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__LoadSlotStateCard("OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__LoadSlotStateCard("OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__LoadSlotStateCard("OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__LoadSlotStateCard("OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__LoadSlotStateCard("OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__LoadSlotStateCard("OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__LoadSlotStateCard("OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__LoadSlotStateCard("OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロットの選択状態を復元する（カード用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __LoadSlotStateCard(objidPrifix) {

	var idx = 0;
	var valueOfObject = 0;

	// 当該プリフィクスを持つすべてのスロットを復元
	for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
		valueOfObject = GetStatefullData("DATA_" + objidPrifix + "_CARD_" + idx, 0);
		HtmlSetObjectValueById(objidPrifix + "_CARD_" + idx, valueOfObject);
	}
}





/************************************************************************************************
 *
 * スロットの選択状態を保存する（衣装用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function SaveSlotStateCostumeAll() {

	// 個別関数を全コール
	SaveSlotStateCostume(EQUIP_REGION_ID_HEAD_UNDER);
}

/************************************************************************************************
 *
 * スロットの選択状態を保存する（衣装用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function SaveSlotStateCostume(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__SaveSlotStateCostume("OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__SaveSlotStateCostume("OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__SaveSlotStateCostume("OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__SaveSlotStateCostume("OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__SaveSlotStateCostume("OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__SaveSlotStateCostume("OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__SaveSlotStateCostume("OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__SaveSlotStateCostume("OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__SaveSlotStateCostume("OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__SaveSlotStateCostume("OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__SaveSlotStateCostume("OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロットの選択状態を保存する（衣装用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __SaveSlotStateCostume(objidPrefix) {

	var idx = 0;
	var strObjId = "";
	var valueOfObject = 0;

	// 当該プリフィクスを持つすべてのスロットの選択状態を保存
	for (idx = SLOT_INDEX_COSTUME_MIN; idx <= SLOT_INDEX_COSTUME_MAX; idx++) {
		strObjId = objidPrefix + "_COSTUME";
		valueOfObject = HtmlGetObjectValueByIdAsInteger(strObjId, 0);
		SetStatefullData("DATA_" + strObjId, valueOfObject);
	}
}





/************************************************************************************************
 *
 * スロット欄を破棄する（衣装用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function BreakSlotOfCostumeAll() {

	// 個別関数を全コール
	BreakSlotOfCostume(EQUIP_REGION_ID_HEAD_UNDER);
}

/************************************************************************************************
 *
 * スロット欄を破棄する（衣装用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function BreakSlotOfCostume(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__BreakSlotOfCostume("OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__BreakSlotOfCostume("OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__BreakSlotOfCostume("OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__BreakSlotOfCostume("OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__BreakSlotOfCostume("OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__BreakSlotOfCostume("OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__BreakSlotOfCostume("OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__BreakSlotOfCostume("OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__BreakSlotOfCostume("OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__BreakSlotOfCostume("OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__BreakSlotOfCostume("OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロット欄を破棄する（衣装用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __BreakSlotOfCostume(objidPrifix) {

	var idx = 0;
	var strObjId = "";

	// 当該プリフィクスを持つすべてのスロットを削除
	for (idx = SLOT_INDEX_COSTUME_MIN; idx <= SLOT_INDEX_COSTUME_MAX; idx++) {
		strObjId = objidPrifix + "_COSTUME_TD_" + idx;
		HtmlRemoveFromParent(HtmlGetElementById(strObjId));
	}
}





/************************************************************************************************
 *
 * スロット欄を再構築する（衣装用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param jobId 職業ID
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildSlotAsCostumeAll(jobId) {
	// 個別関数を全コール
	RebuildSlotAsCostume(EQUIP_REGION_ID_HEAD_UNDER, jobId);
}

/************************************************************************************************
 *
 * スロット欄を再構築する（衣装用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param jobId 職業ID
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildSlotAsCostume(eqpRgnId, jobId) {
	// 職業IDが引数で渡されなかった時用のコード
	if (typeof jobId === "undefined" || jobId === null) {
		jobId = document.getElementById("OBJID_SELECT_JOB").value;
	}

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_ARMS_RIGHT", jobId);
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_ARMS_LEFT", jobId);
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_HEAD_TOP", jobId);
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_HEAD_MID", jobId);
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_HEAD_UNDER", jobId);
		break;

	case EQUIP_REGION_ID_SHIELD:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_SHIELD", jobId);
		break;

	case EQUIP_REGION_ID_BODY:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_BODY", jobId);
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_SHOULDER", jobId);
		break;

	case EQUIP_REGION_ID_SHOES:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_SHOES", jobId);
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_ACCESSARY_1", jobId);
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__RebuildSlotAsCostume(eqpRgnId, "OBJID_ACCESSARY_2", jobId);
		break;
	}
}

/************************************************************************************************
 *
 * スロット欄を再構築する（衣装用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 * @param jobId 職業ID
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __RebuildSlotAsCostume(eqpRgnId, objidPrifix, jobId) {

	var objRoot = null;
	var objTd = null;
	var objSelect = null;

	var idx = 0;
	var itemId = 0;

	// スロット欄のルートオブジェクトを取得
	objRoot = HtmlGetElementById(objidPrifix + "_SLOT_ROOT");
	if (objRoot == null) {
		return;
	}

	// 当該プリフィクスを持つすべてのスロットを再構築
	for (idx = SLOT_INDEX_COSTUME_MIN; idx <= SLOT_INDEX_COSTUME_MAX; idx++) {

		// 衣装欄TDエレメント
		objTd = HtmlCreateElement("td", objRoot);
		HtmlSetAttribute(objTd, "id", objidPrifix + "_COSTUME_TD_" + idx);
		HtmlSetAttribute(objTd, "colspan", "2");

		// 衣装選択セレクトボックス
		objSelect = HtmlCreateElement("select", objTd);
		HtmlSetAttribute(objSelect, "id", objidPrifix + "_COSTUME");
		HtmlSetAttribute(objSelect, "onChange", "OnChangeCostume(this.value)");

		// 衣装選択セレクトボックスの再構築
		itemId = GetStatefullData("DATA_" + objidPrifix, 0);
		RebuildCostumeSelect(eqpRgnId, itemId, jobId);
	}
}




/************************************************************************************************
 *
 * スロット欄の選択状態を復元する（衣装用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function LoadSlotStateCostumeAll() {

	// 個別関数を全コール
	LoadSlotStateCostume(EQUIP_REGION_ID_HEAD_UNDER);
}

/************************************************************************************************
 *
 * スロットの選択状態を復元する（衣装用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function LoadSlotStateCostume(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__LoadSlotStateCostume("OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__LoadSlotStateCostume("OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__LoadSlotStateCostume("OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__LoadSlotStateCostume("OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__LoadSlotStateCostume("OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__LoadSlotStateCostume("OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__LoadSlotStateCostume("OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__LoadSlotStateCostume("OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__LoadSlotStateCostume("OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__LoadSlotStateCostume("OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__LoadSlotStateCostume("OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロットの選択状態を復元する（衣装用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrefix オブジェクトＩＤのプリフィックス
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __LoadSlotStateCostume(objidPrifix) {

	var idx = 0;
	var valueOfObject = 0;

	// 当該プリフィクスを持つすべてのスロットを復元
	for (idx = SLOT_INDEX_COSTUME_MIN; idx <= SLOT_INDEX_COSTUME_MAX; idx++) {
		valueOfObject = GetStatefullData("DATA_" + objidPrifix + "_COSTUME", 0);
		HtmlSetObjectValueById(objidPrifix + "_COSTUME", valueOfObject);
	}
}





/************************************************************************************************
 *
 * スロットの選択状態を保存する（ランダムエンチャント用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function SaveSlotStateRndEnchAll() {

	// 個別関数を全コール
	SaveSlotStateRndEnch(EQUIP_REGION_ID_ARMS);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_ARMS_LEFT);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_HEAD_TOP);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_HEAD_MID);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_HEAD_UNDER);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_SHIELD);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_BODY);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_SHOULDER);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_SHOES);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_ACCESSARY_1);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロットの選択状態を保存する（ランダムエンチャント用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function SaveSlotStateRndEnch(eqpRgnId) {

	var idx = 0;

	var objIdKind = "";
	var rndOptId = 0;

	var objIdValue = "";
	var rndOptValue = 0;

	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// ランダムオプション種別
		objIdKind = GetObjectIdRndOptKind(eqpRgnId, idx);
		rndOptId = HtmlGetObjectValueByIdAsInteger(objIdKind, 0);

		// ランダムオプション値
		objIdValue = GetObjectIdRndOptValue(eqpRgnId, idx)
		rndOptValue = HtmlGetObjectValueByIdAsInteger(objIdValue, 0);

		// 変数も更新
		SetEquipRndOptTable(eqpRgnId, idx, rndOptId, rndOptValue);
	}
}




/************************************************************************************************
 *
 * スロット欄を破棄する（ランダムエンチャント用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function BreakSlotOfRndEnchAll() {

	// 個別関数を全コール
	BreakSlotOfRndEnch(EQUIP_REGION_ID_ARMS);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_ARMS_LEFT);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_HEAD_TOP);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_HEAD_MID);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_HEAD_UNDER);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_SHIELD);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_BODY);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_SHOULDER);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_SHOES);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_ACCESSARY_1);
	BreakSlotOfRndEnch(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロット欄を破棄する（ランダムエンチャント用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function BreakSlotOfRndEnch(eqpRgnId) {


	var idx = 0;

	var objIdKindTD = "";
	var objIdValueTD = "";



	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// ランダムオプション種別
		objIdKindTD = GetObjectIdRndOptKindTD(eqpRgnId, idx)
		HtmlRemoveFromParent(HtmlGetElementById(objIdKindTD));

		// ランダムオプション値
		objIdValueTD = GetObjectIdRndOptValueTD(eqpRgnId, idx)
		HtmlRemoveFromParent(HtmlGetElementById(objIdValueTD));
	}

	return;
}



/************************************************************************************************
 *
 * スロット欄を再構築する（ランダムエンチャント用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildSlotAsRndEnchAll() {

	// 個別関数を全コール
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_ARMS);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_ARMS_LEFT);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_HEAD_TOP);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_HEAD_MID);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_HEAD_UNDER);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_SHIELD);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_BODY);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_SHOULDER);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_SHOES);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_ACCESSARY_1);
	RebuildSlotAsRndEnch(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロット欄を再構築する（ランダムエンチャント用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildSlotAsRndEnch(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_ARMS_RIGHT");
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_ARMS_LEFT");
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_HEAD_TOP");
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_HEAD_MID");
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_HEAD_UNDER");
		break;

	case EQUIP_REGION_ID_SHIELD:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_SHIELD");
		break;

	case EQUIP_REGION_ID_BODY:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_BODY");
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_SHOULDER");
		break;

	case EQUIP_REGION_ID_SHOES:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_SHOES");
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_ACCESSARY_1");
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__RebuildSlotAsRndEnch(eqpRgnId, "OBJID_ACCESSARY_2");
		break;
	}
}

/************************************************************************************************
 *
 * スロット欄を再構築する（ランダムエンチャント用）（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __RebuildSlotAsRndEnch(eqpRgnId, objidPrifix) {

	RebuildRndOptSelect(eqpRgnId, GetStatefullData("DATA_" + objidPrifix, 0));
}





/************************************************************************************************
 *
 * スロットの選択状態を復元する（ランダムエンチャント用）（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function LoadSlotStateRndEnchAll() {

	// 個別関数を全コール
	LoadSlotStateRndEnch(EQUIP_REGION_ID_ARMS);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_ARMS_LEFT);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_HEAD_TOP);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_HEAD_MID);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_HEAD_UNDER);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_SHIELD);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_BODY);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_SHOULDER);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_SHOES);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_ACCESSARY_1);
	LoadSlotStateRndEnch(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * スロットの選択状態を復元する（ランダムエンチャント用）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function LoadSlotStateRndEnch(eqpRgnId) {

	var idx = 0;

	var objIdKind = "";
	var objIdValue = "";

	var rndOptId = 0;
	var rndOptValue = 0;

	var objRndOptValue = null;

	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// オブジェクトIDを取得
		objIdKind = GetObjectIdRndOptKind(eqpRgnId, idx);
		objIdValue = GetObjectIdRndOptValue(eqpRgnId, idx)

		// ランダムオプション種別
		rndOptId = GetEquipRndOptTableKind(eqpRgnId, idx);
		HtmlSetObjectValueById(objIdKind, rndOptId);

		// 値選択セレクトボックスを取得し、再構築
		objRndOptValue = document.getElementById(objIdValue);
		SetUpRndOptValue(objRndOptValue, rndOptId);

		// ランダムオプション値
		rndOptValue = GetEquipRndOptTableValue(eqpRgnId, idx);
		HtmlSetObjectValueById(objIdValue, rndOptValue);
	}
}
