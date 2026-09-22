# 楽器/鞭 装備フィクスチャ（battle-damage-sweep 専用。残件台帳 B-38）
#
# generate-job-corpus.mjs --pass D で機械生成。手動編集しない（再生成で上書きされる）。
# 対象テスト: integration/battle-damage-sweep.test.ts
#
# Pass A〜C（generated-job-corpus.md）はいずれも武器種別を「最後の選択肢」で固定する
# ため、楽器・鞭を要求する WeaponCondition のスキル（アローバルカン等）が
# battle-damage-sweep でカバーされていなかった。ここではその2職業だけを対象に、
# 武器種別を明示指定して装備する。
#
# 使い方は他のフィクスチャファイルと同じ（1行1URL、空行・#行はスキップ）。

# トルバドゥール（楽器装備）
https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html?dxKLUv_SDDxQQAUkogGXB5A4AhpUUwIEv6B6l-9b8RkknWUPn_fyPdNGUU8TCrPv-Ax5KXZ4-RlY9PACXyDWTj41PZtg7UBj6lwM0sXLxgZ63ZQNG-LxPaDmffhwZ2KPT9p-ww6PvRZIfe9x1nh933OUapeXND7vvxOaL5X_EhNSmLbsHbs_aPeM1V7eMCCQhQH2sKgAAIMlBYHMgQmyPmHQM
# トルヴェール（鞭装備）
https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html?dxKLUv_SDDjQQAAokdGVB3DjwoP7uoDdWob-6qQUBEkhDEMDIzJwyhZXEXEbfMkR6ByJSZc52Tl08pkDQ5JNn4_KX9OMN9gmqpwN0wXFx4rONww3X7O1VuV2mnQfgNKFujylV2f-c56VGbW3J_nxJC2R9jhHYVRxUFe-fukYiQ5jwRDBAokBsbsA-LUEBmRacxmzWBsIZizoH_MQ
