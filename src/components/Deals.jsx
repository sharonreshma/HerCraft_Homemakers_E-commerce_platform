// src/components/Deals.js
import React from 'react';
import Slider from 'react-slick';
import '../styles/Deals.css'; // Ensure you have a Deals.css file for styling

// Import your deal images
import deal1 from '../assets/craft.webp';
import deal2 from '../assets/d.webp';
import deal3 from '../assets/deal.jpg';
import deal4 from '../assets/new.jpg';
import deal5 from '../assets/gift.jpg';
import deal6 from '../assets/dec.webp';

const Deals = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Change the speed of the autoplay here
    arrows: false, // Disable navigation arrows
  };

  const deals = [deal1, deal2, deal3, deal4, deal5, deal6];

  return (
    <div className="deals-container">
      <h2 className="deals-title">Exclusive Deals & Collections</h2>
      <div className="deals-carousel">
        <Slider {...settings}>
          {deals.map((deal, index) => (
            <div key={index} className="deal-item">
              <img src={deal} alt={`Deal ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Deals;
