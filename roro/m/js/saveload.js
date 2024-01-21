




// ★★　VersionModify() 関数の修正も忘れずに　★★

// CURRENT_VERSION = 11;	// ラトリオ様からフォーク
// CURRENT_VERSION = 12;	// オートスペルセーブに対応
// CURRENT_VERSION = 13;	// ランダムオプション正式対応
// CURRENT_VERSION = 14;	// モンスター手入力欄拡張
// CURRENT_VERSION = 15;	// 支援設定欄コンパクション
// CURRENT_VERSION = 16;	// 支援設定欄コンパクション　第二弾
// CURRENT_VERSION = 17;	// オートスペル発動率細分化
// CURRENT_VERSION = 18;	// 性能カスタマイズ再構成・衣装対応
// CURRENT_VERSION = 19;	// 「シェイプシフト」実装漏れ対応
// CURRENT_VERSION = 20;	// 習得スキル設定統一対応
// CURRENT_VERSION = 21;	// オートスペル設定領域不足対応
// CURRENT_VERSION = 22;	// 矢データの整理対応
// CURRENT_VERSION = 23;	// 堕天司祭の闇光外套エンチャントバグ対応
// CURRENT_VERSION = 24;	// ハンマーオブゴッドのクリムゾンマーカー指定欄削除対応
// CURRENT_VERSION = 25;	// スーパーノービス＋スキル変更対応
// CURRENT_VERSION = 26;	// 対プレイヤー設定バイアス追加対応
// CURRENT_VERSION = 27;	// スパノビ＋持続スキルに爆裂波動追加対応
// CURRENT_VERSION = 28;	// エイムドボルト拘束条件削除対応
// CURRENT_VERSION = 29;	// 時限効果設定方法変更対応
// CURRENT_VERSION = 30;	// 星帝等スキル欄整理＆プリ系ＳＷバグ対応
// CURRENT_VERSION = 31;	// 星帝パッシブ光系追加対応
// CURRENT_VERSION = 32;	// ランダムオプション処理変更対応
// CURRENT_VERSION = 33;	// 一部武器の装備職業設定ミス対応
// CURRENT_VERSION = 34;	// 一部ランダムオプション数値設定不要化対応
// CURRENT_VERSION = 35;	// モンスターマップ出力対応
// CURRENT_VERSION = 36;	// 性能カスタマイズ負数対応＆負数表現変更対応
// CURRENT_VERSION = 37;	// 攻撃手段データ構造変更対応
// CURRENT_VERSION = 38;	// モンスターマップ登録ミス対応
// CURRENT_VERSION = 39;	// ファロスエンチャント対応
// CURRENT_VERSION = 40;	// マーシュオブアビスの敵異常への変更対応
// CURRENT_VERSION = 41;	// 一部武器の装備職業設定ミス対応
// CURRENT_VERSION = 42;	// シーズンエンチャントの対象設定ミス対応
// CURRENT_VERSION = 43;	// エンチャントデータ形式移行対応
// CURRENT_VERSION = 44;	// 性能カスタマイズディレイ最低値拡張対応（データ補正はなし）
// CURRENT_VERSION = 45;	// フリッグの歌三次職支援への移動対応
// CURRENT_VERSION = 46;	// 一部データの先行Lv200対応
// CURRENT_VERSION = 47;	// 未実装データの選択不可対応
// CURRENT_VERSION = 48;	// Lv200解放対応
// CURRENT_VERSION = 49;	// 四次職特性ステータス対応
// CURRENT_VERSION = 50;	// 四次職支援対応
// CURRENT_VERSION = 51;	// ウルフオーブエンチャント定義対応
// CURRENT_VERSION = 52;	// Lv240解放
CURRENT_VERSION = 53;	// 特性ステータスセーブ対応
// 旧データ構造は、最大でバージョン 99 まで



/**
 * セーブデータのバージョンを取得する.
 * @param saveDataStr セーブデータ文字列（未加工）
 * @return バージョン
 */
function GetSaveDataVersion(saveDataStr) {

	var versionStr = 0;

	if (saveDataStr.length < 2) {
		return -1;
	}

	versionStr = saveDataStr.substr(0, 2);

	return CSaveDataConverter.ConvertStoN(versionStr);
}



// 対プレイヤー設定用バイアス
SAVE_DATA_BIAS_CONF_PLAYER_500 = 500;

// 対プレイヤー設定バイアス調整対象インデックス配列
BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500 = [
	MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI,
	MOB_CONF_PLAYER_ID_CHUGATA_TAISEI,
	MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI,
	MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI,
	MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI,
	MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI,
	MOB_CONF_PLAYER_ID_BUTSURI_TAISEI,
	MOB_CONF_PLAYER_ID_MAHOU_TAISEI,
	MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI,
/*
現在の対人環境においてFLEEによる回避は現実的ではないので
ATKと合わせて重要度が低いと判断し
RES, MRESに置き換える

	MOB_CONF_PLAYER_ID_STR,
	MOB_CONF_PLAYER_ID_AGI,
*/
	MOB_CONF_PLAYER_ID_RES,
	MOB_CONF_PLAYER_ID_MRES,
	MOB_CONF_PLAYER_ID_VIT,
	MOB_CONF_PLAYER_ID_INT,
	MOB_CONF_PLAYER_ID_DEX,
	MOB_CONF_PLAYER_ID_LUK,
	MOB_CONF_PLAYER_ID_KOGATA_TAISEI,
];





function SaveButton(){

	var expireDateString = "";

	with(document.calcForm){

		var SaveNum = eval(A_SaveSlot.value);

		SaveDataAll[SaveNum] = "" + SaveSystem();

		if(n_CONFIG[2] > 19){
			var w = document.calcForm.SAVE_NAME.value;
			var w2 = document.calcForm.URL_TEXT.value;
			if(w == "delete" && w2 == "delete") SaveDataAll[SaveNum] = "ZZZZ";

//			if(w == "delete all" && w2 == "delete all" && eval(A_youshi.checked)){

			if(w == "delete all" && w2 == "delete all"){
				localStorage.ROratorioDOM_SaveName = "";
				localStorage.ROratorioDOM_SaveData = "";

				expireDateString = GetExpireDateStringToDelete();

				document.cookie = "ROratorioSave" +"="+ wStr +";expires="+ expireDateString;
				document.cookie = "ConfData" +"="+ wStr +";expires="+ expireDateString;
				document.calcForm.SAVE_NAME.value = "全削除完了ブラウザを閉じて終";
				return;
			}
		}

		var wStr = "" + SaveDataAll[0];

		for(var i=1;i<20;i++){
			wStr += "?" + SaveDataAll[i];
		}

		expireDateString = GetExpireDateString();
		document.cookie = "ROratorioSave" +"="+ wStr +";expires="+ expireDateString;

		if(n_CONFIG[2] > 19){
			var wStr = "" + SaveDataAll[0];
			for(var i=1;i<=500;i++){
				wStr += "?" + SaveDataAll[i];
			}
			localStorage.ROratorioDOM_SaveData = wStr;
			SaveNameAll[SaveNum] = document.calcForm.SAVE_NAME.value;
			if(SaveNameAll[SaveNum] == "名前入力可能" || SaveNameAll[SaveNum] == "" || (SaveNameAll[SaveNum] == "delete" && document.calcForm.URL_TEXT.value == "delete")) SaveNameAll[SaveNum] = "ZZZZ";
			var wNameX = new Array();
			var wNameCH = 0;
			for(var i=0;i<SaveNameAll[SaveNum].length;i++){
				wNameX[i] = SaveNameAll[SaveNum].charAt(i);
				if(wNameX[i] == "|"){
					wNameX[i] = "l";
					wNameCH = 1;
				}
			}
			if(wNameCH == 1){
				for(var i=1;i<wNameX.length;i++) wNameX[0] += wNameX[i];
				SaveNameAll[SaveNum] = wNameX[0];
			}
			var wStr2 = "" + SaveNameAll[0];
			for(var i=1;i<=500;i++){
				wStr2 += "|" + SaveNameAll[i];
			}
			localStorage.ROratorioDOM_SaveName = wStr2;
		}

		LoadCookie3();
		A_SaveSlot.value = SaveNum;
	}
}

/**
 * Cookie の有効期限を示す文字列を取得する.
 * @param dtBase 有効期限の基準日付
 */
function GetExpireDateString(dtBase) {

	if (dtBase === undefined) {
		dtBase = new Date();
	}

	return GetExpireDateStringSub(dtBase, 99000);
}

/**
 * Cookie の有効期限を示す文字列を取得する（削除用）.
 * @param dtBase 有効期限の基準日付
 */
function GetExpireDateStringToDelete(dtBase) {

	if (dtBase === undefined) {
		dtBase = new Date();
	}

	return GetExpireDateStringSub(dtBase, 0);
}

/**
 * Cookie の有効期限を示す文字列を取得する（処理本体）.
 * @param dtBase 有効期限の基準日付
 */
function GetExpireDateStringSub(dtBase, daysToExpire) {

	var dtExpire = null;

	dtExpire = new Date(dtBase.getTime() + (1000 * 60 * 60 * 24 * daysToExpire));

	return dtExpire.toUTCString();
}






function URLOUT(){
	calc();
	var w = location.href.split("?");

	with(document.calcForm){
		URL_TEXT.value = w[0] +"?"+ SaveSystem();
	}
}






/**
 * データＵＲＬを生成する.
 */
function SaveSystem(funcSaveDataModify = null){

	var idx = 0;
	var idxLoop = 0;
	var idxOffset = 0;

	var loopInfoArray = null;

	var objidPrifix = "";
	var objidKind = "";
	var objidValue = "";

	var valueWork = 0;
	var attackMethodConf = null;

	var saveDataMappingArray = null;



	// データ長定義を取得
	saveDataMappingArray = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);

	// セーブデータの初期化
	SaveData = new Array();
	for (idx = 0; idx < saveDataMappingArray.length; idx++) {
		SaveData[idx] = 0;
	}

	with(document.calcForm){

		//----------------------------------------------------------------
		// [0000 - 0000] バージョン情報
		//----------------------------------------------------------------

		SaveData[0] = CURRENT_VERSION;

		//----------------------------------------------------------------
		// [0001 - 0013] 基本情報
		//----------------------------------------------------------------

		// 基本情報
		SaveData[1] = eval(A_JOB.value);
		SaveData[2] = eval(A_BaseLV.value);
		SaveData[3] = eval(A_JobLV.value);
		SaveData[4] = eval(A_STR.value);
		SaveData[5] = eval(A_AGI.value);
		SaveData[6] = eval(A_VIT.value);
		SaveData[7] = eval(A_DEX.value);
		SaveData[8] = eval(A_INT.value);
		SaveData[9] = eval(A_LUK.value);

		// 敵ＩＤ
		SaveData[10] = CMonsterMapAreaComponentManager.GetMonsterId();

		// 自動レベル調整
		SaveData[11] = eval(BLVauto.checked);

		// 矢、弾丸
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_THIEF
			|| GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ARCHER
			|| (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_GUNSLINGER)) {
			SaveData[12] = HtmlGetObjectValueById("OBJID_SELECT_ARROW", ARROW_ID_NONE);
		}

		// 速度ＰＯＴ
		SaveData[13] = eval(A_SpeedPOT.value);

		//----------------------------------------------------------------
		// [0014 - 0074] 装備情報
		//----------------------------------------------------------------

		// 右手武器情報
		SaveData[14] = eval(A_Weapon_zokusei.value);
		SaveData[15] = eval(A_Weapon_ATKplus.value);
		SaveData[16] = GetStatefullData("DATA_OBJID_ARMS_RIGHT", 0);
		SaveData[17] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_1", 0);
		SaveData[18] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_2", 0);
		SaveData[19] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_3", 0);
		SaveData[20] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_4", 0);

		// 左手武器情報（二刀流時のみ）
		if(n_Nitou){
			SaveData[21] = eval(A_Weapon2_ATKplus.value);
			SaveData[22] = GetStatefullData("DATA_OBJID_ARMS_LEFT", 0);
			SaveData[23] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_1", 0);
			SaveData[24] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_2", 0);
			SaveData[25] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_3", 0);
			SaveData[26] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_4", 0);
		}

		// 盾情報
		else{
			SaveData[21] = eval(A_SHIELD_DEF_PLUS.value);
			SaveData[22] = GetStatefullData("DATA_OBJID_SHIELD", 0);
			SaveData[23] = GetStatefullData("DATA_OBJID_SHIELD_CARD_1", 0);
			SaveData[24] = GetStatefullData("DATA_OBJID_SHIELD_CARD_2", 0);
			SaveData[25] = GetStatefullData("DATA_OBJID_SHIELD_CARD_3", 0);
			SaveData[26] = GetStatefullData("DATA_OBJID_SHIELD_CARD_4", 0);
		}

		// 頭上段情報
		SaveData[27] = eval(A_HEAD_DEF_PLUS.value);
		SaveData[28] = GetStatefullData("DATA_OBJID_HEAD_TOP", 0);
		SaveData[29] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_1", 0);
		SaveData[30] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_2", 0);
		SaveData[31] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_3", 0);
		SaveData[32] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_4", 0);
		SaveData[33] = 0;

		// 頭中段情報
		SaveData[34] = GetStatefullData("DATA_OBJID_HEAD_MID", 0);
		SaveData[35] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_1", 0);
		SaveData[36] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_2", 0);
		SaveData[37] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_3", 0);
		SaveData[38] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_4", 0);
		SaveData[39] = 0;

		// 頭下段情報
		SaveData[40] = GetStatefullData("DATA_OBJID_HEAD_UNDER", 0);
		SaveData[41] = n_A_card[32];
		SaveData[42] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_2", 0);
		SaveData[43] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_3", 0);
		SaveData[44] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_4", 0);

		// 体防具情報
		SaveData[45] = eval(A_BODY_DEF_PLUS.value);
		SaveData[46] = GetStatefullData("DATA_OBJID_BODY", 0);
		SaveData[47] = GetStatefullData("DATA_OBJID_BODY_CARD_1", 0);
		SaveData[48] = GetStatefullData("DATA_OBJID_BODY_CARD_2", 0);
		SaveData[49] = GetStatefullData("DATA_OBJID_BODY_CARD_3", 0);
		SaveData[50] = GetStatefullData("DATA_OBJID_BODY_CARD_4", 0);

		// 肩防具情報
		SaveData[51] = eval(A_SHOULDER_DEF_PLUS.value);
		SaveData[52] = GetStatefullData("DATA_OBJID_SHOULDER", 0);
		SaveData[53] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_1", 0);
		SaveData[54] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_2", 0);
		SaveData[55] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_3", 0);
		SaveData[56] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_4", 0);

		// 靴防具情報
		SaveData[57] = eval(A_SHOES_DEF_PLUS.value);
		SaveData[58] = GetStatefullData("DATA_OBJID_SHOES", 0);
		SaveData[59] = GetStatefullData("DATA_OBJID_SHOES_CARD_1", 0);
		SaveData[60] = GetStatefullData("DATA_OBJID_SHOES_CARD_2", 0);
		SaveData[61] = GetStatefullData("DATA_OBJID_SHOES_CARD_3", 0);
		SaveData[62] = GetStatefullData("DATA_OBJID_SHOES_CARD_4", 0);
		SaveData[63] = 0;

		// アクセサリ１情報
		SaveData[64] = GetStatefullData("DATA_OBJID_ACCESSARY_1", 0);
		SaveData[65] = GetStatefullData("DATA_OBJID_ACCESSARY_1_CARD_1", 0);
		SaveData[66] = GetStatefullData("DATA_OBJID_ACCESSARY_1_CARD_2", 0);
		SaveData[67] = GetStatefullData("DATA_OBJID_ACCESSARY_1_CARD_3", 0);
		SaveData[68] = GetStatefullData("DATA_OBJID_ACCESSARY_1_CARD_4", 0);
		SaveData[69] = 0;

		// アクセサリ２情報
		SaveData[70] = GetStatefullData("DATA_OBJID_ACCESSARY_2", 0);
		SaveData[71] = GetStatefullData("DATA_OBJID_ACCESSARY_2_CARD_1", 0);
		SaveData[72] = GetStatefullData("DATA_OBJID_ACCESSARY_2_CARD_2", 0);
		SaveData[73] = GetStatefullData("DATA_OBJID_ACCESSARY_2_CARD_3", 0);
		SaveData[74] = GetStatefullData("DATA_OBJID_ACCESSARY_2_CARD_4", 0);


		//----------------------------------------------------------------
		// [0075 - 0174] パッシブスキル
		//----------------------------------------------------------------
		var passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();
		for (idx = 0; idx < passiveSkillIdArray.length; idx++) {
			SaveData[75 + idx] = n_A_PassSkill[idx];
		}


		//----------------------------------------------------------------
		// [0175 - 0274] 基本支援
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataIchizi.length; idx++){
			SaveData[175 + idx] = g_confDataIchizi[idx];
		}


		//----------------------------------------------------------------
		// [0275] 未使用（旧養子情報）
		//----------------------------------------------------------------


		//----------------------------------------------------------------
		// [0276 - 0285] 攻撃手段
		//----------------------------------------------------------------
		attackMethodConf = CAttackMethodAreaComponentManager.GetAttackMethodConf();

		SaveData[276] = attackMethodConf.GetSkillId();
		SaveData[277] = attackMethodConf.GetSourceType();
		SaveData[278] = attackMethodConf.GetSkillLv();

		for (idx = 0; idx < Math.min(5, attackMethodConf.GetOptionValueCount()); idx++){
			SaveData[279 + idx] = attackMethodConf.GetOptionValue(idx);
		}

		//----------------------------------------------------------------
		// [0286 - 0366] モンスター状態異常
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_IJYOU.length; idx++) {
			SaveData[286 + idx] = n_B_IJYOU[idx];
		}


		//----------------------------------------------------------------
		// [0367 - 0447] モンスター状態強化
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_KYOUKA.length; idx++) {
			SaveData[367 + idx] = n_B_KYOUKA[idx];
		}


		//----------------------------------------------------------------
		// [0448 - 0508] 支援スキル３
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill3.length; idx++) {
			SaveData[448 + idx] = n_A_PassSkill3[idx];
		}


		//----------------------------------------------------------------
		// [0509 - 0558] 支援スキル４
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill4.length; idx++) {
			SaveData[509 + idx] = n_A_PassSkill4[idx];
		}


		//----------------------------------------------------------------
		// [0559 - 0605] 未使用（旧支援スキル５）
		//----------------------------------------------------------------
		// 仕様変更（オートスペル設定）


		//----------------------------------------------------------------
		// [0606 - 0608] 未使用（旧衣装）
		//----------------------------------------------------------------
