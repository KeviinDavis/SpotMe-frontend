import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      {/* Top Banner */}
      <header className="dashboard-banner">
        <h1 className="app-name">SpotMe</h1>
        <div className="banner-right">
          <Link to="/login" className="nav-button">
            Log In
          </Link>
          <Link to="/signup" className="nav-button">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-page">
        <h1>Welcome to SpotMe!</h1>
        <p>Sign up or log in to track your workouts and progress.</p>
      </main>
    </>
  );
};

export default Landing;
