// backend/routes/inquiryRoutes.js
const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// @route POST /api/inquiries
// @desc Create a new inquiry record
router.post('/', async (req, res) => {
  try {
    const { name, email, contactNumber, subject, remark } = req.body;

    // Basic validation based on the schema
    if (!name || !email || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields: Name, Email, and Contact Number.' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      contactNumber,
      subject,
      remark,
    });

    res.status(201).json({ 
      message: 'Inquiry submitted successfully!', 
      data: inquiry 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: Failed to process inquiry.' });
  }
});

module.exports = router;