// === AUTO-GENERATED IMPORTS ===
import "../runtime/common.js";
import {
    ELM_ID_DARK, ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_HOLY, ELM_ID_POISON, ELM_ID_PSYCO,
    ELM_ID_UNDEAD, ELM_ID_VANITY, ELM_ID_WATER, ELM_ID_WIND,
} from "../const/EnumElmId.js";
import { MONSTER_BOSSTYPE_BOSS, MONSTER_BOSSTYPE_NONE } from "../const/EnumMonsterBossType.js";
import { MONSTER_GRASSTYPE_EMPERIUM, MONSTER_GRASSTYPE_GLASS, MONSTER_GRASSTYPE_GLASS_NEW, MONSTER_GRASSTYPE_NONE } from "../const/EnumMonsterGrassType.js";
// === END AUTO-GENERATED IMPORTS ===

/**
 * モンスター属性のベース属性（水地火風など）を取得する.
 * @param monsterElm モンスター属性
 * @return ベース属性（common.js で定義している属性ＩＤと一致）
 */
export function GetMonseterElmBasicType(monsterElm) {

	return Math.floor(monsterElm / 10);
}


/**
 * BOSS属性のテキストを取得する.
 * @param bossTypeId BOSS属性ID
 * @return BOSS属性のテキスト
 */
export function GetBossTypeText(bossTypeId) {

	switch (bossTypeId) {
	case MONSTER_BOSSTYPE_NONE:
		return "一般";

	case MONSTER_BOSSTYPE_BOSS:
		return "BOSS";

	}

	return "エラー";
}


/**
 * 草属性のテキストを取得する.
 * @param grassTypeId 草属性ID
 * @return 草属性のテキスト
 */
export function GetGrassTypeText(grassTypeId) {

	switch (grassTypeId) {
	case MONSTER_GRASSTYPE_NONE:
		return "なし";

	case MONSTER_GRASSTYPE_GLASS:
		return "旧草";

	case MONSTER_GRASSTYPE_EMPERIUM:
		return "エンペ";

	case MONSTER_GRASSTYPE_GLASS_NEW:
		return "新草";

	}

	return "エラー";
}

