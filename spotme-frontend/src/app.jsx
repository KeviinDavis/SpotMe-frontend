import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import CreateWorkout from './pages/createWorkout';
import './dashboard.css';

function App() {
  // Define state for workouts
  const [workouts, setWorkouts] = useState([]);

  // Define the addWorkout function
  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, { ...newWorkout, id: workouts.length + 1 }]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard workouts={workouts} />} />
        <Route path="/workouts/new" element={<CreateWorkout addWorkout={addWorkout} />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
