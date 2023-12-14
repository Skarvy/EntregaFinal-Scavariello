import React from 'react';
import UserOrders from './UserOrders';

import { Container, CssBaseline, Grid } from '@mui/material';

export default function UserContainer() {
  return (
    <Container component="main" >
      <CssBaseline />
      <Grid container spacing={2} alignItems="stretch" justifyContent="center">
          <Grid item xs={12} md={6} lg={8}>
          <UserOrders />
        </Grid>
      </Grid>
    </Container>
  );
}
