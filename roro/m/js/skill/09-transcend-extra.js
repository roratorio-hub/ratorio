/**
 * スキル定義 09-transcend-extra（SKILL_ID 278–306 / 29 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { n_A_BaseLV } from '../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ITEM_KIND_MUSICAL, ITEM_KIND_WHIP } from '../const/EnumItemKind.js';
import { ITEM_SP_ELEMENTAL } from '../const/EnumItemSpId.js';
import { GetEquippedTotalSPArrow } from '../foot-bridge.js';
import {
    SKILL_ID_ALCHEMY, SKILL_ID_ARRAW_VULKAN, SKILL_ID_BERSERK_PITCHER, SKILL_ID_BUKKOKEN, SKILL_ID_CART_BOOST_WS,
    SKILL_ID_CHASEWALK, SKILL_ID_GOSPEL, SKILL_ID_KATAMARI_SEIZO, SKILL_ID_LIFE_CONVERSION,
    SKILL_ID_MARIONET_CONTROL, SKILL_ID_MELTDOWN, SKILL_ID_MIND_BREAKER, SKILL_ID_MOKOKOHAZAN, SKILL_ID_OKANE_SEIZO,
    SKILL_ID_POTION_SYNAPSE, SKILL_ID_PRESSURE, SKILL_ID_PULSE_STRIKE, SKILL_ID_REJECT_SWORD, SKILL_ID_RENCHUHOGEKI,
    SKILL_ID_RENKIKO, SKILL_ID_SACRIFICE, SKILL_ID_SANDAN_DELAY_ZOKA, SKILL_ID_SOUL_BURN, SKILL_ID_SOUL_CHANGE,
    SKILL_ID_SOUL_COLECT, SKILL_ID_SPURT_ZYOTAI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_TEIOAPUCHAGI_IN_DASH,
    SKILL_ID_TOMAHAWKNAGE, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_VENOM_KNIFE
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// メルトダウン
		// ----------------------------------------------------------------
		// SKILL_ID_MELTDOWN
		defineSkill(SKILL_ID_MELTDOWN, function() {

			this.name = "メルトダウン";
			this.kana = "メルトタウン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// お金製造
		// ----------------------------------------------------------------
		// SKILL_ID_OKANE_SEIZO
		defineSkill(SKILL_ID_OKANE_SEIZO, function() {

			this.name = "お金製造";
			this.kana = "オカネセイソウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 塊製造
		// ----------------------------------------------------------------
		// SKILL_ID_KATAMARI_SEIZO
		defineSkill(SKILL_ID_KATAMARI_SEIZO, function() {

			this.name = "塊製造";
			this.kana = "カタマリセイソウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// カートブースト
		// ----------------------------------------------------------------
		// SKILL_ID_CART_BOOST_WS
		defineSkill(SKILL_ID_CART_BOOST_WS, function() {

			this.name = "カートブースト";
			this.kana = "カアトフウスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// 運命のタロットカード
		// ----------------------------------------------------------------
		// SKILL_ID_UNMEINO_TALOTCARD
		defineSkill(SKILL_ID_UNMEINO_TALOTCARD, function() {

			this.name = "運命のタロットカード";
			this.kana = "ウンメイノタロツトカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		}),

		// ----------------------------------------------------------------
		// プレッシャー
		// ----------------------------------------------------------------
		// SKILL_ID_PRESSURE
		defineSkill(SKILL_ID_PRESSURE, function() {

			this.name = "プレッシャー";
			this.kana = "フレツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サクリファイス
		// ----------------------------------------------------------------
		// SKILL_ID_SACRIFICE
		defineSkill(SKILL_ID_SACRIFICE, function() {

			this.name = "サクリファイス";
			this.kana = "サクリファイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		}),

		// ----------------------------------------------------------------
		// ゴスペル
		// ----------------------------------------------------------------
		// SKILL_ID_GOSPEL
		defineSkill(SKILL_ID_GOSPEL, function() {

			this.name = "ゴスペル";
			this.kana = "コスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * Math.floor((skillLv - 1) / 5);
			}

		}),

		// ----------------------------------------------------------------
		// チェイスウォーク(STR+)
		// ----------------------------------------------------------------
		// SKILL_ID_CHASEWALK
		defineSkill(SKILL_ID_CHASEWALK, function() {

			this.name = "チェイスウォーク(STR+)";
			this.kana = "チエイスウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// リジェクトソード
		// ----------------------------------------------------------------
		// SKILL_ID_REJECT_SWORD
		defineSkill(SKILL_ID_REJECT_SWORD, function() {

			this.name = "リジェクトソード";
			this.kana = "リシエクトソオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 猛虎硬爬山
		// ----------------------------------------------------------------
		// SKILL_ID_MOKOKOHAZAN
		defineSkill(SKILL_ID_MOKOKOHAZAN, function() {

			this.name = "猛虎硬爬山";
			this.kana = "モウココウハサン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 伏虎拳
		// ----------------------------------------------------------------
		// SKILL_ID_BUKKOKEN
		defineSkill(SKILL_ID_BUKKOKEN, function() {

			this.name = "伏虎拳";
			this.kana = "フツコケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 100 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 700 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		}),

		// ----------------------------------------------------------------
		// 連柱崩撃
		// ----------------------------------------------------------------
		// SKILL_ID_RENCHUHOGEKI
		defineSkill(SKILL_ID_RENCHUHOGEKI, function() {

			this.name = "連柱崩撃";
			this.kana = "レンチユウホウケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 + 100 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return Math.floor((skillLv + 1) / 2);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

		}),

		// ----------------------------------------------------------------
		// ソウルコレクト
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_COLECT
		defineSkill(SKILL_ID_SOUL_COLECT, function() {

			this.name = "ソウルコレクト";
			this.kana = "ソウルコレクト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// アローバルカン
		// ----------------------------------------------------------------
		// SKILL_ID_ARRAW_VULKAN
		defineSkill(SKILL_ID_ARRAW_VULKAN, function() {
			this.name = "アローバルカン";
			this.kana = "アロオハルカン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.WeaponCondition = function(weapon) {
				return [ITEM_KIND_WHIP, ITEM_KIND_MUSICAL].includes(weapon);
			}
			this.element = function(option) {
				return GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger) {
				let ratio = 500 + 100 * skillLv;
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.dispHitCount = function(skillLv, charaDataManger) {
				return 9;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1800 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 300;
			}
			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// 練気功
		// ----------------------------------------------------------------
		// SKILL_ID_RENKIKO
		defineSkill(SKILL_ID_RENKIKO, function() {

			this.name = "練気功";
			this.kana = "レンキコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マリオネットコントロール
		// ----------------------------------------------------------------
		// SKILL_ID_MARIONET_CONTROL
		defineSkill(SKILL_ID_MARIONET_CONTROL, function() {

			this.name = "マリオネットコントロール";
			this.kana = "マリオネツトコントロオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// ライフコンバージョン
		// ----------------------------------------------------------------
		// SKILL_ID_LIFE_CONVERSION
		defineSkill(SKILL_ID_LIFE_CONVERSION, function() {

			this.name = "ライフコンバージョン";
			this.kana = "ライフコンハアシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ソウルチェンジ
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_CHANGE
		defineSkill(SKILL_ID_SOUL_CHANGE, function() {

			this.name = "ソウルチェンジ";
			this.kana = "ソウルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// ソウルバーン
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_BURN
		defineSkill(SKILL_ID_SOUL_BURN, function() {

			this.name = "ソウルバーン";
			this.kana = "ソウルハアン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 15000 : 10000;
			}

		}),

		// ----------------------------------------------------------------
		// マインドブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_MIND_BREAKER
		defineSkill(SKILL_ID_MIND_BREAKER, function() {

			this.name = "マインドブレイカー";
			this.kana = "マイントフレイカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 3 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700 + 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アルケミー
		// ----------------------------------------------------------------
		// SKILL_ID_ALCHEMY
		defineSkill(SKILL_ID_ALCHEMY, function() {

			this.name = "アルケミー";
			this.kana = "アルケミイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ポーションシノプス
		// ----------------------------------------------------------------
		// SKILL_ID_POTION_SYNAPSE
		defineSkill(SKILL_ID_POTION_SYNAPSE, function() {

			this.name = "ポーションシノプス";
			this.kana = "ホオシヨンシノフス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// 連打掌修得時の三段掌ディレイ増加
		// ----------------------------------------------------------------
		// SKILL_ID_SANDAN_DELAY_ZOKA
		defineSkill(SKILL_ID_SANDAN_DELAY_ZOKA, function() {

			this.name = "連打掌修得時の三段掌ディレイ増加";
			this.kana = "レンタシヨウシユウトクシノサンタンシヨウテイレイソウカ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// トマホーク投げ
		// ----------------------------------------------------------------
		// SKILL_ID_TOMAHAWKNAGE
		defineSkill(SKILL_ID_TOMAHAWKNAGE, function() {

			this.name = "トマホーク投げ";
			this.kana = "トマホオクナケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

		// ----------------------------------------------------------------
		// パルスストライク
		// ----------------------------------------------------------------
		// SKILL_ID_PULSE_STRIKE
		defineSkill(SKILL_ID_PULSE_STRIKE, function() {

			this.name = "パルスストライク";
			this.kana = "ハルスストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// バーサクピッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_BERSERK_PITCHER
		defineSkill(SKILL_ID_BERSERK_PITCHER, function() {

			this.name = "バーサークピッチャー";
			this.kana = "ハアサアクヒツチヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ティオアプチャギ(ダッシュ中)
		// ----------------------------------------------------------------
		// SKILL_ID_TEIOAPUCHAGI_IN_DASH
		defineSkill(SKILL_ID_TEIOAPUCHAGI_IN_DASH, function() {

			this.refId = SKILL_ID_TEIOAPUCHAGI;
			this.name = "ティオアプチャギ(ダッシュ中)";
			this.kana = "テイオアフチヤキタツシユチユウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var spurt = 0;
				var wpn = 0;

				// 基本式
				pow = 4 * charaDataManger.GetCharaBaseLv();

				// 「テコンキッド スパート状態」の効果
				spurt = charaDataManger.UsedSkillSearch(SKILL_ID_SPURT_ZYOTAI);
				wpn = charaDataManger.GetWeaponType();
				if ((spurt > 0) && (wpn == 0)) {
					pow *= 2;
				}

				return pow;
			}

		}),

		// ----------------------------------------------------------------
		// ベナムナイフ
		// ----------------------------------------------------------------
		// SKILL_ID_VENOM_KNIFE
		defineSkill(SKILL_ID_VENOM_KNIFE, function() {

			this.name = "ベナムナイフ";
			this.kana = "ヘナムナイフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		}),

];
