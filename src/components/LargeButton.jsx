import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)({
  borderRadius: '.75rem',
  backgroundColor: '#000',
  padding: '.625rem 1rem',
  fontWeight: 600,
  textTransform: 'none',
  height: '3.1875rem'
});

const LargeButton = (props) => {
  return (
    <StyledButton variant="contained" {...props} disableRipple disableElevation>
      {props.children}
    </StyledButton>
  );
};

export default LargeButton;
