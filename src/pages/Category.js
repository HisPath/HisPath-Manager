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
import CustomNoRowsOverlay from "../components/Category/CustomNoRowsOverlay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useRecoilState } from "recoil";
import { categoryState } from "../atom";
import AddCategory from "../components/Category/AddCategory";
import EditCategory from "../components/Category/EditCategory";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { deleteCategory, getCategories } from "../apis/category";

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

const columns = [
  {
    field: "id",
    headerName: "번호",
    width: 80,
  },
  {
    field: "name",
    headerName: "이름",
    width: 300,
  },
  {
    field: "option",
    headerName: "여부",
    width: 150,
  },
  {
    field: "weight",
    headerName: "총 가중치",
    width: 170,
  },
  {
    field: "memo",
    headerName: "비고",
    width: 250,
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

function Category() {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategory] = useRecoilState(categoryState);

  const [currentId, setCurrentId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleDeleteClick = async (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      await deleteCategory(id);
      enqueueSnackbar("삭제되었습니다.", { variant: "success" });
      loadData();
    }
  };
  const loadData = async () => {
    const data = await getCategories();
    setCategory(
      data.map((item) => {
        return { ...item, id: item.categoryId };
      })
    );
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container component={Paper}>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          카테고리 관리 시스템
        </Typography>
        <Box display="flex" gap={2}>
          <Button onClick={handleOpenAdd} variant="outlined">
            카테고리 추가
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
          rows={categories}
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
            카테고리 추가
          </Typography>
          <AddCategory handleClose={handleCloseAdd} loadData={loadData} />
        </Box>
      </Modal>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            카테고리 정보 수정
          </Typography>
          <EditCategory
            id={currentId}
            handleClose={handleCloseEdit}
            loadData={loadData}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Category;
