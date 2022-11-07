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
import CustomNoRowsOverlay from "../components/Student/CustomNoRowsOverlay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useRecoilState } from "recoil";
import { majorState } from "../atom";
import AddMajor from "../components/Major/AddMajor";
import EditMajor from "../components/Major/EditMajor";
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
    headerName: "전공",
    width: 180,
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

function Major() {
  const [majors, setMajor] = useRecoilState(majorState);
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
      await axios.delete(`/api/major/${id}`).then(function (response) {});
      loadData();
    }
  };
  const loadData = () => {
    axios.get().then(function (response) {
      setMajor(response.data);
      setInit(true);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/majors",
      responseType: "json",
    }).then(function (response) {
      setMajor(
        response.data.map((item) => {
          return { ...item, id: item.id };
        })
      );
      console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <Typography variant="h5">전공 관리 페이지</Typography>
        <Box display="flex" gap={2}>
          <Button onClick={handleOpenAdd} variant="outlined">
            전공 추가
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
          rows={majors}
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
