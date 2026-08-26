/**
 * `CExtraInfoAreaComponentManager.js` から抽出した、DOM非依存の純粋な計算部分.
 *
 * リファクタリング計画Phase 12: 拡張情報パネル（`RefreshDispAreaXXX`系）の各メソッドは
 * 「DOM入力の取得 → 計算 → HTML組み立て」という構造を持つ。このうち計算部分のみを
 * ここへ抽出し、DOM要素・`this`（`managerInstanceId`等）に触れない純粋関数として
 * テスト可能にする。呼び出し元（`CExtraInfoAreaComponentManager.js`）は、従来DOMから
 * 直接読んでいた値を先に読み取ってから引数として渡し、返り値を従来と同じローカル変数名へ
 * 展開する形に変更されている（計算ロジック自体は変更していない・期待差分ゼロ）。
 *
 * 抽出していないもの: `RefreshDispAreaStatusSum`（魔女のスキルカード判定）は、
 * 計算結果と同時にラベル用データテーブル（`loopInfoArrayMazyonoSkillCard`）をHTML組み立て側
 * でも参照するため、計算とビューモデルの分離がこのファイルの他の抽出ほど単純でない。
 * 対象外とした（`PhysicalSpecialize`/`MagicalSpecialize`/`ResistDamage`/`PvPInfo`の
 * ラベル付きビューモデル構築と同様の理由）。
 */
import { LearnedSkillSearch } from "./learnedskill.js";
import { UsedSkillSearch } from "./skillstate.js";
import { zokusei } from "./etc.js";
import { ItemObjNew } from "./item.dat.js";
import {
    HEALTYPE_COLUCEO_HEAL, HEALTYPE_DILECTIO_HEAL, HEALTYPE_EBI_ZANMAI, HEALTYPE_HEAL,
    HEALTYPE_HIGHNESS, HEALTYPE_SANCTUARY, HEALTYPE_SHINSENNA_EBI, HEALTYPE_SHUGO_FU,
    HEALTYPE_TURTLE_SPRINKLER, HEALTYPE_ZYOKODO, HealCalc,
} from "./head.js";
import {
    SKILL_ID_DRAGON_TRAINING, SKILL_ID_KIHE_SHUREN, SKILL_ID_MADOGEAR, SKILL_ID_MEDITATIO,
} from "./skill.dat.js";
import { g_constDataManager } from "./global.js";
import { GetBaseExpTable, GetBaseLevelMax, GetJobExpTable, GetJobLevelMax } from "./data/mig.job.h.js";
import {
    n_A_JOB, SU_STR, n_A_JobLV, n_A_AGI, n_A_VIT, n_A_INT,
    n_A_LUK, n_A_STA, n_A_WIS, n_A_SPL, n_A_CRT, n_A_BodyZokusei, n_A_Equip,
} from "./roro-state.js";
import { n_A_BaseLV, n_tok, n_tok_no_limit } from "./ro4-state.js";
import { ELM_ID_COUNT, ELM_ID_UNDEAD } from "./const/EnumElmId.js";
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP, CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF } from "./const/EnumCharaDataIndex.js";
import { CONST_DATA_KIND_JOB } from "./const/EnumConstDataKind.js";
import { ITEM_DATA_INDEX_WEIGHT } from "./const/EnumItemDataIndex.js";
import { ITEM_SP_HEAL_UP_USED, ITEM_SP_HEAL_UP_USING, ITEM_SP_RESIST_ELM_VANITY, ITEM_SP_RESIST_STATE_POISON, ITEM_SP_RESIST_STATE_R_CHILLED } from "./const/EnumItemSpId.js";
import { EQUIP_REGION_ID_COUNT } from "./const/EnumMigItemParamId.js";
import { MONSTER_DATA_INDEX_BASE_EXP, MONSTER_DATA_INDEX_JOB_EXP } from "./const/EnumMonsterDataIndex.js";
import {
    STATE_ID_BLEEDING, STATE_ID_BLIND, STATE_ID_CONFUSE, STATE_ID_CURSED, STATE_ID_FROZEN,
    STATE_ID_POISON, STATE_ID_SILENCE, STATE_ID_SLEEP, STATE_ID_STONE, STATE_ID_STUN, STATE_ID_COUNT,
    STATE_NEW_ID_CONFLAGRATION, STATE_NEW_ID_CRYSTALLIZATION, STATE_NEW_ID_HIGHLYPOISONOUS,
    STATE_NEW_ID_JETBLACK, STATE_NEW_ID_LETHARGY, STATE_NEW_ID_MELANCHOLY, STATE_NEW_ID_RAPIDCOOLING,
    STATE_NEW_ID_STILLNESS, STATE_NEW_ID_TORRENT, STATE_NEW_ID_UNHAPPINESS, STATE_R_ID_CHARMED,
    STATE_R_ID_CHILLED, STATE_R_ID_DEEPSLEEP, STATE_R_ID_FEAR, STATE_R_ID_FRENZY, STATE_R_ID_HOWLING,
    STATE_R_ID_ICED, STATE_R_ID_IGNITION,
} from "./const/EnumStateId.js";

