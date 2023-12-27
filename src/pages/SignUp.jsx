import { Container, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import supabase from '../supabase/client';
import GetBgImage from "../utils/getBgImage";
import { Link, useNavigate } from 'react-router-dom';

const typographyStyle = {
  fontWeight: '700',
  letterSpacing: '-1px',
  fontSize: '50px',
  lineHeight: '50px',
};

function SignUp() {
  const navigate = useNavigate();
  const { bgimage } = GetBgImage();

  const handleRegister = async (event) => {
    event.preventDefault();     
    const registerForm = event.currentTarget;
    const { username, email, password } = Object.fromEntries(
      new FormData(registerForm)
    )
    try {
      let { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      })
      if (error) {
        alert(error.error_description || error.message)
      } else {
        registerForm.reset();
        navigate('/account');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOAuthSign = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        padding: '24px',
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
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ padding: { md: 4, lg: 4 } }}>
          <Typography variant="h5" className="pageTitle">
            Registrati
          </Typography>
          <p>Compila il form con i dati richiesti e registrati al sito.</p>
          <form onSubmit={handleRegister}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Indirizzo e-mail"
              name="email"
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrati
            </Button>
          </form>
          <br />
          <Link to="/login">Sei registrato? Accedi qui.</Link>
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
          Registrati con Discord
          </Button>
          </p>
        </Grid>

      </Grid>
    </Container>
  );
}

export default SignUp;
