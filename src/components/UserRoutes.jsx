// src/components/UserRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Homepage';
import Services from './Services';
import Feature from './Feature';
import Collaborators from './Collaborators';
import Deals from './Deals';
import About from './About';
import Contact from './Contact';
import ProductsPage from './Product';
import TestimonialPage from './Testimonials';
import Category from './Category'; // Make sure Category is used somewhere if imported
import { Element } from 'react-scroll';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <HomePage />
          <Deals />
          <Feature />
        </>
      } />
      <Route path="about" element={
        <>
          <About />
          <Element name="services">
            <Services />
          </Element>
          <TestimonialPage />
          <Collaborators />
        </>
      } />
      <Route path="product/*" element={<ProductsPage />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
    </Routes>
  );
};

export default UserRoutes;
