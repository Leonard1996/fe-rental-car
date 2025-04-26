import { useEffect, useState } from 'react';
import { OwnerSerivce } from '../../services/owner.service';
import { useAuth } from '../../context/AuthContext';
import { Grid2 } from '@mui/material';
import MyCar from '../../components/MyCar';
import Notification from '../../components/Notification';
import { colors } from '../../themes/base-theme';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import FilterContainer from '../Home/FilterContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CarSizeFilter from '../../components/CarSizeFilter';
import FilterDrawer from '../../components/FilterDrawer';
import React from 'react';
import CarSortByFilter from '../../components/CarSortByFilter';

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
    id: 'type',
    label: 'Car Size',
    showIcon: true,
    checkIsDirty: (f) => f['type'],
    component: (props) => <CarSizeFilter {...props} />
  },
  {
    id: 'sortBy',
    label: 'Sort By',
    showIcon: true,
    checkIsDirty: (f) => f['sortBy'] !== 'date',
    component: (props) => <CarSortByFilter {...props} />
  }
];

export const initSelectedFilters = {
  sortBy: 'date',
  type: null
};

export default function MyCars() {
  const {
    state: { user }
  } = useAuth();
  const [cars, setCars] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(initSelectedFilters);
  const [filterVisibility, setFiltersVisibility] = useState(null);

  const callCarsService = async (filters = {}) => {
    const [res, err] = await OwnerSerivce.getCars(filters, user.companies[0].id);
    if (err) {
      alert(err);
      return;
    }

    setCars(res);
  };

  const onFilterClick = (id) => {
    if (id === 'bin') {
      setFiltersVisibility(null);
      setSelectedFilters(initSelectedFilters);
      return;
    }
    setFiltersVisibility(id);
  };

  const handleFilterChange = (e, id) => {
    setSelectedFilters((prev) => {
      return {
        ...prev,
        [id]: e.target.value
      };
    });
  };

  React.useEffect(() => {
    const filters = {};
    for (const key in selectedFilters) {
      if (selectedFilters[key]) {
        filters[key] = [selectedFilters[key]];
      }
    }
    callCarsService(filters);
  }, [JSON.stringify(selectedFilters)]);

  return (
    <>
      <Grid2 container sx={{ marginTop: '1.25rem' }}>
        <Grid2 size={{ xs: 12 }}>
          <FilterContainer filters={filters} callback={onFilterClick} selectedFilters={selectedFilters} />
        </Grid2>
      </Grid2>
      <Grid2 container sx={{ padding: '1.25rem' }} columnSpacing={2} rowSpacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Notification backgroundColor={colors.lightGreen}>
            <Grid2 container>
              <Grid2 size={{ xs: 9 }}>
                <Grid2 container>
                  <Grid2 size={{ xs: 12 }} sx={{ fontWeight: '600', fontSize: '0.75rem' }}>
                    Create new car
                  </Grid2>
                  <Grid2 size={{ xs: 12 }} sx={{ fontWeight: '600', fontSize: '0.625rem', color: '#818683' }}>
                    Click here to create a new car
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 size={{ xs: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <DirectionsCarFilledRoundedIcon sx={{ color: '#505050' }} />
              </Grid2>
            </Grid2>
          </Notification>
        </Grid2>
        {cars.map((car) => (
          <Grid2 size={{ xs: 12 }} key={car.id}>
            <MyCar {...car} />
          </Grid2>
        ))}
      </Grid2>
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
