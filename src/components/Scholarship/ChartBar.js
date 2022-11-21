// components
import Chart, { useChart } from "./chart";

import { useEffect } from "react";
import { useState } from "react";
import { semesterState } from "../../atom";
import { getScholarshipAverage } from "../../apis/scholarship";
import { useRecoilValue } from "recoil";

// ----------------------------------------------------------------------

export default function ChartBar() {
  const [datas, setDatas] = useState([]);
  const semester = useRecoilValue(semesterState);

  const series = [{ name: "총 인원", data: datas }];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScholarshipAverage(semester);
      setDatas(data);
    };
    fetchData();
  }, [semester]);

  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: "45%" },
    },
    xaxis: {
      categories: ["1~20", "21~40", "41~60", "61~80", "81~100", "100~"],
    },
  });

  return (
    <Chart type="bar" series={series} options={chartOptions} height={320} />
  );
}
