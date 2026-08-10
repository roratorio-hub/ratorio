#!/usr/bin/env bash
# 巨大ファイル分割（foot.js/head.js）で「移動した本文がバイト単位で不変」であることを確認する。
#
# 使い方:
#   tests/verify-move.sh <元ファイル(git相対パス)> <開始行> <終了行> <新ファイル> [新ファイル開始行]
#
# 例: foot.js の 28486-30196 行を foot-equipped-sp.js へ移動した場合
#   tests/verify-move.sh roro/m/js/foot.js 28486 30196 roro/m/js/foot-equipped-sp.js 1
#
# 元ファイルは「作業開始時点の git HEAD」から取る（今まさに行を削除した後の作業ツリーではなく）。
# 差分が空なら「本文は一切変えていない」ことが保証される。
set -euo pipefail

if [ "$#" -lt 4 ]; then
    echo "使い方: verify-move.sh <元ファイル> <開始行> <終了行> <新ファイル> [新ファイル開始行]" >&2
    exit 2
fi

ORIG_FILE="$1"
START="$2"
END="$3"
NEW_FILE="$4"
NEW_START="${5:-1}"
NEW_END=$((NEW_START + END - START))

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

DIFF_OUT="$(diff \
    <(git show "HEAD:${ORIG_FILE}" | sed -n "${START},${END}p") \
    <(sed -n "${NEW_START},${NEW_END}p" "${NEW_FILE}") || true)"

if [ -n "$DIFF_OUT" ]; then
    echo "❌ 本文が変わっています: ${ORIG_FILE}:${START}-${END} → ${NEW_FILE}:${NEW_START}-${NEW_END}" >&2
    echo "$DIFF_OUT" >&2
    exit 1
fi

echo "✅ バイト単位で一致: ${ORIG_FILE}:${START}-${END} → ${NEW_FILE}:${NEW_START}-${NEW_END}（$((END - START + 1))行）"
