





function GetMobDataBasicAttribute(monsterId, mobData){

//================================================================================================
// 基本情報の取得
//================================================================================================

	mobData[MONSTER_DATA_INDEX_ID] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_ID];
	mobData[MONSTER_DATA_INDEX_NAME] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_NAME];
	mobData[MONSTER_DATA_INDEX_QUALIFIED] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_QUALIFIED];



	// 特性ステータス対応
	mobData[MONSTER_DATA_INDEX_RES] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_RES];
	mobData[MONSTER_DATA_INDEX_MRES] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_MRES];

	mobData[MONSTER_DATA_INDEX_RES] = (mobData[MONSTER_DATA_INDEX_RES] === undefined) ? 0 : mobData[MONSTER_DATA_INDEX_RES];
	mobData[MONSTER_DATA_INDEX_MRES] = (mobData[MONSTER_DATA_INDEX_MRES] === undefined) ? 0 : mobData[MONSTER_DATA_INDEX_MRES];



//================================================================================================
// ボス属性の取得
//================================================================================================

	//----------------------------------------------------------------
	// 基本値
	//----------------------------------------------------------------
	switch (monsterId) {
	case MONSTER_ID_MONSTER_TENYURYOKU:
		mobData[MONSTER_DATA_INDEX_BOSS_TYPE] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE);
		break;

	default:
		mobData[MONSTER_DATA_INDEX_BOSS_TYPE] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_BOSS_TYPE];
	}





//================================================================================================
// 草属性の取得
//================================================================================================

	//----------------------------------------------------------------
	// 基本値
	//----------------------------------------------------------------
	switch (monsterId) {
	case MONSTER_ID_MONSTER_TENYURYOKU:
		mobData[MONSTER_DATA_INDEX_GRASS_TYPE] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE);
		break;

	default:
		mobData[MONSTER_DATA_INDEX_GRASS_TYPE] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_GRASS_TYPE];
	}





//================================================================================================
// 属性の取得
//================================================================================================

	//----------------------------------------------------------------
	// 基本値
	//----------------------------------------------------------------
	switch (monsterId) {
	case MONSTER_ID_MONSTER_TENYURYOKU:
		mobData[MONSTER_DATA_INDEX_ELEMENT] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_ELEMENT);
		break;

	case MONSTER_ID_PLAYER:
		mobData[MONSTER_DATA_INDEX_ELEMENT] = n_B_TAISEI[MOB_CONF_PLAYER_ID_ZOKUSEI] * 10 + 1;
		break;

	default:
		mobData[MONSTER_DATA_INDEX_ELEMENT] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_ELEMENT];
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　属性変化」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_ZOKUSEI_HENKA]) {
		mobData[MONSTER_DATA_INDEX_ELEMENT] = n_B_KYOUKA[MOB_CONF_BUF_ID_ZOKUSEI_HENKA];
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　エレメンタルチェンジ」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE]) {
		mobData[MONSTER_DATA_INDEX_ELEMENT]
			= n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE] * 10
				+ (mobData[MONSTER_DATA_INDEX_ELEMENT] % 10);
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　凍結」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				mobData[MONSTER_DATA_INDEX_ELEMENT] = MONSTER_ELM_WATER_1;
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　石化」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				mobData[MONSTER_DATA_INDEX_ELEMENT] = MONSTER_ELM_EARTH_1;
			}
		}
	}





//================================================================================================
// 種族の取得
//================================================================================================

	//----------------------------------------------------------------
	// 基本値
	//----------------------------------------------------------------
	switch (monsterId) {
	case MONSTER_ID_MONSTER_TENYURYOKU:
		mobData[MONSTER_DATA_INDEX_RACE] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RACE);
		break;

	default:
		mobData[MONSTER_DATA_INDEX_RACE] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_RACE];
	}





//================================================================================================
// サイズの取得
//================================================================================================

	//----------------------------------------------------------------
	// 基本値
	//----------------------------------------------------------------
	switch (monsterId) {
	case MONSTER_ID_PLAYER:
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU] == MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN) {
			mobData[MONSTER_DATA_INDEX_SIZE] = SIZE_ID_MEDIUM;
		}
		else {
			mobData[MONSTER_DATA_INDEX_SIZE] = SIZE_ID_SMALL;
		}
		break;

	case MONSTER_ID_MONSTER_TENYURYOKU:
		mobData[MONSTER_DATA_INDEX_SIZE] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_SIZE);
		break;

	default:
		mobData[MONSTER_DATA_INDEX_SIZE] = MonsterObjNew[monsterId][MONSTER_DATA_INDEX_SIZE];
	}





	return mobData;
}





