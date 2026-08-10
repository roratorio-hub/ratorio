/**
 * モンスター特化補正（物理・魔法）の分割（Phase 3c）。
 *
 * ApplyMagicalSpecializeMonster 系（head.js 前半）と ApplyPhysicalSpecializeMonster
 * （head.js 後半、両者は head.js 内で大きく離れた位置にあった）を1ファイルへまとめた。
 * ApplyMagicalSpecializeMonster と ApplyPhysicalSpecializeMonster20211014（コメントアウト
 * 済みの死んだコード）の間にある死んだコードブロックも含め、本文はバイト単位で不変。
 */
import { CCharaConfCustomAtk } from '../../../roro/m/js/CCharaConfCustomAtk.js';
import { CSkillData } from '../../../roro/m/js/CSkillManager.js';
import {
    CARD_ID_BONE_PHEROS, CARD_ID_DOKUTSU_CALMARING, CARD_ID_ENCHANT_MANPASHIKUZYOKUNO_GENZYU,
    CARD_ID_ENCHANT_RYUBIRYUNO_GENZYU, CARD_ID_ENCROACHED_DIMIK, CARD_ID_FAKE_IWIN_SOLDIERS, CARD_ID_GENERAL_ORK,
    CARD_ID_GRAY_WOLF, CARD_ID_HARD_ROCK_TITAN, CARD_ID_HENI_CHIMERA_VANILAQUS, CARD_ID_JACKONETTE,
    CARD_ID_JOR_MUNGANDR_GUARDIAN, CARD_ID_KOKA_RAVA_GOLEM, CARD_ID_KOSHOSHITA_KEBIGATA_BETA,
    CARD_ID_KYORYOKUNA_MARYOKU, CARD_ID_MAZIMENA_HETAI_ANDRE, CARD_ID_MEDJAY, CARD_ID_NEO_MINERAL,
    CARD_ID_NETTO_PHEN, CARD_ID_PIERROT_ZOIST, CARD_ID_POLLUTED_SILK_FROG, CARD_ID_PUNCH_BUG, CARD_ID_SAIKAKYU_RGAN,
    CARD_ID_SEA_WIND, CARD_ID_SHADOW_JAILER, CARD_ID_SHINKAINO_HANGYOZIN, CARD_ID_TANGAN_DOLLOCARIS, CARD_ID_VALTY,
    CARD_ID_VENEDI, CARD_ID_VOLIMPET, CARD_ID_YORDOS_EXECUTOR
} from '../../../roro/m/js/card.dat.js';
import { CardNumSearch, EquipNumSearch, TimeItemNumSearch } from '../../../roro/m/js/chara.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from '../../../roro/m/js/const/EnumEquipRegionId.js';
import {
    ITEM_SP_MAGICAL_DAMAGE_UP, ITEM_SP_MAGICAL_DAMAGE_UP_BOSS, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY, ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS,
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM,
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL, ITEM_SP_PHYSICAL_DAMAGE_UP,
    ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS, ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS, ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM, ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID, ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL
} from '../../../roro/m/js/const/EnumItemSpId.js';
import {
    MONSTER_DATA_INDEX_BOSS_TYPE, MONSTER_DATA_INDEX_ELEMENT, MONSTER_DATA_INDEX_ID, MONSTER_DATA_INDEX_RACE,
    MONSTER_DATA_INDEX_SIZE
} from '../../../roro/m/js/const/EnumMonsterDataIndex.js';
import { RACE_ID_HUMAN } from '../../../roro/m/js/const/EnumRaceId.js';
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, NumSearch } from '../../../roro/m/js/foot-bridge.js';
import {
    ITEM_ID_ABANDONED_CLOAK, ITEM_ID_ANCIENT_MEGALIS_MANT, ITEM_ID_AURORA_CURTAIN_ROBE, ITEM_ID_BLACK_VEIL,
    ITEM_ID_BURNING_FISH_CLOAK, ITEM_ID_DIAVOLOS_WING, ITEM_ID_DISCARDED_CAPE, ITEM_ID_DISTORTED_MAGIC_HOOD,
    ITEM_ID_DRAGON_SCALE_SHAWL, ITEM_ID_FROZEN_SCALE_SHAWL, ITEM_ID_GOOGLE_HAT, ITEM_ID_KETTONO_RYU_BOSHI,
    ITEM_ID_KIGURUMI_BEARDOLL, ITEM_ID_MARAN_KAIZOKUDANBO, ITEM_ID_NEKOKATAR_TSUNA, ITEM_ID_NEKORYOTEKEN_TACHIUO,
    ITEM_ID_NEKORYOTEONO_KUROMAGURO, ITEM_ID_NEKORYOTETSUE_KAZIKI, ITEM_ID_NEKOTANKEN_AZI, ITEM_ID_NEKOYUMI_KANI,
    ITEM_ID_NIZIIRONO_TSUBASA, ITEM_ID_OKYU_MINI_MELON, ITEM_ID_OZ_MAGMA_HOOD, ITEM_ID_REQUIEM_ARCWAND,
    ITEM_ID_REQUIEM_BLADEWHIP, ITEM_ID_REQUIEM_CLAYMORE, ITEM_ID_REQUIEM_DAGGER, ITEM_ID_REQUIEM_GREATBOW,
    ITEM_ID_REQUIEM_KATAR, ITEM_ID_REQUIEM_KNUCKLE, ITEM_ID_REQUIEM_LANCE, ITEM_ID_REQUIEM_SMASHER,
    ITEM_ID_REQUIEM_SPEAR, ITEM_ID_REQUIEM_SWORD, ITEM_ID_REQUIEM_TWOHANDAXE, ITEM_ID_REQUIEM_VIOLIN,
    ITEM_ID_REQUIEM_WIZARDSTUFF, ITEM_ID_SCROLL_STOLE, ITEM_ID_SHINKAI_SEIBUTSUNO_MANT, ITEM_ID_SHIROKISHINO_MANT,
    ITEM_ID_TAURUS_HAT, ITEM_ID_USUDUKIYONO_BOSHI, ITEM_ID_YAGIGENO_MUFFLER, ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT, ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING,
    ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE
} from '../../../roro/m/js/item.dat.js';
import {
    MOB_CONF_PLAYER_ID_SHUZOKU, MOB_CONF_PLAYER_ID_SHUZOKU_DORAM, MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN, n_B_TAISEI
} from '../../../roro/m/js/mobconfplayer.js';
import { MONSTER_ID_PLAYER } from '../../../roro/m/js/monster.dat.js';
import {
    MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04, MONSTER_GROUP_ID_AKHET,
    MONSTER_GROUP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS, MONSTER_GROUP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO,
    MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO, MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU,
    MONSTER_GROUP_ID_CHIKA_HAISUIRO, MONSTER_GROUP_ID_EIYUENCHANT, MONSTER_GROUP_ID_FROZEN_MEMORY,
    MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA, MONSTER_GROUP_ID_GLASTHEIM_ABYSS,
    MONSTER_GROUP_ID_HAIIRO_OKAMINO_MORI, MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F,
    MONSTER_GROUP_ID_HAIKI_ZIKKENZYO_AMISITIA, MONSTER_GROUP_ID_HEARTHUNTER, MONSTER_GROUP_ID_HEBIGAMINO_NUKUMORI,
    MONSTER_GROUP_ID_HEM_DUN01J, MONSTER_GROUP_ID_HEM_FILDJ, MONSTER_GROUP_ID_ISGARD_NORTH_FIELD,
    MONSTER_GROUP_ID_JOR_BACK3, MONSTER_GROUP_ID_JOR_BASE, MONSTER_GROUP_ID_JOR_RAISE1, MONSTER_GROUP_ID_JOR_RAISE2,
    MONSTER_GROUP_ID_JOR_ROOT, MONSTER_GROUP_ID_JOR_TMPLE1, MONSTER_GROUP_ID_JOR_TMPLE2,
    MONSTER_GROUP_ID_KOZAN_DUNGEON_03, MONSTER_GROUP_ID_MANUKU, MONSTER_GROUP_ID_MAZINDEN, MONSTER_GROUP_ID_MELORIN,
    MONSTER_GROUP_ID_MIGEL, MONSTER_GROUP_ID_MIOLNIR_UNDERGROUND_CAVE, MONSTER_GROUP_ID_MOROC,
    MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO, MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO,
    MONSTER_GROUP_ID_MU_FILD01J, MONSTER_GROUP_ID_NEZIRIAN_TEKOKU,
    MONSTER_GROUP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE, MONSTER_GROUP_ID_NINSHIKINO_NIWA,
    MONSTER_GROUP_ID_NOGUE_ROAD_03, MONSTER_GROUP_ID_OS_NIZI_SOSAKU, MONSTER_GROUP_ID_OZNO_MEIRO,
    MONSTER_GROUP_ID_PAGE250, MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC, MONSTER_GROUP_ID_PUMPKIN_FARM,
    MONSTER_GROUP_ID_ROCKRIDGE, MONSTER_GROUP_ID_SCROLL_STOLE, MONSTER_GROUP_ID_SEITAI, MONSTER_GROUP_ID_SPRENDED,
    MONSTER_GROUP_ID_SUTERARETA_ANA_01, MONSTER_GROUP_ID_SUTERARETA_ANA_02, MONSTER_GROUP_ID_THANATOS,
    MONSTER_GROUP_ID_TOKEITO, MONSTER_GROUP_ID_TOKEITO_MICHI_NO_KUUKAN, MONSTER_GROUP_ID_UKNW_RUIN,
    MONSTER_GROUP_ID_VERNAR, MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI, MonsterGroupObj
} from '../../../roro/m/js/monstergroup.dat.js';
import {
    n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from '../../../roro/m/js/roro-state.js';
import {
    SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_GRIM_TOOTH, SKILL_ID_ISHINAGE, SKILL_ID_METEOR_ASSALT,
    SKILL_ID_POISON_REACT, SKILL_ID_SUNAMAKI, SKILL_ID_VENOM_KNIFE, SKILL_ID_VENOM_SPLASHER
} from '../../../roro/m/js/skill.dat.js';
import { g_objCharaConfCustomAtk, g_skillManager } from './global.js';
import { ApplySMatkAmplify } from './hmjob.js';
import { n_A_ActiveSkill, n_A_Weapon_zokusei, n_tok } from './ro4-state.js';
import { UsedSkillSearch, n_A_PassSkill7 } from './skillstate.js';
import { GetSpiderWebDamageRatio } from './head-bridge.js';

/**
 * モンスター特化（魔法）を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
export function ApplyMagicalSpecializeMonster(charaData, specData, mobData, dmg) {
	// 2021/11/17 に特定した順序で計算する
	dmg = ApplyMagicalSpecializeMonster20211117(charaData, specData, mobData, dmg);
	// 特性ステータス対応
	return ApplySMatkAmplify(dmg);
}

/**
 * モンスター特化（魔法）を適用する（2021/10/14検証用）.
 */
/*
function ApplyMagicalSpecializeMonsterMod20211014(charaData, specData, mobData, dmg) {
	var idx = 0;
	var idxChar = 0;
	var dmgResult = 0;
	var dmgResultOldFomula = 0;
	var patternStr = "";
	var patternArray = [];
	var patternListBase = [
		"0", "1", "2", "3", "4", "5", "6", "7",
	];
	var funcCreatePattern = function (patternArrayF, patternStrF, patternListF) {
		var idxF = 0;
		var patternListNextF = null;
		if (patternListF.length == 1) {
			patternArrayF.push(patternStrF + patternListF[0]);
			return;
		}
		for (idxF = 0; idxF < patternListF.length; idxF++) {
			patternListNextF = patternListF.slice();
			patternListNextF.splice(idxF, 1);
			funcCreatePattern(patternArrayF, patternStrF + patternListF[idxF], patternListNextF);
		}
	};
	// 検証用パターン生成
	funcCreatePattern(patternArray, "", patternListBase);
	// パターン格納用配列初期化
	g_matchPatternArray = [];
	g_matchResultArray = [];
	g_missMatchPatternArray = [];
	g_missMatchResultArray = [];
	g_missMatchPatternNotExpectedArray = [];
	g_missMatchResultNotExpectedArray = [];
	for (idx = 0; idx < patternArray.length; idx++) {
		dmgResult = dmg;
		patternStr = patternArray[idx];
		for (idxChar = 0; idxChar < patternStr.length; idxChar++) {
			switch (patternStr.charAt(idxChar)) {
				case "0":
					// 魔法攻撃で与えるダメージ＋○○％
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubMagicalDamageUp(charaData, specData, mobData, dmgResult);
					break;
				case "1":
					// スパイダーウェブ状態系のダメージ強化倍率の適用
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpiderWebModify(charaData, specData, mobData, dmgResult);
					break;
				case "2":
					// 地域特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMap(charaData, specData, mobData, dmgResult);
					break;
				case "3":
					// 種族特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeRace(charaData, specData, mobData, dmgResult);
					break;
				case "4":
					// サイズ特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeSize(charaData, specData, mobData, dmgResult);
					break;
				case "5":
					// 属性特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMonsterElement(charaData, specData, mobData, dmgResult);
					break;
				case "6":
					// 属性魔法特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMagicElement(charaData, specData, mobData, dmgResult);
					break;
				case "7":
					// ボス／一般特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeBossType(charaData, specData, mobData, dmgResult);
					break;
			}
		}
		if (idx == 0) {
			dmgResultOldFomula = dmgResult;
		}
		else {
			// 期待されるダメージ計算結果が指定されていない場合
			if (g_expectedDmgResult === undefined) {
				if (dmgResult != dmgResultOldFomula) {
					g_missMatchPatternArray.push(patternStr);
					g_missMatchResultArray.push([patternStr, dmgResult]);
				}
				else {
					g_matchPatternArray.push(patternStr);
					g_matchResultArray.push([patternStr, dmgResult]);
				}
			}
			// 期待されるダメージ計算結果が指定されている場合
			else {
				if (dmgResult != dmgResultOldFomula) {

					if (dmgResult == g_expectedDmgResult) {
						g_missMatchPatternArray.push(patternStr);
						g_missMatchResultArray.push([patternStr, dmgResult]);
					}
					else {
						g_missMatchPatternNotExpectedArray.push(patternStr);
						g_missMatchResultNotExpectedArray.push([patternStr, dmgResult]);
					}
				}
				else {
					g_matchPatternArray.push(patternStr);
					g_matchResultArray.push([patternStr, dmgResult]);
				}
			}

		}
	}
	return dmgResultOldFomula;
}
*/

/**
 * モンスター特化（魔法）を適用する（2021/11/17特定版）.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
export function ApplyMagicalSpecializeMonster20211117(charaData, specData, mobData, dmg) {
	var idxChar = 0;
	var dmgResult = 0;
	var patternStr = "";
	// 特定したパターン "04251637" でのみ計算する
	dmgResult = dmg;
	patternStr = "04251637";
	for (idxChar = 0; idxChar < patternStr.length; idxChar++) {
		switch (patternStr.charAt(idxChar)) {
			case "0":
				// 魔法攻撃で与えるダメージ＋○○％
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubMagicalDamageUp(charaData, specData, mobData, dmgResult);
				break;
			case "1":
				// スパイダーウェブ状態系のダメージ強化倍率の適用
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpiderWebModify(charaData, specData, mobData, dmgResult);
				break;
			case "2":
				// 地域特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMap(charaData, specData, mobData, dmgResult);
				break;
			case "3":
				// 種族特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeRace(charaData, specData, mobData, dmgResult);
				break;
			case "4":
				// サイズ特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeSize(charaData, specData, mobData, dmgResult);
				break;
			case "5":
				// 属性特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMonsterElement(charaData, specData, mobData, dmgResult);
				break;
			case "6":
				// 属性魔法特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMagicElement(charaData, specData, mobData, dmgResult);
				break;
			case "7":
				// ボス／一般特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeBossType(charaData, specData, mobData, dmgResult);
				break;
		}
	}
	return dmgResult;
}

/**
 * 魔法ダメージ増加の効果をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 未使用の引数
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubMagicalDamageUp(charaData, specData, mobData, dmg) {
	if (n_tok[ITEM_SP_MAGICAL_DAMAGE_UP]) {
		dmg = Math.floor(dmg * (100 + n_tok[ITEM_SP_MAGICAL_DAMAGE_UP]) / 100);
	}
	return dmg;
}

/**
 * スパイダーウェブの有無による倍率をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpiderWebModify(charaData, specData, mobData, dmg) {
	var wX = GetSpiderWebDamageRatio();
	if (wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 特定のモンスターグループに対する特攻をダメージに適用する。
 * 魔法ダメージ計算専用を意図して作られたようだが内部的には魔法に依存した処理ではない。
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMap(charaData, specData, mobData, dmg) {
	var cardCount = 0, confval = 0;
	/** モンスターグループの合成配列 */
	let candidate = [];
	var wX = 0;
	//--------------------------------
	// マヌク特化
	//--------------------------------
	if(n_A_PassSkill7[30]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MANUKU]) == 1) {
			wX += 10;
		}
	}

	//--------------------------------
	// スプレンディッド特化
	//--------------------------------
	if(n_A_PassSkill7[33]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SPRENDED]) == 1) {
			wX += 10;
		}
	}

	//--------------------------------
	// ニブルヘイム特化
	//--------------------------------
	if(324 <= mobData[0] && mobData[0] <= 332){
		if(EquipNumSearch(2399)){
			wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 10;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// モロク特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2431:		// 両手剣
	case 2432:		// カタール
	case 2433:		// 杖
	case 2434:		// ハンマ－
	case 2435:		// 弓
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) wX += 40;
			if(n_A_Weapon_ATKplus >= 7) wX += 60;
			if(n_A_Weapon_ATKplus >= 9) wX += 80;
		}
		break;
	}

	//--------------------------------
	// モロク特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) wX += 20;
			if(n_A_Weapon_ATKplus >= 7) wX += 30;
			if(n_A_Weapon_ATKplus >= 9) wX += 40;
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon2_ATKplus >= 5) wX += 20;
			if(n_A_Weapon2_ATKplus >= 7) wX += 30;
			if(n_A_Weapon2_ATKplus >= 9) wX += 40;
		}
		break;
	}

	//--------------------------------
	// フェイスワーム特化
	//--------------------------------
	switch (mobData[0]) {
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
			wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) wX += 10;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
		break;
	}

	//--------------------------------
	// 英雄エンチャント特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_EIYUENCHANT]) == 1){
		if(CardNumSearch(CARD_ID_ENCHANT_MANPASHIKUZYOKUNO_GENZYU)){
			wX += 20;
		}
	}

	//--------------------------------
	// 生体特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
	case ITEM_ID_REQUIEM_ARCWAND:		// レクイエムアークワンド
	case ITEM_ID_REQUIEM_WIZARDSTUFF:	// レクイエムウィザードスタッフ
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 40;
			if(n_A_Weapon_ATKplus >= 5) wX += 20;
			if(n_A_Weapon_ATKplus >= 6) wX += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 40;
			if(n_A_Weapon2_ATKplus >= 5) wX += 20;
			if(n_A_Weapon2_ATKplus >= 6) wX += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 生体特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 20;
			if(n_A_Weapon_ATKplus >= 5) wX += 20;
			if(n_A_Weapon_ATKplus >= 6) wX += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 20;
			if(n_A_Weapon2_ATKplus >= 5) wX += 20;
			if(n_A_Weapon2_ATKplus >= 6) wX += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// タナトス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_THANATOS]) == 1){
		if (EquipNumSearch(ITEM_ID_USUDUKIYONO_BOSHI)) {
			wX += 5;
			if (n_A_HEAD_DEF_PLUS >= 5) wX += 10;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 地下排水路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_CHIKA_HAISUIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) wX += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 暴屈折王の洞窟特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) wX += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 時計塔特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO]) == 1){
		if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ハートハンター軍事基地特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEARTHUNTER]) == 1){
		if (EquipNumSearch(ITEM_ID_GOOGLE_HAT) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ロックリッジ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ROCKRIDGE]) == 1){
		if (EquipNumSearch(ITEM_ID_TAURUS_HAT) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ヴェルナー研究所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_VERNAR]) == 1){
		if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// メロリン特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MELORIN]) == 1){
		if (EquipNumSearch(ITEM_ID_OKYU_MINI_MELON) > 0) {
			wX += 20 * n_A_HEAD_DEF_PLUS;
		}
	}

	//--------------------------------
	// ２５０ページ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PAGE250]) == 1){
		if (EquipNumSearch(ITEM_ID_BLACK_VEIL) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 魔神殿特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MAZINDEN]) == 1){
		if (EquipNumSearch(ITEM_ID_DIAVOLOS_WING) > 0) {
			wX += 30;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING) > 0) {
			wX += 20;
		}
	}

	//--------------------------------
	// スクロールストール特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SCROLL_STOLE]) == 1){
		if (EquipNumSearch(ITEM_ID_SCROLL_STOLE) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// オース二次捜索特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OS_NIZI_SOSAKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ミグエル特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIGEL]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				wX += 100;
			}
		}
	}

	//--------------------------------
	// ノーグロード３層特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NOGUE_ROAD_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOKA_RAVA_GOLEM)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// フローズンメモリー特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_FROZEN_MEMORY]) == 1){
		if (EquipNumSearch(ITEM_ID_FROZEN_SCALE_SHAWL) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 紫色の深海洞窟特化
	//--------------------------------
	if ((NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO]) == 1)
		|| (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO]) == 1)) {

		if ((cardCount = CardNumSearch(CARD_ID_SHINKAINO_HANGYOZIN)) > 0) {
			wX += 30 * cardCount;
		}

		if (EquipNumSearch(ITEM_ID_SHINKAI_SEIBUTSUNO_MANT) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// ネジリアン帝国特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NEZIRIAN_TEKOKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KIGURUMI_BEARDOLL) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 幻想の北洞窟ルワンダ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA]) == 1){
		if (EquipNumSearch(ITEM_ID_ANCIENT_MEGALIS_MANT) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 歪んだ迷宮の森特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI]) == 1){
		if (EquipNumSearch(ITEM_ID_YAGIGENO_MUFFLER) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 認識の庭特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NINSHIKINO_NIWA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_MAZIMENA_HETAI_ANDRE)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 鉱山ダンジョン03特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_KOZAN_DUNGEON_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NEO_MINERAL)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// アビスレイク地下洞窟04特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04]) == 1){
		if (EquipNumSearch(ITEM_ID_DRAGON_SCALE_SHAWL) > 0) {
			wX += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_BONE_PHEROS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 廃棄実験体遊技場ルドゥス4階特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F]) == 1){
		if (EquipNumSearch(ITEM_ID_DISCARDED_CAPE) > 0) {
			wX += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_VENEDI)) > 0) {
			wX += 30 * cardCount;
		}
	}

	// -------------------------------
	// 古代神殿アケト 特化
	// -------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_AKHET]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_MEDJAY)) > 0) {
			wX += 30 * cardCount;
		}
	}

	// -------------------------------
	// ニブルヘイムカボチャ農場 特化
	// -------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PUMPKIN_FARM]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_JACKONETTE)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 崩れたオペラハウス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PIERROT_ZOIST)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 大浴場メディタティオ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NETTO_PHEN)) > 0) {
			wX += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_BURNING_FISH_CLOAK) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 貯蔵庫タルタロス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOSHOSHITA_KEBIGATA_BETA)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 第2魔力発電所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KYORYOKUNA_MARYOKU)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 灰色狼の森特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIIRO_OKAMINO_MORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GRAY_WOLF)) > 0) {
			wX += 30 * cardCount;
		}
	}

	// ヴェルンド渓谷 外郭 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MU_FILD01J]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_VOLIMPET)) > 0) {
			wX += 30 * cardCount;
		}
	}

	// 破壊されたゲフェンフィールド 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEM_FILDJ]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_POLLUTED_SILK_FROG)) > 0) {
			wX += 30 * cardCount;
		}
	}
	
	// 破壊されたウェルス 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEM_DUN01J]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_ENCROACHED_DIMIK)) > 0) {
			wX += 30 * cardCount;
		}
	}
	
	// 歪んだブリミル 1階 2階 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_UKNW_RUIN]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_SHADOW_JAILER)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// オズの迷路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OZNO_MEIRO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_VALTY)) > 0) {
			wX += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_OZ_MAGMA_HOOD) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 廃棄実験所アミシティア特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENZYO_AMISITIA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HENI_CHIMERA_VANILAQUS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 捨てられた穴01特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_01]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_DOKUTSU_CALMARING)) > 0) {
			wX += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_ABANDONED_CLOAK) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 捨てられた穴02特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_02]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_TANGAN_DOLLOCARIS)) > 0) {
			wX += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_ABANDONED_CLOAK) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 蛇神の温もり特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEBIGAMINO_NUKUMORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_SAIKAKYU_RGAN)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// アルデバラン時計塔地下 未知の空間特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO_MICHI_NO_KUUKAN]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GENERAL_ORK)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 魔力が歪んだ平原 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HARD_ROCK_TITAN)) > 0) {
			wX += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_DISTORTED_MAGIC_HOOD) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// ミョルニール地下洞窟 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIOLNIR_UNDERGROUND_CAVE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PUNCH_BUG)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// イスガルド北部（凍て付いた鱗の海辺、古代の氷の峡谷 東部、古代の氷の峡谷 西部） 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ISGARD_NORTH_FIELD]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_FAKE_IWIN_SOLDIERS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	// 凍て付いた鱗の氷河 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_JOR_BACK3]) == 1){
		if (EquipNumSearch(ITEM_ID_AURORA_CURTAIN_ROBE) > 0) {
			wX += 30;
		}
	}
	

	//--------------------------------
	// 蛇神の根源 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_JOR_ROOT]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_JOR_MUNGANDR_GUARDIAN)) > 0) {
			wX += 30 * cardCount;
		}
	}

	/** ギムレー 特化 */
	candidate = MonsterGroupObj[MONSTER_GROUP_ID_JOR_TMPLE1].concat(MonsterGroupObj[MONSTER_GROUP_ID_JOR_TMPLE2]);
	if(NumSearch(mobData[0], candidate) === 1){
		if ((cardCount = CardNumSearch(CARD_ID_YORDOS_EXECUTOR)) > 0) {
			wX += 30 * cardCount;
		}
	}

	/** ヨルンビル 隆起した大地 特化 */
