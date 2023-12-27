import { useState, useEffect } from 'react';

function getGameByGenre(page, genre) {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(''); 
      setData([]); 
      try {
        // const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page_size=15&page=${page}`);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page_size=15&page=${page}&genres=${genre}`);

        const json = await response.json();


        if (response.ok) {
          setData(json.results); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 

    }
    getData(); 
  }, [page]); 
    
  return {
    giochi: data, 
    error, 
    loading
  };
}

export default getGameByGenre;
