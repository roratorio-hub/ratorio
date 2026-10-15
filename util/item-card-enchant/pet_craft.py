import os
import re
import sys
import yaml
from craft_util import *
from pet_util import (
    WONDER_BASKET_EFFECT_ID, WONDER_BASKET_ITEM_ID, WONDER_BASKET_ITEM_NAME,
    loadPetRows, getNextPetId, stripNameMark, checkPetInfo, buildPetRecord, buildWonderBasketSetLines,
)

script_dir = os.path.dirname(os.path.abspath(__file__))


def fail(message):
    print(f"エラー: {message}")
    sys.exit(1)


if __name__ == "__main__":

    # ワンダーエッグバスケットの定義が想定どおりか確認する（ID・効果レコードがずれていたら出力しない）
    item_code = loadItemDict()
    if item_code.get(WONDER_BASKET_ITEM_NAME) != WONDER_BASKET_ITEM_ID:
        fail(f"item.dat.js の {WONDER_BASKET_ITEM_NAME} が ID {WONDER_BASKET_ITEM_ID} ではありません。pet_util.py の定数を確認してください")
    with open(f'{script_dir}/../../engine/equip/item.dat.js', 'r', encoding='utf-8') as f:
        if not re.search(rf'\[{WONDER_BASKET_EFFECT_ID},100,', f.read()):
            fail(f"item.dat.js にセット効果レコード {WONDER_BASKET_EFFECT_ID} がありません。pet_util.py の定数を確認してください")

    with open(f'{script_dir}/../../engine/equip/pet.dat.js', 'r', encoding='utf-8') as f:
        rows = loadPetRows(f.read())
    try:
        pet_id = getNextPetId(rows)
    except ValueError as e:
        fail(str(e))
    existing_names = {stripNameMark(name) for _, name in rows}

    with open(f'{script_dir}/ペット.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    pet_dat_js = []
    basket_pets = []
    for pet_info in config['pet_list']:
        try:
            checkPetInfo(pet_info, existing_names)
            pet_dat_js.append(buildPetRecord(pet_id, pet_info, buildCapabilityRecord))
        except ValueError as e:
            fail(str(e))
        existing_names.add(pet_info['name'])
        if 'wonder_basket' not in pet_info:
            print(f"注意: {pet_info['name']} に wonder_basket が未指定です。卵の説明に「{WONDER_BASKET_ITEM_NAME}と共に装備時」があれば true にしてください")
        if pet_info.get('wonder_basket'):
            basket_pets.append((pet_id, pet_info['name']))
        pet_id += 1

    itemset_dat_js = buildWonderBasketSetLines(getLatestIdFromItemSet() + 1, basket_pets)

    OUTPUT_FILE = [
        ('pet.dat.js', pet_dat_js),
        ('pet_itemset.dat.js', itemset_dat_js),
    ]
    for file_name, data_array in OUTPUT_FILE:
        print(f"--- {file_name} ---")
        with open(f"{script_dir}/output_{file_name}", "w", encoding="utf-8") as f:
            f.write("\n".join(data_array))
