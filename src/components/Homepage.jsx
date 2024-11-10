// Home.js
import React, { useRef, useState } from 'react';
import '../styles/Homepage.css';
import { FiArrowRight } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BannerImage1 from '../assets/flower.png';
import BannerImage2 from '../assets/bask.png';
import BannerImage3 from '../assets/cand.avif';
import BannerImage4 from '../assets/cup.png';
import ProductCategories from './Category';

const Home = () => {
  const categoryRef = useRef(null);
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);

  const handleScroll = () => {
    categoryRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = chatInput;
      setChatMessages([...chatMessages, { sender: 'user', text: userMessage }]);
      setChatInput(''); // Clear input after sending message

      // Generate bot response based on user input
      let botResponse = '';
      if (userMessage.toLowerCase().includes('hello')) {
        botResponse = 'Hello! How can I help you today?';
      } else if (userMessage.toLowerCase().includes('help')) {
        botResponse = 'Sure! I’m here to assist you. What do you need help with?';
      } else if (userMessage.toLowerCase().includes('thanks') || userMessage.toLowerCase().includes('thank you')) {
        botResponse = 'You’re very welcome! Let me know if you have any other questions.';
      } else {
        botResponse = 'I’m here to assist with any questions you have about our services.';
      }

      // Add bot response to chat messages
      setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
          >
            <div className="banner-slide-1">
              <img src={BannerImage1} alt="Banner 1" className="banner-image-1"/>
            </div>
            <div className="banner-slide-2">
              <img src={BannerImage2} alt="Banner 2" className="banner-image-2"/>
            </div>
            <div className="banner-slide-3">
              <img src={BannerImage3} alt="Banner 3" className="banner-image-3"/>
            </div>
            <div className="banner-slide-4">
              <img src={BannerImage4} alt="Banner 4" className="banner-image-4"/>
            </div>
          </Carousel>
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Exclusively Crafted Creations!
          </h1>
          <p className="primary-text">
            Discover "Her Hands, Her Craft"—a curated collection of unique, handcrafted treasures by talented women homemakers.
          </p>
          <button className="secondary-button" onClick={handleScroll}>
            <a>Get Started </a>
            <FiArrowRight />
          </button>
        </div>
      </div>
      <div ref={categoryRef}>
        <ProductCategories />
      </div>

      {/* Chatbot button */}
      <div className="chatbot-container" onClick={toggleChatbot}>
        <div className="chatbot-icon">💬</div>
      </div>

      {/* Chatbot Popup */}
      <div className={`chatbot-popup ${isChatbotVisible ? 'show' : ''}`}>
        <div className="chatbot-popup-header">Chat with Us!</div>
        <div className="chatbot-popup-body">
          {/* Display chat messages */}
          {chatMessages.map((message, index) => (
            <p
              key={index}
              className={`chatbot-message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              {message.text}
            </p>
          ))}
        </div>
        <div className="chatbot-popup-footer">
          <input
            type="text"
            className="chatbot-input"
            value={chatInput}
            onChange={handleChatInputChange}
            placeholder="Type a message..."
          />
          <button className="chatbot-send-button" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
