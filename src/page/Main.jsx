import { Select, Button, Input } from "antd";
import { Form, Space, Tag, Typography, Table } from "antd";
import { SelectOutlined, RedoOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { alertState, detailState, selectState, userState, loadingState } from "../recoil/state";
import { inspectionMonthBox, powerPlantBox, regionBox, updateCoordinates, viewList } from "../apis/api";

const Main = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // session
  const userInfo = useRecoilValue(userState);
  const toastAlert = useSetRecoilState(alertState);
  const loadingScreen = useSetRecoilState(loadingState);
  const setDetailInfo = useSetRecoilState(detailState);
  const resetSelect = useResetRecoilState(selectState);
  const [selectBox, setSelectBox] = useRecoilState(selectState);

  const [list, setList] = useState({ count: 0, table: [] });
  const [filterRegionBox, setFilterRegionBox] = useState([]);
  const [filterGencodeBox, setFilterGencodeBox] = useState([]);
  const [filterCheckMBox, setFilterCheckMBox] = useState([]);
  const [inputNumber, setInputNumber] = useState('');
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const riskArr = [1, 2, 3, 4, 5];

  // 위도 경도 Input open
  const handleOnEdit = (record) => {
    form.setFieldsValue({ latitude: "", longitude: "", ...record });
    setEditingKey(record.id);
  };

  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item name={dataIndex}>
            <Input autoComplete="off" onChange={ (e) => {
              let input = e.target.value;
              //숫자 외 입력경고
              if(!isFinite(input)){
                toastAlert({type:'warn',msg:"입력값이 올바르지 않습니다"});
                form.setFieldsValue({ latitude: "", longitude: "", ...record });
              }
            }} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // 위도 경도 수정값 저장
  const handleOnSubmit = async () => {
    const data = await form.validateFields();
    const { latitude, longitude } = data
    if ((latitude < 0 || latitude === "") || (longitude < 0 || longitude === "") ) return toastAlert({
      type: "warn",
      msg: `입력값이 올바르지 않습니다`,
    });
    else {
      const req = { id: editingKey, latitude: data.latitude, longitude: data.longitude };
      const res = await updateCoordinates(req);
      if (res.data.status === "OK") {
        toastAlert({
          type: "ok",
          msg: `수정되었습니다`,
        });
        setEditingKey("");
        viewListQuery.refetch();
      }
    }
  };

  // 드롭다운 지역 조회
  const getRegion = async () => {
    const res = await regionBox();
    if (res.data.status === "OK") setFilterRegionBox(res.data.data);
    else alert("잠시 후 다시 시도해주세요.");
  };

  // 드롭다운 발전소 조회
  const getPowerPlant = async (value) => {
    const data = { region_cd: value };
    const res = await powerPlantBox(data);
    if (res.data.status === "OK") setFilterGencodeBox(res.data.data);
    else alert("잠시 후 다시 시도해주세요.");
  };

  // 드롭다운 점검월 조회
  const getInspectionMonth = async (value) => {
    const data = { pp_code: value };
    const res = await inspectionMonthBox(data);
    if (res.data.status === "OK") setFilterCheckMBox(res.data.data);
    else alert("잠시 후 다시 시도해주세요.");
  };

  const viewReqObj = {
    regionCd: selectBox.regeion,
    powerPlant: selectBox.gen_code,
    inspectionMonth: selectBox.check_m,
    pageNum: selectBox.pageNum,
  };

  //발전소 목록 가져오기 useQuery
  const viewListQuery = useQuery('viewList', async () => {loadingScreen('show'); return await viewList(viewReqObj)});
  const handleViewList = () => {

    const { error, isError, data } = viewListQuery;

    if (isError){ 
      toastAlert({ type: "alert", msg: `목록 조회에 실패하였습니다. 관리자에게 문의해주세요 (코드 ${error})`});
    }

    if (data) { 
      setList({ count: data.data.count, table: data.data.data });
    }

    loadingScreen('hide');
    
  }

  //데이터 갱신되면 리스트 다시그림
  useEffect(() => {
    handleViewList(); }, [viewListQuery.data])

  //  드롭다운 :: 지역
  const handleOnSelect1 = (e, { value, label }) => {
    setSelectBox({ ...selectBox, regeion: value, regeion_name: label, gen_code: null, gen_name: null, check_m: null, pageNum:1 });
    getPowerPlant(value);
  };

  //  드롭다운 :: 발전소
  const handleOnSelect2 = (e, { value, label }) => {
    setSelectBox({ ...selectBox, gen_code: value, gen_name: label, pageNum:1 });
    getInspectionMonth(value);
  };

  // 드롭다운 :: 날짜
  const handleOnSelect3 = (value) => {
    setSelectBox({ ...selectBox, check_m: value, pageNum:1 });
  };

  useEffect(() => {
    getRegion();
    if (!!selectBox.regeion && !selectBox.gen_code) {
      getPowerPlant(selectBox.regeion);
    } else if (!!selectBox.regeion && !!selectBox.gen_code) {
      getPowerPlant(selectBox.regeion);
      getInspectionMonth(selectBox.gen_code);
    } else return;
  }, []);

  // 블레이드 위험도 라벨
  const riskColorTool = (key) => {
    let color;
    if (key === "0") color = "#cbcccc";
    else if (key === "1") color = "blue";
    else if (key === "2") color = "green";
    else if (key === "3") color = "yellow";
    else if (key === "4") color = "orange";
    else color = "red";
    return color;
  };

  // 상세보기 페이지
  const handleOpenDetail = (key) => {
    setDetailInfo({ id: key.id, powerPlant: key.powerPlant, gen_code: key.gen_code, check_dt: key.check_dt });
    navigate("/detail");
  };

  // 필터 초기화
  const handleOnInit =  async() => {
    await resetSelect();
  };

  useEffect(() => { viewListQuery.refetch(); }, [selectBox])

  // 테이블 컬럼명
  const columns = [
    {
      title: "지역",
      dataIndex: "region_nm",
      key: "region_nm",
      width:'8.3%'
    },
    {
      title: "발전소",
      dataIndex: "powerPlant",
      key: "powerPlant",
      width:'8.3%'
    },
    {
      title: "발전기",
      dataIndex: "generator",
      key: "generator",
      width:'8.3%'
    },
    {
      title: "점검일",
      dataIndex: "check_dt",
      key: "check_dt",
      width:'8.3%'
    },
    {
      title: "최종 분석 점검일",
      dataIndex: "final_check_dt",
      key: "final_check_dt",
      width:'8.3%'
    },
    {
      title: "블레이드 A",
      dataIndex: "bladeA",
      key: "bladeA",
      width:'8.3%',
      render: (_, { bladeA }) => {
        return <Tag color={riskColorTool(bladeA)} key={bladeA}></Tag>;
      },
    },
    {
      title: "블레이드 B",
      dataIndex: "bladeB",
      key: "bladeB",
      width:'8.3%',
      render: (_, { bladeB }) => {
        return <Tag color={riskColorTool(bladeB)} key={bladeB}></Tag>;
      },
    },
    {
      title: "블레이드 C",
      dataIndex: "bladeC",
      key: "bladeC",
      width:'8.3%',
      render: (_, { bladeC }) => {
        return <Tag color={riskColorTool(bladeC)} key={bladeC}></Tag>;
      },
    },
    {
      title: "상세정보",
      dataIndex: "detail",
      key: "detail",
      width:'8.3%',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpenDetail(record)}>
            <SelectOutlined style={{ color: "#0b3d6c" }} />
          </a>
        </Space>
      ),
    },
    {
      title: "위도",
      dataIndex: "latitude",
      key: "latitude",
      width:'8.3%',
      editable: true,
      render: (_, { latitude }) => (latitude === null ? "-" : latitude),
    },
    {
      title: "경도",
      dataIndex: "longitude",
      key: "longitude",
      width:'8.3%',
      editable: true,
      render: (_, { longitude }) => (longitude === null ? "-" : longitude),
    },
    {
      title: "수정",
      dataIndex: "edit",
      key: "edit",
      width:'8.3%',
      hidden: userInfo.auth !== "g718" ? true : false,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link style={{ color: "#0b3d6c" }} onClick={() => handleOnSubmit(record.id)}>
              저장
            </Typography.Link>
            <span style={{ color: "#0b3d6c" }}> | </span>
            <Typography.Link style={{ color: "#0b3d6c" }} onClick={() => setEditingKey("")}>
              취소
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => handleOnEdit(record)}
            style={{ color: "#0b3d6c" }}
          >
            수정
          </Typography.Link>
        );
      },
    },
  ].filter((item) => !item.hidden);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="list">
      <div className="list_box_wrap">
        <div className="select-box">
          <Select
            size="large"
            style={{ width: 120 }}
            placeholder="지역 선택"
            value={selectBox?.regeion_name}
            onChange={(e, opt) => (e !== undefined ? handleOnSelect1(e, opt) : null)}
            options={filterRegionBox.map(({ region_nm, region_cd }) => ({ value: region_cd, label: region_nm }))}
          />
          <Select
            size="large"
            style={{ width: 120 }}
            placeholder="발전소 선택"
            value={selectBox?.gen_name}
            onChange={(e, opt) => (e !== undefined ? handleOnSelect2(e, opt) : null)}
            options={filterGencodeBox.map(({ pp_code, pp_nm }) => ({ value: pp_code, label: pp_nm }))}
          />
          <Select
            style={{ width: 120 }}
            placeholder="점검월"
            size="large"
            value={selectBox?.check_m}
            onChange={(e) => handleOnSelect3(e)}
            options={filterCheckMBox.map((v) => ({ value: v, label: v }))}
          />
          <Button className="list_box_btn_init" size="large" onClick={() => handleOnInit()}>
          초기화<RedoOutlined/>
          </Button>
        </div>
        <div className="level-container">
          <p>위험도</p>
          <div className="level-bar-container">
            <div className="level-bar">
              <span>정상</span>
            </div>
            {riskArr.map((index) => (
              <div className="level-bar" key={index}>
                <span>{index}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          type="list"
          rowKey={(render) => render.id}
          dataSource={list.table}
          columns={mergedColumns}
          pagination={{ defaultCurrent: 1, current:selectBox.pageNum, total: list.count, onChange: (page) => setSelectBox({...selectBox, pageNum:page}) }}
          size="large"
          className="main-table"
        />
      </Form>
    </div>
  );
};

export default Main;
