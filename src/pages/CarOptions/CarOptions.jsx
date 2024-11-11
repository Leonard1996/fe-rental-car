import Grid from '@mui/material/Grid2';
import Notification from '../../components/Notification';
import { colors } from '../../themes/base-theme';
import { useEffect, useState } from 'react';
import { OwnerSerivce } from '../../services/owner.service';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, Typography } from '@mui/material';
import CarOptionCard from '../../components/CarOptionCard';
import { getDifferenceInDays } from '../../common/helpers';
import LargeButton from '../../components/LargeButton';
import { PathName } from '../../router/AppRouter';

const ReservationPrice = styled(Typography)({
  fontWeight: 600,
  color: '#313131',
  textAlign: 'right',
  fontSize: '.875rem'
});

const PricePerDay = styled(Typography)({
  fontWeight: 600,
  color: '#9D9D9D',
  textAlign: 'right',
  fontSize: '.75rem'
});

export default function CarOptions() {
  const {
    state: { user }
  } = useAuth();
  const { reservationId } = useParams();

  const [options, setOptions] = useState([]);
  const [original, setOriginal] = useState({});
  const [isSelected, setIsSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const callReservationOptionsService = async () => {
      const [res, err] = await OwnerSerivce.getCarReservationOptions(user.companies[0].id, reservationId);
      if (err) {
        alert(err.message);
        return;
      }
      setOriginal(res.find((d) => d.isOriginal));
      setOptions(
        res.map((car) => {
          const { fromDate: from, toDate: to } = car;
          const days = getDifferenceInDays(from, to);
          if (days >= 28) car.price = car.monthlyPrice;
          else if (days >= 14) car.price = car.weeklyPrice;

          return car;
        })
      );
    };

    callReservationOptionsService();
  }, []);

  const handleSelect = (id) => {
    if (id === original.id) return;
    setIsSelected((prevSelected) => (id === prevSelected ? null : id));
  };

  const handleContinue = () => {
    const reservations = JSON.parse(localStorage.getItem('reservations')) ?? {};
    reservations[reservationId] = options.find((option) => option.id === isSelected);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    navigate(`/owner-panel/reservations/${reservationId}/review`);
  };

  return (
    <>
      <Grid container sx={{ padding: '1.25rem', maxHeight: '80%', overflowY: 'auto' }}>
        <Grid size={{ xs: 12 }} sx={{ paddingBottom: '1rem' }}>
          <Notification backgroundColor={colors.lightGreen}>
            <Grid container>
              <Grid size={{ xs: 8 }}>
                <Grid container>
                  <Grid size={{ xs: 12 }} sx={{ fontWeight: '600', fontSize: '0.75rem' }}>
                    Select a car for this reservation
                  </Grid>
                  <Grid size={{ xs: 12 }} sx={{ fontWeight: '600', fontSize: '0.625rem', color: '#818683' }}>
                    Client has requested {original.make}, {original.type} or similar
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 4 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <ReservationPrice>€{original.reservationPrice}</ReservationPrice>
                <PricePerDay>/day</PricePerDay>
              </Grid>
            </Grid>
          </Notification>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            {options.map(({ location, type, brand, model, make, engine, year, price, id, seats, isBooked }) => {
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={id}>
                  <CarOptionCard
                    handleSelect={() => handleSelect(id)}
                    id={id}
                    location={location}
                    type={type}
                    brand={brand}
                    model={model}
                    make={make}
                    engine={engine}
                    year={year}
                    price={price}
                    isSelected={isSelected === id}
                    seats={seats}
                    isBooked={isBooked}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <div style={{ position: 'sticky', bottom: '2rem', padding: '1.25rem' }}>
        <LargeButton fullWidth onClick={handleContinue} disabled={!isSelected}>
          Select and continue
        </LargeButton>
      </div>
    </>
  );
}
