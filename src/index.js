// --- INQUIRY MODAL FUNCTIONALITY (Corrected to use API) ---
document.addEventListener("DOMContentLoaded", function() {
  const inquiryButtons = document.querySelectorAll(".btn-inquiry");
  const modal = document.getElementById("inquiryModal");
  const closeButton = document.querySelector(".close-button");
  const cancelButton = document.querySelector(".btn-cancel");
  const form = document.getElementById("inquiryForm");
  
  // *** CRITICAL API URL ***
  // Your Render Backend API URL
  const API_BASE_URL = 'https://sachchiyay-api.onrender.com';
  const API_ENDPOINT = `${API_BASE_URL}/api/inquiries`;

  // Open the modal when "Inquiry" is clicked
  inquiryButtons.forEach(button => {
    button.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Function to close modal
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Close modal when clicking X or Cancel
  closeButton.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);

  // Close when clicking outside modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // **CRITICAL FIX: API SUBMISSION LOGIC**
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      name: formData.get('Name'),
      email: formData.get('Email'),
      contactNumber: formData.get('ContactNumber'),
      subject: "Product Inquiry from Modal", // Fixed subject based on modal context
      remark: formData.get('Remark'),
    };
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      const result = await response.json();
      alert(result.message || "Inquiry submitted successfully!");
      
      form.reset();
      closeModal();

    } catch (error) {
      console.error('Submission Error:', error);
      alert(`Failed to send inquiry: Ensure your backend is running.`);
    }
  });
});

// --- REST OF INDEX.JS CODE ---
// ... (Your original slider, scroll to top, etc., code here) ...
