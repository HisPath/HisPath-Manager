import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

function AddStudent({ handleClose, loadData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isListUpload: false } });
  const onValid = async (data) => {
    await axios.post("/api/major", {
      majorName: data.name,
    });
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
              추가
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default AddStudent;
