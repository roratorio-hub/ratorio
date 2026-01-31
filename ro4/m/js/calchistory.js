$(function () {
  const buildForm = () => {
	let test = document.getElementById("history_graph");
	if (test) {
      return;
	}
    $("#OBJID_ATTACK_SETTING_BLOCK_MIG").after(`
<div id="history_button" style="margin-left:1em;width:4em">
<input type="button" id="history_clip" value="Clip" style="width:100%"><br>
<label style="font-size:x-small;white-space: nowrap;"><input type="checkbox" id="clip_with_memo">memo</label>
<input type="button" id="history_list" value="List" style="margin-top:0.5em;width:100%;font-size:x-small;">
<input type="button" id="history_reset" value="Reset" style="margin-top:1.5em;width:100%">
</div>
<div id="history_container" style="margin-left:1em;padding:0px 5px;height:7em;width:40em">
  <canvas id="history_graph"></canvas>
</div>
<style>
.jquery-modal.blocker {
  z-index: 100 !important;
}
#clip_modal {
  min-width: 800px;
}
#clip_modal_table {
  width: 100%;
  border-collapse: collapse;
}
#clip_modal_table tr{
  border-bottom: 1px solid lightgray;
}
.col {
  width: 7rem;
  text-align: right;
  padding-right: 1rem;
}
.col.no {
  width: 3rem;
}
.col.memo {
  width: unset;
  text-align: left;
  padding: unset;
}
.col.action {
  width: 4.5rem;
  padding-right: unset;
}
.clip_memo {
  width: 100%;
}
div.clip_memo {
  cursor: pointer;
  min-height: 1.5rem;
}
</style>
<div id="clip_modal" class="modal">
  <table id="clip_modal_table">
    <thead><tr>
        <th class="col no">No.</th><th class="col">DPS</th>
        <th class="col">確殺</th>
        <th class="col memo">メモ</th>
        <th class="col action"></th>
    </tr></thead>
    <tbody></tbody>
  </table>
</div>
    `);

    let target = 0;
    const data = {
      labels: [],
      datasets: [{
        label: "DPS",
        data: [],
        borderColor: "#005AFF",
        yAxisID: "y",
      }, {
        label: "確殺",
        data: [],
        borderColor: "#FF4B00",
        yAxisID: "y1",
      }, {
        label: "通常",
        data: [],
        borderColor: "#4DC4FF",
        yAxisID: "y",
      }, {
        label: "1ｻｲｸﾙﾀﾞﾒ",
        data: [],
        borderColor: "#03AF7A",
        yAxisID: "y",
        hidden: true,
      }]
    }
    const footer = (items) => {
      return items[0].dataset.metadata[items[0].parsed.x].memo;
    };
    const ctx = document.getElementById("history_graph");
    let chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: "right"
          },
          tooltip: {
            callbacks: {
              footer: footer,
            }
          },
        },
        stacked: false,
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            grid: {
              drawOnChartArea: false,
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        onClick: (e) => {
          const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          if (chart.data.datasets[0].data.length > dataX) {
            url = chart.data.datasets[0].metadata[Math.abs(dataX)]["url"];
            CSaveController.loadFromURL(url);
            CItemInfoManager.OnClickExtractSwitch();
          }
        }
      }
    });
    $("#history_clip").click(e => {
      // 直前の敵と同じか？
      if (target != $(".OBJID_MONSTER_MAP_MONSTER").val()) {
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.data.datasets[0].metadata = [];
        chart.data.datasets[1].data = [];
        chart.data.datasets[2].data = [];
        chart.data.datasets[3].data = [];
        target = $(".OBJID_MONSTER_MAP_MONSTER").val();
      }
      const mgr = CSaveController.getSaveDataManagerCur();
      mgr.ReCalcManager();
      calc();
      const metadata = { "memo": "", "url": CSaveController.encodeToURL() };
      if ($("#clip_with_memo").prop('checked')) {
        memo = prompt("clipメモ");
        if (memo) metadata["memo"] = memo;
      }
      chart.data.labels.push(chart.data.labels.length + 1);
      const dps = parseFloat($("#BTLRSLT_PART_ATKCNT").parent().prev().prev().prev().prev().text().replaceAll(",", ""))
      chart.data.datasets[0].data.push(isNaN(dps) ? 0 : dps);
      chart.data.datasets[0].metadata.push(metadata);
      const cnt = parseInt($("#BTLRSLT_PART_EXP").parent().prev().prev().text().replaceAll(",", ""));
      chart.data.datasets[1].data.push(isNaN(cnt) ? 0 : cnt);
      const btlrslt_damage_totals = $("#BATTLE_RESULT_DAMAGE").children(".BTLRSLT_DAMAGE_TOTAL");
      const btlrslt_damage_details = $("#BATTLE_RESULT_DAMAGE").children(".BTLRSLT_DAMAGE_DETAIL");
      const dmg_index = btlrslt_damage_totals.length/3;
      const dmg = parseFloat($(btlrslt_damage_totals.get(dmg_index)).text().replaceAll(",", ""));
      const cycle_index = dmg_index + btlrslt_damage_totals.length/3/2;
      chart.data.datasets[2].data.push(isNaN(dmg) ? 0 : dmg);
      const cycle = parseFloat($(btlrslt_damage_details.get(cycle_index)).text().replaceAll(",", ""));
      chart.data.datasets[3].data.push(isNaN(cycle) ? 0 : cycle);
      chart.update();
      g_Chart = chart;
    });
    $("#history_reset").click(e => {
      chart.data.labels = [];
      chart.data.datasets[0].data = [];
      chart.data.datasets[0].metadata = [];
      chart.data.datasets[1].data = [];
      chart.data.datasets[2].data = [];
      chart.data.datasets[3].data = [];
      target = 0;
      chart.update();
      g_Chart = null;
    });
    $("#history_list").click(e => {
      $("#history_graph").insertBefore("#clip_modal_table");
      reload_history_table();
      $("#clip_modal").modal();
    });
    const flip_clip = (i, j) => {
      [data.datasets[0].data[i], data.datasets[0].data[j]] =
        [data.datasets[0].data[j], data.datasets[0].data[i]];
      [data.datasets[0].metadata[i], data.datasets[0].metadata[j]] =
        [data.datasets[0].metadata[j], data.datasets[0].metadata[i]];
      [data.datasets[1].data[i], data.datasets[1].data[j]] =
        [data.datasets[1].data[j], data.datasets[1].data[i]];
      [data.datasets[2].data[i], data.datasets[2].data[j]] =
        [data.datasets[2].data[j], data.datasets[2].data[i]];
      [data.datasets[3].data[i], data.datasets[3].data[j]] =
        [data.datasets[3].data[j], data.datasets[3].data[i]];
    }
    const reload_history_table = () => {
      $("#clip_modal_table tbody *").remove();
      body = ""
      for (i = 0; i < data.labels.length; i++) {
        body += `<tr>
                  <td class="col no">${data.labels[i].toLocaleString()}</td>
                  <td class="col">${data.datasets[0].data[i].toLocaleString()}</td>
                  <td class="col">${data.datasets[1].data[i].toLocaleString()}</td>
                  <td class="col memo"><div class="clip_memo">${data.datasets[0].metadata[i].memo}</div><input type="text" class="clip_memo" style="display:none;" value="${data.datasets[0].metadata[i].memo}"></td>
                  <td class="col action"><button class="up_clip" ${i==0?"disabled":""}>↑</button><button class="down_clip"${i==data.labels.length-1?"disabled":""}>↓</button><button class="remove_clip">×</button></td>
                </tr>`;
      }
      $("#clip_modal_table tbody").append(body);
    }
    $(document).on("click", "div.clip_memo", (e) => {
      $(e.target).toggle();
      $(e.target).next("input").toggle().focus();
    });
    $(document).on("change", "input.clip_memo", (e) => {
      const index = e.target.closest("tr").rowIndex - 1;
      data.datasets[0].metadata[index]["memo"] = e.target.value;
      chart.update();
      reload_history_table();
      g_Chart = chart;
    });
    $(document).on("blur", "input.clip_memo", (e) => {
      $(e.target).toggle();
      $(e.target).prev("div").toggle();
    });
    $(document).on("click", ".up_clip", (e) => {
      const row = e.target.closest("tr");
      if (row.previousElementSibling) {
        const index = row.rowIndex - 1;
        flip_clip(index, index - 1);
        chart.update();
        reload_history_table();
        g_Chart = chart;
      }
    });
    $(document).on("click", ".down_clip", (e) => {
      const row = e.target.closest("tr");
      if (row.nextElementSibling) {
        const index = row.rowIndex - 1;
        flip_clip(index, index + 1);
        chart.update();
        reload_history_table();
        g_Chart = chart;
      }
    });
    $(document).on("click", ".remove_clip", (e) => {
      const row = e.target.closest("tr");
      const index = row.rowIndex - 1;
      data.labels.pop();
      data.datasets[0].data.splice(index, 1);
      data.datasets[0].metadata.splice(index, 1);
      data.datasets[1].data.splice(index, 1);
      data.datasets[2].data.splice(index, 1);
      data.datasets[3].data.splice(index, 1);
      chart.update();
      reload_history_table();
      g_Chart = chart;
    });
    $("#clip_modal").on("modal:before-close", () => {
      $("#history_graph").appendTo("#history_container");
    });
  };
  buildForm();
});
var g_Chart;

