const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./connect'); // Import connection function
const Contact = require('./models/Contact'); // Import Contact model

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CRUD Operations

// Display all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts); // No correction needed
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
});

// Display contact by ID
app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' }); // No correction needed
    }
    res.json(contact); // No correction needed
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving contact' });
  }
});

// Display contacts with age > 18
app.get('/contacts/gt-18', async (req, res) => {
  try {
    const contacts = await Contact.find({ age: { $gt: 18 } }); // No correction needed
    res.json(contacts); // No correction needed
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
});

// Display contacts with age > 18 and name containing "ah"
app.get('/contacts/gt-18/name-ah', async (req, res) => {
  try {
    const contacts = await Contact.find({
      age: { $gt: 18 },
      $or: [
        { lastName: { $regex: /ah/i } }, // Search in lastName
        { firstName: { $regex: /ah/i } } // Search in firstName
      ]
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
