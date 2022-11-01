import { useEffect, useState } from "react";
import {
  Box,
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
import { scholarshipState, studentState } from "../atom";
import axios from "axios";
import * as React from "react";

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
  {
    field: "id",
    headerName: "번호",
    width: 30,
  },
  {
    field: "departmentName",
    headerName: "학부",
    width: 150,
  },
  {
    field: "major1Name",
    headerName: "1전공",
    width: 120,
  },
  {
    field: "major2Name",
    headerName: "2전공",
    width: 120,
  },
  {
    field: "name",
    headerName: "이름",
    width: 70,
  },
  {
    field: "studentNum",
    headerName: "학번",
    width: 90,
  },
  {
    field: "totalWeight",
    headerName: "가중치",
    width: 60,
  },
  {
    field: "phone",
    headerName: "전화번호",
    width: 120,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 220,
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

function ScholarshipList() {
  const [students, setStudent] = useRecoilState(studentState);
  const [init, setInit] = useState(false);

  const [age, setAge] = React.useState("");
  const [currentId, setCurrentId] = useState(0);
  const [scholarshipList, setScholarshipList] =
    useRecoilState(scholarshipState);

  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const loadData = () => {
    axios
      .get("api/scholarships")
      // ?approved=false&semester=2022-2`)
      .then(function (response) {
        setScholarshipList(response.data);
        setInit(true);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container>
      <Header>
        <Typography variant="h5">마일리지 장학금 신청자 관리</Typography>

        {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        </FormControl> */}
      </Header>
      <Article>
        <DataGrid
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
          rows={students}
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
        />
      </Article>
      {/* <Modal open={openView} onClose={handleCloseView}>
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
      </Modal> */}
    </Container>
  );
}

export default ScholarshipList;
