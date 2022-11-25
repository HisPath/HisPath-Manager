import { Box, Button, Modal, Typography } from "@mui/material";
import { getGuestUser } from "../../apis/auth";
import { logout } from "../../services/auth";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3.5,
  borderRadius: 1,
};

function GuestLoginModal({ isLogin, isRegisted }) {
  const onClick = () => {
    getGuestUser().then((res) => {
      localStorage.setItem("TOKEN", `Bearer ${res.data.token}`);
      window.location.reload();
    });
  };
  return (
    <Modal open={isLogin && !isRegisted}>
      <Box sx={{ ...style }}>
        <Box>
          <Typography variant="h5" mb={4}>
            게스트 로그인
          </Typography>
          <Typography>등록되지 않은 계정입니다.</Typography>
          <Typography>게스트로 로그인 하시겠습니까?</Typography>
        </Box>
        <Box mt="auto" display="flex" justifyContent="flex-end" gap={1.5}>
          <Button variant="contained" onClick={onClick}>
            확인
          </Button>
          <Button variant="outlined" onClick={logout}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default GuestLoginModal;
