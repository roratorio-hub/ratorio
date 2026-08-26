// === AUTO-GENERATED IMPORTS ===
import { GetElementText } from "./common.js";
import "./item.h.js";
import { CardObjNew } from "./card.dat.js";
import { ItemObjNew } from "./item.dat.js";
import { g_rndOptArray } from "./rndopt.dat.js";
import { GetRndOptDispName } from "./rndopt.h.js";
import { g_equipRndOptTable } from "./rndopttype.h.js";
import { g_extraInfoDataBridge } from "./CExtraInfoDataBridge.js";
// === END AUTO-GENERATED IMPORTS ===
import { getShadowEquippedID, getShadowRefined, getShadowRndOptInfoArray } from "./CShadowEquipControllerDataBridge.js";
// C-6: global.js 管理の共有 conf state
import {
         n_Nitou,
} from "./global.js";

// C-6: ro4 側共有 state（旧 head.js window 変数）
import {
         delayDownForDisp, g_perfectHitRate,
} from "./ro4-state.js";

// C-6: 共有 state（旧 foot.js window 変数）
import {
         n_A_JOB,
} from "./roro-state.js";

// リファクタリング計画 Phase 12: jQueryによるDOM走査（v()/t()/e()）を
// モデル読み取り（extractModelFromDom）・計算結果ブリッジ（g_extraInfoDataBridge）・
// 純粋関数（hmjob-bridge.js / hmchara.js / mig.job.h.js）に置換した。
// DOMは「装備・カード・矢の隠しDATA_要素」等、モデルの対応が無い箇所（衣装欄の
// 精錬値表記等）以外では一切読まない。
// extractModelFromDom は foot-stallcalc-hydrate.js から直接importせず engine-registry.js
// 経由で取得する（foot-stallcalc-hydrate.js は CShadowEquipController.js を import し、
// モジュール評価時にDOM初期化を要求するため、直接importすると import 時点でDOMが
// 必要になってしまう。get('extractModelFromDom') は calc-headless.js が既に登録済みの
// 公開APIを使うだけなので影響を受けない。なお下の CExtraInfoAreaComponentManagerCalc.js
// は head.js・global.js を推移的に import するため、この迂回は「import chain 全体の軽量化」
// にはなっていない——避けているのは CShadowEquipController.js 固有の DOM初期化要求のみ）。
import { GetJobName } from "./data/mig.job.h.js";
import { IsUnconfirmedHP, IsUnconfirmedSP } from "./hmchara.js";
import {
         GetBasicStatusBonus, GetStatusPointRemain, GetPureStatus, GetSpecStatusBonus,
         GetTStatusPointRemain, GetDisplayedPAtk, GetDisplayedSMatk, GetDisplayedCRate,
         GetDisplayedRes, GetDisplayedMres, GetDisplayedHPlus,
} from "./hmjob.js";
import { CalcResistElement } from "./CExtraInfoAreaComponentManagerCalc.js";
import {
         MIG_PARAM_ID_STR, MIG_PARAM_ID_AGI, MIG_PARAM_ID_VIT, MIG_PARAM_ID_INT, MIG_PARAM_ID_DEX, MIG_PARAM_ID_LUK,
         MIG_PARAM_ID_POW, MIG_PARAM_ID_STA, MIG_PARAM_ID_WIS, MIG_PARAM_ID_SPL, MIG_PARAM_ID_CON, MIG_PARAM_ID_CRT,
} from "./const/EnumMigItemParamId.js";
import {
         CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2, CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4,
         CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2, CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4,
         CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_UNDER, CARD_REGION_ID_SHIELD,
         CARD_REGION_ID_BODY, CARD_REGION_ID_SHOULDER, CARD_REGION_ID_SHOES, CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ACCESSORY_2,
         CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3,
         CARD_REGION_ID_ENCHANT_HEAD_MID_1, CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3,
         CARD_REGION_ID_ENCHANT_HEAD_UNDER_1, CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3,
         CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3,
         CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3,
         CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3,
         CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3,
         CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3,
         CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3,
} from "./common.js";
import {
         CHARA_DATA_INDEX_DISP_ASPD, CHARA_DATA_INDEX_DISP_ATK_LEFT, CHARA_DATA_INDEX_DISP_ATK_RIGHT,
         CHARA_DATA_INDEX_DISP_CRI, CHARA_DATA_INDEX_DISP_DEF_LEFT, CHARA_DATA_INDEX_DISP_DEF_RIGHT,
         CHARA_DATA_INDEX_DISP_FLEE, CHARA_DATA_INDEX_DISP_HIT, CHARA_DATA_INDEX_DISP_MATK_LEFT,
         CHARA_DATA_INDEX_DISP_MATK_RIGHT, CHARA_DATA_INDEX_DISP_MAXHP, CHARA_DATA_INDEX_DISP_MAXSP,
         CHARA_DATA_INDEX_DISP_MDEF_LEFT, CHARA_DATA_INDEX_DISP_MDEF_RIGHT,
} from "./const/EnumCharaDataIndex.js";

