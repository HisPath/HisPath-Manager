import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { PageNotFoundIllustration } from "../assets/illustrations";

export default function Page404() {
  return (
    <Container
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" paragraph>
        페이지를 찾을 수 없습니다!
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>
        잘못된 경로로 접속하셨습니다.
      </Typography>

      <PageNotFoundIllustration
        sx={{
          height: 260,
          my: { xs: 5, sm: 10 },
        }}
      />

      <Button to="/" component={RouterLink} size="large" variant="contained">
        홈으로 가기
      </Button>
    </Container>
  );
}
