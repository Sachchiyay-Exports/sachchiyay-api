// backend/server.js
const express = require('express');
// ... other requires ...
const cors = require('cors');
const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail'); // ⬅️ NEW: SendGrid library

// Load environment variables (from standard .env file)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ⬅️ NEW: Set the SendGrid API Key once upon startup
// This uses the SENDGRID_API_KEY you set in Render's environment variables.
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("SendGrid API Key successfully loaded.");
} else {
    console.error("SENDGRID_API_KEY is NOT set. Email sending will fail.");
}

// Middleware
// ... existing middleware ...

// --- Inquiry Submission Route ---
app.post('/api/inquiries', asyncHandler(async (req, res) => {
    // Data received from the React InquiryForm component
    const { name, email, contactNumber, subject, remark } = req.body;

    // Input Validation
    if (!name || !email || !contactNumber) {
        res.status(400);
        throw new Error('Missing required fields: Name, Email, and Contact Number.');
    }

    // ⬅️ MODIFIED: Simplified email sending using SendGrid
    const msg = {
        // Use the verified sender email from your Render variables
        to: process.env.RECIPIENT_EMAIL || 'sachchiyayexports@gmail.com', 
        from: process.env.EMAIL_USER, // Your verified sender email
        subject: `[Sachchiyay Inquiry] New Client: ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${contactNumber || 'N/A'}</p>
                <hr>
                <h3 style="color: #1f2937;">Message Details:</h3>
                <p style="white-space: pre-wrap;">${remark}</p>
            </div>
        `,
    };

    // Send the email and wait for the API response
    await sgMail.send(msg); 
    console.log('Email sent successfully via SendGrid API!');


    res.status(200).json({ 
        message: "Inquiry submitted successfully! Email notification sent." 
    });
}));

// ... rest of your code ...
