/**
 * 職業をまたいで共有されるスキル計算式の本文を置くファイル（G1〜G7）。
 * 各グループの前半（スキル固有の分岐）は各職業ファイルの hook に、
 * 後半の共有部分だけをここに置く。本文は移動元から無変換（原文の書式のまま）。
 */
import { n_A_ActiveSkill, w_DMG } from "../runtime/ro4-state.js";
import { MOB_CONF_DEBUF_ID_LEX_AETERNA, n_B_IJYOU } from "../monster/mobconfdebuf.js";
import {
    GetBattlerAtkPercentUp, ATKbaiJYOUSAN, ApplyPhysicalDamageRatio, ApplyMonsterDefence, GetFixedAppendAtk,
    ApplyPhysicalSkillDamageRatioChange, GetPerfectHitDamage, ApplyHitJudgeElementRatio,
    BuildCastAndDelayHtml, BuildBattleResultHtml
} from "../bridge/battlecalc-bridge.js";

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
