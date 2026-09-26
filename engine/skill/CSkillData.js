import { SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO } from "./skill.dat.js";
import { GetActRateCritical } from "../bridge/battlecalc-bridge.js";
import { ITEM_SP_CRITICAL_DAMAGE_UP } from "../const/EnumItemSpId.js";
import { UsedSkillSearch } from "../bridge/skill-search-bridge.js";

/**
 * 各スキルの実質的な抽象クラスとして用いられるコンストラクタ関数.
 * CSkillManager.dataArray にインスタンスが格納され
 * CSkillManager.GetXXX( ) から各スキルのパラメータを取得出来る.
 *
 * CSkillManager.js から分離したモジュール（.claude/context/remaining-work.md
 * 「着手可能な小タスク」由来のリファクタリング、plan:
 * remining-work-md-cskillmanager-js-cskill-magical-elephant）。
 *
 * 既定値はすべて prototype 上にある。各スキル定義（defineSkill の initFn）は
 * 上書きしたいものだけを this に代入する＝インスタンス自身の own property が
 * prototype を隠す、という形でオーバーライドが成立する（旧実装の
 * `new function(){ CSkillData.call(this); ...}` と同じ見え方になる）。
 * range / element / hitCount / dispHitCount / LifeTime / damageInterval /
 * ground_installation の7スロットは「値でも関数でもよい」二面性を持ち、
 * CSkillManager 側が typeof === "function" で分岐する。
 */
export function CSkillData() {
}

// ---- 静的定数（旧実装ではコンストラクタ本体で毎回代入していた。ここへ巻き上げ） -------------
CSkillData.TYPE_PASSIVE = 1;
CSkillData.TYPE_ACTIVE = 2;
CSkillData.TYPE_PHYSICAL = 4;
CSkillData.TYPE_MAGICAL = 8;
CSkillData.TYPE_100HIT = 16;
CSkillData.TYPE_IRREGULAR_BATTLE_TIME = 32; // 戦闘時間が特殊になるフラグ。n_Delay[0] = 1 に対応
CSkillData.TYPE_UNKNOWN_DELAY_TIME = 64; // ディレイorクールタイム不明フラグ。n_Delay[0] = 2 に対応
CSkillData.TYPE_DIVHIT_FORMULA = 128; // 分割ヒット計算フラグ。n_bunkatuHIT == 1 に対応
CSkillData.TYPE_SG_SPECIAL_HITNUM = 256; // CS.SG_Special_HITnum（多段HIT一撃ダメージ表示用）に wHITsuu を反映するフラグ
CSkillData.TYPE_CAST_KOTEI = 512; // 詠唱時間が可変詠唱短縮の対象外であるフラグ。CS.cast_kotei = true に対応

CSkillData.RANGE_SHORT = 0;
CSkillData.RANGE_LONG = 1;
CSkillData.RANGE_MAGIC = 2;
CSkillData.RANGE_SPECIAL = 3; // レベルによって変化など。（グリムトゥース等）

CSkillData.ELEMENT_VOID = -1;
CSkillData.ELEMENT_FORCE_VANITY = 0;
CSkillData.ELEMENT_FORCE_WATER = 1;
CSkillData.ELEMENT_FORCE_EARTH = 2;
CSkillData.ELEMENT_FORCE_FIRE = 3;
CSkillData.ELEMENT_FORCE_WIND = 4;
CSkillData.ELEMENT_FORCE_POISON = 5;
CSkillData.ELEMENT_FORCE_HOLY = 6;
CSkillData.ELEMENT_FORCE_DARK = 7;
CSkillData.ELEMENT_FORCE_PSYCO = 8;
CSkillData.ELEMENT_FORCE_UNDEAD = 9;
CSkillData.ELEMENT_SPECIAL = 10; // 複合属性など。（ヘルインフェルノ等）

// ---- 既定データ値 -----------------------------------------------------------
CSkillData.prototype.id = 0;
CSkillData.prototype.refId = -1;
CSkillData.prototype.name = "";
CSkillData.prototype.kana = "";
CSkillData.prototype.maxLv = 0;
CSkillData.prototype.type = 0;
CSkillData.prototype.element = 0;
/** 地面設置スキルフラグ */
CSkillData.prototype.ground_installation = false;

