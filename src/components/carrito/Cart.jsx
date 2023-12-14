import React, { useContext, useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import {
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase/client';
import { useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LoadingButton from '@mui/lab/LoadingButton';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CustomAlert from '../errors/CustomAlert';
import { ShopContext } from '../../context/ShopContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(ShopContext);
  const { buyer } = cart;
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [description, setDescription] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se maneja la lógica cuando cambia el estado de loading y el carrito está vacío
    if (!loading && cart.items.length === 0) {
      setLoading(false);
    }
  }, [loading, cart.items.length]);

  const handleRemoveItem = (itemId) => {
    // Remover un item del carrito
    const itemToRemove = cart.items.find((item) => item.id === itemId);
    const updatedCart = {
      ...cart,
      items: cart.items.filter((item) => item.id !== itemId),
      total: cart.total - itemToRemove.price * itemToRemove.quantity,
    };
    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      if (cart.items.length === 0) {
        showAlert('Error', 'El carrito está vacío');
        return;
      }

      if (!buyer || !buyer.name || !buyer.phone || !buyer.email) {
        showAlert(
          'Error',
          'Por su seguridad debe estar Logeado para poder efectuar una compra.'
        );
        return;
      }

      if (!address || !postalCode || !houseNumber || !description) {
        showAlert('Error', 'Ingrese la información completa del domicilio');
        return;
      }

      for (const item of cart.items) {
        // Verificar el stock actualizado en Firestore antes de realizar la compra
        const productDoc = await getDoc(doc(db, 'productos', item.id));
        const currentStock = productDoc.data().stock;

        if (item.quantity > currentStock) {
          showAlert(
            'Error',
            `No hay suficientes unidades disponibles para vender: ${item.title}`
          );
          return;
        }

        // Actualizar el stock en Firestore
        await updateDoc(doc(db, 'productos', item.id), {
          stock: currentStock - item.quantity,
        });
      }

      const currentDate = new Date();
      // Crear una nueva orden en Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        buyer: {
          name: buyer.name,
          phone: buyer.phone,
          email: buyer.email,
          address,
          postalCode,
          houseNumber,
          description,
          deliveryState: "preparing"
        },
        items: cart.items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          id: item.id,
        })),
        total: cart.total,
        orderDate: currentDate.toISOString(),
      });

      // Limpiar el carrito después de realizar la compra
      setCart((prevCart) => ({
        ...prevCart,
        items: [],
        total: 0,
      }));

      showAlert('Compra exitosa', `Número de seguimiento: ${orderRef.id}`);
    } catch (error) {
      showAlert('Error', 'Error al procesar la orden');
      console.error('Error al procesar la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCheckoutDisabled = cart.items.some(
    (item) => item.quantity > item.stock
  );

  const showAlert = (title, description) => {
    // Mostrar una alerta con el título y la descripción proporcionados
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertOpen(true);
  };

  return (
    <Box
      m={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={3} style={{ padding: '16px', maxWidth: '800px', width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Shopping Cart Info
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Buyer Information:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Name: {buyer.name}<br />
          Phone: {buyer.phone}<br />
          Email: {buyer.email}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>

        {/* Campos de dirección, código postal, número de casa y descripción */}
        <TextField
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Postal Code"
          fullWidth
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          margin="normal"
        />
        <TextField
          label="House Number"
          fullWidth
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Additional Info"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        {/* Lista de productos en el carrito */}
        <List>
          {cart.items.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar alt={item.title} src={item.image} />
              </ListItemAvatar>
              <ListItemText
                onClick={() => navigate(`/item/${item.id}`)}
                primary={item.title}
                secondary={`Quantity: ${item.quantity}, Price: $ ${item.price.toFixed(2)}`}
                style={{ cursor: 'pointer' }}
              />
              <Button
                onClick={() => handleRemoveItem(item.id)}
                variant="contained"
                color="error"
              >
                <DeleteIcon />
              </Button>
            </ListItem>
          ))}
        </List>

        {/* Mostrar el total del carrito */}
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Total: ${cart.total.toFixed(2)}
        </Typography>

        {/* Botón de compra con LoadingButton para mostrar el estado de carga */}
        <LoadingButton
          variant="contained"
          color="success"
          onClick={handleCheckout}
          loading={loading}
          startIcon={<ShoppingCartCheckoutIcon />}
          // Deshabilitar el botón si hay elementos sin stock
          disabled={isCheckoutDisabled}
        >
          Comprar {isCheckoutDisabled && "(Sin stock)"}
        </LoadingButton>

        {/* Botón para continuar comprando */}
        <Button
          endIcon={<ShortcutIcon />}
          onClick={() => navigate("/")}
          variant="outlined"
        >
          Seguir Comprando
        </Button>

        {/* Mostrar el botón para ver las compras del usuario si está logeado */}
        {buyer.email && (
          <Button
            endIcon={<LocalMallIcon />}
            onClick={() => navigate("/user")}
            variant="outlined"
          >
            Mis Compras
          </Button>
        )}
      </Paper>

      {/* Mostrar una alerta personalizada */}
      <CustomAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertTitle}
        description={alertDescription}
      />
    </Box>
  );
};

export default Cart;
