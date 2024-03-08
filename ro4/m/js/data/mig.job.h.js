//================================================================================================
//================================================================================================
//====
//==== ジョブ定義
//====
//================================================================================================
//================================================================================================

CGlobalConstManager.DefineEnum(
	"EnumJobId",
	[
		"JOB_ID_NOVICE",

		"JOB_ID_SWORDMAN",	//  1
		"JOB_ID_THIEF",
		"JOB_ID_ACOLYTE",
		"JOB_ID_ARCHER",
		"JOB_ID_MAGICIAN",
		"JOB_ID_MARCHANT",	//  6

		"JOB_ID_KNIGHT",	//  7
		"JOB_ID_ASSASIN",
		"JOB_ID_PRIEST",
		"JOB_ID_HUNTER",	// 10
		"JOB_ID_WIZARD",
		"JOB_ID_BLACKSMITH",
		"JOB_ID_CRUSADER",
		"JOB_ID_ROGUE",
		"JOB_ID_MONK",	// 15
		"JOB_ID_BARD",
		"JOB_ID_DANCER",
		"JOB_ID_SAGE",
		"JOB_ID_ALCHEMIST",	// 19

		"JOB_ID_SUPERNOVICE",	// 20

		"JOB_ID_LORDKNIGHT",	// 21
		"JOB_ID_ASSASINCROSS",
		"JOB_ID_HIGHPRIEST",
		"JOB_ID_SNIPER",
		"JOB_ID_HIGHWIZARD",	// 25
		"JOB_ID_WHITESMITH",
		"JOB_ID_PALADIN",
		"JOB_ID_CHASER",
		"JOB_ID_CHAMPION",
		"JOB_ID_CROWN",	// 30
		"JOB_ID_ZYPSY",
		"JOB_ID_PROFESSOR",
		"JOB_ID_CREATOR",	// 33

		"JOB_ID_HI_NOVICE",	// 34

		"JOB_ID_HI_SWORDMAN",	// 35
		"JOB_ID_HI_THIEF",
		"JOB_ID_HI_ACOLYTE",
		"JOB_ID_HI_ARCHER",
		"JOB_ID_HI_MAGICIAN",
		"JOB_ID_HI_MARCHANT",	// 40

		"JOB_ID_TAEGWON",	// 41
		"JOB_ID_STARGRADIATOR",
		"JOB_ID_SOULLINKER",
		"JOB_ID_NINJA",
		"JOB_ID_GUNSLINGER",	// 45

		"JOB_ID_RUNEKNIGHT",	// 46
		"JOB_ID_GILOTINCROSS",
		"JOB_ID_ARCBISHOP",
		"JOB_ID_RANGER",
		"JOB_ID_WARLOCK",	// 50
		"JOB_ID_MECHANIC",
		"JOB_ID_ROYALGUARD",
		"JOB_ID_SHADOWCHASER",
		"JOB_ID_SHURA",
		"JOB_ID_MINSTREL",	// 55
		"JOB_ID_WANDERER",
		"JOB_ID_SORCERER",
		"JOB_ID_GENETIC",	// 58

		"JOB_ID_KAGERO",	// 59
		"JOB_ID_OBORO",	// 60

		"JOB_ID_SUPERNOVICE_PLUS",	// 61

		"JOB_ID_REBELLION",	// 62

		"JOB_ID_SUMMONER",	// 63

		"JOB_ID_STAR_EMPEROR",	// 64
		"JOB_ID_SOUL_REAPER",	// 65

		"JOB_ID_DRAGON_KNIGHT", 	// 66
		"JOB_ID_SHADOW_CROSS",  	// 67
		"JOB_ID_CARDINAL",  		// 68
		"JOB_ID_WIND_HAWK",  		// 69
		"JOB_ID_ARCH_MAGE",  		// 70
		"JOB_ID_MEISTER",  			// 71
		"JOB_ID_IMPERIAL_GUARD",	// 72
		"JOB_ID_ABYSS_CHASER",  	// 73
		"JOB_ID_INQUISITOR",  		// 74
		"JOB_ID_TROUBADOUR",  		// 75
		"JOB_ID_TROUVERE",  		// 76
		"JOB_ID_ELEMENTAL_MASTER",  // 77
		"JOB_ID_BIOLO",  			// 78
		"JOB_ID_SKY_EMPEROR",  		// 79
		"JOB_ID_SOUL_ASCETIC",  	// 80
		"JOB_ID_SHINKIROU",  		// 81
		"JOB_ID_SHIRANUI",  		// 82
		"JOB_ID_NIGHT_WATCH",  		// 83
		"JOB_ID_HYPER_NOVICE",  	// 84
		"JOB_ID_SPIRIT_HANDLER",	// 85		
	]
);

// Enum に登録するとマズイので
JOB_ID_ANY = -1;

// 職業系統
JOB_SERIES_ID_NOVICE		= 0;
JOB_SERIES_ID_SUPERNOVICE	= 20;

JOB_SERIES_ID_SWORDMAN		= 1;
JOB_SERIES_ID_THIEF			= 2;
JOB_SERIES_ID_ACOLYTE		= 3;
JOB_SERIES_ID_ARCHER		= 4;
JOB_SERIES_ID_MAGICIAN		= 5;
JOB_SERIES_ID_MERCHANT		= 6;

JOB_SERIES_ID_KNIGHT		= 7;
JOB_SERIES_ID_ASSASIN		= 8;
JOB_SERIES_ID_PRIEST		= 9;
JOB_SERIES_ID_HUNTER		= 10;
JOB_SERIES_ID_WIZARD		= 11;
JOB_SERIES_ID_BLACKSMITH	= 12;
JOB_SERIES_ID_CRUSADER		= 13;
JOB_SERIES_ID_ROGUE			= 14;
JOB_SERIES_ID_MONK			= 15;
JOB_SERIES_ID_BARD			= 16;
JOB_SERIES_ID_DANCER		= 17;
JOB_SERIES_ID_SAGE			= 18;
JOB_SERIES_ID_ALCHEMIST		= 19;

JOB_SERIES_ID_TAEGKUON		= 41;
JOB_SERIES_ID_NINJA			= 44;
JOB_SERIES_ID_GUNSLINGER	= 45;

JOB_SERIES_ID_SUMMONER		= 51;







/**
 * ジョブ名を取得する.
 * @param jobId ジョブＩＤ
 */
function GetJobName(jobId) {
	return g_constDataManager.GetName(CONST_DATA_KIND_JOB, jobId);
}



/**
 * 一次職業系統を取得する.
 * @return 職業系統ＩＤ（０～
 */
function GetLowerJobSeriesID(jobID){

	// 一次職の場合は、そのまま返す
	if (jobID <= JOB_ID_MARCHANT) {
		return jobID;
	}

	switch (jobID) {

	// ノービス系
	case 20:
	case 61:
	case MIG_JOB_ID_HYPER_NOVICE:
		return 0;

	// 転生一次職
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
		return (jobID - 34);

	// 上位職
	case 7:
	case 13:
	case 21:
	case 27:
	case 46:
	case 52:
	case MIG_JOB_ID_DRAGON_KNIGHT:
	case MIG_JOB_ID_IMPERIAL_GUARD:
		return 1;

	case 8:
	case 14:
	case 22:
	case 28:
	case 47:
	case 53:
	case MIG_JOB_ID_SHADOW_CROSS:
	case MIG_JOB_ID_ABYSS_CHASER:
		return 2;

	case 9:
	case 15:
	case 23:
	case 29:
	case 48:
	case 54:
	case MIG_JOB_ID_CARDINAL:
	case MIG_JOB_ID_INQUISITOR:
		return 3;

	case 10:
	case 16:
	case 17:
	case 24:
	case 30:
	case 31:
	case 49:
	case 55:
	case 56:
	case MIG_JOB_ID_WIND_HAWK:
	case MIG_JOB_ID_TROUBADOUR:
	case MIG_JOB_ID_TROUVERE:
		return 4;

	case 11:
	case 18:
	case 25:
	case 32:
	case 50:
	case 57:
	case MIG_JOB_ID_ARCH_MAGE:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
		return 5;

	case 12:
	case 19:
	case 26:
	case 33:
	case 51:
	case 58:
	case MIG_JOB_ID_MEISTER:
	case MIG_JOB_ID_BIOLO:
		return 6;

	// テコン系
	case 41:
	case 42:
	case 43:
	case JOB_ID_STAR_EMPEROR:
	case JOB_ID_SOUL_REAPER:
	case MIG_JOB_ID_SKY_EMPEROR:
	case MIG_JOB_ID_SOUL_ASCETIC:
		return 41;

	// 忍者系
	case 44:
	case 59:
	case 60:
	case MIG_JOB_ID_SHINKIROU:
	case MIG_JOB_ID_SHIRANUI:
		return 44;

	// ガンスリンガー系
	case 45:
	case 62:
	case MIG_JOB_ID_NIGHT_WATCH:
		return 45;

	// サモナー系
	case JOB_ID_SUMMONER:
	case MIG_JOB_ID_SPIRIT_HANDLER:
		return JOB_SERIES_ID_SUMMONER;

	}



	// TODO : 謎
	return 7;
}

