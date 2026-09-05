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
import { runWithLoadingIndicator } from "./loading-indicator.js";
// Chart.js ESM（auto = 全チャートタイプ登録済みビルド）
import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/auto/+esm';

/** 現在表示中の clip 履歴パネルの Chart.js インスタンス（CSaveController.js#encodeToURL が読む）。 */
export let g_Chart;

/** document 委譲リスナー（wireDocumentDelegates）を配線済みか。プロセス生涯で1回だけ登録する。 */
let delegatesWired = false;

/** 現在のパネルの状態。restore による作り直し・委譲リスナーの双方から共有で読み書きする。 */
const panel = { chart: null, data: null, target: 0 };

const HISTORY_PANEL_STYLE_ID = "history_panel_style";

/** clip 履歴パネルの静的CSSを `<head>` へ1回だけ注入する。 */
function ensureHistoryPanelStyle() {
    if (document.getElementById(HISTORY_PANEL_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = HISTORY_PANEL_STYLE_ID;
    style.textContent = `
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
`;
    document.head.appendChild(style);
}

/**
 * clip 履歴パネルの静的スケルトンHTML（グラフ・ボタン・モーダルの骨組み。CSSは含まない
 * ——ensureHistoryPanelStyle() が別途1回だけ注入する）。
 *
 * モーダルは jquery-modal ではなくネイティブ `<dialog>` を使う。ただし `showModal()`
 * （モーダル・top layer昇格）は使わない —— 内部で最初のフォーカス可能要素へ自動フォーカスし、
 * ブラウザ標準のフォーカス時スクロールでページが scrollY:0 まで巻き戻る副作用があり、
 * 事後に scrollTo() で戻すと今度は top layer の絶対配置がフォーカス確定時点のビューポートで
 * 固定されているためダイアログ自体が画面外にずれる（実測で確認済み）。
 * 代わりに jquery-modal 自身の実装方式（固定オーバーレイ blocker + 中央配置ボックス）を
 * ほぼそのまま踏襲する: `.show()`（非モーダル）+ 自前の #clip_modal_blocker +
 * `position: fixed` 手動配置。これで背景ページの位置に一切触れずに前面へ浮かべられる。
 * ESCキー・backdropクリック・×ボタンでの閉じる操作、フォーカス移動は
 * buildHistoryPanel() 側で配線する（jquery-modal の既定動作を再現）。
 */
function buildHistoryPanelHtml() {
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
function openHistoryModal() {
    document.getElementById("clip_modal_blocker")?.classList.add("active");
    const modal = document.getElementById("clip_modal");
    modal?.show();
    modal?.focus({ preventScroll: true });
}

function closeHistoryModal() {
    document.getElementById("clip_modal")?.close();
}

/**
 * clip履歴モーダルの要素スコープの閉じる操作（×ボタン・backdropクリック・closeイベント）を配線する。
 * 毎回新規生成される要素に対して行うため、buildHistoryPanel() から呼ばれるたびに実行してよい
 * （ESCキーはdocument委譲なのでwireDocumentDelegates()側で1回だけ登録する）。
 */
function wireHistoryModalClose() {
    document.getElementById("clip_modal_close")?.addEventListener("click", closeHistoryModal);
    document.getElementById("clip_modal_blocker")?.addEventListener("click", closeHistoryModal);
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
 * 両方に埋め込まれるため escapeHtml() で必ずエスケープする（セーブデータに同梱される
 * URLにこのメモも乗るため self-XSS に留まらない）。
 */
function buildHistoryRowHtml({ no, dps, kill, memo, isFirst, isLast }) {
    const escapedMemo = escapeHtml(memo);
    return `<tr>
              <td class="col no">${no}</td>
              <td class="col">${dps}</td>
              <td class="col">${kill}</td>
              <td class="col memo"><div class="clip_memo">${escapedMemo}</div><input type="text" class="clip_memo" style="display:none;" value="${escapedMemo}"></td>
              <td class="col action"><button class="up_clip" ${isFirst ? "disabled" : ""}>↑</button><button class="down_clip"${isLast ? "disabled" : ""}>↓</button><button class="remove_clip">×</button></td>
            </tr>`;
}

/** el から前方（DOM順で手前）に n 個ぶん previousElementSibling を辿る。テキストノードは無視する。 */
function prevElementSibling(el, n) {
    for (let i = 0; i < n && el; i++) el = el.previousElementSibling;
    return el;
}

/** el の子要素のうち selector に一致するものだけを配列で返す。 */
function childrenMatching(el, selector) {
    return el ? Array.from(el.children).filter((c) => c.matches(selector)) : [];
}

/** clip 履歴テーブルの memo 欄（div ⇄ input）の表示/編集を切り替える。 */
function setMemoEditing(div, input, editing) {
    div.style.display = editing ? "none" : "";
    input.style.display = editing ? "" : "none";
}

/** panel.data の i 番目と j 番目のデータ点（DPS/確殺/通常/1ｻｲｸﾙﾀﾞﾒ・metadata）を入れ替える。 */
function flipClip(i, j) {
    const d = panel.data;
    [d.datasets[0].data[i], d.datasets[0].data[j]] = [d.datasets[0].data[j], d.datasets[0].data[i]];
    [d.datasets[0].metadata[i], d.datasets[0].metadata[j]] = [d.datasets[0].metadata[j], d.datasets[0].metadata[i]];
    [d.datasets[1].data[i], d.datasets[1].data[j]] = [d.datasets[1].data[j], d.datasets[1].data[i]];
    [d.datasets[2].data[i], d.datasets[2].data[j]] = [d.datasets[2].data[j], d.datasets[2].data[i]];
    [d.datasets[3].data[i], d.datasets[3].data[j]] = [d.datasets[3].data[j], d.datasets[3].data[i]];
}

/** #clip_modal_table の行を panel.data から再構築する。 */
function reloadHistoryTable() {
    const d = panel.data;
    document.querySelector("#clip_modal_table tbody")?.replaceChildren();
    let body = "";
    for (let i = 0; i < d.labels.length; i++) {
        body += buildHistoryRowHtml({
            no: d.labels[i].toLocaleString(),
            dps: d.datasets[0].data[i].toLocaleString(),
            kill: d.datasets[1].data[i].toLocaleString(),
            memo: d.datasets[0].metadata[i].memo,
            isFirst: i === 0,
            isLast: i === d.labels.length - 1,
        });
    }
    document.querySelector("#clip_modal_table tbody")?.insertAdjacentHTML("beforeend", body);
}

/**
 * document 委譲リスナー（click×4・change・focusout・ESCキー）をプロセス生涯で1回だけ登録する。
 * `g_Chart !== panel.chart` のガードは #history_reset 後（g_Chart = null）や
 * 破棄済みパネルに対する古い行操作を無効化する。
 */
function wireDocumentDelegates() {
    if (delegatesWired) return;
    delegatesWired = true;

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
        if (!target || g_Chart !== panel.chart) return;
        const index = target.closest("tr").rowIndex - 1;
        panel.data.datasets[0].metadata[index]["memo"] = target.value;
        panel.chart.update();
        reloadHistoryTable();
    });
    document.addEventListener("focusout", (e) => {
        const target = e.target.closest("input.clip_memo");
        if (!target) return;
        const div = target.previousElementSibling;
        if (div) setMemoEditing(div, target, false);
    });
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".up_clip");
        if (!target || g_Chart !== panel.chart) return;
        const row = target.closest("tr");
        if (row?.previousElementSibling) {
            const index = row.rowIndex - 1;
            flipClip(index, index - 1);
            panel.chart.update();
            reloadHistoryTable();
        }
    });
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".down_clip");
        if (!target || g_Chart !== panel.chart) return;
        const row = target.closest("tr");
        if (row?.nextElementSibling) {
            const index = row.rowIndex - 1;
            flipClip(index, index + 1);
            panel.chart.update();
            reloadHistoryTable();
        }
    });
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".remove_clip");
        if (!target || g_Chart !== panel.chart) return;
        const row = target.closest("tr");
        const index = row.rowIndex - 1;
        panel.data.labels.pop();
        panel.data.datasets[0].data.splice(index, 1);
        panel.data.datasets[0].metadata.splice(index, 1);
        panel.data.datasets[1].data.splice(index, 1);
        panel.data.datasets[2].data.splice(index, 1);
        panel.data.datasets[3].data.splice(index, 1);
        panel.chart.update();
        reloadHistoryTable();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.getElementById("clip_modal")?.open) closeHistoryModal();
    });
}