function GetMobDataParameters(monsterId, mobData){

	var idx = 0;

	var bufLv = 0;
	var val = 0;
	var ratio = 0;

	var qmVal = 0;
	var qmValLimit = 0;





	//----------------------------------------------------------------
	// 一般パラメータ部分のコピー
	//----------------------------------------------------------------
	switch (monsterId) {
	case MONSTER_ID_MONSTER_TENYURYOKU:
		mobData[MONSTER_DATA_INDEX_LEVEL] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LV);
		mobData[MONSTER_DATA_INDEX_HP] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP);
		mobData[MONSTER_DATA_INDEX_STR] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_STR);
		mobData[MONSTER_DATA_INDEX_INT] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_INT);
		mobData[MONSTER_DATA_INDEX_VIT] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_VIT);
		mobData[MONSTER_DATA_INDEX_DEX] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_DEX);
		mobData[MONSTER_DATA_INDEX_AGI] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_AGI);
		mobData[MONSTER_DATA_INDEX_LUK] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LUK);
		mobData[MONSTER_DATA_INDEX_ATK] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_ATK);
		mobData[MONSTER_DATA_INDEX_MATK] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_MATK);
		mobData[MONSTER_DATA_INDEX_RANGE] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RANGE);
		mobData[MONSTER_DATA_INDEX_DEF_DIV] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_DEF);
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_MDEF);
		mobData[MONSTER_DATA_INDEX_BASE_EXP] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BASE_EXP);
		mobData[MONSTER_DATA_INDEX_JOB_EXP] = GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_JOB_EXP);
		break;

	case MONSTER_ID_PLAYER:
		// 念のため、定義をコピーしてから上書き
		for (idx = MONSTER_DATA_INDEX_LEVEL; idx <= MONSTER_DATA_INDEX_JOB_EXP; idx++) {
			mobData[idx] = MonsterObjNew[monsterId][idx];
		}
		mobData[MONSTER_DATA_INDEX_HP] = n_B_TAISEI[MOB_CONF_PLAYER_ID_MAXHP];
		mobData[MONSTER_DATA_INDEX_DEF_DIV] = n_B_TAISEI[MOB_CONF_PLAYER_ID_DEF_DIV];
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] = n_B_TAISEI[MOB_CONF_PLAYER_ID_MDEF_DIV];
		mobData[MONSTER_DATA_INDEX_RES] = n_B_TAISEI[MOB_CONF_PLAYER_ID_RES];
/*
現在の対人環境においてFLEEによる回避は現実的ではないので
ATKと合わせて重要度が低いと判断し
RES, MRESに置き換える

		mobData[MONSTER_DATA_INDEX_STR] = n_B_TAISEI[MOB_CONF_PLAYER_ID_STR];
		mobData[MONSTER_DATA_INDEX_AGI] = n_B_TAISEI[MOB_CONF_PLAYER_ID_AGI];
*/
		mobData[MONSTER_DATA_INDEX_MRES] = n_B_TAISEI[MOB_CONF_PLAYER_ID_MRES];
		mobData[MONSTER_DATA_INDEX_LEVEL] = n_B_TAISEI[MOB_CONF_PLAYER_ID_BASE_LV];
/*
ただし値の定義は必要なので 0 で初期化する

*/
		mobData[MONSTER_DATA_INDEX_STR] = 0;
		mobData[MONSTER_DATA_INDEX_AGI] = 0;
		mobData[MONSTER_DATA_INDEX_VIT] = n_B_TAISEI[MOB_CONF_PLAYER_ID_VIT];
		mobData[MONSTER_DATA_INDEX_INT] = n_B_TAISEI[MOB_CONF_PLAYER_ID_INT];
		mobData[MONSTER_DATA_INDEX_DEX] = n_B_TAISEI[MOB_CONF_PLAYER_ID_DEX];
		mobData[MONSTER_DATA_INDEX_LUK] = n_B_TAISEI[MOB_CONF_PLAYER_ID_LUK];
		break;

	default:
		for (idx = MONSTER_DATA_INDEX_LEVEL; idx <= MONSTER_DATA_INDEX_JOB_EXP; idx++) {
			mobData[idx] = MonsterObjNew[monsterId][idx];
		}
	}



/*
		if(eval(A_youshi.checked)){
			if(Math.floor(mobDataOriginal[15] / 10) == mobDataOriginal[15] / 10) mobDataOriginal[15] = Math.floor(mobDataOriginal[15] / 10);
			else mobDataOriginal[15] = Math.floor(mobDataOriginal[15] / 10) + 1;
			if(Math.floor(mobDataOriginal[16] / 10) == mobDataOriginal[16] / 10) mobDataOriginal[16] = Math.floor(mobDataOriginal[16] / 10);
			else mobDataOriginal[16] = Math.floor(mobDataOriginal[16] / 10) + 1;
		}
*/







//================================================================================================
// HPの補正
//================================================================================================

	//----------------------------------------------------------------
	// 「モンスター状態強化　リバース」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_REBIRTH]) {
		mobData[MONSTER_DATA_INDEX_HP]
			= ROUNDDOWN(mobData[MONSTER_DATA_INDEX_HP] * (20 * n_B_KYOUKA[MOB_CONF_BUF_ID_REBIRTH]) / 100);
	}





