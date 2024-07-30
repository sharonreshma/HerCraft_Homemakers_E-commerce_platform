import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/SignUp.css';
import { FaGoogle } from 'react-icons/fa';
import signUpImage from '../assets/shop.jpg';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call)
    // After successful signup, navigate to home page
    navigate('/');
  };

  return (
    <div className="container">
      <div className="signup-section">
        <div className="logo"><h2>HerCraft</h2></div>
        <h2>Create an Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" required />

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
