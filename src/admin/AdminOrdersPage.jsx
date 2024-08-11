import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTrash } from 'react-icons/fa';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders'); // Ensure the URL is correct
        setOrders(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`); // Ensure the URL is correct
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
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
      position: 'relative',
    },
    searchBarInput: {
      flex: 1,
      padding: '12px 20px 12px 40px',
      border: 'none',
      outline: 'none',
      fontSize: '16px',
      color: '#333',
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      fontSize: '16px',
      color: '#333',
      pointerEvents: 'none',
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    orderId: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#000',
    },
    customerName: {
      fontSize: '16px',
      color: '#555',
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        {filteredOrders.length === 0 ? (
          <div>No orders found</div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              style={styles.orderCard}
              onMouseEnter={() => setHoveredOrderId(order.id)}
              onMouseLeave={() => setHoveredOrderId(null)}
            >
              <div style={styles.orderHeader}>
                <div style={styles.orderId}>Order ID: {order.orderId}</div>
                <div style={styles.customerName}>Customer: {order.customerName}</div>
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
                      <div>Product: {item.itemName}</div>
                      <div>Category: {item.itemCategory}</div>
                      
                    </div>
                    <div style={styles.orderItemInfo}>
                    <div>Price: ₹{item.itemPrice}</div>
                      <div>Quantity: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
