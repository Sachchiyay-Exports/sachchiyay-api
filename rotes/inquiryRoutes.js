// backend/routes/inquiryRoutes.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer'); 
const router = express.Router(); 

// --- Nodemailer Transporter Setup ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,    
        pass: process.env.EMAIL_PASS,    
    },
});

// Verification: This prints the "Server is ready to send emails" message.
transporter.verify((error, success) => {
    if (error) {
        console.error("Transporter verification failed. Check credentials:", error.message);
    } else {
        console.log("Server is ready to send emails.");
    }
});


// @route POST /api/inquiries
// @desc Process inquiry data and send notification email
router.post('/', asyncHandler(async (req, res) => {
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
        
        // Correct template literal syntax for subject line
        subject: `[Sachchiyay Inquiry] New Client: ${name}`, 
        
        // Email HTML template
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4A2613;">New Client Inquiry Received</h2>
                <hr style="border: 1px solid #e5e7eb;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${contactNumber || 'N/A'}</p>
                <p><strong>Subject:</strong> ${subject || 'General Website Inquiry'}</p>
                <hr style="border: 1px solid #e5e7eb;">
                <h3 style="color: #1f2937;">Message Details:</h3>
                <p style="white-space: pre-wrap;">${remark}</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');

        res.status(200).json({ 
            message: "Inquiry submitted successfully! Email notification sent." 
        });

    } catch (error) {
        console.error('Nodemailer Error:', error);
        res.status(500).json({ 
            message: 'Failed to send inquiry. Please ensure your email credentials are correct.',
            error: error.message
        });
    }
}));

module.exports = router;