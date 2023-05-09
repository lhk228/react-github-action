import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { RecoilRoot } from 'recoil';
import "./asset/style/index.scss";
import "antd/dist/reset.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0b3d6c",
          fontFamily: "PretendardM, spoqaM",
        },
      }}
      >
      <App />
    </ConfigProvider>
  </RecoilRoot>
);
