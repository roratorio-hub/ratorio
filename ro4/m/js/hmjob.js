g_pureStatus = [];
g_bonusStatus = [];

function RebuildStatusSelect(jobId) {
	// 職業IDが引数で渡されなかった時用のコード
	if (typeof jobId === "undefined" || jobId === null) {
		jobId = document.getElementById("OBJID_SELECT_JOB").value;
	}
	let jobData = JobMap.getById(jobId);

	// 基本ステータス
	let inputStr = document.getElementById("OBJID_SELECT_STATUS_STR");
	let inputAgi = document.getElementById("OBJID_SELECT_STATUS_AGI");
	let inputVit = document.getElementById("OBJID_SELECT_STATUS_VIT");
	let inputInt = document.getElementById("OBJID_SELECT_STATUS_INT");
	let inputDex = document.getElementById("OBJID_SELECT_STATUS_DEX");
	let inputLuk = document.getElementById("OBJID_SELECT_STATUS_LUK");

	let statusBaseMax = GetStatusMax(jobData.getMigIdNum(), n_A_PassSkill8[13]);

	inputStr.max = statusBaseMax;
	inputAgi.max = statusBaseMax;
	inputVit.max = statusBaseMax;
	inputInt.max = statusBaseMax;
	inputDex.max = statusBaseMax;
	inputLuk.max = statusBaseMax;

	inputStr.value = 1;
	inputAgi.value = 1;
	inputVit.value = 1;
	inputInt.value = 1;
	inputDex.value = 1;
	inputLuk.value = 1;

	// 特性ステータス
	let inputPow = document.getElementById("OBJID_SELECT_STATUS_POW");
	let inputSta = document.getElementById("OBJID_SELECT_STATUS_STA");
	let inputWis = document.getElementById("OBJID_SELECT_STATUS_WIS");
	let inputSpl = document.getElementById("OBJID_SELECT_STATUS_SPL");
	let inputCon = document.getElementById("OBJID_SELECT_STATUS_CON");
	let inputCrt = document.getElementById("OBJID_SELECT_STATUS_CRT");

	statusBaseMax = 110;

	inputPow.max = statusBaseMax;
	inputSta.max = statusBaseMax;
	inputWis.max = statusBaseMax;
	inputSpl.max = statusBaseMax;
	inputCon.max = statusBaseMax;
	inputCrt.max = statusBaseMax;

	inputPow.value = 0;
	inputSta.value = 0;
	inputWis.value = 0;
	inputSpl.value = 0;
	inputCon.value = 0;
	inputCrt.value = 0;

	// 四次職出ない場合は、特性ステータス欄は非表示
	if (jobData.getBaseLvMin() < 200) {
		document.getElementById("OBJID_TABLE_SPEC_STATUS").style.display = "none";
	} else {
		document.getElementById("OBJID_TABLE_SPEC_STATUS").style.display = "table";
	}
}

/**
 * ステータスポイントを計算する
 * @param bIgnoreAutoCalc 自動計算回避フラグ
 */
function CalcStatusPoint(bIgnoreAutoCalc) {

	with(document.calcForm) {
		// ベースレベルの自動計算チェックボックスの状態を取得
		if (BLVauto.checked == 0) {
			bIgnoreAutoCalc = true;
		}

		// 職業ＩＤを取得する
		var selectJob = document.getElementById("OBJID_SELECT_JOB");
		var jobId = selectJob.value;

		// ベースレベルを取得する
		var blvSelected = eval(A_BaseLV.value);

		// ステータス値を取得する
		var stValSTR = eval(A_STR.value);
		var stValAGI = eval(A_AGI.value);
		var stValVIT = eval(A_VIT.value);
		var stValINT = eval(A_INT.value);
		var stValDEX = eval(A_DEX.value);
		var stValLUK = eval(A_LUK.value);

		// 特性ステータス値を取得する
		var stValPOW = eval(A_POW.value);
		var stValSTA = eval(A_STA.value);
		var stValWIS = eval(A_WIS.value);
		var stValSPL = eval(A_SPL.value);
		var stValCON = eval(A_CON.value);
		var stValCRT = eval(A_CRT.value);
	}

	const jobData = JobMap.getById(jobId);
	const migJobIdNum = jobData.getMigIdNum();

	// 消費ステータスポイントを計算する
	var stPointUsed = 0;
	stPointUsed += GetStatusTotalCost(stValSTR);
	stPointUsed += GetStatusTotalCost(stValAGI);
	stPointUsed += GetStatusTotalCost(stValVIT);
	stPointUsed += GetStatusTotalCost(stValINT);
	stPointUsed += GetStatusTotalCost(stValDEX);
	stPointUsed += GetStatusTotalCost(stValLUK);

	// 消費特性ステータスポイントを計算する
	var stTSPointUsed = 0;
	stTSPointUsed += stValPOW;
	stTSPointUsed += stValSTA;
	stTSPointUsed += stValWIS;
	stTSPointUsed += stValSPL;
	stTSPointUsed += stValCON;
	stTSPointUsed += stValCRT;

	// 職業の基本情報を設定する
	InitJobInfo();

	// ベースレベル情報の取得
	var blvMin = jobData.getBaseLvMin();
	var blvMax = jobData.getBaseLvMax();

	// 初期ステータスポイントの決定
	var stPointEarned = 48;
	if (IsReincarnatedJob(migJobIdNum) && n_A_PassSkill8[13] == 0) {
		stPointEarned = 100;
	}

	// 初期特性ステータスポイントの決定
	var stTSPointEarned = 7;

	// レベルの自動計算をしない場合
	if (bIgnoreAutoCalc) {
		for (var blv = 1; blv <= blvSelected; blv++) {
			stPointEarned += GetEarningStatusPoint(blv);
		}
	}
	// レベルの自動計算をする場合
	else {
		// 最低レベルまでは強制的に上げる
		for (blv = 1; blv <= blvMin; blv++) {
			stPointEarned += GetEarningStatusPoint(blv);
		}
		// ４次職の場合
		if (IsYojiJob(migJobIdNum)) {
			// 獲得した特性ステータスポイントが消費ステータスポイント未満の間
			// かつ、最大レベル以下の間、レベルを上げる
			for (blv; (stTSPointEarned < stTSPointUsed) && (blv <= blvMax); blv++) {
				stTSPointEarned = GetEarningTSStatusPoint(blv);
			}
		}
		// ４次職ではない場合
		else {
			// 獲得ステータスポイントが、消費ステータスポイント未満の間
			// かつ、最大レベル以下の間、レベルを上げる
			for (blv; (stPointEarned < stPointUsed) && (blv <= blvMax); blv++) {
				stPointEarned += GetEarningStatusPoint(blv);
			}
		}
		// ベースレベルの値を設定する
		document.calcForm.A_BaseLV.value = blv - 1;
	}

	myInnerHtml("A_STPOINT", stPointEarned - stPointUsed, 0);
	myInnerHtml("OBJID_SPAN_STATUS_T_STATUS_POINT", stTSPointEarned - stTSPointUsed, 0);

	// 特性ステータス仮処理
	// とりあえず、グローバル空間を汚す
	g_pureStatus = [];
	g_pureStatus[MIG_PARAM_ID_POW] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_POW", 0);
	g_pureStatus[MIG_PARAM_ID_STA] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STA", 0);
	g_pureStatus[MIG_PARAM_ID_WIS] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_WIS", 0);
	g_pureStatus[MIG_PARAM_ID_SPL] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_SPL", 0);
	g_pureStatus[MIG_PARAM_ID_CON] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CON", 0);
	g_pureStatus[MIG_PARAM_ID_CRT] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CRT", 0);
}

