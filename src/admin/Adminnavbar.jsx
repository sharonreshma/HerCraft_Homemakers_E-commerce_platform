import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaUser, FaBox, FaList, FaCalendar, FaEnvelope, FaPhone, FaBlog } from 'react-icons/fa'; // Import additional icons
import '../styles/Adminnavbar.css'; // Ensure this CSS file exists with your styles

const AdminNavbar = () => {
  // Optional: Define a logout function if needed
  const handleLogout = () => {
    // Clear authentication tokens or session data if needed
    // For example:
    // localStorage.removeItem('authToken');
    // or
    // sessionStorage.clear();
    // Redirect to login page (you can use navigate from 'react-router-dom' here if needed)
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">HerCraft</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/users">
              <FaUser className="mr-2" /> Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/product">
              <FaBox className="mr-2" /> Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/orders">
              <FaList className="mr-2" /> Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/events">
              <FaCalendar className="mr-2" /> Events
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/blogs">
              <FaBlog className="mr-2" /> Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/feedback">
              <FaEnvelope className="mr-2" /> Feedback
            </Link>
          </li>
         
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/login"> {/* Adjust the path as needed */}
          <button className="btn btn-outline-light ml-2" onClick={handleLogout}>
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
