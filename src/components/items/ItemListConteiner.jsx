import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ItemList from './itemlist';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../../firebase/client';

export default function ItemListContainer() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRef = collection(db, 'productos');

        let q;

        // Si hay un ID en los parámetros, filtramos por la categoría correspondiente
        if (id) {
          q = query(productosRef, where('categoria', '==', id));
        } else {
          // Si no hay un ID, limitamos la consulta a 10 documentos
          q = query(productosRef, limit(10));
        }

        const snapshot = await getDocs(q);

        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Ocurrió un error al obtener los datos. Estamos trabajando para resolverlo.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Box 
        variant="main"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {id ? <h1>{id}</h1> : <h1>Nuevos Productos</h1>}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error ? (
              <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>
            ) : (
              <ItemList data={data} />
            )}
          </>
        )}
      </Box>
    </>
  );
}
