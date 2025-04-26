import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import { getDifferenceInDays } from '../../common/helpers';
import ReservationDetails from '../../components/ReservationDetails';
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
    const [_res, err] = await OwnerSerivce.updateReservation(data, companyId, reservationId);
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
        <ReservationDetails
          type={type}
          engine={engine}
          model={model}
          make={make}
          fromDate={+from}
          toDate={+to}
          driverFirstName={driverFirstName}
          driverLastName={driverLastName}
          driverLicenseNumber={driverLicenseNumber}
          year={year}
          notes={notes}
          isShuttle={isShuttle}
          location={location}
          days={days}
          pricePerDay={pricePerDay}
        />
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
