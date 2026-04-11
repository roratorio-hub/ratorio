import os
import sys
import yaml
from craft_util import *

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

    item_id = getLatestItemId()
    itemset_id = getLatestIdFromItemSet()
    enchant_id = getLatestEnchantId()
    
    with open(f'{script_dir}/アイテム.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

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

        # item.dat.js に記述すべきセット効果の出力
        if 'set_list' in item_info:
            item_to_set_record = f"ItemIdToSetIdMap[{base_id}] = ["
            for set_info in item_info['set_list']:
                item_id += 1
                record  = f'ItemObjNew[{item_id}] = [{item_id},100,0,0,0,0,0,0,0,0,"",'
                for capability in set_info['capabilities']:
                    record += buildCapabilityRecord(capability)
                record += "0];"
                item_dat_js.append(record)

        # ------------------------------------------------------
        #  itemset.dat.js
        # ------------------------------------------------------
                
                # セット条件の出力
                itemset_id += 1
                record = f"w_SE[{itemset_id}] = [{item_id},{base_id},"
                for entity in set_info['entity_list']:
                    set_entity_id = ITEM_CODE.get(entity['item_name']) if 'item_name' in entity else CARD_OR_ENCH_CODE.get(entity['card_name']) * -1
                    record += f"{set_entity_id},"
                # EOF
                record += "];"
                itemset_dat_js.append(record)
                item_to_set_record += f"{itemset_id},"
            # EOF                
            item_to_set_record += f"];"
            itemset_dat_js.append(item_to_set_record)

        # ------------------------------------------------------
        #  mig.enchlist.dat.js
        # ------------------------------------------------------
        if 'enchant' in item_info:
            for enchant in item_info['enchant']:
                enchant_id += 1
                try:
                    record = buildEnchantRecord(base_id, enchant_id, enchant)
                except:
                    print(f"{item_info['name']} のエンチャント定義に問題があります")
                mig_enchlist_dat_js.append(record)
                record = f'g_constDataManager.enchListDataManager.reverseResolveArrayItemId[{base_id}] = [{enchant_id}];'
                mig_enchlist_dat_js.append(record)

    OUTPUT_FILE = [
        ('item.dat.js', item_dat_js),
        ('itemset.dat.js', itemset_dat_js),
        ('mig.enchlist.dat.js', mig_enchlist_dat_js),
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