/**
 * 二次職業系統を取得する.
 * @return 職業系統ＩＤ（０～
 */
function GetHigherJobSeriesID(jobID) {

	switch (jobID) {

	case 7:
	case 21:
	case 46:
	case MIG_JOB_ID_DRAGON_KNIGHT:
		return 7;

	case 8:
	case 22:
	case 47:
	case MIG_JOB_ID_SHADOW_CROSS:
		return 8;

	case 9:
	case 23:
	case 48:
	case MIG_JOB_ID_CARDINAL:
		return 9;

	case 10:
	case 24:
	case 49:
	case MIG_JOB_ID_WIND_HAWK:
		return 10;

	case 11:
	case 25:
	case 50:
	case MIG_JOB_ID_ARCH_MAGE:
		return 11;

	case 12:
	case 26:
	case 51:
	case MIG_JOB_ID_MEISTER:
		return 12;

	case 13:
	case 27:
	case 52:
	case MIG_JOB_ID_IMPERIAL_GUARD:
		return 13;

	case 14:
	case 28:
	case 53:
	case MIG_JOB_ID_ABYSS_CHASER:
		return 14;

	case 15:
	case 29:
	case 54:
	case MIG_JOB_ID_INQUISITOR:
		return 15;

	case 16:
	case 30:
	case 55:
	case MIG_JOB_ID_TROUBADOUR:
		return 16;

	case 17:
	case 31:
	case 56:
	case MIG_JOB_ID_TROUVERE:
		return 17;

	case 18:
	case 32:
	case 57:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
		return 18;

	case 19:
	case 33:
	case 58:
	case MIG_JOB_ID_BIOLO:
		return 19;

	case 20:
	case 61:
		return 20;

	case JOB_ID_SUMMONER:
		return JOB_SERIES_ID_SUMMONER;

	}



	return 0;
}

/**
 * 対象の職業がドラム族かを判定する.
 * @return true : ドラム族, false : 人間
 */
function IsDoramJob(jobID) {

	switch (jobID) {
		case JOB_ID_SUMMONER:
		case MIG_JOB_ID_SPIRIT_HANDLER:
			return true;
	}

	return false;
}

/**
 * 対象の職業が４次職かを判定する.
 * @return true: ４次職, false: ４次職ではない
 */
function IsYojiJob(jobID) {
	switch (jobID) {
		case MIG_JOB_ID_DRAGON_KNIGHT:
		case MIG_JOB_ID_SHADOW_CROSS:
		case MIG_JOB_ID_CARDINAL:
		case MIG_JOB_ID_WIND_HAWK:
		case MIG_JOB_ID_ARCH_MAGE:
		case MIG_JOB_ID_MEISTER:
		case MIG_JOB_ID_IMPERIAL_GUARD:
		case MIG_JOB_ID_ABYSS_CHASER:
		case MIG_JOB_ID_INQUISITOR:
		case MIG_JOB_ID_TROUBADOUR:
		case MIG_JOB_ID_TROUVERE:
		case MIG_JOB_ID_ELEMENTAL_MASTER:
		case MIG_JOB_ID_BIOLO:
		case MIG_JOB_ID_SKY_EMPEROR:
		case MIG_JOB_ID_SOUL_ASCETIC:
		case MIG_JOB_ID_SHINKIROU:
		case MIG_JOB_ID_SHIRANUI:
		case MIG_JOB_ID_NIGHT_WATCH:
		case MIG_JOB_ID_HYPER_NOVICE:
		case MIG_JOB_ID_SPIRIT_HANDLER:
			return true;
	}
	return false;
}

/**
 * 対象の職業が二刀流可能かを判定する.
 * @return true : 可能, false : 不可
 */
function IsDualArmsJob(jobID) {

	if (GetHigherJobSeriesID(jobID) == JOB_SERIES_ID_ASSASIN) {
		return true;
	}

	switch (jobID) {
		case JOB_ID_KAGERO:
		case JOB_ID_OBORO:
		case MIG_JOB_ID_SHINKIROU:
		case MIG_JOB_ID_SHIRANUI:
			return true;
	}

	return false;
}

/**
 * 同一系統の職業かを判定する.
 * @param jobIdTarget 対象職業ID
 * @param jobIdCheck 判定する職業ID
 * @return true : 同一, false : 同一でない
 * @remarks 現状、三次職IDを渡して、四次職IDを含めた一致判定をするために用いる
 */
function IsSameJobClass(jobIdTarget, jobIdCheck = n_A_JOB) {

	var jobIdArrayCheck = [];



	// 判定配列に判定対象自身を追加
	jobIdArrayCheck.push(jobIdCheck);



	// 判定対象が四次職の場合は、該当する三次職業も判定対象に追加する
	switch (jobIdCheck) {

	case MIG_JOB_ID_DRAGON_KNIGHT:
		jobIdArrayCheck.push(JOB_ID_RUNEKNIGHT);
		break;

	case MIG_JOB_ID_SHADOW_CROSS:
		jobIdArrayCheck.push(JOB_ID_GILOTINCROSS);
		break;

	case MIG_JOB_ID_CARDINAL:
		jobIdArrayCheck.push(JOB_ID_ARCBISHOP);
		break;

	case MIG_JOB_ID_WIND_HAWK:
		jobIdArrayCheck.push(JOB_ID_RANGER);
		break;

	case MIG_JOB_ID_ARCH_MAGE:
		jobIdArrayCheck.push(JOB_ID_WARLOCK);
		break;

	case MIG_JOB_ID_MEISTER:
		jobIdArrayCheck.push(JOB_ID_MECHANIC);
		break;

	case MIG_JOB_ID_IMPERIAL_GUARD:
		jobIdArrayCheck.push(JOB_ID_ROYALGUARD);
		break;

	case MIG_JOB_ID_ABYSS_CHASER:
		jobIdArrayCheck.push(JOB_ID_SHADOWCHASER);
		break;

	case MIG_JOB_ID_INQUISITOR:
		jobIdArrayCheck.push(JOB_ID_SHURA);
		break;

	case MIG_JOB_ID_TROUBADOUR:
		jobIdArrayCheck.push(JOB_ID_MINSTREL);
		break;

	case MIG_JOB_ID_TROUVERE:
		jobIdArrayCheck.push(JOB_ID_WANDERER);
		break;

	case MIG_JOB_ID_ELEMENTAL_MASTER:
		jobIdArrayCheck.push(JOB_ID_SORCERER);
		break;

	case MIG_JOB_ID_BIOLO:
		jobIdArrayCheck.push(JOB_ID_GENETIC);
		break;

	case MIG_JOB_ID_SKY_EMPEROR:
		jobIdArrayCheck.push(JOB_ID_STAR_EMPEROR);
		break;

	case MIG_JOB_ID_SOUL_ASCETIC:
		jobIdArrayCheck.push(JOB_ID_SOUL_REAPER);
		break;

	case MIG_JOB_ID_SHINKIROU:
		jobIdArrayCheck.push(MIG_JOB_ID_KAGERO);
		break;

	case MIG_JOB_ID_SHIRANUI:
		jobIdArrayCheck.push(MIG_JOB_ID_OBORO);
		break;

	case MIG_JOB_ID_NIGHT_WATCH:
		jobIdArrayCheck.push(MIG_JOB_ID_REBELLION);
		break;

	case MIG_JOB_ID_HYPER_NOVICE:
		jobIdArrayCheck.push(MIG_JOB_ID_SUPERNOVICE_PLUS);
		break;

	case MIG_JOB_ID_SPIRIT_HANDLER:
		jobIdArrayCheck.push(MIG_JOB_ID_SUMMONER);
		break;

	}

	// 配列内にIDがあればOK
	return (jobIdArrayCheck.indexOf(jobIdTarget) >= 0);
}





