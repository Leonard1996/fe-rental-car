import { styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)({
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

const TextInput = (props) => {
  return <StyledTextField variant="outlined" {...props} />;
};

export default TextInput;
