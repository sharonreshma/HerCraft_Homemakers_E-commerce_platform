import React, { useState } from 'react';
import '../styles/Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import contactImage from '../assets/girl.png';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/contact/submit', {
        name,
        email,
        message
      });

      if (response.status === 201) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Reach out to us through the form below or use the contact details provided.</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="contact-info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>Craft Lane, Art City, Coimbatore 12345</p>
          </div>
          <div className="contact-info-item">
            <FaPhoneAlt className="contact-icon" />
            <p>(+91) 977890874</p>
          </div>
          <div className="contact-info-item">
            <FaEnvelope className="contact-icon" />
            <p>hercraft@gmail.com</p>
          </div>
          <div className="contact-info-item">
            <img src={contactImage} alt="Contact" className="contact-image" />
          </div>
        </div>
        <div className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="csubmit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
