/* eslint-disable camelcase */
import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';

function useProfile() {
  const { session } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
    
        // Verifica se la sessione e l'utente sono definiti prima di richiedere il profilo
        if (session && session.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select(`*, favorites: favorites(*)`)
            .eq('id', session.user.id)
            .single();
    
          if (isMounted) {
            if (error) {
              console.error('Errore nel recupero del profilo:', error.message);
            } else if (data) {
              setProfile(data);
            }
            setLoading(false);
          }
        } else {
          // Gestisci il caso in cui la sessione o l'utente non sono definiti
          if (isMounted) {
            setProfile(null);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Errore generale:', error.message);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [session]);

  return {
    profile,
    loading,
  };
}

export default useProfile;
