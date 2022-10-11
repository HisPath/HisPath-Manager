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
  marginTop: 40,
  padding: 24,
  borderRadius: 8,
});
const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
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
  function ImpIcon({ imp }) {
    if (imp) return <ReportIcon style={{ height: 'inherit' }} />;
    else return <p></p>;
  }
  function TimeIcon({ pubDate }) {
    const today = new Date();
    const pDate = new Date(pubDate);
    if (pDate > today) return <AccessTimeIcon style={{ height: 'inherit' }} />;
    else return <p></p>;
  }
  function HtmlToString() {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  //
  return (
    <Section component={Paper}>
      <Header>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          상세공지
        </Typography>
      </Header>
      <hr />
      <Box container>
        <br />
        <Typography variant="h5" p={1}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs="8">
            <Stack direction="row" spacing={2} justifyContent="left">
              <Chip label={'작성자: ' + managerName} variant="outlined" color="primary" />
              <Chip label={'게시일: ' + pubDate} variant="outlined" color="primary" />
              <Chip label={'만료일: ' + expDate} variant="outlined" color="primary" />
              <Chip label={'조회수: ' + viewCnt} variant="outlined" color="primary" />
              <ImpIcon imp={importance} label="Important Notice" />
              <TimeIcon pubDate={pubDate} label="Reserved Notice" />
            </Stack>
          </Grid>
          <Grid item xs="4">
            <Buttons noticeId={id} />
          </Grid>
        </Grid>
        <br />
        <hr />
        <HtmlToString />
      </Box>
    </Section>
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
    <Box>
      <ButtonGroup
        gap={2}
        style={{
          float: 'right',
          paddingTop: '8px',
          display: 'flex',
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
      </ButtonGroup>
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
      {/* <Header /> */}
      <Article {...notice} />
    </Container>
  );
}

export default Post;
