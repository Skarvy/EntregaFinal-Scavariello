import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// El componente Alert de Material-UI se envuelve en React.forwardRef para permitir el uso de un ref
const Alert = React.forwardRef(function Alert(props, ref) {
  // MuiAlert es el componente de alerta de Material-UI
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// El componente CustomAlert recibe propiedades (props) como parámetros
const CustomAlert = ({ open, onClose, title, description }) => {
  // handleClose maneja el cierre de la Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // Llama a la función onClose proporcionada para cerrar la Snackbar
    onClose();
  };

  return (
    // Snackbar es un componente de Material-UI para mostrar mensajes temporales en la interfaz
    <Snackbar
      open={open} // Indica si la Snackbar debe estar abierta o cerrada
      autoHideDuration={2000} // Duración en milisegundos antes de que la Snackbar se cierre automáticamente
      onClose={handleClose} // Función llamada cuando se cierra la Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posición de la Snackbar en la interfaz
    >
      {/* El componente Alert dentro de la Snackbar */}
      <Alert onClose={handleClose} severity="info">
        {/* Contenido de la alerta, incluyendo el título y la descripción */}
        <strong>{title}</strong>
        <br />
        {description}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
