//================================================================================================
//
// 定数定義
//
//================================================================================================

// オートスペル設定　最大数
AUTO_SPELL_SETTING_COUNT = 20;


// オートスペル系スキル　最大数
AUTO_SPELL_SKILL_COUNT_MAX = 40;


// オートスペル発動率（千分率）
AUTO_SPELL_PROB_ARRAY = [
];

for (idx = 0, inc = 1; idx <= 1000; idx += inc) {
	AUTO_SPELL_PROB_ARRAY.push(idx);

	if (idx == 10) {
		inc = 5;
	}
	if (idx == 100) {
		inc = 10;
	}
}



//================================================================================================
//
// グローバル変数定義
//
//================================================================================================

n_AS_SKILL = new Array();

n_AS_DMG = new Array();
n_AS_DMG_OverHP = new Array();
for (var idx = 0; idx < AUTO_SPELL_SKILL_COUNT_MAX; idx++) {
	n_AS_DMG[idx] = new Array();
	n_AS_DMG_OverHP[idx] = new Array();
}





//================================================================================================
//
// 処理
//
//================================================================================================

/**
 * オートスペルの計算.
 */
function AS_Calc(charaData, specData, mobData, attackMethodConfArray, battleCalcInfo){

	var idx = 0;

	var skillLv = 0;
	var skillLvSub = 0;
	var skillLvOld = 0;
	var skillKind = 0;
	var attackMethodConfArrayAS = null;
	var clonedCalcInfo = null;
	var battleCalcResultAll = null;

	var funcAddAS = function () {
		n_AS_SKILL.push([]);
		idx = n_AS_SKILL.length - 1;
	};



	// 初期化
	n_AS_SKILL = [];

	for (var idx = 0; idx < AUTO_SPELL_SKILL_COUNT_MAX; idx++){
		n_AS_DMG[idx][0] = 0;
		n_AS_DMG[idx][1] = 0;
		n_AS_DMG[idx][2] = 0;
		n_AS_DMG_OverHP[idx][0] = 0;
		n_AS_DMG_OverHP[idx][1] = 0;
		n_AS_DMG_OverHP[idx][2] = 0;
	}

	idx = 0;



	//----------------------------------------------------------------
	// 三段掌発動率の取得（三弾掌発動時はASは発動しない）
	//----------------------------------------------------------------
	var wAS_3dan = 0;
	wAS_3dan = GetActRateSandansho(n_A_ActiveSkill, mobData);


	//----------------------------------------------------------------
	// 通常攻撃時の、デュプレライト追撃効果
	//----------------------------------------------------------------
	skillLv = UsedSkillSearch(SKILL_ID_DUPLELIGHT);

	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (n_Enekyori == 0) && (skillLv > 0)) {

		// オートスペルに、デュプレライト物理部分（グラハムライト）を設定
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_GRAHAM_LIGHT;
		n_AS_SKILL[idx][1] = skillLv;
		n_AS_SKILL[idx][2] = 5 * skillLv * 10;
		if(wAS_3dan > 0) {
			// ＡＳ三段掌が設定されている場合は、発動率を補正
			n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
		}
		n_AS_SKILL[idx][3] = 0;

		// オートスペルに、デュプレライト魔法部分（ミリアムライト）を設定
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_MIRIAM_LIGHT;
		n_AS_SKILL[idx][1] = skillLv;
		n_AS_SKILL[idx][2] = 5 * skillLv * 10;
		if(wAS_3dan > 0) {
			// ＡＳ三段掌が設定されている場合は、発動率を補正
			n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
		}
		n_AS_SKILL[idx][3] = 0;

		// カーディナルスキル「ペティティオ」を習得している場合、「ペティティオ」も追加
		skillLvSub = UsedSkillSearch(SKILL_ID_PETITIO_LEARNED);
		if (skillLvSub > 0) {

			// 鈍器、本のみ発動可能
			switch (n_A_WeaponType) {

			case ITEM_KIND_CLUB:
			case ITEM_KIND_BOOK:

				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_PETITIO;
				n_AS_SKILL[idx][1] = skillLvSub;
				n_AS_SKILL[idx][2] = 1 * skillLvSub * 10;
				if(wAS_3dan > 0) {
					// ＡＳ三段掌が設定されている場合は、発動率を補正
					n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
				}
				n_AS_SKILL[idx][3] = 0;
				break;
			}
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、オートシャドウスペル追撃効果
	//----------------------------------------------------------------
	skillLv = UsedSkillSearch(SKILL_ID_AUTO_SHADOW_SPELL);
	skillKind = UsedSkillSearch(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL);

	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (n_Enekyori == 0) && (skillLv > 0) && (skillKind != 0)) {

		var wASS = [
			0,51,52 ,53,54,55,56,57,46,47,125,126,127,128,130,131,132,133,102,104,
			SKILL_ID_CRYMSON_ROCK,
			SKILL_ID_SOUL_EXPANSION,
			SKILL_ID_HELL_INFERNO,
		];

		funcAddAS();

		n_AS_SKILL[idx][0] = wASS[skillKind];
		n_AS_SKILL[idx][1] = Math.floor((skillLv + 1) / 2);

		var ritu = [0,26,28,24,26,22,24,20,22,18,20];
		n_AS_SKILL[idx][2] = ritu[skillLv] * 10;
		if(wAS_3dan > 0) {
			// ＡＳ三段掌が設定されている場合は、発動率を補正
			n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
		}

		n_AS_SKILL[idx][3] = 0;


		// 「バニルミルトの帽子　浮遊する賢者の石セット」のダブルキャスティング効果への対応
		if (TimeItemNumSearch(76)) {
			switch (n_AS_SKILL[idx][0]) {
			case SKILL_ID_FIRE_BOLT:
			case SKILL_ID_COLD_BOLT:
			case SKILL_ID_LIGHTNING_BOLT:
				funcAddAS();
				n_AS_SKILL[idx][0] = n_AS_SKILL[idx - 1][0];
				n_AS_SKILL[idx][1] = n_AS_SKILL[idx - 1][1];
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx - 1][2] / 10 * 40 * 10 / 100;
				n_AS_SKILL[idx][3] = 0;
			}
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、サーヴァントウェポン追撃効果
	// 公式サイトでは「武器体攻撃」と表記
	//----------------------------------------------------------------
	skillLv = UsedSkillSearch(SKILL_ID_SERVANT_WEAPON);

	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLv > 0)) {

		// オートスペルに、サーヴァントウェポンを設定
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_SERVANT_WEAPON;
		n_AS_SKILL[idx][1] = skillLv;
		n_AS_SKILL[idx][2] = 10 * skillLv * 10;
		if(wAS_3dan > 0) {
			// ＡＳ三段掌が設定されている場合は、発動率を補正
			n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
		}
		n_AS_SKILL[idx][3] = 0;
	}

	//----------------------------------------------------------------
	// 四次精霊パッシブモード召喚中
	// 通常攻撃時の、属性ボルト効果
	//----------------------------------------------------------------
	skillKind = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)
	const SERE_SUPPORT_SKILL_TO_BOLT_SKILL = new Map([
		[SERE_SUPPORT_SKILL_ID_FLAME_TECHNIQUE, SKILL_ID_FIRE_BOLT],
		[SERE_SUPPORT_SKILL_ID_COLD_FORCE, SKILL_ID_COLD_BOLT],
		[SERE_SUPPORT_SKILL_ID_GRACE_BREEZE, SKILL_ID_LIGHTNING_BOLT],
		[SERE_SUPPORT_SKILL_ID_EARTH_CARE, SKILL_ID_EARTH_SPIKE],
		[SERE_SUPPORT_SKILL_ID_DEEP_POISONING, SKILL_ID_POISON_BUSTER],
	  ]);
	let boltSkillId = SERE_SUPPORT_SKILL_TO_BOLT_SKILL.get(skillKind);
	if (boltSkillId && n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) {
		funcAddAS();
		n_AS_SKILL[idx][0] = boltSkillId;
		n_AS_SKILL[idx][1] = Math.max(1, LearnedSkillSearch(boltSkillId)); // 最低保障スキルLv = 1
		n_AS_SKILL[idx][2] = 25 * 10; // 属性ボルトの発動率（千分率）
		if(wAS_3dan > 0) {
			// ＡＳ三段掌が設定されている場合は、発動率を補正
			n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
		}
		n_AS_SKILL[idx][3] = 0;
	}

	//----------------------------------------------------------------
	// 通常攻撃時の、フロムジアビス追撃効果
	// 公式サイトでは「アビス球体攻撃」と表記される
	//----------------------------------------------------------------
	skillLv = UsedSkillSearch(SKILL_ID_FROM_THE_ABYSS);
	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLv > 0)) {
		// オートスペルに、フロムジアビスを設定
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_FROM_THE_ABYSS;
		n_AS_SKILL[idx][1] = skillLv;
		n_AS_SKILL[idx][2] = 10 * skillLv * 10;	// 千分率なので * 10 してる
		if(wAS_3dan > 0) {
			// ＡＳ三段掌が設定されている場合は、発動率を補正
			n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
		}
		n_AS_SKILL[idx][3] = 0;

		// アビススクエア習得時、習得レベルで発動
		skillLvSub = UsedSkillSearch(SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL);
		if (skillLvSub > 0) {
			// オートスペルに、アビススクエアを設定
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_ABYSS_SQUARE;
			n_AS_SKILL[idx][1] = skillLvSub;
			n_AS_SKILL[idx][2] = 1 * skillLvSub * 10;
			if(wAS_3dan > 0) {
				// ＡＳ三段掌が設定されている場合は、発動率を補正
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
			}
			n_AS_SKILL[idx][3] = 0;
		}
	}

	//----------------------------------------------------------------
	// 通常攻撃時の、オートファイアリングランチャー追撃効果
	//----------------------------------------------------------------
	skillLv = UsedSkillSearch(SKILL_ID_AUTO_FIRING_LAUNCHER);
	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLv > 0)) {
		// オートスペルに、ベーシックグレネードを設定
		skillLvSub = Math.max(LearnedSkillSearch(SKILL_ID_BASIC_GRENADE), UsedSkillSearch(SKILL_ID_BASIC_GRENADE_LEARNED_LEVEL));
		if (skillLvSub > 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_BASIC_GRENADE;
			n_AS_SKILL[idx][1] = skillLvSub;
			n_AS_SKILL[idx][2] = 45 + 5 * skillLv;	// 千分率で 5.0%～
			if(wAS_3dan > 0) {
				// ＡＳ三段掌（混沌のサイドワインダー）が設定されている場合は、発動率を補正
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
			}
			n_AS_SKILL[idx][3] = 0;
		}
		// オートスペルに、ヘイスティファイアインザホールを設定
		skillLvSub = Math.max(LearnedSkillSearch(SKILL_ID_HASTY_FIRE_IN_THE_HOLE), UsedSkillSearch(SKILL_ID_HASTY_FIRE_IN_THE_HOLE_LEARNED_LEVEL));
		if (skillLvSub > 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_HASTY_FIRE_IN_THE_HOLE;
			n_AS_SKILL[idx][1] = skillLvSub;
			n_AS_SKILL[idx][2] = 20 + 5 * skillLv;	// 千分率で 2.5%～
			if(wAS_3dan > 0) {
				// ＡＳ三段掌（混沌のサイドワインダー）が設定されている場合は、発動率を補正
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
			}
			n_AS_SKILL[idx][3] = 0;
		}
		// オートスペルに、グレネーズドロッピングを設定
		skillLvSub = Math.max(LearnedSkillSearch(SKILL_ID_GRENADES_DROPPING), UsedSkillSearch(SKILL_ID_GRENADES_DROPPING_LEARNED_LEVEL));
		if (skillLvSub > 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_GRENADES_DROPPING;
			n_AS_SKILL[idx][1] = skillLvSub;
			n_AS_SKILL[idx][2] = 10 + 5 * skillLv;	// 千分率で 1.5%～
			if(wAS_3dan > 0) {
				// ＡＳ三段掌（混沌のサイドワインダー）が設定されている場合は、発動率を補正
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
			}
			n_AS_SKILL[idx][3] = 0;
		}

	}

	//----------------------------------------------------------------
	// ビーストストレイフィング時の、ダブルストレイフィング追撃あり時の効果
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_BEAST_STRAIFING) && (attackMethodConfArray[0].GetOptionValue(0) == 1)) {
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_DOUBLE_STRAFING;
		n_AS_SKILL[idx][1] = 10;
		n_AS_SKILL[idx][2] = 100;
		n_AS_SKILL[idx][3] = -2;
	}


	//----------------------------------------------------------------
	// ハンドレッドスピア時の、スピアブーメラン追撃効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR){
		const spear_boomerang_lv = Math.max(LearnedSkillSearch(SKILL_ID_SPEAR_BOOMERANG), attackMethodConfArray[0].GetOptionValue(1));
		if (spear_boomerang_lv > 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_SPEAR_BOOMERANG;
			// スピアブーメランが習得Lvで発動する
			n_AS_SKILL[idx][1] = spear_boomerang_lv;
			n_AS_SKILL[idx][2] = (10 + 3 * n_A_ActiveSkillLV) * 10;
			n_AS_SKILL[idx][3] = 0;
		}
	}


	//----------------------------------------------------------------
	// ダークイリュージョン時の、クロスインパクト追撃効果
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_DARK_ILLUSION) && (attackMethodConfArray[0].GetOptionValue(0) >= 1)) {
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_CROSS_IMPACT;
		n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
		n_AS_SKILL[idx][2] = (30 - 5 * n_A_ActiveSkillLV) * 10;
		n_AS_SKILL[idx][3] = 0;
	}


	//----------------------------------------------------------------
	// パワースイング時の、アックスブーメラン追撃効果
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_POWER_SWING) && (attackMethodConfArray[0].GetOptionValue(0) >= 1)) {
		// 斧系限定の効果
		switch (n_A_WeaponType) {
		case ITEM_KIND_AXE:
		case ITEM_KIND_AXE_2HAND:
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_AXE_BOOMERANG;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
			n_AS_SKILL[idx][2] = 5 * n_A_ActiveSkillLV * 10;
			n_AS_SKILL[idx][3] = 0;
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、ウォーグストライク追撃効果
	// 通常攻撃時の、ブリッツビート追撃効果
	// （※二者択一。どちらかしか発動させられない）
	//----------------------------------------------------------------
	skillLvWug = UsedSkillSearch(SKILL_ID_AUTO_WUG);
	skillLvBlitz = UsedSkillSearch(SKILL_ID_BLITZ_BEAT);

	// 自動狼の場合
	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLvWug > 0)) {
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_WUG_STRIKE;
		n_AS_SKILL[idx][1] = skillLvWug;
		n_AS_SKILL[idx][2] = n_A_LUK * 3;
		n_AS_SKILL[idx][3] = 0;
	}

	// 自動鷹の場合
	else if ((n_A_ActiveSkill == 0) && (n_A_WeaponType == ITEM_KIND_BOW) && (skillLvBlitz > 0)) {

		funcAddAS();

		n_AS_SKILL[idx][0] = SKILL_ID_BLITZ_BEAT;

		//--------------------------------
		// 発動レベルの計算
		//--------------------------------

		// 基本式
		var ASBlitzLv = Math.floor((n_A_JobLV - 1) / 10 + 1);
		if (ASBlitzLv > 5) {
			ASBlitzLv = 5;
		}

		// 職業による補正（レンジャーならばＬｖ５発動）
		if ((n_A_JOB != JOB_ID_HUNTER) && (n_A_JOB != JOB_ID_SNIPER)) {
			ASBlitzLv = 5;
		}

		// 習得レベルを超えて発動はできないので、補正
		if (skillLvBlitz < ASBlitzLv) {
			ASBlitzLv = skillLvBlitz;
		}

		n_AS_SKILL[idx][1] = ASBlitzLv;
		n_AS_SKILL[idx][2] = 10 + n_A_LUK * 3;
		n_AS_SKILL[idx][3] = 10;
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、ブリッツビート追撃効果（装備セットによるもの）
	//----------------------------------------------------------------
	skillLvBlitz = UsedSkillSearch(SKILL_ID_BLITZ_BEAT);
	skillLvWug = UsedSkillSearch(SKILL_ID_AUTO_WUG);
	itemCount = EquipNumSearch(ITEM_ID_TORIKAINO_YOBIKO);

	if ((n_A_ActiveSkill == 0) && (skillLvWug == 0) && (skillLvBlitz > 0) && (itemCount > 0)) {

		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_BLITZ_BEAT;
		n_AS_SKILL[idx][1] = skillLvBlitz;
		n_AS_SKILL[idx][2] = (50 + Math.min(120, SU_LUK) * 2) * skillLvBlitz / 5;
		n_AS_SKILL[idx][3] = 11;
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、ブリッツビート追撃効果（装備セットによるもの）
	//----------------------------------------------------------------
	skillLvBlitz = UsedSkillSearch(SKILL_ID_BLITZ_BEAT);
	skillLvWug = UsedSkillSearch(SKILL_ID_AUTO_WUG);
	itemCount = EquipNumSearch(ITEM_ID_SORATOBU_GARAPAGO);

	if ((n_A_ActiveSkill == 0) && (skillLvWug == 0) && (skillLvBlitz > 0) && (itemCount > 0)){

		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_BLITZ_BEAT;
		n_AS_SKILL[idx][1] = skillLvBlitz;
		n_AS_SKILL[idx][2] = (50 + Math.min(120, SU_LUK) * 2) * skillLvBlitz / 5;
		n_AS_SKILL[idx][3] = 11;
	}


	//----------------------------------------------------------------
	// 「古びた迷彩ウサギフード」の、＋９以上精錬による、自動狼の発動
	//----------------------------------------------------------------
	skillLvWug = UsedSkillSearch(SKILL_ID_AUTO_WUG);
	itemCount = EquipNumSearch(ITEM_ID_FURUBITA_MEISAIUSAGI);
	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLvWug > 0)) {
		if ((itemCount > 0) && (n_A_HEAD_DEF_PLUS >= 9)) {
			funcAddAS();
			// 適用スキルの設定
			n_AS_SKILL[idx][0] = SKILL_ID_WUG_STRIKE;
			// 適用レベルの設定
			n_AS_SKILL[idx][1] = skillLvWug;
			// 発動率の設定
			n_AS_SKILL[idx][2] = (50 + Math.min(120, SU_LUK) * 2) * skillLvWug / 5;
			// 表示組立部フラグの設定（通常は０）
			n_AS_SKILL[idx][3] = 0;
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、クイックドロー追撃効果
	//----------------------------------------------------------------
	skillLvQuickDraw = UsedSkillSearch(SKILL_ID_AS_QUICKDRAW);
	skillLvChainAction = Math.max(LearnedSkillSearch(SKILL_ID_CHAIN_ACTION), UsedSkillSearch(SKILL_ID_CHAIN_ACTION));

	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLvQuickDraw > 0)
		&& (n_A_WeaponType == ITEM_KIND_HANDGUN) && (skillLvChainAction > 0)) {

		funcAddAS();

		// 適用スキルの設定
		n_AS_SKILL[idx][0] = SKILL_ID_QUICKDRAW_SHOT;

		// 適用レベルの設定
		n_AS_SKILL[idx][1] = 1;

		// 発動率の設定
		n_AS_SKILL[idx][2] = 5 * skillLvChainAction * 10;

		// 表示組立部フラグの設定（通常は０）
		n_AS_SKILL[idx][3] = 0;
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、クイックドロー追撃効果
	//----------------------------------------------------------------
	skillLvQuickDraw = UsedSkillSearch(SKILL_ID_AS_QUICKDRAW);
	skillLvEternalChain = UsedSkillSearch(SKILL_ID_ETERNAL_CHAIN);

	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLvQuickDraw > 0)
		&& (ITEM_KIND_HANDGUN <= n_A_WeaponType) && (n_A_WeaponType <= ITEM_KIND_GRENADEGUN)
		&& (skillLvEternalChain > 0)) {

		funcAddAS();

		// 適用スキルの設定
		n_AS_SKILL[idx][0] = SKILL_ID_QUICKDRAW_SHOT;

		// 適用レベルの設定
		n_AS_SKILL[idx][1] = 1;

		// 発動率の設定
		n_AS_SKILL[idx][2] = 5 * skillLvEternalChain * 10;

		// 表示組立部フラグの設定（通常は０）
		n_AS_SKILL[idx][3] = 0;
	}


	//----------------------------------------------------------------
	// 通常攻撃時の、流星落下追撃効果
	//----------------------------------------------------------------
	var skillLvRyuseRakka = UsedSkillSearch(SKILL_ID_RYUSE_RAKKA);
	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) && (skillLvRyuseRakka > 0)) {
		// 流星落下の初撃を設定
		funcAddAS();
		// 適用スキルの設定
		n_AS_SKILL[idx][0] = SKILL_ID_RYUSE_RAKKA;
		// 適用レベルの設定
		n_AS_SKILL[idx][1] = skillLvRyuseRakka;
		// 発動率の設定 千分率
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				// 特定の戦闘エリアでの補正
				n_AS_SKILL[idx][2] = 80 * 10;
				if (skillLvRyuseRakka >= 6) {
					n_AS_SKILL[idx][2] += 20 * 10;
				}
				break;
			default:
				// 通常サーバー
				n_AS_SKILL[idx][2] = 20 * 10;
				if (skillLvRyuseRakka >= 6) {
					n_AS_SKILL[idx][2] += 5 * 10;
				}
				break;
		}
		// 表示組立部フラグの設定（通常は０）
		n_AS_SKILL[idx][3] = 0;

		// 流星落下の周辺追撃を設定
		funcAddAS();
		// 適用スキルの設定
		n_AS_SKILL[idx][0] = SKILL_ID_RYUSE_RAKKA_TSUIGEKI;
		// 適用レベルの設定
		n_AS_SKILL[idx][1] = skillLvRyuseRakka;
		// 発動率の設定 千分率
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				// 特定の戦闘エリアでの補正
				n_AS_SKILL[idx][2] = 80 * 10;
				if (skillLvRyuseRakka >= 6) {
					n_AS_SKILL[idx][2] += 20 * 10;
				}
				break;
			default:
				// 通常サーバー
				n_AS_SKILL[idx][2] = 20 * 10;
				if (skillLvRyuseRakka >= 6) {
					n_AS_SKILL[idx][2] += 5 * 10;
				}
				break;
		}
		// 表示組立部フラグの設定（通常は０）
		n_AS_SKILL[idx][3] = 0;
	}


	//----------------------------------------------------------------
	// 鋭敏な嗅覚時の、ウォーグバイト追撃効果
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_EIBINNA_KYUKAKU) && (attackMethodConfArray[0].GetOptionValue(0) >= 1)) {
		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_WUG_BITE;
		n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
		n_AS_SKILL[idx][2] = 8 * n_A_ActiveSkillLV * 10;
		n_AS_SKILL[idx][3] = 0;
	}


	//----------------------------------------------------------------
	// ヘスペルスリット時の、ピンポイントアタック追撃効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HESPERUS_SLIT) {
		var w = 1;
		if(UsedSkillSearch(SKILL_ID_INSPIRATION)) w += 2;
		if((UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING) + w) == 6){
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_PINGPOINT_ATTACK;
			n_AS_SKILL[idx][1] = 1;
			n_AS_SKILL[idx][2] = 100;
			n_AS_SKILL[idx][3] = -3;
		}
	}


	//----------------------------------------------------------------
	// 閃光連撃時の、連撃
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SENKO_RENGEKI) {
		if (attackMethodConfArray[0].GetOptionValue(0) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_SORYUKYAKU;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}
		if (attackMethodConfArray[0].GetOptionValue(1) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_DAITENHOSUI;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(1);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}
		if (attackMethodConfArray[0].GetOptionValue(2) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_GOHO;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(2);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}
		if (attackMethodConfArray[0].GetOptionValue(3) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_TENRACHIMO;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(3);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}
	}


	//----------------------------------------------------------------
	// 三段コンボ時の、連撃
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_COMBO_SANDAN_MONK) || (n_A_ActiveSkill == SKILL_ID_COMBO_SANDAN_CHAMP)) {

		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_SANDANSHO;
		n_AS_SKILL[idx][1] = UsedSkillSearch(SKILL_ID_SANDANSHO);
		n_AS_SKILL[idx][2] = 1000;
		n_AS_SKILL[idx][3] = -4;

		if (attackMethodConfArray[0].GetOptionValue(0) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_RENDASHO;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}

		if (attackMethodConfArray[0].GetOptionValue(1) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_MORYUKEN;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(1);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}

		// モンクの場合
		if (n_A_ActiveSkill == SKILL_ID_COMBO_SANDAN_MONK) {
			if (attackMethodConfArray[0].GetOptionValue(2) != 0) {
				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_ASHURA_HAOKEN_SPKOTEI;
				n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(2);
				n_AS_SKILL[idx][2] = 1000;
				n_AS_SKILL[idx][3] = -4;
			}
		}

		// チャンピオン以上の場合
		else {
			if (attackMethodConfArray[0].GetOptionValue(2) != 0) {
				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_BUKKOKEN;
				n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(2);
				n_AS_SKILL[idx][2] = 1000;
				n_AS_SKILL[idx][3] = -4;
			}
			if (attackMethodConfArray[0].GetOptionValue(3) != 0) {
				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_RENCHUHOGEKI;
				n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(3);
				n_AS_SKILL[idx][2] = 1000;
				n_AS_SKILL[idx][3] = -4;
			}
			if (attackMethodConfArray[0].GetOptionValue(4) != 0) {
				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_ASHURA_HAOKEN_SPKOTEI;
				n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(4);
				n_AS_SKILL[idx][2] = 1000;
				n_AS_SKILL[idx][3] = -4;
			}
		}
	}


	//----------------------------------------------------------------
	// 双龍コンボ時の、連撃
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COMBO_SORYUKYAKU) {

		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_SORYUKYAKU;
		n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
		n_AS_SKILL[idx][2] = 1000;
		n_AS_SKILL[idx][3] = -4;

		// 双龍→天羅止め
		if (attackMethodConfArray[0].GetOptionValue(1) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_TENRACHIMO;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(1);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}

		else {

			// 双龍→大纏
			if (attackMethodConfArray[0].GetOptionValue(2) != 0) {
				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_DAITENHOSUI;
				n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(2);
				n_AS_SKILL[idx][2] = 1000;
				n_AS_SKILL[idx][3] = -4;
			}

			// 双龍→大纏→号砲止め
			if (attackMethodConfArray[0].GetOptionValue(3) != 0) {
				funcAddAS();
				n_AS_SKILL[idx][0] = SKILL_ID_GOHO;
				n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(3);
				n_AS_SKILL[idx][2] = 1000;
				n_AS_SKILL[idx][3] = -4;
			}

			// 双龍→大纏→羅刹止め
			else{

				if (attackMethodConfArray[0].GetOptionValue(4) != 0) {
					funcAddAS();
					n_AS_SKILL[idx][0] = SKILL_ID_RASETSU_HAOGEKI_MAX;
					n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(4);
					n_AS_SKILL[idx][2] = 1000;
					n_AS_SKILL[idx][3] = -4;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// ギガントセット　ジョイントコンボ時の、連撃
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT) {

		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_JOINT_BEAT;
		n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(0);
		n_AS_SKILL[idx][2] = 1000;
		n_AS_SKILL[idx][3] = -4;

		if (attackMethodConfArray[0].GetOptionValue(1) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_SPIRAL_PIERCE;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(1);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}

		if (attackMethodConfArray[0].GetOptionValue(2) != 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_SONIC_WAVE;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(2);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}
	}


	//----------------------------------------------------------------
	// ギガントセット　スパイラルコンボ時の、連撃
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE) {

		funcAddAS();
		n_AS_SKILL[idx][0] = SKILL_ID_SPIRAL_PIERCE;
		n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(1);
		n_AS_SKILL[idx][2] = 1000;
		n_AS_SKILL[idx][3] = -4;

		if(attackMethodConfArray[0].GetOptionValue(1) != 0){
			funcAddAS();
			n_AS_SKILL[idx][0] = SKILL_ID_SONIC_WAVE;
			n_AS_SKILL[idx][1] = attackMethodConfArray[0].GetOptionValue(1);
			n_AS_SKILL[idx][2] = 1000;
			n_AS_SKILL[idx][3] = -4;
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃、スペルフィストにおける、精霊効果
	//----------------------------------------------------------------
	sereKind = UsedSkillSearch(SKILL_ID_SERE);
	sereMode = UsedSkillSearch(SKILL_ID_SERE_MODE);

	if (n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI || n_A_ActiveSkill == SKILL_ID_SPELL_FIST) {

		if (sereMode == 1) {

			if ([3, 6, 9, 12].indexOf(sereKind) >= 0) {

				funcAddAS();

				// 発動スキルの設定
				switch (sereKind) {
				case 3:
					n_AS_SKILL[idx][0] = SKILL_ID_FIRE_BOLT;
					break;

				case 6:
					n_AS_SKILL[idx][0] = SKILL_ID_COLD_BOLT;
					break;

				case 9:
					n_AS_SKILL[idx][0] = SKILL_ID_LIGHTNING_BOLT;
					break;

				case 12:
					n_AS_SKILL[idx][0] = SKILL_ID_EARTH_SPIKE;
					break;
				}

				// 発動レベル、発動率の設定
				switch (sereKind) {
				case 3:
				case 6:
				case 9:
				case 12:
					// 発動レベル
					if (n_A_JobLV < 10) {
						n_AS_SKILL[idx][1] = 1;
					}
					else {
						n_AS_SKILL[idx][1] = Math.floor(n_A_JobLV / 10);
					}

					// 発動率
					n_AS_SKILL[idx][2] = Math.floor(n_A_JobLV * 10 / 2);
					// 遠距離攻撃では、発動率半減
					if (n_Enekyori == 1) {
						n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] / 2;
					}
					// 三段掌では、発動しない
					if (wAS_3dan > 0) {
						n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
					}

					n_AS_SKILL[idx][3] = 0;



					// ダブルキャスティング効果の適用
					switch (n_AS_SKILL[idx][0]) {

					case SKILL_ID_FIRE_BOLT:
					case SKILL_ID_COLD_BOLT:
					case SKILL_ID_LIGHTNING_BOLT:

						skillLvDoubleCasting = UsedSkillSearch(SKILL_ID_DOUBLE_CASTING);

						if (skillLvDoubleCasting > 0) {
							funcAddAS();
							n_AS_SKILL[idx][0] = n_AS_SKILL[idx-1][0];
							n_AS_SKILL[idx][1] = n_AS_SKILL[idx-1][1];
							n_AS_SKILL[idx][2] = n_AS_SKILL[idx-1][2] / 10 * (30 + 10 * skillLvDoubleCasting) * 10 / 100;
							n_AS_SKILL[idx][3] = 0;
						}

						// 「バニルミルトの帽子　浮遊する賢者の石セット」のダブルキャスティング効果への対応
						else if (TimeItemNumSearch(76)) {
							funcAddAS();
							n_AS_SKILL[idx][0] = n_AS_SKILL[idx-1][0];
							n_AS_SKILL[idx][1] = n_AS_SKILL[idx-1][1];
							n_AS_SKILL[idx][2] = n_AS_SKILL[idx-1][2] / 10 * 40 * 10 / 100;
							n_AS_SKILL[idx][3] = 0;
						}
					}

				}

			}
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃、スペルフィストにおける、装備オートスペル効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI || n_A_ActiveSkill == SKILL_ID_SPELL_FIST) {

		// 通常オートスペル
		for (var asidx = 0; asidx < AUTO_SPELL_SETTING_COUNT; asidx++){

			// 指定欄のオートスペルＩＤを取得
			var asId = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + asidx];

			// 初期処理時は処理しない
			if (asId == undefined) {
				break;
			}

			// 未指定の場合は処理しない
			if (asId == 0) {
				continue;
			}

			funcAddAS();

			// 発動するスキルのＩＤを取得
			n_AS_SKILL[idx][0] = AutoSpellSkill[asId][2];

			// 発動するレベルを取得
			n_AS_SKILL[idx][1] = AutoSpellSkill[asId][3];

			// レベルが指定されている場合は上書き
			if (n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + asidx] != 0) {
				n_AS_SKILL[idx][1] = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + asidx];
			}

			// 発動率を取得
			n_AS_SKILL[idx][2] = AUTO_SPELL_PROB_ARRAY[n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + asidx]];

			// 遠距離攻撃の場合は、発動率半減
			if (n_Enekyori == 1) {
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] / 2;
			}

			// 三段掌発動時は、ＡＳは発動しないので、発動率を補正
			if (wAS_3dan > 0) {
				n_AS_SKILL[idx][2] = n_AS_SKILL[idx][2] * (100 - wAS_3dan) / 100;
			}

			// オートスペルフラグは、一般オートスペル
			n_AS_SKILL[idx][3] = 0;



			// ダブルキャスティングの効果
			switch (n_AS_SKILL[idx][0]) {

			case SKILL_ID_FIRE_BOLT:
			case SKILL_ID_COLD_BOLT:
			case SKILL_ID_LIGHTNING_BOLT:

				skillLvDoubleCasting = UsedSkillSearch(SKILL_ID_DOUBLE_CASTING);

				if (skillLvDoubleCasting > 0) {
					funcAddAS();
					n_AS_SKILL[idx][0] = n_AS_SKILL[idx-1][0];
					n_AS_SKILL[idx][1] = n_AS_SKILL[idx-1][1];
					n_AS_SKILL[idx][2] = n_AS_SKILL[idx-1][2] / 10 * (30 + 10 * skillLvDoubleCasting) * 10 / 100;
					n_AS_SKILL[idx][3] = 0;
				}

				// 「バニルミルトの帽子　浮遊する賢者の石セット」のダブルキャスティング効果への対応
				else if (TimeItemNumSearch(76)) {
					funcAddAS();
					n_AS_SKILL[idx][0] = n_AS_SKILL[idx-1][0];
					n_AS_SKILL[idx][1] = n_AS_SKILL[idx-1][1];
					n_AS_SKILL[idx][2] = n_AS_SKILL[idx-1][2] / 10 * 40 * 10 / 100;
					n_AS_SKILL[idx][3] = 0;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// ボルト使用時の、ダブルキャスティング効果
	//----------------------------------------------------------------
	switch (n_A_ActiveSkill) {

	case SKILL_ID_FIRE_BOLT:
	case SKILL_ID_COLD_BOLT:
	case SKILL_ID_LIGHTNING_BOLT:

		skillLvDoubleCasting = UsedSkillSearch(SKILL_ID_DOUBLE_CASTING);

		if (skillLvDoubleCasting > 0) {
			funcAddAS();
			n_AS_SKILL[idx][0] = n_A_ActiveSkill;
			n_AS_SKILL[idx][1] = n_A_ActiveSkillLV;
			n_AS_SKILL[idx][2] = (30 + 10 * skillLvDoubleCasting) * 10;
			n_AS_SKILL[idx][3] = 0;
		}

		// 「バニルミルトの帽子　浮遊する賢者の石セット」のダブルキャスティング効果への対応
		else if (TimeItemNumSearch(76)) {
			funcAddAS();
			n_AS_SKILL[idx][0] = n_A_ActiveSkill;
			n_AS_SKILL[idx][1] = n_A_ActiveSkillLV;
			n_AS_SKILL[idx][2] = 40 * 10;
			n_AS_SKILL[idx][3] = 0;
		}
	}


	//----------------------------------------------------------------
	// 通常攻撃、スペルフィストにおける、スキルオートスペル効果
	//----------------------------------------------------------------
	skillLv = UsedSkillSearch(SKILL_ID_AUTO_MAGICIAN_SPELL);
	skillKind = UsedSkillSearch(SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL);

	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) || (n_A_ActiveSkill == SKILL_ID_SPELL_FIST)) {

		if ((skillLv > 0) && (skillKind != 0)) {

			funcAddAS();

			// 発動スキルの設定
			switch (skillKind) {
			case 1:
				n_AS_SKILL[idx][0] = SKILL_ID_FIRE_BOLT;
				break;

			case 2:
				n_AS_SKILL[idx][0] = SKILL_ID_COLD_BOLT;
				break;

			case 3:
				n_AS_SKILL[idx][0] = SKILL_ID_LIGHTNING_BOLT;
				break;

			case 4:
				n_AS_SKILL[idx][0] = SKILL_ID_SOUL_STRIKE;
				break;
			}

			// 発動レベルの設定
			n_AS_SKILL[idx][1] = 3;
			skillLvEffectOfSagenoTamashi = UsedSkillSearch(SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL);
			if (skillLvEffectOfSagenoTamashi > 0) {
				n_AS_SKILL[idx][1] = skillLvEffectOfSagenoTamashi;
			}

			// 発動率の設定
			n_AS_SKILL[idx][2] = (5 + 2 * skillLv) * 10;

			n_AS_SKILL[idx][3] = -1;



			// ダブルキャスティングの効果
			switch (n_AS_SKILL[idx][0]) {

			case SKILL_ID_FIRE_BOLT:
			case SKILL_ID_COLD_BOLT:
			case SKILL_ID_LIGHTNING_BOLT:

				skillLvDoubleCasting = UsedSkillSearch(SKILL_ID_DOUBLE_CASTING);

				if (skillLvDoubleCasting > 0) {
					funcAddAS();
					n_AS_SKILL[idx][0] = n_AS_SKILL[idx-1][0];
					n_AS_SKILL[idx][1] = n_AS_SKILL[idx-1][1];
					n_AS_SKILL[idx][2] = n_AS_SKILL[idx-1][2] / 10 * (30 + 10 * skillLvDoubleCasting) * 10 / 100;
					n_AS_SKILL[idx][3] = 0;
				}

				// 「バニルミルトの帽子　浮遊する賢者の石セット」のダブルキャスティング効果への対応
				else if (TimeItemNumSearch(76)) {
					funcAddAS();
					n_AS_SKILL[idx][0] = n_AS_SKILL[idx-1][0];
					n_AS_SKILL[idx][1] = n_AS_SKILL[idx-1][1];
					n_AS_SKILL[idx][2] = n_AS_SKILL[idx-1][2] / 10 * 40 * 10 / 100;
					n_AS_SKILL[idx][3] = 0;
				}
			}
		}
	}


	// 発動率の上限（100.0%）補正
	for (var idxsub = 0; idxsub < n_AS_SKILL.length; idxsub++) {
		if (n_AS_SKILL[idxsub][2] > 1000) {
			n_AS_SKILL[idxsub][2] = 1000;
		}
	}



	return;








	n_AS_SKILL[idx][0] = -1;
	if(n_AS_SKILL[0][0] == -1) return;
	n_AS_MODE = true;

	//----------------------------------------------------------------
	// 表示ＨＴＭＬ組み立て（未解析）
	//----------------------------------------------------------------

	var BK_SKILL = n_A_ActiveSkill;
	var BK_SKILL_LV = n_A_ActiveSkillLV;
	var BK_ZOKUSEI = n_A_Weapon_zokusei;
	var BK_ENKYORI = n_Enekyori;
	var BK_DMG0 = n_A_DMG[0];
	var BK_DMG1 = n_A_DMG[1];
	var BK_DMG2 = n_A_DMG[2];
	var BK_HIT = w_HIT_HYOUJI;
	var BK_DELAY = new Array();
	for(var i=0;i<=7;i++) BK_DELAY[i] = n_Delay[i];
	if(!(BK_SKILL == 391 && n_AS_SKILL[1][0] == -1)){
		if(!(799 <= BK_SKILL && BK_SKILL <= 809)){
			str_bSUBname += "<Font size=2><B>オートスペル系</B><BR></Font>";
			str_bSUB += "<Font size=2>与ダメージ(発動率)<BR></Font>";
		}else{
			str_bSUBname += "<Font size=2><B>コンボ詳細</B><BR></Font>";
			str_bSUB += "<Font size=2>与ダメージ<BR></Font>";
		}
	}
	for(var i=0;n_AS_SKILL[i][0] != -1;i++){

		n_A_ActiveSkill = n_AS_SKILL[i][0];
		n_A_ActiveSkillLV = n_AS_SKILL[i][1];

		// オートスペルのダメージ計算用の攻撃手段設定を生成
		// （元の配列は加工しないこと）
		attackMethodConf = new CAttackMethodConf();
		attackMethodConf.SetSkillId(n_AS_SKILL[i][0]);
		attackMethodConf.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL);
		attackMethodConf.SetSkillLv(n_AS_SKILL[i][1]);
		attackMethodConfArrayAS = [attackMethodConf].concat(attackMethodConfArray);


		SET_ZOKUSEI(mobData, attackMethodConfArrayAS);
		n_Enekyori = 0;


		w_HIT = n_AS_HIT;
		w_HIT = Math.floor(w_HIT * (100 + GetHitModify()) / 100);

		// 確率範囲補正
		if (w_HIT > 100){
			w_HIT = 100;
		}
		else if (w_HIT < 5){
			w_HIT = 5;
		}

		// ○○％の確率で必中　効果の適用
		var wkHit = n_tok[ITEM_SP_PERFECT_ATTACK_UP];
		if (wkHit > 0) {
			w_HIT = w_HIT + (100 - w_HIT) * wkHit / 100;
		}
		if (w_HIT > 100) {
			w_HIT = 100;
		}
		else if (w_HIT < 5) {
			w_HIT = 5;
		}

		var wSYUUREN = TYPE_SYUUREN(mobData, attackMethodConfArrayAS, false);
		var wBaiA = GetSpiderWebDamageRatio();
		var wBaiB = GetElementFieldDamageRatio();

		// ○○の怒り系によるＡＴＫ増加効果
		var pow = GetIkariPow(mobData);

		for(var j=0;j<=2;j++){
			n_A_DMG[j] = BK_n_A_DMG2[j];
			n_A_DMG[j] = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, n_A_DMG[j]);
			if(wBaiA != 0) n_A_DMG[j] = ROUNDDOWN(n_A_DMG[j] * (100 + wBaiA) / 100);
			n_A_DMG[j] = ApplyElementRatio(mobData, n_A_DMG[j],n_A_Weapon_zokusei);
			if(wBaiB != 0) n_A_DMG[j] = ROUNDDOWN(n_A_DMG[j] * (100 + wBaiB) / 100);
			n_A_DMG[j] = ApplyResistElement(mobData, n_A_DMG[j]);
			n_A_DMG[j] = charaData[CHARA_DATA_INDEX_STATUS_ATK] + n_A_DMG[j];

			// 修練前に四次特性効果を適用
			n_A_DMG[j] = ApplyPAtkAmplify(n_A_DMG[j]);

			n_A_DMG[j] += wSYUUREN;
			n_A_DMG[j] = Math.floor(n_A_DMG[j] * pow / 100);
		}
		var wDMG;

		// ダメージ計算
		clonedCalcInfo = battleCalcInfo.Clone();
		clonedCalcInfo.skillId = n_A_ActiveSkill;
		clonedCalcInfo.skillLv = n_A_ActiveSkillLV;
		battleCalcResultAll = BattleCalc999(clonedCalcInfo, charaData, specData, mobData, attackMethodConfArrayAS);

		// TODO: クリティカル未対応
		wDMG = battleCalcResultAll.GetPassiveResult(0).dmgUnitArray[0].slice();

		if(n_AS_SKILL[i][3] >= 0){
			if(n_AS_SKILL[i][2] != 0){
				if(n_AS_SKILL[i][3] == 11){
					if(EquipNumSearch(2513)) str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv"+ n_AS_SKILL[i][1] +"(ガラパゴ)<BR>";
					else str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv"+ n_AS_SKILL[i][1] +"(呼子)<BR>";
				}
				else str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv"+ n_AS_SKILL[i][1] +"<BR>";
				if(n_AS_SKILL[i][3] == 0) str_bSUB += __DIG3(wDMG[0]) +"～"+ __DIG3(wDMG[2]) +"("+ (Math.floor(n_AS_SKILL[i][2]) / 10) +"％)<BR>";
				else if(n_AS_SKILL[i][3] == 10 || n_AS_SKILL[i][3] == 11) str_bSUB += __DIG3(wDMG[0]) +" ("+ __DIG3(wDMG[0] / n_AS_SKILL[i][1]) +"×"+ n_AS_SKILL[i][1] +")("+ (Math.floor(n_AS_SKILL[i][2]) / 10) +"％)<BR>";
				n_AS_SKILL[i][2] = n_AS_SKILL[i][2] / 10;
				if(n_Enekyori==2){
					if(n_AS_SKILL[i][2] >= 100) n_AS_DMG[i][0] = wDMG[0];
					else n_AS_DMG[i][0] = 0;
					n_AS_DMG[i][1] = wDMG[1] * BK_HIT / 100 * n_AS_SKILL[i][2] / 100;
					n_AS_DMG_OverHP[i][1] = mobData[3] * BK_HIT / 100 * n_AS_SKILL[i][2] / 100;
					n_AS_DMG[i][2] = wDMG[2];
				}
				if(n_Enekyori==0 || n_Enekyori==1){
					if(n_AS_SKILL[i][2] >= 100 && BK_HIT >= 100 && w_HIT >= 100) n_AS_DMG[i][0] = wDMG[0];
					else n_AS_DMG[i][0] = 0;
					n_AS_DMG[i][1] = wDMG[1] * BK_HIT / 100 * w_HIT / 100 * n_AS_SKILL[i][2] / 100;
					n_AS_DMG_OverHP[i][1] = mobData[3] * BK_HIT / 100 * w_HIT / 100 * n_AS_SKILL[i][2] / 100;
					n_AS_DMG[i][2] = wDMG[2];
					if(n_AS_SKILL[i][2] <= 0) n_AS_DMG[i][2] = 0;
				}
			}else{
				str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv"+ n_AS_SKILL[i][1] +"<BR>";
				str_bSUB += "発動率不明で計算から除外<BR>";
				n_AS_DMG[i][0] = 0;
				n_AS_DMG[i][1] = 0;
				n_AS_DMG[i][2] = 0;
			}
		}else if(n_AS_SKILL[i][3] == -1){
			if(UsedSkillSearch(SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL) == 0){
				str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv1-3<BR>";
				str_bSUB += __DIG3(wDMG[0] / 3) +"～"+ __DIG3(wDMG[2]) +"("+ (Math.floor(n_AS_SKILL[i][2]) / 10) +"％)<BR>";
				n_AS_SKILL[i][2] = n_AS_SKILL[i][2] / 10;
				n_AS_DMG[i][0] = 0;
				n_AS_DMG[i][1] = (wDMG[1] / 3 * 50 + wDMG[1] * 2 / 3 * 35 + wDMG[1] * 15) / 100 * n_AS_SKILL[i][2] / 100;
				n_AS_DMG_OverHP[i][1] = (mobData[3] / 3 * 50 + mobData[3] * 2 / 3 * 35 + mobData[3] * 15) / 100 * n_AS_SKILL[i][2] / 100;
				n_AS_DMG[i][2] = wDMG[2];
			}else{
				str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv"+ UsedSkillSearch(SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL) +"<BR>";
				str_bSUB += __DIG3(wDMG[0]) +"～"+ __DIG3(wDMG[2]) +"("+ (Math.floor(n_AS_SKILL[i][2]) / 10) +"％)<BR>";
				n_AS_SKILL[i][2] = n_AS_SKILL[i][2] / 10;
				n_AS_DMG[i][0] = 0;
				n_AS_DMG[i][1] = wDMG[1] * n_AS_SKILL[i][2] / 100;
				n_AS_DMG_OverHP[i][1] = mobData[3] * n_AS_SKILL[i][2] / 100;
				n_AS_DMG[i][2] = wDMG[2];
			}
		}else if(n_AS_SKILL[i][3] == -2){
			g_damageTextArray[0].push("＋");
			g_damageTextArray[1].push("＋");
			g_damageTextArray[2].push("＋");
			if(n_AS_SKILL[i][2] >= 100 && w_HIT >= 100) n_AS_DMG[i][0] = wDMG[0];
			else n_AS_DMG[i][0] = 0;
			n_AS_DMG[i][1] = wDMG[1] * w_HIT / 100 * n_AS_SKILL[i][2] / 100;
			n_AS_DMG_OverHP[i][1] = mobData[3] * w_HIT / 100 * n_AS_SKILL[i][2] / 100;
			n_AS_DMG[i][2] = wDMG[2];
			if(n_AS_SKILL[i][2] <= 0) n_AS_DMG[i][2] = 0;
		}else if(n_AS_SKILL[i][3] == -3){

			var wDMG2;
			var wDMG3;

			skillLvOld = attackMethodConfArrayAS[0].GetSkillLv();

			n_A_ActiveSkillLV = 3;
			attackMethodConfArrayAS[0].SetSkillLv(n_A_ActiveSkillLV);
			clonedCalcInfo = battleCalcInfo.Clone();
			clonedCalcInfo.skillId = n_A_ActiveSkill;
			clonedCalcInfo.skillLv = n_A_ActiveSkillLV;
			battleCalcResultAll = BattleCalc999(clonedCalcInfo, charaData, specData, mobData, attackMethodConfArrayAS);

			// TODO: クリティカル未対応
			wDMG2 = battleCalcResultAll.GetPassiveResult(0).dmgUnitArray[0].slice();

			n_A_ActiveSkillLV = 5;
			attackMethodConfArrayAS[0].SetSkillLv(n_A_ActiveSkillLV);
			clonedCalcInfo = battleCalcInfo.Clone();
			clonedCalcInfo.skillId = n_A_ActiveSkill;
			clonedCalcInfo.skillLv = n_A_ActiveSkillLV;
			battleCalcResultAll = BattleCalc999(clonedCalcInfo, charaData, specData, mobData, attackMethodConfArrayAS);

			// TODO: クリティカル未対応
			wDMG3 = battleCalcResultAll.GetPassiveResult(0).dmgUnitArray[0].slice();

			attackMethodConfArrayAS[0].SetSkillLv(skillLvOld);

			str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv1～5<BR>";
			str_bSUB += __DIG3(wDMG[0]) +"～"+ __DIG3(wDMG3[2]) +"("+ n_AS_SKILL[i][2] +"％)<BR>";
			if(n_AS_SKILL[i][2] >= 100) n_AS_DMG[i][0] = wDMG[0];
			else n_AS_DMG[i][0] = 0;
			n_AS_DMG[i][1] = wDMG2[1] * n_AS_SKILL[i][2] / 100;
			n_AS_DMG_OverHP[i][1] = mobData[3] * n_AS_SKILL[i][2] / 100;
			n_AS_DMG[i][2] = wDMG3[2];
		}else if(n_AS_SKILL[i][3] == -4){
			str_bSUBname += SkillObjNew[n_AS_SKILL[i][0]][SKILL_DATA_INDEX_NAME] +"Lv"+ n_AS_SKILL[i][1] +"<BR>";
			str_bSUB += __DIG3(wDMG[0]) +"～"+ __DIG3(wDMG[2]) +"<BR>";
			n_AS_SKILL[i][2] = n_AS_SKILL[i][2] / 10;
			if(w_HIT >= 100) n_AS_DMG[i][0] = wDMG[0];
			else n_AS_DMG[i][0] = 0;
			n_AS_DMG[i][1] = wDMG[1] * w_HIT / 100 * n_AS_SKILL[i][2] / 100;
			n_AS_DMG_OverHP[i][1] = mobData[3] * w_HIT / 100 * n_AS_SKILL[i][2] / 100;
			n_AS_DMG[i][2] = wDMG[2];
		}
	}
	w_HIT_HYOUJI = BK_HIT;
	n_A_DMG[0] = BK_DMG0;
	n_A_DMG[1] = BK_DMG1;
	n_A_DMG[2] = BK_DMG2;
	n_A_ActiveSkill = BK_SKILL;
	n_A_ActiveSkillLV = BK_SKILL_LV;
	n_A_Weapon_zokusei = BK_ZOKUSEI;
	n_Enekyori = BK_ENKYORI;
	for(var i=0;i<=7;i++) n_Delay[i] = BK_DELAY[i];
	n_AS_MODE = false;
	if(n_A_ActiveSkill == 0 && n_AS_SKILL[0][0] != 0 && (UsedSkillSearch(SKILL_ID_SANDANSHO) || GetActRateDA(n_A_ActiveSkill, mobData))){
		str_bSUBname += "<B><Font size=2>通常</Font></B><BR>";
		str_bSUB += "<BR>";
	}
}





