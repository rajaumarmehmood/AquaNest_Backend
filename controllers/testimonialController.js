const Testimonial = require('../models/Testimonial');

// Get all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate('user', 'name');
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add a testimonial (user)
exports.addTestimonial = async (req, res) => {
  try {
    const { text, rating } = req.body;
    if (!text || !rating) {
      return res.status(400).json({ message: 'Text and rating required' });
    }
    const testimonial = new Testimonial({
      user: req.user.userId,
      text,
      rating,
    });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a testimonial (admin only)
exports.deleteTestimonial = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 