import React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";
import getLatest from "../hooks/getLatest";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';



function Trends() {

  const [currentPage, setCurrentPage] = useState(1);
  const { games, error, loading } = getLatest(currentPage);
  
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading // Verifica che non ci siano già giochi in fase di caricamento
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Aggiorna l'effetto solo quando loading cambia

  return (
    <>
      <Container sx={{ padding: '24px' }}>
        <Grid>
          <Typography className="pageTitle">
            Giochi in tendenza 🔥 
          </Typography>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </Grid>
      </Container>
      <Container sx={{ padding: '24px' }}>
        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {loading && (
          <CircularProgress color="secondary" />
        )}

        <Grid container spacing={3} alignItems="stretch">
          {games &&
            games
            .map((game) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={game.id}>
                <Card>
                    <Swiper
                      navigation={true}
                      modules={[Navigation]}
                      className="gameScreenshot"
                    >
                  {game.short_screenshots && game.short_screenshots.length > 0 ? (
                    game.short_screenshots.map((screen) => (
                      <SwiperSlide key={screen.id}>
                        <CardMedia
                          component="img"
                          src={screen.image}
                          title={`Screenshot`}
                          className="gameImage"
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <CardMedia
                        component="img"
                        src={game.background_image}
                        title={`Immagine del gioco`}
                        className="gameImage"
                      />
                    </SwiperSlide>
                  )}
                  </Swiper>
 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {game.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {game.rating} ⭐️
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default Trends;