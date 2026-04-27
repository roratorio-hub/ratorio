# ESM移行後のグローバル変数スコープ総ざらい結果

## 実施日: 2026-04-27

## 背景

ESM (`type="module"`) に移行したファイルは常に strict mode で動作する。
classic (non-module) スクリプトでは暗黙に `window.X` になっていた変数が、ESM では異なる扱いになる。

---

## ESMとclassicのスコープ対比

| 構文 | classic script | ESM module |
|------|---------------|------------|
| `var x = 5` (トップレベル) | `window.x = 5` | モジュールスコープ限定、`window.x` にならない |
| `let x = 5` (トップレベル) | グローバル宣言的環境に追加（`window.x` にはならない） | モジュールスコープ限定 |
| `x = 5` (関数内、未宣言) | `window.x = 5` として暗黙グローバル作成 | **`ReferenceError`** |
| `window.x = 5` (どこでも) | `window.x = 5` | `window.x = 5` （同じ） |

## ESM module からの名前解決ルール

ESM module 内で `x` という bare name が現れると、以下の順に探索する：

1. モジュール自身のスコープ（module scope）
2. インポートされたバインディング
3. **グローバル宣言的環境** — classic script の `let`/`const` が積まれる場所
4. **グローバルオブジェクト環境** — `var`/`function` (classic) や `window.x = ...` で設定されたプロパティ

→ 3 または 4 で見つかれば READ も WRITE もできる。どこにもなければ `ReferenceError`。

### 実例

```javascript
// head.js (classic script)
let w_DMG = [0, 0, 0];  // → グローバル宣言的環境に入る

// calcautospell.js (ESM module)
function AS_PLUS() {
    w_DMG_AS_OverHP = w_DMG[1];  // OK: head.js の let w_DMG が見つかる
}
```

```javascript
// foot.js (classic script, sloppy mode)
n_A_Equip = new Array();  // → window.n_A_Equip が作られる

// itemset.h.js (ESM module)
function CheckAndApplyItemSetEquipping() {
    n_A_Equip = modifiedArray;  // OK: window.n_A_Equip が見つかる
}
```

---

## 本当に ReferenceError になるパターン（要注意）

### パターン1: 関数内で完全に未宣言の変数

どのスコープにも存在しない変数への代入。

```javascript
// BAD — url はどこにも宣言されていない
CItemInfoManager.RebuildOfficialTradeInformationAnchor = function() {
    url = "https://...";  // ReferenceError
};

// GOOD
CItemInfoManager.RebuildOfficialTradeInformationAnchor = function() {
    var url = "";
    url = "https://...";  // OK
};
```

過去に発生した実例:
| ファイル | 変数 | 修正日 |
|---------|------|--------|
| `hmrndopt.js` | `spDefValue` | 2026-04-26 |
| `browsermigration.js` | `objRoot` | 2026-04-26 |
| `hmjob.js` | `stPoint` | 2026-04-26 |
| `calcautospell.js` | `skillLvWug` 等11変数 | 2026-04-26 |
| `hmcard.js` | `idxF`（2箇所） | 2026-04-26 |
| `CMonsterMapAreaComponentManager.js` | `objInput`, `objLabel` | 2026-04-27 |
| `CBattleCalcResultAll.js` | `i` | 2026-04-27 |
| `CAttackMethodAreaComponentManager.js` | `bufLv` | 2026-04-27 |
| `CItemInfoManager.js` | `sourceText` | 2026-04-27 |
| `hmcard.js` | `objSelect1` | 2026-04-27 |
| `CItemInfoManager.js` | `url` | 2026-04-27 |

### パターン2: ESM モジュール内で `var X` と宣言しつつ、他モジュールから X として参照

ESM の `var X` はモジュールスコープ限定。他ファイルからは `window.X` 経由でのみアクセス可。

```javascript
// calchistory.js (ESM) — BAD
var g_Chart;  // モジュールスコープ、window.g_Chart にならない

// CSaveController.js (ESM) — BAD
if (g_Chart !== undefined) { ... }  // ReferenceError: g_Chart is not defined
```

修正: `calchistory.js` で `var g_Chart` → `window.g_Chart = null;`、
`CSaveController.js` で全参照を `window.g_Chart` に変更（2026-04-27 修正）。

---

## 2026-04-27 実施 総ざらいスキャン

移行済み72ファイルを以下の2パターンでスキャンした。

**スクリプト概要:**
```javascript
// Node.js で全ファイルを走査
// Pattern B: ^\t+[identifier]\s*=[^=] の行で、
//   ファイル全体の var/let/const/function-param に含まれない識別子を報告
```

**スキャン結果サマリー:**

