/**
 * BattleCalc999Core「物理スキル　基本計算式」ブロックの分割（Phase 3b）。
 *
 * 元は `while (true) { switch (n_A_ActiveSkill) { ... } }` という「該当スキルが
 * 無ければ break で while を抜けて次のブロックへ」という制御フローだった。
 * 関数分割に伴い、「該当なしは undefined を返す」という明示的な契約に変換している
 * （呼び出し側の BattleCalc999Core が undefined なら次のブロックを試す）。
 * これに伴う変更は switch 末尾の `break;` → `return undefined;` の1箇所のみ。
 * それ以外（290 case の中身）はバイト単位で不変。
 */
import { TimeItemNumSearch } from "./chara.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from "./const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_SHIELD } from "./const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_POWER, ITEM_DATA_INDEX_WEIGHT } from "./const/EnumItemDataIndex.js";
import {
    ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_KNIFE, ITEM_KIND_RIFLE,
    ITEM_KIND_SHOTGUN
} from "./const/EnumItemKind.js";
import { ITEM_SP_ELEMENTAL } from "./const/EnumItemSpId.js";
import { JOB_ID_GILOTINCROSS } from "./const/EnumJobId.js";
import { MIG_PARAM_ID_CON, MIG_PARAM_ID_POW } from "./const/EnumMigItemParamId.js";
import { MONSTER_BOSSTYPE_BOSS } from "./const/EnumMonsterBossType.js";
import { MONSTER_DATA_INDEX_ID, MONSTER_DATA_INDEX_RACE } from "./const/EnumMonsterDataIndex.js";
import { RACE_ID_DEMON, RACE_ID_HUMAN, RACE_ID_PLANT, RACE_ID_SOLID } from "./const/EnumRaceId.js";
import { GetEquippedTotalSPArrow, ROUNDDOWN } from "./foot-bridge.js";
import { ItemObjNew } from "./item.dat.js";
import { LearnedSkillSearch } from "./learnedskill.js";
import {
    MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI, MOB_CONF_DEBUF_ID_TARONO_KIZU, n_B_IJYOU
} from "./mobconfdebuf.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "./mobconfplayer.js";
import { MONSTER_ID_PLAYER } from "./monster.dat.js";
import {
    SU_STR, n_A_AGI, n_A_DEX, n_A_Equip, n_A_INT, n_A_JOB, n_A_JobLV, n_A_STR, n_A_VIT, n_A_WeaponLV, n_A_WeaponType,
    n_A_Weapon_ATKplus
} from "./roro-state.js";
import {
    SKILL_ID_ABR_DUAL_CANNON, SKILL_ID_ABYSS_DAGGER, SKILL_ID_ABYSS_DAGGER_STATE, SKILL_ID_ACIDIFIED_ZONE_CHI,
    SKILL_ID_ACIDIFIED_ZONE_HI, SKILL_ID_ACIDIFIED_ZONE_KAZE, SKILL_ID_ACIDIFIED_ZONE_MIZU, SKILL_ID_ALPHA_CLAW,
    SKILL_ID_APUCHAORURIGI, SKILL_ID_ARRAW_VULKAN, SKILL_ID_ARROW_SHOWER, SKILL_ID_ARROW_STORM,
    SKILL_ID_AXE_BOOMERANG, SKILL_ID_AXE_STOMP, SKILL_ID_AXE_TORNADE, SKILL_ID_BACK_STAB, SKILL_ID_BAKKA_SHINDAN,
    SKILL_ID_BAKKISANDAN, SKILL_ID_BAKURETSU_HADO, SKILL_ID_BANISHING_POINT, SKILL_ID_BASH, SKILL_ID_BASIC_GRENADE,
    SKILL_ID_BIND_TRAP, SKILL_ID_BLAZING_FLAME_BLAST, SKILL_ID_BOOST_KNUCKLE, SKILL_ID_BRANDISH_SPEAR,
    SKILL_ID_BUKKOKEN, SKILL_ID_BULLS_EYE, SKILL_ID_BUNISHING_BASTER, SKILL_ID_CANNON_SPEAR, SKILL_ID_CARROT_BEAT,
    SKILL_ID_CART_KAIZO, SKILL_ID_CART_TERMINATION, SKILL_ID_CART_TORNADO, SKILL_ID_CHAIN_REACTION_SHOT,
    SKILL_ID_CHARGE_ARROW, SKILL_ID_CHARGE_ATTACK, SKILL_ID_CHASING_BREAK, SKILL_ID_CHASING_SHOT,
    SKILL_ID_CHIMEITEKINA_KIZU, SKILL_ID_CHOP_CHOP, SKILL_ID_CHUL_HO_BATTERING, SKILL_ID_CLAW_WAVE,
    SKILL_ID_CLUSTER_BOMB, SKILL_ID_COLD_THROWER, SKILL_ID_COMBO_SORYUKYAKU, SKILL_ID_COUNTER_SLASH,
    SKILL_ID_CRESSIVE_VOLT, SKILL_ID_CROSS_IMPACT, SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_CROSS_SLASH,
    SKILL_ID_CRUEL_BITE, SKILL_ID_CRUSH_STRIKE, SKILL_ID_DAIICHIGEKI_RAKUIN, SKILL_ID_DAINIGEKI_METSUMANO_HI,
    SKILL_ID_DAINIGEKI_SHINNEN, SKILL_ID_DAINIGEKI_SHINPAN, SKILL_ID_DAISANGEKI_DANZAI,
    SKILL_ID_DAISANGEKI_MEKKAGEKI, SKILL_ID_DAISANGEKI_ZYOKA, SKILL_ID_DAITENHOSUI, SKILL_ID_DANCING_KNIFE,
    SKILL_ID_DARK_CRAW, SKILL_ID_DARK_CROSS, SKILL_ID_DARK_ILLUSION, SKILL_ID_DEATHPERAD, SKILL_ID_DEEP_BLIND_TRAP,
    SKILL_ID_DEFT_STAB, SKILL_ID_DEMONSTRATION, SKILL_ID_DISARM, SKILL_ID_DOUBLE_BOWLING_BASH, SKILL_ID_DOUBLE_SLASH,
    SKILL_ID_DRAGONIC_AURA, SKILL_ID_DRAGONIC_BREATH, SKILL_ID_DRAGONIC_PIERCE, SKILL_ID_DRAGON_TAIL, SKILL_ID_DUST,
    SKILL_ID_DUST_EXPLOSION, SKILL_ID_EARTH_DRIVE, SKILL_ID_EFIRIGO, SKILL_ID_EIBINNA_KYUKAKU,
    SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_ENERGY_CANNONADE, SKILL_ID_ENKA_METSUMA_SHINDAN, SKILL_ID_ETERNAL_SLASH,
    SKILL_ID_EXCEED_BREAK, SKILL_ID_EXPLOSIVE_POWDER, SKILL_ID_FAINT_BOMB, SKILL_ID_FANTASMIC_ARROW,
    SKILL_ID_FATAL_MENUS, SKILL_ID_FATAL_SHADOW_CRAW, SKILL_ID_FEATHER_SPRINKLE, SKILL_ID_FEORICHAGI,
    SKILL_ID_FERAL_CLAW, SKILL_ID_FIRE_DANCE, SKILL_ID_FIRE_RAIN, SKILL_ID_FIRING_TRAP, SKILL_ID_FLAME_THROWER,
    SKILL_ID_FLAME_TRAP, SKILL_ID_FLANGE_SHOT, SKILL_ID_FLICKING_TONADO, SKILL_ID_FREEZING_TRAP,
    SKILL_ID_FRENZY_FANG, SKILL_ID_FULL_BASTER, SKILL_ID_FUMASHURIKEN_KOUCHIKU, SKILL_ID_FUMASHURIKEN_NAGE,
    SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_FUMASHURIKEN_SHOUAKU, SKILL_ID_GALE_STORM, SKILL_ID_GENJUTSU_KAGE_NUI,
    SKILL_ID_GENJUTSU_KUNAI, SKILL_ID_GOHO, SKILL_ID_GRAHAM_LIGHT, SKILL_ID_GRAND_JUDGEMENT,
    SKILL_ID_GRAND_JUDGEMENT_STATE, SKILL_ID_GREAT_ECHO, SKILL_ID_GRENADES_DROPPING, SKILL_ID_GRIM_TOOTH,
    SKILL_ID_GROUND_DRIFT, SKILL_ID_HACK_AND_SLASHER, SKILL_ID_HAMMER_OF_GOD, SKILL_ID_HANDRED_SPEAR,
    SKILL_ID_HASTY_FIRE_IN_THE_HOLE, SKILL_ID_HAWK_BOOMERANG, SKILL_ID_HAWK_RUSH, SKILL_ID_HEAD_CRUSH,
    SKILL_ID_HELL_JUDGEMENT, SKILL_ID_HIKKAKU, SKILL_ID_HIT_AND_SLIDING, SKILL_ID_HOLY_CROSS, SKILL_ID_HOWLING_MINE,
    SKILL_ID_HOWLING_MINE_APPEND, SKILL_ID_HUNGER, SKILL_ID_ICEBOUND_TRAP, SKILL_ID_IGNITION_BREAK,
    SKILL_ID_IMPACT_CRATER, SKILL_ID_IMPERIAL_CROSS, SKILL_ID_INTIMIDATE, SKILL_ID_INTIMIDATE_FOR_CLONE,
    SKILL_ID_JOINT_BEAT, SKILL_ID_KAGEKIRI, SKILL_ID_KAGEMOGURI, SKILL_ID_KAGE_GARI, SKILL_ID_KAGE_ISSEN,
    SKILL_ID_KAGE_NO_MAI, SKILL_ID_KAMITSUKU, SKILL_ID_KASUMIGIRI, SKILL_ID_KOGEKI_SOCHI_YUKOKA,
    SKILL_ID_KUNAI_KAITEN, SKILL_ID_KUNAI_KUSSETSU, SKILL_ID_KUNAI_WAIKYOKU, SKILL_ID_LOW_FLIGHT,
    SKILL_ID_MADNESS_CRUSHER, SKILL_ID_MAGAZIN_FOR_ONE, SKILL_ID_MAGNUM_BREAK, SKILL_ID_MAMMONITE,
    SKILL_ID_MANGETSU_KYAKU, SKILL_ID_MEGA_SONIC_BLOW, SKILL_ID_METEOR_ASSALT, SKILL_ID_MEYHEMIC_THORNS,
    SKILL_ID_MIDNIGHT_FALLEN, SKILL_ID_MIGHTY_SMASH, SKILL_ID_MISSION_BOMBARD, SKILL_ID_MOKOKOHAZAN,
    SKILL_ID_MOON_SLUSHER, SKILL_ID_MORYUKEN, SKILL_ID_MUSICAL_STRIKE, SKILL_ID_MYSTERY_POWDER, SKILL_ID_NASTY_SLASH,
    SKILL_ID_NERYOCHAGI, SKILL_ID_NOMERCY_CLAW, SKILL_ID_NUKUMORI, SKILL_ID_NUKUMORI_KABE, SKILL_ID_NYANTOMO_TEKKO,
    SKILL_ID_ONLY_ONE_BULLET, SKILL_ID_OVER_BLAND, SKILL_ID_OVER_SLASH, SKILL_ID_PETITIO, SKILL_ID_PHANTOM_MENUS,
    SKILL_ID_PHANTOM_SLAST, SKILL_ID_PIERCING_SHOT, SKILL_ID_PIKKI_TSUKI, SKILL_ID_PILE_BUNKER, SKILL_ID_PINION_SHOT,
    SKILL_ID_POWERFUL_SWING, SKILL_ID_POWER_SWING, SKILL_ID_PRIMAL_CLAW, SKILL_ID_PULSE_STRIKE, SKILL_ID_QUILL_SPEAR,
    SKILL_ID_RADIANT_SPEAR, SKILL_ID_RAGE_BURST_ATTACK, SKILL_ID_RAIKODAN, SKILL_ID_RAPID_SHOWER,
    SKILL_ID_RASETSU_HAOGEKI, SKILL_ID_RASETSU_HAOGEKI_MAX, SKILL_ID_RENCHUHOGEKI, SKILL_ID_RENDASHO,
    SKILL_ID_RESEARCH_REPORT, SKILL_ID_RHYTHM_SHOOTING, SKILL_ID_ROLLING_CUTTER, SKILL_ID_ROSE_BLOSSOM,
    SKILL_ID_RUNE_MASTERY, SKILL_ID_RUSH_QUAKE, SKILL_ID_RUSH_STRIKE, SKILL_ID_RYUSE_RAKKA,
    SKILL_ID_RYUSE_RAKKA_TSUIGEKI, SKILL_ID_SAKUGETSU_KYAKU, SKILL_ID_SANDANSHO, SKILL_ID_SANREI_ITTAI,
    SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SAVAGE_IMPACT, SKILL_ID_SAVAGE_LUNGE, SKILL_ID_SEIMEINO_TAMASHI,
    SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP, SKILL_ID_SEITE_KORIN, SKILL_ID_SENKO_KYAKU, SKILL_ID_SENKO_RENGEKI,
    SKILL_ID_SENPUTAI, SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SERVANT_WEAPON, SKILL_ID_SERVANT_WEAPON_DEMOLISION,
    SKILL_ID_SERVANT_WEAPON_PHANTOM, SKILL_ID_SEVERE_RAINSTORM, SKILL_ID_SEVERE_RAINSTORM_EX, SKILL_ID_SEYU_SENRE,
    SKILL_ID_SHADOW_STAB, SKILL_ID_SHARPEN_GUST, SKILL_ID_SHARPEN_HAIL, SKILL_ID_SHARP_SHOOTING,
    SKILL_ID_SHIELD_CHAIN_RUSH, SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHIELD_PRESS, SKILL_ID_SHIELD_SHOOTING,
    SKILL_ID_SHIELD_SHOOTING_STATE, SKILL_ID_SHIELD_SPELL_LV_1, SKILL_ID_SHINSE_BAKUHATSU, SKILL_ID_SHOOTING_FEATHER,
    SKILL_ID_SHUTTER_STORM, SKILL_ID_SISIKO, SKILL_ID_SKY_MOON, SKILL_ID_SKY_SUN, SKILL_ID_SLING_ITEM,
    SKILL_ID_SLUG_SHOT, SKILL_ID_SOLID_TRAP, SKILL_ID_SONIC_BLOW, SKILL_ID_SONIC_BLOW_TAMASHI, SKILL_ID_SONIC_WAVE,
    SKILL_ID_SORYUKYAKU, SKILL_ID_SOSENO_SHO, SKILL_ID_SPARK_BLASTER, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_SPEAR_STUB,
    SKILL_ID_SPIRAL_PIERCE_MAX, SKILL_ID_SPIRAL_SHOOTING, SKILL_ID_SPIRIT_MASTERY, SKILL_ID_SPORE_EXPLOSION,
    SKILL_ID_SPREAD_ATTACK, SKILL_ID_SPURT_ZYOTAI, SKILL_ID_STAR_LIGHT_KICK, SKILL_ID_STORM_BLAST,
    SKILL_ID_STORM_SLASH, SKILL_ID_SUNAMAKI, SKILL_ID_SUNKEI, SKILL_ID_SURPRISE_ATTACK, SKILL_ID_SWIFT_TRAP,
    SKILL_ID_TAITEN_ICHIGETSU, SKILL_ID_TAITEN_ICHIYO, SKILL_ID_TAIYO_BAKUHATSU, SKILL_ID_TAROUNO_KIZU,
    SKILL_ID_TATAMI_GAESHI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_TEIOAPUCHAGI_IN_DASH, SKILL_ID_TEMPEST_FLAP,
    SKILL_ID_TENCHI_BANSE, SKILL_ID_TENCHI_ICHIGETSU, SKILL_ID_TENCHI_ICHIYO, SKILL_ID_TENGETSU,
    SKILL_ID_TENKETSU_MOKU, SKILL_ID_TENKINO_MI, SKILL_ID_TENKI_SHUREN, SKILL_ID_TENME_RAKUSE, SKILL_ID_TENRACHIMO,
    SKILL_ID_TENRA_BANSHO, SKILL_ID_TENSE, SKILL_ID_TENYO, SKILL_ID_TIGER_HOWLING, SKILL_ID_TIGER_SLASH,
    SKILL_ID_TIGER_STRIKE, SKILL_ID_TOMAHAWKNAGE, SKILL_ID_TOOTH_OF_WUG, SKILL_ID_TORURYOCHAGI, SKILL_ID_TRACKING,
    SKILL_ID_TRIANGLE_SHOT, SKILL_ID_TRIPLE_LASER, SKILL_ID_TUZYO_KOGEKI_CALC_LEFT, SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT,
    SKILL_ID_TYPHOON_WING, SKILL_ID_UNKONO_ZYOTAI, SKILL_ID_UNLUCKY_RUSH, SKILL_ID_UNTIMATERIAL_BLAST,
    SKILL_ID_VAMPIRE_GIFT, SKILL_ID_VENOM_KNIFE, SKILL_ID_VENOM_PRESSURE, SKILL_ID_VIGILANT_AT_NIGHT,
    SKILL_ID_VULCAN_ARM, SKILL_ID_WILD_FIRE, SKILL_ID_WILD_SHOT, SKILL_ID_WILD_WALK, SKILL_ID_WIND_CUTTER,
    SKILL_ID_WUG_BITE, SKILL_ID_WUG_DASH, SKILL_ID_WUG_STRIKE, SKILL_ID_YARI_SHUREN, SKILL_ID_YAUCHI,
    SKILL_ID_YOMIGAESHI, SKILL_ID_ZIRAISHIN
} from "./skill.dat.js";
import {
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81
} from "./skill.h.js";
import { MIG_JOB_ID_SHADOW_CROSS } from "./data/mig.job.dat.js";
import { GetJobLevelMax } from "./data/mig.job.h.js";
import { g_skillManager } from "./global.js";
import { ATKbaiJYOUSAN, BattleCalcSubDamagePhysicalCommon, GetBattlerAtkPercentUp } from "./head-bridge.js";
import { CS } from "./head-calc-state.js";
import { GetTotalSpecStatus } from "./hmjob.js";
import {
    g_bDefinedDamageIntervals, n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, n_SiegeMode,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, set_w_DMG, w_DMG
} from "./ro4-state.js";
import { UsedSkillSearch } from "./skillstate.js";
import { n_A_WeaponZokusei } from "./roro-state.js";

