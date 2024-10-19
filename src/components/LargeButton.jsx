import { Button, styled } from '@mui/material';
import { colors } from '../themes/base-theme';

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
      backgroundColor={props.backgroundColor ?? colors.mainDarkGreen}
      color={props.textColor ?? colors.white}
      borderColor={props.borderColor ?? colors.mainDarkGreen}
      padding={props.padding ?? '.625rem 1rem'}
      fontWeight={props.fontWeight ?? 600}
      textTransform={props.textTransform ?? 'none'}
      height={props.height ?? '3.1875rem'}
      borderRadius={props.borderRadius ?? '.75rem'}
      {...props}
      disabledColor={props.disabledColor ?? colors.mainDarkGreen}
      disabledBorder={props.disabledBorder ?? colors.lightGreen}
      disabledBackgroundColor={props.disabledBackgroundColor ?? colors.lightGreen}
      disableRipple
      disableElevation
    >
      {props.children}
    </StyledButton>
  );
};

export default LargeButton;
