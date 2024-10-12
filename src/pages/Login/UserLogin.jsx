import Grid from '@mui/material/Grid2';
import { StyledHeader, StyledP } from './UserLogin.styles';
import { Box } from '@mui/material';
import TextInput from '../../components/TextInput';
import PhoneInput from '../../components/PhoneInput';

const UserLogin = () => {
  return (
    <Grid container textAlign={'left'}>
      <Grid size={{ xs: 12 }}>
        <StyledHeader>Personal Information</StyledHeader>
        <StyledP>Please fill the fields with your</StyledP>
        <StyledP>personal information and try</StyledP>
        <Box sx={{ marginBottom: '1.75rem' }}>
          <StyledP>to be as accurate as possible</StyledP>
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
        <TextInput placeholder="First Name" fullWidth type="text" />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
        <TextInput placeholder="Last Name" fullWidth type="text" />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
        <TextInput placeholder="Email" fullWidth type="mail" />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
        <PhoneInput fullWidth />
      </Grid>
    </Grid>
  );
};

export default UserLogin;
