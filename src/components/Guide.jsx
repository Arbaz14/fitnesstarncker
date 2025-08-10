import React, { useEffect } from 'react';
import { FaWater, FaClock, FaRunning } from 'react-icons/fa'; // Added icons for visual appeal
import './Guide.css';

const Guide = () => {
  useEffect(() => {
    const audio = new Audio('/path-to-audio/welcome.mp3');
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  }, []);

  return (
    <div className="guide-container">
      <h2 className="guide-title">
        <FaRunning className="title-icon" /> Welcome to FitTrack!
      </h2>
      <p className="guide-subtitle">Your journey to a healthier lifestyle starts here.</p>
      <div className="tips-card">
        <h3 className="section-title">Get Started with These Tips</h3>
        <ul className="tips-list">
          <li className="tip-item">
            <FaWater className="tip-icon" />
            <span>Track your water intake using the Water Tracker.</span>
          </li>
          <li className="tip-item">
            <FaClock className="tip-icon" />
            <span>Set reminders to stay hydrated throughout the day.</span>
          </li>
          <li className="tip-item">
            <FaRunning className="tip-icon" />
            <span>Explore workout plans and live sessions for fitness.</span>
          </li>
        </ul>
      </div>
      <p className="guide-footer">Embark on your fitness journey with confidence!</p>
    </div>
  );
};

export default Guide;