import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';


export default function CartWidget() {
  const navigate = useNavigate();
  const { cart } = useContext(ShopContext);

   // Calcular la cantidad total de elementos en el carrito
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Button sx={{ color: 'white', border: 'none' }} variant="outlined" startIcon={<ShoppingCartIcon />}
    onClick={()=> navigate("/cart")}>
      {totalQuantity}
    </Button>
  );
}
