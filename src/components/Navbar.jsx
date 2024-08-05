import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaInfoCircle, FaBox, FaPhone } from 'react-icons/fa';
import '../styles/Navbar.css';
import { AuthContext } from '../App'; // Import AuthContext

const Navbar = () => {
  const { role, setRole } = useContext(AuthContext); // Use context to get role and setRole

  const handleLogout = () => {
    setRole(null); // Clear the user's role on logout
  };

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
        {role ? (
          <button className="btn btn-outline-light ml-2" onClick={handleLogout}>
            Logout
          </button>
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