//		SaveData[608] = eval(A_isyou3.value);


		//----------------------------------------------------------------
		// [0609 - 0658] 二次職支援
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataNizi.length; idx++) {
			SaveData[609 + idx] = g_confDataNizi[idx];
		}


		//----------------------------------------------------------------
		// [0659 - 0729] 支援スキル７
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill7.length; idx++) {
			SaveData[659 + idx] = n_A_PassSkill7[idx];
		}


		//----------------------------------------------------------------
		// [0730 - 0799] 支援スキル８
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill8.length; idx++) {
			SaveData[730 + idx] = n_A_PassSkill8[idx];
		}


		//----------------------------------------------------------------
		// [0800 - 0849] キャラクター状態異常
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_IJYOU.length; idx++) {
			SaveData[800 + idx] = n_A_IJYOU[idx];
		}


		//----------------------------------------------------------------
		// [0850 - 0902] 対プレイヤー設定
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_TAISEI.length; idx++) {
			valueWork = n_B_TAISEI[idx];

			if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
				valueWork = CSaveDataConverter.ConvertSignedToUnsigned(valueWork, saveDataMappingArray[850 + idx]);
			}

			SaveData[850 + idx] = valueWork;
		}


		//----------------------------------------------------------------
		// [0903 - 0942] 旧　支援スキル９（性能カスタマイズ１）　現在未使用
		//----------------------------------------------------------------
		for (idx = 0; idx < 40; idx++) {
			SaveData[903 + idx] = 0;
		}


		//----------------------------------------------------------------
		// [0943 - 0970] 旧　支援スキル１０（性能カスタマイズ２）　現在未使用
		//----------------------------------------------------------------
		for (idx = 0; idx < 18; idx++) {
			SaveData[943 + idx] = 0;
		}


		//----------------------------------------------------------------
		// [0971 - 0999] モンスター手入力欄データ
		// [1420 - 1479] モンスター手入力欄データ拡張
		//----------------------------------------------------------------

		SaveData[971 + 0] = 0;
		SaveData[971 + 1] = 1;
		SaveData[971 + 2] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LV);
		SaveData[971 + 3] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP) % 100000;
		SaveData[971 + 22] = Math.floor(GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP) / 100000);

		// STR ～ LUK
		for (idx = 4; idx <= 9; idx++) {
			valueWork = GetMobConfInput(idx);
			if (valueWork > 2000) {		// 旧最大値以上ならば、拡張データと判断
				SaveData[971 + idx] = 2222;
				SaveData[1460 + (idx - 4) * 2] = valueWork % 100000;
				SaveData[1460 + (idx - 4) * 2 + 1] = Math.floor(valueWork / 100000);
			}
			else {
				SaveData[971 + idx] = valueWork;
			}
		}

		// ATK, MATK
		for (idx = 10; idx <= 11; idx++) {
			valueWork = GetMobConfInput(idx);
			if (valueWork > 99999) {	// 旧最大値以上ならば、拡張データと判断
				SaveData[971 + idx] = 111111;
				SaveData[1460 + (idx - 4) * 2] = valueWork % 100000;
				SaveData[1460 + (idx - 4) * 2 + 1] = Math.floor(valueWork / 100000);
			}
			else {
				SaveData[971 + idx] = valueWork;
			}
		}

		SaveData[971 + 12] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RANGE);

		// DEF, MDEF
		for (idx = 13; idx <= 14; idx++) {
			valueWork = GetMobConfInput(idx);
			if (valueWork > 99999) {	// 旧最大値以上ならば、拡張データと判断
				SaveData[971 + idx] = 111111;
				SaveData[1460 + (idx - 5) * 2] = valueWork % 100000;
				SaveData[1460 + (idx - 5) * 2 + 1] = Math.floor(valueWork / 100000);
			}
			else {
				SaveData[971 + idx] = valueWork;
			}
		}

		SaveData[971 + 15] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BASE_EXP) % 100000;
		SaveData[971 + 23] = Math.floor(GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BASE_EXP) / 100000);

		SaveData[971 + 16] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_JOB_EXP) % 100000;
		SaveData[971 + 24] = Math.floor(GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_JOB_EXP) / 100000);

		SaveData[971 + 17] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_SIZE);
		SaveData[971 + 18] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_ELEMENT);
		SaveData[971 + 19] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RACE);
		SaveData[971 + 20] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE);
		SaveData[971 + 21] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE);

		SaveData[971 + 23] = 0;
		SaveData[971 + 24] = 0;
		SaveData[971 + 25] = 0;
		SaveData[971 + 26] = 0;
		SaveData[971 + 27] = 0;
		SaveData[971 + 28] = 0;
		SaveData[971 + 29] = 0;

		//----------------------------------------------------------------
		// [1000 - 1059] オートスペル設定欄データ（旧）
		//----------------------------------------------------------------
		// 仕様変更（オートスペル設定）

		//----------------------------------------------------------------
		// [1060 - 1259] 習得スキル
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_LearnedSkill.length; idx++) {
			SaveData[1060 + idx] = n_A_LearnedSkill[idx];
		}

		//----------------------------------------------------------------
		// [1260 - 1459] ランダムオプション
		//----------------------------------------------------------------
		if (n_Nitou) {
			loopInfoArray = [
				EQUIP_REGION_ID_ARMS,
				EQUIP_REGION_ID_ARMS_LEFT,
				EQUIP_REGION_ID_HEAD_TOP,
				EQUIP_REGION_ID_HEAD_MID,
				EQUIP_REGION_ID_HEAD_UNDER,
				EQUIP_REGION_ID_BODY,
				EQUIP_REGION_ID_SHOULDER,
				EQUIP_REGION_ID_SHOES,
				EQUIP_REGION_ID_ACCESSARY_1,
				EQUIP_REGION_ID_ACCESSARY_2,
			];
		}
		else {
			loopInfoArray = [
				EQUIP_REGION_ID_ARMS,
				EQUIP_REGION_ID_SHIELD,
				EQUIP_REGION_ID_HEAD_TOP,
				EQUIP_REGION_ID_HEAD_MID,
				EQUIP_REGION_ID_HEAD_UNDER,
				EQUIP_REGION_ID_BODY,
				EQUIP_REGION_ID_SHOULDER,
				EQUIP_REGION_ID_SHOES,
				EQUIP_REGION_ID_ACCESSARY_1,
				EQUIP_REGION_ID_ACCESSARY_2,
			];
		}

		for (idxLoop = 0; idxLoop < loopInfoArray.length; idxLoop++) {

			idxOffset = 20 * idxLoop;

			for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {
				SaveData[1260 + idxOffset + idx * 2] = GetEquipRndOptTableKind(loopInfoArray[idxLoop], idx);
				SaveData[1260 + idxOffset + idx * 2 + 1] = GetEquipRndOptTableValue(loopInfoArray[idxLoop], idx);
			}
		}

		//----------------------------------------------------------------
		// [1480 - 1579] 三次職支援
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataSanzi.length; idx++) {
			SaveData[1480 + idx] = g_confDataSanzi[idx];
		}

		//----------------------------------------------------------------
		// [1580 - 1609] 性能カスタマイズ（ステータス関連）
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomStatus.length; idx++) {
			SaveData[1580 + idx] = CSaveDataConverter.ConvertSignedToUnsigned(g_confDataCustomStatus[idx], saveDataMappingArray[1580 + idx]);
		}

		//----------------------------------------------------------------
		// [1610 - 1639] 性能カスタマイズ（攻撃関連）
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomAtk.length; idx++) {
			SaveData[1610 + idx] = CSaveDataConverter.ConvertSignedToUnsigned(g_confDataCustomAtk[idx], saveDataMappingArray[1610 + idx]);
		}

		//----------------------------------------------------------------
		// [1640 - 1659] 性能カスタマイズ（防御関連）
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomDef.length; idx++) {
			SaveData[1640 + idx] = CSaveDataConverter.ConvertSignedToUnsigned(g_confDataCustomDef[idx], saveDataMappingArray[1640 + idx]);
		}

		//----------------------------------------------------------------
		// [1660 - 1679] 性能カスタマイズ（スキル関連）
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomSkill.length; idx++) {
			SaveData[1660 + idx] = CSaveDataConverter.ConvertSignedToUnsigned(g_confDataCustomSkill[idx], saveDataMappingArray[1660 + idx]);
		}

		//----------------------------------------------------------------
		// [1680 - 1690] 衣装
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_costume.length; idx++) {
			SaveData[1680 + idx] = n_A_costume[idx];
		}

		//----------------------------------------------------------------
		// [1691 - 1750] オートスペル設定欄データ
		//----------------------------------------------------------------
		for (idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
			SaveData[1691 + 3 * idx + 0] = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx];
			SaveData[1691 + 3 * idx + 1] = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx];
			SaveData[1691 + 3 * idx + 2] = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx];
		}

		//----------------------------------------------------------------
		// [1751 - 1770] 時限効果設定
		//----------------------------------------------------------------
		for (idx = 0; idx < g_timeItemConf.length; idx++) {
			SaveData[1751 + idx] = g_timeItemConf[idx];
		}

		//----------------------------------------------------------------
		// [1771 - 1780] モンスターマップ設定
		//----------------------------------------------------------------
		SaveData[1771] = CMonsterMapAreaComponentManager.GetCategoryId();
		SaveData[1772] = CMonsterMapAreaComponentManager.GetMapId();
		for (idx = 1773; idx <= 1780; idx++) {
			SaveData[idx] = 0;
		}

		//----------------------------------------------------------------
		// [1781 - 1820] エンチャントリストID
		//----------------------------------------------------------------
		for (idx = 0; idx < (4 * 10); idx++) {
			SaveData[1781 + idx] = 0;
		}
		g_charaData.cardCategoryMap.forEach(
			function (valueF, keyF, mapF) {

				switch ("" + keyF) {

				case "ARMS_RIGHT":
					idxOffset = 1781;
					break;
				case "ARMS_LEFT":
				case "SHIELD":
					idxOffset = 1785;
					break;
				case "HEAD_TOP":
					idxOffset = 1789;
					break;
				case "HEAD_MID":
					idxOffset = 1793;
					break;
				case "HEAD_UNDER":
					idxOffset = 1797;
					break;
				case "BODY":
					idxOffset = 1801;
					break;
				case "SHOULDER":
					idxOffset = 1805;
					break;
				case "SHOES":
					idxOffset = 1809;
					break;
				case "ACCESSARY_1":
					idxOffset = 1813;
					break;
				case "ACCESSARY_2":
					idxOffset = 1817;
					break;

				default:
					return;
				}

				for (idx = 0; idx < Math.min(4, valueF.length); idx++) {
					SaveData[idxOffset + idx] = valueF[idx];
				}
			}
		);

		//----------------------------------------------------------------
		// [1821 - 1830] 特性ステータス（予備領域含む）
		//----------------------------------------------------------------
		// TODO: 本来は変数から読み取るべきだが、移行過渡期で実装が追い付いていないので、ダイレクトに取得
		SaveData[1821] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_POW", 0);
		SaveData[1822] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STA", 0);
		SaveData[1823] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_WIS", 0);
		SaveData[1824] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_SPL", 0);
		SaveData[1825] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CON", 0);
		SaveData[1826] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CRT", 0);
		SaveData[1827] = 0;
		SaveData[1828] = 0;
		SaveData[1829] = 0;
		SaveData[1830] = 0;

		//----------------------------------------------------------------
		// [1831 - 1860] 四次職支援
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataYozi.length; idx++) {
			SaveData[1831 + idx] = g_confDataYozi[idx];
		}

		//----------------------------------------------------------------
		// [1861 - 1880] 性能カスタマイズ（特性ステータス関連）
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomSpecStatus.length; idx++) {
			SaveData[1861 + idx] = CSaveDataConverter.ConvertSignedToUnsigned(g_confDataCustomSpecStatus[idx], saveDataMappingArray[1861 + idx]);
		}



	}



	//----------------------------------------------------------------
	// 外部関数によるデータ補正
	//----------------------------------------------------------------
	if (funcSaveDataModify) {
		SaveData = funcSaveDataModify(SaveData);
	}



	//----------------------------------------------------------------
	// データ補正
	//----------------------------------------------------------------
	for (idx = 0; idx < SaveData.length; idx++) {
		if(SaveData[idx] == true) {
			SaveData[idx] = 1;
		}
		else if(SaveData[idx] == false) {
			SaveData[idx] = 0;
		}
	}


	//----------------------------------------------------------------
	// データ変換
	//----------------------------------------------------------------
	for (idx = 0; idx < SaveData.length; idx++) {
		SaveData[idx] = CSaveDataConverter.ConvertNtoS(SaveData[idx], saveDataMappingArray[idx]);
	}

	return NumA(SaveData);
}





