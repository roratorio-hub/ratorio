/**
 * 戦闘結果表示（BuildBattleResultHtml 系）の分割（Phase 3c）。
 *
 * BuildBattleResultHtml / BuildBattleResultHtmlMIG を battlecalc.js から移動。
 * 両者の間にあった、コメントアウト済みの旧 OnClickTabBTLRSLT（死んだコード）も
 * バイト単位で不変のまま含めている。
 *
 * g_AttackCount / g_dps / g_receiveDamageAvoids / w_DMG_AS_OverHP は
 * BuildBattleResultHtml だけが使っていた scratch 変数、w_AG は同関数だけが
 * 参照する定数のため、いずれもこのファイルへ移設した。
 */
import {
    HtmlCreateElement, HtmlCreateElementOption, HtmlCreateTextNode, myInnerHtml
} from "../runtime/util.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { g_extraInfoDataBridge } from "../ui/CExtraInfoDataBridge.js";
import { TimeItemNumSearch } from "../chara/chara.js";
import {
    CHARA_DATA_INDEX_ASPD, CHARA_DATA_INDEX_CAST_PARAM, CHARA_DATA_INDEX_LUCKY
} from "../const/EnumCharaDataIndex.js";
import {
    ELM_ID_DARK, ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_HOLY, ELM_ID_POISON, ELM_ID_PSYCO, ELM_ID_UNDEAD, ELM_ID_VANITY,
    ELM_ID_WATER, ELM_ID_WIND
} from "../const/EnumElmId.js";
import { ITEM_SP_PERFECT_ATTACK_UP } from "../const/EnumItemSpId.js";
import { GetCastScalingOfSkillForCastTimeFixed, ROUNDDOWN } from "../bridge/stallcalc-bridge.js";
import { MOB_CONF_BUF_ID_MAX_PAIN, n_B_KYOUKA } from "../monster/mobconfbuf.js";
import { n_A_WeaponType } from "../runtime/roro-state.js";
import { SKILL_ID_AUTO_GUARD, SKILL_ID_PARIYING, SKILL_ID_REJECT_SWORD } from "../skill/skill.dat.js";
import { CReceivedDamageConfManager } from "../ui/CReceivedDamageConfManager.js";
import { n_AS_SKILL } from "../skill/calcautospell.js";
import { get as registryGet } from "../runtime/engine-registry.js";
import { __DIG3, g_confDataNizi, n_Nitou } from "../runtime/global.js";
import { CS } from "./calc-state.js";
import { SubName } from "./sub-name.js";
import {
    aspdRaw, delayDownForDisp, n_A_ActiveSkill, n_A_Kotei_Cast_Keigen, n_Delay, n_tok, w_DMG,
    g_bUnknownCasts, wDelay, w_FLEE,
} from "../runtime/ro4-state.js";
import { CSaveDataConst } from "../savedata/CSaveDataConst.js";
import { UsedSkillSearch } from "../skill/skillstate.js";
import { BattleHiDamMaxPain, calcReceivedDamage, calcReceivedMagicDamage } from "./received-damage.js";
import { GetActRateCritical } from "../bridge/battlecalc-bridge.js";

/** オートガードによるダメージ減衰率 */
export const w_AG = [100,95,90,86,82,79,76,74,72,71,70];

let g_AttackCount = [0,0,0];
let g_dps = 0;
let g_receiveDamageAvoids = 0;
let w_DMG_AS_OverHP = 0;

/**
 * 戦闘結果表示部を組み立てる.
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 * @param {*} attackMethodConfArray 
 * @returns 
 */
