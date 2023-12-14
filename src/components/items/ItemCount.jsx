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

  const handleIncrement = () => {
    if (count < item.stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (count > 0) {
      addToCart(item, count);
      setCount(1); // Reset count after adding to the cart
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const isAddToCartDisabled =
    count === 0 ||
    count + (cart.items.find((cartItem) => cartItem.id === item.id)?.quantity || 0) >= item.stock + 1;

  return (
    <>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
    <Grid container spacing={2} alignItems="center" justifyContent="center" mt={2}>

      <Grid item xs={3} sm={3}lg={1}>
        <Button onClick={handleDecrement} fullWidth>
          <RemoveIcon />
        </Button>
      </Grid>

      <Grid item xs={3} sm={3}lg={1}>
        <Button disabled={isAddToCartDisabled} fullWidth>
          {count}
        </Button>
      </Grid>

      <Grid item xs={3} sm={3}lg={1}>
        <Button
          onClick={handleIncrement}
          disabled={isAddToCartDisabled || item.stock === 0}
          fullWidth
        >
          <AddIcon />
        </Button>
      </Grid>

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
