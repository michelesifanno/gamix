import supabase from '../supabase/client';
import { Container, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GetBgImage from "../utils/getBgImage";
import { Link, useNavigate } from 'react-router-dom';


const typographyStyle = {
  fontWeight: '700',
  letterSpacing: '-1px',
  fontSize: '50px',
  lineHeight: '50px',
};


function SignIn() {
  const navigate = useNavigate();
  const { bgimage } = GetBgImage();

  const handleLogin = async (event) => {
    event.preventDefault();     
    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(
      new FormData(loginForm)
    )
    try {
      let { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        alert(error.error_description || error.message)
      } else {
        loginForm.reset();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Puoi aggiungere qualsiasi altra logica di reindirizzamento o azioni post-logout qui
    navigate('/');
  };

  const handleOAuthSign = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  };



  return (
      <Container maxWidth="xl" 
      sx={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.8897759787508753) 0%, rgba(0,0,0,0.8) 51%, rgba(0,0,0,0.5424370431766457) 100%), url(${bgimage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
      >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography variant="h5" className="pageTitle">Login</Typography>
      <p>Inserisci e-mail e password per effettuare il login.</p>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Indirizzo e-mail"
            name="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </form>
        <br />
        <Link to="/register">Non sei registrato? Registrati qui.</Link>
        <br />
        <Link to="/recupero-password">Password dimenticata?</Link>
        <br />
        <br />
        <Divider>OPPURE</Divider>
        <p style={{textAlign:'center'}}>
        <Button
        variant="contained"
        onClick={handleOAuthSign}
        startIcon={<LockOpenIcon />}
        style={{background: '#5865f2',
        color:'#fff'
        }}>
          Accedi con Discord
          </Button>
          </p>
         </Grid>
        </Grid>
      </Container>
  );
}

export default SignIn;