import os
import yaml

"""
命名規則
    {機能}_{対象}_{条件} を基本とする
    対象や条件を指定しない場合は該当部分のワードを削除する
機能
    PROTECTION
    MAXHP
    DELAY
    PHISICS
    MAGIC
    IMMORTAL
    MDEF
    ALL_STATUS
対象
    NORMAL
    BOSS
    PLAYER
    ALL_RACE
条件
    AT_REFINE
    PER_REFINE
    SET
"""
PROTECTION_NORMAL           = "一般耐性"
PROTECTION_BOSS             = "ボス耐性"
PROTECTION_PLAYER           = "P耐性"
PROTECTION_NEN              = "念耐性"
MAXHP_PER_REFINE            = "精錬値がn上がる度にMaxHP"
ASPD_AT_REFINE              = "精錬値n以上でASPD%Up"
ABSOLUTELY_HIT_AT_REFINE    = "精錬値n以上で必中Up"
DELAY_AT_REFINE             = "精錬値n以上でスキルディレイx"
PHISICS_AT_REFINE           = "精錬値n以上で物理Up"
MAGIC_AT_REFINE             = "精錬値n以上で魔法Up"
PHISICS_ALL_RACE_AT_REFINE  = "精錬値n以上で全種族に物理Up"
MAGIC_ALL_RACE_AT_REFINE    = "精錬値n以上で全種族に魔法Up"
ATK_PER_REFINE              = "精錬値がn上がる度にAtk+"
MATK_PER_REFINE             = "精錬値がn上がる度にMatk+"
ATK_PER_LV                  = "Baseがn上がる度にAtk+"
MATK_PER_LV                 = "Baseがn上がる度にMAtk+"
IMMORTAL                    = "壊れない"
MDEF                        = "MDEF"
ALL_STATUS                  = "全ステータスUp"
PHISICS_SMALL               = "小型モンスターに物理Up"
PHISICS_MED                 = "中型モンスターに物理Up"
PHISICS_LARGE               = "大型モンスターに物理Up"
MAGIC_SMALL                 = "小型モンスターに魔法Up"
MAGIC_MED                   = "中型モンスターに魔法Up"
MAGIC_LARGE                 = "大型モンスターに魔法Up"
PHISICS_ALL_RACE            = "全種族に物理Up"
MAGIC_ALL_RACE              = "全種族に魔法Up"
ALL_STATUS_SET              = "セット：全ステータスUp"
PHISICS_SET                 = "セット：物理Up"
MAGIC_SET                   = "セット：魔法Up"
PROTECTION_PLAYER_SET       = "セット：P耐性"
PROTECTION_SEI_SET          = "セット：聖耐性"
PROTECTION_NEN_SET          = "セット：念耐性"

def parse_type(key):
    if key == "上段":
        return 50
    if key == "中段":
        return 51
    if key == "下段":
        return 52
    if key == "鎧":
        return 60
    if key == "盾":
        return 61
    if key == "肩":
        return 62
    if key == "靴":
        return 63
    if key == "アクセ":
        return 64
    if key == "アクセ１":
        return 65
    if key == "アクセ２":
        return 66
    if key == "セット":
        return 100
    return 0


def parse_capability(data):
    if data['type'] == PROTECTION_NEN:
        return f"68,{data['value']},"
    if data['type'] == PHISICS_ALL_RACE:
        return f"261,{data['value']},"
    if data['type'] == MAGIC_ALL_RACE:
        return f"266,{data['value']},"
    if data['type'] == PHISICS_ALL_RACE_AT_REFINE:
        return f"{data['refine']}000261,{data['value']},"
    if data['type'] == MAGIC_ALL_RACE_AT_REFINE:
        return f"{data['refine']}000266,{data['value']},"
    if data['type'] == ASPD_AT_REFINE:
        return f"{data['refine']}000012,{data['value']},"
    if data['type'] == ABSOLUTELY_HIT_AT_REFINE:
        return f"{data['refine']}000086,{data['value']},"
    if data['type'] == ATK_PER_REFINE:
        return f"{data['refine']}00017,{data['value']},"
    if data['type'] == MATK_PER_REFINE:
        return f"{data['refine']}00100,{data['value']},"
    if data['type'] == ALL_STATUS:
        return f"217,{data['value']},"
    if data['type'] == PROTECTION_NORMAL:
        return f"79,{data['value']},"
    if data['type'] == PROTECTION_BOSS:
        return f"77,{data['value']},"
    if data['type'] == MDEF:
        return f"19,{data['value']},"
    if data['type'] == PROTECTION_PLAYER:
        return f"243,{data['value']},"
    if data['type'] == MAXHP_PER_REFINE:
        return f"{data['refine']}00015,{data['value']},"
    if data['type'] == DELAY_AT_REFINE:
        return f"{data['refine']}000074,{data['value']},"
    if data['type'] == PHISICS_AT_REFINE:
        return f"{data['refine']}000080,{data['value']},"
    if data['type'] == MAGIC_AT_REFINE:
        return f"{data['refine']}000089,{data['value']},"
    if data['type'] == IMMORTAL:
        return "194,1,"
    if data['type'] == ALL_STATUS_SET:
        return f"[-2742,-2741,-1245],"
    if data['type'] == PHISICS_SET:
        return ""
    if data['type'] == MAGIC_SET:
        return ""
    if data['type'] == ATK_PER_LV:
        return f"{data['lv']}0000000000017,{data['value']},"
    if data['type'] == MATK_PER_LV:
        return f"{data['lv']}0000000000100,{data['value']},"
    if data['type'] == PROTECTION_PLAYER_SET:
        return f"[target,this,-2662]"
    if data['type'] == PROTECTION_SEI_SET:
        return f"[target,this,-2662]"
    if data['type'] == PROTECTION_NEN_SET:
        return f"[target,this,-2662]"
    if data['type'] == PHISICS_SMALL:
        return f"27,{data['value']},"
    if data['type'] == PHISICS_MED:
        return f"28,{data['value']},"
    if data['type'] == PHISICS_LARGE:
        return f"29,{data['value']},"
    if data['type'] == MAGIC_SMALL:
        return f"97,{data['value']},"
    if data['type'] == MAGIC_MED:
        return f"98,{data['value']},"
    if data['type'] == MAGIC_LARGE:
        return f"99,{data['value']},"


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(script_dir, 'item.yaml')

    with open(config_path, 'r', encoding='utf8') as f:
        config = yaml.safe_load(f)

    item_list = config['item_list']

    id = 4994
    for item in item_list:
        id += 1
        # 基本機能の定義
        entry = f'ItemObjNew[{id}] = [{id},{parse_type(item["type"])},0,{item["def"]},0,{item["slot"]},{item["weight"]},{item["required"]},"{item["name"]}","{item["yomi"]}","{item["desc"]}",'
        # 追加機能の定義
        for capability in item["capabilities"]:
            entry += parse_capability(capability)
        # EOF
        entry += '0];'

        if item['type'] == "セット":
            set_entry = f"w_SE[XXXX] = [{id},{item['set']['main']},"
            for sub_id in item['set']['sub']:
                set_entry += f"{sub_id},"
            set_entry += "];\n"
            set_entry += f"ItemIdToSetIdMap[{item['set']['main']}] = [XXXX];"
            print("\n--- itemset.dat.js に追記してください ---")
            print(set_entry)

        print("\n--- item.dat.js に追記してください ---")
        print(entry) 

