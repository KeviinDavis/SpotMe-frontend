import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext';
import '../login.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate('/login'); // Redirect to login after signup
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
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
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="signup-link">
            Log In Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
