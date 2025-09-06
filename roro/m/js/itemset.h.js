
// ペットID指定のオフセット（カードと同じように指定するので、カードIDで実現しないぐらい大きな値を設定）
// TODO: いずれ修正予定
ITEM_SET_PET_ID_OFFSET = 10000;

const ITEMSET_ID_LIMIT_WITH_ITEM = 100;
const ITEMSET_ID_LIMIT_WITH_CARD = 100;

// アイテムセット定義配列
w_SE = new Array();

// アイテムIDからセットIDを検索するマップ
ItemIdToSetIdMap = new Array();

// カードIDからセットIDを検索するマップ
CardIdToSetIdMap = new Array();

// ペットIDからセットIDを検索するマップ
PetIdToSetIdMap = new Array();



/**
 * セットアイテムの構成メンバーのテキストを取得する.
 * @param setId セットID
 * @return 構成メンバーのテキスト
 */
function GetItemSetMemberText(setId){

	var idxMember = 0;

	var setData = null;
	var memberId = 0;
	var dataId = 0;
	var dataName = "";

	var memberText = "";



	// セット定義データ取得
	setData = w_SE[setId];

	for (idxMember = 1; idxMember < setData.length; idxMember++) {

		// TODO: 削除予定
		if (setData[idxMember] == "NULL") {
			continue;
		}

		// メンバー指定IDを取得
		memberId = setData[idxMember];

		// データIDを特定
		dataId = Math.abs(memberId);

		// アイテム指定の場合
		if (memberId > 0) {
			dataName = ItemObjNew[dataId][ITEM_DATA_INDEX_NAME];
		}

		// ペット指定の場合
		else if (memberId < (ITEM_SET_PET_ID_OFFSET * -1)) {

			dataId -= ITEM_SET_PET_ID_OFFSET;

			dataName = "キューペット「" + PET_OBJ[dataId][PET_DATA_INDEX_NAME] + "」";
		}

		// カード指定の場合
		else {
			dataName = CardObjNew[dataId][CARD_DATA_INDEX_NAME];

			// エンチャントでない場合は、末尾に "C" を付与
			if (CardObjNew[dataId][CARD_DATA_INDEX_KIND] != CARD_KIND_ENCHANT) {
				dataName += "C";
			}

			// エンチャントの場合は、末尾に "(エンチャント)" を付与
			else {
				dataName += "(エンチャント)";
			}
		}

		if (memberText.length > 0) {
			memberText += "＋";
		}

		memberText += "【" + dataName + "】";
	}

	// TODO: 矢が構成品目のケース（いずれ統合予定）
	if (2356 <= setData[0] && setData[0] <= 2359) {
		// TODO: なぜかカナに名称が設定されている
		memberText += "＋【"+ ItemObjNew[setData[0]][ITEM_DATA_INDEX_KANA] +"】";
	}

	return memberText;
}



/**
 * セットの装備状況を検査し、適用する.
 */
function CheckAndApplyItemSetEquipping() {

	var idx = 0;
	var idxMember = 0;

	var setData = null;
	var setSourceId = 0;
	var memberId = 0;
	var dataId = 0;

	var equippedItemIdArray = null;
	var equippedCardIdArray = null;

	var modifiedItemIdArray = null;
	var modifiedCardIdArray = null;

	// 装備済みID配列を用意
	equippedItemIdArray = n_A_Equip.slice(0, EQUIP_REGION_ID_COUNT);
	equippedCardIdArray = n_A_card.slice(0, CARD_REGION_ID_COUNT);

	// 加工用ID配列を用意
	modifiedItemIdArray = n_A_Equip.slice(0, EQUIP_REGION_ID_COUNT);
	modifiedCardIdArray = n_A_card.slice(0, CARD_REGION_ID_COUNT);

	// すべてのセット定義をループ
	for (idx = 0; idx < w_SE.length; idx++) {

		// セット定義データ取得
		setData = w_SE[idx];

		// 無効な定義はスキップ
		if (setData.length <= 1) {
			continue;
		}

		for (idxMember = 1; idxMember < setData.length; idxMember++) {

			// TODO: 削除予定
			if (setData[idxMember] == "NULL") {
				continue;
			}

			// メンバー指定IDを取得
			memberId = setData[idxMember];

			// データIDを特定
			dataId = Math.abs(memberId);

			// アイテム指定の場合
			if (memberId > 0) {

				// 装備していなければ、処理打ち切り
				if (equippedItemIdArray.indexOf(dataId) < 0) {
					break;
				}

				// TODO: データ移行過渡処理
				// 移行後データに定義がある場合は、処理打ち切り
				if (IsEnableMigrationBlockTransit()) {
					// 移行データが定義されているものは、処理打ち切り
					if (g_constDataManager.itemDataManager.GetRegisteredIdArray().indexOf(dataId) >= 0) {
						break;
					}
				}
			}

			// ペット指定の場合
			else if (memberId < (ITEM_SET_PET_ID_OFFSET * -1)) {

				dataId -= ITEM_SET_PET_ID_OFFSET;

				// 装備していなければ、処理打ち切り
				if (n_A_PassSkill8[0] != dataId) {
					break;
				}
			}

			// カード指定の場合
			else {
				// 装備していなければ、処理打ち切り
				if (equippedCardIdArray.indexOf(dataId) < 0) {
					break;
				}
			}
		}

		// 全メンバーを装備していない場合は、次へ
		if (idxMember != setData.length) {
			continue;
		}

		// セット定義IDを取得
		setSourceId = setData[0];

		// アイテムでの定義の場合
		if (setSourceId > 0) {
			modifiedItemIdArray.push(Math.abs(setSourceId));
		}

		// カードでの定義の場合
		else {
			modifiedCardIdArray.push(Math.abs(setSourceId));
		}
	}

	// 領域の空きを埋める
	while (modifiedItemIdArray.length < ITEMSET_ID_LIMIT_WITH_ITEM) {	// セットが増えたらこの上限が増える可能性がある
		modifiedItemIdArray.push(ITEM_ID_NOEQUIP_SET);
	}
	while (modifiedCardIdArray.length < ITEMSET_ID_LIMIT_WITH_CARD) {
		modifiedCardIdArray.push(CARD_ID_NONE);
	}

	// 補正した配列を、本来の配列に設定
	n_A_Equip = modifiedItemIdArray;
	n_A_card = modifiedCardIdArray;
}
