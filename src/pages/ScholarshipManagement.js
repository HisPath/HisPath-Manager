import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { scholarshipState } from "../atom";
import axios from "axios";
import ScholarshipRegisteredTable from "../components/Scholarship/ScholarshipRegisteredTable";
import ViewScholarshipRegistered from "../components/Scholarship/ViewScholarshipRegistered";
import { SelectColumnFilter } from "../components/Scholarship/filters";
import LinkTabs from "../components/Scholarship/ScholarshipTabs";
import { InputLabel } from "@mui/material";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 200px)",
});

const columns = [
  {
    accessor: "departmentName",
    Header: "학부",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "major1Name",
    Header: "1전공",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "major2Name",
    Header: "2전공",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "name",
    Header: "이름",
  },
  {
    accessor: "studentNum",
    Header: "학번",
  },
  {
    accessor: "totalWeight",
    Header: "가중치",
  },
  {
    accessor: "phone",
    Header: "전화번호",
  },
  {
    accessor: "email",
    Header: "이메일",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 800,
  p: 3.5,
  borderRadius: 4,
};

function ScholarshipManagement() {
  const [init, setInit] = useState(false);
  const [scholarships, setScholarships] = useRecoilState(scholarshipState);
  const [currentId, setCurrentId] = useState();
  const [openView, setOpenView] = useState(false);
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);
  const loadData = () => {
    axios
      .get(`/api/scholarships?approved=true&semester=2022-2`)
      .then(function (response) {
        setScholarships(response.data);
        setInit(true);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5">마일리지 장학금 관리 페이지</Typography>
      </Header>
      <LinkTabs></LinkTabs>
      <Article>
        {init ? (
          <ScholarshipRegisteredTable
            columns={columns}
            data={scholarships}
            handleOpenView={handleOpenView}
          />
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Article>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            (2022-2) 마일리지 신청 목록
          </Typography>
          <InputLabel>[전산전자] 박성진 (21700266)</InputLabel>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default ScholarshipManagement;
