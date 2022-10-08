import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

import CustomNoRowsOverlay from '../../Mileage/CustomNoRowsOverlay';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';

// // visibility
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ReportIcon from '@mui/icons-material/Report';
// import ReportOffIcon from '@mui/icons-material/ReportOff';
// import { waitForNone } from 'recoil';
// import { getInitColorSchemeScript } from '@mui/system';
import axios from 'axios';

const Section = styled(Container)({
  marginTop: 40,
  padding: 24,
  borderRadius: 8,
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: 'calc(100vh - 236.5px)',
});

const columns = [
  {
    field: 'id',
    width: 100,
    headerName: 'NO',
  },
  {
    field: 'title',
    width: 300,
    headerName: 'Title',
  },
  {
    field: 'managerName',
    width: 100,
    headerName: 'Writer',
  },
  {
    field: 'pubDate',
    width: 100,
    type: Date,
    headerName: 'Publish Date',
  },
  {
    field: 'expDate',
    width: 100,
    type: Date,
    headerName: 'Expire Date',
  },
  {
    field: 'viewCnt',
    width: 100,
    headerName: 'View',
  },
];

function TT() {
  const [noticeType, setNoticeType] = useState(0);
  // const { enqueueSnackbar } = useSnackbar();
  const [init, setInit] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  // AXIOS
  const [noticeList, setNoticeList] = useState([]);

  const handleOpenEdit = () => function () {};

  function noticeFilter(arr) {
    if (noticeType === 1) {
      var arr = arr.filter(function (data) {
        return data.importance;
      });
    } else if (noticeType === 2) {
      const d = new Date();
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const pubD = new Date(data.pubDate);
        return pubD > today;
      });
    }
    setNoticeList(arr);
  }
  const loadData = () => {
    axios.get('http://localhost:8080/api/notice').then(function (response) {
      noticeFilter(response.data);
      setInit(true);
    });
  };

  useEffect(() => {
    loadData();
  }, [noticeType]);
  return (
    <Section component={Paper}>
      <Header>
        <Typography variant="h5">공지 사항</Typography>
        <Box display="flex" gap={1.5} justifyContent={'right'}>
          <Button variant="outlined" onClick={() => setNoticeType(0)}>
            전체 공지
          </Button>
          <Button variant="outlined" onClick={() => setNoticeType(1)}>
            중요 공지
          </Button>
          <Button variant="outlined" onClick={() => setNoticeType(2)}>
            예약 공지
          </Button>
          <Link
            to={'/addpost'}
            style={{
              textDecoration: 'none',
            }}
          >
            <Button variant="contained">공지 추가</Button>
          </Link>
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
            rows={noticeList}
            columns={[
              ...columns,
              {
                field: 'actions',
                type: 'actions',
                headerName: '자세히',
                width: 128,
                cellClassName: 'actions',
                getActions: ({ id }) => {
                  return [
                    <Link
                      to={`/notice/${id}`}
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      <GridActionsCellItem icon={<OpenInFullIcon />} label="View" />
                    </Link>,
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
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Article>
    </Section>
  );
}
export default TT;