//================================================================================================
// ＡＴＫの補正
//================================================================================================

	// 最小ＡＴＫ（手入力などの関係上、ここで再計算する）
	mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] =
		mobData[MONSTER_DATA_INDEX_LEVEL]
		+ mobData[MONSTER_DATA_INDEX_STR]
		+ Math.floor(mobData[MONSTER_DATA_INDEX_ATK] * 0.8);

	// 最大ＡＴＫ（手入力などの関係上、ここで再計算する）
	mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] =
		mobData[MONSTER_DATA_INDEX_LEVEL]
		+ mobData[MONSTER_DATA_INDEX_STR]
		+ Math.floor(mobData[MONSTER_DATA_INDEX_ATK] * 1.2);

	// 最小ＭＡＴＫ（手入力などの関係上、ここで再計算する）
	mobData[MONSTER_DATA_EXTRA_INDEX_MATK_MIN] =
		mobData[MONSTER_DATA_INDEX_LEVEL]
		+ mobData[MONSTER_DATA_INDEX_INT]
		+ Math.floor(mobData[MONSTER_DATA_INDEX_MATK] * 0.8);

	// 最大ＭＡＴＫ（手入力などの関係上、ここで再計算する）
	mobData[MONSTER_DATA_EXTRA_INDEX_MATK_MAX] =
		mobData[MONSTER_DATA_INDEX_LEVEL]
		+ mobData[MONSTER_DATA_INDEX_INT]
		+ Math.floor(mobData[MONSTER_DATA_INDEX_MATK] * 1.2);

	//----------------------------------------------------------------
	// 「モンスター状態強化　マキシマイズパワー」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_MAXIMIZE_POWER]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] = mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX];
	}

	//----------------------------------------------------------------
	// 「二次職支援　カイト」の効果
	//----------------------------------------------------------------
	if (g_confDataNizi[CCharaConfNizi.CONF_ID_KAITO]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] = Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] * 500 / 100);
		mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] = Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] * 500 / 100);
	}

	//================================
	// ％増減　ここから
	//================================
	var wATK = 0;

	//----------------------------------------------------------------
	// 「モンスター状態異常　プロボック」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE]) {
		if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) != ELM_ID_UNDEAD) {
			if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
				wATK += 2 + n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE] * 3;
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　エスク」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_ESKU]) {
		wATK += 300;
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　ラッシュアタック」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_RUSH_ATTACK]) {
		wATK += 200;
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　呪い」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_NOROI]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wATK -= 25;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　エナベーション」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_ENERVATION]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wATK -= (20 + 10 * n_B_IJYOU[MOB_CONF_DEBUF_ID_ENERVATION]);
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ウォーターバリア」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_WATER_BARRIER]) {
		wATK -= 30;
	}

	//================================
	// ％増減　ここまで
	//================================
	mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] += Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] * wATK / 100);
	mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] += Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] * wATK / 100);

	//----------------------------------------------------------------
	// 「モンスター状態異常　ストリップウェポン」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_STRIP_WEAPON]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] -= Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN] * 25 /100);
		mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] -= Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX] * 25 /100);
	}





//================================================================================================
// 基本ステータスの補正
//================================================================================================

	//----------------------------------------------------------------
	// 「モンスター状態強化　速度増加」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_SOKUDO_ZOKA]) {
		mobData[MONSTER_DATA_INDEX_AGI] += 2 + n_B_KYOUKA[MOB_CONF_BUF_ID_SOKUDO_ZOKA];
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　クァグマイア」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_QUAGMIRE]) {
		qmVal = Math.floor(mobData[MONSTER_DATA_INDEX_AGI] / 2);
		qmValLimit = n_B_IJYOU[MOB_CONF_DEBUF_ID_QUAGMIRE] * 10;

		mobData[MONSTER_DATA_INDEX_AGI] -= Math.min(qmVal, qmValLimit);
		mobData[MONSTER_DATA_INDEX_DEX] -= Math.min(qmVal, qmValLimit);
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　マーシュオブアビス」の効果（プレイヤー限定）
	//----------------------------------------------------------------
	if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {

		if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS]) > 0) {


			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				mobData[MONSTER_DATA_INDEX_AGI] -= Math.floor(mobData[MONSTER_DATA_INDEX_AGI] * (25 + 5 * bufLv));
				mobData[MONSTER_DATA_INDEX_DEX] -= Math.floor(mobData[MONSTER_DATA_INDEX_DEX] * (25 + 5 * bufLv));
				break;

			default:
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　速度減少」の効果
	// 「モンスター状態異常　アドラムスのAGI減少」の効果
	// （恐らく、同一定義の効果）
	//----------------------------------------------------------------
	if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {

		val = 0;

		if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_ADORAMUS_DEBUFF]) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				val = Math.max(val, (60 - 5 * bufLv));
				break;

			default:
				val = Math.max(val, (2 + bufLv));
				break;

			}
		}

		if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_SOKUDO_GENSHO]) > 0) {
			val = Math.max(val, (2 + bufLv));
		}

		mobData[MONSTER_DATA_INDEX_AGI] -= val;

		if (mobData[MONSTER_DATA_INDEX_AGI] < 0) {
			mobData[MONSTER_DATA_INDEX_AGI]=0;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ブレッシング(不死/悪魔)」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_BLESSING]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON
				|| GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_UNDEAD){

				mobData[MONSTER_DATA_INDEX_DEX] -= Math.floor(mobData[MONSTER_DATA_INDEX_DEX] /2);
				mobData[MONSTER_DATA_INDEX_INT] -= Math.floor(mobData[MONSTER_DATA_INDEX_INT] /2);
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　呪い」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_NOROI]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_INDEX_LUK] = 0;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ストリップアーマー」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_STRIP_ARMOR]) {
		mobData[MONSTER_DATA_INDEX_VIT] -= Math.floor(mobData[MONSTER_DATA_INDEX_VIT] * 40 /100);
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ストリップヘルム」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_STRIP_HELM]) {
		mobData[MONSTER_DATA_INDEX_INT] -= Math.floor(mobData[MONSTER_DATA_INDEX_INT] * 40 /100);
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ストリップアクセサリー」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_STRIP_ACCESSARY]) {
		mobData[MONSTER_DATA_INDEX_INT] -= Math.floor(mobData[MONSTER_DATA_INDEX_INT] * 20 / 100);
		mobData[MONSTER_DATA_INDEX_DEX] -= Math.floor(mobData[MONSTER_DATA_INDEX_DEX] * 20 / 100);
		mobData[MONSTER_DATA_INDEX_LUK] -= Math.floor(mobData[MONSTER_DATA_INDEX_LUK] * 20 / 100);
	}





