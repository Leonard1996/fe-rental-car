import Grid from '@mui/material/Grid2';
import FilterContainer from './FilterContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { colors } from '../../themes/base-theme';
import { useLoading } from '../../context/LoadingContext';
import LargeButton from '../../components/LargeButton';
import { Link, useLocation } from 'react-router-dom';
import { reservationStatus } from '../../common/constants';
import useCache from '../../hooks/useCacheService';
import { OwnerSerivce } from '../../services/owner.service';
import CarReservationCard from '../../components/CarReservationCard';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import SortBy from '../../components/SortBy';
import FilterDrawer from '../../components/FilterDrawer';
import ShuttleFilter from '../../components/ShuttleFilter';
import DateFilter from '../../components/DateFilter';
import AllFilters from '../../components/AllFilters';

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
    },
    checkIsDirty: () => false
  },
  {
    id: 'allFilters',
    label: 'All Filters',
    showIcon: false,
    checkIsDirty: (f) => f['sortBy'] !== 'latest' || f['from'] || f['to'] || f['isShuttle'],
    component: (props) => <AllFilters {...props} />
  },
  {
    id: 'sortBy',
    label: 'Sort By',
    showIcon: true,
    component: (props) => <SortBy {...props} />,
    checkIsDirty: (f) => f['sortBy'] !== 'latest'
  },
  {
    id: 'dates',
    label: 'Dates',
    showIcon: true,
    component: (props) => <DateFilter {...props} />,
    checkIsDirty: (f) => f['from'] || f['to']
  },
  {
    id: 'isShuttle',
    label: 'Airport',
    showIcon: true,
    component: (props) => <ShuttleFilter {...props} />,
    checkIsDirty: (f) => f['isShuttle']
  }
];

export const initSelectedFilters = {
  sortBy: 'latest',
  isShuttle: false,
  from: null,
  to: null
};

export default function OwnerPanel() {
  const [reservations, setReservations] = useState([]);
  const [filterVisibility, setFiltersVisibility] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(initSelectedFilters);

  const { loading, setLoading } = useLoading();

  const { checkCache, registerService, getContent } = useCache();
  const {
    state: { user }
  } = useAuth();

  const location = useLocation();

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
    const cacheKey = {
      serviceKey: OwnerSerivce.getReservationsByCompany.name,
      payload: { ...filters, ...selectedFilters }
    };
    if (checkCache(cacheKey)) {
      setReservations(getContent(cacheKey));
      return;
    }

    const [res, err] = await OwnerSerivce.getReservationsByCompany(
      { ...filters, ...selectedFilters },
      user.companies[0].id
    );
    if (!err) {
      setReservations(res);
      cacheKey.result = res;
      registerService(cacheKey);
      return;
    }
    alert(err.message);
    setSelectedFilters(initSelectedFilters);
  };

  const handleFilterChange = (e, id) => {
    setSelectedFilters((prev) => {
      return {
        ...prev,
        [id]: e.target.value
      };
    });
  };

  const onFilterClick = (id) => {
    if (id === 'bin') {
      setFiltersVisibility(null);
      setSelectedFilters(initSelectedFilters);
      return;
    }
    setFiltersVisibility(id);
  };

  useEffect(() => {
    callReservationService(
      {
        statuses: [status],
        ...selectedFilters
      },
      user.companies[0].id
    );
  }, [JSON.stringify(selectedFilters)]);

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }} sx={{ padding: '.875rem 0rem 0rem' }}>
          <FilterContainer filters={filters} callback={onFilterClick} selectedFilters={selectedFilters} />
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
            <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ padding: '1.25rem' }} key={reservation.reservationId}>
              <CarReservationCard
                id={reservation.requestedCarId}
                make={reservation.carMake}
                model={reservation.carModel}
                type={reservation.carType}
                from={+reservation.reservationFrom}
                to={+reservation.reservationTo}
                price={reservation.reservationPrice}
                notes={reservation.reservationNotes}
                status={reservation.reservationStatus}
                isShuttle={reservation.reservationIsShuttle}
                location={reservation.locationName}
                year={reservation.carYear}
                engine={reservation.carEngine}
                licensePlate={reservation.carLicensePlate}
                reservationId={reservation.reservationId}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <FilterDrawer
        label={filters.find((filter) => filter.id === filterVisibility)?.label}
        anchor="bottom"
        isOpen={filterVisibility}
        handleClose={() => setFiltersVisibility(null)}
      >
        {filters.map((filter) => {
          if (filter.id === 'bin' || filter.id !== filterVisibility) return null;
          return (
            <React.Fragment key={filter.id}>
              {filter.component({
                id: filter.id,
                isOpen: filterVisibility === filter.id,
                handleFilterChange: handleFilterChange,
                selectedFilters: selectedFilters
              })}
            </React.Fragment>
          );
        })}
      </FilterDrawer>
    </>
  );
}
