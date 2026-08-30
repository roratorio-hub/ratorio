/**
 * 特定スキルの消費SP軽減効果を取得する（GetCostScalingOfSkill / GetCostFixOfSkill）。
 *
 * stallcalc.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は stallcalc.js から移動のみで変更していない（バイト単位で同一）。
 */
import { g_objCharaConfCustomSkill } from "../runtime/global.js";
import { CCharaConfCustomSkill } from "../chara/CCharaConfCustomSkill.js";
import { EquipNumSearch } from "../chara/chara.js";
import { ITEM_SP_SKILL_COST_MINUS_OFFSET, ITEM_SP_SKILL_COST_SCALING_OFFSET } from "../const/EnumItemSpId.js";
import { EQUIP_REGION_ID_ANY } from "../const/EnumMigItemParamId.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip } from "./equipped-sp.js";
import {
    ITEM_ID_AKKI_RASETSUNO_YUBIWA, ITEM_ID_CATAPULT, ITEM_ID_CHEMICAL_GLOVE, ITEM_ID_CHIKAKU_ZOFUKU_RING,
    ITEM_ID_FUWAFUWA_TANPOPO_SHOES, ITEM_ID_GEFFENIA_KORINO_MADOGU, ITEM_ID_JAGUAR_NOTE, ITEM_ID_KAIFUKUNO_HIKARI,
    ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER, ITEM_ID_MAGICAL_FEATHER, ITEM_ID_MEDICAL_BOOTS, ITEM_ID_OGATA_CROSSBOW,
    ITEM_ID_RASEN_FUMANO_HOZYU, ITEM_ID_REIKINO_MADOSHO, ITEM_ID_RING_OF_PAZUZU, ITEM_ID_SCALL_RING,
    ITEM_ID_SHIELD_RING, ITEM_ID_SHINPANNO_TENBIN, ITEM_ID_SNIPING_SHOES, ITEM_SET_ID_MEDICAL_BOOTS_KAIFUKUNO_HIKARI,
    ITEM_SET_ID_RUISENO_AKAIKUTSU_MORDEN_CARD, ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_PLATE
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import { n_A_BODY_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_Weapon_ATKplus } from "../runtime/roro-state.js";
import {
    SKILL_ID_ARROW_STORM, SKILL_ID_CAMOUFLAGE, SKILL_ID_CART_KAIZO, SKILL_ID_CART_REVOLUTION, SKILL_ID_CART_TORNADO,
    SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_COLD_BOLT, SKILL_ID_COLUCEO_HEAL, SKILL_ID_COMMET, SKILL_ID_DAICHINO_TAMASHI,
    SKILL_ID_DIAMOND_DUST, SKILL_ID_EARTH_DRIVE, SKILL_ID_ELECTRIC_SHOCKER, SKILL_ID_FALLIN_ANGEL,
    SKILL_ID_FIRE_DANCE, SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_GENZYUTSU_KYOGAKU, SKILL_ID_HEAL,
    SKILL_ID_HIGHNESS_HEAL, SKILL_ID_HOLY_LIGHT, SKILL_ID_IGNITION_BREAK, SKILL_ID_IMPOSITIO_MANUS,
    SKILL_ID_INSPIRATION, SKILL_ID_INUHAKKA_METEOR, SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_JACK_FROST,
    SKILL_ID_MATATABI_LANCE, SKILL_ID_NYAN_GRASS, SKILL_ID_PINGPOINT_ATTACK, SKILL_ID_PSYCHIC_WAVE,
    SKILL_ID_RAY_OF_GENESIS, SKILL_ID_SHIRYO_BAKUHATSU, SKILL_ID_SHIRYO_HYOI, SKILL_ID_SHURASHINDAN, SKILL_ID_SISIKO,
    SKILL_ID_TRIANGLE_SHOT, SKILL_ID_VACUUM_EXTREME, SKILL_ID_WIND_CUTTER, SKILL_ID_ZIRAISHIN
} from "../skill/skill.dat.js";

//================================================================================================================================
//================================================================================================================================
//====
//==== 特定スキルの消費ＳＰ－○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

export function GetCostScalingOfSkill(skillId) {

	var scaling = 100, confval = 0;


	// 装備品の短縮効果
	if (GetEquippedTotalSPEquip(ITEM_SP_SKILL_COST_SCALING_OFFSET + skillId) != 0) {
		scaling -= GetEquippedTotalSPEquip(ITEM_SP_SKILL_COST_SCALING_OFFSET + skillId);
	}

	if (GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_COST_SCALING_OFFSET + skillId) != 0) {
		scaling -= GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_COST_SCALING_OFFSET + skillId);
	}


	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_COST_DOWN);
	if (confval != 0) {
		scaling -= confval;
	}


	return scaling;
}

//================================================================================================================================
//================================================================================================================================
//====
//==== 特定スキルの消費ＳＰ－○○　ここから
//====
//================================================================================================================================
//================================================================================================================================

