import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  Grid,
  styled,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { studentState } from "../../atom";
import studentRegisterExcel from "../../assets/student_register.xlsx";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { addStudents, deleteStudent, getStudents } from "../../apis/student";
import StudentCard from "./StudentCard";
import AddStudent from "./AddStudent";
import ViewStudent from "./ViewStudent";
import EditStudent from "./EditStudent";
import ModeSwitch from "../common/ModeSwitch";

// ----------------------------------------------------------------------
const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingTop: 24,
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "auto",
  paddingBottom: 24,
  paddingLeft: 0,
  paddingRight: 0,
});
const columns = [
  {
    field: "id",
    headerName: "번호",
    width: 60,
  },
  {
    field: "studentNum",
    headerName: "학번",
    width: 150,
  },
  {
    field: "name",
    headerName: "이름",
    width: 120,
  },
  {
    field: "departmentName",
    headerName: "학부",
    width: 200,
  },
  {
    field: "major1Name",
    headerName: "1전공",
    width: 180,
  },
  {
    field: "major2Name",
    headerName: "2전공",
    width: 180,
  },
  {
    field: "semester",
    headerName: "학기",
    width: 100,
  },
];
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 450,
  p: 3.5,
  borderRadius: 1,
};

export default function StudentCardsPage({ card, setcard }) {
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudent] = useRecoilState(studentState);

  const onChangeExcel = async (event) => {
    const { files } = event.target;
    const formData = new FormData();
    formData.append("file", files[0]);
    await addStudents(formData)
      .then(function (response) {
        enqueueSnackbar("학생 리스트를 등록했습니다.", {
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
      await deleteStudent(id);
      enqueueSnackbar("삭제되었습니다.", { variant: "success" });
      loadData();
    }
  };
  const loadData = async () => {
    const data = await getStudents();
    setStudent(
      data.map((item) => {
        return { ...item, id: item.studentId };
      })
    );
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [dialogContent, setDialogContent] = useState();
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Container component={Paper}>
        <Header>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" fontWeight={600}>
                학생 관리 시스템
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent={"right"}>
                <ModeSwitch card={card} setCard={setcard} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent={"right"} gap={2}>
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
              </Box>
            </Grid>
          </Grid>
        </Header>
        <Article>
          <Container maxWidth={"lg"}>
            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
            >
              {students.map((student) => (
                <StudentCard
                  key={student.studentId}
                  student={student}
                  setCurrentId={setCurrentId}
                  handleOpenView={handleOpenView}
                  handleOpenEdit={handleOpenEdit}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </Box>
          </Container>
        </Article>
        <Modal open={openAdd} onClose={handleCloseAdd}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              학생 추가
            </Typography>
            <AddStudent handleClose={handleCloseAdd} loadData={loadData} />
          </Box>
        </Modal>
        <Modal open={openView} onClose={handleCloseView}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              학생 정보
            </Typography>
            <ViewStudent id={currentId} handleClose={handleCloseView} />
          </Box>
        </Modal>
        <Modal open={openEdit} onClose={handleCloseEdit}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              학생 정보 수정
            </Typography>
            <EditStudent
              id={currentId}
              handleClose={handleCloseEdit}
              loadData={loadData}
            />
          </Box>
        </Modal>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>잘못된 파일</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogContent}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
