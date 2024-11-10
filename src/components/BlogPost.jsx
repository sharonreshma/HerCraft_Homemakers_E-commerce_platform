// BlogPost.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BlogPost.css';
import blog1 from '../assets/blog1.jpg'; // Importing the image directly

const BlogPost = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div className="blog-post">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Blog
      </button>

      <h1 className="title">The Art of Handicrafts: Handmade Jewelry</h1>
      <div className="post-meta">
        <p className="date">Published on July 25, 2024</p>
        <p className="author">By Sarah Johnson</p>
      </div>
      
      {/* Using the imported image */}
      <img src={blog1} alt="Handmade Jewelry" className="featured-image" />

      <p className="content">
        Handmade jewelry is a captivating form of art that mirrors the skill and creativity of artisans. Each piece is uniquely crafted, bearing the artist’s distinctive touch and passion. The world of handicrafts extends far beyond just aesthetics, often embracing sustainable practices that appeal to a socially conscious audience.
      </p>
      <p className="content">
        Creating handmade jewelry involves intricate techniques, from metalwork and stone-setting to beading and weaving. These practices, often passed down through generations, make every creation a blend of tradition and innovation. Many artisans prioritize quality, using high-grade materials and infusing cultural elements into their work.
      </p>
      <p className="content">
        In a world of mass-produced goods, handmade jewelry holds a special place, offering buyers something personal and meaningful. As we delve into various styles, materials, and stories behind these handcrafted pieces, it’s clear why handmade jewelry is treasured globally and continues to thrive in the world of fashion and personal expression.
      </p>
    </div>
  );
};

export default BlogPost;
