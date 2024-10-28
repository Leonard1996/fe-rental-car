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

export default function SortBy({ handleFilterChange, selectedFilters, id = 'sortBy' }) {
  console.log(handleFilterChange, selectedFilters, id);
  return (
    <Grid container sx={{ padding: '1.625rem 1rem' }}>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>New requests</StyledTitle>
            <StyledSubTitle>Latest reverved</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="latest"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'latest'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Nearest reservations</StyledTitle>
            <StyledSubTitle>Soonest first</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="soonest"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'soonest'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>By time</StyledTitle>
            <StyledSubTitle>Longest lasting</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="longest"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'longest'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
