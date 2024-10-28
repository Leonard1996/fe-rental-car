import Grid from '@mui/material/Grid2';
import SortBy from './SortBy';
import DateFilter from './DateFilter';
import ShuttleFilter from './ShuttleFilter';
import { Typography } from '@mui/material';

export default function AllFilters(props) {
  return (
    <Grid container>
      <Grid item={{ xs: 12 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', padding: '1rem 0 0 1rem' }}>Sort By</Typography>
        <SortBy {...props} id="sortBy" />
      </Grid>
      <Grid item={{ xs: 12 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', padding: '0 0 0 1rem' }}>Dates</Typography>
        <DateFilter {...props} />
      </Grid>
      <Grid item={{ xs: 12 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', padding: '0 0 0 1rem' }}>Aiport</Typography>
        <ShuttleFilter {...props} id="isShuttle" />
      </Grid>
    </Grid>
  );
}
