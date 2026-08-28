/**
 * BattleCalc999Core「物理スキル　特殊計算式」ブロックの分割（Phase 3b）。
 *
 * 物理基本計算式（head-skill-formula-physical.js）で該当スキルが無かった場合に
 * 呼ばれる。制御フロー変換の方針は同ファイルの JSDoc を参照
 * （switch 末尾の `break;` → `return undefined;` の1箇所のみが非バイト単位の変更）。
 */
import { myInnerHtml } from "../runtime/util.js";
import { CCharaConfNizi } from "../chara/CCharaConfNizi.js";
import { CardNumSearch, EquipNumSearch, TimeItemNumSearch } from "../chara/chara.js";
import {
    CHARA_DATA_INDEX_DEF_DIV, CHARA_DATA_INDEX_DEF_MINUS, CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP,
    CHARA_DATA_INDEX_MDEF_DIV, CHARA_DATA_INDEX_MDEF_MINUS, CHARA_DATA_INDEX_STATUS_ATK
} from "../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_SHIELD } from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT } from "../const/EnumItemDataIndex.js";
import {
    ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND, ITEM_KIND_KNIFE, ITEM_KIND_SWORD
} from "../const/EnumItemKind.js";
import {
    ITEM_SP_HEAL_UP_USING, ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON, ITEM_SP_SKILL_DAMAGE_OFFSET
} from "../const/EnumItemSpId.js";
import { MIG_PARAM_ID_POW } from "../const/EnumMigItemParamId.js";
import { MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF } from "../const/EnumMonsterDataIndex.js";
import { SIZE_ID_LARGE, SIZE_ID_MEDIUM, SIZE_ID_SMALL } from "../const/EnumSizeId.js";
import { zokusei } from "../etc.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, ROUNDDOWN } from "../bridge/foot-bridge.js";
import { ItemObjNew } from "../item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import { n_B_KYOUKA } from "../monster/mobconfbuf.js";
import {
    MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE, MOB_CONF_DEBUF_ID_LEX_AETERNA, MOB_CONF_DEBUF_ID_SEKIKA,
    MOB_CONF_DEBUF_ID_TOUKETSU, n_B_IJYOU
} from "../monster/mobconfdebuf.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO,
    MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import { MonsterObjNew } from "../monster.dat.js";
import {
    BK_n_A_MATK, n_A_AGI, n_A_BodyZokusei, n_A_DEX, n_A_Equip, n_A_INT, n_A_JOB, n_A_JobLV, n_A_LUK, n_A_MATK,
    n_A_SHIELD_DEF_PLUS, n_A_STR, n_A_VIT, n_A_WeaponLV_seirenATK, n_A_WeaponType, n_B_DEF2, n_B_MDEF2
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ABR_DUAL_CANNON, SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_ACID_TERROR, SKILL_ID_AIMED_BOLT,
    SKILL_ID_ARMS_CANNON, SKILL_ID_ASHURA_HAOKEN, SKILL_ID_ASHURA_HAOKEN_SPKOTEI, SKILL_ID_BAKURETSU_KUNAI,
    SKILL_ID_BEAST_STRAIFING, SKILL_ID_BIOPLANT, SKILL_ID_BLAST_MINE, SKILL_ID_BLITZ_BEAT, SKILL_ID_BLOOD_SUCKER,
    SKILL_ID_BOWLING_BASH, SKILL_ID_BUKI_KENKYU, SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_CART_CANNON,
    SKILL_ID_CART_KAIZO, SKILL_ID_CART_REVOLUTION, SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_CLAYMORE_TRAP,
    SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT, SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE, SKILL_ID_COMBO_RESERVED_803,
    SKILL_ID_COMBO_RESERVED_804, SKILL_ID_COMBO_RESERVED_805, SKILL_ID_COMBO_RESERVED_806,
    SKILL_ID_COMBO_RESERVED_807, SKILL_ID_COMBO_RESERVED_808, SKILL_ID_COMBO_RESERVED_809,
    SKILL_ID_COMBO_SANDAN_CHAMP, SKILL_ID_COMBO_SANDAN_MONK, SKILL_ID_COMBO_SORYUKYAKU,
    SKILL_ID_COUNT_OF_RG_FOR_BANDING, SKILL_ID_CRAZY_WEED, SKILL_ID_DEATHPERAD, SKILL_ID_DEATH_BOUND,
    SKILL_ID_DOUBLE_STRAFING, SKILL_ID_DRAGONIC_AURA_STATE, SKILL_ID_DRAGON_TRAINING, SKILL_ID_EARTH_QUAKE,
    SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_ENVENOM, SKILL_ID_FALCON_ASSALT, SKILL_ID_FIRE_DRAGON_BREATH,
    SKILL_ID_FIRE_EXPANSION, SKILL_ID_FIRE_PILLAR, SKILL_ID_FREEZING_TRAP, SKILL_ID_FUMASHURIKEN_NAGE,
    SKILL_ID_GRAND_CROSS, SKILL_ID_GRAVITATION_FIELD, SKILL_ID_HAKKEI, SKILL_ID_HAPPO_KUNAI, SKILL_ID_HASAICHU,
    SKILL_ID_HEAL, SKILL_ID_HELLS_PLANT, SKILL_ID_HELL_INFERNO, SKILL_ID_HESPERUS_SLIT,
    SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_INSPIRATION, SKILL_ID_ISHINAGE, SKILL_ID_ISSEN, SKILL_ID_ISSEN_MAX,
    SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_KIKO, SKILL_ID_KOEN_KYAKU, SKILL_ID_KUNAI_NAGE, SKILL_ID_LAND_MINE,
    SKILL_ID_MADOGEAR, SKILL_ID_MADOGEAR_LICENSE, SKILL_ID_MAGIC_CRUSHER, SKILL_ID_MAGMA_ILLUPTION,
    SKILL_ID_MAINFRAME_KAIZO, SKILL_ID_MASS_SPIRAL, SKILL_ID_MEDITATIO, SKILL_ID_MUCHANAGE, SKILL_ID_NAPALM_BEAT,
    SKILL_ID_NAPALM_VULKAN, SKILL_ID_ONO_SHUREN, SKILL_ID_ONO_SHUREN_MECHANIC, SKILL_ID_OVER_BLAND, SKILL_ID_PIERCE,
    SKILL_ID_PINGPOINT_ATTACK, SKILL_ID_POISON_REACT, SKILL_ID_PRESSURE, SKILL_ID_QUICKDRAW_SHOT,
    SKILL_ID_RESURRECTION, SKILL_ID_ROUND_TRIP, SKILL_ID_SACRIFICE, SKILL_ID_SANCTUARY, SKILL_ID_SELF_DESTRUCTION,
    SKILL_ID_SELF_DESTRUCTION_MAX, SKILL_ID_SENKO_RENGEKI, SKILL_ID_SHIDAN, SKILL_ID_SHIELD_BOOMERANG,
    SKILL_ID_SHIELD_BOOMERANG_TAMASHI, SKILL_ID_SHIELD_CHAIN, SKILL_ID_SHURASHINDAN, SKILL_ID_SHURIKEN_NAGE,
    SKILL_ID_SOUL_BREAKER, SKILL_ID_SPEAR_QUICKEN, SKILL_ID_SPIRAL_PIERCE, SKILL_ID_STEEL_CROW,
    SKILL_ID_TETRA_BOLTEX, SKILL_ID_THORN_TRAP, SKILL_ID_TOTEKI_SHUREN, SKILL_ID_TRAP_KENKYU, SKILL_ID_TRIPLE_ACTION,
    SKILL_ID_TURN_UNDEAD, SKILL_ID_VENOM_SPLASHER, SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_ZENI_NAGE,
    SKILL_ID_ZYUMONZIGIRI, SKILL_ID_ZYURYOKU_CHOSE
} from "../skill/skill.dat.js";
import {
    TIME_ITEM_ID_DEMI_FREYA, TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD, TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD
} from "../timeitem.dat.js";
import { CanonOBJ, KunaiOBJ, SyurikenOBJ } from "../attackmethod.dat.js";
import { AS_PLUS } from "../skill/calcautospell.js";
import { GetHigherJobSeriesID } from "../data/mig.job.h.js";
import { __DIG3, g_confDataNizi, g_skillManager } from "../runtime/global.js";
import {
    ATKbaiJYOUSAN, ApplyAttackDamageAmplify, ApplyElementRatio, ApplyHitJudgeElementRatio, ApplyLexAeterna,
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyMonsterDefence, ApplyPhysicalDamageRatio,
    ApplyPhysicalSkillDamageRatioChange, ApplyPhysicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BaiTaisei_A_SP, BaiTaisei_C, BaiTaisei_E, BuildBattleResultHtml, BuildCastAndDelayHtml, GetActHitRateAll,
    GetBattlerAtkPercentUp, GetBattlerMatkPercentUp, GetFixedAppendAtk, GetPerfectHitDamage, GetSpiderWebDamageRatio,
    HealCalc, TYPE_SYUUREN
} from "../bridge/head-bridge.js";
import { SubName } from "./head-sub-name.js";
import { CS } from "./head-calc-state.js";
import { GetPAtk, GetTotalSpecStatus } from "../chara/hmjob.js";
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_A_Weapon_zokusei, n_Delay, n_Enekyori, n_Heal_MATK, n_tok,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../runtime/ro4-state.js";
import { UsedSkillSearch } from "../skill/skillstate.js";

