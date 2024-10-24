import Grid from '@mui/material/Grid2';
import FilterContainer from './FilterContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { colors } from '../../themes/base-theme';
import { useLoading } from '../../context/LoadingContext';
import LargeButton from '../../components/LargeButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { reservationStatus } from '../../common/constants';
import useCache from '../../hooks/useCacheService';
import { OwnerSerivce } from '../../services/owner.service';
import CarReservationCard from '../../components/CarReservationCard';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PathName } from '../../router/AppRouter';
import SortByDrawer from '../../components/SortByDrawer';

const filters = [
  {
    id: 'bin',
    label: <DeleteRoundedIcon sx={{ width: '.875rem', height: '.875rem' }} />,
    showIcon: false,
    customStyles: {
      wrapper: { padding: '.5rem' },
      container: {},
      label: {},
      icon: {}
    }
  },
  { id: 'allFilters', label: 'All Filters', showIcon: false },
  { id: 'dates', label: 'Dates', showIcon: true },
  { id: 'airport', label: 'Airport', showIcon: true },
  { id: 'sortBy', label: 'Sort By', showIcon: true }
];

export default function OwnerPanel() {
  const [reservations, setReservations] = useState([]);
  const [filterVisibility, setFiltersVisibility] = useState(null);

  const { loading, setLoading } = useLoading();

  const { checkCache, registerService, getContent } = useCache();
  const {
    state: { user }
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  const getNavButtonColor = (buttonStatus) => {
    const isActiveReservationsMode = status === reservationStatus.APPROVED;

    if (buttonStatus === reservationStatus.APPROVED) {
      return {
        backgroundColor: isActiveReservationsMode ? colors.lightGreen : colors.white,
        color: colors.mainBlack
      };
    } else {
      return {
        backgroundColor: !isActiveReservationsMode ? colors.lightGreen : colors.white,
        color: colors.mainBlack
      };
    }
  };

  const handleNavButtonClick = async (filters) => {
    if (filters.statuses.includes(status)) return;
    callReservationService(filters, user.companies[0].id);
  };

  const callReservationService = async (filters) => {
    const cacheKey = { serviceKey: OwnerSerivce.getReservationsByCompany.name, payload: filters };
    if (checkCache(cacheKey)) {
      setReservations(getContent(cacheKey));
      return;
    }

    const [res, err] = await OwnerSerivce.getReservationsByCompany(filters, user.companies[0].id);
    if (!err) {
      setReservations(res);
      cacheKey.result = res;
      registerService(cacheKey);
      return;
    }
    alert(err.message);
  };

  useEffect(() => {
    if (![reservationStatus.APPROVED, reservationStatus.PENDING].includes(status)) {
      navigate(`${PathName.OWNER_PANEL}?status=${reservationStatus.APPROVED}`);
    }
    callReservationService(
      {
        statuses: ['approved']
      },
      user.companies[0].id
    );
  }, []);

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }} sx={{ padding: '.875rem 0rem 0rem' }}>
          <FilterContainer filters={filters} callback={setFiltersVisibility} />
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ padding: '1.25rem' }}>
          <Grid container>
            <Grid size={{ xs: 6 }}>
              <Link to={`${location.pathname}?status=${reservationStatus.APPROVED}`}>
                <LargeButton
                  onClick={() => handleNavButtonClick({ statuses: [reservationStatus.APPROVED] })}
                  borderColor={colors.lightGreen}
                  sx={{
                    ...getNavButtonColor(reservationStatus.APPROVED)
                  }}
                >
                  Active Reservations
                </LargeButton>
              </Link>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ textAlign: 'right' }}>
              <Link to={`${location.pathname}?status=${reservationStatus.PENDING}`}>
                <LargeButton
                  onClick={() => handleNavButtonClick({ statuses: [reservationStatus.PENDING] })}
                  borderColor={colors.lightGreen}
                  sx={{
                    ...getNavButtonColor(reservationStatus.PENDING)
                  }}
                >
                  Pending Reservations
                </LargeButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {reservations.map((reservation) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ padding: '1.25rem' }} key={reservation.id}>
              <CarReservationCard
                pickUpLocation="Zyra Tirona"
                make={reservation.car.make}
                model={reservation.car.model}
                type={reservation.car.type}
                from={+reservation.from}
                to={+reservation.to}
                price={100}
                notes={reservation.notes}
                status={reservation.status}
                isShuttle={reservation.isShuttle}
                location={reservation.car.location}
                year={reservation.car.year}
                engine={reservation.car.engine}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <SortByDrawer
        label="Sort By"
        anchor="bottom"
        isOpen={filterVisibility === 'sortBy'}
        handleClose={() => setFiltersVisibility(null)}
      />
    </>
  );
}