function VersionModify(saveDataArray) {

	var idx = 0;
	var idxOld = 0;
	var idxNew = 0;
	var regionLength = 0;
	var val = 0;
	var valueOld = 0;
	var valueNew = 0;
	var arrayWork = null;
	var saveDataMappingArray = null;

	var savedVersion = saveDataArray[0];


	switch (savedVersion) {
	case CURRENT_VERSION:
		break;

	case 0:
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
	case 7:
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
	case 13:
	case 14:

		//----------------------------------------------------------------
		// モンスター手入力設定のデフォルト値変換処理削除
		//----------------------------------------------------------------
		for (idx = 1; idx <= 16; idx++) {
			if (saveDataArray[971 +  idx] == 0) {
				saveDataArray[971 +  idx] = 1;
			}
		}

		//----------------------------------------------------------------
		// モンスター手入力設定の属性項目、定義値変更
		//----------------------------------------------------------------
		val = saveDataArray[971 +  18];
		saveDataArray[971 +  18] = (val % 4) * 10 + ((val % 4) + 1);

		//----------------------------------------------------------------
		// 支援欄のコンパクションに伴う、セーブデータインデックス変更
		//----------------------------------------------------------------
		saveDataArray[1480 +  3] = saveDataArray[ 609 +  7];		// ストライキング
		saveDataArray[1480 +  4] = saveDataArray[ 609 +  8];		// ストライキング用付与スキル合計
		saveDataArray[1480 + 11] = saveDataArray[ 609 + 10];		// 術式-展開-
		saveDataArray[1480 +  1] = saveDataArray[ 609 + 11];		// ファイティングスピリット
		saveDataArray[1480 +  6] = saveDataArray[ 609 + 12];		// オーディンの力
		saveDataArray[1480 +  7] = saveDataArray[ 609 + 13];		// エピクレシス
		saveDataArray[1480 +  8] = saveDataArray[ 609 + 14];		// サクラメント
		saveDataArray[1480 +  9] = saveDataArray[ 609 + 15];		// ラウダアグヌス
		saveDataArray[1480 + 10] = saveDataArray[ 609 + 16];		// ラウダラムス
		saveDataArray[1480 + 12] = saveDataArray[ 609 + 17];		// 分身
		saveDataArray[1480 +  5] = saveDataArray[ 609 + 18];		// エクスピアティオ
		saveDataArray[1480 +  0] = saveDataArray[ 609 + 20];		// ジャイアントグロース
		saveDataArray[1480 + 13] = saveDataArray[ 609 + 21];		// ペインキラー
		saveDataArray[1480 + 14] = saveDataArray[ 609 + 30];		// ペインキラー　BaseLv
		saveDataArray[1480 + 15] = saveDataArray[ 609 + 41];		// エビ三昧
		saveDataArray[1480 + 16] = saveDataArray[ 609 + 42];		// グルーミング/のどを鳴らす
		saveDataArray[1480 + 17] = saveDataArray[ 609 + 44];		// エビパーティー
		saveDataArray[1480 + 18] = saveDataArray[ 609 + 45];		// エビパーティー用海の魂Lv
		saveDataArray[1480 + 19] = saveDataArray[ 609 + 47];		// チャタリング/ミャウミャウ
		saveDataArray[1480 + 20] = saveDataArray[ 609 + 48];		// アクラウスダッシュ
		saveDataArray[1480 + 21] = saveDataArray[ 609 + 49];		// 警戒

		saveDataArray[ 609 +  7] = saveDataArray[ 609 +  9];		// カイト

		// 移行した場所はクリア
		saveDataArray[609 + 8] = 0;
		saveDataArray[609 + 9] = 0;
		for (idx = 10; idx < 50; idx++) {
			saveDataArray[609 + idx] = 0;
		}

	case 15:

		//----------------------------------------------------------------
		// 支援欄のコンパクションに伴う、セーブデータインデックス変更
		//----------------------------------------------------------------

		var dt609_2 = saveDataArray[ 609 +  2];		// マーダラーボーナス
		var dt609_3 = saveDataArray[ 609 +  3];		// 集中力向上(アイテム)
		var dt609_4 = saveDataArray[ 609 +  4];		// 支援マインドブレイカー
		var dt609_5 = saveDataArray[ 609 +  5];		// 支援プロボック
		var dt609_6 = saveDataArray[ 609 +  6];		// 聖体降福
		var dt609_7 = saveDataArray[ 609 +  7];		// カイト

//		saveDataArray[ 175 +  0] = saveDataArray[ 175 +  0];		// ブレッシング
//		saveDataArray[ 175 +  1] = saveDataArray[ 175 +  1];		// 速度増加
		saveDataArray[ 609 +  5] = saveDataArray[ 175 +  2];		// イムポシティオマヌス
		saveDataArray[ 609 +  7] = saveDataArray[ 175 +  3];		// グロリア
		saveDataArray[ 175 +  2] = saveDataArray[ 175 +  4];		// エンジェラス
		saveDataArray[ 609 +  8] = saveDataArray[ 175 +  5];		// アスムプティオ
		saveDataArray[ 609 +  9] = saveDataArray[ 175 +  6];		// アドレナリンラッシュ
		saveDataArray[ 609 + 10] = saveDataArray[ 175 +  7];		// ウェポンパーフェクション
		saveDataArray[ 609 + 11] = saveDataArray[ 175 +  8];		// オーバートラスト
		saveDataArray[ 609 + 12] = saveDataArray[ 175 +  9];		// ウィンドウォーク
		saveDataArray[ 609 + 13] = saveDataArray[ 175 + 10];		// 気功
		saveDataArray[ 175 +  3] = saveDataArray[ 175 + 11];		// マグナムブレイク状態
//		saveDataArray[ 175 +  0] = saveDataArray[ 175 + 12];		// 未使用　→　削除する
		saveDataArray[ 609 +  6] = saveDataArray[ 175 + 13];		// サフラギウム
		saveDataArray[ 609 + 14] = saveDataArray[ 175 + 14];		// プロヴィデンス

//		saveDataArray[ 609 +  0] = saveDataArray[ 609 +  0];		// 属性場　種類
//		saveDataArray[ 609 +  1] = saveDataArray[ 609 +  1];		// 属性場　レベル
		saveDataArray[ 175 +  5] = dt609_2;		// マーダラーボーナス
		saveDataArray[ 175 +  6] = dt609_3;		// 集中力向上(アイテム)
		saveDataArray[ 609 +  2] = dt609_4;		// 支援マインドブレイカー
		saveDataArray[ 175 +  4] = dt609_5;		// 支援プロボック
		saveDataArray[ 609 +  3] = dt609_6;		// 聖体降福
		saveDataArray[ 609 +  4] = dt609_7;		// カイト

		// 移行した場所はクリア
		for (idx = 7; idx <= 14; idx++) {
			saveDataArray[ 175 + idx] = 0;
		}

	case 16:

		//----------------------------------------------------------------
		// オートスペル発動率細分化に伴う、セーブデータ値の変更
		//----------------------------------------------------------------

		var asprobOld = [
			0
			,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10
			,  15,  20,  25,  30,  40,  50,  60,  70,  80,  90
			, 100, 120, 140, 150, 160, 180, 200, 250, 300, 350
			, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850
			, 900, 950,1000
		];

		for (idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {

			// 元のデータ値のインデックスを特定
			idxOld = saveDataArray[1000 + 3 * idx + 2];
			if (idxOld >= asprobOld.length) {
				continue;
			}

			// インデックスから値に変換
			valueOld = asprobOld[idxOld];

			// 値から新しい配列でのインデックスを特定
			for (idxNew = 0; idxNew < AUTO_SPELL_PROB_ARRAY.length; idxNew++) {
				if (valueOld == AUTO_SPELL_PROB_ARRAY[idxNew]) {
					// データ書き換え
					saveDataArray[1000 + 3 * idx + 2] = idxNew;
					break;
				}
			}
		}

	case 17:

		//----------------------------------------------------------------
		// 性能カスタマイズ再構成に伴う、セーブデータインデックス変更
		//----------------------------------------------------------------

		var dt903_00 = saveDataArray[ 903 +  0 ];		// 無効化フラグ
		var dt903_01 = saveDataArray[ 903 +  1 ];		// 武器ATK変更
		var dt903_02 = saveDataArray[ 903 +  2 ];		// 武器MATK変更
		var dt903_03 = saveDataArray[ 903 +  3 ];		// 武器Lv変更
		var dt903_04 = saveDataArray[ 903 +  4 ];		// STR+
		var dt903_05 = saveDataArray[ 903 +  5 ];		// AGI+
		var dt903_06 = saveDataArray[ 903 +  6 ];		// VIT+
		var dt903_07 = saveDataArray[ 903 +  7 ];		// INT+
		var dt903_08 = saveDataArray[ 903 +  8 ];		// DEX+
		var dt903_09 = saveDataArray[ 903 +  9 ];		// LUK+

		var dt903_10 = saveDataArray[ 903 + 10 ];		// HIT+
		var dt903_11 = saveDataArray[ 903 + 11 ];		// CRI+
		var dt903_12 = saveDataArray[ 903 + 12 ];		// （欠番）
		var dt903_13 = saveDataArray[ 903 + 13 ];		// （欠番）
		var dt903_14 = saveDataArray[ 903 + 14 ];		// ASPD+%
		var dt903_15 = saveDataArray[ 903 + 15 ];		// ASPD+(固定値+)
		var dt903_16 = saveDataArray[ 903 + 16 ];		// 変動詠唱時間短縮
		var dt903_17 = saveDataArray[ 903 + 17 ];		// ATK+
		var dt903_18 = saveDataArray[ 903 + 18 ];		// 物理攻撃時に与えるダメージ上昇
		var dt903_19 = saveDataArray[ 903 + 19 ];		// 物理攻撃時に○形(種族)に与えるダメージ上昇

		var dt903_20 = saveDataArray[ 903 + 20 ];		// 物理攻撃時に○属性に与えるダメージ上昇
		var dt903_21 = saveDataArray[ 903 + 21 ];		// 物理攻撃時に○型サイズに与えるダメージ上昇
		var dt903_22 = saveDataArray[ 903 + 22 ];		// 遠距離物理攻撃時に与えるダメージ上昇
		var dt903_23 = saveDataArray[ 903 + 23 ];		// クリティカル攻撃で与えるダメージ上昇
		var dt903_24 = saveDataArray[ 903 + 24 ];		// 地域特化&特定グループ特化
		var dt903_25 = saveDataArray[ 903 + 25 ];		// ○○スキルで攻撃時ダメージ上昇
		var dt903_26 = saveDataArray[ 903 + 26 ];		// MATK+
		var dt903_27 = saveDataArray[ 903 + 27 ];		// 魔法攻撃時に与えるダメージ上昇(旧Matk+X%)
		var dt903_28 = saveDataArray[ 903 + 28 ];		// 魔法攻撃時に○種族に与えるダメージ上昇
		var dt903_29 = saveDataArray[ 903 + 29 ];		// 魔法攻撃時に○属性に与えるダメージ上昇

		var dt903_30 = saveDataArray[ 903 + 30 ];		// 自分の魔法が○属性ならダメージ上昇
		var dt903_31 = saveDataArray[ 903 + 31 ];		// 未使用
		var dt903_32 = saveDataArray[ 903 + 32 ];		// 未使用
		var dt903_33 = saveDataArray[ 903 + 33 ];		// 未使用
		var dt903_34 = saveDataArray[ 903 + 34 ];		// 未使用
		var dt903_35 = saveDataArray[ 903 + 35 ];		// 未使用
		var dt903_36 = saveDataArray[ 903 + 36 ];		// 未使用
		var dt903_37 = saveDataArray[ 903 + 37 ];		// 未使用
		var dt903_38 = saveDataArray[ 903 + 38 ];		// 未使用
		var dt903_39 = saveDataArray[ 903 + 39 ];		// 未使用

		// ここから性能カスタマイズ２

		var dt903_40 = saveDataArray[ 903 + 40 ];		// 無効化フラグ
		var dt903_41 = saveDataArray[ 903 + 41 ];		// MaxHP+ (max99999)
		var dt903_42 = saveDataArray[ 903 + 42 ];		// （欠番）
		var dt903_43 = saveDataArray[ 903 + 43 ];		// MaxHP+%
		var dt903_44 = saveDataArray[ 903 + 44 ];		// MaxSP+ (max99999)
		var dt903_45 = saveDataArray[ 903 + 45 ];		// （欠番）
		var dt903_46 = saveDataArray[ 903 + 46 ];		// MaxSP+%
		var dt903_47 = saveDataArray[ 903 + 47 ];		// DEF+
		var dt903_48 = saveDataArray[ 903 + 48 ];		// MDEF+
		var dt903_49 = saveDataArray[ 903 + 49 ];		// HP自然回復力+%

		var dt903_50 = saveDataArray[ 903 + 50 ];		// SP自然回復力+%
		var dt903_51 = saveDataArray[ 903 + 51 ];		// ヒール系回復力+%
		var dt903_52 = saveDataArray[ 903 + 52 ];		// 敵のDEFをX%無視する
		var dt903_53 = saveDataArray[ 903 + 53 ];		// 敵のMDEFをX%無視する
		var dt903_54 = saveDataArray[ 903 + 54 ];		// FLEE+
		var dt903_55 = saveDataArray[ 903 + 55 ];		// 完全回避+
		var dt903_56 = saveDataArray[ 903 + 56 ];		// 未使用
		var dt903_57 = saveDataArray[ 903 + 57 ];		// 未使用
		var dt903_58 = saveDataArray[ 903 + 58 ];		// 未使用
		var dt903_59 = saveDataArray[ 903 + 59 ];		// 未使用

		var dt903_60 = saveDataArray[ 903 + 60 ];		// 未使用
		var dt903_61 = saveDataArray[ 903 + 61 ];		// 未使用
		var dt903_62 = saveDataArray[ 903 + 62 ];		// 未使用
		var dt903_63 = saveDataArray[ 903 + 63 ];		// 未使用
		var dt903_64 = saveDataArray[ 903 + 64 ];		// 未使用
		var dt903_65 = saveDataArray[ 903 + 65 ];		// 未使用
		var dt903_66 = saveDataArray[ 903 + 66 ];		// 未使用
		var dt903_67 = saveDataArray[ 903 + 67 ];		// 未使用

		// 移行した場所はクリア
		for (idx = 0; idx <= 67; idx++) {
			saveDataArray[ 903 + idx] = 0;
		}

		// 性能カスタマイズ（ステータス関連）

		saveDataArray[ 1580 +  0 ] = 0;				// 無効化フラグ（データ移行しない）
		saveDataArray[ 1580 +  1 ] = dt903_43;		// MaxHP+%
		saveDataArray[ 1580 +  2 ] = dt903_41;		// MaxHP+ (max99999)
		saveDataArray[ 1580 +  3 ] = dt903_46;		// MaxSP+%
		saveDataArray[ 1580 +  4 ] = dt903_44;		// MaxSP+ (max99999)
		saveDataArray[ 1580 +  5 ] = dt903_49;		// HP自然回復力+%
		saveDataArray[ 1580 +  6 ] = dt903_50;		// SP自然回復力+%
		saveDataArray[ 1580 +  7 ] = dt903_04;		// STR+
		saveDataArray[ 1580 +  8 ] = dt903_05;		// AGI+
		saveDataArray[ 1580 +  9 ] = dt903_06;		// VIT+

		saveDataArray[ 1580 + 10 ] = dt903_07;		// INT+
		saveDataArray[ 1580 + 11 ] = dt903_08;		// DEX+
		saveDataArray[ 1580 + 12 ] = dt903_09;		// LUK+
		saveDataArray[ 1580 + 13 ] = dt903_10;		// HIT+
		saveDataArray[ 1580 + 14 ] = dt903_54;		// FLEE+
		saveDataArray[ 1580 + 15 ] = dt903_11;		// CRI+
		saveDataArray[ 1580 + 16 ] = dt903_55;		// 完全回避+
		saveDataArray[ 1580 + 17 ] = dt903_14;		// ASPD+%
		saveDataArray[ 1580 + 18 ] = dt903_15;		// ASPD+(固定値+)
		saveDataArray[ 1580 + 19 ] = dt903_16;		// 変動詠唱時間短縮

		saveDataArray[ 1580 + 20 ] = 0;				// 固定詠唱時間短縮　（※新規）
		saveDataArray[ 1580 + 21 ] = 0;				// ディレイ短縮　（※新規）
		saveDataArray[ 1580 + 22 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 23 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 24 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 25 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 26 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 27 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 28 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1580 + 29 ] = 0;				// 未使用　（※新規）

		// 性能カスタマイズ（攻撃関連）

		saveDataArray[ 1610 +  0 ] = 0;				// 無効化フラグ（データ移行しない）
		saveDataArray[ 1610 +  1 ] = dt903_01;		// 武器ATK変更
		saveDataArray[ 1610 +  2 ] = dt903_02;		// 武器MATK変更
		saveDataArray[ 1610 +  3 ] = dt903_03;		// 武器Lv変更
		saveDataArray[ 1610 +  4 ] = dt903_17;		// ATK+
		saveDataArray[ 1610 +  5 ] = dt903_18;		// 物理攻撃時に与えるダメージ上昇
		saveDataArray[ 1610 +  6 ] = dt903_19;		// 物理攻撃時に○種族に与えるダメージ上昇
		saveDataArray[ 1610 +  7 ] = dt903_20;		// 物理攻撃時に○属性に与えるダメージ上昇
		saveDataArray[ 1610 +  8 ] = dt903_21;		// 物理攻撃時に○サイズに与えるダメージ上昇
		saveDataArray[ 1610 +  9 ] = dt903_22;		// 遠距離物理攻撃時に与えるダメージ上昇

		saveDataArray[ 1610 + 10 ] = dt903_23;		// クリティカル攻撃で与えるダメージ上昇
		saveDataArray[ 1610 + 11 ] = 0;				// 必中攻撃+%　（※新規）
		saveDataArray[ 1610 + 12 ] = dt903_52;		// 全ての種族のDEF無視%
		saveDataArray[ 1610 + 13 ] = dt903_26;		// MATK+
		saveDataArray[ 1610 + 14 ] = dt903_27;		// 魔法攻撃時に与えるダメージ上昇(旧Matk+X%)
		saveDataArray[ 1610 + 15 ] = dt903_28;		// 魔法攻撃時に○種族に与えるダメージ上昇
		saveDataArray[ 1610 + 16 ] = dt903_29;		// 魔法攻撃時に○属性に与えるダメージ上昇
		saveDataArray[ 1610 + 17 ] = 0;				// 魔法攻撃時に○サイズに与えるダメージ上昇　（※新規）
		saveDataArray[ 1610 + 18 ] = dt903_30;		// 自分の魔法が○属性ならダメージ上昇
		saveDataArray[ 1610 + 19 ] = dt903_53;		// 全ての種族のMDEF無視%

		saveDataArray[ 1610 + 20 ] = 0;				// プレイヤーに与えるダメージ上昇　（※新規）
		saveDataArray[ 1610 + 21 ] = dt903_24;		// 地域特化&特定グループ特化
		saveDataArray[ 1610 + 22 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 23 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 24 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 25 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 26 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 27 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 28 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1610 + 29 ] = 0;				// 未使用　（※新規）

		// 性能カスタマイズ（防御関連）

		saveDataArray[ 1640 +  0 ] = 0;				// 無効化フラグ（データ移行しない）
		saveDataArray[ 1640 +  1 ] = dt903_47;		// DEF+
		saveDataArray[ 1640 +  2 ] = dt903_48;		// MDEF+
		saveDataArray[ 1640 +  3 ] = 0;				// ○種族から受けるダメージ減少　（※新規）
		saveDataArray[ 1640 +  4 ] = 0;				// ○属性モンスターから受けるダメージ減少　（※新規）
		saveDataArray[ 1640 +  5 ] = 0;				// ○属性攻撃で受けるダメージ減少　（※新規）
		saveDataArray[ 1640 +  6 ] = 0;				// ○サイズから受けるダメージ減少　（※新規）
		saveDataArray[ 1640 +  7 ] = 0;				// 遠距離攻撃で受けるダメージ減少　（※新規）
		saveDataArray[ 1640 +  8 ] = 0;				// プレイヤーから受けるダメージ減少　（※新規）
		saveDataArray[ 1640 +  9 ] = 0;				// 地域特化&特定グループ耐性　（※新規）

		saveDataArray[ 1640 + 10 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 11 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 12 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 13 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 14 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 15 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 16 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 17 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 18 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1640 + 19 ] = 0;				// 未使用　（※新規）

		// 性能カスタマイズ（スキル関連）

		saveDataArray[ 1660 +  0 ] = 0;				// 無効化フラグ（データ移行しない）
		saveDataArray[ 1660 +  1 ] = dt903_25;		// ○○スキルで攻撃時ダメージ上昇
		saveDataArray[ 1660 +  2 ] = 0;				// ヒール系を使用したときの回復力+%　（※新規）
		saveDataArray[ 1660 +  3 ] = 0;				// ヒール系を使用されたときの回復力+%　（※新規）
		saveDataArray[ 1660 +  4 ] = 0;				// ○○スキルの変動詠唱時間短縮（％）　（※新規）
		saveDataArray[ 1660 +  5 ] = 0;				// ○○スキルの変動詠唱時間短縮（秒）　（※新規）
		saveDataArray[ 1660 +  6 ] = 0;				// ○○スキルの固定詠唱時間短縮（％）　（※新規）
		saveDataArray[ 1660 +  7 ] = 0;				// ○○スキルの固定詠唱時間短縮（秒）　（※新規）
		saveDataArray[ 1660 +  8 ] = 0;				// ○○スキルのクールタイム短縮（％）　（※新規）
		saveDataArray[ 1660 +  9 ] = 0;				// ○○スキルのクールタイム短縮（秒）　（※新規）

		saveDataArray[ 1660 + 10 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 11 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 12 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 13 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 14 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 15 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 16 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 17 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 18 ] = 0;				// 未使用　（※新規）
		saveDataArray[ 1660 + 19 ] = 0;				// 未使用　（※新規）

	case 18:

		//----------------------------------------------------------------
		// 「シェイプシフト」実装漏れ対応に伴う、セーブデータインデックス変更
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_MECHANIC) {
			saveDataArray[75 + 17] = saveDataArray[75 + 16];
			saveDataArray[75 + 16] = 0;
		}

	case 19:

		//----------------------------------------------------------------
		// 習得スキル設定統一に伴う、パッシブ持続系の設定値を元にした、習得スキルの自動設定
		//----------------------------------------------------------------


		//----------------------------------------------------------------
		// メテオストライク：鉄拳
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {
			if (saveDataArray[75 + 18] > saveDataArray[1060 + 60]) {
				saveDataArray[1060 + 60] = saveDataArray[75 + 18];
			}
		}

		//----------------------------------------------------------------
		// メテオストライク：武器研究
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {
			if (saveDataArray[75 + 16] > saveDataArray[1060 + 79]) {
				saveDataArray[1060 + 79] = saveDataArray[75 + 16];
			}
		}


		//----------------------------------------------------------------
		// ケミカルグローブ：カート改造
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_GENETIC) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 34]) {
				saveDataArray[1060 + 34] = saveDataArray[75 + 3];
			}
		}


		//----------------------------------------------------------------
		// おもちゃの指輪：剣修練
		// 剣聖の王冠：剣修練
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SWORDMAN) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_HI_SWORDMAN) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_KNIGHT) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_LORDKNIGHT) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_RUNEKNIGHT) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_CRUSADER) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_PALADIN) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROYALGUARD) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROGUE) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 29]) {
				saveDataArray[1060 + 29] = saveDataArray[75 + 2];
			}
		}
		if (saveDataArray[1] == JOB_ID_CHASER) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 29]) {
				saveDataArray[1060 + 29] = saveDataArray[75 + 2];
			}
		}
		if (saveDataArray[1] == JOB_ID_SHADOWCHASER) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 29]) {
				saveDataArray[1060 + 29] = saveDataArray[75 + 2];
			}
		}
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {
			if (saveDataArray[75 + 0] > saveDataArray[1060 + 3]) {
				saveDataArray[1060 + 3] = saveDataArray[75 + 0];
			}
		}
		if (saveDataArray[1] == JOB_ID_GENETIC) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 33]) {
				saveDataArray[1060 + 33] = saveDataArray[75 + 2];
			}
		}


		//----------------------------------------------------------------
		// 剣聖の王冠：両手剣修練
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SWORDMAN) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_HI_SWORDMAN) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_KNIGHT) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_LORDKNIGHT) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_RUNEKNIGHT) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_CRUSADER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_PALADIN) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROYALGUARD) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}


		//----------------------------------------------------------------
		// 剣聖の王冠：槍修練
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_KNIGHT) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_LORDKNIGHT) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_RUNEKNIGHT) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_CRUSADER) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_PALADIN) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROYALGUARD) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 4];
			}
		}


		//----------------------------------------------------------------
		// メテオストライク：斧修練
		// 剣聖の王冠：斧修練
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_ALCHEMIST) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_PROFESSOR) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_GENETIC) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 13]) {
				saveDataArray[1060 + 13] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_MECHANIC) {
			if (saveDataArray[75 + 11] > saveDataArray[1060 + 41]) {
				saveDataArray[1060 + 41] = saveDataArray[75 + 11];
			}
		}
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {
			if (saveDataArray[75 + 17] > saveDataArray[1060 + 80]) {
				saveDataArray[1060 + 80] = saveDataArray[75 + 17];
			}
		}


		//----------------------------------------------------------------
		// チャクラム：カタール修練
		// 剣聖の王冠：カタール修練
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_ASSASIN) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 15]) {
				saveDataArray[1060 + 15] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_ASSASINCROSS) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 15]) {
				saveDataArray[1060 + 15] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_GILOTINCROSS) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 15]) {
				saveDataArray[1060 + 15] = saveDataArray[75 + 4];
			}
		}


		//----------------------------------------------------------------
		// 剣聖の王冠：メイス修練
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_PRIEST) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 33]) {
				saveDataArray[1060 + 33] = saveDataArray[75 + 2];
			}
		}
		if (saveDataArray[1] == JOB_ID_HIGHPRIEST) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 33]) {
				saveDataArray[1060 + 33] = saveDataArray[75 + 2];
			}
		}
		if (saveDataArray[1] == JOB_ID_ARCBISHOP) {
			if (saveDataArray[75 + 2] > saveDataArray[1060 + 33]) {
				saveDataArray[1060 + 33] = saveDataArray[75 + 2];
			}
		}


		//----------------------------------------------------------------
		// 新鮮な草のネックレス：アニマル系スキル
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUMMONER) {
			var dtidx = 0;

			// 現在の習得スキルの設定状況を取得
			var dtAnmNow = 0;
			for (dtidx = 0; dtidx <= 8; dtidx++) {
				dtAnmNow += saveDataArray[1060 + 11 + 3 * dtidx];
			}

			// パッシブ持続系欄と習得スキル欄の設定値の差を計算
			var dtAnmDif = saveDataArray[75 + 7] - dtAnmNow;

			// 設定値の差が 0 未満でも本来は補正が必要だが、利便性を考慮して補正しないことにする
			if (dtAnmDif > 0) {
				var dtMax = 0;
				var dtDif = 0;

				for (dtidx = 0; (dtidx <= 8) && (dtAnmDif > 0); dtidx++) {

					// スキルレベル最大値を設定
					dtMax = ((dtidx == 4) || (dtidx == 8)) ? 1 : 5;

					// 補正される差を計算
					dtDif = Math.min(dtAnmDif, Math.max(0, dtMax - saveDataArray[1060 + 11 + 3 * dtidx]));

					// 補正
					saveDataArray[1060 + 11 + 3 * dtidx] += dtDif;

					// 残りの差の合計を算出
					dtAnmDif -= dtDif;
				}
			}
		}


		//----------------------------------------------------------------
		// 可愛い草のネックレス：シーフード系スキル
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUMMONER) {
			var dtidx = 0;

			// 現在の習得スキルの設定状況を取得
			var dtAnmNow = 0;
			for (dtidx = 0; dtidx <= 8; dtidx++) {
				dtAnmNow += saveDataArray[1060 + 9 + 3 * dtidx];
			}

			// パッシブ持続系欄と習得スキル欄の設定値の差を計算
			var dtAnmDif = saveDataArray[75 + 3] - dtAnmNow;

			// 設定値の差が 0 未満でも本来は補正が必要だが、利便性を考慮して補正しないことにする
			if (dtAnmDif > 0) {
				var dtMax = 0;
				var dtDif = 0;

				for (dtidx = 0; (dtidx <= 8) && (dtAnmDif > 0); dtidx++) {

					// スキルレベル最大値を設定
					dtMax = ((dtidx == 4) || (dtidx == 8)) ? 1 : 5;

					// 補正される差を計算
					dtDif = Math.min(dtAnmDif, Math.max(0, dtMax - saveDataArray[1060 + 9 + 3 * dtidx]));

					// 補正
					saveDataArray[1060 + 9 + 3 * dtidx] += dtDif;

					// 残りの差の合計を算出
					dtAnmDif -= dtDif;
				}
			}
		}


		//----------------------------------------------------------------
		// 魔力の草のネックレス：大地系スキル
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUMMONER) {
			var dtidx = 0;

			// 現在の習得スキルの設定状況を取得
			var dtAnmNow = 0;
			for (dtidx = 0; dtidx <= 8; dtidx++) {
				dtAnmNow += saveDataArray[1060 + 10 + 3 * dtidx];
			}

			// パッシブ持続系欄と習得スキル欄の設定値の差を計算
			var dtAnmDif = saveDataArray[75 + 5] - dtAnmNow;

			// 設定値の差が 0 未満でも本来は補正が必要だが、利便性を考慮して補正しないことにする
			if (dtAnmDif > 0) {
				var dtMax = 0;
				var dtDif = 0;

				for (dtidx = 0; (dtidx <= 8) && (dtAnmDif > 0); dtidx++) {

					// スキルレベル最大値を設定
					dtMax = ((dtidx == 4) || (dtidx == 8)) ? 1 : 5;

					// 補正される差を計算
					dtDif = Math.min(dtAnmDif, Math.max(0, dtMax - saveDataArray[1060 + 10 + 3 * dtidx]));

					// 補正
					saveDataArray[1060 + 10 + 3 * dtidx] += dtDif;

					// 残りの差の合計を算出
					dtAnmDif -= dtDif;
				}
			}
		}


		//----------------------------------------------------------------
		// セイヴザキング：スピアクイッケン
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_CRUSADER) {
			if (saveDataArray[75 + 5] > saveDataArray[1060 + 14]) {
				saveDataArray[1060 + 14] = saveDataArray[75 + 5];
			}
		}
		if (saveDataArray[1] == JOB_ID_PALADIN) {
			if (saveDataArray[75 + 5] > saveDataArray[1060 + 14]) {
				saveDataArray[1060 + 14] = saveDataArray[75 + 5];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROYALGUARD) {
			if (saveDataArray[75 + 5] > saveDataArray[1060 + 14]) {
				saveDataArray[1060 + 14] = saveDataArray[75 + 5];
			}
		}


		//----------------------------------------------------------------
		// エメラルドイヤリング：レッスン
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_MINSTREL) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 34]) {
				saveDataArray[1060 + 34] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_WANDERER) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 34]) {
				saveDataArray[1060 + 34] = saveDataArray[75 + 4];
			}
		}


		//----------------------------------------------------------------
		// ユニコーンの兜：フェイス
		// 堕天司祭の闇光外套：フェイス
		// エンチャント　セイクレッド：フェイス
		// デイヴィッドシールド：フェイス
		// ダークフェイスワームカード：フェイス
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_CRUSADER) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 15]) {
				saveDataArray[1060 + 15] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_PALADIN) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 15]) {
				saveDataArray[1060 + 15] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROYALGUARD) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 15]) {
				saveDataArray[1060 + 15] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {
			if (saveDataArray[75 + 14] > saveDataArray[1060 + 52]) {
				saveDataArray[1060 + 52] = saveDataArray[75 + 14];
			}
		}


		//----------------------------------------------------------------
		// スタッフオブオルド：ドラゴノロジー
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SAGE) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 24]) {
				saveDataArray[1060 + 24] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_PROFESSOR) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 24]) {
				saveDataArray[1060 + 24] = saveDataArray[75 + 4];
			}
		}
		if (saveDataArray[1] == JOB_ID_SORCERER) {
			if (saveDataArray[75 + 4] > saveDataArray[1060 + 24]) {
				saveDataArray[1060 + 24] = saveDataArray[75 + 4];
			}
		}


		//----------------------------------------------------------------
		// 鳥狩の鉤爪＋鳥狩の弓懸セット：ビーストベイン
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_HUNTER) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 21]) {
				saveDataArray[1060 + 21] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_SNIPER) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 21]) {
				saveDataArray[1060 + 21] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_RANGER) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 21]) {
				saveDataArray[1060 + 21] = saveDataArray[75 + 3];
			}
		}


		//----------------------------------------------------------------
		// ミラージュウィング：ワシの目
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_ARCHER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_HI_ARCHER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_HUNTER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_SNIPER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_RANGER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_BARD) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_CROWN) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_MINSTREL) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_DANCER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_ZYPSY) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_WANDERER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 4]) {
				saveDataArray[1060 + 4] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_ROGUE) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 30]) {
				saveDataArray[1060 + 30] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_CHASER) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 30]) {
				saveDataArray[1060 + 30] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_SHADOWCHASER) {
			if (saveDataArray[75 + 3] > saveDataArray[1060 + 30]) {
				saveDataArray[1060 + 30] = saveDataArray[75 + 3];
			}
		}
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {
			if (saveDataArray[75 + 6] > saveDataArray[1060 + 30]) {
				saveDataArray[1060 + 30] = saveDataArray[75 + 6];
			}
		}


		//----------------------------------------------------------------
		// ミラージュハンドガン：スネークアイ
		// ミラージュライフル：スネークアイ
		// ミラージュガトリングガン：スネークアイ
		// ミラージュショットガン：スネークアイ
		// ミラージュグレネードガン：スネークアイ
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_GUNSLINGER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 12]) {
				saveDataArray[1060 + 12] = saveDataArray[75 + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_REBELLION) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 12]) {
				saveDataArray[1060 + 12] = saveDataArray[75 + 1];
			}
		}


		//----------------------------------------------------------------
		// ミラージュフォックステイル：ソウルアタック
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUMMONER) {
			if (saveDataArray[75 + 1] > saveDataArray[1060 + 8]) {
				saveDataArray[1060 + 8] = saveDataArray[75 + 1];
			}
		}


		//----------------------------------------------------------------
		// 勇者の靴 達人の斧 セット：火と大地の研究
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_MECHANIC) {
			if (saveDataArray[75 + 12] > saveDataArray[1060 + 48]) {
				saveDataArray[1060 + 48] = saveDataArray[75 + 12];
			}
		}


		//----------------------------------------------------------------
		// 鳥飼の鉤爪：スチールクロウ
		// 空飛ぶガラパゴ：スチールクロウ
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_HUNTER) {
			if (saveDataArray[75 + 5] > saveDataArray[1060 + 25]) {
				saveDataArray[1060 + 25] = saveDataArray[75 + 5];
			}
		}
		if (saveDataArray[1] == JOB_ID_SNIPER) {
			if (saveDataArray[75 + 5] > saveDataArray[1060 + 25]) {
				saveDataArray[1060 + 25] = saveDataArray[75 + 5];
			}
		}
		if (saveDataArray[1] == JOB_ID_RANGER) {
			if (saveDataArray[75 + 5] > saveDataArray[1060 + 25]) {
				saveDataArray[1060 + 25] = saveDataArray[75 + 5];
			}
		}



		//----------------------------------------------------------------
		// 達人の斧：達人の斧用スキルマスター数
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_BLACKSMITH) {
			if ((saveDataArray[75 + 9] >= 1) && (saveDataArray[1060 + 17] < 3)) {
				saveDataArray[1060 + 17] = 3;
			}
			if ((saveDataArray[75 + 9] >= 2) && (saveDataArray[1060 + 18] < 3)) {
				saveDataArray[1060 + 18] = 3;
			}
			if ((saveDataArray[75 + 9] >= 3) && (saveDataArray[1060 + 19] < 3)) {
				saveDataArray[1060 + 19] = 3;
			}
			if ((saveDataArray[75 + 9] >= 4) && (saveDataArray[1060 + 20] < 3)) {
				saveDataArray[1060 + 20] = 3;
			}
			if ((saveDataArray[75 + 9] >= 5) && (saveDataArray[1060 + 21] < 3)) {
				saveDataArray[1060 + 21] = 3;
			}
			if ((saveDataArray[75 + 9] >= 6) && (saveDataArray[1060 + 22] < 3)) {
				saveDataArray[1060 + 22] = 3;
			}
			if ((saveDataArray[75 + 9] >= 7) && (saveDataArray[1060 + 23] < 3)) {
				saveDataArray[1060 + 23] = 3;
			}

			saveDataArray[75 + 9] = 0;
			for (idx = 9; idx < 99; idx++) {
				saveDataArray[75 + idx] = saveDataArray[75 + idx + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_WHITESMITH) {
			if ((saveDataArray[75 + 10] >= 1) && (saveDataArray[1060 + 17] < 3)) {
				saveDataArray[1060 + 17] = 3;
			}
			if ((saveDataArray[75 + 10] >= 2) && (saveDataArray[1060 + 18] < 3)) {
				saveDataArray[1060 + 18] = 3;
			}
			if ((saveDataArray[75 + 10] >= 3) && (saveDataArray[1060 + 19] < 3)) {
				saveDataArray[1060 + 19] = 3;
			}
			if ((saveDataArray[75 + 10] >= 4) && (saveDataArray[1060 + 20] < 3)) {
				saveDataArray[1060 + 20] = 3;
			}
			if ((saveDataArray[75 + 10] >= 5) && (saveDataArray[1060 + 21] < 3)) {
				saveDataArray[1060 + 21] = 3;
			}
			if ((saveDataArray[75 + 10] >= 6) && (saveDataArray[1060 + 22] < 3)) {
				saveDataArray[1060 + 22] = 3;
			}
			if ((saveDataArray[75 + 10] >= 7) && (saveDataArray[1060 + 23] < 3)) {
				saveDataArray[1060 + 23] = 3;
			}

			saveDataArray[75 + 10] = 0;
			for (idx = 10; idx < 99; idx++) {
				saveDataArray[75 + idx] = saveDataArray[75 + idx + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_MECHANIC) {
			if ((saveDataArray[75 + 10] >= 1) && (saveDataArray[1060 + 17] < 3)) {
				saveDataArray[1060 + 17] = 3;
			}
			if ((saveDataArray[75 + 10] >= 2) && (saveDataArray[1060 + 18] < 3)) {
				saveDataArray[1060 + 18] = 3;
			}
			if ((saveDataArray[75 + 10] >= 3) && (saveDataArray[1060 + 19] < 3)) {
				saveDataArray[1060 + 19] = 3;
			}
			if ((saveDataArray[75 + 10] >= 4) && (saveDataArray[1060 + 20] < 3)) {
				saveDataArray[1060 + 20] = 3;
			}
			if ((saveDataArray[75 + 10] >= 5) && (saveDataArray[1060 + 21] < 3)) {
				saveDataArray[1060 + 21] = 3;
			}
			if ((saveDataArray[75 + 10] >= 6) && (saveDataArray[1060 + 22] < 3)) {
				saveDataArray[1060 + 22] = 3;
			}
			if ((saveDataArray[75 + 10] >= 7) && (saveDataArray[1060 + 23] < 3)) {
				saveDataArray[1060 + 23] = 3;
			}

			saveDataArray[75 + 10] = 0;
			for (idx = 10; idx < 99; idx++) {
				saveDataArray[75 + idx] = saveDataArray[75 + idx + 1];
			}
		}


		//----------------------------------------------------------------
		// アイアンネイル：アイアンネイル用ＡＴＫ＋
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_MONK) {
			if (saveDataArray[75 + 9] == 1) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 2) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 3) {
				// モンクでは＋６０以上は実現できないが、可能な限り設定を維持する
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 4) {
				// モンクでは＋６０以上は実現できないが、可能な限り設定を維持する
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 5) {
				// モンクでは＋６０以上は実現できないが、可能な限り設定を維持する
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
			}

			saveDataArray[75 + 9] = 0;
			for (idx = 9; idx < 99; idx++) {
				saveDataArray[75 + idx] = saveDataArray[75 + idx + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_CHAMPION) {
			if (saveDataArray[75 + 9] == 1) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 2) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 3) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
				if (saveDataArray[1060 + 36] < 5) {
					saveDataArray[1060 + 36] = 5;
				}
			}
			if (saveDataArray[75 + 9] == 4) {
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
				if (saveDataArray[1060 + 36] < 5) {
					saveDataArray[1060 + 36] = 5;
				}
				if (saveDataArray[1060 + 37] < 10) {
					saveDataArray[1060 + 37] = 10;
				}
			}
			if (saveDataArray[75 + 9] == 5) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
				if (saveDataArray[1060 + 36] < 5) {
					saveDataArray[1060 + 36] = 5;
				}
				if (saveDataArray[1060 + 37] < 10) {
					saveDataArray[1060 + 37] = 10;
				}
			}

			saveDataArray[75 + 9] = 0;
			for (idx = 9; idx < 99; idx++) {
				saveDataArray[75 + idx] = saveDataArray[75 + idx + 1];
			}
		}
		if (saveDataArray[1] == JOB_ID_SHURA) {
			if (saveDataArray[75 + 12] == 1) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
			}
			if (saveDataArray[75 + 12] == 2) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
			}
			if (saveDataArray[75 + 12] == 3) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
				if (saveDataArray[1060 + 36] < 5) {
					saveDataArray[1060 + 36] = 5;
				}
			}
			if (saveDataArray[75 + 12] == 4) {
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
				if (saveDataArray[1060 + 36] < 5) {
					saveDataArray[1060 + 36] = 5;
				}
				if (saveDataArray[1060 + 37] < 10) {
					saveDataArray[1060 + 37] = 10;
				}
			}
			if (saveDataArray[75 + 12] == 5) {
				if (saveDataArray[1060 + 22] < 5) {
					saveDataArray[1060 + 22] = 5;
				}
				if (saveDataArray[1060 + 23] < 5) {
					saveDataArray[1060 + 23] = 5;
				}
				if (saveDataArray[1060 + 36] < 5) {
					saveDataArray[1060 + 36] = 5;
				}
				if (saveDataArray[1060 + 37] < 10) {
					saveDataArray[1060 + 37] = 10;
				}
			}

			saveDataArray[75 + 12] = 0;
			for (idx = 12; idx < 99; idx++) {
				saveDataArray[75 + idx] = saveDataArray[75 + idx + 1];
			}
		}

	case 20:

		//----------------------------------------------------------------
		// オートスペル設定領域不足に対応する、セーブデータインデックスの変更
		//----------------------------------------------------------------

		for (idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
			saveDataArray[1691 + 3 * idx + 0] = saveDataArray[1000 + 3 * idx + 0];
			saveDataArray[1691 + 3 * idx + 1] = saveDataArray[1000 + 3 * idx + 1];
			saveDataArray[1691 + 3 * idx + 2] = saveDataArray[1000 + 3 * idx + 2];
			saveDataArray[1000 + 3 * idx + 0] = 0;
			saveDataArray[1000 + 3 * idx + 1] = 0;
			saveDataArray[1000 + 3 * idx + 2] = 0;
		}

	case 21:

		//----------------------------------------------------------------
		// 矢データの整理に対応する、値の変更
		//----------------------------------------------------------------

		var newArrowIdArrow = [
			ARROW_ID_YA,
			ARROW_ID_GINNO_YA,
			ARROW_ID_HONOONO_YA,
			ARROW_ID_TETSUNO_YA,
			ARROW_ID_GANSEKINO_YA,
			ARROW_ID_SUISHONO_YA,
			ARROW_ID_KAZENO_YA,
			ARROW_ID_KAGEYA,
			ARROW_ID_MUKEINO_YA,
			ARROW_ID_SABITA_YA,
			ARROW_ID_KOTETSUNO_YA,
			ARROW_ID_ORIDEOKONNO_YA,
			ARROW_ID_HAMAYA,
			ARROW_ID_KORINO_YA,
			ARROW_ID_DOKUYA,
			ARROW_ID_SURUDOI_YA,
			ARROW_ID_SEINARU_YA,
			ARROW_ID_ATK1NO_YA,
			ARROW_ID_NONE,
			ARROW_ID_ZOKUSE_ZIDO_YA_ATK30,
			ARROW_ID_KARYUDONO_YA,
			ARROW_ID_ELFNO_YA,
			ARROW_ID_CURSE_ARROW,
			ARROW_ID_SILENCE_ARROW,
			ARROW_ID_SLEEP_ARROW,
			ARROW_ID_FLASH_ARROW
		];

		var newArrowIdBullet = [
			ARROW_ID_BULLET,
			ARROW_ID_SILVER_BULLET_C,
			ARROW_ID_BLOOD_BULLET_C,
			ARROW_ID_ICE_BULLET,
			ARROW_ID_FLARE_BULLET,
			ARROW_ID_LIGHTNING_BULLET,
			ARROW_ID_POISON_BULLET,
			ARROW_ID_BLIND_BULLET,
			ARROW_ID_AP_BULLET,
			ARROW_ID_FREEZING_BULLET,
			ARROW_ID_MAGICAL_STONE_BULLET,
			ARROW_ID_BLAZE_BULLET,
			ARROW_ID_ELECTRIC_BULLET,
			ARROW_ID_SUNCTFIED_BULLET
		];

		// シーフ系統の場合は、矢ＩＤ
		if (GetLowerJobSeriesID(saveDataArray[1]) == JOB_SERIES_ID_THIEF) {
			saveDataArray[12] = newArrowIdArrow[saveDataArray[12]];
		}

		// アーチャー系統の場合は、矢ＩＤ
		else if (GetLowerJobSeriesID(saveDataArray[1]) == JOB_SERIES_ID_ARCHER) {
			saveDataArray[12] = newArrowIdArrow[saveDataArray[12]];
		}

		// ガンスリンガー系統の場合は、弾ＩＤ
		else if (GetLowerJobSeriesID(saveDataArray[1]) == JOB_SERIES_ID_GUNSLINGER) {
			saveDataArray[12] = newArrowIdBullet[saveDataArray[12]];
		}

	case 22:

		//----------------------------------------------------------------
		// 「堕天司祭の闇光外套」エンチャントバグに対応する、セーブデータクリア
		//----------------------------------------------------------------
		if (saveDataArray[52] == ITEM_ID_DATENSHISAINO_ANKOUGAITO) {
			switch (saveDataArray[55]) {
			case CARD_ID_ENCHANT_DEATHPERIA:
			case CARD_ID_ENCHANT_SACRED:
				saveDataArray[55] = 0;
			}
		}

	case 23:

		//----------------------------------------------------------------
		// ハンマーオブゴッドのクリムゾンマーカー指定欄削除に対応する、セーブデータ補正
		//----------------------------------------------------------------
		if (saveDataArray[276] == SKILL_ID_HAMMER_OF_GOD) {

			// クリムゾンマーカーの設定がある場合は、烙印状態に設定
			// （0 が指定ありなので注意）
			if (saveDataArray[278] == 0) {
				saveDataArray[286 + MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI] = 1;
			}

			// データ位置補正
			saveDataArray[278] = saveDataArray[279];
			saveDataArray[279] = 0;
		}

	case 24:

		//----------------------------------------------------------------
		// スーパーノービス＋スキル変更に対応する、セーブデータ補正
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {

			// 攻撃手段の補正
			if (saveDataArray[276] == SKILL_ID_FREEZING_TRAP) {
				saveDataArray[276] = SKILL_ID_TUZYO_KOGEKI;
				saveDataArray[277] = 1;
			}

			// 旧データを新番号へ移行＆削除スキルをクリア
			saveDataArray[1060 + 101] = 0;
			saveDataArray[1060 + 100] = 0;
			saveDataArray[1060 + 99] = 0;
			saveDataArray[1060 + 98] = 0;
			saveDataArray[1060 + 97] = saveDataArray[1060 + 80];
			saveDataArray[1060 + 96] = 0;
			saveDataArray[1060 + 95] = saveDataArray[1060 + 79];
			saveDataArray[1060 + 94] = saveDataArray[1060 + 78];
			saveDataArray[1060 + 93] = saveDataArray[1060 + 77];
			saveDataArray[1060 + 92] = saveDataArray[1060 + 76];
			saveDataArray[1060 + 91] = saveDataArray[1060 + 75];
			saveDataArray[1060 + 90] = saveDataArray[1060 + 74];
			saveDataArray[1060 + 89] = saveDataArray[1060 + 73];
			saveDataArray[1060 + 88] = saveDataArray[1060 + 72];
			saveDataArray[1060 + 87] = saveDataArray[1060 + 71];
			saveDataArray[1060 + 86] = saveDataArray[1060 + 70];
			saveDataArray[1060 + 85] = saveDataArray[1060 + 69];
			saveDataArray[1060 + 84] = saveDataArray[1060 + 68];
			saveDataArray[1060 + 83] = 0;
			saveDataArray[1060 + 82] = 0;
			saveDataArray[1060 + 81] = 0;
			saveDataArray[1060 + 80] = saveDataArray[1060 + 67];
			saveDataArray[1060 + 79] = 0;
			saveDataArray[1060 + 78] = 0;
			saveDataArray[1060 + 77] = saveDataArray[1060 + 63];
			saveDataArray[1060 + 76] = 0;
			saveDataArray[1060 + 75] = 0;
			saveDataArray[1060 + 74] = saveDataArray[1060 + 62];
			saveDataArray[1060 + 73] = saveDataArray[1060 + 61];
			saveDataArray[1060 + 72] = saveDataArray[1060 + 60];
			saveDataArray[1060 + 71] = saveDataArray[1060 + 59];
			saveDataArray[1060 + 70] = saveDataArray[1060 + 58];
			saveDataArray[1060 + 69] = 0;
			saveDataArray[1060 + 68] = saveDataArray[1060 + 57];
			saveDataArray[1060 + 67] = saveDataArray[1060 + 56];
			saveDataArray[1060 + 66] = 0;
			saveDataArray[1060 + 65] = saveDataArray[1060 + 55];
			saveDataArray[1060 + 64] = 0;
			saveDataArray[1060 + 63] = 0;
			saveDataArray[1060 + 62] = 0;
			saveDataArray[1060 + 61] = 0;
			saveDataArray[1060 + 60] = 0;
			saveDataArray[1060 + 59] = 0;
			saveDataArray[1060 + 58] = 0;
			saveDataArray[1060 + 57] = saveDataArray[1060 + 54];
			saveDataArray[1060 + 56] = 0;
			saveDataArray[1060 + 55] = 0;
			saveDataArray[1060 + 54] = 0;
		}

	case 25:

		//----------------------------------------------------------------
		// 対プレイヤー設定バイアス追加対応
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_TAISEI.length; idx++) {
			if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
				saveDataArray[850 + idx] += SAVE_DATA_BIAS_CONF_PLAYER_500;
			}
		}

	case 26:

		//----------------------------------------------------------------
		// スパノビ＋持続スキルに爆裂波動追加対応
		//----------------------------------------------------------------
		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {

			regionLength = CSaveDataMappingManager.__GetMappingArrayPassiveSkill(26).length;

			for (idx = (regionLength - 1); idx > 9; idx--) {
				idxNew = 75 + idx;
				idxOld = idxNew - 1;

				saveDataArray[idxNew] = saveDataArray[idxOld];
			}

			saveDataArray[75 + 9] = 0;
		}

	case 27:

		//----------------------------------------------------------------
		// エイムドボルト拘束条件削除対応
		//----------------------------------------------------------------
		if (saveDataArray[276] == SKILL_ID_AIMED_BOLT) {
			// 非拘束状態の設定がある場合は、拘束状態に設定
			if (saveDataArray[278] == 0) {
				saveDataArray[278] = 1;
			}
		}

	case 28:

		//----------------------------------------------------------------
		// 時限効果設定方法変更対応
		//----------------------------------------------------------------
		for (idx = 0; idx < 4; idx++) {
			saveDataArray[1751 + idx] = saveDataArray[730 + 8 + idx];
			saveDataArray[730 + 8 + idx] = 0;
		}

		//----------------------------------------------------------------
		// 時空エンチャント効果設定方法の変更
		//----------------------------------------------------------------

		var targetIdxArray = [
			17, 18, 19, 20,
			23, 24, 25, 26,
			29, 30, 31, 32,
			35, 36, 37, 38,
			41, 42, 43, 44,
			47, 48, 49, 50,
			53, 54, 55, 56,
			59, 60, 61, 62,
			65, 66, 67, 68,
			71, 72, 72, 74,
		];

		var convertIdArray = [
			[CARD_ID_ENCHANT_KUMANO_CHIKARA_OLD, CARD_ID_ENCHANT_KUMANO_CHIKARA, TIME_ITEM_ID_KUMANO_CHIKARA],
			[CARD_ID_ENCHANT_KOSOKU_OLD, CARD_ID_ENCHANT_KOSOKU, TIME_ITEM_ID_KOSOKU],
			[CARD_ID_ENCHANT_KOGAI_OLD, CARD_ID_ENCHANT_KOGAI, TIME_ITEM_ID_KOGAI],
			[CARD_ID_ENCHANT_BOSOSHITA_MARYOKU_OLD, CARD_ID_ENCHANT_BOSOSHITA_MARYOKU, TIME_ITEM_ID_BOSOSHITA_MARYOKU],
			[CARD_ID_ENCHANT_OWASHINO_GANKO_OLD, CARD_ID_ENCHANT_OWASHINO_GANKO, TIME_ITEM_ID_OWASHINO_GANKO],
			[CARD_ID_ENCHANT_KOUUNNA_HI_OLD, CARD_ID_ENCHANT_KOUUNNA_HI, TIME_ITEM_ID_KOUUNNA_HI],
		];

		for (idxTarget = 0; idxTarget < targetIdxArray.length; idxTarget++) {

			for (idxConvert = 0; idxConvert < convertIdArray.length; idxConvert++) {

				// 変換対象でなければ次へ
				if (saveDataArray[targetIdxArray[idxTarget]] != convertIdArray[idxConvert][0]) {
					continue;
				}

				// 装備データの変更
				saveDataArray[targetIdxArray[idxTarget]] = convertIdArray[idxConvert][1];

				// 時限効果の設定
				if (saveDataArray.slice(1751, 1751 + 20).indexOf(convertIdArray[idxConvert][2]) < 0) {
					// 設定されていなければ追加する
					for (idx = 0; idx < 20; idx++) {
						if (saveDataArray[1751 + idx] == 0) {
							saveDataArray[1751 + idx] = convertIdArray[idxConvert][2];
							break;
						}
					}
				}

				break;
			}
		}

	case 29:

		//----------------------------------------------------------------
		// 星帝等スキル欄整理＆プリ系ＳＷバグに対応する、セーブデータ補正
		//----------------------------------------------------------------

		// プリースト　習得スキル欄の修正
		if (saveDataArray[1] == JOB_ID_PRIEST) {
			for (idx = 36; idx >= 36; idx--) {
				saveDataArray[1060 + idx] = saveDataArray[1060 + idx - 1];
			}
			saveDataArray[1060 + 35] = saveDataArray[1060 + 32];
			saveDataArray[1060 + 32] = saveDataArray[1060 + 29];
			saveDataArray[1060 + 29] = 0;
		}

		// ハイプリースト　習得スキル欄の修正
		else if (saveDataArray[1] == JOB_ID_HIGHPRIEST) {
			for (idx = 40; idx >= 36; idx--) {
				saveDataArray[1060 + idx] = saveDataArray[1060 + idx - 1];
			}
			saveDataArray[1060 + 35] = saveDataArray[1060 + 32];
			saveDataArray[1060 + 32] = saveDataArray[1060 + 29];
			saveDataArray[1060 + 29] = 0;
		}

		// アークビシップ　習得スキル欄の修正
		else if (saveDataArray[1] == JOB_ID_ARCBISHOP) {

			// アンシラとエピクレシスを大きく移動、他は１個ずれ
			saveDataArray[1060 + 61] = saveDataArray[1060 + 60];
			saveDataArray[1060 + 60] = saveDataArray[1060 + 59];
			saveDataArray[1060 + 59] = saveDataArray[1060 + 58];
			saveDataArray[1060 + 58] = saveDataArray[1060 + 57];
			saveDataArray[1060 + 57] = saveDataArray[1060 + 56];
			saveDataArray[1060 + 56] = saveDataArray[1060 + 55];
			saveDataArray[1060 + 55] = saveDataArray[1060 + 54];
			saveDataArray[1060 + 54] = saveDataArray[1060 + 53];

			var epicleLv = saveDataArray[1060 + 52];
			var ancillaLv = saveDataArray[1060 + 51];

			saveDataArray[1060 + 53] = saveDataArray[1060 + 50];
			saveDataArray[1060 + 52] = saveDataArray[1060 + 49];
			saveDataArray[1060 + 51] = saveDataArray[1060 + 48];
			saveDataArray[1060 + 50] = saveDataArray[1060 + 47];
			saveDataArray[1060 + 49] = saveDataArray[1060 + 46];
			saveDataArray[1060 + 48] = saveDataArray[1060 + 45];
			saveDataArray[1060 + 47] = saveDataArray[1060 + 44];
			saveDataArray[1060 + 46] = saveDataArray[1060 + 43];
			saveDataArray[1060 + 45] = saveDataArray[1060 + 42];

			saveDataArray[1060 + 44] = epicleLv;
			saveDataArray[1060 + 43] = saveDataArray[1060 + 41];
			saveDataArray[1060 + 42] = saveDataArray[1060 + 40];
			saveDataArray[1060 + 41] = ancillaLv;

			for (idx = 40; idx >= 36; idx--) {
				saveDataArray[1060 + idx] = saveDataArray[1060 + idx - 1];
			}
			saveDataArray[1060 + 35] = saveDataArray[1060 + 32];
			saveDataArray[1060 + 32] = saveDataArray[1060 + 29];
			saveDataArray[1060 + 29] = 0;
		}

		// 拳聖　パッシブ持続系の修正
		else if (saveDataArray[1] == JOB_ID_STARGRADIATOR) {

			// 旧データを新番号へ移行（落法を２個後ろへ）
			var rakhoLv = saveDataArray[75 + 2];
			saveDataArray[75 + 2] = saveDataArray[75 + 3];
			saveDataArray[75 + 3] = saveDataArray[75 + 4];
			saveDataArray[75 + 4] = rakhoLv;

			// 祝福スキルを３種類に分割してクリア
			saveDataArray[75 + 16] = saveDataArray[75 + 14];
			saveDataArray[75 + 15] = saveDataArray[75 + 13];
			saveDataArray[75 + 14] = saveDataArray[75 + 12];
			saveDataArray[75 + 13] = 0;
			saveDataArray[75 + 12] = 0;
			saveDataArray[75 + 11] = 0;

		}

		// ソウルリンカー　パッシブ持続系の修正
		else if (saveDataArray[1] == JOB_ID_SOULLINKER) {

			// 旧データを新番号へ移行（スパート状態を[1]へ）
			var rakhoLv = saveDataArray[75 + 1];
			saveDataArray[75 + 1] = saveDataArray[75 + 5];
			// 落法をカイナの前へ
			saveDataArray[75 + 5] = saveDataArray[75 + 4];
			saveDataArray[75 + 4] = rakhoLv;
		}

	case 30:

		//----------------------------------------------------------------
		// 星帝パッシブ光系追加に対応する、セーブデータ補正
		//----------------------------------------------------------------

		if (saveDataArray[1] == JOB_ID_STAR_EMPEROR) {

			// 光系用の欄を追加
			saveDataArray[75 + 28] = saveDataArray[75 + 23];
			saveDataArray[75 + 27] = saveDataArray[75 + 22];
			saveDataArray[75 + 26] = saveDataArray[75 + 21];
			saveDataArray[75 + 25] = 0;		// 流星落下計算方法
			saveDataArray[75 + 24] = 0;		// 流星落下
			saveDataArray[75 + 23] = 0;
			saveDataArray[75 + 22] = saveDataArray[75 + 20];
			saveDataArray[75 + 21] = 0;
			saveDataArray[75 + 20] = saveDataArray[75 + 19];
			saveDataArray[75 + 19] = 0;

			// 攻撃手段の補助欄からの振り替え
			switch (saveDataArray[276]) {

			case SKILL_ID_TAIYO_BAKUHATSU:
				saveDataArray[75 + 19] = saveDataArray[278];
				saveDataArray[278] = 0;
				break;

			case SKILL_ID_MANGETSU_KYAKU:
				saveDataArray[75 + 21] = saveDataArray[278];
				saveDataArray[278] = 0;
				break;

			case SKILL_ID_RYUSE_RAKKA:
				saveDataArray[75 + 23] = saveDataArray[278];
				saveDataArray[278] = 0;
				break;
			}

		}

	case 31:

		//----------------------------------------------------------------
		// ランダムオプション処理変更に対応する、セーブデータ補正
		//----------------------------------------------------------------

		for (idx = 1260; idx < 1460; idx += 2) {

			switch (saveDataArray[idx]) {

			case 1:
				saveDataArray[idx] = 1;
				break;

			case 2:
				saveDataArray[idx] = 2;
				break;

			case 3:
				saveDataArray[idx] = 3;
				break;

			case 4:
				saveDataArray[idx] = 4;
				break;

			case 5:
				saveDataArray[idx] = 5;
				break;

			case 6:
				saveDataArray[idx] = 6;
				break;

			case 7:
				saveDataArray[idx] = 7;
				break;

			case 8:
				saveDataArray[idx] = 8;
				break;

			case 9:
				saveDataArray[idx] = 9;
				break;

			case 10:
				saveDataArray[idx] = 10;
				break;

			case 11:
				saveDataArray[idx] = 11;
				break;

			case 12:
				saveDataArray[idx] = 12;
				break;

			case 101:
				saveDataArray[idx] = 13;
				break;

			case 13:
				saveDataArray[idx] = 14;
				break;

			case 15:
				saveDataArray[idx] = 15;
				break;

			case 14:
				saveDataArray[idx] = 16;
				break;

			case 16:
				saveDataArray[idx] = 17;
				break;

			case 75:
				saveDataArray[idx] = 18;
				break;

			case 76:
				saveDataArray[idx] = 19;
				break;

			case 17:
				saveDataArray[idx] = 20;
				break;

			case 100:
				saveDataArray[idx] = 21;
				break;

			case 18:
				saveDataArray[idx] = 22;
				break;

			case 19:
				saveDataArray[idx] = 23;
				break;

			case 73:
				saveDataArray[idx] = 24;
				break;

			case 74:
				saveDataArray[idx] = 25;
				break;

			case 70:
				saveDataArray[idx] = 26;
				break;

			case 25:
				saveDataArray[idx] = 27;
				break;

			case 78:
				saveDataArray[idx] = 28;
				break;

			case 91:
				saveDataArray[idx] = 29;
				break;

			case 92:
				saveDataArray[idx] = 30;
				break;

			case 30:
				saveDataArray[idx] = 31;
				break;

			case 31:
				saveDataArray[idx] = 32;
				break;

			case 32:
				saveDataArray[idx] = 33;
				break;

			case 33:
				saveDataArray[idx] = 34;
				break;

			case 34:
				saveDataArray[idx] = 35;
				break;

			case 35:
				saveDataArray[idx] = 36;
				break;

			case 36:
				saveDataArray[idx] = 37;
				break;

			case 37:
				saveDataArray[idx] = 38;
				break;

			case 38:
				saveDataArray[idx] = 39;
				break;

			case 39:
				saveDataArray[idx] = 40;
				break;

			case 40:
				saveDataArray[idx] = 41;
				break;

			case 41:
				saveDataArray[idx] = 42;
				break;

			case 42:
				saveDataArray[idx] = 43;
				break;

			case 43:
				saveDataArray[idx] = 44;
				break;

			case 44:
				saveDataArray[idx] = 45;
				break;

			case 45:
				saveDataArray[idx] = 46;
				break;

			case 46:
				saveDataArray[idx] = 47;
				break;

			case 47:
				saveDataArray[idx] = 48;
				break;

			case 48:
				saveDataArray[idx] = 49;
				break;

			case 49:
				saveDataArray[idx] = 50;
				break;

			case 27:
				saveDataArray[idx] = 51;
				break;

			case 28:
				saveDataArray[idx] = 52;
				break;

			case 29:
				saveDataArray[idx] = 53;
				break;

			case 267:
				saveDataArray[idx] = 54;
				break;

			case 26:
				saveDataArray[idx] = 55;
				break;

			case 241:
				saveDataArray[idx] = 56;
				break;

			case 275:
				saveDataArray[idx] = 57;
				break;

			case 272:
				saveDataArray[idx] = 58;
				break;

			case 170:
				saveDataArray[idx] = 59;
				break;

			case 171:
				saveDataArray[idx] = 60;
				break;

			case 172:
				saveDataArray[idx] = 61;
				break;

			case 173:
				saveDataArray[idx] = 62;
				break;

			case 174:
				saveDataArray[idx] = 63;
				break;

			case 175:
				saveDataArray[idx] = 64;
				break;

			case 176:
				saveDataArray[idx] = 65;
				break;

			case 177:
				saveDataArray[idx] = 66;
				break;

			case 178:
				saveDataArray[idx] = 67;
				break;

			case 179:
				saveDataArray[idx] = 68;
				break;

			case 350:
				saveDataArray[idx] = 69;
				break;

			case 351:
				saveDataArray[idx] = 70;
				break;

			case 352:
				saveDataArray[idx] = 71;
				break;

			case 353:
				saveDataArray[idx] = 72;
				break;

			case 354:
				saveDataArray[idx] = 73;
				break;

			case 355:
				saveDataArray[idx] = 74;
				break;

			case 356:
				saveDataArray[idx] = 75;
				break;

			case 357:
				saveDataArray[idx] = 76;
				break;

			case 358:
				saveDataArray[idx] = 77;
				break;

			case 359:
				saveDataArray[idx] = 78;
				break;

			case 97:
				saveDataArray[idx] = 79;
				break;

			case 98:
				saveDataArray[idx] = 80;
				break;

			case 99:
				saveDataArray[idx] = 81;
				break;

			case 268:
				saveDataArray[idx] = 82;
				break;

			case 96:
				saveDataArray[idx] = 83;
				break;

			case 242:
				saveDataArray[idx] = 84;
				break;

			case 276:
				saveDataArray[idx] = 85;
				break;

			case 273:
				saveDataArray[idx] = 86;
				break;

			case 110:
				saveDataArray[idx] = 87;
				break;

			case 111:
				saveDataArray[idx] = 88;
				break;

			case 112:
				saveDataArray[idx] = 89;
				break;

			case 113:
				saveDataArray[idx] = 90;
				break;

			case 114:
				saveDataArray[idx] = 91;
				break;

			case 115:
				saveDataArray[idx] = 92;
				break;

			case 116:
				saveDataArray[idx] = 93;
				break;

			case 117:
				saveDataArray[idx] = 94;
				break;

			case 118:
				saveDataArray[idx] = 95;
				break;

			case 119:
				saveDataArray[idx] = 96;
				break;

			case 300:
				saveDataArray[idx] = 97;
				break;

			case 301:
				saveDataArray[idx] = 98;
				break;

			case 302:
				saveDataArray[idx] = 99;
				break;

			case 303:
				saveDataArray[idx] = 100;
				break;

			case 304:
				saveDataArray[idx] = 101;
				break;

			case 305:
				saveDataArray[idx] = 102;
				break;

			case 306:
				saveDataArray[idx] = 103;
				break;

			case 307:
				saveDataArray[idx] = 104;
				break;

			case 308:
				saveDataArray[idx] = 105;
				break;

			case 309:
				saveDataArray[idx] = 106;
				break;

			case 291:
				saveDataArray[idx] = 107;
				break;

			case 292:
				saveDataArray[idx] = 108;
				break;

			case 310:
				saveDataArray[idx] = 109;
				break;

			case 311:
				saveDataArray[idx] = 110;
				break;

			case 312:
				saveDataArray[idx] = 111;
				break;

			case 313:
				saveDataArray[idx] = 112;
				break;

			case 314:
				saveDataArray[idx] = 113;
				break;

			case 315:
				saveDataArray[idx] = 114;
				break;

			case 316:
				saveDataArray[idx] = 115;
				break;

			case 317:
				saveDataArray[idx] = 116;
				break;

			case 318:
				saveDataArray[idx] = 117;
				break;

			case 319:
				saveDataArray[idx] = 118;
				break;

			case 296:
				saveDataArray[idx] = 119;
				break;

			case 297:
				saveDataArray[idx] = 120;
				break;

			case 50:
				saveDataArray[idx] = 121;
				break;

			case 51:
				saveDataArray[idx] = 122;
				break;

			case 52:
				saveDataArray[idx] = 123;
				break;

			case 53:
				saveDataArray[idx] = 124;
				break;

			case 54:
				saveDataArray[idx] = 125;
				break;

			case 55:
				saveDataArray[idx] = 126;
				break;

			case 56:
				saveDataArray[idx] = 127;
				break;

			case 57:
				saveDataArray[idx] = 128;
				break;

			case 108:
				saveDataArray[idx] = 129;
				break;

			case 58:
				saveDataArray[idx] = 130;
				break;

			case 59:
				saveDataArray[idx] = 131;
				break;

			case 60:
				saveDataArray[idx] = 132;
				break;

			case 61:
				saveDataArray[idx] = 133;
				break;

			case 62:
				saveDataArray[idx] = 134;
				break;

			case 63:
				saveDataArray[idx] = 135;
				break;

			case 64:
				saveDataArray[idx] = 136;
				break;

			case 65:
				saveDataArray[idx] = 137;
				break;

			case 66:
				saveDataArray[idx] = 138;
				break;

			case 67:
				saveDataArray[idx] = 139;
				break;

			case 68:
				saveDataArray[idx] = 140;
				break;

			case 69:
				saveDataArray[idx] = 141;
				break;

			case 330:
				saveDataArray[idx] = 142;
				break;

			case 331:
				saveDataArray[idx] = 143;
				break;

			case 332:
				saveDataArray[idx] = 144;
				break;

			case 333:
				saveDataArray[idx] = 145;
				break;

			case 334:
				saveDataArray[idx] = 146;
				break;

			case 335:
				saveDataArray[idx] = 147;
				break;

			case 336:
				saveDataArray[idx] = 148;
				break;

			case 337:
				saveDataArray[idx] = 149;
				break;

			case 338:
				saveDataArray[idx] = 150;
				break;

			case 339:
				saveDataArray[idx] = 151;
				break;

			case 190:
				saveDataArray[idx] = 152;
				break;

			case 191:
				saveDataArray[idx] = 153;
				break;

			case 192:
				saveDataArray[idx] = 154;
				break;

			case 79:
				saveDataArray[idx] = 155;
				break;

			case 77:
				saveDataArray[idx] = 156;
				break;

			case 243:
				saveDataArray[idx] = 157;
				break;

			case 277:
				saveDataArray[idx] = 158;
				break;

			case 274:
				saveDataArray[idx] = 159;
				break;

			case 226:
				saveDataArray[idx] = 160;
				break;

			case 227:
				saveDataArray[idx] = 161;
				break;

			case 194:
				saveDataArray[idx] = 162;
				break;

			case 102:
				saveDataArray[idx] = 163;
				break;

			}
		}

	case 32:

		//----------------------------------------------------------------
		// 一部武器の装備職業設定ミスに対応する、セーブデータ補正
		//----------------------------------------------------------------

		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {

			// 右手武器欄を補正
			if ([4354, 4355, 4356].indexOf(saveDataArray[16]) >= 0) {
				// 武器はナイフに変更
				saveDataArray[16] = 1;
				// カードは維持
				// エンチャントはクリア
				saveDataArray[18] = 0;
				saveDataArray[19] = 0;
				saveDataArray[20] = 0;
			}
		}

	case 33:

		//----------------------------------------------------------------
		// 一部ランダムオプション数値設定不要化に対応する、セーブデータ補正
		//----------------------------------------------------------------

		if (saveDataArray[1322] == 216) {
			saveDataArray[1323] = 1;
		}

	case 34:

		//----------------------------------------------------------------
		// モンスターマップ出力に対応する、セーブデータ補正
		//----------------------------------------------------------------

		saveDataArray[1771] = MONSTER_MAP_ID_CATEGORY_ALL;
		saveDataArray[1772] = MONSTER_MAP_ID_MAP_ALL;

	case 35:

		//----------------------------------------------------------------
		// 性能カスタマイズ負数対応＆負数表現変更に対応する、セーブデータ補正
		//----------------------------------------------------------------

		//--------------------------------
		// 負数表現変更に対応する補正
		//--------------------------------

		// 対プレイヤー設定
		saveDataMappingArray = CSaveDataMappingManager.GetMappingArray(35);

		for (idx = 0; idx < n_B_TAISEI.length; idx++) {

			// 対象外のデータは処理しない
			if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) < 0) {
				continue;
			}

			// 固定バイアスを戻す
			saveDataArray[850 + idx] -= SAVE_DATA_BIAS_CONF_PLAYER_500;

			// 符号付き数値から符号なし数値に変換（共通処理へ合流するため）
			saveDataArray[850 + idx] = CSaveDataConverter.ConvertSignedToUnsigned(saveDataArray[850 + idx], saveDataMappingArray[850 + idx]);
		}

	case 36:

		//----------------------------------------------------------------
		// 攻撃手段データ構造変更に対応する、セーブデータ補正
		//----------------------------------------------------------------

		saveDataArray[283] = saveDataArray[282];
		saveDataArray[282] = saveDataArray[281];
		saveDataArray[281] = saveDataArray[280];
		saveDataArray[280] = saveDataArray[279];
		saveDataArray[279] = saveDataArray[278];
		saveDataArray[278] = saveDataArray[277];

		if (saveDataArray[276] >= AUTO_SPELL_ID_CUSTOM_BIAS) {
			saveDataArray[277] = ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL;
			saveDataArray[276] = AutoSpellSkill[parseInt(saveDataArray[276], 10) - AUTO_SPELL_ID_CUSTOM_BIAS][AUTO_SPELL_DATA_INDEX_SKILL_ID];
		}
		else if (saveDataArray[276] >= USABLE_SKILL_ID_CUSTOM_BIAS) {
			saveDataArray[277] = ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL;
			saveDataArray[276] = InsertSkill[parseInt(saveDataArray[276], 10) - USABLE_SKILL_ID_CUSTOM_BIAS][USABLE_SKILL_DATA_INDEX_SKILL_ID];
		}
		else {
			saveDataArray[277] = ATTACK_METHOD_SOURCE_TYPE_JOB_LEARN;
			// saveDataArray[276] は修正なし
		}

	case 37:

		//----------------------------------------------------------------
		// モンスターマップ登録ミスに対応する、セーブデータ補正
		//----------------------------------------------------------------

		if (saveDataArray[1772] == 203) {
			if (saveDataArray[1771] == 42) {
				saveDataArray[1771] = MONSTER_MAP_ID_CATEGORY_ALL;
			}
		}

		if (saveDataArray[1772] >= 203) {
			saveDataArray[1772]++;
		}

	case 38:

		//----------------------------------------------------------------
		// ファロスエンチャントに対応する、セーブデータ補正
		//----------------------------------------------------------------

		// 従来、カードが設定できた場所が、エンチャントになったことに対応する
		// 本来は存在しないスロットだが、万が一カードが設定されていた場合を考慮し、
		// カードなしの状態へ補正する

		// 右手武器
		if (GetEnchantTypeId(ItemObjNew[saveDataArray[16]][ITEM_DATA_INDEX_WPNLV]) == 347) {
			saveDataArray[17 + 3] = CARD_ID_NONE;
		}

		// 左手武器
		if (GetEnchantTypeId(ItemObjNew[saveDataArray[22]][ITEM_DATA_INDEX_WPNLV]) == 347) {
			saveDataArray[23 + 3] = CARD_ID_NONE;
		}

	case 39:

		//----------------------------------------------------------------
		// マーシュオブアビスの敵異常への変更に対応する、セーブデータ補正
		//----------------------------------------------------------------

		if (saveDataArray[1] == JOB_ID_WARLOCK) {

			// パッシブ持続系欄で、マーシュオブアビスが設定されている場合、敵の状態異常へ振り替え
			if (saveDataArray[75 + 5] > 0) {
				saveDataArray[286 + 48] = saveDataArray[75 + 5];
			}

			// パッシブ持続系欄を詰める
			saveDataArray[75 + 5] = saveDataArray[75 + 6];
			saveDataArray[75 + 6] = saveDataArray[75 + 7];
			saveDataArray[75 + 7] = 0;
			// 以降、当該職業では、設定欄なし
		}

	case 40:

		//----------------------------------------------------------------
		// 一部武器の装備職業設定ミスに対応する、セーブデータ補正
		//----------------------------------------------------------------

		if (saveDataArray[1] == JOB_ID_SUPERNOVICE_PLUS) {

			// 右手武器欄を補正
			if ([ITEM_ID_ILLUSION_COUNTER_DAGGER, ITEM_ID_ILLUSION_GEKKOKEN, ITEM_ID_KIRINO_YOTO, ITEM_ID_ILLUSION_MUKEKEN].indexOf(saveDataArray[16]) >= 0) {
				// 武器は素手に変更
				saveDataArray[16] = 0;
				// カードエンチャントはクリア
				saveDataArray[17] = 0;
				saveDataArray[18] = 0;
				saveDataArray[19] = 0;
				saveDataArray[20] = 0;
			}
		}

	case 41:

		//----------------------------------------------------------------
		// シーズンエンチャントの対象設定ミスに対応する、セーブデータ補正
		//----------------------------------------------------------------

		// 右手武器のエンチャントを補正
		if ([ITEM_ID_SHIRONO_KISHIDANNO_NEKOZYARASHI, ITEM_ID_KUCHITA_GARDEN_KNIFE, ITEM_ID_ANTIQUE_GATLINGGUN, ITEM_ID_MADOSHINO_KIOKU, ITEM_ID_RIKUTO_SANRYAKU].indexOf(saveDataArray[16]) >= 0) {
			saveDataArray[18] = 0;
		}

	case 42:

		//----------------------------------------------------------------
		// エンチャントデータ形式移行に対応する、セーブデータ補正
		//----------------------------------------------------------------

		// CARD_ID_ENCHANT_ARMS_ELEMENT の廃止に伴うリセット
		var targetIndexArrayWork = [
			17, 18, 19, 20,
			23, 24, 25, 26,
		];
		targetIndexArrayWork.forEach(
			function (valueF, indexF, arrayF) {
				if (saveDataArray[valueF] == 1841) {
					saveDataArray[valueF] = 0;
				}
			}
		);

		// 武器属性エンチャント対応による、スロットの初期化
		// （本来そのアイテムには存在しないスロットだが、カードを設定している可能性を考え、初期化する）
		if (
			(saveDataArray[16] == 4047)
			|| (saveDataArray[16] == 4251)
			|| (saveDataArray[16] == 4431)
			|| (saveDataArray[16] == 4450)
			|| (saveDataArray[16] == 4456)
			|| (saveDataArray[16] == 4534)
		) {
			saveDataArray[18] = 0;
		}

		// 破壊不可→破壊不可(鎧)への置き換え
		var targetIndexArrayWork = [
			47, 48, 49, 50,
		];
		targetIndexArrayWork.forEach(
			function (valueF, indexF, arrayF) {
				if (saveDataArray[valueF] == 1178) {
					saveDataArray[valueF] = 2168;
				}
			}
		);

		// 「お金を失った者の心[1]」に、エンチャントが設定できた問題の修正
		if (saveDataArray[28] == 1816) {
			saveDataArray[30] = 0;
			saveDataArray[31] = 0;
			saveDataArray[32] = 0;
		}

		// スロットなし「サバイバルロッド」に、エンチャントが設定できた問題の修正
		if ((saveDataArray[16] == 474) || (saveDataArray[16] == 476)) {
			saveDataArray[19] = 0;
			saveDataArray[20] = 0;
		}

		// 「狐耳鈴リボン」の第３スロットに、「大司教2」が設定できた問題の修正
		if (saveDataArray[28] == 2085) {
			if (saveDataArray[31] == 610) {
				saveDataArray[31] = 0;
			}
		}

		// 「パワードブーツ」の第２スロットに、「Flee+6」が設定できた問題の修正
		if (saveDataArray[58] == 2713) {
			if (saveDataArray[60] == 512) {
				saveDataArray[60] = 0;
			}
		}

		// 「ガーディアンブースター」の第２スロットに、「Flee+6」が設定できた問題の修正
		if (saveDataArray[58] == 2718) {
			if (saveDataArray[60] == 512) {
				saveDataArray[60] = 0;
			}
		}

		// 「ユニコーンの兜」の第３スロットに、「プレイヤー耐性12」が設定できた問題の修正
		if (saveDataArray[28] == 2755) {
			if (saveDataArray[31] == 1395) {
				saveDataArray[31] = 0;
			}
		}

		// 「バレルヘルム」の第３スロットに、「プレイヤー耐性12」が設定できた問題の修正
		if (saveDataArray[28] == 2923) {
			if (saveDataArray[31] == 1395) {
				saveDataArray[31] = 0;
			}
		}

		// 「ゴッズヘルム」の第３スロットに、「プレイヤー耐性12」が設定できた問題の修正
		if (saveDataArray[28] == 3210) {
			if (saveDataArray[31] == 1395) {
				saveDataArray[31] = 0;
			}
		}

		// 「デモニッシュシールド」の第４スロットに、「大司教1」、「大司教2」、「大聖堂1」が設定できた問題の修正
		if (saveDataArray[22] == 3804) {
			if ((saveDataArray[26] == 609) || (saveDataArray[26] == 610) || (saveDataArray[26] == 612)) {
				saveDataArray[26] = 0;
			}
		}

		// 「プロキオンリング」の第３スロットに、「プレイヤー耐性3」が設定できた問題の修正
		if (saveDataArray[64] == 4143) {
			if (saveDataArray[67] == 1170) {
				saveDataArray[67] = 0;
			}
		}
		if (saveDataArray[70] == 4143) {
			if (saveDataArray[73] == 1170) {
				saveDataArray[73] = 0;
			}
		}

	case 43:

		// セーブデータ補正なし

	case 44:

		//----------------------------------------------------------------
		// フリッグの歌三次職支援への移動に対応する、セーブデータ補正
		//----------------------------------------------------------------

		// 設定欄の振り替え
		if (saveDataArray[448 + 19] == 7) {
			saveDataArray[1480 + 27] = saveDataArray[448 + 37];
			saveDataArray[448 + 19] = 0;
			saveDataArray[448 + 37] = 0;
		}

	case 45:

		// セーブデータ補正なし

	case 46:

		//----------------------------------------------------------------
		// 未実装データの選択不可に対応する、セーブデータ補正
		//----------------------------------------------------------------

		var targetIdArrayWork = [
			ITEM_ID_723,	// サクリファイスリング
			ITEM_ID_771,	// 初心者用アドベンチャースーツ
			ITEM_ID_897,	// 暗殺者のダマスカス(勇猛)
			ITEM_ID_898,	// 暗殺者のダマスカス(特攻)
			ITEM_ID_899,	// グラディエーターのブレイド(特攻)
			ITEM_ID_900,	// グラディエーターのブレイド(勇猛)
			ITEM_ID_901,	// 突撃隊長のカッツバルケル(特攻)
			ITEM_ID_902,	// 突撃隊長のカッツバルケル(勇猛)
			ITEM_ID_903,	// 突撃隊長のスピアー
			ITEM_ID_904,	// 突撃隊長のランス
			ITEM_ID_905,	// 狂戦士のバトルアックス(特攻)
			ITEM_ID_906,	// 狂戦士のバトルアックス(勇猛)
			ITEM_ID_907,	// 闘士のモーニングスター(特攻)
			ITEM_ID_908,	// 闘士のモーニングスター(勇猛)
			ITEM_ID_909,	// 虐殺のカタール(勇猛)
			ITEM_ID_910,	// 虐殺のカタール(特攻)
			ITEM_ID_911,	// 孫子兵法(勇猛)
			ITEM_ID_912,	// 孫子兵法(特攻)
			ITEM_ID_913,	// バトルクロスボウ(特攻)
			ITEM_ID_914,	// バトルクロスボウ(勇猛)
			ITEM_ID_915,	// 闘士のバトルフィスト(特攻)
			ITEM_ID_916,	// 闘士のバトルフィスト(勇猛)
			ITEM_ID_917,	// ウォーロックの魔法杖
			ITEM_ID_918,	// ウォーロックの戦闘杖
			ITEM_ID_919,	// 強い回復の杖
			ITEM_ID_920,	// 早い回復の杖
			ITEM_ID_921,	// 戦場のギター(特攻)
			ITEM_ID_922,	// 戦場のギター(勇猛)
			ITEM_ID_923,	// バトルラリエット(特攻)
			ITEM_ID_924,	// バトルラリエット(勇猛)
			ITEM_ID_925,	// ソルジャーハンドガン
			ITEM_ID_926,	// ソルジャーライフル
			ITEM_ID_927,	// ソルジャーガトリングガン
			ITEM_ID_928,	// ソルジャーショットガン
			ITEM_ID_929,	// ソルジャーグレネードガン
			ITEM_ID_930,	// 戦闘風魔手裏剣(勇猛)
			ITEM_ID_931,	// 戦闘風魔手裏剣(特攻)
			ITEM_ID_958,	// 突撃隊長のプレート
			ITEM_ID_959,	// 精鋭工兵の鎧
			ITEM_ID_960,	// 暗殺者のローブ
			ITEM_ID_961,	// ウォーロックの戦闘ローブ
			ITEM_ID_962,	// 衛生兵のローブ
			ITEM_ID_963,	// 精鋭軍兵のスーツ
			ITEM_ID_964,	// 精鋭射手のスーツ
			ITEM_ID_965,	// 司令官のマント
			ITEM_ID_966,	// 指揮官のマント
			ITEM_ID_967,	// 保安官のマント
			ITEM_ID_968,	// 戦闘グリーブ
			ITEM_ID_969,	// 軍靴
			ITEM_ID_970,	// 戦闘ブーツ
			ITEM_ID_978,	// 武功勲章(剣士系)
			ITEM_ID_979,	// 武功勲章(シーフ系)
			ITEM_ID_980,	// 武功勲章(聖系)
			ITEM_ID_981,	// 武功勲章(魔系)
			ITEM_ID_982,	// 武功勲章(弓系)
			ITEM_ID_983,	// 武功勲章(商人系)
			ITEM_ID_984,	// 保安官バッジ
			ITEM_ID_NOVICE_FIGURE,		// ノービスフィギュア
			ITEM_ID_SWORDMAN_FIGURE,	// ソードマンフィギュア
			ITEM_ID_ACOLYTE_FIGURE,		// アコライトフィギュア
			ITEM_ID_MAGICIAN_FIGURE,	// マジシャンフィギュア
			ITEM_ID_ARCHER_FIGURE,		// アーチャーフィギュア
			ITEM_ID_THIEF_FIGURE,		// シーフフィギュア
			ITEM_ID_MERCHANT_FIGURE,	// マーチャントフィギュア
		];

		var dataIdxArray = [
			[16, 0],
			[22, 305],		// 素手の場合、盾選択状態になる
			[28, 142],
			[34, 243],
			[40, 268],
			[46, 279],
			[52, 311],
			[58, 317],
			[64, 326],
			[70, 326],
		];

		// すべての装備個所を走査
		// （対象アイテムに盾はないので、すべて同一ロジックで処理できる）
		for (idx = 0; idx < dataIdxArray.length; idx++) {

			// 削除対象装備が設定されている場合
			if (targetIdArrayWork.indexOf(saveDataArray[ dataIdxArray[idx][0] ]) >= 0) {

				// 装備なしに設定
				saveDataArray[ dataIdxArray[idx][0] ] = dataIdxArray[idx][1];

				// 精錬値リセット
				saveDataArray[ dataIdxArray[idx][0] - 1 ] = 0;

				// カード全解除
				saveDataArray[ dataIdxArray[idx][0] + 1 ] = 0;
				saveDataArray[ dataIdxArray[idx][0] + 2 ] = 0;
				saveDataArray[ dataIdxArray[idx][0] + 3 ] = 0;
				saveDataArray[ dataIdxArray[idx][0] + 4 ] = 0;
			}
		}

	case 47:

		// セーブデータ補正なし

	case 48:

		// セーブデータ補正なし

	case 49:

		// セーブデータ補正なし

	case 50:

		var targetIdArrayWork = [
			4719,
			4720,
			4721,
			4722,
			4723,
			4725,
			4727,
			4728,
			4729,
			4731,
		];

		var dataIdxArray = [
			[16, 0],
			[22, 305],		// 素手の場合、盾選択状態になる
			[28, 142],
			[34, 243],
			[40, 268],
			[46, 279],
			[52, 311],
			[58, 317],
			[64, 326],
			[70, 326],
		];

		var cardIdChangeArray = [
			[665, 2570],
			[670, 2571],
			[675, 2572],
			[680, 2573],
			[685, 2574],
			[689, 2575],
			[2501, 2576],
			[2502, 2577],
			[2503, 2578],
			[2504, 2579],
			[2505, 2580],
			[2506, 2581],
			[2508, 2582],
			[2509, 2583],
			[1843, 2584],
			[2507, 2585],
			[2169, 2586],
			[1247, 2587],
			[1425, 2590],
			[1428, 2591],
			[1179, 2592],
			[1246, 2593],
		];

		// すべての装備個所を走査
		// （対象アイテムに盾はないので、すべて同一ロジックで処理できる）
		for (idx = 0; idx < dataIdxArray.length; idx++) {

			// 変更対象装備が設定されている場合
			if (targetIdArrayWork.indexOf(saveDataArray[ dataIdxArray[idx][0] ]) >= 0) {

				// カード変更
				for (var idxCard = 0; idxCard < cardIdChangeArray.length; idxCard++) {
					for (var offset = 1; offset <= 4; offset++) {
						if (saveDataArray[ dataIdxArray[idx][0] + offset ] == cardIdChangeArray[idxCard][0]) {
							saveDataArray[ dataIdxArray[idx][0] + offset ] = cardIdChangeArray[idxCard][1];
						}
					}
				}
			}
		}

	case 51:

		// セーブデータ補正なし




	}



	return saveDataArray;
}





