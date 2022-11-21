// components
<<<<<<< HEAD
=======

>>>>>>> c7958d585ffe6e989f006031a299b3655a38dc05
import Chart, { useChart } from "./chart";

import { useEffect } from "react";
import { useState } from "react";
import { semesterState } from "../../atom";
import { getScholarshipByDepartment } from "../../apis/scholarship";
import { useRecoilValue } from "recoil";

// ----------------------------------------------------------------------
export default function ChartColumnSingle() {
  const [datas, setDatas] = useState([]);
  const [departmentTotal, setDepartmentTotal] = useState([]);
  const semester = useRecoilValue(semesterState);

<<<<<<< HEAD
  const series = [{ name: "총 인원", data: departmentTotal }];
=======
  const series = [{ data: departmentTotal }];
>>>>>>> c7958d585ffe6e989f006031a299b3655a38dc05

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScholarshipByDepartment(semester);
      setDatas(data);
      setDepartmentTotal(datas.map((item) => item.cnt));
<<<<<<< HEAD
      console.log("department: " + departmentTotal);
=======
>>>>>>> c7958d585ffe6e989f006031a299b3655a38dc05
    };
    fetchData();
  }, [semester]);

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: "16%",
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: [
        "전산전자",
        "국제어문",
        "경영경제",
        "법학부",
        "커뮤니케이션",
        "상담복지",
<<<<<<< HEAD
        "기계제어",
        "공간환경시스템",
        "ICT창업",
        "생명과학",
        "콘텐츠융합디자인",
      ],
    },
=======
        "공간환경시스템",
        "콘텐츠융합디자인",
        "기계제어",
        "ICT창업",
        "생명과학",
      ],
    },
    tooltip: {
      y: {
        formatter: (value) => `총 인원: ${value} `,
      },
    },
>>>>>>> c7958d585ffe6e989f006031a299b3655a38dc05
  });

  return (
    <Chart type="bar" series={series} options={chartOptions} height={320} />
  );
}
