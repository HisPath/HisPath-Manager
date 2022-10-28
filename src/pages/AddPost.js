import React, { Component, useState, useEffect } from 'react';
import Editor from '../components/notice/Editor';
import { Link, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {
  Backdrop,
  Box,
  Button,
  Stack,
  TextField,
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  Modal,
  Paper,
  Select,
  styled,
  Typography,
  ToggleButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
function TestAdd() {
  const [noticeId, setNoticeId] = useState();
  const [saved, setSaved] = useState(false);
  const [managerId, setManagerId] = useState(6);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [important, setImportant] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState(7);
  const [viewCnt, setViewCnt] = useState(0);

  function onEditorChange(value) {
    setDesc(value);
  }

  const importance = () => {
    setImportant(!important);
  };

  const viewNotice = () => {
    if (saved) window.open(`/notice/${noticeId}`, '_self');
  };

  const handleSaveClick = () => {
    saveNotice();
    viewNotice();
  };

  const saveNotice = () => {
    axios
      .post('/api/notice/add', {
        content: `${desc}`,
        expDate: `${endDate.toISOString().split('T')[0]}`,
        managerId: `${managerId}`,
        importance: `${important}`,
        pubDate: `${startDate.toISOString().split('T')[0]}`,
        title: `${title}`,
        viewCnt: `${viewCnt}`,
      })
      .then(function (response) {
        setNoticeId(response.data);
        setSaved(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    viewNotice();
  }, [saved]);

  useEffect(() => {
    calculateEndDate();
  }, [startDate]);
  useEffect(() => {
    calculateEndDate();
  }, [duration]);

  function calculateEndDate() {
    const end = new Date(startDate);
    end.setDate(end.getDate() + duration);
    setEndDate(end);
  }

  const BasicDatePicker = () => {
    const handleSelection = (event) => {
      setDuration(event.target.value);
    };
    const [value, setValue] = useState();
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Select
          labelId="select_duration2"
          id="select_duration"
          value={duration}
          onChange={handleSelection}
          label="Duration"
          style={{
            height: '100%',
          }}
        >
          <MenuItem value={duration}>직접 입력</MenuItem>
          <MenuItem value={7}>7 일</MenuItem>
          <MenuItem value={14}>14 일</MenuItem>
          <MenuItem value={30}>한 달</MenuItem>
          <MenuItem value={120}>한 학기</MenuItem>
        </Select>
        <Stack direction="row" spacing={0.5} style={{ height: '100%' }}>
          <TextField
            variant="standard"
            id="durationInput"
            label="게시 기간"
            value={value}
            onChange={(event) => {
              setValue(+event.target.value);
            }}
          />
          <Button variant="contained" onClick={() => setDuration(value)}>
            <CheckIcon />
          </Button>
        </Stack>
        <DatePicker
          label="게시일"
          views={['year', 'month', 'day']}
          inputFormat={'YYYY-MM-DD'}
          value={startDate}
          mask={'____-__-__'}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="만료일"
          views={['year', 'month', 'day']}
          inputFormat={'YYYY-MM-DD'}
          mask={'____-__-__'}
          value={endDate}
          readOnly
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };

  return (
    <Section component={Paper}>
      <Header>
        <Typography paddingLeft={1} paddingRight={1} variant="h5" style={{ fontWeight: 'bold' }}>
          공지사항 &#62; 추가
        </Typography>
      </Header>
      <Article>
        <Box container width="100%" justifyContent={'center'}>
          <Box paddingLeft={1} paddingRight={1} paddingBottom={2}>
            <TextField
              required
              id="outlined-required"
              value={title}
              fullWidth
              onChange={(event) => setTitle(event.target.value)}
            />
          </Box>
          <Box
            justifyContent={'center'}
            display="flex"
            gap={6}
            container
            paddingLeft={1}
            paddingRight={1}
          >
            <ToggleButton
              value="Important"
              color="error"
              selected={important}
              onChange={importance}
              style={{
                width: '100px',
                height: '100%',
              }}
            >
              중요
              <CheckIcon />
            </ToggleButton>
            <BasicDatePicker />
          </Box>
          <Box
            container
            p={0}
            style={{
              fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif',
              justifyContent: 'center',
            }}
          >
            <div style={{ padding: '10px', width: '100%' }}>
              <div className="form-group"></div>
              <Editor value={desc} onChange={onEditorChange} />
              <Box container gap={1} display="flex" justifyContent={'right'} paddingRight={2.5}>
                <Button variant="contained" onClick={handleSaveClick}>
                  저장
                </Button>

                <Link
                  to={{ pathname: '/notice' }}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button variant="outlined" color="error">
                    뒤로가기
                  </Button>
                </Link>
              </Box>
            </div>
          </Box>
        </Box>
      </Article>
    </Section>
  );
}
export default TestAdd;
