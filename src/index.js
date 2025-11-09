// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // 👈 ENSURE YOUR CSS FILE IS NAMED 'style.css' AND IS IN THE 'src' FOLDER
import { BrowserRouter } from 'react-router-dom'; // Import Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrapper required for Link and useNavigate to work */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);