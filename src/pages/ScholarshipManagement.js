import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../components/Student/CustomNoRowsOverlay";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useRecoilState } from "recoil";
import { studentState } from "../atom";
import AddStudent from "../components/Student/AddStudent";
import ViewScholarshipRegistered from "../components/Management/ViewScholarshipRegistered";
import EditStudent from "../components/Student/EditStudent";
import axios from "axios";
import studentRegisterExcel from "../assets/student_register.xlsx";

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
    width: 60,
  },
  {
    field: "departmentName",
    headerName: "학부",
    width: 200,
  },
  {
    field: "name",
    headerName: "이름",
    width: 150,
  },
  {
    field: "studentNum",
    headerName: "학번",
    width: 150,
  },
  {
    field: "semester",
    headerName: "학기",
    width: 100,
  },
  {
    field: "weight",
    headerName: "가중치",
    width: 150,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 250,
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

function Student() {
  const [students, setStudent] = useRecoilState(studentState);
  const [init, setInit] = useState(false);
  const onChangeExcel = async (event) => {
    // const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   setNewExcelDir(fileReader.result);
    // };
    const { files } = event.target;
    // setNewExcelFile(files ? files[0] : null);
    // if (files) fileReader.readAsDataURL(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    await axios.post("/api/students", formData);
    loadData();
  };

  const [currentId, setCurrentId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleDeleteClick = async (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      await axios.delete(`/api/student/${id}`).then(function (response) {});
      loadData();
    }
  };
  const loadData = () => {
    axios.get().then(function (response) {
      setStudent(response.data);
      setInit(true);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/students",
      responseType: "json",
    }).then(function (response) {
      setStudent(
        response.data.map((item) => {
          return { ...item, id: item.studentId };
        })
      );
      console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5">마일리지 장학금 신청자 관리</Typography>
        {/* <Box display="flex" gap={2}>
          <Button
            component="a"
            href={studentRegisterExcel}
            download="학생 추가 양식"
            variant="outlined"
          >
            엑셀 양식 다운로드
          </Button>
          <Button component="label" variant="outlined">
            엑셀 파일 업로드
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onChangeExcel}
              hidden
            />
          </Button>
          <Button onClick={handleOpenAdd} variant="outlined">
            학생 추가
          </Button>
        </Box> */}
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
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 등록 목록
          </Typography>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Student;
