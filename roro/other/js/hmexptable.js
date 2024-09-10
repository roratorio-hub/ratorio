
g_ExpTableInfoArray = [
	// [表示名, レベル表記名, 参照テーブル番号, テーブル内要素番号, 最小レベル, 最大レベル]
	["BaseExp", "BaseLv", 0, BASE_EXP_TABLE_ID_NORMAL, GetBaseLevelMin(JOB_ID_NOVICE), GetBaseLevelMax(JOB_ID_NOVICE)],
	["BaseExp 転生/サモナー", "BaseLv", 0, BASE_EXP_TABLE_ID_REINCANATED, GetBaseLevelMin(JOB_ID_HI_NOVICE), GetBaseLevelMax(JOB_ID_HI_NOVICE)],
	["BaseExp 3次職/サモナー", "BaseLv", 0, BASE_EXP_TABLE_ID_REINCANATED, GetBaseLevelMin(JOB_ID_RUNEKNIGHT), GetBaseLevelMax(JOB_ID_RUNEKNIGHT)],
	["BaseExp 4次職/拡張4次", "BaseLv", 0, BASE_EXP_TABLE_ID_REINCANATED, GetBaseLevelMin(MIG_JOB_ID_DRAGON_KNIGHT), GetBaseLevelMax(MIG_JOB_ID_DRAGON_KNIGHT)],
	["JobExp ノービス", "JobLv", 1, JOB_EXP_TABLE_ID_NOVICE, 1, GetJobLevelMax(JOB_ID_NOVICE)],
	["JobExp ノービス ハイ", "JobLv", 1, JOB_EXP_TABLE_ID_NOVICE_REINCANATED, 1, GetJobLevelMax(JOB_ID_HI_NOVICE)],
	["JobExp 1次職", "JobLv", 1, JOB_EXP_TABLE_ID_1ST, 1, GetJobLevelMax(JOB_ID_SWORDMAN)],
	["JobExp 1次職(転生)", "JobLv", 1, JOB_EXP_TABLE_ID_1ST_REINCANATED, 1, GetJobLevelMax(JOB_ID_HI_SWORDMAN)],
	["JobExp 2次職", "JobLv", 1, JOB_EXP_TABLE_ID_2ND, 1, GetJobLevelMax(JOB_ID_KNIGHT)],
	["JobExp 2次職(転生)", "JobLv", 1, JOB_EXP_TABLE_ID_2ND_REINCANATED, 1, GetJobLevelMax(JOB_ID_LORDKNIGHT)],
	["JobExp 3次職", "JobLv", 1, JOB_EXP_TABLE_ID_3RD, 1, GetJobLevelMax(JOB_ID_RUNEKNIGHT)],
	["JobExp 4次職", "JobLv", 1, JOB_EXP_TABLE_ID_4TH, 1, GetJobLevelMax(MIG_JOB_ID_DRAGON_KNIGHT)],
	["JobExp スーパーノービス", "JobLv", 1, JOB_EXP_TABLE_ID_SUPER_NOVICE, 1, GetJobLevelMax(JOB_ID_SUPERNOVICE)],
	["JobExp 忍者/ガンスリンガー", "JobLv", 1, JOB_EXP_TABLE_ID_EXTRA_1ST, 1, GetJobLevelMax(JOB_ID_NINJA)],
	["JobExp 拳聖", "JobLv", 1, JOB_EXP_TABLE_ID_STAR_GRADIATOR, 1, GetJobLevelMax(JOB_ID_STARGRADIATOR)],
	["JobExp サモナー", "JobLv", 1, JOB_EXP_TABLE_ID_SUMMONER, 1, GetJobLevelMax(JOB_ID_SUMMONER)],
];



function OnLoadExpTable() {

	var idx = 0;

	var objSelect = null;

	var monsterObjSorted = null;
	var monsterId = 0;


	// 経験値テーブル選択セレクトボックスを構築
	objSelect = document.getElementById("OBJID_SELECT_TABLE_KIND");
	HtmlRemoveAllChild(objSelect);

	for (idx = 0; idx < g_ExpTableInfoArray.length; idx++) {
		HtmlCreateElementOption(idx, g_ExpTableInfoArray[idx][0], objSelect);
	}



	// モンスターの読み仮名順ソート
	monsterObjSorted = MonsterObjNew.slice();
	monsterObjSorted.sort(
		function(a, b) {
			if (a[MONSTER_DATA_INDEX_KANA] < b[MONSTER_DATA_INDEX_KANA]) return -1;
			if (a[MONSTER_DATA_INDEX_KANA] > b[MONSTER_DATA_INDEX_KANA]) return 1;
			return 0;
		}
	);



	// モンスター選択セレクトボックスを構築
	objSelect = document.getElementById("OBJID_SELECT_MONSTER");
	HtmlRemoveAllChild(objSelect);

	for (idx = 0; idx < monsterObjSorted.length; idx++) {
		monsterId = monsterObjSorted[idx][MONSTER_DATA_INDEX_ID];
		HtmlCreateElementOption(monsterId, MonsterObjNew[monsterId][MONSTER_DATA_INDEX_NAME], objSelect);
	}



	// 初期表示
	RefreshExpTable();
}



