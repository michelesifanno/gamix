import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import getGenres from "../utils/getGenres";
import Genre from "../components/Genre";
import 'swiper/css';
import 'swiper/css/navigation';



function Generi() {



  const { genres, error, loading } = getGenres();


  return (
    <>
      <Container fullWidth disableGutters sx={{padding:"60px 20px 0px 20px", width:"100%!important", maxWidth: "none"}}>
        <Grid>
          <Typography className="pageTitle">
            Scegli per genere 🕹️
          </Typography>
          <p>Clicca su un genere e scopri i giochi.</p>
        </Grid>
      </Container>
      <Container fullWidth disableGutters sx={{padding:"20px 20px 40px 20px"}}>
        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {loading && (
          <CircularProgress color="secondary" />
        )}

        <Grid container spacing={3} alignItems="stretch">
          {genres &&
            genres.map((genre) => (
              <Genre key={genre.id} genre={genre} />
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default Generi;