/**
 * ベースレベルの最小値を取得する.
 * @param jobId ジョブＩＤ
 */
function GetBaseLevelMin(jobId) {

	// 最小レベルの設定
	switch (jobId) {

	case MIG_JOB_ID_DRAGON_KNIGHT:
	case MIG_JOB_ID_SHADOW_CROSS:
	case MIG_JOB_ID_CARDINAL:
	case MIG_JOB_ID_WIND_HAWK:
	case MIG_JOB_ID_ARCH_MAGE:
	case MIG_JOB_ID_MEISTER:
	case MIG_JOB_ID_IMPERIAL_GUARD:
	case MIG_JOB_ID_ABYSS_CHASER:
	case MIG_JOB_ID_INQUISITOR:
	case MIG_JOB_ID_TROUBADOUR:
	case MIG_JOB_ID_TROUVERE:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
	case MIG_JOB_ID_BIOLO:
	case MIG_JOB_ID_SKY_EMPEROR:
	case MIG_JOB_ID_SOUL_ASCETIC:
	case MIG_JOB_ID_SHINKIROU:
	case MIG_JOB_ID_SHIRANUI:
	case MIG_JOB_ID_NIGHT_WATCH:
	case MIG_JOB_ID_HYPER_NOVICE:
	case MIG_JOB_ID_SPIRIT_HANDLER:
		return 200;

	case JOB_ID_RUNEKNIGHT:
	case JOB_ID_GILOTINCROSS:
	case JOB_ID_ARCBISHOP:
	case JOB_ID_RANGER:
	case JOB_ID_WARLOCK:
	case JOB_ID_MECHANIC:
	case JOB_ID_ROYALGUARD:
	case JOB_ID_SHADOWCHASER:
	case JOB_ID_SHURA:
	case JOB_ID_MINSTREL:
	case JOB_ID_WANDERER:
	case JOB_ID_SORCERER:
	case JOB_ID_GENETIC:
		return 90;

	case JOB_ID_KAGERO:
	case JOB_ID_OBORO:
	case JOB_ID_SUPERNOVICE_PLUS:
	case JOB_ID_REBELLION:
	case JOB_ID_STAR_EMPEROR:
	case JOB_ID_SOUL_REAPER:
		return 99;

	case JOB_ID_SUPERNOVICE:
		return 45;

	default:
		return 1;
	}

	return 1;
}

/**
 * ベースレベルの最大値を取得する.
 * @param jobId ジョブＩＤ
 */
function GetBaseLevelMax(jobId) {

	// 最大レベルの設定
	switch (jobId) {

	case MIG_JOB_ID_DRAGON_KNIGHT:
	case MIG_JOB_ID_SHADOW_CROSS:
	case MIG_JOB_ID_CARDINAL:
	case MIG_JOB_ID_WIND_HAWK:
	case MIG_JOB_ID_ARCH_MAGE:
	case MIG_JOB_ID_MEISTER:
	case MIG_JOB_ID_IMPERIAL_GUARD:
	case MIG_JOB_ID_ABYSS_CHASER:
	case MIG_JOB_ID_INQUISITOR:
	case MIG_JOB_ID_TROUBADOUR:
	case MIG_JOB_ID_TROUVERE:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
	case MIG_JOB_ID_BIOLO:
	case MIG_JOB_ID_SKY_EMPEROR:
	case MIG_JOB_ID_SOUL_ASCETIC:
	case MIG_JOB_ID_SHINKIROU:
	case MIG_JOB_ID_SHIRANUI:
	case MIG_JOB_ID_NIGHT_WATCH:
	case MIG_JOB_ID_HYPER_NOVICE:
	case MIG_JOB_ID_SPIRIT_HANDLER:
		return 250;

	case JOB_ID_RUNEKNIGHT:
	case JOB_ID_GILOTINCROSS:
	case JOB_ID_ARCBISHOP:
	case JOB_ID_RANGER:
	case JOB_ID_WARLOCK:
	case JOB_ID_MECHANIC:
	case JOB_ID_ROYALGUARD:
	case JOB_ID_SHADOWCHASER:
	case JOB_ID_SHURA:
	case JOB_ID_MINSTREL:
	case JOB_ID_WANDERER:
	case JOB_ID_SORCERER:
	case JOB_ID_GENETIC:
	case JOB_ID_KAGERO:
	case JOB_ID_OBORO:
	case JOB_ID_REBELLION:
	case JOB_ID_STAR_EMPEROR:
	case JOB_ID_SOUL_REAPER:
	case JOB_ID_SUMMONER:
	case JOB_ID_SUPERNOVICE_PLUS:
		return 200;

	default:
		return 99;
	}

	return 1;
}

/**
 * ジョブレベルの最大値を取得する.
 * @param jobId ジョブＩＤ
 */
function GetJobLevelMax(jobId) {

	switch (jobId) {
	case JOB_ID_NOVICE:
	case JOB_ID_HI_NOVICE:
		return 10;

	case JOB_ID_SWORDMAN:
	case JOB_ID_THIEF:
	case JOB_ID_ACOLYTE:
	case JOB_ID_ARCHER:
	case JOB_ID_MAGICIAN:
	case JOB_ID_MARCHANT:
	case JOB_ID_KNIGHT:
	case JOB_ID_ASSASIN:
	case JOB_ID_PRIEST:
	case JOB_ID_HUNTER:
	case JOB_ID_WIZARD:
	case JOB_ID_BLACKSMITH:
	case JOB_ID_CRUSADER:
	case JOB_ID_ROGUE:
	case JOB_ID_MONK:
	case JOB_ID_BARD:
	case JOB_ID_DANCER:
	case JOB_ID_SAGE:
	case JOB_ID_ALCHEMIST:
	case JOB_ID_HI_SWORDMAN:
	case JOB_ID_HI_THIEF:
	case JOB_ID_HI_ACOLYTE:
	case JOB_ID_HI_ARCHER:
	case JOB_ID_HI_MAGICIAN:
	case JOB_ID_HI_MARCHANT:
	case JOB_ID_TAEGWON:
	case JOB_ID_STARGRADIATOR:
	case JOB_ID_SOULLINKER:
		return 50;

	case JOB_ID_SUMMONER:
		return 60;

	case JOB_ID_RUNEKNIGHT:
	case JOB_ID_GILOTINCROSS:
	case JOB_ID_ARCBISHOP:
	case JOB_ID_RANGER:
	case JOB_ID_WARLOCK:
	case JOB_ID_MECHANIC:
	case JOB_ID_ROYALGUARD:
	case JOB_ID_SHADOWCHASER:
	case JOB_ID_SHURA:
	case JOB_ID_MINSTREL:
	case JOB_ID_WANDERER:
	case JOB_ID_SORCERER:
	case JOB_ID_GENETIC:
	case JOB_ID_KAGERO:
	case JOB_ID_OBORO:
	case JOB_ID_REBELLION:
	case JOB_ID_STAR_EMPEROR:
	case JOB_ID_SOUL_REAPER:
	case JOB_ID_SUPERNOVICE_PLUS:
		return 70;

	case JOB_ID_LORDKNIGHT:
	case JOB_ID_ASSASINCROSS:
	case JOB_ID_HIGHPRIEST:
	case JOB_ID_SNIPER:
	case JOB_ID_HIGHWIZARD:
	case JOB_ID_WHITESMITH:
	case JOB_ID_PALADIN:
	case JOB_ID_CHASER:
	case JOB_ID_CHAMPION:
	case JOB_ID_CROWN:
	case JOB_ID_ZYPSY:
	case JOB_ID_PROFESSOR:
	case JOB_ID_CREATOR:
	case JOB_ID_NINJA:
	case JOB_ID_GUNSLINGER:
		return 70;

	case JOB_ID_SUPERNOVICE:
		return 99;

	case MIG_JOB_ID_DRAGON_KNIGHT:
	case MIG_JOB_ID_SHADOW_CROSS:
	case MIG_JOB_ID_CARDINAL:
	case MIG_JOB_ID_WIND_HAWK:
	case MIG_JOB_ID_ARCH_MAGE:
	case MIG_JOB_ID_MEISTER:
	case MIG_JOB_ID_IMPERIAL_GUARD:
	case MIG_JOB_ID_ABYSS_CHASER:
	case MIG_JOB_ID_INQUISITOR:
	case MIG_JOB_ID_TROUBADOUR:
	case MIG_JOB_ID_TROUVERE:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
	case MIG_JOB_ID_BIOLO:
	case MIG_JOB_ID_SKY_EMPEROR:
	case MIG_JOB_ID_SOUL_ASCETIC:
	case MIG_JOB_ID_SHINKIROU:
	case MIG_JOB_ID_SHIRANUI:
	case MIG_JOB_ID_NIGHT_WATCH:
	case MIG_JOB_ID_HYPER_NOVICE:
	case MIG_JOB_ID_SPIRIT_HANDLER:
		return 50;

	}

	return 1;
}



