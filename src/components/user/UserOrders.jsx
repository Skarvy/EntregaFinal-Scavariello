import React, { useState, useEffect, useContext } from 'react';
import { Paper, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase/client';
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const navigate = useNavigate();
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
    <Paper elevation={3} style={{ padding: '16px', margin: '16px'}}>
      <Typography variant="h5" gutterBottom>
        Mis Compras
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
              {/* Otros detalles de la orden */}
              <Typography variant="body2">
                <strong>Estado del envío:</strong> {order.buyer.deliveryState}
              </Typography>
              {/* ... otros detalles ... */}
              <Typography variant="body2">
                <strong>Products:</strong>
              </Typography>
              <List>
                {order.items.map((item) => (
                  <ListItem key={item.title}>
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/item/${item.id}`)}
                      primary={`${item.title} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
              {/* ... otros detalles ... */}
              {/* Botones que representan el estado de envío del paquete. El botón renderizado depende del estado actual del envío. */}

              <Button
                variant="contained"
                color="primary"
                endIcon={<DirectionsRunIcon />}
                disabled={order.buyer.deliveryState === 'onTheway' || order.buyer.deliveryState === 'delivered'}
              >
                Preparándose
              </Button>
              <Button
                variant="contained"
                color="warning"
                endIcon={<LocalShippingIcon />}
                disabled={order.buyer.deliveryState === 'preparing' || order.buyer.deliveryState === 'delivered'}
              >
                En Camino
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<CheckCircleOutlineIcon />}
                disabled={order.buyer.deliveryState === 'preparing' || order.buyer.deliveryState === 'onTheway'}
              >
                Entregado
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
    </Paper>
  );
};

export default UserOrders;
