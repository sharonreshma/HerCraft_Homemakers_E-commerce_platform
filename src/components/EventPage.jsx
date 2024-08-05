import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaUniversity } from 'react-icons/fa';
import '../styles/EventPage.css';
import handicraftSaleImg from '../assets/hc.jpeg';
import businessTipsImg from '../assets/bus.jpg';
import entrepreneurJourneyImg from '../assets/entr.jpg';

const events = [
  {
    id: 1,
    title: 'Handicraft Sale Extravaganza',
    date: 'August 15, 2024',
    description: 'Join us for an exciting sale on a wide range of unique handicrafts. Enjoy exclusive discounts and find the perfect handmade items for yourself or as gifts.',
    image: handicraftSaleImg,
    price: 10, // Example price for the event
  },
  {
    id: 2,
    title: 'Business Tips for Craft Entrepreneurs',
    date: 'August 22, 2024',
    description: 'A special talk on effective business strategies and tips for handicraft entrepreneurs. Learn from industry experts and elevate your business game.',
    image: businessTipsImg,
    price: 15, // Example price for the event
  },
  {
    id: 3,
    title: 'My Journey as an Entrepreneur',
    date: 'August 29, 2024',
    description: 'An inspiring journey of Sita founder of JustCraft where she will share key challenges, successes, and insights from her experience.',
    image: entrepreneurJourneyImg,
    price: 20, // Example price for the event
  },
];

const EventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
    setRegistrationSuccess(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  const handlePayment = () => {
    if (selectedPaymentMethod) {
      setRegistrationSuccess(true);
    } else {
      alert('Please select a payment method.');
    }
  };

  const handleCloseSuccessMessage = () => {
    setRegistrationSuccess(false);
    setShowForm(false);
  };

  return (
    <div className="event-page-container">
      <h1 className="event-header">Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img
              src={event.image}
              alt={event.title}
              className={`event-image ${event.id === 3 ? 'event-image-entrepreneur' : ''}`}
            />
            <h2 className="event-title">{event.title}</h2>
            <p className="event-date">{event.date}</p>
            <p className="event-description">{event.description}</p>
            <p className="event-price">Price: ₹{event.price}</p>
            <button
              className="evbtn-primary"
              onClick={() => handleRegisterClick(event)}
            >
              Register Now
            </button>
          </div>
        ))}
      </div>

      {showForm && !registrationSuccess && (
        <div className="registration-form-container">
          <h2>Register for {selectedEvent.title}</h2>
          <form className="registration-form" onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required />

            <label htmlFor="payment-method">Choose Payment Method:</label>
            <div className="payment-method-options">
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="Credit Card"
                  checked={selectedPaymentMethod === 'Credit Card'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                />
                <FaCreditCard /> Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="PayPal"
                  checked={selectedPaymentMethod === 'PayPal'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                />
                <FaPaypal /> PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="payment-method"
                  value="Bank Transfer"
                  checked={selectedPaymentMethod === 'Bank Transfer'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                />
                <FaUniversity /> Bank Transfer
              </label>
            </div>

            <button type="submit" className="evbtn-primary">
              Proceed to Payment
            </button>
          </form>
        </div>
      )}

      {registrationSuccess && (
        <div className="registration-success">
          <p>Registration successful! Thank you for being a part of this event.</p>
          <button
            className="evbtn-primary"
            onClick={handleCloseSuccessMessage}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
