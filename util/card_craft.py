
import re
import os
import yaml
import sys
from craft_util import *

ENCHANT     = 99

script_dir = os.path.dirname(os.path.abspath(__file__))

def loadCapabilityDict():
    """key = str 能力名, value = int 能力ID"""
    with open(f'{script_dir}/発動能力コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['capabilities']}


def loadCardTypeDict():
    """key = str 部位名, value = int 部位コード"""
    with open(f'{script_dir}/カード部位コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['card']}


def loadEquipableCodeDict():
    """key = str 装備可能職, value = int 職ID"""
    with open(f'{script_dir}/装備可能コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['equipable_list']}


def loadSkillDict() -> dict:
    """key = str スキル名, value = int スキルID"""
    pattern = r'\[(\d+),\d+,"(\(.+\))*(.+)"(\(.+\))*\],'
    with open(f'{script_dir}/../roro/m/js/skill.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    return { m[2]: int(m[0]) for m in re.findall(pattern, js_code) }


def loadUsableSkillDict() -> dict:
    """key = (int スキルID, int スキルLv), value = int 使用可能スキルID"""
    pattern = r'\[(\d+),\d,(\d+),(\d+)\],'
    with open(f'{script_dir}/../roro/m/js/usableskill.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    return { (int(m[1]), int(m[2])): int(m[0]) for m in re.findall(pattern, js_code) }


def loadCardList():
    #pattern = r'\[(\d+),(\d+),"(.*)",".*",0\]'
    pattern = r'\[(\d+),(\d+),"([^,]+)",[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name] for id, type, name in matches if int(type)]


def getLatestIdFromCard():
    """card.dat.jsに定義されている最も大きい CardID を返す
    """
    pattern = r'\[(\d+),\d+,[^,]+,[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])

            
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


def loadItemDict():
    pattern = r'\[(\d+),(\d+),\d+,\d+,\d+,\d+,\d+,\d+,([^,]*),[^,]*,[^,]*,[^]]*0\]'
    with open(f'{script_dir}/../roro/m/js/item.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return  {name.replace('"',''): int(id) for id, type, name in matches if type != "100"}    


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


def loadAutoSpellDict() -> dict:
    """key = (int スキルID, int スキルLv), value = int 使用可能スキルID"""
    pattern = r'\[(\d+),\d,(\d+),(\d+),\d+,\d+\],'
    with open(f'{script_dir}/../roro/m/js/autospell.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    return { (int(m[1]), int(m[2])): int(m[0]) for m in re.findall(pattern, js_code) }

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

    # card.dat.js, itemset.dat.js, enchlist.dat.js で使われている最新の ID を取得する
    card_id = getLatestIdFromCard()
    itemset_id = getLatestIdFromItemSet()
    enchant_id = getLatestId(slotinfo_list)
    
    with open(f'{script_dir}/カード・エンチャント.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

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
        
        # card.dat.js に記述すべきセット効果の出力
        if 'set_list' in enchant_info:
            card_to_set_record = f"CardIdToSetIdMap[{base_id}] = ["
            for set_info in enchant_info['set_list']:
                card_id += 1
                record  = f'CardObjNew[{card_id}] = [{card_id},100,0,"","",'
                for capability in set_info['capabilities']:
                    record += buildCapabilityRecord(capability)
                record += "0];"
                card_dat_js.append(record)
                if 'None' in record:
                    print(f'エラー：{enchant_info["name"]} に空のデータが挿入されました')

        # ------------------------------------------------------
        #  itemset.dat.js
        # ------------------------------------------------------
                
                # セット条件の出力
                itemset_id += 1
                record = f"w_SE[{itemset_id}] = [{card_id * -1},{base_id * -1},"
                for entity in set_info['entity_list']:
                    try:
                        set_entity_id = ITEM_CODE.get(entity['item_name']) if 'item_name' in entity else CARD_OR_ENCH_CODE.get(entity['card_name']) * -1
                    except:
                        print(f"{entity} の処理に失敗しました")
                    record += f"{set_entity_id},"
                # EOF
                record += "];"
                itemset_dat_js.append(record)
                card_to_set_record += f"{itemset_id},"
            # EOF                
            card_to_set_record += f"];"
            itemset_dat_js.append(card_to_set_record)

    OUTPUT_FILE = [
        ('card.dat.js', card_dat_js),
        ('itemset.dat.js', itemset_dat_js),
    ]

    for file_name, data_array in OUTPUT_FILE:
        print(f"--- {file_name} ---")
        for record in data_array:
            if 'None' in record:
                print('エラー: 空のデータが挿入されています')
                print(record)
        with open(f"{script_dir}/output_{file_name}", "w", encoding="utf-8") as f:
            f.write("\n".join(data_array))
