import { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { useLocation } from 'react-router-dom'; // Importa useLocation da react-router-dom
import getGames from "../utils/getGames";
import Game from "../components/Game";
import useDebouceSearch from '../hooks/useDebouceSearch';

function Search() {
  const location = useLocation(); // Ottieni l'oggetto di posizione
  const query = new URLSearchParams(location.search).get('query'); // Ottieni la query dai parametri della stringa di query

  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1);

  // uso l'hook
  const debouncedSearch = useDebouceSearch(query);

  useEffect(() => {
    setGames([]);
    setError('');
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${pagination}&page_size=20&search=${debouncedSearch}`
        );

        if (response.ok) {
          const json = await response.json();
          setGames(json.results);
        } else {
          setError('Ops, Riprova la tua API...');
        }
      } catch (error) {
        setError('Ops, Riprova con un altra url ', error.message);
      }

      setLoading(false);
    }

    fetchData();
  }, [debouncedSearch, pagination]);

  return (
    <>
      <Container sx={{ padding: '80px 0px 20px 0px' }}>
        <Grid>
          <Typography className="pageTitle">
            🔎 Ricerca per: "{query}"
          </Typography>
          {/* Aggiungi qui il conteggio dei risultati di ricerca */}
        </Grid>
      </Container>
      <Container sx={{ padding: '0px 0px 40px 0px' }}>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <CircularProgress color="secondary" />}
        <Grid container spacing={3} alignItems="stretch">
          {games.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Search;
