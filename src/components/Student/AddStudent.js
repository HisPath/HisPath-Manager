import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { studentState } from "../../atom";

function AddStudent({ handleClose }) {
  const setStudent = useSetRecoilState(studentState);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    const id = Date.now();
    setStudent((old) => [...old, { ...data, id }]);
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
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
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1}>
          {/* <Button variant="outlined">엑셀 양식 다운</Button>
          <Button variant="outlined">엑셀 업로드</Button> */}
        </Box>
        <Box display="flex" gap={1}>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit" variant="outlined">
            추가
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default AddStudent;
