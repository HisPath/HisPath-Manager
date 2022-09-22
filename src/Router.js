import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import Mileage from "./pages/Mileage";
import Student from "./pages/Student";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mileage" element={<Mileage />} />
        <Route path="/studentList" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
