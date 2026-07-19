// === AUTO-GENERATED IMPORTS ===
import { g_constDataManager } from './global.js';
import { RegisterUsedSkillSearch } from '../../../roro/m/js/CSkillManager.js';
import { CCharaConfIchizi } from '../../../roro/m/js/CCharaConfIchizi.js';
import { CCharaConfNizi } from '../../../roro/m/js/CCharaConfNizi.js';
import { CCharaConfSanzi } from '../../../roro/m/js/CCharaConfSanzi.js';
import {
         CARD_ID_HENI_CHIMERA_GALENSIS, CARD_ID_KONTONNO_SIDEWINDER, CARD_ID_SIDEWINDER,
         CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_SPELL_FIST_1
} from '../../../roro/m/js/card.dat.js';
import { CardNumSearch, EquipNumSearch, TimeItemNumSearch } from '../../../roro/m/js/chara.js';
import { CARD_REGION_ID_HEAD_TOP_ANY } from '../../../roro/m/js/common.js';
import {
         ITEM_ID_CIRCUIT_BOARD_OS, ITEM_ID_HIYOKOCHAN, ITEM_ID_HIYOKOCHAN_RENTAL,
         ITEM_ID_NEIGAN, ITEM_ID_STUFF_OF_PUFFY, ITEM_ID_TOTONO_SHO,
         ITEM_ID_TOTONO_SHO_T1, ITEM_ID_ZINBAORI, ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA,
         ITEM_SET_ID_VALENTINE_BO_HANTAIHANO_AKASHI
} from '../../../roro/m/js/item.dat.js';
import { IsGunSeriesArms } from '../../../roro/m/js/item.h.js';
import { LearnedSkillSearch } from '../../../roro/m/js/learnedskill.js';
import {
         TIME_ITEM_ID_BLUE_RIBBON, TIME_ITEM_ID_DARK_TRIAD,
         TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_SHADOW_CHASER_2,
         TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3,
         TIME_ITEM_ID_GULARUSION_UNLIMIT,
         TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_TELECHINESIS_INSTENCE,
         TIME_ITEM_ID_JITTER_BUG, TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT,
         TIME_ITEM_ID_TRAVELER_RING_GOKETSU, TIME_ITEM_ID_TRIANGLE_DISASTER,
         TIME_ITEM_ID_URUNO_KAGO, TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO
} from '../../../roro/m/js/timeitem.dat.js';
import {
         SKILL_ID_AURA_BLADE, SKILL_ID_BERSERK, SKILL_ID_CHAIN_ACTION,
         SKILL_ID_DOUBLE_ATTACK, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_KONGO,
         SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_OVER_TRUST_MAX, SKILL_ID_SANDANSHO,
         SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TRUE_SIGHT,
         SKILL_ID_UNLIMIT
} from '../../../roro/m/js/skill.dat.js';
// === END AUTO-GENERATED IMPORTS ===
// C-6: 共有 state 追加分
import {
         n_A_JOB,
} from '../../../roro/m/js/roro-state.js';

// C-6: global.js 管理の共有 conf state
import {
         g_confDataIchizi, g_confDataNizi, g_confDataSanzi,
} from './global.js';

// C-6: 共有 state（旧 foot.js window 変数）
import {
         n_A_WeaponType, n_A_HEAD_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon_ATKplus,
} from '../../../roro/m/js/roro-state.js';

"use strict"

export const BUFF_CONF_SELF_LIMIT    = 51;
export const BUFF_CONF_MUSICAL_LIMIT = 47;
export const BUFF_CONF_GUILD_LIMIT   = 36;
export const BUFF_CONF_FOOD_LIMIT    = 53;
export const BUFF_CONF_OTHER_LIMIT   = 28;

/** 職固有自己支援 設定値の配列 */
export let n_A_PassSkill  = Array(BUFF_CONF_SELF_LIMIT).fill(0);
/**
 * 一次職支援（音楽・ダンス） 設定値の配列
 * 「演奏/踊り系スキル」ウィンドウは機能削除済みのため常にゼロ固定。
 * 旧セーブデータ（SaveData[448-508] / CSaveDataUnitSkillBuffMusic）の
 * フォーマット互換（保存側の位置埋め）のためだけに残している。
 */
export let n_A_PassSkill3 = Array(BUFF_CONF_MUSICAL_LIMIT).fill(0);
/** ギルド・ゴスペル 設定値の配列 */
export let n_A_PassSkill4 = Array(BUFF_CONF_GUILD_LIMIT).fill(0);
/** アイテム・食品他 設定値の配列 */
export let n_A_PassSkill7 = Array(BUFF_CONF_FOOD_LIMIT).fill(0);
/** キャラクタ設定（その他） 設定値の配列 */
export let n_A_PassSkill8 = Array(BUFF_CONF_OTHER_LIMIT).fill(0);

/** マヌクの意思 インデックス（n_A_PassSkill7 用） */
export const ID_BUFF_MANUK_ISHI   = 31;
/** ルシオラヴェスパのハチ蜜 インデックス（n_A_PassSkill7 用） */
export const ID_BUFF_VESPER_HONEY = 34;

