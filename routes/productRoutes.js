const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para la gestión de productos
router.get('/', productController.getAllProducts); // Obtener todos los productos
router.get('/:id', productController.getProductById); // Obtener un producto por su ID
router.post('/', productController.createProduct); // Crear un nuevo producto
router.put('/:id', productController.updateProduct); // Actualizar un producto existente
router.delete('/:id', productController.deleteProduct); // Eliminar un producto existente

module.exports = router;
