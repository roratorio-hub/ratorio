function OnLoadJobBonusTable() {

	var jobId = 0;

	var objSelect = null;


	// セレクトボックス取得
	objSelect = document.getElementById("OBJID_SELECT_JOB");
	if (!objSelect) {
		return;
	}

	// 全選択肢削除
	objSelect.innerHTML = "";

	// 全職業追加
	for (jobId = MIG_JOB_ID_NOVICE; jobId <= MIG_JOB_ID_SPIRIT_HANDLER; jobId++) {
		HtmlCreateElementOption(jobId, GetJobName(jobId), objSelect);
	}



	// 初期表示更新
	RefreshJobBonusTable();
}



function RefreshJobBonusTable() {

	var idx = 0;

	var lv = 0;
	var jobId = 0;
	var jobLvMax = 0;
	var jobBonusArrayArray = null;

	var objWrapper = null;



	// 選択職業を取得
	jobId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_JOB", JOB_ID_NOVICE);

	// ジョブレベルの最大値を取得
	jobLvMax = GetJobLevelMax(jobId);

	// 各レベルでのジョブボーナスを配列として取得
	// TODO: 構造を改良すれば最適化できるが、残課題。
	jobBonusArrayArray = [];

	for (lv = 0; lv <= jobLvMax; lv++) {
		jobBonusArrayArray.push(GetJobBonus(jobId, lv));
	}


	// テーブルラッパーを取得
	objWrapper = document.getElementById("OBJID_JOB_BONUS_TABLE_WRAPPER");
	if (!objWrapper) {
		return;
	}

	// 全内容削除
	objWrapper.innerHTML = "";


	// ラッパー配下にテーブル用意
	for (idx = 0; idx <= 4; idx++) {
		RefreshJobBonusTableSub(objWrapper, jobBonusArrayArray, 1 + 25 * idx, Math.min(25 * (idx + 1), jobLvMax));
	}
}

function RefreshJobBonusTableSub(objRoot, jobBonusArrayArray, lvBegin, lvMax) {

	var idx = 0;

	var lv = 0;
	var bonusArrayLast = null;
	var bonusArrayThis = null;

	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;

	// ラベル行追加関数
	var funcAddLabelRow = function () {

		objTr = HtmlCreateElement("tr", objTbody);
		objTr.setAttribute("style", "background-color: #aaaaff;");

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("JobLv", objTd);

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("Str", objTd);

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("Agi", objTd);

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("Vit", objTd);

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("Int", objTd);

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("Dex", objTd);

		objTd = HtmlCreateElement("th", objTr);
		HtmlCreateTextNode("Luk", objTd);

		objTd = HtmlCreateElement("th", objTr);
		objTd.setAttribute("style", "background-color: #ffaaaa;");
		HtmlCreateTextNode("Pow", objTd);

		objTd = HtmlCreateElement("th", objTr);
		objTd.setAttribute("style", "background-color: #ffaaaa;");
		HtmlCreateTextNode("Sta", objTd);

		objTd = HtmlCreateElement("th", objTr);
		objTd.setAttribute("style", "background-color: #ffaaaa;");
		HtmlCreateTextNode("Wis", objTd);

		objTd = HtmlCreateElement("th", objTr);
		objTd.setAttribute("style", "background-color: #ffaaaa;");
		HtmlCreateTextNode("Spl", objTd);

		objTd = HtmlCreateElement("th", objTr);
		objTd.setAttribute("style", "background-color: #ffaaaa;");
		HtmlCreateTextNode("Con", objTd);

		objTd = HtmlCreateElement("th", objTr);
		objTd.setAttribute("style", "background-color: #ffaaaa;");
		HtmlCreateTextNode("Crt", objTd);
	};



	// 表示開始レベルが、ジョブレベル上限を超えている場合は、テーブルを生成しない
	if (lvBegin > lvMax) {
		return;
	}


	// テーブル生成
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("border", "1");
	objTable.setAttribute("style", "font-size: smaller;");

	objTbody = HtmlCreateElement("tbody", objTable);


	// ヘッダ行追加
	funcAddLabelRow();


	// テーブル内容構築
	for (lv = lvBegin; lv <= lvMax; lv++) {

		// 行生成
		objTr = HtmlCreateElement("tr", objTbody);

		// 行の色付け
		if (((lv - lvBegin) % 2) == 0) {
			objTr.setAttribute("style", "background-color: #ddddff;");
		}


		// レベル表示
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextNode("Lv" + lv, objTd);


		// 補正値表示
		for (idx = 0; idx < jobBonusArrayArray[lv].length; idx++) {

			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextNode(jobBonusArrayArray[lv][idx], objTd);

			// 特性ステータス色付け変更
			if (((lv - lvBegin) % 2) == 0) {
				if (idx >= 6) {
					objTd.setAttribute("style", "background-color: #ffdddd;");
				}
			}

			// 前レベルから値が変化している場合は、強調表示にする
			if (jobBonusArrayArray[lv - 1][idx] != jobBonusArrayArray[lv][idx]) {
				objTd.style.color = "red";
				objTd.style.fontWeight = "bolder";
			}
		}
	}


	// フッタ行追加
	funcAddLabelRow();
}