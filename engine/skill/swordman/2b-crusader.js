/**
 * スキル定義 swordman/2b-crusader（13 件 / SKILL_ID 156〜852 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_BaseLV, n_Delay, n_tok, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../../runtime/ro4-state.js";
import { n_A_BodyZokusei, n_A_Equip, n_A_MATK, n_A_SHIELD_DEF_PLUS, n_B_DEF2, n_B_MDEF2 } from "../../runtime/roro-state.js";
import {
    CHARA_DATA_INDEX_DEF_DIV, CHARA_DATA_INDEX_DEF_MINUS, CHARA_DATA_INDEX_MDEF_DIV, CHARA_DATA_INDEX_MDEF_MINUS,
    CHARA_DATA_INDEX_STATUS_ATK
} from "../../const/EnumCharaDataIndex.js";
import { EQUIP_REGION_ID_SHIELD } from "../../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_WEIGHT } from "../../const/EnumItemDataIndex.js";
import { ItemObjNew } from "../../equip/item.dat.js";
import { zokusei } from "../../data/element-affinity.dat.js";
import { n_B_KYOUKA } from "../../monster/mobconfbuf.js";
import { MOB_CONF_DEBUF_ID_LEX_AETERNA, n_B_IJYOU } from "../../monster/mobconfdebuf.js";
import { EquipNumSearch } from "../../bridge/chara-search-bridge.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip, ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import {
    ApplyElementRatio, ApplyMagicalSpecializeMonster, ApplyPhysicalDamageRatio, ApplyPhysicalSkillDamageRatioChange,
    ApplyRegistPVPNormal, ApplyResistElement, BaiTaisei_A_SP, BaiTaisei_E, BuildBattleResultHtml, BuildCastAndDelayHtml
} from "../../bridge/battlecalc-bridge.js";
import { CSkillData, defineSkill } from "../CSkillData.js";
import {
    SKILL_ID_AUTO_GUARD, SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_DEBOTION, SKILL_ID_DEFENDER, SKILL_ID_FAITH,
    SKILL_ID_GRAND_CROSS, SKILL_ID_HOLY_CROSS, SKILL_ID_PROVIDENCE, SKILL_ID_REFLECT_SHIELD,
    SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHRINK, SKILL_ID_SPEAR_QUICKEN,
	SKILL_ID_SHIELD_BOOMERANG_TAMASHI
} from "../skill.dat.js";

/** シールドブーメラン・シールドブーメラン(SL魂版)共通のダメージ計算式（倍率のみ異なる）。 */
function ApplyShieldBoomerangFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, g_skillManager } = env;
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData);
			var wSBr = n_A_SHIELD_DEF_PLUS *4;
			var wbairitu2 = g_skillManager.GetPower(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
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
			}
			w_DMG[1] = (w_DMG[1] * CS.w_HIT)/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
}

export const skills = [
		// ----------------------------------------------------------------
		// フェイス
		// ----------------------------------------------------------------
		// SKILL_ID_FAITH
		defineSkill(SKILL_ID_FAITH, function() {

			this.name = "フェイス";
			this.kana = "フエイス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シールドチャージ
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_CHARGE
		defineSkill(SKILL_ID_SHIELD_CHARGE, function() {

			this.name = "シールドチャージ";
			this.kana = "シイルトチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// シールドブーメラン
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_BOOMERANG
		defineSkill(SKILL_ID_SHIELD_BOOMERANG, function() {

			this.name = "シールドブーメラン";
			this.kana = "シイルトフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700;
			}

			this.SpecialFormula = ApplyShieldBoomerangFormula;
		}),

		// ----------------------------------------------------------------
		// シールドブーメラン(SL魂版)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIELD_BOOMERANG_TAMASHI
		defineSkill(SKILL_ID_SHIELD_BOOMERANG_TAMASHI, function() {

			this.refId = SKILL_ID_SHIELD_BOOMERANG;
			this.name = "シールドブーメラン(SL魂版)";
			this.kana = "シイルトフウメランソウルリンカアタマシイハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 60 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 350;
			}

			this.SpecialFormula = ApplyShieldBoomerangFormula;
		}),

		// ----------------------------------------------------------------
		// リフレクトシールド
		// ----------------------------------------------------------------
		// SKILL_ID_REFLECT_SHIELD
		defineSkill(SKILL_ID_REFLECT_SHIELD, function() {

			this.name = "リフレクトシールド";
			this.kana = "リフレクトシイルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ホーリークロス
		// ----------------------------------------------------------------
		// SKILL_ID_HOLY_CROSS
		defineSkill(SKILL_ID_HOLY_CROSS, function() {

			this.name = "ホーリークロス";
			this.kana = "ホオリイクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// グランドクロス
		// ----------------------------------------------------------------
		// SKILL_ID_GRAND_CROSS
		defineSkill(SKILL_ID_GRAND_CROSS, function() {

			this.name = "グランドクロス";
			this.kana = "クラントクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 7 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				let w_MATK = [0,0,0];
				CS.w_HIT = 100;
				CS.w_HIT_HYOUJI = 100;
				CS.n_PerfectHIT_DMG = 0;
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
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
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
						w_DMG[b] = CS.Last_DMG_A[b];
					}
				}else{
					for(var b=0;b<=2;b++){
						CS.Last_DMG_A[b] = CS.Last_DMG_B[b] = w_DMG[b] * 4;
						w_DMG[b] = CS.Last_DMG_A[b];
					}
				}
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}

		}),

		// ----------------------------------------------------------------
		// ディボーション
		// ----------------------------------------------------------------
		// SKILL_ID_DEBOTION
		defineSkill(SKILL_ID_DEBOTION, function() {

			this.name = "ディボーション";
			this.kana = "テイホオシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// プロヴィデンス
		// ----------------------------------------------------------------
		// SKILL_ID_PROVIDENCE
		defineSkill(SKILL_ID_PROVIDENCE, function() {

			this.name = "プロヴィデンス";
			this.kana = "フロウイテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// ディフェンダー
		// ----------------------------------------------------------------
		// SKILL_ID_DEFENDER
		defineSkill(SKILL_ID_DEFENDER, function() {

			this.name = "ディフェンダー";
			this.kana = "テイフエンタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// スピアクイッケン
		// ----------------------------------------------------------------
		// SKILL_ID_SPEAR_QUICKEN
		defineSkill(SKILL_ID_SPEAR_QUICKEN, function() {

			this.name = "スピアクイッケン";
			this.kana = "スヒアクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// オートガード
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_GUARD
		defineSkill(SKILL_ID_AUTO_GUARD, function() {

			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// オートガード（ダミー　※多重定義ミス）
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_GUARD_OLD
		defineSkill(SKILL_ID_AUTO_GUARD_OLD, function() {

			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// シュリンク
		// ----------------------------------------------------------------
		// SKILL_ID_SHRINK
		defineSkill(SKILL_ID_SHRINK, function() {

			this.name = "シュリンク";
			this.kana = "シユリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

];
