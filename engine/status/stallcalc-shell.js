/**
 * stallcalc.js の Shell 部分（DOM 読み書きを行う側。残件台帳 B-09 Phase 5）。
 *
 * `StAllCalc()` / `Init()` / `LoadSaveDataToCalculator()` / DOMContentLoaded ブロックを
 * stallcalc.js から分離した。`StAllCalcCore()`（Core・DOM 非依存）は stallcalc.js に残る。
 * `calcFromModel()`（calc-core-entry.js）はこのファイルを import しない
 * ——ここを import すると CSaveController 経由で calchistory.js（jQuery）まで
 * 芋づる式にモジュール評価されてしまい、DOM/jQuery 非依存の Core エントリという
 * D3 の前提が崩れるため。ブラウザからは calcx.html がこのファイルを
 * `<script type="module">` で直接読み込む（stallcalc.js は本ファイル経由で
 * 間接的に評価される）。
 *
 * 外部からの呼び出しは engine/bridge/stallcalc-bridge.js 経由（__registerFootFunctions）。
 * StAllCalc のみ workspace TS 向けに engine-registry.js へも登録する
 * （stallcalc-bridge.js 冒頭のコメント参照）。
 */

import { StAllCalcCore } from "./stallcalc.js";
import { CAttackMethodAreaComponentManager } from "../battle/CAttackMethodAreaComponentManager.js";
import { CBattleQuickControlAreaComponentManager } from "../battle/CBattleQuickControlAreaComponentManager.js";
import { calc } from "../battle/battlecalc.js";
import { BuildUpCastSimSimulateArea } from "../battle/castsim.js";
import { OnClickQuickControlSW } from "../battle/quickcontrol.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfCustomDef } from "../chara/CCharaConfCustomDef.js";
import { CCharaConfCustomSkill } from "../chara/CCharaConfCustomSkill.js";
import { CCharaConfCustomSpecStatus } from "../chara/CCharaConfCustomSpecStatus.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CCharaConfIchizi } from "../chara/CCharaConfIchizi.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CCharaConfYozi } from "../chara/CCharaConfYozi.js";
import { CalcStatusPoint } from "../chara/hmjob.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_MID, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_SHOULDER,
} from "../const/EnumEquipRegionId.js";
import { JOB_ID_NOVICE } from "../const/EnumJobId.js";
import { enchSearch } from "../equip/CEnchSearch.js";
import { CItemInfoManager } from "../equip/CItemInfoManager.js";
import { CTimeItemAreaComponentManager } from "../equip/CTimeItemAreaComponentManager.js";
import {
    ClearEquipAll, InitEquipDefaultAll, UpdateStatefullDataOnChangeEquip, changeJobSettings,
} from "../equip/equip.js";
import {
    ClearCardSlotAll, SetCardSlotEnabilityAll,
} from "../equip/hmcard.js";
import {
    ClearCostumeSlotAll, SetCostumeSlotEnabilityAll,
} from "../equip/hmcostume.js";
import {
    ClearRndOptSelectAll, SetRndOptEnablityAll,
} from "../equip/hmrndopt.js";
import {
    ITEMSET_ID_LIMIT_WITH_CARD, ITEMSET_ID_LIMIT_WITH_ITEM,
} from "../equip/itemset.h.js";
import {
    BreakSlotOfCardAll, BreakSlotOfCostumeAll, BreakSlotOfRndEnchAll, GetSlotMode, RebuildSlotAsCardAll, RebuildSlotAsCostumeAll, RebuildSlotAsRndEnchAll,
} from "../equip/slotpager.js";
import {
    CMobConfInputAreaComponentManager, g_dataManagerMobConfInput,
} from "../monster/CMobConfInput.js";
import { CMonsterMapAreaComponentManager } from "../monster/CMonsterMapAreaComponentManager.js";
import {
    BuildUpMobConfBufSelectArea, RefreshMobConfBufSelectAreaHeader, n_B_KYOUKA,
} from "../monster/mobconfbuf.js";
import {
    BuildUpMobConfDebufSelectArea, RefreshMobConfDebufSelectAreaHeader, n_B_IJYOU,
} from "../monster/mobconfdebuf.js";
import {
    BuildUpMobConfPlayerSelectArea, RefreshMobConfPlayerControlCSS, RefreshMobConfPlayerSelectAreaHeader, n_B_TAISEI,
} from "../monster/mobconfplayer.js";
import { COSTUME_REGION_ID_COUNT } from "../runtime/common.js";
import {
    g_confDataCustomAtk, g_confDataCustomDef, g_confDataCustomSkill, g_confDataCustomSpecStatus, g_confDataCustomStatus, g_confDataDebuff, g_confDataIchizi, g_confDataNizi, g_confDataSanzi, g_confDataYozi, g_objCharaConfCustomAtk, g_objCharaConfCustomDef, g_objCharaConfCustomSkill, g_objCharaConfCustomSpecStatus, g_objCharaConfCustomStatus, g_objCharaConfDebuff, g_objCharaConfIchizi, g_objCharaConfNizi, g_objCharaConfSanzi, g_objCharaConfYozi, g_timeItemConf, g_timeItemConfEffective, set_g_confDataCustomAtk, set_g_confDataCustomDef, set_g_confDataCustomSkill, set_g_confDataCustomSpecStatus, set_g_confDataCustomStatus, set_g_confDataDebuff, set_g_confDataIchizi, set_g_confDataNizi, set_g_confDataSanzi, set_g_confDataYozi, set_g_objCharaConfCustomAtk, set_g_objCharaConfCustomDef, set_g_objCharaConfCustomSkill, set_g_objCharaConfCustomSpecStatus, set_g_objCharaConfCustomStatus, set_g_objCharaConfDebuff, set_g_objCharaConfIchizi, set_g_objCharaConfNizi, set_g_objCharaConfSanzi, set_g_objCharaConfYozi,
} from "../runtime/global.js";
import {
    SaveDataAll, n_tok, set_n_A_BaseLV, set_n_A_Weapon_zokusei,
} from "../runtime/ro4-state.js";
import {
    SpeedPotName, g_objMobConfInput, n_A_AGI, n_A_DEX, n_A_Equip, n_A_INT, n_A_LUK, n_A_PassSkill5, n_A_STR, n_A_VIT, n_A_card, n_A_costume, set_SU_AGI, set_SU_DEX, set_SU_INT, set_SU_LUK, set_SU_STR, set_SU_VIT, set_g_objMobConfInput, set_n_A_AGI, set_n_A_BODY_DEF_PLUS, set_n_A_DEX, set_n_A_Equip, set_n_A_HEAD_DEF_PLUS, set_n_A_INT, set_n_A_JobLV, set_n_A_LUK, set_n_A_PassSkill5, set_n_A_SHIELD_DEF_PLUS, set_n_A_SHOES_DEF_PLUS, set_n_A_SHOULDER_DEF_PLUS, set_n_A_STR, set_n_A_VIT, set_n_A_Weapon2_ATKplus, set_n_A_Weapon_ATKplus, set_n_A_card, set_n_A_costume,
} from "../runtime/roro-state.js";
import {
    HtmlCreateElement, HtmlCreateElementOption, HtmlCreateTextNode, HtmlRemoveAllChild, SetStatefullData,
} from "../runtime/util.js";
import { CSaveController } from "../savedata/CSaveController.js";
import { CSaveDataConst } from "../savedata/CSaveDataConst.js";
import {
    LoadCookie3, LoadCookieConf,
} from "../savedata/savedata-codec.js";
import {
    AUTO_SPELL_SETTING_COUNT, OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB, OnClickExtractSettingAutoSpell,
} from "../skill/calcautospell.js";
import { OnClickSkillSWLearned } from "../skill/learnedskill.js";
import { SKILL_ID_SHUCHURYOKU_KOZYO } from "../skill/skill.dat.js";
import {
    UsedSkillSearch, n_A_PassSkill, n_A_PassSkill4, n_A_PassSkill7, n_A_PassSkill8,
} from "../skill/skillstate.js";
import {
    Click_Skill4SW, setN_Skill4SW,
} from "../ui/BuffGuildAndGospel.js";
import {
    Click_Skill7SW, setN_Skill7SW,
} from "../ui/BuffItemAndFood.js";
import {
    Click_PassSkillSW, setN_Skill1SW,
} from "../ui/BuffJobSpecificSelf.js";
import {
    Click_Skill8SW, setN_Skill8SW,
} from "../ui/BuffOtherCategory.js";
import { CFloatingInfoAreaComponentManager } from "../ui/CFloatingInfoAreaComponentManager.js";
import { HydrateFromDom } from "./stallcalc-hydrate.js";
import { __registerFootFunctions } from "../bridge/stallcalc-bridge.js";
import { register } from "../runtime/engine-registry.js";


