import { useEffect, useState } from "react";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Skeleton, Table, Result, Slider } from "antd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { detailState, selectState, loadingState } from "../recoil/state";
import * as xlsx from "xlsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import WindBladeDetail from "../component/WindBladeDetail";
import StackedColumnChart from "../component/chart/StackedColumnChart";
import WindBladeSingle from "../component/WindBladeSingle";
import DonutChart from "../component/chart/DonutChart";
import { DetailBox, ImageListBox, ImageView, PieChart, StackedChart, summary } from "../apis/api";

const Detail = () => {
  const { id } = useRecoilValue(detailState);
  const { check_m } = useRecoilValue(selectState);
  const [detail, setDetail] = useRecoilState(detailState);
  const loadingScreen = useSetRecoilState(loadingState);
  const [stackedChart, setStackedChart] = useState([]);
  const [donutchart, setDonutChart] = useState([]);
  const [blade, setblade] = useState("A");
  const [bladeSide, setbladeside] = useState("Leading_Edge");
  const [detectionNum, setDetectionNum] = useState(null);

  const [generatorBox, setGeneratorBox] = useState([]);
  const [inspectionDate, setInspectionDate] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [imageView, setImageView] = useState([]);
  const [summaryList, setSummaryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);

  const [brightness, setBrightness] = useState(50);
  const [saturate, setSaturate] = useState(20);
  const [loading, setLoading] = useState(false);
  const [viewClass, setViewClass] = useState('');
  
  const toggleViewClass = (e) => {

    let targetNode = e.target;

    //클릭 위치에따라 span태그가 선택될 경우도 있어서 분기처리
    if(targetNode.nodeName === 'SPAN'){ targetNode = e.target.parentNode; }

    let currentIdx = targetNode.value;

    console.log('currentIdx :',currentIdx);
    setViewClass((prev) => {
      console.log('prev :',prev);
      return currentIdx;
    })

  }

  let detectionOpt = [0, 1, 2, 3, 4, 5].map((v) => ({ label: v, value: v }));
  detectionOpt.unshift({ label: "전체", value: null });

  const dangerColors = {
    0: "#cbcccc",
    1: "#0c70f2",
    2: "#4cbb17",
    3: "#ffd400",
    4: "#ff7f00",
    5: "#f31f1f",
  };

  const dataSource = [
    {
      key: "1",
      danger: 1,
      count: donutchart[0],
      color: "#0c70f2",
    },
    {
      key: "2",
      danger: 2,
      count: donutchart[1],
      color: "#4cbb17",
    },
    {
      key: "3",
      danger: 3,
      count: donutchart[2],
      color: "#ffd400",
    },
    {
      key: "4",
      danger: 4,
      count: donutchart[3],
      color: "#ff7f00",
    },
    {
      key: "5",
      danger: 5,
      count: donutchart[4],
      color: "#f31f1f",
    },
  ];

  const columns = [
    {
      title: "위험도",
      dataIndex: "danger",
      key: "danger",
      width: "50%",
      render: (text, record, index) => {
        return (
          <>
            <span
              className="color"
              style={{ background: record.color, marginRight: "4px", position: "relative", top: "4px" }}
            ></span>
            <span style={{ fontWeight: "bold" }}>{text}</span>
          </>
        );
      },
    },
    {
      title: "관측수",
      dataIndex: "count",
      key: "count",
      width: "50%",
      render: (text, record, index) => {
        return <span>{text} 건</span>;
      },
    },
  ];

  const columns_summary = [
    {
      title: "IMAGE_ID",
      dataIndex: "IMAGE_NAME",
      key: "IMAGE_NAME",
    },
    {
      title: "BLADE",
      dataIndex: "BLADE",
      key: "BLADE",
      width: 80,
    },
    {
      title: "PART",
      dataIndex: "PART",
      key: "PART",
      width: 120,
    },
    {
      title: "DEFECT_TYPE",
      dataIndex: "DEFECT_TYPE",
      key: "DEFECT_TYPE",
      width: 120,
    },
    {
      title: "SEVERITY_NO",
      dataIndex: "SEVERITY_NO",
      key: "SEVERITY_NO",
      width: 105,
    },
    {
      title: "SEVERITY_DETAIL",
      dataIndex: "SEVERITY_DETAIL",
      key: "SEVERITY_DETAIL",
      width: 150,
    },
    {
      title: "COMMENT1",
      dataIndex: "COMMENT1",
      key: "COMMENT1",
    },
    {
      title: "COMMENT2",
      dataIndex: "COMMENT2",
      key: "COMMENT2",
    },
  ];

  const bladeOpt = [
    { label: "Leading_Edge", value: "Leading_Edge" },
    { label: "Pressure_Side", value: "Pressure_Side" },
    { label: "Suction_Side", value: "Suction_Side" },
    { label: "Trailing_Edge", value: "Trailing_Edge" },
  ];

  // 드롭다운 발전기 조회
  const getGenerator = async () => {
    const data = { id: id };
    const res = await DetailBox(data);
    if (res.data.status === "OK") setGeneratorBox(res.data.data);
  };

  // 드롭다운 점검일 조회
  const getInspectionDate = async (key) => {
    const data = { id: id, gen_code: key !== undefined ? key : detail.gen_code, check_dt: check_m };
    const res = await DetailBox(data);
    if (res.data.status === "OK") setInspectionDate(res.data.data);
  };

  // 바 차트 조회
  const getStackedChart = async () => {
    const data = { gen_code: detail.gen_code, check_dt: detail.check_dt };
    const res = await StackedChart(data);
    if (res.data.status === "OK") setStackedChart(res.data.data);
  };

  // 파이 차트 조회
  const getDonutChart = async () => {
    const data = { gen_code: detail.gen_code, check_dt: detail.check_dt, blade: blade, blade_side: bladeSide };
    const res = await PieChart(data);
    if (res.data.status === "OK") setDonutChart(res.data.data);
  };

  // 이미지 리스트 조회
  const getImageList = async () => {
    const data = {
      gen_code: detail.gen_code,
      check_dt: detail.check_dt,
      blade: blade,
      blade_side: bladeSide,
      detection: detectionNum,
    };
    const res = await ImageListBox(data);
    if (res.data.status === "OK") setImageList(res.data.data);
  };

  const getSummary = async () => {
    const data = { gen_code: detail.gen_code };
    const res = await summary(data);
    if (res.data.status === "OK") setSummaryList(res.data.data);
  };

  // 이미지 뷰어
  const handleOpenImage = async (id) => {
    loadingScreen("show");
    const res = await ImageView({ id: id });
    if (res.data.status === "OK") setImageView(res.data.data[0]);
    loadingScreen("hide");
  };

  // 엑셀 테이블 뷰어
  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setLoading(true);
    await getSummary();
    setLoading(false);
  };

  // 엑셀 다운로드
  const handleOnDownload = () => {
    const ws = xlsx.utils.json_to_sheet(summaryList);
    const wb = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, `summary_${Date.now()}.xlsx`);
  };

  useEffect(() => {
    try {
      getStackedChart();
      getDonutChart();
      getGenerator();
      getInspectionDate();
      getImageList();
    } catch (e) {
      console.log(e);
      alert("잠시 후 다시 시도해주세요.");
    }
  }, [id, detail.gen_code, detail.check_dt, blade, bladeSide, detectionNum]);

  useEffect(() => {
    setbladeside("Leading_Edge");
    setDetectionNum(null);
  }, [blade]);

  useEffect(() => {
    setDetectionNum(null);
  }, [bladeSide]);

  const ImgaeStyle = {
    filter: `brightness(${brightness * 2}%) saturate(${saturate * 5}%)`,
  };

  const formatter = (value) => `${value} %`;

  const handleOnSliderInit = () => {
    setBrightness(50);
    setSaturate(20);
  };

  return (
    <div className="detail">
      <div className="detail_header">
        <div className="detail_header_info">
          <span className="detail_header_title">Inspection Details</span>
          <div className="detail_header_title_container">
            <p className="detail_header_target">{detail.powerPlant}</p>
            <span className="detail_header_options">
              <Select
                placeholder="발전기"
                style={{ width: 120 }}
                value={generatorBox?.filter((v) => v.gen_code === detail.gen_code)[0]?.gen_nm}
                options={generatorBox.map((v) => ({ label: v.gen_nm, value: v.gen_code }))}
                onChange={(e) => setDetail({ ...detail, gen_code: e, check_dt: [] })}
              />
            </span>
            <span className="detail_header_options">
              <Select
                placeholder="점검일"
                value={detail.check_dt}
                style={{ width: 120 }}
                options={inspectionDate.map((v) => ({ label: v, value: v }))}
                onChange={(e) => setDetail({ ...detail, check_dt: e })}
              />
            </span>
          </div>
          <Button className="detail_header_open_popup btn-default" onClick={() => handleOpenModal()}>
            SUMMARY
          </Button>
        </div>
      </div>
      <div className="detail_body">
        <div className="detail_body_content_top">
          <WindBladeDetail setblade={setblade} />
          <WindBladeSingle setbladeside={setbladeside} bladeSide={bladeSide} />
          <StackedColumnChart stackedChart={stackedChart} />
        </div>
        <div className="detail_body_content_bottom">
          <div className="detail_body_content_container">
            <p className="detail_body_title">Blade Detail Information</p>
            {donutchart === "Empty Data" ? (
              <div className="row_text">데이터가 존재하지 않습니다.</div>
            ) : (
              <div className="detail_body_content_wrap">
                <DonutChart donutchart={donutchart} />
                <Table dataSource={dataSource} columns={columns} pagination={false} size="middle" />
              </div>
            )}
          </div>
          <div className="detail_body_content_container">
            <div className="detail_body_title_container">
              <p className="detail_body_title">Detection Image List</p>
              <div className="dection_image_select_container">
                <Select
                  placeholder="Blade Side"
                  style={{ width: 130 }}
                  value={bladeSide}
                  options={bladeOpt}
                  onChange={(e) => setbladeside(e)}
                />
                <Select
                  value={detectionNum}
                  placeholder="위험도"
                  style={{ width: 100 }}
                  options={detectionOpt}
                  onChange={(e) => setDetectionNum(e)}
                />
              </div>
            </div>
            <div className="dection_image_list_container">
              {imageList === "Empty Data" ? (
                <div className="row_text">데이터가 존재하지 않습니다.</div>
              ) : (
                imageList?.map((v, i) => (
                  <div key={i} className="dection_image_list_wrap">
                    <div className="dection_image_list_title">
                      <span className="color" style={{ background: dangerColors[v.detection] }} />
                      {v.file_name}
                    </div>
                    <Button value={i} className={`btn-default btn-view ${i === parseInt(viewClass) ? "selected" : ""}`} size="small" style={{fontWeight:300, letterSpacing:1}} onClick={(e) => {
                      handleOpenImage(v.id);
                      toggleViewClass(e);
                      }} >  
                      VIEW
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="detail_body_content_container">
            <p className="detail_body_title">Detection Image</p>
            <div className="detection_image_container">
              {imageView.a_img_path ? (
                // <img alt="image" src={`/images${imageView.a_img_path}`} />  //배포시 주석 해제
                <img
                  alt="image"
                  src={`http://211.206.127.131/images${imageView.a_img_path}`}
                  onClick={() => setIsModalImageOpen(true)}
                />
              ) : (
                <Result title="좌측에서 VIEW 버튼을 눌러 확인해주세요." />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Summary Info."
        open={isModalOpen}
        onOk={() => handleOnDownload()}
        okText="다운로드"
        onCancel={() => setIsModalOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        width="80%"
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 18 }} />
        ) : (
          <Table
            dataSource={summaryList}
            columns={columns_summary}
            pagination={false}
            size="middle"
            scroll={{ y: 600 }}
          />
        )}
      </Modal>
      <Modal
        title="Detection Image."
        open={isModalImageOpen}
        onCancel={() => setIsModalImageOpen(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        width="70%"
      >
        <div className="detection_image_container_popup">
          <TransformWrapper initialScale={1} minScale={1} maxScale={10}>
            <TransformComponent>
              <figure>
                <img alt="image" src={`http://211.206.127.131/images${imageView.a_img_path}`} style={ImgaeStyle} />
                {/* <img alt="image" src={`/images${imageView.a_img_path}`} /> 배포시 주석 해제 */}
              </figure>
            </TransformComponent>
          </TransformWrapper>
          <TransformWrapper initialScale={1} minScale={1} maxScale={10}>
            <TransformComponent>
              <figure>
                <img alt="image" src={`http://211.206.127.131/images${imageView.o_img_path}`} style={ImgaeStyle} />
                {/* <img alt="image" src={`/images${imageView.a_img_path}`} /> 배포시 주석 해제 */}
              </figure>
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="detection_image_container_popup_slider">
          <span>밝기</span>
          <Slider value={brightness} onChange={(val) => setBrightness(val)} tooltip={{ formatter }} />
        </div>
        <div className="detection_image_container_popup_slider">
          <span>채도</span>
          <Slider value={saturate} onChange={(val) => setSaturate(val)} tooltip={{ formatter }} />
        </div>
        <button className="btn btn-default detection_image_container_popup_slider_init" style={{letterSpacing:"1px"}} onClick={() => handleOnSliderInit()}>
          원본 이미지
          <RedoOutlined style={{marginLeft:'4px'}} />
        </button>
      </Modal>
    </div>
  );
};

export default Detail;
