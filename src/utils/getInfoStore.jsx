import { useState, useEffect } from 'react';

function getInfoStore(slug) {

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  useEffect(() => {

    async function getData() {
      setLoading(true);
      setError(''); 
      setData([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}stores/${slug}?key=${import.meta.env.VITE_API_KEY}`);
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


  return {
    store: data, 
    error, 
    loading
  };
}

export default getInfoStore;