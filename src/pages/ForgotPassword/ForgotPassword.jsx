import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LargeButton from '../../components/LargeButton';
import PhoneInput from '../../components/PhoneInput';
import { useState } from 'react';
import StyledNotification from '../../components/StyledAlert';
import { AuthService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../../router/AppRouter';

export default function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Phone must not be empty');
      return;
    }

    const [res, err] = await AuthService.forgetPassword({ phone });
    if (err) {
      setError(err.message);
      return;
    }
    localStorage.setItem('phone', phone);
    navigate(PathName.CONFIRM_REGISTER + '?type=resetPassword');
  };

  return (
    <>
      <Grid container sx={{ padding: '2.187rem' }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.375rem' }}>
          <Typography variant="h5">Insert the phone number</Typography>
          <Typography variant="h5">you registered with</Typography>
          <Typography variant="h5">to receive a confirmation code</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
                <PhoneInput phone={phone} handleChange={setPhone} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <LargeButton fullWidth type="submit">
                  Next
                </LargeButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <StyledNotification duration={2500} isOpen={error} setIsOpen={setError}>
        {error}
      </StyledNotification>
      <StyledNotification duration={2500} isOpen={success} setIsOpen={setSuccess} severity="success">
        {success}
      </StyledNotification>
    </>
  );
}
