import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCreditCard, FaPaypal, FaUniversity } from 'react-icons/fa';
import '../styles/EventPage.css';
import handicraftSaleImg from '../assets/hc.jpeg';
import businessTipsImg from '../assets/bus.jpg';
import entrepreneurJourneyImg from '../assets/entr.jpg';

const defaultImage = 'path/to/default/image.jpg';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: '', 
  });


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      ...formData,
      eventName: event.title, 
    });
    setShowForm(true);
    setRegistrationSuccess(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        ...formData,
        paymentMethod: selectedPaymentMethod,
      });

      if (response.status === 200) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
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
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.image || defaultImage}
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
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
      </div>

      {showForm && !registrationSuccess && (
        <div className="registration-form-container">
          <h2>Register for {selectedEvent?.title}</h2>
          <form className="registration-form" onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="event-name">Event Name:</label>
            <input
              type="text"
              id="event-name"
              name="eventName"
              value={formData.eventName}
              readOnly
            />

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
          <button className="evbtn-primary" onClick={handleCloseSuccessMessage}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
