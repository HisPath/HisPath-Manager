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
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { mileageState } from "../../atom";
import { mileageCategories, semesterList } from "../../constants/commons";
import { updateMileage } from "../../apis/milage";

function EditMileage({ id, handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const mileage = useRecoilValue(mileageState);
  const target = mileage.filter((item) => item.id === id)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: target,
  });
  const onValid = async (data) => {
    await updateMileage(
      id,
      data.categoryId,
      data.name,
      data.remark,
      data.weight,
      data.semester
    );
    enqueueSnackbar("수정되었습니다.", { variant: "success" });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box mb={2}>
          <InputLabel>카테고리</InputLabel>
          <FormControl fullWidth hiddenLabel variant="filled" size="small">
            <Select
              {...register("categoryId", {
                required: "필수 항목입니다.",
              })}
              defaultValue={target.categoryId}
              disableUnderline
            >
              {mileageCategories.map((item, index) => (
                <MenuItem key={item} value={index + 1}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.categoryId?.message}
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
            {...register("name", {
              required: "필수 항목입니다.",
            })}
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.name?.message}
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
        <Box mb={2} display="flex" gap={2}>
          <Box width="100%">
            <InputLabel>학기</InputLabel>
            <FormControl fullWidth hiddenLabel variant="filled" size="small">
              <Select
                {...register("semester", {
                  required: "필수 항목입니다.",
                })}
                defaultValue={target.semester}
                disableUnderline
              >
                {semesterList.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.semester?.message}
            </Typography>
          </Box>
          <Box width="100%">
            <InputLabel>가중치</InputLabel>
            <TextField
              type="number"
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
              {...register("weight", {
                required: "필수 항목입니다.",
              })}
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.weight?.message}
            </Typography>
          </Box>
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