/**
 * 指定のステータス値に上げるために必要なコストを取得する.
 * @param statusValue ステータス値
 * @return 必要コスト
 */
function GetStatusIncrementCost(statusValue) {
	if(statusValue <= 100) return Math.floor((statusValue - 2) /10) + 2;
	if(statusValue <= 105) return 16;
	if(statusValue <= 110) return 20;
	if(statusValue <= 115) return 24;
	if(statusValue <= 120) return 28;
	if(statusValue <= 125) return 32;
	if(statusValue <= 130) return 36;
}

/**
 * 指定のステータス値に上げるために必要なコストの総和を取得する.
 * @param statusValue ステータス値
 * @return 必要コストの相和
 */
function GetStatusTotalCost(statusValue) {

	var statusPoint = 0;

	// ２から指定の値まで、コストを合算（１は初期値なので不要）
	for(var stVal = 2; stVal <= statusValue; stVal++) {
		statusPoint += GetStatusIncrementCost(stVal);
	}

	return statusPoint;
}

/**
 * 指定のレベルで獲得するステータスポイントを取得する.
 * @param baseLevel ベースレベル
 * @return 獲得ステー足すポイント
 */
function GetEarningStatusPoint(baseLevel) {

	if (baseLevel <= 1) {
		return 0;
	}

	if (baseLevel <= 100) {
		return Math.floor( (baseLevel - 1) / 5) + 3;
	}

	if (baseLevel <= 150) {
		return Math.floor( (baseLevel - 101) / 10) + 23;
	}

	if (baseLevel <= 157) {
		return 28;
	}

	if (baseLevel <= 164) {
		return 29;
	}

	if (baseLevel <= 171) {
		return 30;
	}

	if (baseLevel <= 178) {
		return 31;
	}

	if (baseLevel <= 185) {
		return 32;
	}

	if (baseLevel <= 192) {
		return 33;
	}

	if (baseLevel <= 199) {
		return 34;
	}

	if (baseLevel <= 200) {
		return 35;
	}

	return 0;

}

/**
 * ステータス補正を画面出力する.
 */
function DisplayStatusBonusAll(baseLv, valSTR, valAGI, valVIT, valINT, valDEX, valLUK, valPOW, valSTA, valWIS, valSPL, valCON, valCRT) {

	var valWork = 0;
	var objStatus = null;

	// STR
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_STR");
	objStatus.innerHTML = ((valSTR >= 0) ? "+" : "") + valSTR;

	// AGI
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_AGI");
	objStatus.innerHTML = ((valAGI >= 0) ? "+" : "") + valAGI;

	// VIT
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_VIT");
	objStatus.innerHTML = ((valVIT >= 0) ? "+" : "") + valVIT;

	// INT
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_INT");
	objStatus.innerHTML = ((valINT >= 0) ? "+" : "") + valINT;

	// DEX
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_DEX");
	objStatus.innerHTML = ((valDEX >= 0) ? "+" : "") + valDEX;

	// LUK
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_LUK");
	objStatus.innerHTML = ((valLUK >= 0) ? "+" : "") + valLUK;



	// 特性ステータス対応

	// POW
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_POW");
	objStatus.innerHTML = ((valPOW >= 0) ? "+" : "") + valPOW;

	// STA
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_STA");
	objStatus.innerHTML = ((valSTA >= 0) ? "+" : "") + valSTA;

	// WIS
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_WIS");
	objStatus.innerHTML = ((valWIS >= 0) ? "+" : "") + valWIS;

	// SPL
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_SPL");
	objStatus.innerHTML = ((valSPL >= 0) ? "+" : "") + valSPL;

	// CON
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_CON");
	objStatus.innerHTML = ((valCON >= 0) ? "+" : "") + valCON;

	// CRT
	objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_CRT");
	objStatus.innerHTML = ((valCRT >= 0) ? "+" : "") + valCRT;



	// 導出ステータス
	// ＋の場合、符号はつけない

	// T.Status Point
	valWork = GetTStatusPoint(baseLv);
	objStatus = document.getElementById("OBJID_SPAN_STATUS_T_STATUS_POINT");
	objStatus.innerHTML = "" + valWork;
}

/**
 * 導出ステータスを画面出力する.
 */
function DisplayReferStatusAll() {

	var valWork = 0;
	var objStatus = null;

	// 導出ステータス
	// ＋の場合、符号はつけない

	// P.Atk
	valWork = GetPAtk();
	objStatus = document.getElementById("OBJID_SPAN_STATUS_P_ATK");
	objStatus.innerHTML = "" + valWork;

	// S.Matk
	valWork = GetSMatk();
	objStatus = document.getElementById("OBJID_SPAN_STATUS_S_MATK");
	objStatus.innerHTML = "" + valWork;

	// C.Rate
	valWork = GetCRate();
	objStatus = document.getElementById("OBJID_SPAN_STATUS_C_RATE");
	objStatus.innerHTML = "" + valWork;

	// Res
	valWork = GetRes();
	objStatus = document.getElementById("OBJID_SPAN_STATUS_RES");
	objStatus.innerHTML = "" + valWork;

	// Mres
	valWork = GetMres();
	objStatus = document.getElementById("OBJID_SPAN_STATUS_MRES");
	objStatus.innerHTML = "" + valWork;

	// H.Plus
	valWork = GetHPlus();
	objStatus = document.getElementById("OBJID_SPAN_STATUS_H_PLUS");
	objStatus.innerHTML = "" + valWork;
}

