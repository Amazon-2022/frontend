import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import GenerateUser from '../components/GenerateUser';
import Schemas from '../components/Schemas';
import customerSchemaAPI from '../services/customerSchemaAPI';
import usersAPI from '../services/userAPI';
import Users from '../components/Users';
import SchemaModal from '../components/SchemaModal';

const schemasAPI = new customerSchemaAPI();
const usersApi = new usersAPI();

const mdTheme = createTheme();

export default function Admin(props) {
  const { loggedIn, triggerAlert } = props;
  const [schemas, setSchemas] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function initDashboard() {
      try{
        const users = await usersApi.getUsers();
        const schemas = await schemasAPI.getCustomerSchemas();
        setSchemas(schemas);
        setUsers(users);
      } catch (err) {
        triggerAlert("error", err.message);
      }
    }
    initDashboard();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    overflowX: 'auto'
                  }}
                >
                  <Users triggerAlert={triggerAlert} users={users}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <GenerateUser triggerAlert={triggerAlert}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
                  <Schemas triggerAlert={triggerAlert} schemas={schemas}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Fab color="primary" aria-label="add" sx={{m: 3}} style={{ background: '#DD571C' }} onClick={() => handleOpen()}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <SchemaModal triggerAlert={triggerAlert} open={open} handleClose={handleClose} modalData={undefined}/>
    </ThemeProvider>
  );
}
