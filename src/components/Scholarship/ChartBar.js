// components
import Chart, { useChart } from "./chart";

// ----------------------------------------------------------------------

const series = [{ data: [30, 40, 60, 51, 21, 7] }];

export default function ChartBar() {
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
