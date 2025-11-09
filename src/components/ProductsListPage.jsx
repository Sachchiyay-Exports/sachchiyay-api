// // src/components/ProductsListPage.jsx
// import React, { useState } from 'react'; // Import useState
// import Modal from './Modal'; // Import the Modal component (assuming it's in the same folder)

// const allProducts = [
//     { name: "Tumeric Powder", description: "Premium, high-curcumin content turmeric, enhancing both the flavor and health value of any dish.", image: "image/products/tumeric.jpg" },
//     { name: "Chilli Powder", description: "Fiery flavor and rich red hue, made from carefully selected premium-grade dried red chillies.", image: "image/products/chillipowder.jpg" },
//     { name: "Garlic Powder", description: "Finely ground, aromatic powder, serving as a convenient substitute for fresh garlic.", image: "image/products/garlic.jpg" },
//     // Add more products if needed for a full page...
// ];

// const ProductsListPage = () => {
//     // State for the Inquiry Modal
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     // WhatsApp Link Details
//     const whatsappMessage = encodeURIComponent("Hello Sachchiyay Exports, I am interested in the products on your All Products page and would like to place an inquiry.");
//     const whatsappLink = `https://wa.me/916353395275?text=${whatsappMessage}`;


//     return (
//         <section className="products-list-page" style={{ paddingTop: '100px', minHeight: '80vh', textAlign: 'center' }}>
//             <h2>All Sachchiyay Exports Products</h2>
//             <hr className="section-divider" />
            
//             <div className="product-list" style={{ justifyContent: 'space-around', margin: '0 auto', maxWidth: '1000px' }}>
//                 {allProducts.map((product, index) => (
//                     <div key={index} className="product-card" style={{ marginBottom: '30px' }}>
//                         <img src={product.image} alt={product.name} />
//                         <h4>{product.name}</h4>
//                         <p style={{ padding: '0 15px 15px' }}>{product.description}</p>
//                         <div className="card-actions">
//                             {/* Inquiry button opens the modal */}
//                             <button className="btn-inquiry" onClick={openModal}>Inquiry</button>
                            
//                             {/* WhatsApp button redirects with pre-filled message */}
//                             <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">WhatsApp</a>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Inquiry Modal Integration */}
//             <Modal isOpen={isModalOpen} onClose={closeModal} />
//         </section>
//     );
// };

// export default ProductsListPage;
