# ratorio テスト環境

## テストの実行

```bash
cd ratorio/tests

pnpm test:run -- <テストファイル名>   # ユニットテスト（1ファイル指定）例: roro/hmmob
pnpm test:run                          # ユニットテスト（全件）
pnpm test:integration                  # インテグレーションテスト（Playwright）
```

## 環境セットアップ

### 通常の環境（Windows / macOS / Linux ネイティブ）

```bash
cd ratorio/tests
pnpm install
```

### Docker Desktop / WSL2 環境での注意

`/workspace` が Windows ファイルシステム（9p マウント）上にある場合、
pnpm の virtual store もその上に置かれ、vitest のワーカープロセスが並列起動する際に
EIO (I/O error) が多発してテストが正常に実行できないことがある。

回避するには、virtual store を Linux ファイルシステム上に移す `.npmrc` を手動で作成する。
このファイルは `.gitignore` 対象のため、各環境で手動作成が必要。

```bash
# tests/.npmrc（環境に合わせてパスを変更する）
echo 'virtual-store-dir=/home/vscode/.pnpm-store-ratorio' > /workspace/ratorio/tests/.npmrc

# node_modules を作り直す
rm -rf /workspace/ratorio/tests/node_modules
cd /workspace/ratorio/tests && pnpm install
```

`/home/vscode` の部分は実際の Linux ホームディレクトリに合わせること。
設定後、`node_modules/vitest` が Linux fs 上のパスへのシンボリックリンクになっていれば成功。

```bash
ls -la /workspace/ratorio/tests/node_modules/vitest
# → /home/vscode/.pnpm-store-ratorio/... へのシンボリックリンクであることを確認
```
