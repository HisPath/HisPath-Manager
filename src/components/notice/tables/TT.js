import React, { useState, useEffect } from 'react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import CustomNoRowsOverlay from '../../Mileage/CustomNoRowsOverlay';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
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
    headerName: '공지번호',
  },
  {
    field: 'title',
    width: 300,
    headerName: '제목',
  },
  {
    field: 'managerName',
    width: 100,
    headerName: '작성자',
  },
  {
    field: 'pubDate',
    width: 100,
    type: Date,
    headerName: '게시일',
  },
  {
    field: 'expDate',
    width: 100,
    type: Date,
    headerName: '만료일',
  },
  {
    field: 'viewCnt',
    width: 100,
    headerName: '조회수',
  },
];

function TT({ history }) {
  const [noticeType, setNoticeType] = useState(0);
  const [init, setInit] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const [noticeList, setNoticeList] = useState([]);

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
    axios.get('/api/notice').then(function (response) {
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
            columns={columns}
            onRowClick={({ id }) => window.open(`/notice/${id}`, '_self')}
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
