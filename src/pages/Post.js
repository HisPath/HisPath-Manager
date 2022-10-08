import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'; // Grid version 1
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { getStepIconUtilityClass, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import ReportOffIcon from '@mui/icons-material/ReportOff';
import axios from 'axios';
import { useSnackbar } from 'notistack';

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
    if (imp) return <ReportIcon />;
    else return <p> </p>;
  }
  function TimeIcon({ pubDate }) {
    const today = new Date();
    // const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    // const today = new Date(t);
    const pDate = new Date(pubDate);
    if (pDate > today) return <AccessTimeIcon />;
    else return <p> </p>;
  }
  return (
    <Box container>
      <br />
      <Typography variant="h4">{title}</Typography>
      <Grid container spacing={3}>
        <Grid item xs="3">
          <Stack direction="row" spacing={1}>
            {/* <ReportIcon value="Visible" /> */}
            <ImpIcon imp={importance} label="Important Notice" />
            {/* <AccessTimeIcon value="Reserve" /> */}
            <TimeIcon pubDate={pubDate} label="Reserved Notice" />
          </Stack>
        </Grid>
        <Grid item xs="5">
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip label={'Writen by: ' + managerName} variant="outlined" color="primary" />
            <Chip label={'Publish Date: ' + pubDate} variant="outlined" color="primary" />
            <Chip label={'Expired Date: ' + expDate} variant="outlined" color="primary" />
            <Chip label={'Views: ' + viewCnt} variant="outlined" color="primary" />
          </Stack>
        </Grid>
        <Grid item xs="4">
          <Buttons noticeId={id} />
        </Grid>
      </Grid>
      <hr />
      {content}
    </Box>
  );
}
function Buttons({ noticeId }) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (noticeId) => {
    setOpen(false);
    // axios.delete(`/api/notice/${noticeId}`).then(function (response) {
    //   enqueueSnackbar('삭제되었습니다.'), { variant: 'success' };
    // });
    axios.delete(`/api/notice/${noticeId}`);
    enqueueSnackbar('삭제되었습니다.');
  };
  return (
    <Box>
      <ButtonGroup
        style={{
          float: 'right',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Link
          to={`/editpost/${noticeId}`}
          key={noticeId}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button variant="outlined">수정</Button>
        </Link>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setOpen(true);
          }}
        >
          삭제
        </Button>

        <Link
          to={'/notice'}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button variant="outlined">Back</Button>
        </Link>
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
    </Box>
  );
}
function Header() {
  return (
    <header>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        상세공지
      </Typography>
    </header>
  );
}

function Post() {
  let { noticeId } = useParams();
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
      <Header />
      <Article {...notice} />
    </Container>
  );
}

export default Post;
