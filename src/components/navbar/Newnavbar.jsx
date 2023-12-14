

import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "../AuthContainer/Login/SignIn";
import ItemListContainer from "../items/ItemListConteiner";
import Categorias from "../categories/Categorias";
import Error404 from "../errors/Error404";
import Cart from "../carrito/Cart";
import SignUp from "../AuthContainer/SingUp/SignUp";
import Logout from "../AuthContainer/Logout";
import UserContainer from "../user/UserContainer";
import SplitButton from './SplitButton';
import ItemDetails from '../items/ItemDetails';
import CartWidget from './CartWidget';
import UserWidget from '../user/UserWidget';
import { ShopContext } from '../../context/ShopContext';

const Newnavbar = () => {
  const { cart } = useContext(ShopContext);
  const buyerEmail = cart.buyer?.email;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              {/* Mostrar el icono de menú en pantallas pequeñas */}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                MercadoCopia
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* Renderiza botones de la barra de navegación en pantallas medianas y grandes */}
              <Button color="inherit">
                <Link to={!buyerEmail ? "/login" : "/logout"} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {!buyerEmail ? "login" : "logout"}
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/categorias" style={{ color: 'inherit', textDecoration: 'none' }}>
                  categorias
                </Link>
              </Button>
              <SplitButton />
              <CartWidget />
              <UserWidget />
            </Box>
          </Toolbar>
          {/* Renderiza el menú en pantallas pequeñas */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {menuOpen && (
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Button color="inherit">
                  <Link to={!buyerEmail ? "/login" : "/logout"} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {!buyerEmail ? "login" : "logout"}
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link to="/categorias" style={{ color: 'inherit', textDecoration: 'none' }}>
                    categorias 
                  </Link>
                  <SplitButton />
                </Button>
                
                
                <UserWidget />
              </Box>
            )}
            <CartWidget />
          </Box>
        </AppBar>
        <Routes>
        <Route path="/" element={<ItemListContainer />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:id" element={ <ItemListContainer/>}/>
          <Route path="/item/:id" element={<ItemDetails/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/singup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<UserContainer />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default Newnavbar;
