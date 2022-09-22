import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../components/Student/CustomNoRowsOverlay";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useRecoilState } from "recoil";
import { studentState } from "../atom";
import AddStudent from "../components/Student/AddStudent";
import ViewStudent from "../components/Student/ViewStudent";
import EditStudent from "../components/Student/EditStudent";

const Section = styled(Container)({
  height: "calc(100vh - 96px)",
});

const Header = styled("div")({
  height: "15%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 24,
});

const Article = styled("div")({
  height: "85%",
});

const columns = [
  {
    field: "id",
    headerName: "id",
    width: 75,
  },
  {
    field: "studentName",
    headerName: "이름",
    width: 150,
  },
  {
    field: "studentId",
    headerName: "학번",
    width: 100,
  },
  {
    field: "major",
    headerName: "전공",
    width: 150,
  },
  {
    field: "year",
    headerName: "학년",
    width: 50,
  },
  {
    field: "semester",
    headerName: "학기",
    width: 50,
  },
  {
    field: "birth",
    headerName: "생년월일",
    width: 100,
  },
  {
    field: "phone",
    headerName: "전화번호",
    width: 150,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 150,
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Students() {
  const [students, setStudents] = useRecoilState(studentState);
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
  const handleDeleteClick = (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      setStudents((old) => old.filter((item) => item.id !== id));
    }
  };
  return (
    <Section>
      <Header>
        <Typography variant="h5">학생 관리 시스템</Typography>
        <Button onClick={handleOpenAdd} variant="outlined">
          학생 추가
        </Button>
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
              field: "actions",
              type: "actions",
              headerName: "기능",
              width: 128,
              cellClassName: "actions",
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
          <AddStudent handleClose={handleCloseAdd} />
        </Box>
      </Modal>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학생 세부정보
          </Typography>
          <ViewStudent id={currentId} handleClose={handleCloseView} />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            학생정보 수정
          </Typography>
          <EditStudent id={currentId} handleClose={handleCloseEdit} />
        </Box>
      </Modal>
    </Section>
  );
}

export default Students;
