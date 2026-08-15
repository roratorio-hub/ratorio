/**
 * 詠唱シミュレータの開始・停止・進捗表示。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
export let g_intervalFunctionSimulateCastTime = null;
export let g_castProgressInterval = 10;

export function OnClickSimulateCastTimeStart(castTime, delayTime) {

	// 詠唱イメージ
	var objSelect = null;
	var objInput = null;
	var objProgress = null;
	var countUpFunction = null;

	// 更新間隔設定の取得
	objSelect = document.getElementById("OBJID_SELECT_CASTSIM_INTERVAL");
	g_castProgressInterval = parseInt(objSelect.value);

	objInput = document.getElementById("OBJID_BUTTON_SIMULATE_CAST_TIME");
	objInput.setAttribute("value", "ｷｬﾝｾﾙ");
	objInput.onclick = () => OnClickSimulateCastTimeStop(castTime, delayTime);

	objProgress = document.getElementById("OBJID_PROGRESS_SIMULATE_CAST_TIME");
	objProgress.setAttribute("max", castTime * 1000);
	objProgress.setAttribute("value", 0);

	var castValue = 0;
	var maxValue = castTime * 1000;

	countUpFunction = function() {
// 高速化を目指して外だし
//		var objProgress = document.getElementById("OBJID_PROGRESS_SIMULATE_CAST_TIME");
//		var castValue = parseInt(objProgress.getAttribute("value"));
//		var maxValue = parseInt(objProgress.getAttribute("max"));

		castValue += g_castProgressInterval;

		objProgress.setAttribute("value", castValue);

		if (maxValue <= castValue) {
			OnStartCountDelayTime(castTime, delayTime);
		}
	};

	g_intervalFunctionSimulateCastTime = setInterval(countUpFunction, g_castProgressInterval);
}

export function OnStartCountDelayTime(castTime, delayTime) {

	var objProgress = null;
	var countDownFunction = null;

	// カウントアップ関数をクリア
	clearInterval(g_intervalFunctionSimulateCastTime);

	// プログレスバーの設定を再設定
	objProgress = document.getElementById("OBJID_PROGRESS_SIMULATE_CAST_TIME");
	objProgress.setAttribute("max", delayTime * 1000);
	objProgress.setAttribute("value", delayTime * 1000);

	// カウントダウン関数を定義
	countDownFunction = function() {
		var objProgress = document.getElementById("OBJID_PROGRESS_SIMULATE_CAST_TIME");
		var castValue = parseInt(objProgress.getAttribute("value"));
		var maxValue = parseInt(objProgress.getAttribute("max"));

		castValue -= g_castProgressInterval;

		objProgress.setAttribute("value", castValue);

		if (castValue <= 0) {
			OnClickSimulateCastTimeStop(castTime, delayTime);
		}
	};

	// カウントダウン関数を登録
	g_intervalFunctionSimulateCastTime = setInterval(countDownFunction, g_castProgressInterval);
}

export function OnClickSimulateCastTimeStop(castTime, delayTime) {

	var objInput = null;

	clearInterval(g_intervalFunctionSimulateCastTime);

	objInput = document.getElementById("OBJID_BUTTON_SIMULATE_CAST_TIME");
	objInput.setAttribute("value", "詠唱!!");
	objInput.onclick = () => OnClickSimulateCastTimeStart(castTime, delayTime);
}

