import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { addManager } from "../../apis/manager";
import { logout } from "../../services/auth";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3.5,
  borderRadius: 1,
};

function AddUserModal({ isLogin, isRegisted }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      department: "",
      email: "",
      name: "",
      power: 0,
      profile: null,
    },
  });
  const onValid = async (data) => {
    await addManager(data).then(function (response) {
      enqueueSnackbar("저장되었습니다.", { variant: "success" });
      window.location.reload();
    });
  };
  return (
    <Modal open={isLogin && !isRegisted}>
      <Box sx={{ ...style }}>
        <Box>
          <Typography variant="h5" mb={2}>
            회원 가입
          </Typography>
          <Typography mb={3}>기본 정보를 입력해주세요.</Typography>
          <Box component="form">
            <Box width="100%">
              <InputLabel>이름</InputLabel>
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
            <Box width="100%" mt={2}>
              <InputLabel>부서</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("department", {
                  required: "필수 항목입니다.",
                })}
              />
              <Typography color="text.secondary" variant="caption" height={24}>
                {errors?.department?.message}
              </Typography>
            </Box>
            <Box width="100%" mt={2}>
              <InputLabel>이메일</InputLabel>
              <TextField
                type="email"
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("email", {
                  required: "필수 항목입니다.",
                })}
              />
              <Typography color="text.secondary" variant="caption" height={24}>
                {errors?.email?.message}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gap={1.5}>
          <Button variant="contained" onClick={handleSubmit(onValid)}>
            가입
          </Button>
          <Button variant="outlined" onClick={logout}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddUserModal;
