/**
 * スキル定義 swordman/4a-rune-knight（21 件 / SKILL_ID 439〜794 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { EQUIP_REGION_ID_ARMS } from '../../const/EnumEquipRegionId.js';
import { ITEM_DATA_INDEX_WEIGHT } from '../../const/EnumItemDataIndex.js';
import { ItemObjNew } from '../../item.dat.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../../mobconfplayer.js';
import { n_A_Equip } from '../../roro-state.js';
import { LearnedSkillSearch, UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_AVANDANCE, SKILL_ID_CRUSH_STRIKE, SKILL_ID_DEATH_BOUND, SKILL_ID_DRAGONIC_AURA_STATE,
    SKILL_ID_DRAGON_HOWLING, SKILL_ID_DRAGON_TRAINING, SKILL_ID_ENCHANT_BLADE, SKILL_ID_FIGHTING_SPIRIT,
    SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_GIANT_GROWTH, SKILL_ID_HANDRED_SPEAR, SKILL_ID_IGNITION_BREAK,
    SKILL_ID_MILLENNIUM_SHIELD, SKILL_ID_PHANTOM_SLAST, SKILL_ID_REFRESH, SKILL_ID_RUNE_MASTERY, SKILL_ID_SONIC_WAVE,
    SKILL_ID_SPIRAL_PIERCE, SKILL_ID_STONE_HARD_SKIN, SKILL_ID_STORM_BLAST, SKILL_ID_VITARITY_ACTIVATION,
    SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WIND_CUTTER, SKILL_ID_YARI_SHUREN
} from '../../skill.dat.js';

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
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100)

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1000 : 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 2000 : 200;
			}

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
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

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
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

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
			this.Power = function(skillLv, charaDataManger) {
				let pow = 0;
				// 基本式
				const sklLvRuneMastery = Math.max(LearnedSkillSearch(SKILL_ID_RUNE_MASTERY), UsedSkillSearch(SKILL_ID_RUNE_MASTERY));
				pow += 100 * sklLvRuneMastery;
				pow += 100 * Math.floor(charaDataManger.GetCharaInt() / 8);
				return pow;
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
				return -1;
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
		}),

];
