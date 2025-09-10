/**
 * 低レイヤーのユーティリティ関数群
 */

CONSOLE_LOG_LEVEL_NONE	= 0;
CONSOLE_LOG_LEVEL_DEBUG	= 1;
g_bStoreConsoleLog = false;
g_storedConsoleLogArray = null;

/************************************************************************************************
 *
 * ＨＴＭＬエレメントを取得する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param elementId エレメントID
 *-----------------------------------------------------------------------------------------------
 * @return 取得したＨＴＭＬオブジェクト
 ************************************************************************************************/
function HtmlGetElementById(elementId) {

	return document.getElementById(elementId);
}

/************************************************************************************************
 *
 * ＨＴＭＬエレメントを生成する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param elementType エレメント種別名
 * @param objRoot ルートオブジェクト（null可）
 *-----------------------------------------------------------------------------------------------
 * @return 生成したＨＴＭＬオブジェクト
 ************************************************************************************************/
function HtmlCreateElement(elementType, objRoot) {

	var objElement = null;

	objElement = document.createElement(elementType);

	if (objRoot != null) {
		objRoot.appendChild(objElement);
	}

	return objElement;
}

/************************************************************************************************
*
* ＨＴＭＬテキストノードを生成する.
*
*-----------------------------------------------------------------------------------------------
* @param textValue テキスト値
* @param objRoot ルートオブジェクト（null可）
*-----------------------------------------------------------------------------------------------
* @return 生成したＨＴＭＬオブジェクト
************************************************************************************************/
function HtmlCreateTextNode(textValue, objRoot) {

	var objElement = null;

	objElement = document.createTextNode(textValue);

	if (objRoot != null) {
		objRoot.appendChild(objElement);
	}

	return objElement;
}

/************************************************************************************************
*
* ＨＴＭＬテキストノードを追加する（複数行）.
*
*-----------------------------------------------------------------------------------------------
* @param textArray テキスト配列
* @param objRoot ルートオブジェクト
*-----------------------------------------------------------------------------------------------
************************************************************************************************/
function HtmlAppendTextNodeMulti(textArray, objRoot) {

	var idx = 0;

	for (idx = 0; idx < textArray.length; idx++) {

		if (idx != 0) {
			HtmlCreateElement("br", objRoot);
		}

		HtmlCreateTextNode(textArray[idx], objRoot);
	}
}

/************************************************************************************************
*
* ＨＴＭＬテキストＳＰＡＮを生成する.
*
*-----------------------------------------------------------------------------------------------
* @param textValue テキスト値
* @param objRoot ルートオブジェクト（null可）
* @param className クラス名（省略可、空文字列は設定しない）
*-----------------------------------------------------------------------------------------------
* @return 生成したＨＴＭＬオブジェクト（ＳＰＡＮ）
************************************************************************************************/
function HtmlCreateTextSpan(textValue, objRoot, className) {

	var objSpan = null;
	var objElement = null;

	objSpan = HtmlCreateElement("span", objRoot);

	// null も判定するので弱い判定
	if (className != undefined) {
		if (className != "") {
			objSpan.setAttribute("class", className);
		}
	}

	objElement = document.createTextNode(textValue);

	if (objSpan != null) {
		objSpan.appendChild(objElement);
	}

	return objSpan;
}

/************************************************************************************************
*
* ＨＴＭＬエレメントのアトリビュートを設定する.
*
*-----------------------------------------------------------------------------------------------
* @param objElement 対象オブジェクト
* @param attrName アトリビュート名
* @param attrValue アトリビュート値
*-----------------------------------------------------------------------------------------------
* @return 対象オブジェクト
************************************************************************************************/
function HtmlSetAttribute(objElement, attrName, attrValue) {

	if (objElement != null) {
		objElement.setAttribute(attrName, attrValue);
	}

	return objElement;
}

/************************************************************************************************
 *
 * すべての OPTION エレメントを削除する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objSelect 削除対象のセレクトボックス（null可）
 *-----------------------------------------------------------------------------------------------
 ************************************************************************************************/
