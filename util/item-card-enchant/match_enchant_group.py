#!/usr/bin/env python3
"""match_enchant_group.py

mig.enchlist.dat.js の既存 sourceArray エントリと、新たに追加したいエンチャント
テーブル（スロット/精錬値/候補リスト）を比較し、

  - 完全一致・部分一致する既存エントリがあれば「そこにアイテムIDを追加する」候補として提示する
  - 一致が無ければ「新規エントリが必要」と判定する

DRY原則の判断（統合すべきか・別エントリのままにすべきか）そのものは自動化しない。
このツールは候補を絞り込むところまでを担い、最終判断は人間が行う
（.claude/context 配下の運用ルール、および `enchant-link` スキルの Step 3 を参照）。

サブコマンド
------------
    match <yaml_file>
        対象アイテムのエンチャントテーブル（下記YAML形式）を読み、既存エントリとの
        一致候補を一覧表示する。

    patch <source_array_id> <item_name>
        指定した既存 sourceArray エントリに item_name のアイテムIDを追加した
        「置換後の行全文」を出力する（Editツールの old_string/new_string にそのまま使える）。
        あわせて reverseResolveArrayItemId 側に足すべき内容を注記として出す
        （実際の行組み立ては呼び出し側=スキルが行う。複数スロットの集約が必要なため）。

    verify
        sourceArray と reverseResolveArrayItemId の双方向整合を全件チェックする。

match用YAML形式（item-add.md の enchant ノードと同じ形）:

    item_name: グリンカムビ[1]
    slot_list:
      - slot: 4
        refine: 0
        enchant_list:
          - name: 潜在解放(アリテアXXIII)
      - slot: 3
        refine: 8
        enchant_list:
          - name: 火属性付与(鎧)
          - name: 水属性付与(鎧)
"""

import os
import re
import sys

import yaml

from craft_util import CARD_OR_ENCH_CODE, loadItemDict

script_dir = os.path.dirname(os.path.abspath(__file__))
MIG_ENCHLIST_PATH = f'{script_dir}/../../engine/data/mig.enchlist.dat.js'

ID_TO_CARD_NAME = {v: k for k, v in CARD_OR_ENCH_CODE.items()}


def _read_mig_enchlist():
    with open(MIG_ENCHLIST_PATH, 'r', encoding='utf-8') as f:
        return f.read()


def _find_matching_bracket(text, open_idx):
    """text[open_idx] == '[' 前提で、対応する閉じ ']' のインデックスを返す。"""
    assert text[open_idx] == '['
    depth = 0
    for i in range(open_idx, len(text)):
        if text[i] == '[':
            depth += 1
        elif text[i] == ']':
            depth -= 1
            if depth == 0:
                return i
    raise ValueError(f'対応する閉じ括弧が見つかりません（開始位置 {open_idx}）')


def _parse_int_list(s):
    return [int(x) for x in re.findall(r'\d+', s)]


