import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Student from "./pages/Student";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/studentList" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
