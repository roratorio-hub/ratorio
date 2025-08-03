"use strict"
/**
 * 画面下部の「演奏/踊り系スキル」のバフウィンドウ構築関数群
*/ 

/** 演奏・踊り系スキル ウィンドウ可視状態 */
let n_Skill3SW = false;
/** 演奏・踊り系スキル スイッチ状態配列 */
let SWs3sw = [0,0,0,0,0,0,0,0,0,0,0,0];
/** 演奏・踊り系スキル 設定値 */
let n_A_PassSkill3 = Array(47).fill(0);

/**
 * 演奏・踊り系スキル を構築する
 */
function Click_Skill3SW(){
	n_Skill3SW = document.calcForm.A3_SKILLSW.checked;
	const table_header = `
			<TABLE Border class="tooltip-target" style="white-space:nowrap;" data-tooltip="これらの設定は「◯次職支援設定」および「プレイヤー状態異常設定」へ順次移動します。">
			<TR><TD id="A3TD" ColSpan="6" class="title">
				<input id="OBJID_CHECK_A3_SKILLSW" type="checkbox" name="A3_SKILLSW" onClick="Click_Skill3SW()">
				<label for="OBJID_CHECK_A3_SKILLSW">演奏/踊り系スキル</label>
				<span id="A3used"></span>
			</TD></TR>
			`;
	if (n_Skill3SW) {
		let str = `${table_header}
			<TR><TD id="EN0_1"></TD><TD id="EN0_2"></TD><TD id="EN0_3"></TD><TD id="EN0_4"></TD><TD id="EN0_5"></TD><TD id="EN0_6"></TD></TR>
			<TR><TD id="EN1_1"></TD><TD id="EN1_2"></TD><TD id="EN1_3"></TD><TD id="EN1_4"></TD><TD id="EN1_5"></TD><TD id="EN1_6"></TD></TR>
			<TR><TD RowSpan=2 id="EN2_1"></TD><TD RowSpan=2 id="EN2_2"></TD><TD id="EN2_3"></TD><TD id="EN2_4"></TD><TD RowSpan="2" id="EN2_7"></TD><TD RowSpan="2" id="EN2_8"></TD></TR>
			<TR><TD id="EN2_5"></TD><TD id="EN2_6"></TD></TR>
			<TR><TD id="EN3_1"></TD><TD id="EN3_2"></TD><TD id="EN3_3"></TD><TD id="EN3_4"></TD><TD id="EN3_5"></TD><TD id="EN3_6"></TD></TR>
			<TR><TD id="EN4_1"></TD><TD id="EN4_2"></TD><TD id="EN4_3"></TD><TD id="EN4_4"></TD><TD id="EN4_5"></TD><TD id="EN4_6"></TD></TR>
			<TR><TD id="EN5_1"></TD><TD id="EN5_2"></TD><TD id="EN5_3"></TD><TD id="EN5_4"></TD><TD id="EN5_5"></TD><TD id="EN5_6"></TD></TR>
			<TR><TD id="EN6_1"></TD><TD id="EN6_2"></TD><TD id="EN6_3"></TD><TD id="EN6_4"></TD><TD id="EN6_5"></TD><TD id="EN6_6"></TD></TR>
			<TR><TD id="EN7_1"></TD><TD id="EN7_2"></TD><TD id="EN8_1"></TD><TD id="EN8_2"></TD></TR>
			<TR><TD id="EN9_1"></TD><TD id="EN9_2"></TD><TD id="EN10_1"></TD><TD id="EN10_2"></TD></TR>
			<TR><TD id="EN12_1"></TD><TD id="EN12_2"></TD><TD id="EN12_3"></TD><TD id="EN12_4"></TD><TD id="EN12_5"></TD><TD id="EN12_6"></TD></TR>
			<TR><TD id="EN13_1"></TD><TD id="EN13_2"></TD><TD id="EN13_3"></TD><TD id="EN13_4"></TD></TR>
			<TR><TD id="EN20_1"></TD><TD id="EN20_2"></TD><TD id="EN21_1"></TD><TD id="EN21_2"></TD></TR>
			<TR><TD colspan=4><span id="EN11_1"></span><span id="EN11_2"></span><span id="EN11_1a"></span></TD></TR></TABLE>
			`;
		myInnerHtml("SP_SIEN01", str, 0);
		document.calcForm.A3_SKILLSW.checked = true;
		const name_CS3SW_SKILL = [
			"(廃止)口笛",
			"(廃止)夕陽のアサシンクロス",
			"(廃止)ブラギの詩",
			"(廃止)イドゥンの林檎",
			"(廃止)ハミング",
			"(廃止)幸運のキス",
			"(廃止)サービスフォーユー",
			"(廃止)不死身ジークフリード",
			"ニヨルドの宴",
			"(廃止)戦太鼓の響き",
			"(廃止)ニーベルングの指輪"
			];
		let html_CS3SW_SKILL = new Array();
		for (let i = 0; i <= 10; i++) {
                myInnerHtml(`EN${i}_1`, name_CS3SW_SKILL[i], 0);
           }
		html_CS3SW_SKILL[0] = '<select name="A3_Skill0_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[1] = '<select name="A3_Skill1_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[2] = '<select name="A3_Skill2_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[3] = '<select name="A3_Skill3_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[4] = '<select name="A3_Skill4_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[5] = '<select name="A3_Skill5_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[6] = '<select name="A3_Skill6_1"onChange="Skill3SW_2(true)"></select>';
		html_CS3SW_SKILL[7] = '<select name="A3_Skill7"onChange="Click_A3(true)"></select>';
		html_CS3SW_SKILL[8] = '<select name="A3_Skill8"onChange="Click_A3(true)"></select>';
		html_CS3SW_SKILL[9] = '<select name="A3_Skill9"onChange="Click_A3(true)"></select>';
		html_CS3SW_SKILL[10] = '<select name="A3_Skill10"onChange="Click_A3(true)"></select>';
		for (let i = 0; i <= 10; i++) {
                myInnerHtml(`EN${i}_2`, html_CS3SW_SKILL[i], 0);
           }
		// フリッグの歌は仕様変更により、三次職支援へ移動
		const uta_name = [
			"◆三次職歌スキル off",
			"(廃止)風車に向かって突撃",
			"(廃止)エコーの歌",
			"(廃止)ハーモナイズ",
			"(廃止)スイングダンス",
			"(廃止)恋人たちの為のシンフォニー",
			"(廃止)月明かりのセレナーデ"
			];
		myInnerHtml("EN12_1",'<select name="A3_Skill12_0"onChange="Skill3SW_2(true)"></select>',0);
		for (let i = 0; i < uta_name.length; i++) {
				document.calcForm.A3_Skill12_0.options[i] = new Option(uta_name[i], i);
		}
		const gassou_name = [
			"◆三次職合奏スキル off",
			"(廃止)フライデーナイトフィーバー",
			"(廃止)エンドレスハミングボイス",
			"(廃止)レーラズの霧",
			"(廃止)ﾋﾞﾖﾝﾄﾞｵﾌﾞｳｫｰｸﾗｲ(敵から)",
			"(廃止)ﾒﾛﾃﾞｨｰｵﾌﾞｼﾝｸ(敵から)",
			"(廃止)ﾀﾞﾝｽｳｨｽﾞｳｫｰｸﾞ(ﾚﾝｼﾞｬｰ有)",
			"(廃止)ﾀﾞﾝｽｳｨｽﾞｳｫｰｸﾞ(ﾚﾝｼﾞｬｰ無)"
			];
		myInnerHtml("EN13_1",'<select name="A3_Skill13_0"onChange="Skill3SW_2(true)"></select>',0);
		for (let i = 0; i <= 7; i++) {
                document.calcForm.A3_Skill13_0.options[i] = new Option(gassou_name[i],i);
           }
		myInnerHtml("EN20_1","<Font size=2>(廃止)メランコリーLv<BR>(こちらの欄はFleeとASPD低下用)</Font>", 0);
		myInnerHtml("EN20_2",'<select name="A3_Skill20" onChange="Skill3SW_2(true)"></select>', 0);
		for (let i = 0; i <= 5; i++) {
                document.calcForm.A3_Skill20.options[i] = new Option(i,i);
           }
		myInnerHtml("EN21_1","<Font size=2>(廃止)メランコリーでの威力増加(15%は確殺用<BR>55%か60%がLv5+レッスン10の期待値位)</Font>",0);
		myInnerHtml("EN21_2",'<select name="A3_Skill42" onChange="Skill3SW_2(true)"></select>',0);
		document.calcForm.A3_Skill42.options[0] = new Option("off",0);
		for (let i = 3; i <= 20; i++) {
                document.calcForm.A3_Skill42.options[i-2] = new Option(`+${i * 5}%`, i);
           }
		myInnerHtml("EN11_1","マリオネットコントロール",0);
		myInnerHtml("EN11_2", "<br>術者のステ："+ '<select name="A3_Skill11_STR"onChange="Click_A3(true)"></select>'+ '<select name="A3_Skill11_AGI"onChange="Click_A3(true)"></select>'+ '<select name="A3_Skill11_VIT"onChange="Click_A3(true)"></select>'+ '<select name="A3_Skill11_INT"onChange="Click_A3(true)"></select>'+ '<select name="A3_Skill11_DEX"onChange="Click_A3(true)"></select>'+ '<select name="A3_Skill11_LUK"onChange="Click_A3(true)"></select>'+ "<BR>"+'<input id="OBJID_CHECK_A3_Skill11a" type="checkbox" name="A3_Skill11a"onClick="Click_A3(true)">'+'<Font size=2><label for="OBJID_CHECK_A3_Skill11a">ステータスをそのまま補正に＋する(憑神や装備解除調整用/人力計算)</label></Font>',0);
		// エレメント毎に 130 回の DOM 評価が発生すると重さが実感できてしまうので一旦取り出しています
		let selectBoxStr = document.calcForm.A3_Skill11_STR;
		let selectBoxAgi = document.calcForm.A3_Skill11_AGI;
		let selectBoxVit = document.calcForm.A3_Skill11_VIT;
		let selectBoxInt = document.calcForm.A3_Skill11_INT;
		let selectBoxDex = document.calcForm.A3_Skill11_DEX;
		let selectBoxLuk = document.calcForm.A3_Skill11_LUK;
		selectBoxStr.options[0] = new Option("STR",0);
		selectBoxAgi.options[0] = new Option("AGI",0);
		selectBoxVit.options[0] = new Option("VIT",0);
		selectBoxInt.options[0] = new Option("INT",0);
		selectBoxDex.options[0] = new Option("DEX",0);
		selectBoxLuk.options[0] = new Option("LUK",0);
		for (let i = 1; i <= 130; i++) {
				selectBoxStr.options[i] = new Option(i,i);
				selectBoxAgi.options[i] = new Option(i,i);
				selectBoxVit.options[i] = new Option(i,i);
				selectBoxInt.options[i] = new Option(i,i);
				selectBoxDex.options[i] = new Option(i,i);
				selectBoxLuk.options[i] = new Option(i,i);
		}
		selectBoxStr.value = n_A_PassSkill3[12];
		selectBoxAgi.value = n_A_PassSkill3[13];
		selectBoxVit.value = n_A_PassSkill3[14];
		selectBoxInt.value = n_A_PassSkill3[15];
		selectBoxDex.value = n_A_PassSkill3[16];
		selectBoxLuk.value = n_A_PassSkill3[17];
		document.calcForm.A3_Skill11a.checked = n_A_PassSkill3[18];
		for (let i = 0; i <= 10; i++) {
				document.calcForm.A3_Skill0_1.options[i] = new Option(i,i);
				document.calcForm.A3_Skill1_1.options[i] = new Option(i,i);
				document.calcForm.A3_Skill2_1.options[i] = new Option(i,i);
				document.calcForm.A3_Skill3_1.options[i] = new Option(i,i);
				document.calcForm.A3_Skill4_1.options[i] = new Option(i,i);
				document.calcForm.A3_Skill5_1.options[i] = new Option(i,i);
				document.calcForm.A3_Skill6_1.options[i] = new Option(i,i);
		}
		for (let i = 0; i <= 5; i++) {
				document.calcForm.A3_Skill7.options[i] = new Option(i,i);
				document.calcForm.A3_Skill8.options[i] = new Option(i,i);
				document.calcForm.A3_Skill9.options[i] = new Option(i,i);
				document.calcForm.A3_Skill10.options[i] = new Option(i,i);
		}
		document.calcForm.A3_Skill0_1.value = n_A_PassSkill3[0];
		document.calcForm.A3_Skill1_1.value = n_A_PassSkill3[1];
		document.calcForm.A3_Skill2_1.value = n_A_PassSkill3[2];
		document.calcForm.A3_Skill3_1.value = n_A_PassSkill3[3];
		document.calcForm.A3_Skill4_1.value = n_A_PassSkill3[4];
		document.calcForm.A3_Skill5_1.value = n_A_PassSkill3[5];
		document.calcForm.A3_Skill6_1.value = n_A_PassSkill3[6];
		document.calcForm.A3_Skill7.value = n_A_PassSkill3[7];
		document.calcForm.A3_Skill8.value = n_A_PassSkill3[8];
		document.calcForm.A3_Skill9.value = n_A_PassSkill3[9];
		document.calcForm.A3_Skill10.value = n_A_PassSkill3[10];
		document.calcForm.A3_Skill12_0.value = n_A_PassSkill3[19];
		document.calcForm.A3_Skill13_0.value = n_A_PassSkill3[39];
		document.calcForm.A3_Skill20.value = n_A_PassSkill3[11];
		document.calcForm.A3_Skill42.value = n_A_PassSkill3[42];
		Skill3SW_2(false);
	} else {
		let str;
		str = `
			<TABLE Border>
			<TR><TD id="A3TD" class="title">
				<input id="OBJID_CHECK_A3_SKILLSW" type="checkbox" name="A3_SKILLSW" onClick="Click_Skill3SW()">
				<label for="OBJID_CHECK_A3_SKILLSW">演奏/踊り系スキル</label>
				<span id="A3used"></span>
			</TD></TR>
			</TABLE>
			`;
		myInnerHtml("SP_SIEN01",str,0);
		document.calcForm.A3_SKILLSW.checked = false;
		for (let i = 0; i <= 11; i++) {
               SWs3sw[i]=0;
           }
		Click_A3(false);
	}
}

