// components
import Chart, { useChart } from "./chart";

import { useEffect } from "react";
import { useState } from "react";
import { semesterState } from "../../atom";
import { getScholarshipByGrade } from "../../apis/scholarship";
import { useRecoilValue } from "recoil";

// ----------------------------------------------------------------------

export default function ChartPie() {
  const [datas, setDatas] = useState([]);
  const semester = useRecoilValue(semesterState);
  const [gradeTotal, setGradeTotal] = useState([]);

  const series = [{ name: "총 인원", data: gradeTotal }];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScholarshipByGrade(semester);
      setDatas(data);
      setGradeTotal(datas.map((item) => item.cnt));
      console.log("gradesss: " + gradeTotal);
    };
    fetchData();
  }, [semester]);

  const chartOptions = useChart({
    labels: ["1학년", "2학년", "3학년", "4학년"],
    legend: {
      position: "right",
      offsetX: -20,
      offsetY: 64,
      itemMargin: {
        vertical: 8,
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  });

  return (
    <Chart type="pie" series={series} options={chartOptions} width={400} />
  );
}
