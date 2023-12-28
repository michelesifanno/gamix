import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert, Button } from "@mui/material";
import getPlatforms from "../utils/getPlatforms";
import Platform from "../components/Platform";
import 'swiper/css';
import 'swiper/css/navigation';



function Piattaforme() {


  const [currentPage, setCurrentPage] = useState(1);
  const { platforms, error, loading } = getPlatforms(currentPage);

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
            Scegli per piattaforma 🖥️
          </Typography>
          <p>Clicca sulla singola piattaforma e scopri di più.</p>
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
          {platforms &&
            platforms.map((platform) => (
              <Platform platform={platform}/>
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

export default Piattaforme;