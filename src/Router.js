import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import Mileage from "./pages/Mileage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mileage" element={<Mileage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