/**
 * ステータスの最大値を取得する.
 * @param jobId ジョブＩＤ
 * @param bChild 養子フラグ
 */
function GetStatusMax(jobId, bChild) {

	if (bChild) {
		switch (jobId) {

		case JOB_ID_RUNEKNIGHT:
		case JOB_ID_GILOTINCROSS:
		case JOB_ID_ARCBISHOP:
		case JOB_ID_RANGER:
		case JOB_ID_WARLOCK:
		case JOB_ID_MECHANIC:
		case JOB_ID_ROYALGUARD:
		case JOB_ID_SHADOWCHASER:
		case JOB_ID_SHURA:
		case JOB_ID_MINSTREL:
		case JOB_ID_WANDERER:
		case JOB_ID_SORCERER:
		case JOB_ID_GENETIC:
		case JOB_ID_KAGERO:
		case JOB_ID_OBORO:
		case JOB_ID_REBELLION:
		case JOB_ID_STAR_EMPEROR:
		case JOB_ID_SOUL_REAPER:
		case JOB_ID_SUPERNOVICE_PLUS:
		case JOB_ID_SUMMONER:

		case MIG_JOB_ID_DRAGON_KNIGHT:
		case MIG_JOB_ID_SHADOW_CROSS:
		case MIG_JOB_ID_CARDINAL:
		case MIG_JOB_ID_WIND_HAWK:
		case MIG_JOB_ID_ARCH_MAGE:
		case MIG_JOB_ID_MEISTER:
		case MIG_JOB_ID_IMPERIAL_GUARD:
		case MIG_JOB_ID_ABYSS_CHASER:
		case MIG_JOB_ID_INQUISITOR:
		case MIG_JOB_ID_TROUBADOUR:
		case MIG_JOB_ID_TROUVERE:
		case MIG_JOB_ID_ELEMENTAL_MASTER:
		case MIG_JOB_ID_BIOLO:
		case MIG_JOB_ID_SKY_EMPEROR:
		case MIG_JOB_ID_SOUL_ASCETIC:
		case MIG_JOB_ID_SHINKIROU:
		case MIG_JOB_ID_SHIRANUI:
		case MIG_JOB_ID_NIGHT_WATCH:
		case MIG_JOB_ID_HYPER_NOVICE:
		case MIG_JOB_ID_SPIRIT_HANDLER:
			return 117;

		case JOB_ID_TAEGWON:
		case JOB_ID_STARGRADIATOR:
		case JOB_ID_SOULLINKER:
		case JOB_ID_NINJA:
		case JOB_ID_GUNSLINGER:
			return 99;

		}

		return 80;
	}


	switch (jobId) {

	// 全体の最大値用
	case JOB_ID_ANY:

	case JOB_ID_RUNEKNIGHT:
	case JOB_ID_GILOTINCROSS:
	case JOB_ID_ARCBISHOP:
	case JOB_ID_RANGER:
	case JOB_ID_WARLOCK:
	case JOB_ID_MECHANIC:
	case JOB_ID_ROYALGUARD:
	case JOB_ID_SHADOWCHASER:
	case JOB_ID_SHURA:
	case JOB_ID_MINSTREL:
	case JOB_ID_WANDERER:
	case JOB_ID_SORCERER:
	case JOB_ID_GENETIC:
	case JOB_ID_KAGERO:
	case JOB_ID_OBORO:
	case JOB_ID_REBELLION:
	case JOB_ID_STAR_EMPEROR:
	case JOB_ID_SOUL_REAPER:
	case JOB_ID_SUPERNOVICE_PLUS:
	case JOB_ID_SUMMONER:

	case MIG_JOB_ID_DRAGON_KNIGHT:
	case MIG_JOB_ID_SHADOW_CROSS:
	case MIG_JOB_ID_CARDINAL:
	case MIG_JOB_ID_WIND_HAWK:
	case MIG_JOB_ID_ARCH_MAGE:
	case MIG_JOB_ID_MEISTER:
	case MIG_JOB_ID_IMPERIAL_GUARD:
	case MIG_JOB_ID_ABYSS_CHASER:
	case MIG_JOB_ID_INQUISITOR:
	case MIG_JOB_ID_TROUBADOUR:
	case MIG_JOB_ID_TROUVERE:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
	case MIG_JOB_ID_BIOLO:
	case MIG_JOB_ID_SKY_EMPEROR:
	case MIG_JOB_ID_SOUL_ASCETIC:
	case MIG_JOB_ID_SHINKIROU:
	case MIG_JOB_ID_SHIRANUI:
	case MIG_JOB_ID_NIGHT_WATCH:
	case MIG_JOB_ID_HYPER_NOVICE:
	case MIG_JOB_ID_SPIRIT_HANDLER:

		return 130;

	}

	return 99;
}




/**
 * 転生フラグを取得する.
 * @param jobId ジョブＩＤ
 */
function IsReincarnatedJob(jobId) {

	switch (jobId) {

	case JOB_ID_HI_NOVICE:
	case JOB_ID_HI_SWORDMAN:
	case JOB_ID_HI_THIEF:
	case JOB_ID_HI_ACOLYTE:
	case JOB_ID_HI_ARCHER:
	case JOB_ID_HI_MAGICIAN:
	case JOB_ID_HI_MARCHANT:

	case JOB_ID_LORDKNIGHT:
	case JOB_ID_ASSASINCROSS:
	case JOB_ID_HIGHPRIEST:
	case JOB_ID_SNIPER:
	case JOB_ID_HIGHWIZARD:
	case JOB_ID_WHITESMITH:
	case JOB_ID_PALADIN:
	case JOB_ID_CHASER:
	case JOB_ID_CHAMPION:
	case JOB_ID_CROWN:
	case JOB_ID_ZYPSY:
	case JOB_ID_PROFESSOR:
	case JOB_ID_CREATOR:

	case JOB_ID_RUNEKNIGHT:
	case JOB_ID_GILOTINCROSS:
	case JOB_ID_ARCBISHOP:
	case JOB_ID_RANGER:
	case JOB_ID_WARLOCK:
	case JOB_ID_MECHANIC:
	case JOB_ID_ROYALGUARD:
	case JOB_ID_SHADOWCHASER:
	case JOB_ID_SHURA:
	case JOB_ID_MINSTREL:
	case JOB_ID_WANDERER:
	case JOB_ID_SORCERER:
	case JOB_ID_GENETIC:

	case MIG_JOB_ID_DRAGON_KNIGHT:
	case MIG_JOB_ID_SHADOW_CROSS:
	case MIG_JOB_ID_CARDINAL:
	case MIG_JOB_ID_WIND_HAWK:
	case MIG_JOB_ID_ARCH_MAGE:
	case MIG_JOB_ID_MEISTER:
	case MIG_JOB_ID_IMPERIAL_GUARD:
	case MIG_JOB_ID_ABYSS_CHASER:
	case MIG_JOB_ID_INQUISITOR:
	case MIG_JOB_ID_TROUBADOUR:
	case MIG_JOB_ID_TROUVERE:
	case MIG_JOB_ID_ELEMENTAL_MASTER:
	case MIG_JOB_ID_BIOLO:

		return true;

	}

	return false;
}



/**
 * ハイスピードポーションが使用できる職業かを判定する.
 * @param jobId ジョブＩＤ
 */
function IsUsableHSPJob(jobId) {

	// 使用できない職業
	switch (jobId) {
	case JOB_ID_ACOLYTE:
	case JOB_ID_HI_ACOLYTE:
		return false;
	}

	// 使用できない職業系統
	switch (GetHigherJobSeriesID(jobId)) {
	case JOB_SERIES_ID_PRIEST:
	case JOB_SERIES_ID_BARD:
	case JOB_SERIES_ID_DANCER:
		return false;
	}

	return true;
}

