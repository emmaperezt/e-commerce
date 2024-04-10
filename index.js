/// index.js
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');

// Importar la configuración de Passport.js y las estrategias de autenticación
require('./config/passport'); // Suponiendo que tienes un archivo llamado passport.js en la carpeta config

// Crear una instancia de la aplicación Express
const app = express();

// Conectar a la base de datos MongoDB
connectDB();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Middleware de Passport.js para inicializar la sesión y autenticación
app.use(passport.initialize());
app.use(passport.session());

// Definir rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi aplicación de comercio electrónico!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Puerto predeterminado es 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
