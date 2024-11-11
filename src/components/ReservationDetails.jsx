import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getReadableLocalTime } from '../common/helpers';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export default function ReservationDetails({
  year,
  notes,
  isShuttle,
  location,
  driverFirstName,
  driverLastName,
  driverLicenseNumber,
  type,
  engine,
  model,
  make,
  days,
  from,
  to,
  pricePerDay
}) {
  return (
    <>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonRoundedIcon />
          </Grid>
          <Grid size={{ xs: 10 }}>
            <StyledTitle>{type}</StyledTitle>
            <StyledSubtitle>
              {make} {model} {year} {engine}
            </StyledSubtitle>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonRoundedIcon />
          </Grid>
          <Grid size={{ xs: 10 }}>
            <StyledTitle>
              {driverFirstName} {driverLastName}
            </StyledTitle>
            <StyledSubtitle>{driverLicenseNumber}</StyledSubtitle>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            <PersonRoundedIcon />
          </Grid>
          <Grid size={{ xs: 10 }}>
            <StyledTitle>Rental starts</StyledTitle>
            <StyledSubtitle sx={{ marginBottom: '0.5rem' }}>{getReadableLocalTime(+from)}</StyledSubtitle>
            <StyledSubtitle>Pick up at: {isShuttle ? 'Airport' : location.name}</StyledSubtitle>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2rem' }}>
        <Grid container>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonRoundedIcon />
          </Grid>
          <Grid size={{ xs: 10 }}>
            <StyledTitle>Rental ends</StyledTitle>
            <StyledSubtitle sx={{ marginBottom: '0.5rem' }}>{getReadableLocalTime(+to)}</StyledSubtitle>
            <StyledSubtitle>Drop off at: {location.name}</StyledSubtitle>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '2.625rem' }}>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <StyledTitle>User notes</StyledTitle>
          </Grid>
          <Grid
            size={{ xs: 12 }}
            sx={{ marginBottom: '1rem', overflow: 'auto', height: '1.65rem', scrollbarWidth: 'none' }}
          >
            <StyledSubtitle>{notes}</StyledSubtitle>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: '0.5rem' }}>
          <StyledSubtitle>Fare brakedown</StyledSubtitle>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <StyledTitle>Price per day</StyledTitle>
          <StyledTitle>{pricePerDay}€</StyledTitle>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <StyledTitle>Total ({days} days)</StyledTitle>
          <StyledTitle>{(days * pricePerDay).toFixed(2)}€</StyledTitle>
        </Grid>
      </Grid>
    </>
  );
}

const StyledTitle = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 700,
  lineHeight: '1rem',
  textAlign: 'left',
  textTransform: 'capitalize',
  marginBottom: '0.5rem',
  color: '#313131'
});

const StyledSubtitle = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.75rem',
  fontWeight: 400,
  lineHeight: '0.875rem',
  textAlign: 'left',
  color: '#959595',
  textTransform: 'capitalize'
});
