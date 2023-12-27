import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/AppFooter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box } from '@mui/material';
import FixedBottomNavigation from '../components/FixedBottomNavigation';

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


function SignLayout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppNavbar />
      <Container maxWidth="xl" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Box position="fixed" bottom={0} width="100%" sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', zIndex:'99999' } }}>
        <FixedBottomNavigation />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default SignLayout;
