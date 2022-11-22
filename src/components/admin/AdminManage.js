import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Modal, Paper, styled, Typography } from '@mui/material';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '../Student/CustomNoRowsOverlay';
import Chip from '@mui/material/Chip';
import { useSnackbar } from 'notistack';
import { useRecoilState } from 'recoil';
import { managerState } from '../../atom';
import GoogleLoginButton from '../common/GoogleLoginButton';
import ModeSwitch from '../common/ModeSwitch';
import { getManagers, approveManagerSuper, approveManagerNormal } from '../../apis/manager';

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

const columns = [
  {
    field: 'name',
    headerName: '관리자 이름',
    width: 300,
  },
  {
    field: 'department',
    headerName: '소속',
    width: 200,
  },
  {
    field: 'email',
    headerName: '이메일',
    width: 300,
  },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 805,
  p: 3.5,
  borderRadius: 1,
};

export default function AdminManage({ card, setCard }) {
  const [managers, setManagers] = useRecoilState(managerState);
  const [init, setInit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [currentId, setCurrentId] = useState(0);
  const [openView, setOpenView] = useState(false);

  const handleCloseView = () => setOpenView(false);
  const loadData = async () => {
    const data = await getManagers();
    setManagers(data);
    setInit(true);
  };
  useEffect(() => {
    loadData();
  }, []);

  const [openSuper, setOpenSuper] = React.useState(false);

  const handleClickOpenSuper = () => {
    setOpenSuper(true);
  };

  const handleCloseSuper = () => {
    setOpenSuper(false);
  };

  const [openNormal, setOpenNormal] = React.useState(false);

  const handleClickOpenNormal = () => {
    setOpenNormal(true);
  };

  const handleCloseNormal = () => {
    setOpenNormal(false);
  };

  const setSuper = async (data) => {
    await approveManagerSuper(data.level, currentId);
    enqueueSnackbar('슈퍼 관리자로 지정되었습니다!', { variant: 'success' });
    loadData();
    handleCloseSuper();
  };

  const setNormal = async (data) => {
    await approveManagerNormal(data.level, currentId);
    enqueueSnackbar('일반 관리자로 지정되었습니다!', { variant: 'success' });
    loadData();
    handleCloseNormal();
  };

  const Chips = ({ params }) => {
    const id = params.id;
    const approved = params.row.approved;
    const power = params.row.power;
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip
          color="success"
          onClick={() => {
            handleClickOpenSuper();
            setCurrentId(id);
          }}
          variant={power === 2 ? 'filled' : 'outlined'}
          size="lg"
          label="슈퍼"
        />
        <Chip
          color="warning"
          onClick={() => {
            handleClickOpenNormal();
            setCurrentId(id);
          }}
          size="lg"
          variant={power === 1 ? 'filled' : 'outlined'}
          label="일반"
        />
        <Chip
          color="error"
          onClick={function () {}}
          size="lg"
          variant={power === 0 ? 'filled' : 'outlined'}
          label="미승인"
        />
      </Box>
    );
  };

  return (
    <Container component={Paper}>
      <Header>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={600}>
              관리자 권한 관리 페이지
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent={'right'}>
              <ModeSwitch card={card} setCard={setCard} />
            </Box>
          </Grid>
        </Grid>
      </Header>
      <Article>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: { disableToolbarButton: true },
            },
          }}
          rows={managers}
          columns={[
            ...columns,
            {
              field: 'approved',
              headerName: '권한',
              width: 300,
              renderCell: (params) => <Chips params={params} />,
            },
          ]}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableColumnMenu
          disableDensitySelector
          hideFooterSelectedRowCount
        />
      </Article>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            현학기 마일리지 신청 목록
          </Typography>
        </Box>
      </Modal>
      <Dialog open={openSuper} onClose={handleCloseSuper}>
        <DialogTitle>슈퍼 관리자로 지정하겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseSuper}>취소</Button>
          <Button onClick={setSuper} autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNormal} onClose={handleCloseNormal}>
        <DialogTitle>일반 관리자로 지정하겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseNormal}>취소</Button>
          <Button onClick={setNormal} autoFocus>
            예
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