/**
 * StAllCalc のDOM走査プロローグを HydrateFromDom()（stallcalc-hydrate.js）へ
 * 切り出した後の骨組み（リファクタリング計画 Phase 5）。
 * 描画呼び出し（RefreshDispAreaAll 等）は StAllCalcCore() の外、本関数の末尾に置く
 * ——将来 calcFromModel() が StAllCalcCore() だけを呼べば描画を経由せずに済むようにするため。
 */
export function StAllCalc(){
    const { n_A_SpeedPOT, attackMethodConfArray } = HydrateFromDom();
    const result = StAllCalcCore(n_A_SpeedPOT, attackMethodConfArray);
    const [charaData, , mobData] = result;

    // 拡張表示を更新
    CFloatingInfoAreaComponentManager.setReferData(charaData, n_tok, mobData);
    CFloatingInfoAreaComponentManager.RefreshDispAreaAll();

    // ステータス欄注意喚起（集中力向上）。判定条件は計算結果に依存しないため
    // StAllCalcCore() の外（Shell側）で完結させる（stallcalc-exp-reflect-atk-size.js
    // から移設）。
    const objStatusNoticeDiv = document.getElementById("OBJID_DIV_STATUS_NOTICE");
    HtmlRemoveAllChild(objStatusNoticeDiv);
    if (UsedSkillSearch(SKILL_ID_SHUCHURYOKU_KOZYO) > 0) {
        const objP = HtmlCreateElement("p", objStatusNoticeDiv);
        objP.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED_BOLD");
        HtmlCreateTextNode("（★注意情報★）集中力向上の効果が設定されています。", objP);
        const objA = HtmlCreateElement("a", objP);
        // 挿入先ページの深さに依存しないよう import.meta.url 基準の完全修飾URLで解決する（B-23で pages/ へ移動）。
        objA.setAttribute("href", new URL("../pages/note20210606.html", import.meta.url).href);
        objA.setAttribute("target", "_blank");
        HtmlCreateTextNode("『こちら』", objA);
        HtmlCreateTextNode("の注意事項をご確認ください。", objP);
    }

    return result;
}

