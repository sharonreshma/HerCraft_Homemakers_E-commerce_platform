// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaInfoCircle, FaBox, FaPhone } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">HerCraft</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/"><FaHome /> Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about"><FaInfoCircle /> About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/product"><FaBox /> Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact"><FaPhone /> Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/signup">
          <button className="btn btn-outline-light ml-2">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-outline-light ml-2">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