/** 現在のパネルDOM・Chart.jsインスタンスを破棄する（rebuildHistoryPanel() 専用）。 */
function destroyHistoryPanel() {
    const canvas = document.getElementById("history_graph");
    if (!canvas) return;
    Chart.getChart(canvas)?.destroy();
    canvas.remove();
    document.getElementById("history_container")?.remove();
    document.getElementById("history_button")?.remove();
    document.getElementById("clip_modal")?.remove();
    document.getElementById("clip_modal_blocker")?.remove();
    panel.chart = null;
    panel.data = null;
    g_Chart = null;
}

/**
 * DPS clip 履歴パネルを構築する。新規構築（DOMContentLoaded）・セーブURL復元
 * （rebuildHistoryPanel経由）の双方の入口。
 *
 * アンカー `#OBJID_ATTACK_SETTING_BLOCK_MIG` が無い環境（単体テスト等）では何もしない。
 * 既に `#history_graph` が存在する場合も何もしない（OnDomReady とセーブURL復元の
 * 実行順序は互いに非同期でどちらが先に走るか一定しないため、この関数自身のガードで
 * 二重構築を防ぐ）。
 *
 * @param {*} [restoredChartData] 渡された場合、構築直後の chart.data をこれで上書きする
 *   （CSaveController.js#restoreChartDisplay が復元済みデータを渡す）。
 */
