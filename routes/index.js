const express = require('express');

const router = express.Router();

// Import and use feature routers here as you implement them
// Example:
// router.use('/auth', require('./auth'));
// router.use('/products', require('./products'));
// router.use('/orders', require('./orders'));
// router.use('/testimonials', require('./testimonials'));
// router.use('/contact', require('./contact'));

router.use('/auth', require('./auth'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/testimonials', require('./testimonials'));
router.use('/contact', require('./contact'));

module.exports = router; 