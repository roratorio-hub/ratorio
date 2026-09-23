/**
 * BattleCalc999Core「物理スキル　特殊計算式」ブロックの分割（Phase 3b）。
 *
 * 物理基本計算式（skill-formula-physical.js）で該当スキルが無かった場合に
 * 呼ばれる。制御フロー変換の方針は同ファイルの JSDoc を参照
 * （switch 末尾の `break;` → `return undefined;` の1箇所のみが非バイト単位の変更）。
 */
import { myInnerHtml } from "../runtime/util.js";
import { EquipNumSearch, TimeItemNumSearch } from "../chara/chara.js";
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
import { zokusei } from "../data/element-affinity.dat.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, ROUNDDOWN } from "../bridge/stallcalc-bridge.js";
import { ItemObjNew } from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import { n_B_KYOUKA } from "../monster/mobconfbuf.js";
import {
    MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE, MOB_CONF_DEBUF_ID_LEX_AETERNA, MOB_CONF_DEBUF_ID_SEKIKA,
    MOB_CONF_DEBUF_ID_TOUKETSU, n_B_IJYOU
} from "../monster/mobconfdebuf.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import { MonsterObjNew } from "../monster/monster.dat.js";
import {
    BK_n_A_MATK, n_A_BodyZokusei, n_A_DEX, n_A_Equip, n_A_INT, n_A_JOB, n_A_JobLV, n_A_LUK, n_A_MATK,
    n_A_SHIELD_DEF_PLUS, n_A_STR, n_A_VIT, n_A_WeaponLV_seirenATK, n_A_WeaponType, n_B_DEF2, n_B_MDEF2
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_ACID_TERROR, SKILL_ID_AIMED_BOLT,
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
    SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_KOEN_KYAKU, SKILL_ID_KUNAI_NAGE, SKILL_ID_LAND_MINE,
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
} from "../equip/timeitem.dat.js";
import { GetAttackMethodOptionValue } from "./attack-method-option.js";
import { CanonOBJ, KunaiOBJ, SyurikenOBJ } from "./attackmethod.dat.js";
import { AS_PLUS } from "../skill/calcautospell.js";
import { __DIG3, g_skillManager } from "../runtime/global.js";
import {
    ATKbaiJYOUSAN, ApplyAttackDamageAmplify, ApplyElementRatio, ApplyHitJudgeElementRatio, ApplyLexAeterna,
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyMonsterDefence, ApplyPhysicalDamageRatio,
    ApplyPhysicalSkillDamageRatioChange, ApplyPhysicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BaiTaisei_A_SP, BaiTaisei_C, BaiTaisei_E, BuildBattleResultHtml, BuildCastAndDelayHtml, GetActHitRateAll,
    GetBattlerAtkPercentUp, GetBattlerMatkPercentUp, GetFixedAppendAtk, GetPerfectHitDamage, GetSpiderWebDamageRatio,
    HealCalc, TYPE_SYUUREN
} from "../bridge/battlecalc-bridge.js";
import { SubName } from "./sub-name.js";
import { CS } from "./calc-state.js";
import { CreateSkillFormulaEnv } from "./skill-formula-env.js";
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
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
			}else if(n_A_ActiveSkill==SKILL_ID_PIERCE){
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wHITsuu = mobData[17]+1;
			}else if(n_A_ActiveSkill==SKILL_ID_BOWLING_BASH){
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wHITsuu = 2;
				if(n_A_ActiveSkillLV == 1) CS.wHITsuu = 1;
				CS.wLAch = true;
				if(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 1){
					CS.wHITsuu = 3;
					if(n_A_ActiveSkillLV == 1) CS.wHITsuu = 2;
				}
			}else if(n_A_ActiveSkill==SKILL_ID_SHIDAN){
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				set_n_Enekyori(1);
			}else if(n_A_ActiveSkill==SKILL_ID_TRIPLE_ACTION){
				set_n_Enekyori(1);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
			}else if(n_A_ActiveSkill==SKILL_ID_BEAST_STRAIFING){
				n_Delay[0] = 1;
				set_n_Enekyori(1);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
			}else if(n_A_ActiveSkill==SKILL_ID_DEATHPERAD){
				set_n_Enekyori(1);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				var DEATH = [1,1.2,1.6,2,2.4,3,3.6,4,5,6,7,8,9,10];
				CS.wHITsuu = DEATH[attackMethodConfArray[0].GetOptionValue(0)];
			}else if(n_A_ActiveSkill==SKILL_ID_HESPERUS_SLIT){
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);

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
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
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

				if(!(n_B_IJYOU[MOB_CONF_DEBUF_ID_LEX_AETERNA] == 0 || !CS.wLAch)){
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

			AS_PLUS();

			// TODO: ダメージ表示方式変更対応
			// n_PerfectHIT_DMG = wX * wHITsuu;

			CS.str_PerfectHIT_DMG = __DIG3(wX * CS.wHITsuu) +"("+ __DIG3(wX) +"×"+ CS.wHITsuu +"hit)";
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
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}else{
				wBT = ApplyElementRatio(mobData, wBT,0);
				wBT = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wBT);
				wBT *= n_A_ActiveSkillLV;
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}
			if(CS.n_AS_MODE){
				w_DMG[0] = w_DMG[1] = w_DMG[2] = wBT;
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = wBT;
				if(n_A_ActiveSkill==118){
					CS.Last_DMG_B[i] = wBT / n_A_ActiveSkillLV;
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
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-CS.w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_KUNAI_NAGE:
		case SKILL_ID_HAPPO_KUNAI:
			CS.n_PerfectHIT_DMG = 0;
			if (n_A_ActiveSkill == SKILL_ID_HAPPO_KUNAI) {
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
			}
			set_n_Enekyori(1);
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
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
				}else{
					CS.Last_DMG_B[i] = w_DMG[i];
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i];
				}
				w_DMG[i] = CS.Last_DMG_A[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_ACID_DEMONSTRATION:
		case SKILL_ID_FIRE_EXPANSION:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);

			if(n_A_ActiveSkill==SKILL_ID_FIRE_EXPANSION){
				n_Delay[0] = 1;
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

		case SKILL_ID_HEAL:
		case 489:
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(6);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			set_n_Enekyori(2);
			if(n_A_ActiveSkill==489){
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
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
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SHURASHINDAN:
			set_n_Enekyori(1);
			n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
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
				if(attackMethodConfArray[0].GetOptionValue(0) == 1){
					var w = w2hit[i];
					if(w == 0) w = "Miss";
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
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);

				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData);
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
					if(attackMethodConfArray[0].GetOptionValue(0) == 1){
						var w = w2hit[i];
						if(w == 0) w = "Miss";
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
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[3] = g_skillManager.GetDelayTimeSkillTiming(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}else n_Delay[0] = 1;
			if(CS.n_AS_MODE) return w_DMG;
			for(var i=0;i<=2;i++) w_DMG[i] = 0;
			AS_PLUS();
			if(GetActHitRateAll(n_A_ActiveSkill, mobData) == 100){
				for(var i=0;i<=2;i++){
					CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
				}
			}else{
				for(var i=0;i<=2;i++) CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT + CS.n_PerfectHIT_DMG * (100-CS.w_HIT))/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「アースクエイク」
		case SKILL_ID_EARTH_QUAKE:
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
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

		default:
			// engine/skill/<職業>/*.js の SpecialFormula slot へ移行済みのスキルはそちらを呼ぶ
			// （呼び出し後は break して、後続の共通末尾処理〔return w_DMG〕をそのまま通す。
			//   hook 本体内の return は hook 自身を抜けるだけで、CS・w_DMG への書き込みは
			//   共有された参照を直接書き換えるため、ここでの return 有無は結果に影響しない）
			if (g_skillManager.HasSpecialFormula(n_A_ActiveSkill)) {
				g_skillManager.ApplySpecialFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
				break;
			}
			bPhysicalFormula = false;
			break;

		}
		// 物理判定スキルでなければ別処理へ
		if (!bPhysicalFormula) {
			return undefined;
		}
		return w_DMG;
}
