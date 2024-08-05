import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredOrderId, setHoveredOrderId] = useState(null);

  useEffect(() => {
    const fetchedOrders = [
      {
        id: 1,
        customer: 'John Doe',
        items: [
          { id: 1, name: 'Cups', category: 'Pottery', price: 250, quantity: 2 },
          { id: 2, name: 'Modern Art', category: 'Art & Paintings', price: 1500, quantity: 1 },
        ],
      },
      {
        id: 2,
        customer: 'Jane Smith',
        items: [
          { id: 3, name: 'Wall hangings', category: 'Home Decors', price: 700, quantity: 1 },
          { id: 4, name: 'Teddy', category: 'Bouquets', price: 350, quantity: 3 },
        ],
      },
    ];
    setOrders(fetchedOrders);
  }, []);

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const styles = {
    adminOrdersPage: {
      padding: '40px',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    headerBar: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '40px',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: '700px',
      borderRadius: '30px',
      overflow: 'hidden',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      position: 'relative', // Ensure the search icon can be positioned correctly
    },
    searchBarInput: {
      flex: 1,
      padding: '12px 20px 12px 40px', // Adjust padding to make space for the icon
      border: 'none',
      outline: 'none',
      fontSize: '16px',
      color: '#333',
    },
    searchIcon: {
      position: 'absolute', // Position the icon absolutely within the search bar
      left: '10px', // Align the icon to the left side
      fontSize: '16px', // Adjust the size of the icon
      color: '#333',
      pointerEvents: 'none', // Make sure the icon doesn't interfere with clicking on the input
    },
    ordersContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
    },
    orderCard: {
      padding: '24px',
      border: '1px solid #e1e1e1',
      borderRadius: '12px',
      backgroundColor: '#ffcccc',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ...(hoveredOrderId && { transform: 'scale(1.05)' }),
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      color: '#000000',
    },
    orderDetails: {
      marginTop: '10px',
      paddingTop: '10px',
      borderTop: '1px solid #eee',
    },
    orderItem: {
      marginBottom: '15px',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
    },
    orderItemInfo: {
      color: '#333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    deleteButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      backgroundColor: '#000',
      color: '#ffcccc',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
    },
    deleteButtonHover: {
      backgroundColor: 'grey',
      color: 'white',
    },
  };

  return (
    <div style={styles.adminOrdersPage}>
      <div style={styles.headerBar}>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchBarInput}
          />
        </div>
      </div>

      <div style={styles.ordersContainer}>
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            style={styles.orderCard}
            onMouseEnter={() => setHoveredOrderId(order.id)}
            onMouseLeave={() => setHoveredOrderId(null)}
          >
            <div style={styles.orderHeader}>
              <div style={{ fontWeight: 'bold' }}>Order ID: {order.id}</div>
              <div>Customer: {order.customer}</div>
              <button
                style={styles.deleteButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor)}
                onClick={() => handleDeleteOrder(order.id)}
              >
                <FaTrash style={{ marginRight: '8px' }} />
                Delete
              </button>
            </div>
            <div style={styles.orderDetails}>
              {order.items.map((item) => (
                <div key={item.id} style={styles.orderItem}>
                  <div style={styles.orderItemInfo}>
                    <div>{item.name}</div>
                    <div>₹{item.price}</div>
                  </div>
                  <div style={styles.orderItemInfo}>
                    <div>Category: {item.category}</div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
