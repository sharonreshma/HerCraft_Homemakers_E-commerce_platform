import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaInfoCircle, FaBox, FaPhone, FaUser, FaSignOutAlt, FaBlog } from 'react-icons/fa'; // Added FaBlog
import '../styles/Navbar.css';
import { AuthContext } from '../App';

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">HerCraft</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              <FaInfoCircle className="mr-2" /> About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/product">
              <FaBox className="mr-2" /> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              <FaPhone className="mr-2" /> Contact
            </Link>
          </li>
          {/* Added Blogs Section */}
          <li className="nav-item">
            <Link className="nav-link" to="/blogs">
              <FaBlog className="mr-2" /> Blogs
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <Link to="/profile">
              <button className="btn btn-outline-light mr-2">
                <FaUser className="mr-2" /> Profile
              </button>
            </Link>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="btn btn-outline-light ml-2">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-outline-light ml-2">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
