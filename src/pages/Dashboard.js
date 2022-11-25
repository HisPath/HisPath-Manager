import { Container, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getDashboardInfo } from "../apis/dashboard";
import {
  AppAreaInstalled,
  AppWidgetSummary,
} from "../sections/@dashboard/general/app";
import UserCard from "../components/profile/UserCard";

function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState();
  const theme = useTheme();
  const today = new Date();
  const loadData = () => {
    getDashboardInfo().then((data) => setDashboardInfo(data));
  };
  useEffect(() => {
    loadData();
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
            <UserCard dashboardInfo={dashboardInfo} loadData={loadData} />
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
