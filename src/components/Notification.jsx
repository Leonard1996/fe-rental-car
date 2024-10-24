export default function Notification({ backgroundColor, children }) {
  return (
    <div
      style={{
        backgroundColor,
        padding: '1rem',
        borderRadius: '.75rem',
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  );
}

{
  /* <Notification backgroundColor={colors.lightGreen}>
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
</Notification> */
}
