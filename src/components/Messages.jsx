import React, { useEffect, useRef, useState, useContext } from 'react';
import { Paper, Typography, Avatar, Box, Drawer, Button, TextField } from '@mui/material';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import useProfile from '../hooks/useProfile';
import AppContext from '../context/AppContext';

function Messages({ game }) {
  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const [chat, setChat] = useState([]);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const chatRef = useRef(null);

  const getMessages = async () => {
    try {
      console.log('Fetching messages...');
      const { data, error } = await supabase
        .from('messages')
        .select('*, profile: profiles(username)')
        .eq('game_id', game.id);

      if (error) {
        throw new Error(error.message);
      }

      const chatData = data || [];

      setChat(chatData);
      setError(null); // Resetta eventuali errori precedenti
    } catch (error) {
      console.error(error.message);
      setError(error.message); // Imposta l'errore nello stato
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const scrollChatToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    getMessages();
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        () => getMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [game]);

  useEffect(() => {
    scrollChatToBottom();
  }, [chat]);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputForm = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputForm));
    if (typeof message === 'string' && message.trim().length !== 0) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            profile_id: session.user.id,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        inputForm.reset();
        console.log(data);
        scrollChatToBottom(); // Scroll to bottom after sending a message
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Button
        variant="contained"
        color="tertiary"
        size="large"
        onClick={toggleDrawer}
        sx={{ width: '100%' }}
        endIcon={<ChatBubbleTwoToneIcon />}
      >
        Chat
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 400, padding: '20px' }}>
          {/* Il contenuto della chat */}
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
          <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
            Chat message with gamers
          </Typography>

          <div style={{ height: '80vh', overflowY: 'scroll', paddingBottom: '20px' }} ref={chatRef}>
            {chat.length > 0 ? (
              chat.map((message) => (
                <Paper
                  key={message.id}
                  elevation={3}
                  style={{ padding: '10px', marginBottom: '10px' }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar src={message.profile?.avatar_url} alt="Profile Avatar" sx={{ height: '20px', width: '20px' }} />
                    <Box marginLeft={1}>
                      <Typography variant="subtitle1" sx={{ fontSize: '14px' }}>
                        {message.profile?.username}
                      </Typography>
                    </Box>
                  </Box>
                  <div>
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption">
                      {formatMessageDate(message.created_at)}
                    </Typography>
                  </div>
                </Paper>
              ))
            ) : (
              <Typography variant="caption">Nessun messaggio disponibile.</Typography>
            )}
          </div>
          <form onSubmit={handleMessageSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="text"
              name="message"
              placeholder="Type your message..."
              fullWidth
              variant="outlined"
              style={{ marginRight: '8px' }}
            />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ padding: '16px' }}>
              <SendTwoToneIcon />
            </Button>
          </form>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Messages;
