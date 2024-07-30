// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Services from './components/Services';
import Feature from './components/Feature';
import Collaborators from './components/Collaborators';
import Deals from './components/Deals';
import About from './components/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Contact from './components/Contact';
import Category from './components/Category';
import ProductsPage from './components/Product';
import TestimonialPage from './components/Testimonials';
import { Element } from 'react-scroll';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<NoNavbar element={<SignUp />} />} />
        <Route path="/login" element={<NoNavbar element={<Login />} />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<HomePage />} /> {/* Fallback route */}
        </Route>
      </Routes>
    </Router>
  );
}

const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <Deals />
            <Feature />
           
            <Footer />
          </>
        } />
        <Route path="about" element={<AboutPage />} />
        <Route path="product/*" element={
          <>
            <ProductsPage />
            <Footer />
          </>
        } />
        <Route path="contact" element={
          <>
            <Contact />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

const AboutPage = () => {
  return (
    <>
      <About />
      <Element name="services">
        <Services />
      </Element>
      <TestimonialPage />
      <Collaborators />
      <Footer />
    </>
  );
};

const NoNavbar = ({ element }) => {
  return (
    <>
      {element}
    </>
  );
};

export default App;
