/**
 * CDN(https://) からの import を、ローカルのスタブへ差し替える ESM ローダーフック.
 *
 * calchistory.js / CSaveController.js は Chart.js を CDN の URL から直接 import する。
 * node の既定 ESM ローダーは https スキームを解決できないため、
 * tests/helpers/chart-stub.js（vitest 側で使っているものと同じ）へ向ける。
 */
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUB = pathToFileURL(join(__dirname, '..', '..', 'tests', 'helpers', 'chart-stub.js')).href;

export function resolve(specifier, context, next) {
    if (specifier.startsWith('https://') || specifier.startsWith('http://')) {
        return { url: STUB, shortCircuit: true };
    }
    return next(specifier, context);
}
