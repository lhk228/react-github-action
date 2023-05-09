import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from "./page/Login.jsx";
import Main from "./page/Main.jsx";
import Model from "./page/Model.jsx";
import Detail from "./page/Detail.jsx";
import Member from "./page/Member.jsx";
import Forbidden from "./page/Forbidden.jsx";
import MainLayout from "./component/MainLayout.jsx";
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/state.jsx";

const queryClient = new QueryClient();

function App() {
  const USER = useRecoilValue(userState);

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={USER.login ? <Navigate to="/main" /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={!USER.login ? <Login /> : <Navigate to="/main" />} />
        <Route exact path="/forbidden" element={<Forbidden />} />
        <Route element={<MainLayout />}>
            <Route exact path="/main" element={<Main />} />
            <Route exact path="/detail" element={<Detail />} />
            <Route exact path="/model" element={USER.auth === "g718" ? <Model /> : <Navigate to="/forbidden" />} />
            <Route exact path="/member" element={USER.auth === "g718" ? <Member /> : <Navigate to="/forbidden" />} />
          </Route>
        {/* {USER.login ? (
          <Route element={<MainLayout />}>
            <Route exact path="/main" element={<Main />} />
            <Route exact path="/detail" element={<Detail />} />
            <Route exact path="/model" element={USER.auth === "g718" ? <Model /> : <Navigate to="/forbidden" />} />
            <Route exact path="/member" element={USER.auth === "g718" ? <Member /> : <Navigate to="/forbidden" />} />
          </Route>
        ) : (
          <Route path="/:id" element={<Forbidden />} />
        )} */}
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
