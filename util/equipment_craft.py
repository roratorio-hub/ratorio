
import re
import os
import yaml

ENCHANT     = 99
script_dir = os.path.dirname(os.path.abspath(__file__))


def loadCapabilityDict():
    with open(f'{script_dir}/equipment_code.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['equipment']}


def loadEnchantList():
    pattern = r'\[(\d+),(\d+),"([^"]+)",[^]]*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name] for id, type, name in matches if int(type) == ENCHANT]

            
def loadItemList():
    pattern = r'\[(\d+),(\d+),\d+,\d+,\d+,\d+,\d+,\d+,([^,]*),[^,]*,[^,]*,[^]]*0\]'
    with open(f'{script_dir}/../roro/m/js/item.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name.replace('"',''), int(type)] for id, type, name in matches]


def loadSlotInfoList():
    pattern = r'\[(\d+),-1,0,0,\[\["([^"]+)","([^"]+)"]],\[],\[\[\[174,\[50,\[(\d+)]]],.+\[]]'
    with open(f'{script_dir}/../roro/m/js/data/mig.enchlist.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name, code] for id, name, code, item_id in matches]


def getLatestIdFromItemSet():
    pattern = r'w_SE\[(\d+)] = \[[^;]+;'
    with open(f'{script_dir}/../roro/m/js/itemset.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return int(max([id for id in matches]))


def loadCapabilityDict():
    with open(f'{script_dir}/capability_code.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['capabilities']}


def loadEquipmentTypeDict():
    with open(f'{script_dir}/equipment_code.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['equipment']}


def getEnchantDict(enchant_list):
    return {item[1]: item[0] for item in enchant_list}


def getId(name, list):
    lookup_dict_reverse = {item[1]: item[0] for item in list}
    return lookup_dict_reverse.get(name)


def getLatestId(list):
    return max([entity[0] for entity in list])


def getEnchantTypeCode(name, slotinfo_list):
    lookup_dict_reverse = {item[1]: item[2] for item in slotinfo_list}
    return lookup_dict_reverse.get(name)


def getCapabilityRecord(capability):
    type = capability['type']
    value = capability['value']
    per_refine = 0
    at_refine = 0
    per_baselv = 0
    if 'per_refine' in capability:
        per_refine = capability['per_refine']
    if 'at_refine' in capability:
        at_refine = capability['at_refine']
    if 'per_lv' in capability:
        per_baselv = capability['per_lv']
    code = f"{per_baselv}00000{at_refine:02d}{per_refine:01d}{capability_dict.get(type):05d}"
    return f"{int(code)},{value},"

# -----------------------------------
# 初期化
# -----------------------------------
item_list = loadItemList()
enchant_list = loadEnchantList()
slotinfo_list = loadSlotInfoList()
equipment_type_list = loadEquipmentTypeDict()
enchant_dict = getEnchantDict(enchant_list)
capability_dict = loadCapabilityDict()


if __name__ == "__main__":
    item_dat_js = []
    itemset_dat_js = []
    mig_enchlist_dat_js = []

    item_id = getLatestId(item_list)
    itemset_id = getLatestIdFromItemSet()
    enchant_id = getLatestId(slotinfo_list)
    
    with open(f'{script_dir}/equipment.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    for item_info in config['item_list']:
    # ------------------------------------------------------
    #  item.dat.js
    # ------------------------------------------------------
        item_id += 1
        base_id = item_id
        equipment_type = equipment_type_list.get(item_info["type"])
        record  = f'ItemObjNew[{item_id}] = [{item_id},{equipment_type},0,{item_info["def"]},0,'
        record += f'{item_info["slot"]},{item_info["weight"]},{item_info["required"]},'
        record += f'"{item_info["name"]}","{item_info["yomi"]}","{item_info["desc"]}",'
        for capability in item_info['capabilities']:
            record += getCapabilityRecord(capability)
        record += "0];"
        item_dat_js.append(record)
        if 'set' in item_info:
            item_id += 1
            record  = f'ItemObjNew[{item_id}] = [{item_id},100,0,0,0,0,0,0,0,0,"",'
            set_info = item_info['set']
            for capability in set_info['capabilities']:
                record += getCapabilityRecord(capability)
            record += "0];"
            item_dat_js.append(record)
    # ------------------------------------------------------
    #  itemset.dat.js
    # ------------------------------------------------------
            itemset_id += 1
            record = f"w_SE[{itemset_id}] = [{item_id},{item_id - 1},"
            for set_item in set_info['id_list']:
                record += f"{set_item['id']},"
            # EOF
            record += "];"
            itemset_dat_js.append(record)
            record = f"ItemIdToSetIdMap[{item_id - 1}] = [{itemset_id}];"
            itemset_dat_js.append(record)
    # ------------------------------------------------------
    #  mig.enchlist.dat.js
    # ------------------------------------------------------
        if 'enchant' in item_info:
            enchant_type = item_info['enchant']['name']
            enchant_hash = getEnchantTypeCode(enchant_type, slotinfo_list)
            enchant_id += 1
            record  = f'g_constDataManager.enchListDataManager.sourceArray[{enchant_id}] = '
            record += f'[{enchant_id},-1,0,0,[["{enchant_type}","{enchant_hash}"]],[],[[[174,[50,[{base_id}]]],,['
            for slot_info in item_info['enchant']['slot_list']:
                record += f'[[178,[27,[{slot_info["slot"]}]]],,[[[187,[59,{slot_info["refine"]}],[60,4]],,[[[186,[51,['
                for enchant in slot_info['enchant_list']:
                    record += f'{enchant_dict.get(enchant["name"])},'
                record += f']]],,[]]]]]],'
            record += f']]],[]];'
            mig_enchlist_dat_js.append(record)
            record = f'g_constDataManager.enchListDataManager.reverseResolveArrayItemId[{base_id}] = [{enchant_id}];'
            mig_enchlist_dat_js.append(record)

    print("--- item.dat.js ---")
    for record in item_dat_js:
        print(record)
    print("--- itemset.dat.js ---")
    for record in itemset_dat_js:
        print(record)
    print("--- mig.enchlist.dat.js ---")
    for record in mig_enchlist_dat_js:
        print(record)
