
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();


/**
 * dat コーダークラス.
 */
function CDatCoder () {

}



/**
 * dat コード出力（共通処理）
 * @param dataArray データ配列
 * @return dat コード
 */
CDatCoder.ExtractDataArrayToDatCode = function (dataArray) {

	var idx = 0;

	var extractedText = "";

	var dataObject = null;
	var dataText = "";


	if (dataArray === undefined) {
		return "undefined";
	}


	for (idx = 0; idx < dataArray.length; idx++) {

		dataObject = dataArray[idx];

		if (idx > 0) {
			extractedText += ",";
		}

		if (dataObject == undefined) {
			dataText = "";
		}

		// 要素が配列の場合、再帰呼び出し
		else if (Array.isArray(dataObject)) {
			dataText = "[" + CDatCoder.ExtractDataArrayToDatCode(dataObject) + "]";
		}

		// 要素が配列でない場合、データ加工
		else {
			if (dataObject === "") {
				dataText = "\"" + dataObject + "\"";
			}
			else if (isNaN(dataObject)) {
				dataText = "\"" + dataObject.replace(/"/ig, "\\\"") + "\"";
			}
			else if (dataObject !== Number(dataObject)) {
				dataText = "\"" + dataObject + "\"";
			}
			else {
				dataText = dataObject;
			}
		}

		extractedText += dataText;
	}

	return extractedText;
};



