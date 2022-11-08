import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Modal,
  styled,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { useRecoilState } from "recoil";
import { scholarshipListState, semesterState } from "../atom";
import * as React from "react";
import axios from "axios";
import ViewScholarshipRegistered from "../components/Scholarship/ViewScholarshipRegistered";
import { SelectColumnFilter } from "../components/Scholarship/filters";
import ScholarshipListTable from "../components/Scholarship/ScholarshipListTable";
import { InputLabel } from "@mui/material";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 200px)",
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 800,
  p: 3.5,
  borderRadius: 1,
};

const columns = [
  {
    accessor: "departmentName",
    Header: "학부",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "major1Name",
    Header: "1전공",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "major2Name",
    Header: "2전공",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "name",
    Header: "이름",
  },
  {
    accessor: "studentNum",
    Header: "학번",
  },
  {
    accessor: "totalWeight",
    Header: "총 가중치",
  },
  {
    accessor: "phone",
    Header: "전화번호",
  },
  {
    accessor: "email",
    Header: "이메일",
  },
];

function ScholarshipList() {
  const [init, setInit] = useState(false);
  const [scholarshipLists, setScholarshipsList] =
    useRecoilState(scholarshipListState);
  const [semester, setSemester] = useRecoilState(semesterState);
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

  useEffect(() => {
    const fetchData = async () => {
      console.log(semester);
      axios
        .get(`/api/scholarships?approved=true&semester=${semester}`)
        .then(function (response) {
          console.log(response.data);
          setScholarshipsList(response.data);
          setInit(true);
        });
    };
    fetchData();
  }, [semester]);

  const handleChanges = (event) => {
    setSemester(event.target.value);
  };

  const [semesters, setSemesters] = React.useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/scholarship/students");
      console.log(response.data);
      const studentSet = new Set();
      response.data?.forEach((item) => studentSet.add(item.semester));
      console.log(studentSet);
      setSemesters([...studentSet]);
      setData(response.data);
      setInit(true);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          마일리지 장학금 수혜자 조회
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
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

          {/* <select
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}
          >
            {semesters.map((item) => (
              <option key={item._id} value={item.name}>
                {semesters.name}
              </option>
            ))}
          </select> */}
        </FormControl>
      </Header>
      <Article>
        {init ? (
          <ScholarshipListTable
            columns={columns}
            data={scholarshipLists}
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
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2"></Typography>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default ScholarshipList;
