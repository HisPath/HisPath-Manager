import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { studentState } from "../../atom";

function ViewStudent({ id, handleClose }) {
  const student = useRecoilValue(studentState);
  const { register } = useForm({
    defaultValues: student.filter((item) => item.id === id)[0],
  });
  return (
    <>
      <Box my={8} display="flex" justifyContent="space-between" gap={2}>
        <div>
          <InputLabel>이름</InputLabel>
          <TextField
            variant="standard"
            {...register("studentName", {
              required: true,
            })}
          />
          <p></p>

          <InputLabel>학번</InputLabel>
          <TextField
            variant="standard"
            {...register("studentId", {
              required: true,
            })}
          />
        </div>
        <div>
          <InputLabel>전공</InputLabel>
          <TextField
            variant="standard"
            {...register("major", {
              required: true,
            })}
          />
          <p></p>

          <InputLabel>학년</InputLabel>
          <TextField
            variant="standard"
            {...register("year", {
              required: true,
            })}
          />
          <p></p>

          <InputLabel>학기</InputLabel>
          <TextField
            variant="standard"
            {...register("semester", {
              required: true,
            })}
          />
        </div>
        <div>
          <InputLabel>생년월일</InputLabel>
          <TextField
            variant="standard"
            {...register("birth", {
              required: true,
            })}
          />
          <p></p>
          <InputLabel>전화번호</InputLabel>
          <TextField
            variant="standard"
            {...register("phone", {
              required: true,
            })}
          />
          <p></p>

          <InputLabel>이메일</InputLabel>
          <TextField
            variant="standard"
            {...register("email", {
              required: true,
            })}
          />
        </div>
      </Box>
      <Typography>학생 세부 정보</Typography>
      <ul>
        <li>정보</li>
        <li>정보</li>
        <li>정보</li>
      </ul>
    </>
  );
}

export default ViewStudent;