export function ApplyPhysicalSkillFormulaSpecial(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    let w_MATK = [0,0,0];

		var bPhysicalFormula = true;

		switch (n_A_ActiveSkill) {

		case SKILL_ID_AIMED_BOLT:
			set_n_Enekyori(1);
			CS.wCast = 4000;
			CS.n_KoteiCast = 1000;
			n_Delay[2] = 1000;
			n_Delay[7] = 500;
			if(n_A_ActiveSkillLV > 5){
				CS.wCast = 3500 - 400 * (n_A_ActiveSkillLV - 5);
				CS.n_KoteiCast = 1000 - 150 * (n_A_ActiveSkillLV - 5);
				n_Delay[2] = 1000 - 100 * (n_A_ActiveSkillLV - 5);
				n_Delay[7] = 500 - 50 * (n_A_ActiveSkillLV - 5);
			}
			CS.wbairitu = 500 + 50 * n_A_ActiveSkillLV;
			CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
			var w = attackMethodConfArray[0].GetOptionValue(0);
			if(w == 2){
				if(mobData[17] == 0){
					CS.wActiveHitNum = 2;
					CS.wbairitu *= 2;
				}
				if(mobData[17] == 1){
					CS.wActiveHitNum = 3;
					CS.wbairitu *= 3;
				}
				if(mobData[17] == 2){
					CS.wActiveHitNum = 4;
					CS.wbairitu *= 4;
				}
			}
			if(w == 3){
				if(mobData[17] == 0){
					CS.wActiveHitNum = 3;
					CS.wbairitu *= 3;
				}
				if(mobData[17] == 1){
					CS.wActiveHitNum = 4;
					CS.wbairitu *= 4;
				}
				if(mobData[17] == 2){
					CS.wActiveHitNum = 5;
					CS.wbairitu *= 5;
				}
			}

			// 必中ダメージのみ仮計算（属性倍率未適用）
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			if(w != 1){
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += CS.n_PerfectHIT_DMG;
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
				}
				if(CS.n_AS_MODE) return w_DMG;
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
					if(CS.wActiveHitNum > 1) CS.g_damageTextArray[i].push("(", (w_DMG[i] / CS.wActiveHitNum), "×", CS.wActiveHitNum, "Hit)");
				}
			}
			else{
				var sizebai = [[2,2.5,3],[3,3.4,4],[4,4.3,5]];
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * (CS.wbairitu * sizebai[mobData[17]][i] + GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray)) / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += CS.n_PerfectHIT_DMG;
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(Math.floor(w_DMG[i] / sizebai[mobData[17]][i]) * sizebai[mobData[17]][i]);
				}
				if(CS.n_AS_MODE) return w_DMG;
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
					if(i != 1) CS.g_damageTextArray[i].push("(", Math.floor(w_DMG[i] / sizebai[mobData[17]][i]), "×", sizebai[mobData[17]][i], "Hit)");
				}

			}

			// 改めて必中ダメージのみ計算（属性倍率適用）
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
			CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);

			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;

		case SKILL_ID_MAGIC_CRUSHER:
			set_n_Enekyori(1);
			CS.wCast = 300;
			n_Delay[2] = 300;
			for(var i=0;i<=2;i++){
				w_MATK[i] = BK_n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}

			// 必中ダメージのみ仮計算（属性倍率未適用）
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i];
				w_DMG[i] += ROUNDDOWN(w_MATK[i] / 5);
				w_DMG[i] -= CS.B_Total_DEF;
				if(w_DMG[i] <1) w_DMG[i] = 1;
				w_DMG[i] += n_A_WeaponLV_seirenATK;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],n_A_Weapon_zokusei);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += CS.n_PerfectHIT_DMG;
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}

			// 改めて必中ダメージ計算
			CS.n_PerfectHIT_DMG = n_A_WeaponLV_seirenATK;
			CS.n_PerfectHIT_DMG = ApplyElementRatio(mobData, CS.n_PerfectHIT_DMG,n_A_Weapon_zokusei);
			CS.n_PerfectHIT_DMG += GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
			CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG *(100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;

		case SKILL_ID_DOUBLE_STRAFING:
		case SKILL_ID_PIERCE:
		case SKILL_ID_FREEZING_TRAP:
		case SKILL_ID_SHIDAN:
		case SKILL_ID_BOWLING_BASH:
		case SKILL_ID_TRIPLE_ACTION:
		case SKILL_ID_BEAST_STRAIFING:
		case SKILL_ID_DEATHPERAD:
		case SKILL_ID_HESPERUS_SLIT:
		case SKILL_ID_CRAZY_WEED:
		case SKILL_ID_QUICKDRAW_SHOT:
			if(n_A_ActiveSkill==SKILL_ID_DOUBLE_STRAFING){
				set_n_Enekyori(1);
				CS.wbairitu += 10 * n_A_ActiveSkillLV - 10;
				CS.wHITsuu = 2;
			}else if(n_A_ActiveSkill==SKILL_ID_PIERCE){
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wHITsuu = mobData[17]+1;
			}else if(n_A_ActiveSkill==SKILL_ID_BOWLING_BASH){
				CS.wbairitu += 40 * n_A_ActiveSkillLV;
				CS.wCast = 700;
				CS.wHITsuu = 2;
				if(n_A_ActiveSkillLV == 1) CS.wHITsuu = 1;
				CS.wLAch = true;
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 1){
					CS.wHITsuu = 3;
					if(n_A_ActiveSkillLV == 1) CS.wHITsuu = 2;
				}
			}else if(n_A_ActiveSkill==SKILL_ID_SHIDAN){
				CS.wbairitu += (25 + 25 * n_A_ActiveSkillLV);
				if(GetHigherJobSeriesID(n_A_JOB)==15) {
					w = UsedSkillSearch(SKILL_ID_KIKO);
				}
				else {
					w = g_confDataNizi[CCharaConfNizi.CONF_ID_KIKO];
				}
				if(w > n_A_ActiveSkillLV){
					w = n_A_ActiveSkillLV;
				}
				CS.wHITsuu = w;
				CS.wCast = (1 + w) * 1000;
				n_Delay[2] = 500;
				set_n_Enekyori(1);
			}else if(n_A_ActiveSkill==SKILL_ID_TRIPLE_ACTION){
				set_n_Enekyori(1);
				n_Delay[2] = 1000;
				CS.wbairitu += 50;
				CS.wHITsuu = 3;
			}else if(n_A_ActiveSkill==SKILL_ID_BEAST_STRAIFING){
				n_Delay[0] = 1;
				set_n_Enekyori(1);
				CS.wbairitu += n_A_STR * 8 - 50;
				CS.wHITsuu = 2;
			}else if(n_A_ActiveSkill==SKILL_ID_DEATHPERAD){
				set_n_Enekyori(1);
				CS.wbairitu += 50 * n_A_ActiveSkillLV - 50;
				n_Delay[2] = 1000;
				var DEATH = [1,1.2,1.6,2,2.4,3,3.6,4,5,6,7,8,9,10];
				CS.wHITsuu = DEATH[attackMethodConfArray[0].GetOptionValue(0)];
			}else if(n_A_ActiveSkill==SKILL_ID_HESPERUS_SLIT){
				CS.wCast = 2000;
				n_Delay[2] = 1000;
				n_Delay[7] = 2000;

				var w = 1 + UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING);
				if(
					UsedSkillSearch(SKILL_ID_INSPIRATION)
					|| TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
					|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
					|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
					){
					if(UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING) == 0) w = 3;
				}

				CS.wbairitu = 120 * n_A_ActiveSkillLV + 200 * w;
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);

				// ヘスペルスリットは、なぜか「６人のとき“だけ”」威力が１．５倍されるらしい
				if (w == 6) {
					CS.wbairitu = Math.floor(CS.wbairitu * 150 / 100);
				}

				CS.wHITsuu = w;

			}else if(n_A_ActiveSkill==SKILL_ID_CRAZY_WEED){
				set_n_A_Weapon_zokusei(2);
				CS.wCast = 500 + 500 * n_A_ActiveSkillLV;
				n_Delay[2] = 500 + 500 * Math.round(n_A_ActiveSkillLV / 2);
				n_Delay[7] = 5000;
				CS.wbairitu = 500 + 100 * n_A_ActiveSkillLV;
				CS.wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			}

			else if(n_A_ActiveSkill == SKILL_ID_QUICKDRAW_SHOT){
				set_n_Enekyori(1);
				CS.wCast = 0;
				n_Delay[2] = 0;
				n_Delay[7] = 0;
				CS.wHITsuu = ROUNDDOWN(n_A_JobLV / 20) + 1;
			}

			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, CS.n_A_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				if(n_A_ActiveSkill==391 && mobData[19]!=2 && mobData[19]!=4) w_DMG[i] = 0;
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			if (CS.n_AS_MODE && attackMethodConfArray.length > 1) {
				if(attackMethodConfArray[1].GetSkillId() != 391){
					// TODO: ダメージ表示方式変更対応
					// for(var i=0;i<=2;i++) w_DMG[i] *= wHITsuu;
					return w_DMG;
				}
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_B[i] = w_DMG[i];
				if(n_A_ActiveSkill==76) CS.Last_DMG_B[i] = w_DMG[i] * 2;

				// TODO: ダメージ表示方式変更対応
				// Last_DMG_A[i] = w_DMG[i] * wHITsuu;

				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0 || !CS.wLAch) CS.g_damageTextArray[i].push(Math.floor(w_DMG[i] * CS.wHITsuu), "(", w_DMG[i], SubName[8], CS.wHITsuu, "hit)");
				else{
					CS.g_damageTextArray[i].push((w_DMG[i] * 3), "(", (w_DMG[i] * 2), "＋", w_DMG[i], ")");
					CS.Last_DMG_B[i] = w_DMG[i] * 3;
				}

				// TODO: ダメージ表示方式変更対応
				// w_DMG[i] *= wHITsuu;
			}
			if(CS.n_AS_MODE) return w_DMG;
			var wX = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			wX = ApplyHitJudgeElementRatio(n_A_ActiveSkill, wX, mobData);
			wX = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wX);

			// TODO: ダメージ表示方式変更対応
			// w_DMG[1] = (w_DMG[1] * w_HIT + wX * wHITsuu *(100-w_HIT))/100;
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + wX * (100-CS.w_HIT))/100;

			if(CS.wHITsuu == 0 && n_A_ActiveSkill==192){
				if(GetHigherJobSeriesID(n_A_JOB) == 15) CS.g_damageTextArray[0] = ["<Font color=Red><B>指弾の計算をするには<BR>気功を1以上にして下さい</B></Font>"];
				else CS.g_damageTextArray[0] = ["<Font color=Red><B>指弾の計算をするには<BR>気功(天下大将軍C)を<BR>1以上にして下さい</B></Font>"];
			}

			if (CS.wHITsuu < 3 && n_A_ActiveSkill == SKILL_ID_HESPERUS_SLIT) {
				CS.g_damageTextArray[0] = ["<Font color=Red><B>パッシブ持続系の欄で<BR>RGの人数を3人以上にするか、インスピレーション状態に設定してください</B></Font>"];
			}

			AS_PLUS();

			// TODO: ダメージ表示方式変更対応
			// n_PerfectHIT_DMG = wX * wHITsuu;

			CS.str_PerfectHIT_DMG = __DIG3(wX * CS.wHITsuu) +"("+ __DIG3(wX) +"×"+ CS.wHITsuu +"hit)";
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;

		case SKILL_ID_ISHINAGE:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 50;
			set_n_A_Weapon_zokusei(0);
			set_n_Enekyori(1);
			var ISI = 50;
			ISI = ApplyElementRatio(mobData, ISI,0);
			ISI = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, ISI);
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = ISI;
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				w_DMG[i] = ISI;
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;

		case SKILL_ID_BLITZ_BEAT:
		case SKILL_ID_FALCON_ASSALT: {
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(0);
			set_n_Enekyori(1);
			const steel_crow_lv = Math.max(LearnedSkillSearch(SKILL_ID_STEEL_CROW), UsedSkillSearch(SKILL_ID_STEEL_CROW));
			let wBT = 80 + Math.floor(n_A_DEX /10)*2 + Math.floor(n_A_INT/2)*2 + steel_crow_lv *6;
			if(n_A_ActiveSkill==SKILL_ID_FALCON_ASSALT){
				wBT = Math.floor(wBT * (150 + 70 * n_A_ActiveSkillLV) /100);
				wBT = ApplyElementRatio(mobData, wBT,0);
				wBT = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wBT);
				wBT *= 5;
				CS.wCast = 1000;
				n_Delay[2] = 3000;
			}else{
				wBT = ApplyElementRatio(mobData, wBT,0);
				wBT = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wBT);
				wBT *= n_A_ActiveSkillLV;
				CS.wCast = 1500;
				n_Delay[2] = 1000;
			}
			if(CS.n_AS_MODE){
				w_DMG[0] = w_DMG[1] = w_DMG[2] = wBT;
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = wBT;
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				if(n_A_ActiveSkill==118){
					CS.Last_DMG_B[i] = wBT / n_A_ActiveSkillLV;
					CS.g_damageTextArray[i].push("(", CS.Last_DMG_B[i], "×", n_A_ActiveSkillLV, "Hit)");
				}
				w_DMG[i] = wBT;
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_ENVENOM:
		case SKILL_ID_POISON_REACT:
		/* TODO */
		// 本来の分岐条件は以下の通り。ポイズンリアクトの計算式でずれる可能性大
		// else if(n_A_ActiveSkill==17 || (n_A_ActiveSkill==86 && (mobData[18] <50 || 60 <= mobData[18]))){

			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
			set_n_A_Weapon_zokusei(5);
			CS.n_PerfectHIT_DMG = 0;
			var AS_ATK = 0;
			if(CS.n_AS_MODE){
				AS_ATK = n_A_ActiveSkillLV * 15;
				AS_ATK = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, AS_ATK);
				AS_ATK = ApplyElementRatio(mobData, AS_ATK,n_A_Weapon_zokusei);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, CS.n_A_DMG[i] + AS_ATK);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SHIELD_BOOMERANG:
		case SKILL_ID_SHIELD_BOOMERANG_TAMASHI:
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			n_Delay[2] = 700;
			if(n_A_ActiveSkill==SKILL_ID_SHIELD_BOOMERANG_TAMASHI) n_Delay[2] = 350;
			var wSBr = n_A_SHIELD_DEF_PLUS *4;
			var wbairitu2 = (100 + 30 * n_A_ActiveSkillLV);
			if(n_A_ActiveSkill==SKILL_ID_SHIELD_BOOMERANG_TAMASHI) wbairitu2 *= 2;
			for(var i=0;i<=2;i++){
				w_DMG[i] = charaData[CHARA_DATA_INDEX_STATUS_ATK] + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT] + wSBr;
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] -= CS.B_Total_DEF;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * wbairitu2 / 100);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				if(n_B_KYOUKA[10]){
					if(n_B_KYOUKA[10] == 6) w_DMG[i] = Math.floor(w_DMG[i] *12.5 / 100);
					else w_DMG[i] -= Math.floor(w_DMG[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
				}
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT)/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「パラディン」スキル「シールドチェーン」
		case SKILL_ID_SHIELD_CHAIN:
			/**
			 *  2024/01/23 時点のゲーム内結果と全くダメージが合わない (YE鯖にて)
			 *  式の中で減算Defが効きすぎている模様
			 *  シールドシューティングの検証以前の話なので実装先送り
			 */
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			CS.wCast = 1000;
			n_Delay[2] = 1000;
			var w_Weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT];
			// 通常スキル倍率
			var SdCBAI = [0,130,160,190,220,250];
			/*
			実測確認出来るまでコメントアウト

			if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
				SdCBAI = [0,360,420,480,540,600];
			}
			 */
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + w_Weight + n_A_SHIELD_DEF_PLUS * 4;
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * SdCBAI[n_A_ActiveSkillLV] / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(n_B_KYOUKA[10]){
					if(n_B_KYOUKA[10] == 6) w_DMG[i] = Math.floor(w_DMG[i] *12.5 / 100);
					else w_DMG[i] -= Math.floor(w_DMG[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
				}
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(w_DMG[i] <0) w_DMG[i] = 0;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_B[i] = w_DMG[i];
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] * 5;
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i], "(", CS.Last_DMG_B[i], SubName[8], "5hit)");
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			w_DMG[1] = w_DMG[1] * CS.w_HIT /100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SPIRAL_PIERCE:	// スパイラルピアース
			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
			var wSYUUREN = TYPE_SYUUREN(mobData, attackMethodConfArray, false);
			for(var i=0;i<=2;i++){
				var wSPP;
				wSPP = ROUNDDOWN((CS.n_A_DMG[i] - wSYUUREN) * 70 / 100) + ROUNDDOWN(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] * 70 / 100);
				if(mobData[17] == 0) wSPP = ROUNDDOWN(wSPP * 115 / 100);
				if(mobData[17] == 2) wSPP = ROUNDDOWN(wSPP * 85 / 100);
				wSPP += wSYUUREN;
				wSPP = Math.floor(wSPP * CS.wbairitu / 100);
				wSPP = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, wSPP);
				wSPP = ApplyMonsterDefence(mobData, wSPP,0);
				w_DMG[i] = wSPP;
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_B[i] = w_DMG[i];
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] * 5;
				if(!CS.n_AS_MODE) {
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i], "(", CS.Last_DMG_B[i], SubName[8], "5hit)");
				}
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			w_DMG[1] = w_DMG[1] * CS.w_HIT /100 + CS.n_PerfectHIT_DMG * (100- CS.w_HIT)/100;
			if(CS.n_AS_MODE) return w_DMG;

			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_VENOM_SPLASHER:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			n_Delay[0] = 1;
			n_Delay[7] = 7000 + 500 * n_A_ActiveSkillLV;
			CS.wCast = 1000;
			var VSbai = 500 + 75 * n_A_ActiveSkillLV;
			VSbai = ATKbaiJYOUSAN(VSbai);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ROUNDDOWN((CS.n_A_DMG[i]) * VSbai / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				if(mobData[20] == 1) w_DMG[i] = 0;
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SOUL_BREAKER:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			set_n_Enekyori(1);
			CS.wCast = 500;
			n_Delay[2] = 800 + 200 * n_A_ActiveSkillLV;
			var wbai = (300 + 50 * n_A_ActiveSkillLV);
			if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbai = ROUNDDOWN(wbai / 2);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				var BK_X = n_A_Weapon_zokusei;
				set_n_A_Weapon_zokusei(0);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				set_n_A_Weapon_zokusei(BK_X);
				w_MATK[i] = BaiTaisei_C(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = ROUNDDOWN(CS.n_A_DMG[i] * wbai / 100);
				w_DMG[i] += ROUNDDOWN(w_MATK[i] * wbai / 100);
				w_DMG[i] -= (mobData[13] + mobData[14] + n_B_MDEF2 + n_B_DEF2[0]);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(w_DMG[i] <0) w_DMG[i] = 0;
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			if(5 <= mobData[21] && mobData[21] <= 9){
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = 1;
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				}
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_GRAND_CROSS:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			myInnerHtml("CRIATKname",'<Font color="#FF0000">発動コスト</Font>',0);
			myInnerHtml("CRIATK",'<Font color="#FF0000">'+ __DIG3(Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] /5)) +"</Font>",0);
			myInnerHtml("CRInumname",'<Font color="#FF0000">反動ダメージ</Font>',0);
			set_n_Enekyori(2);
			set_n_A_Weapon_zokusei(6);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = BaiTaisei_A_SP(w_MATK[i]);
				w_MATK[i] -= Math.floor(w_MATK[i] * n_tok[57] / 100);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG_GX[i] + w_MATK[i];
				w_DMG[i] = ROUNDDOWN(w_DMG[i] / 2);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * (100 + 40 * n_A_ActiveSkillLV) / 100);
				w_DMG[i] -= (charaData[CHARA_DATA_INDEX_DEF_DIV] + charaData[CHARA_DATA_INDEX_DEF_MINUS] + charaData[CHARA_DATA_INDEX_MDEF_DIV] + charaData[CHARA_DATA_INDEX_MDEF_MINUS]);
				w_DMG[i] += ROUNDDOWN(w_DMG[i] * zokusei[n_A_BodyZokusei * 10 +1][6] / 100);
				w_DMG[i] = Math.floor(w_DMG[i] / 2);
				CS.n_A_GX_HANDO = true;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				CS.n_A_GX_HANDO = false;
				var wGXbai3 = 0;
				if(EquipNumSearch(2495)) wGXbai3 += n_A_BaseLV;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * (100+GetEquippedTotalSPEquip(5000+n_A_ActiveSkill)+GetEquippedTotalSPCardAndElse(5000+n_A_ActiveSkill) + wGXbai3) / 100);
			}
			if(!CS.n_AS_MODE) myInnerHtml("CRInum",'<Font color="#FF0000">'+ __DIG3(w_DMG[0]) +"×3hit～"+ __DIG3(w_DMG[2]) +"×3hit</Font>",0);
			CS.wCast = 3000;
			n_Delay[2] = 1500;
			CS.wLAch = true;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			if(n_B_KYOUKA[7]){
				for(var i=0;i<=2;i++) CS.n_A_DMG[i] += Math.floor(CS.n_A_DMG[i] * (20 * n_B_KYOUKA[7]) / 100);
				w_MATK[i] += Math.floor(w_MATK[i] * (20 * n_B_KYOUKA[7]) / 100);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + w_MATK[i] ;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] / 2);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * (100 + 40 * n_A_ActiveSkillLV) / 100);
				w_DMG[i] -= (mobData[13] + n_B_DEF2[i] + mobData[14] + n_B_MDEF2);
				set_n_Enekyori(1);
				w_DMG[i] = BaiTaisei_E(mobData, w_DMG[i]);
				set_n_Enekyori(2);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],6);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],6);
				if(w_DMG[i] <1)w_DMG[i]=1;
				if(60<=mobData[18] && mobData[18]<=69)w_DMG[i]=0;
			}
			if(CS.n_AS_MODE){
				for(var i=0;i<=2;i++) w_DMG[i] = w_DMG[i] * 3;
				return w_DMG;
			}
			if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0){
				for(var b=0;b<=2;b++){
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * 3;
					CS.g_damageTextArray[b].push(CS.Last_DMG_A[b], "(", w_DMG[b], SubName[8], "3hit)");
					w_DMG[b] = CS.Last_DMG_A[b];
				}
			}else{
				for(var b=0;b<=2;b++){
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * 4;
					CS.g_damageTextArray[b].push(CS.Last_DMG_A[b], "(", (w_DMG[b] * 2), "＋", w_DMG[b], SubName[8], "2hit)");
					w_DMG[b] = CS.Last_DMG_A[b];
				}
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_CART_REVOLUTION: {
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			const cart_kaizo_lv = Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
			const CRbai = attackMethodConfArray[0].GetOptionValue(0) / (8000 + 500 * cart_kaizo_lv) * 100;

			for(var i=0;i<=2;i++){
				w_DMG[i] = ROUNDDOWN(CS.n_A_DMG[i] * 150 / 100);
				w_DMG[i] += ROUNDDOWN(CS.n_A_DMG[i] * CRbai / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_PRESSURE:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			w_DMG[2] = 500 + 300 * n_A_ActiveSkillLV;
			if(5 <= mobData[21] && mobData[21] <= 9) w_DMG[2] = 1;
			w_DMG[0] = w_DMG[1] = w_DMG[2];
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			CS.wCast = 1500 + 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 1500 + n_A_ActiveSkillLV * 500;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SACRIFICE:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(0);
			w_DMG[2] = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * 0.09 * (0.9 + 0.1 * n_A_ActiveSkillLV));
			w_DMG[2] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[2]);
			w_DMG[2] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[2]);
			w_DMG[2] = ApplyElementRatio(mobData, w_DMG[2],0);
			w_DMG[0] = w_DMG[1] = w_DMG[2];
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_HAKKEI:
			CS.n_PerfectHIT_DMG = 0;
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wbairitu += 75 * n_A_ActiveSkillLV;
			var AS_ATK = 0;
			if(CS.n_AS_MODE){
				AS_ATK = Math.floor(mobData[13] / 2);
				AS_ATK = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, AS_ATK);
				AS_ATK = ApplyElementRatio(mobData, AS_ATK,n_A_Weapon_zokusei);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + AS_ATK;
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			AS_PLUS();
			CS.wCast = 1000;
			n_Delay[2] = 500;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ASHURA_HAOKEN:
		case SKILL_ID_ASHURA_HAOKEN_SPKOTEI:
			CS.n_PerfectHIT_DMG = 0;
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			set_n_A_Weapon_zokusei(0);

			if(n_A_ActiveSkill==SKILL_ID_ASHURA_HAOKEN) {
				CS.wbairitu += 700 + 10 * (attackMethodConfArray[0].GetOptionValue(0) -1);
			}
			else {
				CS.wbairitu += 700 + 10 * (charaData[CHARA_DATA_INDEX_MAXSP]-1);
			}

			var wASYU = 0;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wASYU = 200000 * n_A_ActiveSkillLV;
				break;

			default:
				wASYU = 250 + 150 * n_A_ActiveSkillLV;
				break;

			}

			for(var i=0;i<=2;i++){
				w_DMG[i] = Math.floor(CS.n_A_DMG[i] * CS.wbairitu / 100) + wASYU;
				w_DMG[i] -= CS.B_Total_DEF;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			AS_PLUS();
			CS.wCast = 4500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 3500 - 500 * n_A_ActiveSkillLV;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SHURIKEN_NAGE: {	// 手裏剣投げ
			set_n_Enekyori(1);
						CS.n_PerfectHIT_DMG = 0;
			CS.wbairitu = 100 + 5 * n_A_ActiveSkillLV;
			// 投擲修練Lv
			const toteki_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_TOTEKI_SHUREN), UsedSkillSearch(SKILL_ID_TOTEKI_SHUREN));
			for(let i = 0; i <= 2; i++){
				w_DMG[i] = CS.n_A_DMG[i] + SyurikenOBJ[attackMethodConfArray[0].GetOptionValue(0)][0] + 3 * toteki_shuren_lv + 4 * n_A_ActiveSkillLV;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_KUNAI_NAGE:
		case SKILL_ID_HAPPO_KUNAI:
			CS.n_PerfectHIT_DMG = 0;
			if (n_A_ActiveSkill == SKILL_ID_HAPPO_KUNAI) {
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
			}
			set_n_Enekyori(1);
			CS.wbairitu = 100 * n_A_ActiveSkillLV;
			if(n_A_ActiveSkill==SKILL_ID_HAPPO_KUNAI){
				CS.wbairitu = 300 + 60 * n_A_ActiveSkillLV;
			}
			var wKUNAI = KunaiOBJ[attackMethodConfArray[0].GetOptionValue(0)][0];

			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + wKUNAI;
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i], KunaiOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
				if(n_A_ActiveSkill==395){
					CS.Last_DMG_B[i] = ROUNDDOWN(w_DMG[i] / 3);
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] * 3;
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i], "(", CS.Last_DMG_B[i], SubName[8], "3hit)");
				}else{
					CS.Last_DMG_B[i] = w_DMG[i];
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				}
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_BAKURETSU_KUNAI: {	// 爆裂苦無
			CS.n_PerfectHIT_DMG = 0;
			CS.w_HIT_HYOUJI = 100;
			CS.w_HIT = 100;
			set_n_Enekyori(1);
			n_Delay[2] = 1000;
			n_Delay[7] = 1000;
			CS.wCast = 800 * n_A_ActiveSkillLV - 800;
			CS.n_KoteiCast = 800;
			// 投擲修練Lv
			const toteki_shuren_lv = Math.max(LearnedSkillSearch(SKILL_ID_TOTEKI_SHUREN), UsedSkillSearch(SKILL_ID_TOTEKI_SHUREN));
			CS.wbairitu = n_A_ActiveSkillLV * (50 + Math.floor(n_A_DEX / 4)) * toteki_shuren_lv * 0.4 * n_A_BaseLV / 100 + 10 * n_A_JobLV;
			var wKUNAI = 0;
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + wKUNAI;
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				CS.Last_DMG_B[i] = w_DMG[i];
				CS.Last_DMG_A[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_FUMASHURIKEN_NAGE:
			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu += (-50 + 250 * n_A_ActiveSkillLV);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
			set_n_Enekyori(1);
			CS.wCast = 3500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			CS.wActiveHitNum = 2 + Math.round(n_A_ActiveSkillLV / 2);
			for(var i=0;i<=2;i++){
				w_DMG[i] = Math.floor(CS.n_A_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				CS.g_damageTextArray[i].push("(", (CS.Last_DMG_A[i] / CS.wActiveHitNum), "×", CS.wActiveHitNum, "Hit)");
			}
			CS.n_PerfectHIT_DMG = ApplyElementRatio(mobData, ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData), 0);
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ZENI_NAGE:
			CS.w_HIT_HYOUJI = 100;
			CS.w_HIT = 100;
			set_n_Enekyori(1);
			n_Delay[2] = 5000;
			for(var i=0;i<=2;i++){
				var dm = [500,750,1000];
				w_DMG[i] = Math.floor(dm[i] * n_A_ActiveSkillLV);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_MUCHANAGE:
			CS.w_HIT = Math.floor((10 - (1 / (n_A_DEX + n_A_LUK)) * 500) * (n_A_ActiveSkillLV / 2 + 5));
			if(CS.w_HIT > 100) CS.w_HIT = 100;
			if(CS.w_HIT <0) CS.w_HIT = 0;
			CS.w_HIT_HYOUJI = CS.w_HIT;
			set_n_Enekyori(1);
			CS.wCast = 1000;
			n_Delay[7] = 10000;
			for(var i=0;i<=2;i++){
				var dm = [5000,7500,10000];
				w_DMG[i] = Math.floor(dm[i] * n_A_ActiveSkillLV);
				var wBunsan = attackMethodConfArray[0].GetOptionValue(0);
				if(wBunsan >= 2) w_DMG[i] = ROUNDDOWN(w_DMG[i] / wBunsan);
				if(mobData[20]==1) w_DMG[i] = w_DMG[i] / 2;
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				w_DMG[i] = Math.floor(w_DMG[i] / 10);
				CS.Last_DMG_B[i] = w_DMG[i];
				CS.Last_DMG_A[i] = w_DMG[i] * 10;
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i], "(", CS.Last_DMG_B[i], SubName[8], "10hit)");
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT)/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ISSEN:
		case SKILL_ID_ISSEN_MAX:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(0);
			set_n_Enekyori(1);
			var w_1senHP;
			if(n_A_ActiveSkill==SKILL_ID_ISSEN) {
				w_1senHP = attackMethodConfArray[0].GetOptionValue(0);
				if (w_1senHP == 0) {
					w_1senHP = charaData[CHARA_DATA_INDEX_MAXHP];
				}
			}
			else {
				w_1senHP = charaData[CHARA_DATA_INDEX_MAXHP];
			}
			CS.wActiveHitNum = 0;
			var wKageBai = 100;
			if(attackMethodConfArray[0].GetOptionValue(1)){
				wKageBai = 120 + 20 * attackMethodConfArray[0].GetOptionValue(1);
				CS.wActiveHitNum = 2 + attackMethodConfArray[0].GetOptionValue(1);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] * n_A_ActiveSkillLV + w_1senHP;
				w_DMG[i] = Math.floor(w_DMG[i] * wKageBai / 100);
				w_DMG[i] = w_DMG[i] - CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(mobData[20] == 1) w_DMG[i] = Math.floor(w_DMG[i] / 2);
				if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				if(CS.wActiveHitNum > 1) CS.g_damageTextArray[i].push("(", (CS.Last_DMG_A[i] / CS.wActiveHitNum), "×", CS.wActiveHitNum, "Hit)");
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ACID_TERROR:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wCast = 1000;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			CS.wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + w_MATK[i];
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] -= (CS.B_Total_DEF + CS.B_Total_MDEF);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				if(mobData[20]==1) w_DMG[i] = Math.floor(w_DMG[i] / 2);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			if(5 <= mobData[21] && mobData[21] <= 9){
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = 1;
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				}
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ACID_DEMONSTRATION:
		case SKILL_ID_FIRE_EXPANSION:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wCast = 400 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			CS.wHITsuu = n_A_ActiveSkillLV;

			if(n_A_ActiveSkill==SKILL_ID_FIRE_EXPANSION){
				CS.wCast = 2000;
				n_Delay[0] = 1;
				n_Delay[2] = 500;
				// アシッドデモンストレーションの習得Lvに応じたヒット数
				const acid_demonstration_lv = LearnedSkillSearch(SKILL_ID_ACID_DEMONSTRATION);
				CS.wHITsuu = Math.max(acid_demonstration_lv, attackMethodConfArray[0].GetOptionValue(0));
				if(CS.wHITsuu <5) CS.wHITsuu = 5;
			}
			var w1 = [0,0,0];
			for(var i=0;i<=2;i++){
				w1[i] = CS.n_A_DMG[i];
				if(n_B_KYOUKA[10]){
					if(n_B_KYOUKA[10] == 6) w1[i] = Math.floor(w1[i] *12.5 / 100);
					else w1[i] -= Math.floor(w1[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
				}
			}
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				// TODO: ダメージ表示方式変更対応
				// 後続でヒット数で割る処理があるので、問題なし？
				if(mobData[6] <= 120){
					w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * CS.wHITsuu / 100 * mobData[6] / 100);
				}else{
					w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * CS.wHITsuu / 100 * 120 / 100);
					if(mobData[0] == 679) w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * CS.wHITsuu / 100 * 125 / 100);
					if(mobData[0] == 715) w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * CS.wHITsuu / 100 * 127 / 100);
				}
				w_DMG[i] -= (CS.B_Total_DEF + CS.B_Total_MDEF);
				w_DMG[i] = Math.floor(w_DMG[i] / 2);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] / CS.wHITsuu);
				if(mobData[0] == 787) w_DMG[i] = Math.floor(w_DMG[i] / 2);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
			}
			// ダメージ表示方式変更対応に伴い、w_DMG[] には、1HIT分のダメージが入った状態で処理を抜けるように変更
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_LAND_MINE:
		case SKILL_ID_BLAST_MINE:
		case SKILL_ID_CLAYMORE_TRAP: {
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			n_Delay[0] = 1;
			set_n_Enekyori(0);
			if(n_A_ActiveSkill==SKILL_ID_LAND_MINE){
				set_n_A_Weapon_zokusei(2);
			}
			else if(n_A_ActiveSkill==SKILL_ID_BLAST_MINE){
				set_n_A_Weapon_zokusei(4);
			}
			else if(n_A_ActiveSkill==SKILL_ID_CLAYMORE_TRAP){
				set_n_A_Weapon_zokusei(3);
			}
			w_DMG[1] = n_A_DEX * (3 + n_A_BaseLV / 100) * (1 + n_A_INT / 35) * n_A_ActiveSkillLV;
			// トラップ研究習得Lv補正
			const trap_kenkyu_lv = Math.max(LearnedSkillSearch(SKILL_ID_TRAP_KENKYU), UsedSkillSearch(SKILL_ID_TRAP_KENKYU));
			w_DMG[1] += 40 * trap_kenkyu_lv;
			w_DMG[1] = ApplyElementRatio(mobData, w_DMG[1],n_A_Weapon_zokusei);
			w_DMG[0] = Math.floor(w_DMG[1] * 90 / 100);
			w_DMG[2] = Math.floor(w_DMG[1] * 110 / 100);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_HEAL:
		case 489:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(6);
			n_Delay[2] = 1000;
			set_n_Enekyori(2);
			if(n_A_ActiveSkill==489){
				CS.wCast = 400 * n_A_ActiveSkillLV;
				n_Delay[7] = 1000;
				if(CardNumSearch(611)) n_Delay[7] -= 1000;
			}
			for(var i=0;i<=2;i++){
				if(n_A_ActiveSkill==25) w_DMG[i] = HealCalc(n_A_ActiveSkillLV,0,i,2,0);
				else w_DMG[i] = HealCalc(n_A_ActiveSkillLV,1,i,2,0);
				w_DMG[i] = ApplyElementRatio(mobData, Math.floor(w_DMG[i] / 2),6);
				if(mobData[18] <90){
					w_DMG[i]=0;
				}
				w_DMG[i] = ApplyLexAeterna(mobData, w_DMG[i]);
				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SANCTUARY: {	// サンクチュアリ
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(6);
			CS.wCast = 5000;
			n_Delay[0] = 1;
			set_n_Enekyori(2);
			if(n_A_ActiveSkillLV <= 6) w_DMG[2] = 100 * n_A_ActiveSkillLV;
			else w_DMG[2] = 777;
			let w_HEAL_BAI = 100 + n_tok[ITEM_SP_HEAL_UP_USING];
			w_HEAL_BAI -= 2 * Math.max(LearnedSkillSearch(SKILL_ID_MEDITATIO), UsedSkillSearch(SKILL_ID_MEDITATIO));
			w_DMG[2] = Math.floor(w_DMG[2] * w_HEAL_BAI / 100);
			w_DMG[2] = ApplyElementRatio(mobData, Math.floor(w_DMG[2] / 2),6);
			if(mobData[18] <90 && mobData[19] != 6) w_DMG[2]=0;
			if(n_B_KYOUKA[7]) w_DMG[2] += Math.floor(w_DMG[2] * (20 * n_B_KYOUKA[7]) / 100);
			w_DMG[2] = ApplyLexAeterna(mobData, w_DMG[2]);
			w_DMG[2] = ApplyAttackDamageAmplify(mobData, w_DMG[2]);
			w_DMG[0] = w_DMG[1] = w_DMG[2];
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_TURN_UNDEAD:
		case SKILL_ID_RESURRECTION:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			if(CS.n_AS_MODE){
				for(var i=0;i<=2;i++) w_DMG[i] = 0;
				return w_DMG;
			}
			CS.n_PerfectHIT_DMG = 0;
			if(n_A_ActiveSkill==SKILL_ID_TURN_UNDEAD){
				set_n_A_Weapon_zokusei(6);
				CS.wCast = 1000;
			}else{
				set_n_A_Weapon_zokusei(0);
				CS.wCast = 8000 - n_A_ActiveSkillLV * 2000;
			}
			set_n_Enekyori(2);
			if(mobData[18] <90){
				w = 0;
				w_DMG[2] = 0;
				w_DMG[0] = 0;
				w_DMG[1] = 0;
			}else{
				if(mobData[20] != 1){
					w = (20 * n_A_ActiveSkillLV + n_A_BaseLV + n_A_INT +n_A_LUK)/1000;
					w_DMG[2] = mobData[3];
				}
				else{
					w = 0;
					w_DMG[2] = 0;
				}
				w_DMG[0] = n_A_BaseLV + n_A_INT + n_A_ActiveSkillLV *10;
				w_DMG[0] = ApplyElementRatio(mobData, w_DMG[0],n_A_Weapon_zokusei);
				w_DMG[1] = Math.round((mobData[3] * w + w_DMG[0] * (100-w)/100));
			}
			for(var i=0;i<=2;i++) CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
			CS.g_damageTextArray[0].push(w_DMG[0], "(失敗ダメージ)");
			CS.g_damageTextArray[1].push(w_DMG[1], "(一発期待値)");
			CS.g_damageTextArray[2].push(ApplyElementRatio(mobData, w_DMG[2], n_A_Weapon_zokusei), "(成功確率", Math.floor(w * 10000) / 100, "％)");
			n_Delay[2] = 3000;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case 488:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(6);
			CS.wCast = 3000;
			CS.n_KoteiCast = 2000;
			n_Delay[7] = 1000;
			n_Delay[0] = 1;
			CS.wHITsuu = 18;
			w_DMG[2] = n_A_BaseLV * 10 + n_A_INT;
			w_DMG[2] = ApplyElementRatio(mobData, w_DMG[2],6);
			if(mobData[18] <= 89 || 100 <= mobData[18]) w_DMG[2]=0;

			// TODO: ダメージ表示方式変更対応
			// w_DMG[2] = w_DMG[2] * wHITsuu;

			w_DMG[0] = w_DMG[1] = w_DMG[2];
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i], "(", (w_DMG[i] / CS.wHITsuu), "×", CS.wHITsuu, "hit)");
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_GRAVITATION_FIELD:
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 500;								// ダメージ間隔
			n_Delay[6] = 4000 + (n_A_ActiveSkillLV * 1000);	// オブジェクト存続時間
			// 固定ダメージ設定
			CS.w_HIT = 100;									// 命中率 100%
			w_DMG[2] = 500 + 100 * n_A_ActiveSkillLV;		// 固定ダメージ計算式
			// 固定ダメージ増加
			var damup = 0;
			damup += GetEquippedTotalSPEquip(ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_GRAVITATION_FIELD);
			damup += GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_GRAVITATION_FIELD);
			w_DMG[2] = w_DMG[2] * (100 + damup) / 100;
			w_DMG[2] = Math.floor(w_DMG[2]);
			// 草・エンペリウム相手は 1 ダメージ
			if (5 <= mobData[21] && mobData[21] <= 9) w_DMG[2] = 1;
			// ダメージ配列作成
			for (var i=0; i < 3; i++) {
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = w_DMG[2];
			}
			break;

		case 423:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			n_Delay[2] = 500;
			set_n_A_Weapon_zokusei(8);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + w_MATK[i];
				w_DMG[i] = w_DMG[i] - CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],8);
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「ルーンナイト」スキル「ファイアードラゴンブレス」
		// 「ルーンナイト」スキル「ウォータードラゴンブレス」
		case SKILL_ID_FIRE_DRAGON_BREATH:
		case SKILL_ID_WATER_DRAGON_BREATH: {
			// トレーニング未習得でもドラゴンに乗れるので LearnedSkillSearch に置き換えられない
			if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) == 0) {
				CS.n_Buki_Muri = true;
				break;
			}
			// 遠距離スキル
			set_n_Enekyori(1);
			// 必中スキル
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			// 詠唱時間等
			CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 属性補正
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
			// --------- ダメージ計算開始 ---------
			CS.n_PerfectHIT_DMG = 0;
			// 現HPとMaxSPから基本ダメージを算出
			var w_HP = attackMethodConfArray[0].GetOptionValue(0);
			if(w_HP == 0) {
				w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
			}
			var w = w_HP / 50 + charaData[CHARA_DATA_INDEX_MAXSP] / 4;
			// スキルLv補正
			w *= n_A_ActiveSkillLV;
			// ドラゴントレーニング補正. UsedSkillSearch の方は'Lv0'の前に'未騎乗'が挿入されているのでオフセットを合わせている
			const dragon_training_lv = Math.max(LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING), UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) - 1);
			w *= [100,100,105,110,115,120][dragon_training_lv] / 100;
			// Lv補正
			w *= n_A_BaseLV / 100;
			// ドラゴニックオーラ補正
			if (UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE) > 0) {
				if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE) {
					// YE鯖だと指数1.0298で誤差1に収まる
					w *= 1 + Math.pow(GetTotalSpecStatus(MIG_PARAM_ID_POW) + GetPAtk(), 1.0298) / 100 * 250 / 300;
				}
				else{
					// 通常鯖だと指数1.05555で誤差2桁以内に収まる
					w *= 1 + Math.pow(GetTotalSpecStatus(MIG_PARAM_ID_POW) + GetPAtk(), 1.05555) / 100 * 250 / 300;
				}
			}
			// --------- 減衰計算開始 ---------
			w = ApplyResistElement(mobData, w);
			var wX = GetSpiderWebDamageRatio();
			if(wX != 0) w = ROUNDDOWN(w * (100 + wX) / 100);
			w -= CS.B_Total_DEF;
			if(w <0) w = 0;
			w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
			w = ApplyElementRatio(mobData, w,n_A_Weapon_zokusei);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_DEATH_BOUND:
			if(CS.n_DEATH_BOUND[3] == 0){
				w_DMG[0] = 1;
				w_DMG[1] = 1;
				w_DMG[2] = 1;
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}else{
				n_Delay[0] = 1;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					n_Delay[7] = 2500 + 500 * n_A_ActiveSkillLV;
					break;

				default:
					n_Delay[7] = 3000;
					break;

				}

				w_DMG[0] = CS.n_DEATH_BOUND[0];
				w_DMG[1] = CS.n_DEATH_BOUND[1];
				w_DMG[2] = CS.n_DEATH_BOUND[2];
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				}
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				if(mobData[20] == 1) CS.g_damageTextArray[0].push("<BR><Font color=Red><B>(BOSS属性には無効)</B></Font>");
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
			break;

		case SKILL_ID_HELL_INFERNO:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wLAch = true;
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(2);
			CS.directSubtractionMdef = false;
			CS.wbairitu = 100;
			CS.n_bunkatuHIT = 0;
			var wBai = new Array();
			wBai[0] = 60 * n_A_ActiveSkillLV;
			wBai[0] = Math.floor(wBai[0] * n_A_BaseLV / 100);
			wBai[1] = 240 * n_A_ActiveSkillLV;
			wBai[1] = Math.floor(wBai[1] * n_A_BaseLV / 100);
			wBai[0] += GetBattlerMatkPercentUp();
			wBai[1] += GetBattlerMatkPercentUp();
			CS.wCast = 1000 + 200 * n_A_ActiveSkillLV;
			var wHell_DMG1 = [0,0,0];
			var wHell_DMG2 = [0,0,0];
			set_n_A_Weapon_zokusei(3);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			wHell_DMG1[0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wBai[0] / 100);
			wHell_DMG1[1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wBai[0] / 100);
			wHell_DMG1[2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wBai[0] / 100);
			set_n_A_Weapon_zokusei(7);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			wHell_DMG2[0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wBai[1] / 100);
			wHell_DMG2[1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wBai[1] / 100);
			wHell_DMG2[2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wBai[1] / 100);
			for(var i=0;i<=2;i++){
				if(wHell_DMG1[i] <0) wHell_DMG1[i] = 0;
				if(wHell_DMG2[i] <0) wHell_DMG2[i] = 0;
			}
			if(CS.n_AS_MODE){
				for(var i=0;i<=2;i++) w_DMG[i] = wHell_DMG1[i] + wHell_DMG2[i];
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wHell_DMG1[i] + wHell_DMG2[i];
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0) CS.g_damageTextArray[i].push(w_DMG[i], " (", wHell_DMG1[i], "+", wHell_DMG2[i], ")");
				else{
					var w = wHell_DMG1[i] * 2;
					var w2 = w + wHell_DMG2[i];
					CS.g_damageTextArray[i].push(w2, " (", w, "+", wHell_DMG2[i], ")");
					CS.Last_DMG_B[i] = w2;
				}
			}
			CS.n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_CHAIN_LIGHTNING:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			set_n_Enekyori(2);
			set_n_A_Weapon_zokusei(4);
			if(!CS.n_AS_MODE) CS.wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			else CS.wHITsuu = 4;
			CS.wCast = 500 + 1000 * n_A_ActiveSkillLV;
			CS.n_KoteiCast = 500;
			n_Delay[7] = 1000;
			var wC_DMG = new Array();
			for(var i=0;i<=5;i++) wC_DMG[i] = [0,0,0];
			var wBK_MATK = [0,0,0];
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wBK_MATK[i] = BK_n_A_MATK[i];
				wBK_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, wBK_MATK[i]);
				wBK_MATK[i] = ApplyResistElement(mobData, wBK_MATK[i]);
				wBK_MATK[i] = ApplyRegistPVPNormal(mobData, wBK_MATK[i]);
			}
			var T_check = -1;
			for(var i=0;i<=(CS.wHITsuu-1);i++){
				CS.wbairitu = 100 * n_A_ActiveSkillLV + 500;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				CS.wbairitu += (300 + 100 * n_A_ActiveSkillLV - i * 100);
				CS.wbairitu += GetBattlerMatkPercentUp();

				var ampHit = 1;
				if(!CS.n_AS_MODE) ampHit = attackMethodConfArray[0].GetOptionValue(1);

				if(i <= ampHit){
					wC_DMG[i][0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * CS.wbairitu / 100);
					wC_DMG[i][1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * CS.wbairitu / 100);
					wC_DMG[i][2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * CS.wbairitu / 100);
				}else{
					wC_DMG[i][0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[0] * CS.wbairitu / 100);
					wC_DMG[i][1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[1] * CS.wbairitu / 100);
					wC_DMG[i][2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[2] * CS.wbairitu / 100);
				}
				if(i==0){
					if(n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU] || n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]){
						T_check = mobData[18];
						mobData[18] = MonsterObjNew[mobData[0]][18];
						if(n_B_KYOUKA[6]) T_check = n_B_KYOUKA[6];
						if(n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE]) T_check = n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE] * 10 + (T_check % 10);
					}
				}
			}
			if(T_check != -1) mobData[18] = T_check;
			if(CS.n_AS_MODE){

				for(var i=0;i<=2;i++) {
					w_DMG[i] = wC_DMG[0][i] + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

					// TODO: ダメージ表示方式変更対応
					w_DMG[i] = Math.floor(w_DMG[i] / CS.wHITsuu);
				}

				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0){

					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wC_DMG[0][i] + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

					// TODO: ダメージ表示方式変更対応
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = Math.floor(w_DMG[i] / CS.wHITsuu);

					CS.g_damageTextArray[i].push(w_DMG[i], " (");
					for(var j=0;j<=(CS.wHITsuu-1);j++){
						CS.g_damageTextArray[i].push(wC_DMG[j][i]);
						if(j <5 && wC_DMG[j+1][i] != 0) CS.g_damageTextArray[i].push(" + ");
					}
					CS.g_damageTextArray[i].push(")");
				}else{

					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = (wC_DMG[0][i] * 2) + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

					// TODO: ダメージ表示方式変更対応
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = Math.floor(w_DMG[i] / CS.wHITsuu);

					CS.g_damageTextArray[i].push(w_DMG[i], " (");
					for(var j=0;j<=(CS.wHITsuu-1);j++){
						if(j==0) CS.g_damageTextArray[i].push(wC_DMG[j][i] * 2);
						else CS.g_damageTextArray[i].push(wC_DMG[j][i]);
						if(j <5 && wC_DMG[j+1][i] != 0) CS.g_damageTextArray[i].push(" + ");
					}
					CS.g_damageTextArray[i].push(")");
				}
			}
			CS.n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_TETRA_BOLTEX:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			set_n_Enekyori(2);
			CS.wCast = Math.min(9000, 4000 + 1000 * n_A_ActiveSkillLV);
			CS.n_KoteiCast = Math.max(1000, 6000 - 1000 * n_A_ActiveSkillLV);
			n_Delay[7] = 1000;
			CS.wbairitu = 500 + 500 * n_A_ActiveSkillLV;
			CS.wbairitu += GetBattlerMatkPercentUp();
			var wT_DMG1 = [0,0,0];
			var wT_DMG2 = [0,0,0];
			var wT_DMG3 = [0,0,0];
			var wT_DMG4 = [0,0,0];
			set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(0) / 10));
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG1[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
			}
			set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(0) % 10));
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG2[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
			}
			set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(1) / 10));
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG3[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
			}
			set_n_A_Weapon_zokusei(Math.floor(attackMethodConfArray[0].GetOptionValue(1) % 10));
			var T_check = -1;
			if(n_B_IJYOU[MOB_CONF_DEBUF_ID_TOUKETSU] || n_B_IJYOU[MOB_CONF_DEBUF_ID_SEKIKA]){
				T_check = mobData[3];
				mobData[18] = MonsterObjNew[mobData[0]][18];
				if(n_B_KYOUKA[6]) T_check = n_B_KYOUKA[6];
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE]) T_check = n_B_IJYOU[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE] * 10 + (T_check % 10);
			}
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG4[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * CS.wbairitu / 100);
			}
			if(T_check != -1) mobData[18] = T_check;
			for(var i=0;i<=2;i++){
				if(wT_DMG1[i] <0) wT_DMG1[i] = 0;
				if(wT_DMG2[i] <0) wT_DMG2[i] = 0;
				if(wT_DMG3[i] <0) wT_DMG3[i] = 0;
				if(wT_DMG4[i] <0) wT_DMG4[i] = 0;
			}
			if(CS.n_AS_MODE){
				for(var i=0;i<=2;i++) w_DMG[i] = wT_DMG1[i] + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wT_DMG1[i] + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0) CS.g_damageTextArray[i].push(w_DMG[i], " (", wT_DMG1[i], "+", wT_DMG2[i], "+", wT_DMG3[i], "+", wT_DMG4[i], ")");
				else{
					var w = wT_DMG1[i] * 2;
					var w2 = w + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
					CS.g_damageTextArray[i].push(w2, " (", w, "+", wT_DMG2[i], "+", wT_DMG3[i], "+", wT_DMG4[i], ")");
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = w2;
				}
			}
			CS.n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「メカニック」スキル「アームズキャノン」
		case SKILL_ID_ARMS_CANNON:
			CS.n_PerfectHIT_DMG = 0;
			CS.w_HIT_HYOUJI = 100;
			CS.w_HIT = 100;
			var wMADO = 0;
			set_n_Enekyori(1);
			CS.wCast = Math.min(2000, 500 + 500 * n_A_ActiveSkillLV);
			n_Delay[2] = Math.max(500, 2000 - 500 * n_A_ActiveSkillLV);
			switch (mobData[17]) {
				case SIZE_ID_SMALL:
					CS.wbairitu = 300 + 400 * n_A_ActiveSkillLV;
					break;
				case SIZE_ID_MEDIUM:
					CS.wbairitu = 300 + 350 * n_A_ActiveSkillLV;
					break;
				case SIZE_ID_LARGE:
					CS.wbairitu = 300 + 300 * n_A_ActiveSkillLV;
					break;
			}
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
			wMADO += 2 * Math.max(LearnedSkillSearch(SKILL_ID_BUKI_KENKYU), UsedSkillSearch(SKILL_ID_BUKI_KENKYU));
			if(n_A_WeaponType == 6 || n_A_WeaponType == 7) {
				wMADO += 5 * Math.max(LearnedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC), UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC));
			}
			if(n_A_WeaponType == 8) {
				wMADO += 4 * Math.max(LearnedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC), UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC));
			}
			if((20 <= mobData[18] && mobData[18] <= 29) || (30 <= mobData[18] && mobData[18] <= 39)) {
				wMADO += 10 * Math.max(LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU), UsedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU));
			}
			if(UsedSkillSearch(SKILL_ID_MADOGEAR)) {
				wMADO += 20 * Math.max(LearnedSkillSearch(SKILL_ID_MADOGEAR_LICENSE), UsedSkillSearch(SKILL_ID_MADOGEAR_LICENSE));
			}
			if(UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON)) {
				CS.wHITsuu = 2;
			}
			wMADO += ApplyElementRatio(mobData, CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][0],CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + wMADO;
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「ジェネティック」スキル「カートキャノン」
		// 2024/11/16 YEサーバー誤差無しを確認済み
		case SKILL_ID_CART_CANNON: {
			CS.n_PerfectHIT_DMG = 0;
			// 必中処理
			CS.w_HIT_HYOUJI = 100;
			CS.w_HIT = 100;
			// 遠距離
			set_n_Enekyori(1);
			// 詠唱など
			CS.wCast = 500 + 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			// ウドゥンウォリアー補正
			if (attackMethodConfArray[0].GetOptionValue(1) == 1) {
				CS.wHITsuu = 2;
			}
			// 基本倍率
			CS.wbairitu = 60 * n_A_ActiveSkillLV;
			// カート改造補正
			const cart_kaizo_lv = Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
			CS.wbairitu += Math.floor(cart_kaizo_lv * 50 * n_A_INT / 40);
			// 倍率補正
			var wMADO = 0;
			// 斧修練
			if ([ITEM_KIND_SWORD, ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND].includes(n_A_WeaponType)) {
				wMADO += 3 * Math.max(LearnedSkillSearch(SKILL_ID_ONO_SHUREN), UsedSkillSearch(SKILL_ID_ONO_SHUREN));
			}
			// 剣修練
			if ([ITEM_KIND_KNIFE, ITEM_KIND_SWORD].includes(n_A_WeaponType)) {
				wMADO += 10 * Math.max(LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC), UsedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC));
			}
			// 改造カートブースト補正
			wMADO += 10 * UsedSkillSearch(SKILL_ID_CART_BOOST_GENETIC);
			// 属性キャノンボール補正
			wMADO += ApplyElementRatio(mobData, CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][0],CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
			// ダメージ算出
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + wMADO;
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] -= CS.B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			// ダメージ表示（不要な可能性あり）
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_SELF_DESTRUCTION:
		case SKILL_ID_SELF_DESTRUCTION_MAX:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				CS.wCast = 10000;
				CS.n_KoteiCast = 10000;
				break;

			default:
				CS.wCast = 1500 + 500 * n_A_ActiveSkillLV;
				CS.n_KoteiCast = 3500 - 500 * n_A_ActiveSkillLV;
				break;

			}

			var w_HP;
			var w_SP;
			if(n_A_ActiveSkill == SKILL_ID_SELF_DESTRUCTION){
				w_HP = attackMethodConfArray[0].GetOptionValue(0);
				if (w_HP == 0) {
					w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
				}
				w_SP = attackMethodConfArray[0].GetOptionValue(1);
			}else{
				w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
				w_SP = charaData[CHARA_DATA_INDEX_MAXSP];
			}
			var mainF = Math.max(LearnedSkillSearch(SKILL_ID_MAINFRAME_KAIZO), UsedSkillSearch(SKILL_ID_MAINFRAME_KAIZO));
			if(mainF <2) mainF = 2;
			set_n_A_Weapon_zokusei(0);
			var w = (n_A_ActiveSkillLV + 1) * (mainF + 8) * (w_SP + n_A_VIT);
			w = Math.floor(w * n_A_BaseLV / 100);
			w += w_HP;
			w -= CS.B_Total_DEF;
			w = ApplyElementRatio(mobData, w,0);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_PINGPOINT_ATTACK:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			set_n_Enekyori(1);
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			var wBAI = 100 * n_A_ActiveSkillLV;
			wBAI += n_A_AGI * 5;
			wBAI = ROUNDDOWN(wBAI * n_A_BaseLV / 120);
			wBAI += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wBAI = ATKbaiJYOUSAN(wBAI);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, CS.n_A_CriATK[i], true);
				w_DMG[i] = Math.floor(w_DMG[i] * wBAI / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i],0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,100);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i], i, true);
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_OVER_BLAND:
			CS.wLAch = true;
			var w3HIT = attackMethodConfArray[0].GetOptionValue(0);
			// スピアクイッケン習得Lv補正
			var wSQ = Math.max(LearnedSkillSearch(SKILL_ID_SPEAR_QUICKEN), attackMethodConfArray[0].GetOptionValue(1));
			var wBai = new Array();
			wBai[0] = n_A_ActiveSkillLV * 400 + 50 * wSQ;
			wBai[0] = Math.floor(wBai[0] * n_A_BaseLV / 150);
			wBai[1] = n_A_ActiveSkillLV * 300 + n_A_STR + n_A_DEX;
			wBai[1] = Math.floor(wBai[1] * n_A_BaseLV / 150);
			wBai[2] = n_A_ActiveSkillLV * 200;
			CS.wCast = 2000;
			CS.n_KoteiCast = 1000;
			n_Delay[1] = n_Delay[1] * 2;
			n_Delay[7] = 2500;

			var wOB_DMG = new Array();
			wOB_DMG[0] = [0,0,0];
			wOB_DMG[1] = [0,0,0];
			wOB_DMG[2] = [0,0,0];
			for(var j=0;j<=2;j++){
				wBai[j] += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				wBai[j] = ATKbaiJYOUSAN(wBai[j]);
				for(var i=0;i<=2;i++){
					wOB_DMG[j][i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, CS.n_A_DMG[i]);
					wOB_DMG[j][i] = Math.floor(wOB_DMG[j][i] * wBai[j] / 100);
					wOB_DMG[j][i] = ApplyMonsterDefence(mobData, wOB_DMG[j][i], 0);
					wOB_DMG[j][i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, wOB_DMG[j][i],i,-1);
					wOB_DMG[j][i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wOB_DMG[j][i]);
				}
			}
			if(w3HIT==1){
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wOB_DMG[0][i] + wOB_DMG[1][i] + wOB_DMG[2][i];
					if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0) CS.g_damageTextArray[i].push(w_DMG[i], " (", wOB_DMG[0][i], "+", wOB_DMG[1][i], "+", wOB_DMG[2][i], ")");
					else{
						var w = wOB_DMG[0][i] * 2;
						var w2 = w + wOB_DMG[1][i] + wOB_DMG[2][i];
						CS.g_damageTextArray[i].push(w2, " (", w, "+", wOB_DMG[1][i], "+", wOB_DMG[2][i], ")");
						CS.Last_DMG_B[i] = w2;
					}
				}
			}else{
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i] = wOB_DMG[0][i] + wOB_DMG[1][i];
					if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0) CS.g_damageTextArray[i].push(w_DMG[i], " (", wOB_DMG[0][i], "+", wOB_DMG[1][i], ")");
					else{
						var w = wOB_DMG[0][i] * 2;
						var w2 = w + wOB_DMG[1][i];
						CS.g_damageTextArray[i].push(w2, " (", w, "+", wOB_DMG[1][i], ")");
						CS.Last_DMG_B[i] = w2;
					}
				}
			}
			w_DMG[1] = 0;
			w_DMG[1] += (wOB_DMG[0][1] * CS.w_HIT) / 100;
			w_DMG[1] += (wOB_DMG[1][1] * CS.w_HIT) / 100;
			if(w3HIT == 1) w_DMG[1] += (wOB_DMG[2][1] * CS.w_HIT) / 100 * CS.w_HIT / 100;
			AS_PLUS();
			CS.n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SHURASHINDAN:
			set_n_Enekyori(1);
			n_Delay[7] = Math.max(200, 1200 - 200 * n_A_ActiveSkillLV);
			CS.wbairitu = 500 + 100 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			var w2hit = [0,0,0];
			CS.wLAch = true;
			for(var i=0;i<=2;i++){
				if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] != 1){
					var w = GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
					w += 150 * n_A_ActiveSkillLV;
					w += ROUNDDOWN(mobData[2] * 5 * n_A_BaseLV / 150);
					if(mobData[0] == 787 && n_B_TAISEI[37] != 0) w += ROUNDDOWN(1000 * n_B_TAISEI[36] / n_B_TAISEI[37]);
					w = ATKbaiJYOUSAN(w);
					w = Math.floor(CS.n_A_DMG[i] * w / 100);
					w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
					w = ApplyMonsterDefence(mobData, w, 0);
					if(i == 0 && CS.w_HIT <100) w = 0;
					if(i == 1) w = w * CS.w_HIT / 100;
					if(w_DMG[i] <= 0) w = 0;
					w2hit[i] += w;
				}
				w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[i]);
				w_DMG[i] += w2hit[i] }
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				if(attackMethodConfArray[0].GetOptionValue(0) == 1){
					var w = w2hit[i];
					if(w == 0) w = "Miss";
					CS.g_damageTextArray[i].push(" (", (w_DMG[i] - w2hit[i]), " + ", w, ")");
				}
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_HASAICHU:
			if(CS.n_DEATH_BOUND[3] == 0){
				w_DMG[0] = 1;
				w_DMG[1] = 1;
				w_DMG[2] = 1;
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}else{
				n_Delay[0] = 1;
				n_Delay[2] = 1000;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					CS.n_KoteiCast = 5500 - 500 * n_A_ActiveSkillLV;
					n_Delay[7] = 2000 + 1000 * n_A_ActiveSkillLV;
					break;

				default:
					CS.n_KoteiCast = 0;
					n_Delay[7] = 5000;
					break;

				}

				var wEHP = attackMethodConfArray[0].GetOptionValue(1);
				if(wEHP == 0){
					wEHP = mobData[3];
					if(wEHP >= 100000) wEHP = 100000;
				}
				CS.wbairitu = Math.floor((wEHP / 100) * n_A_ActiveSkillLV * n_A_BaseLV / 125);
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				}
				w_DMG[0] += CS.n_DEATH_BOUND[0];
				w_DMG[1] += CS.n_DEATH_BOUND[1];
				w_DMG[2] += CS.n_DEATH_BOUND[2];
				var w2hit = [0,0,0];
				CS.wLAch = true;
				for(var i=0;i<=2;i++){
					if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] == 0){
						var w = GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
						w += 200 * n_A_ActiveSkillLV;
						w = ATKbaiJYOUSAN(w);
						w = Math.floor(CS.n_A_DMG[i] * w / 100);
						w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
						w = ApplyMonsterDefence(mobData, w, 0);
						w2hit[i] += w;
					}
					w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[i]);
					w_DMG[i] += w2hit[i] }
				if(CS.n_AS_MODE) return w_DMG;
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
					if(attackMethodConfArray[0].GetOptionValue(0) == 1){
						var w = w2hit[i];
						if(w == 0) w = "Miss";
						CS.g_damageTextArray[i].push(" (", (w_DMG[i] - w2hit[i]), " + ", w, ")");
					}
				}
				CS.n_PerfectHIT_DMG = 0;
				if(CS.w_HIT_HYOUJI <100){
					if(attackMethodConfArray[0].GetOptionValue(0) == 0 && mobData[20] == 0) CS.str_PerfectHIT_DMG = __DIG3(CS.n_DEATH_BOUND[0]) +"～"+ __DIG3(CS.n_DEATH_BOUND[2]);
					else CS.str_PerfectHIT_DMG = __DIG3(CS.n_DEATH_BOUND[0]) +"+"+ __DIG3(w2hit[0]) +"～"+ __DIG3(CS.n_DEATH_BOUND[2]) +"+"+ __DIG3(w2hit[2]);
					CS.n_PerfectHIT_DMG = CS.n_DEATH_BOUND[1] + w2hit[1];
				}
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + (ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) + CS.n_DEATH_BOUND[1] + w2hit[1]) *(100-CS.w_HIT))/100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				/*
					w_DMG[0] = n_DEATH_BOUND[0];
					w_DMG[1] = n_DEATH_BOUND[1];
					w_DMG[2] = n_DEATH_BOUND[2];
					for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
					}
					w_HIT_HYOUJI = 100;
					BuildCastAndDelayHtml(mobData);
					BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				*/
			}
			break;

		case SKILL_ID_BLOOD_SUCKER:
		case SKILL_ID_THORN_TRAP:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wCast = 1500;
			n_Delay[2] = 500;
			n_Delay[5] = 1000;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(0);

			var w;

			if (n_A_ActiveSkill == SKILL_ID_BLOOD_SUCKER) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					w = 15000 + 3000 * n_A_ActiveSkillLV + n_A_INT;
					n_Delay[7] = 4500 + 500 * n_A_ActiveSkillLV;
					break;

				default:
					w = 200 + 100 * n_A_ActiveSkillLV + n_A_INT;
					break;

				}
			}

			else if (n_A_ActiveSkill == SKILL_ID_THORN_TRAP) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					w = 25000 + 5000 * n_A_ActiveSkillLV + n_A_INT;
					break;

				default:
					w = 100 + 200 * n_A_ActiveSkillLV + n_A_INT;
					break;

				}
			}

			w_DMG[0] = w_DMG[1] = w_DMG[2] = w;
			for(var i=0;i<=2;i++){

				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);

				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_HELLS_PLANT: {	// ヘルズプラント
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			set_n_Enekyori(2);
			CS.wCast = 2000;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(0);
			w = n_A_ActiveSkillLV * mobData[2] * 10;
			w += Math.floor(n_A_INT * 7 / 2) * Math.floor(18 + n_A_JobLV / 4);
			// バイオプラント習得Lv補正
			const bioplant_lv = LearnedSkillSearch(SKILL_ID_BIOPLANT);
			w *= (5 / (10 - Math.max(bioplant_lv, attackMethodConfArray[0].GetOptionValue(0))));
			w = ApplyElementRatio(mobData, w,0);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			if(n_B_KYOUKA[7] && n_Enekyori == 2) w += Math.floor(w * (20 * n_B_KYOUKA[7]) / 100);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
		}

		case SKILL_ID_ZYUMONZIGIRI:
			set_n_Enekyori(1);
			CS.wActiveHitNum = 2;
			n_Delay[7] = Math.max(600, 6100 - 1100 * n_A_ActiveSkillLV);
			CS.wbairitu = 200 * n_A_ActiveSkillLV;
			CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

			// 必中ダメージのみ仮計算（属性倍率未適用）
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += CS.n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
			}
			if(CS.n_AS_MODE) return w_DMG;
			if(attackMethodConfArray[0].GetOptionValue(0) >= 1){
				var wjyuu = [0,0,0];
				for(var i=0;i<=2;i++) wjyuu[i] = w_DMG[i];
				CS.wbairitu = 150 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
				CS.wbairitu += n_A_BaseLV * n_A_ActiveSkillLV;
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				n_Delay[0] = 1;
				for(var i=0;i<=2;i++){
					w_DMG[i] = CS.n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += CS.n_PerfectHIT_DMG;
					w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(CS.wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
				}
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = wjyuu[i] + w_DMG[i] * attackMethodConfArray[0].GetOptionValue(0);
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
					CS.g_damageTextArray[i].push("(", (wjyuu[i] / 2), "×2Hit + ");
					CS.g_damageTextArray[i].push((w_DMG[i] / 2), "×", (2 * attackMethodConfArray[0].GetOptionValue(0)), ")");
					w_DMG[i] = CS.Last_DMG_A[i];
				}

				// 改めて必中ダメージを計算
				CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
				CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			}
			else{
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
					if(CS.wActiveHitNum > 1) CS.g_damageTextArray[i].push("(", (w_DMG[i] / CS.wActiveHitNum), "×", CS.wActiveHitNum, "Hit)");
				}

				// 改めて必中ダメージを計算
				CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
				CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SENKO_RENGEKI:
		case SKILL_ID_COMBO_SANDAN_MONK:
		case SKILL_ID_COMBO_SANDAN_CHAMP:
		case SKILL_ID_COMBO_SORYUKYAKU:
		case SKILL_ID_COMBO_RESERVED_803:
		case SKILL_ID_COMBO_RESERVED_804:
		case SKILL_ID_COMBO_RESERVED_805:
		case SKILL_ID_COMBO_RESERVED_806:
		case SKILL_ID_COMBO_RESERVED_807:
		case SKILL_ID_COMBO_RESERVED_808:
		case SKILL_ID_COMBO_RESERVED_809:
		case SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT:
		case SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE:
			if(n_A_ActiveSkill == SKILL_ID_SENKO_RENGEKI){
				n_Delay[2] = 1000;
				n_Delay[3] = 2.35;
				n_Delay[7] = 14000 - 2000 * n_A_ActiveSkillLV;
			}else n_Delay[0] = 1;
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++) w_DMG[i] = 0;
			AS_PLUS();
			if(GetActHitRateAll(n_A_ActiveSkill, mobData) == 100){
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				}
			}else{
				for(var i=0;i<=2;i++) CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				if(CS.Last_DMG_A[0] >= 1) CS.g_damageTextArray[0].push(ROUNDDOWN(CS.Last_DMG_A[0]));
				else CS.g_damageTextArray[0].push("Miss<BR><Font size=2>(命中100未満なので)</Font>");
				CS.g_damageTextArray[1].push(ROUNDDOWN(CS.Last_DMG_A[1]), "<BR><Font size=2>※コンボ系のこの欄は特別仕様で、<BR>※Miss込みの平均与ダメージです。<BR>※Missを消すにはフリオニCなどで。</Font>");
				CS.g_damageTextArray[2].push(CS.Last_DMG_A[2]);
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「アースクエイク」
		case SKILL_ID_EARTH_QUAKE:
			var QuakeBairitu = [0,300,500,600,800,1000,1200,1300,1500,1600,1800];
			CS.wbairitu = QuakeBairitu[n_A_ActiveSkillLV];
			CS.wHITsuu = 3;
			set_n_Enekyori(2);
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			if(!CS.n_AS_MODE){
				var wBunsan = attackMethodConfArray[0].GetOptionValue(0);
				if(wBunsan >= 2) CS.wbairitu = ROUNDDOWN(CS.wbairitu / wBunsan);
			}
			for(var i=0;i<=2;i++){
				// 基礎攻撃力 n_A_DMG_GX[i] にサイズ補正 wCSize をかける
				w_DMG[i] = CS.n_A_DMG_GX[i] * CS.wCSize;	
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(n_B_KYOUKA[7] && n_Enekyori == 2) w_DMG[i] += Math.floor(w_DMG[i] * (20 * n_B_KYOUKA[7]) / 100);
			}
			if(CS.n_AS_MODE){
				// 最小、平均、最大の 1 hitあたりダメージ
				w_DMG[0] = w_DMG[0];
				w_DMG[1] = w_DMG[1];
				w_DMG[2] = w_DMG[2];
				return w_DMG;
			}
			// GvG補正
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);
			}
			//
			for(var i=0;i<=2;i++){
				CS.Last_DMG_B[i] = Math.floor(w_DMG[i] / 3);		// B = 1 hitあたりダメージ
				CS.Last_DMG_A[i] = w_DMG[i];						// A = 3 hit合計ダメージ
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				CS.g_damageTextArray[i].push("(", w_DMG[i], "×3Hit)");
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			var wX = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			wX = ApplyHitJudgeElementRatio(n_A_ActiveSkill, wX, mobData);
			wX = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wX);

			// TODO: ダメージ表示方式変更対応
			//w_DMG[1] = (w_DMG[1] * w_HIT + wX * wHITsuu *(100-w_HIT))/100;
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + wX * (100-CS.w_HIT))/100;

			AS_PLUS();

			// TODO: ダメージ表示方式変更対応
			//n_PerfectHIT_DMG = wX * wHITsuu;

			CS.str_PerfectHIT_DMG = __DIG3(wX * CS.wHITsuu) +"("+ __DIG3(wX) +"×"+ CS.wHITsuu +"hit)";
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_MAGMA_ILLUPTION:
			CS.wCast = 2000;
			n_Delay[7] = 11000 - 1000 * n_A_ActiveSkillLV;
			CS.wbairitu = 450 + 50 * n_A_ActiveSkillLV;
			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

			var MAGUMA = 0;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				MAGUMA = (25000 + 5000 * n_A_ActiveSkillLV);
				break;

			default:
				MAGUMA = (800 + 200 * n_A_ActiveSkillLV);
				break;

			}

			// ダメージ増減適用
			MAGUMA = ApplyAttackDamageAmplify(mobData, MAGUMA);

			// 必中ダメージのみ仮計算（属性倍率未適用）
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += CS.n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += MAGUMA * 10;
			}
			if(CS.n_AS_MODE){
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				CS.g_damageTextArray[i].push("(", (w_DMG[i] - MAGUMA * 10), "＋", MAGUMA, "×10Hit)");
			}

			// 改めて必中ダメージ計算
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
			CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
			CS.n_PerfectHIT_DMG += MAGUMA * 10;
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		//「メイジ」スキル「ナパームビート」
		case SKILL_ID_NAPALM_BEAT:
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(2);
			CS.directSubtractionMdef = true;
			CS.wbairitu = 100;
			CS.n_bunkatuHIT = 0;
			set_n_A_Weapon_zokusei(8);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_Heal_MATK[i];
				w_MATK[i] = Math.floor(w_MATK[i] * (70 + 10 * n_A_ActiveSkillLV) / 100);
				w_MATK[i] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			CS.wHITsuu = 1;
			CS.wCast = 500;
			if(n_A_ActiveSkillLV==10) n_Delay[2] = 500;
			else if(n_A_ActiveSkillLV==9) n_Delay[2] = 600;
			else if(n_A_ActiveSkillLV==8) n_Delay[2] = 700;
			else if(n_A_ActiveSkillLV>=6) n_Delay[2] = 800;
			else if(n_A_ActiveSkillLV>=4) n_Delay[2] = 900;
			else n_Delay[2] = 1000;
			CS.wbairitu = 100;
			CS.wbairitu += GetBattlerMatkPercentUp();
			var wBunsan = 1;
			if(!CS.n_AS_MODE) wBunsan = attackMethodConfArray[0].GetOptionValue(0);
			if(wBunsan >= 2){
				for(var i=0;i<=2;i++) w_MATK[i] = ROUNDDOWN(w_MATK[i] / wBunsan);
			}
			for(var b=0;b<=2;b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100);
				CS.Last_DMG_B[b] = w_DMG[b];

				// TODO: ダメージ表示方式変更対応
				CS.Last_DMG_A[b] = w_DMG[b] * CS.wHITsuu;

				if(!CS.n_AS_MODE) CS.g_damageTextArray[b].push(CS.Last_DMG_A[b], "(", CS.Last_DMG_B[b], SubName[8], CS.wHITsuu, "hit)");
				w_DMG[b] = CS.Last_DMG_A[b];
			}
			if(CS.n_AS_MODE) return w_DMG;
			CS.w_HIT_HYOUJI = 100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「ハイウィザード」スキル「ナパームバルカン」
		case SKILL_ID_NAPALM_VULKAN:
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(2);
			CS.directSubtractionMdef = true;
			CS.wbairitu = 100;
			CS.n_bunkatuHIT = 0;
			set_n_A_Weapon_zokusei(8);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_Heal_MATK[i];
				w_MATK[i] = Math.floor(w_MATK[i] * (70 + 10 * n_A_ActiveSkillLV) / 100);
				w_MATK[i] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			CS.wHITsuu = n_A_ActiveSkillLV;
			CS.wCast = 1000;
			n_Delay[2] = 1000;
			CS.wbairitu = 100;
			CS.wbairitu += GetBattlerMatkPercentUp();
			var wBunsan = 1;
			if(!CS.n_AS_MODE) wBunsan = attackMethodConfArray[0].GetOptionValue(0);
			if(wBunsan >= 2){
				for(var i=0;i<=2;i++) w_MATK[i] = ROUNDDOWN(w_MATK[i] / wBunsan);
			}
			for(var b=0;b<=2;b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100);
				// 単発ダメージ Last_DMG_B
				CS.Last_DMG_B[b] = Math.floor(w_DMG[b] / CS.wHITsuu);
				// 最終ダメージ Last_DMG_A
				// TODO: ダメージ表示方式変更対応
				CS.Last_DMG_A[b] = w_DMG[b];
				if(!CS.n_AS_MODE) CS.g_damageTextArray[b].push(CS.Last_DMG_A[b], "(", CS.Last_DMG_B[b], SubName[8], CS.wHITsuu, "hit)");
				w_DMG[b] = CS.Last_DMG_A[b];
			}
			if(CS.n_AS_MODE) return w_DMG;
			CS.w_HIT_HYOUJI = 100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_FIRE_PILLAR:
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(2);
			CS.wbairitu = 100;
			CS.directSubtractionMdef = true;
			CS.n_bunkatuHIT = 1;
			set_n_A_Weapon_zokusei(3);
			CS.wHITsuu = (n_A_ActiveSkillLV +2);
			CS.wCast = 3300 - (300 * n_A_ActiveSkillLV);
			n_Delay[2] = 1000;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_Heal_MATK[i];
				w_MATK[i] = Math.floor(w_MATK[i] * (40 + 20 * n_A_ActiveSkillLV) / 100) + 100 + 50 * n_A_ActiveSkillLV;
				w_MATK[i] += n_tok[ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				w_MATK[i] = Math.floor(w_MATK[i] * (100+GetEquippedTotalSPEquip(5122) + GetEquippedTotalSPCardAndElse(5122)) / 100);
			}
			CS.wbairitu += GetBattlerMatkPercentUp();
			for(var b=0;b<=2;b++){
				w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100) / CS.wHITsuu);
				CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu;
				if(!CS.n_AS_MODE) CS.g_damageTextArray[b].push(CS.Last_DMG_A[b], "(", w_DMG[b], SubName[8], CS.wHITsuu, "hit)");

				// TODO: ダメージ表示方式変更対応
				// w_DMG[b] *= wHITsuu;
			}
			if(CS.n_AS_MODE) return w_DMG;
			CS.w_HIT_HYOUJI = 100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// リベリオン－マススパイラル（ハッケイから流用）
		case SKILL_ID_MASS_SPIRAL:
			set_n_Enekyori(1);
			CS.wCast = 2000;
			n_Delay[2] = 0;
			n_Delay[7] = 0;

			// 威力に影響するＤＥＦは５００まで
			// dewindow: 旧 mob.js の暗黙グローバル B_Original_DEF（除算DEF補正前の値）を参照していたが、
			// 移行時に mob.js 側が関数ローカル var 化され ReferenceError になっていた。
			// 同値が mobData[MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF]（補正前の値を保持）に入っているためそれを使う。
			var origDef = mobData[MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF];
			var defpower =  origDef > 500 ? 500 :  origDef;
			CS.wbairitu = (200 + defpower) * n_A_ActiveSkillLV;

			var AS_ATK = 0;
			if(CS.n_AS_MODE){
				AS_ATK = Math.floor(mobData[13] / 2);
				AS_ATK = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, AS_ATK);
				AS_ATK = ApplyElementRatio(mobData, AS_ATK,n_A_Weapon_zokusei);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i] + AS_ATK;
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				// ＤＥＦの影響を受ける
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
	// バグ？　属性が２回かかってる。
	//			w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i], n_A_Weapon_zokusei);
			}
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// リベリオン－ラウンドトリップ（修羅身弾から流用）
		case SKILL_ID_ROUND_TRIP:
			set_n_Enekyori(1);
			CS.wCast = 0;
			n_Delay[2] = 0;
			n_Delay[7] = Math.max(200, 1200 - 200 * n_A_ActiveSkillLV);

			var basePower = 100 + 40 * n_A_ActiveSkillLV;
			basePower = ROUNDDOWN(basePower * n_A_BaseLV / 100);

			CS.wbairitu = basePower;
			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			var w2hit = [0,0,0];
			CS.wLAch = true;
			for(var i=0;i<=2;i++){
				if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] != 1){

					var w = basePower;
					w += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);

					if(mobData[0] == 787 && n_B_TAISEI[37] != 0) w += ROUNDDOWN(1000 * n_B_TAISEI[36] / n_B_TAISEI[37]);
					w = ATKbaiJYOUSAN(w);
					w = Math.floor(CS.n_A_DMG[i] * w / 100);
					w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
					w = ApplyMonsterDefence(mobData, w, 0);
					if(i == 0 && CS.w_HIT <100) w = 0;
					if(i == 1) w = w * CS.w_HIT / 100;
					if(w_DMG[i] <= 0) w = 0;
					w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
				}
				w_DMG[i] += w2hit[i] }
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				if(attackMethodConfArray[0].GetOptionValue(0) == 1){
					var w = w2hit[i];
					if(w == 0) w = "Miss";
					CS.g_damageTextArray[i].push(" (", (w_DMG[i] - w2hit[i]), " + ", w, ")");
				}
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 紅焔脚（修羅身弾から流用）
		case SKILL_ID_KOEN_KYAKU:
			var hitMode = attackMethodConfArray[0].GetOptionValue(0);
			CS.wCast = 50 + 80 * n_A_ActiveSkillLV + 40 * Math.floor(n_A_ActiveSkillLV / 2);
			for (let idx = 0; idx <= 2; idx++) {
				w_DMG[idx] = 0;
			}
			// 攻撃対象のダメージ計算
			if ((hitMode & 1) == 1) {
				CS.wbairitu = 650 + 50 * n_A_ActiveSkillLV;
				CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);
				for (let idx = 0; idx <= 2; idx++) {
					w_DMG[idx] = CS.n_A_DMG[idx];
					w_DMG[idx] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[idx]);
					w_DMG[idx] = Math.floor(w_DMG[idx] * CS.wbairitu / 100);
					w_DMG[idx] = ApplyMonsterDefence(mobData, w_DMG[idx], 0);
					w_DMG[idx] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[idx]);
				}
			}
			var w2hit = [0,0,0];
			CS.wLAch = true;
			// 追加ダメージの計算
			if ((hitMode & 2) == 2) {
				for (let idx = 0; idx <= 2; idx++) {
					var w = 650 + 50 * n_A_ActiveSkillLV;
					w += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
					w = ATKbaiJYOUSAN(w);
					w = Math.floor(CS.n_A_DMG[idx] * w / 100);
					w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
					w = ApplyMonsterDefence(mobData, w, 0);
					/*
					if (idx == 0 && w_HIT <100) {	// 命中率が 100% 未満の場合、最低ダメージを 0 にする
						w = 0;
					}
					if (idx == 1) {	// 命中率を考慮した平均ダメージにする
						w = w * w_HIT / 100;
					}
					*/
					w2hit[idx] += w;
					w2hit[idx] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[idx]);
					w_DMG[idx] += w2hit[idx]
				}
			}
			if (CS.n_AS_MODE) {
				return w_DMG;
			}
			// 表示の調整
			for (let idx = 0; idx <= 2; idx++) {
				CS.Last_DMG_A[idx] = CS.Last_DMG_B[idx] = w_DMG[idx];
				CS.g_damageTextArray[idx].push(CS.Last_DMG_A[idx]);
				if ((hitMode & 3) == 3) {
					var w = w2hit[idx];
					if (w == 0) {
						w = "Miss";
					}
					CS.g_damageTextArray[idx].push(" (", (w_DMG[idx] - w2hit[idx]), " + ", w, ")");
				}
			}
			//w_DMG[1] = (w_DMG[1] * w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ZYURYOKU_CHOSE:

			CS.wbairitu = 100;

			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;

			CS.n_KoteiCast = 1000;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 10000;
				break;

			default:
				n_Delay[7] = 2000;
				break;

			}

			CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

			// 必中ダメージのみ仮計算（属性倍率未適用）
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = CS.n_A_DMG[i];
//				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * CS.wbairitu / 100);
				// 重量ダメージ
				w_DMG[i] += n_B_TAISEI[MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI];
				// 防御計算が特殊
				w_DMG[i] -= (mobData[13] + n_B_DEF2[0]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += CS.n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);

				if(CS.wActiveHitNum > 1) {
					w_DMG[i] = Math.floor(w_DMG[i] / CS.wActiveHitNum) * CS.wActiveHitNum;
				}
			}

			if(CS.n_AS_MODE) return w_DMG;

			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				CS.g_damageTextArray[i].push(CS.Last_DMG_A[i]);
				if(CS.wActiveHitNum > 1) CS.g_damageTextArray[i].push("(", (w_DMG[i] / CS.wActiveHitNum), "×", CS.wActiveHitNum, "Hit)");
			}

			// 改めて必中ダメージ計算
			CS.n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			CS.n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, CS.n_PerfectHIT_DMG, mobData);
			CS.n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, CS.n_PerfectHIT_DMG);
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;

		default:
			bPhysicalFormula = false;
			break;

		}
		// 物理判定スキルでなければ別処理へ
		if (!bPhysicalFormula) {
			return undefined;
		}
		return w_DMG;
}
