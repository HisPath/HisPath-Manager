import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoryState } from "../../atom";
import { useSnackbar } from "notistack";
import { updateCategory } from "../../apis/category";

function EditCategory({ id, handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [category] = useRecoilState(categoryState);
  const target = category.filter((item) => item.id === id)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: target,
  });
  const onValid = async (data) => {
    await updateCategory(id, data.categoryId, data.name);
    enqueueSnackbar("수정되었습니다.", { variant: "success" });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box display="flex" gap={2}>
          <Box width="100%">
            <InputLabel sx={{ mt: 1 }}>카테고리 이름:</InputLabel>
            <TextField
              {...register("name", {
                required: true,
              })}
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.name?.message}
            </Typography>
          </Box>
        </Box>

        <Box mb={2} display="flex" gap={2}>
          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>여부:</InputLabel>
            <TextField
              {...register("credit", {
                required: "필수 항목입니다.",
              })}
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.name?.message}
            </Typography>
          </Box>
          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>총 가중치:</InputLabel>
            <TextField
              {...register("total", {
                required: "필수 항목입니다.",
              })}
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.studentNum?.message}
            </Typography>
          </Box>
        </Box>
        <Box width="100%">
          <InputLabel sx={{ mt: 1 }}>전화번호</InputLabel>
          <TextField
            {...register("phone", {
              required: true,
            })}
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.phone?.message}
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

export default EditCategory;
