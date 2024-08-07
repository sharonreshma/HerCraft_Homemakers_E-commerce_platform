import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FaGoogle, FaUser, FaLock } from 'react-icons/fa';
import login1 from '../assets/shop.jpg';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      const user = response.data;
  
      if (user) {
        if (email === 'admin1@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Invalid credentials');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <div className="image-sectionnew">
        <img src={login1} alt="Login" />
        <p className="title">Welcome to HerCraft</p>
        <p className="description">"Empowering Dreams, One Login at a Time"</p>
      </div>
      <div className="login-section">
        <h1 className="logo">HerCraft</h1>
        <h2>Good to see you Again!</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <FaUser className="icon" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Valid Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">
            <FaLock className="icon" /> Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
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