/**
 * 拡張情報「回復力向上」欄のヒール回復量を計算する（サンクチュアリ含む）.
 * @param {number} healType ヒール種別（`HEALTYPE_*`）
 * @param {number} healTarget 使用対象
 * @param {number} ptmCount パーティメンバー数
 * @returns {{lvMax: number, valueMinArray: number[], valueMaxArray: number[]}}
 */
export function CalcHealing(healType, healTarget, ptmCount) {
    let lvMax = 0;
    const valueMinArray = [];
    const valueMaxArray = [];

    if (healType == HEALTYPE_SANCTUARY) {
        // サンクチュアリの場合
        lvMax = 10;
        // 未整理
        for (let i = 0; i <= 6; i++) {
            valueMinArray[i] = 100 * i;
        }
        valueMinArray[7] = valueMinArray[8] = valueMinArray[9] = valueMinArray[10] = 777;
        let w_BAI = 100 + n_tok[ITEM_SP_HEAL_UP_USING];
        const meditatio_lv = Math.max(LearnedSkillSearch(SKILL_ID_MEDITATIO), UsedSkillSearch(SKILL_ID_MEDITATIO));
        if (meditatio_lv > 0) {
            w_BAI -= meditatio_lv * 2;
        }
        for (let i = 0; i <= 10; i++) {
            valueMinArray[i] = Math.floor(valueMinArray[i] * w_BAI / 100);
            if (healTarget == 0) {
                valueMinArray[i] = Math.floor(valueMinArray[i] * (100 + n_tok[ITEM_SP_HEAL_UP_USED]) / 100);
            }
            valueMaxArray[i] = valueMinArray[i];
        }
    } else {
        // 最大レベルを取得
        switch (healType) {
            case HEALTYPE_HEAL:
            case HEALTYPE_COLUCEO_HEAL:
                lvMax = 10;
                break;
            case HEALTYPE_DILECTIO_HEAL:
            case HEALTYPE_HIGHNESS:
            case HEALTYPE_SHINSENNA_EBI:
            case HEALTYPE_EBI_ZANMAI:
            case HEALTYPE_SHUGO_FU:
            case HEALTYPE_ZYOKODO:
                lvMax = 5;
                break;
            case HEALTYPE_TURTLE_SPRINKLER:
                lvMax = 7;
                break;
        }
        for (let lv = 0; lv <= lvMax; lv++) {
            // HealCalc()関数は ro4/m/js/head.js で定義されています
            valueMinArray[lv] = HealCalc(lv, healType, 0, healTarget, ptmCount);
            valueMaxArray[lv] = HealCalc(lv, healType, 2, healTarget, ptmCount);
        }
    }

    return { lvMax, valueMinArray, valueMaxArray };
}

