// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // 👈 ENSURE YOUR CSS FILE IS NAMED 'style.css' AND IS IN THE 'src' FOLDER
import { BrowserRouter } from 'react-router-dom'; // Import Router
form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Inquiry submitted successfully!"); // <--- This only shows a placeholder message
    form.reset();
    closeModal();
  });
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrapper required for Link and useNavigate to work */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
