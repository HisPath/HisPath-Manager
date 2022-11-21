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
import { useRecoilState } from "recoil";
import { mileageState } from "../atom";
import ViewMileage from "../components/Mileage/ViewMileage";
import ParticipantTable from "../components/Mileage/ParticipantTable";
import { SelectColumnFilter } from "../components/Mileage/filters";
import { getMileages } from "../apis/milage";
import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import DummyTable from "../components/Mileage/DummyTable";

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
    accessor: "semester",
    Header: "신청시기",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "categoryName",
    Header: "학생 이름",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "studentNum",
    Header: "학번",
  },
  {
    accessor: "name",
    Header: "활동명",
  },
  {
    accessor: "remark",
    Header: "활동비고",
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
  borderRadius: 1,
};

function MileageParticipant() {
  const [init, setInit] = useState(false);
  const [mileages, setMileages] = useRecoilState(mileageState);
  const [currentId, setCurrentId] = useState();
  const [openView, setOpenView] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);
  const loadData = async () => {
    const data = await getMileages();
    setMileages(data);
    setInit(true);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          마일리지 참여 관리
        </Typography>
      </Header>
      <Article>
        {init ? (
          <DummyTable
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
            정말 허가하시겠습니까?
          </Typography>
          {/* <ViewMileage
            id={currentId}
            handleClose={handleCloseView}
            loadData={loadData}
          /> */}

          <Button onClick={handleDialogClose} autoFocus>
            닫기
          </Button>
          <Button onClick={handleDialogClose} autoFocus>
            허가
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default MileageParticipant;
