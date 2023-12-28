import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert, Button } from "@mui/material";
import getStores from "../utils/getStores";
import Store from "../components/Store";
import 'swiper/css';
import 'swiper/css/navigation';



function Negozi() {


  const { stores, error, loading } = getStores();
  
    

  return (
    <>
      <Container fullWidth disableGutters sx={{padding:"60px 20px 0px 20px", width:"100%!important", maxWidth: "none"}}>
        <Grid>
          <Typography className="pageTitle">
            Stores disponibili 🛍️
          </Typography>
          <p>Clicca sul singolo negozio e scopri i giochi disponibili.</p>
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
          {stores &&
            stores.map((negozio) => (
              <Store store={negozio}/>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default Negozi;