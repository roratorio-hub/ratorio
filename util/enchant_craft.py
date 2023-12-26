"""
card.dat.js に登録する新規エンチャントデータを生成するスクリプト
"""

import re
import os
import sys
import yaml

ENCHANT     = 99
script_dir = os.path.dirname(os.path.abspath(__file__))


def getLatestIdFromEnchantList():
    pattern = r'CardObjNew\[(\d+)\] = \[\d+,\d+,[^;]+,0\];'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return int(max([id for id in matches]))


def loadCapabilityDict():
    with open(f'{script_dir}/capability_code.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['capabilities']}


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
    capability_code = capability_dict.get(type)
    if not capability_code:
        print(f"コードが見つかりません: {type}")
        sys.exit(0)
    code = f"{per_baselv}00000{at_refine:02d}{per_refine:01d}{capability_dict.get(type):05d}"
    return f"{int(code)},{value},"

# -----------------------------------
# 初期化
# -----------------------------------
capability_dict = loadCapabilityDict()


if __name__ == "__main__":

    script_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(script_dir, 'enchant.yaml')

    with open(config_path, 'r', encoding='utf8') as f:
        config = yaml.safe_load(f)

    enchant_list = config['enchant_list']

    id = getLatestIdFromEnchantList()

    for enchant in enchant_list:
        id += 1
        record = f'CardObjNew[{id}] = [{id},99,"{enchant["name"]}","",'
        for capability in enchant["capabilities"]:
            record += f"{getCapabilityRecord(capability)}"
        record += '0];'
        print(record) 



