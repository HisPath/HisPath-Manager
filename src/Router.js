import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
