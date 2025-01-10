import React, { useState } from 'react';
import '../dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Mock user data
  const username = 'JohnDoe';

  // Mock workout data
  const [workouts, setWorkouts] = useState([
    { id: 1, title: 'Leg Day', date: '2025-01-01' },
    { id: 2, title: 'Cardio', date: '2025-01-03' },
  ]);

  // Delete a workout
  const handleDelete = (id) => {
    const filteredWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(filteredWorkouts);
  };

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, { ...newWorkout, id: workouts.length + 1 }]);
  };
  

  return (
    <div className="dashboard-page">
      {/* Top Banner */}
      <header className="dashboard-banner">
        <h1 className="app-name">SpotMe</h1>
        <div className="banner-right">
          <span className="greeting">Hi, {username}!</span>
          <button onClick={() => navigate('/login')} className="nav-button">
            Log Out
          </button>
        </div>
      </header>

      {/* User Profile Section */}
      <section className="profile-section">
        <h2>Your Profile</h2>
        <p>Username: {username}</p>
        <p>Workouts Completed: {workouts.length}</p>
      </section>

      {/* Workout List Section */}
      <section className="workout-list-section">
        <h2>Your Workouts</h2>
        <ul className="workout-list">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <li key={workout.id} className="workout-item">
                <p>
                  <strong>{workout.title}</strong> - {workout.date}
                </p>
                <div>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/workouts/${workout.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(workout.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No workouts yet. Click the button below to add one!</p>
          )}
        </ul>
      </section>

      {/* Create New Workout Button */}
      <button
        className="create-workout-button"
        onClick={() => navigate('/workouts/new')}
      >
        + Create New Workout
      </button>
    </div>
  );
}

export default Dashboard;
