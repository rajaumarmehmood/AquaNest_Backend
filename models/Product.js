const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['bottle', 'gallon', 'dispenser'], required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 