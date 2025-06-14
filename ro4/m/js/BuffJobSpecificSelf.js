"use strict"
/**
 * 「職固有自己支援」のバフウィンドウ構築関数群
*/ 

/** パッシブ持続系 ウィンドウ可視状態 */
let n_Skill1SW = false;

/**
 * パッシブ持続系 チェックボックス生成
 */
function Click_PassSkillSW(){
	let idx = 0;
	let passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();
	let table_header = `<TABLE Border class="tooltip-target" data-tooltip="パッシブスキル等は今後削除する予定です。代わりに習得スキル欄を使ってください。">
		<TR><TD ColSpan="4" id="A1TD" Bgcolor="#DDDDFF" class="title">
		<input id="OBJID_CHECK_A1_SKILL_SW" type="checkbox" name="A1_SKILLSW" onClick="Click_PassSkillSW()">
		<label for="OBJID_CHECK_A1_SKILL_SW">${GetJobName(n_A_JOB)}固有自己支援</label>
		<span id="A1used"></span>
		</TD></TR>`;
	n_Skill1SW = document.calcForm.A1_SKILLSW.checked;
	if (n_Skill1SW) {
		let end = passiveSkillIdArray.length -1;
		let str = table_header;
		for (let i = 0; i <= end; i += 2) {
			str += '<TR><TD id="P_Skill'+ i +'"></TD><TD id="P_Skill'+ i +'s"></TD><TD id="P_Skill'+ (i+1) +'"></TD><TD id="P_Skill'+ (i+1) +'s"></TD></TR>';
		}
		str += '</TABLE>';
		myInnerHtml("ID_PASS_SKILL",str,0);
		document.calcForm.A1_SKILLSW.checked = true;
		for (let i = 0; i <= end; i++) {
				if (passiveSkillIdArray[i] == SKILL_ID_SHUCHURYOKU_KOZYO) {
					myInnerHtml("P_Skill"+i, SkillObjNew[passiveSkillIdArray[i]][SKILL_DATA_INDEX_NAME] + "　<a href=\"../kousin/note20210606.html\" target=\"_blank\">(★注意情報★)</a>", 0);
				}
				else {
					myInnerHtml("P_Skill"+i,SkillObjNew[passiveSkillIdArray[i]][SKILL_DATA_INDEX_NAME],0);
				}
				myInnerHtml("P_Skill"+i+"s","<select name=A_skill"+i+" id=A_skill"+i+" onChange=Click_A1(true)></select>",0);
		}
		for (let j = 0; j <= end; j++) {
				var w = passiveSkillIdArray[j];
				var w2 = [12,68,74,152,153,155,196,253,258,301,309,310,322,345,364,365,383,379,385,386,389,390,392,420,421,422,450,453,522,750,752];
				var wOBJ = document.getElementById("A_skill"+j);
				if(NumSearch(w,w2)){
					wOBJ.options[0] = new Option("off",0);
					wOBJ.options[1] = new Option("on",1);
				}
				else{
					for(let i = 10; i >= 0; i--) {
						wOBJ.options[i] = null;
					}
					for(let i = 0; i <= SkillObjNew[passiveSkillIdArray[j]][SKILL_DATA_INDEX_MAXLV]; i++) {
						wOBJ.options[i] = new Option(i,i);
					}
				}
				// スパノビの魂専用処理
				if (w == SKILL_ID_SUPER_NOVICENO_TAMASHI) {
					wOBJ.setAttribute("onClick", "RefreshSuperNoviceFullWeapon(parseInt(this.value) == 1)");
				}
		}
		var w = NumSearch2(SKILL_ID_ENERGY_COAT, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_ECname=["off","6%","12%","18%","24%","30%"];
				for(i=1;i<=5;i++) w_ECname[i] += "カット";
				for(i=0;i<=5;i++) wOBJ.options[i] = new Option(w_ECname[i],i);
		}
		var w = NumSearch2(SKILL_ID_KIHE_SHUREN, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name = new Array();
				w_name[0] = "ペコなし";
				for(i=1;i<=6;i++) w_name[i] = "修練" + (i-1);
				for(i=0;i<=6;i++) wOBJ.options[i] = new Option(w_name[i],i);
		}
		var w = NumSearch2(SKILL_ID_DRAGON_TRAINING, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name = new Array();
				w_name[0] = "未騎乗";
				for(i=1;i<=6;i++) w_name[i] = "Lv" + (i-1);
				for(i=0;i<=6;i++) wOBJ.options[i] = new Option(w_name[i],i);
		}
		var w = NumSearch2(SKILL_ID_FIGHTING_SPIRIT,passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("on(ソロ)",1);
				for(i=2;i<=12;i++) wOBJ.options[i] = new Option(i +"人PT",i);
		}
		var w = NumSearch2(SKILL_ID_DRAGONIC_AURA_STATE,passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("未習得",0);
				wOBJ.options[1] = new Option("未使用",1);
				for(i=1;i<=10;i++) wOBJ.options[i+1] = new Option("Lv"+i, i+1);
		}
		var w = NumSearch2(SKILL_ID_SHUKUFUKU, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name=[0,1,2,3,4,5,6,8,10];
				for(i=0;i<=8;i++) wOBJ.options[i] = new Option((w_name[i] * 10) + "%",w_name[i]);
		}
		var w = NumSearch2(SKILL_ID_KIKO, passiveSkillIdArray);
		if(w != -1){
				if ((n_A_JOB != JOB_ID_MONK) && (n_A_JOB != JOB_ID_CHAMPION)) {
					var wOBJ = document.getElementById("A_skill" + w);
					for(i=10;i>=0;i--) wOBJ.options[i] = null;
					for(i=0;i<=15;i++) wOBJ.options[i] = new Option(i,i);
				}
		}
		var w = NumSearch2(SKILL_ID_CAMOUFLAGE, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				for(i=1;i<=10;i++) wOBJ.options[i] = new Option(i+"秒",i);
		}
		var w = NumSearch2(SKILL_ID_MADOGEAR, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("未搭乗",0);
				wOBJ.options[1] = new Option("搭乗中",1);
		}
		var w = NumSearch2(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("-",0);
				wOBJ.options[1] = new Option("FB3",1);
				wOBJ.options[2] = new Option("CB3",2);
				wOBJ.options[3] = new Option("LB3",3);
		}
		var w = NumSearch2(SKILL_ID_ABR_DUAL_CANNON,passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("未召喚",0);
				wOBJ.options[1] = new Option("召喚中",1);
		}
		// シールドスペル(ATK+)
		var w = NumSearch2(SKILL_ID_SHIELD_SPELL_ATK_PLUS, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("装備盾",1);
				for(i=2;i<n_SieldSp.length;i++) wOBJ.options[i] = new Option("(+"+ n_SieldSpDum[i] +")",n_SieldSpNum[i]);
		}
		// シールドスペル(反射)
		var w = NumSearch2(SKILL_ID_SHIELD_SPELL_REFLECT, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("装備盾",1);
				for(i=2;i<n_SieldSp.length;i++) wOBJ.options[i] = new Option("("+ n_SieldSpDum[i] +")",n_SieldSpNum[i]);
		}
		// シールドスペル(DEF+)
		var w = NumSearch2(SKILL_ID_SHIELD_SPELL_DEF_PLUS, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("装備盾",1);
				for(i=2;i<=11;i++) wOBJ.options[i] = new Option("(+"+ (i-1) +")",i);
		}
		var w = NumSearch2(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var wASSname = ["-","FB","FBL","FW","CB","FD","LB","TS","NB","SS","△MS","JT","△LoV","WB","FN","×SG","ES","HD","×TU","×ME", "CrL", "SoE", "HI"];
				wOBJ.options[0] = new Option("-",0);
				for(i=0;i<wASSname.length;i++) wOBJ.options[i] = new Option(wASSname[i],i);
		}
		var w = NumSearch2(SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				for(i=1;i<=10;i++) wOBJ.options[i] = new Option("on(Lv"+ i +")",i);
		}
		// EDP毒部分消す　説明リンク
		var w = passiveSkillIdArray.indexOf(SKILL_ID_CANCEL_EDP_POISON_ATTACK);
		if (w >= 0) {
				var wOBJ = document.getElementById("P_Skill" + w);

				var objAnchor = HtmlCreateElement("a", wOBJ);
				objAnchor.setAttribute("href", "../form/20110622edp.html");
				objAnchor.setAttribute("target", "_blank");
				objAnchor.style.display = "inline-block";
				objAnchor.style.marginLeft = "1em";
				HtmlCreateTextNode("[説明]", objAnchor)
		}
		var w = NumSearch2(SKILL_ID_COUNT_OF_RG_FOR_BANDING, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("ソロ",0);
				for(i=1;i<=11;i++) wOBJ.options[i] = new Option((i+1)+"人",i);
		}
		var w = NumSearch2(SKILL_ID_ATK_FOR_IRON_NAIL, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option(0,0);
				for(i=1;i<=5;i++) wOBJ.options[i] = new Option("+"+(20 * i),i);
		}
		var w = NumSearch2(SKILL_ID_FU_ELEMENT_OF_FU, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[2] = new Option("水符",1);
				wOBJ.options[4] = new Option("土符",2);
				wOBJ.options[1] = new Option("火符",3);
				wOBJ.options[3] = new Option("風符",4);
		}
		var w = NumSearch2(SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("偶偶",0);
				wOBJ.options[1] = new Option("偶奇",1);
				wOBJ.options[2] = new Option("奇偶",2);
				wOBJ.options[3] = new Option("奇奇",3);
		}
		//----------------------------------------------------------------
			// エレメンタルマスター系列　召喚中の精霊
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_SERE, passiveSkillIdArray);
		if(sklIdx != -1){

				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				var w_name = [
					"off",					// 0
					"火Lv1","火Lv2","火Lv3",	// 1 - 3 
					"水Lv1","水Lv2","水Lv3",	// 4 - 6
					"風Lv1","風Lv2","風Lv3",	// 7 - 9
					"地Lv1","地Lv2","地Lv3",	// 10 - 12
				];

				if (passiveSkillIdArray.indexOf(SKILL_ID_ELEMENTAL_SPIRIT_MASTERY) >= 0) {
					w_name = w_name.concat([
						"火四次", "水四次", "風四次", "地四次", "毒四次",	// 13 - 17
					]);
				}

				for (idx = 0; idx < w_name.length; idx++) {
					HtmlCreateElementOption(idx, w_name[idx], objSelect);
				}
		}
		// -------------------------------------------------------
			// エレメンタルマスター系列　精霊のモード
			// -------------------------------------------------------
		var w = NumSearch2(SKILL_ID_SERE_MODE, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name = ["off","passive","defensive","ofensive"];
				for(i=0;i<=3;i++) wOBJ.options[i] = new Option(w_name[i],i);
		}
		// -------------------------------------------------------
			// エレメンタルマスター系列　精霊のスキル
			// -------------------------------------------------------
		var w = NumSearch2(SKILL_ID_SERE_SUPPORT_SKILL, passiveSkillIdArray);
		if(w != -1){
				// i に設定可能な最大値は 64 (=6bit)
				// 旧バージョンのセーブ処理に含まれており拡張が容易ではない
				// 拡張するぐらいなら別項目で作り直す方が良いと思います
				var wOBJ = document.getElementById("A_skill" + w);
				for(let i=10 ;i>=0; i--) wOBJ.options[i] = null;
				// --- w_name ---
				//      Passive, Defence, Attack →
				// Lv1
				// Lv2
				// Lv3
				// ↓
				var w_name = [
					"off",
					"(火1P)ﾊﾟｲﾛﾃｸﾆｯｸ",0,0,
					"(火2P)ﾋｰﾀｰ","(火2D)ﾌｧｲｱｰｸﾛｰｸ",0,
					0,0,0,
					"(水1P)ｱｸｱﾌﾟﾚｲ",0,0,
					"(水2P)ｸｰﾗｰ","(水2D)ｳｫｰﾀｰﾄﾞﾛｯﾌﾟ",0,
					0,"(水3D)ｳｫｰﾀｰﾊﾞﾘｱ",0,
					"(風1P)ｶﾞｽﾄ","(風1D)ｳｨﾝﾄﾞｽﾃｯﾌﾟ",0,
					"(風2P)ﾌﾞﾗｽﾄ","(風2D)ｳｨﾝﾄﾞｶｰﾃﾝ",0,
					0,"(風3D)ｾﾞﾌｧｰ",0,
					"(地1P)ﾍﾟﾄﾛﾛｼﾞｰ","(地1D)ｿﾘｯﾄﾞｽｷﾝ",0,
					"(地2P)ｶｰｽﾞﾄﾞｿｲﾙ","(地2D)ｽﾄｰﾝｼｰﾙﾄﾞ",0,
					0,"(地3D)ﾊﾟﾜｰｵﾌﾞｶﾞｲｱ",0,
					"(火4P)ﾌﾚｲﾑﾃｸﾆｯｸ", "(火4D)ﾌﾚｲﾑｱｰﾏｰ", 0,
					"(水4P)ｺｰﾙﾄﾞﾌｫｰｽ", "(水4D)ｸﾘｽﾀﾙｱｰﾏｰ", 0,
					"(風4P)ｸﾞﾚｲｽﾌﾞﾘｰｽﾞ", "(風4D)ｱｲｽﾞｵﾌﾞｽﾄｰﾑ", 0,
					"(地4P)ｱｰｽｹｱ", "(地4D)ｽﾄﾛﾝｸﾞﾌﾟﾛﾃｸｼｮﾝ", 0,
					"(毒4P)ﾃﾞｨｰﾌﾟﾎﾟｲｽﾞﾆﾝｸﾞ", "(毒4D)ﾎﾟｲｽﾞﾝｼｰﾙﾄﾞ", 0,
				];
				var sere_skill_index=0;
				for(let i=0; i<=51; i++){
					if(w_name[i] != 0){
						wOBJ.options[sere_skill_index] = new Option(w_name[i],i);
						sere_skill_index++;
					}
				}
		}
		var w = NumSearch2(SKILL_ID_HOMLV_FOR_PYROCLASTIC, passiveSkillIdArray);
		if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10; i>=0; i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("-",0);
				for(i=1; i<=29; i++) wOBJ.options[i] = new Option(i+121, i);
		}
		//----------------------------------------------------------------
			// 修羅：閃光連撃終了直後状態
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "なし", objSelect);
				HtmlCreateElementOption(1, "Lv1", objSelect);
				HtmlCreateElementOption(2, "Lv2", objSelect);
				HtmlCreateElementOption(3, "Lv3", objSelect);
				HtmlCreateElementOption(4, "Lv4", objSelect);
				HtmlCreateElementOption(5, "Lv5", objSelect);
		}
		//----------------------------------------------------------------
			// リベリオン：クイックドロー全追撃
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_AS_QUICKDRAW, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
		}
		//----------------------------------------------------------------
			// サモナー：大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
		}
		//----------------------------------------------------------------
			// サモナー：大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
		}
		//----------------------------------------------------------------
			// サモナー：大地の魂効果(ニャングラス使用後のMATK＋)
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
		}
		//----------------------------------------------------------------
			// サモナー：生命の魂効果(残りHP)
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100, "100%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81, "81%～99%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51, "51%～80%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10, "10%～50%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_0, "0%～9%", objSelect);

		}
		//----------------------------------------------------------------
			// 星帝：流星落下の計算方法
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_RYUSE_RAKKA_MODE, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "対象＋追撃", objSelect);
				HtmlCreateElementOption(1, "対象のみ", objSelect);
				HtmlCreateElementOption(2, "追撃のみ", objSelect);
		}
		//----------------------------------------------------------------
			// 天帝：運行の状態
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_UNKONO_ZYOTAI, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "なし", objSelect);
				HtmlCreateElementOption(1, "日出", objSelect);
				HtmlCreateElementOption(2, "正午", objSelect);
				HtmlCreateElementOption(3, "日没", objSelect);
				HtmlCreateElementOption(4, "月出", objSelect);
				HtmlCreateElementOption(5, "正子", objSelect);
				HtmlCreateElementOption(6, "月没", objSelect);
		}
		//----------------------------------------------------------------
			// 拳聖・星帝・天帝：太陽と月と星の日
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "全て発動させる", objSelect);
				HtmlCreateElementOption(1, "今日の日付", objSelect);
				HtmlCreateElementOption(2, "太陽の日(偶数)", objSelect);
				HtmlCreateElementOption(3, "月の日(奇数)", objSelect);
				HtmlCreateElementOption(4, "星の日(5の倍数)", objSelect);
		}
		//----------------------------------------------------------------
			// ソウルアセティック：四方符の状態
			//----------------------------------------------------------------
		var sklIdx = NumSearch2(SKILL_ID_SHIHO_FU_ZYOTAI, passiveSkillIdArray);
		if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "なし", objSelect);
				HtmlCreateElementOption(1, "青龍符", objSelect);
				HtmlCreateElementOption(2, "白虎符", objSelect);
				HtmlCreateElementOption(3, "朱雀符", objSelect);
				HtmlCreateElementOption(4, "玄武符", objSelect);
				HtmlCreateElementOption(5, "四方五行陣Lv1", objSelect);
				HtmlCreateElementOption(6, "四方五行陣Lv2", objSelect);
				HtmlCreateElementOption(7, "四方五行陣Lv3", objSelect);
				HtmlCreateElementOption(8, "四方五行陣Lv4", objSelect);
				HtmlCreateElementOption(9, "四方五行陣Lv5", objSelect);
		}
		for (let i = 0; i < passiveSkillIdArray.length; i++) {
				let wOBJ = document.getElementById("A_skill" + i);
				wOBJ.value = n_A_PassSkill[i];
		}
	} else {
		let str = table_header;
		str += '</TABLE>';
		myInnerHtml("ID_PASS_SKILL",str,0);
		document.calcForm.A1_SKILLSW.checked = false;
	}
	Click_A1(false);
}

/**
 * パッシブ持続系の設定変更を反映する
 * @param {boolean} recalc true:変数変更後に再計算する / false:しない(default)
 */
function Click_A1(recalc = false){
	if (recalc) {
		AutoCalc("Click_A1");
	}
	let sw = 0;
	const passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();
	const end = passiveSkillIdArray.length;
	for (let i = 0; i < end; i++) {
		if (n_A_PassSkill[i] != 0) {
			sw = 1;
			break;
		}
	}
	if (sw == 0) {
		document.getElementById('A1TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A1used","",0);
	} else {
		document.getElementById('A1TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A1used","　<B>使用中</B>",0);
	}
}
