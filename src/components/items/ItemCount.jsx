import React, { useContext, useState } from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { ShopContext } from '../../context/ShopContext';
import CustomAlert from '../errors/CustomAlert';

export default function ItemCount({ item }) {
  const { addToCart, cart } = useContext(ShopContext);
  const [count, setCount] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);

  // Función para incrementar la cantidad seleccionada
  const handleIncrement = () => {
    if (count < item.stock) {
      setCount(count + 1);
    }
  };

  // Función para decrementar la cantidad seleccionada
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Función para agregar el artículo al carrito
  const handleAddToCart = () => {
    if (count > 0) {
      addToCart(item, count);
      setCount(1); // Restablecer count después de agregar al carrito
      setAlertOpen(true);
    }
  };

  // Función para cerrar la alerta
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Determina si el botón de "Agregar al carrito" debe estar deshabilitado
  const isAddToCartDisabled =
    count === 0 ||
    count + (cart.items.find((cartItem) => cartItem.id === item.id)?.quantity || 0) >= item.stock + 1;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" mt={2}>

          {/* Botón para decrementar la cantidad */}
          <Grid item xs={3} sm={3} lg={1}>
            <Button onClick={handleDecrement} fullWidth>
              <RemoveIcon />
            </Button>
          </Grid>

          {/* Mostrar la cantidad seleccionada */}
          <Grid item xs={3} sm={3} lg={1}>
            <Button disabled={isAddToCartDisabled} fullWidth>
              {count}
            </Button>
          </Grid>

          {/* Botón para incrementar la cantidad */}
          <Grid item xs={3} sm={3} lg={1}>
            <Button
              onClick={handleIncrement}
              disabled={isAddToCartDisabled || item.stock === 0}
              fullWidth
            >
              <AddIcon />
            </Button>
          </Grid>

          {/* Botón para agregar al carrito */}
          <Grid item xs={12} sm={3} lg={9}>
            <Button
              color="success"
              variant='contained'
              startIcon={isAddToCartDisabled ? (<RemoveShoppingCartIcon />) : (<AddShoppingCartIcon />)}
              onClick={handleAddToCart}
              fullWidth
              disabled={isAddToCartDisabled}
            >
              {isAddToCartDisabled ? 'Sin stock' : 'Agregar al carro'}
            </Button>
          </Grid>

        </Grid>

        {/* Alerta personalizada para mostrar que el artículo se ha agregado al carrito */}
        <CustomAlert
          open={alertOpen}
          onClose={handleCloseAlert}
          title={`Agregado al carro:`}
          description={`${item.title}`}
        />
      </div>
    </>
  );
}
