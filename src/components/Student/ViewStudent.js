import {
  Box,
  Button,
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
import { studentState } from "../../atom";
import axios from "axios";
import { useEffect, useState } from "react";

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

function ViewStudent({ id, handleClose }) {
  const [students, setStudents] = useState([]);
  const student = useRecoilValue(studentState);
  const target = student.filter((item) => item.id === id)[0];
  const { register } = useForm({
    defaultValues: target,
  });
  const loadStudents = () => {
    axios.get(`/api/student/${id}`).then(function (response) {
      setStudents(response.data.students);
    });
  };
  useEffect(() => {
    loadStudents();
  }, []);
  return (
    <Box mt={3} mb={8}>
      <Box mb={2}>
        <Box>
          <Box display="flex" justifyContent="space-between"></Box>
          <Box display="flex" gap={2}>
            <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>이름</InputLabel>
              <TextField
                {...register("name")}
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
              />
            </Box>
            <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>학번</InputLabel>
              <TextField
                {...register("studentNum")}
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
              />
            </Box>
          </Box>

          <Box mb={2} display="flex" gap={2}>
            <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>학부</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true, readOnly: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("departmentName")}
              />
            </Box>
            <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>학기</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("semester")}
              />
            </Box>
          </Box>

          <Box display="flex" gap={2}>
            <Box width="50%">
              <InputLabel>1전공</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true, readOnly: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("major1Name")}
              />
            </Box>
            <Box width="50%">
              <InputLabel>2전공</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true, readOnly: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("major2Name")}
              />
            </Box>
          </Box>

          <InputLabel sx={{ mt: 1 }}>이메일</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true, readOnly: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("email", {
              required: "필수 항목입니다.",
            })}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>프로필</InputLabel>
            <TextField
              {...register("profile")}
              color="secondary"
              InputProps={{ disableUnderline: true, readOnly: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
          </Box>
          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>전화번호</InputLabel>
            <TextField
              {...register("phone", {
                required: true,
              })}
              color="secondary"
              InputProps={{ disableUnderline: true, readOnly: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>블로그</InputLabel>
            <TextField
              {...register("blog")}
              color="secondary"
              InputProps={{ disableUnderline: true, readOnly: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
          </Box>

          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>깃허브 아이디</InputLabel>
            <TextField
              {...register("githubId")}
              color="secondary"
              InputProps={{ disableUnderline: true, readOnly: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
          </Box>
        </Box>

        <InputLabel sx={{ mt: 1 }}>README</InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true, readOnly: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("readme")}
        />
      </Box>
    </Box>
  );
}

export default ViewStudent;
