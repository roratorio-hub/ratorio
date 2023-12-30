
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();





function CMigRrtSrcMatchedTree () {

	// マッチしたマッチャへの参照
	this.refMatcher = null;

	// 値（子要素がある場合は配列、そうでなければ文字列）
	this.value = null;

	// 親要素
	this.parent = null;



	/**
	 * データをクリアする.
	 */
	this.Clear = function () {
		this.refMatcher = null;
		this.value = null;
		this.parent = null;
	};



	/**
	 * 葉要素であるかを判定する.
	 */
	this.IsLeafElement = function () {
		return (Array.isArray(this.value) == false);
	};



	/**
	 * ルート要素を取得する.
	 */
	this.GetRoot = function () {
		if (this.parent) {
			return this.parent.GetRoot();
		}

		return this;
	};



	/**
	 * マッチツリーを結合する.
	 * @param matchedTree 結合するマッチツリー
	 * @param castLoopCount 親ノードへのキャストループを実行した回数（初期値:0）
	 */
	this.JoinTree = function (matchedTree, castLoopCount = 0) {

		var idx = 0;

		var cursor = null;
		var cursorWork = null;
		var cursorWorkParent = null;

		var matchedTreeWork = null;
		var valueArray = null;
		var toReturnObject = null;



		cursor = this;

		// 追加対象となる親要素を特定する
		// （カーソルが最上位要素に到達したら、そのカーソルを対象として追加させる）
		while (cursor.parent != null) {

			//----------------------------------------------------------------
			// 結合する要素が固定情報の場合、最上位に追加する
			//----------------------------------------------------------------
			if (matchedTree.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_STATIC) {
				while (cursor.parent != null) {
					cursor = cursor.parent;
				}
				break;
			}

			//----------------------------------------------------------------
			// マッチャIDが同じ場合は、一部のマッチャを除いて、親要素とはなりえない（同列の兄弟要素）ので、
			// 自身から親方向に同一のマッチャIDがある場合、
			// その要素の親要素にカーソルを変更して、break する
			// （兄弟として追加させる）
			//----------------------------------------------------------------
			cursorWork = cursor;
			while (cursorWork != null) {

				// キャストループ実行回数をインクリメント
				castLoopCount++;

				// 最上位要素に到達した場合、問題なし
				if (cursorWork.parent == null) {
					cursorWork = null;
					break;
				}

				// IDが異なる場合、次の親へ
				if (cursorWork.refMatcher.id != matchedTree.refMatcher.id) {
					cursorWork = cursorWork.parent;
					continue;
				}

				// ここに来たら、同一ID

				// 同一IDの階層構造が許容されるマッチャ
				switch (matchedTree.refMatcher.id) {

				// アイテム精錬値条件、スキル習得条件
				case MIG_RRTSRC_CONDITION_MATCHER_ITEM_REFINED:
				case MIG_RRTSRC_CONDITION_MATCHER_ITEM_REFINED_OLD:
				case MIG_RRTSRC_CONDITION_MATCHER_ITEM_EQUIP_REGION_REFINED:
				case MIG_RRTSRC_CONDITION_MATCHER_ITEM_TYPE_REFINED:
				case MIG_RRTSRC_CONDITION_MATCHER_LEARNED:
				case MIG_RRTSRC_CONDITION_MATCHER_LEARNED_LEVEL:

					// 対象アイテムが、明確に指定されている場合
					if (matchedTree.value[0].value[0].value !== undefined) {

						// cursorWork より親に、対象アイテムが明確に指定されているものが存在しないかチェック
						cursorWorkParent = cursorWork;
						while (cursorWorkParent != null) {

							// 最上位要素に到達した場合、問題なし
							if (cursorWorkParent.parent == null) {
								cursorWorkParent = null;
								break;
							}

							// IDが異なる場合、次の親へ
							if (cursorWorkParent.refMatcher.id != matchedTree.refMatcher.id) {
								cursorWorkParent = cursorWorkParent.parent;
								continue;
							}

							// 明確に指定されているものが見つかった場合
							if (cursorWorkParent.value[0].value[0].value !== undefined) {

								// 指定が一致する場合は、その要素をカーソルにして、処理打ち切り
								if (cursorWorkParent.value[0].value[0].value ==  matchedTree.value[0].value[0].value) {
									cursorWork = cursorWorkParent;
									break;
								}
								else if (IsEqualArrayItems(cursorWorkParent.value[0].value[0].value, matchedTree.value[0].value[0].value, false, false)) {
									cursorWork = cursorWorkParent;
									break;
								}
							}

							// ここに来たら、次へ
							cursorWorkParent = cursorWorkParent.parent;
						}

						// 同一条件がなかった場合は、許容する
						if (cursorWorkParent == null) {
							cursorWork = cursorWork.parent;
							continue;
						}
					}

					// 対象アイテムが、暗黙の参照範囲で指定されている場合
					else {

						// cursorWork より親に、対象アイテムが暗黙の参照範囲で指定されているものが存在しないかチェック
						cursorWorkParent = cursorWork;
						while (cursorWorkParent != null) {

							// 最上位要素に到達した場合、問題なし
							if (cursorWorkParent.parent == null) {
								cursorWorkParent = null;
								break;
							}

							// IDが異なる場合、次の親へ
							if (cursorWorkParent.refMatcher.id != matchedTree.refMatcher.id) {
								cursorWorkParent = cursorWorkParent.parent;
								continue;
							}

							// 明確なアイテム指定でも、暗黙の参照範囲指定でも、IDが同一の時点で、その要素をカーソルにして、処理打ち切り
							cursorWork = cursorWorkParent;
							break;
						}

						// 同一条件がなかった場合は、許容する
						if (cursorWorkParent == null) {
							cursorWork = cursorWork.parent;
							continue;
						}
					}

					// ここに来るならば問題あり

					// 親要素にカーソルを変更して、break する
					cursorWork = cursorWork.parent;
					break;

				// TODO: これも対応が必要なはずだが、とりあえず未対応
				case MIG_RRTSRC_CONDITION_MATCHER_LEARNED_LEVEL_V2:
					// ここに来るならば問題あり

					// 親要素にカーソルを変更して、break する
					cursorWork = cursorWork.parent;
					break;

				// エンチャントリストの装備対象アイテム条件、または、エンチャントリストのスロット条件
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_TARGET_LIST:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE_V2:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_ENCHANT:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V2:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V3:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V4:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SELECT:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_SLOT_ENCHANT:

					// 連続したデータの場合、後続の特殊処理でデータをマージするので、ここでカーソルを調整して break する
					if (castLoopCount == 1) {
						cursor = cursorWork;
						cursorWork = null;
					}

					// そうでない場合、カーソルを親にして処理打ち切り
					else {
						cursorWork = cursorWork.parent;
						break;
					}
					break;

				// 上記以外は許容されないので、カーソルを親にして処理打ち切り
				default:
					cursorWork = cursorWork.parent;
					break;

				}

				// ここに来るならば、ループ打ち切り
				break;
			}
			if (cursorWork != null) {
				cursor = cursorWork;
				break;
			}

			// ここに来るならば、マッチャIDは問題なし

			//----------------------------------------------------------------
			// カーソルのマッチャIDが、SP効果の場合
			//----------------------------------------------------------------
			if (cursor.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_EFFECT) {

				// カーソルを親要素に上げて、continue する
				// （親要素を対象として、ループで再度判定させる）
				cursor = cursor.parent;

				continue;
			}

			//----------------------------------------------------------------
			// 結合するマッチャIDが、時限効果に関するもの（期間指定）の場合、
			// 追加しようとしているカーソルの、包含されるSPが、SP条件（時限効果）でなければ、
			// SP条件（時限効果）の matchedTree を生成して、ツリーに追加する
			// （最終的なアイテムデータのツリーが、処理しづらい形になるのを防ぐため）
			//----------------------------------------------------------------
			switch (matchedTree.refMatcher.id) {

			// 期間指定の場合
			case MIG_RRTSRC_ATTRIBUTE_MATCHER_SPAN:

				// 確定で時限効果に関するものなので、状況に応じて時限効果のSP条件を追加する
				// 確率指定も時限効果の発動に関するものだが、
				// オートスペルなどの場合にも使われるため、処理としては、期間指定でのみ行う

				// 包含するSPの検査
				cursorWork = cursor;
				while (cursorWork != null) {

					// 最上位要素に到達した場合、問題あり
					if (cursorWork.parent == null) {
						cursorWork = null;
						break;
					}

					// SP効果に包含される場合
					else if (cursorWork.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_EFFECT) {

						// 無条件で、問題あり
						cursorWork = null;
						break;
					}

					// SP条件に包含される場合は、
					else if (cursorWork.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_CONDITION) {

						// SP条件（時限効果）以外の場合、問題あり
						if (cursorWork.refMatcher.id != MIG_RRTSRC_CONDITION_MATCHER_TIME_EFFECT) {
							cursorWork = null;
						}
						break;
					}

					// 上記以外は、さらに親の要素で判定する
					else {
						cursorWork = cursorWork.parent;
					}
				}

				// 包含するSPの検査結果が、問題ありだった場合
				if (cursorWork == null) {

					// SP条件（時限効果）の matchedTree を生成
					matchedTreeWork = new CMigRrtSrcMatchedTree();
					matchedTreeWork.refMatcher = g_MigRrtSrcMatcherLibrary.Get(MIG_RRTSRC_CONDITION_MATCHER_TIME_EFFECT);

					// カーソルに、生成したSP条件（時限効果）の matchedTree を追加し、
					// その戻り値（すなわち、時限効果の matchedTree）を、カーソルにする
					// なお、カーソルがSP属性だった場合、ここまでに登録された属性は、
					// 処理の過程ですべて適切な matchedTree に移動される
					cursor = cursor.JoinTree(matchedTreeWork, castLoopCount);
				}

				// 問題がなかった場合は、見つかった包含するSPをカーソルにする
				else {
					cursor = cursorWork;
				}

				// 結合する要素の全ての子要素を、特定したカーソルに結合する
				if (Array.isArray(matchedTree.value)) {
					for (idx = 0; idx < matchedTree.value.length; idx++) {
						// 包含SPを戻り値にしたいので、ここでは cursor を更新しない
						cursor.JoinTree(matchedTree.value[idx], castLoopCount);
					}
				}

				// カーソルを返す（この時点で処理打ち切り）
				return cursor;

			}

			//----------------------------------------------------------------
			// カーソルのマッチャIDが、SP属性の場合
			//
			// SP属性は、子要素のSPIDを修飾するものなので、
			// 子要素のSPIDをメインにしたmatchedTreeにAddAttributeする形式に加工する
			// 例えば、RRTSRC を解析しただけだと、
			// 上位にスキル名のSP属性、下位にダメージ増加のSP効果となるが、
			// これを、ダメージ増加のSP効果に、スキル名のSP属性の AddAttribute() をマージした、ひとつのSP効果にする
			// （RRTSRCのテキストでは、『スキル○○で』『与えるダメージ＋△△％』となっているため、前述の上下関係になる）
			//----------------------------------------------------------------
			if (cursor.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_ATTRIBUTE) {

				// 結合する要素の種別が、SP属性の場合
				if (matchedTree.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_ATTRIBUTE) {

					// カーソルの子要素配列に、結合する要素の子要素配列をマージする
					// すなわち、カーソルと結合する要素をまとめて、ひとつの要素にしてしまう

					// 結合する要素の全ての子要素の親要素を、カーソルにする
					if (Array.isArray(matchedTree.value)) {
						for (idx = 0; idx < matchedTree.value.length; idx++) {
							matchedTree.value[idx].parent = cursor;
						}
					}

					// 結合する要素を、カーソルの要素にマージする
					if (matchedTree.value) {
						Array.prototype.push.apply(cursor.value, matchedTree.value);
					}

					// 念のため、結合する要素をクリア
					matchedTree.Clear();

					// カーソルを返す（この時点で処理打ち切り）
					return cursor;
				}

				// 結合する要素の種別が、SP効果 or SP条件の場合
				if ((matchedTree.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_EFFECT)
					|| (matchedTree.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_CONDITION)) {

					// カーソルの子要素配列に、結合する要素の子要素配列をマージするだけでなく、
					// カーソルのマッチャ参照を、結合する要素のマッチャ参照に書き換える
					// これにより、カーソルのマッチャIDが、結合する要素のマッチャID、
					// つまり、SP効果やSP条件のマッチャIDとなるので、
					// 結果として、ツリーの親子関係を入れ替えるような処理となる

					// 結合する要素の全ての子要素の親要素を、カーソルにする
					if (Array.isArray(matchedTree.value)) {
						for (idx = 0; idx < matchedTree.value.length; idx++) {
							matchedTree.value[idx].parent = cursor;
						}
					}

					// 結合する要素を、カーソルの要素にマージする
					if (matchedTree.value) {
						Array.prototype.push.apply(cursor.value, matchedTree.value);
					}

					// カーソルのマッチャ参照を上書き
					cursor.refMatcher = matchedTree.refMatcher;

					// 念のため、結合する要素をクリア
					matchedTree.Clear();

					// カーソルを返す（この時点で処理打ち切り）
					return cursor;
				}
			}

			//----------------------------------------------------------------
			// 結合するマッチャIDが、エンチャントリストの対象アイテムの場合
			//
			// 既存の親要素が同一SPIDの場合は、それに対してAddAttributeする形式に加工する
			//----------------------------------------------------------------
			if (matchedTree.refMatcher.id == MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_TARGET_LIST) {
				if (cursor.refMatcher.id == matchedTree.refMatcher.id) {

					// カーソルの子要素配列に、結合する要素の子要素配列をマージする
					// すなわち、カーソルと結合する要素をまとめて、ひとつの要素にしてしまう

					// 結合する要素の全ての子要素の親要素を、カーソルにする
					if (Array.isArray(matchedTree.value)) {
						for (idx = 0; idx < matchedTree.value.length; idx++) {
							matchedTree.value[idx].parent = cursor;
						}
					}

					// 結合する要素を、カーソルの要素にマージする
					if (matchedTree.value) {
						Array.prototype.push.apply(cursor.value, matchedTree.value);
					}

					// 念のため、結合する要素をクリア
					matchedTree.Clear();

					// カーソルを返す（この時点で処理打ち切り）
					return cursor;
				}
			}

			//----------------------------------------------------------------
			// 結合するマッチャIDが、エンチャントリストのスロット条件の場合
			//
			// 既存の親要素が同一SPIDの場合は、それに対してAddAttributeする形式に加工する
			//----------------------------------------------------------------
			if (cursor.refMatcher.id == matchedTree.refMatcher.id) {

				switch (matchedTree.refMatcher.id) {

				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE_V2:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_ENCHANT:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V2:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V3:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V4:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SELECT:
				case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_SLOT_ENCHANT:

					// カーソルの子要素配列に、結合する要素の子要素配列をマージする
					// すなわち、カーソルと結合する要素をまとめて、ひとつの要素にしてしまう

					// 結合する要素の全ての子要素の親要素を、カーソルにする
					if (Array.isArray(matchedTree.value)) {
						for (idx = 0; idx < matchedTree.value.length; idx++) {
							matchedTree.value[idx].parent = cursor;
						}
					}

					// 結合する要素を、カーソルの要素にマージする
					if (matchedTree.value) {
						Array.prototype.push.apply(cursor.value, matchedTree.value);
					}

					// 念のため、結合する要素をクリア
					matchedTree.Clear();

					// カーソルを返す（この時点で処理打ち切り）
					return cursor;
				}
			}

			//----------------------------------------------------------------
			// そのカーソルを対象として、追加させる
			//----------------------------------------------------------------
			break;
		}

		// 子要素として追加する
		if (cursor.value === null) {
			cursor.value = [];
		}
		cursor.value.push(matchedTree);

		// 子要素の親も設定する
		matchedTree.parent = cursor;

		return (toReturnObject ? toReturnObject : matchedTree);
	};



	/**
	 * マッチツリーを複製する.
	 */
	this.Clone = function () {

		var parentTree = null;

		// 親要素が存在する場合
		if (this.parent != null) {

			// 親たどって、そこを起点に複製
			parentTree = this.parent.Clone();

			// 元のツリーから、自身が親の何番目の子要素かを特定し、
			// 複製後のツリーの該当番目の要素を返す
			return parentTree.value[this.parent.value.indexOf(this)];
		}

		// 親要素が存在しな場合は、自身を起点に、子要素を全複製して返す
		return this.CloneSub(null);
	};

	/**
	 * マッチツリーを複製する（サブ関数）.
	 * @param parent 親要素
	 */
	this.CloneSub = function (parent) {

		var idx = 0;

		var clonedTree = null;

		clonedTree = new CMigRrtSrcMatchedTree();
		clonedTree.refMatcher = this.refMatcher;
		clonedTree.parent = parent;

		if (!this.IsLeafElement()) {

			clonedTree.value = [];

			for (idx = 0; idx < this.value.length; idx++) {
				clonedTree.value.push(this.value[idx].CloneSub(clonedTree));
			}
		}

		else {
			clonedTree.value = this.value;
		}

		return clonedTree;
	};



	// TODO: デバッグ用
	// テキスト配列の出力
	this.toStringArray = function (indentCount) {

		var idx = 0;

		var stringArray = null;

		stringArray = [];

		// 葉要素の出力
		if (this.IsLeafElement()) {
			stringArray.push("\t".repeat(indentCount) + EnumMigRrtSrcMatcherId.GetDefinedName(this.refMatcher.id) + " = " + this.value);
		}

		// 枝要素の出力
		else {

			stringArray.push("\t".repeat(indentCount) + EnumMigRrtSrcMatcherId.GetDefinedName(this.refMatcher.id));

			for (idx = 0; idx < this.value.length; idx++) {
				stringArray = stringArray.concat(this.value[idx].toStringArray(indentCount + 1));
			}
		}

		return stringArray;
	};























	//================================================================================================================================
	//
	//
	// ツリーの正規化　関連関数
	//
	//
	//================================================================================================================================

	// 解析中において、MatchedTree は、this.JoinTree() 関数により、子要素となる MatchedTree を追加することで構築されていく。
	// 平易な説明文であれば、これだけで問題ないが、中には次のような『複数のSP効果を修飾するSP属性』を示す文章が存在する場合がある
	//
	// 例１）インペリアルアニマルローブ
	// 　　[生命の魂]Lv1
	// 　　習得時、追加で
	// 　　[警戒]使用時、
	// 　　15秒間、							←この『15秒間』は、
	// 　　物理攻撃時、						←ここから３行で示される効果と、
	// 　　全ての属性のモンスターに
	// 　　与えるダメージ + 20%
	// 　　[猪突猛進]状態になる				←この１行で示される効果の両方にかかる
	//
	// 例２）失望の思念体シューズ
	// 　　[失望の思念体シューズ]の
	// 　　精錬値が7以上の時、追加で
	// 　　魔法攻撃時、						←この『魔法攻撃時』は、
	// 　　不死・悪魔形モンスターに			←ここから２行で示される効果と、
	// 　　与えるダメージ + 15%
	// 　　闇・不死属性モンスターに			←ここから２行で示される効果の両方にかかる
	// 　　与えるダメージ + 15%
	//
	// これらについて、SP属性の文章が出現した時点で、複数を修飾しているかどうかは判別できない。
	//
	// また、例２のようなケースから、『魔法攻撃時』系のSP属性が、複数のSP効果を修飾する可能性があることが分かる。
	// これを踏まえると、例１のケースでは、少なくとも、『15秒間』、『物理攻撃時』が、複数のSP効果を修飾する可能性があること考えられるが、
	// 実際には、このケースでは『物理攻撃時』は『[猪突猛進]状態になる』を修飾しない。
	//
	// これはSP属性ごとに自明な規則があるわけではなく、前後の文章によって決定される。
	// 具体例でいえば、例１の文章のみで判断すると、次のどちらの仕様でも誤りはないように感じられる。
	// 　Ａ）『[警戒]使用時』に、『15秒間』、『[猪突猛進]状態になる』
	// 　Ｂ）『[警戒]使用時』に、『15秒間』、『物理攻撃時』、『[猪突猛進]状態になる』
	// この具体例では、要するに『[猪突猛進]状態になる』トリガーが、『[警戒]使用時』なのか、『物理攻撃時』なのかということだが、
	// これを適切に判断するには、文章だけではなく、SP効果等の仕様についての理解が必要となる。
	//
	// 例えば、今の例でいえば、『[猪突猛進]状態になる』は、『バフを付与するSP効果』であるが、
	// ゲームの仕様上、『永続するバフは存在しない』という仕様がある。
	// さらに、アイテムの説明文の仕様上、『トリガー』、『確率』、『時間』、『バフ』の順で記述される規則がある（と思われる）。
	// そのため、前述のＢの仕様で理解しようとすると、『物理攻撃時』というトリガーの後に、『確率』と『時間』の記述がないことになる。
	// このような点から総合的に判断して、先の例では、Ａの仕様であろうと判断することが可能となる。
	// （あくまでも、その可能性が高いという判断）
	//
	// そのような、規則性に基づいた判断で、SP属性の記述の不足分を追記するのが、当該処理の目的である
	// 処理の仕方については、おおよそ次のような流れになる。
	// 　１）検査対象の MatchedTree が、最上位要素の場合、処理不要
	// 　１）検査対象の MatchedTree の value が配列でない（子要素がない）場合、
	// 　２）value が示す配列の長さが２以上（兄弟要素がある）場合にのみ処理する
	//
	// また、この他にも、『暗黙の修飾範囲』が存在するケースもある。
	//
	// 例３）エリュマントスの皮
	// 　　[エリュマントスの皮]の
	// 　　精錬値が9以上の時、追加で
	// 　　MaxHP + 10%
	// 　　物理攻撃で						←ここから２行で示される『物理攻撃でモンスターを倒した時』は、
	// 　　モンスターを倒した時、
	// 　　SP + 10							←この１行で示される効果には、かかる
	// 　　物理攻撃時、						←ここから３行で示される効果には、かからない
	// 　　小・中・大型モンスターに
	// 　　与えるダメージ + 10%
	//
	// これもやはり、SP効果等の仕様の理解を用いて判断する必要があるため、このタイミングで補正する。
	//
	// 『暗黙の修飾範囲』には、別のケースも存在する。
	//
	// 例４）ヒュッケの服
	// 　　[ヒュッケの服]の					←ここから１行で示される『精錬値の判定に使用するアイテムの名称』は、
	// 　　精錬値が5以上の時、追加で		←この１行で示されるSP条件を、修飾する
	// 　　クリティカル攻撃で与える
	// 　　ダメージ + 4%
	// 　　精錬値が7以上の時、追加で		←この１行で示されるSP条件も、同様に修飾する
	// 　　クリティカル攻撃で与える
	// 　　ダメージ + 6%
	//
	// このケースでは、『あるSP条件に必須のSP属性が存在しない』場合において、
	// 『直前の、同一のSP条件にある、存在しなかったSP属性』を複製することで、補正が可能となる。

	/**
	 * マッチツリーのデータを正規化する.
	 * @param dataId データID（パース内容の補正に使用）
	 * @param itemName アイテム名（エラーログ表示用）
	 */
	this.Normalize = function (dataId, itemName) {

		// 『複数のSP効果を修飾するSP属性』の正規化
		this.NormalizeSubMultiple(dataId, itemName);

		// 『暗黙の修飾範囲』の正規化
		this.NormalizeSubImpicity(dataId, itemName);
	};

	/**
	 * マッチツリーのデータを正規化する.
	 * @param dataId データID（パース内容の補正に使用）
	 * @param itemName アイテム名（エラーログ表示用）
	 */
	this.NormalizeSubMultiple = function (dataId, itemName) {

		var idx = 0;

		// 子要素がない場合は、処理なし
		if (!Array.isArray(this.value)) {
			return;
		}

		// 最上位要素でなければ、正規化を行う
		if (this.parent != null) {

			// 『複数のSP効果を修飾するSP属性』の正規化の対象となるのは、『子要素のうち、連続しているSP効果』となる
			// （SP条件は、１個ずつ階層構造をとるので考慮不要）
			// （SP属性は、JoinTree() の時点で、SP効果の子要素に補正済み）

			// 連続していることが条件なので、最後の一つ手前までをループ
			for (idx = 0; idx < this.value.length - 1; idx++) {

				// 前側がSP効果でなければ、次へ
				if (this.value[idx].refMatcher.kind != MIG_RRTSRC_MATCHER_KIND_EFFECT) {
					continue;
				}

				// 後ろ側がSP効果でなければ、次へ
				if (this.value[idx + 1].refMatcher.kind != MIG_RRTSRC_MATCHER_KIND_EFFECT) {
					continue;
				}

				// ここに来るならば、連続しているSP効果

				// 処理用の関数呼び出し
				this.NormalizeSubMultipleCore(dataId, itemName, this.value[idx], this.value[idx + 1]);
			}
		}

		// 全ての子要素を正規化
		for (idx = 0; idx < this.value.length; idx++) {
			this.value[idx].NormalizeSubMultiple(dataId, itemName);
		}
	};

	/**
	 * マッチツリーのデータを正規化する（『複数のSP効果を修飾するSP属性』　処理本体）.
	 * @param dataId データID（パース内容の補正に使用）
	 * @param itemName アイテム名（エラーログ表示用）
	 * @param matchedTreeFore 前要素
	 * @param matchedTreeBack 後ろ要素
	 */
	this.NormalizeSubMultipleCore = function (dataId, itemName, matchedTreeFore, matchedTreeBack) {

		var idxFore = 0;
		var idxBack = 0;

		var matchedTreeWork = null;

		var candidateArrayFore = null;
		var extraArrayBack = null;

		var bTriggerFore = false;
		var bTriggerBack = false;
		var bProbFore = false;
		var bProbBack = false;
		var bSpanFore = false;
		var bSpanBack = false;



		// 後ろ側のマッチャＩＤごとに、個別の処理を行う
		switch (matchedTreeBack.refMatcher.id) {

		// 与えるダメージ
		case MIG_RRTSRC_EFFECT_MATCHER_ATTACK_DAMAGE:

			// 前側の MatchedTree のトリガデータを取得
			extraArrayBack = [];

			for (idxFore = 0; idxFore < matchedTreeFore.value.length; idxFore++) {
				if (matchedTreeFore.value[idxFore].refMatcher.id == MIG_RRTSRC_DATA_MATCHER_TRIGGER) {
					extraArrayBack.push(matchedTreeFore.value[idxFore]);
					break;
				}
			}

			// 後ろ側の MatchedTree に、トリガデータがない場合、前側からコピーする
			if (Array.isArray(matchedTreeBack.value)) {
				for (idxBack = 0; idxBack < matchedTreeBack.value.length; idxBack++) {
					if (matchedTreeBack.value[idxBack].refMatcher.id == MIG_RRTSRC_DATA_MATCHER_TRIGGER) {
						break;
					}
				}
				if (idxBack >= matchedTreeBack.value.length) {
					Array.prototype.unshift.apply(matchedTreeBack.value, extraArrayBack);
				}
			}

			break;

		// バフ付与効果
		case MIG_RRTSRC_EFFECT_MATCHER_BUFF:

			// 前側のSP効果に適用されているSP属性を『逆順』で走査し、所定のフォーマットを満たしているものだけ適用する
			// （所定のフォーマットとは、前から順に、『トリガー』、『確率』、『時間』、『バフ』の順で記述される規則を指す）

			candidateArrayFore = [];
			extraArrayBack = [];

			bTriggerFore = false;
			bTriggerBack = false;
			bProbFore = false;
			bProbBack = false;
			bSpanFore = false;
			bSpanBack = false;

			// 後ろ側の MatchedTree で、すでに指定されているSP属性を、逆順でチェックする
			if (Array.isArray(matchedTreeBack.value)) {
				for (idxBack = matchedTreeBack.value.length - 1; idxBack >= 0; idxBack--) {

					matchedTreeWork = matchedTreeBack.value[idxBack];

					// 必須要素が存在しない場合は、出るまでその要素を探す
					// 見つかったら、フラグを立てて、次の要素に移る
					// トリガーについては、CONDITION として指定される場合もあるので、
					// 必須性はチェックせず、有無だけ確認する
					if (!bSpanBack) {
						bSpanBack |= (matchedTreeWork.refMatcher.id == MIG_RRTSRC_DATA_MATCHER_SPAN);
					}
					else if (!bProbBack) {
						bProbBack |= (matchedTreeWork.refMatcher.id == MIG_RRTSRC_DATA_MATCHER_PROB);
					}

					// 全ての必須要素が見つかっている場合は、後ろ側の任意配列に、前から追加する
					else {
						bTriggerBack |= (matchedTreeWork.refMatcher.id == MIG_RRTSRC_DATA_MATCHER_TRIGGER);
						extraArrayBack.unshift(matchedTreeWork);
					}
				}
			}

			// 前側の MatchedTree で指定されているSP属性を、逆順でチェックする
			if (Array.isArray(matchedTreeFore.value)) {
				for (idxFore = matchedTreeFore.value.length - 1; idxFore >= 0; idxFore--) {

					matchedTreeWork = matchedTreeFore.value[idxFore];

					// SP属性を検査し、対応するフラグが立っている場合は、追加候補配列をクリアして、次の処理へ
					// （対応するフラグが立っているということは、後ろ側の MatchedTree に指定が存在するということなので、
					// 　前側から追加することはできず、同時に、それより後ろのSP属性も追加できない）
					switch (matchedTreeWork.refMatcher.id) {

					case MIG_RRTSRC_DATA_MATCHER_SPAN:
						// 同要素の指定がある場合は、追加不可
						if (bSpanBack || bSpanFore) {
							candidateArrayFore = [];
							continue;
						}
						bSpanFore = true;
						break;

					case MIG_RRTSRC_DATA_MATCHER_PROB:
						// 期間の指定が見つかっていない場合、または、同要素の指定がある場合は、追加不可
						if (((!bSpanBack) && (!bSpanFore)) || (bProbBack || bProbFore)) {
							candidateArrayFore = [];
							continue;
						}
						bProbFore = true;
						break;

					case MIG_RRTSRC_DATA_MATCHER_TRIGGER:
						// 確率の指定が見つかっていない場合、または、同要素の指定がある場合は、追加不可
						if (((!bProbBack) && (!bProbFore)) || (bTriggerBack || bTriggerFore)) {
							candidateArrayFore = [];
							continue;
						}
						bTriggerFore = true;
						break;
					}

					// 前側からの追加候補配列に、前から追加する
					candidateArrayFore.unshift(matchedTreeWork);
				}
			}

			// 前側からの追加候補配列がある場合は、後ろ側の MatchedTree の value が示す配列に、前から結合する
			if (candidateArrayFore.length > 0) {

				// 後ろ側の MatchedTree に子要素が存在しない場合は、配列を生成しておく
				if (matchedTreeBack.value == null) {
					matchedTreeBack.value = [];
				}

				// ループして結合
				for (idxFore = candidateArrayFore.length - 1; idxFore >= 0; idxFore--) {
					matchedTreeBack.value.unshift(candidateArrayFore[idxFore].Clone());
				}
			}

			break;

		}

	};

	/**
	 * マッチツリーのデータを正規化する（『暗黙の修飾範囲』　処理本体）.
	 * @param dataId データID（パース内容の補正に使用）
	 * @param itemName アイテム名（エラーログ表示用）
	 */
	this.NormalizeSubImpicity = function (dataId, itemName) {

		var idx = 0;
		var idxList = 0;
		var idxParent = 0;
		var idxThis = 0;
		var ret = null;

		var matcherParent = null;

		var allowList = null;
		var valueList = null;
		var keywordInfo = null;



		// 子要素がない場合は、処理なし
		if (!Array.isArray(this.value)) {
			return;
		}

		// 最上位要素でなければ、正規化を行う
		if (this.parent != null) {

			// 自身のマッチャＩＤで処理分岐
			switch (this.refMatcher.id) {

			// アイテム精錬値条件
			case MIG_RRTSRC_CONDITION_MATCHER_ITEM_REFINED:
			// TODO: おそらく、_OLD系はこの処理は不要（暗黙で自身を参照させるようにするため）
			// case MIG_RRTSRC_CONDITION_MATCHER_ITEM_REFINED_OLD:

				// 対象アイテムが指定されていない場合
				if (this.value[0].value[0].value === undefined) {

					matcherParent = this.parent;

					// 自身の、親要素内でのインデックスを取得
					idxThis = -1;
					for (idxParent = 1; idxParent < matcherParent.value.length; idxParent++) {
						if (matcherParent.value[idxParent] == this) {
							idxThis = idxParent;
							break;
						}
					}

					// 二番目以降の要素のみ補正可能
					idxParent = -1;
					if (idxThis > 0) {

						for (idxParent = idxThis - 1; idxParent >= 0; idxParent--) {

							// 自身より前に、同一のSPIDがあれば、その対象アイテムを複製する
							if (matcherParent.value[idxParent].refMatcher.id == this.refMatcher.id) {
								this.value[0] = matcherParent.value[idxParent].value[0].Clone();
								break;
							}
						}
					}

					// 自身より前に、同一のSPIDがない場合
					if (idxParent < 0) {

						// 引数で渡されているアイテム名をもとに、アイテムデータマッチャでマッチさせる
						ret = g_MigRrtSrcMatcherLibrary.Get(MIG_RRTSRC_DATA_MATCHER_ITEM).Match(itemName);

						// マッチリザルトに含まれるマッチツリーで、対象アイテムがあるべき場所のデータを置き換える
						if (ret) {
							this.value.splice(0, 1, ret.matchedTree);
						}

						// マッチに失敗している場合はエラー処理
						else {
							if (idxThis > 0) {
								WriteConsoleLog("[ " + itemName + "] " + "『暗黙の修飾範囲』の正規化に失敗　case " + EnumMigRrtSrcMatcherId.GetDefinedName(this.refMatcher.id) + " : " + "自身より前に同一SPIDなし（" + "idxThis == " + idxThis + "）");
							}
							else {
								WriteConsoleLog("[ " + itemName + "] " + "『暗黙の修飾範囲』の正規化に失敗　case " + EnumMigRrtSrcMatcherId.GetDefinedName(this.refMatcher.id) + " : " + "自身が補正不能インデックス（" + "idxThis == " + idxThis + "）");
							}
						}
					}
				}

				break;



			// モンスターを倒したとき条件
			case MIG_RRTSRC_CONDITION_MATCHER_KILL:

				allowList = [
					EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_NOWHP),
					EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_NOWSP),
				];

				for (idx = 0; idx < this.value.length; idx++) {

					// SP効果マッチャ以外は許可する（自身の条件に対する属性なので）
					if (this.value[idx].refMatcher.kind != MIG_RRTSRC_MATCHER_KIND_EFFECT) {
						continue;
					}

					// それ以外は、特定のマッチャのみ許可する

					// パラメタ増減SP効果、かつ、パラメタが現在のＨＰ、または、現在のＳＰのみ
					if (this.value[idx].refMatcher.id == MIG_RRTSRC_EFFECT_MATCHER_PARAM) {

						// 所定の value 値がキャプチャされていない場合は、NG
						if (this.value[idx].value[0].value[0].value === undefined) {
							break;
						}

						// キャプチャされたキーワードのリストを、分割する
						valueList = CMigRrtSrcMatcherLibrary.SplitBlockedList(this.value[idx].value[0].value[0].value);

						// すべての要素を処理
						for (idxList = 0; idxList < valueList.length; idxList++) {

							// 括弧をトリミング
							valueTrimed = CMigRrtSrcMatcherLibrary.TrimBlockBrackets(valueList[idxList]);

							if (valueTrimed == "") {
								continue;
							}

							// キーワード情報を取得
							keywordInfo = g_MigRrtSrcKeywordInfoListLibrary.Get(MIG_RRTSRC_KEYWORD_LIST_PARAM).Get(valueTrimed);

							// 該当しない場合は、NG
							if (keywordInfo === undefined) {
								break;
							}

							// 許可されるキーワードのリストになければ、NG
							if (allowList.indexOf(keywordInfo.assignedIdName) < 0) {
								break;
							}
						}

						// 問題なかった場合は、次へ
						if (idxList >= valueList.length) {
							continue;
						}
					}

					// ここに来たらNG
					break;
				}

				// NGの場合
				if (idx < this.value.length) {

					// 該当の子要素を、親の子要素にする
					for (idxParent = 0; idxParent < this.parent.value.length; idxParent++) {

						if (this.parent.value[idxParent] !== this) {
							continue;
						}

						// 親の子要素配列の中で、自身の次の要素として挿入する
						this.parent.value.splice(idxParent + 1, 0, this.value[idx]);

						// 該当の要素の親への参照を書き換える
						this.value[idx].parent = this.parent;

						// 自身の子要素配列から、削除する
						this.value.splice(idx, 1);

						// ループ処理終了
						break;
					}

					// 親でも同様にNGとなる可能性があるため、自身の親に対して、再起呼び出しを行う
					this.parent.NormalizeSubImpicity(dataId, itemName);
				}

				break;
			}
		}

		// 全ての子要素を正規化
		for (idx = 0; idx < this.value.length; idx++) {
			this.value[idx].NormalizeSubImpicity(dataId, itemName);
		}
	};

















	//================================================================================================================================
	//
	//
	// スクリプト配列生成　関連関数
	//
	//
	//================================================================================================================================

	/**
	 * マッチツリーのデータを元に、スクリプトの配列を生成する.
	 * @param indent インデントレベル
	 */
	this.GetScriptArray = function (indent, scriptArrayStatic, scriptArraySP) {

		var idx = 0;

		var scriptArrayStaticLoc = null;
		var scriptArraySPLoc = null;

		scriptArrayStaticLoc = new Array();
		scriptArraySPLoc = new Array();

		// 再起呼び出し
		for (idx = 0; idx < this.value.length; idx++) {

			this.value[idx].GetScriptArrayRecursive(indent + 1, true, scriptArrayStaticLoc, scriptArraySPLoc);

			// SPデータが存在した場合（処理の都合上、この段階で追記する）
			if (scriptArraySPLoc.length > 0) {

				// SPデータ部のオープン
				scriptArraySP.push("\t".repeat(indent) + "." + "AddEquipableSpData" + "(");

				// SPデータ追記
				Array.prototype.push.apply(scriptArraySP, scriptArraySPLoc);

				// SPデータ部のクローズ
				scriptArraySP.push("\t".repeat(indent) + ")");

				scriptArraySPLoc = [];
			}

		}

		// 固定情報が存在した場合
		if (scriptArrayStaticLoc.length > 0) {

			// 固定情報部は SetEquipableStaticData() を使用して、１回だけ設定する構造にしたいので、調整をいれる

			// 初めての固定情報部の場合
			if (scriptArrayStatic.length == 0) {

				// 固定情報部のオープン
				scriptArrayStatic.push("\t".repeat(indent) + "." + "SetEquipableStaticData" + "(");
				scriptArrayStatic.push("\t".repeat(indent + 1) + "new CMigEquipableStaticData()");
			}

			// 初めてではない場合
			else {
				// 追記されている、固定情報部のクローズを、取り除く
				scriptArrayStatic.pop();
			}

			// 固定情報追記
			Array.prototype.push.apply(scriptArrayStatic, scriptArrayStaticLoc);

			// 固定情報部のクローズ
			scriptArrayStatic.push("\t".repeat(indent) + ")");
		}

	};

	/**
	 * マッチツリーのデータを元に、スクリプトの配列を生成する（再起処理関数）.
	 * @param indent インデントレベル
	 */
	this.GetScriptArrayRecursive = function (indent, bTopLevel, scriptArrayStatic, scriptArraySP) {

		var idx = 0;

		var scriptArray = null;

		// マッチャ参照の種類で処理分岐
		switch (this.refMatcher.kind) {

		// SP条件、SP効果、リストデータの場合
		case MIG_RRTSRC_MATCHER_KIND_CONDITION:
		case MIG_RRTSRC_MATCHER_KIND_EFFECT:
		case MIG_RRTSRC_MATCHER_KIND_LIST_DATA:

			// スクリプト配列を用意
			scriptArray = new Array();

			// SPデータ部のオープン
			if (!bTopLevel) {
				scriptArray.push("\t".repeat(indent) + "." + "AddChild" + "(");
				indent++;
			}
			scriptArray.push("\t".repeat(indent) + "new CMigEquipableSpData()");

			// SPIDの追記
			scriptArray.push("\t".repeat(indent) + "." + "SetSpId" + "(" + this.refMatcher.spIdName + ")");

			// 子要素をループして、全てのSPを追記
			if (Array.isArray(this.value)) {
				for (idx = 0; idx < this.value.length; idx++) {
					this.value[idx].GetScriptArrayRecursive(indent, false, scriptArrayStatic, scriptArray);
				}
			}

			// SPデータ部のクローズ
			if (!bTopLevel) {
				indent--;
				scriptArray.push("\t".repeat(indent) + ")");
			}

			// 引数のスクリプト配列へ連結
			Array.prototype.push.apply(scriptArraySP, scriptArray);
			break;

		// 固定情報の場合
		case MIG_RRTSRC_MATCHER_KIND_STATIC:

			// スクリプト配列を用意
			scriptArray = new Array();

			// 子要素をループして、全ての固定情報を追記
			if (Array.isArray(this.value)) {
				for (idx = 0; idx < this.value.length; idx++) {
					this.value[idx].GetScriptArrayRecursive(indent, false, scriptArrayStatic, scriptArray);
				}
			}

			// 引数のスクリプト配列へ連結
			Array.prototype.push.apply(scriptArrayStatic, scriptArray);
			break;

		// その他の場合
		default:
			this.GetScriptArraySub(indent, scriptArraySP);
			break;
		}
	};

	/**
	 * マッチツリーのデータを元に、スクリプトの配列を生成する（データマッチャ用サブ）.
	 * @param indent インデントレベル
	 */
	this.GetScriptArraySub = function (indent, scriptArray) {

		var idx = 0;
		var idxList = 0;
		var ret = null;

		var spidName = "";
		var spidWork = "";
		var valueText = "";
		var valueWork = "";
		var valueList = null;
		var valueTrimed = "";
		var valueId = 0;
		var valueTranslated = "";
		var valueSign = 0;
		var valueDirect = "";
		var value = 0;

		var regLv = new RegExp("Lv(\\d+)", "i");



		// リストタイプ用を呼び出し、処理された場合は終了する
		if (this.GetScriptArraySubList(indent, scriptArray)) {
			return;
		}

		// 固有名詞用を呼び出し、処理された場合は終了する
		if (this.GetScriptArraySubNames(indent, scriptArray)) {
			return;
		}



		switch (this.refMatcher.id) {

		// 整数データ
		case MIG_RRTSRC_DATA_MATCHER_INTEGER:
		case MIG_RRTSRC_DATA_MATCHER_NUMBER:

			// 符号（任意項目）
			valueSign = 1;
			valueText = this.value[0].value;
			if (valueText == "-") {
				valueSign = -1;
			}

			// 値
			valueText = this.value[1].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			// データ変換
			if (this.refMatcher.id == MIG_RRTSRC_DATA_MATCHER_INTEGER) {
				value = Math.floor(value);
			}
			value *= valueSign;

			// 単位（任意項目）
			valueText = this.value[2].value;

			// 単位による値の補正
			switch (valueText) {

			case "秒":
				// ミリ秒単位に補正
				value *= 1000;
			}

			// 変化方向（任意項目）
			valueDirect = "";
			valueDirect = this.value[3].value;
			if (valueDirect) {
				switch ("" + valueDirect) {
				case "減少":
					valueSign *= -1;
					break;
				}
			}

			// 値は SetValue() で個別処理
			scriptArray.push("\t".repeat(indent) + "." + "SetValue" + "(" + value + ")");

			// 単位指定の追加
			switch (valueText) {

			case "%":
				// パーセント指定であることを示すアトリビュートを追加する
				spidWork = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT);
				valueWork = EnumMigValueUnitId.GetDefinedName(MIG_VALUE_UNIT_ID_PERCENT);
				scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidWork + ", " + valueWork + ")");
				break;
			}

			break;

		// 文字列データ
		case MIG_RRTSRC_DATA_MATCHER_STRING:

			value = this.value[0].value;

			// 値は SetValue() で個別処理
			scriptArray.push("\t".repeat(indent) + "." + "SetValue" + "(" + value + ")");
			break;

		// レベルデータ
		case MIG_RRTSRC_DATA_MATCHER_LEVEL:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL);

			// 値
			valueText = this.value[0].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			// レベルデータは AddAttribute()
			scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + spidName + ", " + value + ")");
			break;

		// スロットデータ
		case MIG_RRTSRC_DATA_MATCHER_SLOT:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SLOT);

			// 値
			valueText = this.value[0].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			// スロットデータは AddAttribute()
			scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + spidName + ", " + value + ")");
			break;

		// 確率データ
		case MIG_RRTSRC_DATA_MATCHER_PROB:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB);

			// 値
			valueText = this.value[0].value;
			value = undefined;
			EnumMigProbId.PseudoFor(
				function (idxF, nameF, valueF) {
					if (value !== undefined) {
						return;
					}
					if (valueText == MigGetProbText(valueF)) {
						value = nameF;
					}
				}
			);
			if (value === undefined) {
				value = Number(valueText.replace("%", ""));

				// データチェック（optional 項目への対応）
				if (isNaN(value)) {
					break;
				}

				value *= 10;
			}

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", " + value + ")");

			if (valueText.indexOf("%") >= 0) {
				// パーセント指定であることを示すアトリビュートを追加する
				spidWork = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT);
				valueWork = EnumMigValueUnitId.GetDefinedName(MIG_VALUE_UNIT_ID_PERCENT);
				scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidWork + ", " + valueWork + ")");
			}

			break;

		// 期間データ
		case MIG_RRTSRC_DATA_MATCHER_SPAN:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SPAN);

			// 値
			valueText = this.value[0].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			// ミリ秒単位への変換
			switch (g_MigRrtSrcKeywordInfoListLibrary.GetKeywordIdName(MIG_RRTSRC_KEYWORD_LIST_TIME_UNIT, this.value[1].value)) {
			case EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_HOUR):
				value *= 60;
			case EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_MINUTE):
				value *= 60;
			case EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_SECOND):
				value *= 1000;
				break;
			}

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", " + value + ")");
			break;

		// 間隔データ
		case MIG_RRTSRC_DATA_MATCHER_INTERVAL:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_INTERVAL);

			// 値
			valueText = this.value[0].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			// ミリ秒単位への変換
			switch (g_MigRrtSrcKeywordInfoListLibrary.GetKeywordIdName(MIG_RRTSRC_KEYWORD_LIST_TIME_UNIT, this.value[1].value)) {
			case EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_HOUR):
				value *= 60;
			case EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_MINUTE):
				value *= 60;
			case EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_SECOND):
				value *= 1000;
				break;
			}

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", " + value + ")");
			break;

		// 範囲データ
		case MIG_RRTSRC_DATA_MATCHER_AREA:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_AREA);

			// 値１
			valueText = this.value[0].value;
			value = Number(valueText);

			scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + spidName + ", " + value + ")");

			// 値２
			valueText = this.value[1].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(valueText)) {
				break;
			}

			scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + spidName + ", " + valueText + ")");

			break;

		// 整数系固定情報データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_WEAPON_LEVEL:
		// スロットは出力しない（名称から切り出す）
		// case MIG_RRTSRC_DATA_MATCHER_STATIC_SLOT:
		case MIG_RRTSRC_DATA_MATCHER_STATIC_ATK:
		case MIG_RRTSRC_DATA_MATCHER_STATIC_MATK:
		case MIG_RRTSRC_DATA_MATCHER_STATIC_DEF:
		case MIG_RRTSRC_DATA_MATCHER_STATIC_MDEF:
		case MIG_RRTSRC_DATA_MATCHER_STATIC_REQUIRED_LEVEL:

			// SPID定義名
			spidName = this.parent.refMatcher.spIdName;

			// 値
			valueText = this.value[0].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			// データ型変換
			value = Math.floor(value);

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", " + value + ")");
			break;

		// 小数許容固定情報データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_WEIGHT:

			// SPID定義名
			spidName = this.parent.refMatcher.spIdName;

			// 値（誤差回避のため、文字列として定義する）
			valueText = this.value[0].value;

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", \"" + valueText + "\")");
			break;


		// 境界値基準データ
		case MIG_RRTSRC_DATA_MATCHER_BORDER_BASE:

			// SPID定義名
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);

			// 値
			valueText = this.value[0].value;
			value = Number(valueText);

			// データチェック（optional 項目への対応）
			if (isNaN(value)) {
				break;
			}

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", " + value + ")");
			break;

		// スキル名＆レベルデータ
		case MIG_RRTSRC_DATA_MATCHER_SKILL_AND_LV:

			// リスト文字列を分割
			valueText = this.value[0].value;
			valueList = CMigRrtSrcMatcherLibrary.SplitBlockedList(valueText);

			// すべての要素を処理
			for (idxList = 0; idxList < valueList.length; idxList++) {

				// 括弧をトリミング
				valueTrimed = CMigRrtSrcMatcherLibrary.TrimBlockBrackets(valueList[idxList]);

				if (valueTrimed == "") {
					continue;
				}

				ret = regLv.exec(valueTrimed);

				// レベル指定の場合
				if (ret) {

					// レベルデータは AddAttribute()
					spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL);
					scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + spidName + ", " + ret[1] + ")");
				}

				// スキル指定の場合
				else {
					// スキル定義名を取得する
					valueId = g_skillManager.GetSkillIdByName(valueTrimed);
					valueTranslated = EnumSkillId.GetDefinedName(valueId);

					// スキルデータは AddAttribute()
					spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL);
					scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + spidName + ", " + valueTranslated + ")");
				}
			}
			break;

		// 精錬値条件（旧）
		case MIG_RRTSRC_CONDITION_MATCHER_ITEM_REFINED_OLD:

			// 境界条件を 1 に設定する（暗黙の表現）
			spidName = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);

			scriptArray.push("\t".repeat(indent) + "." + "SetAttribute" + "(" + spidName + ", " + "1" + ")");

			break;

		}
	};

	/**
	 * マッチツリーのデータを元に、スクリプトの配列を生成する（データマッチャ用サブ　リストタイプ用）.
	 * @param indent インデントレベル
	 */
	this.GetScriptArraySubList = function (indent, scriptArray) {

		var refThis = this;

		var funcCallSubSetAttribute = function (listTypeF, spidF, valueTextF) {
			refThis.GetScriptArraySubListCore(indent, scriptArray, listTypeF, "SetAttribute", spidF, valueTextF);
		};

		var funcCallSubAddAttribute = function (listTypeF, spidF, valueTextF) {
			refThis.GetScriptArraySubListCore(indent, scriptArray, listTypeF, "AddAttribute", spidF, valueTextF);
		};



		// 該当するマッチャＩＤのみ、処理用の値を設定する
		switch (this.refMatcher.id) {

		// パラメタ名データ
		case MIG_RRTSRC_DATA_MATCHER_PARAM:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_PARAM, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, this.value[0].value);
			break;

		// トリガデータ
		case MIG_RRTSRC_DATA_MATCHER_TRIGGER:
			if (this.value[0].value !== undefined) {
				funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_METHOD, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, this.value[0].value);
			}
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_TIMING, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, this.value[1].value);
			break;

		// 状態名データ
		case MIG_RRTSRC_DATA_MATCHER_STATE:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_STATE, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, this.value[0].value);
			break;

		// バフ名データ
		case MIG_RRTSRC_DATA_MATCHER_BUFF:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_BUFF, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BUFF, this.value[0].value);
			break;

		// 完全状態耐性名データ
		case MIG_RRTSRC_DATA_MATCHER_STATELESS:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_STATE, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, this.value[0].value);
			scriptArray.push("\t".repeat(indent) + "." + "SetValue" + "(100)");
			break;

		// 職業名データ
		case MIG_RRTSRC_DATA_MATCHER_JOB:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_JOB, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_JOB, this.value[0].value);
			break;

		// 職業系列名データ
		case MIG_RRTSRC_DATA_MATCHER_JOB_SERIES:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_JOB_SERIES, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_JOB_SERIES, this.value[0].value);
			break;

		// 装備職業名データ
		case MIG_RRTSRC_DATA_MATCHER_EQUIPPING_JOB:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_JOB_SERIES, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_JOB_SERIES, this.value[0].value);
			break;

		// アイテム装備領域データ
		case MIG_RRTSRC_DATA_MATCHER_ITEM_EQUIP_REGION:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_ITEM_EQUIP_REGION, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_EQUIP_REGION, this.value[0].value);
			break;

		// アイテム系列データ
		case MIG_RRTSRC_DATA_MATCHER_ITEM_TYPE:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_ITEM_TYPE, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_TYPE, this.value[0].value);
			break;

		// 対象名データ
		case MIG_RRTSRC_DATA_MATCHER_TARGET:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_TARGET, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, this.value[0].value);
			break;

		// 種族名データ
		case MIG_RRTSRC_DATA_MATCHER_RACE:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_RACE, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, this.value[0].value);
			break;

		// 属性名データ
		case MIG_RRTSRC_DATA_MATCHER_ELEMENT:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_ELM, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT, this.value[0].value);
			break;

		// 属性モンスター名データ
		case MIG_RRTSRC_DATA_MATCHER_ELEMENT_MONSTER:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_ELM, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, this.value[0].value);
			break;

		// 属性攻撃名データ
		case MIG_RRTSRC_DATA_MATCHER_ELEMENT_ATTACK:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_ELM, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_ATTACK, this.value[0].value);
			break;

		// 属性魔法名データ
		case MIG_RRTSRC_DATA_MATCHER_ELEMENT_MAGIC:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_ELM, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MAGICAL, this.value[0].value);
			break;

		// サイズ名データ
		case MIG_RRTSRC_DATA_MATCHER_SIZE:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_SIZE, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SIZE, this.value[0].value);
			break;

		// ボス属性名データ
		case MIG_RRTSRC_DATA_MATCHER_BOSS:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_BOSS, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BOSS, this.value[0].value);
			break;

		// プレイヤー属性名データ
		case MIG_RRTSRC_DATA_MATCHER_PLAYER:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_PLAYER, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PLAYER, this.value[0].value);
			break;

		// 境界フラグデータ（択一なので SetAttribute() を使用する）
		case MIG_RRTSRC_DATA_MATCHER_BORDER_FLAG:
			funcCallSubSetAttribute(MIG_RRTSRC_KEYWORD_LIST_BORDER_FLAG, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, this.value[0].value);
			break;

		// 純粋なパラメタ名データ
		case MIG_RRTSRC_DATA_MATCHER_PURE_PARAM:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_PARAM, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, this.value[0].value);
			break;

		// 打ち消し効果データ
		case MIG_RRTSRC_DATA_MATCHER_CANCEL_EFFECT:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_CANCEL_EFFECT, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CANCEL_EFFECT_SPID, this.value[0].value);
			break;

		// 効果未適用対象データ
		case MIG_RRTSRC_DATA_MATCHER_DISEFFECT_TARGET:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_DISEFFECT_TARGET, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_DISEFFECT_TARGET, this.value[0].value);
			break;

		// 固定情報（系列）データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_TYPE:
			funcCallSubSetAttribute(MIG_RRTSRC_KEYWORD_LIST_STATIC_TYPE, MIG_EQUIPABLE_SP_STATIC_ID_TYPE, this.value[0].value);
			break;

		// 固定情報（位置）データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_POSITION:
			funcCallSubSetAttribute(MIG_RRTSRC_KEYWORD_LIST_STATIC_POSITION, MIG_EQUIPABLE_SP_STATIC_ID_POSITION, this.value[0].value);
			break;

		// 固定情報（属性）データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_ELEMENT:
			funcCallSubSetAttribute(MIG_RRTSRC_KEYWORD_LIST_ELM, MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, this.value[0].value);
			break;

		// 固定情報（精錬）データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_REFINABLE:
			funcCallSubSetAttribute(MIG_RRTSRC_KEYWORD_LIST_STATIC_REFINABLE, MIG_EQUIPABLE_SP_STATIC_ID_REFINABLE, this.value[0].value);
			break;

		// 固定情報（破損）データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_BREAKABLE:
			funcCallSubSetAttribute(MIG_RRTSRC_KEYWORD_LIST_STATIC_BREAKABLE, MIG_EQUIPABLE_SP_STATIC_ID_BREAKABLE, this.value[0].value);
			break;

		// 固定情報（装備）データ
		case MIG_RRTSRC_DATA_MATCHER_STATIC_REQUIRED_JOB:
			funcCallSubAddAttribute(MIG_RRTSRC_KEYWORD_LIST_STATIC_REQUIRED_JOB, MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_JOB, this.value[0].value);
			break;

		// 上記以外は対象外
		default:
			return false;
		}



		// 処理済みを返す
		return true;
	};

	/**
	 * マッチツリーのデータを元に、スクリプトの配列を生成する（データマッチャ用サブ　リストタイプ用　処理本体）.
	 * @param indent インデントレベル
	 */
	this.GetScriptArraySubListCore = function (indent, scriptArray, listType, funcName, spid, valueText) {

		var idx = 0;
		var ret = null;

		var spidName = "";
		var valueList = null;
		var valueTrimed = "";
		var valueTranslated = "";
		var funcNameModified = "";

		var funcNameSeries = "";
		var funcNameSeries3rd = "";

		var regObject = null;



		// SPIDの定義名称を取得
		spidName = EnumMigEquipableSpId.GetDefinedName(spid);

		// SPIDごとの補正候補を検索しておく
		switch (spid) {
		case MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_JOB:
			funcNameSeries3rd = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_JOB_SERIES_3RD);
			funcNameSeries = EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_JOB_SERIES);
			break;
		}


		// リスト文字列を分割
		if (valueText) {
			valueList = CMigRrtSrcMatcherLibrary.SplitBlockedList(valueText);
		}
		else {
			valueList = [];
		}

		// すべての要素を処理
		for (idx = 0; idx < valueList.length; idx++) {

			// 括弧をトリミング
			valueTrimed = CMigRrtSrcMatcherLibrary.TrimBlockBrackets(valueList[idx]);

			if (valueTrimed == "") {
				continue;
			}

			// この段階では、「○○と○○」のような結合が残っているので、正規表現で分割する
			// （キーワード情報クラスから、キーワード単位の個別キャプチャで正規表現文字列を生成する）
			regObject = RegExp(g_MigRrtSrcKeywordInfoListLibrary.Get(listType).CreateRegText(true, false, false), "g");

			// マッチするすべてを処理
			while ((ret = regObject.exec(valueTrimed)) != null) {

				// funcName の補正
				switch (funcName) {
				case EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_JOB):
					if (g_MigRrtSrcKeywordInfoListLibrary.IsKeywordRequiredJobSeries3rd(ret[0])) {
						funcNameModified = funcNameSeries3rd;
					}
					else if (g_MigRrtSrcKeywordInfoListLibrary.IsKeywordRequiredJobSeries(ret[0])) {
						funcNameModified = funcNameSeries;
					}
					else {
						funcNameModified = funcName;
					}
					break;
				default:
					funcNameModified = funcName;
					break;
				}

				// 処理用の値をもとに、ライブラリから変換値を取得
				valueTranslated = g_MigRrtSrcKeywordInfoListLibrary.GetKeywordIdName(listType, ret[0]);

				// 変換した値をもとに、スクリプト追加
				scriptArray.push("\t".repeat(indent) + "." + funcNameModified + "(" + spidName + ", " + valueTranslated + ")");
			}
		}
	};

	/**
	 * マッチツリーのデータを元に、スクリプトの配列を生成する（データマッチャ用サブ　固有名詞用）.
	 * @param indent インデントレベル
	 */
	this.GetScriptArraySubNames = function (indent, scriptArray) {

		var idx = 0;
		var idxList = 0;
		var ret = null;

		var funcGetFuncArray = null;
		var funcGetId = null;
		var funcGetDefinedName = null;
		var funcGetSpIdName = null;

		var valueText = "";
		var valueList = null;
		var valueTrimed = "";
		var valueId = 0;
		var valueTranslated = "";

		var funcGetIdItem = function (nameF) {
			var idF = undefined;

			idF = g_constDataManager.GetIdByName(CONST_DATA_KIND_ITEM, nameF);
			if (idF >= 0) {
				return idF;
			}

			return g_constDataManager.GetIdByName(CONST_DATA_KIND_ITEM, nameF.replace(/\[\d+\]$/, ""));
		};

		var funcGetIdArrow = function (nameF) {
			return g_constDataManager.GetIdByName(CONST_DATA_KIND_ARROW, nameF);
		};

		var funcGetIdCard = function (nameF) {
			return g_constDataManager.GetIdByName(CONST_DATA_KIND_CARD, nameF);
		};

		var funcGetIdPet = function (nameF) {

			var idxF = 0;

			for (idxF = 0; idxF < PET_OBJ.length; idxF++) {
				if (PET_OBJ[idxF][PET_DATA_INDEX_NAME] == nameF) {
					return PET_OBJ[idxF][PET_DATA_INDEX_ID];
				}
			}

			return -1;
		};

		var funcGetIdSkill = function (nameF) {
			return g_skillManager.GetSkillIdByName(nameF);
		};

		var funcGetIdMonster = function (nameF) {
			return g_constDataManager.GetIdByName(CONST_DATA_KIND_MONSTER, nameF);
		};

		var funcGetIdMapMonster = function (nameF) {

			var idxF = 0;
			var idxNameF = 0;

			var nameKanaArrayF = null;

			// すべてのモンスターマップデータを検索
			for (idxF = 0; idxF < g_MonsterMapDataArray.length; idxF++) {

				// 名称カナ配列を取得
				nameKanaArrayF = g_MonsterMapDataArray[idxF][MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY];

				// すべての名称カナを検査
				for (idxNameF = 0; idxNameF < nameKanaArrayF.length; idxNameF++) {

					// 名称が一致すれば、OK
					if (nameKanaArrayF[idxNameF][NAME_KANA_DATA_INDEX_NAME] == nameF) {
						return g_MonsterMapDataArray[idxF][MONSTER_MAP_DATA_INDEX_ID];
					}
				}
			}

			return -1;
		};

		var funcGetDefinedNameItem = function (valueF) {

			var defineNameF = "";

			defineNameF = EnumMigItemId.GetDefinedName(valueF);

			if (defineNameF.length == 0) {
				defineNameF = EnumItemId.GetDefinedName(valueF);
			}

			return defineNameF;
		};

		var funcGetDefinedNameArrow = function (valueF) {

			var defineNameF = "";

			defineNameF = EnumMigArrowId.GetDefinedName(valueF);

			if (defineNameF.length == 0) {
				defineNameF = EnumArrowId.GetDefinedName(valueF);
			}

			return defineNameF;
		};

		var funcGetDefinedNameCard = function (valueF) {
			return EnumCardId.GetDefinedName(valueF);
		};

		var funcGetDefinedNamePet = function (valueF) {
			return EnumPetId.GetDefinedName(valueF);
		};

		var funcGetDefinedNameSkill = function (valueF) {
			return EnumSkillId.GetDefinedName(valueF);
		};

		var funcGetDefinedNameMonster = function (valueF) {
			return EnumMonsterId.GetDefinedName(valueF);
		};

		var funcGetDefinedNameMapMonster = function (valueF) {
			return EnumMonsterMapId.GetDefinedName(valueF);
		};

		var funcGetSpIdNameItem = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);
		};

		var funcGetSpIdNameArrow = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW);
		};

		var funcGetSpIdNameCard = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD);
		};

		var funcGetSpIdNamePet = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PET);
		};

		var funcGetSpIdNameSkill = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL);
		};

		var funcGetSpIdNameMonster = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MONSTER);
		};

		var funcGetSpIdNameMapMonster = function () {
			return EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER);
		};



		// 該当するマッチャＩＤのみ、処理用の値を設定する
		switch (this.refMatcher.id) {

		// バフ名データ
		case MIG_RRTSRC_DATA_MATCHER_BUFF:
			// TODO: 未対応
			return false;

		// アイテム名データ
		case MIG_RRTSRC_DATA_MATCHER_ITEM:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdItem, funcGetDefinedNameItem, funcGetSpIdNameItem];
			};
			break;

		// カード名データ
		case MIG_RRTSRC_DATA_MATCHER_CARD:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdCard, funcGetDefinedNameCard, funcGetSpIdNameCard];
			};
			break;

		// 矢名データ
		case MIG_RRTSRC_DATA_MATCHER_ARROW:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdArrow, funcGetDefinedNameArrow, funcGetSpIdNameArrow];
			};
			break;

		// ペット名データ
		case MIG_RRTSRC_DATA_MATCHER_PET:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdPet, funcGetDefinedNamePet, funcGetSpIdNamePet];
			};
			break;

		// 装備品名データ
		case MIG_RRTSRC_DATA_MATCHER_EQUIPABLE:
			funcGetFuncArray = function (nameF) {

				var idxF = 0;

				var dataIdF = 0;

				// 装備品のデータ種別の判定

				// アイテムの判定
				dataIdF = g_constDataManager.GetIdByName(CONST_DATA_KIND_ITEM, nameF);
				if (dataIdF >= 0) {
					return [funcGetIdItem, funcGetDefinedNameItem, funcGetSpIdNameItem];
				}
				dataIdF = g_constDataManager.GetIdByName(CONST_DATA_KIND_ITEM, nameF.replace(/\[\d+\]$/, ""));
				if (dataIdF >= 0) {
					return [funcGetIdItem, funcGetDefinedNameItem, funcGetSpIdNameItem];
				}

				// カードの判定
				dataIdF = g_constDataManager.GetIdByName(CONST_DATA_KIND_CARD, nameF);
				if (dataIdF >= 0) {
					return [funcGetIdCard, funcGetDefinedNameCard, funcGetSpIdNameCard];
				}

				// 矢の判定
				dataIdF = g_constDataManager.GetIdByName(CONST_DATA_KIND_ARROW, nameF);
				if (dataIdF >= 0) {
					return [funcGetIdArrow, funcGetDefinedNameArrow, funcGetSpIdNameArrow];
				}

				// ペットの判定
				for (idxF = 0; idxF < PET_OBJ.length; idxF++) {
					if (PET_OBJ[idxF][PET_DATA_INDEX_NAME] == nameF) {
						return [funcGetIdPet, funcGetDefinedNamePet, funcGetSpIdNamePet];
					}
				}

				// ここに来るなら、定義されていない種別
				return null;
			};
			break;

		// スキル名データ
		case MIG_RRTSRC_DATA_MATCHER_SKILL:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdSkill, funcGetDefinedNameSkill, funcGetSpIdNameSkill];
			};
			break;

		// モンスター名データ
		case MIG_RRTSRC_DATA_MATCHER_MONSTER:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdMonster, funcGetDefinedNameMonster, funcGetSpIdNameMonster];
			};
			break;

		// マップ名データ
		case MIG_RRTSRC_DATA_MATCHER_MAP_MONSTER:
			funcGetFuncArray = function (nameF) {
				return [funcGetIdMapMonster, funcGetDefinedNameMapMonster, funcGetSpIdNameMapMonster];
			};
			break;

		// 上記以外は対象外
		default:
			return false;
		}



		// キャプチャされていない場合は処理なし
		if (!this.value[0].value) {
			return true;
		}



		// リスト文字列を分割
		valueText = this.value[0].value;
		valueList = CMigRrtSrcMatcherLibrary.SplitBlockedList(valueText);

		// すべての要素を処理
		for (idxList = 0; idxList < valueList.length; idxList++) {

			// 括弧をトリミング
			valueTrimed = CMigRrtSrcMatcherLibrary.TrimBlockBrackets(valueList[idxList]);

			if (valueTrimed == "") {
				continue;
			}

			// 処理用の関数を取得する
			ret = funcGetFuncArray(valueTrimed);
			funcGetId = ret[0];
			funcGetDefinedName = ret[1];
			funcGetSpIdName = ret[2];

			// 処理用の関数を呼び出し、ＩＤを取得
			valueId = funcGetId(valueTrimed);

			// ＩＤをもとに、定数名を取得
			valueTranslated = funcGetDefinedName(valueId);

			// 変換した値をもとに、スクリプト追加
			scriptArray.push("\t".repeat(indent) + "." + "AddAttribute" + "(" + funcGetSpIdName() + ", " + valueTranslated + ")");
		}



		// 処理済みを返す
		return true;
	};

}










