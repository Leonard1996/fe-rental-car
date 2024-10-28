import { styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Radio from '@mui/material/Radio';

const StyledTitle = styled(Typography)({
  fontSize: '.875rem',
  fontWeight: 700,
  lineHeight: '1rem',
  textAlign: 'left',
  color: '#313131',
  textTransform: 'capitalize'
});

const StyledSubTitle = styled(Typography)({
  fontSize: '.75rem',
  fontWeight: 400,
  lineHeight: '0.8rem',
  textAlign: 'left',
  color: '#959595',
  textTransform: 'capitalize'
});

const RadioButton = ({ onChange, ...props }) => {
  return (
    <Radio
      {...props}
      onChange={onChange}
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 20
        }
      }}
    />
  );
};

export default function ShuttleFilter({ handleFilterChange, selectedFilters, id = 'isShuttle' }) {
  return (
    <Grid container sx={{ padding: '1.625rem 1rem' }}>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Airport Shuttle</StyledTitle>
            <StyledSubTitle>Deliver car to airport</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value={true}
              onChange={(e) =>
                handleFilterChange(
                  { ...e, target: { ...e.target, value: e.target.value === 'true' ? true : false } },
                  id
                )
              }
              checked={selectedFilters[id]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>At Office And Shuttle</StyledTitle>
            <StyledSubTitle>Client picks up car at office or Airport</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value={false}
              onChange={(e) =>
                handleFilterChange(
                  { ...e, target: { ...e.target, value: e.target.value === 'true' ? true : false } },
                  id
                )
              }
              checked={!selectedFilters[id]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
