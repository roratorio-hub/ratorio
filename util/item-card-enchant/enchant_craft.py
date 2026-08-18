import os
import sys
import yaml
from craft_util import *

if __name__ == "__main__":
    ITEM_CODE = loadItemDict()
    script_dir = os.path.dirname(os.path.abspath(__file__))
    mig_enchlist_dat_js = []
    enchant_id = getLatestEnchantId()
    merged_enchant_info = {}
    has_error = False

    with open(f'{script_dir}/エンチャント.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    for enchant_info in config['enchant_list']:
        for enchant in enchant_info['enchant']:
            enchant_id += 1
            try:
                item_list = [ITEM_CODE[item['item_name']] for item in enchant['item_list']]
            except KeyError as e:
                print(f"{enchant.get('name', '(不明)')} のアイテム名解決に失敗しました: {e}")
                has_error = True
                continue
            record = buildEnchantRecord2(item_list, enchant_id, enchant)
            if 'None' in record:
                print(f"{enchant.get('name', '(不明)')} のエンチャント定義に問題があります"
                      f"（未定義のエンチャント名が含まれています）")
                has_error = True
                continue
            mig_enchlist_dat_js.append(record)
            for item_code in item_list:
                # 辞書にitem_codeがなければ新しいリストを作成し、あれば既存のリストに追加
                merged_enchant_info.setdefault(item_code, []).append(enchant_id)

    if has_error:
        sys.exit(1)

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
