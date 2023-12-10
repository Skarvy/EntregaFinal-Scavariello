import React, { useContext } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { ShopContext } from '../../context/ShopContext';

const UserInfo = () => {
  const { cart } = useContext(ShopContext);
  const buyer = cart.buyer || {};

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', maxWidth: '800px' }}>
      <Typography variant="h5" gutterBottom>
        User Information
      </Typography>

      <Box>
        <Typography variant="body2">
          Name: {buyer.name || 'N/A'}<br />
          Phone: {buyer.phone || 'N/A'}<br />
          Email: {buyer.email || 'N/A'}
        </Typography>
        {/* Puedes agregar más campos según sea necesario */}
      </Box>
    </Paper>
  );
};

export default UserInfo;
