import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
<<<<<<< HEAD
import Mileage from "./pages/Mileage";
=======
>>>>>>> dev
import Student from "./pages/Student";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
<<<<<<< HEAD
        <Route path="/mileage" element={<Mileage />} />
=======
>>>>>>> dev
        <Route path="/studentList" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
