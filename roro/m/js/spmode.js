/**
 * 避難所の安定版に存在していた「確殺/経験値効率ランキング計算」に関わるファイルです
 * HUBでは使用していません
 * 現代ROでは平地狩りの重要度が下がっているのでこのまま削除することも視野に入れています
 * 2025-04-12
 */

//================================================================================================
//
// 定数定義
//
//================================================================================================
var const_identifier = 0;

SPMODE_MONSTER_RESULT_INDEX_MONSTER_INDEX =		const_identifier++;
SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG =		const_identifier++;
SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE =		const_identifier++;
SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB =		const_identifier++;
SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME =		const_identifier++;
SPMODE_MONSTER_RESULT_INDEX_HIT_RATE =			const_identifier++;
SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE =			const_identifier++;




//================================================================================================
//
// グローバル変数定義
//
//================================================================================================

// SPMODE 処理中であるかのフラグ
g_SPMODE_FLAG = 0;

// SPMODE でのモンスターごとの演算結果
g_SPMODE_MONSTER_RESULT = new Array();

// SPMODE で処理中のモンスターのインデックス（IDとは限らない）
g_SPMODE_MONSTER_INDEX = 0;

// SPMODE が確殺モードであるかのフラグ
g_SPMODE_KAKUSATSU_MODE = 0;

// SPMODE で抽出対象とする戦闘時間の最小値
g_RankingConditionBattleTimeMin = 0;

// SPMODE で抽出対象とする戦闘時間の最大値
g_RankingConditionBattleTimeMax = 0;





//================================================================================================
//
// 処理
//
//================================================================================================

/**
 * SPMODE による計算の実行
 * 2025-04-12 使用されていない可能性がある
 */
