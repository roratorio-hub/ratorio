"use strict"
/**
 * 画面下部の「ギルドスキル/ゴスペル/他」のバフウィンドウ構築関数群
*/ 

const BUFF_CONF_GUILD_LIMIT = 36;
/** ギルドスキル/ゴスペル/他 設定値の配列 */
let n_A_PassSkill4 = Array(BUFF_CONF_GUILD_LIMIT).fill(0);
/** ギルドスキル/ゴスペル/他 ウィンドウ可視状態 */
let n_Skill4SW = false;

/**
 * ギルドスキル/ゴスペル/他　を構築する
 */
function Click_Skill4SW(){
	n_Skill4SW = document.calcForm.A4_SKILLSW.checked;
	if(n_Skill4SW){
		let str;
		str = '<TABLE Border style="white-space:nowrap;"><TR><TD id="A4TD" ColSpan="10" class="title"><input id="OBJID_CHECK_A4_SKILLSW" type="checkbox" name="A4_SKILLSW"onClick="Click_Skill4SW()"><label for="OBJID_CHECK_A4_SKILLSW">ギルドスキル/ゴスペル/他</label><span id="A4used"></span></TD></TR>';
		str += '<TR><TD ColSpan="10">ギルドスキル</TD></TR>';
		str += '<TR><TD id="EN40_1"></TD><TD id="EN40_2"></TD><TD id="EN41_1"></TD><TD id="EN41_2"></TD><TD id="EN42_1"></TD><TD id="EN42_2"></TD></TR>';
		str += '<TR><TD id="EN43_1"></TD><TD id="EN43_2"></TD><TD id="EN44_1"></TD><TD id="EN44_2"></TD></TR>';
		str += '<TR><TD ColSpan="10">ゴスペルスキル</TD></TR>';
		str += '<TR><TD id="EN45_1"></TD><TD id="EN45_2"></TD><TD id="EN46_1"></TD><TD id="EN46_2"></TD><TD id="EN47_1"></TD><TD id="EN47_2"></TD></TR>';
		str += '<TR><TD id="EN48_1"></TD><TD id="EN48_2"></TD><TD id="EN49_1"></TD><TD id="EN49_2"></TD><TD id="EN410_1"></TD><TD id="EN410_2"></TD></TR>';
		str += '<TR><TD ColSpan="10">一部スキルの持ち替え等による強化<BR><Font size=2>スキル使用時のステータスを入力してください。スキルに無関係なステータスは無視されます。<BR>スキルレベルはパッシブ/持続系欄で選択してください。</Font></TD></TR>';
		str += '<TR><TD ColSpan="10" id="EN411_2"></TD></TR>';
		str += '<TR><TD id="EN430_1"></TD><TD id="EN430_2"></TD><TD id="EN431_1"></TD><TD id="EN431_2"></TD><TD id="EN432_1"></TD><TD id="EN432_2"></TD></TR>';
		str += '<TR><TD id="EN433_1"></TD><TD id="EN433_2"></TD><TD id="EN434_1"></TD><TD id="EN434_2"></TD><TD id="EN435_1"></TD><TD id="EN435_2"></TD></TR>';
		str += '</TABLE>';
		myInnerHtml("SP_SIEN02",str,0);
		document.calcForm.A4_SKILLSW.checked = true;
		const name_CS4SW_SKILL = ["臨戦体勢","偉大なる指導力","栄光の傷","冷静な心","鋭い視線","ステータスALL+20","HP+100%","SP+100%","ATK+100%","HIT+50＆FLEE+50","被ダメージ半減"];
		let html_CS4SW_SKILL = new Array();
		for(let i = 0; i <= 10; i++) myInnerHtml("EN4"+i+"_1",name_CS4SW_SKILL[i],0);
		html_CS4SW_SKILL[0] = '<input type="checkbox" name="A4_Skill0"onClick="StAllCalc(); Click_A4(true);">';
		html_CS4SW_SKILL[1] = '<select name="A4_Skill1"onChange="StAllCalc() | Click_A4(true)"></select>';
		html_CS4SW_SKILL[2] = '<select name="A4_Skill2"onChange="StAllCalc() | Click_A4(true)"></select>';
		html_CS4SW_SKILL[3] = '<select name="A4_Skill3"onChange="StAllCalc() | Click_A4(true)"></select>';
		html_CS4SW_SKILL[4] = '<select name="A4_Skill4"onChange="StAllCalc() | Click_A4(true)"></select>';
		html_CS4SW_SKILL[5] = '<input type="checkbox" name="A4_Skill5"onClick="StAllCalc() | Click_A4(true)">';
		html_CS4SW_SKILL[6] = '<input type="checkbox" name="A4_Skill6"onClick="StAllCalc() | Click_A4(true)">';
		html_CS4SW_SKILL[7] = '<input type="checkbox" name="A4_Skill7"onClick="StAllCalc() | Click_A4(true)">';
		html_CS4SW_SKILL[8] = '<input type="checkbox" name="A4_Skill8"onClick="StAllCalc() | Click_A4(true)">';
		html_CS4SW_SKILL[9] = '<input type="checkbox" name="A4_Skill9"onClick="StAllCalc() | Click_A4(true)">';
		html_CS4SW_SKILL[10] = '<input type="checkbox" name="A4_Skill10"onClick="StAllCalc() | Click_A4(true)">';
		html_CS4SW_SKILL[11] = '<select name="A4_Skill11"onChange="StAllCalc(); Click_A4(true);"></select>';
		for(let i = 0; i <= 11; i++) myInnerHtml("EN4"+i+"_2",html_CS4SW_SKILL[i],0);
		myInnerHtml("EN430_1","STR",0);
		myInnerHtml("EN431_1","AGI",0);
		myInnerHtml("EN432_1","VIT",0);
		myInnerHtml("EN433_1","INT",0);
		myInnerHtml("EN434_1","DEX",0);
		myInnerHtml("EN435_1","LUK",0);
		html_CS4SW_SKILL[30] = '<select name="A4_Skill30"onChange="StAllCalc(); Click_A4(true);"></select>';
		html_CS4SW_SKILL[31] = '<select name="A4_Skill31"onChange="StAllCalc(); Click_A4(true);"></select>';
		html_CS4SW_SKILL[32] = '<select name="A4_Skill32"onChange="StAllCalc(); Click_A4(true);"></select>';
		html_CS4SW_SKILL[33] = '<select name="A4_Skill33"onChange="StAllCalc(); Click_A4(true);"></select>';
		html_CS4SW_SKILL[34] = '<select name="A4_Skill34"onChange="StAllCalc(); Click_A4(true);"></select>';
		html_CS4SW_SKILL[35] = '<select name="A4_Skill35"onChange="StAllCalc(); Click_A4(true);"></select>';
		for(let i = 30; i <= 35; i++) myInnerHtml("EN4"+i+"_2",html_CS4SW_SKILL[i],0);
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
		let str;
		str = '<TABLE Border><TR><TD id="A4TD" class="title"><input id="OBJID_CHECK_A4_SKILLSW" type="checkbox" name="A4_SKILLSW"onClick="Click_Skill4SW()"><label for="OBJID_CHECK_A4_SKILLSW">ギルドスキル/ゴスペル/他</label><span id="A4used"></span></TD></TR></TABLE>';
		myInnerHtml("SP_SIEN02",str,0);
		document.calcForm.A4_SKILLSW.checked = 0;
	}
	Click_A4(false);
}

/**
 * ギルドスキル/ゴスペル/他の変更を反映する
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
function Click_A4(recalc = false){
	if (recalc) {
        AutoCalc("Click_A4");
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
		myInnerHtml("A4used","",0);
	} else {
		document.getElementById('A4TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A4used","　<B>使用中</B>",0);
	}
}