//================================================================================================
// 導出ステータスの算出
//================================================================================================

	//----------------------------------------------------------------
	// 減算ＤＥＦの算出
	//----------------------------------------------------------------

	// 対プレイヤーの場合は、対プレイヤー設定から値を計算する
	if(mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER){
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN]
			= mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX]
				= n_B_TAISEI[MOB_CONF_PLAYER_ID_DEF_MINUS];
	}

	// そうでなければ、ステータスから計算
	else {
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN]
			= Math.floor((mobData[MONSTER_DATA_INDEX_LEVEL] + mobData[MONSTER_DATA_INDEX_VIT]) / 2);
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX] = mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN];
	}

	//----------------------------------------------------------------
	// 減算ＭＤＥＦの算出
	//----------------------------------------------------------------

	// 対プレイヤーの場合は、対プレイヤー設定から値を計算する
	if(mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER){
		mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS] = n_B_TAISEI[MOB_CONF_PLAYER_ID_MDEF_MINUS];
	}

	// そうでなければ、ステータスから計算
	else {
		mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS]
			= Math.floor((mobData[MONSTER_DATA_INDEX_LEVEL] + mobData[MONSTER_DATA_INDEX_INT]) / 4);
	}

	//----------------------------------------------------------------
	// ＨＩＴの算出
	//----------------------------------------------------------------

	// 対プレイヤーの場合は、対プレイヤー設定から値を計算する
	if(mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER){
		mobData[MONSTER_DATA_EXTRA_INDEX_HIT] = 175 + mobData[MONSTER_DATA_INDEX_LEVEL] + mobData[MONSTER_DATA_INDEX_DEX] + Math.floor(mobData[MONSTER_DATA_INDEX_LUK] / 3);
	}

	// そうでなければ、ステータスから計算
	else {
		mobData[MONSTER_DATA_EXTRA_INDEX_HIT] = 150 + mobData[MONSTER_DATA_INDEX_LEVEL] + mobData[MONSTER_DATA_INDEX_DEX];
	}

	//----------------------------------------------------------------
	// ＦＬＥＥの算出
	//----------------------------------------------------------------

	// 対プレイヤーの場合は、対プレイヤー設定から値を計算する
	if(mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER){
		mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = n_B_TAISEI[MOB_CONF_PLAYER_ID_FLEE];
	}

	// そうでなければ、ステータスから計算
	else {
		mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = 100 + mobData[MONSTER_DATA_INDEX_LEVEL] + mobData[MONSTER_DATA_INDEX_AGI];
	}

	//----------------------------------------------------------------
	// 必中ＨＩＴの算出
	//----------------------------------------------------------------

	// 対プレイヤーの場合は、対プレイヤー設定から値を計算する
	if(mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER){
		mobData[MONSTER_DATA_EXTRA_INDEX_100HIT] = mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] + 100;
	}



	// TODO: これどうしよう
	B_Original_DEF = mobData[MONSTER_DATA_INDEX_DEF_DIV];
	B_Total_DEF = mobData[MONSTER_DATA_INDEX_DEF_DIV] + mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN];
	B_Total_MDEF = mobData[MONSTER_DATA_INDEX_MDEF_DIV] + mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS];





