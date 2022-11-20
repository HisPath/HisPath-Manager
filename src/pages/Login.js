import { Button, Paper, SvgIcon, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import GoogleLoginButton from "../components/common/GoogleLoginButton";
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
            <GoogleLoginButton />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
