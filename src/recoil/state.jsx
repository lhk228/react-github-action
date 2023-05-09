import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({ key: "WINDETECT", storage: sessionStorage });

// 유저 State
const userState = atom({
  key: "userState",
  default: { user_id: null, user_nm: null, auth: null, login: false },
  effects_UNSTABLE: [persistAtom],
});

// 모델현황 state
const modelState = atom({
  key: "modelState",
  default: [{type:"train",text:"학습 OFF", sign:""},{type:"check", text:"점검 OFF", sign:""}],
});

// toastAlert state
const alertState = atom({
  key: "alertState",
  default: { show: false, type: "ok", msg: "", delay: 2000, openClass: "" },
});

// loading state
const loadingState = atom({
  key: "loadingState",
  default: "hide",
});

// 상세정보 state
const detailState = atom({
  key: "detailState",
  default: { id: null, region: null, powerPlant: null, gen_code: null, check_m: null, check_dt: null },
  effects_UNSTABLE: [persistAtom],
});

// 드롭다운 state
const selectState = atom({
  key: "selectState",
  default: { regeion: null, regeion_name: null, gen_code: null, gen_name: null, check_m: null , pageNum: 1},
  effects_UNSTABLE: [persistAtom],
});

export { userState, alertState, loadingState, detailState, selectState, modelState };
