import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ItemList from './itemlist';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/client';

export default function ItemListContainer() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productosRef = collection(db, 'productos');

    // Si hay un ID en los parámetros, filtramos por la categoría correspondiente
    const q = id
      ? query(productosRef, where('categoria', '==', id))
      : productosRef;

    getDocs(q)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [id]); // Agregamos 'id' a la lista de dependencias para que se vuelva a cargar cuando cambie

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '100%',
          
          alignItems: 'center'
        }}
      >
        {id ? <h1>{id}</h1> : <h1>Nuevos Productos</h1>}
        <ItemList data={data} loading={loading} />
      </Box>      
    </>
  );
}
