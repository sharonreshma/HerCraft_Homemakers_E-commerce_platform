import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/Category.css';

// Importing images
import potteryImage from '../assets/pot.jpg';
import artPaintingsImage from '../assets/ar.jpg';
import homeDecorImage from '../assets/cc.webp';
import bouquetsImage from '../assets/vase.jpg';
import ecoFriendlyImage from '../assets/plant.webp';
import accessoriesImage from '../assets/a.jpeg'; // Import the image for Accessories

// Category data
const categories = [
  { name: 'Pottery', description: 'Handcrafted pottery that brings elegance and tradition into your home.', image: potteryImage },
  { name: 'Art & Paintings', description: 'Beautiful artworks and paintings to inspire and beautify your space.', image: artPaintingsImage },
  { name: 'Home Decors', description: 'Unique home decor items to add a personal touch to your living space.', image: homeDecorImage },
  { name: 'Bouquets', description: 'Stunning bouquets crafted to bring freshness and color to your day.', image: bouquetsImage },
  { name: 'Eco-Friendly Goods', description: 'Sustainable and eco-friendly products to support a greener planet.', image: ecoFriendlyImage },
  { name: 'Accessories', description: 'Stylish accessories to complement your look and lifestyle.', image: accessoriesImage } // Added Accessories
];

const ProductCategories = () => {
  const [inView, setInView] = useState(new Array(categories.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          setInView(prevInView => {
            const newInView = [...prevInView];
            newInView[index] = true;
            return newInView;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-card, .popular-category-card').forEach((card, index) => {
      card.dataset.index = index;
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="categories-page">
      <div className="exclusive-choices">
        <h1 className="exclusive-title">Exclusive Choices</h1>
      </div>
      <div className="categories-container top-row">
        {categories.slice(0, 3).map((category, index) => (
          <CategoryCard key={index} category={category} isInView={inView[index]} />
        ))}
      </div>
      <div className="categories-container bottom-row">
        {categories.slice(3).map((category, index) => (
          <CategoryCard key={index + 3} category={category} isInView={inView[index + 3]} />
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({ category, isInView }) => {
  const [props, api] = useSpring(() => ({
    opacity: 0,
    transform: 'translateX(-100%)',
    config: { tension: 200, friction: 20 },
  }));

  React.useEffect(() => {
    if (isInView) {
      api.start({ opacity: 1, transform: 'translateX(0)' });
    }
  }, [isInView, api]);

  return (
    <animated.div className="category-card" style={props}>
      <img src={category.image} alt={category.name} className="category-image" />
      <div className="category-content">
        <h3 className="category-name">{category.name}</h3>
        <p className="category-description">{category.description}</p>
      </div>
    </animated.div>
  );
};

export default ProductCategories;
