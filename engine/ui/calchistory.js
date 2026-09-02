// === AUTO-GENERATED IMPORTS ===
import { CItemInfoManager } from "../equip/CItemInfoManager.js";
// === END AUTO-GENERATED IMPORTS ===
// C-6: battlecalc.js 公開関数（head-bridge 経由）
import {
         calc,
} from "../battle/battlecalc.js";
// C-6: engine-registry（CSaveController.js との循環 import 回避）
import { get as registryGet } from "../runtime/engine-registry.js";
import { OnDomReady } from "../runtime/dom-ready.js";
import { HtmlGetObjectCheckedById } from "../runtime/util.js";
// Chart.js ESM（auto = 全チャートタイプ登録済みビルド）
import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/auto/+esm';

export let g_Chart;
export function setG_Chart(v) { g_Chart = v; }

/**
 * DPS clip 履歴パネルの静的スケルトンHTML（グラフ・ボタン・モーダルの骨組み）。
 * calchistory.js（新規構築時）と CSaveController.js（セーブデータ復元時）の双方が
 * 同一マークアップを必要とするため共通化する（従来は2箇所にバイト単位で重複していた）。
 *
 * モーダルは jquery-modal ではなくネイティブ <dialog> を使う（jquery-modal はこの
 * パネル2ファイルのみが使っていた唯一の実プラグイン依存だった）。ただし `showModal()`
 * （モーダル・top layer昇格）は使わない —— 内部で最初のフォーカス可能要素へ自動フォーカスし、
 * ブラウザ標準のフォーカス時スクロールでページが scrollY:0 まで巻き戻る副作用があり、
 * 事後に scrollTo() で戻すと今度は top layer の絶対配置がフォーカス確定時点のビューポートで
 * 固定されているためダイアログ自体が画面外にずれる（実測で確認済み）。
 * 代わりに jquery-modal 自身の実装方式（固定オーバーレイ blocker + 中央配置ボックス）を
 * ほぼそのまま踏襲する: `.show()`（非モーダル）+ 自前の #clip_modal_blocker +
 * `position: fixed` 手動配置。これで背景ページの位置に一切触れずに前面へ浮かべられる。
 * ESCキー・backdropクリック・×ボタンでの閉じる操作、フォーカス移動はすべて
 * openHistoryModal()/wireHistoryModalClose() で手動配線する（jquery-modal の既定動作を再現）。
 */
export function buildHistoryPanelHtml() {
    return `
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
#clip_modal_blocker {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
#clip_modal_blocker.active {
  display: block;
}
#clip_modal {
  position: fixed;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  min-width: 800px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 10px #000;
  background: #fff;
  padding: 15px 30px;
  z-index: 1000;
}
#clip_modal_close {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  border: none;
  background: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
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
<div id="clip_modal_blocker"></div>
<dialog id="clip_modal" role="dialog" aria-modal="true">
  <button type="button" id="clip_modal_close" aria-label="閉じる">×</button>
  <table id="clip_modal_table">
    <thead><tr>
        <th class="col no">No.</th><th class="col">DPS</th>
        <th class="col">確殺</th>
        <th class="col memo">メモ</th>
        <th class="col action"></th>
    </tr></thead>
    <tbody></tbody>
  </table>
</dialog>
    `;
}

/** clip履歴モーダルを開く（backdrop表示 + スクロール位置を変えないフォーカス設定）。 */
export function openHistoryModal() {
    document.getElementById("clip_modal_blocker")?.classList.add("active");
    const modal = document.getElementById("clip_modal");
    modal?.show();
    modal?.focus({ preventScroll: true });
}

function closeHistoryModal() {
    document.getElementById("clip_modal")?.close();
}

/**
 * clip履歴モーダルの閉じる操作一式を配線する（×ボタン・backdropクリック・ESCキー）。
 * close イベントで backdrop の非表示化とグラフの元位置への復帰も行う
 * （jquery-modal の `modal:before-close` 相当）。
 * calchistory.js / CSaveController.js の双方の buildForm から1回ずつ呼ぶ。
 */