//================================================================================================
// 除算ＤＥＦの補正
//================================================================================================

	var wDEF = 0;

	// 計算前の元の値を保持
	mobData[MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF] = mobData[MONSTER_DATA_INDEX_DEF_DIV];

	//----------------------------------------------------------------
	// 「モンスター状態異常　シグナムクルシス」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS]) {
		if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON
			|| GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_UNDEAD){
			wDEF -= 10 + n_B_IJYOU[MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS] * 4;
		}
	}





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if (wDEF != 0) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_DEF_DIV] * wDEF / 100);
		B_Total_DEF += ROUNDDOWN(B_Total_DEF * wDEF / 100);
	}





	wDEF = 0;

	//----------------------------------------------------------------
	// 「モンスター状態異常　プロボック」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE]) {
		if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) != ELM_ID_UNDEAD) {
			if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
				if (mobData[MONSTER_DATA_INDEX_ID] != MONSTER_ID_PLAYER) {
					wDEF -= 5 + n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE] * 5;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　エスク」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_ESKU]) {
		wDEF -= 50;
	}



	//----------------------------------------------------------------
	// 「モンスター状態異常　フライング」の効果
	// ※R化で、BOSS属性は無効になった模様。
	//----------------------------------------------------------------
	if(n_B_IJYOU[MOB_CONF_DEBUF_ID_FLYING]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wDEF -= 5 * n_B_IJYOU[MOB_CONF_DEBUF_ID_FLYING];
		}
	}

	//----------------------------------------------------------------
	// 「三次職支援　エクスピアティオ」の効果
	// 「パッシブ持続系　エクスピアティオ」の効果
	//----------------------------------------------------------------
	if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_EXPIATIO] > 0) {
		wDEF -= 20 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_EXPIATIO];
	}
	else if (UsedSkillSearch(SKILL_ID_EXPIATIO)) {
		wDEF -= 20 * UsedSkillSearch(SKILL_ID_EXPIATIO);
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　アナライズ」の効果
	//----------------------------------------------------------------
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_ANALYSE]) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			wDEF -= 100;
			break;

		default:
			wDEF -= 20 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　毒」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_DOKU]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wDEF -= 25;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ストリップシールド」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_STRIP_SHIELD]) {
		wDEF -= 15;
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　氷結」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_HYOKETSU]) {
		wDEF -= 10;
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　麻痺」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_MAHI]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wDEF -= 5 * n_B_IJYOU[MOB_CONF_DEBUF_ID_MAHI];
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ニャングラス」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_NYAN_GRASS]) {
		// プレイヤーとモンスターで効果が異なる
		if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
			// スキルの説明文には 0 にするとあるが…実際は-100か？
			wDEF -= 100;
		}
		else {
			wDEF -= 50;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　アスムプティオ」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_ASSUMPTIO]) {
		// シーズモード等では効果が落ちる
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] > MOB_CONF_PLAYER_ID_SENTO_AREA_NONE) {
			wDEF += 35;
		}
		else {
			wDEF += 100;
		}
	}

	//----------------------------------------------------------------
	// 「ウォーロック　マーシュオブアビス」の効果
	//----------------------------------------------------------------
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS]) > 0) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wDEF -= 10 + Math.floor(n_A_INT / 10) + Math.floor(n_A_JobLV / 2);
		}
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　アースドライブ」の効果
	//----------------------------------------------------------------
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_EARTH_DRIVE_DEBUFF]) > 0) {
		wDEF -= 25;
	}

	//----------------------------------------------------------------
	// アイテム特性のＤＥＦ無視効果の適用
	// TODO : ここ、加算でいいのか？
	//----------------------------------------------------------------
	// 全てのモンスターのＤＥＦ無視
	wDEF -= n_tok[ITEM_SP_IGNORE_DEF_ALL];

	// 一般／ボスのＤＥＦ無視
	if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
		wDEF -= n_tok[ITEM_SP_IGNORE_DEF_NOTBOSS];
	}
	else if (mobData[20] == 1) {
		wDEF -= n_tok[ITEM_SP_IGNORE_DEF_BOSS];
	}

	// 全ての種族のＤＥＦ無視
	wDEF -= n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL];

	// 特定種族のＤＥＦ無視
	wDEF -= n_tok[ITEM_SP_IGNORE_DEF_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]];





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if(wDEF < -100) {
		wDEF = -100;
	}

	if (wDEF != 0) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_DEF_DIV] * wDEF / 100);
		B_Total_DEF += ROUNDDOWN(B_Total_DEF * wDEF / 100);
	}





	wDEF = 0;

	//----------------------------------------------------------------
	// 「モンスター状態異常　凍結」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				wDEF -= 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　石化」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				wDEF -= 50;
			}
		}
	}





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if (wDEF < -100) {
		wDEF = -100;
	}

	if (wDEF != 0) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_DEF_DIV] * wDEF / 100);
		B_Total_DEF += ROUNDDOWN(B_Total_DEF * wDEF / 100);
	}





	//----------------------------------------------------------------
	// 「モンスター状態強化　キーピング」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_KEEPING]) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] = Math.floor(mobData[MONSTER_DATA_INDEX_DEF_DIV] * 2);

		if(mobData[MONSTER_DATA_INDEX_DEF_DIV] >= 90) {
			mobData[MONSTER_DATA_INDEX_DEF_DIV] = 90;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　永遠の混沌」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_EIENNNO_KONTON]) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] = 0;
	}





	if (mobData[MONSTER_DATA_INDEX_DEF_DIV] < 0) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] = 0;
	}





	wDEF = 0;

	//----------------------------------------------------------------
	// 「モンスター状態異常　ウォーターバリア」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_WATER_BARRIER]) {
		// 錐効果や発勁の計算には含まれない
		if (n_tok[ITEM_SP_KIRI_EFFECT] == 0 && n_A_ActiveSkill != SKILL_ID_HAKKEI){
			wDEF += 30;
		}
	}





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if (wDEF < -100) {
		wDEF = -100;
	}

	if (wDEF != 0) {
		mobData[MONSTER_DATA_INDEX_DEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_DEF_DIV] * wDEF / 100);
		B_Total_DEF += ROUNDDOWN(B_Total_DEF * wDEF / 100);
	}





