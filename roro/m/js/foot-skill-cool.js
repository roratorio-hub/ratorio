/**
 * 特定スキルのクールタイム／消費SP短縮効果を取得する（GetCoolFixOfSkill）。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 */
import { UsedSkillSearch } from '../../../ro4/m/js/skillstate.js';
import { IsSameJobClass } from '../../../ro4/m/js/data/mig.job.h.js';
import { g_objCharaConfCustomSkill } from '../../../ro4/m/js/global.js';
import { CCharaConfCustomSkill } from './CCharaConfCustomSkill.js';
import {
    CARD_ID_ENCHANT_HANGYAKUSHA, CARD_ID_GOKU, CARD_SET_ID_ENCHANT_GOKETSU_OR_SHINRI_AND_INSPIRATION_1,
    CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_GUILLOTINE_CROSS_3,
    CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAKUSEI_CRAZY_WEED, CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAKUSEI_SLUGSHOT,
    CARD_SET_ID_ENCHANT_SENZAI_KAKUSEI_DARK_CLAW, CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAKUSEI_PSYCHIC_WAVE_2,
    CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_CROWN, CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_CROWN,
    CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_RING, CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_DIADEM,
    CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_RING, CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_SHOES,
    CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_MANT
} from './card.dat.js';
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from './chara.js';
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_SHOES,
    EQUIP_REGION_ID_SHOULDER
} from './const/EnumEquipRegionId.js';
import { ITEM_SP_SKILL_COOL_MINUS_OFFSET } from './const/EnumItemSpId.js';
import {
    JOB_ID_GILOTINCROSS, JOB_ID_RANGER, JOB_ID_ROYALGUARD, JOB_ID_SORCERER, JOB_ID_WARLOCK
} from './const/EnumJobId.js';
import { EQUIP_REGION_ID_ANY } from './const/EnumMigItemParamId.js';
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip } from './foot-equipped-sp.js';
import {
    ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI, ITEM_ID_AKUMANO_TE, ITEM_ID_ANGELIC_HEALM_BIOLO,
    ITEM_ID_ANGELIC_HEALM_HYPERNOVICE, ITEM_ID_ANGELIC_HEALM_INQUISITOR, ITEM_ID_ASMODEUSNO_TSUBASA,
    ITEM_ID_ASSAULT_SUIT, ITEM_ID_AVARECO, ITEM_ID_BOINO_MUFFLER, ITEM_ID_BOOK_OF_SOURCERERY,
    ITEM_ID_BRILLIANT_AQUAMARINE_NECKLACE, ITEM_ID_CHIKAKU_ZOFUKU_RING, ITEM_ID_CIRCLET_OF_TIME_HYPERNOVICE,
    ITEM_ID_CIRCLET_OF_TIME_INQUISITOR, ITEM_ID_DARK_RING, ITEM_ID_DEATH_BRINGER, ITEM_ID_ELEMENTAL_POSSESSION,
    ITEM_ID_END_OF_THE_WORLD, ITEM_ID_ERYMANTHNO_KAWA, ITEM_ID_FIFTH_ELEMENT, ITEM_ID_FURUBITA_MIDASS,
    ITEM_ID_FUSHICHONO_KANMURI, ITEM_ID_GENZYUNO_MIMI, ITEM_ID_GLUTTONY_CROWN_BIOLO,
    ITEM_ID_GLUTTONY_CROWN_HYPER_NOVICE, ITEM_ID_GLUTTONY_CROWN_INQUISITOR, ITEM_ID_GRACE_ANIMAL_ROBE,
    ITEM_ID_GRACE_ARTIS_SUIT, ITEM_ID_GRACE_CONFIDENCIAL_MAIL, ITEM_ID_GRACE_CRUCIFORM_SUIT,
    ITEM_ID_GRACE_CULTIVATION_COAT, ITEM_ID_GRACE_MAGMA_SUIT, ITEM_ID_GRACE_PSYCHIC_ROBE,
    ITEM_ID_GRACE_RAINSTORM_SUIT, ITEM_ID_HANGYAKUNO_KAICHU_DOKEI, ITEM_ID_HANGYAKUSHANO_SCARF,
    ITEM_ID_IMPERIAL_ANIMAL_ROBE, ITEM_ID_IMPERIAL_ARTIS_SUIT, ITEM_ID_IMPERIAL_BOOTS,
    ITEM_ID_IMPERIAL_CRUCIFORM_SUIT, ITEM_ID_IMPERIAL_MAGMA_SUIT, ITEM_ID_JEJECAP, ITEM_ID_KYOZYUNO_MINIGLASS,
    ITEM_ID_MOENTO_HAKUMANO_YUBIWA, ITEM_ID_NIZIIRONO_MUFFLER, ITEM_ID_NIZIIRONO_SCARF, ITEM_ID_NORTHERN_CROSS,
    ITEM_ID_ONRYO_KAIINO_MIMI, ITEM_ID_PLATINUM_ARBITRATOR, ITEM_ID_RASEN_FUMANO_HOZYU, ITEM_ID_RING_OF_CERYNEIA,
    ITEM_ID_RING_OF_PAZUZU, ITEM_ID_RUNE_GREEVE, ITEM_ID_SACRED_LAPEL, ITEM_ID_SANCTUS, ITEM_ID_SANGAKU_HELMET,
    ITEM_ID_SCALL_RING, ITEM_ID_SEIGINO_KANMURI, ITEM_ID_SEISHIN_KAKUCHO_RING, ITEM_ID_SEREONO_HOKAN,
    ITEM_ID_SHIELD_RING, ITEM_ID_SHIKKOUSHANO_SHOES, ITEM_ID_SNIPING_VEIL, ITEM_ID_TENMA_GEDONO_GAITO,
    ITEM_ID_TSUIGEKISHANO_RING, ITEM_ID_WOLF_OFFICER_HAT, ITEM_ID_YOCHIYOCHI_URIBO_SUTAI,
    ITEM_ID_YUMEMIRU_AKA_HITSUZI, ITEM_ID_ZYASPER_CIRCLET, ITEM_SET_ID_ASMODEUSNO_TSUBASA_ZYASPER_CIRCLET,
    ITEM_SET_ID_BOINO_MUFFLER_ARASHINO_YUMI, ITEM_SET_ID_BOINO_MUFFLER_SCARABA_HIGHHEEL_ELVEN_BOW,
    ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD, ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD_HIBAM,
    ITEM_SET_ID_GRACE_CULTIVATION_COAT_FURUBITA_MIDASSNO_SASAYAKI,
    ITEM_SET_ID_GRACE_PSYCHIC_ROBE_FURUBITA_KAZENO_SASAYAKI, ITEM_SET_ID_GRACE_RAINSTORM_SUIT_ARASHINO_YUMI,
    ITEM_SET_ID_GRACE_RAINSTORM_SUIT_BOINO_MUFFLER, ITEM_SET_ID_GRACE_RAINSTORM_SUIT_ELVEN_BOW_SCARABA_HIGHHEEL,
    ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER, ITEM_SET_ID_GUARDIAN_SET,
    ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_PSYCHIC_ROBE, ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_TENCHI_SUIT,
    ITEM_SET_ID_ONRYO_KAIINO_MIMI_AKUMANO_TE, ITEM_SET_ID_SAITANNO_HOKAN_LAFINE_SHIELD,
    ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW, ITEM_SET_ID_SINFUL_RUBY_RING_ZYASPER_RING,
    ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1,
    ITEM_SET_ID_ULTIMATE_MODE_CHANGER_AQUA_ARTIFACT, ITEM_SET_ID_ULTIMATE_MODE_CHANGER_CRYMSON_ARTIFACT,
    ITEM_SET_ID_ULTIMATE_MODE_CHANGER_FOREST_ARTIFACT, ITEM_SET_ID_ULTIMATE_MODE_CHANGER_GOLDENROD_ARTIFACT,
    ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO, ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO_S2
} from './item.dat.js';
import { LearnedSkillSearch } from './learnedskill.js';
import {
    n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS,
    n_A_Weapon_ATKplus
} from './roro-state.js';
import {
    SKILL_ID_ARROW_STORM, SKILL_ID_AXE_BOOMERANG, SKILL_ID_AXE_TORNADE, SKILL_ID_BAKKISANDAN, SKILL_ID_BREAK_THROUGH,
    SKILL_ID_CAMOUFLAGE, SKILL_ID_CANNON_SPEAR, SKILL_ID_CARROT_BEAT, SKILL_ID_CHAIN_LIGHTNING, SKILL_ID_CLOUD_KILL,
    SKILL_ID_COMMET, SKILL_ID_CRAZY_WEED, SKILL_ID_CROSS_IMPACT, SKILL_ID_CRYMSON_ROCK, SKILL_ID_DARK_CRAW,
    SKILL_ID_DARK_ILLUSION, SKILL_ID_DIAMOND_DUST, SKILL_ID_DRAGON_TRAINING, SKILL_ID_DRAIN_LIFE,
    SKILL_ID_EARTH_DRIVE, SKILL_ID_EARTH_GRAVE, SKILL_ID_EARTH_STRAIN, SKILL_ID_ESCAPE, SKILL_ID_FALLIN_ANGEL,
    SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_FRIGNO_UTA, SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_GENZYUTSU_KYOGAKU,
    SKILL_ID_HALLUCINATION_WALK, SKILL_ID_HAMMER_OF_GOD, SKILL_ID_HANDRED_SPEAR, SKILL_ID_HEAT_BARREL,
    SKILL_ID_HEAVENS_DRIVE, SKILL_ID_HEAVENS_DRIVE_FOR_CLONE, SKILL_ID_HITO_DAICHINO_KENKYU,
    SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_IGNITION_BREAK, SKILL_ID_INSPIRATION, SKILL_ID_IZAYOI, SKILL_ID_KEIKAI,
    SKILL_ID_KINGS_GRACE, SKILL_ID_LORD_OF_VERMILLION, SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_MEIKYO_SHISUI,
    SKILL_ID_MELANCHOLY, SKILL_ID_METALIC_SOUND, SKILL_ID_METEOR_STORM, SKILL_ID_ORATIO, SKILL_ID_OTORO,
    SKILL_ID_PILE_BUNKER, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_RICHS_COIN, SKILL_ID_SEIMEINO_TAMASHI,
    SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SEVERE_RAINSTORM, SKILL_ID_SEVERE_RAINSTORM_EX, SKILL_ID_SHIELD_SPELL,
    SKILL_ID_SHIELD_SPELL_LV_1, SKILL_ID_SHIELD_SPELL_LV_2, SKILL_ID_SHIRYO_BAKUHATSU, SKILL_ID_SHIRYO_HYOI,
    SKILL_ID_SHURASHINDAN, SKILL_ID_SHUTTER_STORM, SKILL_ID_SISIKO, SKILL_ID_SLUG_SHOT, SKILL_ID_SONIC_WAVE,
    SKILL_ID_STORM_GUST, SKILL_ID_SUMMON_AQUA, SKILL_ID_SUMMON_VENTOS, SKILL_ID_TAROUNO_KIZU,
    SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TENSHISAMA_TASUKETE, SKILL_ID_UMINO_TAMASHI, SKILL_ID_UNLIMIT,
    SKILL_ID_UNTIMATERIAL_BLAST, SKILL_ID_VACUUM_EXTREME, SKILL_ID_VERATURE_SPEAR, SKILL_ID_WARMER,
    SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WEAPON_BLOCKING, SKILL_ID_WUG_RIDER, SKILL_ID_ZIRAISHIN,
    SKILL_ID_ZYUMONZIGIRI
} from './skill.dat.js';

