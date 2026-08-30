// === AUTO-GENERATED IMPORTS ===
import { PetIdToSetIdMap } from "../equip/itemset.dat.js";
import { notifyChanged, CalcInput } from "../runtime/calc-invalidation.js";
import { CItemInfoManager } from "../equip/CItemInfoManager.js";
import { GetFriendlityText } from "../runtime/common.js";
import { PET_OBJ } from "../equip/pet.dat.js";
import { HtmlCreateElementOption, HtmlRemoveAllChild, HtmlGetObjectValueByIdAsInteger, myInnerHtml } from "../runtime/util.js";
import { n_A_PassSkill8 } from "../skill/skillstate.js";
// === END AUTO-GENERATED IMPORTS ===
// C-6: 共有 state 追加分
import {
         n_A_JOB,
} from "../runtime/roro-state.js";

import { CAttackMethodAreaComponentManager } from "../battle/CAttackMethodAreaComponentManager.js";
import { CTimeItemAreaComponentManager } from "../equip/CTimeItemAreaComponentManager.js";
import { StAllCalc } from "../bridge/stallcalc-bridge.js";
import { RebuildStatusSelect, CalcStatusPoint } from "../chara/hmjob.js";
import { CONST_DATA_KIND_PET } from "../const/EnumConstDataKind.js";
import { FRIENDLITY_ID_AUTO, FRIENDLITY_ID_COUNT } from "../const/EnumFriendlityId.js";
import { PET_DATA_INDEX_ID, PET_DATA_INDEX_KANA, PET_DATA_INDEX_NAME } from "../const/EnumPetDataIndex.js";
"use strict"
/**
 * 画面下部の「その他の支援/設定」のバフウィンドウ構築関数群
*/

/** その他の支援/設定 ウィンドウ可視状態 */
export let n_Skill8SW = false;
export function setN_Skill8SW(v) { n_Skill8SW = v; }

/**
 * その他の支援/設定 を構築する
 */