const EnName =["なし","水","地","火","風","毒","聖","闇","念","死"];

// 他の関数実行に先駆けて初期化される必要があるので load だとタイミングが遅い. DOMContentLoaded を指定する必要がある.
document.addEventListener('DOMContentLoaded', () => {
	console.log("DOM Content is loaded.");
	// YAMLデータのロードが完了していたら発火
	waitForDataLoaded().then(() => {
		console.log("All data is loaded.");

		// 計算機設定の読み込み
		if (document.getElementById("OBJID_SAVE_BLOCK_MIG")) {
			CSaveController.LoadSettingFromLocalStorageMIG();
		}

		document.calcForm.A_SpeedPOT.options[0] = new Option(SpeedPotName[0],0);
		document.calcForm.A_SpeedPOT.options[1] = new Option(SpeedPotName[1],1);

		for (var i=0; i<=9; i++) {
			document.calcForm.A_Weapon_zokusei.options[i] = new Option(EnName[i],i);
		}

		CMonsterMapAreaComponentManager.RebuildControls();

		//--------------------------------
		// モンスター手入力設定欄の初期化
		//--------------------------------
		set_g_objMobConfInput(new CMobConfInputAreaComponentManager(g_dataManagerMobConfInput));
		g_objMobConfInput.BuildUpSelectArea(document.getElementById("OBJID_TD_MOB_CONF_INPUT_NEW"), false);

		//--------------------------------
		// ステートフルデータの初期化
		//--------------------------------
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_ARMS);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_ARMS_LEFT);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_HEAD_TOP);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_HEAD_MID);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_HEAD_UNDER);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_SHIELD);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_BODY);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_SHOULDER);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_SHOES);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_ACCESSORY_1);
		UpdateStatefullDataOnChangeEquip(EQUIP_REGION_ID_ACCESSORY_2);

		if (document.getElementById("OBJID_SAVE_BLOCK_MIG")) {
			CSaveController.LoadFromLocalStorageMIG();
			// 画面上部セーブ選択セレクトボックスの初期化
			const objSelect = document.getElementById("OBJID_SELECT_SAVE_DATA_MIG");
			HtmlRemoveAllChild(objSelect)
			for (let idx = 0; idx < CSaveController.CHARA_DATA_COUNT; idx++) {
				const optText = CSaveController.getDisplayName(idx);
				HtmlCreateElementOption(idx, optText, objSelect);
			}
			// 確認ダイアログの有効化スイッチを初期化
			if (CSaveController.getSettingProp(CSaveDataConst.propNameConfirmDialogSwitch) == 1) {
				document.getElementById("OBJID_SWITCH_CONFIRM_DIALOG")?.click();
			}
		}
		else {
			LoadSaveDataToCalculator();
		}

		/**
		 * 新形式を前提としたロード処理
		 * 初代の a 形式
		 * 避難所の b 形式
		 * Hub の c 形式
		 * どれも読み込めることを確認
		 */
		// URL引数のチェック
		const query = window.location.search;
		const param = query.replace("?", "");
		const patternRtx = /^rtx[0-9]+:/

		if (param.length > 0 && !patternRtx.test(param)) {
			// ラトリオ独自のロード処理
			CSaveController.loadFromURL(param);
		} else {
			// URLロードがない場合は、ノービスを初期ジョブとして設定
			// job.yaml 廃止によりセレクトボックスの value は mig ID の数値文字列
			changeJobSettings(String(JOB_ID_NOVICE));
			// 検索可能ドロップダウンリストのロード
			LoadTomSelect();
		}

		// 再計算
		CalcStatusPoint(true);
		calc();

		/**
		 * カスタム表示の状態を復元する
		 * 装備・ステータスに依存するカスタム表示欄があるので再計算後に実施する
		 */
		if (CSaveController.getSettingProp(CSaveDataConst.propNameFloatingInfoAreaSwitch) === 1n) {
			// カスタム表示を開く
			document.getElementById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX").click();
			// 中身を復元する
			CFloatingInfoAreaComponentManager.LoadFromLocalStorage();
		}
		/**
		 * アイテム情報の状態を復元する
		 */
		if (CSaveController.getSettingProp(CSaveDataConst.propNameItemInfoSwitch) === 1n) {
			// カスタム表示を開く
			document.getElementById("OBJID_ITEM_INFO_EXTRACT_CHECKBOX").click();
			// 中身を復元する
			CItemInfoManager.LoadFromLocalStorage();
		}

		// エンチャントサーチのロード
		new enchSearch();
	});
});

