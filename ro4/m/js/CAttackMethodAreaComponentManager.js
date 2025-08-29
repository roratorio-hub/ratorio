


//----------------------------------------------------------------
// オプションリストの種別
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumAttackMethodOptionListType",
	[
		"ATTACK_METHOD_OPTION_LIST_TYPE_SELECT",
		"ATTACK_METHOD_OPTION_LIST_TYPE_INPUT",
	],
	0,
	1
);





/**
 * 攻撃手段オプションデータクラス.
 */
function CAttackMethodOptionData(valueC, labelC) {

	// 値
	this.value = ((valueC !== undefined) ? valueC : 0);

	// ラベル
	this.label = ((labelC !== undefined) ? labelC : "");

	// 後続のオプションリスト
	this.nextOptionList = null;



	/**
	 * 値を設定する.
	 * @param value 値
	 */
	this.SetValue = function (value) {
		this.value = value;
	};

	/**
	 * 値を取得する.
	 * @return 値
	 */
	this.GetValue = function () {
		return this.value;
	};



	/**
	 * ラベルを設定する.
	 * @param label ラベル
	 */
	this.SetLabel = function (label) {
		this.label = label;
	};

	/**
	 * ラベルを取得する.
	 * @return ラベル
	 */
	this.GetLabel = function () {
		return this.label;
	};



	/**
	 * 後続のオプションリストを設定する.
	 * @param nextOptionList 後続のオプションリスト
	 */
	this.SetNextOptionList = function (nextOptionList) {
		this.nextOptionList = nextOptionList;
	};

	/**
	 * 後続のオプションリストを取得する.
	 * @return 後続のオプションリスト
	 */
	this.GetNextOptionList = function () {
		return this.nextOptionList;
	};
}



/**
 * 攻撃手段オプションリストクラス.
 */
function CAttackMethodOptionList() {

	// 種別
	this.type = 0;

	// ラベル
	this.label = "";

	// オプションデータマップ
	this.optionDataMap = new Map();

	// デフォルトで選択されるオプションデータの値
	this.defaultOptionDataValue = 0;

	// html 部品の attribute として設定されるデータの配列
	this.htmlAttrArrayArray = [];

	// 後続のオプションリスト（TYPE_INPUT用）
	this.nextOptionList = null;



	/**
	 * 種別を設定する.
	 * @param type 種別
	 */
	this.SetType = function (type) {
		this.type = type;
	};

	/**
	 * 種別を取得する.
	 * @return 種別
	 */
	this.GetType = function () {
		return this.type;
	};



	/**
	 * ラベルを設定する.
	 * @param label ラベル
	 */
	this.SetLabel = function (label) {
		this.label = label;
	};

	/**
	 * ラベルを取得する.
	 * @return ラベル
	 */
	this.GetLabel = function () {
		return this.label;
	};



	/**
	 * オプションデータを追加する.
	 * @param key キー
	 * @param optData オプションデータ
	 */
	this.AddOptionData = function (key, optData) {
		// 型変換されないので、最初から文字列として登録する
		this.optionDataMap.set("" + key, optData);
	};

	/**
	 * オプションデータを取得する.
	 * @param key キー
	 * @return オプションデータ
	 */
	this.GetOptionData = function (key) {
		// 最初から文字列として登録しているので、文字列で処理する
		return this.optionDataMap.get("" + key);
	};

	/**
	 * オプションデータをループ処理する.
	 * @param func 処理関数（value, key, map）
	 * @remark key は文字列に変換して登録してある
	 */
	this.ForEachOptionData = function (func) {
		this.optionDataMap.forEach(func);
	};



	/**
	 * デフォルトで選択されるオプションデータの値を設定する.
	 * @param defaultOptionDataValue デフォルトで選択されるオプションデータの値
	 */
	this.SetDefaultOptionDataValue = function (defaultOptionDataValue) {
		this.defaultOptionDataValue = defaultOptionDataValue;
	};

	/**
	 * デフォルトで選択されるオプションデータの値を取得する.
	 * @return デフォルトで選択されるオプションデータの値
	 */
	this.GetDefaultOptionDataValue = function () {
		return this.defaultOptionDataValue;
	};



	/**
	 * html 部品の attribute 配列を設定する.
	 * @param htmlAttrArrayArray 種別
	 */
	this.SetHtmlAttrArrayArray = function (htmlAttrArrayArray) {
		this.htmlAttrArrayArray = htmlAttrArrayArray;
	};

	/**
	 * html 部品の attribute 配列を取得する.
	 * @return 種別
	 */
	this.GetHtmlAttrArrayArray = function () {
		return this.htmlAttrArrayArray;
	};



	/**
	 * 後続のオプションリストを設定する.
	 * @param nextOptionList 後続のオプションリスト
	 */
	this.SetNextOptionList = function (nextOptionList) {
		this.nextOptionList = nextOptionList;
	};

	/**
	 * 後続のオプションリストを取得する.
	 * @return 後続のオプションリスト
	 */
	this.GetNextOptionList = function () {
		return this.nextOptionList;
	};
}



/**
 * 攻撃手段データクラス.
 */
function CAttackMethodData() {

	// スキルID
	this.skillId = 0;

	// ソース種別
	this.sourceType = 0;

	// 後続のオプションリスト
	this.nextOptionList = null;



	/**
	 * 攻撃手段フルIDを取得する.
	 * @return 攻撃手段フルID
	 */
	this.GetFullId = function () {

		var fullId = 0;

		// ベースとなるID
		fullId = this.skillId;

		// ソース種別によってIDを補正
		switch (this.sourceType) {

		case ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL:
			fullId += USABLE_SKILL_ID_CUSTOM_BIAS;
			break;

		case ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL:
			fullId += AUTO_SPELL_ID_CUSTOM_BIAS;
			break;
		}

		return fullId;
	};



	/**
	 * スキルIDを設定する.
	 * @param skillId スキルID
	 */
	this.SetSkillId = function (skillId) {
		this.skillId = skillId;
	};

	/**
	 * スキルIDを取得する.
	 * @return スキルID
	 */
	this.GetSkillId = function () {
		return this.skillId;
	};



	/**
	 * ソース種別を設定する.
	 * @param sourceType ソース種別
	 */
	this.SetSourceType = function (sourceType) {
		this.sourceType = sourceType;
	};

	/**
	 * ソース種別を取得する.
	 * @return ソース種別
	 */
	this.GetSourceType = function () {
		return this.sourceType;
	};



	/**
	 * 表示名を取得する.
	 * @return 攻撃手段フルID
	 */
	this.GetDispName = function () {

		var dispName = "";

		// ベース名称を取得
		dispName = g_skillManager.GetSkillName(this.skillId);

		// ソース種別によってフラグ文字を追加
		switch (this.sourceType) {

		case ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL:
			dispName += "(確認用)";
			break;
		}

		return dispName;
	};



	/**
	 * 後続のオプションリストを設定する.
	 * @param nextOptionList 後続のオプションリスト
	 */
	this.SetNextOptionList = function (nextOptionList) {
		this.nextOptionList = nextOptionList;
	};

	/**
	 * 後続のオプションリストを取得する.
	 * @return 後続のオプションリスト
	 */
	this.GetNextOptionList = function () {
		return this.nextOptionList;
	};
}

/**
 * 攻撃手段フルIDを元に、スキルIDを取得する.
 * @param fullId 攻撃手段フルID
 * @return スキルID
 */
CAttackMethodData.GetSkillIdFromFullId = function (fullId) {

	var skillId = 0;

	skillId = fullId;

	if (skillId >= AUTO_SPELL_ID_CUSTOM_BIAS) {
		skillId -= AUTO_SPELL_ID_CUSTOM_BIAS;
	}

	else if (skillId >= USABLE_SKILL_ID_CUSTOM_BIAS) {
		skillId -= USABLE_SKILL_ID_CUSTOM_BIAS;
	}

	return skillId;
};

/**
 * 攻撃手段エリアコンポーネントマネージャクラス.
 */
function CAttackMethodAreaComponentManager () {

}

// 攻撃手段データの配列
CAttackMethodAreaComponentManager.attackMethodDataArray = [];

// 生成されたラベル部品の配列
CAttackMethodAreaComponentManager.labelObjectArray = [];

// 生成された選択部品の配列
CAttackMethodAreaComponentManager.selectObjectArray = [];

/**
 * 画面部品を再構築する.
 */
CAttackMethodAreaComponentManager.RebuildControls = function () {

	var idx = 0;

	var checkedAutoCalc = null;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objInput = null;
	var objLabel = null;


	// 自動計算フラグを保持しておく
	checkedAutoCalc = HtmlGetObjectValueByIdAsInteger("OBJID_INPUT_ATTACK_METHOD_AUTO_CALC", 0);


	// 設定欄を初期化
	objRoot = document.getElementById("ID_ATTACK_METHOD_AREA");
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("border", 1);

	objTbody = HtmlCreateElement("tbody", objTable);



	//--------------------------------
	// ヘッダ部分を構築
	//--------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("攻撃方法", objTd);



	//--------------------------------
	// 選択欄部分を生成
	//--------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "OBJID_TD_ATTACK_METHOD_ROOT");


	//--------------------------------
	// 補足説明欄部分を生成（行のみ生成）
	//--------------------------------
	objTr = HtmlCreateElement("tr", objTbody);
	objTr.setAttribute("id", "OBJID_TR_ATTACK_METHOD_NOTICE");



	//--------------------------------
	// 計算ボタン部分を生成
	//--------------------------------
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_BUTTON_CALC");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "計算する");
	objInput.addEventListener("click", calc);

	//--------------------------------
	// 注意事項部分を生成
	//--------------------------------
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "OBJID_TD_CALC_BUTTON_NOTICE");



	//--------------------------------
	// 再構築処理呼び出し
	//--------------------------------
	CAttackMethodAreaComponentManager.RebuildSettingArea();
	CAttackMethodAreaComponentManager.RebuildAttackMethodSelect();
};

/**
 * 選択部品をリフレッシュする.
 */
CAttackMethodAreaComponentManager.RefreshControls = function () {

	var idx = 0;

	var valueMin = 0;
	var valueMax = 0;
	var colspan = 0;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objCtrl = null;
	var objActive = null;
	var objNoticeBlock = null;



	//--------------------------------
	// 選択部品の選択値の補正
	//--------------------------------

	for (idx = 0; idx < CAttackMethodAreaComponentManager.selectObjectArray.length; idx++) {

		// 選択部品を取得
		objCtrl = CAttackMethodAreaComponentManager.selectObjectArray[idx];

		// 最小値の定義がある場合は、最小値未満の値を補正
		valueMin = objCtrl.getAttribute("min");
		if (valueMin !== undefined) {
			valueMin = parseInt(valueMin, 10);
			if (objCtrl.value < valueMin) {
				objCtrl.value = valueMin;
			}
		}

		// 最大値の定義がある場合は、最大値を超える値を補正
		valueMax = objCtrl.getAttribute("max");
		if (valueMax !== undefined) {
			valueMax = parseInt(valueMax, 10);
			if (valueMax < objCtrl.value) {
				objCtrl.value = valueMax;
			}
		}
	}



	//--------------------------------
	// 現在のアクティブオブジェクトを保持
	//--------------------------------

	// 再構築でフォーカスが失われてしまうため
	objActive = document.activeElement;



	//--------------------------------
	// テーブルの再構築
	//--------------------------------

	// ルートオブジェクト配下を全削除
	objRoot = document.getElementById("OBJID_TD_ATTACK_METHOD_ROOT");
	HtmlRemoveAllChild(objRoot);



	//--------------------------------
	// 攻撃方法、レベル
	//--------------------------------

	// 設定テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTbody = HtmlCreateElement("tbody", objTable);

	// 選択部品追加
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.appendChild(CAttackMethodAreaComponentManager.selectObjectArray[0]);
	objTd = HtmlCreateElement("td", objTr);
	objTd.appendChild(CAttackMethodAreaComponentManager.selectObjectArray[1]);



	//--------------------------------
	// その他のオプション
	//--------------------------------

	// 設定テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("style", "font-size : smaller;");
	objTbody = HtmlCreateElement("tbody", objTable);

	// その他のオプション
	for (idx = 2; idx < CAttackMethodAreaComponentManager.selectObjectArray.length; idx++) {

		objTr = HtmlCreateElement("tr", objTbody);

		// 字下げ
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextNode("　", objTd);

		// 生成されていれば、ラベルも追加
		if (CAttackMethodAreaComponentManager.labelObjectArray[idx]) {
			objTd = HtmlCreateElement("td", objTr);
			objTd.style.whiteSpace = "nowrap";
			objTd.appendChild(CAttackMethodAreaComponentManager.labelObjectArray[idx]);

			colspan = 1;
		}
		else {
			colspan = 2;
		}

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("colspan", colspan);
		objTd.appendChild(CAttackMethodAreaComponentManager.selectObjectArray[idx]);
	}





	//--------------------------------
	// 補足説明（ルート要素が異なるので注意）
	//--------------------------------

	// trオブジェクト配下を全削除
	objTr = document.getElementById("OBJID_TR_ATTACK_METHOD_NOTICE");
	HtmlRemoveAllChild(objTr);

	// 専用関数を呼び出し、補足説明オブジェクトを取得
	objNoticeBlock = CAttackMethodAreaComponentManager.CreateNoticeBlock();

	// 補足説明がある場合
	if (objNoticeBlock) {

		// trオブジェクトを可視化
		objTr.removeAttribute("style");

		// tdオブジェクトを生成し、補足説明オブジェクトを子要素に追加する
		objTd = HtmlCreateElement("td", objTr);
		objTd.appendChild(objNoticeBlock);
	}

	// 補足説明がない場合
	else {

		// trオブジェクトを不可視化
		objTr.setAttribute("style", "display : none;");
	}



	//--------------------------------
	// オブジェクトのアクティブ状態の復元
	//--------------------------------

	if (objActive) {
		objActive.focus();
	}
};

