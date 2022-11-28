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
import { Link, useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { getNotices } from '../../../apis/notice';
const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingTop: 24,
  paddingBottom: 24,
});

const Article = styled(Box)({
  height: 'calc(100vh - 224px)',
});

function AlarmIconCheck({ t }) {
  const p = new Date(t.row.pubDate);
  const d = new Date();
  const s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  const today = new Date(s);
  if (p > today)
    return (
      <Box display="flex" gap={6.5}>
        <Typography variant="h7" fontWeight="normal">
          {t.row.viewCnt}
        </Typography>
      </Box>
    );
  else
    return (
      <Typography variant="h7" fontWeight="normal">
        {t.row.viewCnt}
      </Typography>
    );
}

const StatusIcons = ({ p }) => {
  let imp = false;

  if (p.row.importance) imp = true;
  if (imp) {
    return (
      <PriorityHighIcon
        fontSize="small"
        style={{
          width: 40,
          float: 'right',
          color: 'red',
        }}
      />
    );
  }
};

function TT() {
  const navigate = useNavigate();
  const [noticeType, setNoticeType] = useState(1);
  const [init, setInit] = useState(false);
  const [noticeList, setNoticeList] = useState([]);

  const PublishDuration = ({ p }) => {
    var pubD = p.row.pubDate;
    var expD = p.row.expDate;
    return (
      <Typography variant="h7" fontWeight="normal">
        {pubD} ~ {expD}
      </Typography>
    );
  };

  const columns = [
    {
      field: 'importance',
      width: 30,
      headerName: '',
      type: Date,
      renderCell: (param) => (
        <strong>
          <Box
            style={{
              textAlign: 'center',
              width: 'inherit',
            }}
          >
            <StatusIcons p={param} />
          </Box>
        </strong>
      ),
    },
    {
      field: 'id',
      headerName: 'No',
      width: 50,
      filterable: false,
      renderCell: (index) => noticeList.length - index.api.getRowIndex(index.row.id),
    },
    {
      field: 'regDate',
      width: 100,
      type: Date,
      headerName: '등록일',
    },
    {
      field: 'title',
      width: 500,
      headerName: '제목',
    },
    {
      field: 'managerName',
      width: 150,
      headerName: '작성자',
    },
    {
      field: 'pubDate',
      width: 200,
      headerName: '게시기간',
      renderCell: (param) => (
        <strong>
          <Box
            style={{
              textAlign: 'center',
            }}
          >
            <PublishDuration p={param} />
          </Box>
        </strong>
      ),
    },
    {
      field: 'viewCnt',
      width: 60,
      headerName: '조회수',
      renderCell: (param) => (
        <strong>
          <AlarmIconCheck t={param} />
        </strong>
      ),
    },
  ];

  const loadData = () => {
    getNotices().then(function (data) {
      noticeFilter(data);
      setInit(true);
    });
  };

  useEffect(() => {
    loadData();
  }, [noticeType]);

  const getRowStyle = (params) => {
    if (params.importance) {
      return { background: 'red' };
    }
  };

  function noticeFilter(arr) {
    if (!(noticeType === 0)) {
      const d = new Date();
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        var expD = new Date(data.expDate);
        return expD > today;
      });
    }
    if (noticeType === 1 || noticeType === 2) {
      const d = new Date();
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const pubD = new Date(data.pubDate);
        var expD = new Date(data.expDate);
        expD.setDate(expD.getDate() + 1);
        return pubD <= today && today < expD;
      });
    } else if (noticeType === 3) {
      const d = new Date();
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const pubD = new Date(data.pubDate);
        return pubD > today;
      });
    }
    if (noticeType === 2) {
      var arr = arr.filter(function (data) {
        return data.importance;
      });
    }
    setNoticeList(arr);
  }

  return (
    <Container component={Paper}>
      <Header>
        <Typography variant="h5" fontWeight={600}>
          공지사항
        </Typography>
        <Box display="flex" gap={1.5} justifyContent={'right'}>
          <Button variant="outlined" onClick={() => setNoticeType(0)}>
            전체 공지
          </Button>
          <Button variant="outlined" onClick={() => setNoticeType(1)}>
            게시중
          </Button>
          <Button variant="outlined" onClick={() => setNoticeType(2)}>
            중요 공지
          </Button>
          <Button variant="outlined" onClick={() => setNoticeType(3)}>
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
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:nth-of-type(even) td, &:nth-of-type(even) th': {
                backgroundColor: 'white',
              },
            }}
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
            onRowClick={({ id }) => navigate(`/notice/${id}`)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowClassName={getRowStyle}
            AlternationCount="{ Binding MainData.ProjColl.Count}"
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
    </Container>
  );
}
export default TT;
