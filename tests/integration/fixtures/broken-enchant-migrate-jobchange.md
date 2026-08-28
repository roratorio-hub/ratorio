# 職業変更「維持ON」× 壊れたエンチャント定義 セーブデータ 回帰フィクスチャ

対象 Issue: #1562（グリンカムビ／ハルピュイアのエンチャント定義ミス。データ自体は
84eddb8d で修正済み）。

このフィクスチャは、**84eddb8d 以前の壊れた `mig.enchlist.dat.js` 定義下で実際に
ユーザーが作成し、流通した**セーブデータ（ユーザー提供）。職業「アリテア」・
鎧「グリンカムビ」(itemID 5784)・盾「アイアンシールド」(itemID 2241) を装備し、
グリンカムビのスロット2エンチャントに「潜在解放(アリテアXXIII)」(cardID 4538) を
セットした状態で保存されている。

壊れた定義下で保存されたため、`cardCategoryID2` が 0 のまま `cardID2` に 4538 が
残る不整合ペアを含む（詳細はプロジェクトの調査ログ参照）。これをロード後、
「職業変更時に装備等を維持する」ON でスピリットハンドラーへ変更すると、修正前は
全装備がリセットされる。

対象テスト: `job-migrate-broken-enchant.test.ts`

<!-- URLの前半（オリジン+パス）はテスト側で baseUrl に差し替える。クエリ部分のみが本体データ。 -->
https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html?dxKLUv_SC0VQQAQkofGWB3DjDbbPVsl9u8PrUI_zGiyF0bLiAIdAXdNGVU8TCLRv2Ad_mmzzGe6bicoVQagj869pQ3eh9KzCfgQQpfp7nxbG2BniHd2hixtSniDOfWlsuskogXDlv7AsFQ2No9zzDY2tJwhry1IT7D3doD_B9nhXzra_2KB130eVwDAGAUYAmG4YoB