| ファイル | 報告された変数 | 実際の状態 | 判定 |
|---------|-------------|----------|------|
| `CItemInfoManager.js:711` | `url` | 未宣言 | **実バグ → 修正済み** |
| `spmode.js:71等` | `g_SPMODE_FLAG` 等 | `window.g_SPMODE_FLAG = 0` がトップレベルにある | 偽陽性 (window property) |
| `CBattleQuickControlAreaComponentManager.js:315` | `g_timeItemConfAllEffective` | `global.js (classic)` で `let g_timeItemConfAllEffective = 1` | 偽陽性 (global declarative env) |
| `itemset.h.js:221-222` | `n_A_Equip`, `n_A_card` | `foot.js (classic sloppy)` で bare assignment → `window.*` | 偽陽性 (window property) |
| `CSaveDataManager.js:804等` | `n_A_Arrow` | `foot.js (classic sloppy)` で bare assignment → `window.*` | 偽陽性 (window property) |
| `CSaveController.js:115,119` | `saveName` | 関数パラメータの再代入 | 偽陽性 (パラメータ) |
| `hmjob.js:258-276等` | `g_STR` 等12変数 | `window.g_STR = 0` がファイルトップにある | 偽陽性 (window property) |
| `hmjob.js:1718` | `n_Nitou` | `equip.js (classic sloppy)` で bare assignment → `window.*` | 偽陽性 (window property) |
| `hmjob.js:1727` | `n_A_LearnedSkill` | `learnedskill.js (ESM)` で `window.n_A_LearnedSkill` | 偽陽性 (window property) |
| `calcautospell.js:74` | `n_AS_SKILL` | 同ファイルで `window.n_AS_SKILL = ...` | 偽陽性 (window property) |
| `calcautospell.js:19,22` | `inc` | `for (var idx = 0, inc = 1; ...)` で宣言済み | 偽陽性 (スキャナー制限) |
| `calcautospell.js:1119` | `w_DMG_AS_OverHP` | `head.js (classic)` で `let w_DMG_AS_OverHP = 0` | 偽陽性 (global declarative env) |
| `CShadowEquipController.js:153` | `eqprgnName` | private class method のパラメータ | 偽陽性 (スキャナー制限) |
| `CSaveDataManager.js:680,700` | `dataText` | class method パラメータの再代入 | 偽陽性 (スキャナー制限) |

**スキャン精度の限界:**
- `for (var a, b = 0; ...)` の複数宣言で2番目以降が取りこぼされる
- `class` メソッドの引数（`function` キーワードなし）が拾われない
- `this.xxx = ...` の検出はできるが `xxx = ...` の false positive 判別には文脈が必要

---

## 次回スキャン手順（再現用）

```bash
# プロジェクトルートから実行
node - << 'EOF'
const fs = require('fs');
const migrated = [ /* 移行済みファイルリスト */ ];
const bareRe = /^(\t+)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=[^=]/;
const skipRe = /^\s*(var |let |const |this\.|window\.|return |if[\s(]|else[\s{]|for[\s(]|while[\s(]|do[\s{]|switch|case |break|continue|throw |try[\s{]|catch[\s(]|\/\/|\/\*|\*|export |import |class |function |\})/;
for (const f of migrated) {
    const src = fs.readFileSync(f, 'utf8');
    const decls = new Set([...src.matchAll(/\b(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)].map(m=>m[1]));
    // function params
    for (const m of src.matchAll(/function\s*\w*\s*\(([^)]*)\)/g))
        m[1].split(',').map(p=>p.trim().replace(/\s*=.*/,'').replace(/^\.\.\./,'')).filter(Boolean).forEach(p=>decls.add(p));
    src.split('\n').forEach((line, i) => {
        if (skipRe.test(line)) return;
        const m = bareRe.exec(line);
        if (!m) return;
        const name = m[2];
        if (line.indexOf(name) > 0 && line[line.indexOf(name)-1] === '.') return;
        if (!decls.has(name)) console.log(`${f}:${i+1}: ${line.trim()} [未宣言候補: ${name}]`);
    });
}
EOF
```

**結果の読み方:**
1. 報告された変数名を `grep -rn "window\.<name>\|var <name>\|let <name>"` で検索
2. `window.<name>` または `let/var <name>` が他のファイル・classic script に存在する → **偽陽性**
3. どこにも宣言がない → **実バグ、要修正**

---

## 移行後の確認チェックリスト

新しいファイルを ESM 化したら必ず確認：

- [ ] 関数内の bare assignment を `grep -n` で抽出し、var/let/const 宣言漏れがないか確認
- [ ] トップレベルの `var X` は `window.X = ...` に変更するか、compat block に追加したか
- [ ] 他ファイルが参照する変数は `window.X = ...` 形式で公開されているか
- [ ] `for (var i = 0; ...)` の `i` が宣言されているか（bare `for (i = 0; ...)` は NG）
- [ ] `ユニットテスト + インテグレーションテスト` を両方通過させてからコミット
