import React from 'react';
import UserOrders from './UserOrders';
import UserInfo from './UserInfo';
import { Box, Container } from '@mui/material';

export default function UserContainer() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <UserInfo />
        <UserOrders />
      </Box>
    </Container>
  );
}
