import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../components/Department/CustomNoRowsOverlay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useRecoilState } from "recoil";
import { departmentState } from "../atom";
import AddDepartment from "../components/Department/AddDepartment";
import EditDepartment from "../components/Department/EditDepartment";
import axios from "axios";

const Header = styled("div")({
  height: "15%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 236.5px)",
});

const columns = [
  {
    field: "id",
    headerName: "번호",
    width: 60,
  },
  {
    field: "name",
    headerName: "학부",
    width: 120,
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

function Department() {
  const [departments, setDepartment] = useRecoilState(departmentState);
  const [init, setInit] = useState(false);

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
      await axios.delete(`/api/department/${id}`).then(function (response) {});
      loadData();
    }
  };
  const loadData = () => {
    axios.get().then(function (response) {
      setDepartment(response.data);
      setInit(true);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/departments",
      responseType: "json",
    }).then(function (response) {
      setDepartment(
        response.data.map((item) => {
          return { ...item, id: item.departmentId };
        })
      );
      console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          학부 관리 시스템
        </Typography>
        <Box display="flex" gap={2}>
          <Button onClick={handleOpenAdd} variant="outlined">
            학부 추가
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
          rows={departments}
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
          <EditDepartment
            id={currentId}
            handleClose={handleCloseEdit}
            loadData={loadData}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Department;
