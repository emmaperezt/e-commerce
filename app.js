// app.js

const express = require('express');
const app = express();

// Importar las rutas
const cartRoutes = require('./routes/cart');

// Asociar las rutas con la aplicación
app.use('/cart', cartRoutes);

// Otras configuraciones y middleware...

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
