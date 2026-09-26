/**
 * スキル定義 gunslinger/4-rebellion（25 件 / SKILL_ID 822〜846 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ROUNDDOWN } from "../../bridge/stallcalc-bridge.js";
import { LearnedSkillSearch } from "../../bridge/skill-search-bridge.js";
import { MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF, MONSTER_DATA_INDEX_ID, MONSTER_DATA_INDEX_SIZE } from "../../const/EnumMonsterDataIndex.js";
import { MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI, n_B_IJYOU } from "../../monster/mobconfdebuf.js";
import { MONSTER_ID_PLAYER } from "../../monster/monster.dat.js";
import { n_B_TAISEI } from "../../monster/mobconfplayer.js";
import {
    n_A_BaseLV, n_A_ActiveSkill, n_A_ActiveSkillLV, n_Delay, n_A_Weapon_zokusei, w_DMG, set_n_Enekyori
} from "../../runtime/ro4-state.js";
import { n_A_JobLV } from "../../runtime/roro-state.js";
import {
    ApplyPhysicalSpecializeMonster, ApplyElementRatio, ApplyPhysicalDamageRatio, GetFixedAppendAtk,
    ApplyMonsterDefence, ApplyPhysicalSkillDamageRatioChange, BuildCastAndDelayHtml, BuildBattleResultHtml,
    GetBattlerAtkPercentUp, ATKbaiJYOUSAN, ApplyHitJudgeElementRatio, GetPerfectHitDamage
} from "../../bridge/battlecalc-bridge.js";
import { ApplyG1CommonTailFormula } from "../skill-formula-shared.js";
import {
    SKILL_ID_AS_QUICKDRAW, SKILL_ID_BIND_TRAP, SKILL_ID_BUNISHING_BASTER, SKILL_ID_CRYMSON_MARKER,
    SKILL_ID_DEATHPERAD, SKILL_ID_DRAGON_TAIL, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_FALLIN_ANGEL, SKILL_ID_FIRE_DANCE,
    SKILL_ID_FIRE_RAIN,
    SKILL_ID_FRICKER, SKILL_ID_HAMMER_OF_GOD, SKILL_ID_HEAT_BARREL, SKILL_ID_HEAT_BARREL_COIN_COUNT,
    SKILL_ID_HOWLING_MINE, SKILL_ID_HOWLING_MINE_APPEND, SKILL_ID_MASS_SPIRAL,
    SKILL_ID_PLATINUM_ALTER, SKILL_ID_PLATINUM_ALTER_COIN_COUNT, SKILL_ID_QUICKDRAW_SHOT, SKILL_ID_RICHS_COIN,
    SKILL_ID_ROUND_TRIP, SKILL_ID_SHUTTER_STORM, SKILL_ID_SLUG_SHOT, SKILL_ID_UNTIMATERIAL_BLAST
} from "../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// リッチズコイン
		// ----------------------------------------------------------------
		// SKILL_ID_RICHS_COIN
		defineSkill(SKILL_ID_RICHS_COIN, function() {

			this.name = "リッチズコイン";
			this.kana = "リツチスコイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// フォーリンエンジェル
		// ----------------------------------------------------------------
		// SKILL_ID_FALLIN_ANGEL
		defineSkill(SKILL_ID_FALLIN_ANGEL, function() {

			this.name = "フォーリンエンジェル";
			this.kana = "フオオリンエンシエル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// シャッターストーム
		// ----------------------------------------------------------------
		// SKILL_ID_SHUTTER_STORM
		defineSkill(SKILL_ID_SHUTTER_STORM, function() {

			this.name = "シャッターストーム";
			this.kana = "シヤツタアストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1700 + 200 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// マススパイラル
		// ----------------------------------------------------------------
		// SKILL_ID_MASS_SPIRAL
		defineSkill(SKILL_ID_MASS_SPIRAL, function() {

			this.name = "マススパイラル";
			this.kana = "マススハイラル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option, mobData) {
				// 威力に影響するＤＥＦは５００まで
				const origDef = mobData[MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF];
				const defpower = origDef > 500 ? 500 : origDef;
				return (200 + defpower) * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, AS_PLUS } = env;
				set_n_Enekyori(1);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);

				// dewindow: 旧 mob.js の暗黙グローバル B_Original_DEF（除算DEF補正前の値）を参照していたが、
				// 移行時に mob.js 側が関数ローカル var 化され ReferenceError になっていた。
				// 同値が mobData[MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF]（補正前の値を保持）に入っているためそれを使う。
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0], mobData);

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
				}
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// エターナルチェーン
		// ----------------------------------------------------------------
		// SKILL_ID_ETERNAL_CHAIN
		defineSkill(SKILL_ID_ETERNAL_CHAIN, function() {

			this.name = "エターナルチェーン";
			this.kana = "エタアナルチエエン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		}),

		// ----------------------------------------------------------------
		// ハウリングマイン
		// ----------------------------------------------------------------
		// SKILL_ID_HOWLING_MINE
		defineSkill(SKILL_ID_HOWLING_MINE, function() {

			this.name = "ハウリングマイン";
			this.kana = "ハウリンクマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ファイアーレイン
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_RAIN
		defineSkill(SKILL_ID_FIRE_RAIN, function() {

			this.name = "ファイアーレイン";
			this.kana = "フアイアアレイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// フリッカー
		// ----------------------------------------------------------------
		// SKILL_ID_FRICKER
		defineSkill(SKILL_ID_FRICKER, function() {

			this.name = "フリッカー";
			this.kana = "フリツカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// ファイアーダンス
		// ----------------------------------------------------------------
		// SKILL_ID_FIRE_DANCE
		defineSkill(SKILL_ID_FIRE_DANCE, function() {

			this.name = "ファイアーダンス";
			this.kana = "フアイアアタンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				// デスペラード習得Lv補正
				const deathperad_lv = Math.max(LearnedSkillSearch(SKILL_ID_DEATHPERAD), option.GetOptionValue(0));
				const wbairitu = 1000 + 100 * skillLv + 20 * deathperad_lv;
				return ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData, attackMethodConfArray[0]);
				set_n_Enekyori(1);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
			}
		}),

		// ----------------------------------------------------------------
		// バニシングバスター
		// ----------------------------------------------------------------
		// SKILL_ID_BUNISHING_BASTER
		defineSkill(SKILL_ID_BUNISHING_BASTER, function() {

			this.name = "バニシングバスター";
			this.kana = "ハニシンクハスタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// アンチマテリアルブラスト
		// ----------------------------------------------------------------
		// SKILL_ID_UNTIMATERIAL_BLAST
		defineSkill(SKILL_ID_UNTIMATERIAL_BLAST, function() {

			this.name = "アンチマテリアルブラスト";
			this.kana = "アンチマテリアルフラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 76 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1500 + 300 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// クイックドローショット
		// ----------------------------------------------------------------
		// SKILL_ID_QUICKDRAW_SHOT
		defineSkill(SKILL_ID_QUICKDRAW_SHOT, function() {

			this.name = "クイックドローショット";
			this.kana = "クイツクトロオシヨツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				set_n_Enekyori(1);
				CS.wCast = 0;
				n_Delay[2] = 0;
				n_Delay[7] = 0;
				CS.wHITsuu = ROUNDDOWN(n_A_JobLV / 20) + 1;
				return ApplyG1CommonTailFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft);
			}
		}),

		// ----------------------------------------------------------------
		// ドラゴンテイル
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGON_TAIL
		defineSkill(SKILL_ID_DRAGON_TAIL, function() {

			this.name = "ドラゴンテイル";
			this.kana = "トラコンテイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			// 強制無属性は現状無効化されている（元コードの該当行はコメントアウト済み）
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				let ratio = 500 + 200 * skillLv;
				ratio = ROUNDDOWN(ratio * n_A_BaseLV / 100);
				// 烙印状態ならば、攻撃力２倍
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
					ratio *= 2;
				}
				return ratio;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(2000, 1000 + 200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ラウンドトリップ
		// ----------------------------------------------------------------
		// SKILL_ID_ROUND_TRIP
		defineSkill(SKILL_ID_ROUND_TRIP, function() {

			this.name = "ラウンドトリップ";
			this.kana = "ラウントトリツフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(200, 1200 - 200 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.Power = function(skillLv, charaDataManger) {
				return ROUNDDOWN((100 + 40 * skillLv) * n_A_BaseLV / 100);
			}

			this.SpecialFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS, AS_PLUS } = env;
				set_n_Enekyori(1);
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);

				var basePower = this.Power(n_A_ActiveSkillLV, charaData);

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
					if(attackMethodConfArray[0].GetOptionValue(0) == 1){
						var w = w2hit[i];
						if(w == 0) w = "Miss";
					}
				}
				w_DMG[1] = (w_DMG[1] * CS.w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-CS.w_HIT))/100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
		}),

		// ----------------------------------------------------------------
		// ヒートバレル
		// ----------------------------------------------------------------
		// SKILL_ID_HEAT_BARREL
		defineSkill(SKILL_ID_HEAT_BARREL, function() {

			this.name = "ヒートバレル";
			this.kana = "ヒイトハレル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 105000 - 5000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ヒートバレルのコイン枚数
		// ----------------------------------------------------------------
		// SKILL_ID_HEAT_BARREL_COIN_COUNT
		defineSkill(SKILL_ID_HEAT_BARREL_COIN_COUNT, function() {

			this.name = "ヒートバレルのコイン枚数";
			this.kana = "ヒイトハレルノコインマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スラッグショット
		// ----------------------------------------------------------------
		// SKILL_ID_SLUG_SHOT
		defineSkill(SKILL_ID_SLUG_SHOT, function() {

			this.name = "スラッグショット";
			this.kana = "スラツクシヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option, mobData) {
				var pow = 0;

				pow = 600 * skillLv;
				pow *= (2 + mobData[MONSTER_DATA_INDEX_SIZE]);
				// 対モンスターのみ２倍
				if (mobData[MONSTER_DATA_INDEX_ID] != MONSTER_ID_PLAYER) {
					pow *= 2;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// ハンマーオブゴッド
		// ----------------------------------------------------------------
		// SKILL_ID_HAMMER_OF_GOD
		defineSkill(SKILL_ID_HAMMER_OF_GOD, function() {

			this.name = "ハンマーオブゴッド";
			this.kana = "ハンマアオフコツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger, option) {
				var pow = 0;
				var coincount = 0;

				pow = 500 + 100 * skillLv;

				// 烙印状態の影響
				coincount = option.GetOptionValue(0);
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
					pow += coincount * 200;
				} else {
					pow += coincount * 50;
				}

				pow = Math.floor(pow * n_A_BaseLV / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// クリムゾンマーカー
		// ----------------------------------------------------------------
		// SKILL_ID_CRYMSON_MARKER
		defineSkill(SKILL_ID_CRYMSON_MARKER, function() {

			this.name = "クリムゾンマーカー";
			this.kana = "クリムソンマアカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// プラチナムアルター
		// ----------------------------------------------------------------
		// SKILL_ID_PLATINUM_ALTER
		defineSkill(SKILL_ID_PLATINUM_ALTER, function() {

			this.name = "プラチナムアルター";
			this.kana = "フラチナムアルタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// プラチナムのコイン枚数
		// ----------------------------------------------------------------
		// SKILL_ID_PLATINUM_ALTER_COIN_COUNT
		defineSkill(SKILL_ID_PLATINUM_ALTER_COIN_COUNT, function() {

			this.name = "プラチナムのコイン枚数";
			this.kana = "フラチナムノコインマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// バインドトラップ
		// ----------------------------------------------------------------
		// SKILL_ID_BIND_TRAP
		defineSkill(SKILL_ID_BIND_TRAP, function() {

			this.name = "バインドトラップ";
			this.kana = "ハイントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return (1000 + 90 * skillLv) / 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

			this.PhysicalFormula = function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
				const { CS } = env;
				CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData);
				set_n_Enekyori(1);
				CS.wCast = "不明";
				n_Delay[0] = 2000;
			}
		}),

		// ----------------------------------------------------------------
		// ハウリングマイン追撃
		// ----------------------------------------------------------------
		// SKILL_ID_HOWLING_MINE_APPEND
		defineSkill(SKILL_ID_HOWLING_MINE_APPEND, function() {

			this.refId = SKILL_ID_HOWLING_MINE;
			this.name = "ハウリングマイン追撃";
			this.kana = "ハウリンクマインツイケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 1000 + 400 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

			this.genericFormula = true;
		}),

		// ----------------------------------------------------------------
		// クイックドローショットの全追撃
		// ----------------------------------------------------------------
		// SKILL_ID_AS_QUICKDRAW
		defineSkill(SKILL_ID_AS_QUICKDRAW, function() {

			this.name = "クイックドローショットの全追撃";
			this.kana = "クイツクトロオシヨツトノセンツイケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
