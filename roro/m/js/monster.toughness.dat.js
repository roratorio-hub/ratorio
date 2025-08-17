class MonsterToughness {
    /** ダメージ等倍 */
    static DAMPING_NONE = 0;
    /** ダメージ 1/5 バリカタ */
    static DAMPING_5 = 1;
    /** ダメージ 1/10 エンドコンテンツMVP */
    static DAMPING_10 = 2;
    /** ダメージ 1/100 エンドコンテンツMVP */
    static DAMPING_100 = 4;
    /** 時限式 */
    static DAMPING_TIME_DECAY = 8;
    /** 倍率強化 */
    static DAMPING_AMPLIFY = 16;

    /** 特性リスト */
    static ToughnessList = [
        // 星座
        ["アモンラー（星座の塔）", MonsterToughness.DAMPING_5],
        ["アトロス（星座の塔）", MonsterToughness.DAMPING_5],
        ["イグニゼム=セニア（一次職）（MVP）（星座の塔）", MonsterToughness.DAMPING_5],
        ["バフォメット（星座の塔）", MonsterToughness.DAMPING_5],
        ["ダークロード（星座の塔）", MonsterToughness.DAMPING_5],
        ["黒蛇王（星座の塔）", MonsterToughness.DAMPING_5],
        ["ドッペルゲンガー（星座の塔）", MonsterToughness.DAMPING_5],
        ["ドレイク（星座の塔）", MonsterToughness.DAMPING_5],
        ["イフリート（星座の塔）", MonsterToughness.DAMPING_5],
        ["マヤー（星座の塔）", MonsterToughness.DAMPING_5],
        ["ミストレス（星座の塔）", MonsterToughness.DAMPING_5],
        ["オークロード（星座の塔）", MonsterToughness.DAMPING_5],
        ["オークヒーロー（星座の塔）", MonsterToughness.DAMPING_5],
        ["オシリス（星座の塔）", MonsterToughness.DAMPING_5],
        ["ランドグリス（星座の塔）", MonsterToughness.DAMPING_5],
        ["瀕死のナハトズィーガー", MonsterToughness.DAMPING_5],
        ["ベテルギウス", MonsterToughness.DAMPING_5 + MonsterToughness.DAMPING_10],
        // 幻影
        ["混沌のバフォメット（MD）", MonsterToughness.DAMPING_5],
        ["混沌のゴーストリング（MD）", MonsterToughness.DAMPING_5],
        ["迷宮のヴェルゼブブ（MD）", MonsterToughness.DAMPING_5],
        ["怨霊武士（MD）", MonsterToughness.DAMPING_5],
        ["オークヒーロー（MD）", MonsterToughness.DAMPING_5],
        // 他
        ["Sユンケア", MonsterToughness.DAMPING_10 + MonsterToughness.DAMPING_TIME_DECAY],
        ["デミフレイヤ", MonsterToughness.DAMPING_10 + MonsterToughness.DAMPING_TIME_DECAY],
        ["究極のラスガンド", MonsterToughness.DAMPING_100 + MonsterToughness.DAMPING_AMPLIFY],
        ["次元犯罪者リゲル（難易度★）", MonsterToughness.DAMPING_100 + MonsterToughness.DAMPING_AMPLIFY],
        ["次元犯罪者リゲル（難易度★★）", MonsterToughness.DAMPING_100 + MonsterToughness.DAMPING_AMPLIFY],
        ["次元犯罪者リゲル（難易度★★★）", MonsterToughness.DAMPING_100 + MonsterToughness.DAMPING_AMPLIFY],
        ["次元犯罪者リゲル（難易度★★★★）", MonsterToughness.DAMPING_100 + MonsterToughness.DAMPING_AMPLIFY],
        ["雪嵐天使ウミウシ", MonsterToughness.DAMPING_10],
        ["死の大魔女", MonsterToughness.DAMPING_10],
        ["ウルトラリマキナ", MonsterToughness.DAMPING_10],
        ["ゴブリンキング", MonsterToughness.DAMPING_10],
        ["ルニレ", MonsterToughness.DAMPING_10],
        ["ガイアポール", MonsterToughness.DAMPING_10],
    ];

    /**
     * 検索対象のモンスターに設定されている特性コードを取得する.
     * @param {string} name モンスター名
     * @returns {number} 特性コード= DAMPING_NONE | DAMPING_5 | DAMPING_10
     */
    static get_toughness_code(name) {
        let result = MonsterToughness.DAMPING_NONE;
        const data = MonsterToughness.ToughnessList.find((arg) => name === arg[0]);
        if (data !== undefined) {
            result = data[1];
        }
        return result;
    }

	/**
	 * モンスターIDに対応するモンスター名を取得する.
	 * @param {*} id 
	 * @returns {string} モンスター名
	 */
	static getMobName(id) {
		let result = "モンスターIDが定義されていません";
		if (MonsterObjNew[id] !== undefined) {
			result = MonsterObjNew[id][1];
		}
		return result;
	}

    /**
     * 特性コードに応じたサジェストメッセージを取得する.
     * @param {number} code 合成された特性コード
     * @returns {string} メッセージ
     */
    static get_notification(code) {
        let result = "";
        switch (code) {
            case MonsterToughness.DAMPING_5:
                result = "受けるダメージを1/5に減少する";
                break;
            case MonsterToughness.DAMPING_10:
                result = "受けるダメージを1/10に減少する";
                break;
            case MonsterToughness.DAMPING_5 + MonsterToughness.DAMPING_10:
                result = "受けるダメージを1/50に減少する";
                break;
            case MonsterToughness.DAMPING_100 + MonsterToughness.DAMPING_AMPLIFY:
                result = "受けるダメージを1/100に減少する。ギミック発動中は更に減少する";
                break;
            case MonsterToughness.DAMPING_10 + MonsterToughness.DAMPING_TIME_DECAY:
                result = "受けるダメージを1/10に減少する。規定の時間が過ぎると等倍になる。";
                break;
        }
        return result;
    }
}