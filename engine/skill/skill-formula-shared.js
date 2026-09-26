/**
 * 職業をまたいで共有されるスキル計算式の本文を置くファイル（G1〜G7）。
 * 各グループの前半（スキル固有の分岐）は各職業ファイルの hook に、
 * 後半の共有部分だけをここに置く。本文は移動元から無変換（原文の書式のまま）。
 */
import {
    n_A_ActiveSkill, n_A_ActiveSkillLV, n_A_Weapon_zokusei, n_Delay, set_n_A_Weapon_zokusei, set_n_Enekyori, w_DMG
} from "../runtime/ro4-state.js";
import { n_A_DEX, n_A_INT, n_A_WeaponType, n_A_MATK } from "../runtime/roro-state.js";
import { MOB_CONF_DEBUF_ID_LEX_AETERNA, n_B_IJYOU } from "../monster/mobconfdebuf.js";
import { n_B_KYOUKA } from "../monster/mobconfbuf.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../bridge/skill-search-bridge.js";
import { SKILL_ID_STEEL_CROW, SKILL_ID_FALCON_ASSALT, SKILL_ID_FIRE_EXPANSION, SKILL_ID_HAPPO_KUNAI } from "./skill.dat.js";
import {
    GetBattlerAtkPercentUp, ATKbaiJYOUSAN, ApplyPhysicalDamageRatio, ApplyMonsterDefence, GetFixedAppendAtk,
    ApplyPhysicalSkillDamageRatioChange, GetPerfectHitDamage, ApplyHitJudgeElementRatio, GetActHitRateAll,
    ApplyPhysicalSpecializeMonster, ApplyElementRatio, ApplyMagicalSpecializeMonster, ApplyResistElement,
    HealCalc, ApplyLexAeterna, ApplyAttackDamageAmplify,
    BuildCastAndDelayHtml, BuildBattleResultHtml
} from "../bridge/battlecalc-bridge.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";

/**
 * G1（ダブルストレイフィング系）共通の後半。各スキルの hook は自分の分岐を実行した後、
 * この関数を呼ぶ（本文は移動元の switch 本体の共通部分をそのまま）。
 */
export function ApplyG1CommonTailFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, AS_PLUS, __DIG3 } = env;
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
}

/**
 * G2（閃光連撃・コンボ系）共通の後半。各スキルの hook は自分の分岐（詠唱情報 or n_Delay[0]=1）を
 * 実行した後、この関数を呼ぶ（本文は移動元の switch 本体の共通部分をそのまま）。
 */
export function ApplyG2CommonTailFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, AS_PLUS } = env;
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
}

/**
 * G4（エンチャントポイズン／ポイズンリアクト共通）。本文全体をそのまま置く（分岐なし）。
 * TODO: 本来の分岐条件は以下の通り。ポイズンリアクトの計算式でずれる可能性大
 * else if(n_A_ActiveSkill==17 || (n_A_ActiveSkill==86 && (mobData[18] <50 || 60 <= mobData[18]))){
 */
export function ApplyG4EnvenomFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, AS_PLUS } = env;
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
}

/**
 * G5（ブリッツビート／ファルコンアサルト共通）。本文全体をそのまま置く（分岐なし）。
 */
export function ApplyG5BlitzBeatFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS } = env;
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
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
			}else{
				wBT = ApplyElementRatio(mobData, wBT,0);
				wBT = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wBT);
				wBT *= n_A_ActiveSkillLV;
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
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
}

/**
 * G6（アシッドデモンストレーション／ファイアーエクスパンション共通）。本文全体をそのまま置く（分岐なし）。
 */
export function ApplyG6AcidDemonstrationFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS } = env;
    let w_MATK = [0,0,0];
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
			n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
			CS.n_PerfectHIT_DMG = 0;
			set_n_Enekyori(1);
			set_n_A_Weapon_zokusei(0);
			CS.wHITsuu = this.hitCount(n_A_ActiveSkillLV, attackMethodConfArray[0], n_A_WeaponType);

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
}

/**
 * G3（ヒール／ハイネスヒール共通）。本文全体をそのまま置く（分岐なし）。
 */
export function ApplyG3HealFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS } = env;
			CS.w_HIT = 100;
			CS.w_HIT_HYOUJI = 100;
			CS.n_PerfectHIT_DMG = 0;
			set_n_A_Weapon_zokusei(6);
			n_Delay[2] = this.DelayTimeCommon(n_A_ActiveSkillLV, charaData);
			set_n_Enekyori(2);
			if(n_A_ActiveSkill==489){
				CS.wCast = this.CastTimeVary(n_A_ActiveSkillLV, charaData);
				n_Delay[7] = this.CoolTime(n_A_ActiveSkillLV, charaData);
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
}

/**
 * G7（苦無投げ／八方苦無共通）。本文全体をそのまま置く（分岐なし）。
 */
export function ApplyG7KunaiNageFormula(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {
    const { CS, KunaiOBJ } = env;
			CS.n_PerfectHIT_DMG = 0;
			if (n_A_ActiveSkill == SKILL_ID_HAPPO_KUNAI) {
				CS.w_HIT_HYOUJI = 100;
				CS.w_HIT = 100;
			}
			set_n_Enekyori(1);
			CS.wbairitu = this.Power(n_A_ActiveSkillLV, charaData);
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
}
