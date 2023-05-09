import { useNavigate } from "react-router-dom";
import logo from "../asset/images/logo.png";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="forbidden-page">
        <div
          className="forbidden-msg"
          onClick={() => {
            navigate("/");
          }}
        >
          <div style={{ width: "100%" }}>
            <img alt="logo" src={logo} width={190} />
          </div>
          <h1 style={{ width: "100%", marginTop: "15px" }}>접근이 금지된 페이지입니다</h1>
          <p>클릭하여 이전페이지로 돌아가기</p>
        </div>
      </div>
    </>
  );
};

export default Forbidden;
