import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import MileageActivity from "./pages/MileageActivity";
import MileageParticipant from "./pages/MileageParticipant";
import Sample from "./pages/Sample";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mileage/activity" element={<MileageActivity />} />
        <Route path="/mileage/participant" element={<MileageParticipant />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
