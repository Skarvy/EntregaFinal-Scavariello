import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';
import ItemList from './itemlist';

export default function ItemListContainer() {
  const { id } = useParams();  // 
  const [data, setData] = useState([]);

  useEffect(() => {
    if (id){fetch(`https://fakestoreapi.com/products/category/${id}`)
    .then((response) => response.json())
    .then((result) => setData(result));}
    else{fetch(`https://fakestoreapi.com/products`)
    .then((response) => response.json())
    .then((result) => setData(result));
    }    
  }, [id]);
  

  return (
    <>
   <Box sx={{      
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection:"column",
      flexWrap: 'wrap',
     width: '100%', 
     margin: 3,
}}>
  {id ? <h1>{id}</h1> : <h1>Nuevos Productos</h1>}
  <ItemList data={data} />
</Box>
</>
  );}