/**
 * バーサークポーションが使用できる職業かを判定する.
 * @param jobId ジョブＩＤ
 */
function IsUsableBSPJob(jobId) {

	// 使用できる下位職業系統
	switch (GetLowerJobSeriesID(jobId)) {
	case JOB_SERIES_ID_SWORDMAN:
	case JOB_SERIES_ID_MERCHANT:
	case JOB_SERIES_ID_TAEGKUON:
	case JOB_SERIES_ID_GUNSLINGER:
		return true;
	}

	// 使用できる上位職業系統
	switch (GetHigherJobSeriesID(jobId)) {
	case JOB_SERIES_ID_WIZARD:
	case JOB_SERIES_ID_ROGUE:
		return true;
	}

	// 使用できる職業
	switch (jobId) {
	case JOB_ID_MAGICIAN:
	case JOB_ID_HI_MAGICIAN:
		return true;
	}

	return false;
}






/**
 * ジョブボーナスを取得する.
 * @param jobId ジョブＩＤ
 * @param jobLv ジョブレベル
 * @return パラメータごとのジョブボーナス配列
 */
function GetJobBonus(jobId, jobLv) {
	return g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, jobId).GetJobBonus(jobLv);
}




/**
 * ＨＰの基礎値を取得する.
 * @param jobId ジョブＩＤ
 * @param baseLv ベースレベル
 * @param bChild 養子フラグ
 */
function GetHPBase(jobId, baseLv, bChild) {

	// 基礎値の取得
	var lvOffset = baseLv - Math.max(1, GetBaseLevelMin(jobId));
	var maxhp = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, jobId).GetHPBase(baseLv);



	// 各種補正の適用

	// 転生ボーナス
	if ((bChild == false) && (IsReincarnatedJob(jobId) == true)) {
		maxhp = Math.floor(maxhp * 125 /100);
	}

	// 養子ペナルティ
	if (bChild == true) {
		maxhp = Math.floor(maxhp * 70 / 100);
	}

	return maxhp;
}



/**
 * ＳＰの基礎値を取得する.
 * @param jobId ジョブＩＤ
 * @param baseLv ベースレベル
 * @param bChild 養子フラグ
 */
function GetSPBase(jobId, baseLv, bChild) {

	// 基礎値の取得
	var lvOffset = baseLv - Math.max(1, GetBaseLevelMin(jobId));
	var maxsp = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, jobId).GetSPBase(baseLv);



	// 各種補正の適用

	// 転生ボーナス
	if ((bChild == false) && (IsReincarnatedJob(jobId) == true)) {
		maxsp = Math.floor(maxsp * 125 /100);
	}

	// 養子ペナルティ
	if (bChild == true) {
		maxsp = Math.floor(maxsp * 70 / 100);
	}

	return maxsp;
}





//================================================================================================
//================================================================================================
//====
//==== 経験値テーブル定義
//====
//================================================================================================
//================================================================================================

CGlobalConstManager.DefineEnum(
	"BaseExpTableId",
	[
		"BASE_EXP_TABLE_ID_NORMAL",
		"BASE_EXP_TABLE_ID_REINCANATED",
	]
);

CGlobalConstManager.DefineEnum(
	"JobExpTableId",
	[
		"JOB_EXP_TABLE_ID_NOVICE",
		"JOB_EXP_TABLE_ID_NOVICE_REINCANATED",
		"JOB_EXP_TABLE_ID_1ST",
		"JOB_EXP_TABLE_ID_1ST_REINCANATED",
		"JOB_EXP_TABLE_ID_2ND",
		"JOB_EXP_TABLE_ID_2ND_REINCANATED",
		"JOB_EXP_TABLE_ID_EXTRA_1ST",
		"JOB_EXP_TABLE_ID_STAR_GRADIATOR",
		"JOB_EXP_TABLE_ID_3RD",
		"JOB_EXP_TABLE_ID_SUPER_NOVICE",
		"JOB_EXP_TABLE_ID_SUMMONER",
		"JOB_EXP_TABLE_ID_4TH",
	]
);



/**
 * ベース経験値テーブルを取得する.
 * @param tableId 経験値テーブルID
 * @return 経験値テーブル（配列）
 */
function GetBaseExpTable(tableId) {

	var expTable = null;



	// テーブルIDで定義を切り替え
	switch (tableId) {

	// 未転生
	case BASE_EXP_TABLE_ID_NORMAL:
		expTable = [
			// 1 - 10
			0
			, 1
			, 3
			, 5
			, 8
			, 11
			, 14
			, 17
			, 20
			, 25
			// 11 - 20
			, 32
			, 38
			, 44
			, 52
			, 60
			, 76
			, 86
			, 97
			, 109
			, 122
			// 21 - 30
			, 148
			, 165
			, 184
			, 205
			, 228
			, 277
			, 310
			, 347
			, 388
			, 434
			// 31 - 40
			, 555
			, 666
			, 799
			, 958
			, 1149
			, 1424
			, 1637
			, 1882
			, 2164
			, 2488
			// 41 - 50
			, 2985
			, 3283
			, 3611
			, 3972
			, 4369
			, 5242
			, 5766
			, 6342
			, 6976
			, 7673
			// 51 - 60
			, 9207
			, 10127
			, 11139
			, 12252
			, 13477
			, 16172
			, 17789
			, 19567
			, 21523
			, 23675
			// 61 - 70
			, 28410
			, 31251
			, 34376
			, 37813
			, 41594
			, 49912
			, 54903
			, 60393
			, 66432
			, 73075
			// 71 -80
			, 87690
			, 96459
			, 106104
			, 116714
			, 128385
			, 154062
			, 169468
			, 186414
			, 205055
			, 225560
			// 81 - 90
			, 270672
			, 297739
			, 327512
			, 360263
			, 396289
			, 475546
			, 523100
			, 575410
			, 632951
			, 696246
			// 91 - 99
			, 835495
			, 919044
			, 1010948
			, 1112042
			, 1223246
			, 1467895
			, 1614684
			, 1776152
			, 1953767
			, 0
		];
		break;

	// 転生
	case BASE_EXP_TABLE_ID_REINCANATED:
		expTable = [
			// 1 - 10
			0
			, 2
			, 4
			, 6
			, 9
			, 12
			, 15
			, 18
			, 21
			, 27
			// 11 - 20
			, 40
			, 48
			, 61
			, 73
			, 87
			, 103
			, 121
			, 140
			, 157
			, 177
			// 21 - 30
			, 214
			, 239
			, 267
			, 298
			, 332
			, 389
			, 430
			, 475
			, 524
			, 577
			// 31 - 40
			, 750
			, 900
			, 1080
			, 1296
			, 1555
			, 1943
			, 2234
			, 2569
			, 2954
			, 3397
			// 41 - 50
			, 4076
			, 4483
			, 4931
			, 5424
			, 5966
			, 7159
			, 7874
			, 8661
			, 9527
			, 10479
			// 51 - 60
			, 12574
			, 13831
			, 15214
			, 16735
			, 18408
			, 22089
			, 24297
			, 26726
			, 29398
			, 32337
			// 61 - 70
			, 38804
			, 42684
			, 46952
			, 51647
			, 56811
			, 68173
			, 74990
			, 82489
			, 90737
			, 99810
			// 71 - 80
			, 119772
			, 131749
			, 144923
			, 159415
			, 175356
			, 210427
			, 231469
			, 254615
			, 280076
			, 308083
			// 81 - 90
			, 369699
			, 406668
			, 447334
			, 492067
			, 541273
			, 649527
			, 714479
			, 785926
			, 864518
			, 950969
			// 91 - 100
			, 1141162
			, 1255278
			, 1380805
			, 1518885
			, 1670773
			, 2004927
			, 2205419
			, 2425960
			, 2668556
			, 2935411
			// 101 - 110
			, 3493139
			, 3807521
			, 4150197
			, 4523714
			, 4930848
			, 5818400
			, 6283872
			, 6786581
			, 7329507
			, 7915867
			// 111 - 120
			, 9261564
			, 9909873
			, 10603564
			, 11345813
			, 12140019
			, 14082422
			, 14927367
			, 15823009
			, 16772389
			, 17778732
			// 121 - 130
			, 20445541
			, 21467818
			, 22541208
			, 23668268
			, 24851681
			, 28330916
			, 29747461
			, 31234834
			, 32796575
			, 34436403
			// 131 - 140
			, 38913135
			, 40858791
			, 42901730
			, 45046816
			, 47299156
			, 52975054
			, 55623806
			, 58404996
			, 61325245
			, 64391507
			// 141 - 150
			, 71474572
			, 75048300
			, 78800715
			, 82740750
			, 86877787
			, 95565565
			, 100343843
			, 105361035
			, 110629086
			, 116160540
			// 151 - 160
			, 126614988
			, 131679587
			, 136946770
			, 142424640
			, 148121625
			, 161452571
			, 167910673
			, 174627099
			, 181612182
			, 188876669
			// 161 - 165
			, 205875569
			, 214110591
			, 222675014
			, 231582014
			, 240845294

			// 以下、超越パッチで減少
			// 166 - 170
			, 289014352
			, 346817222
			, 416180666
			, 499416799
			, 599300158

			// 171 - 180
			, 1198600316
			, 1438320379
			, 1725984454
			, 2071181344
			, 3106772016
			, 3728126419
			, 4473751702
			, 5368502042
			, 6442202450
			, 9663303675

			// 181 - 190
			, 19326607350
			, 21259268085
			, 23385194893
			, 25723714382
			, 28296085820
			, 31125694402
			, 34238263842
			, 37662090226
			, 41428299248
			, 45571129172

			// 191 - 200
			, 50128242089
			, 55141066297
			, 60655172926
			, 66720690218
			, 73392759239
			, 80732035162
			, 88805238678
			, 97685762545
			, 107454338799
			, 118199772678

			// 201 - 210
			, 130019749945
			, 143021724939
			, 157323897432
			, 173056287175
			, 190361915892
			, 209398107481
			, 230337918229
			, 253371710051
			, 278708881056
			, 306579769161

			// 211 - 220
			, 337237746077
			, 370961520684
			, 408057672752
			, 448863440027
			, 493749784029
			, 543124762431
			, 597437238674
			, 657180962541
			, 722899058795
			, 795188964674

			// 221 - 230
			, 803140854320
			, 811172262863
			, 819283985491
			, 827476825345
			, 835751593598
			, 844109109533
			, 852550200628
			, 861075702634
			, 869686459660
			, 878383324256

			// 231 - 240
			, 904734823983
			, 931876868702
			, 959833174763
			, 988628170005
			, 1018287015105
			, 1048835625558
			, 1080300694324
			, 1112709715153
			, 1146091006607
			, 1180473736805
			
			// 241 - 250
			, 1215887948909
			, 1252364587376
			, 1289935524997
			, 1328633590746
			, 1368492598468
			, 1409547376422
			, 1451833797714
			, 1495388811645
			, 1540250475994
			, 1586457990273
						


			, 0
		];
		break;
	}



	return expTable;
}