/**
 * 純粋な基本ステータスの全合計を取得する.
 * @reutnr 純粋な基本ステータスの全合計
 */
function GetTotalPureBasicStatus() {
	return (SU_STR + SU_AGI + SU_VIT + SU_DEX + SU_INT + SU_LUK);
}

//================================================================================================================================
//
// 特性ステータス系
//
//================================================================================================================================

function StoreSpecStatusBonusAll(valPOW, valSTA, valWIS, valSPL, valCON, valCRT) {

	var value = 0;

	// とりあえず、グローバル空間を汚す
	g_bonusStatus = [];
	g_bonusStatus[MIG_PARAM_ID_POW] = valPOW;
	g_bonusStatus[MIG_PARAM_ID_STA] = valSTA;
	g_bonusStatus[MIG_PARAM_ID_WIS] = valWIS;
	g_bonusStatus[MIG_PARAM_ID_SPL] = valSPL;
	g_bonusStatus[MIG_PARAM_ID_CON] = valCON;
	g_bonusStatus[MIG_PARAM_ID_CRT] = valCRT;

	return [
		g_bonusStatus[MIG_PARAM_ID_POW],
		g_bonusStatus[MIG_PARAM_ID_STA],
		g_bonusStatus[MIG_PARAM_ID_WIS],
		g_bonusStatus[MIG_PARAM_ID_SPL],
		g_bonusStatus[MIG_PARAM_ID_CON],
		g_bonusStatus[MIG_PARAM_ID_CRT],
	];
}

/**
 * 特性ステータスの基本＋ボーナスの合計値を取得する
 * @param {*} paramId MIG_PARAM_ID_{POW|STA|WIS|SPL|CON|CRT}
 * @returns 
 */
function GetTotalSpecStatus(paramId) {

	var value = 0;

	// 基礎値
	switch (paramId) {
	case MIG_PARAM_ID_POW:
	case MIG_PARAM_ID_STA:
	case MIG_PARAM_ID_WIS:
	case MIG_PARAM_ID_SPL:
	case MIG_PARAM_ID_CON:
	case MIG_PARAM_ID_CRT:
		value += g_pureStatus[paramId] + g_bonusStatus[paramId];
	}

	return value;
}

/**
 * 指定のレベルで獲得する特性ステータスポイントを取得する.
 * @param baseLevel ベースレベル
 * @return 獲得ステータスポイント
 */
function GetEarningTSStatusPoint (baseLv) {
	var stPoint = 0;
	if (baseLv < 200) {
		return 0;
	}
	// 全所持ポイントを計算
	stPoint = 3 * (1 + (baseLv - 200));
	stPoint += 4 * (1 + Math.floor((baseLv - 200) / 5));
	return stPoint;
}

function GetTStatusPoint(baseLv) {
	stPoint = GetEarningTSStatusPoint(baseLv);
	// 消費ポイントを計算
	stPoint -= g_pureStatus[MIG_PARAM_ID_POW];
	stPoint -= g_pureStatus[MIG_PARAM_ID_STA];
	stPoint -= g_pureStatus[MIG_PARAM_ID_WIS];
	stPoint -= g_pureStatus[MIG_PARAM_ID_SPL];
	stPoint -= g_pureStatus[MIG_PARAM_ID_CON];
	stPoint -= g_pureStatus[MIG_PARAM_ID_CRT];

	return stPoint;
}

/**
 * 四次特性ステータス適用関数.
 */
function ApplySpecStatusModifications(charaData, n_tok) {
	charaData[CHARA_DATA_INDEX_STATUS_ATK] += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

	charaData[CHARA_DATA_INDEX_HIT] += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
	charaData[CHARA_DATA_INDEX_FLEE] += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
}

// 元の処理の構造上、同時に処理できないもの
function ApplySpecStatusModifyMATK(charaData, n_tok) {
	charaData[CHARA_DATA_INDEX_STATUS_MATK] += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
}

/**
 * 特性ステータスに加えて
 * 公式サイトで「P.Atk + ◯」と表記される装備、スキルの加算値を考慮した
 * 最終P.Atkを取得する
 * @returns 
 */
function GetPAtk() {
	let value = 0;
	let sklLv = 0;
	let bufLv = 0;
	// ステータス値
	value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_POW) / 3);
	value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_CON) / 5);
	// 装備効果
	value += GetEquippedTotalSPEquip(ITEM_SP_P_ATK_PLUS);
	value += GetEquippedTotalSPCardAndElse(ITEM_SP_P_ATK_PLUS);
	value += GetRndOptTotalValue(ITEM_SP_P_ATK_PLUS);
	// 性能カスタマイズ
	value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_P_ATK_PLUS)
	// 「インペリアルガード」スキル「アタックスタンス」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_ATTACK_STANCE)) > 0) {

		// 盾装備時限定
		if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
			value += [0, 1, 3, 5, 10, 15][sklLv];
		}
	}
	// 「アビスチェイサー」スキル「アビススレイヤー」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_ABYSS_SLAYER)) > 0) {
		value += 2 * sklLv;
	}
	// 「インクイジター」スキル「強靭な信念」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_KYOZINNA_SHINNEN)) > 0) {
		value += [0, 1, 3, 5, 10, 15][sklLv];
	}
	// 「トルバドゥール／トルヴェール」スキル「ステージマナー」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_STAGE_MANNER), UsedSkillSearch(SKILL_ID_STAGE_MANNER))) > 0) {
		// 弓・楽器・鞭装備時装備時限定
		switch (n_A_WeaponType) {
		case ITEM_KIND_BOW:
		case ITEM_KIND_MUSICAL:
		case ITEM_KIND_WHIP:
			value += [0, 1, 3, 5, 10, 15][sklLv];
			break;
		}
	}
	// 「天帝」スキル「兵法修練」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_HYOHO_SHUREN), UsedSkillSearch(SKILL_ID_HYOHO_SHUREN))) > 0) {
		value += (1 * Math.min(5, sklLv)) + (2 * Math.min(5, Math.max(0, sklLv - 5)));
	}
	// 四次職支援「コンペテンティア」による効果
	// SKILL_ID_CONPETENTIA
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CONPETENTIA]) > 0) {
		value += 20 + 2 * bufLv;
	}
	// 四次職支援「プロンテラマーチ」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_PRONTERA_MARCH]) > 0) {
		let values = [0, 1, 3, 5, 8, 12];
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_MUSICAL_PARTNER] > 0) {
			// パートナーが居るときは効果量が1.5倍になる
			values = values.map(v => Math.ceil(v * 1.5));
		}
		if (bufLv < values.length) {
			value += values[bufLv];
		}
	}
	// 四次職支援「武士符」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BUSHI_FU]) > 0) {
		value += 2 * bufLv;
	}
	// 「スピリットハンドラー」スキル「スピリットマスタリー」による効果
	if (( sklLv = Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY)) ) > 0) {
		value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
	}
	// 「スピリットハンドラー」スキル「三霊一体」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_SANREI_ITTAI)) > 0) {
		value += 3 * sklLv;
	}
	// 「スピリットハンドラー」スキル「にゃんブレッシング」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_NYAN_BRESSING]) > 0) {
		value += 5 * bufLv;
	}
	// 「ハイパーノービス」スキル「独学 -戦闘学-」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU))) > 0) {
		value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
	}
	// 「ナイトウォッチ」スキル「P.F.I」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_PFI), UsedSkillSearch(SKILL_ID_PFI))) > 0) {
		// 銃装備時のみ
		switch (n_A_WeaponType) {
			case ITEM_KIND_HANDGUN:
			case ITEM_KIND_RIFLE:
			case ITEM_KIND_SHOTGUN:
			case ITEM_KIND_GATLINGGUN:
			case ITEM_KIND_GRENADEGUN:
				value += sklLv;
				break;
			}	
	}
	// 「ナイトウォッチ」スキル「ヒドゥンカード」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_HIDDEN_CARD)) > 0) {
		value += sklLv + 5;
	}
	/** バイオロ固有支援「テンパリング」によるP.Atk + 効果 */
	if ((sklLv = UsedSkillSearch(SKILL_ID_TEMPERING)) > 0) {
		value += 5 + sklLv;
	}
	/** ハイパーノービス固有支援「オーバーカミングクライシス」によるP.Atk + 効果 */
	if ((sklLv = UsedSkillSearch(SKILL_ID_OVERCOMING_CRISIS)) > 0) {
		value += 5 + 5 * sklLv;
	}

	return value;
}

