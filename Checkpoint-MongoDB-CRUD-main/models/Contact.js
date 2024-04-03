const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);