function LoadButton(){

	with(document.calcForm){

		var SaveNum = eval(A_SaveSlot.value);

		DecodeUrl(SaveDataAll[SaveNum]);

		if(n_CONFIG[2] > 19){
			if(SaveNameAll[SaveNum] != "ZZZZ") document.calcForm.SAVE_NAME.value = SaveNameAll[SaveNum];
			else document.calcForm.SAVE_NAME.value = "名前入力可能";
		}
	}
}






function URLIN(strUrl){

	var splittedArray = null;

	// ＵＲＬからパラメタ部分を切り出す
	splittedArray = strUrl.split("?");

	// データがなければ処理終了
	if (splittedArray.length < 2) {
		return;
	}

	// データ復元
	DecodeUrl(splittedArray[1]);

	// 再計算
	calc();
}



/**
 * セーブデータ文字列長を、カレントバージョンのデータ長に合わせる.
 * @param 展開済みセーブデータ文字列
 * @return データ長が合わせられたセーブデータ文字列
 */
function AdaptSaveDataStrSize(saveDataStrExtracted) {

	var idx = 0;

	var saveDataMappingArrayCurrent = null;

	var saveDataStrLengthCurret = 0;
	var saveDataStrLengthTarget = 0;
	var saveDataStrLengthDiff = 0;

	// カレントバージョンのデータ長定義を取得
	saveDataMappingArrayCurrent = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);

	// カレントバージョンの全データ長を計算
	saveDataStrLengthCurret = 0;
	for (idx = 0; idx < saveDataMappingArrayCurrent.length; idx++) {
		saveDataStrLengthCurret += saveDataMappingArrayCurrent[idx];
	}

	// 対象データのデータ長を取得
	saveDataStrLengthTarget = saveDataStrExtracted.length;

	// データ長の差を計算
	saveDataStrLengthDiff = saveDataStrLengthCurret - saveDataStrLengthTarget;

	// 不足分を空データで補う
	if (saveDataStrLengthDiff > 0) {
		for (idx = 0; idx < saveDataStrLengthDiff; idx++) {
			saveDataStrExtracted += CSaveDataConverter.ConvertNtoS(0, 1);
		}
	}

	// 過剰分を切り捨て
	else if (saveDataStrLengthDiff < 0) {
		saveDataStrExtracted = saveDataStrExtracted.substr(0, saveDataStrLengthCurret);
	}

	return saveDataStrExtracted;
}



