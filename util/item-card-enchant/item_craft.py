import os
import sys
import yaml
from craft_util import *
from set_util import groupSetList, loadExistingSetMapKeys, buildPartnerMapLines
from set_effect_merge import KIND_ITEM, effectPayload, loadReusableEffects

ITEM_CODE = loadItemDict()

script_dir = os.path.dirname(os.path.abspath(__file__))
 
# -----------------------------------
# 初期化
# -----------------------------------
item_list = loadItemList()
enchant_list = loadEnchantList()
slotinfo_list = loadSlotInfoList()
equipment_type_list = loadEquipmentTypeDict()
enchant_dict = getEnchantDict(enchant_list)
capability_dict = loadCapabilityDict()
equipable_dict = loadEquipableCodeDict()

if __name__ == "__main__":
    
    item_dat_js = []
    itemset_dat_js = []
    mig_enchlist_dat_js = []
    timeitem_dat_js = []

    item_id = getLatestItemId()
    itemset_id = getLatestIdFromItemSet()
    enchant_id = getLatestEnchantId()
    time_item_id = getLatestTimeItemId()
    
    with open(f'{script_dir}/アイテム.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    # 同じ内容のセット効果を新規に作らず再利用するための表（set_effect_merge.py 参照）
    reusable_effects = loadReusableEffects()

    # セットのパートナー側の逆引きマップ行を作るための情報
    partner_sets = {}
    with open(f'{script_dir}/../../engine/equip/itemset.dat.js', 'r', encoding='utf-8') as f:
        defined_items, defined_cards = loadExistingSetMapKeys(f.read())

    for item_info in config['item_list']:

    # ------------------------------------------------------
    #  item.dat.js
    # ------------------------------------------------------

        # アイテム基本性能の出力
        item_id += 1
        base_id = item_id
        equipment_type = equipment_type_list.get(item_info["type"])
        equipable_code = equipable_dict.get(item_info["required_job"])
        description = ""
        if 'desc' in item_info:
            description = item_info['desc']
        record  = f'ItemObjNew[{item_id}] = [{item_id},{equipment_type},{equipable_code},{item_info["atk_or_def"]},{item_info["weapon_lv"]},'
        record += f'{item_info["slot"]},{item_info["weight"]},{item_info["required_lv"]},'
        record += f'"{item_info["name"]}","{item_info["yomi"]}","{description}",'
        for capability in item_info['capabilities']:
            record += buildCapabilityRecord(capability)
        record += "0];"
        item_dat_js.append(record)

        # 単体での時限発動効果の出力
        for time_effect in item_info.get('time_effects', []):
            time_item_id += 1
            for line in buildTimeItemRecord(time_item_id, 1, base_id, time_effect):
                timeitem_dat_js.append(line)

        # item.dat.js に記述すべきセット効果の出力
        # 効果が同一のセットは効果レコードを1つ共有する（groupSetList 参照）
        if 'set_list' in item_info:
            item_to_set_record = f"ItemIdToSetIdMap[{base_id}] = ["
            for set_info, conditions in groupSetList(item_info['set_list']):
                set_desc = set_info.get('desc', '')
                capability_records = ''.join(buildCapabilityRecord(c) for c in set_info.get('capabilities', []))
                payload = effectPayload(KIND_ITEM, set_desc, capability_records)
                # 時限発動効果つき・separate: true のセットは、効果レコードを共有しない
                can_reuse = not set_info.get('time_effects') and not set_info.get('separate')
                set_item_id = reusable_effects.get((KIND_ITEM, payload)) if can_reuse else None
                if set_item_id is None:
                    item_id += 1
                    set_item_id = item_id
                    item_dat_js.append(f'ItemObjNew[{item_id}] = [{item_id},100,{payload}];')
                    if can_reuse:
                        reusable_effects[(KIND_ITEM, payload)] = set_item_id

        # ------------------------------------------------------
        #  itemset.dat.js
        # ------------------------------------------------------

                # セット条件の出力（条件1つにつき w_SE を1行）
                for entity_list in conditions:
                    itemset_id += 1
                    record = f"w_SE[{itemset_id}] = [{set_item_id},{base_id},"
                    for entity in entity_list:
                        if 'item_name' in entity:
                            set_entity_id = ITEM_CODE.get(entity['item_name'])
                            partner_sets.setdefault(('item', set_entity_id), []).append(itemset_id)
                        else:
                            partner_card_id = CARD_OR_ENCH_CODE.get(entity['card_name'])
                            set_entity_id = partner_card_id * -1
                            partner_sets.setdefault(('card', partner_card_id), []).append(itemset_id)
                        record += f"{set_entity_id},"
                    # EOF
                    record += "];"
                    itemset_dat_js.append(record)
                    item_to_set_record += f"{itemset_id},"

                # 時限発動効果の出力
                for time_effect in set_info.get('time_effects', []):
                    time_item_id += 1
                    for line in buildTimeItemRecord(time_item_id, 1, set_item_id, time_effect):
                        timeitem_dat_js.append(line)
            # EOF
            item_to_set_record += f"];"
            itemset_dat_js.append(item_to_set_record)
            defined_items.add(base_id)

        # ------------------------------------------------------
        #  mig.enchlist.dat.js
        # ------------------------------------------------------
        if 'enchant' in item_info:
            enchant_ids_for_item = []
            for enchant in item_info['enchant']:
                enchant_id += 1
                try:
                    record = buildEnchantRecord(base_id, enchant_id, enchant)
                    mig_enchlist_dat_js.append(record)
                    enchant_ids_for_item.append(enchant_id)
                except Exception as e:
                    print(f"{item_info['name']} のエンチャント定義に問題があります: {e}")
            if enchant_ids_for_item:
                ids_str = ','.join(str(i) for i in enchant_ids_for_item)
                mig_enchlist_dat_js.append(f'g_constDataManager.enchListDataManager.reverseResolveArrayItemId[{base_id}] = [{ids_str}];')

    itemset_dat_js.extend(buildPartnerMapLines(partner_sets, defined_items, defined_cards))

    OUTPUT_FILE = [
        ('item.dat.js', item_dat_js),
        ('itemset.dat.js', itemset_dat_js),
        ('mig.enchlist.dat.js', mig_enchlist_dat_js),
        ('timeitem.dat.js', timeitem_dat_js),
    ]
    for file_name, data_array in OUTPUT_FILE:
        print(f"--- {file_name} ---")
        for record in data_array:
            if 'None' in record:
                print('エラー: 空のデータが挿入されています')
                print(record)
                sys.exit(0)
        with open(f"{script_dir}/output_{file_name}", "w", encoding="utf-8") as f:
            f.write("\n".join(data_array))
