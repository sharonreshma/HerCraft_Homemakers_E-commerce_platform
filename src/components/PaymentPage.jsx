import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PaymentPage.css';
import visaIcon from '../assets/visa.png';
import mastercardIcon from '../assets/mastercard.png';
import paypalIcon from '../assets/paypal.png';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = location.state || {};

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  useEffect(() => {
    // Load user details from local storage or context
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCustomerDetails({
        ...customerDetails,
        name: user.username || '',
        email: user.email || '',
      });
    }
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in customerDetails) {
      setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    } else {
      setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const validateCartItems = () => {
    const invalidItems = cartItems.filter(item => !item.category);
    if (invalidItems.length > 0) {
      alert('Some items are missing a category. Please update your cart.');
      return false;
    }
    return true;
  };

  const validatePaymentDetails = () => {
    const { cardholderName, cardNumber, expirationDate, cvv } = paymentDetails;
    if (!cardholderName || !cardNumber || !expirationDate || !cvv) {
      alert('Please fill in all payment details.');
      return false;
    }
    // Add further validation for cardNumber, expirationDate, cvv if needed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCartItems() || !validatePaymentDetails()) return; // Validate before proceeding

    const items = cartItems.map(item => ({
      itemName: item.name,
      itemCategory: item.category,
      quantity: item.quantity,
      itemPrice: item.price,
    }));

    const orderData = {
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      customerAddress: customerDetails.address,
      totalAmount: totalAmount,
      items: items,
    };

    try {
    
      const orderResponse = await axios.post('http://localhost:8080/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (orderResponse.status === 200) {
        const { orderId } = orderResponse.data;

        
        const paymentData = {
          cardholderName: paymentDetails.cardholderName,
          cardNumber: paymentDetails.cardNumber,
          expirationDate: paymentDetails.expirationDate,
          cvv: paymentDetails.cvv
        };

        const paymentResponse = await axios.post('http://localhost:8080/api/payments', paymentData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (paymentResponse.status === 200) {
          navigate('/ordersuccess', { state: { customer: customerDetails, orderId } });
        } else {
          alert('Payment failed. Please try again.');
        }
      } else {
        alert('Order creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    alert('Payment has been canceled.');
    navigate('/cart');
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="left-section">
          <div className="customer-details">
            <h2 className="details-title">Customer Details</h2>
            <div className="details-group">
              <label className="details-label">Name:</label>
              <input
                type="text"
                className="details-input"
                name="name"
                value={customerDetails.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="details-group">
              <label className="details-label">Email:</label>
              <input
                type="email"
                className="details-input"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                placeholder="example123@gmail.com"
                required
              />
            </div>
            <div className="details-group">
              <label className="details-label">Phone:</label>
              <input
                type="tel"
                className="details-input"
                name="phone"
                value={customerDetails.phone}
                onChange={handleChange}
                placeholder="+91-AAAAA BBBBB"
                required
              />
            </div>
            <div className="details-group">
              <label className="details-label">Shipping Address:</label>
              <textarea
                className="details-input"
                name="address"
                value={customerDetails.address}
                onChange={handleChange}
                placeholder="123, New Bus Stand Road, R.S. Puram, Coimbatore, Tamil Nadu, 641002, India"
                required
              />
            </div>
          </div>
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.name}</span>
                <span className="item-category">({item.category || 'Unknown'})</span>
                <span className="item-quantity">x {item.quantity}</span>
                <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="payment-section">
            <h2 className="title">Payment</h2>
            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  className="form-input"
                  name="cardholderName"
                  value={paymentDetails.cardholderName}
                  onChange={handleChange}
                  placeholder="Cardholder's Name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-input"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="Enter Card Number"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Expiration Date</label>
                  <input
                    type="text"
                    className="form-input"
                    name="expirationDate"
                    value={paymentDetails.expirationDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-input"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <div className="payment-icons">
                <img src={visaIcon} alt="Visa" className="payment-icon" />
                <img src={mastercardIcon} alt="MasterCard" className="payment-icon" />
                <img src={paypalIcon} alt="PayPal" className="payment-icon" />
              </div>
              <div className="payment-buttons">
                <button type="submit" className="submit-button">Pay Now</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
