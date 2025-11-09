// // src/components/Products.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from './Modal'; 
// import ProductDetailsModal from './ProductDetailsModal'; // Assuming this component exists

// const productData = [
//   { name: "Tumeric Powder", image: "image/products/tumeric.jpg", description: "Rich golden color with high curcumin content, perfect for enhancing flavor and health benefits." },
//   { name: "Chilli Powder", image: "image/products/chillipowder.jpg", description: "Fiery red chillies, sun-dried and ground to perfection, ensuring purity and authentic aroma." },
//   { name: "Garlic Powder", image: "image/products/garlic.jpg", description: "Finely ground powder, a convenient and potent substitute for fresh garlic in any cuisine." },
// ];

// const Products = () => {
//   const navigate = useNavigate(); 
//   const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false); // State for the GENERAL Inquiry Modal
//   const [selectedProduct, setSelectedProduct] = useState(null); // State for the Product Details Modal

//   const openGeneralModal = () => setIsGeneralModalOpen(true);
//   const closeGeneralModal = () => setIsGeneralModalOpen(false);
  
//   // Handlers for the new Product Details Modal
//   const openProductDetailsModal = (product) => {
//       setSelectedProduct(product);
//   }
//   const closeProductDetailsModal = () => {
//       setSelectedProduct(null);
//   }

//   // Handler for "View All" button
//   const handleViewAll = () => {
//       navigate('/products'); 
//   };

//   return (
//     <section className="products" id="products-section"> 
//       <h2>Products</h2>
//       <hr className="section-divider" />

//       <div className="product-list">
//         {productData.map((product, index) => {
          
//           // FIX: Define the WhatsApp message and link INSIDE the loop
//           // This link is for the general Inquiry/WhatsApp button shown on the card
//           const whatsappMessage = encodeURIComponent(`Hello Sachchiyay Exports, I am interested in your products and would like to place an inquiry.`);
//           const whatsappLink = `https://wa.me/916353395275?text=${whatsappMessage}`;

//           return (
//             <div 
//                 key={index} 
//                 className="product-card"
//                 onClick={() => openProductDetailsModal(product)} // Opens product details on card click
//             >
//               <img src={product.image} alt={product.name} />
//               <h4>{product.name}</h4>
//               <div className="card-actions" onClick={(e) => e.stopPropagation()}> {/* Prevents card click when buttons are pressed */}
//                 <button className="btn-inquiry" onClick={openGeneralModal}>Inquiry</button>
//                 <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">WhatsApp</a>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="view-all-container">
//         <button className="btn-primary" onClick={handleViewAll}>View All</button>
//       </div>

//       {/* 1. General Inquiry Modal (Opened by button click) */}
//       <Modal isOpen={isGeneralModalOpen} onClose={closeGeneralModal} />
      
//       {/* 2. Product Details Modal (Opened by card click) */}
//       <ProductDetailsModal 
//           isOpen={!!selectedProduct} 
//           onClose={closeProductDetailsModal} 
//           product={selectedProduct} 
//           openGeneralModal={openGeneralModal} // Passes the function needed for the button inside the modal
//       />
//     </section>
//   );
// };

// export default Products;
