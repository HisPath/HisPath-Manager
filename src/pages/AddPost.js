import React, { Component, useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
//import ajax from '../../utils/ajax';
import Editor from '../components/notice/Editor';
//import UploadFiles from '../UploadFiles';
//import LFSelect from '../common/LFSelect';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid'; // Grid version 1
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';

//import DatePicker from '../components/common/DatePicker';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddPost() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('공지사항');
  const uploadReferenece = React.createRef();
  const [temp, setTemp] = useState(true);
  const [important, setImportant] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState(7);

  // Editor Changes
  function onEditorChange(value) {
    setDesc(value);
  }

  // Importance Toggle
  const importance = () => {
    setImportant(!important);
  };

  // Date Pick
  useEffect(() => {
    calculateEndDate();
  }, [duration]);
  useEffect(() => {
    calculateEndDate();
  }, [startDate]);

  function calculateEndDate() {
    const end = new Date(startDate);
    end.setDate(end.getDate() + duration);
    setEndDate(end);
  }

  function BasicDatePicker() {
    const handleSelection = (event) => {
      setDuration(event.target.value);
    };
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Select
          labelId="select_duration2"
          id="select_duration"
          value={duration}
          onChange={handleSelection}
          label="Duration"
        >
          <MenuItem value={7}>A Week</MenuItem>
          <MenuItem value={14}>Two Weeks</MenuItem>
          <MenuItem value={30}>A Month</MenuItem>
          <MenuItem value={120}>A Semester</MenuItem>
        </Select>
        <DatePicker
          label="Publish Date"
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
          label="Expire Date"
          views={['year', 'month', 'day']}
          inputFormat={'YYYY-MM-DD'}
          mask={'____-__-__'}
          value={endDate}
          readOnly
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }

  return (
    <Box>
      <Box width="80%" display="flex" justifyContent="center" p={2}>
        <TextField
          required
          id="outlined-required"
          label="제목"
          fullWidth
          onChange={(event) => setTitle(event.target.value)}
        />
      </Box>
      <Box width="80%" display="flex" gap={4} container p={2}>
        <Stack direction="row" spacing={2}>
          <ToggleButton
            value="Visible"
            variant="outlined"
            selected={important}
            onChange={importance}
          >
            Important
            <CheckIcon />
          </ToggleButton>
          <BasicDatePicker />
        </Stack>
      </Box>

      <div
        className="container"
        style={{
          fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div style={{ padding: '12px', width: '70%' }}>
          <div className="form-group"></div>
          <Editor value={desc} onChange={onEditorChange} />
          <Box
            style={{
              gap: '10px',
            }}
          >
            <Link id="notice_Detail_Link" to={{ pathname: `/notice/${id}` }}>
              <Button
                variant="contained"
                style={{
                  float: 'right',
                }}
              >
                저장
              </Button>
            </Link>
            <Link to={{ pathname: '/notice' }}>
              <Button
                variant="outlined"
                style={{
                  float: 'right',
                }}
                color="error"
              >
                뒤로가기
              </Button>
            </Link>
          </Box>
        </div>
      </div>
    </Box>
  );
}
