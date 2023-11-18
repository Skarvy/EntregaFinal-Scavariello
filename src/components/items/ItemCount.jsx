import {Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useState } from "react";


export default function ItemCount({ stock, onAdd }) {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count < stock) {
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
      onAdd(count);
      setCount(0); // 
    }
  };

  return (
<Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <Button startIcon={<RemoveIcon />} onClick={handleDecrement}></Button>
      </Grid>
      <Grid item>
        <Button>{count}</Button>
      </Grid>
      <Grid item>
        <Button startIcon={<AddIcon />} onClick={handleIncrement}></Button>
      </Grid>

      {/* Agregamos una nueva fila para el botón "Agregar al carro" */}
      <Grid item xs={8}>
        <Button
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          fullWidth
        >
          Agregar al carro
        </Button>
      </Grid>
    </Grid>
  );
}
