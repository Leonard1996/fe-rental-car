import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LargeButton from '../../components/LargeButton';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../../router/AppRouter';

export default function ReservationAccepted() {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ minHeight: 'calc(100vh - 8.5625rem)', padding: '1.5rem', paddingBottom: '2rem' }}>
      <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h5">
          Your Reservation is now added to your calendar!
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <LargeButton fullWidth onClick={() => navigate(PathName.HOME)}>
          Back to home
        </LargeButton>
      </Grid>
    </Grid>
  );
}
