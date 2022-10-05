import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useSnackbar } from "notistack";
import { mileageState } from "../../atom";
import mileageStudentRegisterExcel from "../../assets/mileage_student_register.xlsx";

function ViewMileage({ id, handleClose }) {
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
    formData.append("activityId", id);
    formData.append("file", files[0]);
    await axios.post("/api/mileage/students", formData);
    enqueueSnackbar("학생 목록을 등록했습니다.", { variant: "success" });
    loadStudents();
  };
  const loadStudents = () => {
    axios.get(`/api/mileage/${id}`).then(function (response) {
      setStudents(response.data.students);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadStudents();
  }, []);
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
        <Box mb={2} display="flex" gap={2}>
          <Box width="100%">
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
          <Box width="100%">
            <InputLabel>가중치</InputLabel>
            <TextField
              type="number"
              color="secondary"
              InputProps={{ disableUnderline: true, readOnly: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
              {...register("weight")}
            />
          </Box>
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
        <Button
          color="secondary"
          variant="contained"
          onClick={() => alert(students)}
        >
          학생 목록 보기
        </Button>
      </Box>
    </>
  );
}

export default ViewMileage;
