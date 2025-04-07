// 初期処理の実行
function OnLoadPetList () {
	RefreshPetListTable();
}

/**
 * ペット一覧テーブルを更新する.
 */
function RefreshPetListTable(){
	var petDataArray = null;
	// データを抽出する
	petDataArray = PivotData();
	// データをソート
	petDataArray.sort(
		function (a, b) {
			if (a[PET_DATA_INDEX_NAME] < b[PET_DATA_INDEX_NAME]) {
				return -1;
			}
			else if (a[PET_DATA_INDEX_NAME] > b[PET_DATA_INDEX_NAME]) {
				return 1;
			}
			return 0;
		}
	);
	// データを表示する
	DispData(petDataArray);
}

/**
 * データを抽出する.
 * @param 
 * @return 抽出された PetData の配列
 */
function PivotData() {
	var idx = 0;
	var petDataArray = null;
	petDataArray = new Array();
	for (idx = 0; idx < PET_OBJ.length; idx++) {
		if (PET_OBJ[idx][PET_DATA_INDEX_ID] != 0) {
			petDataArray[petDataArray.length] = PET_OBJ[idx];
		}
	}
	return petDataArray;
}

/**
 * 抽出されたデータを表示する（リストテーブル生成）
 * @param petDataArray 抽出された PetData の配列
 */
function DispData(petDataArray) {
	const condition = document.getElementById("F_CONDITION").value;	// 部分一致文字列を取得
	let idx = 0;
	let objRoot = null;
	let objTable = null;
	let objTbody = null;
	let objTr = null;
	let objTd = null;
	let objText = null;
	let colspanEffect = 1;
	let petId = 0;
	let petData = null;
	// ルートオブジェクト取得
	objRoot = document.getElementById("OBJID_SPAN_ROOT_OF_PET_LIST");
	// テーブル生成
	HtmlRemoveAllChild(objRoot);
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);
	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);

	let rownum = 0;
	// 表示欄生成
	for (idx = 0; idx < petDataArray.length; idx++) {
		petData = petDataArray[idx];
		petId = petData[PET_DATA_INDEX_ID];
		if (condition) {
			hit = petDataArray[idx][PET_DATA_INDEX_NAME].includes(condition);
			tmp = document.createElement("span");
			CItemInfoManager.RebuildInfoTableSubCardDetail(tmp, petId, false);
			hit = hit || tmp.textContent.includes(condition);
			if(!hit) continue;
		}
		// 30行ごとにヘッダを追加
		if (rownum++ % 30 == 0) {
			objTr = document.createElement("tr");
			objTr.setAttribute("bgcolor", "#aaaaff");
			objTbody.appendChild(objTr);
			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("名前");
			objTd.appendChild(objText);
			objTd = document.createElement("td");
			objTd.setAttribute("colspan", colspanEffect);
			objTr.appendChild(objTd);
			objText = document.createTextNode("効果");
			objTd.appendChild(objText);
		}
		// データ表示部を追加
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);
		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(petDataArray[idx][PET_DATA_INDEX_NAME]);
		objTd.appendChild(objText);
		// 効果
		objTd = document.createElement("td");
		objTd.setAttribute("colspan", colspanEffect);
		objTr.appendChild(objTd);
		// 説明追記
		CItemInfoManager.AppendEfficiencyInfoSub(objTd, CONST_DATA_KIND_PET, petId, true);
		// セット情報追記
		CItemInfoManager.AppendSetInfo(objTd, PetIdToSetIdMap[petId], true);		
	}
}