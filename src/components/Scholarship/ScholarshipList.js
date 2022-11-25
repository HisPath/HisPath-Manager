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
import { scholarshipListState, semesterState } from "../../atom";
import * as React from "react";
import ViewScholarshipRegistered from "./ViewScholarshipRegistered";
import { SelectColumnFilter } from "./filters";
import ScholarshipListTable from "./ScholarshipListTable";
import { Paper } from "@mui/material";
import { getScholarshipList, getSemesters } from "../../apis/scholarship";

const Article = styled(Box)({
  height: "calc(100vh - 250px)",
  paddingBottom: 24,
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 800,
  p: 3.5,
  borderRadius: 1,
};

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
  // {
  //   accessor: "major2Name",
  //   Header: "2전공",
  //   Filter: SelectColumnFilter,
  // },
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
    Header: "총 가중치",
  },
  // {
  //   accessor: "result",
  //   Header: "수혜 금액",
  // },
  {
    accessor: "phone",
    Header: "전화번호",
  },
  {
    accessor: "email",
    Header: "이메일",
  },
];

function ScholarshipList() {
  const [init, setInit] = useState(false);
  const [scholarshipLists, setScholarshipLists] =
    useRecoilState(scholarshipListState);
  const [semester] = useRecoilState(semesterState);
  const [currentId, setCurrentId] = useState();

  const [openView, setOpenView] = useState(false);
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScholarshipList(semester);
      setScholarshipLists(data);
      setInit(true);
    };
    fetchData();
  }, [semester]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSemesters();
      const studentSet = new Set();
      response?.forEach((item) => studentSet.add(item.semester));
      setInit(true);
    };
    fetchData();
  }, []);

  return (
    <Container component={Paper}>
      <Article>
        {init ? (
          <ScholarshipListTable
            columns={columns}
            data={scholarshipLists}
            initialState={{ showColumnFilters: true }}
            muiTableHeadCellFilterTextFieldProps={{
              sx: { m: "0.5rem 0", width: "100%" },
              variant: "outlined",
            }}
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
          <Typography variant="h6" component="h2"></Typography>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default ScholarshipList;
