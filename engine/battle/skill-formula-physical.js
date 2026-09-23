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
import { CSkillData } from "../skill/CSkillManager.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from "../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_SHIELD } from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_POWER, ITEM_DATA_INDEX_WEIGHT } from "../const/EnumItemDataIndex.js";
import {
    ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_KNIFE, ITEM_KIND_RIFLE,
    ITEM_KIND_SHOTGUN
} from "../const/EnumItemKind.js";
import { ITEM_SP_ELEMENTAL } from "../const/EnumItemSpId.js";
import { JOB_ID_GILOTINCROSS } from "../const/EnumJobId.js";
import { MIG_PARAM_ID_CON } from "../const/EnumMigItemParamId.js";
import { MONSTER_BOSSTYPE_BOSS } from "../const/EnumMonsterBossType.js";
import { MONSTER_DATA_INDEX_ID, MONSTER_DATA_INDEX_RACE } from "../const/EnumMonsterDataIndex.js";
import { RACE_ID_DEMON, RACE_ID_HUMAN } from "../const/EnumRaceId.js";
import { GetEquippedTotalSPArrow, ROUNDDOWN } from "../bridge/stallcalc-bridge.js";
import { ItemObjNew } from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI, MOB_CONF_DEBUF_ID_TARONO_KIZU, n_B_IJYOU
} from "../monster/mobconfdebuf.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from "../monster/mobconfplayer.js";
import { MONSTER_ID_PLAYER } from "../monster/monster.dat.js";
import {
    n_A_AGI, n_A_DEX, n_A_Equip, n_A_JOB, n_A_JobLV, n_A_STR, n_A_VIT, n_A_WeaponLV, n_A_WeaponType,
    n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ABYSS_DAGGER, SKILL_ID_ABYSS_DAGGER_STATE, SKILL_ID_ACIDIFIED_ZONE_CHI,
    SKILL_ID_ACIDIFIED_ZONE_HI, SKILL_ID_ACIDIFIED_ZONE_KAZE, SKILL_ID_ACIDIFIED_ZONE_MIZU, SKILL_ID_ALPHA_CLAW,
    SKILL_ID_APUCHAORURIGI, SKILL_ID_ARRAW_VULKAN, SKILL_ID_ARROW_SHOWER, SKILL_ID_ARROW_STORM,
    SKILL_ID_AXE_BOOMERANG, SKILL_ID_AXE_STOMP, SKILL_ID_AXE_TORNADE, SKILL_ID_BACK_STAB, SKILL_ID_BAKKA_SHINDAN,
    SKILL_ID_BAKKISANDAN, SKILL_ID_BANISHING_POINT, SKILL_ID_BASH, SKILL_ID_BASIC_GRENADE,
    SKILL_ID_BIND_TRAP, SKILL_ID_BLAZING_FLAME_BLAST, SKILL_ID_BOOST_KNUCKLE, SKILL_ID_BRANDISH_SPEAR,
    SKILL_ID_BUKKOKEN, SKILL_ID_BULLS_EYE, SKILL_ID_BUNISHING_BASTER, SKILL_ID_CANNON_SPEAR, SKILL_ID_CARROT_BEAT,
    SKILL_ID_CART_TERMINATION, SKILL_ID_CART_TORNADO, SKILL_ID_CHAIN_REACTION_SHOT,
    SKILL_ID_CHARGE_ARROW, SKILL_ID_CHARGE_ATTACK, SKILL_ID_CHASING_BREAK, SKILL_ID_CHASING_SHOT,
    SKILL_ID_CHIMEITEKINA_KIZU, SKILL_ID_CHOP_CHOP, SKILL_ID_CHUL_HO_BATTERING, SKILL_ID_CLAW_WAVE,
    SKILL_ID_CLUSTER_BOMB, SKILL_ID_COLD_THROWER, SKILL_ID_COMBO_SORYUKYAKU, SKILL_ID_COUNTER_SLASH,
    SKILL_ID_CRESSIVE_VOLT, SKILL_ID_CROSS_IMPACT, SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_CROSS_SLASH,
    SKILL_ID_CRUEL_BITE, SKILL_ID_CRUSH_STRIKE, SKILL_ID_DAIICHIGEKI_RAKUIN, SKILL_ID_DAINIGEKI_METSUMANO_HI,
    SKILL_ID_DAINIGEKI_SHINNEN, SKILL_ID_DAINIGEKI_SHINPAN, SKILL_ID_DAISANGEKI_DANZAI,
    SKILL_ID_DAISANGEKI_MEKKAGEKI, SKILL_ID_DAISANGEKI_ZYOKA, SKILL_ID_DAITENHOSUI, SKILL_ID_DANCING_KNIFE,
    SKILL_ID_DARK_CRAW, SKILL_ID_DARK_CROSS, SKILL_ID_DARK_ILLUSION, SKILL_ID_DEEP_BLIND_TRAP,
    SKILL_ID_DEFT_STAB, SKILL_ID_DEMONSTRATION, SKILL_ID_DISARM, SKILL_ID_DOUBLE_BOWLING_BASH, SKILL_ID_DOUBLE_SLASH,
    SKILL_ID_DRAGONIC_AURA, SKILL_ID_DRAGONIC_BREATH, SKILL_ID_DRAGONIC_PIERCE, SKILL_ID_DRAGON_TAIL, SKILL_ID_DUST,
    SKILL_ID_DUST_EXPLOSION, SKILL_ID_EARTH_DRIVE, SKILL_ID_EFIRIGO, SKILL_ID_EIBINNA_KYUKAKU,
    SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_ENERGY_CANNONADE, SKILL_ID_ENKA_METSUMA_SHINDAN, SKILL_ID_ETERNAL_SLASH,
    SKILL_ID_EXCEED_BREAK, SKILL_ID_EXPLOSIVE_POWDER, SKILL_ID_FAINT_BOMB, SKILL_ID_FANTASMIC_ARROW,
    SKILL_ID_FATAL_MENUS, SKILL_ID_FATAL_SHADOW_CRAW, SKILL_ID_FEATHER_SPRINKLE, SKILL_ID_FEORICHAGI,
    SKILL_ID_FERAL_CLAW, SKILL_ID_FIRE_DANCE, SKILL_ID_FIRE_RAIN, SKILL_ID_FIRING_TRAP, SKILL_ID_FLAME_THROWER,
    SKILL_ID_FLAME_TRAP, SKILL_ID_FLANGE_SHOT, SKILL_ID_FLICKING_TONADO, SKILL_ID_FREEZING_TRAP,
    SKILL_ID_FRENZY_FANG, SKILL_ID_FULL_BASTER, SKILL_ID_FUMASHURIKEN_KOUCHIKU,
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
    SKILL_ID_RHYTHM_SHOOTING, SKILL_ID_ROLLING_CUTTER, SKILL_ID_ROSE_BLOSSOM,
    SKILL_ID_RUSH_QUAKE, SKILL_ID_RUSH_STRIKE, SKILL_ID_RYUSE_RAKKA,
    SKILL_ID_RYUSE_RAKKA_TSUIGEKI, SKILL_ID_SAKUGETSU_KYAKU, SKILL_ID_SANDANSHO, SKILL_ID_SANREI_ITTAI,
    SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SAVAGE_IMPACT, SKILL_ID_SAVAGE_LUNGE, SKILL_ID_SEIMEINO_TAMASHI,
    SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP, SKILL_ID_SEITE_KORIN, SKILL_ID_SENKO_KYAKU, SKILL_ID_SENKO_RENGEKI,
    SKILL_ID_SENPUTAI, SKILL_ID_SERVANT_WEAPON, SKILL_ID_SERVANT_WEAPON_DEMOLISION,
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
    SKILL_ID_TENKETSU_MOKU, SKILL_ID_TENKINO_MI, SKILL_ID_TENME_RAKUSE, SKILL_ID_TENRACHIMO,
    SKILL_ID_TENRA_BANSHO, SKILL_ID_TENSE, SKILL_ID_TENYO, SKILL_ID_TIGER_HOWLING, SKILL_ID_TIGER_SLASH,
    SKILL_ID_TIGER_STRIKE, SKILL_ID_TOMAHAWKNAGE, SKILL_ID_TORURYOCHAGI, SKILL_ID_TRACKING,
    SKILL_ID_TRIANGLE_SHOT, SKILL_ID_TRIPLE_LASER, SKILL_ID_TUZYO_KOGEKI_CALC_LEFT, SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT,
    SKILL_ID_TYPHOON_WING, SKILL_ID_UNKONO_ZYOTAI, SKILL_ID_UNLUCKY_RUSH, SKILL_ID_UNTIMATERIAL_BLAST,
    SKILL_ID_VAMPIRE_GIFT, SKILL_ID_VENOM_KNIFE, SKILL_ID_VENOM_PRESSURE, SKILL_ID_VIGILANT_AT_NIGHT,
    SKILL_ID_VULCAN_ARM, SKILL_ID_WILD_FIRE, SKILL_ID_WILD_SHOT, SKILL_ID_WILD_WALK, SKILL_ID_WIND_CUTTER,
    SKILL_ID_WUG_BITE, SKILL_ID_WUG_DASH, SKILL_ID_WUG_STRIKE, SKILL_ID_YARI_SHUREN, SKILL_ID_YAUCHI,
    SKILL_ID_YOMIGAESHI, SKILL_ID_ZIRAISHIN
} from "../skill/skill.dat.js";
import {
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51,
    SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81
} from "../skill/skill.h.js";
import { MIG_JOB_ID_SHADOW_CROSS } from "../data/mig.job.dat.js";
import { GetJobLevelMax } from "../data/mig.job.h.js";
import { g_skillManager } from "../runtime/global.js";
import { ATKbaiJYOUSAN, BattleCalcSubDamagePhysicalCommon, GetBattlerAtkPercentUp } from "../bridge/battlecalc-bridge.js";
import { GetAttackMethodOptionValue } from "./attack-method-option.js";
import { CS } from "./calc-state.js";
import { CreateSkillFormulaEnv } from "./skill-formula-env.js";
import {
    g_bDefinedDamageIntervals, n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, n_SiegeMode,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, set_w_DMG, w_DMG
} from "../runtime/ro4-state.js";
import { UsedSkillSearch } from "../skill/skillstate.js";
import { n_A_WeaponZokusei } from "../runtime/roro-state.js";

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

			// 従来からある分

			case SKILL_ID_TRACKING:
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_CAST_KOTEI) CS.cast_kotei = true;
				set_n_Enekyori(1);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.w_HIT = CS.w_HIT * 5 +5;
				if(CS.w_HIT > 100) CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = CS.w_HIT;
				break;

			// 「メカニック」スキル「アックストルネード」

			// 「メカニック」スキル「パワースイング」

			// 「メカニック」スキル「ブーストナックル」

			// 「メカニック」スキル「バルカンアーム」

			// 「ロイヤルガード」スキル「キャノンスピア」

			// 「ロイヤルガード」スキル「バニシングポイント」

			// 「シャドウチェイサー」スキル「フェイタルメナス」

			// 「ジェネティック」スキル「カートトルネード」

			// 「ジェネティック」スキル「スポアエクスプロージョン」
			// 2024/11/16 YEサーバー実測との誤差 +1 ～ -8 を確認
			// 計算式自体は合っていると判断

			// 「アークビショップ」スキル「グレイアムライト」

			case SKILL_ID_FUMASHURIKEN_RANKA: {	// 風魔手裏剣 -乱華-
				set_n_Enekyori(1);
				CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				if(!CS.n_AS_MODE && n_A_WeaponType != 16) CS.n_Buki_Muri = true;
				break;
			}

			case SKILL_ID_FIRE_DANCE: {	// ファイヤーダンス
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				set_n_Enekyori(1);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				break;
			}

			case SKILL_ID_BIND_TRAP:
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				set_n_Enekyori(1);
				CS.wCast = "不明";
				n_Delay[0] = 2000;
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
				n_Delay[5] = g_skillManager.GetDamageInterval(battleCalcInfo.skillId, battleCalcInfo.skillLv);		// ダメージ間隔
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);		// オブジェクト存続時間
				// ダメージ倍率
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
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
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
				break;
			}

			// 「蜃気楼　不知火」スキル「影潜り」
			// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ

	/* --------------------------------------------------
	↑ 物理攻撃スキル追加位置
	-------------------------------------------------- */

			default:
				// engine/skill/<職業>/*.js の PhysicalFormula slot へ移行済みのスキルはそちらを呼ぶ
				// （呼び出し後は break して、後続の共通物理ダメージ計算をそのまま通す）
				if (g_skillManager.HasPhysicalFormula(n_A_ActiveSkill)) {
					g_skillManager.ApplyPhysicalFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
					break;
				}
				// engine/skill/<職業>/*.js の Power 等の slot へ移行済みのスキルはここで汎用計算式を適用する
				if (!g_skillManager.IsGenericFormula(n_A_ActiveSkill) || (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_PHYSICAL) !== CSkillData.TYPE_PHYSICAL) {
					bDefaultFormula = false;
					break;
				}

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
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				n_Delay[7] = g_skillManager.GetCoolTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
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
				// 100%ヒット・特殊な戦闘時間区分・強制ディレイの情報
				if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_100HIT) {
					CS.w_HIT = 100;
					CS.w_HIT_HYOUJI = 100;
				}
				if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_IRREGULAR_BATTLE_TIME) {
					n_Delay[0] = 1;
				} else if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_UNKNOWN_DELAY_TIME) {
					n_Delay[0] = 2;
				}
				if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_CAST_KOTEI) {
					CS.cast_kotei = true;
				}
				// モーションディレイの強制上書き（未オーバーライドなら null なので ASPD 由来の既定値を維持する）
				var delayForceMotion = g_skillManager.GetDelayTimeForceMotion(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				if (delayForceMotion !== null) {
					n_Delay[1] = delayForceMotion;
				}
				n_Delay[3] = g_skillManager.GetDelayTimeSkillTiming(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
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
		ret = BattleCalcSubDamagePhysicalCommon(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, n_A_ActiveSkill, dmgUnit, CS.wbairitu, CS.wActiveHitNum, bCri, bLeft);
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
