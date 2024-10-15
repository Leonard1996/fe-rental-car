import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'transparent', border: 'none', padding: '.75rem' }}
        elevation={0}
      >
        <Toolbar>
          <ArrowBackIcon size="large" edge="start" aria-label="menu" sx={{ mr: 2, fill: '#000' }}></ArrowBackIcon>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
