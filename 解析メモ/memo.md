
# アウェイキングブルームを追加する

公式情報より
```
様々な偉人たちが残した技能を記憶する帽子。長き眠りより覚醒し、隠された才能は開花する。
―――――――――――――
一般・ボスモンスターから受けるダメージ - 20%
プレイヤーから受けるダメージ - 13%
[アウェイキングブルーム]の精錬値が1上がる度に追加でスキルディレイ - 2%
[アウェイキングブルーム]の精錬値が7以上の時、追加で物理・魔法攻撃時、全ての属性のモンスターに与えるダメージ + 15% MaxHP + 10% , MaxSP + 10%
[アウェイキングブルーム]の精錬値が9以上の時、追加で物理・魔法攻撃時、全ての属性のモンスターに与えるダメージ + 25% 全ての基本ステータス + 10
―――――――――――――
系列 : 兜
位置 : 上段
属性 : - スロット : 1
Def : 10 Mdef : 10
精錬 : 可 破損 : する
重量 : 50
要求レベル : 100
装備 : 全ての職業
```

追加するエントリは以下の通り
```
[
    4994,            # itemID = 4994
    50,              # 50 = 上段, 63 = 靴, 60 = 鎧
    0,
    10,              # DEF = 10
    0,
    1,               # Slot = 1
    50,              # 重量 = 50
    100,             # Lv制限 = 100
    "アウェイキングブルーム","アウエイキンクフルウム","",
    19,10,          # MDEF = 10
    79,20,           # 一般耐性 = 20
    77,20,           # ボス耐性 = 20
    243,13,         # P耐 = 13
    100074,2,       # 精錬1あたりディレイ -2%
    7000080,15,     # 精錬7のとき一般物理 +15%
    7000089,15,     # 精錬7のとき一般魔法 +15%
    7000015,10,     # 精錬7のときMaxHP +10%
    7000016,10,     # 精錬7のときMaxSP +10%
    9000080,25,     # 精錬9のとき一般物理 +25%
    9000089,25,     # 精錬9のとき一般魔法 +25%
    9000217,10,     # 精錬9のとき全ステ +10
    0
],
```

# アウェイキングブルームのエンチャントを実装する

