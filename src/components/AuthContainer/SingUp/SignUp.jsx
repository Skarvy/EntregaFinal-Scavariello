import * as React from 'react';
import { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/client';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../errors/CustomAlert';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const isEmailValid = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtener datos del formulario usando referencias
    const firstName = firstNameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Validar que todos los campos estén llenos
    if (!firstName || !phone || !email || !password) {
      setAlertTitle('Alerta');
      setAlertDescription('Todos los Campos son Obligatorios');
      setAlertOpen(true);
      return;
    }

    // Validar el formato del correo electrónico
    if (!isEmailValid(email)) {
      setAlertTitle('Alerta');
      setAlertDescription('Por favor, introduce un correo electrónico válido.');
      setAlertOpen(true);
      return;
    }

    // Consulta en Firestore para verificar si el usuario ya existe con el correo electrónico proporcionado
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));

    try {
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setAlertTitle('Alerta');
        setAlertDescription('El correo electrónico ya está registrado. Por favor, elige otro.');
        setAlertOpen(true);
        return;
      }

      // Crear objeto con los datos del usuario
      const user = {
        name: firstName,
        phone,
        email,
        password,
      };

      // Añadir el usuario a la base de datos
      const refUsers = collection(db, 'users');
      await addDoc(refUsers, user);
      navigate(`/login`);

    } catch (error) {
      setAlertTitle('Error');
      setAlertDescription(`Error al registrar usuario: ${error.message}`);
      setAlertOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 15
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Campos de entrada para el nombre y teléfono */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  inputRef={firstNameRef}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  inputRef={phoneRef}
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              {/* Campos de entrada para el correo electrónico y contraseña */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={emailRef}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={passwordRef}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* Checkbox para recibir actualizaciones por correo electrónico */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {/* Botón para enviar el formulario */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/* Enlace para iniciar sesión si ya tienes una cuenta */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link sx={{ cursor: "pointer" }} onClick={() => navigate(`/login`)} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* Alerta personalizada para mostrar mensajes de error */}
      <CustomAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        title={alertTitle}
        description={alertDescription}
      />
    </ThemeProvider>
  );
}
