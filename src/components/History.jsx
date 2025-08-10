import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa'; // Added icon for visual appeal
import './History.css';

const History = () => {
  const [groupedWorkouts, setGroupedWorkouts] = useState({});

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const groups = savedWorkouts.reduce((groups, workout) => {
      const date = workout.date.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(workout);
      return groups;
    }, {});
    setGroupedWorkouts(groups);
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">
        <FaDumbbell className="title-icon" /> Workout History
      </h2>
      {Object.keys(groupedWorkouts).length === 0 ? (
        <p className="no-workouts">No workouts logged yet. Start tracking your fitness journey!</p>
      ) : (
        Object.keys(groupedWorkouts)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((date) => (
            <div key={date} className="date-card">
              <h3 className="date-title">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <ul className="workout-list">
                {groupedWorkouts[date].map((w, index) => (
                  <li key={index} className="workout-item">
                    <span className="exercise-name">{w.exercise}</span>
                    <span>{w.calories} cal</span>
                    <span>
                      {Math.floor(w.duration / 60)}m {w.duration % 60}s
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
};

export default History;