function AS_PLUS(){

	w_DMG_AS_OverHP = w_DMG[1];

	if(!n_AS_check_3dan){

		for(var j = 0; j < n_AS_DMG.length; j++){

			for(var i = 0; i <= 2; i++){

				if(i == 1) {
					w_DMG_AS_OverHP += n_AS_DMG_OverHP[j][i];
				}

				w_DMG[i] += n_AS_DMG[j][i];
			}
		}
	}

	else{

		for(var j = 0; j < n_AS_DMG.length; j++){

			for(var i = 0; i <= 1; i++){
				w_DMG[i] += n_AS_DMG[j][i];
			}
		}
	}
}

















//================================================================================================
//
// 定数定義
//
//================================================================================================
OBJID_OFFSET_AS_SKILL_ID = 100;			// オブジェクトＩＤのオフセット（オートスペル　スキルＩＤ）
OBJID_OFFSET_AS_SKILL_LV = 200;			// オブジェクトＩＤのオフセット（オートスペル　スキルレベル）
OBJID_OFFSET_AS_SKILL_PROB = 300;		// オブジェクトＩＤのオフセット（オートスペル　スキル発動率）





//================================================================================================
//
// グローバル変数定義
//
//================================================================================================





//================================================================================================
//
// 処理
//
//================================================================================================

