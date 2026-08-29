/**
 * 被ダメージ計算関連の分割（Phase 3c）。
 *
 * calcReceivedDamage / calcReceivedMagicDamage / getResistanceOfEnvironment /
 * BattleHiDamMaxPain を battlecalc.js から移動。本文はバイト単位で不変。
 *
 * g_receiveDamageAverage / wRef1 / wRef2 / wRef3 / w_HiDam は元 battlecalc.js の
 * モジュールレベル scratch 変数のうち、このファイル内の関数からのみ参照されていた
 * （battlecalc.js 外・他関数からの参照なしを確認済み）ため、このファイルのモジュール
 * ローカル変数として移設した。
 */
import { HtmlCreateTextNode, HtmlRemoveAllChild, myInnerHtml } from "../runtime/util.js";
import { CCharaConfCustomDef } from "../chara/CCharaConfCustomDef.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CARD_ID_ENCHANT_UCHUKONGEN_GENZYU } from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, TimeItemNumSearch } from "../chara/chara.js";
import {
    CHARA_DATA_INDEX_DEF_DIV, CHARA_DATA_INDEX_DEF_MINUS, CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MDEF_DIV,
    CHARA_DATA_INDEX_MDEF_MINUS
} from "../const/EnumCharaDataIndex.js";
import {
    ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_PSYCO, ELM_ID_UNDEAD, ELM_ID_VANITY
} from "../const/EnumElmId.js";
import {
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_SHIELD
} from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_POWER } from "../const/EnumItemDataIndex.js";
import {
    ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL, ITEM_SP_REFLECT_PHYSICAL_DAMAGE, ITEM_SP_RESIST_BOSS,
    ITEM_SP_RESIST_ELM_VANITY, ITEM_SP_RESIST_LONGRANGE, ITEM_SP_RESIST_MONSTER_ELM_VANITY, ITEM_SP_RESIST_NOTBOSS,
    ITEM_SP_RESIST_PLAYER_ALL, ITEM_SP_RESIST_PLAYER_DORAM, ITEM_SP_RESIST_PLAYER_HUMAN, ITEM_SP_RESIST_RACE_HUMAN,
    ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER, ITEM_SP_RESIST_RACE_SOLID, ITEM_SP_RESIST_SIZE_SMALL
} from "../const/EnumItemSpId.js";
import { MONSTER_BOSSTYPE_BOSS } from "../const/EnumMonsterBossType.js";
import {
    MONSTER_DATA_EXTRA_INDEX_ATK_MAX, MONSTER_DATA_EXTRA_INDEX_ATK_MIN, MONSTER_DATA_EXTRA_INDEX_MATK_MAX,
    MONSTER_DATA_INDEX_ELEMENT, MONSTER_DATA_INDEX_LEVEL, MONSTER_DATA_INDEX_QUALIFIED, MONSTER_DATA_INDEX_RACE,
    MONSTER_DATA_INDEX_RANGE, MONSTER_DATA_INDEX_STR
} from "../const/EnumMonsterDataIndex.js";
import {
    RACE_ID_ANIMAL, RACE_ID_DEMON, RACE_ID_FISH, RACE_ID_HUMAN, RACE_ID_PLANT
} from "../const/EnumRaceId.js";
import { zokusei } from "../data/element-affinity.dat.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, NumSearch } from "../bridge/stallcalc-bridge.js";
import {
    ITEM_ID_ABANDONED_CLOAK, ITEM_ID_ANCIENT_MEGALIS_MANT, ITEM_ID_AURORA_CURTAIN_ROBE, ITEM_ID_BLACK_VEIL,
    ITEM_ID_BURNING_FISH_CLOAK, ITEM_ID_DISCARDED_CAPE, ITEM_ID_DISTORTED_MAGIC_HOOD, ITEM_ID_DRAGON_SCALE_SHAWL,
    ITEM_ID_FROZEN_SCALE_SHAWL, ITEM_ID_GOOGLE_HAT, ITEM_ID_KETTONO_RYU_BOSHI, ITEM_ID_KIGURUMI_BEARDOLL,
    ITEM_ID_MARAN_KAIZOKUDANBO, ITEM_ID_NEKOKATAR_TSUNA, ITEM_ID_NEKORYOTEKEN_TACHIUO,
    ITEM_ID_NEKORYOTEONO_KUROMAGURO, ITEM_ID_NEKORYOTETSUE_KAZIKI, ITEM_ID_NEKOTANKEN_AZI, ITEM_ID_NEKOYUMI_KANI,
    ITEM_ID_NIZIIRONO_TSUBASA, ITEM_ID_OZ_MAGMA_HOOD, ITEM_ID_REQUIEM_BOOTS, ITEM_ID_REQUIEM_CLAYMORE,
    ITEM_ID_REQUIEM_GREATBOW, ITEM_ID_REQUIEM_KATAR, ITEM_ID_REQUIEM_LANCE, ITEM_ID_REQUIEM_MANT,
    ITEM_ID_REQUIEM_ROBE, ITEM_ID_REQUIEM_SHIELD, ITEM_ID_REQUIEM_SUIT, ITEM_ID_REQUIEM_TWOHANDAXE,
    ITEM_ID_REQUIEM_WIZARDSTUFF, ITEM_ID_SHINKAI_SEIBUTSUNO_MANT, ITEM_ID_TAURUS_HAT, ITEM_ID_USUDUKIYONO_BOSHI,
    ITEM_ID_YAGIGENO_MUFFLER, ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE, ItemObjNew
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, MOB_CONF_PLAYER_ID_SHUZOKU,
    MOB_CONF_PLAYER_ID_SHUZOKU_DORAM, MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import { MONSTER_ID_PLAYER } from "../monster/monster.dat.js";
import { GetMonseterElmBasicType } from "../monster/monster.h.js";
import {
    MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04, MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO,
    MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU, MONSTER_GROUP_ID_CHIKA_HAISUIRO, MONSTER_GROUP_ID_EIYUENCHANT,
    MONSTER_GROUP_ID_FROZEN_MEMORY, MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA,
    MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F, MONSTER_GROUP_ID_HEARTHUNTER, MONSTER_GROUP_ID_JOR_BACK3,
    MONSTER_GROUP_ID_MANUKU, MONSTER_GROUP_ID_MAZINDEN, MONSTER_GROUP_ID_MOROC,
    MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO, MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO,
    MONSTER_GROUP_ID_NEZIRIAN_TEKOKU, MONSTER_GROUP_ID_OS_NIZI_SOSAKU, MONSTER_GROUP_ID_OZNO_MEIRO,
    MONSTER_GROUP_ID_PAGE250, MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC, MONSTER_GROUP_ID_ROCKRIDGE,
    MONSTER_GROUP_ID_SEITAI, MONSTER_GROUP_ID_SPRENDED, MONSTER_GROUP_ID_SUTERARETA_ANA_01,
    MONSTER_GROUP_ID_SUTERARETA_ANA_02, MONSTER_GROUP_ID_THANATOS, MONSTER_GROUP_ID_TOKEITO, MONSTER_GROUP_ID_VERNAR,
    MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI, MonsterGroupObj
} from "../monster/monstergroup.dat.js";
import {
    n_A_BODY_DEF_PLUS, n_A_BodyZokusei, n_A_DEX, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_LUK, n_A_SHIELD_DEF_PLUS,
    n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_DEATH_BOUND, SKILL_ID_DEFENDER, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_ENERGY_COAT, SKILL_ID_HASAICHU,
    SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_IRON_HOWLING, SKILL_ID_KONGO, SKILL_ID_NATURE_PROTECTION,
    SKILL_ID_RANGER_MAIN, SKILL_ID_REFLECT_SHIELD, SKILL_ID_SERE_SUPPORT_SKILL, SKILL_ID_SHIELD_SPELL_REFLECT,
    SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, SKILL_ID_UZUKUMARU
} from "../skill/skill.dat.js";
import { TIME_ITEM_ID_WOLF_HEZIN } from "../equip/timeitem.dat.js";
import { CBattleCalcInfo } from "./CBattleCalcInfo.js";
import { __DIG3, g_confDataNizi, g_objCharaConfCustomDef } from "../runtime/global.js";
import { CS } from "./calc-state.js";
import { GetMres, GetRes } from "../chara/hmjob.js";
import { n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_SieldSp, n_tok } from "../runtime/ro4-state.js";
import {
    ID_BUFF_MANUK_ISHI, ID_BUFF_VESPER_HONEY, UsedSkillSearch, n_A_PassSkill4, n_A_PassSkill7
} from "../skill/skillstate.js";
import { BattleCalc999, DamageModifierOfArea } from "../bridge/battlecalc-bridge.js";

let g_receiveDamageAverage = 0;
let wRef1 = [];
let wRef2 = [];
let wRef3 = [];
let w_HiDam = [];

/**
 * 被ダメージを計算する. 戻り値を持つが関数内部で被ダメージ表示も行っている
 * @param {*} charaData
 * @param {*} specData
 * @param {*} mobData
 * @param {*} attackMethodConfArray
 * @param {*} objCell
 * @param {*} skillRatioRaw 被ダメージ計算設定「敵スキル倍率」の生値（`OBJID_ENEMY_SKILL_RATIO`
 *   の`.value`。呼び出し元がDOMから読んで渡す。要素が無い場合は `undefined`）
 * @param {*} attackElementalRaw 被ダメージ計算設定「敵スキル属性」の生値
 *   （`OBJID_ENEMY_SKILL_ELEMENT` の`.value`。同上）
 * @returns {number} 回避率を考慮しない被ダメージ
 */
export function calcReceivedDamage(charaData, specData, mobData, attackMethodConfArray, objCell = null, skillRatioRaw = undefined, attackElementalRaw = undefined){
	var sklLv = 0;
	w_HiDam = new Array();
	let idx = 0;
	/* ATK依存攻撃力: ボス耐性などの減衰を受ける */
	let mobMaxATK = mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MAX];
	let mobMinATK = mobData[MONSTER_DATA_EXTRA_INDEX_ATK_MIN];
	/* STR依存攻撃力 ボス耐性などの減衰を受けない */
	let mobStATK = mobData[MONSTER_DATA_INDEX_LEVEL] * 2;
	if(mobData[MONSTER_DATA_INDEX_QUALIFIED] == 1){
		mobStATK = mobData[MONSTER_DATA_INDEX_LEVEL] + mobData[MONSTER_DATA_INDEX_STR];
	}
	if(mobMinATK <= mobStATK) mobMinATK = mobStATK;
	if(mobMinATK > mobMaxATK){
		mobMinATK = mobMaxATK - 1;
		mobStATK = mobMaxATK - 1;
	}
	mobMinATK -= mobStATK;
	mobMaxATK -= mobStATK;
	w_HiDam[0] = mobMinATK;
	w_HiDam[1] = (mobMinATK *5 + mobMaxATK) /6;
	w_HiDam[2] = (mobMinATK *4 + mobMaxATK *2) /6;
	w_HiDam[3] = (mobMinATK + mobMaxATK) /2;
	w_HiDam[4] = (mobMinATK *2 + mobMaxATK *4) /6;
	w_HiDam[5] = (mobMinATK + mobMaxATK *5) /6;
	w_HiDam[6] = mobMaxATK;
	if(mobMinATK == mobMaxATK){
		for(var i=0;i<=6;i++) w_HiDam[i] = mobMaxATK;
	}
	
	if (skillRatioRaw === undefined || attackElementalRaw === undefined) {
		return;
	}
	const skill_ratio = Math.min(60000, Math.max(100, Number(skillRatioRaw) || 100));
	const attack_elemental = Number(attackElementalRaw);
	w_HiDam = w_HiDam.map(damage => Math.floor(damage * skill_ratio / 100));
	mobStATK = Math.floor(mobStATK * skill_ratio / 100);

	/** ダメージ耐性値 */
	let wBHD;

	// 特定モンスター耐性
	wBHD = getResistanceOfEnvironment(mobData[0]);
	w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));

	/**
	 * 公式サイトで「◯型モンスターから受けるダメージ - ◯%」と表記される
	 * サイズ耐性
	 */
	{
		wBHD = n_tok[ITEM_SP_RESIST_SIZE_SMALL + mobData[17]];
		wBHD += n_tok[ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL + mobData[17]];
		wBHD = Math.min(95, wBHD);
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	/**
	 * 公式サイトで「ボスモンスターから受けるダメージ-◯%」
	 * または「ボスモンスターから受けるダメージ-◯%」と表記される
	 * ボス／一般耐性
	 */
	{
		wBHD = (mobData[20] == MONSTER_BOSSTYPE_BOSS) ? n_tok[ITEM_SP_RESIST_BOSS] : n_tok[ITEM_SP_RESIST_NOTBOSS];
		wBHD = Math.min(95, wBHD);
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	/** 属性相性: VOID攻撃（通常攻撃）はスキップ。無属性(ELM_ID_VANITY)は適用する */
	if (attack_elemental >= ELM_ID_VANITY) {
		wBHD = zokusei[n_A_BodyZokusei * 10 + 1][attack_elemental] + 100;
		w_HiDam = w_HiDam.map(damage => Math.floor(damage * wBHD /100));
	}

	/**
	 * 公式サイトで「◯属性攻撃で受けるダメージ - ◯%」と表記される
	 * 属性耐性
	 */
	{
		const elm_for_resist = (attack_elemental >= ELM_ID_VANITY) ? attack_elemental : ELM_ID_VANITY;
		wBHD = n_tok[ ITEM_SP_RESIST_ELM_VANITY + elm_for_resist ];
		wBHD = Math.min(95, wBHD);
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	/**
	 * 公式サイトで「◯属性モンスターから受けるダメージ-◯%」と表記される
	 * モンスター属性耐性
	 */
	{
		wBHD = n_tok[ITEM_SP_RESIST_MONSTER_ELM_VANITY + Math.floor(mobData[18] / 10)];
		wBHD = Math.min(95, wBHD);
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	// これ以降の耐性は素手ATKにも効果がある
	w_HiDam = w_HiDam.map(damage => damage + mobStATK);

	//--------------------------------
	// 種族耐性
	//--------------------------------
	{
		wBHD = 0;
		// 対プレイヤーでない場合
		if (mobData[0] != MONSTER_ID_PLAYER) {
			// 種族耐性をそのまま適用
			wBHD += n_tok[ITEM_SP_RESIST_RACE_SOLID + mobData[19]];
			// 人間形（プレイヤー除く）の適用
			if (mobData[19] == RACE_ID_HUMAN) {
				wBHD += n_tok[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER];
			}
		}
		// 対プレイヤーの場合
		else {
			// 対プレイヤー耐性の適用
			wBHD += n_tok[ITEM_SP_RESIST_PLAYER_ALL];
			// 対プレイヤー設定の種族に基づき、参照値を変更
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
				// 種族が人間に設定されている場合は、人間耐性を適用
				case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
					wBHD += n_tok[ITEM_SP_RESIST_RACE_HUMAN];
					wBHD += n_tok[ITEM_SP_RESIST_PLAYER_HUMAN];
					break;
				// 種族がドラムに設定されている場合は、ドラム耐性を適用
				case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
					wBHD += n_tok[ITEM_SP_RESIST_PLAYER_DORAM];
					break;
			}
		}
		wBHD = Math.min(95, wBHD);
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	//--------------------------------
	// 遠距離耐性
	//--------------------------------
	if(mobData[12] >= 4){
		wBHD = n_tok[ITEM_SP_RESIST_LONGRANGE];
		wBHD = Math.min(95, wBHD);
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	/**
	 * 除算Def, Res, 減算Def によるダメージ減少
	 */
	const res = GetRes();
	w_HiDam = w_HiDam.map(damage => {
		// 除算Defによるダメージ減少
	    let new_damage = Math.floor(damage * (4000 + charaData[CHARA_DATA_INDEX_DEF_DIV]) / (4000 + charaData[CHARA_DATA_INDEX_DEF_DIV] * 10));
		// RES によるダメージ減少
		const decay = Math.floor(new_damage * (1 - (2000 + res) / (2000 + 5 * res)));
		new_damage -= decay;
		// 減算Defによるダメージ減少
		new_damage -= charaData[CHARA_DATA_INDEX_DEF_MINUS];
		return new_damage;
	});

	/** スキルによるダメージ減少効果 */
	{
		//--------------------------------
		// 「アコライト　ディバインプロテクション」の効果
		//--------------------------------
		if ((GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_UNDEAD)
			|| (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON)) {

			wBHD = Math.round((3 + 4 / 100 * n_A_BaseLV) * Math.max(LearnedSkillSearch(SKILL_ID_DIVINE_PROTECTION), UsedSkillSearch(SKILL_ID_DIVINE_PROTECTION)));

			for (i = 0; i <= 6; i++) {
				w_HiDam[i] -= wBHD;
			}
		}

		//--------------------------------
		// 「レンジャー　レンジャーメイン」の効果
		//--------------------------------
		switch (mobData[MONSTER_DATA_INDEX_RACE]) {
			case RACE_ID_ANIMAL:
			case RACE_ID_PLANT:
			case RACE_ID_FISH:
				for (i = 0; i <= 6; i++) {
					const ranger_main_lv = Math.max(LearnedSkillSearch(SKILL_ID_RANGER_MAIN), UsedSkillSearch(SKILL_ID_RANGER_MAIN));
					w_HiDam[i] -= 5 * ranger_main_lv;
				}
		}

		//--------------------------------
		// 「メカニック　火と大地の研究」の効果
		//--------------------------------
		if ((GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_EARTH)
			|| (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_FIRE)) {

			for (i = 0; i <= 6; i++) {
				w_HiDam[i] -= 10 * Math.max(LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU), UsedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU));
			}

		}

		//--------------------------------
		// 「拳聖　太陽の安楽」の効果
		//--------------------------------
		if (UsedSkillSearch(SKILL_ID_TAIYONO_ANRAKU)) {
			switch (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI)) {
				case 1:	// 今日の日付
					let today = (new Date()).getDate();
					if (today % 2 == 1)	break; // 太陽の日ではない（奇数）
				case 0:	// 無条件発動
				case 2: // 太陽の日
					wBHD = Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 2);
					for (i = 0; i <= 6; i++) {
						w_HiDam[i] -= wBHD;
					}
			}
		}

		//--------------------------------
		// 「クルセイダー　ディフェンダー」の効果
		//--------------------------------
		if (mobData[MONSTER_DATA_INDEX_RANGE] >= 4){
			sklLv = Math.max(0, UsedSkillSearch(SKILL_ID_DEFENDER), g_confDataNizi[CCharaConfNizi.CONF_ID_DEFENDER]);

			wBHD = 5 + 15 * sklLv;

			for (i = 0; i <= 6; i++) {
				w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
			}
		}

		//--------------------------------
		// 「マジシャン　エナジーコート」の効果
		//--------------------------------
		const energy_coat = Math.max(UsedSkillSearch(SKILL_ID_ENERGY_COAT), n_A_PassSkill7[50]);
		wBHD = 6 * energy_coat;
		w_HiDam = w_HiDam.map(damage => damage - Math.floor(damage * wBHD /100));
	}

	/** 排他スキルによるダメージ減少効果 */
	{
		let ratio = 0;
		let prefetch = 0;
		if (TimeItemNumSearch(TIME_ITEM_ID_WOLF_HEZIN)) {
			// ストーンスキン
			ratio = Math.max(ratio, 20);
		}
		if (UsedSkillSearch(SKILL_ID_KONGO)) {
			// 金剛
			ratio = Math.max(ratio, 90);
		}
		if (UsedSkillSearch(SKILL_ID_UZUKUMARU)) {
			// うずくまる
			if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM) {
				ratio = Math.max(ratio, 50);
			} else {
				ratio = Math.max(ratio, 80);
			}
		}
		prefetch = UsedSkillSearch(SKILL_ID_NATURE_PROTECTION);
		if (prefetch > 0) {
			// ネイチャープロテクション
			ratio = Math.max(ratio, [0, 30, 45, 60, 80, 95][prefetch]);
		}
		prefetch = UsedSkillSearch(SKILL_ID_IRON_HOWLING);
		if (prefetch > 0) {
			// アイアンハウリング
			ratio = Math.max(ratio, 15 + 5 * prefetch);
		}
		for (let i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * ratio / 100);
		}
	}

	//--------------------------------
	// YEサーバーなどエリア全体にかかるダメージ補正
	//--------------------------------
	for (i = 0; i <= 6; i++) {
		w_HiDam[i] = DamageModifierOfArea(mobData, w_HiDam[i]);
	}

	// 最小ダメージ保証
	for(i = 0; i <= 6; i++){
		if(w_HiDam[i] < 1) w_HiDam[i] = 1;
	}

	// 「ゼファー」によるダメージ無効化
	if(mobData[12] >= 4){
		if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 26){
			for(i = 0; i <= 6; i++) w_HiDam[i] = 0;
		}
	}

	// 「ゴスペル」によるダメージ半減
	{
		if(n_A_PassSkill4[10]) for(i=0;i<=6;i++) w_HiDam[i] = Math.floor(w_HiDam[i] / 2);
		w_HiDam[0] = Math.floor(w_HiDam[0]);
		w_HiDam[6] = Math.floor(w_HiDam[6]);
	}

	// wBHD=0;
	// for(i = 0; i <= 6; i++) wBHD += w_HiDam[i];
	// wBHD = Math.round(wBHD / 7);
	// 壁目線では最大被ダメが知りたいはずなので平均は取らない
	wBHD = w_HiDam[6];

	/** 反射ダメージの計算 */
	{
		var name64 = "平均被ダメージ(仮)";
		var wRefStr = "";
		wRef1 = new Array();
		wRef2 = new Array();
		wRef3 = new Array();

		var w_sp_rs=1;
		if(UsedSkillSearch(SKILL_ID_KONGO)) w_sp_rs = 10;
		if(UsedSkillSearch(SKILL_ID_UZUKUMARU)) w_sp_rs = 20;

		var w_MaxHP = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * n_A_BaseLV / 100);

		if(UsedSkillSearch(SKILL_ID_REFLECT_SHIELD)){
			var wRSnum = (10 + 3 * UsedSkillSearch(SKILL_ID_REFLECT_SHIELD)) * w_sp_rs;
			wRef1[0] = Math.floor(wBHD * wRSnum / 100);
			wRef1[1] = Math.floor(w_HiDam[0] * wRSnum / 100);
			wRef1[2] = Math.floor(w_HiDam[6] * wRSnum / 100);
			for(var i=0;i<=2;i++) if(wRef1[i] > w_MaxHP) wRef1[i] = w_MaxHP;
			wRefStr += "<BR><Font color='Blue'><B>"+ __DIG3(wRef1[0]) +"("+ __DIG3(wRef1[1]) +"～"+ __DIG3(wRef1[2]) +")</B>";
			name64 += "<BR><Font color=Blue><B>反射ダメージ</B></Font>";
		}
		if(n_tok[ITEM_SP_REFLECT_PHYSICAL_DAMAGE]){
			var w = n_tok[71] * w_sp_rs;
			wRef2[0] = Math.floor(wBHD * w / 100);
			wRef2[1] = Math.floor(w_HiDam[0] * w / 100);
			wRef2[2] = Math.floor(w_HiDam[6] * w / 100);
			for(var i=0;i<=2;i++) if(wRef2[i] > w_MaxHP) wRef2[i] = w_MaxHP;
			wRefStr += "<BR><Font color='Blue'><B>"+ __DIG3(wRef2[0]) +"("+ __DIG3(wRef2[1]) +"～"+ __DIG3(wRef2[2]) +")</B>";
			name64 += "<BR><Font color=Blue><B>反射ダメージ</B></Font>";
		}
		if(UsedSkillSearch(SKILL_ID_SHIELD_SPELL_REFLECT)){
			var wRef_SP;
			if(UsedSkillSearch(SKILL_ID_SHIELD_SPELL_REFLECT) == 1) wRef_SP = (ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_POWER] / 10) * w_sp_rs;
			else wRef_SP = (n_SieldSp[UsedSkillSearch(SKILL_ID_SHIELD_SPELL_REFLECT)] / 10) * w_sp_rs;
			wRef3[0] = Math.floor(wBHD * wRef_SP / 100);
			wRef3[1] = Math.floor(w_HiDam[0] * wRef_SP / 100);
			wRef3[2] = Math.floor(w_HiDam[6] * wRef_SP / 100);
			for(var i=0;i<=2;i++) if(wRef3[i] > w_MaxHP) wRef3[i] = w_MaxHP;
			wRefStr += "<BR><Font color='Blue'><B>"+ __DIG3(wRef3[0]) +"("+ __DIG3(wRef3[1]) +"～"+ __DIG3(wRef3[2]) +")</B>";
			name64 += "<BR><Font color=Blue><B>反射ダメージ</B></Font>";
		}
		// 「デスバウンド」、「破砕柱」専用の情報オブジェクト
		let battleCalcInfo = new CBattleCalcInfo();
		battleCalcInfo.skillId = n_A_ActiveSkill;
		battleCalcInfo.skillLv = n_A_ActiveSkillLV;	
		if(n_A_ActiveSkill == SKILL_ID_DEATH_BOUND){
			if(CS.n_DEATH_BOUND[3]==0){
				var wRef_DB;
				wRef_DB = (500 + 100 * n_A_ActiveSkillLV) * w_sp_rs;
				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
					case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
						wRef_DB = (75 + 5 * n_A_ActiveSkillLV) * w_sp_rs;
						break;
				}
				var wRef4 = new Array();
				CS.n_DEATH_BOUND[0] = Math.floor((w_HiDam[0] * 0.7) * wRef_DB / 100);
				CS.n_DEATH_BOUND[1] = Math.floor((wBHD * 0.7) * wRef_DB / 100);
				CS.n_DEATH_BOUND[2] = Math.floor((w_HiDam[6] * 0.7) * wRef_DB / 100);
				CS.n_DEATH_BOUND[3] = 1;
				BattleCalc999(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);
				CS.n_DEATH_BOUND[3] = 0;
				wBHD = Math.floor((wBHD * 0.3) * wRef_DB / 100);
				w_HiDam[0] = Math.floor((w_HiDam[0] * 0.3) * wRef_DB / 100);
				w_HiDam[6] = Math.floor((w_HiDam[6] * 0.3) * wRef_DB / 100);
			}
		}
		if(n_A_ActiveSkill == SKILL_ID_HASAICHU){
			if(CS.n_DEATH_BOUND[3]==0){
				var wRef_DB;
				wRef_DB = (100 + 20 * n_A_ActiveSkillLV) * w_sp_rs;
				var wRef4 = new Array();
				CS.n_DEATH_BOUND[0] = Math.floor(w_HiDam[0] * wRef_DB / 100);
				CS.n_DEATH_BOUND[1] = Math.floor(wBHD * wRef_DB / 100);
				CS.n_DEATH_BOUND[2] = Math.floor(w_HiDam[6] * wRef_DB / 100);
				CS.n_DEATH_BOUND[3] = 1;
				if(attackMethodConfArray[0].GetOptionValue(2) != 0){
					CS.n_DEATH_BOUND[0] = Math.floor(attackMethodConfArray[0].GetOptionValue(2) * wRef_DB / 100);
					CS.n_DEATH_BOUND[1] = CS.n_DEATH_BOUND[0];
					CS.n_DEATH_BOUND[2] = CS.n_DEATH_BOUND[0];
				}
				BattleCalc999(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);
				CS.n_DEATH_BOUND[3] = 0;
			}
		}
	}

	if (objCell) {
		HtmlRemoveAllChild(objCell);
		HtmlCreateTextNode(__DIG3(Math.floor(wBHD)), objCell);
	} else {
		// 現行バージョンでは詳細な「戦闘結果」テーブルが非表示になっているから意味が無いコード
		myInnerHtml("B_AveAtk", __DIG3(wBHD) + "<BR>" + " (" + __DIG3(w_HiDam[0]) + "～" + __DIG3(w_HiDam[6]) + ")" + wRefStr, 0);
	}

	g_receiveDamageAverage = wBHD;

	return wBHD;
}

