import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/SignUp.css';
import { FaGoogle } from 'react-icons/fa';
import signUpImage from '../assets/shop.jpg';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/userregister/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        console.log('User Registered');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="signup-section">
        <div className="logo"><h2>HerCraft</h2></div>
        <h2>Create an Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Name</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />

          <button type="submit" className="sign-up-btn">Sign Up</button>
        </form>

        <div className="or-section">
          <span>OR</span>
        </div>

        <div className="google-sign-in">
          <FaGoogle size={20} style={{ marginRight: '10px' }} />
          Sign Up with Google
        </div>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <div className="image-section">
        <img src={signUpImage} alt="Sign up" />
        <div className="title">Hello There! Sign Up to Explore More Creations</div>
        <div className="description">Art, Connect, Create: It All Begins Here!</div>
      </div>
    </div>
  );
};

export default SignUp;