candidate = MonsterGroupObj[MONSTER_GROUP_ID_JOR_RAISE1].concat(MonsterGroupObj[MONSTER_GROUP_ID_JOR_RAISE2], MonsterGroupObj[MONSTER_GROUP_ID_JOR_BASE]);
	if(NumSearch(mobData[0], candidate) === 1){
		if ((cardCount = CardNumSearch(CARD_ID_SEA_WIND)) > 0) {
			wX += 30 * cardCount;
		}
	}


	//--------------------------------
	// 英雄の痕跡支援
	//--------------------------------
	if(TimeItemNumSearch(72)){
		if(743 <= mobData[0] && mobData[0] <= 757) wX += 20;
		if(769 <= mobData[0] && mobData[0] <= 786) wX += 20;
	}

	//--------------------------------
	// 12thアニバ星座支援
	//--------------------------------
	if(TimeItemNumSearch(80)) wX += 30;

	//--------------------------------
	// 「性能カスタマイズ」の、地域特化効果
	//--------------------------------
	confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_GROUP_DAMAGE_UP);
	if (confval != 0) {
		wX += confval;
	}

	//--------------------------------
	// グラストヘイムアビス特化
	//--------------------------------
	if(NumSearch(mobData[MONSTER_DATA_INDEX_ID], MonsterGroupObj[MONSTER_GROUP_ID_GLASTHEIM_ABYSS]) == 1){
		if (EquipNumSearch(ITEM_ID_SHIROKISHINO_MANT) > 0) {
			wX += 10;
			if (n_A_SHOULDER_DEF_PLUS >= 5) {
				wX += 15;
			}
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				wX += 15;
			}
		}
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、種族特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeRace(charaData, specData, mobData, dmg) {
	var wX = 0;
	// 対プレイヤーでない場合
	if (mobData[MONSTER_DATA_INDEX_ID] != MONSTER_ID_PLAYER) {
		// 種族特化をそのまま適用
		wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]];
		// 人間形（プレイヤー除く）の適用
		if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_HUMAN) {
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER];
		}
	}
	// 対プレイヤーの場合
	else {
		// 対プレイヤー特化の適用
		wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL];
		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
		// 種族が人間に設定されている場合は、人間特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN];
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN];
			break;
		// 種族がドラムに設定されている場合は、ドラム特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM];
			break;
		}
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、サイズ特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeSize(charaData, specData, mobData, dmg) {
	var wX = 0;
	// 対プレイヤーでない場合
	if (mobData[MONSTER_DATA_INDEX_ID] != MONSTER_ID_PLAYER) {
		// モンスターのサイズ定義に従い、そのまま適用
		wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL + mobData[MONSTER_DATA_INDEX_SIZE]];
	}
	// 対プレイヤーの場合
	else {
		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
			// 種族が人間に設定されている場合は、中型特化を適用
			case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
				wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM];
				break;
			// 種族がドラムに設定されている場合は、小型特化を適用
			case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
				wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL];
				break;
		}
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、モンスターの属性特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMonsterElement(charaData, specData, mobData, dmg) {
	var wX = 0;
	wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY + Math.floor(mobData[MONSTER_DATA_INDEX_ELEMENT] / 10)];
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 属性魔法ダメージ増加を適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 未使用の引数
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMagicElement(charaData, specData, mobData, dmg) {
	var wX = 0;
	// 魔法スキルの場合、処理の途中で武器属性がスキルによって上書きされる
	if(n_A_Weapon_zokusei >= 0){
		wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY + n_A_Weapon_zokusei];
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、ボス特攻・一般特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
export function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeBossType(charaData, specData, mobData, dmg) {
	var wX = 0;
	// ボス特化
	if(mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == 1){
		wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS];
		// マジカルブースター＆サザンクロスセットによるＢＯＳＳ特化
		if(EquipNumSearch(1627)){
			wX += 2;
			if(n_A_HEAD_DEF_PLUS >= 5) wX += 3;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 4;
		}
	}
	// 一般特化
	else {
		wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS];
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * モンスター特化（物理）を適用する.
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 * @param {*} dmg 適用する前のダメージ
 * @returns 適用後のダメージ
 */
export function ApplyPhysicalSpecializeMonster(charaData, specData, mobData, dmg) {
	var cardCount = 0, confval = 0;
	/** モンスターグループの合成配列 */
	let candidate = [];
	//--------------------------------
	// 種族特化
	//--------------------------------
	var w = 100;

	// 対プレイヤーでない場合
	if (mobData[0] != MONSTER_ID_PLAYER) {

		// 種族特化をそのまま適用
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID + mobData[19]];

		// 人間形（プレイヤー除く）の適用
		if (mobData[19] == RACE_ID_HUMAN) {
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER];
		}
	}

	// 対プレイヤーの場合
	else {

		// 対プレイヤー特化の適用
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL];

		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {

		// 種族が人間に設定されている場合は、人間特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN];
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN];
			break;

		// 種族がドラムに設定されている場合は、ドラム特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM];
			break;

		}
	}

	dmg = Math.floor(dmg * w / 100);


	//--------------------------------
	// サイズ特化
	//--------------------------------
	var w = 100;

	// 対プレイヤーでない場合
	if (mobData[0] != MONSTER_ID_PLAYER) {

		// モンスターのサイズ定義に従い、そのまま適用
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL + mobData[17]];
	}

	// 対プレイヤーの場合
	else {

		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {

		// 種族が人間に設定されている場合は、中型特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM];
			break;

		// 種族がドラムに設定されている場合は、小型特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL];
			break;

		}
	}

	dmg = Math.floor(dmg * w / 100);


	//--------------------------------
	// 属性特化
	//--------------------------------
	w = n_tok[40+Math.floor(mobData[18] / 10)];
	dmg = Math.floor(dmg * (100+w) /100);


	var w = 100;

	//--------------------------------
	// ゴブリン特化
	//--------------------------------
	switch (mobData[0]) {
	case 108:
	case 109:
	case 110:
	case 111:
	case 112:
	case 113:
	case 114:
	case 115:
	case 319:
		w += n_tok[81];
		break;
	}

	//--------------------------------
	// コボルド特化
	//--------------------------------
	switch (mobData[0]) {
	case 116:
	case 117:
	case 118:
	case 119:
	case 120:
		w += n_tok[82];
		break;
	}

	//--------------------------------
	// オーク特化
	//--------------------------------
	switch (mobData[0]) {
	case 49:
	case 50:
	case 51:
	case 52:
	case 55:
	case 221:
		w += n_tok[83];
		break;
	}

	//--------------------------------
	// ゴーレム特化
	//--------------------------------
	switch (mobData[0]) {
	case 106:
	case 152:
	case 308:
	case 32:
	case 541:
		w += n_tok[84];
		break;
	}

	//--------------------------------
	// マヌク特化
	//--------------------------------
	if(n_A_PassSkill7[29]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MANUKU]) == 1) {
			w += 10;
		}
	}

	//--------------------------------
	// スプレンディッド特化
	//--------------------------------
	if(n_A_PassSkill7[32]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SPRENDED]) == 1) {
			w += 10;
		}
	}

	//--------------------------------
	// ニブルヘイム特化
	//--------------------------------
	switch (mobData[0]) {
	case 324:
	case 325:
	case 326:
	case 327:
	case 328:
	case 329:
	case 330:
	case 331:
	case 332:
		if(EquipNumSearch(2399)){
			w += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) w += 5;
			if(n_A_HEAD_DEF_PLUS >= 7) w += 10;
			if(n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
		break;
	}

	//--------------------------------
	// モロク特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2431:		// 両手剣
	case 2432:		// カタール
	case 2433:		// 杖
	case 2434:		// ハンマ－
	case 2435:		// 弓
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) w += 40;
			if(n_A_Weapon_ATKplus >= 7) w += 60;
			if(n_A_Weapon_ATKplus >= 9) w += 80;
		}
		break;
	}

	//--------------------------------
	// モロク特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) w += 20;
			if(n_A_Weapon_ATKplus >= 7) w += 30;
			if(n_A_Weapon_ATKplus >= 9) w += 40;
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon2_ATKplus >= 5) w += 20;
			if(n_A_Weapon2_ATKplus >= 7) w += 30;
			if(n_A_Weapon2_ATKplus >= 9) w += 40;
		}
		break;
	}

	//--------------------------------
	// フェイスワーム特化
	//--------------------------------
	switch (mobData[0]) {
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
			w += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) w += 10;
			if(n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
		break;
	}

	//--------------------------------
	// 英雄エンチャント特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_EIYUENCHANT]) == 1){
		if(CardNumSearch(CARD_ID_ENCHANT_RYUBIRYUNO_GENZYU)){
			w += 20;
		}
	}

	//--------------------------------
	// 生体特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
	case ITEM_ID_REQUIEM_SPEAR:			// レクイエムスピア
	case ITEM_ID_REQUIEM_SMASHER:		// レクイエムスマッシャー
	case ITEM_ID_REQUIEM_GREATBOW:		// レクイエムグレイトボウ
	case ITEM_ID_REQUIEM_KATAR:			// レクイエムカタール
	case ITEM_ID_REQUIEM_KNUCKLE:		// レクイエムナックル
	case ITEM_ID_REQUIEM_VIOLIN:		// レクイエムバイオリン
	case ITEM_ID_REQUIEM_BLADEWHIP:		// レクイエムブレイドウィップ
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 40;
			if(n_A_Weapon_ATKplus >= 5) w += 20;
			if(n_A_Weapon_ATKplus >= 6) w += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 40;
			if(n_A_Weapon2_ATKplus >= 5) w += 20;
			if(n_A_Weapon2_ATKplus >= 6) w += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 生体特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 20;
			if(n_A_Weapon_ATKplus >= 5) w += 20;
			if(n_A_Weapon_ATKplus >= 6) w += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 20;
			if(n_A_Weapon2_ATKplus >= 5) w += 20;
			if(n_A_Weapon2_ATKplus >= 6) w += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 生体特化　タイプ３
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_CLAYMORE:			// レクイエムクレイモア
	case ITEM_ID_REQUIEM_LANCE:				// レクイエムランス
	case ITEM_ID_REQUIEM_TWOHANDAXE:		// レクイエムツーハンドアックス
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 40;
			if(n_A_Weapon_ATKplus >= 5) w += 30;
			if(n_A_Weapon_ATKplus >= 6) w += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// タナトス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_THANATOS]) == 1){
		if (EquipNumSearch(ITEM_ID_USUDUKIYONO_BOSHI)) {
			w += 5;
			if (n_A_HEAD_DEF_PLUS >= 5) w += 10;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 地下排水路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_CHIKA_HAISUIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) w += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 暴屈王の洞窟特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) w += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 時計塔特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO]) == 1){
		if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ハートハンター軍事基地特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEARTHUNTER]) == 1){
		if (EquipNumSearch(ITEM_ID_GOOGLE_HAT) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ロックリッジ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ROCKRIDGE]) == 1){
		if (EquipNumSearch(ITEM_ID_TAURUS_HAT) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ヴェルナー研究所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_VERNAR]) == 1){
		if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// メロリン特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MELORIN]) == 1){
		if (EquipNumSearch(ITEM_ID_OKYU_MINI_MELON) > 0) {
			w += 20 * n_A_HEAD_DEF_PLUS;
		}
	}

	//--------------------------------
	// ２５０ページ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PAGE250]) == 1){
		if (EquipNumSearch(ITEM_ID_BLACK_VEIL) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 魔神殿特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MAZINDEN]) == 1){
		if (EquipNumSearch(ITEM_ID_DIAVOLOS_WING) > 0) {
			w += 30;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING) > 0) {
			w += 20;
		}
	}

	//--------------------------------
	// スクロールストール特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SCROLL_STOLE]) == 1){
		if (EquipNumSearch(ITEM_ID_SCROLL_STOLE) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// オース二次捜索特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OS_NIZI_SOSAKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ミグエル特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIGEL]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				w += 100;
			}
		}
	}

	//--------------------------------
	// ノーグロード３層特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NOGUE_ROAD_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOKA_RAVA_GOLEM)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// フローズンメモリー特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_FROZEN_MEMORY]) == 1){
		if (EquipNumSearch(ITEM_ID_FROZEN_SCALE_SHAWL) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 紫色の深海洞窟特化
	//--------------------------------
	if ((NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO]) == 1)
		|| (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO]) == 1)) {

		if ((cardCount = CardNumSearch(CARD_ID_SHINKAINO_HANGYOZIN)) > 0) {
			w += 30 * cardCount;
		}

		if (EquipNumSearch(ITEM_ID_SHINKAI_SEIBUTSUNO_MANT) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// ネジリアン帝国特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NEZIRIAN_TEKOKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KIGURUMI_BEARDOLL) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 幻想の北洞窟ルワンダ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA]) == 1){
		if (EquipNumSearch(ITEM_ID_ANCIENT_MEGALIS_MANT) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 歪んだ迷宮の森耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI]) == 1){
		if (EquipNumSearch(ITEM_ID_YAGIGENO_MUFFLER) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 認識の庭特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NINSHIKINO_NIWA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_MAZIMENA_HETAI_ANDRE)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 鉱山ダンジョン03特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_KOZAN_DUNGEON_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NEO_MINERAL)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// アビスレイク地下洞窟04特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04]) == 1){
		if (EquipNumSearch(ITEM_ID_DRAGON_SCALE_SHAWL) > 0) {
			w += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_BONE_PHEROS)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 廃棄実験体遊技場ルドゥス4階特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F]) == 1){
		if (EquipNumSearch(ITEM_ID_DISCARDED_CAPE) > 0) {
			w += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_VENEDI)) > 0) {
			w += 30 * cardCount;
		}
	}

	// -------------------------------
	// 古代神殿アケト 特化
	// -------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_AKHET]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_MEDJAY)) > 0) {
			w += 30 * cardCount;
		}
	}

	// -------------------------------
	// ニブルヘイムカボチャ農場 特化
	// -------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PUMPKIN_FARM]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_JACKONETTE)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 崩れたオペラハウス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PIERROT_ZOIST)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 大浴場メディタティオ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NETTO_PHEN)) > 0) {
			w += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_BURNING_FISH_CLOAK) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 貯蔵庫タルタロス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOSHOSHITA_KEBIGATA_BETA)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 第2魔力発電所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KYORYOKUNA_MARYOKU)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 灰色狼の森特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIIRO_OKAMINO_MORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GRAY_WOLF)) > 0) {
			w += 30 * cardCount;
		}
	}

	// ヴェルンド渓谷 外郭 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MU_FILD01J]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_VOLIMPET)) > 0) {
			w += 30 * cardCount;
		}
	}

	// 破壊されたゲフェンフィールド 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEM_FILDJ]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_POLLUTED_SILK_FROG)) > 0) {
			w += 30 * cardCount;
		}
	}
	
	// 破壊されたウェルス 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEM_DUN01J]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_ENCROACHED_DIMIK)) > 0) {
			w += 30 * cardCount;
		}
	}
	
	// 歪んだブリミル 1階 2階 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_UKNW_RUIN]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_SHADOW_JAILER)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// オズの迷路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OZNO_MEIRO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_VALTY)) > 0) {
			w += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_OZ_MAGMA_HOOD) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 廃棄実験所アミシティア特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENZYO_AMISITIA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HENI_CHIMERA_VANILAQUS)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 捨てられた穴01特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_01]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_DOKUTSU_CALMARING)) > 0) {
			w += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_ABANDONED_CLOAK) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 捨てられた穴02特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_02]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_TANGAN_DOLLOCARIS)) > 0) {
			w += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_ABANDONED_CLOAK) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 蛇神の温もり特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEBIGAMINO_NUKUMORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_SAIKAKYU_RGAN)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// アルデバラン時計塔地下 未知の空間特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO_MICHI_NO_KUUKAN]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GENERAL_ORK)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 魔力が歪んだ平原 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HARD_ROCK_TITAN)) > 0) {
			w += 30 * cardCount;
		}
		if (EquipNumSearch(ITEM_ID_DISTORTED_MAGIC_HOOD) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// ミョルニール地下洞窟 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIOLNIR_UNDERGROUND_CAVE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PUNCH_BUG)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// イスガルド北部（凍て付いた鱗の海辺、古代の氷の峡谷 東部、古代の氷の峡谷 西部） 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ISGARD_NORTH_FIELD]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_FAKE_IWIN_SOLDIERS)) > 0) {
			w += 30 * cardCount;
		}
	}

	// 凍て付いた鱗の氷河 特化
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_JOR_BACK3]) == 1){
		if (EquipNumSearch(ITEM_ID_AURORA_CURTAIN_ROBE) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 蛇神の根源 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_JOR_ROOT]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_JOR_MUNGANDR_GUARDIAN)) > 0) {
			w += 30 * cardCount;
		}
	}

	/** ギムレー 特化 */
	candidate = MonsterGroupObj[MONSTER_GROUP_ID_JOR_TMPLE1].concat(MonsterGroupObj[MONSTER_GROUP_ID_JOR_TMPLE2]);
	if(NumSearch(mobData[0], candidate) === 1){
		if ((cardCount = CardNumSearch(CARD_ID_YORDOS_EXECUTOR)) > 0) {
			w += 30 * cardCount;
		}
	}

	/** ヨルンビル 隆起した大地 特化 */
