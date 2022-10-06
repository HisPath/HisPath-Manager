import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { AdapterDayjs, LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

function Header() {
  return (
    <header>
      <h1>공지 상세</h1>
    </header>
  );
}
function Article() {
  //Temporary
  let noticeId = 3432;

  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [reserved, setReserved] = useState(false);
  const [date, setDate] = useState('2022-09-22');
  const [view, setView] = useState(70);
  return (
    <article>
      <h1>Title</h1>
      <Grid container spacing={3}>
        <Grid item xs="6">
          <icons>
            <VisibilityIcon value="Visible" />
            <VisibilityOffIcon value="Visible" />
            <AccessTimeIcon value="Reserve" />
          </icons>
        </Grid>
        <Grid item xs="6">
          <Stack
            direction="row"
            spacing={1}
            style={{
              float: 'right',
            }}
          >
            <Chip label={'Date: ' + date} variant="outlined" color="primary" />
            <Chip label={'View: ' + view} variant="outlined" color="primary" />
          </Stack>
        </Grid>
      </Grid>

      <hr />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley of type and scrambled it to make a type specimen book. It
        has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <hr />
    </article>
  );
}
export default function Post() {
  let noticeId = 3432;

  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [reserved, setReserved] = useState(false);
  const [date, setDate] = useState('2022-09-22');
  const [view, setView] = useState(70);
  const { params } = useParams();
  const history = useSearchParams();
  return (
    <Container fixed>
      <Header />
      <Article />
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
    </Container>
  );
}