/************************************************************************************************
 *
 * オートスペル設定欄の展開（再構築）.
 *
 ************************************************************************************************/
function OnClickExtractSettingAutoSpell(){

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objInput = null;
	var objSpan = null;
	var objText = null;
	var objLabel = null;


	// 再構築前の、チェックボックスの指定状況を保持
	var htmlSwitchAS = 0;
	objInput = document.getElementById("OBJID_EXTRACT_SETTING_AUTO_SPELL");
	if (objInput != undefined) {
		htmlSwitchAS = objInput.checked;
	}



	//================================================================
	// オートスペル設定欄を再構築する
	//================================================================

	// ルート要素配下を全削除
	objRoot = document.getElementById("SP_SIEN03");
	HtmlRemoveAllChild(objRoot);

	// 整形用テーブル生成
	objTable = document.createElement("table");
	objRoot.appendChild(objTable);
	objTable.setAttribute("border", "1");
	objTable.style.whiteSpace = "nowrap";

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);


	//----------------------------------------------------------------
	// ヘッダ行
	//----------------------------------------------------------------
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTr.appendChild(objTd);
	objTd.setAttribute("class", "title");
	objTd.setAttribute("id", "OBJID_TD_AUTO_SPELL_SETTING");

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objTd.appendChild(objInput);
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_EXTRACT_SETTING_AUTO_SPELL");
	objInput.setAttribute("onClick", "OnClickExtractSettingAutoSpell()");

	// ヘッダ行表示テキスト
	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_EXTRACT_SETTING_AUTO_SPELL");
	HtmlCreateTextNode("オートスペル設定 (テスト中)", objLabel);

	// 使用中表示マーカー
	objSpan = document.createElement("span");
	objTd.appendChild(objSpan);
	objSpan.setAttribute("id", "OBJID_USED_MARKER_AUTO_SPELL");



	//----------------------------------------------------------------
	// 欄が展開表示の場合は、ＨＴＭＬを構築
	//----------------------------------------------------------------
	if (htmlSwitchAS) {
		BuildUpSettingHtmlAutoSpell(objTbody);
	}


	//----------------------------------------------------------------
	// 部品を再構築したので、再設定が必要
	//----------------------------------------------------------------
	objInput = document.getElementById("OBJID_EXTRACT_SETTING_AUTO_SPELL");
	if (objInput != undefined) {
		objInput.checked = htmlSwitchAS;
	}

	// オートスペル設定変更イベントハンドラを実行（再計算はしない）
	OnChangeSettingAutoSpell(false);
}