def parse_source_entries(text):
    """sourceArray の全エントリを {id: {...}} で返す。

    現行フォーマット（174/178/187/186、通常職の装備・エンチャント系すべてがこれ）だけを
    対象にする。旧フォーマット（175 等の別コード）はパース対象外としてスキップし、
    skipped_ids に記録する（機械的に判別できない古い形式に静かに誤対応するより、
    検出して報告するほうが安全という設計方針）。
    """
    entries = {}
    skipped_ids = []

    for m in re.finditer(r'\[(\d+),-1,0,0,\[\[', text):
        entry_id = int(m.group(1))
        start = m.start()
        try:
            end = _find_matching_bracket(text, start)
        except ValueError:
            skipped_ids.append(entry_id)
            continue
        entry_text = text[start:end + 1]

        name_m = re.search(r'\[\["([^"]*)","([^"]*)"]]', entry_text)
        name = name_m.group(1) if name_m else None

        item_ids_m = re.search(r'\[174,\[50,\[([\d,]*)]]]', entry_text)
        if item_ids_m is None:
            # 174/50 構造を持たない古い形式（例: 175 コード使用）
            skipped_ids.append(entry_id)
            continue
        item_ids = _parse_int_list(item_ids_m.group(1))

        slots = []
        multi_refine_warning = False
        for slot_m in re.finditer(r'\[\[178,\[27,\[(\d+)]]],,', entry_text):
            slot_no = int(slot_m.group(1))
            # スロットグループ全体 = slot_m の開始位置（最初の '['）から対応する閉じまで
            group_start = slot_m.start()
            group_end = _find_matching_bracket(entry_text, group_start)
            group_text = entry_text[group_start:group_end + 1]

            refine_matches = list(re.finditer(r'\[187,\[59,(\d+)]', group_text))
            if len(refine_matches) > 1:
                multi_refine_warning = True
            if not refine_matches:
                # 精錬条件が見つからない変則構造。候補リストだけでも拾っておく
                refine = None
            else:
                refine = int(refine_matches[0].group(1))

            card_ids_m = re.search(r'\[186,\[51,\[([\d,]*)]]]', group_text)
            card_ids = _parse_int_list(card_ids_m.group(1)) if card_ids_m else []

            slots.append({'slot': slot_no, 'refine': refine, 'card_ids': card_ids})

        entries[entry_id] = {
            'name': name,
            'item_ids': item_ids,
            'slots': slots,
            'multi_refine_warning': multi_refine_warning,
            'raw': entry_text,
        }

    return entries, skipped_ids


def parse_reverse_resolve(text):
    """reverseResolveArrayItemId の内容を {item_id: [enchant_id, ...]} で返す。

    巨大配列リテラル形式（index位置=item_id）と個別代入形式
    （reverseResolveArrayItemId[N] = [...];）の両方に対応する。
    """
    result = {}

    literal_m = re.search(
        r'reverseResolveArrayItemId\s*=\s*\[(.*?)];\n', text, re.S)
    if literal_m:
        body = literal_m.group(1)
        # 要素は `,` か `[id,id,...]` のどちらか。空要素はスキップしつつ位置=item_idで数える。
        pos = 0
        item_id = 0
        i = 0
        n = len(body)
        while i < n:
            if body[i] == '[':
                j = _find_matching_bracket(body, i)
                result[item_id] = _parse_int_list(body[i + 1:j])
                i = j + 1
                # 直後のカンマをスキップ
                if i < n and body[i] == ',':
                    i += 1
                item_id += 1
            elif body[i] == ',':
                item_id += 1
                i += 1
            else:
                i += 1

    for m in re.finditer(r'reverseResolveArrayItemId\[(\d+)]\s*=\s*\[([\d,\s]*)];', text):
        item_id = int(m.group(1))
        result[item_id] = _parse_int_list(m.group(2))

    return result


def _normalize_key(slot_entry):
    """(slot, refine, frozenset(card_ids)) の正規化キーを作る。"""
    return (slot_entry['slot'], slot_entry['refine'], frozenset(slot_entry['card_ids']))


