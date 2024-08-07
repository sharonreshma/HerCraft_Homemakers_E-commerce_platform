import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaInfoCircle, FaBox, FaPhone, FaUser } from 'react-icons/fa'; // Import FaUser
import '../styles/Navbar.css';
import { AuthContext } from '../App'; // Import AuthContext

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext); // Use context to get isLoggedIn and handleLogout

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
        </ul>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FaUser className="mr-2" /> Profile
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <button className="dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
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
