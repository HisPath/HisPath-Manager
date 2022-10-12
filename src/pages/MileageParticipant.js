import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  Modal,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { mileageState } from "../atom";
import ViewMileage from "../components/Mileage/ViewMileage";
import axios from "axios";
import { semesterList } from "../constants/commons";
import ParticipantTable from "../components/Mileage/ParticipantTable";
import { SelectColumnFilter } from "../components/Mileage/filters";

const Section = styled(Container)({
  marginTop: 8,
  padding: 24,
  borderRadius: 8,
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 200px)",
});

const columns = [
  {
    accessor: "categoryName",
    Header: "카테고리",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "name",
    Header: "활동명",
  },
  {
    accessor: "remark",
    Header: "비고",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 450,
  p: 3.5,
  borderRadius: 4,
};

function MileageParticipant() {
  const [init, setInit] = useState(false);
  const [semester, setSemester] = useState("2022-2");
  const [mileages, setMileages] = useRecoilState(mileageState);
  const [currentId, setCurrentId] = useState();
  const [openView, setOpenView] = useState(false);
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);
  const onChangeSelect = (event) => {
    setSemester(event.target.value);
  };
  const loadData = () => {
    axios
      .get(`/api/mileage/semester?semester=${semester}`)
      .then(function (response) {
        setMileages(response.data);
        setInit(true);
      });
  };
  useEffect(() => {
    loadData();
  }, [semester]);
  return (
    <Section>
      <Header>
        <Typography variant="h5">마일리지 참여 관리</Typography>
        <Box display="flex" gap={1.5}>
          <FormControl hiddenLabel variant="filled" size="small">
            <Select onChange={onChangeSelect} value={semester} disableUnderline>
              {semesterList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Header>
      <Article>
        {init ? (
          <ParticipantTable
            columns={columns}
            data={mileages}
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
          <Typography variant="h6" component="h2">
            마일리지 세부사항
          </Typography>
          <ViewMileage
            id={currentId}
            handleClose={handleCloseView}
            loadData={loadData}
          />
        </Box>
      </Modal>
    </Section>
  );
}

export default MileageParticipant;
