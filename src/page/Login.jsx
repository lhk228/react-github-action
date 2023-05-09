import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import logo from "../asset/images/logo.png";
import ToastAlert from "./../component/ToastAlert";
import { api_userLogin } from "../apis/api";
import { alertState, userState } from "../recoil/state";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  //toastAlert 상태관리
  const [toastState, setToastState] = useRecoilState(alertState);
  const { show, type, msg, delay, openClass } = toastState;
  //로그인 확인
  const loginConfirm = async (loginData) => {
    const res = await api_userLogin(loginData);
    let { user_nm, auth, status_code, detail } = res.data.status;

    //로그인정보 업데이트
    if (status_code === 200) {
      setUserInfo({ user_id: loginData.user_id, user_nm, auth, login: true });
      setToastState({ show: true, type: "ok", msg: "로그인 성공", delay: 2000, openClass: "open" });
      return;
    }

    if (status_code === 401) {
      setToastState({
        show: true,
        type: "warn",
        msg: detail,
        delay: 2000,
        openClass: "open",
      });
      return;
    }

    setToastState({
      show: true,
      type: "warn",
      msg: `로그인 오류. 관리자에게 문의하세요(에러코드 : ${status_code})`,
      delay: 2000,
      openClass: "open",
    });
  };

  //useState
  const [email, setEmail] = useState("admin@goldenplanet.co.kr");
  const [password, setPassword] = useState("1234");

  //useRef
  const inputRefEmail = useRef(null);
  const inputRefPW = useRef(null);

  const handleLoginClick = () => {
    // navigate("/main"); return;

    if (email === "") {
      inputRefEmail.current.style.borderColor = "red";
      inputRefEmail.current.focus();
    } else if (password === "") {
      inputRefPW.current.style.borderColor = "red";
      inputRefPW.current.focus();
    } else {
      try {
        const loginData = { user_id: email, password };
        loginConfirm(loginData);
      } catch (e) {
        console.log(e);
        alert("잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <ToastAlert show={show} type={type} msg={msg} delay={delay} openClass={openClass} />
      <div className="login">
        <div className="container">
          <img alt="logo" src={logo} />
          <span className="login_desc">Wind Blade Inspection Monitoring System</span>
          <div className="login_email">
            <p>이메일</p>
            <input
              type="text"
              name="email"
              placeholder="@windetect.co.kr"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={inputRefEmail}
            />
          </div>
          <div className="login_password">
            <p>비밀번호</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={inputRefPW}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLoginClick();
                }
              }}
            />
          </div>
          <button className="login_submit btn" onClick={handleLoginClick}>
            로그인
          </button>
        </div>
      </div>
      {}
    </>
  );
};

export default Login;
