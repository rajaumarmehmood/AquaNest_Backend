const express = require('express');
const { getTestimonials, addTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all testimonials (public)
router.get('/', getTestimonials);
// Add testimonial (user)
router.post('/', auth, addTestimonial);
// Delete testimonial (admin)
router.delete('/:id', auth, deleteTestimonial);

module.exports = router;