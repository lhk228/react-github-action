import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { alertState } from "../recoil/state";

const ToastAlert = ({ show=true, type='ok', msg, delay=2000 }) => {
  //alert 상태관리
  const [open, setOpenClass] = useState(""); //toastAlert 클래스관리(애니메이션)
  const [toastState, setToastState] = useRecoilState(alertState);

	useEffect(() => {
		setOpenClass('open');
		let tmp_hold_timer = setTimeout(() => { setToastState({...toastState, show:false})},delay);
		
		return () => { clearTimeout(tmp_hold_timer); } 

	}, [show])

	if(show){ return( <div className={`alert-container ${type} ${open}`}>{msg}</div> )}
	else { return( <div className={`alert-container ${type}`}>{msg}</div> )}
}

export default ToastAlert;

// 사용시 필요한것들
// import { useRecoilState } from 'recoil';
// import { alertState } from '../recoil/state'

// //toastAlert 상태관리
// const [ toastState, setToastState ] = useRecoilState(alertState);
// setToastState({ show: true, type: "warn", msg: "계정정보가 일치하지 않습니다", delay: 2000, openClass:"open" })
{
  /* <ToastAlert show={show} type={type} msg={msg} delay={delay} openClass={openClass}/> << MainLayout에 세팅완료*/
}
