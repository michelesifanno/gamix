import { useState, useEffect } from 'react';

function getInfoGame(slug) {

  const [data, setData] = useState([]); 
  const [movies, setMovies] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stores, setStores] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  useEffect(() => {

    async function getData() {
      setLoading(true);
      setError(''); 
      setData([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}games/${slug}?key=${import.meta.env.VITE_API_KEY}`);
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


  useEffect(() => {
    async function getAchievements() {
      setLoading(true);
      setError(''); 
      setAchievements([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}games/${slug}/achievements?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();

        if (response.ok) {
          setAchievements(json); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 
    }

    getAchievements(); 
  }, [slug]); 

  useEffect(() => {
    async function getStores() {
      setLoading(true);
      setError(''); 
      setStores([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}games/${slug}/stores?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();

        if (response.ok) {
          setStores(json); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 
    }

    getStores(); 
  }, [slug]); 

  
  useEffect(() => {
    async function getScreenshots() {
      setLoading(true);
      setError(''); 
      setScreenshots([]); 
      try {        

        const response = await fetch (`${import.meta.env.VITE_BASE_URL}games/${slug}/screenshots?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();

        if (response.ok) {
          setScreenshots(json); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 
    }

    getScreenshots(); 
  }, [slug]); 

  // Restituzione di tutte le informazioni richieste
  return {
    game: data, 
    screenshots,
    error, 
    loading
  };
}

export default getInfoGame;