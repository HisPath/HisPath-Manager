import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  styled,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ScholarshipList from "./ScholarshipList";
import { Paper } from "@mui/material";
import { InputLabel } from "@mui/material";
import { semesterState } from "../../atom";
import { useRecoilState } from "recoil";
import ScholarshipListChart from "./ScholarshipListChart";
import { getSemesters } from "../../apis/scholarship";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingTop: 24,
  paddingBottom: 24,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ msScrollSnapPointsY: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ScholarshipTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [semester, setSemester] = useRecoilState(semesterState);
  const [semesters, setSemesters] = React.useState([]);
  const handleChanges = (event) => {
    setSemester(event.target.value);
  };
  const [setInit] = useState(false);

  const [setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSemesters();
      const studentSet = new Set();
      response?.forEach((item) => studentSet.add(item.semester));
      setSemesters([...studentSet]);
      setData(response);
      setInit(true);
    };
    fetchData();
  }, []);

  return (
    <Container component={Paper}>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          마일리지 장학금 수혜자 조회
        </Typography>
        <FormControl sx={{ minHeight: 10, minWidth: 120 }}>
          <InputLabel id="semester_id">학기</InputLabel>
          <Select
            labelId="semester_id"
            id="semester_id"
            value={semester}
            label="학기"
            onChange={handleChanges}
          >
            {semesters.map((s, idx) => {
              return (
                <MenuItem key={idx} value={s}>
                  {s}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Header>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="테이블" {...a11yProps(0)} />
            <Tab label="차트" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ScholarshipList></ScholarshipList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScholarshipListChart></ScholarshipListChart>
        </TabPanel>
      </Box>
    </Container>
  );
}
