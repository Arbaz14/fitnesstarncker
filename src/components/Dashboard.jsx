import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const savedCalorieGoal = parseInt(localStorage.getItem('calorieGoal')) || 2000;

    const today = new Date().toISOString().slice(0, 10);
    const todaysWorkouts = savedWorkouts.filter(w => w.date.slice(0, 10) === today);

    setWorkouts(todaysWorkouts);
    setCalorieGoal(savedCalorieGoal);

    const todaysCalories = todaysWorkouts.reduce((sum, w) => sum + parseFloat(w.calories), 0);
    setTotalCalories(todaysCalories);
  }, []);

  const progress = Math.min((totalCalories / calorieGoal) * 100, 100);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Fitness Dashboard</h2>
      <div className="progress-card">
        <h3 className="section-title">Today's Progress</h3>
        <p className="calorie-info">
          {totalCalories.toFixed(0)} / {calorieGoal} calories
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">{progress.toFixed(1)}% of daily goal</p>
      </div>
      <div className="workouts-card">
        <h3 className="section-title">Today's Workouts</h3>
        {workouts.length === 0 ? (
          <p className="no-workouts">No workouts logged for today.</p>
        ) : (
          <ul className="workout-list">
            {workouts.map((w, index) => (
              <li key={index} className="workout-item">
                <span className="exercise-name">{w.exercise}</span>
                <span>{w.calories} cal</span>
                <span>
                  {Math.floor(w.duration / 60)}m {w.duration % 60}s
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;