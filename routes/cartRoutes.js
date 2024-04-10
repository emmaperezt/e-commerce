const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ruta para agregar un producto al carrito
router.post('/add-to-cart/:productId', cartController.addToCart);

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/update-cart-item/:productId', cartController.updateCartItem);

// Ruta para eliminar un producto del carrito
router.delete('/remove-from-cart/:productId', cartController.removeFromCart);

module.exports = router;
