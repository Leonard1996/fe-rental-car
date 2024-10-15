import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)((props) => ({
  ...props,
  '&.Mui-disabled': {
    backgroundColor: props.disabledBackgroundColor,
    color: props.disabledColor,
    border: props.disabledBorder
  }
}));

const LargeButton = (props) => {
  return (
    <StyledButton
      variant={props.variant ?? 'outlined'}
      backgroundColor={props.backgroundColor ?? '#000'}
      color={props.textColor ?? '#fff'}
      borderColor={props.borderColor ?? '#000'}
      padding={props.padding ?? '.625rem 1rem'}
      fontWeight={props.fontWeight ?? 600}
      textTransform={props.textTransform ?? 'none'}
      height={props.height ?? '3.1875rem'}
      borderRadius={props.borderRadius ?? '.75rem'}
      {...props}
      disabledColor={props.disabledColor ?? 'white'}
      disabledBorder={props.disabledBorder ?? 'none'}
      disabledBackgroundColor={props.disabledBackgroundColor ?? '#e7e7e7'}
      disableRipple
      disableElevation
    >
      {props.children}
    </StyledButton>
  );
};

export default LargeButton;
