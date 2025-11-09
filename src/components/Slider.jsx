// // src/components/Slider.jsx
// import React, { useState, useEffect, useCallback } from 'react';

// const sliderImages = [
//   { src: "image/sliders/slider1.jpg", alt: "Sachchiyay Exports Global Map", caption: null },
//   { src: "image/sliders/slider2.png", alt: "Red Chili Powder", caption: "Red Chili Powder - Sachchiyay Spices" },
//   { src: "image/sliders/slider3.png", alt: "Turmeric Powder", caption: "Turmeric Powder - Sachchiyay Spices" },
//   { src: "image/sliders/slider4.jpg", alt: "Garlic Powder", caption: "Garlic Powder - Sachchiyay Spices" },
// ];

// const Slider = () => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   const showSlides = useCallback((index) => {
//     let newIndex = index;
//     if (newIndex >= sliderImages.length) newIndex = 0;
//     if (newIndex < 0) newIndex = sliderImages.length - 1;
//     setSlideIndex(newIndex);
//   }, []);

//   // Auto Slide Effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       showSlides(slideIndex + 1);
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [slideIndex, showSlides]);

//   const plusSlides = (n) => {
//     showSlides(slideIndex + n);
//   };

//   const currentSlide = (n) => {
//     showSlides(n - 1);
//   };

//   return (
//     <section className="slider-container">
//       <div className="slider-wrapper">
//         {sliderImages.map((slide, index) => (
//           <div 
//             key={index} 
//             // FIX 1: Must wrap the template literal in curly braces {}
//             className={`slide fade`} 
//             style={{ display: index === slideIndex ? 'block' : 'none' }}>
//             <img src={slide.src} alt={slide.alt} className="slider-image" />
//             {slide.caption && <div className="slide-caption">{slide.caption}</div>}
//           </div>
//         ))}

//         <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
//         <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
//       </div>

//       <div style={{ textAlign: "center", marginTop: "15px" }}>
//         {sliderImages.map((_, index) => (
//           <span
//             key={index}
//             // FIX 2: Must wrap the template literal in curly braces {}
//             className={`dot ${index === slideIndex ? 'active' : ''}`}
//             onClick={() => currentSlide(index + 1)}
//           ></span>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Slider;
