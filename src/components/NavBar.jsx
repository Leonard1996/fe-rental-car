import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid2';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { colors } from '../themes/base-theme';
import SearchBar from './SearchBar';
import { Grow } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Menu from './Menu';

export default function NavBar() {
  const [isMenuExtended, setIsMenuExtended] = useState(false);

  const handleMenuClick = () => {
    setIsMenuExtended((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: colors.lightGreen, border: 'none', padding: '1.25rem' }}
          elevation={0}
        >
          <Toolbar sx={{ padding: 0 }}>
            <Grid container sx={{ width: '100%' }}>
              <Grid size={{ xs: 6 }}>ICON</Grid>
              <Grid size={{ xs: 6 }} sx={{ textAlign: 'right' }}>
                <Box marginRight={2} display="inline">
                  <PersonRoundedIcon sx={{ color: colors.mainBlack, cursor: 'pointer' }} />
                </Box>
                {!isMenuExtended && (
                  <Grow in={!isMenuExtended} {...(!isMenuExtended ? { timeout: 1000 } : {})}>
                    <MenuRoundedIcon sx={{ color: colors.mainBlack, cursor: 'pointer' }} onClick={handleMenuClick} />
                  </Grow>
                )}
                {isMenuExtended && (
                  <Grow in={isMenuExtended} {...(isMenuExtended ? { timeout: 1000 } : {})}>
                    <CloseRoundedIcon sx={{ color: colors.mainBlack, cursor: 'pointer' }} onClick={handleMenuClick} />
                  </Grow>
                )}
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ marginTop: '1.75rem' }}>
                <SearchBar />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu anchor="left" isOpen={isMenuExtended} setIsOpen={() => setIsMenuExtended(false)} />
    </>
  );
}
