import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState, useRecoilState, useSetRecoilState} from "recoil";
import { useState, useEffect } from "react";
import { alertState, userState, loadingState, selectState } from "../recoil/state";
import { api_CheckModelStatus } from "../apis/api";

import _ from "underscore";
import logo from "../asset/images/logo.png";
import ToastAlert from "./../component/ToastAlert";
import Loading from "./../component/Loading";

const MainLayout = () => {
  const navigate = useNavigate();

  //toastAlert 상태관리
  const [toastState, setToastState] = useRecoilState(alertState);
  const { show, type, msg, delay, openClass } = toastState;
  const loadingScreen = useSetRecoilState(loadingState);

  //유저정보
  const userInfo = useRecoilValue(userState); 
  const resetUserInfo = useResetRecoilState(userState);
  const resetSelect = useResetRecoilState(selectState);
  const loadingView = useRecoilValue(loadingState); //로딩
  
  //학습현황 표시
  const [ checkStatus, setCheckStatus ] = useState({text:"점검 OFF", sign:""});
  const [ trainStatus, setTrainStatus ] = useState({text:"학습 OFF", sign:""});
  
  //학습현황 가져오기
  const getModelStatus = async () => {

    const { train, inspection } = await api_CheckModelStatus(userInfo.user_id);
    
    inspection === "1" ? setCheckStatus({text:"점검 ON", sign:"on"}) : setCheckStatus({text:"점검 OFF", sign:""});
    train === "1" ? setTrainStatus({text:"학습 ON", sign:"on"}) : setTrainStatus({text:"학습 OFF", sign:""});

  }

  let items = [
    {
      key: "1",
      label: <Link to="/main">점검 목록 조회</Link>,
    },
    {
      key: "4",
      label: (
        <Link
          to="/login"
          onClick={() => {
            resetUserInfo();
            resetSelect();
            setToastState({ show: true, type: "ok", msg: "로그아웃 되었습니다", delay: 2000, openClass: "open" });
          }}
        >
          로그아웃
        </Link>
      ),
    },
  ];

  //관리자메뉴 추가
  if (userInfo.auth === "g718") {
    let tmp_admin = [
      { key: "2", label: <Link to="/model">AI 모델</Link> },
      { key: "3", label: <Link to="/member">회원관리</Link> },
    ];
    items = [...items, ...tmp_admin];
    items = _.sortBy(items, "key");
  }

  const handleOnInit = () => {
    resetSelect();
    navigate("/");
  };

  useEffect(() => { getModelStatus() }, []);

  return (
    <>
      <header>
        <img className="main-logo" alt="logo" src={logo} width={190} onClick={() => handleOnInit()} />
        <div className="header-right-wrap">
          <p className="status-reload" onClick={() => {getModelStatus();}}>MODEL STATUS <SyncOutlined style={{marginLeft:"5px"}}/></p>
          <p className={`status ${checkStatus.sign}`}>{checkStatus.text}<span className="status-sign"></span></p>
          <p className={`status ${trainStatus.sign}`}>{trainStatus.text}<span className="status-sign"></span></p>
          
          <Dropdown menu={{ items }} placement="bottomRight">
            <span>
              <span style={{ color: "#00a1e1", cursor:"pointer" }}>{userInfo.user_nm}</span> 님
            </span>
          </Dropdown>
        </div>

      </header>
      <section>
        <Outlet />
      </section>
      <ToastAlert show={show} type={type} msg={msg} delay={delay} openClass={openClass} />
      <Loading loadingView={loadingView} />
    </>
  );
};

export default MainLayout;
