import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AnalyticsCurrentVisits from "./AnalyticsCurrentVisitis";
import { useTheme } from "@mui/material/styles";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import ChartBar from "./ChartBar";
import { Container } from "@mui/material";
import { getScholarshipByGrade } from "../../apis/scholarship";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../atom";
import ChartColumnSingle from "./ChartColumnSingle";
import ChartPie from "./ChartPie";

const ScholarshipListChart = () => {
  const theme = useTheme();

  const [datas, setDatas] = useState([]);
  const semester = useRecoilValue(semesterState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScholarshipByGrade(semester);
      setDatas(data);
    };
    fetchData();
  }, [semester]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5.5}>
          <Card dir="ltr">
            <CardHeader title="학년별 마일리지 수혜 인원" />
            <CardContent
              sx={{
                height: 380,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChartPie />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6.5}>
          <Card dir="ltr">
            <CardHeader title="마일리지 가중치 평균" />
            <CardContent>
              <ChartBar />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={16}>
          <Card dir="ltr">
            <CardHeader title="학부별 마일리지 수혜 인원" />
            <CardContent>
              <ChartColumnSingle />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScholarshipListChart;
