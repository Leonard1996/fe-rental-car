import Grid from '@mui/material/Grid2';
import { StyledHeader, StyledP } from '../Login/UserSignup.styles';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LargeButton from '../../components/LargeButton';
import { UserService } from '../../services/user.service';
import StyledAlert from '../../components/StyledAlert';
import { useNavigate } from 'react-router-dom';
import { ActionType, useAuth } from '../../context/AuthContext';
import { PathName } from '../../router/AppRouter';

export default function ConfirmRegister() {
  const phone = localStorage.getItem('phone')?.split(' ')?.join('');
  //   const phone = '+4444444444';
  let privatePhone = '';

  for (let i = 0; i < phone.length; i++) {
    let letter = phone[i];
    if (![0, 1, 2, phone.length - 1, phone.length - 2].includes(i)) letter = '*';
    privatePhone += letter;
  }

  const [code, setCode] = useState('');
  const [error, setError] = useState();
  const [success, setSucces] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (code) => {
    setCode(code);
  };

  const handleCodeResend = async () => {
    const [_res, err] = await UserService.getConfirmationCode({ phone, codeType: 'confirmationCode' });
    if (err) {
      setError(err.message);
      return;
    }
    setSucces('Confirmation code resent');
  };

  const handleConfirm = async () => {
    const [res, err] = await UserService.confirmAccount({ phone, code });
    if (err) {
      setError(err.message);
      return;
    }
    Object.keys(res).forEach((key) => localStorage.setItem(key, JSON.stringify(res[key])));
    dispatch({ type: ActionType.LOGIN, payload: res });
    navigate(PathName.HOME);
  };

  return (
    <>
      <Grid container textAlign={'left'} sx={{ padding: '2.187rem' }}>
        <Grid size={{ xs: 12 }}>
          <StyledHeader>ForgotPassword</StyledHeader>
          <StyledP>A 6 digit code has been sent to you to {privatePhone}</StyledP>
          <Box sx={{ marginTop: '5rem' }}>
            <MuiOtpInput value={code} onChange={handleChange} length={5} />
          </Box>
          <Box sx={{ marginTop: '1.8125rem', marginBottom: '1.8125rem', cursor: 'pointer' }} onClick={handleCodeResend}>
            <LargeButton>Resend Code</LargeButton>
          </Box>
          <Typography variant="caption">Caution: You have a limited number of attempts to resend the code</Typography>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ marginTop: '9.25rem' }}>
          <LargeButton fullWidth type="submit" disabled={code?.length < 5} onClick={handleConfirm}>
            Next
          </LargeButton>
        </Grid>
      </Grid>
      <StyledAlert duration={2500} isOpen={error} setIsOpen={setError}>
        {error}
      </StyledAlert>
      <StyledAlert duration={2500} isOpen={success} setIsOpen={setSucces} severity="success">
        {success}
      </StyledAlert>
    </>
  );
}
