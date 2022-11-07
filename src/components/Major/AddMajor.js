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
        <Box mb={2}>
          <Box>
            <Box display="flex" justifyContent="space-between"></Box>

            <Box width="100%">
              <InputLabel sx={{ mt: 1 }}>전공</InputLabel>
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
                {errors?.phone?.message}
              </Typography>
            </Box>
          </Box>

          {/* <Box display="flex" gap={2}>
            <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>블로그</InputLabel>
              <TextField
                {...register("blog")}
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
              />
              <Typography color="text.secondary" variant="caption" height={24}>
                {errors?.blog?.message}
              </Typography>
            </Box>

            <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>깃허브 아이디</InputLabel>
              <TextField
                {...register("githubId")}
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
              />
              <Typography color="text.secondary" variant="caption" height={24}>
                {errors?.githubId?.message}
              </Typography>
            </Box>
          </Box>

          <InputLabel sx={{ mt: 1 }}>README</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            {...register("readme")}
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.readme?.message}
          </Typography> */}
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
    </form>
  );
}

export default AddStudent;
