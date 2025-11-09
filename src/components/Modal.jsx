// src/components/Modal.jsx
import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    // API Endpoint (MUST ensure your backend is running on http://localhost:5000)
    const API_URL = 'http://localhost:5000/api/inquiries';

    // Effect to manage body overflow and close modal on outside click (Correct and maintained)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        const handleOutsideClick = (event) => {
            if (modalRef.current && event.target === modalRef.current) {
                onClose();
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    // Handle form submission (MERN integration)
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.Name, 
                    email: data.Email,
                    contactNumber: data.ContactNumber,
                    remark: data.Remark,
                    subject: 'Product Modal Inquiry (Pop-up)' // Specific subject for modal
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Form submission failed on the server.');
            }

            const result = await response.json();
            alert(result.message || "Inquiry submitted successfully!");
            
            event.target.reset(); 
            onClose(); // Close the modal after successful submission

        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Failed to send inquiry: ${error.message}. Ensure your backend is running.`);
        }
    };


    return (
        <div id="inquiryModal" className="modal" style={{ display: 'flex' }} ref={modalRef}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Submit Your Inquiry</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <form id="inquiryForm" className="modal-form" onSubmit={handleSubmit}>
                    {/* Input field names MUST match the keys used in the handleSubmit function (data.Name, data.ContactNumber, etc.) */}
                    <input type="text" id="name" name="Name" placeholder="Name*" required />
                    
                    <input 
                        type="tel" 
                        id="contactNumber" 
                        name="ContactNumber" 
                        placeholder="Contact Number*" 
                        required 
                        pattern="[0-9]{10,12}" 
                        title="Phone number must be 10-12 digits long."
                        maxLength="12"
                    />
                    
                    <input 
                        type="email" 
                        id="email" 
                        name="Email" 
                        placeholder="Email*" 
                        required 
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" 
                        title="Must be a valid email address."
                    />
                    
                    <textarea id="remark" name="Remark" placeholder="Remark" rows="4"></textarea>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>CANCEL</button>
                        <button type="submit" className="btn-inquiry-now">INQUIRY NOW</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;