export function ApplyPhysicalSkillFormulaBasic(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    let ret = null;
    let hitCountArray = null;
    let ampWork = 0;
		var bDefaultFormula = true;
		switch (n_A_ActiveSkill) {
			// 四次計算式用ダミー
			case SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT:
			case SKILL_ID_TUZYO_KOGEKI_CALC_LEFT:
				// 等倍計算
				break;

			// 四次計算式方式移行分
			case SKILL_ID_SHARP_SHOOTING:
				set_n_Enekyori(1);
				CS.wbairitu = 200 + 50 * n_A_ActiveSkillLV;
				CS.wCast = 2000;
				n_Delay[2] = 1500;
				break;

			case SKILL_ID_KAGEKIRI:
				n_Delay[0] = 1;
				set_n_Enekyori(0);
				CS.wbairitu += (-50 + 150 * n_A_ActiveSkillLV);
				break;

			case SKILL_ID_CRUSH_STRIKE:
				CS.n_KoteiCast = 3000;
				n_Delay[7] = 1000;
				CS.wbairitu = n_A_WeaponLV * (6 + n_A_Weapon_ATKplus)* 100 + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_POWER] + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
				break;

			case SKILL_ID_EXCEED_BREAK:
				CS.n_KoteiCast = 4500 + 500 * n_A_ActiveSkillLV;
				n_Delay[0] = 1;
				n_Delay[2] = 1000;
				set_n_Enekyori(0);
				CS.wbairitu = 100 + 15 * n_A_JobLV + 150 * n_A_ActiveSkillLV + Math.floor(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] * n_A_WeaponLV * n_A_BaseLV / 100);
				break;

			// 従来からある分
			case SKILL_ID_BASH:
				CS.wbairitu += n_A_ActiveSkillLV * 30;
				break;

			case SKILL_ID_MAGNUM_BREAK:
				CS.wbairitu += n_A_ActiveSkillLV * 20;
				set_n_A_Weapon_zokusei(3);
				n_Delay[2] = 2000;
				break;

			case SKILL_ID_SUNAMAKI:
								CS.wbairitu += 30;
				set_n_A_Weapon_zokusei(2);
				break;

			case SKILL_ID_ARROW_SHOWER:
				set_n_Enekyori(1);
				CS.wbairitu += 50 + 10 * n_A_ActiveSkillLV;
				n_Delay[3] = 1;
				break;

			case SKILL_ID_CHARGE_ARROW:
				set_n_Enekyori(1);
				CS.wCast = 1500;
				CS.wbairitu += 50;
				break;

			case SKILL_ID_MAMMONITE:
				CS.wbairitu += n_A_ActiveSkillLV * 50;
				break;

			case SKILL_ID_SPEAR_STUB:
				CS.wbairitu += n_A_ActiveSkillLV * 20;
				set_n_Enekyori(1);
				break;

			case SKILL_ID_GRIM_TOOTH:
				if(n_A_ActiveSkillLV >= 3) set_n_Enekyori(1);
				else set_n_Enekyori(0);
				CS.wbairitu += 20 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_SHIELD_CHARGE:
				CS.wbairitu += 20 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_HOLY_CROSS:
				CS.wbairitu += 35 * n_A_ActiveSkillLV;
				set_n_A_Weapon_zokusei(6);
				break;

			case SKILL_ID_DARK_CROSS:
				CS.wbairitu += 35 * n_A_ActiveSkillLV;
				set_n_A_Weapon_zokusei(7);
				break;


			case SKILL_ID_SURPRISE_ATTACK:
				CS.wbairitu += 80 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_SPEAR_BOOMERANG:
				CS.wbairitu += 50 * n_A_ActiveSkillLV;
				n_Delay[2] = 1000;
				set_n_Enekyori(1);
				break;

			case SKILL_ID_BRANDISH_SPEAR:
				w = (100 + 20 * n_A_ActiveSkillLV);
				if(n_A_ActiveSkillLV == 10)CS.wbairitu += 462.5;
				else if(n_A_ActiveSkillLV >= 7)CS.wbairitu += (w + w/2 + w/4 - 100);
				else if(n_A_ActiveSkillLV >= 4)CS.wbairitu += (w + w/2 - 100);
				else CS.wbairitu += (w - 100);
				CS.wCast = 700;
				break;

			case SKILL_ID_SONIC_BLOW:
			case SKILL_ID_SONIC_BLOW_TAMASHI:
				CS.wActiveHitNum = 8;
				CS.wbairitu = 400 + 40 * n_A_ActiveSkillLV;
				if (UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) CS.wbairitu = ROUNDDOWN(CS.wbairitu / 2);
				n_Delay[3] = 2;
				if(n_A_ActiveSkill==SKILL_ID_SONIC_BLOW_TAMASHI){
					if(n_SiegeMode){
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.25);
					}else{
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 2);
						n_Delay[3] = 1;
					}
				}
				break;

			case SKILL_ID_FREEZING_TRAP:
				n_Delay[0] = 1;
								set_n_A_Weapon_zokusei(1);
				break;

			case SKILL_ID_BACK_STAB:
				CS.wbairitu += 200 + 40 * n_A_ActiveSkillLV;
				n_Delay[2] = 500;
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				break;

			case SKILL_ID_INTIMIDATE:
			case SKILL_ID_INTIMIDATE_FOR_CLONE:
				CS.wbairitu += 30 * n_A_ActiveSkillLV;
				n_Delay[2] = 1000;
				break;

			case SKILL_ID_SANDANSHO:
				CS.wActiveHitNum = 3;
				CS.wbairitu = 100 + 20 * n_A_ActiveSkillLV;
				n_Delay[0] = 1;
				break;

			case SKILL_ID_RENDASHO:
				CS.wActiveHitNum = 4;
				CS.wbairitu += 150 + 50 * n_A_ActiveSkillLV;
				n_Delay[0] = 1;
				n_Delay[1] = 0.1;
				n_Delay[3] = 1 - (0.004 * n_A_AGI) - (0.002 * n_A_DEX);
				break;

			case SKILL_ID_MORYUKEN:
				CS.wbairitu = 450 + 50 * n_A_ActiveSkillLV;
				n_Delay[0] = 1;
				n_Delay[1] = 0.1;
				n_Delay[3] = 0.7 - (0.004 * n_A_AGI) - (0.002 * n_A_DEX);
				break;

			case SKILL_ID_HEAD_CRUSH:
				set_n_Enekyori(1);
				CS.wbairitu += 40 * n_A_ActiveSkillLV;
				n_Delay[2] = 500;
				break;

			case SKILL_ID_JOINT_BEAT:
				set_n_Enekyori(1);
				CS.wbairitu += (10 * n_A_ActiveSkillLV - 50);
				if(n_A_ActiveSkillLV > 5) n_Delay[2] = 1000;
				else n_Delay[2] = 800;
				break;

			case SKILL_ID_METEOR_ASSALT:
				CS.wbairitu += (40 * n_A_ActiveSkillLV - 60);
				CS.wCast = 500;

				n_Delay[2] = 500;
				break;

			case SKILL_ID_MOKOKOHAZAN:
				CS.wbairitu += (100 + 100 * n_A_ActiveSkillLV);
				n_Delay[3] = 1;
				n_Delay[2] = 300;
				break;

			case SKILL_ID_BUKKOKEN:
				n_Delay[0] = 1;
				CS.wbairitu += 100 * n_A_ActiveSkillLV - 60;
				n_Delay[1] = 0.1;
				n_Delay[3] = 0.7 - (0.004 * n_A_AGI) - (0.002 * n_A_DEX);
				break;

			case SKILL_ID_RENCHUHOGEKI:
				CS.wActiveHitNum = ROUNDDOWN((n_A_ActiveSkillLV + 1) / 2);
				n_Delay[0] = 1;
				CS.wbairitu += (300 + 100 * n_A_ActiveSkillLV);
				if(n_A_ActiveSkillLV>=6) n_Delay[2] = 1000;
				else n_Delay[2] = 800;
				break;

			case SKILL_ID_TOMAHAWKNAGE:
				set_n_Enekyori(1);
								set_n_A_Weapon_zokusei(4);
				break;

			case SKILL_ID_PULSE_STRIKE:
				CS.wbairitu += (100 * n_A_ActiveSkillLV - 100);
				break;

			case SKILL_ID_VENOM_KNIFE:
				set_n_Enekyori(1);
								CS.n_A_DMG[1] += Math.floor(14.5 * CS.wCSize);
				CS.n_A_DMG[2] += Math.floor(29 * CS.wCSize);
				break;

			case SKILL_ID_FANTASMIC_ARROW:
				set_n_Enekyori(1);
								CS.wbairitu += 50;
				break;

			case SKILL_ID_CHARGE_ATTACK:
				var w;
				w = attackMethodConfArray[0].GetOptionValue(0);
				CS.wbairitu += 100 * w;
				CS.wCast = 500 * (w+1);
				if(CS.wCast > 1500) CS.wCast = 1500;
				break;

			// 「拳聖」スキル「＊＊の温もり」
			case SKILL_ID_NUKUMORI:
			case SKILL_ID_NUKUMORI_KABE:
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置スキル設定
				set_g_bDefinedDamageIntervals(true);
				// ダメージ間隔
				if (mobData[20] == MONSTER_BOSSTYPE_BOSS) {
					n_Delay[5] = 100;
				} else if (n_A_ActiveSkill == SKILL_ID_NUKUMORI) {
					n_Delay[5] = 50;
				} else {
					n_Delay[5] = 20;
				}
				n_Delay[6] = [0,10,20,60][n_A_ActiveSkillLV] * 1000;	// オブジェクト存続時間
				n_Delay[3] = n_Delay[6]; 								// 重複設置はできない
				// 属性
				set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
				// ダメージ倍率
				CS.wbairitu = 100;
				break;


			case SKILL_ID_CART_TERMINATION:
				CS.wbairitu += Math.floor((attackMethodConfArray[0].GetOptionValue(0) / (16 - n_A_ActiveSkillLV) / 100 -1) * 100);
				break;

			case SKILL_ID_SUNKEI:
								CS.wbairitu += 200;
				n_Delay[2] = 2000;
				break;

			case SKILL_ID_FEORICHAGI:
			case SKILL_ID_NERYOCHAGI:
				n_Delay[0] = 1;
				CS.wbairitu += (60 + 20 * n_A_ActiveSkillLV);
				break;

			case SKILL_ID_TORURYOCHAGI:
			case SKILL_ID_APUCHAORURIGI:
				n_Delay[0] = 1;
				CS.wbairitu += (90 + 30 * n_A_ActiveSkillLV);
				if(n_A_ActiveSkill==SKILL_ID_APUCHAORURIGI) CS.wActiveHitNum = 3;
				break;

			case SKILL_ID_TEIOAPUCHAGI:
				set_n_Enekyori(1);
				CS.wbairitu += (10 * n_A_ActiveSkillLV - 70);
				break;

			case SKILL_ID_TEIOAPUCHAGI_IN_DASH:
				set_n_Enekyori(1);
				n_Delay[0] = 1;
				if (UsedSkillSearch(SKILL_ID_SPURT_ZYOTAI) && n_A_WeaponType==0) CS.wbairitu += (n_A_BaseLV * 8 - 100);
				else CS.wbairitu += (n_A_BaseLV * 4 - 100);
				break;

			case SKILL_ID_TATAMI_GAESHI:
				CS.wbairitu = (100 + 10 * n_A_ActiveSkillLV) * 2;
				n_Delay[2] = 3000;
				break;

			case SKILL_ID_KASUMIGIRI:
				n_Delay[0] = 0;
				CS.wbairitu += (20 * n_A_ActiveSkillLV);
				break;

			case SKILL_ID_BULLS_EYE:
								CS.wCast = 500;
				n_Delay[2] = 1000;
				set_n_Enekyori(1);
				CS.wActiveHitNum = 5;
				if(mobData[19] == 2 || mobData[19] == 7) CS.wbairitu += 400;
				break;

			case SKILL_ID_RAPID_SHOWER:
				set_n_Enekyori(1);
				CS.wActiveHitNum = 5;
				CS.wbairitu += 400 + 50 * n_A_ActiveSkillLV;
				n_Delay[2] = 1700;
				break;

			case SKILL_ID_TRACKING:
				CS.wCast = 500 + 100 * n_A_ActiveSkillLV;
				CS.cast_kotei = true;
				set_n_Enekyori(1);
				CS.wbairitu += 100 + 100 * n_A_ActiveSkillLV;
				n_Delay[2] = 1000;
				CS.w_HIT = CS.w_HIT * 5 +5;
				if(CS.w_HIT > 100) CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = CS.w_HIT;
				break;

			case SKILL_ID_DISARM:
				CS.wCast = 2000;
				n_Delay[2] = 1000;
				set_n_Enekyori(1);
				break;

			case SKILL_ID_PIERCING_SHOT:
				CS.wCast = 1500;
				set_n_Enekyori(1);
				if(n_A_WeaponType == 18) CS.wbairitu += 150 + 30 * n_A_ActiveSkillLV;
				else CS.wbairitu += 100 + 20 * n_A_ActiveSkillLV;
				n_Delay[2] = 500;
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				break;

			case SKILL_ID_DUST:
				CS.cast_kotei = true;
				set_n_Enekyori(0);
				CS.wbairitu += 50 * n_A_ActiveSkillLV;
				n_Delay[3] = 1;
				break;

			case SKILL_ID_FULL_BASTER:
				set_n_Enekyori(1);
				CS.wbairitu += 200 + 100 * n_A_ActiveSkillLV;
				n_Delay[2] = 1000 + 200 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_SPREAD_ATTACK:
				set_n_Enekyori(1);
				CS.wbairitu = 200 + 30 * n_A_ActiveSkillLV;
				n_Delay[2] = 1000;
				break;

			case SKILL_ID_GROUND_DRIFT:
				CS.wbairitu = 200 + 20 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
								CS.wCast = 1000;
				n_Delay[2] = 1000;
				break;

			case SKILL_ID_SONIC_WAVE:
				CS.wActiveHitNum = 3;
				set_n_Enekyori(1);
				n_Delay[2] = (n_A_ActiveSkillLV <= 5) ? 1000 : 0;
				n_Delay[7] = (n_A_ActiveSkillLV <= 5) ? 2000 : 200;
				CS.wbairitu = 700 + 100 * n_A_ActiveSkillLV;
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_HANDRED_SPEAR:	// ハンドレッドスピア
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				break;

			case SKILL_ID_WIND_CUTTER:
				set_n_A_Weapon_zokusei(4);
				CS.wCast = n_A_ActiveSkillLV * 500 - 500;
				n_Delay[2] = 500;
				n_Delay[7] = 2500 - 500 * n_A_ActiveSkillLV;
				CS.wbairitu = 100 + 50 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_PHANTOM_SLAST:	// ファントムスラスト
				set_n_Enekyori(1);
				CS.wbairitu = 50 * n_A_ActiveSkillLV + 10 * Math.max(LearnedSkillSearch(SKILL_ID_YARI_SHUREN), UsedSkillSearch(SKILL_ID_YARI_SHUREN));
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 150);
				break;

			case SKILL_ID_IGNITION_BREAK:
				n_Delay[7] = 3000;
				var w = attackMethodConfArray[0].GetOptionValue(0);
				if(w == 0) CS.wbairitu = 300 * n_A_ActiveSkillLV;
				if(w == 1) CS.wbairitu = 250 * n_A_ActiveSkillLV;
				if(w == 2) CS.wbairitu = 200 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				if(attackMethodConfArray[0].GetOptionValue(1) == 1) CS.wbairitu -= 1;
				if(CS.BK_Weapon_zokusei == 3) CS.wbairitu += 100 * n_A_ActiveSkillLV;
				break;

			// ストームブラスト
			case SKILL_ID_STORM_BLAST: {
				CS.wCast = 1000;
				CS.n_KoteiCast = 1000;
				n_Delay[7] = 8000;
				const rune_mastery = Math.max(LearnedSkillSearch(SKILL_ID_RUNE_MASTERY), UsedSkillSearch(SKILL_ID_RUNE_MASTERY));
				CS.wbairitu = 100 * rune_mastery + ROUNDDOWN(n_A_INT / 8) * 100;
				break;
			}
			case SKILL_ID_CROSS_IMPACT:
				CS.wActiveHitNum = 7;
				n_Delay[0] = 2;
				n_Delay[2] = 3000 - 500 * n_A_ActiveSkillLV;
				CS.wbairitu = 1000 + 100 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
				if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) CS.wbairitu = ROUNDDOWN(CS.wbairitu / 2);
				break;

			case SKILL_ID_DARK_ILLUSION:
				set_n_Enekyori(1);
				n_Delay[7] = 1500 + 500 * n_A_ActiveSkillLV;
				CS.wbairitu = 100;
				break;

			case SKILL_ID_VENOM_PRESSURE:
				n_Delay[0] = 1;
				n_Delay[2] = 1000;
				CS.wbairitu = 1000;
				break;

			case SKILL_ID_COUNTER_SLASH:
				n_Delay[2] = 2000;
				CS.wbairitu = 300 + 150 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
				ampWork = (n_A_JOB == MIG_JOB_ID_SHADOW_CROSS) ? GetJobLevelMax(JOB_ID_GILOTINCROSS) : n_A_JobLV;
				CS.wbairitu += n_A_AGI * 2 + ampWork * 4;
				if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) CS.wbairitu = ROUNDDOWN(CS.wbairitu / 2);
				break;

			case SKILL_ID_PHANTOM_MENUS:
				n_Delay[7] = 1000;
				CS.wbairitu = 300;
				if(attackMethodConfArray[0].GetOptionValue(0) == 0) CS.wbairitu = 0;
				break;

			case SKILL_ID_ROLLING_CUTTER:
				n_Delay[7] = 200;
				CS.wbairitu = 50 + 50 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) CS.wbairitu = ROUNDDOWN(CS.wbairitu / 2);
				break;

			case SKILL_ID_CROSS_RIPPER_SLASHER:
				set_n_Enekyori(1);
				n_Delay[0] = 1;
				n_Delay[2] = 1000;
				CS.wbairitu = 400 + 80 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				CS.wbairitu += attackMethodConfArray[0].GetOptionValue(0) * n_A_AGI;
				if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) CS.wbairitu = ROUNDDOWN(CS.wbairitu / 2);
				break;

			case SKILL_ID_ARROW_STORM:
				CS.wCast = 2000 + 200 * n_A_ActiveSkillLV;
				n_Delay[2] = 7000 - 400 * n_A_ActiveSkillLV;
				n_Delay[7] = 5500 - 500 * n_A_ActiveSkillLV;
				CS.wActiveHitNum = 3;
				set_n_Enekyori(1);
				CS.wbairitu = 1000 + 80 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_CLUSTER_BOMB:
				CS.wbairitu = 200 + 100 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_FIRING_TRAP:
				CS.wbairitu = 100;
				break;

			case SKILL_ID_ICEBOUND_TRAP:
				CS.wbairitu = 100;
				break;

			case SKILL_ID_WUG_BITE: {	// ウォーグバイト
				n_Delay[2] = 2000;
				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
					case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
						n_Delay[7] = 2500 + 500 * n_A_ActiveSkillLV;
						break;
					default:
						n_Delay[7] = 2000 + 2000 * n_A_ActiveSkillLV;
						break;
				}
				CS.wbairitu = 800 + 200 * n_A_ActiveSkillLV;
				if(!CS.n_AS_MODE){
					const tooth_of_wug_lv = Math.max(LearnedSkillSearch(SKILL_ID_TOOTH_OF_WUG), UsedSkillSearch(SKILL_ID_TOOTH_OF_WUG));
					let w = 50 + 10 * n_A_ActiveSkillLV - Math.floor(mobData[8] / 4) + tooth_of_wug_lv * 2;
					if(w < 50) w = 50;
					if(w > 100) w = 100;
					CS.str_bSUBname += "<Font size=2>命中時の拘束確率(推定)<BR></Font>";
					CS.str_bSUB += w +"%<BR>";
				}
				break;
			}

			case SKILL_ID_WUG_STRIKE:
				set_n_Enekyori(1);
				CS.wbairitu = 250 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_EIBINNA_KYUKAKU:
				n_Delay[2] = 3000;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					n_Delay[7] = 2000 + 1000 * n_A_ActiveSkillLV;
					break;

				default:
					n_Delay[7] = 0;
					break;

				}

				CS.wbairitu = 100 + 50 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_WUG_DASH:
				CS.wbairitu = 300;
				break;

			// 「メカニック」スキル「アックストルネード」
			case SKILL_ID_AXE_TORNADE:
				// 2024/09/18 実測値との誤差無しを確認済み
				CS.wActiveHitNum = 6;
				n_Delay[2] = 500;
				n_Delay[7] = 4500 - 500 * n_A_ActiveSkillLV;
				// 基本倍率
				// TODO: アックスストンプ状態はスキル倍率だけに影響するので職固有自己支援から攻撃手段オプションに移行する
				const state_axe_stomp = attackMethodConfArray[0].GetOptionValue(0);
				if (state_axe_stomp === 1) {
					// アックスストンプ状態の場合
					CS.wbairitu = 230 + 230 * n_A_ActiveSkillLV;
					CS.wbairitu += n_A_VIT * 2;
				} else {
					CS.wbairitu = 200 + 180 * n_A_ActiveSkillLV;
					CS.wbairitu += n_A_VIT;
				}
				// 最終倍率
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_AXE_BOOMERANG:
				set_n_Enekyori(1);
				var w_Weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
				CS.wCast = 5500 - 500 * n_A_ActiveSkillLV;
				CS.wbairitu = 250 + 50 * n_A_ActiveSkillLV + w_Weight;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			// 「メカニック」スキル「パワースイング」
			// 2025/01/27 実測値との誤差無しを確認済み
			case SKILL_ID_POWER_SWING:
				CS.wCast = Math.max(0, 1000 - 200 * n_A_ActiveSkillLV);
				if (attackMethodConfArray[0].GetOptionValue(1) == 1) {
					// ABRバトルウォリアー状態の場合
					CS.wActiveHitNum = 2;
					CS.wbairitu = 500 + 150 * n_A_ActiveSkillLV;
				} else {
					// 通常時
					CS.wbairitu = 300 + 100 * n_A_ActiveSkillLV;
				}
				CS.wbairitu += ROUNDDOWN((n_A_STR + n_A_DEX) * n_A_BaseLV / 100);
				break;

			// 「メカニック」スキル「ブーストナックル」
			case SKILL_ID_BOOST_KNUCKLE:
				set_n_Enekyori(1);
				CS.wCast = 500 * n_A_ActiveSkillLV - 500;
				n_Delay[1] = n_Delay[1] / 2;
				if(UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON)) CS.wHITsuu = 2;
				CS.wbairitu = 200 + 100 * n_A_ActiveSkillLV + n_A_DEX;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
				break;

			case SKILL_ID_PILE_BUNKER:
				n_Delay[2] = 3000 - 1000 * n_A_ActiveSkillLV;
				n_Delay[7] = 7500 - 2500 * n_A_ActiveSkillLV;
				CS.wbairitu = 300 + 100 * n_A_ActiveSkillLV + n_A_STR;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			// 「メカニック」スキル「バルカンアーム」
			case SKILL_ID_VULCAN_ARM:
				set_n_Enekyori(1);
				CS.wCast = 1000 * n_A_ActiveSkillLV - 1000;
				if(UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON)) CS.wHITsuu = 2;
				CS.wbairitu = 70 * n_A_ActiveSkillLV + n_A_DEX;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
				break;

			case SKILL_ID_FLAME_THROWER:
			case SKILL_ID_COLD_THROWER:
				if(n_A_ActiveSkill==SKILL_ID_FLAME_THROWER){
					set_n_A_Weapon_zokusei(3);
					CS.wCast = 500;
				}
				if(n_A_ActiveSkill==SKILL_ID_COLD_THROWER){
					set_n_A_Weapon_zokusei(1);
					CS.wCast = 1000 * n_A_ActiveSkillLV;
				}
				n_Delay[2] = 2000 - 500 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
				CS.wbairitu = 300 + 300 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 150);
				break;

			// 「ロイヤルガード」スキル「キャノンスピア」
			case SKILL_ID_CANNON_SPEAR:
				set_n_Enekyori(1);
				n_Delay[7] = 2000;
				CS.wbairitu = (50 + n_A_STR) * n_A_ActiveSkillLV;
				/*
				グランドジャッジメント状態スキル倍率
				実測値との一致を確認済み
				*/
				if (UsedSkillSearch(SKILL_ID_GRAND_JUDGEMENT_STATE) > 0) {
					CS.wbairitu = (200 + n_A_STR) * n_A_ActiveSkillLV;
				}

				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			// 「ロイヤルガード」スキル「バニシングポイント」
			case SKILL_ID_BANISHING_POINT:
				set_n_Enekyori(1);
				// バッシュ習得Lv補正
				let w_BN = 30 * Math.max(LearnedSkillSearch(SKILL_ID_BASH), attackMethodConfArray[0].GetOptionValue(0));
				// 基本倍率
				CS.wbairitu = 50 * n_A_ActiveSkillLV + w_BN;
				/*
				グランドジャッジメント状態スキル倍率
				実測値との一致を確認済み
				*/
				if (UsedSkillSearch(SKILL_ID_GRAND_JUDGEMENT_STATE) > 0) {
					CS.wbairitu *= 2;
				}
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_SHIELD_PRESS:
				n_Delay[7] = 2000;
				CS.wbairitu = 200 * n_A_ActiveSkillLV
				/*
				シールドシューティング状態スキル倍率
				実測値との一致を確認済み
				*/
				if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
					CS.wbairitu = 300 * n_A_ActiveSkillLV;
				}

				CS.wbairitu += n_A_STR + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT];
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_RAGE_BURST_ATTACK:
				n_Delay[7] = 3000;
				CS.wbairitu = 200 * attackMethodConfArray[0].GetOptionValue(0);
				if(attackMethodConfArray[0].GetOptionValue(1) > 0) {
					CS.wbairitu += (charaData[CHARA_DATA_INDEX_MAXHP] - attackMethodConfArray[0].GetOptionValue(1)) / 100;
				}
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_MOON_SLUSHER:
				// オーバーブランドの習得Lv補正
				var w_OB = 80 * Math.max(LearnedSkillSearch(SKILL_ID_OVER_BLAND), attackMethodConfArray[0].GetOptionValue(0));
				CS.wCast = 2000;
				n_Delay[7] = 5500 - 500 * n_A_ActiveSkillLV;
				CS.wbairitu = 120 * n_A_ActiveSkillLV + w_OB;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_EARTH_DRIVE:
				CS.wActiveHitNum = 1;
				CS.wCast = 1000;
				n_Delay[2] = 1000;
				n_Delay[7] = 8000 - 1000 * n_A_ActiveSkillLV;
				CS.wbairitu = 100 + 100 * n_A_ActiveSkillLV;
				/*
				シールドシューティング状態スキル倍率
				実測値との一致を確認済み
				*/
				if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
					CS.wbairitu = 300 + 100 * n_A_ActiveSkillLV;
				}

				CS.wbairitu = ROUNDDOWN(CS.wbairitu * ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT] / 100);
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_FAINT_BOMB:
				var ratio = 1 + (n_A_ActiveSkillLV == 1 ? 2 : 3) + Math.floor((n_A_ActiveSkillLV - 1) / 3);
				CS.wbairitu = ROUNDDOWN(ratio * (n_A_DEX / 2) * n_A_JobLV / 10 * n_A_BaseLV / 120);
				CS.wCast = Math.max(0, 1000 * Math.floor((n_A_ActiveSkillLV - 4) / 3));

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					n_Delay[7] = 7000;
					break;

				default:
					n_Delay[7] = 2000;
					break;

				}

				break;

			// 「シャドウチェイサー」スキル「フェイタルメナス」
			case SKILL_ID_FATAL_MENUS:
				n_Delay[2] = 500;
				// 基本倍率
				CS.wbairitu = (n_A_ActiveSkillLV + 1) * 100;
				// アビスダガー状態補正
				if (UsedSkillSearch(SKILL_ID_ABYSS_DAGGER_STATE) == 1) {
					CS.wbairitu *= 1.2;
				}
				// BaseLv補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// ヒット数
				if (n_A_WeaponType == ITEM_KIND_KNIFE) {
					CS.wHITsuu = 2;
				}
				break;

			case SKILL_ID_TRIANGLE_SHOT:
				CS.wActiveHitNum = 3;
				CS.wbairitu = (n_A_ActiveSkillLV - 1) * (n_A_AGI / 2) + 300;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 120);
				set_n_A_Weapon_zokusei(GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL));
				if(n_A_WeaponZokusei != 0) set_n_A_Weapon_zokusei(n_A_WeaponZokusei);
				set_n_Enekyori(1);
				CS.wCast = 5000 - 500 * n_A_ActiveSkillLV;
				n_Delay[2] = 500 - 50 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_SORYUKYAKU:
				CS.wActiveHitNum = 2;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					CS.wbairitu = 50 + 20 * n_A_ActiveSkillLV;
					break;

				default:
					CS.wbairitu = 100 + 40 * n_A_ActiveSkillLV;
					break;

				}

				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);

				var w = attackMethodConfArray[0].GetOptionValue(0);

				if(w != 0){
					if(w == 1) n_Delay[2] = 1000 - n_A_AGI * 4 - n_A_DEX * 2;
					if(w == 2) n_Delay[2] = 300 + (1000 - n_A_AGI * 4 - n_A_DEX * 2);
					if(n_Delay[2] <0) n_Delay[2] = 0;
				}
				break;

			case SKILL_ID_TENRACHIMO:
				n_Delay[7] = 200;
				CS.wActiveHitNum = 3;
				if(!CS.n_AS_MODE){
					if(attackMethodConfArray[0].GetOptionValue(0) == 0) {
						// 単発の場合
						CS.wbairitu = 80 * n_A_ActiveSkillLV + n_A_AGI;
					} else {
						// コンボの場合
						CS.wbairitu = 100 * n_A_ActiveSkillLV + n_A_AGI + 150;
					}
				} else {
					if(attackMethodConfArray[0].GetSkillId() == SKILL_ID_SENKO_RENGEKI){
						// 閃光連撃から呼ばれた場合
						CS.wbairitu = 80 * n_A_ActiveSkillLV + n_A_AGI;
					} else {
						// それ以外
						CS.wbairitu = 100 * n_A_ActiveSkillLV + n_A_AGI + 150;
					}
				}
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_ZIRAISHIN:
				n_Delay[7] = 3000;
				if(attackMethodConfArray[0].GetOptionValue(0) == 0) CS.wbairitu = ((50 * n_A_ActiveSkillLV) * n_A_BaseLV / 100) + n_A_INT * 2;
				else CS.wbairitu = ((150 * n_A_ActiveSkillLV) * n_A_BaseLV / 100) + n_A_INT * 3;
				break;

			case SKILL_ID_BAKKISANDAN: {	// 爆気散弾
				set_n_Enekyori(1);
				n_Delay[0] = 1;
				n_Delay[2] = 1000;
				n_Delay[7] = 10000;
				// TODO 爆裂波動の習得Lvがスキル倍率に影響する可能性がある
				var w = attackMethodConfArray[0].GetOptionValue(0);
				if (UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN) || UsedSkillSearch(SKILL_ID_BAKURETSU_HADO) || TimeItemNumSearch(34)) {
					CS.wbairitu = ROUNDDOWN((125 + 25 * n_A_ActiveSkillLV) * n_A_BaseLV / 150 * w);
				}
				else CS.wbairitu = ROUNDDOWN(20 * n_A_ActiveSkillLV * n_A_BaseLV / 150 * w);
				break;
			}
			case SKILL_ID_DAITENHOSUI:
				n_Delay[0] = 1;
				CS.wActiveHitNum = 2;
				CS.wbairitu = 100 + 250 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 150);
				break;

			case SKILL_ID_RASETSU_HAOGEKI_MAX:
			case SKILL_ID_RASETSU_HAOGEKI:
				CS.wActiveHitNum = 7;
				CS.wCast = 800 + 200 * n_A_ActiveSkillLV;
				n_Delay[2] = 100 * n_A_ActiveSkillLV;
				CS.wbairitu = 500 * n_A_ActiveSkillLV;
				if(!CS.n_AS_MODE){
					if(attackMethodConfArray[0].GetOptionValue(0) == 1) {
						CS.wbairitu = 800 * n_A_ActiveSkillLV;
					}
				}
				else {
					CS.wbairitu = 800 * n_A_ActiveSkillLV;
				}
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_GOHO:
				n_Delay[2] = 1000;
				n_Delay[7] = 2000;
				var w1 = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXHP] * (10 + 2 * n_A_ActiveSkillLV) / 100);
				var w2 = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXSP] * (5 + n_A_ActiveSkillLV) / 100);
				if(!CS.n_AS_MODE){
					// 手動時
					if(attackMethodConfArray[0].GetOptionValue(0) == 0) {
						// 単発
						CS.wCast = 1000 + 100 * n_A_ActiveSkillLV;
						CS.wbairitu = (w1 + w2) / 4;
					}
					if(attackMethodConfArray[0].GetOptionValue(0) == 1) {
						// コンボ
						n_Delay[0] = 1;
						CS.wbairitu = (w1 + w2) / 1.5;
					}
				} else {
					// オートスペル時
					if(attackMethodConfArray[0].GetSkillId() == SKILL_ID_COMBO_SORYUKYAKU) {
						CS.wbairitu = (w1 + w2) / 1.5;
					}
				}
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_SENPUTAI:
				n_Delay[7] = 5000;
				CS.wbairitu = n_A_BaseLV + n_A_DEX;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_SISIKO:
				CS.wCast = 1000;
				CS.n_KoteiCast = 500;
				n_Delay[7] = 10000;
				CS.wbairitu = 300 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 150);
				break;

			case SKILL_ID_RAIKODAN:
				set_n_Enekyori(1);
				CS.wCast = 1000 * n_A_ActiveSkillLV;
				CS.wbairitu = 200 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				if(CS.BK_Weapon_zokusei == 4) CS.wbairitu = ROUNDDOWN(CS.wbairitu * 125 / 100);
				break;

			case SKILL_ID_TENKETSU_MOKU:
				CS.wbairitu = 100 * n_A_ActiveSkillLV + n_A_DEX;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				CS.w_HIT = Math.floor(CS.w_HIT * (5 * n_A_ActiveSkillLV + (n_A_DEX + n_A_BaseLV) / 10) / 100);
				CS.w_HIT_HYOUJI = CS.w_HIT;
				break;

			// 「ジェネティック」スキル「カートトルネード」
			// 2024/11/16 実測誤差無しを確認済み
			case SKILL_ID_CART_TORNADO: {
				// 詠唱など
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				CS.wbairitu = 100 * n_A_ActiveSkillLV
				// ウドゥンウォリアー補正
				CS.wbairitu += 100 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(1);
				// 修練補正
				const cart_kaizo_lv = Math.max(LearnedSkillSearch(SKILL_ID_CART_KAIZO), UsedSkillSearch(SKILL_ID_CART_KAIZO));
				CS.wbairitu += 50 * cart_kaizo_lv;
				// カート重量・純粋STR補正
				CS.wbairitu += Math.floor(attackMethodConfArray[0].GetOptionValue(0) / (150 - SU_STR));;
				// 分割ヒット
				CS.wActiveHitNum = 3;
				break;
			}

			case SKILL_ID_SLING_ITEM:
				set_n_Enekyori(1);
				n_Delay[2] = 500;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					n_Delay[7] = 7000;
					break;

				default:
					n_Delay[7] = 1000;
					break;

				}

				var kihon_bairitu = [300,800,800,500,877];
				CS.wbairitu = ROUNDDOWN((kihon_bairitu[attackMethodConfArray[0].GetOptionValue(0)] + n_A_STR + n_A_DEX) * n_A_BaseLV / 100);
				break;

			// 「ジェネティック」スキル「スポアエクスプロージョン」
			// 2024/11/16 YEサーバー実測との誤差 +1 ～ -8 を確認
			// 計算式自体は合っていると判断
			case SKILL_ID_SPORE_EXPLOSION:
				// 詠唱など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 遠距離
				set_n_Enekyori(1);
				// 基本倍率
				CS.wbairitu = 150 * n_A_ActiveSkillLV;
				// ウドゥンフェアリー補正
				CS.wbairitu += 100 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(0);
				// INT補正
				CS.wbairitu += 200 + n_A_INT;
				// BaseLv補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// 分割ヒット
				CS.wActiveHitNum = 3;
				break;

			// 「アークビショップ」スキル「グレイアムライト」
			case SKILL_ID_GRAHAM_LIGHT:
				set_n_Enekyori(1);
				CS.wbairitu = 100 + 10 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_SHIELD_SPELL_LV_1:
				CS.wCast = 1000;
				n_Delay[0] = 1;
				n_Delay[2] = 1000;
				n_Delay[7] = 2000;
				CS.wbairitu = n_A_BaseLV * 4 + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_POWER] * 10 + n_A_VIT * 2;
				break;

			case SKILL_ID_CHIMEITEKINA_KIZU:
				CS.wbairitu += 0;
				break;

			case SKILL_ID_HELL_JUDGEMENT:
			case SKILL_ID_VAMPIRE_GIFT:
	// 投稿フォームからの連絡　プレイヤーが使用する場合、遠距離扱いではないらしい
	//			set_n_Enekyori(1);
				CS.wbairitu = 100 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_YOMIGAESHI:	// 黄泉返し
				set_n_Enekyori(1);
				n_Delay[7] = 3500 - 500 * n_A_ActiveSkillLV;
				CS.wbairitu = (100 + 20 * attackMethodConfArray[0].GetOptionValue(0)) * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				break;

			case SKILL_ID_FUMASHURIKEN_RANKA: {	// 風魔手裏剣 -乱華-
				set_n_Enekyori(1);
				CS.wActiveHitNum = 5;
				CS.wCast = Math.max(1200, 2200 - 200 * n_A_ActiveSkillLV);
				CS.n_KoteiCast = Math.min(1800, 800 + 200 * n_A_ActiveSkillLV);
				n_Delay[7] = 500;
				// 風魔手裏剣投げの習得Lv
				const fumashuriken_nage_lv = Math.max(LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_NAGE), attackMethodConfArray[0].GetOptionValue(0));
				CS.wbairitu = 150 * n_A_ActiveSkillLV + n_A_STR + 100 * fumashuriken_nage_lv;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				if(!CS.n_AS_MODE && n_A_WeaponType != 16) CS.n_Buki_Muri = true;
				break;
			}
			case SKILL_ID_DARK_CRAW:
				CS.wActiveHitNum = 3;
				n_Delay[7] = 60000;
				CS.wbairitu = 100 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_SHUTTER_STORM:
				CS.wbairitu = 1700 + 200 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
				CS.wCast = 3500 - 500 * n_A_ActiveSkillLV;
				n_Delay[2] = 0;
				n_Delay[7] = 2000;
				break;

			case SKILL_ID_HOWLING_MINE:
				CS.wbairitu = 400 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
				CS.wCast = 1000;
				n_Delay[2] = 1000;
				n_Delay[7] = 0;
				break;

			case SKILL_ID_HOWLING_MINE_APPEND:
	// TODO: 暫定。ここにはいらない。
	//			set_n_A_Weapon_zokusei(3);		// 強制火属性
				CS.wbairitu = 1000 + 400 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
				CS.wCast = 0;
				n_Delay[2] = 0;
				n_Delay[7] = 0;
				break;

			case SKILL_ID_FIRE_RAIN:
				CS.wbairitu = 500 + 500 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
				CS.wCast = 0;
				n_Delay[2] = 1000;
				n_Delay[7] = 6000 - 1000 * n_A_ActiveSkillLV;
				break;

			case SKILL_ID_FIRE_DANCE: {	// ファイヤーダンス
				CS.wbairitu = 1000 + 100 * n_A_ActiveSkillLV;
				// デスペラード習得Lv補正
				let deathperad_lv = Math.max(LearnedSkillSearch(SKILL_ID_DEATHPERAD), attackMethodConfArray[0].GetOptionValue(0));
				CS.wbairitu += 20 * deathperad_lv;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				set_n_Enekyori(1);
				CS.wCast = 0;
				n_Delay[2] = 1000;
				n_Delay[7] = 0;
				break;
			}
			case SKILL_ID_BUNISHING_BASTER:
				CS.wbairitu = 200 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				set_n_Enekyori(1);
				CS.wCast = 3500 - 500 * n_A_ActiveSkillLV;
				CS.n_KoteiCast = 1000;
				n_Delay[2] = 0;
				n_Delay[7] = 0;
				break;

			case SKILL_ID_UNTIMATERIAL_BLAST:
				CS.wbairitu = 1500 + 300 * n_A_ActiveSkillLV;
				set_n_Enekyori(1);
				CS.wCast = 4000;
				CS.n_KoteiCast = 1000;
				n_Delay[2] = 1000;
				n_Delay[7] = 5000;
				break;

			case SKILL_ID_DRAGON_TAIL:
	// TODO: 暫定。ここにはいらない。
	//			set_n_A_Weapon_zokusei(0);		// 強制無属性
				CS.wbairitu = 500 + 200 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				// 烙印状態ならば、攻撃力２倍
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
					CS.wbairitu *= 2;
				}

				set_n_Enekyori(1);
				CS.wCast = Math.min(2000, 1000 + 200 * n_A_ActiveSkillLV);
				n_Delay[2] = 2000;
				n_Delay[7] = 5000;
				break;

			case SKILL_ID_SLUG_SHOT:
	// TODO: 暫定。ここにはいらない。
	//			set_n_A_Weapon_zokusei(0);		// 強制無属性
				CS.wbairitu = 600 * n_A_ActiveSkillLV;
				CS.wbairitu *= (2 + mobData[17]);
				// 対モンスターのみ２倍 ****
				if(mobData[0] != MONSTER_ID_PLAYER){
					CS.wbairitu *= 2;
				}
				CS.wCast = 2500;
				n_Delay[2] = 0;
				n_Delay[7] = 15000;
				break;

			case SKILL_ID_HAMMER_OF_GOD:
	// TODO: 暫定。ここにはいらない。
	//			set_n_A_Weapon_zokusei(0);		// 強制無属性
				CS.wbairitu = 500 + 100 * n_A_ActiveSkillLV;

				// 烙印状態の影響
				var coincount = attackMethodConfArray[0].GetOptionValue(0);
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
					CS.wbairitu += coincount * 200;
				} else {
					CS.wbairitu += coincount * 50;
				}

				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);

				set_n_Enekyori(1);
				CS.wCast = 0;
				n_Delay[2] = 2000;
				n_Delay[7] = 30000;
				break;

			case SKILL_ID_BIND_TRAP:
				CS.wbairitu = (1000 + 90 * n_A_ActiveSkillLV) / 100;
				set_n_Enekyori(1);
				CS.wCast = "不明";
				n_Delay[0] = 2000;
				break;

			case  SKILL_ID_KAMITSUKU:
				CS.wbairitu = 1000;
				if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
					CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.5);
				}
				CS.wCast = 500;
				n_Delay[2] = 500;
				n_Delay[7] = 0;
				break;

			case  SKILL_ID_HIKKAKU:
				CS.wbairitu = 400 + 200 * n_A_ActiveSkillLV;
				CS.wCast = 0;
				n_Delay[2] = 0;
				n_Delay[7] = 0;
				break;

			case  SKILL_ID_PIKKI_TSUKI:
				set_n_Enekyori(1);
				CS.wActiveHitNum = 5;

				CS.wbairitu = 1250 + 50 * n_A_ActiveSkillLV;

				//----------------------------------------------------------------
				// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
				//----------------------------------------------------------------
				if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI), UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI)) > 0) {
					switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 2);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.5);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.3);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.1);
						break;
					}
				}

				// 敵の残りＨＰによって威力増加
				var resthp = attackMethodConfArray[0].GetOptionValue(0);
				if ( (n_A_ActiveSkillLV == 1 && resthp < 30)
					|| (n_A_ActiveSkillLV == 2 && resthp < 40)
					|| (n_A_ActiveSkillLV == 3 && resthp < 50)
					|| (n_A_ActiveSkillLV == 4 && resthp < 60)
					|| (n_A_ActiveSkillLV == 5 && resthp < 70) ) {
					CS.wbairitu = ROUNDDOWN(CS.wbairitu * 2);
				}

				CS.wCast = 500 * n_A_ActiveSkillLV - 500;
				n_Delay[2] = 2500 - 500 * n_A_ActiveSkillLV;
				n_Delay[7] = 0;
				break;

			case  SKILL_ID_TAROUNO_KIZU:
				set_n_Enekyori(1);

				CS.wbairitu = 4000 + 200 * n_A_ActiveSkillLV;

				//----------------------------------------------------------------
				// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
				//----------------------------------------------------------------
				if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI), UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI)) > 0) {
					switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 2);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.5);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.3);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.1);
						break;
					}
				}

				// ボスモンスターにはダメージ２倍
				if (mobData[20] == 1) {
					CS.wbairitu *= 2;
				}

				// タロウの傷状態のモンスターにはダメージ２倍
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_TARONO_KIZU]) {
					CS.wbairitu *= 2;
				}

				CS.wCast = 0;
				CS.n_KoteiCast = 2000;
				n_Delay[2] = 1000;
				n_Delay[7] = 15000;
				break;

			/*
				「サモナー」スキル「キャロットビート」
			*/
			case  SKILL_ID_CARROT_BEAT:
				set_n_Enekyori(1);
				CS.wActiveHitNum = 3;

				// 基礎倍率
				CS.wbairitu = 1000 + 100 * n_A_ActiveSkillLV;

				// Str補正
				CS.wbairitu += n_A_STR

				// Lv補正
				if(n_A_BaseLV >= 100) {
					CS.wbairitu = ROUNDDOWN(CS.wbairitu * (n_A_BaseLV / 100));
				}

				//----------------------------------------------------------------
				// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
				//----------------------------------------------------------------
				if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI), UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI)) > 0) {
					switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 2);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.5);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.3);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.1);
						break;
					}
				}

				CS.wCast = 2000;

				var aDelay = [0, 500, 1000, 1500, 3000];
				n_Delay[2] = aDelay[n_A_ActiveSkillLV - 1];
				var aCool = [2000, 1500, 1500, 1000, 500];
				n_Delay[7] = aCool[n_A_ActiveSkillLV - 1];
				break;

			case  SKILL_ID_SAVAGENO_TAMASHI:

				set_n_Enekyori(1);

				CS.wbairitu = 2500 + 100 * n_A_ActiveSkillLV;

				//----------------------------------------------------------------
				// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
				//----------------------------------------------------------------
				if (Math.max(LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI), UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI)) > 0) {
					switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 2);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.5);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.3);
						break;
					case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
						CS.wbairitu = ROUNDDOWN(CS.wbairitu * 1.1);
						break;
					}
				}

				var aCast = [1000, 1000, 1000, 2000, 2000];
				CS.wCast = aCast[n_A_ActiveSkillLV - 1];
				var aDelay = [0, 500, 1000, 1000, 1500];
				n_Delay[2] = aDelay[n_A_ActiveSkillLV - 1];
				n_Delay[7] = 2500 - 500 * n_A_ActiveSkillLV;
				break;

			case  SKILL_ID_TAIYO_BAKUHATSU:

				var hikariLv = 0;
				var hikariBairitsu = 0;
	/*
				hikariLv = UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI);

				if (hikariLv > 0) {
					hikariBairitsu = 25 + 5 * hikariLv;
				}
	*/
				CS.wbairitu = 1000 + 220 * n_A_ActiveSkillLV;
				CS.wbairitu = Math.floor(CS.wbairitu * (100 + hikariBairitsu) / 100);
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);

				CS.wActiveHitNum = 3;
				n_Delay[7] = 500;

				break;

			case  SKILL_ID_SAKUGETSU_KYAKU:

				CS.wbairitu = 1650 + 50 * n_A_ActiveSkillLV;

				CS.wCast = 500 + 250 * n_A_ActiveSkillLV;
				n_Delay[7] = 500;

				break;

			case  SKILL_ID_MANGETSU_KYAKU:

				var hikariLv = 0;
				var hikariBairitsu = 0;
	/*
				hikariLv = UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI);

				if (hikariLv > 0) {
					hikariBairitsu = 25 + 5 * hikariLv;
				}
	*/
				CS.wbairitu = 500 + 150 * n_A_ActiveSkillLV;
				CS.wbairitu = Math.floor(CS.wbairitu * (100 + hikariBairitsu) / 100);
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);

				CS.wCast = 100 * n_A_ActiveSkillLV;
				CS.n_KoteiCast = 100 * n_A_ActiveSkillLV;

				break;

			case  SKILL_ID_SENKO_KYAKU:

				CS.wbairitu = 100;

				n_Delay[7] = 3500 - 500 * n_A_ActiveSkillLV;

				break;

			case SKILL_ID_SHINSE_BAKUHATSU:


				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					CS.wbairitu = 750 + 750 * n_A_ActiveSkillLV;
					break;

				default:
					CS.wbairitu = 500 + 500 * n_A_ActiveSkillLV;
					break;
				}

				CS.n_KoteiCast = 500;
				n_Delay[7] = 2000;

				if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
					n_Delay[7] = 0;
				}

				break;

			case SKILL_ID_SEITE_KORIN:

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					CS.wbairitu = 2250 + 750 * n_A_ActiveSkillLV;
					break;

				default:
					CS.wbairitu = 1500 + 500 * n_A_ActiveSkillLV;
					break;
				}

				CS.wCast = 500 + 500 * n_A_ActiveSkillLV;
				n_Delay[7] = 3000;

				break;

			//----------------------------------------------------------------
			// 計算式を CSkillManager.js へ移動させ head.js をスリム化する対応を進めています
			//----------------------------------------------------------------
			/* ミンストレル・ワンダラー */
			case SKILL_ID_SEVERE_RAINSTORM:	// シビアレインストーム
			case SKILL_ID_SEVERE_RAINSTORM_EX:	// シビアレインストーム
			case SKILL_ID_GREAT_ECHO:	// グレートエコー
			/* クラウン・ジプシー */
			case SKILL_ID_ARRAW_VULKAN:	// アローバルカン
			/* トルバドゥール・トルヴェール */
			case SKILL_ID_ROSE_BLOSSOM:
			case SKILL_ID_RHYTHM_SHOOTING:
			/* バード */
			case SKILL_ID_MUSICAL_STRIKE:	// ミュージカルストライク
			/* ダンサー */
			case SKILL_ID_YAUCHI:	// 矢撃ち
			/* ドラゴンナイト */
			case SKILL_ID_SERVANT_WEAPON:	// サーヴァントウェポン
			case SKILL_ID_HACK_AND_SLASHER:	// ハックアンドスラッシャー
			case SKILL_ID_DRAGONIC_BREATH: // ドラゴニックブレス
			case SKILL_ID_SERVANT_WEAPON_PHANTOM:	// サーヴァントウェポン：ファントム
			case SKILL_ID_STORM_SLASH:	// ストームスラッシュ
			case SKILL_ID_MADNESS_CRUSHER:	// マッドネスクラッシャー
			case SKILL_ID_SERVANT_WEAPON_DEMOLISION:	// サーヴァントウェポン：デモリッション
			case SKILL_ID_DRAGONIC_AURA:	// ドラゴニックオーラ
			case SKILL_ID_DRAGONIC_PIERCE:	// ドラゴニックピアース
			/* シャドウクロス */			
			case SKILL_ID_DANCING_KNIFE:	// ダンシングナイフ
			case SKILL_ID_SAVAGE_IMPACT:	// サベージインパクト
			case SKILL_ID_ETERNAL_SLASH:	// エターナルスラッシュ
			case SKILL_ID_IMPACT_CRATER:	// インパクトクレーター
			case SKILL_ID_SHADOW_STAB:	// シャドウスタブ
			case SKILL_ID_FATAL_SHADOW_CRAW:	// フェイタルシャドウクロー
			case SKILL_ID_CROSS_SLASH: // クロススラッシュ
			/*カーディナル */
			case SKILL_ID_EFIRIGO:	// エフィリゴ
			case SKILL_ID_PETITIO: 	// ペティティオ
			/* ウィンドホーク */
			case SKILL_ID_HAWK_RUSH:	// ホークラッシュ
			case SKILL_ID_HAWK_BOOMERANG: // ホークブーメラン
			case SKILL_ID_GALE_STORM:	// ゲイルストーム
			case SKILL_ID_DEEP_BLIND_TRAP:	// ディープブラインドトラップ
			case SKILL_ID_SOLID_TRAP:	// ソリッドトラップ
			case SKILL_ID_SWIFT_TRAP:	// スイフトトラップ
			case SKILL_ID_FLAME_TRAP:	// フレイムトラップ
			case SKILL_ID_CRESSIVE_VOLT:	// クレッシブボルト
			case SKILL_ID_WILD_WALK: // ワイルドウォーク
			/* マイスター */
			case SKILL_ID_AXE_STOMP:	// アックスストンプ
			case SKILL_ID_RUSH_QUAKE:	// ラッシュクエイク
			case SKILL_ID_SPARK_BLASTER:	// スパークブラスター
			case SKILL_ID_TRIPLE_LASER:	// トリプルレーザー
			case SKILL_ID_MIGHTY_SMASH:	// マイティスマッシュ
			case SKILL_ID_KOGEKI_SOCHI_YUKOKA:	// 攻撃装置有効化
			case SKILL_ID_RUSH_STRIKE: // ラッシュストライク
			case SKILL_ID_POWERFUL_SWING: // パワフルスイング
			case SKILL_ID_ENERGY_CANNONADE: // エナジーキャノネード
			/* インペリアルガード */
			case SKILL_ID_GRAND_JUDGEMENT:	// グランドジャッジメント
			case SKILL_ID_SHIELD_SHOOTING:	// シールドシューティング
			case SKILL_ID_OVER_SLASH:	// オーバースラッシュ
			case SKILL_ID_RADIANT_SPEAR: // レイディアントスピア
			case SKILL_ID_IMPERIAL_CROSS: // 
			/* アビスチェイサー */
			case SKILL_ID_ABYSS_DAGGER:	// アビスダガー
			case SKILL_ID_UNLUCKY_RUSH:	// アンラッキーラッシュ
			case SKILL_ID_DEFT_STAB:	// デフトスタブ
			case SKILL_ID_FLANGE_SHOT:	// フレンジショット
			case SKILL_ID_CHAIN_REACTION_SHOT:	// チェーンリアクションショット
			case SKILL_ID_HIT_AND_SLIDING: // 
			case SKILL_ID_CHASING_BREAK: // 
			case SKILL_ID_CHASING_SHOT: // 
			/* インクイジター */
			case SKILL_ID_SEYU_SENRE:	// 聖油洗礼
			case SKILL_ID_DAIICHIGEKI_RAKUIN:	// 第一撃：烙印
			case SKILL_ID_DAINIGEKI_SHINNEN:	// 第二撃：信念
			case SKILL_ID_DAISANGEKI_DANZAI:	// 第三撃：断罪
			case SKILL_ID_DAINIGEKI_SHINPAN:	// 第二撃：審判
			case SKILL_ID_DAISANGEKI_ZYOKA:	// 第三撃：浄化
			case SKILL_ID_DAINIGEKI_METSUMANO_HI:	// 第二撃：滅魔の火
			case SKILL_ID_DAISANGEKI_MEKKAGEKI:	// 第三撃：滅火撃
			case SKILL_ID_BAKKA_SHINDAN:	// 爆火神弾
			case SKILL_ID_ENKA_METSUMA_SHINDAN:	// 炎火滅魔神弾
			case SKILL_ID_BLAZING_FLAME_BLAST: // 烈火気弾
			/* ナイトウォッチ */
			case SKILL_ID_WILD_SHOT: // ワイルドショット
			case SKILL_ID_MIDNIGHT_FALLEN: // ミッドナイトフォーリン
			case SKILL_ID_ONLY_ONE_BULLET: // オンリーワンバレット
			case SKILL_ID_WILD_FIRE: // ワイルドファイア
			case SKILL_ID_BASIC_GRENADE: // ベーシックグレネード
			case SKILL_ID_HASTY_FIRE_IN_THE_HOLE: // ヘイスティファイアインザホール
			case SKILL_ID_GRENADES_DROPPING: // グレネーズドロッピング
			case SKILL_ID_MISSION_BOMBARD: // ミッションボンバード
			/* 天帝 */
			case SKILL_ID_SKY_SUN: // 天気身陽
			case SKILL_ID_SKY_MOON: // 天気身月
			case SKILL_ID_STAR_LIGHT_KICK: // 天星の行
			case SKILL_ID_TENCHI_ICHIYO:
			case SKILL_ID_TENCHI_ICHIGETSU:
			case SKILL_ID_TAITEN_ICHIGETSU:
			case SKILL_ID_TENGETSU:
			case SKILL_ID_TENME_RAKUSE:
			case SKILL_ID_TENSE:
			/* スピリットハンドラー */
			case SKILL_ID_TIGER_SLASH:
			case SKILL_ID_CHUL_HO_BATTERING: // タイガーバトリング
			/** バイオロ */
			case SKILL_ID_EXPLOSIVE_POWDER: // 
			case SKILL_ID_MYSTERY_POWDER: // 
			case SKILL_ID_DUST_EXPLOSION: // 
			case SKILL_ID_MEYHEMIC_THORNS: // メイヘミックソーンズ
			/** 蜃気楼・不知火 */
			case SKILL_ID_KAGE_GARI:
			case SKILL_ID_KAGE_ISSEN:
			case SKILL_ID_GENJUTSU_KAGE_NUI:
			case SKILL_ID_GENJUTSU_KUNAI:
			case SKILL_ID_KUNAI_WAIKYOKU:
			case SKILL_ID_KUNAI_KAITEN:
			case SKILL_ID_KUNAI_KUSSETSU:
			case SKILL_ID_KAGE_NO_MAI:
			/** ハイパーノービス */
			case SKILL_ID_DOUBLE_BOWLING_BASH:
			case SKILL_ID_MEGA_SONIC_BLOW:
			case SKILL_ID_SHIELD_CHAIN_RUSH:
			case SKILL_ID_SPIRAL_PIERCE_MAX:
			/** アリテア */
			case SKILL_ID_PINION_SHOT:
			case SKILL_ID_QUILL_SPEAR:
			case SKILL_ID_TEMPEST_FLAP:
			case SKILL_ID_PRIMAL_CLAW:
			case SKILL_ID_FERAL_CLAW:
			case SKILL_ID_ALPHA_CLAW:
			case SKILL_ID_FRENZY_FANG:
			case SKILL_ID_SAVAGE_LUNGE:
			/** ドルイド */
			case SKILL_ID_NOMERCY_CLAW:
			case SKILL_ID_CRUEL_BITE:
			case SKILL_ID_HUNGER:
			case SKILL_ID_SHOOTING_FEATHER:
			case SKILL_ID_LOW_FLIGHT:
			case SKILL_ID_FLICKING_TONADO:
			/** カルノス */
			case SKILL_ID_DOUBLE_SLASH:
			case SKILL_ID_CLAW_WAVE:
			case SKILL_ID_CHOP_CHOP:
			case SKILL_ID_NASTY_SLASH:
			case SKILL_ID_SHARPEN_GUST:
			case SKILL_ID_SHARPEN_HAIL:
			case SKILL_ID_TYPHOON_WING:
			case SKILL_ID_FEATHER_SPRINKLE:

				// 属性は BattleCalc999Body() で設定済み。ここで設定しても、
				// 物理の属性倍率は BattleCalc999Body() 内で先に適用されているため間に合わない
				// （BattleCalcSubDamagePhysicalCommon() は ApplyElementRatio を呼ばない）。
				// スキル使用条件の判定
				CS.n_Buki_Muri = !g_skillManager.MatchWeaponCondition(n_A_ActiveSkill, n_A_WeaponType);
				if (CS.n_Buki_Muri) {
					CS.wbairitu = 0;
					break;
				}
				// 詠唱などの情報
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				// ダメージ算出に関する情報
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
				set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
				// ヒット数に関する情報
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV ,charaData, attackMethodConfArray[0], battleCalcInfo.parentSkillId);
				if (n_A_ActiveSkill === SKILL_ID_FLANGE_SHOT) {
					hitCountArray = [1, CS.wHITsuu, 3];
				}
				// 地面設置スキルの情報
				set_g_bDefinedDamageIntervals(g_skillManager.IsGroundInstallation(n_A_ActiveSkill, attackMethodConfArray[0]));
				if (g_bDefinedDamageIntervals) {
					n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);
					n_Delay[6] = g_skillManager.GetLifeTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				}
				break;

			// 「バイオロ」スキル「アシディファイドゾーン」
			// 2024/11/15 初撃のダメージ誤差無しを確認済み
			// 設置ダメージは全く合わないが実用性が薄いので調査優先度は低いと判断しこのまま静観します
			case SKILL_ID_ACIDIFIED_ZONE_MIZU:
			case SKILL_ID_ACIDIFIED_ZONE_CHI:
			case SKILL_ID_ACIDIFIED_ZONE_HI:
			case SKILL_ID_ACIDIFIED_ZONE_KAZE:
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 初段ダメージの場合
				if (attackMethodConfArray[0].GetOptionValue(0) == 0) {
					// 距離属性
					set_n_Enekyori(1);
					// バイオニックファーマシーはダメージ倍率に寄与しない
					// 基本倍率
					CS.wbairitu = 2000 + 200 * n_A_ActiveSkillLV;
					// リサーチレポートの状態
					let research_report = (UsedSkillSearch(SKILL_ID_RESEARCH_REPORT) > 0);
					let effective_race = [RACE_ID_SOLID, RACE_ID_PLANT].includes(mobData[MONSTER_DATA_INDEX_RACE]);
					// POW補正
					if (research_report && effective_race) {
						// リサーチレポート種族特攻は POW 補正だけに 1.5 倍率がかかる
						CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW) * 1.5;
					} else {
						// POW補正
						CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
					}
					// リサーチレポート共通補正は全体に 1.5 倍率がかかる
					if (research_report) {
						CS.wbairitu *= 1.5;
					}
					// BaseLv補正
					CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
					// ヒット数
					CS.wHITsuu = 3;
				}
				// 設置ダメージの場合
				// 2024/11/15 YEサーバー実測と全く合わないことを確認済み
				// POW補正とBaseLv補正をそれぞれON/OFF組み合わせても合わない
				else {
					set_g_bDefinedDamageIntervals(true);
					// ダメージ間隔
					n_Delay[5] = 1000;
					// オブジェクト存続時間
					n_Delay[6] = 10000;
					// 距離属性
					set_n_Enekyori(0);
					// 基本倍率
					CS.wbairitu = Math.floor(62.5 * n_A_ActiveSkillLV);
					// POW補正
					//wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
					// ベースレベル補正
					CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				}
				break;

			// 「天帝」スキル「太天一陽」
			// 2024/11/11 もなこさん提供データに対して誤差なしを確認
			case SKILL_ID_TAITEN_ICHIYO: {
				// 日出、正午、天気の身状態でのみ使用可能
				const state_hinode = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 1);
				const state_shougo = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2);
				const state_tenki_no_mi = (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1);
				if (!state_hinode && !state_shougo && !state_tenki_no_mi) {
					CS.wbairitu = 0;
					CS.n_Buki_Muri = true;
					break;
				}
				// 距離属性
				set_n_Enekyori(0);
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				CS.wbairitu = 1125 + 175 * n_A_ActiveSkillLV;
				// POW補正
				CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				CS.wbairitu += 5 * n_A_ActiveSkillLV * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// 正午 or 天気の身 のときだけクリが乗る仕様は CSkillManager.js 側で対処済み
				// 分割ヒット
				CS.wActiveHitNum = 2;
				break;
			}
			// 「天帝」スキル「天陽」
			// 2024/11/11 もなこさん提供データに対して誤差なしを確認
			case SKILL_ID_TENYO: {
				// 正午、日没、天気の身状態でのみ使用可能
				const state_shougo = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2);
				const state_nichibotsu = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 3);
				const state_tenki_no_mi = (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1)
				if (!state_shougo && !state_nichibotsu && !state_tenki_no_mi) {
					CS.wbairitu = 0;
					CS.n_Buki_Muri = true;
					break;
				}
				// 距離属性
				set_n_Enekyori(0);
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				CS.wbairitu = 1575 + 225 * n_A_ActiveSkillLV;
				// POW補正
				CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				CS.wbairitu += 5 * n_A_ActiveSkillLV * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// 日没 or 天気の身 のときだけクリが乗る仕様は CSkillManager.js 側で対処済み
				// 分割ヒット
				CS.wActiveHitNum = 2;
				break;
			}

			// 「天帝」スキル「天地万星」
			case SKILL_ID_TENCHI_BANSE:
				// 距離属性
				set_n_Enekyori(0);
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置スキル
				set_g_bDefinedDamageIntervals(true);
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// ダメージ間隔
				n_Delay[5] = 300;
				// 基本倍率
				CS.wbairitu = 250 + (100 * n_A_ActiveSkillLV);
				// POW補正
				CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// 天気修練 補正
				CS.wbairitu += 3 * n_A_ActiveSkillLV * Math.max(LearnedSkillSearch(SKILL_ID_TENKI_SHUREN), UsedSkillSearch(SKILL_ID_TENKI_SHUREN));
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// 分割ヒット
				CS.wActiveHitNum = 3;
				break;

			// 「天帝」スキル「天羅万象」
			case SKILL_ID_TENRA_BANSHO:
				// 距離属性
				set_n_Enekyori(0);
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				CS.wbairitu = 300 * n_A_ActiveSkillLV;
				// POW補正
				CS.wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// 悪魔・人間(プレイヤーを除く)形では、３回ヒット
				CS.wHITsuu = 1;
				switch (parseInt(mobData[MONSTER_DATA_INDEX_RACE], 10)) {
					case RACE_ID_HUMAN:
						if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
							break;
						}
					case RACE_ID_DEMON:
						CS.wHITsuu = 3;
						break;
				}
				break;

			// 「ナイトウォッチ」スキル「スパイラルシューティング」
			// 2025/01/25 もなこさん提供データに対して誤差なしを確認
			case SKILL_ID_SPIRAL_SHOOTING:
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 使用武器制限
				if (n_A_WeaponType != ITEM_KIND_GRENADEGUN && n_A_WeaponType != ITEM_KIND_RIFLE) {
					CS.n_Buki_Muri = true
					CS.wbairitu = 0;
					break;
				}
				// 遠距離属性
				set_n_Enekyori(1);
				if (n_A_WeaponType == ITEM_KIND_GRENADEGUN) {
					CS.wbairitu = 1700 + 300 * n_A_ActiveSkillLV;
					bCri = false;	// クリティカルしない
					CS.wHITsuu = 2;	// 2ヒットする
				}
				else if (n_A_WeaponType == ITEM_KIND_RIFLE) {
					CS.wbairitu = 1950 + 350 * n_A_ActiveSkillLV;
				}
				// CON補正
				CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// 照準カウンター補正
				CS.option_count = attackMethodConfArray[0].GetOptionValue(0);
				CS.wbairitu += CS.option_count * (550 + 100 * n_A_ActiveSkillLV);
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			// 「ナイトウォッチ」スキル「マガジンフォーワン」
			// 2025/01/25 もなこさん提供データに対して誤差なしを確認
			case SKILL_ID_MAGAZIN_FOR_ONE:
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 使用武器制限
				if (n_A_WeaponType != ITEM_KIND_HANDGUN && n_A_WeaponType != ITEM_KIND_GATLINGGUN) {
					CS.n_Buki_Muri = true
					CS.wbairitu = 0;
					break;
				}
				// 遠距離属性
				set_n_Enekyori(1);
				if (n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
					CS.wbairitu = 430 + 90 * n_A_ActiveSkillLV;
					bCri = false;	// クリティカルしない
					CS.wHITsuu = 10;	// 10ヒットする
				}
				else if (n_A_WeaponType == ITEM_KIND_HANDGUN) {
					CS.wbairitu = 500 + 50 * n_A_ActiveSkillLV;
					CS.wHITsuu = 6;	// 6ヒットする
				}
				// CON補正
				CS.wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// 照準カウンター補正
				CS.option_count = attackMethodConfArray[0].GetOptionValue(0);
				CS.wbairitu += CS.option_count * (125 + 25 * n_A_ActiveSkillLV);
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			//「ナイトウォッチ」スキル「ビジラントアットナイト」
			// 2025/01/25 もなこさん提供データに対して誤差なしを確認
			case SKILL_ID_VIGILANT_AT_NIGHT:
				// 使用武器制限
				if (n_A_WeaponType != ITEM_KIND_SHOTGUN && n_A_WeaponType != ITEM_KIND_GATLINGGUN) {
					CS.n_Buki_Muri = true
					CS.wbairitu = 0;
					break;
				}
				// 詠唱時間など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 遠距離属性
				set_n_Enekyori(1);
				// 照準カウンター
				CS.option_count = attackMethodConfArray[0].GetOptionValue(0);
				if (n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
					CS.wHITsuu = 7;	// 7ヒットする
					// 基本倍率
					CS.wbairitu = 375 + 85 * n_A_ActiveSkillLV;
					// 照準カウンター補正
					CS.wbairitu += CS.option_count * (125 + 25 * n_A_ActiveSkillLV);
					// CON補正
					CS.wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				}
				else if (n_A_WeaponType == ITEM_KIND_SHOTGUN) {
					CS.wHITsuu = 4;	// 4ヒットする
					// 基本倍率
					CS.wbairitu = 700 + 150 * n_A_ActiveSkillLV;
					// 照準カウンター補正
					CS.wbairitu += CS.option_count * (250 + 50 * n_A_ActiveSkillLV);
					// CON補正
					CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				}
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			/*
				「スピリットハンドラー」スキル「タイガーハウリング」
			*/
			case SKILL_ID_TIGER_HOWLING:
				// 詠唱など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 遠距離属性
				set_n_Enekyori(1);
				if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 
					|| UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0
					|| LearnedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0
					) {
					// 基礎倍率
					CS.wbairitu = 2400 + 300 * n_A_ActiveSkillLV;
					CS.wbairitu += 100 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				} else {
					// 基礎倍率
					CS.wbairitu = 1600 + 200 * n_A_ActiveSkillLV;
					CS.wbairitu += 50 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				}
				// POW補正
				CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// スキル説明にないが3分割スキル
				CS.wActiveHitNum = 3;
				break;

			/*
				「スピリットハンドラー」スキル「タイガーストライク」
			*/
			case SKILL_ID_TIGER_STRIKE:
				// 詠唱など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 遠距離属性
				set_n_Enekyori(1);
				// ３ヒット
				CS.wHITsuu = 3;
				if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 
					|| UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0
					|| LearnedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0
					) {
					// 基礎倍率
					CS.wbairitu = 450 + (150 * n_A_ActiveSkillLV);
					CS.wbairitu += 20 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				} else {
					// 基礎倍率
					CS.wbairitu = 300 + (100 * n_A_ActiveSkillLV);
					CS.wbairitu += 10 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				}
				// POW補正
				CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				break;

			// 「蜃気楼　不知火」スキル「風魔手裏剣 -掌握-」
			// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
			case SKILL_ID_FUMASHURIKEN_SHOUAKU: {
				set_n_Enekyori(1);			// 遠距離フラグ
				// 詠唱など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = 250;		// ダメージ間隔
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);		// オブジェクト存続時間
				// 風魔手裏剣 -構築-の習得Lv
				const fumashuriken_kouchiku_lv = Math.max(LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_KOUCHIKU), attackMethodConfArray[0].GetOptionValue(0));
				// ダメージ倍率
				CS.wbairitu = 50 * n_A_ActiveSkillLV;										// 基礎倍率
				CS.wbairitu += 5 * n_A_ActiveSkillLV * fumashuriken_kouchiku_lv;			// 習得済みスキル条件
				CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);					// 特性ステータス補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);						// BaseLv補正
				break;
			}
			//「蜃気楼　不知火」スキル「風魔手裏剣 -構築-」
			// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
			case SKILL_ID_FUMASHURIKEN_KOUCHIKU: {
				set_n_Enekyori(1);			// 遠距離フラグ
				// 詠唱など
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 風魔手裏剣 -掌握-の習得Lv
				const fumashuriken_shouaku_lv = Math.max(LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_SHOUAKU), attackMethodConfArray[0].GetOptionValue(1));
				// 基礎倍率
				if (battleCalcInfo.parentSkillId === undefined) {
					CS.wbairitu = 3800 + 100 * n_A_ActiveSkillLV;						// 初撃 ダメージ倍率
				} else {
					CS.wbairitu = 10500 + 200 * n_A_ActiveSkillLV;						// 追撃 ダメージ倍率
				}
				CS.wbairitu += 48 * n_A_ActiveSkillLV * fumashuriken_shouaku_lv;		// 習得済みスキル条件
				CS.wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);				// 特性ステータス補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);					// BaseLv補正
				break;
			}

			// 「アルケミスト」スキル「デモンストレーション」
			case SKILL_ID_DEMONSTRATION:
				// 必中
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置スキル設定
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = 500;								// ダメージ間隔
				n_Delay[6] = 35000 + 5000 * n_A_ActiveSkillLV;	// オブジェクト存続時間
				n_Delay[3] = n_Delay[6]; 						// 足元置きができないので重複設置はできない
				// 属性
				set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
				// ダメージ倍率
				CS.wbairitu = 100 + 20 * n_A_ActiveSkillLV;
				break;

			// 「星帝」スキル「創星の書」
			case SKILL_ID_SOSENO_SHO:
				set_n_Enekyori(1);
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置スキル設定
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = 500;			// ダメージ間隔
				n_Delay[6] = 10000;			// オブジェクト存続時間
				n_Delay[3] = n_Delay[6]; 	// 重複設置はできない
				// 属性
				set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
				// ダメージ倍率
				if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM) {
					CS.wbairitu = 750 + 750 * n_A_ActiveSkillLV;
				} else {
					CS.wbairitu = 500 + 500 * n_A_ActiveSkillLV;
				}
				break;

			// 「蜃気楼　不知火」スキル「影潜り」
			// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
			case SKILL_ID_KAGEMOGURI:
				// 詠唱時間等
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 属性
				set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId));
				// ダメージ倍率
				CS.wbairitu = 2500 + 500 * n_A_ActiveSkillLV;											// 基本倍率
				CS.wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);								// 特性ステータス補正
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);									// BaseLv補正
				// 分割ヒット
				CS.wActiveHitNum = 2;
				break;

			// 「星帝」スキル「流星落下」
			/**
			 *  オートスペルですが何故かアクティブスキルとして登録されています
			 *  いずれアクティブスキル配列から削除したいと考えています
			 */
			case SKILL_ID_RYUSE_RAKKA:
			case SKILL_ID_RYUSE_RAKKA_TSUIGEKI:
				// 基礎倍率
				CS.wbairitu = 100 + 100 * n_A_ActiveSkillLV;
				CS.wbairitu = Math.floor(CS.wbairitu * n_A_BaseLV / 100);
				// 分割ヒット数
				if (n_A_ActiveSkill == SKILL_ID_RYUSE_RAKKA && battleCalcInfo.parentSkillId === undefined) {
					CS.wActiveHitNum = 2;
				} else {
					CS.wActiveHitNum = 3;
				}
				break;

	/* --------------------------------------------------
	↑ 物理攻撃スキル追加位置
	-------------------------------------------------- */

			default:
				bDefaultFormula = false;
				break;

		}
		// 基本式でない場合は別の処理へ
		if (!bDefaultFormula) {
			return undefined;
		}

		//----------------------------------------------------------------
		//
		// ダメージ計算（物理基本式）
		//
		//----------------------------------------------------------------

		//--------------------------------
		// スキルダメージ倍率の補正を計算
		//--------------------------------
		CS.wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
		CS.wbairitu = ATKbaiJYOUSAN(CS.wbairitu);

		//--------------------------------
		// 参照するＡＴＫを特定
		//--------------------------------
		switch (n_A_ActiveSkill) {

		case SKILL_ID_WUG_BITE:
		case SKILL_ID_WUG_STRIKE:
		case SKILL_ID_WUG_DASH:
			dmgUnit = CS.BK_n_A_DMG_Wolf;
			break;

		case SKILL_ID_TUZYO_KOGEKI_CALC_LEFT:
		default:
			// 変更なし（dmgUnitのまま）
			break;
		}

		//--------------------------------
		// ヒット数配列を用意
		//--------------------------------
		if (!hitCountArray) {
			hitCountArray = [CS.wHITsuu, CS.wHITsuu, CS.wHITsuu];
		}
		CS.g_wHITsuu_Array = hitCountArray.slice();

		//--------------------------------
		// ダメージ計算本体
		//--------------------------------
		// 通常ダメージ計算
		ret = BattleCalcSubDamagePhysicalCommon(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, n_A_ActiveSkill, dmgUnit, CS.wbairitu, CS.g_wHITsuu_Array, CS.wActiveHitNum, bCri, bLeft);
		// 暫定互換性対応
		set_w_DMG(ret[0].slice());
		CS.n_PerfectHIT_DMG = ret[1];

		//--------------------------------
		// オートスペルのダメージ計算処理中の場合は、処理打ち切り
		//--------------------------------

		if (CS.n_AS_MODE) {
			return w_DMG;
		}

/*
	★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	★
	★ TODO: 下記の命中率を加味する処理、表示上の変数にとどめておくべき？
	★		→AS_PLUS() の中で参照されていないか？
	★
	★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

*/

/*
		//--------------------------------
		// 平均ダメージに命中率を適用する
		//--------------------------------
		w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100 - w_HIT)) / 100;

		// ↑おそらく、別の場所で処理可能


		//--------------------------------
		// オートスペルの発動を適用
		//--------------------------------
		AS_PLUS();


		// ↑の AS_PLUS() は、単純にオートスペルのダメージを足しているだけ。
		// 特殊な処理もなく、グローバル空間にダメージデータの変数を持っているので、別の場所で処理可能
*/

		// 処理終了
		return w_DMG;
}
