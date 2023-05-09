import { Select, Button, Table, Modal } from 'antd';
import { useState } from "react";
import { FileImageOutlined, LineChartOutlined } from "@ant-design/icons";
import result_img from "../asset/images/result_img.png";
import graph_img from "../asset/images/graph_img.png";

//AI 학습
const ModelTrain = ({option_size, option_weights, option_hyp, toastAlert}) => {
	const [DATA_PATH, setDATA_PATH] = useState('');
	const [modal, setModal] = useState({open:false, title:'NAME', image:''});

	//테이블 컬럼
	const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: "10%",
      render: (text, record, index) => {
        return <span style={{ fontWeight: "bold" }}>{text}</span>;
      },
    },
    {
      title: "이미지",
      dataIndex: "image",
      key: "image",
      width: "40%",
			render : (_, record) => <FileImageOutlined onClick={() => {setModal({open:true, title:record.name, image:result_img});}}/>
    },
    {
      title: "그래프",
      dataIndex: "graph",
      key: "graph",
      width: "30%",
			render :(_, record) => <LineChartOutlined onClick={() => {setModal({open:true, title:record.name, image:graph_img});} }/>
    },
  ];

	//임시 학습결과 데이터
	const dummy = (cnt) => {
		let tmp_arr = [];
		
		for(let i=1; i<=cnt; i++)
		{
			var tmp_obj = { name:`EXP${i}`, id : i};

			tmp_arr.push(tmp_obj);
		}
		return tmp_arr;
	}
	const dataSource = dummy(20);

	const inputOnlyNumber = (e) => {
		let input = e.target.value;
		if(!isFinite(input)){ toastAlert({type:'alert', msg:"숫자만 입력해주세요"}); e.target.value = input.replace(/[^0-9]/g, ""); }
	}

	return (
	<>
	<div className="model-train-container">
		<div className="train-wrapper box">
			<h3 className="box-title">학습설정</h3>
			{/* <div className="train-description-wrap">
				<p>탐지모델의 초매개변수 가중치를 설정합니다</p>
				<p>완료시 우측의 학습결과 목록에 표시됩니다</p>
			</div> */}
			<div className="input-wrap">
				<p className="input-title">IMAGE SIZE</p>
				<Select
					placeholder="선택"
					options={option_size}
					onChange={(v) => {'aa'}}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">EPOCH</p>
				<input
					type="text"
					placeholder="300"
					onChange={e => { inputOnlyNumber(e); }}

				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">BATCH SIZE</p>
				<input
					type="text"
					placeholder="16"
					onChange={e => { inputOnlyNumber(e); }}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">WEIGHTS</p>
				<Select
					defaultValue="yolov7x-seg.pt"
					options={option_weights}
					onChange={(v) => {'aa'}}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">HYP</p>
				<Select
					defaultValue="hyp.scratch-high.yaml"
					options={option_hyp}
					onChange={(v) => {'aa'}}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">DATA</p>
				<div className="input-file-wrap">
					<input type="file" id="DATA_FILE" accept=".yaml" style={{display:"none"}} onChange={(e) => {setDATA_PATH(e.target.files[0].name);} }/>
					<input className="input-filename" type="text" placeholder="파일선택(*.yaml)" value={DATA_PATH} readOnly style={{pointerEvents:"none", color:"#0c70f2"}}/>
					<label className="btn-file-upload" htmlFor="DATA_FILE">파일선택</label>
				</div>
			</div>
			<div className="input-wrap">
				<p className="input-title">NAME</p>
				<input
					type="text"
					placeholder="EXP 1"
					onChange={(e) => {'kk'}}
				/>
			</div>
			<Button type="primary" style={{width:"100%", marginTop:"8px", height:"40px"}}>학습하기</Button>
		</div>

		<div className="vaildation-wrapper box">
		<h3 className="box-title">학습결과</h3>
			<Table scroll={{ y: 500 }} dataSource={dataSource} columns={columns} pagination={false} size="middle" rowKey={(render) => render.name}/>
		</div>
	</div>
	<Modal width={800} centered title={modal.title} open={modal.open} onCancel={()=>{setModal({...modal, open:false})}} footer={[]}>
		<img className="image-popup" src={modal.image} alt="" />
	</Modal>
	</>

	)
}

export default ModelTrain;