export function Click_Skill8SW(){
	let petId = 0;
	let petDataArrayWork = null;
	let objSelect = null;
	n_Skill8SW = document.calcForm.A8_SKILLSW.checked;
	const container = document.getElementById("ID_ETC");
    if(n_Skill8SW){
		container.replaceChildren(document.getElementById("TPL_BUFF_OTHER").content.cloneNode(true));
		document.querySelector('[name="A8_SKILLSW"]')?.addEventListener('click', Click_Skill8SW);
		document.calcForm.A8_SKILLSW.checked = true;
		// ペットのセレクトボックスを構築
		// ペットのデータを複製して読み仮名ソート
		petDataArrayWork = PET_OBJ.slice();
		petDataArrayWork.sort(
			function(a, b) {
				if (a[PET_DATA_INDEX_KANA] < b[PET_DATA_INDEX_KANA]) return -1;
				if (a[PET_DATA_INDEX_KANA] > b[PET_DATA_INDEX_KANA]) return 1;
				return 0;
			}
		);
		// ペットセレクトボックスへ追加
		objSelect = document.getElementById("OBJID_SELECT_PET");
		for (let idx = 0; idx < petDataArrayWork.length; idx++) {
			petId = petDataArrayWork[idx][PET_DATA_INDEX_ID];
			HtmlCreateElementOption(PET_OBJ[petId][PET_DATA_INDEX_ID], PET_OBJ[petId][PET_DATA_INDEX_NAME], objSelect);
		}
		// 親密度セレクトボックスへ追加
		objSelect = document.getElementById("OBJID_SELECT_PET_FRIENDLITY");
		for (let idx = FRIENDLITY_ID_AUTO; idx < FRIENDLITY_ID_COUNT; idx++) {
			HtmlCreateElementOption(idx, GetFriendlityText(idx), objSelect);
		}
		let w_name = ["なし","25","50","75","100","(125)","(150)"];
		for (let i = 0; i <= 6; i++) {
            document.calcForm.A8_Skill1.options[i] = new Option(w_name[i],i);
        }
		w_name = ["なし","50","(75)","(100)"];
		for (let i = 0; i <= 3; i++) {
            document.calcForm.A8_Skill2.options[i] = new Option(w_name[i],i);
        }
		document.calcForm.A8_Skill3.options[0] = new Option("-",0);
		for (let i = 1; i <= 2; i++) {
			let wy = 50 * i;
			let wx = (100 + wy) / 100;
			document.calcForm.A8_Skill3.options[i] = new Option("+"+ wy +"%("+ wx +"倍)",i);
		}
		document.calcForm.A8_Skill7.options[0] = new Option("-",0);
		for (let i = 1; i <= 8; i++){
			let wy = 25 * i;
			let wx = (100 + wy) / 100;
			document.calcForm.A8_Skill7.options[i] = new Option(wx+"倍(+"+(25*i)+"%)",i);
		}
		document.calcForm.A8_Skill22.options[0] = new Option("ログインボーナスなし",0);
		document.calcForm.A8_Skill22.options[1] = new Option("ブロンズ(Exp+5%)",1);
		document.calcForm.A8_Skill22.options[2] = new Option("シルバー(↑＋スピードポーション)",2);
		document.calcForm.A8_Skill22.options[3] = new Option("ゴールド(↑＋Hit+10/Flee+10)",3);
		document.calcForm.A8_Skill22.options[4] = new Option("レインボー(↑＋MaxHP+20%/MaxSP+20%)",4);
		document.getElementById("EN823").textContent = "←ジョンダパスはOTPレインボーです";
		document.calcForm.A8_Skill5.options[0] = new Option("-",0);
		for (let i = 1; i <= 11; i++) {
            document.calcForm.A8_Skill5.options[i] = new Option((i+1)+"人", i);
        }
		document.calcForm.A8_Skill6.options[0] = new Option("-",0);
		for (let i = 1; i <= 20; i++) {
            document.calcForm.A8_Skill6.options[i] = new Option("+"+ (i*25) +"%", i);
        }
		document.calcForm.A8_Skill21.options[0] = new Option("-",0);
		document.calcForm.A8_Skill21.options[1] = new Option("BaseExpで受け取る", 1);
		document.calcForm.A8_Skill21.options[2] = new Option("JobExpで受け取る", 2);
		document.getElementById("OBJID_BUTTON_A8_TIMEITEM_FOCUS")?.addEventListener('click', () => CTimeItemAreaComponentManager.FocusArea(0, true));
		for (let i = 0; i <= 22; i++) {
            document.calcForm.A8_Skill12.options[i] = new Option(i + "匹", i);
        }
		document.calcForm.A8_Skill15.options[0] = new Option("-",0);
		for (let i = 1; i <= 20; i++) {
            document.calcForm.A8_Skill15.options[i] = new Option(i * 5, i);
        }
		if (41 <= n_A_JOB && n_A_JOB <= 43) {
            myInnerHtml("EN819",'<input id="OBJID_CHECK_A8_Skill19" type="checkbox" name="A8_Skill19"><label for="OBJID_CHECK_A8_Skill19"><Font size=2>暖かい風欄を他職からの武器属性付与にする<BR>　（素手Atk部分には武器属性付与が適用されない）</Font></label>',0);
        } else {
            myInnerHtml("EN819",'<input id="OBJID_CHECK_A8_Skill19" type="checkbox" name="A8_Skill19"><label for="OBJID_CHECK_A8_Skill19"><Font size=2>武器属性付与をアカデミーの看板型付与にする<BR>　（素手Atk部分にも武器属性付与が適用される）</Font></label>',0);
        }
		document.calcForm.A8_Skill0.addEventListener("change", () => { StAllCalc(); OnChangePetSelect(); });
		for (const idx of [1, 2, 3, 5, 6, 7, 12, 15, 17, 21, 22]) {
			document.calcForm["A8_Skill" + idx].addEventListener("change", () => { StAllCalc(); Click_A8(true); });
		}
		for (const idx of [4, 16, 19]) {
			document.calcForm["A8_Skill" + idx].addEventListener("click", () => { StAllCalc(); Click_A8(true); });
		}
		document.calcForm.A8_Skill13.addEventListener("click", () => {
			StAllCalc();
			Click_A8(true);
			RebuildStatusSelect();
			CalcStatusPoint(true);
		});
		document.calcForm.A8_Skill0.value = n_A_PassSkill8[0];
		document.calcForm.A8_Skill1.value = n_A_PassSkill8[1];
		document.calcForm.A8_Skill2.value = n_A_PassSkill8[2];
		document.calcForm.A8_Skill3.value = n_A_PassSkill8[3];
		document.calcForm.A8_Skill4.checked = n_A_PassSkill8[4];
		document.calcForm.A8_Skill5.value = n_A_PassSkill8[5];
		document.calcForm.A8_Skill6.value = n_A_PassSkill8[6];
		document.calcForm.A8_Skill7.value = n_A_PassSkill8[7];
		document.calcForm.A8_Skill12.value = n_A_PassSkill8[12];
		document.calcForm.A8_Skill13.checked = n_A_PassSkill8[13];
		document.calcForm.A8_Skill15.value = n_A_PassSkill8[15];
		document.calcForm.A8_Skill16.checked = n_A_PassSkill8[16];
		document.calcForm.A8_Skill17.value = n_A_PassSkill8[17];
		document.calcForm.A8_Skill19.checked = n_A_PassSkill8[19];
		document.calcForm.A8_Skill21.value = n_A_PassSkill8[21];
		document.calcForm.A8_Skill22.value = n_A_PassSkill8[22];
		// ペット説明更新
		RefreshPetExplain();
    } else {
		container.replaceChildren(document.getElementById("TPL_BUFF_OTHER_COLLAPSED").content.cloneNode(true));
		document.querySelector('[name="A8_SKILLSW"]')?.addEventListener('click', Click_Skill8SW);
		document.calcForm.A8_SKILLSW.checked = false;
    }
	Click_A8(false);
}

