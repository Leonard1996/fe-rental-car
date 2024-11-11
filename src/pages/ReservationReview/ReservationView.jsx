import { useEffect, useState } from 'react';
import { OwnerSerivce } from '../../services/owner.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDifferenceInDays } from '../../common/helpers';
import Grid from '@mui/material/Grid2';
import ReservationDetails from '../../components/ReservationDetails';
import { PathName } from '../../router/AppRouter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { reservationStatus } from '../../common/constants';

export default function ReservationReview() {
  const {
    state: { user }
  } = useAuth();
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  useEffect(() => {
    async function callService() {
      const [res, err] = await OwnerSerivce.getReservationsDetailsById(reservationId, user.companies[0].id);
      if (err) {
        alert(err.message);
        return;
      }

      const days = getDifferenceInDays(+res.fromDate, +res.toDate);

      let pricePerDay = res.price;

      if (days >= 28) pricePerDay = +monthlyPrice;
      else if (days >= 14) pricePerDay = +weeklyPrice;
      res.days = days;
      res.pricePerDay = pricePerDay;

      setReservation(res);
    }

    callService();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`${PathName.OWNER_PANEL}/?status=${reservationStatus.APPROVED}`)}
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          padding: '1rem'
        }}
      >
        <ArrowBackIcon />
      </div>
      <Grid container sx={{ padding: '1.75rem' }}>
        {reservation && (
          <ReservationDetails
            type={reservation.type}
            engine={reservation.engine}
            model={reservation.model}
            make={reservation.make}
            fromDate={reservation.fromDate}
            toDate={reservation.toDate}
            driverFirstName={reservation.driverFirstName}
            driverLastName={reservation.driverLastName}
            driverLicenseNumber={reservation.driverLicenseNumber}
            year={reservation.year}
            notes={reservation.notes}
            isShuttle={reservation.isShuttle}
            location={reservation.location}
            days={reservation.days}
            pricePerDay={reservation.pricePerDay}
          />
        )}
      </Grid>
    </>
  );
}
