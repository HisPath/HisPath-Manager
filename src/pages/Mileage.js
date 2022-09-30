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
import CustomNoRowsOverlay from "../components/Mileage/CustomNoRowsOverlay";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useRecoilState } from "recoil";
import { mileageState } from "../atom";
import AddMileage from "../components/Mileage/AddMileage";
import ViewMileage from "../components/Mileage/ViewMileage";
import EditMileage from "../components/Mileage/EditMileage";

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
    field: "mileageName",
    headerName: "활동명",
    width: 250,
  },
  {
    field: "category",
    headerName: "카테고리",
    width: 200,
  },
  {
    field: "description",
    headerName: "설명",
    width: 200,
  },
  {
    field: "remark",
    headerName: "비고",
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

function Mileage() {
  const [mileages, setMileages] = useRecoilState(mileageState);
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
      setMileages((old) => old.filter((item) => item.id !== id));
    }
  };
  return (
    <Section>
      <Header>
        <Typography variant="h5">마일리지 관리 시스템</Typography>
        <Button onClick={handleOpenAdd} variant="outlined">
          항목 추가
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
          rows={mileages}
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
            마일리지 항목 추가
          </Typography>
          <AddMileage handleClose={handleCloseAdd} />
        </Box>
      </Modal>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 세부사항
          </Typography>
          <ViewMileage id={currentId} handleClose={handleCloseView} />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 항목 수정
          </Typography>
          <EditMileage id={currentId} handleClose={handleCloseEdit} />
        </Box>
      </Modal>
    </Section>
  );
}

export default Mileage;
