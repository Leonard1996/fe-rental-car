import Grid from '@mui/material/Grid2';
import { StyledHeader, StyledP } from './UserLogin.styles';
import { Box } from '@mui/material';
import TextInput from '../../components/TextInput';
import PhoneInput from '../../components/PhoneInput';
import { useRef, useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import LargeButton from '../../components/LargeButton';
import FormeError from '../../components/FormError';

const UserLogin = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (e) => {
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
  };

  return (
    <>
      <Grid container textAlign={'left'}>
        <Grid size={{ xs: 12 }}>
          <StyledHeader>Personal Information</StyledHeader>
          <StyledP>Please fill the fields with your</StyledP>
          <StyledP>personal information and try</StyledP>
          <Box sx={{ marginBottom: '1.75rem' }}>
            <StyledP>to be as accurate as possible</StyledP>
          </Box>
        </Grid>
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
          <Grid size={{ xs: 12 }} sx={{ marginTop: '8.25rem' }}>
            <LargeButton fullWidth type="submit">
              Next
            </LargeButton>
          </Grid>
        </form>
      </Grid>
      <FormeError duration={2500} isOpen={error} setIsOpen={setError}>
        {error}
      </FormeError>
    </>
  );
};

export default UserLogin;