//================================================================================================
// 減算ＤＥＦの補正
//================================================================================================

	//----------------------------------------------------------------
	// 「モンスター状態異常　プロボック」の、「対プレイヤー」における効果
	//----------------------------------------------------------------
	if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
		if (n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE] != 0) {
			if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) != ELM_ID_UNDEAD) {
				if (mobData[MONSTER_DATA_INDEX_VIT] != 0 && mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN] != 0) {

					ratio = 5 + 5 * n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE];
					mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN] -= Math.floor((mobData[MONSTER_DATA_INDEX_VIT] / 2) * ratio / 100);
					mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX] = mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN];
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　エスカ」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_ESKA]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN] = 90;
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX] = 90;
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　永遠の混沌」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_EIENNNO_KONTON]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN] = 0;
		mobData[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX] = 0;
	}





//================================================================================================
// 除算ＭＤＥＦの補正
//================================================================================================

	var wMDEF = 0;

	// 計算前の元の値を保持
	mobData[MONSTER_DATA_INDEX_MDEF_DIV_IGNORE_BUFF] = mobData[MONSTER_DATA_INDEX_MDEF_DIV];



	//----------------------------------------------------------------
	// 「モンスター状態異常　凍結」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				wMDEF += 25;
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　石化」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				wMDEF += 25;
			}
		}
	}





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if (wMDEF < -100) {
		wMDEF = -100;
	}

	if (wMDEF != 0){
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_MDEF_DIV] * wMDEF / 100);
		B_Total_MDEF += Math.floor(B_Total_MDEF * wMDEF / 100);
	}





	//----------------------------------------------------------------
	// アイテム特性のＭＤＥＦ無視効果の適用
	//----------------------------------------------------------------

	wMDEF = 0;

	// 全てのモンスターのＭＤＥＦ無視
	wMDEF -= n_tok[ITEM_SP_IGNORE_MDEF_ALL];

	// 一般／ＢＯＳＳのＭＤＥＦ無視
	if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
		wMDEF -= n_tok[ITEM_SP_IGNORE_MDEF_NOTBOSS];
	}
	else {
		wMDEF -= n_tok[ITEM_SP_IGNORE_MDEF_BOSS];
	}

	// 全ての種族のＭＤＥＦ無視
	wMDEF -= n_tok[ITEM_SP_IGNORE_MDEF_RACE_ALL];

	// 特定種族のＭＤＥＦ無視
	wMDEF -= n_tok[ITEM_SP_IGNORE_MDEF_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]];





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if (wMDEF < -100) {
		wMDEF = -100;
	}

	if (wMDEF != 0){
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_MDEF_DIV] * wMDEF / 100);
		B_Total_MDEF += Math.floor(B_Total_MDEF * wMDEF / 100);
	}





	wMDEF = 0;

	//----------------------------------------------------------------
	// 「モンスター状態異常　マインドブレイカー」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_MIND_BREAKER]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) != ELM_ID_UNDEAD) {
				wMDEF -= n_B_IJYOU[MOB_CONF_DEBUF_ID_MIND_BREAKER] * 12;
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　アナライズ」の効果
	//----------------------------------------------------------------
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_ANALYSE]) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			wMDEF -= 100;
			break;

		default:
			wMDEF -= 20 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ウォーターバリア」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_WATER_BARRIER]) {
		wMDEF += 20;
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　発火」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_HAKKA]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wMDEF -= 25;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　麻痺」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_MAHI]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wMDEF -= 5 * n_B_IJYOU[MOB_CONF_DEBUF_ID_MAHI];
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ニャングラス」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_NYAN_GRASS]) {
		// プレイヤーとモンスターで効果が異なる
		if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
			// スキルの説明文には 0 にするとあるが…実際は-100か？
			wMDEF -= 100;
		}
		else {
			wMDEF -= 50;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　アスムプティオ」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_ASSUMPTIO]) {
		// シーズモード等では効果が落ちる
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] > MOB_CONF_PLAYER_ID_SENTO_AREA_NONE) {
			wMDEF += 35;
		}
		else {
			wMDEF += 100;
		}
	}

	//----------------------------------------------------------------
	// 「ウォーロック　マーシュオブアビス」の効果
	//----------------------------------------------------------------
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS]) > 0) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			wMDEF -= 10 + Math.floor(n_A_INT / 10) + Math.floor(n_A_JobLV / 2);
		}
	}





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	if (wMDEF < -100) {
		wMDEF = -100;
	}

	if (wMDEF != 0){
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] += ROUNDDOWN(mobData[MONSTER_DATA_INDEX_MDEF_DIV] * wMDEF / 100);
		B_Total_MDEF += Math.floor(B_Total_MDEF * wMDEF / 100);
	}




/*
	// 2018/04/03 のパッチで仕様変更（削除）の模様

	//----------------------------------------------------------------
	// 「モンスター状態強化　ストーンスキン」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_STONE_SKIN]) {
		ratio = 100 + 20 * n_B_KYOUKA[MOB_CONF_BUF_ID_STONE_SKIN];
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] = Math.floor(mobData[14] * ratio / 100);
	}
*/

	//----------------------------------------------------------------
	// 「モンスター状態強化　キーピング」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_KEEPING]) {
		mobData[MONSTER_DATA_INDEX_MDEF_DIV] = Math.floor(mobData[MONSTER_DATA_INDEX_MDEF_DIV] * 2);

		if(mobData[MONSTER_DATA_INDEX_MDEF_DIV] >= 90) {
			mobData[MONSTER_DATA_INDEX_MDEF_DIV] = 90;
		}
	}



	//----------------------------------------------------------------
	// 「カトリーヌ＝ケイロン（ＭＶＰ）カード」の効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_CATHERINE_KARON_MVP)) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_INDEX_MDEF_DIV] = 0;
		}
	}

	//----------------------------------------------------------------
	// 「悪魔祓いの書」の追加発動効果
	//----------------------------------------------------------------
	if (TimeItemNumSearch(69)) {
		 mobData[MONSTER_DATA_INDEX_MDEF_DIV] = 0;
	}





