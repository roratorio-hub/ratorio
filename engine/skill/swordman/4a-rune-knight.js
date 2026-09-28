/**
 * スキル定義 swordman/4a-rune-knight（21 件 / SKILL_ID 439〜794 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_A_Weapon_zokusei, n_Delay,
    set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from "../../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_ARMS } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_POWER, ITEM_DATA_INDEX_WEIGHT } from "../../const/EnumItemDataIndex.js";
import { MIG_PARAM_ID_POW } from "../../const/EnumMigItemParamId.js";
import { ItemObjNew } from "../../equip/item.dat.js";
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM,
    n_B_TAISEI
} from "../../monster/mobconfplayer.js";
import { n_A_Equip, n_A_INT, n_A_WeaponLV, n_A_Weapon_ATKplus } from "../../runtime/roro-state.js";
import { GetPAtk, GetTotalSpecStatus } from "../../bridge/hmjob-bridge.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyElementRatio, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetSpiderWebDamageRatio
} from "../../bridge/battlecalc-bridge.js";
import {
    SKILL_ID_AVANDANCE, SKILL_ID_CRUSH_STRIKE, SKILL_ID_DEATH_BOUND, SKILL_ID_DRAGONIC_AURA_STATE,
    SKILL_ID_DRAGON_HOWLING, SKILL_ID_DRAGON_TRAINING, SKILL_ID_ENCHANT_BLADE, SKILL_ID_FIGHTING_SPIRIT,
    SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_GIANT_GROWTH, SKILL_ID_HANDRED_SPEAR, SKILL_ID_IGNITION_BREAK,
    SKILL_ID_MILLENNIUM_SHIELD, SKILL_ID_PHANTOM_SLAST, SKILL_ID_REFRESH, SKILL_ID_RUNE_MASTERY, SKILL_ID_SONIC_WAVE,
    SKILL_ID_SPIRAL_PIERCE, SKILL_ID_STONE_HARD_SKIN, SKILL_ID_STORM_BLAST, SKILL_ID_VITARITY_ACTIVATION,
    SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WIND_CUTTER, SKILL_ID_YARI_SHUREN
} from "../skill.dat.js";

/** ファイアードラゴンブレス・ウォータードラゴンブレス共通のダメージ計算式（属性のみ異なる）。 */
function ApplyDragonBreathFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
			if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) == 0) {
				CS.n_Buki_Muri = true;
				return;
			}
			// 遠距離スキル
			set_n_Enekyori(1);
			// 必中スキル
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			// 詠唱時間等
			CS.wCast = this.CastTimeVary(battleCalcInfo.skillLv, charaData);
			CS.n_KoteiCast = this.CastTimeFixed(battleCalcInfo.skillLv, charaData);
			n_Delay[2] = this.DelayTimeCommon(battleCalcInfo.skillLv, charaData);
			n_Delay[7] = this.CoolTime(battleCalcInfo.skillLv, charaData);
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
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
}

