import { SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO } from './skill.dat.js';
import { GetActRateCritical } from '../../../ro4/m/js/head-bridge.js';
import { ITEM_SP_CRITICAL_DAMAGE_UP } from './const/EnumItemSpId.js';
import { UsedSkillSearch } from './skill-search-bridge.js';

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
/** 分割ヒット数を取得する. オーバーライドされていない場合は 0 が返される. */
CSkillData.prototype.dispHitCount = function(skillLv, charaDataManger, option, parentSkillId) {
	return 0;
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
CSkillData.prototype.DelayTimeForceMotion = function(skillLv, charaDataManger) {
	return 0;
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