/**
 * ジョブ経験値テーブルを取得する.
 * @param tableId 経験値テーブルID
 * @return 経験値テーブル（配列）
 */
function GetJobExpTable(tableId) {

	var expTable = null;



	// テーブルIDで定義を切り替え
	switch (tableId) {

	// ノービス
	case JOB_EXP_TABLE_ID_NOVICE:
		expTable = [
			// 1 - 10
			0
			,2
			,3
			,4
			,5
			,10
			,15
			,20
			,25
			,30
			,0
		];
		break;

	// 転生ノービス
	case JOB_EXP_TABLE_ID_NOVICE_REINCANATED:
		expTable = [
			// 1 - 10
			0
			,4
			,6
			,8
			,10
			,20
			,30
			,40
			,50
			,60
			,0
		];
		break;

	// 一次職
	case JOB_EXP_TABLE_ID_1ST:
		expTable = [
			// 1 - 10
			0
			,3
			,4
			,5
			,7
			,11
			,14
			,17
			,20
			,23
			// 11 - 20
			,38
			,44
			,52
			,62
			,74
			,112
			,136
			,163
			,192
			,224
			// 21 - 30
			,300
			,333
			,367
			,404
			,442
			,632
			,674
			,720
			,775
			,834
			// 31 - 40
			,1309
			,1382
			,1469
			,1579
			,1703
			,3128
			,3302
			,3526
			,3821
			,4166
			// 41 - 50
			,8441
			,8911
			,9506
			,10314
			,11247
			,26209
			,27640
			,29569
			,32246
			,35421
			// 51 - 60
			,0
		];
		break;

	// 転生一次職
	case JOB_EXP_TABLE_ID_1ST_REINCANATED:
		expTable = [
			// 1 - 10
			0
			,6
			,7
			,9
			,12
			,20
			,24
			,29
			,35
			,42
			// 11 - 20
			,69
			,85
			,104
			,126
			,151
			,207
			,245
			,288
			,336
			,389
			// 21 - 30
			,501
			,560
			,625
			,695
			,771
			,1051
			,1144
			,1254
			,1378
			,1519
			// 31 - 40
			,2219
			,2410
			,2651
			,2927
			,3253
			,5353
			,5854
			,6530
			,7311
			,8267
			// 41 - 50
			,14567
			,16153
			,18369
			,20900
			,24061
			,46111
			,52028
			,60701
			,70476
			,83007
			// 51 - 60
			,0
		];
		break;

	// 二次職
	case JOB_EXP_TABLE_ID_2ND:
		expTable = [
			// 1 - 10
			0
			,10
			,14
			,20
			,28
			,54
			,72
			,91
			,111
			,132
			// 11 - 20
			,245
			,307
			,372
			,445
			,537
			,865
			,1022
			,1188
			,1452
			,1731
			// 21 - 30
			,2223
			,2564
			,2917
			,3294
			,3687
			,4572
			,4995
			,5448
			,5945
			,6472
			// 31 - 40
			,8330
			,8923
			,9582
			,10333
			,11150
			,15609
			,16591
			,17738
			,19107
			,20641
			// 41 - 50
			,32680
			,33789
			,36249
			,39310
			,42834
			,78951
			,83919
			,90331
			,98548
			,108209
			// 51 - 60
			,0
		];
		break;

	// 転生二次職
	case JOB_EXP_TABLE_ID_2ND_REINCANATED:
		expTable = [
			// 1 - 10
			0
			,20
			,30
			,44
			,62
			,112
			,142
			,177
			,217
			,262
			// 11 - 20
			,499
			,622
			,775
			,961
			,1180
			,1634
			,1878
			,2172
			,2516
			,2910
			// 21 - 30
			,3454
			,3867
			,4299
			,4758
			,5236
			,5997
			,6504
			,7040
			,7614
			,8217
			// 31 - 40
			,9434
			,10087
			,10790
			,11553
			,12366
			,14556
			,15468
			,16479
			,17599
			,18818
			// 41 - 50
			,23198
			,24636
			,26293
			,28169
			,30264
			,39900
			,42530
			,45695
			,49341
			,53522
			// 51 - 60
			,76648
			,82274
			,89345
			,97572
			,107244
			,167371
			,181337
			,199597
			,220863
			,246423
			// 61 - 70
			,414778
			,454367
			,507985
			,570020
			,646084
			,1151149
			,1277719
			,1454795
			,1657124
			,1909959
			// 71 - 80
			,0
		];
		break;

	// 拡張一次職
	case JOB_EXP_TABLE_ID_EXTRA_1ST:
		expTable = [
			// 1 - 10
			0
			,7
			,9
			,12
			,16
			,30
			,36
			,44
			,54
			,66
			// 11 - 20
			,122
			,158
			,199
			,245
			,296
			,460
			,579
			,708
			,847
			,996
			// 21 - 30
			,1242
			,1396
			,1555
			,1726
			,1902
			,2295
			,2479
			,2671
			,2882
			,3101
			// 31 - 40
			,3769
			,4004
			,4255
			,4539
			,4839
			,6041
			,6372
			,6734
			,7156
			,7609
			// 41 - 50
			,9892
			,10410
			,10993
			,11690
			,12452
			,17018
			,17922
			,18968
			,20242
			,21658
			// 51 - 60
			,31246
			,32992
			,35068
			,37623
			,40508
			,61601
			,65297
			,69804
			,75365
			,81737
			// 61 - 70
			,130250
			,138731
			,149321
			,162336
			,177460
			,293891
			,314836
			,341602
			,374189
			,412597
			// 71 - 80
			,0
		];
		break;

	// 拳聖
	case JOB_EXP_TABLE_ID_STAR_GRADIATOR:
		expTable = [
			// 1 - 10
			0
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			// 11 - 20
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,2743
			,5486
			// 21 - 30
			,6486
			,6919
			,7385
			,7901
			,8450
			,10650
			,11280
			,11991
			,12812
			,13714
			// 31 - 40
			,18994
			,20116
			,21458
			,23064
			,24890
			,38618
			,41097
			,44229
			,48047
			,52518
			// 41 - 50
			,92329
			,98123
			,107016
			,117899
			,130993
			,250426
			,271482
			,300500
			,335489
			,378440
			// 51 - 60
			,0
		];
		break;

	// 三次職
	case JOB_EXP_TABLE_ID_3RD:
		expTable = [
			// 1 - 10
			0
			,2000
			,6000
			,12000
			,20000
			,36000
			,44888
			,54664
			,65240
			,76704
			// 11 - 20
			,105504
			,118662
			,133514
			,149806
			,167792
			,225392
			,246978
			,272164
			,300230
			,331896
			// 21 - 30
			,458616
			,498730
			,547292
			,602190
			,665536
			,969664
			,1054733
			,1161525
			,1283523
			,1427244
			// 31 - 40
			,2217976
			,2422522
			,2687893
			,2992800
			,3358532
			,5572581
			,6122817
			,6857557
			,7702999
			,8732945
			// 41 - 50
			,15375092
			,17008869
			,19246477
			,21816192
			,24989738
			,46244608
			,51543641
			,58968161
			,67455424
			,78068174
			// 51 - 60
			,109950479
			,124105707
			,141803413
			,161095234
			,183929533
			,239723566
			,269532119
			,306314926
			,345887434
			,392434196

			// 以下、超越パッチで減少
			// 61 - 70
			, 875621083
			, 1313431624
			, 2495520085
			, 5739696195
			, 15497179726
			, 22780854197
			, 33487855669
			, 49227147833
			, 72363907314
			, 106374943751

			,0
		];
		break;

	// スーパーノービス
	case JOB_EXP_TABLE_ID_SUPER_NOVICE:
		expTable = [
			// 1 - 10
			0
			,3
			,4
			,5
			,6
			,11
			,13
			,15
			,18
			,21
			// 11 - 20
			,41
			,47
			,54
			,62
			,71
			,111
			,125
			,147
			,177
			,215
			// 21 - 30
			,275
			,319
			,369
			,422
			,481
			,601
			,672
			,755
			,844
			,945
			// 31 - 40
			,1245
			,1376
			,1537
			,1713
			,1919
			,2819
			,3115
			,3501
			,3932
			,4453
			// 41 - 50
			,7603
			,8439
			,9590
			,10898
			,12521
			,25121
			,28004
			,32147
			,36920
			,42953
			// 51 - 60
			,86000
			,87250
			,88500
			,89750
			,91000
			,92250
			,93500
			,94750
			,96000
			,97250
			// 61 - 70
			,98500
			,99750
			,101000
			,102250
			,103500
			,104750
			,106000
			,107250
			,108500
			,109750
			// 71 - 80
			,111000
			,112250
			,113500
			,114750
			,116000
			,117250
			,118500
			,119750
			,121000
			,122250
			// 81 - 90
			,123500
			,124750
			,126000
			,127250
			,128500
			,129750
			,131000
			,132250
			,133500
			,134750
			// 91 - 100
			,136000
			,137250
			,138500
			,139750
			,141000
			,142250
			,143500
			,144750
			,146000
			,0
		];
		break;

	// サモナー
	case JOB_EXP_TABLE_ID_SUMMONER:
		expTable = [
			// 1 - 10
			0
			,110
			,189
			,324
			,558
			,958
			,1647
			,2829
			,4861
			,8352
			// 11 - 20
			,14350
			,24653
			,30692
			,38212
			,47574
			,59230
			,73742
			,91809
			,114302
			,142306
			// 21 - 30
			,177171
			,220578
			,274620
			,341902
			,425668
			,529957
			,659796
			,821446
			,1022701
			,1273262
			// 31 - 40
			,1585212
			,1973589
			,2457118
			,3452250
			,4850412
			,6814829
			,9574835
			,13452643
			,18900964
			,26555854
			// 41 - 50
			,37310975
			,52421920
			,73652799
			,103482182
			,145392466
			,204276415
			,287008363
			,403246751
			,566561685
			,796019167

			// 以下、超越パッチで減少
			// 51 - 60
			, 875621083
			, 1313431624
			, 2495520085
			, 5739696195
			, 15497179726
			, 22780854197
			, 33487855669
			, 49227147833
			, 72363907314
			, 106374943751

			,0
		];
		break;


	// 四次職
	case JOB_EXP_TABLE_ID_4TH:
		expTable = [
			// 1 - 10
			0
			, 30896977
			, 40166070
			, 52215891
			, 67880658
			, 88244856
			, 114718313
			, 149133806
			, 193873948
			, 252036133
			// 11 - 20
			, 327646973
			, 425941064
			, 553723384
			, 719840399
			, 935792518
			, 1216530274
			, 1581489356
			, 2055936163
			, 2672717011
			, 3474532115
			// 21 - 30
			, 4516891749
			, 5871959274
			, 7633547056
			, 9923611173
			, 12900694525
			, 16770902882
			, 21802173747
			, 28342825871
			, 36845673632
			, 47899375721
			// 31 - 40
			, 62269188438
			, 80949944969
			, 105234928460
			, 115758421306
			, 127334263437
			, 140067689780
			, 154074458758
			, 169481904634
			, 186430095098
			, 205073104607
			// 41 - 45
			, 391632611143
			, 1167460549300
			, 1867936878880
			, 2988699006207
			, 4781918409932
			, 4829737594031
			, 4878034969972
			, 4926815319671
			, 4976083472868
			, 5025844307597

			,0
		];
		break;

	}



	return expTable;
}