/**
 * dat コード出力（アイテム用 2023/06/13 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeItem20230613 = function () {

	var idx = 0;

	var byKindMap = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumItemId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	byKindMap = new Map();
	datTextAll += "\t" + "ItemObjNew = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < ItemObjOrg.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(ItemObjOrg[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";

		// IDを該当するアイテムタイプの配列に追加
		const itemKind = ItemObjOrg[idx][ITEM_DATA_INDEX_KIND];
		let idArray = byKindMap.get(itemKind);
		if (idArray === undefined) {
			idArray = [];
			byKindMap.set(itemKind, idArray);
		}
		idArray.push(ItemObjOrg[idx][ITEM_DATA_INDEX_ID]);
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 種類別ID配列
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_ItemIdArrayByKind = [];" + "\n";

	itr = byKindMap.entries();
	while (itrated = itr.next()) {

		if (itrated.done) {
			break;
		}

		const kindId = itrated.value[0];
		const idArray = itrated.value[1];

		datTextAll += "\t" + "g_ItemIdArrayByKind[" + kindId + "] = [" + idArray.join(",") + "];" + "\n";
	}

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（スキル用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeSkill20200525 = function () {

	var idx = 0;
	var idxData = 0;

	var jobSkillData = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumSkillId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "SkillObjNew = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < SkillObjNew.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(SkillObjNew[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 職業スキルデータ（パッシブ）定義部
	//----------------------------------------------------------------

	// 四次対応　計算機内部構造変更　出力しないように



	//----------------------------------------------------------------
	// 職業スキルデータ（アクティブ）定義部
	//----------------------------------------------------------------

	// 四次対応　計算機内部構造変更　出力しないように



	//----------------------------------------------------------------
	// 職業スキルデータ（習得スキル）定義部
	//----------------------------------------------------------------

	// 四次対応　計算機内部構造変更　出力しないように



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（使用可能スキル用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeUsableSkill20200525 = function () {

	var idx = 0;
	var idxData = 0;

	var jobUsableSkillData = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumUsableSkillId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "InsertSkill = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < InsertSkill.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(InsertSkill[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（オートスペル用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeAutoSpell20200525 = function () {

	var idx = 0;
	var idxData = 0;

	var jobAutoSpellData = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumAutoSpellId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "AutoSpellSkill = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < AutoSpellSkill.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(AutoSpellSkill[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（矢用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeArrow20200510 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumArrowId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "ArrowOBJNew = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < ArrowOBJNew.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(ArrowOBJNew[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（カード用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeCard20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumCardId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "CardObjNew = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < CardObjOrg.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(CardObjOrg[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 整列データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "CardSortOBJ = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < CardSortOBJ.length; idx++) {

		datTextAll += "\t\t" + "[";

		for (idxData = 0; idxData < CardSortOBJ[idx].length; idxData++) {
			if (idxData > 0) {
				datTextAll += ",";
			}
			datTextAll += CardSortOBJ[idx][idxData];
		}

		datTextAll += "]," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（衣装用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeCostume20200510 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumCostumeId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "CostumeOBJ = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < CostumeOBJ.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(CostumeOBJ[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（アイテムセット用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeItemSet20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var itemSetData = null;
	var memberId = 0;
	var dataId = 0;
	var idMapItem = null;
	var idMapCard = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumItemSetId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "w_SE = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < w_SE.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(w_SE[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// アイテムIDからセットIDを検索するマップ定義部
	//----------------------------------------------------------------

	// 当該日付時点では存在しないデータなので、データ定義から作成
	idMapItem = new Array();
	idMapCard = new Array();
	for (idx = 0; idx < w_SE.length; idx++) {

		itemSetData = w_SE[idx];

		for (idxData = 1; idxData < itemSetData.length; idxData++) {

			// メンバー指定IDを取得
			memberId = itemSetData[idxData];

			// データIDを特定
			dataId = Math.abs(memberId);

			// アイテム指定の場合
			if (memberId > 0) {
				// 新規要素の場合は配列を用意
				if (!idMapItem[dataId]) {
					idMapItem[dataId] = new Array();
				}
				// 未登録の場合のみ、追加
				if (idMapItem[dataId].indexOf(idx) < 0) {
					idMapItem[dataId].push(idx);
				}
			}

			// カード指定の場合
			else {
				// 新規要素の場合は配列を用意
				if (!idMapCard[dataId]) {
					idMapCard[dataId] = new Array();
				}
				// 未登録の場合のみ、追加
				if (idMapCard[dataId].indexOf(idx) < 0) {
					idMapCard[dataId].push(idx);
				}
			}
		}
	}

	datTextAll += "\t" + "ItemIdToSetIdMap = new Array();" + "\n";
	datTextAll += "\n";

	// データ定義出力
	idMapItem.forEach(
		function (currentValue, index, array) {
			// 定義文字列取得
			datText = CDatCoder.ExtractDataArrayToDatCode(currentValue);

			// 全体文字列に連結
			datTextAll += "\t" + "ItemIdToSetIdMap[" + index + "] = " + "[" + datText + "]" + ";" + "\n";
		}
	);

	datTextAll += "\n";
	datTextAll += "\n";
	datTextAll += "\n";

	datTextAll += "\t" + "CardIdToSetIdMap = new Array();" + "\n";
	datTextAll += "\n";

	idMapCard.forEach(
		function (currentValue, index, array) {
			// 定義文字列取得
			datText = CDatCoder.ExtractDataArrayToDatCode(currentValue);

			// 全体文字列に連結
			datTextAll += "\t" + "CardIdToSetIdMap[" + index + "] = " + "[" + datText + "]" + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（アイテムセット用 2020/09/09 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeItemSet20200909 = function () {

	var idx = 0;
	var idxData = 0;

	var itemSetData = null;
	var memberId = 0;
	var dataId = 0;
	var idMapItem = null;
	var idMapCard = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumItemSetId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "w_SE = [" + "\n";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < w_SE.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(w_SE[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// アイテムIDからセットIDを検索するマップ定義部
	//----------------------------------------------------------------

	datTextAll += "\t" + "ItemIdToSetIdMap = new Array();" + "\n";
	datTextAll += "\n";

	// データ定義出力
	ItemIdToSetIdMap.forEach(
		function (currentValue, index, array) {
			// 定義文字列取得
			datText = CDatCoder.ExtractDataArrayToDatCode(currentValue);

			// 全体文字列に連結
			datTextAll += "\t" + "ItemIdToSetIdMap[" + index + "] = " + "[" + datText + "]" + ";" + "\n";
		}
	);

	datTextAll += "\n";
	datTextAll += "\n";
	datTextAll += "\n";

	datTextAll += "\t" + "CardIdToSetIdMap = new Array();" + "\n";
	datTextAll += "\n";

	CardIdToSetIdMap.forEach(
		function (currentValue, index, array) {
			// 定義文字列取得
			datText = CDatCoder.ExtractDataArrayToDatCode(currentValue);

			// 全体文字列に連結
			datTextAll += "\t" + "CardIdToSetIdMap[" + index + "] = " + "[" + datText + "]" + ";" + "\n";
		}
	);

	datTextAll += "\n";
	datTextAll += "\n";
	datTextAll += "\n";

	datTextAll += "\t" + "PetIdToSetIdMap = new Array();" + "\n";
	datTextAll += "\n";

	PetIdToSetIdMap.forEach(
		function (currentValue, index, array) {
			// 定義文字列取得
			datText = CDatCoder.ExtractDataArrayToDatCode(currentValue);

			// 全体文字列に連結
			datTextAll += "\t" + "PetIdToSetIdMap[" + index + "] = " + "[" + datText + "]" + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（エンチャントタイプ用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeEnchantType20200510 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumEnchTypeId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "n_EnchantType = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < n_EnchantType.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(n_EnchantType[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（エンチャントリスト用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeEnchantList20200510 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "n_EnchantList = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < n_EnchantList.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(n_EnchantList[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（時限アイテム用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeTimeItem20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumTimeItemId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "ITEM_SP_TIME_OBJ = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < ITEM_SP_TIME_OBJ.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(ITEM_SP_TIME_OBJ[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 整列データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "ITEM_SP_TIME_OBJ_SORT = [";

	// データ定義出力（未加工データを元に出力する）
	for (idx = 0; idx < ITEM_SP_TIME_OBJ_SORT.length; idx++) {
		datTextAll += ITEM_SP_TIME_OBJ_SORT[idx] + ",";
	}

	datTextAll = datTextAll.substring(0, datTextAll.length - 1);

	datTextAll += "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（アイテムパック用 2020/05/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeItemPack20200510 = function () {

	var idx = 0;
	var idxData = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumItemPackId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "ItemPackOBJ = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < ItemPackOBJ.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(ItemPackOBJ[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（モンスター用 2023/09/05 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeMonster20230905 = function () {

	var idx = 0;
	var idxData = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
/*
	EnumMonsterId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "MonsterObjNew = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < MonsterObjNew.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(MonsterObjNew[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（モンスターグループ用 2020/05/25 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeMonsterGroup20200525 = function () {

	var idx = 0;
	var idxData = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumMonsterGroupId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "MonsterGroupObj = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < MonsterGroupObj.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(MonsterGroupObj[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（モンスターマップ用 2021/07/27 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeMonsterMap20210727 = function () {

	var idx = 0;
	var idxData = 0;

	var dataOrigin = null;
	var dataWork = null;
	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------

	// 必要最低限のみ、出力する

	datTextAll += "\t" + EnumMonsterMapId.GetDefinedName(MONSTER_MAP_ID_MAP_ALL) + " = " + MONSTER_MAP_ID_MAP_ALL + ";" + "\n";
	datTextAll += "\t" + EnumMonsterMapId.GetDefinedName(MONSTER_MAP_ID_MVP_MONSTER) + " = " + MONSTER_MAP_ID_MVP_MONSTER + ";" + "\n";

	datTextAll += "\n";

	datTextAll += "\t" + EnumMonsterMapCategoryId.GetDefinedName(MONSTER_MAP_ID_CATEGORY_ALL) + " = " + MONSTER_MAP_ID_CATEGORY_ALL + ";" + "\n";
	datTextAll += "\t" + EnumMonsterMapCategoryId.GetDefinedName(MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON) + " = " + MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON + ";" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部（モンスターマップ）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_MonsterMapDataArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_MonsterMapDataArray.length; idx++) {

		// 元データを取得
		dataOrigin = g_MonsterMapDataArray[idx];

		// ソート仮名を出力しないように加工
		dataWork = dataOrigin.slice();
		for (idxData = 0; idxData < dataOrigin[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY].length; idxData++) {
			dataWork[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][idxData]
				= dataOrigin[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][idxData].slice(0, 2);
		}

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(dataWork);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\t" + "SetUpSortKanaMonsterMap(g_MonsterMapDataArray);" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部（モンスターマップカテゴリ）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_MonsterMapCategoryDataArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_MonsterMapCategoryDataArray.length; idx++) {

		// 元データを取得
		dataOrigin = g_MonsterMapCategoryDataArray[idx];

		// ソート仮名を出力しないように加工
		dataWork = dataOrigin.slice();
		for (idxData = 0; idxData < dataOrigin[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY].length; idxData++) {
			dataWork[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][idxData]
				= dataOrigin[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][idxData].slice(0, 2);
		}

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(dataWork);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\t" + "SetUpSortKanaMonsterMap(g_MonsterMapCategoryDataArray);" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（ペット用 2020/09/09 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodePet20200909 = function () {

	var idx = 0;
	var idxData = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumPetId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "PET_OBJ = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < PET_OBJ.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(PET_OBJ[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（ランダムオプションタイプ用 2020/11/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeRndOptType20201110 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumRndOptTypeId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_rndOptTypeArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_rndOptTypeArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_rndOptTypeArray[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（ランダムオプションリスト用 2020/11/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeRndOptList20201110 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumRndOptListId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_rndOptListArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_rndOptListArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_rndOptListArray[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（ランダムオプション用 2020/11/10 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeRndOpt20201110 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumRndOptId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_rndOptArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_rndOptArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_rndOptArray[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（更新履歴用 2021/01/20 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeChangeLog20210120 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumRndOptId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部（更新履歴コメント配列）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_ChangeLogCommentArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_ChangeLogCommentArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_ChangeLogCommentArray[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";

	//----------------------------------------------------------------
	// データ定義部（更新履歴ユニット配列）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_ChangeLogUnitArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_ChangeLogUnitArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_ChangeLogUnitArray[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（エイリアス用 2021/07/27 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeAlias20210727 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない
/*
	EnumRndOptId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";
*/


	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_AliasDataArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_AliasDataArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_AliasDataArray[idx]);

		// 全体文字列に連結
		datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（MIGエンチャントリスト用 2022/04/24 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeMigEnchantList20220424 = function () {

	var idx = 0;
	var idxItem = 0;
	var idxCard = 0;

	var enchListId = 0;
	var enchListIdArray = null;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（エンチャントリストデータ本体）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_constDataManager.enchListDataManager.sourceArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_constDataManager.enchListDataManager.sourceArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_constDataManager.enchListDataManager.sourceArray[idx]);

		// 全体文字列に連結
		if (datText === "undefined") {
			datTextAll += "\t\t" + "," + "\n";
		}
		else {
			datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
		}
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（並び順配列定義）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_constDataManager.enchListDataManager.sortedEnchantCardIdArray = [";

	// データ定義出力
	for (idx = 0; idx < g_constDataManager.enchListDataManager.sortedEnchantCardIdArray.length; idx++) {
		// 定義文字列取得
		datText = "" + g_constDataManager.enchListDataManager.sortedEnchantCardIdArray[idx];
		datTextAll += datText + ",";
	}

	datTextAll = datTextAll.replace(/,$/, "") + "];" + "\n";

	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（アイテムIDによる逆引き配列定義）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_constDataManager.enchListDataManager.reverseResolveArrayItemId = [";

	// TODO: 旧データから検索している
	// アイテムループ
	for (idxItem = 0; idxItem < g_constDataManager.enchListDataManager.reverseResolveArrayItemId.length; idxItem++) {

		enchListIdArray = g_constDataManager.enchListDataManager.reverseResolveArrayItemId[idxItem];

		// 該当がなかった場合
		if (!Array.isArray(enchListIdArray)) {
			datTextAll += ",";
		}
		else if (enchListIdArray.length == 0) {
			datTextAll += ",";
		}

		// 該当があった場合
		else {
			datTextAll += "[" + enchListIdArray.join(",") + "]" + ",";
		}
	}

	datTextAll = datTextAll.replace(/,$/, "") + "];" + "\n";

	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（カードIDによる逆引き配列定義）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_constDataManager.enchListDataManager.reverseResolveArrayCardId = [";

	// TODO: 旧データから検索している
	// カードループ
	for (idxCard = 0; idxCard < g_constDataManager.enchListDataManager.reverseResolveArrayCardId.length; idxCard++) {

		enchListIdArray = g_constDataManager.enchListDataManager.reverseResolveArrayCardId[idxCard];

		// 該当がなかった場合
		if (!Array.isArray(enchListIdArray)) {
			datTextAll += ",";
		}
		else if (enchListIdArray.length == 0) {
			datTextAll += ",";
		}

		// 該当があった場合
		else {
			datTextAll += "[" + enchListIdArray.join(",") + "]" + ",";
		}
	}

	datTextAll = datTextAll.replace(/,$/, "") + "];" + "\n";

	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（アップグレード系ID配列定義）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_constDataManager.enchListDataManager.upgradeTypeIdArray = [";

	// データ定義出力
	for (idx = 0; idx < g_constDataManager.enchListDataManager.upgradeTypeIdArray.length; idx++) {

		// 定義文字列取得
		datText = "" + g_constDataManager.enchListDataManager.upgradeTypeIdArray[idx];
		datTextAll += datText + ",";
	}

	datTextAll = datTextAll.replace(/,$/, "") + "];" + "\n";

	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（アップグレード系ID定数定義出力）
	//----------------------------------------------------------------

	// データ定義出力
	for (idx = 0; idx < g_constDataManager.enchListDataManager.upgradeTypeIdArray.length; idx++) {
		enchListId = g_constDataManager.enchListDataManager.upgradeTypeIdArray[idx];
		datTextAll += "\t" + EnumMigEnchListId.GetDefinedName(enchListId) + " = " + enchListId + ";" + "\n";
	}

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";



	return datTextAll;
};



/**
 * dat コード出力（HP/SP配列用 2022/10/11 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeHpSp20221011 = function () {

	var idx = 0;

	var jobId = 0;

	var spacer = (" ").repeat(6);
	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない



	//----------------------------------------------------------------
	// データ定義部（HP）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_hpBaseTable = [];" + ("\r\n").repeat(4);

	// 職業ループ
	for (jobId = JOB_ID_NOVICE; jobId <= JOB_ID_SOUL_REAPER; jobId++) {

		datTextAll += "\t" + "// " + GetJobName(jobId) + "\r\n";
		datTextAll += "\t" + "g_hpBaseTable[" + EnumJobId.GetDefinedName(jobId) + "] = [" + "\r\n";

		// インデント調整
		idx = Math.max(1, GetBaseLevelMin(jobId));
		if ((idx % 10) != 1) {
			datTextAll += "\t\t";
		}

		// データ定義出力
		for (; idx <= Math.min(200, GetBaseLevelMax(jobId)); idx++) {

			// インデント
			if ((idx % 10) == 1) {
				datTextAll += "\t\t";
			}

			// データ追記
			datTextAll += (spacer + GetHPBase(jobId, idx, false, true)).slice(-6) + ",";

			// 改行
			if ((idx % 10) == 0) {
				datTextAll += "\r\n";
			}
		}

		// 改行
		if (((idx - 1) % 10) != 0) {
			datTextAll += "\r\n";
		}

		datTextAll += "\t" + "];" + ("\r\n").repeat(3);
	}



	//----------------------------------------------------------------
	// データ定義部（SP）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_spBaseTable = [];" + ("\r\n").repeat(4);

	// 職業ループ
	for (jobId = JOB_ID_NOVICE; jobId <= JOB_ID_SOUL_REAPER; jobId++) {

		datTextAll += "\t" + "// " + GetJobName(jobId) + "\r\n";
		datTextAll += "\t" + "g_spBaseTable[" + EnumJobId.GetDefinedName(jobId) + "] = [" + "\r\n";

		// インデント調整
		idx = Math.max(1, GetBaseLevelMin(jobId));
		if ((idx % 10) != 1) {
			datTextAll += "\t\t";
		}

		// データ定義出力
		for (; idx <= Math.min(200, GetBaseLevelMax(jobId)); idx++) {

			// インデント
			if ((idx % 10) == 1) {
				datTextAll += "\t\t";
			}

			// データ追記
			datTextAll += (spacer + GetSPBase(jobId, idx, false, true)).slice(-6) + ",";

			// 改行
			if ((idx % 10) == 0) {
				datTextAll += "\r\n";
			}
		}

		// 改行
		if (((idx - 1) % 10) != 0) {
			datTextAll += "\r\n";
		}

		datTextAll += "\t" + "];" + ("\r\n").repeat(3);
	}




	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（キャラデータ用 2022/10/12 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeChara20221012 = function () {

	var idx = 0;

	var jobId = 0;

	var spacer = (" ").repeat(6);
	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	// 出力しない



	//----------------------------------------------------------------
	// データ定義部（HP）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_hpBaseTable = [" + "\n";

	// 職業ループ
	for (jobId = JOB_ID_NOVICE; jobId <= JOB_ID_SOUL_REAPER; jobId++) {

		datTextAll += "\t\t" + "[";

		// データ定義出力
		for (idx = 0; idx < g_hpBaseTable[jobId].length; idx++) {
			datTextAll += g_hpBaseTable[jobId][idx] + ",";
		}

		datTextAll = datTextAll.replace(/\,$/, "") + "]," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";



	datTextAll += "\n";


	//----------------------------------------------------------------
	// データ定義部（SP）
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_spBaseTable = [" + "\n";

	// 職業ループ
	for (jobId = JOB_ID_NOVICE; jobId <= JOB_ID_SOUL_REAPER; jobId++) {

		datTextAll += "\t\t" + "[";

		// データ定義出力
		for (idx = 0; idx < g_spBaseTable[jobId].length; idx++) {
			datTextAll += g_spBaseTable[jobId][idx] + ",";
		}

		datTextAll = datTextAll.replace(/\,$/, "") + "]," + "\n";
	}

	datTextAll += "\t" + "];" + "\n";




	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};



/**
 * dat コード出力（職業データ用 2022/11/12 版）
 * @return dat コード
 */
CDatCoder.CreateDatCodeJob20221112 = function () {

	var idx = 0;

	var datText = "";
	var datTextAll = "";



	//----------------------------------------------------------------
	// 先端部分
	//----------------------------------------------------------------
	datTextAll += "(function () {" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// ＩＤ定義部
	//----------------------------------------------------------------
	EnumMigJobId.For(
		function (idx, name, value) {
			datTextAll += "\t" + name + " = " + value + ";" + "\n";
		}
	);

	datTextAll += "\n";



	//----------------------------------------------------------------
	// データ定義部
	//----------------------------------------------------------------
	datTextAll += "\t" + "g_constDataManager.jobDataManager.sourceArray = [" + "\n";

	// データ定義出力
	for (idx = 0; idx < g_constDataManager.jobDataManager.sourceArray.length; idx++) {

		// 定義文字列取得
		datText = CDatCoder.ExtractDataArrayToDatCode(g_constDataManager.jobDataManager.sourceArray[idx]);

		// 全体文字列に連結
		if (datText === "undefined") {
			datTextAll += "\t\t" + "," + "\n";
		}
		else {
			datTextAll += "\t\t" + "[" + datText + "]" + "," + "\n";
		}
	}

	datTextAll += "\t" + "];" + "\n";

	datTextAll += "\n";



	//----------------------------------------------------------------
	// 末端部分
	//----------------------------------------------------------------
	datTextAll += "})();" + "\n";

	return datTextAll;
};
