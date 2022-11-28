import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { majorState } from "../atom";
import AddMajor from "../components/Major/AddMajor";
import EditMajor from "../components/Major/EditMajor";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { deleteMajor, getMajors } from "../apis/major";

import MajorPage from "../components/Major/MajorPage";
import MajorCardPage from "../components/Major/MajorCardPage";
import ModeSwitch from "../components/common/ModeSwitch";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingTop: 24,
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 224px)",
  paddingBottom: 24,
});
const CardArticle = styled(Box)({
  height: "auto",
  paddingBottom: 24,
});

const columns = [
  {
    field: "id",
    headerName: "번호",
    width: 80,
  },
  {
    field: "name",
    headerName: "전공",
    width: 300,
  },
  // {
  //   field: 'department',
  //   headerName: '소속 학부',
  //   width: 250,
  // },
  // {
  //   field: 'credit',
  //   headerName: '총 학점',
  //   width: 150,
  // },
  // {
  //   field: 'total',
  //   headerName: '총 인원',
  //   width: 180,
  // },
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

function Major() {
  const { enqueueSnackbar } = useSnackbar();
  const [majors, setMajor] = useRecoilState(majorState);
  const [card, setCard] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleDeleteClick = async (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      await deleteMajor(id);
      enqueueSnackbar("삭제되었습니다.", { variant: "success" });
      loadData();
    }
  };
  const loadData = async () => {
    const data = await getMajors();
    setMajor(
      data.map((item) => {
        return { ...item, id: item.id };
      })
    );
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container component={Paper}>
      <Header>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={600}>
              전공 관리 페이지
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box container display="flex" justifyContent={"right"}>
              <ModeSwitch card={card} setCard={setCard} />
              <Button onClick={handleOpenAdd} variant="outlined">
                전공 추가
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Header>
      {card ? (
        <CardArticle>
          <MajorCardPage
            majors={majors}
            setCurrentId={setCurrentId}
            handleOpenEdit={handleOpenEdit}
            handleDeleteClick={handleDeleteClick}
          />
        </CardArticle>
      ) : (
        <Article>
          <MajorPage
            majors={majors}
            setCurrentId={setCurrentId}
            handleOpenEdit={handleOpenEdit}
            handleDeleteClick={handleDeleteClick}
          />
        </Article>
      )}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            전공 추가
          </Typography>
          <AddMajor handleClose={handleCloseAdd} loadData={loadData} />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            전공 수정
          </Typography>
          <EditMajor
            id={currentId}
            handleClose={handleCloseEdit}
            loadData={loadData}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Major;
