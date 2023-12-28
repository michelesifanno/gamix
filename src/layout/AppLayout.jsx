import { Outlet } from 'react-router-dom';
import React from 'react';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/AppFooter'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, useTheme, Box, IconButton, Toolbar, List, Divider } from '@mui/material';
import WestTwoToneIcon from '@mui/icons-material/WestTwoTone';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import MainListItems from '../components/MainListItems';
import styled from '@mui/system/styled';
import MuiDrawer from '@mui/material/Drawer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0e0e10',
    },
      primary: {
        main:'#e6ff70',
  },
  tertiary: {
    main: '#ff5722', 
  },
},
});
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppNavbar />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: [1],
            }}
          >
            {open ? (
              <IconButton onClick={toggleDrawer}>
                <WestTwoToneIcon />
              </IconButton>
            ) : (
              <IconButton onClick={toggleDrawer}>
                <EastTwoToneIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />
          <List
            component="nav"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              px: [1],
            }}
          >
            <MainListItems />
          </List>
        </Drawer>
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
          <Toolbar />
          <Grid container>
            <Grid
              item
              xs={12}
              md={theme.breakpoints.up('md') ? 10 : 12}
              lg={theme.breakpoints.up('md') ? 10 : 12}
              sx={{padding:'0px', maxWidth:'100%', minWidth: '100%'}}

            >
              <Outlet />
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AppLayout;
