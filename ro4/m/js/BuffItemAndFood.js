"use strict"
/**
 * 画面下部の「アイテム(食品/他)」のバフウィンドウ構築関数群
*/ 

/** アイテム・食品他 設定値の配列 */
let n_A_PassSkill7 = Array(52).fill(0);
/** アイテム・食品他 ウィンドウ可視状態 */
let n_Skill7SW = false;

/**
 * アイテム・食品他 を構築する
 * @returns 
 */
function Click_Skill7SW(){
	let objRoot = null;
	let objTable = null;
	let objTbody = null;
	let objTr = null;
	let objTd = null;
	let objInput = null;
	let objSelect = null;
	let objLabel = null;
	let objSpan = null;
	let optText = "";
	// 展開状態を取得
	objInput = document.getElementById("OBJID_CHECK_A7_SKILLSW");
	n_Skill7SW = objInput.checked;
	// ルートオブジェクト取得
	objRoot = document.getElementById("OBJID_SP_SIEN05");
	// ルートオブジェクト配下、全削除
	HtmlRemoveAllChild(objRoot);
	// テーブル生成
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("border", "1");
	objTable.style.whiteSpace = "nowrap";
	objTbody = HtmlCreateElement("tbody", objTable);
	// ヘッダ部分構築
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "A7TD");
	objTd.setAttribute("class", "title");
	if (n_Skill7SW) {
		objTd.setAttribute("colspan", "6");
	}
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_CHECK_A7_SKILLSW");
	objInput.setAttribute("name", "A7_SKILLSW");
	objInput.setAttribute("onclick", "Click_Skill7SW()");
	if (n_Skill7SW) {
		objInput.setAttribute("checked", "checked");
	}
	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CHECK_A7_SKILLSW");
	HtmlCreateTextNode("アイテム(食品/他)", objLabel);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "A7used");
	// 展開表示でない場合は、処理終了
	if (!n_Skill7SW) {
		Click_A7(false);
		return;
	}
	let buildInfo = null;
	let buildInfoTable = [
		[
			[0, "茶菓子(HIT+30)"],
			[1, "揚げ菓子(FLEE+30)"],
			[2, "虹色のお餅(ATK/MATK+10)"]
		],
		[
			[9, "恨みの箱(ATK+20)"],
			[10, "眠い箱(MATK+20)"],
			[]
		],
		[
			[11, "レジストコールドポーション"],
			[12, "レジストアースポーション"],
			[]
		],
		[
			[13, "レジストファイアーポーション"],
			[14, "レジストウィンドポーション"],
			[]
		],
		[
			[22, "濃縮サラマインジュース"],
			[23, "濃縮ホワイトポーションZ"],
			[24, "ビタタ500"]
		],
		[
			[25, "ビュッシュ・ド・ノエル"],
			[35, "ガラナキャンディ"],
			[36, "焼きトウモロコシ"]
		],
		[
			[26, "ルーンミッドガッツ産おやつ"],
			[27, "シュバルツバルド産おやつ"],
			[28, "アルナベルツ産おやつ"]
		],
		[
			[29, "マヌクの豪気"],
			[30, "マヌクの信念"],
			[31, "マヌクの意思"]
		],
		[
			[32, "ピンギキュラの果実ジャム"],
			[33, "コルヌスの涙"],
			[34, "ルシオラヴェスパのハチ蜜"]
		],
		[
			[37, "アロエベラ"],
			[38, "HP増加ポーション", ["なし","(小)","(中)","(大)"]],
			[39, "SP増加ポーション", ["なし","(小)","(中)","(大)"]],
		],
		[
			[40, "(効果なし)マキシマイズパワー"],
			[41, "戦闘薬", ["なし","戦闘薬","高級戦闘薬"]],
			[48, "古代精霊のお守り"],
		],
		[
			[50, "エナジーコート", ["なし","6%","12%","18%","24%","30%"]],
			[49, "オルレアンのフルコース"],
			[51, "フェンリルの呪符"],
		],
	];
	let subInfoArray = null;
	for (let idxRow = 0; idxRow < buildInfoTable.length; idxRow++) {
		// 追加行が存在するインデックス
		switch (idxRow) {
            case 1:
                objTr = HtmlCreateElement("tr", objTbody);
                objTd = HtmlCreateElement("td", objTr);
                objTd.setAttribute("colspan", "3");
                subInfoArray = [
                    [3, "STR"], [4, "AGI"], [5, "VIT"], [6, "INT"], [7, "DEX"], [8, "LUK"],
                ];
                for (let idxKind = 0; idxKind < subInfoArray.length; idxKind++) {
                    objSelect = HtmlCreateElement("select", objTd);
                    objSelect.setAttribute("name", "A7_Skill" + subInfoArray[idxKind][0]);
                    objSelect.setAttribute("onchange", "StAllCalc() | Click_A7(true)");
                    HtmlCreateElementOption(0, subInfoArray[idxKind][1] + "+食品", objSelect);
                    for (let idxValue = 1; idxValue <= 10; idxValue++) {
                        HtmlCreateElementOption(idxValue, "+" + idxValue, objSelect);
                    }
                    objSelect.value = n_A_PassSkill7[subInfoArray[idxKind][0]];
                    HtmlCreateTextNode(" ", objTd);
                }
                objInput = HtmlCreateElement("input", objTd);
                objInput.setAttribute("type", "button");
                objInput.setAttribute("id", "FOODOFF");
                objInput.setAttribute("value", "全解除");
                objInput.setAttribute("onclick", "Click_Food_Off() | StAllCalc()");
                HtmlCreateTextNode(" ", objTd);
                objInput = HtmlCreateElement("input", objTd);
                objInput.setAttribute("type", "button");
                objInput.setAttribute("name", "NETCAFE3");
                objInput.setAttribute("value", "ALL＋10");
                objInput.setAttribute("onclick", "Click_NetCafe3() | StAllCalc()");
                HtmlCreateElement("br", objTd);
                HtmlCreateTextNode("※ネットカフェのステータスALL+10は食品扱い", objTd);
                break;
            case 4:
                objTr = HtmlCreateElement("tr", objTbody);
                objTd = HtmlCreateElement("td", objTr);
                objTd.setAttribute("colspan", "3");
                objInput = HtmlCreateElement("input", objTd);
                objInput.setAttribute("type", "checkbox");
                objInput.setAttribute("id", "OBJID_CHECK_A7_Skill15");
                objInput.setAttribute("name", "A7_Skill15");
                objInput.setAttribute("onclick", "StAllCalc(); Click_A7(true); CAttackMethodAreaComponentManager.RebuildControls();");
                objLabel = HtmlCreateElement("label", objTd);
                objLabel.setAttribute("for", "OBJID_CHECK_A7_Skill15");
                HtmlCreateTextNode("攻撃方法を追加する（魔女のスキルカード・攻撃魔法スクロール・イグドラシルの葉）", objLabel);
                if (n_A_PassSkill7[15]) {
                    objInput.checked = "checked";
                }
                // +20 料理
                objTr = HtmlCreateElement("tr", objTbody);
                objTd = HtmlCreateElement("td", objTr);
                objTd.setAttribute("colspan", "3");
                subInfoArray = [
                    [16, "STR"], [17, "AGI"], [18, "VIT"], [19, "INT"], [20, "DEX"], [21, "LUK"],
                ];
                for (let idxKind = 0; idxKind < subInfoArray.length; idxKind++) {
                    if (idxKind > 0) {
                        HtmlCreateTextNode("　　", objTd);
                    }
                    objInput = HtmlCreateElement("input", objTd);
                    objInput.setAttribute("type", "checkbox");
                    objInput.setAttribute("id", "OBJID_CHECK_A7_Skill" + subInfoArray[idxKind][0]);
                    objInput.setAttribute("name", "A7_Skill" + subInfoArray[idxKind][0]);
                    objInput.setAttribute("onclick", "StAllCalc(); Click_A7(true);");
                    objLabel = HtmlCreateElement("label", objTd);
                    objLabel.setAttribute("for", "OBJID_CHECK_A7_Skill" + subInfoArray[idxKind][0]);
                    HtmlCreateTextNode(subInfoArray[idxKind][1] + "+20", objLabel);
                    if (n_A_PassSkill7[subInfoArray[idxKind][0]]) {
                        objInput.checked = "checked";
                    }
                }
                break;
		}
		objTr = HtmlCreateElement("tr", objTbody);
		for (let idxColumn = 0; idxColumn < buildInfoTable[idxRow].length; idxColumn++) {
			buildInfo = buildInfoTable[idxRow][idxColumn];
			objTd = HtmlCreateElement("td", objTr);
			// 空要素
			if (buildInfo.length < 2) {
				continue;
			} else if (buildInfo.length == 2) {
			// チェックボックス方式
				objInput = HtmlCreateElement("input", objTd);
				objInput.setAttribute("type", "checkbox");
				objInput.setAttribute("id", "OBJID_CHECK_A7_Skill" + buildInfo[0]);
				objInput.setAttribute("name", "A7_Skill" + buildInfo[0]);
				objInput.setAttribute("onclick", "StAllCalc(); Click_A7(true);");
				objLabel = HtmlCreateElement("label", objTd);
				objLabel.setAttribute("for", "OBJID_CHECK_A7_Skill" + buildInfo[0]);
				HtmlCreateTextNode(buildInfo[1], objLabel);
				if (n_A_PassSkill7[buildInfo[0]]) {
					objInput.checked = "checked";
				}
			} else {
    			// セレクトボックス方式
				HtmlCreateTextNode(buildInfo[1], objTd);
				HtmlCreateTextNode("　", objTd);
				objSelect = HtmlCreateElement("select", objTd);
				objSelect.setAttribute("name", "A7_Skill" + buildInfo[0]);
				objSelect.setAttribute("onchange", "StAllCalc(); Click_A7(true);");
				for (let idxValue = 0; idxValue < buildInfo[2].length; idxValue++) {
					HtmlCreateElementOption(idxValue, buildInfo[2][idxValue], objSelect);
				}
				objSelect.value = n_A_PassSkill7[buildInfo[0]];
			}
		}
	}
	// 期間限定効果行
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	subInfoArray = [
		[42, "ATK"], [43, "MATK"], [44, "HIT"], [45, "FLEE"], [46, "Cri"], [47, "ASPD"],
	];
	for (let idxKind = 0; idxKind < subInfoArray.length; idxKind++) {
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("name", "A7_Skill" + subInfoArray[idxKind][0]);
		objSelect.setAttribute("onchange", "StAllCalc(); Click_A7(true);");
		HtmlCreateElementOption(0, "期間限定系[" + subInfoArray[idxKind][1] + "] なし", objSelect);
		for (let idxValue = 1; idxValue <= 50; idxValue++) {
			optText = subInfoArray[idxKind][1] + "+" + idxValue;
			if (subInfoArray[idxKind][1] == "ASPD") {
				if (idxValue < 10) {
					continue;
				}
				optText += "%";
				switch (idxValue) {
                    case 10:
                        optText += "(=スピポ)";
                        break;
                    case 15:
                        optText += "(=ハイスピ)";
                        break;
                    case 20:
                        optText += "(=バサクP)";
                        break;
				}
			}
			HtmlCreateElementOption(idxValue, optText, objSelect);
		}
		HtmlCreateElement("br", objTd);
		objSelect.value = n_A_PassSkill7[subInfoArray[idxKind][0]];
	}
	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("style", "font-size : smaller");
	HtmlCreateTextNode("左欄は期間限定イベントのアイテムや", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("イベントNPCからのパワーアップ効果用。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("これらは同じ系列の他の食品と", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("競合する可能性があるので", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("ゲーム内では食品使ってると効果ないかも。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("例：ASPD+%はスピポ系と競合。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("STR+などは一般食品欄をお使い下さい。", objSpan);
	objTd = HtmlCreateElement("td", objTr);
	// 表示更新
	Click_A7(false);
}

/**
 * アイテム(食品/他)の変更を反映する
 * @param {*} n 再計算フラグ（n = 1 再計算する）
 */
function Click_A7(recalc = false){
	if(recalc) {
        AutoCalc("Click_A7");
    }
	let sw=0;
	for (let i = 0; i < n_A_PassSkill7.length; i++) {
		if(n_A_PassSkill7[i] != 0){
			sw = 1;
			break;
		}
	}
	if (sw == 0) {
		document.getElementById('A7TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A7used","",0);
	} else {
		document.getElementById('A7TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A7used","　<B>使用中</B>",0);
	}
}

/**
 * アイテム・食品他 > 全解除 ボタンのクリックイベント
 */
function Click_Food_Off(){
	document.calcForm.A7_Skill3.value = 0;
	document.calcForm.A7_Skill4.value = 0;
	document.calcForm.A7_Skill5.value = 0;
	document.calcForm.A7_Skill6.value = 0;
	document.calcForm.A7_Skill7.value = 0;
	document.calcForm.A7_Skill8.value = 0;
	Click_A7(true);
}

/**
 * アイテム・食品他 > ALL+10 ボタンのクリックイベント
 */
function Click_NetCafe3(){
	document.calcForm.A7_Skill3.value = 10;
	document.calcForm.A7_Skill4.value = 10;
	document.calcForm.A7_Skill5.value = 10;
	document.calcForm.A7_Skill6.value = 10;
	document.calcForm.A7_Skill7.value = 10;
	document.calcForm.A7_Skill8.value = 10;
	Click_A7(true);
}
