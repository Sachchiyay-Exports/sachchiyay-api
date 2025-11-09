// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // FIX: Force scroll position to (0, 0) whenever the route path changes
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
};

export default ScrollToTop;