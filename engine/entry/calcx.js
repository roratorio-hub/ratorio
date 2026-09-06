/**
 * calcx.html のエンジンエントリ。
 * Phase 1: 165本の script タグを元の順序のまま import 文へ機械的に変換したもの
 * （モジュール評価順は元の script タグ列挙と同一になる）。
 */

// サイト共通系ファイル
import "../runtime/util.js";
import "../ui/CModalWindow.js";
// 共通系 javascript ファイル
import "../runtime/CInstanceManager.js";
import "../chara/CNameKana.js";
import "../monster/CCustomSelectBase.js";
import "../monster/CCustomSelectMapBase.js";
import "../monster/CCustomSelectMapCategory.js";
import "../monster/CCustomSelectMapMap.js";
import "../monster/CCustomSelectMapMonster.js";
import "../runtime/common.js";
import "../data/element-affinity.dat.js";
// データ定義系 javascript ファイル
import "../monster/alias.h.js";
import "../monster/alias.dat.js";
import "../skill/skill.h.js";
import "../skill/skill.dat.js";
import "../skill/usableskill.h.js";
import "../skill/usableskill.dat.js";
import "../skill/autospell.h.js";
import "../skill/autospell.dat.js";
import "../skill/CSkillManager.js";
import "../monster/monster.h.js";
import "../monster/monster.dat.js";
import "../monster/monster.toughness.dat.js";
import "../monster/monstergroup.dat.js";
import "../monster/monstermap.h.js";
import "../monster/monstermap.dat.js";
import "../equip/item.h.js";
import "../equip/item.dat.js";
import "../equip/arrow.dat.js";
import "../equip/card.dat.js";
import "../equip/costume.dat.js";
import "../equip/pet.dat.js";
import "../equip/itemset.h.js";
import "../equip/itemset.dat.js";
import "../equip/rndopt.h.js";
import "../equip/rndopt.dat.js";
import "../equip/rndoptlist.dat.js";
import "../equip/rndopttype.h.js";
import "../equip/rndopttype.dat.js";
import "../equip/timeitem.h.js";
import "../equip/timeitem.dat.js";
import "../equip/itempack.dat.js";
// [MIG] データ定義系 javascript ファイル
import "../data/mig.job.h.js";
import "../data/mig.itemsp.h.js";
import "../data/CMigJobData.js";
import "../data/CMigStateData.js";
import "../data/CMigEquipableSpTag.js";
import "../data/CMigEquipableStaticData.js";
import "../data/CMigEquipableSpData.js";
import "../data/CMigEquipableData.js";
import "../data/CMigConstDataManagerSubBase.js";
import "../data/CMigConstDataManagerSubJob.js";
import "../data/CMigConstDataManagerSubState.js";
import "../data/CMigConstDataManagerSubBuff.js";
import "../data/CMigConstDataManagerSubMonster.js";
import "../data/CMigConstDataManagerSubArrow.js";
import "../data/CMigConstDataManagerSubItem.js";
import "../data/CMigConstDataManagerSubCard.js";
import "../data/CMigConstDataManagerSubEnchList.js";
import "../data/CMigConstDataManagerSubRndOpt.js";
import "../data/CMigConstDataManager.js";
// グローバル変数定義 javascript ファイル
import "../runtime/global.js";
// [MIG] dat ファイル
import "../data/mig.job.dat.js";
import "../data/mig.enchlist.dat.js";
// 機能処理系 javascript ファイル
import "../skill/calcautospell.js";
import "../equip/rndench.js";
import "../equip/equip.js";
import "../skill/learnedskill.js";
import "../equip/slotpager.js";
import "../battle/quickcontrol.js";
// データ管理系 javascript ファイル
import "../chara/chara.js";
import "../monster/mob.js";
import "../battle/CAttackMethodConf.js";
// キャラクター設定操作系 javascript ファイル
import "../ui/CConfBase.js";
import "../ui/CConfBase2.js";
import "../chara/CCharaConfIchizi.js";
import "../chara/CCharaConfNizi.js";
import "../chara/CCharaConfSanzi.js";
import "../chara/CCharaConfYozi.js";
import "../chara/CCharaConfDebuff.js";
import "../chara/CCharaConfCustomStatus.js";
import "../chara/CCharaConfCustomAtk.js";
import "../chara/CCharaConfCustomDef.js";
import "../chara/CCharaConfCustomSkill.js";
import "../chara/CCharaConfCustomSpecStatus.js";
// モンスター設定操作系 javascript ファイル
import "../monster/mobconfdebuf.js";
import "../monster/mobconfbuf.js";
import "../monster/mobconfplayer.js";
import "../monster/CMobConfInput.js";
// 機能処理系 HTML 処理 javascript ファイル
import "../equip/CItemInfoManager.js";
import "../chara/hmjob.js";
import "../equip/hmcard.js";
import "../equip/hmcostume.js";
import "../monster/CMonsterMapAreaComponentManager.js";
import "../equip/hmrndopt.js";
import "../chara/hmchara.js";
import "../monster/hmmob.js";
// その他、機能系 javascript ファイル
import "../battle/castsim.js";
import "../equip/CEnchSearch.js";
import "../ui/saveimage.js";
import "../ui/calchistory.js";
// 機能処理系 javascript ファイル
import "../equip/CTimeItemAreaComponentManager.js";
import "../battle/CBattleQuickControlAreaComponentManager.js";
import "../ui/CExtraInfoAreaComponentManager.js";
import "../ui/CFloatingInfoAreaComponentManager.js";
// [MIG] 操作処理系 javascript ファイル
import "../equip/CShadowEquipController.js";
// メイン処理系 javascript ファイル
import "../battle/CBattleCalcInfo.js";
import "../battle/CBattleCalcResult.js";
import "../battle/CBattleCalcResultAll.js";
import "../ui/CReceivedDamageConfManager.js";
import "../battle/battlecalc.js";
// セーブデータ管理系 javascript ファイル
import "../savedata/CSaveDataMappingManager.js";
import "../savedata/CSaveDataConverter.js";
import "../savedata/savedata-codec.js";
import "../savedata/SKeyMap.js";
import "../savedata/CSingletonMapper.js";
import "../savedata/CMultiValueMapper.js";
import "../savedata/CSaveDataConst.js";
import "../savedata/CSaveDataUnitTypeManager.js";
import "../savedata/CSaveDataPropInfo.js";
import "../savedata/CSaveDataUnitBase.js";
import "../savedata/CSaveDataUnitVersion.js";
import "../savedata/CSaveDataUnitChara.js";
import "../savedata/CSaveDataUnitEquipable.js";
import "../savedata/CSaveDataUnitEquipRegions.js";
import "../savedata/CSaveDataUnitLearnedSkills.js";
import "../savedata/CSaveDataUnitCharaBuff.js";
import "../savedata/CSaveDataUnitSkillBuffSelf.js";
import "../savedata/CSaveDataUnitSkillBuff1st.js";
import "../savedata/CSaveDataUnitSkillBuff2nd.js";
import "../savedata/CSaveDataUnitSkillBuff3rd.js";
import "../savedata/CSaveDataUnitSkillBuff4th.js";
import "../savedata/CSaveDataUnitSkillBuffMusic.js";
import "../savedata/CSaveDataUnitSkillBuffGuild.js";
import "../savedata/CSaveDataUnitItemBuff.js";
import "../savedata/CSaveDataUnitTimeBuff.js";
import "../savedata/CSaveDataUnitAutoSpells.js";
import "../savedata/CSaveDataUnitCharaDebuff.js";
import "../savedata/CSaveDataUnitCharaConfBasic.js";
import "../savedata/CSaveDataUnitCharaConfSpecialize.js";
import "../savedata/CSaveDataUnitCharaConfSkill.js";
import "../savedata/CSaveDataUnitMob.js";
import "../savedata/CSaveDataUnitMobConfPlayer.js";
import "../savedata/CSaveDataUnitMobConfPlayer2.js";
import "../savedata/CSaveDataUnitMobConfInput.js";
import "../savedata/CSaveDataUnitMobBuff.js";
import "../savedata/CSaveDataUnitMobDebuff.js";
import "../savedata/CSaveDataUnitAttackConf.js";
import "../savedata/CSaveDataUnitSettings.js";
import "../savedata/CSaveDataUnitCharaConfSpecBasic.js";
import "../savedata/CSaveDataUnitEquipArrow.js";
import "../savedata/CSaveDataUnit.js";
import "../savedata/CSaveDataUnitParse.js";
import "../savedata/CSaveDataManager.js";
import "../savedata/CSaveController.js";
import "../savedata/saveload-mig.js";
// バフ設定系 javascript ファイル
import "../ui/BuffJobSpecificSelf.js";
import "../ui/BuffGuildAndGospel.js";
import "../ui/BuffItemAndFood.js";
import "../ui/BuffOtherCategory.js";
// 機能処理系 javascript ファイル （この辺の順序整理したい）
import "../battle/CAttackMethodAreaComponentManager.js";
// メイン処理系 javascript ファイル（Shell側。内部で stallcalc.js を import する。残件台帳 B-09 Phase 5）
import "../status/stallcalc-shell.js";
// DOM読み書きゼロのヘッドレス計算API（リファクタリング計画 Phase 10）。engine-registry へ自己登録する
import "../runtime/calc-headless.js";
// 左メニュー用 javascript ファイル
import "../ui/eventsetup.js";
import "../../assets/frame.js";
