"""ペット（キューペット）データの生成ロジック。

pet_craft.py の純粋な部分（dat.js を読み込まない関数）。単体テストを軽くするため craft_util.py には置かない。

ペットは engine/equip/pet.dat.js の PET_OBJ（配列リテラル）の1行。行の添字がそのままペットIDで、
PET_OBJ[petId] で直接引かれるため、行は必ず 0 から欠番なく並べる。
行形式: [ID,"名前","読み(カタカナ)","説明文",<能力コード,値>…,0],
"""

import re

# ワンダーエッグバスケット（item.dat.js）とのセット。効果レコード(4236)は全ペットで共有している
WONDER_BASKET_ITEM_NAME = "ワンダーエッグバスケット"
WONDER_BASKET_ITEM_ID = 4235
WONDER_BASKET_EFFECT_ID = 4236

# 名前の先頭に付く「効果が未確認」の目印（重複チェックで無視する）
NAME_MARKS = ("（×）", "（△）")


def loadPetRows(js_code):
    """pet.dat.js の PET_OBJ 各行の (ID, 名前) を出現順に返す"""
    start = js_code.index("export const PET_OBJ")
    rows = re.findall(r'^\s*\[(\d+),"([^"]*)"', js_code[start:], re.M)
    return [(int(pet_id), name) for pet_id, name in rows]


def getNextPetId(rows):
    """次に使うペットIDを返す。既存の行が 0 から欠番なく並んでいなければ例外"""
    ids = [pet_id for pet_id, _ in rows]
    if ids != list(range(len(ids))):
        raise ValueError("PET_OBJ の行が ID の昇順・欠番なしで並んでいません（添字＝ペットIDが崩れています）")
    return len(ids)


def stripNameMark(name):
    for mark in NAME_MARKS:
        if name.startswith(mark):
            return name[len(mark):]
    return name


def checkPetInfo(pet_info, existing_names):
    """YAML の1ペット分を検査する。問題があれば ValueError"""
    for key in ('name', 'yomi'):
        if not pet_info.get(key):
            raise ValueError(f"{key} が未指定です: {pet_info}")
    name = pet_info['name']
    for key in ('name', 'yomi', 'desc'):
        if '"' in str(pet_info.get(key, '')):
            raise ValueError(f"{name}: {key} に二重引用符は使えません")
    if name in existing_names:
        raise ValueError(f"{name}: 既に PET_OBJ に登録されています")
    if name.endswith('の卵') or re.search(r'\[\d+\]$', name):
        raise ValueError(f"{name}: 卵名の「の卵」や末尾の[N]を外した名前で記述してください")


def buildPetRecord(pet_id, pet_info, build_capability):
    """PET_OBJ の1行を作る（インデントなし・末尾カンマ付き）

    build_capability: 能力1件 -> "コード,値," を返す関数（craft_util.buildCapabilityRecord）
    """
    desc = pet_info.get('desc', '')
    record = f'[{pet_id},"{pet_info["name"]}","{pet_info["yomi"]}","{desc}",'
    for capability in pet_info.get('capabilities', []):
        record += build_capability(capability)
    record += '0],'
    if 'None' in record:
        raise ValueError(f'{pet_info["name"]}: 能力コードが解決できません: {record}')
    return record


def buildWonderBasketSetLines(first_set_id, pets):
    """ワンダーエッグバスケットとのセット定義行を作る（itemset.dat.js 用・インデントなし）

    pets: [(ペットID, 名前), ...]
    戻り値: w_SE 行 ＋ PetIdToSetIdMap 行 ＋ ItemIdToSetIdMap[バスケット] への concat 行
    （どれが欠けてもセット効果が出ない／パートナー側の説明欄に出ない）
    """
    lines = []
    set_ids = []
    for offset, (pet_id, name) in enumerate(pets):
        set_id = first_set_id + offset
        set_ids.append(set_id)
        lines.append(
            f"w_SE[{set_id}] = [{WONDER_BASKET_EFFECT_ID},{WONDER_BASKET_ITEM_ID},"
            f"-(ITEM_SET_PET_ID_OFFSET + {pet_id})]; // {WONDER_BASKET_ITEM_NAME}({WONDER_BASKET_ITEM_ID}) + {name}")
    for set_id, (pet_id, _) in zip(set_ids, pets):
        lines.append(f"PetIdToSetIdMap[{pet_id}] = [{set_id}];")
    if set_ids:
        ids = ",".join(str(i) for i in set_ids)
        lines.append(f"ItemIdToSetIdMap[{WONDER_BASKET_ITEM_ID}] = ItemIdToSetIdMap[{WONDER_BASKET_ITEM_ID}].concat([{ids}]);")
    return lines
