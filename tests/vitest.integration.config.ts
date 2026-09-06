import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['integration/**/*.test.ts', 'integration/**/*.test.js'],
        exclude: [
            // ステージング環境へのデプロイ運用がないため除外
            'integration/**/staging-vs-prod.test.ts',
        ],
        testTimeout: 60000,
        hookTimeout: 30000,
        // 各テストファイルが beforeAll で個別に chromium.launch() する（18ファイル）ため、
        // 既定値（numCpus - 1 = 11並列）だとフルスイート実行時に Chromium プロセスが
        // CPU を奪い合い、engine 側の非同期モジュール登録（register()）が
        // 遅延して「reg.XXX is not a function」系のflakeを起こす
        // （memory: project-calc-headless-test-flake。calc-headless/calcx/saveimage-output/
        // clip-history で継続的に観測。個々のテストへの waitForFunction 追加は対症療法で、
        // 発生ファイルが実行のたびに変わり続けていた＝根本原因は並列度そのもの）。
        // CPU核数に関わらず低めに固定し、Chromium 同時起動数を抑える。
        maxWorkers: 4,
    },
});
