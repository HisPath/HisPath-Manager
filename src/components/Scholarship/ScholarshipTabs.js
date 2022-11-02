import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ScholarshipRegisteredTable from "./ScholarshipRegisteredTable";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   return (
  //     <Box sx={{ width: "100%" }}>
  //       <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
  //         <LinkTab label="장학금 신청자 목록" href="/drafts" />
  //         <LinkTab label="장학금 수혜자 목록" href="/trash" />
  //         <TabPanel value={value} index={0}>
  //           <ScholarshipRegisteredTable></ScholarshipRegisteredTable>
  //         </TabPanel>
  //       </Tabs>
  //     </Box>
  //   );
  // }
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="마일리지 활동조회" {...a11yProps(0)} />
            <Tab label="마일리지 활동신청" {...a11yProps(1)} />

            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        {/* <TabPanel value={value} index={0}>
          <ScholarshipRegisteredTable></ScholarshipRegisteredTable>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScholarshipRegisteredTable></ScholarshipRegisteredTable>
        </TabPanel> */}
        {/* <TabPanel value={value} index={2}>
      Item Three
    </TabPanel> */}
      </Box>
      {/* <Link
      href="/"
      variant="body2"
      sx={{
        textDecoration: "none",
        color: lightColor,
        "&:hover": {
          color: "common.white",
        },
      }}
      rel="noopener noreferrer"
      // target="_blank"
    >
      <Fab
        className="apply_button"
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
      >
        {value ? "마일리지 활동 신청" : "장학금 신청"}
        장학금 신청
      </Fab>
    </Link> */}
    </div>
  );
}
