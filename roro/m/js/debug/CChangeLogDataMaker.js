
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();





/**
 * 更新履歴コメントクラス.
 */
function CChangeLogComment () {

	/** 更新履歴コメントＩＤ. */
	this.id = 0;

	/** 更新履歴コメント種類. */
	this.kind = 0;

	/** 更新履歴コメント配列. */
	this.comments = [];



	/**
	 * 更新履歴コメントＩＤを設定する.
	 * @param id 更新履歴データＩＤ
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetId = function (id) {
		this.id = id;
		return this;
	};

	/**
	 * 更新履歴コメント種類を設定する.
	 * @param kind 更新履歴データ種類
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetKind = function (kind) {
		this.kind = kind;
		return this;
	};

	/**
	 * 更新履歴コメントを追加する.
	 * @param comment 更新履歴コメント
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.AddComment = function (comment) {
		this.comments.push(comment);
		return this;
	};



	/**
	 * datデータに変換する.
	 * @return datデータ
	 */
	this.ToDat = function () {

		var dat = new Array();

		// 各データを配列に変換
		dat.push(this.id);
		dat.push(this.kind);
		dat.push(this.comments);

		return dat;
	};
}



/**
 * 更新履歴ユニットクラス.
 */
function CChangeLogUnit () {

	/** 更新履歴ユニットＩＤ. */
	this.id = 0;

	/** 更新履歴日付. */
	this.logdate = 0;

	/** 更新履歴コメントリスト. */
	this.commentlist = [];



	/**
	 * 更新履歴ユニットＩＤを設定する.
	 * @param id 更新履歴ユニットＩＤ
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetId = function (id) {
		this.id = id;
		return this;
	};

	/**
	 * 更新履歴日付を設定する.
	 * @param logdate 更新履歴日付
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetLogDate = function (logyear, logmonth, logday) {
		this.logdate = new Date(logyear, logmonth - 1, logday);
		return this;
	};

	/**
	 * 更新履歴コメントを追加する.
	 * @param logcomment 更新履歴コメント
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.AddLogComment = function (logcomment) {
		this.commentlist.push(logcomment);
		return this;
	};



	/**
	 * datデータに変換する.
	 * @return datデータ
	 */
	this.ToDat = function () {

		var idx = 0;

		var dat = new Array();
		var cmtIdArray = new Array();

		// 各データを配列に変換
		dat.push(this.id);
		dat.push(this.logdate.getTime());

		// コメントはデータではなくＩＤで出力
		for (idx = 0; idx < this.commentlist.length; idx++) {
			cmtIdArray.push(this.commentlist[idx].id);
		}

		dat.push(cmtIdArray);

		return dat;
	};
}


/**
 * 更新履歴データ作成クラス.
 */
function CChangeLogDataMaker () {

}





/**
 * データ定義を上書き定義する.
 */
CChangeLogDataMaker.OverrideData = function () {

	var idx = 0;

	var id = 0;
	var commentId = 0;

	// コメント配列
	var commentArray = new Array();
	var commentDat = new Array();

	// データ配列
	var dataArray = new Array();
	var dataDat = new Array();

	// コメント登録関数
	var funcRegisterComment = function (logcomment) {
		commentArray.push(logcomment);
		return logcomment;
	};



	// 共用コメント
	var cmtNotice2020051401 = funcRegisterComment(
		new CChangeLogComment()
			.SetId(commentId++)
			.SetKind(CHANGE_LOG_KIND_NOTICE)
			.AddComment("計算機が更新されたタイミングで、計算機が正常に動かなくなった場合、")
			.AddComment("キャッシュ（ファイル）のクリアや、ハード再読み込みを行うことで")
			.AddComment("正常に動作するようになる場合がありますので、お試しください。")
			.AddComment("方法")
			.AddComment("　１）正常に動作しないブラウザで、計算機のページを開く。")
			.AddComment("　２）Ctrl + Shift + R キーを押す。（同時押し）")
			.AddComment("　　　（Microsoft Edge、Firefox、Chrome では確認しています）")
			.AddComment("　　　（Opera は Ctrl + R、Internet Explorer は Ctrl + F5 らしいです）")
	);




	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 4, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("貴族の仮面")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ヴァルキリーハンマー")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("レクイエム装備シリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("古びた装備シリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("精鋭守護騎士の指輪")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("生体工学研究所アップデート　パラメータ変更適用")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("生体工学研究所アップデート　戦死者の墓モンスター追加")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 4, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１５年１１月くじ対応")
						.AddComment("※エナジーエンチャントは未対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("[LoVA]コラボイベント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１５年アニバーサリーくじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１５年アニバーサリーパッケージ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("[LoVA]シリーズ１０種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("レクイエム武器の効果が、戦死者の墓のモンスターに適用されなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 4, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年１月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年２月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年３月くじ対応")
						.AddComment("※エナジーエンチャントは未対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年４月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("ホラーおもちゃ工場シリーズ８種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エクセリオン追加エンチャント１０種")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 4, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("RJCネックレス(2015)")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("レクイエム武器の魔法ダメージ上昇効果が、正しく適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 4, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年５月くじ対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応開始（途中）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応開始（途中）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年６月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アルクイエンのネックレスを装備した際、スキルの威力上昇値が誤っていた点を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("リベリオンがバーサークポーションを通常使用できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("背景色をより白に近い黄色へ変更。")
						.AddComment("（白にすると本家と見間違える可能性があるための措置）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応開始（途中）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("グロリアスイヤリング")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("グロリアスブローチ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("堕天使の翼")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("リベリオンの弾丸装備が、ＵＲＬセーブできなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ドゥクス・ティアのティアラの、消費ＳＰ減少効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エクセリオンレッグのエクセリオンエンチャントにおいて、")
						.AddComment("一部の＋６精錬、＋８精錬のボーナスが適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("古びたエンチャントに対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 24)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応開始（途中）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("テレポートピアス")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ヒールピアス")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("射向の大袖")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("月の眼帯")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("おしゃべりオウム")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("パワード装備")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ガーディアン装備")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の防具において、ＭＤＥＦの増加が適用されていなかった問題を修正。")
						.AddComment("レクイエムシールド")
						.AddComment("執行者のマント")
						.AddComment("ポロロッカシューズ")
						.AddComment("カルデュイの法衣")
						.AddComment("タナトスの悲しみ仮面")
						.AddComment("与一の肩掛け")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("大型オークヒーローの兜、大型マジェスティックゴートのエンチャントに対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("エナジーエンチャントに対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応開始（途中）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("リベリオンスキル「プラチナアルター」のＡＴＫ増加効果が、")
						.AddComment("特定の弾丸以外でも効果を発揮していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("朧のジョブ補正を更新。（確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("朧のLv161以降の最大SPを更新。（確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("属性場の属性ダメージ上昇効果の仕様変更（RR化）に対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応開始（途中）")
						.AddComment("　ＨＰを更新。（ほぼ確定？）")
						.AddComment("　ＳＰを更新。（ほぼ確定？）")
						.AddComment("　ジョブ補正を更新。（確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「テンペスト」のＡＴＫが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「スクトゥム」の精錬による完全回避の上昇量が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("影狼のジョブ補正を更新。（確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("英雄エンチャントに対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応更新（ほぼ完了）")
						.AddComment("　マススパイラルのダメージを更新。（ほぼ確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("疾風迅雷シリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("天地無双シリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("朧のＨＰを更新。（ほぼ確定？）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応更新（途中）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("バイオプロテクター")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("深淵の回廊に出現するMVPを除くモンスター")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ヒートバレル」の、ＨＩＴ減少効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「イクシオンの羽[3]」のマランエンチャントが、スロット２個になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の装備の詠唱時間短縮効果が、正しく適用されていなかった問題を修正。")
						.AddComment("ヴァルキリーハンマー")
						.AddComment("サラのローブセット")
						.AddComment("おしゃべりオウム")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応更新（途中）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("深淵の回廊関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「グランドクロス」に、エンチャントデッドリーポイズンの効果が乗らない問題に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「リベリオン」を選択した状態で、拡張表示の「経験値」を選択すると、")
						.AddComment("計算機の動作がおかしくなる問題に対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応更新（ほぼ完了）")
						.AddComment("　各スキルの詠唱時間、ディレイ、クールタイムを更新。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の武器のマランエンチャントが、スロット２個になっていた問題を修正。")
						.AddComment("風魔手裏剣・炎月")
						.AddComment("風魔手裏剣・氷月")
						.AddComment("風魔手裏剣・雷月")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「フライング」が、BOSS属性モンスターにも適用されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 5, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("リベリオン対応更新（ほぼ完了）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("アヴェンジャーシリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("たれリベリオン")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「スラッグショット」が遠距離スキルになっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「アヴェンジャーウィザードスタッフ」の更新漏れを修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「イクシオンの羽[1]」の武器レベルが誤っていた点を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「イクシオンの羽[1]」において、防具「楽園の鳥かご」とのセット効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("英雄マント")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("マジカルリング")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("サマーパッケージ２０１６")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「アヴェンジャージャマダハル」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「レクイエムダガー」の装備制限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マッドハッター」の闇属性耐性が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マッドハッター」の状態異常耐性が適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("飛行船シリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ペルロックシリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ペルロックの帽子")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("エクスプロージョンガム")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("皇竜の天翼")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("リベリオンの所持限界量を更新。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("覇者の思念")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("『セーブデータの保存数』を保存したにも関わらず、")
						.AddComment("ページを開きなおすと、デフォルトの保存数に戻ってしまう問題に対応。")
						.AddComment("（たぶん、直っていると思いますが、まだ問題があるようでしたらお知らせ下さい）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("スマートフォンから利用する場合は、クッキーを有効にする設定をお試しください。")
						.AddComment("それでも利用できない場合、申し訳ありませんがサポート対象外とさせていただきます。")
						.AddComment("（管理人がスマートフォンを持っておらず、対応できないためです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の武器において、人間形モンスターへのダメージ増加量が誤っていた問題を修正。")
						.AddComment("アヴェンジャーライフル")
						.AddComment("アヴェンジャーガトリングガン")
						.AddComment("アヴェンジャーショットガン")
						.AddComment("アヴェンジャーグレネードガン")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マジカルリング」を２個装備した際、２個目の効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("忍者のＨＰを更新。（ほぼ確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("SaveボタンとLoadボタンの間隔を調整。")
						.AddComment("（使いにくいようでしたらお知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「リス耳フード帽」の説明文が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「スラッグショット」の威力が、対プレイヤーでも２倍になっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「サバイバルオーブ」と武器「サバイバルロッド」とを装備した際、")
						.AddComment("武器の精錬値が10未満の場合にも、セット効果が適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("防具「エスランのシャツ」の説明文の体裁を調整。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("スキル「クイックドローショット」のヒット数が、ジョブレベルに応じて変化する点に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("リベリオンの「パッシブ持続系スキル」に、クイックドローショットの追撃欄を追加。")
						.AddComment("（当該スキルをonにすると、通常攻撃じに全てのチェーンアクションで追撃を行う計算をします）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータの一覧で、特殊効果を表示できない場合がある問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深遠の回廊")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("深遠の回廊")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「根付いた天下大将軍」のサイズが誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年７月くじ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「布都御魂」のクールタイム減少効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「黄泉返し」のクールタイムが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("計算機のセーブ削除ボタンがリンク切れになっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("モンスターの状態異常に「烙印状態」を追加。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ユニコーンの兜」のアイテム説明が表示できない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("マラン島猫武器各種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ヴァルキリーナイフ」を両手に装備した際、特殊効果が適用されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ローラカード」を複数装着した際、特殊効果が適用されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「S-Matk」のＭＡＴＫ増加が、杖型になっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「魔法石の恩恵」を装備した際、消費ＳＰの増加が適用されない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 6, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("瑞々しいだいだい")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("シュタール・フォン・カイザー６１世")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("バフ「支援ファイティングスピリット」の効果が適用されなくなっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「シャドウリング」の「トライアングルショット強化」の追加効果が、")
						.AddComment("シャドウリングを装備していないと適用されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「シャドウリング」を複数個装備した際、トライアングルショットの強化効果が")
						.AddComment("重複してかかってしまう問題を修正。")
						.AddComment("（強化効果はバフとしてかかるため、複数個装備しても効果は増加しないようです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("魔呪装備を仮登録")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ガーディアンユニット」のエンチャントに、「名弓１」が無かった点を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("バフ「インスピレーション」使用時に、ＨＰの表示がおかしくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター状態異常欄等を展開した際に、表示の体裁が崩れる問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("遠距離攻撃の武器を装備した際、ＡＴＫの計算がおかしくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("モンスター状態異常「ストリップアクセサリー」に対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("オートスペルの設定を２０個に拡張（仮）。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("オートスペルの設定について、ＵＲＬセーブに対応（仮）。")
						.AddComment("（かなり改造しているので、バグ等に気づいたらお知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ソーサラーの精霊スキルを使用すると、計算機が動作しなくなる問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「与一の肩掛け」において、＋９精錬時にＡＳＰＤが上昇しない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃手段として、装備固有のスキルを選んだ状態でセーブした場合、")
						.AddComment("セーブしたデータのロードが正常に行われない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("FireFox から利用した際、計算機が使用できない場合がある問題を修正。（仮対応）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("魔呪装備の性能を確定。")
						.AddComment("（違ったらご連絡ください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年８月くじ対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("超時空エンチャント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("プロンテラ軍エンチャント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("マヌクエンチャント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("マランエンチャント追加対応")
						.AddComment("※アイオーンスタッフを除く。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 20)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("ＧＨＭＤ（ハード）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("マヌクエンチャントの第一段階に、大聖堂が漏れていた点を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「Special XXX」系の効果が、正しく反映されない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 7, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("水天一碧装備対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("ＧＨＭＤハード対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「炎竜の鎧」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「プロテクトフェザー　羽のベレーセット」について、")
						.AddComment("参照する精錬値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ポロロッカシューズ」の習得スキル設定について、")
						.AddComment("一部表示に誤りがあった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 8, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「スーパーノービス」の最大ジョブレベルが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「○○の時空ブーツ[1]」において、防具「巨人蛇の皮」とのセット効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「長司祭の指輪　大司教２セット」において、ハイネスヒールの再使用待機時間短縮効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「プレイヤー（防御側）」を選択した状態で、「対人プレイヤー」設定を行うと")
						.AddComment("計算機の動作が停止する場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("特定のセーブＵＲＬを読み込んだ場合、データが正常に表示されない場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("二刀流で左手に属性武器を装備した際、ダメージ表示がおかしくなる問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 8, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「一碧シリーズ」の属性が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「潜龍昇天」のＳＰ増加率が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 8, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年９月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("スキル習得時に効果を発揮する一部の装備について、設定方法が変わりました。")
						.AddComment("従来のカード欄での設定は廃止になり、『習得スキル（装備効果用）』欄での設定になります。")
						.AddComment("お手数ですが、手動にて再設定をお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 9, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ロキのアサシンマスク")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備「ルドのロールペーパー」の職業制限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備「一碧杖」の過剰精錬効果が適用されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「シャープシューティング」において、遠距離攻撃時クリティカル率アップの効果が")
						.AddComment("適用されないように修正。（乗らないそうです）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("支援「戦太鼓の響き」のＡＴＫ増加効果が適用されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("弓、楽器、鞭を装備できる職業で武器の種類を変更した際、")
						.AddComment("素手以外が選択できない状態になる場合がある問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 9, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ＥＣＯ×ＲＯ　コラボ２関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("ＥＣＯ×ＲＯ　コラボ２関連")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 9, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エナジーエンチャント第２弾")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「一碧杖」の特殊効果が、同武器ではなく「無双杖」に適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ヴァルキリーナイフ」を左手に装備した際、クリティカル攻撃のダメージアップ効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「[ECO] ミニー・ドゥ・アルマ」の効果が、ヒール使用時ではなく、")
						.AddComment("ヒールを受けた時になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「[ECO] モーモー・アルマ」の効果が、正しく適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("スキル「シャープシューティング」において、遠距離攻撃時クリティカル率アップの効果が")
						.AddComment("適用されるように修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 9, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年１０月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「メイルブレイカー」のアイテム説明文が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 10, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("２０１６年９月２０日の経験値変更に対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年１１月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("パイルバンカーシリーズ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("オートスペル「スパイラルピアース」を設定した際に、計算結果が異常となる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("背景色をグレーに変更。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("プロンテラ地下監獄関連（ＭＶＰを除く）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("プロンテラ地下監獄関連（ＭＶＰ）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("プロンテラ地下監獄関連（防具のみ）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("プロンテラ地下監獄関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("ニーヴエンチャント対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("プロンテラ地下監獄関連（武器）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("ランダムエンチャントは未対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("ランダムエンチャントに仮対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年アニバくじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("カタリナ・フォン・ブラッド60世")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("口笛")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("バレルヘルム")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「アインヘリヤルの鎧」の過剰精錬によるボーナス効果が、")
						.AddComment("誤った精錬値で適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「レクイエムウィザードスタッフ」の過剰精錬によるＭＤＥＦ無視効果が、")
						.AddComment("特定の精錬値でのみしか適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ヴァルキリーナイフ」をハンター系が装備した際、")
						.AddComment("消費ＳＰ軽減効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「テグリョン」の＋９過剰精錬による消費ＳＰ軽減効果が適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ひまわり少年」のＭＡＴＫが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「超越者のローブ」に暴走した魔力が付けられなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ダークハンド」のスロット数が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「リンドブルムの皮」の過剰精錬によるボーナス効果が、")
						.AddComment("誤った精錬値で適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備「大型オークヒーローの兜　勇者セット」を装備した際に、")
						.AddComment("オートスペルの簡易設定が適切に設定されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備「大型マジェスティックゴート　魔羊セット」を装備した際に、")
						.AddComment("オートスペルの簡易設定が適切に設定されなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「達人の剣」のスロット数が１のみになっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「スラッグショット」が最終無属性になっていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("特定条件下で、オートスペル系の発動率が100%を超えてしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("詠唱・ディレイ表示欄に、装備効果による増減表示を追加。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年アニバイベント関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("２０１６年アニバイベント関連")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 11, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１６年アニバパッケ関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ヴァルゴ」「レオ」を頭中段に装備した際、参照する精錬値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ヴァルゴ」において、ＳＰ回復力の上昇効果が適用されない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 12, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「勇者の靴」の装備レベル制限が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2016, 12, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７年１月くじ対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 1, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("生体獄関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「黄泉返し」が遠距離攻撃スキルになっていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「怨恨の白の騎士」の説明文の誤記を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「ハワード=アルトアイゼン（獄・強）」の属性が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の両手杖武器のASPD計算が、片手杖武器の計算になっていた問題を修正。")
						.AddComment("レクイエムウィザードスタッフ")
						.AddComment("アヴェンジャーウィザードスタッフ")
						.AddComment("邪念のスタッフ")
						.AddComment("ひまわり少年")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 1, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("怨嗟の腕輪")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７年２月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("ウェルス関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「テグリョン」の＋９精錬時の追加効果が、正常に反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「アヴェンジャージャマダハル」の＋９精錬時に発動する追加効果が、")
						.AddComment("暫定追加機能欄になかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("アコライト系以外でも、ヒール回復量表示をレベル１０まで対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("戦闘結果の詠唱時間欄に、固定詠唱と変動詠唱の詳細表示を追加。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 1, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「魔術師のグローブ」のＭＤＥＦ無視効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「T_W_O」のＭＤＥＦ無視効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「DR815」の詠唱時間短縮効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のＭＤＥＦ無視効果の計算が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 2, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『カーサへのダメージが、計算機の半分しか与えられない』")
						.AddComment("　→カーサは常時ディフェンダーＬｖ３状態かと思われます。")
						.AddComment("　　そのため、遠距離攻撃は半分のダメージになります。")
						.AddComment("　　モンスター強化欄でディフェンダーを３にしてお試しください。")
						.AddComment("　　（現地でも、湧き直後のカーサであれば、ディフェンダーなしのダメージがでると思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『○○のモンスターデータがない』")
						.AddComment("　→モンスターデータが公表されていないため、対応できません。")
						.AddComment("　　モンスターデータをご連絡いただければ、随時対応していきます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("二刀流の左手にレクイエム装備を装備した際に、特殊効果が正しく反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("習得スキルの「インティミデイト」において、レベルが10まで選択できる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("装備「ギガントセット」を装備した際に、ジョイントビートに始まるコンボ攻撃について、")
						.AddComment("コンボダメージを計算できる選択肢を追加。")
						.AddComment("（計算に誤りがあるようならお知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("拡張表示－状態異常を更新。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("攻撃手段を選択する欄（アクティブスキルを選択する欄）を改造しました。")
						.AddComment("もし、表示や動作がおかしい点がありましたら、お知らせください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 2, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『ソニックウェーブのディレイ１秒が適用されていない』")
						.AddComment("　→ディレイよりもクールタイムが長いため、クールタイムの２秒のみを表示しています。")
						.AddComment("　　なお、コンボによる発動の場合は、状況が複雑すぎるため、計算機では対応できません。")
						.AddComment("　　ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード効果によるオートスペルが、正常に反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("支援デリュージのＨＰ増加効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("エンチャント「勇者の怒り」によるオートスペル効果に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("エンチャント「魔羊の咆哮」によるオートスペル効果に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("オートスペル設定の項目欄を、名称順にソート。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("習得スキル設定がされているセーブデータを読み込んだ際、背景色が変わるように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("アイテムデータ一覧にＳＴＲペナルティの表示列を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("拡張表示に、物理特化、魔法特化の情報を追加。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 2, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ディーヴァ装備")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("夢幻の迷宮")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("二刀流で左手に短剣を選択した際、盾のエンチャント欄が残ってしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拡張表示の物理特化、および魔法特化において、一部の情報が反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("ランダムエンチャントに正式対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("確殺/経験値効率ランキング計算機能を更新。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("URL入力機能を追加。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 2, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『ディーヴァ装備で、カードの効果が適用されない』")
						.AddComment("　→今一度、敵の属性、種族、サイズ、BOSS属性等をご確認ください。")
						.AddComment("　　特に、生体工学研究所のモンスターは、（強）とついているものがBOSS属性となります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『装備を変更すると、スキルの拡張選択欄がデフォルトに戻ってしまう』")
						.AddComment("　→ご不便をかけて申し訳ありませんが、現状は仕様となります。")
						.AddComment("　　（今後の機能拡張等で改良できるようなら、対応していきたいと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ミラージュ装備")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("矢・弾丸を装備した状態において、計算結果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("2017年02月21日のモンスター配置変更に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("深淵の回廊のＭＶＰボス情報を仮登録。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 2, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７年３月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("シャドウチェイサーが、「ディーヴァアックス」「ミラージュアックス」を")
						.AddComment("装備できてしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("リベリオンが、「エーギルヘルム」を装備できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("ランダムエンチャントに、「DEF無視」、「MDEF無視」、「一般モンスター特化」を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("ランダムエンチャントの効果値選択を、105 まで拡張。")
						.AddComment("（あまり増やすと重くなります。ご容赦ください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 2, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("たれチュウニペンギン")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ディーヴァバイオリン」、「ディーヴァブレイドウィップ」、")
						.AddComment("「ミラージュバイオリン」、「ミラージュブレイドウィップ」について、")
						.AddComment("過剰精錬時の特殊効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「時空マント」のセット効果が、一部反映されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「時空マント」のセット対象が、一部漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マラクの皮」の＋８精錬時の効果が、精錬値にかかわらず適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マラクの皮」の特殊効果が、一部誤って計算されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 3, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『シャドウチェイサーのオートシャドウスペルが計算されない』")
						.AddComment("　→今一度、武器をご確認ください。")
						.AddComment("　　弓やミラージュ武器などの遠距離攻撃では、オートシャドウスペルは発動しません。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『オートスペルが計算されない』")
						.AddComment("　→今一度、オートスペルの設定をご確認ください。")
						.AddComment("　　レベル不定のオートスペルでは、発動率だけでなく、発動レベルも指定する必要があります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『MDEFの右側がマイナスになる』")
						.AddComment("　→今一度、支援等の設定をご確認ください。")
						.AddComment("　　オーディンの力などを使用すると、MDEFにペナルティが発生します。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『セーブデータに名前がつけられない』")
						.AddComment("　→避難所Ｑ＆Ａをご覧ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マラクの皮」の＋７、＋９精錬時の効果が、適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("特性「ボス属性のMDEF○○％無視」の効果が、二重に適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("忍者のみが装備できる装備が、表示されなくなっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「鋭利5」の効果が一部誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("装備を変更した際に、スキルの補助選択欄が初期化されないように変更。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 3, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７年４月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「アインヘリヤルの鎧　戦死者のマントセット」の効果が、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「セリーヌのブローチ」のセット効果が、一部適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("獄エンチャントに対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 4, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("オートスペル設定で「ヴェラチュールスピアー」、または「アースグレイヴ」を設定した際に、")
						.AddComment("計算機の動作が止まってしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「与一の肩掛け」を装備していない状態でも、習得スキルの影響を受けてしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ランダムエンチャントの効果が集中力向上の計算式に含まれないよう修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「執行者のシューズ」の物理攻撃で与えるダメージ増加効果について、")
						.AddComment("ATK+○○の装備効果が含まれないように修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 4, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のステータスが上昇する装備で、効果が二重に適用されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 5, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７年５月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のガンスリンガー専用装備が、選択欄に現れない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 6, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("百火猟乱装備対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７年６月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「悪魔崇拝者の靴」のMDEFが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「聖なる白衣」のMDEFが設定されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 6, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　サマーパッケージ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("２０１７年５月ＭＡＰ調整対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("深淵の回廊２０１７　モンスター対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「巨人の加護」のSTR120時のボーナスが適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「巨人の加護　ギガントボウセット」のSTRボーナスが適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 7, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊２０１７対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　７月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("エンジェリングスーツ追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ゴーストリングスーツ追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("深淵の回廊２０１７対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「聖体降福」「パイエティ」使用時に、キャラの属性が正しく反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("シャドウチェイサーの攻撃方法に、「メタリックサウンド」がない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「フンケ・リヒテルン」装備時に、＋９精錬の効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「オープンエアヘッドフォン」の消費SP現象効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「ウィッシュ＝マスコット」、「アーティス＝マスコット」が、")
						.AddComment("ＭＶＰ一覧に表示されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ランダムエンチャントの効果に、下記を追加。")
						.AddComment("遠距離攻撃ダメージＵＰ")
						.AddComment("遠距離耐性")
						.AddComment("ヒール回復量")
						.AddComment("ヒール被回復量")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『モンスター「堕ちたオークヒーロー」などのステータスが変わっている』")
						.AddComment("　→公式ＨＰに掲載された正確なステータスを適用しています。")
						.AddComment("　　これまでが間違っていたとお考えください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 7, 24)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　８月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「マススパイラル」において、ＤＥＦ無視効果のあるアイテムを装備した際、")
						.AddComment("威力が実際の値よりも低くなる問題に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("レベル上限開放にほんのり対応しました。")
						.AddComment("が、ＨＰ、ＳＰ、獲得ステータスポイントの情報はＬｖ１６５のものを適用しています。")
						.AddComment("実際の動作とは異なるはずですので、シミュレートの際はご注意ください。")
						.AddComment("（情報は常時受付中ですので、投稿フォームからお知らせいただけると幸いです）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("モンスターデータが公開されましたが、計算機への対応は余裕のある時となります。")
						.AddComment("少しずつ更新していく予定ですので、気長にお待ちいただけると幸いです。")
						.AddComment("（大きくズレているものがあれば優先的に対応しますので、ご報告ください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 7, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「マスカレードエナベーション」の誤記を訂正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「降霊術士の外套」の過剰精錬による効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("モンスター手入力欄の上限を開放。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("テラグローリア関連")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("テラグローリア関連（武器のみ）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("テラグローリア関連（防具）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エンチャント「強撃」対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("テラグローリア関連")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「名誉のニーヴ(集中)」の過剰精錬時の効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「リベリオン」のLv136～Lv165のＳＰが実測と異なっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「金剛石の靴」にMDEFが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("二刀流装備が行える職業において、特定の条件下で状態をセーブできない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("モンスターデータ最新化対応。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　９月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("２０１７年８月マップ調整対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("オートスペル「ヴェラチューススピアー」を設定すると、戦闘結果の出力がおかしくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("左手武器に属性武器を装備した際、属性が正しく反映されない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備効果「魔法攻撃でプレイヤーに与えるダメージ」がある装備を装備した際、")
						.AddComment("実際よりも大きなダメージが発生していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("アイテム「陣羽織」の三段掌、ＤＡ追加発動効果に対応しました。")
						.AddComment("結構プログラムを改造したので、動作が怪しいなどありましたら、お知らせください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 8, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("僕のドキドキ冒険記IV対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「猟乱弓」の説明文が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「猟乱銃」の説明文が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「幸福の盾」の過剰精錬による効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ガーディアンプロセッサ」のスロット表記が 1 になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「巨大樹の若葉」のセット効果で、詠唱時間の短縮効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ダブルアタック」が発動する装備において、スキルを習得していた際に、")
						.AddComment("発動率が正常に計算されない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 9, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("通常攻撃において、命中率の計算が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 9, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　１０月くじ対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 11, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊　ＳｅａｓｏｎⅡ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　１１月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("深淵の回廊　ＳｅａｓｏｎⅡ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("２０１７年１１月マップ調整　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「スナイピングベール」の並び順が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ゴッズガントレット」のＭＤＥＦ設定が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ソヒョンの羽衣　ソヒョンの小太刀」のセット効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ルドの黒い羽」「ソヒョンの羽衣」「魔呪のマント」のエンチャント効果のうち、")
						.AddComment("FLEE+10効果の設定が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「バニシングバスター」の固定詠唱時間が未設定だった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「エーギルリング　エーギルヘルム」のセット効果のうち、")
						.AddComment("ステータス上昇効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ヴェノムキメラカード」において、物理攻撃効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「抹消者のローブ」に「暴走した魔力」がエンチャントできなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ルドの黒い羽」のＡＳＰＤ＋１が設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「ソーサラー」のＬｖ１５２時点のＨＰが誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 11, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「サバイバルシューズ　サバイバルマント」のセット効果が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 11, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　アニバくじ対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2017, 12, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("ロックリッジ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　アニバパッケ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１７　アニバイベント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８　１月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「強化バンシーマスター」の経験値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「Y.S.F.0.1シリーズ」にエンチャントが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「禁忌の魔導書」にＭＤＥＦが設定されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 1, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("「神喰らいの龍槍」　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("「古代龍の宝冠」　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("「猛炎と白魔の指輪」　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ニーヴバレッタ　ニーヴ武器セット」の")
						.AddComment("詠唱時間短縮効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「スカラバハイヒール　ラフィネスタッフセット」の")
						.AddComment("詠唱時間短縮効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「サバイバルシューズ　サバイバルロッドセット」の")
						.AddComment("チェーンライトニング再使用待機時間減少効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「サジタリウス」のレンジャー装備時のＨＩＴ上昇効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「自警団のスーツ」のＭＡＴＫ上昇効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「フリオニウィング」のＨＰ上昇効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「エクセリオンシールド」のＭＤＥＦが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『ディーヴァ装備のボスモンスターに与えるダメージ増加はどの系統に該当するか』")
						.AddComment("　→ランダムエンチャントオプションのボスモンスター特化を計算するには、")
						.AddComment("　　計算機のどの項目を設定すればよいのか？　という質問として回答します。")
						.AddComment("　　１．ランダムエンチャントが可能な装備を装備します。（ディーヴァ武器など）")
						.AddComment("　　２．武器選択欄の上にある「入力欄切替」というボタンを押します。")
						.AddComment("　　３．「ランダムエンチャなし」という選択欄がありますので、希望の効果を選択します。")
						.AddComment("　　４．その横の数値選択欄で、効果の量を選択します。")
						.AddComment("　　なお、『ボスモンスターへのダメージ＋○○％』については、")
						.AddComment("　　『物理UP―敵級(ボス)』または『魔法UP―敵級(ボス)』を選択してください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『計算上では種族3枚より深淵3枚の方が弱い事例が起こる』")
						.AddComment("　→計算機のURLをいただけておらず詳細は推察になってしまいますが、")
						.AddComment("　　他の装備でボス特化の効果が高い場合、そのような現象が起きると思います。")
						.AddComment("　　例えば、武器以外の装備で、ボス特化が100%、種族特化が0%だとします。")
						.AddComment("　　特化率は、(1.00 + 1.00) × (1.00 + 0.00) = 2.00です。")
						.AddComment("　　この状態で、深淵カードを3枚さすと、ボス特化175%、種族特化0%です。")
						.AddComment("　　特化率は、(1.00 + 1.75) × (1.00 + 0.00) = 2.75です。")
						.AddComment("　　元の特化率より、2.75 ÷ 2.00 = 1.375 となり、37.5% 強くなりました。")
						.AddComment("　　一方で、種族3枚をさすと、 ボス特化100%、種族特化60%です。")
						.AddComment("　　特化率は、(1.00 + 1.00) × (1.00 + 0.60) = 3.20です。")
						.AddComment("　　元の特化率より、3.20 ÷ 2.00 = 1.60 となり、60% 強くなりました。")
						.AddComment("　　このように、他の装備での特化率によっては、種族カードの方が強いことはあり得ます。")
						.AddComment("　　（まったく違う現象をお知らせいただいている場合は、詳細を再度ご連絡願います）")
						.AddComment("　　（その際は、URL出力結果のURLも併せてお知らせいただけると幸いです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 3, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８　２月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８　３月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加対応")
						.AddComment("※これに伴い、防具「マジカルフェザー」のスキル習得レベルの設定方法が、")
						.AddComment("　エンチャント欄から習得スキル欄に変更となりました。")
						.AddComment("　お手数ですが、設定されていた方は、再設定をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("英雄の痕跡＆悪夢のジターバグ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("フルスロットル対応")
						.AddComment("※効果は素ステータスの２０％分、補正値が付くものとして扱っています。")
						.AddComment("　現在の計算機では「端数切捨て」で処理していますが、誤差があればお知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「古代龍の宝冠」の+10精錬時の効果が、精錬値に関係なく適用されていた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「猛炎と白魔の指輪」のスキルディレイ短縮効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「レーザーオブイーグル」の変身時に発動するトゥルーサイトの効果で、")
						.AddComment("ステータス補正値とダメージ加算値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「くわえたイチゴ」のダメージ反射効果が計算されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「エクセリオンシールド」に、エンチャント「Ｃ－ＨＰＲ」または「Ｃ－ＳＰＲ」を")
						.AddComment("装備した際、過剰精錬によるボーナスが適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「悪魔崇拝者の靴」とエンチャント「暴走した魔力（未発動）」を装備した際、")
						.AddComment("ペナルティ効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『モンスターの状態でストーンスキンを有効にすると、MDEFが増加する』")
						.AddComment("　→従来からそういう仕様のようです。")
						.AddComment("　　ストーンスキン状態のモンスターは、MDEFは上がるが、別途魔法ダメージが")
						.AddComment("　　増加する状態となるようです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPECIFICATION)
						.AddComment("『ネクロマンサーにアドラムスを撃つと計算機よりダメージが高くなる』")
						.AddComment("　→ストーンスキンの影響と考えられます。")
						.AddComment("　　ネクロマンサーは、基本的に常時ストーンスキン状態を維持していると思われます。")
						.AddComment("　　ダメージを計算される際は、「モンスター状態強化」欄から、ストーンスキンを")
						.AddComment("　　設定してください。")
						.AddComment("　　なお、ストーンスキンのレベルは３ではないかと推測されます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 3, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「天狗の下駄」に、実際には存在しないＡＴＫ＋３０の効果が設定されていた問題を")
						.AddComment("修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ウェルスコア」に、実際には存在しない魔法ダメージ増加効果が設定されていた")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 3, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８　４月くじ対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「ロイヤルガード」において、新規にキャラを設定する際、")
						.AddComment("フルスロットルのレベル選択がおかしくなり、正常に動作しない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ディーヴァスタッフ」の基本ASPDが片手杖と同等になるように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ディーヴァワンド」、「ミラージュワンド」、「アヴェンジャーウィザード")
						.AddComment("スタッフ」が、スーパーノービスでも装備可能になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「野球帽」の重量が０になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「古びたルーンサークレット」において、＋１０精錬時の効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ローラのプレートメイル」において、物理ダメージ反射効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ヴァッサーリヒテルン」、「フェルスリヒテルン」、「ゲルブリヒテルン」に")
						.AddComment("おいて、＋９精錬時の効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ヴァッサーリヒテルン」、「フェルスリヒテルン」、「フンケリヒテルン」、")
						.AddComment("「ゲルブ・リヒテルン」において、頭中段に装備した際の効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ヘビィメタリン」を装備した際、スキル「カートレボリューション」のダメージが")
						.AddComment("ずれてしまう問題を修正。")
						.AddComment("（万が一、まだズレがあるようでしたらお知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「カルデュイの法衣　エンジェリングカードセット」において、")
						.AddComment("＋９精錬時の凍結耐性が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ペル＆キスミー・ペルカード　シンギング・ペル＆スイング・ペルカード」に")
						.AddComment("おいて、セット効果のHP増加効果がSP増加効果になってしまっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「マススパイラル」において、属性が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「メテオアサルト」において、マグナムブレイク状態が適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「霞切り」において、ディレイの変更に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「風魔手裏剣投げ」において、詠唱時間、ディレイの変更に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「デビルズフィンガーズ」に対して、一部のスキル攻撃でダメージが誤って")
						.AddComment("計算されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『風魔手裏剣-乱華-のダメージ計算で、属性を付与しても適用されない』")
						.AddComment("　→パッシブスキルの設定で、符の数を１０に設定されていないでしょうか？")
						.AddComment("　　現在の計算機では、属性付与よりも符の数が１０の際の属性変化を優先しています。")
						.AddComment("　　実際のゲームでの動作が異なるようでしたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『俊敏の時空ブーツに、攻撃速度＋８％をエンチャントできない』")
						.AddComment("　→俊敏の時空ブーツ[1]にエンチャント可能なのは、攻撃速度＋６％のみです。")
						.AddComment("　　俊敏の時空ブーツ[0]を選択して、設定してください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『反逆者のスカーフのオートスペルで発動するドラゴンテイルの威力が通常より高い』")
						.AddComment("　→オートスペル設定で、スキルのレベルを６以上に設定されていないでしょうか？")
						.AddComment("　　スキル「ドラゴンテイル」の最大レベルは５ですので、５以下に設定してください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『反逆者のスカーフを装備すると、攻撃方法欄などにドラゴンテイルが２個出る』")
						.AddComment("　→反逆者のスカーフを２個装備されていないでしょうか？")
						.AddComment("　　現在の計算機では、複数個の装備を行うと、重複して表示されるようになっています。")
						.AddComment("　　修正は不可能ではありませんが、プログラムの都合上、現在は仕様です。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応開始")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「マススパイラル」において、属性相性の計算が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ドラゴンテイル」、「スラッグショット」、「ハンマーオブゴッド」において、")
						.AddComment("属性相性の計算が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("以下の装備について、装備職業制限を修正。")
						.AddComment("（もし、実際の装備制限と異なっているものがありましたら、お知らせください）")
						.AddComment("ロッド")
						.AddComment("ワンド")
						.AddComment("迅雷杖")
						.AddComment("無双杖")
						.AddComment("一碧杖")
						.AddComment("猟乱杖")
						.AddComment("邪念のスタッフ")
						.AddComment("邪念のロッド")
						.AddComment("ディーヴァスタッフ")
						.AddComment("ミラージュスタッフ")
						.AddComment("退魔神の杖")
						.AddComment("猫両手杖・旗魚")
						.AddComment("レクイエムアークワンド")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ナハトズィーガー」の効果が、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「シンギング・ペル＆スイング・ペル」において、魔法攻撃で受けるダメージに")
						.AddComment("関する効果の増減値が正負逆転していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ペル＆キスミー・ペルカード　シンギング・ペル＆スイング・ペルカード」に")
						.AddComment("おいて、魔法攻撃で受けるダメージに関する効果の増減値が正負逆転していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("教範75のレベル制限を撤廃。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『おもちゃの指輪を装備しても、剣修練習得時の効果が発生しない』")
						.AddComment("　→「剣修練」スキルのレベルは、パッシブ持続系欄で設定をお願いいたします。")
						.AddComment("　　習得スキル欄で設定いただいても、プログラムの都合上、効果を発揮しません。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『レンジャーにおいて、クリティカル率が７０％から上がらない』")
						.AddComment("　→パッシブ持続系欄で「フィアーブリーズ」が選択されていないでしょうか？")
						.AddComment("　　現在は、フィアーブリーズの発動がクリティカルより優先される仕様になっています。")
						.AddComment("　　もし、実際のゲームでの動作が異なるようでしたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("新種族ドラムに関する事項は検証中です。")
						.AddComment("HP、SP、ジョブ補正、装備可能アイテム、スキル詳細など、未確定の情報が多いため、")
						.AddComment("シミュレートされる際は十分にご注意ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("HPSP計算式を更新。たぶん確定。")
						.AddComment("ジョブ補正を一部更新。")
						.AddComment("一部スキルの詠唱時間、クールタイムなどを更新。")
						.AddComment("スキル「キャロットビート」を遠距離スキルに修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『Firefox Quantumの59.0.2では計算機の方がうまく稼動しない』")
						.AddComment("　→恐れ入りますが、管理人の環境では正常に動作しているように見えます。")
						.AddComment("　　念のため、ＯＳのパッチ等もご確認ください。")
						.AddComment("　　（以前、ｉＰｈｏｎｅをご利用の方で、ＯＳを更新すると直った事例があります）")
						.AddComment("　　それでも現象が続く場合は、具体的に、何をどうしたら動かないなど")
						.AddComment("　　お知らせいただけると幸いです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("ジョブ補正を一部更新。（JobLv45まで）")
						.AddComment("一部スキルの詠唱時間、クールタイムなどを更新。")
						.AddComment("アニマル系の攻撃スキルすべてを遠距離スキルに修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ドラムパッチ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ブルート装備　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("ドラムパッチ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「サモナー」を選択した状態で、拡張表示の経験値表示を選択すると、")
						.AddComment("計算機の動作が停止してしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『サモナーのＡＳＰＤを確認しようとしたら、最終的にエラーになる』")
						.AddComment("　→恐れ入りますが、こちらでは状況を確認できませんでした。")
						.AddComment("　　なお、前述のとおり、経験値表示にバグがありましたので、")
						.AddComment("　　その関係であれば、今後は問題なく動作すると考えられます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("支援スキル効果を実装（一部、×印の付いたものは未実装）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ブルート風魔手裏剣」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「サモナー」において、一部の防具が装備できなかった問題を修正。")
						.AddComment("また、これに伴い、一部の杖の装備職業制限を修正。")
						.AddComment("（もし、実際の装備制限と異なっているものがありましたら、お知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("JOB補正を更新（JobLv50まで）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ディーヴァフォックステイル」、「ミラージュフォックステイル」において、")
						.AddComment("ランダムエンチャントが設定できない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("エビ三昧　効果実装")
						.AddComment("○○の魂　効果実装")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「トンボがとまった魔力の猫じゃらし」のＡＴＫ、ＭＡＴＫが誤っていた問題を")
						.AddComment("修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『マタタビランスの実測ダメージが、計算機と大きくずれる』")
						.AddComment("　→スキル「大地の力」を習得しており、かつ、プラント系スキルレベルの合計が")
						.AddComment("　　20以上あったりしませんでしょうか？")
						.AddComment("　　スキル「大地の力」には、プラント系スキルレベルの合計が20以上の場合に、")
						.AddComment("　　MATKが上昇する効果があります。")
						.AddComment("　　お手数ですが、パッシブ持続系欄の「プラント系習得レベル合計」を設定してください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「レクイエムアークワンド」が、選択できなくなっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「特選ウサギのお守り」の効果が、一部反映されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『ディーヴァマントなどのオプションで属性耐性が付くものはどこで設定したらいいでしょうか？』")
						.AddComment("　→まず、装備欄の上の方にある「入力欄切替」というボタンを押してください。")
						.AddComment("　　そうしますと、ランダムエンチャントを設定する画面に切り替わりますので、")
						.AddComment("　　ディーヴァマントなどのランダムエンチャント欄で、「耐性－属性攻撃」の項目を")
						.AddComment("　　選択してください。")
						.AddComment("　　その後、その選択欄の右側にある数値の選択欄で、耐性の値を15%なら15のように")
						.AddComment("　　選択してください。")
						.AddComment("　　これで、指定の属性に対して、15%の耐性が設定されるようになります。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("拡張表示「ヒール回復力」に、「新鮮なエビ」および「エビ三昧」を追加。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("所持限界量　対応")
						.AddComment("種族特性（完全回避1.2倍など）　対応")
						.AddComment("対プレイヤー設定　対応")
						.AddComment("（修正規模が大きいので、バグや誤差等がありましたら、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年５月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エクセリオンエンチャント　Ｚシリーズ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「霞切り」のディレイ方式を、特殊からモーションディレイに変更。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「トンボがとまった黄色い猫じゃらし」の、精錬値による効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「自警団の弓」において、反射効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「用心棒のスカーフ」の、「術式-解放-」スキル強化効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「古びたドライバーバンド」の、精錬による消費ＳＰ軽減効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「古びた守護の冠」の、＋10精錬による反射効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ローラのプレートメイル」の、過剰精錬による反射効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「自警団のスーツ」、「自警団のバッジ」において、反射効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部の装備セットにおいて、ステータス上昇効果が集中力向上などの計算値に含まれていた")
						.AddComment("問題を修正。")
						.AddComment("エスランのシャツ　ブリーフ　セット")
						.AddComment("長司祭の指輪　大司教１　セット")
						.AddComment("長司祭の指輪　大司教２　セット")
						.AddComment("長司祭の指輪　大聖堂１　セット")
						.AddComment("長司祭の指輪　治癒１　セット")
						.AddComment("サバイバルオーブ　サバイバルサークレット　セット")
						.AddComment("サバイバルオーブ　サバイバルシューズ　セット")
						.AddComment("ガーディアンプロセッサ　ガーディアンバレル　セット")
						.AddComment("レオダイアデム　レオ　セット")
						.AddComment("タウロスクラウン　タウロス　セット")
						.AddComment("ジェミニクラウン　ジェミニ　セット")
						.AddComment("エーギルリング　エーギルヘルム　セット")
						.AddComment("時魔術師の指輪　大鷲の眼光　セット")
						.AddComment("時魔術師の指輪　熊の力　セット")
						.AddComment("時魔術師の指輪　幸運な日　セット")
						.AddComment("時魔術師の指輪　暴走した魔力　セット")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『アサシン系が二刀流装備した場合、クリティカル攻撃のダメージに誤差がある』")
						.AddComment("　→こちらは、本家Roratorio様のころからの仕様となりますが、")
						.AddComment("　　クリティカルダメージの欄には、左手武器によるダメージは表示されないようです。")
						.AddComment("　　一方、秒間与ダメについては、左手ダメージも加味した「平均の」ダメージが計算される")
						.AddComment("　　仕様であるため、クリティカルダメージ欄の表示で手計算すると誤差が出ると思います。")
						.AddComment("　　なお、本件に関連して、実験的にアサシン系の二刀流時のクリティカルダメージ欄を")
						.AddComment("　　改造してみました。")
						.AddComment("　　使用感など、お気づきの点がありましたら、お知らせいただければ幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_ELSE)
						.AddComment("アサシン系が二刀流装備した場合の、クリティカルダメージ欄の表示を変更。")
						.AddComment("（使用感など、お気づきの点がありましたら、お知らせいただければ幸いです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("カボチャヘッド　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("カードデータ一覧で、全部位カード、エンチャントを検索可能に更新。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("戦闘結果欄に詠唱イメージ欄を追加。（テスト運用）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「トンボがとまった神妙な猫じゃらし」の、ＡＴＫ、ＭＡＴＫが誤っていた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("マップ「生体工学研究所」の出現モンスターに、「ウィッシュ＝マスコット」、")
						.AddComment("および「アーティス＝マスコット」が漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("マップ「過去の儀式の間」が漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「囚人○○」の出現マップを、「プロンテラ地下監獄」に修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アクティブスキルの限界攻撃間隔に関する説明ページが消えていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("シビアレインストームの特殊性についての説明ページが消えていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("イグニッションブレイクの特殊性についての説明ページが消えていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ペオース　アルティメットセット」の効果のうち、一定確率でディレイが")
						.AddComment("減少する効果について、設定できなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「セリーヌのブローチ　悪霊の糸の手袋セット」の効果のうち、一定確率で")
						.AddComment("「リコグナイズドスペル Lv1」が発動する効果について、設定できなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃スクロールとして「メテオストームＬｖ５」を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カードデータの一覧に、全部位に装着可能なカードが表示されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("シャドウチェイサーの攻撃方法に、「マグマイラプション」を追加。")
						.AddComment("また、これに伴い、全職業の攻撃方法欄の定義を整理。")
						.AddComment("（攻撃方法スキルの過不足がありましたら、投稿フォームよりお知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 4, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("三次職支援等の設定欄を、二次職支援と三次職支援に分離。")
						.AddComment("（設定欄の内容に変化はありません）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("一部、内部仕様の変更により、セーブデータのバージョンを更新。")
						.AddComment("（これまでのセーブデータも、そのままご利用いただけます）")
						.AddComment("（万が一、動作しない場合は、セーブURLも添えてお知らせください")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("セーブデータのバージョンが不正の場合、データ読み込みを中止するように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「ワンダラー」において、攻撃方法として「アローバルカン」が選択できない")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター状態異常「暗闇」を設定した際、敵のＨＩＴ低下量が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター状態異常「石化」を設定した際、敵のＦＬＥＥが低下していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("経験値が増加するカードにおいて、経験値の増加量が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 5, 20)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("スキル「ソウルアタック」　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("左のメニューにミラクル精錬計算機を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("拡張表示「その他耐性」欄に、人間耐性表示を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("パッシブ持続系の支援欄を、一次職～三次職に分離。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("二次職支援、三次職支援欄を、戦闘結果の上側に移動。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("詠唱シミュレータを仮設置。今後調整予定。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年精錬祭関連　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年６月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("支援スキル「デリュージ」の効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター手入力欄の一部の設定が反映されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「達人の槌」の装備名が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「スカラバハイヒール　エルヴンボウセット」において、")
						.AddComment("スキル「シビアレインストーム」の威力上昇が、適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「スカラバハイヒール　ドゥルガーセット」において、")
						.AddComment("スキル「ローリングカッター」の威力上昇が、適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「プレイヤー(防御側)」にて、敵の種族に「ドラム」を選択した際、")
						.AddComment("サイズ補正が正しく計算されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「パワフルスケルトン」、「パワフルAスケルトン」、")
						.AddComment("「パワフルSスケルトン」がＢＯＳＳ属性になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『サモナーの通常攻撃のダメージがずれる』")
						.AddComment("　→上記の「ソウルアタック」を習得されている関係だと思われます。")
						.AddComment("　　本日の更新で、ソウルアタックの効果（遠距離攻撃になる）を実装しましたので、")
						.AddComment("　　おそらくズレは無くなると思われます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 5, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("オートスペル系の計算を行うと、計算機が正常に動作しなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 5, 24)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("永劫の戦　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("訓練の間　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("攻城戦Yggdrasill　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ファイアードラゴンブレス」を選択すると、計算機が正常に動作しなかった")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 5, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("経験値テーブル　更新")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("モンスターの抽出条件指定のマップ名を、五十音順にソート。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エンチャント　傷のニーヴ（プレイヤー）　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エンチャント　強靭　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター手入力において、ＡＴＫが正常に計算されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター手入力で大きな値を設定した場合、SAVEボタンを押した後再計算すると、")
						.AddComment("入力した値がおかしくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「退魔神の短剣」を左手に装備した際、精錬値が正しく参照されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備エーギルシリーズの装備可能職業制限を、全ての職業に修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「ランデル＝ロレンス（獄）」の読み仮名設定が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 6, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部の職業において、拡張表示「経験値」を表示しようとすると、")
						.AddComment("計算機が異常な動作となり、操作を受け付けなくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「アーススパイク」の計算が、別のスキルになっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 6, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("盾のASPD補正を修正（修正前より僅かにASPDが上がります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８　サマーパッケージ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のスキルの定義が入れ替わっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備「ミラージュウィング」の必中攻撃付与効果について、対象のスキルを習得しても")
						.AddComment("効果が得られていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「貴族の仮面」の詠唱時間短縮効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「大地の魂効果○○」、および「生命の魂効果○○」について、")
						.AddComment("それぞれ「大地の魂」、および「生命の魂」のレベルも設定していなければ、")
						.AddComment("効果が適用されないように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「エンチャントデッドリーポイズン」を使用した状態で、スキル「グランド")
						.AddComment("クロス」を使用した際、ダメージ量が実際よりも少なくなっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「エンチャントデッドリーポイズン」を使用した状態で、スキル「グランド")
						.AddComment("クロス」を使用した際、『EDPの毒部分を消す』設定の効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ソウルブレイカー」をオートスペルに設定した際、錐の効果が適用されて")
						.AddComment("しまう問題を修正。")
						.AddComment("（管理人は該当オートスペルが発動する装備を持っておらず、確認検証できていません。")
						.AddComment("　もし、オートスペルでは錐効果が乗るという場合は、ご一報ください）")
						.AddComment("（また、今回の修正に併せ、想定外の錐演算が行われた場合、ポップアップメッセージが")
						.AddComment("　表示されるようにプログラムを組んでいます。")
						.AddComment("　もし、ご利用中にメッセージが表示された場合、投稿フォームよりお知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("その他の設定「OTPボーナス」に関して、HIT/FLEEの上昇効果が一部のアイテム効果と")
						.AddComment("重複して反映されていた問題を修正。")
						.AddComment("（一部のアイテムと別加算ではなく、もっとも効果の高いものだけが効果を発揮）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『習得スキルでLvをあげても、ミラージュハンドガンの必中攻撃が反映されない』")
						.AddComment("　→該当の効果を得るためには、「習得スキル」欄ではなく、「パッシブ持続系」欄で")
						.AddComment("　　スキル（スネークアイ）を設定してください。")
						.AddComment("　　（分かりにくくて申し訳ありませんが、「習得スキル」欄で設定するのは、")
						.AddComment("　　　【習得スキル設定対象】と書かれた装備のみとなります）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 6, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("新種族ドラム　対応中")
						.AddComment("ＳＰのデータを更新（Lv170まで確定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("詠唱シミュレータをβ版に更新（消費ＳＰ以外は機能実装済み）。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("モンスターの地域抽出を整理。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("素手等でも、任意の矢を装備できるように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年７月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ゲラドリア」の説明文において、スロットが０としか表示されていなかった")
						.AddComment("問題を修正。（実際は、s0とs3の２種類）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「月食の装束」にエンチャントが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「月食の装束」にDEF、MDEF等が設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「月食の装束　ハティーカード」において、水属性モンスターへの")
						.AddComment("ダメージ増強効果が、適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「サーペンタリウスクラウン　サーペンタリウス」において、")
						.AddComment("ステータス上昇効果が、スキル「集中力向上」の対象に含まれていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスターデータ一覧の文字サイズ、表サイズを変更。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 6, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("詠唱シミュレータを更新（全機能実装）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("調査団の帽子　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("異形の迷宮　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 7, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("モンスターの地域を、登録順にソートできるように拡張。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター地域「フレイヤ大神殿　聖域5F」、「（MD）最後の部屋」を選択しても、")
						.AddComment("敵がリストに表示されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備における特定スキルの固定詠唱時間短縮効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『戦闘結果のディレイが、0.33秒以上短縮できない』")
						.AddComment("　→0.33秒未満の速度で入力するには、計算機の設定を変更する必要があります。")
						.AddComment("　　具体的には、次の手順で設定を変更してお試しください。")
						.AddComment("　　１．計算機を、画面下のほうへスクロールします。")
						.AddComment("　　２．『アクティブスキルの限界攻撃間隔』という項目があるはずなので、")
						.AddComment("　　　　該当項目の設定を、ご自身の環境に合わせて変更してください。")
						.AddComment("　　３．再度、計算機の『計算する』ボタンを押します。")
						.AddComment("　　※これ以上の詳しい説明については、項目の横にある説明ページをご覧ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 7, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("オートスペルの発動率を、より細かく設定できるように変更。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("イリュージョンダンジョン関連　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("イリュージョンダンジョン関連　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("ラビオル地方（ラザーニャ）　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("龍の巣　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("イリュージョンダンジョン関連　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「月食の装束　ハティーカードセット」において、精錬値が上がる度に")
						.AddComment("水属性モンスターへの物理ダメージが増加する効果が漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター状態強化「ストーンスキン」において、MDEFが上昇しないように修正。")
						.AddComment("（2018/04/03パッチの仕様変更対応）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター状態強化「アンチマジック」において、DEFが上昇しないように修正。")
						.AddComment("（2018/04/03パッチの仕様変更対応）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター状態異常「凍結」、「石化」において、属性が変化していなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『達人の斧など、一部の装備において、【習】の文字が漏れている』")
						.AddComment("　→該当の装備は、習得スキルによる設定の対象ではないアイテムとなります。")
						.AddComment("　　例えば、達人の斧の場合、「パッシブ持続系」欄にある、「製作スキルマスター数")
						.AddComment("　　(達人の斧用)」という欄で、設定を行うようにしてください。")
						.AddComment("　　なお、このように設定する箇所がバラバラになっているのは、分かりづらく、")
						.AddComment("　　使いにくいと管理人も感じております。")
						.AddComment("　　今後、もっと統一的に設定できるように、改良したいと考えておりますので、")
						.AddComment("　　今しばらくお待ちいただきますよう、お願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 7, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年８月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「発勁」を使用した際に、想定外の計算が行われていた問題を修正。")
						.AddComment("（もし計算結果にズレがあるようでしたらお知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター地域の並べ替えを変更している状態でページの再読み込みを行うと、")
						.AddComment("並べ替えがリセットされてしまう問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 8, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("僕のドキドキ冒険記Ｖ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("イリュージョンオブヴァンパイア　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ブルートハンターボウ」の装備制限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「デビルズフィンガーズ」が、ボス属性になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『プラズマラット、カニバラウスの計算結果が、実測と大きくずれる』")
						.AddComment("　→恐らく、「ストーンスキン」を設定していないことが原因と思われます。")
						.AddComment("　　該当モンスターは、常時「ストーンスキン」状態だと考えられますので、")
						.AddComment("　　「モンスター状態強化設定」の項目から、「ストーンスキン」を設定してみてください。")
						.AddComment("　　なお、「ストーンスキン」のレベルは、３ではないかと思われます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『ヴァルゴカードの効果が、精錬値ごとに２％ではなく１％になっている』")
						.AddComment("　→恐れ入りますが、こちらでは問題を確認できませんでした。")
						.AddComment("　　今一度、装備などの設定をご確認いただき、それでも問題が再現するようであれば、")
						.AddComment("　　お手数ですが、「URL出力」の結果を添えて、再度、お知らせください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 9, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("戦闘結果の命中率欄に、必中効果による命中率を表示するように変更。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("イリュージョンオブヴァンパイア　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年９月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年１０月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("イリュージョンオブヴァンパイア　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記のアイテムにエンチャントが設定できなかった問題を修正。")
						.AddComment("スタッフオブパフィ")
						.AddComment("スターフィッシュスーツ")
						.AddComment("特殊環境活動用ブーツ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「海魔獣の鱗」のＭＤＥＦ設定が漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「月食の装束」の説明文に、固定詠唱に関する説明が漏れていた問題を修正。")
						.AddComment("（効果に変更はありません。説明文のみの修正となります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「一閃」の計算が正常に行えなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("サモナーＬｖ１７５におけるＳＰを修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータ一覧の「ペナ解消STR」の計算式に誤りがあった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 10, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("イリュージョンオブ久陽宮　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年１１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「リベリオン」の、Ｌｖ１７１以降のＳＰを修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「スタッフオブパフィ」のスキル「スペルフィスト」習得時の効果が、")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「陣羽織」の、精錬によるFLEE上昇値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「吸血鬼のしもべ」に、誤ったSTR補正とATK補正が設定されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「聖祭の羽衣」の+8精錬時の効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「トラベラーシューズ」の、スキル習得時にHPが上昇する効果について、")
						.AddComment("正しく適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「勇者のブローチ」の、職業によってHPが上昇する効果について、")
						.AddComment("正しく適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「勇者のブローチ　勇者のトレードメイルセット」において、")
						.AddComment("精錬値１ごとにステータスが上昇する効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「増幅」系の効果が、正しく適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「イヌハッカメテオ」に、属性付与の影響が適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「プレイヤー（防御側）」において、必中HITの計算にベースレベルが")
						.AddComment("加味されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『養子のステータスシュミレータはできないのでしょうか？』")
						.AddComment("　→今回の更新で、できるように修正しました。")
						.AddComment("　　「その他の支援/設定 (暫定追加機能)」欄にある、「養子状態にする」という")
						.AddComment("　　チェックボックスをONにしてお試しください。")
						.AddComment("　　（なお、職業を選び直すと該当チェックボックスは初期化されますので、")
						.AddComment("　　　その際は、お手数ですが、再度、チェックボックスをONにしてください）")
						.AddComment("　　なお、管理人が把握している養子キャラの仕様は、下記のとおりです。")
						.AddComment("　　もし誤りや不足があれば、お知らせいただけると対応できると思います。")
						.AddComment("　　・HPとSPが、通常キャラの70%。製造成功率も70%。")
						.AddComment("　　・転生不可。そのため、三次職でも、HPとSPに125%のボーナスがない。")
						.AddComment("　　　また、ステータスポイントの初期値も、100ではなく48。")
						.AddComment("　　・ステータスの最大値は、基本が80。限界突破ノービスが108。三次職が117。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 10, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("性能カスタマイズ欄を整理。ディレイ等も計算できるように改造。")
						.AddComment("※「以下の入力欄をすべて無効にする」にチェックされていた場合でも、")
						.AddComment("　今回の対応により、一度チェックが外れるようになっています。")
						.AddComment("　お手数ですが、再度、チェックをONにしてご使用ください。")
						.AddComment("※今回の対応により、「ヒール系を使用したときの回復力+%」と、")
						.AddComment("　「ヒール系を使用されたときの回復力+%」は別々の設定となりました。")
						.AddComment("　そのため、「ヒール回復力+%」に設定されていた値は、引き継がれません。")
						.AddComment("　お手数ですが、再度、各項目を設定してご使用ください。")
						.AddComment("※処理高速化のため、一部の設定項目で、設定可能な値を減らしています。")
						.AddComment("　（INT+の最大値を4000から200に制限するなど）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("ランダムエンチャントの設定最大値を、105から200に拡張。")
						.AddComment("※処理が幾分重くなりました。あまりにも操作に支障がでるようでしたら、")
						.AddComment("　お手数ですが、投稿フォームよりお知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("[衣装]ビギナー帽に再対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ランダムエンチャント対応装備において、対プレイヤー関連のエンチャントが")
						.AddComment("設定できなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「キャンサー」において、特殊効果のDEF無視を設定する項目が、")
						.AddComment("「その他の支援/設定 (暫定追加機能)」に漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「勇者のブローチ　勇者のジャッジメントローブ」において、")
						.AddComment("精錬値に応じてスキル威力が上昇する効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「勇者のブローチ　勇者のプレート」において、")
						.AddComment("精錬値に応じてスキル威力が上昇する効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『ジョンダパスによる支援効果は何処を選択すれば良いでしょうか？』")
						.AddComment("　→ジョンダパスの支援は、「その他の支援/設定 (暫定追加機能)」欄にある、")
						.AddComment("　　「OTP」の項目で、ログインボーナスの「レインボー」を選択すると設定できるかと")
						.AddComment("　　思います。")
						.AddComment("　　（OTPレインボーと同等の効果だと思いますが、違いましたらお知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 10, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテムデータ一覧を再構築。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("100%必中表、95%FLEE表を、モンスターデータに統合。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「対プレイヤー設定」の「戦闘エリア」に、「攻城戦YE」を追加。")
						.AddComment("（YEには参加できていないので、誤りなどがありましたら、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("データのロード機能を使用した際に、エラーが発生していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータ一覧で、セット効果が検索されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータ一覧で、武器レベルに小数が表示されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カードデータ一覧で、セット効果が検索されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 11, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("深淵の回廊２０１８　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("深淵の回廊ＭＶＰ（四怨将）のステータスを確定")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("衣装「ビギナー帽」の装備条件が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『ASPDを上げた際、ジュデックスで秒間ダメージが変わらない』")
						.AddComment("　→これについては、少し込み入った仕様がありますので、説明します。")
						.AddComment("　　まず、秒間ダメージの計算には、『詠唱時間』と『スキルディレイ』が関係しています。")
						.AddComment("　　両方とも、短ければ動作が早くなり、秒間ダメージは上昇します。")
						.AddComment("　　一方で、人間がスキルを連打するには、ボタンの入力速度に限界があります。")
						.AddComment("　　計算機では、これを『入力限界』と呼んでおり、デフォルトでは0.33秒＝秒間3回です。")
						.AddComment("　　")
						.AddComment("　　今回の状況では、この『詠唱時間』、『スキルディレイ』、『入力限界』の関係から、")
						.AddComment("　　ASPDを上げても、秒間ダメージが変わっていないように見えていました。")
						.AddComment("　　")
						.AddComment("　　まず、問題の「ジュデックス」ですが、頂いたデータでは、次のようになっていました。")
						.AddComment("　　　・詠唱速度　　　：0.03秒")
						.AddComment("　　　・スキルディレイ：0.28秒（モーションディレイ）")
						.AddComment("　　　・入力限界設定　：0.33秒")
						.AddComment("　　この場合、『入力限界　＞　詠唱速度＋スキルディレイ』という式が成立しますので、")
						.AddComment("　　もっとも時間のかかる『入力限界』の値を使用して、秒間ダメージを計算することに")
						.AddComment("　　なります。")
						.AddComment("　　（魔法の詠唱が始まってからディレイが完了する時間が極めて短く、")
						.AddComment("　　　人間の手によるスキルの“入力”が間にあってない状態です）")
						.AddComment("　　この状態では、これ以上、ASPDを早くしても、モーションディレイは短くなりますが、")
						.AddComment("　　人間の入力スピードが追いついていないので、秒間ダメージは増えません。")
						.AddComment("　　")
						.AddComment("　　一方、問題のない「アドラムス」では、頂いたデータでは、次のようになっていました。")
						.AddComment("　　　・詠唱速度　　　：0.07秒")
						.AddComment("　　　・スキルディレイ：0.28秒（モーションディレイ）")
						.AddComment("　　　・入力限界設定　：0.33秒")
						.AddComment("　　この場合、『入力限界　＜　詠唱速度＋スキルディレイ』ということになりますので、")
						.AddComment("　　もっとも時間のかかる『詠唱速度＋スキルディレイ』を使用して、秒間ダメージを")
						.AddComment("　　計算することになります。")
						.AddComment("　　こちらは、ASPD を上げることにより、モーションディレイが軽減されることで、")
						.AddComment("　　計算に使用している『詠唱速度＋スキルディレイ』の値が小さくなりますので、")
						.AddComment("　　秒間ダメージはちゃんと増えることになります。")
						.AddComment("　　なお、余談ですが、このパターンであっても、ASPDを上げまくっていくと、")
						.AddComment("　　やがて人間の入力限界を越えてしまい、ジュデックスのようなパターンになります。")
						.AddComment("　　")
						.AddComment("　　もし、秒間3回以上、スキルを連打できる自信があるようでしたら、")
						.AddComment("　　計算機の下の方にある「アクティブスキルの限界攻撃間隔」という欄を、")
						.AddComment("　　秒間5回などに設定すると、より厳密なシミュレーションができるかと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 11, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「アルカナ　アルカナカード」のステータス上昇効果が、")
						.AddComment("正しく反映されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 11, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アクティブスキルの限界攻撃間隔に、秒間6～9発を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("性能カスタマイズに、「物理攻撃時に（ボス／一般）に与えるダメージ上昇」、")
						.AddComment("「魔法攻撃時に（ボス／一般）に与えるダメージ上昇」を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("モンスターデータに、MATKの項目を追加。")
						.AddComment("（計算式は、ATKと同様で、STRをINTに置き換えただけですので、仮の数値です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１８年アニバくじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター地域「深淵の回廊」に、新規追加モンスターが漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『PWの属性を変えても10%程度しか威力が上がらない』")
						.AddComment("　→「PW」は、サイキックウェーブのことだと思いますが、")
						.AddComment("　　こちらでは現象を確認することができませんでした。")
						.AddComment("　　以下のことを確認していただき、それでも問題が発生する場合は、")
						.AddComment("　　お手数ですが、URL 出力の結果も添えて、再度、お知らせください。")
						.AddComment("　　・設定方法が誤っていないか？")
						.AddComment("　　　（サイキックウェーブの属性変更は、スキル名の横の欄で行います）")
						.AddComment("　　・特定の属性の魔法威力が上昇する装備をつけていないか？")
						.AddComment("　　　（例えば、サイバイバルロッド　サイバイバルシューズセットを装備すると、")
						.AddComment("　　　　無属性魔法の威力が上がりますが、水属性魔法の威力は上がらないため、")
						.AddComment("　　　　火４の敵を相手にサイキックの属性を無から水に変えても、")
						.AddComment("　　　　ダメージがほとんど変わらない現象が発生します）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『獄炎呪状態の被ダメを計算機上で確認する方法はありますか？』")
						.AddComment("　→申し訳ありませんが、現在のところ、未対応です。")
						.AddComment("　　（任意に獄炎呪状態にするアイテムなどがでれば検証もしやすいのですが……）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『回廊と庭園のＭＯＢが表層（１３０以下の低レベル）のデータしか出てこない』")
						.AddComment("　→恐れ入りますが、こちらでは状況を確認できませんでした。")
						.AddComment("　　モンスター地域で抽出の際、「プロンテラ深淵表層（回廊）」などを選んでは")
						.AddComment("　　いませんでしょうか？")
						.AddComment("　　「プロンテラ深淵表層（回廊）」と「プロンテラ深淵（回廊）」は")
						.AddComment("　　別々の項目として用意してありますので、今一度、ご確認ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 11, 20)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("拡張表示「属性倍率」に、属性耐性も表示するように改良。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("メカニックスキル「シェイプシフト」の効果を実装。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("群星　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("種族「ドラム」のステータスによる完全回避上昇補正が、")
						.AddComment("装備のLUKも含めて計算されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拡張表示「属性倍率」の計算式に誤りがあった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「マットドレインリアー」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「マットドレインリアー」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『DEF無視率もどこかに表示してもらえませんか？』")
						.AddComment("　→「DEF無視率」については、拡張表示から確認できるようになっています。")
						.AddComment("　　計算機右上にある「拡張表示」の項目で、「物理特化」を選択してください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 11, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("１６ｔｈ　アニバーサリー　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「スティックキャンディロッド」にMATKが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「禁忌の魔導書」に、習得スキル設定の文字が漏れていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「エルヴィラブーツ」の、精錬による「ライトニングボルト」の威力上昇が")
						.AddComment("反映されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「古びた派遣隊の指輪　ボーンサークレットセット」の特殊効果が、")
						.AddComment("設定欄に表示されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『属性倍率の最終倍率がマイナスになる場合はマイナスの数値を表示してほしい』")
						.AddComment("　→これについては、少し難しい問題があり、先日、一律０％表示にしました。")
						.AddComment("　　元々、バグ報告をいただいたのも、このマイナスの場合についてなのですが、")
						.AddComment("　　例えば、火耐性が１１０％、属性鎧なしですと、最終倍率は－１０％になります。")
						.AddComment("　　一方で、火耐性が１１０％のままで、地属性鎧を装備するとどうなるでしょうか。")
						.AddComment("　　通常、地属性鎧を着ると、火属性のダメージは１５０％になります。")
						.AddComment("　　ということは、火耐性が１１０％ある場合、")
						.AddComment("　　最終倍率は－１０％×１５０％＝－１５％になるのでしょうか？")
						.AddComment("　　地属性鎧を装備したのに、火属性耐性が増える？　という不思議な現象が起きます。")
						.AddComment("　　はたまた、その場合は－１０％×５０％＝－５％になるのでしょうか？")
						.AddComment("　　この点について、残念ながら、管理人は検証できていません。")
						.AddComment("　　もし、『その場合は、○○％になります！』という検証情報がいただければ、")
						.AddComment("　　それに従って、修正することはできます。")
						.AddComment("　　以上より、現段階では、一律０％表示のままとさせていただきます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『禁忌の魔導書の精霊ＬＶの設定方法が分からない』")
						.AddComment("　→該当の装備は「習得スキル」欄での設定が必要となります。")
						.AddComment("　　（【習】の表示が漏れていました。申し訳ありません）")
						.AddComment("　　装備欄のやや下の方にある「習得スキル」という欄を展開表示させ、")
						.AddComment("　　該当のスキル（サモンアグニ等）を設定してください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『殴りABでシミュレートしていたところ、RO内と計算機でASPDのずれがあった』")
						.AddComment("　→URL 出力の結果をお送りいただき、ありがとうございます。")
						.AddComment("　　いただいた情報を調査したところ、「習得スキル」の設定において、")
						.AddComment("　　デュプレライトのレベルが設定されていないことが問題ではないかと思われました。")
						.AddComment("　　※【勇者の靴】＋【達人の槌[2]】セットを装備した場合、")
						.AddComment("　　　スキル「デュプレライト」の習得レベルに応じてASPDが上昇しますが、")
						.AddComment("　　　計算機で正しく計算するには、「習得スキル」欄での設定が必要です。")
						.AddComment("　　※「パッシブ持続系」欄での設定は、スキルを習得しているかどうかではなく、")
						.AddComment("　　　スキルを“使用しているかどうか”ですので、【習】という文字のついた装備では、")
						.AddComment("　　　「習得スキル」欄での設定もお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『マキシマイズパワーのチェックを入れても反映されない事がある』")
						.AddComment("　→『保存データを呼び出してチェック入れても反応せず、")
						.AddComment("　　　新規で最初からチェック入れてから装備とステを入れると反映される』")
						.AddComment("　　とのことで、保存データ読み込み時にエラーが起きている可能性があります。")
						.AddComment("　　恐れ入りますが、該当のデータを読み込んだ状態で「URL 出力」ボタンを押し、")
						.AddComment("　　出力された URL を添えて、再度、お知らせいただけませんでしょうか。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 12, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("１６ｔｈ　アニバーサリーパッケージ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("拡張表示「属性倍率」で、マイナスの最終倍率を表示するように更新。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「勇者の靴」のDEFが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『「おもちゃの指輪」の剣修練スキル取得時の効果が設定できない』")
						.AddComment("　→装備「おもちゃの指輪」については、スキル習得時の効果を設定するには、")
						.AddComment("　　「パッシブ持続系」欄で、「剣修練」のレベルを設定してください。")
						.AddComment("　　（分かりづらくて申し訳ありませんが、「習得スキル（装備効果用）」欄では")
						.AddComment("　　　ありませんので、ご注意ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『「執行者のシューズ」の物理ダメージ上昇効果がおかしい気がする』")
						.AddComment("　→「執行者のシューズ」の物理ダメージ上昇効果は若干特殊な仕様になっているようで、")
						.AddComment("　　他の「物理攻撃で与えるダメージ」系と加算ではなく乗算される仕様のようです。")
						.AddComment("　　（念のため、簡単に再検証しましたが、仕様変更などはされていないようでした）")
						.AddComment("　　従って、執行者のシューズを外し、「物理攻撃で与えるダメージ」を＋２０％しても、")
						.AddComment("　　シミュレート結果が異なる現象は発生しえます。")
						.AddComment("　　もし、実測とのズレがあるようでしたら、お手数ですが、問題の実測データと、")
						.AddComment("　　シミュレート結果のURL出力を併せて、投稿フォームからお知らせください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 12, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("セーブが消える問題に関して、調査用のプログラムを追加。")
						.AddComment("もし、エラー検出メッセージが表示された方は、")
						.AddComment("お手数ですが投稿フォームよりお知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『GoogleChromeだと正常に動作しない等ございますでしょうか？（セーブできない）』")
						.AddComment("『GoogleChromeで、マキシマイズパワーのチェックを入れても反映されない事がある』")
						.AddComment("　→以前より、複数の方から、Chrome での動作異常をご報告いただいていますが、")
						.AddComment("　　現在のところ、管理人の環境で再現できず、問題の究明にいたっていません。")
						.AddComment("　　（管理人の Chrome では、正常にセーブでき、ロードも問題ない状況です）")
						.AddComment("　　今回、セーブが消える問題に関して、調査用のプログラムを追加しましたので、")
						.AddComment("　　何かエラーが表示されましたら、お知らせいただけると調査が進むかと思います。")
						.AddComment("　　なお、基本的には、PC用の有名なブラウザなら正常に動作すると思います。")
						.AddComment("　　（iPhone などのスマートフォン用（特に Safari）では、動かないかもしれません）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 12, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("オートスペル「ソウルエクスパンション」を設定すると、")
						.AddComment("計算機が正常に動作しなくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("習得スキルの強調表示機能が、正常に動作しない場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("セーブ機能が正常に利用できない問題の仮対応を実施。")
						.AddComment("（まだ問題が発生する／問題が解消されたなど、状況をお知らせいただけると幸いです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2018, 12, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「キングスメイル」に、聖属性が設定されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 1, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【重要】スキルの習得状況によって効果が変わる装備について")
						.AddComment("スキルの習得状況によって効果が変わる装備について、")
						.AddComment("設定を行う場所を「習得スキル（装備効果用）」欄に統一しました。")
						.AddComment("従来、下記の装備では「パッシブ持続系」欄の設定を参照していましたが、")
						.AddComment("今後は、すべて「習得スキル（装備効果用）」欄で設定するようになります。")
						.AddComment("なお、現在の設定状況については、プログラムで可能な限り、")
						.AddComment("「習得スキル（装備効果用）」欄に自動で振り替えるようになっていますが、")
						.AddComment("念のため、設定内容をご確認いただくよう、お願いいたします。")
						.AddComment("（本日のアップデート以前のセーブデータが対象です。")
						.AddComment("　本日のアップデート以降にセーブしたデータでは、自動で振り替えられません）")
						.AddComment("＜＜設定欄が変更になった装備＞＞")
						.AddComment("　・アイアンネイル")
						.AddComment("　・イリュージョンスタッフオブオルド")
						.AddComment("　・スタッフオブオルド")
						.AddComment("　・セイヴザキング")
						.AddComment("　・達人の斧[2]、達人の斧[3]")
						.AddComment("　・チャクラム")
						.AddComment("　・ミラージュウィング")
						.AddComment("　・ミラージュハンドガン")
						.AddComment("　・ミラージュライフル")
						.AddComment("　・ミラージュガトリングガン")
						.AddComment("　・ミラージュショットガン")
						.AddComment("　・ミラージュグレネードガン")
						.AddComment("　・ミラージュフォックステイル")
						.AddComment("　・メテオストライク")
						.AddComment("　・剣聖の王冠")
						.AddComment("　・ユニコーンの兜")
						.AddComment("　・空飛ぶガラパゴ")
						.AddComment("　・デイヴィッドシールド")
						.AddComment("　・堕天司祭の闇光外套")
						.AddComment("　・エメラルドイヤリング")
						.AddComment("　・おもちゃの指輪")
						.AddComment("　・可愛い草のネックレス")
						.AddComment("　・ケミカルグローブ")
						.AddComment("　・新鮮な草のネックレス")
						.AddComment("　・鳥飼の鉤爪")
						.AddComment("　・魔力の草のネックレス")
						.AddComment("　・エンチャント　セイクレッド")
						.AddComment("　・ダークフェイスワームカード")
						.AddComment("　・鳥狩の鉤爪＋鳥狩の弓懸セット")
						.AddComment("　・勇者の靴　達人の斧セット")
						.AddComment("　・勇者の靴　達人の槌セット")
						.AddComment("　・勇者の靴　達人の剣セット")
						.AddComment("※注意※")
						.AddComment("　『スキルの習得』ではなく、『スキルの使用』が条件になっているものでは、")
						.AddComment("　従来通り、「パッシブ持続系」欄での設定となります。")
						.AddComment("　＜例＞")
						.AddComment("　　アルティメットモードチェンジャーとウォーロックアーティファクトセットにおける")
						.AddComment("　　『魔法力増幅使用時の』スキルダメージ上昇。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("拡張表示欄を２個に増設。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("拡張表示「物理特化」に、クリティカルダメージを追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("ランダムエンチャント効果に、「◯属性モンスターから受ける△△ダメージ-XX%」を")
						.AddComment("追加。")
						.AddComment("（『耐性－属性敵○○』という項目を選択してください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　修羅　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加（2019/01/15）　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年２月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("フレイムヴァレー／ビオスモルス　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「クラデニェッツ」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「星の眼帯」に、VIT＋３の効果が付いていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「負傷兵の眼帯」に、AGI＋１０の効果が付いていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ローラのプレートメイル」のダメージ反射率が誤って設定されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器カード欄における「全種族＋２０％」、及び「魔法ダメージ＋１０％系」の効果が、")
						.AddComment("ドラム種族に適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『朧で風魔手裏剣乱舞を計算時、命中率5%とあるが必中のような計算結果になる』")
						.AddComment("　→恐れ入りますが、こちらでは状況を確認できませんでした。")
						.AddComment("　　“必中のような計算結果”とは、具体的にどのような現象でしょうか？")
						.AddComment("　　今一度、装備などをご確認いただき、問題が解消されないようでしたら、")
						.AddComment("　　お手数ですが、URL出力の結果を添えて、再度、お問い合わせください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 2, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("イリュージョンオブテディベア　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加（2019/01/29）　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　メカニック　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「シャドウチェイサー」の攻撃方法に、「レイオブジェネシス」を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「コメット」の『中心からの距離』設定において、協力発動した場合の選択肢を")
						.AddComment("追加。")
						.AddComment("（協力発動時は、全範囲が中心地点のダメージになると考えられますが、")
						.AddComment("　実際の動作が異なる場合は、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「三段掌」のダメージ計算において、攻撃対象に『プレイヤー（防御側）』を")
						.AddComment("選択すると、一部の耐性を無視していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「栄光の証」を、「栄光の証[0]」と「栄光の証[1]」に分離。")
						.AddComment("※実際に「栄光の証[1]」が装備できるのはLv150以上ですので、")
						.AddComment("　計算上の効果は変わりません。従来の設定のままでも大丈夫です。")
						.AddComment("　（栄光の証[0]はLv100から装備可能ですが、追加効果はLv150以上です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ルーンヘルム」を設定すると、計算機の動作が停止する場合があった問題を修正。")
						.AddComment("（アイテムデータが表示されない問題も、同一原因によるものでした）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「アキレウスシールド」の説明文に誤りがあった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「絶望の神モロク」の特殊効果「インスピレーション」を設定した際に、")
						.AddComment("ＨＰの計算がおかしくなってしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拡張表示「ヒール回復力」において、ＩＮＴがマイナスの場合に、")
						.AddComment("計算結果がズレる問題を修正。")
						.AddComment("（MATK分の回復力がマイナスになった場合、０として計算するようにしました。")
						.AddComment("　もし問題が解決されていない場合は、お手数ですが、再度、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『セーブデータの保存数を500で保存したのに、ページを読み込み直すと19に戻る』")
						.AddComment("　→ブラウザは Chrome をお使いとのことでしたが、『シークレットウィンドウ』モードを")
						.AddComment("　　お使いではないでしょうか？")
						.AddComment("　　当計算機では、「クッキー」および「ローカルストレージ」という機能を利用しており、")
						.AddComment("　　これらの機能を制限されてしまうと、お知らせいただいたような問題が発生します。")
						.AddComment("　　セキュリティ上、難しい面もあるかと思いますが、計算機のセーブ機能を使う場合には、")
						.AddComment("　　通常のモードでご利用いただきますよう、お願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 2, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拡張表示「物理特化」、および「魔法特化」において、対プレイヤー特化の情報が")
						.AddComment("一部反映されたなかった問題に対応。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「コメット」の『中心からの距離』設定において、協力発動した場合の選択肢を")
						.AddComment("個別に分離。（協力発動時はダメージ計算式が違うとのことでした）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「労働型ピットマン」の効果が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 2, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("画面左のメニューに、背景色を切り替えるボタンを設置。")
						.AddComment("このボタンを押すと、灰色と白色の背景色が、交互に切り替わります。")
						.AddComment("（画面移動時には保存されませんので、お手数ですが、再度切り替えてください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年３月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("必中効果が１００％を超えた際に、一部の計算が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『天邪鬼の鬼面がアクセサリで選択できない』")
						.AddComment("　→アクセサリ１用の欄で選択しようとされていないでしょうか？")
						.AddComment("　　天邪鬼の鬼面は、アクセサリ２専用の装備ですので、アクセサリ１用の欄には")
						.AddComment("　　表示されない仕様となっております。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_THANKS)
						.AddComment("以前より、広告掲載や、検証用チケットのご提供などをご提案頂いており、")
						.AddComment("皆様のお心遣いに感謝しております。")
						.AddComment("しかしながら、当サイトは、完全フリーで運営しておりますゆえ、")
						.AddComment("恐縮ながら、お気持ちだけ頂戴しております。")
						.AddComment("どうか、皆様のご遊戯にお使いください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 2, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「モンスター状態異常」に「カイト（ダメージ増加）」を追加。")
						.AddComment("（対人戦で、相手にカイトがかかっている場合にお使いください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「巨蟹宮のアックス」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「猛炎と白魔の指輪」の装備レベル制限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("時限性補助効果「グレータードラクルホーンのラウドボイス」を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『イリュージョンゲートキーパーDDを設定すると正常にセーブできない』")
						.AddComment("　→恐れ入りますが、こちらでは現象を確認できませんでした。")
						.AddComment("　　お手数ですが、可能であれば、URL 出力の結果を添えて、")
						.AddComment("　　再度、お知らせいただけませんでしょうか？")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 3, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊２０１９年２月　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ルーンナイト　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「栄光の証　金剛石の盾」に関し、栄光の証[0]と栄光の証[1]を装備すると、")
						.AddComment("セット効果が重複して適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『サバイバルセットのMDEF無視が反映されていない』")
						.AddComment("　→恐れ入りますが、こちらでは問題を確認できませんでした。")
						.AddComment("　　今一度、装備の内容などをご確認いただき、問題が継続するようであれば、")
						.AddComment("　　お手数ですが、URL出力の内容を添えて、再度、ご連絡をお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 3, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「巨蟹宮セット」の設定が、天秤宮セットの設定になってしまっていた")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 3, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("イリュージョンオブルワンダ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年４月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("オートスペル設定で、発動率を一定以上に設定すると、セーブが正常に行われなかった")
						.AddComment("問題を修正。")
						.AddComment("（お手数ですが、最新の計算機で発動率を再設定していただくよう、お願いいたします）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「フロストスパイダー」の種族が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「古代龍の宝冠」の装備制限レベルが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「禁忌の魔導書」において、習得スキル設定欄の色が変わっていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_THANKS)
						.AddComment("レベル上限開放に伴うＨＰ／ＳＰの調査が確定いたしました。")
						.AddComment("ご協力いただき、ありがとうございました。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 4, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ギロチンクロス　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「オーソリティサンダル」のステータスＵＰ効果が、スキル「集中力向上」の対象に")
						.AddComment("なっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「時魔術師の指輪　大鷲の眼光」などで、セット効果が重複して計算される")
						.AddComment("場合があった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 4, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年５月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("魔女のスキルカード　対応")
						.AddComment("（コンセントレイションは、二次職支援設定の欄にあります。")
						.AddComment("　それ以外の攻撃スキルは、アイテム(食品/他)設定欄の「攻撃魔法スクロールと")
						.AddComment("　イグドラシルの葉(対不死リザLv1)を攻撃方法欄に追加」をONにしてご利用下さい）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("精錬祭２０１９　対応")
						.AddComment("（古びた履物のエンチャントは内容が不明なため、未対応です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『斧修練の追加HITが間違っている気がしました』")
						.AddComment("　→恐れ入りますが、こちらでは問題を確認できませんでした。")
						.AddComment("　　今一度、装備の内容などをご確認いただき、問題が継続するようであれば、")
						.AddComment("　　お手数ですが、URL出力の内容を添えて、再度、ご連絡をお願いいたします。")
						.AddComment("　　ちなみに、斧修練のＨＩＴ増加は、斧・鈍器装備時のみのはずですので、")
						.AddComment("　　その点もご確認いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 5, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("古びた履物エンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ジェネティック　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年６月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「悪魔の手」に、MDEFが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「不死鳥の冠」に、MDEFが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「武侠靴」の、装備制限レベルが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「淤加美神の羽衣」の、装備制限レベルが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「新鮮な草のネックレス」、「可愛い草のネックレス」、「魔力の草のネックレス」")
						.AddComment("の、特殊効果を発揮する対象のスキルが、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「巨蟹宮のクラウン」、「獅子宮のクラウン」に、本来は存在しない魔法ダメージ")
						.AddComment("上昇の効果が設定されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「真化ラグナロク」の効果が、ウォーロック装備時以外にも適用されていた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("セット効果を持つカードまたはエンチャントを大量に装備した場合、計算が正しく")
						.AddComment("行われなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 6, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("EPISODE EDDA 生体　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ウォーロック　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ゴッズヘルム」の説明文に誤りがあった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「イリュージョンサバイバルマント」のVIT+10効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「天秤宮セット」のサイズ補正無視効果が、「巨蟹宮セット」に")
						.AddComment("付与されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 6, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("サマーパッケージ２０１９　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年７月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ランダムエンチャントの設定で「AllStatus+」を選択した際に、")
						.AddComment("正しく反映されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「くわえたチョコスティック　カルニウムリング　セット」において、")
						.AddComment("セット必須装備に「銀の毛皮のシューズ」が含まれていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「くわえたチョコスティック　カルニウムイヤリング　セット」において、")
						.AddComment("セット必須装備に「銀の毛皮のシューズ」が含まれていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 6, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("全ステータス上昇効果が、誤って二重に計上されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 7, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　シャドウチェイサー　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年８月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("マップ「タナトスタワー１１Ｆ」に出現するモンスターが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「巨蟹宮のアックス」の装備職業制限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「ディアボロスウィング＋ディアボロス装備」について、")
						.AddComment("魔神殿に出現するモンスターに与えるダメージの増幅効果、及び、")
						.AddComment("同モンスターから受けるダメージの低減効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「メテオアサルト」の、モーションディレイの最小値を、")
						.AddComment("0.14（秒間7発）から、0.12（秒間8発）に変更。")
						.AddComment("（現時点では、お知らせいただいた「メテオアサルト」のみ対応しています。")
						.AddComment("　もし、他のスキルでも同様の場合は、お知らせいただければと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("『RO ディレイ関連の説明(計算機用)』ページが文字化けしていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記のスキルについて、攻城戦YEにおけるダメージ補正が誤っていた問題を修正。")
						.AddComment("アシッドデモンストレーション")
						.AddComment("アローストーム")
						.AddComment("オーバーブランド")
						.AddComment("クロスリッパーラッシャー")
						.AddComment("ジュデックス")
						.AddComment("双龍脚")
						.AddComment("大纏崩捶")
						.AddComment("パイルバンカー")
						.AddComment("バルカンアーム")
						.AddComment("ファイアーエクスパンション")
						.AddComment("ファイアーダンス")
						.AddComment("ブーストナックル")
						.AddComment("ローリングカッター")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『対プレイヤー設定で、プレイヤー耐性はどこに入力すればよいでしょうか？』")
						.AddComment("　→現状では、『人間形耐性』および『ドラム形耐性』の欄に、各耐性との合計値を")
						.AddComment("　　入力していただく操作になります。")
						.AddComment("　　例）人間耐性３０％、プレイヤー耐性２５％の場合")
						.AddComment("　　　　『人間形耐性』欄　　→　５５")
						.AddComment("　　　　『ドラム形耐性』欄　→　２５")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 8, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ティアマト攻城戦YEポイント交換防具　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("デモニッシュシリーズ　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("轟鳴鼓　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　アークビショップ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年９月くじ　対応")
						.AddComment("※「ぷりちーウリボウシューズ」の「猪突猛進状態」の設定については、")
						.AddComment("　暫定的に「性能カスタマイズ（スキル関連）」をご利用ください。")
						.AddComment("　（○○スキルで攻撃時ダメージ上昇の設定欄を調整してください）")
						.AddComment("　いずれ、何らかの設定欄を設けたいと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「サモナー」において、養子にした際、ステータス上限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「傀儡の腕輪」の読み方が誤っていた問題を修正。")
						.AddComment("（×「くぐつのうでわ」　○「かいらいのうでわ」）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の武器について、攻撃速度が片手杖と同等になっていた問題を修正。")
						.AddComment("アビススタッフ")
						.AddComment("ディーヴァスタッフ")
						.AddComment("ミラージュスタッフ")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『アローストームのYE補正ダメージが半減している』")
						.AddComment("　→追伸も含めて内容を確認させていただいたのですが、恐縮ながら、結論として、")
						.AddComment("　　計算機の結果に間違いがあるのか否か、判断できませんでした。")
						.AddComment("　　アローストーム（及びいくつかのスキル）については、2019/07/17の更新にて、")
						.AddComment("　　通常のシーズ補正がYEにも適用されていた問題を修正いたしました。")
						.AddComment("　　この修正は、RO公式サイトの攻城戦ＹＥ特設サイトの記載に従ったもので、")
						.AddComment("　　「攻城戦＆新攻城戦制限解除」にリストアップされているスキルについて、")
						.AddComment("　　現行のシーズ補正でのダメージ倍率補正がかからないように修正しました。")
						.AddComment("　　（該当の公式ページはこちらです）")
						.AddComment("　　結果、アローストームについては、通常マップの1/5のダメージで計算しています。")
						.AddComment("　　管理人の都合で、実地での検証ができていないのですが、")
						.AddComment("　　もしまだ計算機の結果に誤りがあるようであれば、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『アシッドデモンストレーションの対人におけるダメージ結果が出ない』")
						.AddComment("　→「対プレイヤー設定」欄で、ＶＩＴの設定はされていますでしょうか？")
						.AddComment("　　アシッドデモンストレーションは、特性上、相手のＶＩＴが０の場合、")
						.AddComment("　　ダメージが０になると思われます。")
						.AddComment("　　それでも問題が発生する場合は、問題が発生している状態のＵＲＬ出力を併せて")
						.AddComment("　　ご連絡いただけると、調査ができるかと思いますので、よろしくお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 9, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("イルシオン　アップデート　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ロイヤルガード　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年１０月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("アイテム「群星」のエンチャントに「グリード詠唱-100%」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("EPISODE EDDA 生体工学研究所　MD2種　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「影狼」、「朧」において、「パッシブ持続系」設定欄に、")
						.AddComment("スキル「フルスロットル」の項目が無かった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「宝瓶宮のスタッフ」を、職業「サマナー」が装備できた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「デモニッシュソード」の説明文が一部過っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「デモニッシュソード」の、精錬値が８以上におけるサイズ補正無効効果が")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「栄光を讃えし王剣」の装備可能職業が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「破滅を纏いし業剣」の装備可能職業が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「緋色のアセイミー」の装備可能職業が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「緋色のアセイミー」において、攻撃手段に表示されるメテオストームが、")
						.AddComment("Lv1 しか選択できなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「フロンティアブーツ　風魔手裏剣・花吹雪」において、")
						.AddComment("追加効果が発揮される条件が一部誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「二次職支援」設定欄の「コンセントレイション」の項目が、")
						.AddComment("正しく機能していなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「二次職支援」設定欄の「トゥルーサイト」の項目が、")
						.AddComment("正しく機能していなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ローリングカッター」、「天羅地網」、「カートトルネード」において、")
						.AddComment("連射性能が ASPD189相当で限界となっていた問題を修正。")
						.AddComment("（イルシオンアップデートで実装されたOS武器により、天羅地網などのスキルで")
						.AddComment("　クールタイムを 0 にすることができるようになったと思われます。")
						.AddComment("　これに伴い、例えば ASPD193 で天羅地網を連射すると、ディレイ 0.14秒、")
						.AddComment("　すなわち、秒間 7 回連射できるようになったとの考えで修正しています。")
						.AddComment("　もし、実際のゲームにおける挙動が違いましたら、ご連絡ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『【習】という文字のついた装備の意味が分からない』")
						.AddComment("　→説明不足ですみません。")
						.AddComment("　　まず、【習】という文字のついた装備は、特定のスキルを習得している場合に、")
						.AddComment("　　特殊効果が発揮される装備になります。")
						.AddComment("　　例えば、「【習】戦乙女の雫」ならば、「イムポシティオマヌス」を習得していると、")
						.AddComment("　　魔法攻撃時、小・中・大型モンスターに与えるダメージが増加します。")
						.AddComment("　　そして、計算機でこれらの、特定のスキルを習得している場合の効果を設定するには、")
						.AddComment("　　いくつかの設定を行う必要があります。")
						.AddComment("　　ひとつめは、該当のアイテムを装備することです。（当然ですね）")
						.AddComment("　　ふたつめは、「習得スキル（装備効果用）」設定欄で、レベルを設定することです。")
						.AddComment("　　例えば、「【習】戦乙女の雫」であれば、「イムポシティオマヌス」の習得レベルを、")
						.AddComment("　　お持ちのキャラクターの習得レベルに設定（例えば、Lv5）します。")
						.AddComment("　　なお、この「習得スキル（装備効果用）」設定欄は、職業によって変化します。")
						.AddComment("　　その職業で習得できないスキルは表示されませんので、ご注意ください。")
						.AddComment("　　これらの設定を正しく行うと、期待通りの計算結果が表示されると思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『計算機の「アイテムデータ」欄に表示される詳細がアイテムと合っていない』")
						.AddComment("　→「アイテムデータ」欄に表示されるのは、『最後に変更した装備』の情報になります。")
						.AddComment("　　従って、次のような場合は、「アイテムデータ」欄の表示は変化しません。")
						.AddComment("　　　１．職業を変更した直後（デフォルトで、「素手」が表示されます）")
						.AddComment("　　　２．データをロードした直後（デフォルトで、一番上の武器が表示されます）")
						.AddComment("　　　３．URL入力をした直後（デフォルトで、一番上の武器が表示されます）")
						.AddComment("　　　４．ある装備を変更した後で、別の装備欄を変更しようとして、しなかったとき")
						.AddComment("　　　　　（あくまでも、最後に『変更した』装備の情報が表示されます）")
						.AddComment("　　なお、希望の装備のアイテムデータを表示させるには、次のようにします。")
						.AddComment("　　　１．一度、希望の装備を別の装備に変える。")
						.AddComment("　　　２．希望の装備に戻す。")
						.AddComment("　　なお、この仕様については、いずれ修正したいと考えております。")
						.AddComment("　　使い勝手が悪いかもしれませんが、今しばらく、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『スキル「クラッシュストライク」のダメージが、GvGYE等で低下していない』")
						.AddComment("　→まず、管理人の方で対人戦関係が検証できていないことをご容赦ください。")
						.AddComment("　　その上で、「クラッシュストライク」については、次のような経緯があります。")
						.AddComment("　　　１．ROratorio様からプログラムを借用した段階で、GvG等のフィールドでも、")
						.AddComment("　　　　　ダメージが低下しないようにプログラムされていた。")
						.AddComment("　　　２．RO公式のGvGYEページにおいて、『攻城戦＆新攻城戦制限解除』スキルに")
						.AddComment("　　　　　　「クラッシュストライク」が含まれていない。")
						.AddComment("　　　３．以上のことから、現在の計算機でも、ダメージが低下しないプログラムのまま。")
						.AddComment("　　これについて、実際のゲームにおいて、ダメージが低下するようであれば、")
						.AddComment("　　お手数ですが、次のことをお知らせいただけると、修正できるかと思います。")
						.AddComment("　　　１．どのフィールドで低下するか（攻城戦、PvP、攻城戦YE、モンスターハウス）")
						.AddComment("　　　２．どの程度低下するか（1/5になるか、あるいは別の割合か）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『インペリアルグローブの「習得スキル設定対象」が機能していない』")
						.AddComment("　→こちらでは現象を確認てきませんでした。")
						.AddComment("　　なお、インペリアルグローブの習得スキル効果は、インペリアルフェザーと同時に")
						.AddComment("　　装備した時のみ発揮されるものと思われますので、今一度装備をご確認いただき、")
						.AddComment("　　それでも現象が発生する場合は、URL出力の結果も併せてお知らせいただけると、")
						.AddComment("　　調査ができるかと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『魔女のスキルカードの効果を設定したい』")
						.AddComment("　→「コンセントレイション」などについては、「二次職支援」設定欄などから可能です。")
						.AddComment("　　攻撃スキルについては、「アイテム(食品/他)」設定欄にある、")
						.AddComment("　　『攻撃魔法スクロールとイグドラシルの葉(対不死リザLv1)を攻撃方法欄に追加』")
						.AddComment("　　という設定を ON にすると、攻撃手段に追加されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『FireFoxのバージョンを69にすると、セーブできなくなった』")
						.AddComment("　→こちらでは現象を確認てきませんでした。")
						.AddComment("　　「避難所Q&A」などをご参照いただき、今一度、ブラウザの設定をご確認いただけると")
						.AddComment("　　幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『装備・カードに除外するチェックをつけて、リストに表示しないようにしてほしい』")
						.AddComment("　→どのようなものを想定されているのか、ちょっとイメージがつきませんでした。")
						.AddComment("　　計算機ページの装備を選択するリストで、特定のアイテムを表示しないようにして")
						.AddComment("　　ほしいということでしょうか？")
						.AddComment("　　その場合は、申し訳ありませんが、ちょっと実現は難しいと思われます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 9, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("ブラジリス等新カード追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『装備欄に白羊宮シリーズが見当たらない』")
						.AddComment("　→こちらの環境では、正しく表示されているように見受けられます。")
						.AddComment("　　一度、計算機ページの再読み込み（F5キー等）を行っていただくと、")
						.AddComment("　　正常に動作するのではないかと思われます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『セイレンMVPカードのバーサークを他職業でもシミュレーションしたい』")
						.AddComment("　→該当の効果は、計算機の「その他の支援/設定 (暫定追加機能)」欄で設定します。")
						.AddComment("　　そちらの欄を開くとある『装備/カードの時限性補助効果～（略）』という欄で、")
						.AddComment("　　「セイレン=ウィンザー(MVP)カード[バーサーク]」を選択していただくと、")
						.AddComment("　　バーサークが発動中の状態で計算されます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 9, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「AC-B44-OS」のオートスペルを設定すると、正常に計算できなかった問題を")
						.AddComment("修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 10, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ミンストレル・ワンダラー　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「白羊宮のスピアー」の ATK が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「イルシオンウィングII」の効果において、精錬ごとにMaxSPがあがる効果が、")
						.AddComment("誤ってMaxHPがあがるようになっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ギガンテス」を左手武器に装着した際、右手武器の情報を参照して効果を")
						.AddComment("計算していた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 10, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("イリュージョンオブラビリンス　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年１１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「アサシン」系統の職業において、「三段掌」発動時の最大ダメージの表示が")
						.AddComment("0 になってしまっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("習得スキル設定対象のカードを設定した際、習得スキル設定欄の強調表示が")
						.AddComment("更新されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("対プレイヤー設定で、「攻城戦YE」を設定した際に、必中HITの計算が誤っていた")
						.AddComment("問題を修正。")
						.AddComment("※従来の攻城戦と異なり、補正がかからないように修正しました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("対プレイヤー設定で、必中HITの計算（敵のFLEEの計算）に、敵のベースレベルを")
						.AddComment("加味しないよう修正。")
						.AddComment("（「FLEE」の設定欄には、ベースレベルによる効果も含まれた値を設定して下さい）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("対プレイヤー設定で、「攻城戦」または「MH（モンスターハウス）」を設定した際に、")
						.AddComment("回避率が補正されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("対プレイヤー設定で、95%FLEEの計算（敵のHITの計算）が、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「堕天司祭の闇光外套」の、特定スキル習得によるペナルティ効果が、")
						.AddComment("誤って過剰に設定されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「降霊術士の手鏡」の、特定スキル習得によるペナルティ効果が、")
						.AddComment("誤って設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("パラディンスキル「シールドチェーン」に、必中効果が乗っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("パラディンスキル「シールドチェーン」の、スキル自体が持つ必中効果が、")
						.AddComment("適切に計算されていなかった問題を修正。")
						.AddComment("※計算機では、最終命中率に＋２０％する計算としています。")
						.AddComment("　つまり、通常の命中率が５％の相手にも、５＋２０＝２５％の命中率なりますが、")
						.AddComment("　もしそうではなく、最低保障として２０％の命中率になるようでしたら、")
						.AddComment("　お知らせいただければ修正できます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ルーンナイトスキル「クラッシュストライク」が、対プレイヤー設定で、")
						.AddComment("「攻城戦YE」を設定した際に、ダメージが減少していなかった問題を修正。")
						.AddComment("※いただいた情報を元に、他の攻撃同様、1/5のダメージになる計算にしています。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ロイヤルガードスキル「イクシードブレイク」が、対プレイヤー設定で、")
						.AddComment("「攻城戦YE」を設定した際に、ダメージが減少していなかった問題を修正。")
						.AddComment("※いただいた情報を元に、他の攻撃同様、1/5のダメージになる計算にしています。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ロイヤルガードスキル「シールドスペル」の設定値に「+170」がなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("影狼／朧スキル「風魔手裏剣・乱華」の詠唱時間が誤っていた問題を修正。")
						.AddComment("※頂いた情報より、次の値を採用しました。")
						.AddComment("　固定詠唱（左からLv1, Lv2, Lv3, Lv4, Lv5）")
						.AddComment("　　1.0秒　1.2秒　1.4秒　1.6秒　1.8秒")
						.AddComment("　変動詠唱（左からLv1, Lv2, Lv3, Lv4, Lv5）")
						.AddComment("　　2.0秒　1.8秒　1.6秒　1.4秒　1.2秒")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『イルシオンアクセにA-Fleeを入れた場合、ライオットチップとのセット効果がでない』")
						.AddComment("　→こちらの環境では、問題がないようでした。")
						.AddComment("　　今一度、装備をご確認いただき、他の部位でA-Fleeをエンチャントしていないかなど、")
						.AddComment("　　ご確認ください。")
						.AddComment("　　（セット効果は、装備全体で１セット分しか発揮されないと思われます）")
						.AddComment("　　もし、それでも問題が再現するようでしたら、URL出力の結果を添えて、")
						.AddComment("　　再度、お知らせくださいますよう、お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『FireFox Quantum 69.0.2 でSaveができない』")
						.AddComment("　→こちらでは現象を確認てきませんでした。")
						.AddComment("　　「避難所Q&A」などをご参照いただき、今一度、ブラウザの設定をご確認いただけると")
						.AddComment("　　幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『蒼き夜行石の先鋭のセット効果が反映されていない』")
						.AddComment("　→こちらの環境では、問題がないようでした。")
						.AddComment("　　今一度、装備をご確認いただき、先鋭1及び先鋭2が正しくエンチャントされているか、")
						.AddComment("　　ご確認ください。")
						.AddComment("　　なお、複数の「蒼き夜行石」を装備しても、セット効果は１個分のみですので、")
						.AddComment("　　ご注意ください。")
						.AddComment("　　（実際のゲーム内でも、そのような仕様だと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 10, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マジカルクロース」が、鎧ではなく肩にかけるものになっていた問題を修正。")
						.AddComment("※この修正により、当該装備を設定してセーブまたはURL出力をしていたデータでは、")
						.AddComment("　肩にかけるものの装備設定が空欄になります。")
						.AddComment("　お手数ですが、正しい装備に設定しなおすよう、お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「混沌のハンターフライ」の効果で、AGIが10上がるごとに上昇するHP量が、")
						.AddComment("誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 11, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("矢、弾データを整理")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("スーパーノービスの、パッシブ持続系スキル「スーパーノービスの魂」状態における、")
						.AddComment("装備制限の解除に関する処理を整理。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「クイック設定」欄を追加（職業パッケージを一度に設定できます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　ソーサラー　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一撃のダメージが 10M を超える場合に、最大攻撃回数が正しく計算されない場合がある")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 11, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年アニバくじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("盾を装備した状態で、カードやエンチャントの設定行った後、")
						.AddComment("二刀流の設定に変更すると、盾の装備情報がクリアされなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("左手武器を装備した状態で、カードやエンチャントの設定行った後、")
						.AddComment("二刀流の設定を解除すると、左手武器の装備情報がクリアされなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャントの設定を行った後、装備の種類を変更した際、")
						.AddComment("エンチャントの設定がクリアされない場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("二刀流の設定を解除した際、カード設定欄などが表示されたままとなる問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 11, 20)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("錆びたアーム　ランダムエンチャント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("焔のマント　ランダムエンチャント対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「デモニッシュソード」を左手に装備した際、精錬値が＋８以上でも、")
						.AddComment("サイズ補正を無視する効果が発揮されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("左手の精錬値を設定した状態で、F5キー等によりページを再読み込みした後、")
						.AddComment("再度、二刀流を可能な職業で左手に武器を設定すると、再読み込み前の精錬値が")
						.AddComment("残ったままとなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『属性鎧を装備中に属性耐性を増やした際、属性倍率の計算がよく分からない』")
						.AddComment("　→お問い合わせいただいた内容を拝見したところ、「属性倍率」と「属性耐性」を、")
						.AddComment("　　同一の要素として『加算の関係』で捉えていらっしゃるようでした。")
						.AddComment("　　実際には、この２つは『乗算の関係』ですので、その点を理解いただければ、")
						.AddComment("　　うまく計算できるようになるかと思います。")
						.AddComment("　　")
						.AddComment("　　順を追って説明します。")
						.AddComment("　　まず、お問い合わせいただいた具体例で、次のような装備例をご提示いただきました。")
						.AddComment("　　　属性倍率：エンジェリングカード（火・水・風・地の倍率＝７５％、他）")
						.AddComment("　　　属性耐性：ガーディアンオブソウル（特定属性の耐性＝７０％）")
						.AddComment("　　そして、この条件から導かれる最終的な属性倍率が、次のようになるのではないかと")
						.AddComment("　　ご質問頂きました。")
						.AddComment("　　　最終倍率　＝　属性倍率　－　属性耐性　＝　７５％　－　７０％　＝　５％")
						.AddComment("　　この点が、実際のゲームの仕様とは、異なる解釈をされているようでした。")
						.AddComment("　　具体的にいえば、実際のゲームの仕様は、次のようになっています。")
						.AddComment("　　　最終倍率　＝　属性倍率　×　（１００％　－　属性耐性）")
						.AddComment("　　　　　　　　＝　７５％　×　（１００％　－　７０％）")
						.AddComment("　　　　　　　　＝　７５％　×　３０％　＝　２２．５％")
						.AddComment("　　このように、「属性耐性」という要素は、「属性倍率」を直接増減させるのではなく、")
						.AddComment("　　「属性倍率」と対等な、かけ合わせられる要素になっています。")
						.AddComment("　　そのため、７５％－７０％＝５％のような結果にはならないようになっています。")
						.AddComment("　　")
						.AddComment("　　ROのゲーム仕様では、装備などについている特殊効果は、ほとんどの場合、")
						.AddComment("　　このような『乗算の関係』にあります。（一部、例外はあります）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 12, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「二次職支援設定」に「魔法力増幅」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年アニバイベント追加アイテム　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("三次職マスタープログラム　レンジャー　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０１９年アニバーサリーパッケージ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("新規ランダムエンチャント対象追加　対応")
						.AddComment("（武器属性と防具属性は今後対応します。今しばらくお待ちください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「アビスワンド」、「アビススタッフ」、「アビスブック」の、")
						.AddComment("精錬によるヒール回復量増加効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「アビスフォックステイル」の、精錬によるヒール回復量増加効果について、")
						.AddComment("増加量の計算が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ルティルススティック-OS」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「月食の装束」の装備レベル制限が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ファントムオブマスカレード　魔剣士タナトスの思念体セット」の、")
						.AddComment("精錬によるＡＴＫ上昇効果を実装。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2019, 12, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『魔女のスキルカードの効果欄を設けてほしい』")
						.AddComment("　→現在、魔女のスキルカードの効果については、個別に設定するようになっています。")
						.AddComment("　　具体的には、支援スキルの「コンセントレイション」などについては、")
						.AddComment("　　「二次職支援」設定欄などから可能です。")
						.AddComment("　　攻撃スキルについては、「アイテム(食品/他)」設定欄にある、")
						.AddComment("　　『攻撃魔法スクロールとイグドラシルの葉(対不死リザLv1)を攻撃方法欄に追加』")
						.AddComment("　　という設定を ON にすると、攻撃手段に追加されます。")
						.AddComment("　　なお、ステータスの設定状況などを参照して、自動的に効果が調整されるような")
						.AddComment("　　設定機能については、今後検討したいと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『ブリッツビートの計算が、ゲーム内の表示と違っていた』")
						.AddComment("　→お問い合わせいただいた内容を拝見したところ、")
						.AddComment("　　「習得スキル」の設定が、正しく行われていないようでした。")
						.AddComment("　　具体的には、お知らせいただいた出力ＵＲＬによると、")
						.AddComment("　　「【習】空飛ぶガラパゴ」と、「【習】与一の肩掛け」を装備しているようでしたが、")
						.AddComment("　　「習得スキル」は一切設定されていませんでした。")
						.AddComment("　　これらの装備には、スキルの習得状況によって発揮される効果がありますが、")
						.AddComment("　　計算機では、それらを計算するには、「習得スキル」欄の設定を行う必要があります。")
						.AddComment("　　「パッシブ持続系」欄の上にある、「習得スキル（装備効果用）」の設定欄を開き、")
						.AddComment("　　該当のスキル（例えば、「ブリッツビート」や「スチールクロウ」）の習得レベルを、")
						.AddComment("　　実際の習得状態に合わせて設定していただくと、正しく計算されるかと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 1, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年２月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年１月１４日　スペシャルエンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("セブン-イレブンヘッドホン　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「試験管ヘアバンド」のスキル「カートトルネード」のダメージ増加効果について、")
						.AddComment("効果量が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「ルーンナイト」で、防具「天秤宮のダイアデム」を装備して、")
						.AddComment("「ファイティングスピリット」の効果を設定した際、。")
						.AddComment("ＡＴＫの追加上昇効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「G-Soul」の説明文において、「SP」であるべきところが、")
						.AddComment("「HP」になっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 1, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("2020/01/28の上限解放アップデート　対応開始")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」の「詠唱/ディレイ」表示に、『INT/2+DEX値』の表示を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「経験値テーブル」ページを刷新（機能的には同じ）加")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 2, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法にスキル「アームズキャノン」を選択すると、正常に計算できない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 2, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『+8増幅つき虹じゃらし、ソロモンのペンダントを装備した状態で、")
						.AddComment("　セイレンウィンザーを相手に、深淵の騎士カードを挿してもダメージが増えない』")
						.AddComment("　→こちらでは問題を確認できませんでした。")
						.AddComment("　　お手数ですが、以下のような点をご確認いただき、")
						.AddComment("　　問題が継続しているようであれば、ＵＲＬ出力の内容を添えて、")
						.AddComment("　　再度、お問い合わせをお願いいたします。")
						.AddComment("　　＜ご確認いただきたい点＞")
						.AddComment("　　　・攻撃方法として、マタタビランスなどの、魔法スキルが選択されて")
						.AddComment("　　　　いないでしょうか？")
						.AddComment("　　　　（深淵の騎士カードは、魔法には効果がありません）")
						.AddComment("　　　・モンスターとして、一般モンスターの方のセイレン＝ウィンザーを")
						.AddComment("　　　　選択されていないでしょうか？")
						.AddComment("　　　　セイレン＝ウィンザーには、一般属性モンスターとボス属性モンスターの")
						.AddComment("　　　　２種類が存在します。")
						.AddComment("　　　　計算機では、以下の名前のモンスターが、ボスモンスターに該当します。")
						.AddComment("　　　　　・セイレン=ウィンザー(MVP)　※生体工学研究所３Ｆに出現するMVP")
						.AddComment("　　　　　・セイレン=ウィンザー(強)　※生体工学研究所３Ｆに出現するボス属性の方")
						.AddComment("　　　　　・セイレン=ウィンザー（獄・強）　※戦死者の墓に出現するボス属性の方")
						.AddComment("　　　　（深淵の騎士カードは、一般モンスターには効果がありません）")
						.AddComment("　　　・ＳＴＲが低い、属性相性が悪いなどの理由から、ダメージが０になって")
						.AddComment("　　　　いませんでしょうか？")
						.AddComment("　　　　（ダメージが低すぎると、カードを挿しても０のままの可能性があります）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 2, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法にスキル「閃光連撃」を選択した際、「大纏崩捶」の最大レベルが")
						.AddComment("5 のままだった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法にスキル「コンボ計算(双龍～)」を選択した際、「大纏崩捶」の最大レベルが")
						.AddComment("5 のままだった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 2, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年３月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("特定のランダムエンチャント対応アイテムでデータを設定してセーブすると、")
						.AddComment("セーブデータがおかしくなり、正常に読み込めなくなる問題を修正。")
						.AddComment("（最近追加された、消耗品でランダムエンチャントを付与するもので発生していました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("特定のランダムエンチャント対応アイテムのセーブデータをロードすると、")
						.AddComment("ランダムエンチャントの種類が限定されず、すべてのエンチャントが設定できてしまう")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 3, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年２月１８日　スペシャルエンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊　２０２０年２月　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ティアマト攻城戦ＹＥ　インフェルノ　報酬追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("鞭を装備した状態で、スキル「シビアレインストーム」を使用した際に、")
						.AddComment("矢の属性が反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「古王グローザカード」と「[大鷲の眼光]未発動状態」を同時に装備した際に、")
						.AddComment("「古王グローザカード」の効果が打ち消される効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『上限解放後のスパノビの計算に必要なデータが何かを知りたい』")
						.AddComment("　→検証等へのご協力ありがとうございます。")
						.AddComment("　　スーパーノービスで検証が必要なデータは、以下のような点です。")
						.AddComment("　　　・新スキルの仕様確認")
						.AddComment("　　　　（「ブレイクスルー」、「トランセンデンス」、「天使さま助けて」）")
						.AddComment("　　　　基本的には公式の説明文の通りだと思いますが、")
						.AddComment("　　　　ベースレベル等で補正がかからないかを確認する必要があります。")
						.AddComment("　　　・HP/SPの実測値（Lv99～）")
						.AddComment("　　　　全レベルでHP/SP係数の修正が入ったらしいので、その確認が必要です。")
						.AddComment("　　なお、申し訳ありませんが、現状では画像を直接ご投稿いただくことはできません。")
						.AddComment("　　（外部の画像アップローダ等に投稿し、そのURLをご連絡いただくことは可能です）")
						.AddComment("　　また、掲示板等の機能についても、現段階では実装予定はございません。")
						.AddComment("　　（管理上の都合によるものです）")
						.AddComment("　　ちなみに、検証データの虚実をご憂慮いただいているようですが、")
						.AddComment("　　これまで皆さまからいただいたデータにそのようなものはありませんでしたし、")
						.AddComment("　　間違いがあれば別の利用者の方からご指摘もいただける環境にありますので、")
						.AddComment("　　管理側としては、さして心配しておりませんので、ご安心ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 3, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年４月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「リベリオン」において、「その他の支援/設定 (暫定追加機能)」の「OTP」で、")
						.AddComment("『シルバー』以上を選択した際に、攻撃速度増加ポーションの効果が、")
						.AddComment("バーサークポーションではなく、ハイスピードポーションで計算されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「スプレッドアタック」のダメージ倍率が、実際よりも低かった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「バニシングバスター」の変動詠唱時間、および固定詠唱時間が、")
						.AddComment("実際とは異なっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「エウロパローブ　パワフルアムダライスカード」において、")
						.AddComment("特定種族に対して魔法ダメージが増加する効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「堕天司祭の闇光外套」の第三エンチャントに、本来エンチャントできないはずの")
						.AddComment("「セイクリッド」と「デスペリア」が選択できた問題を修正。")
						.AddComment("（この対応により、上記の２種類のエンチャントを設定したデータをロードすると、")
						.AddComment("　対象エンチャント欄が未選択の状態になりますので、ご注意ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「猛炎と白魔の指輪」の重量が 0 になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『バーサークのパッシブ効果が選択できません』")
						.AddComment("　→恐らく、セイレン=ウィンザー(MVP)カードを装備した際の設定方法だと思いますが、")
						.AddComment("　　該当の効果は、計算機の「その他の支援/設定 (暫定追加機能)」欄で設定します。")
						.AddComment("　　そちらの欄を開くとある『装備/カードの時限性補助効果～（略）』という欄で、")
						.AddComment("　　「セイレン=ウィンザー(MVP)カード[バーサーク]」を選択していただくと、")
						.AddComment("　　バーサークが発動中の状態で計算されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『複数の箇所で大鷲の眼光の発動を選ぶと、Dex+200の効果が重複され+400される』")
						.AddComment("　→ご指摘の通り、実際のゲームとは違う計算になってしまうのですが、")
						.AddComment("　　申し訳ありませんが、現在の計算機ではその動作で仕様となります。")
						.AddComment("　　お手数ですが、発動／未発動の選択を切り替えることで、")
						.AddComment("　　手動で調整していただくよう、お願いいたします。")
						.AddComment("　　（対応は不可能ではないのですが、かなり大変な作業なのでご容赦ください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 3, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ぴかぴかニャンニャンクラウン」に、誤ったエンチャントが設定できてしまう")
						.AddComment("問題を修正。")
						.AddComment("（該当装備のエンチャントを設定していた方は、念のため、一度装備を設定し直し、")
						.AddComment("　エンチャントの設定をクリアするようにお願いいたします）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年５月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("セーブデータのバージョンアップにより、2020/05/03以前のデータを読み込んだ際、")
						.AddComment("データが強制変更される場合があります。")
						.AddComment("（2020/05/03以前にURL出力したデータも同様です）")
						.AddComment("１）職業「スーパーノービス＋」で、習得スキル欄で削除スキル（下記）を")
						.AddComment("　　設定していた場合、該当スキルの設定状況がクリアされます。")
						.AddComment("　　　対象：フラッシャー、サンドマン、フリージングトラップ")
						.AddComment("２）職業「スーパーノービス＋」で、攻撃手段で削除スキル（下記）を")
						.AddComment("　　設定していた場合、攻撃手段が「通常攻撃」に強制変更されます。")
						.AddComment("　　　対象：フリージングトラップ")
						.AddComment("３）職業「リベリオン」で、攻撃手段が「ハンマーオブゴッド」の場合で、")
						.AddComment("　　『クリムゾンマーカー』の設定が「有り」になっていた場合、")
						.AddComment("　　モンスター状態異常の「烙印状態」の設定が「ＯＮ」になり、")
						.AddComment("　　『クリムゾンマーカー』の設定状況はクリアされます。")
						.AddComment("　　（『クリムゾンマーカー』の設定は、廃止されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「クイック設定」に、全解除系の選択肢を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「クイック設定」で一括設定した際、両手武器の場合は盾の設定を初期化するように変更")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("パッシブ持続系欄で、スキル「海の魂」の習得レベルを 1 以上に設定しても、")
						.AddComment("スキル「大トロ」のクールタイムが短縮されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃手段として、スキル「ハンマーオブゴッド」を選択した際、")
						.AddComment("クリムゾンマーカー指定の有無を設定する欄を変更しても、")
						.AddComment("ダメージが変化しない問題を修正。")
						.AddComment("（クリムゾンマーカーの指定は、モンスター状態異常欄の「烙印状態」欄で")
						.AddComment("　指定するように変更になっています。")
						.AddComment("　そのため、クリムゾンマーカー指定の有無を設定する欄は、削除しました。")
						.AddComment("　また、クリムゾンマーカー指定が設定されているセーブデータを読み込んだ場合、")
						.AddComment("　自動的に「烙印状態」の設定に振り替えるようにしました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ウルズグリーブ」を +8 以上に精錬した際、増えるはずの HP が減少していた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「不吉なソリッドタートル」の経験値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("イグニッションブレイクの検証ページを表示した際、左メニューのリンクが")
						.AddComment("正常に機能しない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「クイック設定」で一括設定する際、ランダムエンチャント入力画面になっていた場合、")
						.AddComment("正常に動作しない場合がある問題に対応。")
						.AddComment("（暫定的に、自動でカード入力画面に切り替わるようにしています）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「クイック設定」で一括設定する際、二刀流装備状態になっていた場合、")
						.AddComment("盾の設定が正しく反映されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『「詠唱シミュレータ」で、固定詠唱%減少の効果が反映されない』")
						.AddComment("　→恐れ入りますが、こちらでは現象を確認できませんでした。")
						.AddComment("　　ちなみに、固定詠唱%減少効果のある装備を設定した後、")
						.AddComment("　　「更新」ボタンは押されましたでしょうか？")
						.AddComment("　　現在の「詠唱シミュレータ」では、自動で再計算されない仕組みになっているため、")
						.AddComment("　　装備を変更された際は、一度「更新」ボタンを押して、再計算する必要があります。")
						.AddComment("　　もし、再計算しても効果が反映されない場合は、")
						.AddComment("　　お手数ですが、URL出力の内容を添えて、")
						.AddComment("　　再度ご連絡いただくようにお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「対プレイヤー設定」欄で、設定できる値の範囲を拡張")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「対プレイヤー設定」欄で、「小型耐性」を 52 以上に設定してデータをセーブ、")
						.AddComment("　またはURL出力すると、データを正常に読み込めない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「二次職支援設定」欄で、「アスムプティオ」を設定した場合に、")
						.AddComment("状態異常への耐性も増加してしまっていた問題を修正。")
						.AddComment("（「アスムプティオ」に限らず、支援スキル等による除算ＭＤＥＦの増減は、")
						.AddComment("　状態異常耐性へ影響しないように修正しました。")
						.AddComment("　もし、実際のゲーム内での動作と違うようでしたら、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「モンスター状態強化」欄で、「アスムプティオ」を設定した場合に、")
						.AddComment("武器「錐」などの、敵のＤＥＦによってＡＴＫが増加する装備のＡＴＫ計算に")
						.AddComment("影響を与えてしまっていた問題を修正。")
						.AddComment("（「アスムプティオ」に限らず、支援スキル等による除算ＤＥＦの増減は、")
						.AddComment("　錐効果へ影響しないように修正しました。")
						.AddComment("　もし、実際のゲーム内での動作と違うようでしたら、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテム特性等で、ＤＥＦ無視を１００％以上確保した場合、")
						.AddComment("武器「錐」などの、敵のＤＥＦによってＡＴＫが増加する装備の計算が、")
						.AddComment("誤っていた問題を修正。")
						.AddComment("　修正後の計算式：増加ＡＴＫ＝除算ＤＥＦ×（１００－ＤＥＦ無視率）÷１００")
						.AddComment("　（（）内がマイナスになっても、そのまま計算）")
						.AddComment("　（その結果、増加ＡＴＫがマイナスになり、実質ＡＴＫが減る場合がある）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「メタリックサウンド」の分割ＨＩＴ数が誤っていた問題を修正。")
						.AddComment("（表示上のＨＩＴ数の問題で、ダメージ自体は修正なし）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「カートレボリューション」に、属性倍率が適用されていた問題を修正。")
						.AddComment("（修正後は、武器ＡＴＫ計算時も強制無属性。つまり、一切属性が乗らない）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_IS_SPEC)
						.AddComment("『属性相性が０％の相手でも、「風魔手裏剣-乱華-」を使用するとダメージがある』")
						.AddComment("　→聖属性武器の「風魔手裏剣・花吹雪」を装備し、聖１属性モンスターを攻撃した際に、")
						.AddComment("　　ダメージが発生するのがゲーム内の動作と違うのではないかとのことでしたが、")
						.AddComment("　　簡単に確認したところ、ゲーム内の動作と同じ結果になっているようでした。")
						.AddComment("　　なお、『属性倍率が０％なのにダメージが発生するのか』という疑問については、")
						.AddComment("　　いわゆる「素手ＡＴＫ」については、属性倍率が０％でもダメージが発生します。")
						.AddComment("　　また、『対人では、聖鎧を着用すると当たらなくなる』とのことでしたが、")
						.AddComment("　　確認した限りでは、計算通りのダメージが発生していました。")
						.AddComment("　　今一度、状況や装備、支援効果などをご確認いただき、")
						.AddComment("　　それでもゲーム内の動作と異なる場合は、")
						.AddComment("　　URL出力の結果を併せてご連絡いただけると、調査ができるかと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("現在のところ、当計算機は、主に下記のブラウザでご利用いただけます。")
						.AddComment("　・Microsoft Edge")
						.AddComment("　・Firefox")
						.AddComment("　・Chrome")
						.AddComment("　・Opera （理論上、動作可能。非推奨）")
						.AddComment("　・Safari （理論上、動作可能。非推奨）")
						.AddComment("　・Internet Explorer （可能か不可能かで言えば、動作可能。非推奨）")
						.AddComment("これらのうち、非推奨となっているものについては、")
						.AddComment("今後、ご利用いただけなくなる可能性が高くなっております。")
						.AddComment("（Internet Explorer などで、新しい技術に対応していないことが増えてきたためです）")
						.AddComment("可能であれば、他のブラウザへのデータ移行をご検討ください。")
						.AddComment("（新規追加の「ブラウザ移行」機能をご利用いただくと、簡単にデータを移行できます）")
						.AddComment("（「ブラウザ移行」機能は、計算機ページの下の方にあります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「ブラウザ移行」機能を追加")
						.AddComment("（計算機ページの下の方にあります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("Internet Explorer で、正常に動作しない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("Internet Explorer で計算機を利用している場合、錐効果がある装備を設定した際に、")
						.AddComment("計算機が正常に動作しなくなる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータページなどが、正常に表示されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のエクセリオンエンチャントにおいて、第１エンチャント枠にエンチャントした際、")
						.AddComment("精錬による追加効果が発揮されない問題を修正。")
						.AddComment("（問題があった対象は、A-Avoid、A-Flee、A-Int、A-Matk、C-HPR、C-SPR、です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「傀儡の腕輪」を装備した際に、スキル「集中力向上」を設定すると、")
						.AddComment("ステータスの数値がゲーム内の数値と食い違っていた問題を修正。")
						.AddComment("（『すべてのステータスが上昇』するアイテムすべてで問題があるのかと思いましたが、")
						.AddComment("　どうも「傀儡の腕輪」のみ、実際のゲームでの内部的な設定が違うようです。")
						.AddComment("　例えば、同じすべてのステータスが上昇する「ダークハンド」では、")
						.AddComment("　上昇量は集中力向上の計算に含まれるようです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("計算機ページの「アイテム情報」表示欄を刷新")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテムデータページに、エンチャント情報を表示するオプションを追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("カードデータページに、エンチャント情報を表示するオプションを追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("一部のデータ定義ファイルをスリム化")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータページに表示されるSTRペナルティ解消STRの計算で、")
						.AddComment("一部に誤りがあった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「大天使の翼」、および「堕天使の翼」において、スロット数の表記が")
						.AddComment("誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年６月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「アイテム情報」を表示した際、一部のセット情報が表示されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「アイテム情報」を表示した際、一部のHTMLタグがそのまま表示されていた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アップデート対応状況ページの、スポアエクスプロージョンの計算式説明が誤っていた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「スーパーノービス＋」の「パッシブ持続系」欄に、")
						.AddComment("スパノビ用の爆裂波動とは別に、通常の爆裂波動を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃対象として「プレイヤー(防御側)」を選択した際、HIT、及び FLEE の計算が")
						.AddComment("誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『被ダメージ計算に属性を追加してほしい（物理-属性なし+全属性　魔法-全属性）")
						.AddComment("　（モンスタースキルに対しての素手ATKを考慮した計算結果を知りたいため）』")
						.AddComment("　→どのようなものを想定されているのか、ちょっとイメージがつきませんでした。")
						.AddComment("　　「被ダメージ計算」とのことなので、敵が○○属性の攻撃をしてきたと仮定して、")
						.AddComment("　　その属性を選択できる機能が欲しいということでしょうか？")
						.AddComment("　　（現状、被ダメージ計算は限定的な計算しかしていないので、結構大変そうです）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スキル修正されたもので現在計算機に未対応のものは、対応が難しいのではなく、")
						.AddComment("　そもそもデータが送られていないということなのでしょうか？』")
						.AddComment("　→基本的には、ご推察のとおり、対応が難しいのではなく、")
						.AddComment("　　データを集められていないだけです。")
						.AddComment("　　（現段階で、上限解放・スキル修正に関する情報で、対応が難しいものは、")
						.AddComment("　　　下記の「ご連絡いただいているものの対応に時間がかかりそうなバグ等」に")
						.AddComment("　　　掲載しているものだけです）")
						.AddComment("　　従いまして、未対応のスキルに関しては、データをいただければ対応できます。")
						.AddComment("　　（管理人の方でも、時間が空いたら検証していきます）")
						.AddComment("　　なお、『スキル内容を強く募集中のものはどれか』というご質問についてですが、")
						.AddComment("　　アップデート対応状況ページの「状況」に欄「未対応」とあるものが、")
						.AddComment("　　おおよそ該当します。")
						.AddComment("　　（「対応済み、実証待ち」の項目については、ほぼ確定の状態です）")
						.AddComment("　　特に検証が足りていない項目としては、以下のような点です。")
						.AddComment("　　・計算式に変更があったスキルの実測ダメージ（エイムドボルトなど）")
						.AddComment("　　・分割ＨＩＴ数（分割ＨＩＴ化されたスキル、元から分割ＨＩＴのスキルのLv追加）")
						.AddComment("　　・スーパーノービス＋のＨＰ／ＳＰ")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("セーブデータのバージョンアップにより、2020/05/03以前のデータを読み込んだ際、")
						.AddComment("データが強制変更される場合があります。")
						.AddComment("（2020/05/03以前にURL出力したデータも同様です）")
						.AddComment("１）職業「スーパーノービス＋」で、習得スキル欄で削除スキル（下記）を")
						.AddComment("　　設定していた場合、該当スキルの設定状況がクリアされます。")
						.AddComment("　　　対象：フラッシャー、サンドマン、フリージングトラップ")
						.AddComment("２）職業「スーパーノービス＋」で、攻撃手段で削除スキル（下記）を")
						.AddComment("　　設定していた場合、攻撃手段が「通常攻撃」に強制変更されます。")
						.AddComment("　　　対象：フリージングトラップ")
						.AddComment("３）職業「リベリオン」で、攻撃手段が「ハンマーオブゴッド」の場合で、")
						.AddComment("　　『クリムゾンマーカー』の設定が「有り」になっていた場合、")
						.AddComment("　　モンスター状態異常の「烙印状態」の設定が「ＯＮ」になり、")
						.AddComment("　　『クリムゾンマーカー』の設定状況はクリアされます。")
						.AddComment("　　（『クリムゾンマーカー』の設定は、廃止されます）")
						.AddComment("４）攻撃手段が「エイムドボルト」の場合で、")
						.AddComment("　　『拘束状態』の設定が「非拘束状態」になっていた場合、")
						.AddComment("　　「通常計算」に設定が変更されます。")
						.AddComment("　　（拘束状態は関係がなくなりました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「氷炎悪神の刃鎌」の、精錬値に依存しない凍結耐性、および発火耐性が、")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「エイムドボルト」のダメージ計算において、習得スキルで「エイムドボルト」を")
						.AddComment("設定していた場合に、誤った計算結果となっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 5, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("2020/01/28の上限解放アップデート　対応中")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 6, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年７月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("生体三次職のMVP（戦死者の墓のMVP）モンスターのデータを追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("生体三次職のモンスター（戦死者の墓のモンスター）の名称について、")
						.AddComment("「○○（獄）」の表記を「○○（三次職）」の表記に変更。")
						.AddComment("（公式ツールのモンスターサーチに合わせました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("一部のデータ定義ファイルをスリム化")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「グラビテーションスタッフ」を装備した際、")
						.AddComment("スキル「グラビテーションフィールド」のダメージ上昇効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「グラビテーションスタッフ　幻滅の思念体シューズ」を装備した際、")
						.AddComment("スキル「グラビテーションフィールド」のダメージ上昇効果が適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「怒りの月夜花」、及び、カード「不吉なタートルG」の、")
						.AddComment("最大SP減少のペナルティ効果が適用されいてなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「チャンピオン」において、習得スキル欄の表示が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("未実装のモンスターの一部のデータが、エラー表示されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拡張表示「所持限界量」において、養子に設定した際の限界量が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテム情報欄において、一部の装備の武器Lvが小数で表示されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「Q-CastFixed」を、イルシオンシールド等の盾に設定した場合、")
						.AddComment("効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("矢「エルフの矢」のＡＴＫが、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『「スポアエクスプロージョン」の不足データ検証は、")
						.AddComment("　素手・装備無しにおけるLv1～10の対ポリンでの使用データと")
						.AddComment("　サファイアリスト１つ・２つ装備でのLv1～Lv10の対ポリンでの使用データがあれば")
						.AddComment("　足りそうでしょうか』")
						.AddComment("　→検証へのご協力、ありがとうございます。")
						.AddComment("　　「スポアエクスプロージョン」の仕様変更については、")
						.AddComment("　　『一般フィールドでの３倍ダメージの撤廃』だと考えております。")
						.AddComment("　　また、現在の計算機では、既に３倍を撤廃した計算をするようにしております。")
						.AddComment("　　従いまして、ご提示の条件でご検証いただければ、ほぼ問題ないかと思います。")
						.AddComment("　　（素手は稀に特殊な扱いがあるため、念のため、武器は装備いただけると幸いです）")
						.AddComment("　　（３倍か否かという大きな差なので、もっと少ないデータでも大丈夫だと思います。")
						.AddComment("　　　ただ、念のため、ダメージがぶれない条件だと幸いです。")
						.AddComment("　　　（高DEX＋未精錬Lv4武器や、マキシマイズパワー＋未精錬武器等））")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スーパーノービスのHP/SP係数の変更に伴う調査をしようと思うのですが、")
						.AddComment("　ステータスやHP/SPが伸びるスキルは無い状態での数値か")
						.AddComment("　ステータスとスキル込みでの数値どちらの方が良いでしょうか。』")
						.AddComment("　→検証へのご協力、ありがとうございます。")
						.AddComment("　　理想だけを申しますと、スキル未習得、ステータス初期値のデータが、")
						.AddComment("　　もっとも確認しやすいです。")
						.AddComment("　　ただ、スキル習得状況とステータス値を全て間違いなくお知らせいただければ、")
						.AddComment("　　逆算可能ですので、ご都合の良い状況で確認いただければ問題ありません。")
						.AddComment("　　（根本的な計算式の変更ではなく、係数の変更程度なので）")
						.AddComment("　　ちなみに、スーパーノービス＋のＨＰとＳＰについては、")
						.AddComment("　　別の方から大量のデータをいただき、ほぼ確定したと思われます。")
						.AddComment("　　（未確認のレベルはありますが、計算式で求まるタイプのようです）")
						.AddComment("　　更新が遅くなってしまい、申し訳ありませんでした。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 6, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("セーブデータのバージョンアップにより、2020/05/03以前のデータを読み込んだ際、")
						.AddComment("データが強制変更される場合があります。")
						.AddComment("（2020/05/03以前にURL出力したデータも同様です）")
						.AddComment("１）職業「スーパーノービス＋」で、習得スキル欄で削除スキル（下記）を")
						.AddComment("　　設定していた場合、該当スキルの設定状況がクリアされます。")
						.AddComment("　　　対象：フラッシャー、サンドマン、フリージングトラップ")
						.AddComment("２）職業「スーパーノービス＋」で、攻撃手段で削除スキル（下記）を")
						.AddComment("　　設定していた場合、攻撃手段が「通常攻撃」に強制変更されます。")
						.AddComment("　　　対象：フリージングトラップ")
						.AddComment("３）職業「リベリオン」で、攻撃手段が「ハンマーオブゴッド」の場合で、")
						.AddComment("　　『クリムゾンマーカー』の設定が「有り」になっていた場合、")
						.AddComment("　　モンスター状態異常の「烙印状態」の設定が「ＯＮ」になり、")
						.AddComment("　　『クリムゾンマーカー』の設定状況はクリアされます。")
						.AddComment("　　（『クリムゾンマーカー』の設定は、廃止されます）")
						.AddComment("（以下は、2020/05/22以前が対象）")
						.AddComment("４）攻撃手段が「エイムドボルト」の場合で、")
						.AddComment("　　『拘束状態』の設定が「非拘束状態」になっていた場合、")
						.AddComment("　　「通常計算」に設定が変更されます。")
						.AddComment("　　（拘束状態は関係がなくなりました）")
						.AddComment("（以下は、2020/06/22以前が対象）")
						.AddComment("５）下記のエンチャント効果が設定されている場合、データが強制変更されます。")
						.AddComment("　　＜対象＞")
						.AddComment("　　　「熊の力」、「光速」、「鋼鎧」、「暴走した魔力」、「大鷲の眼光」、")
						.AddComment("　　　「幸運な日」")
						.AddComment("　　＜変更内容＞")
						.AddComment("　　　セーブデータ等で発動状態が設定されていた場合、自動的にデータを変換します。")
						.AddComment("　　　（エンチャント欄の設定は、一本化されたものに変更されます）")
						.AddComment("　　　（「アイテム時限効果」欄に、自動で設定が追加されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("グラストヘイム EDDA　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「二次職支援設定」に、「ディフェンダー」を追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテムの時限効果設定を行う欄を変更。")
						.AddComment("（「その他の支援/設定 (暫定追加機能)」から、専用の「アイテム時限効果」に移動）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテムの時限効果設定数を、20個へ拡張。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテム情報の説明に、時限効果を設定するボタンを追加。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("下記のエンチャント効果について、設定方法を変更。")
						.AddComment("＜対象＞")
						.AddComment("　「熊の力」、「光速」、「鋼鎧」、「暴走した魔力」、「大鷲の眼光」、「幸運な日」")
						.AddComment("＜変更内容＞")
						.AddComment("　・従来の、発動／未発動の選択を廃止し一本化。")
						.AddComment("　・エンチャント効果の発動は、「アイテム時限効果」欄で設定するように変更。。")
						.AddComment("＜補足＞")
						.AddComment("　・セーブデータ等で発動状態が設定されていた場合、自動的にデータを変換します。")
						.AddComment("　　（エンチャント欄の設定は、一本化されたものに変更されます）")
						.AddComment("　　（「アイテム時限効果」欄に、自動で設定が追加されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のカード名を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『Edgeの最新版(バージョン 83.0.478.50)において、計算機で保存ができない』")
						.AddComment("　→恐れ入りますが、こちらでは、問題を確認できませんでした。")
						.AddComment("　　クッキーの設定箇所が分からなかったとのことですが、")
						.AddComment("　　恐らく、下記のような手順で確認いただけるかと思います。")
						.AddComment("　　１）サイトのアクセス許可設定の確認")
						.AddComment("　　　　ブラウザ右上の『…』の表示をクリックします。")
						.AddComment("　　　　その後、表示されたメニューから『設定(S)』をクリックします。")
						.AddComment("　　　　その後、表示されたメニューから『サイトのアクセス許可』をクリックします。")
						.AddComment("　　　　右側のメニューから『Cookie とサイトデータ』をクリックします。")
						.AddComment("　　　　「Cookie データの保存と読み取りをサイトに許可する」が OFF の場合は、")
						.AddComment("　　　　ON にしてください。")
						.AddComment("　　　　（もしくは、個別に「roratorio-hinanjo.net」を許可してください）")
						.AddComment("　　　　「終了時にクリア」に「roratorio-hinanjo.net」が設定されている場合は、")
						.AddComment("　　　　設定を削除してください。")
						.AddComment("　　２）JavaScript 設定の確認")
						.AddComment("　　　　ブラウザ右上の『…』の表示をクリックします。")
						.AddComment("　　　　その後、表示されたメニューから『設定(S)』をクリックします。")
						.AddComment("　　　　その後、表示されたメニューから『サイトのアクセス許可』をクリックします。")
						.AddComment("　　　　右側のメニューから『JavaScript』をクリックします。")
						.AddComment("　　　　「JavaScript」がブロックされている場合は、許可してください。")
						.AddComment("　　３）ウィルス対策ソフトの確認")
						.AddComment("　　　　お使いのウィルス対策ソフトによっては、特定のサイトのクッキー等を")
						.AddComment("　　　　制限する機能がついている可能性があります。")
						.AddComment("　　　　そのような機能が働くと、正常にデータを保存できない可能性がありますので、")
						.AddComment("　　　　除外の設定などをお試しください。")
						.AddComment("　　　　（詳しくは、お使いのウィルス対策ソフトの説明書をご覧ください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 6, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「カートトルネード」の、スキル「カート改造」習得レベルによる倍率上昇量が、")
						.AddComment("誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「死霊魔術師のニット帽」を装備した際、正常に計算できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「死霊魔術師のニット帽」を装備した際、アイテム情報が表示できない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 7, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテム情報欄に「時限効果設定時に設定欄を表示する」という設定を追加。")
						.AddComment("→設定を「OFF」にすると、アイテム情報欄から時限効果を設定した際にも、")
						.AddComment("　画面がスクロールしなくなります。デフォルトは「ON」です。")
						.AddComment("→現状では設定を保存できないので、新しく画面を開いた場合は、")
						.AddComment("　再度設定するようにしてください。")
						.AddComment("　（職業の変更などの操作では、設定は維持されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("戦闘結果欄の右側に「クイック調整」欄を追加。")
						.AddComment("→時限効果の発動有無を手軽に切り替えられます。")
						.AddComment("　（「アイテム時限効果」欄で設定しているもののみリストアップされます）")
						.AddComment("　（セーブ未対応です。また、職業の変更などでもリセットされます）")
						.AddComment("　（今後、要望等があれば、項目を追加していきます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("精錬祭２０２０　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年８月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("2020/07/07 の、攻城戦YE におけるダメージ等の調整を適用")
						.AddComment("　・ウォーグストライク")
						.AddComment("　　　ダメージ調整　1/10→1/5（他スキルと同一に）")
						.AddComment("　・羅刹破凰撃")
						.AddComment("　　　ダメージ調整　1/10→1/5（他スキルと同一に）")
						.AddComment("　・セルフディストラクション")
						.AddComment("　　　ダメージ調整　1/5→1/10")
						.AddComment("　　　固定詠唱時間調整　補正無し→10秒")
						.AddComment("　　　変動詠唱時間調整　補正無し→10秒")
						.AddComment("　　　（※詠唱時間は短縮装備で短縮されるタイプで処理していますが、")
						.AddComment("　　　　　万が一、一切の短縮ができない固定の場合は、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「グラビテーションフィールド」のダメージが上昇する装備を複数装備した際、")
						.AddComment("効果量の合計が誤って計算され、実際よりも高いダメージが計算されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『暴走した魔力などの設定方式で、旧方式も残してほしい』")
						.AddComment("　→誠に申し訳ありませんが、現状ではかなり難しいと考えております。")
						.AddComment("　　内部処理的な都合であり、非常に心苦しいのですが、")
						.AddComment("　　暴走した魔力等がスロット欄にあると、発動時と未発動の２つの定義が必要になり、")
						.AddComment("　　暴走した魔力とのセット効果を処理するプログラムが二重に必要になったり、")
						.AddComment("　　発動時と未発動で効果が重複計算されないようにプログラムを追加したりなど、")
						.AddComment("　　本来は不要であるはずの処理が増え、バグの原因になったりしてしまいます。")
						.AddComment("　　従来からの操作感が変わることでご不便をおかけしますが、")
						.AddComment("　　何卒、ご理解、ご容赦いただきたくお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 7, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「プロペラ」の DEF が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「フェイタルメナス」のＬｖ６以上における命中率補正が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法として「フェイタルメナス」を選択した際、最終的な命中率が100%を超えると")
						.AddComment("計算結果がおかしくなっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ギロチンクロスでＤＥＦ無視のエンチャントを設定するとダメージが下がる』")
						.AddComment("　→こちらでは、おかしな動作をしている様子は確認できませんでした。")
						.AddComment("　　なお、敵のＤＥＦが高いほど攻撃力が上がる効果のあるものを装備した状態で、")
						.AddComment("　　ＤＥＦ無視効果を追加すると、攻撃力の上昇量が低下し、")
						.AddComment("　　結果として、与えるダメージが低下する場合があります。")
						.AddComment("　　（＋１０古王の双刃などを装備されていないでしょうか？）")
						.AddComment("　　現在の計算機なら、実際のゲームと同じ計算結果になるはずですが、")
						.AddComment("　　異なっているようなら、改めて、お知らせいただければと思います。")
						.AddComment("　　（その場合は、ＵＲＬ出力の内容も合わせてお知らせいただければ助かります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『クイック調整欄は、チェックボックスの方が便利かと思う』")
						.AddComment("　→ご提案ありがとうございます。")
						.AddComment("　　確かに、ON/OFFだけなら、チェックボックスの方が操作性は向上するのですが、")
						.AddComment("　　以下のような懸念があり、現状はセレクトボックスにしています。")
						.AddComment("　　・チェックボックスだと、設定した際にチェックボックスの枠に色付けができない。")
						.AddComment("　　・チェック状態＝設定有効なのか、チェック状態＝設定無効なのかが、")
						.AddComment("　　　直感的に分かりづらい。")
						.AddComment("　　　（機能的には、選択した効果を『OFF』にするものですが、")
						.AddComment("　　　　『チェックを入れる』という操作は『ON』にすることが多いと思うので、")
						.AddComment("　　　　直感的でないかな、と考えています）")
						.AddComment("　　今後、何かスマートな解決策が思いついたら、対応していきたいと思います。")
						.AddComment("　　（一応、試作してみて、容易に変更可能であることは確認しています）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 8, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("拡張表示の「詠唱/ディレイ」にある「ディレイ」の項目について、")
						.AddComment("100%を超える短縮がある場合、0%への切り捨て前の値を追加表示するように変更。")
						.AddComment("（切り捨て前の値を表示するだけなので、計算結果には一切影響ありません）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の防具セットにおいて、精錬による火属性モンスターへのダメージ上昇効果が、")
						.AddComment("計算されていなかった問題を修正。")
						.AddComment("　・「淤加美神の羽衣＋封印されたクトルラナックスカード」")
						.AddComment("　・「覚醒淤加美神の羽衣＋クトルラナックスカード」")
						.AddComment("　・「覚醒淤加美神の羽衣＋封印されたクトルラナックスカード」")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「インペリアルブーツ」の、スキル「シールドスペル」のクールタイム短縮効果が、")
						.AddComment("攻撃手段の「シールドスペルLv1(物理)」、及び「シールドスペルLv2(魔法)」に、")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「スポアエクスプロージョン」のダメージ計算式を訂正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("素手ATKに強制無属性倍率がかかる部分の計算において、切り捨てを切り上げに変更。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 8, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("カードショートカットの選択肢を整理しプログラム処理を更新。")
						.AddComment("（現在では使用されていないと思われる選択肢は削除しました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カードを変更した際、使用可能になるスキルやオートスペルがあっても、")
						.AddComment("装備を変更するまで、攻撃手段欄に追加されない問題を修正。")
						.AddComment("（カードを解除して使用不可になった場合も同様）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「プラエファティオ」のクールタイムが誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「カウンタースラッシュ」の秒間ダメージ計算において、")
						.AddComment("秒間ダメージを「特殊」としていた処理を廃止。")
						.AddComment("（他の攻撃方法と同様に、ディレイ等から秒間ダメージを計算するように修正）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『背徳の思念体シューズには、MDEF＋10の効果はない』")
						.AddComment("　→念のため確認しましたが、公式の露店取引情報に表示される装備情報や、")
						.AddComment("　　実際のゲーム内で右クリックして表示される装備情報では、")
						.AddComment("　　ＭＤＥＦ＋１０の効果は存在するようでした。")
						.AddComment("　　（追加効果ではなく、基本情報としてＤＥＦの横に表示されています）")
						.AddComment("　　もし、実際に装備したときに、ＭＤＥＦ＋１０の効果が発揮されない場合、")
						.AddComment("　　計算機以前に、実際のゲームのバグの可能性があるかと思いますので、")
						.AddComment("　　一度、公式のサポート窓口にご連絡いただいた方が良いかと思います。")
						.AddComment("　　（実物を所有していないため、実際に装備して確認はできませんでした）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『メテオストライクを外した際、攻撃手段にカートレボリューションが残る』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　「アルカナ＋愚者のカード」を設定した際に、")
						.AddComment("　　攻撃手段に「カートレボリューション」が追加されない問題については、")
						.AddComment("　　「バグ対応」に記載のとおり修正いたしました。")
						.AddComment("　　なお、併せてご連絡いただいた、メテオストライクに関する件については、")
						.AddComment("　　次のような流れによるもので、これ自体は期待通りの動作でした。")
						.AddComment("　　　１．アルカナ＋愚者カードを設定")
						.AddComment("　　　　　　→（本来は、このタイミングで）")
						.AddComment("　　　　　　　攻撃手段に「カートレボリューション」が追加される。")
						.AddComment("　　　２．メテオストライクを装備し、習得スキルを設定")
						.AddComment("　　　　　　→攻撃手段に「カートレボリューション（確認用）」が追加される。")
						.AddComment("　　　　　　　（バグが発生していたので、このタイミングで）")
						.AddComment("　　　　　　　攻撃手段に「カートレボリューション」も追加される。")
						.AddComment("　　　３．メテオストライクを外す")
						.AddComment("　　　　　　→攻撃手段から「カートレボリューション（確認用）」が削除される。")
						.AddComment("　　　　　　　結果として、「カートレボリューション」だけが残る。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『【習】という文字のついた装備の意味が分からない』")
						.AddComment("　→説明不足ですみません。")
						.AddComment("　　まず、【習】という文字のついた装備は、特定のスキルを習得している場合に、")
						.AddComment("　　特殊効果が発揮される装備になります。")
						.AddComment("　　例えば、「【習】執行者のシューズ」ならば、「ポイズンリアクト」を習得していると")
						.AddComment("　　「メテオアサルト」で与えるダメージが増加します。")
						.AddComment("　　そして、計算機でこれらの、特定のスキルを習得している場合の効果を設定するには、")
						.AddComment("　　いくつかの設定を行う必要があります。")
						.AddComment("　　ひとつめは、該当のアイテムを装備することです。（当然ですね）")
						.AddComment("　　ふたつめは、「習得スキル（装備効果用）」設定欄で、レベルを設定することです。")
						.AddComment("　　例えば、「【習】執行者のシューズ」なら、「ポイズンリアクト」の習得レベルを、")
						.AddComment("　　お持ちのキャラクターの習得レベルに設定（例えば、Lv10）します。")
						.AddComment("　　なお、この「習得スキル（装備効果用）」設定欄は、職業によって変化します。")
						.AddComment("　　その職業で習得できないスキルは表示されませんので、ご注意ください。")
						.AddComment("　　これらの設定を正しく行うと、期待通りの計算結果が表示されると思います。")
						.AddComment("　　なお、今後、何か説明ページなどを作成したいと考えています。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 8, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊２０２０年８月　対応")
						.AddComment("（頭装備「砂漠の暗殺者」の「武器攻撃力 + 50%」の計算式は暫定）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「アンチマテリアルブラスト」の固定詠唱が設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムセット「虹色のねこじゃらし　ストームナイトカード」を装備した際、")
						.AddComment("スキル「にゃん魂」が未習得の場合にも、ダメージ上昇効果が発生していた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 8, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("計算機の簡単な説明方法ページを作成。")
						.AddComment("（左メニューの「総合計算機(最新)」の下にある「（使用方法）」から移動できます）")
						.AddComment("（今後、暇を見て拡充していこうと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ＥＴアナザー　２０２０年８月　対応")
						.AddComment("（「デウス・エクス・マキナ」にランダムオプションが付く場合は、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("サマーパッケージ２０２０　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「暴威のマフラー」のスロット数が、実際のゲーム内では０にも関わらず、")
						.AddComment("１で登録されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備効果「全ての種族に○○」系の効果について、対プレイヤーで計算した際、")
						.AddComment("ドラム種族に効果が適用されていなかった問題について、下記の修正を適用。")
						.AddComment("　・「物理攻撃時、全ての種族に与えるダメージ＋○○％」の効果がある場合、")
						.AddComment("　　「物理攻撃時、ドラム形プレイヤーに与えるダメージ」を同じ分だけ増減。")
						.AddComment("　・「魔法攻撃時、全ての種族に与えるダメージ＋○○％」の効果がある場合、")
						.AddComment("　　「魔法攻撃時、ドラム形プレイヤーに与えるダメージ」を同じ分だけ増減。")
						.AddComment("　・「全ての種族のモンスターから受けるダメージ－○○％」の効果がある場合、")
						.AddComment("　　「ドラム形プレイヤーから受けるダメージ」を同じ分だけ増減。")
						.AddComment("【注意】")
						.AddComment("　・基本的に、『全ての種族』系は、『ドラムにも効果あり』として対応しました。")
						.AddComment("　・最近の装備については、基本的に対応できたと思いますが、")
						.AddComment("　　古い装備では、データではなくプログラムを書き加えて対応しているものがあり、")
						.AddComment("　　今回の修正が漏れている可能性があります。")
						.AddComment("　　もし、そのような装備に気づかれましたら、連絡フォームよりお知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『時限効果の暴走魔力を設定すると、素MATK部分が異常に高い値になる』")
						.AddComment("　→恐らく、「ＭＡＴＫ」表示欄の左側の数値のことかと思いますが、")
						.AddComment("　　ご連絡いただいたＵＲＬを確認しましたが、特に問題はなさそうでした。")
						.AddComment("　　まず、ＩＮＴ１４２、ＤＥＸ１６６、ＬＵＫ１７ですと、")
						.AddComment("　　ＩＮＴボーナス基礎値＝切り捨て【１４２÷７】＝２０で、")
						.AddComment("　　１４２＋切り捨て【２０×２０÷３　＋　１６６÷５　＋　１７÷３】より、")
						.AddComment("　　ステータスＭＡＴＫは、３１４になります。")
						.AddComment("　　この状態で、「暴走した魔力」が発動すると、ＩＮＴが２００増えますので、")
						.AddComment("　　ＩＮＴ３４２、ＤＥＸ１６６、ＬＵＫ１７となり、")
						.AddComment("　　ＩＮＴボーナス基礎値＝切り捨て【３４２÷７】＝４８で、")
						.AddComment("　　３４２＋切り捨て【４８×４８÷３　＋　１６６÷５　＋　１７÷３】より、")
						.AddComment("　　ステータスＭＡＴＫは、１１４８になるかと思います。")
						.AddComment("　　ゲーム内のステータス画面でも、同様の表示になると思います。")
						.AddComment("　　（スキンによっては、１０００の位が見づらいかもしれません）")
						.AddComment("　　もし、実際のゲーム内と誤差がある、あるいは実測ダメージと誤差がある場合は、")
						.AddComment("　　お手数ですが、実際に確認した値を添えて、ご連絡お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ブラウザのアップデートでセーブが消えた際、変なデータが残った』")
						.AddComment("　→ご連絡ありがとうございます。")
						.AddComment("　　お知らせいただいた文章から察するに、セーブデータが消えた際に、")
						.AddComment("　　何らかの理由で、データの一部だけが残ってしまったのだと思われます。")
						.AddComment("　　復旧には、一度、セーブデータを完全に消去する必要があると考えられますので、")
						.AddComment("　　下記の手順をお試し下さい。")
						.AddComment("　　１．計算機ページの下のほうの「ブラウザ移行」という設定欄を開きます。")
						.AddComment("　　２．「セーブデータ入力」というボタンを押します。")
						.AddComment("　　３．横の欄に下の「==COOKIE====DATAS====NAMES==」と入力します。")
						.AddComment("　　　　（すべて半角です。改行しなくても大丈夫のはずです）")
						.AddComment("　　　　（コピーして貼り付けると良いと思います）")
						.AddComment("　　４．横の「適用」ボタンを押します。")
						.AddComment("　　５．ページが再読み込みされます。")
						.AddComment("　　６．それ以降は、普段通り使用できると思います。")
						.AddComment("　　【注意】")
						.AddComment("　　この操作を行うと、仮に復旧可能なデータがあったとしても、完全に消去されます。")
						.AddComment("　　（復旧できる可能性が僅かにありますが、私（管理人）以外には困難だと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『負傷兵の眼帯＋セイレンMVPｃセットのバーサークを設定する欄がない』")
						.AddComment("　→分かりづらくて申し訳ありません。")
						.AddComment("　　当該欄については、現在は「アイテム時限効果」設定欄に移動したのですが、")
						.AddComment("　　ご指摘の通り、元々の場所では、欄自体を削除してしまっていました。")
						.AddComment("　　新設定欄に移動したことが分かるような表示に修正しました。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 9, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「その他の支援/設定 (暫定追加機能)」設定の「速度減少」に「Ｌｖ４８」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「キューペット」のデータを整理。")
						.AddComment("※一部のキューペットにおいて、公式の露店取引情報ツール等で検索した際、")
						.AddComment("　従来より計算機に設定されている特殊効果が、説明文にないことがあります。")
						.AddComment("　従来通り（？）の効果は、シークレット効果として実装されている可能性を鑑み、")
						.AddComment("　計算機では、『これまで通り、あるものとして計算する』という方針にしています。")
						.AddComment("　『そんなものは無くなった』という場合は、ペットの設定を「ペットなし」にして")
						.AddComment("　ご利用くださいますよう、お願いいたします。")
						.AddComment("　（確証をお持ちの場合は、お知らせいただければ、対応していけると思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("下記のアイテムをランダムオプション対象に追加")
						.AddComment("ゴールデンヘッドギア")
						.AddComment("ゴールデンメイス")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("新規ペット追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("黄金蟲の配置変更　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「緋色のアセイミー」の物理攻撃力が誤っていた問題を修正。")
						.AddComment("（本来は「３０」なのに、誤って「１８０」に設定されていました。")
						.AddComment("　そのため、物理攻撃のダメージが本来より高く計算されていました。")
						.AddComment("　修正後の低下したダメージが正しいダメージとなります。ご注意ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「緋色のアセイミー」に不死属性が設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("戦闘結果計算の、クールタイムを計算する処理において、")
						.AddComment("誤って０．１秒単位までの計算で切り捨てていた問題を修正。")
						.AddComment("※例えば、本来は０．２５秒のクールタイムがあるスキルにおいて、")
						.AddComment("　計算の途中で、０．２秒に切り捨てて計算していました。")
						.AddComment("※この問題により、平均戦闘時間が、本来よりも短く計算されていました。")
						.AddComment("　問題の影響を受けていたケースでは、従来よりも平均戦闘時間が伸びますが、")
						.AddComment("　修正後の平均戦闘時間が、正しい計算結果となります。ご注意ください。")
						.AddComment("※また、例えば、本来、ディレイが０．２２秒、クールタイムも０．２５秒だった場合、")
						.AddComment("　クールタイムが０．２秒に切り捨てられることで、０．２２秒の方のディレイの方が")
						.AddComment("　時間が長いため、画面には０．２２秒のディレイが表示されていました。")
						.AddComment("　このようなケースでも、修正後は０．２５秒のクールタイムが表示されるようになり、")
						.AddComment("　戦闘時間も正しく計算されるようになります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『+8国王シュミッツの制服をつけさせてもスキルディレイが10%しか減少しない』")
						.AddComment("　→「国王シュミッツの制服」の、追加でスキルディレイが減少する効果は、")
						.AddComment("　　単体では発揮されません。")
						.AddComment("　　　「国王シュミッツの制服」、および、「国王シュミッツのマント」を同時に装備し、")
						.AddComment("　　　　かつ、")
						.AddComment("　　　両方の精錬値を＋６以上、または、＋８以上に精錬する、")
						.AddComment("　　という条件を満たした場合のみ、発揮されます。")
						.AddComment("　　（ゲーム内でもそのような仕様だと思いますが、異なる場合は再度お知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 9, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータ一覧、カードデータ一覧が、正常に表示されない場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『カイトをかけた状態でのダメージを見たいが、設定項目が見つからない』")
						.AddComment("　→攻撃対象に「カイト」がかかった状態でのダメージを計算する場合は、")
						.AddComment("　　「モンスター状態異常設定」欄にある「カイト（ダメージ増加）」をＯＮにすると、")
						.AddComment("　　計算できるかと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『魔法反射系の反射ダメージや、敵の使用スキルによる被ダメージの計算は実装可能か』")
						.AddComment("　→不可能ではないと思いますが、かなり難しいかと思います。")
						.AddComment("　　詳細な検証データがなく、モンスターの場合、使用するスキルレベルも未調査です。")
						.AddComment("　　また、相手がプレイヤーとなると、装備の特殊効果が多様化しているため、")
						.AddComment("　　画面の右側に、計算機をもう一個設置するレベルで改造が必要になると思います。")
						.AddComment("　　実際に作り始めると、恐らく、さらに色々な問題も出てくるかと思いますので、")
						.AddComment("　　現状では、かなり難しいです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『深淵の回廊や夢幻のモブ情報の追加予定はありますでしょうか』")
						.AddComment("　→以前から、よくお問い合わせいただく内容で、回答を濁していたのですが、")
						.AddComment("　　『現状の公式の「モンスターサーチ」ツールで検索できないモンスター』については、")
						.AddComment("　　基本的に追加しない方針です。")
						.AddComment("　　あしからず、ご了承ください。")
						.AddComment("　　（もし、検索できるモンスターで登録漏れがある場合は、お知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 9, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「モンスター手入力設定」を複数管理できるように拡張")
						.AddComment("※細かい操作方法などは、こちらのヘルプページをご覧ください。")
						.AddComment("※これまでにない方式の改造なので、色々とバグが起きる可能性があります。")
						.AddComment("　もし、怪しい動きを見つけられた場合は、ご連絡いただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年１０月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『セブンイレブンヘッドホンの速度増加エンチャントは、＋４％ではないでしょうか』")
						.AddComment("　→表記が紛らわしいのですが、当該装備に付与できるエンチャントは、")
						.AddComment("　　「攻撃速度４」という名前で、その効果は『攻撃速度＋１０％』となっています。")
						.AddComment("　　（公式サイトなどでも再度確認しましたが、間違いなさそうです）")
						.AddComment("　　当計算機では、本家ROratorio様時代からの慣例を踏襲し、")
						.AddComment("　　『攻撃速度＋１０％』の方を表示する仕様としています。")
						.AddComment("　　慣れない間は紛らわしいかもしれませんが、あしからず、ご了承ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 9, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ペンダントオブハーモニー」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「対プレイヤー設定」で、ベースレベルが１７５までしか選択できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ガーディアンオブソウルの追加ボーナスが１２５で反映される』")
						.AddComment("　→こちらでは、状況を確認できませんでした。")
						.AddComment("　　対象となるステータスを見間違えていないかなど、今一度ご確認ください。")
						.AddComment("　　なお、追加ボーナスの計算は、対象ステータスを合算した値で判定しています。")
						.AddComment("　　例えば、ＳＴＲ１２５、ＬＵＫ１の場合、")
						.AddComment("　　　【（１２５＋１）÷１８】＝７")
						.AddComment("　　という計算です。（【】は整数切り捨て）")
						.AddComment("　　　【１２５÷１８】＋【１÷１８】")
						.AddComment("　　ではないので、ご注意ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 9, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2020/09/29 の星帝実装アップデートで、職業「拳聖」の『祝福系』スキルの効果が")
						.AddComment("変更となりました。")
						.AddComment("これに伴い、同日以前のセーブデータを読み込んだ際、「パッシブ持続系」設定にある")
						.AddComment("「～の祝福」の設定値が０にリセットされますので、ご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("2020/09/29の星帝／ソウルリーパー実装　対応中")
						.AddComment("（状況は、こちらをご参照ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「性能カスタマイズ（ステータス関連）」欄に『消費ＳＰ』を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「性能カスタマイズ（防御関連）」欄に『ボス／一般耐性』を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「性能カスタマイズ（スキル関連）」欄に『ベースレベル条件』を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「性能カスタマイズ（スキル関連）」欄に『消費ＳＰ』を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("「太陽の祝福」、「月の祝福」、「星の祝福」の効果変更対応")
						.AddComment("（現状、ステータス上昇効果は、「集中力向上」の計算に含まれるようにしています。")
						.AddComment("　もし、実際のゲームで含まれないようであれば、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("「太陽と月と星の感情」、「太陽と月と星の憎しみ」の詠唱時間変更対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法にコンボ系スキルを選択した際、一部のスキルレベルが、")
						.AddComment("セーブ／ロードで正常に保存／読込されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「詠唱シミュレータ」において、消費ＳＰの計算が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("プリースト系の職業に置いて、「習得スキル設定」欄に、「セイフティウォール」が")
						.AddComment("存在しなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「拳聖」、および、「ソウルリンカー」の「パッシブ持続系」設定欄を整理。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2020/10/01 の計算機の更新で、下記の点を変更しました。")
						.AddComment("（既に設定していたセーブデータは、自動で振り替えられます）")
						.AddComment("　・攻撃手段「太陽爆発」における「太陽の光」スキルなど、")
						.AddComment("　　威力を上昇させる『○○の光』系スキルのレベルについて、")
						.AddComment("　　攻撃手段欄での設定から、「パッシブ持続系」欄での設定に変更しました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備効果「武器攻撃力＋○○％」の効果の計算を修正。")
						.AddComment("＜旧計算＞")
						.AddComment("　武器のＡＴＫ、武器レベルとＤＥＸによる補正、ＳＴＲペナルティを計算した後、")
						.AddComment("　その部分にだけ適用。")
						.AddComment("　ステータスのＡＴＫや装備効果のＡＴＫ増加、ＳＴＲボーナスなどには乗らない計算。")
						.AddComment("＜修正後＞")
						.AddComment("　武器のＡＴＫ、武器レベルとＤＥＸによる補正、ＳＴＲペナルティを計算した後、")
						.AddComment("　ステータスのＡＴＫとＳＴＲボーナス、精錬ＡＴＫを含めて、適用。")
						.AddComment("　装備効果のＡＴＫ増加には乗らない計算。")
						.AddComment("　（遠距離武器の精錬ＡＴＫ、左手武器の精錬ＡＴＫは検証できていないため、")
						.AddComment("　　乗らないままで計算）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備効果「武器攻撃力＋○○％」の効果が、クリティカル攻撃に適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「星帝」において、「太陽と月と星の悪魔」の効果が、")
						.AddComment("ジョブレベル５０以上でなければ適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「星帝」の基本ＡＳＰＤを実測値に修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「星帝」、または、「ソウルリーパー」で、盾を装備した際、")
						.AddComment("ＡＳＰＤが正しく計算されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「拳聖」の祝福系スキルの効果が、集中力向上の計算に含まれないように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「コル・コアヘッドフォン」にＭＤＥＦが設定されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「死霊爆発」のダメージが、常に「死霊憑依」状態で計算されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_GENERAL)
						.AddComment("2020/09/29の星帝／ソウルリーパー実装　対応中")
						.AddComment("（状況は、こちらをご参照ください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("チュンイーの霊　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("【（ＭＤ）特訓の間】　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「イリュージョンデスナイフ」のレベル１７０以上での追加効果について、")
						.AddComment("アイテム説明が誤っていた問題を修正。")
						.AddComment("（効果自体は変化ありません）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業の判定に関する致命的な問題を修正")
						.AddComment("（弾丸装備欄がない、一部の装備効果の計算が違うなどの問題がありました）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("テコン系職業で武器に属性付与し、念属性モンスターに攻撃した際、")
						.AddComment("素手ＡＴＫが減少しないように修正。")
						.AddComment("（暖かい風の属性付与は、素手ＡＴＫにもかかる）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("素手ＡＴＫへの属性倍率適用時の切り捨て処理を調整。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「ソウルリーパー」が、武器「ラフィネスタッフ」を装備できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ティオアプチャギ」を、遠距離攻撃に修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ティオアプチャギ」の秒間ダメージを通常計算に修正。")
						.AddComment("（「ティオアプチャギ（ダッシュ中）」は除く）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「創世の書」を、遠距離攻撃に修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「死霊爆発」のスキルディレイ、及び、クールタイムを修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スケルタル・マッスルイベント　新規アイテム　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スケルタル・マッスルイベント　スペシャルエンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("新規ペット追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年１１月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「魂の蓄積」の変動詠唱時間、及び、固定詠唱時間を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 10, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("新規ペット追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「コーカサススカラバ」、および、「コーカサススカラバの卵」の、")
						.AddComment("読み仮名（および、それに基づく整列順）が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拳聖の『○○の怒り』系スキルについて、ＨＰ条件の値が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拳聖の『○○の怒り』系スキルについて、攻撃対象に「プレイヤー（防御側）」を")
						.AddComment("選択した場合、ＨＰ等の条件を判定していた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拳聖の『○○の怒り』系スキルについて、計算順序を変更。")
						.AddComment("従来は、必中ダメージ等を計算した上で倍率を適用していたものを、")
						.AddComment("基本的なＡＴＫを計算する段階で適用するように変更。")
						.AddComment("（これにより、必中ダメージやエンチャントブレイドには効果がない計算になりました。")
						.AddComment("　通常攻撃や「新星爆発」、「紅焔脚」の実測データ等を元に変更しましたが、")
						.AddComment("実際のゲームと一致しないケースがあれば、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アクセサリの「半龍王女の指輪」がアクセサリ２にしか選べない』")
						.AddComment("　→公式ツールの情報によれば、「半龍王女の指輪」はアクセサリ２にのみ")
						.AddComment("　　装備可能なアイテムと思われます。")
						.AddComment("　　ただ、現物は露店ですら一度も見たことがないので、もし現物をお持ちで、")
						.AddComment("　　アクセサリ１にも装備可能ということでしたら、別途、お知らせください。")
						.AddComment("　　（その場合、公式サポートにもご連絡いただいた方がよいかと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 11, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2020/11/10 の更新で、ランダムオプション関連のプログラムを大幅修正しました。")
						.AddComment("（操作方法は変わりませんが、内部処理が大きく変わっています）")
						.AddComment("基本的な処理は確認していますが、何かお気づきの点がありましたら、")
						.AddComment("お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("新規ペット追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("大罪武器　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("大罪武器エンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備等のオートスペルにおいて、『精錬値が○○以上』などの条件がある場合、")
						.AddComment("攻撃方法欄への表示、および、オートスペルの自動設定が利用できなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備を変更した際、攻撃方法欄の選択状態がリセットされてしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拳聖の『○○の怒り』系スキルについて、複数の『○○の怒り』を設定した場合、")
						.AddComment("適切な『○○の怒り』が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拳聖の『○○の怒り』系スキルの効果が、オートスペルに適用されていなかった")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 11, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("オートマティック装備　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("オートマティックエンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_CARD)
						.AddComment("エピソード　賢者の遺産　新規カード　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("エピソード　賢者の遺産　新規モンスター　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 11, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「一次職支援設定」欄に、「ラウドボイス」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「二次職支援設定」欄に、「オートガード」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「二次職支援設定」欄に、「クローズコンファイン」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２０年アニバくじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("浮遊するアーティファクト　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ＵＲＬで直接アクセスした際に、読込エラーが発生する場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ガンスリンガースキル「スプレッドアタック」の詠唱時間が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ガンスリンガースキル「ダスト」の詠唱時間が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ガンスリンガースキル「トラッキング」の詠唱時間が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ガンスリンガースキル「ピアーシングショット」のスキル倍率が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「オートガード」の効果が計算されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『セーブ数をもっと増やしてもらえないでしょうか？』")
						.AddComment("　→もしかすると、ご存じないかもしれませんが、")
						.AddComment("　　現在の計算機のセーブ数は、最大５００となっています。")
						.AddComment("　　計算機の下の方にある「計算機の設定」という設定欄を開き、")
						.AddComment("　　「セーブデータの保存数」を選び、「設定の決定＆保存」ボタンを押すと、")
						.AddComment("　　選択した保存数までセーブすることができるようになります。")
						.AddComment("　　もし、そちらは既にご存じで、その上でさらに増枠をご希望とのことでしたら、")
						.AddComment("　　『増枠は難しい』という回答になります。")
						.AddComment("　　ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『新Edgeに移行してから、計算機のセーブ機能が使えなくなっています。")
						.AddComment("　何らかの設定変更や操作が必要なのでしょうか？』")
						.AddComment("　→『新Edgeに移行』というのが、どのような操作なのか曖昧ですが、")
						.AddComment("　　考えられる可能性をいくつか挙げておきます。")
						.AddComment("　　")
						.AddComment("　　Ａ．『元々インストールしていたEdgeを、最新バージョンにアップデートした』")
						.AddComment("　　　　通常は、設定変更の必要はありません。")
						.AddComment("　　　　ただ、アップデートで設定が強制変更される可能性は否定できませんので、")
						.AddComment("　　　　念のため、下記の設定の確認をお試しください。")
						.AddComment("　　Ｂ．『新たにEdgeをインストールして使い始めた』")
						.AddComment("　　　　場合によっては、設定の変更が必要になるかもしれません。")
						.AddComment("　　　　下記の設定の確認をお試しください。")
						.AddComment("　　Ｃ．『Windowsアップデート等で、Chromium版のEdgeにアップデートした』")
						.AddComment("　　　　通常の利用方法でも、Windowsアップデートにより、")
						.AddComment("　　　　自動的にChromium版のEdgeに置き換わる場合があります。")
						.AddComment("　　　　（Microsoft社の方針なので、正常な動作です）")
						.AddComment("　　　　過去に、『Chromiumアップデートにより保存できなくなった』という")
						.AddComment("　　　　ご連絡をいただいたことがあり、その方の情報によると、")
						.AddComment("　　　　『一度、Cookieを削除することで改善された』とのことでした。")
						.AddComment("　　　　もし、こちらに該当する場合は、Cookieの削除もお試しください。")
						.AddComment("　　")
						.AddComment("　　＜設定の確認と変更方法＞")
						.AddComment("　　　１．Edgeのメニュー（右上の『…』マーク）から「設定(S)」を選ぶ。")
						.AddComment("　　　２．画面左の検索欄に「cookie」と入力する。")
						.AddComment("　　　３．表示された「Cookieとサイトデータ」設定が、『許可済み』であることを")
						.AddComment("　　　　　確認する。")
						.AddComment("　　　４．表示された「JavaScript」設定が、『許可済み』であることを確認する。")
						.AddComment("　　　※『許可済み』でない場合は、設定をクリックすると変更画面が開きます。")
						.AddComment("　　")
						.AddComment("　　＜Cookieの削除方法＞")
						.AddComment("　　　※この操作を行うと、セーブされたデータ、および計算機の設定が全て消えます。")
						.AddComment("　　　１．Edgeのメニュー（右上の『…』マーク）から「設定(S)」を選ぶ。")
						.AddComment("　　　２．画面左の検索欄に「cookie」と入力する。")
						.AddComment("　　　３．表示された「Cookieとサイトデータ」をクリックする。")
						.AddComment("　　　４．「すべてのCookieとサイトデータを表示する」をクリックする。")
						.AddComment("　　　５．「roratorio-hinanjo.net」という項目があるはずなので、")
						.AddComment("　　　　　その項目の右側にある『ゴミ箱』のアイコンをクリックする。")
						.AddComment("　　　６．Edgeを一度終了し、再度起動する。")
						.AddComment("　　")
						.AddComment("　　＜その他の注意事項＞")
						.AddComment("　　　・「終了時にクリア」などの設定が有効になっていると、")
						.AddComment("　　　　Edgeを閉じた時などにデータが消えますので、ご注意ください。")
						.AddComment("　　　・InPrivateウィンドウを使用すると、セーブ機能は利用できません。")
						.AddComment("　　　　通常のウィンドウでご利用ください。")
						.AddComment("　　　　（ＵＲＬ出力などの機能は利用できます）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 11, 24)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテムデータ一覧で、『エンチャント情報を表示』をＯＮにした際、")
						.AddComment("正常にデータが表示されない場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備を変更した際に、攻撃スキルのレベルや補助選択欄がリセットされる問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「八方苦無」のダメージ計算で、属性相性が正しく計算されない問題を修正。")
						.AddComment("（従来は、基礎ダメージ計算において、属性相性を無視する処理を行っていましたが、")
						.AddComment("　修正後は、一般的なスキル同様、武器や付与の属性を受けるようにしました。")
						.AddComment("　ただし、最終的に『苦無の属性』がかかるのは変わらないので、")
						.AddComment("　例えば、『水属性武器』で『烈火の苦無』を装備し『火４属性モンスター』に")
						.AddComment("　使用すると、最終的なダメージは０（計算機ではマイナス表示）になります）")
						.AddComment("（苦無系スキルの属性計算が変わっているようなので、他も調査中です）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 12, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加　対応")
						.AddComment("（思念体シューズ）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("シーズンエンチャント追加　対応")
						.AddComment("（古びた頭装備、名も無き剣士のブーツ、戦死者のマント、レクイエム装備）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 12, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("１８ｔｈアニバーサリーパッケージ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 12, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ツインブレイズ（ＢｉｔＣａｓｈキャンペーン景品）　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("必中攻撃が１００％を超える場合に、オートスペルのダメージ計算が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2020, 12, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("蜃気楼の塔ＹＥ　新規アイテム　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント　追加")
						.AddComment("（名も無き暗殺者のマフラー）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテム時限効果「ジターバグカード」の効果が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 1, 20)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("更新履歴データを整理")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ラビリンスエンチャント追加（グループ２）　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加（2021/01/19）　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年２月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("思念体武器アップグレード　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("大罪武器シリーズのランダムオプションにおいて、")
						.AddComment("『ヒール系スキル使用時、HP回復量増加』の効果が、")
						.AddComment("20%までしか選択できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『リベリオンのATKとハンドガン装備時の基本ASPDに誤差がある』")
						.AddComment("　→まずATKについては、ご推察の通り、『エクラージュ支援』による差分と思われます。")
						.AddComment("　　（改めて確認しましたが、ゲーム内ではステータス欄に加算表示されないようです。")
						.AddComment("　　　実際には効果が乗りますので、計算結果は一致しています）")
						.AddComment("　　一方で、ハンドガンのASPDについては、以前より複数の方から、")
						.AddComment("　　誤差があるご指摘をいただいています。")
						.AddComment("　　相当放置してしまっているのですが、今後、検証してデータを集め、")
						.AddComment("　　修正したいと考えております。")
						.AddComment("　　今しばらく、お待ちください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『「太陽と月と星の融合」のダメージ計算が誤っている』")
						.AddComment("　→ゲーム内で実測してきましたが、問題はなさそうでした。")
						.AddComment("　　これまで通り、下記の仕様で変更なしだと思います。")
						.AddComment("　　・DEF無視（減算DEFも無視）")
						.AddComment("　　・必中")
						.AddComment("　　・100%クリティカルではない")
						.AddComment("　　・クリティカルダメージの計算も通常通り")
						.AddComment("　　ただ、以下の点は、装備を持っておらず、確認できませんでした。")
						.AddComment("　　・錐効果を持つ装備を使用した場合のダメージも一致しているか")
						.AddComment("　　なお、余談ですが、現象を確認された際に、")
						.AddComment("　　『リス耳フード帽』を装備していたりしませんでしたでしょうか？")
						.AddComment("　　当該装備には、装備自体のクリティカルダメージ上昇のほか、")
						.AddComment("　　攻撃時に追加で発動するクリティカルダメージ上昇効果もあります。")
						.AddComment("　　「アイテム時限効果」欄の「リス耳フード帽[～略～]」の効果をＯＮにするなど、")
						.AddComment("　　計算機の設定を、今一度、ご確認いただき、問題が継続するようなら、")
						.AddComment("　　ＵＲＬ出力も添えて、再度、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『コンボディレイ計算用の数値を表示してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的にもロジック的にも、実現は可能だと思います。")
						.AddComment("　　表示個所や表示方法を検討いたしますので、今しばらく、お待ちください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 1, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「カスタム表示」欄を追加")
						.AddComment("（計算機ページの右側にあります。位置が固定の、いわゆるフローティングメニューです）")
						.AddComment("（これに伴い、「拡張表示」は同欄に統合しました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」の「詠唱/ディレイ」欄に、「コンボ短縮」の項目を追加")
						.AddComment("（連打掌後など、コンボ待ち受けによる硬直時間の短縮量です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加（2021/01/26）　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「Ｓｐｅｃｉａｌ○○」シリーズにおける精錬による効果が、")
						.AddComment("特定のエンチャント箇所では適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「失望の思念体シューズ＋ポエニテンティア」において、")
						.AddComment("ホーリーライトのダメージ増加効果が、魂版のホーリーライトには、")
						.AddComment("適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『古王グローザについて、データを計算機に実装することはできないか？』")
						.AddComment("　→申し訳ありませんが、現状では、")
						.AddComment("　　『現状の公式の「モンスターサーチ」ツールで検索できないモンスター』については、")
						.AddComment("　　基本的に追加しない方針です。")
						.AddComment("　　あしからず、ご了承ください。")
						.AddComment("　　（Ｑ＆Ａの関連する項目も修正しました）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 1, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ペット関係の特殊効果がおかしくなってしまっていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 1, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「カスタム表示」欄の文字サイズ変更機能を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」に、「ステータス合計」の項目を追加")
						.AddComment("（現状は、「魔女のスキルカード」と「ガーディアンオブソウル」のみ）")
						.AddComment("（今後、順次追加していきます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「○○属性付与（鎧）」を設定した状態で、")
						.AddComment("鎧に属性を付与するカード（エンジェリング等）を設定した場合、")
						.AddComment("計算機の動作が停止してしまう問題に『応急処置』を適用。")
						.AddComment("（最低限の処置として、停止しないようにはしましたが、")
						.AddComment("　正しい属性が計算されない可能性があります。")
						.AddComment("　プログラムの修正に、少々時間がかかりそうなので、")
						.AddComment("　お手数ですが、重複しないように調整してご利用ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『マンドラなどの耐性を状態異常耐性に載せることはできないでしょうか？』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的にもロジック的にも、実現は可能です。")
						.AddComment("　　ただ、ステータスによる耐性の計算式に確信がないなので、")
						.AddComment("　　確信をお持ちの計算式をお知らせいただければ、対応できると思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スパノビ魂による全武器装備可能の中にないものがある』")
						.AddComment("　→こちらでは、特に問題がないように見えました。")
						.AddComment("　　ちなみに、「スーパーノービスの魂」の付与により装備可能になるものは、")
						.AddComment("　　「パッシブ持続系」欄で「スーパーノービスの魂」をＯＮにしないと、")
						.AddComment("　　表示されない仕組みになっています。")
						.AddComment("　　設定ミスなどがないかをご確認いただき、問題が継続するようなら、")
						.AddComment("　　（可能なら）ＵＲＬ出力も添えて、再度、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『右手武器と左手武器を入れ替えるボタンがほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的にもロジック的にも、実現は可能だと思います。")
						.AddComment("　　設置個所などを検討いたしますので、今しばらく、お待ちください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『「カスタム表示」の横長表示や移動は可能でしょうか？』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　不可能ではないと思いますが、パッと手軽に実装は厳しそうです。")
						.AddComment("　　代わりに、文字サイズを変更する機能を追加してみましたので、")
						.AddComment("　　そちらをお試しいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『非PCとPCでわけるのであれば、PC側の人間か一覧側の人間かを削除してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　まず、前提として、例えば「物理特化」の表では、次のデータを扱います。")
						.AddComment("　　　１）人間形モンスターに与えるダメージ＋○○％")
						.AddComment("　　　２）人間形モンスターに与えるダメージ＋○○％（プレイヤーには発動しない）")
						.AddComment("　　　３）人間形プレイヤーに与えるダメージ＋○○％【注１】")
						.AddComment("　　「種族」の列には、１と２が個別に表示されています。")
						.AddComment("　　「対ＰＣ」の列には、３が表示されています。")
						.AddComment("　　（『１＋２の値』と『１＋３の値』の２通りの表示ではないです）")
						.AddComment("　　従って、どれかを削除すると、そのデータの数値が分からなくなるため、")
						.AddComment("　　ご提案の内容をそのまま適用するのは、難しいかと思います。")
						.AddComment("　　代案として、対人データをまとめた項目を作る検討をしていますが、")
						.AddComment("　　意味を取り違えているようでしたら、お知らせください。")
						.AddComment("　　【注１】")
						.AddComment("　　　現状、３に該当するデータはありません。")
						.AddComment("　　　『ドラム形プレイヤーへのダメージ＋○○％』が存在するため、")
						.AddComment("　　　念のため、欄を設けてあります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『拡張表示が右に移動されたことで、履歴、素数判定と表示がかぶってしまっている』")
						.AddComment("　→恐らく、計算機の利用をサポートするツールを使われているのだと思いますが、")
						.AddComment("　　当サイトの管理外となりますので、こちらでは対応できません。")
						.AddComment("　　お手数ですが、当該ツールの開発者の方にご連絡ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_THANKS)
						.AddComment("以前より、ギフトのご提案などを頂いており、")
						.AddComment("皆様のお心遣いに感謝しております。")
						.AddComment("しかしながら、当サイトは、完全フリーで運営しておりますゆえ、")
						.AddComment("恐縮ながら、お気持ちだけ頂戴しております。")
						.AddComment("どうか、皆様のご遊戯にお使いください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 2, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」の「ステータス合計」に対象アイテムを追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年バレンタインイベント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテム名の表示を一部修正")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「コンパルションディスカウント」の名称が誤っていた問題を修正")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ミラクル精錬計算機に改良エルニウムなどを追加してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　まず、ミラクル精錬計算機自体、作ったまま放置していたので恐縮なのですが、")
						.AddComment("　　『失敗時に精錬値が１下がる』系のアイテムを使用するケースについて、")
						.AddComment("　　私の知識では『＋○○になる期待値』の計算式が立てられません。")
						.AddComment("　　（『失敗時に精錬値が０になる』ミラクル精錬の計算は、")
						.AddComment("　　　確率計算自体は通常と同じ方式で、消費武具数を０にすることで対応しています）")
						.AddComment("　　もし、確信のある計算式をご存じであれば、ご連絡いただければ対応は検討できます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 2, 17)
			.AddLogComment(
				cmtNotice2020051401
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("計算機の２面表示機能を仮実装")
						.AddComment("（左のメニューから選択できます）")
						.AddComment("（ご利用前には、必ず「注意事項」をご確認ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」に「対人情報」欄を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年３月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のアイテムの説明文が正しく表示されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のスキル名の誤字等を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("『人間形モンスターから受けるダメージ－○○％（プレイヤーには発動しない）』")
						.AddComment("の効果が、正しく計算されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("拡張表示「経験値」の計算が正常に動作していなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『FANBOX 等はする予定はあるでしょうか』")
						.AddComment("　→恐れ入りますが、現在のところ、予定はございません。")
						.AddComment("　　ご支援のお気持ちだけ、いただいております。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 3, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年ひなまつりイベント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("『セイレン=ウィンザー（三次職）（MVP）』等のモンスターについて、")
						.AddComment("レクイエム系装備の効果が適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 3, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("二刀流状態での、左右の武器の入れ替えボタンを追加")
						.AddComment("（二刀流状態でのみ、左手武器種別の選択ボックスの右にボタンが表示されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」の『（非PC）』系効果の表示を調整")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「拡張表示」の『詠唱/ディレイ』にある『全般－ＳＰ消費量』に実合計表示を追加")
						.AddComment("（SP消費軽減が100%を超える場合に表示されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年４月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『全種族に対して魔法特化の効果が、人間（非PC）だけ0%となっている』")
						.AddComment("　→見づらい表示で申し訳ありません。")
						.AddComment("　　『人間（非PC）』欄に表示されるのは、エンチャントなどにある、")
						.AddComment("　　『魔法攻撃時、人間形モンスターに与えるダメージ増加（プレイヤーには発動しない）』")
						.AddComment("　　などの、『プレイヤーには発動しない』と注記されているものだけの効果量です。")
						.AddComment("　　（大罪武器のランダムエンチャントなどに存在します）")
						.AddComment("　　計算機では、攻撃対象によって計算に含める／含めないを判定していますが、")
						.AddComment("　　「拡張表示」欄では、個別の表示のほうが利便性がよいかと考え、分けて表示しています。")
						.AddComment("　　なお、意味の誤解が何件か起きているようなので、表示の構成を見直しました。")
						.AddComment("　　多少は誤解しづらい表示になったかと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『「性能カスタマイズ」に、「武器攻撃力+XX%」は作成可能でしょうか』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的には、可能です。")
						.AddComment("　　ただ、「武器攻撃力+XX%」の効果が一部未確認ですので、")
						.AddComment("　　それを検証してからの対応になるかと思います。")
						.AddComment("　　（おおよそ、現在の計算式で合っているとは思いますが、")
						.AddComment("　　　星帝の「太陽の構え」でしか検証できていないので、")
						.AddComment("　　　二刀流や遠距離攻撃での計算など、未確認の部分があります）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 3, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("蜃気楼の塔ＹＥ　新報酬追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『王者ブーツのステータス補正が、集中力向上の計算に含まれている』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　おそらく、『条件付きで発生する補正効果』が、")
						.AddComment("　　実際のゲームでは、計算に含まれないために誤差が生じていると思われます。")
						.AddComment("　　ただ、ご指摘のように、集中力向上の計算に含まれる／含まれないの差は、")
						.AddComment("　　過去にも（ゲーム内ではなく、計算機側での）バグが起きており、")
						.AddComment("　　さらに、説明文等で同じ効果に見えても、内部的に異なる場合があるようでしたので、")
						.AddComment("　　少し、調査のお時間をいただきたいと思います。")
						.AddComment("　　現時点では、注意喚起のメッセージ表示のみの対応となりますが、")
						.AddComment("　　いましばらくお待ちください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ニュートラル星の眼帯がセット効果が反映されていない』")
						.AddComment("　→確認しましたが、こちらでは、正常に計算されているようでした。")
						.AddComment("　　なお、星帝で計算されていて、ステータスやＨＰに差があったとのことですが、")
						.AddComment("　　『○○の祝福』系スキルは、正しく設定されていますでしょうか？")
						.AddComment("　　「太陽の祝福」等を取得していると、特定の日付の場合に、")
						.AddComment("　　ステータスが上昇する効果が発生します。")
						.AddComment("　　今一度、「パッシブ持続系」欄などをご確認いただき、")
						.AddComment("　　問題が解消されないようでしたら、お手数ですが、")
						.AddComment("　　ＵＲＬ出力の結果も添えて、再度、ご連絡をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『太陽と月と星の融合を使用している状態でのダメージがずれる』")
						.AddComment("　→おおよそ、ご連絡いただいた内容は確認できました。")
						.AddComment("　　ただ、従来のＲＯの仕様、および、既知のスキルの仕様から考えると、")
						.AddComment("　　実際のゲーム側のバグの可能性が高いのではないかと思います。")
						.AddComment("　　お手数ですが、公式ホームページなどから、実際の運営会社のほうに、")
						.AddComment("　　一度お問い合わせいただければと思います。")
						.AddComment("　　なお、計算機側では、ご指摘の内容には対応しないままとさせていただきます。")
						.AddComment("　　（公式な見解として、仕様であることが確定した場合には、対応しますので、")
						.AddComment("　　　その際は、改めてご連絡いただければと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 4, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("並行世界のヒメルメズ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("並行世界のヒメルメズ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ジャガーノート」の、ハウリングマインのダメージ増幅効果が、")
						.AddComment("攻撃手段「ハウリングマイン追撃」に適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のアイテムにおいて、『一定の条件を満たした際に、ステータスが上昇する』効果が、")
						.AddComment("スキル「集中力向上」の計算に含まれてしまっていた問題を修正。")
						.AddComment("（調査の結果、データの登録ミスではなく、処理プログラム側の修正ミスでした。")
						.AddComment("　類似効果でも、アイテムの登録時期によって、問題の発生有無が異なります。")
						.AddComment("　比較的最近登録したものが、修正ミスの処理プログラムを使用しており、問題が起きていました）")
						.AddComment("誤って、含まれてしまっていた例：")
						.AddComment("　・「王者のブーツ」の、精錬値が７以上で発揮される、全ステータス＋１０の効果")
						.AddComment("問題なかった例：")
						.AddComment("　・「ダークハンド」の、無条件で発揮される、全ステータス＋１０の効果")
						.AddComment("　・「スナイピングシューズ」の、「エレクトリックショッカー」習得時に発揮される、")
						.AddComment("　　全ステータス＋１０の効果")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『検索機能を備えたセレクトボックスのライブラリの導入を検討してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　『アイテムが増えて探すのが手間』という点については、")
						.AddComment("　　今後、何らかの対応をとれればと思っております。")
						.AddComment("　　（大幅改造の一環として、考えている機能などはいくつかあります）")
						.AddComment("　　ただ、ライブラリの導入については、現時点では消極的な立場となります。")
						.AddComment("　　（色々と理由はありますが、込み入った話になりますので、割愛させていただきます）")
						.AddComment("　　恐れ入りますが、ご理解いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 4, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("2021/4/13に修正した、『一定の条件を満たした際に、ステータスが上昇する』効果が、")
						.AddComment("スキル「集中力向上」の計算に含まれてしまっていた問題の修正が、不完全だった問題を修正。")
						.AddComment("（プログラム的にかなりゴチャゴチャしている箇所なので、まだミスがあるかもしれません。")
						.AddComment("　ご面倒をおかけしますが、お気づきの際は、ご連絡いただければ幸いです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 4, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年５月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 4, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「モンスター状態強化設定」欄に、「ダメージ減衰」の設定を追加")
						.AddComment("（ＭＤ「呪われた次元」などで適用される『ダメージが○○分の１になる』効果の欄です）")
						.AddComment("（ディフェンダーと同じ扱いで計算していますが、ズレがありましたらお知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 4, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("『近接物理攻撃で与えるダメージ＋○○％』の効果に仮対応")
						.AddComment("（実測できていないため、計算が異なっている可能性があります）")
						.AddComment("（詳しくは、計算機ページの注意事項等をご覧ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「カスタム表示」の「物理特化」欄に、「近接物理」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「二次職支援設定」欄に、「金剛」の設定を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年精錬祭　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部の装備において、スキル「ホーリーライト」に対して発揮される効果が、")
						.AddComment("スキル「ホーリーライト（SL魂版）」に適用されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 5, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「ガーディアンナイツアーチャーボウ」の精錬値＋９以上での追加効果が、")
						.AddComment("精錬値によらず適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『リフレクトシールドなどの反射で受けるダメージも表示してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的には特に問題なく追加できると思いますが、")
						.AddComment("　　管理人が反射の仕様をしっかりと把握していないため、")
						.AddComment("　　調査／確認してからの対応になるかと思います。")
						.AddComment("　　対応検討項目が多いため、すぐには対応できないかもしれませんが、")
						.AddComment("　　今しばらく、お待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『R-Saintのフェイス習得時のペナルティが計算されていない』")
						.AddComment("　→こちらでは問題を確認できませんでした。")
						.AddComment("　　なお、フェイス習得時のペナルティを計算するには、")
						.AddComment("　　「習得スキル」欄で「フェイス」の習得レベルを設定する必要がありますが、")
						.AddComment("　　そちらは正しく設定できていますでしょうか？")
						.AddComment("　　設定内容を今一度ご確認いただき、問題が解決されないようであれば、")
						.AddComment("　　ＵＲＬ出力の内容も併せてお知らせいただけると、調査できるかと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『敵のブレスダメよく計算してるけど計算機に載ってませんか？』")
						.AddComment("　→『敵のブレス攻撃で受けるダメージを計算することはできるか？』")
						.AddComment("　　というご質問でしたら、『現状では、できません』という回答になります。")
						.AddComment("　　当計算機は、基本的に『敵に与えるダメージ』を計算するものなので、")
						.AddComment("　　『敵から受けるダメージ』については、ほぼ何も計算できません。")
						.AddComment("　　検証も不十分なので、対応は容易でないと思います。")
						.AddComment("　　あしからず、ご了承ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 5, 20)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「対プレイヤー設定」欄に「攻城戦TE」の項目を追加")
						.AddComment("（従来の「攻城戦」の設定をベースに、下記の点を修正しています。")
						.AddComment("　・ダメージ倍率は、一律１／５")
						.AddComment("　・「アシッドデモンストレーション」の固有ダメージ補正なし")
						.AddComment("　※公式のパッチ内容で、「ビギナー帽」が使用可能になったとありましたが、")
						.AddComment("　　ゲーム内の説明文では、効果は発揮されないと書かれたままだったため、")
						.AddComment("　　計算機でも、従来通り、効果なしの計算にしています。")
						.AddComment("　※対人戦の仕様に詳しくないので、誤り等があればご連絡ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年６月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃手段「ヘルジャッジメント」を、遠距離攻撃から近距離攻撃に修正。")
						.AddComment("（プレイヤーが使用する場合は、近距離攻撃とのご連絡をいただきました。")
						.AddComment("　管理人は十分検証できていませんが、反証がありましたら、ご連絡ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ステータスのクリティカルの表示が実際のゲーム内と異なっている』")
						.AddComment("　→不一致のご連絡ありがとうございます。")
						.AddComment("　　お知らせいただきました通り、現在の計算機では、")
						.AddComment("　　『○○種族の場合、クリティカル＋△△％』のような効果は、")
						.AddComment("　　計算の段階で合算されており、合計が表示されるようになっています。")
						.AddComment("　　実際のゲームに合わせて、合算しない状態で表示することも、")
						.AddComment("　　技術的には可能なのですが、少し検討するお時間をいただきたいと思います。")
						.AddComment("　　（突然、合算でなくなると、かえって混乱する方もいらっしゃると思うので）")
						.AddComment("　　今しばらく、お待ちいただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 5, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊　２０２１年５月　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("各種サンドバッグマン　追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「無慈悲なジオイア」のＬＶが誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 6, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「クイック設定」に『ミミミクエスト報酬一式』を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("既存の深淵の回廊エンチャントの拡張　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("サマーパッケージ２０２１　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記のアイテムをノービス系職業で装備できた問題を修正。")
						.AddComment("・再誕のアセイミー")
						.AddComment("・覚醒破滅を纏いし業剣")
						.AddComment("・覚醒栄光を讃えし王剣")
						.AddComment("※該当アイテムを装備していた場合、「ナイフ」に設定変更されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ペットをエンジェリングにした場合の説明文が重複している』")
						.AddComment("　→こちらでは問題を確認できませんでした。")
						.AddComment("　　なお、当該ペットの効果は、『物理』と『魔法』の両方に効果があります。")
						.AddComment("　　これらは、当該ペットの登録データの都合上、説明文では分けて表示されるため、")
						.AddComment("　　｛闇属性ＵＰ、不死属性ＵＰ｝と｛物理ＵＰ、魔法ＵＰ｝の掛け合わせで、")
						.AddComment("　　４通りのダメージアップ効果が、説明文に表示される仕様となっております。")
						.AddComment("　　僭越ながら、これらの『物理』と『魔法』の違いを思い違いし、")
						.AddComment("　　同じ文章が重複しているように感じられたのではないかと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アイテムデータ一覧で、全ての部位を表示するようなことは可能でしょうか』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的には、問題なく可能です。")
						.AddComment("　　ただ、現在のプログラムが、武器と防具で処理を分けているため、")
						.AddComment("　　単に選択肢を増やすだけではなく、多少の調整が必要になります。")
						.AddComment("　　今しばらく、お待ちいただけたらと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『モンスターのHPや経験値等を３桁区切りにしてほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的には、問題なく可能です。")
						.AddComment("　　ただ、いくつか検討が必要な点があるため、")
						.AddComment("　　今しばらく、お待ちいただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 6, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「デモンズファミリア」のステータス＋１０効果について、")
						.AddComment("スキル『集中力向上』の効果に含まれないように修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エンチャント効果「ｻｲｽﾞ補正100%」が適用されない』")
						.AddComment("　→恐らく、数値欄を「０」のままご利用いただいていたかと思われます。")
						.AddComment("　　当該欄を「１」に設定することで、有効になるようになっていましたが、")
						.AddComment("　　自明でない方法でしたので、数値を設定しなくてよいようにしました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『集中力向上のズレお願いですのでﾁｪｯｸしてください』")
						.AddComment("　→現状、下記のような理由から、現物をゲーム内で装備しない限り、")
						.AddComment("　　ズレが生じるケースを防ぐことは不可能です。")
						.AddComment("　　・ゲーム内で『すべてのステータス＋○○』という全く同じ表記でも、")
						.AddComment("　　　計算に含まれるものと、含まれないものがある。")
						.AddComment("　　　例えば、「ダークハンド」の『すべてのステータス + 10』は『含まれる』。")
						.AddComment("　　　一方、「デモンズファミリア」の『すべてのステータス + 10』は『含まれない』。")
						.AddComment("　　・精錬値などの条件がある効果は、すべて『含まれない』と思われる。")
						.AddComment("　　　（全ての現物をゲーム内で確認したわけではないので、１００％ではないです）")
						.AddComment("　　・データ登録に際して、全ての現物を手に入れて確認してるわけではない。")
						.AddComment("　　　（管理人のゼニーもリアルマネーも有限です）")
						.AddComment("　　今回の修正で、注意を促すメッセージを表示するようにはしましたが、")
						.AddComment("　　事前に全てを確認して登録することは、今後もおそらく不可能です。")
						.AddComment("　　（パッケージはまだいいですが、「半龍王女の指輪」などは私には入手不能です）")
						.AddComment("　　恐れ入りますが、その点はご理解いただいた上で、ご利用いただくようお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 6, 8)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年ブライダルイベント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「猛炎と白魔の指輪」のスロット数が０になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ステータス減少のシミュレートをしたい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　恐らく、ご提案いただいた案のうち、")
						.AddComment("　　『カスタマイズにマイナス数値』での対応となるかと思います。")
						.AddComment("　　（状態異常だと、色んなパターンが出てきたときに煩雑になるため）")
						.AddComment("　　技術的に大きな問題はないと思いますので、")
						.AddComment("　　今しばらく、お待ちいただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 6, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("ＨＰ／ＳＰの実測値のご連絡、ありがとうございます。")
						.AddComment("星帝とソウルリーパーのＨＰ／ＳＰについては、")
						.AddComment("一部、計算式の推定などを行っているため、")
						.AddComment("ご連絡いただいても、すぐに反映するのが難しいことがあります。")
						.AddComment("『連絡したのにデータの更新がされてない！』という場合は、")
						.AddComment("申し訳ありませんが、気長にお待ちいただけると幸いです。")
						.AddComment("（ご連絡いただいた情報は全て確認し、保管してあるので、ご安心ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年７月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ランダムオプション効果「消費ＳＰ減少」が、適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『拡張情報に魔女のスキルカードの情報入れませんか』")
						.AddComment("　→『現在のステータスで、魔女のスキルカードを使うと、何の効果になるか』については、")
						.AddComment("　　「拡張情報」の「ステータス合計」という項目で確認することが可能です。")
						.AddComment("　　もし、そちらで表示される以外の情報が知りたいという要望であれば、")
						.AddComment("　　どのような情報が必要かをお知らせいただければ、検討できるかと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 6, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「拡張表示」の「ステータス合計」に、新規装備が追加されていなかった問題を修正。")
						.AddComment("（カテゴリ分けについては、今回は見送りとさせていただきました。ご容赦ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エンチャントのセット効果によるDefの上昇量「500」が「1000」になっている』")
						.AddComment("　→恐れ入りますが、こちらでは現象を確認できませんでした。")
						.AddComment("　　（ご連絡いただいたいずれの組み合わせでも、「500」の上昇量でした）")
						.AddComment("　　なお、次のような設定がされていると、「500」の上昇が計算された後で、")
						.AddComment("　　倍率が適用されるため、装備の付け外しで「1000」上昇しているように見えます。")
						.AddComment("　　・「二次職支援設定」の「アスムプティオ」")
						.AddComment("　　・「パッシブ持続系」の「符の属性」が「土符」で「１０枚」（影狼、朧のみ）")
						.AddComment("　　・「パッシブ持続系」の「精霊（補助スキル）」が「ソリッドスキン」（ソーサラーのみ）")
						.AddComment("　　これらの設定がなされていないかご確認いただき、それでも問題がある場合は、")
						.AddComment("　　お手数ですが、ＵＲＬ出力の内容も添えて、ご連絡いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 6, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("イリュージョンオブアンダーウォーター　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("イリュージョンオブアンダーウォーター　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『クリティカル率について調査してみました』")
						.AddComment("　→貴重な検証データのご連絡、ありがとうございます。")
						.AddComment("　　大変興味深く、拝見させていただきました。")
						.AddComment("　　さて、本題の『計算機への適用について』ですが、")
						.AddComment("　　現状の計算式が誤っているのであれば、計算機としては修正する方針です。")
						.AddComment("　　ただ、中途半端な修正は避けたいため、次のような点を懸念しています。")
						.AddComment("　　・全体的に、線形増加を仮定しているが、ＤＥＦのような計算式の可能性はないか？")
						.AddComment("　　　→ＲＲ化を機に計算式が変わっているとすると、ＤＥＦ計算のような、")
						.AddComment("　　　　『（４０００＋ＤＥＦ）÷（４０００＋ＤＥＦ×１０）』といった、")
						.AddComment("　　　　線形とならない計算式の可能性もあるかもしれません。")
						.AddComment("　　　　（例えば、LUK0とLUK50、LUK150とLUK200の変化が同じならＯＫだと思います）")
						.AddComment("　　・『敵のＬＵＫによるクリティカル率の減少』に関する計算式は正しいか？")
						.AddComment("　　　→現状の計算機では、『敵ＬＵＫ÷５』だけ減少する計算です。")
						.AddComment("　　　　もしかしたら、そちらも敵のベースレベルが関係するかもしれません。")
						.AddComment("　　・カタール装備での、クリティカル２倍の計算位置が正しいか？")
						.AddComment("　　　→現状の計算機では、自分のＣＲＩ計算の最後に計算しています。")
						.AddComment("　　　　ただ、プログラム的には、２倍にしているのではなく、")
						.AddComment("　　　　　通常：ＣＲＩ＝１＋ＬＵＫ×０．３３＋装備補正")
						.AddComment("　　　　　カタ：ＣＲＩ＝１＋ＬＵＫ×０．３３＋装備補正＋ＬＵＫ×０．３＋装備補正")
						.AddComment("　　　　のように計算されているようです。")
						.AddComment("　　　　（最低保証の「１」は２倍にならず、ＬＵＫ倍率もなぜか０．３）")
						.AddComment("　　　　（プログラムミスの可能性もあります）")
						.AddComment("　　　　（ご提示いただいたベースレベル増加分が、２倍になるのかも気になります）")
						.AddComment("　　・睡眠状態での、クリティカル２倍の計算位置が正しいか？")
						.AddComment("　　　→現状の計算機では、敵のＬＵＫによる減少を計算した後、２倍しています。")
						.AddComment("　　　　（カタール装備とは違い、プログラム的にも、単純に２倍しています）")
						.AddComment("　　・四次職実装で、さらに計算式が変化したりしないか？")
						.AddComment("　　　→ステータス周りの仕組みが変わるような内容が示唆されているので、")
						.AddComment("　　　　そのタイミングで、各種計算式に修正が入ることは十分考えられます。")
						.AddComment("　　特に、最後の項目については、せっかく詳細に検証いただいても、")
						.AddComment("　　その苦労が水の泡になるので、大変心苦しく思います。")
						.AddComment("　　（かなり手間のかかる検証だと思いますので……）")
						.AddComment("　　無論、追加の情報等をご連絡いただければ、対応の検討は致しますので、")
						.AddComment("　　『ここまでやったから最後まで』というようなお気持ちであれば、")
						.AddComment("　　改めて、ご連絡いただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 7, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ゲフェン・メロンフェスタ　対応")
						.AddComment("※防具「プレミアメロンヘッドフォン[0]」のステータス＋１０効果は、")
						.AddComment("　スキル「集中力向上」の計算に『含まれない』ようでした。")
						.AddComment("　もし、スロット付きの方で含まれるようでしたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年８月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『6月末頃以降、Microsoft Edgeにおいて、エラーが表示される』")
						.AddComment("　→ご連絡いただいた内容を調査したところ、")
						.AddComment("　　おそらく、セーブデータを保存している Cookie データが、")
						.AddComment("　　何らかの原因で壊れてしまっているものと思われます。")
						.AddComment("　　『キャッシュ等削除済み』とのことでしたが、")
						.AddComment("　　Cookie ファイルの削除が未実施でしたら、")
						.AddComment("　　Cookie ファイルを削除することで、正常な状態に戻ると考えられます。")
						.AddComment("　　（ただし、セーブされていたデータは全て消えます）")
						.AddComment("　　なお、ご連絡いただいた内容から、")
						.AddComment("　　計算機付属の「ブラウザ移行」機能は、使用できない可能性が高いので、")
						.AddComment("　　お手数ですが、ブラウザのオプションなどから、削除をお願いいたします。")
						.AddComment("　　（「ブラウザ移行」機能が使えない場合、申し訳ありませんが、")
						.AddComment("　　　セーブされていたデータを復元することは、かなり難しいと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『拡張情報で、ウォーロックのフリージングスペルを表示してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　技術的には可能だと思いますので、当該スキルの仕様を確認し、")
						.AddComment("　　実装を検討したいと思います。")
						.AddComment("　　今しばらく、お待ちいただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 7, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("モンスター選択欄を改良")
						.AddComment("・地域、マップデータを再登録＆整理")
						.AddComment("・地域、マップ選択を分離")
						.AddComment("・地域、マップの選択状態をセーブ／ＵＲＬ出力に保存するように変更")
						.AddComment("　（並べ替え、検索の設定状況は、保存されません）")
						.AddComment("・地域、マップ、モンスター選択に検索機能を追加")
						.AddComment("　（セレクトボックス横の「≫」ボタンを押すと表示されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("性能カスタマイズでマイナスの値を設定できるように変更")
						.AddComment("（一部の設定を除く）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("セーブデータの出力を一部変更")
						.AddComment("（以前とまったく同じデータでも、ＵＲＬの文字が変わる場合があります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("戦闘結果欄の３桁区切り表示に対応")
						.AddComment("（設定欄は、「計算する」ボタンの横にあります）")
						.AddComment("（設定状態はセーブされませんので、お手数ですが、都度切り替えてください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("クリティカル率の計算が実際ゲーム内と異なっていた問題を修正")
						.AddComment("『クリティカル率（ＣＲＩ）』")
						.AddComment("　以前の式")
						.AddComment("　　ＣＲＩ＝１＋ＬＵＫ×０．３３＋装備特性")
						.AddComment("　　　　　　（カタールなら、さらに）＋ＬＵＫ×０．３＋装備特性")
						.AddComment("　修正後の式")
						.AddComment("　　ＣＲＩ＝１＋０．１＋ベースレベル÷１００＋｛ＬＵＫ×０．３＋装備特性｝")
						.AddComment("　　　　　　（カタールなら、さらに）｛｝部分を２倍")
						.AddComment("『敵のクリティカル率減少（ＣＲＩ減）』")
						.AddComment("　以前の式")
						.AddComment("　　ＣＲＩ減＝敵ＬＵＫ÷５")
						.AddComment("　修正後の式")
						.AddComment("　　ＣＲＩ減＝敵ベースレベル÷１５０＋敵ＬＵＫ÷５")
						.AddComment("『最終的なクリティカル率』")
						.AddComment("　変更なし")
						.AddComment("　　クリ率＝ＣＲＩ－ＣＲＩ減")
						.AddComment("　　　　　　（敵が睡眠状態なら）この計算結果を２倍")
						.AddComment("")
						.AddComment("『計算結果がどう変わるか？』")
						.AddComment("　・ＬＵＫが高いキャラクターでなければ、そこまで変わらないと思いますが、")
						.AddComment("　　ＬＵＫが高いキャラクターでは、以前よりクリティカル率が、下がります。")
						.AddComment("　　（ＬＵＫ１００なら、３％下がります）")
						.AddComment("")
						.AddComment("『未解決の問題点』")
						.AddComment("　・カタール装備で２倍になる部分が、正しいかが未検証。")
						.AddComment("　・睡眠状態の敵にクリティカル率２倍になる計算が、正しいかが未検証。）")
						.AddComment("　※これらは、今後余裕のある時に確認したいと思います。")
						.AddComment("")
						.AddComment("※本件に関しては、非常に詳細な検証データをご連絡いただきました。")
						.AddComment("　この場を借りて、お礼申し上げます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「ラストポインター」等、大罪武器の銃器武器について、")
						.AddComment("ステータスによってスキルダメージが上昇する効果が、")
						.AddComment("アイテム説明文になかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("メモリアルダンジョン「特訓の間」に出現するモンスターについて、")
						.AddComment("経験値の上方修正が適用されていなかった問題を修正")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『リングオブケリュネイアのスキルダメージ上昇があってない気がする』")
						.AddComment("　→ご連絡ありがとうございます。")
						.AddComment("　　いただいたデータを元に、色々と確認を行いましたが、")
						.AddComment("　　『BaseLvが10上がる度に追加で、[アローストーム]、")
						.AddComment("　　　[エイムドボルト]で与えるダメージ + 1%』の効果は、")
						.AddComment("　　問題なく計算されているように見えました。")
						.AddComment("　　また、ご提示いただいたキャラクタデータの他の設定等も確認しましたが、")
						.AddComment("　　残念ながら、ご連絡いただいたズレを説明できるものはありませんでした。")
						.AddComment("　　１点気になるとすれば、ご提示いただいた計算データでは、")
						.AddComment("　　与えるダメージは一定になると考えられるのですが、")
						.AddComment("　　実測では、多少の幅があったような文章に見えました。")
						.AddComment("　　支援効果の設定などに誤りがないか、今一度ご確認いただけたらと思います。")
						.AddComment("　　また、もしよろしければ、他のモンスターに使用した場合にも、")
						.AddComment("　　ズレがあるかをご確認いただくと、原因が特定できるかもしれません。")
						.AddComment("　　（イズルードのお試し道場でサンドバッグマンを相手にすると分かりやすいです）")
						.AddComment("　　管理人が当該装備を所持していないため、恐縮ですが、")
						.AddComment("　　追加の情報をいただけたら、調査できると思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ジョンダの支援をON/OFFする機能はありますか？』")
						.AddComment("　→ジョンダパスの支援内容は、OTPボーナスのレインボーと同一になります。")
						.AddComment("　　計算機では、「その他の支援/設定 (暫定追加機能)」欄にある、")
						.AddComment("　　「OTP」の項目を、「レインボー」に設定してご利用ください。")
						.AddComment("　　（目印を追記しました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『大罪武器の銃器でもステータスでスキルダメージは上がりますか？』")
						.AddComment("　→記載ミスのご連絡ありがとうございます。")
						.AddComment("　　バグ修正にも記載した通り、アイテム説明文は修正いたしました。")
						.AddComment("　　なお、ダメージの計算については、従来から対応してありますので、")
						.AddComment("　　計算結果に変化はありません。")
						.AddComment("　　（万が一、実際のゲームでのダメージと差がありましたら、お知らせください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ソリッドスキンとアスムプティオの関係について調べた情報があります』")
						.AddComment("　→検証データのご連絡ありがとうございます。")
						.AddComment("　　おおよそ仕様は理解し、計算機での誤りについても把握しました。")
						.AddComment("　　ただ、計算機に組み込むには、他にも追加の検証が必要そうで、")
						.AddComment("　　すぐには対応できそうにありません。")
						.AddComment("　　（検討中の事項が溜まってきてるので、順番待ち状態です）")
						.AddComment("　　気長にお待ちいただければ幸いです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 7, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「対プレイヤー設定」が正常にセーブ／ＵＲＬ出力できない問題を修正")
						.AddComment("（問題のあるセーブ／ＵＲＬ出力データをお持ちの場合は、")
						.AddComment("　一度読み込んだ後、再度「対プレイヤー設定」を設定しなおすと、")
						.AddComment("　正常に出力されるかと思いますので、")
						.AddComment("　お手数ですが、再度、設定・出力をお願いいたします）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 8, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「イリュージョンオブアンダウォーター」のモンスターについて、")
						.AddComment("Base経験値、および、Job経験値が２倍になっていた問題を修正。")
						.AddComment("（実装当時の公式モンスターサーチの情報は、")
						.AddComment("　キャンペーンの２倍が適用されたものだったようです。")
						.AddComment("　申し訳ありません）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 8, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ムキムキブートキャンプ　第二筋　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("シーズンエンチャント拡張　対応")
						.AddComment("（デモニッシュ系、覚醒特殊環境活動用ブーツ）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 8, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年９月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("キューペット追加　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 8, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「性能カスタマイズ（攻撃関連）」欄に「武器攻撃力+%」の項目を追加")
						.AddComment("（「砂漠の暗殺者」や「剛勇無双の神輿」等についている効果です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("アイテムデータ一覧ページの表示対象に、『すべての武器』、『すべての防具』を追加")
						.AddComment("（使い勝手が今一つだとは思いますが、今後大幅改造の一環で改造予定です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("アイテム効果「武器攻撃力+○○%」の計算順序を変更")
						.AddComment("（実測データを元に、サイズ補正計算前から、計算後に変更しました）")
						.AddComment("（サイズ補正が100%以外の場合、以前とわずかに計算結果が変わります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ブラウザ「FireFox」で計算機を利用した場合に、")
						.AddComment("モンスター指定欄の『マップ指定』を表示していない状態で、")
						.AddComment("モンスター名称欄に付属の『>>』ボタンを押した際、")
						.AddComment("表示された検索メニューなどが、正常に動作しない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「グレースコンフィデンシャルメイル」において、")
						.AddComment("装備時に使用可能となるスキル「プロヴィデンス」のレベルが")
						.AddComment("誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「星帝」において、Lv180以降のSPのデータが誤っていた問題を修正。")
						.AddComment("（登録の際に、１レベルずれてしまっていました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「絶望の神モロク」の説明文に、インスピレーション状態になる効果が")
						.AddComment("表示されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 9, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("攻撃方法の選択欄のプログラムを変更")
						.AddComment("（使い方は基本的に変わりません）")
						.AddComment("　2021/09/09　22:00　追記")
						.AddComment("　　設定変更時の自動計算設定を追加")
						.AddComment("　　※デフォルトはＯＮ（自動計算を行う）です。")
						.AddComment("　　※職業や装備の変更、セーブデータのロードを行っても、設定は維持されます。")
						.AddComment("　　　ただし、ページを移動したとき、Ｆ５キーなどでページを更新したときは、リセットされます。")
						.AddComment("　　　また、この設定のセーブは未対応ですので、お手数ですが、都度、設定をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("セーブデータの出力を一部変更")
						.AddComment("（以前とまったく同じデータでも、ＵＲＬの文字が変わる場合があります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("三次職支援設定「エビ三昧」の『武器攻撃力＋○○％』の効果が、")
						.AddComment("『物理攻撃で与えるダメージ＋○○％』で計算されていた問題を修正。")
						.AddComment("（『Ｍａｔｋ＋○○％』の効果については、ゲーム内で確認した結果、")
						.AddComment("　『魔法攻撃で与えるダメージ＋○○％』で合っているようでした）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ギガントランス」、「ギガントブーツ」を装備した上で、")
						.AddComment("攻撃手段に「コンボ計算（SpP→ソニック）」を選択したとき、")
						.AddComment("『スパイラルピアースのレベル』を選択する欄が表示されるが、")
						.AddComment("ダメージ計算ではその欄の設定レベルを使用せず、")
						.AddComment("『ソニックウェーブのレベル』欄の設定で計算してしまっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法に「コンボ計算（双龍～）」を選択し、下記の設定を行うと、")
						.AddComment("「羅刹破凰撃」分のダメージが、正しく計算されない問題を修正。")
						.AddComment("　１）「双龍脚のスキルLv」を「０」に設定する")
						.AddComment("　２）「天羅地網のスキルLv」を「off」に設定する")
						.AddComment("　３）「號砲のスキルLv」を「off」に設定する")
						.AddComment("　４）「羅刹破凰撃のスキルLv」を「off」以外に設定する")
						.AddComment("※要するに、双龍脚のLvを0にして、羅刹破凰撃までコンボする設定の場合。")
						.AddComment("　双龍脚Lv0でコンボ開始は、実際には不可能なので、そんな設定はしないと思いますが。")
						.AddComment("　なお、各コンボを別々の敵に打ち込むケースについては、")
						.AddComment("　お手数ですが、単体スキルで計算していただくよう、お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法に「羅刹破凰撃(HPSP変動可)」を選択し、")
						.AddComment("オプションに『コンボ時』を選択した場合、")
						.AddComment("オプション「SP」の設定値によらず、最大SPでダメージ計算していた問題を修正。")
						.AddComment("（修正後は、指定のSPで計算します。「0」の場合は、従来と変わらず最大SPで計算します）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 9, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("パッシブ持続系欄で「気功(気弾数)」の設定を「０」以外にした場合、")
						.AddComment("または、二次職支援設定欄で「気功」の設定を「０」以外にした場合に、")
						.AddComment("特定のスキル以外で攻撃すると、計算機の動作が停止してしまう問題を修正。")
						.AddComment("（正常に計算できず、セーブ等もできない状態になってしまっていました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『カスタム表示に追加していただきたい情報があります』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　必要な内容も具体的で、技術的にも問題なく可能と思われます。")
						.AddComment("　　ただ、作業に多少時間がかかるのと、前述のバグのように、")
						.AddComment("　　緊急性を要する対応ではないと判断しましたので、")
						.AddComment("　　次回の更新ぐらいで、対応できればと考えております。")
						.AddComment("　　（今週のくじ更新と一緒になるかと思います）")
						.AddComment("　　もう少々、お待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 9, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「カスタム表示」の「拡張情報」－「詠唱/ディレイ」にある『装備効果』の欄では、")
						.AddComment("100%を超える短縮効果であっても、100%で切り捨てず、そのまま表示するように変更")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「カスタム表示」の「拡張情報」に「ステータス補正」を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「シャドウチェイサー」の「攻撃方法」欄に、「ダーククロー」がなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年１０月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 9, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「グレースカルティベイションコート」の、")
						.AddComment("スキル「ハウリングオブマンドラゴラ」Lv5習得時に発揮される効果のうち、")
						.AddComment("スキルディレイ短縮効果が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスターマップ「生体工学研究所４Ｆ」の登録ミスを修正。")
						.AddComment("※誤って、ＭＤである「禁忌の研究所」のデータになっていました。")
						.AddComment("　セーブデータは自動的に修正されますが、")
						.AddComment("　カテゴリーで「生体工学研究所」を選択していて、")
						.AddComment("　マップで「禁忌の研究所」を選択していた場合に限り、")
						.AddComment("　カテゴリーが「全地域」にに自動で修正されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エンチャントの効果一覧を見られるようにしてほしい』")
						.AddComment("　→左メニューの「カードデータ」のページで、")
						.AddComment("　　「選択」欄に『エンチャント効果』を選ぶと、")
						.AddComment("　　ご連絡いただいた文章と同じ操作が実現できるかと思います。")
						.AddComment("　　（現状、ページ自体に検索機能はついていませんので、")
						.AddComment("　　　ご利用のブラウザの文字の検索機能などをご利用ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『覚醒魔呪のメイルになると、「絶対に損傷しない」性能は消滅する』")
						.AddComment("　→管理人が現物を所有していないため、検証はできていないのですが、")
						.AddComment("　　公式ツールに記載の情報、および、ゲーム内のアイテム説明文では、")
						.AddComment("　　説明文の最後のほうにある「破損」という項目が「しない」とないっています。")
						.AddComment("　　そのため、計算機では、「絶対に損傷しない」という性能を設定しています。")
						.AddComment("　　（現状、計算機に、定型文部分を個別に登録する設定が存在しないためです）")
						.AddComment("　　もし、実際のゲーム内で、当該装備が破壊されたということであれば、")
						.AddComment("　　ゲーム側のバグの可能性が高いので、まずはバグ報告をお願いいたします。")
						.AddComment("　　計算機での対応は、その対応を受けてからとなります。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 9, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ファロス燈台地下迷宮　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ファロスエンチャント　対応")
						.AddComment("※今回のエンチャント追加により、計算機上はカードが設定できた欄の一部が、")
						.AddComment("　エンチャント用の欄に変更になりました。")
						.AddComment("　本来は存在しなかったスロットなので、通常の利用であれば問題ありませんが、")
						.AddComment("　利便性のために何らかのカードを設定していたセーブデータを読み込んだ場合、")
						.AddComment("　自動的に「エンチャントなし」に変更されますので、ご注意ください。")
						.AddComment("　（以前からエンチャント用の欄だった場合は、そのまま引き継がれます）")
						.AddComment("※今回のエンチャント追加により、一部の対象アイテムでは、")
						.AddComment("　２種類のエンチャントの対象になったものがあります。")
						.AddComment("　（「ノーブルクロス」やパッケージ装備など）")
						.AddComment("　これに関して、計算機では、まず『元々できたエンチャントのリスト』が選択肢に並び、")
						.AddComment("　その下に『（↓ファロスエンチャ↓）』というダミーの選択肢を置いて、")
						.AddComment("　さらにその下に、『ファロスエンチャントのリスト』を選択肢として並べています。")
						.AddComment("　中には、重複するもの（「ＳｐｅｃｉａｌＳｔｒ」等）もありますが、")
						.AddComment("　計算上は、どちらを選んでも同じになります。（同じデータです）")
						.AddComment("　ただし、そのデータをセーブし、ロードしなおすと、")
						.AddComment("　どの系統のエンチャントかは保存されず、より先にある選択肢が選ばれますので、")
						.AddComment("　『元々できたエンチャント』の「ＳｐｅｃｉａｌＳｔｒ」等が選ばれた状態になります。")
						.AddComment("　現状の計算機の仕組みで、系統まで保存するようにするのはかなりの手間なので、")
						.AddComment("　ご理解、ご了承いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("ファロス燈台地下迷宮　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("『習得スキル設定対象』であるカードを設定しても、")
						.AddComment("「習得スキル（装備効果用）」欄に、設定を促す赤文字が表示されない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 9, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("テストオープンの「バトルコロッセオ」におけるスキル調整は、")
						.AddComment("あまりにも量が多すぎるため、すぐには対応できそうにないです。")
						.AddComment("あらかじめ、ご了承ください。")
						.AddComment("（最悪、テストオープン期間中に対応しきれない可能性もあります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「スーパーノービス」系列において、")
						.AddComment("「パッシブ持続系」欄の「無死亡ボーナス」の設定を「on」にすると、")
						.AddComment("計算機の動作が停止してしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("複数の装備品で、同一のスキルを使用可能になる場合、")
						.AddComment("および、同一のスキルのオートスペルが発動可能な場合に、")
						.AddComment("下記の現象が発生していた問題を修正。")
						.AddComment("　・攻撃方法欄に、同一のスキルが複数表示される")
						.AddComment("　・スキルレベル欄の選択肢が、適切なレベルまで表示されない場合がある")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("モンスター「フレイムピット」の名称が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 10, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「バトルコロッセオ」対応")
						.AddComment("（状況は、専用ページでご確認ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("公式サイト記載の情報を元に、対人エリア系の計算式を整理")
						.AddComment("　・スキル「大纏崩捶」について、YE系の戦闘エリアでの威力低下計算を削除。")
						.AddComment("　　（計算機のプログラムミスだと考えていますが、実測が違う場合はお知らせください）")
						.AddComment("※現状、下記の不明点があります。")
						.AddComment("　・下記のスキルの倍率について、YE系の戦闘エリアでは、威力の増幅が適用されるか、否か。")
						.AddComment("　　（現状の計算機では、『されない』計算になっています）")
						.AddComment("　　　対象スキル　　　　　一般的な増幅　→　されない計算")
						.AddComment("　　　「ローリングカッター」１５０％　→　１００％")
						.AddComment("　　　「クロスリッパースラッシャー」１５０％　→　１００％")
						.AddComment("　　　「ブーストナックル」２００％　→　１００％")
						.AddComment("　　　「パイルバンカー」２００％　→　１００％")
						.AddComment("　　　「バルカンアーム」３００％　→　１００％")
						.AddComment("　　（公式サイトの「ダメージ制限が解除されるスキル」のリストにありますが、")
						.AddComment("　　　有利な効果も解除されるという意味なのかが分かりません。")
						.AddComment("　　　ダメージ減衰が存在した時代のＲＪＳのページをコピーしてきて")
						.AddComment("　　　修正していないまま記載されているだけのような気もしますが、")
						.AddComment("　　　実測にずれがあるようでしたら、お知らせいただければ幸いです）")
						.AddComment("　・下記のスキルの倍率について、計算機にプログラムされている倍率の情報元が不明。")
						.AddComment("　　　「アシッドデモンストレーション」GvG、PvP、MHで、１００％→２５％")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("スキル「マーシュオブアビス」の設定欄を、")
						.AddComment("「パッシブ持続系」欄から、「モンスター状態異常設定」欄へ変更。")
						.AddComment("※自身に付与するのではなく、敵に対して使用するスキルのため。")
						.AddComment("※当該スキルを設定していたセーブデータを読み込んだ場合、")
						.AddComment("　自動的に「モンスター状態異常設定」欄へ振り替えられます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「モンスター状態異常設定」欄に、「アースドライブ(ASPD-/DEF-)」を追加。")
						.AddComment("※計算機では、敵のASPDは計算しないので、DEF計算のみ対応。")
						.AddComment("※他のDEF増減効果（ストリップやアスムなど）と加算で計算しています。")
						.AddComment("　実測でズレがある場合は、お知らせいただければ幸いです。")
						.AddComment("※BOSS属性モンスターであっても、効果有効で計算しています。")
						.AddComment("　実際のゲーム内で無効だった場合は、お知らせいただければ幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法に、レベル選択以外のオプション選択がある場合、")
						.AddComment("正常にセーブされていなかった問題を修正。")
						.AddComment("（「テトラボルテックス」の『ボール属性選択』などが保存されておらず、")
						.AddComment("　強制的にデフォルトの選択肢が選ばれるようになっていました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「その他の支援/設定 (暫定追加機能)」欄にある、OTP「レインボー」のＨＰ／ＳＰ増加効果が、")
						.AddComment("攻城戦等の戦闘エリアにおいても有効になっていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ウェポンブロッキング」の再使用待機時間が、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「シャドウフォーム」の再使用待機時間が、誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「アンリミット」の遠距離物理攻撃力増加効果が、")
						.AddComment("YE系の戦闘エリアで適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("攻撃方法に、スキル「マグマイラプション」を選択した際、")
						.AddComment("最大Ｌｖが５にもかかわらず、Ｌｖ１０までが選択できた問題を修正。")
						.AddComment("※Ｌｖ６以上を設定していたセーブデータを読み込んだ場合、")
						.AddComment("　自動的にＬｖ５へ修正されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「マグマイラプション」の固定ダメージ部分（１０ＨＩＴ部分）について、")
						.AddComment("YE系の戦闘エリアにおけるダメージ減衰が適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「セルフディストラクション」の詠唱時間、固定詠唱時間について、")
						.AddComment("「詠唱シミュレータ」機能で、当該スキルを選択した際、")
						.AddComment("YE系の戦闘エリアにおける特殊補正（１０秒に変更）が適用されていなかった問題を修正。")
						.AddComment("（戦闘結果の計算では、正しく計算されていました。詠唱シミュレータ側のみの問題です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("スキル「ソーントラップ」、「ブラッドサッカー」に、")
						.AddComment("戦闘エリアやストーンスキン等によるダメージ減衰が、適用されていなかった問題を修正。")
						.AddComment("（もし、実測でそれらの影響を受けないようであれば、お知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 10, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年１１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント拡張（ツインブレイズ）　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「ソウルリーパー」の武器ごとの基本ＡＳＰＤ、盾装備補正を修正。")
						.AddComment("（ゲーム内で実測しましたが、まだズレがあるようならばお知らせください）")
						.AddComment("（盾を装備すると、ＡＳＰＤが０．１程度ずれるケースがあるかもしれません。")
						.AddComment("　その場合、設定値ではなく、盾補正の計算処理自体を見直さないといけない可能性が高いです。")
						.AddComment("　そうなった場合は、申し訳ありませんが、すぐには対応できないと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『特定の効果を持つ装備を同時に装備すると、魔法のダメージが実測と合わない』")
						.AddComment("　→実測の情報提供ありがとうございます。")
						.AddComment("　　いただいた情報を元に、計算機のプログラム等を確認したところ、")
						.AddComment("　　どうも防具「ガーデンオブエデン」の処理に問題があるようでした。")
						.AddComment("　　ただ、実際のゲーム側のバグの可能性も考えられると判断しましたので、")
						.AddComment("　　プログラムは修正せず、注意メッセージを表示する対応とさせていただきました。")
						.AddComment("　　今後の状況を見つつ、正式な対応を検討したいと思います。")
						.AddComment("　　※「ガーデンオブエデン」を装備しているときのみ、注意メッセージが表示されます。")
						.AddComment("　　※管理人側で検討した仮説は、運営会社に報告済みです。")
						.AddComment("　　　別途、色々と検証して運営会社にご連絡いただく必要はありませんので、ご安心ください。")
						.AddComment("　　　（調べて報告しないと気が済まないということでしたら、お止めはしませんが……）")
						.AddComment("　　　ただ、過去の経験から、実際のゲーム側のバグであったとしても、")
						.AddComment("　　　修正されるまで半年以上かかったりするので、")
						.AddComment("　　　すぐには正しい計算に変更できないかもしれません。")
						.AddComment("　　　あしからず、ご容赦いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 10, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("魔法攻撃のダメージ計算についてですが、その後、追加で情報提供をいただき、")
						.AddComment("その内容をもとに色々と検証を行った結果、実際のゲーム側のバグなどではなく、")
						.AddComment("『特化計算の順序が違う可能性が高い』という考えにいたりました。")
						.AddComment("現在の特化効果の計算処理では、以下の順序で計算し、")
						.AddComment("その都度、『小数点以下の切り捨て』を行っています。")
						.AddComment("　１．「魔法攻撃で与えるダメージ」")
						.AddComment("　２．「スパイダーウェブ」（火属性魔法２倍効果）")
						.AddComment("　３．「地域特化」（○○に出現するモンスター）")
						.AddComment("　４．「種族特化」")
						.AddComment("　５．「サイズ特化」")
						.AddComment("　６．「敵属性特化」")
						.AddComment("　７．「属性魔法特化」")
						.AddComment("　８．「ボス特化」")
						.AddComment("　※基本的に、本家様から引き継いだ時点のままのはずです。")
						.AddComment("　　ただし、「サイズ特化」だけは、当時存在しなかったので、後から追加しました。")
						.AddComment("そのため、計算の順序の違いによって、わずかな誤差が生じることがあります。")
						.AddComment("例）　　【】内を『小数点以下切り捨て』")
						.AddComment("　ＭＡＴＫが「３０３」で、種族「１１％」と属性魔法「２５％」の特化を適用する場合、")
						.AddComment("　「１１％」→「２５％」の順序の場合、")
						.AddComment("　　【３０３×（１００＋１１％）】＝３３６")
						.AddComment("　　【３３６×（１００＋２５％）】＝４２０")
						.AddComment("　「２５％」→「１１％」の順序の場合、")
						.AddComment("　　【３０３×（１００＋２５％）】＝３７８")
						.AddComment("　　【３７８×（１００＋１１％）】＝４１９")
						.AddComment("　※この例では、低くなりますが、ＭＡＴＫ「２８４」の場合など、高くなったりもします。")
						.AddComment("この順序を検証するため、現在、")
						.AddComment("　『魔法攻撃で、計算機と実測のダメージが異なるデータ』")
						.AddComment("を募集しています。")
						.AddComment("もし、新アイテムの試し打ちで、サンドバッグマンに打ち込んだ時などに、")
						.AddComment("計算機と違う実測ダメージに出くわした場合は、ＵＲＬ出力をご連絡いただけると幸いです。")
						.AddComment("（念のため、装備や支援効果の設定ミスがないかをご確認いただき、")
						.AddComment("　計算機では○○のはずが、実際には△△だった、のような形だとありがたいです）")
						.AddComment("なお、狙って異なるデータを探そうとするのは非常に大変なので、おすすめしません。")
						.AddComment("（ＭＡＴＫのわずかな違いや、特化％のわずかな差、特化の組み合わせの違いなど、")
						.AddComment("　ひとつずつ条件を変えながら探ることになるので、大変時間がかかります。")
						.AddComment("　それよりは、計算機を存分に使い、ＲＯを楽しんでいただけたらと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 10, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『キャラクターの手紙やエクラ支援の効果をワンクリックで設定できる機能はありませんか？』")
						.AddComment("　→設定箇所が分かりづらかったようで恐縮ですが、")
						.AddComment("　　「アイテム時限効果」設定欄の選択肢の最初のほうに、特設で設けられています。")
						.AddComment("　　（「▲(NPC)エクラージュオーブ支援」という選択肢になります）")
						.AddComment("　　効果の内容的には、「アイテム(食品/他)」設定欄にあるべきかもしれませんが、")
						.AddComment("　　本家様の時代から、時限効果の一種として用意されていたため、")
						.AddComment("　　現状もそれを踏襲している、という状況です。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『魔法のダメージを調べてきました』")
						.AddComment("　→実測の情報提供ありがとうございます。")
						.AddComment("　　いただいた情報を元に、テスト用の全パターンを計算させるプログラムを実行したところ、")
						.AddComment("　　正しい可能性のある計算順序を、残り５７パターンまで絞ることができました。")
						.AddComment("　　（今回の情報をいただくまでは、１万パターンぐらい残っていたので、大きく前進しました）")
						.AddComment("　　なお、ご推察いただいた計算順序だと、以前お知らせいただいた、")
						.AddComment("　　アークエルダーカードを装備した際のズレが説明できないようでした。")
						.AddComment("　　管理人側でも、余力のある時に検証したいとは思っていますが、")
						.AddComment("　　調査は非常に手がかかると思いますので、ＲＯのプレイに支障のない範囲で、")
						.AddComment("　　気づかれたときにでもお知らせいただければ、十分ありがたく思います。")
						.AddComment("　　（検証のやり方としては、今回お知らせいただいたような方法で問題ないと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 11, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年アニバくじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("魔法攻撃のダメージ計算について、計算順序を変更")
						.AddComment("　従来の順序（１項目ごとに『小数点以下の切り捨て』）")
						.AddComment("　　１．「魔法攻撃で与えるダメージ」")
						.AddComment("　　２．「スパイダーウェブ」（火属性魔法２倍効果）")
						.AddComment("　　３．「地域特化」（○○に出現するモンスター）")
						.AddComment("　　４．「種族特化」")
						.AddComment("　　５．「サイズ特化」")
						.AddComment("　　６．「敵属性特化」")
						.AddComment("　　７．「属性魔法特化」")
						.AddComment("　　８．「ボス特化」")
						.AddComment("　修正後の順序（１項目ごとに『小数点以下の切り捨て』）")
						.AddComment("　　１．「魔法攻撃で与えるダメージ」")
						.AddComment("　　２．「サイズ特化」")
						.AddComment("　　３．「地域特化」（○○に出現するモンスター）")
						.AddComment("　　４．「敵属性特化」")
						.AddComment("　　５．「スパイダーウェブ」（火属性魔法２倍効果）")
						.AddComment("　　６．「属性魔法特化」")
						.AddComment("　　７．「種族特化」")
						.AddComment("　　８．「ボス特化」")
						.AddComment("※もし、まだ実測と合わないケースがあった場合には、")
						.AddComment("　お手数ですが、「ＵＲＬ出力」の内容と実測のダメージをご連絡ください。")
						.AddComment("　（ご連絡いただいたデータと管理人が調べたデータでは、全て問題なさそうでした）")
						.AddComment("※本件に関して、非常に詳細な検証データをご連絡いただきました。")
						.AddComment("　この場を借りて、お礼申し上げます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ダメージの３桁区切りがデフォルトになるとありがたい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　これまで、３桁区切りなしで長年運営してきた経緯があるため、")
						.AddComment("　　対応としては、『デフォルトを変える』のではなく、")
						.AddComment("　　『設定状態をセーブできるようにする』がベターかなと考えております。")
						.AddComment("　　（デフォルトが変わると、使いづらく感じる方も少なからずいらっしゃるので…）")
						.AddComment("　　機能としては有用ですので、どこかで対応したいとは思いますが、")
						.AddComment("　　四次職の実装も近づき、大規模改造を急がなければならないため、")
						.AddComment("　　対応には、少しお時間をいただくことになるかと思います。")
						.AddComment("　　あしからず、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スキル攻撃の最終的な倍率を表示してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　原理的には、問題なく可能と考えられるのですが、")
						.AddComment("　　スキルの計算処理が（プログラム的な意味で）バラバラに行われているものが多く、")
						.AddComment("　　パッと簡単には対応できない状態です。")
						.AddComment("　　（計算機の機能として対応する以上、『すべてのスキル』で、")
						.AddComment("　　　確信をもって、『正しく表示されている』状態にする必要があると考えています）")
						.AddComment("　　機能としては有用ですので、どこかで対応したいとは思いますが、")
						.AddComment("　　四次職の実装も近づき、大規模改造を急がなければならないため、")
						.AddComment("　　対応には、少しお時間をいただくことになるかと思います。")
						.AddComment("　　あしからず、ご容赦いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 11, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年アニバーサリーイベント　対応")
						.AddComment("（装備、カード、エンチャント、すべて対応し確認したつもりですが、")
						.AddComment("　あまりにもデータの量が多いので、ミスなどがあるかもしれません。")
						.AddComment("　何かお気づきの点がありましたら、ご連絡いただければ幸いです）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スロット番号表示があると実際にエンチャントするとき迷わないかなと思います』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　スロットの横に番号を書くだけなら、５分もかからず終わる作業なのですが、")
						.AddComment("　　実は『ご提案の内容で、本当に必要なものは何なのだろう』と少し考えております。")
						.AddComment("")
						.AddComment("　　まず、計算機のカード／エンチャントの設定欄は、左から順に１，２…と並んでいます。")
						.AddComment("　　この順序は、実際にゲーム内でエンチャントして、装備を右クリックしたときに表示される、")
						.AddComment("　　カードやエンチャントのスロット位置と一致しているはずです。")
						.AddComment("　　ですので、番号を書いても、見づらくなるだけなのではないかという懸念があります。")
						.AddComment("")
						.AddComment("　　ただ、例えばご連絡いただいたきっかけが、")
						.AddComment("　　　『計算機だと第４スロットだったけど、実際のゲームでは第３スロットだった』")
						.AddComment("　　のようなケースだった場合、それは計算機のデータ登録ミスです。")
						.AddComment("　　正しいデータに修正することが、もっとも適した対応かと思いますので、")
						.AddComment("　　具体的にどの装備のどのスロットかをご連絡いただければ、修正いたします。")
						.AddComment("")
						.AddComment("　　一方で、『エンチャントの場所』については、公式でも２種類の呼び方があります。")
						.AddComment("　　ひとつは、「第４スロット」「第３スロット」など、スロットの位置で呼ぶ方法。")
						.AddComment("　　もうひとつが、「第１エンチャント」「第２エンチャント」という、")
						.AddComment("　　エンチャントできる順序で呼ぶ方法です。")
						.AddComment("　　（同じ意味で、『1番目に選択できるエンチャント』などという表現もされます）")
						.AddComment("　　ご連絡の内容を熟考する中で、この『呼び方の差による誤認を防ぐために、")
						.AddComment("　　何らかの表示がほしいと』いう意味なのかもしれないと考えました。")
						.AddComment("　　ただ、現状、公式でどの呼び方をされているかは、データとして登録していないため、")
						.AddComment("　　この対応には、お時間をいただくことになると思います。")
						.AddComment("　　（すべてのエンチャントパターンについて、呼び方を確認する作業が発生する上、")
						.AddComment("　　　現状の優先課題である四次職の前準備が全く進んでおらず、")
						.AddComment("　　　さらに、どう表示するかのイメージも描けていないので、")
						.AddComment("　　　だいぶ後回しになってしまう可能性が極めて高いです）")
						.AddComment("")
						.AddComment("　　以上のようなことから、申し訳ありませんが、現時点では、")
						.AddComment("　　エンチャントの場所については、公式サイトのエンチャントのページなどで、")
						.AddComment("　　各自ご確認いただくように、お願いをしたいと思います。")
						.AddComment("　　（基本的には、どんな呼び方であっても、後ろから前へ、すなわち、")
						.AddComment("　　　第４スロットから、第３、第２、第１という順でつくと考えて登録してあります）")
						.AddComment("")
						.AddComment("　　なお、計算機のデータ登録ミスの場合は、バグとして最優先で対応しますので、")
						.AddComment("　　具体的にどの装備のどのスロットかをご連絡いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 12, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("１９ｔｈアニバーサリーパッケージ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 12, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("スキル「ヴァンパイアギフト」に仮対応")
						.AddComment("（既存の「ヘルジャッジメント」と完全に同じ計算にしてありますが、")
						.AddComment("　ゲーム内でズレがあるようでしたら、ＵＲＬ出力等のデータを添えて、")
						.AddComment("　ご連絡いただければと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エデン＋フェアリーオブエデンのHP+50%の効果と、")
						.AddComment("英雄の凱歌+ニーズのHP+50%等の新しいエンチャントでHP+50%効果が乗るものを組み合わせたときに")
						.AddComment("どちらかのみ適用され、どちらかのセットを外すとHPが下がってしまう』")
						.AddComment("　→何パターンか確認しましたが、こちらでは問題を確認できませんでした。")
						.AddComment("　　恐れ入りますが、次のような点をご確認いただき、")
						.AddComment("　　問題が解消されないようでしたら、ＵＲＬ出力の内容を添えて、")
						.AddComment("　　再度、ご連絡をお願いいたします。")
						.AddComment("")
						.AddComment("　　１．計算機の更新")
						.AddComment("　　　　お使いのブラウザや設定によっては、キャッシュ機能が働き、")
						.AddComment("　　　　計算機の一部のファイルが更新されない場合があります。")
						.AddComment("　　　　Ctrl + Shift + R キー同時押しなど、キャッシュ再読み込みをお試しください。")
						.AddComment("　　　　（操作するキーは、ブラウザによって異なります）")
						.AddComment("　　　　（スーパーリロード、ハード再読み込みなどと呼ばれている場合もあります）")
						.AddComment("　　　　（この操作でセーブデータが消えることはありませんが、")
						.AddComment("　　　　　操作前の入力状態は復元されないかと思いますので、")
						.AddComment("　　　　　先にＵＲＬ出力などでデータを保存した上で、再読み込みをお試しください）")
						.AddComment("")
						.AddComment("　　２．装備変更の見落とし")
						.AddComment("　　　　例えば、「ガーデンオブエデン」と「フェアリーオブエデン」を装備した状態から、")
						.AddComment("　　　　「ガーデンオブエデン」を「フェイスオブイグドラシル」に変更し、")
						.AddComment("　　　　そのエンチャントとして＜英雄の凱歌＞を選択した場合、")
						.AddComment("　　　　当然ながら、『エデン＋フェアリーオブエデン』セットは成立しなくなっていますので、")
						.AddComment("　　　　そのセットの『HP+50%』効果はなくなります。")
						.AddComment("　　　　代わって、新たに『＜英雄の凱歌＞とニーズ』セットの『HP+50%』が適用されますが、")
						.AddComment("　　　　結果として、『どちらかのみ適用されている』ように見えるかと思います。")
						.AddComment("　　　　これは、実際のゲーム内でもそのように動作すると思いますが、")
						.AddComment("　　　　もし違う動作になっているようでしたら、ご連絡ください。")
						.AddComment("")
						.AddComment("　　３．セット対象の見間違い")
						.AddComment("　　　　ご連絡いただいた＜英雄の凱歌＞と「ニーズヘッグの影」カードなら問題ありませんが、")
						.AddComment("　　　　例えば「クトルラナックス」カードの場合、セット対象は＜豊穣の女神＞になると思います。")
						.AddComment("　　　　この組み合わせを間違えると、セット不成立として計算されてしまいますので、")
						.AddComment("　　　　設定ミスなどがないか、今一度、ご確認ください。")
						.AddComment("　　　　もしゲーム内のエンチャントの説明文と違うセットで効果が出ている場合、")
						.AddComment("　　　　計算機側のデータ登録ミスですので、誤っている点をご連絡いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 12, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("バトルコロッセオ　追加エンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２１年クリスマスイベント　特別報酬限定エンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「サモナー」において、ドラム種族の特性として、")
						.AddComment("「人間系モンスターから受けるダメージ + 10%」としていた点を、")
						.AddComment("「人間系モンスターから受けるダメージ + 10%（人間形プレイヤーを除く）」に修正。")
						.AddComment("（正確には物理ダメージだけとのことですが、")
						.AddComment("　この計算機では、相手から受けるダメージは、通常攻撃しか計算できないのと、")
						.AddComment("　物理だけの耐性を登録する方法が、計算機に組み込まれていないため、")
						.AddComment("　ひとまず、物理魔法問わず設定してあります）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 12, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「怨恨のカーリッツバーグ」の精錬値による効果が、")
						.AddComment("同カードを頭中段装備に設定した場合にも適用されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ASPD計算上193を超えているときどれくらい超過しているのかを表示してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　理論的にも、技術的にも、表示を追加することは可能です。")
						.AddComment("　　ただ、今の表示欄に、計算途中の値を追加で表示することは避けたいので、")
						.AddComment("　　対応する場合は、拡張表示として追加する対応になるかと思います。")
						.AddComment("　　また、ＡＳＰＤの計算は若干面倒な計算式になっており、")
						.AddComment("　　ＡＳＰＤが１８０の時にＡＳＰＤ＋１０％の効果を付与しても、ＡＳＰＤ１９８にはなりません。")
						.AddComment("　　一緒にご連絡いただいた、提案に至った経緯も考えると、")
						.AddComment("　　これらの点も含め、『どのように表示するか』を検討したうえで、対応したいと思います。")
						.AddComment("　　機能としては有用ですので、どこかで対応したいとは思いますが、")
						.AddComment("　　四次職の実装も近づき、大規模改造を急がなければならないため、")
						.AddComment("　　対応には、少しお時間をいただくことになるかと思います。")
						.AddComment("　　あしからず、ご容赦いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2021, 12, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「スーパーノービス」系において、")
						.AddComment("本来は装備できない下記の装備が、選択できた問題を修正。")
						.AddComment("・イリュージョンカウンターダガー")
						.AddComment("・イリュージョン月光剣")
						.AddComment("・霧の妖刀")
						.AddComment("・イリュージョン無形剣")
						.AddComment("（上記の装備が設定されたデータを読み込んだ場合、")
						.AddComment("　自動的に「素手」変更され、カードとエンチャント設定がクリアされます。")
						.AddComment("　お手数ですが、適切な装備に設定の上、再度ＵＲＬ出力等をお願いいたします。")
						.AddComment("　（読み込み時に修正するだけで、セーブ内容自体は自動で変更されません））")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「スーパーノービス」系において、")
						.AddComment("パッシブ持続系設定欄で「スーパーノービスの魂」をonにすると、")
						.AddComment("武器種別欄に「不明」という選択肢が表示される問題を修正。")
						.AddComment("（不明を選択していた場合、ＵＲＬ出力などはできない（エラーになる）はずですが、")
						.AddComment("　もし出力／セーブできていた場合は、正しい装備を設定の上、")
						.AddComment("　再度ＵＲＬ出力等を行うようお願いいたします）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「スーパーノービス」系において、")
						.AddComment("パッシブ持続系設定欄で「スーパーノービスの魂」のon/offを切り替えた後、")
						.AddComment("武器の変更を行った際に、誤ったエンチャントが選択できてしまう場合がある問題を修正。")
						.AddComment("（自動では修正されませんので、正しい装備を設定の上、")
						.AddComment("　再度ＵＲＬ出力等を行うようお願いいたします）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「魔法石の恩恵」と「ミストレス」カードのセット効果について、")
						.AddComment("消費ＳＰ減少効果が計算されていなかった問題、および、")
						.AddComment("説明文が「魔法石の恩恵」にしか表示されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「封印された堕ちた大神官ヒバム」カードと、")
						.AddComment("「暴走した魔力」を同時に装備した際に効果が打ち消される対象が、")
						.AddComment("「堕ちた大神官ヒバム」カードになっていた問題を修正。")
						.AddComment("（正しくは、「封印された堕ちた大神官ヒバム」カードが打ち消し対象）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 1, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("明けましておめでとうございます。")
						.AddComment("今年は四次職追加などで、色々と更新が追い付かないこともあるかもしれませんが、")
						.AddComment("引き続き、よろしくお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ステータスによるＭＡＴＫの計算で、割り算の処理を修正。")
						.AddComment("※従来は、各要素ごとに割り算をしていましたが、")
						.AddComment("　0.3333... + 1 + 0.6666... = 1.9999... となるような場合に誤差があったため、")
						.AddComment("　割り算は最後にまとめて１回だけ行うようにしました。")
						.AddComment("　（これにより、ＭＡＴＫが以前より１高くなる場合があります）")
						.AddComment("　従来の式　【】小数点以下切り捨て")
						.AddComment("　　【ＩＮＴボーナスの２乗÷３　＋　ＤＥＸ÷５　＋　ＬＵＫ÷３】")
						.AddComment("　修正後の式　【】小数点以下切り捨て")
						.AddComment("　　【（ＩＮＴボーナスの２乗×５　＋　ＤＥＸ×３　＋　ＬＵＫ×５）÷１５】")
						.AddComment("※まだ実測誤差があるようでしたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「リベリオン」の基本ＡＳＰＤが誤っていた問題を修正。")
						.AddComment("　武器種別　　　：旧  → 修正後")
						.AddComment("　素手　　　　　：151 → 149　(-2)")
						.AddComment("　ハンドガン　　：139 → 144　(+5)")
						.AddComment("　ライフル　　　：138 → 139　(+1)")
						.AddComment("　ショットガン　：123 → 128　(+5)")
						.AddComment("　ガトリングガン：139 → 146　(+7)")
						.AddComment("　グレネードがん：126 → 130　(+4)")
						.AddComment("※素手のみ、下方修正になりました。")
						.AddComment("※「ガンスリンガー」については、再調査していません。")
						.AddComment("　もし、ガンスリンガーでも差がある場合は、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『訓練の間だけ計算機と実測値に差が出ている』")
						.AddComment("　→恐らく、ストーンスキン状態の設定をされていないことが原因かと思われます。")
						.AddComment("　　「訓練の間」のモンスターは、常時ストーンスキン状態だと思いますので、")
						.AddComment("　　「モンスター状態強化設定」欄から「ストーンスキン」の設定をお試しください。")
						.AddComment("　　（ご連絡いただいた情報から、レベル２ではないかと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『リベリオンのＡＳＰＤに誤差がある』")
						.AddComment("　→計測データを添えてのご連絡、ありがとうございます。")
						.AddComment("　　いただいた情報をもとに、ゲーム内で実測を行い、上記の通り修正しました。")
						.AddComment("　　ただ１点、お知らせいただいたＵＲＬ出力データでは、")
						.AddComment("　　素手の状態にもかかわらず、「パッシブ持続系」設定欄で、")
						.AddComment("　　「ガトリングフィーバー」のレベルが「１」に設定されていました。")
						.AddComment("　　文章による説明では、『素手ASPD　実際176』ということでしたが、")
						.AddComment("　　詠唱中の持ち替えで、素手ガトリングフィーバー状態にすると、")
						.AddComment("　　再現された実測値は「177」でした。")
						.AddComment("　　（修正後の計算機でも、「177.2」と計算されます）")
						.AddComment("　　おそらく、単に計算機の設定解除が漏れただけだと思いますが、")
						.AddComment("　　万が一、『素手ガトリングフィーバーで176だった』という場合は、")
						.AddComment("　　お手数ですが、具体的な再現手順を添えてお知らせいただけると、助かります。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 1, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("蜃気楼ＹＥ関連エンチャント　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 1, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("キューペット追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年２月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「スカラバハイヒール」のMDEFが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「カルデュイの法衣」のMATK上昇効果が、")
						.AddComment("杖型のMATKで設定されていた（＝MATKペナルティ対象だった）問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「嵐の弓」の、スキル「シビアレインストーム」の消費SP増加ペナルティが")
						.AddComment("計算されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 2, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年バレンタインイベント　新規カード　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("超越エンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("シーズンエンチャント　宮廷魔術師　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 2, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("シーズンエンチャント　宮廷魔術師（白の騎士団武器）　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 2, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("白の騎士団エンチャントが可能な武器のうち、")
						.AddComment("ラグ缶の景品アイテムとして実装されたものでも、")
						.AddComment("シーズンエンチャント宮廷魔術師の対象になっていた問題を修正。")
						.AddComment("（該当装備の第二スロットのエンチャント状況は、読み込み時にクリアされます）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 2, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年３月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 2, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『特定のアイテムセット効果の説明文に改行ミスがある』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　ご指摘の通り、当該箇所は改行を意図しているにもかかわらず、")
						.AddComment("　　表示上、改行されていない箇所になります。")
						.AddComment("　　ただ、プログラム的な実態としては、")
						.AddComment("　　『本来、改行等が含まれるべきでないスキル名に改行が含まれている』")
						.AddComment("　　という、データ登録の事情による不具合となっています。")
						.AddComment("　　このようなデータは、本家ROratorio様が運営されていたころの構造に必要なもので、")
						.AddComment("　　現在もその構造が残っている箇所があり、変更していないという事情があります。")
						.AddComment("　　別途、プログラムを追加して対応を行うことも可能ではありますが、")
						.AddComment("　　昨年から進めている大改造に伴い、登録データも色々と整理する予定なので、")
						.AddComment("　　その作業に巻き込む形で是正したいと考えております。")
						.AddComment("　　（同様の問題をはらんでいる箇所は他にもあるので……）")
						.AddComment("　　読みづらいなど支障があるかとは思いますが、ご理解ご容赦いただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 3, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深海生物のマント　対応")
						.AddComment("※公式ページからリンクで飛べないため、URL直接入力で確認、登録してあります。")
						.AddComment("※シーズンエンチャント（神秘の館）の対象リストには記載がなかったため、")
						.AddComment("　類似品とは異なり、エンチャントできないものとして登録してあります。")
						.AddComment("　既にゲーム内で入手されていて、エンチャントできると確認されている場合は、")
						.AddComment("　エンチャントの内容をご連絡いただければ、対応可能です。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「オケアノスの加護」の第二スロットへのエンチャントが")
						.AddComment("登録されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 3, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオの仕様変更への対応ですが、次回以降の更新での対応となります。")
						.AddComment("ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("ドワーフエンチャントへの対応ですが、少し遅くなりそうです。")
						.AddComment("理由は、最近増えてきた『同じ箇所に複数のエンチャント方法がある』装備について、")
						.AddComment("現在の計算機のデータ登録の方法では、今後対応していくのが困難になると考え、")
						.AddComment("エンチャントデータについて、前倒しで大幅改造を適用しようと考えたためです。")
						.AddComment("大幅改造自体が滞っている状態ではありますが、")
						.AddComment("改造の順序を変更して最優先で対応しますので、今しばらくお待ちください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("ひな祭りイベントの「雛ダンジョン」に出現するモンスターについては、")
						.AddComment("期間限定であることから、作業コスト削減のために、データ登録を行わない予定です。")
						.AddComment("（モンスター手入力で対応いただければ、幸いです）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("計算機の『お知らせ表示部分』を折りたためるように変更")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深海生物のマント　シーズンエンチャント対応")
						.AddComment("※シーズンエンチャント（神秘の館）の対象リストにサイレント追加されてました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年ひな祭りイベント　装備追加対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年ひな祭りイベント　エンチャント追加対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年４月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『できれば、属性の積算を表示していただきたいです。")
						.AddComment("　装備欄の下あたりに「これらを全部装備すれば属性耐性〇〇％だよ～」みたいな。』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　ご連絡いただいた内容を何度か読み返したのですが、")
						.AddComment("　　少しうまく理解できない箇所があり、２通りの解釈ができるように感じました。")
						.AddComment("")
						.AddComment("　　まず、『現在の全部の装備の合計での属性耐性』という意味であれば、")
						.AddComment("　　計算機右側にある「カスタム表示」の欄を開いていただき、")
						.AddComment("　　「拡張表示」→「属性倍率」を選んでいただくと、ご希望のデータが表示されます。")
						.AddComment("")
						.AddComment("　　もうひとつの解釈として、")
						.AddComment("　　『その装備に、そのカード、そのエンチャントをつけた場合の、装備単品の属性耐性』")
						.AddComment("　　という意味の場合、現状の計算機のプログラムでは、対応は非常に困難です。")
						.AddComment("　　現在進めている（ことになっている）計算機の大幅改造が完成すれば、")
						.AddComment("　　結果的に、容易に表示できるようになる見込みですが、")
						.AddComment("　　管理人のリアルの都合もあり、信じられないほど遅れているのが実情です。")
						.AddComment("　　従いまして、こちらの意図でご提案いただいていた場合、")
						.AddComment("　　『現時点では、事実上、対応不能』という回答となります。")
						.AddComment("　　申し訳ありませんが、ご容赦ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 3, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("カードセット「英雄の凱歌＆魔神の巨影」の効果変更　対応")
						.AddComment("※魔法攻撃に効果が適用されないように修正しました。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 4, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオ、および、ドワーフエンチャントへの対応は、間に合いませんでした。")
						.AddComment("次回以降の対応となりますこと、ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("イリュージョンオブツインズ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("イリュージョンオブツインズ　対応")
						.AddComment("※公式のモンスターサーチに表示される経験値は、２倍キャンペーン適用後のものと考え、")
						.AddComment("　同ツールで表示された数値の半分を、本来の経験値として登録してあります。")
						.AddComment("　もし、実測と差があるようでしたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("スキル「戦太鼓の響き」の消費ＳＰの仕様変更　対応")
						.AddComment("（公式サイトの「3月22日パッチ内容について」ページ追記分）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("スキル「ニーベルングの指輪」の消費ＳＰの仕様変更　対応")
						.AddComment("（公式サイトの「3月22日パッチ内容について」ページ追記分）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『経験値テーブルページで、必要討伐数が間違っているように見える』")
						.AddComment("　→同ページの下部にも記載がありますが、必要討伐数は若干特殊な計算がされています。")
						.AddComment("　　まず、実際のゲームにおける仕様として、")
						.AddComment("　　『レベルアップに必要な量を超えて獲得した経験値は、次のレベルに持ち越される』")
						.AddComment("　　『一度に獲得できる経験値は、レベルアップに必要な量の２倍まで』")
						.AddComment("　　というルールがあります。")
						.AddComment("")
						.AddComment("　　例としてご連絡いただいた「深海のオボンヌ」の場合、経験値は２０Ｍですので、")
						.AddComment("　　ご指摘の通り、キャラクターがＬｖ１２０以上の場合、")
						.AddComment("　　経験値が０の状態からレベルアップするには、２匹以上倒す必要があります。")
						.AddComment("　　ただ、当該テーブルの計算では、Ｌｖ９０から積み上げて計算しているため、")
						.AddComment("　　『Ｌｖ１２０にレベルアップしたときの、持ち越しの経験値がある』")
						.AddComment("　　という状態で計算されています。")
						.AddComment("　　（Ｌｖ９０から、ずっと「深海のオボンヌ」だけを狩り続けているような計算です）")
						.AddComment("　　これにより、『持ち越し分＋２０Ｍ≧必要経験値』となるため、")
						.AddComment("　　「必要討伐数」の欄には『１匹』と表示されます。")
						.AddComment("")
						.AddComment("　　ただ、必要経験値が２０Ｍより多いレベルになってくれば、")
						.AddComment("　　いずれ持ち越し分を足しても、必要経験値に届かなくなりますので、")
						.AddComment("　　その時は、「必要討伐数」が『２匹』になります。")
						.AddComment("　　そうすると、次のレベルでは、比較的多めに持ち越しがありますので、")
						.AddComment("　　２０Ｍ稼ぐことでレベルアップでき、再び『１匹』になることがあります。")
						.AddComment("　　このような『持ち越し分』も含めた計算であるため、単純計算とは異なる結果になります。")
						.AddComment("　　（もし、ゲーム内での仕様が変わっているようでしたら、その旨をお知らせください）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 4, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオ、および、ドワーフエンチャントへの対応は、間に合いませんでした。")
						.AddComment("次回以降の対応となりますこと、ご容赦ください。")
						.AddComment("（恐らく、４月中は厳しいと思われます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年４月１２日パッチ　エンチャント追加対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年５月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 4, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオ、および、ドワーフエンチャントへの対応は、間に合いませんでした。")
						.AddComment("次回以降の対応となりますこと、ご容赦ください。")
						.AddComment("（作業自体は進んでいます。今しばらくお待ちいただければと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("オートマティック追加エンチャント　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 5, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオ、および、ドワーフエンチャントへの対応は、間に合いませんでした。")
						.AddComment("次回以降の対応となりますこと、ご容赦ください。")
						.AddComment("（作業自体は進んでいます。今しばらくお待ちいただければと思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「封印されたイフリート」の単体でのステータス上昇効果が、")
						.AddComment("ゲーム内よりも高く計算されていた問題を修正。")
						.AddComment("（ご連絡いただいた情報から、JobLv÷20 分の上昇に修正しました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『装備品等による属性耐性の数値を表示していただくことは可能でしょうか』")
						.AddComment("　→『現在の装備設定、アイテム設定などでの合計』であれば、")
						.AddComment("　　計算機右側にある「カスタム表示」の欄で確認することが可能です。")
						.AddComment("　　「カスタム表示」を展開し、「拡張表示」→「属性倍率」を選んでいただくと、")
						.AddComment("　　全属性の一覧が表示されます。")
						.AddComment("")
						.AddComment("　　なお、以前、別の方への回答でも触れましたが、")
						.AddComment("　　『その装備に、そのカード、そのエンチャントをつけた場合の、装備単品の属性耐性』")
						.AddComment("　　という意味の場合、現状の計算機のプログラムでは、対応は非常に困難です。")
						.AddComment("　　現在進めている（ことになっている）計算機の大幅改造が完成すれば、")
						.AddComment("　　結果的に、容易に表示できるようになる見込みですが、")
						.AddComment("　　管理人のリアルの都合もあり、信じられないほど遅れているのが実情です。")
						.AddComment("　　従いまして、こちらの意図でご提案いただいていた場合、")
						.AddComment("　　『現時点では、事実上、対応不能』という回答となります。")
						.AddComment("　　申し訳ありませんが、ご容赦ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 5, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオ、および、ドワーフエンチャントへの対応は、間に合いませんでした。")
						.AddComment("次回以降の対応となりますこと、ご容赦ください。")
						.AddComment("（作業はかなり進んでいますので、近いうちに対応できると思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年６月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ゲフェニア 水の古書」の名称が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のエンチャントの名称がゲーム内の表示と異なっていた問題を修正。")
						.AddComment("※以前から誤認の多かった「攻撃速度4」等のエンチャントについても、")
						.AddComment("　実際の効果を示す「攻撃速度+10%」等の表記から、")
						.AddComment("　付与されるエンチャント名である「攻撃速度4」等に変更しました。")
						.AddComment("　なお、表示される名称の変更だけで、効果には変更ありません。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のアイテム等の名称における細かい表記揺れなどを修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 5, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("バトルコロッセオの仕様変更は、内容確認中です。")
						.AddComment("今しばらくお待ちください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("エンチャントのデータ構造を変更")
						.AddComment("対象装備は全てテストしたつもりですが、おかしな動作等があればお知らせください。")
						.AddComment("また、エンチャントの系列（ファロスエンチャント等）も保存するようにしました。")
						.AddComment("（以前のセーブデータの場合は、そのエンチャントが設定できる系列のうち、")
						.AddComment("　最初に見つかった系列が選択された状態になります）")
						.AddComment("項目への条件表示やエンチャントのソート等、少し見づらい気がしている部分もありますので、")
						.AddComment("お気づきの点などがありましたら、連絡フォームよりお知らせいただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("武器に属性を付与するエンチャントに対応")
						.AddComment("「火属性付与(武器)」などが、選択できるようになりました。")
						.AddComment("（従来あった「×属性付与（未対応）」を選択していたデータを読み込んだ場合、")
						.AddComment("　自動的に未設定の状態となります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("エンチャントの構造変更の一環で、武器の属性計算処理を修正しました。")
						.AddComment("一通り問題なさそうであることは確認していますが、")
						.AddComment("おかしな動作や疑わしい計算結果がありましたら、ご連絡ください。")
						.AddComment("なお、二刀流の属性計算と苦無の属性優先度の件は、まだ対応できていません。")
						.AddComment("（「対応検討中の項目」ページもご参照ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ドワーフエンチャント　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「フェイスオブイグドラシル」が持つ「すべてのステータス + 3」の効果について、")
						.AddComment("集中力向上等の基礎計算に“含まれる”ように修正。")
						.AddComment("（ゲーム内で実測して確認しましたので、2022/05/25時点では“含まれる”で間違いありません）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「お金を失った者の心[1]」が、ヒドゥンスロットエンチャントEXの")
						.AddComment("対象になっていた問題を修正。")
						.AddComment("（公式説明ページとゲーム内NPCの会話で確認しましたが、")
						.AddComment("　どちらも「お金を失った者の心[0]」しか候補にないため、バグとして修正しました。")
						.AddComment("　もし、実際にはエンチャント可能である場合は、ご連絡ください）")
						.AddComment("（該当の設定を行ったセーブデータを読み込んだ場合は、未設定に修正されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("武器「サバイバルロッド(DEX)」、「サバイバルロッド(INT)」について、")
						.AddComment("スロットがない方にも、エンチャントの設定ができた問題を修正。")
						.AddComment("（該当の設定を行ったセーブデータを読み込んだ場合は、未設定に修正されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("・防具「狐耳鈴リボン」の第３スロットに、「大司教2」が設定できた問題を修正。")
						.AddComment("・防具「パワードブーツ」の第２スロットに、「Flee+6」が設定できた問題を修正。")
						.AddComment("・防具「ガーディアンブースター」の第２スロットに、「Flee+6」が設定できた問題を修正。")
						.AddComment("・防具「ユニコーンの兜」の第３スロットに、「プレイヤー耐性12」が設定できた問題を修正。")
						.AddComment("・防具「バレルヘルム」の第３スロットに、「プレイヤー耐性12」が設定できた問題を修正。")
						.AddComment("・防具「ゴッズヘルム」の第３スロットに、「プレイヤー耐性12」が設定できた問題を修正。")
						.AddComment("・防具「デモニッシュシールド」の第４スロットに、「大司教1」、「大司教2」、")
						.AddComment("　「大聖堂1」が設定できた問題を修正。（正しくは、第２スロット）")
						.AddComment("・防具「プロキオンリング」の第３スロットに、「プレイヤー耐性3」が設定できた問題を修正。")
						.AddComment("（いずれも公式ページのリストになく、エンチャントできるはずのない効果でした）")
						.AddComment("（該当の設定を行ったセーブデータを読み込んだ場合は、未設定に修正されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「スプンタマンユ」の第３スロットに、「完全回避+5」が設定できなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 6, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("2022/03/15以降の、バトルコロッセオの仕様変更に対応。")
						.AddComment("・「アンリミット」の「遠距離物理攻撃力増加量」を増加")
						.AddComment("・「セルフディストラクション」の「詠唱時間」の減少")
						.AddComment("・「セルフディストラクション」の「固定詠唱時間」の減少")
						.AddComment("・「マーシュオブアビス」の「再使用待機時間」の減少")
						.AddComment("・「フリッグの歌」の「固定詠唱時間」の削除")
						.AddComment("・「フリッグの歌」の「再使用待機時間」の減少")
						.AddComment("・「幻術 -朧幻想-」の「再使用待機時間」の減少")
						.AddComment("・「太陽の光」の「再使用待機時間」の減少")
						.AddComment("・「太陽の光」の「太陽爆発の増加率」の増加")
						.AddComment("・「月の光」の「再使用待機時間」の減少")
						.AddComment("・「月の光」の「満月脚の増加率」の増加")
						.AddComment("・「流星落下」の「流星落下発動確率」の増加")
						.AddComment("・「星の光」の「再使用待機時間」の減少")
						.AddComment("・「星の光」の「流星落下の増加率」の増加")
						.AddComment("・「創星の書」の「物理攻撃力」の増加")
						.AddComment("・「新星爆発」の「物理攻撃力」の増加")
						.AddComment("・「星帝降臨」の「物理攻撃力」の増加")
						.AddComment("※以下は、下方修正。")
						.AddComment("・「マスカレード：ウィークネス」の「再使用待機時間」の増加")
						.AddComment("・「うずくまる」の「ダメージ軽減率」の低下")
						.AddComment("※以下は、計算機での対応はなし。")
						.AddComment("・「フェイントボム」の変更")
						.AddComment("・「幻術 -分身-」の2022/03/15の変更（2022/04/12に取り消し）")
						.AddComment("・「魂の収穫」の変更")
						.AddComment("・「魂の連結」の変更")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("サマーパッケージ２０２２　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("エンチャント「起源の王」と「黄金蟲」カードのセット　対応")
						.AddComment("※説明文の追記のみで、計算結果には反映されません。")
						.AddComment("　（多段ＨＩＴスキルでの挙動や、適用外となるスキル、")
						.AddComment("　　金剛等のダメージカット系スキルとの競合など、不明確な点が多く、")
						.AddComment("　　管理人も検証できないため、対応不能と判断しました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『クリティカルの値がゲーム内の表示と異なる』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　クリティカル率に関しては、ゲーム内のステータスウィンドウに表示される値は、")
						.AddComment("　　実際の計算に使われる値と異なっていることが、過去の検証で判明しています。")
						.AddComment("　　計算機の表示では、『実際の計算に使われる値』の方を表示しているため、")
						.AddComment("　　ゲーム内の画面と見比べると、差があるように見えます。")
						.AddComment("　　ただ、計算する際に知りたいのは、実際に使われる値の方だと思いますので、")
						.AddComment("　　計算機では、実際に使われる値を「クリティカル」の欄に表示しています。")
						.AddComment("　　この点については、修正せず、今後もこの表示で行きたいと考えております。")
						.AddComment("　　ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『盾の欄にルドのロールペーパーがない』")
						.AddComment("　→恐れ入りますが、こちらでは問題を確認できませんでした。")
						.AddComment("　　今一度、装備条件を満たしているか、ご確認ください。")
						.AddComment("　　（「ルドのロールペーパー」には、職業制限があります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ハルシネーションウォーク効果終了後のASPDペナルティの計算がゲーム内と合わない』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　当該事象については、以前別の方からもご指摘いただいていたのですが、")
						.AddComment("　　まだ対応できていないままとなっております。")
						.AddComment("　　ＡＳＰＤの計算については、かなり面倒な計算方法になっているため、")
						.AddComment("　　同ペナルティが、どの順序で、どの部分を対象に行われるのか、")
						.AddComment("　　いくつかのパターンを実測して検証する必要があると考えています。")
						.AddComment("　　（同ペナルティの計算に関しては、本家様の計算式を変更していないはずなので、")
						.AddComment("　　　一度しっかりと、『現在の仕様』を確認する必要があると考えています）")
						.AddComment("　　難しい検証ではない見込みですが、ここのところ重たい更新が続いて息切れ気味なので、")
						.AddComment("　　対応には少しお時間をいただくことになるかと思います。")
						.AddComment("　　あしからず、ご容赦いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 6, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("2022/06/07　23:40追記")
						.AddComment("アイテムデータページが正常に表示されない問題を修正")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ステ情報と、サイトの情報が合っていない部分2ヵ所ある』")
						.AddComment("　→詳細な情報のご連絡ありがとうございます。")
						.AddComment("　　結論から言うと、")
						.AddComment("　　『いずれも、ゲーム内の表示が、実際に計算に使用する値でないため、")
						.AddComment("　　　実際に計算に使用する値を表示している計算機と、表示がずれる』")
						.AddComment("　　ということになります。")
						.AddComment("")
						.AddComment("　　まず、「Hit」が一致しないのは、「ワシの目」を習得しているためです。")
						.AddComment("　　「ワシの目」を習得すると、習得レベル１ごとにHitが１上がりますが、")
						.AddComment("　　ゲーム内のステータス欄に表示される値には、この上昇量が含まれていません。")
						.AddComment("　　そのため、ずれが生じています。")
						.AddComment("")
						.AddComment("　　次に、「Critical」が一致しないのは、")
						.AddComment("　　『ゲーム内のステータス欄で計算しているLukによるクリティカル率と、")
						.AddComment("　　　実際の計算で用いられるLukによるクリティカル率が異なる』")
						.AddComment("　　という点と、")
						.AddComment("　　『以前、別の方が検証して下さった、レベルによるクリティカル率の増加分が、")
						.AddComment("　　　ゲーム内の表示には含まれていない』")
						.AddComment("　　という点の、２つが原因です。")
						.AddComment("")
						.AddComment("　　先日、別の方への回答でも記載しましたが、")
						.AddComment("　　計算する際に知りたいのは、実際に使われる値の方だと思いますので、")
						.AddComment("　　計算機では、今後も、実際に使われる値を表示していく方針です。")
						.AddComment("　　混乱を招いてしまい申しあわけありませんが、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『マキシマイズパワーを、二次職支援設定に加えて欲しい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　現状、本家様の頃からの歴史的な経緯により、")
						.AddComment("　　「マキシマイズパワー」の設定は、「アイテム(食品/他)」欄にあります。")
						.AddComment("　　今後、二次職支援設定に移動させたいとは考えておりますが、")
						.AddComment("　　他にも設定欄がバラバラになっているスキルが多くあるため、")
						.AddComment("　　すぐには対応が難しい状況にあります。")
						.AddComment("　　お手数ですが、ひとまずは、「アイテム(食品/他)」欄にて設定をお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 6, 9)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ブラウザ移行機能が正常に動作していない』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　こちらでいくつかのパターンを確認しましたが、動作自体は正常に見えました。")
						.AddComment("　　ただ、非常に誤解を招きやすそうな操作方法になっていたため、")
						.AddComment("　　恐らく、操作方法が正しく伝わってないのではないかと考え、")
						.AddComment("　　より標準的な操作方法に変更しました。")
						.AddComment("　　（機能実装時に、突貫工事で作成したため、かなりヒドイ操作方法になっていました）")
						.AddComment("　　操作手順の説明なども更新していますので、その手順で操作していただき、")
						.AddComment("　　それでも問題が発生する場合は、再度、ご連絡をお願いいたします。")
						.AddComment("　　（その場合、どのブラウザからどのブラウザへ移行しようとしているか、")
						.AddComment("　　　ブラウザのバージョンも添えてお知らせください。")
						.AddComment("　　　また、セーブデータの件数、名前の設定の有無などもお知らせいただけると、")
						.AddComment("　　　問題の原因を特定しやすくなると思いますので、併せてお願いいたします。")
						.AddComment("　　　なお、セーブデータ自体は、文字数制限で連絡フォームで送信できないと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 6, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年７月くじ　対応")
						.AddComment("")
						.AddComment("※エンチャント「異境の統轄者」と「タートルジェネラル」カードのセット効果は、")
						.AddComment("　マグナムブレイク状態による火属性ダメージの追加と同じ効果として計算しています。")
						.AddComment("　そのため、マグナムブレイク状態による効果とは、“重複しない”計算になっています。")
						.AddComment("　また、「エンチャントデッドリーポイズン」による毒属性追加ダメージよりも、")
						.AddComment("　優先して計算されるようになっています。（従来からの計算機の仕様）")
						.AddComment("　もし、ゲーム内でのダメージと異なるようでしたら、お知らせください。")
						.AddComment("")
						.AddComment("※エンチャント「異境の統轄者」と「タオグンカ」カードのセット効果にある、")
						.AddComment("　「[ストーンスキン]Lv2使用可能」については、未対応です。")
						.AddComment("　計算処理としては、防具「ウルフヘジン」のオートスペルの処理が元からありますが、")
						.AddComment("　かなり昔に実装されたアイテムで、ダメージ計算式の変更などが入っている可能性があり、")
						.AddComment("　同じ処理で計算するのは安全ではないと考えたためです。")
						.AddComment("　なお、その元からある処理では、おおよそ次のような処理になっています。")
						.AddComment("　　・計算順序は、エナジーコートによる軽減の後、金剛による軽減の前")
						.AddComment("　　・エナジーコートによる軽減などとは、全て乗算")
						.AddComment("　　　（つまり、エナジーコート＋金剛に、ストーンスキンを加えると、さらに軽減される）")
						.AddComment("　　・計算位置的に、素手ＡＴＫ部分も軽減可能（種族耐性カードと同様の特性）")
						.AddComment("　検証データ等をいただければ対応は可能ですが、")
						.AddComment("　当計算機自体が、受けるダメージの計算は正確でない可能性が高いため、")
						.AddComment("　データをいただけても、適切に適用できない可能性が高いです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 6, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年ブライダルイベント　対応")
						.AddComment("")
						.AddComment("※エンチャント「異境の統轄者」と「封印されたタートルジェネラル」カードのセット効果は、")
						.AddComment("　封印されていないカードとのセット効果の“下位互換”として計算するようにしています。")
						.AddComment("　そのため、マグナムブレイク状態による効果や、封印されていないカードのセット効果とは、")
						.AddComment("　”重複しない”計算になっています。")
						.AddComment("　また、「エンチャントデッドリーポイズン」による毒属性追加ダメージよりも、")
						.AddComment("　優先して計算されるようになっています。（従来からの計算機の仕様）")
						.AddComment("　もし、ゲーム内でのダメージと異なるようでしたら、お知らせください。")
						.AddComment("")
						.AddComment("※「タオグンカ」カード、「封印されたタオグンカ」カードの各種セット効果にある、")
						.AddComment("　「ストーンスキン」スキルの計算については、未対応です。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「異境の統括者」とカード「黒蛇王」のセット効果のうち、")
						.AddComment("MDEFの増加する効果が、適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「異境の統括者」と防具「双児宮のマント」を装備した場合に、")
						.AddComment("正しくは、エンチャント「異境の統括者」とカード「黒蛇王」のセット効果である、")
						.AddComment("MDEFの増加する効果が、誤って適用されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 6, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("新規キャノンボール４種類　対応")
						.AddComment("※バトルコロッセオ専用ですが、処理の都合上、常に選択肢に表示されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ドワーフエンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("スペシャルエンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("バトルコロッセオ　スキル調整（2022/06/28）　対応")
						.AddComment("※スキル「魂の分裂」を受けた状態を計算する場合は、暫定的に、")
						.AddComment("　「性能カスタマイズ（ステータス関連）」の欄にある、")
						.AddComment("　「ディレイ短縮」の設定を、-200% に設定して計算してください。")
						.AddComment("　（本日の更新で、-200% まで設定できるようにしました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『詠唱シミュレータにカトリンカードなどで他職のスキルを入れることは可能でしょうか』")
						.AddComment("　→機能拡張のご提案ありがとうございます。")
						.AddComment("　　結論から言えば、可能です。")
						.AddComment("　　ただ、後述のバグ修正を優先する必要があるのと、他の保留になっている要望もあるため、")
						.AddComment("　　対応まで少しお時間をいただくことになるかと思います。")
						.AddComment("　　（四次職へ向けての大規模改造も並行しているため、正直、課題が山積み状態です）")
						.AddComment("　　あしからず、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『カードデータ一覧のエンチャント対象のリストがおかしい』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　ご指摘の通り、誤ったリストアップがされています。")
						.AddComment("　　バグですので優先的に対処する予定ですが、今日の修正には間に合いませんでした。")
						.AddComment("　　近日中には、修正できるかと思いますので、今しばらくお待ちください。")
						.AddComment("")
						.AddComment("　　なお、誤ったデータが表示される状態は好ましくありませんので、")
						.AddComment("　　一時的に、『エンチャント情報の表示』を使用できないようにしました。")
						.AddComment("　　恐れ入りますが、修正までの間、ご容赦いただきますよう、お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アモンラーカードが公式の説明文と違う』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　本日の修正で、露店取引情報ツールで表示される説明文に合わせました。")
						.AddComment("　　（計算機の都合上、厳密には若干異なる部分があります。ご了承ください）")
						.AddComment("")
						.AddComment("　　なお、特に昔からあるアイテムやカードなどでは、")
						.AddComment("　　何かのタイミングで説明文が更新されることがあります。")
						.AddComment("　　（今回であれば、「異境の統轄者」とのセット効果実装のタイミングだと思います）")
						.AddComment("　　現状、効果に変更がない場合、作業量削減のため、データの更新は行っていません。")
						.AddComment("　　ご連絡いただければ、ある程度は対応できるかと思いますが、")
						.AddComment("　　今後も同様の方針を続ける予定ですので、ご理解いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 7, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カードデータ一覧でエンチャント情報を表示した際に、")
						.AddComment("実際にはエンチャントできない装備がリストアップされていた問題を修正。")
						.AddComment("（ある程度確認していますが、万が一まだ誤りがありましたらお知らせください）")
						.AddComment("※エンチャントデータの再登録により、エンチャント条件なども特定できるのですが、")
						.AddComment("　表示にかかる時間がさらに長くなってしまうので、導入は見送りました。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 7, 13)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年８月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『無限インデュア状態でのMdef+1が計算されていない』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　無限インデュア状態については、これまでアイテム説明文でしか対応していなかったため、")
						.AddComment("　　対象をリストアップした後、修正したいと思います。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『モンスターのATKが、モンスターサーチのATKと異なるのはなぜでしょうか』")
						.AddComment("　→疑問点について、詳しく説明いただきありがとうございます。")
						.AddComment("　　ご質問に対する回答としては、")
						.AddComment("　　『計算機に表示されるＡＴＫは、次の２点を考慮した値になっているため』")
						.AddComment("　　となります。順に説明します。")
						.AddComment("")
						.AddComment("　　１つ目は、『モンスターの素手ＡＴＫを含めた値を表示している』という点です。")
						.AddComment("　　キャラクターの場合、素手ＡＴＫ（ＳＴＲやＤＥＸによって増えるＡＴＫ）と、")
						.AddComment("　　装備に設定されているＡＴＫ（武器のＡＴＫやＡＴＫ増加効果など）の合計が、")
						.AddComment("　　最終的な“攻撃力”として用いられます。")
						.AddComment("　　同様に、モンスターの場合、ステータスに設定された「ＳＴＲ」によって、")
						.AddComment("　　「素手ＡＴＫ」が決まります。（正確には「レベル」も加味されます）")
						.AddComment("　　これに、キャラクターの装備ＡＴＫに相当する「ＡＴＫ」のステータスを足すと、")
						.AddComment("　　そのモンスターの、最終的な“攻撃力”となります。")
						.AddComment("　　そのため、例としてご連絡いただいた「呪殺のヒメルメズ」などは、")
						.AddComment("　　「ＡＴＫ」ステータスは『30k程度』ですが、「ＳＴＲ」が『160k以上』あるので、")
						.AddComment("　　最終的な“攻撃力”、つまり「ＡＴＫ」は、実質『190k程度』ということになります。")
						.AddComment("")
						.AddComment("　　２つ目は、『モンスターのＡＴＫは一定の範囲でランダムになる』という点です。")
						.AddComment("　　モンスターのステータスに設定された「ＡＴＫ」は、実際の計算では、")
						.AddComment("　　設定された値を中心に、±２０％の範囲でランダムになります。")
						.AddComment("　　（本家様が実装された計算を、そのまま引き継いでいるだけではありますが、")
						.AddComment("　　　いわゆるRR化以降、システムが根底から変わったことはないはずなので、")
						.AddComment("　　　計算式に変化はないと考えています）")
						.AddComment("　　先の「呪殺のヒメルメズ」の例でいえば、『30k程度』のほうの値だけ、")
						.AddComment("　　±２０％の範囲でぶれます。")
						.AddComment("　　このブレを含むため、モンスターのＡＴＫは、○○～△△というように、")
						.AddComment("　　ある程度の幅をもった値で表示されます。")
						.AddComment("")
						.AddComment("　　以上が、ご質問に対する回答となります。")
						.AddComment("　　もし、実際のゲーム内でのダメージが大きく違うという場合は、ご連絡ください。")
						.AddComment("")
						.AddComment("　　なお、素手ＡＴＫとステータスのＡＴＫを足して表示しているのは、")
						.AddComment("　　単純に、本家様の表示方法をそのまま踏襲しているという理由によるものです。")
						.AddComment("　　この計算機は、敵に与えるダメージの計算に主眼を置いているため、")
						.AddComment("　　受けるダメージの計算に適していないという点は、ご容赦いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 7, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備等の『インデュア状態になる』効果が適用された場合に、")
						.AddComment("インデュアLv1使用時と同様の『MDEF + 1』効果が計算されるように修正。")
						.AddComment("※「インデュア」が常時発動しているという計算なので、")
						.AddComment("　通常の「インデュア」、「コンセントレイション」とは重複しない計算にしています。")
						.AddComment("※装備効果やセット効果は、装備を設定するだけで自動で計算されますが、")
						.AddComment("　アンティペインメント等のアイテム効果にも対応するため、")
						.AddComment("　「一次職支援設定」の欄にインデュアの設定を新設してあります。")
						.AddComment("　ご都合に応じてご利用ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「パラケルススグローブ」とエンチャント「覇王」のセット効果の説明文に、")
						.AddComment("職業限定の効果である記載が漏れていた点を修正。")
						.AddComment("※『ジェネティックが装備時、』という記載が漏れていました。")
						.AddComment("※計算結果には影響ありません。")
						.AddComment("　（３秒間限定の『必中攻撃 + 100%』効果は、アイテム時限効果で設定しますが、")
						.AddComment("　　アイテム時限効果は、設定をONにすると無条件で計算に組み込む仕様です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("演奏スキル「フリッグの歌」が、演奏系スキルと重複して設定できない問題を修正。")
						.AddComment("これに伴い、「フリッグの歌」の設定欄を「三次職支援設定」に移動。")
						.AddComment("※ご連絡いただいた仕様変更は、2020/07/07のパッチ内容のうち、")
						.AddComment("　『「フリッグの歌」が演奏・ダンススキルのAグループに属さなくなり、")
						.AddComment("　　A・Bグループのスキルと効果が重複するように仕様を変更いたしました。』")
						.AddComment("　という件だと判断しました。")
						.AddComment("　当該資料では、「フリッグの歌」以外に関して変更は記載されていないので、")
						.AddComment("　「フリッグの歌」以外には、特に変更を加えていません。")
						.AddComment("　もし、他にも影響を受けているスキルがある場合は、お知らせください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 7, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年メロンフェスタ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 7, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2022/08/30に実施予定のLv200解放アップデートについて、")
						.AddComment("お知らせページを公開いたしました。")
						.AddComment("計算機のお知らせや、更新履歴の冒頭にあるリンク等からご覧いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「封印されたエドガ」とエンチャント「起源の王」のセット効果のうち、")
						.AddComment("『純粋なVitが130の時』に適用される効果が、VitではなくLukで計算されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『装備をお気に入りに登録して手軽に付け替えれる機能がほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　実は、同様の機能を実装する構想自体は、以前からあります。")
						.AddComment("　　ただ、順序的に大規模改造が終わった後に行わないと、")
						.AddComment("　　複雑化したプログラムに、さらに大がかりな機能を追加してしまうことになり、")
						.AddComment("　　より複雑化して大変なことになってしまいます。")
						.AddComment("　　大規模改造が大幅に遅れているため、すぐに対応することはできませんが、")
						.AddComment("　　いずれ実装したいと考えていますので、気長にお待ちいただければ幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『コルセオヒールのＰＴ人数に応じて回復量が増える計算機能がほしい』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　まず、管理人がそのような仕様があることを把握していませんでした。申し訳ありません。")
						.AddComment("　　計算のどこにどう影響するのか実測したうえで、バグ修正として対応したいと思います。")
						.AddComment("　　８月のどこかで修正できると思いますので、今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 8, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("ブラウザ「Internet Explorer」の扱いを、「非推奨」から「対象外」に変更します。")
						.AddComment("これまで、一応 Internet Explorer でも動くように配慮してきましたが、")
						.AddComment("今後は、Internet Explorer で動かない技術も利用していきます。")
						.AddComment("もしかしたら、それでも動く可能性はありますが、当計算機の立場としては、")
						.AddComment("『Internet Explorer では、動いても動かなくても気にしない』となります。")
						.AddComment("最適なプログラムへと改良していくために必要なことですので、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「カスタム表示」機能の「拡張情報」→「ヒール回復力」に「コルセオヒール」を追加。")
						.AddComment("※ＰＴ人数１人あたり、最終回復量を２．５％アップする計算にしてあります。")
						.AddComment("　（ソロＰＴやＰＴ未加入時にも、１人として効果が乗るようです）")
						.AddComment("　もし、実際のゲーム内と誤差があるようでしたらお知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("計算機の「カスタム表示」について、画面の右上に固定されている表示を、")
						.AddComment("ページ内に埋め込む機能を追加いたしました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『右上のカスタム表示欄を動かせるようにして欲しい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　（同時にご連絡いただいた、ゲーム内での実測情報についてもありがとうございます）")
						.AddComment("　　まず、技術的な面では、問題なく対応できると思います。")
						.AddComment("　　ただ、本日の更新で対応したように、サクッと終わるような作業ではなく、")
						.AddComment("　　かなりしっかりとしたプログラミングが必要になると見込まれますので、")
						.AddComment("　　課題が山積みになっている現状を考えると、今すぐ対応することは困難です。")
						.AddComment("　　また、この先、四次職の実装が控えていることなども考えると、")
						.AddComment("　　『利便性の向上』を目的とした機能は、かなり後回しになってしまうかと思います。")
						.AddComment("　　計算機の対応の優先度としては、どうしても、")
						.AddComment("　　　「計算の正確性」＞＞＞「表示データの有無などの機能性」＞「利便性」")
						.AddComment("　　のようなイメージで対応せざるを得ないため、この点、ご容赦いただければと思います。")
						.AddComment("　　なお、代替案として、ご要望の一部にあった、")
						.AddComment("　　　『画面右上の固定表示から、ページ埋め込みに切り替える』")
						.AddComment("　　という機能は追加いたしましたので、こちらをお試しいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『計算機の結果を利用するツールを作成しました』")
						.AddComment("　→わざわざご連絡いただき、ありがとうございます。")
						.AddComment("　　せっかく公開前にご連絡いただいたところ、大変申し訳ないのですが、")
						.AddComment("　　計算機の運営における独立性や公平性の観点から、内容の確認は行いませんでした。")
						.AddComment("　　（そのような意図はないと存じておりますが、『避難所管理人確認済み』のように")
						.AddComment("　　　レッテルを貼られてしまうと、方々に迷惑をかけてしまう可能性がありますので、")
						.AddComment("　　　一律の対応として、一切関与しないようにしております）")
						.AddComment("")
						.AddComment("　　なお、計算機の結果を利用するツールや計算機への入力支援ツール等は、")
						.AddComment("　　常識的に許される範囲であれば、自由に制作していただいて構いません。")
						.AddComment("　　（常識的に許される範囲か判断がつかないような場合は、お控え願います）")
						.AddComment("　　また、事前連絡や許可申請等も一切不要です。")
						.AddComment("　　（プログラムの内部データを利用するような場合であっても不要です）")
						.AddComment("")
						.AddComment("　　ただし、現在の計算機のプログラムは、現代のプログラム技術からみると、")
						.AddComment("　　お世辞にも良いとは言えない構造になっています。")
						.AddComment("　　現在行っている大改造に合わせて、それらの構造も少しずつ改良する予定ですので、")
						.AddComment("　　計算機の更新が原因で、ツールの更新が必要になる可能性があります。")
						.AddComment("　　その点だけ、ご了承いただければと思います。")
						.AddComment("　　（もっとも、大改造が終わっても、いきなり計算機を入れ替えることはしません。")
						.AddComment("　　　多少なりとも、旧計算機と新計算機の両方が使える時期を設ける予定ですので、")
						.AddComment("　　　その期間でご対応いただければと思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 8, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2022/08/30に実施予定のLv200解放アップデートについて、")
						.AddComment("専用ページにて、準備状況を公開しました。")
						.AddComment("計算機のお知らせや、更新履歴の冒頭にあるリンク等からご覧いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の回廊２０２２年８月　エンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のアイテムで、名称が正確でない問題について、")
						.AddComment("公式の「露店取引情報」ツールに登録されている名称を基準に修正。")
						.AddComment("※これに合わせて、「風魔手裏剣・○○」の読み仮名を全体的に修正しました。")
						.AddComment("　装備選択欄での並び順が変更になっていますので、ご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2022/08/30（火）のLv200解放アップデートの適用と合わせて、")
						.AddComment("計算機には登録されているが、ゲーム内には存在しないと思われるアイテムを")
						.AddComment("選択できないように変更します。")
						.AddComment("（選択されているセーブデータでは、読み込んだ際に『装備なし』に変更されます）")
						.AddComment("もし、下記のアイテムをゲーム内で所持している方がいらっしゃいましたら、")
						.AddComment("お手数ですが、連絡フォームよりご連絡いただければと思います。")
						.AddComment("　・サクリファイスリング")
						.AddComment("　・初心者用アドベンチャースーツ")
						.AddComment("　・暗殺者のダマスカス(勇猛)")
						.AddComment("　・暗殺者のダマスカス(特攻)")
						.AddComment("　・グラディエーターのブレイド(特攻)")
						.AddComment("　・グラディエーターのブレイド(勇猛)")
						.AddComment("　・突撃隊長のカッツバルケル(特攻)")
						.AddComment("　・突撃隊長のカッツバルケル(勇猛)")
						.AddComment("　・突撃隊長のスピアー")
						.AddComment("　・突撃隊長のランス")
						.AddComment("　・狂戦士のバトルアックス(特攻)")
						.AddComment("　・狂戦士のバトルアックス(勇猛)")
						.AddComment("　・闘士のモーニングスター(特攻)")
						.AddComment("　・闘士のモーニングスター(勇猛)")
						.AddComment("　・虐殺のカタール(勇猛)")
						.AddComment("　・虐殺のカタール(特攻)")
						.AddComment("　・孫子兵法(勇猛)")
						.AddComment("　・孫子兵法(特攻)")
						.AddComment("　・バトルクロスボウ(特攻)")
						.AddComment("　・バトルクロスボウ(勇猛)")
						.AddComment("　・闘士のバトルフィスト(特攻)")
						.AddComment("　・闘士のバトルフィスト(勇猛)")
						.AddComment("　・ウォーロックの魔法杖")
						.AddComment("　・ウォーロックの戦闘杖")
						.AddComment("　・強い回復の杖")
						.AddComment("　・早い回復の杖")
						.AddComment("　・戦場のギター(特攻)")
						.AddComment("　・戦場のギター(勇猛)")
						.AddComment("　・バトルラリエット(特攻)")
						.AddComment("　・バトルラリエット(勇猛)")
						.AddComment("　・ソルジャーハンドガン")
						.AddComment("　・ソルジャーライフル")
						.AddComment("　・ソルジャーガトリングガン")
						.AddComment("　・ソルジャーショットガン")
						.AddComment("　・ソルジャーグレネードガン")
						.AddComment("　・戦闘風魔手裏剣(勇猛)")
						.AddComment("　・戦闘風魔手裏剣(特攻)")
						.AddComment("　・突撃隊長のプレート")
						.AddComment("　・精鋭工兵の鎧")
						.AddComment("　・暗殺者のローブ")
						.AddComment("　・ウォーロックの戦闘ローブ")
						.AddComment("　・衛生兵のローブ")
						.AddComment("　・精鋭軍兵のスーツ")
						.AddComment("　・精鋭射手のスーツ")
						.AddComment("　・司令官のマント")
						.AddComment("　・指揮官のマント")
						.AddComment("　・保安官のマント")
						.AddComment("　・戦闘グリーブ")
						.AddComment("　・軍靴")
						.AddComment("　・戦闘ブーツ")
						.AddComment("　・武功勲章(剣士系)")
						.AddComment("　・武功勲章(シーフ系)")
						.AddComment("　・武功勲章(聖系)")
						.AddComment("　・武功勲章(魔系)")
						.AddComment("　・武功勲章(弓系)")
						.AddComment("　・武功勲章(商人系)")
						.AddComment("　・保安官バッジ")
						.AddComment("　・ノービスフィギュア　（※収集品ではなく、アクセサリー）")
						.AddComment("　・ソードマンフィギュア")
						.AddComment("　・アコライトフィギュア")
						.AddComment("　・マジシャンフィギュア")
						.AddComment("　・アーチャーフィギュア")
						.AddComment("　・シーフフィギュア")
						.AddComment("　・マーチャントフィギュア")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 8, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年９月くじ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 8, 23)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2022/08/30に実施予定だったLv200解放アップデートの延期に関して、")
						.AddComment("専用ページに追記いたしました。")
						.AddComment("計算機のお知らせや、更新履歴の冒頭にあるリンク等からご覧いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("Lv200解放アップデートは延期になりましたが、2022/08/16の更新でお知らせした、")
						.AddComment("『計算機には登録されているが、ゲーム内には存在しないと思われるアイテムを")
						.AddComment("　選択できないように変更する』")
						.AddComment("という計算機の変更については、予定通り、2022/08/30（火）に適用する予定です。")
						.AddComment("（選択されているセーブデータでは、読み込んだ際に『装備なし』に変更されます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「アビスシールド」のアイテム説明文に、破損しないことが記載されていない")
						.AddComment("問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 8, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("2022/08/16の更新履歴で予告した通り、下記のアイテムを選択不可に変更。")
						.AddComment("（選択されているセーブデータでは、読み込んだ際に『装備なし』に変更されます。")
						.AddComment("　また、精錬値、カードの設定もクリアします）")
						.AddComment("　・サクリファイスリング")
						.AddComment("　・初心者用アドベンチャースーツ")
						.AddComment("　・暗殺者のダマスカス(勇猛)")
						.AddComment("　・暗殺者のダマスカス(特攻)")
						.AddComment("　・グラディエーターのブレイド(特攻)")
						.AddComment("　・グラディエーターのブレイド(勇猛)")
						.AddComment("　・突撃隊長のカッツバルケル(特攻)")
						.AddComment("　・突撃隊長のカッツバルケル(勇猛)")
						.AddComment("　・突撃隊長のスピアー")
						.AddComment("　・突撃隊長のランス")
						.AddComment("　・狂戦士のバトルアックス(特攻)")
						.AddComment("　・狂戦士のバトルアックス(勇猛)")
						.AddComment("　・闘士のモーニングスター(特攻)")
						.AddComment("　・闘士のモーニングスター(勇猛)")
						.AddComment("　・虐殺のカタール(勇猛)")
						.AddComment("　・虐殺のカタール(特攻)")
						.AddComment("　・孫子兵法(勇猛)")
						.AddComment("　・孫子兵法(特攻)")
						.AddComment("　・バトルクロスボウ(特攻)")
						.AddComment("　・バトルクロスボウ(勇猛)")
						.AddComment("　・闘士のバトルフィスト(特攻)")
						.AddComment("　・闘士のバトルフィスト(勇猛)")
						.AddComment("　・ウォーロックの魔法杖")
						.AddComment("　・ウォーロックの戦闘杖")
						.AddComment("　・強い回復の杖")
						.AddComment("　・早い回復の杖")
						.AddComment("　・戦場のギター(特攻)")
						.AddComment("　・戦場のギター(勇猛)")
						.AddComment("　・バトルラリエット(特攻)")
						.AddComment("　・バトルラリエット(勇猛)")
						.AddComment("　・ソルジャーハンドガン")
						.AddComment("　・ソルジャーライフル")
						.AddComment("　・ソルジャーガトリングガン")
						.AddComment("　・ソルジャーショットガン")
						.AddComment("　・ソルジャーグレネードガン")
						.AddComment("　・戦闘風魔手裏剣(勇猛)")
						.AddComment("　・戦闘風魔手裏剣(特攻)")
						.AddComment("　・突撃隊長のプレート")
						.AddComment("　・精鋭工兵の鎧")
						.AddComment("　・暗殺者のローブ")
						.AddComment("　・ウォーロックの戦闘ローブ")
						.AddComment("　・衛生兵のローブ")
						.AddComment("　・精鋭軍兵のスーツ")
						.AddComment("　・精鋭射手のスーツ")
						.AddComment("　・司令官のマント")
						.AddComment("　・指揮官のマント")
						.AddComment("　・保安官のマント")
						.AddComment("　・戦闘グリーブ")
						.AddComment("　・軍靴")
						.AddComment("　・戦闘ブーツ")
						.AddComment("　・武功勲章(剣士系)")
						.AddComment("　・武功勲章(シーフ系)")
						.AddComment("　・武功勲章(聖系)")
						.AddComment("　・武功勲章(魔系)")
						.AddComment("　・武功勲章(弓系)")
						.AddComment("　・武功勲章(商人系)")
						.AddComment("　・保安官バッジ")
						.AddComment("　・ノービスフィギュア　（※収集品ではなく、アクセサリー）")
						.AddComment("　・ソードマンフィギュア")
						.AddComment("　・アコライトフィギュア")
						.AddComment("　・マジシャンフィギュア")
						.AddComment("　・アーチャーフィギュア")
						.AddComment("　・シーフフィギュア")
						.AddComment("　・マーチャントフィギュア")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 9, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「Jobボーナス表」ページが正しく表示されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ＹＥ攻城戦報酬アイテム追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『白スリムポーション等の回復量がわかる機能を追加頂くことは可能でしょうか？』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　結論から申し上げると、『現段階では、不可能』となります。")
						.AddComment("　　理由としては、装備等の『一部のアイテムの回復効果アップ』系のデータが、")
						.AddComment("　　計算可能なデータとして完全には登録されていないという事情があります。")
						.AddComment("　　（登録してあったりなかったりなので、正しく計算できません）")
						.AddComment("　　大幅改造後には、アイテムデータ等の再登録を考えているので、")
						.AddComment("　　それが終われば計算できるようになる見込みですが、相当先になると思います。")
						.AddComment("　　（今年中は無理そうなぐらい先です）")
						.AddComment("")
						.AddComment("　　機能としては有用だと思うので、できるならば対応したいのですが、")
						.AddComment("　　相当な作業量になるので、ちょっと見通しなどもお伝え出来ません。")
						.AddComment("　　せっかくのご提案いただいたところ、申し訳ありませんが、")
						.AddComment("　　ご容赦いただけたらと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 9, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("Lv200解放アップデートの2022/10/04実装に関して、専用ページに追記いたしました。")
						.AddComment("計算機のお知らせや、更新履歴の冒頭にあるリンク等からご覧いただけます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("Lv200解放アップデート　初期対応")
						.AddComment("予告していた通り、事前準備できていたものは対応してあります。")
						.AddComment("その他の項目の対応状況は、専用ページに記載してありますので、")
						.AddComment("計算機のお知らせや、更新履歴の冒頭にあるリンク等からご確認下さい。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「経験値テーブル」ページの、表示するテーブルの選択肢の順番を変更")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("新規テラーダンジョン３種　対応")
						.AddComment("※需要高そうなのでKIAIで何とかしました。")
						.AddComment("　これ以外は無理です、すみません。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの実測データのご連絡ありがとうございます。")
						.AddComment("ご連絡いただいたデータのうち、HP/SP、ステータスポイントは、")
						.AddComment("今週のクジ対応のアップデートで反映できると思います。")
						.AddComment("（獲得ステータスポイントは、全レベル分頂きました。ありがとうございます）")
						.AddComment("申し訳ありませんが、今しばらくお待ちください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("超越アップデート　新装備　対応")
						.AddComment("※ランダムオプションも対応済み。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("キューペット追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("キューペット「グラウンドプティット」の未確定だった特殊効果を削除。")
						.AddComment("※公式露店ツールで卵を検索した際の説明文にないため削除しましたが、")
						.AddComment("　もし実際には効果があるようでしたら、お知らせください。")
						.AddComment("　削除した効果は『ASPD +1%、DEF -2、MDEF -2』です。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("連絡フォームのジョブレベル選択が、上限解放に対応できていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『シビアレインストームのダメージがおかしい（超越アップデート前）』")
						.AddComment("　→申し訳ないのですが、現在、管理人側で細かい検証を行う余裕がありません。")
						.AddComment("　　『計算機の値の３０％～５０％くらいしか出てない』とのことですので、")
						.AddComment("　　属性の設定、敵の設定（ストーンスキン等）、時限効果の有無（アンリミット等）を")
						.AddComment("　　ご確認いただき、それでも合わないということであれば、")
						.AddComment("　　ＵＲＬ出力の結果を合わせて、ご連絡いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『95%が上限になった項目で、補正前の数値も確認できるようにできないでしょうか』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　結論から言うと、対応は可能です。")
						.AddComment("　　ただ、アップデートの変更点への対応が優先となりますので、")
						.AddComment("　　重要な変更点への対応が一通り終わった後の検討となります。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 12)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの実測データのご連絡ありがとうございます。")
						.AddComment("更新作業前までにいただいた、HPとSPのデータ、および、")
						.AddComment("獲得ステータスポイントについては、すべて反映いたしました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年１１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『大罪武器のエンチャ情報を入れて頂けないでしょうか』")
						.AddComment("　→恐らく、大罪武器の「ランダムオプション」のことかと思いますが、")
						.AddComment("　　「ランダムオプション」については、入力欄を切り替えることで設定が可能です。")
						.AddComment("　　「武器属性付与」設定欄の上にある「入力欄切替」ボタンを押していただくと、")
						.AddComment("　　ランダムオプションの設定画面に切り替わりますので、そちらをご利用ください。")
						.AddComment("　　なお、付与される値の最大値については、当計算機はあまり対応できていません。")
						.AddComment("　　（公式ページに明記されているものについては、全て対応していますが、")
						.AddComment("　　　ほとんどの場合、付与される能力の種類しか公表されていないためです）")
						.AddComment("　　悪しからず、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ドラゴンブレスのダメージがおかしい』")
						.AddComment("　→申し訳ないのですが、現在、管理人側で細かい検証を行う余裕がありません。")
						.AddComment("　　メールの内容から察するに、ダメージが１０分の１になる相手の可能性や、")
						.AddComment("　　モンスターがディフェンダー状態にある可能性があります。")
						.AddComment("　　お手数ですが、ダメージ減衰の設定（「モンスター状態強化設定」欄にあります）等を")
						.AddComment("　　ご確認いただき、それでも合わないということであれば、")
						.AddComment("　　ＵＲＬ出力の結果を合わせて、ご連絡いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの実測データのご連絡ありがとうございます。")
						.AddComment("更新作業前までにいただいた、HPとSPのデータは、すべて反映いたしました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年ブートキャンプ　アイテム追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「トランセンデンスリング」が登録されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの実測データのご連絡ありがとうございます。")
						.AddComment("更新作業前までにいただいた、HPとSPのデータは、すべて反映いたしました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("Lv200解放アップデートに関して、色々と対応しました。")
						.AddComment("詳細は、専用ページよりご確認ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("Lv200解放アップデートにより上限が設けられた項目について、")
						.AddComment("上限を超過している量も表示するようにしました。")
						.AddComment("レイアウト上見づらいなどありましたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年ハロウィンイベント　ペット追加　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 10, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント機能が正常に機能していなかった問題を修正。")
						.AddComment("（10/30の更新手順ミスです。申し訳ありませんでした）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 11, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの実測データのご連絡ありがとうございます。")
						.AddComment("更新作業前までにいただいた、HPとSPのデータは、すべて反映いたしました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("タナトスの記憶　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("タナトスの記憶　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("特定地域のモンスターに与える魔法ダメージが増加する効果のうち、")
						.AddComment("「鉱山ダンジョン03」および「アビスレイク地下洞窟04」に対する効果が")
						.AddComment("計算されていなかった問題を修正。")
						.AddComment("（バグは魔法ダメージだけです。物理ダメージは計算されていました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("「△△属性物理攻撃で与えるダメージ＋○○％」の効果を新設")
						.AddComment("※ゲーム内表記で「△△属性物理攻撃力＋○○％」と記載されている効果です。")
						.AddComment("　計算機では、従来からある『△△属性魔法攻撃で与えるダメージ＋○○％』の")
						.AddComment("　物理版と考えて計算に組み込むようにしてあります。")
						.AddComment("　（計算位置も、魔法同様、ボス／一般特化の前で適用、切り捨てありで計算）")
						.AddComment("※計算機では、『最終的な攻撃属性』を元に適用判定を行っています。")
						.AddComment("　例えば、武器属性が「地」の状態で、強制「火」属性のマグナムブレイクを計算する場合、")
						.AddComment("　「祈る者」カードの時限効果「火属性物理攻撃力＋10%」は効果アリで計算しますが、")
						.AddComment("　「幸福を与える者」カードの時限効果「地属性物理攻撃力＋10%」は効果なしで計算します。")
						.AddComment("※もし、ゲーム内のダメージと異なる場合は、お知らせください。")
						.AddComment("　（素手ＡＴＫなど、魔法と異なる概念が色々あるため、検証が必要な場合は時間がかかります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『豪傑・真理など込みの場合の戦闘結果を併記してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　文脈から察するに、現状の「クイック調整」欄のような方法ではなく、")
						.AddComment("　　自動的に、各効果の有無を切り替えて計算した結果を併記してほしいという")
						.AddComment("　　要望だと判断しました。")
						.AddComment("　　結論から申し上げて、ご要望の機能には対応できないと思います。")
						.AddComment("　　理由は色々とありますが、一番の理由は、")
						.AddComment("　　　『時限効果が増えるに伴い、結果のパターン数が指数関数的に増加すること』")
						.AddComment("　　で、たった３種類の時限効果があるだけで、計算時間が８倍になります。")
						.AddComment("　　（プログラムの構造上、最終結果を補正するだけで結果が求まるような、")
						.AddComment("　　　単純なつくりになっていないため、最初から全て再計算する必要があります）")
						.AddComment("　　他にも、技術的な課題が色々とあるため、現時点での計算機を元に考えると、")
						.AddComment("　　ご提案いただいた機能に対応することは、事実上不可能という判断になります。")
						.AddComment("　　悪しからず、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『装備のフィルタ機能か、表示の取捨選択を自分で設定できる機能がほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　結論から申し上げると、『現時点では』対応は難しいです。")
						.AddComment("　　まず、技術的な面からいうと、対応は不可能ではありません。")
						.AddComment("　　また、方法論の面でも、例えば現在のモンスターのマップ選択機能のように、")
						.AddComment("　　『マップの名前』で検索するような方法は既にあるので、流用も可能です。")
						.AddComment("　　ただ、マップの名前による検索は、実は全てのマップデータを再登録しており、")
						.AddComment("　　検索に必要なデータなどを改めて登録したため、検索できるようになっています。")
						.AddComment("　　これに対して、アイテム（装備）のデータは、古い形式のままになっており、")
						.AddComment("　　マップの名前のような検索／フィルタ機能に、対応できません。")
						.AddComment("　　そのため、検索／フィルタ機能を設けるためには、計算機の大改造後に行う予定の、")
						.AddComment("　　全アイテム（装備）データの再登録が完了する必要があります。")
						.AddComment("　　また、表示の取捨選択を自分で設定できる機能についても、")
						.AddComment("　　技術的に不可能ではないのですが、プログラムとして検討すべき課題が多数あります。")
						.AddComment("　　非常に便利な機能であることは間違いないと思いますが、このような理由から、")
						.AddComment("　　『現時点では』すぐに対応するのは難しいという判断になります。")
						.AddComment("　　悪しからず、ご了承ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 11, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年１２月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２年ミミミのミッションマスター　エンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("パッシブ持続系欄で「フィアーブリーズ」のレベルを1以上に設定している場合、")
						.AddComment("計算機が正常に動作しない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 11, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("四次職等への対応に備えて、計算機を２つに分けました。")
						.AddComment("「安定版」が従来の計算機で、できるだけ正確な計算を重視します。")
						.AddComment("「次世代版」が新しい計算機で、四次職等へも対応していきます。")
						.AddComment("詳しくは、「次世代版」の計算機横の「？」リンク等からご確認ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("画面左のメニューを少し整理しました。")
						.AddComment("今一つ、使い勝手の良い感じにならなかったので、")
						.AddComment("レイアウトのご提案などがありましたら、ぜひお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("シーズンエンチャントグループ８のアイテムに、")
						.AddComment("エンチャント「知識の探求者」を設定できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「フェイスオブイグドラシル」に、")
						.AddComment("エンチャント「知識の探求者」を設定できない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「ランドグリス」に、エンチャント「異境の統轄者」との")
						.AddComment("セット効果が登録されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 11, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『計算機の右下のスキルカード判定（参考）というものを非表示にしたい』")
						.AddComment("　→恐れ入りますが、当計算機には該当の表示を行う機能はございません。")
						.AddComment("　　何らかのツール、プラグイン、アドオンなどをお使いではないでしょうか？")
						.AddComment("　　外部のツール等の機能については、当計算機側では把握しておりませんので、")
						.AddComment("　　該当ツール等を管理されている方にご確認いただくよう、お願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 11, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("「四次職関連への対応」の対応方針について、専用ページに追記しました。")
						.AddComment("計算機のお知らせや、更新履歴の冒頭にあるリンク等からご覧いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("四次職アップデート　カード追加　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 1)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("セーブデータを削除する機能について、不具合のご連絡をいただいています。")
						.AddComment("本日の更新では修正できていないため、当該機能のご利用はお控えいただくよう、")
						.AddComment("お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２アニバーサリーパッケージ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２２アニバくじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「司祭のローブ」に、聖属性が設定されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職への対応を開始するにあたり、安定版のほうのプログラムにも、")
						.AddComment("結構な量の修正を加えることになりました。")
						.AddComment("一通り確認したつもりですが、計算結果が疑わしい場合や、")
						.AddComment("計算機が正常に動作しない事態などが起きた場合には、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("四次職　対応開始　基本データ登録")
						.AddComment("※特性ステータスや、四次スキルなどは対応できていません。")
						.AddComment("　四次職の条件で、三次職までのスキルのダメージ計算は可能です。")
						.AddComment("※ASPDや所持限界量は、ひとまず三次職と同じにしています。")
						.AddComment("　差があるようでしたら、ご連絡いただけると幸いです。")
						.AddComment("※装備可能アイテムは、三次職と同じにしています。")
						.AddComment("　四次職からのアイテムは未対応（未登録）です。")
						.AddComment("※三次職データを簡単に四次職にするボタンを設けてあります。")
						.AddComment("　説明をお読みいただき、ご都合に応じてご利用ください。")
						.AddComment("※四次職データは、「次世代版計算機」でのみご利用いただけます。")
						.AddComment("　「安定版計算機」ではURL入力等でも読み込めませんので、ご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業レンジャーのLv200におけるHPが誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの検証結果等をご連絡いただきありがとうございます。")
						.AddComment("申し訳ありませんが、今日は特性ステータスの検証で手一杯だったため、")
						.AddComment("HP/SPや所持限界量など、多くの情報が反映できていません。")
						.AddComment("悪しからず、ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職スキルですが、現在、情報を整理している段階となっております。")
						.AddComment("スキル名だけ登録するのは難しくないのですが、")
						.AddComment("ダメージ計算や支援効果などの実装には、かなり検証が必要そうです。")
						.AddComment("状況は、四次職実装アップデート専用ページからご確認いただけますので、")
						.AddComment("今しばらくお待ちいただけたらと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】特性ステータス　一部対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("セーブデータを読み込んだ際、武器種別から「両手斧」が消えてしまう問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カタール武器を装備して通常攻撃した際、ダメージの表示が二重になる問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 6)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("たくさんの検証結果等をご連絡いただきありがとうございます。")
						.AddComment("申し訳ありませんが、今日の更新でもHP/SP等は反映できていません。")
						.AddComment("悪しからず、ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("【次世代版のみ】二刀流時の左手ダメージ計算が正しくないことを確認しています。")
						.AddComment("恐れ入りますが、修正が完了するまで、計算される際にはご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】特性ステータス　セーブ＆ロード対応")
						.AddComment("※更新前のデータは保存されません。一度計算機をリロードしてご利用ください。")
						.AddComment("　特性ステータス欄の注意書きがなくなっていれば、正常に更新できています。")
						.AddComment("　通常のリロードで更新できない場合は、スーパーリロード等をお試しください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】「Res」および「Mres」によるダメージ減衰計算　対応")
						.AddComment("※現状、ダメージ倍率と同程度の誤差が出るケースがあります。")
						.AddComment("　（ダメージ倍率が3000%なら、30程度の誤差が予想されます）")
						.AddComment("　どこかの小数点以下の処理が誤っているのだと思いますが、")
						.AddComment("　特定には時間がかかりそうなので、計算される際はご注意ください。")
						.AddComment("※計算式に誤りがあったり、スキルによっては通常と異なる計算式の可能性もあります。")
						.AddComment("　事前に全てを確認することは難しいので、計算結果を盲信しないようにご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("新規ダンジョン５種、新規ＭＤ２種　対応")
						.AddComment("※経験値２倍にもかかわらず、公式モンスターサーチで経験値が奇数の敵は、")
						.AddComment("　端数切捨てで登録してあります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『保安区域のモンスターにサイキックウェーブで攻撃したとき、")
						.AddComment("　特製アーノルディとレッドペッパーカッパに対してのみ威力が落ちる原因は？』")
						.AddComment("　→簡潔に申し上げて、いただいた情報だけでは特定できませんでした。")
						.AddComment("　　URL出力の情報をいただけると調査はできるかもしれませんが、")
						.AddComment("　　四次職アップデートの対応に追われている現状、素早い回答は困難と思われます。")
						.AddComment("　　悪しからず、ご了承ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("【次世代版のみ】命中率が低い場合に、平均攻撃回数の計算結果がズレます。")
						.AddComment("その結果、攻撃回数（平均）、経験値効率（すべて）が同様にズレます。")
						.AddComment("また、攻撃間隔を正しく計算できないケースがあります。")
						.AddComment("その結果、攻撃回数（秒間）、経験値効率（秒間）が正しくないケースがあります。")
						.AddComment("恐れ入りますが、修正が完了するまで、計算される際にはご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("【次世代版のみ】ダメージの表示が以前と変更になっています。")
						.AddComment("また、従来は『100,000×3Hit』や『3,000 + 1,000』のような表示になっていた部分が、")
						.AddComment("合計の数字しか表示されない状態になっています。")
						.AddComment("元々分割表示だったものについては、次回以降の修正で対応する予定ですので、")
						.AddComment("ご不便をおかけしますが、今しばらくお待ちいただきますよう、お願いいたします。")
						.AddComment("なお、根本的なレイアウトに対するご意見やご提案なども受け付けております。")
						.AddComment("スキルでクリティカルが発生する都合上、悩んだうえで今のレイアウトにしていますが、")
						.AddComment("もっとスマートに表示できる方法があれば、改良を検討いたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】超越アップデートのクリティカル仕様変更　対応")
						.AddComment("これに伴い、ダメージ計算処理、計算結果欄の表示方法などを、")
						.AddComment("かなり大幅に変更しています。")
						.AddComment("ある程度のパターンは確認しているつもりですが、元の構造があまりにも複雑なため、")
						.AddComment("不正確そうな計算結果や、計算機の動作が停止するなどの異常がありましたら、")
						.AddComment("連絡フォームよりお知らせいただけると幸いです。")
						.AddComment("なお、大きな問題がなければ、次回以降、四次職のスキルを計算式が単純なものから、")
						.AddComment("登録し始める予定です。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("性能カスタマイズに、近接物理攻撃のダメージ上昇効果の項目を追加")
						.AddComment("（他の項目と同様、距離用で１つなので、遠距離と共用になります。")
						.AddComment("　使いづらいかとは思いますが、対応優先度の関係で未改良です。ご容赦ください）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】四次職で、一部の装備が選択欄に表示されなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「王冠をつけたシナモンのリュック」が登録されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「20周年記念コットンシャツ」が登録されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アビスチェイサーのジョブ補正がLv36までしか設定されてない』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　ご推察の通り、公式ページを参照してデータを登録したため、")
						.AddComment("　　Lv37以降は変化がないのかと考え、そのように登録していました。")
						.AddComment("　　韓国サーバーと同じと思われるということで情報をいただきましたが、")
						.AddComment("　　中途半端に未確認情報を増やしたくないので、公式ページの不具合を連絡し、")
						.AddComment("　　修正後に対処したいと思います。")
						.AddComment("　　今しばらくお待ちいただくよう、お願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職のHP/SPの実測について、たくさんのデータをご連絡いただき、ありがとうございます。")
						.AddComment("いただいたデータの内容から、複数の職業で200～220のHP/SPが確定しましたが、")
						.AddComment("これらを見る限り、レベル200～220の各レベルでの上昇量は同じであると推定されます。")
						.AddComment("従いまして、ある程度データが揃い、それらの中で不一致が起きなければ、")
						.AddComment("上昇量は同じという前提で、全レベル確認済み扱いとするように変更いたします。")
						.AddComment("あらかじめ、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("【次世代版のみ】四次職スキルへの対応に着手しました。")
						.AddComment("ドラゴンナイトから順に進める予定で、実測検証可能なものは実測したうえで、")
						.AddComment("ダメージ計算等を登録していきます。")
						.AddComment("計算可能になったスキルについては、順次更新履歴でもお知らせしますので、")
						.AddComment("ご参照ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("・ドラゴンナイト「ツーハンドディフェンディング」")
						.AddComment("・ドラゴンナイト「ハックアンドスラッシャー」")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】職業「アビスチェイサー」のジョブ補正が、")
						.AddComment("Lv36までしか登録されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】スキル「シャープシューティング」のダメージ計算で、")
						.AddComment("装備等のクリティカルダメージ増加効果が半減されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("・ドラゴンナイト「マッドネスクラッシャー」")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】必中効果の表示が削除されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ダメージ等計算結果欄が、縦に長すぎて以前のものと比べて見辛い』")
						.AddComment("　→使用感のご連絡ありがとうございます。")
						.AddComment("　　本日の更新で、ご提案にあった横方向への表の分割を行ってみました。")
						.AddComment("　　管理人自身、多少は見やすくなったように思いますが、いかがでしょうか？")
						.AddComment("　　他にも、ブロック単位でタブ表示のように切り替える案なども試していますが、")
						.AddComment("　　確信をもって見やすいレイアウトを見つけられていません。")
						.AddComment("　　情報の取捨選択を含め、他にも良い案をお持ちの方がいらっしゃいましたら、")
						.AddComment("　　ぜひご連絡ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職の攻撃系スキルですが、何種類か検証したところ、")
						.AddComment("ベースレベルによる増幅倍率などは似たような計算式になっているようでした。")
						.AddComment("これを受け、ひとまず一通りのスキルを『似たような計算式』で実装し、")
						.AddComment("おおよその計算ができるようにする方針としました。")
						.AddComment("攻撃スキル名に「(×)」とついているものは、このひとまず登録した計算式です。")
						.AddComment("「(△)」とついているものは、一応実測した計算式に修正してあります。")
						.AddComment("その他、細かい点は、四次アップデート専用ページをご参照ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("アサシンクロススキル「エンチャントデッドリーポイズン」ですが、")
						.AddComment("追加の攻撃力が発生するスキルと発生しないスキルがあります。")
						.AddComment("アサシンクロス自身が習得できるスキルについては、すべて検証済みなのですが、")
						.AddComment("避難所開設以降にオートスペルや装備時使用可能などで使えるようになったスキルが、")
						.AddComment("一切検証されていない状況でした。")
						.AddComment("これに関して、本日の更新で、未検証のスキル、及び、四次職で習得するスキルについて、")
						.AddComment("『物理攻撃であれば基本的に乗る』という判定に変更いたしました。")
						.AddComment("万が一乗らない場合（計算結果がずれる場合）は、ご連絡いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】プログラム上個別のダメージ表記処理でないスキルについて、")
						.AddComment("『１ＨＩＴのダメージ×ＨＩＴ数』での表示に対応。")
						.AddComment("「与ダメージ」欄の『詳細表示』のチェックボックスで表示を切り替えられます。")
						.AddComment("（個別処理のものは、順次プログラムを書き換えていきます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・ドラゴンナイト「サーヴァントウェポン」")
						.AddComment("・ドラゴンナイト「サーヴァントウェポン：ファントム」")
						.AddComment("・ドラゴンナイト「サーヴァントウェポン：デモリッション」")
						.AddComment("・ドラゴンナイト「ドラゴニックオーラ」（スキル自体のダメージのみ）")
						.AddComment("・ドラゴンナイト「ストームスラッシュ」（ジャイアントグロース２倍未対応）")
						.AddComment("・シャドウクロス「ダンシングナイフ」")
						.AddComment("・シャドウクロス「エターナルスラッシュ」")
						.AddComment("・シャドウクロス「シャドウスタブ」")
						.AddComment("・シャドウクロス「サベージインパクト」")
						.AddComment("・シャドウクロス「インパクトレーター」")
						.AddComment("・シャドウクロス「フェイタルシャドウクロー」")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】多段ＨＩＴするスキルのダメージ計算が誤っていた問題を修正。")
						.AddComment("（ＨＩＴ数を２回かけてしまっていたため、ＨＩＴ数が多いほどずれていました。")
						.AddComment("　申し訳ありません）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『次世代版では、まだ４次職のデータを入力しても、セーブ／ロードできない状態でしょうか？")
						.AddComment("　また、将来的には、従来版同様のセーブロード、一覧からの選択ができるようになる予定でしょうか？")
						.AddComment("　→説明場所が散乱しているせいで、分かりづらくなってしまい申し訳ありません。")
						.AddComment("　　まず、現在「次世代版」でセーブ／ロード、および一覧からの選択できないのは、仕様です。")
						.AddComment("　　四次職や先日の超越アップデートへの対応で、「次世代版」は相当プログラムを修正しているため、")
						.AddComment("　　プログラム的な安全のために、セーブ／ロード関連機能を制限しております。")
						.AddComment("　　使いづらいかとは思いますが、ご理解、ご容赦いただきますよう、お願いいたします。")
						.AddComment("　　次に、将来的な動作については、ご質問の通り、従来と同じようにセーブ／ロード、および、")
						.AddComment("　　一覧からの選択ができるようにする予定です。")
						.AddComment("　　時期を明言することはできませんが、従来のセーブ／ロード関連の機能を削除する予定はないので、")
						.AddComment("　　その点はご安心いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『敵からの被ダメについて、スキルでの被ダメは考慮されていない、であっていますか？")
						.AddComment("　また、敵から「一発」素殴りされたときの被ダメと考えてよいでしょうか？")
						.AddComment("　→基本的には、ご質問に記載されている考え方で相違ありません。")
						.AddComment("　　ただし、モンスター側の支援効果については、あまり対応していないため、")
						.AddComment("　　モンスターに支援がかかっている状況などでは、ずれが生じる可能性があります。")
						.AddComment("　　また、当計算機は、敵に与えるダメージの計算に主眼を置いているため、")
						.AddComment("　　敵から受けるダメージの計算には適していない点、ご容赦いただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・カーディナル「フレーメン」")
						.AddComment("・カーディナル「アルビトリウム」")
						.AddComment("・カーディナル「ニューマティックプロセラ」")
						.AddComment("・カーディナル「ペティティオ」")
						.AddComment("・カーディナル「エフィリゴ」")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職用の新装備についてですが、プログラムの構造の都合上、")
						.AddComment("四次職のスキルデータをすべて登録した後での追加となる見込みです。")
						.AddComment("お待たせしてしまい申し訳ありませんが、ご理解、ご容赦願います。")
						.AddComment("（スクラップ系武器、リラプス系武器、ラヘル追加装備等）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】攻撃間隔欄に設置系スキルの発動間隔等を追加")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・ウィンドホーク　各種")
						.AddComment("・アークメイジ　各種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【安定版のみ】Res、Mresによる与ダメージ軽減計算　対応")
						.AddComment("※ラヘルフィールドで三次職でもResとMresが設定された敵と戦闘可能になると")
						.AddComment("　思われたので、次世代版から計算式を移植しました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("エピソード「祈りの方向」アップデート　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】カーディナルスキル「ニューマティックプロセラ」、および、")
						.AddComment("「フレーメン」について、魔法の属性が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 22)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・マイスター　各種")
						.AddComment("　（ABR全般に関して、対応はかなり先になる可能性があります。ご容赦ください）")
						.AddComment("・インペリアルガード　各種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】レンジャースキル「エイムドボルト」のダメージ計算が")
						.AddComment("正常に行われていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ドラゴンナイトのスキル、ヴィゴールの使用感などを連絡します』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　バーサークと加算、クラッシュストライクに乗らないとのことで、")
						.AddComment("　　通常攻撃を完全に判定して適用していると理解しました。")
						.AddComment("　　なお、計算機への適用についてですが、全四次職のスキル登録を最優先としたいため、")
						.AddComment("　　今しばらくお待ちいただければと思います。")
						.AddComment("　　せっかくご連絡いただいた中申し訳ありませんが、ご容赦ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 24)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・アビスチェイサー　各種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エレメンタルマスターの各スキルの詠唱時間等を調査しました』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　エレメンタルマスターのスキルデータ登録時に、併せて反映させていただきます。")
						.AddComment("　　（順序的に、今週末は間に合いそうにないですが……）")
						.AddComment("　　なお、詠唱時間の調査については、INT+DEX=0にできるのであれば、")
						.AddComment("　　『詠唱時間－○○％』の効果を載せて、0%と50%カットを比較する方法などもあります。")
						.AddComment("　　（管理人は固定詠唱については、その方法で確証を得ることが多いです）")
						.AddComment("　　（INT+DEX=0調整はしたことがありませんでした。2PC妖精の魂などができそうですね）")
						.AddComment("　　今後、何か調査される際のご参考になれば幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『RESとアームズキャノンの関係を検証しました』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　『DEF無視/MDEF無視スキルは、RES/MRESも無視できる可能性が高い』とのことで、")
						.AddComment("　　計算機としても何らかの対応を取ろうと検討しております。")
						.AddComment("　　プログラムの改造方法等も含めて検討しますので、今しばらくお待ちいただければと思います。")
						.AddComment("　　※実は、計算機のプログラムでは、アームズキャノンは個別にダメージ計算されており、")
						.AddComment("　　　多くのスキルが共通で使うダメージ計算のプログラムを使用しない作りになっています。")
						.AddComment("　　　ですので、他のDEF無視系スキル（ギロチンクロスのカウンタースラッシュ等）での")
						.AddComment("　　　実ダメージなども調査し、同様の扱いでよいことを確認したいと考えています。")
						.AddComment("　　　また、こちらは恐らく無視できないと考えていますが、スキル自体はDEF無視ではないが、")
						.AddComment("　　　装備効果でDEF無視した場合に、RESも無視できるか調査したいと考えています。")
						.AddComment("　　　特に、昔からある装備では、特殊なDEF無視効果になっているものもあるため、")
						.AddComment("　　　それらも同様の計算になるか気にしています。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】一部のスキルの計算が正常に行われない問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 26)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・インクイジター　各種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記のセット効果のＨＰ上昇効果が誤っていた問題を修正。")
						.AddComment("・「R001-ベスティア」カードと、エンチャント「知識の探求者」")
						.AddComment("・「グランパピリア」カードと、エンチャント「知識の探求者」")
						.AddComment("・「レッドペッパーラムダ」カードと、エンチャント「知識の探求者」")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・トルバドゥール　各種")
						.AddComment("・トルヴェール　各種")
						.AddComment("※「トルバドゥール」と「トルヴェール」は、スキルやHP/SPが完全に")
						.AddComment("　同じであると考えて登録してあります。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("今回の更新で、四次職について一通りのスキル登録が終わりましたので、")
						.AddComment("次回の更新（年内予定）で四次職用装備を追加する予定です。")
						.AddComment("（スクラップ系武器、リラプス系武器、ラヘル追加装備等）")
						.AddComment("また、スキルの未対応項目のうち、戦闘への影響が大きいと思われるものは、")
						.AddComment("順次、優先的に検証、対応していく予定です。")
						.AddComment("（各種支援スキルの効果、自己バフによる既存スキルの強化効果、エレメンタルマスターの精霊など）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職スキル計算　対応")
						.AddComment("仮の計算式による対応")
						.AddComment("・エレメンタルマスター　各種")
						.AddComment("　※先日ご連絡いただいた詠唱時間等の情報もすべて反映させました。")
						.AddComment("　　ありがとうございました。")
						.AddComment("・バイオロ　各種")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】一部の既存の多段ヒット系スキルのダメージ計算において、")
						.AddComment("ヒット回数が２回かけられていた問題を修正。")
						.AddComment("（スキルによっては、ダメージが相当高く表示されていました。申し訳ありません。")
						.AddComment("　今回の更新で、一通りチェックをかけ直しましたが、ダメージ計算処理自体が")
						.AddComment("　かなり複雑に計算されているため、まだ漏れがある可能性があります。")
						.AddComment("　恐れ入りますが、計算結果を鵜呑みにされないよう、ご注意願います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2022, 12, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("四次職装備　対応")
						.AddComment("・スクラップ／リラプス武器")
						.AddComment("・グレイウルフ防具")
						.AddComment("・フィデス武器")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ラヘル新エピソード　新規カード　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("四次職関連のマップ特化カードの効果を計算機に実装")
						.AddComment("・ヴェネディカード（廃棄実験体遊技場ルドゥス4階特化）")
						.AddComment("・ピエロゾイストカード（崩れたオペラハウス特化）")
						.AddComment("・熱湯フェンカード（大浴場メディタティオ特化）")
						.AddComment("・故障した警備型ベータカード（貯蔵庫タルタロス特化）")
						.AddComment("・強力な魔力カード（第2魔力発電所特化）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エレメンタルマスターの各スキルのダメージ計算を調査しました』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　詳細なデータをご連絡いただいたところ恐縮なのですが、")
						.AddComment("　　本日の更新には間に合いませんでした。")
						.AddComment("　　次回の更新まで、今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サーヴァントウェポンについてあれこれ試してみました』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　詳細なデータをご連絡いただいたところ恐縮なのですが、")
						.AddComment("　　本日の更新には間に合いませんでした。")
						.AddComment("　　次回の更新まで、今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 1, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("あけましておめでとうございます。")
						.AddComment("旧年より、四次職対応をお待たせしており申し訳ありません。")
						.AddComment("検証、確認等が終わったものから順次対応していく予定ですので、")
						.AddComment("今しばらくお待ちいただければと思います。")
						.AddComment("また、四次職の実装に間に合わなかった計算機のプログラムの大改造ですが、")
						.AddComment("こちらも実装に向けて対応を進めてまいります。")
						.AddComment("（装備効果の種類ＩＤ数が限界に達しているなどの理由で、避けて通れない対応です）")
						.AddComment("最後に、計算機にいただいている要望が、様々な理由により先延ばしとなっており、")
						.AddComment("こちらも何とか、実現に向けて進めていきたいと考えております。")
						.AddComment("なにぶん、本業とは別の趣味運営ですので、時間のとれない時期などもありますが、")
						.AddComment("気長にお待ちいただき、役立つ範囲でご利用いただければと思います。")
						.AddComment("本年もどうぞ、よろしくお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("先日ご連絡いただいた「エレメンタルマスター」の各種攻撃スキルデータを反映")
						.AddComment("※状態異常は未対応です。今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_SKILL)
						.AddComment("先日ご連絡いただいた「ドラゴンナイト」の各種攻撃スキルデータを反映")
						.AddComment("※「サーヴァントウェポン：デモリッシュ」については、ディレイとクールタイムの")
						.AddComment("　記載がなかったため、現状はまだ『詠唱時間等不明』扱いとしています。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部の四次職スキルの最大レベルが誤っていた問題を修正。")
						.AddComment("※本来のレベルを超えて設定されたＵＲＬ出力結果等は、ＵＲＬ入力時に最大レベルに補正されます。")
						.AddComment("　ただし、計算機の更新を適用するためにページのリロードなどを行った際に、")
						.AddComment("　ブラウザの『入力していた値が保持されていて再設定される機能』が働いた場合、")
						.AddComment("　選択欄が空白（何も選択されていない状態）になることがあります。")
						.AddComment("　その場合は、お手数ですが、手動でレベルの再設定をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ホークラッシュのダメージを実測しました』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　内容を拝見し、公式の説明文や計算機のプログラムなどを確認したのですが、")
						.AddComment("　　『実際は１撃につき２回Hitする』という挙動の要因が確認できませんでした。")
						.AddComment("　　（実測がおかしいという意味ではなく、どこにも説明がないという意味です）")
						.AddComment("　　１Hit分のダメージはおおよそ合っているとのことですので、")
						.AddComment("　　『見かけ上、複数回Hitに見えるタイプ』でもないと思われるため、")
						.AddComment("　　計算機で対応するには、何が理由で２回Hitしているのか検証する必要があります。")
						.AddComment("　　スキル説明文や、従来のスキルの仕様などを元に考えると、")
						.AddComment("　　「自然親和の習得レベル」や「ジョブレベル」などが影響している可能性が考えられますが、")
						.AddComment("　　何も説明されてないだけで、確定２Hitの可能性も十分あります。")
						.AddComment("　　以上の理由から、現時点では修正せず、追加検証待ちとさせていただきたいと思います。")
						.AddComment("　　（ウィンドホークは用意できていますので、管理人の時間ができれば検証できると思います）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 1, 3)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("一部のスキルにおいて、最大レベルのデータが間違った値になってしまっていた問題を修正。")
						.AddComment("※当問題により、習得スキル設定、パッシブ持続系欄、攻撃手段などのスキルレベルが、")
						.AddComment("　誤って低く補正されてしまうケースが発生していました。")
						.AddComment("　本日の更新以降、そのような現象は起きないはずですが、")
						.AddComment("　問題発生中にセーブしたデータは、低く補正された状態でセーブされているため、")
						.AddComment("　本来のレベルに設定しなおして、再度、セーブやＵＲＬ出力を行う必要があります。")
						.AddComment("　大変お手数ですが、2023/01/02以降にセーブやＵＲＬ出力されたデータについては、")
						.AddComment("　設定値を確認いただき、問題があれば手動で修正していただくよう、お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『上位精霊のディフェンシブモードとパッシブモードについて調査しました』")
						.AddComment("　→スキルの実測データのご連絡ありがとうございます。")
						.AddComment("　　精霊の補助効果については、管理人の理解が怪しい点もあるため、")
						.AddComment("　　ご連絡いただいた内容をしっかりと確認したのち、対応させていただきます。")
						.AddComment("　　更新まで、今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 1, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("一部、ご連絡いただいたデータの反映ができておりません。")
						.AddComment("申し訳ありませんが、今しばらくお待ちくださいますようお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】四次職支援設定欄を追加")
						.AddComment("※他キャラに使用できる支援スキルを設定する欄です。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("オルタネイトクリップ　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 1, 18)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("更新が滞っており申し訳ありません。")
						.AddComment("現在、本業が予定外に忙しくなってしまっており、手が回っていない状態です。")
						.AddComment("恐れ入りますが、今しばらくお待ちいただけますようお願い申し上げます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("三次職スキルのうち、ダメージ計算などに『ジョブレベルによる補正』がある場合、")
						.AddComment("実際のダメージよりも低く計算されるケースが発覚しました。")
						.AddComment("恐らく、ホワイトスミスの「武器精錬」のように、より上位に転職している場合、")
						.AddComment("元の職業のジョブレベル最大値固定で計算される仕様が存在するようです。")
						.AddComment("（上位職でジョブカンスト状態などの追加条件があるかは未確認です）")
						.AddComment("ひとまず、発覚したギロチンクロスの「カウンタースラッシュ」については、")
						.AddComment("ゲーム内で実測して修正しましたが、他にも対象スキルがあるかもしれません。")
						.AddComment("特に、下記のスキルについては、ダメージ計算でジョブレベルを参照しているため、")
						.AddComment("計算結果にご注意ください。")
						.AddComment("（現在は、念のため、修正しないままにしてあります）")
						.AddComment("　・ロイヤルガード「イクシードブレイク」")
						.AddComment("　・ギロチンクロス「カウンタースラッシュ」※計算式修正済み。")
						.AddComment("　・シャドウチェイサー「フェイントボム」")
						.AddComment("　・ジェネティック「ヘルズプラント」")
						.AddComment("　・ソーサラーの精霊を召喚した状態での各種魔法攻撃")
						.AddComment("　・ウォーロックの各種サモンボール系（実際には「リリース」のダメージ）")

				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("ご連絡いただいた情報や管理人がゲーム内で実測したデータ等から、")
						.AddComment("四次職スキルにある「Pow」などの特性ステータスによるダメージ倍率増加にも、")
						.AddComment("特殊バフ等による倍率がかかるような計算式が得られています。")
						.AddComment("例えば、「サベージインパクト」は「シャドウエクシード状態」の場合に")
						.AddComment("ダメージ倍率が２倍になりますが、この２倍効果が、基本の倍率だけでなく、")
						.AddComment("「Pow」による増加分（5%×Pow）にもかかる、という感じです。")
						.AddComment("（○○種族なら２倍なども同様です）")
						.AddComment("既に複数の職業で、魔法攻撃、物理攻撃問わず同様の計算式が得られているため、")
						.AddComment("全体的に、そのような効果を持つスキルのダメージ計算では、")
						.AddComment("「Pow」等の特性ステータスも効果が増加する計算に変更しました。")
						.AddComment("計算機の更新前よりもダメージが増加することになりますが、")
						.AddComment("もし、実際のゲーム内で大きく差がある場合は、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年２月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】ギロチンクロスのスキル「カウンタースラッシュ」において、")
						.AddComment("四次職シャドウクロスが使用した場合のジョブレベルによるダメージ補正計算で、")
						.AddComment("計算に使うジョブレベルが 70 固定になっていなかった問題を修正。")
						.AddComment("※ホワイトスミスの「武器精錬」のように、より上位に転職している場合、")
						.AddComment("　元の職業のジョブレベル最大値固定で計算される仕様のようです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 1, 29)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("以前、ホークラッシュの実測ダメージをご連絡いただいた件についてですが、")
						.AddComment("ちょっと装備を特定しきれず、今回更新した計算式で一致するか、")
						.AddComment("確認できませんでした。")
						.AddComment("もし、実際のダメージと差がある場合は、URL出力の結果を添えて、")
						.AddComment("ご連絡いただけますよう、お願いいたします。")
						.AddComment("なお、2Hitする件については、管理人が手元で実測した限りでは、")
						.AddComment("見かけ上の2Hit（1Hit分のダメージを2回に分割表示してるだけ）のようです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("安定版に設置されていた「セーブ削除」機能ですが、選択したものとは異なる")
						.AddComment("セーブデータが削除されてしまうバグをご連絡いただいております。")
						.AddComment("状況を確認し、対応を検討した結果、セーブデータの管理について、")
						.AddComment("根本的に見直しを行うべきという判断になりました。")
						.AddComment("本日の更新には間に合いませんでしたので、申し訳ありませんが、")
						.AddComment("一時的に、セーブ削除機能自体を利用できない状態としております。")
						.AddComment("あらかじめ、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2023/01/24に適用された攻城戦関連の修正は対応できていません。")
						.AddComment("今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】パッシブ持続系設定欄で「三段掌」のレベルをあげていると、")
						.AddComment("スキルでのクリティカル率が「三段掌」の発動率分低く計算される問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("安定版の計算機において、セーブデータをロードした際に、")
						.AddComment("途中で計算機の動作が停止していた問題を修正。")
						.AddComment("※セーブした名前がロードされない件も、こちらが原因となります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『装備でカットされている詠唱/ディレイの％表記が欲しい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　まず、結論から申し上げると、現在の計算機では仕組み上難しいです。")
						.AddComment("　　現在のプログラムでは、『何による効果なのか』というのを区別せず、")
						.AddComment("　　すべて一緒くたに計算しています。")
						.AddComment("　　ですので、現在の拡張表示欄より詳しい情報を出すのは、")
						.AddComment("　　現時点では難しいです。")
						.AddComment("　　計算機の大幅改造が終わった後であれば、検討はできると思いますが、")
						.AddComment("　　四次職への対応などで、そちらの作業は完全に停止しているので、")
						.AddComment("　　現時点では、対応の見通しもお伝え出来ません。")
						.AddComment("　　あしからず、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ジョブレベルが参照されるスキルについて、一部調査しました』")
						.AddComment("　→実測データのご連絡ありがとうございます。")
						.AddComment("　　内容を拝見したところ、該当スキルでは現在のジョブレベルが")
						.AddComment("　　参照されているとのことでしたので、修正不要と判断しました。")
						.AddComment("　　わざわざ検証いただき、ありがとうございました。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 2, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年１月３１日　エンチャント追加　対応")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 2, 7)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年２月７日　装備能力調整　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年　バレンタインイベント新カード　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「覚醒支配者のローブ＋異境の統括者」の効果が")
						.AddComment("登録されていなかった問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 2, 16)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職対応や新装備、攻城戦の仕様変更など、計算機の対応をお待たせしており")
						.AddComment("申し訳ありません。")
						.AddComment("現在、本業がかなり忙しく、ROにログインする余裕すらない状態が続いており、")
						.AddComment("計算機の更新も事実上不可能な状況にあります。")
						.AddComment("ご面倒をおかけしますが、性能カスタマイズ機能などもご利用いただき、")
						.AddComment("更新までの間、手動で補正してお使いいただければ幸いです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 2, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職対応や新装備、攻城戦の仕様変更など、計算機の対応をお待たせしており")
						.AddComment("申し訳ありません。")
						.AddComment("現在、本業がかなり忙しく、ROにログインする余裕すらない状態が続いており、")
						.AddComment("計算機の更新も難しい状況にあります。")
						.AddComment("ご面倒をおかけしますが、性能カスタマイズ機能などもご利用いただき、")
						.AddComment("更新までの間、手動で補正してお使いいただければ幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("２０２３年１月２４日　シーズ補正（攻城戦等）関連調整　対応")
						.AddComment("※スキル「ローリングカッター」などについて、特定マップでのダメージ制限が")
						.AddComment("　撤廃されたとのことですが、後述のスキルは調整前まで、特定マップでのみ")
						.AddComment("　ダメージが『増加する』という仕様でした。")
						.AddComment("　今回の調整で、この『増加する』効果もなくなったのかが未確認です。")
						.AddComment("　計算機では、『増加する』効果も削除しましたので、もしゲーム内で")
						.AddComment("　計算機より高いダメージが出るようであれば、お知らせください。")
						.AddComment("　＜対象スキル＞")
						.AddComment("　　・ローリングカッター")
						.AddComment("　　・クロスリッパーラッシャー")
						.AddComment("　　・ブーストナックル")
						.AddComment("　　・パイルバンカー")
						.AddComment("　　・バルカンアーム")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年３月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("グレイウルフエンチャント拡張　対応")
						.AddComment("※本件への対応に伴い、グレイウルフ装備のエンチャントを、")
						.AddComment("　すべて『ウルフオーブ(＊＊)』に置き換えました。")
						.AddComment("　基本的には、セーブデータを読み込んだ際に自動で変換されるはずですが、")
						.AddComment("　念のため、正しく設定されているかご確認をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("深淵の騎士の卵　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カードセット「封印された混沌のバフォメットカード＋厄災の魔将」の効果が")
						.AddComment("誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『中国語の関連計算機を入手する方法があるかどうかわかりません』")
						.AddComment("　→申し訳ありませんが、私にも分かりません。")
						.AddComment("　　少なくとも、当計算機は日本語以外には対応しておりません。")
						.AddComment("　　他を探していただくか、翻訳機能のご利用をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『想定外の錐効果演算というエラーが表示されたので連絡しました』")
						.AddComment("　→ご連絡いただきありがとうございます。")
						.AddComment("　　まだ詳細を調査しきれていませんが、かなり昔からある計算機のバグで、")
						.AddComment("　　発生する条件が特定できていないため、データ提供が大変助かります。")
						.AddComment("　　なお、ご連絡いただいたURL出力の状態での計算結果は、ゲーム内での")
						.AddComment("　　実際のダメージと異なる可能性がありますので、その点ご注意ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 3, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("新装備など、計算機の対応をお待たせしており申し訳ありません。")
						.AddComment("現在、本業がかなり忙しく、３月中の更新は無理と思われます。")
						.AddComment("恐れ入りますが、ご容赦ください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 4, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年ひな祭りイベント　追加装備　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("メモリアルクロース　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年４月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「ファントムオブマスカレード　封印された魔剣士タナトスの")
						.AddComment("思念体セット」の、精錬によるＡＴＫ上昇効果を修正。")
						.AddComment("　４×精錬値の２乗　→　２×精錬値の２乗　（効果半減）")
						.AddComment("※ゲーム内実測のご連絡をいただきました。ありがとうございました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("エンチャント「U-PowerShield」に、存在しないセット効果が登録されていた")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("矢の装備設定で「属性自動(Atk30)」を選択したうえで、")
						.AddComment("スキル「メタリックフューリー」または「サウンドブレンド」を選択すると、")
						.AddComment("計算機が正常に動作しない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『想定外の錐効果演算というエラーが表示されたので連絡しました』")
						.AddComment("　→ご連絡いただきありがとうございます。")
						.AddComment("　　複数の方から異なるデータをご連絡いただき、後はこれらをもとに")
						.AddComment("　　調査するだけとなっております。")
						.AddComment("　　もう少しお時間をいただくかもしれませんが、ご容赦ください。")
						.AddComment("　　なお、ご連絡いただいたURL出力の状態での計算結果は、ゲーム内での")
						.AddComment("　　実際のダメージと異なる可能性がありますので、その点ご注意ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『クレッシブボルト状態のダメージがゲーム内と合わない』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　以前実測したはずなのですが、現在の実測値と合わないということで、")
						.AddComment("　　一度、未確認状態（×マーク付与）に戻します。")
						.AddComment("　　再度、条件を変えつつ実測して確定次第、反映させたいと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『四次職スキルのダメージがゲーム内のダメージとかなり異なる』")
						.AddComment("　→ご連絡いただきありがとうございます。")
						.AddComment("　　メールでもご指摘いただいているように、恐らく修練の補正等の計算式が")
						.AddComment("　　異なっているのが原因と思われます。")
						.AddComment("　　ダメージや詠唱等については、順次、実測していく予定ですので、")
						.AddComment("　　恐れ入りますが、今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『計算機レイアウトの要望です』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　意見を募っている身で恐縮ですが、先に結論から申し上げると、")
						.AddComment("　　『今すぐご提案を採用することは難しい』という回答になります。")
						.AddComment("　　いくつか対策案を考えていますので、その検討に組み込むというかたちで、")
						.AddComment("　　将来的に考慮する、という対応となります。")
						.AddComment("　　悪しからず、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『証明書が無効であるというウイルス対策ソフトの警告が出ました』")
						.AddComment("　→ご連絡いただきありがとうございます。")
						.AddComment("　　恐らくですが、当計算機にアクセスする際に、")
						.AddComment("　　　『https://roratorio-hinanjo.net/roro/』")
						.AddComment("　　のように、「https」を指定されていませんでしょうか？")
						.AddComment("　　当計算機は、「https」には対応していませんので、アクセスする際は、")
						.AddComment("　　　『http://roratorio-hinanjo.net/roro/』")
						.AddComment("　　のように、「http」を指定してご利用いただく必要があります。")
						.AddComment("　　今一度、アクセスしたURLをご確認いただくよう、お願いいたします。")
						.AddComment("　　（お使いのブラウザの設定などにより、「http」が指定された場合には、")
						.AddComment("　　　強制的に「https」に書き換えられてしまう場合があります。")
						.AddComment("　　　当計算機をご利用の場合は、お手数ですが、そのような機能をOFFにするか、")
						.AddComment("　　　例外サイト設定などで、機能の対象外となるようにしてご利用ください）")
						.AddComment("")
						.AddComment("　　なお、ご連絡いただいたエラーの内容は、適切なエラーです。")
						.AddComment("　　当計算機のドメイン「roratorio-hinanjo.net」は「https」非対応ですので、")
						.AddComment("　　「https」に必要な証明書がサーバに格納されていません。")
						.AddComment("　　ただ、レンタルサーバのドメイン用の証明書はデフォルトで用意されているため、")
						.AddComment("　　「https」でアクセスすると、そちらの証明書が読み込まれる場合があります。")
						.AddComment("　　その結果、")
						.AddComment("　　　『「roratorio-hinanjo.net」へアクセスしたのに、違うドメインの証明書だ』")
						.AddComment("　　という状況が発生し、ウイルス対策ソフトによって、")
						.AddComment("　　　『不審なサイトへのアクセスである』")
						.AddComment("　　と判定されたものと思われます。")
						.AddComment("")
						.AddComment("　　また、ウイルス対策ソフトによっては、ご連絡いただいた現象が発生した際に、")
						.AddComment("　　「roratorio-hinanjo.net」がウイルス対策ソフトのブロックリストへ登録され、")
						.AddComment("　　「http」にしても、アクセスできないようになっている可能性があります。")
						.AddComment("　　その場合は、お手数ですが、ご利用のウイルス対策ソフトの説明書などをもとに、")
						.AddComment("　　ブロックリストから削除するなどの対応をお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『クローキングのモーションによる連射性能への影響を注意書きを加えてはどうか』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　先に結論から申し上げると、『現時点では、加えない』という判断になります。")
						.AddComment("　　その理由ですが、まず「モーションディレイ」自体が、かなり特殊な性質を")
						.AddComment("　　持っているという点があります。")
						.AddComment("　　例えば、次のような点です。")
						.AddComment("　　・エンチャント「死の欲動」など、特定のモンスターの姿に変身する効果が")
						.AddComment("　　　発動すると、明らかにモーションディレイの時間が変化する。")
						.AddComment("　　・スキル使用直後に敵から攻撃を受けるなどした場合、スキル発動のモーションが")
						.AddComment("　　　キャンセルされて被弾モーションになり、モーションディレイの時間が変化する。")
						.AddComment("　　また、ウォーロックスキル「テトラボルテックス」など、発動のたびに、")
						.AddComment("　　他スキルによる準備が必須のスキルでも、現状、特に注意書きがありません。")
						.AddComment("　　このようなことを考えていくと、『それを書くならあれもこれも』ということに")
						.AddComment("　　なってしまい、誰も読まない、分厚い取扱説明書のようになってしまいます。")
						.AddComment("　　管理人としては、『注意書きは、極力削除したい』という考えで作っていますので、")
						.AddComment("　　ご連絡の件については、他の情報源（ゲーム内コミュニティ、SNS等）で")
						.AddComment("　　共有していただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 4, 11)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("Lv240解放　対応")
						.AddComment("（HP/SPは、ひとまず情報募集中にしてあります）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("スキル「エウカリスティカ」　仕様調整　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("Lv240解放関連アップデート　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("Lv240解放関連アップデート　対応")
						.AddComment("（既存モンスターの調整含む）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("装備セット「虹色のねこじゃらし＋レインボウ」を装備した際、")
						.AddComment("本来は「レインボウ」の精錬値によって計算すべき追加効果が、")
						.AddComment("「虹色のねこじゃらし」の精錬値で計算されていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「Y.S.F.リング」の装備レベル制限が誤っていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 4, 21)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_JOB)
						.AddComment("Lv221以降のHP/SPについて、予測による値を登録。")
						.AddComment("※いくつかいただいた実測データから、Lv221以降もそれまでと同じ")
						.AddComment("　増加量になると推測されました。")
						.AddComment("　そのため、Lv220までが不明のウインドホークを除く職業において、")
						.AddComment("　Lv220までの増加量を元に、Lv240までの数値を登録しました。")
						.AddComment("　もしゲーム内の実測値が異なるようでしたら、お知らせください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年５月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("Lv240解放アップデートで実装された装備に、エンチャント、及び、")
						.AddComment("ランダムオプションが設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サンドバックマンに攻撃したダメージが僅かに異なる』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　ご指摘の件については、いくつか考えられる理由があり、")
						.AddComment("　　複数の要因が重なって、誤差となって表れている可能性が高いです。")
						.AddComment("　　考えられる理由としては、次のようなものがあります。")
						.AddComment("　　・ゲーム内のサンドバックマンの減算DEF、減算MDEFが 0 でなく 1 になっている")
						.AddComment("　　・実際のゲームと計算機で、端数の切り捨てや切り上げの処理が異なる")
						.AddComment("　　しらみつぶしにデータを収集すれば、限りなくゲームの計算を再現できると思いますが、")
						.AddComment("　　誤差の大きさと他の対応すべき項目の優先度などを総合的に考えると、")
						.AddComment("　　ご指摘の誤差の修正は後回しという判断になります。")
						.AddComment("　　一確狩りなどでは致命的であることは理解していますが、")
						.AddComment("　　ご理解、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ナパームビートのダメージがどんな相手にも 0 になる』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　計算結果の表示方式を変える際の修正が不十分だったため、")
						.AddComment("　　適切に計算できていませんでした。")
						.AddComment("　　ご指摘の「ナパームビート」については、暫定的に対処を行いました。")
						.AddComment("　　ただ、類似の箇所が結構あり、それらについては修正が間に合っていません。")
						.AddComment("　　（管理人のメモ書きとして、対応が必要なことは書き残してあったのですが、")
						.AddComment("　　　どんな対応が必要だったのかを忘れてしまっており、すぐに対応できませんでした）")
						.AddComment("　　内容を確認のうえ、対応したいと思いますので、今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『テトラボルテックスのダメージ表示は、以前のほうが分かりやすかった』")
						.AddComment("　→使用感のご連絡ありがとうございます。")
						.AddComment("　　まず、現在の表示がわかりにくい点については、管理人もそのように感じます。")
						.AddComment("　　ただ、これが厄介な点なのですが、テトラボルテックスなど一部のスキルは、")
						.AddComment("　　ダメージ計算から画面表示までが、プログラム上、ごっそり別処理になっています。")
						.AddComment("　　そのため、計算結果の表示方式を変更した際に、別処理部分まで修正できていなかった")
						.AddComment("　　という事情があった……のだと思います。")
						.AddComment("　　（管理人も多忙な時期を挟んでしまったせいで記憶が曖昧になっています。すみません）")
						.AddComment("　　なお、併せてご質問いただいた、『次世代版で詳細ダメージを表示する予定』については、")
						.AddComment("　　『予定としては、ある』という回答になります。")
						.AddComment("　　現状、やることが目を塞ぎたくなるほど溜まっているので、いつになるかは明言できませんが、")
						.AddComment("　　管理人としては、『すべてのスキルで、詳細表示／簡易表示を好みで切り替えられる』という")
						.AddComment("　　状態を目標として、改良していきたいと考えております。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『○○属性物理攻撃力+10%系カードは、マグナムブレイク効果と同様の処理と思われます』")
						.AddComment("　→実測情報のご連絡ありがとうございます。")
						.AddComment("　　ご連絡いただいた扱いということになると、いくつか追加での実測調査が必要ですので、")
						.AddComment("　　それらを確認の上、計算プログラムの修正を行いたいと思います。")
						.AddComment("　　（今の露店価格なら、管理人でもカードの現物を買って試せると思います）")
						.AddComment("　　おそらく、ゴールデンウィークにはまとまった時間が取れると思いますので、")
						.AddComment("　　調査と修正が完了するまで、今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 4, 25)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("四次職１３種のHPとSPは、ほぼ確定いたしました。")
						.AddComment("たくさんの情報提供のご連絡ありがとうございました。")
						.AddComment("※Lv221以降は、Lv220までと同じと増加量と推定して登録してあります。")
						.AddComment("　もし、実際のゲーム内で異なる場合は、ご連絡ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("スキル「サベージインパクト」など、クリティカルが発生するスキルにおいて、")
						.AddComment("発生率が等倍でない（『自身の1/2のクリティカル率で』など）場合に、")
						.AddComment("計算結果のクリティカル率や秒間ダメージ等の表示が誤っていた問題を修正。")
						.AddComment("※キャラクターのクリティカル率の表示は、修正なしです。")
						.AddComment("　敵のクリティカル率減算などを加味した、実際のクリティカル率は、")
						.AddComment("　戦闘結果の「基本情報」欄に表示されています。")
						.AddComment("　こちらに表示されるクリティカル率は、修正してあります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『Amazon欲しい物リストや寄付ができるようなものがあるといいなと思いました』")
						.AddComment("　→ご支援のご提案ありがとうございます。")
						.AddComment("　　大変ありがたいご提案ではありますが、当計算機は公平性や独立性等を保つために、")
						.AddComment("　　無料、かつ、無広告で運営する方針としております。")
						.AddComment("　　従いまして、お気持ちだけ頂戴することとしております。ありがとうございます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 5, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("HTTPS の利用に対応しました。")
						.AddComment("過去に出力した URL は引き続きご利用いただけますが、セキュリティの都合上、")
						.AddComment("強制的に HTTPS に切り替えられます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("様々なご要望、改善等をお待たせしており申し訳ありません。")
						.AddComment("頂戴しているご意見やプログラムの構造、対応に必要な規模などを考慮し、")
						.AddComment("　『シャドウ装備への対応、および、次世代版でのセーブ対応』")
						.AddComment("に、優先的に着手することにしました。")
						.AddComment("なお、いずれの対応も、次世代版のみとなります。")
						.AddComment("また、次世代版のセーブデータは、構造を根本的に変更しますので、")
						.AddComment("『次世代版のデータを、安定版で読み込むことはできない』予定です。")
						.AddComment("アイテムデータなどは両方に反映させますので、三次職までの計算は、")
						.AddComment("引き続き、安定版のほうをご利用いただくことをお勧めいたします。")
						.AddComment("（『安定版のデータを次世代版で読み込むこと』は可能にします）")
						.AddComment("")
						.AddComment("また、これに伴い、下記の点などを、従来の仕様から変更する予定です。")
						.AddComment("・セーブデータの数を、100個に固定します。")
						.AddComment("　※従来は、デフォルトが19個、最大が500個でしたが、これを固定にします。")
						.AddComment("・セーブデータに名前を付けられる機能を、常に有効にします。")
						.AddComment("・セーブデータの名前に、多少の制限を加えます。")
						.AddComment("　※データを安全に利用できるよう、セキュリティ面から見直しを行います。")
						.AddComment("・セーブデータの保存先を、ローカルストレージ（※）に固定します。")
						.AddComment("　※各ブラウザに用意されている、データ保存用の領域です。")
						.AddComment("　　従来のデフォルトは Cookie への保存でしたが、これを廃止します。")
						.AddComment("　※最大容量は 5MB 程度に制限されるため、お使いのパソコンなどの")
						.AddComment("　　ハードディスクの空き容量が大きく減るようなことは、起こりません。")
						.AddComment("・計算機の画面レイアウトや3桁区切り表示など、使い勝手のための設定を、")
						.AddComment("　あらたに保存できるようにします。")
						.AddComment("")
						.AddComment("かなり、大掛かりな改造になりますので、次回の更新が遅れる可能性があります。")
						.AddComment("（通例ですとラグ缶更新のタイミングですが、間に合わない可能性があります）")
						.AddComment("ご理解、ご容赦いただきますよう、お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「マジックアブソーバー」の過剰精錬による効果が誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サモナーのスキル大地の力のスキル効果であるInt+7が計算されない』")
						.AddComment("　→恐れ入りますが、こちらでは問題を確認できませんでした。")
						.AddComment("　　下記のような設定ミスがないかを今一度ご確認いただき、")
						.AddComment("　　それでも問題が解決しない場合は、URL出力の結果も添えて、")
						.AddComment("　　ご連絡いただけると、調査できるかと思います。")
						.AddComment("　　＜確認いただきたい点＞")
						.AddComment("　　・「大地の魂」の設定欄と誤って設定していないか。")
						.AddComment("　　・「習得スキル（装備効果用）」欄と誤って設定していないか。")
						.AddComment("　　　（「パッシブ持続系」欄への設定が必要です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『攻撃手段にインクイジターのコンボ攻撃もほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　お恥ずかしながら、管理人がまだ全ての職業のスキルを理解できておらず、")
						.AddComment("　　インクイジターのコンボの正しい構造を把握できていません。")
						.AddComment("　　スキルの詠唱時間などを計測する際に、併せて詳細を確認した後、")
						.AddComment("　　コンボのパターンに合わせた項目を作りたいと思います。")
						.AddComment("　　検証まで今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『［シャドウ］オルタネイト装備の入力欄がほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　上限解放により、特性ステータスもカンストするようになってしまったため、")
						.AddComment("　　シャドウ装備や性能カスタマイズなどの改良は急務だと考えております。")
						.AddComment("　　ただ、シャドウ装備の対応には、装備欄だけでなくセーブデータなどの")
						.AddComment("　　改造も必須となるため、かなり規模の大きな修正になります。")
						.AddComment("　　そのため、これまで対応を先送りにしておりましたが、前述のとおり、")
						.AddComment("　　ほかの要望に対応するためにも、セーブデータを含めた改造に着手することにしました。")
						.AddComment("　　精錬祭イベントが終了するころには、対応できるのではないかと思いますので、")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 5, 10)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「アビスマンカード」のベースレベルによるダメージ上昇効果が、")
						.AddComment("ローグ系のクローンスキルでの使用に適用されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『エレメンタルマスターの231～240までのHP/SPを調査しました』")
						.AddComment("　→実測データをご連絡いただきありがとうございます。")
						.AddComment("　　計算機と一致しているとのことで安心しました。")
						.AddComment("　　ありがとうございました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『オートスペルのチェーンライトニングがどの相手でも0ダメージ』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　以前、ピンポイントで修正したテトラボルテックスと同様、")
						.AddComment("　　個別処理のどこかが修正もれしているのだと思います。")
						.AddComment("　　すぐに対応したいところですが、安定板と次世代版とで別のファイルに")
						.AddComment("　　なっている箇所であり、次世代版がセーブデータ改造中のため、")
						.AddComment("　　すぐに修正することができません。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アビスマンカードのスキルダメージ増加効果が適用されない』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　おそらく、ローグ系のクローンスキルによるものだと思いますが、")
						.AddComment("　　それで間違いなければ、本日の更新で修正いたしました。")
						.AddComment("　　そうでなく、ウィザードやセージ系列のスキルで発生している場合は、")
						.AddComment("　　お手数ですが、URL出力の内容を添えて、再度、ご連絡ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『シャドウチェイサーの攻撃手段にデュプレライトがない』")
						.AddComment("　→使い方の説明がなく申し訳ありません。")
						.AddComment("　　デュプレライトについては、「パッシブ持続系」欄に設定欄を設けてあります。")
						.AddComment("　　そちらの設定欄をデュプレライトのレベルに設定したうえで、攻撃手段として")
						.AddComment("　　「通常攻撃」を選んで計算すると、オートスペルとしてダメージが表示されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『現状次世代版のほうでセーブはできないのでしょうか？』")
						.AddComment("　→はい、まだできません。")
						.AddComment("　　現在作業を進めていますが、まだいつ更新可能かは申し上げられない段階です。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
						.AddComment("　　なお、「URL出力」機能はご利用いただけますので、そちらで出力したURLを、")
						.AddComment("　　お使いのパソコンに保存する（メモ帳や表計算ソフトなど）ことは可能です。")
						.AddComment("　　保存したURLは、「URL入力」機能に入力することで計算状態を復元できます。")
						.AddComment("　　端的にまとめると、現状は『手動でのセーブは可能』という状態となります。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 5, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("次世代版でのセーブ／ロードに対応しました。")
						.AddComment("※計算機上部、赤文字の注意喚起の横に操作欄があります。")
						.AddComment("※安定版からデータを移す場合は、安定版でURL出力を行った後、")
						.AddComment("　次世代版でURL入力を行うことで、データをコピーできます。")
						.AddComment("※次世代版でURL出力していたデータは、そのままURL入力できます。")
						.AddComment("※対応中にいくつかのバグが見つかった関係で、以下のデータはコピーされません。")
						.AddComment("　お手数ですが、設定していた場合は、手動で再設定をお願いいたします。")
						.AddComment("　・性能カスタマイズ　全般")
						.AddComment("　　「以下の入力欄を全て無効にする」　（OFFになります）")
						.AddComment("　・性能カスタマイズ（ステータス関連）")
						.AddComment("　　「MaxHP+」、「MaxSP+」　（0になります）")
						.AddComment("　・モンスター手入力設定")
						.AddComment("　　「BaseExp」、「JobExp」　（0になります）")
						.AddComment("※次世代版のセーブデータと安定版のセーブデータは別々の管理です。")
						.AddComment("　次世代版でセーブしても、安定版のセーブは引き続き使用できます。")
						.AddComment("※次世代版のセーブデータを、安定版にコピーすることはできません。")
						.AddComment("※シャドウ装備への対応などは、次回以降となります。")
						.AddComment("　今回の対応では、単にセーブ／ロードが可能になっただけです。")
						.AddComment("　（シャドウ装備などに対応できるセーブに変換するだけで手一杯でした）")
						.AddComment("※かなり大がかりな変更になったので、バグが起きる可能性があります。")
						.AddComment("　一通りテストしていますが、何かお気づきの際はご連絡いただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("「攻撃方法」欄の横に「動作設定」欄を設けました。")
						.AddComment("従来はもっと下のほうに、バラバラで設置されていた設定欄をまとめました。")
						.AddComment("動作設定は、セーブ／ロード操作の必要はなく、変更の都度、保存されます。")
						.AddComment("また、キャラクターのデータとは独立しています。")
						.AddComment("ですので、例えば、あるキャラクターで「3桁区切り」をONにすると、")
						.AddComment("別のキャラクターのデータを読み込んでも、「3桁区切り」はONのままです。")
						.AddComment("※もし、そのような動作になっていない場合は、ご連絡いただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("「確殺/経験値効率ランキング計算」機能を非表示にしました。")
						.AddComment("恐らく、現在使われていないだろうと考えての対応です。")
						.AddComment("もしご利用いただいていた方がいらっしゃいましたら、ご連絡ください。")
						.AddComment("（管理の都合上、不要な機能はどんどん削除していきたいと考えています）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("「ブラウザ移行」機能は調整中です。")
						.AddComment("※次世代版のセーブ機能が正常に動作しそうなことを確認後、対応したいと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("以前、HTTPSへの対応を行いましたが、これに関係して、")
						.AddComment("『それ以前から、セーブデータを50個以上使用されていた方』は、")
						.AddComment("それまでのセーブデータが使用できなくなっている可能性が判明しました。")
						.AddComment("もし、2023/05/02に更新した、HTTPSへの対応前後でセーブデータが")
						.AddComment("使用できなくなった方がいらっしゃいましたら、ご連絡いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("６月くじの対応は次回（水曜日頃？）の予定です。")
						.AddComment("もう少々、お待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「インペリアルガード」のLv221以降のHPがずれていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スターターパックの職装備の説明文が三次職のままになっている』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　申し訳ありませんが、ご連絡いただいたアイテムに限らず、")
						.AddComment("　　アイテムの説明文については、基本的に修正できていません。")
						.AddComment("　　（修正が難しいわけではなく、端に手が回っていません）")
						.AddComment("　　『三次職で効果があれば、四次職でも効果がある』")
						.AddComment("　　という前提で後回しにしていますが、もし例外があれば、")
						.AddComment("　　バグとして早急に対処いたします。")
						.AddComment("　　そうでなければ、ご報告いただいたところ申し訳ありませんが、")
						.AddComment("　　対応は相当後回しになるかと思います。")
						.AddComment("　　優先順位の都合上、ご理解、ご容赦いただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ドラゴンナイトのスキルについて報告します』")
						.AddComment("　→調査結果のご連絡ありがとうございます。")
						.AddComment("　　本日の修正には間に合いませんでしたが、早い段階で、")
						.AddComment("　　計算機に組み込みたいと思います。")
						.AddComment("　　もう少々、お待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 5, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("【次世代版のみ】")
						.AddComment("現在、矢（弾丸）と衣装のセーブ／ロードが機能していません。")
						.AddComment("手早く修正できそうにないので、しばらくの間ロードのたびに手動で設定を")
						.AddComment("お願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("矢（弾丸）を装備したデータをセーブ／ロードしようとすると、")
						.AddComment("計算機が停止してしまう問題に、応急処置な対応を実施。")
						.AddComment("※計算機は停止しませんが、矢（弾丸）のセーブ／ロードができません。")
						.AddComment("　対応検討中ですので、今しばらくご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ウィンドホークのセーブが正常にロードされなくなった』")
						.AddComment("　→ご不便をおかけして申し訳ありません。")
						.AddComment("　　おそらく、前述の矢がロードされないことが原因と思われます。")
						.AddComment("　　今回の応急処置で、最低限、計算機は動作するようになったと思いますが、")
						.AddComment("　　正常に動作しない場合は、矢を手動で設定して再度セーブをお試しください。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 5, 30)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年６月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『セーブデータが20個までのときに利用していたものに変わった』")
						.AddComment("　→ご不便をおかけして申し訳ありません。")
						.AddComment("　　先日の更新履歴に記載したHTTPS対応と、一部の修正ミスの影響と思われます。")
						.AddComment("　　2023/05/30の21時過ぎに、修正ミスについては対応しました。")
						.AddComment("　　また、強制的にHTTPSに切り替える処理を一時的に解除しました。")
						.AddComment("　　これで恐らく、元のセーブが表示されるようになるのではないかと思います。")
						.AddComment("　　なお、次の点にご注意ください。")
						.AddComment("　　・ご連絡いただいた状態は、『HTTPの保存データが表示されなくなった』状態ですので、")
						.AddComment("　　　計算機にアクセスする際には、「http://roratorio-hinanjo.net/roro/」のように、")
						.AddComment("　　　「http」でアクセスしてください。")
						.AddComment("　　　「https」でアクセスすると、保存データにアクセスできません。")
						.AddComment("　　　（ブラウザのアドレスバーに、前述のアドレスをコピーして入力すると確実です）")
						.AddComment("　　・ブラウザのキャッシュなどが残っていると、修正が読み込まれないことがあります。")
						.AddComment("　　　Chrome をお使いとのことですので、計算機の画面を開いた後、")
						.AddComment("　　　Ctrlキー、Shiftキー、Rキーを同時押しすることで、再読み込みできるかと思います。")
						.AddComment("　　・特にブラウザの設定を変更されたわけではないようなので大丈夫だと思いますが、")
						.AddComment("　　　ブラウザによっては、「http」を自動で「https」に変換する設定が用意されています。")
						.AddComment("　　　「http」側にアクセスする場合は、そのような機能はOFFにしてお試しください。")
						.AddComment("　　・HTTP時代から50個以上のデータを利用されていた場合、それらのデータを自動的に")
						.AddComment("　　　HTTPSへ移行することができません。（セキュリティ上の制限です）")
						.AddComment("　　　もし、HTTPSへ移行する場合は、現状、手動でURL出力、URL入力をお願いいたします。")
						.AddComment("　　　（いずれは、簡単な操作で移行できるような欄を設けたいと思います）")
						.AddComment("　　　（プログラマが使うツールを使えば、丸ごとコピーができますが、一般の方には")
						.AddComment("　　　　分かりづらく、煩雑な操作が必要となります。")
						.AddComment("　　　　もし知識をお持ちでしたら、ブラウザの開発者ツールでローカルストレージを表示し、")
						.AddComment("　　　　「http」のURLに保存されているキーと値を、そのまま「https」にコピーすれば、")
						.AddComment("　　　　データを移行できるはずです）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 5, 31)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版】")
						.AddComment("次世代版でURL出力したURLに直接アクセスした場合に、")
						.AddComment("正常にデータをロードできない問題を修正。")
						.AddComment("※既に出力いただいているURLはそのままご利用いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版】")
						.AddComment("スピードアップポーションなどの攻撃速度増加ポーションの設定が、")
						.AddComment("セーブ／ロードされない問題を修正。")
						.AddComment("※既に次世代版で出力いただいているURLでは、データが出力されていません。")
						.AddComment("　お手数ですが、設定しなおしたうえで、再度URL出力をお願いいたします。")
						.AddComment("※安定版で出力いただいているURLはそのままご利用いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サーヴァントウェポンについて報告します』")
						.AddComment("　→各種スキルの実測データのご連絡、ありがとうございます。")
						.AddComment("　　本日の更新で概ね適用させていただきました。")
						.AddComment("　　ただ、『サーヴァントウェポン：デモリッションについて』の、")
						.AddComment("　　『武器体の数の分だけサイン状態の各対象に多段HITする』という点について、")
						.AddComment("　　『現在の計算機のダメージ×武器体の数のダメージになる』という意味なのか、")
						.AddComment("　　『現在の計算機のダメージが、武器体の数で分割表示される』という意味なのか、")
						.AddComment("　　判断がつきませんでした。")
						.AddComment("　　もし、こちらをご覧いただけていましたら、ご連絡いただけると幸いです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 6, 14)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("相変わらず本業が忙しめで、計算機のプログラム修正はおろか、")
						.AddComment("ROへのログインすらできない状態が続いております。")
						.AddComment("少しずつでも対応していきたいと思いますので、気長にお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("シャドウ装備対応")
						.AddComment("※装備可能な職業のみ、通常の装備欄の下に表示されます。")
						.AddComment("※公式の露店取引情報などを参考にランダムオプションを登録しましたが、")
						.AddComment("　過不足があれば、お知らせいただけると幸いです。")
						.AddComment("※従来のセーブデータ形式では、シャドウ装備のセーブ／ロードはできません。")
						.AddComment("　画面右上にある、新形式でのデータセーブ／ロードをご利用ください。")
						.AddComment("※従来のセーブデータを読み込むことは可能です。")
						.AddComment("　その場合、シャドウ装備は一切装備していない状態となります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("ドラゴンナイトスキル「サーヴァントウェポン：デモリッション」の計算式を修正。")
						.AddComment("（追加でのご連絡ありがとうございます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年７月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("実クリティカル率の計算式が誤っていた問題を修正。")
						.AddComment("※スキル「サベージインパクト」など、『自身の 1/2のクリティカル率で、")
						.AddComment("　クリティカル攻撃になる』という性質のスキルにおいて、実際よりも")
						.AddComment("　高いクリティカル率が表示されていました。")
						.AddComment("※例での計算式を、ザックリ表すと次のようになります。")
						.AddComment("　修正前")
						.AddComment("　　（クリティカル率　－　敵のクリティカル耐性）÷　２")
						.AddComment("　修正後")
						.AddComment("　　（クリティカル率　÷　２）－　敵のクリティカル耐性")
						.AddComment("　※クリティカル率が1/2にされた後で、敵のクリティカル耐性が引かれるため、")
						.AddComment("　　実質、敵のクリティカル耐性が2倍になったのと同じ計算になります。")
						.AddComment("※敵のクリティカル耐性は、次の計算式を使用しています。")
						.AddComment("　　敵のクリティカル耐性＝（敵レベル　÷　１５０）＋（敵ＬＵＫ　÷　５）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『カーディナルのペティティオ、エフィリゴについて報告します』")
						.AddComment("　→各種スキルの実測データのご連絡、ありがとうございます。")
						.AddComment("　　該当スキル2種類については、ダメージのずれが以前から指摘されており、")
						.AddComment("　　ゲーム内での検証が必要と考えております。")
						.AddComment("　　クールタイム等の正確な情報をいただいておりますが、ダメージ検証後に、")
						.AddComment("　　併せて適用したいと思いますので、今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サベージインパクトのクリティカル率半減の計算が合わない』")
						.AddComment("　→バグのご連絡ありがとうございます。")
						.AddComment("　　前述のとおり、原因は、計算式自体のミスであると考えられます。")
						.AddComment("　　ご推察いただいた『シャドウセンスによる上昇分の半減漏れ』については、")
						.AddComment("　　修正前から、問題なく半減されているようでした。")
						.AddComment("　　もし、今回の修正でもまだズレが観測されるようでしたら、")
						.AddComment("　　お手数ですが、再度、ご連絡いただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『被ダメージの計算に、最大HPによるダメージ割合を追加して頂きたい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　ご要望の趣旨については、理解いたしました。")
						.AddComment("　　ただ、当計算機の被ダメージの計算は、正直あまり当てにならないため、")
						.AddComment("　　被ダメージの計算というよりも、拡張機能で『HPの○○%は、いくらか』という")
						.AddComment("　　内容が表示される機能のほうが有効かと思いました。")
						.AddComment("　　こちらであれば、選択肢を用意して、3%、4%、5%、10%、25%、50%など、")
						.AddComment("　　○%回復アイテムの効果に合わせて確認できるかと思います。")
						.AddComment("　　ただ、現状、課題が山積みですので、対応はだいぶ先になるかと思います。")
						.AddComment("　　恐れ入りますが、気長にお待ちいただければ幸いです。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 7, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("相変わらず本業が忙しめで、計算機のプログラム修正はおろか、")
						.AddComment("ROへのログインすらできない状態が続いております。")
						.AddComment("少しずつでも対応していきたいと思いますので、気長にお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("2023/07/18のメンテナンス以降、バグと思しき挙動が多数発生しているようです。")
						.AddComment("経験上、アナウンスなしの仕様変更などが行われている可能性もありますので、")
						.AddComment("計算結果を過信されないよう、ご注意ください。")
						.AddComment("また、計算機の計算結果が怪しいようでしたら、お知らせいただけると助かります。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("幻想叢書カードの補助効果については、ひとまず性能カスタマイズをご利用ください。")
						.AddComment("※エクラージュの支援オーブのように、補助効果の実態が料理扱いなど、")
						.AddComment("　他の効果と重複しない可能性があり、計算機に組み込めないためです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年ブライダルイベント　追加アイテム　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年８月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("カード「祈る者」などにある『△属性物理攻撃力+○○%』の効果について、")
						.AddComment("計算方法が誤っていた問題を修正。")
						.AddComment("（検証結果のご連絡ありがとうございました）")
						.AddComment("")
						.AddComment("＜修正内容＞")
						.AddComment("　・計算方法の変更")
						.AddComment("　　『特定の属性の物理攻撃を強化する特化効果』になっていた計算を、")
						.AddComment("　　『マグナムブレイク状態などの追加ダメージ』と同じ計算に修正。")
						.AddComment("　・効果倍率の計算ミスの修正（【次世代版のみ】）")
						.AddComment("　　効果倍率の計算式の改造ミスを修正。")
						.AddComment("　　（計算機更新前よりダメージが下がる場合があります）")
						.AddComment("　・マイナスダメージの扱いの変更")
						.AddComment("　　属性相性でダメージがマイナスになった場合、０としていた計算を、")
						.AddComment("　　マイナスダメージの分だけ、ダメージが低下するように修正。")
						.AddComment("　・効果の優先順位の調整")
						.AddComment("　　同類の効果は１種類しか発動しないはずなので、最も優先度の高い")
						.AddComment("　　効果を使って計算するように調整。具体的には、下記の通り。")
						.AddComment("　　１）エンチャントデッドリーポイズン以外で、最も倍率の高い効果")
						.AddComment("　　２）１で同じ倍率が複数ある場合、次の属性順（左ほど優先）")
						.AddComment("　　　　無＞水＞地＞火＞風＞毒＞聖＞闇＞念＞不死")
						.AddComment("　　　　（特に意味があるわけではなく、計算機独自の属性番号順です）")
						.AddComment("　　３）エンチャントデッドリーポイズンの追加効果")
						.AddComment("")
						.AddComment("＜注意事項＞")
						.AddComment("　・特定のスキルには効果が乗らないなど、まだ判明していない仕様がある")
						.AddComment("　　可能性もあります。")
						.AddComment("　　計算結果を過信しないよう、ご注意ください。")
						.AddComment("　　※現状、効果が乗らないスキルは、下記の通りです。")
						.AddComment("　　　・エンチャントデッドリーポイズン以外")
						.AddComment("　　　　「メテオアサルト」、「フェイントボム」")
						.AddComment("　　　・エンチャントデッドリーポイズン")
						.AddComment("　　　　色々（プログラムがゴチャゴチャなので、正しいのか未確認）")
						.AddComment("　・拡張表示にあった『△属性物理攻撃力+○○%』の表示は、撤去しました。")
						.AddComment("　　（効果の合計値を表示する仕様だったので、ズレが生じるためです）")
						.AddComment("　・マイナスダメージになる場合、端数の切り捨て／切り上げ処理で、")
						.AddComment("　　多少の誤差が生じる可能性があります。")
						.AddComment("　　（マイナス値の切り捨て／切り上げ処理が不明なため）")
						.AddComment("　・もし、複数の追加ダメージが同時に発生するようでしたら、")
						.AddComment("　　お手数ですが、連絡フォームよりお知らせいただけると幸いです。")
						.AddComment("　・エンチャントデッドリーポイズンだけ特別扱いのように見えますが、")
						.AddComment("　　従来の計算機でも同じ扱いでした。")
						.AddComment("　　ですので、「アイテム時限効果欄」で「祈る者」カードなどを設定して")
						.AddComment("　　いなければ、計算結果は従来と同じになるはずです。")
						.AddComment("　　※一応理由はあって、同スキルの効果は本来、次のようなものです。")
						.AddComment("　　　　「ＡＴＫ増強効果」＋「毒属性追加ダメージ」")
						.AddComment("　　　ここで、「毒属性追加ダメージ」の部分は、マグナムブレイク等で")
						.AddComment("　　　上書きができるため、「ＡＴＫ増強効果」を残しつつ、他の属性の")
						.AddComment("　　　追加ダメージで計算できるよう、最後に計算する扱いになっています。")
						.AddComment("　・防具「執行者のシューズ」の物理攻撃ダメージ増加効果が、")
						.AddComment("　　マグナムブレイク状態と同類の効果である可能性があります。")
						.AddComment("　　（同効果は以前から特別な計算で、計算の位置が今回の処理の直前です）")
						.AddComment("　　現在は別物として計算していますが、同類の場合、ダメージがずれます。")
						.AddComment("　　もし、実測に誤差があるようでしたら、ご連絡いただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具「ドラゴンスケイルプレート」に不死属性が設定されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("攻撃手段に「アシッドデモンストレーション」を選択した際、")
						.AddComment("ダメージ計算の結果が正しく表示されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『計算機にて、自身を状態異常にして計算する機能がほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　ご希望に添えるかは分かりませんが、いくつかの状態異常等については、")
						.AddComment("　　「その他の支援/設定 (暫定追加機能)」欄の、一番下に設定欄があります。")
						.AddComment("　　ただ、本家様で対応されていた状態からほぼ更新していないため、")
						.AddComment("　　近年の状態異常等には、対応できていません。")
						.AddComment("　　対応したいところではありますが、管理人の今年の状況を考えると、")
						.AddComment("　　対応は難しいか、相当先になると思われます。")
						.AddComment("　　申し訳ありませんが、ご理解、ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『HPを入力する欄に関して、数値上限が低く現状に即していない』")
						.AddComment("　→不都合のご指摘ありがとうございます。")
						.AddComment("　　ダメージが残りHPに依存するスキルなどにある専用の入力欄については、")
						.AddComment("　　ご指摘の通り、数値の上限が適切でない状態になっています。")
						.AddComment("　　ただ、上限を上げるには、セーブデータ側の対応も必要になるため、")
						.AddComment("　　少し作業が間に合っていません。")
						.AddComment("　　元々、いずれ対応する予定でしたので、少しまとまった時間が取れれば、")
						.AddComment("　　対応できると思います。")
						.AddComment("　　恐れ入りますが、今しばらくお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 7, 24)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("相変わらず本業が忙しめで、計算機のプログラム修正はおろか、")
						.AddComment("ROへのログインすらできない状態が続いております。")
						.AddComment("少しずつでも対応していきたいと思いますので、気長にお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("魔法攻撃スキルにおいて、最小ダメージが０になってしまう場合がある問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「ゲフェン夜間闘技場エンチャント」が可能なアクセサリーにおいて、")
						.AddComment("エンチャントの選択欄に精錬値が表示されていた問題を修正。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 8, 2)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("相変わらず本業が忙しめで、計算機のプログラム修正はおろか、")
						.AddComment("ROへのログインすらできない状態が続いております。")
						.AddComment("少しずつでも対応していきたいと思いますので、気長にお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年マッスルイベント　エンチャント追加　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年サマーパッケージ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『夢幻ボスのステータスを実装してほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　ご希望の方も多いかと思うので対応したいところですが、")
						.AddComment("　　管理人がエンドコンテンツに疎く、まずどれが夢幻のボスなのかを")
						.AddComment("　　確認するところから始める必要があります。")
						.AddComment("　　そのため、少々作業量が多く、すぐには対応できそうにありません。")
						.AddComment("　　（対応待ちの項目が山ほど溜まってしまっているため）")
						.AddComment("　　恐れ入りますが、気長にお待ちいただければと思います。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 8, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年９月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("職業「エレメンタルマスター」で、スキル「スペルフィスト」を")
						.AddComment("攻撃手段に選択した場合、正常に計算できない場合がある問題を修正。")
						.AddComment("（プログラム側のミスですので、セーブデータはそのままお使いいただけます）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『次世代版の計算機で矢が保存されない』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　結論から申し上げると、ご指摘の挙動は「バグ」です。")
						.AddComment("　　保存されるのが正しい動作となります。")
						.AddComment("　　ただ、修正は少し手がかかりそうで、すぐに対応できそうにありません。")
						.AddComment("　　申し訳ありませんが、ひとまずは手動で再設定していただくよう、")
						.AddComment("　　お願い申し上げます。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 9, 5)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("イスガルドアップデート　対応")
						.AddComment("※装備の「超越」システムには対応できていません。")
						.AddComment("　お手数ですが、性能カスタマイズ機能などで調整をお願いいたします。")
						.AddComment("　（作業量がかなり多そうなので、対応は相当先になると思います）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("公式ツールの情報をもとに、モンスターデータを更新しました。")
						.AddComment("・一部のモンスターの名称を、公式ツールの名称に合わせました。")
						.AddComment("　※「セイレン=ウィンザー（転生二次職）」など。")
						.AddComment("・夢幻の迷宮のボス（と思われるデータ）を追加登録しました。")
						.AddComment("　※「イフリート（A）（MD）」のような名前になっています。")
						.AddComment("　　（A）や（B）が、おそらく迷宮の種類を指していると思います。")
						.AddComment("　　どれがどれかご連絡いただければ、表示を変更できます。")
						.AddComment("　　（Aがどれというより、実装順に順序付けされているだけのようにも")
						.AddComment("　　　見えますが、管理人が夢幻の迷宮に疎いためよく分かりません）")
						.AddComment("　※（MD）は、特に夢幻の迷宮という意味ではなく、通常のフィールドと")
						.AddComment("　　同名のモンスターで、MD専用のモンスターを表していると思います。")
						.AddComment("・イベント専用モンスターなどは、追加登録していません。")
						.AddComment("・公式ツールにデータが存在しない未実装のモンスターや、過去のイベント")
						.AddComment("　専用と思われるモンスターのデータは、更新していません。")
						.AddComment("・公式ツールのデータから機械的に変換したため、一部データが修正されています。")
						.AddComment("　例えば、次のようなデータが修正されています。（一例です）")
						.AddComment("　・「スウィートフロッグ」の名前が間違っていた。")
						.AddComment("　・「アクラウス」のＨＰが10k増加した。")
						.AddComment("　・「兵隊デニーロ」と「兵隊ピエール」のデータが逆だった。")
						.AddComment("　・イリュージョン迷宮の森のモンスターの経験値が、２倍期間中のものだった。")
						.AddComment("・モンスター名の読み仮名を修正したため、並び順が変わっています。")
						.AddComment("　（マップ名などと同様の検索機能への対応準備のためです。")
						.AddComment("　　そこまで対応してから公開したかったのですが、間に合いませんでした）")
						.AddComment("　また、読み仮名は手作業で編集したため、誤りがある可能性があります。")
						.AddComment("・もし誤りに気付かれましたら、ご連絡いただけると幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("以下の装備セットの効果が、正しく計算されていなかった問題を修正。")
						.AddComment("・防具「特選ドラムスーツ」＋エンチャント「ゾディアック」")
						.AddComment("・防具「特選ドラムシューズ」＋エンチャント「ゾディアック」")
						.AddComment("・防具「抱きつきシャムネコ」＋エンチャント「ゾディアック」")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("一定確率で追加発動するスキルのダメージが、秒間ダメージの計算で、")
						.AddComment("正しく加味されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サーヴァントウェポンのダメージ計算で、一撃より秒間のほうが低い』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　計算ミスに関しては、前述のとおり正しい状態になったかと思います。")
						.AddComment("　　なお、『最大5ウェポン、1秒ごとに1ウェポン』については、")
						.AddComment("　　当計算機では対応しておりません。（予定もありません）")
						.AddComment("　　『常に、発動に十分なウェポンがあって、一定の確率で発動した場合』")
						.AddComment("　　での計算のみの対応となります。ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『セーブデータをURLから読み込むと、シャドウ装備が反映されない』")
						.AddComment("　→恐れ入りますが、こちらでは問題を確認できませんでした。")
						.AddComment("　　別のエラーが発生していると、シャドウ装備の読み込み前に")
						.AddComment("　　計算機の処理が停止してしまう場合がありますので、URL出力の内容を")
						.AddComment("　　お知らせいただけると、詳しい調査ができるかと思います。")
						.AddComment("　　なお、シャドウ装備については、『次世代版用の新しいセーブデータ』でのみ、")
						.AddComment("　　データが保存される仕様となっております。")
						.AddComment("　　（計算機ページの右上の「セーブ／ロード」欄から行うセーブ、URL出力です）")
						.AddComment("　　計算機ページ下部に残してある、従来のセーブ形式では保存されませんので、")
						.AddComment("　　セーブ形式を誤っていないか、今一度ご確認いただけると幸いです。")
						.AddComment("　　（ページ下部のURL出力は、新しいURL出力が正常に機能しない場合などに、")
						.AddComment("　　　緊急避難的に使用するためのものです。")
						.AddComment("　　　今後は基本的に、右上のセーブ／ロード欄の機能をご利用ください。")
						.AddComment("　　　ページ下部の欄は、いずれ撤去します）")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 10, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("10月くじのアイテムなど、更新をお待たせしており、申し訳ありません。")
						.AddComment("次回の更新は、来週半ばか、次回くじ更新の頃になるかと思います。")
						.AddComment("恐れ入りますが、今しばらく、お待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("公式より、公式ツールへの過剰なアクセスについて注意喚起が発表されておりますが、")
						.AddComment("当計算機をお使いいただいても、通常は、そのようなアクセスは発生しません。")
						.AddComment("従来通り、安心してご利用いただければと思います。")
						.AddComment("（登録するデータ収集も、現状は手作業で行っております）")
						.AddComment("ただし、第三者が製作したプラグインや拡張機能までは把握しておりませんので、")
						.AddComment("それらのアクセス状況については、各製作者の方へご確認をお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 10, 17)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年１０月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年１１月くじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年メロンフェスタ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_MONSTER)
						.AddComment("夢幻の迷宮の出現モンスターを迷宮の種類ごとに分類。")
						.AddComment("（詳細なデータのご連絡、ありがとうございました）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("防具セット「剛勇無双の神輿＋剛勇無双の籠手」の無属性耐性が、")
						.AddComment("誤っていた問題を修正。（20%ではなく、正しくは10%でした）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("防具「ウルの腕輪」の、一定確率でアンリミット状態になる効果が、")
						.AddComment("正しく計算されていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("秒間ダメージや秒間攻撃回数、秒間経験値の計算において、")
						.AddComment("詠唱時間が計算に含まれていなかった問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("【次世代版のみ】")
						.AddComment("スキル「グラビテーションフィールド」のダメージが、")
						.AddComment("正常に計算されない問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『魔女のスキルカードのステ125以上のスキルの条件が異なる』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　『素数ではなく2,3,7,11,13,17,19の倍数でなければ良い』とのことで、")
						.AddComment("　　修正自体は可能です。")
						.AddComment("　　ただ、長年通説だった条件の変更となるため、複数の検証結果を確認したうえで、")
						.AddComment("　　対応させていただきたいと考えております。")
						.AddComment("　　ただ、あいにく、管理人は当該アイテムを持っておらず、購入する資金もないため、")
						.AddComment("　　お手数ではありますが、他の方にも様々な数値でご確認いただくなど追加の検証を")
						.AddComment("　　していただけると、対応できるかと思います。")
						.AddComment("　　※ご連絡の条件だと、「145（＝29×5）」、「155（＝31×5）」や、")
						.AddComment("　　　「529（＝23×23）」、「575（=23×5×5）」などが追加になるかと思います。")
						.AddComment("　　申し訳ありませんが、ご理解、ご了承のほど、よろしくお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ヴァルキリーカースブライトの精錬による『すべてのステータス+10』は、")
						.AddComment("　『装備によるＶＩＴ上昇分は、ＨＰも同量増加させる』効果に含まれるか？』")
						.AddComment("　→結論から申し上げて、現在の計算機では、『含まれない』計算になっております。")
						.AddComment("　　簡単にゲーム内で確認したところ、実測も『含まれない』計算のようでした。")
						.AddComment("　　（VITが+10されることによる上昇は適用されますが、追加でMaxHP+10はされません）")
						.AddComment("　　もし、計算が合わないケースがあるようでしたら、URL出力の結果も添えて")
						.AddComment("　　お知らせいただけると、調査ができるかもしれません。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ドラゴニックオーラ使用時のハンドレッドスピアの計算式を反映してほしい』")
						.AddComment("　→情報のご連絡ありがとうございます。")
						.AddComment("　　お知らせいただいたところ恐縮ですが、同サイトは記載内容の外部利用を")
						.AddComment("　　許可されていないようです。")
						.AddComment("　　従いまして、同サイトの情報を元に計算機を修正することは致しかねます。")
						.AddComment("　　（同サイトの情報を元に、実際に計測したデータをお送りいただき、")
						.AddComment("　　　計算式を導くのに十分なデータがあれば、導出して反映させることは可能です）")
						.AddComment("　　申し訳ありませんが、ご理解、ご了承のほど、よろしくお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『サイズ補正が100%取れているか確認できるようにしてほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　機能としては有用だと理解しておりますが、現状課題が山積みですので、")
						.AddComment("　　事実上、対応は先送りになるかと思います。")
						.AddComment("　　申し訳ありませんが、ご理解、ご了承のほど、よろしくお願いいたします。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『真理の解放や豪傑が何個取れているか確認できるようにしてほしい』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　機能としては有用だと理解しておりますが、現状課題が山積みですので、")
						.AddComment("　　事実上、対応は先送りになるかと思います。")
						.AddComment("　　申し訳ありませんが、ご理解、ご了承のほど、よろしくお願いいたします。")
				)
			)
	);

	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 11, 15)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("下記のスキルについて、「ドラゴニックオーラ」使用後の状態で使用すると")
						.AddComment("ダメージが増加する計算に対応。")
						.AddComment("・ハンドレッドスピア")
						.AddComment("※「ドラゴニックオーラ状態」は、「パッシブ持続系」欄で設定できます。")
						.AddComment("※ハンドレッドスピアは実測データをいただきました。ありがとうございます。")
						.AddComment("※ドラゴンブレス２種にについては対応できていません。ご了承ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_FUNCTION)
						.AddComment("【次世代版のみ】")
						.AddComment("四次職支援設定に下記の項目を追加")
						.AddComment("・ミュージカルインタールード")
						.AddComment("・夕焼けのセレナーデ")
						.AddComment("・プロンテラマーチ")
						.AddComment("※『自身の周辺 31 x 31セルにトルバドゥールかトルヴェールの")
						.AddComment("　　異性のパーティーメンバーがいる場合、増加量が 1.5倍になる』には")
						.AddComment("　　対応できていません。（端数処理が不明なので）")
						.AddComment("※現状、他の支援と共存可能で計算しています。")
						.AddComment("　他支援（例えば、コンペテンティア）と共存できない（上書きする）など")
						.AddComment("　ありましたら、連絡フォームよりお知らせいただけると助かります。")
						.AddComment("※演奏同士は共存可能とご連絡いただいております。ありがとうございます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("ペット「ナイトメアテラー」　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("タナトスの記憶エンチャント拡張　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_UPDATE_ITEM)
						.AddComment("２０２３年アニバくじ　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("スキル「ファイト」仕様変更　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("スキル「○○の怒り」仕様変更　対応")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("ペット装備セット「ダークロード＋ワンダーエッグバスケット」の効果が、")
						.AddComment("誤っていた問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("下記の職業を養子状態にした場合のステータスの最大値が誤っていた")
						.AddComment("問題を修正。")
						.AddComment("　・テコンキッド")
						.AddComment("　・拳聖")
						.AddComment("　・ソウルリンカー")
						.AddComment("　・忍者")
						.AddComment("　・ガンスリンガー")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『URL出力するとシャドウ装備が外れる』")
						.AddComment("　→お手数ですが、次世代版計算機でデータをセーブ／ロード、あるいは、")
						.AddComment("　　URL出力／入力される場合は、右上にある「セーブ／ロード」欄をご利用ください。")
						.AddComment("　　従来のURL出力欄は、バグ発生時の緊急保存用として残してあるもので、")
						.AddComment("　　シャドウ装備などに対応しておらず、近い将来、削除されます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『ヴェラチュールスピアを計算すると、聖４相手にダメージが通る』")
						.AddComment("　→恐れ入りますが、管理人の手元では問題を確認できませんでした。")
						.AddComment("　　お手数ですが、どのような条件下で計算されたか、可能であれば、")
						.AddComment("　　URL出力の結果も添えてお知らせいただけませんでしょうか？")
						.AddComment("　　なお、計算機の「二次職支援設定」にある『属性場　種類』を「風」に")
						.AddComment("　　設定し、『属性場　レベル』を「１」以上に設定すると、聖４相手でも")
						.AddComment("　　ヴェラチュールスピアーのダメージが出るようになりますので、")
						.AddComment("　　設定ミスなどがないかも、併せてご確認ください。")
				)
			)
	);


	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 11, 28)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("拡張四次職の対応を開始いたしました。")
						.AddComment("ただ、本業が相変わらず忙しいため、データの調査や検証には時間がかかると思われます。")
						.AddComment("とはいえ、本年の実績を鑑みると、到底、調査／検証が追いつくとは思えないため、")
						.AddComment("ご利用いただいている皆さまから、検証データ等のご連絡を広く募りたいと考えております。")
						.AddComment("お名前も出せず、報酬等もお支払いできない中、厚かましいお願いで恐縮ですが、")
						.AddComment("計算したいスキルの計算式やクールタイムだけでも、調査、ご連絡いただけるとありがたく存じます。")
						.AddComment("（転載でご連絡いただく場合は、転載元（Webサイトや掲示板等）で許可されていることをご確認願います）")
						.AddComment("なお、現在の状況等については、各専用ページにてご確認いただけると幸いです。")
						.AddComment("（拡張四次職以外のデータでも大歓迎です）")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("レベル上限解放　対応")
						.AddComment("※高レベル帯の必要経験値が緩和されていた点も併せて修正しました。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("拡張四次職　天帝　対応")
						.AddComment("※対応が間に合わず、順次の公開となります。ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『「■プレイヤー(防御側)」、「モンスター（手入力）」の並び順がおかしい』")
						.AddComment("　→不具合のご連絡ありがとうございます。")
						.AddComment("　　今日の更新でいれたかったのですが、力尽きてしまいました。")
						.AddComment("　　次回を目途に、早急に修正するようにいたします。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『「四次職関連への対応について」の【要検証】項目を報告する形が良いでしょうか？』")
						.AddComment("　→ご協力のお申し出ありがとうございます。")
						.AddComment("　　ご連絡をいただいてから熟考し、検証データについては、広く募ることといたしました。")
						.AddComment("　　（事実上、管理人の手で検証することが不可能な状況になっているため）")
						.AddComment("　　ご連絡いただければ、随時対応していきたいと思いますので、お願いできますと幸いです。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アックスストンプのスキルデータを検証しました』")
						.AddComment("　→検証データのご連絡ありがとうございます。")
						.AddComment("　　今日の更新でいれたかったのですが、力尽きてしまいました。")
						.AddComment("　　次回を目途に、早急に対応するようにいたします。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アイテム検索機能を実装する事は難しいでしょうか？』")
						.AddComment("　→改良のご提案ありがとうございます。")
						.AddComment("　　元々検索機能の構想はあり、大幅改造によって実現する予定でした。")
						.AddComment("　　（マップ選択やモンスター選択欄では、微妙に対応しています）")
						.AddComment("　　機能としては既にひな形があるのですが、データのほうが対応できておらず、")
						.AddComment("　　思うような検索はできないのが実情です。")
						.AddComment("　　ただ、アイテムデータの数は５０００近くもあり、容易に修正はできません。")
						.AddComment("　　従いまして、すぐに対応することは、事実上、不可能かと思います。")
						.AddComment("　　公式サイトにあるRO公式ツール「アイテム検索」などをご利用いただき、")
						.AddComment("　　その結果をもとに、計算機を操作するなどのご対応をお願いできればと思います。")
				)
			)
	);


	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 12, 4)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("アニバーサリーパッケージ装備は、エンチャントが多く間に合いませんでした。")
						.AddComment("今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_SPEC_CHANGE)
						.AddComment("拡張四次職　ソウルアセティック　対応")
						.AddComment("※対応が間に合わず、順次の公開となります。ご容赦ください。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_BUG_FIX)
						.AddComment("「■プレイヤー(防御側)」、「モンスター（手入力）」の並び順がおかしかった")
						.AddComment("問題を修正。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『H.Plus関連ですが以前調べた時の情報があります。』")
						.AddComment("　→検証データのご連絡ありがとうございます。")
						.AddComment("　　今日の更新でいれたかったのですが、力尽きてしまいました。")
						.AddComment("　　次回を目途に、早急に対応するようにいたします。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『スピリットハンドラーの鹿スキルダメージを検証しました。』")
						.AddComment("　→検証データのご連絡ありがとうございます。")
						.AddComment("　　スピリットハンドラーの追加が終わっておらず申し訳ないのですが、")
						.AddComment("　　対応時に参考とさせていただきたいと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『アークメイジのHP/SPを調べたので報告します。』")
						.AddComment("　→検証データのご連絡ありがとうございます。")
						.AddComment("　　Lv240以降も『上昇量は固定』で間違いないようで、安心いたしました。")
						.AddComment("　　なお、計算機は既に対応済みなので、そのままご利用いただけます。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『トルバドゥール・トルヴェールのスキル情報があります。』")
						.AddComment("　→検証データのご連絡ありがとうございます。")
						.AddComment("　　今日の更新でいれたかったのですが、力尽きてしまいました。")
						.AddComment("　　できるだけ、早急に対応するようにいたします。")
						.AddComment("　　今しばらくお待ちいただければと思います。")
				)
			)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_QA_ANSWER)
						.AddComment("『総合計算機のSSやブラウザ画面の録画で素材を取得して動画を制作したい』")
						.AddComment("　→わざわざご連絡いただきありがとうございます。")
						.AddComment("　　当計算機の画面や、当計算機を操作する映像などは、基本的に自由に")
						.AddComment("　　ご利用いただいて問題ありません。")
						.AddComment("　　公式サイトに記載の「著作物利用ガイドライン」にご注意いただければ、")
						.AddComment("　　問題なくご利用いただけます。")
						.AddComment("　　なお、当計算機に、同ガイドラインに違反するデータはないと考えておりますので、")
						.AddComment("　　その点もご安心いただければと思います。")
				)
			)
	);



	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 12, 19)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("拡張四次職の対応などをお待たせしており申し訳ありません。")
						.AddComment("今年に入り、本業が忙しいこともあるのですが、諸般の事情により、")
						.AddComment("現在、一ファンサイトとしての「気持ち」が完全に切れてしまっております。")
						.AddComment("ご愛顧いただいている皆さまには、多大なご迷惑をおかけして申し訳ありませんが、")
						.AddComment("少し更新をお休みさせていただきたいと思います。")
						.AddComment("ご理解、ご容赦くださいますよう、お願い申し上げます。")
				)
			)
	);



	dataArray.push(
		new CChangeLogUnit()
			.SetId(id++)
			.SetLogDate(2023, 12, 27)
			.AddLogComment(
				funcRegisterComment(
					new CChangeLogComment()
						.SetId(commentId++)
						.SetKind(CHANGE_LOG_KIND_NOTICE)
						.AddComment("皆様からの温かいメッセージ、痛み入ります。")
						.AddComment("ご要望にお応えすることは難しいのですが、1点だけ明記しておこうと思います。")
						.AddComment("当サイトのソースコード等の再利用／公開は、基本的に問題ありません。")
						.AddComment("（そもそも、JavaScriptのみで動いており、誰でも閲覧できる状態ですので……）")
						.AddComment("本家ROratorio様の注意事項をご確認いただき、その範囲で運用いただければ幸いです。")
						.AddComment("（大改造の途中だったのもあり、かなり汚い難解なソースコードで申し訳ありません）")
						.AddComment("（データの更新だけなら、m/js/****.dat.js 等を修正すればある程度何とかなると思います）")
						.AddComment("以上、丸投げとなってしまい恐縮ですが、ご参考いただければと思います。")
				)
			)
	);


/*
	積み残し課題：
	2023/11/07の「イヌハッカメテオ」と「キャロットビート」の仕様変更未対応。
*/




	/*
		たぶん、MaxSP とかに、過剰で増えるINTの値そのものは加算されない。計算機のバグっぽい。
	*/







	// 各データをdatデータに変換する
	for (idx = 0; idx < commentArray.length; idx++) {
		commentDat.push(commentArray[idx].ToDat());
	}
	for (idx = 0; idx < dataArray.length; idx++) {
		dataDat.push(dataArray[idx].ToDat());
	}



	// 定義済みデータ配列を上書き
	g_ChangeLogCommentArray = commentDat;
	g_ChangeLogUnitArray = dataDat;

};





// データ上書き
if (_DATA_CREATE_MODE) {
	CChangeLogDataMaker.OverrideData();
}
