import React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";
import getLatest from "../utils/getLatest";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Game from "../components/Game";
import 'swiper/css';
import 'swiper/css/navigation';



function Nuovi() {

  const [currentPage, setCurrentPage] = useState(1);
  const { giochi, error, loading } = getLatest(currentPage);
  
  const handleGoNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  const handleGoBack = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  return (
    <>
      <Container fullWidth disableGutters sx={{padding:"60px 20px 0px 20px", width:"100%!important", maxWidth: "none", minHeight:"100vh"}}>
        <Grid>
          <Typography className="pageTitle">
            Nuove uscite 🆕
          </Typography>
          <p>Clicca su un singolo gioco e scopri di più.</p>
        </Grid>
      </Container>
      <Container fullWidth disableGutters sx={{padding:"20px 20px 40px 20px"}}>
        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {loading && (
          <CircularProgress color="secondary" />
        )}

<Grid container spacing={3} alignItems="stretch" sx={{marginBottom:'40px'}}>
          {giochi &&
            giochi.map((gioco) => (
                <Game key={gioco.id} game={gioco} />
            ))}
        </Grid>
        <Button variant="contained"
          onClick={handleGoBack}
          disabled={currentPage === 1}
          sx={{marginRight:'10px'}}>
          Indietro
        </Button>
        <Button variant="contained"
          onClick={handleGoNext}>
          Avanti
        </Button>

      </Container>
    </>
  );
}

export default Nuovi;