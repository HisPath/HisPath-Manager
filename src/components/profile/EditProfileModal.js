import { useState } from "react";
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
import { updateManager } from "../../apis/manager";

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

function EditProfileModal({ dashboardInfo, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      department: dashboardInfo.department,
      email: dashboardInfo.email,
      name: dashboardInfo.name,
      profile: dashboardInfo.profile,
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onValid = async (data) => {
    await updateManager(data).then(function (response) {
      enqueueSnackbar("저장되었습니다.", { variant: "success" });
      loadData();
      handleClose();
    });
  };
  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        내 정보 수정
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Box>
            <Typography variant="h5">내 정보 수정</Typography>
            <Box mt={4} component="form">
              <Box width="100%" mt={2}>
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
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
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
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.department?.message}
                </Typography>
              </Box>
              <Box width="100%" mt={2}>
                <InputLabel>이메일</InputLabel>
                <TextField
                  type="email"
                  color="secondary"
                  InputProps={{ disableUnderline: true, readOnly: true }}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                  {...register("email", {
                    required: "필수 항목입니다.",
                  })}
                />
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.email?.message}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt="auto" display="flex" justifyContent="flex-end" gap={1.5}>
            <Button variant="contained" onClick={handleSubmit(onValid)}>
              저장
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EditProfileModal;
