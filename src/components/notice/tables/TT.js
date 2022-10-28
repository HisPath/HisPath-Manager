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
import { PanoramaSharp } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Grade';
import AlarmIcon from '@mui/icons-material/Alarm';
import { getRowIdFromRowModel } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils';

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
        <AlarmIcon
          fontSize="small"
          style={{
            float: 'right',
          }}
        />
      </Box>
    );
  else
    return (
      <Typography variant="h7" fontWeight="normal">
        {t.row.viewCnt}
      </Typography>
    );
}

// function TimeIcon({ t }) {
//   let time = false;
//   const p = new Date(t);
//   const d = new Date();
//   const s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
//   const today = new Date(s);
//   if (p > today)
//     return (
//       <Box display="flex" gap={4}>
//         <Typography variant="h7" fontWeight="normal">
//           {t}
//         </Typography>
//         <AlarmIcon
//           fontSize="small"
//           style={{
//             float: 'right',
//           }}
//         />
//       </Box>
//     );
//   else
//     return (
//       <Typography variant="h7" fontWeight="normal">
//         {t}
//       </Typography>
//     );
// }

const StatusIcons = ({ p }) => {
  let imp = false;

  if (p.row.importance) imp = true;
  if (imp) {
    return (
      <StarIcon
        fontSize="small"
        style={{
          width: 40,
          float: 'right',
          color: '#ffcc00',
        }}
      />
    );
  }
};

function TT() {
  const [noticeType, setNoticeType] = useState(0);
  const [init, setInit] = useState(false);
  const [noticeList, setNoticeList] = useState([]);

  const columns = [
    {
      field: 'importance',
      width: 40,
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
      width: 150,
      type: Date,
      headerName: '게시일',
    },

    {
      field: 'expDate',
      width: 150,
      type: Date,
      headerName: '만료일',
    },
    {
      field: 'viewCnt',
      width: 100,
      headerName: '조회수',
      renderCell: (param) => (
        <strong>
          <AlarmIconCheck t={param} />
        </strong>
      ),
    },
  ];
  function noticeFilter(arr) {
    if (!(noticeType === 0)) {
      const d = new Date();
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const expD = new Date(data.expDate);
        return expD >= today;
      });
    }
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

  const getRowStyle = (params) => {
    console.log(params);
    if (params.importance) {
      return { background: 'red' };
    }
  };
  return (
    <Section component={Paper}>
      <Header>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          공지사항
        </Typography>
        <Box display="flex" gap={1.5} justifyContent={'right'}>
          <Button variant="outlined" onClick={() => setNoticeType(0)}>
            전체 공지
          </Button>
          <Button variant="outlined" onClick={() => setNoticeType(3)}>
            게시중
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
            pageSize={7}
            rowsPerPageOptions={[20]}
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
    </Section>
  );
}
export default TT;