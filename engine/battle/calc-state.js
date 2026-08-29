/**
 * battlecalc.js のダメージ計算（BattleCalc999Core）用スクラッチ状態。
 *
 * 1 回のダメージ計算中だけ有効な作業変数で、物理スキル基本/特殊計算式・
 * 魔法判定スキルの各計算式ブロック（`head-skill-formula-*.js` として分割予定）と
 * battlecalc.js 本体の両方から読み書きされる。ESM では import した束縛に代入できないため
 * 単純な `export let` では共有できず、1 つのオブジェクトへ集約している。
 *
 * battlecalc.js 外からは一切参照されない（battlecalc.js とその分割先だけが import する）。
 * `export let` + `set_XXX()` という他ファイルの通例からは意図的に外れている
 * （`wbairitu += x` のような複合代入が700箇所以上あり、セッター呼び出しへの
 * 書き換えは差分が大きくなりすぎるため）。
 *
 * 各プロパティの説明は battlecalc.js の元 `let` 宣言に付いていた JSDoc を引き継いでいる。
 */
export const CS = {
    /** レックスエーテルナの計算に係るフラグ. 解析不足でロジックが追えてない. */
    wLAch: false,
    /** 計算結果の補足文字列. 既に使われていない可能性がある */
    str_bSUBname: "",
    /** 計算結果の補足文字列. 既に使われていない可能性がある */
    str_bSUB: "",
    /** 詠唱短縮が無視されるフラグ */
    cast_kotei: false,
    /** 必中ダメージ. 號砲 などの計算式に含まれるもの */
    n_PerfectHIT_DMG: 0,
    /** 固定詠唱 */
    n_KoteiCast: 0,
    /** 変動詠唱 */
    wCast: 0,
    /** スキル倍率％ */
    wbairitu: 100,
    /** 必中ダメージ */
    str_PerfectHIT_DMG: 0,
    /** ダメージ配列 */
    Last_DMG_A: [0,0,0],
    /** ダメージ配列 */
    Last_DMG_B: [0,0,0],
    /** スキル使用条件判定フラグ 武器種 */
    n_Buki_Muri: false,
    /** ダメージ判定無しフラグ */
    g_bSkillNoDamage: false,
    /** MDEF計算モードフラグ. 一部の魔法では除算MDEFが除算として機能しない */
    directSubtractionMdef: false,
    /** オートスペルフラグ */
    n_AS_MODE: false,
    /** 武器属性 */
    BK_Weapon_zokusei: 0,
    /** 攻撃手段のオプション値 */
    option_count: 0,
    /** ダメージ配列. デスバウンド用 */
    n_DEATH_BOUND: [0,0,0,0],
    /** 対象の除算DEF */
    B_Total_DEF: 0,
    /** 対象の除算MDEF */
    B_Total_MDEF: 0,
    /** ダメージ配列 */
    n_A_DMG: [0,0,0],
    /** ダメージ配列. 変数名と裏腹にアースクエイク計算で使われている */
    n_A_DMG_GX: [0,0,0],
    /** ダメージ配列. ウォーグ専用 */
    BK_n_A_DMG_Wolf: [0,0,0],
    /** グランドクロスの反動ダメージ計算フラグ */
    n_A_GX_HANDO: false,
    /** ヒット数 特殊計算用 */
    SG_Special_HITnum: 0,
    /** ヒット数 */
    wHITsuu: 0,
    /** 分割ヒット数 */
    wActiveHitNum: 0,
    /** 分割ヒットフラグ */
    n_bunkatuHIT: 0,
    /** ダメージ配列 特殊計算用 */
    SG_Special_DMG: [0,0,0],
    /** ダメージ表示部のテキスト配列（最小、平均、最大）. 旧 InnStr での組み立てから、３桁区切り対応で部分改造 */
    g_damageTextArray: [[],[],[]],
    /** ヒット数配列 */
    g_wHITsuu_Array: null,
    /** 命中率 */
    w_HIT: 0,
    /** 命中率　表示文字列 */
    w_HIT_HYOUJI: 0,
    /** サイズ補正値 */
    wCSize: 0,
    /** クリティカル発生時のATK */
    n_A_CriATK: 0,
};
