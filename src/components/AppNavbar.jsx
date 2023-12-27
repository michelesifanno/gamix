import { useContext, useState, useEffect, useRef } from 'react';
import AppContext from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Grid, IconButton, InputBase, alpha, Container, styled, Menu, MenuItem, Divider } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import SearchField from './SearchField';
import logo from '/logo-gamix.png';
import useProfile from '../hooks/useProfile';
import supabase from '../supabase/client';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: '#eee',
    color:'#121212',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));



function AppNavbar() {

  // Gestione dell'utente

  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let ignore = false;

    async function getProfile() {
      setLoading(true);
      if (session && session.user) {
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
        }
      }

      setLoading(false);
    }
   else {
    // Gestisci il caso in cui la sessione o l'utente non sono definiti
    if (!ignore) {
      setLoading(false);
    }
  }
}


    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);


  // Gestione del menu dropdown sull'icon avatar

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };  

  // Gestione del Logout

  const navigate = useNavigate();


  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Puoi aggiungere qualsiasi altra logica di reindirizzamento o azioni post-logout qui
    navigate('/');
  };

  
  return (
    <AppBar position="sticky" className='appbarGamix'>
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center" style={{ textAlign: 'left' }}>
          <Grid item xs={2}>
            <a href='/'><img src={logo} alt="Logo" height="50"  /></a>
          </Grid>

          <Grid item xs={session ? 8 : 7.5}>
            <SearchField />
          </Grid>
          {console.log(session)}
{/* Se la sessione è presente, mostra l'area con il nome utente */}
{session ? (
            <Grid item xs={2} style={{ textAlign: 'right' }}>
            {username} <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem component={Link} to="/account" onClick={handleMenuClose}>Account</MenuItem>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
          ) : (
  /* Se la sessione è assente, mostra i pulsanti di accesso */
  <Grid item xs={2.5} style={{ textAlign: 'right' }}>
    <Button variant="outlined" href="/login" style={{ marginRight: '10px', border: '1px solid #e6ff70', color: '#e6ff70' }}>
      Sign In
    </Button>
    <Button variant="outlined" href="/register" style={{ marginRight: '10px', border: '1px solid #e6ff70', color: '#e6ff70' }}>
      Sign Up
    </Button>
  </Grid>
)}
        </Grid>
      </Container>
    </AppBar>
  );
}

export default AppNavbar;