/**
 * 拡張情報「回復力向上」欄のHP/SP回復量（増幅効果）を計算する.
 * @param {number} hprUpLv HP回復力向上Lv
 * @param {number} ibukiLv 息吹Lv
 * @param {number} sprUpLv SP回復力向上Lv
 * @param {Array} charaData `CExtraInfoAreaComponentManager.charaData`
 * @returns {{valueTextArrayHP: Array, valueTextArraySP: Array}}
 */
export function CalcRecovery(hprUpLv, ibukiLv, sprUpLv, charaData) {
    const valueTextArrayHP = [];
    let lv = hprUpLv;
    if (lv > 0) {
        const value = Math.floor((5 + charaData[CHARA_DATA_INDEX_MAXHP] / 500) * lv);
        valueTextArrayHP.push(["HP回復力向上", value + "/" + "10秒"]);
    }
    lv = ibukiLv;
    if (lv > 0) {
        const value = Math.floor((4 + charaData[CHARA_DATA_INDEX_MAXHP] / 500) * lv);
        valueTextArrayHP.push(["息吹", value + "/" + "10秒"]);
    }

    const valueTextArraySP = [];
    lv = sprUpLv;
    if (lv > 0) {
        const value = Math.floor((3 + charaData[CHARA_DATA_INDEX_MAXSP] / 500) * lv);
        valueTextArraySP.push(["SP回復力向上", value + "/" + "10秒"]);
    }
    lv = ibukiLv;
    if (lv > 0) {
        const value = Math.floor((2 + charaData[CHARA_DATA_INDEX_MAXSP] / 500) * lv);
        valueTextArraySP.push(["息吹", value + "/" + "10秒"]);
    }

    return { valueTextArrayHP, valueTextArraySP };
}

/**
 * 拡張情報「所持限界量」欄の所持限界量・装備品重量合計を計算する.
 * @param {number} capacityUpLv 所持限界量増加Lv
 * @param {number} capacityUpRLv 所持限界量増加RLv
 * @returns {{value: number, weightEquiped: number}}
 */
export function CalcCapacity(capacityUpLv, capacityUpRLv) {
    let value = 2000;
    // 職業によるボーナス
    const jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB);
    value += jobData.GetWeightBonus();
    // 素ＳＴＲによるボーナス
    value += 30 * SU_STR;

    if (UsedSkillSearch(SKILL_ID_KIHE_SHUREN) > 0) {
        // ペコ・グリフォンに搭乗時
        value += 1000;
    } else if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) > 0) {
        // ドラゴンに搭乗時
        // ドラゴントレーニング習得Lv補正. UsedSkillSearch の方は'Lv0'の前に'未騎乗'が挿入されているのでオフセットを合わせている
        const dragon_training_lv = Math.max(LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING), UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) - 1);
        if (dragon_training_lv > 0) {
            value += 500 + 200 * dragon_training_lv;
        }
    }
    if (UsedSkillSearch(SKILL_ID_MADOGEAR) > 0) {
        // 魔導ギアに搭乗中
        value += 1500;
    }

    // 所持限界量増加
    value += 200 * capacityUpLv;
    // 所持限界量増加Ｒ
    value += 200 * capacityUpRLv;

    // 装備品重量合計計算
    let weightEquiped = 0;
    for (let idx = 0; idx < EQUIP_REGION_ID_COUNT; idx++) {
        weightEquiped += ItemObjNew[n_A_Equip[idx]][ITEM_DATA_INDEX_WEIGHT];
    }

    return { value, weightEquiped };
}

