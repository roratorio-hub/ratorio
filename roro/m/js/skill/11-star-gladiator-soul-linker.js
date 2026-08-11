/**
 * スキル定義 11-star-gladiator-soul-linker（SKILL_ID 347–384 / 38 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import { MONSTER_BOSSTYPE_BOSS } from '../const/EnumMonsterBossType.js';
import { SIZE_ID_SMALL } from '../const/EnumSizeId.js';
import { MONSTER_ID_PLAYER } from '../monster.dat.js';
import {
    SKILL_ID_CLOSE_CONFINE, SKILL_ID_ESKA, SKILL_ID_ESKU, SKILL_ID_ESMA, SKILL_ID_ESTIN, SKILL_ID_ESTON,
    SKILL_ID_ESU, SKILL_ID_HOSHINO_ANRAKU, SKILL_ID_HOSHINO_IKARI, SKILL_ID_HOSHINO_NUKUMORI,
    SKILL_ID_HOSHINO_SHUKUFUKU, SKILL_ID_KAAHI, SKILL_ID_KAINA, SKILL_ID_KAISEL, SKILL_ID_KAITO, SKILL_ID_KAUPU,
    SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_SHIELD_BOOMERANG_TAMASHI, SKILL_ID_SHUKUFUKU, SKILL_ID_SONIC_ACCELERATION,
    SKILL_ID_SPURT_ZYOTAI, SKILL_ID_SUNKEI, SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TAIYONO_IKARI,
    SKILL_ID_TAIYONO_NUKUMORI, SKILL_ID_TAIYONO_SHUKUFUKU, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO,
    SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, SKILL_ID_TSUKINO_ANRAKU, SKILL_ID_TSUKINO_IKARI,
    SKILL_ID_TSUKINO_NUKUMORI, SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// 太陽と月と星の感情
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO, function() {

			this.name = "太陽と月と星の感情";
			this.kana = "タイヨウトツキトホシノカンシヨウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽の温もり
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_NUKUMORI
		defineSkill(SKILL_ID_TAIYONO_NUKUMORI, function() {

			this.name = "太陽の温もり";
			this.kana = "タイヨウノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		}),

		// ----------------------------------------------------------------
		// 月の温もり
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_NUKUMORI
		defineSkill(SKILL_ID_TSUKINO_NUKUMORI, function() {

			this.name = "月の温もり";
			this.kana = "ツキノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		}),

		// ----------------------------------------------------------------
		// 星の温もり
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_NUKUMORI
		defineSkill(SKILL_ID_HOSHINO_NUKUMORI, function() {

			this.name = "星の温もり";
			this.kana = "ホシノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の憎しみ
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI, function() {

			this.name = "太陽と月と星の憎しみ";
			this.kana = "タイヨウトツキトホシノニクシミ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽の怒り
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_IKARI
		defineSkill(SKILL_ID_TAIYONO_IKARI, function() {

			this.name = "太陽の怒り";
			this.kana = "タイヨウノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 月の怒り
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_IKARI
		defineSkill(SKILL_ID_TSUKINO_IKARI, function() {

			this.name = "月の怒り";
			this.kana = "ツキノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 星の怒り
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_IKARI
		defineSkill(SKILL_ID_HOSHINO_IKARI, function() {

			this.name = "星の怒り";
			this.kana = "ホシノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽の安楽
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_ANRAKU
		defineSkill(SKILL_ID_TAIYONO_ANRAKU, function() {

			this.name = "太陽の安楽";
			this.kana = "タイヨウノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 月の安楽
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKINO_ANRAKU
		defineSkill(SKILL_ID_TSUKINO_ANRAKU, function() {

			this.name = "月の安楽";
			this.kana = "ツキノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 星の安楽
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_ANRAKU
		defineSkill(SKILL_ID_HOSHINO_ANRAKU, function() {

			this.name = "星の安楽";
			this.kana = "ホシノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽の祝福
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYONO_SHUKUFUKU
		defineSkill(SKILL_ID_TAIYONO_SHUKUFUKU, function() {

			this.name = "太陽の祝福";
			this.kana = "タイヨウノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 月の祝福
		// ----------------------------------------------------------------
		// SKILL_ID_TSUKUNO_SHUKUFUKU
		defineSkill(SKILL_ID_TSUKUNO_SHUKUFUKU, function() {

			this.name = "月の祝福";
			this.kana = "ツキノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 星の祝福
		// ----------------------------------------------------------------
		// SKILL_ID_HOSHINO_SHUKUFUKU
		defineSkill(SKILL_ID_HOSHINO_SHUKUFUKU, function() {

			this.name = "星の祝福";
			this.kana = "ホシノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の悪魔
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, function() {

			this.name = "太陽と月と星の悪魔";
			this.kana = "タイヨウトツキトホシノアクマ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の友
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO, function() {

			this.name = "太陽と月と星の友";
			this.kana = "タイヨウトツキトホシノトモ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の知識
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI, function() {

			this.name = "太陽と月と星の知識";
			this.kana = "タイヨウトツキトホシノチシキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の融合
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, function() {

			this.name = "太陽と月と星の融合";
			this.kana = "タイヨウトツキトホシノユウコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の奇跡
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, function() {

			this.name = "太陽と月と星の奇跡";
			this.kana = "タイヨウトツキトホシノキセキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 太陽と月と星の天使
		// ----------------------------------------------------------------
		// SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI
		defineSkill(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI, function() {

			this.name = "太陽と月と星の天使";
			this.kana = "タイヨウトツキトホシノテンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ～の祝福(経験値増加率)
		// ----------------------------------------------------------------
		// SKILL_ID_SHUKUFUKU
		defineSkill(SKILL_ID_SHUKUFUKU, function() {

			this.name = "～の祝福(経験値増加率)";
			this.kana = "シユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// カイゼル
		// ----------------------------------------------------------------
		// SKILL_ID_KAISEL
		defineSkill(SKILL_ID_KAISEL, function() {

			this.name = "カイゼル";
			this.kana = "カイセル";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 130 - 10 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return (skillLv >= 5) ? 2500 : (5000 - 500 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// カアヒ
		// ----------------------------------------------------------------
		// SKILL_ID_KAAHI
		defineSkill(SKILL_ID_KAAHI, function() {

			this.name = "カアヒ";
			this.kana = "カアヒ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// カウプ
		// ----------------------------------------------------------------
		// SKILL_ID_KAUPU
		defineSkill(SKILL_ID_KAUPU, function() {

			this.name = "カウプ";
			this.kana = "カウフ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// カイト
		// ----------------------------------------------------------------
		// SKILL_ID_KAITO
		defineSkill(SKILL_ID_KAITO, function() {

			this.name = "カイト";
			this.kana = "カイト";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// カイナ
		// ----------------------------------------------------------------
		// SKILL_ID_KAINA
		defineSkill(SKILL_ID_KAINA, function() {
			this.name = "カイナ";
			this.kana = "カイナ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// エスティン
		// ----------------------------------------------------------------
		// SKILL_ID_ESTIN
		defineSkill(SKILL_ID_ESTIN, function() {

			this.name = "エスティン";
			this.kana = "エステイン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 10 * skillLv;

				// 小型以外には効果激減
				if (charaDataManger.GetMobSize() != SIZE_ID_SMALL) {
					pow = 1;
				}

				// プレイヤーには効果なし
				if (charaDataManger.GetMobId() == MONSTER_ID_PLAYER) {
					pow = 0;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// エストン
		// ----------------------------------------------------------------
		// SKILL_ID_ESTON
		defineSkill(SKILL_ID_ESTON, function() {

			this.name = "エストン";
			this.kana = "エストン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 5 * skillLv;

				// プレイヤーには効果なし
				if (charaDataManger.GetMobId() == MONSTER_ID_PLAYER) {
					pow = 0;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// エスマ
		// ----------------------------------------------------------------
		// SKILL_ID_ESMA
		defineSkill(SKILL_ID_ESMA, function() {

			this.name = "エスマ";
			this.kana = "エスマ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + charaDataManger.GetCharaBaseLv();
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// エスウ
		// ----------------------------------------------------------------
		// SKILL_ID_ESU
		defineSkill(SKILL_ID_ESU, function() {

			this.name = "エスウ";
			this.kana = "エスウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 85 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エスカ
		// ----------------------------------------------------------------
		// SKILL_ID_ESKA
		defineSkill(SKILL_ID_ESKA, function() {

			this.name = "エスカ";
			this.kana = "エスカ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エスク
		// ----------------------------------------------------------------
		// SKILL_ID_ESKU
		defineSkill(SKILL_ID_ESKU, function() {

			this.name = "エスク";
			this.kana = "エスク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// タイリギスパート状態(STR+状態)
		// ----------------------------------------------------------------
		// SKILL_ID_SPURT_ZYOTAI
		defineSkill(SKILL_ID_SPURT_ZYOTAI, function() {

			this.name = "タイリギスパート状態(STR+状態)";
			this.kana = "タイリキスハアトシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 自分以外のPT人数(ファイト用)
		// ----------------------------------------------------------------
		// SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT
		defineSkill(SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT, function() {

			this.name = "自分以外のPT人数(ファイト用)";
			this.kana = "シフンイカイノハアテイイニンスウフアイトヨウ";
			this.maxLv = 11;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ソニックアクセラレーション
		// ----------------------------------------------------------------
		// SKILL_ID_SONIC_ACCELERATION
		defineSkill(SKILL_ID_SONIC_ACCELERATION, function() {

			this.name = "ソニックアクセラレーション";
			this.kana = "ソニツクアクセラレエシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 寸勁
		// ----------------------------------------------------------------
		// SKILL_ID_SUNKEI
		defineSkill(SKILL_ID_SUNKEI, function() {

			this.name = "寸勁";
			this.kana = "スンケイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// クローズコンファイン
		// ----------------------------------------------------------------
		// SKILL_ID_CLOSE_CONFINE
		defineSkill(SKILL_ID_CLOSE_CONFINE, function() {

			this.name = "クローズコンファイン";
			this.kana = "クロオスコンフアイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

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

		}),

];
