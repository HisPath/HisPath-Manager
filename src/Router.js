import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import Mileage from "./pages/Mileage";
import Sample from "./pages/Sample";
import Notice from "./pages/Notice";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import AxiTest from "./AxiTest";
import Student from "./pages/Student";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/axitest" element={<AxiTest />} />
        <Route path="/mileage" element={<Mileage />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/editpost/:noticeId" element={<EditPost />} />
        <Route path="/notice/:noticeId" element={<Post />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
