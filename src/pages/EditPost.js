import React, { useState, useEffect } from 'react';
import Editor2 from '../components/notice/Editor2';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Backdrop,
  Box,
  Button,
  Stack,
  TextField,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Select,
  styled,
  Typography,
  ToggleButton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import CheckIcon from '@mui/icons-material/Check';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { editNotice, getNoticeById } from '../apis/notice';

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: 24,
  paddingTop: 24,
});
const Article = styled(Box)({
  height: 'calc(100vh - 160px)',
});

function TestPost() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const [managerId, setManagerId] = useState();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [important, setImportant] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState();
  const [viewCnt, setViewCnt] = useState();
  const [save, setSave] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleSave = async () => {
      if (save) {
        await editNotice(noticeId, desc, endDate, managerId, important, startDate, title, viewCnt);
        navigate(`/notice/${noticeId}`);
        enqueueSnackbar('수정되었습니다.', { variant: 'success' });
      }
    };
    handleSave();
  }, [save]);

  const importance = () => {
    setImportant(!important);
  };

  useEffect(() => {
    const getNotice = async () => {
      const data = getNoticeById(noticeId);
      return data;
    };
    getNotice().then((result) => {
      setTitle(result.title);
      setDesc(result.content);
      setImportant(result.importance);
      const s = new Date(result.pubDate);
      const e = new Date(result.expDate);
      var d = Math.abs(e - s);
      d = d / 1000 / 60 / 60 / 24;
      setDuration(d);
      setManagerId(result.managerId);
      setViewCnt(result.viewCnt - 1);
      console.log(d);
      setStartDate(s);
    });

    setInit(true);
  }, []);

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
          공지사항 &#62; 상세 &#62; 수정
        </Typography>
      </Header>
      <Article>
        {init ? (
          <Box container width="100%" justifyContent={'center'}>
            <Box paddingLeft={1} paddingRight={1} paddingBottom={2}>
              <TextField
                required
                id="outlined-required"
                //label="제목"
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
                value="Visible"
                variant="outlined"
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
        ) : (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Article>
    </Container>
  );
}
export default TestPost;