function GetSMatk() {

	var value = 0;
	var sklLv = 0;
	var bufLv = 0;
	var valWork = 0;

	// ステータス値
	value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_SPL) / 3);
	value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_CON) / 5);

	// 装備効果
	value += GetEquippedTotalSPEquip(ITEM_SP_S_MATK_PLUS);
	value += GetEquippedTotalSPCardAndElse(ITEM_SP_S_MATK_PLUS);
	value += GetRndOptTotalValue(ITEM_SP_S_MATK_PLUS);

	// 性能カスタマイズ
	value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_S_MATK_PLUS)

	// 「アークメイジ」スキル「両手杖修練」によるS.Matk加算効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_RYOTETUSE_SHUREN), UsedSkillSearch(SKILL_ID_RYOTETUSE_SHUREN))) > 0) {
		// 両手杖時限定
		if (n_A_WeaponType == ITEM_KIND_STUFF) {
			if (n_tok[ITEM_SP_STUFF2HAND]) {
				value += [0, 1, 3, 5, 8, 11, 14, 17, 21, 25, 30][sklLv];
			}
		}
	}

	// 「インペリアルガード」スキル「アタックスタンス」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_ATTACK_STANCE)) > 0) {

		// 盾装備時限定
		if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
			value += [0, 1, 3, 5, 10, 15][sklLv];
		}
	}

	// 「アビスチェイサー」スキル「アビススレイヤー」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_ABYSS_SLAYER)) > 0) {
		value += 2 * sklLv;
	}

	// 「トルバドゥール／トルヴェール」スキル「ステージマナー」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_STAGE_MANNER), UsedSkillSearch(SKILL_ID_STAGE_MANNER))) > 0) {

		// 弓・楽器・鞭装備時装備時限定
		switch (n_A_WeaponType) {
		case ITEM_KIND_BOW:
		case ITEM_KIND_MUSICAL:
		case ITEM_KIND_WHIP:
			value += [0, 1, 3, 5, 10, 15][sklLv];
			break;
		}
	}

	// 「ソウルアセティック」スキル「護符修練」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_GOFU_SHUREN), UsedSkillSearch(SKILL_ID_GOFU_SHUREN))) > 0) {
		value += sklLv;
	}

	// 「ソウルアセティック」スキル「四方五行陣状態」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI)) >= 4) {
		if (n_A_ActiveSkill === SKILL_ID_SHIHO_GOGYO_ZIN) {
			// 「四方五行陣」のダメージはS.Matkのバフが付与された後に計算されるため、個別処理しています
			value += 2 * n_A_ActiveSkillLV;
		} else {
			value += 2 * (sklLv - 4);
		}
	}

	// 四次職支援「コンペテンティア」による効果
	// SKILL_ID_CONPETENTIA
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CONPETENTIA]) > 0) {
		value += 20 + 2 * bufLv;
	}

	// 四次職支援「スペルエンチャンティング」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_SPELL_ENCHANTING]) > 0) {
		value += 5 * bufLv;
	}

	// 四次職支援「夕焼けのセレナーデ」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_YUYAKENO_SERENADE]) > 0) {
		let values = [0, 1, 3, 5, 8, 12];
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_MUSICAL_PARTNER] > 0) {
			// パートナーが居るときは効果量が1.5倍になる
			values = values.map(v => Math.ceil(v * 1.5));
		}
		if (bufLv < values.length) {
			value += values[bufLv];
		}
	}

	// 四次職支援「法師符」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_HOSHI_FU]) > 0) {
		value += 2 * bufLv;
	}

	// 「スピリットハンドラー」スキル「スピリットマスタリー」による効果
	if (( sklLv = Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY)) ) > 0) {
		value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
	}

	// 「スピリットハンドラー」スキル「三霊一体」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_SANREI_ITTAI)) > 0) {
		value += 3 * sklLv;
	}

	// 「スピリットハンドラー」スキル「にゃんブレッシング」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_NYAN_BRESSING]) > 0) {
		value += 5 * bufLv;
	}

	// 「ハイパーノービス」スキル「独学 -魔導学-」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU), UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU))) > 0) {
		value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
	}
	/** ハイパーノービス固有支援「オーバーカミングクライシス」によるS.Matk + 効果 */
	if ((sklLv = UsedSkillSearch(SKILL_ID_OVERCOMING_CRISIS)) > 0) {
		value += 5 + 5 * sklLv;
	}

	return value;
}

