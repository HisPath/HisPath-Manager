import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
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
import { Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import ReportOffIcon from '@mui/icons-material/ReportOff';

let noticeId = 3432;
var mName = 'Adam';
var title = 'Title';
var content =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
var viewCnt = 75;
var important = true;
var sDate = '2022-10-03';
var eDate = '2022-10-10';

function Header() {
  return (
    <header>
      <Typography variant="h2" style={{ fontWeight: 'bold' }}>
        공지 상세
      </Typography>
    </header>
  );
}
function Buttons() {
  const [open, setOpen] = useState(false);
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
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
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
        </DialogActions>
      </Dialog>
    </Box>
  );
}
function Article(props) {
  const nid = props.noticeId;

  // const [post, setPost] = useState();
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = axios.get('http://localhost:8080/api/notice/{}');
  //       console.log(res1.data);
  //       setNoticeList(res1.data);
  //     } catch (err) {
  //       console.log('err >> ', err);
  //     }
  //   };
  //   fetchNoticeList();
  // }, []);
  //Temporary
  const [imp, setImp] = useState(important);
  const [managerName, setManagerName] = useState(mName);
  const [contents, setContents] = useState(content);
  const [startDate, setStartDate] = useState(new Date(sDate).toLocaleDateString());
  const [endDate, setEndDate] = useState(new Date(eDate).toLocaleDateString());
  const [view, setView] = useState(viewCnt);
  return (
    <Box container>
      <br />
      <Grid container spacing={3}>
        <Grid item xs="3">
          <Stack direction="row" spacing={1}>
            <ReportIcon value="Visible" />
            <AccessTimeIcon value="Reserve" />
          </Stack>
        </Grid>
        <Grid item xs="5">
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip label={'Writen by: ' + managerName} variant="outlined" color="primary" />
            <Chip label={'Publish Date: ' + startDate} variant="outlined" color="primary" />
            <Chip label={'Expired Date: ' + endDate} variant="outlined" color="primary" />
            <Chip label={'Views: ' + view} variant="outlined" color="primary" />
          </Stack>
        </Grid>
        <Grid item xs="4">
          <Buttons />
        </Grid>
      </Grid>
      <hr />
      {contents}
    </Box>
  );
}

export default function Post() {
  const { params } = this.props.match;

  return (
    <Container fixed>
      <Header />
      <Article noticeId={params.noticeId} />
    </Container>
  );
}
