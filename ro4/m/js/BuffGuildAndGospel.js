// === AUTO-GENERATED IMPORTS ===
import '../../../roro/m/js/skill.h.js';
import { notifyChanged, CalcInput } from './calc-invalidation.js';
import { SkillObjNew } from '../../../roro/m/js/skill.dat.js';
import { myInnerHtml } from '../../../roro/common/js/util.js';
import { n_A_PassSkill4 } from './skillstate.js';
export { n_A_PassSkill4 } from './skillstate.js';
// === END AUTO-GENERATED IMPORTS ===
import { StAllCalc } from '../../../roro/m/js/foot-bridge.js';
import { SKILL_DATA_INDEX_NAME } from '../../../roro/m/js/const/EnumSkillDataIndex.js';
"use strict"
/**
 * 画面下部の「ギルドスキル/ゴスペル/他」のバフウィンドウ構築関数群
*/

/** ギルドスキル/ゴスペル/他 ウィンドウ可視状態 */
export let n_Skill4SW = false;
export function setN_Skill4SW(v) { n_Skill4SW = v; }

/**
 * ギルドスキル/ゴスペル/他　を構築する
 */
export function Click_Skill4SW(){
	n_Skill4SW = document.calcForm.A4_SKILLSW.checked;
	const container = document.getElementById("SP_SIEN02");
	if(n_Skill4SW){
		container.replaceChildren(document.getElementById("TPL_BUFF_GUILD").content.cloneNode(true));
		document.querySelector('[name="A4_SKILLSW"]')?.addEventListener('click', Click_Skill4SW);
		document.calcForm.A4_SKILLSW.checked = true;
		// 旧 inline handler の代替: 全コントロール共通で StAllCalc → Click_A4 を発火する
		// （StAllCalc は workspace I/F として window に残る唯一の foot 関数 — Phase 4 で import 化予定）
		for (let i = 0; i <= 11; i++) {
			const wOBJ = document.calcForm["A4_Skill" + i];
			wOBJ.addEventListener(wOBJ.tagName === "SELECT" ? "change" : "click", () => { StAllCalc(); Click_A4(true); });
		}
		for (let i = 30; i <= 35; i++) {
			const wOBJ = document.calcForm["A4_Skill" + i];
			wOBJ.addEventListener("change", () => { StAllCalc(); Click_A4(true); });
		}
		for(let i = 0; i <= 5; i++){
			document.calcForm.A4_Skill1.options[i] = new Option(i,i);
			document.calcForm.A4_Skill2.options[i] = new Option(i,i);
			document.calcForm.A4_Skill3.options[i] = new Option(i,i);
			document.calcForm.A4_Skill4.options[i] = new Option(i,i);
		}
		document.calcForm.A4_Skill11.options[0] = new Option("■選択してください",0);
		document.calcForm.A4_Skill11.options[1] = new Option(SkillObjNew[439][SKILL_DATA_INDEX_NAME] +"(Int)",1);
		document.calcForm.A4_Skill11.options[2] = new Option(SkillObjNew[627][SKILL_DATA_INDEX_NAME] +"(Str&Dex&Int)",2);
		document.calcForm.A4_Skill11.options[3] = new Option(SkillObjNew[628][SKILL_DATA_INDEX_NAME] +"(Vit)",3);
		let selectBox1 = document.calcForm.A4_Skill31;
		let selectBox2 = document.calcForm.A4_Skill32;
		for(let i = 0; i <= 300; i++){
			selectBox1.options[i] = new Option(i,i);
			selectBox2.options[i] = new Option(i,i);
		}
		let selectBox3 = document.calcForm.A4_Skill30;
		let selectBox4 = document.calcForm.A4_Skill33;
		let selectBox5 = document.calcForm.A4_Skill34;
		let selectBox6 = document.calcForm.A4_Skill35;
		for(let i = 0; i <= 600; i++){
			selectBox3.options[i] = new Option(i,i);
			selectBox4.options[i] = new Option(i,i);
			selectBox5.options[i] = new Option(i,i);
			selectBox6.options[i] = new Option(i,i);
		}
		document.calcForm.A4_Skill0.checked = n_A_PassSkill4[0];
		document.calcForm.A4_Skill1.value = n_A_PassSkill4[1];
		document.calcForm.A4_Skill2.value = n_A_PassSkill4[2];
		document.calcForm.A4_Skill3.value = n_A_PassSkill4[3];
		document.calcForm.A4_Skill4.value = n_A_PassSkill4[4];
		document.calcForm.A4_Skill5.checked = n_A_PassSkill4[5];
		document.calcForm.A4_Skill6.checked = n_A_PassSkill4[6];
		document.calcForm.A4_Skill7.checked = n_A_PassSkill4[7];
		document.calcForm.A4_Skill8.checked = n_A_PassSkill4[8];
		document.calcForm.A4_Skill9.checked = n_A_PassSkill4[9];
		document.calcForm.A4_Skill10.checked = n_A_PassSkill4[10];
		document.calcForm.A4_Skill11.value = n_A_PassSkill4[11];
		document.calcForm.A4_Skill30.value = n_A_PassSkill4[30];
		document.calcForm.A4_Skill31.value = n_A_PassSkill4[31];
		document.calcForm.A4_Skill32.value = n_A_PassSkill4[32];
		document.calcForm.A4_Skill33.value = n_A_PassSkill4[33];
		document.calcForm.A4_Skill34.value = n_A_PassSkill4[34];
		document.calcForm.A4_Skill35.value = n_A_PassSkill4[35];
	} else {
		container.replaceChildren(document.getElementById("TPL_BUFF_GUILD_COLLAPSED").content.cloneNode(true));
		document.querySelector('[name="A4_SKILLSW"]')?.addEventListener('click', Click_Skill4SW);
		document.calcForm.A4_SKILLSW.checked = 0;
	}
	Click_A4(false);
}

/**
 * ギルドスキル/ゴスペル/他の変更を反映する
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
export function Click_A4(recalc = false){
	if (recalc) {
        notifyChanged(CalcInput.BUFF);
    }
	let sw=0;
	for (let i = 0; i < n_A_PassSkill4.length; i++) {
		if(n_A_PassSkill4[i] != 0){
			sw = 1;
			break;
		}
	}
	if (sw == 0) {
		document.getElementById('A4TD').style.backgroundColor = "#DDDDFF";
		document.getElementById("A4used").textContent = "";
	} else {
		document.getElementById('A4TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A4used","　<B>使用中</B>",0);
	}
}
