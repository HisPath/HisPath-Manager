import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Modal, styled, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useRecoilState } from 'recoil';
import { studentState } from '../../atom';
import AddStudent from './AddStudent';
import ViewStudent from './ViewStudent';
import EditStudent from './EditStudent';
import ModeSwitch from '../common/ModeSwitch';
import studentRegisterExcel from '../../assets/student_register.xlsx';
import { Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { addStudents, deleteStudent, getStudents } from '../../apis/student';

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
    field: 'id',
    headerName: '번호',
    width: 60,
  },
  {
    field: 'studentNum',
    headerName: '학번',
    width: 150,
  },
  {
    field: 'name',
    headerName: '이름',
    width: 120,
  },
  {
    field: 'departmentName',
    headerName: '학부',
    width: 200,
  },
  {
    field: 'major1Name',
    headerName: '1전공',
    width: 180,
  },
  {
    field: 'major2Name',
    headerName: '2전공',
    width: 180,
  },
  {
    field: 'semester',
    headerName: '학기',
    width: 100,
  },
];

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

export default function StudentPage({ card, setcard }) {
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudent] = useRecoilState(studentState);
  const onChangeExcel = async (event) => {
    const { files } = event.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    await addStudents(formData);
    loadData();
  };

  const [currentId, setCurrentId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleDeleteClick = async (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      await deleteStudent(id);
      enqueueSnackbar('삭제되었습니다.', { variant: 'success' });
      loadData();
    }
  };
  const loadData = async () => {
    const data = await getStudents();
    setStudent(
      data.map((item) => {
        return { ...item, id: item.studentId };
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
              학생 관리 시스템
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent={'right'}>
              <ModeSwitch card={card} setCard={setcard} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent={'right'}>
              <Button
                component="a"
                href={studentRegisterExcel}
                download="학생 추가 양식"
                variant="outlined"
              >
                엑셀 양식 다운로드
              </Button>
              <Button component="label" variant="outlined">
                엑셀 파일 업로드
                <input
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={onChangeExcel}
                  hidden
                />
              </Button>
              <Button onClick={handleOpenAdd} variant="outlined">
                학생 추가
              </Button>
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
          rows={students}
          columns={[
            ...columns,
            {
              field: 'actions',
              type: 'actions',
              headerName: '기능',
              width: 128,
              cellClassName: 'actions',
              getActions: ({ id }) => {
                return [
                  <GridActionsCellItem
                    icon={<OpenInFullIcon />}
                    label="View"
                    onClick={() => {
                      setCurrentId(+id);
                      handleOpenView();
                    }}
                  />,
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => {
                      setCurrentId(+id);
                      handleOpenEdit();
                    }}
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(+id)}
                  />,
                ];
              },
            },
          ]}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableColumnMenu
          disableDensitySelector
          hideFooterSelectedRowCount
        />
      </Article>
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학생 추가
          </Typography>
          <AddStudent handleClose={handleCloseAdd} loadData={loadData} />
        </Box>
      </Modal>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학생 정보
          </Typography>
          <ViewStudent id={currentId} handleClose={handleCloseView} />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학생 정보 수정
          </Typography>
          <EditStudent id={currentId} handleClose={handleCloseEdit} loadData={loadData} />
        </Box>
      </Modal>
    </Container>
  );
}
