// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
    // Leer el token del encabezado de autorización
    const token = req.header('Authorization');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Añadir el usuario decodificado a la solicitud
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports = authMiddleware;
