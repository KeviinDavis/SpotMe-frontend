import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authcontext';
import '../dashboard.css';

function Dashboard() {
  const { user, workouts, deleteWorkout, updateWorkout, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', date: '' });

  const handleEditClick = (workout) => {
    setEditingWorkoutId(workout._id);
    setEditFormData({ title: workout.title, date: workout.date });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await updateWorkout(editingWorkoutId, editFormData); // Call updateWorkout from context
      setEditingWorkoutId(null); // Exit edit mode
    } catch (error) {
      alert('Save failed.');
    }
  };

  return (
    <div className="dashboard-page">
      {/* Top Banner */}
      <header className="dashboard-banner">
        <h1 className="app-name">SpotMe</h1>
        <div className="banner-right">
          <span className="greeting">Hi, {user?.username || 'Guest'}!</span>
          <button onClick={() => signout(() => navigate('/'))} className="nav-button">
            Log Out
          </button>
        </div>
      </header>

      {/* User Profile Section */}
      <section className="profile-section">
        <h2>Your Profile</h2>
        <p>Username: {user?.username}</p>
        <p>Workouts Completed: {workouts.length}</p>
      </section>

      {/* Workout List Section */}
      <section className="workout-list-section">
        <h2>Your Workouts</h2>
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout._id} className="workout-item">
              {editingWorkoutId === workout._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    placeholder="Workout Title"
                  />
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                  />
                  <button className="save-button" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setEditingWorkoutId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>
                    <strong>{workout.title}</strong> - {workout.date}
                  </p>
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(workout)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteWorkout(workout._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
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