/**
 * true の場合、BattleCalc999Core は個別の switch case を持たず、
 * このスキルの Power 等の slot 値だけで計算式（詠唱・ディレイ・倍率・ヒット数・
 * 属性・地面設置）が完結する汎用計算式パスへ流す
 * （engine/battle/skill-formula-physical.js・skill-formula-magical.js の default: 参照）。
 */
CSkillData.prototype.genericFormula = false;

/**
 * スキル固有の計算式. 既定は null（個別の計算式なし）.
 * シグネチャ: function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft)
 * env は engine/battle/skill-formula-env.js の CreateSkillFormulaEnv() が作る戦闘計算側の依存
 * （engine/skill/ から直接 import すると循環するもの）. 戻り値は使われない.
 * CSkillManager.ApplyXxxFormula() からメソッドとして呼ばれるため、本体中の this はこのスキル定義を指す.
 *   - PhysicalFormula: 物理基本計算式のパラメータ設定. 呼び出し後に共通の物理ダメージ計算が続く
 *   - SpecialFormula: 物理特殊計算式. w_DMG 等へ書き込み、ダメージ計算をこの中で完結させる
 *   - MagicalFormula: 魔法計算式のパラメータ設定. 呼び出し後に共通の魔法ダメージ計算が続く
 */
CSkillData.prototype.PhysicalFormula = null;
CSkillData.prototype.SpecialFormula = null;
CSkillData.prototype.MagicalFormula = null;

/**
 * 汎用計算パス（PhysicalFormula/MagicalFormula に乗らない genericFormula スキル）の中に
 * 直書きされていたスキルID分岐の移設先. 既定は null（分岐なし）. いずれも
 * CSkillManager.ApplyXxx() からメソッドとして呼ばれるため、本体中の this はこのスキル定義を指す.
 *   - PhysicalHitCountArray: function(env) => number[]|null.
 *     物理汎用パスの hitCountArray 決定に割り込む（null なら既定の [wHITsuu,wHITsuu,wHITsuu] を使う）
 *   - PhysicalDamageUnit: function(env, dmgUnit) => dmgUnit.
 *     物理汎用パスの「参照するATKを特定」箇所で dmgUnit を置き換える
 *   - MagicalMatkFilter: function(env, mobData, w_MATK) => void.
 *     魔法汎用パスのMATK算出直後、w_MATK を in-place で書き換える
 *   - MagicalSingleHitLoop: function(env, b, attackMethodConfArray) => void.
 *     魔法汎用パスの単発ダメージループ（b=0..2）内で毎回呼ばれる
 *   - MagicalDividedHitFormula: function(env, battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK, subnumvalue) => boolean.
 *     魔法汎用パスの分割HIT・elseブランチに割り込む。true を返した場合、既定の分割HIT計算を行わない
 *     （w_DMG/CS.Last_DMG_* への書き込みは呼び出し側で完結させる）
 */
CSkillData.prototype.PhysicalHitCountArray = null;
CSkillData.prototype.PhysicalDamageUnit = null;
CSkillData.prototype.MagicalMatkFilter = null;
CSkillData.prototype.MagicalSingleHitLoop = null;
CSkillData.prototype.MagicalDividedHitFormula = null;

// ---- 既定メソッド -----------------------------------------------------------
/**
 * スキルの距離属性値を取得する. オーバーライドされていない場合は CSkillData.RANGE_SHORT (近接物理タイプ) が返される.
 * @param {Number} weapon
 * @returns {Number}
 */
CSkillData.prototype.range = function(weapon) {
	return CSkillData.RANGE_SHORT;
}

/**
 * 装備中の武器種で使用できるスキルかどうか判定する. オーバーライドされていない場合は true が返される.
 * @param {Number} weapon
 * @returns {boolean}
 */
CSkillData.prototype.WeaponCondition = function(weapon) {
	return true;
}
CSkillData.prototype.CostVary = function(skillLv, charaDataManger) {
	return 0;
}
CSkillData.prototype.CostFixed = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * スキルの消費APを取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.CostAP = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * スキルのダメージ倍率％を取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.Power = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * スキルのヒット数を取得する. オーバーライドされていない場合は 1 が返される.
 * @param {Number} skillLv
 * @param {CAttackMethodConf} option
 * @param {Number} weapon
 * @returns {Number}
 */
