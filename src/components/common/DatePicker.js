import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function BasicDatePicker() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState();
  const [duration, setDuration] = React.useState(7);
  const [open, setOpen] = React.useState(false);
  const [durationTemp, setDurationTemp] = React.useState();

  function calculateEndDate(newDate) {
    const end = new Date(newDate);
    end.setDate(end.getDate() + duration);
    setEndDate(end);
  }
  function getCustomDuration() {}
  const settingDuration = (event) => {
    setDuration(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Select
        labelId="select_duration2"
        id="select_duration"
        value={duration}
        onChange={settingDuration}
        label="Duration"
      >
        <MenuItem value={7}>A Week</MenuItem>
        <MenuItem value={14}>Two Weeks</MenuItem>
        <MenuItem value={30}>A Month</MenuItem>
        <MenuItem value={120}>A Semester</MenuItem>
      </Select>
      {duration}

      <DatePicker
        label="Publish Date"
        views={['year', 'month', 'day']}
        inputFormat={'YYYY-MM-DD'}
        value={startDate}
        mask={'____-__-__'}
        onChange={(newValue) => {
          setStartDate(newValue);
          calculateEndDate(newValue);
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
