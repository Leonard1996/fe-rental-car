import { Box, Drawer, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ActionType, useAuth } from '../context/AuthContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { colors } from '../themes/base-theme';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { PathName } from '../router/AppRouter';

const StyledDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem'
  }
});

export default function Menu({ isOpen, setIsOpen, anchor }) {
  const {
    state: { user },
    dispatch
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const checkIsActive = (label) => {
    if (label === 'Home' && location.pathname === PathName.OWNER_PANEL && user.role === 'owner') return true;
    if (label === 'MyCars' && location.pathname === PathName.CARS && user.role === 'owner') return true;
    if (label === 'Home' && location.pathname === PathName.HOME && user.role === 'client') return true;
    if (label === 'My Reservations' && location.pathname === '/owner-panel/reservations' && user.role === 'owner')
      return true;
    if (
      label === 'Create reservation' &&
      location.pathname === PathName.OWNER_CREATE_RESERVATION &&
      user.role === 'owner'
    )
      return true;
    if (label === 'My Reservations' && location.pathname === '/reservations' && user.role === 'client') return true;
    if (label === 'Profile' && location.pathname === '/owner-panel/me' && user.role === 'owner') return true;
    if (label === 'Profile' && location.pathname === '/me' && user.role === 'client') return true;
    return false;
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleMenuElementClick = (label) => {
    if (checkIsActive(label)) {
      setIsOpen(false);
      return;
    }

    if (label === 'Home') {
      handleMenuItemClick('/');
    }
    if (label === 'My Reservations') {
      handleMenuItemClick('/reservations');
    }
    if (label === 'Create reservation') {
      handleMenuItemClick('/owner-panel/create-reservation');
    }
    if (label === 'My Cars') {
      handleMenuItemClick('/cars');
    }
    if (label === 'Profile') {
      handleMenuItemClick('/me');
    }
    if (label === 'Login') {
      handleMenuItemClick('/login');
    }
    if (label === 'Logout') {
      dispatch({ type: ActionType.LOGOUT });
      handleMenuItemClick('/');
    }
  };

  return (
    <StyledDrawer
      anchor={anchor}
      open={isOpen}
      onClose={setIsOpen}
      sx={{
        '& .MuiPaper-root': {
          position: 'absolute',
          top: '8.5625rem',
          left: 0,
          right: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }
      }}
    >
      <Grid container sx={{ padding: '1.25rem' }}>
        {['Home', 'My Reservations', 'Create reservation', 'My Cars', 'Profile', user ? 'Logout' : 'Login'].map(
          (label) => (
            <MenuElement
              label={label}
              key={label}
              callback={() => handleMenuElementClick(label)}
              showIcon={label !== 'Logout' && label !== 'Login'}
              isActive={checkIsActive(label)}
            />
          )
        )}
      </Grid>
    </StyledDrawer>
  );
}

const MenuElement = ({ label, callback, isActive, showIcon = true }) => {
  return (
    <Grid container onClick={callback} sx={{ width: '100%' }}>
      <Grid size={{ xs: 10 }} sx={{ padding: '0.5rem', cursor: 'pointer' }}>
        <Typography variant="h5" sx={{ fontWeight: '600', color: isActive ? colors.mainDarkGreen : colors.mainBlack }}>
          {label}
        </Typography>
      </Grid>
      {showIcon && (
        <Grid size={{ xs: 2 }} sx={{ padding: '0.5rem', cursor: 'pointer' }}>
          {<ArrowForwardIosIcon sx={{ color: isActive ? colors.mainDarkGreen : colors.mainBlack }} />}
        </Grid>
      )}
    </Grid>
  );
};