/**
 * 攻撃手段選択部品を再構築する.
 */
CAttackMethodAreaComponentManager.RebuildAttackMethodSelect = function () {

	var idx = 0;

	var selectedValueArray = null;
	var attackMethodData = null;
	var attackMethodOptList = null;



	// 選択状態を取得する
	selectedValueArray = CAttackMethodAreaComponentManager.GetSelectedValueArray();

	// 攻撃手段データ配列を再取得する
	CAttackMethodAreaComponentManager.attackMethodDataArray = CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArray();

	// ラベル部品、選択部品のオブジェクト配列を初期化
	CAttackMethodAreaComponentManager.labelObjectArray = [];
	CAttackMethodAreaComponentManager.selectObjectArray = [];



	// 攻撃手段選択部品の再構築
	CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubMethod(0, selectedValueArray);

	// 結果として選択されている攻撃手段データを取得する
	attackMethodData = CAttackMethodAreaComponentManager.GetAttackMethodData(CAttackMethodAreaComponentManager.selectObjectArray[0].value);

	// 後続のオプションリストを取得
	attackMethodOptList = attackMethodData.GetNextOptionList();

	// 攻撃手段オプション選択部品の再構築（再起処理される）
	CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption(1, attackMethodOptList, selectedValueArray);



	// 選択部品のリフレッシュ
	CAttackMethodAreaComponentManager.RefreshControls();



	// 再計算はしない
};

/**
 * 攻撃手段選択部品を再構築する（サブ　手段用）.
 * @param objectIndex オプションのインデックス
 * @param selectedValueArray 選択された値の配列
 */
CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubMethod = function (objectIndex, selectedValueArray) {

	var valueToRestore = 0;

	var objSelect = null;

	// 復元すべき値の選定
	valueToRestore = (selectedValueArray.length > objectIndex) ? selectedValueArray[objectIndex] : 0;

	// サブ関数を呼び出してオブジェクトを生成
	objSelect = CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubCreateMethodSelect(valueToRestore);

	// 値が復元できていなかった場合は、選択されていた値を切り捨てる
	if (objSelect.value != valueToRestore) {
		selectedValueArray.splice(objectIndex);
	}

	// ラベル部品のオブジェクト配列に設定
	// 現状、ラベルなし
	CAttackMethodAreaComponentManager.labelObjectArray[objectIndex] = null;

	// 選択部品のオブジェクト配列に設定
	CAttackMethodAreaComponentManager.selectObjectArray[objectIndex] = objSelect;
};

/**
 * 攻撃手段選択部品を再構築する（サブ　手段用生成処理）.
 * @param valueToRestore 復元候補の値
 * @return 再構築された選択部品オブジェクト
 */
CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubCreateMethodSelect = function (valueToRestore) {

	var idx = 0;

	var attackMethodData = null;
	var dataId = 0;
	var candidateId = 0;

	var objSelect = null;



	// セレクトボックスを生成
	objSelect = HtmlCreateElement("select", null);
	objSelect.setAttribute("onchange", "CAttackMethodAreaComponentManager.OnChangeAttackMethod()");

	// 設定候補検索用の変数を初期化
	candidateId = -1;

	// 選択肢の追加
	for (idx = 0; idx < CAttackMethodAreaComponentManager.attackMethodDataArray.length; idx++) {

		// 攻撃手段データを取得
		attackMethodData = CAttackMethodAreaComponentManager.attackMethodDataArray[idx];

		// データのフルIDを取得
		dataId = attackMethodData.GetFullId();

		// 復元候補のIDがあった場合は、設定候補のIDを更新する
		if (dataId == valueToRestore) {
			candidateId = dataId;
		}

		// 選択肢を追加
		HtmlCreateElementOption(dataId, attackMethodData.GetDispName(), objSelect);
	}

	// 復元候補のIDがあった場合のみ、値を復元する
	if (candidateId >= 0) {
		objSelect.value = candidateId;
	}

	// 生成したオブジェクトを返す
	return objSelect;
};

/**
 * 攻撃手段選択部品を再構築する（サブ　オプション用）.
 * @param objectIndex オプションのインデックス
 * @param attackMethodOptList 攻撃手段オプションリスト
 * @param selectedValueArray 選択された値の配列
 * @return 再構築された選択部品オブジェクト
 */
CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption = function (objectIndex, attackMethodOptList, selectedValueArray) {

	var idx = 0;

	var valueToRestore = 0;
	var optionData = null;
	var nextOptionList = null;

	var objSelect = null;

	// オプションリストが指定されている場合は、それをもとに構築
	if (attackMethodOptList) {

		// 復元すべき値の選定
		valueToRestore = (selectedValueArray.length > objectIndex) ? selectedValueArray[objectIndex] : attackMethodOptList.GetDefaultOptionDataValue();

		// サブ関数を呼び出してオブジェクトを生成
		objSelect = CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOptionSubCreate(objectIndex, attackMethodOptList, selectedValueArray, valueToRestore);

		// 値が復元できていなかった場合は、選択されていた値を切り捨てる
		if (objSelect.value != valueToRestore) {
			selectedValueArray.splice(objectIndex);
		}

		// ラベル部品、選択部品のオブジェクト配列に設定
		if (attackMethodOptList.GetLabel().length > 0) {
			CAttackMethodAreaComponentManager.labelObjectArray[objectIndex] = HtmlCreateTextNode(attackMethodOptList.GetLabel(), null);
		}
		CAttackMethodAreaComponentManager.selectObjectArray[objectIndex] = objSelect;

		// 次のオプションリストへ（再起呼び出し）
		nextOptionList = attackMethodOptList.GetNextOptionList();
		if (!nextOptionList) {
			optionData = attackMethodOptList.GetOptionData(objSelect.value);
			if (optionData) {
				nextOptionList = optionData.GetNextOptionList();
			}
		}
		CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption(objectIndex + 1, nextOptionList, selectedValueArray);
	}

	// そうでなければ、選択肢を全削除
	else {

		// 選択されていた値を切り捨てる
		selectedValueArray.splice(objectIndex);

		// オブジェクトの配列も切り捨てる
		CAttackMethodAreaComponentManager.labelObjectArray.splice(objectIndex);
		CAttackMethodAreaComponentManager.selectObjectArray.splice(objectIndex);
	}

};

/**
 * 攻撃手段選択部品を再構築する（サブ　オプション用生成処理）.
 * @param objectIndex オプションのインデックス
 * @param attackMethodOptList 攻撃手段オプションリスト
 * @param selectedValueArray 選択された値の配列
 * @param valueToRestore 復元候補の値
 * @return 再構築された選択部品オブジェクト
 */
CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOptionSubCreate = function (objectIndex, attackMethodOptList, selectedValueArray, valueToRestore) {

	var idx = 0;

	var htmlAttrArrayArray = null;
	var optDataArray = null;
	var selectableValueArray = null;

	var skillid = 0;
	var skillLv = 0;
	var valueWork = 0;
	var optionableValueArray = null;

	var objSelect = null;



	// タイプに従ったオブジェクト生成
	switch (attackMethodOptList.GetType()) {

	// セレクトボックスタイプ
	case ATTACK_METHOD_OPTION_LIST_TYPE_SELECT:
		objSelect = HtmlCreateElement("select", null);
		break;

	// 入力タイプ
	case ATTACK_METHOD_OPTION_LIST_TYPE_INPUT:
		objSelect = HtmlCreateElement("input", null);
		break;
	}

	// 属性の設定
	htmlAttrArrayArray = attackMethodOptList.GetHtmlAttrArrayArray();
	for (idx = 0; idx < htmlAttrArrayArray.length; idx++) {
		objSelect.setAttribute(htmlAttrArrayArray[idx][0], htmlAttrArrayArray[idx][1]);
	}

	// change イベントハンドラ設定
	objSelect.setAttribute("onchange", "CAttackMethodAreaComponentManager.OnChangeAttackMethodOption(" + objectIndex + ")");



	// タイプに従った内容の生成
	switch (attackMethodOptList.GetType()) {

	// セレクトボックスタイプ
	case ATTACK_METHOD_OPTION_LIST_TYPE_SELECT:

		// 特殊な処理が必要なスキル（従来の操作性を確保するため）
		optionableValueArray = null;

		// スキルIDとスキルレベルを取得
		skillid = (selectedValueArray.length >= 1) ? CAttackMethodData.GetSkillIdFromFullId(selectedValueArray[0]) : SKILL_ID_TUZYO_KOGEKI;
		skillLv = (selectedValueArray.length >= 2) ? selectedValueArray[1] : parseInt(CAttackMethodAreaComponentManager.selectObjectArray[0].value, 10);

		switch (skillid) {

		// メテオストーム
		case SKILL_ID_METEOR_STORM:

			// 隕石の命中回数
			if (objectIndex == 2) {
				optionableValueArray = [];
				for (idx = 1; idx <= (2 + Math.floor(skillLv / 2)); idx++) {
					optionableValueArray.push(idx);
				}
				valueToRestore = Math.min(valueToRestore, (2 + Math.floor(skillLv / 2)));
			}
			break;

		// ファイアーウォーク
		// エレクトリックウォーク
		case SKILL_ID_FIRE_WALK:
		case SKILL_ID_ELECTRIC_WALK:

			// 踏ませるセルの数
			if (objectIndex == 2) {
				optionableValueArray = [];
				for (idx = 1; idx <= (6 + 2 * skillLv); idx++) {
					optionableValueArray.push(idx);
				}
				valueToRestore = Math.min(valueToRestore, (6 + 2 * skillLv));
			}
			break;

		}

		// 選択可能な値の配列を用意
		selectableValueArray = [];

		// すべての選択肢データをループ処理
		attackMethodOptList.ForEachOptionData(
			function (valueF, keyF, mapF) {

				// 特殊処理が必要で、かつ、選択肢として許容されていない場合は、処理終了
				if (optionableValueArray) {
					if (optionableValueArray.indexOf(valueF.value) < 0) {
						return;
					}
				}

				// 選択肢を追加
				HtmlCreateElementOption(valueF.value, valueF.label, objSelect);

				// 選択可能な値の配列に追加
				selectableValueArray.push(valueF.value);

			}
		);

		// デフォルト値を仮設定
		objSelect.value = attackMethodOptList.GetDefaultOptionDataValue();

		// 復元候補の値が設定可能な場合は、値を復元する
		if (selectableValueArray.indexOf(valueToRestore) >= 0) {
			objSelect.value = valueToRestore;
		}
		break;

	// 入力タイプ
	case ATTACK_METHOD_OPTION_LIST_TYPE_INPUT:

		// 特殊な処理が必要なスキル（従来の操作性を確保するため）
		optionableValueArray = null;

		// スキルIDとスキルレベルを取得
		skillid = (selectedValueArray.length >= 1) ? CAttackMethodData.GetSkillIdFromFullId(selectedValueArray[0]) : SKILL_ID_TUZYO_KOGEKI;
		skillLv = (selectedValueArray.length >= 2) ? selectedValueArray[1] : parseInt(CAttackMethodAreaComponentManager.selectObjectArray[0].value, 10);

		switch (skillid) {
			// カートレボリューション
			case SKILL_ID_CART_REVOLUTION:
			case SKILL_ID_CART_TERMINATION:
			case SKILL_ID_CART_TORNADO:
				// カート積載可能量を計算
				valueWork = 8000 + 500 * Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				// オブジェクトの最大値の変更
				objSelect.setAttribute("max", valueWork);
				// 入力値の補正
				valueToRestore = Math.min(valueToRestore, valueWork);
				break;
		}

		// デフォルト値を仮設定
		objSelect.value = attackMethodOptList.GetDefaultOptionDataValue();

		// 値を復元する
		objSelect.value = valueToRestore;
		break;
	}



	// 生成したオブジェクトを返す
	return objSelect;
};

/**
 * 計算機設定部品を再構築する.
 */
CAttackMethodAreaComponentManager.RebuildSettingArea = function () {

	let bDigit3 = CSaveController.getSettingProp(CSaveDataConst.propNameResultDigit3);
	HtmlSetObjectCheckedById("OBJID_CHECK_DIGIT3", bDigit3 ? "checked" : null);

	let autoCalc = CSaveController.getSettingProp(CSaveDataConst.propNameAttackAutoCalc);
	HtmlSetObjectValueById("OBJID_INPUT_ATTACK_METHOD_AUTO_CALC", autoCalc);

	let attackInterval = CSaveController.getSettingProp(CSaveDataConst.propNameAttackInterval);
	HtmlSetObjectValueById("OBJID_SELECT_ACTIVE_INTERVAL", attackInterval);

	let castSimInterval = CSaveController.getSettingProp(CSaveDataConst.propNameCastSimInterval);
	HtmlSetObjectValueById("OBJID_SELECT_CASTSIM_INTERVAL", castSimInterval);
};

