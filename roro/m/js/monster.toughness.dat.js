class MonsterToughness {
    /** ダメージ等倍 */
    static DAMPING_NONE = 0;
    /** ダメージ 1/5 バリカタ */
    static DAMPING_5 = 1;
    /** ダメージ 1/10 エンドコンテンツMVP */
    static DAMPING_10 = 2;
    /** 特性リスト */
    static ToughnessList = [
        ["ベテルギウス", MonsterToughness.DAMPING_5 + MonsterToughness.DAMPING_10],
        ["混沌のバフォメット（MD）", MonsterToughness.DAMPING_5],
        ["混沌のゴーストリング（MD）", MonsterToughness.DAMPING_5],
        ["迷宮のヴェルゼブブ（MD）", MonsterToughness.DAMPING_5],
        ["怨霊武士（MD）", MonsterToughness.DAMPING_5],
        ["雪嵐天使ウミウシ", MonsterToughness.DAMPING_10],
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
        }
        return result;
    }
}