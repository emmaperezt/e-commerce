// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce_db', {}); // Actualiza la URL de la base de datos
        console.log('Conexión exitosa a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectarse a la base de datos MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;


