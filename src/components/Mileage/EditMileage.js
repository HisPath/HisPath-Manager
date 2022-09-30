import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { mileageState } from "../../atom";

function EditMileage({ id, handleClose }) {
  const [mileage, setMileage] = useRecoilState(mileageState);
  const { register, handleSubmit } = useForm({
    defaultValues: mileage.filter((item) => item.id === id)[0],
  });
  const onValid = (data) => {
    setMileage((old) => old.map((item) => (item.id === id ? data : item)));
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box my={8} display="flex" justifyContent="space-between" gap={2}>
        <div>
          <InputLabel>활동명</InputLabel>
          <TextField
            variant="standard"
            {...register("mileageName", {
              required: true,
            })}
          />
        </div>
        <div>
          <InputLabel>카테고리</InputLabel>
          <TextField
            variant="standard"
            {...register("category", {
              required: true,
            })}
          />
        </div>
        <div>
          <InputLabel>설명</InputLabel>
          <TextField variant="standard" {...register("description")} />
        </div>
        <div>
          <InputLabel>비고</InputLabel>
          <TextField variant="standard" {...register("remark")} />
        </div>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1}>
          <Button variant="outlined">엑셀 양식 다운</Button>
          <Button variant="outlined">엑셀 업로드</Button>
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

export default EditMileage;
