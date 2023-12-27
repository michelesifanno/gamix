import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getInfoCreator from '../utils/getInfoCreator';
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
} from "@mui/material";

function Creatore() {

    const createMarkup = (html) => ({ __html: html });

    const { slug } = useParams();
    const { creator, error, loading } = getInfoCreator(slug);

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

    if (!creator) {
        return (
            <Container maxWidth="xl" disableGutters>
                <Alert severity="warning">Dettagli del creatore non disponibili.</Alert>
            </Container>
        );
    }

    return (
        <>
            <Box
                sx={{
                    padding: '0px 0px 20px 0px',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${creator.image})`,
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
                            {creator.name}
                        </Typography>
                        <div dangerouslySetInnerHTML={createMarkup(creator.description)} />
                        <Typography variant='body1' paragraph sx={{ marginTop: '16px' }}>
                            <strong>Numero di giochi creati:</strong>
                            <br />
                            {creator.games_count}
                        </Typography>
                        <Divider />
                        <Typography variant='body1' paragraph sx={{ marginTop: '16px' }}>
              <strong>Posizioni ricoperte:</strong>
              <br />
              {creator.positions && creator.positions.length > 0
                ? creator.positions.map((position) => position.name).join(', ')
                : 'Nessuna posizione disponibile'}
            </Typography>
                    </Grid>
                    <Grid item sx={12} sm={12} md={6} lg={6} p={8}>
                        <Card sx={{
                            backgroundColor: '#0000',
                        }}>
                            <CardMedia
                                component="img"
                                src={creator.image}
                                title={`Immagine del creatore`}
                                className="creatorImage"
                                sx={{ minHeight: '100vh' }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Creatore;
