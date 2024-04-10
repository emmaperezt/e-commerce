// cartModel.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalPrice: { type: Number, default: 0 },
    // Otros campos que puedas necesitar en tu modelo de carrito
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
