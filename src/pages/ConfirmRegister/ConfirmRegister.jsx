import Grid from '@mui/material/Grid2';
import { StyledHeader, StyledP } from '../Register/UserSignup.styles';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import LargeButton from '../../components/LargeButton';
import { AuthService } from '../../services/auth.service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActionType, useAuth } from '../../context/AuthContext';
import { PathName } from '../../router/AppRouter';
import StyledNotification from '../../components/StyledAlert';
import PasswordInput from '../../components/PasswordInput';

export default function ConfirmRegister() {
  const phone = localStorage.getItem('phone')?.split(' ')?.join('');
  let privatePhone = '';

  for (let i = 0; i < phone.length; i++) {
    let letter = phone[i];
    if (![0, 1, 2, phone.length - 1, phone.length - 2].includes(i)) letter = '*';
    privatePhone += letter;
  }

  const [code, setCode] = useState('');
  const [error, setError] = useState();
  const [success, setSuccess] = useState('');

  const [searchParams, _setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (code) => {
    setCode(code);
  };

  const handleCodeResend = async () => {
    let codeType = 'confirmationCode';
    let message = 'Confirmation code resent';
    if (type === 'resetPassword') {
      codeType = 'resetPasswordCode';
      message = 'Reset password code resent';
    }

    const [_res, err] = await AuthService.getConfirmationCode({ phone, codeType });
    if (err) {
      setError(err.message);
      return;
    }
    setSuccess(message);
  };

  const validatePassword = () => {
    if (!passwordRef.current.value.length) {
      setError('Password should not be empty');
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError('Password must match Confirm password');
      return;
    }
    if (passwordRef.current.value.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    return true;
  };

  const handleConfirm = async () => {
    let service = async () => await AuthService.confirmAccount({ phone, code });
    if (type === 'resetPassword') {
      const isValid = validatePassword();
      if (!isValid) return;
      service = async () => await AuthService.resetPassword({ phone, code, password: passwordRef.current.value });
    }

    const [res, err] = await service();
    if (err) {
      setError(err.message);
      return;
    }
    dispatch({ type: ActionType.LOGIN, payload: res });
    navigate(PathName.HOME);
  };

  return (
    <>
      <Grid container textAlign={'left'} sx={{ padding: '2.187rem' }}>
        <Grid size={{ xs: 12 }}>
          <StyledHeader>{type === 'resetPassword' ? 'Forgot Password' : 'Confirm Account'}</StyledHeader>
          <StyledP>A 6 digit code has been sent to you to {privatePhone}</StyledP>
          {/* 
          Password input only
          */}
          {type === 'resetPassword' ? (
            <>
              <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
                <PasswordInput placeholder="Password" fullWidth inputRef={passwordRef} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
                <PasswordInput placeholder="Confirm Password" fullWidth inputRef={confirmPasswordRef} />
              </Grid>
            </>
          ) : null}
          {/* End password input */}
          <MuiOtpInput value={code} onChange={handleChange} length={5} />
          <Box sx={{ marginTop: '1.8125rem', marginBottom: '1.8125rem', cursor: 'pointer' }} onClick={handleCodeResend}>
            <LargeButton>Resend Code</LargeButton>
          </Box>
          <Box sx={{ marginBottom: '1.8125rem' }}>
            <Typography variant="caption">Caution: You have a limited number of attempts to resend the code</Typography>
          </Box>
          <Grid size={{ xs: 12 }}>
            <LargeButton fullWidth type="submit" disabled={code?.length < 5} onClick={handleConfirm}>
              Next
            </LargeButton>
          </Grid>
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
