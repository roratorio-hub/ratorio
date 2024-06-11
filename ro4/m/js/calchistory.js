$(function () {
  const buildForm = () => {
    $("#OBJID_ATTACK_SETTING_BLOCK_MIG").after(`
<div style="margin-left:1em;width:4em">
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
}
.col.no {
  width: 3rem;
}
.col.memo {
  width: unset;
  text-align: left;
  padding-left: 1rem;
}
</style>
<div id="clip_modal" class="modal">
  <table id="clip_modal_table">
    <thead><tr><th class="col no">No.</th><th class="col">DPS</th><th class="col">確殺</th><th class="col memo">メモ</th></thead>
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
        borderColor: "blue",
        yAxisID: "y",
      }, {
        label: "確殺",
        data: [],
        borderColor: "red",
        yAxisID: "y1",
      }]
    }
    const footer = (items) => {
      return items[0].dataset.metadata[items[0].parsed.x].memo;
    };
    const ctx = document.getElementById("history_graph");
    const chart = new Chart(ctx, {
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
            LoadSelect2();
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
        target = $(".OBJID_MONSTER_MAP_MONSTER").val();
      }
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
      chart.update();
    });
    $("#history_reset").click(e => {
      chart.data.labels = [];
      chart.data.datasets[0].data = [];
      chart.data.datasets[0].metadata = [];
      chart.data.datasets[1].data = [];
      target = 0;
      chart.update();
    });
    $("#history_list").click(e => {
      $("#clip_modal_table tbody *").remove();
      body = ""
      for (i=0; i<data.labels.length; i++) {
        body += `<tr><td class="col no">${data.labels[i].toLocaleString()}</td><td class="col">${data.datasets[0].data[i].toLocaleString()}</td><td class="col">${data.datasets[1].data[i].toLocaleString()}</td><td class="col memo">${data.datasets[0].metadata[i].memo}</td></tr>`;
      }
      $("#clip_modal_table tbody").append(body);
      $("#clip_modal").modal();
    });
  };
  buildForm();
});
