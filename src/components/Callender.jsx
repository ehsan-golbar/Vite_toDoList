import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Callender() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker></DatePicker>
    </LocalizationProvider>
  );
}

export default Callender;