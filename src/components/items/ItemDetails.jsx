import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import ItemCount from './ItemCount';

export default function ItemDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((result) => setData(result));
  }, [id]);

  return (
    <>
    <Box
      key={data.id}
      sx={{
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection:"column",
      flexWrap: 'wrap',
      width: '100%', 
      margin: 1,
    }}> 
      <h2>{data.title}</h2>
      <img width={300} src={data.image} alt={data.title} />
      <p>{data.description}</p>
      <Typography variant="subtitle1">${data.price}</Typography>
     
    </Box>
    <ItemCount stock={5} />
    </>
      
   
  );
}

