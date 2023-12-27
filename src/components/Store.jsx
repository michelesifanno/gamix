import { Card, CardMedia, Typography, Grid, Button } from "@mui/material";
import { Link } from 'react-router-dom';




function Store ({ store }) {



    return (
        <Grid item xs={12} sm={6} md={6} lg={4} key={store.id} >
            <Link to={`/negozio/${store.slug}`} className="cardLink">
                <Card>
                    <CardMedia
                        sx={{
                            height: 200, 
                            backgroundSize: 'cover', 
                            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%), url(${store.image_background})`, // Set the background image
                            padding: '40px',
                            minHeight: '400px',
                            position: 'relative',
                            alignItems: 'end',
                            display: 'grid',
                        }}
                    >
                        <div className="contentCard">
                            <Typography variant="h5" color="white" fontWeight="bold">
                                {store.name}
                            </Typography>
                            <p>Games count: {store.games_count}</p>
                        </div>
                    </CardMedia>
                </Card>
            </Link>
        </Grid >
    )
}

export default Store;