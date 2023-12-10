import { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setCart } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para realizar el logout
    const handleLogout = () => {
      // Reinicia los valores del comprador y, posiblemente, otros valores del contexto
      setCart((prevCart) => ({
        ...prevCart,
        buyer: {},
      }));

      // Redirige a la ruta ("/")
      navigate('/');
    };

    // Llama a la función de logout cuando el componente se monta
    handleLogout();
  }, [setCart, navigate]);

  // No renderiza nada, solo contiene la lógica de logout
  return null;
};

export default Logout;