export function GetCostFixOfSkill(skillId) {
	let prefetch = 0;
	var costfix = 0, eqpnum = 0, itemCount = 0, confval = 0;

	// 装備品の短縮効果
	prefetch = GetEquippedTotalSPEquip(ITEM_SP_SKILL_COST_MINUS_OFFSET + skillId);
	if (prefetch != 0) {
		costfix -= prefetch;
	}

	prefetch = GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_COST_MINUS_OFFSET + skillId);
	if (prefetch != 0) {
		costfix -= prefetch;
	}

	//----------------------------------------------------------------
	// 「冷気の魔道書」の「コールドボルト」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COLD_BOLT) {
		eqpnum = EquipNumSearch(ITEM_ID_REIKINO_MADOSHO, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 5 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「冷気の魔道書」の「ダイヤモンドダスト」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DIAMOND_DUST) {
		eqpnum = EquipNumSearch(ITEM_ID_REIKINO_MADOSHO, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 5 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「回復の光」の「ヒール」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HEAL) {
		eqpnum = EquipNumSearch(ITEM_ID_KAIFUKUNO_HIKARI, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 10 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「回復の光」の「コルセオヒール」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COLUCEO_HEAL) {
		eqpnum = EquipNumSearch(ITEM_ID_KAIFUKUNO_HIKARI, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 12 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「回復の光」の「ハイネスヒール」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HIGHNESS_HEAL) {
		eqpnum = EquipNumSearch(ITEM_ID_KAIFUKUNO_HIKARI, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 14 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「カタパルト」の「トライアングルショット」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TRIANGLE_SHOT) {
		eqpnum = EquipNumSearch(ITEM_ID_CATAPULT, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 2 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「大型クロスボウ」の「アローストーム」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARROW_STORM) {
		eqpnum = EquipNumSearch(ITEM_ID_OGATA_CROSSBOW, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 5 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「メディカルブーツ」の「コルセオヒール」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COLUCEO_HEAL) {
		eqpnum = EquipNumSearch(ITEM_ID_MEDICAL_BOOTS, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix -= 5 * n_A_SHOES_DEF_PLUS * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「メディカルブーツ　回復の光セット」の「ヒール」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HEAL) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_MEDICAL_BOOTS_KAIFUKUNO_HIKARI, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix -= 6 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「メディカルブーツ　回復の光セット」の「コルセオヒール」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COLUCEO_HEAL) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_MEDICAL_BOOTS_KAIFUKUNO_HIKARI, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix -= 10 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「メディカルブーツ　回復の光セット」の「ハイネスヒール」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HIGHNESS_HEAL) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_MEDICAL_BOOTS_KAIFUKUNO_HIKARI, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix -= 14 * n_A_Weapon_ATKplus * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「マジカルフェザー」の「ホーリーライト」消費増加（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HOLY_LIGHT) {
		eqpnum = EquipNumSearch(ITEM_ID_MAGICAL_FEATHER, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix += 15 * LearnedSkillSearch(SKILL_ID_IMPOSITIO_MANUS) * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「ルイーゼの赤い靴　モルデンカードセット」の「カートレボリューション」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CART_REVOLUTION) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_RUISENO_AKAIKUTSU_MORDEN_CARD, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_SHOES_DEF_PLUS >= 6) {
				costfix -= 4 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ペオースプレートセット」の「ウィンドカッター」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_WIND_CUTTER) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_PLATE, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				costfix -= 15 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ペオースプレートセット」の「イグニッションブレイク」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_IGNITION_BREAK) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_PLATE, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				costfix -= 25 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ケミカルグローブ」の「カートトルネード」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CART_TORNADO) {
		eqpnum = EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			costfix -= 1 * LearnedSkillSearch(SKILL_ID_CART_KAIZO) * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の「風魔手裏剣-乱華-」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FUMASHURIKEN_RANKA) {
		eqpnum = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_GENZYUTSU_KYOGAKU) >= 5) {
				costfix -= 10 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「シールドリング」の「アースドライブ」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_DRIVE) {
		eqpnum = EquipNumSearch(ITEM_ID_SHIELD_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_PINGPOINT_ATTACK) >= 5) {
				costfix -= 25 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ふわふわタンポポシューズ」の、「イヌハッカメテオ」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_INUHAKKA_METEOR) {
		eqpnum = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
				if (LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER) >= 5) {
					costfix -= 50 * eqpnum;
				}
			}
		}
	}


	//----------------------------------------------------------------
	// 「スナイピングシューズ」の、「カモフラージュ」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CAMOUFLAGE) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_SNIPING_SHOES)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ELECTRIC_SHOCKER) >= 5) {
				costfix -= 20 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「悪鬼羅刹の指輪」の、「獅子吼」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SISIKO) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZIRAISHIN) >= 5) {
				costfix -= 35 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「悪鬼羅刹の指輪」の、「修羅身弾」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SHURASHINDAN) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZIRAISHIN) >= 5) {
				costfix -= 4 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「ジャックフロスト」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JACK_FROST) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_COMMET) >= 5) {
				costfix -= 35 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「コメット」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COMMET) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_JACK_FROST) >= 5) {
				costfix -= 100 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ジャガーノート」の、「ファイアーダンス」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FIRE_DANCE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FALLIN_ANGEL) >= 1) {
				costfix -= 20 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「知覚増幅リング」の、「サイキックウェーブ」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_CHIKAKU_ZOFUKU_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
				costfix -= 20 * itemCount;
			}
		}
	}


	//----------------------------------------------------------------
	// 「審判の天秤」の、「レイオブジェネシス」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RAY_OF_GENESIS) {
		eqpnum = EquipNumSearch(ITEM_ID_SHINPANNO_TENBIN);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
				costfix -= 20 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「リングオブパズズ」の、「チェーンライトニング」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CHAIN_LIGHTNING) {
		eqpnum = EquipNumSearch(ITEM_ID_RING_OF_PAZUZU);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CHAIN_LIGHTNING) >= 5) {
				costfix -= 35 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「スカルリング」の、「死霊爆発」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SHIRYO_BAKUHATSU) {
		eqpnum = EquipNumSearch(ITEM_ID_SCALL_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) >= 5) {
				costfix -= 25 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「きらきらニャンニャンチョーカー」の、「マタタビランス」消費減少
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_MATATABI_LANCE) {
		eqpnum = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_GRASS) >= 5) {
				costfix -= 10 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_COST_MINUS);
	if (confval != 0) {
		costfix -= confval;
	}


	return costfix;
}

