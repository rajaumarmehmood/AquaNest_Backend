const express = require('express');
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

// Place a new order (user)
router.post('/', auth, placeOrder);
// Get current user's orders
router.get('/', auth, getUserOrders);
// Get all orders (admin)
router.get('/all', auth, getAllOrders);
// Update order status (admin)
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router; 