import { Drawer, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function FilterDrawer({ label, anchor, isOpen, handleClose, children }) {
  return (
    <Drawer
      anchor={anchor}
      open={isOpen}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem'
        }
      }}
    >
      <Grid container sx={{ padding: '1rem 2rem', borderBottom: '2px solid #F2F2F2' }}>
        <Grid size={{ xs: 12 }}>
          <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{label}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {children}
    </Drawer>
  );
}