function GetCRate() {

	var value = 0;
	var bufLv = 0;



	// ステータス値
	value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_CRT) / 3);

	// 装備効果
	value += n_tok[ITEM_SP_C_RATE_PLUS];
	value += GetEquippedTotalSPEquip(ITEM_SP_C_RATE_PLUS);
	value += GetEquippedTotalSPCardAndElse(ITEM_SP_C_RATE_PLUS);
	value += GetRndOptTotalValue(ITEM_SP_C_RATE_PLUS);

	// 性能カスタマイズ
	value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_C_RATE_PLUS)

	// 四次職支援「プレセンスアキエース」による効果
	// SKILL_ID_PRESENSE_AKYACE
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_PRESENSE_AKYACE]) > 0) {
		value += 5 * bufLv;
	}



	return value;
}

/**
 * 特性ステータスに加えて
 * 公式サイトで「Res + ◯」と表記される装備、スキルの加算値を考慮した
 * 最終RESを取得する
 * @returns RESの値
 */
function GetRes() {
	let value = 0;
	let sklLv = 0;
	let bufLv = 0;
	// ステータス値
	value += GetTotalSpecStatus(MIG_PARAM_ID_STA);
	value += 5 * Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_STA) / 3);
	// 装備効果
	value += n_tok[ITEM_SP_RES_PLUS];
	value += GetRndOptTotalValue(ITEM_SP_RES_PLUS);
	// 性能カスタマイズ
	value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_RES_PLUS)
	// 「インペリアルガード」スキル「盾修練」による効果
	if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_TATE_SHUREN), UsedSkillSearch(SKILL_ID_TATE_SHUREN))) > 0) {
		// 盾装備時限定
		if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
			value += 10 * sklLv;
		}
	}
	// 「インクイジター」スキル「堅固な信念」による効果
	if ((sklLv = UsedSkillSearch(SKILL_ID_KENKONA_SHINNEN)) > 0) {
		value += [0, 10, 20, 40, 70, 100][sklLv];
	}
	// 四次職支援「防御装置有効化」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA]) > 0) {
		value += [0, 20, 30, 40, 60, 100][bufLv];
	}
	// 四次職支援「ミュージカルインタールード」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_MUSICAL_INTERLUDE]) > 0) {
		let values = [0, 20, 30, 40, 60, 100];
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_MUSICAL_PARTNER] > 0) {
			// パートナーが居るときは効果量が1.5倍になる
			values = values.map(v => Math.ceil(v * 1.5));
		}
		value += values[bufLv];
	}
	/** バイオロ固有支援「ゴールデントーン」によるRes + 効果 */
	if ((bufLv = UsedSkillSearch(SKILL_ID_GOLDENE_TONE)) > 0) {
		value += 50 + 5 * bufLv
	}

	return value;
}

/**
 * 特性ステータスに加えて
 * 公式サイトで「Mres + ◯」と表記される装備、スキルの加算値を考慮した
 * 最終MRESを取得する
 * @returns 
 */
function GetMres() {
	let value = 0;
	let bufLv = 0;
	// ステータス値
	value += GetTotalSpecStatus(MIG_PARAM_ID_WIS);
	value += 5 * Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_WIS) / 3);
	// 装備効果
	value += n_tok[ITEM_SP_MRES_PLUS];
	value += GetRndOptTotalValue(ITEM_SP_MRES_PLUS);
	/** バイオロ固有支援「ゴールデントーン」によるMres + 効果 */
	if ((bufLv = UsedSkillSearch(SKILL_ID_GOLDENE_TONE)) > 0) {
		value += 50 + 5 * bufLv
	}
	// 性能カスタマイズ
	value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_MRES_PLUS)
	return value;
}

function GetHPlus() {

	var value = 0;



	// ステータス値
	value += GetTotalSpecStatus(MIG_PARAM_ID_CRT);

	// 装備効果
	value += n_tok[ITEM_SP_H_PLUS_PLUS];
	value += GetRndOptTotalValue(ITEM_SP_H_PLUS_PLUS);

	// 性能カスタマイズ
	value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_H_PLUS_PLUS)

	return value;
}

/**
 * 公式サイトで「Res - ◯」と表記されるデバフを考慮した
 * 最終的なモンスターのResを取得する
 * @param {*} mobData 
 * @returns 
 */
function GetMobRes(mobData) {
	let value = 0;
	let bufLv = 0;

	// 基礎値
	value = mobData[MONSTER_DATA_INDEX_RES];

	// -------------------------------------
	// 割合減少効果
	// -------------------------------------
	let ratio = 0;
	// アイテム特性による効果（とりあえず全種族だけ対応）
	ratio += n_tok[ITEM_SP_IGNORE_RES_RACE_ALL];
	// 四次職支援「アルグトゥステルム」による効果
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM]) > 0) {
		ratio += 5 * bufLv;
	}
	// シャドウクロス「ポテントベナム」による効果
	if ((bufLv = UsedSkillSearch(SKILL_ID_POTENT_VENOM)) > 0) {
		ratio += 20 + bufLv;
	}
	// RES無視効果の上限は５０％
	ratio = Math.min(50, ratio);
	value -= Math.floor(value * ratio / 100);

	// -------------------------------------
	// 固定減少効果
	// -------------------------------------
	let diff = 0;
	// モンスター状態異常設定「トキシンオブマンドラ」による Res - 効果
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_TOXIN_OF_MANDARA]) > 0) {
		diff += 25 + 5 * bufLv;
	}

	value = Math.max(0, value - diff);
	return value;
}

function GetMobMres(mobData) {

	var value = 0;
	var bufLv = 0;
	var ignore = 0;

	// 基礎値
	value = mobData[MONSTER_DATA_INDEX_MRES];

	// Mres無視効果
	ignore = 0;

	// アイテム特性による効果（とりあえず全種族だけ対応）
	ignore += n_tok[ITEM_SP_IGNORE_MRES_RACE_ALL];

	// 四次職支援「アルグトゥスヴィタ」による効果
	// SKILL_ID_ARUGUTUS_VITA
	if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_ARUGUTUS_VITA]) > 0) {
		ignore += 5 * bufLv;
	}

	// MRES無視効果の上限は５０％
	ignore = Math.min(50, ignore);
	
	// 無視効果適用
	value -= Math.floor(value * ignore / 100);
	value = Math.max(0, value);

	return value;
}

/**
 * 導出特性ステータス P.Atk による物理ダメージ増幅効果の適用.
 */
function ApplyPAtkAmplify(dmg) {

	var patk = 0;
	var amped = 0;


	// 最終 P.Atk を取得する
	patk = GetPAtk();

	// 増幅後のダメージを計算
	amped = (dmg * (100 + patk)) / 100;



	return amped;
}

/**
 * 導出特性ステータス S.Matk による魔法ダメージ増幅効果の適用.
 */
