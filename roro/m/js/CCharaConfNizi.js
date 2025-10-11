function CCharaConfNizi(confArray) {
	// 継承定義
	CCharaConfNizi.prototype = new CConfBase();
	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);
	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 50;
	// 設定欄の横方向項目数
	this.itemInRow = 3;
	// 設定欄のラベル
	this.confLabel = "二次職支援設定";

	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {
		let confId = 0;
		let confData = new Array();

		// 基底クラスのセットアップ処理を実行
		CCharaConfNizi.prototype.InitData.call(this);

		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VOLCANO = 0;
		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_DELUGE = 1;
		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VIOLENT_GALE = 2;

		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI = confId;	// 0
		confData = [
			confId,
			CConfBase.ConfText("属性場　種類"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(2)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL = confId;	// 1
		confData = [
			confId,
			CConfBase.ConfText("属性場　レベル"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER = confId;	// 2
		confData = [
			confId,
			CConfBase.ConfText("支援マインドブレイカー"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SEITAI_KOFUKU = confId;	// 3
		confData = [
			confId,
			CConfBase.ConfText("聖体降福"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_KAITO = confId;	// 4
		confData = [
			confId,
			CConfBase.ConfText("カイト(敵ATK 5倍)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(7)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS = confId;	// 5
		confData = [
			confId,
			CConfBase.ConfText("イムポシティオマヌス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SUFFRAGIUM = confId;	// 6
		confData = [
			confId,
			CConfBase.ConfText("サフラギウム"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(3)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_GLORIA = confId;	// 7
		confData = [
			confId,
			CConfBase.ConfText("グロリア"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ASSUMPTIO = confId;	// 8
		confData = [
			confId,
			CConfBase.ConfText("アスムプティオ"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ADRENALINE_RUSH = confId;	// 9
		confData = [
			confId,
			CConfBase.ConfText("アドレナリンラッシュ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(3)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_WEAPON_PERFECTION = confId;	// 10
		confData = [
			confId,
			CConfBase.ConfText("ウェポンパーフェクション"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_OVER_TRUST = confId;	// 11
		confData = [
			confId,
			CConfBase.ConfText("オーバートラスト"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_WIND_WALK = confId;	// 12
		confData = [
			confId,
			CConfBase.ConfText("ウィンドウォーク"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_KIKO = confId;	// 13
		confData = [
			confId,
			CConfBase.ConfText("気功"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_PROVIDENCE = confId;	// 14
		confData = [
			confId,
			CConfBase.ConfText("プロヴィデンス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_CONCENTRATION = confId;	// 15
		confData = [
			confId,
			CConfBase.ConfText("コンセントレイション"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_TRUE_SIGHT = confId;	// 16
		confData = [
			confId,
			CConfBase.ConfText("トゥルーサイト"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU = confId;	// 17
		confData = [
			confId,
			CConfBase.ConfText("魔法力増幅"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_DEFENDER = confId;	// 18
		confData = [
			confId,
			CConfBase.ConfText("ディフェンダー"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_AUTO_GUARD = confId;	// 19
		confData = [
			confId,
			CConfBase.ConfText("オートガード"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_CLOSE_CONFINE = confId;	// 20
		confData = [
			confId,
			CConfBase.ConfText("クローズコンファイン"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_AURA_BLADE = confId;	// 21
		confData = [
			confId,
			CConfBase.ConfText("オーラブレイド"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_KONGO = confId;	// 22
		confData = [
			confId,
			CConfBase.ConfText("金剛"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_MAXIMIZE_POWER = confId;	// 23
		confData = [
			confId,
			CConfBase.ConfText("マキシマイズパワー"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_FORTUNEKISS = confId;	// 24
		confData = [
			confId,
			CConfBase.ConfText("幸運のキス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"サービスフォーユー・ハミング・私を忘れないで…とは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_HUMMING = confId;	// 25
		confData = [
			confId,
			CConfBase.ConfText("ハミング"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"幸運のキス・サービスフォーユー・私を忘れないで…とは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SERVICEFORYOU = confId;	// 26
		confData = [
			confId,
			CConfBase.ConfText("サービスフォーユー"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"幸運のキス・ハミング・私を忘れないで…とは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_WHISTLE = confId;	// 27
		confData = [
			confId,
			CConfBase.ConfText("口笛"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"イドゥンの林檎・ブラギの詩・夕陽のアサシンクロスとは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ASSASSINCROSS = confId;	// 28
		confData = [
			confId,
			CConfBase.ConfText("夕陽のアサシンクロス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"イドゥンの林檎・口笛・ブラギの詩とは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_POEMBRAGI = confId;	// 29
		confData = [
			confId,
			CConfBase.ConfText("ブラギの詩"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"イドゥンの林檎・口笛・夕陽のアサシンクロスとは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_APPLEIDUN = confId;	// 30
		confData = [
			confId,
			CConfBase.ConfText("イドゥンの林檎"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10),
			"口笛・ブラギの詩・夕陽のアサシンクロスとは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SIEGFRIED = confId;	// 31
		confData = [
			confId,
			CConfBase.ConfText("不死身のジークフリード"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5),
			"戦太鼓の響き・永遠の混沌・深淵の中に・ニヨルドの宴・ニーベルングの指輪・ロキの叫びとは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_DRUMBATTLEFIELD = confId;	// 32
		confData = [
			confId,
			CConfBase.ConfText("戦太鼓の響き"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5),
			"永遠の混沌・深淵の中に・ニヨルドの宴・ニーベルングの指輪・不死身のジークフリード・ロキの叫びとは共存できません"
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_DUMMY = confId;
		confData = [
			confId,
			CConfBase.ConfText("-"),
			CConfBase.ConfControlType(CONTROL_TYPE_DUMMY),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(0)
		];
		this.confDataObj[confId] = confData;
		confId++;
		
		//----------------------------------------------------------------
		// データ定義数チェック
		//----------------------------------------------------------------
		if (this.confCountLimit < this.confDataObj.length) {
			alert("二次職支援設定　定義数超過");
			return;
		}

		//----------------------------------------------------------------
		// 支援設定変数配列を初期化
		//----------------------------------------------------------------
		for (let idx = 0; idx < this.confCountLimit; idx++) {
			if (this.confDataObj[idx] !== undefined) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			} else {
				this.confArray[idx] = 0;
			}
		}

		//----------------------------------------------------------------
		// 表示順序に従い、二次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		const displayOrder = [
			CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS,
			CCharaConfNizi.CONF_ID_SUFFRAGIUM,
			CCharaConfNizi.CONF_ID_GLORIA,
			CCharaConfNizi.CONF_ID_SEITAI_KOFUKU,
			CCharaConfNizi.CONF_ID_ASSUMPTIO,
			CCharaConfNizi.CONF_ID_ADRENALINE_RUSH,
			CCharaConfNizi.CONF_ID_OVER_TRUST,
			CCharaConfNizi.CONF_ID_WEAPON_PERFECTION,
			CCharaConfNizi.CONF_ID_MAXIMIZE_POWER,
			CCharaConfNizi.CONF_ID_KIKO,
			CCharaConfNizi.CONF_ID_KONGO,
			CCharaConfNizi.CONF_ID_DEFENDER,
			CCharaConfNizi.CONF_ID_AUTO_GUARD,
			CCharaConfNizi.CONF_ID_PROVIDENCE,
			CCharaConfNizi.CONF_ID_CLOSE_CONFINE,
			CCharaConfNizi.CONF_ID_AURA_BLADE,
			CCharaConfNizi.CONF_ID_CONCENTRATION,
			CCharaConfNizi.CONF_ID_WIND_WALK,
			CCharaConfNizi.CONF_ID_TRUE_SIGHT,
			CCharaConfNizi.CONF_ID_KAITO,
			CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU,
			CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI,
			CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL,
			CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER,
			CCharaConfNizi.CONF_ID_FORTUNEKISS,
			CCharaConfNizi.CONF_ID_HUMMING,
			CCharaConfNizi.CONF_ID_SERVICEFORYOU,
			CCharaConfNizi.CONF_ID_WHISTLE,
			CCharaConfNizi.CONF_ID_ASSASSINCROSS,
			CCharaConfNizi.CONF_ID_POEMBRAGI,
			CCharaConfNizi.CONF_ID_APPLEIDUN,
			CCharaConfNizi.CONF_ID_SIEGFRIED,
			CCharaConfNizi.CONF_ID_DRUMBATTLEFIELD,
		];
		this.confDataObj = displayOrder.map(id => this.confDataObj[id]);
	}

	/**
	 * 設定欄テーブルを構築する（サブ　特殊欄構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubForSpecial = function (objTd, confData) {
	    let objSelect = null;
		let objOption = null;
		let confId = confData[CConfBase.CONF_DATA_INDEX_ID];
		let controlId = this.GetControlIdString(this.instanceNo, confId);
		// 個別に実装する
		switch (confId) {
			// 属性場　種類
			case CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI:
				// 選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", controlId);
				objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
				objTd.appendChild(objSelect);
				// セレクトオプションを生成
				objOption = HtmlCreateElementOption(0, "火", objSelect);
				objOption = HtmlCreateElementOption(1, "水", objSelect);
				objOption = HtmlCreateElementOption(2, "風", objSelect);
				// 初期値設定
				objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

				// RTX API用の属性追加
				if (this.dataRtxAttributeIdPrefix !== null) {
					objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
					objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
				}
				break;

			// アドレナリンラッシュ
			case CCharaConfNizi.CONF_ID_ADRENALINE_RUSH:
				// 選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", controlId);
				objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
				objTd.appendChild(objSelect);
				// セレクトオプションを生成
				objOption = HtmlCreateElementOption(0, "OFF", objSelect);
				objOption = HtmlCreateElementOption(1, "通常AR", objSelect);
				objOption = HtmlCreateElementOption(2, "フルAR", objSelect);
				objOption = HtmlCreateElementOption(3, "ｽｸﾛｰﾙ", objSelect);
				// 初期値設定
				objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

				// RTX API用の属性追加
				if (this.dataRtxAttributeIdPrefix !== null) {
					objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
					objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
				}
				break;

			// 金剛
			case CCharaConfNizi.CONF_ID_KONGO:
				// 選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", controlId);
				objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
				objTd.appendChild(objSelect);
				// セレクトオプションを生成
				objOption = HtmlCreateElementOption(0, "OFF", objSelect);
				objOption = HtmlCreateElementOption(1, "ON", objSelect);
				// 初期値設定
				objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);
	
				// RTX API用の属性追加
				if (this.dataRtxAttributeIdPrefix !== null) {
					objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
					objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
				}
				break;
		}
	}

	// 初期化実行
	this.InitData();
}