import { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar } from "react-chartjs-2";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

const options = {
  elements: {
    point: {
      radius: 0, // 점 제거
    },
  },
  legend: {
    display: true,
    labels: {
      boxWidth: 10,
      boxHeight: 50000000, // fontSize에 비례함
      fontSize: 11,
      fontColor: "#263238",
      generateLabels: function (chart) {
        const labels =
          Chart.defaults.global.legend.labels.generateLabels(chart);
        return labels.map((property) => {
          return { ...property, fillStyle: property.strokeStyle };
        });
      },
    },
    position: "bottom",
    // align: "start",
  },
  scale: {
    ticks: { beginAtZero: true, display: false, max: 3, min: 0, stepSize: 1 }, //maxTicksLimit data 최대값의 2배
    pointLabels: {
      fontSize: 24, // radar 차트 fontsize
      fontColor: "primary",
      fontStyle: "bold",
      // padding: 100,
    },
  },
  tooltips: {
    enabled: false,
    mode: "nearest",
    position: "average",
    intersect: false,
  },
};

const pligins = [
  {
    beforeInit: function (chart) {
      chart.legend.afterFit = function () {
        chart.legend.options.labels.padding = 20;
        // chart.height += 30;
      };
    },
  },
];

const ScholarshipListChart = () => {
  const [chartDataActivity, setChartData] = useState({
    labels: [
      "교내 활동",
      "전공 마일리지",
      "산학 마일리지 ",
      "비교과-연구활동",
      "기타",
      "비교과-특강참여",
      "비교과-행사참여",
      "비교과-학회활동",
    ],
    datasets: [
      {
        label: "내 활동 분포",
        data: [1, 1, 2, 4, 3, 2, 3, 5],
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 평균 분포",
        data: [2, 2, 2, 2, 5, 3, 4, 4],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
    // 분포 , 평균
  });
  const [chartDataLanguage, setChartData1] = useState({
    labels: [
      "교내 활동",
      "전공 마일리지",
      "산학 마일리지 ",
      "비교과-연구활동",
      "기타",
      "비교과-특강참여",
      "비교과-행사참여",
      "비교과-학회활동",
    ],
    datasets: [
      {
        label: "참여 인원 수",
        data: [50, 40, 60, 50, 40, 30, 50, 70], // 순서대로 교내, 교외, 수상, 또 뭐가 있지
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      // {
      //   label: "학년 평균 실력",
      //   data: [6, 8, 9],
      //   backgroundColor: "rgba(243, 229, 185, 0.2)",
      //   borderColor: "rgb(255, 183, 0)",
      //   borderWidth: 1.5,
      // },
    ],
  });
  const [chartDataMileage, setChartDataMileage] = useState({
    labels: [
      "최저점수",
      "내 점수(상위 10%)",
      "최고점수",
      // "교내 활동",
      // "전공 마일리지",
      // "산학 마일리지 ",
      // "비교과-연구활동",
      // "기타",
      // "비교과-특강참여",
      // "비교과-행사참여",
      // "비교과-학회활동",
    ],
    datasets: [
      // {
      //   // label: ["내 마일리지 총점 : 140점", "  "],
      //   // data: [1, 1, 2, 4, 3, 2, 3, 5],
      //   // backgroundColor: "rgba(142, 202, 206, 0.2)",
      //   // borderColor: "rgb(0, 156, 242)",
      //   // borderWidth: 1.5,
      // },
      {
        label: "최고점: 200점",
        data: [0, 170, 200],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  });
  const [chartDataTimeline, setChartDataTimeline] = useState({
    labels: [
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      // "교내 활동",
      // "전공 마일리지",
      // "산학 마일리지 ",
      // "비교과-연구활동",
      // "기타",
      // "비교과-특강참여",
      // "비교과-행사참여",
      // "비교과-학회활동",
    ],
    datasets: [
      {
        label: "내 마일리지 활동 개수",
        data: [9, 5, 7, 8, 10],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  });
  const [activities, setActivities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const getActivities = async () => {
    const activity = await axios.get(
      "http://localhost:8080/api/studentmileage/1"
    );
    setActivities(activity.data.activities);
  };

  const getCategories = async () => {
    const category = await axios.get("http://localhost:8080/api/categories");
    setCategories(category.data);
  };

  useEffect(() => {
    getActivities();
    getCategories();
  }, []);

  return (
    <Box>
      <Box m={3} pb={3} display={"flex"}>
        <Paper sx={{ width: "calc(30vw)", m: 2 }}>
          <Typography
            style={{
              background: "rgb(238,242,245)",
              padding: "20px 0 8px calc(9vw)",
              fontSize: "1.4rem",
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
            color="primary"
          >
            Mileage
          </Typography>
          <div
            style={{
              background: "rgb(238,242,245)",
              padding: "20px 10px 21px 10px",
            }}
          >
            <Radar
              width={180}
              data={chartDataActivity}
              options={options}
              plugins={pligins}
            />
          </div>
        </Paper>
        <Paper sx={{ width: "calc(30vw)", m: 2 }}>
          <Typography
            style={{
              background: "rgb(238,242,245)",
              padding: "41px 0 0 calc(8.5vw)",
              fontSize: "1.4rem",
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
            color="primary"
          >
            Popularity
          </Typography>
          <div
            style={{
              background: "rgb(238,242,245)",
              padding: "40px 10px 41px 10px",
            }}
          >
            <Bar
              width={180}
              data={chartDataLanguage}
              options={options}
              plugins={pligins}
            />
          </div>
        </Paper>
      </Box>
      <Box m={3} pb={3} display={"flex"}>
        <Paper sx={{ width: "calc(30vw)", m: 2 }}>
          <Typography
            style={{
              background: "rgb(238,242,245)",
              padding: "41px 0 0 calc(11vw)",
              fontSize: "1.4rem",
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
            color="primary"
          >
            Rank
          </Typography>
          <div
            style={{
              background: "rgb(238,242,245)",
              padding: "40px 10px 41px 10px",
            }}
          >
            <Line
              width={180}
              data={chartDataMileage}
              options={options}
              plugins={pligins}
            />
          </div>
        </Paper>
        <Paper sx={{ width: "calc(30vw)", m: 2 }}>
          <Typography
            style={{
              background: "rgb(238,242,245)",
              padding: "41px 0 0 calc(11vw)",
              fontSize: "1.4rem",
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
            color="primary"
          >
            My Timeline
          </Typography>
          <div
            style={{
              background: "rgb(238,242,245)",
              padding: "40px 10px 41px 10px",
            }}
          >
            <Line
              width={180}
              data={chartDataTimeline}
              options={options}
              plugins={pligins}
            />
          </div>
        </Paper>
      </Box>
    </Box>
  );
};

export default ScholarshipListChart;