function ApplySMatkAmplify(dmg) {

	var smatk = 0;
	var amped = 0;

	// 最終 S.Matk を取得する
	smatk = GetSMatk();

	// 増幅後のダメージを計算
	amped = (dmg * (100 + smatk)) / 100;

	// 小数点切り捨て
	amped = Math.floor(amped);

	return amped;
}

/**
 * 導出特性ステータス C.Rate によるクリティカルダメージ増幅効果の適用.
 */
function ApplyCRateAmplify(criDmgRate) {

	var crate = 0;
	var amped = 0;


	// 最終 C.Rate を取得する
	crate = GetCRate();



	// 増幅後のクリティカルダメージ増幅量を計算
	amped = criDmgRate + crate;



	return amped;
}

/**
 * 導出特性ステータス Res によるダメージ減衰効果の適用.
 */
function ApplyResResist(mobData, dmg) {

	var res = 0;
	var resistedRatio = 0;
	var resisted = 0;


	// 敵の Res を取得する
	res = GetMobRes(mobData);



	// 実測との誤差から、減少量を計算→小数切り捨て→元ダメージから減算、という順序の模様

	// 減衰率の計算
	resistedRatio = 1 - (2000 + res) / (2000 + (5 * res));

	// 減衰ダメージを計算
	resisted = Math.floor(dmg * resistedRatio);



	return (dmg - resisted);
}

/**
 * 導出特性ステータス Mres によるダメージ減衰効果の適用.
 */
function ApplyMresResist(mobData, dmg) {

	var mres = 0;
	var resistedRatio = 0;
	var resisted = 0;


	// 敵の Mres を取得する
	mres = GetMobMres(mobData);



	// 実測との誤差から、減少量を計算→小数切り捨て→元ダメージから減算、という順序の模様

	// 減衰率の計算
	resistedRatio = 1 - (2000 + mres) / (2000 + (5 * mres));

	// 減衰ダメージを計算
	resisted = Math.floor(dmg * resistedRatio);



	return (dmg - resisted);
}

/**
 * 左手ステータスATKのP.Atkペナルティ
 */
function ApplyPAtkLeftHandPenalty(charaData, specData, mobData, dmg) {

	// TODO: 何かおかしい
	return dmg;


	// TODO: ApplyPhysicalSpecializeMonster() 内部の切り捨て処理のせいか、1 誤差が出ることがある


	// 特性ステータスPOWによるATK増加効果が乗らない
	var powAtk = Math.ceil(ApplyPAtkAmplify(5 * GetTotalSpecStatus(MIG_PARAM_ID_POW)));

	// モンスター特化適用（たぶん計算に含まれてる）
	powAtk = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, powAtk);

	return Math.max(0, (dmg - powAtk));
}

/**
 * 特性データの補正を適用する.
 * @remarks foot.js を移植したくなかったため、無理やり分離した
 * @remarks ただ、呼び出し側も途中で追加計算していたりするため、特性ごとに個別に呼び出し処理をかかないといけない
 */
