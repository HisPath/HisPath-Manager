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

function ViewScholarshipRegistered({ id, handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState([]);
  const mileage = useRecoilValue(mileageState);
  const target = mileage.filter((item) => item.id === id)[0];
  const { register } = useForm({
    defaultValues: target,
  });
  const loadStudents = () => {
    axios.get(`/api/studentmileage/${id}`).then(function (response) {
      setStudents(response.data.activities);
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
    <Box mt={3} mb={8} sx={{ height: 600 }}>
      <Box mb={2}>
        <Box
          my={2.5}
          sx={{
            overflow: "auto",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "divider",
            height: 600,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "background.paper" }}>
                  카테고리
                </TableCell>
                <TableCell sx={{ backgroundColor: "background.paper" }}>
                  이름
                </TableCell>
                {/* <TableCell sx={{ backgroundColor: "background.paper" }}>
                  학기
                </TableCell> */}
                <TableCell sx={{ backgroundColor: "background.paper" }}>
                  가중치
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((activity) => (
                <TableRow
                  key={activity.studentNum}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{activity.categoryDto.name}</TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gap={1.5}>
          <InputLabel variant="h6">
            박성진 학생의 (2022-2)학기 마일리지 항목은 (10)개, 가중치는 (100),
            장학금액은 (100)입니다.
          </InputLabel>

          <Button color="secondary" variant="outlined" onClick={handleClose}>
            닫기
          </Button>

          {/* <Button color="secondary" variant="contained">
            마일리지 장학금 승인
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewScholarshipRegistered;
