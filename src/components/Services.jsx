// src/components/ServicesPage.js
import React, { useState } from 'react';
import '../styles/Service.css'; // Import the CSS file for styling

// Import images
import image1 from '../assets/poterry.webp';
import image2 from '../assets/cups.jpg';
import image3 from '../assets/women.webp';
import image4 from '../assets/knit.jpg';
import image5 from '../assets/eco.webp';
import image6 from '../assets/grow.png';
import image7 from '../assets/craft.avif';
import image8 from '../assets/art.webp';

const ServicesPage = () => {
  const [zoomedItem, setZoomedItem] = useState(null);

  const handleZoom = (index) => {
    setZoomedItem(zoomedItem === index ? null : index);
  };

  const serviceTexts = [
        "Artisan Profiles and Stories",
    "Custom Handmade Products",
    "Community Support and Networking",
    "Workshops and Training",
    "Sustainable and Eco-Friendly Products",
    "Fair Trade and Ethical Sourcing",
    "Exclusive Limited Edition Collections",
    "Marketing and Business Support",
    
  ];

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        {[image1, image2, image3, image4, image5, image6, image7, image8].map((image, index) => (
          <div
            key={index}
            className={`service-item ${zoomedItem === index ? 'zoomed' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => handleZoom(index)}
          >
            <div className="service-text">{serviceTexts[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
