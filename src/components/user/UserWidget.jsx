import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ShopContext } from '../../context/ShopContext';

export default function UserWidget() {
  const navigate = useNavigate();
  const { cart } = useContext(ShopContext);

  // Verificar si cart.buyer tiene información
  const isBuyerInfoAvailable = cart.buyer && Object.keys(cart.buyer).length > 0;

  return (
    // Renderizar el componente solo si hay información del comprador
    isBuyerInfoAvailable && (
      <Button sx={{ color: 'white', border: 'none' }} variant="outlined" onClick={() => navigate("/user")}>
        <AccountBoxIcon />
      </Button>
    )
  );
}
