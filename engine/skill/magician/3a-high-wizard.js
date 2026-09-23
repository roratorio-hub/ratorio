/**
 * スキル定義 magician/3a-high-wizard（6 件 / SKILL_ID 274〜863 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_Weapon_zokusei, n_Delay, n_Heal_MATK, n_tok,
    set_g_bDefinedDamageIntervals, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { BK_n_A_MATK, n_A_WeaponLV_seirenATK, n_A_WeaponType } from "../../runtime/roro-state.js";
import { ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON, ITEM_SP_SKILL_DAMAGE_OFFSET } from "../../const/EnumItemSpId.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyElementRatio, ApplyHitJudgeElementRatio, ApplyMagicalSkillDamageRatioChange, ApplyMagicalSpecializeMonster,
    ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange, ApplyRegistPVPNormal, ApplyResistElement,
    BuildBattleResultHtml, BuildCastAndDelayHtml, GetBattlerMatkPercentUp, GetFixedAppendAtk, GetPerfectHitDamage
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_GANBANTEIN, SKILL_ID_GRAVITATION_FIELD, SKILL_ID_MAGIC_CRUSHER, SKILL_ID_MAHORYOKU_ZOFUKU,
    SKILL_ID_NAPALM_VULKAN, SKILL_ID_SOUL_DRAIN
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// ソウルドレイン
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_DRAIN
		defineSkill(SKILL_ID_SOUL_DRAIN, function() {

			this.name = "ソウルドレイン";
			this.kana = "ソウルトレイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// マジッククラッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_CRUSHER
		defineSkill(SKILL_ID_MAGIC_CRUSHER, function() {

			this.name = "マジッククラッシャー";
			this.kana = "マシツククラツシヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, AS_PLUS } = env;
				let w_MATK = [0,0,0];
				set_n_Enekyori(1);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
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
			}
		}),

		// ----------------------------------------------------------------
		// 魔法力増幅
		// ----------------------------------------------------------------
		// SKILL_ID_MAHORYOKU_ZOFUKU
		defineSkill(SKILL_ID_MAHORYOKU_ZOFUKU, function() {

			this.name = "魔法力増幅";
			this.kana = "マホウリヨクソウフク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// ナパームバルカン
		// ----------------------------------------------------------------
		// SKILL_ID_NAPALM_VULKAN
		defineSkill(SKILL_ID_NAPALM_VULKAN, function() {

			this.name = "ナパームバルカン";
			this.kana = "ナハアムハルカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager, AS_PLUS } = env;
				let w_MATK = [0,0,0];
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
				CS.wHITsuu = g_skillManager.GetHitCount(n_A_ActiveSkill, n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);
				CS.wCast = g_skillManager.GetCastTimeVary(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
				CS.wbairitu = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
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
					w_DMG[b] = CS.Last_DMG_A[b];
				}
				if(CS.n_AS_MODE) return w_DMG;
				CS.w_HIT_HYOUJI = 100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// グラビテーションフィールド
		// ----------------------------------------------------------------
		// SKILL_ID_GRAVITATION_FIELD
		defineSkill(SKILL_ID_GRAVITATION_FIELD, function() {
			this.name = "グラビテーションフィールド";
			this.kana = "クラヒテエシヨンフイイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			this.damageInterval = function(skillLv) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 4000 + skillLv * 1000;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, g_skillManager } = env;
				CS.wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				CS.n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 設置スキル設定
				set_g_bDefinedDamageIntervals(true);
				n_Delay[5] = g_skillManager.GetDamageInterval(n_A_ActiveSkill, n_A_ActiveSkillLV);	// ダメージ間隔
				n_Delay[6] = g_skillManager.GetLifeTime(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);	// オブジェクト存続時間
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
			}
		}),

		// ----------------------------------------------------------------
		// ガンバンテイン
		// ----------------------------------------------------------------
		// SKILL_ID_GANBANTEIN
		defineSkill(SKILL_ID_GANBANTEIN, function() {

			this.name = "ガンバンテイン";
			this.kana = "カンハンテイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

];
