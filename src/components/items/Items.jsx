
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ItemCount from './ItemCount';
import RedoIcon from '@mui/icons-material/Redo';
import { useNavigate } from 'react-router-dom';

export default function Item({ item }) {
  const navigate = useNavigate()

  return (
    <Card  key={item.id} style={{ margin: '15px', maxWidth: '300px', textAlign: 'center' }}>
    <CardMedia onClick={()=>navigate(`/item/${item.id}`)}
      component="img"
      alt={item.title}
      height="140"
      image={item.image}
    />
    <CardContent >
      <Typography variant="h6">{item.title}</Typography>
      <Typography variant="subtitle1">${item.price}</Typography>
    </CardContent>
    <Button onClick={()=>navigate(`/item/${item.id}`)} endIcon={<RedoIcon/>}
    variant="contained"
    sx={{margin:1}}
    >Detalles</Button>
    <ItemCount stock={5} />
  </Card>
);
}