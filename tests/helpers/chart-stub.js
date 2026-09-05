// Chart.js の最小スタブ。
// calchistory.js が `https://cdn.jsdelivr.net/npm/chart.js@4.5.1/auto/+esm` から
// ESM import しているが、Node/vitest の ESM ローダーは https: スキームの specifier を
// 解決できない（ブラウザ専用）。vitest.config.ts の alias でこの specifier を本スタブに差し替える。
//
// 単体テストでは calchistory.js の DOM 構築は実際には走らない（テスト側が calcx.html
// 相当の DOM を用意しないため各要素参照が null になり早期 return する）ため、
// import が解決でき new Chart() / Chart.getChart() が最低限のシグネチャを満たせば十分。
export default class Chart {
    static instances = {};
    static getChart() { return null; }
    constructor() {}
    destroy() {}
    update() {}
}
