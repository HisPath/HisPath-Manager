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
    <Box mt={3} mb={1}>
      <Box mb={2}>
        <InputLabel sx={{ mt: 1 }}></InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true, readOnly: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("test")}
        />
        <InputLabel sx={{ mt: 1 }}></InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true, readOnly: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("test")}
        />
        <InputLabel sx={{ mt: 1 }}></InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true, readOnly: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("test")}
        />
        <InputLabel sx={{ mt: 1 }}></InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true, readOnly: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("test")}
        />
        <InputLabel sx={{ mt: 1 }}></InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true, readOnly: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("test")}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" gap={1}>
          <Button color="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button color="secondary" type="submit" variant="contained">
            추가
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewStudent;
