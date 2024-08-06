import React from 'react';
import '../styles/PaymentPage.css';
import visaIcon from './icons/visa.png'; // Include payment icons
import mastercardIcon from './icons/mastercard.png';
import paypalIcon from './icons/paypal.png';

const PaymentPage = ({ orders }) => {
  const totalAmount = orders.reduce((acc, order) => acc + order.price, 0).toFixed(2);

  return (
    <div className="payment-page">
      <div className="order-summary">
        <h2 className="summary-title">Order Summary</h2>
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <span>{order.name}</span>
              <span>${order.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="order-total">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </div>
      </div>
      <div className="payment-section">
        <h1 className="title">Payment</h1>
        <form className="payment-form">
          <div className="form-group">
            <label className="form-label">Cardholder Name</label>
            <input type="text" className="form-input" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input type="text" className="form-input" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiration Date</label>
              <input type="text" className="form-input" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label className="form-label">CVV</label>
              <input type="text" className="form-input" placeholder="123" />
            </div>
          </div>
          <div className="payment-icons">
            <img src={visaIcon} alt="Visa" className="payment-icon" />
            <img src={mastercardIcon} alt="MasterCard" className="payment-icon" />
            <img src={paypalIcon} alt="PayPal" className="payment-icon" />
          </div>
          <button type="submit" className="submit-button">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