export function wireHistoryModalClose() {
    document.getElementById("clip_modal_close")?.addEventListener("click", closeHistoryModal);
    document.getElementById("clip_modal_blocker")?.addEventListener("click", closeHistoryModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.getElementById("clip_modal")?.open) closeHistoryModal();
    });
    document.getElementById("clip_modal")?.addEventListener("close", () => {
        document.getElementById("clip_modal_blocker")?.classList.remove("active");
        const graph = document.getElementById("history_graph");
        const container = document.getElementById("history_container");
        if (graph && container) container.appendChild(graph);
    });
}

/** HTMLエスケープ（テキスト内容・二重引用符属性値の両方に安全）。 */
function escapeHtml(text) {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

/**
 * clip 履歴テーブルの1行分のHTMLを組み立てる。
 * memo はユーザーが prompt() で自由入力した文字列で、テキスト内容と value 属性の
 * 両方に埋め込まれるため escapeHtml() で必ずエスケープする（従来は無エスケープで、
 * 二重引用符を含むメモが value 属性を脱出できた。セーブデータに同梱されるURLに
 * このメモも乗るため self-XSS に留まらない）。
 */
export function buildHistoryRowHtml({ no, dps, kill, memo, isFirst, isLast }) {
    const escapedMemo = escapeHtml(memo);
    return `<tr>
              <td class="col no">${no}</td>
              <td class="col">${dps}</td>
              <td class="col">${kill}</td>
              <td class="col memo"><div class="clip_memo">${escapedMemo}</div><input type="text" class="clip_memo" style="display:none;" value="${escapedMemo}"></td>
              <td class="col action"><button class="up_clip" ${isFirst ? "disabled" : ""}>↑</button><button class="down_clip"${isLast ? "disabled" : ""}>↓</button><button class="remove_clip">×</button></td>
            </tr>`;
}

/**
 * el から前方（DOM順で手前）に n 個ぶん previousElementSibling を辿る。テキストノードは無視する。
 * calchistory.js / CSaveController.js の双方で使う。
 */
export function prevElementSibling(el, n) {
    for (let i = 0; i < n && el; i++) el = el.previousElementSibling;
    return el;
}

/**
 * el の子要素のうち selector に一致するものだけを配列で返す。
 * calchistory.js / CSaveController.js の双方で使う。
 */
export function childrenMatching(el, selector) {
    return el ? Array.from(el.children).filter((c) => c.matches(selector)) : [];
}

/**
 * clip 履歴テーブルの memo 欄（div ⇄ input）の表示/編集を切り替える。
 * calchistory.js（新規構築時）と CSaveController.js（セーブ復元時）の双方で使う。
 */
export function setMemoEditing(div, input, editing) {
    div.style.display = editing ? "none" : "";
    input.style.display = editing ? "" : "none";
}

OnDomReady(() => {
  const buildForm = () => {
	let test = document.getElementById("history_graph");
	if (test) {
      return;
	}
    document.getElementById("OBJID_ATTACK_SETTING_BLOCK_MIG")?.insertAdjacentHTML("afterend", buildHistoryPanelHtml());

    let target = 0;
    const data = {
      labels: [],
      datasets: [{
        label: "DPS",
        data: [],
        metadata: [],
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
          // v4: onClick の e は ChartEvent — e.x がキャンバス座標を直接保持
          const dataX = chart.scales.x.getValueForPixel(e.x);
          if (chart.data.datasets[0].data.length > dataX) {
            let url = chart.data.datasets[0].metadata[Math.abs(dataX)]["url"];
            registryGet('CSaveController').loadFromURL(url);
            CItemInfoManager.OnClickExtractSwitch();
          }
        }
      }
    });
    g_Chart = chart;
    document.getElementById("history_clip")?.addEventListener("click", (e) => {
      // 直前の敵と同じか？
      if (target != document.querySelector(".OBJID_MONSTER_MAP_MONSTER")?.value) {
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.data.datasets[0].metadata = [];
        chart.data.datasets[1].data = [];
        chart.data.datasets[2].data = [];
        chart.data.datasets[3].data = [];
        target = document.querySelector(".OBJID_MONSTER_MAP_MONSTER")?.value;
      }
      const mgr = registryGet('CSaveController').getSaveDataManagerCur();
      mgr.ReCalcManager();
      calc();
      LoadTomSelect();
      const metadata = { "memo": "", "url": registryGet('CSaveController').encodeToURL() };
      if (HtmlGetObjectCheckedById("clip_with_memo", false)) {
        let memo = prompt("clipメモ");
        if (memo) metadata["memo"] = memo;
      }
      chart.data.labels.push(chart.data.labels.length + 1);
      const dps = parseFloat((prevElementSibling(document.getElementById("BTLRSLT_PART_ATKCNT")?.parentElement, 4)?.textContent ?? "").replaceAll(",", ""))
      chart.data.datasets[0].data.push(isNaN(dps) ? 0 : dps);
      chart.data.datasets[0].metadata.push(metadata);
      const cnt = parseInt((prevElementSibling(document.getElementById("BTLRSLT_PART_EXP")?.parentElement, 2)?.textContent ?? "").replaceAll(",", ""));
      chart.data.datasets[1].data.push(isNaN(cnt) ? 0 : cnt);
      const btlrslt_damage_totals = childrenMatching(document.getElementById("BATTLE_RESULT_DAMAGE"), ".BTLRSLT_DAMAGE_TOTAL");
      const btlrslt_damage_details = childrenMatching(document.getElementById("BATTLE_RESULT_DAMAGE"), ".BTLRSLT_DAMAGE_DETAIL");
      const dmg_index = btlrslt_damage_totals.length/3;
      const dmg = parseFloat((btlrslt_damage_totals[dmg_index]?.textContent ?? "").replaceAll(",", ""));
      const cycle_index = dmg_index + btlrslt_damage_totals.length/3/2;
      chart.data.datasets[2].data.push(isNaN(dmg) ? 0 : dmg);
      const cycle = parseFloat((btlrslt_damage_details[cycle_index]?.textContent ?? "").replaceAll(",", ""));
      chart.data.datasets[3].data.push(isNaN(cycle) ? 0 : cycle);
      chart.update();
      g_Chart = chart;
    });
    document.getElementById("history_reset")?.addEventListener("click", (e) => {
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
    document.getElementById("history_list")?.addEventListener("click", (e) => {
      document.getElementById("clip_modal_table")?.before(document.getElementById("history_graph"));
      reload_history_table();
      openHistoryModal();
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
      document.querySelector("#clip_modal_table tbody")?.replaceChildren();
      let body = ""
      for (let i = 0; i < data.labels.length; i++) {
        body += buildHistoryRowHtml({
          no: data.labels[i].toLocaleString(),
          dps: data.datasets[0].data[i].toLocaleString(),
          kill: data.datasets[1].data[i].toLocaleString(),
          memo: data.datasets[0].metadata[i].memo,
          isFirst: i === 0,
          isLast: i === data.labels.length - 1,
        });
      }
      document.querySelector("#clip_modal_table tbody")?.insertAdjacentHTML("beforeend", body);
    }
    document.addEventListener("click", (e) => {
      const target = e.target.closest("div.clip_memo");
      if (!target) return;
      const input = target.nextElementSibling;
      if (!input) return;
      setMemoEditing(target, input, true);
      input.focus();
    });
    document.addEventListener("change", (e) => {
      const target = e.target.closest("input.clip_memo");
      if (!target || g_Chart !== chart) return;
      const index = target.closest("tr").rowIndex - 1;
      data.datasets[0].metadata[index]["memo"] = target.value;
      chart.update();
      reload_history_table();
      g_Chart = chart;
    });
    document.addEventListener("focusout", (e) => {
      const target = e.target.closest("input.clip_memo");
      if (!target) return;
      const div = target.previousElementSibling;
      if (div) setMemoEditing(div, target, false);
    });
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".up_clip");
      if (!target || g_Chart !== chart) return;
      const row = target.closest("tr");
      if (row.previousElementSibling) {
        const index = row.rowIndex - 1;
        flip_clip(index, index - 1);
        chart.update();
        reload_history_table();
        g_Chart = chart;
      }
    });
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".down_clip");
      if (!target || g_Chart !== chart) return;
      const row = target.closest("tr");
      if (row.nextElementSibling) {
        const index = row.rowIndex - 1;
        flip_clip(index, index + 1);
        chart.update();
        reload_history_table();
        g_Chart = chart;
      }
    });
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".remove_clip");
      if (!target || g_Chart !== chart) return;
      const row = target.closest("tr");
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
    wireHistoryModalClose();
  };
  buildForm();
});

