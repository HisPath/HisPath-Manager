import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useSnackbar } from "notistack";
import { mileageState } from "../../atom";
import mileageStudentRegisterExcel from "../../assets/mileage_student_register.xlsx";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3.5,
  borderRadius: 4,
};

function ViewStudentsModal({ id, students, loadStudents }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [newName, setNewName] = useState("");
  const [newstudentNum, setNewStudentNum] = useState("");
  const onChangeName = (event) => {
    setNewName(event.target.value);
  };
  const onChangeStudentNum = (event) => {
    setNewStudentNum(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("/api/mileage/student", {
        activityId: id,
        name: newName,
        studentNum: newstudentNum,
      })
      .then(function (response) {
        enqueueSnackbar("학생을 등록했습니다.", { variant: "success" });
        loadStudents();
      })
      .catch(function (error) {
        setDialogContent(error.response.data.message);
        setDialogOpen(true);
      });
  };
  const onDelete = async (studentId) => {
    await axios
      .delete("/api/mileage/student", {
        data: {
          activityId: id,
          studentId,
        },
      })
      .then(function (response) {
        enqueueSnackbar("학생을 삭제했습니다.", { variant: "success" });
        loadStudents();
      })
      .catch(function (error) {
        setDialogContent(error.response.data.message);
        setDialogOpen(true);
      });
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [dialogContent, setDialogContent] = useState();
  return (
    <>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        학생 목록 보기
      </Button>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">학생 목록</Typography>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
            >
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true }}
                hiddenLabel
                variant="filled"
                size="small"
                sx={{ width: 100 }}
                placeholder="학번"
                value={newstudentNum}
                onChange={onChangeStudentNum}
                required
              />
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true }}
                hiddenLabel
                variant="filled"
                size="small"
                sx={{ width: 70 }}
                placeholder="이름"
                value={newName}
                onChange={onChangeName}
                required
              />
              <Button type="submit" variant="outlined">
                참여 학생 추가
              </Button>
            </Box>
          </Box>
          <Box
            my={2.5}
            sx={{
              overflow: "auto",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>학번</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length !== 0 ? (
                  students.map((student) => (
                    <TableRow
                      key={student.studentNum}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{student.studentNum}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(student.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={3} align="center">
                      <Typography>등록된 학생이 없습니다.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
          <Box mt="auto" display="flex" justifyContent="flex-end">
            <Button color="secondary" variant="contained" onClick={handleClose}>
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>오류</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function ViewMileage({ id, handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState([]);
  const mileage = useRecoilValue(mileageState);
  const target = mileage.filter((item) => item.id === id)[0];
  const { register } = useForm({
    defaultValues: target,
  });
  const onChangeExcel = async (event) => {
    const { files } = event.target;
    const formData = new FormData();
    formData.append(
      "activityId",
      new Blob([JSON.stringify(id)], { type: "application/json" })
    );
    formData.append("file", files[0]);
    await axios
      .post("/api/mileage/students", formData)
      .then(function (response) {
        enqueueSnackbar("학생 목록을 등록했습니다.", { variant: "success" });
        loadStudents();
        loadData();
      })
      .catch(function (error) {
        setDialogContent(error.response.data.message);
        setDialogOpen(true);
      });
  };
  const loadStudents = () => {
    axios.get(`/api/mileage/${id}`).then(function (response) {
      setStudents(response.data.students);
    });
  };
  useEffect(() => {
    loadStudents();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [dialogContent, setDialogContent] = useState();
  return (
    <>
      <Box mt={3} mb={8}>
        <Box mb={2}>
          <InputLabel>카테고리</InputLabel>
          <FormControl fullWidth hiddenLabel variant="filled" size="small">
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true, readOnly: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
              {...register("categoryName")}
            />
          </FormControl>
        </Box>
        <Box mb={2}>
          <InputLabel>활동명</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true, readOnly: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("name")}
          />
        </Box>
        <Box mb={2}>
          <InputLabel>비고</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true, readOnly: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("remark")}
          />
        </Box>
        <Box mb={2}>
          <InputLabel>학기</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true, readOnly: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("semester")}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1.5}>
          <Button
            component="a"
            href={mileageStudentRegisterExcel}
            download="마일리지 항목 학생 등록 양식"
            variant="outlined"
            color="secondary"
          >
            학생 양식 다운
          </Button>
          <Button component="label" variant="outlined" color="secondary">
            학생 업로드
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onChangeExcel}
              hidden
            />
          </Button>
        </Box>
        <ViewStudentsModal
          id={id}
          students={students}
          loadStudents={loadStudents}
        />
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
      </Box>
    </>
  );
}

export default ViewMileage;
