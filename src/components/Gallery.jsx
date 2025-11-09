// src/components/Gallery.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const galleryItems = [
    { 
        imgSrc: "image/gallery/img1.jpg", 
        title: "Tumeric Powder", 
        description: "Sacchchiyay Spices Turmeric Powder is derived from handpicked turmeric rhizomes, naturally dried and ground to deliver a rich golden color and earthy aroma. Known for its purity and high curcumin content, our turmeric enhances both the flavor and health value of any dish." 
    },
    { 
        imgSrc: "image/gallery/img2.jpg", 
        title: "Red Chilli Powder", 
        description: "Sacchchiyay Spices Red Chilli Powder is made from carefully selected premium-grade dried red chillies, sun-dried and ground to perfection to retain their natural color, aroma, and heat. Known for its rich red hue and fiery flavor, our chilli powder adds the perfect spice and zest to any cuisine worldwide." 
    },
    { 
        imgSrc: "image/gallery/img3.png", 
        title: "Garlic Powder", 
        description: "Sacchchiyay Spices Garlic Powder is crafted from the finest quality garlic cloves, dehydrated and finely ground to preserve its natural pungency and flavor. It serves as a convenient and aromatic substitute for fresh garlic, ideal for seasoning blends, sauces, and instant foods." 
    },
];

const Gallery = () => {
    const navigate = useNavigate();
    
    // Handler for "View All" button
    const handleViewAll = () => {
        navigate('/gallery'); // Redirects to the dedicated gallery page route
    };

    return (
        <section className="gallery" id="gallery-section">
            <h2>Gallery</h2>
            <hr className="section-divider" />
            <div className="gallery-list">
                {galleryItems.map((item, index) => (
                    <div key={index} className="gallery-item">
                        {/* FIX APPLIED HERE: Use {} to embed JavaScript, and backticks (`) for the template literal */}
                        <img src={item.imgSrc} alt={`${item.title} img${index + 1}`} /> 
                        <p>
                            <b>{item.title}</b><br/><br/>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
            {/* View All Button now uses routing */}
            <button className="btn-primary" onClick={handleViewAll}>View All</button>
        </section>
    );
};

export default Gallery;