#!/usr/bin/env python3
"""CSkillManager.js の採番マーカーと skill.dat.js の SKILL_ID 定数の整合検証.

CSkillManager.Init は skillId カウンター（0 起点・skillId++）で dataArray に
スキルを登録する。各登録ブロック直前の「// SKILL_ID_XXX」マーカー位置の
カウンター値と、skill.dat.js の「export const SKILL_ID_XXX = N;」の N が
一致することを検証する。

新スキル追加時・スキル調整時のコミット前チェックに使用:
    python3 util/skill/verify_skill_ids.py
終了コード 0 = 整合 / 1 = 不整合あり
"""
import os
import re
import sys

BASE = os.path.join(os.path.dirname(__file__), '..', '..')
CSM = os.path.join(BASE, 'roro', 'm', 'js', 'CSkillManager.js')
DAT = os.path.join(BASE, 'roro', 'm', 'js', 'skill.dat.js')

# 意図的にマーカーと const の対応から除外する名前（現状なし）
KNOWN_EXCEPTIONS = set()


def simulate_markers():
    """Init 内カウンターをシミュレートし {マーカー名: 採番値} を返す."""
    result = {}
    counter = None
    with open(CSM, encoding='utf-8') as f:
        for lineno, line in enumerate(f, 1):
            s = line.strip()
            if re.match(r'var skillId = 0;', s):
                counter = 0
                continue
            m = re.match(r'//\s*(SKILL_ID_\w+)\s*$', s)
            if m and counter is not None:
                name = m.group(1)
                if name in result and name not in KNOWN_EXCEPTIONS:
                    print(f'WARN: マーカー重複 {name} (L{lineno})')
                result[name] = counter
                continue
            if re.match(r'skillId\+\+;?$', s) and counter is not None:
                counter += 1
                continue
            if counter is not None and re.search(r'\bskillId\s*(=|\+=|-=)(?!=)', s) \
               and 'this.id = skillId' not in s:
                print(f'ERROR: 想定外の skillId 書き換え L{lineno}: {s}')
                sys.exit(1)
    return result


def load_consts():
    result = {}
    with open(DAT, encoding='utf-8') as f:
        for line in f:
            m = re.match(r'export\s+(?:const|let)\s+(SKILL_ID_\w+)\s*=\s*(-?\d+)\s*;',
                         line.strip())
            if m:
                result[m.group(1)] = int(m.group(2))
    return result


def main():
    markers = simulate_markers()
    consts = load_consts()

    ng = 0
    for name in sorted(set(markers) & set(consts) - KNOWN_EXCEPTIONS):
        if markers[name] != consts[name]:
            print(f'MISMATCH {name}: marker={markers[name]} const={consts[name]}')
            ng += 1

    # マーカーのみ（const 未定義）: 参照されるとバンドル前は window 頼みになるため NG
    for name in sorted(set(markers) - set(consts) - KNOWN_EXCEPTIONS):
        print(f'CONST未定義 {name}: marker={markers[name]} '
              f'→ skill.dat.js に export const を追加してください')
        ng += 1

    print(f'マーカー {len(markers)} 件 / const {len(consts)} 件 / 不整合 {ng} 件')
    if ng:
        sys.exit(1)
    print('OK: 採番と定数は整合しています')


if __name__ == '__main__':
    main()
