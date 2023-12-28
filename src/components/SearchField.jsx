import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase, IconButton, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Esegui il redirect alla pagina di ricerca con la query come parametro
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('')
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: '10px', backgroundColor: '#ffffff14' }}>
      <IconButton onClick={handleSearch} sx={{ p: '10px' }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Cerca..."
        inputProps={{ 'aria-label': 'cerca' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleKeyUp} // Cattura il tasto Enter
        sx={{ flex: 1 }}
        />
      <Button onClick={handleSearch} sx={{ p: '10px' }} className='buttonCerca' variant='contained' color='primary'>
        Cerca
      </Button>
    </Paper>
  );
};

export default SearchField;
