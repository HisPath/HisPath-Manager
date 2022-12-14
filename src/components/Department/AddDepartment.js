import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { addDepartment } from "../../apis/department";

function AddDepartment({ handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isListUpload: false } });
  const onValid = async (data) => {
    await addDepartment(data.departmentId, data.name);
    enqueueSnackbar("추가되었습니다!", { variant: "success" });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box display="flex" gap={2}>
        <Box width="100%">
          <InputLabel sx={{ mt: 1 }}>학부 이름:</InputLabel>
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
        {/* <Box width="50%">
          <InputLabel sx={{ mt: 1 }}>지도 교수:</InputLabel>
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
          <InputLabel sx={{ mt: 1 }}>사무실 번호:</InputLabel>
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
      <Box mb={2} display="flex" gap={2}>
        <Box width="50%">
          <InputLabel sx={{ mt: 1 }}>학부 위치:</InputLabel>
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
        </Box> */}
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
    </form>
  );
}

export default AddDepartment;
