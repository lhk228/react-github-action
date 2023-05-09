import { useRef, useState, useEffect, useCallback } from "react";
import { Select, Modal, Button } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";

import Table from "../component/chart/Table";
import { api_createUser, api_modifyUser, api_deleteUser, api_userList } from "../apis/api";
import { alertState, loadingState, userState } from "../recoil/state";

const Member = () => {
  const LOGIN_INFO = useRecoilValue(userState);
  const toastAlert = useSetRecoilState(alertState);
  const loadingScreen = useSetRecoilState(loadingState);
  const [userList, setUserList] = useState([]);
  
  //회원등록 state
  const [regPopup, setRegPopup] = useState(false);
  const [pw2, setPw2] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const inputRefPW2 = useRef(null);
  
  //회원수정 state
  const [modPopup, setModPopup] = useState(false);
  const inputModRefPW2 = useRef(null);
  
  //회원삭제 state
  const [delPopup, setDelPopup] = useState(false);
  
  //회원목록 가져오기 useQuery
  const userListQuery = useQuery('userList', async () => {loadingScreen('show'); return await api_userList(LOGIN_INFO.auth)});
  
  const handleUserList = () => {
    const { error, isError, data } = userListQuery;

    if (isError){ 
      toastAlert({ show: true, type: "alert", msg: `회원목록 조회에 실패하였습니다. 관리자에게 문의해주세요 (코드 ${error})`, delay: 2000 });
    }

    if (data) { setUserList(data?.data.data) }

    loadingScreen('hide'); 
  }

  //READY
  useEffect(() => { handleUserList(); }, [userListQuery.data])
  
  //회원등록 API
  const createUser = async (regData) => {
    
    const res = await api_createUser(regData); loadingScreen("show");

    //아이디 중복
    if (res.data.status === "F") {
      toastAlert({show: true,type: "warn",msg: `등록에 실패하였습니다. 관리자에게 문의해주세요 (코드 ${res.status} 중복된아이디)`,delay: 2000});
    }

    if (res.data.status === "OK") {
      userListQuery.refetch();
      toastAlert({ show: true, type: "ok", msg: "등록이 완료되었습니다", delay: 2000 });
    } else {
      toastAlert({show: true,type: "warn",msg: `에러발생. 관리자에게 문의해주세요 (코드 ${res.status})`,delay: 2000});
    }
    
    setRegPopup(false); loadingScreen("hide");
  };

  //회원수정 API
  const modifyUser = async (modData) => {
    
    const res = await api_modifyUser(modData); loadingScreen("show");

    if (res.data.status === "OK") {
      userListQuery.refetch();
      toastAlert({ show: true, type: "ok", msg: "회원정보가 수정되었습니다", delay: 2000 });
    } else {
      toastAlert({
        show: true,
        type: "ok",
        msg: `에러발생. 관리자에게 문의해주세요 (코드 ${res.status})`,
        delay: 2000,
      });
    }

    setModPopup(false); loadingScreen("hide");

    return;
  };

  //회원삭제 API
  const deleteUser = async (user) => {
    
    const res = await api_deleteUser(user); loadingScreen("show");

    if (res.data.status === "OK") {
      userListQuery.refetch();
      toastAlert({ show: true, type: "ok", msg: "해당 회원이 삭제되었습니다", delay: 2000 });
    } else {
      toastAlert({
        show: true,
        type: "ok",
        msg: `에러발생. 관리자에게 문의해주세요 (코드 ${res.status})`,
        delay: 2000,
      });
    }

    setModPopup(false); setDelPopup(false); loadingScreen("hide");

    return;
  };



  //회원등록 - 확인버튼 클릭
  const handleRegOk = () => {
    const { user_nm, user_id, password, auth, rank } = userInfo;

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(user_id)) {
      toastAlert({ show: true, type: "warn", msg: "아이디 형식이 올바르지 않습니다", delay: 2000 });
      return;
    }

    if (user_nm === "") {
      toastAlert({ show: true, type: "warn", msg: "이를을 입력해주세요", delay: 2000 });
      return;
    }
    if (user_id === "") {
      toastAlert({ show: true, type: "warn", msg: "아이디를 입력해주세요", delay: 2000 });
      return;
    }
    if (password === "") {
      toastAlert({ show: true, type: "warn", msg: "비밀번호를 입력해주세요", delay: 2000 });
      return;
    }
    if (pw2 === "" || password !== pw2) {
      toastAlert({ show: true, type: "warn", msg: "비밀번호가 일치하지 않습니다", delay: 2000 });
      return;
    }

    if (rank === "") {
      toastAlert({ show: true, type: "warn", msg: "직책을 입력해주세요", delay: 2000 });
      return;
    }

    if (auth === "") {
      toastAlert({ show: true, type: "warn", msg: "권한을 설정해주세요", delay: 2000 });
      return;
    }

    let tmp_obj = { user_id, password, password_confirm: pw2, user_nm, rank, auth, crt_id: LOGIN_INFO.user_id };

    createUser(tmp_obj);
  };

	//입력유저정보 초기화
	const initUserInfo = () => {
		const tmp_obj = { user_id: "", password: "", password_confirm: "", user_nm: "", auth: "유저", rank:"" };
		setUserInfo(tmp_obj);
		setPw2("");

    // inputRefPW2.current.style.borderColor = "#ddd";
  };

  //회원목록 클릭 > 회원수정팝업 및 팝업정보 업데이트
  const handleModClick = (rowData) => {
    //비밀번호, 비밀번호 확인은 초기화한다
    setUserInfo({ ...rowData, password: "", password_confirm: "" });
    setPw2("");
    setModPopup(true);
  };

  //비밀번호 재입력 확인(실시간 입력)
  const passwordConfirm = useCallback(
    (e) => {
      const password = e.target.value;
      setPw2(password);

      if (inputRefPW2.current != null) {
        if (userInfo.password === password) {
          inputRefPW2.current.style.borderColor = "#ddd";
        } else {
          inputRefPW2.current.style.borderColor = "red";
        }
      }

      if (inputModRefPW2.current != null) {
        if (userInfo.password === password) {
          inputModRefPW2.current.style.borderColor = "#ddd";
        } else {
          inputModRefPW2.current.style.borderColor = "red";
        }
      }
    },
    [pw2]
  );

  //회원수정 확인버튼 클릭 - 유효성 검사 후 정보수정 요청
  const handleModOk = () => {
    const { user_nm, user_id, password, auth, rank } = userInfo;
    if (user_nm === "") {
      toastAlert({ show: true, type: "warn", msg: "이를을 입력해주세요", delay: 2000 });
      return;
    }
    if (password === "") {
      toastAlert({ show: true, type: "warn", msg: "비밀번호를 입력해주세요", delay: 2000 });
      return;
    }
    if (pw2 === "" || password !== pw2) {
      toastAlert({ show: true, type: "warn", msg: "비밀번호가 일치하지 않습니다", delay: 2000 });
      return;
    }
    if (auth === "") {
      toastAlert({ show: true, type: "warn", msg: "권한을 설정해주세요", delay: 2000 });
      return;
    }
    if (rank === "") {
      toastAlert({ show: true, type: "warn", msg: "직책을 입력해주세요", delay: 2000 });
      return;
    }
    let tmp_obj = { user_id, password, password_confirm: pw2, user_nm, auth, rank, crt_id: LOGIN_INFO.user_id };

    modifyUser(tmp_obj);
    setModPopup(false);
  };

  const option = [
    {
      value: "g718",
      label: "관리자",
    },
    {
      value: "g181",
      label: "일반",
    },
  ];

  const columns = [
    {
      title: "회원번호",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (text, record, index) => {
        return <span style={{ fontWeight: "bold" }}>{text}</span>;
      },
    },
    {
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
      width: "40%",
      render: (text, record, index) => {
        return <span style={{ fontWeight: "bold" }}>{text}</span>;
      },
    },
    {
      title: "이름",
      dataIndex: "user_nm",
      key: "user_nm",
      width: "30%",
      render: (text, record, index) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "직책",
      dataIndex: "rank",
      key: "rank",
      width: "10%",
      render: (text, record, index) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "권한",
      dataIndex: "auth",
      key: "auth",
      width: "10%",
      render: (text, record, index) => {
        let auth = text;
        auth === "g718" ? auth = "관리자" : auth = "유저";
        return <span>{auth}</span>;
      },
    },
  ];

  return (
    <>
      <div className="member">
        <div className="page-header">
          <h3 className="page-title" style={{margin:0}}>회원관리</h3>
          <div className="btn-wrap">
            <button
              className="btn btn-default btn-member-reg"
              onClick={() => {
                initUserInfo();
                setRegPopup(true);
              }}
            >
              회원등록
            </button>
          </div>
        </div>

        <div className="container">
          <Table
            type="member"
            handleModClick={handleModClick}
            dataSource={userList}
            columns={columns}
            pagination="false"
            size="small"
          />
        </div>
      </div>

      <Modal
        title="회원등록"
        open={regPopup}
        onOk={handleRegOk}
        onCancel={() => {
          setRegPopup(false);
        }}
        okText="등록"
        cancelText="취소"
        centered
      >
        <div className="input-wrap">
          <p className="input-title">이름</p>
          <input
            type="text"
            placeholder="사용자 이름을 입력해주세요"
            value={userInfo.user_nm}
            onChange={(e) => {
              setUserInfo({ ...userInfo, user_nm: e.target.value });
            }}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">아이디</p>
          <input
            type="text"
            placeholder="winditect@example.co.kr"
            value={userInfo.user_id}
            onChange={(e) => {
              setUserInfo({ ...userInfo, user_id: e.target.value });
            }}
          />
        </div>

        <div className="input-wrap">
          <p className="input-title">비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </div>

        <div className="input-wrap">
          <p className="input-title">비밀번호 확인</p>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={pw2}
            onChange={passwordConfirm}
            ref={inputRefPW2}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">직책</p>
          <input
            type="text"
            placeholder="직책을 입력해주세요"
            value={userInfo.Modalrank}
            onChange={(e) => setUserInfo({ ...userInfo, rank: e.target.value })}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">권한</p>
          <Select
            style={{ width: 120 }}
            placeholder="권한 설정"
            allowClear
            options={option}
            value={userInfo.auth}
            onChange={(v) => {
              setUserInfo({ ...userInfo, auth: v });
            }}
          />
        </div>
      </Modal>

      <Modal
        centered
        title="회원정보수정"
        open={modPopup}
        onOk={handleModOk}
        onCancel={() => {
          setModPopup(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setModPopup(false);
              setUserInfo({});
            }}
          >
            취소
          </Button>,
          <Button
            type="primary"
            danger
            onClick={() => {
              setDelPopup(true);
            }}
          >
            회원삭제
          </Button>,
          <Button type="primary" onClick={handleModOk}>
            수정
          </Button>,
        ]}
      >
        <div className="input-wrap">
          <p className="input-title">이름</p>
          <input
            type="text"
            value={userInfo.user_nm}
            onChange={(e) => {
              setUserInfo({ ...userInfo, user_nm: e.target.value });
            }}
          />
        </div>

        <div className="input-wrap">
          <p className="input-title">아이디</p>
          <input
            type="text"
            placeholder={userInfo.user_id}
            readOnly
            style={{ pointerEvents: "none", background: "#eee" }}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">비밀번호 확인</p>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={pw2}
            onChange={passwordConfirm}
            ref={inputModRefPW2}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">직책</p>
          <input
            type="text"
            placeholder="직책을 입력해주세요"
            value={userInfo.rank}
            onChange={(e) => setUserInfo({ ...userInfo, rank: e.target.value })}
          />
        </div>
        <div className="input-wrap">
          <p className="input-title">권한</p>
          <Select
            style={{ width: 120 }}
            placeholder="권한 설정"
            value={userInfo.auth}
            allowClear
            options={option}
            onChange={(v) => {
              setUserInfo({ ...userInfo, auth: v });
            }}
          />
        </div>
      </Modal>

      <Modal
        title="회원삭제 확인"
        open={delPopup}
        centered
        onCancel={() => {
          setDelPopup(false);
        }}
        footer={[
          <Button onClick={() => setDelPopup(false)}>취소</Button>,
          <Button type="primary" danger onClick={() => deleteUser({ user_id: userInfo.user_id })}>
            삭제
          </Button>,
        ]}
      >
        <h3 style={{ color: "#f31f1f" }}>{userInfo.user_id}</h3>
        <p>해당 회원을 삭제합니다</p>
      </Modal>
    </>
  );
};
export default Member;
