import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert, Button } from "@mui/material";
import getGameByGenre from "../utils/getGameByGenre";
import Game from "../components/Game";
import { useParams } from "react-router-dom";

function Genere() {


  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();
  const { giochi, error, loading } = getGameByGenre(currentPage, slug);

  const words = slug.split('-');

const camelCaseSlug = words.map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');

  const handleGoNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  const handleGoBack = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  }




  return (
    <>
      <Container fullWidth disableGutters sx={{ padding: "60px 20px 0px 20px", width: "100%!important", maxWidth: "none" }}>
        <Grid>
          <Typography className="pageTitle">
            Tutti i giochi {camelCaseSlug} 🎮
          </Typography>
          <p>Clicca su un gioco e scopri di più.</p>
        </Grid>
      </Container>
      <Container fullWidth disableGutters sx={{ padding: "20px 20px 40px 20px" }}>
        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {loading && (
          <CircularProgress color="secondary" />
        )}

        <Grid container spacing={2} alignItems="stretch" maxWidth="none" sx={{marginBottom:'40px'}}>
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

export default Genere;