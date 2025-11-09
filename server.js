// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer'); 
const asyncHandler = require('express-async-handler');

// Load environment variables (from standard .env file)
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    // Dynamic CORS setup for local testing and deployment
    origin: ['http://localhost:3000', process.env.FRONTEND_URL], 
    credentials: true,
})); 
app.use(express.json()); // To handle JSON bodies
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded data


// --- Nodemailer Configuration ---
// This needs to be defined globally before the route uses it.
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,    
        pass: process.env.EMAIL_PASS,    
    },
});

// Verification 
transporter.verify((error, success) => {
    if (error) {
        console.error("Transporter verification failed. Check credentials:", error.message);
    } else {
        console.log("Server is ready to send emails.");
    }
});


// --- Inquiry Submission Route ---
// Use asyncHandler to handle promises and errors cleanly
app.post('/api/inquiries', asyncHandler(async (req, res) => { 
    // Data received from the React InquiryForm component
    const { name, email, contactNumber, subject, remark } = req.body;

    // Input Validation
    if (!name || !email || !contactNumber) {
        res.status(400);
        throw new Error('Missing required fields: Name, Email, and Contact Number.');
    }

    // Construct the email content
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: process.env.RECIPIENT_EMAIL || 'sachchiyayexports@gmail.com', 
        
        // FIX: Corrected email template syntax and styling
        subject: `[Sachchiyay Inquiry] New Client: ${name}`, 
        
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; border: 1px solid #E2DFCC;">
                <h2 style="color: #4A2613; border-bottom: 2px solid #E2B04A; padding-bottom: 5px;">New Client Inquiry Received</h2>
                <p><strong>Source:</strong> ${subject || 'General Website Inquiry'}</p>
                <hr style="border: none; border-top: 1px solid #E2DFCC;">
                
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4A2613;">${email}</a></p>
                <p><strong>Phone:</strong> ${contactNumber || 'N/A'}</p>
                
                <hr style="border: none; border-top: 1px solid #E2DFCC;">
                
                <h3 style="color: #1f2937;">Message Details:</h3>
                <p style="white-space: pre-wrap;">${remark}</p>
                
                <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    Please respond to the client as soon as possible.
                </p>
            </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    res.status(200).json({ 
        message: "Inquiry submitted successfully! Email notification sent." 
    });
}));


// Default API route for health checks
app.get('/', (req, res) => res.send('Sachchiyay Exports API is running and ready for inquiries...'));


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));