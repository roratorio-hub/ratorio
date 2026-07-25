// Chart.js の最小スタブ。
// 本体（calchistory.js / CSaveController.js）は commit 00f2502e で Chart.js を
// `https://cdn.jsdelivr.net/npm/chart.js@4.5.1/auto/+esm` から ESM import するように
// なったが、Node/vitest の ESM ローダーは https: スキームの specifier を解決できない
// （ブラウザ専用）。vitest.config.ts の alias でこの specifier を本スタブに差し替える。
//
// 単体テストでは $(function(){...}) が no-op モックされ実際のチャート生成は走らないため、
// import が解決でき Chart.instances / new Chart() が最低限のシグネチャを満たせば十分。
export default class Chart {
    static instances = {};
    constructor() {}
    destroy() {}
    update() {}
}
