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
import Login from "../login/login";
import ItemListContainer from "../items/ItemListConteiner";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import CartWidget from "./CartWidget";
import SplitButton from "./SplitButton";
import ItemDetails from "../items/ItemDetails";
import Categorias from "../categories/Categorias";
import Error404 from "./Error404";

const navLinks = [
  {
    title: "Home",
    path: "",    
  },
  {
    title: "Login",
    path: "/login", 
  },
  {
    title: "Categorias",
    path: "/categorias",
  },

];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      
        <AppBar position="static" sx={{ bgcolor: 'warning.light' }}>
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
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <NavLink to="/">MercadoCopia</NavLink>
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navLinks.map((item) => (
                <Button color="inherit" key={item.title} component={NavLink} to={item.path}>
                  {item.title}
                </Button>
              ))}

              <SplitButton />
              <CartWidget />
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
           <Route path="/login"element={<Login />}/>
           <Route path="/item/:id" element={<ItemDetails/>}/>
           <Route path="/categorias" element={<Categorias/>}/>
           <Route path="/categorias/:id" element={ <ItemListContainer/>}/>
           <Route path="*" element={<Error404/>}/>                    
           
        </Routes>
      
    </Router>
  );
}