/**
 * ＵＲＬ文字列からデータを復元する.
 */
function DecodeUrl(loadDataUrl){

	var idx = 0;
	var idxLoop = 0;
	var idxEquip = 0;
	var idxCard = 0;
	var idxEnchList = 0;
	var idxOffset = 0;
	var pos = 0;

	var bDispRndOptMode = false;

	var loopInfoArray = null;

	var valueWork = 0;

	var saveDataStrExtracted = "";
	var saveDataMappingArray = null;
	var saveDataMappingArrayCurrent = null;

	var versionTarget = 0;

	var SaveData = new Array();

	// カード設定用関数
	var funcLoadAndSetCard = function (objIdPrifixF, soldNoF, enchListIdF, cardIdF) {

		var idxF = 0;

		var objSelectF = null;
		var objOptgroup = null;
		var objOption = null;

		var enchListIdArrayF = null;
		var rgnTextF = null;

		// 従来の設定方法による設定
		HtmlSetObjectValueById(objIdPrifixF + "_CARD_" + soldNoF, cardIdF);

		// 可能であれば、エンチャントリストの選択状態を復元する
		do {

			// セレクトボックス取得
			objSelectF = document.getElementById(objIdPrifixF + "_CARD_" + soldNoF);
			if (!objSelectF) {
				break;
			}

			// optgroup のリストを取得
			objOptgroup = objSelectF.querySelector(":scope > optgroup[data-ench-list-id=\"" + enchListIdF + "\"]");
			if (!objOptgroup) {
				break;
			}

			// option を取得
			objOption = objOptgroup.querySelector(":scope > option[value=\"" + cardIdF + "\"]");
			if (!objOption) {
				break;
			}

			objOption.selected = true;

		} while (false);

		// エンチャントリストIDデータ設定
		rgnTextF = objIdPrifixF.replace(/^OBJECT_/, "");

		enchListIdArrayF = g_charaData.cardCategoryMap.get(rgnTextF);
		if (!enchListIdArrayF) {
			enchListIdArrayF = [0, 0, 0, 0];
			g_charaData.cardCategoryMap.set(rgnTextF, enchListIdArrayF);
		}

		enchListIdArrayF[soldNoF - SLOT_INDEX_CARD_MIN] = enchListIdF;

		// ステートフルデータ設定
		SetStatefullData("DATA_" + objIdPrifixF + "_CARD_" + soldNoF, cardIdF);
	};



	var msg = "";
	var bFlag = false;

	var objidPrifix = "";
	var objidKind = "";
	var objidValue = "";
	var objSelect = null;



	//----------------------------------------------------------------
	// データなしは処理しない
	//----------------------------------------------------------------
	if (loadDataUrl == "ZZZZ") {
		return;
	}


	//----------------------------------------------------------------
	// カレントバージョンのデータ長定義を取得し、配列領域を用意
	//----------------------------------------------------------------
	SaveData = MallocArray(CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION).length, 0);


	//----------------------------------------------------------------
	// 対象データ文字列を展開し、データ長を補正
	//----------------------------------------------------------------
	saveDataStrExtracted = SaveDataChange(loadDataUrl);
	saveDataStrExtracted = AdaptSaveDataStrSize(saveDataStrExtracted);


	//----------------------------------------------------------------
	// 対象データのバージョンを取得
	//----------------------------------------------------------------
	versionTarget = GetSaveDataVersion(saveDataStrExtracted);


	//----------------------------------------------------------------
	// 対象バージョンのデータ長定義を取得
	//----------------------------------------------------------------
	saveDataMappingArray = CSaveDataMappingManager.GetMappingArray(versionTarget);


	//----------------------------------------------------------------
	// 対象データ読み込み
	//----------------------------------------------------------------
	for (idx = 0, pos = 0; (idx < saveDataMappingArray.length) && (pos < saveDataStrExtracted.length); idx++) {
		SaveData[idx] = saveDataStrExtracted.substr(pos, saveDataMappingArray[idx]);
		pos += saveDataMappingArray[idx];
	}


	//----------------------------------------------------------------
	// データ変換
	//----------------------------------------------------------------
	for (idx = 0; idx < SaveData.length; idx++) {
		SaveData[idx] = CSaveDataConverter.ConvertStoN(SaveData[idx]);
	}


	//----------------------------------------------------------------
	// バージョンチェック
	//----------------------------------------------------------------
	if (CURRENT_VERSION < SaveData[0]) {

		// 新形式でのロードを試す
		try {
			CSaveController.loadFromURL(loadDataUrl);
		}
		// 新形式もダメならエラー
		catch (err) {
			msg = "サポートされていないセーブデータです。\n";
			msg += "サポートバージョン：" + CURRENT_VERSION + "\n";
			msg += "データバージョン：" + SaveData[0];
			alert(msg);
		}

		return;
	}


	//----------------------------------------------------------------
	// セーブデータのバージョンごとの互換性変換
	//----------------------------------------------------------------
	SaveData = VersionModify(SaveData);


	//----------------------------------------------------------------
	// カレントバージョンのデータ長定義を取得
	//----------------------------------------------------------------
	saveDataMappingArrayCurrent = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);


	//----------------------------------------------------------------
	// 表示モード切替
	//----------------------------------------------------------------
	if (GetSlotMode() == SLOTPAGER_MODE_RNDOPT) {
		bDispRndOptMode = true;
		OnClickSlotModeButton();
	}



	//----------------------------------------------------------------
	// 対応職業チェック（四次対応で平行稼働するため）
	//----------------------------------------------------------------
	if (g_constDataManager.GetDataManger(CONST_DATA_KIND_JOB).EnumId().indexOf(parseInt(SaveData[1], 10)) < 0) {
		msg = "この計算機では対応していない職業のセーブデータです。\n";
		msg += "計算機バージョン：" + CURRENT_VERSION + "\n";
		msg += "職業ID：" + SaveData[1];
		alert(msg);
		return;
	}



	with(document.calcForm){

		//----------------------------------------------------------------
		// 職業の読み込み
		//----------------------------------------------------------------
		A_JOB.value = SaveData[1];
		OnChangeJobSelect(SaveData[1]);

		// レベル補正（旧データ対応？）
		if (SaveData[1] == 20 && SaveData[2] <45) {
			SaveData[2] = 45;
		}


		//----------------------------------------------------------------
		// スパノビ　全武器チェック
		//----------------------------------------------------------------
		bFlag = false;
		if (IsSameJobClass(JOB_ID_SUPERNOVICE) || IsSameJobClass(JOB_ID_SUPERNOVICE_PLUS)) {
			if (eval(SaveData[84]) == 1) {
				bFlag = true;
			}

			RefreshSuperNoviceFullWeapon(bFlag);
		}


		//----------------------------------------------------------------
		// 基本情報の読み込み
		//----------------------------------------------------------------
		A_BaseLV.value = SaveData[2];
		A_JobLV.value = SaveData[3];
		A_STR.value = SaveData[4];
		A_AGI.value = SaveData[5];
		A_VIT.value = SaveData[6];
		A_DEX.value = SaveData[7];
		A_INT.value = SaveData[8];
		A_LUK.value = SaveData[9];


		//----------------------------------------------------------------
		// モンスターＩＤの読み込み
		//----------------------------------------------------------------
		CMonsterMapAreaComponentManager.ChangeSelect(
			SaveData[1771],
			SaveData[1772],
			SaveData[10],
			true
		);

		//----------------------------------------------------------------
		// ベースレベル自動調整チェックの読み込み
		//----------------------------------------------------------------
		if (SaveData[0] == 0) {
			SaveData[11] = 1;
		}
		BLVauto.checked = SaveData[11];


		//----------------------------------------------------------------
		// 旧養子情報の読み込み
		//----------------------------------------------------------------
		if (SaveData[0] <= 6) {
			if (SaveData[275]) {
				SaveData[275] = 0;
				SaveData[743] = 1;
			}
		}


		//----------------------------------------------------------------
		// 武器種別の読み込み
		//----------------------------------------------------------------
		OnChangeArmsTypeRight(ItemObjNew[SaveData[16]][ITEM_DATA_INDEX_KIND]);


		//----------------------------------------------------------------
		// 左手武器の読み込み
		//----------------------------------------------------------------
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ASSASIN
			&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 61
			&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 0) {

			A_Weapon2Type.value = ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND];
			OnChangeArmsTypeLeft(ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND]);
		}

		else if ((IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO))
				&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 61
				&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 0) {

			A_Weapon2Type.value = ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND];
			OnChangeArmsTypeLeft(ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND]);
		}


		//----------------------------------------------------------------
		// 矢、弾丸の読み込み
		//----------------------------------------------------------------
		HtmlSetObjectValueById("OBJID_SELECT_ARROW", SaveData[12]);


		//----------------------------------------------------------------
		// 速度ＰＯＴの読み込み
		//----------------------------------------------------------------
		A_SpeedPOT.value = SaveData[13];


		//----------------------------------------------------------------
		// 右手武器の読み込み
		//----------------------------------------------------------------
		A_Weapon_zokusei.value = SaveData[14];
		A_Weapon_ATKplus.value = SaveData[15];

		objidPrifix = "OBJID_ARMS_RIGHT";
		eqpRgn = EQUIP_REGION_ID_ARMS;
		idxEquip = 16;
		idxCard = 17;
		idxEnchList = 1781;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_ARMS);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// 左手武器の読み込み（二刀流時のみ）
		//----------------------------------------------------------------
		if (n_Nitou) {
			A_Weapon2_ATKplus.value = SaveData[21];

			objidPrifix = "OBJID_ARMS_LEFT";
			eqpRgn = EQUIP_REGION_ID_ARMS_LEFT;
			idxEquip = 22;
			idxCard = 23;
			idxEnchList = 1785;

			// 選択欄への反映
			HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
			SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

			// スロット欄の更新
			if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
				RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
				SetCardSlotEnability(EQUIP_REGION_ID_ARMS_LEFT);
			}
			else {
				RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
				// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
				SetRndOptEnablityAll();
				// SetEnchSlotsEnablity();
			}

			// カードデータの読み込み
			for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
				funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
			}
		}


		//----------------------------------------------------------------
		// 盾の読み込み
		//----------------------------------------------------------------
		else {
			A_SHIELD_DEF_PLUS.value = SaveData[21];

			objidPrifix = "OBJID_SHIELD";
			eqpRgn = EQUIP_REGION_ID_SHIELD;
			idxEquip = 22;
			idxCard = 23;
			idxEnchList = 1785;

			// 選択欄への反映
			HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
			SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

			// スロット欄の更新
			if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
				RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
				SetCardSlotEnability(EQUIP_REGION_ID_SHIELD);
			}
			else {
				RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
				// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
				SetRndOptEnablityAll();
				// SetEnchSlotsEnablity();
			}

			// カードデータの読み込み
			for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
				funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
			}
		}


		//----------------------------------------------------------------
		// 頭上段の読み込み
		//----------------------------------------------------------------
		A_HEAD_DEF_PLUS.value = SaveData[27];

		objidPrifix = "OBJID_HEAD_TOP";
		eqpRgn = EQUIP_REGION_ID_HEAD_TOP;
		idxEquip = 28;
		idxCard = 29;
		idxEnchList = 1789;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_HEAD_TOP);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// 頭中段の読み込み
		//----------------------------------------------------------------
		objidPrifix = "OBJID_HEAD_MID";
		eqpRgn = EQUIP_REGION_ID_HEAD_MID;
		idxEquip = 34;
		idxCard = 35;
		idxEnchList = 1793;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_HEAD_MID);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// 頭下段の読み込み
		//----------------------------------------------------------------
		objidPrifix = "OBJID_HEAD_UNDER";
		eqpRgn = EQUIP_REGION_ID_HEAD_UNDER;
		idxEquip = 40;
		idxCard = 41;
		idxEnchList = 1797;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_HEAD_UNDER);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// 体防具の読み込み
		//----------------------------------------------------------------
		A_BODY_DEF_PLUS.value = SaveData[45];

		objidPrifix = "OBJID_BODY";
		eqpRgn = EQUIP_REGION_ID_BODY;
		idxEquip = 46;
		idxCard = 47;
		idxEnchList = 1801;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_BODY);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// 肩防具の読み込み
		//----------------------------------------------------------------
		A_SHOULDER_DEF_PLUS.value = SaveData[51];

		objidPrifix = "OBJID_SHOULDER";
		eqpRgn = EQUIP_REGION_ID_SHOULDER;
		idxEquip = 52;
		idxCard = 53;
		idxEnchList = 1805;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_SHOULDER);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// 靴防具の読み込み
		//----------------------------------------------------------------
		A_SHOES_DEF_PLUS.value = SaveData[57];

		objidPrifix = "OBJID_SHOES";
		eqpRgn = EQUIP_REGION_ID_SHOES;
		idxEquip = 58;
		idxCard = 59;
		idxEnchList = 1809;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_SHOES);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// アクセサリ１の読み込み
		//----------------------------------------------------------------
		objidPrifix = "OBJID_ACCESSARY_1";
		eqpRgn = EQUIP_REGION_ID_ACCESSARY_1;
		idxEquip = 64;
		idxCard = 65;
		idxEnchList = 1813;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_ACCESSARY_1);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}


		//----------------------------------------------------------------
		// アクセサリ２の読み込み
		//----------------------------------------------------------------
		objidPrifix = "OBJID_ACCESSARY_2";
		eqpRgn = EQUIP_REGION_ID_ACCESSARY_2;
		idxEquip = 70;
		idxCard = 71;
		idxEnchList = 1817;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCardSelect(eqpRgn, SaveData[idxEquip]);
			SetCardSlotEnability(EQUIP_REGION_ID_ACCESSARY_2);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// カードデータの読み込み
		for (idx = SLOT_INDEX_CARD_MIN; idx <= SLOT_INDEX_CARD_MAX; idx++) {
			funcLoadAndSetCard(objidPrifix, idx, SaveData[idxEnchList + (idx - SLOT_INDEX_CARD_MIN)], SaveData[idxCard + (idx - SLOT_INDEX_CARD_MIN)]);
		}



		//----------------------------------------------------------------
		// 衣装系の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_costume.length; idx++) {
			n_A_costume[idx] = SaveData[1680 + idx];
		}



		//----------------------------------------------------------------
		// 衣装（頭下段）の読み込み
		//----------------------------------------------------------------
		objidPrifix = "OBJID_HEAD_UNDER_COSTUME";
		eqpRgn = EQUIP_REGION_ID_HEAD_UNDER;
		idxEquip = 1680 + COSTUME_REGION_ID_HEAD_UNDER;
		idxCard = -1;

		// 選択欄への反映
		HtmlSetObjectValueById(objidPrifix, SaveData[idxEquip]);
		SetStatefullData("DATA_" + objidPrifix, SaveData[idxEquip]);

		// スロット欄の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			RebuildCostumeSelect(eqpRgn, SaveData[idxEquip]);
			SetCostumeSlotEnability(eqpRgn);
		}
		else {
			RebuildRndOptSelect(eqpRgn, SaveData[idxEquip]);
			// RebuildRndEnchSelect(eqpRgn, SaveData[idxEquip]);
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}


		//----------------------------------------------------------------
		// パッシブスキルの読み込み
		//----------------------------------------------------------------
		var passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();
		for (var idx = 0; idx < passiveSkillIdArray.length; idx++) {
			n_A_PassSkill[idx] = SaveData[75 + idx];

			if (n_Skill1SW) {
				var wOBJ = document.getElementById("A_skill" + idx);

				// 最大レベルで制限すると、直接選択肢を生成してるケースなどで異常が起きるため、補正なしにロールバック
				wOBJ.value = SaveData[75 + idx];
			}
		}


		//----------------------------------------------------------------
		// 基本支援の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataIchizi.length; idx++) {
			g_confDataIchizi[idx] = SaveData[175 + idx];
		}


		//----------------------------------------------------------------
		// 未使用（旧養子情報）
		//----------------------------------------------------------------
