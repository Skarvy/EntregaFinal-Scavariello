import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ItemList from './itemlist';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/client';

export default function ItemListContainer() {
  // Obtenemos el parámetro 'id' de la URL
  const { id } = useParams();

  // Estado para almacenar los datos y controlar el estado de carga
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función asíncrona para obtener datos de Firebase
    const fetchData = async () => {
      try {
        // Referencia a la colección 'productos' en Firestore
        const productosRef = collection(db, 'productos');

        // Si hay un ID en los parámetros, filtramos por la categoría correspondiente
        const q = id ? query(productosRef, where('categoria', '==', id)) : productosRef;

        // Obtenemos los documentos de la consulta
        const snapshot = await getDocs(q);

        // Mapeamos los documentos a un array de objetos y actualizamos el estado
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        // Indicamos que la carga ha terminado
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
      }
    };

    // Llamamos a la función para obtener datos
    fetchData();
  }, [id]);

  return (
    <>
      {/* Contenedor principal */}
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {/* Título según la existencia del parámetro 'id' */}
        {id ? <h1>{id}</h1> : <h1>Nuevos Productos</h1>}

        {/* Mostramos un mensaje de carga o la lista de productos */}
        {loading ? (
          <CircularProgress/>

        ) : (
          <ItemList data={data} />
        )}
      </Box>
    </>
  );
}
