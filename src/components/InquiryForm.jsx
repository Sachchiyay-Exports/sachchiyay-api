// src/components/InquiryForm.jsx
import React from 'react';

const InquiryForm = () => {
    
    // API Endpoint (Ensure your backend is running on http://localhost:5000)
    const API_URL = 'http://localhost:5000/api/inquiries';

    // FIX: Define handleSubmit INSIDE the component where the form can access it.
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        
        // Extract data based on input names from the form
        const data = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            contactNumber: formData.get('phone'),
            subject: formData.get('subject') || 'General Website Inquiry',
            remark: formData.get('message'),
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Form submission failed on the server.');
            }

            const result = await response.json();
            alert(result.message || "Inquiry submitted successfully! Email notification sent.");
            
            event.target.reset(); // Clear the form fields

        } catch (error) {
            console.error('Submission Error:', error);
            // FIX: Template literal must be wrapped in backticks (`)
            alert(`Failed to send inquiry: ${error.message}. Ensure your backend is running.`);
        }
    };

    return (
        <section className="inquiry-form" id="inquiry-form-section">
            <h2>Inquiry Form</h2>
            <hr className="section-divider" />
            <form onSubmit={handleSubmit}>
                <div className="form-group-half">
                    <input type="text" placeholder="Full Name*" name="fullName" required />
                    <input 
                        type="email" 
                        placeholder="Email*" 
                        name="email" 
                        required 
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // HTML5 validation
                        title="Must be a valid email address."
                    />
                </div>
                <div className="form-group-half">
                    <input 
                        type="tel" 
                        placeholder="Phone*" 
                        name="phone" 
                        required 
                        pattern="[0-9]{10,12}" // HTML5 validation for phone number
                        title="Phone number must be 10-12 digits long."
                        maxLength="12"
                    />
                    <input type="text" placeholder="Subject" name="subject" />
                </div>
                <textarea placeholder="Message" name="message" rows="5"></textarea>
                <button type="submit" className="btn-submit">Submit Now</button>
            </form>
        </section>
    );
};

export default InquiryForm;