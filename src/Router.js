import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Students from "./pages/Students";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/studentList" element={<Students />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
