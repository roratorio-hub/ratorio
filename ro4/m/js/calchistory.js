$(function () {
  const buildForm = () => {
    $("#OBJID_ATTACK_SETTING_BLOCK_MIG").after(`
<div style="margin-left:1em;width:4em">
<input type="button" id="history_clip" value="Clip" style="width:100%"><br>
<input type="button" id="history_reset" value="Reset" style="margin-top:5em;width:100%">
</div>
<div id="history_container" style="margin-left:1em;padding:0px 5px;height:7em;width:40em">
  <canvas id="history_graph"></canvas>
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
            url = chart.data.datasets[0].metadata[Math.abs(dataX)];
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
      chart.data.labels.push(chart.data.labels.length + 1);
      const dps = parseFloat($("#BTLRSLT_PART_ATKCNT").parent().prev().prev().prev().prev().text().replace(",",""))
      chart.data.datasets[0].data.push(isNaN(dps) ? 0 : dps);
      chart.data.datasets[0].metadata.push(CSaveController.encodeToURL())
      const cnt = parseInt($("#BTLRSLT_PART_EXP").parent().prev().prev().text().replace(",",""))
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
  };
  buildForm();
});
