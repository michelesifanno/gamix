import AppNavbar from '../components/AppNavbar'
import { Container, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar'
import Outlet from 'react-router-dom'


function SignTheme() {
    // Supponiamo che tu abbia uno stato o un modo per determinare se l'utente è autenticato o meno
    const isAuthenticated = false;  // Cambialo in base al tuo stato reale
  
    return (
      <>
        {/* Altri elementi comuni a entrambe le pagine di login e logout */}
        <AppNavbar />
  
        <Container maxWidth="xl" disableGutters>
          <Grid container spacing={2}>
            {/* Sidebar rimane la stessa */}
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} md={2} lg={2}>
              <Sidebar />
            </Grid>
  
            {/* Visualizza l'Outlet su tutta la larghezza su schermi più grandi o a schermo intero su dispositivi mobili */}
            <Grid item xs={12} md={theme.breakpoints.up('md') ? 10 : 12} lg={theme.breakpoints.up('md') ? 10 : 12}>
              <Outlet />
            </Grid>
          </Grid>
        </Container>
    
        <Footer />
  
        {/* Condizionalmente renderizza la pagina di login o logout in base allo stato dell'utente */}
        {isAuthenticated ? <LogoutPage /> : <LoginPage />}
      </>
    );
  }
  
  export default SignTheme;