candidate = MonsterGroupObj[MONSTER_GROUP_ID_JOR_RAISE1].concat(MonsterGroupObj[MONSTER_GROUP_ID_JOR_RAISE2], MonsterGroupObj[MONSTER_GROUP_ID_JOR_BASE]);
	if(NumSearch(mobData[0], candidate) === 1){
		if ((cardCount = CardNumSearch(CARD_ID_SEA_WIND)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// その他の装備によるモンスター特化
	//--------------------------------
	w += GetEquippedTotalSPEquip(1000 + mobData[0]);

	//--------------------------------
	// その他のカードによるモンスター特化
	//--------------------------------
	w += GetEquippedTotalSPCardAndElse(1000+mobData[0]);

	//--------------------------------
	// 英雄の痕跡支援
	//--------------------------------
	if(TimeItemNumSearch(72)){
		if(743 <= mobData[0] && mobData[0] <= 757) w += 20;
		if(769 <= mobData[0] && mobData[0] <= 786) w += 20;
	}

	//--------------------------------
	// 12thアニバ星座支援
	//--------------------------------
	if(TimeItemNumSearch(80)) w += 30;

	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、地域特化効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_GROUP_DAMAGE_UP);
	if (confval != 0) {
		w += confval;
	}


	// 移行前データでの処理（移行完了まで必要）
	else {

		//--------------------------------
		// グラストヘイムアビス特化
		//--------------------------------
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GLASTHEIM_ABYSS]) == 1){
			if (EquipNumSearch(ITEM_ID_SHIROKISHINO_MANT) > 0) {
				w += 10;
				if (n_A_SHOULDER_DEF_PLUS >= 5) {
					w += 15;
				}
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					w += 15;
				}
			}
		}
	}
	dmg = Math.floor(dmg * w /100);

	// ボス／一般特化
	w = 0;
	if(mobData[20] == 1) {
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS];
	}
	else {
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS];
	}

	// 物理ダメージUP
	w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP];
	dmg = Math.floor(dmg * (100+w) /100);

	//--------------------------------
	// ＥＤＰ補正
	//--------------------------------
	if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)){

		switch (n_A_ActiveSkill) {

		// 習得できるスキルのうち効果が適用されないもの
		case SKILL_ID_SUNAMAKI:
		case SKILL_ID_ISHINAGE:
		case SKILL_ID_GRIM_TOOTH:
		case SKILL_ID_VENOM_SPLASHER:
		case SKILL_ID_POISON_REACT:
		case SKILL_ID_VENOM_KNIFE:
		case SKILL_ID_METEOR_ASSALT:
			break;

		// 習得できないスキルのうち効果が適用されないもの

		// 効果が適用されるもの
		default:
			if ((g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
				dmg = Math.floor(dmg * (150 + 50 * UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) / 100);
			}
			break;
		}
	}

	return Math.floor(dmg);
}