/**
 * その他の支援/設定 (暫定追加機能)の変更を反映する
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
export function Click_A8(recalc = false){
	if(recalc) {
        notifyChanged(CalcInput.BUFF);
    }
	let sw=0;
	for(let i = 0; i < n_A_PassSkill8.length; i++) {
		if(n_A_PassSkill8[i] != 0){
			sw = 1;
			break;
		}
	}
	if(sw == 0){
		document.getElementById('A8TD').style.backgroundColor = "#DDDDFF";
		document.getElementById("A8used").textContent = "";
	}else{
		document.getElementById('A8TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A8used","　<B>使用中</B>",0);
	}
}

/**
 * その他の支援/設定 > ペット の変更イベント.
 * 内部で Click_A8() を呼び出す
 */
export function OnChangePetSelect() {
	// ペット説明更新
	RefreshPetExplain();
	// 攻撃方法更新
	CAttackMethodAreaComponentManager.RebuildControls();
	// 共通処理へ合流
	Click_A8(true);
}

/**
 * ペットの効果説明欄を再生成する
 * @returns
 */
export function RefreshPetExplain() {
	let petId = 0;
	let objSpan = null;
	// 説明欄オブジェクトを取得
	objSpan = document.getElementById("OBJID_SPAN_PET_EXPLAIN");
	if (!objSpan) {
		return;
	}
	// 説明欄クリア
	HtmlRemoveAllChild(objSpan);
	// 選択されているペットを取得
	petId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PET", 0);
	// 説明追記
	CItemInfoManager.AppendEfficiencyInfoSub(objSpan, CONST_DATA_KIND_PET, petId, true);
	// セット情報追記
	CItemInfoManager.AppendSetInfo(objSpan, PetIdToSetIdMap[petId], true);
}