export function buildHistoryPanel(restoredChartData = null) {
    const anchor = document.getElementById("OBJID_ATTACK_SETTING_BLOCK_MIG");
    if (!anchor || document.getElementById("history_graph")) return;

    ensureHistoryPanelStyle();
    anchor.insertAdjacentHTML("afterend", buildHistoryPanelHtml());

    panel.target = 0;
    panel.data = {
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
        }],
    };
    const footer = (items) => items[0].dataset.metadata[items[0].parsed.x].memo;
    const ctx = document.getElementById("history_graph");
    const chart = new Chart(ctx, {
        type: "line",
        data: panel.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            plugins: {
                legend: {
                    position: "right",
                },
                tooltip: {
                    callbacks: {
                        footer: footer,
                    },
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
                },
            },
            onClick: (e) => {
                // v4: onClick の e は ChartEvent — e.x がキャンバス座標を直接保持
                const dataX = chart.scales.x.getValueForPixel(e.x);
                runWithLoadingIndicator(() => {
                    if (chart.data.datasets[0].data.length > dataX) {
                        const url = chart.data.datasets[0].metadata[Math.abs(dataX)]["url"];
                        registryGet('CSaveController').loadFromURL(url);
                        CItemInfoManager.OnClickExtractSwitch();
                    }
                });
            },
        },
    });
    panel.chart = chart;
    g_Chart = chart;

    document.getElementById("history_clip")?.addEventListener("click", () => {
        // 直前の敵と同じか？
        const currentTarget = document.querySelector(".OBJID_MONSTER_MAP_MONSTER")?.value;
        if (panel.target != currentTarget) {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.data.datasets[0].metadata = [];
            chart.data.datasets[1].data = [];
            chart.data.datasets[2].data = [];
            chart.data.datasets[3].data = [];
            panel.target = currentTarget;
        }
        runWithLoadingIndicator(() => {
            const mgr = registryGet('CSaveController').getSaveDataManagerCur();
            mgr.ReCalcManager();
            calc();
            LoadTomSelect();
            const metadata = { "memo": "", "url": registryGet('CSaveController').encodeToURL() };
            if (HtmlGetObjectCheckedById("clip_with_memo", false)) {
                const memo = prompt("clipメモ");
                if (memo) metadata["memo"] = memo;
            }
            chart.data.labels.push(chart.data.labels.length + 1);
            const dps = parseFloat((prevElementSibling(document.getElementById("BTLRSLT_PART_ATKCNT")?.parentElement, 4)?.textContent ?? "").replaceAll(",", ""));
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
        });
    });
    document.getElementById("history_reset")?.addEventListener("click", () => {
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.data.datasets[0].metadata = [];
        chart.data.datasets[1].data = [];
        chart.data.datasets[2].data = [];
        chart.data.datasets[3].data = [];
        panel.target = 0;
        chart.update();
        panel.chart = null;
        g_Chart = null;
    });
    document.getElementById("history_list")?.addEventListener("click", () => {
        document.getElementById("clip_modal_table")?.before(document.getElementById("history_graph"));
        reloadHistoryTable();
        openHistoryModal();
    });

    wireHistoryModalClose();
    wireDocumentDelegates();

    if (restoredChartData) {
        chart.data = restoredChartData;
        panel.data = restoredChartData;
        chart.update();
    }
}

/**
 * 復元されたチャートデータでパネルを作り直す。
 * CSaveController.js#restoreChartDisplay がセーブURL復元のたびに呼ぶ。
 */
export function rebuildHistoryPanel(chartDataObj) {
    destroyHistoryPanel();
    buildHistoryPanel(chartDataObj);
}

OnDomReady(() => buildHistoryPanel());
