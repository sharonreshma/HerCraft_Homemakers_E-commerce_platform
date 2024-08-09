import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import { FaSearch, FaShoppingBag, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming false means logged out
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/products/getall')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const categories = [
    'All',
    'Pottery',
    'Art & Paintings',
    'Home Decors',
    'Bouquets',
    'Eco-Friendly Goods',
    'Accessories',
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

  const handleCheckout = () => {
    navigate('/paymentpage', { state: { cartItems } });
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
            placeholder="Search..."
            style={styles.searchBarInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch style={styles.searchIcon} />
        </div>
        <div
          style={styles.cartIcon}
          onClick={() => setIsModalOpen(true)}
        >
          <FaShoppingBag />
          <div style={styles.cartCount}>{cartItems.length}</div>
        </div>
      </div>

      <div style={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            style={
              selectedCategory === category
                ? { ...styles.categoryButton, ...styles.categoryButtonActive }
                : styles.categoryButton
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={styles.productsContainer}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.image} alt={product.name} style={styles.productImage} />
            <div style={styles.productDetails}>
              <div style={styles.productName}>{product.name}</div>
              <div style={styles.productPrice}>₹{product.price.toFixed(2)}</div>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={styles.cartModal}
        contentLabel="Cart"
      >
        <div style={styles.modalCloseButton} onClick={() => setIsModalOpen(false)}>
          ×
        </div>
        <h2>Items in Bag</h2>
        <div style={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartItemImage} />
              <div style={styles.cartItemDetails}>
                <div style={styles.cartItemName}>{item.name}</div>
                <div style={styles.cartItemQuantity}>
                  <button
                    style={styles.quantityButton}
                    onClick={() => removeFromCart(item)}
                  >
                    <FaMinusCircle />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    style={styles.quantityButton}
                    onClick={() => addToCart(item)}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button style={styles.checkoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ProductsPage;
