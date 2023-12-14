import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ItemListContainer from '../items/ItemListConteiner';
import SignIn from '../AuthContainer/Login/SignIn';
import ItemDetails from '../items/ItemDetails';
import Categorias from '../categories/Categorias';
import Error404 from '../errors/Error404';
import Cart from '../carrito/Cart';
import SignUp from '../AuthContainer/SingUp/SignUp';
import Logout from '../AuthContainer/Logout';
import UserContainer from '../user/UserContainer';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ItemListContainer />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/item/:id" element={<ItemDetails />} />
    <Route path="/categorias" element={<Categorias />} />
    <Route path="/categorias/:id" element={<ItemListContainer />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/singup" element={<SignUp />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/user" element={<UserContainer />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
);

export default AppRoutes;
