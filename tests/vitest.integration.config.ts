import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['integration/**/*.test.ts', 'integration/**/*.test.js'],
        testTimeout: 60000,
        hookTimeout: 30000,
    },
});