def cmd_match(yaml_path):
    with open(yaml_path, 'r', encoding='utf-8') as f:
        target = yaml.safe_load(f)

    item_dict = loadItemDict()
    item_name = target.get('item_name', '(未指定)')

    target_slots = []
    for slot_info in target.get('slot_list', []):
        card_ids = []
        unresolved = []
        for enchant in slot_info.get('enchant_list', []):
            cid = CARD_OR_ENCH_CODE.get(enchant['name'])
            if cid is None:
                unresolved.append(enchant['name'])
            else:
                card_ids.append(cid)
        if unresolved:
            print(f"エラー: 以下のエンチャント名が card.dat.js に見つかりません: {unresolved}")
            sys.exit(1)
        target_slots.append({
            'slot': slot_info['slot'],
            'refine': slot_info.get('refine', 0),
            'card_ids': card_ids,
        })

    entries, skipped_ids = parse_source_entries(_read_mig_enchlist())
    if skipped_ids:
        print(f"注記: 旧形式のため解析対象外にした sourceArray が {len(skipped_ids)} 件あります"
              f"（{skipped_ids[:10]}{'...' if len(skipped_ids) > 10 else ''}）。"
              f"これらは候補から漏れている可能性があります。\n")

    print(f"=== 対象アイテム: {item_name} ===\n")

    for target_slot in target_slots:
        target_key = _normalize_key(target_slot)
        print(f"--- 第?スロット（slot={target_slot['slot']}, refine={target_slot['refine']}, "
              f"候補{len(target_slot['card_ids'])}件） ---")

        exact = []
        subset = []  # 既存エントリの候補集合 が target の候補集合を包含 or 逆
        for eid, entry in entries.items():
            for slot in entry['slots']:
                key = _normalize_key(slot)
                if key == target_key:
                    exact.append((eid, entry))
                    break
                if slot['slot'] == target_slot['slot'] and slot['refine'] == target_slot['refine']:
                    a, b = set(slot['card_ids']), set(target_slot['card_ids'])
                    if a and b and (a <= b or b <= a) and a != b:
                        subset.append((eid, entry, a, b))
                        break

        if exact:
            print("  [完全一致] 既存エントリへの追加を検討してください:")
            for eid, entry in exact:
                item_names = [item_dict_rev(item_dict, i) for i in entry['item_ids']]
                print(f"    sourceArray[{eid}] 表示名=\"{entry['name']}\" "
                      f"現在の対象アイテム={item_names}")
        elif subset:
            print("  [部分一致] 候補リストが部分集合の関係にあるエントリ（要目視確認）:")
            for eid, entry, a, b in subset:
                item_names = [item_dict_rev(item_dict, i) for i in entry['item_ids']]
                rel = "既存⊂対象" if a <= b else "対象⊂既存"
                print(f"    sourceArray[{eid}] 表示名=\"{entry['name']}\" ({rel}) "
                      f"現在の対象アイテム={item_names}")
        else:
            print("  一致する既存エントリなし → 新規エントリが必要です")
        print()


def item_dict_rev(item_dict, item_id):
    for name, iid in item_dict.items():
        if iid == item_id:
            return name
    return f'(未知のアイテムID:{item_id})'


def cmd_patch(source_array_id, item_name):
    source_array_id = int(source_array_id)
    text = _read_mig_enchlist()
    entries, _ = parse_source_entries(text)

    if source_array_id not in entries:
        print(f"エラー: sourceArray[{source_array_id}] が見つかりません（旧形式で解析対象外の"
              f"可能性があります。手動で確認してください）")
        sys.exit(1)

    item_dict = loadItemDict()
    item_id = item_dict.get(item_name)
    if item_id is None:
        print(f"エラー: アイテム名「{item_name}」が item.dat.js に見つかりません")
        sys.exit(1)

    entry = entries[source_array_id]
    if item_id in entry['item_ids']:
        print(f"注記: {item_name}（ID {item_id}）は既に sourceArray[{source_array_id}] の"
              f"対象アイテムに含まれています。何もする必要はありません。")
        return

    old_line = entry['raw']
    # [174,[50,[id,id,...]]] の閉じ直前に item_id を追加する
    def _inject(m):
        body = m.group(1)
        sep = ',' if body and not body.endswith(',') else ''
        return f'[174,[50,[{body}{sep}{item_id},]]]'

    new_line, n = re.subn(r'\[174,\[50,\[([\d,]*)]]]', _inject, old_line, count=1)
    if n != 1:
        print("エラー: [174,[50,[...]]] 構造の置換に失敗しました。手動で確認してください。")
        sys.exit(1)

    print("=== old_string（Editツールにそのまま渡す） ===")
    print(old_line)
    print("\n=== new_string（Editツールにそのまま渡す） ===")
    print(new_line)
    print(f"\n=== 追加で必要な作業 ===")
    print(f"reverseResolveArrayItemId[{item_id}] にも {source_array_id} を含めること"
          f"（そのアイテムが他の枠にも属する場合は既存の値に追記してマージする。"
          f"この集約は複数スロットをまたぐため本ツールでは行わない）")