公式情報によればアウェイキングブルームのエンチャントは以下の通り
```
スペシャル(キョウ)

第1エンチャント(第4スロット：精錬値6以上)
SpecialStr、SpecialAgi、SpecialVit、SpecialInt、SpecialDex、SpecialLuk、潜在覚醒(アースストレインI)、潜在覚醒(アースドライブI)、潜在覚醒(アックストルネードI)、潜在覚醒(アックスブーメランI)、潜在覚醒(アドラムスI)、潜在覚醒(アローストームII)、潜在覚醒(イグニッションブレイクII)、潜在覚醒(イヌハッカメテオI)、潜在覚醒(インスピレーションI)、潜在覚醒(ヴェラチュールスピアーI)、潜在覚醒(エイムドボルトI)、潜在覚醒(エスパI)、潜在覚醒(カートキャノンI)、潜在覚醒(カートトルネードI)、潜在覚醒(キャノンスピアI)、潜在覚醒(キャロットビートI)、潜在覚醒(クリムゾンロックI)、潜在覚醒(クロスリッパースラッシャーI)、潜在覚醒(サイキックウェーブI)、潜在覚醒(サベージの魂II)、潜在覚醒(シールドプレスI)、潜在覚醒(シビアレインストームII)、潜在覚醒(ジャックフロストII)、潜在覚醒(ジュデックスII)、潜在覚醒(スペルフィストI)、潜在覚醒(スポアエクスプロージョンI)、潜在覚醒(ソウルエクスパンションI)、潜在覚醒(ソニックウェーブI)、潜在覚醒(トライアングルショットI)、潜在覚醒(バニシングポイントI)、潜在覚醒(パワースイングI)、潜在覚醒(ファイアーレインI)、潜在覚醒(フェイタルメナスI)、潜在覚醒(ヘルインフェルノI)、潜在覚醒(マタタビランスI)、潜在覚醒(メタリックサウンドI)、潜在覚醒(ラウンドトリップI)、潜在覚醒(レイオブジェネシスI)、潜在覚醒(ローリングカッターI)、潜在覚醒(獅子吼II)、潜在覚醒(十文字斬りI)、潜在覚醒(死霊爆発I)、潜在覚醒(太陽爆発I)、潜在覚醒(天羅地網I)、潜在覚醒(爆気散弾I)、潜在覚醒(風魔手裏剣 -乱華-I)、潜在覚醒(満月脚II)、潜在覚醒(雷光弾I)、潜在覚醒(流星落下I)

第2エンチャント(第3スロット：精錬値8以上)
SpecialStr、SpecialAgi、SpecialVit、SpecialInt、SpecialDex、SpecialLuk、潜在覚醒(アースストレインI)、潜在覚醒(アースドライブI)、潜在覚醒(アックストルネードI)、潜在覚醒(アックスブーメランI)、潜在覚醒(アドラムスI)、潜在覚醒(アローストームII)、潜在覚醒(イグニッションブレイクII)、潜在覚醒(イヌハッカメテオI)、潜在覚醒(インスピレーションI)、潜在覚醒(ヴェラチュールスピアーI)、潜在覚醒(エイムドボルトI)、潜在覚醒(エスパI)、潜在覚醒(カートキャノンI)、潜在覚醒(カートトルネードI)、潜在覚醒(キャノンスピアI)、潜在覚醒(キャロットビートI)、潜在覚醒(クリムゾンロックI)、潜在覚醒(クロスリッパースラッシャーI)、潜在覚醒(サイキックウェーブI)、潜在覚醒(サベージの魂II)、潜在覚醒(シールドプレスI)、潜在覚醒(シビアレインストームII)、潜在覚醒(ジャックフロストII)、潜在覚醒(ジュデックスII)、潜在覚醒(スペルフィストI)、潜在覚醒(スポアエクスプロージョンI)、潜在覚醒(ソウルエクスパンションI)、潜在覚醒(ソニックウェーブI)、潜在覚醒(トライアングルショットI)、潜在覚醒(バニシングポイントI)、潜在覚醒(パワースイングI)、潜在覚醒(ファイアーレインI)、潜在覚醒(フェイタルメナスI)、潜在覚醒(ヘルインフェルノI)、潜在覚醒(マタタビランスI)、潜在覚醒(メタリックサウンドI)、潜在覚醒(ラウンドトリップI)、潜在覚醒(レイオブジェネシスI)、潜在覚醒(ローリングカッターI)、潜在覚醒(獅子吼II)、潜在覚醒(十文字斬りI)、潜在覚醒(死霊爆発I)、潜在覚醒(太陽爆発I)、潜在覚醒(天羅地網I)、潜在覚醒(爆気散弾I)、潜在覚醒(風魔手裏剣 -乱華-I)、潜在覚醒(満月脚II)、潜在覚醒(雷光弾I)、潜在覚醒(流星落下I)

第3エンチャント(第2スロット：精錬値10以上)
覇王、暴走した魔力、大鷲の眼光、豪傑、真理の解放、死の欲動
```

いくつかのエンチャントは card.dat.js に定義済みなので cardId を参照するだけで良い
```
[659,99,"SpecialStr","",1,1,8000001,3,9000080,1,0],
[599,99,"SpecialAgi","",2,1,8000002,3,9000080,1,0],
[660,99,"SpecialVit","",3,1,8000003,3,9000016,1,0],
[661,99,"SpecialInt","",4,1,8000004,3,9000089,1,0],
[662,99,"SpecialDex","",5,1,8000005,3,9000089,1,0],
[663,99,"SpecialLuk","",6,1,8000006,3,9000015,1,0],
[1297,99,"覇王","物理攻撃命中時、一定確率で5秒間、Str+200、モンスター「ランデル=ロレンス」(パラディン)に変身。",0],
[888,99,"暴走した魔力","魔法攻撃命中時、一定確率で10秒間、[暴走した魔力]発動<BR>[暴走した魔力]発動時、Int + 200、1秒毎にSP - 200",0],
[1303,99,"大鷲の眼光","物理攻撃命中時、一定確率で5秒間、[大鷲の眼光]発動<BR>[大鷲の眼光]発動時、Dex + 200、1秒毎にSP - 50",0],
[1348,99,"豪傑","物理攻撃命中時、一定確率で10秒間、完全回避+100、物理攻撃時、ボスモンスターに与えるダメージ+100%。",0],
[1245,99,"真理の解放","魔法攻撃命中時、一定確率で10秒間、完全回避+100、魔法攻撃時、ボスモンスターに与えるダメージ+100%、モンスター「カトリーヌ=ケイロン」(ハイウィザード)に変身。",0],
[1450,99,"死の欲動","物理攻撃命中時、一定確率で10秒間、Flee+150、スキルディレイ-100%、モンスター「エレメス=ガイル」(アサシンクロス)に変身。",0],
```

