const Contact = require('../models/Contact');
const { sendContactEmail, sendConfirmationEmail } = require('../utils/emailService');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    // Send email to admin
    const emailSent = await sendContactEmail({ name, email, message });
    
    // Send confirmation email to user
    const confirmationSent = await sendConfirmationEmail({ name, email, message });
    
    if (emailSent && confirmationSent) {
      res.status(201).json({ message: 'Message sent successfully! Check your email for confirmation.' });
    } else if (emailSent) {
      res.status(201).json({ message: 'Message sent successfully! (Confirmation email failed)' });
    } else {
      res.status(201).json({ message: 'Message saved but email delivery failed. We will contact you soon.' });
    }
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all contact messages (admin only)
exports.getContacts = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 