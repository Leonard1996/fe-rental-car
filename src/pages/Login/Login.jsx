import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PhoneInput from '../../components/PhoneInput';
import PasswordInput from '../../components/PasswordInput';
import { useRef, useState } from 'react';
import LargeButton from '../../components/LargeButton';
import { StyledP } from '../Register/UserSignup.styles';
import { useNavigate } from 'react-router-dom';
import StyledNotification from '../../components/StyledAlert';
import { AuthService } from '../../services/auth.service';
import { PathName } from '../../router/AppRouter';
import { ActionType, useAuth } from '../../context/AuthContext';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Phone must not be empty');
      return;
    }
    if (!passwordRef.current.value) {
      setError('Password must not be empty');
      return;
    }

    const [res, err] = await AuthService.login({ phone, password: passwordRef.current.value });
    if (err) {
      setError(err.message);
      return;
    }
    Object.keys(res).forEach((key) => localStorage.setItem(key, JSON.stringify(res[key])));
    dispatch({ type: ActionType.LOGIN, payload: res });
    navigate(PathName.HOME);
  };

  const handleForgotPasswordClick = () => {
    navigate(PathName.FORGOT_PASSWORD);
  };

  return (
    <>
      <Grid container textAlign={'left'} sx={{ padding: '2.187rem' }}>
        <Grid size={{ xs: 12 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '2.75rem'
            }}
          >
            Login to your Account
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ marginTop: '2.75rem' }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.375rem' }}>
                <PhoneInput phone={phone} handleChange={setPhone} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.375rem' }}>
                <PasswordInput fullWidth inputRef={passwordRef} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', marginBottom: '1.875rem' }}>
                <StyledP onClick={() => navigate('/signup')}>
                  Don&apos;t have an account? <b>Sign up</b>
                </StyledP>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <LargeButton fullWidth type="submit">
                  Login
                </LargeButton>
              </Grid>
              <Grid size={{ xs: 12 }} onClick={handleForgotPasswordClick}>
                <p style={{ fontWeight: 600, fontSize: '1rem', textAlign: 'center' }}>Forgot your password?</p>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <StyledNotification duration={2500} isOpen={error} setIsOpen={setError}>
        {error}
      </StyledNotification>
    </>
  );
}
