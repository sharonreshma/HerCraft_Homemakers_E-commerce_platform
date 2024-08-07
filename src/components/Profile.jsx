import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa'; // Import icons
import '../styles/Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // Default role to 'user' if not present
  const role = user.role || 'user';

  return (
    <div className="modal-overlay">
      <div className="profile-modal">
        <h1>Profile Details</h1>
        <div className="profile-details">
          <div className="profile-item">
            <strong>Username:</strong>
            <span>{user.username || 'N/A'}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong>
            <span>{user.email || 'N/A'}</span>
          </div>
          <div className="profile-item">
            <strong>Role:</strong>
            <span>{role}</span>
          </div>
        </div>
        <Link to="/">
          <button className="action-btn">
            <FaArrowLeft className="icon" /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
