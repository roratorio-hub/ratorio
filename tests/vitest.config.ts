import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        globals: true,
        include: ['roro/**/*.test.ts', 'ro4/**/*.test.ts'],
        exclude: ['node_modules', 'integration'],
        coverage: {
            provider: 'v8',
            exclude: ['node_modules', '**/*.config.ts'],
        },
        poolOptions: {
            forks: {
                maxForks: 4,
            },
        },
    },
    resolve: {
        alias: {
            '@roro': path.resolve(__dirname, '../roro/m/js'),
            '@ro4': path.resolve(__dirname, '../ro4/m/js'),
            '@helpers': path.resolve(__dirname, './helpers'),
            '@types-roro': path.resolve(__dirname, './types'),
        },
    },
});
