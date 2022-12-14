import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Modal, styled, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { departmentState } from '../atom';
import AddDepartment from '../components/Department/AddDepartment';
import EditDepartment from '../components/Department/EditDepartment';
import { Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { deleteDepartment, getDepartments } from '../apis/department';

import DeptPage from '../components/Department/DeptPage';
import DeptCardPage from '../components/Department/DeptCardPage';
import ModeSwitch from '../components/common/ModeSwitch';

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingTop: 24,
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: 'calc(100vh - 224px)',
  paddingBottom: 24,
});
const CardArticle = styled(Box)({
  height: 'auto',
  paddingBottom: 24,
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 450,
  p: 3.5,
  borderRadius: 1,
};

function Department() {
  const { enqueueSnackbar } = useSnackbar();
  const [departments, setDepartment] = useRecoilState(departmentState);
  const [card, setCard] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleDeleteClick = async (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      await deleteDepartment(id);
      enqueueSnackbar('삭제되었습니다.', { variant: 'success' });
      loadData();
    }
  };
  const loadData = async () => {
    const data = await getDepartments();
    setDepartment(
      data.map((item) => {
        return { ...item, id: item.departmentId };
      }),
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
              학부 관리 시스템
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent={'right'}>
              <ModeSwitch card={card} setCard={setCard} />
              <Button onClick={handleOpenAdd} variant="outlined">
                학부 추가
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Header>
      {card ? (
        <CardArticle>
          <DeptCardPage
            departments={departments}
            setCurrentId={setCurrentId}
            handleOpenEdit={handleOpenEdit}
            handleDeleteClick={handleDeleteClick}
          />
        </CardArticle>
      ) : (
        <Article>
          <DeptPage
            departments={departments}
            setCurrentId={setCurrentId}
            handleOpenEdit={handleOpenEdit}
            handleDeleteClick={handleDeleteClick}
          />
        </Article>
      )}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학부 추가
          </Typography>
          <AddDepartment handleClose={handleCloseAdd} loadData={loadData} />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학부 정보 수정
          </Typography>
          <EditDepartment id={currentId} handleClose={handleCloseEdit} loadData={loadData} />
        </Box>
      </Modal>
    </Container>
  );
}

export default Department;