/**
 * 演奏/踊り系スキルの変更を変数に反映する.
 * 変数変更後の再計算は内部で呼び出すClick_A3に任せている.
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
function Skill3SW_2(recalc = false){
	n_A_PassSkill3[0] =  Number(document.calcForm.A3_Skill0_1.value);
	n_A_PassSkill3[1] =  Number(document.calcForm.A3_Skill1_1.value);
	n_A_PassSkill3[2] =  Number(document.calcForm.A3_Skill2_1.value);
	n_A_PassSkill3[3] =  Number(document.calcForm.A3_Skill3_1.value);
	n_A_PassSkill3[4] =  Number(document.calcForm.A3_Skill4_1.value);
	n_A_PassSkill3[5] =  Number(document.calcForm.A3_Skill5_1.value);
	n_A_PassSkill3[6] =  Number(document.calcForm.A3_Skill6_1.value);
	n_A_PassSkill3[19] = Number(document.calcForm.A3_Skill12_0.value);
	n_A_PassSkill3[39] = Number(document.calcForm.A3_Skill13_0.value);
	if (n_A_PassSkill3[0] !== 0) {
		if (SWs3sw[0] === 0) {
			if (n_A_PassSkill3[30] === 0) {
                n_A_PassSkill3[30] = 10;
            }
			myInnerHtml("EN0_3","バードのAGI<BR>バードのLUK",0);
			myInnerHtml("EN0_4",'<select name="A3_Skill0_2"onChange="Click_A3(true)"></select><BR><select name="A3_Skill0_4"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN0_5","楽器の練習",0);
			myInnerHtml("EN0_6",'<select name="A3_Skill0_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill0_2;
			let selectBox2 = document.calcForm.A3_Skill0_3;
			let selectBox3 = document.calcForm.A3_Skill0_4;
			for (let i = 0; i <= 40; i++) {
                selectBox1.options[i] = new Option(`${i * 15}～${i * 15 + 14}`, i);
            }
			for (let i = 1; i <= 10; i++) {
                selectBox2.options[i - 1] = new Option(i,i);
            }
			for (let i = 0; i <= 20; i++) {
                selectBox3.options[i] = new Option(`${i * 30}～${i * 30 + 29}`, i);
            }
			SWs3sw[0] = 1;
			selectBox1.value = n_A_PassSkill3[20];
			selectBox2.value = n_A_PassSkill3[30];
			selectBox3.value = n_A_PassSkill3[28];
		}
	} else {
		SWs3sw[0] = 0;
		if (n_A_PassSkill3[30] === 10) {
               n_A_PassSkill3[30] = 0;
        }
		myInnerHtml("EN0_3","-",0);
		myInnerHtml("EN0_4","-",0);
		myInnerHtml("EN0_5","",0);
		myInnerHtml("EN0_6","",0);
	}
	if (n_A_PassSkill3[1] !== 0) {
		if (SWs3sw[1] === 0) {
			if (n_A_PassSkill3[31] === 0) {
                   n_A_PassSkill3[31] = 10;
            }
			myInnerHtml("EN1_3","バードのAGI",0);
			myInnerHtml("EN1_4",'<select name="A3_Skill1_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN1_5","楽器の練習",0);
			myInnerHtml("EN1_6",'<select name="A3_Skill1_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill1_2;
			let selectBox2 = document.calcForm.A3_Skill1_3;				
			for (let i = 0; i <= 30; i++) {
                selectBox1.options[i] = new Option(`${i * 20}～${i * 20 + 19}`, i);
            }
			for (let i = 1; i <= 10; i++) {
                selectBox2.options[i-1] = new Option(i, i);
            }
			SWs3sw[1] = 1;
			selectBox1.value = n_A_PassSkill3[21];
			selectBox2.value = n_A_PassSkill3[31];
		}
	} else {
		SWs3sw[1] = 0;
		if (n_A_PassSkill3[31] === 10) {
               n_A_PassSkill3[31] = 0;
           }
		myInnerHtml("EN1_3","-",0);
		myInnerHtml("EN1_4","-",0);
		myInnerHtml("EN1_5","",0);
		myInnerHtml("EN1_6","",0);
	}
	if (n_A_PassSkill3[2] !== 0) {
		if(SWs3sw[2] === 0) {
			if (n_A_PassSkill3[32] === 0) {
                n_A_PassSkill3[32] = 10;
            }
			myInnerHtml("EN2_3","バードのDEX",0);
			myInnerHtml("EN2_4",'<select name="A3_Skill2_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN2_5","バードのINT",0);
			myInnerHtml("EN2_6",'<select name="A3_Skill2_3"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN2_7","楽器の練習",0);
			myInnerHtml("EN2_8",'<select name="A3_Skill2_4"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill2_2;
			let selectBox2 = document.calcForm.A3_Skill2_3;
			let selectBox3 = document.calcForm.A3_Skill2_4;
			for (let i = 0; i <= 60; i++) {
                selectBox1.options[i] = new Option(`${i * 10}～${i * 10 + 9}`, i);
            }
			for (let i = 0; i <= 90; i++) {
                selectBox2.options[i] = new Option(`${i * 5}～${i * 5 + 4}`, i);
			}
			for (let i = 1; i <= 10; i++) {
                selectBox3.options[i - 1] = new Option(i,i);
            }
			SWs3sw[2] = 1;
			selectBox1.value = n_A_PassSkill3[22];
			selectBox2.value = n_A_PassSkill3[29];
			selectBox3.value = n_A_PassSkill3[32];
		}
	}else{
		SWs3sw[2] = 0;
		if (n_A_PassSkill3[32] === 10) {
               n_A_PassSkill3[32] = 0;
           }
		myInnerHtml("EN2_3","-",0);
		myInnerHtml("EN2_4","-",0);
		myInnerHtml("EN2_5","",0);
		myInnerHtml("EN2_6","",0);
		myInnerHtml("EN2_7","",0);
		myInnerHtml("EN2_8","",0);
	}
	if (n_A_PassSkill3[3] !== 0) {
		if (SWs3sw[3] === 0) {
			if (n_A_PassSkill3[33] == 0) {
                n_A_PassSkill3[33] = 10;
            }
			myInnerHtml("EN3_3","バードのVIT",0);
			myInnerHtml("EN3_4",'<select name="A3_Skill3_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN3_5","楽器の練習",0);
			myInnerHtml("EN3_6",'<select name="A3_Skill3_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill3_2;
			let selectBox2 = document.calcForm.A3_Skill3_3;
			for (let i = 0; i <= 60; i++) {
                selectBox1.options[i] = new Option(`${i * 10}～${i * 10 + 9}`, i);
            }
			for (let i = 1; i <= 10; i++) {
                selectBox2.options[i-1] = new Option(i,i);
            }
			SWs3sw[3] = 1;
			selectBox1.value = n_A_PassSkill3[23];
			selectBox2.value = n_A_PassSkill3[33];
		}
	} else {
		SWs3sw[3] = 0;
		if(n_A_PassSkill3[33]==10) n_A_PassSkill3[33] = 0;
		myInnerHtml("EN3_3","-",0);
		myInnerHtml("EN3_4","-",0);
		myInnerHtml("EN3_5","",0);
		myInnerHtml("EN3_6","",0);
	}
	if (n_A_PassSkill3[4] !== 0) {
		if (SWs3sw[4] === 0) {
			if (n_A_PassSkill3[34] === 0) {
                n_A_PassSkill3[34] = 10;
            }
			myInnerHtml("EN4_3","ダンサーのDEX",0);
			myInnerHtml("EN4_4",'<select name="A3_Skill4_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN4_5","ダンスの練習",0);
			myInnerHtml("EN4_6",'<select name="A3_Skill4_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill4_2;
			let selectBox2 = document.calcForm.A3_Skill4_3;
			for (let i = 0; i <= 40; i++) {
                selectBox1.options[i] = new Option(`${i * 15}～${i * 15 + 14}`,i);
            }
			for (let i = 1; i <= 10; i++) {
                selectBox2.options[i-1] = new Option(i,i);
            }
			SWs3sw[4] = 1;
			selectBox1.value = n_A_PassSkill3[24];
			selectBox2.value = n_A_PassSkill3[34];
		}
	} else {
		SWs3sw[4] = 0;
		if (n_A_PassSkill3[34] === 10) {
            n_A_PassSkill3[34] = 0;
        }
		myInnerHtml("EN4_3","-",0);
		myInnerHtml("EN4_4","-",0);
		myInnerHtml("EN4_5","",0);
		myInnerHtml("EN4_6","",0);
	}
	if (n_A_PassSkill3[5] !== 0) {
		if (SWs3sw[5] === 0) {
			if (n_A_PassSkill3[35] === 0) {
                n_A_PassSkill3[35] = 10;
            }
			myInnerHtml("EN5_3","ダンサーのLUK",0);
			myInnerHtml("EN5_4",'<select name="A3_Skill5_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN5_5","ダンスの練習",0);
			myInnerHtml("EN5_6",'<select name="A3_Skill5_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill5_2;
			let selectBox2 = document.calcForm.A3_Skill5_3;
			for (let i = 0; i <= 60; i++) {
                selectBox1.options[i] = new Option(`${i * 10}～${i * 10 + 9}`, i);
            }
			for (let i = 1; i <= 10; i++) {
                selectBox2.options[i-1] = new Option(i,i);
            }
			SWs3sw[5] = 1;
			selectBox1.value = n_A_PassSkill3[25];
			selectBox2.value = n_A_PassSkill3[35];
		}
	} else {
		SWs3sw[5] = 0;
		if (n_A_PassSkill3[35] === 10) {
            n_A_PassSkill3[35] = 0;
        }
		myInnerHtml("EN5_3","-",0);
		myInnerHtml("EN5_4","-",0);
		myInnerHtml("EN5_5","",0);
		myInnerHtml("EN5_6","",0);
	}
	if (n_A_PassSkill3[6] !== 0) {
		if (SWs3sw[6] === 0) {
			if (n_A_PassSkill3[36] === 0) {
                n_A_PassSkill3[36] = 10;
            }
			myInnerHtml("EN6_3","ダンサーのINT",0);
			myInnerHtml("EN6_4",'<select name="A3_Skill6_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN6_5","ダンスの練習",0);
			myInnerHtml("EN6_6",'<select name="A3_Skill6_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill6_2;
			let selectBox2 = document.calcForm.A3_Skill6_3;
			for (let i = 0; i <= 60; i++) {
                selectBox1.options[i] = new Option(`${i * 10}～${i * 10 + 9}`, i);
            }
			for (let i = 1; i <= 10; i++) {
                selectBox2.options[i-1] = new Option(i,i);
            }
			SWs3sw[6] = 1;
			selectBox1.value = n_A_PassSkill3[26];
			selectBox2.value = n_A_PassSkill3[36];
		}
	} else {
		SWs3sw[6] = 0;
		if (n_A_PassSkill3[36] === 10) {
            n_A_PassSkill3[36] = 0;
        }
		myInnerHtml("EN6_3","-",0);
		myInnerHtml("EN6_4","-",0);
		myInnerHtml("EN6_5","",0);
		myInnerHtml("EN6_6","",0);
	}
	if (n_A_PassSkill3[19] !== 0) {
		if(SWs3sw[7] !== 2) {
			if (n_A_PassSkill3[46] === 0) {
				n_A_PassSkill3[37] = 5;
				n_A_PassSkill3[46] = 60;
				n_A_PassSkill3[38] = 10;
			}
			myInnerHtml("EN12_2",'<select name="A3_Skill12_1"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN12_3","ミン/ワンのJobLv",0);
			myInnerHtml("EN12_4",'<select name="A3_Skill12_2"onChange="Click_A3(true)"></select>',0);
			myInnerHtml("EN12_5","レッスン",0);
			myInnerHtml("EN12_6",'<select name="A3_Skill12_3"onChange="Click_A3(true)"></select>',0);
			let selectBox1 = document.calcForm.A3_Skill12_1;
			let selectBox2 = document.calcForm.A3_Skill12_2;
			let selectBox3 = document.calcForm.A3_Skill12_3;
			for (let i = 1; i <= 5; i++) {
                selectBox1.options[i-1] = new Option(i,i);
            }
			for (let i = 1; i <= 60; i++) {
                selectBox2.options[i-1] = new Option(i,i);
            }
			for (let i = 0; i <= 10; i++) {
                selectBox3.options[i] = new Option(i,i);
            }
			if (n_A_PassSkill3[37] > 5) {
                n_A_PassSkill3[37] = 5;
            }
			selectBox1.value = n_A_PassSkill3[37];
			selectBox2.value = n_A_PassSkill3[46];
			selectBox3.value = n_A_PassSkill3[38];
			SWs3sw[7] = 2;
		}
	} else {
		SWs3sw[7] = 0;
		n_A_PassSkill3[37] = 0;
		n_A_PassSkill3[46] = 0;
		n_A_PassSkill3[38] = 0;
		myInnerHtml("EN12_2","",0);
		myInnerHtml("EN12_3","<Font size=2>←風車などクリックで選択可</Font>",0);
		myInnerHtml("EN12_4","",0);
		myInnerHtml("EN12_5","",0);
		myInnerHtml("EN12_6","",0);
	}
	if (n_A_PassSkill3[39] !== 0) {
		if (SWs3sw[8] === 0) {
			if (n_A_PassSkill3[41] === 0) {
				n_A_PassSkill3[40] = 5;
				n_A_PassSkill3[41] = 2;
			}
			myInnerHtml("EN13_2",'<select name="A3_Skill13_1"onChange="Click_A3(true)"></select>',0);
			for (let i = 1; i <= 5; i++) {
                document.calcForm.A3_Skill13_1.options[i-1] = new Option(i,i);
            }
			document.calcForm.A3_Skill13_1.value = n_A_PassSkill3[40];
			if (n_A_PassSkill3[39] !== 1) {
				myInnerHtml("EN13_3","ミン/ワンの人数",0);
				myInnerHtml("EN13_4",'<select name="A3_Skill13_2"onChange="Click_A3(true)"></select>',0);
				for (let i = 2; i <= 12; i++) {
                    document.calcForm.A3_Skill13_2.options[i-2] = new Option(i,i);
                }
				if (n_A_PassSkill3[41] < 2) {
                    n_A_PassSkill3[41] = 2;
                }
				document.calcForm.A3_Skill13_2.value = n_A_PassSkill3[41];
			} else {
				myInnerHtml("EN13_3","ATK増加のタイプ(検証用)",0);
				myInnerHtml("EN13_4",'<select name="A3_Skill13_2"onChange="Click_A3(true)"></select>',0);
				document.calcForm.A3_Skill13_2.options[0] = new Option("アンドレC型(ほぼ確定)",3);
				document.calcForm.A3_Skill13_2.options[1] = new Option("アンドレC型(ほぼ確定)",1);
				document.calcForm.A3_Skill13_2.options[2] = new Option("アンドレC型(ほぼ確定)",2);
				document.calcForm.A3_Skill13_2.value = n_A_PassSkill3[41];
			}
			SWs3sw[8] = 0;
		}
	} else {
		SWs3sw[8] = 0;
		n_A_PassSkill3[40] = 0;
		n_A_PassSkill3[41] = 0;
		myInnerHtml("EN13_2","",0);
		myInnerHtml("EN13_3","",0);
		myInnerHtml("EN13_4","",0);
	}
	Click_A3(recalc);
}

/**
 * 演奏/踊り系スキルの変更を反映する.
 * Skill3SW_2から呼ばれるケースとOnChangeイベントから直接呼ばれるケースがある.
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
function Click_A3(recalc = false) {
	if (recalc) {
		AutoCalc("Click_A3");
	}
	let sw = 0;
	for (let i = 0; i < n_A_PassSkill3.length; i++) {
		if (n_A_PassSkill3[i] != 0){
			if(!(20 <= i && i <= 36)) {
				sw = 1;
				break;
			}
		}
	}
	if (sw === 0) {
		document.getElementById('A3TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A3used","",0);
	} else {
		document.getElementById('A3TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A3used","　<B>使用中</B>",0);
	}
}