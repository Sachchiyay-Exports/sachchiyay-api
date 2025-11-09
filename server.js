// backend/server.js

// --- 1. Imports ---
const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');
// const mongoose = require('mongoose'); // Uncomment this if you are using MongoDB

// Load environment variables immediately
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_ENDPOINT = '/api/inquiries'; 

// --- 2. SendGrid Configuration (CRITICAL) ---
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("SendGrid API Key successfully loaded.");
} else {
    // This warning is helpful, but the service will still run.
    console.error("SENDGRID_API_KEY is NOT set. Email sending will fail.");
}

// --- 3. Middleware Setup ---
// CRITICAL FIX: Use FRONTEND_URL to restrict CORS access to your Vercel site
app.use(cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL], 
    credentials: true,
})); 
app.use(express.json()); // Required to read JSON bodies from the frontend
app.use(express.urlencoded({ extended: true })); // Good practice for form data


// --- 4. Inquiry Submission Route ---
app.post(API_ENDPOINT, asyncHandler(async (req, res) => {
    // Data received from the React InquiryForm component
    const { name, email, contactNumber, subject, remark } = req.body;

    // Input Validation
    if (!name || !email || !contactNumber) {
        res.status(400);
        throw new Error('Missing required fields: Name, Email, and Contact Number.');
    }

    // Email configuration for SendGrid
    const msg = {
        // Recipient email address
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
            // Log the detailed SendGrid API error for backend debugging
            console.error('SendGrid Response Body:', error.response.body);
        }
        
        res.status(500); // Send a 500 error status to the frontend
        throw new Error('Failed to send inquiry email. Check server logs for SendGrid details.');
    }
}));


// Default API route for health checks
app.get('/', (req, res) => {
    res.send({ status: 'OK', message: 'Sachchiyay Exports API is running and ready for inquiries...' });
});

// --- 5. Error Handling Middleware (MUST be the last app.use) ---
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Use the status code already set, or default to 500
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
