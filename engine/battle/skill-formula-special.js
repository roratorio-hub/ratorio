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
