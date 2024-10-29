import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid2';
import { styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const StyledTitle = styled(Typography)({
  fontSize: '.875rem',
  fontWeight: 700,
  lineHeight: '1rem',
  textAlign: 'left',
  color: '#313131',
  textTransform: 'capitalize',
  marginBottom: '.625rem'
});

export default function DateFilter({ handleFilterChange, selectedFilters }) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    if (selectedFilters.from) setFrom(dayjs(selectedFilters.from));
    if (selectedFilters.to) setTo(dayjs(selectedFilters.to));
  }, []);

  return (
    <Grid container sx={{ padding: '1.625rem 1rem' }}>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '1rem' }}>
        <StyledTitle>Select start of reservation</StyledTitle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Start Date"
              value={from ?? dayjs(new Date())}
              onAccept={() =>
                handleFilterChange(
                  {
                    target: {
                      value: dayjs(from).valueOf()
                    }
                  },
                  'from'
                )
              }
              onChange={setFrom}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <StyledTitle>Select end of reservation</StyledTitle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              format="DD/MM/YYYY"
              label="End Date"
              value={to ?? dayjs(new Date())}
              onAccept={() =>
                handleFilterChange(
                  {
                    target: {
                      value: dayjs(to).valueOf()
                    }
                  },
                  'to'
                )
              }
              onChange={setTo}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