/************************************************************************************************
 *
 * オートスペル設定欄の展開構築.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objTbody 構築対象のＴＢＯＤＹ要素
 ************************************************************************************************/
function BuildUpSettingHtmlAutoSpell(objTbody) {
	var str = "";


	var objTr = null;
	var objTd = null;
	var objInput = null;
	var objSpan = null;
	var objText = null;
	var objSelect = null;
	var objOption = null;

	var optionText = "";
	var optionValue = 0;


	//----------------------------------------------------------------
	// 簡易設定ボタン
	//----------------------------------------------------------------

	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objTd.appendChild(objInput);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "簡易設定");
	objInput.setAttribute("onClick", "OnClickEasySetUpAutoSpell()");



	//----------------------------------------------------------------
	// 設定行
	//----------------------------------------------------------------

	for (var idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);


		//----------------------------------------------------------------
		// スキル選択セレクトボックス
		//----------------------------------------------------------------
		objSelect = document.createElement("select");
		objTd.appendChild(objSelect);
		objSelect.setAttribute("id", "OBJID_AS_SKILL_ID_" + (OBJID_OFFSET_AS_SKILL_ID + idx));
		objSelect.setAttribute("onChange", "StAllCalc() | OnChangeSettingAutoSpell(true)");

		//----------------------------------------------------------------
		// オートスペルをソートする
		//----------------------------------------------------------------
		// 名称ソートするために、名称データを引っ張ってくる
		for (var asidx = 0; asidx < AutoSpellSkill.length; asidx++) {
			var objAS = AutoSpellSkill[asidx];

			// スキル名を取得する
			objAS[AUTO_SPELL_DATA_INDEX_SORT_NAME] = SkillObjNew[objAS[AUTO_SPELL_DATA_INDEX_SKILL_ID]][SKILL_DATA_INDEX_NAME];

			// オートスペル発動レベルを、名称の末尾に追加する
			objAS[AUTO_SPELL_DATA_INDEX_SORT_NAME] += objAS[AUTO_SPELL_DATA_INDEX_SKILL_LEVEL];
		}

		// 名称ソート実行
		AutoSpellSkill.sort(
			function(a, b) {
				if (a[AUTO_SPELL_DATA_INDEX_SORT_NAME] < b[AUTO_SPELL_DATA_INDEX_SORT_NAME]) return -1;
				if (a[AUTO_SPELL_DATA_INDEX_SORT_NAME] > b[AUTO_SPELL_DATA_INDEX_SORT_NAME]) return 1;
				return 0;
			}
		);

		//----------------------------------------------------------------
		// データの追加
		//----------------------------------------------------------------
		// 先頭の選択肢として指定なしを追加
		optionText = "(なし)";
		optionValue = 0;

		objOption = HtmlCreateElementOption(optionValue, optionText, objSelect);

		// 全てのオートスペルデータを走査して、スキルを追加する
		for (var asidx = 0; asidx < AutoSpellSkill.length; asidx++) {

			// 対象外スキルの場合は処理しない
			if(AutoSpellSkill[asidx][AUTO_SPELL_DATA_INDEX_ATTACKABLE] != 1){
				continue;
			}

			var skillId = AutoSpellSkill[asidx][AUTO_SPELL_DATA_INDEX_SKILL_ID];
			var skillLv = AutoSpellSkill[asidx][AUTO_SPELL_DATA_INDEX_SKILL_LEVEL];
			var skillName = SkillObjNew[skillId][SKILL_DATA_INDEX_NAME];

			optionText = "[Lv" + skillLv + "] "+ skillName;
			optionValue = AutoSpellSkill[asidx][AUTO_SPELL_DATA_INDEX_ID];

			switch (skillId) {
			case SKILL_ID_TURN_UNDEAD:
				optionText += "(式不明)";
				break;
			case SKILL_ID_STORM_GUST:
				optionText += "(10hits)";
				break;
			}

			objOption = HtmlCreateElementOption(optionValue, optionText, objSelect);
		}

		// 初期値を設定
		objSelect.value = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx];


		//----------------------------------------------------------------
		// オートスペルのソートを戻す
		//----------------------------------------------------------------
		// IDソート実行
		AutoSpellSkill.sort(
			function(a, b) {
				if (a[AUTO_SPELL_DATA_INDEX_ID] < b[AUTO_SPELL_DATA_INDEX_ID]) return -1;
				if (a[AUTO_SPELL_DATA_INDEX_ID] > b[AUTO_SPELL_DATA_INDEX_ID]) return 1;
				return 0;
			}
		);


		//----------------------------------------------------------------
		// レベル選択セレクトボックス
		//----------------------------------------------------------------
		objSelect = document.createElement("select");
		objTd.appendChild(objSelect);
		objSelect.setAttribute("id", "OBJID_AS_SKILL_LV_" + (OBJID_OFFSET_AS_SKILL_LV + idx));
		objSelect.setAttribute("onChange", "StAllCalc() | OnChangeSettingAutoSpell(true)");

		// Lv-, 1, 2, ... , 10 を設定
		for (var lvidx = 0; lvidx <= 10; lvidx++) {
			optionText = "Lv" + (lvidx == 0 ? "-" : lvidx);
			optionValue = lvidx;

			objOption = HtmlCreateElementOption(optionValue, optionText, objSelect);
		}

		// 初期値を設定
		objSelect.value = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx];


		//----------------------------------------------------------------
		// 発動率選択セレクトボックス
		//----------------------------------------------------------------
		objSelect = document.createElement("select");
		objTd.appendChild(objSelect);
		objSelect.setAttribute("id", "OBJID_AS_SKILL_PROB_" + (OBJID_OFFSET_AS_SKILL_PROB + idx));
		objSelect.setAttribute("onChange", "StAllCalc() | OnChangeSettingAutoSpell(true)");

		for (var probidx = 0; probidx < AUTO_SPELL_PROB_ARRAY.length; probidx++) {
			optionText = (AUTO_SPELL_PROB_ARRAY[probidx] / 10) + "%";
			optionValue = probidx;

			objOption = HtmlCreateElementOption(optionValue, optionText, objSelect);
		}

		// 初期値を設定
		objSelect.value = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx];

	}
}





