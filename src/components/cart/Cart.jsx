import React, { useContext, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { ShopContext } from '../../context/ShopContext';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/client';
import CustomAlert from '../errors/CustomAlert';
import { Navigate, useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(ShopContext);
  const { buyer } = cart;

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [description, setDescription] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  const handleRemoveItem = (itemId) => {
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
      if (cart.items.length === 0) {
        showAlert('Error', 'El carrito está vacío');
        return;
      }

      if (!buyer || !buyer.name || !buyer.phone || !buyer.email) {
        showAlert('Error', 'Por su seguridad debe estar Logeado para poder efectuar una compra.');
        return;
      }

      if (!address || !postalCode || !houseNumber || !description) {
        showAlert('Error', 'Ingrese la información completa del domicilio');
        return;
      }

      for (const item of cart.items) {
        const productDoc = await getDoc(doc(db, 'productos', item.id));
        const currentStock = productDoc.data().stock;

        if (item.quantity > currentStock) {
          showAlert('Error', `No hay suficientes unidades disponibles para vender: ${item.title}`);
          return;
        }

        await updateDoc(doc(db, 'productos', item.id), {
          stock: currentStock - item.quantity,
        });
      }

      const currentDate = new Date();
      const orderRef = await addDoc(collection(db, 'orders'), {
        buyer: {
          name: buyer.name,
          phone: buyer.phone,
          email: buyer.email,
          address,
          postalCode,
          houseNumber,
          description,
        },
        items: cart.items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cart.total,
        orderDate: currentDate.toISOString(),
      });
      
      setCart((prevCart) => ({
        ...prevCart,
        items: [],
        total: 0,
      }));
      
      showAlert('Compra exitosa', `Número de seguimiento: ${orderRef.id}`);
    } catch (error) {
      showAlert('Error', 'Error al procesar la orden');
      console.error('Error al procesar la orden:', error);
    }
 
  };

  const isCheckoutDisabled = cart.items.some((item) => item.quantity > item.stock);

  const showAlert = (title, description) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertOpen(true);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: '16px', maxWidth: '800px', width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Shopping Cart Info
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Buyer Information:
        </Typography>
        <Typography variant="body2" sx={{marginBottom:2}}>
          Name: {buyer.name}<br />
          Phone: {buyer.phone}<br />
          Email: {buyer.email}
        </Typography>

        <Typography variant="h6" gutterBottom>
        Shipping Information
        </Typography>

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

        <List>
          {cart.items.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={`Quantity: ${item.quantity}, Price: $  ${item.price.toFixed(2)}`}
              />
              <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Total: ${cart.total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleCheckout}
          disabled={isCheckoutDisabled}
          startIcon={<ShoppingCartCheckoutIcon/>}
        >
          Comprar {isCheckoutDisabled && "(Sin stock)"}
        </Button>
      </Paper>

      <CustomAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertTitle}
        description={alertDescription}
      />
    </div>
  );
};

export default Cart;
