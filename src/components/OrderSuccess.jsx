import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OrderSuccess.css'; 

const OrderSuccess = () => {
  const location = useLocation();
  const { customer = {}, orderId } = location.state || {};

  if (!orderId) {
    return <p>Error: Order ID is missing.</p>;
  }

  return (
    <div className="order-success">
      <div className="order-success-content">
        <h1>Order Successful!</h1>
        <p>Your order has been placed successfully.</p>
        
        <div className="order-details">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Name:</strong> {customer.name || 'N/A'}</p>
          <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
          <p><strong>Address:</strong> {customer.address || 'N/A'}</p>
        </div>
        
        <div className="tracking-info">
          <h2>Track Your Delivery</h2>
          <p>We will send you an email with the tracking information once your order is on its way.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