/**
 * 拡張情報「属性倍率」欄の属性耐性・属性倍率・最終倍率を計算する.
 *
 * `saveimage.js` の画像出力（Etc欄の属性耐性表）も同じ計算を行っていた（重複）ため、
 * こちらを共有元とする。ただし `saveimage.js` 側は最終倍率を整数に丸めて表示していた
 * （`finalRatioArray` に対し追加で `Math.floor` していた）差異があり、これは各呼び出し元の
 * 既存表示仕様として温存する（このファイル自体は丸めない、従来の
 * `RefreshDispAreaResistElement` と同じ生の値を返す）。
 * @returns {{resistValueArray: number[], resistValueArrayOver: number[], bodyElmRatioArray: number[], finalRatioArray: number[]}}
 */
export function CalcResistElement() {
    const resistValueArray = [];
    const resistValueArrayOver = [];
    const bodyElmRatioArray = [];
    const finalRatioArray = [];

    // 装備効果等による耐性
    for (let idx = 0; idx < ELM_ID_COUNT; idx++) {
        resistValueArray[idx] = n_tok[ITEM_SP_RESIST_ELM_VANITY + idx];
        resistValueArrayOver[idx] = Math.max(0, n_tok_no_limit[ITEM_SP_RESIST_ELM_VANITY + idx] - n_tok[ITEM_SP_RESIST_ELM_VANITY + idx]);
        bodyElmRatioArray[idx] = zokusei[n_A_BodyZokusei * 10 + 1][idx] + 100;
        finalRatioArray[idx] = bodyElmRatioArray[idx] - Math.floor(resistValueArray[idx] * bodyElmRatioArray[idx]) / 100;
    }

    return { resistValueArray, resistValueArrayOver, bodyElmRatioArray, finalRatioArray };
}

/**
 * 拡張情報「状態異常耐性」欄の装備効果耐性・ステ耐性を計算する.
 * @param {Array} charaData `CExtraInfoAreaComponentManager.charaData`
 * @returns {{equipValueArray: number[], paramValueArray: number[]}}
 */
export function CalcResistState(charaData) {
    const equipValueArray = [];
    const paramValueArray = [];

    // 装備効果等による耐性
    for (let idx = 0; idx <= STATE_ID_STONE; idx++) {
        equipValueArray[idx] = n_tok[ITEM_SP_RESIST_STATE_POISON + idx];

        switch (idx) {
            case STATE_ID_SLEEP:
            case STATE_ID_BLEEDING:
                paramValueArray[idx] = n_A_AGI;
                break;
            case STATE_ID_POISON:
            case STATE_ID_STUN:
                paramValueArray[idx] = n_A_VIT;
                break;
            case STATE_ID_BLIND:
            case STATE_ID_SILENCE:
                paramValueArray[idx] = n_A_INT;
                break;
            case STATE_ID_CURSED:
            case STATE_ID_CONFUSE:
                paramValueArray[idx] = n_A_LUK;
                break;
            case STATE_ID_FROZEN:
            case STATE_ID_STONE:
                paramValueArray[idx] = charaData[CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF];
                break;
            default:
                paramValueArray[idx] = 0;
                break;
        }
    }

    // 不死属性付与による、凍結、石化耐性
    if (n_A_BodyZokusei == ELM_ID_UNDEAD) {
        equipValueArray[STATE_ID_FROZEN] = 100;
        equipValueArray[STATE_ID_STONE] = 100;
    }

    // LUK0 による呪い完全耐性
    if (n_A_LUK == 0) {
        paramValueArray[STATE_ID_CURSED] = 100;
    }

    return { equipValueArray, paramValueArray };
}

/**
 * 拡張情報「新状態異常耐性」欄の装備効果耐性・ステ耐性・持続時間を計算する.
 * @returns {{equipValueArray: number[], paramValueArray: number[], paramTimeArray: number[]}}
 */
