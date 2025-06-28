const express = require('express');
const { submitContact, getContacts } = require('../controllers/contactController');
const auth = require('../middleware/auth');

const router = express.Router();

// Submit contact form (public)
router.post('/', submitContact);
// Get all contact messages (admin)
router.get('/', auth, getContacts);

module.exports = router; 