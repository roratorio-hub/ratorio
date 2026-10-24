import re
import os
import yaml
from craft_util import *
from set_util import groupSetList, loadExistingSetMapKeys, buildPartnerMapLines
from set_effect_merge import KIND_CARD, effectPayload, loadReusableEffects

script_dir = os.path.dirname(os.path.abspath(__file__))

def loadCardTypeDict():
    """key = str 部位名, value = int 部位コード"""
    with open(f'{script_dir}/カード部位コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['card']}


def loadCardList():
    pattern = r'\[(\d+),(\d+),"([^,]+)",[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../../engine/equip/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name] for id, type, name in matches if int(type)]


def getLatestIdFromCard():
    """card.dat.jsに定義されている最も大きい CardID を返す
    """
    pattern = r'\[(\d+),\d+,[^,]+,[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../../engine/equip/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])


ITEM_CODE = loadItemDict()
CARD_TYPE_CODE = loadCardTypeDict()

# -----------------------------------
# 初期化
# -----------------------------------
item_list = loadItemList()
card_list = loadCardList()
enchant_list = loadEnchantList()
slotinfo_list = loadSlotInfoList()
enchant_dict = getEnchantDict(enchant_list)
capability_dict = loadCapabilityDict()
equipable_dict = loadEquipableCodeDict()

if __name__ == "__main__":
    
    card_dat_js = []
    itemset_dat_js = []
    mig_enchlist_dat_js = []
    timeitem_dat_js = []

    # card.dat.js, itemset.dat.js, enchlist.dat.js で使われている最新の ID を取得する
    card_id = getLatestIdFromCard()
    itemset_id = getLatestIdFromItemSet()
    enchant_id = getLatestId(slotinfo_list)
    time_item_id = getLatestTimeItemId()
    
    with open(f'{script_dir}/カード・エンチャント.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    # 同じ内容のセット効果を新規に作らず再利用するための表（set_effect_merge.py 参照）
    reusable_effects = loadReusableEffects()

    # セットのパートナー側の逆引きマップ行を作るための情報
    partner_sets = {}
    with open(f'{script_dir}/../../engine/equip/itemset.dat.js', 'r', encoding='utf-8') as f:
        defined_items, defined_cards = loadExistingSetMapKeys(f.read())

    for enchant_info in config['card_list']:

    # ------------------------------------------------------
    #  card.dat.js
    # ------------------------------------------------------

        # カード基本性能の出力
        card_id += 1
        base_id = card_id
        description = enchant_info['desc'] if 'desc' in enchant_info else ""
        yomi = enchant_info['yomi'] if 'yomi' in enchant_info else ""
        card_type = CARD_TYPE_CODE.get(enchant_info["type"])
        record  = f'CardObjNew[{card_id}] = [{card_id},{card_type},"{enchant_info["name"]}","{yomi}","{description}",'
        if 'capabilities' in enchant_info:
            for capability in enchant_info['capabilities']:
                record += buildCapabilityRecord(capability)
        record += "0];"
        card_dat_js.append(record)
        if 'None' in record:
            print(f'エラー：{enchant_info["name"]} に空のデータが挿入されました')

        # 単体での時限発動効果の出力
        for time_effect in enchant_info.get('time_effects', []):
            time_item_id += 1
            for line in buildTimeItemRecord(time_item_id, 2, base_id, time_effect):
                timeitem_dat_js.append(line)

        # card.dat.js に記述すべきセット効果の出力
        if 'set_list' in enchant_info:
            card_to_set_record = f"CardIdToSetIdMap[{base_id}] = ["
            # 効果が同一のセットは効果レコードを1つ共有する（groupSetList 参照）
            for set_info, conditions in groupSetList(enchant_info['set_list']):
                set_desc = set_info.get('desc', '')
                capability_records = ''.join(buildCapabilityRecord(c) for c in set_info.get('capabilities', []))
                payload = effectPayload(KIND_CARD, set_desc, capability_records)
                # 時限発動効果つき・separate: true のセットは、効果レコードを共有しない
                can_reuse = not set_info.get('time_effects') and not set_info.get('separate')
                set_card_id = reusable_effects.get((KIND_CARD, payload)) if can_reuse else None
                if set_card_id is None:
                    card_id += 1
                    set_card_id = card_id
                    record = f'CardObjNew[{card_id}] = [{card_id},100,{payload}];'
                    card_dat_js.append(record)
                    if 'None' in record:
                        print(f'エラー：{enchant_info["name"]} に空のデータが挿入されました')
                    if can_reuse:
                        reusable_effects[(KIND_CARD, payload)] = set_card_id

        # ------------------------------------------------------
        #  itemset.dat.js
        # ------------------------------------------------------

                # セット条件の出力（条件1つにつき w_SE を1行）
                for entity_list in conditions:
                    itemset_id += 1
                    record = f"w_SE[{itemset_id}] = [{set_card_id * -1},{base_id * -1},"
                    for entity in entity_list:
                        try:
                            if 'item_name' in entity:
                                set_entity_id = ITEM_CODE.get(entity['item_name'])
                                partner_sets.setdefault(('item', set_entity_id), []).append(itemset_id)
                            else:
                                partner_card_id = CARD_OR_ENCH_CODE.get(entity['card_name'])
                                set_entity_id = partner_card_id * -1
                                partner_sets.setdefault(('card', partner_card_id), []).append(itemset_id)
                        except:
                            print(f"{entity} の処理に失敗しました")
                        record += f"{set_entity_id},"
                    # EOF
                    record += "];"
                    itemset_dat_js.append(record)
                    card_to_set_record += f"{itemset_id},"

                # 時限発動効果の出力
                for time_effect in set_info.get('time_effects', []):
                    time_item_id += 1
                    for line in buildTimeItemRecord(time_item_id, 2, set_card_id, time_effect):
                        timeitem_dat_js.append(line)
            # EOF
            card_to_set_record += f"];"
            itemset_dat_js.append(card_to_set_record)
            defined_cards.add(base_id)

    itemset_dat_js.extend(buildPartnerMapLines(partner_sets, defined_items, defined_cards))

    OUTPUT_FILE = [
        ('card.dat.js', card_dat_js),
        ('itemset.dat.js', itemset_dat_js),
        ('timeitem.dat.js', timeitem_dat_js),
    ]

    for file_name, data_array in OUTPUT_FILE:
        print(f"--- {file_name} ---")
        for record in data_array:
            if 'None' in record:
                print('エラー: 空のデータが挿入されています')
                print(record)
        with open(f"{script_dir}/output_{file_name}", "w", encoding="utf-8") as f:
            f.write("\n".join(data_array))