/**
 * 設定変更イベントハンドラ（攻撃手段）.
 */
CAttackMethodAreaComponentManager.OnChangeAttackMethod = function () {

	var idx = 0;

	var selectedValueArray = null;
	var selectedId = 0;
	var attackMethodData = null;
	var attackMethodOptList = null;

	// 選択状態を取得し、設定変更により無効になった部分を切り捨てる
	selectedValueArray = CAttackMethodAreaComponentManager.GetSelectedValueArray();
	selectedValueArray.splice(1);

	// 選択された攻撃手段データを取得する
	attackMethodData = CAttackMethodAreaComponentManager.GetAttackMethodData(selectedValueArray[0]);

	// 攻撃手段オプション選択部品の再構築

	// 攻撃手段のオプションリストを取得
	attackMethodOptList = attackMethodData.GetNextOptionList();

	// 攻撃手段オプション選択部品の再構築（再起処理される）
	CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption(1, attackMethodOptList, selectedValueArray);

	// 選択部品のリフレッシュ
	CAttackMethodAreaComponentManager.RefreshControls();

	// 自動設定が有効の場合のみ、再計算する
	AutoCalc("CAttackMethodAreaComponentManager.OnChangeAttackMethod");
};

/**
 * 設定変更イベントハンドラ（攻撃手段オプション）.
 */
CAttackMethodAreaComponentManager.OnChangeAttackMethodOption = function (objectIndex) {

	var idx = 0;

	var selectedValueArray = null;
	var selectedId = 0;
	var attackMethodData = null;
	var attackMethodOptList = null;

	// 選択状態を取得し、設定変更により無効になった部分を切り捨てる
	selectedValueArray = CAttackMethodAreaComponentManager.GetSelectedValueArray();
	// TODO: 要検討項目
	// 『オプション部分の変更によって、後続のオプションのリストが変化することはない』という前提のもと、
	// 切り捨てる処理は行わない
	// selectedValueArray.splice(objectIndex + 1);

	// 選択された攻撃手段データを取得する
	attackMethodData = CAttackMethodAreaComponentManager.GetAttackMethodData(selectedValueArray[0]);

	// 攻撃手段オプション選択部品の再構築

	// 攻撃手段のオプションリストを取得
	attackMethodOptList = attackMethodData.GetNextOptionList();

	for (idx = 1; idx <= objectIndex; idx++) {

		// タイプに従って、次のオプションリストを辿る
		switch (attackMethodOptList.GetType()) {

		// セレクトボックスタイプ
		case ATTACK_METHOD_OPTION_LIST_TYPE_SELECT:
			attackMethodOptList = attackMethodOptList.GetOptionData(selectedValueArray[idx]).GetNextOptionList();
			break;

		// 入力タイプ
		case ATTACK_METHOD_OPTION_LIST_TYPE_INPUT:
			attackMethodOptList = attackMethodOptList.GetNextOptionList();
			break;
		}

		// 存在しないところまで達した場合は、処理打ち切り
		if (!attackMethodOptList) {
			break;
		}
	}

	// 処理関数呼び出し（再帰処理される）
	CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption(objectIndex + 1, attackMethodOptList, selectedValueArray);

	// 選択部品のリフレッシュ
	CAttackMethodAreaComponentManager.RefreshControls();

	// 自動設定が有効の場合のみ、再計算する
	AutoCalc("CAttackMethodAreaComponentManager.OnChangeAttackMethodOption");
};

/**
 * 設定変更イベントハンドラ（自動計算設定）.
 */
CAttackMethodAreaComponentManager.OnChangeAutoCalc = function () {

	// 設定値取得
	const value = HtmlGetObjectValueByIdAsInteger("OBJID_INPUT_ATTACK_METHOD_AUTO_CALC", 0);

	// セーブコントローラへ保存
	CSaveController.setSettingProp(CSaveDataConst.propNameAttackAutoCalc, value);

	// 自動計算が有効の場合のみ、再計算する
	AutoCalc("CAttackMethodAreaComponentManager.OnChangeAutoCalc");
};

/**
 * 設定変更イベントハンドラ（3桁区切り）.
 */
CAttackMethodAreaComponentManager.OnChangeDigit3 = function () {

	// 設定値取得
	const checked = HtmlGetObjectCheckedById("OBJID_CHECK_DIGIT3", "checked");

	// セーブコントローラへ保存
	CSaveController.setSettingProp(CSaveDataConst.propNameResultDigit3, (checked ? 1 : 0));

	// 再計算する
	calc();
};

/**
 * 設定変更イベントハンドラ（攻撃間隔設定）.
 */
CAttackMethodAreaComponentManager.OnChangeAttackInterval = function () {

	// 設定値取得
	const value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ACTIVE_INTERVAL", 14);

	// セーブコントローラへ保存
	CSaveController.setSettingProp(CSaveDataConst.propNameAttackInterval, value);

	// 再計算する
	calc();
};

/**
 * 設定変更イベントハンドラ（詠唱更新間隔設定）.
 */
CAttackMethodAreaComponentManager.OnChangeCastSimInterval = function () {

	// 設定値取得
	const value = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_CASTSIM_INTERVAL", 10);

	// セーブコントローラへ保存
	CSaveController.setSettingProp(CSaveDataConst.propNameCastSimInterval, value);

	// 再計算する
	calc();
};

/**
 * 攻撃手段設定を変更する.
 * @param attackMethodConf 攻撃手段設定
 * @return 処理の成否
 * @remark 範囲外の値やオプションが未指定の場合は、自動補正する
 */
CAttackMethodAreaComponentManager.SetAttackMethodConf = function (attackMethodConf) {

	var idx = 0;

	var attackMethodConfLoc = null;
	var attackMethodData = null;
	var selectedValueArray = null;
	var attackMethodOptList = null;

	// 引数の設定を複製
	attackMethodConfLoc = attackMethodConf.Clone();

	// 指定のスキルIDとソース種別に対応するデータを検索する
	for (idx = 0; idx < CAttackMethodAreaComponentManager.attackMethodDataArray.length; idx++) {

		// 攻撃手段データを取得
		attackMethodData = CAttackMethodAreaComponentManager.attackMethodDataArray[idx];

		// スキルIDが一致しなければ、次へ
		if (attackMethodData.GetSkillId() != attackMethodConfLoc.GetSkillId()) {
			continue;
		}

		// ソース種別が一致しなければ、次へ
		if (attackMethodData.GetSourceType() != attackMethodConfLoc.GetSourceType()) {

			// TODO: データ移行過渡処理
			// 移行テストにおいて、移行前処理で動作させる際、
			// attackMethodConfLoc.GetSourceType() には、移行後データを示す ATTACK_METHOD_BY_MIG_EQUIPABLE_SP_EFFECT が入ってしまっている
			// そのままでは、この判定不一致により、移行前のテストでスキルを設定できないので、
			// この位置で補正する

			// 補正は、移行テストの移行前処理でのテスト時に限る
			if ((_DATA_MIGRATION_MODE) && (!_DEBUG)) {

				// 使用可能スキルの場合
				if (attackMethodData.GetSourceType() != ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL) {
					attackMethodConfLoc.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL);
				}

				// オートスペルの場合
				else if (attackMethodData.GetSourceType() != ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL) {
					attackMethodConfLoc.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL);
				}

				// 上記以外は、不可
				else {
					continue;
				}
			}

			// 上記以外の処理では、不可
			else {
				continue;
			}
		}

		// ここに来れば、該当するデータ

		// 攻撃手段の選択状態を変更する
		CAttackMethodAreaComponentManager.selectObjectArray[0].value = attackMethodData.GetFullId();

		// 選択する値の配列を合成
		selectedValueArray = [attackMethodData.GetFullId(), attackMethodConfLoc.GetSkillLv()].concat(attackMethodConfLoc.GetOptionValueArray());

		// 攻撃手段のオプションリストを取得
		attackMethodOptList = attackMethodData.GetNextOptionList();

		// 攻撃手段オプション選択部品の再構築（再起処理される）
		CAttackMethodAreaComponentManager.RebuildAttackMethodSelectSubOption(1, attackMethodOptList, selectedValueArray);

		// 選択部品のリフレッシュ
		CAttackMethodAreaComponentManager.RefreshControls();

		// 処理終了
		return true;
	}

	// ここに来る場合は、設定できていない
	return false;
};

/**
 * 現在の選択値の配列を取得する.
 * @return 現在の選択値の配列
 */
CAttackMethodAreaComponentManager.GetSelectedValueArray = function () {

	var idx = 0;

	var selectedValueArray = null;

	// 選択状態を取得
	selectedValueArray = [];

	for (idx = 0; idx < CAttackMethodAreaComponentManager.selectObjectArray.length; idx++) {
		selectedValueArray.push(parseInt(CAttackMethodAreaComponentManager.selectObjectArray[idx].value, 10));
	}

	return selectedValueArray;
};

/**
 * 攻撃手段設定を取得する.
 * @param skillId スキルID
 * @param sourceType ソース種別
 * @param skillLv スキルレベル
 * @param optValueArray オプションデータ値配列
 * @return 攻撃手段設定
 */
CAttackMethodAreaComponentManager.GetAttackMethodConf = function () {

	var selectedValueArray = null;
	var attackMethodData = null;
	var attackMethodConf = null;

	// 選択している値の配列を取得
	selectedValueArray = CAttackMethodAreaComponentManager.GetSelectedValueArray();

	// 攻撃手段データを取得
	attackMethodData = CAttackMethodAreaComponentManager.GetAttackMethodData(selectedValueArray[0]);

	// 戻り値を生成
	attackMethodConf = new CAttackMethodConf();
	attackMethodConf.SetSkillId(attackMethodData.GetSkillId());
	attackMethodConf.SetSourceType(attackMethodData.GetSourceType());
	attackMethodConf.SetSkillLv(selectedValueArray[1]);
	attackMethodConf.SetOptionValueArray(selectedValueArray.slice(2));

	return attackMethodConf;
};

/**
 * 指定のフルIDを持つ攻撃手段データを取得する.
 * @param fullId フルID
 * @return 攻撃手段データ
 */
CAttackMethodAreaComponentManager.GetAttackMethodData = function (fullId) {

	var idx = 0;

	var attackMethodData = null;

	for (idx = 0; idx < CAttackMethodAreaComponentManager.attackMethodDataArray.length; idx++) {

		attackMethodData = CAttackMethodAreaComponentManager.attackMethodDataArray[idx];

		if (attackMethodData.GetFullId() == fullId) {
			return attackMethodData;
		}
	}

	return null;
};

/**
 * 有効な攻撃手段データ配列を取得する.
 * @return 有効な攻撃手段データ配列
 */
CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArray = function () {

	var idx = 0;
	var idxLv = 0;
	var idxCollected = 0;
	var idxArray = 0;

	var attackSkillIdArray = null;
	var attackMethodData = null;
	var attackMethodDataArray = null;
	var attackMethodOptList = null;
	var attackMethodOptData = null;
	var attackMethodDataWork = null;
	var attackMethodOptListWork = null;
	var attackMethodOptDataWork = null;

	var skillId = 0;
	var skillLv = 0;
	var skillLvMax = 0;
	var levelArray = null;
	var usableSkillId = 0;
	var usableSkillIdArray = null;
	var autoSpellId = 0;
	var autoSpellIdArray = null;
	var spTag = null;
	var spTagArray = null;
	var ignoreAttrArray = null;
	var collectAttrArray = null;
	var collectedArray = null;
	var collectedArrayArray = null;
	var collectedIdArray = null;
	var collectedLevelArray = null;
	var collectedMultiplyArray = null;
	var effectiveMultiply = 0;



	// 結果用配列を用意
	attackMethodDataArray = [];



	//--------------------------------
	// 当該職業で習得できるスキルの追加
	//--------------------------------
	attackSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetAttackSkillIdArray();

	for (idx = 0; idx < attackSkillIdArray.length; idx++) {

		// 攻撃スキルのＩＤを取得
		skillId = attackSkillIdArray[idx];

		// 有効なレベルの配列を生成
		levelArray = [];
		for (skillLv = 1; skillLv <= g_skillManager.GetMaxLv(skillId); skillLv++) {
			levelArray.push(skillLv);
		}

		// 攻撃手段データの生成
		attackMethodData = new CAttackMethodData();
		attackMethodData.SetSkillId(skillId);
		attackMethodData.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_JOB_LEARN);
		attackMethodDataArray.push(attackMethodData);

		// オプションリストを生成
		attackMethodOptList = new CAttackMethodOptionList();
		attackMethodOptList.SetType(ATTACK_METHOD_OPTION_LIST_TYPE_SELECT);
		attackMethodData.SetNextOptionList(attackMethodOptList);

		// オプションデータ（レベル）の生成
		for (idxLv = 0; idxLv < levelArray.length; idxLv++) {

			attackMethodOptData = new CAttackMethodOptionData();
			attackMethodOptData.SetValue(levelArray[idxLv]);
			attackMethodOptData.SetLabel("" + levelArray[idxLv]);

			attackMethodOptList.AddOptionData(levelArray[idxLv], attackMethodOptData);
		}

		// デフォルトとして選択されるデータを設定
		attackMethodOptList.SetDefaultOptionDataValue(levelArray[levelArray.length - 1]);
	}



	//----------------------------------------------------------------
	// 装備等による使用可能スキルの追加（従来の処理だが、移行完了まで必要）
	//----------------------------------------------------------------

	// 使用可能スキル定義のリストを取得
	usableSkillIdArray = new Array().concat(
		GetEquippedSPListEquip(ITEM_SP_LEARN_SKILL),
		GetEquippedSPListEquip(ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED),
		GetEquippedSPListEquip(ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL),
		GetEquippedSPListCardAndElse(ITEM_SP_LEARN_SKILL),
		GetEquippedSPListCardAndElse(ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED),
		GetEquippedSPListCardAndElse(ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL)
	);

	// 攻撃スクロールの追加
	if(n_A_PassSkill7[15]){
		usableSkillIdArray = usableSkillIdArray.concat([
			USABEL_SKILL_ID_FIRE_BOLT_5,
			USABEL_SKILL_ID_FIRE_BALL_5,
			USABEL_SKILL_ID_FIRE_WALL_5,
			USABEL_SKILL_ID_COLO_BOLT_5,
			USABEL_SKILL_ID_FROST_DIVER_5,
			USABEL_SKILL_ID_LIGHTNING_BOLT_5,
			USABEL_SKILL_ID_EARTH_SPIKE_5,
			USABEL_SKILL_ID_SOUL_STRIKE_5,
			USABEL_SKILL_ID_METEOR_STORM_5,
			USABEL_SKILL_ID_HEAL_10,
			USABEL_SKILL_ID_RESERECTION_BY_YGGDRASILLNO_HA,
			USABEL_SKILL_ID_GRAND_CROSS_10,
			USABEL_SKILL_ID_DEMONIC_FIRE_3,
			USABEL_SKILL_ID_HELL_INFERNO_3,
			USABEL_SKILL_ID_MAGMA_ILLUPTION_3,
			USABEL_SKILL_ID_PSYCHIC_WAVE_3,
			USABEL_SKILL_ID_METALIC_SOUND_3,
			USABEL_SKILL_ID_JUDEX_3,
			USABEL_SKILL_ID_TEIOAPUCHAGI_7,
		]);
	}

	// 四次職支援「攻撃装置有効化」による効果
	// オートスペルだと、遠距離攻撃でも加算されてしまうので、実情に合わなくなる
	// （自身中心に毎秒ダメージなので、遠距離から攻撃している場合、ダメージは入らない）
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_KOGEKI_SOCHI_YUKOKA]) > 0) {
		usableSkillIdArray.push(USABEL_SKILL_ID_KOGEKI_SOCHI_YUKOKA_5);
	}

	for (idx = 0; idx < usableSkillIdArray.length; idx++) {

		// アイテムのＳＰ定義値を取得（使用可能スキルＩＤが設定されている）
		usableSkillId = usableSkillIdArray[idx];

		// 使用可能フラグが立っていない場合は、処理しない
		if (InsertSkill[usableSkillId][USABLE_SKILL_DATA_INDEX_ATTACKABLE] != 1) {
			continue;
		}

		// 実際のスキルＩＤを取得
		skillId = InsertSkill[usableSkillId][USABLE_SKILL_DATA_INDEX_SKILL_ID];

		// スキル最大レベルを取得
		skillLvMax = InsertSkill[usableSkillId][USABLE_SKILL_DATA_INDEX_SKILL_LEVEL];

		// 有効なレベルの配列を生成
		levelArray = [];
		for (skillLv = 1; skillLv <= skillLvMax; skillLv++) {
			levelArray.push(skillLv);
		}

		// 攻撃手段データの生成
		attackMethodData = new CAttackMethodData();
		attackMethodData.SetSkillId(skillId);
		attackMethodData.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL);
		attackMethodDataArray.push(attackMethodData);

		// オプションリストを生成
		attackMethodOptList = new CAttackMethodOptionList();
		attackMethodOptList.SetType(ATTACK_METHOD_OPTION_LIST_TYPE_SELECT);
		attackMethodData.SetNextOptionList(attackMethodOptList);

		// オプションデータ（レベル）の生成
		for (idxLv = 0; idxLv < levelArray.length; idxLv++) {

			attackMethodOptData = new CAttackMethodOptionData();
			attackMethodOptData.SetValue(levelArray[idxLv]);
			attackMethodOptData.SetLabel("" + levelArray[idxLv]);

			attackMethodOptList.AddOptionData(levelArray[idxLv], attackMethodOptData);
		}

		// デフォルトとして選択されるデータを設定
		attackMethodOptList.SetDefaultOptionDataValue(levelArray[levelArray.length - 1]);
	}



	//----------------------------------------------------------------
	// 装備等によるオートスペルスキルの追加（従来の処理だが、移行完了まで必要）
	//----------------------------------------------------------------

	// オートスペルスキル定義のリストを取得
	autoSpellIdArray = new Array().concat(
		GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL),
		GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED),
		GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL),
		GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL),
		GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED),
		GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL)
	);

	// 特殊条件で追加されるスキルの追加（移行後はおそらく削除可能）
	if(CardNumSearch(164) && GetHigherJobSeriesID(n_A_JOB) == 9){
		autoSpellIdArray.push(95);
	}

	if(CardNumSearch(277) && GetLowerJobSeriesID(n_A_JOB)==1){
		autoSpellIdArray.push(96);
	}

	if(CardNumSearch(707)){
		autoSpellIdArray.push(167);
	}

	if(EquipNumSearch(1096)){
		autoSpellIdArray.push(108);
	}

	if(EquipNumSearch(2124)){
		autoSpellIdArray.push(154);
	}

	if(EquipNumSearch(2427)){
		autoSpellIdArray.push(163);
		autoSpellIdArray.push(164);
	}

	for (idx = 0; idx < autoSpellIdArray.length; idx++) {

		// アイテムのＳＰ定義値を取得（オートスペルスキルＩＤが設定されている）
		autoSpellId = autoSpellIdArray[idx];

		// 当該オートスペルが設定対象外の場合、処理しない
		if (AutoSpellSkill[autoSpellId][AUTO_SPELL_DATA_INDEX_ATTACKABLE] != 1) {
			continue;
		}

		// 実際のスキルＩＤを取得
		skillId = AutoSpellSkill[autoSpellId][AUTO_SPELL_DATA_INDEX_SKILL_ID];

		// スキル最大レベルを取得
		skillLvMax = AutoSpellSkill[autoSpellId][AUTO_SPELL_DATA_INDEX_SKILL_LEVEL];

		// 有効なレベルの配列を生成
		// （本来は発動レベルのみだが、従来の操作性も考慮し、スキルの下限～発動レベルまでとする）
		levelArray = [];
		for (skillLv = 1; skillLv <= skillLvMax; skillLv++) {
			levelArray.push(skillLv);
		}

		// 攻撃手段データの生成
		attackMethodData = new CAttackMethodData();
		attackMethodData.SetSkillId(skillId);
		attackMethodData.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL);
		attackMethodDataArray.push(attackMethodData);

		// オプションリストを生成
		attackMethodOptList = new CAttackMethodOptionList();
		attackMethodOptList.SetType(ATTACK_METHOD_OPTION_LIST_TYPE_SELECT);
		attackMethodData.SetNextOptionList(attackMethodOptList);

		// オプションデータ（レベル）の生成
		for (idxLv = 0; idxLv < levelArray.length; idxLv++) {

			attackMethodOptData = new CAttackMethodOptionData();
			attackMethodOptData.SetValue(levelArray[idxLv]);
			attackMethodOptData.SetLabel("" + levelArray[idxLv]);

			attackMethodOptList.AddOptionData(levelArray[idxLv], attackMethodOptData);
		}

		// デフォルトとして選択されるデータを設定
		attackMethodOptList.SetDefaultOptionDataValue(levelArray[levelArray.length - 1]);
	}



	// TODO: データ移行後の処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockNewProcess()) {

		//----------------------------------------------------------------
		// 装備等による使用可能スキルの追加
		//----------------------------------------------------------------

		// 検索用のSPタグを用意
		spTagArray = [
			new CMigEquipableSpTag().SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL),
			new CMigEquipableSpTag().SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_AS_REFINED),
			new CMigEquipableSpTag().SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL),
			new CMigEquipableSpTag().SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_LEARNED),
			new CMigEquipableSpTag().SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_REFINED),
		];

		// 無視する属性指定を用意（発動トリガなど）
		ignoreAttrArray = [
			MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD,
			MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING,
			MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB,
			MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET,
		];

		// 収集する属性指定を用意（スキルIDとレベル）
		collectAttrArray = [
			MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL,
			MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL,
		];

		// キャラクタデータから該当するデータをすべて収集
		for (idx = 0; idx < spTagArray.length; idx++) {

			// キャラクタデータから該当するデータをすべて収集
			collectedArrayArray = g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).EnumSpAttributes(spTagArray[idx], collectAttrArray, ignoreAttrArray);

			for (idxCollected = 0; idxCollected < collectedArrayArray.length; idxCollected++) {

				collectedArray = collectedArrayArray[idxCollected];

				// 収集したデータを取得
				collectedIdArray = collectedArray[0];
				collectedLevelArray = collectedArray[1];
				collectedMultiplyArray = collectedArray[2];

				// 倍率を計算（倍率は、すべてのスキルに同一値が適用される）
				effectiveMultiply = collectedMultiplyArray.reduce(
					function(a, b) {
					    return Math.max(a, b);
					}
				);

				for (idxArray = 0; idxArray < collectedIdArray.length; idxArray++) {

					// スキルＩＤを取得
					skillId = collectedIdArray[idxArray];

					// スキル最大レベルを取得
					switch (spTagArray[idx].GetSpId()) {

					case MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL:
					case MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL:
						skillLvMax = collectedLevelArray[idxArray] * effectiveMultiply;
						break;

					case MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_AS_REFINED:
					case MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_LEARNED:
					case MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_REFINED:
						skillLvMax = 1 * effectiveMultiply;
						break;
					}

					// 有効なレベルの配列を生成
					// （オートスペルの場合、本来は発動レベルだけでよいが、従来の操作性も考慮し、下限～発動レベルまで許可する）
					levelArray = [];
					for (skillLv = 1; skillLv <= skillLvMax; skillLv++) {
						levelArray.push(skillLv);
					}

					// 攻撃手段データの生成
					attackMethodData = new CAttackMethodData();
					attackMethodData.SetSkillId(skillId);
					attackMethodData.SetSourceType(ATTACK_METHOD_BY_MIG_EQUIPABLE_SP_EFFECT);
					attackMethodDataArray.push(attackMethodData);

					// オプションリストを生成
					attackMethodOptList = new CAttackMethodOptionList();
					attackMethodOptList.SetType(ATTACK_METHOD_OPTION_LIST_TYPE_SELECT);
					attackMethodData.SetNextOptionList(attackMethodOptList);

					// オプションデータ（レベル）の生成
					for (idxLv = 0; idxLv < levelArray.length; idxLv++) {

						attackMethodOptData = new CAttackMethodOptionData();
						attackMethodOptData.SetValue(levelArray[idxLv]);
						attackMethodOptData.SetLabel("" + levelArray[idxLv]);

						attackMethodOptList.AddOptionData(levelArray[idxLv], attackMethodOptData);
					}

					// デフォルトとして選択されるデータを設定
					attackMethodOptList.SetDefaultOptionDataValue(levelArray[levelArray.length - 1]);
				}
			}
		}
	}



	//----------------------------------------------------------------
	// データ元種別含めて、完全に同一の攻撃手段があった場合は、最もレベルが高いもののみを残す
	//----------------------------------------------------------------
	CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArraySubDistinctData(attackMethodDataArray);



	//----------------------------------------------------------------
	// 攻撃手段ごとの追加のオプション設定を追加する
	//----------------------------------------------------------------
	CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArraySubExtractOptions(attackMethodDataArray);



	// 結果を返す
	return attackMethodDataArray;
};

/**
 * 有効な攻撃手段データ配列を取得する（サブ　重複データ削除用）.
 * @param attackMethodDataArray 有効な攻撃手段データ配列
 */
CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArraySubDistinctData = function (attackMethodDataArray) {

	var idxFore = 0;
	var idxBack = 0;

	var attackMethodData = null;
	var attackMethodDataWork = null;
	var attackMethodOptList = null;
	var attackMethodOptListWork = null;
	var bExistAllFore = false;
	var bExistAllBack = false;



	for (idxFore = 0; idxFore < attackMethodDataArray.length; idxFore++) {

		attackMethodData = attackMethodDataArray[idxFore];

		// 当該データより後ろの、すべてのデータを検査
		for (idxBack = idxFore + 1; idxBack < attackMethodDataArray.length; idxBack++) {

			attackMethodDataWork = attackMethodDataArray[idxBack];

			// フルIDが異なる場合は、次へ
			if (attackMethodData.GetFullId() != attackMethodDataWork.GetFullId()) {
				continue;
			}

			// 各データの、子オプションリスト（レベル用オプションリスト）を取得
			attackMethodOptList = attackMethodData.GetNextOptionList();
			attackMethodOptListWork = attackMethodDataWork.GetNextOptionList();

			if ((attackMethodOptList) && (attackMethodOptListWork)) {

				// オプションデータがひとつもないリストは存在しない前提
				bExistAllFore = true;
				bExistAllBack = true;

				// 前方データのすべての要素が、後方データに含まれるかの判定
				attackMethodOptList.ForEachOptionData(
					function (valueF, keyF, mapF) {
						bExistAllFore &= (attackMethodOptListWork.GetOptionData(keyF) !== undefined);
					}
				);

				// 後方データのすべての要素が、当該データに含まれるかの判定
				attackMethodOptListWork.ForEachOptionData(
					function (valueF, keyF, mapF) {
						bExistAllBack &= (attackMethodOptList.GetOptionData(keyF) !== undefined);
					}
				);

				// 結果判定

				// 前方優位の場合（前方のすべてが後方にある、または、前方のいずれかが後方にないが、後方のすべては前方にある）
				if (bExistAllBack) {

					// 後方要素を削除して、再ループ
					attackMethodDataArray.splice(idxBack, 1);
					idxBack--;
					continue;
				}

				// ここに来るならば、後方のいずれかが前方にない

				// 後方優位の場合（前方のすべてが後方にあるが、後方のいずれかが前方にない）
				if (bExistAllFore) {

					// 前方要素を削除して、前方のループへ break
					attackMethodDataArray.splice(idxFore, 1);
					idxFore--;
					break;
				}

				// ここに来るならば、双方とも、相手に存在しないものがある

				// 削除せず、両方残す
			}
		}
	}

};

/**
 * 有効な攻撃手段データ配列を取得する（サブ　オプション展開用）.
 * @param attackMethodDataArray 有効な攻撃手段データ配列
 */
