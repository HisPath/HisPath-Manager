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
  Select,
  styled,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { mileageState } from "../atom";
import AddMileage from "../components/Mileage/AddMileage";
import ViewMileage from "../components/Mileage/ViewMileage";
import EditMileage from "../components/Mileage/EditMileage";
import axios from "axios";
import { useSnackbar } from "notistack";
import { semesterList } from "../constants/commons";
import mileageRegisterExcel from "../assets/mileage_register.xlsx";
import MileageTable from "../components/Mileage/AcitivityTable";
import { SelectColumnFilter } from "../components/Mileage/filters";

const Section = styled(Container)({
  marginTop: 8,
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
  height: "calc(100vh - 200px)",
});

const columns = [
  {
    accessor: "categoryName",
    Header: "카테고리",
    Filter: SelectColumnFilter,
  },
  {
    accessor: "name",
    Header: "활동명",
  },
  {
    accessor: "remark",
    Header: "비고",
  },
  {
    accessor: "weight",
    Header: "가중치",
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

function MileageActivity() {
  const { enqueueSnackbar } = useSnackbar();
  const [init, setInit] = useState(false);
  const [semester, setSemester] = useState("2022-2");
  const [mileages, setMileages] = useRecoilState(mileageState);
  const [currentId, setCurrentId] = useState();
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
  const handleOpenEdit = (id) => {
    setCurrentId(id);
    setOpenEdit(true);
  };
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
    <Section>
      <Header>
        <Typography variant="h5">마일리지 항목 관리</Typography>
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
          <MileageTable
            columns={columns}
            data={mileages}
            handleOpenEdit={handleOpenEdit}
            handleDeleteClick={handleDeleteClick}
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

export default MileageActivity;
