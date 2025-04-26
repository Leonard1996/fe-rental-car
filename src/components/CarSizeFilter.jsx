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

export default function CarSizeFilter({ handleFilterChange, selectedFilters, id = 'type' }) {
  return (
    <Grid container sx={{ padding: '1.625rem 1rem' }}>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Small</StyledTitle>
            <StyledSubTitle>Compact, Economy</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="small"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'small'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Medium</StyledTitle>
            <StyledSubTitle>Sedan, Premium Sedan</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="medium"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'medium'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container>
          <Grid size={{ xs: 11 }}>
            <StyledTitle sx={{ marginBottom: '.625rem' }}>Large</StyledTitle>
            <StyledSubTitle>SUV, Minivan</StyledSubTitle>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <RadioButton
              value="large"
              onChange={(e) => handleFilterChange(e, id)}
              checked={selectedFilters[id] === 'large'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
