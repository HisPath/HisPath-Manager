import { useEffect, useState } from 'react';
import { Box, Button, Container, Modal, styled, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '../components/Student/CustomNoRowsOverlay';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useRecoilState } from 'recoil';
import { studentState } from '../atom';
import AddStudent from '../components/Student/AddStudent';
import ViewStudent from '../components/Student/ViewStudent';
import EditStudent from '../components/Student/EditStudent';
import axios from 'axios';
import studentRegisterExcel from '../assets/student_register.xlsx';

const Header = styled('div')({
  height: '15%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: 'calc(100vh - 236.5px)',
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
    width: 250,
  },
  {
    field: 'name',
    headerName: '이름',
    width: 200,
  },
  {
    field: 'departmentName',
    headerName: '학부',
    width: 200,
  },
  {
    field: 'major1',
    headerName: '전공',
    width: 200,
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
  borderRadius: 4,
};

function Student() {
  const [students, setStudent] = useRecoilState(studentState);
  const [init, setInit] = useState(false);
  const onChangeExcel = async (event) => {
    // const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   setNewExcelDir(fileReader.result);
    // };
    const { files } = event.target;
    // setNewExcelFile(files ? files[0] : null);
    // if (files) fileReader.readAsDataURL(files[0]);
    const formData = new FormData();
    formData.append('file', files[0]);
    await axios.post('/api/students', formData);
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
      await axios.delete(`/api/student/${id}`).then(function (response) {});
      loadData();
    }
  };
  const loadData = () => {
    axios.get().then(function (response) {
      setStudent(response.data);
      setInit(true);
    });
  };
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/students',
      responseType: 'json',
    }).then(function (response) {
      setStudent(
        response.data.map((item) => {
          return { ...item, id: item.studentId };
        }),
      );
      console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5">학생 관리 시스템</Typography>
        <Box display="flex" gap={2}>
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

export default Student;