/**
 * 魔法の被ダメージを計算する.
 * @param {*} charaData
 * @param {*} mobData
 * @param {*} objCell
 * @param {*} skillRatioRaw 被ダメージ計算設定「敵魔法スキル倍率」の生値
 *   （`OBJID_ENEMY_MAGIC_SKILL_RATIO` の`.value`。呼び出し元がDOMから読んで渡す）
 * @param {*} attackElementalRaw 被ダメージ計算設定「敵魔法スキル属性」の生値
 *   （`OBJID_ENEMY_MAGIC_SKILL_ELEMENT` の`.value`）
 */
export function calcReceivedMagicDamage(charaData, mobData, objCell, skillRatioRaw = undefined, attackElementalRaw = undefined){
	// let mobMinMATK = mobData[MONSTER_DATA_EXTRA_INDEX_MATK_MIN];
	let mobMaxMATK = mobData[MONSTER_DATA_EXTRA_INDEX_MATK_MAX];
	//	let damage = (mobMinMATK + mobMaxMATK) / 2;
	// 壁目線では最大被ダメを知りたいはずなので平均は取らない
	let damage = mobMaxMATK;
	let ratio = 0;

	if (skillRatioRaw === undefined || attackElementalRaw === undefined) {
		return;
	}
	const skill_ratio = Math.min(60000, Math.max(100, Number(skillRatioRaw) || 100));
	const attack_elemental = Number(attackElementalRaw);
	damage = Math.floor(damage * skill_ratio / 100);

	/** モンスター耐性 */
	damage -= Math.floor(damage * getResistanceOfEnvironment(mobData[0]) / 100);

	/** サイズ耐性 */
	ratio = n_tok[ITEM_SP_RESIST_SIZE_SMALL + mobData[17]];
	ratio = Math.min(95, ratio);
	damage -= Math.floor(damage * ratio / 100);

	/** ボス・一般耐性 */
	ratio = (mobData[20] === MONSTER_BOSSTYPE_BOSS) ? n_tok[ITEM_SP_RESIST_BOSS] : n_tok[ITEM_SP_RESIST_NOTBOSS];
	ratio = Math.min(95, ratio);
	damage -= Math.floor(damage * ratio / 100);

	/** 属性相性 */
	ratio = zokusei[n_A_BodyZokusei * 10 + 1][attack_elemental] + 100;
	damage = Math.floor(damage * ratio / 100);

	/** 属性耐性 */
	ratio = n_tok[ ITEM_SP_RESIST_ELM_VANITY + attack_elemental ];
	ratio = Math.min(95, ratio);
	damage -= Math.floor(damage * ratio / 100);

	/** モンスター属性耐性 */
	ratio = n_tok[ITEM_SP_RESIST_MONSTER_ELM_VANITY + Math.floor(mobData[18] / 10)];
	ratio = Math.min(95, ratio);
	damage -= Math.floor(damage * ratio / 100);

	/** 種族耐性 */
	ratio = n_tok[ITEM_SP_RESIST_RACE_SOLID + mobData[19]];
	ratio += (mobData[19] === RACE_ID_HUMAN) ? n_tok[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER] : 0;
	ratio = Math.min(95, ratio);
	damage -= Math.floor(damage * ratio / 100);

	// MRES によるダメージ減少
	const mres = GetMres();
	const decay = Math.floor(damage * (1 - (2000 + mres) / (2000 + 5 * mres)));
	damage -= decay;

	// 除算Mdefによるダメージ減少
    damage = Math.floor(damage * (4000 + charaData[CHARA_DATA_INDEX_MDEF_DIV]) / (4000 + charaData[CHARA_DATA_INDEX_MDEF_DIV] * 10));

	// 減算Mdefによるダメージ減少
	damage -= charaData[CHARA_DATA_INDEX_MDEF_MINUS];

	/** スキルによる減少 */
	{
		// エナジーコート
		const energy_coat = Math.max(UsedSkillSearch(SKILL_ID_ENERGY_COAT), n_A_PassSkill7[50]);
		ratio = Math.min(95, 6 * energy_coat);
		damage -= Math.floor(damage * ratio / 100);
	}
	/** スキルによる減少（排他的な効果） */
	{
		const candidate = [0];
		let prefetch = 0;
		// 金剛のダメージ軽減効果
		if (UsedSkillSearch(SKILL_ID_KONGO) > 0) {
			candidate.push(90);
		}
		// うずくまる
		if (UsedSkillSearch(SKILL_ID_UZUKUMARU) > 0) {
			candidate.push(80);
		}
		prefetch = UsedSkillSearch(SKILL_ID_NATURE_PROTECTION);
		if (prefetch > 0) {
			// ネイチャープロテクション
			candidate.push([0, 30, 45, 60, 80, 95][prefetch]);
		}
		prefetch = UsedSkillSearch(SKILL_ID_IRON_HOWLING);
		if (prefetch > 0) {
			// アイアンハウリング
			candidate.push(15 + 5 * prefetch);
		}
		ratio = Math.min(95, Math.max(...candidate));
		damage -= Math.floor(damage * ratio / 100);
	}
	/** 耐性ペナルティ */
	{
		// ストーンスキン Lv6
		if (TimeItemNumSearch(TIME_ITEM_ID_WOLF_HEZIN)) {
			damage += Math.floor(damage * 20 / 100);
		}
	}

	/** 最小ダメージ保証 */
	damage = Math.max(damage, 1);

	// 被ダメ表示
	HtmlRemoveAllChild(objCell);
	HtmlCreateTextNode(__DIG3(Math.floor(damage)), objCell);
}

