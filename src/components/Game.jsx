import { Card, CardMedia, CardContent, Typography, Grid, Button } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';




function Game({ game }) {

    const location = useLocation();


    return (
        <Grid item xs={12} sm={6} md={6} lg={4} key={game.id} >
            <Link to={`/gioco/${game.slug}`} className="cardLink">
                <Card>
                    <CardMedia
                        sx={{
                            height: 200, // Set the height of the CardMedia
                            backgroundSize: 'cover', // Make sure the background image covers the entire area
                            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%), url(${game.background_image})`, // Set the background image
                            padding: '40px',
                            minHeight: '400px',
                            position: 'relative',
                            alignItems: 'end',
                            display: 'grid',
                        }}
                    >
                        <div className="contentCard">
                            <Typography variant="h5" color="white" fontWeight="bold">
                                {game.name}
                            </Typography>
                            <p>{game.genres.map((genre) => genre.name).join(', ')}</p>

                            {location.pathname == '/migliori' ? (
                                <p>{game.rating} ⭐️</p>
                            ) : (null)}

                            {location.pathname == '/nuove-uscite' ? (
                                <p>🗓️ {game.released}</p>
                            ) : (null)}
                        </div>
                    </CardMedia>
                </Card>
            </Link>
        </Grid >
    )
}

export default Game;