# ユニットテスト

このディレクトリにはratorio計算機のユニットテストが含まれています。

## 概要

- **テストフレームワーク**: Vitest
- **テスト言語**: TypeScript
- **テスト対象**: ro4/roro配下のJavaScriptファイル
- **テスト方針**: 既存のJavaScriptコードは一切変更せず、TypeScriptラッパーを通じてテスト

## ディレクトリ構造

```
workspace/
├── __tests__/
│   ├── helpers/         # テストヘルパーファイル
│   │   ├── roroScriptLoader.ts  # roro/m/js配下のスクリプトローダー
│   │   └── ro4ScriptLoader.ts   # ro4/m/js配下のスクリプトローダー
│   ├── types/           # TypeScript型定義
│   │   ├── roro-common.d.ts     # roro/m/js/common.js用の型定義
│   │   └── ro4-global.d.ts      # ro4/m/js/global.js用の型定義
│   ├── roro/            # roroのテストファイル
│   │   └── common.test.ts       # common.jsのテスト
│   └── ro4/             # ro4のテストファイル
│       └── global.test.ts       # global.jsのテスト
├── vitest.config.ts     # Vitest設定ファイル
└── tsconfig.test.json   # テスト用TypeScript設定
```

## テストの実行方法

### 依存パッケージのインストール

```bash
cd workspace
npm install
```

### テストの実行

```bash
# すべてのテストを実行
npm test

# ウォッチモードでテストを実行（ファイル変更を監視）
npm run test

# テストを1回だけ実行
npm run test:run

# カバレッジレポート付きでテストを実行
npm run test:coverage

# UI付きでテストを実行
npm run test:ui
```

## テストファイルの作成ガイド

### roroのJavaScriptファイルをテストする場合

1. `__tests__/roro/` ディレクトリにテストファイルを作成
2. `setupRoroTestEnvironment()` を `beforeAll` で呼び出す
3. 型定義が必要な場合は `__tests__/types/roro-*.d.ts` に追加

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

describe('roro/m/js/yourfile.js', () => {
  beforeAll(() => {
    setupRoroTestEnvironment();
  });

  it('テストケース', () => {
    // テストコード
  });
});
```

### ro4のJavaScriptファイルをテストする場合

1. `__tests__/ro4/` ディレクトリにテストファイルを作成
2. `setupRo4TestEnvironment()` を `beforeAll` で呼び出す
3. 型定義が必要な場合は `__tests__/types/ro4-*.d.ts` に追加

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { setupRo4TestEnvironment } from '../helpers/ro4ScriptLoader';

describe('ro4/m/js/yourfile.js', () => {
  beforeAll(() => {
    setupRo4TestEnvironment();
  });

  it('テストケース', () => {
    // テストコード
  });
});
```

## 既存のテストケース

### roro/m/js/common.js

以下の関数をテストしています：

- `GetConstDataKindText()` - データ種別のテキスト取得
- `GetParamText()` - パラメータ名のテキスト取得
- `GetRaceText()` - 種族名のテキスト取得
- `GetElementText()` - 属性名のテキスト取得
- `GetMonsterElementText()` - モンスター属性のテキスト取得
- `GetSizeText()` - サイズ名のテキスト取得
- `GetStateText()` - 状態異常名のテキスト取得
- `GetFriendlityText()` - 親密度のテキスト取得
- 各種定数の定義確認

### ro4/m/js/global.js

以下の項目をテストしています：

- 定数の定義確認（`TIME_ITEM_CONF_COUNT`、`CUSTOM_CONF_*_LIMIT`等）
- グローバル変数の初期化確認
- `ResetConfDataAllMIG()` 関数のテスト
- `__DIG3()` 関数のテスト

## テスト方針

1. **既存コードの非破壊**: テスト対象のJavaScriptファイルは一切変更しない
2. **網羅的なテスト**: 可能な限りすべての関数とコードパスをテスト
3. **TypeScriptラッパーの活用**: workspace配下のTypeScriptを利用してJavaScriptをwrap
4. **依存関係の管理**: 各ファイルの依存関係を適切にロードしてテスト環境を構築

## 注意事項

- テスト対象のJavaScriptファイルは `ro4/` および `roro/` ディレクトリに配置されています
- これらのファイルは**変更禁止**です
- 新しいテストを追加する際は、必要に応じて型定義ファイルとスクリプトローダーを更新してください
- DOM操作を必要とする関数のテストには `happy-dom` を使用しています

## トラブルシューティング

### テストが失敗する場合

1. 依存パッケージが正しくインストールされているか確認
2. JavaScriptファイルの依存関係が正しく読み込まれているか確認
3. 型定義ファイルに不足がないか確認

### 型エラーが発生する場合

1. `__tests__/types/` ディレクトリの型定義ファイルを確認
2. 必要な型定義を追加
3. `tsconfig.test.json` の設定を確認

## 参考情報

- [Vitest公式ドキュメント](https://vitest.dev/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/)