g_unconfirmedHPSPArray = null;

function GetUnconfirmedHPSPArray() {

	if (!g_unconfirmedHPSPArray) {

		g_unconfirmedHPSPArray = new Array();
		g_unconfirmedHPSPArray[JOB_ID_RUNEKNIGHT] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_GILOTINCROSS] = [
			[186,187,188,189,191,193,195,196,197,198],
			[186,187,188,189,191,193,195,196,197,198]
		];
		g_unconfirmedHPSPArray[JOB_ID_ARCBISHOP] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_RANGER] = [
			[186,187,189,190,191,192,193,194,195,196,197],
			[186,187,189,190,191,192,193,194,195,196,197]
		];
		g_unconfirmedHPSPArray[JOB_ID_WARLOCK] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_MECHANIC] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_ROYALGUARD] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_SHADOWCHASER] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_SHURA] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_MINSTREL] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_WANDERER] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_SORCERER] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_GENETIC] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_KAGERO] = [
			[183, 184, 186,187,188,189,190,191,192,198,199],
			[183, 184, 186,187,188,189,190,191,192,198,199]
		];
		g_unconfirmedHPSPArray[JOB_ID_OBORO] = g_unconfirmedHPSPArray[JOB_ID_KAGERO];

		g_unconfirmedHPSPArray[JOB_ID_REBELLION] = [
			[],
			[]
		];
		g_unconfirmedHPSPArray[JOB_ID_SUMMONER] = [
			[190,191,192,193,195,196,197,198],
			[190,191,192,193,195,196,197,198]
		];
		g_unconfirmedHPSPArray[JOB_ID_SUPERNOVICE_PLUS] = [
			[],
			[]
		];

		g_unconfirmedHPSPArray[JOB_ID_STAR_EMPEROR] = [
			[148, 152, 187,188,190,192,193,194,195,196,197,198,199],
			[148, 152, 187,188,190,192,193,194,195,196,197,198,199]
		];

		g_unconfirmedHPSPArray[JOB_ID_SOUL_REAPER] = [
			[196,198],
			[196,198]
		];



		// 四次
		g_unconfirmedHPSPArray[MIG_JOB_ID_DRAGON_KNIGHT] = [
			[225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_SHADOW_CROSS] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_CARDINAL] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_WIND_HAWK] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_ARCH_MAGE] = [
			[],
			[],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_MEISTER] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_IMPERIAL_GUARD] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_ABYSS_CHASER] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_INQUISITOR] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_TROUBADOUR] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_TROUVERE] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_ELEMENTAL_MASTER] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_BIOLO] = [
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
			[221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240],
		];

		g_unconfirmedHPSPArray[MIG_JOB_ID_SKY_EMPEROR] = [
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];

		g_unconfirmedHPSPArray[MIG_JOB_ID_SOUL_ASCETIC] = [
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];

		g_unconfirmedHPSPArray[MIG_JOB_ID_SHINKIROU] = [
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];

		g_unconfirmedHPSPArray[MIG_JOB_ID_SHIRANUI] = [
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];

		g_unconfirmedHPSPArray[MIG_JOB_ID_NIGHT_WATCH] = [
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_HYPER_NOVICE] = [
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];
		g_unconfirmedHPSPArray[MIG_JOB_ID_SPIRIT_HANDLER] = [
			[237,238,239,240,241,242,243,244,245,246,247,248,249,250],
			[237,238,239,240,241,242,243,244,245,246,247,248,249,250],
		];


	}

	return g_unconfirmedHPSPArray;
}






























