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

export default function CarSortByFilter({ handleFilterChange, selectedFilters, id = 'sortBy' }) {
  return (
    <Grid container sx={{ padding: '1.625rem 1rem' }}>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Date</StyledTitle>
            <StyledSubTitle>Latest inserted</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="date"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'date'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Relevance</StyledTitle>
            <StyledSubTitle>Most reserved</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="relevance"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'relevance'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Name</StyledTitle>
            <StyledSubTitle>Alphabetical order</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="name"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'name'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