export function LoadSaveDataToCalculator () {

	var idx = 0;
	var idxUndefined = 0;

	LoadCookieConf();

	LoadCookie3();

	// セーブデータをミスって公開してしまった時の保険か何か？
	for (idx = 1; idx <= 19; idx++) {

		idxUndefined = SaveDataAll[idx].search("undefined");

		if (idxUndefined >= 0) {
			SaveDataAll[idx] = SaveDataAll[idx].substring(0, idxUndefined) + "a999";
		}
	}
}

/**
 * 計算機の初回ロード時、および職業変更時に呼び出される初期化関数
 * @param {*} jobId 
 */
export function Init(jobId){
	// 職業IDが引数で渡されなかった時用のコード
	if (typeof jobId === "undefined" || jobId === null) {
		jobId = document.getElementById("OBJID_SELECT_JOB").value;
	}

	var i, idx = 0, objInput = null;

	set_n_A_BaseLV(1);
	set_n_A_JobLV(1);

	set_n_A_STR(1);
	set_n_A_AGI(1);
	set_n_A_VIT(1);
	set_n_A_DEX(1);
	set_n_A_INT(1);
	set_n_A_LUK(1);

	set_SU_STR(n_A_STR);
	set_SU_AGI(n_A_AGI);
	set_SU_VIT(n_A_VIT);
	set_SU_DEX(n_A_DEX);
	set_SU_INT(n_A_INT);
	set_SU_LUK(n_A_LUK);

	document.calcForm.A_Weapon_zokusei.value = 0;
	set_n_A_Weapon_zokusei(0);
	document.calcForm.A_Weapon_ATKplus.value = 0;
	set_n_A_Weapon_ATKplus(0);
	set_n_A_Weapon2_ATKplus(0);
	document.calcForm.A_HEAD_DEF_PLUS.value = 0;
	document.calcForm.A_BODY_DEF_PLUS.value = 0;
	document.calcForm.A_SHIELD_DEF_PLUS.value = 0;
	document.calcForm.A_SHOULDER_DEF_PLUS.value = 0;
	document.calcForm.A_SHOES_DEF_PLUS.value = 0;
	set_n_A_HEAD_DEF_PLUS(0);
	set_n_A_BODY_DEF_PLUS(0);
	set_n_A_SHIELD_DEF_PLUS(0);
	set_n_A_SHOULDER_DEF_PLUS(0);
	set_n_A_SHOES_DEF_PLUS(0);

	set_n_A_Equip(new Array());
	for(let i = 0; i <= ITEMSET_ID_LIMIT_WITH_ITEM; i++) n_A_Equip[i] = 0;

	set_n_A_card(new Array());
	for(let i = 0; i <= ITEMSET_ID_LIMIT_WITH_CARD; i++) n_A_card[i] = 0;

	set_n_A_costume(new Array());
	for(i = 0; i < COSTUME_REGION_ID_COUNT; i++) {
		n_A_costume[i] = 0;
	}

	// 対プレイヤー設定 の初期化
	n_B_TAISEI.fill(0);
	// モンスター状態強化 の初期化
	n_B_KYOUKA.fill(0);
	// モンスター状態異常 の初期化
	n_B_IJYOU.fill(0);
	// ギルドスキル/ゴスペル/他 の初期化
	n_A_PassSkill4.fill(0);
	// アイテム・食品他 の初期化
	n_A_PassSkill7.fill(0);
	// 職固有自己支援 の初期化
	n_A_PassSkill.fill(0);
	// その他の支援/設定 の初期化
	n_A_PassSkill8.fill(0);

	// オートスペル設定
	set_n_A_PassSkill5(new Array());
	for (var idx = 0 ; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
		n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx] = 0;
		n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx] = 0;
		n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx] = 0;
	}

	// プレイヤー状態異常設定
	set_g_confDataDebuff(Array(50).fill(0));

	// 時限効果
	for (idx = 0; idx < g_timeItemConf.length; idx++) {
		g_timeItemConf[idx] = 0;
	}
	for (idx = 0; idx < g_timeItemConfEffective.length; idx++) {
		g_timeItemConfEffective[idx] = true;
	}

	if (GetSlotMode() == 0) {
		//--------------------------------
		// カードスロットの初期化
		//--------------------------------
		BreakSlotOfCardAll();
		BreakSlotOfCostumeAll();
		RebuildSlotAsCardAll();
		RebuildSlotAsCostumeAll(jobId);
		ClearCardSlotAll();
		ClearCostumeSlotAll();
		ClearRndOptSelectAll();
		// ClearRndEnchSlotAll();
		SetCardSlotEnabilityAll();
		SetCostumeSlotEnabilityAll();
		SetStatefullData("DATA_OBJID_SLOT_MODE_BUTTON", 0);
	}
	else {
		//--------------------------------
		// ランダムエンチャントの初期化
		//--------------------------------
		BreakSlotOfRndEnchAll();
		RebuildSlotAsRndEnchAll();
		ClearCardSlotAll();
		ClearCostumeSlotAll();
		ClearRndOptSelectAll();
		// ClearRndEnchSlotAll();
		SetRndOptEnablityAll();
		// SetEnchSlotsEnablity();
	}

	//--------------------------------
	// 装備欄の初期化
	//--------------------------------
	InitEquipDefaultAll();
	ClearEquipAll();

	setN_Skill1SW(false);
	setN_Skill4SW(false);
	setN_Skill7SW(false);
	setN_Skill8SW(false);
	document.calcForm.A1_SKILLSW.checked = 0;

	//--------------------------------
	// 一次職支援設定欄の初期化
	//--------------------------------
	set_g_confDataIchizi(new Array());
	set_g_objCharaConfIchizi(new CCharaConfIchizi(g_confDataIchizi));
	g_objCharaConfIchizi.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_ICHIZI"), false);

	//--------------------------------
	// 二次職支援設定欄の初期化
	//--------------------------------
	set_g_confDataNizi(new Array());
	set_g_objCharaConfNizi(new CCharaConfNizi(g_confDataNizi));
	g_objCharaConfNizi.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_NIZI"), false);

	//--------------------------------
	// 三次職支援設定欄の初期化
	//--------------------------------
	set_g_confDataSanzi(new Array());
	set_g_objCharaConfSanzi(new CCharaConfSanzi(g_confDataSanzi));
	g_objCharaConfSanzi.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_SANZI"), false);

	//--------------------------------
	// 四次職支援設定欄の初期化
	//--------------------------------
	set_g_confDataYozi(new Array());
	set_g_objCharaConfYozi(new CCharaConfYozi(g_confDataYozi));
	g_objCharaConfYozi.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_YOZI"), false);

	//--------------------------------
	// デバフ設定欄の初期化
	//--------------------------------
	set_g_confDataDebuff(new Array());
	set_g_objCharaConfDebuff(new CCharaConfDebuff(g_confDataDebuff));
	g_objCharaConfDebuff.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_DEBUFF"), false);

	document.calcForm.A4_SKILLSW.checked = 0;

	// オートスペル設定欄
	objInput = document.getElementById("OBJID_EXTRACT_SETTING_AUTO_SPELL");
	if (objInput) {
		objInput.checked = 0;
	}

	document.calcForm.A7_SKILLSW.checked = 0;
	document.calcForm.A8_SKILLSW.checked = 0;


	//--------------------------------
	// 時限効果欄の初期化
	//--------------------------------
	CTimeItemAreaComponentManager.CloseArea();


	//--------------------------------
	// 攻撃方法欄の初期化
	//--------------------------------
	CAttackMethodAreaComponentManager.RebuildControls();


	//--------------------------------
	// 戦闘クイック調整欄の初期化
	//--------------------------------
	CBattleQuickControlAreaComponentManager.CloseArea();


	//--------------------------------
	// 性能カスタマイズ欄の初期化
	//--------------------------------
	set_g_confDataCustomStatus(new Array());
	set_g_objCharaConfCustomStatus(new CCharaConfCustomStatus(g_confDataCustomStatus));
	g_objCharaConfCustomStatus.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_CUSTOM_STATUS"), false);

	set_g_confDataCustomAtk(new Array());
	set_g_objCharaConfCustomAtk(new CCharaConfCustomAtk(g_confDataCustomAtk));
	g_objCharaConfCustomAtk.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_CUSTOM_ATK"), false);

	set_g_confDataCustomDef(new Array());
	set_g_objCharaConfCustomDef(new CCharaConfCustomDef(g_confDataCustomDef));
	g_objCharaConfCustomDef.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_CUSTOM_DEF"), false);

	set_g_confDataCustomSkill(new Array());
	set_g_objCharaConfCustomSkill(new CCharaConfCustomSkill(g_confDataCustomSkill));
	g_objCharaConfCustomSkill.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_CUSTOM_SKILL"), false);

	set_g_confDataCustomSpecStatus(new Array());
	set_g_objCharaConfCustomSpecStatus(new CCharaConfCustomSpecStatus(g_confDataCustomSpecStatus));
	g_objCharaConfCustomSpecStatus.BuildUpSelectArea(document.getElementById("OBJID_TD_CHARA_CONF_CUSTOM_SPECSTATUS"), false);


