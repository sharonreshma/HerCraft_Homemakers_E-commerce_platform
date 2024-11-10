// BlogPost.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BlogPost.css';
import blog1 from '../assets/blog7.jpg'; // Importing the image directly

const BlogPost1 = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div className="blog-post">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Blog
      </button>

      <h1 className="title">The Craftsmanship Behind Home Decor</h1>
      
      {/* Centered Date and Author */}
      <div className="post-meta">
        <p className="date">Published on July 25, 2024</p>
        <p className="author">By Sarah Johnson</p>
      </div>

      {/* Using the imported image */}
      <img src={blog1} alt="Home Decor Craftsmanship" className="featured-image" />

      <p className="content">
        Home decor is more than just filling a space with furniture and accessories; it is about bringing personality, elegance, and warmth into a home. The craftsmanship behind unique home decor pieces requires skill, creativity, and attention to detail, transforming raw materials into functional art that elevates any room.
      </p>
      <p className="content">
        From hand-carved wooden sculptures to meticulously sewn textiles, every piece of home decor carries a story of craftsmanship. These items are often created by artisans who pour years of experience and passion into their work, ensuring that each item is one-of-a-kind. The artistry behind these creations is what gives them their charm and makes them timeless treasures.
      </p>
      <p className="content">
        Whether it’s a custom-made table, a handwoven rug, or a handcrafted vase, home decor made by skilled artisans provides a sense of authenticity and personal touch that mass-produced items simply cannot replicate. In this blog, we’ll explore how these handcrafted items add elegance to any space, making it not just a house, but a home.
      </p>
    </div>
  );
};

export default BlogPost1;
