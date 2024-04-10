// authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Controlador para el registro de usuarios
const registerUser = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Hashear la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Responder con un mensaje de éxito
        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

module.exports = { registerUser };
