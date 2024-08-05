import React, { useState, useEffect } from 'react';
import {
  FaCreditCard,
  FaPaypal,
  FaUniversity,
  FaPlusCircle,
  FaListAlt,
  FaCalendarAlt,
  FaTrash,
} from 'react-icons/fa';
import '../styles/AdminEventPage.css';

const initialEvents = [
  {
    id: 1,
    title: 'Handicraft Sale Extravaganza',
    date: 'August 15, 2024',
    description: 'Join us for an exciting sale on a wide range of unique handicrafts.',
    image: 'path_to_image1',
    price: 10,
    icon: <FaCalendarAlt className="icon-event" />,
    users: [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '123-456-7890', paymentMethod: 'Credit Card' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '987-654-3210', paymentMethod: 'PayPal' },
    ],
  },
  {
    id: 2,
    title: 'Business Tips for Craft Entrepreneurs',
    date: 'August 22, 2024',
    description: 'A special talk on effective business strategies and tips for handicraft entrepreneurs.',
    image: 'path_to_image2',
    price: 15,
    icon: <FaCalendarAlt className="icon-event" />,
    users: [
      { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', contact: '111-222-3333', paymentMethod: 'Bank Transfer' },
      { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', contact: '444-555-6666', paymentMethod: 'Credit Card' },
    ],
  },
  {
    id: 3,
    title: 'My Journey as an Entrepreneur',
    date: 'August 29, 2024',
    description: 'An inspiring journey of Sita, founder of JustCraft.',
    image: 'path_to_image3',
    price: 20,
    icon: <FaCalendarAlt className="icon-event" />,
    users: [
      { id: 5, name: 'Charlie Williams', email: 'charlie.williams@example.com', contact: '777-888-9999', paymentMethod: 'PayPal' },
      { id: 6, name: 'Diana Wilson', email: 'diana.wilson@example.com', contact: '000-111-2222', paymentMethod: 'Bank Transfer' },
    ],
  },
];

const AdminEventPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    image: '',
    price: '',
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // Fetch initial list of users or use default users from events
    const users = events.flatMap(event => event.users);
    setRegisteredUsers(users);
  }, [events]);

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

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventWithId = {
      ...newEvent,
      id: events.length + 1,
      icon: <FaCalendarAlt className="icon-event" />,
      users: [], // No users initially
    };
    setEvents([...events, newEventWithId]);
    setNewEvent({
      title: '',
      date: '',
      description: '',
      image: '',
      price: '',
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleSortUsersByEvent = (eventId) => {
    const event = events.find(event => event.id === eventId);
    if (event) {
      setRegisteredUsers(event.users);
    }
  };

  return (
    <div className="admin-event-page-container">
      <h1 className="admin-header">Admin Events Dashboard</h1>

      <section className="add-event-form-container">
        <h2><FaPlusCircle /> Add New Event</h2>
        <form className="add-event-form" onSubmit={handleAddEvent}>
          <label htmlFor="event-title">Title:</label>
          <input
            type="text"
            id="event-title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />

          <label htmlFor="event-date">Date:</label>
          <input
            type="date"
            id="event-date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />

          <label htmlFor="event-description">Description:</label>
          <textarea
            id="event-description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            required
          ></textarea>

          <label htmlFor="event-image">Image URL:</label>
          <input
            type="text"
            id="event-image"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            required
          />

          <label htmlFor="event-price">Price:</label>
          <input
            type="number"
            id="event-price"
            value={newEvent.price}
            onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
            required
          />

          <button type="submit" className="adevbtn-primary">
            Add Event
          </button>
        </form>
      </section>

      {showForm && !registrationSuccess && (
        <div className="adregistration-form-container">
          <h2>Register for {selectedEvent.title}</h2>
          <form className="registration-form" onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />

            <label htmlFor="contact">Contact Number:</label>
            <input type="text" id="contact" required />

            <h3>Payment Method</h3>
            <div className="payment-method-options">
              <label>
                <input
                  type="radio"
                  value="Credit Card"
                  checked={selectedPaymentMethod === 'Credit Card'}
                  onChange={() => setSelectedPaymentMethod('Credit Card')}
                />
                <FaCreditCard /> Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="PayPal"
                  checked={selectedPaymentMethod === 'PayPal'}
                  onChange={() => setSelectedPaymentMethod('PayPal')}
                />
                <FaPaypal /> PayPal
              </label>
              <label>
                <input
                  type="radio"
                  value="Bank Transfer"
                  checked={selectedPaymentMethod === 'Bank Transfer'}
                  onChange={() => setSelectedPaymentMethod('Bank Transfer')}
                />
                <FaUniversity /> Bank Transfer
              </label>
            </div>

            <button type="submit" className="adevbtn-primary">
              Register
            </button>
          </form>
        </div>
      )}

      {registrationSuccess && (
        <div className="adregistration-success">
          <h2>Registration Successful!</h2>
          <p>Thank you for registering. We look forward to seeing you at the event!</p>
          <button className="adevbtn-primary" onClick={handleCloseSuccessMessage}>
            Close
          </button>
        </div>
      )}

      <section className="aduser-list-container">
        <h2><FaListAlt /> Registered Users</h2>
        <div>
          <label>Sort by Event: </label>
          <select onChange={(e) => handleSortUsersByEvent(Number(e.target.value))}>
            <option value="">All Users</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="adevent-list-container">
        <h2><FaListAlt /> Events</h2>
        <div className="adevent-list">
          {events.map((event) => (
            <div className="adevent-card" key={event.id}>
              <div className="adevent-icon">{event.icon}</div>
              <div className="adevent-info">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <p>Price: ₹{event.price}</p>
              </div>
              <div className="adevent-actions">
                
                <button className="adevbtn-delete" onClick={() => handleDeleteEvent(event.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminEventPage;
