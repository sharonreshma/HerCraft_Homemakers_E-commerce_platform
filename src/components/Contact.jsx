import React from 'react';
import '../styles/Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import contactImage from '../assets/girl.png'; // Adjust the path if necessary

const Contact = () => {
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
          {/* Image added below the email */}
          <div className="contact-info-item">
            <img src={contactImage} alt="Contact" className="contact-image" />
          </div>
        </div>
        <div className="contact-form">
          <h2>Contact Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
