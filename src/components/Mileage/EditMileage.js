import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { mileageState } from "../../atom";
import { mileageCategories } from "../../constants/commons";

function EditMileage({ id, handleClose }) {
  const [mileage, setMileage] = useRecoilState(mileageState);
  const target = mileage.filter((item) => item.id === id)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: target,
  });
  const onValid = (data) => {
    setMileage((old) => old.map((item) => (item.id === id ? data : item)));
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box mb={2}>
          <InputLabel>카테고리</InputLabel>
          <FormControl fullWidth hiddenLabel variant="filled" size="small">
            <Select
              {...register("category", {
                required: "필수 항목입니다.",
              })}
              defaultValue={target.category}
              disableUnderline
            >
              {mileageCategories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.category?.message}
          </Typography>
        </Box>
        <Box mb={2}>
          <InputLabel>활동명</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("mileageName", {
              required: "필수 항목입니다.",
            })}
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.mileageName?.message}
          </Typography>
        </Box>
        <Box mb={2}>
          <InputLabel>설명</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("description")}
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.description?.message}
          </Typography>
        </Box>
        <Box mb={2}>
          <InputLabel>비고</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("remark")}
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.remark?.message}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" gap={1}>
          <Button color="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button color="secondary" type="submit" variant="contained">
            수정
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditMileage;
