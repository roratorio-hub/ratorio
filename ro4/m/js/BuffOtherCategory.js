"use strict"
/**
 * 画面下部の「その他の支援/設定」のバフウィンドウ構築関数群
*/ 

/** その他の支援/設定 設定値の配列 */
let n_A_PassSkill8 = Array(28).fill(0);
/** その他の支援/設定 ウィンドウ可視状態 */
let n_Skill8SW = false;

/**
 * その他の支援/設定 を構築する
 */
function Click_Skill8SW(){
	let petId = 0;
	let petDataArrayWork = null;
	let objSelect = null;
	n_Skill8SW = document.calcForm.A8_SKILLSW.checked;
    if(n_Skill8SW){
		let str;
		str = '<TABLE Border style="white-space:nowrap;"><TR><TD id="A8TD" Colspan="2" class="title"><input id="OBJID_CHECK_A8_SKILLSW" type="checkbox" name="A8_SKILLSW"onClick="Click_Skill8SW()"><label for="OBJID_CHECK_A8_SKILLSW">その他の支援/設定 (暫定追加機能)</label><SPAN id="A8used"></SPAN></TD></TR>';
		str += '<TR><TD>ペット：<select id="OBJID_SELECT_PET" name="A8_Skill0" onchange="StAllCalc() | OnChangePetSelect()"></select></TD><TD>親密度：<select id="OBJID_SELECT_PET_FRIENDLITY" name="A8_Skill17" onChange="StAllCalc() | Click_A8(true)"></select></TD></TR>';
		str += '<TR><TD colspan="2"><SPAN id="OBJID_SPAN_PET_EXPLAIN"></SPAN></TD></TR>';
		str += '<TR><TD id="EN801"></TD><TD id="EN802"></TD></TR>';
		str += '<TR><TD id="EN803"></TD><TD id="EN804"></TD></TR>';
		str += '<TR><TD id="EN822"></TD><TD id="EN823"></TD></TR>';
		str += '<TR><TD id="EN805"></TD><TD id="EN806"></TD></TR>';
		str += '<TR><TD Colspan="2" id="EN821"></TD></TR>';
		str += '<TR><TD id="EN807"></TD><TD id="EN808"></TD></TR>';
		str += '<TR><TD Colspan="2" id="EN809"></TD></TR>';
		str += '<TR><TD id="EN810"></TD><TD id="EN811"></TD></TR>';
		str += '<TR><TD id="EN812"></TD><TD id="EN813"></TD></TR>';
		str += '<TR><TD id="EN814"></TD><TD id="EN815"></TD></TR>';
		str += '<TR><TD id="EN819"></TD><TD id="EN820"></TD></TR>';
		str += '<TR><TD colspan="2"><Font size=2><B>これより下、自キャラクターがかけられた状態異常</B></Font></TD></TR>';
		str += '<TR><TD id="EN830"></TD><TD id="EN831"></TD></TR>';
		str += '<TR><TD id="EN832"></TD><TD id="EN833"></TD></TR>';
		str += '<TR><TD id="EN834"></TD><TD id="EN835"></TD></TR>';
		str += '<TR><TD id="EN836"></TD><TD id="EN837"></TD></TR>';
		str += '</TABLE>';
		myInnerHtml("ID_ETC",str,0);
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
		myInnerHtml("EN801",'戦闘教範系<select name="A8_Skill1" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		let w_name = ["なし","25","50","75","100","(125)","(150)"];
		for (let i = 0; i <= 6; i++) {
            document.calcForm.A8_Skill1.options[i] = new Option(w_name[i],i);
        }
		myInnerHtml("EN802",'Job教範系<select name="A8_Skill2" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		w_name = ["なし","50","(75)","(100)"];
		for (let i = 0; i <= 3; i++) {
            document.calcForm.A8_Skill2.options[i] = new Option(w_name[i],i);
        }
		myInnerHtml("EN803",'ネットカフェ経験値UP<select name="A8_Skill3" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A8_Skill3.options[0] = new Option("-",0);
		for (let i = 1; i <= 2; i++) {
			let wy = 50 * i;
			let wx = (100 + wy) / 100;
			document.calcForm.A8_Skill3.options[i] = new Option("+"+ wy +"%("+ wx +"倍)",i);
		}
		myInnerHtml("EN804",'経験値増加キャンペーン<select name="A8_Skill7" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A8_Skill7.options[0] = new Option("-",0);
		for (let i = 1; i <= 8; i++){
			let wy = 25 * i;
			let wx = (100 + wy) / 100;
			document.calcForm.A8_Skill7.options[i] = new Option(wx+"倍(+"+(25*i)+"%)",i);
		}
		myInnerHtml("EN822",'OTP<select name="A8_Skill22" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A8_Skill22.options[0] = new Option("ログインボーナスなし",0);
		document.calcForm.A8_Skill22.options[1] = new Option("ブロンズ(Exp+5%)",1);
		document.calcForm.A8_Skill22.options[2] = new Option("シルバー(↑＋スピードポーション)",2);
		document.calcForm.A8_Skill22.options[3] = new Option("ゴールド(↑＋Hit+10/Flee+10)",3);
		document.calcForm.A8_Skill22.options[4] = new Option("レインボー(↑＋MaxHP+20%/MaxSP+20%)",4);
		myInnerHtml("EN823",'←ジョンダパスはOTPレインボーです',0);
		myInnerHtml("EN805",'公平PT人数<select name="A8_Skill5" onChange="StAllCalc() | Click_A8(true)"></select>', 0);
		document.calcForm.A8_Skill5.options[0] = new Option("-",0);
		for (let i = 1; i <= 11; i++) {
            document.calcForm.A8_Skill5.options[i] = new Option((i+1)+"人", i);
        }
		myInnerHtml("EN806",'共闘ボーナス<select name="A8_Skill6" onChange="StAllCalc() | Click_A8(true)"></select>', 0);
		document.calcForm.A8_Skill6.options[0] = new Option("-",0);
		for (let i = 1; i <= 20; i++) {
            document.calcForm.A8_Skill6.options[i] = new Option("+"+ (i*25) +"%", i);
        }
		myInnerHtml("EN821",'討伐クエストのExpを加算(1匹あたりの値)<select name="A8_Skill21" disabled="disabled" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A8_Skill21.options[0] = new Option("-",0);
		document.calcForm.A8_Skill21.options[1] = new Option("BaseExpで受け取る", 1);
		document.calcForm.A8_Skill21.options[2] = new Option("JobExpで受け取る", 2);
		myInnerHtml("EN807",'<input id="OBJID_CHECK_A8_Skill4" type="checkbox" name="A8_Skill4"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A8_Skill4">結婚スパノビステータスALL+1付与</label>',0);
		myInnerHtml("EN808",'<input id="OBJID_CHECK_A8_Skill13" type="checkbox" name="A8_Skill13"onClick="StAllCalc() | Click_A8(true)||RebuildStatusSelect()||CalcStatusPoint(true)"><label for="OBJID_CHECK_A8_Skill13">養子状態にする</label>',0);
		myInnerHtml("EN809",'<font size="2" color="red">（時限性補助効果の設定は、「アイテム時限効果」設定欄へ移動しました）</font><input type="button" value="設定欄を表示" onclick="CTimeItemAreaComponentManager.FocusArea(0, true)">',0);
		myInnerHtml("EN810",'囲んでいる敵の数<select name="A8_Skill12" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		for (let i = 0; i <= 22; i++) {
            document.calcForm.A8_Skill12.options[i] = new Option(i + "匹", i);
        }
		myInnerHtml("EN812",'<Font size=2><B>攻城戦の設定は[対人プレイヤー設定]欄に移動</B></Font>',0);
		myInnerHtml("EN813",'防衛値<select name="A8_Skill15" onChange="StAllCalc() | Click_A8(true)"></select><Font size=2>(攻城戦モード時のみ有効)</Font>',0);
		document.calcForm.A8_Skill15.options[0] = new Option("-",0);
		for (let i = 1; i <= 20; i++) {
            document.calcForm.A8_Skill15.options[i] = new Option(i * 5, i);
        }
		myInnerHtml("EN814",'<input id="OBJID_CHECK_A8_Skill16" type="checkbox" name="A8_Skill16"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A8_Skill16">クリティカル率を0にする</label>',0);
		if (41 <= n_A_JOB && n_A_JOB <= 43) {
            myInnerHtml("EN819",'<input id="OBJID_CHECK_A8_Skill19" type="checkbox" name="A8_Skill19"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A8_Skill19"><Font size=2>暖かい風欄を他職からの武器属性付与にする<BR>　（素手Atk部分には武器属性付与が適用されない）</Font></label>',0);
        } else {
            myInnerHtml("EN819",'<input id="OBJID_CHECK_A8_Skill19" type="checkbox" name="A8_Skill19"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A8_Skill19"><Font size=2>武器属性付与をアカデミーの看板型付与にする<BR>　（素手Atk部分にも武器属性付与が適用される）</Font></label>',0);
        }
		myInnerHtml("EN830",'クァグマイア<select name="A_IJYOU0" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A_IJYOU0.options[0] = new Option("-",0);
		for (let i = 1; i <= 5; i++) {
            document.calcForm.A_IJYOU0.options[i] = new Option("Lv"+i+"(モンスターが使用)",i);
        }
		for (let i = 6; i <= 10; i++) {
            document.calcForm.A_IJYOU0.options[i] = new Option("Lv"+(i-5)+"(プレイヤーが使用)",i);
        }
		myInnerHtml("EN831",'速度減少<select name="A_IJYOU1" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A_IJYOU1.options[0] = new Option("-",0);
		for (let i = 1; i <= 10; i++) {
            document.calcForm.A_IJYOU1.options[i] = new Option("Lv"+i,i);
        }
		document.calcForm.A_IJYOU1.options[11] = new Option("Lv46",46);
		document.calcForm.A_IJYOU1.options[12] = new Option("Lv48",48);
		myInnerHtml("EN832",'<input id="OBJID_CHECK_A_IJYOU2" type="checkbox" name="A_IJYOU2"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A_IJYOU2">毒</label>',0);
		myInnerHtml("EN833",'<input id="OBJID_CHECK_A_IJYOU3" type="checkbox" name="A_IJYOU3"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A_IJYOU3">呪い</label>',0);
		myInnerHtml("EN834",'スローキャスト<select name="A_IJYOU4" onChange="StAllCalc() | Click_A8(true)"></select>',0);
		document.calcForm.A_IJYOU4.options[0] = new Option("-",0);
		for (let i = 1; i <= 5; i++) {
            document.calcForm.A_IJYOU4.options[i] = new Option("Lv"+i,i);
        }
		myInnerHtml("EN835",'<input id="OBJID_CHECK_A_IJYOU5" type="checkbox" name="A_IJYOU5"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A_IJYOU5">氷結<Font size=2>(ASPD-30%/DEF-10%/固定詠唱+50%)</Font></label>',0);
		myInnerHtml("EN836",'<input id="OBJID_CHECK_A_IJYOU6" type="checkbox" name="A_IJYOU6"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A_IJYOU6">(×)イヌハッカシャワー</label>',0);
		myInnerHtml("EN837",'<input id="OBJID_CHECK_A_IJYOU7" type="checkbox" name="A_IJYOU7"onClick="StAllCalc() | Click_A8(true)"><label for="OBJID_CHECK_A_IJYOU7">(×)ニャングラス</label>',0);
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
		document.calcForm.A_IJYOU0.value = n_A_IJYOU[0];
		document.calcForm.A_IJYOU1.value = n_A_IJYOU[1];
		document.calcForm.A_IJYOU2.checked = n_A_IJYOU[2];
		document.calcForm.A_IJYOU3.checked = n_A_IJYOU[3];
		document.calcForm.A_IJYOU4.value = n_A_IJYOU[4];
		document.calcForm.A_IJYOU5.checked = n_A_IJYOU[5];
		document.calcForm.A_IJYOU6.checked = n_A_IJYOU[6];
		document.calcForm.A_IJYOU7.checked = n_A_IJYOU[7];
		// ペット説明更新
		RefreshPetExplain();
    } else {
		let str;
		str = '<TABLE Border><TR><TD id="A8TD" class="title"><input id="OBJID_CHECK_A8_SKILLSW" type="checkbox" name="A8_SKILLSW"onClick="Click_Skill8SW()"><label for="OBJID_CHECK_A8_SKILLSW">その他の支援/設定 (暫定追加機能)</label><SPAN id="A8used"></SPAN></TD></TR></TABLE>';
		str += '';
		myInnerHtml("ID_ETC",str,0);
		document.calcForm.A8_SKILLSW.checked = false;
    }
	Click_A8(false);
}

/**
 * その他の支援/設定 (暫定追加機能)の変更を反映する
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
function Click_A8(recalc = false){
	if(recalc) {
        AutoCalc("Click_A8");
    }
	let sw=0;
	for(let i = 0; i < n_A_PassSkill8.length; i++) {
		if(n_A_PassSkill8[i] != 0){
			sw = 1;
			break;
		}
	}
	for(let i = 0; i < n_A_IJYOU.length; i++) {
        if(n_A_IJYOU[i] != 0){
            sw = 1;
            break;
        }
	}
	if(sw == 0){
		document.getElementById('A8TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A8used","",0);
	}else{
		document.getElementById('A8TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A8used","　<B>使用中</B>",0);
	}
}

/**
 * その他の支援/設定 > ペット の変更イベント.
 * 内部で Click_A8() を呼び出す
 */
function OnChangePetSelect() {
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
function RefreshPetExplain() {
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
