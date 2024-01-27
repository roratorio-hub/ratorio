"""
RO公式ツール <https://rotool.gungho.jp/map> からダウンロードした csv を monster.dat.js にパースする
monstergroup.dat.js と monstermap.dat.js は手作業でやる想定
"""

import csv
import os
from craft_util import *
from pykakasi import kakasi

ELEMENT_ID = {
    "無1":1,
    "無2":2,
    "無3":3,
    "無4":4,
    "水1":11,
    "水2":12,
    "水3":13,
    "水4":14,
    "地1":21,
    "地2":22,
    "地3":23,
    "地4":24,
    "火1":31,
    "火2":32,
    "火3":33,
    "火4":34,
    "風1":41,
    "風2":42,
    "風3":43,
    "風4":44,
    "毒1":51,
    "毒2":52,
    "毒3":53,
    "毒4":54,
    "聖1":61,
    "聖2":62,
    "聖3":63,
    "聖4":64,
    "闇1":71,
    "闇2":72,
    "闇3":73,
    "闇4":74,
    "念1":81,
    "念2":82,
    "念3":83,
    "念4":84,
    "不死1":91,
    "不死2":92,
    "不死3":93,
    "不死4":94,
}
BOSS_TYPE_ID = {
    "一般":0,
    "BOSS":1,
}    
RACE_ID = {
	"無形":0,    
	"不死":1,    
	"動物":2,    
	"植物":3,    
	"昆虫":4,    
	"魚貝":5,    
	"悪魔":6,    
	"人間":7,    
	"天使":8,    
	"竜":9,          
}
SIZE_ID = {
	"小":0,
    "中":1,
    "大":2,
}

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_file_path = f"{script_dir}/clock_01.csv"

ID = getLatestMonsterId()
kks = kakasi()
with open(csv_file_path, 'r', encoding='utf-8', newline='') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)
    for row in csv_reader:
        ID          += 1
        result = "["
        result += f"{ID},"                                  #  0: ID   
        result += f"\"{row[0]}\","                          #  1: NAME 
        result += f"{int(row[3])},"                         #  2: LV   
        result += f"{int(row[4].replace(',',''))},"         #  3: HP   
        result += f"{int(row[24].replace(',',''))},"        #  4: STR  
        result += f"{int(row[27].replace(',',''))},"        #  5: INT
        result += f"{int(row[26].replace(',',''))},"        #  6: VIT  
        result += f"{int(row[28].replace(',',''))},"        #  7: DEX
        result += f"{int(row[25].replace(',',''))},"        #  8: AGI
        result += f"{int(row[29].replace(',',''))},"        #  9: LUK  
        result += f"{int(row[15].replace(',',''))},"        # 10: ATK  
        result += f"{int(row[16].replace(',',''))},"        # 11: MATK 
        result += f"{int(row[14])},"                        # 12: RANGE
        result += f"{int(row[17].replace(',',''))},"        # 13: DEF  
        result += f"{int(row[18].replace(',',''))},"        # 14: MDEF 
        result += f"{int(row[5].replace(',',''))},"         # 15: BASE 
        result += f"{int(row[6].replace(',',''))},"         # 16: JOB  
        result += f"{SIZE_ID[row[9]]},"                     # 17:
        result += f"{ELEMENT_ID[row[7]]},"                  # 18:
        result += f"{RACE_ID[row[8]]},"                     # 19:
        result += f"{BOSS_TYPE_ID[row[10]]},"               # 20:
        result += f"0,"                                     # 21: 草タイプ
        result += f"1,"                                     # 22: QUALIFIED
        result += f"\"{''.join([w['kana'] for w in kks.convert(row[0])])}\","   # YOMI
        result += f"{int(row[19])},"                        # 24: RES
        result += f"{int(row[20])},"                        # 25: MRES
        result += f","                                      # 26: HIT
        result += f","                                      # 27: FLEE
        result += f","                                      # 28: 
        result += f","                                      # 29: 
        result += f"{int(row[15].replace(',',''))},"        # 30: ATK_MIN
        result += f"{int(row[15].replace(',',''))},"        # 31: ATK_MAX
        result += f"{int(row[13].replace(',',''))},"        # 32: HIT100
        result += f"{int(row[12].replace(',',''))},"        # 33: FLEE95
        result += f","                                      # 34: 減算DEF_MIN
        result += f","                                      # 35: 減算DEF_MAX
        result += f","                                      # 36: 減算MDEF
        result += f"{int(row[16].replace(',',''))},"        # 37: MATK_MIN
        result += f"{int(row[16].replace(',',''))},"        # 38: MATK_MAX
        result += f","                                      # 39: DEF_DIV_IGNORE_BUFF
        result += f","                                      # 40: MDEF_DIV_IGNORE_BUFF
        result += "],"

        print(result)

