import { useEffect, useState } from "react";
import {
  Box,
  Backdrop,
  CircularProgress,
  FormControl,
  Container,
  Modal,
  styled,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../components/Student/CustomNoRowsOverlay";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useRecoilState } from "recoil";
import { scholarshipState } from "../atom";
import ViewScholarshipRegistered from "../components/Scholarship/ViewScholarshipRegistered";
import axios from "axios";
import * as React from "react";
import LinkTabs from "../components/Scholarship/ScholarshipTabs";
import ScholarshipTable from "../components/Scholarship/ScholarshipTable";

const Header = styled("div")({
  height: "15%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 236.5px)",
});

const columns = [
  // {
  //   field: "id",
  //   headerName: "번호",
  //   width: 30,
  // },
  {
    accessor: "departmentName",
    headerName: "학부",
    // width: 150,
  },
  {
    accessor: "major1Name",
    headerName: "2전공",
    // width: 120,
  },
  {
    accessor: "major2Name",
    headerName: "2전공",
    // width: 120,
  },
  {
    accessor: "name",
    headerName: "이름",
    // width: 70,
  },
  {
    accessor: "studentNum",
    headerName: "학번",
    // width: 90,
  },
  {
    field: "semester",
    headerName: "학기",
    // width: 40,
  },
  {
    accessor: "weight",
    headerName: "가중치",
    // width: 60,
  },
  {
    accessor: "phone",
    headerName: "전화번호",
    // width: 120,
  },
  {
    accessor: "email",
    headerName: "이메일",
    // width: 220,
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 805,
  p: 3.5,
  borderRadius: 4,
};

function ScholarshipManagement() {
  const [init, setInit] = useState(false);
  const [scholarships, setScholarships] = useRecoilState(scholarshipState);
  const [currentId, setCurrentId] = useState(0);

  const [age, setAge] = React.useState("");
  const [openView, setOpenView] = useState(false);
  // const handleOpenView = () => setOpenView(true);
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);

  const loadData = () => {
    axios.get("/api/mileages").then(function (response) {
      setScholarships(response.data);
      setInit(true);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "/api/students",
  //     responseType: "json",
  //   }).then(function (response) {
  //     setScholarship(
  //       response.data.map((item) => {
  //         return { ...item, id: item.studentId };
  //       })
  //     );
  //     console.log(response.data);
  //   });
  // }, []);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Container>
      <Header>
        <Typography variant="h5">마일리지 장학금 신청자 관리</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="semester_id">학기</InputLabel>
          <Select
            labelId="semester_id"
            id="semester_id"
            value={age}
            label="학기"
            onChange={handleChange}
          >
            <MenuItem value={10}>2021-1</MenuItem>
            <MenuItem value={20}>2021-2</MenuItem>
            <MenuItem value={30}>2022-1</MenuItem>
            <MenuItem value={40}>2022-2</MenuItem>
          </Select>
        </FormControl>
      </Header>
      <LinkTabs></LinkTabs>
      <Article>
        {init ? (
          <ScholarshipTable
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

        {/* <DataGrid
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: { disableToolbarButton: true },
            },
          }}
          rows={scholarships}
          columns={[
            ...columns,
            {
              field: "actions",
              type: "actions",
              headerName: "기능",
              width: 60,
              cellClassName: "actions",
              getActions: ({ id }) => {
                return [
                  <GridActionsCellItem
                    icon={<OpenInFullIcon />}
                    label="View"
                    onClick={() => {
                      setCurrentId(+id);
                      handleOpenView();
                    }}
                  />,
                ];
              },
            },
          ]}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableColumnMenu
          disableDensitySelector
          hideFooterSelectedRowCount
        /> */}
      </Article>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            (현학기) 마일리지 신청 목록
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
