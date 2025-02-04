// routes/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST route to save order after payment
router.post('/payment-success', orderController.createOrder);

// GET route to fetch all orders
router.get('/get_all_order', orderController.getAllOrders);

module.exports = router;
