import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { mileageState } from "../../atom";

function ViewMileage({ id, handleClose }) {
  const mileage = useRecoilValue(mileageState);
  const { register } = useForm({
    defaultValues: mileage.filter((item) => item.id === id)[0],
  });
  return (
    <>
      <Box my={8} display="flex" justifyContent="space-between" gap={2}>
        <div>
          <InputLabel>활동명</InputLabel>
          <TextField
            variant="standard"
            {...register("mileageName", {
              required: true,
            })}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <InputLabel>카테고리</InputLabel>
          <TextField
            variant="standard"
            {...register("category", {
              required: true,
            })}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <InputLabel>설명</InputLabel>
          <TextField
            variant="standard"
            {...register("description")}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <InputLabel>비고</InputLabel>
          <TextField
            variant="standard"
            {...register("remark")}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </Box>
      <Typography>학생 목록</Typography>
      <ul>
        <li>학생1</li>
        <li>학생2</li>
        <li>학생3</li>
      </ul>
    </>
  );
}

export default ViewMileage;