/************************************************************************************************
 *
 * オートスペル設定　設定変更イベントハンドラ.
 *
 *-----------------------------------------------------------------------------------------------
 * @param bCalculate 再計算フラグ
 ************************************************************************************************/
function OnChangeSettingAutoSpell(bCalculate){

	// 再計算フラグが指定されている場合は、再計算を行う
	if (bCalculate) AutoCalc("OnChangeSettingAutoSpell");

	// オートスペル設定が指定されているかをチェック
	var bSet = false;
	for (var idx = 0 ; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
		bSet = true;
		if (n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx] != 0) break;
		if (n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx] != 0) break;
		if (n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx] != 0) break;
		bSet = false;
	}


	// 設定状況に応じて、ヘッダの内容を切り替え
	if (bSet) {
		document.getElementById('OBJID_TD_AUTO_SPELL_SETTING').style.backgroundColor = "#FF7777";
		myInnerHtml("OBJID_USED_MARKER_AUTO_SPELL","　<B>使用中</B>",0);
	}
	else{
		document.getElementById('OBJID_TD_AUTO_SPELL_SETTING').style.backgroundColor = "#DDDDFF";
		myInnerHtml("OBJID_USED_MARKER_AUTO_SPELL","",0);
	}
 }





/************************************************************************************************
 *
 * オートスペルの簡易設定を行う.
 *
 ************************************************************************************************/
