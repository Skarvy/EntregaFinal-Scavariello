import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

// La función Item recibe un objeto "item" como propiedad y lo utiliza para renderizar un elemento en la interfaz
export default function Item({ item }) {
  const navigate = useNavigate();

  return (
    // Card es un componente de Material-UI que representa una tarjeta con contenido
    <Card
      key={item.id} // Clave única para identificar la tarjeta, generalmente se utiliza la propiedad "id" del elemento
     sx={{
        margin: '15px',
        padding: '20px',
        width: '300px',
        textAlign: 'center',
        height: '400px', 
        display: 'flex',
        flexDirection: 'column', 
      }}
    >
      {/* CardMedia es un componente de Material-UI para mostrar contenido multimedia dentro de la tarjeta */}
      <CardMedia
        // Al hacer clic en la imagen, navega a la página de detalles del artículo
        onClick={() => navigate(`/item/${item.id}`)}
        component="img"
        alt={item.title}
        height="140"
        image={item.image}
        style={{ objectFit: 'contain' }} // Establece el estilo de ajuste del objeto en la imagen
      />
      <Divider   />
      {/* CardContent es un componente de Material-UI para el contenido dentro de la tarjeta */}
      <CardContent sx={{ overflow: 'auto', flex: 1 }}>
        {/* Typography es un componente de Material-UI para mostrar texto */}
        <Typography variant="h7" sx={{ padding: '10px 0' }}>
          {item.title}
        </Typography>
        <Typography variant="h6"  sx={{padding:1, fontWeight:"bold"}}>${item.price}</Typography>
      </CardContent>
      {/* Button es un componente de Material-UI para representar un botón */}
      <Button
        // Al hacer clic en el botón, navega a la página de detalles del artículo
        endIcon={<ShortcutIcon />}
        onClick={() => navigate(`/item/${item.id}`)}
        variant="contained"
        sx={{marginTop:0}}
      >
        Detalles
      </Button>
    </Card>
  );
}
