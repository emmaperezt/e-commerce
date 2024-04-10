// useroutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para manejar las solicitudes de registro de usuarios
router.post('/register', authController.registerUser);

module.exports = router;