export function CalcResistStateR() {
    const equipValueArray = [];
    const paramValueArray = [];
    const paramTimeArray = [];

    // 装備効果等による耐性 Rの新状態異常、新状態異常に対応
    for (let idx = STATE_R_ID_CHILLED; idx < STATE_ID_COUNT; idx++) {

        equipValueArray[idx] = n_tok[ITEM_SP_RESIST_STATE_R_CHILLED + (idx - STATE_R_ID_CHILLED)];

        switch (idx) {

            case STATE_R_ID_CHILLED: // 冷凍
                // ステ耐性 なし
                paramValueArray[idx] = 0;
                //効果の持続時間(最大２０秒)
                paramTimeArray[idx] = 20 - n_A_VIT / 10;
                break;

            case STATE_R_ID_IGNITION: // 発火
                // ステ耐性 BaseLv / 600 + Agi / 500
                paramValueArray[idx] = n_A_BaseLV / 600 + n_A_AGI / 500;
                //効果の持続時間(最小１０秒)
                paramTimeArray[idx] = 22 - (0.04 * (n_A_BaseLV - 1)) - (0.04 * (n_A_AGI - 1));
                paramTimeArray[idx] = (paramTimeArray[idx] >= 10.0) ? paramTimeArray[idx] : 10.0;
                break;

            case STATE_R_ID_ICED: // 氷結
                // ステ耐性 なし
                paramValueArray[idx] = 0;
                //効果の持続時間(最小３４秒)
                paramTimeArray[idx] = 40 - (0.0479 * (n_A_VIT - 1));
                paramTimeArray[idx] = (paramTimeArray[idx] >= 34.0) ? paramTimeArray[idx] : 34.0;
                break;

            case STATE_R_ID_FEAR: // 恐怖
                // ステ耐性 BaseLv / 5 + Int / 5
                paramValueArray[idx] = n_A_BaseLV / 5 + n_A_INT / 5;
                // 持続時間 ドラゴンハウリング (22 sec) を想定
                paramTimeArray[idx] = 22 - (0.0365 * (n_A_BaseLV - 1)) - (0.0365 * (n_A_INT - 1));
                break;

            case STATE_R_ID_DEEPSLEEP: // 深い眠り
                // ステ耐性
                paramValueArray[idx] = n_A_INT / 6 + n_A_LUK / 10;
                //効果の持続時間()
                paramTimeArray[idx] = 16 - (0.049 * (n_A_BaseLV - 1)) - (0.0255 * (n_A_INT - 1));
                paramTimeArray[idx] = (paramTimeArray[idx] >= 1.77) ? paramTimeArray[idx] : 1.77;
                break;

            case STATE_R_ID_CHARMED: // 魅了
                // ステ耐性 不明
                paramValueArray[idx] = 0;
                // 持続時間 セイレーンの声Lv5 (27 sec) を想定
                paramTimeArray[idx] = 27; // BaseLv と JobLv で時間短縮
                break;

            case STATE_R_ID_FRENZY: // 狂乱
                // ステ耐性 不明
                paramValueArray[idx] = 0;
                // 持続時間 フライデーナイトフィーバーLv5 (30 sec) を想定
                paramTimeArray[idx] = 30; // 時間短縮ステータス不明
                break;

            case STATE_R_ID_HOWLING: // 精神衝撃
                paramValueArray[idx] = (n_A_VIT + n_A_LUK) / 5;
                // 持続時間 HoM Lv5 (30 sec) を想定
                paramTimeArray[idx] = 30; // 時間短縮ステータスなし
                break;

            case STATE_NEW_ID_LETHARGY: //無気力
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのPOWにより減少する
                paramTimeArray[idx] = 0;
                break;

            case STATE_NEW_ID_JETBLACK: //漆黒
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのSTAにより減少する
                paramTimeArray[idx] = 0;
                break;

            case STATE_NEW_ID_HIGHLYPOISONOUS: //強毒
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのSTAにより2秒まで減少する
                paramTimeArray[idx] = Math.max(2, 9 - Math.floor(n_A_STA / 10));
                break;

            case STATE_NEW_ID_TORRENT: //激流
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのWISにより2秒まで減少する
                paramTimeArray[idx] = Math.max(2, 9 - Math.floor(n_A_WIS / 10));
                break;

            case STATE_NEW_ID_MELANCHOLY: //憂鬱
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのWISにより減少する
                paramTimeArray[idx] = 0;
                break;

            case STATE_NEW_ID_STILLNESS: //静寂
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのSPLにより減少する
                paramTimeArray[idx] = 0;
                break;

            case STATE_NEW_ID_CONFLAGRATION: //火災
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのSPLにより2秒まで減少する
                paramTimeArray[idx] = Math.max(2, 9 - Math.floor(n_A_SPL / 10));
                break;

            case STATE_NEW_ID_RAPIDCOOLING: //急冷
            case STATE_NEW_ID_CRYSTALLIZATION: //結晶化
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのCRTにより3秒まで減少する
                paramTimeArray[idx] = Math.max(3, 10 - Math.floor(n_A_CRT / 10));
                break;

            case STATE_NEW_ID_UNHAPPINESS: //不幸
                // 耐性は術者とターゲットのBaseLv差による
                paramValueArray[idx] = 0;
                // 持続時間はターゲットのCRTにより減少する
                paramTimeArray[idx] = 0;
                break;

            default:
                paramValueArray[idx] = 0;
                break;
        }
        if (equipValueArray[idx] >= 100) {
            paramTimeArray[idx] = 0; //装備耐性１００％の場合、持続時間０秒にする
        }
        paramValueArray[idx] = Math.floor(paramValueArray[idx]);
        paramTimeArray[idx] = Math.floor(paramTimeArray[idx] * 100) / 100; //小数点以下２桁まで残し切り捨て
    }

    return { equipValueArray, paramValueArray, paramTimeArray };
}

