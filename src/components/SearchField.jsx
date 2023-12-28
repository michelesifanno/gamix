import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { InputBase, IconButton, Paper, List, ListItem, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Simuliamo una chiamata API con un timeout (sostituisci con la tua chiamata effettiva)
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=1&page_size=5&search=${query}`
        );

        if (response.ok) {
          const json = await response.json();
          setSearchResults(json.results);
        } else {
          console.error('Errore nella chiamata API');
        }
      } catch (error) {
        console.error('Errore nella chiamata API', error);
      }
    }, 500); // Aggiunto un ritardo di 500ms per simulare il debounce
  };

  const handleSearch = () => {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#ffffff14',
        position: 'relative',
      }}
    >
      <IconButton sx={{ p: '10px' }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Cerca..."
        inputProps={{ 'aria-label': 'cerca' }}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{ flex: 1 }}
      />

      {searchResults.length > 0 && (
        <List
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: '#121212',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {searchResults.map((result) => (
            <ListItem key={result.id}>
              <Link
                onClick={handleSearch}
                component={RouterLink}
                to={`/gioco/${result.slug}`}
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                {result.name}
              </Link>
            </ListItem>
          ))}
        </List>
      )}

      <IconButton onClick={handleSearch} sx={{ p: '10px' }} className="buttonCerca">
        Cerca
      </IconButton>
    </Paper>
  );
};

export default SearchField;
