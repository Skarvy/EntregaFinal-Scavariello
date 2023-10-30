import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';


export default function CartWidget() {
  return (
    <Button sx={{color:'white',border:"none"}} variant="outlined" startIcon={<ShoppingCartIcon />}>
  1
</Button>
  )
}
