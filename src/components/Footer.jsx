// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Custom message for WhatsApp redirect (for social media icon)
  const whatsappMessage = encodeURIComponent("Hello Sachchiyay Exports, I am interested in your products and would like to place an inquiry.");
  const whatsappLink = `https://wa.me/916353395275?text=${whatsappMessage}`;

  return (
    <footer className="multi-column-footer">
      <div className="footer-top-section">

        {/* === COLUMN 1: LOGO, NAME, DESCRIPTION, AND SOCIAL ICONS === */}
        <div className="footer-column footer-logo-col">
          <div className="footer-logo">
            <img src="image/logo.jpg" alt="Sachchiyay Exports Logo" className="sachchiyay-footer-logo" />
            <span className="logo-text">Sachchiyay Exports</span>
          </div>
          <p>Leading the export of premium organic spices from India, delivering purity, authenticity, and freshness with
            integrity at our core.</p>
          <div className="footer-social-icons">
            {/* Social Icons (Already linked) */}
            <a href="https://www.facebook.com/share/1BePRSLyAY/" className="social-icon" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/sachchiyay_exports?igsh=Y3dlc2Y1OTllYzIz" className="social-icon" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/sachchiyay-exports-998a5b395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-icon" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            {/* WhatsApp link with message */}
            <a href={whatsappLink} className="social-icon" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

        {/* === COLUMN 2: USEFUL PAGES === */}
        <div className="footer-column">
          <h4>Useful Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/inquiry">Inquiry</Link></li>
            <li><Link to="/contact">Contact Details</Link></li>
          </ul>
        </div>

        {/* === COLUMN 3: CONTACT DETAILS === */}
        <div className="footer-column">
          <h4>Contact</h4>
          {/* Contact Icons */}
          <p className="contact-detail"><i className="fas fa-map-marker-alt"></i> G-3 DADA BHAI CHAMBERS, SARDAR GANJ, ANAND
            388001</p>
          <p className="contact-detail"><i className="fas fa-phone-alt"></i> +91 6353395275</p>
          <p className="contact-detail"><i className="fas fa-envelope"></i> sachchiyayexports@gmail.com</p>
        </div>

        {/* === COLUMN 4: WHY CHOOSE US (LINKS REMOVED) === */}
        <div className="footer-column">
            <h4>Why Choose Us</h4>
            <ul>
                <li>
                  {/* FIX: Removed the anchor tag, keeping the icon and text */}
                  <i className="fas fa-certificate"></i> 100% Organic Certified
                </li>
                <li>
                  {/* FIX: Removed the anchor tag, keeping the icon and text */}
                  <i className="fas fa-flask"></i> Lab-Tested Purity
                </li>

                <li>
                  {/* FIX: Removed the anchor tag, keeping the icon and text */}
                  <i className="fas fa-globe-americas"></i> Worldwide Shipping
                </li>
                
                <li>
                  {/* FIX: Removed the anchor tag, keeping the icon and text */}
                  <i className="fas fa-leaf"></i> Sustainable Farming
                </li>
            </ul>
        </div>
      </div>

      {/* === COPYRIGHT BAR (LINKS ADDED) === */}
      <div className="footer-copyright-bar">
        <p>&copy; 2023 Sachchiyay Exports. All Rights Reserved.</p>
        <div className="footer-legal-links">
          <Link to="/terms-conditions">Terms & Conditions</Link> |
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Foote