問題となるのはアウェイキングブルームで新規追加された潜在覚醒エンチャント

公式情報より
```
-----------------
潜在覚醒(ジュデックスII)
-----------------
BaseLvが2上がる度に追加で[ジュデックス]で与えるダメージ + 1%
―――――――――――――
[真理の解放]と共に装備時、追加で[ジュデックス]使用時、一定確率で自分にオートスペル[セイフティウォール]Lv3発動
[セイフティウォール]の習得Lvが4以上の場合、習得Lvで発動
```

ここで同様の効果を持つロイヤルクレリックスタッフのアイテム定義は以下の通りである
```
[
    4303,
    9,
    148,
    60,
    2474,
    1,
    30,
    185,
    "ロイヤルクレリックスタッフ","ロイヤルクレリツクスタツフ","精錬値が1上がる度に追加で、一部のダメージを反射する効果で受けるダメージ - 10%(計算機未対応)",
    88,180,
    194,1,
    20000007005478,1,
    20000009005476,1,
    0
],
```

20000009005476,1 が「精錬値9以上のときBaseLvが2上がる度にジュデックスのダメージ+1%」だと推察できるので
card.dat.js に以下のような新たなエンチャントを定義する

```
[2743,99,"潜在覚醒(ジュデックスII)","",20000000005476,1,0],
```

これにより mig.enchlist.dat.js に追加する定義は以下の通りとなる
```
[
    620,-1,0,0,
    [["スペシャルエンチャント（キョウ）","C3y4C2h1I3A4J5D2h1J5D5B2h3A3"]],
    [],
    [[
        [174,[50,[4994]]],,
        [
            [
                [178,[27,[4]]],,
                [[
                    [187,[59,6],[60,4]],
                    ,
                    [[[186,[51,[659,599,660,661,662,663,2743]]],,[]]]
                ]]
            ],
            [
                [178,[27,[3]]],,
                [[
                    [187,[59,8],[60,4]],
                    ,
                    [[[186,[51,[659,599,660,661,662,663,2743]]],,[]]]
                ]]
            ],
            [
                [178,[27,[2]]],,
                [[
                    [187,[59,10],[60,4]],
                    ,
                    [[[186,[51,[1297,888,1303,1348,1245,1450]]],,[]]]
                ]]
            ]
        ]
    ]],
    []
],
```

# 解析メモ

## equip.js -> OnChangeEquip(eqpRgnId, itemId)

RebuildCardSelect(eqpRgnId, itemId) でアイテムごとに異なるエンチャントがセットされる
その後 SetCardSlotEnability() でエンチャントの中身をチェックして、表示すべき情報が存在しなければ非表示にする

## hmcard.js -> RebuildCardSelect(eqpRgnId, itemId)

例えば itemId = 4992 を渡すと次の処理は enchListIdArray = [617] を返す
```
var enchListDataManager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
var enchListIdArray = enchListDataManager.GetEnchListIdArrayByItemId(itemId);
```

その後 enchListId = 617 を渡すと次の処理は 617 を主キーとした 3 つのエンチャリストを返す
```
enchInfoArrayAllSlots = RebuildCardSelectSubCollectEnchListData(enchListId, enchInfoArrayAllSlotsResult);
```

例えば 暴走魔力（精錬値10以上）は次の配列で定義される
```
[617, 888, [10, 4], 277]
```

解析によると
```
617 = 主キー
888 = 暴走魔力
10, 4 = 精錬値10以上
```
を示している

## card.dat.js

