import React, { useState, useEffect } from 'react';
import Editor2 from '../components/notice/Editor2';
import {
  Box,
  Button,
  Stack,
  TextField,
  Container,
  MenuItem,
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
import { addNotice } from '../apis/notice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: 50,
  paddingTop: 24,
});
const Article = styled(Box)({
  height: 'calc(100vh - 160px)',
});
function TestAdd() {
  const navigate = useNavigate();
  const [noticeId, setNoticeId] = useState();
  const [saved, setSaved] = useState(false);
  const [managerId, setManagerId] = useState(2);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [important, setImportant] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState(7);
  const [viewCnt, setViewCnt] = useState(0);
  const [save, setSave] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (save) {
      addNotice(desc, endDate, managerId, important, startDate, title, viewCnt).then((data) => {
        setNoticeId(data);
        setSaved(true);
      });
      enqueueSnackbar('추가되었습니다.', { variant: 'success' });
    }
  }, [save]);

  const importance = () => {
    setImportant(!important);
  };

  const viewNotice = () => {
    if (saved) navigate(`/notice/${noticeId}`);
  };

  useEffect(() => {
    viewNotice();
  }, [noticeId]);

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
    <Container component={Paper}>
      <Header>
        <Typography variant="h5" fontWeight={600} px={1}>
          공지사항 &#62; 추가
        </Typography>
      </Header>
      <Article>
        <Box container width="100%" justifycontent={'center'}>
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
              <Editor2 value={desc} editorHandler={setDesc} setsave={setSave} />
            </div>
          </Box>
        </Box>
      </Article>
    </Container>
  );
}
export default TestAdd;
