// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // FIX: Forces the window to scroll to the top (0, 0) whenever the URL path changes
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
};

export default ScrollToTop;