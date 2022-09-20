import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { mileageState } from "../../atom";

function AddMileage({ handleClose }) {
  const setMileage = useSetRecoilState(mileageState);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    const id = Date.now();
    setMileage((old) => [...old, { ...data, id }]);
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
            추가
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default AddMileage;
