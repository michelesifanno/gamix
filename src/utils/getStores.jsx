import { useState, useEffect } from 'react';

function getGames() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(''); 
      setData([]); 
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}stores?key=${import.meta.env.VITE_API_KEY}`);

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
  }, []); 
    
  return {
    stores: data, 
    error, 
    loading
  };
}

export default getGames;
