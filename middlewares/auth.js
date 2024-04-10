const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Obtener el token JWT del encabezado de autorización
    const token = req.headers.authorization;

    // Verificar si el token existe y está bien formateado
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Se requiere autenticación' });
    }

    // Extraer el token de Bearer
    const authToken = token.split(' ')[1];

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(authToken, 'tu_secreto_jwt');

        // Obtener el ID del usuario del token decodificado
        const userId = decodedToken.userId;

        // Buscar al usuario en la base de datos
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Establecer el objeto de usuario en la solicitud
        req.user = user;

        // Pasar al siguiente middleware
        next();
    } catch (error) {
        // Si hay un error al verificar el token, responder con un error de autenticación
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
