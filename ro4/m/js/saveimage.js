// sample
// https://ragnarokonline.gungho.jp/campaign_event/campaign/baselv220cp-2.html#modal
// calcx.html?cx1cy1EtMmfo4Owqof.3M4X00cz11.32jYJlE0cz120022jAp3VvR1cz13.4fYl3cz14.4hj1cz15002Edw7Bot9w8cz16002yfJC0xiTd62cz170022j8nn3td2cz18.4fIm3cz19.32dhop8cz1a002GhcqRoQmQ6G8cz1b.4hM1cz1c.4hOacz1d00s0hPgX1h_1cz1e00c0jP1to02cz1f00s0jOfup0z0cz1g00c0jP2vq01cz1h00s0jPjsr0utcz1i.4mcA1Z_1127456b89a3cA128c0cA1vgfdejgh2cB1.sf_V___51d171n5n5nll5dldldl511cC1.ecR1.4S8cU1.cg003cW100Bcl3cZ121
$(function () {
  const v = (selector) => {
    return $(selector).val() || $(selector).text();
  }
  const t = (selector) => {
    return $(selector).text() || $(selector).val();
  }
  const e = (selector, none_str = "-") => {
    if (v(selector) == "0") {
      return none_str;
    }
    return t(selector);
  }
  const ench_count = (selector, is_weapon = false) => {
    count = 0;
    for (i = 1; i < 5; i++) {
      const card_id = v(`#DATA_${selector}_CARD_${i}`)
      if (i == 1 || is_weapon) {
        if (CARD_KIND_ENCHANT == CardObjNew[card_id][1]) {
          count++;
        }
      } else if (card_id != "0") {
        // アルファコアは4スロにカードがくるがエンチャ扱いなので
        // 防具系は1スロのエンチャチェック以外は何か設定されていれば計上する
        count++;
      }
    }
    return count
  }
  const equip = (selector) => {
    const equip_id = t("#DATA_" + selector);
    const equip_name = equip_id == 0 ? "-" : ItemObjNew[equip_id][8];
    const refined = v(`#${selector}_REFINE`);
    const transcendence = v(`#${selector}_TRANSCENDENCE`);

    let text = "";
    if (refined != 0) {
      text += `+${refined} `;
    }
    if (transcendence != 0) {
      text += `[★${transcendence}] `;
    }
    text += equip_name + " ( ";
    enchants = [];
    [1, 2, 3, 4].forEach(v => {
      const card_id = t(`#DATA_${selector}_CARD_${v}`);
      enchants.push(card_id == 0 ? "-" : CardObjNew[card_id][2]);
    });
    text += enchants.join(", ");
    text += " )";
    return text;
  }
  const randopt_exists = (id) => {
    return g_equipRndOptTable[id].filter(v=>{return v[0]>0}).length>0? "exists" : "";
  }
  const randopt = (id) => {
    text = "[ ";
    options = []
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
    return g_shadowEquipController.getEquippedID(selector) != 0 ? "exists" : "";
  }
  const shadow = (selector) => {
    const shadow_id = g_shadowEquipController.getEquippedID(selector);
    if (shadow_id == 0) {
      return;
    }
    const refined = g_shadowEquipController.getRefined(selector);
    const shadow_name = ItemObjNew[shadow_id][8];
    const opt_info = g_shadowEquipController.getRndOptInfoArray(selector)

    text = "";
    if (refined != 0) {
      text += `+${refined} `;
    }
    text += shadow_name + " ( ";
    options = []
    opt_info.forEach(value => {
      if (value[0] != 0) {
        options.push(GetRndOptDispName(g_rndOptArray[value[0]][RND_OPT_DATA_INDEX_SPID]) + " " + value[1])
      }
    })
    text += options.join(", ")
    text += " )"
    return text;
  }

  $("#OBJID_BUTTON_IMAGE_SAVE_DATA_MIG").click(function () {
    regist_elm_vanity = [];
    elm_ratio = [];
    regist_ratio = [];
    for (idx = 0; idx < ELM_ID_COUNT; idx++) {
      regist_elm_vanity[idx] = n_tok[ITEM_SP_RESIST_ELM_VANITY + idx];
      elm_ratio[idx] = zokusei[n_A_BodyZokusei * 10 + 1][idx] + 100;
      regist_ratio[idx] = Math.floor(elm_ratio[idx] - Math.floor(regist_elm_vanity[idx] * elm_ratio[idx]) / 100);
    }
    tpl = `
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
      background-image: url(../../ro4/m/img/frame.png);
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
      <span>${v("#OBJID_SELECT_BASE_LEVEL")}</span>
      <span>/</span>
      <span>${t("#OBJID_SELECT_JOB option:selected")}</span>
      <span>/</span>
      <span>Job lv.</span>
      <span>${v("#OBJID_SELECT_JOB_LEVEL")}</span>
    </div>
    <div id="hp">
      <span>HP</span>
      <span>${t("#OBJID_SPAN_CHARA_MAXHP")}</span>
    </div>
    <div id="sp">
      <span>SP</span>
      <span>${t("#OBJID_SPAN_CHARA_MAXSP")}</span>
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
            <td>${v("#OBJID_SELECT_STATUS_STR")}${t("#OBJID_SPAN_STATUS_BONUS_STR")}</td>
            <th>Atk</th>
            <td>${t("#OBJID_SPAN_CHARA_ATK")}</td>
            <th>Def</th>
            <td>${t("#OBJID_SPAN_CHARA_DEF")}</td>
          </tr>
          <tr>
            <th>Agi</th>
            <td>${v("#OBJID_SELECT_STATUS_AGI")}${t("#OBJID_SPAN_STATUS_BONUS_AGI")}</td>
            <th>Matk</th>
            <td>${t("#OBJID_SPAN_CHARA_MATK")}</td>
            <th>Mdef</th>
            <td>${t("#OBJID_SPAN_CHARA_MDEF")}</td>
          </tr>
          <tr>
            <th>Vit</th>
            <td>${v("#OBJID_SELECT_STATUS_VIT")}${t("#OBJID_SPAN_STATUS_BONUS_VIT")}</td>
            <th>Hit</th>
            <td>${t("#OBJID_SPAN_CHARA_HIT")}</td>
            <th>Flee</th>
            <td>${t("#OBJID_SPAN_CHARA_FLEE")}</td>
          </tr>
          <tr>
            <th>Int</th>
            <td>${v("#OBJID_SELECT_STATUS_INT")}${t("#OBJID_SPAN_STATUS_BONUS_INT")}</td>
            <th>Cri</th>
            <td>${t("#OBJID_SPAN_CHARA_CRI")}</td>
            <th>Aspd</th>
            <td>${t("#OBJID_SPAN_CHARA_ASPD")}</td>
          </tr>
          <tr>
            <th>Dex</th>
            <td>${v("#OBJID_SELECT_STATUS_DEX")}${t("#OBJID_SPAN_STATUS_BONUS_DEX")}</td>
            <th colspan="3">Status Point</th>
            <td>${t("#A_STPOINT")}</td>
          </tr>
          <tr>
            <th>Luk</th>
            <td>${v("#OBJID_SELECT_STATUS_LUK")}${t("#OBJID_SPAN_STATUS_BONUS_LUK")}</td>
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
            <td>${v("#OBJID_SELECT_STATUS_POW")}${t("#OBJID_SPAN_STATUS_BONUS_POW")}</td>
            <th>P.Atk</th>
            <td>${t("#OBJID_SPAN_STATUS_P_ATK")}</td>
            <th>Res</th>
            <td>${t("#OBJID_SPAN_STATUS_RES")}</td>
          </tr>
          <tr>
            <th>Sta</th>
            <td>${v("#OBJID_SELECT_STATUS_STA")}${t("#OBJID_SPAN_STATUS_BONUS_STA")}</td>
            <th>S.Matk</th>
            <td>${t("#OBJID_SPAN_STATUS_S_MATK")}</td>
            <th>Mres</th>
            <td>${t("#OBJID_SPAN_STATUS_MRES")}</td>
          </tr>
          <tr>
            <th>Wis</th>
            <td>${v("#OBJID_SELECT_STATUS_WIS")}${t("#OBJID_SPAN_STATUS_BONUS_WIS")}</td>
            <th>H.Plus</th>
            <td>${t("#OBJID_SPAN_STATUS_H_PLUS")}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>Spl</th>
            <td>${v("#OBJID_SELECT_STATUS_SPL")}${t("#OBJID_SPAN_STATUS_BONUS_SPL")}</td>
            <th>C.Rate</th>
            <td>${t("#OBJID_SPAN_STATUS_C_RATE")}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>Con</th>
            <td>${v("#OBJID_SELECT_STATUS_CON")}${t("#OBJID_SPAN_STATUS_BONUS_CON")}</td>
            <th colspan="3">T.Status Point</th>
            <td>${t("#OBJID_SPAN_STATUS_T_STATUS_POINT")}</td>
          </tr>
          <tr>
            <th>Crt</th>
            <td>${v("#OBJID_SELECT_STATUS_CRT")}${t("#OBJID_SPAN_STATUS_BONUS_CRT")}</td>
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
            <td>${CExtraInfoAreaComponentManager.specData[ITEM_SP_KIRI_EFFECT] > 0 ? "あり" : "なし"}</td>
          </tr>
          <tr>
            <th>Def無視</th>
            <td>${CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_DEF_ALL]} %</td>
            <th>Mdef無視</th>
            <td>${CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_MDEF_ALL]} %</td>
          </tr>
          <tr>
            <th>ディレイ減</th>
            <td>${delayDownForDisp} %</td>
            <th>ステ無詠唱</th>
            <td>${CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_CAST_PARAM]} <span class="denom"> / 265<span></td>
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
        <dd class="ench${ench_count("OBJID_HEAD_TOP")}">${equip("OBJID_HEAD_TOP")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_HEAD_TOP)}">${randopt(EQUIP_REGION_ID_HEAD_TOP)}</dd>
        <dt>【兜中段】</dt>
        <dd class="ench${ench_count("OBJID_HEAD_MID")}">${equip("OBJID_HEAD_MID")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_HEAD_MID)}">${randopt(EQUIP_REGION_ID_HEAD_MID)}</dd>
        <dt>【兜下段】</dt>
        <dd class="ench${ench_count("OBJID_HEAD_UNDER")}">${equip("OBJID_HEAD_UNDER")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_HEAD_UNDER)}">${randopt(EQUIP_REGION_ID_HEAD_UNDER)}</dd>
        <dt>【鎧】</dt>
        <dd class="ench${ench_count("OBJID_BODY")}">${equip("OBJID_BODY")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_BODY)}">${randopt(EQUIP_REGION_ID_BODY)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-body")}">${shadow("eqprgn-body")}</dd>
        <dt>【右手】</dt>
        <dd class="ench${ench_count("OBJID_ARMS_RIGHT", true)}">${equip("OBJID_ARMS_RIGHT")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_ARMS)}">${randopt(EQUIP_REGION_ID_ARMS)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-arms-right")}">${shadow("eqprgn-arms-right")}</dd>
        <dt>【左手】</dt>
        <dd class="ench${ench_count(n_Nitou ? "OBJID_ARMS_LEFT" : "OBJID_SHIELD", n_Nitou)}">${equip(n_Nitou ? "OBJID_ARMS_LEFT" : "OBJID_SHIELD")}</dd>
        <dd class="randopt ${randopt_exists(n_Nitou ? EQUIP_REGION_ID_ARMS_LEFT:EQUIP_REGION_ID_SHIELD)}">${randopt(n_Nitou ? EQUIP_REGION_ID_ARMS_LEFT:EQUIP_REGION_ID_SHIELD)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-arms-left")}">${shadow("eqprgn-arms-left")}</dd>
        <dt>【肩にかける物】</dt>
        <dd class="ench${ench_count("OBJID_SHOULDER")}">${equip("OBJID_SHOULDER")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_SHOULDER)}">${randopt(EQUIP_REGION_ID_SHOULDER)}</dd>
        <dt>【靴】</dt>
        <dd class="ench${ench_count("OBJID_SHOES")}">${equip("OBJID_SHOES")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_SHOES)}">${randopt(EQUIP_REGION_ID_SHOES)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-foot")}">${shadow("eqprgn-foot")}</dd>
        <dt>【アクセサリー(1)】</dt>
        <dd class="ench${ench_count("OBJID_ACCESSARY_1")}">${equip("OBJID_ACCESSARY_1")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_ACCESSARY_1)}">${randopt(EQUIP_REGION_ID_ACCESSARY_1)}</dd>
        <dd class="shadow ${shadow_exists("eqprgn-accessory-1")}">${shadow("eqprgn-accessory-1")}</dd>
        <dt>【アクセサリー(2)】</dt>
        <dd class="ench${ench_count("OBJID_ACCESSARY_2")}">${equip("OBJID_ACCESSARY_2")}</dd>
        <dd class="randopt ${randopt_exists(EQUIP_REGION_ID_ACCESSARY_2)}">${randopt(EQUIP_REGION_ID_ACCESSARY_2)}</dd>
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
    div = $("<div>", {
      id: "imgdiv",
    }).css({
      position: "relative",
    })
    div.append(tpl);
    $(".content").append(div);
    dd = $("#equip dd");
    for (i = 0; i < dd.length; i++) {
      $(dd[i]).text($(dd[i]).text().replace(/ *\(\+\d+以上\)/g, ""))
      $(dd[i]).text($(dd[i]).text().replace(/【習】/g, ""))
    }

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