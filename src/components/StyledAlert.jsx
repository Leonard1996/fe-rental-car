import { useEffect } from 'react';
import { Alert, IconButton, styled } from '@mui/material';
import { colors } from '../themes/base-theme';
import CloseIcon from '@mui/icons-material/Close';

const severityMap = {
  error: {
    backgroundColor: colors.lightRed,
    color: colors.darkRed
  },
  success: {
    backgroundColor: colors.lightGreen,
    color: colors.mainDarkGreen
  }
};

const StyledAlertContainer = styled('div')({
  position: 'fixed',
  top: 10,
  right: 10,
  zIndex: 1300,
  maxWidth: '80%'
});

const StyledIconContainer = styled('div')({
  padding: '0.067rem',
  borderRadius: '100%'
});

const StyledAlert = styled(Alert)(({ severity }) => ({
  ...severityMap[severity],
  borderRadius: '.75rem'
}));

const StyledNotification = ({ children, duration, setIsOpen, isOpen, severity = 'error', variant = 'filled' }) => {
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
        <StyledAlert
          variant={variant}
          severity={severity}
          onClose={handleClose}
          icon={false}
          action={
            <StyledIconContainer severity={severity}>
              <IconButton
                aria-label="close"
                size="small"
                sx={{
                  color: colors.white
                }}
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </StyledIconContainer>
          }
        >
          {children}
        </StyledAlert>
      </StyledAlertContainer>
    )
  );
};

export default StyledNotification;