// sample
// https://ragnarokonline.gungho.jp/campaign_event/campaign/baselv220cp-2.html#modal
// calcx.html?cx1cy1EtMmfo4Owqof.3M4X00cz11.32jYJlE0cz120022jAp3VvR1cz13.4fYl3cz14.4hj1cz15002Edw7Bot9w8cz16002yfJC0xiTd62cz170022j8nn3td2cz18.4fIm3cz19.32dhop8cz1a002GhcqRoQmQ6G8cz1b.4hM1cz1c.4hOacz1d00s0hPgX1h_1cz1e00c0jP1to02cz1f00s0jOfup0z0cz1g00c0jP2vq01cz1h00s0jPjsr0utcz1i.4mcA1Z_1127456b89a3cA128c0cA1vgfdejgh2cB1.sf_V___51d171n5n5nll5dldldl511cC1.ecR1.4S8cU1.cg003cW100Bcl3cZ121
$(function () {
  $("#OBJID_BUTTON_IMAGE_SAVE_DATA_MIG").click(function () {
	generateImage();
    html2canvas(document.querySelector("#imgdiv"), { allowTaint: true, useCORS: true }).then(
      function (canvas) {
        var download = document.createElement("a");
        download.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        download.download = "ratorio.png";
        download.click();
        $("#imgdiv").remove();
      }
    );
    return false;
  });
});

