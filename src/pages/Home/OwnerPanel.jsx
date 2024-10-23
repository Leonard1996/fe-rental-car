import Grid from '@mui/material/Grid2';
import FilterContainer from './FilterContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Notification from '../../components/Notification';
import { colors } from '../../themes/base-theme';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useLoading } from '../../context/LoadingContext';

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
  const { loading, setLoading } = useLoading();

  return (
    <Grid container>
      <Grid size={{ xs: 12 }} sx={{ padding: '.875rem 0rem 0rem' }}>
        <FilterContainer filters={filters} />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ padding: '1.25rem' }}>
        <Notification backgroundColor={colors.lightGreen}>
          <Grid container>
            <Grid size={{ xs: 9 }}>
              <Grid container>
                <Grid size={{ xs: 12 }} sx={{ fontWeight: '600', fontSize: '0.75rem' }}>
                  You have 3 new requests
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ fontWeight: '600', fontSize: '0.625rem', color: '#818683' }}>
                  Check your requests now on your notification
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <NotificationsRoundedIcon sx={{ color: '#505050' }} />
            </Grid>
          </Grid>
        </Notification>
      </Grid>
      <Grid container></Grid>
    </Grid>
  );
}
