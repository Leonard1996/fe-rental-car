import { Card, CardContent, Grid2 } from '@mui/material';
import { colors } from '../themes/base-theme';
import { StyledSubTitle, StyledTitle } from './CarReservationCard';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const gridStyles = {
  position: 'absolute',
  top: '193px',
  left: 0,
  width: '100vw',
  minHeight: 'calc(100vh - 137px)',
  zIndex: 9999,
  backgroundColor: colors.white,
  padding: '1.25rem',
  overflowY: 'auto'
};

export default function GlobalSearchDrawer({ reservations, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          padding: '1rem',
          background: colors.white
        }}
      >
        <ArrowBackIcon />
      </div>
      <Grid2 container sx={gridStyles}>
        <Grid2 size={{ xs: 12 }}>
          {reservations.map((reservation) => (
            <MiniReservationCard {...reservation} key={reservation.id} onClose={onClose} />
          ))}
        </Grid2>
      </Grid2>
    </>
  );
}

function MiniReservationCard({
  type,
  seats,
  price,
  location,
  make,
  model,
  year,
  engine,
  licensePlate,
  id,
  notes,
  clientId,
  ownerNotes,
  onClose
}) {
  const {
    state: { user }
  } = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/owner-panel/reservations/${id}/view`);
    onClose();
  };

  return (
    <Card sx={{ minWidth: '100%', marginBottom: '1rem' }} onClick={handleClick}>
      <CardContent>
        <Grid2 container>
          <Grid2 size={{ xs: 12 }} sx={{ marginBottom: '.5rem' }}>
            <Grid2 container>
              <Grid2 size={{ xs: 7 }}>
                <Grid2 container>
                  <Grid2 size={{ xs: 12 }} sx={{ marginBottom: '0.625rem' }}>
                    <StyledTitle>
                      {type}{' '}
                      <PersonRoundedIcon sx={{ height: '.93rem', marginRight: '-.4rem', marginBottom: '-.125rem' }} />{' '}
                      {seats}
                    </StyledTitle>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }} sx={{ marginBottom: '0.625rem' }}>
                    <StyledSubTitle>
                      {make} {model} {year} {engine}
                    </StyledSubTitle>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <StyledSubTitle>#{licensePlate}</StyledSubTitle>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 size={{ xs: 5 }} sx={{ textAlign: 'right' }}>
                <StyledTitle sx={{ display: 'inline', fontSize: '1rem' }}>{price}€</StyledTitle>
                <StyledSubTitle sx={{ display: 'inline', textTransform: 'none' }}>/day</StyledSubTitle>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12 }} sx={{ marginBottom: '0.625rem', overflow: 'auto', height: '1.65rem' }}>
            <StyledSubTitle>{(user.id === clientId ? ownerNotes : notes) ?? 'No notes to display'}</StyledSubTitle>
          </Grid2>
          <Grid2 size={{ xs: 2 }}>ID: {id}</Grid2>
          <Grid2 size={{ xs: 10 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
            <StyledSubTitle sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{location}</StyledSubTitle>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}
