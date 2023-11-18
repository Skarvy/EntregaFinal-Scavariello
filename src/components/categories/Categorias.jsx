import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    id: 1,
    image: 'https://gridaxis.in/products/demo/ecommerce/wp-content/uploads/2020/04/electronic-devices.jpg',
    alt: 'electronics ',
    title: 'Electronics',
    description: 'Electronic Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, officiis nulla. Numquam, aliquid rem ab mollitia possimus deserunt quam fugiat asperiores debitis quisquam ipsum delectus voluptas nam voluptatibus facilis recusandae!'
  },
  {
    id: 2,
    image: 'https://elorfebrejoyas.com.ar/wp-content/uploads/2022/04/joyeriasostenible-t.jpg',
    alt: 'jewelery',
    title: 'jewelery',
    description: 'jewelery Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, officiis nulla. Numquam, aliquid rem ab mollitia possimus deserunt quam fugiat asperiores debitis quisquam ipsum delectus voluptas nam voluptatibus facilis recusandae!'
  },
  {
    id: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQySSwYVU_HeqKoozuIImaa5Xr9rwF50owjE07Feb-4oLUX11QNUgaYfRC1G3K45JpORkQ&usqp=CAU',
    alt: "men's clothing",
    title: "men's clothing",
    description: 'men s clothing Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, officiis nulla. Numquam, aliquid rem ab mollitia possimus deserunt quam fugiat asperiores debitis quisquam ipsum delectus voluptas nam voluptatibus facilis recusandae!'
  },
  {
    id: 4,
    image: 'https://style.shockvisual.net/wp-content/uploads/2022/10/flat-lay-of-female-summer-outfit-pink-pastel-color-2022-08-01-03-44-38-utc-min.jpg',
    alt: "women's clothing",
    title: "women's clothing",
    description: 'womens clothing Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, officiis nulla. Numquam, aliquid rem ab mollitia possimus deserunt quam fugiat asperiores debitis quisquam ipsum delectus voluptas nam voluptatibus facilis recusandae!'
  }
];

export default function ActionAreaCard() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} sx={{ margin: 5 }}>
      {cardData.map(card => (
        <Grid key={card.id} item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => navigate(`/categorias/${card.title.toLowerCase()}`)}>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.alt}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
