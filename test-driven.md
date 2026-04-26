### Test suite structure

`tests/` には 2 種類のテストがある:

| 種別 | 場所 | 実行環境 | 目的 |
|---|---|---|---|
| **ユニットテスト** | `tests/roro/`, `tests/ro4/` | Vitest browser mode (Chromium) | 個別ファイルの export・window compat・動作を検証 |
| **インテグレーションテスト** | `tests/integration/` | Vitest node + Playwright | `calcx.html` を実際に起動し未捕捉 JS 例外がゼロであることを確認 |

`npm test` は両方を順番に実行する。個別実行は `npm run test:unit` / `npm run test:integration`。

### Mandatory sequence — never skip steps

1 ファイルずつ移行し、毎回インテグレーションテストまで通す。
これにより失敗原因が「今触ったファイル」に常に絞られ、デバッグコストが最小になる。

1. **移行対象ファイルを 1 つ選ぶ**
2. **ユニットテストを先に書く** (`tests/roro/Foo.test.js` 等)
3. **`cd tests && npm run test:unit` を実行して失敗を確認する** (`export` がないのでインポートエラーになる)
4. **ソースファイルを ESM 化する** — `export` 追加・`window.XXX = XXX` compat ブロック追加
5. **`calcx.html` 内の該当 `<script>` タグを `type="module"` に変更する**
   - ステップ 4 と 5 は必ずセットで行う。`export` 文を持つファイルを通常 `<script>` で読み込むとブラウザが SyntaxError を出す。
6. **`cd tests && npm test` を実行してユニットテスト・インテグレーションテスト両方がパスすることを確認する**
   - インテグレーションテストが失敗した場合、原因は今変更したファイルにある。`window.XXX = XXX` の compat ブロック欠落か `<script type="module">` タグの順序ミスを確認する。
7. **`MIGRATION_LOG.md` を更新する**
8. **次のファイルを選び、ステップ 2 から繰り返す**

### Test file placement

| Source file | Unit test file |
|---|---|
| `roro/m/js/Foo.js` | `tests/roro/Foo.test.js` |
| `ro4/m/js/Foo.js` | `tests/ro4/Foo.test.js` |
| `roro/common/js/Foo.js` | `tests/roro/common/Foo.test.js` |

インテグレーションテストは `tests/integration/calcx.test.js` のみ。ファイルを追加する必要はない。

### Minimum coverage per unit test file

Every unit test file must include:

```javascript
// 1. Export exists with correct type
import { MyClass } from '../../roro/m/js/MyClass.js';
it('exports MyClass as a function', () => {
    expect(typeof MyClass).toBe('function');
});

// 2. window compat block is applied
it('window.MyClass is set via compat block', () => {
    expect(window.MyClass).toBe(MyClass);
});

// 3. Core behavior (at least one test per public method)
```

### Import order for CGlobalConstManager-dependent files

Files that call `CGlobalConstManager.DefineEnum()` at module load time without importing it
(e.g. `CAttackMethodConf.js`, `CNameKana.js`, all `.h.js` side-effect modules)
require `CGlobalConstManager.js` to be loaded first.
Place this import as the **first line** of the test file:

```javascript
// CGlobalConstManager.js を先にインポートして window.CGlobalConstManager を確立する
import '../../roro/m/js/CGlobalConstManager.js';
import { MyClass } from '../../roro/m/js/MyClass.js';
```

ESM guarantees sibling imports execute in declaration order — this is safe and intentional.

### Running tests

```bash
cd tests
npm test                  # ユニット + インテグレーション (両方)
npm run test:unit         # ユニットテストのみ
npm run test:integration  # インテグレーションテストのみ (calcx.html 起動確認)
npm run test:unit:watch   # watch mode during active development
```

First-time setup (per machine):
```bash
cd tests && npm install
npx playwright install chromium
```

### インテグレーションテストの仕組み

`tests/integration/calcx.test.js` は以下を検出する:

- **`pageerror`**: `ReferenceError` / `TypeError` 等の同期的な未捕捉例外
- **`unhandledrejection`**: Promise チェーン内で発生した未処理 rejection (`"Uncaught (in promise) ReferenceError: Foo is not defined"` 等)

`pageerror` だけでは Promise 内エラーを取りこぼすケースがあるため、`addInitScript` でページ内に `unhandledrejection` リスナーを直接埋め込んで収集している。

ESM 移行と無関係な既知エラーを抑制したい場合は `SUPPRESSED_ERROR_PATTERNS` に追加する。

### Known pitfalls when writing tests

- **`CGlobalConstManager` static state**: `managementMap` and `nameMap` persist across tests within a file. Add a `beforeEach` reset when testing `CGlobalConstManager.js` itself:
  ```javascript
  beforeEach(() => {
      CGlobalConstManager.managementMap = [];
      CGlobalConstManager.nameMap = new Map();
  });
  ```
- **`DefineEnum` called twice on the same name**: Does NOT throw — it extends the existing enum. The second call must omit `firstValue` to get auto-incremented values.
- **`GetKanaCodeSub` input range**: Only handles katakana (0x30A1+) correctly. ASCII characters fall into an unchecked range and produce garbage. Always test with real katakana inputs; use `'ヵ'` (0x30F5) to verify the `"XX"` fallback.