import { Box, Button, FormControl, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { mileageState } from "../../atom";

function ViewMileage({ id, handleClose }) {
  const mileage = useRecoilValue(mileageState);
  const target = mileage.filter((item) => item.id === id)[0];
  const { register } = useForm({
    defaultValues: target,
  });
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
              {...register("category", {
                required: "필수 항목입니다.",
              })}
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
            {...register("mileageName", {
              required: "필수 항목입니다.",
            })}
          />
        </Box>
        <Box mb={2}>
          <InputLabel>설명</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true, readOnly: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("description")}
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
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1.5}>
          <Button color="secondary" variant="outlined">
            엑셀 양식 다운
          </Button>
          <Button color="secondary" variant="outlined">
            엑셀 업로드
          </Button>
        </Box>
        <Button color="secondary" variant="contained">
          학생 목록 보기
        </Button>
      </Box>
    </>
  );
}

export default ViewMileage;
