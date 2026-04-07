"""
itemset.dat.js にセットし忘れた効果説明文を拾い上げるスクリプト
1. Hubで追加されたデータは必ず w_SE[\d+] から始まるので正規表現で全部拾う
2. 拾った配列に含まれるIDが CardIdToSetIdMap[\d+] と ItemIdToSetIdMap[\d+] に含まれるか確認する
3. 含まれない場合はリストアップする
"""

import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(f'{script_dir}/../roro/m/js/itemset.dat.js', 'r', encoding='utf-8') as file:
    js_code = file.read()

# アイテム変換マップの取得
ItemIdtoSetIdMap = {}
pattern = r'ItemIdToSetIdMap\[(\d+)\] = \[(.+)\];'
matches = re.findall(pattern, js_code)
for item_id, set_id_list in matches:
    item_id = int(item_id)
    ItemIdtoSetIdMap[item_id] = [int(set_id) for set_id in set_id_list.split(",") if set_id != ""]
pattern = r'ItemIdToSetIdMap\[(\d+)\] = ItemIdToSetIdMap\[\d+\].concat\(\[(.+)\]\);'
matches = re.findall(pattern, js_code)
for item_id, set_id_list in matches:
    item_id = int(item_id)
    data = [int(set_id) for set_id in set_id_list.split(",") if set_id != ""]
    if item_id not in ItemIdtoSetIdMap.keys():
         # dict が存在しない場合は新規作成
         ItemIdtoSetIdMap[item_id] = data
    else:
         # 存在する場合は追記
         ItemIdtoSetIdMap[item_id].extend(data)


# カード変換マップの取得
CardIdtoSetIdMap = {}
pattern = r'CardIdToSetIdMap\[(\d+)\] = \[(.+)\];'
matches = re.findall(pattern, js_code)
for card_id, set_id_list in matches:
    card_id = int(card_id)
    CardIdtoSetIdMap[card_id] = [int(set_id) for set_id in set_id_list.split(",") if set_id != ""]
pattern = r'CardIdToSetIdMap\[(\d+)\] = CardIdToSetIdMap\[\d+\].concat\(\[(.+)\]\);'
matches = re.findall(pattern, js_code)
for card_id, set_id_list in matches:
    card_id = int(card_id)
    data = [int(set_id) for set_id in set_id_list.split(",") if set_id != ""]
    if card_id not in CardIdtoSetIdMap.keys():
         # dict が存在しない場合
         CardIdtoSetIdMap[card_id] = data
    else:
         # 存在する場合
         CardIdtoSetIdMap[card_id].extend(data)


# セット効果のサーチ
result_item = {}
result_card = {}
pattern = r'w_SE\[(\d+)] = \[(.+)\];\n'
matches = re.findall(pattern, js_code)
for set_id, member_list in matches:
    set_id = int(set_id)
    member_list = [int(member_id) for member_id in member_list.split(",") if member_id != ""][1:]
    for member_id in member_list:
        if member_id > 0:
            # アイテムの場合
            if member_id in ItemIdtoSetIdMap:
                if set_id not in ItemIdtoSetIdMap[member_id]:
                    # 定義がない場合
                    if member_id in result_item:
                         result_item[member_id].append(set_id)
                    else:
                         result_item[member_id] = [set_id]
            else:
                    if member_id in result_item:
                         result_item[member_id].append(set_id)
                    else:
                         result_item[member_id] = [set_id]
        else: 
            # カードの場合
            member_id *= -1
            if member_id in CardIdtoSetIdMap:
                if set_id not in CardIdtoSetIdMap[member_id]:
                    # 定義がない場合
                    if member_id in result_card:
                         result_card[member_id].append(set_id)
                    else:
                         result_card[member_id] = [set_id]
            else:
                    if member_id in result_card:
                         result_card[member_id].append(set_id)
                    else:
                         result_card[member_id] = [set_id]

# 結果表示
keys = list(result_item.keys())
keys.sort()
for item_id in keys:
     print(f"ItemIdToSetIdMap[{item_id}] = ItemIdToSetIdMap[{item_id}].concat({result_item[item_id]});")
keys = list(result_card.keys())
keys.sort()
for card_id in keys:
     print(f"CardIdToSetIdMap[{card_id}] = CardIdToSetIdMap[{card_id}].concat({result_card[card_id]});")
