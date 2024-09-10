
//----------------------------------------------------------------
// 更新履歴コメントの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumChangeLogCommentIndex",
	[
		"CHANGE_LOG_COMMENT_INDEX_ID",
		"CHANGE_LOG_COMMENT_INDEX_KIND",
		"CHANGE_LOG_COMMENT_INDEX_COMMENTS",
	],
	0,
	1
);

//----------------------------------------------------------------
// 更新履歴ユニットの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumChangeLogUnitIndex",
	[
		"CHANGE_LOG_UNIT_INDEX_ID",
		"CHANGE_LOG_UNIT_INDEX_DATE",
		"CHANGE_LOG_UNIT_INDEX_COMMENTS",
	],
	0,
	1
);

//----------------------------------------------------------------
// 更新履歴コメントの種類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumChangeLogKind",
	[
		"CHANGE_LOG_KIND_NONE",

		"CHANGE_LOG_KIND_NOTICE",			// お知らせ
		"CHANGE_LOG_KIND_GENERAL",			// 全般
		"CHANGE_LOG_KIND_UPDATE_FUNCTION",	// 機能更新
		"CHANGE_LOG_KIND_SPEC_CHANGE",		// ゲーム仕様変更対応
		"CHANGE_LOG_KIND_UPDATE_JOB",		// 職業更新
		"CHANGE_LOG_KIND_UPDATE_ITEM",		// アイテム更新
		"CHANGE_LOG_KIND_UPDATE_CARD",		// カード更新
		"CHANGE_LOG_KIND_UPDATE_SKILL",		// スキル更新
		"CHANGE_LOG_KIND_UPDATE_MONSTER",	// モンスター更新
		"CHANGE_LOG_KIND_BUG_FIX",			// バグ対応
		"CHANGE_LOG_KIND_QA_ANSWER",		// お問い合わせ回答
		"CHANGE_LOG_KIND_TIME_SPENDING",	// 対応に時間がかかるもの
		"CHANGE_LOG_KIND_THANKS",			// 謝辞
		"CHANGE_LOG_KIND_ELSE",				// その他

		// 以下は今後使用しない
		"CHANGE_LOG_KIND_SPECIFICATION",	// 仕様
		"CHANGE_LOG_KIND_IS_SPEC",			// 仕様？
	],
	0,
	1
);

//----------------------------------------------------------------
// 表示モード
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumChangeLogDispMode",
	[
		"CHANGE_LOG_DISP_MODE_LOG_PAGE",
		"CHANGE_LOG_DISP_MODE_MAIN_PAGE",
	],
	0,
	1
);

//----------------------------------------------------------------
// 更新履歴コメントの表示分類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumChangeLogDispSpan",
	[
		"CHANGE_LOG_DISP_SPAN_NONE",

		"CHANGE_LOG_DISP_SPAN_3_MONTHES",
		"CHANGE_LOG_DISP_SPAN_6_MONTHES",
		"CHANGE_LOG_DISP_SPAN_12_MONTHES",
	],
	0,
	1
);





/**
 * 更新履歴コメントの種類のテキストを取得する.
 * @param kind 更新履歴コメントの種類
 * @return 更新履歴コメントの種類のテキスト
 */
function GetChangeLogKindText(kind) {

	switch (kind) {

	case CHANGE_LOG_KIND_NOTICE:
		return "お知らせ";

	case CHANGE_LOG_KIND_GENERAL:
		return "全般";

	case CHANGE_LOG_KIND_UPDATE_FUNCTION:
		return "機能更新";

	case CHANGE_LOG_KIND_SPEC_CHANGE:
		return "ゲーム仕様変更対応";

	case CHANGE_LOG_KIND_UPDATE_JOB:
		return "職業更新";

	case CHANGE_LOG_KIND_UPDATE_ITEM:
		return "アイテム更新";

	case CHANGE_LOG_KIND_UPDATE_CARD:
		return "カード更新";

	case CHANGE_LOG_KIND_UPDATE_SKILL:
		return "スキル更新";

	case CHANGE_LOG_KIND_UPDATE_MONSTER:
		return "モンスター更新";

	case CHANGE_LOG_KIND_BUG_FIX:
		return "バグ対応";

	case CHANGE_LOG_KIND_QA_ANSWER:
		return "お問い合わせ回答";

	case CHANGE_LOG_KIND_TIME_SPENDING:
		return "ご連絡いただいているものの対応に時間がかかりそうなバグ等";

	case CHANGE_LOG_KIND_THANKS:
		return "謝辞";

	case CHANGE_LOG_KIND_ELSE:
		return "その他";

	case CHANGE_LOG_KIND_SPECIFICATION:
		return "仕様（バグ報告いただいたものの正常な動作）";

	case CHANGE_LOG_KIND_IS_SPEC:
		return "仕様？";

	}

	return "エラー";
}

/**
 * 更新履歴の表示期間のテキストを取得する.
 * @param span 更新履歴の表示期間
 * @return 更新履歴の表示期間のテキスト
 */
function GetChangeLogDispSpanText(span) {

	switch (span) {

	case CHANGE_LOG_DISP_SPAN_NONE:
		return "すべて";

	case CHANGE_LOG_DISP_SPAN_3_MONTHES:
		return "最新～３か月前";

	case CHANGE_LOG_DISP_SPAN_6_MONTHES:
		return "最新～半年前";

	case CHANGE_LOG_DISP_SPAN_12_MONTHES:
		return "最新～１年前";

	}

	return "エラー";
}
