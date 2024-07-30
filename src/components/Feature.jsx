// src/components/Feature.js
import React from 'react';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import '../styles/Feature.css';

// Import your product images
import product1 from '../assets/prodf.webp';
import product2 from '../assets/hand.jpg';
import product3 from '../assets/cupp.jpg';
import product4 from '../assets/ec.webp';
import product5 from '../assets/brac.webp';
import product6 from '../assets/st.jpg';

const Feature = () => {
  const products = [
    { image: product1, name: 'Flower Vase' },
    { image: product2, name: 'Handicraft Decors' },
    { image: product3, name: 'Cup Paintings' },
    { image: product4, name: 'Eco-Friendly goods' },
    { image: product5, name: 'Elegant Accessories' },
    { image: product6, name: 'Knitted Toys' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/product', { replace: true, state: { scrollToTop: true } });
  };

  return (
    <div className="featured-products-container">
      <h2 className="featured-title">Top Featured Products</h2>
      <div className="products-carousel">
        <Slider {...settings}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </Slider>
      </div>
      <div className="explore-button-container">
        <button className="explore-button" onClick={handleExploreClick}>
          Explore More Products
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`product-card ${inView ? 'appear' : ''}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div
        className="product-image"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <p>{product.name}</p>
    </div>
  );
};

export default Feature;
