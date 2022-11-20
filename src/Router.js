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
import ScholarshipManagementTemplate from "./pages/ScholarshipManangementTemplate";
import ScholarshipListDirection from "./pages/ScholarshipListDirection";
import AdminManagement from "./pages/AdminManagement";
import { drawerWidth } from "./constants/commons";
import Sidebar from "./components/common/Sidebar";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function Router() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setIsLogin(true);
    }
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
                {/* <Route
              path="/scholarship/management"
              element={<ScholarshipManagementTemplate />}
            /> */}
                <Route
                  path="/scholarship/lists"
                  element={<ScholarshipListDirection />}
                />
                <Route path="/admin/management" element={<AdminManagement />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default Router;
