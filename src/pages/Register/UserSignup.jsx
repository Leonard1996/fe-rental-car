import Grid from '@mui/material/Grid2';
import { StyledHeader, StyledP } from './UserSignup.styles';
import TextInput from '../../components/TextInput';
import PhoneInput from '../../components/PhoneInput';
import { useRef, useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import LargeButton from '../../components/LargeButton';
import { AuthService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../../router/AppRouter';
import StyledNotification from '../../components/StyledAlert';

const UserSignup = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstNameRef.current.value.trim() === '') {
      setError('First name should not be empty');
      return;
    }
    if (lastNameRef.current.value.trim() === '') {
      setError('Last name should not be empty');
      return;
    }
    if (passwordRef.current.value.trim() === '') {
      setError('Password should not be empty');
      return;
    }
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

    if (phone === '') {
      setError('Phone must not be empty');
      return;
    }

    const [_res, err] = await AuthService.login({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      password: passwordRef.current.value,
      phone
    });

    if (err) {
      setError(err.message);
      return;
    }
    localStorage.setItem('phone', phone);
    navigate(PathName.CONFIRM_REGISTER);
  };

  return (
    <>
      <Grid container textAlign={'left'} sx={{ padding: '2.062rem', paddingTop: 0 }}>
        <Grid size={{ xs: 12 }} sx={{ marginBottom: '1rem' }}>
          <StyledHeader>Personal Information</StyledHeader>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <form onSubmit={handleSubmit}>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
              <TextInput placeholder="First Name" fullWidth type="text" inputRef={firstNameRef} />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
              <TextInput placeholder="Last Name" fullWidth type="text" inputRef={lastNameRef} />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
              <PasswordInput placeholder="Password" fullWidth inputRef={passwordRef} />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
              <PasswordInput placeholder="Confirm Password" fullWidth inputRef={confirmPasswordRef} />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.875rem' }}>
              <PhoneInput fullWidth phone={phone} handleChange={setPhone} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <LargeButton fullWidth type="submit">
                Next
              </LargeButton>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', marginTop: '.75rem' }}>
              <StyledP onClick={() => navigate('/login')}>
                Already have an account? <b>Log in</b>
              </StyledP>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <StyledNotification duration={2500} isOpen={error} setIsOpen={setError}>
        {error}
      </StyledNotification>
    </>
  );
};

export default UserSignup;
