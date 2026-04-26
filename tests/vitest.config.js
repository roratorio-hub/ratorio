import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    server: {
        fs: {
            // tests/ から ../ (プロジェクトルート) のファイルを Vite が提供できるようにする。
            // テストファイルが ../../roro/m/js/*.js などを import するために必要。
            allow: ['..'],
        },
    },
    test: {
        browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
        include: ['**/*.test.js'],
        // workspace/ の Vitest 設定（workspace/__tests__/**/*.test.ts）と干渉しないよう除外
        exclude: ['node_modules/**', 'integration/**'],
    },
});
