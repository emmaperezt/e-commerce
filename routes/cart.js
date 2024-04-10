// cart.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/Product');

router.post('/add-to-cart/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const userId = req.session.userId; // O cualquier otra forma de obtener el ID del usuario
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Crea un nuevo carrito si no existe uno para el usuario
            const newCart = new Cart({
                user: userId,
                products: [product._id],
                totalPrice: product.price
            });
            await newCart.save();
        } else {
            // Agrega el producto al carrito existente
            cart.products.push(product._id);
            cart.totalPrice += product.price;
            await cart.save();
        }

        return res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
});

module.exports = router;
