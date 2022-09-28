import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Header from './components/common/Header';
import Notice from './pages/Notice';
import Post from './pages/Post';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/mileage" element={<Mileage />} /> */}
        <Route path="/notice" element={<Notice />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/editpost/:noticeid" element={<EditPost />} />
        <Route path="/notice/:noticeid" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
