import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'; // Reuse the same CSS file for consistent styling

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign-Up data:', formData); // Placeholder for API call
    alert('Sign-Up successful! Redirecting to Login...');
    navigate('/login'); // Redirect to the Login Page
  };

  return (
    <div className="login-page">
      {/* Top Banner */}
      <header className="dashboard-banner">
  <h1 className="app-name">SpotMe</h1>
  <div className="banner-right">
    <span className="greeting">Hello, Guest!</span>
    <button onClick={() => navigate('/login')} className="nav-button">
      Login
    </button>
    <button onClick={() => navigate('/signup')} className="nav-button">
      Sign-Up
    </button>
  </div>
</header>


      {/* Sign-Up Form */}
      <div className="login-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>USERNAME</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <span
            className="signup-link"
            onClick={() => navigate('/login')}
          >
            Log In Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
