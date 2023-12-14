import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh" // Ajusta la altura como desees
      >
        <Typography variant="h4" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          Lo sentimos, la página que estás buscando no existe.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Volver a Home
        </Button>
      </Box>
    </Container>
  );
};

export default Error404;
