const express = require('express');
const dotenv = require('dotenv'); // ⬅️ CRITICAL FIX: Missing require
const cors = require('cors');
const asyncHandler = require('express-async-handler'); // ⬅️ CRITICAL FIX: Missing require
const sgMail = require('@sendgrid/mail');

// Load environment variables from .env file (local use only; Render uses its UI)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Initialize SendGrid ---
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("SendGrid API Key successfully loaded.");
} else {
    // This warning is fine, as Render ensures process.env is set if configured.
    console.error("SENDGRID_API_KEY is NOT set. Email sending will fail.");
}

// ---------------------------------
// Middleware Setup
// ---------------------------------
app.use(cors());
app.use(express.json()); // ⬅️ CRITICAL FIX: Required to read req.body for POST requests

// Basic health check route
app.get('/', (req, res) => {
    res.send({ status: 'OK', message: 'API is running' });
});

// --- Inquiry Submission Route ---
app.post('/api/inquiries', asyncHandler(async (req, res) => {
    // Data received from the React InquiryForm component
    const { name, email, contactNumber, subject, remark } = req.body;

    // Input Validation
    if (!name || !email || !contactNumber) {
        res.status(400);
        throw new Error('Missing required fields: Name, Email, and Contact Number.');
    }

    // Email configuration for SendGrid
    const msg = {
        // Recipient can be defined in Render environment variables
        to: process.env.RECIPIENT_EMAIL || 'sachchiyayexports@gmail.com', 
        // Sender MUST be a verified single sender or domain in SendGrid
        from: process.env.EMAIL_USER, 
        subject: `[Sachchiyay Inquiry] New Client: ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #3b82f6;">New Inquiry Received</h2>
                <hr style="border: 0; border-top: 1px solid #e0e0e0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${contactNumber || 'N/A'}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <hr style="border: 0; border-top: 1px solid #e0e0e0;">
                <h3 style="color: #1f2937;">Message Details:</h3>
                <p style="white-space: pre-wrap; padding: 10px; background-color: #f9fafb; border-left: 3px solid #3b82f6;">${remark}</p>
            </div>
        `,
    };

    try {
        await sgMail.send(msg); 
        console.log('Email sent successfully via SendGrid API!');

        res.status(200).json({ 
            message: "Inquiry submitted successfully! Email notification sent." 
        });
    } catch (error) {
        console.error('SendGrid Email Error:', error);
        if (error.response) {
            // Log the detailed error from SendGrid for server-side debugging
            console.error('SendGrid Response Body:', error.response.body);
        }
        
        res.status(500);
        throw new Error('Failed to send inquiry email. Please check server logs for SendGrid details.');
    }
}));

// Placeholder for error handling middleware (recommended for express-async-handler)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