// TODO: 本来はここにあるべきではない

/**
 * 指定のアイテムが、職業制限に適合しているかを検査する.
 * @param itemId アイテムＩＤ
 * @param jobId 検査対象の職業ＩＤ
 * @return 適合検査結果
 */
function IsMatchJobRestrict(itemId, jobId) {

	var idx = 0;
	var eqpflg = ItemObjNew[itemId][ITEM_DATA_INDEX_EQPFLG];
	var jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, jobId);

	// 三次職以上限定の場合
	// TODO: この仕様どうにかしたい
	if (eqpflg >= 2000) {
		switch (jobId) {
		case JOB_ID_RUNEKNIGHT:
		case JOB_ID_GILOTINCROSS:
		case JOB_ID_ARCBISHOP:
		case JOB_ID_RANGER:
		case JOB_ID_WARLOCK:
		case JOB_ID_MECHANIC:
		case JOB_ID_ROYALGUARD:
		case JOB_ID_SHADOWCHASER:
		case JOB_ID_SHURA:
		case JOB_ID_MINSTREL:
		case JOB_ID_WANDERER:
		case JOB_ID_SORCERER:
		case JOB_ID_GENETIC:

		case MIG_JOB_ID_DRAGON_KNIGHT:
		case MIG_JOB_ID_SHADOW_CROSS:
		case MIG_JOB_ID_CARDINAL:
		case MIG_JOB_ID_WIND_HAWK:
		case MIG_JOB_ID_ARCH_MAGE:
		case MIG_JOB_ID_MEISTER:
		case MIG_JOB_ID_IMPERIAL_GUARD:
		case MIG_JOB_ID_ABYSS_CHASER:
		case MIG_JOB_ID_INQUISITOR:
		case MIG_JOB_ID_TROUBADOUR:
		case MIG_JOB_ID_TROUVERE:
		case MIG_JOB_ID_ELEMENTAL_MASTER:
		case MIG_JOB_ID_BIOLO:
			eqpflg -= 2000;
			break;

		default:
			return false;
		}
	}

	// 転生限定の場合
	// TODO: この仕様どうにかしたい
	if(eqpflg >= 1000){
		if (IsReincarnatedJob(jobId)) {
			eqpflg -= 1000;
		}
		else {
			return false;
		}
	}

	// レベル的に装備不可能な場合
	if (ItemObjNew[itemId][ITEM_DATA_INDEX_EQPLV] > GetBaseLevelMax(jobId)) {
		return false;
	}

	// 攻城戦TE専用装備の場合
	if(1824 <= ItemObjNew[itemId][ITEM_DATA_INDEX_ID] && ItemObjNew[itemId][ITEM_DATA_INDEX_ID] <= 1863) {
		if (GetBaseLevelMax(jobId) >= 100) {
			return false;
		}
	}

	// 武器の場合、ASPD定義がなければ装備不可
	if (ItemObjNew[itemId][ITEM_DATA_INDEX_KIND] <= ITEM_KIND_GRENADEGUN) {

		if (jobData.GetWeaponAspd(ItemObjNew[itemId][ITEM_DATA_INDEX_KIND]) === undefined) {
			return false;
		}
	}

	// 装備可能フラグ配列を検査
	if (jobData.IsEquipableEquipFlag(eqpflg)) {
		return true;
	}

	return false;
}













/**
 * 四次職へ変更する.
 * @remarks 本来ここにあるべきではない。お試し。
 */
function UpgradeJobTo4th() {

	var msg = "";
	var jobId4th = 0;
	var dataURL = "";

	var funcModifySaveData = function (saveDataArrayF) {

		// 職業ID、ベースレベル、ジョブレベル修正
		saveDataArrayF[1] = jobId4th;
		saveDataArrayF[2] = GetBaseLevelMin(jobId4th);
		saveDataArrayF[3] = 1;

		// 自動レベル調整は強制OFF
		saveDataArrayF[11] = 0;

		return saveDataArrayF;
	};



	switch (n_A_JOB) {

	case JOB_ID_RUNEKNIGHT:
		jobId4th = MIG_JOB_ID_DRAGON_KNIGHT;
		break;

	case JOB_ID_GILOTINCROSS:
		jobId4th = MIG_JOB_ID_SHADOW_CROSS;
		break;

	case JOB_ID_ARCBISHOP:
		jobId4th = MIG_JOB_ID_CARDINAL;
		break;

	case JOB_ID_RANGER:
		jobId4th = MIG_JOB_ID_WIND_HAWK;
		break;

	case JOB_ID_WARLOCK:
		jobId4th = MIG_JOB_ID_ARCH_MAGE;
		break;

	case JOB_ID_MECHANIC:
		jobId4th = MIG_JOB_ID_MEISTER;
		break;

	case JOB_ID_ROYALGUARD:
		jobId4th = MIG_JOB_ID_IMPERIAL_GUARD;
		break;

	case JOB_ID_SHADOWCHASER:
		jobId4th = MIG_JOB_ID_ABYSS_CHASER;
		break;

	case JOB_ID_SHURA:
		jobId4th = MIG_JOB_ID_INQUISITOR;
		break;

	case JOB_ID_MINSTREL:
		jobId4th = MIG_JOB_ID_TROUBADOUR;
		break;

	case JOB_ID_WANDERER:
		jobId4th = MIG_JOB_ID_TROUVERE;
		break;

	case JOB_ID_SORCERER:
		jobId4th = MIG_JOB_ID_ELEMENTAL_MASTER;
		break;

	case JOB_ID_GENETIC:
		jobId4th = MIG_JOB_ID_BIOLO;
		break;

	case JOB_ID_STAR_EMPEROR:
		jobId4th = MIG_JOB_ID_SKY_EMPEROR;
		break;

	case JOB_ID_SOUL_REAPER:
		jobId4th = MIG_JOB_ID_SOUL_ASCETIC;
		break;

	case MIG_JOB_ID_KAGERO:
		jobId4th = MIG_JOB_ID_SHINKIROU;
		break;

	case MIG_JOB_ID_OBORO:
		jobId4th = MIG_JOB_ID_SHIRANUI;
		break;

	case MIG_JOB_ID_REBELLION:
		jobId4th = MIG_JOB_ID_NIGHT_WATCH;
		break;

	case MIG_JOB_ID_SUPERNOVICE_PLUS:
		jobId4th = MIG_JOB_ID_HYPER_NOVICE;
		break;

	case MIG_JOB_ID_SUMMONER:
		jobId4th = MIG_JOB_ID_SPIRIT_HANDLER;
		break;
			
	default:
		msg = "変更対象外の職業です。";
		alert(msg);

		return;
	}



	// 養子不可
	if (n_A_PassSkill8[13]) {
		msg = "養子キャラのデータは対象外です。";
		alert(msg);

		return;
	}



	// URL出力の中身を実行＆データ加工

	// 再計算
	calc();

	// TODO: 暫定対処　旧形式の保存処理呼び出し
	dataURL = SaveSystem(funcModifySaveData);

	// URL入力を実行
	CSaveController.loadFromURL(dataURL);


	// 完了メッセージ
	msg = "四次職への変更が完了しました。";
	alert(msg);
}
