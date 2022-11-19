import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDashboardInfo } from "../apis/dashboard";
import Image from "../components/image/Image";
import {
  AppAreaInstalled,
  AppWidgetSummary,
} from "../sections/@dashboard/general/app";
import profileBgImage from "../assets/plant-2004483_1920.jpg";

function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState();
  const theme = useTheme();
  const today = new Date();
  useEffect(() => {
    getDashboardInfo().then((data) => setDashboardInfo(data));
  }, []);
  const getPercent = (prev, curr) => {
    if (!dashboardInfo) return 0;
    return (
      ((dashboardInfo.loginCounts[curr] - dashboardInfo.loginCounts[prev]) /
        dashboardInfo.loginCounts[prev]) *
      100
    );
  };
  return (
    <Container>
      {dashboardInfo && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="어제 접속자 수"
              percent={getPercent(4, 5)}
              total={dashboardInfo.loginCounts[5]}
              chart={{
                colors: [theme.palette.primary.main],
                series: dashboardInfo.loginCounts.slice(4, 6),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="오늘 접속자 수"
              percent={getPercent(5, 6)}
              total={dashboardInfo.loginCounts[6]}
              chart={{
                colors: [theme.palette.info.main],
                series: dashboardInfo.loginCounts.slice(5),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="전체 접속자 수"
              percent={dashboardInfo.totalCounts}
              total={dashboardInfo.totalCounts}
              chart={{
                colors: [theme.palette.warning.main],
                series: dashboardInfo.loginCounts,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ textAlign: "center" }}>
              <Box sx={{ position: "relative" }}>
                <Image src={profileBgImage} ratio="16/9" />
              </Box>
              <CardHeader
                title={`${dashboardInfo.name} 관리자`}
                subheader={dashboardInfo.department}
              />
              <Box sx={{ mt: 4, mb: 10 }}>
                <Link
                  href={`mailto:${dashboardInfo.email}`}
                  color="text.primary"
                >
                  {dashboardInfo.email}
                </Link>
              </Box>
              <Divider sx={{ borderStyle: "dashed" }} />
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                sx={{ py: 2 }}
              >
                <div>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ mb: 0.75, color: "text.disabled" }}
                  >
                    승인 여부
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={
                      dashboardInfo.approved ? "success.main" : "error.main"
                    }
                  >
                    {dashboardInfo.approved ? "승인" : "미승인"}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ mb: 0.75, color: "text.disabled" }}
                  >
                    권한
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={() => {
                      if (dashboardInfo.power === 2) return "success.main";
                      if (dashboardInfo.power === 1) return "warning.main";
                      return "error.main";
                    }}
                  >
                    {dashboardInfo.power === 2 && "슈퍼"}
                    {dashboardInfo.power === 1 && "일반"}
                    {dashboardInfo.power === 0 && "미승인"}
                  </Typography>
                </div>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="접속 현황"
              subheader={`(+${dashboardInfo.totalCounts}%) than last month`}
              chart={{
                categories: Array(7)
                  .fill(0)
                  .map((_, index) => today.getDate() - 6 + index),
                series: [
                  {
                    year: "지난 7일",
                    data: [
                      {
                        name: "로그인 수",
                        data: dashboardInfo.loginCounts,
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Dashboard;