/**
 * 特定スキルのクールタイムが短縮される時間をミリ秒で取得する。短縮効果が付与されていない場合は0が返される。
 * @param {Number} skillId 
 * @returns {Number} 装備品や性能カスタマイズ効果により短縮される時間（ミリ秒）
 */
export function GetCoolFixOfSkill(skillId) {
	var cardnum, eqpnum = 0, confval = 0;
	/** 短縮されたクールタイム */
	let coolfix = 0;
	let amp = 0;
	let daichi = 0;

	// 装備品の短縮効果
	if (GetEquippedTotalSPEquip(ITEM_SP_SKILL_COOL_MINUS_OFFSET + skillId) != 0) {
		coolfix -= GetEquippedTotalSPEquip(ITEM_SP_SKILL_COOL_MINUS_OFFSET + skillId);
	}

	if (GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_COOL_MINUS_OFFSET + skillId) != 0) {
		coolfix -= GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_COOL_MINUS_OFFSET + skillId);
	}

	//「潜龍昇天」CT短縮効果の打ち消し
	if (skillId === SKILL_ID_SENRYU_SHOTEN) {
		// グレース天地スーツ + ノブレスオブリージュを装備しているときに
		if (EquipNumSearch(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_TENCHI_SUIT) != 0) {
			// 暴食のクラウン(インクイジター) か 時間のサークレット(インクイジター) か傲慢のエンジェリックヘルム(インクイジター)を装備していて
			if (EquipNumSearch(ITEM_ID_GLUTTONY_CROWN_INQUISITOR) != 0 
				|| EquipNumSearch(ITEM_ID_CIRCLET_OF_TIME_INQUISITOR) != 0
				|| EquipNumSearch(ITEM_ID_ANGELIC_HEALM_INQUISITOR) != 0) {
				// 上段装備の精錬値が7以上のとき
				if (n_A_HEAD_DEF_PLUS >= 7) {
					coolfix += 25 * 1000;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「潜在覚醒(ダーククローI)」の「ダーククロー」CT短縮効果の打ち消し
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DARK_CRAW) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_SENZAI_KAKUSEI_DARK_CLAW) > 1) {
			// 豪傑、真理の両方がセットされている場合は片方の効果を削除する
			coolfix += 30 * 1000;
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　クリムゾンアーティファクトセット」の「メテオストーム」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_METEOR_STORM) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_CRYMSON_ARTIFACT, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			// 効果は「魔法力増強」スキル使用時のみ
			amp = UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU);
			if (amp > 0) {
				coolfix += 200 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ゴールデンロッドアーティファクトセット」の「ロードオブヴァーミリオン」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_LORD_OF_VERMILLION) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_GOLDENROD_ARTIFACT, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			// 効果は「魔法力増強」スキル使用時のみ
			amp = UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU);
			if (amp > 0) {
				coolfix += 5000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　アクアアーティファクトセット」の「ストームガスト」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_STORM_GUST) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_AQUA_ARTIFACT, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			// 効果は「魔法力増強」スキル使用時のみ
			amp = UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU);
			if (amp > 0) {
				coolfix += 5000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　フォレストアーティファクトセット」の「ヘヴンズドライブ」延長（ペナルティ）
	//----------------------------------------------------------------
	if ((skillId == SKILL_ID_HEAVENS_DRIVE) || (skillId == SKILL_ID_HEAVENS_DRIVE_FOR_CLONE)){
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_FOREST_ARTIFACT, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			// 効果は「魔法力増強」スキル使用時のみ
			amp = UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU);
			if (amp > 0) {
				coolfix += 200 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「猛炎と白魔の指輪」の「ファイアードラゴンブレス」短縮
	// （装備部位限定であるのに注意）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FIRE_DRAGON_BREATH) {
		eqpnum = EquipNumSearch(ITEM_ID_MOENTO_HAKUMANO_YUBIWA, EQUIP_REGION_ID_ACCESSORY_2);
		if (eqpnum > 0) {
			coolfix -= 500 * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「猛炎と白魔の指輪」の「ウォータードラゴンブレス」短縮
	// （装備部位限定であるのに注意）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_WATER_DRAGON_BREATH) {
		eqpnum = EquipNumSearch(ITEM_ID_MOENTO_HAKUMANO_YUBIWA, EQUIP_REGION_ID_ACCESSORY_1);
		if (eqpnum > 0) {
			coolfix -= 500 * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の「クリムゾンロック」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CRYMSON_ROCK) {
		cardnum = CardNumSearch(CARD_ID_GOKU);
		if (cardnum > 0) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_WARLOCK)) {
				coolfix -= 1500;
			}
		}
	}

	//----------------------------------------------------------------
	// 「カルデュイの耳　ラフィネシールドセット」の「コメット」短縮
	// （ヒバムセットが実現されている場合は、効果が発揮されない）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COMMET) {
		eqpnum = EquipNumSearchMIG(ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD_HIBAM, EQUIP_REGION_ID_ANY);
		if (eqpnum == 0) {
			eqpnum = EquipNumSearchMIG(ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD, EQUIP_REGION_ID_ANY);
			if (eqpnum > 0) {
				if (n_A_SHIELD_DEF_PLUS >= 7) {
					coolfix -= 20000 * eqpnum;
				}
				if (n_A_SHIELD_DEF_PLUS >= 9) {
					coolfix -= 40000 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「サバイバルシューズ サバイバルロッドセット」の「チェーンライトニング」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CHAIN_LIGHTNING) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	if (skillId == SKILL_ID_CHAIN_LIGHTNING) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「サバイバルシューズ サバイバルロッドセット」の「アースストレイン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_STRAIN) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				coolfix -= 2400 * eqpnum;
			}
		}
	}

	if (skillId == SKILL_ID_EARTH_STRAIN) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				coolfix -= 2400 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「勇者の靴 達人の斧 セット」の「アックストルネード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_AXE_TORNADE) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			daichi = LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU);
			coolfix -= 200 * daichi * eqpnum;
		}
		eqpnum = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO_S2, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			daichi = LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU);
			coolfix -= 200 * daichi * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンセット」の「パイルバンカー」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PILE_BUNKER) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_GUARDIAN_SET, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				coolfix += 3000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンプロセッサ パイルバンカーセット」の「パイルバンカー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PILE_BUNKER) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の「キャノンスピア」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CANNON_SPEAR) {
		cardnum = CardNumSearch(CARD_ID_GOKU);
		if (cardnum > 0) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
				coolfix -= 1000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪魔の手」の「獅子吼」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SISIKO) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ONRYO_KAIINO_MIMI_AKUMANO_TE);
		if (eqpnum == 0) {
			eqpnum = EquipNumSearch(ITEM_ID_AKUMANO_TE, EQUIP_REGION_ID_HEAD_TOP);
			if (eqpnum > 0) {
				if (LearnedSkillSearch(SKILL_ID_ZIRAISHIN) >= 5) {
					coolfix -= 9500;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「スカラバハイヒール エルヴンボウセット」の「シビアレインストーム」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SEVERE_RAINSTORM) || (skillId == SKILL_ID_SEVERE_RAINSTORM_EX) ) {
		eqpnum = EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				coolfix -= 2000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の「シャッターストーム」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SHUTTER_STORM) {
		eqpnum = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			coolfix -= 100 * LearnedSkillSearch(SKILL_ID_SHUTTER_STORM) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の「ヒートバレル」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HEAT_BARREL) {
		eqpnum = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			coolfix -= 4000 * LearnedSkillSearch(SKILL_ID_SHUTTER_STORM) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の「アンチマテリアルブラスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UNTIMATERIAL_BLAST) {
		eqpnum = EquipNumSearch(ITEM_ID_SNIPING_VEIL, EQUIP_REGION_ID_SHOULDER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_UNTIMATERIAL_BLAST) >= 5) {
				coolfix -= 2000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の「ハンマーオブゴッド」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HAMMER_OF_GOD) {
		eqpnum = EquipNumSearch(ITEM_ID_SNIPING_VEIL, EQUIP_REGION_ID_SHOULDER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_HAMMER_OF_GOD) >= 5) {
				coolfix -= 10000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の「インスピレーション」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_INSPIRATION) {
		eqpnum = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_KINGS_GRACE) >= 5) {
				coolfix -= 10000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インスピレーションI」と「豪傑 もしくは 真理」の「インスピレーション」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_INSPIRATION) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_GOKETSU_OR_SHINRI_AND_INSPIRATION_1);
		if (eqpnum === 2) {
			// 豪傑 と 真理 の両方がセットされている場合は片方は無効化する
			coolfix += 10000;
		}
	}

	//----------------------------------------------------------------
	// 「執行者のシューズ」の「ハルシネーションウォーク」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HALLUCINATION_WALK) {
		eqpnum = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES, EQUIP_REGION_ID_SHOES);
		if (eqpnum > 0) {
			coolfix -= 5000 * LearnedSkillSearch(SKILL_ID_WEAPON_BLOCKING) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「虹色のスカーフ」の「アンリミット」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UNLIMIT) {
		eqpnum = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF, EQUIP_REGION_ID_SHOULDER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_WUG_RIDER) >= 3) {
				coolfix -= 180000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「虹色のスカーフ」の「アローストーム」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARROW_STORM) {
		eqpnum = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF, EQUIP_REGION_ID_SHOULDER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				coolfix -= 200  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルブーツ」の「シールドスペル」短縮
	//----------------------------------------------------------------
	if ((skillId == SKILL_ID_SHIELD_SPELL) || (skillId == SKILL_ID_SHIELD_SPELL_LV_1) || (skillId == SKILL_ID_SHIELD_SPELL_LV_2)) {
		eqpnum = EquipNumSearch(ITEM_ID_IMPERIAL_BOOTS, EQUIP_REGION_ID_SHOES);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
				coolfix -= 2000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「精霊王の宝冠」の「アースグレイブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_GRAVE) {
		eqpnum = EquipNumSearch(ITEM_ID_SEREONO_HOKAN, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_WARMER) >= 5) {
				coolfix -= 1000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「精霊王の宝冠」の「ヴェラチュールスピアー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_VERATURE_SPEAR) {
		eqpnum = EquipNumSearch(ITEM_ID_SEREONO_HOKAN, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_WARMER) >= 5) {
				coolfix -= 1000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「精霊王の宝冠」の「ダイヤモンドダスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DIAMOND_DUST) {
		eqpnum = EquipNumSearch(ITEM_ID_SEREONO_HOKAN, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_WARMER) >= 5) {
				coolfix -= 1000  * eqpnum;
			}
		}
	}

	// クレイジーウィード CT 減少
	if (skillId == SKILL_ID_CRAZY_WEED) {
		// スキル習得時の効果
		if (LearnedSkillSearch(SKILL_ID_HOWLING_OF_MANDRAGORA) >= 5) {
			// ハウリングマンドラゴラLv5習得時
			if (EquipNumSearch(ITEM_ID_JEJECAP) > 0 || EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT) > 0) {
				// 「ジェジェキャップ」または「グレースカルティベイションコート」装備時
				coolfix -= 4.5  * 1000;
			}
		}
		// 競合する効果の打消し: 精錬値7以上の対象装備 + Coat/Card の組み合わせ
		// 同様の装備が追加される場合はここに ITEM_ID_* を追加する
		const CRAZY_WEED_CONFLICT_ITEMS = [
			ITEM_ID_GLUTTONY_CROWN_BIOLO,
			ITEM_ID_ANGELIC_HEALM_BIOLO,
		];
		const hasCrazyWeedConflictTrigger =
			EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT) > 0 ||
			CardNumSearch(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAKUSEI_CRAZY_WEED) > 0;
		if (hasCrazyWeedConflictTrigger && n_A_HEAD_DEF_PLUS >= 7) {
			for (const itemId of CRAZY_WEED_CONFLICT_ITEMS) {
				if (EquipNumSearch(itemId) > 0) {
					coolfix += 4.5 * 1000;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「虹色のマフラー」の、スキル習得による効果
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_METALIC_SOUND) {
		eqpnum = EquipNumSearch(ITEM_ID_NIZIIRONO_MUFFLER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) >= 5) {
				coolfix -= 200  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、スキル習得による効果
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FUMASHURIKEN_RANKA) {
		eqpnum = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_GENZYUTSU_KYOGAKU) >= 5) {
				coolfix -= 100  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、スキル習得による効果
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_IZAYOI) {
		eqpnum = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_MEIKYO_SHISUI) >= 5) {
				coolfix -= 25000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「シールドリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_DRIVE) {
		eqpnum = EquipNumSearch(ITEM_ID_SHIELD_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
				coolfix -= 1500  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ダークリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DARK_CRAW) {
		eqpnum = EquipNumSearch(ITEM_ID_DARK_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_DARK_CRAW) >= 5) {
				coolfix -= 25000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「知覚増幅リング」の、「サイキックウェーブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		eqpnum = EquipNumSearch(ITEM_ID_CHIKAKU_ZOFUKU_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ジャスパーサークレット」の、「イグニッションブレイク」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_IGNITION_BREAK) {

		// 適用除外条件
		if (
			(EquipNumSearch(ITEM_SET_ID_ASMODEUSNO_TSUBASA_ZYASPER_CIRCLET) > 0)
			&&
			(LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5)
		) {
		}
		else {

			eqpnum = EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET);
			if (eqpnum > 0) {
				if (LearnedSkillSearch(SKILL_ID_SONIC_WAVE) >= 5) {
					coolfix -= 2500 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「暴威のマフラー」の、「シビアレインストーム」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SEVERE_RAINSTORM) || (skillId == SKILL_ID_SEVERE_RAINSTORM_EX) ) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {
				coolfix -= 2000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「暴威のマフラー　嵐の弓セット」の、「シビアレインストーム」延長（ペナルティ）
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SEVERE_RAINSTORM) || (skillId == SKILL_ID_SEVERE_RAINSTORM_EX) ) {
		eqpnum = EquipNumSearchMIG(ITEM_SET_ID_BOINO_MUFFLER_ARASHINO_YUMI);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {
				coolfix += 2000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「暴威のマフラー　エルヴンボウ　スカラバハイヒールセット」の、「シビアレインストーム」延長（ペナルティ）
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SEVERE_RAINSTORM) || (skillId == SKILL_ID_SEVERE_RAINSTORM_EX) ) {
		eqpnum = EquipNumSearchMIG(ITEM_SET_ID_BOINO_MUFFLER_SCARABA_HIGHHEEL_ELVEN_BOW);
		if (eqpnum > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {
					coolfix += 2000 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「精神拡張リング」の、「テレキネシスインテンス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TELECHINESIS_INSTENCE) {
		eqpnum = EquipNumSearch(ITEM_ID_SEISHIN_KAKUCHO_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) >= 5) {
				coolfix -= 75000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「よちよちウリボウスタイ」の、「キャロットビート」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CARROT_BEAT) {
		eqpnum = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) >= 1) {
				coolfix -= 200 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「追撃者のリング」の、「エスケープ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ESCAPE) {
		eqpnum = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_ESCAPE) >= 5) {
				coolfix -= 500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「リングオブパズズ」の、「チェーンライトニング」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CHAIN_LIGHTNING) {
		eqpnum = EquipNumSearch(ITEM_ID_RING_OF_PAZUZU);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CHAIN_LIGHTNING) >= 5) {
				coolfix -= 500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「天魔外道の外套」の、「獅子吼」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SISIKO) {
		eqpnum = EquipNumSearch(ITEM_ID_TENMA_GEDONO_GAITO);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZIRAISHIN) >= 5) {
				coolfix -= 200 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ルーングリーブ」の、「ハンドレッドスピア」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HANDRED_SPEAR) {
		eqpnum = EquipNumSearch(ITEM_ID_RUNE_GREEVE);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) >= 5) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スカルリング」の、「死霊爆発」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SHIRYO_BAKUHATSU) {
		eqpnum = EquipNumSearch(ITEM_ID_SCALL_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) >= 5) {
				coolfix -= 500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「エリュマントスの皮」の「アローストーム」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARROW_STORM) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_ERYMANTHNO_KAWA);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				coolfix -= 300  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルアニマルローブ」の、「タロウの傷」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TAROUNO_KIZU) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ANIMAL_ROBE)) > 0) {
			coolfix -= 1000 * LearnedSkillSearch(SKILL_ID_KEIKAI) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「グレースアニマルローブ」の、「タロウの傷」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TAROUNO_KIZU) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_GRACE_ANIMAL_ROBE)) > 0) {
			coolfix -= 2500 * LearnedSkillSearch(SKILL_ID_KEIKAI) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルクルシフォームスーツ」の、「十文字斬り」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ZYUMONZIGIRI) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT)) > 0) {
			coolfix -= 100 * Math.floor(LearnedSkillSearch(SKILL_ID_ZYUMONZIGIRI) / 5) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「グレースクルシフォームスーツ」の、「十文字斬り」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ZYUMONZIGIRI) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT)) > 0) {
			coolfix -= 100 * Math.floor(LearnedSkillSearch(SKILL_ID_ZYUMONZIGIRI) / 2) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「山岳ヘルメット」の、「アックストルネード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_AXE_TORNADE) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_SANGAKU_HELMET)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) >= 5) {
				coolfix -= 500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「正義の冠」の、「インスピレーション」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_INSPIRATION) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_SEIGINO_KANMURI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
				coolfix -= 10000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルマグマスーツ」の「アックストルネード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_AXE_TORNADE) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MAGMA_SUIT);
		if (eqpnum > 0) {
			coolfix -= 100 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「グレースマグマスーツ」の「アックストルネード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_AXE_TORNADE) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_GRACE_MAGMA_SUIT);
		if (eqpnum > 0) {
			coolfix -= 300 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * eqpnum;
		}
	}

	// 「天使さま助けて」のCT減少
	if (skillId == SKILL_ID_TENSHISAMA_TASUKETE) {
		// スキル習得時の効果
		if (LearnedSkillSearch(SKILL_ID_BREAK_THROUGH) >= 5) {
			// ブレイクスルーLv5習得時
			if (EquipNumSearchMIG(ITEM_ID_IMPERIAL_ARTIS_SUIT) > 0) {
				// インペリアルアーティススーツ装備時
				coolfix -= 60 * 1000;
			}
			if (EquipNumSearchMIG(ITEM_ID_GRACE_ARTIS_SUIT) > 0) {
				// グレースアーティススーツ装備時
				coolfix -= 180 * 1000;
			}
		}
		// 競合する効果の打ち消し
		if (EquipNumSearch(ITEM_ID_IMPERIAL_ARTIS_SUIT) != 0 || EquipNumSearch(ITEM_ID_GRACE_ARTIS_SUIT) != 0) {
			// 「インペリアルアーティススーツ」または「グレースアーティススーツ」を装備時
			if (EquipNumSearch(ITEM_ID_CIRCLET_OF_TIME_HYPERNOVICE) != 0 
				|| EquipNumSearch(ITEM_ID_GLUTTONY_CROWN_HYPER_NOVICE) != 0
				|| EquipNumSearch(ITEM_ID_ANGELIC_HEALM_HYPERNOVICE) != 0) {
				// 「時間のサークレット(ハイパーノービス)」または「暴食のクラウン(ハイパーノービス)」または「傲慢のエンジェリックヘルム」を装備時
				if (n_A_HEAD_DEF_PLUS >= 7) {
					// 精錬値が7以上のCT減少効果を打ち消し
					coolfix += 240 * 1000;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「教授のミニグラス」の「アースグレイヴ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_GRAVE) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_KYOZYUNO_MINIGLASS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
				coolfix -= 4000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「教授のミニグラス」の「ダイヤモンドダスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DIAMOND_DUST) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_KYOZYUNO_MINIGLASS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
				coolfix -= 4000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「再誕の宝冠　ラフィネシールドセット」の「コメット」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COMMET) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SAITANNO_HOKAN_LAFINE_SHIELD, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_HEAD_DEF_PLUS > 7) {
				coolfix += 40000 * eqpnum;
			}
			if (n_A_HEAD_DEF_PLUS > 9) {
				coolfix += 45000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースレインストームスーツ」の「シビアレインストーム」短縮
	//----------------------------------------------------------------
	if ((skillId == SKILL_ID_SEVERE_RAINSTORM)
		|| (skillId == SKILL_ID_SEVERE_RAINSTORM_EX)) {

		eqpnum = EquipNumSearch(ITEM_ID_GRACE_RAINSTORM_SUIT);
		if (eqpnum > 0) {

			if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {

				// 特定セット成立時は発動しないので、それを除外
				if (EquipNumSearch(ITEM_SET_ID_GRACE_RAINSTORM_SUIT_ARASHINO_YUMI) > 0) {
				}
				else if (
					(EquipNumSearch(ITEM_SET_ID_GRACE_RAINSTORM_SUIT_ELVEN_BOW_SCARABA_HIGHHEEL) > 0)
					&&
					(n_A_SHOES_DEF_PLUS >= 7)
				) {
				}
				else if (EquipNumSearch(ITEM_SET_ID_GRACE_RAINSTORM_SUIT_BOINO_MUFFLER) > 0) {
				}

				// このケースのみ発動
				else {
					coolfix -= 2000 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースサイキックローブ」の「バキュームエクストリーム」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_VACUUM_EXTREME) {

		eqpnum = EquipNumSearch(ITEM_ID_GRACE_PSYCHIC_ROBE);
		if (eqpnum > 0) {

			if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {

				// 特定セット成立時は発動しないので、それを除外
				if (
					(EquipNumSearch(ITEM_SET_ID_GRACE_PSYCHIC_ROBE_FURUBITA_KAZENO_SASAYAKI) > 0)
					&&
					(n_A_HEAD_DEF_PLUS >= 7)
				) {
				}

				// このケースのみ発動
				else {
					coolfix -= 3000 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「リングオブケリュネイア」の「アンリミット」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UNLIMIT) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_RING_OF_CERYNEIA);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				coolfix -= 45000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ノーザンクロス」の「ドレインライフ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DRAIN_LIFE) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_NORTHERN_CROSS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) >= 5) {
				coolfix -= 2000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースコンフィデンシャルメイル」の、「ソニックウェーブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SONIC_WAVE) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
				coolfix -= 200  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「古びたミダスのささやき」の、「ハウリングオブマンドラゴラ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HOWLING_OF_MANDRAGORA) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_FURUBITA_MIDASS)) > 0) {

			// 特定セット成立時は発動しないので、それを除外
			if (
				(
					(EquipNumSearch(ITEM_SET_ID_GRACE_CULTIVATION_COAT_FURUBITA_MIDASSNO_SASAYAKI) > 0)
					&&
					(LearnedSkillSearch(SKILL_ID_CRAZY_WEED) >= 10)
				)
			) {
			}

			// このケースのみ発動
			else {

				coolfix -= 4000  * eqpnum;

				if (n_A_HEAD_DEF_PLUS >= 7) {
					coolfix -= 6000  * eqpnum;
				}

				if (n_A_HEAD_DEF_PLUS >= 9) {
					coolfix -= 2000  * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースカルティベイションコート」の、「ハウリングオブマンドラゴラ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HOWLING_OF_MANDRAGORA) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CRAZY_WEED) >= 10) {
				coolfix -= 12000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴァレーツォ」の、「ダークイリュージョン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DARK_ILLUSION) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_AVARECO)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) >= 5) {
				coolfix -= 4000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴァレーツォ」の、「ハルシネーションウォーク」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HALLUCINATION_WALK) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_AVARECO)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) >= 5) {
				coolfix -= 20000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「赤い猫耳魔女帽子」の、「ダイヤモンドダスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DIAMOND_DUST) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CLOUD_KILL) >= 5) {
				coolfix -= 1000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「赤い猫耳魔女帽子」の、「サイキックウェーブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
				coolfix -= 2000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ウルフオフィサーハット」の「アローストーム」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARROW_STORM) {
		eqpnum = EquipNumSearch(ITEM_ID_WOLF_OFFICER_HAT);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				coolfix -= 200  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「怨霊怪異の耳」の「獅子吼」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SISIKO) {
		eqpnum = EquipNumSearch(ITEM_ID_ONRYO_KAIINO_MIMI);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZIRAISHIN) >= 5) {
				coolfix -= 9500;
			}
		}
	}

	//----------------------------------------------------------------
	// 「幻獣の耳」の、「テレキネシスインテンス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TELECHINESIS_INSTENCE) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GENZYUNO_MIMI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) >= 5) {
				coolfix -= 80000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アスモデウスの翼」の、「イグニッションブレイク」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_IGNITION_BREAK) {

		eqpnum = EquipNumSearch(ITEM_ID_ASMODEUSNO_TSUBASA);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
				coolfix -= 2500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　人馬宮のマント」セットの「アンリミット」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UNLIMIT) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_MANT);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_RANGER)) {
				coolfix -= 18000 * n_A_SHOULDER_DEF_PLUS * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　双魚宮のダイアデム」セットの「サイキックウェーブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_DIADEM);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_SORCERER)) {
				coolfix -= 200 * n_A_HEAD_DEF_PLUS * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　天蝎宮のシューズ」セットの「ダークイリュージョン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DARK_ILLUSION) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_SHOES);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
				coolfix -= 500 * Math.floor(n_A_SHOES_DEF_PLUS / 2) * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　白羊宮のクラウン」セットの「キャノンスピア」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CANNON_SPEAR) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_CROWN);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
				coolfix -= 100 * n_A_HEAD_DEF_PLUS * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　宝瓶宮のクラウン」セットの「テレキネシスインテンス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TELECHINESIS_INSTENCE) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_CROWN);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_WARLOCK)) {
				coolfix -= 8000 * n_A_HEAD_DEF_PLUS * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　宝瓶宮のリング」セットの「テレキネシスインテンス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TELECHINESIS_INSTENCE) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_RING);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_WARLOCK)) {
				coolfix -= 75000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「夢見る赤羊」の「アンリミット」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UNLIMIT) {
		eqpnum = EquipNumSearch(ITEM_ID_YUMEMIRU_AKA_HITSUZI);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				coolfix -= 60000  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「エンドオブザワールド」の「ハルシネーションウォーク」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HALLUCINATION_WALK) {
		eqpnum = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD);
		if (eqpnum > 0) {
			coolfix -= 5000 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * eqpnum;
		}
	}
	
	//----------------------------------------------------------------
	// 「潜在解放（ギロチンクロスIII）」の「ハルシネーションウォーク」CT 45 秒短縮を無効化する
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HALLUCINATION_WALK) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_GUILLOTINE_CROSS_3) > 0) {
			eqpnum = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES);
			eqpnum += EquipNumSearch(ITEM_ID_AVARECO);
			eqpnum += EquipNumSearch(ITEM_ID_END_OF_THE_WORLD);
			if (eqpnum > 0) {
				coolfix += 45 * 1000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「反逆の懐中時計」の「アンチマテリアルブラスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UNTIMATERIAL_BLAST) {
		eqpnum = EquipNumSearch(ITEM_ID_HANGYAKUNO_KAICHU_DOKEI);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_FALLIN_ANGEL) >= 1) {
				coolfix -= 5000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「反逆の懐中時計」の「リッチズコイン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RICHS_COIN) {
		eqpnum = EquipNumSearch(ITEM_ID_HANGYAKUNO_KAICHU_DOKEI);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_FALLIN_ANGEL) >= 1) {
				coolfix -= 3000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「エレメンタルポゼッション」の「ヴェラチュールスピアー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_VERATURE_SPEAR) {
		eqpnum = EquipNumSearch(ITEM_ID_ELEMENTAL_POSSESSION);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_VERATURE_SPEAR) >= 10) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「エレメンタルポゼッション」の「サモンベントス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SUMMON_VENTOS) {
		eqpnum = EquipNumSearch(ITEM_ID_ELEMENTAL_POSSESSION);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_VERATURE_SPEAR) >= 10) {
				coolfix -= 25000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「シンフルルビーリング　ジャスパーリング」の「イグニッションブレイク」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_IGNITION_BREAK) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SINFUL_RUBY_RING_ZYASPER_RING);
		if (eqpnum > 0) {
			coolfix += 200 * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「アサルトスーツ」の「アローストーム」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARROW_STORM) {
		eqpnum = EquipNumSearch(ITEM_ID_ASSAULT_SUIT);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				coolfix -= 300 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「デスブリンガー」の「ダーククロー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_DARK_CRAW) {
		eqpnum = EquipNumSearch(ITEM_ID_DEATH_BRINGER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_HALLUCINATION_WALK) >= 5) {
				coolfix -= 60000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ブックオブソーサリー」の「アースグレイヴ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_GRAVE) {
		eqpnum = EquipNumSearch(ITEM_ID_BOOK_OF_SOURCERERY);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
				coolfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「プラチナムアビトレイター」の「キャノンスピア」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CANNON_SPEAR) {
		eqpnum = EquipNumSearch(ITEM_ID_PLATINUM_ARBITRATOR);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) >= 5) {
				coolfix -= 1500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「セイクリッドラペル」の「オラティオ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ORATIO) {
		eqpnum = EquipNumSearch(ITEM_ID_SACRED_LAPEL);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_ORATIO) >= 10) {
				coolfix -= 1500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「フィフスエレメント」の「サモンアクア」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SUMMON_AQUA) {
		eqpnum = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_VERATURE_SPEAR) >= 10) {
				coolfix -= 25000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「サンクトゥス」の「爆気散弾」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_BAKKISANDAN) {
		eqpnum = EquipNumSearch(ITEM_ID_SANCTUS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SHURASHINDAN) >= 10) {
				coolfix -= 200 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// スキル「海の魂」の「大トロ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_OTORO) {
		if (Math.max(LearnedSkillSearch(SKILL_ID_UMINO_TAMASHI), UsedSkillSearch(SKILL_ID_UMINO_TAMASHI)) >= 1) {
			coolfix -= 3000;
		}
	}

	//----------------------------------------------------------------
	// <反逆者>による「豪傑＋潜在覚醒(スラッグショットI)」の「スラッグショット」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SLUG_SHOT) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAKUSEI_SLUGSHOT) > 0) {
			if (CardNumSearch(CARD_ID_ENCHANT_HANGYAKUSHA) > 0) {
				coolfix += 10000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「真理の解放＋潜在覚醒(サイキックウェーブII)」の「サイキックウェーブ」延長（ペナルティ）
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAKUSEI_PSYCHIC_WAVE_2) > 0) {
			// 知覚増幅リング
			if (EquipNumSearch(ITEM_ID_CHIKAKU_ZOFUKU_RING) > 0) {
				coolfix += 2000;
			}
			// ブリリアントアクアマリンネックレス
			else if (EquipNumSearch(ITEM_ID_BRILLIANT_AQUAMARINE_NECKLACE) > 0) {
				coolfix += 2000;
			}
			// [グレースサイキックローブ]と[ノブレスオブリージュ]のセット効果発動
			else if (EquipNumSearch(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_PSYCHIC_ROBE) > 0) {
				coolfix += 2000;
			}
			// [双魚宮のリング]と[ゾディアック]のセット効果発動
			else if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_RING) > 0) {
				coolfix += 2000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_COOL_MINUS);
	if (confval != 0) {
		coolfix -= 100 * confval;
	}


	return coolfix;
}