/**
 * 拡張情報「経験値」欄のベース/ジョブ経験値・必要討伐数を計算する.
 * @param {number} baseExpGaugeInput ベース経験値ゲージ入力（0〜1000）
 * @param {number} baseLvFocusInput 目標ベースレベル入力
 * @param {number} jobExpGaugeInput ジョブ経験値ゲージ入力（0〜1000）
 * @param {number} jobLvFocusInput 目標ジョブレベル入力
 * @param {Array} mobData `CExtraInfoAreaComponentManager.mobData`
 * @returns {{lvMaxBase: number, lvFocusBase: number, expToNextBase: number, expToFocusedBase: number, mobCountToNextBase: number, mobCountToFocusedBase: number, lvMaxJob: number, lvFocusJob: number, expToNextJob: number, expToFocusedJob: number, mobCountToNextJob: number, mobCountToFocusedJob: number}}
 */
export function CalcExp(baseExpGaugeInput, baseLvFocusInput, jobExpGaugeInput, jobLvFocusInput, mobData) {
    const jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB);

    // ベース経験値計算
    let lvFocusBase = 0;
    let expToNextBase = 0;
    let expToFocusedBase = 0;
    let mobCountToNextBase = 0;
    let mobCountToFocusedBase = 0;

    const lvMaxBase = GetBaseLevelMax(n_A_JOB);

    if (n_A_BaseLV < lvMaxBase) {

        // 参照先切り替え
        const wkRefExpTable = GetBaseExpTable(jobData.GetBaseExpTableId());
        const wkMobExp = mobData[MONSTER_DATA_INDEX_BASE_EXP];

        // 経験値情報を取得
        let expNow = Math.floor(wkRefExpTable[n_A_BaseLV] * baseExpGaugeInput / 1000);

        expToNextBase = wkRefExpTable[n_A_BaseLV] - expNow;

        // 目標レベルを取得
        lvFocusBase = baseLvFocusInput;

        // 必要討伐数を算出
        let wkExpNow = expNow;

        if ((n_A_BaseLV > 1) && (wkMobExp == 0)) {
            mobCountToNextBase = -1;
            mobCountToFocusedBase = -1;
        } else {
            mobCountToFocusedBase = 0;

            for (let idx = n_A_BaseLV; idx < lvFocusBase; idx++) {

                // 次のレベルまでに必要な経験値を取得
                const wkExpLvUp = wkRefExpTable[idx];

                // 累積必要経験値に加算
                expToFocusedBase += wkExpLvUp;

                // 次のレベルまでに必要な討伐数を計算
                const wkMobCount = Math.ceil((wkExpLvUp - wkExpNow) / wkMobExp);

                // 現在のレベルから次のレベルまでの討伐数は別途保持する
                if (idx == n_A_BaseLV) {
                    mobCountToNextBase = wkMobCount;
                }

                // 累計討伐数に加算
                mobCountToFocusedBase += wkMobCount;

                // 累積経験値を加算
                wkExpNow += wkMobExp * wkMobCount;

                // レベルアップ分の経験値を減算
                wkExpNow -= wkExpLvUp;

                // 一度に獲得できる経験値の上限補正
                wkExpNow = Math.min(wkExpLvUp - 1, wkExpNow);
            }

            // 累積必要経験値から現在の経験値を減算
            expToFocusedBase -= expNow;
        }
    }

    // ジョブ経験値計算
    let lvFocusJob = 0;
    let expToNextJob = 0;
    let expToFocusedJob = 0;
    let mobCountToNextJob = 0;
    let mobCountToFocusedJob = 0;

    const lvMaxJob = GetJobLevelMax(n_A_JOB);

    if (n_A_JobLV < lvMaxJob) {

        // 参照先切り替え
        const wkRefExpTable = GetJobExpTable(jobData.GetJobExpTableId());
        const wkMobExp = mobData[MONSTER_DATA_INDEX_JOB_EXP];

        // 経験値情報を取得
        let expNow = Math.floor(wkRefExpTable[n_A_JobLV] * jobExpGaugeInput / 1000);

        expToNextJob = wkRefExpTable[n_A_JobLV] - expNow;

        // 目標レベルを取得
        lvFocusJob = jobLvFocusInput;

        // 必要討伐数を算出
        let wkExpNow = expNow;

        if ((n_A_JobLV > 1) && (wkMobExp == 0)) {
            mobCountToNextJob = -1;
            mobCountToFocusedJob = -1;
        } else {
            mobCountToFocusedJob = 0;

            for (let idx = n_A_JobLV; idx < lvFocusJob; idx++) {

                // 次のレベルまでに必要な経験値を取得
                const wkExpLvUp = wkRefExpTable[idx];

                // 累積必要経験値に加算
                expToFocusedJob += wkExpLvUp;

                // 次のレベルまでに必要な討伐数を計算
                const wkMobCount = Math.ceil((wkExpLvUp - wkExpNow) / wkMobExp);

                // 現在のレベルから次のレベルまでの討伐数は別途保持する
                if (idx == n_A_JobLV) {
                    mobCountToNextJob = wkMobCount;
                }

                // 累計討伐数に加算
                mobCountToFocusedJob += wkMobCount;

                // 累積経験値を加算
                wkExpNow += wkMobExp * wkMobCount;

                // レベルアップ分の経験値を減算
                wkExpNow -= wkExpLvUp;

                // 一度に獲得できる経験値の上限補正
                wkExpNow = Math.min(wkExpLvUp - 1, wkExpNow);
            }

            // 累積必要経験値から現在の経験値を減算
            expToFocusedJob -= expNow;
        }
    }

    return {
        lvMaxBase, lvFocusBase, expToNextBase, expToFocusedBase, mobCountToNextBase, mobCountToFocusedBase,
        lvMaxJob, lvFocusJob, expToNextJob, expToFocusedJob, mobCountToNextJob, mobCountToFocusedJob,
    };
}
