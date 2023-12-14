import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import CartWidget from './CartWidget';
import UserWidget from '../user/UserWidget';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
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
              <CartWidget />
              <UserWidget />
            </Box>
          </Toolbar>
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
                </Button>
                <UserWidget />
              </Box>
            )}
            <CartWidget />
          </Box>
        </AppBar>
        <AppRoutes />
      </Box>
    </Router>
  );
};

export default Navbar;
