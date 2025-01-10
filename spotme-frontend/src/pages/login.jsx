import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard.css';
import '../login.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    navigate('/dashboard'); // Redirect to dashboard
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



      {/* Login Form */}
      <div className="login-form-container">
        <h2>Log-in</h2>
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
          <button type="submit">Submit</button>
        </form>
        <p>
          Don't have an account?{' '}
          <span
            className="signup-link"
            onClick={() => navigate('/signup')}
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
