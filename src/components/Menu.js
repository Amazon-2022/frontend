import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Menu(props) {
  const { loggedIn, logOut } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#0C0C0C' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AWS_CCS
          </Typography>
          { loggedIn ? (
            <Button 
              color="inherit"
              onClick={() => logOut()}
            >
            LogOut
            </Button>
          ) : (
            <div></div>
          ) }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
