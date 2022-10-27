import { Box, Toolbar } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import MileageActivity from "./pages/MileageActivity";
import MileageParticipant from "./pages/MileageParticipant";
import Sample from "./pages/Sample";
import { drawerWidth } from "./constants/commons";
import Sidebar from "./components/common/Sidebar";

function Router() {
  return (
    <BrowserRouter>
      <Box display="flex">
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 5,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mileage/activity" element={<MileageActivity />} />
            <Route
              path="/mileage/participant"
              element={<MileageParticipant />}
            />
            <Route path="/sample" element={<Sample />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default Router;
