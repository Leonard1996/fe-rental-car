import Grid from '@mui/material/Grid2';
import FilterContainer from './FilterContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const filters = [
  {
    label: <DeleteRoundedIcon sx={{ width: '.875rem', height: '.875rem' }} />,
    callback: () => console.log(1),
    showIcon: false,
    customStyles: {
      wrapper: { padding: '.5rem' },
      container: {},
      label: {},
      icon: {}
    }
  },
  { label: 'All Filters', callback: () => console.log(1), showIcon: false },
  { label: 'Dates', callback: () => console.log(1), showIcon: true },
  { label: 'Airport', callback: () => console.log(1), showIcon: true },
  { label: 'Filter', callback: () => console.log(1), showIcon: true }
];

export default function OwnerPanel() {
  return (
    <Grid container>
      <Grid size={{ xs: 12 }} sx={{ padding: '.875rem 0rem 0rem 1.25rem' }}>
        <FilterContainer filters={filters} />
      </Grid>
    </Grid>
  );
}
