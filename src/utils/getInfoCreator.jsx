import { useState, useEffect } from 'react';

function getInfoCreator(slug) {

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  useEffect(() => {

    async function getData() {
      setLoading(true);
      setError(''); 
      setData([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}creators/${slug}?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();


        if (response.ok) {
          setData(json); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 

    }
    getData(); 
  }, [slug]); 

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      setError(''); 
      setMovies([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}games/${slug}/movies?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();

        if (response.ok) {
          setMovies(json); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 
    }

    getMovies(); 
  }, [slug]); 


  return {
    creator: data, 
    error, 
    loading
  };
}

export default getInfoCreator;