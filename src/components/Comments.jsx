import React, { useEffect, useState, useContext } from 'react';
import { Paper, Typography, Avatar, Box, Drawer, Button, TextField, Divider } from '@mui/material';
import supabase from '../supabase/client';
import formatMessageDate from '../utils/formatMessageDate';
import useProfile from '../hooks/useProfile';
import AppContext from '../context/AppContext';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

function Comments({ game }) {
    const { session } = useContext(AppContext);
    const { profile } = useProfile();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(true);

    useEffect(() => {
        const getComments = async () => {
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*, profile: profiles(username)')
                    .eq('game_id', game.id);

                if (error) {
                    throw new Error(error.message);
                }

                const commentsData = data || [];

                setComments(commentsData);
                setError(null);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        };

        getComments();
    }, [game.id]);

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const reviewForm = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(reviewForm));

        if (typeof title === 'string' && typeof content === 'string' && title.trim().length !== 0 && content.trim().length !== 0) {
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .insert([
                        {
                            game_id: game.id,
                            game_name: game.name,
                            comment_title: title,
                            comment_content: content,
                            profile_id: session.user.id,
                        },
                    ])
                    .select();

                if (error) {
                    throw new Error(error.message);
                }

                reviewForm.reset();
                setComments([...comments, data[0]]);
                setError(null);
                setIsReviewFormVisible(false);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={toggleDrawer}
                sx={{ width: '100%' }}
                endIcon={<StarTwoToneIcon />}
            >
                Reviews
            </Button>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                ModalProps={{ keepMounted: true }}
            >
                <Box sx={{ width: 400, padding: '20px' }}>
                    {error && (
                        <Typography variant="caption" color="error">
                            {error}
                        </Typography>
                    )}
                    <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                        {game.name} Reviews
                    </Typography>

                    {comments.map((comment) => (
                        <Paper key={comment.id} elevation={3} sx={{ padding: '10px', marginBottom: '10px' }}>
                            <div>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{comment.comment_title}</Typography>
                                <Typography variant="body1">{comment.comment_content}</Typography>
                                <Typography variant="caption">
                                    Published at: {formatMessageDate(comment.created_at, 'dd/MM/yyyy')}
                                </Typography>
                            </div>
                            <Divider />
                            <Box display="flex" alignItems="center">
                                <Avatar src={comment.profile?.avatar_url} alt="Profile Avatar" sx={{ width: 15, height: 15, marginRight: 1 }} />
                                <Typography variant="subtitle1" sx={{ fontSize: '14px' }}>{comment.profile?.username}</Typography>
                            </Box>
                        </Paper>
                    ))}
                    {session && profile && isReviewFormVisible && (
                        <form onSubmit={handleReviewSubmit} style={{ marginTop: '20px' }}>
                            <Typography variant="h6">Add a Review</Typography>
                            <TextField
                                type="text"
                                name="title"
                                placeholder="Review Title"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                type="text"
                                name="content"
                                placeholder="Write your review here..."
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" size="large" sx={{ marginTop: '16px' }}>
                                Publish Review
                            </Button>
                        </form>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
}

export default Comments;
