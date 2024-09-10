//================================================================================================================================
//
// デバッグ全般
//
//================================================================================================================================

// デバッグ環境フラグ
_DEBUG = false;
//_DEBUG = true;

// データ作成フラグ
_DATA_CREATE_MODE = (_DEBUG && true);

// デバッグ用ファイル読み込みチェックフラグ
g_bDebugFileIncluded = false;



/**
 * デバッグ用ファイル読み込み検査.
 */
function DebugFileIncludeCheck() {
	if (!_DEBUG) {
		if (!g_bDebugFileIncluded) {
			alert("非デバッグ環境で、デバッグ専用ファイルが読み込まれています。");
			g_bDebugFileIncluded = true;
		}
	}
}



// 魔法ダメージ計算順序検証フラグ
_MAGIC_CALC_INSPECTION = (_DEBUG && false);

// エンチャントリストデータ形式移行フラグ
_ENCH_LIST_MIG = true;

// Lv200解放アップデート適用フラグ
_APPLY_UPDATE_LV200 = true;

// Lv200解放アップデート　クリティカル計算方式変更　適用フラグ
_APPLY_UPDATE_LV200_CRITICAL = true;






//================================================================================================================================
//
// パース機能
//
//================================================================================================================================

// パース利用フラグ
_DATA_PARSE_MODE = (_DEBUG && true);

// パーサ用ファイル読み込みチェックフラグ
g_bParserFileIncluded = false;



/**
 * パーサ用ファイル読み込み検査.
 */
function ParserFileIncludeCheck() {
	if (!_DATA_PARSE_MODE) {
		if (!g_bParserFileIncluded) {
			alert("非パーサ環境で、パーサ専用ファイルが読み込まれています。");
			g_bParserFileIncluded = true;
		}
	}
}





//================================================================================================================================
//
// データ移行
//
//================================================================================================================================

// データ移行フラグ
_DATA_MIGRATION_MODE = (_DEBUG && false);

// データ移行フラグ（新プロセス）
// ・移行処理のために新設された処理
// ・既存処理には影響を与えない
// ・移行完了後も残る処理
_ENABLE_MIGRATION_BLOCK_NEW_PROCESS = (_DATA_MIGRATION_MODE && true);

// データ移行フラグ（過渡期の補正）
// ・移行処理のために新設された処理
// ・既存処理には影響を与えない
// ・移行完了後は残らない処理
_ENABLE_MIGRATION_BLOCK_TRANSIT = (_DATA_MIGRATION_MODE && true);

// データ移行テスト用カバレッジ収集フラグ
_ENABLE_MIGRATION_COVERAGE = (_DATA_MIGRATION_MODE && true);

// テスト設定変更中フラグ
_TEST_SETTINGS_APPLYING = false;






// データ移行ファイル読み込みチェックフラグ
g_bMigrationFileIncluded = false;



/**
 * データ移行用ファイル読み込み検査.
 */
function MigrationFileIncludeCheck() {
	if (!_DATA_MIGRATION_MODE) {
		if (!g_bMigrationFileIncluded) {
			alert("非データ移行環境で、データ移行専用ファイルが読み込まれています。");
			g_bMigrationFileIncluded = true;
		}
	}
}



/**
 * データ移行フラグ（新プロセス）が有効かを判定する.
 */
function IsEnableMigrationBlockNewProcess() {

	if (!_DEBUG) {
		return false;
	}

	if (!_DATA_MIGRATION_MODE) {
		return false;
	}

	return _ENABLE_MIGRATION_BLOCK_NEW_PROCESS;
}

/**
 * データ移行フラグ（過渡期の補正）が有効かを判定する.
 */
function IsEnableMigrationBlockTransit() {

	if (!_DEBUG) {
		return false;
	}

	if (!_DATA_MIGRATION_MODE) {
		return false;
	}

	return _ENABLE_MIGRATION_BLOCK_TRANSIT;
}

/**
 * 移行後データが定義されているアイテムかを判定する.
 */
function IsMigrationedItemId(itemId) {

	var bDefined = false;

	if (!_DEBUG) {
		return false;
	}

	if (!IsEnableMigrationBlockTransit()) {
		return false;
	}

	bDefined = (EnumMigItemId.GetDefinedName(itemId) != "");

	if (!bDefined) {
		WriteConsoleLog("IsMigrationedItemId" + ":" + "移行後データに定義なし（itemId == " + itemId + "）");
	}

	return bDefined;
}
