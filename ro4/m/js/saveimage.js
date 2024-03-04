$(function () {
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

    #imgdiv div#cp {
      margin-bottom: 1rem;
    }
    </style>
    <div id="imgframe">
    <div id="base">
      <span>Base lv.</span>
      <span>${$("#OBJID_SELECT_BASE_LEVEL").val()}</span>
      <span>/</span>
      <span>${$("#OBJID_SELECT_JOB option:selected").text()}</span>
      <span>/</span>
      <span>Job lv.</span>
      <span>${$("#OBJID_SELECT_JOB_LEVEL").val()}</span>
    </div>
    <div id="hp">
      <span>HP</span>
      <span>${$("#OBJID_SPAN_CHARA_MAXHP").text()}</span>
    </div>
    <div id="sp">
      <span>SP</span>
      <span>${$("#OBJID_SPAN_CHARA_MAXSP").text()}</span>
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
            <td>${$("#OBJID_SELECT_STATUS_STR").val()}${$("#OBJID_SPAN_STATUS_BONUS_STR").text()}</td>
            <th>Atk</th>
            <td>${$("#OBJID_SPAN_CHARA_ATK").text()}</td>
            <th>Def</th>
            <td>${$("#OBJID_SPAN_CHARA_DEF").text()}</td>
          </tr>
          <tr>
            <th>Agi</th>
            <td>${$("#OBJID_SELECT_STATUS_AGI").val()}${$("#OBJID_SPAN_STATUS_BONUS_AGI").text()}</td>
            <th>Matk</th>
            <td>${$("#OBJID_SPAN_CHARA_MATK").text()}</td>
            <th>Mdef</th>
            <td>${$("#OBJID_SPAN_CHARA_MDEF").text()}</td>
          </tr>
          <tr>
            <th>Vit</th>
            <td>${$("#OBJID_SELECT_STATUS_VIT").val()}${$("#OBJID_SPAN_STATUS_BONUS_VIT").text()}</td>
            <th>Hit</th>
            <td>${$("#OBJID_SPAN_CHARA_HIT").text()}</td>
            <th>Flee</th>
            <td>${$("#OBJID_SPAN_CHARA_FLEE").text()}</td>
          </tr>
          <tr>
            <th>Int</th>
            <td>${$("#OBJID_SELECT_STATUS_INT").val()}${$("#OBJID_SPAN_STATUS_BONUS_INT").text()}</td>
            <th>Cri</th>
            <td>${$("#OBJID_SPAN_CHARA_CRI").text()}</td>
            <th>Aspd</th>
            <td>${$("#OBJID_SPAN_CHARA_ASPD").text()}</td>
          </tr>
          <tr>
            <th>Dex</th>
            <td>${$("#OBJID_SELECT_STATUS_DEX").val()}${$("#OBJID_SPAN_STATUS_BONUS_DEX").text()}</td>
            <th colspan="3">Status Point</th>
            <td>${$("#A_STPOINT").text()}</td>
          </tr>
          <tr>
            <th>Luk</th>
            <td>${$("#OBJID_SELECT_STATUS_LUK").val()}${$("#OBJID_SPAN_STATUS_BONUS_LUK").text()}</td>
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
            <td>${$("#OBJID_SELECT_STATUS_POW").val()}${$("#OBJID_SPAN_STATUS_BONUS_POW").text()}</td>
            <th>P.Atk</th>
            <td>${$("#OBJID_SPAN_STATUS_P_ATK").text()}</td>
            <th>Res</th>
            <td>${$("#OBJID_SPAN_STATUS_RES").text()}</td>
          </tr>
          <tr>
            <th>Sta</th>
            <td>${$("#OBJID_SELECT_STATUS_STA").val()}${$("#OBJID_SPAN_STATUS_BONUS_STA").text()}</td>
            <th>S.Matk</th>
            <td>${$("#OBJID_SPAN_STATUS_S_MATK").text()}</td>
            <th>Mres</th>
            <td>${$("#OBJID_SPAN_STATUS_MRES").text()}</td>
          </tr>
          <tr>
            <th>Wis</th>
            <td>${$("#OBJID_SELECT_STATUS_WIS").val()}${$("#OBJID_SPAN_STATUS_BONUS_WIS").text()}</td>
            <th>H.Plus</th>
            <td>${$("#OBJID_SPAN_STATUS_H_PLUS").text()}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>Spl</th>
            <td>${$("#OBJID_SELECT_STATUS_SPL").val()}${$("#OBJID_SPAN_STATUS_BONUS_SPL").text()}</td>
            <th>C.Rate</th>
            <td>${$("#OBJID_SPAN_STATUS_C_RATE").text()}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>Con</th>
            <td>${$("#OBJID_SELECT_STATUS_CON").val()}${$("#OBJID_SPAN_STATUS_BONUS_CON").text()}</td>
            <th colspan="3">T.Status Point</th>
            <td>${$("#OBJID_SPAN_STATUS_T_STATUS_POINT").text()}</td>
          </tr>
          <tr>
            <th>Crt</th>
            <td>${$("#OBJID_SELECT_STATUS_CRT").val()}${$("#OBJID_SPAN_STATUS_BONUS_CRT").text()}</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div id="equip">
      <div id="cp">
        <div>© Gravity Co., Ltd. & Lee MyoungJin(studio DTDS). All rights reserved.</div>
        <div>© GungHo Online Entertainment, Inc. All Rights Reserved.</div>
      </div>
      <strong>== 装備一覧 ==</strong> (※ランダムオプションや補助装備を除く)
      <dl>
        <dt>【兜上段】</dt>
        <dd>+ ${$("#OBJID_HEAD_TOP_REFINE").val()} ${$("#OBJID_HEAD_TOP option:selected").text()} ( ${$("#OBJID_HEAD_TOP_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_TOP_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_TOP_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_TOP_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【兜中段】</dt>
        <dd>${$("#OBJID_HEAD_MID option:selected").text()} ( ${$("#OBJID_HEAD_MID_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_MID_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_MID_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_MID_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【兜下段】</dt>
        <dd>${$("#OBJID_HEAD_UNDER option:selected").text()} ( ${$("#OBJID_HEAD_UNDER_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_UNDER_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_UNDER_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_HEAD_UNDER_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【鎧】</dt>
        <dd>+ ${$("#OBJID_BODY_REFINE").val()} ${$("#OBJID_BODY option:selected").text()} ( ${$("#OBJID_BODY_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_BODY_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_BODY_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_BODY_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【右手】</dt>
        <dd>+ ${$("#OBJID_ARMS_RIGHT_REFINE").val()} ${$("#OBJID_ARMS_RIGHT option:selected").text()} ( ${$("#OBJID_ARMS_RIGHT_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_ARMS_RIGHT_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_ARMS_RIGHT_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_ARMS_RIGHT_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【左手】</dt>
        <dd>+ ${$("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? $("#OBJID_SHIELD_REFINE").val() : $("#OBJID_ARMS_LEFT_REFINE").val()
        } ${$("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? $("#OBJID_SHIELD option:selected").text() : $("#OBJID_ARMS_LEFT option:selected").text()
        } ( ${($("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? $("#OBJID_SHIELD_CARD_1 option:selected").text() : $("#OBJID_ARMS_LEFT_CARD_1 option:selected").text()) || "-"
        } , ${($("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? $("#OBJID_SHIELD_CARD_2 option:selected").text() : $("#OBJID_ARMS_LEFT_CARD_2 option:selected").text()) || "-"
        } , ${($("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? $("#OBJID_SHIELD_CARD_3 option:selected").text() : $("#OBJID_ARMS_LEFT_CARD_3 option:selected").text()) || "-"
        } , ${($("#OBJID_ARMS_LEFT_REFINE").css("visibility") == "hidden" ? $("#OBJID_SHIELD_CARD_4 option:selected").text() : $("#OBJID_ARMS_LEFT_CARD_4 option:selected").text()) || "-"
        } )
        </dd>
        <dt>【肩にかける物】</dt>
        <dd>+ ${$("#OBJID_SHOULDER_REFINE").val()} ${$("#OBJID_SHOULDER option:selected").text()} ( ${$("#OBJID_SHOULDER_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_SHOULDER_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_SHOULDER_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_SHOULDER_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【靴】</dt>
        <dd>+ ${$("#OBJID_SHOES_REFINE").val()} ${$("#OBJID_SHOES option:selected").text()} ( ${$("#OBJID_SHOES_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_SHOES_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_SHOES_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_SHOES_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【アクセサリー(1)】</dt>
        <dd>${$("#OBJID_ACCESSARY_1 option:selected").text()} ( ${$("#OBJID_ACCESSARY_1_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_ACCESSARY_1_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_ACCESSARY_1_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_ACCESSARY_1_CARD_4 option:selected").text() || "-"
        } )
        </dd>
        <dt>【アクセサリー(2)】</dt>
        <dd>${$("#OBJID_ACCESSARY_2 option:selected").text()} ( ${$("#OBJID_ACCESSARY_2_CARD_1 option:selected").text() || "-"
        } , ${$("#OBJID_ACCESSARY_2_CARD_2 option:selected").text() || "-"
        } , ${$("#OBJID_ACCESSARY_2_CARD_3 option:selected").text() || "-"
        } , ${$("#OBJID_ACCESSARY_2_CARD_4 option:selected").text() || "-"
        } )
        </dd>
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
    for(i=0;i<dd.length;i++) {
      $(dd[i]).text($(dd[i]).text().replace(/ *\(\+\d+以上\)/g,""))
      $(dd[i]).text($(dd[i]).text().replace(/\((カードなし|エンチャントなし)\)/g,"-"))
      $(dd[i]).text($(dd[i]).text().replace(/【習】/g,""))
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