// sample
// https://ragnarokonline.gungho.jp/campaign_event/campaign/baselv220cp-2.html#modal
// calcx.html?cx1cy1EtMmfo4Owqof.3M4X00cz11003-jkGlEgXaEjrmlefu0cz120032jAp3Vzgvlcz13.4fYl3cz14.4hj1cz15003Ydw7r8m4Inp6cw8cz16003OfJC0xmRjtn5Nacz170032j8nn3dksScz18.4fIm3cz19.32dhop8cz1a003_hcquumkYt6nsQmuaG0cz1b.4hM1cz1c.4hOacA1Z_1127456b89a3cA128c0cB1.sf_V___51d171n5n5nll5dldldl511cC1.ecR1.4S8cU1.cg003cW100Bcl3cZ121
$(function () {
  const v = (selector) => {
    return $(selector).val() || $(selector).text();
  }
  const t = (selector) => {
    return $(selector).text() || $(selector).val();
  }
  const e = (selector) => {
    if (v(selector) == "0") {
      return "-";
    }
    return t(selector);
  }
  const ench_count = (selector) => {
    count = 0;
    for (i = 1; i < 5; i++) {
      if (i==1){
        if (CARD_KIND_ENCHANT == CardObjNew[v(`${selector}_CARD_${i}`)][1]) {
          count++;
        }
      } else if (v(`${selector}_CARD_${i}`) != "0"){
        count++;
      }
    }
    return count
  }
  const equip = (selector) => {
    text = "";
    if (v(selector + "_REFINE") != 0) {
      text += `+${v(selector + "_REFINE")} `;
    }
    text +=
      `${t(selector + " option:selected")} ( ${e(selector + "_CARD_1 option:selected") || "-"
      } , ${e(selector + "_CARD_2 option:selected") || "-"
      } , ${e(selector + "_CARD_3 option:selected") || "-"
      } , ${e(selector + "_CARD_4 option:selected") || "-"
      } )`;
    return text;
  }

  $("#save_image").click(function () {
    tpl = `
    <style>
    #imgdiv {
      background-color: white;
      width: 1030;
      height: 720;
    }
    #imgdiv>* {
      font-size: 12px;
      font-family: sans-serif;
    }

    #imgdiv div#imgframe {
      background-image: url(../../ro4/m/img/frame.png);
      width: 1030;
      height: 720;
    }

    #imgdiv div#base {
      position: relative;
      top: 60;
      left: 40;
    }

    #imgdiv div#hp {
      position: relative;
      top: 70;
      left: 40;
    }

    #imgdiv div#sp {
      position: relative;
      top: 80px;
      left: 40;
    }

    #imgdiv div#status {
      position: relative;
      top: 150;
      left: 30;
      width: 290;
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

    #imgdiv div#equip {
      position: relative;
      top: -365;
      left: 365;
      width: 620;
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

    #imgdiv div#cp {
      margin-bottom: 1rem;
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
      <br />
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
    </div>

    <div id="equip">
      <div id="cp">
        <div>© Gravity Co., Ltd. & Lee MyoungJin(studio DTDS). All rights reserved.</div>
        <div>© GungHo Online Entertainment, Inc. All Rights Reserved.</div>
        <div>当コンテンツの再利用（再転載・配布など）は、禁止しています。</div>
      </div>
      <strong>== 装備一覧 ==</strong> (※ランダムオプションや補助装備を除く)
      <dl>
        <dt>【兜上段】</dt>
        <dd class="ench${ench_count("#OBJID_HEAD_TOP")}">${equip("#OBJID_HEAD_TOP")}</dd>
        <dt>【兜中段】</dt>
        <dd class="ench${ench_count("#OBJID_HEAD_MID")}">${equip("#OBJID_HEAD_MID")}</dd>
        <dt>【兜下段】</dt>
        <dd class="ench${ench_count("#OBJID_HEAD_UNDER")}">${equip("#OBJID_HEAD_UNDER")}</dd>
        <dt>【鎧】</dt>
        <dd class="ench${ench_count("#OBJID_BODY")}">${equip("#OBJID_BODY")}</dd>
        <dt>【右手】</dt>
        <dd class="ench${ench_count("#OBJID_ARMS_RIGHT")}">${equip("#OBJID_ARMS_RIGHT")}</dd>
        <dt>【左手】</dt>
        <dd class="ench${ench_count($("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? "#OBJID_SHIELD" : "#OBJID_ARMS_LEFT")}">${equip($("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? "#OBJID_SHIELD" : "#OBJID_ARMS_LEFT")}</dd>
        <dt>【肩にかける物】</dt>
        <dd class="ench${ench_count("#OBJID_SHOULDER")}">${equip("#OBJID_SHOULDER")}</dd>
        <dt>【靴】</dt>
        <dd class="ench${ench_count("#OBJID_SHOES")}">${equip("#OBJID_SHOES")}</dd>
        <dt>【アクセサリー(1)】</dt>
        <dd class="ench${ench_count("#OBJID_ACCESSARY_1")}">${equip("#OBJID_ACCESSARY_1")}</dd>
        <dt>【アクセサリー(2)】</dt>
        <dd class="ench${ench_count("#OBJID_ACCESSARY_2")}">${equip("#OBJID_ACCESSARY_2")}</dd>
      </dl>
    </div>
    `;
    div = $("<div>", {
      id: "imgdiv",
    }).css({
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