import * as React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function Callender({date,setDate }) {
  // const [date, setData ] = useState(dayjs("2022-04-17"))
  // useEffect(()=>{
  //   console.log(date.format("DD MMM YYYY"))
  // })
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={date} onChange={(e) => setDate(e)} />
    </LocalizationProvider>
  );
}
