import os
import re
import yaml

PER_STATUS_10_CODE = {
    'Str': 1,
    'Agi': 2,
    'Vit': 3,
    'Int': 4,
    'Dex': 5,
    'Luk': 6,
}
AT_STATUS_110_CODE = {
    'Str': 25,
    'Agi': 26,
    'Vit': 27,
    'Int': 28,
    'Dex': 29,
    'Luk': 30,
}
AT_STATUS_130_CODE = {
    'Str': 37,
    'Agi': 38,
    'Vit': 39,
    'Int': 40,
    'Dex': 41,
    'Luk': 42,
}
AT_SP_STATUS_100_CODE = {
    'Pow': 43,
    'Sta': 44,
    'Wis': 45,
    'Spl': 46,
    'Con': 47,
    'Crt': 48,
}
AT_BASE_LV_CODE = {
    170: 1,
    100: 2,
     99: 3,
    175: 4,
    250: 5,
}

script_dir = os.path.dirname(os.path.abspath(__file__))


def loadCapabilityDict():
    """key = str 能力名, value = int 能力ID"""
    with open(f'{script_dir}/発動能力コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['capabilities']}


def loadEquipmentTypeDict():
    """key = str 部位名, value = int 部位コード"""
    with open(f'{script_dir}/装備部位コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['equipment']}


def loadEquipableCodeDict():
    """key = str 装備可能職, value = int 職ID"""
    with open(f'{script_dir}/装備可能コード.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    return {capability.get('name'): capability.get('code') for capability in config['equipable_list']}


def loadCardDict() -> dict:
    """key = カードorエンチャント名, value = cardID"""
    pattern = r'\[(\d+),(\d+),"([^,]+)",[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return {name: int(id) for id, type, name in matches if int(type) != 100}


def loadEnchantList():
    pattern = r'\[(\d+),(\d+),"([^,]+)",[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name] for id, type, name in matches if int(type) == 99]


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


def loadAutoSpellDict() -> dict:
    """key = (int スキルID, int スキルLv), value = int 使用可能スキルID"""
    pattern = r'\[(\d+),\d,(\d+),(\d+),\d+,\d+\],'
    with open(f'{script_dir}/../roro/m/js/autospell.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    return { (int(m[1]), int(m[2])): int(m[0]) for m in re.findall(pattern, js_code) }


def getLatestIdFromItemSet():
    """ """
    pattern = r'w_SE\[(\d+)] = \[[^;]+;'
    with open(f'{script_dir}/../roro/m/js/itemset.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])


def getLatestMonsterId():
    pattern = r'\[(\d+),.+'
    with open(f'{script_dir}/../roro/m/js/monster.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])


def getLatestItemId():
    pattern = r'\[(\d+),.+0\][,;]'
    with open(f'{script_dir}/../roro/m/js/item.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])


def getLatestEnchantId():
    pattern = r'\[(\d+),-1,0,0,.*'
    with open(f'{script_dir}/../roro/m/js/data/mig.enchlist.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])


def getItemRecord(item_name):
    """ item_name に該当するレコードを取得する """
    pattern = r'\[\d+,.*"' + item_name + r'".*,0\]'
    with open(f'{script_dir}/../roro/m/js/item.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches


def getItemId(item_name):
    """ item_name に該当するアイテムID を取得する"""
    pattern = r'\[(\d+),.*"' + item_name + r'".*,0\]'
    with open(f'{script_dir}/../roro/m/js/item.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches[0]


def getItemSetRecordArray(item_id):
    """ w_SE から item_id が含まれるレコードを取得する """
    pattern = r'(\[[\-\d]+.*,' + item_id + r'[,\]].*)[,;]'
    with open(f'{script_dir}/../roro/m/js/itemset.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches


def getItemSetMap(item_id):
    """ ItemIdToSetIdMap から item_id が含まれるマップを取得する """
    pattern = r'ItemIdToSetIdMap\[' + item_id + r'\] = .+'
    with open(f'{script_dir}/../roro/m/js/itemset.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches


def getEnchantRecordArray(item_id):
    """ sourceArray から item_id が含まれるレコードを取得する """
    pattern = r'(\[\d+,-1,0,0,[^,]+,[^,]+,[^,]+,\[{3}174,\[50,[^\]]*[\[,]' + item_id + r'[\],].+)[,;]'
    with open(f'{script_dir}/../roro/m/js/data/mig.enchlist.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches


def getEnchantIdArray(item_id):
    """ sourceArray から item_id が含まれるレコードのIDを取得する """
    pattern = r'\[(\d+),-1,0,0,[^,]+,[^,]+,[^,]+,\[{3}174,\[50,[^\]]*[\[,]' + item_id + r'[\],].+[,;]'
    with open(f'{script_dir}/../roro/m/js/data/mig.enchlist.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches


def getTimeItemRecordArray(item_id):
    """ ITEM_SP_TIME_OBJ から item_id が含まれるレコードを取得する """
    pattern = r'(\[\d+,[^,]+,[^,]+,\[.*\[1,' + item_id + '\].+)[,;]'
    with open(f'{script_dir}/../roro/m/js/timeitem.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return matches


CAPABILITY_DICT = loadCapabilityDict()
SKILL_CODE = loadSkillDict()
USABLE_SKILL_CODE = loadUsableSkillDict()
AUTO_SPELL_CODE = loadAutoSpellDict()
CARD_OR_ENCH_CODE = loadCardDict()

def buildCapabilityRecord(capability):

    # 能力コード取得
    capability_code = int(CAPABILITY_DICT.get(capability['name']))

    # 条件コード取得
    at_transcendence = int(capability['at_transcendence']) if 'at_transcendence' in capability else 0
    per_refine = int(capability['per_refine']) if 'per_refine' in capability else 0
    at_refine = int(capability['at_refine']) if 'at_refine' in capability else 0
    per_baselv = int(capability['per_lv']) if 'per_lv' in capability else 0
    per_status_10 = PER_STATUS_10_CODE[capability['per_status_10']] if 'per_status_10' in capability else 0
    at_status = 0
    if 'at_status_110' in capability:
        at_status = AT_STATUS_110_CODE[capability['at_status_110']]
    elif 'at_status_130' in capability:
        at_status = AT_STATUS_130_CODE[capability['at_status_130']]
    elif 'at_sp_status_100' in capability:
        at_status = AT_SP_STATUS_100_CODE[capability['at_sp_status_100']]
    at_baselv = 0
    if 'at_lv' in capability:
        at_baselv = AT_BASE_LV_CODE[capability['at_lv']]

    # 能力値取得
    value = int(capability['value']) if 'value' in capability else None
    if 'skill' in capability:
        skill_code = SKILL_CODE.get(capability['skill'])
        # スキル習得時に発動する効果の場合
        if capability_code in [199]:
            value = skill_code
        elif 'skill_lv' in capability:
            # スキル使用可能になる能力の場合
            if capability_code in [220, 222, 224]:
                value = USABLE_SKILL_CODE.get((skill_code, int(capability['skill_lv'])))
            # オートスペルの場合
            if capability_code in [221, 223, 225]:
                value = AUTO_SPELL_CODE.get((skill_code, int(capability['skill_lv'])))
        else:
            # スキル性能が変化する能力の場合
            capability_code += SKILL_CODE.get(capability['skill'])

    code = f"{at_transcendence:01d}"            # 超越段階が n 以上の時に発動する
    code += f"{at_baselv:01d}"                  # ベースLvが n 以上のときに（Lv99は "以下" で判定）
    code += f"{per_baselv:02d}"                 # ベースLvが n 上がる度に発動する
    code += f"00"                               # 特定の職業の場合に発動する（新規アイテムでは未だ登場しないためパース処理未実装）
    code += f"{at_status:02d}"                  # 純粋なステータス x が n 以上の時に発動する
    code += f"{per_status_10:01d}"              # 純粋なステータス x が10増加する度に発動する {x : 1=Str, 2=Agi, 3=Vit, 4=Int, 5=Dex, 6=Luk}
    code += f"{at_refine:02d}"                  # 精錬値が n 以上の時に発動する
    code += f"{per_refine:01d}"                 # 精錬値が n 上がる度に発動する
    code += f"{capability_code:05d}"            # 発動する効果ID
    code = int(code)
    # 超越段階が n 以上の時に発動する（BigIntフラグ付与）
    code = f"{code}n" if at_transcendence > 0 else code

    return f"{code},{value},"


def buildEnchantRecord(item_id, enchant_id, enchant):
    enchant_name = enchant['name']
    # エンチャント種別を英字・数字に置き換えたコードは普通の文字列でも動作する模様
    enchant_code = enchant_name
    record  = f'g_constDataManager.enchListDataManager.sourceArray[{enchant_id}] = '
    record += f'[{enchant_id},-1,0,0,[["{enchant_name}","{enchant_code}"]],[],[[[174,[50,[{item_id}]]],,['
    for slot_info in enchant['slot_list']:
        record += f'[[178,[27,[{slot_info["slot"]}]]],,[[[187,[59,{slot_info["refine"]}],[60,4]],,[[[186,[51,['
        for enchant in slot_info['enchant_list']:
            record += f'{CARD_OR_ENCH_CODE.get(enchant["name"])},'
        record += f']]],,[]]]]]],'
    record += f']]],[]];'
    return record
