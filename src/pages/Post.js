import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
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
import { useSnackbar } from 'notistack';
import '../style/image.css';
import { deleteNotice, getNoticeById } from '../apis/notice';

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: 15,
  paddingTop: 15,
});
function Article({
  id,
  managerId,
  managerName,
  title,
  content,
  viewCnt,
  importance,
  regDate,
  pubDate,
  expDate,
}) {
  function ImpChip({ imp }) {
    if (imp)
      return (
        <Typography
          variant="p"
          color="error"
          style={{
            fontWeight: 900,
          }}
        >
          중요공지
        </Typography>
      );
  }
  function TimeChip({ pubDate }) {
    const today = new Date();
    const pDate = new Date(pubDate);
    if (pDate > today)
      return (
        <Typography
          variant="p"
          color="green"
          style={{
            fontWeight: 900,
          }}
        >
          예약공지
        </Typography>
      );
  }
  function HtmlToString() {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  //
  return (
    <Container component={Paper}>
      <Header>
        <Typography variant="h5" fontWeight={600}>
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
          <Grid item xs="9">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="right"
              style={{
                paddingTop: '7px',
                paddingLeft: '0',
              }}
            >
              <ImpChip imp={importance} label="Important Notice" />
              <TimeChip pubDate={pubDate} label="Reserved Notice" />
              <Typography variant="p">등록일: {regDate}</Typography>
              <Typography variant="p">작성자: {managerName}</Typography>
              <Typography variant="p">
                게시기간: {pubDate} ~ {expDate}
              </Typography>
              <Typography variant="p">조회수: {viewCnt}</Typography>
            </Stack>
          </Grid>
          <Grid item xs="3">
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (noticeId) => {
    setOpen(false);
    deleteNotice(noticeId);
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
        variant="contained"
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        수정
      </Button>
      <Button
        variant="contained"
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
          navigate('/notice');
        }}
      >
        돌아가기
      </Button>
      <Dialog open={open}>
        <DialogTitle>공지를 삭제하겠습니까?</DialogTitle>
        <DialogActions>
          <Box container display="flex" justifycontents={'right'} gap={1}>
            <Button
              variant="outlined"
              onClick={() => {
                handleDelete(noticeId);
                navigate('/notice');
              }}
            >
              예
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              아니오
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit}>
        <DialogTitle>공지를 수정하겠습니까?</DialogTitle>
        <DialogActions>
          <Box container display="flex" justifycontents={'right'} gap={1}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenEdit(false);
                navigate(`/editpost/${noticeId}`);
              }}
            >
              예
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpenEdit(false);
              }}
            >
              아니오
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Post() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState();

  const loadData = () => {
    getNoticeById(noticeId).then(function (data) {
      setNotice(data);
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