//		A_youshi.checked = SaveData[275];


		//----------------------------------------------------------------
		// 攻撃手段の読み込み
		//----------------------------------------------------------------
		// 他のデータを読み込んだ後で読み込む


		//----------------------------------------------------------------
		// モンスター状態異常の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_IJYOU.length; idx++) {
			n_B_IJYOU[idx] = SaveData[286 + idx];
		}


		//----------------------------------------------------------------
		// モンスター状態強化の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_KYOUKA.length; idx++) {
			n_B_KYOUKA[idx] = SaveData[367 + idx];
		}


		//----------------------------------------------------------------
		// 支援スキル３の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill3.length; idx++) {
			n_A_PassSkill3[idx] = SaveData[448 + idx];
		}


		//----------------------------------------------------------------
		// 支援スキル４の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill4.length; idx++) {
			n_A_PassSkill4[idx] = SaveData[509 + idx];
		}


		//----------------------------------------------------------------
		// 支援スキル５の読み込み
		//----------------------------------------------------------------
		// 仕様変更（オートスペル設定）


		//----------------------------------------------------------------
		// 衣装の読み込み
		//----------------------------------------------------------------
//		A_isyou3.value = SaveData[608];


		//----------------------------------------------------------------
		// 二次職支援の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataNizi.length; idx++) {
			g_confDataNizi[idx] = SaveData[609 + idx];
		}


		//----------------------------------------------------------------
		// 支援スキル７の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill7.length; idx++) {
			n_A_PassSkill7[idx] = SaveData[659 + idx];
		}


		//----------------------------------------------------------------
		// 支援スキル８の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_PassSkill8.length; idx++) {
			n_A_PassSkill8[idx] = SaveData[730 + idx];
		}


		//----------------------------------------------------------------
		// キャラクター状態異常の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_A_IJYOU.length; idx++) {
			n_A_IJYOU[idx] = SaveData[800 + idx];
		}


		//----------------------------------------------------------------
		// 対プレイヤー設定の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < n_B_TAISEI.length; idx++) {

			valueWork = SaveData[850 + idx];

			if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
				valueWork = CSaveDataConverter.ConvertUnsignedToSigned(valueWork, saveDataMappingArrayCurrent[850 + idx]);
			}

			n_B_TAISEI[idx] = valueWork;
		}


		//----------------------------------------------------------------
		// 支援スキル９（性能カスタマイズ１）の読み込み
		//----------------------------------------------------------------
		// 仕様変更（現在未使用）

		//----------------------------------------------------------------
		// 支援スキル１０（性能カスタマイズ２）の読み込み
		//----------------------------------------------------------------
		// 仕様変更（現在未使用）


		//----------------------------------------------------------------
		// モンスター手入力欄の読み込み
		//----------------------------------------------------------------

		// 自動読み込みをアクティブに
		SetActiveIndexMobConfInput(0);

		// データ読み込み
		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LV, SaveData[971 + 2]);

		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP, SaveData[971 + 3] + 100000 * SaveData[971 + 22]);

		// STR ～ LUK
		for (idx = 4; idx <= 9; idx++) {
			// 拡張データの場合
			if (SaveData[971 + idx] > 2000) {
				SetMobConfInput(idx, SaveData[1460 + (idx - 4) * 2] + 100000 * SaveData[1460 + (idx - 4) * 2 + 1]);
			}
			else {
				SetMobConfInput(idx, SaveData[971 + idx]);
			}
		}

		// ATK, MATK
		for (idx = 10; idx <= 11; idx++) {
			// 拡張データの場合
			if (SaveData[971 + idx] > 99999) {
				SetMobConfInput(idx, SaveData[1460 + (idx - 4) * 2] + 100000 * SaveData[1460 + (idx - 4) * 2 + 1]);
			}
			else {
				SetMobConfInput(idx, SaveData[971 + idx]);
			}
		}

		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RANGE, SaveData[971 + 12]);

		// DEF, MDEF
		for (idx = 13; idx <= 14; idx++) {
			// 拡張データの場合
			if (SaveData[971 + idx] > 99999) {
				SetMobConfInput(idx, SaveData[1460 + (idx - 5) * 2] + 100000 * SaveData[1460 + (idx - 5) * 2 + 1]);
			}
			else {
				SetMobConfInput(idx, SaveData[971 + idx]);
			}
		}

		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BASE_EXP, SaveData[971 + 15] + 100000 * SaveData[971 + 23]);
		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_JOB_EXP, SaveData[971 + 16] + 100000 * SaveData[971 + 24]);

		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_SIZE, SaveData[971 + 17]);
		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_ELEMENT, SaveData[971 + 18]);
		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RACE, SaveData[971 + 19]);
		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE, SaveData[971 + 20]);
		SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE, SaveData[971 + 21]);

		//----------------------------------------------------------------
		// オートスペル設定欄の読み込み
		//----------------------------------------------------------------
		// 仕様変更（現在未使用）

		//----------------------------------------------------------------
		// 習得スキルの読み込み
		//----------------------------------------------------------------
		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();
		for (idx = 0; idx < n_A_LearnedSkill.length; idx++) {

			var maxLv = 0;

			if (idx < learnSkillIdArray.length) {
				maxLv = g_skillManager.GetMaxLv(learnSkillIdArray[idx]);
			}

			n_A_LearnedSkill[idx] = Math.min(maxLv, parseInt("" + SaveData[1060 + idx], 10));
		}

		//----------------------------------------------------------------
		// ランダムオプションの読み込み
		//----------------------------------------------------------------
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ASSASIN
			&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 61
			&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 0) {

			loopInfoArray = [
				EQUIP_REGION_ID_ARMS,
				EQUIP_REGION_ID_ARMS_LEFT,
				EQUIP_REGION_ID_HEAD_TOP,
				EQUIP_REGION_ID_HEAD_MID,
				EQUIP_REGION_ID_HEAD_UNDER,
				EQUIP_REGION_ID_BODY,
				EQUIP_REGION_ID_SHOULDER,
				EQUIP_REGION_ID_SHOES,
				EQUIP_REGION_ID_ACCESSARY_1,
				EQUIP_REGION_ID_ACCESSARY_2,
			];
		}
		else if ((IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO))
				&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 61
				&& ItemObjNew[SaveData[22]][ITEM_DATA_INDEX_KIND] != 0) {

			loopInfoArray = [
				EQUIP_REGION_ID_ARMS,
				EQUIP_REGION_ID_ARMS_LEFT,
				EQUIP_REGION_ID_HEAD_TOP,
				EQUIP_REGION_ID_HEAD_MID,
				EQUIP_REGION_ID_HEAD_UNDER,
				EQUIP_REGION_ID_BODY,
				EQUIP_REGION_ID_SHOULDER,
				EQUIP_REGION_ID_SHOES,
				EQUIP_REGION_ID_ACCESSARY_1,
				EQUIP_REGION_ID_ACCESSARY_2,
			];
		}
		else {
			loopInfoArray = [
				EQUIP_REGION_ID_ARMS,
				EQUIP_REGION_ID_SHIELD,
				EQUIP_REGION_ID_HEAD_TOP,
				EQUIP_REGION_ID_HEAD_MID,
				EQUIP_REGION_ID_HEAD_UNDER,
				EQUIP_REGION_ID_BODY,
				EQUIP_REGION_ID_SHOULDER,
				EQUIP_REGION_ID_SHOES,
				EQUIP_REGION_ID_ACCESSARY_1,
				EQUIP_REGION_ID_ACCESSARY_2,
			];
		}

		for (idxLoop = 0; idxLoop < loopInfoArray.length; idxLoop++) {

			idxOffset = 20 * idxLoop;

			for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {
				SetEquipRndOptTable(loopInfoArray[idxLoop], idx, SaveData[1260 + idxOffset + idx * 2], SaveData[1260 + idxOffset + idx * 2 + 1])
			}
		}


		//----------------------------------------------------------------
		// 三次職支援の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataSanzi.length; idx++) {
			g_confDataSanzi[idx] = SaveData[1480 + idx];
		}


		//----------------------------------------------------------------
		// 性能カスタマイズ（ステータス関連）の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomStatus.length; idx++) {
			g_confDataCustomStatus[idx] = CSaveDataConverter.ConvertUnsignedToSigned(SaveData[1580 + idx], saveDataMappingArrayCurrent[1580 + idx]);
		}

		//----------------------------------------------------------------
		// 性能カスタマイズ（攻撃関連）の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomAtk.length; idx++) {
			g_confDataCustomAtk[idx] = CSaveDataConverter.ConvertUnsignedToSigned(SaveData[1610 + idx], saveDataMappingArrayCurrent[1610 + idx]);
		}

		//----------------------------------------------------------------
		// 性能カスタマイズ（防御関連）の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomDef.length; idx++) {
			g_confDataCustomDef[idx] = CSaveDataConverter.ConvertUnsignedToSigned(SaveData[1640 + idx], saveDataMappingArrayCurrent[1640 + idx]);
		}

		//----------------------------------------------------------------
		// 性能カスタマイズ（ステータス関連）の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomSkill.length; idx++) {
			g_confDataCustomSkill[idx] = CSaveDataConverter.ConvertUnsignedToSigned(SaveData[1660 + idx], saveDataMappingArrayCurrent[1660 + idx]);
		}

		//----------------------------------------------------------------
		// 衣装の読み込み
		//----------------------------------------------------------------
		// 装備と一緒に、前の方で実施

		//----------------------------------------------------------------
		// オートスペル設定欄の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
			n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx] = SaveData[1691 + 3 * idx + 0];
			n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx] = SaveData[1691 + 3 * idx + 1];
			n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx] = SaveData[1691 + 3 * idx + 2];
		}

		//----------------------------------------------------------------
		// 時限効果設定の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_timeItemConf.length; idx++) {
			g_timeItemConf[idx] = SaveData[1751 + idx];
		}

		//----------------------------------------------------------------
		// 特性ステータスの読み込み
		//----------------------------------------------------------------
		// TODO: 移行過渡期のためダイレクト（後続の CalcStatusPoint() 内部で読み取るため問題なし）
		HtmlSetObjectValueById("OBJID_SELECT_STATUS_POW", SaveData[1821]);
		HtmlSetObjectValueById("OBJID_SELECT_STATUS_STA", SaveData[1822]);
		HtmlSetObjectValueById("OBJID_SELECT_STATUS_WIS", SaveData[1823]);
		HtmlSetObjectValueById("OBJID_SELECT_STATUS_SPL", SaveData[1824]);
		HtmlSetObjectValueById("OBJID_SELECT_STATUS_CON", SaveData[1825]);
		HtmlSetObjectValueById("OBJID_SELECT_STATUS_CRT", SaveData[1826]);

		//----------------------------------------------------------------
		// 四次職支援の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataYozi.length; idx++) {
			g_confDataYozi[idx] = SaveData[1831 + idx];
		}


		//----------------------------------------------------------------
		// 性能カスタマイズ（特性ステータス関連）の読み込み
		//----------------------------------------------------------------
		for (idx = 0; idx < g_confDataCustomSpecStatus.length; idx++) {
			g_confDataCustomSpecStatus[idx] = CSaveDataConverter.ConvertUnsignedToSigned(SaveData[1861 + idx], saveDataMappingArrayCurrent[1861 + idx]);
		}



		//----------------------------------------------------------------
		// ステータスを再計算
		//----------------------------------------------------------------
		CalcStatusPoint(true);
		StAllCalc();



		//----------------------------------------------------------------
		// 攻撃手段の読み込み
		//----------------------------------------------------------------

		// 攻撃手段エリアコンポーネントの再構築
		CAttackMethodAreaComponentManager.RebuildControls();

		// レベルが上限を超えている場合は、最大レベルに補正（設定ミスのバグ対応）
		var maxLv = g_skillManager.GetMaxLv(parseInt(SaveData[276], 10));
		SaveData[278] = Math.min(maxLv, parseInt(SaveData[278]));

		// レベル指定がなしになっている場合は、1 に補正
		if(SaveData[278] == 0) SaveData[278] = 1;

		// 攻撃手段設定を生成
		attackMethodConf = new CAttackMethodConf();
		attackMethodConf.SetSkillId(SaveData[276]);
		attackMethodConf.SetSourceType(SaveData[277]);
		attackMethodConf.SetSkillLv(SaveData[278]);
		attackMethodConf.SetOptionValueArray(
			[
				SaveData[279],
				SaveData[280],
				SaveData[281],
				SaveData[282],
				SaveData[283],
			]
		);

		//  攻撃手段の設定設定を変更
		CAttackMethodAreaComponentManager.SetAttackMethodConf(attackMethodConf);



		// TODO: これいる？
		StAllCalc();

	}




	OnClickSkillSWLearned();
	Click_A1(0);

	Click_A3(0);
	Click_A4(0);
	OnChangeSettingAutoSpell(false);

	g_objCharaConfIchizi.RefreshSelectAreaHeader();
	g_objCharaConfIchizi.RefreshControlCSS();

	g_objCharaConfNizi.RefreshSelectAreaHeader();
	g_objCharaConfNizi.RefreshControlCSS();

	g_objCharaConfSanzi.RefreshSelectAreaHeader();
	g_objCharaConfSanzi.RefreshControlCSS();

	try {
		g_objCharaConfYozi.RefreshSelectAreaHeader();
		g_objCharaConfYozi.RefreshControlCSS();
	}
	catch (exc) {
	}

	Click_A7(0);
	Click_A8(0);

	CTimeItemAreaComponentManager.CloseArea();

	CBattleQuickControlAreaComponentManager.CloseArea();

	g_objCharaConfCustomStatus.RefreshSelectAreaHeader();
	g_objCharaConfCustomStatus.RefreshControlCSS();

	g_objCharaConfCustomAtk.RefreshSelectAreaHeader();
	g_objCharaConfCustomAtk.RefreshControlCSS();

	g_objCharaConfCustomDef.RefreshSelectAreaHeader();
	g_objCharaConfCustomDef.RefreshControlCSS();

	g_objCharaConfCustomSkill.RefreshSelectAreaHeader();
	g_objCharaConfCustomSkill.RefreshControlCSS();

	g_objCharaConfCustomSpecStatus.RefreshSelectAreaHeader();
	g_objCharaConfCustomSpecStatus.RefreshControlCSS();

	g_objMobConfInput.RefreshControlsByVars();

	RefreshMobConfDebufSelectAreaHeader();
	RefreshMobConfBufSelectAreaHeader();
	RefreshMobConfPlayerSelectAreaHeader();
