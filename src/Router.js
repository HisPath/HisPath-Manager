import { Box, Toolbar } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import MileageActivity from "./pages/MileageActivity";
import MileageParticipant from "./pages/MileageParticipant";
import Sample from "./pages/Sample";
import Notice from "./pages/Notice";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import AxiTest from "./AxiTest";
import Student from "./pages/Student";
import Department from "./pages/Department";
import Major from "./pages/Major";
import Category from "./pages/Category";
import ScholarshipManagement from "./pages/ScholarshipManagement";
import ScholarshipListDirection from "./pages/ScholarshipListDirection";
import AdminManagement from "./pages/AdminManagement";
import { drawerWidth } from "./constants/commons";
import Sidebar from "./components/common/Sidebar";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import Page404 from "./pages/Page404";
import { getDashboardInfo } from "./apis/dashboard";
import GuestLoginModal from "./components/profile/GuestLoginModal";

function Router() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegisted, setIsRegisted] = useState(false);
  useEffect(() => {
    const getUserStatus = async () => {
      const token = localStorage.getItem("TOKEN");
      await getDashboardInfo()
        .then(() => setIsRegisted(true))
        .catch(() => setIsRegisted(false));
      if (token) {
        setIsLogin(true);
      }
    };
    getUserStatus();
  }, []);
  return (
    <BrowserRouter>
      {isLogin && <Header />}
      <Box display="flex">
        {isLogin && <Sidebar />}
        <Box
          component="main"
          sx={
            isLogin
              ? {
                  flexGrow: 1,
                  p: 3,
                  pt: 5,
                  width: `calc(100% - ${drawerWidth}px)`,
                }
              : null
          }
        >
          <Toolbar />
          <Routes>
            {isLogin ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/axitest" element={<AxiTest />} />
                <Route path="/mileage/activity" element={<MileageActivity />} />
                <Route
                  path="/mileage/participant"
                  element={<MileageParticipant />}
                />
                <Route path="/sample" element={<Sample />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/editpost/:noticeId" element={<EditPost />} />
                <Route path="/notice/:noticeId" element={<Post />} />
                <Route path="/student" element={<Student />} />
                <Route path="/major" element={<Major />} />
                <Route path="/department" element={<Department />} />
                <Route path="/category" element={<Category />} />
                <Route
                  path="/scholarship/management"
                  element={<ScholarshipManagement />}
                />
                <Route
                  path="/scholarship/lists"
                  element={<ScholarshipListDirection />}
                />
                <Route path="/admin/management" element={<AdminManagement />} />
                <Route path="*" element={<Page404 />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </Box>
      </Box>
      <GuestLoginModal isLogin={isLogin} isRegisted={isRegisted} />
    </BrowserRouter>
  );
}

export default Router;