//	document.calcForm.B_IJYOUSW.checked = 0;
	BuildUpMobConfDebufSelectArea(document.getElementById("OBJID_TD_MOB_CONF_DEBUF"), false);
	RefreshMobConfDebufSelectAreaHeader();

//	document.calcForm.B_KYOUKASW.checked = 0;
	BuildUpMobConfBufSelectArea(document.getElementById("OBJID_TD_MOB_CONF_BUF"), false);
	RefreshMobConfBufSelectAreaHeader();

//	document.calcForm.B_TAISEISW.checked = 0;
	BuildUpMobConfPlayerSelectArea(document.getElementById("OBJID_TD_MOB_CONF_PLAYER"), false);
	RefreshMobConfPlayerSelectAreaHeader();
	RefreshMobConfPlayerControlCSS();

//	document.calcForm.B_MAKESW.checked = 0;
/*
	BuildUpMobConfInputSelectArea(document.getElementById("OBJID_TD_MOB_CONF_INPUT"), false);
	RefreshMobConfInputSelectAreaHeader();
	RefreshMobConfInputControlCSS();
*/


	OnClickQuickControlSW();
	Click_PassSkillSW();
	OnClickSkillSWLearned();
	Click_Skill4SW();
	OnClickExtractSettingAutoSpell();

//	Click_Skill6SW();

	Click_Skill7SW();
	Click_Skill8SW();
//	Click_Skill9SW();
//	Click_Skill10SW();

//	Click_IjyouSW();
//	Click_EnemyKyoukaSW();
//	Click_EnemyTaiseiSW();
//	Click_Monster_MakeSW();

	CItemInfoManager.RebuildControls();

	BuildUpCastSimSimulateArea(document.getElementById("OBJID_TD_CASTSIM"), false);
}

__registerFootFunctions({
    Init,
    StAllCalc,
});

register('StAllCalc', StAllCalc);
