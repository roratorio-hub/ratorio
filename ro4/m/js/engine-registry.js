// Workspace I/F レジストリ（依存ゼロ）
// JS エンジン側: register('X', value) で登録
// TypeScript 側 / calcx-ai.js 側: get('X') で取得
//
// webpack がこのファイルを bundle.js に内包する場合も、standalone ESM として
// ロードされる場合も、globalThis._ratorioReg を共有ストアとして使用することで
// 同一のレジストリインスタンスを参照できる。
if (!globalThis._ratorioReg) globalThis._ratorioReg = Object.create(null);
const _reg = globalThis._ratorioReg;
export function register(name, value) { _reg[name] = value; }
export function get(name) { return _reg[name]; }