エンチャントのマスタは card.dat.js で定義されている

```
[
    888,                                                                                                　# 主キー
    99,                                                                                                   # 1～7 はカード部位, 99 はエンチャント, 100 は装備固有の効果
    "暴走した魔力",                                                                                        # 名称テキスト
    "魔法攻撃命中時、一定確率で10秒間、[暴走した魔力]発動<BR>[暴走した魔力]発動時、Int + 200、1秒毎にSP - 200",  # 効果テキスト
    0
],

[
    2311,
    99,
    "異境の統轄者","",
    17,50,              # ATK +50
    100,50,             # Matk +50
    0
],
```

## item.dat.js

装備のマスタは item.dat.js で定義されている

セット効果には個別のアイテムIDが割り当てられており、条件を満たしたときにセット効果が適用される
例えば itemID = 4992 セトの恩寵には異境のセット効果で固定詠唱-70%が付くがこれは itemID = 4993 である

```
[
    4992,           # itemID = 4992
    60,             # 60 = 鎧
    0,              # 0 = 誰でも装備可能 
    150,            # DEF = 150
    0,              # 武器レベル？防具は０？
    1,              # Slot = 1
    100,            # 重量 = 100
    90,             # Lv制限 = 90
    "セトの恩寵","セトノオンチヨウ","",
    19,15,          # MDEF = 15
    194,1,          # 損傷しない
    12,10,          # ASPD +10%
    30,40,          # 無形物理 +40%
    37,40,          # 人間物理 +40%
    272,40,         # ドラム物理 + 40%
    47,40,          # 闇属性物理 + 40%
    40,40,          # 無属性物理 + 40%
    170,40,         # 無形魔法 +40%
    177,40,         # 人間魔法 +40%
    273,40,         # ドラム魔法 + 40%
    357,40,         # 闇属性魔法 + 40%
    350,40,         # 無属性魔法 + 40%
    100066,2,       # 精錬1あたり聖属性耐性 +2%
    5000018,300,    # 精錬5のときDEF +300
    5000019,30,     # 精錬5のときMDEF +30
    5000243,7,      # 精錬7のときP耐 +7%
    7000074,15,     # 精錬7のときディレイ -15%
    0
],

[
    4993,                   # itemID = 4993
    100,                    # 100 = 装備固有の効果
    0,0,0,0,0,0,0,0,
    "固定詠唱時間 - 70%",
    0
],
```

武器もデータ構造は同じ
基本ステータスにATKを持っていて、MATKは追加ステータスとして持たせている

```
		[
            546,    # アイテムID
            16,     # 種別 16 = 手裏剣
            58,     # 58 = 忍者系
            185,    # ATK = 185
            4,      # 武器レベル = 4
            0,      # SLOT ?
            150,    # 重量 = 150
            55,     # 要求Lv = 55
            "風魔手裏剣・烈火",
            "フウマシユリケンレツカ",
            "0",
            20,     # 四属性付与
            3,      # 1 = 水、2 =土、3 = 火、 4 = 風
            5,      # DEX加算
            -2,     # -2
            221,    # 
            14,     # 
            0
        ],

```
```
		[
            541,    # アイテムID
            1,      # 種別 1 = 短剣
            58,     # 58 = 忍者系
            95,     # ATK
            2,      # 武器レベル 2
            21,     # SLOT 2 or 1
            70,     # 重量 70
            24,     # 要求Lv 24
            "村雨",
            "ムラサメ",
            "0",
            20,     # 属性？
            1,      # 水？
            88,     # Matk加算
            121,    # 121
            117,    # 近接物理攻撃時、人間型モンスターにCri加算
            10,     # 10
            0
        ],
```

## itemset.dat.js

セット効果のリレーションは itemset.dat.js で定義されている

```
[
    4993,   # セット効果の itemID
    4992,   # セット効果のベースになる itemID
    -2311   # セット効果のトリガーになる itemID を負数で指定する
],
```

## foot.js

純粋なステータスが上がる度に発動する効果はここに書かれていると思われる

	// 純粋なステータスが上がる度に条件を取得
	spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
	if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
		spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 10);
	}
	else if (7 == spDefPureStatusBy) {
		spValPureStatus = pureStatusValue[PARAM_DEX];
	}
	else if (8 == spDefPureStatusBy) {
		spValPureStatus = pureStatusValue[PARAM_VIT];
	}
	spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;

