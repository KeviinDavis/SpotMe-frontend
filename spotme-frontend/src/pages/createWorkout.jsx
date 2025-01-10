import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext'; // Import AuthContext
// import '../dashboard.css'; // Use the same banner styling
// import '../createWorkout.css'; // Create Workout specific styles

function CreateWorkout() {
  const { addWorkout } = useContext(AuthContext); // Access addWorkout from context
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
    addWorkout(formData); // Add workout to the context
    alert('Workout added successfully!');
    navigate('/dashboard'); // Redirect to the dashboard
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

      {/* Main Content */}
      <div className="create-workout-container">
        <h1>Create a New Workout</h1>

        <form onSubmit={handleSubmit} className="create-workout-form">
          <label htmlFor="title">Workout Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., Leg Day"
            required
          />

          <label htmlFor="focus">Focus</label>
          <input
            type="text"
            id="focus"
            name="focus"
            value={formData.focus}
            onChange={handleChange}
            placeholder="E.g., Legs, Cardio"
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
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