export const skills = [
		// ----------------------------------------------------------------
		// エンチャントブレイド
		// ----------------------------------------------------------------
		// SKILL_ID_ENCHANT_BLADE
		defineSkill(SKILL_ID_ENCHANT_BLADE, function() {

			this.name = "エンチャントブレイド";
			this.kana = "エンチヤントフレイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ソニックウェーブ
		// ----------------------------------------------------------------
		// SKILL_ID_SONIC_WAVE
		defineSkill(SKILL_ID_SONIC_WAVE, function() {

			this.name = "ソニックウェーブ";
			this.kana = "ソニツクウエエフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 27 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 700 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100)

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1000 : 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 2000 : 200;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// デスバウンド
		// ----------------------------------------------------------------
		// SKILL_ID_DEATH_BOUND
		defineSkill(SKILL_ID_DEATH_BOUND, function() {

			this.name = "(△)デスバウンド";
			this.kana = "テスハウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2500 + 500 * skillLv;

				}

				return 3000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				if(CS.n_DEATH_BOUND[3] == 0){
					w_DMG[0] = 1;
					w_DMG[1] = 1;
					w_DMG[2] = 1;
					BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				}else{
					n_Delay[0] = 1;
					n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);

					w_DMG[0] = CS.n_DEATH_BOUND[0];
					w_DMG[1] = CS.n_DEATH_BOUND[1];
					w_DMG[2] = CS.n_DEATH_BOUND[2];
					for(var i=0;i<=2;i++){
						CS.Last_DMG_A[i] = CS.Last_DMG_B[i] = w_DMG[i];
					}
					CS.w_HIT = 100;
					CS.w_HIT_HYOUJI = 100;
					BuildCastAndDelayHtml(mobData);
					BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				}
			}

		}),

		// ----------------------------------------------------------------
		// ハンドレッドスピア
		// ----------------------------------------------------------------
		// SKILL_ID_HANDRED_SPEAR
		defineSkill(SKILL_ID_HANDRED_SPEAR, function() {
			this.name = "ハンドレッドスピア";
			this.kana = "ハントレツトスヒア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = function(weapon) {
				return CSkillData.RANGE_LONG;
			}
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE) > 1) {
					// ドラゴニックオーラ状態の場合はダメージ倍率が増加する
					ratio = 700 + 200 * skillLv;
				}
				else {
					ratio = 600 + 80 * skillLv;
				}
				if(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] < 1000) {
					ratio += (1000 - ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT]);
				}
				ratio = Math.floor(ratio * (1 + (n_A_BaseLV - 100) / 200));
				// スパイラルピアース習得Lv補正
				ratio += 50 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRAL_PIERCE), option.GetOptionValue(0));
				// チャージングピアースがONの時、与えるダメージ + 50% x スキルレベル
				ratio = ratio * (1 + 0.5 * option.GetOptionValue(2));
				return ratio;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}
			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ウィンドカッター
		// ----------------------------------------------------------------
		// SKILL_ID_WIND_CUTTER
		defineSkill(SKILL_ID_WIND_CUTTER, function() {

			this.name = "ウィンドカッター";
			this.kana = "ウイントカツタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 50 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ファントムスラスト
		// ----------------------------------------------------------------
		// SKILL_ID_PHANTOM_SLAST
		defineSkill(SKILL_ID_PHANTOM_SLAST, function() {

			this.name = "ファントムスラスト";
			this.kana = "フアントムスラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 50 * skillLv;
				pow += 10 * Math.max(LearnedSkillSearch(SKILL_ID_YARI_SHUREN), UsedSkillSearch(SKILL_ID_YARI_SHUREN));

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 150);

				return pow;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// (仮)イグニッションブレイク
		// ----------------------------------------------------------------
		// SKILL_ID_IGNITION_BREAK
		defineSkill(SKILL_ID_IGNITION_BREAK, function() {

			this.name = "(仮)イグニッションブレイク";
			this.kana = "イクニツシヨンフレイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { GetAttackMethodOptionValue, CS } = env;
				n_Delay[7] = 3000;
				var w = GetAttackMethodOptionValue(attackMethodConfArray, 0, 0);
				if(w == 0) CS.wbairitu = 300 * n_A_ActiveSkillLV;
				if(w == 1) CS.wbairitu = 250 * n_A_ActiveSkillLV;
				if(w == 2) CS.wbairitu = 200 * n_A_ActiveSkillLV;
				CS.wbairitu = ROUNDDOWN(CS.wbairitu * n_A_BaseLV / 100);
				if(GetAttackMethodOptionValue(attackMethodConfArray, 1, 1) == 1) CS.wbairitu -= 1;
				if(CS.BK_Weapon_zokusei == 3) CS.wbairitu += 100 * n_A_ActiveSkillLV;
			}

		}),

		// ----------------------------------------------------------------
		// ドラゴントレーニング
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGON_TRAINING
		defineSkill(SKILL_ID_DRAGON_TRAINING, function() {

			this.name = "ドラゴントレーニング";
			this.kana = "トラコントレエニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ファイアードラゴンブレス
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_DRAGON_BREATH
		defineSkill(SKILL_ID_FIRE_DRAGON_BREATH, function() {
			this.name = "(△)ファイアードラゴンブレス";
			this.kana = "フアイアアトラコンフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL | CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return [0,0,0,0,10,10,10,15,15,20,20][skillLv] * 100;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.SpecialFormula = ApplyDragonBreathFormula;
		}),

		// ----------------------------------------------------------------
		// ドラゴンハウリング
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGON_HOWLING
		defineSkill(SKILL_ID_DRAGON_HOWLING, function() {

			this.name = "ドラゴンハウリング";
			this.kana = "トラコンハウリンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 200 : (12500 - 2500 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// ルーンマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_RUNE_MASTERY
		defineSkill(SKILL_ID_RUNE_MASTERY, function() {

			this.name = "ルーンマスタリー";
			this.kana = "ルウンマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ジャイアントグロース
		// ----------------------------------------------------------------
		// SKILL_ID_GIANT_GROWTH
		defineSkill(SKILL_ID_GIANT_GROWTH, function() {

			this.name = "ジャイアントグロース";
			this.kana = "シヤイアントクロオス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// バイタリティアクティベーション
		// ----------------------------------------------------------------
		// SKILL_ID_VITARITY_ACTIVATION
		defineSkill(SKILL_ID_VITARITY_ACTIVATION, function() {

			this.name = "バイタリティアクティベーション";
			this.kana = "ハイタリテイアクテイヘエシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		}),

		// ----------------------------------------------------------------
		// ストームブラスト
		// ----------------------------------------------------------------
		// SKILL_ID_STORM_BLAST
		defineSkill(SKILL_ID_STORM_BLAST, function() {

			this.name = "ストームブラスト";
			this.kana = "ストオムフラスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 8000;
			}
			this.Power = function(skillLv, charaDataManger) {
				const rune_mastery = Math.max(LearnedSkillSearch(SKILL_ID_RUNE_MASTERY), UsedSkillSearch(SKILL_ID_RUNE_MASTERY));
				return 100 * rune_mastery + ROUNDDOWN(n_A_INT / 8) * 100;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				CS.n_KoteiCast = this.CastTimeFixed(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
			}
		}),

		// ----------------------------------------------------------------
		// ストーンハードスキン
		// ----------------------------------------------------------------
		// SKILL_ID_STONE_HARD_SKIN
		defineSkill(SKILL_ID_STONE_HARD_SKIN, function() {

			this.name = "ストーンハードスキン";
			this.kana = "ストオンハアトスキン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ファイティングスピリット
		// ----------------------------------------------------------------
		// SKILL_ID_FIGHTING_SPIRIT
		defineSkill(SKILL_ID_FIGHTING_SPIRIT, function() {

			this.name = "ファイティングスピリット";
			this.kana = "フアイテインクスヒリツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// アバンダンス
		// ----------------------------------------------------------------
		// SKILL_ID_AVANDANCE
		defineSkill(SKILL_ID_AVANDANCE, function() {

			this.name = "アバンダンス";
			this.kana = "アハンタンス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// クラッシュストライク
		// ----------------------------------------------------------------
		// SKILL_ID_CRUSH_STRIKE
		defineSkill(SKILL_ID_CRUSH_STRIKE, function() {

			this.name = "クラッシュストライク";
			this.kana = "クラツシユストライク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.Power = function(skillLv, charaDataManger) {
				return n_A_WeaponLV * (6 + n_A_Weapon_ATKplus) * 100
						+ ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_POWER]
						+ ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// リフレッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_REFRESH
		defineSkill(SKILL_ID_REFRESH, function() {

			this.name = "リフレッシュ";
			this.kana = "リフレツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ミレニアムシールド
		// ----------------------------------------------------------------
		// SKILL_ID_MILLENNIUM_SHIELD
		defineSkill(SKILL_ID_MILLENNIUM_SHIELD, function() {

			this.name = "ミレニアムシールド";
			this.kana = "ミレニアムシイルト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ウォータードラゴンブレス
		// ----------------------------------------------------------------
		// SKILL_ID_WATER_DRAGON_BREATH
		defineSkill(SKILL_ID_WATER_DRAGON_BREATH, function() {
			this.name = "(△)ウォータードラゴンブレス";
			this.kana = "ウオオタアトラコンフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL | CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return [0,0,0,0,10,10,10,15,15,20,20][skillLv] * 100;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.SpecialFormula = ApplyDragonBreathFormula;
		}),

];
