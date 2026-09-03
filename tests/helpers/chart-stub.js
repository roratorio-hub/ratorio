// Chart.js の最小スタブ。
// 本体（calchistory.js / CSaveController.js）は commit 00f2502e で Chart.js を
// `https://cdn.jsdelivr.net/npm/chart.js@4.5.1/auto/+esm` から ESM import するように
// なったが、Node/vitest の ESM ローダーは https: スキームの specifier を解決できない
// （ブラウザ専用）。vitest.config.ts の alias でこの specifier を本スタブに差し替える。
//
// 単体テストでは calchistory.js/CSaveController.js の DOM 構築は実際には走らない
// （テスト側が calcx.html 相当の DOM を用意しないため各要素参照が null になり早期 return する）ため、
// import が解決でき Chart.instances / new Chart() が最低限のシグネチャを満たせば十分。
export default class Chart {
    static instances = {};
    constructor() {}
    destroy() {}
    update() {}
}
