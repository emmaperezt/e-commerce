const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Función de controlador para agregar un producto al carrito
exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const userId = req.session.userId; // o cualquier método de autenticación
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: 1 }]
            });
        } else {
            const existingProductIndex = cart.products.findIndex(item => item.product.equals(productId));
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
        }

        await cart.save();
        return res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
};

// Función de controlador para actualizar la cantidad de un producto en el carrito
exports.updateCartItem = async (req, res) => {
    try {
        const productId = req.body.productId;
        const newQuantity = req.body.quantity;
        const userId = req.session.userId; // o cualquier método de autenticación

        const cart = await Cart.findOne({ user: userId });
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        if (productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity;
            await cart.save();
            return res.status(200).json({ message: 'Cantidad de producto actualizada en el carrito' });
        } else {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el producto en el carrito' });
    }
};

// Función de controlador para eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.session.userId; // o cualquier método de autenticación

        const cart = await Cart.findOne({ user: userId });
        const updatedProducts = cart.products.filter(item => !item.product.equals(productId));

        cart.products = updatedProducts;
        await cart.save();

        return res.status(200).json({ message: 'Producto eliminado del carrito con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
};
