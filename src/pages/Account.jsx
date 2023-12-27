import React, { useEffect, useContext, useState } from 'react';
import { Container, Typography, Grid, Button, TextField, List, ListItem, ListItemText, Divider } from '@mui/material';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImage';
import formatMessageDate from '../utils/formatMessageDate';

function Account() {
  const { session } = useContext(AppContext);
  const { profile, loading } = useProfile();
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
            <img
              src={profile && getProfileImg(profile.avatar_url)}
              alt="profile"
              width={200}
            />
                        <details>
              <summary>Le tue Reviews</summary>
              <List>
                {comments.map((c) => (
                  <React.Fragment key={c.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={c.comment_title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {c.comment_content}
                            </Typography>
                            <div>
                              <Typography component="span" variant="body2" color="text.primary">
                                Published by: {c.profile.username}
                              </Typography>
                              <Typography component="span" variant="body2" color="text.primary">
                                {formatMessageDate(c.created_at)}
                              </Typography>
                            </div>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider/>
                  </React.Fragment>
                ))}
              </List>
            </details>

            <details>
              <summary>I tuoi Preferiti</summary>
              <List>
                {favorites.map((favGame) => (
                  <ListItem key={favGame.id}>
                    <ListItemText primary={favGame.game_name} />
                  </ListItem>
                ))}
              </List>
            </details>

          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Account;
