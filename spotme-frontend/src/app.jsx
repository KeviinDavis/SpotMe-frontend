import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import CreateWorkout from './pages/createWorkout';
import Landing from './pages/landing';
import { AuthContext } from './authcontext';
import './dashboard.css';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Dashboard /> : <Landing />} />
      <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
      <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />

      {/* Protected Routes */}
      {user && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts/new" element={<CreateWorkout />} />
        </>
      )}

      {/* Fallback */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default App;
