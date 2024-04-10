// models/Order.js
const mongoose = require('mongoose');

/**
 * Esquema para el modelo de órdenes
 */
const orderSchema = new mongoose.Schema({
    // ID del usuario que realizó la orden
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Lista de productos incluidos en la orden
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],

    // Monto total de la orden
    totalAmount: { type: Number, required: true, min: 0 },

    // Estado de la orden (pendiente o completada)
    status: { type: String, enum: ['pending', 'completed'], default: 'pending', required: true }
}, { timestamps: true });

// Índice para el campo 'user' para mejorar la eficiencia de las consultas
orderSchema.index({ user: 1 });

// Modelo de datos para la orden
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
