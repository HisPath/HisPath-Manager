import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { majorState } from "../../atom";
import { useSnackbar } from "notistack";
import { updateMajor } from "../../apis/major";

function EditMajor({ id, handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [major] = useRecoilState(majorState);
  const target = major.filter((item) => item.id === id)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: target,
  });
  const onValid = async (data) => {
    await updateMajor(data.majorName);
    enqueueSnackbar("수정되었습니다.", { variant: "success" });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box display="flex" gap={2}>
          <Box width="100%">
            <InputLabel sx={{ mt: 1 }}>전공 이름:</InputLabel>
            <TextField
              {...register("name", {
                required: "필수 항목입니다",
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
        <Box display="flex" gap={2}>
          <Box width="100%">
            <InputLabel sx={{ mt: 1 }}>소속 학부:</InputLabel>
            <TextField
              {...register("department", {
                required: "필수 항목입니다",
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
            <InputLabel sx={{ mt: 1 }}>총 학점:</InputLabel>
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
            <InputLabel sx={{ mt: 1 }}>총 인원:</InputLabel>
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
      </Box>
    </form>
  );
}

export default EditMajor;