//================================================================================================
// 減算ＭＤＥＦの補正
//================================================================================================

	//----------------------------------------------------------------
	// 「モンスター状態異常　エスカ」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_ESKA]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS] = 90;
	}

	//----------------------------------------------------------------
	// 「カトリーヌ＝ケイロン（ＭＶＰ）カード」の効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_CATHERINE_KARON_MVP)) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS] = 0;
		}
	}

	//----------------------------------------------------------------
	// 「悪魔祓いの書」の追加発動効果
	//----------------------------------------------------------------
	if (TimeItemNumSearch(69)) {
		 mobData[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS] = 0;
	}





//================================================================================================
// ＨＩＴの補正
//================================================================================================

	//----------------------------------------------------------------
	// 「モンスター状態異常　暗闇」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_KURAYAMI]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_EXTRA_INDEX_HIT] -= Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_HIT] * 25 / 100);

			if (mobData[MONSTER_DATA_EXTRA_INDEX_HIT] < 1) {
				mobData[MONSTER_DATA_EXTRA_INDEX_HIT] = 1;
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　グルーミー」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_GROOMY]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_HIT] -= (20 * n_B_IJYOU[MOB_CONF_DEBUF_ID_GROOMY]);
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　ラッシュアタック」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_RUSH_ATTACK]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_HIT] = mobData[MONSTER_DATA_EXTRA_INDEX_HIT] * 2;
	}





//================================================================================================
// ＦＬＥＥの補正
//================================================================================================

	//----------------------------------------------------------------
	// 「モンスター状態異常　暗闇」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_KURAYAMI]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] -= Math.floor(mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] * 25 / 100);
		}
	}

	//----------------------------------------------------------------
	// 「ウォーロック　マーシュオブアビス」の効果
	//----------------------------------------------------------------
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS]) > 0) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] -= 10 + Math.floor(n_A_INT / 10) + Math.floor(n_A_JobLV / 2);
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　速度強化」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_SOKUDO_KYOKA]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] * 2;
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　スパイダーウェブ」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SPIDER_WEB]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] -= 50;

		if (mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] < 0) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = 0;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　ウォーターバリア」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_WATER_BARRIER]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] -= 30;

		if (mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] < 0) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = 0;
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　烙印状態」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
		mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] -= 10;

		if (mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] < 0) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = 0;
		}
	}





	//----------------------------------------------------------------
	// TODO: シーズ補正？
	//----------------------------------------------------------------
	if (n_Ses == 1) {

		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = ROUNDDOWN(mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] * 0.8);
			break;
		}
	}





	//----------------------------------------------------------------
	// 「モンスター状態異常　凍結」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			if (mobData[MONSTER_DATA_INDEX_RACE] != RACE_ID_UNDEAD) {
				mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = -99;		// TODO: これどうなん……
			}
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　スタン」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_STUN]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = -99;		// TODO: これどうなん……
		}
	}

	//----------------------------------------------------------------
	// 「モンスター状態異常　睡眠」の効果
	//----------------------------------------------------------------
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SUIMIN]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] = -99;		// TODO: これどうなん……
		}
	}





//================================================================================================
// 必中ＨＩＴ／９５％ＦＬＥＥの補正
//================================================================================================

	mobData[MONSTER_DATA_EXTRA_INDEX_100HIT] = mobData[MONSTER_DATA_EXTRA_INDEX_FLEE] + 100;
	mobData[MONSTER_DATA_EXTRA_INDEX_95FLEE] = mobData[MONSTER_DATA_EXTRA_INDEX_HIT] - 5;





//================================================================================================
// 経験値の補正
//================================================================================================