function RefreshExpTable() {

	var idx = 0;

	var tableKind = 0;
	var monsterId = 0;
	var expRate = 0;

	var tableInfo = null;
	var targetTable = null;

	var monsterName = "";
	var monsterBaseExp = 0;
	var monsterJobExp = 0;
	var monsterTargetExp = 0;

	var expNow = 0;
	var expNext = 0;
	var expRequired = 0;
	var expArray = null;
	var expTotal = 0;

	var killCountRequired = 0;
	var killCountArray = null;
	var killCountTotal = 0;

	var dataRowCount = 0;
	var dataRowBreak = 0;

	var objSpan = null;
	var objDiv = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objTableSub = null;
	var objTbodySub = null;
	var objTrSub = null;
	var objTdSub = null;



	// 入力情報を取得
	tableKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_TABLE_KIND", 0);
	monsterId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_MONSTER", 0);
	expRate = HtmlGetObjectValueByIdAsInteger("OBJID_INPUT_EXP_RATE", 0);

	// テーブル情報を取得
	tableInfo = g_ExpTableInfoArray[tableKind];

	// 対象となる経験値テーブルを取得


	targetTable = (tableInfo[2] == 0) ? GetBaseExpTable(tableInfo[3]) : GetJobExpTable(tableInfo[3]);

	// モンスターの情報を取得
	monsterName = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_NAME];
	monsterBaseExp = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_BASE_EXP];
	monsterJobExp = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_JOB_EXP];

	// 経験値倍率を適用
	monsterBaseExp = Math.floor(monsterBaseExp * expRate / 100);
	monsterJobExp = Math.floor(monsterJobExp * expRate / 100);

	// TODO: 共闘の最低保障
	// monsterBaseExp += 1;
	// monsterJobExp += 1;

	// 対象となる経験値を取得
	monsterTargetExp = (tableInfo[2] == 0) ? monsterBaseExp : monsterJobExp;



	// 経験値配列を用意
	expArray = new Array();
	for (idx = tableInfo[4] - 1; idx <= tableInfo[5] - 1; idx++) {

		// 定義の上限に到達した場合は、処理打ち切り
		if (idx == targetTable.length) {
			break;
		}

		expArray.push(targetTable[idx]);
	}


	// 結果用配列を用意
	killCountArray = new Array();

	// 現在の経験値を初期化
	expNow = 0;

	for (idx = 0; idx < expArray.length; idx++) {

		// 表示レベル上限に到達した場合は、処理打ち切り
		if (idx == (tableInfo[5] - tableInfo[4] + 1)) {
			break;
		}

		// 経験値が取得できない場合は、異常値処理
		if (monsterTargetExp <= 0) {
			killCountArray.push(-1);
			continue;
		}

		// 次のレベルに必要な経験値を取得
		expNext = expArray[idx];

		// 不足分の経験値を計算
		expRequired = expNext - expNow;

		// 必要な討伐数を算出
		killCountRequired = Math.ceil(expRequired / monsterTargetExp);

		// 現在の経験値を更新
		expNow += monsterTargetExp * killCountRequired;

		// レベルアップ処理
		expNow -= expNext;

		// 余剰経験値の切り捨て処理
		expNow = Math.min(expNow, expNext - 1);

		// 討伐数配列にデータ追加
		killCountArray.push(killCountRequired);
	}



	// モンスター情報テーブルの更新
	objDiv = document.getElementById("OBJID_DIV_MONSTER_DATA");
	HtmlRemoveAllChild(objDiv);

	objTable = HtmlCreateElement("table", objDiv);
	objTable.setAttribute("border", "1");
	objTable.setAttribute("style", "font-size : small;");

	objTbody = HtmlCreateElement("tbody", objTable);

	objTr = HtmlCreateElement("tr", objTbody);
	objTr.setAttribute("bgcolor", "#aaaaff");

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("モンスター名", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("BaseExp", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("JobExp", objTd);

	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode(monsterName, objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode(GetCommaFormatedNumber(monsterBaseExp), objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode(GetCommaFormatedNumber(monsterJobExp), objTd);



	// 結果テーブルの構築

	// 全体整形用テーブル
	objDiv = document.getElementById("OBJID_DIV_EXP_RESULT");
	HtmlRemoveAllChild(objDiv);
	objTable = HtmlCreateElement("table", objDiv);
	objTbody = HtmlCreateElement("tbody", objTable);
	objTr = HtmlCreateElement("tr", objTbody);

	// 実際のデータを表示するテーブル
	idx = 0;
	expTotal = 0;
	killCountTotal = 0;

	// 標準では、25 レベルごとにテーブルを区切る。横方向に入りきらない場合は、補正する増やす。
	dataRowBreak = 25;
	if (dataRowBreak < Math.floor(killCountArray.length / 4)) {
		dataRowBreak = Math.ceil(Math.floor(killCountArray.length / 4) / 10) * 10;
	}

	// サブテーブル
	while (idx < killCountArray.length) {

		// サブテーブル用セル追加
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("style", "vertical-align : top;");

		// サブテーブル生成
		objTableSub = HtmlCreateElement("table", objTd);
		objTableSub.setAttribute("border", "1");
		objTableSub.setAttribute("style", "font-size : small;");

		objTbodySub = HtmlCreateElement("tbody", objTableSub);

		// ヘッダ行
		objTrSub = HtmlCreateElement("tr", objTbodySub);
		objTrSub.setAttribute("bgcolor", "#aaaaff");

		objTdSub = HtmlCreateElement("td", objTrSub);
		HtmlCreateTextNode(tableInfo[1], objTdSub);

		objTdSub = HtmlCreateElement("td", objTrSub);
		HtmlCreateTextNode("必要Exp", objTdSub);

		objTdSub = HtmlCreateElement("td", objTrSub);
		HtmlCreateTextNode("累計Exp", objTdSub);

		objTdSub = HtmlCreateElement("td", objTrSub);
		HtmlCreateTextNode("必要討伐数", objTdSub);

		objTdSub = HtmlCreateElement("td", objTrSub);
		HtmlCreateTextNode("累計討伐数", objTdSub);

		// データ行
		dataRowCount = 0;
		for (; idx < killCountArray.length; idx++) {

			// 25行生成したら、次のテーブルへ
			if (dataRowCount++ == dataRowBreak) {
				break;
			}

			// データ収集
			expTotal += expArray[idx];
			killCountTotal += killCountArray[idx];

			// 行生成
			objTrSub = HtmlCreateElement("tr", objTbodySub);
			if ((idx % 2) == 0) {
				objTrSub.setAttribute("bgcolor", "#ddddff");
			}

			// レベル列
			objTdSub = HtmlCreateElement("td", objTrSub);
			objTdSub.setAttribute("style", "text-align : right");
			HtmlCreateTextNode("Lv" + (tableInfo[4] + idx), objTdSub);

			// 必要Exp列
			objTdSub = HtmlCreateElement("td", objTrSub);
			objTdSub.setAttribute("style", "text-align : right");
			HtmlCreateTextNode(GetCommaFormatedNumber(expArray[idx]), objTdSub);

			// 累計必要Exp列
			objTdSub = HtmlCreateElement("td", objTrSub);
			objTdSub.setAttribute("style", "text-align : right");
			HtmlCreateTextNode(GetCommaFormatedNumber(expTotal), objTdSub);

			// 必要討伐数列
			objTdSub = HtmlCreateElement("td", objTrSub);
			objTdSub.setAttribute("style", "text-align : right");
			if (killCountArray[idx] > 0) {
				HtmlCreateTextNode(GetCommaFormatedNumber(killCountArray[idx]) + "匹", objTdSub);
			}
			else {
				HtmlCreateTextNode("-", objTdSub);
			}

			// 累計必要討伐数列
			objTdSub = HtmlCreateElement("td", objTrSub);
			objTdSub.setAttribute("style", "text-align : right");
			if (killCountTotal > 0) {
				HtmlCreateTextNode(GetCommaFormatedNumber(killCountTotal) + "匹", objTdSub);
			}
			else {
				HtmlCreateTextNode("-", objTdSub);
			}
		}
	}
}



function GetCommaFormatedNumber(value) {

	var absValue = 0;
	var digitsStr = "";
	var digitsArray = null;
	var valueText = "";

	// 処理の都合上、0 だけ先に弾く
	if (value == 0) {
		return "0";
	}

	// 符号除去
	absValue = Math.abs(value);

	// 桁配列
	digitsArray = new Array();

	// ループ処理で、3桁ごとに区切り、配列へ前から追加
	while (absValue > 0) {
		digitsStr = "000" + (absValue % 1000);
		digitsArray.unshift(digitsStr.slice(-3));
		absValue = Math.floor(absValue / 1000);
	}

	// 先頭桁の上位０は削除する
	digitsArray[0] = "" + parseInt(digitsArray[0]);

	// 配列をカンマで結合し、符号をつけて返す
	return (value < 0 ? "-" : "") + digitsArray.join(",");
}