export function generateImage() {
  const model = get('extractModelFromDom')();
  const charaData = g_extraInfoDataBridge.charaData;

  // ステータス補正欄の表示形式（DisplayStatusBonusAll/DisplayReferStatusAll と同じ「+n」表記）
  const bonusText = (value) => ((value >= 0) ? "+" : "") + value;

  // 装備部位ごとの{装備部位ID, カード欄4枠のID}対応表。foot-stallcalc-hydrate.js の
  // ExtractModelFromDom() と同じ対応関係（CARD_REGION_ID_* の割り当て規則）に基づく。
  const equipSlot = (equipRegionId, cardRegionIds, refined = 0, transcendence = 0) => {
    const equip_id = model.equip[equipRegionId] ?? 0;
    const equip_name = equip_id == 0 ? "-" : ItemObjNew[equip_id][8];

    let text = "";
    if (refined != 0) {
      text += `+${refined} `;
    }
    if (transcendence != 0) {
      text += `[★${transcendence}] `;
    }
    text += equip_name + " ( ";
    const enchants = cardRegionIds.map((cardRegionId) => {
      const card_id = model.card[cardRegionId] ?? 0;
      return card_id == 0 ? "-" : CardObjNew[card_id][2];
    });
    text += enchants.join(", ");
    text += " )";
    return text;
  }
  const enchCount = (cardRegionIds, isWeapon = false) => {
    let count = 0;
    for (let i = 0; i < cardRegionIds.length; i++) {
      const card_id = model.card[cardRegionIds[i]] ?? 0;
      if (i == 0 || isWeapon) {
        if (CARD_KIND_ENCHANT == CardObjNew[card_id][1]) {
          count++;
        }
      } else if (card_id != 0) {
        // アルファコアは4スロにカードがくるがエンチャ扱いなので
        // 防具系は1スロのエンチャチェック以外は何か設定されていれば計上する
        count++;
      }
    }
    return count
  }
  const randopt_exists = (id) => {
    return g_equipRndOptTable[id].filter(v=>{return v[0]>0}).length>0? "exists" : "";
  }
  const randopt = (id) => {
    let text = "[ ";
    const options = []
    g_equipRndOptTable[id].forEach(value => {
      if (value[0] != 0) {
        options.push(GetRndOptDispName(g_rndOptArray[value[0]][RND_OPT_DATA_INDEX_SPID]) + " " + value[1])
      }
    });
    text += options.join(", ")
    text += " ]";
    return text;
  }
  const shadow_exists = (selector) => {
    return getShadowEquippedID(selector) != 0 ? "exists" : "";
  }
  const shadow = (selector) => {
    const shadow_id = getShadowEquippedID(selector);
    if (shadow_id == 0) {
      return;
    }
    const refined = getShadowRefined(selector);
    const shadow_name = ItemObjNew[shadow_id][8];
    const opt_info = getShadowRndOptInfoArray(selector)

    let text = "";
    if (refined != 0) {
      text += `+${refined} `;
    }
    text += shadow_name + " ( ";
    const options = []
    opt_info.forEach(value => {
      if (value[0] != 0) {
        options.push(GetRndOptDispName(g_rndOptArray[value[0]][RND_OPT_DATA_INDEX_SPID]) + " " + value[1])
      }
    })
    text += options.join(", ")
    text += " )"
    return text;
  }

  // 装備部位ごとの装備欄・カード欄まとめ（EQUIP_REGION_ID_* / CARD_REGION_ID_* は calcx.html 側 import 済み）
  const headTop = { equip: EQUIP_REGION_ID_HEAD_TOP, cards: [CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3] };
  const headMid = { equip: EQUIP_REGION_ID_HEAD_MID, cards: [CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_ENCHANT_HEAD_MID_1, CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3] };
  const headUnder = { equip: EQUIP_REGION_ID_HEAD_UNDER, cards: [CARD_REGION_ID_HEAD_UNDER, CARD_REGION_ID_ENCHANT_HEAD_UNDER_1, CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3] };
  const body = { equip: EQUIP_REGION_ID_BODY, cards: [CARD_REGION_ID_BODY, CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3] };
  const armsRight = { equip: EQUIP_REGION_ID_ARMS, cards: [CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2, CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4] };
  const armsLeft = { equip: EQUIP_REGION_ID_ARMS_LEFT, cards: [CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2, CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4] };
  const shield = { equip: EQUIP_REGION_ID_SHIELD, cards: [CARD_REGION_ID_SHIELD, CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3] };
  const shoulder = { equip: EQUIP_REGION_ID_SHOULDER, cards: [CARD_REGION_ID_SHOULDER, CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3] };
  const shoes = { equip: EQUIP_REGION_ID_SHOES, cards: [CARD_REGION_ID_SHOES, CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3] };
  const accessory1 = { equip: EQUIP_REGION_ID_ACCESSORY_1, cards: [CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3] };
  const accessory2 = { equip: EQUIP_REGION_ID_ACCESSORY_2, cards: [CARD_REGION_ID_ACCESSORY_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3] };
  // 左手（二刀流時は武器、それ以外は盾）
  const armsLeftOrShield = n_Nitou ? armsLeft : shield;

    // 属性倍率（CExtraInfoAreaComponentManager.js の RefreshDispAreaResistElement と共通の計算。
    // 本欄のみ最終倍率を整数に丸めて表示する = 元実装からの表示仕様を踏襲）
    const { finalRatioArray } = CalcResistElement();
    const regist_ratio = finalRatioArray.map((v) => Math.floor(v));

    let tpl = `
    <style>
    #imgdiv {
      background-color: white;
      width: 1030;
      height: 720;
    }
    #imgdiv>* {
      font-size: 12px;
      font-family: "Arial", "メイリオ";
    }

    #imgdiv div#imgframe {
      background-image: url(../../assets/img/frame.png);
      width: 1030;
      height: 720;
    }

    #imgdiv div#base {
      position: absolute;
      top: 60;
      left: 40;
    }

    #imgdiv div#hp {
      position: absolute;
      top: 90;
      left: 40;
    }

    #imgdiv div#sp {
      position: absolute;
      top: 120px;
      left: 40;
    }

    #imgdiv div#status {
      position: absolute;
      top: 200;
      left: 30;
      width: 290;
    }

    #imgdiv div#status table {
      margin-bottom: 0.3em;
    }
    #imgdiv div#status table:last-child {
      margin-bottom: 0;
    }

    #imgdiv table.status {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid gray;
    }

    #imgdiv table.status thead {
      background-color: rgb(189, 206, 247);
    }

    #imgdiv table.status tr {
      border: 1px solid gray;
    }

    #imgdiv table.status th,
    #imgdiv table.status td {
      padding: 3px 0px 3px 6px;
    }

    #imgdiv table.status th {
      font-weight: bold;
      text-align: left;
      color: rgb(41, 57, 99);
      width: 20;
      font-size: 12px;
    }

    #imgdiv table.status td {
      font-size: 11px;
    }

    #imgdiv table.etc {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid gray;
      font-size: 10px;
    }

    #imgdiv table.etc thead {
      background-color: rgb(189, 206, 247);
    }

    #imgdiv table.etc tr {
      border: 1px solid gray;
    }

    #imgdiv table.etc th,
    #imgdiv table.etc td {
      padding: 3px 0px 3px 6px;
    }

    #imgdiv table.etc th {
      font-weight: bold;
      text-align: left;
      color: rgb(41, 57, 99);
    }

    #imgdiv table.etc .denom {
      font-size: 7px;
      font-color: gray;
    }

    #imgdiv table.elm {
      width: 100%;
      border-collapse: collapse;
      border: none;
      font-size: 11px;
    }
    #imgdiv table.elm th {
      font-weight: normal;
      font-size: 8px;
      text-align: left;
    }
    #imgdiv table.elm td {
      color:ghostwhite;
      text-align: center;
      height: 2em;
      width: 26px;
    }
    #imgdiv table.elm td.u {
      color: gray;
      border: 1px solid lightgray;
      background-color: rgb(255,255,255);
    }
    #imgdiv table.elm td.m {
      border: 1px solid rgb(15,69,252);
      background-color: rgb(15,69,252);
    }
    #imgdiv table.elm td.t {
      border: 1px solid rgb(4,172,20);
      background-color: rgb(4,172,20);
    }
    #imgdiv table.elm td.h {
      border: 1px solid rgb(250,12,4);
      background-color: rgb(250,12,4);
    }
    #imgdiv table.elm td.k {
      border: 1px solid rgb(196,236,20);
      background-color: rgb(196,236,20);
    }
    #imgdiv table.elm td.d {
      border: 1px solid rgb(158,9,246);
      background-color: rgb(158,9,246);
    }
    #imgdiv table.elm td.s {
      border: 1px solid rgb(69,212,252);
      background-color: rgb(69,212,252);
    }
    #imgdiv table.elm td.y {
      border: 1px solid rgb(0,0,0);
      background-color: rgb(0,0,0);
    }
    #imgdiv table.elm td.n {
      border: 1px solid rgb(142,95,43);
      background-color: rgb(142,95,43);
    }
    #imgdiv table.elm td.f {
      border: 1px solid rgb(120,9,73);
      background-color: rgb(120,9,73);
    }

    #imgdiv div#equip {
      position: absolute;
      top: 60px;
      left: 365px;
      width: 620px;
    }

    #imgdiv dl {
      margin: 0;
    }

    #imgdiv dt {
      font-weight: bold;
      margin-top: 0.25rem;
    }

    #imgdiv dd {
      margin-left: 2em;
    }

    #imgdiv dd.ench4 {
      color: rgb(148, 0, 214);
    }

    #imgdiv dd.ench3 {
      color: rgb(214, 132, 0);
    }

    #imgdiv dd.ench2 {
      color: rgb(0, 107, 189);
    }

    #imgdiv dd.ench1 {
      color: rgb(33, 90, 0);
    }

    #imgdiv dd.ench0 {
      color: rgb(0, 0, 0);
    }

    #imgdiv dd.randopt {
      margin-bottom: 0.2rem;
      display: none;
    }

    #imgdiv dd.randopt.exists {
      color: balck;
      margin-left: 5em;
      display: block;
    }

    #imgdiv dd.shadow {
      display: none;
    }
    #imgdiv dd.shadow.exists {
      color: gray;
      display: block;
    }

    #imgdiv div#cp {
      font-size: 8px;
      position: absolute;
      top: 600px;
      left:365px;
    }
    </style>
    <div id="imgframe">
    <div id="base">
      <span>Base lv.</span>
      <span>${model.status.baseLv}</span>
      <span>/</span>
      <span>${GetJobName(n_A_JOB)}</span>
      <span>/</span>
      <span>Job lv.</span>
      <span>${model.status.jobLv}</span>
    </div>
    <div id="hp">
      <span>HP</span>
      <span>${charaData[CHARA_DATA_INDEX_DISP_MAXHP]}${IsUnconfirmedHP(n_A_JOB, model.status.baseLv) ? "?(情報募集中)" : ""}</span>
    </div>
    <div id="sp">
      <span>SP</span>
      <span>${charaData[CHARA_DATA_INDEX_DISP_MAXSP]}${IsUnconfirmedSP(n_A_JOB, model.status.baseLv) ? "?(情報募集中)" : ""}</span>
    </div>

    <div id="status">
      <table class="status">
        <thead>
          <tr>
            <th colspan="6">ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Str</th>
            <td>${model.status.str}${bonusText(GetBasicStatusBonus(MIG_PARAM_ID_STR))}</td>
            <th>Atk</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_ATK_LEFT]}+${charaData[CHARA_DATA_INDEX_DISP_ATK_RIGHT]}</td>
            <th>Def</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_DEF_LEFT]}+${charaData[CHARA_DATA_INDEX_DISP_DEF_RIGHT]}</td>
          </tr>
          <tr>
            <th>Agi</th>
            <td>${model.status.agi}${bonusText(GetBasicStatusBonus(MIG_PARAM_ID_AGI))}</td>
            <th>Matk</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_MATK_LEFT]}+${charaData[CHARA_DATA_INDEX_DISP_MATK_RIGHT]}</td>
            <th>Mdef</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_MDEF_LEFT]}+${charaData[CHARA_DATA_INDEX_DISP_MDEF_RIGHT]}</td>
          </tr>
          <tr>
            <th>Vit</th>
            <td>${model.status.vit}${bonusText(GetBasicStatusBonus(MIG_PARAM_ID_VIT))}</td>
            <th>Hit</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_HIT]}</td>
            <th>Flee</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_FLEE]}</td>
          </tr>
          <tr>
            <th>Int</th>
            <td>${model.status.int}${bonusText(GetBasicStatusBonus(MIG_PARAM_ID_INT))}</td>
            <th>Cri</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_CRI]}</td>
            <th>Aspd</th>
            <td>${charaData[CHARA_DATA_INDEX_DISP_ASPD]}</td>
          </tr>
          <tr>
            <th>Dex</th>
            <td>${model.status.dex}${bonusText(GetBasicStatusBonus(MIG_PARAM_ID_DEX))}</td>
            <th colspan="3">Status Point</th>
            <td>${GetStatusPointRemain()}</td>
          </tr>
          <tr>
            <th>Luk</th>
            <td>${model.status.luk}${bonusText(GetBasicStatusBonus(MIG_PARAM_ID_LUK))}</td>
            <th>Guild</th>
            <td colspan="3">ROラトリオHub</td>
          </tr>
        </tbody>
      </table>
      <table class="status">
        <thead>
          <tr>
            <th colspan="6">特性ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Pow</th>
            <td>${GetPureStatus(MIG_PARAM_ID_POW)}${bonusText(GetSpecStatusBonus(MIG_PARAM_ID_POW))}</td>
            <th>P.Atk</th>
            <td>${GetDisplayedPAtk()}</td>
            <th>Res</th>
            <td>${GetDisplayedRes()}</td>
          </tr>
          <tr>
            <th>Sta</th>
            <td>${GetPureStatus(MIG_PARAM_ID_STA)}${bonusText(GetSpecStatusBonus(MIG_PARAM_ID_STA))}</td>
            <th>S.Matk</th>
            <td>${GetDisplayedSMatk()}</td>
            <th>Mres</th>
            <td>${GetDisplayedMres()}</td>
          </tr>
          <tr>
            <th>Wis</th>
            <td>${GetPureStatus(MIG_PARAM_ID_WIS)}${bonusText(GetSpecStatusBonus(MIG_PARAM_ID_WIS))}</td>
            <th>H.Plus</th>
            <td>${GetDisplayedHPlus()}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>Spl</th>
            <td>${GetPureStatus(MIG_PARAM_ID_SPL)}${bonusText(GetSpecStatusBonus(MIG_PARAM_ID_SPL))}</td>
            <th>C.Rate</th>
            <td>${GetDisplayedCRate()}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>Con</th>
            <td>${GetPureStatus(MIG_PARAM_ID_CON)}${bonusText(GetSpecStatusBonus(MIG_PARAM_ID_CON))}</td>
            <th colspan="3">T.Status Point</th>
            <td>${GetTStatusPointRemain()}</td>
          </tr>
          <tr>
            <th>Crt</th>
            <td>${GetPureStatus(MIG_PARAM_ID_CRT)}${bonusText(GetSpecStatusBonus(MIG_PARAM_ID_CRT))}</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
      <table class="etc">
        <thead>
          <tr>
            <th colspan="4">Etc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>必中</th>
            <td>${g_perfectHitRate} %</td>
            <th>錐効果</th>
            <td>${g_extraInfoDataBridge.specData[ITEM_SP_KIRI_EFFECT] > 0 ? "あり" : "なし"}</td>
          </tr>
          <tr>
            <th>Def無視</th>
            <td>${g_extraInfoDataBridge.specData[ITEM_SP_IGNORE_DEF_RACE_ALL] + g_extraInfoDataBridge.specData[ITEM_SP_IGNORE_DEF_ALL]} %</td>
            <th>Mdef無視</th>
            <td>${g_extraInfoDataBridge.specData[ITEM_SP_IGNORE_MDEF_RACE_ALL] + g_extraInfoDataBridge.specData[ITEM_SP_IGNORE_MDEF_ALL]} %</td>
          </tr>
          <tr>
            <th>ディレイ減</th>
            <td>${delayDownForDisp} %</td>
            <th>ステ無詠唱</th>
            <td>${g_extraInfoDataBridge.charaData[CHARA_DATA_INDEX_CAST_PARAM]} <span class="denom"> / 265<span></td>
          </tr>
        </tbody>
      </table>
      <table class="elm">
        <thead>
          <tr>
          <th class="u">${GetElementText(0)}</th>
          <th class="m">${GetElementText(1)}</th>
          <th class="t">${GetElementText(2)}</th>
          <th class="h">${GetElementText(3)}</th>
          <th class="k">${GetElementText(4)}</th>
          <th class="d">${GetElementText(5)}</th>
          <th class="s">${GetElementText(6)}</th>
          <th class="y">${GetElementText(7)}</th>
          <th class="n">${GetElementText(8)}</th>
          <th class="f">${GetElementText(9)}</th>
        </tr>
      </head>
      <tbody>
          <tr>
            <td class="u">${regist_ratio[0]}</td>
            <td class="m">${regist_ratio[1]}</td>
            <td class="t">${regist_ratio[2]}</td>
            <td class="h">${regist_ratio[3]}</td>
            <td class="k">${regist_ratio[4]}</td>
            <td class="d">${regist_ratio[5]}</td>
            <td class="s">${regist_ratio[6]}</td>
            <td class="y">${regist_ratio[7]}</td>
            <td class="n">${regist_ratio[8]}</td>
            <td class="f">${regist_ratio[9]}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="equip">
      <dl>
        <dt>【兜上段】</dt>
        <dd class="ench${enchCount(headTop.cards)}">${equipSlot(headTop.equip, headTop.cards, model.defPlus.head, model.defTranscendence.head)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_HEAD_TOP)}">${randopt(EQUIP_REGION_ID_HEAD_TOP)}</dd>
        <dt>【兜中段】</dt>
        <dd class="ench${enchCount(headMid.cards)}">${equipSlot(headMid.equip, headMid.cards)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_HEAD_MID)}">${randopt(EQUIP_REGION_ID_HEAD_MID)}</dd>
        <dt>【兜下段】</dt>
        <dd class="ench${enchCount(headUnder.cards)}">${equipSlot(headUnder.equip, headUnder.cards)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_HEAD_UNDER)}">${randopt(EQUIP_REGION_ID_HEAD_UNDER)}</dd>
        <dt>【鎧】</dt>
        <dd class="ench${enchCount(body.cards)}">${equipSlot(body.equip, body.cards, model.defPlus.body, model.defTranscendence.body)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_BODY)}">${randopt(EQUIP_REGION_ID_BODY)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-body")}">${shadow("eqprgn-body")}</dd>
        <dt>【右手】</dt>
        <dd class="ench${enchCount(armsRight.cards, true)}">${equipSlot(armsRight.equip, armsRight.cards, model.weapon.atkPlus, model.weapon.transcendence)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_ARMS)}">${randopt(EQUIP_REGION_ID_ARMS)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-arms-right")}">${shadow("eqprgn-arms-right")}</dd>
        <dt>【左手】</dt>
        <dd class="ench${enchCount(armsLeftOrShield.cards, n_Nitou)}">${equipSlot(armsLeftOrShield.equip, armsLeftOrShield.cards, n_Nitou ? model.weapon.weapon2AtkPlus : model.defPlus.shield, n_Nitou ? model.weapon.weapon2Transcendence : model.defTranscendence.shield)}</dd>
        <dd class="randopt ${randopt_exists(n_Nitou ? EQUIP_REGION_ID_ARMS_LEFT:EQUIP_REGION_ID_SHIELD)}">${randopt(n_Nitou ? EQUIP_REGION_ID_ARMS_LEFT:EQUIP_REGION_ID_SHIELD)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-arms-left")}">${shadow("eqprgn-arms-left")}</dd>
        <dt>【肩にかける物】</dt>
        <dd class="ench${enchCount(shoulder.cards)}">${equipSlot(shoulder.equip, shoulder.cards, model.defPlus.shoulder, model.defTranscendence.shoulder)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_SHOULDER)}">${randopt(EQUIP_REGION_ID_SHOULDER)}</dd>
        <dt>【靴】</dt>
        <dd class="ench${enchCount(shoes.cards)}">${equipSlot(shoes.equip, shoes.cards, model.defPlus.shoes, model.defTranscendence.shoes)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_SHOES)}">${randopt(EQUIP_REGION_ID_SHOES)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-foot")}">${shadow("eqprgn-foot")}</dd>
        <dt>【アクセサリー(1)】</dt>
        <dd class="ench${enchCount(accessory1.cards)}">${equipSlot(accessory1.equip, accessory1.cards)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_ACCESSORY_1)}">${randopt(EQUIP_REGION_ID_ACCESSORY_1)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-accessory-1")}">${shadow("eqprgn-accessory-1")}</dd>
        <dt>【アクセサリー(2)】</dt>
        <dd class="ench${enchCount(accessory2.cards)}">${equipSlot(accessory2.equip, accessory2.cards)}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_ACCESSORY_2)}">${randopt(EQUIP_REGION_ID_ACCESSORY_2)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-accessory-2")}">${shadow("eqprgn-accessory-2")}</dd>
      </dl>

      <div id="cp">
        <div>© Gravity Co., Ltd. & Lee MyoungJin(studio DTDS). All rights reserved.</div>
        <div>© GungHo Online Entertainment, Inc. All Rights Reserved.</div>
        <div>当コンテンツの再利用（再転載・配布など）は、禁止しています。</div>
      </div>

    </div>
    `;
    $("#imgdiv").remove();
    let div = $("<div>", {
      id: "imgdiv",
    }).css({
      position: "relative",
    })
    div.append(tpl);
    $(".content").append(div);
    const dd = $("#equip dd");
    for (let i = 0; i < dd.length; i++) {
      $(dd[i]).text($(dd[i]).text().replace(/ *\(\+\d+以上\)/g, ""))
      $(dd[i]).text($(dd[i]).text().replace(/【習】/g, ""))
    }
}

import { register, get } from "./engine-registry.js";
import { CARD_KIND_ENCHANT } from "./const/EnumCardKind.js";
import { CHARA_DATA_INDEX_CAST_PARAM } from "./const/EnumCharaDataIndex.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_MID,
    EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_SHOULDER,
} from "./const/EnumEquipRegionId.js";
import { ITEM_SP_IGNORE_DEF_ALL, ITEM_SP_IGNORE_DEF_RACE_ALL, ITEM_SP_IGNORE_MDEF_ALL, ITEM_SP_IGNORE_MDEF_RACE_ALL, ITEM_SP_KIRI_EFFECT } from "./const/EnumItemSpId.js";
import { RND_OPT_DATA_INDEX_SPID } from "./const/EnumRndOptDataIndex.js";
register('generateImage', generateImage);