CAttackMethodAreaComponentManager.GetEffectiveAttackMethodDataArraySubExtractOptions = function (attackMethodDataArray) {

	var idx = 0;
	var idxOpt = 0;

	var attackMethodData = null;
	var attackMethodOptList = null;
	var skillId = 0;
	var valueWork = 0;
	var arrayWork = 0;

	/**
	 * ドロップダウンリストにセットする値の配列を取得する. なお value = 0 の表記は 'off' とする.
	 * @param {*} minF 
	 * @param {*} maxF 
	 * @param {*} bZeroOffF 
	 * @returns 
	 */
	var funcCreateNumberDataArrayArray = function (minF, maxF, bZeroOffF) {
		var idxF = 0;
		var arrayF = [];
		// value == 0 で off の表示をする場合
		if (bZeroOffF) {
			arrayF.push([0, "off"]);
		}
		// 最小値から最大値まで追加
		for (idxF = minF; idxF <= maxF; idxF++) {
			arrayF.push([idxF, "" + idxF]);
		}
		// 生成した配列を返す
		return arrayF;
	};

	var funcSetNextOptionList = function (attackMethodOptListBeforeF, attackMethodOptListNextF) {

		// 前段のリストに登録
		switch (attackMethodOptListBeforeF.GetType()) {

		// 前段がセレクト方式の場合
		case ATTACK_METHOD_OPTION_LIST_TYPE_SELECT:

			// 引数で受け取ったオプションリストの、すべてのオプションデータに対して、
			// 生成したオプションリストを、後続のオプションリストとして登録する
			attackMethodOptListBeforeF.ForEachOptionData(
				function (valueFF, keyFF, mapFF) {
					valueFF.SetNextOptionList(attackMethodOptListNextF);
				}
			);
			break;

		// 前段が入力方式の場合
		case ATTACK_METHOD_OPTION_LIST_TYPE_INPUT:

			// 単一の後続として登録する
			attackMethodOptListBeforeF.SetNextOptionList(attackMethodOptListNextF);
			break;

		}
	}

	var funcCreateOptionList = function (attackMethodOptListBeforeF, listLabelF, dataArrayArrayF, defaultValueF) {

		var idxF = 0;
		var idxOptF = 0;

		var attackMethodOptListF = null;
		var attackMethodOptDataF = null;

		// オプションリストを生成
		attackMethodOptListF = new CAttackMethodOptionList();
		attackMethodOptListF.SetType(ATTACK_METHOD_OPTION_LIST_TYPE_SELECT);
		attackMethodOptListF.SetLabel(listLabelF);
		attackMethodOptListF.SetDefaultOptionDataValue(defaultValueF);

		// 生成したオプションリストに、すべての選択肢を追加
		for (idxF = 0; idxF < dataArrayArrayF.length; idxF++) {

			// オプションデータ生成
			attackMethodOptDataF = new CAttackMethodOptionData(dataArrayArrayF[idxF][0], dataArrayArrayF[idxF][1]);

			// オプションリストへ追加
			attackMethodOptListF.AddOptionData(dataArrayArrayF[idxF][0], attackMethodOptDataF);
		}

		// 前段のリストに登録
		funcSetNextOptionList(attackMethodOptListBeforeF, attackMethodOptListF);

		// 生成したオプションリストを返す
		return attackMethodOptListF;
	};

	var funcCreateOptionListAsSkillLvSelect = function (attackMethodOptListBeforeF, skillIdF, bZeroOff, defaultValueF) {
		var nameF = "";
		var maxLvF = 0;
		// 必要な情報を取得
		nameF = g_skillManager.GetSkillName(skillIdF);
		maxLvF = g_skillManager.GetMaxLv(skillIdF);
		// デフォルト値を補正
		if (defaultValueF < 0) {
			defaultValueF = maxLvF;
		}
		// オプションリストを生成、追加して、そのまま戻り値とする
		return funcCreateOptionList(attackMethodOptListBeforeF,
			nameF + "のスキルLv",
			funcCreateNumberDataArrayArray(1, maxLvF, bZeroOff),
			defaultValueF
		);
	};

	/**
	 * 習得可能なスキルの名称と最大Lvを入力可能なドロップダウンリストを生成し返す
	 * @param {*} attackMethodOptListBeforeF 
	 * @param {*} skillIdF セットするスキルのID
	 * @param {*} defaultValueF デフォルトで選択される要素のindex. -1 が指定された時は最大Lvが選択される.
	 * @returns ドロップダウンリスト
	 */
	var funcCreateOptionListAsLearnLvSelect = function (attackMethodOptListBeforeF, skillIdF, defaultValueF) {
		let nameF = "";
		let maxLvF = 0;
		// 必要な情報を取得
		nameF = g_skillManager.GetSkillName(skillIdF);
		maxLvF = g_skillManager.GetMaxLv(skillIdF);
		// デフォルト値を補正
		if (defaultValueF < 0) {
			defaultValueF = maxLvF;
		}
		// オプションリストを生成、追加して、そのまま戻り値とする
		return funcCreateOptionList(attackMethodOptListBeforeF,
			nameF + "の習得Lv",
			funcCreateNumberDataArrayArray(0, maxLvF, false),
			defaultValueF
		);
	};

	/**
	 * ドロップダウンリストを生成し返す
	 * @param {*} attackMethodOptListBeforeF 
	 * @param {*} listLabelF 
	 * @param {*} htmlAttrArrayArrayF 
	 * @param {*} defaultValueF 
	 * @returns ドロップダウンリスト
	 */
	var funcCreateOptionListAsInput = function (attackMethodOptListBeforeF, listLabelF, htmlAttrArrayArrayF, defaultValueF) {
		let attackMethodOptListF = null;
		// オプションリストを生成
		attackMethodOptListF = new CAttackMethodOptionList();
		attackMethodOptListF.SetType(ATTACK_METHOD_OPTION_LIST_TYPE_INPUT);
		attackMethodOptListF.SetLabel(listLabelF);
		attackMethodOptListF.SetDefaultOptionDataValue(defaultValueF);
		attackMethodOptListF.SetHtmlAttrArrayArray(htmlAttrArrayArrayF);
		// 前段のリストに登録
		funcSetNextOptionList(attackMethodOptListBeforeF, attackMethodOptListF);
		// 生成したオプションリストを返す
		return attackMethodOptListF;
	};

	for (idx = 0; idx < attackMethodDataArray.length; idx++) {
		// 攻撃手段データ取得
		attackMethodData = attackMethodDataArray[idx];
		// レベル選択のオプションリストを取得
		attackMethodOptList = attackMethodData.GetNextOptionList();
		// スキルIDを取得
		skillId = attackMethodData.GetSkillId();
		// スキルIDによって分岐
		switch (skillId) {
			//----------------------------------------------------------------
			// アコライト：ルアフ
			// ギロチンクロス：ファントムメナス
			// 修羅：地雷震
			//----------------------------------------------------------------
			case SKILL_ID_RUWACH:
			case SKILL_ID_PHANTOM_MENUS:
			case SKILL_ID_ZIRAISHIN:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵の状態",
					[
						[0, "通常"],
						[1, "ハイド中"],
					],
					((skillId == SKILL_ID_ZIRAISHIN) ? 0 : 1)
				);
				break;
			//----------------------------------------------------------------
			// マジシャン：ナパームビート
			// ハイウィザード：ナパームバルカン
			// 影狼・朧：無茶投げ
			// 特殊：アースクエイク
			//----------------------------------------------------------------
			case SKILL_ID_NAPALM_BEAT:
			case SKILL_ID_NAPALM_VULKAN:
			case SKILL_ID_MUCHANAGE:
			case SKILL_ID_EARTH_QUAKE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵の数(分散ダメージ用)",
					funcCreateNumberDataArrayArray(1, 20, false),
					1
				);
				break;
			//----------------------------------------------------------------
			// マーチャント：カートレボリューション
			// ホワイトスミス：カートターミネーション
			//----------------------------------------------------------------
			case SKILL_ID_CART_REVOLUTION:
			case SKILL_ID_CART_TERMINATION:
				// カート積載可能量を計算
				valueWork = 8000 + 500 * Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"カート重量",
					[
						["type", "number"],
						["min", 0],
						["max", valueWork],
					],
					valueWork
				);
				break;
			//----------------------------------------------------------------
			// ジェネティック：カートトルネード
			//----------------------------------------------------------------
			case SKILL_ID_CART_TORNADO:
				// カート積載可能量を計算
				valueWork = 8000 + 500 * Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"カート重量",
					[
						["type", "number"],
						["min", 0],
						["max", valueWork],
					],
					valueWork
				);
				// バイオロではない場合は選択させない
				if (!IsSameJobClass(MIG_JOB_ID_BIOLO)) {
					break;
				}
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ｳﾄﾞｩﾝｳｫﾘｱｰ",
					[
						[0, "無し"],
						[1, "召喚中"],
					],
					0
				);
				break;
			//----------------------------------------------------------------
			// ジェネティック：スポアエクスプロージョン
			//----------------------------------------------------------------
			case SKILL_ID_SPORE_EXPLOSION:
				// バイオロではない場合は選択させない
				if (!IsSameJobClass(MIG_JOB_ID_BIOLO)) {
					break;
				}
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ｳﾄﾞｩﾝﾌｪｱﾘｰ",
					[
						[0, "無し"],
						[1, "召喚中"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// ウィザード：ストームガスト
			//----------------------------------------------------------------
			case SKILL_ID_STORM_GUST:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"HIT数",
					funcCreateNumberDataArrayArray(1, 10, false),
					3
				);
				break;


			//----------------------------------------------------------------
			// ウィザード：メテオストーム
			//----------------------------------------------------------------
			case SKILL_ID_METEOR_STORM:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"隕石の命中回数",
					funcCreateNumberDataArrayArray(1, 7, false),
					7
				);
				break;


			//----------------------------------------------------------------
			// モンク：阿修羅覇凰拳
			//----------------------------------------------------------------
			case SKILL_ID_ASHURA_HAOKEN:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"発動前残りSP",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// モンク：三段掌コンボ
			//----------------------------------------------------------------
			case SKILL_ID_COMBO_SANDAN_MONK:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_RENDASHO, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_MORYUKEN, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_ASHURA_HAOKEN_SPKOTEI, true, 0);
				break;


			//----------------------------------------------------------------
			// ナイト：チャージアタック
			//----------------------------------------------------------------
			case SKILL_ID_CHARGE_ATTACK:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵との距離",
					[
						[0, "0～3セル"],
						[1, "4～6セル"],
						[2, "7～9セル"],
						[3, "10～12セル"],
						[4, "13セル以上"],
					],
					4
				);
				break;


			//----------------------------------------------------------------
			// ハンター：ビーストストレイフィング
			//----------------------------------------------------------------
			case SKILL_ID_BEAST_STRAIFING:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"",
					[
						[0, "ダブルストレイフィングのダメージを足さずに計算"],
						[1, "DS Lv10のダメージを足して攻撃回数を計算"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 忍者：手裏剣投げ
			//----------------------------------------------------------------
			case SKILL_ID_SHURIKEN_NAGE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"手裏剣の種類",
					[
						[0, SyurikenOBJ[0][2]],
						[1, SyurikenOBJ[1][2]],
						[2, SyurikenOBJ[2][2]],
						[3, SyurikenOBJ[3][2]],
						[4, SyurikenOBJ[4][2]],
						[5, SyurikenOBJ[5][2]],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 忍者：苦無投げ
			// 影狼朧：八方苦無
			//----------------------------------------------------------------
			case SKILL_ID_KUNAI_NAGE:
			case SKILL_ID_HAPPO_KUNAI:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"苦無の種類",
					[
						[0, KunaiOBJ[0][2]],
						[1, KunaiOBJ[1][2]],
						[2, KunaiOBJ[2][2]],
						[3, KunaiOBJ[3][2]],
						[4, KunaiOBJ[4][2]],
						[5, KunaiOBJ[5][2]],
						[6, KunaiOBJ[6][2]],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 忍者：一閃
			//----------------------------------------------------------------
			case SKILL_ID_ISSEN:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"残りHP",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"残り影分身",
					funcCreateNumberDataArrayArray(0, 5, false),
					5
				);
				break;


			//----------------------------------------------------------------
			// 忍者：一閃(MAXHP固定)
			//----------------------------------------------------------------
			case SKILL_ID_ISSEN_MAX:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"残りHP(MAX固定)",
					[
						["type", "number"],
						["min", 0],
						["max", 0],
						["disabled", "disabled"],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"残り影分身",
					funcCreateNumberDataArrayArray(0, 5, false),
					5
				);
				break;


			//----------------------------------------------------------------
			// ガンスリンガー：デスペラード
			//----------------------------------------------------------------
			case SKILL_ID_DEATHPERAD:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"HIT数(期待値)",
					[
						[0, "1Hit"],
						[1, "1.2Hit"],
						[2, "1.6Hit"],
						[3, "2Hit"],
						[4, "2.4Hit"],
						[5, "3Hit"],
						[6, "3.6Hit"],
						[7, "4Hit"],
						[8, "5Hit"],
						[9, "6Hit"],
						[10, "7Hit"],
						[11, "8Hit"],
						[12, "9Hit"],
						[13, "10Hit"],
					],
					6
				);
				break;


			//----------------------------------------------------------------
			// チャンピオン：三段掌コンボ
			//----------------------------------------------------------------
			case SKILL_ID_COMBO_SANDAN_CHAMP:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_RENDASHO, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_MORYUKEN, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_BUKKOKEN, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_RENCHUHOGEKI, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_ASHURA_HAOKEN_SPKOTEI, true, 0);
				break;


			//----------------------------------------------------------------
			// ルーンナイト：ハンドレッドスピア
			//----------------------------------------------------------------
			case SKILL_ID_HANDRED_SPEAR:
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_SPIRAL_PIERCE, -1);
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_SPEAR_BOOMERANG, 0);
				if (n_A_JOB == MIG_JOB_ID_DRAGON_KNIGHT) {
					// ドラゴンナイトの場合
					attackMethodOptList = funcCreateOptionList(attackMethodOptList,
						"チャージングピアースLv",
						[
							[0, "off"],
							[1, "1"],
							[2, "2"],
							[3, "3"],
							[4, "4"],
							[5, "5"],
							[6, "6"],
							[7, "7"],
							[8, "8"],
							[9, "9"],
							[10, "10"],
						],
						0
					);			
				}
				break;

			// ピアース
			// スパイラルピアース
			// マッドネスクラッシャー
			case SKILL_ID_PIERCE:
			case SKILL_ID_SPIRAL_PIERCE:
			case SKILL_ID_MADNESS_CRUSHER:
				if (n_A_JOB == MIG_JOB_ID_DRAGON_KNIGHT) {
					// ドラゴンナイトの場合
					attackMethodOptList = funcCreateOptionList(attackMethodOptList,
						"チャージングピアース",
						[
							[0, "off"],
							[1, "1"],
							[2, "2"],
							[3, "3"],
							[4, "4"],
							[5, "5"],
							[6, "6"],
							[7, "7"],
							[8, "8"],
							[9, "9"],
							[10, "10"],
						],
						0
					);			
				}
				break;

			//----------------------------------------------------------------
			// ルーンナイト：イグニッションブレイク
			//----------------------------------------------------------------
			case SKILL_ID_IGNITION_BREAK:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵との距離",
					[
						[0, "近"],
						[1, "中"],
						[2, "遠"],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"スキル倍率を-1する",
					[
						[0, "off"],
						[1, "on"],
					],
					1
				);
				break;


			//----------------------------------------------------------------
			// ルーンナイト：ファイアードラゴンブレス
			// ルーンナイト：ウォータードラゴンブレス
			//----------------------------------------------------------------
			case SKILL_ID_FIRE_DRAGON_BREATH:
			case SKILL_ID_WATER_DRAGON_BREATH:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"現在のHP (0の場合MaxHPで計算)",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ギロチンクロス：ダークイリュージョン
			//----------------------------------------------------------------
			case SKILL_ID_DARK_ILLUSION:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_CROSS_IMPACT, -1);
				break;


			//----------------------------------------------------------------
			// ギロチンクロス：クロスリッパーラッシャー
			//----------------------------------------------------------------
			case SKILL_ID_CROSS_RIPPER_SLASHER:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"回転カウンター数",
					funcCreateNumberDataArrayArray(1, 10, false),
					10
				);
				break;


			//----------------------------------------------------------------
			// レンジャー：エイムドボルト
			//----------------------------------------------------------------
			case SKILL_ID_AIMED_BOLT:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"",
					[
						[1, "通常計算"],
						[2, "最小Hit回数固定"],
						[3, "最大Hit回数固定"],
					],
					1
				);
				break;


			//----------------------------------------------------------------
			// レンジャー：鋭敏な嗅覚
			//----------------------------------------------------------------
			case SKILL_ID_EIBINNA_KYUKAKU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_WUG_BITE, 0);
				break;


			//----------------------------------------------------------------
			// ウォーロック：ソウルエクスパンション
			//----------------------------------------------------------------
			case SKILL_ID_SOUL_EXPANSION:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ホワイトインプリズン状態(Boss無効)",
					[
						[0, "なし"],
						[1, "Lv1"],
						[2, "Lv2"],
						[3, "Lv3"],
						[4, "Lv4"],
						[5, "Lv5"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ウォーロック：ジャックフロスト
			//----------------------------------------------------------------
			case SKILL_ID_JACK_FROST:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"氷結状態",
					[
						[0, "なし"],
						[1, "あり"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ウォーロック：コメット
			//----------------------------------------------------------------
			case SKILL_ID_COMMET:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"中心からの距離",
					[
						[0, "0～3マス"],
						[1, "4～5マス"],
						[2, "6～7マス"],
						[3, "8～9マス"],
						[4, "協力発動"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ウォーロック：チェーンライトニング
			//----------------------------------------------------------------
			case SKILL_ID_CHAIN_LIGHTNING:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"Hit数",
					[
						[1, "1Hit"],
						[2, "2Hit"],
						[3, "3Hit"],
						[4, "4Hit"],
						[5, "5Hit"],
						[6, "6Hit"],
					],
					4
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"魔法力増幅の扱い",
					[
						[0, "1Hit目のみ"],
						[1, "2Hit適用"],
						[2, "3Hit適用"],
						[3, "4Hit適用"],
						[4, "5Hit適用"],
						[5, "6Hit適用"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ウォーロック：テトラボルテックス
			//----------------------------------------------------------------
			case SKILL_ID_TETRA_BOLTEX:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ボール属性(1&2)",
					[
						[11, "水水"],
						[22, "地地"],
						[33, "火火"],
						[44, "風風"],
						[12, "水地"],
						[13, "水火"],
						[14, "水風"],
						[21, "地水"],
						[23, "地火"],
						[24, "地風"],
						[31, "火水"],
						[32, "火地"],
						[34, "火風"],
						[41, "風水"],
						[42, "風地"],
						[43, "風火"],
					],
					33
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ボール属性(3&4)",
					[
						[11, "水水"],
						[22, "地地"],
						[33, "火火"],
						[44, "風風"],
						[12, "水地"],
						[13, "水火"],
						[14, "水風"],
						[21, "地水"],
						[23, "地火"],
						[24, "地風"],
						[31, "火水"],
						[32, "火地"],
						[34, "火風"],
						[41, "風水"],
						[42, "風地"],
						[43, "風火"],
					],
					33
				);
				break;


			//----------------------------------------------------------------
			// ウォーロック：サモンファイアーボール
			// ウォーロック：サモンウォーターボール
			// ウォーロック：サモンライトインングボール
			// ウォーロック：サモンストーン
			//----------------------------------------------------------------
			case SKILL_ID_SUMMON_FIRE_BALL:
			case SKILL_ID_SUMMON_WATER_BALL:
			case SKILL_ID_SUMMON_LIGHTNING_BALL:
			case SKILL_ID_SUMMON_STONE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"リリース時に放出する玉の数",
					[
						[1, "1個"],
						[2, "2個"],
						[3, "3個"],
						[4, "4個"],
						[5, "5個"],
					],
					1
				);
				break;


			//----------------------------------------------------------------
			// メカニック：パワースイング
			//----------------------------------------------------------------
			case SKILL_ID_POWER_SWING:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, 
					SKILL_ID_AXE_BOOMERANG,
					((GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ROGUE) ? 0 : 3)
				);
				if (n_A_JOB === MIG_JOB_ID_MEISTER) {
					attackMethodOptList = funcCreateOptionList(attackMethodOptList,
						"ABRバトルウォリアー",
						[
							[0, "無し"],
							[1, "召喚中"],
						],
						0
					);			
				}
				break;


			//----------------------------------------------------------------
			// メカニック：アームズキャノン
			//----------------------------------------------------------------
			case SKILL_ID_ARMS_CANNON:

				// オプションリストを生成、追加
				arrayWork = [];
				for (idxOpt = 0; idxOpt < CanonOBJ.length; idxOpt++) {
					arrayWork.push([idxOpt, CanonOBJ[idxOpt][2]])
				}
				attackMethodOptList = funcCreateOptionList(attackMethodOptList, "", arrayWork, 1);
				break;


			//----------------------------------------------------------------
			// ジェネティック：カートキャノン
			//----------------------------------------------------------------
			case SKILL_ID_CART_CANNON:

				// オプションリストを生成、追加
				arrayWork = [];
				for (idxOpt = 0; idxOpt < CanonOBJ.length; idxOpt++) {
					arrayWork.push([idxOpt, CanonOBJ[idxOpt][2]])
				}
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ｷｬﾉﾝﾎﾞｰﾙ",
					arrayWork,
					1
				);
				// バイオロではない場合は選択させない
				if (!IsSameJobClass(MIG_JOB_ID_BIOLO)) {
					break;
				}
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ｳﾄﾞｩﾝｳｫﾘｱｰ",
					[
						[0, "無し"],
						[1, "召喚中"],
					],
					0
				);
				break;			

			//----------------------------------------------------------------
			// メカニック：セルフディストラクション
			//----------------------------------------------------------------
			case SKILL_ID_SELF_DESTRUCTION:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"残りHP",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"残りSP",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ロイヤルガード：バニシングポイント
			//----------------------------------------------------------------
			case SKILL_ID_BANISHING_POINT:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_BASH, -1);
				break;


			//----------------------------------------------------------------
			// ロイヤルガード：レイジバーストアタック
			//----------------------------------------------------------------
			case SKILL_ID_RAGE_BURST_ATTACK:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"怒りゲージ数",
					funcCreateNumberDataArrayArray(0, 15, false),
					15
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"現在のHP（0の場合は最大HPで計算）",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ロイヤルガード：オーバーブランド
			//----------------------------------------------------------------
			case SKILL_ID_OVER_BLAND:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"壁の3Hit目",
					[
						[0, "なし"],
						[1, "あり"],
					],
					1
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_SPEAR_QUICKEN, -1);
				break;


			//----------------------------------------------------------------
			// ロイヤルガード：ムーンスラッシャー
			//----------------------------------------------------------------
			case SKILL_ID_MOON_SLUSHER:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_OVER_BLAND, -1);
				break;


			//----------------------------------------------------------------
			// 修羅：双龍脚
			//----------------------------------------------------------------
			case SKILL_ID_SORYUKYAKU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"固有ディレイ",
					[
						[0, "なし(仮)"],
						[1, "あり(仮)"],
						[2, "あり+0.3秒(仮)"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 修羅：爆気散弾
			//----------------------------------------------------------------
			case SKILL_ID_BAKKISANDAN:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"気弾数",
					funcCreateNumberDataArrayArray(0, 15, false),
					15
				);
				break;


			//----------------------------------------------------------------
			// 修羅：修羅身弾
			//----------------------------------------------------------------
			case SKILL_ID_SHURASHINDAN:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"Hit数",
					[
						[0, "1Hit"],
						[1, "2Hit"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 修羅：天羅地網
			// 修羅：號砲
			// 修羅：羅刹破凰撃(HPSP固定)
			//----------------------------------------------------------------
			case SKILL_ID_TENRACHIMO:
			case SKILL_ID_GOHO:
			case SKILL_ID_RASETSU_HAOGEKI_MAX:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"単発orコンボ",
					[
						[0, "単発発動"],
						[1, "コンボ時"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 修羅：閃光連撃
			//----------------------------------------------------------------
			case SKILL_ID_SENKO_RENGEKI:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_SORYUKYAKU, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_DAITENHOSUI, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_GOHO, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_TENRACHIMO, false, -1);
				break;


			//----------------------------------------------------------------
			// 修羅：羅刹破凰撃(HPSP変動可)
			//----------------------------------------------------------------
			case SKILL_ID_RASETSU_HAOGEKI:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"単発orコンボ",
					[
						[0, "単発発動"],
						[1, "コンボ時"],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"HP",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"SP",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 修羅：破碎柱
			//----------------------------------------------------------------
			case SKILL_ID_HASAICHU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"壁の追撃",
					[
						[0, "なし"],
						[1, "あり"],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"敵の残りHP(0の場合MaxHP)",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"被ダメージ(0の場合は計算結果の[平均被ダメージ]を使用)",
					[
						["type", "number"],
						["min", 0],
						["max", 99999],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 修羅：双龍脚コンボ
			//----------------------------------------------------------------
			case SKILL_ID_COMBO_SORYUKYAKU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_SORYUKYAKU, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_TENRACHIMO, true, 0);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_DAITENHOSUI, true, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_GOHO, true, 0);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_RASETSU_HAOGEKI_MAX, true, -1);
				break;


			//----------------------------------------------------------------
			// ミンストレル・ワンダラー：グレートエコー
			//----------------------------------------------------------------
			case SKILL_ID_GREAT_ECHO:
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"パートナー",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ミンストレル・ワンダラー：シビアレインストーム(特殊)
			//----------------------------------------------------------------
			case SKILL_ID_SEVERE_RAINSTORM_EX:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"発動時のDEX",
					funcCreateNumberDataArrayArray(0, 999, false),
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"発動時のAGI",
					funcCreateNumberDataArrayArray(0, 999, false),
					0
				);
				break;


			//----------------------------------------------------------------
			// ソーサラー：ファイアーウォーク
			// ソーサラー：エレクトリックウォーク
			//----------------------------------------------------------------
			case SKILL_ID_FIRE_WALK:
			case SKILL_ID_ELECTRIC_WALK:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"踏ませるセルの数",
					funcCreateNumberDataArrayArray(0, 16, false),
					16
				);
				break;


			//----------------------------------------------------------------
			// ソーサラー：スペルフィスト
			//----------------------------------------------------------------
			case SKILL_ID_SPELL_FIST:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"使用ボルト",
					[
						[0, "ファイアーボルト"],
						[1, "コールドボルト"],
						[2, "ライトニングボルト"],
					],
					0
				);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ボルトLv",
					funcCreateNumberDataArrayArray(0, 10, false),
					10
				);
				break;


			//----------------------------------------------------------------
			// ソーサラー：サイキックウェーブ
			//----------------------------------------------------------------
			case SKILL_ID_PSYCHIC_WAVE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"精霊による攻撃属性変化",
					[
						[0, "無"],
						[1, "水"],
						[2, "地"],
						[3, "火"],
						[4, "風"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ソーサラー：アースグレイヴ
			//----------------------------------------------------------------
			case SKILL_ID_EARTH_GRAVE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_SEISMIC_WEAPON, -1);
				break;


			//----------------------------------------------------------------
			// ソーサラー：ダイアモンドダスト
			//----------------------------------------------------------------
			case SKILL_ID_DIAMOND_DUST:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_FROST_WEAPON, -1);
				break;


			//----------------------------------------------------------------
			// ソーサラー：ヴェラチュールスピアー
			//----------------------------------------------------------------
			case SKILL_ID_VERATURE_SPEAR:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_LIGHTNING_LOADER, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_STRIKING, -1);
				break;


			//----------------------------------------------------------------
			// ジェネティック：スリングアイテム
			//----------------------------------------------------------------
			case SKILL_ID_SLING_ITEM:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"投擲アイテム",
					[
						[0, "リンゴ爆弾"],
						[1, "パイナップル爆弾"],
						[2, "ココナッツ爆弾"],
						[3, "メロン爆弾"],
						[4, "バナナ爆弾"],
					],
					4
				);
				break;


			//----------------------------------------------------------------
			// ジェネティック：クレイジーウィード
			//----------------------------------------------------------------
			case SKILL_ID_CRAZY_WEED:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"HIT数(期待値)",
					[
						[0, "0Hit"],
						[1, "1Hit"],
						[2, "2Hit"],
						[3, "3Hit"],
						[4, "4Hit"],
						[5, "5Hit"],
						[6, "6Hit"],
						[7, "7Hit"],
						[8, "8Hit"],
					],
					3
				);
				break;


			//----------------------------------------------------------------
			// ジェネティック：ヘルズプラント
			//----------------------------------------------------------------
			case SKILL_ID_HELLS_PLANT:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_BIOPLANT, -1);
				break;


			//----------------------------------------------------------------
			// ジェネティック：ファイアーエクスパンション
			//----------------------------------------------------------------
			case SKILL_ID_FIRE_EXPANSION:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_ACID_DEMONSTRATION, -1);
				break;


			//----------------------------------------------------------------
			// 影狼・朧：十文字切り
			//----------------------------------------------------------------
			case SKILL_ID_ZYUMONZIGIRI:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"設定",
					[
						[0, "通常"],
						[1, "2連撃(1～2の合計)"],
						[2, "3連撃(1～3の合計)"],
						[3, "4連撃(1～4の合計)"],
						[4, "5連撃(1～5の合計)"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// 影狼・朧：黄泉返し
			//----------------------------------------------------------------
			case SKILL_ID_YOMIGAESHI:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵の魂SkillのLv",
					funcCreateNumberDataArrayArray(0, 5, false),
					0
				);
				break;


			//----------------------------------------------------------------
			// 影狼・朧：風魔手裏剣・乱華
			//----------------------------------------------------------------
			case SKILL_ID_FUMASHURIKEN_RANKA:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_FUMASHURIKEN_NAGE, -1);
				break;


			//----------------------------------------------------------------
			// リベリオン：ファイアーダンス
			//----------------------------------------------------------------
			case SKILL_ID_FIRE_DANCE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsLearnLvSelect(attackMethodOptList, SKILL_ID_DEATHPERAD, -1);
				break;


			//----------------------------------------------------------------
			// リベリオン：ハンマーオブゴッド
			//----------------------------------------------------------------
			case SKILL_ID_HAMMER_OF_GOD:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"コインの枚数",
					funcCreateNumberDataArrayArray(1, 10, false),
					10
				);
				break;


			//----------------------------------------------------------------
			// リベリオン：ラウンドトリップ
			//----------------------------------------------------------------
			case SKILL_ID_ROUND_TRIP:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"HIT数",
					[
						[0, "1Hit"],
						[1, "2Hit"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ギガントセット：ジョイントビートからのコンボ
			//----------------------------------------------------------------
			case SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_JOINT_BEAT, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_SPIRAL_PIERCE, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_SONIC_WAVE, false, -1);
				break;


			//----------------------------------------------------------------
			// ギガントセット：スパイラルピアースからのコンボ
			//----------------------------------------------------------------
			case SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_SPIRAL_PIERCE, false, -1);

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsSkillLvSelect(attackMethodOptList, SKILL_ID_SONIC_WAVE, false, -1);
				break;


			//----------------------------------------------------------------
			// サモナー：かみつく
			//----------------------------------------------------------------
			case SKILL_ID_KAMITSUKU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵の残りHP",
					[
						[0, "70%より多い"],
						[1, "70%以下"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// サモナー：イヌハッカメテオ
			//----------------------------------------------------------------
			case SKILL_ID_INUHAKKA_METEOR:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"HIT数(期待値)",
					[
						[2, "1"],
						[3, "1.5"],
						[4, "2"],
						[5, "2.5"],
						[6, "3"],
						[7, "3.5"],
						[8, "4"],
						[9, "4.5"],
						[10, "5"],
						[11, "5.5"],
						[12, "6"],
						[13, "6.5"],
						[14, "7"],
					],
					5
				);
				// スピリットハンドラーではない場合、レインボーホーンを選択させない
				if (!IsSameJobClass(MIG_JOB_ID_SPIRIT_HANDLER)) {
					break;
				}
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"レインボーホーン",
					[
						[ELM_ID_VANITY,	"なし"],		// 属性は common.js で EnumElmId として定義されている
						[ELM_ID_WATER,	"Lv1:水属性"],  // ELM_ID_VANITY = 0 から
						[ELM_ID_WIND,	"Lv2:風属性"],
						[ELM_ID_EARTH,	"Lv3:地属性"],
						[ELM_ID_FIRE,	"Lv4:火属性"],
						[ELM_ID_DARK,	"Lv5:闇属性"],
						[ELM_ID_HOLY,	"Lv6:聖属性"],
					],
					0
				);
				break;



			//----------------------------------------------------------------
			// サモナー：ピッキ突き
			//----------------------------------------------------------------
			case SKILL_ID_PIKKI_TSUKI:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵の残りHP",
					[
						[70, "70%以上"],
						[69, "70%未満"],
						[59, "60%未満"],
						[49, "50%未満"],
						[39, "40%未満"],
						[29, "30%未満"],
					],
					70
				);
				break;


			//----------------------------------------------------------------
			// 星帝：紅焔脚
			//----------------------------------------------------------------
			case SKILL_ID_KOEN_KYAKU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"HIT数",
					[
						[3, "対象＋追加"],
						[1, "対象のみ"],
						[2, "追加のみ"],
					],
					3
				);
				break;


			//----------------------------------------------------------------
			// 星帝：新星爆発
			//----------------------------------------------------------------
			case SKILL_ID_SHINSE_BAKUHATSU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"次元の書",
					[
						[0, "なし"],
						[1, "あり"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// ドラゴンナイト：サーヴァントウェポン：ファントム
			// ドラゴンナイト：サーヴァントウェポン：デモリッション
			//----------------------------------------------------------------
			case SKILL_ID_SERVANT_WEAPON_PHANTOM:
			case SKILL_ID_SERVANT_WEAPON_DEMOLISION:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"武器体の数",
					[
						[1, "1"],
						[2, "2"],
						[3, "3"],
						[4, "4"],
						[5, "5"],
					],
					5
				);
				break;


			//----------------------------------------------------------------
			// シャドウクロス：サベージインパクト
			//----------------------------------------------------------------
			case SKILL_ID_SAVAGE_IMPACT:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"クローキングエクシード",
					[
						[0, "なし"],
						[1, "あり"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// シャドウクロス：エターナルスラッシュ
			//----------------------------------------------------------------
			case SKILL_ID_ETERNAL_SLASH:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"エターナルカウンター",
					[
						[0, "なし"],
						[1, "1"],
						[2, "2"],
						[3, "3"],
						[4, "4"],
						[5, "5"],
					],
					5
				);
				break;


			//----------------------------------------------------------------
			// シャドウクロス：シャドウスタブ
			//----------------------------------------------------------------
			case SKILL_ID_SHADOW_STAB:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"クローキングエクシード",
					[
						[0, "なし"],
						[1, "あり"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// シャドウクロス：インパクトクレーター
			//----------------------------------------------------------------
			case SKILL_ID_IMPACT_CRATER:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"回転カウンター",
					[
						[1, "1"],
						[2, "2"],
						[3, "3"],
						[4, "4"],
						[5, "5"],
						[6, "6"],
						[7, "7"],
						[8, "8"],
						[9, "9"],
						[10, "10"],
					],
					10
				);
				break;


			//----------------------------------------------------------------
			// ウィンドホーク：クレッシブボルト
			//----------------------------------------------------------------
			case SKILL_ID_CRESSIVE_VOLT:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"クレッシブボルト状態",
					[
						[0, "なし"],
						[1, "1 回目"],
						[2, "2 回目"],
						[3, "3 回目"],
					],
					0
				);
				break;


			//----------------------------------------------------------------
			// インペリアルガード：オーバースラッシュ
			//----------------------------------------------------------------
			case SKILL_ID_OVER_SLASH:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"範囲内の敵数",
					[
						[0, "1 体"],
						[1, "2～3 体"],
						[2, "4 体以上"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// アビスチェイサー：アビススクエア
			//----------------------------------------------------------------
			case SKILL_ID_ABYSS_SQUARE:
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"使用者の位置",
					[
						[0, "範囲外"],
						[1, "範囲内"],
					],
					1
				);
				break;

			//----------------------------------------------------------------
			// バイオロ：アシディファイドゾーン
			//----------------------------------------------------------------
			case SKILL_ID_ACIDIFIED_ZONE_MIZU:
			case SKILL_ID_ACIDIFIED_ZONE_CHI:
			case SKILL_ID_ACIDIFIED_ZONE_HI:
			case SKILL_ID_ACIDIFIED_ZONE_KAZE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ダメージ表示",
					[
						[0, "使用時ダメージ"],
						[1, "設置ダメージ(未調整)"],
					],
					0
				);
				break;
			
			//----------------------------------------------------------------
			// ハイパーノービス：ジャックフロストノヴァ
			//----------------------------------------------------------------
			case SKILL_ID_JACK_FROST_NOVA:
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ダメージ表示",
					[
						[0, "使用時ダメージ"],
						[1, "追加持続ダメージ"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// ハイパーノービス：グラウンドグラビテーション
			//----------------------------------------------------------------
			case SKILL_ID_GROUND_GRAVITATION:
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ダメージ表示",
					[
						[0, "使用時ダメージ"],
						[1, "追加持続ダメージ"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// ナイトウォッチ：照準カウンター
			//----------------------------------------------------------------
			case SKILL_ID_ONLY_ONE_BULLET:
			case SKILL_ID_SPIRAL_SHOOTING:
			case SKILL_ID_MAGAZIN_FOR_ONE:
			case SKILL_ID_VIGILANT_AT_NIGHT:
			case SKILL_ID_WILD_FIRE:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"照準カウンター",
					[
						[0, "なし"],
						[1, "1 個"],
						[2, "2 個"],
						[3, "3 個"],
						[4, "4 個"],
						[5, "5 個"],
						[6, "6 個"],
						[7, "7 個"],
						[8, "8 個"],
						[9, "9 個"],
						[10,"10 個"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼・不知火：悪夢
			//----------------------------------------------------------------
			case SKILL_ID_GENJUTSU_KAGE_NUI:
			case SKILL_ID_GENJUTSU_KUNAI:
			case SKILL_ID_GENZYUTSU_ANKOKURYUU:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"悪夢",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼・不知火：風魔手裏剣-構築-
			//----------------------------------------------------------------
			case SKILL_ID_FUMASHURIKEN_KOUCHIKU:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"風魔手裏剣トラップ",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"風魔手裏剣-掌握-の習得Lv",
					[
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					5
				);
				break;

			//----------------------------------------------------------------
			// ハイパーノービス：ダブルボウリングバッシュ巻き込み数
			//----------------------------------------------------------------
			case SKILL_ID_DOUBLE_BOWLING_BASH:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"巻き込み数",
					[
						[0, "無し"],
						[1, "２～３体"],
						[2, "４体～"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// ハイパーノービス：メガソニックブローの敵HP残量
			//----------------------------------------------------------------
			case SKILL_ID_MEGA_SONIC_BLOW:

				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"敵の残りHP",
					[
						[0, "50%以上"],
						[1, "50%未満"],
					],
					0
				);
				break;

			/**
			 * ディアーキャノン
			 * ディアーブリーズ
			 * ディアースピリットパワー
			 */
			case SKILL_ID_DEER_CANON:
			case SKILL_ID_DEER_BREEZE:
			case SKILL_ID_HYUN_ROK_SPIRIT_POWER:
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"レインボーホーン",
					[
						[ELM_ID_VANITY,	"なし"],		// 属性は common.js で EnumElmId として定義されている
						[ELM_ID_WATER,	"Lv1:水属性"],  // ELM_ID_VANITY = 0 から
						[ELM_ID_WIND,	"Lv2:風属性"],
						[ELM_ID_EARTH,	"Lv3:地属性"],
						[ELM_ID_FIRE,	"Lv4:火属性"],
						[ELM_ID_DARK,	"Lv5:闇属性"],
						[ELM_ID_HOLY,	"Lv6:聖属性"],
					],
					ELM_ID_VANITY
				);
				break;

			//----------------------------------------------------------------
			// ナイトウォッチ：ベーシックグレネード ヘイスティファイアインザホール グレネーズドロッピング
			//----------------------------------------------------------------
			case SKILL_ID_BASIC_GRENADE :
			case SKILL_ID_HASTY_FIRE_IN_THE_HOLE :
			case SKILL_ID_GRENADES_DROPPING :
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"グレネードフラグメント",
					[
						[ELM_ID_VANITY,	"なし"],		// 属性は common.js で EnumElmId として定義されている
						[ELM_ID_WATER,	"Lv1:水属性"],  // ELM_ID_VANITY = 0 から
						[ELM_ID_WIND,	"Lv2:風属性"],
						[ELM_ID_EARTH,	"Lv3:地属性"],
						[ELM_ID_FIRE,	"Lv4:火属性"],
						[ELM_ID_DARK,	"Lv5:闇属性"],
						[ELM_ID_HOLY,	"Lv6:聖属性"],
					],
					ELM_ID_VANITY
				);
				break;

			//----------------------------------------------------------------
			// ナイトウォッチ：ミッションボンバード
			//----------------------------------------------------------------
			case SKILL_ID_MISSION_BOMBARD :
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"グレネードフラグメント",
					[
						[ELM_ID_VANITY,	"なし"],		// 属性は common.js で EnumElmId として定義されている
						[ELM_ID_WATER,	"Lv1:水属性"],  // ELM_ID_VANITY = 0 から
						[ELM_ID_WIND,	"Lv2:風属性"],
						[ELM_ID_EARTH,	"Lv3:地属性"],
						[ELM_ID_FIRE,	"Lv4:火属性"],
						[ELM_ID_DARK,	"Lv5:闇属性"],
						[ELM_ID_HOLY,	"Lv6:聖属性"],
					],
					ELM_ID_VANITY
				);
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ダメージ表示",
					[
						[0, "使用時ダメージ"],
						[1, "追加持続ダメージ"],
					],
					0
				);
				break;		

			//----------------------------------------------------------------
			// アークメイジ：アストラルストライク
			//----------------------------------------------------------------
			case SKILL_ID_ASTRAL_STRIKE :
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ダメージ表示",
					[
						[0, "使用時ダメージ"],
						[1, "追加持続ダメージ"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// アークメイジ：オールブルーム
			//----------------------------------------------------------------
			case SKILL_ID_ALL_BLOOM :
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"クライマックスLv5の場合",
					[
						[0, "設置ダメージ"],
						[1, "追撃ダメージ"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：属性砲
			//----------------------------------------------------------------
			case SKILL_ID_SEKIEN_HOU:
			case SKILL_ID_REIKETSU_HOU:
			case SKILL_ID_RAIDEN_HOU:
			case SKILL_ID_KINNRYUU_HOU:
			case SKILL_ID_ANTEN_HOU:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"蜃気楼分身の状態",
					[
						[0, "本体のみ"],
						[1, "本体 + 分身1体"],
						[2, "本体 + 分身2体"],
						[3, "本体 + 分身3体"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：影の舞
			//----------------------------------------------------------------
			case SKILL_ID_KAGE_NO_MAI:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"蜃気楼分身の状態",
					[
						[0, "本体のみ"],
						[1, "本体 + 分身1体"],
						[2, "本体 + 分身2体"],
						[3, "本体 + 分身3体"],
					],
					0
				);
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"影狩りの習得Lv",
					[
						[3, "Lv3"],
						[4, "Lv4"],
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					3
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：歪曲
			//----------------------------------------------------------------
			case SKILL_ID_KUNAI_WAIKYOKU:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"蜃気楼分身の状態",
					[
						[0, "本体のみ"],
						[1, "本体 + 分身1体"],
						[2, "本体 + 分身2体"],
						[3, "本体 + 分身3体"],
					],
					0
				);
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"苦無-屈折-の習得Lv",
					[
						[0, "未習得"],
						[1, "Lv1"],
						[2, "Lv2"],
						[3, "Lv3"],
						[4, "Lv4"],
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：回転
			//----------------------------------------------------------------
			case SKILL_ID_KUNAI_KAITEN:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"苦無-歪曲-の習得Lv",
					[
						[3, "Lv3"],
						[4, "Lv4"],
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					3
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：掌握
			//----------------------------------------------------------------
			case SKILL_ID_FUMASHURIKEN_SHOUAKU:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"風魔手裏剣-構築-の習得Lv",
					[
						[0, "未習得"],
						[1, "Lv1"],
						[2, "Lv2"],
						[3, "Lv3"],
						[4, "Lv4"],
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：影狩り
			//----------------------------------------------------------------
			case SKILL_ID_KAGE_GARI:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"影一閃の習得Lv",
					[
						[0, "未習得"],
						[1, "Lv1"],
						[2, "Lv2"],
						[3, "Lv3"],
						[4, "Lv4"],
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// 蜃気楼＆不知火：影一閃
			//----------------------------------------------------------------
			case SKILL_ID_KAGE_ISSEN:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"影の舞の習得Lv",
					[
						[5, "Lv5"],
						[6, "Lv6"],
						[7, "Lv7"],
						[8, "Lv8"],
						[9, "Lv9"],
						[10,"Lv10"],
					],
					5
				);
				break;

			//----------------------------------------------------------------
			// ソウルアセティック：青龍符 白虎符 朱雀符 玄武符 霊道符 死霊浄化 四方神符 四方五行陣
			//----------------------------------------------------------------
			case SKILL_ID_SEIRYU_FU:
			case SKILL_ID_BYAKKO_FU:
			case SKILL_ID_SUZAKU_FU:
			case SKILL_ID_GENBU_FU:
			case SKILL_ID_SHIHOZIN_FU:
			case SKILL_ID_SHIHO_GOGYO_ZIN:
			case SKILL_ID_REIDO_FU:
			case SKILL_ID_SHIRYO_ZYOKA:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"暖かい風",
					[
						[ELM_ID_VANITY	,"無し"		],
						[ELM_ID_EARTH	,"Lv1 地"	],
						[ELM_ID_WIND	,"Lv2 風"	],
						[ELM_ID_WATER	,"Lv3 水"	],
						[ELM_ID_FIRE	,"Lv4 火"	],
						[ELM_ID_PSYCO	,"Lv5 念"	],
						[ELM_ID_DARK	,"Lv6 闇"	],
						[ELM_ID_HOLY	,"Lv7 聖"	],
					],
					0
				);
				break;

			//----------------------------------------------------------------
			// マイスター：攻撃装置有効化
			//----------------------------------------------------------------
			case SKILL_ID_KOGEKI_SOCHI_YUKOKA:
				// オプションリストを生成、追加
				attackMethodOptList = funcCreateOptionListAsInput(attackMethodOptList,
					"マイスターのPOW",
					[
						["type", "number"],
						["min", 0],
						["max", 500],
					],
					0
				);
				break;
			//----------------------------------------------------------------
			// アークビショップ：アドラムス
			//----------------------------------------------------------------
			case SKILL_ID_ADORAMUS:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"アンシラ状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * 振動残響
			 * メタリックサウンド
			 * リズムシューティング
			 * メタリックフューリー
			 * ロゼブロッサム
			 */
			case SKILL_ID_SHINDOZANKYO:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"サウンドブレンド状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * アックストルネード
			 * マイティスマッシュ
			 * パワフルスイング
			 */
			case SKILL_ID_AXE_TORNADE:
			case SKILL_ID_MIGHTY_SMASH:
			case SKILL_ID_POWERFUL_SWING:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"アックスストンプ状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * ドラゴニックピアース
			 */
			case SKILL_ID_DRAGONIC_PIERCE:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ドラゴニックオーラ状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * リズミカルウェーブ
			 */
			case SKILL_ID_RHYTHMICAL_WAVE:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ミスティックシンフォニー状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * 烈火気弾
			 */
			case SKILL_ID_BLAZING_FLAME_BLAST:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"炎火滅魔神弾 状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * チェイシングブレイク
			 * チェイシングショット
			 */
			case SKILL_ID_CHASING_BREAK:
			case SKILL_ID_CHASING_SHOT: 
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"ヒットアンドスライディング 状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;
			/**
			 * アビスフレイム
			 */
			case SKILL_ID_ABYSS_FLAME:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"計算対象",
					[
						[0, "対象周辺"],
						[1, "自身周辺"],
						[2, "両方"],
					],
					0
				);
				break;
			/**
			 * レイディアントスピア
			 * インペリアルクロス
			 */
			case SKILL_ID_RADIANT_SPEAR:
			case SKILL_ID_IMPERIAL_CROSS:
				attackMethodOptList = funcCreateOptionList(attackMethodOptList,
					"グランドジャッジメント状態",
					[
						[0, "無し"],
						[1, "有り"],
					],
					0
				);
				break;

		}
	}
};

/**
 * 補足説明ブロックを生成する.
 */

CAttackMethodAreaComponentManager.CreateNoticeBlock = function () {

	var attackMethodConf = null;

	var objSpan = null;
	var objA = null;



	// 攻撃手段設定を取得
	attackMethodConf = CAttackMethodAreaComponentManager.GetAttackMethodConf();



	// スキルIDで処理分岐
	switch (attackMethodConf.GetSkillId()) {


	//----------------------------------------------------------------
	// ルーンナイト：イグニッションブレイク
	//----------------------------------------------------------------
	case SKILL_ID_IGNITION_BREAK:

		objSpan = HtmlCreateElement("span", null);

		HtmlCreateTextNode("※『スキル倍率を-1する』設定の詳細については、", objSpan);
		HtmlCreateElement("br", objSpan);

		objA = HtmlCreateElement("a", objSpan);
		objA.setAttribute("href", "../form/20101123ib.html#ib");
		objA.setAttribute("target", "_blank");
		HtmlCreateTextNode("こちら", objA);

		HtmlCreateTextNode("をご参照ください。", objSpan);

		break;


	// ----------------------------------------------------------------
	// コンボ計算(双龍～)
	// ----------------------------------------------------------------
	case SKILL_ID_COMBO_SORYUKYAKU:

		objSpan = HtmlCreateElement("span", null);

		HtmlCreateTextNode("※天羅と號砲はoff以外に設定すると下に繋がりません。", objSpan);

		break;


	// ----------------------------------------------------------------
	// シビアレインストーム(特殊)
	// ----------------------------------------------------------------
	case SKILL_ID_SEVERE_RAINSTORM_EX:

		objSpan = HtmlCreateElement("span", null);

		HtmlCreateTextNode("※設定の説明は", objSpan);

		objA = HtmlCreateElement("a", objSpan);
		objA.setAttribute("href", "../form/20110623severe.html");
		objA.setAttribute("target", "_blank");
		HtmlCreateTextNode("こちら", objA);

		HtmlCreateTextNode("をご参照ください。", objSpan);

		break;

	}



	// 文字サイズの調整
	if (objSpan) {
		objSpan.setAttribute("style", "font-size : smaller");
	}



	return objSpan;
};

// 初期構築処理
// TODO: 現状、呼び出しに任せる
// CAttackMethodAreaComponentManager.RebuildControls();