//	RefreshMobConfInputSelectAreaHeader();

	RefreshMobConfDebufControlCSS();
	RefreshMobConfBufControlCSS();
	RefreshMobConfPlayerControlCSS();
//	RefreshMobConfInputControlCSS();

	CItemInfoManager.ResetState();

	// 拡張表示の選択値記憶のリセット
	// 再計算が多重に呼ばれまくるので、この位置でリセットしないとリセットしきれない
	CExtraInfoAreaComponentManager.ClearStoredValueAll(true);



	//----------------------------------------------------------------
	// 表示モード切替
	//----------------------------------------------------------------
	if (bDispRndOptMode) {
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			OnClickSlotModeButton();
		}
	}

}





function LoadCookie3(){

	if (!document.calcForm.A_SaveSlot) {
		return;
	}

	var idx = 0;
	var searchKey = "";
	var searchIndex = 0;

	var saveDataStrExtracted = "";


	// クッキーからセーブデータを読み込む
	var SaveData = new Array();
	SaveData = document.cookie.split(";");



	// 余白をトリム
	for (idx = 0; idx < SaveData.length; idx++) {
		SaveData[idx] = SaveData[idx].replace(/^\s+/g, "");
		SaveData[idx] = SaveData[idx].replace(/\s+$/g, "");
	}


	// セーブデータ本体（!=設定データ）を検索する
	var wStr = "";
	var ch = 0;

	// 初期化
	SaveDataAll = new Array();
	for (idx = 0; idx <= 500; idx++) {
		SaveDataAll[idx] = "ZZZZ";
	}

	for (idx = 0; idx < SaveData.length; idx++) {

		// セーブ識別子を走査
		searchKey = "ROratorioSave=";
		searchIndex = SaveData[idx].indexOf(searchKey);

		if (searchIndex == -1) {
			continue;
		}

		// ここに来れば見つかった
		wStr = SaveData[idx].substr(searchIndex + searchKey.length, SaveData[idx].length);

		// 読み込みデータを分割して、セーブデータに変換
		SaveDataAll = wStr.split("?");

		ch = 1;
		break;
	}

	// セーブスロットの数がデフォルトより多い場合、全体セーブデータを、読み込みデータに設定する
	if(n_CONFIG[2] > 19){

		// ＵＲＬ読み込みなど、クッキーの整合性が取れないケースがあるため、チェックの上で設定
		if (localStorage.ROratorioDOM_SaveData) {
			wStr = localStorage.ROratorioDOM_SaveData;


			// 読み込みデータを分割して、セーブデータに変換
			SaveDataAll = wStr.split("?");
		}

		ch = 2;
	}




// セーブデータが消える問題の調査用
// ----
// 仮定
// 　・Local Storage ではなく、Cookie の方がおかしくなる
// 　　←投稿いただいた内容から、恐らくセーブ個数が19個以下の場合に発生している
// 　・Cookie が全てなくなっているわけではない
// 　　←投稿いただいた内容から、削除ページでは、セーブの内容が確認できるらしい
// 　　　→すなわち、何がしかのデータは残っているが、読み込みでエラーになっている
// 　　　　→すなわち、ch == 0 が発生している？
// ----
// 疑問
// 　・セーブデータが消える、という現象面から見ると、
// 　　この下の方にあるコードの「☆ここ☆」の箇所で、セーブデータが存在しない判定になっていると思われる
// 　　とすると、wJob == "ZZ" という式が成立しているはずである。
// 　　ところで、wJob は問題の箇所のやや上のコードで SaveDataAll[i].substr(2,2) によって取得されている。
// 　　このことを考えると、SaveDataAll[*] にはデータがあり、それが "ZZZZ" になっていることが必要となる。
// 　　この点に注目し、SaveDataAll の変更箇所を確認すると、いずれもこのやや下のコードで、
// 　　SaveDataAll = wStr.split("?");　と　SaveDataAll[i] = "ZZZZ";　がある。
// 　　ここで、後者は SaveData[20] 以降に対する処理（拡張セーブ領域）なので、ここでは除外して考える。
// 　　前者について考えると、wStr を split しているのだから、wStr が "ZZZZ?ZZZZ?ZZZZ?ZZZZ" のようになっていることになる。
// 　　では、wStr はどこで取得されるかと考えると、ここより上の部分で、
// 　　SaveData[i].substr(14, SaveData[i].length);　か　localStorage.ROratorioDOM_SaveData;　によって取得される。
// 　　あるいは、ch == 0 の場合は、head.js で定義されている ZZZZ が採用される（ハズ）。
// 　　ということは、やはり ch == 0 の場合にトラップを仕掛ければ良さそうである。
// 　　
// 　　……とここまで考えて、cookie の容量オーバーの可能性が脳裏をよぎった。
// 　　問題報告のあった Chrome では、１クッキーあたりの容量は 4095 バイト。
// 　　クッキーに保存するセーブデータは、最大19個。
// 　　4095 / 19 ~= 215.5。軽く超えるのでは？
// 　　軽く試したところ、セーブ不能に陥る模様。ただし、セーブした分が消えることはなかった。
// 調査経過
// 　・split した後、前後の余白をトリムしていなかった。
// 　　→何らかの要因により、余白が付与されている状況では、正常にパースできなかった。
// 　　　←そもそも、パースのチェックが、substr(0, 14) == "ROratorioSave=" という残念コードだった。
// 　　　←報告いただいたエラー例では、いずれも空白が入っていた。
// 　　　　←さらに、ConfData が先に記録されていた。Chrome では順序が逆転する場合があるのか？
// 　　　　　あるいは、何らかの要因で削除されたクッキーがあり、それがゴミとして紛れ込んだ？
// 　・del.htmlの方では、なんと"; " とスペース有りで split していた。
// 　　→そのため、読み込みできなくても、削除用htmlには表示されるという現象が起きていた模様。
// 　　　→仮対応で問題なければ、本対応として水平展開すること。
// 　　　　→ConfData の読み込みも同じかもしれない。
// 対応
// 　・split した後、前後の余白をトリムする。
// 　・パースチェックを、もっと柔軟にする（上の方のコード参照）
//
if ((ch == 0 && SaveData.length > 1)
	|| (ch == 0 && SaveData.length == 1 && SaveData[0].length > 0 && SaveData[0].substr(0, 9) != "ConfData=")) {
	var msg = "";

	msg += "セーブデータの破損を検出しました。\n";
	msg += "以下のデータを、投稿フォームからご連絡ください。\n";
	msg += "（投稿可能な部分だけで大丈夫です）\n";
	msg += "【 LEN == " + document.cookie.length + "】";
	msg += "【" + document.cookie + "】";

	alert(msg);
}



	// セーブスロットの表示を調整する
	for (var i = 1; i <= n_CONFIG[2]; i++) {

		// セーブデータの検査
		var wJob = "ZZZZ";
		if (i < SaveDataAll.length) {
			if (SaveDataAll[i].length >= 4) {
				wJob = SaveDataAll[i].substr(2,2);
			}
		}
		else {
			wJob = "ZZ";
		}

// ――――　☆ここ☆　――――
		// セーブデータが存在しない場合
		if(wJob == "ZZ") {
			document.calcForm.A_SaveSlot.options[i-1] = new Option("Save"+ i +"：no SaveData",i);
		}

		// セーブデータが存在する場合
		else{

			// スロット２０番以降で、名前が設定されている場合
			if(n_CONFIG[2] > 19 && SaveNameAll[i] != "ZZZZ") {
				// 名前を表示
				document.calcForm.A_SaveSlot.options[i-1] = new Option("Save"+ i +"："+ SaveNameAll[i],i);
			}

			// 上記以外の場合、
			else{
				// 職業とレベルを表示
				var wLV = 0;

				if (SaveDataAll[i].length >= 6) {
					wLV = SaveDataAll[i].substr(4,2);
				}

				document.calcForm.A_SaveSlot.options[i-1] = new Option("Save"+ i +"："+ GetJobName(CSaveDataConverter.ConvertStoN(wJob)) +" (Lv"+ CSaveDataConverter.ConvertStoN(wLV) +")",i);
			}
		}
	}
}





