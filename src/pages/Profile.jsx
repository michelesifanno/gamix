import { useState, useEffect, useContext } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import supabase from '../supabase/client';
import AppContext from '../context/AppContext';
import Avatar from '../components/Avatar';

export default function Settings() {
  const { session } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }

    setLoading(false);
  }

  return (
    <>
      <Container fullWidth disableGutters sx={{ padding: "60px 20px 0px 20px", width: "100%!important", maxWidth: "none", minHeight:"100vh" }}>
        <Grid>
          <Typography className="pageTitle">
            Il tuo profilo ✨
          </Typography>
          <p>Aggiorna le informazioni del tuo profilo.</p>
        </Grid>
      </Container>

      <Container fullWidth disableGutters sx={{ padding: "20px 20px 40px 20px" }}>
        <form onSubmit={(e) => updateProfile(e, avatar_url)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(e, url) => {
                  updateProfile(e, url);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                id="first_name"
                name="first_name"
                placeholder="First name"
                value={first_name || ''}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <TextField
                label="Last name"
                id="last_name"
                name="last_name"
                placeholder="Last name"
                value={last_name || ''}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <TextField
                label="Email"
                id="email"
                type="text"
                value={session.user.email}
                disabled
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <TextField
                label="Username"
                id="username"
                type="text"
                required
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <Button type="submit" disabled={loading} variant="contained" sx={{ mt: 2 }}>
                {loading ? 'Loading ...' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button
          type="button"
          onClick={() => supabase.auth.signOut()}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Container>
    </>
  );
}
