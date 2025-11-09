// backend/models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema(
  {
    // Common fields from the Modal and Page Forms
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please add a contact number'],
    },
    // Field for the larger form (optional for the modal)
    subject: {
        type: String,
        default: 'Product Inquiry'
    },
    remark: { // Used as 'Remark' in modal and 'Message' in page form
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);