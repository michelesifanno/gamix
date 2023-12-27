import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getInfoStore from '../utils/getInfoStore';
import {
    Container,
    Grid,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Card,
    CardMedia,
    Divider,
    Button
} from "@mui/material";

function Negozio() {

    const createMarkup = (html) => ({ __html: html });

    const { slug } = useParams();
    const { store, error, loading } = getInfoStore(slug);

    if (loading) {
        return (
            <Container maxWidth="xl" disableGutters>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" disableGutters>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!store) {
        return (
            <Container maxWidth="xl" disableGutters>
                <Alert severity="warning">Dettagli del negozio non disponibili.</Alert>
            </Container>
        );
    }

    return (
        <>
            <Box
                sx={{
                    padding: '0px 0px 20px 0px',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${store.image_background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    minHeight: '100vh',
                    width: '100%',
                }}
            >
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item sx={12} sm={12} md={6} lg={6} p={8}>
                        <Typography className="pageTitle">
                            {store.name}
                        </Typography>
                        <div dangerouslySetInnerHTML={createMarkup(store.description)} />
                        <Typography variant='body1' paragraph sx={{ marginTop: '16px' }}>
                            <strong>Numero di giochi disponibili:</strong>
                            <br />
                            {store.games_count}
                        </Typography>
                        <Button variant='contained' href={`https://${store.domain}`} target="_blank">Vai al sito web</Button>

                    </Grid>
                    <Grid item sx={12} sm={12} md={6} lg={6} p={8}>
                        <Card sx={{
                            backgroundColor: '#0000',
                        }}>
                            <CardMedia
                                component="img"
                                src={store.image_background}
                                title={`Immagine store`}
                                className="storeImage"
                                sx={{ minHeight: '100vh' }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Negozio;
