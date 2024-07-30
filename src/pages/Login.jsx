import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FaGoogle, FaUser, FaLock } from 'react-icons/fa';
import login1 from '../assets/shop.jpg';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    // After successful login, navigate to home page
    navigate('/');
  };

  return (
    <div className="container">
      <div className="image-sectionnew">
        <img src={login1} alt="Login 1" />
        <p className="title">Welcome to HerCraft</p>
        <p className="description">"Empowering Dreams, One Login at a Time"</p>
      </div>
      <div className="login-section">
        <h1 className="logo">HerCraft</h1>
        <h2>Good to see you Again!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <FaUser className="icon" /> User name or Email
          </label>
          <input type="text" id="username" name="username" placeholder="Enter Valid Username or Email" required />
          <label htmlFor="password">
            <FaLock className="icon" /> Password
          </label>
          <input type="password" id="password" name="password" placeholder="********" required />
          <a href="/" className="forgot-password">Forgot password?</a>
          <button type="submit" className="sign-in-btn">Login</button>
        </form>
        <div className="or-section">
          <span>or</span>
        </div>
        <button className="google-sign-in">
          <FaGoogle className="google-icon" /> Login with Google
        </button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