function OnClickEasySetUpAutoSpell(){

	var idx = 0;

	var objSelect = null;

	var asidx = 0;
	var asIdArray = new Array();


	//----------------------------------------------------------------
	// 初めに、デフォルト（なし）に設定しておく
	//----------------------------------------------------------------
	for (idx = 0 ; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
		objSelect = document.getElementById("OBJID_AS_SKILL_ID_" + (OBJID_OFFSET_AS_SKILL_ID + idx));
		objSelect.value = 0;
		objSelect = document.getElementById("OBJID_AS_SKILL_LV_" + (OBJID_OFFSET_AS_SKILL_LV + idx));
		objSelect.value = 0;
		objSelect = document.getElementById("OBJID_AS_SKILL_PROB_" + (OBJID_OFFSET_AS_SKILL_PROB + idx));
		objSelect.value = 0;
	}



	//----------------------------------------------------------------
	// 装備のオートスペルを設定する
	//----------------------------------------------------------------

	// オートスペル定義のリストを取得
	var autoSpellSpArray = new Array().concat(
		GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL),
		GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED),
		GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL),
		GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL),
		GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED),
		GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL)
	);

	for (idx = 0; idx < autoSpellSpArray.length; idx++) {

		// アイテムのＳＰ定義値を取得（オートスペルＩＤが設定されている）
		var asId = autoSpellSpArray[idx];

		// 当該オートスペルが設定対象外の場合、処理しない
		if (AutoSpellSkill[asId][1] != 1) {
			continue;
		}

		// 当該オートスペルが物理攻撃時オートスペルでない場合、処理しない
		switch (AutoSpellSkill[asId][5]) {
		case AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK:
		case AUTO_SPELL_TRIGGER_SHORTRANGE_ATTACK:
		case AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK:
		case AUTO_SPELL_TRIGGER_ANY_ATTACK:
			break;
		default:
			continue;
		}

		asIdArray[asidx] = asId;
		asidx++;
	}



	//----------------------------------------------------------------
	// カードのオートスペルを設定する
	//----------------------------------------------------------------
	for(var eqpidx = 0; eqpidx < n_A_card.length; eqpidx++){

		// 該当装備箇所のアイテムデータを取得
		var cardData = CardObjNew[n_A_card[eqpidx]];

		for(var j2 = 0; ; j2 += 2) {

			// アイテムのＳＰ定義ＩＤを取得
			var cardSpId = cardData[CARD_DATA_INDEX_SPBEGIN + j2];

			// ＳＰ定義終了ならば処理を抜ける
			if (cardSpId == ITEM_SP_END) {
				break;
			}

			// ＳＰ定義がオートスペル定義で無い場合、処理しない
			if ((cardSpId != ITEM_SP_AUTO_SPELL)
				&& (cardSpId != ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED)
				&& (cardSpId != ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL)) {
				continue;
			}

			// アイテムのＳＰ定義値を取得（オートスペルＩＤが設定されている）
			var asId = cardData[CARD_DATA_INDEX_SPBEGIN + j2 + 1];

			// 当該オートスペルが設定対象外の場合、処理しない
			if (AutoSpellSkill[asId][1] != 1) {
				continue;
			}

			// 当該オートスペルが物理攻撃時オートスペルでない場合、処理しない
			switch (AutoSpellSkill[asId][5]) {
			case AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK:
			case AUTO_SPELL_TRIGGER_SHORTRANGE_ATTACK:
			case AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK:
			case AUTO_SPELL_TRIGGER_ANY_ATTACK:
				break;
			default:
				continue;
			}

			asIdArray[asidx] = asId;
			asidx++;
		}
	}



	//================================================================
	//
	// 特殊条件で追加されるオートスペル
	//
	//================================================================

	//----------------------------------------------------------------
	// 「マジカルブレード」の、精錬値による効果
	//----------------------------------------------------------------
	var refined = -1;
	var itemCountRight = EquipNumSearch(ITEM_ID_MAGICAL_BLADE, EQUIP_REGION_ID_ARMS);
	var itemCountLeft = EquipNumSearch(ITEM_ID_MAGICAL_BLADE, EQUIP_REGION_ID_ARMS_LEFT);
	// 装備状況によって、参照する精錬値を切り替える
	if ((itemCountRight > 0) && (itemCountLeft > 0)) {
		if (n_A_Weapon_ATKplus >= n_A_Weapon2_ATKplus) {
			refined = n_A_Weapon_ATKplus;
		}
		else {
			refined = n_A_Weapon2_ATKplus;
		}
	}
	else if (itemCountRight > 0) {
		refined = n_A_Weapon_ATKplus;
	}
	else if (itemCountLeft > 0) {
		refined = n_A_Weapon2_ATKplus;
	}
	// 精錬値によって、発動するオートスペルを追加
	if (refined >= 0) {
		asIdArray[asidx] = 129;
		asidx++;
	}
	if (refined >= 2) {
		asIdArray[asidx] = 130;
		asidx++;
	}
	if (refined >= 4) {
		asIdArray[asidx] = 131;
		asidx++;
	}
	if (refined >= 6) {
		asIdArray[asidx] = 132;
		asidx++;
	}
	if (refined >= 8) {
		asIdArray[asidx] = 133;
		asidx++;
	}


	//----------------------------------------------------------------
	// 「死神の名簿」の、職業による効果
	//----------------------------------------------------------------
	var itemCountRight = EquipNumSearch(ITEM_ID_SHINIGAMINO_MEIBO, EQUIP_REGION_ID_ARMS);
	var itemCountLeft = EquipNumSearch(ITEM_ID_SHINIGAMINO_MEIBO, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_SAGE) {
			asIdArray[asidx] = 138;
			asidx++;
		}
	}


	//----------------------------------------------------------------
	// 「グロリアスクロー」の、精錬による効果
	//----------------------------------------------------------------
	var itemCountRight = EquipNumSearch(ITEM_ID_GLORIOUS_CLAW, EQUIP_REGION_ID_ARMS);
	var itemCountLeft = EquipNumSearch(ITEM_ID_GLORIOUS_CLAW, EQUIP_REGION_ID_ARMS_LEFT);
	if (((itemCountRight > 0) && (n_A_Weapon_ATKplus >= 9))
		|| ((itemCountLeft > 0) && (n_A_Weapon2_ATKplus >= 9))) {
		asIdArray[asidx] = 108;
		asidx++;
	}


	//----------------------------------------------------------------
	// 「女王フェイスワームの足」の、効果
	//----------------------------------------------------------------
	var itemCountRight = EquipNumSearch(ITEM_ID_ZYOO_FACEWORMNO_ASHI, EQUIP_REGION_ID_ARMS);
	var itemCountLeft = EquipNumSearch(ITEM_ID_ZYOO_FACEWORMNO_ASHI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		asIdArray[asidx] = 154;
		asidx++;
	}


	//----------------------------------------------------------------
	// 「慰める者カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_NAGUSAMERUMONO)) > 0) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_PRIEST) {
			asIdArray[asidx] = 95;
			asidx++;
		}
	}


	//----------------------------------------------------------------
	// 「グリフォンカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GRIFFIN)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_SWORDMAN) {
			asIdArray[asidx] = 96;
			asidx++;
		}
	}




	//================================================================
	//
	// 最終的なオートスペルで設定を構築
	//
	//================================================================

	for (var idx = 0 ; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
		var asId = asIdArray[idx];

		// 全てのデータを設定し終わったら、処理終了
		if (asId == undefined) {
			break;
		}

		// 発動するスキル
		objSelect = document.getElementById("OBJID_AS_SKILL_ID_" + (OBJID_OFFSET_AS_SKILL_ID + idx));
		objSelect.value = AutoSpellSkill[asId][0];

		// 発動するレベル
		objSelect = document.getElementById("OBJID_AS_SKILL_LV_" + (OBJID_OFFSET_AS_SKILL_LV + idx));
		objSelect.value = AutoSpellSkill[asId][3];

		// マジカルブレードの特殊処理（邪魔）
		if(129 <= asIdArray[idx] && asIdArray[idx] <= 133) {
			if((n_A_Equip[EQUIP_REGION_ID_ARMS] == 1658 && n_A_Weapon_ATKplus >= 10)
				|| (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == 1658 && n_A_Weapon2_ATKplus >= 10)) {
					objSelect.value = 5;
			}
		}

		// 発動率
		objSelect = document.getElementById("OBJID_AS_SKILL_PROB_" + (OBJID_OFFSET_AS_SKILL_PROB + idx));
		objSelect.value = AutoSpellSkill[asId][4];

		// 発動率が規定の発動率リストに存在するかをチェック
		if(AutoSpellSkill[asId][4] != 0){
			var probidx = 0;
			for (probidx = 0; probidx < AUTO_SPELL_PROB_ARRAY.length; probidx++) {
				if (AUTO_SPELL_PROB_ARRAY[probidx] == (AutoSpellSkill[asId][4] * 10)) {
					objSelect.value = probidx;
					break;
				}
			}
			// 存在しない場合はエラーにしておく
			if (probidx == AUTO_SPELL_PROB_ARRAY.length) {
				objSelect.value = 0;
			}
		}
	}


	// オートスペル設定変更イベントを実行
	OnChangeSettingAutoSpell(true);
}