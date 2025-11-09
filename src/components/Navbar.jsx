// // src/components/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls the sidebar open/close
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls the Products dropdown (.show class)

//     // 1. Scroll Effect (and others) remain the same
//     useEffect(() => {
//         const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // 2. Body Class Effect (Locks scroll/enables overlay)
//     useEffect(() => {
//         if (isMenuOpen) {
//             document.body.classList.add('menu-open');
//         } else {
//             document.body.classList.remove('menu-open');
//             setIsDropdownOpen(false);
//         }
//     }, [isMenuOpen]);

//     // 3. Window Resize Effect (Fixes stuck menu on desktop resizing)
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth > 768) {
//                 setIsMenuOpen(false);
//                 setIsDropdownOpen(false);
//             }
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // 4. Handlers for desktop hover
//     const handleMouseEnter = () => { if (window.innerWidth > 768) { setIsDropdownOpen(true); } };
//     const handleMouseLeave = () => { if (window.innerWidth > 768) { setIsDropdownOpen(false); } };

//     // 5. Click handler for mobile (toggles product dropdown)
//     const handleProductClick = (e) => {
//         if (window.innerWidth <= 768) {
//             e.preventDefault();
//             setIsDropdownOpen(prev => !prev);
//         }
//     };

//     // 6. Mobile Menu Toggle (opens sidebar)
//     const handleMenuToggle = () => {
//         setIsMenuOpen(prev => !prev);
//     };
    
//     // 7. Explicit Close Button Handler (the 'X' button)
//     const handleCloseMenu = () => {
//         setIsMenuOpen(false);
//         setIsDropdownOpen(false);
//     }

//     // 8. Helper for anchor scrolling on the Home page (Simplified: Only for internal anchors on home)
//     const handleAnchorLinkClick = (e, targetId) => {
//         // Since About Us is now a dedicated page, this is only needed for future anchors.
//         if (window.location.pathname === '/' && targetId) {
//             e.preventDefault();
            
//             const targetElement = document.querySelector(targetId);
//             const navbarHeight = 80; 

//             if (targetElement) {
//                 const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
//                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
//             }

//             // Close sidebar after clicking link on mobile
//             if (window.innerWidth <= 768) {
//                  setIsMenuOpen(false);
//             }
//         }
//     };

//     return (
//         <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//             <div className="logo">
//                 <img src="image/logo.jpg" alt="Sachchiyay Exports Logo" />
//             </div>

//             <div className="menu-toggle" id="menu-toggle" onClick={handleMenuToggle}>
//                 ☰ 
//             </div>

//             {/* Backdrop: Visible only when menu is open on mobile to dim content */}
//             {isMenuOpen && window.innerWidth <= 768 && <div className="sidebar-backdrop" onClick={handleCloseMenu}></div>}

//             {/* Navbar Menu: Side Bar on Mobile, Horizontal on Desktop */}
//             <nav id="nav-menu" className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                
//                 {/* Mobile Header with Close Button */}
//                 <div className="mobile-header">
//                     <h3>Menu</h3>
//                     <button className="close-button-mobile" onClick={handleCloseMenu}>&times;</button>
//                 </div>

//                 <ul>
//                     {/* Home button uses Link to the root path */}
//                     <li><Link to="/" onClick={handleCloseMenu}>Home</Link></li> 
                    
//                     {/* FIX: ABOUT US is now a dedicated route */}
//                     <li><Link to="/about" onClick={handleCloseMenu}>About Us</Link></li>
                    
//                     {/* Dropdown container */}
//                     <li className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//                         <Link to="/products" id="product-toggle" onClick={handleProductClick}>Products ▾</Link>
                        
//                         <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} id="product-dropdown">
//                             <li><Link to="/products" onClick={handleCloseMenu}>Tumeric Powder</Link></li>
//                             <li><Link to="/products" onClick={handleCloseMenu}>Chilli Powder</Link></li>
//                             <li><Link to="/products" onClick={handleCloseMenu}>Garlic Powder</Link></li>
//                         </ul>
//                     </li>
                    
//                     <li><Link to="/gallery" onClick={handleCloseMenu}>Gallery</Link></li>
//                     <li><Link to="/inquiry" onClick={handleCloseMenu}>Inquiry</Link></li>
                    
//                     {/* RESTORED MISSING LINKS */}
//                     {/* <li><Link to="/contact" onClick={handleCloseMenu}>Contact Details</Link></li>
//                     <li><Link to="/links" onClick={handleCloseMenu}>Links</Link></li> */}
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Navbar;
