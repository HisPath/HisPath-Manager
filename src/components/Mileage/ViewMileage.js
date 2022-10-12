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

function ViewStudentsModal({ students }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        학생 목록 보기
      </Button>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Typography variant="h6">학생 목록</Typography>
          <Box
            my={2.5}
            sx={{
              overflow: "auto",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "divider",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "background.paper" }}>
                    학번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "background.paper" }}>
                    이름
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student.studentNum}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{student.studentNum}</TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                ))}
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
        <ViewStudentsModal students={students} />
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
