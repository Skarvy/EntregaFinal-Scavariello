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
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Button startIcon={<RemoveIcon />} onClick={handleDecrement}></Button>
        </Grid>
        <Grid item>
          <Button disabled={isAddToCartDisabled}>{count}</Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            onClick={handleIncrement}
            disabled={isAddToCartDisabled || item.stock === 0}
          ></Button>
        </Grid>
        <Grid item xs={8}>
          <Button
            startIcon={
              isAddToCartDisabled ? (
                <RemoveShoppingCartIcon />
              ) : (
                <AddShoppingCartIcon />
              )
            }
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
        title={`Agregado al carro: `}
        description={`${item.title}`}
      />
    </>
  );
}
