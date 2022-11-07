import { Paper, SvgIcon, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export function Login() {
  const styles = {
    paperContainer: {
      // backgroundImage: `url(${loginImg})`,
      // background:
      //   "linear-gradient(180.1deg,#dacdff -59.06%,rgba(20,44,105,0) 65.9%),#008081",
      background:
        "linear-gradient(323.93deg,rgba(10,185,149,.7) -32.24%,rgba(10,185,149,0) 57.93%),#dacdff",
      height: "calc(100vh)",
      width: "calc(100vw)",
      position: "absolute",
      top: 0,
      zIndex: 1000,
    },
    titleStyle: {
      padding: 8,
      fontWeight: 800,
      textShadow: "4px 4px #ddd",
      fontFamily: "ubuntu",
    },
  };

  return (
    <Paper style={styles.paperContainer}>
      <Container maxWidth="lg" sx={{ pt: "calc(15vh)" }}>
        <Box
          height={"calc(70vh)"}
          p={2}
          sx={{ display: "flex", backgroundColor: "#fff", borderRadius: 5 }}
        >
          <Box
            sx={{
              p: 5,
              width: "57%",
            }}
          >
            <Typography variant="h3" style={styles.titleStyle}>
              Portfolio
            </Typography>
            <Typography variant="h3" style={styles.titleStyle}>
              Management
            </Typography>
            <Typography variant="h3" style={styles.titleStyle}>
              System
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems={"center"}
            sx={{
              backgroundColor: "#FFF",
              p: 2,
              borderRadius: 3,
              border: "none",
              width: "calc(30vw)",
            }}
            gap={2}
          >
            <Typography
              sx={{
                pt: 15,
                textShadow: "2px 4px #ddd",
                fontSize: "2.3rem",
                fontWeight: 600,
              }}
            >
              Manager
            </Typography>
            <Typography
              sx={{
                pb: 15,
                textShadow: "2px 4px #ddd",
                fontSize: "2.3rem",
                fontWeight: 600,
              }}
            >
              L o g i n
            </Typography>
            <Box
              display={"flex"}
              sx={{
                border: "1px solid #eaeaea",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                borderRadius: 3,
                p: 2,
                pl: 5,
                pr: 5,
              }}
            >
              <SvgIcon sx={{ mt: 0.45 }}>
                <path
                  d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                  fill="#EA4335"
                ></path>
                <path
                  d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                  fill="#34A853"
                ></path>
                <path fill="none" d="M0 0h18v18H0z"></path>
              </SvgIcon>
              <Typography>구글 로그인</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
