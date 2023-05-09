import { Tabs } from 'antd';
import { useSetRecoilState } from "recoil";

import { alertState } from "../recoil/state";
import ModelTrain from "../component/ModelTrain"
import ModelInspection from "../component/ModelInspection"
const Model = () => {
	const toastAlert = useSetRecoilState(alertState);
	
	//이미지 사이즈 옵션
	const option_size =[
		{
			value: 640,
			label: "640",
		},
		{
			value: 320,
			label: "320",
		},
	];

	//WEIGHT 옵션
	const option_weights = [
    {
      value: "yolov7x-seg.pt",
      label: "yolov7x-seg.pt",
    },
    {
      value: "yolov7-seg.pt",
      label: "yolov7-seg.pt",
    },
  ];

	//HYP 옵션
	const option_hyp = [
		{
			value:"hyp.scratch-high.yaml",
			label:"hyp.scratch-high.yaml"
		},
		{
			value:"hyp.scratch-med.yaml",
			label:"hyp.scratch-med.yaml"
		},
		{
			value:"hyp.scratch-low.yaml",
			label:"hyp.scratch-low.yaml"
		},
	]

	//텝매뉴
	const tab = [
		{
			key: '1',
			label: `AI 학습`,
			children: <ModelTrain toastAlert={toastAlert} option_size={option_size} option_weights={option_weights} option_hyp={option_hyp}/>,
		},
		{
			key: '2',
			label: `AI 점검`,
			children: <ModelInspection toastAlert={toastAlert} option_size={option_size} option_weights={option_weights}/>,
		},
	];

	const tabChange = (key) => {
		switch(key)
		{
			case "1":
				toastAlert({show: true,type: "ok",msg: `AI 학습`,delay: 1000});
			break;
			case "2":
				toastAlert({show: true,type: "ok",msg: `AI 점검`,delay: 1000});
			break;
			default:break;
		}

	};
	return (
		<div className="model">
			<Tabs centered defaultActiveKey="1" items={tab} onChange={tabChange} size={"large"} />
		</div>
	);
};

export default Model;
