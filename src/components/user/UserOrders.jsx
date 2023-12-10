import React, { useState, useEffect, useContext } from 'react';
import { Paper, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase/client';
import { ShopContext } from '../../context/ShopContext';

const UserOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { cart } = useContext(ShopContext);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userEmail = cart.buyer.email;

      try {
        const q = query(collection(db, 'orders'), where('buyer.email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Ordena las órdenes por fecha de pedido de forma descendente
        orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

        setUserOrders(orders);
      } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
      }
    };

    fetchUserOrders();
  }, [cart]);

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', maxWidth: '800px' }}>
      <Typography variant="h5" gutterBottom>
        User Orders
      </Typography>

      <List>
        {userOrders.map((order) => (
          <Card key={order.id} style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order ID: {order.id}
              </Typography>
              <Typography variant="body2">
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {order.buyer.address}
              </Typography>
              <Typography variant="body2">
                <strong>Postal Code:</strong> {order.buyer.postalCode}
              </Typography>
              <Typography variant="body2">
                <strong>House Number:</strong> {order.buyer.houseNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Description:</strong> {order.buyer.description}
              </Typography>
              <Typography variant="body2">
                <strong>Products:</strong>
              </Typography>
              <List>
                {order.items.map((item) => (
                  <ListItem key={item.title}>
                    <ListItemText
                      primary={`${item.title} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body2">
                <strong>Total Quantity:</strong> {order.items.reduce((total, item) => total + item.quantity, 0)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Paper>
  );
};

export default UserOrders;
