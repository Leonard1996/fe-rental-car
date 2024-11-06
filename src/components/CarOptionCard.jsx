import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import carImagePlaceholder from '../assets/images/car-placeholder.jpg';
import { StyledSubTitle, StyledTitle } from './CarReservationCard';
import { colors } from '../themes/base-theme';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export default function CarOptionCard({
  location,
  type,
  model,
  make,
  engine,
  year,
  price,
  handleSelect,
  isSelected,
  seats,
  isBooked
}) {
  return (
    <Card
      onClick={handleSelect}
      sx={{
        minWidth: 352,
        maxWidth: '100%',
        borderRadius: '12px',
        border: '0.125rem solid #F9F9F9',
        backgroundColor: isBooked ? colors.lightGrey : ''
      }}
      elevation={0}
    >
      <CardContent sx={{ padding: '1rem' }}>
        <Grid container>
          <Grid size={{ xs: 11 }} sx={{ marginBottom: '.625rem' }}>
            {location?.name}
          </Grid>
          <Grid size={{ xs: 1 }} sx={{ textAlign: 'right', marginBottom: '.625rem' }}>
            {!isBooked && <CheckBox isChecked={isSelected} />}
          </Grid>
          <Grid
            size={{ xs: 12 }}
            textAlign={'center'}
            sx={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '.75rem', margin: '1rem 0' }}
          >
            <img
              src={carImagePlaceholder}
              style={{ width: 'auto', height: '121px' }}
              loading="lazy"
              alt={make + ' ' + model}
            />
          </Grid>
          <Grid size={{ xs: 7 }} sx={{ marginBottom: '1rem' }}>
            <Grid container>
              <Grid size={{ xs: 9 }} sx={{ marginBottom: '.625rem' }}>
                <StyledTitle>
                  {type}{' '}
                  <PersonRoundedIcon sx={{ height: '.93rem', marginRight: '-.4rem', marginBottom: '-.125rem' }} />{' '}
                  {seats}
                </StyledTitle>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <StyledSubTitle>{make + ' ' + model + ' ' + year + ' ' + engine}</StyledSubTitle>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 5 }} sx={{ marginBottom: '1rem' }}>
            {isBooked ? (
              <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', textAlign: 'right' }}>BOOKED</Typography>
            ) : (
              <StyledSubTitle sx={{ fontWeight: 600, color: '#9D9D9D', textAlign: 'right' }}>
                €{price}/day
              </StyledSubTitle>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function CheckBox({ isChecked }) {
  return (
    <div
      style={{
        width: '1.6875rem',
        height: '1.6875rem',
        borderRadius: '0.375rem',
        backgroundColor: colors.almostWhiteGrey,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
      }}
    >
      <div
        style={{
          width: '1.25rem',
          height: '1.25rem',
          borderRadius: 'rem',
          opacity: isChecked ? 1 : 0
        }}
      >
        <DoneAllIcon />
      </div>
    </div>
  );
}