例えばExtraInt系のcardIDは以下の通り

	[1859,99,"ExtraStr","",100000080,1,25000000080,5,0],
	[1860,99,"ExtraAgi","",200000086,1,26000000086,5,0],
	[1861,99,"ExtraVit","",300000092,1,27000000092,5,0],
	[1862,99,"ExtraInt","",400000089,1,28000000089,5,0],
	[1863,99,"ExtraDex","",500000025,1,29000000025,5,0],
	[1864,99,"ExtraLuk","",600000070,1,30000000070,5,0],

純粋なIntが10上がる度に追加で魔法攻撃で与えるダメージ + 1%
純粋なIntが110以上の時、追加で魔法攻撃で与えるダメージ + 5%

なのでこのように読み取れる

    0       # BaseLv 0 毎に発動する
    00      # 不明
    00      #
    4       # 純粋なInt(4)が10上がる度に発動する
    00      # 精錬値 0 以上で発動する
    0       # 精錬値 0 毎に発動する
    00      # スキルの威力増加フラグはなし
    089     # スキルID 89 = 魔法ダメージUp


    0       # BaseLv 0 毎に発動する
    00      # 不明
    28      # 純粋なInt(28)が110以上のときに発動する
    0       # 純粋なステータスが上がる度に発動する効果なし
    00      # 精錬値条件なし
    0       # 精錬値条件なし
    00      # スキル威力増加フラグなし
    089     # スキルID 89 = 魔法ダメージUp

純粋なステータス x が n 以上の時に発動する効果は 110 のみ定義されている？
なぜなら Str > 100 で効果が発動する　拳闘士のグローブ　は foot.js で個別定義されているため

## item.h.js

EnumItemSpId に純粋なステータス毎に発動する効果フラグが定義されている
start = 100000000, offset = 100000000 

		"ITEM_SP_PURE_STR_BY_10_OFFSET",    // 
		"ITEM_SP_PURE_AGI_BY_10_OFFSET",
		"ITEM_SP_PURE_VIT_BY_10_OFFSET",
		"ITEM_SP_PURE_INT_BY_10_OFFSET",
		"ITEM_SP_PURE_DEX_BY_10_OFFSET",
		"ITEM_SP_PURE_LUK_BY_10_OFFSET",

		"ITEM_SP_PURE_DEX_BY_1_OFFSET",
		"ITEM_SP_PURE_VIT_BY_1_OFFSET",

アイテム能力フラグは全てここに書かれていそう
例えば EnumItemSpId に詠唱短縮効果も定義されている

	[
		"ITEM_SP_SKILL_DAMAGE_OFFSET",      // 05000 指定スキルのダメージの割合増加
		"ITEM_SP_SKILL_CAST_TIME_OFFSET",   // 07000 指定スキルの変動詠唱の割合減少
		"ITEM_SP_SKILL_CAST_MINUS_OFFSET",  // 09000 指定スキルの変動詠唱の減算
		"ITEM_SP_SKILL_FIXED_TIME_OFFSET",  // 11000 指定スキルの固定詠唱の割合減少
		"ITEM_SP_SKILL_FIXED_MINUS_OFFSET", // 13000 指定スキルの固定詠唱の減算
		"ITEM_SP_RESERVED_15000",			// 未使用（15000）
		"ITEM_SP_RESERVED_17000",			// 未使用（17000）
		"ITEM_SP_SKILL_COOL_MINUS_OFFSET",  // 19000 指定スキルのクールタイムの減算
		"ITEM_SP_SKILL_COST_SCALING_OFFSET",// 21000 指定スキルの消費SPの加算
		"ITEM_SP_SKILL_COST_MINUS_OFFSET",  // 23000 指定スキルの消費SPの減算
	],
	5000,
	2000

インペリアル系によくある別のセット効果を打ち消すフラグもある

		"ITEM_SP_INVALIDATE_ITEM_SP",		// 指定アイテムの効果無効
		"ITEM_SP_INVALIDATE_CARD_SP",		// 指定カードの効果無効 