function ApplySpecModify(spid, spVal) {

	var sklLv = 0;
	var bufLv = 0;
	var valWork = 0;
	var arrayWork = null;

	switch (spid) {

	case ITEM_SP_HIT_PLUS:

		// 「インペリアルガード」スキル「槍＆片手剣修練」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN), UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN))) > 0) {

			// 片手剣・片手槍・両手槍装備時限定
			switch (n_A_WeaponType) {
			case ITEM_KIND_SWORD:
			case ITEM_KIND_SPEAR:
			case ITEM_KIND_SPEAR_2HAND:
				spVal += 10 * sklLv;
				break;
			}
		}

		// 「アビスチェイサー」スキル「アビススレイヤー」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_ABYSS_SLAYER)) > 0) {
			spVal += 50 * Math.floor((sklLv + 1) / 2);
		}

		// 「天帝」スキル「兵法修練」による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_HYOHO_SHUREN), UsedSkillSearch(SKILL_ID_HYOHO_SHUREN))) > 0) {
			spVal += [0, 3, 6, 9, 12, 15, 20, 25, 30, 40, 50][sklLv];
		}

		// 「ナイトウォッチ」スキル「インテンシブエイム」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_INTENSIVE_AIM)) > 0) {
			spVal += 250;
		}

		break;

	case ITEM_SP_FLEE_PLUS:

		// 「シャドウクロス」スキル「シャドウセンス」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_SHADOW_SENSE), UsedSkillSearch(SKILL_ID_SHADOW_SENSE))) > 0) {

			spVal += 10 * sklLv;
			if (sklLv >= 8) {
				spVal += 5 * (sklLv - 7);
			}
			if (sklLv >= 10) {
				spVal += 35;
			}
		}
		break;

	case ITEM_SP_CRI_PLUS:

		// 「シャドウクロス」スキル「シャドウセンス」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_SHADOW_SENSE), UsedSkillSearch(SKILL_ID_SHADOW_SENSE))) > 0) {

			// 右手短剣、カタール装備時限定
			switch (n_A_WeaponType) {
			case ITEM_KIND_KNIFE:
			case ITEM_KIND_KATAR:

				valWork = 1 * sklLv;
				if (sklLv >= 8) {
					valWork += 2;
				}
				if (sklLv >= 9) {
					valWork += 4;
				}
				if (sklLv >= 10) {
					valWork += 9;
				}

				if (n_A_WeaponType == ITEM_KIND_KNIFE) {
					valWork *= 2;
				}

				spVal += valWork;
				break;
			}
		}

		// 「ナイトウォッチ」スキル「インテンシブエイム」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_INTENSIVE_AIM)) > 0) {
			spVal += 50;
		}

		break;

	case ITEM_SP_MAXHP_UP:

		// 「インクイジター」スキル「堅固な信念」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_KENKONA_SHINNEN)) > 0) {
			spVal += 10;
		}
		break;

	case ITEM_SP_ATK_PLUS:

		// 「インペリアルガード」スキル「ガードスタンス」による効果（ペナルティ）
		if ((sklLv = UsedSkillSearch(SKILL_ID_GUARD_STANCE)) > 0) {

			// 盾装備時限定
			if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
				spVal -= 10 * sklLv;
			}
		}

		// 「インクイジター」スキル「強靭な信念」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_KYOZINNA_SHINNEN)) > 0) {
			spVal += 100;
		}

		// 「ナイトウォッチ」スキル「インテンシブエイム」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_INTENSIVE_AIM)) > 0) {
			spVal += 100;
		}


		break;

	case ITEM_SP_DEF_PLUS:

		// 「インペリアルガード」スキル「ガードスタンス」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_GUARD_STANCE)) > 0) {

			// 盾装備時限定
			if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
				spVal += 50 * sklLv;
				if (sklLv >= 5) {
					spVal += 50 * (sklLv - 4);
				}
			}
		}

		// 「インペリアルガード」スキル「アタックスタンス」による効果（ペナルティ）
		if ((sklLv = UsedSkillSearch(SKILL_ID_ATTACK_STANCE)) > 0) {

			// 盾装備時限定
			if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
				spVal -= 10 * sklLv;
			}
		}

		// 四次職支援「クライマックスインパクト」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
			spVal += 300;
		}

		// 四次職支援「防御装置有効化」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA]) > 0) {
			spVal += 300;
		}
		break;

	case ITEM_SP_MDEF_PLUS:
		// 四次職支援「クライマックスインパクト」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
			spVal += 50;
		}
		break;
	
	case ITEM_SP_LONGRANGE_DAMAGE_UP:
		// 「マイスター」スキル「ラッシュ状態」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_RUSH_STATE)) > 0) {
			spVal += 2 * sklLv;
		}
		// 「未知なる集中のブーツ」の純粋なステータスによる効果
		if ((itemCount = EquipNumSearch(ITEM_ID_MICHINARU_SHUCHUNO_BOOTS)) > 0) {
			if (g_pureStatus[MIG_PARAM_ID_CON] >= 100) {
				spVal += 30 * itemCount;
			}
		}
		// 四次職支援「天地神霊」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_TENCHI_SHINRE]) > 0) {
			spVal += 10 + bufLv;
		}
		// 「ナイトウォッチ」スキル「ヒドゥンカード」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_HIDDEN_CARD)) > 0) {
			spVal += 100 + sklLv * 10;
		}		
		break;

	case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE:
		// 「カーディナル」スキル「鈍器＆本修練」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_DONKI_HON_SHUREN), UsedSkillSearch(SKILL_ID_DONKI_HON_SHUREN))) > 0) {
			// 鈍器、本装備時限定
			if ([ITEM_KIND_CLUB, ITEM_KIND_BOOK].indexOf(n_A_WeaponType) >= 0) {
				spVal += [0, 1, 2, 3, 4, 5, 7, 9, 11, 15, 20][sklLv];
			}
		}
		// 「アビスチェイサー」スキル「短剣＆弓修練」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_TANKEN_YUMI_SHUREN), UsedSkillSearch(SKILL_ID_TANKEN_YUMI_SHUREN))) > 0) {
			// 短剣、弓装備時限定
			if ([ITEM_KIND_KNIFE, ITEM_KIND_BOW].indexOf(n_A_WeaponType) >= 0) {
				spVal += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
			}
		}
		break;

	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
		// 「インクイジター」スキル「信仰の意志」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_SHINKONO_ISHI), UsedSkillSearch(SKILL_ID_SHINKONO_ISHI))) > 0) {
			// 爪を装備しているとき
			if (n_A_WeaponType === ITEM_KIND_FIST) {
				// 不死種族・悪魔種族に対する物理ダメージが増加する
				if ([ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON].indexOf(spid) >= 0) {
					spVal += [0, 1, 2, 3, 4, 5, 7, 9, 11, 15, 20][sklLv];
				}
			}
		}

	case ITEM_SP_RESIST_ELM_WATER:

		// 四次職支援「クライマックスインパクト」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
			spVal += 25;
		}
		break;

	case ITEM_SP_RESIST_ELM_DARK:
	case ITEM_SP_RESIST_ELM_UNDEAD:

		// 「インペリアルガード」スキル「ホーリーシールド」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_HOLY_SHIELD)) > 0) {

			// 盾装備時限定
			if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {

				// 闇、不死耐性
				if ([ITEM_SP_RESIST_ELM_DARK, ITEM_SP_RESIST_ELM_UNDEAD].indexOf(spid) >= 0) {
					spVal += 3 * sklLv;
				}
			}
		}
		break;

	case ITEM_SP_CRITICAL_DAMAGE_UP:

		// 「未知なる創造のブーツ」の純粋なステータスによる効果
		if ((itemCount = EquipNumSearch(ITEM_ID_MICHINARU_SOZONO_BOOTS)) > 0) {
			if (g_pureStatus[MIG_PARAM_ID_CRT] >= 100) {
				spVal += 30 * itemCount;
			}
		}
		break;

	case ITEM_SP_PERFECT_ATTACK_UP:

		// 「インクイジター」スキル「忠実な信念」習得による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_CHUZITSUNA_SHINNEN)) > 0) {
			spVal += [0, 1, 3, 5, 10, 15][sklLv];
		}
		break;

	case ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON:

		// 「アークメイジ」スキル「クライマックスハリケーン状態」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_CLIMAX_HURRICANE_STATE)) > 0) {
			spVal += 200;
		}
		break;

	case ITEM_SP_ASPD_PLUS:

		// 「インクイジター」スキル「忠実な信念」習得による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_CHUZITSUNA_SHINNEN)) > 0) {
			spVal += 1;
		}
		break;

	case ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL:
	case ITEM_SP_PHYSICAL_RESIST_SIZE_MEDIUM:
	case ITEM_SP_PHYSICAL_RESIST_SIZE_LARGE:

		// 「ドラゴンナイト」スキル「ツーハンドディフェンディング」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_TWOHAND_DEFENDING), UsedSkillSearch(SKILL_ID_TWOHAND_DEFENDING))) > 0) {
			// 両手武器装備時限定
			switch (n_A_WeaponType) {
			case ITEM_KIND_SWORD_2HAND:
			case ITEM_KIND_SPEAR_2HAND:
			case ITEM_KIND_AXE_2HAND:
				spVal += sklLv;
				break;
			}
		}

		// 「マイスター」スキル「ツーアックスディフェンディング」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_TWO_AXE_DEFENDING), UsedSkillSearch(SKILL_ID_TWO_AXE_DEFENDING))) > 0) {
			// 両手斧装備時限定
			switch (n_A_WeaponType) {
			case ITEM_KIND_AXE_2HAND:
				spVal += sklLv;
				break;
			}
		}
		break;

	case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL:
	case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM:
	case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE:
		// 「アビスチェイサー」スキル「魔法剣修練」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_MAHOKEN_SHUREN), UsedSkillSearch(SKILL_ID_MAHOKEN_SHUREN))) > 0) {
			// 短剣、片手剣装備時限定
			switch (n_A_WeaponType) {
			case ITEM_KIND_KNIFE:
			case ITEM_KIND_SWORD:
				valWork = 1 * sklLv;
				if (sklLv >= 6) {
					valWork += 1 * (sklLv - 5);
				}
				spVal += valWork;
				break;
			}
		}
		break;

	case ITEM_SP_SHORTRANGE_DAMAGE_UP:

		// 四次職支援「天地神霊」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_TENCHI_SHINRE]) > 0) {
			spVal += 10 + bufLv;
		}
		// 「マイスター」スキル「ラッシュ状態」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_RUSH_STATE)) > 0) {
			spVal += 2 * sklLv;
		}
		break;		

	case ITEM_SP_P_ATK_PLUS:
	case ITEM_SP_S_MATK_PLUS:
		// GetSMatk(), GetPAtk()中の処理と重複するのでここで加算する場合は既存のコードを変更すること

	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON:
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO:
	case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD:
		// 「カーディナル」スキル「フィドスアニムス」習得による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_FIDOS_ANIMUS), UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS))) > 0) {
			// 聖属性魔法ダメージが増加する
			if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY].indexOf(spid) >= 0) {
				spVal += [0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 20][sklLv];
			}
		}

		// 「アークメイジ」スキル「クライマックスハリケーン状態」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_CLIMAX_HURRICANE_STATE)) > 0) {
			// 風属性魔法
			if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND].indexOf(spid) >= 0) {
				spVal += 50;
			}
		}

		// 「インペリアルガード」スキル「ホーリーシールド」による効果
		if ((sklLv = UsedSkillSearch(SKILL_ID_HOLY_SHIELD)) > 0) {
			// 盾装備時限定
			if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
				// 聖属性魔法
				if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY].indexOf(spid) >= 0) {
					spVal += 5 * sklLv;
				}
			}
		}

		// 「エレメンタルマスター」スキル「魔法本修練」による効果
		if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_MAHO_HON_SHUREN), UsedSkillSearch(SKILL_ID_MAHO_HON_SHUREN))) > 0) {
			// 本装備時限定
			switch (n_A_WeaponType) {
			case ITEM_KIND_BOOK:
				arrayWork = [
					ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE,
					ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER,
					ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND,
					ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH,
					ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON,
				];
				// 火・水・風・地・毒属性魔法
				if (arrayWork.indexOf(spid) >= 0) {
					spVal += 1 * sklLv;
					if (sklLv >= 6) {
						spVal += 2 * (sklLv - 5);
					}
				}
			}
		}

		// 四次職支援「クライマックスインパクト」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
			// 水属性魔法
			if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER].indexOf(spid) >= 0) {
				spVal += 25;
			}
		}

		// 四次職支援「天地神霊」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_TENCHI_SHINRE]) > 0) {
			spVal += 10 + bufLv;
		}

		// 「ハイパーノービス」スキル「ジャックフロストノヴァ」によるデバフ効果
		if (n_B_IJYOU[MOB_CONF_DEBUF_ID_JACK_FROST_NOVA]) {
			if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER].indexOf(spid) >= 0) {
				spVal += 15;
			}
		}
		
		break;

	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
		// 四次職支援「五行符」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_GOGYO_FU]) > 0) {
			arrayWork = [
				ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE,
				ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER,
				ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND,
				ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
				ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
			];
			// 火・水・風・地・無属性モンスター
			if (arrayWork.indexOf(spid) >= 0) {
				spVal += 2 * bufLv;
			}
		}
		break;

	// 属性攻撃ダメージ増加
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_EARTH:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_FIRE:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WIND:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_POISON:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_HOLY:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_DARK:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_PSYCO:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD:

		// 「ハイパーノービス」スキル「ジャックフロストノヴァ」によるデバフ効果
		if (n_B_IJYOU[MOB_CONF_DEBUF_ID_JACK_FROST_NOVA]) {
			if ([ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER].indexOf(spid) >= 0) {
				spVal += 15;
			}
		}

		break;


	// 属性モンスターへの物理ダメージ増加
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
		// 四次職支援「五行符」による効果
		if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_GOGYO_FU]) > 0) {
			arrayWork = [
				ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
				ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER,
				ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
				ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE,
				ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND,
			];
			// 火・水・風・地・無属性モンスター
			if (arrayWork.indexOf(spid) >= 0) {
				spVal += 2 * bufLv;
			}
		}
		break;
	}

	return spVal;
}

