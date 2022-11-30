import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Modal,
  styled,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../components/Student/CustomNoRowsOverlay";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useRecoilState } from "recoil";
import { scholarshipState, semesterState } from "../atom";
import { useSnackbar } from "notistack";
import { Paper } from "@mui/material";
import * as React from "react";
import ViewScholarshipRegistered from "../components/Scholarship/ViewScholarshipRegistered";
import {
  approveScholarships,
  getScholarshipListExcel,
  getScholarshipRegistered,
  getSemesters,
  getStudentInfo,
} from "../apis/scholarship";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingTop: 24,
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 250px)",
  paddingBottom: 24,
});

const columns = [
  {
    field: "ids",
    headerName: "번호",
    width: 30,
  },
  {
    field: "departmentName",
    headerName: "학부",
    width: 130,
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

function ScholarshipManagement() {
  const { enqueueSnackbar } = useSnackbar();
  const [setInit] = useState(false);
  const [scholarships, setScholarships] = useRecoilState(scholarshipState);
  const [semester, setSemester] = useRecoilState(semesterState);
  const [currentId, setCurrentId] = useState();
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };

  const [openView, setOpenView] = useState(false);
  const handleCloseView = () => setOpenView(false);

  const onChangeExcel = async (event) => {
    const { files } = event.target;
    const formData = new FormData();
    formData.append(
      "semester",
      new Blob([semester], { type: "application/json" })
    );

    formData.append("file", files[0]);

    await approveScholarships(formData)
      .then(function (response) {
        enqueueSnackbar("마일리지 장학금 신청자 승인을 완료하였습니다.", {
          variant: "success",
        });
        loadData();
      })
      .catch(function (error) {
        setDialogContent(error.response.data.message);
        setDialogOpen(true);
      });
    loadData();
  };
  const excelExport = async () => {
    getScholarshipListExcel(semester);
  };

  const loadData = async () => {
    const data = await getScholarshipRegistered(semester);
    const datas = data;
    datas.map((data, idx) => {
      data.ids = idx + 1;
    });
    setScholarships(
      data.map((item) => {
        return { ...item, id: item.studentId };
      })
    );
    setInit(true);
  };
  useEffect(() => {
    loadData();
  }, [semester]);

  const handleChanges = (event) => {
    setSemester(event.target.value);
  };
  const [semesters, setSemesters] = React.useState([]);
  const [setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSemesters();
      const studentSet = new Set();
      response?.forEach((item) => studentSet.add(item.semester));
      setSemesters([...studentSet]);
      setData(response);
      setInit(true);
    };
    fetchData();
  }, []);

  const [setInfo] = React.useState([]);
  const getInfo = async () => {
    const info = await getStudentInfo();
    setInfo(info);
  };
  useEffect(() => {
    getInfo();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [dialogContent, setDialogContent] = useState();
  useEffect(() => {
    loadData();
  }, []);
  console.log(dialogContent);
  return (
    <Container component={Paper}>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          마일리지 장학금 신청자 관리
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            gap={1.5}
          >
            <Button component="a" onClick={excelExport} variant="outlined">
              마일리지 신청자 목록 다운로드
            </Button>
            <Button component="label" variant="outlined">
              승인 목록 업로드
              <input
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={onChangeExcel}
                hidden
              />
            </Button>
          </Box>
          <FormControl sx={{ minHeight: 10, minWidth: 120 }}>
            <InputLabel id="semester_id">학기</InputLabel>
            <Select
              size="small"
              labelId="semester_id"
              id="semester_id"
              value={semester}
              label="학기"
              onChange={handleChanges}
            >
              {semesters.map((s, idx) => {
                return (
                  <MenuItem key={idx} value={s}>
                    {s}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
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
          rows={scholarships}
          columns={[
            ...columns,
            {
              field: "actions",
              type: "actions",
              headerName: "신청 목록 조회",
              width: 150,
              cellClassName: "actions",
              getActions: ({ id }) => {
                return [
                  <GridActionsCellItem
                    icon={<OpenInFullIcon />}
                    label="View"
                    onClick={() => {
                      setCurrentId(+id);
                      handleOpenView(+id);
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
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 신청 목록
          </Typography>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
            semester={semester}
          />
        </Box>
      </Modal>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>잘못된 승인 정보</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent.split("\n").map((line, index) => {
              return (
                <span key={index}>
                  {line}
                  <br />
                </span>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ScholarshipManagement;