def cmd_verify():
    """双方向の整合性を確認する。

    実際にゲームが参照するのは reverseResolveArrayItemId のみ（hmcard.js:652
    `GetEnchListIdArrayByItemId()`）。sourceArray 側の対象アイテムリストは
    セーブデータ互換性のために古いIDを残したまま「廃止」扱いにできる仕様
    （mig.enchlist.dat.js 末尾のTips参照）なので、
    「sourceArray にはあるが reverseResolveArrayItemId に無い」は
    廃止・再編に伴う想定内の片方向残留であることが多く、それ自体は不具合ではない。
    一方「reverseResolveArrayItemId が指す先が壊れている」方向は
    実際にプレイヤーへの表示が壊れるため、これだけを「エラー」として扱う。
    """
    text = _read_mig_enchlist()
    entries, skipped_ids = parse_source_entries(text)
    reverse = parse_reverse_resolve(text)

    print(f"sourceArray 解析済み: {len(entries)} 件 / 解析対象外(旧形式等): {len(skipped_ids)} 件")
    print(f"reverseResolveArrayItemId 解析済み: {len(reverse)} 件\n")

    # reverse → sourceArray の向き（実害あり。hmcard.js が直接参照する方向）
    errors = []
    for item_id, enchant_ids in reverse.items():
        for eid in enchant_ids:
            if eid not in entries:
                if eid in skipped_ids:
                    continue  # 旧形式で未解析なだけの可能性があるので誤検知を避ける
                errors.append(
                    f"reverseResolveArrayItemId[{item_id}] が sourceArray[{eid}] を"
                    f"参照しているが、そのIDのエントリが存在しない")
                continue
            if item_id not in entries[eid]['item_ids']:
                errors.append(
                    f"reverseResolveArrayItemId[{item_id}] が sourceArray[{eid}] を"
                    f"参照しているが、sourceArray[{eid}] 側の対象アイテムに {item_id} が無い"
                    f"（プレイヤーに壊れたエンチャント枠が表示される可能性）")

    # sourceArray → reverse の向き（片方向残留。廃止・再編の想定内残骸の可能性が高いので参考情報扱い）
    orphans = []
    for eid, entry in entries.items():
        for item_id in entry['item_ids']:
            if item_id not in reverse or eid not in reverse[item_id]:
                orphans.append((eid, entry['name'], item_id))

    multi_refine = [eid for eid, e in entries.items() if e['multi_refine_warning']]
    if multi_refine:
        print(f"注記: 1スロットに複数の精錬条件を持つ変則構造を {len(multi_refine)} 件検出しました"
              f"（先頭の精錬条件のみ抽出しています。要目視確認）: {multi_refine[:10]}"
              f"{'...' if len(multi_refine) > 10 else ''}\n")

    if not errors:
        print("整合性チェック（実害あり方向）: 問題なし")
    else:
        print(f"整合性チェック（実害あり方向）: {len(errors)} 件検出:")
        for e in errors:
            print(f"  - {e}")

    if orphans:
        orphan_names = sorted(set(n for _, n, _ in orphans))
        print(f"\n参考情報: sourceArray 側にのみ残っている片方向残留が {len(orphans)} 件"
              f"（表示名の内訳: {orphan_names[:10]}{'...' if len(orphan_names) > 10 else ''}）。"
              f"廃止・再編済みエントリがセーブデータ互換性のために旧アイテムIDを残している"
              f"だけの可能性が高く、実害は無い（hmcard.js は reverseResolveArrayItemId 側しか"
              f"見ないため）。新規追加した941〜944番がこの一覧に出ていないかだけ確認すること。")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    cmd = sys.argv[1]
    if cmd == 'match':
        if len(sys.argv) != 3:
            print("使い方: match_enchant_group.py match <yaml_file>")
            sys.exit(1)
        cmd_match(sys.argv[2])
    elif cmd == 'patch':
        if len(sys.argv) != 4:
            print("使い方: match_enchant_group.py patch <source_array_id> <item_name>")
            sys.exit(1)
        cmd_patch(sys.argv[2], sys.argv[3])
    elif cmd == 'verify':
        cmd_verify()
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == '__main__':
    main()
