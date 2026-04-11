import os
import sys
import yaml
from craft_util import *

if __name__ == "__main__":
    ITEM_CODE = loadItemDict()
    script_dir = os.path.dirname(os.path.abspath(__file__))
    mig_enchlist_dat_js = []
    enchant_id = getLatestEnchantId()
    
    with open(f'{script_dir}/エンチャント.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    for enchant_info in config['enchant_list']:
        merged_enchant_info = {}
        for enchant in enchant_info['enchant']:
            enchant_id += 1
            try:
                item_list = []
                for item in enchant['item_list']:
                    item_list.append(ITEM_CODE[item['item_name']])
                record = buildEnchantRecord2(item_list, enchant_id, enchant)
            except:
                print(f"{enchant_info['name']} のエンチャント定義に問題があります")
            mig_enchlist_dat_js.append(record)
            for item in enchant['item_list']:
                item_code = ITEM_CODE[item['item_name']]
                # 辞書にitem_codeがなければ新しいリストを作成し、あれば既存のリストに追加
                if item_code not in merged_enchant_info:
                    merged_enchant_info[item_code] = []
                merged_enchant_info[item_code].append(enchant_id)

    for item_code in sorted(merged_enchant_info.keys()):
        enchant_ids = merged_enchant_info[item_code]
        record = f'g_constDataManager.enchListDataManager.reverseResolveArrayItemId[{item_code}] = [{",".join(map(str, enchant_ids))}];'
        mig_enchlist_dat_js.append(record)

    OUTPUT_FILE = [
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
