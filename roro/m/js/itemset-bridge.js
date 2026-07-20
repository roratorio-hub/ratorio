// itemset.h.js の関数を循環 import なしで呼ぶための委譲ラッパー（3f-5、foot-bridge と同型）。
// CItemInfoManager.js / item.h.js は itemset.h.js の import グラフから到達可能なため、
// 直接 import すると循環が生じる。実体は itemset.h.js がモジュールレベルで登録する。
const _reg = {};

export function __registerItemSetFunctions(fns) {
	Object.assign(_reg, fns);
}

export function GetItemSetMemberText(...a) {
	return _reg.GetItemSetMemberText(...a);
}
