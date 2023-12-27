import { React, useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import getInfoGame from '../utils/getInfoGame'
import { Container, Grid, Typography, CircularProgress, Alert, Box, Card, CardMedia, Divider, TextField, Button, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import useProfile from '../hooks/useProfile'
import Messages from '../components/Messages';
import supabase from '../supabase/client';
import Comments from '../components/Comments';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import HeartBrokenTwoToneIcon from '@mui/icons-material/HeartBrokenTwoTone';


function SingleGame() {


  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const { slug } = useParams();
  const { game, movies, achievements, stores, screenshots, error, loading } = getInfoGame(slug);

  const [fav, setFav] = useState([]);

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('game_id', game.id)
      .eq('game_name', game.name_original)
      .eq('profile_id', session.user.id);

    if (error) {
      alert(error.message);
    } else {
      setFav(data || []); // Imposta l'array vuoto se data è null o undefined
    }
  };


  const addToFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          game_id: game.id,
          game_name: game.name_original,
          profile_id: session.user.id,
        },
      ])
      .select();
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const removeFromFavorites = async () => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('game_id', game.id)
        .eq('profile_id', session.user.id);

      if (error) {
        console.error(error);
        alert(error.message);
      } else {
        console.log('Favorito rimosso con successo!');
        getFavGame();
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (session) {
      getFavGame();
    }
  }, []);


  if (loading) {
    return (
      <Container maxWidth="xl" disableGutters>
        <CircularProgress color="secondary" />
      </Container>
    );
  }



  if (loading) {
    return (
      <Container maxWidth="xl" disableGutters sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${game.background_image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
      }}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" disableGutters sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${game.background_image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
      }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!game) {
    return (
      <Container maxWidth="xl" disableGutters sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${game.background_image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
      }}>
        <Alert severity="warning">Dettagli del gioco non disponibili.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{
        padding: '0px 0px 20px 0px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${game.background_image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
        width: '100%',
      }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item sx={12} sm={12} md={6} lg={6} p={8}>
            <Typography className="pageTitle">
              {game.name_original}
            </Typography>
            <br />
            <Typography variant='body1' paragraph sx={{ marginTop: '16px' }}>
              <strong>Data di pubblicazione:</strong>
              <br />
              {game.released}
            </Typography>
            <Divider />
            <Typography variant='body1' paragraph sx={{ marginTop: '16px' }}>
              <strong>Generi:</strong>
              <br />
              {game.genres && game.genres.length > 0
                ? game.genres.map((genre) => genre.name).join(', ')
                : 'Nessun genere disponibile'}
            </Typography>
            <Divider />
            <Typography variant='body1' paragraph sx={{ marginTop: '16px' }}>
              <strong>Disponibile per:</strong>
              <br />
              {game.parent_platforms && game.parent_platforms.length > 0
                ? game.parent_platforms.map((piattaforma) => piattaforma.platform.name).join(', ')
                : 'Nessuna piattaforma disponibile'}
            </Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="start" sx={{ paddingTop: '20px' }}>
              <Grid item xs={4}>
                <Comments game={game} />
              </Grid>
              {profile && (
                <Grid item xs={4}>
                  <Button
                    variant={fav.length !== 0 ? 'outlined' : 'contained'}
                    size='large'
                    color='secondary'
                    onClick={fav.length !== 0 ? removeFromFavorites : addToFavorites}
                    sx={{ width: '100%' }}
                    endIcon={fav.length !== 0 ? <HeartBrokenTwoToneIcon /> : <FavoriteTwoToneIcon />}
                  >
                    {fav.length !== 0 ? 'Lo odio!' : 'Lo adoro!'}
                  </Button>
                </Grid>
              )}
              {profile && (
                <Grid item xs={4}>
                  <Messages game={game} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item sx={12} sm={12} md={6} lg={6} p={8}>
            <Card sx={{
              backgroundColor: '#0000',
            }}>
              <CardMedia
                component="img"
                src={game.background_image}
                title={`Immagine del gioco`}
                className="gameImage"
                sx={{ minHeight: '100vh' }}
              />
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sx={12} sm={12} md={12} lg={12} p={4}>
            {screenshots && screenshots.results && screenshots.results.length > 0 ? (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="gameScreenshot"
                slidesPerView={4}
                spaceBetween={20}
              >
                {screenshots.results.map((screen) => (
                  <SwiperSlide key={screen.id}>
                    <CardMedia
                      component="img"
                      src={screen.image}
                      title={`Screenshot`}
                      className="gameImage"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              null
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SingleGame;