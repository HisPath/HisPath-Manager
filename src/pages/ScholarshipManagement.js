import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Modal,
  styled,
  Typography,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../components/Student/CustomNoRowsOverlay";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useRecoilState } from "recoil";
import { scholarshipState, studentState } from "../atom";
import axios from "axios";
import * as React from "react";
import ViewScholarshipRegistered from "../components/Scholarship/ViewScholarshipRegistered";

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
    width: 30,
  },
  {
    field: "departmentName",
    headerName: "학부",
    width: 150,
  },
  {
    field: "major1Name",
    headerName: "1전공",
    width: 120,
  },
  {
    field: "major2Name",
    headerName: "2전공",
    width: 120,
  },
  {
    field: "name",
    headerName: "이름",
    width: 70,
  },
  {
    field: "studentNum",
    headerName: "학번",
    width: 90,
  },
  {
    field: "totalWeight",
    headerName: "가중치",
    width: 60,
  },
  {
    field: "phone",
    headerName: "전화번호",
    width: 120,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 220,
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 805,
  p: 3.5,
  borderRadius: 1,
};

function ScholarshipManagement() {
  const [init, setInit] = useState(false);
  const [scholarships, setScholarships] = useRecoilState(scholarshipState);
  const [currentId, setCurrentId] = useState(0);
  const handleOpenView = (id) => {
    setCurrentId(id);
    setOpenView(true);
  };

  const [openView, setOpenView] = useState(false);
  const handleCloseView = () => setOpenView(false);
  const handleDeleteClick = async (id) => {
    if (window.confirm(`해당 항목을 삭제하시겠습니까?`)) {
      await axios.delete(`/api/scholarship/${id}`).then(function (response) {});
      loadData();
    }
  };

  // const loadData = () => {
  //   axios
  //     .get(`/api/scholarships?approved=false&semester=2022-2`)
  //     .then(function (response) {
  //       setScholarships(
  //         // const datas = response.data;
  //         // datas.map((data, idx) => {
  //         //   data.id = idx + 1;
  //         // });
  //         response.data.map((item) => {
  //           return { ...item, id: item.studentId };
  //         })
  //       );
  //       console.log("data: ", response.data);
  //     });
  // };
  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = () => {
  //   axios.get().then(function (response) {
  //     setScholarships(response.data);
  //     setInit(true);
  //   });
  // };
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "/api/scholarships?approved=false&semester=2022-2",
  //     responseType: "json",
  //   }).then(function (response) {
  //     setScholarships(
  //       response.data.map((item) => {
  //         return { ...item, id: item.studentId };
  //       })
  //     );
  //     console.log(response.data);
  //   });
  // }, []);

  const loadData = () => {
    axios.get().then(function (response) {
      setScholarships(response.data);
      setInit(true);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/scholarships?approved=false&semester=2022-2",
      responseType: "json",
    }).then(function (response) {
      setScholarships(
        response.data.map((item) => {
          return { ...item, id: item.studentId };
        })
      );
      console.log(response.data);
    });
  }, []);

  const [info, setInfo] = React.useState([]);

  const getInfo = async () => {
    const info = await axios.get(`/api/scholarship/students`);
    setInfo(info.data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Container>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          마일리지 장학금 신청자 관리
        </Typography>
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
          rows={scholarships}
          columns={[
            ...columns,
            {
              field: "actions",
              type: "actions",
              headerName: "기능",
              width: 60,
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
      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            마일리지 신청 목록
          </Typography>
          <ViewScholarshipRegistered
            id={currentId}
            handleClose={handleCloseView}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default ScholarshipManagement;
