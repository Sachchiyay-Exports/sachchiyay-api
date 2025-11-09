// // src/components/ProductDetailsModal.jsx
// import React from 'react';

// const ProductDetailsModal = ({ isOpen, onClose, product, openGeneralModal }) => { 
//     if (!isOpen || !product) {
//         return null;
//     }
    
//     const whatsappMessage = encodeURIComponent(`Hello Sachchiyay Exports, I am interested in your product: ${product.name}.`);
//     const whatsappLink = `https://wa.me/916353395275?text=${whatsappMessage}`;

//     // Handler for the Inquiry button inside the modal
//     const handleInquiryClick = () => {
//         onClose(); 
//         openGeneralModal(); 
//     }

//     return (
//         <div id="productDetailsModal" className="modal" style={{ display: 'flex' }}>
//             <div 
//                 className="modal-content" 
//                 style={{ 
//                     maxWidth: '850px', // Increased max-width to fit horizontal content
//                     padding: '0', 
//                     backgroundColor: '#fff', 
//                     zIndex: 1001 
//                 }}
//             >
                
//                 <div className="modal-header" style={{backgroundColor: '#6B3E26'}}>
//                     <h3>Product Details: {product.name}</h3>
//                     <button className="close-button" onClick={onClose}>&times;</button>
//                 </div>
                
//                 {/* FIX: Main Content Container uses Flexbox for horizontal layout */}
//                 <div 
//                     style={{ 
//                         display: 'flex', 
//                         flexDirection: 'row', 
//                         padding: '20px', 
//                         gap: '20px', // Spacing between image and text
//                         alignItems: 'flex-start' // Align content to the top
//                     }}
//                 >
                    
//                     {/* Image Container (Takes fixed width or flex-basis) */}
//                     <div className="product-modal-image" style={{ width: '40%', flexShrink: 0 }}>
//                         <img 
//                             src={product.image} 
//                             alt={product.name} 
//                             style={{ 
//                                 width: '100%', 
//                                 maxHeight: '300px', 
//                                 height: 'auto', 
//                                 borderRadius: '8px', 
//                                 objectFit: 'cover' 
//                             }} 
//                         />
//                     </div>
                    
//                     {/* Text and Button Container (Takes remaining space) */}
//                     <div className="product-modal-info" style={{ width: '60%' }}>
//                         <h4 style={{ color: '#4A2613', fontSize: '1.4em', marginBottom: '10px', marginTop: '5px' }}>{product.name}</h4> 
                        
//                         <p style={{ margin: '15px 0 25px 0', fontSize: '1em', color: '#3a2e28' }}>
//                             {product.description || "Premium quality spice sourced directly from Indian farms, ensuring purity and authentic aroma."}
//                         </p>

//                         <div 
//                             className="card-actions" 
//                             onClick={(e) => e.stopPropagation()} 
//                             style={{ 
//                                 display: 'flex', 
//                                 justifyContent: 'flex-start', 
//                                 borderTop: 'none', 
//                                 padding: '0', 
//                                 gap: '10px',
//                                 backgroundColor: 'transparent',
//                                 zIndex: 10 
//                             }}
//                         >
//                             {/* Inquiry button */}
//                             <button 
//                                 className="btn-inquiry" 
//                                 onClick={handleInquiryClick}
//                             >
//                                 Inquiry
//                             </button> 
                            
//                             {/* WhatsApp link */}
//                             <a 
//                                 href={whatsappLink} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer" 
//                                 className="btn-whatsapp"
//                             >
//                                 WhatsApp
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailsModal;
