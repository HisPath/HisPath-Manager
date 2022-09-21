import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { studentState } from "../../atom";

function EditStudent({ id, handleClose }) {
  const [student, setStudent] = useRecoilState(studentState);
  const { register, handleSubmit } = useForm({
    defaultValues: student.filter((item) => item.id === id)[0],
  });
  const onValid = (data) => {
    setStudent((old) => old.map((item) => (item.id === id ? data : item)));
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
        </div>
        <div>
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
          <TextField variant="standard" {...register("major")} />
        </div>
        <div>
          <InputLabel>학년</InputLabel>
          <TextField variant="standard" {...register("year")} />
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
            수정
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditStudent;
