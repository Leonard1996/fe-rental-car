import { styled, Typography } from '@mui/material';
import FilterDrawer from './FilterDrawer';
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

const RadioButton = () => {
  return (
    <Radio
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 20
        }
      }}
    />
  );
};

export default function SortByDrawer({ label, anchor, isOpen, handleClose }) {
  return (
    <FilterDrawer label={label} anchor={anchor} isOpen={isOpen} handleClose={handleClose}>
      <Grid container sx={{ padding: '1.625rem 1rem' }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
          <Grid container>
            <Grid size={{ xs: 11 }}>
              <StyledTitle sx={{ marginBottom: '.625rem' }}>New requests</StyledTitle>
              <StyledSubTitle>Based on distance, price, popularity</StyledSubTitle>
            </Grid>
            <Grid size={{ xs: 1 }}>
              <RadioButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
          <Grid container>
            <Grid size={{ xs: 11 }}>
              <StyledTitle sx={{ marginBottom: '.625rem' }}>Nearest reservations</StyledTitle>
              <StyledSubTitle>Lowest first</StyledSubTitle>
            </Grid>
            <Grid size={{ xs: 1 }}>
              <RadioButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid container>
            <Grid size={{ xs: 11 }}>
              <StyledTitle sx={{ marginBottom: '.625rem' }}>By time</StyledTitle>
              <StyledSubTitle>Nearest first</StyledSubTitle>
            </Grid>
            <Grid size={{ xs: 1 }}>
              <RadioButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FilterDrawer>
  );
}
