import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRecoilState } from "recoil";
import { scholarshipState } from "../atom";
import * as React from "react";
import axios from "axios";
import ScholarshipRegisteredTable from "../components/Scholarship/ScholarshipRegisteredTable";
import ViewScholarshipRegistered from "../components/Scholarship/ViewScholarshipRegistered";
import { SelectColumnFilter } from "../components/Scholarship/filters";
import ScholarshipListTable from "../components/Scholarship/ScholarshipListTable";
import { InputLabel } from "@mui/material";
import BasicTabs from "../components/Scholarship/ScholarshipTabs";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 24,
});

function ScholarshipManagement() {
  const [init, setInit] = useState(false);
  const [scholarships, setScholarships] = useRecoilState(scholarshipState);
  const [currentId, setCurrentId] = useState();
  const [openView, setOpenView] = useState(false);
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseView = () => setOpenView(false);
  const loadData = () => {
    axios
      .get(`/api/scholarships?approved=true&semester=2022-2`)
      .then(function (response) {
        setScholarships(response.data);
        setInit(true);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5">마일리지 장학금 관리 페이지</Typography>
      </Header>
      <BasicTabs></BasicTabs>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="마일리지 장학금 신청자 목록" {...a11yProps(0)} />
          <Tab label="마일리지 장학금 수혜자 명단" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Article>
          {init ? (
            <ScholarshipRegisteredTable
              columns={columns}
              data={scholarships}
              initialState={{ showColumnFilters: true }}
              muiTableHeadCellFilterTextFieldProps={{
                sx: { m: "0.5rem 0", width: "100%" },
                variant: "outlined",
              }}
              handleOpenView={handleOpenView}
            />
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Article>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Article>
          {init ? (
            <ScholarshipListTable
              columns={columns}
              data={scholarships}
              handleOpenView={handleOpenView}
            />
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Article>
      </TabPanel>

      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            (2022-2) 마일리지 목록
          </Typography>
          <InputLabel>[전산전자] 박성진 (21700266)</InputLabel>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
          />
        </Box>
      </Modal> */}
    </Container>
  );
}

export default ScholarshipManagement;
