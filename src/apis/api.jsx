import axios from "axios";
import { useQuery } from "react-query";
axios.defaults.baseURL = "http://211.206.127.131:90/api";


// 로그인
const api_userLogin = async (data) => {
  const result = await axios.post("/user/login", data);
  return result;
};

// 회원관리 : 회원목록 가져오기
const api_userList = async (data) => {
  const result = await axios.post("/user/list", data);
  return result;
};


// 회원관리 : 회원등록
const api_createUser = async (data) => {
  const result = await axios.post("/user/create", data);
  return result;
};

// 회원관리 : 회원수정
const api_modifyUser = async (data) => {
  const result = await axios.post("/user/modify", data);
  return result;
};

// 회원관리 : 회원삭제
const api_deleteUser = async (data) => {
  const result = await axios.post(`/user/delete`, data);
  return result;
};

// AI점검 : 점검이미지 업로드
const api_InspectionImageList = async (data) => {
  const fileURL = "/insert/analysis";
  const result = await axios.post(fileURL, data);

  console.log("api_InspectionImageList res :", result);
  return result;
};

// AI점검 : 샘플이미지 테스트
const api_InspectionImageTest = async (data) => {
  const result = await axios.post("", data);
  console.log("api_InspectionImageTest res:", result);
  return result;
};

// 메인헤더 : 모델상태 확인(현황조회)
const api_CheckModelStatus = async (data) => {
  console.log('api_CheckModelStatus data :',data);
  let train = "0";
  let inspection = "1";

  return { train, inspection };
  const result = await axios.post("", data);
  console.log('api_CheckModelStatus res :', result);
  return result;
}




// 발전기 리스트
const viewList = async (data) => {
  const result = await axios.post("/view/list", data);
  return result;
};

// 상세정보 :: 바 차트
const StackedChart = async (data) => {
  const result = await axios.post("/detail/barchart", data);
  return result;
};

// 상세정보 :: 파이 차트
const PieChart = async (data) => {
  const result = await axios.post("/detail/piechart", data);
  return result;
};

// 상세정보 :: 이미지 리스트
const ImageListBox = async (data) => {
  const result = await axios.post("/detail/images", data);
  return result;
};

// 상세정보 :: 이미지 뷰어
const ImageView = async (data) => {
  const result = await axios.post("/detail/images/path", data);
  return result;
};

// 상세정보 :: 드롭다운 조회
const DetailBox = async (data) => {
  const result = await axios.post("/detail/filter", data);
  return result;
};

// 드롭다운 :: 지역 조회
const regionBox = async () => {
  const result = await axios.post("/view/filter/region");
  return result;
};

// 드롭다운 :: 발전소 조회
const powerPlantBox = async (data) => {
  const result = await axios.post("/view/filter/powerPlant", data);
  return result;
};

// 드롭다운 :: 발전소 조회
const inspectionMonthBox = async (data) => {
  const result = await axios.post("/view/filter/inspectionMonth", data);
  return result;
};

// 드롭다운 :: 발전소 조회
const summary = async (data) => {
  const result = await axios.post("/detail/summary", data);
  return result;
};

// 위, 경도 업데이트
const updateCoordinates = async (id) => {
  const result = await axios.post("/view/updateCoordinates", id);
  return result;
};

export {
  api_userLogin,
  api_createUser,
  api_modifyUser,
  api_deleteUser,
  api_userList,
  api_InspectionImageList,
  api_InspectionImageTest,
  api_CheckModelStatus,
  viewList,
  StackedChart,
  PieChart,
  DetailBox,
  regionBox,
  powerPlantBox,
  inspectionMonthBox,
  ImageListBox,
  ImageView,
  summary,
  updateCoordinates,
};
