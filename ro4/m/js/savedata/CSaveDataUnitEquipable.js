/**
 * 「武器＆防具/カード」情報クラス
 */
class CSaveDataUnitEquipable extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 803;
    }

    /**
     * バージョン番号.
     */
    static get version () {
        return 3;
    }

    // parse 関数で参照するためのアイテムID変換テーブル
    // 負荷軽減のため必要ないときは null のまま扱う
    static deprecatedItemIdChangeArray = null;

    // オーバーライドされた parse 関数
    parse (dataText, bitOffset) {
        let nextOffset = super.parse(dataText, bitOffset);	// version を識別するために一旦 parse する

        // version 3 でカードIDの長さが 12bit から 13bit へ拡張されている
        // version 2 以前のデータを読み込む際はカードIDの長さを 12bit へダウングレードする
        if (this.getProp("version") <= 2n) {
            const candidate = [
                CSaveDataConst.propNameCardID1,
                CSaveDataConst.propNameCardID2,
                CSaveDataConst.propNameCardID3,
                CSaveDataConst.propNameCardID4,];
            candidate.forEach(property => {
                this.propInfoMap.delete(property);
                this.propInfoMap.set(property, new CSaveDataPropInfo(property, 12));
            });
            this.parsedMap.clear();
            nextOffset = super.parse(dataText, bitOffset);
        }

        if (this.getProp("version") == 1n) {	// version 1 のセーブデータを version 2 以上のプロパティ定義で読み込むとデータが壊れるので差分修正する
            this.propInfoMap.delete(CSaveDataConst.propNameParseCtrlFlag);	// version 1 → version 2 で parse するプロパティ数が 1 増えているので parse 処理対象数 (ParseCtrlFlag) を一旦消す
            let prop = new CSaveDataPropInfo(CSaveDataConst.propNameParseCtrlFlag, 20); // 処理対象数を 21 → 20 に減らしてから...
            this.propInfoMap.set(CSaveDataConst.propNameParseCtrlFlag, prop);	// ...セットし直す
            this.parsedMap.clear();	// ここまでに parse された結果を破棄する
            nextOffset = super.parse(dataText, bitOffset);	// 処理対象数が 1 減った状態で parse し直せば、プロパティ末尾に追加された propNameTranscendenceCount を無視して parse 処理が正常に終了する
            // --- ↓ 廃止アイテムデータの置換処理 ↓ ---
            if (CSaveDataUnitEquipable.deprecatedItemIdChangeArray == null) {
                // 将来的に version 3 以上で別のアイテムID変換テーブルが必要になった場合は null 判定だけでは誤処理の原因になるので注意
                // version 1 セーブデータを読み込んだ後に、スーパーロードせず別の version 2 セーブデータを読み込む場合など
                CSaveDataUnitEquipable.deprecatedItemIdChangeArray = new Array(5070).fill(0);
                CSaveDataUnitEquipable.deprecatedItemIdChangeArray.push(
                    4954,	// 5070 -> グレイシアソード
                    4955,	// 5071 -> グレイシアスピア
                    4956,	// 5072 -> グレイシアアックス
                    4957,	// 5073 -> グレイシアワンド
                    4958,	// 5074 -> グレイシアカタール
                    4959,	// 5075 -> グレイシアナイフ
                    4960,	// 5076 -> グレイシアナックル
                    4961,	// 5077 -> グレイシアメイス
                    4962,	// 5078 -> グレイシアボウ
                    4963,	// 5079 -> グレイシアウィップ
                    4964,	// 5080 -> グレイシアバイオリン
                    4965,	// 5081 -> グレイシアブック
                    5010,	// 5082 -> グレイシア風魔手裏剣
                    5012,	// 5083 -> グレイシアハンドガン
                    5014,	// 5084 -> グレイシアベーシックソード
                    5016,	// 5085 -> グレイシアフォックステイル
                );
                CSaveDataUnitEquipable.deprecatedItemIdChangeArray.push(...(new Array(21).fill(0))); // 21 = 5107 - 5085 - 1
                CSaveDataUnitEquipable.deprecatedItemIdChangeArray.push(
                    4734,	// 5107 -> ウィワートゥス・フィデス・カタール
                    4737,	// 5108 -> ウィワートゥス・フィデス・アックス
                    4740,	// 5109 -> ウィワートゥス・フィデス・レイピア
                    4743,	// 5110 -> ウィワートゥス・フィデス・ワンド
                    4746,	// 5111 -> ウィワートゥス・フィデス・ガーディアンスピア
                    4749,	// 5112 -> ウィワートゥス・フィデス・バイオリン
                    4752,	// 5113 -> ウィワートゥス・フィデス・ナックル
                    4755,	// 5114 -> ウィワートゥス・フィデス・マジックブック
                    4758,	// 5115 -> ウィワートゥス・フィデス・チェインロープ
                    4761,	// 5116 -> ウィワートゥス・フィデス・クロスボウ
                    4764,	// 5117 -> ウィワートゥス・フィデス・バリスタ
                    4767,	// 5118 -> ウィワートゥス・フィデス・ツーハンドスタッフ
                    4770,	// 5119 -> ウィワートゥス・フィデス・ランス
                    5024,	// 5120 -> ウィワートゥス・フィデス・スターダストブック
                    5027,	// 5121 -> ウィワートゥス・フィデス・ソウルスティック
                    5052,	// 5122 -> ウィワートゥス・フィデス・フォックステイル
                    5055,	// 5123 -> ウィワートゥス・フィデス・ライフル
                    5095,	// 5124 -> ウィワートゥス・フィデス・メイス
                    5098,	// 5125 -> ウィワートゥス・フィデス・ダガー
                    4300,	// 5126 -> ガーディアンナイツクレイモア
                    4301,	// 5127 -> ガーディアンナイツスピア
                    4302,	// 5128 -> ガーディアンナイツアックス
                    4303,	// 5129 -> ロイヤルクレリックスタッフ
                    4304,	// 5130 -> ロイヤルマジシャンワンド
                    4305,	// 5131 -> ロイヤルフォックステイル
                    4306,	// 5132 -> ロイヤルカタール
                    4307,	// 5133 -> ロイヤルマジシャンダガー
                    4308,	// 5134 -> ロイヤルナックル
                    4309,	// 5135 -> ガーディアンアルケミックスタッフ
                    4310,	// 5136 -> ガーディアンナイツアーチャーボウ
                    4311,	// 5137 -> ロイヤルウィップ
                    4312,	// 5138 -> ロイヤルチェロ
                    4313,	// 5139 -> ロイヤルセージブック
                    4047,	// 5140 -> 白の騎士団の猫じゃらし
                    4431,	// 5141 -> アンティークガトリングガン
                    4614,	// 5142 -> トートの書
                    4534,	// 5143 -> 輝く白銀の槍
                    4654,	// 5144 -> トライアングルディザスター
                    4251,	// 5145 -> 朽ちたガーデンナイフ
                    4450,	// 5146 -> 魔導師の記憶
                    4456,	// 5147 -> 六韜三略
                    3120,	// 5148 -> ガーデンオブエデン
                    3431,	// 5149 -> 剛勇無双の紋帽子
                    3765,	// 5150 -> ファントムオブマスカレード
                    4103,	// 5151 -> ゲートオブネザーワールド
                    4358,	// 5152 -> 魔狩りの靴
                    2936,	// 5153 -> カーリッツバーグ騎士団の鎧
                    3273,	// 5154 -> グレータードラクルホーン
                    3606,	// 5155 -> 白の騎士団の鎧
                    3965,	// 5156 -> パナギアの贈り物
                    4231,	// 5157 -> フェアリーオブエデン
                    3734,	// 5158 -> アルジャンブランコ
                    3723,	// 5159 -> クリムゾンローズスティック
                    3717,	// 5160 -> エイミングボウ
                    3741,	// 5161 -> エンジンパイルバンカー
                    3712,	// 5162 -> リッパークロス
                    3709,	// 5163 -> 崇拝の杖
                    3736,	// 5164 -> フォートレイジ
                    3724,	// 5165 -> サイキックスピアロッド
                    3737,	// 5166 -> ブラックサークル
                    3727,	// 5167 -> ハートウィップ
                    3743,	// 5168 -> ジーンロッド
                    3715,	// 5169 -> ラピッドファイア
                    3745,	// 5170 -> 光耀錘
                );
            }
            let oldItemID = this.parsedMap.get(CSaveDataConst.propNameItemID);
            if (oldItemID <= 5170) {
                let newItemID = toSafeBigInt(CSaveDataUnitEquipable.deprecatedItemIdChangeArray[oldItemID]);
                if (newItemID != 0n) {
                    this.parsedMap.set(CSaveDataConst.propNameItemID, newItemID);		// 廃止された超越アイテムを置き換え
                    this.parsedMap.set(CSaveDataConst.propNameTranscendenceCount, 1);	// 超越段階を 0 → 1 へ変更
                }
            }
        } // --- ↑ 廃止アイテムデータの置換処理 ↑ ---
        return nextOffset;
    }

    /**
     * 処理順に並んだプロパティ名（自身のプロパティのみ）.
     */
    static get #propNamesSelf () {
        return [
            CSaveDataConst.propNameEquipItemDefID,
            CSaveDataConst.propNameOptCode,
            CSaveDataConst.propNameParseCtrlFlag,
            CSaveDataConst.propNameItemID,
            CSaveDataConst.propNameRefinedCount,
            CSaveDataConst.propNameCardCategoryID1,
            CSaveDataConst.propNameCardID1,
            CSaveDataConst.propNameCardCategoryID2,
            CSaveDataConst.propNameCardID2,
            CSaveDataConst.propNameCardCategoryID3,
            CSaveDataConst.propNameCardID3,
            CSaveDataConst.propNameCardCategoryID4,
            CSaveDataConst.propNameCardID4,
            CSaveDataConst.propNameRndOptID1,
            CSaveDataConst.propNameRndOptValue1,
            CSaveDataConst.propNameRndOptID2,
            CSaveDataConst.propNameRndOptValue2,
            CSaveDataConst.propNameRndOptID3,
            CSaveDataConst.propNameRndOptValue3,
            CSaveDataConst.propNameRndOptID4,
            CSaveDataConst.propNameRndOptValue4,
            CSaveDataConst.propNameRndOptID5,
            CSaveDataConst.propNameRndOptValue5,
            CSaveDataConst.propNameTranscendenceCount,	// version 2 で追加
        ];
    }

    /**
     * 処理順に並んだプロパティ名（継承プロパティ含む）.
     */
    static get propNames () {
        return super.propNames.concat(this.#propNamesSelf);
    }

    /**
     * コンストラクタ.
     */
    constructor () {
        super();
        // プロパティ定義情報の登録
        this.registerPropInfo(CSaveDataConst.propNameEquipItemDefID, 6);
        this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 21); // version 1 = 20 > version 2 = 21
        this.registerPropInfo(CSaveDataConst.propNameItemID, 14);
        this.registerPropInfo(CSaveDataConst.propNameRefinedCount, 4);
        this.registerPropInfo(CSaveDataConst.propNameCardCategoryID1, 10);
        this.registerPropInfo(CSaveDataConst.propNameCardID1, 13);
        this.registerPropInfo(CSaveDataConst.propNameCardCategoryID2, 10);
        this.registerPropInfo(CSaveDataConst.propNameCardID2, 13);
        this.registerPropInfo(CSaveDataConst.propNameCardCategoryID3, 10);
        this.registerPropInfo(CSaveDataConst.propNameCardID3, 13);
        this.registerPropInfo(CSaveDataConst.propNameCardCategoryID4, 10);
        this.registerPropInfo(CSaveDataConst.propNameCardID4, 13);
        this.registerPropInfo(CSaveDataConst.propNameRndOptID1, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptValue1, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptID2, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptValue2, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptID3, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptValue3, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptID4, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptValue4, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptID5, 9);
        this.registerPropInfo(CSaveDataConst.propNameRndOptValue5, 9);
        this.registerPropInfo(CSaveDataConst.propNameTranscendenceCount, 3);	// version 2 で追加
    }

    /**
     * データのコンパクション（不要データの削除）を行う.
     * （継承先でオーバーライドして個別の処理を追加する）
     */
    doCompaction () {
        // 共用のフラグ処理を利用
        this.doCompaction_ModifyFlagGT0();
    }

    /**
     * ユニットのデータが空であるかを判定する.
     * （継承先でオーバーライドして個別の処理を追加する）
     * @returns {boolean} true:空である、false:空でない
     */
    isEmptyUnit () {
        // 共用の判定処理を利用
        return this.isEmptyUnit_CtrlFlag0();
    }

    /**
     * オーバーライドされたメソッド
     * 旧形式のデータとして与えられる args を当ユニットのプロパティに合わせて
     * 新形式の文字列表現セーブデータ(dataTextWork)として出力する
     * このメソッドは「新形式セーブ時」と「旧形式ロード時」のそれぞれから呼び出される
     */
    convertFromOldFormat (dataTextWork, bitOffset, ...args) {
        // 受け取った残余引数の前に、タイプ値とバージョン番号を追加する
        const argsMerged = [this.constructor.type, this.constructor.version].concat(args);
        // 処理するプロパティの配列を取得
        const propNames = this.constructor.propNames;
        // すべてのプロパティを処理する
        for (let idx = 0; idx < propNames.length; idx++) {
            // 情報取得
            const propName = propNames[idx];
            const propInfo = this.propInfoMap.get(propName);
            let propBits = propInfo.bits;
            let propValue = argsMerged[idx];
            /**
             * 後方互換性確保
             */
            if (idx == 25) {
                break;	// version 1 時点で存在した上位 25 個の処理が完了したら終了する
            }
            const candidate = [
                CSaveDataConst.propNameCardID1,
                CSaveDataConst.propNameCardID2,
                CSaveDataConst.propNameCardID3,
                CSaveDataConst.propNameCardID4,];
            if (candidate.includes(propName)) {
                propBits = 12;  // 旧形式のセーブデータのカードID長さは 12bit なので揃える
            }
            if (propName == CSaveDataConst.propNameVersion) {
                propValue = 1;	// 旧形式のセーブデータは必ず version 1 未満なので 1 に揃える
            }
            if (propName == CSaveDataConst.propNameParseCtrlFlag) {
                propBits = 20;	// 旧形式のセーブデータのプロパティ数は 20 なので揃える
            }
            // クエリ文字列に追記する
            dataTextWork = this.appendToDataText(dataTextWork, bitOffset, propValue, propBits);
            // ビットオフセットを更新
            bitOffset += propBits;
        }
        // データユニットが中途半端なところで終わらないようパディングする
        bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
        return [dataTextWork, bitOffset];
    }

    /**
     * オーバーライドされたメソッド
     * インスタンスを新形式のセーブデータ文字列に変換する
     * このメソッドはセーブ時のみ呼び出される
     */
    encodeToURL (dataTextWork, bitOffset) {
        // バージョンを修正
        this.parsedMap.set(CSaveDataConst.propNameVersion, this.constructor.version);
        // コントロールフラグを修正
        const prop = new CSaveDataPropInfo(CSaveDataConst.propNameParseCtrlFlag, this.propInfoMap.size - 5);	// ヘッダ長 5
        this.propInfoMap.delete(CSaveDataConst.propNameParseCtrlFlag);
        this.propInfoMap.set(CSaveDataConst.propNameParseCtrlFlag, prop);
        return super.encodeToURL(dataTextWork, bitOffset);
    }

}