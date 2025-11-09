// backend/server.js

// --- 1. Imports (All Required Modules) ---
const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail'); // SendGrid Mailer
// const mongoose = require('mongoose'); // Uncomment if you are using MongoDB

// Load environment variables immediately from .env file (for local use)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_ENDPOINT = '/api/inquiries'; 

// --- 2. SendGrid Configuration (CRITICAL) ---
// This requires the SENDGRID_API_KEY environment variable to be set on Render
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("SendGrid API Key successfully loaded.");
} else {
    console.error("SENDGRID_API_KEY is NOT set. Email sending will fail.");
}

// --- 3. Middleware Setup ---
// CRITICAL: CORS Configuration to allow requests from your Vercel frontend URL
app.use(cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL], // FRONTEND_URL MUST be set on Render
    credentials: true,
})); 
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded data


// --- 4. Inquiry Submission Route (using SendGrid) ---
app.post(API_ENDPOINT, asyncHandler(async (req, res) => {
    // Data received from the frontend (InquiryForm)
    const { name, email, contactNumber, subject, remark } = req.body;

    // Input Validation
    if (!name || !email || !contactNumber) {
        res.status(400);
        throw new Error('Missing required fields: Name, Email, and Contact Number.');
    }

    // Email configuration for SendGrid
    const msg = {
        to: process.env.RECIPIENT_EMAIL || 'sachchiyayexports@gmail.com', 
        from: process.env.EMAIL_USER, // Sender MUST be a verified single sender/domain in SendGrid
        subject: `[Sachchiyay Inquiry] New Client: ${name}`,
        
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #3b82f6;">New Inquiry Received</h2>
                <hr style="border: 0; border-top: 1px solid #e0e0e0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${contactNumber || 'N/A'}</p>
                <p><strong>Subject:</strong> ${subject || 'General Website Inquiry'}</p>
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
            console.error('SendGrid Response Body:', error.response.body);
        }
        
        res.status(500); // Set response status to 500 (Internal Server Error)
        throw new Error('Failed to send inquiry email. Check server logs for SendGrid details.');
    }
}));


// Default API route for health checks
app.get('/', (req, res) => {
    res.send({ status: 'OK', message: 'Sachchiyay Exports API is running and ready for inquiries...' });
});

// --- 5. Error Handling Middleware (Catches errors from asyncHandler) ---
app.use((err, req, res, next) => {
    // If a status code hasn't been set by us, default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Only include stack trace in development, not production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});


// --- 6. Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
