import { styled } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';

const StyledTextField = styled(MuiTelInput)({
  'background': '#fafafa',
  'borderRadius': '12px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiInputLabel-root': {
    display: 'none'
  },
  '& input': {
    padding: '1.25rem'
  }
});

const PhoneInput = ({ phone, handleChange, ...props }) => {
  return (
    <StyledTextField
      value={phone}
      onChange={handleChange}
      {...props}
      defaultCountry="AL"
      forceCallingCode
      placeholder="Phone Number"
    />
  );
};

export default PhoneInput;