/**
 * ステータス、装備、その他の設定を維持したまま任意の職に変更する
 * @param {string} jobId
 */
function migrateOtherJob(jobId) {
	let jobData = JobMap.getById(jobId);

	const recentJobMigId = n_A_JOB;
	let dataURL = "";
	let funcModifySaveData = function (saveDataArrayF) {
		// 職業ID
		saveDataArrayF[1] = jobData.getMigIdNum();
		// 自動レベル調整は強制OFF
		saveDataArrayF[11] = 0;
		return saveDataArrayF;
	};
	// インジケーター表示
	showLoadingIndicator();
	setTimeout(() => {
		// 変更後の職業の二刀流可能性に合わせる
		n_Nitou = IsDualArmsJob(jobData.getMigIdNum());
		// TODO: 暫定対処　旧形式の保存処理呼び出し
		// 「プレイヤー状態異常設定」のように旧形式に存在しなかった入力項目は維持できないということ
		dataURL = SaveSystem(funcModifySaveData);
		// URL入力を実行
		CSaveController.loadFromURL(dataURL);
		// 異なる職業系列へ変更する場合
		if (!IsSameJobGroup(jobData.getMigIdNum(), recentJobMigId)) {
			// 習得スキルの初期化
			n_A_LearnedSkill = new Array();
			for (let dmyidx = 0; dmyidx < LEARNED_SKILL_MAX_COUNT; dmyidx++) {
				n_A_LearnedSkill[dmyidx] = 0;
			}
			OnClickSkillSWLearned();
			// 職固有自己支援・パッシブ持続系の初期化
			n_A_PassSkill.fill(0);
			$("#OBJID_CHECK_A1_SKILL_SW").prop("checked", true).trigger("click");
		}
		// 再計算
		calc();
		// 検索可能リスト更新
		LoadSelect2();
		// インジケーター非表示
		hideLoadingIndicator();
		setTimeout(() => {
			// 完了後に処理を挟みたい場合はここに書く
		}, 0);
	}, 0);
}

/**
 * OBJID_SELECT_JOB の状態が変更された時に呼び出されるエントリ関数
 * @param {string} jobId
 */
function OnChangeJob(jobId) {
	if (document.getElementById("OBJID_CHK_MIGRATE_SETTING").checked) {
		migrateOtherJob(jobId);
	} else {
		changeJobSettings(jobId);
		StAllCalc();
		CalcStatusPoint(false);
		AutoCalc();
	}
}
