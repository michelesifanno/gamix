import React, { useEffect, useContext, useState } from 'react';
import { Container, Typography, Grid, Avatar, List, ListItem, ListItemText, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImage';
import formatMessageDate from '../utils/formatMessageDate';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function Account() {
  const { session } = useContext(AppContext);
  const { profile, loading } = useProfile();
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);


  const getFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('profile_id', session.user.id);

      if (error) {
        alert(error.message);
      } else {
        setFavorites(data);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const getComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profile: profiles(username)')
      .eq('profile_id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('profile_id', session.user.id);
      if (error) {
        alert(error.message);
      } else {
        setComments(data);
      }
    };

    getComments();
  }, [session.user.id]);

  useEffect(() => {
    const getFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('profile_id', session.user.id);
      if (error) {
        alert(error.message);
      } else {
        setFavorites(data);
      }
    };

    getFavorites();
  }, [session.user.id]);

  const removeFromFavorites = async (gameId) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('game_id', gameId)
        .eq('profile_id', session.user.id);

      if (error) {
        console.error(error);
        alert(error.message);
      } else {
        console.log('Favorito rimosso con successo!');
        // Aggiorna la lista dei preferiti dopo la rimozione
        getFavorites();
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const removeComments = async (gameId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('game_id', gameId)
        .eq('profile_id', session.user.id);

      if (error) {
        console.error(error);
        alert(error.message);
      } else {
        console.log('Commento rimosso con successo!');
        // Aggiorna la lista dei preferiti dopo la rimozione
        getComments();
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Container fullWidth disableGutters sx={{ padding: "60px 20px 0px 20px", width: "100%!important", maxWidth: "none" }}>
      <Grid>
        <Typography className="pageTitle">
          Benvenuto {profile && (profile.username || session.user.user_metadata.full_name)} ✨
        </Typography>
      </Grid>
      <Container fullWidth disableGutters sx={{ padding: "20px 20px 40px 20px" }}>
        {loading && <progress />}
        <Grid container>
          <Grid item xs={12}>
            <Avatar
              alt="profile"
              src={profile && getProfileImg(profile.avatar_url)}
              sx={{ width: 200, height: 200, marginBottom: '20px' }}
            />
            <br />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Le tue Reviews</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {comments.map((c) => (
                    <React.Fragment key={c.id}>
                      <ListItem alignItems="flex-start" style={{ marginBottom: '15px' }}>
                        <ListItemText
                          primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>{c.comment_title}</Typography>}
                          secondary={
                            <>
                              <Typography
                                component="div"
                                variant="body1"
                                color="text.primary"
                                style={{ marginBottom: '8px' }}
                              >
                                {c.comment_content}
                              </Typography>
                              <div>
                                <Typography component="span" variant="body2" color="text.primary">
                                  Pubblicato da: {c.profile.username}
                                </Typography>
                                <Typography component="span" variant="body2" color="text.primary" style={{ marginLeft: '10px' }}>
                                  {formatMessageDate(c.created_at)}
                                </Typography>
                              </div>
                              <DeleteTwoToneIcon color='red' onClick={() => removeComments(c.game_id)} />

                            </>
                          }
                        />
                      </ListItem>
                      <Divider style={{ backgroundColor: '#ccc' }}/>
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>I tuoi Preferiti</Typography>
              </AccordionSummary>
              <AccordionDetails>
        <List>
          {favorites.map((favGame) => (
            <React.Fragment key={favGame.id}>
              <ListItem style={{ marginBottom: '10px' }}>
                <ListItemText
                  primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {favGame.game_name}
                  </Typography>}
                />
                <DeleteTwoToneIcon color='red' onClick={() => removeFromFavorites(favGame.game_id)} />
              </ListItem>
              <Divider style={{ backgroundColor: '#ccc' }} />
            </React.Fragment>
          ))}
        </List>
      </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Account;
