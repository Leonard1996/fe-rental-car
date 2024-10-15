import { useEffect } from 'react';
import { Alert, styled } from '@mui/material';

const StyledAlertContainer = styled('div')({
  position: 'fixed',
  top: 10,
  right: 10,
  zIndex: 1300,
  maxWidth: '75%'
});

const StyledAlert = ({ children, duration, setIsOpen, isOpen, severity = 'error', variant = 'filled' }) => {
  const handleClose = () => setIsOpen(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    isOpen && (
      <StyledAlertContainer>
        <Alert variant={variant} severity={severity} onClose={handleClose}>
          {children}
        </Alert>
      </StyledAlertContainer>
    )
  );
};

export default StyledAlert;