function HtmlRemoveOptionAll(objSelect) {

	if (objSelect == null) {
		return;
	}

	while (objSelect.options.length > 0) {
		objSelect.options.remove(0);
	}
}

/************************************************************************************************
 *
 * OPTION エレメントを生成する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param optionValue ＯＰＴＩＯＮの値
 * @param optionText 表示するテキスト
 * @param objSelect 追加対象のセレクトボックス（null可）
 *-----------------------------------------------------------------------------------------------
 * @return 生成したＯＰＴＩＯＮオブジェクト
 ************************************************************************************************/
function HtmlCreateElementOption(optionValue, optionText, objSelect) {

	var objOption = null;
	var objText = null;

	objOption = document.createElement("option");
	objOption.setAttribute("value", optionValue);

	objText = document.createTextNode(optionText);
	objOption.appendChild(objText);

	if (objSelect != null) {

		if (objSelect instanceof HTMLOptGroupElement) {
			objSelect.appendChild(objOption);
		}
		else if (objSelect instanceof HTMLSelectElement) {
			objSelect.options.add(objOption);
		}
	}

	return objOption;
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトの子要素を全て削除する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objParent 対象となるオブジェクト
 ************************************************************************************************/
function HtmlRemoveAllChild(objParent) {

	if (objParent == null) {
		return;
	}

	var objChild = null;

	while (objParent.hasChildNodes()) {
		objChild = objParent.firstChild;
		objParent.removeChild(objChild);
	}
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトを親要素から削除する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objChild 削除するオブジェクト
 *-----------------------------------------------------------------------------------------------
 * @return 削除されたオブジェクト
 ************************************************************************************************/
function HtmlRemoveFromParent(objChild) {

	if (objChild == null) {
		return;
	}

	var objParent = objChild.parentElement;

	if (objParent == null) {
		return;
	}

	return objParent.removeChild(objChild);
}

/************************************************************************************************
*
* ＨＴＭＬエレメントのアトリビュートを設定する.
*
*-----------------------------------------------------------------------------------------------
* @param objTarget 対象オブジェクト
* @param attrName アトリビュート名
* @param valueWhenNull オブジェクトが null だった場合の値
*-----------------------------------------------------------------------------------------------
* @return 対象オブジェクト
************************************************************************************************/
function HtmlGetAttribute(objTarget, attrName, valueWhenNull) {

	if (objTarget == null) {
		return valueWhenNull;
	}

	return objTarget.getAttribute(attrName);
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトの checked 値を取得する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objID 対象となるオブジェクトの ID
 * @param valueWhenNull オブジェクトが null だった場合の値
 ************************************************************************************************/
function HtmlGetObjectCheckedById(objID, valueWhenNull) {

	var objTarget = document.getElementById(objID);

	if (objTarget == null) {
		return valueWhenNull;
	}

	// checked プロパティと checked 属性の値は異なる場合があるので、getAttribute はできない
	return objTarget.checked;
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトの checked 値を設定する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objID 対象となるオブジェクトの ID
 * @param bChecked チェック状態
 ************************************************************************************************/
 function HtmlSetObjectCheckedById(objID, bChecked) {

	var objTarget = document.getElementById(objID);

	if (objTarget == null) {
		return;
	}

	objTarget.checked = bChecked;
}

/************************************************************************************************
 *
 * 選択された optgroup を取得する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objIDSelect 対象となる select オブジェクトの ID
 * @param valueWhenNull オブジェクトが null だった場合の値
 * @param valueWhenNoGroups optgroup がなかった場合の値
 ************************************************************************************************/
function HtmlGetSelectedOptgroup(objIDSelect, valueWhenNull, valueWhenNoGroups) {

	var objTarget = document.getElementById(objIDSelect);

	if (objTarget == null) {
		return valueWhenNull;
	}

	var selectedIndex = objTarget.selectedIndex;

	if (selectedIndex === null) {
		return valueWhenNull;
	}

	var selectedOption = objTarget.options[selectedIndex];

	if (!selectedOption) {
		return valueWhenNull;
	}

	var parent = selectedOption.parentNode;

	while ((parent != null) && (parent != objTarget)) {

		if (parent instanceof HTMLOptGroupElement) {
			return parent;
		}

		parent = parent.parentNode;
	}

	return valueWhenNoGroups;
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトの value 値を取得する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objID 対象となるオブジェクトの ID
 * @param valueWhenNull オブジェクトが null だった場合の値
 ************************************************************************************************/
function HtmlGetObjectValueById(objID, valueWhenNull) {

	var objTarget = document.getElementById(objID);

	if (objTarget == null) {
		return valueWhenNull;
	}

	// value プロパティと value 属性の値は異なる場合があるので、getAttribute はできない
	return objTarget.value;
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトの value 値を取得する（整数として取得する）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objID 対象となるオブジェクトの ID
 * @param valueWhenNull オブジェクトが null だった場合の値
 ************************************************************************************************/
function HtmlGetObjectValueByIdAsInteger(objID, valueWhenNull) {

	var value = HtmlGetObjectValueById(objID, valueWhenNull);

	if (value === undefined) {
		return valueWhenNull;
	}
	if (value === null) {
		return valueWhenNull;
	}

	if (value.length == 0) {
		return 0;
	}
	return (isNaN(value) ? value : parseInt(value, 10));
}

/**
 * ＨＴＭＬオブジェクトの value 値を設定する. valueがnullの場合は何もしない. 
 * @param {*} objID 対象となるオブジェクトの ID
 * @param {*} valutToSet 設定する値
 * @returns void
 */
function HtmlSetObjectValueById(objID, valutToSet) {
	let objTarget = document.getElementById(objID);
	if (objTarget == null) {
		return;
	}
	// value プロパティと value 属性の値は異なる場合があるので、setAttribute はできない
	objTarget.value = valutToSet;
}

/**
 * 指定されたselect要素の取りうる値の最小値と最大値を取得する
 * @param {string} selectId - select要素のID
 * @returns {{min: number, max: number} | null} 値の範囲、または要素が見つからない場合はnull
 */
function getSelectValueRange(selectId) {
  const selectElement = document.getElementById(selectId);
  
  // 指定されたIDの要素が見つからない場合はnullを返す
  if (!selectElement) {
    return null;
  }
  if (selectId === "A_skill15") {
	console.log(selectId)
  }

  // <option>要素のリストを取得
  const options = selectElement.options;
  
  // 値を格納する配列を初期化
  const values = [];

  // 各optionのvalueを配列に追加
  for (let i = 0; i < options.length; i++) {
    // 数値としてパースして格納する
    const value = parseFloat(options[i].value);
    // 有効な数値であることを確認
    if (!isNaN(value)) {
      values.push(value);
    }
  }

  // 値がない場合はnullを返す
  if (values.length === 0) {
    return null;
  }

  // 最小値と最大値を取得して返す
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトの value 値を範囲内に補正する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objTarget 対象となるオブジェクト
 * @param valueMin 許容する最小値
 * @param valueMax 許容する最大値
 ************************************************************************************************/
function HtmlModifyObjectValueIntoRange(objTarget, valueMin, valueMax) {

	var value = 0;

	if (objTarget == null) {
		return;
	}

	// 未入力は補正する
	if (objTarget.value == "") {
		objTarget.value = 0;
	}

	// 現在の値を取得
	value = Number(objTarget.value);

	// 数値でなければ処理しない
	if (isNaN(value)) {
		return;
	}

	// 範囲内に補正
	if (value < valueMin) {
		objTarget.value = valueMin;
	}
	else if (value > valueMax) {
		objTarget.value = valueMax;
	}
}

/**
 * ＨＴＭＬオブジェクトの value 値を設定する（<select>用、値チェックあり）.
 * @param {*} objTarget 対象となるHTMLオブジェクト
 * @param {*} valutToSelect 設定する値
 * @returns 変更前の値、または、undefined
 */
function HtmlSelectObjectValueAsInteger(objTarget, valutToSelect) {

	if (objTarget == null) {
		return undefined;
	}
	if (!(objTarget instanceof HTMLSelectElement)) {
		return undefined;
	}

	// 整数変換
	valutToSelect = parseInt("" + valutToSelect, 10);

	// 現在のデータを取得
	const oldValue = objTarget.value;

	// 念のため、指定のIDがあるかを検査して設定する
	let idx = 0;
	for (idx = 0; idx < objTarget.options.length; idx++) {
		if (objTarget.options[idx].value == valutToSelect) {
			objTarget.value = valutToSelect;
			break;
		}
	}
	// 指定のIDがなかった場合は、処理打ち切り
	if (idx >= objTarget.options.length) {
		return undefined;
	}

	return oldValue;
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトをコピーする.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objID 対象となるオブジェクトの ID
 ************************************************************************************************/
function HtmlCopyToClipboardById(objID) {

	var objTarget = document.getElementById(objID);

	if (objTarget == null) {
		return;
	}

	objTarget.select();

	document.execCommand("copy");
}

/************************************************************************************************
 *
 * ＨＴＭＬオブジェクトに定義された関数を呼び出す.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objID 対象となるオブジェクトの ID
 * @param funcName 関数名
 * @param argsArray 引数の配列
 ************************************************************************************************/
function HtmlCallFunction(objID, funcName, argsArray) {

	var objTarget = document.getElementById(objID);
	var objFunc = null;

	if (objTarget == null) {
		return undefined;
	}

	objFunc = Function(
		"objTargetF",
		"return " + "((typeof objTargetF." + funcName + ") != (typeof undefined))" + " ? " + "objTargetF." + funcName + " : " + "undefined" + ";"
	)(objTarget);

	if (!objFunc) {
		return undefined;
	}

	return objFunc.apply(objTarget, argsArray);
}

/************************************************************************************************
 *
 * コンソールログの出力内容を取得する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param funcName 関数名
 * @param logText 出力内容
 ************************************************************************************************/
function GetLogText(logText) {

	var logTextResult = "";
	var dtNow = null;

	// 現在時刻を算出
	dtNow = new Date();

	logTextResult = dtNow.getFullYear() + "/";
	logTextResult += ("0" + (dtNow.getMonth() + 1)).slice(-2) + "/";
	logTextResult += ("0" + dtNow.getDate()).slice(-2) + " ";
	logTextResult += ("0" + dtNow.getHours()).slice(-2) + ":";
	logTextResult += ("0" + dtNow.getMinutes()).slice(-2) + ":";
	logTextResult += ("0" + dtNow.getSeconds()).slice(-2);

	logTextResult += " >> ";

	// 出力内容を追加
	logTextResult += logText;

	return logTextResult;
}

/**
 * desc
 *  
 * @param {*} msg 
 */
function WriteConsoleLog(msg) {
	console.log(GetLogText(msg));
}

/**
 * 数値を指定された最小値と最大値の間にクランプする
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} クランプされた値
 */
function ValueRangeModify(value, min, max) {

	if (isNaN(parseInt(value))) {
		return min;
	}

	if (value < min) {
		return min;
	}

	else if (max < value) {
		return max;
	}

	return value;
}

function SetStatefullData(dataid, datavalue) {

	var objData = document.getElementById(dataid);

	if (objData == null) {
		return;
	}

	var valBefore = GetStatefullData(dataid, null);

	HtmlRemoveAllChild(objData);
	HtmlCreateTextNode(datavalue, objData);

	return valBefore;
}

function GetStatefullData(dataid, valueWhenNull) {

	var objData = document.getElementById(dataid);

	if (objData == null) {
		return valueWhenNull;
	}

	if (!objData.hasChildNodes()) {
		return valueWhenNull;
	}

	if (objData.firstChild.nodeValue.length == 0) {
		return 0;
	}

	return parseInt(objData.firstChild.nodeValue);
}

/**
 * 配列を生成して初期化する.
 * @param size 配列長
 * @param initValue 初期値
 * @return 生成した配列
 */
function MallocArray(size, initValue) {
	var idx = 0;
	var ary = null;
	if (size < 1) {
		return null;
	}
	ary = new Array();
	for (idx = 0; idx < size; idx++) {
		ary[idx] = initValue;
	}
	return ary;
}

/**
 * 等差数列を生成する
 * @param {number} start 
 * @param {number} step 
 * @param {number} length 
 * @returns {Array}
 */
function createArithmeticSequence(start, step, length) {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(start + i * step);
	}
	return result;
}

/**
 * 配列をディープコピーする.
 * @param arrayTarget 配列
 * @return ディープコピーした配列
 */
function DeepCopyArray(arrayTarget) {

	var idx = 0;
	var arrayCopied = null;

	if (!Array.isArray(arrayTarget)) {
		return arrayTarget;
	}

	arrayCopied = new Array();
	for (idx = 0; idx < arrayTarget.length; idx++) {
		arrayCopied.push(DeepCopyArray(arrayTarget[idx]));
	}

	return arrayCopied;
}

/**
 * 配列に指定の要素がない場合にだけ push する.
 * @param arrayTarget 配列
 * @param value 値
 * @return 操作後の配列長
 */
function ArrayPushIfExists(arrayTarget, value) {
	if (arrayTarget.indexOf(value) < 0) {
		arrayTarget.push(value);
	}

	return arrayTarget.length;
}

/**
 * ２つの配列の要素が、一致するかを判定する.
 * @param arrayA 配列１
 * @param arrayB 配列２
 * @param bOrderExact 順序の一致も含むかのフラグ
 * @param bTypeExact データ型の一致も含むかのフラグ
 * @return true:一致、false:不一致
 */
function IsEqualArrayItems(arrayA, arrayB, bOrderExact, bTypeExact) {

	var idx = 0;
	var idxA = 0;
	var idxB = 0;

	if (!arrayA) {
		if (!arrayB) {
			return (bTypeExact ? (arrayA === arrayB) : (arrayA == arrayB));
		}
		else {
			return false;
		}
	}
	else if (!arrayB) {
		if (!arrayA) {
			return (bTypeExact ? (arrayA === arrayB) : (arrayA == arrayB));
		}
		else {
			return false;
		}
	}

	if (arrayA.length != arrayB.length) {
		return false;
	}

	// 順序一致指定の場合
	if (bOrderExact) {

		// データ型一致指定の場合
		if (bTypeExact) {
			for (idx = 0; idx < arrayA.length; idx++) {
				if (arrayA[idx] !== arrayB[idx]) {
					return false;
				}
			}
		}

		// データ型不問の場合
		else {
			for (idx = 0; idx < arrayA.length; idx++) {
				if (arrayA[idx] != arrayB[idx]) {
					return false;
				}
			}
		}
	}

	// 順序不問の場合
	else {

		// データ型一致指定の場合
		if (bTypeExact) {
			for (idxA = 0; idxA < arrayA.length; idxA++) {
				for (idxB = 0; idxB < arrayB.length; idxB++) {
					if (arrayA[idxA] === arrayB[idx]) {
						break;
					}
				}
				if (idxB >= arrayB.length) {
					return false;
				}
			}
		}

		// データ型不問の場合
		else {
			for (idxA = 0; idxA < arrayA.length; idxA++) {
				for (idxB = 0; idxB < arrayB.length; idxB++) {
					if (arrayA[idxA] == arrayB[idx]) {
						break;
					}
				}
				if (idxB >= arrayB.length) {
					return false;
				}
			}
		}
	}

	// ここまでくれば一致
	return true;
}

/**
 * 指定の名称を持つ変数の値を取得する.
 * @param varName 変数名
 * @return 値（未定義の場合は、undefined）
 */
function GetVarValue(varName) {
	return Function(
		"return " + "((typeof " + varName + ") != (typeof undefined))" + " ? " + varName + " : " + "undefined" + ";"
	)();
}

/**
 * 文字列を解析して、数値を 3 桁区切りにする.
 * @param textOrg 対象となる文字列
 */
function DivideDigits3(textOrg) {

	var matchResult = null;

	var strNumAll = "";
	var strNumInteger = "";
	var strNumPoints = "";
	var bPointedNumber = false;
	var posNum = 0;

	var textWorkResult = "";
	var textWorkLeft = "";
	var textWorkNum = "";
	var textWorkRight = "";

	textWorkResult = "";
	textWorkRight = "" + textOrg;

	while (textWorkRight.length > 0) {

		// 数値の切り出し
		matchResult = textWorkRight.match(/([0-9]+)(\.?)([0-9]+)/);

		if (matchResult == null) {
			textWorkResult += textWorkRight;
			break;
		}

		// マッチ情報を取得
		strNumAll = matchResult[0];
		strNumInteger = matchResult[1];
		bPointedNumber = (matchResult[2] != "");
		strNumPoints = matchResult[3];
		posNum = matchResult["index"];

		// 小数点がない場合は、数値全体を整数部に連結
		if (!bPointedNumber) {
			strNumInteger += strNumPoints;
			strNumPoints = "";
		}

		// 数値文字列の変換
		textWorkNum = "";
		textWorkNum += strNumInteger.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		if (bPointedNumber) {
			textWorkNum += ".";
			textWorkNum += strNumPoints;
		}

		// 元文字列の分割
		textWorkLeft = textWorkRight.substring(0, posNum);
		textWorkRight = textWorkRight.substring(posNum + strNumAll.length);

		// 文字列の結合
		textWorkResult += textWorkLeft + textWorkNum;
	}

	return textWorkResult;
}

/**
 * 文字列がデータURLの書式に適合しているかを判定する.
 * @param dataURL 対象となる文字列
 */
function IsValidDataUrl(dataURL) {

	// 下記のサイトを参考に作成
	// https://url.spec.whatwg.org/#concept-basic-url-parser

	// URLが与えられない場合は、不適合
	if (dataURL === "") {
		return false;
	}

	// 水平タブ、復帰、改行を含む場合は、不適合
	if (dataURL.match(/[\t\r\n]/) != null) {
		return false;
	}

	// 特定のスキームでない場合は、不適合
	// （計算機の都合で限定。「http://**」、「https://**」、「file://**」、「file:///**」を許可）
	if (dataURL.match(/^http:\/\/(?!\/)/) != null) {
	}
	else if (dataURL.match(/^https:\/\/(?!\/)/) != null) {
	}
	else if (dataURL.match(/^file:\/\/(?!\/)/) != null) {
	}
	else if (dataURL.match(/^file:\/\/\/(?!\/)/) != null) {
	}
	else {
		return false;
	}

	// "?" での分割数が、２でない場合は不適合
	// （計算機の都合）
	if (dataURL.split("?").length != 2) {
		return false;
	}

	// "?" で分割したパラメータ部分に、英数字以外の文字がある場合は、不適合
	if (dataURL.split("?")[1].match(/[^a-zA-Z0-9]/) != null) {
		return false;
	}

	// ここまで来れば、適合している
	return true;
}

/**
 * 配列データをテキストデータに展開する.
 * @param dataArray データ配列
 * @param indentCount 出力時のインデント数（通常は 0 で呼び出し）
 * @param bReadableMode 可読モードフラグ
 */
function ExtractDataArray(dataArray, indentCount, bReadableMode) {

	var idx = 0;

	var extractedText = "";

	var indents = "";
	var dataObject = null;
	var dataText = "";
	var indexText = "";

	if (!indentCount) {
		indentCount = 0;
	}

	if (!bReadableMode) {
		bReadableMode = false;
	}

	for (idx = 0; idx < indentCount; idx++) {
		indents += "\t";
	}

	for (idx = 0; idx < dataArray.length; idx++) {

		dataObject = dataArray[idx];

		if (bReadableMode) {
			indexText = idx + " : ";
		}

		// 要素が配列の場合、再帰呼び出しして continue
		if (Array.isArray(dataObject)) {
			extractedText += indents + indexText + "[\n";
			extractedText += ExtractDataArray(dataObject, indentCount + 1, bReadableMode);
			extractedText += indents + "],\n";
			continue;
		}

		// データをテキストに加工
		if (isNaN(dataObject)) {
			if (dataObject) {
				dataText = "\"" + dataObject.replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
			}
			else {
				dataText = "\"" + dataObject + "\"";
			}
		}
		else {
			dataText = dataObject;
		}

		extractedText += indents + indexText + dataText + ",\n";
	}

	return extractedText;
}

/**
 * 画面から入力された文字をエスケープする.
 * @param inputtedText 入力されたテキスト
 * @return エスケープされたテキスト
 */
function EscapeInputtedText (inputtedText) {

	var idx = 0;

	// 変換される文字のリスト
	var charArrayNG = [

		// セキュリティ上の理由
		["\"", "”"],
		["\\", "￥"],

		// encodeURI() で変換されないもの
		[";", "；"],
		[",", "，"],
		["/", "／"],
		["?", "？"],
		[":", "："],
		["@", "＠"],
		["&", "＆"],
		["=", "＝"],
		["+", "＋"],
		["$", "＄"],
		["-", "－"],
		["_", "＿"],
		[".", "．"],
		["!", "！"],
		["~", "￣"],
		["*", "＊"],
		["'", "’"],
		["(", "（"],
		[")", "）"],
		["#", "＃"],
	];

	var escapedText = "";

	escapedText = inputtedText;

	// 使用禁止文字の変換
	for (idx = 0; idx < charArrayNG.length; idx++) {
		escapedText = escapedText.replace(new RegExp("\\" + charArrayNG[idx][0], "g"), charArrayNG[idx][1]);
	}

	return escapedText;
};

/**
 * 配列の和を取得する.
 * @param targetArray 対象となる配列
 */
function GetArrayTotal(targetArray) {

	if (!Array.isArray(targetArray)) {
		return undefined;
	}

	return targetArray.reduce(
		function (acc, cur) {

			if (acc === undefined) {
				return undefined;
			}

			if (isNaN(cur)) {
				return undefined;
			}

			return (acc + cur);
		},
		0
	);
}

/**
 * 配列の最大値を取得する.
 * @param targetArray 対象となる配列
 */
function GetArrayMax(targetArray) {

	if (!Array.isArray(targetArray)) {
		return undefined;
	}

	return targetArray.reduce(
		function (acc, cur) {

			if (acc === undefined) {
				return undefined;
			}

			if (isNaN(cur)) {
				return undefined;
			}

			return Math.max(acc, cur);
		},
		0
	);
}

/**
 * 配列の最小値を取得する.
 * @param targetArray 対象となる配列
 */
function GetArrayMin(targetArray) {

	if (!Array.isArray(targetArray)) {
		return undefined;
	}

	return targetArray.reduce(
		function (acc, cur) {

			if (acc === undefined) {
				return undefined;
			}

			if (isNaN(cur)) {
				return undefined;
			}

			return Math.min(acc, cur);
		},
		Number.MAX_VALUE
	);
}

/**
 * 32-bit整数に切り捨てる.
 * @param {BigInt} value 数値
 * @returns 32-bitに切り捨てた整数
 */
function floorBigInt32 (value) {

	// 数値として扱わない（透過させる）値
	if ((value === null) || (value === undefined)) {
		return value;
	}
	if (Array.isArray(value)) {
		return value;
	}

	// BigInt値の場合、isNaNを適用すると例外が起きるので、捕捉して処理を続行させる
	try {
		if (isNaN(value)) {
			return value;
		}
	} catch (err) {
		// 処理なし
	}

	return parseInt(BigInt.asUintN(32, toSafeBigInt(value)), 10);
}

/**
 * 40-bit整数に切り捨てる.
 * （浮動小数点型になることで、ビットシフトが期待通りの動作にならない可能性があるので注意）
 * @param {BigInt} value 数値
 * @returns 40-bitに切り捨てた整数
 */
function floorBigInt40 (value) {

	// 数値として扱わない（透過させる）値
	if ((value === null) || (value === undefined)) {
		return value;
	}
	if (Array.isArray(value)) {
		return value;
	}

	// BigInt値の場合、isNaNを適用すると例外が起きるので、捕捉して処理を続行させる
	try {
		if (isNaN(value)) {
			return value;
		}
	} catch (err) {
		// 処理なし
	}

	return parseInt(BigInt.asUintN(40, toSafeBigInt(value)), 10);
}

/**
 * ネイティブの BigInt() をラップしただけのガード関数
 * FireFox 133.0 系で発現した BigInt() の値変換バグへの対応として追加
 * 実質的に何もしていませんが BigInt() を呼ぶ前にブレークポイントでワンテンポ待つと事象が抑えられるため
 * 本関数が同様の効果を発揮して状況が緩和される可能性があります
 * 問題が再現する場合は例外処理でカバーする方針です
 * 
 * TODO: この関数を真偽値から数値への変換に使っている場合は Number() への置き換えを検討してください。
 * @param {*} value 
 * @returns 
 */
function toSafeBigInt(value) {
	try {
	  // 入力値を BigInt に変換
	  const result = BigInt(value);
	  
	  // 入力値と結果の一致を確認（文字列化して比較）
	  if (typeof value !== "boolean" && value.toString() !== result.toString()) {
		console.error(`値が一致しません: 入力(${value}) -> 変換後(${result})`);
	  }
	  
	  return result;
	} catch (error) {
	  // 例外処理（エラー発生時のログや代替処理）
	  console.error(`BigInt変換エラー: ${error.message}`);
	  return null; // 必要に応じて別の値を返す
	}
}

/**
 * HTML要素の子要素を更新するユーティリティ関数
 * @param {string} elementID 更新する要素のID
 * @param {string} htmlString 子要素となるHTML文字列
 * @param {number} appendMode 0 のとき既存の子要素を消して新しい要素で置き換える. 0 以外のとき既存の子要素の末尾に新しい要素を追加する.
 * @returns 
 */
function myInnerHtml(elementID,htmlString,appendMode) {
	let element = document.getElementById(elementID);
	if(appendMode == 0){
		while(element.hasChildNodes()) {
			element.removeChild(element.firstChild);
		}
		element.innerHTML = htmlString;
	} else {
		element.insertAdjacentHTML('BeforeEnd',htmlString);
	}
}

/**
 * 数値選択肢を構築する.
 * @param {object} objSelect 選択肢を追加する Select エレメント
 * @param {number} nMin 開始する値
 * @param {number} nMax 終了する値
 */
function BuildUpNumberSelect(objSelect, nMin, nMax) {
	var idx = 0;
	var n = 0;
	for (idx = 0, n = nMin; n <= nMax; idx++, n++) {
		objSelect.options[idx] = new Option(n, n);
	}
}

/**
 * 数値選択肢を構築する（ただし 0 を文字列 OFF に置き換える）.
 * @param {object} objSelect 選択肢を追加する Select エレメント
 * @param {number} nMin 開始する値
 * @param {number} nMax 終了する値
 */
function BuildUpNumberSelectWithZeroOff(objSelect, nMin, nMax) {
	var idx = 0;
	var n = 0;
	objSelect.options[0] = new Option("off", 0);
	for (idx = 1, n = nMin; n <= nMax; idx++, n++) {
		objSelect.options[idx] = new Option(n, n);
	}
}