function calcSP() {



	//----------------------------------------------------------------
	// SPモード計算中フラグのセット
	//----------------------------------------------------------------
	g_SPMODE_FLAG = 1;



	var wrk = 0;
	var workForSwap = 0;

	//----------------------------------------------------------------
	// 条件の取得
	//----------------------------------------------------------------
	var idxExpPrime = SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE;

	//--------------------------------
	// EXP優先条件
	//--------------------------------
	idxExpPrime = HtmlGetObjectValueById("OBJID_SPMODE_EXP_PRIORITY", SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE);


	//--------------------------------
	// 確殺モード
	//--------------------------------
	g_SPMODE_KAKUSATSU_MODE = HtmlGetObjectCheckedById("OBJID_SPMODE_KAKUSATSU_MODE", 0);

	//--------------------------------
	// 戦闘時間
	//--------------------------------
	// 最小
	wrk = HtmlGetObjectValueById("OBJID_SPMODE_BATTLE_TIME_MIN", 0);
	g_RankingConditionBattleTimeMin = parseFloat(wrk);
	if (isNaN(g_RankingConditionBattleTimeMin)) {
		g_RankingConditionBattleTimeMin = 0;
	}

	// 最大
	wrk = HtmlGetObjectValueById("OBJID_SPMODE_BATTLE_TIME_MAX", 0);
	g_RankingConditionBattleTimeMax = parseFloat(wrk);
	if (isNaN(g_RankingConditionBattleTimeMax)) {
		g_RankingConditionBattleTimeMax = 0;
	}

	// 最小と最大が逆転している場合は入れ替え
	if (g_RankingConditionBattleTimeMin > g_RankingConditionBattleTimeMax) {
		workForSwap = g_RankingConditionBattleTimeMin;
		g_RankingConditionBattleTimeMin = g_RankingConditionBattleTimeMax;
		g_RankingConditionBattleTimeMax = workForSwap;
	}

	//--------------------------------
	// 表示件数
	//--------------------------------
	var dispRankMax = HtmlGetObjectValueById("OBJID_SPMODE_DISP_COUNT", 0);



	//----------------------------------------------------------------
	// 全モンスターに対して、戦闘結果を計算
	//----------------------------------------------------------------
	var idx = 0;
	for (idx = 0; idx < MonsterObjNew.length; idx++) {

		g_SPMODE_MONSTER_INDEX = idx;

		// グローバル配列の初期化
		g_SPMODE_MONSTER_RESULT[idx] = new Array();
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_MONSTER_INDEX] = idx;
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG] = 0;
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE] = 0;
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB] = 0;
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME] = -1;
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_HIT_RATE] = 0;
		g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE] = 0;

		// 草タイプは計算対象から外す
		if (MonsterObjNew[idx][21] == MONSTER_GRASSTYPE_GLASS) {
			continue;
		}

		// 計算実行
		calc();

		if (_DEBUG) {
			console.log(idx);
		}
	}



	//----------------------------------------------------------------
	// SPモード計算中フラグのクリア
	//----------------------------------------------------------------
	g_SPMODE_FLAG = 0;



	//----------------------------------------------------------------
	// 計算結果をソートする（対象優先EXPの降順）
	//----------------------------------------------------------------
	g_SPMODE_MONSTER_RESULT.sort(
		function(a, b) {

			// 除外モンスターの場合、常に偽
			if (b[SPMODE_MONSTER_RESULT_INDEX_MONSTER_INDEX] < 0) {
				return -1;
			}

			// 優先EXPで比較
			if (a[idxExpPrime] < b[idxExpPrime]) return 1;
			if (a[idxExpPrime] > b[idxExpPrime]) return -1;

			return 0;
		}
	);


	//----------------------------------------------------------------
	// HTML を構築する
	//----------------------------------------------------------------
	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;

	objRoot = HtmlGetElementById("OBJID_SPMODE_RESULT");
	HtmlRemoveAllChild(objRoot);

	objTable = HtmlCreateElement("table", objRoot);
	HtmlSetAttribute(objTable, "border", "1");

	objTbody = HtmlCreateElement("tbody", objTable);

	//--------------------------------
	// テーブルヘッダ部分
	//--------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("順位", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("名前", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("一撃BaseExp", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("一撃JobExp", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("平均戦闘時間", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("HP", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("　命中率　", objTd);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("　回避率　", objTd);


	//--------------------------------
	// テーブルデータ部分
	//--------------------------------
	var mobidx = 0;
	for(idx = 0; idx < dispRankMax; idx++) {

		// 全データを追加し終わった場合、処理終了
		if(g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG] < 1) {
			break;
		}

		mobidx = g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_MONSTER_INDEX];

		objTr = HtmlCreateElement("tr", objTbody);

		// 順位
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextNode((idx + 1) + "位", objTd);

		// 名前
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextNode(MonsterObjNew[mobidx][1], objTd);

		// 一撃BaseExp
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "style", "text-align:right");
		HtmlCreateTextNode(g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE] + " Exp", objTd);

		// 一撃JobExp
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "style", "text-align:right");
		HtmlCreateTextNode(g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB] + " Exp", objTd);

		// 平均戦闘時間
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "style", "text-align:right");
		HtmlCreateTextNode(g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME].toFixed(2) + " 秒", objTd);

		// HP
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "style", "text-align:right");
		HtmlCreateTextNode("　" + MonsterObjNew[mobidx][3] + "　", objTd);

		// 命中率
		wrk = MonsterObjNew[mobidx][3]
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "style", "text-align:right");
		HtmlCreateTextNode(g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_HIT_RATE].toFixed(2) + " %", objTd);

		// 回避率
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "style", "text-align:right");
		HtmlCreateTextNode(g_SPMODE_MONSTER_RESULT[idx][SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE].toFixed(2) + " %", objTd);
	}

	// 計算結果が 0 件の場合
	if (idx == 0) {

		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		HtmlSetAttribute(objTd, "colspan", "6");

		if (g_SPMODE_KAKUSATSU_MODE == 1) {
			HtmlCreateTextNode("確殺可能な相手がいませんでした。", objTd);
		}
		else {
			HtmlCreateTextNode("弱すぎて効率を計れませんでした。", objTd);
		}
	}

}





/**
 * SPモードボタン　クリックイベントハンドラ.
 * 2025-04-12 使用されていない可能性がある
 */
