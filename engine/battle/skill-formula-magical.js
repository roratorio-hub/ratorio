/**
 * BattleCalc999Core「魔法判定スキル」ブロックの分割（Phase 3b）。
 *
 * 物理基本/特殊計算式のいずれにも該当しなかった場合に呼ばれる最後のブロック。
 * 元のコードにも switch に default 節が無く「該当なしなら何もせず w_DMG を
 * そのまま返す」という無条件 return だったため、他の2ブロックと違って
 * undefined センチネルへの変換は不要（バイト単位で完全に不変）。
 */
import { CSkillData } from "../skill/CSkillManager.js";
import {
    ELM_ID_DARK, ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_POISON, ELM_ID_PSYCO, ELM_ID_VANITY, ELM_ID_WATER, ELM_ID_WIND
} from "../const/EnumElmId.js";
import { EQUIP_REGION_ID_SHIELD } from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_SPBEGIN } from "../const/EnumItemDataIndex.js";
import { MIG_PARAM_ID_CON } from "../const/EnumMigItemParamId.js";
import { MONSTER_DATA_INDEX_RACE } from "../const/EnumMonsterDataIndex.js";
import { RACE_ID_DEMON } from "../const/EnumRaceId.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";
import { ItemObjNew } from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    MOB_CONF_DEBUF_ID_SHIRYO_HYOI, MOB_CONF_DEBUF_ID_SOUND_BLEND, MOB_CONF_DEBUF_ID_SUIMIN, n_B_IJYOU
} from "../monster/mobconfdebuf.js";
import { n_A_Equip, n_A_INT, n_A_JobLV, n_A_MATK, n_A_WeaponType } from "../runtime/roro-state.js";
import {
    SERE_SUPPORT_SKILL_ID_CURSED_SOIL, SERE_SUPPORT_SKILL_ID_DEEP_POISONING, SERE_SUPPORT_SKILL_ID_EARTH_CARE,
    SERE_SUPPORT_SKILL_ID_PETROLOGY, SKILL_ID_ABYSS_FLAME, SKILL_ID_ABYSS_SQUARE, SKILL_ID_ADORAMUS,
    SKILL_ID_ALL_BLOOM, SKILL_ID_ANTEN_HOU, SKILL_ID_ANTEN_HOU_LEARNED_LEVEL, SKILL_ID_ARBITRIUM,
    SKILL_ID_AROUND_FLOWER, SKILL_ID_ASTRAL_STRIKE, SKILL_ID_BYAKKO_FU, SKILL_ID_CHILLING_BLAST, SKILL_ID_CLIMAX,
    SKILL_ID_CLOUD_KILL, SKILL_ID_COLD_BOLT, SKILL_ID_COMMET, SKILL_ID_CONFLAGRATION, SKILL_ID_CROSS_RAIN,
    SKILL_ID_CRYMSON_ARROW, SKILL_ID_CRYMSON_ROCK, SKILL_ID_CRYSTAL_IMPACT, SKILL_ID_CUTTING_WIND,
    SKILL_ID_DARK_STRIKE, SKILL_ID_DEADLY_PROJECTION, SKILL_ID_DEER_BREEZE, SKILL_ID_DEER_CANON,
    SKILL_ID_DEMONIC_FIRE, SKILL_ID_DESTRACTIVE_HURRICANE, SKILL_ID_DIAMOND_DUST, SKILL_ID_DIAMOND_STORM,
    SKILL_ID_DIVINUS_FLOS, SKILL_ID_DRAIN_LIFE, SKILL_ID_EARTH_DRILL,
    SKILL_ID_EARTH_FLOWER, SKILL_ID_EARTH_GRAVE, SKILL_ID_EARTH_SPIKE, SKILL_ID_EARTH_STAMP, SKILL_ID_EARTH_STRAIN,
    SKILL_ID_ELECTRIC_WALK, SKILL_ID_ELEMENTAL_BASTER, SKILL_ID_ESFU, SKILL_ID_ESHA, SKILL_ID_ESMA, SKILL_ID_ESPA,
    SKILL_ID_ESTIN, SKILL_ID_ESTON, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_BOLT,
    SKILL_ID_FIRE_WALK, SKILL_ID_FIRE_WALL, SKILL_ID_FLORAL_FLARE_ROAD, SKILL_ID_FROM_THE_ABYSS,
    SKILL_ID_FROST_DIVER, SKILL_ID_FROST_MISTY, SKILL_ID_FROST_NOVA, SKILL_ID_FROST_WEAPON, SKILL_ID_FROZEN_SLASH,
    SKILL_ID_FUKYOWAON,
    SKILL_ID_FURIOS_STORM, SKILL_ID_FUZIN, SKILL_ID_FU_COUNT_OF_FU, SKILL_ID_FU_ELEMENT_OF_FU, SKILL_ID_GENBU_FU,
    SKILL_ID_GENZYUTSU_ANKOKURYUU, SKILL_ID_GLACIER_MONOLITH, SKILL_ID_GLACIER_NOVA, SKILL_ID_GLACIER_SHARD,
    SKILL_ID_GLACIER_STOMP, SKILL_ID_GRAVITY_HOLE, SKILL_ID_GROUND_BLOOM, SKILL_ID_GROUND_GRAVITATION,
    SKILL_ID_HEAVENS_DRIVE, SKILL_ID_HEAVENS_DRIVE_FOR_CLONE, SKILL_ID_HELLS_DRIVE, SKILL_ID_HOLY_LIGHT,
    SKILL_ID_HOLY_LIGHT_TAMASHI, SKILL_ID_HYOSENSO, SKILL_ID_HYUN_ROK_SPIRIT_POWER, SKILL_ID_ICE_CLOUD,
    SKILL_ID_ICE_PILLAR, SKILL_ID_ICE_SPLASH, SKILL_ID_ICE_TOTEM, SKILL_ID_IMPERIAL_PRESSURE,
    SKILL_ID_INUHAKKA_METEOR, SKILL_ID_JACK_FROST, SKILL_ID_JACK_FROST_NOVA, SKILL_ID_JUDEX,
    SKILL_ID_JUDGEMENT_CROSS, SKILL_ID_JUPITER_THUNDER, SKILL_ID_JUPITER_THUNDER_STORM, SKILL_ID_KAENZIN,
    SKILL_ID_KAGETOKI, SKILL_ID_KINNRYUU_HOU, SKILL_ID_KOUENKA, SKILL_ID_LESSON, SKILL_ID_LIGHTNING_BOLT,
    SKILL_ID_LIGHTNING_LAND, SKILL_ID_LIGHTNING_LOADER, SKILL_ID_LORD_OF_VERMILLION, SKILL_ID_MAGNUS_EXORCISMUS,
    SKILL_ID_MATATABI_LANCE, SKILL_ID_METALIC_FURY, SKILL_ID_METALIC_SOUND, SKILL_ID_METEOR_STORM,
    SKILL_ID_METEOR_STORM_BUSTER, SKILL_ID_MIRIAM_LIGHT, SKILL_ID_MYSTERY_ILLUSION, SKILL_ID_NAPALM_VULKAN_STRIKE,
    SKILL_ID_NUMATIC_PROCERA, SKILL_ID_NYANTOMO_KENROKU, SKILL_ID_OMEGA_ABYSS_STRIKE, SKILL_ID_PHREMEN,
    SKILL_ID_POISON_BUSTER, SKILL_ID_PSYCHIC_STREAM, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_RAIDEN_HOU, SKILL_ID_RAIGEKISAI,
    SKILL_ID_RAIN_OF_CRYSTAL, SKILL_ID_RAY_OF_GENESIS, SKILL_ID_REIDO_FU, SKILL_ID_REIKETSU_HOU,
    SKILL_ID_RHYTHMICAL_WAVE, SKILL_ID_ROARING_CHARGE, SKILL_ID_ROARING_PIERCER, SKILL_ID_ROCK_DOWN,
    SKILL_ID_RUWACH, SKILL_ID_RYUENZIN, SKILL_ID_SAKUFU, SKILL_ID_SANREI_ITTAI,
    SKILL_ID_SEIRYU_FU, SKILL_ID_SEISMIC_WEAPON, SKILL_ID_SEKIEN_HOU, SKILL_ID_SERE, SKILL_ID_SERE_SUPPORT_SKILL,
    SKILL_ID_SHIELD_SPELL_LV_2,
    SKILL_ID_SHIHOZIN_FU, SKILL_ID_SHIHO_FU_ZYOTAI, SKILL_ID_SHIHO_GOGYO_ZIN, SKILL_ID_SHINDOZANKYO,
    SKILL_ID_SHIRYO_BAKUHATSU, SKILL_ID_SHIRYO_ZYOKA, SKILL_ID_SIGHT_RASHER, SKILL_ID_SOLID_STOMP,
    SKILL_ID_SOUL_EXPANSION, SKILL_ID_SOUL_STRIKE, SKILL_ID_SOUL_VULKUN_STRIKE, SKILL_ID_SOUND_BLEND,
    SKILL_ID_SPELL_FIST, SKILL_ID_SPIRIT_MASTERY, SKILL_ID_STORM_CANNON, SKILL_ID_STORM_GUST,
    SKILL_ID_STRATUM_TREAMER, SKILL_ID_STRIKING, SKILL_ID_SUMMON_FIRE_BALL, SKILL_ID_SUMMON_LIGHTNING_BALL,
    SKILL_ID_SUMMON_STONE,
    SKILL_ID_SUMMON_WATER_BALL, SKILL_ID_SUZAKU_FU, SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TERA_DRIVE,
    SKILL_ID_TERRA_HARVEST, SKILL_ID_TERRA_WAVE, SKILL_ID_THUNDERING_CALL, SKILL_ID_THUNDERING_FOCUS,
    SKILL_ID_THUNDERING_ORB, SKILL_ID_THUNDER_STORM, SKILL_ID_TORNADE_STORM, SKILL_ID_TSURARAOTOSHI,
    SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT, SKILL_ID_VENOM_SWAMP, SKILL_ID_VERATURE_SPEAR, SKILL_ID_VIOLENT_QUAKE,
    SKILL_ID_WATER_BALL, SKILL_ID_WATER_BALL_FOR_CLONE, SKILL_ID_WIND_BOMB, SKILL_ID_ZYUTSUSHIKI_KAIHO
} from "../skill/skill.dat.js";
import { AS_PLUS } from "../skill/calcautospell.js";
import { __DIG3, g_VariableCastTimeRate, g_skillManager } from "../runtime/global.js";
import {
    ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster, ApplyRegistPVPNormal, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerMatkPercentUp
} from "../bridge/battlecalc-bridge.js";
import { GetAttackMethodOptionValue } from "./attack-method-option.js";
import { SubName } from "./sub-name.js";
import { CS } from "./calc-state.js";
import { CreateSkillFormulaEnv } from "./skill-formula-env.js";
import { GetTotalSpecStatus } from "../chara/hmjob.js";
import {
    g_bDefinedDamageIntervals, n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../runtime/ro4-state.js";
import { UsedSkillSearch } from "../skill/skillstate.js";
import { n_A_WeaponZokusei } from "../runtime/roro-state.js";

export function ApplyMagicalSkillFormula(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    let w_MATK = [0,0,0];
    let bMatchCond = false;

		CS.n_PerfectHIT_DMG = 0;
		set_n_Enekyori(2);
		CS.directSubtractionMdef = false;
		CS.wbairitu = 100;
		CS.n_bunkatuHIT = 0;

		// 四次スキル以降の属性設定共通処理
		if (battleCalcInfo.skillId >= SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) {
			set_n_A_Weapon_zokusei(g_skillManager.GetElement(battleCalcInfo.skillId, attackMethodConfArray[0]));
		}

		switch (n_A_ActiveSkill) {

		// 「ウィザード」スキル「アーススパイク」

		// 「ウィザード」スキル「ヘヴンズドライブ」

		// メタリックサウンド

		// 「アークビショップ」スキル「ミリアムライト」


		//----------------------------------------------------------------
		//
		// 魔法ここから
		//
		//----------------------------------------------------------------

		// 「インペリアルガード」スキル「ジャッジメントクロス」
		// 2025/03/02 もなこさんから連携して頂いた情報に合わせてあります

		// 「アビスチェイサー」スキル「フロムジアビス」
		// 2024/10/24 提供データとのほぼ誤差無しを確認
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断

		// 「アビスチェイサー」スキル「オメガアビスストライク」
		// 2024/10/24 提供データとのほぼ誤差無しを確認済み
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断


		/**
		 * 「蜃気楼　不知火」スキル「赤炎砲」「冷血砲」「雷電砲」「金龍砲」
		 */

		// 「蜃気楼　不知火」スキル「影溶き」
		// 2024/12/25 もなこさん提供データに対して誤差なしを確認

		
/*
		case SKILL_ID_DUMMY:
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_SHOTGUN) {
				wbairitu = 0;
				break;
			}

			set_n_Enekyori(1);	// 遠距離フラグ
			wHITsuu = 3;	// 多段ヒット数

			// CSkillManager.js で定義された詠唱時間などを取得する
			g_bUnknownCasts = true;	// 詠唱時間など未計測フラグ
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 設置型の場合
			set_g_bDefinedDamageIntervals(true);
			n_Delay[5] = 500;	// ダメージ間隔
			n_Delay[6] = 5000;	// オブジェクト存続時間

			// CAttackMethodAreaComponentManager.js で定義されたオプションを取得する
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (950 + (150 * n_A_ActiveSkillLV));

			// 習得済みスキル条件
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0) {
				wbairitu = 650 + (150 * n_A_ActiveSkillLV);
			} else {
				wbairitu = 400 + (100 * n_A_ActiveSkillLV);
				bCri = false;										// クリティカルしない場合
			}
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正

			// 種族特攻
			switch (parseInt(mobData[MONSTER_DATA_INDEX_RACE], 10)) {
				case RACE_ID_DEMON:
					wHITsuu = 3;
			}

			wbairitu *= n_A_BaseLV / 100;							// BaseLv補正
			break;
*/

/* --------------------------------------------------
↑ 魔法攻撃スキル追加位置
-------------------------------------------------- */

		default:
			// engine/skill/<職業>/*.js の MagicalFormula slot へ移行済みのスキルはそちらを呼ぶ
			// （呼び出し後は break して、後続の共通魔法ダメージ計算をそのまま通す）
			if (g_skillManager.HasMagicalFormula(n_A_ActiveSkill)) {
				g_skillManager.ApplyMagicalFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
				break;
			}
			// engine/skill/<職業>/*.js の Power 等の slot へ移行済みのスキルはここで汎用計算式を適用する
			if (!g_skillManager.IsGenericFormula(n_A_ActiveSkill) || (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_MAGICAL) !== CSkillData.TYPE_MAGICAL) {
				break;
			}

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
			// ※このブロックは attackMethodConfArray[0] を常に渡す（オートスペルでも main の conf を使う、
			//   従来どおりの挙動）。アドラムス等 option 依存の 999 未満スキルは main の conf で評価しないと
			//   ダメージが変わってしまうため、ここでは bAutoSpell による null 化は行わない。
			//   四次スキル（ID>=999）の強制属性は BattleCalc999Body() で決定済みなのでここでは基本上書きされない。
			var elmWork = g_skillManager.GetForcedElement(battleCalcInfo.skillId, attackMethodConfArray[0], mobData, battleCalcInfo.parentSkillId);
			if (elmWork != CSkillData.ELEMENT_VOID) {
				set_n_A_Weapon_zokusei(elmWork);
			}
			CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData, n_A_WeaponType, battleCalcInfo.parentSkillId);
			CS.g_bSkillNoDamage = (CS.wbairitu == 0);
			set_n_Enekyori(g_skillManager.GetSkillRange(n_A_ActiveSkill, n_A_WeaponType));
			// ヒット数に関する情報
			CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType, battleCalcInfo.parentSkillId);
			CS.wActiveHitNum = g_skillManager.GetDividedHitCount(n_A_ActiveSkill,n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
			// 地面設置スキルの情報
			set_g_bDefinedDamageIntervals(g_skillManager.IsGroundInstallation(n_A_ActiveSkill, attackMethodConfArray[0]));
			if (g_bDefinedDamageIntervals) {
				n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);
				n_Delay[6] = g_skillManager.GetLifeTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			}
			// 100%ヒット・特殊な戦闘時間区分・分割ヒット式・強制ディレイの情報
			if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_100HIT) {
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
			}
			if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_IRREGULAR_BATTLE_TIME) {
				n_Delay[0] = 1;
			} else if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_UNKNOWN_DELAY_TIME) {
				n_Delay[0] = 2;
			}
			if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_DIVHIT_FORMULA) {
				CS.n_bunkatuHIT = 1;
			}
			if (g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_SG_SPECIAL_HITNUM) {
				CS.SG_Special_HITnum = CS.wHITsuu;
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

		if (CS.g_bSkillNoDamage) {
			return [0, 0, 0];
		}
		for(var i = 0; i <= 2; i++){
			// 各ＭＡＴＫを取得
			w_MATK[i] = n_A_MATK[i];
			// モンスター特化を適用
			w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
			// 属性耐性を適用
			w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			// 対プレイヤー一般耐性を適用
			w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
		}
		// マグヌスエクソシズム、かつ、モンスターが対象外の場合、ＭＡＴＫを０で計算する
		if (g_skillManager.HasMagicalMatkFilter(n_A_ActiveSkill)) {
			g_skillManager.ApplyMagicalMatkFilter(n_A_ActiveSkill, CreateSkillFormulaEnv(), mobData, w_MATK);
		}
		// ＭＡＴＫ％強化倍率を取得
		CS.wbairitu += GetBattlerMatkPercentUp(mobData);
		// 単発スキルの場合
		if(CS.n_bunkatuHIT == 0){
			for(var b = 0; b <= 2; b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * CS.wbairitu / 100);
				if(CS.SG_Special_HITnum != 0){
					CS.SG_Special_DMG[b] = w_DMG[b];
				}
				CS.Last_DMG_B[b] = w_DMG[b];
				if (g_skillManager.HasMagicalSingleHitLoop(n_A_ActiveSkill)) {
					g_skillManager.ApplyMagicalSingleHitLoop(n_A_ActiveSkill, CreateSkillFormulaEnv(), b, attackMethodConfArray);
				}
				CS.Last_DMG_A[b] = ROUNDDOWN(w_DMG[b] * CS.wHITsuu);
				// TODO: 四次データ形式変更対応
				// w_DMG[b] = Last_DMG_A[b];
			}

		}
		// 分割ＨＩＴの場合
		else{
			var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
			if (!(g_skillManager.HasMagicalDividedHitFormula(n_A_ActiveSkill) && g_skillManager.ApplyMagicalDividedHitFormula(n_A_ActiveSkill, CreateSkillFormulaEnv(), battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK, subnumvalue))){
				for(var b=0;b<=2;b++){
					// TODO: 2020年スキル修正に伴う変更（元からこの計算式だったかは不明）
					// w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100) / wHITsuu);
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * Math.floor(CS.wbairitu / CS.wHITsuu) * CS.wHITsuu / 100) / CS.wHITsuu);
					CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * CS.wHITsuu;
					// TODO: 四次データ形式変更対応
					// w_DMG[b] *= wHITsuu;
				}
			}
		}
		if(CS.n_AS_MODE){
			CS.SG_Special_HITnum = 0;
			return w_DMG;
		}
		CS.w_HIT_HYOUJI = 100;
		AS_PLUS();
		BuildCastAndDelayHtml(mobData);
		BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
		return w_DMG;
}
