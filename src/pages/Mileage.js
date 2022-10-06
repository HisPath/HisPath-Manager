import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import axios from "axios";
import { useSnackbar } from "notistack";
import { semesterList } from "../constants/commons";
import mileageRegisterExcel from "../assets/mileage_register.xlsx";

const Section = styled(Container)({
  marginTop: 40,
  padding: 24,
  borderRadius: 8,
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: "calc(100vh - 236.5px)",
});

const columns = [
  {
    field: "categoryName",
    headerName: "카테고리",
    width: 200,
  },
  {
    field: "name",
    headerName: "활동명",
    width: 250,
  },
  {
    field: "remark",
    headerName: "비고",
    width: 200,
  },
  {
    field: "weight",
    headerName: "가중치",
    width: 100,
  },
  {
    field: "studentRegistered",
    headerName: "학생 등록 여부",
    type: "boolean",
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
  borderRadius: 4,
};

function Mileage() {
  const { enqueueSnackbar } = useSnackbar();
  const [init, setInit] = useState(false);
  const [semester, setSemester] = useState("2022-2");
  const [mileages, setMileages] = useRecoilState(mileageState);
  const [currentId, setCurrentId] = useState(0);
  // 확인 과정 추가
  // const [newExcelFile, setNewExcelFile] = useState(null);
  // const [newExcelDir, setNewExcelDir] = useState(null);
  const onChangeExcel = async (event) => {
    // const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   setNewExcelDir(fileReader.result);
    // };
    const { files } = event.target;
    // setNewExcelFile(files ? files[0] : null);
    // if (files) fileReader.readAsDataURL(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    await axios.post("/api/mileages", formData);
    loadData();
  };
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
      await axios.delete(`/api/mileage/${id}`).then(function (response) {
        enqueueSnackbar("삭제되었습니다.", { variant: "success" });
      });
      loadData();
    }
  };
  const onChangeSelect = (event) => {
    setSemester(event.target.value);
  };
  const loadData = () => {
    axios
      .get(`/api/mileage/semester?semester=${semester}`)
      .then(function (response) {
        setMileages(response.data);
        setInit(true);
      });
  };
  useEffect(() => {
    loadData();
  }, [semester]);
  return (
    <Section component={Paper}>
      <Header>
        <Typography variant="h5">마일리지 관리 시스템</Typography>
        <Box display="flex" gap={1.5}>
          <FormControl hiddenLabel variant="filled" size="small">
            <Select onChange={onChangeSelect} value={semester} disableUnderline>
              {semesterList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            component="a"
            href={mileageRegisterExcel}
            download="마일리지 항목 추가 양식"
            variant="outlined"
          >
            엑셀 양식 다운로드
          </Button>
          <Button component="label" variant="outlined">
            엑셀로 항목 추가
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onChangeExcel}
              hidden
            />
          </Button>
          <Button onClick={handleOpenAdd} variant="contained">
            개별 항목 추가
          </Button>
        </Box>
      </Header>
      <Article>
        {init ? (
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
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Article>
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 항목 추가
          </Typography>
          <AddMileage handleClose={handleCloseAdd} loadData={loadData} />
        </Box>
      </Modal>
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 세부사항
          </Typography>
          <ViewMileage
            id={currentId}
            handleClose={handleCloseView}
            loadData={loadData}
          />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 항목 수정
          </Typography>
          <EditMileage
            id={currentId}
            handleClose={handleCloseEdit}
            loadData={loadData}
          />
        </Box>
      </Modal>
    </Section>
  );
}

export default Mileage;
