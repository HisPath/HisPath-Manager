import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  Container,
  Grid,
  Paper,
  styled,
  Stack,
  Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const Section = styled(Container)({
  marginTop: 0,
  padding: 24,
  borderRadius: 8,
});
const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: 10,
});
function Article({
  id,
  managerId,
  managerName,
  title,
  content,
  viewCnt,
  importance,
  pubDate,
  expDate,
}) {
  function ImpChip({ imp }) {
    if (imp) return <Chip label={'중요'} variant="outlined" color="error" />;
  }
  function TimeChip({ pubDate }) {
    const today = new Date();
    const pDate = new Date(pubDate);
    if (pDate > today) return <Chip label={'예약'} variant="outlined" color="success" />;
  }
  function HtmlToString() {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  //
  return (
    <Container>
      <Header>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          공지사항 &#62; 상세
        </Typography>
      </Header>

      <Box container>
        <br />
        <Box container display="flex" justifyContent={'center'}>
          <Typography variant="h3" p={1}>
            {title}
          </Typography>
        </Box>
        <br />
        <hr />
        <Grid container spacing={2}>
          <Grid item xs="8">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="left"
              style={{
                paddingTop: '3px',
                paddingLeft: '0',
              }}
            >
              <ImpChip imp={importance} label="Important Notice" />
              <TimeChip pubDate={pubDate} label="Reserved Notice" />
              <Chip label={'작성자: ' + managerName} variant="outlined" color="primary" />
              <Chip label={'게시일: ' + pubDate} variant="outlined" color="primary" />
              <Chip label={'만료일: ' + expDate} variant="outlined" color="primary" />
              <Chip label={'조회수: ' + viewCnt} variant="outlined" color="primary" />
            </Stack>
          </Grid>
          <Grid item xs="4">
            <Buttons noticeId={id} />
          </Grid>
        </Grid>
        <hr />
        <br />
        <HtmlToString />
      </Box>
    </Container>
  );
}
function Buttons({ noticeId, history }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (noticeId) => {
    setOpen(false);
    axios.delete(`/api/notice/${noticeId}`);
    enqueueSnackbar('삭제되었습니다.', { variant: 'success' });
  };
  return (
    <Box
      container
      display="flex"
      justifyContents={'right'}
      gap={0.5}
      style={{
        float: 'right',
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        수정
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          setOpen(true);
        }}
      >
        삭제
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          window.open('/notice', '_self');
        }}
      >
        돌아가기
      </Button>
      <Dialog open={open}>
        <DialogTitle>공지를 삭제하겠습니까?</DialogTitle>
        <DialogActions>
          <Link
            to={'/notice'}
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleDelete(noticeId);
              }}
            >
              예
            </Button>
          </Link>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpen(false);
            }}
          >
            아니오
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit}>
        <DialogTitle>공지를 수정하겠습니까?</DialogTitle>
        <DialogActions>
          <Link
            to={`/editpost/${noticeId}`}
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setOpenEdit(false);
              }}
            >
              예
            </Button>
          </Link>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenEdit(false);
            }}
          >
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Post() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState();

  const loadData = () => {
    axios.get(`/api/notice/${noticeId}`).then(function (response) {
      setNotice(response.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container fixed>
      <Article {...notice} />
    </Container>
  );
}

export default Post;
