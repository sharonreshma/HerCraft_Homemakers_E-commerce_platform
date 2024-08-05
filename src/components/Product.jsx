import React, { useState } from 'react';
import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { FaSearch, FaShoppingBag, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.webp';
import p4 from '../assets/p4.webp';
import e1 from '../assets/e1.jpg';
import e2 from '../assets/e2.webp';
import e3 from '../assets/e3.jpeg';
import e4 from '../assets/e4.jpg';
import a1 from '../assets/a1.jpg';
import a2 from '../assets/a2.jpg';
import a3 from '../assets/a3.webp';
import a4 from '../assets/a4.jpg';
import m1 from '../assets/m1.jpg';
import m2 from '../assets/m2.jpg';
import m3 from '../assets/m3.jpg';
import m4 from '../assets/m4.jpeg';
import hh1 from '../assets/h1.jpg';
import hh2 from '../assets/h2.jpg';
import hh3 from '../assets/h3.jpeg';
import hh4 from '../assets/h4.webp';
import b1 from '../assets/b1.jpeg';
import b2 from '../assets/b2.jpg';
import b3 from '../assets/b3.avif';
import b4 from '../assets/b4.jpg';

const ProductsPage = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    'All',
    'Pottery',
    'Art & Paintings',
    'Home Decors',
    'Bouquets',
    'Eco-Friendly Goods',
    'Accessories',
  ];

  const products = [
    { id: 1, name: 'Cups', category: 'Pottery', price: 250, image: p3 },
    { id: 2, name: 'Modern Art', category: 'Art & Paintings', price: 1500, image: m1 },
    { id: 3, name: 'Wall hangings', category: 'Home Decors', price: 700, image: hh4 },
    { id: 4, name: 'Teddy', category: 'Bouquets', price: 350, image: b3 },
    { id: 5, name: 'Basket', category: 'Eco-Friendly Goods', price: 225, image: e2 },
    { id: 6, name: 'Keychains', category: 'Accessories', price: 75, image: a4 },
    { id: 7, name: 'Classic Pots', category: 'Pottery', price: 550, image: p2 },
    { id: 8, name: 'Plate Art', category: 'Art & Paintings', price: 500, image: m2 },
    { id: 9, name: 'Toys', category: 'Home Decors', price: 300, image: hh2 },
    { id: 10, name: 'Flower', category: 'Bouquets', price: 315, image: b2 },
    { id: 11, name: 'bag', category: 'Eco-Friendly Goods', price: 225, image: e3 },
    { id: 12, name: 'hair clips', category: 'Accessories', price: 110, image: a2 },
    { id: 13, name: 'Modern Pots', category: 'Pottery', price: 620, image: p4 },
    { id: 14, name: 'Indian Art', category: 'Art & Paintings', price: 450, image: m3 },
    { id: 15, name: 'Showpieces', category: 'Home Decors', price: 130, image: hh3 },
    { id: 16, name: 'Flower Basket', category: 'Bouquets', price: 215, image: b4 },
    { id: 17, name: 'plants', category: 'Eco-Friendly Goods', price: 125, image: e4 },
    { id: 18, name: 'Ear rings', category: 'Accessories', price: 70, image: a3 },
    { id: 19, name: 'Mud Pot', category: 'Pottery', price: 120, image: p1 },
    { id: 20, name: 'Stone Art', category: 'Art & Paintings', price: 80, image: m4 },
    { id: 21, name: 'Statues', category: 'Home Decors', price: 430, image: hh1 },
    { id: 22, name: 'Bouquet', category: 'Bouquets', price: 215, image: b1 },
    { id: 23, name: 'Essentials', category: 'Eco-Friendly Goods', price: 1625, image: e1 },
    { id: 24, name: 'Key holder', category: 'Accessories', price: 106, image: a1 }
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const productIndex = cartItems.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      const updatedCartItems = cartItems.map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (product) => {
    const productIndex = cartItems.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      const updatedCartItems = cartItems
        .map((item, index) =>
          index === productIndex ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      setCartItems(updatedCartItems);
    }
  };
  
    const location = useLocation();
  
    useEffect(() => {
      // Scroll to top when the component mounts or the location changes
      if (location.state?.scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [location]);

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming false means logged out

    const handleCheckout = () => {
      
        toast.success('Proceed to Payment!');
      } 
    
  

  const isInCart = (product) => cartItems.some((item) => item.id === product.id);

  const styles = {
    productsPage: {
      padding: '20px',
      backgroundColor: 'white',
    },
    headerBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      margin: '0 auto',
      width: '60%',
    },
    searchBarInput: {
      width: '100%',
      padding: '10px 20px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      outline: 'none',
      fontSize: '16px',
      color: '#333',
    },
    searchIcon: {
      position: 'absolute',
      right: '15px',
      color: '#555',
    },
    cartIcon: {
      display: 'flex',
      alignItems: 'center',
      color: '#555',
      fontSize: '24px',
      position: 'relative',
      cursor: 'pointer',
    },
    cartCount: {
      backgroundColor: '#ffb6c1',
      color: '#000',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '12px',
      position: 'absolute',
      top: '-10px',
      right: '-10px',
    },
    categories: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px',
      justifyContent: 'center',
    },
    categoryButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffb6c1',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    categoryButtonActive: {
      backgroundColor: '#ffb6c1',
      color: '#000',
    },
    productsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    productCard: {
      width: '23%',
      backgroundColor: '#FADADD',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(255, 182, 193, 0.5)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      position: 'relative',
      animation: 'bounceIn 0.6s', // Animation effect
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    },
    productDetails: {
      padding: '10px',
      textAlign: 'center',
    },
    productName: {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '10px 0',
      color: '#555',
    },
    productPrice: {
      fontSize: '16px',
      color: '#999',
      marginBottom: '10px',
    },
    addToCartButton: {
      padding: '8px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffb6c1',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    
    
    cartModal: {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#FADADD',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
    modalCloseButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '20px',
      color: '#fff',
      cursor: 'pointer',
    },
    cartItemsContainer: {
      maxHeight: '400px',
      overflowY: 'auto',
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    cartItemImage: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '5px',
      marginRight: '10px',
    },
    cartItemDetails: {
      flex: '1',
    },
    cartItemName: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    },
    cartItemPrice: {
      fontSize: '14px',
      color: '#666',
    },
    cartItemQuantity: {
      display: 'flex',
      alignItems: 'center',
    },
    quantityButton: {
      padding: '5px',
      border: 'none',
      borderRadius: '50%',
        backgroundColor: '#FADADD',
      
      color: '#000',
      cursor: 'pointer',
      margin: '0 5px',
    },
    totalPriceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      borderTop: '1px solid #ccc',
      marginTop: '20px',
    },
    totalPriceLabel: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
    totalPriceValue: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
    },
    checkoutButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffb6c1',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '16px',
      fontWeight: 'bold',
    },
  };
  
  return (
    <div style={styles.productsPage}>
      <div style={styles.headerBar}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchBarInput}
          />
          <FaSearch style={styles.searchIcon} />
        </div>
        <div style={styles.cartIcon} onClick={() => setIsModalOpen(true)}>
          <FaShoppingBag />
          {cartItems.length > 0 && <span style={styles.cartCount}>{cartItems.length}</span>}
        </div>
      </div>

      <div style={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              ...styles.categoryButton,
              ...(selectedCategory === category ? styles.categoryButtonActive : {}),
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={styles.productsContainer}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={styles.productCard}
            
          >
            <img src={product.image} alt={product.name} style={styles.productImage} />
            <div style={styles.productDetails}>
              <div style={styles.productName}>{product.name}</div>
              <div style={styles.productPrice}>₹{product.price}</div>
              <button
                onClick={() => addToCart(product)}
                style={{
                  ...styles.addToCartButton,
                  ...(isInCart(product) ? { backgroundColor: 'grey', color: '#fff' } : {}),
                }}
              >
                {isInCart(product) ? 'In Bag' : 'Add to Bag'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={styles.cartModal}>
        <span style={styles.modalCloseButton} onClick={() => setIsModalOpen(false)}>
          &times;
        </span>
        <h2>Items in Bag</h2>
        <div style={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartItemImage} />
              <div style={styles.cartItemDetails}>
                <div style={styles.cartItemName}>{item.name}</div>
                <div style={styles.cartItemPrice}>₹{item.price}</div>
                <div style={styles.cartItemQuantity}>
                  <button
                    onClick={() => removeFromCart(item)}
                    style={styles.quantityButton}
                  >
                    <FaMinusCircle />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    style={styles.quantityButton}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.totalPriceContainer}>
          <div style={styles.totalPriceLabel}>Total:</div>
          <div style={styles.totalPriceValue}>
            ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
          </div>
        </div>
        <button style={styles.checkoutButton} onClick={handleCheckout}>
      Checkout
    </button>
    <ToastContainer />
      </Modal>
    </div>
  );
};

export default ProductsPage;
