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

function ViewScholarshipRegistered({ id, handleClose }) {
  const [students, setStudents] = useState([]);

  const loadStudents = () => {
    axios
      .get(
        `http://localhost:8080/api/scholarship/activities?studentId=51&semester=2022-1`
      )
      .then(function (response) {
        setStudents(response.data.activities);
      });
  };
  useEffect(() => {
    loadStudents();
  }, []);

  const [info, setInfo] = useState([]);

  const studentInfo = () => {
    axios
      .get(
        `http://localhost:8080/api/scholarship/activities?studentId=51&semester=2022-1`
      )
      .then(function (response) {
        setInfo(response.data);
      });
  };
  useEffect(() => {
    studentInfo();
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const [dialogContent, setDialogContent] = useState();
  return (
    <Box mt={3} mb={8} sx={{ height: 650 }}>
      <InputLabel>
        [{info.departmentName}] {info.name} ({info.studentNum})
      </InputLabel>
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
                  <TableCell>{activity.categoryName}</TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gap={1.5}>
          <InputLabel variant="h3">
            {info.name} 학생의 {info.semester}학기 마일리지 항목 갯수는 (
            {info.activityCnt}
            )개, 총 가중치는 ({info.totalWeight}) 입니다.
          </InputLabel>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewScholarshipRegistered;
