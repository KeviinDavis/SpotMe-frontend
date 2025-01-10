import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext'; // Access AuthContext
import '../login.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { setUser } = useContext(AuthContext); // Update AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log('Submitting:', formData); // Debug: log form data
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('Response:', data); // Debug: log backend response
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setUser({ username: data.username, token: data.token });
      navigate('/dashboard');
    } else {
      alert(data.error || 'Login failed. Please try again.');
    }
  } catch (err) {
    console.error('Error:', err); // Debug: log any errors
    alert('An error occurred. Please try again.');
  }
};


  return (
    <>
      {/* Top Banner */}
      <header className="dashboard-banner">
        <h1 className="app-name">SpotMe</h1>
        <div className="banner-right">
          <button onClick={() => navigate('/login')} className="nav-button">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="nav-button">
            Sign-Up
          </button>
        </div>
      </header>

      {/* Login Form */}
      <div className="login-page">
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
    </>
  );
}

export default Login;
