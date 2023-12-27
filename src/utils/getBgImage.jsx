import { useState, useEffect } from 'react';

function GetBgImage () {
  const [bgimage, setBgImg] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const randomImg = Math.floor(Math.random() * 859398);

  useEffect(() => {
    async function getBgImg() {
      setLoading(true);
      setError(''); 
      setBgImg([]); 
      try {
        // const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${randomImg}?key=${import.meta.env.VITE_API_KEY}`);
        const response = await fetch (`${import.meta.env.VITE_BASE_URL}games/${randomImg}?key=${import.meta.env.VITE_API_KEY}`);
        const json = await response.json();

        if (response.ok) {
          setBgImg(json.background_image); 
        } else {
          setError(`Errore nella richiesta, correggi api end-point`); 
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message}`); 
      }
      setLoading(false); 
    }
    getBgImg(); 
  }, []); 
    
  return {
    bgimage, 
    error, 
    loading
  };
}

export default GetBgImage;