/**
 * 公式サイトで「◯に出現するモンスターから受けるダメージ - ◯%」と表記される
 * 特定モンスター耐性を取得する
 * @param {number} mobID
 * @returns {number} 耐性値
 */
export function getResistanceOfEnvironment(mobID) {
	var confval = 0;
	let result = 0;

	// 任意のモンスターIDを指定する耐性
	// ...を意図していると思われるが item.h.js にそんなオフセット値は見当たらない
	result = GetEquippedTotalSPCardAndElse(3000+mobID);
	result += GetEquippedTotalSPEquip(3000+mobID);

	//--------------------------------
	// マヌク耐性
	//--------------------------------
	if(n_A_PassSkill7[ID_BUFF_MANUK_ISHI]){
		if (NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_MANUKU]) == 1) {
			result += 10;
		}
	}
	//--------------------------------
	// スプレンディッド耐性
	//--------------------------------
	if(n_A_PassSkill7[ID_BUFF_VESPER_HONEY]){
		if (NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SPRENDED]) == 1) {
			result += 10;
		}
	}
	//--------------------------------
	// モロク耐性　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2431:		// 両手剣
	case 2432:		// カタール
	case 2433:		// 杖
	case 2434:		// ハンマ－
	case 2435:		// 弓
		if(NumSearch(mobID,MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) result += 10;
			if(n_A_Weapon_ATKplus >= 7) result += 20;
			if(n_A_Weapon_ATKplus >= 9) result += 40;
		}
		break;
	}
	//--------------------------------
	// モロク耐性　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2436:		// 短剣
		if(NumSearch(mobID,MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) result += 5;
			if(n_A_Weapon_ATKplus >= 7) result += 10;
			if(n_A_Weapon_ATKplus >= 9) result += 20;
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case 2436:		// 短剣
		if(NumSearch(mobID,MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon2_ATKplus >= 5) result += 5;
			if(n_A_Weapon2_ATKplus >= 7) result += 10;
			if(n_A_Weapon2_ATKplus >= 9) result += 20;
		}
		break;
	}
	//--------------------------------
	// フェイスワーム耐性
	//--------------------------------
	switch (mobID) {
	case 748:
	case 749:
	case 750:
	case 752:
	case 753:
	case 754:
	case 755:
	case 756:
	case 757:
		if(EquipNumSearch(2490)){
			result += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) result += 10;
			if(n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
		break;
	}
	//--------------------------------
	// 生体耐性
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_CLAYMORE:			// レクイエムクレイモア
	case ITEM_ID_REQUIEM_LANCE:				// レクイエムランス
	case ITEM_ID_REQUIEM_TWOHANDAXE:		// レクイエムツーハンドアックス
	case ITEM_ID_REQUIEM_WIZARDSTUFF:		// レクイエムウィザードスタッフ
	case ITEM_ID_REQUIEM_GREATBOW:			// レクイエムグレイトボウ
	case ITEM_ID_REQUIEM_KATAR:				// レクイエムカタール
		if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			result += 5;
			if(n_A_Weapon_ATKplus >= 5) result += 5;
			if(n_A_Weapon_ATKplus >= 6) result += 1 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	//--------------------------------
	// 英雄エンチャント耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_EIYUENCHANT]) == 1){
		if(CardNumSearch(CARD_ID_ENCHANT_UCHUKONGEN_GENZYU)){
			result += 20;
		}
	}
	//--------------------------------
	// 生体耐性　防具
	//--------------------------------
	// レクイエムスーツ、または、レクイエムローブ
	if(EquipNumSearch(ITEM_ID_REQUIEM_SUIT) || EquipNumSearch(ITEM_ID_REQUIEM_ROBE)){
		if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			result += 3;
			if(n_A_BODY_DEF_PLUS >= 6) result += 2;
			if(n_A_BODY_DEF_PLUS >= 8) result += 2;
		}
	}
	// レクイエムシールド
	if(EquipNumSearch(ITEM_ID_REQUIEM_SHIELD)){
		if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			result += 10;
			if(n_A_SHIELD_DEF_PLUS >= 6) result += 7;
			if(n_A_SHIELD_DEF_PLUS >= 8) result += 7;
		}
	}
	// レクイエムマント
	if(EquipNumSearch(ITEM_ID_REQUIEM_MANT)){
		if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			result += 3;
			if(n_A_SHOULDER_DEF_PLUS >= 6) result += 1;
			if(n_A_SHOULDER_DEF_PLUS >= 8) result += 1;
		}
	}
	// レクイエムブーツ
	if(EquipNumSearch(ITEM_ID_REQUIEM_BOOTS)){
		if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			result += 3;
			if(n_A_SHOES_DEF_PLUS >= 6) result += 1;
			if(n_A_SHOES_DEF_PLUS >= 8) result += 1;
		}
	}
	//--------------------------------
	// タナトス耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_THANATOS]) == 1){
		if (EquipNumSearch(ITEM_ID_USUDUKIYONO_BOSHI)) {
			result += 5;
			if (n_A_HEAD_DEF_PLUS >= 5) result += 10;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// 地下排水路耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_CHIKA_HAISUIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) result += 15 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);
		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// 暴屈折王の洞窟耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) result += 30;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) result += 15 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);
		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// 時計塔耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO]) == 1){
		if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// ハートハンター軍事基地耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_HEARTHUNTER]) == 1){
		if (EquipNumSearch(ITEM_ID_GOOGLE_HAT) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// ロックリッジ耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_ROCKRIDGE]) == 1){
		if (EquipNumSearch(ITEM_ID_TAURUS_HAT) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// ヴェルナー耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_VERNAR]) == 1){
		if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// ２５０ページ耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_PAGE250]) == 1){
		if (EquipNumSearch(ITEM_ID_BLACK_VEIL) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// 魔神殿耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_MAZINDEN]) == 1){
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR) > 0) {
			result += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE) > 0) {
			result += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT) > 0) {
			result += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS) > 0) {
			result += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING) > 0) {
			result += 5;
		}
	}
	//--------------------------------
	// オース二次捜索耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_OS_NIZI_SOSAKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			result += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) result += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) result += 20;
		}
	}
	//--------------------------------
	// フローズンメモリー耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_FROZEN_MEMORY]) == 1){
		if (EquipNumSearch(ITEM_ID_FROZEN_SCALE_SHAWL) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// ネジリアン帝国耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_NEZIRIAN_TEKOKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KIGURUMI_BEARDOLL) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// 幻想の北洞窟ルワンダ耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA]) == 1){
		if (EquipNumSearch(ITEM_ID_ANCIENT_MEGALIS_MANT) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// 歪んだ迷宮の森耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI]) == 1){
		if (EquipNumSearch(ITEM_ID_YAGIGENO_MUFFLER) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// 紫色の深海洞窟耐性
	//--------------------------------
	if ((NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO]) == 1)
		|| (NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO]) == 1)) {
		if (EquipNumSearch(ITEM_ID_SHINKAI_SEIBUTSUNO_MANT) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// アビスレイク地下洞窟04耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04]) == 1){
		if (EquipNumSearch(ITEM_ID_DRAGON_SCALE_SHAWL) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// 大浴場メディタティオ耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO]) == 1){
		if (EquipNumSearch(ITEM_ID_BURNING_FISH_CLOAK) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// 廃棄実験体遊技場ルドゥス4階耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F]) == 1){
		if (EquipNumSearch(ITEM_ID_DISCARDED_CAPE) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// オズの迷路耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_OZNO_MEIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_OZ_MAGMA_HOOD) > 0) {
			result += 60;
		}
	}
	//--------------------------------
	// 魔力が歪んだ平原 耐性
	//--------------------------------
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC]) == 1){
		if (EquipNumSearch(ITEM_ID_DISTORTED_MAGIC_HOOD) > 0) {
			result += 60;
		}
	}
	// 凍て付いた鱗の氷河 耐性
	if(NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_JOR_BACK3]) == 1){
		if (EquipNumSearch(ITEM_ID_AURORA_CURTAIN_ROBE) > 0) {
			result += 60;
		}
	}
	// 捨てられた穴 耐性
	if (EquipNumSearch(ITEM_ID_ABANDONED_CLOAK) > 0) {
		const condition01 = NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_01]) == 1;
		const condition02 = NumSearch(mobID, MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_02]) == 1;
		if (condition01 || condition02) {
			result += 60;
		}
	}

	//--------------------------------
	// 英雄の痕跡支援
	//--------------------------------
	if(TimeItemNumSearch(72)){
		if(743 <= mobID && mobID <= 757) result += 20;
		if(769 <= mobID && mobID <= 786) result += 20;
	}
	//--------------------------------
	// 12thアニバ星座支援
	//--------------------------------
	if(TimeItemNumSearch(80)) result += 40;
	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、地域耐性効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_GROUP);
	if (confval != 0) {
		result += confval;
	}
	// Lv200解放アップデートでの、上限値新設への対応
	result = Math.min(95, result);

	return result;
}

