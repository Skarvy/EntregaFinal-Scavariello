import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = ({ open, onClose, title, description }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center',}}>
      <Alert onClose={handleClose} severity="info">
        <strong>{title}</strong>
        <br />
        {description}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
