import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LiveSession from './components/LiveSession';
import History from './components/History';
import Profile from './components/Profile';
import WaterTracker from './components/WaterTracker';
import AICoach from './components/AICoach';
import WorkoutPlans from './components/WorkoutPlans';
import Login from './components/Login';
import Guide from './components/Guide';
import { FiMenu, FiX } from 'react-icons/fi';

function App() {
  const isFirstTime = localStorage.getItem('isFirstTime') === null;
  const [menuOpen, setMenuOpen] = useState(false);

  if (isFirstTime) {
    localStorage.setItem('isFirstTime', 'false');
    return <Guide />;
  }

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">🏋️ FitApp</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/session" onClick={() => setMenuOpen(false)}>Live Session</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          <Link to="/water-tracker" onClick={() => setMenuOpen(false)}>Water Tracker</Link>
          <Link to="/ai-coach" onClick={() => setMenuOpen(false)}>AI Coach</Link>
          <Link to="/workout-plans" onClick={() => setMenuOpen(false)}>Workout Plans</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session" element={<LiveSession />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/water-tracker" element={<WaterTracker />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