/**
 * マックスペインによる被ダメージを計算する
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 * @param {*} attackMethodConfArray 
 * @param {*} painATK 
 * @param {*} objCell 
 * @returns 
 */
export function BattleHiDamMaxPain(charaData, specData, mobData, attackMethodConfArray, painATK, objCell = null){

	var idx = 0;

	w_HiDam = new Array();
	for(var i=0;i<=6;i++) w_HiDam[i] = painATK;

	var wBHD;
	wBHD = GetEquippedTotalSPCardAndElse(3000+mobData[0]);
	wBHD += GetEquippedTotalSPEquip(3000+mobData[0]);

	// Lv200解放アップデートでの、上限値新設への対応
	wBHD = Math.min(95, wBHD);

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}


	//--------------------------------
	// 「マジシャン　エナジーコート」の効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_ENERGY_COAT)){
		wBHD = 6 * UsedSkillSearch(SKILL_ID_ENERGY_COAT);

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}
	else if (n_A_PassSkill7[50]){
		wBHD = 6 * n_A_PassSkill7[50];

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}


	//--------------------------------
	// ストーンスキンのダメージ軽減効果
	//--------------------------------
	if (TimeItemNumSearch(TIME_ITEM_ID_WOLF_HEZIN)) {
		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * 20 /100);
		}
	}

	//--------------------------------
	// 金剛のダメージ軽減効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_KONGO)) {
		for(i=0;i<=6;i++) w_HiDam[i] -= Math.floor(w_HiDam[i] * 90 / 100);
	}

	//--------------------------------
	// 「サモナー　うずくまる」のダメージ軽減効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_UZUKUMARU)) {

		// 特定の戦闘エリアでの補正
		var rateWork = 80;
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			rateWork = 50;
			break;

		}

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * rateWork / 100);
		}
	}

	//--------------------------------
	// 服の属性によるダメージ軽減効果
	//--------------------------------
	if (n_A_BodyZokusei == ELM_ID_PSYCO) {
		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * 75 /100);
		}
	}


	//--------------------------------
	// 被ダメージ増幅／軽減効果を適用
	//--------------------------------
	for (i = 0; i <= 6; i++) {
		w_HiDam[i] = DamageModifierOfArea(mobData, w_HiDam[i]);
	}


	for(i=0;i<=6;i++){
		if(w_HiDam[i] <1) w_HiDam[i]=1;
	}
	if(mobData[12] >= 4){
		if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 26){
			for(i=0;i<=6;i++) w_HiDam[i] = 0;
		}
	}
	if(n_A_PassSkill4[10]) for(i=0;i<=6;i++) w_HiDam[i] = Math.floor(w_HiDam[i] / 2);
	w_HiDam[0] = Math.floor(w_HiDam[0]);
	w_HiDam[6] = Math.floor(w_HiDam[6]);
	wBHD=0;
	for(i=0;i<=6;i++) wBHD += w_HiDam[i];
	wBHD = Math.round(wBHD / 7);
	var name64 = "平均被ダメージ(仮)";
	var wRefStr = "";
	wRef1 = new Array();
	wRef2 = new Array();
	wRef3 = new Array();


	var w_sp_rs=1;
	if(UsedSkillSearch(SKILL_ID_KONGO)) w_sp_rs = 10;
	if(UsedSkillSearch(SKILL_ID_UZUKUMARU)) w_sp_rs = 20;
	//var w_MaxHP = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * n_A_BaseLV / 100);
	if (objCell) {
		HtmlCreateTextNode(__DIG3(Math.floor(wBHD)), objCell);
	}
	else {
		myInnerHtml("B_AveAtk", __DIG3(wBHD) + "<BR>" + " (" + __DIG3(w_HiDam[0]) + "～" + __DIG3(w_HiDam[6]) + ")" + wRefStr, 0);
	}
	g_receiveDamageAverage = wBHD;

	return wBHD;
}

