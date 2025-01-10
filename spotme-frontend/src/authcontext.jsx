import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const API_URL = 'http://localhost:5001/api';

  // Signup Function
  const signup = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, formData);
      alert('Sign-up successful! Please log in.');
    } catch (err) {
      alert(err.response?.data?.error || 'Sign-up failed.');
    }
  };

  // Login Function
  const login = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      const { token } = response.data;

      // Save token and fetch user
      localStorage.setItem('token', token);
      const userResponse = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userResponse.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed.');
    }
  };

  // Logout Function
  const signout = (callback) => {
    setUser(null);
    localStorage.removeItem('token');
    if (callback) callback(); // Redirect to landing page
  };

  // Add a Workout
  const addWorkout = async (workoutData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/workouts`, workoutData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts((prev) => [...prev, response.data]);
    } catch (err) {
      alert('Failed to add workout.');
    }
  };

  // Update a Workout
  const updateWorkout = async (id, workoutData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/workouts/${id}`, workoutData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts((prev) =>
        prev.map((workout) => (workout._id === id ? response.data : workout))
      ); // Update state
      alert('Workout updated successfully.');
    } catch (err) {
      alert('Failed to update workout.');
    }
  };

  // Delete a Workout
  const deleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts((prev) => prev.filter((workout) => workout._id !== id)); // Update state
      alert('Workout deleted successfully.');
    } catch (err) {
      alert('Failed to delete workout.');
    }
  };

  // Fetch Workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (localStorage.getItem('token')) {
      fetchWorkouts();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        workouts,
        signup,
        login,
        signout,
        addWorkout,
        updateWorkout,
        deleteWorkout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