CSkillData.prototype.hitCount = function(skillLv, option, weapon) {
	return 1;
}
/** 分割ヒット数を取得する. オーバーライドされていない場合は 1 が返される. */
CSkillData.prototype.dispHitCount = function(skillLv, charaDataManger, option, parentSkillId) {
	return 1;
}
/**
 * 変動詠唱をミリ秒で取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.CastTimeVary = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * 固定詠唱をミリ秒で取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.CastTimeFixed = function(skillLv, charaDataManger) {
	return 0;
}
CSkillData.prototype.CastTimeForce = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * スキルディレイをミリ秒で取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.DelayTimeCommon = function(skillLv, charaDataManger) {
	return 0;
}
/** モーションディレイ（秒）を強制上書きする. オーバーライドされていない場合は null（ASPD由来の既定値を変更しない）が返される. */
CSkillData.prototype.DelayTimeForceMotion = function(skillLv, charaDataManger) {
	return null;
}
CSkillData.prototype.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
	return 0;
}
CSkillData.prototype.DelayTimeSkillObject = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * スキルクールタイムをミリ秒で取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.CoolTime = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * スキルの効果時間をミリ秒で取得する. オーバーライドされていない場合は 0 が返される.
 * @param {Number} skillLv
 * @param {*} charaDataManger
 * @returns {Number}
 */
CSkillData.prototype.LifeTime = function(skillLv, charaDataManger) {
	return 0;
}
/**
 * 地面設置スキルのダメージ発生感覚をミリ秒で取得する.  オーバーライドされていない場合は 0 が返される.
 * @param {*} skillLv
 * @returns
 */
CSkillData.prototype.damageInterval = function(skillLv) {
	return 0;
}
// クリティカル発生率を取得（0:発生しない、100:等倍、etc...）
CSkillData.prototype.CriActRate = function(skillLv, charaData, specData, mobData) {

	if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
		return this._CriActRate100(skillLv, charaData, specData, mobData);
	}

	return 0;
}

CSkillData.prototype._CriActRate100 = function(skillLv, charaData, specData, mobData) {

	if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
		if ((this.type & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
			return 100;
		}
	}

	return GetActRateCritical(mobData);
};

// クリティカルダメージ上昇特性効果量を取得（0:無効、100:等倍、etc...）
CSkillData.prototype.CriDamageRate = function(skillLv, charaData, specData, mobData) {

	if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
		return this._CriDamageRate100(skillLv, charaData, specData, mobData);
	}

	return 0;
}

CSkillData.prototype._CriDamageRate100 = function(skillLv, charaData, specData, mobData) {

	if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
		if ((this.type & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
			return specData[ITEM_SP_CRITICAL_DAMAGE_UP] / 2;
		}
	}

	return specData[ITEM_SP_CRITICAL_DAMAGE_UP];
};

/**
 * スキルを発動させるために必要なカウンター上限
 * グラウンドブルームなどに設定する
 */
CSkillData.prototype.StackLimit = -1;

/**
 * スキルを1回使用するごとに蓄積するカウンターの数
 * アースドリルなどに設定する
 */
CSkillData.prototype.StackIncrement = 0;

/**
 * 1スキル分の定義を生成する。
 *
 * 旧実装の
 *     skillData = new function() { this.prototype = new CSkillData(); CSkillData.call(this); this.id = skillId; ...本体... };
 * と等価。initFn は素の function でなければならない（アロー不可 — アローだと initFn.call() で
 * this を差し替えられず、本体中の this.XXX = ... がインスタンスへ書き込まれなくなる）。
 * initFn.call(skillData) により、initFn 内の this は生成したインスタンスを指すため、
 *   - 本文中の this.XXX = ... はインスタンスの own property になる（＝prototype 既定を隠す）
 *   - 本文中の this.XXX = (a, b) => { ... } 形式（216箇所）のアローも
 *     旧 `new function(){}` と同じくインスタンスを this として捕捉する
 *   - 本文中から this._CriActRate100(...) / this._CriDamageRate100(...) を呼べる
 * という3点が旧実装と完全に一致する。
 *
 * @param {Number} id skill.dat.js の SKILL_ID_* 定数
 * @param {function(this:CSkillData): void} initFn
 * @returns {CSkillData}
 */
export function defineSkill(id, initFn) {
	const skillData = new CSkillData();
	skillData.id = id;
	initFn.call(skillData);
	return skillData;
}
