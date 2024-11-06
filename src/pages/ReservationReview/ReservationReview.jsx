import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { getDifferenceInDays, getReadableLocalTime } from '../../common/helpers';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LargeButton from '../../components/LargeButton';
import { colors } from '../../themes/base-theme';
import { OwnerSerivce } from '../../services/owner.service';
import { reservationStatus } from '../../common/constants';
import { useAuth } from '../../context/AuthContext';
import { PathName } from '../../router/AppRouter';
import ConfirmationModal from '../../components/ConfirmationModal';
import { TextareaAutosize } from '@mui/material';
import { useRef, useState } from 'react';

export default function ReservationReview() {
  const { reservationId } = useParams();
  const {
    state: { user }
  } = useAuth();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState();
  const notesRef = useRef(null);

  const {
    type,
    engine,
    model,
    make,
    fromDate: from,
    toDate: to,
    driverFirstName,
    driverLastName,
    driverLicenseNumber,
    weeklyPrice,
    monthlyPrice,
    price,
    year,
    notes,
    isShuttle,
    location,
    id
  } = JSON.parse(localStorage.getItem('reservations'))[reservationId];

  const days = getDifferenceInDays(+from, +to);

  let pricePerDay = price;

  if (days >= 28) pricePerDay = +monthlyPrice;
  else if (days >= 14) pricePerDay = +weeklyPrice;

  const updateReservation = async (data, companyId, reservationId) => {
    const [res, err] = await OwnerSerivce.updateReservation(data, companyId, reservationId);
    if (err) {
      alert(err.message);
      return;
    }
    navigate(PathName.OWNER_PANEL_RESERVATION_ACCEPTED);
  };

  const handleAccept = async () => {
    updateReservation({ status: reservationStatus.APPROVED, selectedCarId: id }, user.companies[0].id, reservationId);
  };

  const handleReject = () => {
    updateReservation(
      { status: reservationStatus.REJECTED, selectedCarId: id, ownerNotes: notesRef.current.value },
      user.companies[0].id,
      reservationId
    );
  };

  const handleConfirm = () => {
    handleReject();
  };

  return (
    <>
      <Grid container sx={{ padding: '1.75rem' }}>
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
        <Grid size={{ xs: 12 }} sx={{ marginTop: '3rem' }}>
          <LargeButton fullWidth onClick={handleAccept}>
            Accept Reservation
          </LargeButton>
          <LargeButton
            onClick={() => setIsOpen(true)}
            backgroundColor="none"
            border="none"
            color={colors.darkRed}
            fullWidth
          >
            Decline Reservation
          </LargeButton>
        </Grid>
      </Grid>
      <ConfirmationModal
        confirmText="Reject"
        text="Are you sure you want to reject this reservation?"
        isOpen={isOpen}
        handleCancel={() => setIsOpen(false)}
        handleConfirm={handleConfirm}
      >
        <TextareaAutosize
          style={{ width: '100%', marginBottom: '2rem', background: '#F3F3F3', border: 'none' }}
          minRows={5}
          placeholder="Write a rejection reason for the user to read"
          ref={notesRef}
        />
      </ConfirmationModal>
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
