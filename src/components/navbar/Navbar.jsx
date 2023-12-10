import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import {NavLink, Route, Routes,BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import ItemListContainer from "../items/ItemListConteiner";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import CartWidget from "./CartWidget";
import SplitButton from "./SplitButton";
import ItemDetails from "../items/ItemDetails";
import Categorias from "../categories/Categorias";
import Error404 from "./Error404";
import Cart from "../cart/cart";
import AuthContainer from "../AuthContainer/AuthContainer";
import SignUp from "../AuthContainer/SingUp/SignUp";
import UserContainer from "../user/UserContainer";
import UserWidget from "../user/UserWidget";
import { ShopContext } from "../../context/ShopContext";
import Logout from "../AuthContainer/Logout";



const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { cart } = useContext(ShopContext);
  const buyerEmail = cart.buyer?.email;

  const navLinks = [
    {
      title: 'Home',
      path: '',
    },
    {
      title: buyerEmail ? 'Logout' : 'Login',
      path: buyerEmail ? '/logout' : '/login',
    },
    {
      title: 'Categorias',
      path: '/categorias',
    },
  ];
  


  return (
    <Router>
      
        <AppBar position="static" sx={{ bgcolor: 'warning.light', marginBottom:3 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              size="large"
              onClick={() => setOpen(true)}
              sx={{ display: { xs: "flex", sm: "none" } }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: ' none', color: 'white' }}>
              <NavLink to="/" style={{ color: 'white', textDecoration:  'none' }}>
                  MercadoCopia
               </NavLink>
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navLinks.map((item) => (
                <Button color="inherit" key={item.title} component={NavLink} to={item.path}>
                  {item.title}
                </Button>
              ))}

              <SplitButton />
              <CartWidget />
              <UserWidget/>
                    
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          open={open}
          anchor="left"
          onClose={() => setOpen(false)}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <NavListDrawer navLinks={navLinks} />
        </Drawer>

        <Routes>          
           <Route path="/" element={<ItemListContainer/>}/>
           <Route path="/login"element={<AuthContainer/>}/>
           <Route path="/item/:id" element={<ItemDetails/>}/>
           <Route path="/categorias" element={<Categorias/>}/>
           <Route path="/categorias/:id" element={ <ItemListContainer/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/singup" element={<SignUp/>}/>
           <Route path="/singup" element={<SignUp/>}/>
           <Route path="/logout" element={<Logout/>}/>
           <Route path="/user" element={<UserContainer/>}/>          
           <Route path="*" element={<Error404/>}/>                    
           
        </Routes>
      
    </Router>
  );
}

export default Navbar;