/**
 * 有効化されている「職固有自己支援」と「アイテム時限効果」の設定Lvを取得する
 * 「一次職支援設定」から「四次職支援設定」までの情報はサーチされない
 * @param {*} sklId 確認するスキル
 * @param {*} bOnlyUsed true: 時限アイテム効果等も検索する / false: 職業スキルだけを検索する(default)
 * @returns 設定されているLv
 */
export function UsedSkillSearch(sklId, bOnlyUsed = false) {
	let sklLv = 0;
	let effectivLvArray = [0];
	let bAvoidRecalc = false;
	// スキル欄のみの場合
	if (bOnlyUsed) {
		return UsedSkillSearchSubUsedOnly(sklId);
	}
	// 時限アイテム欄等で指定するスキル
	switch (sklId) {
		// バーサーク
		case SKILL_ID_BERSERK:
			if (TimeItemNumSearch(35)) effectivLvArray.push(1);
			if (TimeItemNumSearch(111)) effectivLvArray.push(1);
			break;
		// オーバートラストマックス
		case SKILL_ID_OVER_TRUST_MAX:
			if (TimeItemNumSearch(112)) effectivLvArray.push(5);
			break;
		// 魔法力増幅
		case SKILL_ID_MAHORYOKU_ZOFUKU:
			if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU]) > 0) {
				effectivLvArray.push(sklLv);
			}
			if (TimeItemNumSearch(113)) effectivLvArray.push(5);
			break;
		// オーラブレイド
		case SKILL_ID_AURA_BLADE:
			if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_AURA_BLADE]) > 0) {
				effectivLvArray.push(sklLv);
			}
			break;
		// トゥルーサイト
		case SKILL_ID_TRUE_SIGHT:
			if (TimeItemNumSearch(TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT)) {
				effectivLvArray.push(2);
			}
			if (TimeItemNumSearch(TIME_ITEM_ID_JITTER_BUG)) {
				effectivLvArray.push(1);
			}
			break;
		// 金剛
		case SKILL_ID_KONGO:
			if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_KONGO]) > 0) {
				effectivLvArray.push(sklLv);
			}
			break;
		// 集中力向上
		case SKILL_ID_SHUCHURYOKU_KOZYO: {
			let bufLv = g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO];
			if (TimeItemNumSearch(TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO) > 0){
				effectivLvArray.push(5);
			} else if (bufLv > 0) {
				effectivLvArray.push(bufLv);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_BLUE_RIBBON) > 0) {
				effectivLvArray.push(2);
			} else if (TimeItemNumSearch(4) > 0) {
				effectivLvArray.push(1);
			}
			break;
		}
		// アンリミット
		case SKILL_ID_UNLIMIT: {
			let bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_UNLIMIT];
			if (bufLv > 0) {
				effectivLvArray.push(bufLv);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_GULARUSION_UNLIMIT) > 0) {
				effectivLvArray.push(5);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_TRAVELER_RING_GOKETSU) > 0) {
				effectivLvArray.push(5);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_DARK_TRIAD) > 0) {
				effectivLvArray.push(5);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_URUNO_KAGO) > 0) {
				effectivLvArray.push(5);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3) > 0) {
				effectivLvArray.push(5);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_TRIANGLE_DISASTER) > 0) {
				effectivLvArray.push(5);
			} else if (TimeItemNumSearch(TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_SHADOW_CHASER_2) > 0) {
				effectivLvArray.push(5);
			}
			break;
		}
		// テレキネシスインテンス
		case SKILL_ID_TELECHINESIS_INSTENCE:
			if (TimeItemNumSearch(TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_TELECHINESIS_INSTENCE) > 0) {
				effectivLvArray.push(3);
			}
			break;
		// 三段掌
		case SKILL_ID_SANDANSHO:

			// 「陣羽織」による、追加発動効果
			if (EquipNumSearch(ITEM_ID_ZINBAORI)) {

				if (n_A_SHOULDER_DEF_PLUS >= 9) {
					effectivLvArray.push(10);
				}
				else if (n_A_SHOULDER_DEF_PLUS >= 7) {
					effectivLvArray.push(5);
				}
				else {
					effectivLvArray.push(3);
				}
			}

			// 「混沌のサイドワインダーカード」による、追加発動効果
			if (CardNumSearch(CARD_ID_KONTONNO_SIDEWINDER)) {
				effectivLvArray.push(5);
			}

			// 「変異キメラガレンシスカード」による、追加発動効果
			if (CardNumSearch(CARD_ID_HENI_CHIMERA_GALENSIS, CARD_REGION_ID_HEAD_TOP_ANY)) {
				effectivLvArray.push(n_A_HEAD_DEF_PLUS);
			}
			break;
		// ダブルアタック
		case SKILL_ID_DOUBLE_ATTACK:

			// 「サイドワインダーカード」の効果
			if (CardNumSearch(CARD_ID_SIDEWINDER)) {
				effectivLvArray.push(1);
			}

			// 「ひよこちゃん」の効果
			if (EquipNumSearch(ITEM_ID_HIYOKOCHAN)) {
				effectivLvArray.push(2);
			}

			// 「[レンタル] ひよこちゃん」の効果
			if (EquipNumSearch(ITEM_ID_HIYOKOCHAN_RENTAL)) {
				effectivLvArray.push(2);
			}

			// 「バレンタイン帽　反対派の証セット」の効果
			if (EquipNumSearch(ITEM_SET_ID_VALENTINE_BO_HANTAIHANO_AKASHI)) {
				effectivLvArray.push(2);
			}

			// 「彷徨う者の羽織　傘セット」の効果
			if (EquipNumSearch(ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA)) {
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					effectivLvArray.push(5);
				}
				else {
					effectivLvArray.push(2);
				}
			}

			// 「バレンタイン帽　反対派の証セット」の効果
			if (EquipNumSearch(ITEM_ID_NEIGAN)) {
				effectivLvArray.push(5);
			}

			// 「陣羽織」の効果
			if (EquipNumSearch(ITEM_ID_ZINBAORI)) {
				if (n_A_SHOULDER_DEF_PLUS >= 9) {
					effectivLvArray.push(10);
				}
				else if (n_A_SHOULDER_DEF_PLUS >= 7) {
					effectivLvArray.push(5);
				}
				else {
					effectivLvArray.push(3);
				}
			}

			// 「スタッフオブパフィ」の効果
			if (EquipNumSearch(ITEM_ID_STUFF_OF_PUFFY)) {
				if (n_A_Weapon_ATKplus >= 10) {
					effectivLvArray.push(3);
				}
			}

			// 「頭フィーリル　浮遊する賢者セット」の追加発動の効果
			if (TimeItemNumSearch(71)) {
				effectivLvArray.push(10);
			}

			// 「サーキットボード-OS」の効果
			if (EquipNumSearch(ITEM_ID_CIRCUIT_BOARD_OS)) {
				if (n_A_Weapon_ATKplus >= 10) {
					effectivLvArray.push(10);
				}
			}

			// 「トートの書」の効果
			if (EquipNumSearch(ITEM_ID_TOTONO_SHO) || EquipNumSearch(ITEM_ID_TOTONO_SHO_T1)) {
				effectivLvArray.push(10);
			}

			// 「潜在覚醒(スペルフィストI)」の効果
			if (CardNumSearch(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_SPELL_FIST_1) > 0) {
				effectivLvArray.push(10);
			}

			// 「分身」スキルの効果
			if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_BUNSHIN] > 0) {
				effectivLvArray.push(2 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_BUNSHIN]);
			}

			// 「チェーンアクション」スキルの効果
			sklLv = Math.max(LearnedSkillSearch(SKILL_ID_CHAIN_ACTION), UsedSkillSearch(SKILL_ID_CHAIN_ACTION));
			if ((n_A_WeaponType == ITEM_KIND_HANDGUN) && (sklLv > 0)) {
				effectivLvArray.push(sklLv);
			}

			// 「エターナルチェーン」スキルの効果
			sklLv = UsedSkillSearch(SKILL_ID_ETERNAL_CHAIN);
			if (IsGunSeriesArms(n_A_WeaponType) && (sklLv > 0)) {
				effectivLvArray.push(sklLv);
			}

			// 「ダブルアタック」スキルの効果
			sklLv = Math.max(LearnedSkillSearch(SKILL_ID_DOUBLE_ATTACK), UsedSkillSearch(SKILL_ID_DOUBLE_ATTACK, true));
			if ((n_A_WeaponType == ITEM_KIND_KNIFE) && (sklLv > 0)) {
				effectivLvArray.push(sklLv);
			}

			// 再計算回避フラグを立てる
			bAvoidRecalc = true;

			break;
	}
	// 再計算回避フラグが立っていなければ、通常スキル欄を追加
	if (!bAvoidRecalc) {
		effectivLvArray.push(UsedSkillSearchSubUsedOnly(sklId));
	}
	// 最大レベルを返す
	return effectivLvArray.reduce(
		function(a, b) {
 	   		return Math.max(a, b);
		});
}

/**
 * 有効化されている「職固有自己支援」の設定Lvを取得する.
 * @param {Number} sklId 確認するスキル
 * @returns {Number} 設定されているLv. 異常な値がセットされている場合は何も返さない.
 */
// CSkillManager のスキル計算式から呼べるように注入する（循環 import 回避・上記 import 参照）
RegisterUsedSkillSearch(UsedSkillSearch);

export function UsedSkillSearchSubUsedOnly(sklId) {
	// 設定可能な全ての職固有自己支援スキルを取得する
	const passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();
	for (let idx = 0; idx < passiveSkillIdArray.length; idx++) {
		if(passiveSkillIdArray[idx] == sklId) {
			// 指定されたスキルIDが見つかったとき
			if (n_A_PassSkill[idx] !== undefined && !isNaN(n_A_PassSkill[idx])) {
				// 該当のスキルLvがundefinedでもNaNでもなければ習得済みLvを返す
				return n_A_PassSkill[idx];
			}
		}
	}
	return 0;
}