function OnClickSPMode() {

	var dispFlag = 0;

	var objRoot = null;
	var objInput = null;
	var objSelect = null;
	var objOption = null;
	var objSpan = null;
	var objLabel = null;

	// 当該エリアを初期化
	objRoot = HtmlGetElementById("OBJID_SPMODE_DISP_ROOT");
	HtmlRemoveAllChild(objRoot);

	// 非表示状態に変更する場合は、処理終了
	dispFlag = HtmlGetObjectCheckedById("OBJID_SPMODE_DISP", 0);
	if (dispFlag == 0){
		return;
	}

	// 注意書き
	HtmlCreateTextNode("非常に重い処理です。ご利用は計画的に。", objRoot);
	HtmlCreateElement("br", objRoot);
	HtmlCreateElement("br", objRoot);

	// 計算するボタン
	objInput = HtmlCreateElement("input", objRoot);
	HtmlSetAttribute(objInput, "type", "button");
	HtmlSetAttribute(objInput, "value", "計算する");
	HtmlSetAttribute(objInput, "onClick", "calcSP()");

	HtmlCreateElement("br", objRoot);
	HtmlCreateElement("br", objRoot);

	// 優先順序セレクトボックス
	objSelect = HtmlCreateElement("select", objRoot);
	HtmlSetAttribute(objSelect, "id", "OBJID_SPMODE_EXP_PRIORITY");
	HtmlCreateElementOption(SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE, "BaseExp効率順", objSelect);
	HtmlCreateElementOption(SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB, "JobExp効率順", objSelect);

	// 確殺モードチェックボックス
	objInput = HtmlCreateElement("input", objRoot);
	HtmlSetAttribute(objInput, "type", "checkbox");
	HtmlSetAttribute(objInput, "id", "OBJID_SPMODE_KAKUSATSU_MODE");

	objLabel = HtmlCreateElement("label", objRoot);
	objLabel.setAttribute("for", "OBJID_SPMODE_KAKUSATSU_MODE");
	HtmlCreateTextNode("確殺モード", objLabel);

	HtmlCreateElement("br", objRoot);
	HtmlCreateElement("br", objRoot);

	// 戦闘時間
	HtmlCreateTextNode("戦闘時間：", objRoot);
	objInput = HtmlCreateElement("input", objRoot);
	HtmlSetAttribute(objInput, "type", "text");
	HtmlSetAttribute(objInput, "id", "OBJID_SPMODE_BATTLE_TIME_MIN");
	HtmlSetAttribute(objInput, "size", "8");
	HtmlSetAttribute(objInput, "value", "0.01");
	HtmlCreateTextNode("秒", objRoot);
	HtmlCreateTextNode("　～　", objRoot);
	objInput = HtmlCreateElement("input", objRoot);
	HtmlSetAttribute(objInput, "type", "text");
	HtmlSetAttribute(objInput, "id", "OBJID_SPMODE_BATTLE_TIME_MAX");
	HtmlSetAttribute(objInput, "size", "8");
	HtmlSetAttribute(objInput, "value", "30.00");
	HtmlCreateTextNode("秒", objRoot);

	HtmlCreateElement("br", objRoot);

	// 表示件数
	HtmlCreateTextNode("表示件数：", objRoot);
	objSelect = HtmlCreateElement("select", objRoot);
	HtmlSetAttribute(objSelect, "id", "OBJID_SPMODE_DISP_COUNT");
	for (var idx = 1; idx <= 10; idx++) {
		HtmlCreateElementOption(idx * 20, idx * 20, objSelect);
	}

	HtmlCreateElement("br", objRoot);

	// 結果表示エリア
	objSpan = HtmlCreateElement("span", objRoot);
	HtmlSetAttribute(objSpan, "id", "OBJID_SPMODE_RESULT");

	HtmlCreateElement("br", objRoot);

	// 注意書き
	HtmlCreateTextNode("※確殺モード：最小与ダメージ1発で倒せる敵のみ。命中100%で計算。", objRoot);
	HtmlCreateElement("br", objRoot);
	HtmlCreateTextNode("※通常モード：平均与ダメージ1発の経験値ランキング。Miss込み。", objRoot);
}
