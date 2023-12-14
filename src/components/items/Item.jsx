import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import ItemCount from './ItemCount';
import { useNavigate } from 'react-router-dom';

export default function Item({ item }) {
  const navigate = useNavigate();

  return (
    <Card
      key={item.id}
      style={{
        margin: '15px',
        padding: '20px',
        width: '300px',
        textAlign: 'center',
        height: '400px', // Establece la altura fija aquí
        display: 'flex',
        flexDirection: 'column', // Asegura que los elementos dentro se coloquen en una columna
      }}
    >
      <CardMedia
        onClick={() => navigate(`/item/${item.id}`)}
        component="img"
        alt={item.title}
        height="140"
        image={item.image}
        style={{ objectFit: 'contain' }}
      />
      <CardContent style={{ overflow: 'auto', flex: 1 }}>
        <Typography variant="h7" style={{ padding: '10px 0' }}>
          {item.title}
        </Typography>
        <Typography variant="subtitle1">${item.price}</Typography>
      </CardContent>
      <Button
        endIcon={<ShortcutIcon />}
        onClick={() => navigate(`/item/${item.id}`)}
        variant="contained"
      >
        Detalles
      </Button>
    </Card>
  );
}