/**
 * 計算機の設定を保存する.
 */
function SaveCookieConf(){

	var expireDateString = "";



	var kirikae = 0;
	SaveData = new Array();

	var wSaveNum = eval(document.calcForm.A_SaveSlot.value);

	var wStr = "a";

	// アクティブスキルの限界攻撃間隔を取得し、クッキー文字列に変換
	wStr += NtoS2(eval(document.calcForm.Conf01.value), 2);

	if(n_CONFIG_SW){

		// セーブデータの保存数を取得
		// 基本＝１～１９番、拡張＝２０～５００番、全体＝１～５００番
		var wMAX = eval(document.calcForm.Conf02.value);

		// 保持しているセーブデータの保存数１９番までで、新たに入力された保存数が１９より大きい場合
		// すなわち、拡張セーブデータが有効にされた場合
		if(n_CONFIG[2] == 19 && wMAX > 19){

			// 全体セーブデータが存在する場合
			if(localStorage.ROratorioDOM_SaveData){

				// 全体セーブデータの読み込み
				var wSave = new Array();
				var wYYY = localStorage.ROratorioDOM_SaveData;
				wSave = wYYY.split("?");

				// 拡張セーブデータに、読み込んだデータを設定
				for(var i = 20; i <= 500; i++) {
					SaveDataAll[i] = wSave[i];
				}

				// 基本セーブデータの存在検査
				var ch = 0;
				for(var i = 1; i <= 19; i++){
					if(SaveDataAll[i] != "ZZZZ") ch = 1;
				}

				// 基本セーブデータが１件も無い場合
				if(ch == 0){

					// 基本セーブデータに、読み込んだデータを設定
					for(var i = 1; i <= 19; i++) {
						SaveDataAll[i] = wSave[i];
					}

					// 基本セーブデータ文字列をを生成
					var wStrX = "" + SaveDataAll[0];
					for(var i = 1; i <= 19; i++) {
						wStrX += "?" + SaveDataAll[i];
					}

					// 有効期限を設定して、クッキーに基本セーブデータを保存
					expireDateString = GetExpireDateString();
					document.cookie = "ROratorioSave" +"="+ wStrX +";expires="+ expireDateString;
				}
			}

			// 全体セーブデータが存在しない場合
			else{
				// 拡張セーブデータに、データなしを設定
				for(var i = 20; i <= 500; i++) {
					SaveDataAll[i] = "ZZZZ";
				}
			}

			// 全体セーブデータ文字列を生成し、保存
			var wXXX = "" + SaveDataAll[0];
			for(var i = 1; i <= 500; i++) {
				wXXX += "?" + SaveDataAll[i];
			}
			localStorage.ROratorioDOM_SaveData = wXXX;

			// 名前の保存
			if(localStorage.ROratorioDOM_SaveName){
				var wStrX = localStorage.ROratorioDOM_SaveName;
				SaveNameAll = wStrX.split("|");
			}

			myInnerHtml("DELHTML",'　　<input type="text" name="SAVE_NAME" value="名前入力可能" size=30>　　<Font size=2><A Href="del2.html">セーブ削除</A></Font>',0);
			kirikae=1;
		}

		// 保持しているセーブデータの保存数が、新たに入力された保存数より大きい場合
		else if(n_CONFIG[2] < wMAX){
			kirikae=1;
		}

		// 保持しているセーブデータの保存数より、新たに入力された保存数が小さい場合
		else if(n_CONFIG[2] > wMAX){

			// セーブスロットの選択肢を減らす
			for(var i = n_CONFIG[2]; i != wMAX; i--) {
				document.calcForm.A_SaveSlot.options[i-1] = null;
			}

			kirikae=1;

			// １９番までしか使用できない場合は、名前入力を可能としない
			if(wMAX == 19) {
				myInnerHtml("DELHTML",'　　<Font size=2><A Href="del.html">セーブ削除</A></Font>',0);
			}
		}

		// セーブデータの保存数を保持しておく
		n_CONFIG[2] = eval(document.calcForm.Conf02.value);
	}

	// セーブデータの保存数を、クッキー文字列に変換＆追記
	wStr += NtoS2(n_CONFIG[2],2);

	// クッキーデータの保存
	expireDateString = GetExpireDateString();
	document.cookie = "ConfData" +"="+ wStr +";expires="+ expireDateString;

	// TODO : 謎処理
	if(kirikae==1){
		LoadCookie3();
		if(wSaveNum > 19) document.calcForm.A_SaveSlot.value = 1;
		else document.calcForm.A_SaveSlot.value = wSaveNum;
	}
}





/**
 * 計算機の設定を読み込む.
 */
function LoadCookieConf(){

	SaveData = new Array();
	SaveData = document.cookie.split(";");
	wStr = "";
	wLCF = 0;

	var confstr = "";

	for(i = 0; SaveData[i]; i++){

		// クッキー情報の文字列から前方の余白を抜く
		confstr = SaveData[i];
		confstr = confstr.replace(/^\s+/g, "");

		// ConfData を探す
		var seekstr = "ConfData=";
		var seekindex = confstr.search(seekstr);
		if (seekindex >= 0) {
			wStr = confstr.substr(seekindex + seekstr.length, confstr.length);
			wLCF = 1;
			break;
		}
	}

	// ConfData があった場合のみ処理
	if(wLCF == 1){
		wStr += "aaaaaaaaaaaaaaaaaaaa";

		// 秒間攻撃回数の設定を読み込み適用する
		if(wStr.substr(3,2) == "00"){
			document.calcForm.Conf01.value = StoN2(wStr.substr(1,2));
			SaveCookieConf();
			return;
		}

		if(wStr.substr(0,1) == "0"){
			document.calcForm.Conf01.value = wStr.substr(1,2);
			SaveCookieConf();
		}
		else {
			document.calcForm.Conf01.value = StoN2(wStr.substr(1,2));
		}

		// セーブデータの保存数を適用する
		n_CONFIG[2] = StoN2(wStr.substr(3,2));

		if(n_CONFIG[2] == 0) n_CONFIG[2] = 19;

		if(n_CONFIG[2] > 19){

			// セーブデータの選択肢の数を増やす
			for(var i = 20; i <= n_CONFIG[2]; i++) {
				document.calcForm.A_SaveSlot.options[i - 1] = new Option("Save" + i,i);
			}

			// 名前の読み込み
			if(localStorage.ROratorioDOM_SaveName){
				var wStrX = localStorage.ROratorioDOM_SaveName;
				SaveNameAll = wStrX.split("|");
			}
			myInnerHtml("DELHTML",'　　<input type="text" name="SAVE_NAME" value="名前入力可能" size=30>　　<Font size=2><A Href="del2.html">セーブ削除</A></Font>',0);
		}
	}
	else{
		// ConfData が無かった場合、秒間攻撃回数にデフォルト値を設定
		document.calcForm.Conf01.value = 33;
	}
}





function SaveDataChange(wstr){
	var mozi = new Array();
	for(var i=0;i<wstr.length;i++) mozi[i] = wstr.charAt(i);
	for(i=0;i<wstr.length;i++){
		if("0" <= mozi[i] && mozi[i] <= "9"){
			if("0" <= mozi[i+1] && mozi[i+1] <= "9"){
				if("0" <= mozi[i+2] && mozi[i+2] <= "9"){
					if("0" <= mozi[i+3] && mozi[i+3] <= "9"){
						var w = eval(mozi[i]) * 1000 + eval(mozi[i+1]) * 100 + eval(mozi[i+2]) * 10 + eval(mozi[i+3]);
						mozi[i] = aaa(w);
						mozi[i+1] = "";
						mozi[i+2] = "";
						mozi[i+3] = "";
					}else{
						var w = eval(mozi[i]) * 100 + eval(mozi[i+1]) * 10 + eval(mozi[i+2]);
						mozi[i] = aaa(w);
						mozi[i+1] = "";
						mozi[i+2] = "";
					}
				}else{
					var w = eval(mozi[i]) * 10 + eval(mozi[i+1]);
					mozi[i] = aaa(w);
					mozi[i+1] = "";
				}
			}else mozi[i] = aaa(eval(mozi[i]));
		}
	}
	var wx = "";
	for(i=0;i<wstr.length;i++) wx += mozi[i];
	return wx;
}





function aaa(wnum){
	var wa = "";
	for(var i=0;i<wnum;i++) wa += "a";
	return wa;
}




n_NtoS2 =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];



function NumA(wstr){
	for(var i=2;i<wstr.length;i++){
		if(wstr[i] == "aaa") wstr[i] = 3;
		if(wstr[i] == "aa") wstr[i] = 2;
		if(wstr[i] == "a") wstr[i] = 1;
	}
	for(var i=2;i<wstr.length;i++){
		if(0 <= wstr[i] && wstr[i] <= 9999){
			if(0 <= wstr[i+1] && wstr[i+1] <= 9999){
				wstr[i+1] += wstr[i];
				wstr[i] = "";
			}
		}
	}
	var strx = "";
	for(var i=0;i<wstr.length;i++){
		strx += wstr[i];
	}
	return strx;
}



function NtoS2(n,keta){
	var strX = "";
	if(keta == 3){
		strX += n_NtoS2[Math.floor(n / 3844)];
		strX += n_NtoS2[Math.floor(n % 3844 / 62)];
		strX += n_NtoS2[n % 62];
	}else if(keta == 2){
		strX += n_NtoS2[Math.floor(n / 62)];
		strX += n_NtoS2[n % 62];
	}else{
		strX += n_NtoS2[n];
	}
	return strX;
}



function StoNx(n){
	n += "";
	for(var i=0;i<=61;i++) if(n == n_NtoS2[i]) return i;
}



function StoN2(n){
	n += "";
	var keta = n.length;
	if(keta == 3){
		var w = n.charAt(0);
		var x = StoNx(w) * 62 * 62;
		w = n.charAt(1);
		x += StoNx(w) * 62;
		w = n.charAt(2);
		x += StoNx(w);
	}else if(keta == 2){
		var w = n.charAt(0);
		var x = StoNx(w) * 62;
		w = n.charAt(1);
		x += StoNx(w);
	}else{
		var w = n.charAt(0);
		var x = StoNx(w);
	}
	return x;
}





function OnClickUrlIn() {

// 今後の仕様変更用に、検証処理自体は残しておく
/*
if (_MAGIC_CALC_INSPECTION) {
	MagicDamageCalcPatternSurbey();
	return;
}
*/



	var strUrl = "";
	strUrl = HtmlGetObjectValueById("OBJID_URL_IN", "");

	URLIN(strUrl);

}





// 魔法特化計算順序検証用

// 特定できたので、コメントアウト中
/*
g_expectedDmgResult = undefined;
g_matchPatternArray = null;
g_matchResultArray = null;
g_missMatchPatternArray = null;
g_missMatchResultArray = null;
g_missMatchPatternNotExpectedArray = null;
g_missMatchResultNotExpectedArray = null;
g_matchPatternArrayAll = null;
g_matchResultArrayAll = null;
g_missMatchPatternArrayAll = null;
g_missMatchResultArrayAll = null;
g_missMatchPatternNotExpectedArrayAll = null;
g_missMatchResultNotExpectedArrayAll = null;
g_notCandidatePatternArrayAll = null;
g_candidateResultArrayAll = null;

function MagicDamageCalcPatternSurbey() {

	var idx = 0;
	var idxResult = 0;
	var idxAll = 0;

	var indexOfPattern = 0;
	var indexOfResult = 0;



	g_matchPatternArrayAll = [];
	g_matchResultArrayAll = [];
	g_missMatchPatternArrayAll = [];
	g_missMatchResultArrayAll = [];
	g_missMatchPatternNotExpectedArrayAll = [];
	g_missMatchResultNotExpectedArrayAll = [];
	g_notCandidatePatternArrayAll = [];
	g_candidateResultArrayAll = [];



	// ミスマッチテスト
	for (idx = 0; idx < g_urlListMissMatch.length; idx++) {

		WriteConsoleLog("ミスマッチパターン " + (idx + 1) + " / " + g_urlListMissMatch.length + "　開始");

		if (Array.isArray(g_urlListMissMatch[idx])) {

			// 期待される値の設定
			g_expectedDmgResult = g_urlListMissMatch[idx][0];

			// URL入力
			URLIN(g_urlListMissMatch[idx][1]);
		}
		else {

			// 期待される値の設定
			g_expectedDmgResult = undefined;

			// URL入力
			URLIN(g_urlListMissMatch[idx]);
		}

		// 初回処理の場合、期待通りにミスマッチだったものを登録
		if (idx == 0) {
			for (idxResult = 0; idxResult < g_missMatchResultArray.length; idxResult++) {
				g_missMatchPatternArrayAll.push(g_missMatchResultArray[idxResult][0]);
				g_missMatchResultArrayAll.push([g_missMatchResultArray[idxResult][0], [g_missMatchResultArray[idxResult][1]]]);
			}
		}

		// ２件目以降は、初回処理で期待通りにミスマッチだったものをベースに、
		// 今回の処理で、期待されたミスマッチが起きなかったものを除外していく
		else {

			// 前回までの処理すべてで、期待通りにミスマッチしている配列を走査
			for (idxResult = 0; idxResult < g_missMatchPatternArrayAll.length; idxResult++) {

				// その配列の要素が、今回の処理でも、期待通りにミスマッチしているかを判定
				indexOfPattern = g_missMatchPatternArray.indexOf(g_missMatchPatternArrayAll[idxResult]);

				// 期待通りにミスマッチしていなかった場合は、配列の当該要素を除去する
				if (indexOfPattern < 0) {
					g_missMatchPatternArrayAll.splice(idxResult, 1);
					g_missMatchResultArrayAll.splice(idxResult, 1);
					idxResult--;
				}

				// 期待通りにミスマッチしていた場合は、データを追記しておく
				else {
					g_missMatchResultArrayAll[idxResult][1].push(g_missMatchResultArray[indexOfPattern][1]);
				}
			}
		}
	}



	// マッチテスト
	for (idx = 0; idx < g_urlListMatch.length; idx++) {

		WriteConsoleLog("マッチパターン " + (idx + 1) + " / " + g_urlListMatch.length + "　開始");

		if (Array.isArray(g_urlListMatch[idx])) {

			// 期待される値の設定
			g_expectedDmgResult = g_urlListMatch[idx][0];

			// URL入力
			URLIN(g_urlListMatch[idx][1]);
		}
		else {

			// 期待される値の設定
			g_expectedDmgResult = undefined;

			// URL入力
			URLIN(g_urlListMatch[idx]);
		}

		// 初回処理の場合、期待通りにマッチだったものを登録
		if (idx == 0) {
			for (idxResult = 0; idxResult < g_matchResultArray.length; idxResult++) {

				// 期待通りにミスマッチしている配列に含まれない場合は、登録しない
				if (g_missMatchPatternArrayAll.indexOf(g_matchResultArray[idxResult][0]) < 0) {
					continue;
				}

				g_matchPatternArrayAll.push(g_matchResultArray[idxResult][0]);
				g_matchResultArrayAll.push([g_matchResultArray[idxResult][0], [g_matchResultArray[idxResult][1]]]);
			}
		}

		// ２件目以降は、初回処理で期待通りにマッチだったものをベースに、
		// 今回の処理で、期待されたマッチが起きなかったものを除外していく
		else {

			// 前回までの処理すべてで、期待通りにマッチしている配列を走査
			for (idxResult = 0; idxResult < g_matchPatternArrayAll.length; idxResult++) {

				// その配列の要素が、今回の処理でも、期待通りにマッチしているかを判定
				indexOfPattern = g_matchPatternArray.indexOf(g_matchPatternArrayAll[idxResult]);

				// 期待通りにマッチしていなかった場合は、配列の当該要素を除去する
				if (indexOfPattern < 0) {
					g_matchPatternArrayAll.splice(idxResult, 1);
					g_matchResultArrayAll.splice(idxResult, 1);
					idxResult--;
				}

				// 期待通りにマッチしていた場合は、データを追記しておく
				else {
					g_matchResultArrayAll[idxResult][1].push(g_matchResultArray[indexOfPattern][1]);
				}
			}
		}
	}



	// 結果を合成
	g_candidateResultArrayAll = g_missMatchResultArrayAll.concat(g_matchResultArrayAll);



	// 結果表示
	if (g_candidateResultArrayAll.length != 0) {

		WriteConsoleLog("----魔法ダメージ　適正化候補（" + DivideDigits3("" + g_candidateResultArrayAll.length) + " パターン）----");

		for (idx = 0; idx < g_candidateResultArrayAll.length; idx++) {
			WriteConsoleLog("　パターン：" + g_candidateResultArrayAll[idx][0] + "　　値：" + DivideDigits3("" + g_candidateResultArrayAll[idx][1].join("/")));
		}
	}

}
*/



