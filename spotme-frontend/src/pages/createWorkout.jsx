import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard.css';
import '../createWorkout.css';


function CreateWorkout({ addWorkout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    focus: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.focus || !formData.date) {
      alert('Please fill in all fields.');
      return;
    }
    addWorkout(formData);
    navigate('/dashboard');
  };

  return (
    <div className="create-workout-page">
      {/* Top Banner */}
      <header className="dashboard-banner">
        <h1 className="app-name">SpotMe</h1>
        <div className="banner-right">
          <button onClick={() => navigate('/dashboard')} className="nav-button">
            Home
          </button>
        </div>
      </header>
  
      {/* Content Box */}
      <div className="create-workout-container">
        <h1>Create a New Workout</h1>
  
        <form onSubmit={handleSubmit} className="create-workout-form">
          <label>Workout Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., Leg Day"
            required
          />
  
          <label>Focus</label>
          <input
            type="text"
            name="focus"
            value={formData.focus}
            onChange={handleChange}
            placeholder="E.g., Legs, Cardio"
            required
          />
  
          <label>Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="MM/DD/YY"
            required
          />
  
          <div className="form-buttons">
            <button type="submit" className="save-button">
              Save Workout
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWorkout;
