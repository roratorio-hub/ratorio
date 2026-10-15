"""セット効果（set_list）の展開と、パートナー側の逆引きマップ行の生成。

item_craft.py / card_craft.py の共通処理。dat.js を読み込まない純粋な関数だけを置く
（単体テストを軽くするため craft_util.py には置かない）。
"""

import json
import re


def groupSetList(set_list):
    """set_list を「効果レコード1つ ＋ その効果を発動させる条件(w_SE)の複数」の組に変換する。

    効果（desc / capabilities / time_effects）が同一のエントリは1つの効果レコードを共有する。
    画面のセット説明は効果レコードごとに「A または B …を同時に装備した時」と1ブロックにまとめて
    表示されるため、「AまたはBと共に装備時」を別々の効果レコードにすると表示が分裂する。

    条件の書き方（どちらも同じ結果になる）:
      - 同じ効果のエントリを set_list に複数並べる（従来の書き方）
      - 1つのエントリに entity_list_any（いずれか1つで成立する候補のリスト）を書く。
        entity_list（全て必要）と併記した場合は「entity_list ＋ 候補のどれか1つ」で成立する

    戻り値: [(代表のset_info, [条件(entityのリスト), ...]), ...]（初出順）
    """
    groups = {}
    for set_info in set_list:
        key = json.dumps(
            {k: set_info.get(k) for k in ('desc', 'capabilities', 'time_effects')},
            ensure_ascii=False, sort_keys=True)
        if key not in groups:
            groups[key] = (set_info, [])
        base = list(set_info.get('entity_list') or [])
        any_list = set_info.get('entity_list_any') or []
        conditions = groups[key][1]
        if any_list:
            conditions.extend(base + [entity] for entity in any_list)
        else:
            conditions.append(base)
    return list(groups.values())


def loadExistingSetMapKeys(js_code):
    """itemset.dat.js に代入形式（= [...]）で定義済みの ItemIdToSetIdMap / CardIdToSetIdMap のキーを返す"""
    item_keys = {int(m) for m in re.findall(r'^\s*ItemIdToSetIdMap\[(\d+)\] = \[', js_code, re.M)}
    card_keys = {int(m) for m in re.findall(r'^\s*CardIdToSetIdMap\[(\d+)\] = \[', js_code, re.M)}
    return item_keys, card_keys


def buildPartnerMapLines(partner_sets, defined_items, defined_cards):
    """セットのパートナー側（アイテム/カード）の逆引きマップ行を作る。

    これが無いとパートナー側の説明欄にセット効果が出ない（itemset_checker.py が検出する漏れ）。
    partner_sets    : {('item'|'card', ID): [setId, ...]}
    defined_items/cards: 代入形式で定義済みのキー（既存 + 今回の出力）。
                      定義済みなら .concat()、未定義なら代入にする（未定義への concat は実行時エラーになる）
    """
    lines = []
    for (kind, partner_id), set_ids in sorted(partner_sets.items(), key=lambda kv: (kv[0][0] != 'item', kv[0][1] or 0)):
        if partner_id is None:
            continue    # 名前未解決。呼び出し側の 'None' 検出でエラー表示される
        name = 'ItemIdToSetIdMap' if kind == 'item' else 'CardIdToSetIdMap'
        defined = defined_items if kind == 'item' else defined_cards
        ids = ",".join(str(i) for i in set_ids)
        if partner_id in defined:
            lines.append(f"{name}[{partner_id}] = {name}[{partner_id}].concat([{ids}]);")
        else:
            lines.append(f"{name}[{partner_id}] = [{ids},];")
            defined.add(partner_id)
    return lines
