import React from 'react';
import '../styles/cat.css';

// Import images from the assets directory
import category1Image from '../assets/pot.jpg';
import category2Image from '../assets/ar.jpg';
import category3Image from '../assets/cc.webp';
import category4Image from '../assets/vase.jpg';
import category5Image from '../assets/plant.webp';
import category6Image from '../assets/a.jpeg';

const categories = [
  {
    id: 1,
    name: 'Pottery',
    description: 'Beautiful handmade pottery items.',
    image: category1Image,
  },
  {
    id: 2,
    name: 'Art & Paintings',
    description: 'A collection of fine art and paintings.',
    image: category2Image,
  },
  {
    id: 3,
    name: 'Home Decors',
    description: 'Stylish and unique home decor pieces.',
    image: category3Image,
  },
  {
    id: 4,
    name: 'Bouquets',
    description: 'Fresh and beautiful bouquets for every occasion.',
    image: category4Image,
  },
  {
    id: 5,
    name: 'Eco-Friendly Goods',
    description: 'Sustainable and eco-friendly products.',
    image: category5Image,
  },
  {
    id: 6,
    name: 'Accessories',
    description: 'Trendy accessories to complement your style.',
    image: category6Image,
  },
];

const CategoryPage = () => {
  return (
    <section className="admincategory-page">
      <h2>Category Page</h2>
      <div className="admincategory-container">
        {categories.map((category) => (
          <div key={category.id} className="admincategory-card">
            <img src={category.image} alt={category.name} />
            <div className="admincategory-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div className="admincategory-actions">
              <button>View</button>
              <button>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
