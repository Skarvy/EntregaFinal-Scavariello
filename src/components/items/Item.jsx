import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ItemCount from './ItemCount';
import { useNavigate } from 'react-router-dom';

export default function Item({ item }) {
  const navigate = useNavigate();

  return (
    <Card key={item.id} style={{ margin: '15px', padding: '20px', maxWidth: '300px', textAlign: 'center'}}>
      <CardMedia
        onClick={() => navigate(`/item/${item.id}`)}
        component="img"
        alt={item.title}
        height="140"
        image={item.image}
        style={{ objectFit: 'contain'}}
      />
      <CardContent>
        <Typography variant="h6" style={{ padding: '10px 0' }}>
          {item.title}
        </Typography>
        <Typography variant="subtitle1">${item.price}</Typography>
      </CardContent>
      <ItemCount item={item} />
    </Card>
  );
}