/*
	if(eval(A_youshi.checked)){
		if(Math.floor(mobData[15] / 5) == mobData[15] / 5) mobData[15] = Math.floor(mobData[15] / 5);
		else mobData[15] = Math.floor(mobData[15] / 5) + 1;
		if(Math.floor(mobData[16] / 5) == mobData[16] / 5) mobData[16] = Math.floor(mobData[16] / 5);
		else mobData[16] = Math.floor(mobData[16] / 5) + 1;
	}
*/

	//----------------------------------------------------------------
	// 「その他の支援　経験値増加キャンペーン」の効果
	//----------------------------------------------------------------
	if(n_A_PassSkill8[7]){
		ratio = 100 + 25 * n_A_PassSkill8[7];
		mobData[MONSTER_DATA_INDEX_BASE_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_BASE_EXP] * ratio / 100);
		mobData[MONSTER_DATA_INDEX_JOB_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_JOB_EXP] * ratio / 100);
	}

	//----------------------------------------------------------------
	// 「モンスター状態強化　リバース」の効果
	//----------------------------------------------------------------
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_REBIRTH]) {
		ratio = 20 * n_B_KYOUKA[11];
		mobData[MONSTER_DATA_INDEX_BASE_EXP] = ROUNDDOWN(mobData[MONSTER_DATA_INDEX_BASE_EXP] * ratio / 100);
		mobData[MONSTER_DATA_INDEX_JOB_EXP] = ROUNDDOWN(mobData[MONSTER_DATA_INDEX_JOB_EXP] * ratio / 100);
	}

	//----------------------------------------------------------------
	// 「その他の支援　公平ＰＴ人数」の効果
	//----------------------------------------------------------------
	if (n_A_PassSkill8[5]) {
		mobData[MONSTER_DATA_INDEX_BASE_EXP] += n_A_PassSkill8[5] + 1;
		mobData[MONSTER_DATA_INDEX_JOB_EXP] += n_A_PassSkill8[5] + 1;
	}





	var wAllExp = 100;
	var wJobExp = 0;

	//----------------------------------------------------------------
	// アイテム特性の経験値増加効果の適用
	//----------------------------------------------------------------
	wAllExp += n_tok[ITEM_SP_EXP_UP_ALL];
	wAllExp += n_tok[ITEM_SP_EXP_UP_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]];

	//----------------------------------------------------------------
	// 「その他の支援　ＯＴＰボーナス」の効果
	//----------------------------------------------------------------
	if (1 <= n_A_PassSkill8[22] && n_A_PassSkill8[22] <= 4) {
		wAllExp += 5;
	}

	//----------------------------------------------------------------
	// 「その他の支援　戦闘教範系」の効果
	//----------------------------------------------------------------
	if (n_A_PassSkill8[1]) {
		wAllExp += (25 * n_A_PassSkill8[1]);
	}

	//----------------------------------------------------------------
	// 「その他の支援　Job教範系」の効果（★代入先変数注意★）
	//----------------------------------------------------------------
	if(n_A_PassSkill8[2]) {
		wJobExp += (25 * (n_A_PassSkill8[2] + 1));
	}

	//----------------------------------------------------------------
	// 「その他の支援　ネットカフェ経験値UP」の効果
	//----------------------------------------------------------------
	if(n_A_PassSkill8[3]) {
		wAllExp += 50 * n_A_PassSkill8[3];
	}

	//----------------------------------------------------------------
	// 「一次職支援　マーダラーボーナス」の効果
	//----------------------------------------------------------------
	if (g_confDataIchizi[CCharaConfIchizi.CONF_ID_MARDERER_BONUS]) {
		wAllExp += 100;
	}


	//----------------------------------------------------------------
	// 「対プレイヤー設定　戦闘エリア」の「Urdr」における効果
	// 「一次職支援　マーダラーボーナス」の効果
	//----------------------------------------------------------------
	if(n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_URDR
		|| g_confDataIchizi[CCharaConfIchizi.CONF_ID_MARDERER_BONUS]){
		wAllExp = wAllExp * 2;
		wJobExp = wJobExp * 2;
	}





	//================================
	// ここで一度計算が入る（らしい）
	//================================
	mobData[MONSTER_DATA_INDEX_BASE_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_BASE_EXP] * wAllExp / 100);
	mobData[MONSTER_DATA_INDEX_JOB_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_JOB_EXP] * (wAllExp + wJobExp) / 100);





	//----------------------------------------------------------------
	// 「その他の支援　公平ＰＴ人数」の効果（公平ボーナスと公平による分割）
	//----------------------------------------------------------------
	var wPTBonus = [0,1,2,4,7,11,16,22,29,37,46,56];
	if (n_A_PassSkill8[5]) {
		ratio = 100 + wPTBonus[n_A_PassSkill8[5]];
		mobData[MONSTER_DATA_INDEX_BASE_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_BASE_EXP] * ratio / 100);
		mobData[MONSTER_DATA_INDEX_JOB_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_JOB_EXP] * ratio / 100);
		mobData[MONSTER_DATA_INDEX_BASE_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_BASE_EXP] / (1 + n_A_PassSkill8[5]));
		mobData[MONSTER_DATA_INDEX_JOB_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_JOB_EXP] / (1 + n_A_PassSkill8[5]));
	}

	//----------------------------------------------------------------
	// 「その他の支援　共闘ボーナス」の効果
	//----------------------------------------------------------------
	if (n_A_PassSkill8[6]) {
		ratio = 100 + 25 * n_A_PassSkill8[6];
		mobData[MONSTER_DATA_INDEX_BASE_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_BASE_EXP] * ratio / 100);
		mobData[MONSTER_DATA_INDEX_JOB_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_JOB_EXP] * ratio / 100);
	}

	//----------------------------------------------------------------
	// 「演奏/踊り系スキル　ニヨルドの宴」の効果
	//----------------------------------------------------------------
	if (n_A_PassSkill3[8]) {
		if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_NONE) {
			ratio = 125 + 11 * n_A_PassSkill3[8];
			mobData[MONSTER_DATA_INDEX_BASE_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_BASE_EXP] * ratio / 100);
			mobData[MONSTER_DATA_INDEX_JOB_EXP] = Math.floor(mobData[MONSTER_DATA_INDEX_JOB_EXP] * ratio / 100);
		}
	}





	return mobData;
}


