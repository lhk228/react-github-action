import { Select, Button, Slider, Upload, message } from 'antd';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons";
import { alertState, loadingState, userState } from "../recoil/state";
import { api_InspectionImageList, regionBox, powerPlantBox } from "../apis/api"

//AI 점검
const ModelInspection = ({option_size, option_weights}) => {
	const LOGIN_INFO = useRecoilValue(userState);
	const toastAlert = useSetRecoilState(alertState);
  const loadingScreen = useSetRecoilState(loadingState);
	const [FolderPath, setFolderPath] = useState('');
	const [inputImage, setInputImage] = useState([]);
	const [previewImage, setPreviewImage] = useState('');
	const [uploadList, setUploadList] = useState([]);
	const [filterBox, setFilterBox] = useState({ region: [], powerPlant: [] });
	const [selectValue, setSelectValue] = useState({image_size:'', weights:'', conf:'', user_id:'', region:'', pp_code:''});
	const [powerPlant, setpowerPlant] = useState(null);

	const { Dragger } = Upload;

	useEffect(() => {
		setSelectValue(selectValue => ({...selectValue, user_id:LOGIN_INFO.user_id, weights:'yolov7x-seg.pt'}));
		try {
			getRegion();
		} catch (e) {
			console.log(e);
			toastAlert({show: true,type: "warn",msg: `잠시 후 다시시도해주세요`,delay: 1000});
		}
	}, []);

	// 드롭다운 지역 조회
	const getRegion = async () => {
		const res = await regionBox();
		if (res.data.status === "OK") setFilterBox({ ...filterBox, region: res.data.data });
		else toastAlert({show: true,type: "warn",msg: `잠시 후 다시시도해주세요`,delay: 1000});
	};

	// 드롭다운 발전소 조회
	const getPowerPlant = async (value) => {
		setpowerPlant(null);
		setSelectValue({...selectValue, region:value})

		const data = { region_cd: value };
		const res = await powerPlantBox(data);
		if (res.data.status === "OK") setFilterBox({ ...filterBox, powerPlant: res.data.data });
		else toastAlert({show: true,type: "warn",msg: `잠시 후 다시시도해주세요`,delay: 1000});
	};

	//base64 코드 가져오기
	const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

	//슬라이더 설정
	const formatter = (value) => {
		return value / 100;
	};

	//드래그 파일업로드 설정
	const uploadSetting = {
		name: "file",
		multiple: false,
		// action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		beforeUpload: file => {
			return false;	// 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
		},
		async onChange(info) {
			const { status } = info.file;

			console.log('status :',status);
			setInputImage(info.fileList.slice(-1)) //파일 최대 1개만 선택되도록 fileList를 1개로 유지한다

			if(status === "removed"){setPreviewImage('');}
			let base64 = await getBase64(info.file);
			setPreviewImage(base64);
			
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} 업로드에 성공했습니다.`);
			} else if (status === "error") {
				message.error(`${info.file.name} 업로드에 실패했습니다.`);
			}
		},
		onDrop(e) {
			e.preventDefault(); //브라우저 파일오픈 막기
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	//선택한 파일목록 만들기
	const makeFileList = (e) => {
		let files = e.target.files;
		let fileCnt = files.length;
		let folderName = files[0].webkitRelativePath.split('/')[0];

		console.log('files :',files);

		let tmp_arr = Array.from(files);
		setUploadList(tmp_arr);

		if(fileCnt === 0){
			toastAlert({show: true,type: "warn",msg: `폴더가 비어있습니다`,delay: 1000});
			return;
		}

		setFolderPath(`${folderName} 폴더 / ${fileCnt}개의 이미지 파일`);
	}

	//점검시작 클릭
	const handleInspection = async () => {
		loadingScreen('show');
		let formData = new FormData();

		console.log('selectValue :',selectValue);

		//폼데이터에 추가
		for (const key in selectValue){
			formData.append(`${key}`,selectValue[key]);	
		}

		uploadList.forEach((v) => { 
			let tmp_copy = new File([v], `${v.name}`,{ type:v.type, webkitRelativePath:''});
			formData.append('files',tmp_copy);	
		})

		//폼데이터 로그보기
		for (var pair of formData.entries()) {
			console.log("formdata :", pair);
		}

		const result = await api_InspectionImageList(formData);
		
		loadingScreen('hide');

		toastAlert({
			show: true,
			type: "ok",
			msg: `점검`,
			delay: 1500,
		});

		return result;
		
	}

	const inputOnlyNumber = (e) => {
		let input = e.target.value;
		if(!isFinite(input)){ toastAlert({type:'alert', msg:"숫자만 입력해주세요"}); e.target.value = input.replace(/[^0-9]/g, ""); }
	}

	return (
		<div className="model-analyze-container">
		<div className="analyze-wrapper box">
			<h3 className="box-title">AI 점검</h3>
			<div className="input-wrap">
				<p className="input-title">IMAGE SIZE</p>
				<Select
					placeholder="선택"
					options={option_size}
					onChange={(v) => setSelectValue({...selectValue, image_size:v})}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">WEIGHTS</p>
				<Select
					defaultValue="yolov7x-seg.pt"
					options={option_weights}
					onChange={(v) => setSelectValue({...selectValue, weights:v})}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">CONF</p>
				<input
					type="text"
					placeholder="0.25"
					onChange={(e) => { 
						inputOnlyNumber(e);
						if(e.target.value > 1) { toastAlert({type:'alert', msg:'0 ~ 1 사이의 값만 입력하실 수 있습니다'}); e.target.value =""; }
						setSelectValue({...selectValue, conf:e.target.value}) 
					}}
				/>
			</div>
			<div className="input-wrap">
				<p className="input-title">SOURCE</p>
				<div className="input-file-wrap">
					{/* <input type="file" id="FolderPath" style={{display:"none"}} onChange={makeFileList}/> */}
					<input type="file" webkitdirectory="" id="FolderPath" style={{display:"none"}} onChange={makeFileList} multiple/>
					<input className="input-filename" type="text" placeholder="이미지 폴더 선택" value={FolderPath} readOnly style={{pointerEvents:"none", color:"#0c70f2"}}/>
					<label className="btn-file-upload" htmlFor="FolderPath">폴더선택</label>
				</div>
			</div>
			<div className="input-wrap">
				<p className="input-title">NAME</p>
				<Select
						style={{ width: 120 }}
						placeholder="지역 선택"
						onChange={(v) => (v !== undefined ? getPowerPlant(v) : null)}
						size="large"
						options={filterBox?.region.map(({ region_nm, region_cd }) => ({ value: region_cd, label: region_nm }))}
					/>
					<Select
						style={{ width: 120 }}
						placeholder="발전소 선택"
						value={powerPlant}
						size="large"
						onChange={(v) => { setpowerPlant(v); setSelectValue({...selectValue, pp_code:v}) } }
						options={filterBox?.powerPlant.map(({ pp_code, pp_nm }) => ({ value: pp_code, label: pp_nm }))}
					/>
			</div>
			<Button type="primary" style={{width:"100%", marginTop:"75px", height:"40px"}} onClick={handleInspection}>점검시작</Button>
		</div>
			<div className="test-wrapper box">
				<h3 className="box-title" style={{display:"flex", justifyContent:"space-between"}}>
					<p>샘플 테스트</p>
					<div className="select-wrap">
						<span>IMAGE SIZE</span>
						<Select
							defaultValue={option_size[0]}
							options={option_size}
							onChange={(v) => {'aa'}}
						/>
						<span>WEIGHTS</span>
						<Select
							defaultValue={option_weights[0]}
							options={option_weights}
							onChange={(v) => {'aa'}}
						/>
					</div>
				</h3>
				<span className="model_title">신뢰도 설정</span>
				<Slider defaultValue={30} marks={{ 0: 0, 100: 1 }} tooltip={{ formatter }} />
				<span className="model_title">이미지 설정</span>
				<div className="model_contents">
					<div className="imagebox-wrap">
						<div id="IMAGE_PREVIEW" style={{backgroundImage:`url(${previewImage})`}}></div>
						<Dragger {...uploadSetting} fileList={inputImage} accept='image/*'>
							<UploadOutlined style={{ fontSize: "72px" }} />
							<p className="dragdrop_title">Input</p>
						</Dragger>
					</div>
					<div className="imagebox-wrap">
						<div className="dragdrop_output">
							<FileImageOutlined style={{ fontSize: "72px" }}/><br></br>
							Output
						</div>
					</div>
				</div>
				<Button type="primary" style={{width:"100%", marginTop:"32px", height:"40px"}}>테스트 변환</Button>
			</div>
		</div>
	)
}

export default ModelInspection;