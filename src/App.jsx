// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Import All Page Components
import ScrollToTop from './components/ScrollToTop'; // 👈 Must be created to fix the scroll issue
import Slider from './components/Slider';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import Gallery from './components/Gallery';
import InquiryForm from './components/InquiryForm';
import ContactDetails from './components/ContactDetails';
import ProductsListPage from './components/ProductsListPage'; 

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop /> {/* FIX 1: Monitors route changes and resets scroll position to the top */}
      
      <main>
        <Routes>
          {/* 1. HOME PAGE (Single-Page Layout for the main content block) */}
          <Route path="/" element={
            <>
              <Slider />
              {/* NOTE: AboutUs is now a dedicated page, so it's REMOVED from the homepage layout */}
              <AboutUs />
              <Products />
              <Gallery />
              <InquiryForm />
              <ContactDetails />
            </>
          } />
          
          {/* 2. DEDICATED ABOUT US PAGE (New Route, removed from home page) */}
          <Route path="/about" element={
            <div style={{paddingTop: '100px'}}><AboutUs isDedicatedPage={true} /></div>
          } />

          {/* 3. DEDICATED PRODUCTS LIST PAGE (For "View All" button) */}
          <Route path="/products" element={<ProductsListPage />} />
          
          {/* 4. DEDICATED GALLERY PAGE */}
          <Route path="/gallery" element={
            <div style={{paddingTop: '100px'}}><Gallery isDedicatedPage={true} /></div>
          } />

          {/* 5. DEDICATED INQUIRY PAGE */}
          <Route path="/inquiry" element={
            <div style={{paddingTop: '100px'}}><InquiryForm isDedicatedPage={true} /></div>
          } />

          {/* 6. DEDICATED CONTACT DETAILS PAGE */}
          <Route path="/contact" element={
            <div style={{paddingTop: '100px'}}><ContactDetails isDedicatedPage={true} /></div>
          } />
          
          {/* 7. LINKS PAGE (Placeholder) */}
          {/* <Route path="/links" element={<div style={{paddingTop: '100px', minHeight: '80vh', textAlign: 'center'}}></div>} /> */}

      </Routes>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;