// saveload.js の関数を循環 import なしで呼ぶための委譲ラッパー（3f-6、foot-bridge と同型）。
// hmjob.js / mig.job.h.js は saveload.js の import グラフから到達可能なため、
// 直接 import すると循環が生じる。実体は saveload.js がモジュールレベルで登録する。
const _reg = {};

export function __registerSaveloadFunctions(fns) {
	Object.assign(_reg, fns);
}

export function SaveSystem(...a) {
	return _reg.SaveSystem(...a);
}