export function BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray) {
	// 命中率が１００％未満の場合、必中ダメージがあれば追加表示
	if(CS.n_PerfectHIT_DMG > 0 && CS.w_HIT_HYOUJI <100){
		CS.str_bSUBname += "<Font size=2>Miss時の必中ダメージ</Font>";
		if(CS.str_PerfectHIT_DMG == 0){
			if(CS.wActiveHitNum > 1){
				var w = ROUNDDOWN(CS.n_PerfectHIT_DMG / CS.wActiveHitNum);
				CS.str_bSUB += __DIG3(w * CS.wActiveHitNum) +"("+ __DIG3(w) +"×"+ CS.wActiveHitNum +"Hit)";
			}
			else CS.str_bSUB += __DIG3(CS.n_PerfectHIT_DMG);
		}else CS.str_bSUB += CS.str_PerfectHIT_DMG;
	}
	myInnerHtml("bSUBname",CS.str_bSUBname,0);
	myInnerHtml("bSUB",CS.str_bSUB,0);
	document.getElementById("BattleHIT").textContent = CS.w_HIT_HYOUJI;
	document.getElementById("BattlePerfectHIT").textContent = n_tok[ITEM_SP_PERFECT_ATTACK_UP];
//	myInnerHtml("nm067","％",0);
	// 二刀流の通常攻撃時の表示部分
	if (n_Nitou && n_A_ActiveSkill == 0) {
		document.getElementById("BattleHIT").textContent = CS.w_HIT_HYOUJI +"％(左手"+ CS.w_HIT +"％)";
//		myInnerHtml("nm067","",0);
	}
	// TODO : 謎処理　通常攻撃とグラビテーションフィールド以外
	if(mobData[21]==6 && n_A_ActiveSkill != 0 && n_A_ActiveSkill != 325){
		for(var i=0;i<=2;i++){
			w_DMG[i] = 0;
			CS.g_damageTextArray[i] = ["Miss"];
		}
		document.getElementById("MinATKnum").textContent = "無理です";
		document.getElementById("AveATKnum").textContent = "無理です";
		document.getElementById("MaxATKnum").textContent = "無理です";
		document.getElementById("AveSecondATK").textContent = "-";
		document.getElementById("AtkBaseExp").textContent = "-";
		document.getElementById("AtkJobExp").textContent = "-";
		document.getElementById("BattleTime").textContent = "-";

		return;
	}
	// スキル使用不可武器の場合の表示部分
	if (CS.n_Buki_Muri) {
		for(var i=0;i<=2;i++) w_DMG[i] = 0;
		CS.g_damageTextArray[0] = ["<B>この武器では</B>"];
		CS.g_damageTextArray[1] = ["<B>このスキルを</B>"];
		CS.g_damageTextArray[2] = ["<B>使用できません</B>"];
		document.getElementById("MinATKnum").textContent = "-";
		document.getElementById("AveATKnum").textContent = "-";
		document.getElementById("MaxATKnum").textContent = "-";
		document.getElementById("AveSecondATK").textContent = "-";
		document.getElementById("AtkBaseExp").textContent = "-";
		document.getElementById("AtkJobExp").textContent = "-";
		document.getElementById("BattleTime").textContent = "-";

		return;
	}
	g_AttackCount = [-1, -1, -1];
	// 最小攻撃回数表示部の組み立て
	if(w_DMG[2] > 0){

		// 最小攻撃回数を算出
		g_AttackCount[0] = Math.ceil(mobData[3] / w_DMG[2]);

		// 最小攻撃回数が１万回未満ならば、そのまま表示
		if(g_AttackCount[0] < 10000) {
			document.getElementById("MinATKnum").textContent = __DIG3(g_AttackCount[0]);
		}
		// １万回を超える場合は特殊表示
		else {
			document.getElementById("MinATKnum").textContent = SubName[5];
		}

	}else{
		myInnerHtml("MinATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
	}
	// 多段ＨＩＴスキルで１殺の場合、１殺できる確率を表示する
	var w;
	if(CS.SG_Special_HITnum != 0){

		if(w == 1){

			var wHITnum;
			var x;

			wHITnum = CS.SG_Special_HITnum;
			x = (CS.SG_Special_DMG[2] * CS.wHITsuu - mobData[3]) / (CS.SG_Special_DMG[2] * CS.wHITsuu - CS.SG_Special_DMG[0] * CS.wHITsuu);

			if(x > 1) x = 1;
			if(x < 0) x = 0;

			if(wHITnum == 2){
				if(x < 0.5) x = 2 * x * x;
				else x = 1 - 2 * (1-x) * (1-x);
			}

			if(wHITnum == 3){
				if(x <(1/3)) x = 4.5 * Math.pow(x,3);
				else if((1/3) <= x && x <(2/3)) x = 4.5 * (Math.pow(x,3) - 3 * Math.pow(x-1/3,3));
				else if((2/3) <= x) x = 1 - 4.5 * Math.pow(1-x,3);
			}

			if(wHITnum >= 4){
				var y = Math.sqrt(Math.pow(CS.SG_Special_DMG[2]-CS.SG_Special_DMG[0],2) / 12 * wHITnum);
				x = (CS.SG_Special_DMG[1] * CS.wHITsuu - mobData[3]) / y;
				if(x >= 0) x = 0.5+0.5*Math.sqrt(1-Math.exp(-2*Math.pow(x,2)/Math.PI));
				else x = 0.5-0.5*Math.sqrt(1-Math.exp(-2*Math.pow(x,2)/Math.PI));
			}

			x = Math.floor(x * 10000) / 100;

			document.getElementById("MinATKnum").textContent = "1(1回で倒せる確率"+ x +"%)";
		}

		CS.SG_Special_HITnum = 0;
	}
	//----------------------------------------------------------------
	// 経験値効率計算モード（SPMODE）の場合
	//----------------------------------------------------------------
	var atkCountAve = 0;
	var battleTimeAve = 0;
	var perexpBaseAve = 0;
	var perexpJobAve = 0;

	// 最大攻撃回数表示部の組み立て
	// 命中率が１００％未満の場合は、特殊表示
	if(CS.w_HIT_HYOUJI <100 && CS.n_PerfectHIT_DMG == 0){
		myInnerHtml("MaxATKnum","<Font size=2>計算不能<BR>(命中100未満なので)</Font>",0);
	}
	// 命中率が１００％の場合は、確殺を計算
	else{
		var wX = w_DMG[0];
		if(CS.w_HIT_HYOUJI <100) wX = CS.n_PerfectHIT_DMG;
		if(wX > 0){
			g_AttackCount[2] = Math.ceil(mobData[3] / wX);
			if(g_AttackCount[2]<10000) document.getElementById("MaxATKnum").textContent = __DIG3(g_AttackCount[2]);
			else document.getElementById("MaxATKnum").textContent = SubName[5];
		}else{
			myInnerHtml("MaxATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		}
	}
	// 平均攻撃回数表示部の組み立て
	// TODO : 詳細未解析
	g_dps = 0;
	if(w_DMG[1] > 0){
		var check=0;
		for(var j = 0; j < n_AS_SKILL.length; j++){
			if(n_AS_SKILL[j][0] != -1) check = 1;
		}
		if((w_DMG[1] <w_DMG_AS_OverHP) || check == 0){
			g_AttackCount[1] = Math.ceil(mobData[3] / w_DMG[1]);
		}else{
			g_AttackCount[1] = Math.ceil(mobData[3] / w_DMG_AS_OverHP);
		}

		if(g_AttackCount[1]<10000){
			document.getElementById("AtkBaseExp").textContent = __DIG3(Math.round(mobData[15] / g_AttackCount[1])) +"Exp";
			document.getElementById("AtkJobExp").textContent = __DIG3(Math.round(mobData[16] / g_AttackCount[1])) +"Exp";
		}else{
			document.getElementById("AtkBaseExp").textContent = SubName[7];
			document.getElementById("AtkJobExp").textContent = SubName[7];
		}

		if(g_AttackCount[1]<10000){
			document.getElementById("AveATKnum").textContent = __DIG3(g_AttackCount[1]);
			const n_AveATKnum = g_AttackCount[1];
			var w2 = (CS.wCast + wDelay) * n_AveATKnum;
			w2 = Math.floor(w2 * 100) / 100;
			if(n_Delay[0]) document.getElementById("BattleTime").textContent = "特殊";
			else document.getElementById("BattleTime").textContent = __DIG3(w2) + "秒";
		}else{
			document.getElementById("AveATKnum").textContent = SubName[5];
			document.getElementById("BattleTime").textContent = SubName[6];
		}

		g_dps = 1 / (CS.wCast + wDelay) * w_DMG[1];
		g_dps *= 100;
		g_dps = Math.round(g_dps);
		g_dps /= 100;
		if(n_Delay[0]) {
			g_dps = -1;
			document.getElementById("AveSecondATK").textContent = "特殊";
		}
		else document.getElementById("AveSecondATK").textContent = __DIG3(g_dps);
	}else{
		myInnerHtml("AtkBaseExp","<Font size=2>計算不能</Font>",0);
		myInnerHtml("AtkJobExp","<Font size=2>計算不能</Font>",0);
		myInnerHtml("AveSecondATK","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		myInnerHtml("AveATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		myInnerHtml("BattleTime","<Font size=2>計算不能</Font>",0);
	}
	w = calcReceivedDamage(charaData, specData, mobData, attackMethodConfArray, undefined,
		document.getElementById("OBJID_ENEMY_SKILL_RATIO")?.value, document.getElementById("OBJID_ENEMY_SKILL_ELEMENT")?.value);
	w = Math.round(w *(100-charaData[CHARA_DATA_INDEX_LUCKY]))/100;
	w = Math.round(w *(100-w_FLEE))/100;
	var agLv = Math.max(
		0,
		UsedSkillSearch(SKILL_ID_AUTO_GUARD),
		g_confDataNizi[CCharaConfNizi.CONF_ID_AUTO_GUARD],
		TimeItemNumSearch(70)
	);
	if (agLv > 0) {
		w = Math.round(w * w_AG[agLv]) / 100;
	}
	if(n_A_WeaponType==3 && UsedSkillSearch(SKILL_ID_PARIYING)){
		w = Math.round(w * (80- UsedSkillSearch(SKILL_ID_PARIYING) *3))/100;
	}
	if(UsedSkillSearch(SKILL_ID_REJECT_SWORD)){
		w = Math.round(w * (100- UsedSkillSearch(SKILL_ID_REJECT_SWORD) *7.5))/100;
	}
	document.getElementById("B_Ave2Atk").textContent = __DIG3(w)+"ダメージ";
	g_receiveDamageAvoids = w;
	if(n_A_ActiveSkill==441) {
		document.getElementById("B_Ave2Atk").textContent = "-";
	}
}

/*
function OnClickTabBTLRSLT(tabIndex) {

	var objGridDmg = document.getElementById("BATTLE_RESULT_DAMAGE");

	if (!objGridDmg) {
		return;
	}


	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_ALL");
	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_BASIC");
	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_DAMAGE");
	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_RESULT");


	switch (tabIndex) {
	case 0:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_ALL");
		break;
	case 1:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_BASIC");
		break;
	case 2:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_DAMAGE");
		break;
	case 3:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_RESULT");
		break;
	}

}
*/

/**
 * 戦闘結果（DPSや戦闘時間など）を構築する
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 * @param {*} attackMethodConfArray 
 * @param {*} battleCalcResultAll 
 * @returns 
 */
export function BuildBattleResultHtmlMIG(charaData, specData, mobData, attackMethodConfArray, battleCalcResultAll) {

	// パート定義名
	const PART_ID_STR_BASE = "BTLRSLT_PART_BASE";
	const PART_ID_STR_CAST = "BTLRSLT_PART_CAST";
	const PART_ID_STR_ATKDMG = "BTLRSLT_PART_ATKDMG";
	const PART_ID_STR_ATKCNT = "BTLRSLT_PART_ATKCNT";
	const PART_ID_STR_EXP = "BTLRSLT_PART_EXP";
	const PART_ID_STR_RECEIVE = "BTLRSLT_PART_RECEIVE";
	const CHK_ID_DMG_DETAIL = "BTLRSLT_DAMAGE_DETAIL";

	var partIdStrArrayDefined = [
		PART_ID_STR_BASE,
		PART_ID_STR_CAST,
		PART_ID_STR_ATKDMG,
		PART_ID_STR_ATKCNT,
		PART_ID_STR_EXP,
		PART_ID_STR_RECEIVE,
		CHK_ID_DMG_DETAIL,
	];


	var idx = 0;

	var valueWork = 0;
	var textWork = "";

	var partIdStr = "";
	var uncheckedMap = null;
	var refreshCheckboxArray = null;

	var criRate = 0;
	var attackCountAve = 0;

	var dmg = 0;
	var dmgUnit = null;
	var dmgText = "";

	var battleCalcResult = null;

	var objGridBasic = null;
	var objGridDmg = null;
	var objCell = null;
	var objCellSub = null;
	var objGridTiny = null;

	// 数値の整形
	var funcDIG3PX = function (valueF, pointCountF, unitText = "") {

		// 数値でない場合はそのまま返す（単位もつけない）
		if (isNaN(valueF)) {
			return valueF;
		}

		var valueModF = Math.round(valueF * Math.pow(10, pointCountF)) / Math.pow(10, pointCountF);
		var valueTextF = __DIG3(valueModF);
		var posF = valueTextF.indexOf(".");

		if (posF >= 0) {
			if (pointCountF == 0) {
				valueTextF = valueTextF.slice(0, Math.min(valueTextF.length, posF));
			}
			else {
				valueTextF = (valueTextF + ("0").repeat(pointCountF)).slice(0, posF + pointCountF + 1);
			}
		}
		else if (pointCountF > 0) {
			valueTextF += "." + ("0").repeat(pointCountF);
		}

		return valueTextF + unitText;
	};

	var funcDIG3PXPercent = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, " %");
	};

	var funcDIG3PXSecond = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, " 秒");
	};

	var funcDIG3PXSecondCompact = function (valueF, pointCountF) {
		let value = funcDIG3PX(valueF, pointCountF, "秒");
		if (!isNaN(value)) {
			value = value.replace(/\.?0+秒$/, '秒');
		}
		return value;
	};

	var funcDIG3PXCount = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, (valueF == 1) ? " Hit" : " Hits");
	};

	var funcPerMill = function (valueF) {
		var valWorkF = parseInt("" + valueF, 10);
		var retF = valWorkF % 1000;
		retF = ((retF == 0) ? "" : ("." + ("000" + retF).slice(-3)));
		retF = ("" + Math.floor(valWorkF / 1000)) + retF;
		return Number(retF);
	};

	var funcOnChangeChkPart = function (evtF) {

		var idxF = 0;

		var dispStateF = (evtF.target.checked) ? null : "none";
		var objChildrenF = document.getElementsByClassName(evtF.target.id);

		for (idxF = 0; idxF < objChildrenF.length; idxF++) {
			objChildrenF[idxF].style.display = dispStateF;
		}
	};

	var funcOnChangeDamageDetail = function (evtF) {

		var idxF = 0;

		var bDispDetailF = (evtF.target.checked) ? true : false;
		var objGridDmgF = document.getElementById("BATTLE_RESULT_DAMAGE");

		objGridDmgF.classList.remove("CSSFLG_BTLRSLT_DAMAGE_DETAIL");

		if (bDispDetailF) {
			objGridDmgF.classList.add("CSSFLG_BTLRSLT_DAMAGE_DETAIL");
		}
	};

	// チェックボックスの生成
	var funcAppendCheckbox = function (objRootF, idStrF, dispTextF, bUncheckedF, funcOnChange) {

		var objCheckF = null;
		var objLabelF = null;

		objCheckF = HtmlCreateElement("input", objRootF);
		objCheckF.setAttribute("type", "checkbox");
		objCheckF.setAttribute("id", idStrF);
		objCheckF.addEventListener("change", funcOnChange);
		if (bUncheckedF) {
		}
		else {
			objCheckF.checked = "checked";
		}

		// 構築完了時のリフレッシュ対象に追加
		refreshCheckboxArray.push(objCheckF);

		objLabelF = HtmlCreateElement("label", objRootF);
		objLabelF.setAttribute("for", idStrF);

		HtmlCreateTextNode(dispTextF, objLabelF);

		return objCheckF;
	};

	// スキルダメージブロックの生成
	var funcAddSkillDamageBlock = function (objGridF, battleCalcResultF, bAppendResult) {

		var criRateF = 0;

		var objCellF = null;

		// セルを生成する
		var funcCreateCellF = function (bTotalFF) {

			var objCellFF = null;

			objCellFF = HtmlCreateElement("div", objGridF);
			objCellFF.classList.add("BTLRSLT_TAB_DAMAGE");
			objCellFF.classList.add(partIdStr);
			objCellFF.classList.add("CSSCLS_BTLRSLT_VALUE");
			objCellFF.classList.add((bTotalFF ? "BTLRSLT_DAMAGE_TOTAL" : CHK_ID_DMG_DETAIL));

			return objCellFF;
		};

		// 配列の和を計算する
		var funcGetSumDmgText = function (arrayFF, funcDigFF, funcDigParamFF) {

			var sumFF = arrayFF.reduce(
				(accFFF, curFFF) => {
					var valFFF = curFFF[0];
					valFFF *= (curFFF[1] > 1) ? curFFF[1] : 1;
					valFFF *= (curFFF[2] > 1) ? curFFF[2] : 1;
					return (accFFF + valFFF);
				},
				0
			);

			return funcDigFF(sumFF, funcDigParamFF);
		};

		// 結合表示を取得する
		var funcGetJoinDmgText = function (arrayFF, funcDigFF, funcDigParamFF) {
			return arrayFF.reduce(
				(accFFF, curFFF) => {

					var valFFF = "";

					if (accFFF.length > 0) {
						valFFF = " + ";
					}

					valFFF += funcDigFF(curFFF[0], funcDigParamFF);

					if (curFFF[1] > 1) {
						valFFF += " × " + curFFF[1] + " hits";
					}

					if (curFFF[2] > 1) {
						valFFF += " × " + curFFF[2] + " Hits";
					}

					return (accFFF + valFFF);
				},
				""
			);
		};


		// 合計ダメージ表示を取得する
		var funcGetJoinDmgText2 = function (arrayFF, funcDigFF, funcDigParamFF, counts) {
			return arrayFF.reduce(
				(accFFF, curFFF) => {

					var valFFF = "";

					if (!counts){
						counts = 1;
					}
					else if (counts === Infinity) {
						counts = 1;
					}

					valFFF = funcDigFF(curFFF[0] * counts, funcDigParamFF);

					if (curFFF[1] > 1) {
						valFFF = funcDigFF(curFFF[0] * counts * curFFF[1], funcDigParamFF);
					}

					// クライマックスクリムゾンアローのような 単発 + 複数Hit スキルの場合は
					// curFFF[2]に複数Hit数が入っているので計算する
					if (curFFF[2] > 1) {
						valFFF = funcDigFF(curFFF[0] * counts * curFFF[2], funcDigParamFF);
					}

					// accFFFが空でない場合（追撃の場合）は初撃と追撃を + で結合表示する
					if (accFFF.length > 0) {
						valFFF = " + " + valFFF;
					}

					return (accFFF + valFFF);
				},
				""
			);
		};


		// クリティカル率を取得
		criRateF = battleCalcResultF.criRate;


		//----------------
		// スキルラベル
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.gridColumnEnd = "6";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		// ラベルCSS変更
		if (bAppendResult) {
			objCellF.classList.add("CSSCLS_BTLRSLT_METHOD_LABEL_APPEND");
		}
		else {
			objCellF.classList.add("CSSCLS_BTLRSLT_METHOD_LABEL");
		}
		HtmlCreateTextNode(battleCalcResultF.GetSkillName(), objCellF);


		// 使用不可の場合
		if (CS.n_Buki_Muri) {
			objCellF = HtmlCreateElement("div", objGridF);
			objCellF.style.gridColumnStart = "1";
			objCellF.style.gridColumnEnd = "6";
			objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
			objCellF.classList.add(partIdStr);
			objCellF.classList.add("CSSCLS_BTLRSLT_DISUSABLE");
			HtmlCreateTextNode("使用条件不成立のため使用不可", objCellF);
			return;
		}

		// ダメージなし化の場合
		if (CS.g_bSkillNoDamage) {
			objCellF = HtmlCreateElement("div", objGridF);
			objCellF.style.gridColumnStart = "1";
			objCellF.style.gridColumnEnd = "6";
			objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
			objCellF.classList.add(partIdStr);
			objCellF.classList.add("CSSCLS_BTLRSLT_DISUSABLE");
			HtmlCreateTextNode("ダメージ発生なし", objCellF);
			return;
		}


		//----------------
		// 最小ダメージ
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.textAlign = "right";
		objCellF.style.whiteSpace = "nowrap";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		HtmlCreateTextNode("最小", objCellF);

		// 通常
		HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0), funcCreateCellF(true));

		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
		// 1サイクルダメージ

		HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0, Math.ceil(n_Delay[6]/n_Delay[5])), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0), funcCreateCellF(true));
		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0, 1), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0), funcCreateCellF(true));
		}


		//----------------
		// 平均ダメージ
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.textAlign = "right";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		HtmlCreateTextNode("平均", objCellF);

		// 通常
		HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0), funcCreateCellF(true));

		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
		// 1サイクルダメージ
		HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0, Math.ceil(n_Delay[6]/n_Delay[5])), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0), funcCreateCellF(true));
		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0, 1), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0), funcCreateCellF(true));
		}


		//----------------
		// 最大ダメージ
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.textAlign = "right";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		HtmlCreateTextNode("最大", objCellF);

		// 通常
		HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0), funcCreateCellF(true));

		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
		// 1サイクルダメージ
		HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0, Math.ceil(n_Delay[6]/n_Delay[5])), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0), funcCreateCellF(true));
		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0, 1), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
	};

	// 簡易戦闘結果
	var funcRenderResultTinyHtml = function (objRoot, labelText, valueText) {
		var objCell = null;

		objCell = HtmlCreateElement("span", objRoot);
		objCell.classList.add("CSSCLS_BATTLE_TINY_LABEL");
		HtmlCreateTextNode(labelText, objCell);

		objCell = HtmlCreateElement("span", objRoot);
		objCell.classList.add("CSSCLS_BATTLE_TINY_VALUE");
		HtmlCreateTextNode(valueText, objCell);
	};


	//----------------------------------------------------------------
	//
	// ブロックごとの展開状態を保持
	//
	//----------------------------------------------------------------
	uncheckedMap = new Map();
	for (idx = 0; idx < partIdStrArrayDefined.length; idx++) {
		if (!document.getElementById(partIdStrArrayDefined[idx])) {
			continue;
		}
		if (!document.getElementById(partIdStrArrayDefined[idx]).checked) {
			uncheckedMap.set(partIdStrArrayDefined[idx], "unchecked");
		}
	}

	refreshCheckboxArray = [];


	//----------------------------------------------------------------
	//
	// 全体リセット
	//
	//----------------------------------------------------------------
	objGridBasic = document.getElementById("BATTLE_RESULT_BASIC");
	objGridBasic.innerHTML = "";
	objGridDmg = document.getElementById("BATTLE_RESULT_DAMAGE");
	objGridDmg.innerHTML = "";
	objGridTiny = document.getElementById("OBJID_DIV_BATTLE_RESULT_TINY");
	objGridTiny.innerHTML = "";


	//----------------------------------------------------------------
	//
	// 基本情報部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_BASE;

	//----------------
	// 基本情報ラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.style.gridColumnEnd = "-1";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "基本情報", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// 命中率
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("命中率", objCell);

	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXPercent(CS.w_HIT_HYOUJI, 2), objCell);

	// 必中効果のみ
	if (battleCalcResultAll.GetPassiveResultCount() > 0) {
		battleCalcResult = battleCalcResultAll.GetPassiveResult(0);
	}
	else if (battleCalcResultAll.GetActiveResultCount() > 0) {
		battleCalcResult = battleCalcResultAll.GetActiveResult(0);
	}

	if (battleCalcResult.perfectRate !== undefined) {
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.textAlign = "right";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("（必中）", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXPercent(battleCalcResult.perfectRate, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "必中", funcDIG3PX(battleCalcResult.perfectRate, 0, "%"));
	}

	//----------------
	// 回避率
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("回避率", objCell);

	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXPercent(w_FLEE, 2), objCell);

	//----------------
	// クリティカル率
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("ｸﾘﾃｨｶﾙ率", objCell);

	// 後ほど参照するので、クリティカル率を保持しておく
	criRate = GetActRateCritical(battleCalcResult.skillId, mobData);
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXPercent(criRate, 2), objCell);

	funcRenderResultTinyHtml(objGridTiny, "クリ", funcDIG3PX(criRate, 0, "%"));

	//----------------------------------------------------------------
	//
	// 詠唱ディレイ部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_CAST;


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {

		//----------------
		// 攻撃間隔
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		funcAppendCheckbox(objCell, partIdStr, "攻撃間隔", uncheckedMap.get(partIdStr), funcOnChangeChkPart);


	}

	// パッシブキルによる攻撃の場合
	else if (battleCalcResultAll.GetPassiveResultCount() > 0) {

		//----------------
		// 計算結果を取得
		//----------------
		battleCalcResult = battleCalcResultAll.GetPassiveResult(0);

		//----------------
		// 攻撃間隔
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		funcAppendCheckbox(objCell, partIdStr, "攻撃間隔", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	}

	// アクティブスキルによる攻撃の場合
	else if (battleCalcResultAll.GetActiveResultCount() > 0) {

		//----------------
		// 計算結果を取得
		//----------------
		battleCalcResult = battleCalcResultAll.GetActiveResult(0);

		//----------------
		// 詠唱/ディレイラベル
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		funcAppendCheckbox(objCell, partIdStr, "詠唱/ディレイ", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

		//----------------
		// 詠唱時間
		//----------------

		// 変動詠唱時間＋固定詠唱時間
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("詠唱時間", objCell);

		valueWork = battleCalcResult.castVary + battleCalcResult.castFixed;
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);

		// 変動詠唱時間のみ
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.textAlign = "right";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("（変動）", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.castVary, 2), objCell);

		// 簡易戦闘結果: "0秒(276)" or "0.03秒(256.5)"
		var castText = funcDIG3PXSecondCompact(battleCalcResult.castVary, 2);
		castText += `(${g_extraInfoDataBridge.charaData[CHARA_DATA_INDEX_CAST_PARAM]})`;
		funcRenderResultTinyHtml(objGridTiny, "詠唱", castText);

		// 固定詠唱時間のみ
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.textAlign = "right";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("（固定）", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.castFixed, 2), objCell);

		let castFixedText = funcDIG3PXSecondCompact(battleCalcResult.castFixed, 2);
		castFixedText += `(${(100 - GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill)) > n_A_Kotei_Cast_Keigen ? GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill) : (100 - n_A_Kotei_Cast_Keigen)}%)`;
		funcRenderResultTinyHtml(objGridTiny, "固定", castFixedText);

		//----------------
		// ディレイ
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("ディレイ", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.delaySkill, 2), objCell);

		// 簡易戦闘結果: "0.1秒(5%)" or "0秒(-15%)"
		var delayText = funcDIG3PXSecondCompact(battleCalcResult.delaySkill, 2);
		const overValue = Math.round((100 - delayDownForDisp) * 100) / 100;
		delayText += `(${overValue}%)`
		funcRenderResultTinyHtml(objGridTiny, "ディレイ", delayText);

		//----------------
		// クールタイム
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("クールタイム", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.coolTime, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "CT", funcDIG3PXSecondCompact(battleCalcResult.coolTime, 2));
	}

	// 上記以外
	else {
		return;
	}

	//----------------
	// 攻撃間隔
	//----------------
	// 簡易戦闘結果: "189.1" or "193(193.3)"
	const aspdValue = Math.floor(charaData[CHARA_DATA_INDEX_ASPD] * 10) / 10;
	const aspdRawValue = Math.floor(aspdRaw * 10)/10;
	var aspdText = "" + aspdValue;
	if (aspdRawValue > aspdValue) {
		aspdText += `(${aspdRawValue})`
	}
	funcRenderResultTinyHtml(objGridTiny, "ASPD", aspdText);

	//----------------
	// 設置系
	//----------------
	if (battleCalcResult.bGroundInstallation) {

		// サブラベル
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add("CSSCLS_BTLRSLT_RAYING_LABEL");
		HtmlCreateTextNode("設置系情報", objCell);

		// 攻撃間隔
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("攻撃間隔", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.attackInterval, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "攻撃間隔", funcDIG3PXSecondCompact(battleCalcResult.attackInterval, 2));

		// オブジェクト持続時間
		if (battleCalcResult.objectLifeTime > 0) {
			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.style.gridColumnStart = "1";
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			HtmlCreateTextNode("持続時間", objCell);

			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
			HtmlCreateTextNode(funcDIG3PXSecond(funcPerMill(battleCalcResult.objectLifeTime), 2), objCell);
		}

		// ダメージ回数
		if ((battleCalcResult.damageInterval > 0) && (battleCalcResult.objectLifeTime > 0)) {
			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.style.gridColumnStart = "1";
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			HtmlCreateTextNode("ダメージ回数", objCell);

			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
			HtmlCreateTextNode(funcDIG3PXCount(battleCalcResult.GetDamageCountSummary(), 0), objCell);
		}
	}

	// TODO: 詠唱時間等未実測スキル対応
	else if (g_bUnknownCasts) {

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("詠唱時間等", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（未実測）", objCell);
	}

	//----------------
	// 一般
	//----------------
	else {
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("攻撃間隔", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.castVary + battleCalcResult.castFixed + battleCalcResult.attackInterval, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "攻撃間隔", funcDIG3PXSecondCompact(battleCalcResult.castVary + battleCalcResult.castFixed + battleCalcResult.attackInterval, 2));
	}


	//----------------------------------------------------------------
	//
	// 与ダメージ部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_ATKDMG;

	//----------------
	// 与ダメージラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.position = "relative";
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");

	// 詳細表示ラベル
	objCellSub = HtmlCreateElement("div", objCell);
	objCellSub.style.position = "absolute";
	objCellSub.style.right = "1em";
	funcAppendCheckbox(objCellSub, CHK_ID_DMG_DETAIL, "詳細表示", uncheckedMap.get(CHK_ID_DMG_DETAIL), funcOnChangeDamageDetail);

	// チェックボックスの追加順序調整
	funcAppendCheckbox(objCell, partIdStr, "与ダメージ", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// サブラベル
	//----------------

	// ダミー
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);

	// 通常
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("通常(1Hit)", objCell);

	// クリティカル
	if (criRate > 0) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("ｸﾘﾃｨｶﾙ", objCell);
	}
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("1ｻｲｸﾙﾀﾞﾒ", objCell);
	// クリティカル
	if (criRate > 0) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.style.whiteSpace = "nowrap";
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("1ｻｲｸﾙ(ｸﾘﾀﾞﾒ)", objCell);
	}


	//----------------
	// 表示本体
	//----------------

	// パッシブキルによる攻撃の場合
	if (battleCalcResultAll.GetPassiveResultCount() > 0) {

		for (idx = 0; idx < battleCalcResultAll.GetPassiveResultCount(); idx++) {
			funcAddSkillDamageBlock(objGridDmg, battleCalcResultAll.GetPassiveResult(idx), false);
		}

	}

	// アクティブスキルによる攻撃の場合
	else if (battleCalcResultAll.GetActiveResultCount() > 0) {

		for (idx = 0; idx < battleCalcResultAll.GetActiveResultCount(); idx++) {
			funcAddSkillDamageBlock(objGridDmg, battleCalcResultAll.GetActiveResult(idx), false);
		}

	}

	// 確率追撃攻撃は常に
	if (battleCalcResultAll.GetAppendResultCount() > 0) {

		for (idx = 0; idx < battleCalcResultAll.GetAppendResultCount(); idx++) {
			funcAddSkillDamageBlock(objGridDmg, battleCalcResultAll.GetAppendResult(idx), true);
		}

	}


	//----------------
	// 総ダメージラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_PERSEC_LABEL");
	HtmlCreateTextNode("実ダメージ（発動率、命中率込み）", objCell);

	//----------------
	// サブラベル
	//----------------

	// ダミー
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);

	// 一撃
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	if (battleCalcResult.bGroundInstallation) {
		HtmlCreateTextNode("1Hit", objCell);
	}
	else {
		HtmlCreateTextNode("1Shot", objCell);
	}

	// 秒間
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("DPS", objCell);

	//----------------
	// 最小ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.textAlign = "right";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最小", objCell);

	// ダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryMinPerAtk(), 0), objCell);

	let bDPSActual = registryGet('CSaveController').getSettingProp(CSaveDataConst.propNameDPSActual);
	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（計算不能）", objCell);
	}
	else {
		// ダメージ
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		const minDmg = bDPSActual
					? battleCalcResultAll.GetDamageSummaryMinPerSecActual()
					: battleCalcResultAll.GetDamageSummaryMinPerSec();
		HtmlCreateTextNode(funcDIG3PX(minDmg, 0), objCell);
	}

	//----------------
	// 平均ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.textAlign = "right";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("平均", objCell);

	// ダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryAvePerAtk(), 0), objCell);

	funcRenderResultTinyHtml(objGridTiny, "平均", funcDIG3PX(battleCalcResultAll.GetDamageSummaryAvePerAtk(), 0));

	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（計算不能）", objCell);

		funcRenderResultTinyHtml(objGridTiny, "DPS", "（計算不能）");
	}
	else {
		// ダメージ
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");

		const aveDmg = bDPSActual
					? battleCalcResultAll.GetDamageSummaryAvePerSecActual()
					: battleCalcResultAll.GetDamageSummaryAvePerSec();
		HtmlCreateTextNode(funcDIG3PX(aveDmg, 0), objCell);
		funcRenderResultTinyHtml(objGridTiny, "DPS", funcDIG3PX(aveDmg, 0));
	}

	//----------------
	// 最大ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.textAlign = "right";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最大", objCell);

	// ダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryMaxPerAtk(), 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（計算不能）", objCell);
	}
	else {
		// ダメージ
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		const maxDmg = bDPSActual
					? battleCalcResultAll.GetDamageSummaryMaxPerSecActual()
					: battleCalcResultAll.GetDamageSummaryMaxPerSec();
		HtmlCreateTextNode(funcDIG3PX(maxDmg, 0), objCell);
	}

	//----------------------------------------------------------------
	//
	// 攻撃回数部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_ATKCNT;

	//----------------
	// 攻撃回数ラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "攻撃回数", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// 最小攻撃回数
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.textAlign = "right";
	objCell.style.gridColumnStart = "1";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最小", objCell);

	// 攻撃回数
	valueWork = battleCalcResultAll.GetAttackCountSummaryMin();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXCount(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		// 秒数
		if (battleCalcResult.bGroundInstallation == true) {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMinInterval();
		} else {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMin();
		}
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.style.whiteSpace = "nowrap";		
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);
	}

	//----------------
	// 平均攻撃回数
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.textAlign = "right";
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("平均", objCell);

	// 攻撃回数
	valueWork = battleCalcResultAll.GetAttackCountSummaryAve();
	// 経験値効率計算用に保持
	attackCountAve = valueWork;
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXCount(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		// 秒数
		if (battleCalcResult.bGroundInstallation == true) {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryAveInterval();
		} else {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryAve();
		}
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);
	}

	//----------------
	// 最大攻撃回数
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.textAlign = "right";
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最大", objCell);

	// 攻撃回数
	valueWork = battleCalcResultAll.GetAttackCountSummaryMax();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXCount(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		// 秒数
		if (battleCalcResult.bGroundInstallation == true) {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMaxInterval();
		} else {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMax();
		}
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);
	}


	//----------------------------------------------------------------
	//
	// 経験値効率部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_EXP;

	//----------------
	// 経験値効率ラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "経験値効率", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// サブラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);

	// ベース
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("BaseExp", objCell);

	// ジョブ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("JobExp", objCell);

	//----------------
	// 一撃平均
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("一撃平均", objCell);

	// ベース
	valueWork = battleCalcResultAll.GetBaseExpPerAtk();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);

	// ジョブ
	valueWork = battleCalcResultAll.GetJobExpPerAtk();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		//----------------
		// 秒間平均
		//----------------
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("秒間平均", objCell);

		// ベース
		valueWork = battleCalcResultAll.GetBaseExpPerSec();
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);

		// ジョブ
		valueWork = battleCalcResultAll.GetJobExpPerSec();
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);
	}

	//----------------------------------------------------------------
	//
	// 被ダメージ部（仮）
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_RECEIVE;

	//----------------
	// 被ダメージラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	objCell.classList.add("CSSCLS_BTLRSLT_RECEIVE_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "最大被ダメージ", uncheckedMap.get(partIdStr), funcOnChangeChkPart);
	{
		// 敵スキルの倍率・属性の参考情報へのリンク（タイトルのトグル操作と分離して右寄せ表示する）
		const objLink = HtmlCreateElement("a", objCell);
		objLink.setAttribute("href", "https://github.com/roratorio-hub/ratorio/wiki/received_damage");
		objLink.setAttribute("target", "_blank");
		objLink.setAttribute("title", "被ダメージ計算の使い方と、敵スキルの倍率・属性の参考情報（GitHub wiki）");
		objLink.classList.add("CSSCLS_BTLRSLT_RECEIVE_HELP_LINK");
		HtmlCreateTextNode("📖 敵スキルの倍率・属性を調べる", objLink);
	}

	//----------------
	// 物理ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumn = "1 / 3";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("物理", objCell);
	const enemy_skill_ratio = HtmlCreateElement("input", objCell);
	enemy_skill_ratio.setAttribute("id", "OBJID_ENEMY_SKILL_RATIO");
	enemy_skill_ratio.setAttribute("type", "number");
	enemy_skill_ratio.setAttribute("min", "100");
	enemy_skill_ratio.setAttribute("max", "60000");
	enemy_skill_ratio.setAttribute("placeholder", "倍率(100-60000)");
	enemy_skill_ratio.value = "100";
	HtmlCreateTextNode("%", objCell);
	const enemy_skill_element = HtmlCreateElement("select", objCell);
	enemy_skill_element.setAttribute("id", "OBJID_ENEMY_SKILL_ELEMENT");
	HtmlCreateElementOption(-1,            "属性なし", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_VANITY, "無属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_WATER,  "水属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_EARTH,  "地属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_FIRE,   "火属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_WIND,   "風属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_POISON, "毒属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_HOLY,   "聖属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_DARK,   "闇属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_PSYCO,  "念属性", enemy_skill_element);
	HtmlCreateElementOption(ELM_ID_UNDEAD, "不死属性", enemy_skill_element);

	const objPhysicalDamageView = HtmlCreateElement("div", objGridDmg);
	objPhysicalDamageView.setAttribute("id", "OBJID_RECEIVED_DAMAGE_PHYSICAL");
	objPhysicalDamageView.classList.add("BTLRSLT_TAB_RESULT");
	objPhysicalDamageView.classList.add(partIdStr);
	objPhysicalDamageView.classList.add("CSSCLS_BTLRSLT_VALUE");

	//----------------
	// 魔法ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumn = "1 / 3";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("魔法", objCell);
	const enemy_magic_skill_ratio = HtmlCreateElement("input", objCell);
	enemy_magic_skill_ratio.setAttribute("id", "OBJID_ENEMY_MAGIC_SKILL_RATIO");
	enemy_magic_skill_ratio.setAttribute("type", "number");
	enemy_magic_skill_ratio.setAttribute("min", "100");
	enemy_magic_skill_ratio.setAttribute("max", "60000");
	enemy_magic_skill_ratio.setAttribute("placeholder", "倍率(100-60000)");
	enemy_magic_skill_ratio.value = "100";
	HtmlCreateTextNode("%", objCell);
	const enemy_magic_skill_element = HtmlCreateElement("select", objCell);
	enemy_magic_skill_element.setAttribute("id", "OBJID_ENEMY_MAGIC_SKILL_ELEMENT");
	HtmlCreateElementOption(ELM_ID_VANITY, "無属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_WATER,  "水属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_EARTH,  "地属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_FIRE,   "火属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_WIND,   "風属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_POISON, "毒属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_HOLY,   "聖属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_DARK,   "闇属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_PSYCO,  "念属性", enemy_magic_skill_element);
	HtmlCreateElementOption(ELM_ID_UNDEAD, "不死属性", enemy_magic_skill_element);

	const objMagicalDamageView = HtmlCreateElement("div", objGridDmg);
	objMagicalDamageView.setAttribute("id", "OBJID_RECEIVED_DAMAGE_MAGICAL");
	objMagicalDamageView.classList.add("BTLRSLT_TAB_RESULT");
	objMagicalDamageView.classList.add(partIdStr);
	objMagicalDamageView.classList.add("CSSCLS_BTLRSLT_VALUE");

	//----------------
	// 設定の復元と初期計算
	//----------------

	// 保存済みの被ダメージ計算設定を復元する（初回計算より前に行うこと）
	CReceivedDamageConfManager.RestoreToControls();
	CReceivedDamageConfManager.BindPersistence();

	if (n_B_KYOUKA[MOB_CONF_BUF_ID_MAX_PAIN] == 0) {
		calcReceivedDamage(charaData, specData, mobData, attackMethodConfArray, objPhysicalDamageView, enemy_skill_ratio.value, enemy_skill_element.value);
		enemy_skill_ratio.addEventListener("change", () => {
			calcReceivedDamage(charaData, specData, mobData, attackMethodConfArray, objPhysicalDamageView, enemy_skill_ratio.value, enemy_skill_element.value);
		});
		enemy_skill_element.addEventListener("change", () => {
			calcReceivedDamage(charaData, specData, mobData, attackMethodConfArray, objPhysicalDamageView, enemy_skill_ratio.value, enemy_skill_element.value);
		});
	} else {
		BattleHiDamMaxPain(charaData, specData, mobData, attackMethodConfArray, battleCalcResultAll.GetDamageSummaryAvePerAtk(), objPhysicalDamageView);
	}

	calcReceivedMagicDamage(charaData, mobData, objMagicalDamageView, enemy_magic_skill_ratio.value, enemy_magic_skill_element.value);
	enemy_magic_skill_ratio.addEventListener("change", () => {
		calcReceivedMagicDamage(charaData, mobData, objMagicalDamageView, enemy_magic_skill_ratio.value, enemy_magic_skill_element.value);
	});
	enemy_magic_skill_element.addEventListener("change", () => {
		calcReceivedMagicDamage(charaData, mobData, objMagicalDamageView, enemy_magic_skill_ratio.value, enemy_magic_skill_element.value);
	});

	// 各パートの表示状態の更新
	for (idx = 0; idx < refreshCheckboxArray.length; idx++) {
		refreshCheckboxArray[idx].dispatchEvent(new Event("change"));
	}

	return;
}

